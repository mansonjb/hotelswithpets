/**
 * Fetches hero photos for the 20 Paris arrondissements.
 * Each query targets a landmark that visually represents the district.
 *
 * Usage: node scripts/fetch-paris-arrondissement-photos.mjs
 * Output: public/images/paris-arrondissements/{slug}.jpg (1600x900, ~150KB jpeg)
 */
import sharp from 'sharp'
import { mkdir, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'images', 'paris-arrondissements')

async function loadApiKey() {
  if (process.env.GOOGLE_PLACES_API_KEY) return process.env.GOOGLE_PLACES_API_KEY
  const env = await readFile(path.join(ROOT, '.env.local'), 'utf-8')
  const match = env.match(/GOOGLE_PLACES_API_KEY=(.+)/)
  if (match) return match[1].trim()
  throw new Error('No GOOGLE_PLACES_API_KEY')
}

const TARGETS = [
  { slug: '1er', query: 'Jardin du Palais-Royal Paris colonnes Buren arcade panorama' },
  { slug: '2e',  query: 'Passage des Panoramas Paris covered arcade 19th century shops' },
  { slug: '3e',  query: 'Square du Temple Carreau du Temple Paris Haut Marais panorama' },
  { slug: '4e',  query: 'Place des Vosges Paris Marais arcades red brick symmetric panorama' },
  { slug: '5e',  query: 'Panthéon Paris Quartier Latin dome Soufflot panorama sunset' },
  { slug: '6e',  query: 'Jardin du Luxembourg Paris Sénat palace fountain pond panorama' },
  { slug: '7e',  query: 'Tour Eiffel Champ de Mars Paris Trocadéro panorama golden hour' },
  { slug: '8e',  query: 'Arc de Triomphe Champs-Élysées Paris avenue panorama sunset' },
  { slug: '9e',  query: 'Opéra Garnier Paris facade Place de l\'Opéra panorama' },
  { slug: '10e', query: 'Canal Saint-Martin Paris footbridge cobbled quay panorama' },
  { slug: '11e', query: 'Place de la Bastille Paris colonne de juillet Opéra Bastille panorama' },
  { slug: '12e', query: 'Coulée verte René-Dumont Paris Promenade plantée elevated park' },
  { slug: '13e', query: 'Bibliothèque François Mitterrand Paris BNF towers Seine panorama' },
  { slug: '14e', query: 'Tour Montparnasse Paris skyline view Observatoire panorama sunset' },
  { slug: '15e', query: 'Parc André-Citroën Paris balloon Seine left bank panorama' },
  { slug: '16e', query: 'Palais de Chaillot Trocadéro Paris Tour Eiffel view panorama sunset' },
  { slug: '17e', query: 'Parc Monceau Paris colonnade pond statues panorama' },
  { slug: '18e', query: 'Sacré-Coeur Montmartre Paris basilica white dome panorama sunset' },
  { slug: '19e', query: 'Parc des Buttes-Chaumont Paris temple Sibylle cliff suspension bridge panorama' },
  { slug: '20e', query: 'Père-Lachaise cemetery Paris alleys tombs trees autumn panorama' },
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
