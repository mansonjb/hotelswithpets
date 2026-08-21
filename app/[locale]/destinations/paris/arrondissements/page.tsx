import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import arrondissements from '@/data/paris-arrondissements.json'

const SLUG_PATH = 'destinations/paris/arrondissements'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}

  const titles: Record<string, string> = {
    en: `Pet-Friendly Paris by Arrondissement: All 20 Districts Mapped (2026)`,
    fr: `Paris pet-friendly par arrondissement : les 20 quartiers cartographiés (2026)`,
    es: `París pet-friendly por distrito: los 20 arrondissements cartografiados (2026)`,
    pt: `Paris pet-friendly por arrondissement: os 20 distritos cartografados (2026)`,
    nl: `Hondvriendelijk Parijs per arrondissement: alle 20 wijken in kaart (2026)`,
  }
  const descriptions: Record<string, string> = {
    en: `A neighbourhood-by-neighbourhood guide to dog-friendly Paris. The vibe, the parks where dogs are welcome, the verified vets and the best pet-friendly hotels in each of the 20 arrondissements.`,
    fr: `Le guide quartier par quartier du Paris pet-friendly. L'ambiance, les parcs ouverts aux chiens, les vétérinaires vérifiés et les meilleurs hôtels pet-friendly dans chacun des 20 arrondissements.`,
    es: `La guía barrio por barrio del París dog-friendly. El ambiente, los parques abiertos a perros, los veterinarios verificados y los mejores hoteles pet-friendly en cada uno de los 20 distritos.`,
    pt: `O guia bairro a bairro da Paris pet-friendly. O ambiente, os parques abertos a cães, os veterinários verificados e os melhores hotéis pet-friendly em cada um dos 20 arrondissements.`,
    nl: `De wijk-voor-wijk gids voor hondvriendelijk Parijs. De sfeer, de parken waar honden welkom zijn, de geverifieerde dierenartsen en de beste hondvriendelijke hotels in elk van de 20 arrondissementen.`,
  }

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/${SLUG_PATH}`,
      languages: {
        en: `${SITE_URL}/en/${SLUG_PATH}`,
        fr: `${SITE_URL}/fr/${SLUG_PATH}`,
        es: `${SITE_URL}/es/${SLUG_PATH}`,
        pt: `${SITE_URL}/pt/${SLUG_PATH}`,
        de: `${SITE_URL}/de/${SLUG_PATH}`,
        nl: `${SITE_URL}/nl/${SLUG_PATH}`,
        'x-default': `${SITE_URL}/en/${SLUG_PATH}`,
      },
    },
  }
}

const COPY = {
  en: {
    eyebrow: 'PET-FRIENDLY PARIS BY ARRONDISSEMENT',
    h1: 'Dog-friendly Paris, neighbourhood by neighbourhood',
    intro: `Paris is small enough to walk end to end with a dog, but the 20 arrondissements feel like 20 different cities. We mapped each one: the parks that actually welcome leashed dogs (most public gardens still don't), the verified 24-h vets, the metro lines that accept pets, and the area you should base in depending on what you want from the trip.`,
    listTitle: 'The 20 arrondissements',
    listSubtitle: 'Click any district for parks, vets, dog policy and pet-friendly hotels.',
    metrosLabel: 'Metro',
    detailCta: 'Open guide →',
    parisCta: 'Back to Paris guide',
  },
  fr: {
    eyebrow: 'PARIS PET-FRIENDLY PAR ARRONDISSEMENT',
    h1: 'Paris dog-friendly, quartier par quartier',
    intro: `Paris se traverse à pied avec un chien, mais ses 20 arrondissements ressemblent à 20 villes différentes. On a cartographié chacun : les parcs qui acceptent vraiment les chiens en laisse (la plupart des jardins publics restent fermés), les vétos 24h vérifiés, les lignes de métro qui acceptent les animaux, et le quartier où poser ses valises selon le voyage qu'on veut faire.`,
    listTitle: 'Les 20 arrondissements',
    listSubtitle: 'Cliquez sur un quartier pour voir parcs, vétérinaires, politique chien et hôtels pet-friendly.',
    metrosLabel: 'Métro',
    detailCta: 'Voir le guide →',
    parisCta: 'Retour au guide Paris',
  },
  es: {
    eyebrow: 'PARÍS PET-FRIENDLY POR DISTRITO',
    h1: 'París dog-friendly, barrio por barrio',
    intro: `París se recorre a pie con perro, pero sus 20 arrondissements parecen 20 ciudades distintas. Hemos cartografiado cada uno: los parques que realmente admiten perros con correa (la mayoría de jardines siguen cerrados), los veterinarios 24h verificados, las líneas de metro que admiten animales, y el barrio donde alojarse según el viaje deseado.`,
    listTitle: 'Los 20 arrondissements',
    listSubtitle: 'Haz clic en un barrio para ver parques, veterinarios, política canina y hoteles pet-friendly.',
    metrosLabel: 'Metro',
    detailCta: 'Ver la guía →',
    parisCta: 'Volver a la guía París',
  },
  pt: {
    eyebrow: 'PARIS PET-FRIENDLY POR ARRONDISSEMENT',
    h1: 'Paris dog-friendly, bairro a bairro',
    intro: `Paris atravessa-se a pé com cão, mas os seus 20 arrondissements parecem 20 cidades diferentes. Cartografámos cada um: os parques que realmente aceitam cães à trela (a maioria dos jardins ainda está fechada), os veterinários 24h verificados, as linhas de metro que aceitam animais, e o bairro onde ficar dependendo da viagem que se quer fazer.`,
    listTitle: 'Os 20 arrondissements',
    listSubtitle: 'Clique num bairro para ver parques, veterinários, política canina e hotéis pet-friendly.',
    metrosLabel: 'Metro',
    detailCta: 'Ver o guia →',
    parisCta: 'Voltar ao guia Paris',
  },
  nl: {
    eyebrow: 'HONDVRIENDELIJK PARIJS PER ARRONDISSEMENT',
    h1: 'Hondvriendelijk Parijs, wijk voor wijk',
    intro: `Parijs is klein genoeg om van de ene kant naar de andere te lopen met je hond, maar de 20 arrondissementen voelen als 20 verschillende steden. We hebben ze allemaal in kaart gebracht: de parken die honden aan de lijn echt welkom heten (de meeste openbare tuinen blijven gesloten), de geverifieerde dierenartsen met 24-uursdienst, de metrolijnen die huisdieren toelaten, en de wijk waar je het beste kunt logeren, afhankelijk van wat je van je reis verwacht.`,
    listTitle: 'De 20 arrondissementen',
    listSubtitle: 'Klik op een wijk voor parken, dierenartsen, hondenbeleid en hondvriendelijke hotels.',
    metrosLabel: 'Metro',
    detailCta: 'Bekijk gids →',
    parisCta: 'Terug naar de gids van Parijs',
  },
} as const

