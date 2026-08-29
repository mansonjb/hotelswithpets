// Merge translated cityContent overlays (cc-out-<lang>-batch-*.json in CC_WORKDIR)
// into lib/cityContent<Lang>.ts, mirroring the auto-generated cityContentDe.ts.
// Usage: CC_WORKDIR=/tmp/cc-work node scripts/i18n-cc/merge.mjs nl
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const REPO = process.cwd()
const WORK = process.env.CC_WORKDIR || '/tmp/cc-work'
const lang = (process.argv[2] || '').toLowerCase()
if (!['nl', 'it'].includes(lang)) { console.error('usage: merge.mjs <nl|it>'); process.exit(1) }
const Lang = lang[0].toUpperCase() + lang.slice(1)

const merged = {}
let files = 0
for (const f of readdirSync(WORK)) {
  if (!new RegExp(`^cc-out-${lang}-batch-\\d+\\.json$`).test(f)) continue
  const txt = readFileSync(join(WORK, f), 'utf8')
  if (!txt.trim()) continue
  try { Object.assign(merged, JSON.parse(txt)); files++ } catch (e) { console.error(`BAD ${f}: ${e.message}`); process.exit(1) }
}

// em-dash guard (same as the German pipeline)
let em = 0
const walk = (v) => { if (typeof v === 'string') { if (v.includes('—')) em++ } else if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === 'object') Object.values(v).forEach(walk) }
walk(merged)
if (em) { console.error(`EM-DASH in ${em} strings, aborting`); process.exit(1) }

const slugs = Object.keys(merged).sort()
const q = (s) => '`' + String(s).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`'
let out = `// AUTO-GENERATED ${Lang} overlay for cityContent. Do not edit by hand.\n`
out += `export interface CityContent${Lang} { history?: string; petTips?: string[]; practicalInfo?: string[]; sights?: Record<string, string> }\n`
out += `export const cityContent${Lang}: Record<string, CityContent${Lang}> = {\n`
for (const slug of slugs) {
  const cc = merged[slug]
  out += `  ${/^[a-z][a-z0-9]*$/.test(slug) ? slug : `'${slug}'`}: {\n`
  if (cc.history) out += `    history: ${q(cc.history)},\n`
  if (Array.isArray(cc.petTips) && cc.petTips.length) out += `    petTips: [${cc.petTips.map(q).join(', ')}],\n`
  if (Array.isArray(cc.practicalInfo) && cc.practicalInfo.length) out += `    practicalInfo: [${cc.practicalInfo.map(q).join(', ')}],\n`
  if (cc.sights && Object.keys(cc.sights).length) {
    out += `    sights: {\n`
    for (const [name, desc] of Object.entries(cc.sights)) out += `      ${JSON.stringify(name)}: ${q(desc)},\n`
    out += `    },\n`
  }
  out += `  },\n`
}
out += `}\n`
writeFileSync(join(REPO, `lib/cityContent${Lang}.ts`), out)
console.log(`wrote lib/cityContent${Lang}.ts | files=${files} | cities=${slugs.length}`)
