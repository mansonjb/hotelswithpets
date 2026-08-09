import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { SITE_URL } from '@/lib/site'
import { imageUrl } from '@/lib/imageUrl'
import { hasImage } from '@/lib/imageManifest'

type L4 = { en: string; fr: string; es: string; pt: string; de: string }
interface HeatwaveGuide {
  slug: string
  lastUpdated: string
  title: L4
  metaTitle: L4
  metaDesc: L4
  intro: L4
  signs: { title: L4; intro: L4; dogItems: L4[]; catItems: L4[] }
  firstAid: { title: L4; intro: L4; steps: L4[] }
  prevention: { title: L4; tips: { emoji: string; title: L4; text: L4 }[] }
  atRisk: { title: L4; text: L4 }
  cool: { title: L4; intro: L4; items: { slug: string; name: string; region: L4; note: L4 }[] }
  faqs: { q: L4; a: L4 }[]
}

function load(): HeatwaveGuide | null {
  const fp = join(process.cwd(), 'data/guides/heatwave-pet-safety.json')
  if (!existsSync(fp)) return null
  try { return JSON.parse(readFileSync(fp, 'utf-8')) as HeatwaveGuide } catch { return null }
}

const pick = (o: L4, locale: string): string =>
  locale === 'fr' ? o.fr : locale === 'es' ? o.es : locale === 'pt' ? o.pt : locale === 'de' ? o.de : o.en

const SLUG = 'heatwave-pet-safety'

const UI: Record<string, { home: string; guides: string; dogs: string; cats: string; see: string; emergency: string; coolGuide: string }> = {
  en: { home: 'Home', guides: 'Guides', dogs: '🐕 Dogs', cats: '🐈 Cats', see: 'See destination →', emergency: 'Heatstroke is a medical emergency', coolGuide: 'More: a cool-summer escape guide for dogs →' },
  fr: { home: 'Accueil', guides: 'Guides', dogs: '🐕 Chiens', cats: '🐈 Chats', see: 'Voir la destination →', emergency: `Le coup de chaleur est une urgence vétérinaire`, coolGuide: `Plus : guide des escapades d'été au frais avec un chien →` },
  es: { home: 'Inicio', guides: 'Guías', dogs: '🐕 Perros', cats: '🐈 Gatos', see: 'Ver destino →', emergency: 'El golpe de calor es una urgencia veterinaria', coolGuide: 'Más: guía de escapadas de verano al fresco con perro →' },
  pt: { home: 'Início', guides: 'Guias', dogs: '🐕 Cães', cats: '🐈 Gatos', see: 'Ver destino →', emergency: 'A insolação é uma emergência veterinária', coolGuide: 'Mais: guia de escapadas de verão ao fresco com cão →' },
  de: { home: 'Startseite', guides: 'Ratgeber', dogs: '🐕 Hunde', cats: '🐈 Katzen', see: 'Ziel ansehen →', emergency: 'Ein Hitzschlag ist ein tierärztlicher Notfall', coolGuide: `Mehr: Ratgeber für kühle Sommerausflüge mit Hund →` },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const g = load()
  if (!g) return {}
  const title = pick(g.metaTitle, locale)
  const desc = pick(g.metaDesc, locale)
  return {
    title: `${title}`,
    description: desc,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/${SLUG}`,
      languages: {
        ...Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}/guides/${SLUG}`])),
        'x-default': `${SITE_URL}/en/guides/${SLUG}`,
      },
    },
    openGraph: {
      title, description: desc, type: 'article',
      images: hasImage(`/images/guides/${SLUG}.jpg`) ? [imageUrl(`/images/guides/${SLUG}.jpg`)] : undefined,
    },
  }
}

