import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { getAllCountries, getLocalizedCountryName } from '@/lib/countries'
import { getLocalizedCityName } from '@/lib/cityNames'
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
    pt: 'Hotéis que aceitam animais por país na Europa | HotelsWithPets.com',
  }
  const descriptions: Record<string, string> = {
    en: `Browse pet-friendly hotels by country across ${countries.length} European countries. Find the best stays for you and your pet.`,
    fr: `Parcourez les hôtels acceptant les animaux par pays dans ${countries.length} pays européens. Trouvez le séjour idéal pour vous et votre animal.`,
    es: `Explora hoteles con mascotas por país en ${countries.length} países europeos. Encuentra el alojamiento ideal para ti y tu mascota.`,
    pt: `Explore hotéis que aceitam animais por país em ${countries.length} países europeus. Encontre a estadia ideal para si e para o seu animal.`,
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
        pt: `${SITE_URL}/pt/countries`,
        'x-default': `${SITE_URL}/en/countries`,
      },
    },
  }
}

// Featured countries (most content)
const FEATURED_SLUGS = ['france', 'spain', 'italy', 'belgium', 'germany', 'portugal']

// Monthly seasonal spotlight — updated each deploy (build-time date)
// month index 0-11
const SEASONAL_SPOTLIGHT: Record<number, {
  slugs: string[]
  label: Record<string, string>
  reason: Record<string, string>
}> = {
  // Jan-Feb: city breaks, mild south
  0:  { slugs: ['portugal', 'spain', 'italy'],  label: { en: 'January picks', fr: 'Sélection janvier', es: 'Selección enero', pt: 'Seleção janeiro' }, reason: { en: 'Mild weather, quiet off-season prices, no beach crowds.', fr: 'Douceur hivernale, prix basse saison, pas de foule.', es: 'Clima suave, precios de temporada baja, sin aglomeraciones.', pt: 'Clima ameno, preços de época baixa, sem multidões.' } },
  1:  { slugs: ['portugal', 'spain', 'italy'],  label: { en: 'February picks', fr: 'Sélection février', es: 'Selección febrero', pt: 'Seleção fevereiro' }, reason: { en: 'Mild weather, quiet off-season prices, no beach crowds.', fr: 'Douceur hivernale, prix basse saison, pas de foule.', es: 'Clima suave, precios de temporada baja, sin aglomeraciones.', pt: 'Clima ameno, preços de época baixa, sem multidões.' } },
  // Mar-Apr: spring city trips
  2:  { slugs: ['netherlands', 'belgium', 'germany'], label: { en: 'March picks', fr: 'Sélection mars', es: 'Selección marzo', pt: 'Seleção março' }, reason: { en: 'Spring blooms, city breaks before the tourist season.', fr: 'Floraisons printanières, city breaks avant la haute saison.', es: 'Primavera en flor, escapadas urbanas antes de la temporada.', pt: 'Flores de primavera, city breaks antes da época alta.' } },
  3:  { slugs: ['netherlands', 'france', 'belgium'], label: { en: 'April picks', fr: 'Sélection avril', es: 'Selección abril', pt: 'Seleção abril' }, reason: { en: 'Tulip season, spring festivals, mild temperatures across northern Europe.', fr: 'Saison des tulipes, festivals printaniers, douceur en Europe du Nord.', es: 'Temporada de tulipanes, festivales de primavera, temperaturas suaves en el norte.', pt: 'Época das tulipas, festivais de primavera, temperaturas amenas no norte da Europa.' } },
  // May-Jun: Mediterranean opens, Adriatic
  4:  { slugs: ['croatia', 'greece', 'italy'], label: { en: 'May picks', fr: 'Sélection mai', es: 'Selección mayo', pt: 'Seleção maio' }, reason: { en: 'Mediterranean season opens: warm sea, no summer crowds yet.', fr: 'La saison méditerranéenne s\'ouvre : mer chaude, pas encore de foule estivale.', es: 'Se abre la temporada mediterránea: mar caliente, sin aglomeraciones aún.', pt: 'A época mediterrânica abre: mar quente, ainda sem multidões.' } },
  5:  { slugs: ['greece', 'croatia', 'montenegro'], label: { en: 'June picks', fr: 'Sélection juin', es: 'Selección junio', pt: 'Seleção junho' }, reason: { en: 'Adriatic and Aegean at their best: warm, sunny, dog-friendly beaches before peak.', fr: 'Adriatique et Égée au top : chaud, ensoleillé, plages dog-friendly avant le pic estival.', es: 'El Adriático y el Egeo en su mejor momento: cálidos, soleados, playas dog-friendly antes del pico.', pt: 'Adriático e Egeu no seu melhor: quente, soalheiro, praias dog-friendly antes do pico.' } },
  // Jul-Aug: escape heat, go north or mountain
  6:  { slugs: ['norway', 'ireland', 'united-kingdom'], label: { en: 'July picks', fr: 'Sélection juillet', es: 'Selección julio', pt: 'Seleção julho' }, reason: { en: 'Beat the heat: cool Atlantic coasts while southern Europe swelters.', fr: 'Fuir la chaleur : côtes atlantiques fraîches pendant que l\'Europe du Sud suffoque.', es: 'Huye del calor: costas atlánticas frescas mientras el sur de Europa se abrasa.', pt: 'Fuja do calor: costas atlânticas frescas enquanto o sul da Europa sufoca.' } },
  7:  { slugs: ['norway', 'sweden', 'finland'], label: { en: 'August picks', fr: 'Sélection août', es: 'Selección agosto', pt: 'Seleção agosto' }, reason: { en: 'Scandinavia in summer: midnight sun, cool air, endless off-lead trails.', fr: 'Scandinavie en été : soleil de minuit, air frais, sentiers sans fin.', es: 'Escandinavia en verano: sol de medianoche, aire fresco, senderos sin fin.', pt: 'Escandinávia no verão: sol da meia-noite, ar fresco, trilhos sem fim.' } },
  // Sep-Oct: shoulder season, vineyards
  8:  { slugs: ['france', 'italy', 'spain'], label: { en: 'September picks', fr: 'Sélection septembre', es: 'Selección septiembre', pt: 'Seleção setembro' }, reason: { en: 'Harvest season: vineyards, markets, dog-friendly terraces in perfect temperature.', fr: 'Saison des vendanges : vignobles, marchés, terrasses dog-friendly à température parfaite.', es: 'Temporada de vendimia: viñedos, mercados, terrazas dog-friendly a temperatura perfecta.', pt: 'Época das vindimas: vinhas, mercados, esplanadas dog-friendly com temperatura perfeita.' } },
  9:  { slugs: ['portugal', 'spain', 'croatia'], label: { en: 'October picks', fr: 'Sélection octobre', es: 'Selección octubre', pt: 'Seleção outubro' }, reason: { en: 'Late-season warmth, empty beaches, half the summer prices.', fr: 'Chaleur de fin de saison, plages désertes, moitié moins cher qu\'en été.', es: 'Calor tardío, playas vacías, a mitad de precio que en verano.', pt: 'Calor de fim de época, praias desertas, metade do preço do verão.' } },
  // Nov-Dec: Christmas markets, cozy cities
  10: { slugs: ['germany', 'austria', 'czech-republic'], label: { en: 'November picks', fr: 'Sélection novembre', es: 'Selección noviembre', pt: 'Seleção novembro' }, reason: { en: 'Christmas market season begins: mulled wine, fairy lights, dog-friendly squares.', fr: 'La saison des marchés de Noël commence : vin chaud, guirlandes, places dog-friendly.', es: 'Comienza la temporada de mercados navideños: vino caliente, luces, plazas dog-friendly.', pt: 'Começa a época dos mercados de Natal: vinho quente, luzes, praças dog-friendly.' } },
  11: { slugs: ['germany', 'austria', 'switzerland'], label: { en: 'December picks', fr: 'Sélection décembre', es: 'Selección diciembre', pt: 'Seleção dezembro' }, reason: { en: 'The best Christmas markets in Europe, all dog-friendly: Vienna, Zurich, Nuremberg.', fr: 'Les meilleurs marchés de Noël d\'Europe, tous dog-friendly : Vienne, Zurich, Nuremberg.', es: 'Los mejores mercados navideños de Europa, todos dog-friendly: Viena, Zúrich, Núremberg.', pt: 'Os melhores mercados de Natal da Europa, todos dog-friendly: Viena, Zurique, Nuremberga.' } },
}

