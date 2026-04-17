'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Locale } from '@/app/[locale]/dictionaries'
import destinations from '@/data/destinations.json'
import categories from '@/data/categories.json'

interface HeroProps {
  locale: Locale
  dict: {
    hero: {
      badge: string
      title: string
      subtitle: string
      searchDestination: string
      searchCategory: string
      cta: string
      stat1Value: string
      stat1Label: string
      stat2Value: string
      stat2Label: string
      stat3Value: string
      stat3Label: string
    }
  }
}

function getCategoryName(cat: (typeof categories)[number], locale: Locale): string {
  if (locale === 'fr' && cat.nameFr) return cat.nameFr
  if (locale === 'es' && cat.nameEs) return cat.nameEs
  return cat.name
}

function matchDestination(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return null
  const bySlug = destinations.find((d) => d.slug === q)
  if (bySlug) return bySlug
  const byExact = destinations.find((d) => d.name.toLowerCase() === q)
  if (byExact) return byExact
  const byStart = destinations.find((d) => d.name.toLowerCase().startsWith(q))
  if (byStart) return byStart
  const byIncludes = destinations.find((d) => d.name.toLowerCase().includes(q))
  if (byIncludes) return byIncludes
  const byCountry = destinations.find((d) => d.country.toLowerCase().includes(q))
  if (byCountry) return byCountry
  return null
}

const POPULAR_CITIES = ['Paris', 'Barcelona', 'Amsterdam', 'Rome', 'Lisbon', 'Vienna', 'Prague', 'Berlin']

export default function Hero({ locale, dict }: HeroProps) {
  const router = useRouter()
  const { hero } = dict
  const [destQuery, setDestQuery] = useState('')
  const [catSlug, setCatSlug] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const match = matchDestination(destQuery)
    if (match && catSlug) {
      router.push(`/${locale}/${match.slug}/${catSlug}`)
    } else if (match) {
      router.push(`/${locale}/destinations/${match.slug}`)
    } else if (catSlug) {
      router.push(`/${locale}/categories/${catSlug}`)
    } else {
      router.push(`/${locale}/destinations`)
    }
  }

  function handleCityChip(name: string) {
    const match = matchDestination(name)
    if (match) router.push(`/${locale}/destinations/${match.slug}`)
  }

  const findLabel = locale === 'fr' ? 'Trouvez votre séjour' : locale === 'es' ? 'Encuentra tu estancia' : 'Find your stay'
  const trustLabel = locale === 'fr'
    ? 'Gratuit · Sans inscription · Réservez sur Booking.com'
    : locale === 'es'
    ? 'Gratis · Sin registro · Reserva en Booking.com'
    : 'Free · No sign-up · Book on Booking.com'

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white">
      {/* Background blobs */}
      <div className="absolute top-[-80px] right-[-60px] w-[480px] h-[480px] rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-40px] w-[360px] h-[360px] rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-700/8 blur-3xl pointer-events-none rounded-full" />

      {/* Floating paw prints decorative */}
      <div className="absolute top-12 left-[8%] text-4xl opacity-5 select-none rotate-[-15deg] hidden lg:block">🐾</div>
      <div className="absolute bottom-20 right-[6%] text-5xl opacity-5 select-none rotate-[20deg] hidden lg:block">🐾</div>
      <div className="absolute top-1/2 right-[15%] text-3xl opacity-5 select-none rotate-[-8deg] hidden xl:block">🐾</div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
              <span>🐾</span> {hero.badge}
            </span>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              {hero.title}
            </h1>
            <p className="text-lg text-blue-200 leading-relaxed mb-12 max-w-lg">
              {hero.subtitle}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-x-10 gap-y-6">
              {[
                { value: hero.stat1Value, label: hero.stat1Label },
                { value: hero.stat2Value, label: hero.stat2Label },
                { value: hero.stat3Value, label: hero.stat3Label },
              ].map((s, i) => (
                <div key={s.label} className="flex flex-col">
                  {i > 0 && (
                    <span className="hidden" aria-hidden="true" />
                  )}
                  <span className="text-3xl font-black text-white leading-none tracking-tight">{s.value}</span>
                  <span className="text-[11px] text-blue-300/80 mt-1.5 uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — search card */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/20 to-indigo-500/10 blur-2xl" />
            <form
              onSubmit={handleSearch}
              className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl"
            >
              <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-6">
                {findLabel}
              </p>

              <div className="space-y-3">
                {/* Destination */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <input
                    list="destinations-list"
                    type="text"
                    value={destQuery}
                    onChange={(e) => setDestQuery(e.target.value)}
                    placeholder={hero.searchDestination}
                    className="w-full pl-11 pr-4 py-4 bg-white text-gray-900 placeholder-gray-400 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-400 transition"
                    autoComplete="off"
                  />
                  <datalist id="destinations-list">
                    {destinations.map((d) => (
                      <option key={d.slug} value={d.name} />
                    ))}
                  </datalist>
                </div>

                {/* Category */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-base">
                    🐾
                  </span>
                  <select
                    value={catSlug}
                    onChange={(e) => setCatSlug(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 bg-white text-gray-700 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-400 transition appearance-none cursor-pointer"
                  >
                    <option value="">{hero.searchCategory}</option>
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.emoji} {getCategoryName(cat, locale)}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="block w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl text-center transition-all duration-200 shadow-lg shadow-blue-900/40 hover:shadow-blue-900/60 hover:-translate-y-0.5 text-sm tracking-wide"
                >
                  {hero.cta} →
                </button>
              </div>

              {/* Popular city chips */}
              <div className="mt-5">
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">
                  {locale === 'fr' ? 'Populaire' : locale === 'es' ? 'Popular' : 'Popular'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_CITIES.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => handleCityChip(city)}
                      className="text-[11px] text-white/60 hover:text-white bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/25 px-2.5 py-1 rounded-full transition-all duration-150"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-blue-300/60 text-center mt-5">
                {trustLabel}
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
