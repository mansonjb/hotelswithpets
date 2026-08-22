import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildStay22MapSrc, buildAllezDestLink, buildAllezLink } from '@/lib/site'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import arrondissementsRaw from '@/data/paris-arrondissements.json'

type Park = {
  name: string
  policyEn: string
  policyFr: string
  policyEs: string
  policyPt: string
}
type Vet = {
  name: string
  address: string
  phone: string
  hoursNote?: string
}
type ArrHotel = {
  name: string
  stars?: number
  priceFrom?: number
  petFee?: number
  pitchEn: string
  pitchFr: string
  pitchEs: string
  pitchPt: string
  image?: string
}
type Arr = {
  n: number
  slug: string
  name: string
  popularName: string
  lat: number
  lng: number
  metros: string[]
  introEn: string
  introFr: string
  introEs: string
  introPt: string
  highlightsEn: string[]
  highlightsFr: string[]
  highlightsEs: string[]
  highlightsPt: string[]
  parks: Park[]
  vets: Vet[]
  hotels: ArrHotel[]
}
const arrondissements: Arr[] = arrondissementsRaw as Arr[]

export async function generateStaticParams() {
  const out: { locale: string; arr: string }[] = []
  for (const locale of locales) {
    for (const a of arrondissements) {
      out.push({ locale, arr: a.slug })
    }
  }
  return out
}

