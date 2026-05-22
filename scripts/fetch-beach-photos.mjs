/**
 * Fetches hero photos for French beaches featured in
 * /guides/dog-beaches-france that don't map to an existing destination.
 *
 * Output: /public/images/beaches/{slug}.jpg (1600x900, mozjpeg q85)
 * Usage: node scripts/fetch-beach-photos.mjs
 */
import sharp from 'sharp'
import { mkdir, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'images', 'beaches')

async function loadApiKey() {
  if (process.env.GOOGLE_PLACES_API_KEY) return process.env.GOOGLE_PLACES_API_KEY
  const env = await readFile(path.join(ROOT, '.env.local'), 'utf-8')
  const match = env.match(/GOOGLE_PLACES_API_KEY=(.+)/)
  if (match) return match[1].trim()
  throw new Error('No GOOGLE_PLACES_API_KEY')
}

const TARGETS = [
  { slug: 'hyeres-verdon',         query: `Plage du Verdon Hyères Giens beach Mediterranean France` },
  { slug: 'hyeres-almanarre',      query: `Plage de l'Almanarre Hyères beach lagoon Mediterranean France` },
  { slug: 'espiguette',            query: `Plage de l'Espiguette Le Grau-du-Roi wild dune beach France` },
  { slug: 'sete',                  query: `Plage des Trois Digues Sète Lido beach Mediterranean France` },
  { slug: 'seignosse',             query: `Plage des Estagnots Seignosse Landes Atlantic beach France` },
  { slug: 'longeville-conches',    query: `Plage des Conches Longeville-sur-Mer Vendée beach Atlantic France` },
  { slug: 'saint-jean-de-monts',   query: `Plage Saint-Jean-de-Monts Vendée beach sand Atlantic France` },
  { slug: 'ile-de-re',             query: `Plage de la Conche des Baleines Île de Ré beach lighthouse France` },
  { slug: 'trevignon',             query: `Pointe de Trévignon Trégunc Brittany beach granite France` },
  { slug: 'cabellou',              query: `Plage du Cabellou Concarneau Brittany beach granite France` },
  { slug: 'crozon-trez-bellec',    query: `Plage de Trez-Bellec Telgruc-sur-Mer Crozon Brittany beach France` },
  { slug: 'perros-guirec',         query: `Plage de Trestraou Perros-Guirec Pink Granite Coast Brittany France` },
  { slug: 'cabourg',               query: `Plage de Cabourg Normandy Marcel Proust beach Calvados France` },
  { slug: 'utah-beach',            query: `Utah Beach Sainte-Marie-du-Mont Normandy D-Day beach France` },
  { slug: 'le-touquet',            query: `Plage du Touquet Le Touquet-Paris-Plage wide sand beach Pas-de-Calais France` },
  { slug: 'berck',                 query: `Plage de Berck-sur-Mer Baie d'Authie seal colony Pas-de-Calais France` },
  { slug: 'antibes',               query: `Plage de la Salis Antibes Cap d'Antibes beach Mediterranean France` },
]

async function searchPhoto(query, apiKey) {
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.photos,places.displayName',
    },
    body: JSON.stringify({ textQuery: query, languageCode: 'en' }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`)
  const data = await res.json()
  const photo = data.places?.[0]?.photos?.[0]?.name
  if (!photo) throw new Error('No photo found')
  return photo
}

async function fetchPhotoUri(photoName, apiKey) {
  const url = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=1600&skipHttpRedirect=true&key=${apiKey}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`photo HTTP ${res.status}`)
  const data = await res.json()
  return data.photoUri
}

async function downloadAndCompress(uri, outPath) {
  const res = await fetch(uri)
  const buf = Buffer.from(await res.arrayBuffer())
  await sharp(buf)
    .resize(1600, 900, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(outPath)
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const apiKey = await loadApiKey()
  const results = []
  for (const { slug, query } of TARGETS) {
    const outPath = path.join(OUT_DIR, `${slug}.jpg`)
    if (existsSync(outPath)) {
      console.log(`⏩ ${slug}: exists, skip`)
      continue
    }
    try {
      console.log(`🔍 ${slug}: searching "${query}"`)
      const photoName = await searchPhoto(query, apiKey)
      const uri = await fetchPhotoUri(photoName, apiKey)
      await downloadAndCompress(uri, outPath)
      const kb = Math.round((await readFile(outPath)).length / 1024)
      console.log(`   ✅ ${slug}.jpg (${kb} KB)`)
      results.push({ slug, ok: true, kb })
      await new Promise(r => setTimeout(r, 300))
    } catch (e) {
      console.error(`   ❌ ${slug}: ${e.message}`)
      results.push({ slug, ok: false, err: e.message })
    }
  }
  const ok = results.filter(r => r.ok).length
  console.log(`\nDone: ${ok}/${results.length} succeeded`)
}

main().catch(err => { console.error(err); process.exit(1) })
