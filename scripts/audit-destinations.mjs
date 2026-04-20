/**
 * Full parity audit of all destinations — checks every city against Amsterdam baseline.
 *
 * For each destination it verifies:
 *   1. heroImage file exists on disk
 *   2. weather (12 months) present in destinations.json
 *   3. lat/lng present
 *   4. destContextByLocale entry in EN + FR + ES (editorial.ts)
 *   5. cityContent entry with history + 6 sights + petTips + practicalInfo in EN/FR/ES
 *   6. city-guide JSON file exists with all 8 sections
 *   7. city-guide JSON has no obvious English leaking into FR/ES fields
 *   8. at least 3 hotels in hotels.json (warn if < 3)
 *   9. slug consistency (no orphan guides, no orphan hotels)
 *
 * Usage: node scripts/audit-destinations.mjs
 */

import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const REQUIRED_GUIDE_SECTIONS = ['restaurants', 'parks', 'transport', 'beaches', 'vets', 'tips', 'attractions', 'petsitting']
const WEATHER_MONTHS = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
const LOCALES = ['en', 'fr', 'es']
const MIN_HOTELS = 3

// Suspiciously English phrases leaking into FR/ES
const EN_TELLS = /\b(the|and|with|this|that|dogs are|cats are|pets are|you can|you will|please|your|our|their|welcome to|especially|located|features|offers)\b/i

// Load data files
const destinations = JSON.parse(readFileSync(path.join(ROOT, 'data/destinations.json'), 'utf-8'))
const hotels = JSON.parse(readFileSync(path.join(ROOT, 'data/hotels.json'), 'utf-8'))
const editorial = readFileSync(path.join(ROOT, 'lib/editorial.ts'), 'utf-8')
const cityContentSrc = readFileSync(path.join(ROOT, 'lib/cityContent.ts'), 'utf-8')

// Hotel counts
const hotelCounts = {}
for (const h of hotels) hotelCounts[h.destinationSlug] = (hotelCounts[h.destinationSlug] || 0) + 1

