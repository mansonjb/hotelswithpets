import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'cool-summer-with-dog'
const CAMPAIGN_BASE = 'cool-summer'

const STICKY_LABELS: Record<string, { label: string; cta: string }> = {
  en: { label: 'Cool-summer pet-friendly destinations', cta: 'See hotels' },
  fr: { label: `Destinations pet-friendly fraîches en été`, cta: 'Voir les hôtels' },
  es: { label: 'Destinos pet-friendly frescos en verano', cta: 'Ver hoteles' },
  pt: { label: 'Destinos pet-friendly frescos no verão', cta: 'Ver hotéis' },
}

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
    en: `Travel with Your Dog at Under 25°C in July: 8 Cool European Destinations (2026) | HotelsWithPets.com`,
    fr: `Voyager avec son chien à moins de 25°C en juillet : 8 destinations européennes fraîches (2026) | HotelsWithPets.com`,
    es: `Viajar con tu perro a menos de 25°C en julio: 8 destinos europeos frescos (2026) | HotelsWithPets.com`,
    pt: `Viajar com o seu cão a menos de 25°C em julho: 8 destinos europeus frescos (2026) | HotelsWithPets.com`,
  }
  const descriptions: Record<string, string> = {
    en: `Eight European destinations where July temperatures stay under 25°C - the safe zone for brachycephalic breeds (bulldogs, pugs, boxers) and senior dogs. Reykjavík, Bergen, Stockholm and others, with verified pet-friendly hotels.`,
    fr: `Huit destinations européennes où la température de juillet reste sous 25°C - la zone sûre pour les races brachycéphales (bouledogues, carlins, boxers) et les chiens âgés. Reykjavík, Bergen, Stockholm et d'autres, avec hôtels pet-friendly vérifiés.`,
    es: `Ocho destinos europeos donde la temperatura de julio se mantiene bajo 25°C - la zona segura para razas braquicéfalas (bulldogs, carlinos, bóxer) y perros mayores. Reikiavik, Bergen, Estocolmo y otros, con hoteles pet-friendly verificados.`,
    pt: `Oito destinos europeus onde a temperatura de julho se mantém abaixo de 25°C - a zona segura para raças braquicefálicas (bulldogs, carlins, boxers) e cães idosos. Reiquiavique, Bergen, Estocolmo e outros, com hotéis pet-friendly verificados.`,
  }
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/${SLUG}`,
      languages: {
        en: `${SITE_URL}/en/guides/${SLUG}`,
        fr: `${SITE_URL}/fr/guides/${SLUG}`,
        es: `${SITE_URL}/es/guides/${SLUG}`,
        pt: `${SITE_URL}/pt/guides/${SLUG}`,
        'x-default': `${SITE_URL}/en/guides/${SLUG}`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      type: 'article',
      url: `${SITE_URL}/${locale}/guides/${SLUG}`,
      siteName: 'HotelsWithPets.com',
    },
  }
}

type Pick = {
  slug: string
  name: string
  country: string
  destPath: string
  julyTemp: string
  whyEn: string
  whyFr: string
  whyEs: string
  whyPt: string
  hotelName: string
  hotelEn: string
  hotelFr: string
  hotelEs: string
  hotelPt: string
}

const PICKS: Pick[] = [
  {
    slug: 'reykjavik',
    name: 'Reykjavík',
    country: 'Iceland',
    destPath: '/destinations/reykjavik',
    julyTemp: '13°C',
    whyEn: `The coolest July capital in Europe. Endless 21-hour daylight for early-morning or late-evening walks, the Tjörnin lake walks and Heiðmörk reserve trails accept leashed dogs year-round, and there is genuinely zero heat-stress risk for any breed. The only downside is the import paperwork: dogs from EU need an Animal Health Certificate via the Icelandic vet authority MAST, plan 3-4 weeks ahead.`,
    whyFr: `La capitale la plus fraîche d'Europe en juillet. 21h de jour pour les balades très matinales ou très tardives, les sentiers du Tjörnin et de la réserve Heiðmörk accueillent les chiens en laisse toute l'année, et zéro risque de stress thermique pour n'importe quelle race. Seul bémol : la paperasse import. Les chiens venant de l'UE ont besoin d'un Animal Health Certificate via l'autorité vétérinaire islandaise MAST, à prévoir 3-4 semaines à l'avance.`,
    whyEs: `La capital más fresca de Europa en julio. 21 h de luz para paseos muy matinales o muy tardíos, los senderos de Tjörnin y de la reserva Heiðmörk admiten perros con correa todo el año, y cero riesgo de estrés térmico para cualquier raza. Único contra: papeleo de importación. Los perros de la UE necesitan un Animal Health Certificate vía la autoridad veterinaria islandesa MAST, prever 3-4 semanas antes.`,
    whyPt: `A capital mais fresca da Europa em julho. 21 h de luz para passeios muito matinais ou muito tardios, os trilhos do Tjörnin e da reserva Heiðmörk aceitam cães à trela todo o ano, e zero risco de stress térmico para qualquer raça. Único senão: a papelada de importação. Cães vindos da UE precisam de um Animal Health Certificate via a autoridade veterinária islandesa MAST, planear 3-4 semanas antes.`,
    hotelName: 'Hotel Reykjavik Centrum',
    hotelEn: `Hotel Reykjavik Centrum - boutique 4-star in the oldest restored building of central Reykjavík. Pets welcomed on request, 2-min walk to the Tjörnin lake walk, the lobby tolerates a quiet leashed dog while you have a coffee.`,
    hotelFr: `Hotel Reykjavik Centrum - boutique 4 étoiles dans le plus vieux bâtiment restauré du centre. Chiens acceptés sur demande, 2 min à pied du Tjörnin, le lobby accueille un chien en laisse calme pendant un café.`,
    hotelEs: `Hotel Reykjavik Centrum - boutique 4 estrellas en el edificio restaurado más antiguo del centro. Perros admitidos a petición, 2 min andando al Tjörnin, el lobby tolera un perro con correa tranquilo durante un café.`,
    hotelPt: `Hotel Reykjavik Centrum - boutique 4 estrelas no edifício restaurado mais antigo do centro. Cães aceites a pedido, 2 min a pé do Tjörnin, o lobby tolera um cão à trela calmo durante um café.`,
  },
  {
    slug: 'bergen',
    name: 'Bergen',
    country: 'Norway',
    destPath: '/destinations/bergen',
    julyTemp: '16°C',
    whyEn: `Fjord-side Norway at its cool best. The Fløyen funicular accepts leashed dogs (45 NOK), the seven mountains around the city offer hundreds of km of cool forest trails, and the Bryggen UNESCO wharf is a flat walking route along the harbour. Pack waterproof: Bergen averages 12 rainy days even in July, but it stays under 20°C and your short-snouted dog will thank you.`,
    whyFr: `La Norvège des fjords au plus frais. Le funiculaire Fløyen accepte les chiens en laisse (45 NOK), les sept montagnes autour de la ville offrent des centaines de km de sentiers forestiers frais, et le quai Bryggen UNESCO est plat le long du port. Prévoyez imperméable : Bergen a 12 jours de pluie même en juillet, mais reste sous 20°C et votre chien à museau court vous remerciera.`,
    whyEs: `La Noruega de los fiordos en su mejor versión fresca. El funicular Fløyen admite perros con correa (45 NOK), las siete montañas alrededor ofrecen cientos de km de senderos forestales frescos, y el muelle Bryggen UNESCO es llano por el puerto. Lleva impermeable: Bergen tiene 12 días de lluvia incluso en julio, pero se mantiene bajo 20°C y tu perro de hocico corto te lo agradecerá.`,
    whyPt: `A Noruega dos fiordes no seu auge fresco. O funicular Fløyen aceita cães à trela (45 NOK), as sete montanhas à volta oferecem centenas de km de trilhos florestais frescos, e o cais Bryggen UNESCO é plano ao longo do porto. Leve impermeável: Bergen tem 12 dias de chuva mesmo em julho, mas mantém-se abaixo dos 20°C e o seu cão de focinho curto vai agradecer.`,
    hotelName: 'Det Hanseatiske Hotel',
    hotelEn: `Det Hanseatiske Hotel - boutique 4-star inside an actual 18th-century Hanseatic merchant house on the Bryggen wharf. Pets welcomed at modest fee, original wood-beam rooms, your dog literally sleeps inside UNESCO heritage.`,
    hotelFr: `Det Hanseatiske Hotel - boutique 4 étoiles dans une vraie maison de marchand hanséatique du XVIIIᵉ sur le quai Bryggen. Chiens acceptés (supplément modéré), chambres à poutres d'origine, votre chien dort littéralement dans le patrimoine UNESCO.`,
    hotelEs: `Det Hanseatiske Hotel - boutique 4 estrellas en una auténtica casa de mercader hanseático del siglo XVIII en el muelle Bryggen. Perros admitidos (suplemento moderado), habitaciones con vigas originales, tu perro duerme literalmente dentro del patrimonio UNESCO.`,
    hotelPt: `Det Hanseatiske Hotel - boutique 4 estrelas numa autêntica casa de mercador hanseático do século XVIII no cais Bryggen. Cães aceites (taxa moderada), quartos com vigas originais, o seu cão dorme literalmente dentro do património UNESCO.`,
  },
  {
    slug: 'stockholm',
    name: 'Stockholm',
    country: 'Sweden',
    destPath: '/destinations/stockholm',
    julyTemp: '20°C',
    whyEn: `Just below the safe-zone threshold and one of the most dog-tolerant cities in Europe. Djurgården island is dog-walk paradise (12 km of paths), the archipelago ferries (Waxholmsbolaget) accept leashed dogs free, and Swedish hotels routinely include the dog at no extra charge. Sweden's pet supplement average is the EU's lowest (€9, often free).`,
    whyFr: `Juste sous le seuil de sécurité et l'une des villes les plus tolérantes aux chiens d'Europe. L'île de Djurgården est un paradis canin (12 km de sentiers), les ferries de l'archipel (Waxholmsbolaget) acceptent les chiens en laisse gratuits, et les hôtels suédois acceptent souvent le chien sans supplément. La moyenne du supplément animal en Suède est la plus basse d'Europe (9 €, souvent gratuit).`,
    whyEs: `Justo bajo el umbral seguro y una de las ciudades más tolerantes con perros de Europa. La isla de Djurgården es un paraíso canino (12 km de senderos), los ferris del archipiélago (Waxholmsbolaget) admiten perros con correa gratis, y los hoteles suecos suelen aceptar al perro sin coste extra. La media del suplemento canino en Suecia es la más baja de la UE (9 €, a menudo gratis).`,
    whyPt: `Mesmo abaixo do limite seguro e uma das cidades mais tolerantes com cães da Europa. A ilha de Djurgården é um paraíso canino (12 km de trilhos), os ferries do arquipélago (Waxholmsbolaget) aceitam cães à trela gratuitamente, e os hotéis suecos costumam aceitar o cão sem custo extra. A média da taxa canina na Suécia é a mais baixa da UE (9 €, frequentemente gratuita).`,
    hotelName: 'Hotel Skeppsholmen',
    hotelEn: `Hotel Skeppsholmen - boutique 4-star in the former Royal Navy barracks on Skeppsholmen island, 8-min walk to Gamla Stan. Pets welcomed free of charge, garden patio for the dog while you have breakfast.`,
    hotelFr: `Hotel Skeppsholmen - boutique 4 étoiles dans les anciens quartiers de la Marine royale sur l'île de Skeppsholmen, 8 min à pied de Gamla Stan. Chiens acceptés gratuitement, patio jardin pour le chien pendant le petit-déjeuner.`,
    hotelEs: `Hotel Skeppsholmen - boutique 4 estrellas en los antiguos cuarteles de la Marina Real en la isla de Skeppsholmen, 8 min andando a Gamla Stan. Perros admitidos gratuitamente, patio jardín para el perro durante el desayuno.`,
    hotelPt: `Hotel Skeppsholmen - boutique 4 estrelas nos antigos quartéis da Marinha Real na ilha de Skeppsholmen, 8 min a pé de Gamla Stan. Cães aceites gratuitamente, pátio jardim para o cão durante o pequeno-almoço.`,
  },
  {
    slug: 'helsinki',
    name: 'Helsinki',
    country: 'Finland',
    destPath: '/destinations/helsinki',
    julyTemp: '20°C',
    whyEn: `Finland has 80+ municipal koira-aitaus (fenced off-leash zones) and Helsinki alone has dozens. White-night July evenings mean walks past 23:00 are comfortable, the Suomenlinna island ferry accepts leashed dogs free, and the city's overall culture treats well-behaved dogs as full passengers (free on public transport with a leash).`,
    whyFr: `La Finlande a 80+ koira-aitaus municipaux (zones sans laisse clôturées) et Helsinki en a des dizaines. Les soirées de nuit blanche en juillet rendent les balades après 23h confortables, le ferry pour Suomenlinna accepte les chiens en laisse gratuits, et la culture finlandaise traite les chiens sages comme des passagers à part entière (gratuits en transport public avec laisse).`,
    whyEs: `Finlandia tiene 80+ koira-aitaus municipales (zonas sin correa valladas) y Helsinki tiene decenas. Las tardes de noche blanca en julio hacen los paseos cómodos después de las 23h, el ferri a Suomenlinna admite perros con correa gratis, y la cultura finlandesa trata a los perros tranquilos como pasajeros normales (gratis en transporte público con correa).`,
    whyPt: `A Finlândia tem 80+ koira-aitaus municipais (zonas sem trela vedadas) e Helsínquia tem dezenas. As tardes de noite branca em julho tornam confortáveis passeios após as 23h, o ferry para Suomenlinna aceita cães à trela gratuitamente, e a cultura finlandesa trata cães calmos como passageiros plenos (gratuitos em transporte público com trela).`,
    hotelName: 'Hotel Klaus K',
    hotelEn: `Hotel Klaus K - design 4-star in the city centre 4-min walk to Esplanadi park. Pets welcomed at modest fee, Kalevala-themed rooms, the bar terrace overlooks the Old Church Park dog-walking zone.`,
    hotelFr: `Hotel Klaus K - 4 étoiles design en centre-ville, 4 min à pied du parc Esplanadi. Chiens acceptés (supplément modéré), chambres thème Kalevala, la terrasse du bar domine la zone canine du parc de la Vieille Église.`,
    hotelEs: `Hotel Klaus K - 4 estrellas de diseño en el centro, 4 min andando al parque Esplanadi. Perros admitidos (suplemento moderado), habitaciones tema Kalevala, la terraza del bar domina la zona canina del parque de la Iglesia Vieja.`,
    hotelPt: `Hotel Klaus K - 4 estrelas de design no centro, 4 min a pé do parque Esplanadi. Cães aceites (taxa moderada), quartos com tema Kalevala, a esplanada do bar domina a zona canina do parque da Velha Igreja.`,
  },
  {
    slug: 'tallinn',
    name: 'Tallinn',
    country: 'Estonia',
    destPath: '/destinations/tallinn',
    julyTemp: '20°C',
    whyEn: `The medieval old town walkable in 30 minutes, Pirita beach with its dedicated dog zone, Kadriorg Park as a 70-hectare leashed-dog playground, and trams that accept leashed dogs free. Baltic Sea breeze keeps temperatures consistently under 22°C even on the hottest week. Budget-friendly: half the prices of Stockholm or Helsinki for the same comfort.`,
    whyFr: `La vieille ville médiévale en 30 minutes à pied, la plage de Pirita avec sa zone canine dédiée, le Parc Kadriorg comme terrain de jeu de 70 hectares pour chien en laisse, et des trams qui acceptent les chiens en laisse gratuits. La brise de la Baltique maintient les températures sous 22°C même les semaines les plus chaudes. Budget : moitié des prix de Stockholm ou Helsinki pour le même confort.`,
    whyEs: `El casco medieval en 30 minutos a pie, la playa de Pirita con su zona canina dedicada, el Parque Kadriorg como un parque de juegos de 70 hectáreas para perro con correa, y tranvías que admiten perros con correa gratis. La brisa del Báltico mantiene las temperaturas bajo 22°C incluso en las semanas más calurosas. Económico: mitad de precios que Estocolmo o Helsinki por el mismo confort.`,
    whyPt: `A cidade velha medieval em 30 minutos a pé, a praia de Pirita com a sua zona canina dedicada, o Parque Kadriorg como um parque de 70 hectares para cão à trela, e elétricos que aceitam cães à trela gratuitamente. A brisa do Báltico mantém as temperaturas abaixo dos 22°C mesmo nas semanas mais quentes. Económico: metade dos preços de Estocolmo ou Helsínquia pelo mesmo conforto.`,
    hotelName: 'Hotel Telegraaf, Autograph Collection',
    hotelEn: `Hotel Telegraaf - 5-star Autograph Collection in the historic former telegraph building of the Old Town. Pets up to 10 kg welcomed, spa garden, the courtyard is a calm place to decompress with a tired dog.`,
    hotelFr: `Hotel Telegraaf - 5 étoiles Autograph Collection dans l'ancien bâtiment du télégraphe de la vieille ville. Chiens jusqu'à 10 kg acceptés, jardin spa, la cour intérieure est parfaite pour décompresser avec un chien fatigué.`,
    hotelEs: `Hotel Telegraaf - 5 estrellas Autograph Collection en el antiguo edificio del telégrafo del casco antiguo. Perros hasta 10 kg admitidos, jardín spa, el patio interior es perfecto para descomprimir con un perro cansado.`,
    hotelPt: `Hotel Telegraaf - 5 estrelas Autograph Collection no antigo edifício do telégrafo da cidade velha. Cães até 10 kg aceites, jardim spa, o pátio interior é perfeito para descomprimir com um cão cansado.`,
  },
  {
    slug: 'edinburgh',
    name: 'Edinburgh',
    country: 'United Kingdom',
    destPath: '/destinations/edinburgh',
    julyTemp: '19°C',
    whyEn: `Scotland's capital with Arthur's Seat (a 251-metre volcano in the city you can climb with a leashed dog in 45 min), Holyrood Park, Princes Street Gardens, and one of Europe's most consistently dog-tolerant pub cultures. Post-Brexit paperwork: EU dogs need an Animal Health Certificate from a vet within 10 days, but the AHC is still easier than the old pet passport for many small clinics.`,
    whyFr: `La capitale écossaise avec Arthur's Seat (un volcan de 251 m en ville que vous escaladez avec votre chien en laisse en 45 min), Holyrood Park, Princes Street Gardens, et l'une des cultures pub les plus tolérantes aux chiens d'Europe. Paperasse post-Brexit : les chiens UE ont besoin d'un Animal Health Certificate vétérinaire dans les 10 jours, mais l'AHC reste plus simple que l'ancien passeport pour beaucoup de petites cliniques.`,
    whyEs: `La capital escocesa con Arthur's Seat (un volcán de 251 m en la ciudad que escalas con tu perro con correa en 45 min), Holyrood Park, Princes Street Gardens, y una de las culturas de pub más tolerantes con perros de Europa. Papeleo post-Brexit: perros UE necesitan un Animal Health Certificate veterinario en los 10 días, pero el AHC sigue siendo más simple que el antiguo pasaporte para muchas clínicas pequeñas.`,
    whyPt: `A capital escocesa com Arthur's Seat (um vulcão de 251 m na cidade que se sobe com cão à trela em 45 min), Holyrood Park, Princes Street Gardens, e uma das culturas de pub mais tolerantes com cães da Europa. Papelada pós-Brexit: cães UE precisam de um Animal Health Certificate veterinário nos 10 dias, mas o AHC continua mais simples que o antigo passaporte para muitas clínicas pequenas.`,
    hotelName: 'The Balmoral',
    hotelEn: `The Balmoral - 5-star landmark on Princes Street with its iconic clock tower. Pets up to 12 kg welcomed (mid fee), dog bed and bowl provided, the entrance opens directly onto Princes Street Gardens for an easy morning walk.`,
    hotelFr: `The Balmoral - 5 étoiles emblématique sur Princes Street avec sa tour de l'horloge. Chiens jusqu'à 12 kg acceptés (supplément modéré), couchage et gamelle fournis, l'entrée donne directement sur Princes Street Gardens pour une promenade matinale facile.`,
    hotelEs: `The Balmoral - 5 estrellas icónico en Princes Street con su torre del reloj. Perros hasta 12 kg admitidos (suplemento moderado), cama y comedero, la entrada da directamente a Princes Street Gardens para un paseo matinal fácil.`,
    hotelPt: `The Balmoral - 5 estrelas icónico na Princes Street com a sua torre do relógio. Cães até 12 kg aceites (taxa moderada), cama e tigela, a entrada dá diretamente para os Princes Street Gardens para um passeio matinal fácil.`,
  },
  {
    slug: 'galway',
    name: 'Galway',
    country: 'Ireland',
    destPath: '/destinations/galway',
    julyTemp: '17°C',
    whyEn: `Atlantic Ireland with no border paperwork from the EU, ferry from Cherbourg or Roscoff direct. Salthill promenade is a 2 km flat seafront walk, the Cliffs of Moher are 1 h south for the dramatic day trip (leashed dogs welcome on the official trail), and the Connemara hills cool the Atlantic air below 18°C even on the warmest July week.`,
    whyFr: `L'Irlande atlantique sans paperasse depuis l'UE, ferry depuis Cherbourg ou Roscoff direct. La promenade Salthill est un front de mer plat de 2 km, les Falaises de Moher à 1h au sud pour le day trip spectaculaire (chiens en laisse sur le sentier officiel), et les collines du Connemara rafraîchissent l'air atlantique sous 18°C même la semaine la plus chaude de juillet.`,
    whyEs: `La Irlanda atlántica sin papeleo desde la UE, ferri desde Cherburgo o Roscoff directo. El paseo Salthill es un frente marítimo llano de 2 km, los Acantilados de Moher a 1 h al sur para la excursión espectacular (perros con correa en el sendero oficial), y las colinas de Connemara enfrían el aire atlántico bajo 18°C incluso la semana más calurosa de julio.`,
    whyPt: `A Irlanda atlântica sem papelada vinda da UE, ferry de Cherbourg ou Roscoff direto. O passeio Salthill é uma frente-mar plana de 2 km, as Falésias de Moher a 1 h a sul para a excursão espectacular (cães à trela no trilho oficial), e as colinas de Connemara arrefecem o ar atlântico abaixo de 18°C mesmo na semana mais quente de julho.`,
    hotelName: 'The g Hotel & Spa',
    hotelEn: `The g Hotel & Spa - boutique 5-star designed by Philip Treacy on the edge of Galway, by Lough Atalia. Pets welcomed at modest fee, dog beds on request, the lakeside lawn is a perfect quiet walking spot.`,
    hotelFr: `The g Hotel & Spa - boutique 5 étoiles dessiné par Philip Treacy en lisière de Galway, près du Lough Atalia. Chiens acceptés (supplément modéré), couchage sur demande, la pelouse au bord du lac est parfaite pour une balade calme.`,
    hotelEs: `The g Hotel & Spa - boutique 5 estrellas diseñado por Philip Treacy en el borde de Galway, junto al Lough Atalia. Perros admitidos (suplemento moderado), cama a petición, el césped junto al lago es perfecto para un paseo tranquilo.`,
    hotelPt: `The g Hotel & Spa - boutique 5 estrelas desenhado por Philip Treacy à beira de Galway, junto ao Lough Atalia. Cães aceites (taxa moderada), cama a pedido, o relvado à beira do lago é perfeito para um passeio calmo.`,
  },
  {
    slug: 'bern',
    name: 'Bern',
    country: 'Switzerland',
    destPath: '/destinations/bern',
    julyTemp: '22°C',
    whyEn: `The compromise pick for Central Europeans who do not want to fly to Scandinavia. UNESCO old town, the Aare river riverside walk (one of Europe's most beautiful river swims for dogs in the Marzili area), and the foothills of the Berner Oberland 1 h south at any altitude you want. Swiss public transport accepts leashed dogs at half-fare; the Junior Day Pass for kids works for dogs too at 16 CHF.`,
    whyFr: `Le pick compromis pour les Européens centraux qui ne veulent pas s'envoler en Scandinavie. Vieille ville UNESCO, promenade au bord de l'Aar (l'une des plus belles baignades de rivière pour chien en Europe dans le secteur Marzili), et les contreforts du Berner Oberland à 1h au sud à l'altitude que vous voulez. Les transports suisses acceptent les chiens en laisse à demi-tarif ; le Junior Day Pass marche aussi pour les chiens à 16 CHF.`,
    whyEs: `La elección de compromiso para europeos centrales que no quieren volar a Escandinavia. Casco antiguo UNESCO, paseo junto al Aar (uno de los baños de río más bonitos para perro en Europa en la zona Marzili), y las estribaciones del Berner Oberland a 1 h al sur a la altitud que quieras. El transporte suizo admite perros con correa a media tarifa; el Junior Day Pass funciona también para perros a 16 CHF.`,
    whyPt: `A escolha de compromisso para europeus centrais que não querem voar para a Escandinávia. Cidade velha UNESCO, passeio junto ao Aare (um dos banhos de rio mais bonitos para cão na Europa na zona Marzili), e as encostas do Berner Oberland a 1 h a sul à altitude que quiser. Os transportes suíços aceitam cães à trela a meio preço; o Junior Day Pass funciona também para cães a 16 CHF.`,
    hotelName: 'Hotel Schweizerhof Bern',
    hotelEn: `Hotel Schweizerhof Bern - 5-star opposite the central station, 5-min walk into the UNESCO old town. Pets welcomed at modest fee, dog bed and bowl, the rooftop bar tolerates a quiet leashed dog at sunset.`,
    hotelFr: `Hotel Schweizerhof Bern - 5 étoiles face à la gare centrale, 5 min à pied dans la vieille ville UNESCO. Chiens acceptés (supplément modéré), couchage et gamelle, le bar rooftop tolère un chien en laisse calme au coucher.`,
    hotelEs: `Hotel Schweizerhof Bern - 5 estrellas frente a la estación central, 5 min andando al casco antiguo UNESCO. Perros admitidos (suplemento moderado), cama y comedero, el bar de la azotea tolera un perro con correa tranquilo al atardecer.`,
    hotelPt: `Hotel Schweizerhof Bern - 5 estrelas em frente à estação central, 5 min a pé da cidade velha UNESCO. Cães aceites (taxa moderada), cama e tigela, o bar do terraço tolera um cão à trela calmo ao pôr-do-sol.`,
  },
]

