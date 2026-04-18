/**
 * Fix the 7 hotels that failed in the main script.
 * Uses corrected search queries or fallback city searches.
 */

import sharp from 'sharp'
import { mkdir } from 'fs/promises'
import { existsSync, statSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'images', 'hotels')

// Load API key
const env = readFileSync(path.join(ROOT, '.env.local'), 'utf-8')
const API_KEY = env.match(/GOOGLE_PLACES_API_KEY=(.+)/)[1].trim()

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

// Manual overrides with better search queries
const FIXES = [
  { id: 'madrid-8',    query: 'Eurostars Madrid Tower hotel Madrid' },
  { id: 'nice-7',      query: 'Hotel Beau Rivage Nice Promenade des Anglais' },
  { id: 'nice-8',      query: 'Hotel Negresco Nice Côte d Azur' },
  { id: 'bruges-7',    query: 'Ten Hove Brugge guesthouse Belgium' },
  { id: 'malaga-7',    query: 'luxury villa pool Malaga sea view Spain' },
  { id: 'ghent-5',     query: 'boutique hotel apartment Ghent Belgium historic' },
  { id: 'ljubljana-4', query: 'Victoria hotel Ljubljana Slovenia center' },
]

async function searchAndDownload({ id, query }) {
  const outPath = path.join(OUT_DIR, `${id}.jpg`)
  process.stdout.write(`  📍 [${id}] "${query}" … `)

  // Search
  const searchRes = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.photos',
    },
    body: JSON.stringify({ textQuery: query, languageCode: 'en' }),
  })
  const searchData = await searchRes.json()
  const place = searchData.places?.[0]
  if (!place?.photos?.length) throw new Error(`No place/photos found`)

  const photoName = place.photos[0].name
  const displayName = place.displayName?.text

  // Get photo URI
  const photoRes = await fetch(
    `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=1200&skipHttpRedirect=true&key=${API_KEY}`
  )
  const photoData = await photoRes.json()
  if (!photoData.photoUri) throw new Error('No photoUri')

  // Download image
  const imgRes = await fetch(photoData.photoUri)
  const buffer = Buffer.from(await imgRes.arrayBuffer())

  // Compress
  await sharp(buffer)
    .resize(800, 500, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(outPath)

  const kb = Math.round(statSync(outPath).size / 1024)
  console.log(`✓ ${kb} KB ← ${displayName}`)
}

await mkdir(OUT_DIR, { recursive: true })
console.log(`\n🔧 Fixing ${FIXES.length} failed hotel photos\n`)

let ok = 0, fail = 0
for (const fix of FIXES) {
  try {
    await searchAndDownload(fix)
    ok++
  } catch (err) {
    console.log(`✗ ${err.message}`)
    fail++
  }
  await sleep(200)
}

console.log(`\n✅ Fixed: ${ok} | Failed: ${fail}`)