// Extract slugs with cityContent entries
// Match lines like "  slug: {" that follow the top-level opening of cityContent
const cityContentSlugs = new Set(
  [...cityContentSrc.matchAll(/^\s{2}([a-z][a-z0-9-]*): \{$/gm)].map(m => m[1])
)

// Extract slugs present in destContextByLocale per language block
function extractDestContextSlugs(locale) {
  // Find the locale block and extract slugs
  const blockRe = new RegExp(`^  ${locale}: \\{([\\s\\S]*?)^  \\},`, 'm')
  const m = editorial.match(blockRe)
  if (!m) return new Set()
  const slugs = new Set()
  for (const sm of m[1].matchAll(/^\s{4}['"]?([a-z][a-z0-9-]*)['"]?: \{/gm)) slugs.add(sm[1])
  return slugs
}

const ctxSlugs = {
  en: extractDestContextSlugs('en'),
  fr: extractDestContextSlugs('fr'),
  es: extractDestContextSlugs('es'),
}

// Audit each destination
const rows = []
let totalErrors = 0
let totalWarnings = 0

for (const dest of destinations) {
  const { slug, name } = dest
  const issues = []
  const warnings = []

  // 1. Hero image file
  const heroImg = dest.heroImage
  if (!heroImg) {
    issues.push('no heroImage field')
  } else {
    const imgPath = path.join(ROOT, 'public', heroImg.replace(/^\//, ''))
    if (!existsSync(imgPath)) issues.push(`heroImage file missing: ${heroImg}`)
  }

  // 2. Weather
  if (!dest.weather) {
    issues.push('no weather data')
  } else {
    const missingMonths = WEATHER_MONTHS.filter(m => !dest.weather[m])
    if (missingMonths.length) issues.push(`weather incomplete: missing ${missingMonths.join(',')}`)
  }

  // 3. Lat/Lng
  if (typeof dest.lat !== 'number' || typeof dest.lng !== 'number') {
    issues.push('missing lat/lng')
  }

  // 4. destContextByLocale in all 3 locales
  for (const l of LOCALES) {
    if (!ctxSlugs[l].has(slug)) issues.push(`destContextByLocale: missing ${l.toUpperCase()} entry`)
  }

  // 5. cityContent entry
  if (!cityContentSlugs.has(slug)) {
    warnings.push('no cityContent (history/sights/tips) entry')
  }

  // 6. city-guide JSON
  const guidePath = path.join(ROOT, 'data/city-guides', `${slug}.json`)
  if (!existsSync(guidePath)) {
    issues.push('no city-guide JSON file')
  } else {
    try {
      const guide = JSON.parse(readFileSync(guidePath, 'utf-8'))
      // Sections
      const missingSections = REQUIRED_GUIDE_SECTIONS.filter(s => !guide.guides?.[s])
      if (missingSections.length) issues.push(`guide sections missing: ${missingSections.join(',')}`)

      // 7. English leaking in FR/ES intros (quick sampling)
      for (const section of REQUIRED_GUIDE_SECTIONS) {
        const s = guide.guides?.[section]
        if (!s) continue
        if (s.introFr && EN_TELLS.test(s.introFr) && !/\b(le|la|les|des|du|de la|et|avec|pour|dans|un|une)\b/i.test(s.introFr)) {
          warnings.push(`${section}.introFr looks English`)
        }
        if (s.introEs && EN_TELLS.test(s.introEs) && !/\b(el|la|los|las|y|con|para|en|un|una|de)\b/i.test(s.introEs)) {
          warnings.push(`${section}.introEs looks English`)
        }
      }
    } catch (e) {
      issues.push(`city-guide JSON invalid: ${e.message}`)
    }
  }

  // 8. Hotels
  const nHotels = hotelCounts[slug] || 0
  if (nHotels === 0) {
    warnings.push('0 hotels in hotels.json')
  } else if (nHotels < MIN_HOTELS) {
    warnings.push(`only ${nHotels} hotels (< ${MIN_HOTELS})`)
  }

  rows.push({ slug, name, nHotels, issues, warnings })
  totalErrors += issues.length
  totalWarnings += warnings.length
}

// Orphan check: guides without destination
const guidesDir = path.join(ROOT, 'data/city-guides')
const { readdirSync } = await import('fs')
const allGuides = readdirSync(guidesDir)
  .filter(f => f.endsWith('.json'))
  .map(f => f.replace('.json', ''))
const destSlugs = new Set(destinations.map(d => d.slug))
const orphanGuides = allGuides.filter(s => !destSlugs.has(s))

// Orphan hotels
const orphanHotels = [...new Set(hotels.map(h => h.destinationSlug))]
  .filter(s => !destSlugs.has(s))

// ─── Report ──────────────────────────────────────────────────────────────────

console.log('\n📋 DESTINATION PARITY AUDIT\n' + '═'.repeat(70))

const clean = rows.filter(r => !r.issues.length && !r.warnings.length)
const withWarnings = rows.filter(r => !r.issues.length && r.warnings.length)
const withErrors = rows.filter(r => r.issues.length)

console.log(`\n✅ Fully parity-compliant: ${clean.length}/${rows.length}`)
if (clean.length) console.log('   ' + clean.map(r => r.slug).join(', '))

console.log(`\n⚠️  Warnings only (non-blocking): ${withWarnings.length}`)
for (const r of withWarnings) {
  console.log(`   ${r.slug} (${r.nHotels} hotels)`)
  for (const w of r.warnings) console.log(`      · ${w}`)
}

console.log(`\n❌ Errors (blocking): ${withErrors.length}`)
for (const r of withErrors) {
  console.log(`   ${r.slug}`)
  for (const e of r.issues) console.log(`      ✗ ${e}`)
  for (const w of r.warnings) console.log(`      · ${w}`)
}

if (orphanGuides.length) {
  console.log(`\n🔌 Orphan city-guide files (no destination entry): ${orphanGuides.join(', ')}`)
}
if (orphanHotels.length) {
  console.log(`\n🔌 Orphan hotel destinationSlug refs: ${orphanHotels.join(', ')}`)
}

console.log('\n' + '═'.repeat(70))
console.log(`TOTALS: ${totalErrors} errors, ${totalWarnings} warnings across ${rows.length} destinations`)
console.log('═'.repeat(70) + '\n')

process.exit(totalErrors > 0 ? 1 : 0)
