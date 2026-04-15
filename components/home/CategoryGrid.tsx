import Link from 'next/link'
import categories from '@/data/categories.json'
import type { Locale } from '@/app/[locale]/dictionaries'

interface CategoryGridProps {
  locale: Locale
  dict: {
    categories: { title: string; explore: string }
  }
}

function getCategoryName(cat: typeof categories[number], locale: Locale): string {
  if (locale === 'fr' && cat.nameFr) return cat.nameFr
  if (locale === 'es' && cat.nameEs) return cat.nameEs
  return cat.name
}

export default function CategoryGrid({ locale, dict }: CategoryGridProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          {dict.categories.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${locale}/categories/${cat.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              {/* Gradient header */}
              <div className={`bg-gradient-to-r ${cat.gradient} px-6 py-5 flex items-center gap-3`}>
                <span className="text-3xl">{cat.emoji}</span>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">{getCategoryName(cat, locale)}</h3>
                  <p className="text-white/80 text-sm">{cat.cityCount} cities</p>
                </div>
              </div>
              {/* Body */}
              <div className="px-6 py-4 flex items-center justify-between">
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
                <span className="ml-4 text-blue-600 font-medium text-sm whitespace-nowrap group-hover:underline">
                  {dict.categories.explore}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
