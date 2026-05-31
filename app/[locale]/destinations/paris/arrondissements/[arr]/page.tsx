import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildStay22MapSrc, buildAllezDestLink } from '@/lib/site'
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
    en: `Paris ${a.slug} (${a.popularName}) with a dog: parks, vets & hotels | HotelsWithPets.com`,
    fr: `Paris ${a.slug} (${a.popularName}) avec son chien : parcs, vétérinaires et hôtels | HotelsWithPets.com`,
    es: `París ${a.slug} (${a.popularName}) con perro: parques, veterinarios y hoteles | HotelsWithPets.com`,
    pt: `Paris ${a.slug} (${a.popularName}) com cão: parques, veterinários e hotéis | HotelsWithPets.com`,
  }
  const descriptions: Record<string, string> = {
    en: `What to know about ${a.popularName} (${a.slug}) with a dog: the parks that actually accept leashed dogs, the verified vets, the metro lines and the pet-friendly hotel inventory in the area.`,
    fr: `Tout sur ${a.popularName} (${a.slug}) avec un chien : les parcs qui acceptent vraiment les chiens en laisse, les vétérinaires vérifiés, les lignes de métro et les hôtels pet-friendly du quartier.`,
    es: `Todo sobre ${a.popularName} (${a.slug}) con perro: los parques que realmente aceptan perros con correa, los veterinarios verificados, las líneas de metro y los hoteles pet-friendly del barrio.`,
    pt: `Tudo sobre ${a.popularName} (${a.slug}) com cão: os parques que realmente aceitam cães à trela, os veterinários verificados, as linhas de metro e os hotéis pet-friendly do bairro.`,
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
    mapHeading: 'Pet-friendly hotels in the area',
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
    mapHeading: 'Hôtels pet-friendly dans le quartier',
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
    mapHeading: 'Hoteles pet-friendly en el barrio',
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
    mapHeading: 'Hotéis pet-friendly no bairro',
    mapNote: `Disponibilidade e preços ao vivo, cães e gatos aceites. Reservável via Booking.com e parceiros.`,
    seeHotels: 'Ver hotéis pet-friendly em Paris',
    backToHub: 'Voltar aos 20 arrondissements',
    comingSoon: 'Guia detalhado em preparação. Entretanto, explore os hotéis pet-friendly do bairro abaixo.',
    stickyLabel: 'Hotéis pet-friendly em Paris',
    stickyCta: 'Ver hotéis',
  },
} as const

type Locale = keyof typeof COPY

function pickLocaleString(a: Arr, locale: Locale, key: 'intro') {
  const map: Record<Locale, keyof Arr> = {
    en: 'introEn' as keyof Arr,
    fr: 'introFr' as keyof Arr,
    es: 'introEs' as keyof Arr,
    pt: 'introPt' as keyof Arr,
  }
  return (a[map[locale]] as string) || ''
}

function pickLocaleArray(a: Arr, locale: Locale): string[] {
  const map: Record<Locale, keyof Arr> = {
    en: 'highlightsEn' as keyof Arr,
    fr: 'highlightsFr' as keyof Arr,
    es: 'highlightsEs' as keyof Arr,
    pt: 'highlightsPt' as keyof Arr,
  }
  return ((a[map[locale]] as string[]) || []).filter(Boolean)
}

function parkPolicy(park: Arr['parks'][number], locale: Locale): string {
  const map: Record<Locale, keyof typeof park> = {
    en: 'policyEn' as keyof typeof park,
    fr: 'policyFr' as keyof typeof park,
    es: 'policyEs' as keyof typeof park,
    pt: 'policyPt' as keyof typeof park,
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
  const t = COPY[locale]

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
      <section className="relative bg-gradient-to-br from-stone-900 via-slate-800 to-blue-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-14 sm:py-20">
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
