import hotels from '@/data/hotels.json'
import destinations from '@/data/destinations.json'
import Image from 'next/image'
import type { Locale } from '@/app/[locale]/dictionaries'
import { buildAllezLink } from '@/lib/site'

interface TopHotelsProps {
  locale: Locale
}

export default function TopHotels({ locale }: TopHotelsProps) {
  // Get top 6 hotels by rating (with reviewCount > 200 for reliability)
  const topHotels = [...hotels]
    .filter(h => h.reviewCount > 200)
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, 6)

  const headings: Record<string, string> = {
    en: 'Top-Rated Pet-Friendly Hotels',
    fr: 'Hôtels Pet-Friendly les Mieux Notés',
    es: 'Hoteles Pet-Friendly Mejor Valorados',
  }
  const subheadings: Record<string, string> = {
    en: 'Highest guest scores among our verified pet-friendly properties',
    fr: 'Meilleurs scores clients parmi nos hôtels pet-friendly vérifiés',
    es: 'Las mejores puntuaciones entre nuestros hoteles pet-friendly verificados',
  }
  const bookLabel: Record<string, string> = {
    en: 'Book',
    fr: 'Réserver',
    es: 'Reservar',
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            ⭐ Editor's Choice
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
            {headings[locale] ?? headings.en}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {subheadings[locale] ?? subheadings.en}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topHotels.map((hotel, i) => {
            const dest = destinations.find(d => d.slug === hotel.destinationSlug)
            const ctaHref = dest
              ? buildAllezLink(hotel.name, dest.name, dest.country)
              : hotel.bookingUrl
            return (
              <article key={hotel.id} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <Image
                    src={`/images/hotels/${hotel.id}.jpg`}
                    alt={hotel.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Rank badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-amber-400 text-gray-900 text-xs font-black px-2.5 py-1 rounded-full shadow">
                      #{i + 1}
                    </span>
                  </div>
                  {/* Rating badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-blue-600 text-white text-sm font-black px-2.5 py-1 rounded-lg shadow">
                      {hotel.rating}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-base leading-snug flex-1 group-hover:text-blue-700 transition-colors">
                      {hotel.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-amber-400 text-xs">{'★'.repeat(hotel.stars)}</span>
                    {dest && (
                      <span className="text-xs text-gray-400">{dest.flag} {dest.name}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400">{locale === 'fr' ? 'Dès' : locale === 'es' ? 'Desde' : 'From'}</p>
                      <p className="text-xl font-black text-gray-900">€{hotel.priceFrom}<span className="text-xs font-normal text-gray-400 ml-1">/night</span></p>
                    </div>
                    <a
                      href={ctaHref}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-all shadow-md hover:-translate-y-0.5 whitespace-nowrap"
                    >
                      {bookLabel[locale] ?? bookLabel.en} →
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
