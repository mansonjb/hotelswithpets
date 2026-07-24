/**
 * One-off migration: copy every image from the Supabase Storage CDN to the
 * Cloudflare R2 bucket, preserving the key structure so lib/image-loader.js
 * keeps working after we only swap NEXT_PUBLIC_IMAGE_CDN.
 *
 * Source of truth = data/image-manifest.json (array of "/images/..." paths).
 * Supabase download URL = NEXT_PUBLIC_IMAGE_CDN + path.slice('/images'.length)
 * R2 object key         = path.slice('/images/'.length)   (e.g. hotels/x.jpg)
 *
 *   node scripts/migrate-supabase-to-r2.mjs           # copy only what's missing in R2
 *   node scripts/migrate-supabase-to-r2.mjs --all     # re-copy everything
 *   node scripts/migrate-supabase-to-r2.mjs --verify  # just count R2 vs manifest
 */
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mime from 'mime-types'
import { S3Client, PutObjectCommand, HeadObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const CONCURRENCY = 16

function env(k) {
  if (process.env[k]) return process.env[k]
  const txt = existsSync(path.join(ROOT, '.env.local')) ? readFileSync(path.join(ROOT, '.env.local'), 'utf8') : ''
  const m = txt.match(new RegExp(`^${k}=(.+)$`, 'm'))
  if (!m) throw new Error(`Missing ${k} in env or .env.local`)
  return m[1].trim()
}

const CDN = env('NEXT_PUBLIC_IMAGE_CDN').replace(/\/$/, '') // .../public/images
const BUCKET = env('R2_BUCKET')
const s3 = new S3Client({
  region: 'auto',
  endpoint: env('R2_ENDPOINT'),
  credentials: { accessKeyId: env('R2_ACCESS_KEY_ID'), secretAccessKey: env('R2_SECRET_ACCESS_KEY') },
})

const ALL = process.argv.includes('--all')
const VERIFY = process.argv.includes('--verify')

const manifest = JSON.parse(readFileSync(path.join(ROOT, 'data/image-manifest.json'), 'utf8'))
const paths = (Array.isArray(manifest) ? manifest : Object.keys(manifest)).filter(p => p.startsWith('/images/'))
const keyFor = p => p.slice('/images/'.length)          // hotels/x.jpg
const srcFor = p => CDN + p.slice('/images'.length)     // .../public/images/hotels/x.jpg

async function countR2() {
  let token, n = 0
  do {
    const r = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET, ContinuationToken: token }))
    n += r.KeyCount || 0
    token = r.IsTruncated ? r.NextContinuationToken : undefined
  } while (token)
  return n
}

if (VERIFY) {
  console.log(`manifest images: ${paths.length}`)
  console.log(`R2 objects:      ${await countR2()}`)
  process.exit(0)
}

async function existsInR2(key) {
  try { await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key })); return true }
  catch { return false }
}

async function copyOne(p) {
  const key = keyFor(p)
  if (!ALL && (await existsInR2(key))) return 'skip'
  const res = await fetch(srcFor(p))
  if (!res.ok) throw new Error(`GET ${res.status} ${p}`)
  const body = Buffer.from(await res.arrayBuffer())
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: body,
    ContentType: res.headers.get('content-type') || mime.lookup(key) || 'application/octet-stream',
    CacheControl: 'public, max-age=31536000, immutable',
  }))
  return 'copied'
}

let copied = 0, skipped = 0, failed = 0
const errors = []
let i = 0
async function worker() {
  while (i < paths.length) {
    const p = paths[i++]
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const r = await copyOne(p)
        r === 'copied' ? copied++ : skipped++
        break
      } catch (e) {
        if (attempt === 3) { failed++; errors.push(`${p}: ${e.message}`) }
        else await new Promise(r => setTimeout(r, 400 * attempt))
      }
    }
    const done = copied + skipped + failed
    if (done % 250 === 0) console.log(`  ${done}/${paths.length} (copied ${copied}, skipped ${skipped}, failed ${failed})`)
  }
}

console.log(`Migrating ${paths.length} images Supabase -> R2 (${BUCKET})...`)
await Promise.all(Array.from({ length: CONCURRENCY }, worker))
console.log(`\nDONE. copied ${copied}, skipped ${skipped}, failed ${failed}`)
if (errors.length) { console.log('First errors:'); errors.slice(0, 15).forEach(e => console.log('  ' + e)) }
console.log(`R2 now holds ${await countR2()} objects (manifest expects ${paths.length}).`)
