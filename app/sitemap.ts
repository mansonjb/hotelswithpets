import type { MetadataRoute } from 'next'
import destinations from '@/data/destinations.json'
import categories from '@/data/categories.json'
import hotels from '@/data/hotels.json'

const BASE_URL = 'https://hotelswithpets.com'
const LOCALES = ['en', 'fr', 'es']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Home pages
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    })
  }

  // Destinations listing
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}/destinations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  }

  // Categories listing
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  }

  // Individual destination pages
  for (const dest of destinations) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/destinations/${dest.slug}`,
        lastModified: new Date(),
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
        lastModified: new Date(),
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
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.95,
      })
    }
  }

  return entries
}
