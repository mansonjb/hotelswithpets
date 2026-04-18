/**
 * Fetches real hotel photos from Google Places API (New).
 * For each hotel: text search → place_id → photo → download + compress.
 *
 * Usage:
 *   GOOGLE_PLACES_API_KEY=xxx node scripts/fetch-hotel-photos-google.mjs
 *   node scripts/fetch-hotel-photos-google.mjs          # reads from .env.local
 *   node scripts/fetch-hotel-photos-google.mjs --force  # re-download all
 *
 * Cost: ~$0.017/hotel × 344 = ~$6 total (well within $200 free monthly credit)
 */

import sharp from 'sharp'
import { mkdir, readFile, writeFile } from 'fs/promises'
import { existsSync, statSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'images', 'hotels')
const HOTELS_JSON = path.join(ROOT, 'data', 'hotels.json')
const DESTS_JSON = path.join(ROOT, 'data', 'destinations.json')

// Load API key from .env.local if not in environment
async function loadApiKey() {
  if (process.env.GOOGLE_PLACES_API_KEY) return process.env.GOOGLE_PLACES_API_KEY
  try {
    const env = await readFile(path.join(ROOT, '.env.local'), 'utf-8')
    const match = env.match(/GOOGLE_PLACES_API_KEY=(.+)/)
    if (match) return match[1].trim()
  } catch {}
  throw new Error('No GOOGLE_PLACES_API_KEY found. Add it to .env.local or set as env var.')
}

const FORCE = process.argv.includes('--force')
const DELAY_MS = 200 // 200ms between requests → ~5 req/s, well within quota

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

/**
 * Step 1: Text search → get place_id + first photo name
 */
async function searchPlace(hotelName, cityName, apiKey) {
  const query = `${hotelName} hotel ${cityName}`
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.photos',
    },
    body: JSON.stringify({ textQuery: query, languageCode: 'en' }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Places searchText HTTP ${res.status}: ${err.slice(0, 200)}`)
  }
  const data = await res.json()
  const place = data.places?.[0]
  if (!place) throw new Error(`No place found for: ${query}`)
  const photoName = place.photos?.[0]?.name
  if (!photoName) throw new Error(`No photos for place: ${place.displayName?.text}`)
  return { placeId: place.id, photoName, displayName: place.displayName?.text }
}

/**
 * Step 2: Fetch photo binary from photo name
 */
async function fetchPhoto(photoName, apiKey) {
  const url = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=1200&skipHttpRedirect=true&key=${apiKey}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Photo fetch HTTP ${res.status}`)
  const data = await res.json()
  if (!data.photoUri) throw new Error('No photoUri in response')
  // Download the actual image
  const imgRes = await fetch(data.photoUri)
  if (!imgRes.ok) throw new Error(`Image download HTTP ${imgRes.status}`)
  return Buffer.from(await imgRes.arrayBuffer())
}

/**
 * Compress and save image
 */
async function saveImage(buffer, outPath) {
  await sharp(buffer)
    .resize(800, 500, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(outPath)
  return Math.round(statSync(outPath).size / 1024)
}

// ── Main ────────────────────────────────────────────────────────────────────

const apiKey = await loadApiKey()
const hotels = JSON.parse(await readFile(HOTELS_JSON, 'utf-8'))
const destsRaw = JSON.parse(await readFile(DESTS_JSON, 'utf-8'))

// Build slug → city name map (supports both array and object formats)
const slugToCity = {}
if (Array.isArray(destsRaw)) {
  destsRaw.forEach(d => { slugToCity[d.slug] = d.name })
} else {
  Object.entries(destsRaw).forEach(([slug, d]) => {
    slugToCity[slug] = typeof d === 'string' ? d : (d.name ?? slug)
  })
}

await mkdir(OUT_DIR, { recursive: true })

let downloaded = 0, skipped = 0, failed = 0
const failures = []

console.log(`\n📸 Google Places Hotel Photo Downloader`)
console.log(`Hotels: ${hotels.length} | Force: ${FORCE} | Output: ${OUT_DIR}\n`)

for (const hotel of hotels) {
  const outPath = path.join(OUT_DIR, `${hotel.id}.jpg`)

  if (!FORCE && existsSync(outPath)) {
    skipped++
    continue
  }

  const cityName = slugToCity[hotel.destinationSlug] ?? hotel.destinationSlug
  process.stdout.write(`  📍 [${hotel.id}] ${hotel.name} (${cityName}) … `)

  try {
    const { photoName, displayName } = await searchPlace(hotel.name, cityName, apiKey)
    const buffer = await fetchPhoto(photoName, apiKey)
    const kb = await saveImage(buffer, outPath)
    console.log(`✓ ${kb} KB  ← ${displayName}`)
    downloaded++
  } catch (err) {
    console.log(`✗ ${err.message}`)
    failures.push({ id: hotel.id, name: hotel.name, error: err.message })
    failed++
  }

  await sleep(DELAY_MS)
}

// ── Report ──────────────────────────────────────────────────────────────────

console.log(`\n${'─'.repeat(60)}`)
console.log(`✅ Downloaded: ${downloaded}`)
console.log(`⏭  Skipped:    ${skipped}`)
console.log(`❌ Failed:     ${failed}`)

if (failures.length > 0) {
  console.log(`\nFailed hotels:`)
  failures.forEach(f => console.log(`  ${f.id}: ${f.error}`))
  await writeFile(
    path.join(ROOT, 'scripts', '_hotel-photo-failures.json'),
    JSON.stringify(failures, null, 2)
  )
  console.log(`\nFailure log saved to scripts/_hotel-photo-failures.json`)
  console.log(`Re-run with --force to retry failed hotels only (after fixing issues)`)
}

const total = hotels.length
const covered = hotels.filter(h => existsSync(path.join(OUT_DIR, `${h.id}.jpg`))).length
console.log(`\n📊 Coverage: ${covered}/${total} (${Math.round(covered/total*100)}%)`)
