import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale, locales, type Locale } from '@/app/[locale]/dictionaries'
import HotelCard from '@/components/HotelCard'
import PetMap from '@/components/PetMap'
import destinations from '@/data/destinations.json'
import categories from '@/data/categories.json'
import hotels from '@/data/hotels.json'
import { SITE_URL } from '@/lib/site'
import { generateDestIntro, generateDestFaqs } from '@/lib/editorial'

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: PageProps<'/[locale]/destinations/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(locale)) return {}
  const dest = destinations.find((d) => d.slug === slug)
  if (!dest) return {}

  const titleTemplates: Record<string, string> = {
    en: `Pet-friendly hotels in ${dest.name}, ${dest.country} | HotelsWithPets.com`,
    fr: `Hôtels acceptant animaux à ${dest.name}, ${dest.country} | HotelsWithPets.com`,
    es: `Hoteles con mascotas en ${dest.name}, ${dest.country} | HotelsWithPets.com`,
  }
  const descTemplates: Record<string, string> = {
    en: `Find the best pet-friendly hotels in ${dest.name}. Browse by category, compare pet policies, and book on Booking.com.`,
    fr: `Trouvez les meilleurs hôtels acceptant les animaux à ${dest.name}. Comparez les politiques et réservez sur Booking.com.`,
    es: `Encuentra los mejores hoteles con mascotas en ${dest.name}. Compara políticas y reserva en Booking.com.`,
  }
  const title = titleTemplates[locale] ?? titleTemplates.en
  const description = descTemplates[locale] ?? descTemplates.en

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/destinations/${slug}`,
      languages: {
        en: `${SITE_URL}/en/destinations/${slug}`,
        fr: `${SITE_URL}/fr/destinations/${slug}`,
        es: `${SITE_URL}/es/destinations/${slug}`,
        'x-default': `${SITE_URL}/en/destinations/${slug}`,
      },
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
  const localeIntro = generateDestIntro(slug, dest.name, dest.country, locale) || dest.intro
  const faqs = generateDestFaqs(slug, dest.name, dest.country, destHotels.length, locale)

  // Find which categories have hotels here
  const presentCategorySlugs = new Set(destHotels.flatMap((h) => h.categories))
  const presentCategories = categories.filter((c) => presentCategorySlugs.has(c.slug))

  // Related destinations: same country, exclude self, up to 4
  const relatedDests = destinations
    .filter((d) => d.country === dest.country && d.slug !== slug)
    .slice(0, 4)

  const base = 'https://hotelswithpets.com'
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: dict.nav.home, item: `${base}/${locale}` },
      { '@type': 'ListItem', position: 2, name: dict.nav.destinations, item: `${base}/${locale}/destinations` },
      { '@type': 'ListItem', position: 3, name: dest.name, item: `${base}/${locale}/destinations/${dest.slug}` },
    ],
  }
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Pet-friendly hotels in ${dest.name}`,
    numberOfItems: destHotels.length,
    itemListElement: destHotels.map((hotel, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'LodgingBusiness',
        name: hotel.name,
        url: hotel.bookingUrl,
        petsAllowed: true,
        starRating: { '@type': 'Rating', ratingValue: hotel.stars },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: hotel.rating,
          reviewCount: hotel.reviewCount,
          bestRating: '10',
          worstRating: '1',
        },
        address: { '@type': 'PostalAddress', addressLocality: dest.name, addressCountry: dest.country },
      },
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
              <p className="text-blue-200 text-base mt-2 max-w-2xl leading-relaxed">{localeIntro}</p>
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
            <PetMap
                lat={(dest as typeof dest & { lat: number }).lat}
                lng={(dest as typeof dest & { lng: number }).lng}
                stay22MapId={'stay22MapId' in dest ? (dest as typeof dest & { stay22MapId?: string }).stay22MapId : undefined}
                destName={dest.name}
                country={dest.country}
                height={380}
              />
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

      {/* FAQ */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
            {locale === 'fr' ? 'Questions fréquentes' : locale === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
                  <span>{faq.q}</span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-black group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      {/* Related destinations in same country */}
      {relatedDests.length > 0 && (
        <section className="py-12 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-5">
              {locale === 'fr'
                ? `Plus de destinations en ${dest.country}`
                : locale === 'es'
                ? `Más destinos en ${dest.country}`
                : `More destinations in ${dest.country}`}
            </h2>
            <div className="flex flex-wrap gap-3">
              {relatedDests.map((related) => (
                <Link
                  key={related.slug}
                  href={`/${locale}/destinations/${related.slug}`}
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-colors shadow-sm"
                >
                  <span>{related.flag}</span>
                  <span>{related.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
    </>
  )
}
