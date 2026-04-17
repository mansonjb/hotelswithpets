import Image from 'next/image'
import Link from 'next/link'

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
}

const ratingLabel = (r: number) => {
  if (r >= 9.5) return 'Outstanding'
  if (r >= 9) return 'Exceptional'
  if (r >= 8.5) return 'Excellent'
  if (r >= 8) return 'Very Good'
  return 'Good'
}

const currencySymbol = (c: string) => (c === 'EUR' ? '€' : c)

/**
 * Scraper sometimes returns garbage policy text (very long, HTML fragments, or
 * repeated filler phrases). Detect and replace with a clean generic fallback.
 */
function sanitizePetPolicy(raw: string): string {
  if (!raw || raw.trim().length === 0) return 'Pets welcome. Please confirm specific policy at booking.'
  // Too long = scraped boilerplate
  if (raw.length > 180) return 'Pets welcome. Please confirm specific policy at booking.'
  // Contains HTML tags or suspicious chars
  if (/<[a-z]/i.test(raw) || /[<>{}]/.test(raw)) return 'Pets welcome. Please confirm specific policy at booking.'
  // Generic Booking.com filler
  if (/charged|subject to availability|may vary|see policies/i.test(raw) && raw.length > 100)
    return 'Pets welcome. Please confirm specific policy at booking.'
  return raw
}

export default function HotelRankedCard({ hotel, rank, destName, catName, dict, locale }: HotelRankedCardProps) {
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
            alt={`${hotel.name} — ${catName} hotel in ${destName}`}
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
            <span className="font-semibold text-gray-800 text-sm">{ratingLabel(hotel.rating)}</span>
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
            <p className="text-sm text-gray-700 leading-snug">{sanitizePetPolicy(hotel.petPolicy)}</p>
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
              href={hotel.bookingUrl}
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
