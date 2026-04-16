'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/app/[locale]/dictionaries'

interface HeaderProps {
  locale: Locale
  dict: {
    nav: { destinations: string; categories: string; about: string }
  }
}

const localeLabels: Record<Locale, string> = { en: 'EN', fr: 'FR', es: 'ES' }

export default function Header({ locale, dict }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

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
            <Link href={`/${locale}/destinations`} className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              {dict.nav.destinations}
            </Link>
            <Link href={`/${locale}/categories`} className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              {dict.nav.categories}
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
                    href={`/${l}`}
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
            {[
              { href: `/${locale}/destinations`, label: dict.nav.destinations },
              { href: `/${locale}/categories`, label: dict.nav.categories },
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
