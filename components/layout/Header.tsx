'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/app/[locale]/dictionaries'
import destinationsData from '@/data/destinations.json'

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

const localeLabels: Record<Locale, string> = { en: 'EN', fr: 'FR', es: 'ES' }

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

  const getLocaleHref = (newLocale: Locale) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 font-bold text-xl text-gray-900"
            onClick={() => setMenuOpen(false)}
          >
            <span>🐾</span>
            <span>HotelsWithPets</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">

            {/* Destinations dropdown */}
            <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
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
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex max-h-[70vh]">

                    {/* Left: Popular destinations */}
                    <div className="flex-1 p-5 border-r border-gray-100 overflow-y-auto">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                        {locale === 'fr' ? 'Destinations populaires' : locale === 'es' ? 'Destinos populares' : 'Popular destinations'}
                      </p>
                      <div className="grid grid-cols-2 gap-1">
                        {popularDests.map((dest) => (
                          <Link
                            key={dest.slug}
                            href={`/${locale}/destinations/${dest.slug}`}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-700 text-gray-700 transition-colors group"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <span className="text-base">{dest.flag}</span>
                            <span className="text-sm font-medium leading-none">{dest.name}</span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href={`/${locale}/destinations`}
                        className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {locale === 'fr' ? `Voir les ${destinations.length} destinations →` : locale === 'es' ? `Ver ${destinations.length} destinos →` : `View all ${destinations.length} destinations →`}
                      </Link>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                          {locale === 'fr' ? 'Guides pratiques' : locale === 'es' ? 'Guías prácticas' : 'Practical guides'}
                        </p>
                        <Link
                          href={`/${locale}/guides`}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-amber-50 hover:text-amber-700 text-gray-600 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <span className="text-base">📋</span>
                          <span className="text-sm font-medium leading-tight">
                            {locale === 'fr' ? 'Passeport animal par pays' : locale === 'es' ? 'Pasaporte mascota por país' : 'Pet passport by country'}
                          </span>
                        </Link>
                      </div>
                    </div>

                    {/* Right: Browse by country */}
                    <div className="w-52 p-5 bg-gray-50/60 overflow-y-auto">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                        {locale === 'fr' ? 'Par pays' : locale === 'es' ? 'Por país' : 'By country'}
                      </p>
                      <ul className="space-y-0.5">
                        {countries.map(({ country, flag, slug }) => (
                          <li key={country}>
                            <Link
                              href={`/${locale}/countries/${slug}`}
                              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white hover:shadow-sm text-gray-600 hover:text-gray-900 transition-all text-sm"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <span className="text-sm">{flag}</span>
                              <span>{country}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href={`/${locale}/categories`} className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              {dict.nav.categories}
            </Link>
            <Link href={`/${locale}/countries`} className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              {dict.nav.countries ?? 'Countries'}
            </Link>
            <Link href={`/${locale}/guides`} className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              {locale === 'fr' ? 'Guides' : locale === 'es' ? 'Guías' : 'Guides'}
            </Link>
            <Link href={`/${locale}/about`} className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              {dict.nav.about}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Locale switcher */}
            <div className="flex items-center gap-1 text-sm">
              {(Object.keys(localeLabels) as Locale[]).map((l, i) => (
                <span key={l} className="flex items-center">
                  {i > 0 && <span className="text-gray-300 mx-1">|</span>}
                  <Link
                    href={getLocaleHref(l)}
                    className={`px-1 py-0.5 rounded transition-colors ${
                      l === locale ? 'font-bold text-gray-900' : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {localeLabels[l]}
                  </Link>
                </span>
              ))}
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className={`block h-0.5 w-5 bg-gray-700 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-5 bg-gray-700 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-5 bg-gray-700 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white py-2 px-4 shadow-lg">
          <ul className="space-y-1">
            <li>
              <button
                className="w-full flex items-center justify-between py-3 px-2 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setMobileDestOpen((o) => !o)}
                aria-expanded={mobileDestOpen}
              >
                <span>{dict.nav.destinations}</span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileDestOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileDestOpen && (
                <div className="pl-2 pb-2">
                  <Link
                    href={`/${locale}/destinations`}
                    className="block py-2 px-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mb-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    {locale === 'fr' ? 'Toutes les destinations →' : locale === 'es' ? 'Todos los destinos →' : 'All destinations →'}
                  </Link>
                  <div className="grid grid-cols-2 gap-1">
                    {popularDests.map((dest) => (
                      <Link
                        key={dest.slug}
                        href={`/${locale}/destinations/${dest.slug}`}
                        className="flex items-center gap-1.5 py-2 px-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span>{dest.flag}</span>
                        <span>{dest.name}</span>
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
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block py-3 px-2 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
