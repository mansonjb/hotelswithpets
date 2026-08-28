import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { readdirSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { getDictionary, hasLocale, locales, type Locale } from '@/app/[locale]/dictionaries'
import hotels from '@/data/hotels.json'
import { SITE_URL } from '@/lib/site'
import { getLocalizedCountryName } from '@/lib/countries'
import { getLocalizedCityName } from '@/lib/cityNames'

// ─── Types ──────────────────────────────────────────────────────────────────

interface ParksPlace {
  name: string
  nameFr?: string
  nameEs?: string
  namePt?: string
  offLeash?: boolean
}

interface CityGuideFile {
  slug?: string
  name?: string
  city?: string
  country?: string
  flag?: string
  guides?: { parks?: { places?: ParksPlace[] } }
}

interface CityParks {
  slug: string
  name: string
  country: string
  flag: string
  places: ParksPlace[]
  offLeashCount: number
}

// ─── Data aggregation (module load, ISR-cached) ───────────────────────────────

function loadAllCityParks(): CityParks[] {
  const dir = join(process.cwd(), 'data/city-guides')
  if (!existsSync(dir)) return []
  const out: CityParks[] = []
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.json')) continue
    let data: CityGuideFile
    try {
      data = JSON.parse(readFileSync(join(dir, file), 'utf8')) as CityGuideFile
    } catch {
      continue
    }
    const places = data.guides?.parks?.places
    if (!places || places.length === 0) continue
    // Some legacy guide files omit top-level slug/name and use `city`; derive
    // the slug from the filename so every city with parks is included.
    const slug = data.slug ?? file.replace(/\.json$/, '')
    out.push({
      slug,
      name: data.name ?? data.city ?? slug,
      country: data.country ?? 'Other',
      flag: data.flag ?? '🌍',
      places,
      offLeashCount: places.filter((p) => p.offLeash === true).length,
    })
  }
  return out
}

interface CountryGroup {
  country: string
  flag: string
  cities: CityParks[]
  parkCount: number
}

function groupByCountry(cityParks: CityParks[]): CountryGroup[] {
  const map = new Map<string, CountryGroup>()
  for (const city of cityParks) {
    const existing = map.get(city.country)
    if (existing) {
      existing.cities.push(city)
      existing.parkCount += city.places.length
    } else {
      map.set(city.country, {
        country: city.country,
        flag: city.flag,
        cities: [city],
        parkCount: city.places.length,
      })
    }
  }
  const groups = Array.from(map.values())
  // Sort countries by number of parks desc, cities within by parks desc
  groups.sort((a, b) => b.parkCount - a.parkCount || a.country.localeCompare(b.country))
  for (const g of groups) {
    g.cities.sort((a, b) => b.places.length - a.places.length || a.name.localeCompare(b.name))
  }
  return groups
}

const ALL_CITY_PARKS = loadAllCityParks()
const COUNTRY_GROUPS = groupByCountry(ALL_CITY_PARKS)
const N_PARKS = ALL_CITY_PARKS.reduce((s, c) => s + c.places.length, 0)
const M_CITIES = ALL_CITY_PARKS.length
const COUNTRY_COUNT = COUNTRY_GROUPS.length
const OFF_LEASH_COUNT = ALL_CITY_PARKS.reduce((s, c) => s + c.offLeashCount, 0)

// Cities that have a near-parks hotel combo page (money page), so the bridge
// link never points at a noindex/404 route. Cities without it fall back to the
// city destination page, which always exists.
const NEAR_PARKS_CITIES = new Set(
  hotels.filter((h) => h.categories.includes('near-parks')).map((h) => h.destinationSlug)
)

// Top cities by park count, reused in the FAQ answer.
const TOP_CITIES = [...ALL_CITY_PARKS]
  .sort((a, b) => b.places.length - a.places.length)
  .slice(0, 3)

// ─── Localized park name ──────────────────────────────────────────────────────

function localizeParkName(place: ParksPlace, locale: string): string {
  if (locale === 'fr' && place.nameFr) return place.nameFr
  if (locale === 'es' && place.nameEs) return place.nameEs
  if (locale === 'pt' && place.namePt) return place.namePt
  return place.name
}

// ─── Copy ─────────────────────────────────────────────────────────────────────

