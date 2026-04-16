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
  return (
    destinations.find((d) => d.slug === q) ||
    destinations.find((d) => d.name.toLowerCase() === q) ||
    destinations.find((d) => d.name.toLowerCase().startsWith(q)) ||
    null
  )
}

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

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white min-h-[600px] flex items-center">
      {/* Background blobs */}
      <div className="absolute top-[-80px] right-[-60px] w-[420px] h-[420px] rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-40px] w-[320px] h-[320px] rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-700/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
              <span>🐾</span> {hero.badge}
            </span>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              {hero.title}
            </h1>
            <p className="text-lg text-blue-200 leading-relaxed mb-10 max-w-lg">
              {hero.subtitle}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8">
              {[
                { value: hero.stat1Value, label: hero.stat1Label },
                { value: hero.stat2Value, label: hero.stat2Label },
                { value: hero.stat3Value, label: hero.stat3Label },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-3xl font-black text-white leading-none">{s.value}</span>
                  <span className="text-xs text-blue-300 mt-1 uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — search card */}
          <div className="relative">
            {/* Decorative ring */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/30 to-indigo-500/10 blur-xl" />
            <form
              onSubmit={handleSearch}
              className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl"
            >
              <p className="text-sm font-semibold text-blue-200 uppercase tracking-widest mb-6">
                {locale === 'fr' ? 'Trouvez votre séjour' : locale === 'es' ? 'Encuentra tu estancia' : 'Find your stay'}
              </p>

              <div className="space-y-3">
                {/* Destination input with datalist for autocomplete */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">📍</span>
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

                {/* Category select */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">🐾</span>
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
                  className="block w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl text-center transition-all duration-200 shadow-lg shadow-blue-900/40 hover:shadow-blue-900/60 hover:-translate-y-0.5"
                >
                  {hero.cta} →
                </button>
              </div>

              <p className="text-xs text-blue-300 text-center mt-5 opacity-70">
                {locale === 'fr'
                  ? 'Gratuit · Sans inscription · Réservez sur Booking.com'
                  : locale === 'es'
                  ? 'Gratis · Sin registro · Reserva en Booking.com'
                  : 'Free · No sign-up · Book on Booking.com'}
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
