import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { existsSync } from 'fs'
import { join } from 'path'
import type { Metadata } from 'next'
import { getDictionary, hasLocale, locales, type Locale } from '@/app/[locale]/dictionaries'
import HotelCard from '@/components/HotelCard'
import PetMap from '@/components/PetMap'
import destinations from '@/data/destinations.json'
import categories from '@/data/categories.json'
import hotels from '@/data/hotels.json'
import { SITE_URL } from '@/lib/site'
import { generateDestIntro, generateDestFaqs, destContextByLocale } from '@/lib/editorial'
import cityContent from '@/lib/cityContent'

type DestWithWeather = typeof destinations[number] & {
  weather?: Record<string, { temp: number; desc: string; icon: string }>
}

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: PageProps<'/[locale]/destinations/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(locale)) return {}
  const dest = destinations.find((d) => d.slug === slug)
  if (!dest) return {}

  const destHotels = hotels.filter((h) => h.destinationSlug === slug)
  const minPrice = destHotels.length > 0 ? Math.min(...destHotels.map(h => h.priceFrom).filter(Boolean)) : null
  const hotelCount = destHotels.length

  const year = new Date().getFullYear()
  const titleTemplates: Record<string, string> = {
    en: `${dest.name} Pet-Friendly Hotels (${year}): Verified Policies | HotelsWithPets.com`,
    fr: `Hôtels avec animaux à ${dest.name} (${year}): Politiques vérifiées | HotelsWithPets.com`,
    es: `Hoteles con mascotas en ${dest.name} (${year}): Políticas verificadas | HotelsWithPets.com`,
  }
  const descTemplates: Record<string, string> = {
    en: `Find ${hotelCount} pet-friendly hotels in ${dest.name}, ${dest.country}. Verified policies, from €${minPrice}/night. Compare and book on Booking.com.`,
    fr: `Trouvez ${hotelCount} hôtels acceptant les animaux à ${dest.name}. Politiques vérifiées, dès €${minPrice}/nuit. Réservez sur Booking.com.`,
    es: `Encuentra ${hotelCount} hoteles con mascotas en ${dest.name}. Políticas verificadas, desde €${minPrice}/noche. Reserva en Booking.com.`,
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

  const dest = destinations.find((d) => d.slug === slug) as DestWithWeather | undefined
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

  const hasGuide = existsSync(join(process.cwd(), `data/city-guides/${slug}.json`))

  const GUIDES = [
    { slug: 'restaurants', emoji: '🍽️', en: 'Restaurants',     fr: 'Restaurants',       es: 'Restaurantes',          gradient: 'from-orange-500 to-amber-500' },
    { slug: 'parks',       emoji: '🌳', en: 'Parks & Walks',   fr: 'Parcs & Balades',   es: 'Parques y Paseos',      gradient: 'from-emerald-500 to-teal-500' },
    { slug: 'transport',   emoji: '🚇', en: 'Transport',        fr: 'Transport',          es: 'Transporte',            gradient: 'from-blue-500 to-cyan-500' },
    { slug: 'beaches',     emoji: '🏖️', en: 'Beaches',          fr: 'Plages',             es: 'Playas',                gradient: 'from-cyan-500 to-blue-400' },
    { slug: 'attractions', emoji: '🏛️', en: 'Attractions',      fr: 'À visiter',          es: 'Qué ver',               gradient: 'from-indigo-500 to-violet-500' },
    { slug: 'petsitting',  emoji: '🐶', en: 'Pet Sitting',      fr: 'Garde animaux',      es: 'Cuidado mascotas',      gradient: 'from-pink-500 to-rose-400' },
    { slug: 'vets',        emoji: '🏥', en: 'Vets',             fr: 'Vétérinaires',       es: 'Veterinarios',          gradient: 'from-red-500 to-rose-500' },
    { slug: 'tips',        emoji: '💡', en: 'Local Tips',       fr: 'Conseils locaux',    es: 'Consejos locales',      gradient: 'from-violet-500 to-purple-600' },
  ]

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

  const destSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: dest.name,
    description: localeIntro || dest.intro,
    url: `${base}/${locale}/destinations/${dest.slug}`,
    touristType: { '@type': 'Audience', audienceType: 'Pet owners' },
    containsPlace: destHotels.map((hotel) => ({
      '@type': 'LodgingBusiness',
      name: hotel.name,
      url: hotel.bookingUrl,
      petsAllowed: true,
      priceRange: '€'.repeat(Math.max(1, hotel.stars - 2)),
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(destSchema) }} />
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-20 relative overflow-hidden">
        {/* City landmark photo background */}
        {dest.heroImage && (
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={dest.heroImage}
              alt={dest.name}
              fill
              sizes="100vw"
              className="object-cover opacity-20"
              priority
            />
          </div>
        )}
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
              <p className="text-blue-300 text-lg">
                <Link
                  href={`/${locale}/countries/${dest.country.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                  className="hover:text-white transition-colors underline decoration-blue-500/30 hover:decoration-white/50"
                >
                  {dest.country}
                </Link>
              </p>
              <p className="text-blue-200 text-base mt-2 max-w-2xl leading-relaxed">{localeIntro}</p>
              {/* Price + hotel count stats */}
              {destHotels.length > 0 && (
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <span className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-4 py-1.5 text-sm text-white/90">
                    🏨 {destHotels.length} {locale === 'fr' ? 'hôtels' : locale === 'es' ? 'hoteles' : 'hotels'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-4 py-1.5 text-sm text-white/90">
                    💶 {locale === 'fr' ? 'Dès' : locale === 'es' ? 'Desde' : 'From'} €{Math.min(...destHotels.map(h => h.priceFrom).filter(Boolean))}/night
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pet passport alert for destinations with special entry rules ── */}
      {['edinburgh', 'dublin', 'helsinki', 'reykjavik', 'oslo'].includes(slug) && (() => {
        const alerts: Record<string, Record<string, { icon: string; text: string }>> = {
          edinburgh: {
            fr: { icon: '⚠️', text: `Le Royaume-Uni n'accepte plus le passeport européen post-Brexit. Un Certificat Sanitaire Animal (AHC) est obligatoire pour entrer avec votre animal.` },
            en: { icon: '⚠️', text: `The UK no longer accepts the EU pet passport post-Brexit. An Animal Health Certificate (AHC) is required to enter with your pet.` },
            es: { icon: '⚠️', text: `El Reino Unido ya no acepta el pasaporte europeo post-Brexit. Se requiere un Certificado Sanitario Animal (AHC) para entrar con tu mascota.` },
          },
          dublin: {
            fr: { icon: '⚠️', text: `L'Irlande exige un traitement antiparasite tapeworm pour les chiens (24–120h avant l'arrivée) et l'entrée par un port approuvé.` },
            en: { icon: '⚠️', text: `Ireland requires a tapeworm treatment for dogs (24–120h before arrival) and entry via an approved port.` },
            es: { icon: '⚠️', text: `Irlanda exige un tratamiento antiparasitario contra tenias para perros (24-120h antes de la llegada) y la entrada por un puerto aprobado.` },
          },
          helsinki: {
            fr: { icon: '⚠️', text: `La Finlande exige un traitement antiparasite échinocoque 1 à 5 jours avant l'entrée, en plus du passeport européen standard.` },
            en: { icon: '⚠️', text: `Finland requires an Echinococcus (tapeworm) treatment 1–5 days before entry, in addition to the standard EU passport.` },
            es: { icon: '⚠️', text: `Finlandia exige un tratamiento contra Echinococcus (tenia) 1-5 días antes de la entrada, además del pasaporte UE estándar.` },
          },
          reykjavik: {
            fr: { icon: '⚠️', text: `L'Islande a des règles très strictes : test de titration antirabique + permis d'importation + traitement antiparasitaire. Prévoyez 6 mois à l'avance.` },
            en: { icon: '⚠️', text: `Iceland has very strict rules: rabies titer test + import permit + anti-parasite treatment. Allow 6 months to prepare.` },
            es: { icon: '⚠️', text: `Islandia tiene normas muy estrictas: test de titulación antirrábica + permiso de importación + tratamiento antiparasitario. Prevé 6 meses de antelación.` },
          },
          oslo: {
            fr: { icon: '⚠️', text: `La Norvège exige un traitement tapeworm 1 à 5 jours avant l'entrée. Les documents UE sont acceptés mais des règles supplémentaires s'appliquent.` },
            en: { icon: '⚠️', text: `Norway requires a tapeworm treatment 1–5 days before entry. EU documents are accepted but extra rules apply.` },
            es: { icon: '⚠️', text: `Noruega exige un tratamiento contra tenias 1-5 días antes de la entrada. Los documentos UE son aceptados, pero se aplican normas adicionales.` },
          },
        }
        const lang = locale === 'fr' || locale === 'es' ? locale : 'en'
        const alert = alerts[slug]?.[lang]
        if (!alert) return null
        const guideLabel = locale === 'fr' ? 'Voir le guide complet' : locale === 'es' ? 'Ver guía completa' : 'See full guide'
        return (
          <div className="bg-amber-50 border-b border-amber-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <p className="text-sm text-amber-800 flex items-start gap-2 flex-1">
                  <span className="flex-shrink-0 text-base">{alert.icon}</span>
                  <span><strong>{locale === 'fr' ? 'Attention passeport animal :' : locale === 'es' ? 'Atención pasaporte mascota:' : 'Pet passport alert:'}</strong> {alert.text}</span>
                </p>
                <Link href={`/${locale}/guides/passeport-animal`}
                  className="flex-shrink-0 text-xs font-semibold text-amber-700 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-200 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap">
                  {guideLabel} →
                </Link>
              </div>
            </div>
          </div>
        )
      })()}

      {/* ── Editorial Snapshot ── */}
      {(() => {
        const ctx = destContextByLocale['en']?.[slug]
        const avgRating = destHotels.length > 0
          ? (destHotels.reduce((s, h) => s + h.rating, 0) / destHotels.length).toFixed(1)
          : null
        const freeCount = destHotels.filter(h => h.petFee === 0).length
        const minPrice = destHotels.length > 0 ? Math.min(...destHotels.map(h => h.priceFrom).filter(Boolean)) : null

        const statsLabel = {
          hotels:  locale === 'fr' ? 'hôtels pet-friendly' : locale === 'es' ? 'hoteles pet-friendly' : 'pet-friendly hotels',
          rating:  locale === 'fr' ? 'note moyenne' : locale === 'es' ? 'nota media' : 'avg. rating',
          free:    locale === 'fr' ? 'sans frais animaux' : locale === 'es' ? 'sin cargo mascotas' : 'with no pet fee',
          from:    locale === 'fr' ? 'dès' : locale === 'es' ? 'desde' : 'from',
          night:   locale === 'fr' ? '/nuit' : locale === 'es' ? '/noche' : '/night',
          whyTitle: locale === 'fr' ? `Pourquoi ${dest.name} avec votre animal ?` : locale === 'es' ? `¿Por qué ${dest.name} con tu mascota?` : `Why ${dest.name} with your pet?`,
          highlight: locale === 'fr' ? 'À ne pas manquer' : locale === 'es' ? 'No te pierdas' : 'Top spot',
          area: locale === 'fr' ? 'Quartiers idéaux' : locale === 'es' ? 'Barrios ideales' : 'Best area',
        }

        return (
          <section className="bg-white border-b border-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Stats row */}
              <div className="flex flex-wrap gap-3 mb-8">
                {destHotels.length > 0 && (
                  <div className="flex items-center gap-2 bg-blue-50 rounded-2xl px-5 py-3">
                    <span className="text-2xl font-black text-blue-700">{destHotels.length}</span>
                    <span className="text-sm text-blue-600">{statsLabel.hotels}</span>
                  </div>
                )}
                {avgRating && (
                  <div className="flex items-center gap-2 bg-amber-50 rounded-2xl px-5 py-3">
                    <span className="text-2xl font-black text-amber-600">⭐ {avgRating}</span>
                    <span className="text-sm text-amber-700">{statsLabel.rating}</span>
                  </div>
                )}
                {freeCount > 0 && (
                  <div className="flex items-center gap-2 bg-emerald-50 rounded-2xl px-5 py-3">
                    <span className="text-2xl font-black text-emerald-700">{freeCount}</span>
                    <span className="text-sm text-emerald-600">{statsLabel.free}</span>
                  </div>
                )}
                {minPrice && (
                  <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-5 py-3">
                    <span className="text-2xl font-black text-gray-800">{statsLabel.from} €{minPrice}</span>
                    <span className="text-sm text-gray-500">{statsLabel.night}</span>
                  </div>
                )}
              </div>

              {/* Editorial context */}
              {ctx && (
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Why this city */}
                  <div className="md:col-span-1 bg-indigo-50 rounded-2xl p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">{statsLabel.whyTitle}</p>
                    <p className="text-gray-800 text-sm leading-relaxed">{dest.name} {locale === 'fr' ? 'est' : locale === 'es' ? 'es' : 'is'} {ctx.personality}.</p>
                  </div>
                  {/* Top spot */}
                  <div className="bg-emerald-50 rounded-2xl p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-2">📍 {statsLabel.highlight}</p>
                    <p className="text-gray-800 text-sm leading-relaxed">{ctx.highlight}.</p>
                  </div>
                  {/* Best area */}
                  <div className="bg-amber-50 rounded-2xl p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">🏘️ {statsLabel.area}</p>
                    <p className="text-gray-800 text-sm leading-relaxed">{ctx.area}.</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )
      })()}

      {/* ── Rich city content (history + sights + tips) ── */}
      {cityContent[slug] && (() => {
        const cc = cityContent[slug]
        const lang = locale === 'fr' || locale === 'es' ? locale : 'en'
        const historyTitle = locale === 'fr' ? `Amsterdam : histoire et caractère` : locale === 'es' ? `Ámsterdam: historia y carácter` : `${dest.name}: history & character`
        const sightsTitle = locale === 'fr' ? 'Points clés à visiter' : locale === 'es' ? 'Puntos clave que visitar' : 'Key sights'
        const petsTitle = locale === 'fr' ? 'Voyager avec son animal à Amsterdam' : locale === 'es' ? 'Viajar con mascota en Ámsterdam' : 'Travelling with a pet in Amsterdam'
        const practicalTitle = locale === 'fr' ? 'Infos pratiques' : locale === 'es' ? 'Información práctica' : 'Practical info'
        const petFriendlyLabel = locale === 'fr' ? 'Accès animaux' : locale === 'es' ? 'Acceso mascotas' : 'Pet-friendly'
        const restrictedLabel = locale === 'fr' ? 'Animaux non admis' : locale === 'es' ? 'No mascotas' : 'Pets restricted'
        return (
          <section className="py-14 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* History */}
              <div className="max-w-3xl mb-12">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{historyTitle}</h2>
                <p className="text-gray-600 leading-relaxed text-[15px]">{cc.history[lang]}</p>
              </div>

              {/* Sights */}
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{sightsTitle}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {cc.sights.map((sight) => (
                  <div key={sight.name} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-2xl flex-shrink-0">{sight.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-bold text-gray-900 text-sm">{sight.name}</h3>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${sight.petFriendly ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                            {sight.petFriendly ? `✓ ${petFriendlyLabel}` : `⚠ ${restrictedLabel}`}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{sight.desc[lang]}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pet tips + Practical side by side */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🐾</span> {petsTitle}
                  </h2>
                  <ul className="space-y-3">
                    {cc.petTips[lang].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                    <span>ℹ️</span> {practicalTitle}
                  </h2>
                  <ul className="space-y-2">
                    {cc.practicalInfo[lang].map((info, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="text-gray-300 flex-shrink-0 mt-1">•</span>
                        {info}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </section>
        )
      })()}

      {/* City Guides. Prominent, right after hero */}
      {hasGuide && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="mb-10">
              <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
                🐾 {locale === 'fr' ? 'Guide voyage' : locale === 'es' ? 'Guía de viaje' : 'Travel guide'}
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
                {locale === 'fr'
                  ? `Guide complet de ${dest.name} avec votre animal`
                  : locale === 'es'
                  ? `Guía completa de ${dest.name} con tu mascota`
                  : `Complete ${dest.name} pet travel guide`}
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl">
                {locale === 'fr'
                  ? `Restaurants, parcs, transports, plages, vétérinaires. Tout ce qu'il faut savoir pour ${dest.name} avec votre animal.`
                  : locale === 'es'
                  ? `Restaurantes, parques, transporte, playas, veterinarios. Todo lo que necesitas saber para ${dest.name} con tu mascota.`
                  : `Restaurants, parks, transport, beaches, vets. Everything you need to know for ${dest.name} with your pet.`}
              </p>
            </div>

            {/* Guide cards. Premium 4-column grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {GUIDES.map((g) => {
                const guideDescriptions: Record<string, { en: string; fr: string; es: string }> = {
                  restaurants: { en: 'Terrace cafés & dog-welcoming spots', fr: 'Terrasses & restos qui adorent les animaux', es: 'Terrazas y restaurantes pet-friendly' },
                  parks: { en: 'Off-leash zones, trails & green spaces', fr: 'Zones sans laisse, balades & parcs', es: 'Zonas sin correa, rutas y parques' },
                  transport: { en: 'Metros, trains & pet travel rules', fr: 'Métros, trains & règles pour animaux', es: 'Metros, trenes y normas para mascotas' },
                  beaches: { en: 'Dog-friendly beaches & coastal walks', fr: 'Plages acceptant les chiens & côtes', es: 'Playas para perros y paseos costeros' },
                  attractions: { en: 'Sights, museums & things to do', fr: 'Sites, musées & activités incontournables', es: 'Lugares, museos y qué hacer' },
                  petsitting: { en: 'Trusted sitters & day care services', fr: 'Garderies et sitters de confiance', es: 'Cuidadores y guarderías de confianza' },
                  vets: { en: 'Emergency vets & animal clinics', fr: 'Urgences vétérinaires & cliniques', es: 'Veterinarios de urgencia y clínicas' },
                  tips: { en: 'Local rules, habits & insider tips', fr: 'Règles locales, habitudes & astuces', es: 'Normas locales, costumbres y consejos' },
                }
                const desc = guideDescriptions[g.slug]
                const descText = locale === 'fr' ? desc?.fr : locale === 'es' ? desc?.es : desc?.en
                const label = locale === 'fr' ? g.fr : locale === 'es' ? g.es : g.en

                return (
                  <Link
                    key={g.slug}
                    href={`/${locale}/destinations/${slug}/${g.slug}`}
                    className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-transparent shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    {/* Gradient top stripe */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${g.gradient} flex-shrink-0`} />

                    <div className="p-5 flex flex-col flex-1">
                      {/* Emoji + arrow row */}
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${g.gradient} flex items-center justify-center text-2xl shadow-sm flex-shrink-0`}>
                          {g.emoji}
                        </div>
                        <span className="text-gray-300 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200 text-lg font-light mt-1">
                          →
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-gray-900 text-base leading-tight mb-1 group-hover:text-blue-700 transition-colors">
                        {label}
                      </h3>

                      {/* Description */}
                      {descText && (
                        <p className="text-xs text-gray-400 leading-relaxed mt-auto pt-2">
                          {descText}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {presentCategories.length > 0 && (
        <section className="py-16 bg-gray-50 border-t border-gray-100">
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
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
              🗺️ {locale === 'fr' ? `Carte des hôtels pet-friendly à ${dest.name}` : locale === 'es' ? `Mapa de hoteles pet-friendly en ${dest.name}` : `Pet-friendly hotel map: ${dest.name}`}
            </h2>
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

      {/* Weather section */}
      {dest.weather && (
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">
              🌡️ {locale === 'fr' ? `Météo typique à ${dest.name}` : locale === 'es' ? `Clima típico en ${dest.name}` : `Typical weather in ${dest.name}`}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {locale === 'fr' ? 'Températures moyennes. Idéal pour planifier votre séjour avec votre animal' : locale === 'es' ? 'Temperaturas medias. Ideal para planificar su estancia con su mascota' : 'Average temperatures. Ideal for planning your pet trip'}
            </p>
            {(() => {
              const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
              const monthLabels: Record<string, Record<string, string>> = {
                en: {jan:'Jan',feb:'Feb',mar:'Mar',apr:'Apr',may:'May',jun:'Jun',jul:'Jul',aug:'Aug',sep:'Sep',oct:'Oct',nov:'Nov',dec:'Dec'},
                fr: {jan:'Jan',feb:'Fév',mar:'Mar',apr:'Avr',may:'Mai',jun:'Jun',jul:'Jul',aug:'Aoû',sep:'Sep',oct:'Oct',nov:'Nov',dec:'Déc'},
                es: {jan:'Ene',feb:'Feb',mar:'Mar',apr:'Abr',may:'May',jun:'Jun',jul:'Jul',aug:'Ago',sep:'Sep',oct:'Oct',nov:'Nov',dec:'Dic'},
              }
              const currentMonth = months[new Date().getMonth()]
              const labels = monthLabels[locale] ?? monthLabels.en
              const weather = dest.weather as Record<string, { temp: number; desc: string; icon: string }>

              // Find best months (warmest but not too hot, if beach; or just pleasant temp 15-25)
              const bestMonths = months.filter(m => {
                const t = weather[m]?.temp ?? 0
                return t >= 15 && t <= 26
              })

              return (
                <div>
                  <div className="overflow-x-auto pb-2">
                    <div className="flex gap-2 min-w-max">
                      {months.map(m => {
                        const w = weather[m]
                        const isCurrent = m === currentMonth
                        const isBest = bestMonths.includes(m)
                        return (
                          <div
                            key={m}
                            className={`flex flex-col items-center rounded-2xl p-3 min-w-[72px] border transition-all ${
                              isCurrent
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                                : isBest
                                ? 'bg-green-50 border-green-200 text-gray-900'
                                : 'bg-gray-50 border-gray-100 text-gray-700'
                            }`}
                          >
                            <span className="text-xs font-semibold uppercase tracking-wide opacity-70">{labels[m]}</span>
                            <span className="text-xl my-1">{w?.icon ?? '🌡️'}</span>
                            <span className="text-lg font-black">{w?.temp ?? '?'}°</span>
                            {isBest && !isCurrent && (
                              <span className="text-xs text-green-600 font-semibold mt-0.5">✓ Best</span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  {bestMonths.length > 0 && (
                    <p className="mt-4 text-sm text-gray-500">
                      🐾 {locale === 'fr' ? `Meilleurs mois pour voyager avec un animal à ${dest.name} : ` : locale === 'es' ? `Mejores meses para viajar con mascota en ${dest.name}: ` : `Best months to travel with a pet in ${dest.name}: `}
                      <span className="font-semibold text-gray-700">
                        {bestMonths.map(m => (monthLabels[locale] ?? monthLabels.en)[m]).join(', ')}
                      </span>
                    </p>
                  )}
                </div>
              )
            })()}
          </div>
        </section>
      )}

      {/* Hotels */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
            {p.hotelsTitle}: {dest.name}
          </h2>
          {destHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} dict={p} locale={locale as string} destName={dest.name} destCountry={dest.country} />
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

      {/* Explore by category. Rich links */}
      {presentCategories.length > 0 && (
        <section className="py-12 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">
              {locale === 'fr' ? `Explorer les hôtels à ${dest.name} par type` : locale === 'es' ? `Explorar hoteles en ${dest.name} por tipo` : `Explore ${dest.name} hotels by type`}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {presentCategories.map((cat) => {
                const count = destHotels.filter(h => h.categories.includes(cat.slug)).length
                const catName = getCategoryName(cat, locale as Locale)
                return (
                  <Link
                    key={cat.slug}
                    href={`/${locale}/${dest.slug}/${cat.slug}`}
                    className="flex items-center gap-3 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-2xl px-4 py-3 transition-all group"
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{catName}</p>
                      <p className="text-xs text-gray-400">{count} {locale === 'fr' ? 'hôtels' : locale === 'es' ? 'hoteles' : 'hotels'}</p>
                    </div>
                    <span className="ml-auto text-gray-300 group-hover:text-blue-400 transition-colors">→</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

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
