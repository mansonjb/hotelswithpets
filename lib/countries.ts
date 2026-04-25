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
  Poland: '🇵🇱',
  Greece: '🇬🇷',
  Norway: '🇳🇴',
  Finland: '🇫🇮',
}

/**
 * Localized country names for FR and ES.
 * English country names (from destinations.json) are used as fallback.
 */
const COUNTRIES_FR: Record<string, string> = {
  France: 'France',
  Spain: 'Espagne',
  Italy: 'Italie',
  Belgium: 'Belgique',
  Germany: 'Allemagne',
  Portugal: 'Portugal',
  Netherlands: 'Pays-Bas',
  'Czech Republic': 'République tchèque',
  Austria: 'Autriche',
  Denmark: 'Danemark',
  Sweden: 'Suède',
  Switzerland: 'Suisse',
  Hungary: 'Hongrie',
  Croatia: 'Croatie',
  'United Kingdom': 'Royaume-Uni',
  Ireland: 'Irlande',
  Iceland: 'Islande',
  Slovenia: 'Slovénie',
  Latvia: 'Lettonie',
  Estonia: 'Estonie',
  Poland: 'Pologne',
  Greece: 'Grèce',
  Norway: 'Norvège',
  Finland: 'Finlande',
}

const COUNTRIES_ES: Record<string, string> = {
  France: 'Francia',
  Spain: 'España',
  Italy: 'Italia',
  Belgium: 'Bélgica',
  Germany: 'Alemania',
  Portugal: 'Portugal',
  Netherlands: 'Países Bajos',
  'Czech Republic': 'República Checa',
  Austria: 'Austria',
  Denmark: 'Dinamarca',
  Sweden: 'Suecia',
  Switzerland: 'Suiza',
  Hungary: 'Hungría',
  Croatia: 'Croacia',
  'United Kingdom': 'Reino Unido',
  Ireland: 'Irlanda',
  Iceland: 'Islandia',
  Slovenia: 'Eslovenia',
  Latvia: 'Letonia',
  Estonia: 'Estonia',
  Poland: 'Polonia',
  Greece: 'Grecia',
  Norway: 'Noruega',
  Finland: 'Finlandia',
}

export function getLocalizedCountryName(englishName: string, locale: string): string {
  if (locale === 'fr') return COUNTRIES_FR[englishName] ?? englishName
  if (locale === 'es') return COUNTRIES_ES[englishName] ?? englishName
  return englishName
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
