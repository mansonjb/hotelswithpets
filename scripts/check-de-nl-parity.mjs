/**
 * DE + NL completeness GUARD for city-guide JSON files.
 *
 * Policy (since 2026-08-21): German (`*De`) and Dutch (`*Nl`) are first-class,
 * non-optional shipping languages, authored NATIVELY at ship time — exactly like
 * PT (see translate-to-pt.py). A destination must never ship with an English or
 * German fallback standing in for missing Dutch, and vice versa.
 *
 * Rule: German and Dutch must move together. For every populated `<base>De`
 * field there MUST be a non-empty `<base>Nl` sibling, and for every populated
 * `<base>Nl` there MUST be a non-empty `<base>De`. This is the exact failure
 * mode this guard exists to catch: a new city shipped in German but not Dutch
 * (or vice versa), or a Dutch field silently regressing below its German twin.
 * EN/FR/ES/PT presence is already guaranteed by check-i18n + translate-to-pt.py.
 * Fields empty in both DE and NL (coming-soon sections) are ignored.
 *
 * Exit 0 = all DE + NL present. Exit 1 = gaps (listed).
 *
 *   node scripts/check-de-nl-parity.mjs            # check all city-guides
 *   node scripts/check-de-nl-parity.mjs zurich     # check specific cities
 */

import { readFileSync, readdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const DIR = path.join(ROOT, 'data', 'city-guides')

const isEmpty = (v) =>
  v === undefined ||
  v === null ||
  (typeof v === 'string' && v.trim() === '') ||
  (Array.isArray(v) && v.length === 0)

let gaps = 0

/** Walk any node; at each object, require every populated De/Nl field to have its twin. */
function walk(node, file, p) {
  if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, file, `${p}[${i}]`))
    return
  }
  if (!node || typeof node !== 'object') return

  for (const key of Object.keys(node)) {
    let base, self, twinKey, twinLang
    if (key.endsWith('De')) { base = key.slice(0, -2); twinLang = 'Nl' }
    else if (key.endsWith('Nl')) { base = key.slice(0, -2); twinLang = 'De' }
    else continue
    self = node[key]
    if (isEmpty(self)) continue
    twinKey = base + twinLang
    if (isEmpty(node[twinKey])) {
      console.error(`❌ ${file}: ${p}.${key} is populated but its ${twinKey} twin is missing/empty`)
      gaps++
    }
  }
  for (const key of Object.keys(node)) walk(node[key], file, `${p}.${key}`)
}

const arg = process.argv.slice(2)
const files = (arg.length
  ? arg.map((s) => (s.endsWith('.json') ? s : `${s}.json`))
  : readdirSync(DIR).filter((f) => f.endsWith('.json') && !f.startsWith('_')))

for (const f of files) {
  let o
  try {
    o = JSON.parse(readFileSync(path.join(DIR, f), 'utf-8'))
  } catch (e) {
    console.error(`❌ ${f}: invalid JSON (${e.message})`)
    gaps++
    continue
  }
  walk(o, f, '')
}

if (gaps === 0) {
  console.log(`✅ DE + NL parity: all localized fields have native de/nl across ${files.length} city-guide(s)`)
  process.exit(0)
} else {
  console.error(`\n${gaps} DE/NL gap(s) found — author native German + Dutch before shipping.`)
  process.exit(1)
}
