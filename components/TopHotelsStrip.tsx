import Image from 'next/image'
import hotels from '@/data/hotels.json'
import destinations from '@/data/destinations.json'
import { hasImage } from '@/lib/imageManifest'
import { valueSort } from '@/lib/hotelSort'
import { buildAllezLink } from '@/lib/site'
import { getLocalizedCityName } from '@/lib/cityNames'
import { getLocalizedCountryName } from '@/lib/countries'

interface Props {
  locale: string
  /** Destination slugs to feature. The top-rated pet-friendly hotel from each is picked. */
  destinationSlugs: string[]
  /** Campaign tag for Stay22 (e.g. `topstrip-passeport`). */
  campaign: string
  /** Optional override heading per locale. */
  heading?: { en: string; fr: string; es: string; pt: string }
  /** Optional override subheading per locale. */
  sub?: { en: string; fr: string; es: string; pt: string }
}

const DEFAULT_HEADING = {
  en: 'Top pet-friendly hotels in Europe right now',
  fr: `Top hôtels pet-friendly en Europe en ce moment`,
  es: 'Los mejores hoteles pet-friendly en Europa ahora',
  pt: 'Os melhores hotéis pet-friendly em Europa agora',
}

const DEFAULT_SUB = {
  en: 'Hand-picked, top-rated stays with verified pet policies and live booking.',
  fr: `Sélection éditoriale, mieux notés, politiques animales vérifiées et réservation en direct.`,
  es: `Selección editorial, mejor valorados, políticas de mascota verificadas y reserva en directo.`,
  pt: `Selecção editorial, melhor avaliados, políticas de animais verificadas e reserva em directo.`,
}

const LABELS: Record<string, {
  perNight: string
  bookCta: string
  freePets: string
  petFee: (n: number) => string
  ratingLabel: string
}> = {
  en: { perNight: '/night', bookCta: 'See rates →', freePets: 'pets stay free', petFee: n => `pet fee €${n}/night`, ratingLabel: 'rating' },
  fr: { perNight: '/nuit', bookCta: 'Voir les tarifs →', freePets: 'animaux gratuits', petFee: n => `supplément animal ${n} €/nuit`, ratingLabel: 'note' },
  es: { perNight: '/noche', bookCta: 'Ver tarifas →', freePets: 'mascotas gratis', petFee: n => `cargo mascota ${n} €/noche`, ratingLabel: 'nota' },
  pt: { perNight: '/noite', bookCta: 'Ver tarifas →', freePets: 'animais grátis', petFee: n => `taxa animal ${n} €/noite`, ratingLabel: 'nota' },
}

function pickTopHotel(slug: string): typeof hotels[number] | null {
  const candidates = hotels.filter(h => h.destinationSlug === slug)
  if (candidates.length === 0) return null
  return valueSort(candidates)[0]
}

/**
 * Editorial strip of top pet-friendly hotels across a curated set of destinations.
 * Server component, no hydration cost. Skips destinations without an available hotel.
 */
export default function TopHotelsStrip({ locale, destinationSlugs, campaign, heading, sub }: Props) {
  const langKey = locale === 'fr' || locale === 'es' || locale === 'pt' ? locale : 'en'
  const L = LABELS[langKey] ?? LABELS.en

  const items = destinationSlugs
    .map((slug) => {
      const hotel = pickTopHotel(slug)
      const dest = destinations.find((d) => d.slug === slug)
      if (!hotel || !dest) return null
      const imgRel = `/images/hotels/${hotel.id}.jpg`
      const hasPhoto = hasImage(imgRel)
      const href = buildAllezLink(hotel.name, dest.name, dest.country, `topstrip-${campaign}-${hotel.id}`)
      const cityName = getLocalizedCityName(dest.slug, dest.name, locale)
      const countryName = getLocalizedCountryName(dest.country, locale)
      return { hotel, dest, imgRel, hasPhoto, href, cityName, countryName }
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)

  if (items.length === 0) return null

  const headingLocalized = (heading ?? DEFAULT_HEADING)[langKey] ?? (heading ?? DEFAULT_HEADING).en
  const subLocalized = (sub ?? DEFAULT_SUB)[langKey] ?? (sub ?? DEFAULT_SUB).en

  return (
    <section className="py-14 bg-gradient-to-b from-white to-amber-50/40 border-y border-amber-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">🏨 {headingLocalized.toUpperCase()}</p>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900">{headingLocalized}</h2>
          <p className="text-gray-600 text-sm lg:text-base mt-2 max-w-2xl mx-auto">{subLocalized}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ hotel, dest, imgRel, hasPhoto, href, cityName, countryName }) => {
            const petFeeText = hotel.petFee === 0 ? L.freePets : L.petFee(hotel.petFee)
            return (
              <a
                key={hotel.id}
                href={href}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="group bg-white rounded-2xl border border-amber-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="relative h-44 bg-gray-100">
                  {hasPhoto && (
                    <Image src={imgRel} alt={`${hotel.name}, pet-friendly hotel in ${dest.name}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  )}
                  <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-amber-700">
                    {'★'.repeat(hotel.stars)}
                  </div>
                  <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-blue-700">
                    {hotel.rating}/10
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-700">{dest.flag} {cityName}, {countryName}</p>
                  <h3 className="text-base font-extrabold text-gray-900 mt-1 leading-tight line-clamp-2">{hotel.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{petFeeText}</p>
                  <div className="flex items-baseline gap-2 mt-3">
                    <span className="text-xl font-extrabold text-gray-900">€{hotel.priceFrom}</span>
                    <span className="text-xs text-gray-500">{L.perNight}</span>
                  </div>
                  <span
                    className="mt-3 inline-flex items-center justify-center gap-1.5 text-sm font-bold px-3 py-2 rounded-lg text-white shadow-sm group-hover:shadow-md transition-shadow"
                    style={{ background: 'linear-gradient(135deg, #f97316 0%, #3b82f6 100%)' }}
                  >
                    {L.bookCta}
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