interface Copy {
  h1: string
  subtitle: (n: number, m: number, c: number) => string
  intro: string
  helperTitle: string
  helperItems: string[]
  directoryTitle: string
  cityParksLink: (city: string) => string
  hotelsBridge: (city: string) => string
  offLeashBadge: string
  parkCountLabel: (n: number) => string
  cityCountLabel: (n: number) => string
  moreLink: string
  crossTitle: string
  crossGuide: string
  crossGuideDesc: string
  crossDest: string
  crossDestDesc: string
  faqTitle: string
  faqs: { q: string; a: string }[]
}

const COPY: Record<string, Copy> = {
  en: {
    h1: 'Off-Leash & Fenced Dog Parks',
    subtitle: (n, m, c) => `${n} verified dog parks across ${m} cities in ${c} countries`,
    intro: `This is a real directory of off-leash, fenced and enclosed dog parks where dogs are allowed, each one checked at the source with its off-leash zone and local rules. If you are looking for a dog park near you, the fastest path is to pick your city below: you will see the parks we verified there, whether they have an off-leash area, and how to get the full rules. Every entry is a genuine park, never invented, so you can head out knowing dogs are welcome.`,
    helperTitle: 'How to find a fenced or off-leash dog park near you',
    helperItems: [
      'Pick your city in the directory below to see the parks verified in that location.',
      'Check the off-leash badge: parks marked off-leash have a zone where dogs can run free.',
      'Open the city page to confirm the exact rules, opening hours and map for each park.',
      'Some parks only allow enclosed or leashed access, so read the note before you go.',
    ],
    directoryTitle: 'Dog parks by country and city',
    cityParksLink: (city) => `Dog parks in ${city}`,
    hotelsBridge: (city) => `Pet-friendly hotels near parks in ${city}`,
    offLeashBadge: 'off-leash',
    parkCountLabel: (n) => `${n} ${n === 1 ? 'park' : 'parks'}`,
    cityCountLabel: (n) => `${n} ${n === 1 ? 'city' : 'cities'}`,
    moreLink: 'See all',
    crossTitle: 'Keep exploring',
    crossGuide: 'The fenced dog parks of Europe',
    crossGuideDesc: 'Our editorial guide to the best enclosed, off-leash parks across Europe.',
    crossDest: 'Browse all destinations',
    crossDestDesc: 'Pet-friendly hotels, guides and dog parks city by city.',
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'How do I find a fenced dog park near me?',
        a: `Pick your city in the directory above. We list ${N_PARKS} verified dog parks across ${M_CITIES} cities, showing which have a fenced or off-leash zone. Open the city page to see each park's exact location, rules and map so you can reach the closest one.`,
      },
      {
        q: 'What is an off-leash dog park?',
        a: `An off-leash dog park is a designated space, often fenced or enclosed, where dogs are allowed to run and play without a leash. Of the parks in this directory, ${OFF_LEASH_COUNT} have a verified off-leash area, marked with an off-leash badge.`,
      },
      {
        q: 'Are dog parks free to enter?',
        a: 'Most public dog parks are free to enter. A few enclosed or privately run parks may charge a small fee or ask for membership. We note access details on each city page, so check there before you visit.',
      },
      {
        q: 'Do I need to keep my dog on a leash in a dog park?',
        a: 'It depends on the park. Off-leash parks have a zone where your dog can run free, while other parks (or areas outside the off-leash zone) require a leash. Some enclosed parks allow off-leash only inside the fence. Always read the rules note on the city page first.',
      },
      {
        q: 'Which cities have the most dog parks?',
        a: `In this directory, the cities with the most verified dog parks are ${TOP_CITIES.map((c) => c.name).join(', ')}. In total we cover ${M_CITIES} cities across ${COUNTRY_COUNT} countries.`,
      },
      {
        q: 'Can I book a pet-friendly hotel near a dog park?',
        a: 'Yes. Every city in the directory links to pet-friendly hotels near its parks, so you can plan a walk and a place to stay in the same spot. Pick your city, find a park, then check the hotels nearby.',
      },
    ],
  },
  fr: {
    h1: 'Parcs canins sans laisse & clôturés',
    subtitle: (n, m, c) => `${n} parcs canins vérifiés dans ${m} villes de ${c} pays`,
    intro: `Voici un vrai répertoire de parcs canins sans laisse, clôturés et fermés où les chiens sont admis, chacun vérifié à la source avec sa zone sans laisse et ses règles locales. Si vous cherchez un parc pour chien près de chez vous, le plus rapide est de choisir votre ville ci-dessous : vous verrez les parcs que nous y avons vérifiés, s'ils disposent d'une zone sans laisse et comment consulter le règlement complet. Chaque entrée est un parc réel, jamais inventé, pour partir en sachant que les chiens sont les bienvenus.`,
    helperTitle: 'Comment trouver un parc canin clôturé ou sans laisse près de chez vous',
    helperItems: [
      'Choisissez votre ville dans le répertoire ci-dessous pour voir les parcs vérifiés à cet endroit.',
      'Repérez le badge sans laisse : les parcs signalés disposent d\'une zone où le chien peut courir librement.',
      'Ouvrez la page de la ville pour confirmer les règles exactes, les horaires et la carte de chaque parc.',
      'Certains parcs n\'autorisent qu\'un accès clôturé ou en laisse : lisez la note avant d\'y aller.',
    ],
    directoryTitle: 'Parcs canins par pays et par ville',
    cityParksLink: (city) => `Parcs canins à ${city}`,
    hotelsBridge: (city) => `Hôtels acceptant les animaux près des parcs à ${city}`,
    offLeashBadge: 'sans laisse',
    parkCountLabel: (n) => `${n} ${n === 1 ? 'parc' : 'parcs'}`,
    cityCountLabel: (n) => `${n} ${n === 1 ? 'ville' : 'villes'}`,
    moreLink: 'Tout voir',
    crossTitle: 'Continuez l\'exploration',
    crossGuide: 'Les parcs canins clôturés d\'Europe',
    crossGuideDesc: 'Notre guide éditorial des meilleurs parcs fermés et sans laisse en Europe.',
    crossDest: 'Parcourir toutes les destinations',
    crossDestDesc: 'Hôtels acceptant les animaux, guides et parcs canins ville par ville.',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Comment trouver un parc canin clôturé près de chez moi ?',
        a: `Choisissez votre ville dans le répertoire ci-dessus. Nous recensons ${N_PARKS} parcs canins vérifiés dans ${M_CITIES} villes, en indiquant lesquels disposent d'une zone clôturée ou sans laisse. Ouvrez la page de la ville pour voir la localisation exacte, les règles et la carte de chaque parc et rejoindre le plus proche.`,
      },
      {
        q: 'Qu\'est-ce qu\'un parc canin sans laisse ?',
        a: `Un parc canin sans laisse est un espace dédié, souvent clôturé ou fermé, où les chiens peuvent courir et jouer sans laisse. Parmi les parcs de ce répertoire, ${OFF_LEASH_COUNT} disposent d'une zone sans laisse vérifiée, signalée par un badge sans laisse.`,
      },
      {
        q: 'L\'entrée des parcs canins est-elle gratuite ?',
        a: 'La plupart des parcs canins publics sont gratuits. Quelques parcs fermés ou privés peuvent demander une petite participation ou une adhésion. Les modalités d\'accès sont précisées sur chaque page de ville : vérifiez-les avant votre visite.',
      },
      {
        q: 'Dois-je garder mon chien en laisse dans un parc canin ?',
        a: 'Cela dépend du parc. Les parcs sans laisse ont une zone où le chien peut courir librement, tandis que d\'autres parcs (ou les abords de la zone sans laisse) imposent la laisse. Certains parcs fermés n\'autorisent le sans-laisse qu\'à l\'intérieur de la clôture. Lisez toujours la note de règles sur la page de la ville.',
      },
      {
        q: 'Quelles villes comptent le plus de parcs canins ?',
        a: `Dans ce répertoire, les villes qui comptent le plus de parcs canins vérifiés sont ${TOP_CITIES.map((c) => getLocalizedCityName(c.slug, c.name, 'fr')).join(', ')}. Au total, nous couvrons ${M_CITIES} villes dans ${COUNTRY_COUNT} pays.`,
      },
      {
        q: 'Puis-je réserver un hôtel acceptant les animaux près d\'un parc canin ?',
        a: 'Oui. Chaque ville du répertoire renvoie vers des hôtels acceptant les animaux près de ses parcs, pour organiser la balade et l\'hébergement au même endroit. Choisissez votre ville, trouvez un parc, puis regardez les hôtels à proximité.',
      },
    ],
  },
  es: {
    h1: 'Parques para perros sin correa y vallados',
    subtitle: (n, m, c) => `${n} parques para perros verificados en ${m} ciudades de ${c} países`,
    intro: `Este es un directorio real de parques para perros sin correa, vallados y cerrados donde se admiten perros, cada uno comprobado en origen con su zona sin correa y sus normas locales. Si buscas un parque para perros cerca de ti, lo más rápido es elegir tu ciudad más abajo: verás los parques que hemos verificado allí, si tienen zona sin correa y cómo consultar las normas completas. Cada entrada es un parque real, nunca inventado, para salir sabiendo que los perros son bienvenidos.`,
    helperTitle: 'Cómo encontrar un parque para perros vallado o sin correa cerca de ti',
    helperItems: [
      'Elige tu ciudad en el directorio de abajo para ver los parques verificados en ese lugar.',
      'Fíjate en la etiqueta sin correa: los parques marcados tienen una zona donde el perro puede correr libre.',
      'Abre la página de la ciudad para confirmar las normas exactas, los horarios y el mapa de cada parque.',
      'Algunos parques solo permiten el acceso vallado o con correa: lee la nota antes de ir.',
    ],
    directoryTitle: 'Parques para perros por país y ciudad',
    cityParksLink: (city) => `Parques para perros en ${city}`,
    hotelsBridge: (city) => `Hoteles que admiten mascotas cerca de los parques en ${city}`,
    offLeashBadge: 'sin correa',
    parkCountLabel: (n) => `${n} ${n === 1 ? 'parque' : 'parques'}`,
    cityCountLabel: (n) => `${n} ${n === 1 ? 'ciudad' : 'ciudades'}`,
    moreLink: 'Ver todo',
    crossTitle: 'Sigue explorando',
    crossGuide: 'Los parques para perros vallados de Europa',
    crossGuideDesc: 'Nuestra guía editorial de los mejores parques cerrados y sin correa de Europa.',
    crossDest: 'Explorar todos los destinos',
    crossDestDesc: 'Hoteles que admiten mascotas, guías y parques para perros ciudad a ciudad.',
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Cómo encuentro un parque para perros vallado cerca de mí?',
        a: `Elige tu ciudad en el directorio de arriba. Recopilamos ${N_PARKS} parques para perros verificados en ${M_CITIES} ciudades, indicando cuáles tienen zona vallada o sin correa. Abre la página de la ciudad para ver la ubicación exacta, las normas y el mapa de cada parque y llegar al más cercano.`,
      },
      {
        q: '¿Qué es un parque para perros sin correa?',
        a: `Un parque para perros sin correa es un espacio habilitado, a menudo vallado o cerrado, donde los perros pueden correr y jugar sin correa. De los parques de este directorio, ${OFF_LEASH_COUNT} tienen una zona sin correa verificada, señalada con una etiqueta sin correa.`,
      },
      {
        q: '¿La entrada a los parques para perros es gratuita?',
        a: 'La mayoría de los parques para perros públicos son gratuitos. Algunos parques cerrados o privados pueden cobrar una pequeña tarifa o pedir membresía. Indicamos los detalles de acceso en cada página de ciudad: compruébalos antes de visitarlos.',
      },
      {
        q: '¿Tengo que llevar a mi perro con correa en un parque para perros?',
        a: 'Depende del parque. Los parques sin correa tienen una zona donde el perro puede correr libre, mientras que otros parques (o las zonas fuera del área sin correa) exigen correa. Algunos parques cerrados solo permiten soltar al perro dentro del vallado. Lee siempre la nota de normas en la página de la ciudad.',
      },
      {
        q: '¿Qué ciudades tienen más parques para perros?',
        a: `En este directorio, las ciudades con más parques para perros verificados son ${TOP_CITIES.map((c) => getLocalizedCityName(c.slug, c.name, 'es')).join(', ')}. En total cubrimos ${M_CITIES} ciudades en ${COUNTRY_COUNT} países.`,
      },
      {
        q: '¿Puedo reservar un hotel que admita mascotas cerca de un parque para perros?',
        a: 'Sí. Cada ciudad del directorio enlaza con hoteles que admiten mascotas cerca de sus parques, para organizar el paseo y el alojamiento en el mismo sitio. Elige tu ciudad, encuentra un parque y mira los hoteles cercanos.',
      },
    ],
  },
  pt: {
    h1: 'Parques para cães sem trela e vedados',
    subtitle: (n, m, c) => `${n} parques para cães verificados em ${m} cidades de ${c} países`,
    intro: `Este é um diretório real de parques para cães sem trela, vedados e fechados onde os cães são permitidos, cada um confirmado na fonte com a sua zona sem trela e as regras locais. Se procura um parque para cães perto de si, o mais rápido é escolher a sua cidade em baixo: verá os parques que verificámos aí, se têm zona sem trela e como consultar o regulamento completo. Cada entrada é um parque real, nunca inventado, para sair sabendo que os cães são bem-vindos.`,
    helperTitle: 'Como encontrar um parque para cães vedado ou sem trela perto de si',
    helperItems: [
      'Escolha a sua cidade no diretório em baixo para ver os parques verificados nesse local.',
      'Repare na etiqueta sem trela: os parques assinalados têm uma zona onde o cão pode correr à solta.',
      'Abra a página da cidade para confirmar as regras exatas, os horários e o mapa de cada parque.',
      'Alguns parques só permitem acesso vedado ou com trela: leia a nota antes de ir.',
    ],
    directoryTitle: 'Parques para cães por país e cidade',
    cityParksLink: (city) => `Parques para cães em ${city}`,
    hotelsBridge: (city) => `Hotéis que aceitam animais perto dos parques em ${city}`,
    offLeashBadge: 'sem trela',
    parkCountLabel: (n) => `${n} ${n === 1 ? 'parque' : 'parques'}`,
    cityCountLabel: (n) => `${n} ${n === 1 ? 'cidade' : 'cidades'}`,
    moreLink: 'Ver tudo',
    crossTitle: 'Continue a explorar',
    crossGuide: 'Os parques para cães vedados da Europa',
    crossGuideDesc: 'O nosso guia editorial dos melhores parques fechados e sem trela da Europa.',
    crossDest: 'Explorar todos os destinos',
    crossDestDesc: 'Hotéis que aceitam animais, guias e parques para cães cidade a cidade.',
    faqTitle: 'Perguntas frequentes',
    faqs: [
      {
        q: 'Como encontro um parque para cães vedado perto de mim?',
        a: `Escolha a sua cidade no diretório acima. Reunimos ${N_PARKS} parques para cães verificados em ${M_CITIES} cidades, indicando quais têm zona vedada ou sem trela. Abra a página da cidade para ver a localização exata, as regras e o mapa de cada parque e chegar ao mais próximo.`,
      },
      {
        q: 'O que é um parque para cães sem trela?',
        a: `Um parque para cães sem trela é um espaço próprio, muitas vezes vedado ou fechado, onde os cães podem correr e brincar sem trela. Dos parques deste diretório, ${OFF_LEASH_COUNT} têm uma zona sem trela verificada, assinalada com uma etiqueta sem trela.`,
      },
      {
        q: 'A entrada nos parques para cães é gratuita?',
        a: 'A maioria dos parques para cães públicos é gratuita. Alguns parques fechados ou privados podem cobrar uma pequena taxa ou pedir inscrição. Indicamos os detalhes de acesso em cada página de cidade: confirme antes de visitar.',
      },
      {
        q: 'Tenho de manter o meu cão com trela num parque para cães?',
        a: 'Depende do parque. Os parques sem trela têm uma zona onde o cão pode correr à solta, enquanto outros parques (ou as zonas fora da área sem trela) exigem trela. Alguns parques fechados só permitem soltar o cão dentro da vedação. Leia sempre a nota de regras na página da cidade.',
      },
      {
        q: 'Que cidades têm mais parques para cães?',
        a: `Neste diretório, as cidades com mais parques para cães verificados são ${TOP_CITIES.map((c) => getLocalizedCityName(c.slug, c.name, 'pt')).join(', ')}. No total cobrimos ${M_CITIES} cidades em ${COUNTRY_COUNT} países.`,
      },
      {
        q: 'Posso reservar um hotel que aceita animais perto de um parque para cães?',
        a: 'Sim. Cada cidade do diretório liga a hotéis que aceitam animais perto dos seus parques, para organizar o passeio e a estadia no mesmo sítio. Escolha a sua cidade, encontre um parque e veja os hotéis por perto.',
      },
    ],
  },
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

