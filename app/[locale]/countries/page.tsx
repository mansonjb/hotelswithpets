import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales, type Locale } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { getAllCountries } from '@/lib/countries'
import hotels from '@/data/hotels.json'
import { SITE_URL } from '@/lib/site'

const countries = getAllCountries()

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}

  const titles: Record<string, string> = {
    en: 'Pet-Friendly Hotels by Country in Europe | HotelsWithPets.com',
    fr: 'Hôtels Acceptant Animaux par Pays en Europe | HotelsWithPets.com',
    es: 'Hoteles con Mascotas por País en Europa | HotelsWithPets.com',
  }
  const descriptions: Record<string, string> = {
    en: `Browse pet-friendly hotels by country across ${countries.length} European countries. Find the best stays for you and your pet.`,
    fr: `Parcourez les hôtels acceptant animaux par pays dans ${countries.length} pays européens.`,
    es: `Explora hoteles con mascotas por país en ${countries.length} países europeos.`,
  }

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/countries`,
      languages: {
        en: `${SITE_URL}/en/countries`,
        fr: `${SITE_URL}/fr/countries`,
        es: `${SITE_URL}/es/countries`,
        'x-default': `${SITE_URL}/en/countries`,
      },
    },
  }
}

const headings: Record<string, string> = {
  en: 'Browse by country',
  fr: 'Parcourir par pays',
  es: 'Explorar por país',
}
const subtitles: Record<string, string> = {
  en: 'Find pet-friendly hotels in your destination country',
  fr: 'Trouvez des hôtels acceptant animaux dans votre pays de destination',
  es: 'Encuentra hoteles con mascotas en tu país de destino',
}

export default async function CountriesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
            {headings[locale] ?? headings.en}
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            {subtitles[locale] ?? subtitles.en}
          </p>
        </div>
      </section>

      {/* Countries grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {countries.map((country) => {
              const hotelCount = hotels.filter((h) =>
                country.destinations.some((d) => d.slug === h.destinationSlug)
              ).length
              const cityLabel =
                locale === 'fr'
                  ? `${country.destinations.length} ville${country.destinations.length > 1 ? 's' : ''}`
                  : locale === 'es'
                  ? `${country.destinations.length} ciudad${country.destinations.length > 1 ? 'es' : ''}`
                  : `${country.destinations.length} ${country.destinations.length > 1 ? 'cities' : 'city'}`
              const hotelLabel =
                locale === 'fr'
                  ? `${hotelCount} hôtels`
                  : locale === 'es'
                  ? `${hotelCount} hoteles`
                  : `${hotelCount} hotels`

              return (
                <Link
                  key={country.slug}
                  href={`/${locale}/countries/${country.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-4"
                >
                  <span className="text-4xl flex-shrink-0">{country.flag}</span>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {country.name}
                    </p>
                    <p className="text-sm text-gray-400">{cityLabel} · {hotelLabel}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
