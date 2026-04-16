import Link from 'next/link'
import type { Metadata } from 'next'
import { getDictionary, hasLocale, locales, type Locale } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import categories from '@/data/categories.json'
import { SITE_URL } from '@/lib/site'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps<'/[locale]/categories'>): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const dict = await getDictionary(locale as Locale)
  return {
    title: `${dict.pages.categories.title} | HotelsWithPets.com`,
    description: dict.pages.categories.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${locale}/categories`,
      languages: {
        en: `${SITE_URL}/en/categories`,
        fr: `${SITE_URL}/fr/categories`,
        es: `${SITE_URL}/es/categories`,
        'x-default': `${SITE_URL}/en/categories`,
      },
    },
  }
}

function getCategoryName(cat: typeof categories[number], locale: Locale): string {
  if (locale === 'fr' && cat.nameFr) return cat.nameFr
  if (locale === 'es' && cat.nameEs) return cat.nameEs
  return cat.name
}

export default async function CategoriesPage({ params }: PageProps<'/[locale]/categories'>) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const dict = await getDictionary(locale as Locale)
  const p = dict.pages.categories

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">{p.title}</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">{p.subtitle}</p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.filter((cat) => cat.cityCount > 0).map((cat) => (
              <Link
                key={cat.slug}
                href={`/${locale}/categories/${cat.slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.gradient} p-8 min-h-[200px] flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1`}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="absolute -right-4 -bottom-4 text-9xl opacity-10 select-none leading-none">
                  {cat.emoji}
                </div>
                <div className="relative">
                  <span className="text-4xl block mb-3">{cat.emoji}</span>
                  <h2 className="text-white font-bold text-xl leading-tight mb-1">
                    {getCategoryName(cat, locale as Locale)}
                  </h2>
                  <p className="text-white/70 text-sm">{cat.cityCount} {p.destinations}</p>
                </div>
                <div className="relative mt-4">
                  <p className="text-white/80 text-sm leading-relaxed mb-4">{cat.description}</p>
                  <span className="inline-flex items-center gap-1 text-white text-sm font-semibold group-hover:gap-2 transition-all">
                    {dict.pages.category.explore}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
