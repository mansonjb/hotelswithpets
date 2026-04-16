import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale, locales, type Locale } from '@/app/[locale]/dictionaries'
import HotelCard from '@/components/HotelCard'
import Stay22Map from '@/components/Stay22Map'
import destinations from '@/data/destinations.json'
import categories from '@/data/categories.json'
import hotels from '@/data/hotels.json'

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: PageProps<'/[locale]/destinations/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(locale)) return {}
  const dest = destinations.find((d) => d.slug === slug)
  if (!dest) return {}
  return {
    title: `Pet-friendly hotels in ${dest.name}, ${dest.country} | HotelsWithPets.com`,
    description: `Find the best pet-friendly hotels in ${dest.name}. Browse by category, compare pet policies, and book on Booking.com.`,
    openGraph: {
      title: `Pet-friendly hotels in ${dest.name}`,
      description: dest.intro,
    },
  }
}

function getCategoryName(cat: typeof categories[number], locale: Locale): string {
  if (locale === 'fr' && cat.nameFr) return cat.nameFr
  if (locale === 'es' && cat.nameEs) return cat.nameEs
  return cat.name
}

export default async function DestinationPage({ params }: PageProps<'/[locale]/destinations/[slug]'>) {
  const { locale, slug } = await params
  if (!hasLocale(locale)) notFound()

  const dest = destinations.find((d) => d.slug === slug)
  if (!dest) notFound()

  const dict = await getDictionary(locale as Locale)
  const p = dict.pages.destination

  const destHotels = hotels.filter((h) => h.destinationSlug === slug)

  // Find which categories have hotels here
  const presentCategorySlugs = new Set(destHotels.flatMap((h) => h.categories))
  const presentCategories = categories.filter((c) => presentCategorySlugs.has(c.slug))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 text-[12rem] opacity-5 select-none flex items-center justify-center">
          {dest.flag}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href={`/${locale}/destinations`} className="text-blue-300 hover:text-white text-sm transition-colors">
              {dict.pages.destination.back}
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-6xl lg:text-8xl">{dest.flag}</span>
            <div>
              <h1 className="text-4xl lg:text-6xl font-extrabold mb-2">{dest.name}</h1>
              <p className="text-blue-300 text-lg">{dest.country}</p>
              <p className="text-blue-200 text-base mt-2 max-w-2xl leading-relaxed">{dest.intro}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {presentCategories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8">{p.categoriesTitle}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {presentCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${locale}/${slug}/${cat.slug}`}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.gradient} p-5 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1`}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <span className="relative text-3xl mb-2">{cat.emoji}</span>
                  <p className="relative text-white font-bold text-sm leading-tight">
                    {getCategoryName(cat, locale as Locale)}
                  </p>
                  <p className="relative text-white/70 text-xs mt-1">{p.viewCombo}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Map */}
      {'lat' in dest && 'lng' in dest && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{p.hotelsTitle} — {dest.name}</h2>
            <Stay22Map lat={(dest as typeof dest & { lat: number }).lat} lng={(dest as typeof dest & { lng: number }).lng} destName={dest.name} height={380} />
          </div>
        </section>
      )}

      {/* Hotels */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
            {p.hotelsTitle} — {dest.name}
          </h2>
          {destHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} dict={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <span className="text-5xl block mb-4">🏨</span>
              <p className="text-lg">{dict.pages.combo.noHotels}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
