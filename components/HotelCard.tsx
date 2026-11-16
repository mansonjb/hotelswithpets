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
    ? buildAllezLink(hotel.name, destName, destCountry, 'hotelswithpets', 3)
    : hotel.bookingUrl

  const isFree = hotel.petFee === 0
  const policyText = localizedPetPolicy(hotel, locale)

  return (
    <article className="group bg-white rounded-[28px] overflow-hidden border-[1.6px] border-ink shadow-hard hover:-translate-y-1 transition-all duration-300 flex flex-col">

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

        {/* Rating badge, top left */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white border-[1.6px] border-ink rounded-full px-3 py-1.5 ">
          <span className="text-electric font-bold text-sm leading-none">{hotel.rating}</span>
          <span className="text-slate text-xs leading-none">{formatReviews(hotel.reviewCount)}</span>
        </div>

        {/* Pet fee badge, top right */}
        <div className="absolute top-3 right-3">
          {isFree ? (
            <span className="flex items-center gap-1 bg-electric text-white border-[1.6px] border-ink text-xs font-bold px-3 py-1.5 rounded-full ">
              <span>🐾</span> {dict.free}
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-lime text-ink border-[1.6px] border-ink text-xs font-bold px-3 py-1.5 rounded-full ">
              {dict.petFee}: €{hotel.petFee}
            </span>
          )}
        </div>

        {/* Stars, bottom left on image */}
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
          <h3 className="font-display font-semibold text-ink text-base leading-snug mb-0.5 group-hover:text-electric transition-colors line-clamp-2">
            <Link href={`/${locale}/hotels/${hotel.slug}`} className="hover:underline">
              {hotel.name}
            </Link>
          </h3>
          <p className="text-xs text-slate font-medium">
            {ratingLabel(hotel.rating, locale)}
            <span className="mx-1.5 text-line">·</span>
            {formatReviews(hotel.reviewCount)} {dict.reviews}
          </p>
        </div>

        {/* Pet policy, minimal strip */}
        <div className={`rounded-xl px-3 py-2.5 text-xs leading-relaxed ${isFree ? 'bg-lavender-soft text-ink' : 'bg-lavender-soft text-ink'}`}>
          <span className="font-semibold uppercase tracking-wide text-[10px] block mb-0.5 opacity-70">
            🐾 {dict.petPolicy}
          </span>
          {policyText}
        </div>

        {/* Highlights */}
        {hotel.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {hotel.highlights.slice(0, 3).map((h) => (
              <span key={h} className="text-[11px] bg-cream border border-line text-slate px-2 py-0.5 rounded-full">
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-auto pt-3 border-t border-line flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] text-slate uppercase tracking-widest">{dict.from}</p>
            <p className="text-xl font-bold text-ink leading-tight">
              {hotel.currency === 'EUR' ? '€' : hotel.currency}{hotel.priceFrom}
              <span className="text-xs font-normal text-slate ml-1">{dict.perNight}</span>
            </p>
          </div>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer sponsored"
            aria-label={`Book ${hotel.name}`}
            className="flex-shrink-0 bg-ink text-white font-semibold px-5 py-3 rounded-full border-[1.6px] border-ink text-sm transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 whitespace-nowrap"
          >
            {dict.book} →
          </a>
        </div>
      </div>
    </article>
  )
}
