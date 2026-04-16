import destinations from '@/data/destinations.json'

export interface CountryInfo {
  name: string
  slug: string
  flag: string
  destinations: typeof destinations
}

const COUNTRY_FLAGS: Record<string, string> = {
  France: '🇫🇷',
  Spain: '🇪🇸',
  Italy: '🇮🇹',
  Belgium: '🇧🇪',
  Germany: '🇩🇪',
  Portugal: '🇵🇹',
  Netherlands: '🇳🇱',
  'Czech Republic': '🇨🇿',
  Austria: '🇦🇹',
  Denmark: '🇩🇰',
  Sweden: '🇸🇪',
  Switzerland: '🇨🇭',
  Hungary: '🇭🇺',
  Croatia: '🇭🇷',
  'United Kingdom': '🇬🇧',
  Ireland: '🇮🇪',
  Iceland: '🇮🇸',
  Slovenia: '🇸🇮',
  Latvia: '🇱🇻',
  Estonia: '🇪🇪',
}

export function countryToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export function slugToCountry(slug: string): string | undefined {
  return Object.keys(COUNTRY_FLAGS).find((c) => countryToSlug(c) === slug)
}

export function getAllCountries(): CountryInfo[] {
  const map = new Map<string, CountryInfo>()
  for (const dest of destinations) {
    const existing = map.get(dest.country)
    if (existing) {
      existing.destinations.push(dest)
    } else {
      map.set(dest.country, {
        name: dest.country,
        slug: countryToSlug(dest.country),
        flag: COUNTRY_FLAGS[dest.country] ?? '🌍',
        destinations: [dest],
      })
    }
  }
  // Sort by number of destinations desc, then name
  return Array.from(map.values()).sort((a, b) =>
    b.destinations.length - a.destinations.length || a.name.localeCompare(b.name)
  )
}
