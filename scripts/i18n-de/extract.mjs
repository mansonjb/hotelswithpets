// Extract EN city-guide content that still lacks German, into translation batches.
// Idempotent: a section is included only if it has titleEn but no titleDe.
// Usage: DE_WORKDIR=/tmp/de-guides-work node scripts/i18n-de/extract.mjs
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const REPO = process.cwd()
const WORK = process.env.DE_WORKDIR || '/tmp/de-guides-work'
const GDIR = join(REPO, 'data/city-guides')
mkdirSync(WORK, { recursive: true })

// localized EN field on a place = a key with a `${key}Fr` sibling (or `${base}En` + `${base}Fr`)
function localizedBases(obj) {
  const out = []
  for (const k of Object.keys(obj)) {
    if (typeof obj[k] !== 'string') continue
    if (/(Fr|Es|Pt|De)$/.test(k)) continue
    if (k.endsWith('En')) { const base = k.slice(0, -2); if ((base + 'Fr') in obj) out.push({ enKey: k, text: obj[k] }) }
    else if ((k + 'Fr') in obj) out.push({ enKey: k, text: obj[k] })
  }
  return out
}

const files = readdirSync(GDIR).filter((f) => f.endsWith('.json') && !f.startsWith('_'))
const payload = {}
for (const file of files) {
  const slug = file.replace('.json', '')
  let g
  try { g = JSON.parse(readFileSync(join(GDIR, file), 'utf8')) } catch { continue }
  const cityOut = {}
  for (const [sec, s] of Object.entries(g.guides || {})) {
    if (!s || typeof s !== 'object') continue
    const hasPlaces = Array.isArray(s.places) && s.places.length
    if (!s.titleEn && !hasPlaces) continue
    if (s.titleDe) continue // already translated -> skip (idempotent)
    const secOut = { titleEn: s.titleEn ?? '', introEn: s.introEn ?? '', faqsEn: s.faqsEn ?? [], places: [] }
    if (hasPlaces) for (const p of s.places) {
      const fields = {}
      for (const { enKey, text } of localizedBases(p)) fields[enKey] = text
      secOut.places.push({ name: p.name, fields })
    }
    cityOut[sec] = secOut
  }
  if (Object.keys(cityOut).length) payload[slug] = cityOut
}

// clear old batch files
for (const f of readdirSync(WORK)) if (/^gd-(src|out)-batch-\d+\.json$/.test(f)) { try { writeFileSync(join(WORK, f), '') } catch {} }

const cities = Object.keys(payload)
const TARGET = 50000
let n = 0, cur = {}, size = 0
const flush = () => { if (Object.keys(cur).length) { writeFileSync(join(WORK, `gd-src-batch-${n}.json`), JSON.stringify(cur, null, 2)); n++; cur = {}; size = 0 } }
for (const c of cities) { const sz = JSON.stringify(payload[c]).length; if (size && size + sz > TARGET) flush(); cur[c] = payload[c]; size += sz }
flush()
console.log(`REMAINING_CITIES=${cities.length} BATCHES=${n} WORKDIR=${WORK}`)