const META: Record<string, { title: string; desc: string }> = {
  en: {
    title: `Off-Leash & Fenced Dog Parks: ${N_PARKS} verified in ${M_CITIES} cities`,
    desc: `${N_PARKS} real off-leash and fenced dog parks across ${M_CITIES} cities, with off-leash zones, rules and maps verified locally. Find an enclosed dog park where dogs are welcome, then book a pet-friendly hotel nearby.`,
  },
  fr: {
    title: `Parcs canins sans laisse & clôturés : ${N_PARKS} vérifiés dans ${M_CITIES} villes`,
    desc: `${N_PARKS} vrais parcs canins sans laisse et clôturés dans ${M_CITIES} villes, avec zones sans laisse, règles et cartes vérifiées sur place. Trouvez un parc canin fermé où les chiens sont admis, puis réservez un hôtel acceptant les animaux à proximité.`,
  },
  es: {
    title: `Parques para perros sin correa y vallados: ${N_PARKS} verificados en ${M_CITIES} ciudades`,
    desc: `${N_PARKS} parques para perros reales sin correa y vallados en ${M_CITIES} ciudades, con zonas sin correa, normas y mapas verificados en origen. Encuentra un parque para perros cerrado donde se admiten perros y reserva un hotel que admita mascotas cerca.`,
  },
  pt: {
    title: `Parques para cães sem trela e vedados: ${N_PARKS} verificados em ${M_CITIES} cidades`,
    desc: `${N_PARKS} parques para cães reais sem trela e vedados em ${M_CITIES} cidades, com zonas sem trela, regras e mapas verificados na fonte. Encontre um parque para cães fechado onde os cães são bem-vindos e reserve um hotel que aceita animais por perto.`,
  },
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const revalidate = 86400

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/dog-parks'>): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const m = META[locale as Locale] ?? META.en
  return {
    title: m.title,
    description: m.desc,
    alternates: {
      canonical: `${SITE_URL}/${locale}/dog-parks`,
      languages: {
        en: `${SITE_URL}/en/dog-parks`,
        fr: `${SITE_URL}/fr/dog-parks`,
        es: `${SITE_URL}/es/dog-parks`,
        pt: `${SITE_URL}/pt/dog-parks`,
        de: `${SITE_URL}/de/dog-parks`,
        nl: `${SITE_URL}/nl/dog-parks`,
        it: `${SITE_URL}/it/dog-parks`,
        'x-default': `${SITE_URL}/en/dog-parks`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.desc,
      url: `${SITE_URL}/${locale}/dog-parks`,
      siteName: 'HotelsWithPets.com',
      type: 'website',
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DogParksHubPage({
  params,
}: PageProps<'/[locale]/dog-parks'>) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  await getDictionary(locale as Locale) // keep locale dictionary warm / consistent
  const lang = locale as Locale
  const copy = COPY[lang] ?? COPY.en

  const parksLabel = lang === 'fr' ? 'parcs' : lang === 'es' ? 'parques' : lang === 'pt' ? 'parques' : 'parks'
  const citiesLabel = lang === 'fr' ? 'villes' : lang === 'es' ? 'ciudades' : lang === 'pt' ? 'cidades' : 'cities'
  const countriesLabel = lang === 'fr' ? 'pays' : lang === 'es' || lang === 'pt' ? 'países' : 'countries'
  const offLeashLabel = lang === 'fr' ? 'sans laisse' : lang === 'es' ? 'sin correa' : lang === 'pt' ? 'sem trela' : 'off-leash'

  // Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: copy.h1, item: `${SITE_URL}/${locale}/dog-parks` },
    ],
  }

  // ItemList of parks (capped for page weight), each pointing at its city parks page.
  const itemListElements: object[] = []
  let position = 0
  for (const city of ALL_CITY_PARKS) {
    for (const place of city.places) {
      position += 1
      itemListElements.push({
        '@type': 'ListItem',
        position,
        name: `${localizeParkName(place, lang)}, ${getLocalizedCityName(city.slug, city.name, locale)}`,
        url: `${SITE_URL}/${locale}/destinations/${city.slug}/parks`,
      })
      if (position >= 100) break
    }
    if (position >= 100) break
  }

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: copy.h1,
    description: (META[lang] ?? META.en).desc,
    url: `${SITE_URL}/${locale}/dog-parks`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: N_PARKS,
      itemListElement: itemListElements,
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: copy.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-700 via-green-800 to-teal-900 text-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4">
              <span className="text-5xl sm:text-6xl flex-shrink-0">🌳</span>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-3">{copy.h1}</h1>
                <p className="text-emerald-100 text-lg mb-6">{copy.subtitle(N_PARKS, M_CITIES, COUNTRY_COUNT)}</p>
                <div className="flex flex-wrap gap-2.5">
                  <span className="bg-white/10 rounded-full px-4 py-1.5 text-sm">🐾 {N_PARKS} {parksLabel}</span>
                  <span className="bg-white/10 rounded-full px-4 py-1.5 text-sm">🗺️ {M_CITIES} {citiesLabel}</span>
                  <span className="bg-white/10 rounded-full px-4 py-1.5 text-sm">🌍 {COUNTRY_COUNT} {countriesLabel}</span>
                  <span className="bg-white/10 rounded-full px-4 py-1.5 text-sm">✓ {OFF_LEASH_COUNT} {offLeashLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intro + helper */}
        <section className="bg-white border-b border-gray-100 py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-gray-700 leading-relaxed">{copy.intro}</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
              <h2 className="text-lg font-extrabold text-gray-900 mb-4">{copy.helperTitle}</h2>
              <ul className="space-y-3">
                {copy.helperItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Directory */}
        <section className="py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8">{copy.directoryTitle}</h2>
            <div className="space-y-12">
              {COUNTRY_GROUPS.map((group) => (
                <div key={group.country}>
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                    <span className="text-3xl">{group.flag}</span>
                    <h3 className="text-xl font-extrabold text-gray-900">{getLocalizedCountryName(group.country, locale)}</h3>
                    <span className="text-sm text-gray-500">
                      {copy.cityCountLabel(group.cities.length)} · {copy.parkCountLabel(group.parkCount)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {group.cities.map((city) => {
                      const cityName = getLocalizedCityName(city.slug, city.name, locale)
                      const topParks = city.places.slice(0, 3)
                      const bridgeHref = NEAR_PARKS_CITIES.has(city.slug)
                        ? `/${locale}/${city.slug}/near-parks`
                        : `/${locale}/destinations/${city.slug}`
                      return (
                        <div key={city.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                          <div className="flex items-baseline justify-between gap-2 mb-3">
                            <h4 className="font-bold text-gray-900 text-lg">{cityName}</h4>
                            <span className="text-xs text-gray-500 flex-shrink-0">{copy.parkCountLabel(city.places.length)}</span>
                          </div>
                          <ul className="space-y-1.5 mb-4">
                            {topParks.map((place, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                <span className="text-emerald-500">🌳</span>
                                <span>{localizeParkName(place, lang)}</span>
                                {place.offLeash === true && (
                                  <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded uppercase tracking-wide">{copy.offLeashBadge}</span>
                                )}
                              </li>
                            ))}
                            {city.places.length > 3 && (
                              <li className="text-xs text-gray-400 pl-6">+{city.places.length - 3}</li>
                            )}
                          </ul>
                          <div className="flex flex-col gap-1.5 pt-3 border-t border-gray-50">
                            <Link
                              href={`/${locale}/destinations/${city.slug}/parks`}
                              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
                            >
                              → {copy.cityParksLink(cityName)}
                            </Link>
                            <Link
                              href={bridgeHref}
                              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                            >
                              🏨 {copy.hotelsBridge(cityName)}
                            </Link>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-14 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{copy.crossTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href={`/${locale}/guides/fenced-dog-parks-europe`}
                className="block bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-2xl p-6 hover:opacity-95 transition-opacity"
              >
                <span className="text-3xl block mb-2">🌳</span>
                <span className="font-bold text-lg block mb-1">{copy.crossGuide}</span>
                <span className="text-white/80 text-sm">{copy.crossGuideDesc}</span>
              </Link>
              <Link
                href={`/${locale}/destinations`}
                className="block bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl p-6 hover:opacity-95 transition-opacity"
              >
                <span className="text-3xl block mb-2">🗺️</span>
                <span className="font-bold text-lg block mb-1">{copy.crossDest}</span>
                <span className="text-white/80 text-sm">{copy.crossDestDesc}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8">{copy.faqTitle}</h2>
            <div className="space-y-4">
              {copy.faqs.map((faq, i) => (
                <details key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm group">
                  <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{faq.q}</span>
                    <span aria-hidden="true" className="text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                  </summary>
                  <div className="px-6 pb-5 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
