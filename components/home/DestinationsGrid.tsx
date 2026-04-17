import Link from 'next/link'
import destinations from '@/data/destinations.json'
import hotels from '@/data/hotels.json'
import type { Locale } from '@/app/[locale]/dictionaries'

function getMinPrice(destSlug: string): number | null {
  const prices = hotels
    .filter((h) => h.destinationSlug === destSlug && h.priceFrom > 0)
    .map((h) => h.priceFrom)
  return prices.length > 0 ? Math.min(...prices) : null
}

interface DestinationsGridProps {
  locale: Locale
  dict: {
    destinations: { title: string; cta: string; viewAll: string }
  }
}

const gradients = [
  'from-blue-600 to-cyan-500',
  'from-violet-600 to-purple-500',
  'from-rose-500 to-pink-500',
  'from-amber-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-indigo-600 to-blue-500',
]

export default function DestinationsGrid({ locale, dict }: DestinationsGridProps) {
  const { destinations: d } = dict
  const [hero, second, third, ...smalls] = destinations

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">
            {d.title}
          </h2>
          <Link href={`/${locale}/destinations`} className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors">
            {d.viewAll}
          </Link>
        </div>

        {/* Mosaic layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[160px]">

          {/* Hero card — 2 cols, 2 rows */}
          <Link
            href={`/${locale}/destinations/${hero.slug}`}
            className={`col-span-2 row-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradients[0]} flex flex-col justify-end p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute top-6 right-6 text-6xl opacity-30 group-hover:opacity-50 transition-opacity select-none">
              {hero.flag}
            </div>
            <div className="relative">
              <span className="text-5xl mb-3 block">{hero.flag}</span>
              <h3 className="text-white font-extrabold text-2xl mb-1">{hero.name}</h3>
              <p className="text-white/70 text-sm mb-1">
                {hero.country} · {hero.categoryCount} categories
                {getMinPrice(hero.slug) ? ` · from €${getMinPrice(hero.slug)}/night` : ''}
              </p>
              <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">{hero.intro}</p>
              <span className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors">
                {d.cta} →
              </span>
            </div>
          </Link>

          {/* Second card — 2 cols, 1 row */}
          {[second, third].map((dest, i) => (
            <Link
              key={dest.slug}
              href={`/${locale}/destinations/${dest.slug}`}
              className={`col-span-1 lg:col-span-1 group relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradients[i + 1]} flex flex-col justify-end p-5 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1`}
            >
              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />
              <div className="absolute top-3 right-4 text-4xl opacity-25 select-none">{dest.flag}</div>
              <div className="relative">
                <span className="text-2xl mb-1 block">{dest.flag}</span>
                <h3 className="text-white font-bold text-base leading-tight">{dest.name}</h3>
                <p className="text-white/60 text-xs">{dest.categoryCount} categories</p>
              </div>
            </Link>
          ))}

          {/* Small cards — 1 col, 1 row each */}
          {smalls.map((dest, i) => (
            <Link
              key={dest.slug}
              href={`/${locale}/destinations/${dest.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradients[i + 3]} flex flex-col justify-end p-4 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5`}
            >
              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />
              <div className="absolute top-2 right-3 text-3xl opacity-20 select-none">{dest.flag}</div>
              <div className="relative">
                <span className="text-xl mb-0.5 block">{dest.flag}</span>
                <h3 className="text-white font-bold text-sm leading-tight">{dest.name}</h3>
                <p className="text-white/60 text-xs">{dest.categoryCount} cat.</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
