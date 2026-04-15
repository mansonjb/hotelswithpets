interface Hotel {
  id: string
  name: string
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
}

const ratingLabel = (r: number) => {
  if (r >= 9) return 'Exceptional'
  if (r >= 8.5) return 'Excellent'
  if (r >= 8) return 'Very Good'
  return 'Good'
}

export default function HotelCard({ hotel, dict }: HotelCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
      {/* Colour header bar */}
      <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />

      <div className="p-6 flex flex-col flex-1">
        {/* Name + Stars */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-blue-700 transition-colors">
            {hotel.name}
          </h3>
          <span className="flex-shrink-0 flex items-center gap-0.5 text-amber-400 text-sm">
            {'★'.repeat(hotel.stars)}
            <span className="text-gray-400 text-xs ml-1">{hotel.stars}{dict.stars[0]}</span>
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-blue-600 text-white text-sm font-bold px-2.5 py-1 rounded-lg leading-none">
            {hotel.rating}
          </span>
          <span className="text-sm font-semibold text-gray-700">{ratingLabel(hotel.rating)}</span>
          <span className="text-xs text-gray-400">{hotel.reviewCount.toLocaleString()} {dict.reviews}</span>
        </div>

        {/* Pet policy */}
        <div className="bg-blue-50 rounded-xl p-3 mb-4">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">{dict.petPolicy}</p>
          <p className="text-sm text-gray-700 leading-relaxed">{hotel.petPolicy}</p>
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
            <p className={`text-xs mt-0.5 font-medium ${hotel.petFee === 0 ? 'text-green-600' : 'text-amber-600'}`}>
              {hotel.petFee === 0
                ? `✓ ${dict.free}`
                : `${dict.petFee}: €${hotel.petFee}`}
            </p>
          </div>
          <a
            href={hotel.bookingUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
          >
            {dict.book}
          </a>
        </div>
      </div>
    </div>
  )
}
