import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale, locales, type Locale } from '@/app/[locale]/dictionaries'
import HotelCard from '@/components/HotelCard'
import destinations from '@/data/destinations.json'
import categories from '@/data/categories.json'
import hotels from '@/data/hotels.json'

export async function generateStaticParams() {
  // Generate all valid destination × category combos that have hotels
  const combos = new Set(
    hotels.flatMap((h) =>
      h.categories.map((cat) => `${h.destinationSlug}|${cat}`)
    )
  )
  return [...combos].map((combo) => {
    const [destination, category] = combo.split('|')
    return { destination, category }
  })
}

export async function generateMetadata({ params }: PageProps<'/[locale]/[destination]/[category]'>): Promise<Metadata> {
  const { locale, destination, category } = await params
  if (!hasLocale(locale)) return {}
  const dest = destinations.find((d) => d.slug === destination)
  const cat = categories.find((c) => c.slug === category)
  if (!dest || !cat) return {}
  return {
    title: `${cat.name} hotels in ${dest.name} | HotelsWithPets.com`,
    description: `Find the best ${cat.name.toLowerCase()} hotels in ${dest.name}, ${dest.country}. ${cat.description} Compare pet policies and book on Booking.com.`,
    openGraph: {
      title: `${cat.name} hotels in ${dest.name}`,
      description: `${cat.description} Find your stay in ${dest.name}.`,
    },
  }
}

function getCategoryName(cat: typeof categories[number], locale: Locale): string {
  if (locale === 'fr' && cat.nameFr) return cat.nameFr
  if (locale === 'es' && cat.nameEs) return cat.nameEs
  return cat.name
}

export default async function ComboPage({ params }: PageProps<'/[locale]/[destination]/[category]'>) {
  const { locale, destination, category } = await params
  if (!hasLocale(locale)) notFound()

  const dest = destinations.find((d) => d.slug === destination)
  const cat = categories.find((c) => c.slug === category)
  if (!dest || !cat) notFound()

  const dict = await getDictionary(locale as Locale)
  const p = dict.pages.combo
  const catName = getCategoryName(cat, locale as Locale)

  const comboHotels = hotels.filter(
    (h) => h.destinationSlug === destination && h.categories.includes(category)
  )

  const bookingSearchUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(dest.name)}&nflt=pets_allowed%3D1`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className={`bg-gradient-to-br ${cat.gradient} text-white py-20 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/25" />
        {/* Decorative blobs */}
        <div className="absolute right-[-60px] top-[-40px] w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute left-[-40px] bottom-[-40px] w-60 h-60 bg-white/5 rounded-full blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
            <Link href={`/${locale}/destinations`} className="hover:text-white transition-colors">
              Destinations
            </Link>
            <span>/</span>
            <Link href={`/${locale}/destinations/${destination}`} className="hover:text-white transition-colors">
              {dest.name}
            </Link>
            <span>/</span>
            <span className="text-white">{catName}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl lg:text-7xl filter drop-shadow-lg">{cat.emoji}</span>
                <span className="text-4xl lg:text-6xl">{dest.flag}</span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight mb-3">
                {catName} hotels<br />
                <span className="text-white/80">in {dest.name}</span>
              </h1>
              <p className="text-white/70 text-base max-w-xl">{cat.description}</p>
              <p className="text-white/60 text-sm mt-2">{dest.intro}</p>
            </div>

            {/* Stats */}
            <div className="flex gap-6 lg:flex-col lg:items-end">
              <div className="text-center lg:text-right">
                <p className="text-3xl font-black">{comboHotels.length}</p>
                <p className="text-white/60 text-xs uppercase tracking-widest">Hotels</p>
              </div>
              <div className="text-center lg:text-right">
                <p className="text-3xl font-black">{dest.country}</p>
                <p className="text-white/60 text-xs uppercase tracking-widest">Country</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
            {p.hotelsTitle} — {catName} in {dest.name}
          </h2>

          {comboHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comboHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} dict={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <span className="text-5xl block mb-4">{cat.emoji}</span>
              <p className="text-lg">{p.noHotels}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl block mb-4">🏨</span>
          <h2 className="text-3xl font-extrabold text-white mb-3">{p.ctaTitle}</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">{p.ctaDesc}</p>
          <a
            href={bookingSearchUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-200 shadow-xl hover:shadow-blue-900/50 hover:-translate-y-0.5"
          >
            {p.ctaButton} →
          </a>
          <p className="text-blue-400/60 text-xs mt-4">
            {dict.footer.disclosureText}
          </p>
        </div>
      </section>
    </div>
  )
}
