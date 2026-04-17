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

// Group destinations by country
function groupByCountry(destinations: Destination[]): Record<string, Destination[]> {
  return destinations.reduce<Record<string, Destination[]>>((acc, dest) => {
    if (!acc[dest.country]) acc[dest.country] = []
    acc[dest.country].push(dest)
    return acc
  }, {})
}

const destinations = destinationsData as Destination[]
const destinationsByCountry = groupByCountry(destinations)
const countryEntries = Object.entries(destinationsByCountry).sort(([a], [b]) => a.localeCompare(b))

export default function Header({ locale, dict }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileDestOpen, setMobileDestOpen] = useState(false)
  const pathname = usePathname()
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Replace locale segment in current URL to switch language while staying on same page
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
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                {dict.nav.destinations}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mega dropdown panel */}
              {dropdownOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] bg-white rounded-xl shadow-xl border border-gray-100 p-5"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Header row with link to all destinations */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Browse by destination
                    </span>
                    <Link
                      href={`/${locale}/destinations`}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      View all →
                    </Link>
                  </div>

                  {/* Country columns — 3-4 columns */}
                  <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                    {countryEntries.map(([country, cities]) => {
                      const flag = cities[0].flag
                      return (
                        <div key={country}>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            <span>{flag}</span>
                            <span>{country}</span>
                          </p>
                          <ul className="space-y-0.5">
                            {cities.map((dest) => (
                              <li key={dest.slug}>
                                <Link
                                  href={`/${locale}/destinations/${dest.slug}`}
                                  className="block text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md px-2 py-1 transition-colors"
                                  onClick={() => setDropdownOpen(false)}
                                >
                                  {dest.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
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
                      l === locale
                        ? 'font-bold text-gray-900'
                        : 'text-gray-500 hover:text-gray-900'
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

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white py-2 px-4 shadow-lg">
          <ul className="space-y-1">
            {/* Destinations accordion item */}
            <li>
              <button
                className="w-full flex items-center justify-between py-3 px-2 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setMobileDestOpen((o) => !o)}
                aria-expanded={mobileDestOpen}
              >
                <span>{dict.nav.destinations}</span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileDestOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileDestOpen && (
                <div className="pl-2 pb-2">
                  {/* Link to all destinations */}
                  <Link
                    href={`/${locale}/destinations`}
                    className="block py-2 px-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mb-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    All destinations →
                  </Link>

                  {countryEntries.map(([country, cities]) => {
                    const flag = cities[0].flag
                    return (
                      <div key={country} className="mb-3">
                        <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          {flag} {country}
                        </p>
                        <ul>
                          {cities.map((dest) => (
                            <li key={dest.slug}>
                              <Link
                                href={`/${locale}/destinations/${dest.slug}`}
                                className="block py-2 px-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                onClick={() => setMenuOpen(false)}
                              >
                                {dest.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
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
