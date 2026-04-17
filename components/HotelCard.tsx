import Image from 'next/image'
import Link from 'next/link'
import { buildAllezLink } from '@/lib/site'

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

interface HotelCardDict {
  book: string
  from: string
  perNight: string
  free: string
  petFee: string
  petPolicy: string
  stars: string
  reviews: string
}

interface HotelCardProps {
  hotel: Hotel
  dict: HotelCardDict
  locale: string
  /** Destination city name — used to build Allez tracked deep link */
  destName?: string
  /** Destination country — used to build Allez tracked deep link */
  destCountry?: string
}

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

const ratingLabel = (r: number, locale: string): string => {
  const labels: Record<string, [string, string, string, string]> = {
    en: ['Exceptional', 'Excellent', 'Very Good', 'Good'],
    fr: ['Exceptionnel', 'Excellent', 'Très bien', 'Bien'],
    es: ['Excepcional', 'Excelente', 'Muy bueno', 'Bueno'],
  }
  const [exceptional, excellent, veryGood, good] = labels[locale] ?? labels.en
  if (r >= 9) return exceptional
  if (r >= 8.5) return excellent
  if (r >= 8) return veryGood
  return good
}

export default function HotelCard({ hotel, dict, locale, destName, destCountry }: HotelCardProps) {
  // Use Stay22 Allez tracked deep link when we have destination info; fall back to raw bookingUrl
  const ctaHref = destName && destCountry
    ? buildAllezLink(hotel.name, destName, destCountry)
    : hotel.bookingUrl
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
      {/* Hotel image */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <Image
          src={`/images/hotels/${hotel.id}.jpg`}
          alt={hotel.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Pet fee overlay badge */}
        <div className="absolute top-2 right-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold shadow ${
            hotel.petFee === 0
              ? 'bg-green-500 text-white'
              : 'bg-amber-400 text-gray-900'
          }`}>
            {hotel.petFee === 0 ? `✓ ${dict.free}` : `${dict.petFee}: €${hotel.petFee}`}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Name + Stars */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-blue-700 transition-colors">
            <Link href={`/${locale}/hotels/${hotel.slug}`} className="hover:underline">
              {hotel.name}
            </Link>
          </h3>
          <span className="flex-shrink-0 flex items-center gap-0.5 text-amber-400 text-sm">
            {'★'.repeat(hotel.stars)}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-blue-600 text-white text-sm font-bold px-2.5 py-1 rounded-lg leading-none">
            {hotel.rating}
          </span>
          <span className="text-sm font-semibold text-gray-700">{ratingLabel(hotel.rating, locale)}</span>
          <span className="text-xs text-gray-400">
            {hotel.reviewCount >= 1000
              ? `${(hotel.reviewCount / 1000).toFixed(hotel.reviewCount >= 10000 ? 0 : 1)}k`
              : hotel.reviewCount
            } {dict.reviews}
          </span>
        </div>

        {/* Pet policy */}
        <div className="bg-blue-50 rounded-xl p-3 mb-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">{dict.petPolicy}</p>
            <span className="text-xs text-blue-400 font-medium">✓ Booking.com</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{sanitizePetPolicy(hotel.petPolicy, hotel.petFee, locale)}</p>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {hotel.highlights.map((h) => (
            <span
              key={h}
              className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-400">{dict.from}</p>
            <p className="text-2xl font-black text-gray-900">
              {hotel.currency === 'EUR' ? '€' : hotel.currency}{hotel.priceFrom}
              <span className="text-sm font-normal text-gray-400 ml-1">{dict.perNight}</span>
            </p>
          </div>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer sponsored"
            aria-label={`Book ${hotel.name}`}
            className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
          >
            {dict.book}
          </a>
        </div>
      </div>
    </div>
  )
}
