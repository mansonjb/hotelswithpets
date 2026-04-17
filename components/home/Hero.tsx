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
    destinations.find((d) => d.name.toLowerCase().includes(q)) ||
    destinations.find((d) => d.country.toLowerCase().includes(q)) ||
    null
  )
}

const POPULAR_CITIES = [
  { name: 'Paris', flag: '🇫🇷' },
  { name: 'Barcelona', flag: '🇪🇸' },
  { name: 'Amsterdam', flag: '🇳🇱' },
  { name: 'Rome', flag: '🇮🇹' },
  { name: 'Lisbon', flag: '🇵🇹' },
  { name: 'Vienna', flag: '🇦🇹' },
  { name: 'Prague', flag: '🇨🇿' },
  { name: 'Berlin', flag: '🇩🇪' },
]

const HEADLINES: Record<string, { line1: string; line2: string }> = {
  fr: { line1: 'Votre meilleur ami mérite', line2: 'de vraies belles vacances.' },
  en: { line1: 'Your best friend deserves', line2: 'a real holiday too.' },
  es: { line1: 'Tu mejor amigo merece', line2: 'unas vacaciones de verdad.' },
}

const REVIEW: Record<string, { text: string; author: string }> = {
  fr: { text: '"Enfin un site qui vérifie vraiment les politiques animaux. Aucune mauvaise surprise à l\'arrivée."', author: 'Sophie T., Paris' },
  en: { text: '"Finally a site that actually verifies pet policies. No nasty surprises on arrival."', author: 'Claire M., London' },
  es: { text: '"Por fin un sitio que verifica las políticas reales. Sin sorpresas a la llegada."', author: 'Lucía M., Madrid' },
}

const TRUST: Record<string, string[]> = {
  fr: ['Gratuit · sans inscription', 'Politiques vérifiées', 'Booking.com'],
  en: ['Free · no sign-up', 'Verified policies', 'Booking.com'],
  es: ['Gratis · sin registro', 'Políticas verificadas', 'Booking.com'],
}

export default function Hero({ locale, dict }: HeroProps) {
  const router = useRouter()
  const { hero } = dict
  const [destQuery, setDestQuery] = useState('')
  const [catSlug, setCatSlug] = useState('')

  const lang = locale === 'fr' || locale === 'es' ? locale : 'en'
  const headlines = HEADLINES[lang]
  const review = REVIEW[lang]
  const trust = TRUST[lang]

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const match = matchDestination(destQuery)
    if (match && catSlug) router.push(`/${locale}/${match.slug}/${catSlug}`)
    else if (match) router.push(`/${locale}/destinations/${match.slug}`)
    else if (catSlug) router.push(`/${locale}/categories/${catSlug}`)
    else router.push(`/${locale}/destinations`)
  }

  function handleCityChip(name: string) {
    const match = matchDestination(name)
    if (match) router.push(`/${locale}/destinations/${match.slug}`)
  }

  const popularLabel =
    locale === 'fr' ? 'Destinations populaires' :
    locale === 'es' ? 'Destinos populares' :
    'Popular'

  return (
    <section className="relative overflow-hidden bg-white border-b border-gray-100">

      {/* Subtle blobs : orange chaud à droite, bleu doux à gauche */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle at 80% 20%, rgba(251,146,60,0.12) 0%, transparent 60%)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle at 20% 80%, rgba(99,102,241,0.08) 0%, transparent 60%)' }} />

      {/* Paw prints discrets */}
      <div className="absolute top-12 right-[12%] text-6xl opacity-[0.04] select-none rotate-[12deg] hidden xl:block">🐾</div>
      <div className="absolute bottom-10 left-[8%] text-5xl opacity-[0.04] select-none rotate-[-18deg] hidden lg:block">🐾</div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Gauche : copy ── */}
          <div>
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-7 border border-orange-200 bg-orange-50 text-orange-600">
              <span>🐾</span> {hero.badge}
            </span>

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight mb-5 text-gray-900">
              {headlines.line1}
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                {headlines.line2}
              </span>
            </h1>

            <p className="text-base text-gray-500 leading-relaxed mb-9 max-w-md">
              {hero.subtitle}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-9 pb-9 border-b border-gray-100">
              {[
                { value: hero.stat1Value, label: hero.stat1Label },
                { value: hero.stat2Value, label: hero.stat2Label },
                { value: hero.stat3Value, label: hero.stat3Label },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-black text-gray-900 leading-none">{s.value}</p>
                  <p className="text-[11px] text-gray-400 mt-1.5 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Review */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <span className="text-amber-400 text-base flex-shrink-0 mt-0.5">★★★★★</span>
              <div>
                <p className="text-sm text-gray-700 italic leading-relaxed">{review.text}</p>
                <p className="text-xs text-gray-400 mt-1.5">{review.author}</p>
              </div>
            </div>
          </div>

          {/* ── Droite : formulaire ── */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-7">

              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">
                {locale === 'fr' ? 'Trouvez votre séjour' : locale === 'es' ? 'Encuentra tu estancia' : 'Find your stay'}
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
                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300 transition"
                    autoComplete="off"
                  />
                  <datalist id="destinations-list">
                    {destinations.map((d) => <option key={d.slug} value={d.name} />)}
                  </datalist>
                </div>

                {/* Category */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-base">🐾</span>
                  <select
                    value={catSlug}
                    onChange={(e) => setCatSlug(e.target.value)}
                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-700 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300 transition appearance-none cursor-pointer"
                  >
                    <option value="">{hero.searchCategory}</option>
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>{cat.emoji} {getCategoryName(cat, locale)}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  onClick={handleSearch as unknown as React.MouseEventHandler}
                  className="w-full font-bold py-4 rounded-2xl text-white text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #f97316 0%, #3b82f6 100%)', boxShadow: '0 8px 20px rgba(99,102,241,0.25)' }}
                >
                  {hero.cta} →
                </button>
              </div>

              {/* City chips */}
              <div className="mt-5">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">{popularLabel}</p>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_CITIES.map((city) => (
                    <button
                      key={city.name}
                      type="button"
                      onClick={() => handleCityChip(city.name)}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-all duration-150"
                    >
                      {city.flag} {city.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trust */}
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-5 pt-5 border-t border-gray-100">
                {trust.map((item) => (
                  <span key={item} className="text-[10px] text-gray-400 flex items-center gap-1">
                    <span className="text-emerald-500">✓</span> {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
