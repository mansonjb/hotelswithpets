import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale, type Locale } from '@/app/[locale]/dictionaries'
import destinations from '@/data/destinations.json'
import categories from '@/data/categories.json'
import hotels from '@/data/hotels.json'
import { SITE_URL } from '@/lib/site'

type HotelData = typeof hotels[number] & { slug: string }

export async function generateStaticParams() {
  return (hotels as HotelData[]).map((h) => ({ slug: h.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(locale)) return {}

  const hotel = (hotels as HotelData[]).find((h) => h.slug === slug)
  if (!hotel) return {}

  const dest = destinations.find((d) => d.slug === hotel.destinationSlug)
  if (!dest) return {}

  const title = `${hotel.name} — Pet-Friendly Hotel in ${dest.name} | HotelsWithPets.com`
  const description = `${hotel.name} in ${dest.name}: pet policy — ${hotel.petPolicy.slice(0, 100)}. From €${hotel.priceFrom}/night. Rating: ${hotel.rating}/10 (${hotel.reviewCount} reviews). Pet fee: ${hotel.petFee === 0 ? 'free' : `€${hotel.petFee}`}.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/hotels/${slug}`,
      languages: {
        en: `${SITE_URL}/en/hotels/${slug}`,
        fr: `${SITE_URL}/fr/hotels/${slug}`,
        es: `${SITE_URL}/es/hotels/${slug}`,
        'x-default': `${SITE_URL}/en/hotels/${slug}`,
      },
    },
  }
}

function sanitizePetPolicy(raw: string): string {
  if (!raw || raw.trim().length === 0) return 'Pets welcome. Please confirm specific policy at booking.'
  if (raw.length > 180) return 'Pets welcome. Please confirm specific policy at booking.'
  if (/<[a-z]/i.test(raw) || /[<>{}]/.test(raw)) return 'Pets welcome. Please confirm specific policy at booking.'
  if (/charged|subject to availability|may vary|see policies/i.test(raw) && raw.length > 100)
    return 'Pets welcome. Please confirm specific policy at booking.'
  return raw
}

const ratingLabel = (r: number) => {
  if (r >= 9.5) return 'Outstanding'
  if (r >= 9) return 'Exceptional'
  if (r >= 8.5) return 'Excellent'
  if (r >= 8) return 'Very Good'
  return 'Good'
}