export default async function HeatwavePetSafetyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const g = load()
  if (!g) notFound()
  const ui = UI[locale] ?? UI.en
  const heroRel = `/images/guides/${SLUG}.jpg`
  const hasHero = hasImage(heroRel)

  const faqLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: g.faqs.map(f => ({ '@type': 'Question', name: pick(f.q, locale), acceptedAnswer: { '@type': 'Answer', text: pick(f.a, locale) } })),
  }
  const articleLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: pick(g.title, locale), description: pick(g.metaDesc, locale),
    dateModified: g.lastUpdated, inLanguage: locale,
    image: hasHero ? imageUrl(heroRel) : undefined,
    publisher: { '@type': 'Organization', name: 'HotelsWithPets.com' },
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ui.home, item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: ui.guides, item: `${SITE_URL}/${locale}/guides` },
      { '@type': 'ListItem', position: 3, name: pick(g.title, locale), item: `${SITE_URL}/${locale}/guides/${SLUG}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] bg-gray-900">
        {hasHero && <Image src={imageUrl(heroRel)} alt={pick(g.title, locale)} fill priority sizes="100vw" className="object-cover opacity-70" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8">
            <nav className="text-white/70 text-xs mb-3">
              <Link href={`/${locale}`} className="hover:text-white">{ui.home}</Link>
              <span className="mx-1.5">/</span>
              <Link href={`/${locale}/guides`} className="hover:text-white">{ui.guides}</Link>
            </nav>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow">{pick(g.title, locale)}</h1>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <p className="text-gray-700 text-lg leading-relaxed">{pick(g.intro, locale)}</p>

        {/* Warning signs */}
        <section>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">⚠️ {pick(g.signs.title, locale)}</h2>
          <p className="text-gray-600 mb-5">{pick(g.signs.intro, locale)}</p>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-extrabold text-gray-900 mb-3">{ui.dogs}</h3>
              <ul className="space-y-2">{g.signs.dogItems.map((it, i) => (<li key={i} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-red-500 mt-0.5">•</span>{pick(it, locale)}</li>))}</ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-extrabold text-gray-900 mb-3">{ui.cats}</h3>
              <ul className="space-y-2">{g.signs.catItems.map((it, i) => (<li key={i} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-red-500 mt-0.5">•</span>{pick(it, locale)}</li>))}</ul>
            </div>
          </div>
        </section>

        {/* First aid */}
        <section className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-red-700 mb-1">🚨 {ui.emergency}</p>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">{pick(g.firstAid.title, locale)}</h2>
          <p className="text-gray-700 mb-4">{pick(g.firstAid.intro, locale)}</p>
          <ol className="space-y-3">
            {g.firstAid.steps.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-600 text-white text-sm font-black flex items-center justify-center">{i + 1}</span>
                <span className="text-gray-800 leading-relaxed pt-0.5">{pick(s, locale)}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Prevention */}
        <section>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-5">{pick(g.prevention.title, locale)}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {g.prevention.tips.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <h3 className="font-bold text-gray-900">{t.emoji} {pick(t.title, locale)}</h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{pick(t.text, locale)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* At risk */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">🐾 {pick(g.atRisk.title, locale)}</h2>
          <p className="text-gray-700 leading-relaxed">{pick(g.atRisk.text, locale)}</p>
        </section>

        {/* Cool destinations */}
        <section>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">❄️ {pick(g.cool.title, locale)}</h2>
          <p className="text-gray-600 mb-5">{pick(g.cool.intro, locale)}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {g.cool.items.map((c, i) => (
              <Link key={i} href={`/${locale}/destinations/${c.slug}`} className="group bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col">
                <h3 className="font-extrabold text-gray-900">{c.name}</h3>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">{pick(c.region, locale)}</p>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed flex-1">{pick(c.note, locale)}</p>
                <span className="text-sm font-bold text-blue-600 group-hover:text-blue-800 mt-3">{ui.see}</span>
              </Link>
            ))}
          </div>
          <Link href={`/${locale}/guides/cool-summer-with-dog`} className="inline-block mt-5 text-sm font-semibold text-blue-600 hover:text-blue-800">{ui.coolGuide}</Link>
        </section>

        {/* FAQ */}
        <section>
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