const COPY = {
  en: {
    eyebrow: 'PET-FRIENDLY SUMMER · ANTI-HEAT EUROPE',
    title: `Travel with Your Dog at Under 25°C in July: 8 Cool European Destinations`,
    intro: `If your dog is brachycephalic (bulldog, pug, boxer, French bulldog), senior, or heat-sensitive for any reason, July temperatures across Mediterranean and Central Europe are not just uncomfortable - they are a heatstroke risk. Above 28°C asphalt reaches 50°C and any flat-faced breed can be in serious trouble within minutes. We picked eight European destinations where July daytime temperatures stay reliably under 25°C and the local culture is set up to welcome a dog in the cool.`,
    pickHeading: 'The eight cool picks (ranked from coolest)',
    whyHere: 'Why here',
    hotelLabel: 'Where to stay',
    seeDestCta: 'Full city guide →',
    hotelCta: 'See availability →',
    julyLabel: 'July avg high',
    practicalHeading: 'Heat-stress practical info',
    practical: [
      { h: 'Who needs this list', p: `Brachycephalic dogs (bulldogs, pugs, boxers, French bulldogs, Boston terriers) suffer disproportionately from heat. So do senior dogs (8+ years), overweight dogs, double-coated breeds (huskies, Bernese, malamutes), and any dog with a heart or breathing condition. Above 25°C ambient, all of them need active cooling management; above 30°C, walks should be cancelled outside dawn and after 21:00.` },
      { h: 'The 7-second paw test', p: `Press the back of your hand on stone, asphalt or sand for 7 seconds. If you cannot keep it there comfortably, your dog cannot walk on it. Above 26°C ambient, this test fails between 11:00 and 18:00 on most surfaces. Carry dog boots or wait for evening.` },
      { h: 'Practical packing', p: `A cooling vest (Ruffwear Swamp Cooler is the verified standard), a collapsible water bowl, a SPF 50 nose balm for white-pigmented breeds, and a portable battery fan for the hotel room if it has no AC. Many Scandinavian hotels do not have AC because they do not need it - but rooms still warm up in July sun, so a fan helps.` },
      { h: 'Emergency heat-stroke signs', p: `Excessive panting, thick saliva, bright red or bluish gums, vomiting, unsteady gait. Wet the dog with lukewarm (not cold) water on belly, paws and armpits, and rush to a vet. Cooling too fast can cause shock - lukewarm is correct. Average European vet emergency call-out: €120-€220 plus treatment.` },
    ],
    faqHeading: 'Frequently asked questions',
    faqs: [
      { q: 'Are Scandinavian flights really dog-cabin-friendly?', a: `SAS, Finnair and Norwegian all accept dogs up to ~8 kg in cabin for €70-€150 each way. Larger dogs travel in the climate-controlled hold which is reasonable for these short EU flights (2-3 h). For brachycephalic breeds, airlines often restrict hold travel - Lufthansa, KLM and Air France have published lists. Always email the airline at booking with your breed and weight.` },
      { q: 'What about the Eurotunnel + driving to Norway?', a: `Driving to Bergen from central Europe is realistic in 3-4 days via Eurotunnel (dogs €25), Hamburg, Copenhagen-Helsingør ferry, Gothenburg, then ferry Gothenburg-Larvik (8 h). Many European drivers prefer this to flying with a large dog. Iceland is ferry-only (Smyril Line from Hirtshals, Denmark, 50 h).` },
      { q: 'Is Iceland worth the import paperwork?', a: `For a heat-sensitive dog, yes. Reykjavík averages 13°C in July, the lowest in Europe. The MAST process takes 3-4 weeks but is straightforward: rabies vaccine 3 weeks before, ISO microchip, EU pet passport, blood test for rabies titre at an approved lab. There is no quarantine. Plan the paperwork before booking - last-minute Iceland is impossible.` },
      { q: 'Are there cooler options inside continental Europe?', a: `Bern (Switzerland) and Edinburgh (UK) are the borderline picks in the list. Within continental EU, the coolest July averages outside Scandinavia are in the Alps (Innsbruck 23 °C, Salzburg 24 °C) and on the Atlantic coast (Brest 21 °C, Bilbao 23 °C). Mountain summers stay cool above 1,000 m altitude in any range.` },
    ],
    relatedHeading: 'See also',
  },
  fr: {
    eyebrow: `ÉTÉ PET-FRIENDLY · ANTI-CHALEUR EUROPE`,
    title: `Voyager avec son chien à moins de 25°C en juillet : 8 destinations européennes fraîches`,
    intro: `Si votre chien est brachycéphale (bouledogue français ou anglais, carlin, boxer), âgé, ou sensible à la chaleur pour n'importe quelle raison, les températures de juillet en Méditerranée et en Europe centrale ne sont pas juste inconfortables - elles présentent un risque de coup de chaleur. Au-dessus de 28°C, l'asphalte atteint 50°C et n'importe quelle race à face plate peut être en grave difficulté en quelques minutes. On a sélectionné huit destinations européennes où la température diurne de juillet reste sous 25°C et où la culture locale accueille un chien au frais.`,
    pickHeading: 'Les huit picks frais (du plus frais au plus chaud)',
    whyHere: 'Pourquoi ici',
    hotelLabel: 'Où dormir',
    seeDestCta: 'Guide complet →',
    hotelCta: 'Voir les disponibilités →',
    julyLabel: 'Max moyen juillet',
    practicalHeading: 'Info pratique anti-coup de chaleur',
    practical: [
      { h: 'Pour qui cette liste', p: `Les chiens brachycéphales (bouledogues, carlins, boxers, bouledogues français, terriers de Boston) souffrent disproportionnellement de la chaleur. Idem chiens âgés (8+ ans), chiens en surpoids, races à double poil (huskies, bernois, malamutes), et tout chien avec souffle cardiaque ou respiratoire. Au-dessus de 25°C ambiant, tous ont besoin d'une gestion active du refroidissement ; au-dessus de 30°C, annulez les balades entre 11h et 21h.` },
      { h: 'Le test des 7 secondes', p: `Pressez le dos de votre main sur la pierre, l'asphalte ou le sable pendant 7 secondes. Si vous ne tenez pas, votre chien non plus. Au-dessus de 26°C ambiant, ce test échoue entre 11h et 18h sur la plupart des surfaces. Emportez des chaussons ou attendez le soir.` },
      { h: 'Bagage anti-chaleur', p: `Un gilet rafraîchissant (Ruffwear Swamp Cooler est la référence vérifiée), une gamelle pliante, un baume nez SPF 50 pour les races à truffe rose, et un ventilateur portable à batterie pour la chambre d'hôtel si elle n'a pas de clim. Beaucoup d'hôtels scandinaves n'ont pas de clim car ils n'en ont pas besoin - mais les chambres chauffent quand même au soleil de juillet, un ventilateur aide.` },
      { h: `Signes d'urgence coup de chaleur`, p: `Halètement excessif, salive épaisse, gencives rouge vif ou bleuâtres, vomissements, démarche instable. Mouillez le chien à l'eau tiède (pas froide) sur le ventre, les pattes et les aisselles, et filez chez le véto. Refroidir trop vite peut causer un choc - tiède est correct. Consultation véto d'urgence européenne moyenne : 120-220 € plus traitement.` },
    ],
    faqHeading: 'Questions fréquentes',
    faqs: [
      { q: `Les vols scandinaves acceptent-ils vraiment le chien en cabine ?`, a: `SAS, Finnair et Norwegian acceptent tous les chiens jusqu'à ~8 kg en cabine pour 70-150 € l'aller. Les plus grands chiens voyagent en soute climatisée, ce qui est raisonnable pour ces courts vols UE (2-3h). Pour les races brachycéphales, les compagnies restreignent souvent la soute - Lufthansa, KLM et Air France ont des listes publiées. Toujours emailer la compagnie à la réservation avec race et poids.` },
      { q: `Et l'Eurotunnel + voiture jusqu'en Norvège ?`, a: `Aller à Bergen depuis l'Europe centrale est réaliste en 3-4 jours via Eurotunnel (chien 25 €), Hambourg, ferry Copenhague-Helsingør, Göteborg, puis ferry Göteborg-Larvik (8h). Beaucoup de conducteurs européens préfèrent ça à l'avion avec un grand chien. L'Islande c'est ferry-only (Smyril Line depuis Hirtshals au Danemark, 50h).` },
      { q: `L'Islande vaut-elle la paperasse import ?`, a: `Pour un chien sensible à la chaleur, oui. Reykjavík fait 13°C de moyenne en juillet, le plus bas d'Europe. Le process MAST prend 3-4 semaines mais est carré : vaccin rage 3 semaines avant, puce ISO, passeport européen, prise de sang titre rage dans un labo approuvé. Pas de quarantaine. Planifiez la paperasse avant de réserver - dernière minute c'est impossible.` },
      { q: `Y a-t-il des options plus fraîches en Europe continentale ?`, a: `Berne (Suisse) et Édimbourg (UK) sont les picks limites de la liste. Dans l'UE continentale, les moyennes de juillet les plus fraîches hors Scandinavie sont dans les Alpes (Innsbruck 23°C, Salzburg 24°C) et sur la côte atlantique (Brest 21°C, Bilbao 23°C). Les étés en montagne restent frais au-dessus de 1000 m d'altitude dans toutes les chaînes.` },
    ],
    relatedHeading: 'Voir aussi',
  },
  es: {
    eyebrow: `VERANO PET-FRIENDLY · ANTI-CALOR EUROPA`,
    title: `Viajar con tu perro a menos de 25°C en julio: 8 destinos europeos frescos`,
    intro: `Si tu perro es braquicéfalo (bulldog, carlino, bóxer, bulldog francés), mayor, o sensible al calor por cualquier razón, las temperaturas de julio en el Mediterráneo y Europa central no son solo incómodas - son un riesgo de golpe de calor. Por encima de 28°C el asfalto alcanza 50°C y cualquier raza de cara plana puede estar en grave problema en minutos. Hemos seleccionado ocho destinos europeos donde la temperatura diurna de julio se mantiene bajo 25°C y donde la cultura local acoge a un perro en el fresco.`,
    pickHeading: 'Las ocho elecciones frescas (del más fresco al más cálido)',
    whyHere: 'Por qué aquí',
    hotelLabel: 'Dónde alojarse',
    seeDestCta: 'Guía completa →',
    hotelCta: 'Ver disponibilidad →',
    julyLabel: 'Máx media julio',
    practicalHeading: 'Info práctica anti-golpe de calor',
    practical: [
      { h: 'Para quién esta lista', p: `Los perros braquicéfalos (bulldogs, carlinos, bóxer, bulldogs franceses, Boston terriers) sufren desproporcionadamente con el calor. Igual perros mayores (8+ años), perros con sobrepeso, razas de doble pelo (huskies, berneses, malamutes), y cualquier perro con problema cardíaco o respiratorio. Por encima de 25°C ambiental, todos necesitan gestión activa de enfriamiento; por encima de 30°C, cancela los paseos entre las 11h y las 21h.` },
      { h: 'El test de los 7 segundos', p: `Presiona el dorso de la mano sobre piedra, asfalto o arena durante 7 segundos. Si no aguantas, tu perro tampoco. Por encima de 26°C ambiental, este test falla entre las 11h y las 18h en la mayoría de superficies. Lleva botines o espera a la tarde.` },
      { h: 'Equipaje anti-calor', p: `Un chaleco refrescante (Ruffwear Swamp Cooler es la referencia verificada), un cuenco plegable, un bálsamo nariz SPF 50 para razas con trufa rosa, y un ventilador portátil para la habitación si no tiene aire. Muchos hoteles escandinavos no tienen aire porque no lo necesitan - pero las habitaciones se calientan con el sol de julio, un ventilador ayuda.` },
      { h: 'Señales de urgencia golpe de calor', p: `Jadeo excesivo, saliva espesa, encías rojo vivo o azuladas, vómitos, marcha inestable. Moja al perro con agua tibia (no fría) en vientre, patas y axilas, y corre al veterinario. Enfriar demasiado rápido causa shock - tibia es lo correcto. Consulta veterinaria de urgencia europea media: 120-220 € más tratamiento.` },
    ],
    faqHeading: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Los vuelos escandinavos admiten perro en cabina de verdad?', a: `SAS, Finnair y Norwegian admiten todos los perros hasta ~8 kg en cabina por 70-150 € por trayecto. Los perros más grandes viajan en la bodega climatizada, lo que es razonable en estos vuelos UE cortos (2-3 h). Para razas braquicéfalas, las aerolíneas restringen a menudo la bodega - Lufthansa, KLM y Air France tienen listas publicadas. Siempre emailea a la compañía al reservar con raza y peso.` },
      { q: '¿Y el Eurotúnel + coche hasta Noruega?', a: `Conducir a Bergen desde Europa central es realista en 3-4 días vía Eurotúnel (perro 25 €), Hamburgo, ferri Copenhague-Helsingør, Gotemburgo, luego ferri Gotemburgo-Larvik (8 h). Muchos conductores europeos prefieren esto a volar con un perro grande. Islandia es solo en ferri (Smyril Line desde Hirtshals, Dinamarca, 50 h).` },
      { q: '¿Islandia vale el papeleo de importación?', a: `Para un perro sensible al calor, sí. Reikiavik tiene 13°C de media en julio, el más bajo de Europa. El proceso MAST tarda 3-4 semanas pero es claro: vacuna antirrábica 3 semanas antes, chip ISO, pasaporte europeo, analítica titulación antirrábica en un laboratorio aprobado. Sin cuarentena. Planifica el papeleo antes de reservar - última hora es imposible.` },
      { q: '¿Hay opciones más frescas dentro de Europa continental?', a: `Berna (Suiza) y Edimburgo (UK) son las elecciones límite de la lista. Dentro de la UE continental, las medias de julio más frescas fuera de Escandinavia están en los Alpes (Innsbruck 23 °C, Salzburgo 24 °C) y en la costa atlántica (Brest 21 °C, Bilbao 23 °C). Los veranos de montaña se mantienen frescos por encima de los 1.000 m de altitud en cualquier cordillera.` },
    ],
    relatedHeading: 'Ver también',
  },
  pt: {
    eyebrow: `VERÃO PET-FRIENDLY · ANTI-CALOR EUROPA`,
    title: `Viajar com o seu cão a menos de 25°C em julho: 8 destinos europeus frescos`,
    intro: `Se o seu cão é braquicefálico (bulldog, carlin, boxer, bulldog francês), idoso, ou sensível ao calor por qualquer razão, as temperaturas de julho no Mediterrâneo e na Europa central não são só desconfortáveis - são um risco de golpe de calor. Acima dos 28°C o asfalto atinge 50°C e qualquer raça de cara achatada pode estar em sério problema em minutos. Selecionámos oito destinos europeus onde a temperatura diurna de julho se mantém abaixo dos 25°C e a cultura local acolhe um cão no fresco.`,
    pickHeading: 'As oito escolhas frescas (do mais fresco ao mais quente)',
    whyHere: 'Porquê aqui',
    hotelLabel: 'Onde ficar',
    seeDestCta: 'Guia completo →',
    hotelCta: 'Ver disponibilidade →',
    julyLabel: 'Máx média julho',
    practicalHeading: 'Info prática anti-golpe de calor',
    practical: [
      { h: 'Para quem é esta lista', p: `Cães braquicefálicos (bulldogs, carlins, boxers, bulldogs franceses, Boston terriers) sofrem desproporcionalmente com o calor. Idem cães idosos (8+ anos), cães com excesso de peso, raças de pelagem dupla (huskies, berneses, malamutes), e qualquer cão com problema cardíaco ou respiratório. Acima dos 25°C ambiente, todos precisam de gestão ativa de arrefecimento; acima dos 30°C, cancele os passeios entre as 11h e as 21h.` },
      { h: 'O teste dos 7 segundos', p: `Pressione as costas da mão sobre pedra, asfalto ou areia durante 7 segundos. Se não aguentar, o seu cão também não. Acima dos 26°C ambiente, este teste falha entre as 11h e as 18h na maioria das superfícies. Leve sapatinhos ou espere a tarde.` },
      { h: 'Bagagem anti-calor', p: `Um colete refrescante (Ruffwear Swamp Cooler é a referência verificada), uma tigela dobrável, um bálsamo nariz SPF 50 para raças de focinho rosa, e uma ventoinha portátil para o quarto se não tiver ar. Muitos hotéis escandinavos não têm ar porque não precisam - mas os quartos aquecem com o sol de julho, uma ventoinha ajuda.` },
      { h: 'Sinais de urgência golpe de calor', p: `Ofegamento excessivo, saliva espessa, gengivas vermelho vivo ou azuladas, vómitos, marcha instável. Molhe o cão com água tépida (não fria) na barriga, patas e axilas, e corra ao veterinário. Arrefecer demasiado rápido causa choque - tépida é o correto. Consulta veterinária de urgência europeia média: 120-220 € mais tratamento.` },
    ],
    faqHeading: 'Perguntas frequentes',
    faqs: [
      { q: 'Os voos escandinavos aceitam mesmo cão em cabine?', a: `SAS, Finnair e Norwegian aceitam todos cães até ~8 kg em cabine por 70-150 € o trajeto. Cães maiores viajam no porão climatizado, o que é razoável nestes voos UE curtos (2-3 h). Para raças braquicefálicas, as companhias restringem frequentemente o porão - Lufthansa, KLM e Air France têm listas publicadas. Envie sempre email à companhia na reserva com raça e peso.` },
      { q: 'E o Eurotúnel + carro até à Noruega?', a: `Conduzir até Bergen desde a Europa central é realista em 3-4 dias via Eurotúnel (cão 25 €), Hamburgo, ferry Copenhaga-Helsingør, Gotemburgo, depois ferry Gotemburgo-Larvik (8 h). Muitos condutores europeus preferem isto a voar com um cão grande. Islândia é só de ferry (Smyril Line desde Hirtshals, Dinamarca, 50 h).` },
      { q: 'A Islândia vale a papelada de importação?', a: `Para um cão sensível ao calor, sim. Reiquiavique tem 13°C de média em julho, o mais baixo da Europa. O processo MAST demora 3-4 semanas mas é claro: vacina antirrábica 3 semanas antes, chip ISO, passaporte europeu, análise titulação antirrábica num laboratório aprovado. Sem quarentena. Planeie a papelada antes de reservar - última hora é impossível.` },
      { q: 'Há opções mais frescas dentro da Europa continental?', a: `Berna (Suíça) e Edimburgo (UK) são as escolhas-limite da lista. Dentro da UE continental, as médias de julho mais frescas fora da Escandinávia estão nos Alpes (Innsbruck 23 °C, Salzburgo 24 °C) e na costa atlântica (Brest 21 °C, Bilbau 23 °C). Os verões de montanha mantêm-se frescos acima dos 1.000 m de altitude em qualquer cordilheira.` },
    ],
    relatedHeading: 'Ver também',
  },
} as const