function findArr(slug: string): Arr | undefined {
  return arrondissements.find((a) => a.slug === slug)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; arr: string }>
}): Promise<Metadata> {
  const { locale, arr } = await params
  if (!hasLocale(locale)) return {}
  const a = findArr(arr)
  if (!a) return {}

  const titles: Record<string, string> = {
    en: `Paris ${a.slug} (${a.popularName}) with a dog: parks, vets & hotels`,
    fr: `Paris ${a.slug} (${a.popularName}) avec son chien : parcs, vétérinaires et hôtels`,
    es: `París ${a.slug} (${a.popularName}) con perro: parques, veterinarios y hoteles`,
    pt: `Paris ${a.slug} (${a.popularName}) com cão: parques, veterinários e hotéis`,
    nl: `Parijs ${a.slug} (${a.popularName}) met je hond: parken, dierenartsen en hotels`,
    it: `Parigi ${a.slug} (${a.popularName}) con il cane: parchi, veterinari e hotel`,
  }
  const descriptions: Record<string, string> = {
    en: `What to know about ${a.popularName} (${a.slug}) with a dog: the parks that actually accept leashed dogs, the verified vets, the metro lines and the pet-friendly hotel inventory in the area.`,
    fr: `Tout sur ${a.popularName} (${a.slug}) avec un chien : les parcs qui acceptent vraiment les chiens en laisse, les vétérinaires vérifiés, les lignes de métro et les hôtels pet-friendly du quartier.`,
    es: `Todo sobre ${a.popularName} (${a.slug}) con perro: los parques que realmente aceptan perros con correa, los veterinarios verificados, las líneas de metro y los hoteles pet-friendly del barrio.`,
    pt: `Tudo sobre ${a.popularName} (${a.slug}) com cão: os parques que realmente aceitam cães à trela, os veterinários verificados, as linhas de metro e os hotéis pet-friendly do bairro.`,
    nl: `Alles over ${a.popularName} (${a.slug}) met je hond: de parken die honden aan de lijn echt toelaten, de geverifieerde dierenartsen, de metrolijnen en het aanbod hondvriendelijke hotels in de wijk.`,
    it: `Tutto su ${a.popularName} (${a.slug}) con il cane: i parchi che accettano davvero i cani al guinzaglio, i veterinari verificati, le linee della metro e gli hotel pet-friendly della zona.`,
  }

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/destinations/paris/arrondissements/${a.slug}`,
      languages: {
        en: `${SITE_URL}/en/destinations/paris/arrondissements/${a.slug}`,
        fr: `${SITE_URL}/fr/destinations/paris/arrondissements/${a.slug}`,
        es: `${SITE_URL}/es/destinations/paris/arrondissements/${a.slug}`,
        pt: `${SITE_URL}/pt/destinations/paris/arrondissements/${a.slug}`,
        de: `${SITE_URL}/de/destinations/paris/arrondissements/${a.slug}`,
        nl: `${SITE_URL}/nl/destinations/paris/arrondissements/${a.slug}`,
        'x-default': `${SITE_URL}/en/destinations/paris/arrondissements/${a.slug}`,
      },
    },
  }
}

const COPY = {
  en: {
    metroLabel: 'Metro',
    centerLabel: 'Centred at',
    introHeading: 'About the area',
    highlightsHeading: 'Pet-friendly spots',
    parksHeading: 'Parks & green spaces',
    vetsHeading: 'Vets nearby',
    hotelsHeading: 'Our pet-friendly picks',
    hotelsNote: `A short editorial selection. The map below shows the full Booking.com inventory.`,
    starsLabel: '★',
    fromLabel: 'from',
    perNightLabel: '/night',
    petFeeLabel: 'pet fee',
    petFeeFreeLabel: 'pets stay free',
    checkAvailability: 'Check availability →',
    mapHeading: 'All pet-friendly hotels in the area',
    mapNote: `Live availability and prices, dogs and cats accepted. Bookable via Booking.com & partners.`,
    seeHotels: `See pet-friendly hotels in Paris ${''}`,
    backToHub: 'Back to all arrondissements',
    comingSoon: 'Detailed guide coming soon. In the meantime, browse pet-friendly hotels in this area below.',
    stickyLabel: 'Pet-friendly hotels in Paris',
    stickyCta: 'See hotels',
  },
  fr: {
    metroLabel: 'Métro',
    centerLabel: 'Centré sur',
    introHeading: 'À propos du quartier',
    highlightsHeading: 'Spots pet-friendly',
    parksHeading: 'Parcs et espaces verts',
    vetsHeading: 'Vétérinaires à proximité',
    hotelsHeading: 'Notre sélection pet-friendly',
    hotelsNote: `Une sélection éditoriale courte. La carte ci-dessous montre tout l'inventaire Booking.com.`,
    starsLabel: '★',
    fromLabel: `dès`,
    perNightLabel: '/nuit',
    petFeeLabel: 'supplément animal',
    petFeeFreeLabel: `animaux gratuits`,
    checkAvailability: `Voir les disponibilités →`,
    mapHeading: 'Tous les hôtels pet-friendly du quartier',
    mapNote: `Disponibilités et prix en direct, chiens et chats acceptés. Réservable via Booking.com et partenaires.`,
    seeHotels: 'Voir les hôtels pet-friendly à Paris',
    backToHub: 'Retour aux 20 arrondissements',
    comingSoon: 'Guide détaillé en cours de rédaction. En attendant, parcourez les hôtels pet-friendly du quartier ci-dessous.',
    stickyLabel: `Hôtels pet-friendly à Paris`,
    stickyCta: 'Voir les hôtels',
  },
  es: {
    metroLabel: 'Metro',
    centerLabel: 'Centrado en',
    introHeading: 'Sobre el barrio',
    highlightsHeading: 'Lugares pet-friendly',
    parksHeading: 'Parques y zonas verdes',
    vetsHeading: 'Veterinarios cercanos',
    hotelsHeading: 'Nuestra selección pet-friendly',
    hotelsNote: `Una selección editorial breve. El mapa de abajo muestra todo el inventario Booking.com.`,
    starsLabel: '★',
    fromLabel: 'desde',
    perNightLabel: '/noche',
    petFeeLabel: 'suplemento mascota',
    petFeeFreeLabel: 'mascotas gratis',
    checkAvailability: 'Ver disponibilidad →',
    mapHeading: 'Todos los hoteles pet-friendly del barrio',
    mapNote: `Disponibilidad y precios en vivo, perros y gatos admitidos. Reservable vía Booking.com y socios.`,
    seeHotels: 'Ver hoteles pet-friendly en París',
    backToHub: 'Volver a los 20 arrondissements',
    comingSoon: 'Guía detallada en preparación. Mientras tanto, explora los hoteles pet-friendly del barrio abajo.',
    stickyLabel: 'Hoteles pet-friendly en París',
    stickyCta: 'Ver hoteles',
  },
  pt: {
    metroLabel: 'Metro',
    centerLabel: 'Centrado em',
    introHeading: 'Sobre o bairro',
    highlightsHeading: 'Locais pet-friendly',
    parksHeading: 'Parques e zonas verdes',
    vetsHeading: 'Veterinários próximos',
    hotelsHeading: 'A nossa seleção pet-friendly',
    hotelsNote: `Uma seleção editorial curta. O mapa abaixo mostra todo o inventário Booking.com.`,
    starsLabel: '★',
    fromLabel: 'desde',
    perNightLabel: '/noite',
    petFeeLabel: 'taxa animal',
    petFeeFreeLabel: 'animais grátis',
    checkAvailability: 'Ver disponibilidade →',
    mapHeading: 'Todos os hotéis pet-friendly do bairro',
    mapNote: `Disponibilidade e preços ao vivo, cães e gatos aceites. Reservável via Booking.com e parceiros.`,
    seeHotels: 'Ver hotéis pet-friendly em Paris',
    backToHub: 'Voltar aos 20 arrondissements',
    comingSoon: 'Guia detalhado em preparação. Entretanto, explore os hotéis pet-friendly do bairro abaixo.',
    stickyLabel: 'Hotéis pet-friendly em Paris',
    stickyCta: 'Ver hotéis',
  },
  nl: {
    metroLabel: 'Metro',
    centerLabel: 'Centrum bij',
    introHeading: 'Over de wijk',
    highlightsHeading: 'Hondvriendelijke plekken',
    parksHeading: 'Parken en groene ruimtes',
    vetsHeading: 'Dierenartsen in de buurt',
    hotelsHeading: 'Onze hondvriendelijke selectie',
    hotelsNote: `Een korte redactionele selectie. De kaart hieronder toont het volledige Booking.com-aanbod.`,
    starsLabel: '★',
    fromLabel: 'vanaf',
    perNightLabel: '/nacht',
    petFeeLabel: 'huisdiertoeslag',
    petFeeFreeLabel: 'huisdieren gratis',
    checkAvailability: 'Bekijk beschikbaarheid →',
    mapHeading: 'Alle hondvriendelijke hotels in de wijk',
    mapNote: `Actuele beschikbaarheid en prijzen, honden en katten welkom. Boekbaar via Booking.com en partners.`,
    seeHotels: `Bekijk hondvriendelijke hotels in Parijs ${''}`,
    backToHub: 'Terug naar alle arrondissementen',
    comingSoon: 'Uitgebreide gids volgt binnenkort. Bekijk ondertussen de hondvriendelijke hotels in deze wijk hieronder.',
    stickyLabel: 'Hondvriendelijke hotels in Parijs',
    stickyCta: 'Bekijk hotels',
  },
  it: {
    metroLabel: 'Metro',
    centerLabel: 'Centrato su',
    introHeading: 'Sul quartiere',
    highlightsHeading: 'Spot pet-friendly',
    parksHeading: 'Parchi e spazi verdi',
    vetsHeading: 'Veterinari nelle vicinanze',
    hotelsHeading: 'La nostra selezione pet-friendly',
    hotelsNote: `Una breve selezione editoriale. La mappa qui sotto mostra tutto l'inventario Booking.com.`,
    starsLabel: '★',
    fromLabel: 'da',
    perNightLabel: '/notte',
    petFeeLabel: 'supplemento animale',
    petFeeFreeLabel: 'animali gratis',
    checkAvailability: 'Verifica disponibilità →',
    mapHeading: 'Tutti gli hotel pet-friendly della zona',
    mapNote: `Disponibilità e prezzi in tempo reale, cani e gatti accettati. Prenotabile via Booking.com e partner.`,
    seeHotels: `Vedi gli hotel pet-friendly a Parigi ${''}`,
    backToHub: 'Torna a tutti gli arrondissement',
    comingSoon: 'Guida dettagliata in arrivo a breve. Nel frattempo, sfoglia gli hotel pet-friendly di questa zona qui sotto.',
    stickyLabel: 'Hotel pet-friendly a Parigi',
    stickyCta: 'Vedi gli hotel',
  },
} as const

