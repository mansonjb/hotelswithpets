import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale, locales } from './dictionaries'
import type { Locale } from './dictionaries'
import Hero from '@/components/home/Hero'
import CategoryGrid from '@/components/home/CategoryGrid'
import HowItWorks from '@/components/home/HowItWorks'
import DestinationsGrid from '@/components/home/DestinationsGrid'
import FeaturedCombos from '@/components/home/FeaturedCombos'
import PopularSearches from '@/components/home/PopularSearches'
import PetTravelTips from '@/components/home/PetTravelTips'
import TopHotels from '@/components/home/TopHotels'
import { SITE_URL } from '@/lib/site'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}

  const titles: Record<string, string> = {
    en: 'Pet-friendly hotels in Europe: 800+ verified, with real pet policies | HotelsWithPets',
    fr: 'Hôtels acceptant les animaux en Europe : 800+ vérifiés, vraies politiques animaux | HotelsWithPets',
    es: 'Hoteles que admiten mascotas en Europa: 800+ verificados, con políticas reales | HotelsWithPets',
    pt: 'Hotéis que aceitam animais na Europa: 800+ verificados, políticas reais | HotelsWithPets',
  }
  const descriptions: Record<string, string> = {
    en: 'Trip planning for owners travelling with dogs or cats: 800+ pet-friendly hotels across 137 European cities, with verified policies (not just "pets allowed"), city guides, emergency vets, transport rules. Free to use.',
    fr: 'Planifier un voyage avec son chien ou son chat : 800+ hôtels pet-friendly dans 137 villes européennes, politiques animaux vérifiées (pas juste « animaux acceptés »), guides ville, vétos d\'urgence, règles transport. Gratuit.',
    es: 'Planificar un viaje con tu perro o gato: 800+ hoteles pet-friendly en 137 ciudades europeas, políticas verificadas (no solo "mascotas admitidas"), guías de ciudad, vetes de urgencia, normas de transporte. Gratis.',
    pt: 'Planeamento de viagem com o seu cão ou gato: 800+ hotéis pet-friendly em 137 cidades europeias, políticas verificadas (não só "animais aceites"), guias de cidade, vetes de urgência, regras de transporte. Grátis.',
  }

  const title = titles[locale] ?? titles.en
  const description = descriptions[locale] ?? descriptions.en

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/${locale}`,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        fr: `${SITE_URL}/fr`,
        es: `${SITE_URL}/es`,
        pt: `${SITE_URL}/pt`,
        'x-default': `${SITE_URL}/en`,
      },
    },
  }
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const dict = await getDictionary(locale as Locale)

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'HotelsWithPets',
    alternateName: 'HotelsWithPets.com',
    url: SITE_URL,
    description: '800+ pet-friendly hotels across 137 European cities. Handpicked, verified pet policies, real guest ratings, and city guides for travelling with your dog or cat.',
    inLanguage: ['en', 'fr', 'es', 'pt'],
    publisher: {
      '@type': 'Organization',
      name: 'HotelsWithPets',
      url: SITE_URL,
    },
  }

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HotelsWithPets',
    alternateName: 'HotelsWithPets.com',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.ico`,
    },
    description: 'A trip-planning platform for travellers with pets: 800+ verified pet-friendly hotels across 137 European destinations, city guides, emergency-vet directories, and transport rules.',
    foundingDate: '2026',
    areaServed: 'Europe',
    knowsLanguage: ['en', 'fr', 'es', 'pt'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <Hero locale={locale as Locale} dict={dict} />
      <CategoryGrid locale={locale as Locale} dict={dict} />
      <HowItWorks dict={dict} locale={locale} />
      <TopHotels locale={locale as Locale} />
      <DestinationsGrid locale={locale as Locale} dict={dict} />
      <FeaturedCombos locale={locale as Locale} dict={dict} />
      <PetTravelTips locale={locale as Locale} />
      <PopularSearches locale={locale as Locale} />
    </>
  )
}
