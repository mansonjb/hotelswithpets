import Link from 'next/link'
import type { Metadata } from 'next'
import { getDictionary, hasLocale, locales, type Locale } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import destinations from '@/data/destinations.json'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps<'/[locale]/destinations'>): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const dict = await getDictionary(locale as Locale)
  return {
    title: `${dict.pages.destinations.title} | HotelsWithPets.com`,
    description: dict.pages.destinations.subtitle,
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

export default async function DestinationsPage({ params }: PageProps<'/[locale]/destinations'>) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const dict = await getDictionary(locale as Locale)
  const p = dict.pages.destinations

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
            {destinations.map((dest, i) => (
              <Link
                key={dest.slug}
                href={`/${locale}/destinations/${dest.slug}`}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradients[i % gradients.length]} p-8 min-h-[220px] flex flex-col justify-end shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />
                <div className="absolute top-6 right-6 text-7xl opacity-20 group-hover:opacity-35 transition-opacity select-none">
                  {dest.flag}
                </div>
                <div className="relative">
                  <span className="text-5xl mb-3 block">{dest.flag}</span>
                  <h2 className="text-white font-extrabold text-2xl mb-1">{dest.name}</h2>
                  <p className="text-white/70 text-sm mb-1">{dest.country} · {dest.categoryCount} categories</p>
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-4">{dest.intro}</p>
                  <span className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors">
                    {p.explore} →
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
