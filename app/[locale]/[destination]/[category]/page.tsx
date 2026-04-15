import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale, type Locale } from '@/app/[locale]/dictionaries'
import HotelRankedCard from '@/components/HotelRankedCard'
import { generateIntro, generateFaqs, generateTips } from '@/lib/editorial'
import destinations from '@/data/destinations.json'
import categories from '@/data/categories.json'
import hotels from '@/data/hotels.json'

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const combos = new Set(
    hotels.flatMap((h) => h.categories.map((cat) => `${h.destinationSlug}|${cat}`))
  )
  return [...combos].map((combo) => {
    const [destination, category] = combo.split('|')
    return { destination, category }
  })
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/[destination]/[category]'>): Promise<Metadata> {
  const { locale, destination, category } = await params
  if (!hasLocale(locale)) return {}

  const dest = destinations.find((d) => d.slug === destination)
  const cat = categories.find((c) => c.slug === category)
  if (!dest || !cat) return {}

  const year = new Date().getFullYear()
  const comboHotels = hotels.filter(
    (h) => h.destinationSlug === destination && h.categories.includes(category)
  )
  const minPrice = Math.min(...comboHotels.map((h) => h.priceFrom))
  const freeCount = comboHotels.filter((h) => h.petFee === 0).length

  const title = `Best ${cat.name} Hotels in ${dest.name} (${year}) — Top ${comboHotels.length} Picks`
  const description = `Find the ${comboHotels.length} best ${cat.name.toLowerCase()} hotels in ${dest.name}, ${dest.country}. Handpicked, verified policies, from €${minPrice}/night. ${freeCount} with no pet fee. Book on Booking.com.`

  return {
    title: `${title} | HotelsWithPets.com`,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/${destination}/${category}`,
    },
  }
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function getCategoryName(cat: (typeof categories)[number], locale: Locale): string {
  if (locale === 'fr' && cat.nameFr) return cat.nameFr
  if (locale === 'es' && cat.nameEs) return cat.nameEs
  return cat.name
}

// ─── Schema builder ───────────────────────────────────────────────────────────

function buildSchema(
  locale: string,
  dest: (typeof destinations)[number],
  cat: (typeof categories)[number],
  catName: string,
  comboHotels: typeof hotels,
  faqs: Array<{ q: string; a: string }>,
  year: number
) {
  const base = `https://hotelswithpets.com`

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Destinations', item: `${base}/${locale}/destinations` },
      { '@type': 'ListItem', position: 3, name: dest.name, item: `${base}/${locale}/destinations/${dest.slug}` },
      {
        '@type': 'ListItem',
        position: 4,
        name: `${catName} in ${dest.name}`,
        item: `${base}/${locale}/${dest.slug}/${cat.slug}`,
      },
    ],
  }

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best ${catName} Hotels in ${dest.name} (${year})`,
    description: `Handpicked ${catName.toLowerCase()} hotels in ${dest.name}, ${dest.country}.`,
    numberOfItems: comboHotels.length,
    itemListElement: comboHotels.map((hotel, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'LodgingBusiness',
        name: hotel.name,
        url: hotel.bookingUrl,
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
      },
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return [breadcrumb, itemList, faqSchema]
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ComboPage({
  params,
}: PageProps<'/[locale]/[destination]/[category]'>) {
  const { locale, destination, category } = await params
  if (!hasLocale(locale)) notFound()

  const dest = destinations.find((d) => d.slug === destination)
  const cat = categories.find((c) => c.slug === category)
  if (!dest || !cat) notFound()

  const dict = await getDictionary(locale as Locale)
  const p = dict.pages.combo
  const catName = getCategoryName(cat, locale as Locale)
  const year = new Date().getFullYear()

  const comboHotels = hotels.filter(
    (h) => h.destinationSlug === destination && h.categories.includes(category)
  )

  const minPrice = comboHotels.length > 0 ? Math.min(...comboHotels.map((h) => h.priceFrom)) : null
  const avgRating =
    comboHotels.length > 0
      ? (comboHotels.reduce((sum, h) => sum + h.rating, 0) / comboHotels.length).toFixed(1)
      : null
  const freeCount = comboHotels.filter((h) => h.petFee === 0).length

  const introParagraphs = generateIntro(dest.slug, dest.name, cat.slug, comboHotels.length)
  const faqs = generateFaqs(dest.slug, dest.name, cat.slug, catName, comboHotels)
  const tips = generateTips(cat.slug, dest.name)

  const schemas = buildSchema(locale, dest, cat, catName, comboHotels, faqs, year)

  // Related: other categories in same destination
  const otherCategorySlugs = new Set(
    hotels
      .filter((h) => h.destinationSlug === destination && !h.categories.includes(category))
      .flatMap((h) => h.categories)
  )
  const relatedByDest = categories.filter((c) => otherCategorySlugs.has(c.slug)).slice(0, 4)

  // Related: same category in other destinations
  const otherDestSlugs = new Set(
    hotels
      .filter((h) => h.categories.includes(category) && h.destinationSlug !== destination)
      .map((h) => h.destinationSlug)
  )
  const relatedByCategory = destinations.filter((d) => otherDestSlugs.has(d.slug)).slice(0, 4)

  const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(dest.name)}&nflt=pets_allowed%3D1`

  return (
    <>
      {/* ── Structured data ── */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="min-h-screen bg-gray-50">
        {/* ── Breadcrumbs ── */}
        <nav
          aria-label="Breadcrumb"
          className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-3"
        >
          <ol className="max-w-7xl mx-auto flex items-center flex-wrap gap-1 text-sm text-gray-500">
            <li>
              <Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <Link href={`/${locale}/destinations`} className="hover:text-blue-600 transition-colors">
                Destinations
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <Link
                href={`/${locale}/destinations/${dest.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {dest.name}
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-900 font-medium" aria-current="page">
              {catName}
            </li>
          </ol>
        </nav>

        {/* ── Hero ── */}
        <section
          className={`bg-gradient-to-br ${cat.gradient} text-white relative overflow-hidden`}
          aria-label="Page hero"
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute -right-16 -top-16 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -left-8 bottom-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-6xl lg:text-8xl filter drop-shadow-xl">{cat.emoji}</span>
                  <span className="text-4xl lg:text-6xl filter drop-shadow-lg">{dest.flag}</span>
                </div>
                <h1 className="text-3xl lg:text-5xl font-extrabold leading-[1.1] mb-3 tracking-tight">
                  Best {catName} Hotels<br />
                  <span className="text-white/85">in {dest.name}</span>
                  <span className="text-white/50 text-2xl lg:text-3xl font-semibold"> ({year})</span>
                </h1>
                <p className="text-white/75 text-base lg:text-lg max-w-xl leading-relaxed">
                  {comboHotels.length} handpicked properties · {dest.country} · Updated {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* Stats panel */}
              {comboHotels.length > 0 && (
                <div className="flex gap-8 lg:flex-col lg:items-end">
                  {minPrice && (
                    <div className="text-center lg:text-right">
                      <p className="text-3xl lg:text-4xl font-black">€{minPrice}</p>
                      <p className="text-white/60 text-xs uppercase tracking-widest mt-0.5">from / night</p>
                    </div>
                  )}
                  {avgRating && (
                    <div className="text-center lg:text-right">
                      <p className="text-3xl lg:text-4xl font-black">{avgRating}/10</p>
                      <p className="text-white/60 text-xs uppercase tracking-widest mt-0.5">avg rating</p>
                    </div>
                  )}
                  <div className="text-center lg:text-right">
                    <p className="text-3xl lg:text-4xl font-black">{freeCount}</p>
                    <p className="text-white/60 text-xs uppercase tracking-widest mt-0.5">no pet fee</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Main content ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12 items-start">

            {/* Left column — main content */}
            <div className="min-w-0">

              {/* Editorial intro */}
              <section aria-label="Introduction" className="mb-12">
                <div className="prose prose-lg prose-gray max-w-none">
                  {introParagraphs.map((p, i) => (
                    <p key={i} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
                      {p}
                    </p>
                  ))}
                </div>
              </section>

              {/* Hotel ranked list */}
              <section aria-label="Hotel list">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
                  Our Top {comboHotels.length} {catName} Hotels in {dest.name}
                </h2>

                {comboHotels.length > 0 ? (
                  <div className="flex flex-col gap-6">
                    {comboHotels.map((hotel, i) => (
                      <HotelRankedCard
                        key={hotel.id}
                        hotel={hotel}
                        rank={i + 1}
                        destName={dest.name}
                        catName={catName}
                        dict={p}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-gray-400 bg-white rounded-2xl">
                    <span className="text-5xl block mb-4">{cat.emoji}</span>
                    <p className="text-lg">{p.noHotels}</p>
                  </div>
                )}
              </section>

              {/* Tips section */}
              <section aria-label="Selection guide" className="mt-16">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                  💡 How to choose the right {catName.toLowerCase()} hotel in {dest.name}
                </h2>
                <p className="text-gray-500 text-sm mb-8">
                  Five things experienced pet-owning travellers check before booking.
                </p>
                <ol className="flex flex-col gap-4">
                  {tips.map((tip) => (
                    <li key={tip.n} className="flex gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                      <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white text-sm font-black shadow-sm shadow-blue-200">
                        {tip.n}
                      </span>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{tip.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{tip.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* FAQ section */}
              <section aria-label="Frequently asked questions" className="mt-16">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
                  Frequently Asked Questions
                </h2>
                <div className="flex flex-col gap-3">
                  {faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                    >
                      <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none select-none hover:bg-gray-50 transition-colors">
                        <span className="font-semibold text-gray-900 text-sm lg:text-base pr-2">
                          {faq.q}
                        </span>
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 group-open:bg-blue-100 flex items-center justify-center transition-colors">
                          <span className="text-gray-500 group-open:text-blue-600 text-xs font-bold transition-colors group-open:rotate-45 inline-block transition-transform">
                            +
                          </span>
                        </span>
                      </summary>
                      <div className="px-6 pb-5 pt-1">
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* Affiliate disclosure */}
              <p className="mt-8 text-xs text-gray-400 leading-relaxed">
                {dict.footer.disclosureText}
              </p>
            </div>

            {/* Right column — sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-6 flex flex-col gap-5">

                {/* Quick CTA */}
                <div className={`bg-gradient-to-br ${cat.gradient} rounded-3xl p-6 text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative">
                    <p className="text-3xl mb-2">{cat.emoji}</p>
                    <h3 className="font-extrabold text-lg mb-1">{p.ctaTitle}</h3>
                    <p className="text-white/70 text-xs mb-4 leading-relaxed">{p.ctaDesc}</p>
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="block text-center bg-white text-gray-900 font-bold text-sm py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
                    >
                      {p.ctaButton} →
                    </a>
                  </div>
                </div>

                {/* Other categories in this destination */}
                {relatedByDest.length > 0 && (
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-sm mb-4">
                      More guides in {dest.name}
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {relatedByDest.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/${locale}/${dest.slug}/${c.slug}`}
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors py-1"
                          >
                            <span>{c.emoji}</span>
                            <span>{getCategoryName(c, locale as Locale)} in {dest.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Same category, other destinations */}
                {relatedByCategory.length > 0 && (
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-sm mb-4">
                      {catName} hotels elsewhere
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {relatedByCategory.map((d) => (
                        <li key={d.slug}>
                          <Link
                            href={`/${locale}/${d.slug}/${cat.slug}`}
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors py-1"
                          >
                            <span>{d.flag}</span>
                            <span>{catName} in {d.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            </aside>
          </div>
        </div>

        {/* ── Related guides (mobile + bottom) ── */}
        <section
          aria-label="Related guides"
          className="bg-white border-t border-gray-100 py-14"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-8">Related guides</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedByDest.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${locale}/${dest.slug}/${c.slug}`}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${c.gradient} p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="relative">
                    <span className="text-2xl block mb-2">{c.emoji}</span>
                    <p className="text-white font-bold text-sm leading-tight">
                      {getCategoryName(c, locale as Locale)}
                    </p>
                    <p className="text-white/70 text-xs mt-0.5">{dest.name}</p>
                  </div>
                </Link>
              ))}
              {relatedByCategory.map((d) => (
                <Link
                  key={d.slug}
                  href={`/${locale}/${d.slug}/${cat.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="relative">
                    <span className="text-2xl block mb-2">{d.flag}</span>
                    <p className="text-white font-bold text-sm leading-tight">{catName}</p>
                    <p className="text-white/70 text-xs mt-0.5">{d.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA banner ── */}
        <section
          aria-label="Booking call to action"
          className="bg-gradient-to-br from-slate-900 to-blue-950 py-16"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-5xl block mb-4">{cat.emoji}</span>
            <h2 className="text-3xl font-extrabold text-white mb-3">{p.ctaTitle}</h2>
            <p className="text-blue-200 text-base mb-8 max-w-xl mx-auto">{p.ctaDesc}</p>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-200 shadow-xl hover:-translate-y-0.5"
            >
              {p.ctaButton} →
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
