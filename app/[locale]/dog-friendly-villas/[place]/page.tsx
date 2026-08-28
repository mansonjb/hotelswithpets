import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { readFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { imageUrl } from '@/lib/imageUrl'
import { hasImage } from '@/lib/imageManifest'
import Stay22Map from '@/components/Stay22Map'

// ─── Types ──────────────────────────────────────────────────────────────────
type L4 = { en: string; fr: string; es: string; pt: string }
interface Villa {
  name: string
  area: string
  sleeps: number
  bedrooms: number
  pool: boolean
  petPolicy: L4
  priceFrom: number
  currency: string
  bookingUrl: string
  highlights: string[]
}
interface VillaGuide {
  slug: string
  place: string
  country: string
  countryCode: string
  flag: string
  lat: number
  lng: number
  lastUpdated: string
  intro: L4
  whyVillas: L4
  areas: { name: string; note: L4 }[]
  villas: Villa[]
  dogBeaches: L4
  faqs: { q: L4; a: L4 }[]
}

const VILLA_DIR = join(process.cwd(), 'data/villa-guides')

function loadVillaGuide(place: string): VillaGuide | null {
  const fp = join(VILLA_DIR, `${place}.json`)
  if (!existsSync(fp)) return null
  try {
    return JSON.parse(readFileSync(fp, 'utf-8')) as VillaGuide
  } catch {
    return null
  }
}

const pick = (o: L4, locale: string): string =>
  locale === 'fr' ? o.fr : locale === 'es' ? o.es : locale === 'pt' ? o.pt : o.en

// ─── UI strings ───────────────────────────────────────────────────────────────
const UI: Record<string, {
  h1: (p: string) => string
  sub: (p: string) => string
  whyTitle: string
  areasTitle: (p: string) => string
  villasTitle: (p: string) => string
  beachesTitle: string
  faqTitle: string
  sleeps: (n: number) => string
  bedrooms: (n: number) => string
  pool: string
  from: string
  perNight: string
  seeVilla: string
  mapTitle: (p: string) => string
  mapCta: (p: string) => string
  breadcrumbHome: string
  verified: string
}> = {
  en: {
    h1: p => `Dog-friendly villas with pool in ${p}`,
    sub: p => `Private villas and fincas in ${p} that genuinely welcome dogs: fenced gardens, private pools and room to roam, near the island's dog beaches.`,
    whyTitle: 'Why a villa beats a hotel with a dog',
    areasTitle: p => `Best areas to base yourself in ${p}`,
    villasTitle: p => `Verified pet-friendly villas in ${p}`,
    beachesTitle: 'Dog beaches nearby',
    faqTitle: 'Frequently asked questions',
    sleeps: n => `Sleeps ${n}`,
    bedrooms: n => `${n} bedrooms`,
    pool: 'Private pool',
    from: 'From',
    perNight: '/night',
    seeVilla: 'See villa & dates →',
    mapTitle: p => `Browse all pet-friendly stays in ${p}`,
    mapCta: p => `See pet-friendly villas in ${p} →`,
    breadcrumbHome: 'Home',
    verified: 'Dog policy web-verified',
  },
  fr: {
    h1: p => `Villas avec piscine qui acceptent les chiens à ${p}`,
    sub: p => `Villas et fincas privées à ${p} qui accueillent vraiment les chiens : jardins clôturés, piscines privées et de l'espace, près des plages canines de l'île.`,
    whyTitle: `Pourquoi une villa vaut mieux qu'un hôtel avec un chien`,
    areasTitle: p => `Les meilleurs coins où loger à ${p}`,
    villasTitle: p => `Villas pet-friendly vérifiées à ${p}`,
    beachesTitle: 'Plages canines à proximité',
    faqTitle: 'Questions fréquentes',
    sleeps: n => `Jusqu'à ${n} personnes`,
    bedrooms: n => `${n} chambres`,
    pool: 'Piscine privée',
    from: 'Dès',
    perNight: '/nuit',
    seeVilla: 'Voir la villa & dates →',
    mapTitle: p => `Parcourir tous les hébergements pet-friendly à ${p}`,
    mapCta: p => `Voir les villas pet-friendly à ${p} →`,
    breadcrumbHome: 'Accueil',
    verified: 'Politique animaux vérifiée sur le web',
  },
  es: {
    h1: p => `Villas con piscina que admiten perros en ${p}`,
    sub: p => `Villas y fincas privadas en ${p} que de verdad admiten perros: jardines vallados, piscinas privadas y espacio, cerca de las playas caninas de la isla.`,
    whyTitle: 'Por qué una villa es mejor que un hotel con perro',
    areasTitle: p => `Las mejores zonas para alojarse en ${p}`,
    villasTitle: p => `Villas pet-friendly verificadas en ${p}`,
    beachesTitle: 'Playas caninas cerca',
    faqTitle: 'Preguntas frecuentes',
    sleeps: n => `Hasta ${n} personas`,
    bedrooms: n => `${n} dormitorios`,
    pool: 'Piscina privada',
    from: 'Desde',
    perNight: '/noche',
    seeVilla: 'Ver villa y fechas →',
    mapTitle: p => `Explora todos los alojamientos pet-friendly en ${p}`,
    mapCta: p => `Ver villas pet-friendly en ${p} →`,
    breadcrumbHome: 'Inicio',
    verified: 'Política de mascotas verificada en la web',
  },
  pt: {
    h1: p => `Villas com piscina que aceitam cães em ${p}`,
    sub: p => `Villas e fincas privadas em ${p} que aceitam mesmo cães: jardins vedados, piscinas privadas e espaço, perto das praias para cães da ilha.`,
    whyTitle: 'Porque uma villa é melhor do que um hotel com um cão',
    areasTitle: p => `As melhores zonas para ficar em ${p}`,
    villasTitle: p => `Villas pet-friendly verificadas em ${p}`,
    beachesTitle: 'Praias para cães por perto',
    faqTitle: 'Perguntas frequentes',
    sleeps: n => `Até ${n} pessoas`,
    bedrooms: n => `${n} quartos`,
    pool: 'Piscina privada',
    from: 'Desde',
    perNight: '/noite',
    seeVilla: 'Ver villa e datas →',
    mapTitle: p => `Explore todas as estadias pet-friendly em ${p}`,
    mapCta: p => `Ver villas pet-friendly em ${p} →`,
    breadcrumbHome: 'Início',
    verified: 'Política de animais verificada na web',
  },
  de: {
    h1: p => `Hundefreundliche Villen mit Pool in ${p}`,
    sub: p => `Private Villen und Fincas in ${p}, die Hunde wirklich willkommen heißen: eingezäunte Gärten, private Pools und viel Platz zum Toben, nahe den Hundestränden der Insel.`,
    whyTitle: 'Warum eine Villa mit Hund besser ist als ein Hotel',
    areasTitle: p => `Die besten Gegenden für deinen Aufenthalt in ${p}`,
    villasTitle: p => `Geprüfte hundefreundliche Villen in ${p}`,
    beachesTitle: 'Hundestrände in der Nähe',
    faqTitle: 'Häufig gestellte Fragen',
    sleeps: n => `Für bis zu ${n} Personen`,
    bedrooms: n => `${n} Schlafzimmer`,
    pool: 'Privater Pool',
    from: 'Ab',
    perNight: '/Nacht',
    seeVilla: 'Villa & Termine ansehen →',
    mapTitle: p => `Alle haustierfreundlichen Unterkünfte in ${p} durchsuchen`,
    mapCta: p => `Haustierfreundliche Villen in ${p} ansehen →`,
    breadcrumbHome: 'Startseite',
    verified: 'Hunderichtlinie im Web geprüft',
  },
  nl: {
    h1: p => `Hondvriendelijke villa's met zwembad in ${p}`,
    sub: p => `Privévilla's en fincas in ${p} die honden echt welkom heten: omheinde tuinen, privézwembaden en ruimte om te rennen, dicht bij de hondenstranden van het eiland.`,
    whyTitle: 'Waarom een villa beter is dan een hotel met een hond',
    areasTitle: p => `De beste gebieden om te verblijven in ${p}`,
    villasTitle: p => `Geverifieerde hondvriendelijke villa's in ${p}`,
    beachesTitle: 'Hondenstranden in de buurt',
    faqTitle: 'Veelgestelde vragen',
    sleeps: n => `Tot ${n} personen`,
    bedrooms: n => `${n} slaapkamers`,
    pool: 'Privézwembad',
    from: 'Vanaf',
    perNight: '/nacht',
    seeVilla: 'Villa & data bekijken →',
    mapTitle: p => `Bekijk alle hondvriendelijke verblijven in ${p}`,
    mapCta: p => `Hondvriendelijke villa's in ${p} bekijken →`,
    breadcrumbHome: 'Home',
    verified: 'Hondenbeleid op het web geverifieerd',
  },
  it: {
    h1: p => `Ville con piscina che accettano cani a ${p}`,
    sub: p => `Ville e fincas private a ${p} che accolgono davvero i cani: giardini recintati, piscine private e spazio per correre, vicino alle spiagge per cani dell'isola.`,
    whyTitle: 'Perché una villa è meglio di un hotel con il cane',
    areasTitle: p => `Le zone migliori dove alloggiare a ${p}`,
    villasTitle: p => `Ville pet-friendly verificate a ${p}`,
    beachesTitle: 'Spiagge per cani nelle vicinanze',
    faqTitle: 'Domande frequenti',
    sleeps: n => `Fino a ${n} persone`,
    bedrooms: n => `${n} camere da letto`,
    pool: 'Piscina privata',
    from: 'Da',
    perNight: '/notte',
    seeVilla: 'Vedi villa e date →',
    mapTitle: p => `Esplora tutti gli alloggi pet-friendly a ${p}`,
    mapCta: p => `Vedi le ville pet-friendly a ${p} →`,
    breadcrumbHome: 'Home',
    verified: 'Politica sui cani verificata sul web',
  },
}

// ─── Static params + metadata ───────────────────────────────────────────────
export async function generateStaticParams() {
  return [] // on-demand, like destinations; sitemap lists the places
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; place: string }>
}): Promise<Metadata> {
  const { locale, place } = await params
  if (!hasLocale(locale)) return {}
  const g = loadVillaGuide(place)
  if (!g) return {}
  const ui = UI[locale] ?? UI.en
  const title = ui.h1(g.place)
  const desc = pick(g.intro, locale).slice(0, 160)
  return {
    title: `${title}`,
    description: desc,
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog-friendly-villas/${place}`,
      languages: {
        ...Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/dog-friendly-villas/${place}`])),
        'x-default': `${SITE_URL}/en/dog-friendly-villas/${place}`,
      },
    },
    openGraph: {
      title,
      description: desc,
      type: 'article',
      images: hasImage(`/images/villas/${place}.jpg`) ? [imageUrl(`/images/villas/${place}.jpg`)] : undefined,
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function VillaLandingPage({
  params,
}: {
  params: Promise<{ locale: string; place: string }>
}) {
  const { locale, place } = await params
  if (!hasLocale(locale)) notFound()
  const g = loadVillaGuide(place)
  if (!g) notFound()

  const ui = UI[locale] ?? UI.en
  const heroRel = `/images/villas/${place}.jpg`
  const hasHero = hasImage(heroRel)
  const campaign = `villas-${place}`
  const allezHref = buildAllezDestLink(g.place, g.country, campaign)

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: g.faqs.map(f => ({
      '@type': 'Question',
      name: pick(f.q, locale),
      acceptedAnswer: { '@type': 'Answer', text: pick(f.a, locale) },
    })),
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ui.breadcrumbHome, item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: ui.h1(g.place), item: `${SITE_URL}/${locale}/dog-friendly-villas/${place}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[42vh] min-h-[320px] bg-gray-900">
          {hasHero && (
            <Image src={imageUrl(heroRel)} alt={ui.h1(g.place)} fill priority sizes="100vw" className="object-cover opacity-70" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8">
              <nav className="text-white/70 text-xs mb-3">
                <Link href={`/${locale}`} className="hover:text-white">{ui.breadcrumbHome}</Link>
                <span className="mx-1.5">/</span>
                <span>{g.flag} {g.place}</span>
              </nav>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow">{ui.h1(g.place)}</h1>
              <p className="text-white/90 text-base sm:text-lg mt-3 max-w-3xl">{ui.sub(g.place)}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Intro + primary CTA */}
        <section>
          <p className="text-gray-700 text-lg leading-relaxed">{pick(g.intro, locale)}</p>
          <a
            href={allezHref}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-base font-bold px-5 py-3 rounded-xl text-white shadow-sm hover:shadow-md transition-shadow"
            style={{ background: 'linear-gradient(135deg, #f97316 0%, #3b82f6 100%)' }}
          >
            {ui.mapCta(g.place)}
          </a>
        </section>

        {/* Villas */}
        <section>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-5">{ui.villasTitle(g.place)}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {g.villas.map((v, i) => (
              <a
                key={i}
                href={v.bookingUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="group bg-white rounded-2xl border border-amber-200 shadow-sm hover:shadow-lg transition-shadow flex flex-col p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold text-gray-900 leading-tight">{v.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mt-0.5">📍 {v.area}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3 text-xs">
                  <span className="bg-gray-50 px-2.5 py-1 rounded-full">🛏 {ui.bedrooms(v.bedrooms)}</span>
                  <span className="bg-gray-50 px-2.5 py-1 rounded-full">👥 {ui.sleeps(v.sleeps)}</span>
                  {v.pool && <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">🏊 {ui.pool}</span>}
                </div>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{pick(v.petPolicy, locale)}</p>
                <ul className="mt-3 space-y-1">
                  {v.highlights.map((h, k) => (
                    <li key={k} className="text-xs text-gray-500 flex items-start gap-1.5"><span className="text-amber-500">✓</span>{h}</li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-gray-500">{ui.from}</span>
                    <span className="text-xl font-extrabold text-gray-900">€{v.priceFrom}</span>
                    <span className="text-xs text-gray-500">{ui.perNight}</span>
                  </div>
                  <span className="text-sm font-bold text-amber-700 group-hover:text-amber-900">{ui.seeVilla}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Why a villa */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">🏡 {ui.whyTitle}</h2>
          <p className="text-gray-700 leading-relaxed">{pick(g.whyVillas, locale)}</p>
        </section>

        {/* Areas */}
        <section>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-5">{ui.areasTitle(g.place)}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {g.areas.map((a, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <h3 className="font-bold text-gray-900">📍 {a.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{pick(a.note, locale)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dog beaches */}
        <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">🏖️ {ui.beachesTitle}</h2>
          <p className="text-gray-700 leading-relaxed">{pick(g.dogBeaches, locale)}</p>
        </section>

        {/* Stay22 map */}
        <section>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{ui.mapTitle(g.place)}</h2>
          <Stay22Map lat={g.lat} lng={g.lng} destName={g.place} locale={locale} campaign={campaign} height={460} />
          <a
            href={allezHref}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-base font-bold px-5 py-3 rounded-xl text-white shadow-sm hover:shadow-md transition-shadow"
            style={{ background: 'linear-gradient(135deg, #f97316 0%, #3b82f6 100%)' }}
          >
            {ui.mapCta(g.place)}
          </a>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-5">{ui.faqTitle}</h2>
          <div className="space-y-3">
            {g.faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm group">
                <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                  {pick(f.q, locale)}
                  <span aria-hidden="true" className="text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                </summary>
                <p className="px-6 pb-5 text-gray-600 leading-relaxed">{pick(f.a, locale)}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

// Exposed so the sitemap can enumerate the villa landing pages.
export function villaPlaceSlugs(): string[] {
  if (!existsSync(VILLA_DIR)) return []
  return readdirSync(VILLA_DIR).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, ''))
}
