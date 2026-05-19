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
    pt: 'HotelsWithPets: Hotéis Pet-Friendly na Europa',
  }
  const descriptions: Record<Locale, string> = {
    en: 'Find the best pet-friendly hotels in Europe. Dog-friendly stays, beach access, luxury hotels and more. Book via Booking.com.',
    fr: 'Trouvez les meilleurs hôtels pet-friendly en Europe. Séjours avec chiens, accès plage, hôtels de luxe. Réservez sur Booking.com.',
    es: 'Encuentra los mejores hoteles pet-friendly en Europa. Estancias con perros, acceso a la playa, hoteles de lujo. Reserva en Booking.com.',
    pt: 'Encontre os melhores hotéis pet-friendly na Europa. Estadias com cães, acesso à praia, hotéis de luxo. Reserve via Booking.com.',
  }
  const l = hasLocale(locale) ? locale : 'en'

  // Bing pondère encore les keywords meta (contrairement à Google), locale-aware
  // top-of-funnel terms qui correspondent au search intent où on apparait déjà.
  const keywords: Record<Locale, string[]> = {
    en: ['pet-friendly hotels', 'dog-friendly hotels', 'cat-friendly hotels', 'travel with dog europe', 'pet travel', 'hotels for dogs', 'hotels for cats', 'pet hotels europe', 'dog friendly travel', 'european dog travel'],
    fr: ['hôtels pet-friendly', 'hôtels acceptant les chiens', 'voyager avec son chien', 'hôtels pour animaux', 'séjour avec chien europe', 'hôtels acceptant les animaux', 'voyage chien europe', 'hôtels chats acceptés'],
    es: ['hoteles pet-friendly', 'hoteles que admiten perros', 'viajar con perro europa', 'hoteles para mascotas', 'hoteles con perros europa', 'hoteles que admiten gatos', 'viajar con mascota'],
    pt: ['hotéis pet-friendly', 'hotéis que aceitam cães', 'viajar com cão europa', 'hotéis para animais', 'estadia com cão europa', 'hotéis que aceitam animais', 'viagem cão europa', 'hotéis gatos aceites'],
  }

  return {
    // template '%s' is identity, pages include their own '| HotelsWithPets.com' suffix
    // to avoid double-suffix (e.g. "Title | HotelsWithPets.com | HotelsWithPets")
    title: { default: titles[l], template: `%s` },
    description: descriptions[l],
    keywords: keywords[l],
    authors: [{ name: 'HotelsWithPets', url: 'https://www.hotelswithpets.com' }],
    creator: 'HotelsWithPets',
    publisher: 'HotelsWithPets',
    applicationName: 'HotelsWithPets',
    category: 'travel',
    openGraph: {
      siteName: 'HotelsWithPets',
      type: 'website',
      locale: l === 'fr' ? 'fr_FR' : l === 'es' ? 'es_ES' : l === 'pt' ? 'pt_PT' : 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@hotelswithpets',
      creator: '@hotelswithpets',
    },
    other: {
      // Bing-specific: encourage rapid recrawl when content changes.
      // Bing reads this hint, Google ignores it (uses sitemap lastmod instead).
      'revisit-after': '7 days',
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
        {/* RSS auto-discovery, picked up by Bing, feed readers, AI crawlers */}
        <link rel="alternate" type="application/rss+xml" title="HotelsWithPets, latest destinations" href="https://www.hotelswithpets.com/rss.xml" />
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
        {/* Google Analytics (gtag.js), GA4 property G-Q03HF80JM2 */}
        <Script
          id="ga4-loader"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-Q03HF80JM2"
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-Q03HF80JM2');`,
          }}
        />
        {/* Microsoft Clarity, project wsnnrbve9l */}
        <Script
          id="ms-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "wsnnrbve9l");`,
          }}
        />
        {/* Travelpayouts (flight + travel affiliate), marker 530832 */}
        <Script
          id="travelpayouts"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=document.createElement("script");s.async=1;s.src="https://emrldtp.com/NTMwODMy.js?t=530832";document.head.appendChild(s);})();`,
          }}
        />
      </body>
    </html>
  )
}
