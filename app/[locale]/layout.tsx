import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
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
    en: 'HotelsWithPets: Pet-Friendly Hotels in Europe',
    fr: 'HotelsWithPets: Hôtels Pet-Friendly en Europe',
    es: 'HotelsWithPets: Hoteles Pet-Friendly en Europa',
  }
  const descriptions: Record<Locale, string> = {
    en: 'Find the best pet-friendly hotels in Europe. Dog-friendly stays, beach access, luxury hotels and more. Book via Booking.com.',
    fr: 'Trouvez les meilleurs hôtels pet-friendly en Europe. Séjours avec chiens, accès plage, hôtels de luxe. Réservez sur Booking.com.',
    es: 'Encuentra los mejores hoteles pet-friendly en Europa. Estancias con perros, acceso a la playa, hoteles de lujo. Reserva en Booking.com.',
  }
  const l = hasLocale(locale) ? locale : 'en'
  return {
    // template '%s' is identity — pages include their own '| HotelsWithPets.com' suffix
    // to avoid double-suffix (e.g. "Title | HotelsWithPets.com | HotelsWithPets")
    title: { default: titles[l], template: `%s` },
    description: descriptions[l],
    openGraph: {
      siteName: 'HotelsWithPets',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@hotelswithpets',
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
      <head>
        <link rel="preconnect" href="https://www.booking.com" />
        <link rel="preconnect" href="https://www.stay22.com" />
        <link rel="dns-prefetch" href="https://scripts.stay22.com" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <Header locale={locale as Locale} dict={dict} />
        <main>{children}</main>
        <Footer locale={locale as Locale} dict={dict} />
        {/* Stay22 LetMeAllez. Auto-upgrades Booking.com links to multi-platform affiliate */}
        <Script
          id="stay22-letmeallez"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(s,t,a,y,twenty,two){s.Stay22=s.Stay22||{};s.Stay22.params={lmaID:'69e08b99d5ab79f03e163885'};twenty=t.createElement(a);two=t.getElementsByTagName(a)[0];twenty.async=1;twenty.src=y;two.parentNode.insertBefore(twenty,two)})(window,document,'script','https://scripts.stay22.com/letmeallez.js');`,
          }}
        />
      </body>
    </html>
  )
}
