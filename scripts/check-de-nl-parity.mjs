/**
 * DE + NL + IT completeness GUARD for city-guide JSON files.
 *
 * Policy: German (`*De`, 2026-08-21), Dutch (`*Nl`, 2026-08-21) and Italian
 * (`*It`, 2026-08-28) are first-class, non-optional shipping languages, authored
 * NATIVELY at ship time — exactly like PT (see translate-to-pt.py). A destination
 * must never ship with an English fallback standing in for a missing one.
 *
 * Rule: DE, NL and IT move together. For any base field where at least one of
 * `<base>De` / `<base>Nl` / `<base>It` is populated, ALL THREE must be non-empty.
 * This catches the exact failure mode: a new city shipped in German/Dutch but not
 * Italian (or any locale silently regressing below its twins). EN/FR/ES/PT
 * presence is already guaranteed by check-i18n + translate-to-pt.py. Fields empty
 * in all of DE/NL/IT (coming-soon sections) are ignored.
 *
 * Exit 0 = all DE + NL + IT present. Exit 1 = gaps (listed).
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

const LANGS = ['De', 'Nl', 'It']

/** Walk any node; at each object, require De/Nl/It siblings to move together. */
function walk(node, file, p) {
  if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, file, `${p}[${i}]`))
    return
  }
  if (!node || typeof node !== 'object') return

  // Collect the base names that carry any De/Nl/It sibling in this object.
  const bases = new Set()
  for (const key of Object.keys(node)) {
    for (const lang of LANGS) {
      if (key.endsWith(lang) && key.length > lang.length) bases.add(key.slice(0, -lang.length))
    }
  }
  for (const base of bases) {
    const present = LANGS.filter((lang) => !isEmpty(node[base + lang]))
    if (present.length === 0) continue // coming-soon in all three: fine
    const missing = LANGS.filter((lang) => isEmpty(node[base + lang]))
    if (missing.length > 0) {
      console.error(`❌ ${file}: ${p}.${base}{${present.join('/')}} populated but ${missing.map((l) => base + l).join(', ')} missing/empty`)
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
  console.log(`✅ DE + NL + IT parity: all localized fields have native de/nl/it across ${files.length} city-guide(s)`)
  process.exit(0)
} else {
  console.error(`\n${gaps} DE/NL/IT gap(s) found — author native German + Dutch + Italian before shipping.`)
  process.exit(1)
}
