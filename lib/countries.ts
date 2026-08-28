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
  Bulgaria: '🇧🇬',
  Romania: '🇷🇴',
  Serbia: '🇷🇸',
  Slovakia: '🇸🇰',
  Lithuania: '🇱🇹',
  Luxembourg: '🇱🇺',
  'United States': '🇺🇸',
  Albania: '🇦🇱',
  Cyprus: '🇨🇾',
  Malta: '🇲🇹',
  Montenegro: '🇲🇪',
  'United Arab Emirates': '🇦🇪',
  Turkey: '🇹🇷',
  Georgia: '🇬🇪',
  Morocco: '🇲🇦',
  Australia: '🇦🇺',
  Canada: '🇨🇦',
  Japan: '🇯🇵',
  'New Zealand': '🇳🇿',
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
  Bulgaria: 'Bulgarie',
  Romania: 'Roumanie',
  Serbia: 'Serbie',
  Slovakia: 'Slovaquie',
  Lithuania: 'Lituanie',
  Luxembourg: 'Luxembourg',
  'United States': 'États-Unis',
  Albania: 'Albanie',
  Cyprus: 'Chypre',
  Malta: 'Malte',
  Montenegro: 'Monténégro',
  'United Arab Emirates': 'Émirats arabes unis',
  Turkey: 'Turquie',
  Georgia: 'Géorgie',
  Morocco: 'Maroc',
  Australia: 'Australie',
  Canada: 'Canada',
  Japan: 'Japon',
  'New Zealand': 'Nouvelle-Zélande',
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
  Bulgaria: 'Bulgaria',
  Romania: 'Rumanía',
  Serbia: 'Serbia',
  Slovakia: 'Eslovaquia',
  Lithuania: 'Lituania',
  Luxembourg: 'Luxemburgo',
  'United States': 'Estados Unidos',
  Albania: 'Albania',
  Cyprus: 'Chipre',
  Malta: 'Malta',
  Montenegro: 'Montenegro',
  'United Arab Emirates': 'Emiratos Árabes Unidos',
  Turkey: 'Turquía',
  Georgia: 'Georgia',
  Morocco: 'Marruecos',
  Australia: 'Australia',
  Canada: 'Canadá',
  Japan: 'Japón',
  'New Zealand': 'Nueva Zelanda',
}

const COUNTRIES_PT: Record<string, string> = {
  France: 'França',
  Spain: 'Espanha',
  Italy: 'Itália',
  Belgium: 'Bélgica',
  Germany: 'Alemanha',
  Portugal: 'Portugal',
  Netherlands: 'Países Baixos',
  'Czech Republic': 'República Checa',
  Austria: 'Áustria',
  Denmark: 'Dinamarca',
  Sweden: 'Suécia',
  Switzerland: 'Suíça',
  Hungary: 'Hungria',
  Croatia: 'Croácia',
  'United Kingdom': 'Reino Unido',
  Ireland: 'Irlanda',
  Iceland: 'Islândia',
  Slovenia: 'Eslovénia',
  Latvia: 'Letónia',
  Estonia: 'Estónia',
  Poland: 'Polónia',
  Greece: 'Grécia',
  Norway: 'Noruega',
  Finland: 'Finlândia',
  Bulgaria: 'Bulgária',
  Romania: 'Roménia',
  Serbia: 'Sérvia',
  Slovakia: 'Eslováquia',
  Lithuania: 'Lituânia',
  Luxembourg: 'Luxemburgo',
  'United States': 'Estados Unidos',
  Albania: 'Albânia',
  Cyprus: 'Chipre',
  Malta: 'Malta',
  Montenegro: 'Montenegro',
  'United Arab Emirates': 'Emirados Árabes Unidos',
  Turkey: 'Turquia',
  Georgia: 'Geórgia',
  Morocco: 'Marrocos',
  Australia: 'Austrália',
  Canada: 'Canadá',
  Japan: 'Japão',
  'New Zealand': 'Nova Zelândia',
}

/**
 * French preposition for "to/in {country}": en (feminine), au (masculine), aux (plural).
 * Default is 'en' which covers most countries (France, Italie, Belgique, etc.).
 */
