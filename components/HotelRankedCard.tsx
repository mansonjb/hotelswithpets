import Image from 'next/image'
import Link from 'next/link'
import { buildAllezLink } from '@/lib/site'
import { localizedPetPolicy } from '@/lib/petPolicy'

interface Hotel {
  id: string
  name: string
  slug: string
  destinationSlug: string
  categories: string[]
  stars: number
  rating: number
  reviewCount: number
  priceFrom: number
  currency: string
  bookingUrl: string
  petFee: number
  petPolicy: string
  highlights: string[]
}

interface HotelRankedCardDict {
  rankLabel: string
  book: string
  from: string
  perNight: string
  free: string
  petFee: string
  petPolicy: string
  stars: string
  reviews: string
}

interface HotelRankedCardProps {
  hotel: Hotel
  rank: number
  destName: string
  catName: string
  dict: HotelRankedCardDict
  locale: string
  /** Country name for Allez tracked deep link */
  destCountry?: string
}

const ratingLabel = (r: number, locale: string): string => {
  const labels: Record<string, [string, string, string, string, string]> = {
    en: ['Outstanding', 'Exceptional', 'Excellent', 'Very Good', 'Good'],
    fr: ['Remarquable', 'Exceptionnel', 'Excellent', 'Très bien', 'Bien'],
    es: ['Sobresaliente', 'Excepcional', 'Excelente', 'Muy bueno', 'Bueno'],
  }
  const [outstanding, exceptional, excellent, veryGood, good] = labels[locale] ?? labels.en
  if (r >= 9.5) return outstanding
  if (r >= 9) return exceptional
  if (r >= 8.5) return excellent
  if (r >= 8) return veryGood
  return good
}

const currencySymbol = (c: string) => (c === 'EUR' ? '€' : c)

/**
 * Scraper sometimes returns garbage policy text (addresses, UI labels, review snippets).
 * Requires pet-related keywords; falls back to a smart default based on petFee.
 */
function sanitizePetPolicy(raw: string, petFee?: number, locale = 'en'): string {
  const fallback = (): string => {
    if (locale === 'fr') {
      if (petFee === 0) return 'Les animaux séjournent gratuitement. Chiens et chats bienvenus dans tout l\'établissement.'
      if (petFee !== undefined && petFee > 0) return `Animaux acceptés. Un supplément de ${petFee}€ par nuit s'applique. À confirmer lors de la réservation.`
      return 'Les animaux sont les bienvenus. Veuillez confirmer les conditions lors de la réservation.'
    }
    if (locale === 'es') {
      if (petFee === 0) return 'Las mascotas se alojan gratis. Perros y gatos son bienvenidos en todo el establecimiento.'
      if (petFee !== undefined && petFee > 0) return `Se admiten mascotas. Se aplica un cargo de ${petFee}€ por noche. Confirmar al reservar.`
      return 'Las mascotas son bienvenidas. Confirme las condiciones específicas al reservar.'
    }
    // English (default)
    if (petFee === 0) return 'Pets stay free of charge. Dogs and cats are welcome throughout the property.'
    if (petFee !== undefined && petFee > 0) return `Pets accepted. A pet fee of €${petFee} per night applies. Please confirm on booking.`
    return 'Pets are welcome. Please confirm specific pet policy when booking.'
  }

  if (!raw || raw.trim().length === 0) return fallback()
  // Contains HTML tags or suspicious chars
  if (/<[a-z]/i.test(raw) || /[<>{}]/.test(raw)) return fallback()
  // Address-like strings: contain digits followed by street keywords
  if (/\d+.*\b(avenue|ave|rue|street|st\.|boulevard|blvd|road|rd\.)\b/i.test(raw)) return fallback()
  // Review/UI snippet indicators
  if (/rated|reviews|real guests|real stays|show map|sustainability certification|beachfront/i.test(raw)) return fallback()
  // Must contain at least one pet-related keyword
  const hasPetKeyword = /\b(pet|dog|cat|animal|charge|fee|welcome|allowed|accepted)\b/i.test(raw)
  if (!hasPetKeyword) return fallback()
  // Truncate to max 200 chars
  const trimmed = raw.trim()
  return trimmed.length > 200 ? trimmed.slice(0, 197) + '…' : trimmed
}

export default function HotelRankedCard({ hotel, rank, destName, catName, dict, locale, destCountry }: HotelRankedCardProps) {
  const ctaHref = destCountry
    ? buildAllezLink(hotel.name, destName, destCountry)
    : hotel.bookingUrl

  return (
    <article className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Rank label */}
      <div className="flex items-center gap-2 px-6 pt-5 pb-0">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-black shadow-sm shadow-blue-200">
          #{rank}
        </span>
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
          {dict.rankLabel} {catName}
        </span>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative md:w-2/5 h-56 md:h-auto md:min-h-[260px] flex-shrink-0 overflow-hidden">
          <Image
            src={`/images/hotels/${hotel.id}.jpg`}
            alt={`${hotel.name}: ${catName} hotel in ${destName}`}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Pet fee badge overlaid on image */}
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
              hotel.petFee === 0
                ? 'bg-green-500 text-white'
                : 'bg-amber-400 text-gray-900'
            }`}>
              {hotel.petFee === 0 ? `✓ ${dict.free}` : `${dict.petFee}: €${hotel.petFee}`}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col p-6 flex-1 min-w-0">
          {/* Name + Stars */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="text-xl font-extrabold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors">
              <Link href={`/${locale}/hotels/${hotel.slug}`} className="hover:underline">
                {hotel.name}
              </Link>
            </h3>
            <span className="flex-shrink-0 text-amber-400 text-sm tracking-tight" aria-label={`${hotel.stars} stars`}>
              {'★'.repeat(hotel.stars)}{'☆'.repeat(5 - hotel.stars)}
            </span>
          </div>

          {/* Rating row */}
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-600 text-white font-black text-sm px-2.5 py-1 rounded-lg leading-none">
              {hotel.rating}
            </span>
            <span className="font-semibold text-gray-800 text-sm">{ratingLabel(hotel.rating, locale)}</span>
            <span className="text-gray-400 text-xs">· {
              hotel.reviewCount >= 1000
                ? `${(hotel.reviewCount / 1000).toFixed(hotel.reviewCount >= 10000 ? 0 : 1)}k`
                : hotel.reviewCount
            } {dict.reviews}</span>
          </div>

          {/* Pet policy */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 mb-4">
            <div className="flex items-center justify-between mb-0.5">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">{dict.petPolicy}</p>
              <span className="text-xs text-blue-400 font-medium">✓ Booking.com</span>
            </div>
            <p className="text-sm text-gray-700 leading-snug">{localizedPetPolicy(hotel, locale)}</p>
          </div>

          {/* Highlights */}
          <ul className="flex flex-wrap gap-1.5 mb-4" aria-label="Hotel highlights">
            {hotel.highlights.map((h) => (
              <li
                key={h}
                className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
              >
                ✓ {h}
              </li>
            ))}
          </ul>

          {/* Price + CTA */}
          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-2 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-400">{dict.from}</p>
              <p className="text-3xl font-black text-gray-900 leading-none">
                {currencySymbol(hotel.currency)}{hotel.priceFrom}
                <span className="text-sm font-normal text-gray-400 ml-1">{dict.perNight}</span>
              </p>
            </div>
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 whitespace-nowrap"
            >
              {dict.book} →
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
