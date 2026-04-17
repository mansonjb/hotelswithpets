import Link from 'next/link'
import categories from '@/data/categories.json'
import hotels from '@/data/hotels.json'
import destinations from '@/data/destinations.json'
import type { Locale } from '@/app/[locale]/dictionaries'

interface CategoryGridProps {
  locale: Locale
  dict: {
    categories: { browseBy: string; browseTitle: string; subtitle: string; explore: string }
  }
}

function getCategoryName(cat: typeof categories[number], locale: Locale): string {
  if (locale === 'fr' && cat.nameFr) return cat.nameFr
  if (locale === 'es' && cat.nameEs) return cat.nameEs
  return cat.name
}

function getCategoryDesc(cat: typeof categories[number], locale: Locale): string {
  if (locale === 'fr' && cat.descriptionFr) return cat.descriptionFr
  if (locale === 'es' && cat.descriptionEs) return cat.descriptionEs
  return cat.description
}

// Compute top 3 city names per category
function getTopCities(catSlug: string, count = 3): string[] {
  const tally: Record<string, number> = {}
  hotels.forEach((h) => {
    if (h.categories.includes(catSlug)) {
      tally[h.destinationSlug] = (tally[h.destinationSlug] ?? 0) + 1
    }
  })
  return Object.entries(tally)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([slug]) => destinations.find((d) => d.slug === slug)?.name ?? slug)
}

export default function CategoryGrid({ locale, dict }: CategoryGridProps) {
  const activeCats = categories.filter((c) => c.cityCount > 0)
  const [featured, ...rest] = activeCats

  const citiesLabel = locale === 'fr' ? 'villes' : locale === 'es' ? 'ciudades' : 'cities'

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-3">
              {dict.categories.browseBy}
            </p>
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {dict.categories.browseTitle}
              </span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-xs sm:text-right">
            {dict.categories.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Featured card — spans 2 rows */}
          {(() => {
            const topCities = getTopCities(featured.slug, 4)
            return (
              <Link
                href={`/${locale}/categories/${featured.slug}`}
                className="group lg:row-span-2 relative overflow-hidden rounded-3xl min-h-[300px] lg:min-h-0 flex flex-col justify-end p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${featured.gradient}`} />
                <div className="absolute top-6 right-6 text-[100px] opacity-15 group-hover:opacity-25 transition-opacity duration-500 select-none leading-none">
                  {featured.emoji}
                </div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />

                <div className="relative">
                  <span className="text-5xl mb-5 block">{featured.emoji}</span>
                  <h3 className="text-white font-extrabold text-2xl leading-tight mb-2">
                    {getCategoryName(featured, locale)}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-4">
                    {getCategoryDesc(featured, locale)}
                  </p>
                  {/* City chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {topCities.map((city) => (
                      <span key={city} className="text-white/80 text-xs bg-white/15 px-2.5 py-1 rounded-full font-medium">
                        {city}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 bg-white/15 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full">
                      📍 {featured.cityCount} {citiesLabel}
                    </span>
                    <span className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-200 text-lg">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            )
          })()}

          {/* Smaller cards */}
          {rest.map((cat) => {
            const topCities = getTopCities(cat.slug, 3)
            return (
              <Link
                key={cat.slug}
                href={`/${locale}/categories/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between p-6 min-h-[160px]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-95`} />
                <div className="absolute bottom-0 right-0 text-[72px] opacity-10 group-hover:opacity-20 transition-opacity duration-300 select-none leading-none pb-1 pr-2">
                  {cat.emoji}
                </div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-200" />

                <div className="relative flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{cat.emoji}</span>
                  <div className="min-w-0">
                    <h3 className="text-white font-bold text-sm leading-tight">
                      {getCategoryName(cat, locale)}
                    </h3>
                    <p className="text-white/60 text-xs mt-0.5">
                      {cat.cityCount} {citiesLabel}
                    </p>
                  </div>
                </div>

                {/* City hints */}
                <div className="relative mt-2 flex flex-wrap gap-1">
                  {topCities.map((city) => (
                    <span key={city} className="text-white/70 text-[10px] bg-white/10 px-2 py-0.5 rounded-full">
                      {city}
                    </span>
                  ))}
                </div>

                <div className="relative flex items-center justify-between mt-3">
                  <span className="text-white/70 text-xs group-hover:text-white transition-colors">
                    {dict.categories.explore}
                  </span>
                  <span className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-200 text-sm">
                    →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
