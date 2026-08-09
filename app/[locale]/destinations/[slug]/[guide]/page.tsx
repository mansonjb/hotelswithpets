import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getDictionary, hasLocale, locales, type Locale } from '@/app/[locale]/dictionaries'
import destinations from '@/data/destinations.json'
import hotels from '@/data/hotels.json'
import { SITE_URL, buildAllezDestLink, buildAllezLink, buildStay22MapSrc } from '@/lib/site'
import { valueSort } from '@/lib/hotelSort'
import { bestSnowHotelsUrl } from '@/lib/skiStations'
import { imageUrl } from '@/lib/imageUrl'
import { getLocalizedCityName } from '@/lib/cityNames'
import { readdirSync, existsSync } from 'fs'
import { join } from 'path'
import NearbyHotelCard from '@/components/NearbyHotelCard'
import StickyHotelCTA from '@/components/StickyHotelCTA'

// ─── Types ────────────────────────────────────────────────────────────────────

export const GUIDE_SLUGS = ['restaurants', 'parks', 'transport', 'beaches', 'vets', 'tips', 'attractions', 'petsitting'] as const
export type GuideSlug = typeof GUIDE_SLUGS[number]

interface GuidePlace {
  name: string
  address?: string
  neighborhood?: string
  distance?: string
  type?: string
  photo?: string          // Unsplash URL or /images/guides/... path
  website?: string        // Official external website URL
  // Multilingual description
  description: string
  descriptionFr?: string
  descriptionEs?: string
  descriptionPt?: string
  descriptionDe?: string
  // Multilingual pet policy
  petPolicy?: string
  petPolicyFr?: string
  petPolicyEs?: string
  petPolicyPt?: string
  petPolicyDe?: string
  priceRange?: string
  // Multilingual mustTry
  mustTry?: string
  mustTryFr?: string
  mustTryEs?: string
  mustTryPt?: string
  mustTryDe?: string
  // Multilingual hours
  openingHours?: string
  openingHoursFr?: string
  openingHoursEs?: string
  openingHoursPt?: string
  openingHoursDe?: string
  hours?: string
  hoursFr?: string
  hoursEs?: string
  hoursPt?: string
  hoursDe?: string
  phone?: string
  offLeash?: boolean
  // Multilingual offLeashArea
  offLeashArea?: string
  offLeashAreaFr?: string
  offLeashAreaEs?: string
  offLeashAreaPt?: string
  offLeashAreaDe?: string
  // Multilingual tip
  tip?: string
  tipFr?: string
  tipEs?: string
  tipPt?: string
  tipDe?: string
  season?: string
  // Multilingual rules
  rules?: string
  rulesFr?: string
  rulesEs?: string
  rulesPt?: string
  rulesDe?: string
  facilities?: string
  englishSpeaking?: boolean
  googleMapsUrl?: string
  // New fields for attractions
  admissionFee?: string
  admissionFeeFr?: string
  admissionFeeEs?: string
  admissionFeePt?: string
  admissionFeeDe?: string
  dogPolicy?: string
  dogPolicyFr?: string
  dogPolicyEs?: string
  dogPolicyPt?: string
  dogPolicyDe?: string
  // New fields for petsitting
  serviceType?: string
  serviceTypeFr?: string
  serviceTypeEs?: string
  serviceTypePt?: string
  serviceTypeDe?: string
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
  titlePt?: string
  titleDe?: string
  contentEn: string
  contentFr?: string
  contentEs?: string
  contentPt?: string
  contentDe?: string
}

