import Link from 'next/link'
import Image from 'next/image'
import { GuideFooter } from './GuideFooter'
import { SITE_URL, buildAllezLink } from '@/lib/site'
import PetMap from '@/components/PetMap'
import destinations from '@/data/destinations.json'
import hotels from '@/data/hotels.json'
import { getLocalizedCityName } from '@/lib/cityNames'
import NearbyHotelCard from '@/components/NearbyHotelCard'
import StickyHotelCTA from '@/components/StickyHotelCTA'

// ─── Shared types ─────────────────────────────────────────────────────────────

export interface CityCopy {
  days: string
  intro: string
  highlight: string
  highlightDesc: string
}

export interface LegCopy {
  from: string
  to: string
  duration: string
  service: string
  petRule: string
}

export interface RouteCopy {
  hero: { tagline: string; title: string; subtitle: string }
  why: { title: string; bullets: string[] }
  stats: {
    duration: string; cities: string; transport: string; budget: string
    durationVal: string; citiesVal: string; transportVal: string; budgetVal: string
  }
  citiesIntro: { kicker: string; title: string }
  cities: Record<string, CityCopy>
  hotelsLabel: string
  bookLabel: string
  detailsLabel: string
  mapLabel: string
  legsTitle: string
  legs: LegCopy[]
  practicalTitle: string
  practicalBullets: string[]
  faqTitle: string
  faqs: Array<{ q: string; a: string }>
}

export interface StickyConfig {
  /** Pre-built Stay22 Allez deep-link to send the user to */
  href: string
  /** Localized headline shown in the bar */
  label: string
  /** Localized CTA button text */
  cta: string
}

