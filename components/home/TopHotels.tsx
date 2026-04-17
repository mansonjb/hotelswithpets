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
            const isFree = hotel.petFee === 0
            const perNight = locale === 'fr' ? '/nuit' : locale === 'es' ? '/noche' : '/night'
            const fromLabel = locale === 'fr' ? 'Dès' : locale === 'es' ? 'Desde' : 'From'
            return (
              <article key={hotel.id} className="group bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
                {/* Image */}
                <div className="relative h-52 overflow-hidden flex-shrink-0">
                  <Image
                    src={`/images/hotels/${hotel.id}.jpg`}
                    alt={hotel.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {/* Rank badge — top left */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-xl px-2.5 py-1.5 shadow-sm">
                    <span className="text-amber-500 font-black text-xs">#{i + 1}</span>
                    <span className="text-blue-600 font-black text-sm leading-none">{hotel.rating}</span>
                  </div>
                  {/* Pet fee badge — top right */}
                  <div className="absolute top-3 right-3">
                    {isFree ? (
                      <span className="flex items-center gap-1 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-xl shadow-sm">
                        🐾 {locale === 'fr' ? 'Gratuit' : locale === 'es' ? 'Gratis' : 'Free'}
                      </span>
                    ) : (
                      <span className="bg-amber-400 text-gray-900 text-xs font-bold px-2.5 py-1.5 rounded-xl shadow-sm">
                        €{hotel.petFee}
                      </span>
                    )}
                  </div>
                  {/* Stars — bottom left */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-amber-400 text-sm tracking-tight drop-shadow-sm">
                      {'★'.repeat(hotel.stars)}{'☆'.repeat(Math.max(0, 5 - hotel.stars))}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-base leading-snug mb-1 group-hover:text-blue-700 transition-colors line-clamp-2">
                    {hotel.name}
                  </h3>
                  {dest && (
                    <p className="text-xs text-gray-400 mb-4">{dest.flag} {dest.name}, {dest.country}</p>
                  )}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">{fromLabel}</p>
                      <p className="text-xl font-black text-gray-900 leading-tight">
                        €{hotel.priceFrom}<span className="text-xs font-normal text-gray-400 ml-1">{perNight}</span>
                      </p>
                    </div>
                    <a
                      href={ctaHref}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs tracking-wide transition-all duration-150 shadow-sm hover:shadow-blue-200 hover:shadow-md whitespace-nowrap"
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