type Locale = keyof typeof COPY

function pickLocaleString(a: Arr, locale: Locale, key: 'intro') {
  const map: Record<Locale, keyof Arr> = {
    en: 'introEn' as keyof Arr,
    fr: 'introFr' as keyof Arr,
    es: 'introEs' as keyof Arr,
    pt: 'introPt' as keyof Arr,
    nl: 'introEn' as keyof Arr,
    it: 'introEn' as keyof Arr,
  }
  return (a[map[locale]] as string) || ''
}

function pickLocaleArray(a: Arr, locale: Locale): string[] {
  const map: Record<Locale, keyof Arr> = {
    en: 'highlightsEn' as keyof Arr,
    fr: 'highlightsFr' as keyof Arr,
    es: 'highlightsEs' as keyof Arr,
    pt: 'highlightsPt' as keyof Arr,
    nl: 'highlightsEn' as keyof Arr,
    it: 'highlightsEn' as keyof Arr,
  }
  return ((a[map[locale]] as string[]) || []).filter(Boolean)
}

function parkPolicy(park: Arr['parks'][number], locale: Locale): string {
  const map: Record<Locale, keyof typeof park> = {
    en: 'policyEn' as keyof typeof park,
    fr: 'policyFr' as keyof typeof park,
    es: 'policyEs' as keyof typeof park,
    pt: 'policyPt' as keyof typeof park,
    nl: 'policyEn' as keyof typeof park,
    it: 'policyEn' as keyof typeof park,
  }
  return (park[map[locale]] as string) || (park.policyEn as string) || ''
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; arr: string }>
}) {
  const { locale: rawLocale, arr: rawArr } = await params
  if (!hasLocale(rawLocale)) notFound()
  const a = findArr(rawArr)
  if (!a) notFound()
  const locale = rawLocale as Locale
  const t = COPY[locale] ?? COPY.en

  const intro = pickLocaleString(a, locale, 'intro')
  const highlights = pickLocaleArray(a, locale)

  const mapSrc = buildStay22MapSrc(a.lat, a.lng, `paris-${a.slug}-arrondissement`)

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Paris', item: `${SITE_URL}/${locale}/destinations/paris` },
      { '@type': 'ListItem', position: 3, name: 'Arrondissements', item: `${SITE_URL}/${locale}/destinations/paris/arrondissements` },
      { '@type': 'ListItem', position: 4, name: `${a.popularName} (${a.slug})`, item: `${SITE_URL}/${locale}/destinations/paris/arrondissements/${a.slug}` },
    ],
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-stone-900 via-slate-800 to-blue-900 text-white overflow-hidden">
        {/* Background hero image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src={`/images/paris-arrondissements/${a.slug}.jpg`}
            alt={`${a.popularName} - Paris ${a.slug}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900/80 via-slate-900/60 to-blue-900/70" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-14 sm:py-20">
          <nav className="text-sm text-white/60 mb-5">
            <Link href={`/${locale}`} className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/destinations/paris`} className="hover:text-white">Paris</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/destinations/paris/arrondissements`} className="hover:text-white">Arrondissements</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{a.slug}</span>
          </nav>
          <div className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-3">🐾 PARIS {a.slug.toUpperCase()}</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-3">{a.popularName}</h1>
          <p className="text-sm text-blue-100 mb-6">
            {t.metroLabel}: {a.metros.join(' · ')}
          </p>
          {intro && (
            <p className="text-lg text-slate-100 max-w-3xl leading-relaxed">{intro}</p>
          )}
          {!intro && (
            <p className="text-base text-blue-100 max-w-3xl leading-relaxed italic">{t.comingSoon}</p>
          )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* Highlights */}
        {highlights.length > 0 && (
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-5">{t.highlightsHeading}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <li key={i} className="bg-white rounded-xl border border-stone-200 p-4 flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5 flex-shrink-0">●</span>
                  <span className="text-stone-800 text-sm leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Parks */}
        {a.parks && a.parks.length > 0 && (
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-5">🌳 {t.parksHeading}</h2>
            <div className="space-y-3">
              {a.parks.map((p, i) => (
                <div key={i} className="bg-white rounded-xl border border-stone-200 p-5">
                  <h3 className="font-bold text-stone-900 mb-1">{p.name}</h3>
                  <p className="text-sm text-stone-700 leading-relaxed">{parkPolicy(p, locale)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Vets */}
        {a.vets && a.vets.length > 0 && (
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-5">🩺 {t.vetsHeading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {a.vets.map((v, i) => (
                <div key={i} className="bg-white rounded-xl border border-stone-200 p-5">
                  <h3 className="font-bold text-stone-900 mb-1">{v.name}</h3>
                  <p className="text-sm text-stone-600">{v.address}</p>
                  <p className="text-sm font-semibold text-blue-700 mt-1">{v.phone}</p>
                  {v.hoursNote && (
                    <p className="text-xs text-stone-500 mt-1 italic">{v.hoursNote}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hotel selection */}
        {a.hotels && a.hotels.length > 0 && (() => {
          const pitchKey: Record<Locale, keyof ArrHotel> = {
            en: 'pitchEn', fr: 'pitchFr', es: 'pitchEs', pt: 'pitchPt', nl: 'pitchEn', it: 'pitchEn',
          }
          return (
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">🏨 {t.hotelsHeading}</h2>
              <p className="text-sm text-stone-600 mb-5">{t.hotelsNote}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {a.hotels.map((h, i) => {
                  const pitch = (h[pitchKey[locale]] as string) || h.pitchEn || ''
                  const href = buildAllezLink(h.name, 'Paris', 'France', `paris-${a.slug}-hotel-${i + 1}`)
                  return (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener sponsored"
                      className="group/card block bg-white hover:bg-blue-50 border border-stone-200 hover:border-blue-300 rounded-xl overflow-hidden transition shadow-sm"
                    >
                      {h.image && (
                        <div className="relative aspect-[3/2] bg-stone-100 overflow-hidden">
                          <Image
                            src={h.image}
                            alt={h.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                          />
                          {h.stars && (
                            <span className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                              {h.stars}{t.starsLabel}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="p-4">
                        {!h.image && (
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-bold text-stone-900 leading-tight">{h.name}</h3>
                            {h.stars && (
                              <span className="text-xs text-amber-600 font-bold whitespace-nowrap">
                                {h.stars}{t.starsLabel}
                              </span>
                            )}
                          </div>
                        )}
                        {h.image && (
                          <h3 className="font-bold text-stone-900 leading-tight mb-1">{h.name}</h3>
                        )}
                        <p className="text-xs text-stone-600 leading-relaxed mb-3">{pitch}</p>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs">
                          {h.priceFrom !== undefined && (
                            <span className="font-bold text-stone-900">
                              {t.fromLabel} €{h.priceFrom}<span className="font-normal text-stone-500">{t.perNightLabel}</span>
                            </span>
                          )}
                          {h.petFee !== undefined && (
                            <span className={`text-xs ${h.petFee === 0 ? 'text-emerald-700 font-semibold' : 'text-stone-500'}`}>
                              {h.petFee === 0 ? `🐾 ${t.petFeeFreeLabel}` : `🐾 ${t.petFeeLabel} €${h.petFee}`}
                            </span>
                          )}
                        </div>
                        <div className="mt-3 text-xs font-bold text-blue-700">{t.checkAvailability}</div>
                      </div>
                    </a>
                  )
                })}
              </div>
            </section>
          )
        })()}

        {/* Stay22 Map */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">📍 {t.mapHeading}</h2>
          <p className="text-sm text-stone-600 mb-4">{t.mapNote}</p>
          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
            <iframe
              src={mapSrc}
              width="100%"
              height="520"
              style={{ border: 0 }}
              loading="lazy"
              title={`Pet-friendly hotels in Paris ${a.slug} (${a.popularName})`}
            />
          </div>
        </section>

        {/* Back to hub */}
        <div className="text-center pt-4">
          <Link
            href={`/${locale}/destinations/paris/arrondissements`}
            className="inline-block text-sm font-semibold text-stone-700 hover:text-blue-700 underline"
          >
            ← {t.backToHub}
          </Link>
        </div>
      </div>

      <StickyHotelCTA
        label={t.stickyLabel}
        cta={t.stickyCta}
        href={buildAllezDestLink('Paris', 'France', `paris-${a.slug}-sticky`)}
      />
    </main>
  )
}