export interface CityTripGuideProps {
  /** URL-safe slug used for canonical + GuideFooter highlight */
  slug: string
  /** Ordered list of destination slugs (must exist in destinations.json) */
  routeSlugs: readonly string[]
  /** Locale (en | fr | es) */
  locale: string
  /** Translated copy for this locale */
  copy: RouteCopy
  /** Optional mobile sticky CTA shown at the bottom of the page */
  sticky?: StickyConfig
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CityTripGuide({ slug, routeSlugs, locale, copy: c, sticky }: CityTripGuideProps) {
  // Resolve cities from data
  const cities = routeSlugs.map((destSlug) => {
    const dest = destinations.find((d) => d.slug === destSlug)
    if (!dest) return null
    const cityHotels = hotels.filter((h) => h.destinationSlug === destSlug).slice(0, 3)
    return { slug: destSlug, dest, hotels: cityHotels, copy: c.cities[destSlug] }
  }).filter((x): x is NonNullable<typeof x> => x !== null && Boolean(x.copy))

  // TouristTrip schema
  const tripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: c.hero.title,
    description: c.hero.subtitle,
    url: `${SITE_URL}/${locale}/guides/${slug}`,
    inLanguage: locale,
    touristType: 'Pet owner',
    itinerary: cities.map((city, i) => ({
      '@type': 'TouristDestination',
      position: i + 1,
      name: city.dest.name,
      address: { '@type': 'PostalAddress', addressCountry: city.dest.country, addressLocality: city.dest.name },
      geo: { '@type': 'GeoCoordinates', latitude: city.dest.lat, longitude: city.dest.lng },
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.12),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            🚂 {c.hero.tagline}
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">{c.hero.title}</h1>
          <p className="text-blue-100 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">{c.hero.subtitle}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold">
            {cities.map((city, i) => (
              <span key={city.slug} className="flex items-center gap-2">
                <span className="bg-white/15 border border-white/20 px-3 py-1.5 rounded-full">
                  {city.dest.flag} {getLocalizedCityName(city.slug, city.dest.name, locale)}
                </span>
                {i < cities.length - 1 && <span className="text-white/50">→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: c.stats.duration, val: c.stats.durationVal, emoji: '📅' },
              { label: c.stats.cities,   val: c.stats.citiesVal,   emoji: '🏙️' },
              { label: c.stats.transport,val: c.stats.transportVal,emoji: '🚂' },
              { label: c.stats.budget,   val: c.stats.budgetVal,   emoji: '💶' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl mb-1">{s.emoji}</p>
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">{s.label}</p>
                <p className="text-sm font-semibold text-gray-900">{s.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">🐾 {c.why.title}</h2>
          <ul className="space-y-4">
            {c.why.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-4 bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">{i + 1}</span>
                <p className="text-gray-700 leading-relaxed">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cities intro */}
      <section className="bg-gray-50 pt-16 pb-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">{c.citiesIntro.kicker}</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">{c.citiesIntro.title}</h2>
        </div>
      </section>

      {/* City sections */}
      {cities.map((city, idx) => {
        const localCityName = getLocalizedCityName(city.slug, city.dest.name, locale)
        return (
        <section key={city.slug} className={`py-16 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white border-y border-gray-100'}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="text-6xl">{city.dest.flag}</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">{city.copy.days}</p>
                <h3 className="text-3xl lg:text-4xl font-extrabold text-gray-900">{localCityName}</h3>
              </div>
              <Link href={`/${locale}/destinations/${city.slug}`} className="ml-auto text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                {locale === 'fr' ? 'Voir le guide complet →' : locale === 'es' ? 'Ver la guía completa →' : 'View full city guide →'}
              </Link>
            </div>

            {city.dest.heroImage && (
              <div className="relative w-full h-64 lg:h-80 rounded-2xl overflow-hidden mb-6 shadow-lg">
                <Image src={city.dest.heroImage} alt={`${localCityName}, pet-friendly city trip`} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              </div>
            )}

            <p className="text-gray-700 text-lg leading-relaxed mb-4">{city.copy.intro}</p>

            {/* Inline editorial hotel pick - converts itinerary reader to hotel booker */}
            <div className="mb-8 max-w-2xl">
              <NearbyHotelCard destinationSlug={city.slug} locale={locale} variant="compact" />
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mb-10">
              <p className="text-sm font-bold text-amber-900 mb-2">⭐ {city.copy.highlight}</p>
              <p className="text-amber-900/80 text-sm leading-relaxed">{city.copy.highlightDesc}</p>
            </div>

            {city.hotels.length > 0 && (
              <div className="mb-10">
                <h4 className="text-xl font-extrabold text-gray-900 mb-5">🏨 {c.hotelsLabel}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {city.hotels.map((hotel) => {
                    const allezUrl = buildAllezLink(hotel.name, city.dest.name, city.dest.country)
                    return (
                      <div key={hotel.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative h-40 bg-gray-100">
                          <Image src={`/images/hotels/${hotel.id}.jpg`} alt={hotel.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-amber-700">
                            {'★'.repeat(hotel.stars)}
                          </div>
                        </div>
                        <div className="p-4">
                          <h5 className="font-bold text-gray-900 text-sm leading-tight mb-1 line-clamp-2 min-h-[2.5rem]">{hotel.name}</h5>
                          <div className="flex items-center gap-2 mb-3 text-xs">
                            <span className="font-bold text-blue-700">{hotel.rating}/10</span>
                            <span className="text-gray-400">·</span>
                            <span className="text-gray-600">{hotel.priceFrom} €{locale === 'fr' ? '/nuit' : locale === 'es' ? '/noche' : '/night'}</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-4">
                            {hotel.petFee === 0
                              ? (locale === 'fr' ? '🐾 Sans supplément animal' : locale === 'es' ? '🐾 Sin cargo por mascota' : '🐾 No pet fee')
                              : (locale === 'fr' ? `🐾 Supplément ${hotel.petFee} €/nuit` : locale === 'es' ? `🐾 Cargo ${hotel.petFee} €/noche` : `🐾 Pet fee €${hotel.petFee}/night`)}
                          </p>
                          <div className="flex flex-col gap-2">
                            <a href={allezUrl} target="_blank" rel="noopener nofollow sponsored" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg transition-colors">
                              {c.bookLabel}
                            </a>
                            {'slug' in hotel && hotel.slug && (
                              <Link href={`/${locale}/hotels/${hotel.slug}`} className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2 rounded-lg transition-colors">
                                {c.detailsLabel}
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-xl font-extrabold text-gray-900 mb-3">🗺️ {c.mapLabel}</h4>
              <PetMap lat={city.dest.lat} lng={city.dest.lng} destName={city.dest.name} country={city.dest.country} height={380} />
            </div>
          </div>
        </section>
      )})}

      {/* Transport */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">🚂 {c.legsTitle}</h2>
          <div className="space-y-4">
            {c.legs.map((leg, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 md:w-1/3">
                  <span className="text-lg font-bold text-gray-900">{leg.from}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-lg font-bold text-gray-900">{leg.to}</span>
                </div>
                <div className="md:w-2/3 text-sm text-gray-600 space-y-1">
                  <p><span className="font-semibold text-gray-900">⏱️ {leg.duration}</span> · {leg.service}</p>
                  <p>🐾 {leg.petRule}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">📋 {c.practicalTitle}</h2>
          <ul className="space-y-3">
            {c.practicalBullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4">
                <span className="text-blue-600 font-bold text-sm">✓</span>
                <p className="text-sm text-gray-700 leading-relaxed">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">❓ {c.faqTitle}</h2>
          <div className="space-y-4">
            {c.faqs.map((f, i) => (
              <details key={i} className="bg-gray-50 border border-gray-200 rounded-2xl group">
                <summary className="cursor-pointer p-5 font-semibold text-gray-900 list-none flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-700 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <GuideFooter locale={locale} currentSlug={slug} />

      {sticky && (
        <StickyHotelCTA href={sticky.href} label={sticky.label} cta={sticky.cta} />
      )}
    </div>
  )
}
