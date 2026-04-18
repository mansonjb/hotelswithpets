/**
 * Downloads missing hotel images for all hotels not yet in public/images/hotels/.
 * Uses picsum.photos with deterministic seeds derived from hotel.id.
 * Run: node scripts/download-missing-hotel-images.mjs
 */

import sharp from 'sharp'
import { mkdir } from 'fs/promises'
import { existsSync, statSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'hotels')
const HOTELS_JSON = path.join(__dirname, '..', 'data', 'hotels.json')

const PICSUM_W = 1200
const PICSUM_H = 800
const OUT_W = 800
const OUT_H = 500

const hotels = JSON.parse(readFileSync(HOTELS_JSON, 'utf-8'))

await mkdir(OUT_DIR, { recursive: true })

let downloaded = 0
let skipped = 0
let failed = 0

console.log(`\n📸 HotelsWithPets — Missing image downloader`)
console.log(`Total hotels: ${hotels.length}`)
console.log(`Output: ${OUT_DIR}\n`)

for (const hotel of hotels) {
  const outPath = path.join(OUT_DIR, `${hotel.id}.jpg`)

  if (existsSync(outPath)) {
    skipped++
    continue
  }

  // Build a descriptive seed from hotel.id (e.g. "milan-3" → "milan-luxury-hotel-3")
  const parts = hotel.id.split('-')
  const city = parts.slice(0, -1).join('-')
  const num = parts[parts.length - 1]
  const seed = `${city}-hotel-pet-friendly-${num}`

  const url = `https://picsum.photos/seed/${encodeURIComponent(seed)}/${PICSUM_W}/${PICSUM_H}`

  try {
    process.stdout.write(`  ⬇  ${hotel.id} … `)
    const res = await fetch(url, { redirect: 'follow' })
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`)

    const buffer = Buffer.from(await res.arrayBuffer())

    await sharp(buffer)
      .resize(OUT_W, OUT_H, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 85, progressive: true, mozjpeg: true })
      .toFile(outPath)

    const kb = Math.round(statSync(outPath).size / 1024)
    console.log(`✓ ${kb} KB`)
    downloaded++
  } catch (err) {
    console.log(`✗ FAILED: ${err.message}`)
    failed++
  }
}

console.log(`\n✅ Done — ${downloaded} downloaded, ${skipped} skipped, ${failed} failed`)

// Summary of all hotels coverage
const total = hotels.length
const covered = hotels.filter(h => existsSync(path.join(OUT_DIR, `${h.id}.jpg`))).length
console.log(`📊 Coverage: ${covered}/${total} hotels have images (${Math.round(covered/total*100)}%)`)
