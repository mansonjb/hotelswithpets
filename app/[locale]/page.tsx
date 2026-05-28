import { notFound } from 'next/navigation'
import Link from 'next/link'
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
    description: 'A trip-planning platform for travellers with pets: 800+ verified pet-friendly hotels across 137 destinations, city guides, emergency-vet directories, and transport rules.',
    foundingDate: '2026',
    areaServed: ['Europe', 'United States'],
    knowsLanguage: ['en', 'fr', 'es', 'pt'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <Hero locale={locale as Locale} dict={dict} />
      {(() => {
        const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
        const MONTH_LABEL: Record<string, string[]> = {
          en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
          es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
          pt: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
        }
        const idx = new Date().getMonth()
        const monthSlug = MONTHS[idx]
        const mn = (MONTH_LABEL[locale] ?? MONTH_LABEL.en)[idx]
        const COPY: Record<string, { kicker: string; title: string; desc: string; cta: string }> = {
          en: { kicker: 'PLANNER', title: `Where to travel with a dog in ${mn}?`, desc: 'Our 6 in-season picks: cool-enough weather, dog beaches open, parks and water spots, with a live hotel map and the kit to pack.', cta: `See ${mn} picks →` },
          fr: { kicker: 'PLANIFICATEUR', title: `Où partir avec son chien en ${mn} ?`, desc: 'Nos 6 choix de saison : météo assez fraîche, plages canines ouvertes, parcs et points d\'eau, avec carte des hôtels en direct et le kit à emporter.', cta: `Voir les choix de ${mn} →` },
          es: { kicker: 'PLANIFICADOR', title: `¿Dónde viajar con tu perro en ${mn}?`, desc: 'Nuestras 6 elecciones de temporada: clima fresco, playas caninas abiertas, parques y puntos de agua, con mapa de hoteles en vivo y el kit para llevar.', cta: `Ver elecciones de ${mn} →` },
          pt: { kicker: 'PLANEADOR', title: `Onde viajar com o seu cão em ${mn}?`, desc: 'As nossas 6 escolhas da época: clima fresco, praias caninas abertas, parques e pontos de água, com mapa de hotéis ao vivo e o kit para levar.', cta: `Ver escolhas de ${mn} →` },
        }
        const c = COPY[locale] ?? COPY.en
        return (
          <section className="bg-gradient-to-br from-orange-600 to-rose-700 text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-200 mb-1">🗓️ {c.kicker}</p>
                <h2 className="text-xl lg:text-2xl font-extrabold leading-tight mb-1">{c.title}</h2>
                <p className="text-orange-50 text-sm leading-relaxed max-w-2xl">{c.desc}</p>
              </div>
              <Link
                href={`/${locale}/guides/dog-friendly-europe-by-month/${monthSlug}`}
                className="flex-shrink-0 inline-block bg-white text-orange-700 font-bold px-6 py-3 rounded-full hover:bg-orange-50 transition-colors shadow-lg text-center"
              >
                {c.cta}
              </Link>
            </div>
          </section>
        )
      })()}
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
