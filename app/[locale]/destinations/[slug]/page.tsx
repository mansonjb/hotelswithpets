import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { existsSync } from 'fs'
import { join } from 'path'
import type { Metadata } from 'next'
import { getDictionary, hasLocale, type Locale } from '@/app/[locale]/dictionaries'
import HotelCard from '@/components/HotelCard'
import PetMap from '@/components/PetMap'
import destinations from '@/data/destinations.json'
import categories from '@/data/categories.json'
import hotels from '@/data/hotels.json'
import { SITE_URL } from '@/lib/site'
import { generateDestIntro, generateDestFaqs, destContextByLocale } from '@/lib/editorial'
import cityContent from '@/lib/cityContent'
import { getLocalizedCityName } from '@/lib/cityNames'
import { getLocalizedCountryName } from '@/lib/countries'
import SisterSites from '@/components/SisterSites'
import RelatedDestinations from '@/components/RelatedDestinations'
import { getVibes, getSimilarDestinations, getCountryDestinations } from '@/lib/destination-similarity'

type DestWithWeather = typeof destinations[number] & {
  weather?: Record<string, { temp: number; desc: string; icon: string }>
}

// On-demand ISR rendering to reduce build output file count (same fix as
// hotels/[slug] and [destination]/[category]: this is the exact route family
// the daily hwp-ship-city-16h cron touches, was rebuilding all 377
// destinations × 4 locales = ~1,508 pages for a single new destination).
export const dynamicParams = true
export const revalidate = 86400 // 1 day ISR cache
export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: PageProps<'/[locale]/destinations/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(locale)) return {}
  const dest = destinations.find((d) => d.slug === slug)
  if (!dest) return {}

  const destHotels = hotels.filter((h) => h.destinationSlug === slug)
  const minPrice = destHotels.length > 0 ? Math.min(...destHotels.map(h => h.priceFrom).filter(Boolean)) : null
  const hotelCount = destHotels.length

  if (hotelCount === 0) {
    return { robots: { index: false, follow: false } }
  }

  const year = new Date().getFullYear()
  const cityFr = getLocalizedCityName(dest.slug, dest.name, 'fr')
  const cityEs = getLocalizedCityName(dest.slug, dest.name, 'es')
  const cityPt = getLocalizedCityName(dest.slug, dest.name, 'pt')
  const countryFr = getLocalizedCountryName(dest.country, 'fr')
  const countryEs = getLocalizedCountryName(dest.country, 'es')
  const countryPt = getLocalizedCountryName(dest.country, 'pt')
  const cityDe = getLocalizedCityName(dest.slug, dest.name, 'de')
  const countryDe = getLocalizedCountryName(dest.country, 'de')
  const cityNl = getLocalizedCityName(dest.slug, dest.name, 'nl')
  const countryNl = getLocalizedCountryName(dest.country, 'nl')
  // SERP titles optimised for real query patterns (GSC May 2026 data):
  // ES: "hoteles madrid mascotas", "hoteles pet friendly madrid", "hotel con mascotas madrid", "hoteles que admiten mascotas"
  // FR: "hôtel accepte chiens X", "hôtels animaux acceptés à X", "hôtels pet-friendly X"
  // EN: "dog friendly hotel X", "pet friendly hotel X", "cat friendly hotel X"
  // PT: "hotéis que aceitam animais X", "hotéis pet-friendly X", "hotel com cães X"
  const titleTemplates: Record<string, string> = {
    en: `${hotelCount} Pet-Friendly Hotels in ${dest.name} (${year}), Dog & Cat Friendly Stays Verified`,
    fr: `${hotelCount} hôtels acceptant les animaux à ${cityFr} (${year}), Chiens et chats bienvenus`,
    es: `${hotelCount} hoteles que admiten mascotas en ${cityEs} (${year}), Hoteles pet-friendly verificados`,
    pt: `${hotelCount} hotéis que aceitam animais em ${cityPt} (${year}), Cães e gatos bem-vindos`,
    de: `${hotelCount} haustierfreundliche Hotels in ${cityDe} (${year}), geprüfte Aufenthalte für Hund & Katze`,
    nl: `${hotelCount} huisdiervriendelijke hotels in ${cityNl} (${year}), geverifieerde verblijven voor hond & kat`,
  }
  const descTemplates: Record<string, string> = {
    en: `${hotelCount} verified dog- and cat-friendly hotels in ${dest.name}, ${dest.country} from €${minPrice}/night. Pet fees, weight limits and policies clearly listed. Book on Booking.com.`,
    fr: `${hotelCount} hôtels pet-friendly vérifiés à ${cityFr}, ${countryFr} dès ${minPrice} €/nuit. Supplément animaux, poids maximum et conditions clairement détaillés. Réservez sur Booking.com.`,
    es: `${hotelCount} hoteles que admiten perros y gatos en ${cityEs}, ${countryEs} desde ${minPrice} €/noche. Suplemento mascotas, peso máximo y condiciones detalladas. Reserva en Booking.com.`,
    pt: `${hotelCount} hotéis verificados que aceitam cães e gatos em ${cityPt}, ${countryPt} a partir de ${minPrice} €/noite. Suplemento para animais, peso máximo e condições claramente detalhados. Reserve na Booking.com.`,
    de: `${hotelCount} geprüfte hunde- und katzenfreundliche Hotels in ${cityDe}, ${countryDe} ab ${minPrice} €/Nacht. Haustiergebühren, Gewichtsgrenzen und Richtlinien klar aufgeführt. Buchen auf Booking.com.`,
    nl: `${hotelCount} geverifieerde hond- en katvriendelijke hotels in ${cityNl}, ${countryNl} vanaf €${minPrice}/nacht. Huisdiertoeslag, gewichtslimieten en beleid duidelijk vermeld. Boek op Booking.com.`,
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
        pt: `${SITE_URL}/pt/destinations/${slug}`,
        de: `${SITE_URL}/de/destinations/${slug}`,
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
  const localizedName = getLocalizedCityName(slug, dest.name, locale)

  const destHotels = hotels.filter((h) => h.destinationSlug === slug)
  const localizedCountry = getLocalizedCountryName(dest.country, locale)
  const localeIntro = generateDestIntro(slug, localizedName, localizedCountry, locale) || dest.intro
  const faqs = generateDestFaqs(slug, localizedName, localizedCountry, destHotels.length, locale)

  // Find which categories have hotels here
  const presentCategorySlugs = new Set(destHotels.flatMap((h) => h.categories))
  const presentCategories = categories.filter((c) => presentCategorySlugs.has(c.slug))

  // Visual internal linking: vibes, similar destinations, country destinations
  const currentVibes = getVibes(slug, hotels)
  const similarDests = getSimilarDestinations(slug, destinations, hotels, 6)
  const countryDests = getCountryDestinations(slug, dest.country, destinations, hotels, 6)
  // Quick links strip (mid-page): next 4-6 country destinations after the 6 shown in footer cards
  const quickLinks = getCountryDestinations(slug, dest.country, destinations, hotels, 10).slice(6, 10)

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

  const base = 'https://www.hotelswithpets.com'
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
        url: `${SITE_URL}/${locale}/hotels/${hotel.slug}`,
        sameAs: hotel.bookingUrl,
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
      url: `${SITE_URL}/${locale}/hotels/${hotel.slug}`,
      sameAs: hotel.bookingUrl,
      petsAllowed: true,
      priceRange: '€'.repeat(Math.max(1, hotel.stars - 2)),
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      {faqs && faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(destSchema) }} />
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-20 relative overflow-hidden">
        {/* City landmark photo background */}
        {dest.heroImage && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        <div className="absolute top-0 right-0 w-80 h-80 text-[12rem] opacity-5 select-none pointer-events-none flex items-center justify-center">
          {dest.flag}
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href={`/${locale}/destinations`} className="inline-flex items-center gap-1 text-blue-300 hover:text-white hover:underline underline-offset-4 text-sm font-medium transition-colors">
              {dict.pages.destination.back}
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-6xl lg:text-8xl">{dest.flag}</span>
            <div>
              <h1 className="text-4xl lg:text-6xl font-extrabold mb-2">{localizedName}</h1>
              <p className="text-blue-300 text-lg">
                <Link
                  href={`/${locale}/countries/${dest.country.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                  className="hover:text-white transition-colors underline decoration-blue-500/30 hover:decoration-white/50"
                >
                  {localizedCountry}
                </Link>
              </p>
              <p className="text-blue-200 text-base mt-2 max-w-2xl leading-relaxed">{localeIntro}</p>
              {/* Price + hotel count stats */}
              {destHotels.length > 0 && (
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <span className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-4 py-1.5 text-sm text-white/90">
                    🏨 {destHotels.length} {locale === 'fr' ? 'hôtels' : locale === 'es' ? 'hoteles' : locale === 'pt' ? 'hotéis' : locale === 'de' ? 'Hotels' : locale === 'nl' ? 'hotels' : 'hotels'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-4 py-1.5 text-sm text-white/90">
                    💶 {locale === 'fr' ? 'Dès' : locale === 'es' ? 'Desde' : locale === 'pt' ? 'Desde' : locale === 'de' ? 'Ab' : locale === 'nl' ? 'Vanaf' : 'From'} €{Math.min(...destHotels.map(h => h.priceFrom).filter(Boolean))}{locale === 'de' ? '/Nacht' : locale === 'nl' ? '/nacht' : locale === 'fr' ? '/nuit' : locale === 'es' ? '/noche' : locale === 'pt' ? '/noite' : '/night'}
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
            de: { icon: '⚠️', text: `Das Vereinigte Königreich akzeptiert seit dem Brexit den EU-Heimtierausweis nicht mehr. Für die Einreise mit Ihrem Tier ist ein Animal Health Certificate (AHC) erforderlich.` },
            nl: { icon: '⚠️', text: `Het VK accepteert het Europese dierenpaspoort na de Brexit niet meer. Een Animal Health Certificate (AHC) is verplicht om met je huisdier binnen te komen.` },
          },
          dublin: {
            fr: { icon: '⚠️', text: `L'Irlande exige un traitement antiparasite tapeworm pour les chiens (24–120h avant l'arrivée) et l'entrée par un port approuvé.` },
            en: { icon: '⚠️', text: `Ireland requires a tapeworm treatment for dogs (24–120h before arrival) and entry via an approved port.` },
            es: { icon: '⚠️', text: `Irlanda exige un tratamiento antiparasitario contra tenias para perros (24-120h antes de la llegada) y la entrada por un puerto aprobado.` },
            de: { icon: '⚠️', text: `Irland verlangt eine Bandwurmbehandlung für Hunde (24–120 Stunden vor der Ankunft) und die Einreise über einen zugelassenen Hafen.` },
            nl: { icon: '⚠️', text: `Ierland vereist een lintwormbehandeling voor honden (24-120 uur voor aankomst) en binnenkomst via een goedgekeurde haven.` },
          },
          helsinki: {
            fr: { icon: '⚠️', text: `La Finlande exige un traitement antiparasite échinocoque 1 à 5 jours avant l'entrée, en plus du passeport européen standard.` },
            en: { icon: '⚠️', text: `Finland requires an Echinococcus (tapeworm) treatment 1–5 days before entry, in addition to the standard EU passport.` },
            es: { icon: '⚠️', text: `Finlandia exige un tratamiento contra Echinococcus (tenia) 1-5 días antes de la entrada, además del pasaporte UE estándar.` },
            de: { icon: '⚠️', text: `Finnland verlangt zusätzlich zum Standard-EU-Ausweis eine Echinokokken-Behandlung (Bandwurm) 1 bis 5 Tage vor der Einreise.` },
            nl: { icon: '⚠️', text: `Finland vereist, naast het standaard EU-paspoort, een behandeling tegen Echinococcus (lintworm) 1 tot 5 dagen voor binnenkomst.` },
          },
          reykjavik: {
            fr: { icon: '⚠️', text: `L'Islande a des règles très strictes : test de titration antirabique + permis d'importation + traitement antiparasitaire. Prévoyez 6 mois à l'avance.` },
            en: { icon: '⚠️', text: `Iceland has very strict rules: rabies titer test + import permit + anti-parasite treatment. Allow 6 months to prepare.` },
            es: { icon: '⚠️', text: `Islandia tiene normas muy estrictas: test de titulación antirrábica + permiso de importación + tratamiento antiparasitario. Prevé 6 meses de antelación.` },
            de: { icon: '⚠️', text: `Island hat sehr strenge Regeln: Tollwut-Titertest + Einfuhrgenehmigung + Parasitenbehandlung. Planen Sie 6 Monate im Voraus.` },
            nl: { icon: '⚠️', text: `IJsland hanteert zeer strenge regels: rabiës-titertest + invoervergunning + wormbehandeling. Reken op 6 maanden voorbereiding.` },
          },
          oslo: {
            fr: { icon: '⚠️', text: `La Norvège exige un traitement tapeworm 1 à 5 jours avant l'entrée. Les documents UE sont acceptés mais des règles supplémentaires s'appliquent.` },
            en: { icon: '⚠️', text: `Norway requires a tapeworm treatment 1–5 days before entry. EU documents are accepted but extra rules apply.` },
            es: { icon: '⚠️', text: `Noruega exige un tratamiento contra tenias 1-5 días antes de la entrada. Los documentos UE son aceptados, pero se aplican normas adicionales.` },
            de: { icon: '⚠️', text: `Norwegen verlangt eine Bandwurmbehandlung 1 bis 5 Tage vor der Einreise. EU-Dokumente werden akzeptiert, aber es gelten zusätzliche Regeln.` },
            nl: { icon: '⚠️', text: `Noorwegen vereist een lintwormbehandeling 1 tot 5 dagen voor binnenkomst. EU-documenten worden geaccepteerd, maar er gelden extra regels.` },
          },
        }
        const lang = locale === 'fr' || locale === 'es' || locale === 'pt' || locale === 'de' || locale === 'nl' ? locale : 'en'
        const alert = alerts[slug]?.[lang]
        if (!alert) return null
        const guideLabel = locale === 'fr' ? 'Voir le guide complet' : locale === 'es' ? 'Ver guía completa' : locale === 'pt' ? 'Ver guia completo' : locale === 'de' ? 'Vollständigen Leitfaden ansehen' : locale === 'nl' ? 'Bekijk de volledige gids' : 'See full guide'
        return (
          <div className="bg-amber-50 border-b border-amber-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <p className="text-sm text-amber-800 flex items-start gap-2 flex-1">
                  <span className="flex-shrink-0 text-base">{alert.icon}</span>
                  <span><strong>{locale === 'fr' ? 'Attention passeport animal :' : locale === 'es' ? 'Atención pasaporte mascota:' : locale === 'pt' ? 'Atenção passaporte animal:' : locale === 'de' ? 'Achtung Heimtierausweis:' : locale === 'nl' ? 'Let op dierenpaspoort:' : 'Pet passport alert:'}</strong> {alert.text}</span>
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

      {/* ── Paris-only: rich arrondissement grid encart ── */}
      {slug === 'paris' && (() => {
        const parisArrCopy = {
          en: {
            badge: '🐾 Complete guide',
            title: 'Paris neighbourhood by neighbourhood: find your perfect pet-friendly base',
            subtitle: '60 verified hotels across all 20 arrondissements - parks, vets and dog policies included.',
            cta1: 'See all 20 arrondissements',
            cta2: 'Best hotels by arrondissement',
          },
          fr: {
            badge: '🐾 Guide complet',
            title: 'Paris quartier par quartier : trouvez votre base pet-friendly ideale',
            subtitle: '60 hotels verifies dans les 20 arrondissements - parcs, vets et politique chien inclus.',
            cta1: 'Voir les 20 arrondissements',
            cta2: 'Meilleurs hotels par arrondissement',
          },
          es: {
            badge: '🐾 Guia completa',
            title: 'Paris barrio por barrio: encuentra tu base pet-friendly perfecta',
            subtitle: '60 hoteles verificados en los 20 arrondissements - parques, veterinarios y politica canina incluidos.',
            cta1: 'Ver los 20 arrondissements',
            cta2: 'Mejores hoteles por arrondissement',
          },
          pt: {
            badge: '🐾 Guia completo',
            title: 'Paris bairro a bairro: encontre a sua base pet-friendly perfeita',
            subtitle: '60 hoteis verificados nos 20 arrondissements - parques, veterinarios e politica canina incluidos.',
            cta1: 'Ver os 20 arrondissements',
            cta2: 'Melhores hoteis por arrondissement',
          },
        } as const
        type PALocale = keyof typeof parisArrCopy
        const tpa = parisArrCopy[(locale as PALocale) in parisArrCopy ? (locale as PALocale) : 'en']
        const parisArrSlugs = [
          { slug: '1er', popularName: 'Louvre' },
          { slug: '2e', popularName: 'Bourse' },
          { slug: '3e', popularName: 'Temple' },
          { slug: '4e', popularName: 'Marais' },
          { slug: '5e', popularName: 'Quartier Latin' },
          { slug: '6e', popularName: 'Saint-Germain' },
          { slug: '7e', popularName: 'Tour Eiffel' },
          { slug: '8e', popularName: 'Champs-Elysees' },
          { slug: '9e', popularName: 'Opera' },
          { slug: '10e', popularName: 'Canal St-Martin' },
          { slug: '11e', popularName: 'Bastille' },
          { slug: '12e', popularName: 'Bercy' },
          { slug: '13e', popularName: 'Gobelins' },
          { slug: '14e', popularName: 'Montparnasse' },
          { slug: '15e', popularName: 'Vaugirard' },
          { slug: '16e', popularName: 'Passy' },
          { slug: '17e', popularName: 'Batignolles' },
          { slug: '18e', popularName: 'Montmartre' },
          { slug: '19e', popularName: 'Buttes-Chaumont' },
          { slug: '20e', popularName: 'Menilmontant' },
        ]
        return (
          <section className="mx-4 sm:mx-6 lg:mx-8 my-8">
            <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl overflow-hidden">
              {/* Header */}
              <div className="px-6 sm:px-10 pt-8 pb-6">
                <span className="inline-block bg-amber-400 text-stone-900 text-xs font-black px-3 py-1 rounded-full mb-4">
                  {tpa.badge}
                </span>
                <h2 className="text-3xl font-extrabold text-white mb-2 leading-tight">
                  {tpa.title}
                </h2>
                <p className="text-stone-300 text-sm">
                  {tpa.subtitle}
                </p>
              </div>

              {/* Grid of arrondissements */}
              <div className="px-6 sm:px-10 pb-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                  {parisArrSlugs.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/${locale}/destinations/paris/arrondissements/${a.slug}`}
                      className="group relative rounded-xl overflow-hidden aspect-[4/3] hover:scale-[1.03] transition-transform duration-200"
                    >
                      <Image
                        src={`/images/paris-arrondissements/${a.slug}.jpg`}
                        alt={`${a.popularName} - Paris ${a.slug}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <p className="text-white font-black text-sm leading-none">{a.slug}</p>
                        <p className="text-white/80 text-xs mt-0.5 leading-tight">{a.popularName}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Footer CTAs */}
              <div className="px-6 sm:px-10 pb-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/${locale}/destinations/paris/arrondissements`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center bg-white text-stone-900 font-bold px-6 py-3 rounded-xl hover:bg-stone-100 transition-colors text-sm text-center"
                >
                  {tpa.cta1} →
                </Link>
                <Link
                  href={`/${locale}/destinations/paris/pet-friendly-hotels-by-arrondissement`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center border border-white text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm text-center"
                >
                  {tpa.cta2} →
                </Link>
              </div>
            </div>
          </section>
        )
      })()}

      {/* ── Map (high-conversion: first booking came from this component) ── */}
      {'lat' in dest && 'lng' in dest && (
        <section className="py-10 bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              🗺️ {locale === 'fr' ? `Carte des hôtels pet-friendly à ${localizedName}` : locale === 'es' ? `Mapa de hoteles pet-friendly en ${localizedName}` : locale === 'pt' ? `Mapa de hotéis pet-friendly em ${localizedName}` : locale === 'de' ? `Karte haustierfreundlicher Hotels: ${localizedName}` : locale === 'nl' ? `Kaart van huisdiervriendelijke hotels: ${localizedName}` : `Pet-friendly hotel map: ${localizedName}`}
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              {locale === 'fr'
                ? `Tous les hôtels acceptant les animaux à ${localizedName}, directement depuis Booking.com, cliquez sur un marqueur pour voir le prix et réserver.`
                : locale === 'es'
                ? `Todos los hoteles que admiten mascotas en ${localizedName}, directamente desde Booking.com, haz clic en un marcador para ver el precio y reservar.`
                : locale === 'de'
                ? `Alle haustierfreundlichen Hotels in ${localizedName}, live von Booking.com, klicken Sie auf einen Marker, um Preise zu sehen und zu buchen.`
                : locale === 'nl'
                ? `Alle huisdiervriendelijke hotels in ${localizedName}, rechtstreeks van Booking.com, klik op een marker om de prijs te zien en te boeken.`
                : `All pet-friendly hotels in ${localizedName}, live from Booking.com, click any marker to see prices and book.`}
            </p>
            <PetMap
              lat={(dest as typeof dest & { lat: number }).lat}
              lng={(dest as typeof dest & { lng: number }).lng}
              stay22MapId={'stay22MapId' in dest ? (dest as typeof dest & { stay22MapId?: string }).stay22MapId : undefined}
              destName={dest.name}
              country={dest.country}
              locale={locale}
              height={420}
            />
          </div>
        </section>
      )}

      {/* ── Editorial Snapshot ── */}
      {(() => {
        const ctxLocale = locale === 'fr' || locale === 'es' || locale === 'pt' || locale === 'de' || locale === 'nl' ? locale : 'en'
        const ctx = (destContextByLocale[ctxLocale] ?? destContextByLocale['en'])?.[slug]
        const avgRating = destHotels.length > 0
          ? (destHotels.reduce((s, h) => s + h.rating, 0) / destHotels.length).toFixed(1)
          : null
        const freeCount = destHotels.filter(h => h.petFee === 0).length
        const minPrice = destHotels.length > 0 ? Math.min(...destHotels.map(h => h.priceFrom).filter(Boolean)) : null

        const statsLabel = {
          hotels:  locale === 'fr' ? 'hôtels pet-friendly' : locale === 'es' ? 'hoteles pet-friendly' : locale === 'pt' ? 'hotéis pet-friendly' : locale === 'de' ? 'haustierfreundliche Hotels' : locale === 'nl' ? 'huisdiervriendelijke hotels' : 'pet-friendly hotels',
          rating:  locale === 'fr' ? 'note moyenne' : locale === 'es' ? 'nota media' : locale === 'pt' ? 'nota média' : locale === 'de' ? 'Ø Bewertung' : locale === 'nl' ? 'gem. beoordeling' : 'avg. rating',
          free:    locale === 'fr' ? 'sans frais animaux' : locale === 'es' ? 'sin cargo mascotas' : locale === 'pt' ? 'sem taxa animal' : locale === 'de' ? 'ohne Haustiergebühr' : locale === 'nl' ? 'zonder huisdierkosten' : 'with no pet fee',
          from:    locale === 'fr' ? 'dès' : locale === 'es' ? 'desde' : locale === 'pt' ? 'desde' : locale === 'de' ? 'ab' : locale === 'nl' ? 'vanaf' : 'from',
          night:   locale === 'fr' ? '/nuit' : locale === 'es' ? '/noche' : locale === 'pt' ? '/noite' : locale === 'de' ? '/Nacht' : locale === 'nl' ? '/nacht' : '/night',
          whyTitle: locale === 'fr' ? `Pourquoi ${localizedName} avec votre animal ?` : locale === 'es' ? `¿Por qué ${localizedName} con tu mascota?` : locale === 'pt' ? `Porquê ${localizedName} com o seu animal?` : locale === 'de' ? `Warum ${localizedName} mit Ihrem Tier?` : locale === 'nl' ? `Waarom ${localizedName} met jouw huisdier?` : `Why ${localizedName} with your pet?`,
          highlight: locale === 'fr' ? 'À ne pas manquer' : locale === 'es' ? 'No te pierdas' : locale === 'pt' ? 'A não perder' : locale === 'de' ? 'Nicht verpassen' : locale === 'nl' ? 'Niet te missen' : 'Top spot',
          area: locale === 'fr' ? 'Quartiers idéaux' : locale === 'es' ? 'Barrios ideales' : locale === 'pt' ? 'Bairros ideais' : locale === 'de' ? 'Ideale Viertel' : locale === 'nl' ? 'Beste buurten' : 'Best area',
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
                    <p className="text-gray-800 text-sm leading-relaxed">{localizedName} {locale === 'fr' ? 'est' : locale === 'es' ? 'es' : locale === 'pt' ? 'é' : locale === 'de' ? 'ist' : locale === 'nl' ? 'is' : 'is'} {ctx.personality}.</p>
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

      {/* Hotels */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
            {p.hotelsTitle}: {localizedName}
          </h2>
          {destHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} dict={p} locale={locale as string} destName={dest.name} destCountry={dest.country} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <span className="text-5xl block mb-4">🏨</span>
              <p className="text-lg">{dict.pages.combo.noHotels}</p>
            </div>
          )}
        </div>
      </section>

      {/* Quick navigation strip - mid-page internal links */}
      {quickLinks.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100 rounded-2xl px-5 py-4">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">
              {locale === 'fr' ? `Aussi en ${getLocalizedCountryName(dest.country, 'fr')}` : locale === 'es' ? `También en ${getLocalizedCountryName(dest.country, 'es')}` : locale === 'pt' ? `Também em ${getLocalizedCountryName(dest.country, 'pt')}` : locale === 'de' ? `Auch in ${getLocalizedCountryName(dest.country, 'de')}` : locale === 'nl' ? `Ook in ${getLocalizedCountryName(dest.country, 'nl')}` : `Also in ${dest.country}`}
            </p>
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((d) => (
                <Link
                  key={d.slug}
                  href={`/${locale}/destinations/${d.slug}`}
                  className="inline-flex items-center gap-1.5 bg-white border border-blue-200 rounded-full px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors"
                >
                  <span>{d.flag}</span>
                  <span>{getLocalizedCityName(d.slug, d.name, locale)}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Rich city content (history + sights + tips) ── */}
      {cityContent[slug] && (() => {
        const cc = cityContent[slug]
        // PT uses pt content when available, otherwise falls back to en
        const lang = locale === 'pt' && cc.history.pt ? 'pt' : locale === 'de' && cc.history.de ? 'de' : locale === 'nl' && cc.history.nl ? 'nl' : (locale === 'fr' || locale === 'es' || locale === 'pt' ? locale : 'en')
        const historyTitle = locale === 'fr' ? `${localizedName} : histoire et caractère` : locale === 'es' ? `${localizedName}: historia y carácter` : locale === 'pt' ? `${localizedName}: história e carácter` : locale === 'de' ? `${localizedName}: Geschichte und Charakter` : locale === 'nl' ? `${localizedName}: geschiedenis en karakter` : `${localizedName}: history & character`
        const sightsTitle = locale === 'fr' ? 'Points clés à visiter' : locale === 'es' ? 'Puntos clave que visitar' : locale === 'pt' ? 'Pontos-chave a visitar' : locale === 'de' ? 'Wichtige Sehenswürdigkeiten' : locale === 'nl' ? 'Belangrijkste bezienswaardigheden' : 'Key sights'
        const petsTitle = locale === 'fr' ? `Voyager avec son animal à ${localizedName}` : locale === 'es' ? `Viajar con mascota en ${localizedName}` : locale === 'pt' ? `Viajar com animal em ${localizedName}` : locale === 'de' ? `Mit Tier in ${localizedName} unterwegs` : locale === 'nl' ? `Op reis met je huisdier in ${localizedName}` : `Travelling with a pet in ${localizedName}`
        const practicalTitle = locale === 'fr' ? 'Infos pratiques' : locale === 'es' ? 'Información práctica' : locale === 'pt' ? 'Informações práticas' : locale === 'de' ? 'Praktische Infos' : locale === 'nl' ? 'Praktische info' : 'Practical info'
        const petFriendlyLabel = locale === 'fr' ? 'Accès animaux' : locale === 'es' ? 'Acceso mascotas' : locale === 'pt' ? 'Aceita animais' : locale === 'de' ? 'Tiere erlaubt' : locale === 'nl' ? 'Huisdieren toegestaan' : 'Pet-friendly'
        const restrictedLabel = locale === 'fr' ? 'Animaux non admis' : locale === 'es' ? 'No mascotas' : locale === 'pt' ? 'Animais não admitidos' : locale === 'de' ? 'Tiere nicht erlaubt' : locale === 'nl' ? 'Geen huisdieren toegestaan' : 'Pets restricted'
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
                🐾 {locale === 'fr' ? 'Guide voyage' : locale === 'es' ? 'Guía de viaje' : locale === 'pt' ? 'Guia de viagem' : locale === 'de' ? 'Reiseführer' : locale === 'nl' ? 'Reisgids' : 'Travel guide'}
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
                {locale === 'fr'
                  ? `Guide complet de ${localizedName} avec votre animal`
                  : locale === 'es'
                  ? `Guía completa de ${localizedName} con tu mascota`
                  : `Complete ${localizedName} pet travel guide`}
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl">
                {locale === 'fr'
                  ? `Restaurants, parcs, transports, plages, vétérinaires. Tout ce qu'il faut savoir pour ${localizedName} avec votre animal.`
                  : locale === 'es'
                  ? `Restaurantes, parques, transporte, playas, veterinarios. Todo lo que necesitas saber para ${localizedName} con tu mascota.`
                  : `Restaurants, parks, transport, beaches, vets. Everything you need to know for ${localizedName} with your pet.`}
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
                        <p className="text-xs text-gray-500 leading-relaxed mt-auto pt-2">
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

      {/* Weather section */}
      {dest.weather && (
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">
              🌡️ {locale === 'fr' ? `Météo typique à ${localizedName}` : locale === 'es' ? `Clima típico en ${localizedName}` : locale === 'pt' ? `Clima típico em ${localizedName}` : locale === 'de' ? `Typisches Wetter in ${localizedName}` : locale === 'nl' ? `Typisch weer in ${localizedName}` : `Typical weather in ${localizedName}`}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {locale === 'fr' ? 'Températures moyennes. Idéal pour planifier votre séjour avec votre animal' : locale === 'es' ? 'Temperaturas medias. Ideal para planificar su estancia con su mascota' : locale === 'pt' ? 'Temperaturas médias. Ideal para planear a sua estadia com o seu animal' : locale === 'de' ? 'Durchschnittstemperaturen. Ideal für die Planung Ihrer Reise mit Tier' : locale === 'nl' ? 'Gemiddelde temperaturen. Ideaal om je reis met je huisdier te plannen' : 'Average temperatures. Ideal for planning your pet trip'}
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
                      🐾 {locale === 'fr' ? `Meilleurs mois pour voyager avec un animal à ${localizedName} : ` : locale === 'es' ? `Mejores meses para viajar con mascota en ${localizedName}: ` : locale === 'pt' ? `Melhores meses para viajar com animal em ${localizedName}: ` : locale === 'de' ? `Beste Monate für eine Reise mit Tier nach ${localizedName}: ` : locale === 'nl' ? `Beste maanden om met je huisdier naar ${localizedName} te reizen: ` : `Best months to travel with a pet in ${localizedName}: `}
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

      {/* ── Accessoires maillage (FR only, weather-aware) ── */}
      {locale === 'fr' && dest.weather && (() => {
        const w = dest.weather as Record<string, { temp: number; desc: string; icon: string }>
        const summerPeak = Math.max(w.jun?.temp ?? 0, w.jul?.temp ?? 0, w.aug?.temp ?? 0)
        const isHot = summerPeak >= 28
        return (
          <section className={`py-10 border-t ${isHot ? 'bg-orange-50 border-orange-200' : 'bg-amber-50 border-amber-200'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="flex-1">
                  <h2 className="text-lg font-extrabold text-stone-900 mb-1">
                    {isHot
                      ? `${localizedName} grimpe à ${summerPeak}°C l'été : préparez les pattes de votre chien`
                      : `Bien équiper son chien pour ${localizedName}`}
                  </h2>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {isHot
                      ? `Au-dessus de 28°C l'asphalte brûle les coussinets et le coup de chaleur guette. Gourde nomade, tapis rafraîchissant, gilet à mouiller : notre sélection testée pour voyager l'esprit tranquille.`
                      : `Gourde nomade, harnais de sécurité voiture, gamelle pliante, trousse de secours : ce qu'on emporte vraiment pour partir avec son chien.`}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:flex-shrink-0">
                  {isHot && (
                    <Link href="/fr/accessoires-chien-chaleur" className="bg-orange-600 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-orange-700 transition-colors shadow-sm">
                      Kit anti-chaleur →
                    </Link>
                  )}
                  <Link href="/fr/accessoires-chien" className={`px-5 py-2.5 rounded-full font-bold text-sm transition-colors shadow-sm ${isHot ? 'bg-white border border-orange-300 text-orange-900 hover:bg-orange-100' : 'bg-amber-600 text-white hover:bg-amber-700'}`}>
                    Accessoires chien →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )
      })()}

      {/* Explore by category. Rich links */}
      {presentCategories.length > 0 && (
        <section className="py-12 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">
              {locale === 'fr' ? `Explorer les hôtels à ${localizedName} par type` : locale === 'es' ? `Explorar hoteles en ${localizedName} por tipo` : locale === 'pt' ? `Explorar hotéis em ${localizedName} por tipo` : locale === 'de' ? `Hotels in ${localizedName} nach Typ entdecken` : locale === 'nl' ? `Hotels in ${localizedName} verkennen op type` : `Explore ${localizedName} hotels by type`}
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
                      <p className="text-xs text-gray-500">{count} {locale === 'fr' ? 'hôtels' : locale === 'es' ? 'hoteles' : locale === 'pt' ? 'hotéis' : locale === 'de' ? 'Hotels' : locale === 'nl' ? 'hotels' : 'hotels'}</p>
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
            {locale === 'fr' ? 'Questions fréquentes' : locale === 'es' ? 'Preguntas frecuentes' : locale === 'pt' ? 'Perguntas frequentes' : locale === 'de' ? 'Häufig gestellte Fragen' : locale === 'nl' ? 'Veelgestelde vragen' : 'Frequently asked questions'}
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
      <SisterSites slug={slug} locale={locale} />
      {/* Related destinations: visual cards (similar vibes + same country) */}
      <RelatedDestinations
        similarDests={similarDests}
        countryDests={countryDests}
        currentSlug={slug}
        currentCountry={getLocalizedCountryName(dest.country, locale)}
        currentVibes={currentVibes}
        locale={locale}
      />
    </div>
    </>
  )
}
