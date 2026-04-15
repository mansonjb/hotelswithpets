import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { getDictionary, hasLocale, locales } from './dictionaries'
import type { Locale } from './dictionaries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { notFound } from 'next/navigation'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<Locale, string> = {
    en: 'HotelsWithPets — Pet-Friendly Hotels in Europe',
    fr: 'HotelsWithPets — Hôtels Pet-Friendly en Europe',
    es: 'HotelsWithPets — Hoteles Pet-Friendly en Europa',
  }
  const descriptions: Record<Locale, string> = {
    en: 'Find the best pet-friendly hotels in Europe. Dog-friendly stays, beach access, luxury hotels and more — book via Booking.com.',
    fr: 'Trouvez les meilleurs hôtels pet-friendly en Europe. Séjours avec chiens, accès plage, hôtels de luxe — réservez sur Booking.com.',
    es: 'Encuentra los mejores hoteles pet-friendly en Europa. Estancias con perros, acceso a la playa, hoteles de lujo — reserva en Booking.com.',
  }
  const l = hasLocale(locale) ? locale : 'en'
  return {
    title: { default: titles[l], template: `%s | HotelsWithPets` },
    description: descriptions[l],
    openGraph: {
      siteName: 'HotelsWithPets',
      type: 'website',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'> & { children: React.ReactNode }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const dict = await getDictionary(locale as Locale)

  return (
    <html lang={locale} className={inter.className}>
      <body className="bg-white text-gray-900 antialiased">
        <Header locale={locale as Locale} dict={dict} />
        <main>{children}</main>
        <Footer locale={locale as Locale} dict={dict} />
      </body>
    </html>
  )
}