type Locale = keyof typeof COPY

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!hasLocale(rawLocale)) notFound()
  const locale = rawLocale as Locale
  const t = COPY[locale] ?? COPY.en

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Paris', item: `${SITE_URL}/${locale}/destinations/paris` },
      { '@type': 'ListItem', position: 3, name: 'Arrondissements', item: `${SITE_URL}/${locale}/${SLUG_PATH}` },
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
            <Link href={`/${locale}/destinations`} className="hover:text-white">Destinations</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/destinations/paris`} className="hover:text-white">Paris</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Arrondissements</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-3">{t.eyebrow}</p>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">🐾 {t.h1}</h1>
          <p className="text-lg text-slate-100 max-w-3xl">{t.intro}</p>
        </div>
      </section>

      {/* Grid of 20 */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-2">{t.listTitle}</h2>
          <p className="text-stone-600">{t.listSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {arrondissements.map((a) => (
            <Link
              key={a.slug}
              href={`/${locale}/destinations/paris/arrondissements/${a.slug}`}
              className="group block bg-white rounded-2xl border border-stone-200 hover:border-blue-400 hover:shadow-lg transition-all overflow-hidden"
            >
              <div className="relative aspect-[5/3] bg-stone-100 overflow-hidden">
                <Image
                  src={`/images/paris-arrondissements/${a.slug}.jpg`}
                  alt={`${a.popularName} - Paris ${a.slug}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-black text-blue-700 shadow-sm">
                  {a.slug}
                </div>
              </div>
              <div className="p-4">
                <div className="font-bold text-stone-900 leading-tight mb-2">{a.popularName}</div>
                <div className="text-xs uppercase font-bold tracking-wider text-stone-500 mb-1">{t.metrosLabel}</div>
                <div className="text-sm text-stone-700 mb-3">{a.metros.join(' · ')}</div>
                <div className="text-sm text-blue-700 font-semibold group-hover:text-blue-900">{t.detailCta}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/destinations/paris`}
            className="inline-block text-sm font-semibold text-stone-700 hover:text-blue-700 underline"
          >
            ← {t.parisCta}
          </Link>
        </div>
      </section>
    </main>
  )
}
