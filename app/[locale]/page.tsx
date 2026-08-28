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
import HomeSeoContent from '@/components/home/HomeSeoContent'
import HomeFaq from '@/components/home/HomeFaq'
import { SITE_URL } from '@/lib/site'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}

  const titles: Record<string, string> = {
    en: 'Pet-Friendly & Dog-Friendly Hotels in Europe: 2,500+ Verified | HotelsWithPets',
    fr: 'Hôtels acceptant les animaux en Europe : 2 500+ vérifiés, politiques réelles | HotelsWithPets',
    es: 'Hoteles que admiten mascotas en Europa: 2.500+ verificados, políticas reales | HotelsWithPets',
    pt: 'Hotéis que aceitam animais na Europa: 2.500+ verificados, políticas reais | HotelsWithPets',
    de: 'Haustierfreundliche Hotels in Europa: 2.500+ geprüft, echte Richtlinien | HotelsWithPets',
    nl: 'Huisdiervriendelijke hotels in Europa: 2.500+ gecontroleerd, echt beleid | HotelsWithPets',
    it: 'Hotel pet-friendly e dog-friendly in Europa: 2.500+ verificati | HotelsWithPets',
  }
  const descriptions: Record<string, string> = {
    en: 'Find the best pet-friendly and dog-friendly hotels across 400+ European destinations: 2,500+ hotels with verified pet policies (not just "pets allowed"), real guest ratings, city guides, emergency vets and transport rules. Free trip planning for travelling with your dog or cat.',
    fr: 'Trouvez des hôtels acceptant les chiens dans plus de 400 destinations en Europe : 2 500+ adresses aux politiques animaux vérifiées (pas juste « animaux acceptés »), avis vérifiés, guides de ville, vétérinaires d\'urgence et règles de transport. Planifiez votre voyage gratuitement, avec votre chien ou votre chat.',
    es: 'Encuentra hoteles que admiten perros en más de 400 destinos europeos: 2.500+ hoteles con políticas verificadas (no solo "mascotas admitidas"), opiniones reales, guías de ciudad, veterinarios de urgencia y normas de transporte. Planifica tu viaje gratis, con tu perro o tu gato.',
    pt: 'Encontre hotéis que aceitam cães em mais de 400 destinos europeus: 2.500+ hotéis com políticas verificadas (não só "animais aceites"), avaliações reais, guias de cidade, veterinários de urgência e regras de transporte. Planeie a sua viagem gratuitamente, com o seu cão ou gato.',
    de: 'Finden Sie hundefreundliche Hotels in über 400 europäischen Reisezielen: 2.500+ Hotels mit geprüften Haustierrichtlinien (nicht nur „Haustiere erlaubt"), echte Gästebewertungen, Stadtführer, Notfall-Tierärzte und Transportregeln. Kostenlose Reiseplanung für Reisen mit Hund oder Katze.',
    nl: 'Vind hondvriendelijke hotels in meer dan 400 Europese bestemmingen: 2.500+ hotels met gecontroleerd huisdierbeleid (niet alleen "huisdieren toegestaan"), echte gastbeoordelingen, stadsgidsen, spoeddierenartsen en vervoersregels. Gratis reisplanning voor jouw reis met hond of kat.',
    it: `Trova hotel dog-friendly in oltre 400 destinazioni europee: 2.500+ hotel con politiche verificate (non solo "animali ammessi"), recensioni reali degli ospiti, guide città, veterinari d'urgenza e regole di trasporto. Pianifica il tuo viaggio gratis, con il tuo cane o il tuo gatto.`,
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
        de: `${SITE_URL}/de`,
        nl: `${SITE_URL}/nl`,
        it: `${SITE_URL}/it`,
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
    description: '2,500+ dog-friendly and pet-friendly hotels across 400+ European destinations. Handpicked, verified pet policies, real guest ratings, and city guides for travelling with your dog or cat.',
    inLanguage: ['en', 'fr', 'es', 'pt', 'de'],
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
    description: 'A trip-planning platform for travellers with pets: 2,500+ verified dog-friendly and pet-friendly hotels across 400+ destinations, city guides, emergency-vet directories, and transport rules.',
    foundingDate: '2026',
    areaServed: ['Europe', 'United States'],
    knowsLanguage: ['en', 'fr', 'es', 'pt', 'de'],
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
      <HomeSeoContent locale={locale as Locale} />
      <HomeFaq locale={locale as Locale} />
      <PopularSearches locale={locale as Locale} />
    </>
  )
}
