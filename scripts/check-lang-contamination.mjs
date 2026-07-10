/**
 * check-lang-contamination.mjs
 *
 * Scans lib/cityContent.ts for cross-language contamination in the fr/es/pt
 * prose blocks (history, sight descriptions, petTips, practicalInfo). An early
 * multilingual generation pass produced "macaronic" text where Spanish words
 * leaked into Portuguese blocks, Portuguese into Spanish, and both into French
 * (the tell "em" instead of French "en"). check-i18n.mjs only validates sight
 * NAMES for English descriptors, so it never caught this.
 *
 * High-precision markers only (function/common words that are never proper
 * nouns), to avoid false positives from kept-in-original place names like
 * "Playa de la Concha" or "A Coruña".
 *
 * Usage:
 *   node scripts/check-lang-contamination.mjs            # report, exit 0
 *   node scripts/check-lang-contamination.mjs --strict   # exit 1 if any found
 *   node scripts/check-lang-contamination.mjs --slug=paris   # one entry
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = readFileSync(join(ROOT, 'lib/cityContent.ts'), 'utf-8')

const strict = process.argv.includes('--strict')
const only = (process.argv.find((a) => a.startsWith('--slug=')) || '').split('=')[1]

// Top-level slug boundaries: exactly 2-space indent then `key: {`
const slugStarts = []
const slugRe = /^ {2}([a-z0-9'-]+): \{$/gm
const reserved = new Set(['history', 'sights', 'petTips', 'practicalInfo', 'desc', 'fr', 'en', 'es', 'pt'])
let m
while ((m = slugRe.exec(src))) {
  const name = m[1].replace(/'/g, '')
  if (!reserved.has(name)) slugStarts.push([m.index, name])
}
const slugAt = (pos) => {
  let name = null
  for (const [s, n] of slugStarts) {
    if (s <= pos) name = n
    else break
  }
  return name
}

// Capture every fr/es/pt value (backtick string or [ ... ] array) with its slug
const entries = {}
const keyRe = /\b(fr|en|es|pt):\s*(`|\[)/g
while ((m = keyRe.exec(src))) {
  const loc = m[1]
  const opener = m[2]
  const start = keyRe.lastIndex
  const end = opener === '`' ? src.indexOf('`', start) : src.indexOf(']', start)
  const slug = slugAt(m.index)
  if (!slug) continue
  ;(entries[slug] ||= {})
  ;(entries[slug][loc] ||= []).push(src.slice(start, end))
}

const wordCount = (text, words) => {
  const t = ' ' + text.toLowerCase() + ' '
  const out = {}
  for (const w of words) {
    const c = (t.match(new RegExp(`(?<![\\wàâäéèêëïîôöùûüçñ])${w}(?![\\wàâäéèêëïîôöùûüçñ])`, 'g')) || []).length
    if (c) out[w] = c
  }
  return out
}

// French never uses standalone "em" (it is Spanish/Portuguese for "in").
const FR_BAD = ['em']
// Portuguese function/common words that should never appear in Spanish prose.
const ES_BAD = ['com', 'cidade', 'coração', 'não', 'muito', 'então', 'você', 'concelho', 'esplanadas', 'aldeia', 'cães']
// Spanish function/common words that should never appear in Portuguese prose.
const PT_BAD = ['hoy', 'muy', 'también', 'construyó', 'viajeros', 'viajero', 'revolución', 'comercio', 'ciudad', 'verano', 'año', 'años', 'playa', 'perros']

const flagged = {}
for (const [slug, locs] of Object.entries(entries)) {
  if (only && slug !== only) continue
  const fr = (locs.fr || []).join(' ')
  const es = (locs.es || []).join(' ')
  const pt = (locs.pt || []).join(' ')
  const iss = []
  const cf = wordCount(fr, FR_BAD)
  if (Object.keys(cf).length) iss.push(`FR-em:${Object.values(cf).reduce((a, b) => a + b, 0)}`)
  const ce = wordCount(es, ES_BAD)
  if (Object.keys(ce).length) iss.push('ES<-PT:' + Object.entries(ce).map(([k, v]) => `${k}x${v}`).join(','))
  const cp = wordCount(pt, PT_BAD)
  if (Object.keys(cp).length) iss.push('PT<-ES:' + Object.entries(cp).map(([k, v]) => `${k}x${v}`).join(','))
  if (iss.length) flagged[slug] = iss
}

const slugs = Object.keys(flagged).sort()
console.log(`Language-contamination scan: ${slugs.length} contaminated / ${Object.keys(entries).length} entries`)
for (const s of slugs) console.log(`  ${s}: ${flagged[s].join(' | ')}`)

if (strict && slugs.length) {
  console.error(`\n❌ ${slugs.length} entries contain cross-language contamination.`)
  process.exit(1)
}
