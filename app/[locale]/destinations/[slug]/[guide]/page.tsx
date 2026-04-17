import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getDictionary, hasLocale, locales, type Locale } from '@/app/[locale]/dictionaries'
import destinations from '@/data/destinations.json'
import hotels from '@/data/hotels.json'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { readdirSync, existsSync } from 'fs'
import { join } from 'path'

// ─── Types ────────────────────────────────────────────────────────────────────

export const GUIDE_SLUGS = ['restaurants', 'parks', 'transport', 'beaches', 'vets', 'tips', 'attractions', 'petsitting'] as const
export type GuideSlug = typeof GUIDE_SLUGS[number]

interface GuidePlace {
  name: string
  address?: string
  neighborhood?: string
  distance?: string
  type?: string
  // Multilingual description
  description: string
  descriptionFr?: string
  descriptionEs?: string
  // Multilingual pet policy
  petPolicy?: string
  petPolicyFr?: string
  petPolicyEs?: string
  priceRange?: string
  // Multilingual mustTry
  mustTry?: string
  mustTryFr?: string
  mustTryEs?: string
  // Multilingual hours
  openingHours?: string
  openingHoursFr?: string
  openingHoursEs?: string
  hours?: string
  hoursFr?: string
  hoursEs?: string
  phone?: string
  offLeash?: boolean
  // Multilingual offLeashArea
  offLeashArea?: string
  offLeashAreaFr?: string
  offLeashAreaEs?: string
  // Multilingual tip
  tip?: string
  tipFr?: string
  tipEs?: string
  season?: string
  // Multilingual rules
  rules?: string
  rulesFr?: string
  rulesEs?: string
  facilities?: string
  englishSpeaking?: boolean
  googleMapsUrl?: string
  // New fields for attractions
  admissionFee?: string
  admissionFeeFr?: string
  admissionFeeEs?: string
  dogPolicy?: string
  dogPolicyFr?: string
  dogPolicyEs?: string
  // New fields for petsitting
  serviceType?: string
  serviceTypeFr?: string
  serviceTypeEs?: string
  pricePerDay?: string
  languages?: string[]
  rating?: number
}

interface GuideFaq {
  q: string
  a: string
}

interface GuideSection {
  titleEn: string
  titleFr?: string
  titleEs?: string
  contentEn: string
  contentFr?: string
  contentEs?: string
}

interface GuideData {
  titleEn: string
  titleFr?: string
  titleEs?: string
  introEn: string
  introFr?: string
  introEs?: string
  places?: GuidePlace[]
  rules?: Array<{ mode: string; modeFr?: string; modeEs?: string; policy: string; policyFr?: string; policyEs?: string; tip: string; tipFr?: string; tipEs?: string }>
  sections?: GuideSection[]
  tipsEn?: string[]
  tipsFr?: string[]
  tipsEs?: string[]
  faqsEn?: GuideFaq[]
  faqsFr?: GuideFaq[]
  faqsEs?: GuideFaq[]
  entryRequirements?: {
    euPets: string
    euPetsFr?: string
    euPetsEs?: string
    nonEuPets: string
    nonEuPetsFr?: string
    nonEuPetsEs?: string
    emergencyContacts?: string[]
  }
}

interface CityGuide {
  slug: string
  name: string
  country: string
  flag: string
  lastUpdated: string
  guides: Record<string, GuideData>
}

// ─── Guide meta config ────────────────────────────────────────────────────────

const GUIDE_META: Record<GuideSlug, { emoji: string; color: string; gradient: string }> = {
  restaurants: { emoji: '🍽️', color: 'orange', gradient: 'from-orange-500 to-amber-500' },
  parks:       { emoji: '🌳', color: 'green',  gradient: 'from-emerald-500 to-teal-500' },
  transport:   { emoji: '🚇', color: 'blue',   gradient: 'from-blue-500 to-cyan-500' },
  beaches:     { emoji: '🏖️', color: 'cyan',   gradient: 'from-cyan-500 to-blue-400' },
  vets:        { emoji: '🏥', color: 'red',    gradient: 'from-red-500 to-rose-500' },
  tips:        { emoji: '💡', color: 'purple', gradient: 'from-violet-500 to-purple-600' },
  attractions: { emoji: '🏛️', color: 'indigo', gradient: 'from-indigo-500 to-violet-500' },
  petsitting:  { emoji: '🐶', color: 'pink',   gradient: 'from-pink-500 to-rose-400' },
}