const COUNTRY_PREP_FR: Record<string, 'en' | 'au' | 'aux'> = {
  Portugal: 'au',
  Luxembourg: 'au',
  Denmark: 'au',
  'United Kingdom': 'au',
  Netherlands: 'aux',
  'United States': 'aux',
  Turkey: 'en',
  Georgia: 'en',
  Morocco: 'au',
}

/** Returns the right FR preposition + country, e.g. "en France", "au Portugal", "aux États-Unis". */
export function frCountryPhrase(englishName: string): string {
  const prep = COUNTRY_PREP_FR[englishName] ?? 'en'
  return `${prep} ${getLocalizedCountryName(englishName, 'fr')}`
}

/**
 * Portuguese requires preposition + article + country, e.g. "em França", "no Reino Unido", "nos Estados Unidos".
 * For feminine European countries we say "na X" (na Alemanha, na Áustria...), for "Portugal/Reino Unido" type "no X",
 * for plural "nos X". This map encodes the full "prep + article + name" phrase for each.
 */
const COUNTRY_PT_PHRASE: Record<string, string> = {
  France: 'em França',
  Spain: 'em Espanha',
  Italy: 'em Itália',
  Belgium: 'na Bélgica',
  Germany: 'na Alemanha',
  Portugal: 'em Portugal',
  Netherlands: 'nos Países Baixos',
  'Czech Republic': 'na República Checa',
  Austria: 'na Áustria',
  Denmark: 'na Dinamarca',
  Sweden: 'na Suécia',
  Switzerland: 'na Suíça',
  Hungary: 'na Hungria',
  Croatia: 'na Croácia',
  'United Kingdom': 'no Reino Unido',
  Ireland: 'na Irlanda',
  Iceland: 'na Islândia',
  Slovenia: 'na Eslovénia',
  Latvia: 'na Letónia',
  Estonia: 'na Estónia',
  Poland: 'na Polónia',
  Greece: 'na Grécia',
  Norway: 'na Noruega',
  Finland: 'na Finlândia',
  Bulgaria: 'na Bulgária',
  Romania: 'na Roménia',
  Serbia: 'na Sérvia',
  Slovakia: 'na Eslováquia',
  Lithuania: 'na Lituânia',
  Luxembourg: 'no Luxemburgo',
  Malta: 'em Malta',
  'United States': 'nos Estados Unidos',
  Albania: 'na Albânia',
  Cyprus: 'no Chipre',
  Montenegro: 'no Montenegro',
  'United Arab Emirates': 'nos Emirados Árabes Unidos',
  Turkey: 'na Turquia',
  Georgia: 'na Geórgia',
  Morocco: 'em Marrocos',
  'New Zealand': 'na Nova Zelândia',
}

export function ptCountryPhrase(englishName: string): string {
  return COUNTRY_PT_PHRASE[englishName] ?? `em ${getLocalizedCountryName(englishName, 'pt')}`
}

const COUNTRIES_DE: Record<string, string> = {
  France: 'Frankreich', Spain: 'Spanien', Italy: 'Italien', Belgium: 'Belgien',
  Germany: 'Deutschland', Portugal: 'Portugal', Netherlands: 'Niederlande',
  'Czech Republic': 'Tschechien', Austria: 'Österreich', Denmark: 'Dänemark',
  Sweden: 'Schweden', Switzerland: 'Schweiz', Hungary: 'Ungarn', Croatia: 'Kroatien',
  'United Kingdom': 'Vereinigtes Königreich', Ireland: 'Irland', Iceland: 'Island',
  Slovenia: 'Slowenien', Latvia: 'Lettland', Estonia: 'Estland', Poland: 'Polen',
  Greece: 'Griechenland', Norway: 'Norwegen', Finland: 'Finnland', Bulgaria: 'Bulgarien',
  Romania: 'Rumänien', Serbia: 'Serbien', Slovakia: 'Slowakei', Lithuania: 'Litauen',
  Luxembourg: 'Luxemburg', Malta: 'Malta', 'United States': 'Vereinigte Staaten',
  Albania: 'Albanien', Cyprus: 'Zypern', Montenegro: 'Montenegro',
  'United Arab Emirates': 'Vereinigte Arabische Emirate', Turkey: 'Türkei',
  Georgia: 'Georgien', Morocco: 'Marokko', 'New Zealand': 'Neuseeland',
  Australia: 'Australien', Canada: 'Kanada', Japan: 'Japan',
}