type Locale = keyof typeof COPY

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!hasLocale(rawLocale)) notFound()
  const locale = rawLocale as Locale
  const t = COPY[locale]

  const stickyLabel = STICKY_LABELS[locale] ?? STICKY_LABELS.en

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/${locale}/guides` },
      { '@type': 'ListItem', position: 3, name: t.title, item: `${SITE_URL}/${locale}/guides/${SLUG}` },
    ],
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t.title,
    description: t.intro,
    inLanguage: locale,
    author: { '@type': 'Person', name: 'HotelsWithPets Editorial', jobTitle: 'Pet Travel Editor', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL },
  }

  const pickWhy = (p: Pick) => {
    if (locale === 'fr') return p.whyFr
    if (locale === 'es') return p.whyEs
    if (locale === 'pt') return p.whyPt
    return p.whyEn
  }
  const pickHotel = (p: Pick) => {
    if (locale === 'fr') return p.hotelFr
    if (locale === 'es') return p.hotelEs
    if (locale === 'pt') return p.hotelPt
    return p.hotelEn
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-sky-700 via-cyan-600 to-emerald-500 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 40%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-100 mb-3">❄️ {t.eyebrow}</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{t.title}</h1>
          <p className="text-lg sm:text-xl text-cyan-50 leading-relaxed">{t.intro}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-8">{t.pickHeading}</h2>
        <div className="space-y-5">
          {PICKS.map((p, i) => (
            <article key={p.slug} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <header className="px-5 sm:px-7 py-4 bg-gradient-to-r from-sky-50 to-emerald-50 border-b border-stone-200 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-2xl font-black text-sky-700">#{i + 1}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  <Link href={`/${locale}${p.destPath}`} className="hover:text-sky-700">{p.name}</Link>
                </h3>
                <span className="text-sm text-stone-600">{p.country}</span>
                <span className="ml-auto bg-sky-100 text-sky-900 text-xs font-bold px-3 py-1 rounded-full">
                  {t.julyLabel} {p.julyTemp}
                </span>
              </header>
              <div className="px-5 sm:px-7 py-5 space-y-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">{t.whyHere}</div>
                  <p className="text-stone-800 leading-relaxed">{pickWhy(p)}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">{t.hotelLabel}</div>
                  <p className="text-stone-700 text-sm leading-relaxed">{pickHotel(p)}</p>
                </div>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link href={`/${locale}${p.destPath}`} className="text-sm font-semibold text-sky-700 hover:text-sky-900 hover:underline">
                    {t.seeDestCta}
                  </Link>
                  <a
                    href={buildAllezDestLink(p.name, p.country, `${CAMPAIGN_BASE}-${p.slug}`, 5)}
                    target="_blank"
                    rel="noopener sponsored"
                    className="text-sm font-semibold text-stone-700 hover:text-sky-700 hover:underline"
                  >
                    {t.hotelCta}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">🌡️ {t.practicalHeading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.practical.map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-stone-200">
              <h3 className="font-bold text-stone-900 mb-2">{p.h}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{p.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">❓ {t.faqHeading}</h2>
        <div className="space-y-4">
          {t.faqs.map((f, i) => (
            <details key={i} className="bg-white border border-stone-200 rounded-2xl group">
              <summary className="cursor-pointer p-5 font-semibold text-stone-900 list-none flex items-center justify-between">
                <span>{f.q}</span>
                <span className="text-stone-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-stone-700 leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <GuideFooter locale={locale} currentSlug={SLUG} />

      <StickyHotelCTA
        label={stickyLabel.label}
        cta={stickyLabel.cta}
        href={buildAllezDestLink('Europe', 'Europe', `${CAMPAIGN_BASE}-sticky`, 5)}
      />
    </main>
  )
}
