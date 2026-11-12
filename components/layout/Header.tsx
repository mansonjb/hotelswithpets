'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/app/[locale]/dictionaries'
import destinationsData from '@/data/destinations.json'
import { getLocalizedCountryName } from '@/lib/countries'
import { getLocalizedCityName } from '@/lib/cityNames'
import { INSURANCE_SLUGS, isInsuranceSlug } from '@/lib/insuranceSlugs'
import PawLogo from '@/components/ui/PawLogo'
import { buttonClasses } from '@/components/ui/Button'

interface Destination {
  slug: string
  name: string
  country: string
  flag: string
}

interface HeaderProps {
  locale: Locale
  dict: {
    nav: { destinations: string; categories: string; about: string; countries?: string }
  }
}

const localeLabels: Record<Locale, string> = { en: 'EN', fr: 'FR', es: 'ES', pt: 'PT', de: 'DE', nl: 'NL', it: 'IT' }

const destinations = destinationsData as Destination[]

// Top 12 destinations (order = prominence in data)
const popularDests = destinations.slice(0, 12)

// All unique countries sorted, with flag
const countries = Array.from(
  destinations.reduce<Map<string, string>>((map, d) => {
    if (!map.has(d.country)) map.set(d.country, d.flag)
    return map
  }, new Map())
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([country, flag]) => ({
    country,
    flag,
    slug: country.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  }))

