/**
 * Fetches hero photos for islands featured in the
 * /guides/top-dog-friendly-islands-europe page that don't map
 * to an existing destination (so /public/images/destinations/{slug}.jpg doesn't exist).
 *
 * Output: /public/images/islands/{slug}.jpg (1600x900, mozjpeg q85)
 * Usage: node scripts/fetch-island-photos.mjs
 */
import sharp from 'sharp'
import { mkdir, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'images', 'islands')

async function loadApiKey() {
  if (process.env.GOOGLE_PLACES_API_KEY) return process.env.GOOGLE_PLACES_API_KEY
  const env = await readFile(path.join(ROOT, '.env.local'), 'utf-8')
  const match = env.match(/GOOGLE_PLACES_API_KEY=(.+)/)
  if (match) return match[1].trim()
  throw new Error('No GOOGLE_PLACES_API_KEY')
}

const TARGETS = [
  { slug: 'sardinia',      query: 'Sardinia Italy Cala Mariolu turquoise water cliffs Mediterranean' },
  { slug: 'ibiza',          query: 'Ibiza Spain Cala Comte sunset cliffs Mediterranean' },
  { slug: 'menorca',        query: 'Menorca Spain Cala Macarella turquoise cove pine forest' },
  { slug: 'corsica',        query: 'Corsica France Bonifacio limestone cliffs Mediterranean village' },
  { slug: 'hvar',           query: 'Hvar Croatia Stari Grad harbour stone village Adriatic' },
  { slug: 'korcula',        query: 'Korcula Croatia old town walls Adriatic sunset stone houses' },
  { slug: 'rhodes',         query: 'Rhodes Greece medieval old town stone walls harbour Aegean' },
  { slug: 'santorini',      query: 'Santorini Greece Oia caldera white blue church sunset' },
  { slug: 'mykonos',        query: 'Mykonos Greece Little Venice windmills white houses sunset' },
  { slug: 'cyprus',         query: 'Cyprus Aphrodite rock coast Mediterranean turquoise sea' },
  { slug: 'malta',          query: 'Malta Valletta harbour limestone city walls Mediterranean sunset' },
  { slug: 'gozo',           query: 'Gozo Malta Dwejra Azure Window coast cliffs Mediterranean' },
  { slug: 'capri',          query: 'Capri Italy Faraglioni rocks Mediterranean cliffs Marina Piccola' },
  { slug: 'elba',           query: 'Elba Island Italy Portoferraio harbour stone fortress Mediterranean' },
  { slug: 'sylt',           query: 'Sylt Germany Westerland beach lighthouse dunes North Sea' },
  { slug: 'isle-of-skye',   query: 'Isle of Skye Scotland Old Man of Storr Quiraing mountains' },
  { slug: 'isle-of-wight',  query: 'Isle of Wight England Needles chalk cliffs lighthouse coast' },
  { slug: 'aran-islands',   query: 'Inis Mor Aran Islands Ireland Dun Aonghasa cliff fort Atlantic' },
  { slug: 'faroe-islands',  query: 'Faroe Islands Sorvagsvatn lake cliffs Atlantic Tindholmur' },
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
