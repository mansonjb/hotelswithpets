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
    en: 'Pet-Friendly Hotels in Europe: Find & Book | HotelsWithPets.com',
    fr: 'Hôtels Acceptant les Animaux en Europe | HotelsWithPets.com',
    es: 'Hoteles que Admiten Mascotas en Europa | HotelsWithPets.com',
  }
  const descriptions: Record<string, string> = {
    en: 'Browse 460+ pet-friendly hotels across 66 European destinations. Filter by pet type, compare policies, and book on Booking.com.',
    fr: 'Plus de 460 hôtels acceptant les animaux dans 66 destinations européennes. Filtrez par type d\'animal, comparez les politiques et réservez.',
    es: 'Más de 460 hoteles que admiten mascotas en 66 destinos europeos. Filtra por tipo de mascota, compara políticas y reserva.',
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
    description: 'Pet-friendly hotels across Europe. Handpicked, verified pet policies, real guest ratings, and city guides for travelling with your dog or cat.',
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
    description: 'A trip-planning platform for travellers with pets — 460+ verified pet-friendly hotels across 66 European destinations, with city guides, vet directories, and transport rules.',
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
