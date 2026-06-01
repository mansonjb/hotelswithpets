/**
 * Fetches thumbnail photos for the 60 Paris arrondissement hotel picks.
 * Searches Google Places for each hotel name + " Paris", grabs the first photo,
 * saves as 400x300 jpeg. Updates data/paris-arrondissements.json to add an
 * `image` field per hotel pointing to the saved path.
 *
 * Usage: node scripts/fetch-paris-hotel-thumbs.mjs
 */
import sharp from 'sharp'
import { mkdir, readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'images', 'paris-hotels')
const JSON_PATH = path.join(ROOT, 'data', 'paris-arrondissements.json')

async function loadApiKey() {
  if (process.env.GOOGLE_PLACES_API_KEY) return process.env.GOOGLE_PLACES_API_KEY
  const env = await readFile(path.join(ROOT, '.env.local'), 'utf-8')
  const match = env.match(/GOOGLE_PLACES_API_KEY=(.+)/)
  if (match) return match[1].trim()
  throw new Error('No GOOGLE_PLACES_API_KEY')
}

function slugify(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

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
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  const photo = data.places?.[0]?.photos?.[0]?.name
  if (!photo) throw new Error('no photo')
  return photo
}

async function fetchPhotoUri(photoName, apiKey) {
  const url = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=800&skipHttpRedirect=true&key=${apiKey}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`photo HTTP ${res.status}`)
  const data = await res.json()
  return data.photoUri
}

async function downloadAndCompress(uri, outPath) {
  const res = await fetch(uri)
  const buf = Buffer.from(await res.arrayBuffer())
  await sharp(buf)
    .resize(600, 400, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toFile(outPath)
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const apiKey = await loadApiKey()
  const data = JSON.parse(await readFile(JSON_PATH, 'utf8'))

  let okCount = 0, failCount = 0, skipCount = 0

  for (const arr of data) {
    for (const hotel of arr.hotels) {
      const hotelSlug = slugify(hotel.name)
      const filename = `${hotelSlug}.jpg`
      const outPath = path.join(OUT_DIR, filename)
      const publicPath = `/images/paris-hotels/${filename}`

      if (existsSync(outPath)) {
        hotel.image = publicPath
        console.log(`⏩ ${arr.slug} / ${hotel.name}: exists`)
        skipCount++
        continue
      }

      try {
        const query = `${hotel.name} hotel Paris`
        console.log(`🔍 ${arr.slug} / ${hotel.name}`)
        const photoName = await searchPhoto(query, apiKey)
        const uri = await fetchPhotoUri(photoName, apiKey)
        await downloadAndCompress(uri, outPath)
        hotel.image = publicPath
        const kb = Math.round((await readFile(outPath)).length / 1024)
        console.log(`   ✅ ${kb} KB`)
        okCount++
        await new Promise(r => setTimeout(r, 400))
      } catch (e) {
        console.error(`   ❌ ${e.message}`)
        failCount++
      }
    }
  }

  // Write back the JSON with new `image` fields
  await writeFile(JSON_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8')

  console.log(`\nDone: ${okCount} new, ${skipCount} cached, ${failCount} failed (of 60 total)`)
}

main().catch(err => { console.error(err); process.exit(1) })
