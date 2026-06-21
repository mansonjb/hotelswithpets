import Image from 'next/image'
import hotels from '@/data/hotels.json'
import destinations from '@/data/destinations.json'
import { buildAllezLink } from '@/lib/site'
import { getLocalizedCityName } from '@/lib/cityNames'
import { hasImage } from '@/lib/imageManifest'

interface Props {
  /** Destination slug (e.g. 'nice') used to pick the top-rated pet-friendly hotel there. */
  destinationSlug: string
  /** Page locale (en/fr/es/pt). Drives the localized label. */
  locale: string
  /** Optional: editorial framing label shown above the card (e.g. "Where to stay near Plage des Salis"). */
  proximityLabel?: string
  /** Compact = tight inline card. Full = bigger card with description. Default 'compact'. */
  variant?: 'compact' | 'full'
}

const LABELS: Record<string, {
  defaultProximity: (c: string) => string
  bookCta: string
  perNight: string
  freePets: string
  petFee: (n: number) => string
  ratingLabel: string
}> = {
  en: {
    defaultProximity: c => `Where to stay in ${c}`,
    bookCta: 'See rates →',
    perNight: '/night',
    freePets: 'pets stay free',
    petFee: n => `pet fee €${n}/night`,
    ratingLabel: 'rating',
  },
  fr: {
    defaultProximity: c => `Où dormir à ${c}`,
    bookCta: 'Voir les tarifs →',
    perNight: '/nuit',
    freePets: 'animaux gratuits',
    petFee: n => `supplément animal ${n} €/nuit`,
    ratingLabel: 'note',
  },
  es: {
    defaultProximity: c => `Dónde dormir en ${c}`,
    bookCta: 'Ver tarifas →',
    perNight: '/noche',
    freePets: 'mascotas gratis',
    petFee: n => `cargo mascota ${n} €/noche`,
    ratingLabel: 'nota',
  },
  pt: {
    defaultProximity: c => `Onde dormir em ${c}`,
    bookCta: 'Ver tarifas →',
    perNight: '/noite',
    freePets: 'animais grátis',
    petFee: n => `taxa animal ${n} €/noite`,
    ratingLabel: 'nota',
  },
}

/**
 * Pick the best pet-friendly hotel for a destination.
 * Priority: highest guest rating, then highest review count tie-breaker.
 * Returns null if no hotel found for that slug.
 */
function pickTopHotel(slug: string): typeof hotels[number] | null {
  const candidates = hotels.filter(h => h.destinationSlug === slug)
  if (candidates.length === 0) return null
  return [...candidates].sort(
    (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount
  )[0]
}

/**
 * Inline editorial card recommending the top pet-friendly hotel for a destination.
 * Built to be dropped next to a beach / park / sight / island entry to convert
 * informational intent into a booking click (Stay22 deeplink).
 *
 * Server component, no hydration cost.
 */
export default function NearbyHotelCard({
  destinationSlug,
  locale,
  proximityLabel,
  variant = 'compact',
}: Props) {
  const hotel = pickTopHotel(destinationSlug)
  if (!hotel) return null

  const dest = destinations.find(d => d.slug === destinationSlug)
  if (!dest) return null

  const langKey = locale === 'fr' || locale === 'es' || locale === 'pt' ? locale : 'en'
  const L = LABELS[langKey] ?? LABELS.en

  const cityName = getLocalizedCityName(dest.slug, dest.name, locale)
  const label = proximityLabel ?? L.defaultProximity(cityName)

  // Hotel image served from the Supabase CDN; the manifest says if it exists.
  const imgRel = `/images/hotels/${hotel.id}.jpg`
  const hasPhoto = hasImage(imgRel)

  const stay22Href = buildAllezLink(hotel.name, dest.name, dest.country, `nearbycard-${destinationSlug}`)
  const petFeeText = hotel.petFee === 0 ? L.freePets : L.petFee(hotel.petFee)

  if (variant === 'full') {
    return (
      <div className="mt-4 mb-2 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
        <div className="flex">
          {hasPhoto && (
            <div className="relative w-32 sm:w-44 flex-shrink-0">
              <Image src={imgRel} alt={`${hotel.name}, pet-friendly hotel in ${dest.name}`} fill sizes="180px" className="object-cover" />
            </div>
          )}
          <div className="flex-1 p-4 min-w-0">
            <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-1">🏨 {label}</p>
            <h4 className="text-base font-extrabold text-gray-900 truncate">{hotel.name}</h4>
            <p className="text-xs text-gray-500 mt-0.5">
              {'★'.repeat(hotel.stars)} · <span className="font-semibold text-blue-700">{hotel.rating}/10</span> {L.ratingLabel} · {petFeeText}
            </p>
            <div className="flex items-baseline gap-2 mt-2 mb-2">
              <span className="text-lg font-extrabold text-gray-900">€{hotel.priceFrom}</span>
              <span className="text-xs text-gray-500">{L.perNight}</span>
            </div>
            <a
              href={stay22Href}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-lg text-white shadow-sm hover:shadow-md transition-shadow"
              style={{ background: 'linear-gradient(135deg, #f97316 0%, #3b82f6 100%)' }}
            >
              {L.bookCta}
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Compact variant (default)
  return (
    <a
      href={stay22Href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className="group mt-3 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-50 px-3 py-2.5 transition-colors"
    >
      {hasPhoto && (
        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
          <Image src={imgRel} alt={hotel.name} fill sizes="56px" className="object-cover" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wide leading-tight">🏨 {label}</p>
        <p className="text-sm font-bold text-gray-900 truncate leading-tight">{hotel.name}</p>
        <p className="text-[11px] text-gray-500 leading-tight">
          {'★'.repeat(hotel.stars)} · {hotel.rating}/10 · €{hotel.priceFrom}{L.perNight} · {petFeeText}
        </p>
      </div>
      <span className="text-orange-500 group-hover:translate-x-0.5 transition-transform text-lg flex-shrink-0">→</span>
    </a>
  )
}
