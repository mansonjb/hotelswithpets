// Extract EN source of the destination-hub editorial (lib/cityContent.ts) into
// translation batches, so a target-language overlay (cityContentNl/It.ts) can be
// generated the same way cityContentDe.ts was.
// Run with tsx (imports the .ts data): CC_WORKDIR=/tmp/cc-work npx tsx scripts/i18n-cc/extract.mjs
import { writeFileSync, readdirSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import _cityContent from '../../lib/cityContent.ts'
const cityContent = _cityContent.default ?? _cityContent

const REPO = process.cwd()
const WORK = process.env.CC_WORKDIR || '/tmp/cc-work'
mkdirSync(WORK, { recursive: true })

const payload = {}
for (const [slug, cc] of Object.entries(cityContent)) {
  const out = {}
  if (cc.history?.en) out.history = cc.history.en
  if (Array.isArray(cc.petTips?.en) && cc.petTips.en.length) out.petTips = cc.petTips.en
  if (Array.isArray(cc.practicalInfo?.en) && cc.practicalInfo.en.length) out.practicalInfo = cc.practicalInfo.en
  if (Array.isArray(cc.sights) && cc.sights.length) {
    const sights = {}
    for (const s of cc.sights) if (s?.name && s.desc?.en) sights[s.name] = s.desc.en
    if (Object.keys(sights).length) out.sights = sights
  }
  if (Object.keys(out).length) payload[slug] = out
}

// clear old batch files
for (const f of readdirSync(WORK)) if (/^cc-(src|out-\w+)-batch-\d+\.json$/.test(f)) { try { writeFileSync(join(WORK, f), '') } catch {} }

const cities = Object.keys(payload)
const TARGET = 40000
let n = 0, cur = {}, size = 0
const flush = () => { if (Object.keys(cur).length) { writeFileSync(join(WORK, `cc-src-batch-${n}.json`), JSON.stringify(cur, null, 2)); n++; cur = {}; size = 0 } }
for (const c of cities) { const sz = JSON.stringify(payload[c]).length; if (size && size + sz > TARGET) flush(); cur[c] = payload[c]; size += sz }
flush()
const totalChars = cities.reduce((a, c) => a + JSON.stringify(payload[c]).length, 0)
console.log(`CITIES=${cities.length} BATCHES=${n} TOTAL_CHARS=${totalChars} WORKDIR=${WORK}`)
