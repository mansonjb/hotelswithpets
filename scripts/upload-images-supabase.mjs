/**
 * Upload public/images/** to the Supabase Storage bucket "images" and write
 * data/image-manifest.json (the list of every /images/... path that exists in
 * the bucket, used to replace on-disk existsSync checks).
 *
 * Uses the Supabase Storage REST API directly via fetch (no SDK) to avoid the
 * realtime-js init crash and keep this dependency-light.
 *
 *   node scripts/upload-images-supabase.mjs            # upload only new/changed
 *   node scripts/upload-images-supabase.mjs --all      # re-upload everything
 *   node scripts/upload-images-supabase.mjs --manifest # rebuild manifest only
 *   node scripts/upload-images-supabase.mjs --check    # connectivity + bucket only
 */
import { readFile, writeFile, readdir, stat } from 'fs/promises'
import { existsSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mime from 'mime-types'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const BUCKET = 'images'
const IMG_ROOT = path.join(ROOT, 'public', 'images')
const CONCURRENCY = 12

function env(k) {
  if (process.env[k]) return process.env[k]
  const txt = existsSync(path.join(ROOT, '.env.local')) ? readFileSync(path.join(ROOT, '.env.local'), 'utf8') : ''
  const m = txt.match(new RegExp(`^${k}=(.+)$`, 'm'))
  if (!m) throw new Error(`Missing ${k} in env or .env.local`)
  return m[1].trim()
}

const URL_BASE = env('SUPABASE_URL').replace(/\/$/, '')
const KEY = env('SUPABASE_SERVICE_KEY')
const ST = `${URL_BASE}/storage/v1`
const H = { Authorization: `Bearer ${KEY}`, apikey: KEY }

const ALL = process.argv.includes('--all')
const MANIFEST_ONLY = process.argv.includes('--manifest')
const CHECK = process.argv.includes('--check')

async function ensureBucket() {
  const r = await fetch(`${ST}/bucket`, { headers: H })
  if (!r.ok) throw new Error(`listBuckets ${r.status}: ${(await r.text()).slice(0, 200)}`)
  const buckets = await r.json()
  if (buckets.some((b) => b.name === BUCKET)) { console.log(`Bucket "${BUCKET}" exists.`); return }
  const c = await fetch(`${ST}/bucket`, {
    method: 'POST', headers: { ...H, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: BUCKET, id: BUCKET, public: true, file_size_limit: 15728640 }),
  })
  if (!c.ok) throw new Error(`createBucket ${c.status}: ${(await c.text()).slice(0, 200)}`)
  console.log(`Bucket "${BUCKET}" created (public).`)
}

async function walk(dir, base = '') {
  const out = []
  for (const name of await readdir(dir)) {
    const fp = path.join(dir, name)
    const rel = base ? `${base}/${name}` : name
    const s = await stat(fp)
    if (s.isDirectory()) out.push(...await walk(fp, rel))
    else if (/\.(jpe?g|png|webp|avif|svg)$/i.test(name)) out.push({ fp, key: rel })
  }
  return out
}

async function listAll(prefix = '') {
  const acc = []
  let offset = 0
  for (;;) {
    const r = await fetch(`${ST}/object/list/${BUCKET}`, {
      method: 'POST', headers: { ...H, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prefix: prefix ? prefix + '/' : '', limit: 1000, offset, sortBy: { column: 'name', order: 'asc' } }),
    })
    if (!r.ok) throw new Error(`list ${r.status}: ${(await r.text()).slice(0, 150)}`)
    const data = await r.json()
    if (!data.length) break
    for (const item of data) {
      if (item.id === null) acc.push(...await listAll(prefix ? `${prefix}/${item.name}` : item.name))
      else acc.push(prefix ? `${prefix}/${item.name}` : item.name)
    }
    if (data.length < 1000) break
    offset += 1000
  }
  return acc
}

async function uploadOne(f) {
  const body = await readFile(f.fp)
  const r = await fetch(`${ST}/object/${BUCKET}/${f.key}`, {
    method: 'POST',
    headers: { ...H, 'Content-Type': mime.lookup(f.fp) || 'image/jpeg', 'x-upsert': 'true', 'cache-control': 'max-age=31536000' },
    body,
  })
  if (!r.ok) throw new Error(`${r.status}: ${(await r.text()).slice(0, 120)}`)
}

await ensureBucket()
if (CHECK) { console.log('Connectivity + bucket OK.'); process.exit(0) }

const files = await walk(IMG_ROOT)
console.log(`Found ${files.length} local image files.`)

const manifest = files.map((f) => `/images/${f.key}`).sort()
await writeFile(path.join(ROOT, 'data/image-manifest.json'), JSON.stringify(manifest, null, 0) + '\n')
console.log(`Wrote data/image-manifest.json (${manifest.length} entries).`)
if (MANIFEST_ONLY) process.exit(0)

let existing = new Set()
if (!ALL) { existing = new Set(await listAll()); console.log(`Bucket already has ${existing.size} objects.`) }

const todo = files.filter((f) => ALL || !existing.has(f.key))
console.log(`Uploading ${todo.length} files (${files.length - todo.length} skipped)...`)

let up = 0, fail = 0
const fails = []
const queue = [...todo]
async function worker() {
  for (;;) {
    const f = queue.pop()
    if (!f) return
    try { await uploadOne(f); up++; if (up % 250 === 0) console.log(`  uploaded ${up}/${todo.length}...`) }
    catch (e) { fail++; fails.push(`${f.key}: ${e.message}`) }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker))

console.log(`\nDone. uploaded=${up} failed=${fail}`)
if (fails.length) { console.log('Failures (first 15):'); fails.slice(0, 15).forEach((x) => console.log('  ' + x)) }
