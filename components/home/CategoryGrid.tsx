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

function getTopCities(catSlug: string, count = 3): string[] {
  const tally: Record<string, number> = {}
  hotels.forEach((h) => {
    if (h.categories.includes(catSlug)) tally[h.destinationSlug] = (tally[h.destinationSlug] ?? 0) + 1
  })
  return Object.entries(tally)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([slug]) => destinations.find((d) => d.slug === slug)?.name ?? slug)
}

const INTRO: Record<string, string> = {
  fr: 'Chaque hôtel sur HotelsWithPets a une politique animaux vérifiée. Mais tous ne sont pas adaptés à votre situation. Filtrez pour trouver exactement ce qu\'il vous faut.',
  en: 'Every hotel on HotelsWithPets has a verified pet policy. But not every hotel suits every trip. Filter to find exactly what you need.',
  es: 'Todos los hoteles en HotelsWithPets tienen una política de mascotas verificada. Pero no todos se adaptan a tu situación. Filtra para encontrar exactamente lo que necesitas.',
}

const PROMISE: Record<string, { title: string; items: string[] }> = {
  fr: {
    title: 'Notre engagement',
    items: ['Politique animaux vérifiée à la source', 'Prix directs Booking.com', 'Aucun frais caché', 'Mis à jour régulièrement'],
  },
  en: {
    title: 'Our commitment',
    items: ['Pet policy verified at source', 'Direct Booking.com prices', 'No hidden fees', 'Regularly updated'],
  },
  es: {
    title: 'Nuestro compromiso',
    items: ['Política verificada en la fuente', 'Precios directos Booking.com', 'Sin cargos ocultos', 'Actualizado regularmente'],
  },
}

export default function CategoryGrid({ locale, dict }: CategoryGridProps) {
  const activeCats = categories.filter((c) => c.cityCount > 0)
  const featured = activeCats.slice(0, 3)
  const rest = activeCats.slice(3)

  const lang = locale === 'fr' || locale === 'es' ? locale : 'en'
  const intro = INTRO[lang]
  const promise = PROMISE[lang]
  const citiesLabel = locale === 'fr' ? 'villes' : locale === 'es' ? 'ciudades' : 'cities'
  const hotelsLabel = locale === 'fr' ? 'hôtels' : locale === 'es' ? 'hoteles' : 'hotels'

  const seeAllLabel =
    locale === 'fr' ? `Voir toutes les catégories →` :
    locale === 'es' ? `Ver todas las categorías →` :
    `View all categories →`

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3">
              {dict.categories.browseBy}
            </p>
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight max-w-lg">
              {dict.categories.browseTitle}
            </h2>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm lg:text-right lg:pb-1">
            {intro}
          </p>
        </div>

        {/* Featured 3 — large editorial rows */}
        <div className="space-y-4 mb-10">
          {featured.map((cat, i) => {
            const topCities = getTopCities(cat.slug, 4)
            const hotelCount = hotels.filter((h) => h.categories.includes(cat.slug)).length
            return (
              <Link
                key={cat.slug}
                href={`/${locale}/categories/${cat.slug}`}
                className="group flex items-center gap-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-6 overflow-hidden relative"
              >
                {/* Large faded number */}
                <span
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-[6rem] font-black leading-none select-none pointer-events-none transition-opacity duration-200"
                  style={{ color: 'rgba(0,0,0,0.04)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Emoji + gradient dot */}
                <div className={`relative flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-gradient-to-br ${cat.gradient} shadow-md`}>
                  {cat.emoji}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-1">
                    <h3 className="font-extrabold text-gray-900 text-lg group-hover:text-blue-700 transition-colors leading-tight">
                      {getCategoryName(cat, locale)}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3 max-w-md">
                    {getCategoryDesc(cat, locale)}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="text-xs text-gray-400">{cat.cityCount} {citiesLabel} · {hotelCount} {hotelsLabel}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {topCities.map((city) => (
                        <span key={city} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{city}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <span className="flex-shrink-0 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200 text-xl">→</span>
              </Link>
            )
          })}
        </div>

        {/* Remaining categories — compact grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
          {rest.map((cat) => {
            const hotelCount = hotels.filter((h) => h.categories.includes(cat.slug)).length
            return (
              <Link
                key={cat.slug}
                href={`/${locale}/categories/${cat.slug}`}
                className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-4 flex items-center gap-3"
              >
                <span className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-lg bg-gradient-to-br ${cat.gradient}`}>
                  {cat.emoji}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors leading-tight truncate">
                    {getCategoryName(cat, locale)}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{hotelCount} {hotelsLabel}</p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* See all link */}
        <div className="text-center mb-10">
          <Link
            href={`/${locale}/categories`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-white border border-gray-200 hover:border-blue-300 px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200"
          >
            {seeAllLabel}
          </Link>
        </div>

        {/* Promise strip */}
        <div className="bg-white rounded-2xl border border-gray-100 px-6 py-4 flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex-shrink-0">{promise.title}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {promise.items.map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-sm text-gray-600">
                <span className="text-emerald-500 font-bold">✓</span>
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