interface GuideData {
  titleEn: string
  titleFr?: string
  titleEs?: string
  titlePt?: string
  titleDe?: string
  introEn: string
  introFr?: string
  introEs?: string
  introPt?: string
  introDe?: string
  places?: GuidePlace[]
  rules?: Array<{ mode: string; modeFr?: string; modeEs?: string; modePt?: string; modeDe?: string; policy: string; policyFr?: string; policyEs?: string; policyPt?: string; policyDe?: string; tip: string; tipFr?: string; tipEs?: string; tipPt?: string; tipDe?: string }>
  sections?: GuideSection[]
  tipsEn?: string[]
  tipsFr?: string[]
  tipsEs?: string[]
  tipsPt?: string[]
  tipsDe?: string[]
  faqsEn?: GuideFaq[]
  faqsFr?: GuideFaq[]
  faqsEs?: GuideFaq[]
  faqsPt?: GuideFaq[]
  faqsDe?: GuideFaq[]
  entryRequirements?: {
    euPets: string
    euPetsFr?: string
    euPetsEs?: string
    euPetsPt?: string
    euPetsDe?: string
    nonEuPets: string
    nonEuPetsFr?: string
    nonEuPetsEs?: string
    nonEuPetsPt?: string
    nonEuPetsDe?: string
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

// On-demand ISR to keep build output under Vercel's processing limits.
// This route family was 11 368 of 13 335 prerendered pages (355 dests x 8
// sections x 4 locales); at that size the Vercel buildStep dies with
// "Maximum call stack size exceeded" after the Next build completes.
// Same approach as /hotels/[slug]: pages render on first hit, cache for a
// day, stay in the sitemap and remain crawlable.
export const dynamicParams = true
export const revalidate = 86400 // 1 day ISR cache
export async function generateStaticParams() {
  return []
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

// Traveller-intent meta templates per guide section.
// Goal: distinguish from "near me" local-search intent, so Google SERPs
// for visitors searching "{thing} in {city}" instead of locals searching "{thing} near me".
const META_TPL: Record<string, Record<'en' | 'fr' | 'es' | 'pt' | 'de', { title: (c: string) => string; desc: (c: string) => string }>> = {
  parks: {
    en: { title: c => `Dog parks in ${c}: off-leash zones & fenced runs`, desc: c => `Off-leash zones, fenced dog runs and quiet walks in ${c}, mapped for travellers visiting with their dog. Verified locations and rules.` },
    fr: { title: c => `Parcs canins à ${c} : zones sans laisse & espaces clôturés`, desc: c => `Zones sans laisse, espaces clôturés et promenades à ${c}, repérés pour les voyageurs qui visitent avec leur chien. Adresses et règles vérifiées.` },
    es: { title: c => `Parques para perros en ${c}: zonas sin correa y vallados`, desc: c => `Zonas sin correa, recintos vallados y paseos en ${c}, seleccionados para viajeros que visitan con su perro. Direcciones y normas verificadas.` },
    pt: { title: c => `Parques para cães em ${c}: zonas sem trela e vedados`, desc: c => `Zonas sem trela, recintos vedados e passeios em ${c}, selecionados para viajantes que visitam com o seu cão. Moradas e regras verificadas.` },
    de: { title: c => `Hundeparks in ${c}: Freilaufzonen & eingezäunte Areale`, desc: c => `Freilaufzonen, eingezäunte Hundeauslaufflächen und ruhige Spazierwege in ${c}, zusammengestellt für Reisende mit Hund. Geprüfte Standorte und Regeln.` },
  },
  tips: {
    en: { title: c => `Travelling to ${c} with a dog: rules, vets & transport`, desc: c => `What to know before visiting ${c} with your dog or cat: local rules, summer-heat warnings, transport policies, emergency vet contacts. All verified at source.` },
    fr: { title: c => `Voyager à ${c} avec son chien : règles, vétos & transports`, desc: c => `À savoir avant de visiter ${c} avec votre chien ou chat : règles locales, alertes canicule, transports, vétos d'urgence. Tout vérifié à la source.` },
    es: { title: c => `Viajar a ${c} con perro: normas, vetes y transporte`, desc: c => `Lo que conviene saber antes de visitar ${c} con tu perro o gato: normas locales, alertas de calor, transporte, veterinarios de urgencia. Verificado en origen.` },
    pt: { title: c => `Viajar para ${c} com cão: regras, vetes e transporte`, desc: c => `O que saber antes de visitar ${c} com o seu cão ou gato: regras locais, alertas de calor, transporte, veterinários de urgência. Verificado na fonte.` },
    de: { title: c => `Mit Hund nach ${c} reisen: Regeln, Tierärzte & Transport`, desc: c => `Was Sie vor dem Besuch von ${c} mit Hund oder Katze wissen sollten: örtliche Regeln, Hitzewarnungen, Transportvorschriften, Notfall-Tierärzte. Alles an der Quelle geprüft.` },
  },
  restaurants: {
    en: { title: c => `Dog-friendly restaurants in ${c}: terraces verified`, desc: c => `Where to eat with a dog when visiting ${c}: dog-welcoming terraces, indoor-tolerant rooms, water bowls. Pet policy verified at source for each venue.` },
    fr: { title: c => `Restaurants acceptant les chiens à ${c} : terrasses vérifiées`, desc: c => `Où manger avec son chien lors de votre visite à ${c} : terrasses dog-friendly, salles intérieures tolérantes, gamelles. Politique animaux vérifiée à la source.` },
    es: { title: c => `Restaurantes que admiten perros en ${c}: terrazas verificadas`, desc: c => `Dónde comer con perro al visitar ${c}: terrazas pet-friendly, salas interiores tolerantes, cuencos. Política de mascotas verificada en origen.` },
    pt: { title: c => `Restaurantes que aceitam cães em ${c}: esplanadas verificadas`, desc: c => `Onde comer com cão ao visitar ${c}: esplanadas pet-friendly, salas interiores tolerantes, taças. Política de animais verificada na fonte.` },
    de: { title: c => `Hundefreundliche Restaurants in ${c}: geprüfte Terrassen`, desc: c => `Wo Sie mit Hund essen können, wenn Sie ${c} besuchen: hundefreundliche Terrassen, tolerante Innenräume, Wassernäpfe. Tierrichtlinie für jedes Lokal an der Quelle geprüft.` },
  },
  beaches: {
    en: { title: c => `Dog-friendly beaches near ${c}: seasonal rules & access`, desc: c => `Beaches that accept dogs near ${c}: year-round zones, seasonal restrictions, transport from the city centre. Picked for travellers, verified locally.` },
    fr: { title: c => `Plages canines près de ${c} : règles saisonnières & accès`, desc: c => `Plages acceptant les chiens près de ${c} : zones toute l'année, restrictions saisonnières, accès depuis le centre. Sélectionné pour voyageurs, vérifié sur place.` },
    es: { title: c => `Playas caninas cerca de ${c}: normas estacionales y acceso`, desc: c => `Playas que admiten perros cerca de ${c}: zonas todo el año, restricciones estacionales, transporte desde el centro. Seleccionado para viajeros.` },
    pt: { title: c => `Praias caninas perto de ${c}: regras sazonais e acesso`, desc: c => `Praias que aceitam cães perto de ${c}: zonas o ano inteiro, restrições sazonais, transporte a partir do centro. Selecionado para viajantes.` },
    de: { title: c => `Hundestrände bei ${c}: saisonale Regeln & Zugang`, desc: c => `Strände bei ${c}, die Hunde erlauben: ganzjährige Zonen, saisonale Einschränkungen, Transport ab der Innenstadt. Ausgewählt für Reisende, vor Ort geprüft.` },
  },
  transport: {
    en: { title: c => `Pets on public transport in ${c}: official rules`, desc: c => `Dog and cat rules on metro, trams, buses and trains in ${c}: carrier requirements, muzzle policies, ticket prices, all verified with the operator.` },
    fr: { title: c => `Animaux dans les transports à ${c} : règles officielles`, desc: c => `Règles pour chiens et chats dans métro, tram, bus, train à ${c} : cage de transport, muselière, prix, tout vérifié auprès de l'opérateur.` },
    es: { title: c => `Mascotas en transporte público en ${c}: normas oficiales`, desc: c => `Normas para perros y gatos en metro, tranvía, autobús y tren en ${c}: transportín, bozal, precios, todo verificado con el operador.` },
    pt: { title: c => `Animais nos transportes públicos em ${c}: regras oficiais`, desc: c => `Regras para cães e gatos no metro, elétrico, autocarro e comboio em ${c}: transportadora, açaime, preços, tudo verificado com o operador.` },
    de: { title: c => `Haustiere im öffentlichen Nahverkehr in ${c}: offizielle Regeln`, desc: c => `Regeln für Hunde und Katzen in U-Bahn, Straßenbahn, Bus und Zug in ${c}: Transportboxpflicht, Maulkorbpflicht, Ticketpreise, alles beim Betreiber geprüft.` },
  },
  vets: {
    en: { title: c => `24/7 emergency vets in ${c}: travellers' contact list`, desc: c => `Emergency and 24-hour vet clinics in ${c} with verified phone numbers and addresses. The list every pet traveller should save before arriving.` },
    fr: { title: c => `Vétos d'urgence 24h/24 à ${c} : liste pour voyageurs`, desc: c => `Cliniques vétérinaires d'urgence et 24h/24 à ${c} avec numéros et adresses vérifiés. La liste à enregistrer avant d'arriver avec un animal.` },
    es: { title: c => `Vetes de urgencia 24/7 en ${c}: lista para viajeros`, desc: c => `Clínicas veterinarias de urgencia y 24 h en ${c} con teléfonos y direcciones verificados. La lista para guardar antes de llegar con un animal.` },
    pt: { title: c => `Vetes de urgência 24/7 em ${c}: lista para viajantes`, desc: c => `Clínicas veterinárias de urgência e 24 h em ${c} com telefones e moradas verificados. A lista para guardar antes de chegar com um animal.` },
    de: { title: c => `Tierärzte 24/7 in ${c}: Kontaktliste für Reisende`, desc: c => `Notfall- und 24-Stunden-Tierarztpraxen in ${c} mit geprüften Telefonnummern und Adressen. Die Liste, die jeder Haustierreisende vor der Ankunft speichern sollte.` },
  },
  attractions: {
    en: { title: c => `Pet-friendly attractions in ${c} for visitors`, desc: c => `Sights, museums, gardens and tours that welcome dogs (and sometimes cats) in ${c}. Curated for travellers, with the pet policy of each venue.` },
    fr: { title: c => `Sites pet-friendly à ${c} pour visiteurs`, desc: c => `Monuments, musées, jardins et visites qui accueillent les chiens (et parfois les chats) à ${c}. Sélectionné pour voyageurs, politique animaux de chaque lieu.` },
    es: { title: c => `Atracciones pet-friendly en ${c} para visitantes`, desc: c => `Monumentos, museos, jardines y visitas que admiten perros (y a veces gatos) en ${c}. Seleccionado para viajeros, con la política de cada lugar.` },
    pt: { title: c => `Atrações pet-friendly em ${c} para visitantes`, desc: c => `Monumentos, museus, jardins e visitas que aceitam cães (e por vezes gatos) em ${c}. Selecionado para viajantes, com a política de cada lugar.` },
    de: { title: c => `Haustierfreundliche Sehenswürdigkeiten in ${c} für Besucher`, desc: c => `Sehenswürdigkeiten, Museen, Gärten und Touren in ${c}, die Hunde (und manchmal Katzen) willkommen heißen. Zusammengestellt für Reisende, mit der Tierrichtlinie jeder Einrichtung.` },
  },
  petsitting: {
    en: { title: c => `Pet-sitters in ${c}: verified platforms & local services`, desc: c => `Hour and overnight pet-sitters in ${c}: verified platforms (Rover, Pawshake), local services, prices and contact details for travelling owners.` },
    fr: { title: c => `Pet-sitters à ${c} : plateformes & services locaux vérifiés`, desc: c => `Pet-sitters à l'heure ou la nuit à ${c} : plateformes vérifiées (Rover, Pawshake), services locaux, tarifs et contacts pour propriétaires en voyage.` },
    es: { title: c => `Cuidadores de mascotas en ${c}: plataformas verificadas`, desc: c => `Cuidadores por horas o noche en ${c}: plataformas verificadas (Rover, Pawshake), servicios locales, precios y contactos para dueños en viaje.` },
    pt: { title: c => `Cuidadores de animais em ${c}: plataformas verificadas`, desc: c => `Cuidadores à hora ou noite em ${c}: plataformas verificadas (Rover, Pawshake), serviços locais, preços e contactos para donos em viagem.` },
    de: { title: c => `Haustierbetreuung in ${c}: geprüfte Plattformen & lokale Dienste`, desc: c => `Stunden- und Übernachtbetreuung in ${c}: geprüfte Plattformen (Rover, Pawshake), lokale Dienste, Preise und Kontaktdaten für reisende Besitzer.` },
  },
}

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
  const lang = (locale === 'fr' || locale === 'es' || locale === 'pt' || locale === 'de') ? locale : 'en'
  const localizedCity = getLocalizedCityName(dest.slug, dest.name, locale)

  // Prefer the traveller-intent template; fall back to JSON title for sections we haven't templated.
  const tpl = META_TPL[guide]?.[lang]
  const fallbackTitle = locale === 'fr' ? guideData.titleFr : locale === 'es' ? guideData.titleEs : locale === 'pt' && guideData.titlePt ? guideData.titlePt : locale === 'de' && guideData.titleDe ? guideData.titleDe : guideData.titleEn
  const fallbackIntro = locale === 'fr' ? guideData.introFr : locale === 'es' ? guideData.introEs : locale === 'pt' && guideData.introPt ? guideData.introPt : locale === 'de' && guideData.introDe ? guideData.introDe : guideData.introEn

  const metaTitle = tpl ? tpl.title(localizedCity) : (fallbackTitle ?? guideData.titleEn)
  const metaDesc = tpl ? tpl.desc(localizedCity) : String(fallbackIntro ?? guideData.introEn ?? '').slice(0, 160)

  return {
    title: `${metaTitle}`,
    description: metaDesc,
    alternates: {
      canonical: `${SITE_URL}/${locale}/destinations/${slug}/${guide}`,
      languages: {
        ...Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/destinations/${slug}/${guide}`])),
        'x-default': `${SITE_URL}/en/destinations/${slug}/${guide}`,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      type: 'article',
    },
  }
}

// ─── Locale helpers ───────────────────────────────────────────────────────────

/** Pick locale-aware value with English fallback */
function loc<T extends string | undefined>(en: T, fr: T | undefined, es: T | undefined, locale: string, pt?: T | undefined, de?: T | undefined): T {
  if (locale === 'fr' && fr) return fr
  if (locale === 'es' && es) return es
  if (locale === 'pt' && pt) return pt
  if (locale === 'de' && de) return de
  return en
}

function getPlaceField(place: GuidePlace, field: string, locale: string): string {
  const p = place as unknown as Record<string, string | undefined>
  const enVal = p[field]
  const frVal = p[`${field}Fr`]
  const esVal = p[`${field}Es`]
  const ptVal = p[`${field}Pt`]
  const deVal = p[`${field}De`]
  return loc(enVal ?? '', frVal, esVal, locale, ptVal, deVal)
}

/**
 * Tip cards across city-guide JSONs reuse a small set of generic concept
 * names (Currency & cost, Best season, Languages, etc.) that were never
 * localized in the data layer. This dictionary translates the recurring
 * ones to FR/ES/PT. Falls back to the EN name for one-off, city-specific
 * tip titles (most of those are already proper nouns or local terms).
 */
const TIP_NAME_I18N: Record<string, { fr: string; es: string; pt: string; de: string }> = {
  'Currency & cost': {
    fr: 'Monnaie et budget',
    es: 'Moneda y presupuesto',
    pt: 'Moeda e custo',
    de: 'Währung und Kosten',
  },
  'Best season': {
    fr: 'Meilleure saison',
    es: 'Mejor temporada',
    pt: 'Melhor época',
    de: 'Beste Reisezeit',
  },
  Languages: {
    fr: 'Langues',
    es: 'Idiomas',
    pt: 'Idiomas',
    de: 'Sprachen',
  },
  'Heat & paw safety': {
    fr: 'Chaleur et coussinets',
    es: 'Calor y almohadillas',
    pt: 'Calor e almofadas',
    de: 'Hitze und Pfotenschutz',
  },
  'Post-Brexit UK travel paperwork': {
    fr: 'Formalités post-Brexit pour le Royaume-Uni',
    es: 'Trámites post-Brexit para Reino Unido',
    pt: 'Formalidades pós-Brexit para o Reino Unido',
    de: 'Post-Brexit-Einreiseformalitäten für Großbritannien',
  },
  'UK pet-import paperwork (2026)': {
    fr: `Formalités d'entrée d'animaux au Royaume-Uni (2026)`,
    es: 'Trámites de entrada de mascotas al Reino Unido (2026)',
    pt: 'Formalidades de entrada de animais no Reino Unido (2026)',
    de: 'Einreiseformalitäten für Haustiere nach Großbritannien (2026)',
  },
  'Norwegian entry & tapeworm rules': {
    fr: `Entrée en Norvège et règles de vermifuge contre l'echinococcose`,
    es: 'Entrada en Noruega y normas de desparasitación',
    pt: 'Entrada na Noruega e regras de desparasitação',
    de: 'Einreise nach Norwegen und Bandwurm-Entwurmungspflicht',
  },
  'Choose your neighbourhood carefully': {
    fr: 'Choisissez bien votre quartier',
    es: 'Elige bien tu barrio',
    pt: 'Escolha bem o seu bairro',
    de: 'Wählen Sie Ihr Viertel sorgfältig',
  },
}

function localizePlaceName(place: GuidePlace, locale: string): string {
  // 1. JSON-level localized name wins
  const p = place as unknown as Record<string, string | undefined>
  if (locale === 'fr' && p.nameFr) return p.nameFr
  if (locale === 'es' && p.nameEs) return p.nameEs
  if (locale === 'pt' && p.namePt) return p.namePt
  // 2. Fallback to dictionary for recurring generic concept tips
  const dict = TIP_NAME_I18N[place.name]
  if (dict && (locale === 'fr' || locale === 'es' || locale === 'pt' || locale === 'de')) return dict[locale]
  // 3. Last fallback = original EN name
  return place.name
}

// ─── UI label maps ────────────────────────────────────────────────────────────

function uiLabels(locale: string) {
  const en = {
    updated: 'Updated',
    cityOverview: '← City overview',
    offLeash: 'Off-leash ✓',
    enSpoken: 'EN spoken',
    offLeashZone: 'Off-leash zone:',
    rules: 'Rules:',
    viewOnMaps: 'View on Google Maps →',
    visitWebsite: 'Visit official website →',
    nearbyHotels: 'Pet-friendly hotels nearby →',
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
  if (locale === 'fr') return {
    ...en,
    updated: 'Mis à jour le',
    cityOverview: '← Aperçu de la ville',
    offLeash: 'Sans laisse ✓',
    enSpoken: 'Anglais parlé',
    offLeashZone: 'Zone sans laisse :',
    rules: 'Règles :',
    viewOnMaps: 'Voir sur Google Maps →',
    visitWebsite: 'Site officiel →',
    nearbyHotels: `Hôtels pet-friendly à proximité →`,
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
    ...en,
    updated: 'Actualizado el',
    cityOverview: '← Vista general',
    offLeash: 'Sin correa ✓',
    enSpoken: 'Inglés hablado',
    offLeashZone: 'Zona sin correa:',
    rules: 'Normas:',
    viewOnMaps: 'Ver en Google Maps →',
    visitWebsite: 'Sitio oficial →',
    nearbyHotels: 'Hoteles pet-friendly cerca →',
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
  if (locale === 'de') return {
    ...en,
    updated: 'Aktualisiert am',
    cityOverview: '← Stadtübersicht',
    offLeash: 'Freilauf ✓',
    enSpoken: 'Englisch gesprochen',
    offLeashZone: 'Freilaufzone:',
    rules: 'Regeln:',
    viewOnMaps: 'Auf Google Maps ansehen →',
    visitWebsite: 'Offizielle Website besuchen →',
    nearbyHotels: 'Haustierfreundliche Hotels in der Nähe →',
    modeHeader: 'Verkehrsmittel',
    policyHeader: 'Richtlinie',
    tipHeader: 'Tipp',
    euPets: 'Haustiere aus der EU:',
    nonEuPets: 'Haustiere außerhalb der EU:',
    emergencyContacts: 'Notfallkontakte:',
    perNight: '/Nacht',
    admissionFee: 'Eintritt:',
    dogPolicy: 'Hunderichtlinie:',
    serviceType: 'Service:',
    seeAllHotels: 'Alle Hotels ansehen →',
    compareBooking: 'Auf Booking.com vergleichen →',
    moreGuides: (city: string) => `Weitere Guides für ${city}`,
    quickTips: '💡 Praktische Tipps',
    faqTitle: 'Häufig gestellte Fragen',
    hotelsTitle: (city: string) => `Haustierfreundliche Hotels in ${city}`,
    hotelsSubtitle: 'Unsere bestbewerteten haustierfreundlichen Hotels, handverlesen und geprüft.',
    entryTitle: 'Einreisebestimmungen für Haustiere',
  }
  return en
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

  const title = (locale === 'fr' ? guideData.titleFr : locale === 'es' ? guideData.titleEs : locale === 'pt' ? guideData.titlePt : locale === 'de' ? guideData.titleDe : null) ?? guideData.titleEn
  const intro = (locale === 'fr' ? guideData.introFr : locale === 'es' ? guideData.introEs : locale === 'pt' ? guideData.introPt : locale === 'de' ? guideData.introDe : null) ?? guideData.introEn
  const tipsPick = (locale === 'fr' ? guideData.tipsFr : locale === 'es' ? guideData.tipsEs : locale === 'pt' ? guideData.tipsPt : locale === 'de' ? guideData.tipsDe : null) ?? guideData.tipsEn
  const faqsPick = (locale === 'fr' ? guideData.faqsFr : locale === 'es' ? guideData.faqsEs : locale === 'pt' ? guideData.faqsPt : locale === 'de' ? guideData.faqsDe : null) ?? guideData.faqsEn
  // Never trust the shape from a JSON authored by the daily pipeline: a section
  // whose tips/faqs came through as an object instead of an array would crash
  // the whole route on .map(). Coerce to an array defensively.
  const tips = Array.isArray(tipsPick) ? tipsPick : []
  const faqs = Array.isArray(faqsPick) ? faqsPick : []

  // Sibling guides for this city
  const siblingGuides = GUIDE_SLUGS.filter(g => g !== guide && cityGuide.guides[g])

  // Nearby hotels — value-aware order so an affordable option leads (avoids
  // price-shock on premium destinations) rather than leading with luxury.
  const cityHotels = hotels.filter(h => h.destinationSlug === slug)
  const topicalCat: Partial<Record<GuideSlug, string>> = { parks: 'near-parks', beaches: 'beach-access' }
  const catForGuide = topicalCat[guide as GuideSlug]
  // On a topical guide (beaches/parks), lead with hotels matching that theme so a
  // beach-guide reader sees seaside hotels, not generic picks. The single money-
  // page category (catForGuide) is too narrow for the hotel filter (many beach
  // towns have 0 'beach-access' tags), so match a broader themed set. Fall back
  // to the value-sorted city list when matched inventory is thin.
  const CONTEXT_CATS: Partial<Record<GuideSlug, string[]>> = {
    beaches: ['beach-access', 'beachfront', 'beachfront-pet-friendly', 'near-beach', 'seaside', 'seafront', 'sea-view', 'waterfront', 'beach', 'beachy'],
    parks: ['near-parks', 'park-view', 'garden'],
  }
  const contextCats = CONTEXT_CATS[guide as GuideSlug]
  const matchedHotels = contextCats
    ? valueSort(cityHotels.filter(h => Array.isArray(h.categories) && h.categories.some(c => contextCats.includes(c))))
    : []
  const destHotels = (matchedHotels.length >= 3 ? matchedHotels : valueSort(cityHotels)).slice(0, 3)
  // Premium upsell: the best-rated 5-star not already in the value picks. Shown
  // as a separate opt-in card so high-basket travellers self-select (raises
  // average commission) without price-shocking the value-led list above.
  const premiumHotel = cityHotels
    .filter(h => h.stars === 5 && !destHotels.some(d => d.id === h.id))
    .sort((a, b) => b.rating - a.rating || b.priceFrom - a.priceFrom)[0] ?? null
  const bookLabelUi = locale === 'fr' ? 'Réserver' : (locale === 'es' || locale === 'pt') ? 'Reservar' : locale === 'de' ? 'Buchen' : 'Book'
  const perNightUi = locale === 'fr' ? '/nuit' : locale === 'es' ? '/noche' : locale === 'pt' ? '/noite' : locale === 'de' ? '/Nacht' : '/night'

  // Internal-link money bridge: this guide page ranks well (position 3-6), the
  // city's pet-friendly hotels money page ranks much deeper. A prominent link
  // here funnels internal authority to it AND gives the reader the commercial
  // path. Topical guides (parks/beaches) point at the matching category page
  // when that combo has inventory, otherwise the city hub.
  const localizedCity = getLocalizedCityName(dest.slug, dest.name, locale)
  const cityMinPrice = cityHotels.length ? Math.min(...cityHotels.map(h => h.priceFrom)) : 0
  const hotelsHref = catForGuide && cityHotels.some(h => h.categories.includes(catForGuide))
    ? `/${locale}/${slug}/${catForGuide}`
    : `/${locale}/destinations/${slug}`

  // Geographically nearest destinations — cross-sell to recover the traffic on
  // high-click / low-conversion premium pages (e.g. a user who can't find the
  // right place in Lugano sees nearby alternatives instead of leaving).
  const toRad = (n: number) => (n * Math.PI) / 180
  const haversineKm = (aLat: number, aLng: number, bLat: number, bLng: number) => {
    const dLat = toRad(bLat - aLat), dLng = toRad(bLng - aLng)
    const x = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2
    return 6371 * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
  }
  const nearbyDests = (dest.lat && dest.lng)
    ? destinations
        .filter(d => d.slug !== slug && d.lat && d.lng)
        .map(d => ({ d, km: haversineKm(dest.lat, dest.lng, d.lat, d.lng) }))
        .filter(x => x.km <= 350)
        .sort((a, b) => a.km - b.km)
        .slice(0, 4)
        .map(x => x.d)
    : []

  const guideLabels: Record<GuideSlug, Record<string, string>> = {
    restaurants: { en: 'Restaurants', fr: 'Restaurants', es: 'Restaurantes', de: 'Restaurants' },
    parks:       { en: 'Parks & Walks', fr: 'Parcs & Balades', es: 'Parques y Paseos', de: 'Parks & Spaziergänge' },
    transport:   { en: 'Transport', fr: 'Transport', es: 'Transporte', de: 'Nahverkehr' },
    beaches:     { en: 'Beaches', fr: 'Plages', es: 'Playas', de: 'Strände' },
    vets:        { en: 'Vets', fr: 'Vétérinaires', es: 'Veterinarios', de: 'Tierärzte' },
    tips:        { en: 'Local Tips', fr: 'Conseils locaux', es: 'Consejos locales', de: 'Lokale Tipps' },
    attractions: { en: 'Attractions', fr: 'À visiter', es: 'Qué ver', de: 'Sehenswürdigkeiten' },
    petsitting:  { en: 'Pet Sitting', fr: 'Garde animaux', es: 'Cuidado de mascotas', de: 'Haustierbetreuung' },
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
    image: imageUrl(`/images/destinations/${slug}.jpg`),
    author: { '@type': 'Person', name: 'HotelsWithPets Editorial', url: `${SITE_URL}/${locale}/about`, jobTitle: 'Pet Travel Editor' },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets.com', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 192, height: 192 } },
  }

  // FAQPage schema, boosts CTR + can trigger rich result with collapsible FAQ in SERP
  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  const allezHref = buildAllezDestLink(dest.name, dest.country, `guide-${guide}`, 3)

  // Format date locale-aware
  const formattedDate = new Date(cityGuide.lastUpdated).toLocaleDateString(
    locale === 'fr' ? 'fr-FR' : locale === 'es' ? 'es-ES' : locale === 'pt' ? 'pt-PT' : locale === 'de' ? 'de-DE' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

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
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-gray-700 text-lg leading-relaxed">{intro}</p>
        </div>

        {/* ── Booking block: bookable top hotels. Most guide-page traffic is
             informational (parks/beaches/transport), so this gives every reader a
             direct, bookable path to a dog-friendly hotel instead of a single link. ── */}
        {destHotels.length > 0 && (
          <section className="mb-12 rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50/70 to-white p-5">
            <div className="flex items-baseline justify-between gap-3 flex-wrap mb-4">
              <h2 className="text-lg lg:text-xl font-extrabold text-gray-900">
                {locale === 'fr' ? `Réserver un hôtel acceptant les chiens à ${localizedCity}`
                  : locale === 'es' ? `Reserva un hotel que admite perros en ${localizedCity}`
                  : locale === 'pt' ? `Reserve um hotel que aceita cães em ${localizedCity}`
                  : locale === 'de' ? `Ein hundefreundliches Hotel in ${localizedCity} buchen`
                  : `Book a dog-friendly hotel in ${localizedCity}`}
              </h2>
              <Link href={hotelsHref} className="text-sm font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap">
                {locale === 'fr' ? `Voir les ${cityHotels.length} hôtels →`
                  : locale === 'es' ? `Ver los ${cityHotels.length} hoteles →`
                  : locale === 'pt' ? `Ver os ${cityHotels.length} hotéis →`
                  : locale === 'de' ? `Die ${cityHotels.length} Hotels ansehen →`
                  : `See all ${cityHotels.length} hotels →`}
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {destHotels.map(h => {
                const perNight = locale === 'fr' ? '/nuit' : locale === 'es' ? '/noche' : locale === 'pt' ? '/noite' : locale === 'de' ? '/Nacht' : '/night'
                const bookLabel = locale === 'fr' ? 'Réserver' : (locale === 'es' || locale === 'pt') ? 'Reservar' : locale === 'de' ? 'Buchen' : 'Book'
                return (
                  <a
                    key={h.id}
                    href={buildAllezLink(h.name, dest.name, dest.country, `hotelswithpets-${locale}-guidebook`, 3)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="relative h-28 flex-shrink-0">
                      <Image src={`/images/hotels/${h.id}.jpg`} alt={h.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col p-3">
                      <p className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">{h.name}</p>
                      <p className="text-[11px] text-amber-500 mt-0.5">{'★'.repeat(h.stars)} <span className="text-gray-400">{h.rating}</span></p>
                      <div className="mt-auto pt-2 flex items-center justify-between">
                        <span className="text-sm font-black text-gray-900">€{h.priceFrom}<span className="text-[11px] font-normal text-gray-400">{perNight}</span></span>
                        <span className="bg-blue-600 group-hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">{bookLabel} →</span>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
            {premiumHotel && (
              <a
                href={buildAllezLink(premiumHotel.name, dest.name, dest.country, `hotelswithpets-${locale}-guidebook-premium`, 3)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-4 flex items-center gap-3 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 px-4 py-3 hover:border-amber-300 hover:shadow-sm transition-all"
              >
                <span className="text-xl flex-shrink-0" aria-hidden="true">✨</span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[13px] font-bold text-gray-900 leading-snug line-clamp-1">
                    {locale === 'fr' ? `Envie de gâter votre chien ? ${premiumHotel.name}`
                      : locale === 'es' ? `¿Quieres consentir a tu perro? ${premiumHotel.name}`
                      : locale === 'pt' ? `Quer mimar o seu cão? ${premiumHotel.name}`
                      : locale === 'de' ? `Möchten Sie Ihren Hund verwöhnen? ${premiumHotel.name}`
                      : `Fancy spoiling your dog? ${premiumHotel.name}`}
                  </span>
                  <span className="block text-[11px] text-gray-500">
                    {locale === 'fr' ? `Le meilleur cinq-étoiles de ${localizedCity}, dès ${premiumHotel.priceFrom} €${perNightUi}.`
                      : locale === 'es' ? `El mejor cinco estrellas de ${localizedCity}, desde ${premiumHotel.priceFrom} €${perNightUi}.`
                      : locale === 'pt' ? `O melhor cinco estrelas de ${localizedCity}, desde ${premiumHotel.priceFrom} €${perNightUi}.`
                      : locale === 'de' ? `Das beste Fünf-Sterne-Hotel in ${localizedCity}, ab ${premiumHotel.priceFrom} €${perNightUi}.`
                      : `The finest five-star in ${localizedCity}, from €${premiumHotel.priceFrom}${perNightUi}.`}
                  </span>
                </span>
                <span className="flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">{bookLabelUi} →</span>
              </a>
            )}
            <p className="text-[11px] text-gray-400 mt-3">
              {locale === 'fr' ? `Politiques animaux vérifiées, prix Booking.com en direct dès ${cityMinPrice} €/nuit.`
                : locale === 'es' ? `Políticas de mascotas verificadas, precios Booking.com en directo desde ${cityMinPrice} €/noche.`
                : locale === 'pt' ? `Políticas de animais verificadas, preços Booking.com em direto desde ${cityMinPrice} €/noite.`
                : locale === 'de' ? `Geprüfte Tierrichtlinien, Live-Preise von Booking.com ab ${cityMinPrice} €/Nacht.`
                : `Verified pet policies, live Booking.com prices from €${cityMinPrice}/night.`}
            </p>
          </section>
        )}

        {/* ── Live hotel map: the proven booking surface, now on guide pages so the
             87% of traffic that lands here (parks/beaches/transport) can browse and
             book without leaving. Lazy-loaded so it never blocks first paint. ── */}
        {dest.lat && dest.lng && (
          <section className="mb-12">
            <h2 className="text-lg lg:text-xl font-extrabold text-gray-900 mb-1">
              {locale === 'fr' ? `Tous les hôtels acceptant les chiens à ${localizedCity}, sur la carte`
                : locale === 'es' ? `Todos los hoteles que admiten perros en ${localizedCity}, en el mapa`
                : locale === 'pt' ? `Todos os hotéis que aceitam cães em ${localizedCity}, no mapa`
                : locale === 'de' ? `Alle hundefreundlichen Hotels in ${localizedCity}, auf der Karte`
                : `Every dog-friendly hotel in ${localizedCity}, on the map`}
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              {locale === 'fr' ? 'Prix Booking.com en direct, cliquez un point pour voir les tarifs et réserver.'
                : locale === 'es' ? 'Precios Booking.com en directo, haz clic en un punto para ver tarifas y reservar.'
                : locale === 'pt' ? 'Preços Booking.com em direto, clique num ponto para ver tarifas e reservar.'
                : locale === 'de' ? 'Live-Preise von Booking.com, klicken Sie auf einen Punkt, um Preise zu sehen und zu buchen.'
                : 'Live Booking.com prices, click any pin to see rates and book.'}
            </p>
            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
              <iframe
                src={buildStay22MapSrc(dest.lat, dest.lng, `hotelswithpets-${locale}-guidemap`)}
                loading="lazy"
                title={locale === 'fr' ? `Carte des hôtels acceptant les chiens à ${localizedCity}` : locale === 'de' ? `Karte hundefreundlicher Hotels in ${localizedCity}` : `Dog-friendly hotels map for ${localizedCity}`}
                className="w-full"
                style={{ height: '460px', border: 0 }}
              />
            </div>
          </section>
        )}

        {/* ── Ski-resort snow report cross-link (bestsnowhotels.com, sister site) ── */}
        {bestSnowHotelsUrl(slug) && (
          <a
            href={bestSnowHotelsUrl(slug)!}
            target="_blank"
            rel="noopener"
            className="flex items-center justify-between gap-3 mb-12 rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 to-blue-50 px-5 py-4 hover:border-sky-300 hover:shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <span className="flex items-center gap-3">
              <span className="text-2xl">❄️</span>
              <span>
                <span className="block font-bold text-gray-900 text-sm">
                  {locale === 'fr' ? `Enneigement & conditions de la station de ${dest.name}`
                    : locale === 'es' ? `Estado de la nieve y condiciones de la estación de ${dest.name}`
                    : locale === 'pt' ? `Estado da neve e condições da estação de ${dest.name}`
                    : locale === 'de' ? `Schneebericht & Pistenverhältnisse für ${dest.name}`
                    : `Snow report & resort conditions for ${dest.name}`}
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">
                  {locale === 'fr' ? 'Pistes, remontées et météo en direct sur bestsnowhotels.com'
                    : locale === 'es' ? 'Pistas, remontes y tiempo en directo en bestsnowhotels.com'
                    : locale === 'pt' ? 'Pistas, teleféricos e meteo em direto em bestsnowhotels.com'
                    : locale === 'de' ? 'Live Pisten, Lifte und Wetter auf bestsnowhotels.com'
                    : 'Live pistes, lifts and weather on bestsnowhotels.com'}
                </span>
              </span>
            </span>
            <span className="text-sky-600 font-bold text-lg flex-shrink-0">→</span>
          </a>
        )}

        {/* ── Inline editorial hotel pick (above-the-fold conversion lever) ── */}
        <div className="mb-12">
          <NearbyHotelCard
            destinationSlug={slug}
            locale={locale}
            variant="compact"
          />
        </div>

        {/* ── Places list ── */}
        {Array.isArray(guideData.places) && guideData.places.length > 0 && (
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

                const localizedName = localizePlaceName(place, locale)
                // Tip cards are concept entries (Currency & cost, Best season…), not real
                // places - Google Places returns irrelevant brand logos for these queries
                // (e.g. a Ria money-transfer logo for "Currency & cost"). Skip the photo
                // header on the tips guide entirely.
                const placePhoto = guide === 'tips' ? undefined : place.photo
                // Stay22 "hotels near this place" link, reused by the tappable
                // card (photo + name) and the bottom CTA button. Mobile users tap
                // the photo and name expecting an action (Clarity dead-click data).
                const showNearby = guide !== 'tips' && Boolean(place.name)
                const placeSlug = (place.name || '')
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[̀-ͯ]/g, '')
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '')
                  .slice(0, 40)
                // Relevance fix (cancellation reduction): only beaches, parks and
                // attractions are lodging-worthy anchors - travellers genuinely want
                // to stay next to them, and those sections cancel least. For vets,
                // pet-sitting, transport and restaurants, "hotels near this place"
                // surfaces mismatched stays (e.g. a hotel next to a vet clinic on the
                // ring road) that get booked then cancelled, so anchor those on the
                // city centre instead, which returns relevant central hotels.
                const PLACE_ANCHOR_SECTIONS = new Set(['beaches', 'parks', 'attractions'])
                const nearbyAddress = PLACE_ANCHOR_SECTIONS.has(guide)
                  ? [place.name, place.address, place.neighborhood, dest.name, dest.country].filter(Boolean).join(', ')
                  : [dest.name, dest.country].filter(Boolean).join(', ')
                const nearbyHref = `https://www.stay22.com/allez/roam?aid=eijeanbaptistemanson&campaign=near-${guide}-${placeSlug}&address=${encodeURIComponent(nearbyAddress)}`

                return (
                  <article key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                    {/* Photo header */}
                    {placePhoto && (
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={placePhoto}
                          alt={place.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 800px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        {/* Number + badges overlaid on photo */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className={`text-xs font-black text-white bg-gradient-to-br ${meta.gradient} rounded-full w-7 h-7 flex items-center justify-center shadow-sm`}>
                            {i + 1}
                          </span>
                          {place.offLeash === true && (
                            <span className="text-xs font-bold bg-green-500 text-white px-2 py-1 rounded-lg">{ui.offLeash}</span>
                          )}
                        </div>
                        <div className="absolute top-3 right-3 flex items-center gap-2">
                          {place.priceRange && (
                            <span className="text-xs font-bold bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-lg">{place.priceRange}</span>
                          )}
                          {place.rating && (
                            <span className="text-xs font-bold bg-amber-400 text-gray-900 px-2 py-1 rounded-lg">⭐ {place.rating}</span>
                          )}
                        </div>
                        {/* Name on photo bottom */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="font-extrabold text-white text-xl leading-tight drop-shadow-sm">{localizedName}</h3>
                          {(place.neighborhood || place.address) && (
                            <p className="text-white/80 text-xs mt-0.5">
                              {place.neighborhood}{place.neighborhood && place.address ? ' · ' : ''}{place.address}
                            </p>
                          )}
                        </div>
                        {/* Whole photo+name is a tap target -> nearby pet-friendly hotels */}
                        {showNearby && (
                          <a
                            href={nearbyHref}
                            target="_blank"
                            rel="noopener sponsored"
                            aria-label={ui.nearbyHotels}
                            className="absolute inset-0 z-10"
                          />
                        )}
                      </div>
                    )}

                    <div className="p-6">
                      {/* Header when no photo */}
                      {!placePhoto && (
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-black text-white bg-gradient-to-br ${meta.gradient} rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0`}>
                                {i + 1}
                              </span>
                              <h3 className="font-bold text-gray-900 text-lg">
                                {showNearby ? (
                                  <a href={nearbyHref} target="_blank" rel="noopener sponsored" className="hover:text-amber-700 transition-colors">{localizedName}</a>
                                ) : localizedName}
                              </h3>
                            </div>
                            {(place.address || place.neighborhood) && (
                              <p className="text-sm text-gray-500 ml-9">
                                {place.neighborhood && <span>{place.neighborhood}{place.address ? ' · ' : ''}</span>}
                                {place.address}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
                            {place.priceRange && (
                              <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{place.priceRange}</span>
                            )}
                            {place.rating && (
                              <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-lg">⭐ {place.rating}</span>
                            )}
                            {place.offLeash === true && (
                              <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-lg">{ui.offLeash}</span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">{desc}</p>

                      {/* Metadata pills */}
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
                        {policy && (
                          <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium">
                            🐾 {policy}
                          </span>
                        )}
                        {dogPolicy && !policy && (
                          <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium">
                            🐾 {dogPolicy}
                          </span>
                        )}
                        {placeHours && (
                          <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-full">
                            🕐 {placeHours}
                          </span>
                        )}
                        {place.phone && (
                          <a
                            href={`tel:${place.phone.replace(/[^+\d]/g, '')}`}
                            className="flex items-center gap-1 bg-gray-50 hover:bg-gray-100 px-2.5 py-1 rounded-full transition-colors"
                          >
                            📞 {place.phone}
                          </a>
                        )}
                        {place.season && (
                          <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                            📅 {place.season}
                          </span>
                        )}
                        {mustTry && (
                          <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
                            ⭐ {mustTry}
                          </span>
                        )}
                        {admissionFee && (
                          <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-full">
                            🎟️ {admissionFee}
                          </span>
                        )}
                        {serviceType && (
                          <span className="flex items-center gap-1 bg-pink-50 text-pink-700 px-2.5 py-1 rounded-full">
                            🐶 {serviceType}
                          </span>
                        )}
                        {place.pricePerDay && (
                          <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-full">
                            💰 {place.pricePerDay}
                          </span>
                        )}
                        {place.englishSpeaking && (
                          <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                            🌍 {ui.enSpoken}
                          </span>
                        )}
                        {place.languages && place.languages.length > 0 && (
                          <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                            🌍 {place.languages.join(', ')}
                          </span>
                        )}
                      </div>

                      {/* Tip / rules callout */}
                      {(tipText || rulesText || offLeashAreaText) && (
                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4 space-y-1">
                          {offLeashAreaText && <p className="text-xs text-amber-800"><strong>{ui.offLeashZone}</strong> {offLeashAreaText}</p>}
                          {rulesText && <p className="text-xs text-amber-800"><strong>{ui.rules}</strong> {rulesText}</p>}
                          {tipText && <p className="text-xs text-amber-700">💡 {tipText}</p>}
                        </div>
                      )}

                      {/* External links + nearby-hotels CTA row */}
                      {(() => {
                        // showNearby + nearbyHref are computed once above (also used
                        // by the tappable photo/name). Skip the row entirely only when
                        // there is nothing to link to.
                        const mapsHref = place.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name} ${dest.name}`)}`
                        if (!showNearby && !place.website) return null
                        return (
                          <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-50">
                            {showNearby && (
                              <a
                                href={nearbyHref}
                                target="_blank"
                                rel="noopener sponsored"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-lg transition-colors"
                              >
                                🏨 {ui.nearbyHotels}
                              </a>
                            )}
                            {place.website && (
                              <a
                                href={place.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                              >
                                🌐 {ui.visitWebsite}
                              </a>
                            )}
                            <a
                              href={mapsHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              📍 {ui.viewOnMaps}
                            </a>
                          </div>
                        )
                      })()}
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        )}

        {/* ── Transport rules table ── */}
        {Array.isArray(guideData.rules) && guideData.rules.length > 0 && (
          <section className="mb-12">
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 w-1/4">{ui.modeHeader}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 w-1/2">{ui.policyHeader}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">{ui.tipHeader}</th>
                  </tr>
                </thead>
                <tbody>
                  {guideData.rules.map((rule, i) => {
                    const mode = loc(rule.mode, rule.modeFr, rule.modeEs, locale, undefined, rule.modeDe)
                    const policy = loc(rule.policy, rule.policyFr, rule.policyEs, locale, undefined, rule.policyDe)
                    const tip = loc(rule.tip, rule.tipFr, rule.tipEs, locale, rule.tipPt, rule.tipDe)
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
                {loc(guideData.entryRequirements.euPets, guideData.entryRequirements.euPetsFr, guideData.entryRequirements.euPetsEs, locale, undefined, guideData.entryRequirements.euPetsDe)}
              </div>
              <div>
                <strong>{ui.nonEuPets}</strong>{' '}
                {loc(guideData.entryRequirements.nonEuPets, guideData.entryRequirements.nonEuPetsFr, guideData.entryRequirements.nonEuPetsEs, locale, undefined, guideData.entryRequirements.nonEuPetsDe)}
              </div>
              {Array.isArray(guideData.entryRequirements.emergencyContacts) && (
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
        {Array.isArray(guideData.sections) && guideData.sections.length > 0 && (
          <section className="mb-12 space-y-6">
            {guideData.sections.map((section, i) => {
              const secTitle = (locale === 'fr' ? section.titleFr : locale === 'es' ? section.titleEs : locale === 'pt' ? section.titlePt : locale === 'de' ? section.titleDe : null) ?? section.titleEn
              const secContent = (locale === 'fr' ? section.contentFr : locale === 'es' ? section.contentEs : locale === 'pt' ? section.contentPt : null) ?? section.contentEn
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

        {/* ── Amazon accessories cross-link (FR only - pages don't exist yet in EN/ES/PT) ── */}
        {locale === 'fr' && (guide === 'tips' || guide === 'transport' || guide === 'beaches') && (
          <section className="mb-12 bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-300 rounded-2xl p-6">
            <h2 className="text-xl font-extrabold text-stone-900 mb-2">🎒 Voyager bien équipé</h2>
            <p className="text-sm text-stone-700 mb-4 leading-relaxed">
              Notre sélection d&apos;accessoires testés pour partir avec son chien :
              gourde nomade, tapis rafraîchissant, harnais voiture, sac de transport.
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link href={`/fr/accessoires-chien`} className="bg-white border border-amber-400 text-amber-900 font-semibold px-3 py-2 rounded-full hover:bg-amber-50">
                Accessoires chien →
              </Link>
              <Link href={`/fr/accessoires-chien-chaleur`} className="bg-white border border-amber-400 text-amber-900 font-semibold px-3 py-2 rounded-full hover:bg-amber-50">
                Spécial canicule 🔥 →
              </Link>
              <Link href={`/fr/accessoires-chat`} className="bg-white border border-stone-300 text-stone-700 px-3 py-2 rounded-full hover:bg-stone-50">
                Accessoires chat →
              </Link>
            </div>
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
                    <span aria-hidden="true" className="text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
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

        {/* ── Nearby destinations cross-sell ── */}
        {nearbyDests.length > 0 && (
          <section className="mt-12 pt-10 border-t border-gray-100">
            <h2 className="text-xl font-extrabold text-gray-900 mb-1">
              {locale === 'fr' ? 'Destinations pet-friendly à proximité'
                : locale === 'es' ? 'Destinos pet-friendly cerca'
                : locale === 'pt' ? 'Destinos pet-friendly por perto'
                : locale === 'de' ? 'Haustierfreundliche Reiseziele in der Nähe'
                : 'Pet-friendly destinations nearby'}
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              {locale === 'fr' ? `Vous cherchez un logement ailleurs ? Ces destinations proches de ${dest.name} accueillent aussi votre chien.`
                : locale === 'es' ? `¿Buscas alojamiento en otro lugar? Estos destinos cerca de ${dest.name} también admiten a tu perro.`
                : locale === 'pt' ? `Procura alojamento noutro sítio? Estes destinos perto de ${dest.name} também aceitam o seu cão.`
                : locale === 'de' ? `Suchen Sie eine Unterkunft anderswo? Diese Reiseziele in der Nähe von ${dest.name} heißen Ihren Hund ebenfalls willkommen.`
                : `Looking for a place to stay elsewhere? These destinations near ${dest.name} also welcome your dog.`}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {nearbyDests.map(d => (
                <Link
                  key={d.slug}
                  href={`/${locale}/destinations/${d.slug}`}
                  className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-2xl px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <span className="text-xl">{d.flag}</span>
                  <span className="font-bold text-sm text-gray-800">{getLocalizedCityName(d.slug, d.name, locale)}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Mobile sticky CTA (appears after 30% scroll) ── */}
      <StickyHotelCTA
        href={allezHref}
        label={
          locale === 'fr' ? `Hôtels pet-friendly à ${dest.name}` :
          locale === 'es' ? `Hoteles pet-friendly en ${dest.name}` :
          locale === 'pt' ? `Hotéis pet-friendly em ${dest.name}` :
          locale === 'de' ? `Haustierfreundliche Hotels in ${dest.name}` :
          `Pet-friendly hotels in ${dest.name}`
        }
        cta={
          locale === 'fr' ? 'Voir les hôtels' :
          locale === 'es' ? 'Ver hoteles' :
          locale === 'pt' ? 'Ver hotéis' :
          locale === 'de' ? 'Hotels ansehen' :
          'See hotels'
        }
      />
    </>
  )
}
