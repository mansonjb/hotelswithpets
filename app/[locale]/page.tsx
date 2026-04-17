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
import { SITE_URL } from '@/lib/site'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const dict = await getDictionary(locale as Locale)

  const titles: Record<string, string> = {
    en: 'Pet-Friendly Hotels in Europe — Find & Book | HotelsWithPets.com',
    fr: 'Hôtels Acceptant les Animaux en Europe | HotelsWithPets.com',
    es: 'Hoteles que Admiten Mascotas en Europa | HotelsWithPets.com',
  }
  const descriptions: Record<string, string> = {
    en: 'Browse 270+ pet-friendly hotels across 34 European destinations. Filter by pet type, compare policies, and book on Booking.com.',
    fr: 'Plus de 270 hôtels acceptant les animaux dans 34 destinations européennes. Filtrez par type d\'animal, comparez les politiques et réservez.',
    es: 'Más de 270 hoteles que admiten mascotas en 34 destinos europeos. Filtra por tipo de mascota, compara políticas y reserva.',
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
    url: SITE_URL,
    description: 'Pet-friendly hotels across Europe — verified policies, real guest ratings.',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/en/destinations/{search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HotelsWithPets',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    sameAs: [],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <Hero locale={locale as Locale} dict={dict} />
      <CategoryGrid locale={locale as Locale} dict={dict} />
      <HowItWorks dict={dict} />
      <DestinationsGrid locale={locale as Locale} dict={dict} />
      <FeaturedCombos locale={locale as Locale} dict={dict} />
      <PetTravelTips locale={locale as Locale} />
      <PopularSearches locale={locale as Locale} />
    </>
  )
}