const COPY: Record<string, {
  hero: string
  subtitle: string
  featuredTitle: string
  allTitle: string
  intro: string
  tipTitle: string
  tip: string
  spotlightTitle: string
}> = {
  fr: {
    hero: 'Explorer par pays',
    subtitle: `${countries.length} pays · des milliers d'hôtels vérifiés · politiques animaux à jour`,
    featuredTitle: 'Pays incontournables',
    allTitle: 'Tous les pays',
    intro: 'Chaque pays européen a ses propres règles pour voyager avec un animal : documents requis (passeport, certificat sanitaire), accès aux transports (train, ferry, avion), et conditions hôtelières (suppléments, taille, races). Nos fiches pays condensent l\'essentiel pour partir sans mauvaise surprise.',
    tipTitle: 'Bon à savoir',
    tip: 'Pour voyager avec votre chien ou chat dans l\'Union européenne, il vous faut un passeport européen pour animal de compagnie et un vaccin antirabique à jour. La Finlande, le Royaume-Uni et la Norvège ont des règles supplémentaires.',
    spotlightTitle: 'À la une ce mois-ci',
  },
  en: {
    hero: 'Browse by country',
    subtitle: `${countries.length} countries · thousands of verified hotels · up-to-date pet policies`,
    featuredTitle: 'Top destinations',
    allTitle: 'All countries',
    intro: 'Every European country has its own rules for travelling with a pet: required documents (passport, health certificate), transport access (train, ferry, plane), and hotel policies (fees, size limits, breed restrictions). Our country pages condense the essentials so you travel without surprises.',
    tipTitle: 'Good to know',
    tip: 'To travel with your dog or cat within the EU, you need an EU pet passport and an up-to-date rabies vaccination. Finland, the UK and Norway have additional requirements — check our full guide before you travel.',
    spotlightTitle: 'Featured this month',
  },
  es: {
    hero: 'Explorar por país',
    subtitle: `${countries.length} países · miles de hoteles verificados · políticas actualizadas`,
    featuredTitle: 'Destinos imprescindibles',
    allTitle: 'Todos los países',
    intro: 'Cada país europeo tiene sus propias normas para viajar con mascotas: documentación (pasaporte, certificado sanitario), acceso al transporte (tren, ferry, avión) y condiciones hoteleras (suplementos, tamaño, razas). Nuestras páginas por país resumen lo esencial para viajar sin sorpresas.',
    tipTitle: 'Importante',
    tip: 'Para viajar con tu perro o gato dentro de la UE necesitas el pasaporte europeo para mascotas y la vacuna antirrábica al día. Finlandia, el Reino Unido y Noruega tienen requisitos adicionales — consulta nuestra guía completa.',
    spotlightTitle: 'Destacado este mes',
  },
  pt: {
    hero: 'Explorar por país',
    subtitle: `${countries.length} países · milhares de hotéis verificados · políticas de animais atualizadas`,
    featuredTitle: 'Destinos incontornáveis',
    allTitle: 'Todos os países',
    intro: 'Cada país europeu tem as suas próprias regras para viajar com animais: documentos necessários (passaporte, certificado sanitário), acesso a transportes (comboio, ferry, avião) e condições hoteleiras (suplementos, tamanho, raças). As nossas páginas por país resumem o essencial.',
    tipTitle: 'Bom a saber',
    tip: 'Para viajar com o seu cão ou gato na União Europeia, precisa de um passaporte europeu para animais de estimação e vacinação antirrábica atualizada. A Finlândia, o Reino Unido e a Noruega têm requisitos adicionais.',
    spotlightTitle: 'Em destaque este mês',
  },
}

