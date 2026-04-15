import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from './dictionaries'
import type { Locale } from './dictionaries'
import Hero from '@/components/home/Hero'
import CategoryGrid from '@/components/home/CategoryGrid'
import HowItWorks from '@/components/home/HowItWorks'
import DestinationsGrid from '@/components/home/DestinationsGrid'
import FeaturedCombos from '@/components/home/FeaturedCombos'

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const dict = await getDictionary(locale as Locale)

  return (
    <>
      <Hero locale={locale as Locale} dict={dict} />
      <CategoryGrid locale={locale as Locale} dict={dict} />
      <HowItWorks dict={dict} />
      <DestinationsGrid locale={locale as Locale} dict={dict} />
      <FeaturedCombos locale={locale as Locale} dict={dict} />
    </>
  )
}
