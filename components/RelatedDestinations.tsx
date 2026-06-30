import DestinationCard from '@/components/DestinationCard'
import { getVibes } from '@/lib/destination-similarity'
import allHotels from '@/data/hotels.json'

type Hotel = typeof allHotels[number]

type Destination = {
  slug: string
  name: string
  country: string
  flag: string
  heroImage?: string
}

interface RelatedDestinationsProps {
  similarDests: Destination[]
  countryDests: Destination[]
  currentSlug: string
  currentCountry: string
  currentVibes: string[]
  locale: string
}

const VIBE_LABELS: Record<string, { en: string; fr: string; es: string; pt: string; emoji: string }> = {
  beach:    { en: 'Beach destinations',    fr: 'Destinations balnéaires',   es: 'Destinos de playa',       pt: 'Destinos de praia',         emoji: '🏖️' },
  island:   { en: 'Island getaways',       fr: 'Escapades insulaires',      es: 'Escapadas insulares',     pt: 'Escapadas insulares',       emoji: '🏝️' },
  mountain: { en: 'Mountain destinations', fr: 'Destinations montagne',     es: 'Destinos de montaña',     pt: 'Destinos de montanha',      emoji: '⛰️' },
  historic: { en: 'Historic cities',       fr: 'Villes historiques',        es: 'Ciudades históricas',     pt: 'Cidades históricas',        emoji: '🏛️' },
  luxury:   { en: 'Luxury destinations',   fr: 'Destinations luxe',         es: 'Destinos de lujo',        pt: 'Destinos de luxo',          emoji: '✨' },
  coastal:  { en: 'Coastal destinations',  fr: 'Destinations côtières',     es: 'Destinos costeros',       pt: 'Destinos costeiros',        emoji: '🌊' },
  urban:    { en: 'City breaks',           fr: 'City breaks',               es: 'Escapadas urbanas',       pt: 'Escapadas urbanas',         emoji: '🏙️' },
}

function getSectionTitle(
  type: 'similar' | 'country',
  locale: string,
  country: string,
  primaryVibe?: string
): string {
  if (type === 'similar') {
    if (locale === 'fr') return 'Ces destinations pourraient vous plaire'
    if (locale === 'es') return 'Destinos que también te encantarán'
    if (locale === 'pt') return 'Destinos que também pode adorar'
    return 'You might also love these destinations'
  }
  // country section
  if (locale === 'fr') return `Plus de destinations en ${country}`
  if (locale === 'es') return `Más destinos en ${country}`
  if (locale === 'pt') return `Mais destinos em ${country}`
  return `More pet-friendly destinations in ${country}`
}

export default function RelatedDestinations({
  similarDests,
  countryDests,
  currentSlug,
  currentCountry,
  currentVibes,
  locale,
}: RelatedDestinationsProps) {
  const hotels = allHotels as Hotel[]

  const primaryVibe = currentVibes[0]
  const vibeInfo = primaryVibe ? VIBE_LABELS[primaryVibe] : null
  const vibeLabelLocale = vibeInfo
    ? (locale === 'fr'
        ? vibeInfo.fr
        : locale === 'es'
        ? vibeInfo.es
        : locale === 'pt'
        ? vibeInfo.pt
        : vibeInfo.en)
    : null

  const showSimilar = similarDests.length >= 2
  const showCountry = countryDests.length > 0

  if (!showSimilar && !showCountry) return null

  return (
    <section className="py-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section A: Similar destinations (same vibe, different country) */}
        {showSimilar && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-gray-900 mb-2">
                {getSectionTitle('similar', locale, currentCountry, primaryVibe)}
              </h2>
              {vibeLabelLocale && vibeInfo && (
                <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full text-white ${
                  primaryVibe === 'beach'    ? 'bg-teal-500' :
                  primaryVibe === 'island'   ? 'bg-cyan-500' :
                  primaryVibe === 'mountain' ? 'bg-blue-700' :
                  primaryVibe === 'historic' ? 'bg-amber-600' :
                  primaryVibe === 'luxury'   ? 'bg-purple-600' :
                  primaryVibe === 'coastal'  ? 'bg-sky-500' :
                  'bg-indigo-600'
                }`}>
                  {vibeInfo.emoji} {vibeLabelLocale}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {similarDests.map((dest) => {
                const hotelCount = hotels.filter((h) => h.destinationSlug === dest.slug).length
                const vibes = getVibes(dest.slug, hotels)
                return (
                  <DestinationCard
                    key={dest.slug}
                    destination={dest}
                    hotelCount={hotelCount}
                    vibes={vibes}
                    locale={locale}
                    size="sm"
                  />
                )
              })}
            </div>
          </div>
        )}

        {/* Separator */}
        {showSimilar && showCountry && (
          <div className="border-t border-gray-200" />
        )}

        {/* Section B: More in same country */}
        {showCountry && (
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">
              {getSectionTitle('country', locale, currentCountry)}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {countryDests.map((dest) => {
                const hotelCount = hotels.filter((h) => h.destinationSlug === dest.slug).length
                const vibes = getVibes(dest.slug, hotels)
                return (
                  <DestinationCard
                    key={dest.slug}
                    destination={dest}
                    hotelCount={hotelCount}
                    vibes={vibes}
                    locale={locale}
                    size="sm"
                  />
                )
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