// ─── Data loading ─────────────────────────────────────────────────────────────

function loadCityGuide(slug: string): CityGuide | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(`@/data/city-guides/${slug}.json`) as CityGuide
  } catch {
    return null
  }
}

function getAvailableGuideSlugs(): string[] {
  const dir = join(process.cwd(), 'data/city-guides')
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''))
}

// ─── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const availableSlugs = getAvailableGuideSlugs()
  const params: { slug: string; guide: string }[] = []
  for (const slug of availableSlugs) {
    const guide = loadCityGuide(slug)
    if (!guide) continue
    const availableGuides = GUIDE_SLUGS.filter(g => guide.guides[g])
    for (const guideSlug of availableGuides) {
      params.push({ slug, guide: guideSlug })
    }
  }
  return params
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string; guide: string }>
}): Promise<Metadata> {
  const { locale, slug, guide } = await params
  if (!hasLocale(locale)) return {}

  const dest = destinations.find(d => d.slug === slug)
  const cityGuide = loadCityGuide(slug)
  if (!dest || !cityGuide || !cityGuide.guides[guide]) return {}

  const guideData = cityGuide.guides[guide]
  const title = locale === 'fr' ? guideData.titleFr : locale === 'es' ? guideData.titleEs : guideData.titleEn
  const intro = locale === 'fr' ? guideData.introFr : locale === 'es' ? guideData.introEs : guideData.introEn
  const description = (intro ?? guideData.introEn).slice(0, 155)

  return {
    title: `${title ?? guideData.titleEn} | HotelsWithPets.com`,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/destinations/${slug}/${guide}`,
      languages: {
        ...Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/destinations/${slug}/${guide}`])),
        'x-default': `${SITE_URL}/en/destinations/${slug}/${guide}`,
      },
    },
    openGraph: {
      title: `${title ?? guideData.titleEn}`,
      description,
      type: 'article',
    },
  }
}

// ─── Locale helpers ───────────────────────────────────────────────────────────

/** Pick locale-aware value with English fallback */
function loc<T extends string | undefined>(en: T, fr: T | undefined, es: T | undefined, locale: string): T {
  if (locale === 'fr' && fr) return fr
  if (locale === 'es' && es) return es
  return en
}

function getPlaceField(place: GuidePlace, field: string, locale: string): string {
  const p = place as unknown as Record<string, string | undefined>
  const enVal = p[field]
  const frVal = p[`${field}Fr`]
  const esVal = p[`${field}Es`]
  return loc(enVal ?? '', frVal, esVal, locale)
}

// ─── UI label maps ────────────────────────────────────────────────────────────