export default async function HotelPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!hasLocale(locale)) notFound()

  const hotel = (hotels as HotelData[]).find((h) => h.slug === slug)
  if (!hotel) notFound()

  const dest = destinations.find((d) => d.slug === hotel.destinationSlug)
  if (!dest) notFound()

  const dict = await getDictionary(locale as Locale)

  // Related hotels: same destination, exclude current, up to 3
  const relatedHotels = (hotels as HotelData[])
    .filter((h) => h.destinationSlug === hotel.destinationSlug && h.slug !== slug)
    .slice(0, 3)

  // Hotel categories with full data
  const hotelCategories = categories.filter((c) => hotel.categories.includes(c.slug))

  const base = 'https://hotelswithpets.com'

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: dict.nav.home, item: `${base}/${locale}` },
      { '@type': 'ListItem', position: 2, name: dict.nav.destinations, item: `${base}/${locale}/destinations` },
      { '@type': 'ListItem', position: 3, name: dest.name, item: `${base}/${locale}/destinations/${dest.slug}` },
      { '@type': 'ListItem', position: 4, name: hotel.name, item: `${base}/${locale}/hotels/${slug}` },
    ],
  }

  const lodgingSchema = {
    '@context': 'https://schema.org',
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
    address: {
      '@type': 'PostalAddress',
      addressLocality: dest.name,
      addressCountry: dest.country,
    },
    priceRange: '€'.repeat(Math.max(1, hotel.stars - 2)),
  }

  const getCatName = (cat: typeof categories[number]) => {
    if (locale === 'fr' && cat.nameFr) return cat.nameFr
    if (locale === 'es' && cat.nameEs) return cat.nameEs
    return cat.name
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingSchema) }} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white relative overflow-hidden">
          {/* Hotel image */}
          <div className="relative h-72 md:h-96 overflow-hidden">
            <Image
              src={`/images/hotels/${hotel.id}.jpg`}
              alt={hotel.name}
              fill
              sizes="100vw"
              className="object-cover opacity-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-32 relative">
            {/* Breadcrumb back link */}
            <div className="flex items-center gap-2 mb-6 text-sm">
              <Link href={`/${locale}/destinations/${dest.slug}`} className="text-blue-300 hover:text-white transition-colors">
                {dest.flag} {dest.name}
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-white/60">{hotel.name}</span>
            </div>

            {/* Hotel name + stars */}
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">
              {hotel.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-amber-400 text-lg tracking-tight" aria-label={`${hotel.stars} stars`}>
                {'★'.repeat(hotel.stars)}{'☆'.repeat(5 - hotel.stars)}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="bg-blue-600 text-white text-sm font-black px-2.5 py-1 rounded-lg leading-none">
                  {hotel.rating}
                </span>
                <span className="text-white/80 text-sm font-semibold">{ratingLabel(hotel.rating)}</span>
                <span className="text-white/50 text-sm">
                  ({hotel.reviewCount >= 1000
                    ? `${(hotel.reviewCount / 1000).toFixed(hotel.reviewCount >= 10000 ? 0 : 1)}k`
                    : hotel.reviewCount} reviews)
                </span>
              </span>
            </div>

            {/* Pet fee badge */}
            <div className="mb-6">
              {hotel.petFee === 0 ? (
                <span className="inline-flex items-center gap-1.5 bg-green-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow">
                  ✓ Free for pets
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-amber-400 text-gray-900 text-sm font-bold px-3 py-1.5 rounded-full shadow">
                  Pet fee: €{hotel.petFee}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid md:grid-cols-[1fr_300px] gap-8 items-start">

            {/* Left column */}
            <div className="min-w-0 space-y-6">

              {/* Pet policy box */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">Pet Policy</p>
                  <span className="text-xs text-blue-400 font-medium">✓ Booking.com</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{sanitizePetPolicy(hotel.petPolicy)}</p>
              </div>

              {/* Highlights */}
              {hotel.highlights.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-3">Highlights</h2>
                  <div className="flex flex-wrap gap-2">
                    {hotel.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-sm bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full shadow-sm"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Browse by category */}
              {hotelCategories.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-3">
                    {locale === 'fr'
                      ? `Parcourir les hôtels par type à ${dest.name}`
                      : locale === 'es'
                      ? `Explorar hoteles por tipo en ${dest.name}`
                      : `Browse hotels by type in ${dest.name}`}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {hotelCategories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/${locale}/${dest.slug}/${cat.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm bg-white border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-700 px-3 py-1.5 rounded-full shadow-sm transition-colors"
                      >
                        <span>{cat.emoji}</span>
                        <span>{getCatName(cat)} {locale === 'fr' ? 'à' : locale === 'es' ? 'en' : 'in'} {dest.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related hotels */}
              {relatedHotels.length > 0 && (
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 mb-4">
                    {locale === 'fr'
                      ? `Plus d'hôtels pet-friendly à ${dest.name}`
                      : locale === 'es'
                      ? `Más hoteles pet-friendly en ${dest.name}`
                      : `More pet-friendly hotels in ${dest.name}`}
                  </h2>
                  <div className="flex flex-col gap-4">
                    {relatedHotels.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/${locale}/hotels/${rel.slug}`}
                        className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
                      >
                        <div className="relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={`/images/hotels/${rel.id}.jpg`}
                            alt={rel.name}
                            fill
                            sizes="80px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-gray-900 text-sm leading-snug group-hover:text-blue-700 transition-colors truncate">
                            {rel.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-amber-400 text-xs">{'★'.repeat(rel.stars)}</span>
                            <span className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded leading-none">
                              {rel.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-lg font-black text-gray-900">€{rel.priceFrom}</p>
                          <p className="text-xs text-gray-400">/night</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back link */}
              <Link
                href={`/${locale}/destinations/${dest.slug}`}
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                ← {locale === 'fr' ? `Retour à ${dest.name}` : locale === 'es' ? `Volver a ${dest.name}` : `Back to ${dest.name}`}
              </Link>
            </div>

            {/* Right column — sticky booking card */}
            <aside>
              <div className="sticky top-6 bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 p-5 text-white">
                  <p className="text-white/70 text-xs uppercase tracking-wide mb-1">
                    {locale === 'fr' ? 'À partir de' : locale === 'es' ? 'Desde' : 'From'}
                  </p>
                  <p className="text-4xl font-black leading-none">
                    €{hotel.priceFrom}
                    <span className="text-lg font-normal text-white/60 ml-1">/night</span>
                  </p>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-blue-600 text-white text-sm font-black px-2.5 py-1 rounded-lg leading-none">
                      {hotel.rating}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{ratingLabel(hotel.rating)}</p>
                      <p className="text-xs text-gray-400">
                        {hotel.reviewCount >= 1000
                          ? `${(hotel.reviewCount / 1000).toFixed(hotel.reviewCount >= 10000 ? 0 : 1)}k`
                          : hotel.reviewCount} reviews
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    {hotel.petFee === 0 ? (
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
                        ✓ Free for pets
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200">
                        Pet fee: €{hotel.petFee}
                      </span>
                    )}
                  </div>

                  <a
                    href={hotel.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    {locale === 'fr'
                      ? 'Réserver sur Booking.com →'
                      : locale === 'es'
                      ? 'Reservar en Booking.com →'
                      : 'Book on Booking.com →'}
                  </a>
                  <p className="text-center text-xs text-gray-400 mt-3">
                    {locale === 'fr'
                      ? 'Via notre partenaire Booking.com'
                      : locale === 'es'
                      ? 'A través de nuestro socio Booking.com'
                      : 'Via our partner Booking.com'}
                  </p>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  )
}
