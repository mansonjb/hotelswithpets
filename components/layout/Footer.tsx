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
            <h3 className="text-white font-semibold mb-4">Popular</h3>
            <ul className="space-y-2 text-sm">
              {['Amsterdam', 'Paris', 'Barcelona', 'Berlin'].map((city) => (
                <li key={city}>
                  <Link href={`/${locale}/destinations/${city.toLowerCase()}`} className="hover:text-white transition-colors">
                    {city}
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
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-gray-500">
          {footer.copyright}
        </div>
      </div>
    </footer>
  )
}
