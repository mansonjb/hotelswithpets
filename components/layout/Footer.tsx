import Link from 'next/link'
import type { Locale } from '@/app/[locale]/dictionaries'

interface FooterProps {
  locale: Locale
  dict: {
    footer: {
      explore: string
      destinations: string
      categories: string
      company: string
      about: string
      disclosure: string
      privacy?: string
      disclosureText: string
      copyright: string
    }
  }
}

export default function Footer({ locale, dict }: FooterProps) {
  const { footer } = dict
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <span>🐾</span>
              <span>HotelsWithPets</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              {footer.disclosureText}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-semibold mb-4">{footer.explore}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/destinations`} className="hover:text-white transition-colors">{footer.destinations}</Link></li>
              <li><Link href={`/${locale}/categories`} className="hover:text-white transition-colors">{footer.categories}</Link></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {locale === 'fr' ? 'Populaires' : locale === 'es' ? 'Populares' : 'Popular'}
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Amsterdam', slug: 'amsterdam' },
                { name: 'Paris', slug: 'paris' },
                { name: 'Barcelona', slug: 'barcelona' },
                { name: 'Berlin', slug: 'berlin' },
                { name: 'Lisbon', slug: 'lisbon' },
                { name: 'Rome', slug: 'rome' },
              ].map((city) => (
                <li key={city.slug}>
                  <Link href={`/${locale}/destinations/${city.slug}`} className="hover:text-white transition-colors">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">{footer.company}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/about`} className="hover:text-white transition-colors">{footer.about}</Link></li>
              <li><Link href={`/${locale}/affiliate-disclosure`} className="hover:text-white transition-colors">{footer.disclosure}</Link></li>
              <li><Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">{footer.privacy ?? 'Privacy Policy'}</Link></li>
            </ul>
          </div>
        </div>

        {/* Country links */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
            {locale === 'fr' ? 'Par pays' : locale === 'es' ? 'Por país' : 'By country'}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {[
              { name: 'France', slug: 'france', flag: '🇫🇷' },
              { name: 'Spain', slug: 'spain', flag: '🇪🇸' },
              { name: 'Italy', slug: 'italy', flag: '🇮🇹' },
              { name: 'Germany', slug: 'germany', flag: '🇩🇪' },
              { name: 'Portugal', slug: 'portugal', flag: '🇵🇹' },
              { name: 'Belgium', slug: 'belgium', flag: '🇧🇪' },
              { name: 'Netherlands', slug: 'netherlands', flag: '🇳🇱' },
              { name: 'Austria', slug: 'austria', flag: '🇦🇹' },
            ].map((c) => (
              <Link
                key={c.slug}
                href={`/${locale}/countries/${c.slug}`}
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
              >
                <span>{c.flag}</span>
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 text-sm text-gray-500">
          {footer.copyright}
        </div>
      </div>
    </footer>
  )
}
