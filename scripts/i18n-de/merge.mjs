// Merge translated German batches (gd-out-batch-*.json in DE_WORKDIR) back into
// data/city-guides/*.json. Robust place matching: normalized name, then positional.
// Usage: DE_WORKDIR=/tmp/de-guides-work node scripts/i18n-de/merge.mjs
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const REPO = process.cwd()
const WORK = process.env.DE_WORKDIR || '/tmp/de-guides-work'
const GDIR = join(REPO, 'data/city-guides')
const deKeyFor = (enKey) => (enKey.endsWith('En') ? enKey.slice(0, -2) + 'De' : enKey + 'De')
const norm = (s) => String(s || '').normalize('NFC').replace(/\s+/g, ' ').trim().toLowerCase()

const merged = {}
let files = 0
for (const f of readdirSync(WORK)) {
  if (!/^gd-out-batch-\d+\.json$/.test(f)) continue
  const txt = readFileSync(join(WORK, f), 'utf8')
  if (!txt.trim()) continue
  try { Object.assign(merged, JSON.parse(txt)); files++ } catch (e) { console.error(`BAD ${f}: ${e.message}`) }
}
console.log(`gd-out files merged: ${files} | cities: ${Object.keys(merged).length}`)

let em = 0
const walk = (v) => { if (typeof v === 'string') { if (v.includes('—')) em++ } else if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === 'object') Object.values(v).forEach(walk) }
walk(merged)
if (em) { console.error(`EM-DASH in ${em} strings, aborting`); process.exit(1) }

let cityCount = 0, sectionCount = 0, placeFieldCount = 0, missPlace = 0
for (const [city, sections] of Object.entries(merged)) {
  const file = join(GDIR, `${city}.json`)
  if (!existsSync(file)) { console.error(`no file for ${city}`); continue }
  const g = JSON.parse(readFileSync(file, 'utf8'))
  for (const [sec, data] of Object.entries(sections)) {
    const S = g.guides?.[sec]
    if (!S) continue
    if (data.titleEn) S.titleDe = data.titleEn
    if (data.introEn) S.introDe = data.introEn
    if (data.faqsEn) S.faqsDe = data.faqsEn
    sectionCount++
    const srcPlaces = S.places || []
    const byNorm = new Map(srcPlaces.map((p) => [norm(p.name), p]))
    const outPlaces = data.places || []
    const sameLen = outPlaces.length === srcPlaces.length
    outPlaces.forEach((op, i) => {
      let P = byNorm.get(norm(op.name)) || (sameLen ? srcPlaces[i] : null)
      if (!P) { missPlace++; return }
      for (const [enKey, val] of Object.entries(op.fields || {})) { P[deKeyFor(enKey)] = val; placeFieldCount++ }
    })
  }
  writeFileSync(file, JSON.stringify(g, null, 2) + '\n')
  cityCount++
}
console.log(`wrote ${cityCount} | sections ${sectionCount} | place fields ${placeFieldCount} | unmatched ${missPlace}`)