export default function Header({ locale, dict }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileDestOpen, setMobileDestOpen] = useState(false)
  const pathname = usePathname()
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Localized country labels, re-sorted alphabetically in the active language
  // (the URL slug stays the English-derived one).
  const localizedCountries = countries
    .map((c) => ({ ...c, label: getLocalizedCountryName(c.country, locale) }))
    .sort((a, b) => a.label.localeCompare(b.label, locale))

  const getLocaleHref = (newLocale: Locale) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    // The pet-insurance page has a localized slug per language, so map it
    // across instead of producing a 404 (e.g. /fr/assurance-animaux -> /en/pet-insurance).
    if (segments[2] && isInsuranceSlug(segments[2])) {
      segments[2] = INSURANCE_SLUGS[newLocale]
    }
    return segments.join('') === '' ? `/${newLocale}` : segments.join('/')
  }

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setDropdownOpen(true)
  }
  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150)
  }

  return (
    <header className="sticky top-0 z-50 bg-cream border-b-[1.6px] border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center"
            aria-label="HotelsWithPets"
            onClick={() => setMenuOpen(false)}
          >
            <PawLogo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">

            {/* Destinations dropdown */}
            <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button
                className="flex items-center gap-1 text-ink hover:text-electric text-sm font-medium transition-colors"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                {dict.nav.destinations}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Compact mega menu */}
              {dropdownOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[680px] max-w-[calc(100vw-2rem)] bg-white rounded-[22px] shadow-hard border-[1.6px] border-ink overflow-hidden"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex max-h-[70vh]">

                    {/* Left: Popular destinations */}
                    <div className="flex-1 p-5 border-r-[1.6px] border-ink overflow-y-auto">
                      <p className="eyebrow text-slate mb-3">
                        {locale === 'fr' ? 'Destinations populaires' : locale === 'es' ? 'Destinos populares' : locale === 'pt' ? 'Destinos populares' : locale === 'de' ? 'Beliebte Reiseziele' : locale === 'nl' ? 'Populaire bestemmingen' : locale === 'it' ? 'Destinazioni popolari' : 'Popular destinations'}
                      </p>
                      <div className="grid grid-cols-2 gap-1">
                        {popularDests.map((dest) => (
                          <Link
                            key={dest.slug}
                            href={`/${locale}/destinations/${dest.slug}`}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-lavender-soft hover:text-electric text-ink transition-colors group"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <span className="text-base">{dest.flag}</span>
                            <span className="text-sm font-medium leading-none">{getLocalizedCityName(dest.slug, dest.name, locale)}</span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href={`/${locale}/destinations`}
                        className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-electric hover:underline transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {locale === 'fr' ? `Voir les ${destinations.length} destinations →` : locale === 'es' ? `Ver ${destinations.length} destinos →` : locale === 'pt' ? `Ver os ${destinations.length} destinos →` : locale === 'de' ? `Alle ${destinations.length} Reiseziele →` : locale === 'nl' ? `Alle ${destinations.length} bestemmingen →` : locale === 'it' ? `Vedi tutte le ${destinations.length} destinazioni →` : `View all ${destinations.length} destinations →`}
                      </Link>
                      <div className="mt-4 pt-4 border-t border-line">
                        <p className="eyebrow text-slate mb-2">
                          {locale === 'fr' ? 'Guides pratiques' : locale === 'es' ? 'Guías prácticas' : locale === 'pt' ? 'Guias práticos' : locale === 'de' ? 'Praktische Ratgeber' : locale === 'nl' ? 'Praktische gidsen' : locale === 'it' ? 'Guide pratiche' : 'Practical guides'}
                        </p>
                        {[
                          { slug: 'passeport-animal', emoji: '📋', en: 'Pet passport by country', fr: 'Passeport animal par pays', es: 'Pasaporte mascota por país', pt: 'Passaporte de animal por país', de: 'Heimtierausweis nach Land', nl: 'Dierenpaspoort per land', it: 'Passaporto animale per paese' },
                          { slug: 'train-avec-chien', emoji: '🚂', en: 'Train travel with your dog', fr: 'Voyager en train avec son chien', es: 'Viajar en tren con tu perro', pt: 'Viajar de comboio com o seu cão', de: 'Mit dem Zug reisen mit Hund', nl: 'Met de trein reizen met je hond', it: 'Viaggiare in treno con il cane' },
                          { slug: 'avion-animal', emoji: '✈️', en: 'Flying with your pet', fr: 'Prendre l\'avion avec son animal', es: 'Volar con tu mascota', pt: 'Voar com o seu animal', de: 'Fliegen mit dem Haustier', nl: 'Vliegen met je huisdier', it: 'Volare con il tuo animale' },
                          { slug: 'road-trip-chien', emoji: '🚗', en: 'Road trip with your dog', fr: 'Road trip avec son chien', es: 'Road trip con tu perro', pt: 'Road trip com o seu cão', de: 'Roadtrip mit dem Hund', nl: 'Roadtrip met je hond', it: 'Road trip con il cane' },
                          { slug: 'hotel-pet-friendly', emoji: '🏨', en: 'Choosing a pet-friendly hotel', fr: 'Choisir un hôtel pet-friendly', es: 'Elegir un hotel pet-friendly', pt: 'Escolher um hotel pet-friendly', de: 'Ein tierfreundliches Hotel wählen', nl: 'Een diervriendelijk hotel kiezen', it: 'Scegliere un hotel pet-friendly' },
                        ].map((g) => (
                          <Link
                            key={g.slug}
                            href={`/${locale}/guides/${g.slug}`}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-lavender-soft hover:text-electric text-ink transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <span className="text-base">{g.emoji}</span>
                            <span className="text-sm font-medium leading-tight">
                              {locale === 'fr' ? g.fr : locale === 'es' ? g.es : locale === 'pt' ? g.pt : locale === 'de' ? g.de : locale === 'nl' ? g.nl : locale === 'it' ? g.it : g.en}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Right: Browse by country */}
                    <div className="w-52 p-5 bg-lavender-soft overflow-y-auto">
                      <p className="eyebrow text-slate mb-3">
                        {locale === 'fr' ? 'Par pays' : locale === 'es' ? 'Por país' : locale === 'pt' ? 'Por país' : locale === 'de' ? 'Nach Land' : locale === 'nl' ? 'Per land' : locale === 'it' ? 'Per paese' : 'By country'}
                      </p>
                      <ul className="space-y-0.5">
                        {localizedCountries.map(({ country, flag, slug, label }) => (
                          <li key={country}>
                            <Link
                              href={`/${locale}/countries/${slug}`}
                              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white text-ink hover:text-electric transition-all text-sm"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <span className="text-sm">{flag}</span>
                              <span>{label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href={`/${locale}/categories`} className="text-ink hover:text-electric text-sm font-medium transition-colors">
              {dict.nav.categories}
            </Link>
            <Link href={`/${locale}/countries`} className="text-ink hover:text-electric text-sm font-medium transition-colors">
              {dict.nav.countries ?? 'Countries'}
            </Link>
            <Link href={`/${locale}/guides`} className="text-ink hover:text-electric text-sm font-medium transition-colors">
              {locale === 'fr' ? 'Guides' : locale === 'es' ? 'Guías' : locale === 'pt' ? 'Guias' : locale === 'de' ? 'Ratgeber' : locale === 'nl' ? 'Gidsen' : locale === 'it' ? 'Guide' : 'Guides'}
            </Link>
            <Link href={`/${locale}/about`} className="text-ink hover:text-electric text-sm font-medium transition-colors">
              {dict.nav.about}
            </Link>
            <Link href={`/${locale}/contact`} className={buttonClasses('dark', 'md')}>
              {locale === 'fr' ? 'Contact' : locale === 'es' ? 'Contacto' : locale === 'pt' ? 'Contacto' : locale === 'de' ? 'Kontakt' : locale === 'nl' ? 'Contact' : locale === 'it' ? 'Contatti' : 'Contact'}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Locale switcher (desktop; mobile lives in the hamburger menu) */}
            <div className="hidden md:flex items-center gap-1 text-xs font-mono">
              {(Object.keys(localeLabels) as Locale[]).map((l, i) => (
                <span key={l} className="flex items-center">
                  {i > 0 && <span className="text-slate/50 mx-0.5" aria-hidden="true">/</span>}
                  <Link
                    href={getLocaleHref(l)}
                    className={`px-1 py-0.5 rounded-full transition-colors ${
                      l === locale ? 'font-bold text-white bg-ink rounded-full px-2' : 'text-slate hover:text-ink'
                    }`}
                  >
                    {localeLabels[l]}
                  </Link>
                </span>
              ))}
            </div>

            {/* Hamburger, mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 rounded-full border-[1.6px] border-ink bg-white"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={locale === 'fr' ? 'Ouvrir le menu' : locale === 'es' ? 'Abrir el menú' : locale === 'pt' ? 'Abrir o menu' : locale === 'de' ? 'Menü öffnen' : locale === 'nl' ? 'Menu openen' : locale === 'it' ? 'Apri il menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={`block h-0.5 w-5 bg-ink transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-5 bg-ink transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-5 bg-ink transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden border-t-[1.6px] border-ink bg-cream py-2 px-4">
          <ul className="space-y-1">
            <li>
              <button
                className="w-full flex items-center justify-between py-3 px-2 text-ink font-medium rounded-xl hover:bg-lavender-soft transition-colors"
                onClick={() => setMobileDestOpen((o) => !o)}
                aria-expanded={mobileDestOpen}
              >
                <span>{dict.nav.destinations}</span>
                <svg
                  className={`w-4 h-4 text-slate transition-transform duration-200 ${mobileDestOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileDestOpen && (
                <div className="pl-2 pb-2">
                  <Link
                    href={`/${locale}/destinations`}
                    className="block py-2 px-3 text-sm font-semibold text-electric hover:bg-lavender-soft rounded-xl transition-colors mb-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    {locale === 'fr' ? 'Toutes les destinations →' : locale === 'es' ? 'Todos los destinos →' : locale === 'pt' ? 'Todos os destinos →' : locale === 'de' ? 'Alle Reiseziele →' : locale === 'nl' ? 'Alle bestemmingen →' : locale === 'it' ? 'Tutte le destinazioni →' : 'All destinations →'}
                  </Link>
                  <div className="grid grid-cols-2 gap-1">
                    {popularDests.map((dest) => (
                      <Link
                        key={dest.slug}
                        href={`/${locale}/destinations/${dest.slug}`}
                        className="flex items-center gap-1.5 py-2 px-3 text-sm text-ink hover:bg-lavender-soft rounded-xl transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span>{dest.flag}</span>
                        <span>{getLocalizedCityName(dest.slug, dest.name, locale)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {[
              { href: `/${locale}/categories`, label: dict.nav.categories },
              { href: `/${locale}/countries`, label: dict.nav.countries ?? 'Countries' },
              { href: `/${locale}/about`, label: dict.nav.about },
              { href: `/${locale}/contact`, label: locale === 'fr' ? 'Contact' : locale === 'es' ? 'Contacto' : locale === 'pt' ? 'Contacto' : locale === 'de' ? 'Kontakt' : locale === 'nl' ? 'Contact' : locale === 'it' ? 'Contatti' : 'Contact' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block py-3 px-2 text-ink font-medium rounded-xl hover:bg-lavender-soft transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}

            {/* Language switcher (mobile) */}
            <li className="mt-2 pt-3 border-t border-line">
              <div className="flex flex-wrap gap-2 px-2">
                {(Object.keys(localeLabels) as Locale[]).map((l) => (
                  <Link
                    key={l}
                    href={getLocaleHref(l)}
                    onClick={() => setMenuOpen(false)}
                    aria-current={l === locale ? 'true' : undefined}
                    className={`px-3 py-2 rounded-full text-sm font-mono font-medium transition-colors ${
                      l === locale
                        ? 'bg-ink text-white'
                        : 'bg-white border border-ink text-ink hover:bg-lime'
                    }`}
                  >
                    {localeLabels[l]}
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