const COUNTRY_INTROS: Record<string, Record<string, string>> = {
  france: {
    fr: "L'une des destinations les plus accueillantes pour les animaux en Europe. Cafés, brasseries, hôtels de luxe : les chiens sont admis partout, du surf à Biarritz aux terrasses parisiennes.",
    en: "One of Europe's most dog-welcoming countries. From Parisian café terraces to surf beaches in Biarritz, France treats dogs like locals.",
    es: "Uno de los países más abiertos a las mascotas de Europa. Los perros son bienvenidos en cafés, restaurantes y hoteles de lujo, desde las terrazas parisinas hasta Biarritz.",
    pt: "Um dos países mais amigáveis para animais na Europa. Desde as esplanadas parisienses até às praias de surf em Biarritz, a França trata os cães como locais.",
  },
  spain: {
    fr: "Soleil, plages accessibles aux chiens et hôtels de plus en plus ouverts aux animaux. Barcelone, Madrid et la côte méditerranéenne font de l'Espagne un choix naturel.",
    en: "Sun, dog-friendly beaches and an ever-growing hotel scene open to pets. Barcelona, Madrid and the Mediterranean coast make Spain a natural choice for pet-owning travellers.",
    es: "Sol, playas para perros y hoteles que cada vez abren más las puertas a las mascotas. Barcelona, Madrid y la costa mediterránea convierten España en un destino de lo más acogedor.",
    pt: "Sol, praias dog-friendly e hotéis cada vez mais abertos a animais. Barcelona, Madrid e a costa mediterrânica fazem de Espanha uma escolha natural.",
  },
  italy: {
    fr: "En Italie, les chiens accompagnent leurs propriétaires partout : restaurants en terrasse, piazzas et balades historiques. Rome, Florence et Venise vous attendent.",
    en: "In Italy, dogs go everywhere with their owners: terrace restaurants, piazzas and monument-lined strolls. Rome, Florence and Venice await.",
    es: "En Italia los perros acompañan a sus dueños a todas partes: terrazas, plazas y paseos entre monumentos. Roma, Florencia y Venecia te esperan.",
    pt: "Em Itália, os cães acompanham os donos em todo o lado: restaurantes com esplanada, praças e passeios históricos. Roma, Florença e Veneza esperam por si.",
  },
  belgium: {
    fr: "Les villes médiévales de Belgique, Bruges, Gand, Anvers, comptent parmi les plus dog-friendly d'Europe. Cafés, hôtels boutiques et canaux accessibles à quatre pattes.",
    en: "Belgium's medieval cities, Bruges, Ghent and Antwerp, rank among Europe's most dog-forward. Cafés, boutique hotels and canal towpaths welcome you and your pet.",
    es: "Las ciudades medievales de Bélgica, Brujas, Gante y Amberes, están entre las más abiertas a los perros de Europa. Cafés, hoteles boutique y canales a tu disposición.",
    pt: "As cidades medievais da Bélgica, Bruges, Gante e Antuérpia, estão entre as mais dog-friendly da Europa.",
  },
  germany: {
    fr: "En Allemagne, voyager avec un chien est parfaitement normal. Métro, musées, biergartens : les chiens sont bienvenus partout et dans toutes les villes.",
    en: "In Germany, travelling with a dog is completely normal. Metro, museums, beer gardens — dogs are welcome everywhere, in every city.",
    es: "En Alemania viajar con perro es de lo más habitual. Metro, museos, biergarten, los perros son bienvenidos en todas partes y en todas las ciudades.",
    pt: "Na Alemanha, viajar com cão é completamente normal. Metro, museus, jardins de cerveja: cães são bem-vindos em todo o lado.",
  },
  portugal: {
    fr: "Doux, ensoleillé et accessible, le Portugal est idéal pour voyager avec un animal toute l'année. Lisbonne et Porto combinent charme, tranquillité et terrasses face au fleuve.",
    en: "Mild, sunny and affordable, Portugal is ideal for year-round pet travel. Lisbon and Porto combine charm, relaxed vibes and riverside terraces.",
    es: "Cálido, soleado y asequible, Portugal es ideal para viajar con mascota durante todo el año. Lisboa y Oporto combinan encanto, tranquilidad y terrazas junto al río.",
    pt: "Ameno, soalheiro e acessível, Portugal é ideal para viajar com animais durante todo o ano. Lisboa e Porto combinam charme, tranquilidade e esplanadas junto ao rio.",
  },
  greece: {
    fr: "Des îles aux criques de l'Épire, la Grèce offre certaines des plages les plus accessibles aux chiens d'Europe. Les tavernes accueillent les animaux en terrasse, la vie est douce.",
    en: "From island beaches to Epirus coves, Greece offers some of Europe's most accessible dog-friendly beaches. Taverna terraces welcome dogs, life is easy.",
    es: "De las playas de las islas a las calas del Épiro, Grecia ofrece algunas de las playas más dog-friendly de Europa. Las tabernas aceptan perros en terraza.",
    pt: "Das praias das ilhas às enseadas do Épiro, a Grécia oferece algumas das praias mais dog-friendly da Europa.",
  },
  croatia: {
    fr: "L'Adriatique croate est l'une des mers les plus propres d'Europe, avec des plages dog-friendly sur tout le littoral. Dubrovnik, Split, Zadar : architecture médiévale et mer turquoise.",
    en: "The Croatian Adriatic is one of Europe's cleanest seas, with dog-friendly beaches along the entire coast. Dubrovnik, Split, Zadar: medieval architecture and turquoise water.",
    es: "El Adriático croata es uno de los mares más limpios de Europa, con playas dog-friendly por toda la costa. Dubrovnik, Split, Zadar: arquitectura medieval y agua turquesa.",
    pt: "O Adriático croata é um dos mares mais limpos da Europa, com praias dog-friendly em todo o litoral.",
  },
  montenegro: {
    fr: "Petit mais spectaculaire, le Monténégro offre la baie de Kotor, des plages sauvages et des parcs nationaux montagneux. Les chiens sont bienvenus dans presque tous les hébergements.",
    en: "Small but spectacular, Montenegro offers Kotor Bay, wild beaches and mountainous national parks. Dogs are welcome in almost every accommodation.",
    es: "Pequeño pero espectacular, Montenegro ofrece la bahía de Kotor, playas salvajes y parques nacionales montañosos. Los perros son bienvenidos en casi todos los alojamientos.",
    pt: "Pequeno mas espetacular, o Montenegro oferece a baía de Kotor, praias selvagens e parques nacionais montanhosos. Cães são bem-vindos em quase todos os alojamentos.",
  },
}

