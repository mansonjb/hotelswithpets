/**
 * Download + compress hotel images.
 * Uses picsum.photos (Unsplash-backed) with deterministic seeds.
 * Each hotel ID maps to a consistent image → reproducible builds.
 *
 * Usage: node scripts/download-images.mjs
 */

import sharp from 'sharp'
import { mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '..', 'public', 'images', 'hotels')

// picsum seed → deterministic image per hotel
// Larger size source (1200×800) → downscale for quality
const PICSUM_W = 1200
const PICSUM_H = 800

// Final output: 800×500 JPEG 85%
const OUT_W = 800
const OUT_H = 500

const hotels = [
  { id: 'amsterdam-1',   seed: 'amsterdam-canal-hotel' },
  { id: 'amsterdam-2',   seed: 'amsterdam-luxury-suite' },
  { id: 'amsterdam-3',   seed: 'amsterdam-modern-hotel' },
  { id: 'paris-1',       seed: 'paris-boutique-hotel' },
  { id: 'paris-2',       seed: 'paris-hotel-marais' },
  { id: 'paris-3',       seed: 'paris-hotel-classic' },
  { id: 'biarritz-1',    seed: 'biarritz-palace-ocean' },
  { id: 'biarritz-2',    seed: 'biarritz-villa-pool' },
  { id: 'biarritz-3',    seed: 'biarritz-surf-hotel' },
  { id: 'barcelona-1',   seed: 'barcelona-luxury-pool' },
  { id: 'barcelona-2',   seed: 'barcelona-cotton-hotel' },
  { id: 'barcelona-3',   seed: 'barcelona-ramblas-hotel' },
  { id: 'berlin-1',      seed: 'berlin-amano-mitte' },
  { id: 'berlin-2',      seed: 'berlin-soho-house' },
  { id: 'berlin-3',      seed: 'berlin-garden-hotel' },
  { id: 'lisbon-1',      seed: 'lisbon-bairro-alto' },
  { id: 'lisbon-2',      seed: 'lisbon-prata-terrace' },
  { id: 'lisbon-3',      seed: 'lisbon-riverside-hotel' },
]

await mkdir(OUT_DIR, { recursive: true })

let downloaded = 0
let skipped = 0
let failed = 0

console.log(`\n📸 HotelsWithPets — Image downloader`)
console.log(`Output: ${OUT_DIR}\n`)

for (const hotel of hotels) {
  const outPath = path.join(OUT_DIR, `${hotel.id}.jpg`)

  if (existsSync(outPath)) {
    console.log(`  ⏭  ${hotel.id}.jpg — already exists, skipping`)
    skipped++
    continue
  }

  const url = `https://picsum.photos/seed/${hotel.seed}/${PICSUM_W}/${PICSUM_H}`

  try {
    process.stdout.write(`  ⬇  ${hotel.id} … `)
    const res = await fetch(url, { redirect: 'follow' })
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`)

    const buffer = Buffer.from(await res.arrayBuffer())

    await sharp(buffer)
      .resize(OUT_W, OUT_H, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 85, progressive: true, mozjpeg: true })
      .toFile(outPath)

    const stat = (await import('fs')).statSync(outPath)
    const kb = Math.round(stat.size / 1024)
    console.log(`✓ saved (${kb} KB)`)
    downloaded++
  } catch (err) {
    console.log(`✗ FAILED: ${err.message}`)
    failed++
  }
}

console.log(`\n✅ Done — ${downloaded} downloaded, ${skipped} skipped, ${failed} failed`)
if (failed > 0) console.log('   Re-run to retry failed downloads.')
