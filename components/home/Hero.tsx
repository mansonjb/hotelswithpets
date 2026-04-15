import Link from 'next/link'
import type { Locale } from '@/app/[locale]/dictionaries'

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
    }
  }
}

export default function Hero({ locale, dict }: HeroProps) {
  const { hero } = dict
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            {hero.badge}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">
            {hero.subtitle}
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-2xl max-w-2xl mx-auto">
            <input
              type="text"
              placeholder={hero.searchDestination}
              className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-400 rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-4 py-3 text-gray-600 rounded-xl outline-none text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500">
              <option value="">{hero.searchCategory}</option>
              <option value="dog-friendly">Dog-friendly</option>
              <option value="cat-friendly">Cat-friendly</option>
              <option value="beach-access">Beach Access</option>
              <option value="near-parks">Near Parks</option>
              <option value="luxury">Luxury</option>
              <option value="dogs-stay-free">Dogs Stay Free</option>
            </select>
            <Link
              href={`/${locale}/destinations`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap"
            >
              {hero.cta}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">50+</span>
              <span>Destinations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">6</span>
              <span>Pet categories</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">100%</span>
              <span>Free to use</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