export default async function CountriesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const lang = (locale === 'fr' || locale === 'es' || locale === 'pt') ? locale as 'fr' | 'es' | 'pt' : 'en'
  const copy = COPY[lang] ?? COPY.en

  const totalHotels = hotels.length
  const featuredCountries = FEATURED_SLUGS.map(slug => countries.find(c => c.slug === slug)).filter(Boolean)
  const otherCountries = countries.filter(c => !FEATURED_SLUGS.includes(c.slug))

  // Seasonal spotlight
  const currentMonth = new Date().getMonth()
  const spotlight = SEASONAL_SPOTLIGHT[currentMonth]
  const spotlightCountries = spotlight
    ? spotlight.slugs.map(slug => countries.find(c => c.slug === slug)).filter(Boolean)
    : []

  const getHotelCount = (country: typeof countries[number]) =>
    hotels.filter(h => country.destinations.some(d => d.slug === h.destinationSlug)).length

  const cityLabel = (n: number) =>
    locale === 'fr' ? `${n} ville${n > 1 ? 's' : ''}` :
    locale === 'es' ? `${n} ciudad${n > 1 ? 'es' : ''}` :
    locale === 'pt' ? `${n} cidade${n > 1 ? 's' : ''}` :
    `${n} ${n > 1 ? 'cities' : 'city'}`

  const hotelLabel = (n: number) =>
    locale === 'fr' ? `${n} hôtel${n > 1 ? 's' : ''}` :
    locale === 'es' ? `${n} hotel${n > 1 ? 'es' : ''}` :
    locale === 'pt' ? `${n} hotéi${n > 1 ? 's' : 'l'}` :
    `${n} hotel${n > 1 ? 's' : ''}`

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">{copy.hero}</h1>
            <p className="text-blue-200 text-base leading-relaxed mb-6">{copy.intro}</p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-white/10 rounded-full px-4 py-1.5 text-sm">🗺️ {countries.length} {locale === 'fr' ? 'pays' : locale === 'es' ? 'países' : locale === 'pt' ? 'países' : 'countries'}</span>
              <span className="bg-white/10 rounded-full px-4 py-1.5 text-sm">🏨 {totalHotels} {locale === 'fr' ? 'hôtels vérifiés' : locale === 'es' ? 'hoteles verificados' : locale === 'pt' ? 'hotéis verificados' : 'verified hotels'}</span>
              <span className="bg-white/10 rounded-full px-4 py-1.5 text-sm">✓ {locale === 'fr' ? 'Politiques animaux vérifiées' : locale === 'es' ? 'Políticas verificadas' : locale === 'pt' ? 'Políticas animais verificadas' : 'Verified pet policies'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Travel tip */}
      <section className="bg-amber-50 border-b border-amber-100 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <p className="text-sm text-amber-800 flex items-start gap-2 flex-1">
              <span className="text-base flex-shrink-0">💡</span>
              <span><strong>{copy.tipTitle}:</strong> {copy.tip}</span>
            </p>
            <Link
              href={`/${locale}/guides/passeport-animal`}
              className="flex-shrink-0 text-xs font-semibold text-amber-700 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-200 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
            >
              {locale === 'fr' ? 'Guide complet →' : locale === 'es' ? 'Guía completa →' : locale === 'pt' ? 'Guia completo →' : 'Full guide →'}
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">

        {/* Seasonal spotlight */}
        {spotlightCountries.length > 0 && spotlight && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900">{copy.spotlightTitle}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{spotlight.reason[lang]}</p>
              </div>
              <span className="text-2xl">🌞</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {spotlightCountries.map((country) => {
                if (!country) return null
                const hCount = getHotelCount(country)
                const intro = COUNTRY_INTROS[country.slug]?.[lang]
                return (
                  <Link
                    key={country.slug}
                    href={`/${locale}/countries/${country.slug}`}
                    className="group bg-gradient-to-br from-sky-50 to-blue-50 border border-blue-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{country.flag}</span>
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{getLocalizedCountryName(country.name, locale)}</p>
                        <p className="text-xs text-gray-400">{cityLabel(country.destinations.length)} · {hotelLabel(hCount)}</p>
                      </div>
                    </div>
                    {intro && <p className="text-xs text-gray-600 leading-relaxed">{intro}</p>}
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Featured countries */}
        <section>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{copy.featuredTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                      <p className="font-bold text-gray-900 text-lg group-hover:text-blue-700 transition-colors">{getLocalizedCountryName(country.name, locale)}</p>
                      <p className="text-xs text-gray-400">{cityLabel(country.destinations.length)} · {hotelLabel(hCount)}</p>
                    </div>
                  </div>
                  {intro && <p className="text-sm text-gray-500 leading-relaxed mb-4">{intro}</p>}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {country.destinations.slice(0, 4).map((d) => (
                      <span key={d.slug} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{getLocalizedCityName(d.slug, d.name, locale)}</span>
                    ))}
                    {country.destinations.length > 4 && (
                      <span className="text-xs bg-gray-100 text-gray-400 px-2.5 py-1 rounded-full">+{country.destinations.length - 4}</span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-blue-600 flex items-center gap-1">
                    {locale === 'fr' ? 'Voir les hôtels' : locale === 'es' ? 'Ver hoteles' : locale === 'pt' ? 'Ver hotéis' : 'View hotels'} →
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* All other countries */}
        <section>
          <h2 className="text-xl font-extrabold text-gray-900 mb-5">{copy.allTitle}</h2>
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
                    <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors text-sm truncate">{getLocalizedCountryName(country.name, locale)}</p>
                    <p className="text-xs text-gray-400">{cityLabel(country.destinations.length)} · {hotelLabel(hCount)}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

      </div>
    </div>
  )
}
