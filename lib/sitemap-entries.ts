import { readdirSync, existsSync, statSync } from 'fs'
import { join } from 'path'
import destinations from '@/data/destinations.json'
import categories from '@/data/categories.json'
import hotels from '@/data/hotels.json'
import { getAllCountries } from '@/lib/countries'

export const SITEMAP_LOCALES = ['en', 'fr', 'es', 'pt', 'de', 'nl', 'it'] as const
export type SitemapLocale = (typeof SITEMAP_LOCALES)[number]

export const SITEMAP_BASE_URL = 'https://www.hotelswithpets.com'

const GUIDE_SECTIONS = ['restaurants', 'parks', 'transport', 'beaches', 'vets', 'tips', 'attractions', 'petsitting'] as const

export type SitemapEntry = {
  url: string
  lastModified: Date
  changeFrequency: 'weekly' | 'monthly'
  priority: number
}

// Real-modtime helpers: a page's lastmod reflects the actual data file it depends
// on, so re-deploying without touching content does not falsely inflate freshness.
function safeMtime(absPath: string, fallback: Date): Date {
  try {
    return statSync(absPath).mtime
  } catch {
    return fallback
  }
}

const BUILD_DATE = new Date()
const ROOT = process.cwd()
const DESTINATIONS_MTIME = safeMtime(join(ROOT, 'data/destinations.json'), BUILD_DATE)
const HOTELS_MTIME       = safeMtime(join(ROOT, 'data/hotels.json'), BUILD_DATE)
const CATEGORIES_MTIME   = safeMtime(join(ROOT, 'data/categories.json'), BUILD_DATE)
function cityGuideMtime(slug: string): Date {
  return safeMtime(join(ROOT, 'data/city-guides', `${slug}.json`), DESTINATIONS_MTIME)
}

