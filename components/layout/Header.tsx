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
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-xl text-gray-900">
            <span>🐾</span>
            <span>HotelsWithPets</span>
          </Link>

          {/* Nav */}
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
        </div>
      </div>
    </header>
  )
}
