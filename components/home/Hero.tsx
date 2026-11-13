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

// Top categories shown as quick-pick pills
const QUICK_CATS = ['dog-friendly', 'cat-friendly', 'luxury', 'beach-access', 'dogs-stay-free', 'near-parks']

const HEADLINES: Record<string, { line1: string; line2: string }> = {
  fr: { line1: 'Partez en vacances avec votre animal,', line2: 'dans les meilleurs hôtels.' },
  en: { line1: 'Dog-friendly hotels', line2: 'your best friend deserves.' },
  es: { line1: 'De vacaciones con tu mascota,', line2: 'en los mejores hoteles.' },
  pt: { line1: 'De férias com o seu animal,', line2: 'nos melhores hotéis.' },
  de: { line1: 'Hundefreundliche Hotels,', line2: 'die Ihr bester Freund verdient.' },
  nl: { line1: 'Hondvriendelijke hotels,', line2: 'die je beste vriend verdient.' },
  it: { line1: 'In vacanza con il tuo animale,', line2: 'nei migliori hotel.' },
}

const REVIEW: Record<string, { text: string; author: string }> = {
  fr: { text: '"Enfin un site qui vérifie vraiment les politiques animaux. Aucune mauvaise surprise à l\'arrivée."', author: 'Sophie T., Paris' },
  en: { text: '"Finally a site that actually verifies pet policies. No nasty surprises on arrival."', author: 'Claire M., London' },
  es: { text: '"Por fin un sitio que verifica las políticas reales. Sin sorpresas a la llegada."', author: 'Lucía M., Madrid' },
  pt: { text: '"Finalmente um site que verifica mesmo as políticas para animais. Sem surpresas desagradáveis à chegada."', author: 'Inês P., Lisboa' },
  de: { text: '"Endlich eine Seite, die die Haustierrichtlinien wirklich prüft. Keine bösen Überraschungen bei der Ankunft."', author: 'Anna K., Berlin' },
  nl: { text: '"Eindelijk een site die het huisdierenbeleid echt controleert. Geen nare verrassingen bij aankomst."', author: 'Lotte V., Amsterdam' },
  it: { text: '"Finalmente un sito che controlla davvero le politiche sugli animali. Nessuna brutta sorpresa all\'arrivo."', author: 'Giulia R., Roma' },
}

const TRUST: Record<string, string[]> = {
  fr: ['Gratuit · sans inscription', 'Politiques vérifiées', 'Booking.com'],
  en: ['Free · no sign-up', 'Verified policies', 'Booking.com'],
  es: ['Gratis · sin registro', 'Políticas verificadas', 'Booking.com'],
  pt: ['Grátis · sem registo', 'Políticas verificadas', 'Booking.com'],
  de: ['Kostenlos · ohne Anmeldung', 'Geprüfte Richtlinien', 'Booking.com'],
  nl: ['Gratis · geen aanmelding', 'Geverifieerd beleid', 'Booking.com'],
  it: ['Gratis · senza registrazione', 'Politiche verificate', 'Booking.com'],
}

function getCategoryName(cat: typeof categories[number] & { namePt?: string; nameDe?: string; nameNl?: string; nameIt?: string }, locale: Locale): string {
  if (locale === 'fr' && cat.nameFr) return cat.nameFr
  if (locale === 'es' && cat.nameEs) return cat.nameEs
  if (locale === 'pt' && cat.namePt) return cat.namePt
  if (locale === 'de' && cat.nameDe) return cat.nameDe
  if (locale === 'nl' && cat.nameNl) return cat.nameNl
  if (locale === 'it' && cat.nameIt) return cat.nameIt
  return cat.name
}