// All URLs for a single locale (one child sitemap, ~8.5k URLs).
export function sitemapEntriesForLocale(locale: SitemapLocale): SitemapEntry[] {
  const BASE_URL = SITEMAP_BASE_URL
  const entries: SitemapEntry[] = []

  // Home page
  entries.push({ url: `${BASE_URL}/${locale}`, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 1.0 })

  // About page
  entries.push({ url: `${BASE_URL}/${locale}/about`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.5 })

  // FR-only affiliate/accessory pages
  if (locale === 'fr') {
    for (const frSlug of ['accessoires-chien', 'accessoires-chat', 'accessoires-chien-chaleur', 'mentions-affiliees']) {
      entries.push({ url: `${BASE_URL}/fr/${frSlug}`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.5 })
    }
  }

  // Destinations listing
  entries.push({ url: `${BASE_URL}/${locale}/destinations`, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 0.9 })

  // Categories listing
  entries.push({ url: `${BASE_URL}/${locale}/categories`, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 0.9 })

  // Dog parks hub
  entries.push({ url: `${BASE_URL}/${locale}/dog-parks`, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 0.8 })

  // Countries listing page
  entries.push({ url: `${BASE_URL}/${locale}/countries`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.7 })

  // Practical guides hub + individual guide pages
  const PRACTICAL_GUIDES = [
    'passeport-animal',
    'train-avec-chien',
    'avion-animal',
    'road-trip-chien',
    'hotel-pet-friendly',
    'city-trip-chien',
    'cote-mediterraneenne-chien',
    'iberique-chien',
    'alpes-chien',
    'top-dog-friendly-cities-europe',
    'pet-friendly-hotels-europe-guide',
    'eurostar-with-dog',
    'animal-health-certificate-vs-pet-passport-2026',
    'pet-travel-cost-index-europe-2026',
    'best-dog-beaches-europe-2026',
    'fenced-dog-parks-europe',
    'top-dog-friendly-islands-europe',
    'dog-beaches-france',
    'heatwave-pet-safety',
    'escape-heat-dog-europe-2026',
    'espagne-fraiche-chien',
    'italie-fraiche-chien',
    'france-fraiche-chien',
    'portugal-fraiche-chien',
    'allemagne-fraiche-chien',
    'autriche-fraiche-chien',
    'autumn-destinations-with-dog-2026',
    'winter-destinations-with-dog-2026',
    'christmas-markets-with-dog',
    'where-to-go-uk-school-holidays-2027',
  ]
  const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december']
  const ES_CITY_LANDINGS = [
    'madrid','barcelona','cordoba','sevilla','granada','valencia',
    'palma-de-mallorca','malaga','bilbao','san-sebastian','zaragoza','toledo',
  ]
  const VILLA_DIR = join(process.cwd(), 'data/villa-guides')
  const VILLA_SLUGS = existsSync(VILLA_DIR)
    ? readdirSync(VILLA_DIR).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, ''))
    : []
  entries.push({ url: `${BASE_URL}/${locale}/guides`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.7 })
  for (const slug of PRACTICAL_GUIDES) {
    entries.push({ url: `${BASE_URL}/${locale}/guides/${slug}`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.85 })
  }
  for (const vslug of VILLA_SLUGS) {
    entries.push({ url: `${BASE_URL}/${locale}/dog-friendly-villas/${vslug}`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.85 })
  }
  for (const month of MONTHS) {
    for (const slug of [month, `${month}-2027`]) {
      entries.push({ url: `${BASE_URL}/${locale}/guides/dog-friendly-europe-by-month/${slug}`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.7 })
    }
  }

  // Spanish-only programmatic landing pages
  if (locale === 'es') {
    for (const ciudad of ES_CITY_LANDINGS) {
      entries.push({ url: `${BASE_URL}/es/hoteles-pet-friendly/${ciudad}`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.85 })
    }
  }

  // Country hub pages
  for (const country of getAllCountries()) {
    entries.push({ url: `${BASE_URL}/${locale}/countries/${country.slug}`, lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 0.85 })
  }

  // Individual destination pages
  for (const dest of destinations) {
    entries.push({ url: `${BASE_URL}/${locale}/destinations/${dest.slug}`, lastModified: cityGuideMtime(dest.slug), changeFrequency: 'weekly', priority: 0.8 })
  }

  // Individual category pages
  for (const cat of categories) {
    entries.push({ url: `${BASE_URL}/${locale}/categories/${cat.slug}`, lastModified: CATEGORIES_MTIME, changeFrequency: 'weekly', priority: 0.8 })
  }

  // Combo pages (destination × category), restricted to official category slugs.
  const officialCategorySlugs = new Set(categories.map((c) => c.slug))
  const combos = new Set(
    hotels.flatMap((h) =>
      h.categories.filter((cat) => officialCategorySlugs.has(cat)).map((cat) => `${h.destinationSlug}|${cat}`)
    )
  )
  for (const combo of combos) {
    const [destSlug, catSlug] = combo.split('|')
    const mtime = cityGuideMtime(destSlug) > HOTELS_MTIME ? cityGuideMtime(destSlug) : HOTELS_MTIME
    entries.push({ url: `${BASE_URL}/${locale}/${destSlug}/${catSlug}`, lastModified: mtime, changeFrequency: 'monthly', priority: 0.95 })
  }

  // Individual hotel pages
  for (const hotel of hotels) {
    if (!hotel.slug) continue
    entries.push({ url: `${BASE_URL}/${locale}/hotels/${hotel.slug}`, lastModified: HOTELS_MTIME, changeFrequency: 'monthly', priority: 0.7 })
  }

  // City guide sub-pages, 8 sections per city
  const guideDir = join(process.cwd(), 'data/city-guides')
  if (existsSync(guideDir)) {
    const guideCitySlugs = readdirSync(guideDir).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''))
    for (const citySlug of guideCitySlugs) {
      const mtime = cityGuideMtime(citySlug)
      for (const section of GUIDE_SECTIONS) {
        entries.push({ url: `${BASE_URL}/${locale}/destinations/${citySlug}/${section}`, lastModified: mtime, changeFrequency: 'monthly', priority: 0.75 })
      }
    }
  }

  return entries
}

function xmlEscape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

export function renderUrlset(entries: SitemapEntry[]): string {
  const body = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${xmlEscape(e.url)}</loc>\n    <lastmod>${e.lastModified.toISOString()}</lastmod>\n    <changefreq>${e.changeFrequency}</changefreq>\n    <priority>${e.priority.toFixed(2)}</priority>\n  </url>`
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}
