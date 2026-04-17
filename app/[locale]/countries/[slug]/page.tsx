import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale, locales, type Locale } from '@/app/[locale]/dictionaries'
import { getAllCountries, slugToCountry } from '@/lib/countries'
import hotels from '@/data/hotels.json'
import categories from '@/data/categories.json'
import { SITE_URL } from '@/lib/site'

const countries = getAllCountries()

export async function generateStaticParams() {
  return countries.flatMap((c) =>
    locales.map((locale) => ({ locale, slug: c.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(locale)) return {}
  const countryName = slugToCountry(slug)
  if (!countryName) return {}

  const titleTemplates: Record<string, string> = {
    en: `Pet-friendly hotels in ${countryName} | HotelsWithPets.com`,
    fr: `Hôtels acceptant animaux en ${countryName} | HotelsWithPets.com`,
    es: `Hoteles con mascotas en ${countryName} | HotelsWithPets.com`,
  }
  const descTemplates: Record<string, string> = {
    en: `Discover the best pet-friendly hotels across ${countryName}. Browse cities, compare pet policies and book with confidence.`,
    fr: `Découvrez les meilleurs hôtels acceptant animaux en ${countryName}. Comparez les villes et réservez.`,
    es: `Descubre los mejores hoteles con mascotas en ${countryName}. Compara ciudades y reserva.`,
  }
  const title = titleTemplates[locale] ?? titleTemplates.en
  const description = descTemplates[locale] ?? descTemplates.en

  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    alternates: {
      canonical: `${SITE_URL}/${locale}/countries/${slug}`,
      languages: {
        en: `${SITE_URL}/en/countries/${slug}`,
        fr: `${SITE_URL}/fr/countries/${slug}`,
        es: `${SITE_URL}/es/countries/${slug}`,
        'x-default': `${SITE_URL}/en/countries/${slug}`,
      },
    },
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

export default async function CountryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!hasLocale(locale)) notFound()

  const countryName = slugToCountry(slug)
  if (!countryName) notFound()

  const country = countries.find((c) => c.slug === slug)!
  const dict = await getDictionary(locale as Locale)
  const p = dict.pages.destination

  const totalHotels = hotels.filter((h) =>
    country.destinations.some((d) => d.slug === h.destinationSlug)
  ).length

  const headings: Record<string, string> = {
    en: `Pet-friendly hotels in ${countryName}`,
    fr: `Hôtels acceptant animaux en ${countryName}`,
    es: `Hoteles con mascotas en ${countryName}`,
  }
  const subtitles: Record<string, string> = {
    en: `${country.destinations.length} cities · ${totalHotels}+ pet-friendly hotels`,
    fr: `${country.destinations.length} villes · ${totalHotels}+ hôtels acceptant animaux`,
    es: `${country.destinations.length} ciudades · ${totalHotels}+ hoteles con mascotas`,
  }

  const base = 'https://hotelswithpets.com'
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/${locale}` },
      { '@type': 'ListItem', position: 2, name: countryName, item: `${base}/${locale}/countries/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 text-[12rem] opacity-5 select-none flex items-center justify-center">
            {country.flag}
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-7xl block mb-6">{country.flag}</span>
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-3">
              {headings[locale] ?? headings.en}
            </h1>
            <p className="text-blue-300 text-lg">{subtitles[locale] ?? subtitles.en}</p>
          </div>
        </section>

        {/* Cities grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {country.destinations.map((dest, i) => {
                const destHotelCount = hotels.filter((h) => h.destinationSlug === dest.slug).length
                return (
                  <Link
                    key={dest.slug}
                    href={`/${locale}/destinations/${dest.slug}`}
                    className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradients[i % gradients.length]} p-8 min-h-[200px] flex flex-col justify-end shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
                  >
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />
                    <div className="absolute top-6 right-6 text-7xl opacity-20 group-hover:opacity-35 transition-opacity select-none">
                      {dest.flag}
                    </div>
                    <div className="relative">
                      <span className="text-5xl mb-3 block">{dest.flag}</span>
                      <h2 className="text-white font-extrabold text-2xl mb-1">{dest.name}</h2>
                      <p className="text-white/70 text-sm mb-3">
                        {destHotelCount} {locale === 'fr' ? 'hôtels' : locale === 'es' ? 'hoteles' : 'hotels'}
                      </p>
                      <span className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors">
                        {p.back ? '' : ''}{locale === 'fr' ? 'Explorer' : locale === 'es' ? 'Explorar' : 'Explore'} →
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Popular guides for this country */}
        {(() => {
          const guideLinks: Array<{ href: string; label: string }> = []
          country.destinations.slice(0, 4).forEach((dest) => {
            const destCats = new Set(hotels.filter(h => h.destinationSlug === dest.slug).flatMap(h => h.categories))
            const topCats = categories.filter(c => destCats.has(c.slug)).slice(0, 2)
            topCats.forEach(cat => {
              const catLabel = locale === 'fr' && cat.nameFr ? cat.nameFr : locale === 'es' && cat.nameEs ? cat.nameEs : cat.name
              const label = locale === 'fr'
                ? `Hôtels ${catLabel.toLowerCase()} à ${dest.name}`
                : locale === 'es'
                ? `Hoteles ${catLabel.toLowerCase()} en ${dest.name}`
                : `${catLabel} hotels in ${dest.name}`
              guideLinks.push({ href: `/${locale}/${dest.slug}/${cat.slug}`, label })
            })
          })
          if (guideLinks.length === 0) return null
          return (
            <section className="bg-white border-t border-gray-100 py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-lg font-extrabold text-gray-900 mb-5">
                  {locale === 'fr' ? `Guides populaires en ${countryName}` : locale === 'es' ? `Guías populares en ${countryName}` : `Popular guides in ${countryName}`}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {guideLinks.map((g) => (
                    <Link
                      key={g.href}
                      href={g.href}
                      className="text-sm text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-full px-4 py-1.5 transition-colors"
                    >
                      {g.label}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )
        })()}

        {/* Breadcrumb back */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href={`/${locale}/destinations`} className="text-blue-600 hover:underline text-sm">
            ← {locale === 'fr' ? 'Toutes les destinations' : locale === 'es' ? 'Todos los destinos' : 'All destinations'}
          </Link>
        </div>
      </div>
    </>
  )
}
