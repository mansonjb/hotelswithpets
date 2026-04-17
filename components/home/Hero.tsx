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

const HEADLINES: Record<string, { line1: string; line2: string; accent: string }> = {
  fr: {
    line1: 'Votre meilleur ami mérite',
    line2: 'de vraies belles vacances.',
    accent: 'Hôtels vérifiés, animaux bienvenus.',
  },
  en: {
    line1: 'Your best friend deserves',
    line2: 'a real holiday too.',
    accent: 'Verified hotels. Pets truly welcome.',
  },
  es: {
    line1: 'Tu mejor amigo merece',
    line2: 'unas vacaciones de verdad.',
    accent: 'Hoteles verificados. Mascotas bienvenidas.',
  },
}

const REVIEW: Record<string, { text: string; author: string }> = {
  fr: {
    text: '"Enfin un site qui vérifie vraiment les politiques animaux. Aucune mauvaise surprise."',
    author: 'Sophie T., Paris',
  },
  en: {
    text: '"Finally a site that actually verifies pet policies. No nasty surprises on arrival."',
    author: 'Claire M., London',
  },
  es: {
    text: '"Por fin un sitio que verifica las políticas reales. Sin sorpresas a la llegada."',
    author: 'Lucía M., Madrid',
  },
}

const TRUST: Record<string, string[]> = {
  fr: ['Gratuit, sans inscription', 'Politiques vérifiées', 'Réservation directe Booking.com'],
  en: ['Free, no sign-up', 'Policies verified', 'Book on Booking.com'],
  es: ['Gratis, sin registro', 'Políticas verificadas', 'Reserva en Booking.com'],
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

  const popularLabel =
    locale === 'fr' ? 'Destinations populaires' : locale === 'es' ? 'Destinos populares' : 'Popular destinations'

  return (
    <section className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #3d1a08 0%, #1c1a2e 40%, #0f172a 100%)' }}>

      {/* Warm ambient blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-80px] left-[-60px] w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #fb923c 0%, transparent 70%)' }} />
      <div className="absolute top-1/2 left-[30%] w-[400px] h-[200px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #fbbf24 0%, transparent 70%)' }} />

      {/* Subtle paw print texture */}
      <div className="absolute top-10 left-[6%] text-5xl opacity-[0.06] select-none rotate-[-20deg] hidden lg:block">🐾</div>
      <div className="absolute bottom-16 right-[5%] text-6xl opacity-[0.06] select-none rotate-[15deg] hidden lg:block">🐾</div>
      <div className="absolute top-1/2 right-[22%] text-4xl opacity-[0.04] select-none rotate-[-5deg] hidden xl:block">🐾</div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left — emotional copy */}
          <div>
            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-8 border"
              style={{ background: 'rgba(251,146,60,0.15)', borderColor: 'rgba(251,146,60,0.3)', color: '#fed7aa' }}>
              <span>🐾</span> {hero.badge}
            </span>

            {/* Emotional headline */}
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.08] mb-4 tracking-tight">
              <span className="text-white">{headlines.line1}</span>
              <br />
              <span style={{ background: 'linear-gradient(90deg, #fb923c, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {headlines.line2}
              </span>
            </h1>

            <p className="text-base font-semibold mb-6" style={{ color: '#fdba74' }}>
              {headlines.accent}
            </p>

            <p className="text-base leading-relaxed mb-10 max-w-lg" style={{ color: '#cbd5e1' }}>
              {hero.subtitle}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-x-8 gap-y-5 mb-10">
              {[
                { value: hero.stat1Value, label: hero.stat1Label },
                { value: hero.stat2Value, label: hero.stat2Label },
                { value: hero.stat3Value, label: hero.stat3Label },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-3xl font-black text-white leading-none tracking-tight">{s.value}</span>
                  <span className="text-[11px] mt-1.5 uppercase tracking-widest" style={{ color: '#94a3b8' }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Review quote */}
            <div className="flex items-start gap-3 p-4 rounded-2xl border"
              style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex-shrink-0 text-amber-400 text-lg mt-0.5">★★★★★</div>
              <div>
                <p className="text-sm italic leading-relaxed" style={{ color: '#e2e8f0' }}>{review.text}</p>
                <p className="text-xs mt-1.5" style={{ color: '#64748b' }}>{review.author}</p>
              </div>
            </div>
          </div>

          {/* Right — search card */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl blur-2xl opacity-40"
              style={{ background: 'linear-gradient(135deg, rgba(251,146,60,0.3), rgba(99,102,241,0.2))' }} />

            <form
              onSubmit={handleSearch}
              className="relative rounded-3xl p-7 shadow-2xl border"
              style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', borderColor: 'rgba(255,255,255,0.15)' }}
            >
              {/* Card header */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">🔍</span>
                <div>
                  <p className="text-sm font-bold text-white">
                    {locale === 'fr' ? 'Trouvez votre séjour' : locale === 'es' ? 'Encuentra tu estancia' : 'Find your stay'}
                  </p>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>
                    {locale === 'fr' ? 'Parmi nos hôtels pet-friendly en Europe' : locale === 'es' ? 'Entre nuestros hoteles pet-friendly' : 'Among our pet-friendly hotels in Europe'}
                  </p>
                </div>
              </div>

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
                    className="w-full pl-11 pr-4 py-4 bg-white text-gray-900 placeholder-gray-400 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-orange-400 transition"
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
                    className="w-full pl-11 pr-4 py-4 bg-white text-gray-700 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-orange-400 transition appearance-none cursor-pointer"
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
                  className="block w-full font-bold py-4 rounded-2xl text-center transition-all duration-200 shadow-lg hover:-translate-y-0.5 text-sm tracking-wide text-white"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 8px 24px rgba(249,115,22,0.4)' }}
                >
                  {hero.cta} →
                </button>
              </div>

              {/* Popular city chips with flags */}
              <div className="mt-5">
                <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {popularLabel}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_CITIES.map((city) => (
                    <button
                      key={city.name}
                      type="button"
                      onClick={() => handleCityChip(city.name)}
                      className="text-[11px] px-2.5 py-1 rounded-full transition-all duration-150 border"
                      style={{ color: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)' }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(249,115,22,0.2)'
                        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(249,115,22,0.4)'
                        ;(e.currentTarget as HTMLElement).style.color = '#fff'
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'
                        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'
                        ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'
                      }}
                    >
                      {city.flag} {city.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trust strip */}
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-5 pt-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                {trust.map((item) => (
                  <span key={item} className="text-[10px] flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    <span className="text-emerald-400">✓</span> {item}
                  </span>
                ))}
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
