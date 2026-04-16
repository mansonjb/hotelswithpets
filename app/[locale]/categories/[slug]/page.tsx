import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale, locales, type Locale } from '@/app/[locale]/dictionaries'
import categories from '@/data/categories.json'
import destinations from '@/data/destinations.json'
import hotels from '@/data/hotels.json'

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps<'/[locale]/categories/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(locale)) return {}
  const cat = categories.find((c) => c.slug === slug)
  if (!cat) return {}
  return {
    title: `${cat.name} hotels in Europe | HotelsWithPets.com`,
    description: `${cat.description} Browse ${cat.cityCount}+ destinations and find the perfect stay for you and your pet.`,
  }
}

function getCategoryName(cat: typeof categories[number], locale: Locale): string {
  if (locale === 'fr' && cat.nameFr) return cat.nameFr
  if (locale === 'es' && cat.nameEs) return cat.nameEs
  return cat.name
}

const destGradients = [
  'from-blue-600 to-cyan-500',
  'from-violet-600 to-purple-500',
  'from-rose-500 to-pink-500',
  'from-amber-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-indigo-600 to-blue-500',
]

export default async function CategoryPage({ params }: PageProps<'/[locale]/categories/[slug]'>) {
  const { locale, slug } = await params
  if (!hasLocale(locale)) notFound()

  const cat = categories.find((c) => c.slug === slug)
  if (!cat) notFound()

  const dict = await getDictionary(locale as Locale)
  const p = dict.pages

  // Find destinations that have hotels in this category
  const destSlugs = new Set(
    hotels.filter((h) => h.categories.includes(slug)).map((h) => h.destinationSlug)
  )
  const availableDestinations = destinations.filter((d) => destSlugs.has(d.slug))

  const catName = getCategoryName(cat, locale as Locale)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className={`bg-gradient-to-br ${cat.gradient} text-white py-20 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute right-0 top-0 bottom-0 w-64 text-[16rem] opacity-5 flex items-center justify-center select-none">
          {cat.emoji}
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href={`/${locale}/categories`} className="text-white/70 hover:text-white text-sm transition-colors">
              {dict.pages.category.back}
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-6xl lg:text-8xl filter drop-shadow-lg">{cat.emoji}</span>
            <div>
              <h1 className="text-4xl lg:text-6xl font-extrabold mb-2">{catName}</h1>
              <p className="text-white/80 text-lg">{cat.cityCount} {p.categories.destinations}</p>
              <p className="text-white/70 text-base mt-2 max-w-2xl">{cat.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
            {p.category.destinationsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableDestinations.map((dest, i) => (
              <Link
                key={dest.slug}
                href={`/${locale}/${dest.slug}/${slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${destGradients[i % destGradients.length]} p-8 min-h-[180px] flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1`}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="absolute top-4 right-5 text-5xl opacity-20 select-none">{dest.flag}</div>
                <div className="relative">
                  <span className="text-4xl block mb-2">{dest.flag}</span>
                  <h3 className="text-white font-bold text-xl">{dest.name}</h3>
                  <p className="text-white/70 text-sm">{dest.country}</p>
                </div>
                <p className="relative text-white/80 text-sm font-semibold group-hover:text-white transition-colors">
                  {p.category.explore}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
