import type { MetadataRoute } from 'next'
import destinations from '@/data/destinations.json'
import categories from '@/data/categories.json'
import hotels from '@/data/hotels.json'
import { getAllCountries } from '@/lib/countries'

const BASE_URL = 'https://hotelswithpets.com'
const LOCALES = ['en', 'fr', 'es']
// Build date — used as lastModified for static content
const BUILD_DATE = new Date()

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
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/destinations/${dest.slug}`,
        lastModified: BUILD_DATE,
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
        lastModified: BUILD_DATE,
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  }

  // Combo pages (destination × category) — highest value SEO pages
  const combos = new Set(
    hotels.flatMap((h) => h.categories.map((cat) => `${h.destinationSlug}|${cat}`))
  )
  for (const combo of combos) {
    const [destSlug, catSlug] = combo.split('|')
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/${destSlug}/${catSlug}`,
        lastModified: BUILD_DATE,
        changeFrequency: 'monthly',
        priority: 0.95,
      })
    }
  }

  return entries
}
