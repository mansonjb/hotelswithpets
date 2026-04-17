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
  destName?: string
  destCountry?: string
}

function sanitizePetPolicy(raw: string, petFee?: number, locale = 'en'): string {
  const fallback = (): string => {
    if (locale === 'fr') {
      if (petFee === 0) return "Les animaux séjournent gratuitement. Chiens et chats bienvenus dans tout l'établissement."
      if (petFee !== undefined && petFee > 0) return `Animaux acceptés. Un supplément de ${petFee}€ par nuit s'applique. À confirmer lors de la réservation.`
      return 'Les animaux sont les bienvenus. Veuillez confirmer les conditions lors de la réservation.'
    }
    if (locale === 'es') {
      if (petFee === 0) return 'Las mascotas se alojan gratis. Perros y gatos son bienvenidos en todo el establecimiento.'
      if (petFee !== undefined && petFee > 0) return `Se admiten mascotas. Se aplica un cargo de ${petFee}€ por noche. Confirmar al reservar.`
      return 'Las mascotas son bienvenidas. Confirme las condiciones específicas al reservar.'
    }
    if (petFee === 0) return 'Pets stay free of charge. Dogs and cats are welcome throughout the property.'
    if (petFee !== undefined && petFee > 0) return `Pets accepted. A pet fee of €${petFee} per night applies. Please confirm on booking.`
    return 'Pets are welcome. Please confirm specific pet policy when booking.'
  }

  if (!raw || raw.trim().length === 0) return fallback()
  if (/<[a-z]/i.test(raw) || /[<>{}]/.test(raw)) return fallback()
  if (/\d+.*\b(avenue|ave|rue|street|st\.|boulevard|blvd|road|rd\.)\b/i.test(raw)) return fallback()
  if (/rated|reviews|real guests|real stays|show map|sustainability certification|beachfront/i.test(raw)) return fallback()
  const hasPetKeyword = /\b(pet|dog|cat|animal|charge|fee|welcome|allowed|accepted)\b/i.test(raw)
  if (!hasPetKeyword) return fallback()
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

const formatReviews = (n: number) =>
  n >= 10000 ? `${Math.round(n / 1000)}k` : n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)

export default function HotelCard({ hotel, dict, locale, destName, destCountry }: HotelCardProps) {
  const ctaHref = destName && destCountry
    ? buildAllezLink(hotel.name, destName, destCountry)
    : hotel.bookingUrl

  const isFree = hotel.petFee === 0
  const policyText = localizedPetPolicy(hotel, locale)

  return (
    <article className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">

      {/* ── Image ── */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <Image
          src={`/images/hotels/${hotel.id}.jpg`}
          alt={hotel.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Gradient fade to white */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Rating badge — top left */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-xl px-2.5 py-1.5 shadow-sm">
          <span className="text-blue-600 font-black text-sm leading-none">{hotel.rating}</span>
          <span className="text-gray-400 text-xs leading-none">{formatReviews(hotel.reviewCount)}</span>
        </div>

        {/* Pet fee badge — top right */}
        <div className="absolute top-3 right-3">
          {isFree ? (
            <span className="flex items-center gap-1 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-xl shadow-sm">
              <span>🐾</span> {dict.free}
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-amber-400 text-gray-900 text-xs font-bold px-2.5 py-1.5 rounded-xl shadow-sm">
              {dict.petFee}: €{hotel.petFee}
            </span>
          )}
        </div>

        {/* Stars — bottom left on image */}
        <div className="absolute bottom-3 left-3">
          <span className="text-amber-400 text-sm tracking-tight drop-shadow-sm">
            {'★'.repeat(hotel.stars)}{'☆'.repeat(Math.max(0, 5 - hotel.stars))}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-5 flex flex-col flex-1 gap-3">

        {/* Name + rating label */}
        <div>
          <h3 className="font-bold text-gray-900 text-base leading-snug mb-0.5 group-hover:text-blue-700 transition-colors line-clamp-2">
            <Link href={`/${locale}/hotels/${hotel.slug}`} className="hover:underline">
              {hotel.name}
            </Link>
          </h3>
          <p className="text-xs text-gray-400 font-medium">
            {ratingLabel(hotel.rating, locale)}
            <span className="mx-1.5 text-gray-200">·</span>
            {formatReviews(hotel.reviewCount)} {dict.reviews}
          </p>
        </div>

        {/* Pet policy — minimal strip */}
        <div className={`rounded-xl px-3 py-2.5 text-xs leading-relaxed ${isFree ? 'bg-emerald-50 text-emerald-800' : 'bg-blue-50 text-blue-800'}`}>
          <span className="font-semibold uppercase tracking-wide text-[10px] block mb-0.5 opacity-70">
            🐾 {dict.petPolicy}
          </span>
          {policyText}
        </div>

        {/* Highlights */}
        {hotel.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {hotel.highlights.slice(0, 3).map((h) => (
              <span key={h} className="text-[11px] bg-gray-50 border border-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">{dict.from}</p>
            <p className="text-xl font-black text-gray-900 leading-tight">
              {hotel.currency === 'EUR' ? '€' : hotel.currency}{hotel.priceFrom}
              <span className="text-xs font-normal text-gray-400 ml-1">{dict.perNight}</span>
            </p>
          </div>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer sponsored"
            aria-label={`Book ${hotel.name}`}
            className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs tracking-wide transition-all duration-150 shadow-sm hover:shadow-blue-200 hover:shadow-md whitespace-nowrap"
          >
            {dict.book} →
          </a>
        </div>
      </div>
    </article>
  )
}
