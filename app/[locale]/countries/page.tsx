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
    fr: 'Hôtels Acceptant Animaux par Pays en Europe | HotelsWithPets.com',
    es: 'Hoteles con Mascotas por País en Europa | HotelsWithPets.com',
  }
  const descriptions: Record<string, string> = {
    en: `Browse pet-friendly hotels by country across ${countries.length} European countries. Find the best stays for you and your pet.`,
    fr: `Parcourez les hôtels acceptant animaux par pays dans ${countries.length} pays européens.`,
    es: `Explora hoteles con mascotas por país en ${countries.length} países europeos.`,
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
    hero: 'Explorez par pays',
    subtitle: 'Trouvez les meilleurs hôtels pet-friendly dans chaque pays d\'Europe.',
    featuredTitle: 'Destinations vedettes',
    allTitle: 'Tous les pays',
    intro: 'Chaque pays européen a ses propres règles pour voyager avec un animal : documents requis, accès aux transports, politiques hôtelières. Nos fiches pays vous donnent une vue d\'ensemble avant de réserver.',
    tipTitle: 'Le saviez-vous ?',
    tip: 'Pour voyager avec votre chien ou chat dans l\'Union européenne, vous avez besoin d\'un passeport européen pour animal de compagnie et d\'un vaccin antirabique à jour. Certains pays comme la Finlande ou le Royaume-Uni ont des exigences supplémentaires.',
  },
  en: {
    hero: 'Browse by country',
    subtitle: 'Find the best pet-friendly hotels in every European country.',
    featuredTitle: 'Featured destinations',
    allTitle: 'All countries',
    intro: 'Each European country has its own rules for travelling with a pet: required documents, transport access, hotel policies. Our country pages give you an overview before you book.',
    tipTitle: 'Did you know?',
    tip: 'To travel with your dog or cat within the European Union, you need an EU pet passport and an up-to-date rabies vaccination. Some countries like Finland or the UK have additional requirements.',
  },
  es: {
    hero: 'Explorar por país',
    subtitle: 'Encuentra los mejores hoteles pet-friendly en cada país de Europa.',
    featuredTitle: 'Destinos destacados',
    allTitle: 'Todos los países',
    intro: 'Cada país europeo tiene sus propias normas para viajar con mascotas: documentos requeridos, acceso al transporte, políticas hoteleras. Nuestras páginas por país te dan una visión general antes de reservar.',
    tipTitle: '¿Sabías que?',
    tip: 'Para viajar con tu perro o gato dentro de la Unión Europea, necesitas un pasaporte europeo para mascotas y una vacunación antirrábica al día. Algunos países como Finlandia o el Reino Unido tienen requisitos adicionales.',
  },
}

const COUNTRY_INTROS: Record<string, Record<string, string>> = {
  france: {
    fr: 'Pays le plus pet-friendly d\'Europe, la France accueille les chiens dans les cafés, restaurants et hôtels de luxe. Du surf à Biarritz aux terrasses parisiennes.',
    en: 'Europe\'s most pet-friendly country, France welcomes dogs in cafés, restaurants and luxury hotels. From surfing in Biarritz to Parisian terraces.',
    es: 'El país más amigable con las mascotas de Europa, Francia acoge perros en cafés, restaurantes y hoteles de lujo. Desde el surf en Biarritz hasta las terrazas parisinas.',
  },
  spain: {
    fr: 'L\'Espagne du soleil et des plages pour chiens. Barcelone, Madrid et la côte méditerranéenne offrent un accueil croissant aux propriétaires d\'animaux.',
    en: 'Spain of sun and dog-friendly beaches. Barcelona, Madrid and the Mediterranean coast offer growing hospitality to pet owners.',
    es: 'La España del sol y las playas para perros. Barcelona, Madrid y la costa mediterránea ofrecen una hospitalidad creciente para los dueños de mascotas.',
  },
  italy: {
    fr: 'L\'Italie où les chiens accompagnent partout : restaurants, piazzas et monuments. Rome, Florence et Venise vous attendent.',
    en: 'Italy where dogs go everywhere: restaurants, piazzas and monuments. Rome, Florence and Venice await.',
    es: 'Italia donde los perros van a todas partes: restaurantes, plazas y monumentos. Roma, Florencia y Venecia te esperan.',
  },
  belgium: {
    fr: 'La Belgique et ses villes médiévales dog-friendly : Bruges, Gand et Anvers accueillent les animaux dans leurs cafés et hôtels boutiques.',
    en: 'Belgium and its dog-friendly medieval cities: Bruges, Ghent and Antwerp welcome pets in their cafés and boutique hotels.',
    es: 'Bélgica y sus ciudades medievales dog-friendly: Brujas, Gante y Amberes acogen mascotas en sus cafés y hoteles boutique.',
  },
  germany: {
    fr: 'L\'Allemagne, capitale européenne du dog-friendly. Les chiens montent dans le métro, entrent dans les musées et sont les bienvenus dans les biergartens.',
    en: 'Germany, Europe\'s dog-friendly capital. Dogs ride the metro, enter museums and are welcomed in beer gardens.',
    es: 'Alemania, la capital dog-friendly de Europa. Los perros viajan en metro, entran en museos y son bienvenidos en los biergarten.',
  },
  portugal: {
    fr: 'Le Portugal doux et ensoleillé, parfait pour voyager avec un animal toute l\'année. Lisbonne et Porto offrent un mélange unique de charme et d\'accessibilité.',
    en: 'Mild, sunny Portugal, perfect for year-round pet travel. Lisbon and Porto offer a unique blend of charm and accessibility.',
    es: 'Portugal cálido y soleado, perfecto para viajar con mascotas todo el año. Lisboa y Oporto ofrecen una mezcla única de encanto y accesibilidad.',
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

      {/* Travel tip */}
      <section className="bg-amber-50 border-b border-amber-100 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-amber-800 flex items-start gap-2">
            <span className="text-base flex-shrink-0">💡</span>
            <span><strong>{copy.tipTitle}</strong> {copy.tip}</span>
          </p>
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