const COUNTRIES_NL: Record<string, string> = {
  France: 'Frankrijk', Spain: 'Spanje', Italy: 'Italië', Belgium: 'België',
  Germany: 'Duitsland', Portugal: 'Portugal', Netherlands: 'Nederland',
  'Czech Republic': 'Tsjechië', Austria: 'Oostenrijk', Denmark: 'Denemarken',
  Sweden: 'Zweden', Switzerland: 'Zwitserland', Hungary: 'Hongarije', Croatia: 'Kroatië',
  'United Kingdom': 'Verenigd Koninkrijk', Ireland: 'Ierland', Iceland: 'IJsland',
  Slovenia: 'Slovenië', Latvia: 'Letland', Estonia: 'Estland', Poland: 'Polen',
  Greece: 'Griekenland', Norway: 'Noorwegen', Finland: 'Finland', Bulgaria: 'Bulgarije',
  Romania: 'Roemenië', Serbia: 'Servië', Slovakia: 'Slowakije', Lithuania: 'Litouwen',
  Luxembourg: 'Luxemburg', 'United States': 'Verenigde Staten',
  Albania: 'Albanië', Cyprus: 'Cyprus', Malta: 'Malta', Montenegro: 'Montenegro',
  'United Arab Emirates': 'Verenigde Arabische Emiraten', Turkey: 'Turkije',
  Georgia: 'Georgië', Morocco: 'Marokko', 'New Zealand': 'Nieuw-Zeeland',
  Australia: 'Australië', Canada: 'Canada', Japan: 'Japan',
}

const COUNTRIES_IT: Record<string, string> = {
  France: 'Francia', Spain: 'Spagna', Italy: 'Italia', Belgium: 'Belgio',
  Germany: 'Germania', Portugal: 'Portogallo', Netherlands: 'Paesi Bassi',
  'Czech Republic': 'Repubblica Ceca', Austria: 'Austria', Denmark: 'Danimarca',
  Sweden: 'Svezia', Switzerland: 'Svizzera', Hungary: 'Ungheria', Croatia: 'Croazia',
  'United Kingdom': 'Regno Unito', Ireland: 'Irlanda', Iceland: 'Islanda',
  Slovenia: 'Slovenia', Latvia: 'Lettonia', Estonia: 'Estonia', Poland: 'Polonia',
  Greece: 'Grecia', Norway: 'Norvegia', Finland: 'Finlandia', Bulgaria: 'Bulgaria',
  Romania: 'Romania', Serbia: 'Serbia', Slovakia: 'Slovacchia', Lithuania: 'Lituania',
  Luxembourg: 'Lussemburgo', 'United States': 'Stati Uniti',
  Albania: 'Albania', Cyprus: 'Cipro', Malta: 'Malta', Montenegro: 'Montenegro',
  'United Arab Emirates': 'Emirati Arabi Uniti', Turkey: 'Turchia',
  Georgia: 'Georgia', Morocco: 'Marocco', 'New Zealand': 'Nuova Zelanda',
  Australia: 'Australia', Canada: 'Canada', Japan: 'Giappone',
}

export function getLocalizedCountryName(englishName: string, locale: string): string {
  if (locale === 'fr') return COUNTRIES_FR[englishName] ?? englishName
  if (locale === 'es') return COUNTRIES_ES[englishName] ?? englishName
  if (locale === 'pt') return COUNTRIES_PT[englishName] ?? englishName
  if (locale === 'de') return COUNTRIES_DE[englishName] ?? englishName
  if (locale === 'nl') return COUNTRIES_NL[englishName] ?? englishName
  if (locale === 'it') return COUNTRIES_IT[englishName] ?? englishName
  return englishName
}

export function countryToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export function slugToCountry(slug: string): string | undefined {
  // Check mapped countries first, then fall back to any country in destinations
  const fromFlags = Object.keys(COUNTRY_FLAGS).find((c) => countryToSlug(c) === slug)
  if (fromFlags) return fromFlags
  const allNames = Array.from(new Set(destinations.map((d) => d.country)))
  return allNames.find((c) => countryToSlug(c) === slug)
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
