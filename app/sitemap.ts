import type { MetadataRoute } from 'next'
import { readdirSync, existsSync, statSync } from 'fs'
import { join } from 'path'
import destinations from '@/data/destinations.json'
import categories from '@/data/categories.json'
import hotels from '@/data/hotels.json'
import { getAllCountries } from '@/lib/countries'

const GUIDE_SECTIONS = ['restaurants', 'parks', 'transport', 'beaches', 'vets', 'tips', 'attractions', 'petsitting'] as const

const BASE_URL = 'https://www.hotelswithpets.com'
const LOCALES = ['en', 'fr', 'es', 'pt']

// Real-modtime helpers, stronger freshness signal for search engines than
// "build date everywhere". Each page's lastmod reflects the actual data file
// it depends on, so re-deploying without touching content does not falsely
// inflate freshness.
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

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Home pages
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 1.0,
    })
  }

  // About page
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}/about`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    })
  }

  // Destinations listing
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}/destinations`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  }

  // Categories listing
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}/categories`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  }

  // Countries listing page
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}/countries`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  // Practical guides hub + individual guide pages
  // High SEO value (long-form, original, expert content), list them explicitly so
  // new guides are picked up the next deploy.
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
  ]
  const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december']
  const ES_CITY_LANDINGS = [
    'madrid','barcelona','cordoba','sevilla','granada','valencia',
    'palma-de-mallorca','malaga','bilbao','san-sebastian','zaragoza','toledo',
  ]
  // Dog-friendly villa landing pages (data/villa-guides/{slug}.json)
  const VILLA_DIR = join(process.cwd(), 'data/villa-guides')
  const VILLA_SLUGS = existsSync(VILLA_DIR)
    ? readdirSync(VILLA_DIR).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, ''))
    : []
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}/guides`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
    for (const slug of PRACTICAL_GUIDES) {
      entries.push({
        url: `${BASE_URL}/${locale}/guides/${slug}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'monthly',
        priority: 0.85,
      })
    }
    for (const vslug of VILLA_SLUGS) {
      entries.push({
        url: `${BASE_URL}/${locale}/dog-friendly-villas/${vslug}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'monthly',
        priority: 0.85,
      })
    }
    for (const month of MONTHS) {
      entries.push({
        url: `${BASE_URL}/${locale}/guides/dog-friendly-europe-by-month/${month}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  // Spanish-only programmatic landing pages targeting GSC near-miss clusters
  for (const ciudad of ES_CITY_LANDINGS) {
    entries.push({
      url: `${BASE_URL}/es/hoteles-pet-friendly/${ciudad}`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.85,
    })
  }

  // Country hub pages
  const allCountries = getAllCountries()
  for (const country of allCountries) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/countries/${country.slug}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'weekly',
        priority: 0.85,
      })
    }
  }

  // Individual destination pages
  for (const dest of destinations) {
    const mtime = cityGuideMtime(dest.slug)
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/destinations/${dest.slug}`,
        lastModified: mtime,
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  }

  // Individual category pages
  for (const cat of categories) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/categories/${cat.slug}`,
        lastModified: CATEGORIES_MTIME,
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  }

  // Combo pages (destination × category), highest value SEO pages.
  // Restrict to OFFICIAL categories.json slugs: hotels.json carries internal
  // filter tags ("budget-pet-friendly", "boutique-pet-friendly",
  // "luxury-pet-friendly") that don't have a category landing page. Including
  // them here would surface noindex pages to Google.
  const officialCategorySlugs = new Set(categories.map((c) => c.slug))
  const combos = new Set(
    hotels.flatMap((h) =>
      h.categories
        .filter((cat) => officialCategorySlugs.has(cat))
        .map((cat) => `${h.destinationSlug}|${cat}`)
    )
  )
  for (const combo of combos) {
    const [destSlug, catSlug] = combo.split('|')
    const mtime = cityGuideMtime(destSlug) > HOTELS_MTIME ? cityGuideMtime(destSlug) : HOTELS_MTIME
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/${destSlug}/${catSlug}`,
        lastModified: mtime,
        changeFrequency: 'monthly',
        priority: 0.95,
      })
    }
  }

  // Individual hotel pages, long-tail SEO (brand + "pet friendly" searches)
  for (const hotel of hotels) {
    if (!hotel.slug) continue
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/hotels/${hotel.slug}`,
        lastModified: HOTELS_MTIME,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  // City guide sub-pages, 6 sections per city (restaurants, parks, transport, beaches, vets, tips)
  // Dynamically reads data/city-guides/ so new cities are included automatically
  const guideDir = join(process.cwd(), 'data/city-guides')
  if (existsSync(guideDir)) {
    const guideCitySlugs = readdirSync(guideDir)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''))

    for (const citySlug of guideCitySlugs) {
      const mtime = cityGuideMtime(citySlug)
      for (const section of GUIDE_SECTIONS) {
        for (const locale of LOCALES) {
          entries.push({
            url: `${BASE_URL}/${locale}/destinations/${citySlug}/${section}`,
            lastModified: mtime,
            changeFrequency: 'monthly',
            priority: 0.75,
          })
        }
      }
    }
  }

  return entries
}
