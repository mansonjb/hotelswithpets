import Link from 'next/link'
import categories from '@/data/categories.json'
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

export default function CategoryGrid({ locale, dict }: CategoryGridProps) {
  const [featured, ...rest] = categories

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {dict.categories.browseBy}<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {dict.categories.browseTitle}
            </span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xs text-right hidden md:block">
            {dict.categories.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Featured — spans 2 rows */}
          <Link
            href={`/${locale}/categories/${featured.slug}`}
            className="group lg:row-span-2 relative overflow-hidden rounded-3xl min-h-[280px] lg:min-h-0 flex flex-col justify-end p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${featured.gradient}`} />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
            {/* Big emoji */}
            <div className="absolute top-8 right-8 text-7xl opacity-30 group-hover:opacity-50 transition-opacity select-none">
              {featured.emoji}
            </div>
            <div className="relative">
              <span className="text-4xl mb-4 block">{featured.emoji}</span>
              <h3 className="text-white font-extrabold text-2xl leading-tight mb-2">
                {getCategoryName(featured, locale)}
              </h3>
              <p className="text-white/70 text-sm mb-4">{featured.cityCount} cities</p>
              <p className="text-white/80 text-sm leading-relaxed mb-6">{featured.description}</p>
              <span className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors">
                {dict.categories.explore}
              </span>
            </div>
          </Link>

          {/* 5 smaller cards in 2-col grid */}
          {rest.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${locale}/categories/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between p-6 min-h-[130px]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-90`} />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
              <div className="absolute bottom-0 right-0 text-6xl opacity-20 group-hover:opacity-30 transition-opacity select-none leading-none pb-2 pr-3">
                {cat.emoji}
              </div>
              <div className="relative flex items-start gap-3">
                <span className="text-2xl">{cat.emoji}</span>
                <div>
                  <h3 className="text-white font-bold text-base leading-tight">
                    {getCategoryName(cat, locale)}
                  </h3>
                  <p className="text-white/70 text-xs mt-0.5">{cat.cityCount} cities</p>
                </div>
              </div>
              <span className="relative text-white/80 text-xs font-medium group-hover:text-white transition-colors">
                {dict.categories.explore}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
