/**
 * Upload local images straight to the Cloudflare R2 bucket, no Supabase hop.
 *
 * This replaces the old two-step `images:sync` (upload-images-supabase.mjs then
 * migrate-supabase-to-r2.mjs), which broke once the Supabase Storage quota was
 * exceeded (HTTP 402): every new destination then shipped with 404 hero/place
 * images until someone uploaded to R2 by hand. R2 is the only CDN the site
 * serves from (NEXT_PUBLIC_IMAGE_CDN), so we write to it directly.
 *
 * Source of truth = data/image-manifest.json (array of "/images/..." paths).
 * Local file  = public/images/<key>        (e.g. public/images/hotels/x.jpg)
 * R2 key      = path.slice('/images/'.length)   (e.g. hotels/x.jpg)
 *
 *   node scripts/upload-images-r2.mjs           # upload only what is missing in R2
 *   node scripts/upload-images-r2.mjs --all     # re-upload everything
 *   node scripts/upload-images-r2.mjs --verify  # just count R2 vs manifest
 */
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mime from 'mime-types'
import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'

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
const keyFor = p => p.slice('/images/'.length)              // hotels/x.jpg
const fileFor = p => path.join(ROOT, 'public', p)           // public/images/hotels/x.jpg

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

// List every key in R2 once (a few paginated calls) instead of one HeadObject
// per manifest entry, so re-running only uploads new images.
async function listR2Keys() {
  const keys = new Set()
  let token
  do {
    const r = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET, ContinuationToken: token }))
    for (const o of r.Contents || []) keys.add(o.Key)
    token = r.IsTruncated ? r.NextContinuationToken : undefined
  } while (token)
  return keys
}
const R2_KEYS = ALL ? new Set() : await listR2Keys()

async function uploadOne(p) {
  const key = keyFor(p)
  if (!ALL && R2_KEYS.has(key)) return 'skip'
  const file = fileFor(p)
  if (!existsSync(file)) return 'missing'
  const body = readFileSync(file)
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: body,
    ContentType: mime.lookup(key) || 'application/octet-stream',
    CacheControl: 'public, max-age=31536000, immutable',
  }))
  return 'uploaded'
}

let uploaded = 0, skipped = 0, missing = 0, failed = 0
const errors = [], missingFiles = []
let i = 0
async function worker() {
  while (i < paths.length) {
    const p = paths[i++]
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const r = await uploadOne(p)
        if (r === 'uploaded') uploaded++
        else if (r === 'skip') skipped++
        else { missing++; missingFiles.push(p) }
        break
      } catch (e) {
        if (attempt === 3) { failed++; errors.push(`${p}: ${e.message}`) }
        else await new Promise(r => setTimeout(r, 400 * attempt))
      }
    }
    const done = uploaded + skipped + missing + failed
    if (done % 250 === 0) console.log(`  ${done}/${paths.length} (uploaded ${uploaded}, skipped ${skipped}, missing ${missing}, failed ${failed})`)
  }
}

console.log(`Uploading ${paths.length} images local -> R2 (${BUCKET})...`)
await Promise.all(Array.from({ length: CONCURRENCY }, worker))
console.log(`\nDONE. uploaded ${uploaded}, skipped ${skipped}, missing-local ${missing}, failed ${failed}`)
if (missingFiles.length) { console.log('Missing local files (not on disk, skipped):'); missingFiles.slice(0, 15).forEach(e => console.log('  ' + e)) }
if (errors.length) { console.log('First errors:'); errors.slice(0, 15).forEach(e => console.log('  ' + e)) }
console.log(`R2 now holds ${await countR2()} objects (manifest expects ${paths.length}).`)
