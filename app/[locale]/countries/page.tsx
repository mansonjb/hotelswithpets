import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales, type Locale } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { getAllCountries } from '@/lib/countries'
import hotels from '@/data/hotels.json'
import { SITE_URL } from '@/lib/site'

const countries = getAllCountries()

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
    en: 'Pet-Friendly Hotels by Country in Europe | HotelsWithPets.com',
    fr: 'Hôtels acceptant les animaux par pays en Europe | HotelsWithPets.com',
    es: 'Hoteles con mascotas por país en Europa | HotelsWithPets.com',
  }
  const descriptions: Record<string, string> = {
    en: `Browse pet-friendly hotels by country across ${countries.length} European countries. Find the best stays for you and your pet.`,
    fr: `Parcourez les hôtels acceptant les animaux par pays dans ${countries.length} pays européens. Trouvez le séjour idéal pour vous et votre animal.`,
    es: `Explora hoteles con mascotas por país en ${countries.length} países europeos. Encuentra el alojamiento ideal para ti y tu mascota.`,
  }

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/countries`,
      languages: {
        en: `${SITE_URL}/en/countries`,
        fr: `${SITE_URL}/fr/countries`,
        es: `${SITE_URL}/es/countries`,
        'x-default': `${SITE_URL}/en/countries`,
      },
    },
  }
}

// Featured countries (most cities) shown with bigger cards at top
const FEATURED_SLUGS = ['france', 'spain', 'italy', 'belgium', 'germany', 'portugal']

const COPY: Record<string, {
  hero: string
  subtitle: string
  featuredTitle: string
  allTitle: string
  intro: string
  tipTitle: string
  tip: string
}> = {
  fr: {
    hero: 'Explorer par pays',
    subtitle: 'Trouvez les meilleurs hôtels pet-friendly dans chaque pays d\'Europe.',
    featuredTitle: 'Pays incontournables',
    allTitle: 'Tous les pays',
    intro: 'Chaque pays a ses propres règles pour voyager avec un animal : documents requis, accès aux transports, conditions hôtelières. Nos fiches pays vous donnent l\'essentiel à savoir avant de partir.',
    tipTitle: 'Bon à savoir',
    tip: 'Pour voyager avec votre chien ou chat dans l\'Union européenne, il vous faut un passeport européen pour animal de compagnie et un vaccin antirabique à jour. La Finlande, le Royaume-Uni et la Norvège ont des règles supplémentaires.',
  },
  en: {
    hero: 'Browse by country',
    subtitle: 'Find the best pet-friendly hotels in every European country.',
    featuredTitle: 'Top destinations',
    allTitle: 'All countries',
    intro: 'Each European country has its own rules for travelling with a pet: required documents, transport access, hotel policies. Our country pages give you what you need to know before you set off.',
    tipTitle: 'Good to know',
    tip: 'To travel with your dog or cat within the EU, you need an EU pet passport and an up-to-date rabies vaccination. Finland, the UK and Norway have additional requirements — check our full guide before you travel.',
  },
  es: {
    hero: 'Explorar por país',
    subtitle: 'Encuentra los mejores hoteles pet-friendly en cada país de Europa.',
    featuredTitle: 'Destinos imprescindibles',
    allTitle: 'Todos los países',
    intro: 'Cada país europeo tiene sus propias normas para viajar con mascotas: documentación necesaria, acceso al transporte, condiciones hoteleras. Nuestras páginas por país te dan lo esencial antes de salir.',
    tipTitle: 'Importante',
    tip: 'Para viajar con tu perro o gato dentro de la UE necesitas el pasaporte europeo para mascotas y la vacuna antirrábica al día. Finlandia, el Reino Unido y Noruega tienen requisitos adicionales — consulta nuestra guía completa.',
  },
}

const COUNTRY_INTROS: Record<string, Record<string, string>> = {
  france: {
    fr: "L'une des destinations les plus accueillantes pour les animaux en Europe. Les chiens sont admis dans les cafés, les brasseries et les hôtels de luxe — du surf à Biarritz aux terrasses parisiennes.",
    en: "One of Europe's most dog-welcoming countries. From Parisian café terraces to surf beaches in Biarritz, France treats dogs like locals.",
    es: "Uno de los países más abiertos a las mascotas de Europa. Los perros son bienvenidos en cafés, restaurantes y hoteles de lujo — desde las terrazas parisinas hasta las olas de Biarritz.",
  },
  spain: {
    fr: "Soleil, plages accessibles aux chiens et hôtels de plus en plus ouverts aux animaux. Barcelone, Madrid et la côte méditerranéenne font de l'Espagne un choix naturel pour voyager avec son animal.",
    en: "Sun, dog-friendly beaches and an ever-growing hotel scene open to pets. Barcelona, Madrid and the Mediterranean coast make Spain a natural choice for pet-owning travellers.",
    es: "Sol, playas para perros y hoteles que cada vez abren más las puertas a las mascotas. Barcelona, Madrid y la costa mediterránea convierten España en un destino de lo más acogedor.",
  },
  italy: {
    fr: "En Italie, les chiens accompagnent leurs propriétaires partout : restaurants en terrasse, piazzas et balades historiques. Rome, Florence et Venise vous attendent.",
    en: "In Italy, dogs go everywhere with their owners — terrace restaurants, piazzas and monument-lined strolls. Rome, Florence and Venice await.",
    es: "En Italia los perros acompañan a sus dueños a todas partes: terrazas, plazas y paseos entre monumentos. Roma, Florencia y Venecia te esperan.",
  },
  belgium: {
    fr: "Les villes médiévales de Belgique — Bruges, Gand, Anvers — comptent parmi les plus dog-friendly d'Europe. Cafés, hôtels boutiques et towpaths de canaux accessibles à quatre pattes.",
    en: "Belgium's medieval cities — Bruges, Ghent and Antwerp — rank among Europe's most dog-forward. Cafés, boutique hotels and canal towpaths welcome you and your pet.",
    es: "Las ciudades medievales de Bélgica — Brujas, Gante y Amberes — están entre las más abiertas a los perros de Europa. Cafés, hoteles boutique y canales a tu disposición.",
  },
  germany: {
    fr: "En Allemagne, voyager avec un chien est parfaitement normal. Métro, musées, biergartens — les chiens sont bienvenus partout et dans toutes les villes.",
    en: "In Germany, travelling with a dog is completely normal. Metro, museums, beer gardens — dogs are welcome everywhere, in every city.",
    es: "En Alemania viajar con perro es de lo más habitual. Metro, museos, biergarten — los perros son bienvenidos en todas partes y en todas las ciudades.",
  },
  portugal: {
    fr: "Doux, ensoleillé et accessible, le Portugal est idéal pour voyager avec un animal toute l'année. Lisbonne et Porto combinent charme, tranquillité et terrasses face au fleuve.",
    en: "Mild, sunny and affordable, Portugal is ideal for year-round pet travel. Lisbon and Porto combine charm, relaxed vibes and riverside terraces.",
    es: "Cálido, soleado y asequible, Portugal es ideal para viajar con mascota durante todo el año. Lisboa y Oporto combinan encanto, tranquilidad y terrazas junto al río.",
  },
}

export default async function CountriesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const lang = (locale === 'fr' || locale === 'es') ? locale as 'fr' | 'es' : 'en'
  const copy = COPY[lang]

  const totalHotels = hotels.length
  const featuredCountries = FEATURED_SLUGS.map(slug => countries.find(c => c.slug === slug)).filter(Boolean)
  const otherCountries = countries.filter(c => !FEATURED_SLUGS.includes(c.slug))

  const getHotelCount = (country: typeof countries[number]) =>
    hotels.filter(h => country.destinations.some(d => d.slug === h.destinationSlug)).length

  const cityLabel = (n: number) =>
    locale === 'fr' ? `${n} ville${n > 1 ? 's' : ''}` :
    locale === 'es' ? `${n} ciudad${n > 1 ? 'es' : ''}` :
    `${n} ${n > 1 ? 'cities' : 'city'}`

  const hotelLabel = (n: number) =>
    locale === 'fr' ? `${n} hôtels` :
    locale === 'es' ? `${n} hoteles` :
    `${n} hotels`

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">{copy.hero}</h1>
            <p className="text-blue-200 text-lg leading-relaxed mb-8">{copy.intro}</p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-white/10 rounded-full px-4 py-1.5 text-sm">🗺️ {countries.length} {locale === 'fr' ? 'pays' : locale === 'es' ? 'países' : 'countries'}</span>
              <span className="bg-white/10 rounded-full px-4 py-1.5 text-sm">🏨 {totalHotels} {locale === 'fr' ? 'hôtels vérifiés' : locale === 'es' ? 'hoteles verificados' : 'verified hotels'}</span>
              <span className="bg-white/10 rounded-full px-4 py-1.5 text-sm">✓ {locale === 'fr' ? 'Politiques animaux vérifiées' : locale === 'es' ? 'Políticas verificadas' : 'Verified pet policies'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Travel tip — links to full guide */}
      <section className="bg-amber-50 border-b border-amber-100 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <p className="text-sm text-amber-800 flex items-start gap-2 flex-1">
              <span className="text-base flex-shrink-0">💡</span>
              <span><strong>{copy.tipTitle} —</strong> {copy.tip}</span>
            </p>
            <Link
              href={`/${locale}/guides/passeport-animal`}
              className="flex-shrink-0 text-xs font-semibold text-amber-700 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-200 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
            >
              {locale === 'fr' ? 'Guide complet →' : locale === 'es' ? 'Guía completa →' : 'Full guide →'}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured countries */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">{copy.featuredTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {featuredCountries.map((country) => {
              if (!country) return null
              const hCount = getHotelCount(country)
              const intro = COUNTRY_INTROS[country.slug]?.[lang] ?? ''
              return (
                <Link
                  key={country.slug}
                  href={`/${locale}/countries/${country.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{country.flag}</span>
                    <div>
                      <p className="font-bold text-gray-900 text-lg group-hover:text-blue-700 transition-colors">{country.name}</p>
                      <p className="text-xs text-gray-400">{cityLabel(country.destinations.length)} · {hotelLabel(hCount)}</p>
                    </div>
                  </div>
                  {intro && <p className="text-sm text-gray-500 leading-relaxed mb-4">{intro}</p>}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {country.destinations.slice(0, 4).map((d) => (
                      <span key={d.slug} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{d.name}</span>
                    ))}
                    {country.destinations.length > 4 && (
                      <span className="text-xs bg-gray-100 text-gray-400 px-2.5 py-1 rounded-full">+{country.destinations.length - 4}</span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-blue-600 group-hover:gap-2 flex items-center gap-1 transition-all">
                    {locale === 'fr' ? 'Voir les hôtels' : locale === 'es' ? 'Ver hoteles' : 'View hotels'} →
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Other countries */}
          <h2 className="text-xl font-extrabold text-gray-900 mb-6">{copy.allTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {otherCountries.map((country) => {
              const hCount = getHotelCount(country)
              return (
                <Link
                  key={country.slug}
                  href={`/${locale}/countries/${country.slug}`}
                  className="group bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3"
                >
                  <span className="text-3xl flex-shrink-0">{country.flag}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors text-sm">{country.name}</p>
                    <p className="text-xs text-gray-400">{cityLabel(country.destinations.length)} · {hotelLabel(hCount)}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  )
}