export default function Hero({ locale, dict }: HeroProps) {
  const router = useRouter()
  const { hero } = dict
  const [destQuery, setDestQuery] = useState('')
  const [destFocused, setDestFocused] = useState(false)
  const [selectedCat, setSelectedCat] = useState('')

  const destMatches = destQuery.trim()
    ? destinations
        .filter((d) => d.name.toLowerCase().includes(destQuery.trim().toLowerCase()))
        .slice(0, 8)
    : []

  const lang = locale === 'fr' || locale === 'es' || locale === 'pt' || locale === 'de' || locale === 'nl' || locale === 'it' ? locale : 'en'
  const headlines = HEADLINES[lang]
  const review = REVIEW[lang]
  const trust = TRUST[lang]

  const quickCats = QUICK_CATS
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter(Boolean) as typeof categories

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const match = matchDestination(destQuery)
    if (match && selectedCat) router.push(`/${locale}/${match.slug}/${selectedCat}`)
    else if (match) router.push(`/${locale}/destinations/${match.slug}`)
    else if (selectedCat) router.push(`/${locale}/categories/${selectedCat}`)
    else router.push(`/${locale}/destinations`)
  }

  function handleCityChip(name: string) {
    const match = matchDestination(name)
    if (match) router.push(`/${locale}/destinations/${match.slug}`)
  }

  const popularLabel =
    locale === 'fr' ? 'Destinations populaires' :
    locale === 'es' ? 'Destinos populares' :
    locale === 'pt' ? 'Destinos populares' :
    locale === 'de' ? 'Beliebte Reiseziele' :
    locale === 'nl' ? 'Populaire bestemmingen' :
    locale === 'it' ? 'Destinazioni popolari' : 'Popular'

  const filterLabel =
    locale === 'fr' ? 'Je voyage avec...' :
    locale === 'es' ? 'Viajo con...' :
    locale === 'pt' ? 'Viajo com...' :
    locale === 'de' ? 'Ich reise mit...' :
    locale === 'nl' ? 'Ik reis met...' :
    locale === 'it' ? 'Viaggio con...' : 'I\'m travelling with...'

  return (
    <section className="relative overflow-hidden bg-cream border-b-[1.6px] border-ink">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Gauche : copy ── */}
          <div>
            <span className="eyebrow inline-flex items-center gap-2 rounded-full px-4 py-2 mb-7 border-[1.6px] border-ink bg-lime text-ink">
              <span aria-hidden="true">🐾</span> {hero.badge}
            </span>

            <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[1.02] tracking-tight mb-6 text-ink">
              {headlines.line1}
              <br />
              <span className="hl">
                {headlines.line2}
              </span>
            </h1>

            <p className="text-lg text-slate leading-relaxed mb-9 max-w-md">
              {hero.subtitle}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-9 pb-9 border-b border-line">
              {[
                { value: hero.stat1Value, label: hero.stat1Label },
                { value: hero.stat2Value, label: hero.stat2Label },
                { value: hero.stat3Value, label: hero.stat3Label },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl font-bold text-ink leading-none">{s.value}</p>
                  <p className="eyebrow text-slate mt-2">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Review */}
            <div className="flex items-start gap-3 p-5 rounded-[22px] bg-lavender-soft border-[1.6px] border-ink">
              <span className="text-electric text-base flex-shrink-0 mt-0.5">★★★★★</span>
              <div>
                <p className="text-sm text-ink italic leading-relaxed">{review.text}</p>
                <p className="eyebrow text-slate mt-2">{review.author}</p>
              </div>
            </div>
          </div>

          {/* ── Droite : formulaire ── */}
          <div>
            <form onSubmit={handleSearch} className="bg-white rounded-[28px] shadow-hard border-[1.6px] border-ink p-7">

              <p className="eyebrow text-electric mb-5">
                {locale === 'fr' ? 'Trouvez votre séjour' : locale === 'es' ? 'Encuentra tu estancia' : locale === 'pt' ? 'Encontre a sua estadia' : locale === 'de' ? 'Finden Sie Ihren Aufenthalt' : locale === 'nl' ? 'Vind je verblijf' : locale === 'it' ? 'Trova il tuo soggiorno' : 'Find your stay'}
              </p>

              {/* Destination */}
              <div className="relative mb-3">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={destQuery}
                  onChange={(e) => setDestQuery(e.target.value)}
                  onFocus={() => setDestFocused(true)}
                  onBlur={() => setDestFocused(false)}
                  placeholder={hero.searchDestination}
                  className="w-full pl-11 pr-4 py-4 bg-cream border-[1.6px] border-ink text-ink placeholder-slate rounded-full text-sm outline-none focus:ring-2 focus:ring-electric transition"
                  autoComplete="off"
                  role="combobox"
                  aria-expanded={destFocused && destMatches.length > 0}
                  aria-autocomplete="list"
                />
                {destFocused && destMatches.length > 0 && (
                  <ul className="absolute left-0 right-0 top-full mt-1 z-20 max-h-64 overflow-auto rounded-[22px] border-[1.6px] border-ink bg-white shadow-hard py-1">
                    {destMatches.map((d) => (
                      <li key={d.slug}>
                        <button
                          type="button"
                          onMouseDown={(e) => { e.preventDefault(); setDestQuery(d.name); setDestFocused(false) }}
                          className="w-full text-left px-4 py-2.5 text-sm text-ink hover:bg-lavender-soft hover:text-electric transition-colors"
                        >
                          {d.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Category quick-pick pills */}
              <div className="mb-4">
                <p className="eyebrow text-slate mb-2.5">{filterLabel}</p>
                <div className="flex flex-wrap gap-2">
                  {quickCats.map((cat) => {
                    const isSelected = selectedCat === cat.slug
                    return (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={() => setSelectedCat(isSelected ? '' : cat.slug)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium border-[1.6px] transition-all duration-150 ${
                          isSelected
                            ? 'bg-ink text-white border-ink'
                            : 'bg-white text-ink border-ink hover:bg-lime'
                        }`}
                      >
                        <span>{cat.emoji}</span>
                        <span>{getCategoryName(cat, locale)}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full font-semibold py-4 rounded-full border-[1.6px] border-ink bg-lime text-ink text-sm tracking-wide transition-all duration-150 shadow-hard hover:bg-electric hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                {hero.cta} →
              </button>

              {/* Popular city chips */}
              <div className="mt-5">
                <p className="eyebrow text-slate mb-2">{popularLabel}</p>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_CITIES.map((city) => (
                    <button
                      key={city.name}
                      type="button"
                      onClick={() => handleCityChip(city.name)}
                      className="text-xs px-3 py-1.5 rounded-full border-[1.6px] border-ink bg-white text-ink hover:bg-lime transition-all duration-150"
                    >
                      {city.flag} {city.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trust */}
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-5 pt-5 border-t border-line">
                {trust.map((item) => (
                  <span key={item} className="text-xs text-slate flex items-center gap-1">
                    <span className="text-electric" aria-hidden="true">✓</span> {item}
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
