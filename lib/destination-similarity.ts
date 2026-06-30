import allHotels from '@/data/hotels.json'
import allDestinations from '@/data/destinations.json'

type Hotel = typeof allHotels[number]
type Destination = typeof allDestinations[number]

// Predefined slug sets for structural vibes
const ISLAND_SLUGS = new Set([
  // Spain
  'ibiza', 'formentera', 'gran-canaria', 'lanzarote', 'tenerife',
  'palma-de-mallorca', 'alcudia', 'soller', 'valldemossa', 'sant-antoni-de-portmany',
  'sant-josep-de-sa-talaia', 'santa-eularia-des-riu', 'mahon', 'ciutadella-de-menorca',
  // Greece
  'santorini', 'corfu', 'rhodes', 'kefalonia', 'mykonos',
  // Croatia
  'hvar', 'brac', 'korcula',
  // Portugal
  'funchal', 'azores',
  // Italy (Sicily + Sardinia)
  'palermo', 'catania', 'taormina', 'cefalu', 'cagliari', 'alghero',
  // Cyprus
  'limassol', 'paphos', 'larnaca',
  // Malta
  'valletta', 'sliema',
  // UK
  'douglas',
])

const MOUNTAIN_SLUGS = new Set([
  'annecy', 'chamonix', 'grenoble', 'innsbruck', 'salzburg', 'graz',
  'interlaken', 'lausanne', 'geneva', 'st-moritz', 'davos', 'zermatt',
  'verbier', 'bern', 'lucerne', 'zurich', 'munich', 'berchtesgaden',
])

const HISTORIC_SLUGS = new Set([
  'prague', 'budapest', 'vienna', 'krakow', 'dubrovnik', 'venice', 'florence',
  'rome', 'bruges', 'ghent', 'edinburgh', 'bath', 'oxford', 'seville', 'granada',
  'cordoba', 'toledo', 'salamanca', 'santiago-de-compostela',
  'valletta', 'tallinn', 'riga', 'vilnius', 'warsaw', 'bratislava',
  'ljubljana', 'mostar', 'kotor',
])

const URBAN_SLUGS = new Set([
  'paris', 'london', 'berlin', 'amsterdam', 'madrid', 'barcelona', 'rome',
  'milan', 'lisbon', 'brussels', 'vienna', 'zurich', 'geneva', 'hamburg',
  'munich', 'cologne', 'frankfurt', 'stockholm', 'oslo', 'copenhagen',
  'helsinki', 'warsaw', 'budapest', 'prague', 'athens', 'istanbul',
  'dubai', 'singapore', 'new-york', 'los-angeles', 'san-francisco',
  'chicago', 'boston', 'toronto', 'montreal', 'sydney', 'melbourne',
])

const COASTAL_SLUGS = new Set([
  'la-rochelle', 'brest', 'boulogne-sur-mer', 'calais', 'dunkerque',
  'brighton', 'bournemouth', 'cardiff', 'bristol', 'liverpool',
  'dieppe', 'honfleur', 'etretat', 'le-havre',
  'ostend', 'kiel', 'rostock', 'warnemunde',
])

export function getVibes(slug: string, hotels: Hotel[]): string[] {
  const vibes: string[] = []

  const destHotels = hotels.filter((h) => h.destinationSlug === slug)
  const total = destHotels.length

  if (total > 0) {
    const beachCount = destHotels.filter((h) =>
      h.categories.includes('beach-access')
    ).length
    if (beachCount / total > 0.3) vibes.push('beach')

    const luxuryCount = destHotels.filter((h) =>
      h.categories.includes('luxury')
    ).length
    if (luxuryCount / total > 0.55) vibes.push('luxury')
  }

  if (ISLAND_SLUGS.has(slug)) vibes.push('island')
  if (MOUNTAIN_SLUGS.has(slug)) vibes.push('mountain')
  if (HISTORIC_SLUGS.has(slug)) vibes.push('historic')
  if (URBAN_SLUGS.has(slug)) vibes.push('urban')
  if (COASTAL_SLUGS.has(slug)) vibes.push('coastal')

  return vibes
}

export function getSimilarDestinations(
  slug: string,
  allDests: Destination[],
  hotels: Hotel[],
  count: number
): Destination[] {
  const currentDest = allDests.find((d) => d.slug === slug)
  if (!currentDest) return []

  const currentVibes = new Set(getVibes(slug, hotels))
  if (currentVibes.size === 0) return []

  return allDests
    .filter((d) => {
      if (d.slug === slug) return false
      if (d.country === currentDest.country) return false
      const dVibes = getVibes(d.slug, hotels)
      return dVibes.some((v) => currentVibes.has(v))
    })
    .sort((a, b) => {
      const aCount = hotels.filter((h) => h.destinationSlug === a.slug).length
      const bCount = hotels.filter((h) => h.destinationSlug === b.slug).length
      return bCount - aCount
    })
    .slice(0, count)
}

export function getCountryDestinations(
  slug: string,
  country: string,
  allDests: Destination[],
  hotels: Hotel[],
  count: number
): Destination[] {
  return allDests
    .filter((d) => d.country === country && d.slug !== slug)
    .sort((a, b) => {
      const aCount = hotels.filter((h) => h.destinationSlug === a.slug).length
      const bCount = hotels.filter((h) => h.destinationSlug === b.slug).length
      return bCount - aCount
    })
    .slice(0, count)
}

// Export types so components can use them
export type { Destination, Hotel }
