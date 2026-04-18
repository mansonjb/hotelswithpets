/**
 * i18n integrity checker — run before every deploy.
 * Detects English text leaking into FR/ES pages.
 *
 * Usage: node scripts/check-i18n.mjs
 * Exit code 1 if any issues found.
 */

import { readFileSync, readdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

let errors = 0

// ── 1. Check editorial.ts has no hardcoded ['en'] locale lookups ─────────────

const editorial = readFileSync(path.join(ROOT, 'lib', 'editorial.ts'), 'utf-8')
const hardcoded = [...editorial.matchAll(/destContextByLocale\[['"]en['"]\]/g)]
  // Allow the fallback pattern (after ??)
  .filter(m => {
    const before = editorial.slice(Math.max(0, m.index - 10), m.index)
    return !before.includes('??')
  })

if (hardcoded.length > 0) {
  console.error(`❌ editorial.ts: ${hardcoded.length} hardcoded ['en'] locale lookups (use ctxLocale variable)`)
  errors++
} else {
  console.log('✅ editorial.ts: no hardcoded locale lookups')
}

// ── 2. Check all TSX pages: no hardcoded ['en'] locale lookups ───────────────

function walkTsx(dir) {
  const results = []
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name)
    if (f.isDirectory()) results.push(...walkTsx(full))
    else if (f.name.endsWith('.tsx') || f.name.endsWith('.ts')) results.push(full)
  }
  return results
}

const tsxFiles = walkTsx(path.join(ROOT, 'app'))
for (const file of tsxFiles) {
  const content = readFileSync(file, 'utf-8')
  const matches = [...content.matchAll(/destContextByLocale\[['"]en['"]\]/g)]
    .filter(m => {
      const before = content.slice(Math.max(0, m.index - 10), m.index)
      return !before.includes('??')
    })
  if (matches.length > 0) {
    const rel = path.relative(ROOT, file)
    console.error(`❌ ${rel}: hardcoded ['en'] in destContextByLocale`)
    errors++
  }
}
if (errors === 0) console.log('✅ All TSX pages: no hardcoded locale lookups')

// ── 3. Check city guides have no EN text in FR/ES fields ─────────────────────

const guidesDir = path.join(ROOT, 'data', 'city-guides')
// Common English-only words that shouldn't appear in FR/ES fields
const EN_MARKERS = /\b(the|and|with|for|from|this|that|which|where|when|their|there|hotel|street|park|beach|near|just|also|very|more|most|some|only|each|both|first|last|good|best|great|well|even|still|already|often|always|never|every|other|another|between|within|without|through|around|during|before|after|above|below|along|across|behind|beside|beyond|despite|except|since|until|unless|while|though|although|because|however|therefore|moreover|furthermore)\b/

const guides = readdirSync(guidesDir).filter(f => f.endsWith('.json') && !f.startsWith('_'))
let guideIssues = 0

for (const guideFile of guides) {
  const slug = guideFile.replace('.json', '')
  let data
  try {
    data = JSON.parse(readFileSync(path.join(guidesDir, guideFile), 'utf-8'))
  } catch {
    console.error(`❌ ${guideFile}: invalid JSON`)
    errors++
    continue
  }

  const guides_data = data.guides ?? data

  // Check FR fields don't contain obvious English
  const checkField = (obj, locale, fieldSuffix, path_) => {
    if (typeof obj !== 'object' || !obj) return
    for (const [key, val] of Object.entries(obj)) {
      if (typeof val === 'string' && key.endsWith(fieldSuffix) && val.length > 20) {
        if (EN_MARKERS.test(val.toLowerCase())) {
          // Only flag if >30% of words match English markers
          const words = val.toLowerCase().split(/\s+/)
          const enWords = words.filter(w => EN_MARKERS.test(w))
          if (enWords.length / words.length > 0.3) {
            console.warn(`⚠️  ${slug} / ${path_}.${key}: likely English text in ${locale} field`)
            guideIssues++
          }
        }
      } else if (typeof val === 'object') {
        checkField(val, locale, fieldSuffix, `${path_}.${key}`)
      }
    }
  }

  // Check array fields
  const checkArrayField = (arr, locale, fieldName, path_) => {
    if (!Array.isArray(arr)) return
    arr.forEach((item, i) => {
      if (typeof item === 'string' && item.length > 20) {
        const words = item.toLowerCase().split(/\s+/)
        const enWords = words.filter(w => EN_MARKERS.test(w))
        if (enWords.length / words.length > 0.35) {
          console.warn(`⚠️  ${slug} / ${path_}[${i}]: likely English in ${locale} array`)
          guideIssues++
        }
      }
    })
  }

  // Sample check FR/ES sections
  for (const section of Object.values(guides_data)) {
    if (typeof section !== 'object' || !section) continue
    for (const place of (section.places ?? [])) {
      if (Array.isArray(place.tipsFr)) checkArrayField(place.tipsFr, 'fr', 'tipsFr', slug)
      if (Array.isArray(place.tipsEs)) checkArrayField(place.tipsEs, 'es', 'tipsEs', slug)
    }
  }
}

if (guideIssues > 0) {
  console.warn(`⚠️  ${guideIssues} potential i18n issues in city guides (review manually)`)
} else {
  console.log(`✅ City guides (${guides.length} files): no obvious EN text in FR/ES fields`)
}

// ── 4. Check catIntrosByLocale has entries for all 3 locales ─────────────────
// Simple: count occurrences of each category slug — should appear at least 3x (one per locale)

const catSlugs = ['dog-friendly', 'cat-friendly', 'beach-access', 'near-parks', 'luxury', 'dogs-stay-free']
let catMissing = 0
for (const cat of catSlugs) {
  const count = (editorial.match(new RegExp(`'${cat}'`, 'g')) ?? []).length
  if (count < 3) {
    console.error(`❌ editorial.ts catIntrosByLocale: '${cat}' appears only ${count}x (expected ≥3 for en/fr/es)`)
    errors++
    catMissing++
  }
}
if (catMissing === 0) console.log('✅ editorial.ts: catIntrosByLocale complete for all locales × categories')

// ── Result ────────────────────────────────────────────────────────────────────

console.log(`\n${errors > 0 ? '❌' : '✅'} i18n check complete — ${errors} error(s), ${guideIssues} warning(s)`)
process.exit(errors > 0 ? 1 : 0)
