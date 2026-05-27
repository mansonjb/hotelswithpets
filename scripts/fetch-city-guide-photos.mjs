/**
 * Fetches real photos for every place in every city-guide JSON via Google Places API.
 * For each place (restaurant, park, vet, etc.): search "{place name} {city}" → download photo → save locally.
 *
 * Usage:
 *   node scripts/fetch-city-guide-photos.mjs              # process all cities
 *   node scripts/fetch-city-guide-photos.mjs --city=nice  # only one city
 *   node scripts/fetch-city-guide-photos.mjs --force      # re-download existing
 *
 * Updates each place's `photo` field in the JSON to point to the new local image.
 */

import sharp from 'sharp'
import { mkdir, readFile, writeFile, readdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'images', 'city-places')
const GUIDES_DIR = path.join(ROOT, 'data', 'city-guides')

async function loadApiKey() {
  if (process.env.GOOGLE_PLACES_API_KEY) return process.env.GOOGLE_PLACES_API_KEY
  const env = await readFile(path.join(ROOT, '.env.local'), 'utf-8')
  const match = env.match(/GOOGLE_PLACES_API_KEY=(.+)/)
  if (match) return match[1].trim()
  throw new Error('No GOOGLE_PLACES_API_KEY')
}

const args = process.argv.slice(2)
const FORCE = args.includes('--force')
const CITY_FILTER = args.find(a => a.startsWith('--city='))?.split('=')[1]
const DELAY_MS = 120

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

function slugify(s) {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

async function searchPlacePhoto(query, apiKey) {
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.photos,places.displayName',
    },
    body: JSON.stringify({ textQuery: query, languageCode: 'en' }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  const photo = data.places?.[0]?.photos?.[0]?.name
  if (!photo) throw new Error('No photo found')
  return photo
}

async function fetchPhotoUri(photoName, apiKey) {
  const url = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=1200&skipHttpRedirect=true&key=${apiKey}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`photo HTTP ${res.status}`)
  const data = await res.json()
  return data.photoUri
}

async function downloadAndCompress(uri, outPath) {
  const res = await fetch(uri)
  const buf = Buffer.from(await res.arrayBuffer())
  await sharp(buf)
    .resize(1200, 800, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(outPath)
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const apiKey = await loadApiKey()

  const guideFiles = (await readdir(GUIDES_DIR))
    .filter(f => f.endsWith('.json'))
    .sort()

  const stats = { processed: 0, skipped: 0, failed: 0, photosDownloaded: 0 }

  for (const file of guideFiles) {
    const citySlug = file.replace('.json', '')
    if (CITY_FILTER && citySlug !== CITY_FILTER) continue

    const guidePath = path.join(GUIDES_DIR, file)
    const guide = JSON.parse(await readFile(guidePath, 'utf-8'))
    const cityName = guide.name || citySlug

    let cityChanged = false
    console.log(`\n🏙️  ${cityName} (${citySlug})`)

    for (const [sectionName, section] of Object.entries(guide.guides || {})) {
      // Skip petsitting — online platforms (Pawshake, Rover, Holidog) have no
      // physical locations and Google Places matches noisy results (e.g.
      // "Rover Strasbourg" → Land Rover car dealership).
      if (sectionName === 'petsitting') continue
      // Skip tips — concept cards ("Currency & cost", "Best season", "Heat &
      // paw safety") that Google Places matches to irrelevant brand logos
      // (e.g. "Currency & cost Modena" → Ria Money Transfer logo). The tips
      // guide template now suppresses place.photo, so any image fetched here
      // is dead weight that pollutes the cache and JSON.
      if (sectionName === 'tips') continue
      const places = section?.places || []
      for (let idx = 0; idx < places.length; idx++) {
        const place = places[idx]
        if (!place.name) continue

        const placeSlug = slugify(place.name)
        const imgFile = `${citySlug}-${sectionName}-${placeSlug || idx}.jpg`
        const outPath = path.join(OUT_DIR, imgFile)
        const newPhotoPath = `/images/city-places/${imgFile}`

        if (!FORCE && existsSync(outPath)) {
          // Just update the JSON reference
          if (place.photo !== newPhotoPath) {
            place.photo = newPhotoPath
            cityChanged = true
          }
          stats.skipped++
          continue
        }

        try {
          const query = `${place.name} ${cityName}`
          const photoName = await searchPlacePhoto(query, apiKey)
          const uri = await fetchPhotoUri(photoName, apiKey)
          await downloadAndCompress(uri, outPath)
          place.photo = newPhotoPath
          cityChanged = true
          stats.photosDownloaded++
          const kb = Math.round((await readFile(outPath)).length / 1024)
          console.log(`  ✓ ${sectionName}/${place.name} (${kb} KB)`)
          await sleep(DELAY_MS)
        } catch (e) {
          console.error(`  ✗ ${sectionName}/${place.name}: ${e.message}`)
          stats.failed++
          await sleep(DELAY_MS)
        }
        stats.processed++
      }
    }

    if (cityChanged) {
      await writeFile(guidePath, JSON.stringify(guide, null, 2) + '\n', 'utf-8')
    }
  }

  console.log(`\n${'─'.repeat(60)}`)
  console.log(`✅ Downloaded: ${stats.photosDownloaded}`)
  console.log(`⏭  Skipped:    ${stats.skipped}`)
  console.log(`❌ Failed:     ${stats.failed}`)
  console.log(`📊 Total processed: ${stats.processed}`)
}

main().catch(err => { console.error(err); process.exit(1) })