function uiLabels(locale: string) {
  if (locale === 'fr') return {
    updated: 'Mis à jour le',
    cityOverview: '← Aperçu de la ville',
    offLeash: 'Sans laisse ✓',
    enSpoken: 'Anglais parlé',
    offLeashZone: 'Zone sans laisse :',
    rules: 'Règles :',
    viewOnMaps: 'Voir sur Google Maps →',
    modeHeader: 'Moyen',
    policyHeader: 'Conditions',
    tipHeader: 'Conseil',
    euPets: 'Animaux UE :',
    nonEuPets: 'Animaux hors UE :',
    emergencyContacts: 'Contacts d\'urgence :',
    perNight: '/nuit',
    admissionFee: 'Entrée :',
    dogPolicy: 'Politique chiens :',
    serviceType: 'Service :',
    seeAllHotels: 'Voir tous les hôtels →',
    compareBooking: 'Comparer sur Booking.com →',
    moreGuides: (city: string) => `Plus de guides pour ${city}`,
    quickTips: '💡 Conseils pratiques',
    faqTitle: 'Questions fréquentes',
    hotelsTitle: (city: string) => `Hôtels pet-friendly à ${city}`,
    hotelsSubtitle: 'Les meilleurs hôtels acceptant les animaux, sélectionnés et vérifiés.',
    entryTitle: 'Conditions d\'entrée pour les animaux',
  }
  if (locale === 'es') return {
    updated: 'Actualizado el',
    cityOverview: '← Vista general',
    offLeash: 'Sin correa ✓',
    enSpoken: 'Inglés hablado',
    offLeashZone: 'Zona sin correa:',
    rules: 'Normas:',
    viewOnMaps: 'Ver en Google Maps →',
    modeHeader: 'Medio',
    policyHeader: 'Condiciones',
    tipHeader: 'Consejo',
    euPets: 'Mascotas UE:',
    nonEuPets: 'Mascotas no UE:',
    emergencyContacts: 'Contactos de emergencia:',
    perNight: '/noche',
    admissionFee: 'Entrada:',
    dogPolicy: 'Política perros:',
    serviceType: 'Servicio:',
    seeAllHotels: 'Ver todos los hoteles →',
    compareBooking: 'Comparar en Booking.com →',
    moreGuides: (city: string) => `Más guías para ${city}`,
    quickTips: '💡 Consejos prácticos',
    faqTitle: 'Preguntas frecuentes',
    hotelsTitle: (city: string) => `Hoteles con mascotas en ${city}`,
    hotelsSubtitle: 'Los mejores hoteles que admiten mascotas, seleccionados y verificados.',
    entryTitle: 'Requisitos de entrada para mascotas',
  }
  return {
    updated: 'Updated',
    cityOverview: '← City overview',
    offLeash: 'Off-leash ✓',
    enSpoken: 'EN spoken',
    offLeashZone: 'Off-leash zone:',
    rules: 'Rules:',
    viewOnMaps: 'View on Google Maps →',
    modeHeader: 'Mode',
    policyHeader: 'Policy',
    tipHeader: 'Tip',
    euPets: 'EU pets:',
    nonEuPets: 'Non-EU pets:',
    emergencyContacts: 'Emergency contacts:',
    perNight: '/night',
    admissionFee: 'Admission:',
    dogPolicy: 'Dog policy:',
    serviceType: 'Service:',
    seeAllHotels: 'See all hotels →',
    compareBooking: 'Compare on Booking.com →',
    moreGuides: (city: string) => `More ${city} guides`,
    quickTips: '💡 Quick Tips',
    faqTitle: 'Frequently Asked Questions',
    hotelsTitle: (city: string) => `Pet-Friendly Hotels in ${city}`,
    hotelsSubtitle: 'Our top-rated pet-friendly hotels, handpicked and verified.',
    entryTitle: 'Pet Entry Requirements',
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; guide: string }>
}) {
  const { locale, slug, guide } = await params
  if (!hasLocale(locale)) notFound()

  const dest = destinations.find(d => d.slug === slug)
  const cityGuide = loadCityGuide(slug)
  if (!dest || !cityGuide || !cityGuide.guides[guide as GuideSlug]) notFound()

  const guideData = cityGuide.guides[guide as GuideSlug]
  const meta = GUIDE_META[guide as GuideSlug]
  if (!meta) notFound()

  const dict = await getDictionary(locale as Locale)
  const ui = uiLabels(locale)

  const title = (locale === 'fr' ? guideData.titleFr : locale === 'es' ? guideData.titleEs : null) ?? guideData.titleEn
  const intro = (locale === 'fr' ? guideData.introFr : locale === 'es' ? guideData.introEs : null) ?? guideData.introEn
  const tips = (locale === 'fr' ? guideData.tipsFr : locale === 'es' ? guideData.tipsEs : null) ?? guideData.tipsEn ?? []
  const faqs = (locale === 'fr' ? guideData.faqsFr : locale === 'es' ? guideData.faqsEs : null) ?? guideData.faqsEn ?? []

  // Sibling guides for this city
  const siblingGuides = GUIDE_SLUGS.filter(g => g !== guide && cityGuide.guides[g])

  // Nearby hotels
  const destHotels = hotels
    .filter(h => h.destinationSlug === slug)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)

  const guideLabels: Record<GuideSlug, Record<string, string>> = {
    restaurants: { en: 'Restaurants', fr: 'Restaurants', es: 'Restaurantes' },
    parks:       { en: 'Parks & Walks', fr: 'Parcs & Balades', es: 'Parques y Paseos' },
    transport:   { en: 'Transport', fr: 'Transport', es: 'Transporte' },
    beaches:     { en: 'Beaches', fr: 'Plages', es: 'Playas' },
    vets:        { en: 'Vets', fr: 'Vétérinaires', es: 'Veterinarios' },
    tips:        { en: 'Local Tips', fr: 'Conseils locaux', es: 'Consejos locales' },
    attractions: { en: 'Attractions', fr: 'À visiter', es: 'Qué ver' },
    petsitting:  { en: 'Pet Sitting', fr: 'Garde animaux', es: 'Cuidado de mascotas' },
  }

  // Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: dict.nav.destinations, item: `${SITE_URL}/${locale}/destinations` },
      { '@type': 'ListItem', position: 3, name: dest.name, item: `${SITE_URL}/${locale}/destinations/${slug}` },
      { '@type': 'ListItem', position: 4, name: title, item: `${SITE_URL}/${locale}/destinations/${slug}/${guide}` },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: intro.slice(0, 155),
    datePublished: cityGuide.lastUpdated,
    dateModified: cityGuide.lastUpdated,
    image: `${SITE_URL}/images/destinations/${slug}.jpg`,
    author: { '@type': 'Organization', name: 'HotelsWithPets.com', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets.com', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
  }

  const allezHref = buildAllezDestLink(dest.name, dest.country, `guide-${guide}`)

  // Format date locale-aware
  const formattedDate = new Date(cityGuide.lastUpdated).toLocaleDateString(
    locale === 'fr' ? 'fr-FR' : locale === 'es' ? 'es-ES' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* ── Hero ── */}
      <section className={`bg-gradient-to-br ${meta.gradient} text-white py-14`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1.5 text-white/60 text-sm mb-8">
            <Link href={`/${locale}/destinations`} className="hover:text-white transition-colors">{dict.nav.destinations}</Link>
            <span>/</span>
            <Link href={`/${locale}/destinations/${slug}`} className="hover:text-white transition-colors">{dest.flag} {dest.name}</Link>
            <span>/</span>
            <span className="text-white font-medium">{guideLabels[guide as GuideSlug]?.[locale] ?? guideLabels[guide as GuideSlug]?.en}</span>
          </nav>

          <div className="flex items-start gap-5">
            <span className="text-6xl flex-shrink-0">{meta.emoji}</span>
            <div>
              <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight mb-3">{title}</h1>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span>{dest.flag}</span>
                <span>{dest.name}, {dest.country}</span>
                <span>·</span>
                <span>{ui.updated} {formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sibling guide pills ── */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/${locale}/destinations/${slug}`}
              className="text-xs px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors"
            >
              {ui.cityOverview}
            </Link>
            {siblingGuides.map(g => (
              <Link
                key={g}
                href={`/${locale}/destinations/${slug}/${g}`}
                className="text-xs px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors"
              >
                {GUIDE_META[g].emoji} {guideLabels[g][locale] ?? guideLabels[g].en}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Intro ── */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-700 text-lg leading-relaxed">{intro}</p>
        </div>

        {/* ── Places list ── */}
        {guideData.places && guideData.places.length > 0 && (
          <section className="mb-12">
            <div className="space-y-6">
              {guideData.places.map((place, i) => {
                const desc = getPlaceField(place, 'description', locale)
                const policy = getPlaceField(place, 'petPolicy', locale)
                const dogPolicy = getPlaceField(place, 'dogPolicy', locale)
                const mustTry = getPlaceField(place, 'mustTry', locale)
                const placeHours = getPlaceField(place, 'hours', locale) || getPlaceField(place, 'openingHours', locale)
                const offLeashAreaText = getPlaceField(place, 'offLeashArea', locale)
                const tipText = getPlaceField(place, 'tip', locale)
                const rulesText = getPlaceField(place, 'rules', locale)
                const admissionFee = getPlaceField(place, 'admissionFee', locale)
                const serviceType = getPlaceField(place, 'serviceType', locale)

                return (
                  <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-white bg-gray-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                            {i + 1}
                          </span>
                          <h3 className="font-bold text-gray-900 text-lg">{place.name}</h3>
                        </div>
                        {(place.address || place.neighborhood || place.distance) && (
                          <p className="text-sm text-gray-400 ml-8">
                            {place.neighborhood && <span>{place.neighborhood} · </span>}
                            {place.address ?? place.distance}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
                        {place.priceRange && (
                          <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{place.priceRange}</span>
                        )}
                        {place.rating && (
                          <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-lg">⭐ {place.rating}/5</span>
                        )}
                        {place.offLeash === true && (
                          <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-lg">{ui.offLeash}</span>
                        )}
                        {place.englishSpeaking && (
                          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">{ui.enSpoken}</span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed mb-3 ml-8">{desc}</p>

                    <div className="ml-8 flex flex-wrap gap-3 text-xs text-gray-500">
                      {policy && (
                        <span className="flex items-center gap-1">
                          <span className="text-green-500">🐾</span> {policy}
                        </span>
                      )}
                      {dogPolicy && !policy && (
                        <span className="flex items-center gap-1">
                          <span>🐾</span> {dogPolicy}
                        </span>
                      )}
                      {placeHours && (
                        <span className="flex items-center gap-1">
                          <span>🕐</span> {placeHours}
                        </span>
                      )}
                      {place.phone && (
                        <span className="flex items-center gap-1">
                          <span>📞</span> {place.phone}
                        </span>
                      )}
                      {place.season && (
                        <span className="flex items-center gap-1">
                          <span>📅</span> {place.season}
                        </span>
                      )}
                      {mustTry && (
                        <span className="flex items-center gap-1">
                          <span>⭐</span> {mustTry}
                        </span>
                      )}
                      {admissionFee && (
                        <span className="flex items-center gap-1">
                          <span>🎟️</span> {ui.admissionFee} {admissionFee}
                        </span>
                      )}
                      {serviceType && (
                        <span className="flex items-center gap-1">
                          <span>🐶</span> {ui.serviceType} {serviceType}
                        </span>
                      )}
                      {place.pricePerDay && (
                        <span className="flex items-center gap-1">
                          <span>💰</span> {place.pricePerDay}
                        </span>
                      )}
                      {place.languages && place.languages.length > 0 && (
                        <span className="flex items-center gap-1">
                          <span>🌍</span> {place.languages.join(', ')}
                        </span>
                      )}
                    </div>

                    {(tipText || rulesText || offLeashAreaText) && (
                      <div className="ml-8 mt-3 bg-amber-50 rounded-xl p-3 space-y-1">
                        {offLeashAreaText && <p className="text-xs text-amber-800"><strong>{ui.offLeashZone}</strong> {offLeashAreaText}</p>}
                        {rulesText && <p className="text-xs text-amber-800"><strong>{ui.rules}</strong> {rulesText}</p>}
                        {tipText && <p className="text-xs text-amber-700">💡 {tipText}</p>}
                      </div>
                    )}

                    {place.googleMapsUrl && (
                      <div className="ml-8 mt-3">
                        <a
                          href={place.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {ui.viewOnMaps}
                        </a>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ── Transport rules table ── */}
        {guideData.rules && guideData.rules.length > 0 && (
          <section className="mb-12">
            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 w-1/4">{ui.modeHeader}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 w-1/2">{ui.policyHeader}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">{ui.tipHeader}</th>
                  </tr>
                </thead>
                <tbody>
                  {guideData.rules.map((rule, i) => {
                    const mode = loc(rule.mode, rule.modeFr, rule.modeEs, locale)
                    const policy = loc(rule.policy, rule.policyFr, rule.policyEs, locale)
                    const tip = loc(rule.tip, rule.tipFr, rule.tipEs, locale)
                    return (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                        <td className="px-4 py-3 font-medium text-gray-900 align-top">{mode}</td>
                        <td className="px-4 py-3 text-gray-700 align-top">{policy}</td>
                        <td className="px-4 py-3 text-gray-500 align-top text-xs">💡 {tip}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Entry requirements (vets page) ── */}
        {guideData.entryRequirements && (
          <section className="mb-12 bg-blue-50 rounded-2xl p-6">
            <h2 className="font-bold text-gray-900 text-xl mb-4">{ui.entryTitle}</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <strong>{ui.euPets}</strong>{' '}
                {loc(guideData.entryRequirements.euPets, guideData.entryRequirements.euPetsFr, guideData.entryRequirements.euPetsEs, locale)}
              </div>
              <div>
                <strong>{ui.nonEuPets}</strong>{' '}
                {loc(guideData.entryRequirements.nonEuPets, guideData.entryRequirements.nonEuPetsFr, guideData.entryRequirements.nonEuPetsEs, locale)}
              </div>
              {guideData.entryRequirements.emergencyContacts && (
                <div>
                  <strong>{ui.emergencyContacts}</strong>
                  <ul className="mt-1 list-disc list-inside">
                    {guideData.entryRequirements.emergencyContacts.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Tips sections ── */}
        {guideData.sections && guideData.sections.length > 0 && (
          <section className="mb-12 space-y-6">
            {guideData.sections.map((section, i) => {
              const secTitle = (locale === 'fr' ? section.titleFr : locale === 'es' ? section.titleEs : null) ?? section.titleEn
              const secContent = (locale === 'fr' ? section.contentFr : locale === 'es' ? section.contentEs : null) ?? section.contentEn
              return (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-lg mb-3">{secTitle}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{secContent}</p>
                </div>
              )
            })}
          </section>
        )}

        {/* ── Quick tips list ── */}
        {tips.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-5">{ui.quickTips}</h2>
            <ul className="space-y-3">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 bg-amber-50 rounded-xl px-4 py-3">
                  <span className="text-amber-500 font-bold flex-shrink-0 mt-0.5">{i + 1}.</span>
                  <span className="text-gray-700 text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── FAQ ── */}
        {faqs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{ui.faqTitle}</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm group">
                  <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{faq.q}</span>
                    <span aria-hidden="true" className="text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                  </summary>
                  <div className="px-6 pb-5 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ── Hotel CTA block ── */}
        {destHotels.length > 0 && (
          <section className="mb-12 bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-extrabold mb-2">{ui.hotelsTitle(dest.name)}</h2>
            <p className="text-blue-200 text-sm mb-6">{ui.hotelsSubtitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {destHotels.map(hotel => (
                <div key={hotel.id} className="bg-white/10 rounded-xl p-4">
                  <p className="font-bold text-sm mb-1">{hotel.name}</p>
                  <p className="text-blue-200 text-xs mb-2">
                    {'★'.repeat(hotel.stars)} · {hotel.rating}/10
                  </p>
                  <p className="text-white font-bold">
                    €{hotel.priceFrom}<span className="text-blue-300 text-xs font-normal">{ui.perNight}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/destinations/${slug}`}
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-3 rounded-xl text-sm hover:bg-blue-50 transition-colors"
              >
                {ui.seeAllHotels}
              </Link>
              <a
                href={allezHref}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                {ui.compareBooking}
              </a>
            </div>
          </section>
        )}

        {/* ── Explore other guides ── */}
        {siblingGuides.length > 0 && (
          <section>
            <h2 className="text-xl font-extrabold text-gray-900 mb-4">{ui.moreGuides(dest.name)}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {siblingGuides.map(g => (
                <Link
                  key={g}
                  href={`/${locale}/destinations/${slug}/${g}`}
                  className={`bg-gradient-to-br ${GUIDE_META[g].gradient} text-white rounded-2xl p-4 hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2`}
                >
                  <span className="text-2xl block mb-2">{GUIDE_META[g].emoji}</span>
                  <span className="font-bold text-sm">{guideLabels[g][locale] ?? guideLabels[g].en}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
