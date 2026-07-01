import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'baltic-coast-dog-summer-2026'
const CAMPAIGN_BASE = 'baltic-coast'

const STICKY_LABELS: Record<string, { label: string; cta: string }> = {
  en: { label: 'Baltic coast pet-friendly hotels', cta: 'See hotels' },
  fr: { label: 'Hotels pet-friendly cote baltique', cta: 'Voir les hotels' },
  es: { label: 'Hoteles pet-friendly costa baltica', cta: 'Ver hoteles' },
  pt: { label: 'Hoteis pet-friendly costa baltica', cta: 'Ver hoteis' },
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
    en: `Dog-Friendly Baltic Coast 2026: 8 Beach Destinations from Poland to Estonia | HotelsWithPets.com`,
    fr: `Cote baltique pet-friendly 2026 : 8 destinations balneaires de la Pologne a l Estonie | HotelsWithPets.com`,
    es: `Costa baltica pet-friendly 2026: 8 destinos de playa de Polonia a Estonia | HotelsWithPets.com`,
    pt: `Costa baltica pet-friendly 2026: 8 destinos de praia da Polonia a Estonia | HotelsWithPets.com`,
  }
  const descriptions: Record<string, string> = {
    en: `Eight Baltic coast destinations where dogs are welcome on the beach all summer: Sopot, Kolobrzeg, Swinoujscie, Rugen, Usedom, Warnemunde, Palanga, Parnu. Cooler than the Mediterranean, official dog beach zones, verified pet-friendly hotels.`,
    fr: `Huit destinations balneaires de la cote baltique ou les chiens sont bienvenus toute l'ete : Sopot, Kolobrzeg, Swinoujscie, Rugen, Usedom, Warnemunde, Palanga, Parnu. Plus fraiche que la Mediterranee, zones canines officielles, hotels pet-friendly verifies.`,
    es: `Ocho destinos de la costa baltica donde los perros son bienvenidos en la playa todo el verano: Sopot, Kolobrzeg, Swinoujscie, Rugen, Usedom, Warnemunde, Palanga, Parnu. Mas fresco que el Mediterraneo, zonas caninas oficiales, hoteles pet-friendly verificados.`,
    pt: `Oito destinos da costa baltica onde os caes sao bem-vindos na praia o verao todo: Sopot, Kolobrzeg, Swinoujscie, Rugen, Usedom, Warnemunde, Palanga, Parnu. Mais fresco que o Mediterraneo, zonas caninas oficiais, hoteis pet-friendly verificados.`,
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
  augustTemp: string
  dogBeachNote: string
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
    slug: 'sopot',
    name: 'Sopot',
    country: 'Poland',
    destPath: '/destinations/sopot',
    augustTemp: '22C',
    dogBeachNote: 'Dog zone at north end of beach, all August',
    whyEn: `Sopot is the Baltic Riviera's most elegant resort town, with Europe's longest wooden pier (512m, dogs allowed outside bathing hours). The Monte Cassino pedestrian boulevard is lined with restaurants and cafe terraces that universally accept leashed dogs. The Lesna Opera (Forest Opera amphitheatre) holds outdoor concerts in a natural forest bowl where dogs wait on the grassy hillside during shows. August is peak season but the town handles it with sophistication: unlike Cannes or Marbella, Sopot has genuine space. The designated dog beach zone is at the northern end past the Neptun hotel.`,
    whyFr: `Sopot est la station balneaire la plus elegante de la Riviera Baltique, avec la plus longue jetee en bois d'Europe (512m, chiens admis en dehors des heures de baignade). Le boulevard pietonnier Monte Cassino est borde de restaurants et terrasses de cafes qui acceptent universellement les chiens en laisse. La Lesna Opera (amphitheatre de la foret) accueille des concerts en plein air dans un creux forestier naturel ou les chiens attendent sur le versant herbeux pendant les spectacles. Aout est la haute saison mais la ville la gere avec sophistication : contrairement a Cannes ou Marbella, Sopot a un vrai espace. La zone de plage canine designe est a l'extremite nord pres de l'hotel Neptun.`,
    whyEs: `Sopot es el pueblo balneario mas elegante de la Riviera Baltica, con el embarcadero de madera mas largo de Europa (512m, perros permitidos fuera de las horas de bano). El bulevar peatonal Monte Cassino esta flanqueado de restaurantes y terrazas de cafes que aceptan universalmente perros con correa. La Opera Lesna (anfiteatro del bosque) celebra conciertos al aire libre en un cuenco forestal natural donde los perros esperan en la ladera herbosa durante los espectaculos. Agosto es temporada alta pero la ciudad lo gestiona con sofisticacion: a diferencia de Cannes o Marbella, Sopot tiene espacio genuino. La zona de playa canina designada esta en el extremo norte pasado el hotel Neptun.`,
    whyPt: `Sopot e a cidade turistica mais elegante da Riviera Baltica, com o cais de madeira mais longo da Europa (512m, caes permitidos fora das horas de banho). O bulevar pedonal Monte Cassino e ladeado de restaurantes e esplanadas de cafes que aceitam universalmente caes a trela. A Opera Lesna (anfiteatro da floresta) realiza concertos ao ar livre num vale florestal natural onde os caes esperam na encosta relvada durante os espetaculos. Agosto e epoca alta mas a cidade gere-a com sofisticacao: ao contrario de Cannes ou Marbella, Sopot tem espaco genuino. A zona de praia canina designada esta na extremidade norte depois do hotel Neptun.`,
    hotelName: 'Sofitel Grand Sopot',
    hotelEn: `Sofitel Grand Sopot - 5-star Belle Epoque landmark on the promenade, pets welcome at moderate fee, 2 minutes to the pier. The grand facade and terrace overlook the Baltic directly.`,
    hotelFr: `Sofitel Grand Sopot - etablissement Belle Epoque 5 etoiles sur la promenade, animaux acceptes (supplement modere), 2 minutes de la jetee. La grande facade et la terrasse donnent directement sur la Baltique.`,
    hotelEs: `Sofitel Grand Sopot - hito Belle Epoque 5 estrellas en el paseo, mascotas admitidas (suplemento moderado), 2 minutos del embarcadero. La gran fachada y la terraza dan directamente al Baltico.`,
    hotelPt: `Sofitel Grand Sopot - marco Belle Epoque 5 estrelas na promenade, animais aceites (taxa moderada), 2 minutos do cais. A grande fachada e o terraço dao diretamente para o Baltico.`,
  },
  {
    slug: 'kolobrzeg',
    name: 'Kolobrzeg',
    country: 'Poland',
    destPath: '/destinations/kolobrzeg',
    augustTemp: '22C',
    dogBeachNote: 'Year-round dog beach west of the pier',
    whyEn: `Kolobrzeg is one of Poland's most popular Baltic spa resorts, with 18 km of fine white sand beach, a historic lighthouse, and a well-established dog-walking culture year-round. The dog beach at the western end of the long beach is officially marked and has no seasonal restriction. The city's thermal spa culture (brine baths, inhalation parks) is a Polish tradition: dogs obviously don't do the baths but the seaside promenade parks around the spa pavilions are all dog-accessible. Average hotel prices are 40% lower than Sopot for equivalent quality.`,
    whyFr: `Kolobrzeg est l'une des stations balneaires les plus populaires de la cote baltique polonaise, avec 18 km de plage de sable blanc fin, un phare historique et une culture de promenade canine bien etablie toute l'annee. La plage canine a l'extremite ouest de la longue plage est officiellement balisee et n'a aucune restriction saisonniere. La culture thermale de la ville (bains de saumure, parcs a inhalation) est une tradition polonaise : les chiens ne font evidemment pas les bains mais les parcs de promenade le long de la mer autour des pavillons thermaux sont tous accessibles aux chiens. Les prix des hotels sont en moyenne 40% inferieurs a ceux de Sopot pour une qualite equivalente.`,
    whyEs: `Kolobrzeg es uno de los balnearios balticos mas populares de Polonia, con 18 km de playa de arena blanca fina, un faro historico y una cultura de paseo canino bien establecida durante todo el ano. La playa canina en el extremo oeste de la larga playa esta senalizada oficialmente y no tiene ninguna restriccion estacional. La cultura termal de la ciudad (banos de salmuera, parques de inhalacion) es una tradicion polaca: los perros evidentemente no hacen los banos pero los parques del paseo maritimo alrededor de los pabellones termales son todos accesibles para perros. Los precios de los hoteles son de media un 40% inferiores a los de Sopot para una calidad equivalente.`,
    whyPt: `Kolobrzeg e um dos balnearios balticos mais populares da Polonia, com 18 km de praia de areia branca fina, um farol historico e uma cultura de passeio canino bem estabelecida durante todo o ano. A praia canina na extremidade oeste da longa praia esta oficialmente sinalizada e nao tem qualquer restricao sazonal. A cultura termal da cidade (banhos de salmoura, parques de inalacao) e uma tradicao polaca: os caes evidentemente nao fazem os banhos mas os parques do passeio maritimo em torno dos pavilhoes termais sao todos acessiveis a caes. Os precos dos hoteis sao em media 40% inferiores aos de Sopot para qualidade equivalente.`,
    hotelName: 'Hotel Arkas',
    hotelEn: `Hotel Arkas - 4-star spa hotel with beach access, dogs welcome at modest fee. Direct access to the sandy beach and the marked dog zone at the western end.`,
    hotelFr: `Hotel Arkas - hotel spa 4 etoiles avec acces a la plage, chiens acceptes (supplement modere). Acces direct a la plage de sable et a la zone canine balisee a l'extremite ouest.`,
    hotelEs: `Hotel Arkas - hotel spa 4 estrellas con acceso a la playa, perros admitidos (suplemento moderado). Acceso directo a la playa de arena y a la zona canina senalizada en el extremo oeste.`,
    hotelPt: `Hotel Arkas - hotel spa 4 estrelas com acesso a praia, caes aceites (taxa moderada). Acesso direto a praia de areia e a zona canina sinalizada na extremidade oeste.`,
  },
  {
    slug: 'swinoujscie',
    name: 'Swinoujscie',
    country: 'Poland',
    destPath: '/destinations/swinoujscie',
    augustTemp: '22C',
    dogBeachNote: 'Longest dog-friendly beach stretch on the Polish coast',
    whyEn: `Swinoujscie sits on the Uznam island (partially German: the town straddles the border), has the longest uninterrupted sandy beach on the Polish Baltic coast (12 km), and a genuine dog beach zone marked on the official city map. The German side of the island (Usedom) begins directly across the river by free ferry, doubling the exploration area. The resort is quieter than Sopot but has a charming Belle Epoque promenade.`,
    whyFr: `Swinoujscie est situee sur l'ile d'Uznam (partiellement allemande : la ville a cheval sur la frontiere), possede la plus longue plage de sable ininterrompue de la cote baltique polonaise (12 km) et une veritable zone canine indiquee sur le plan officiel de la ville. Le cote allemand de l'ile (Usedom) commence directement de l'autre cote de la riviere par bac gratuit, doublant la zone d'exploration. La station est plus calme que Sopot mais dispose d'une charmante promenade Belle Epoque.`,
    whyEs: `Swinoujscie esta situada en la isla de Uznam (parcialmente alemana: la ciudad a caballo en la frontera), tiene la playa de arena ininterrumpida mas larga de la costa baltica polaca (12 km) y una verdadera zona canina senalada en el mapa oficial de la ciudad. El lado aleman de la isla (Usedom) comienza directamente al otro lado del rio en ferry gratuito, duplicando el area de exploracion. El balneario es mas tranquilo que Sopot pero tiene un encantador paseo Belle Epoque.`,
    whyPt: `Swinoujscie fica na ilha de Uznam (parcialmente alema: a cidade a cavaleiro da fronteira), tem a mais longa praia de areia ininterrupta da costa baltica polaca (12 km) e uma verdadeira zona canina assinalada no mapa oficial da cidade. O lado alemao da ilha (Usedom) comeca diretamente do outro lado do rio por ferry gratuito, duplicando a area de exploracao. O resort e mais calmo do que Sopot mas tem um encantador passeio Belle Epoque.`,
    hotelName: 'Amber Baltic Resort',
    hotelEn: `Amber Baltic Resort - 4-star beachfront hotel, dogs welcome, private beach access. One of the few Polish Baltic hotels with direct beach entry.`,
    hotelFr: `Amber Baltic Resort - hotel de bord de mer 4 etoiles, chiens acceptes, acces plage prive. L'un des rares hotels baltiques polonais avec acces direct a la plage.`,
    hotelEs: `Amber Baltic Resort - hotel frente al mar 4 estrellas, perros admitidos, acceso playa privado. Uno de los pocos hoteles balticos polacos con acceso directo a la playa.`,
    hotelPt: `Amber Baltic Resort - hotel beira-mar 4 estrelas, caes aceites, acesso privado a praia. Um dos poucos hoteis balticos polacos com acesso direto a praia.`,
  },
  {
    slug: 'rugen',
    name: 'Rugen',
    country: 'Germany',
    destPath: '/destinations/rugen',
    augustTemp: '21C',
    dogBeachNote: 'Sellin and Binz dog beaches official, year-round',
    whyEn: `Rugen is Germany's largest island and one of the most beautiful coastlines in Northern Europe: the white chalk cliffs (Kreidefelsen) of Jasmund National Park, the elegant Binz resort with its beach promenade, and the pier at Sellin which allows leashed dogs year-round. The Granitz hunting lodge through the forest on foot is dog-friendly. German beach dog culture is formal but clear: look for the Hundestrand (dog beach) signs. Binz, Sellin and Baabe all have official marked dog beaches.`,
    whyFr: `Rugen est la plus grande ile d'Allemagne et l'un des plus beaux littoraux d'Europe du Nord : les falaises de craie blanche (Kreidefelsen) du parc national de Jasmund, l'elegante station de Binz avec sa promenade de plage, et la jetee de Sellin qui accepte les chiens en laisse toute l'annee. Le pavillon de chasse de Granitz en foret est dog-friendly. La culture balneaire canine allemande est formelle mais claire : cherchez les panneaux Hundestrand (plage canine). Binz, Sellin et Baabe ont toutes des plages canines officiellement delimitees.`,
    whyEs: `Rugen es la isla mas grande de Alemania y uno de los litorales mas hermosos del norte de Europa: los acantilados de tiza blanca (Kreidefelsen) del parque nacional de Jasmund, el elegante balneario de Binz con su paseo de playa, y el embarcadero de Sellin que admite perros con correa todo el ano. El pabellon de caza de Granitz por el bosque es dog-friendly. La cultura playera canina alemana es formal pero clara: busca los carteles Hundestrand (playa de perros). Binz, Sellin y Baabe tienen todas playas caninas oficialmente delimitadas.`,
    whyPt: `Rugen e a maior ilha da Alemanha e um dos mais belos litorais do norte da Europa: os penhascos de giz branco (Kreidefelsen) do parque nacional de Jasmund, o elegante resort de Binz com o seu passeio de praia, e o cais de Sellin que aceita caes a trela durante todo o ano. O pavilhao de caca de Granitz pela floresta a pe e dog-friendly. A cultura de praia canina alema e formal mas clara: procure as placas Hundestrand (praia de caes). Binz, Sellin e Baabe tem todas praias caninas oficialmente delimitadas.`,
    hotelName: 'Rugen Hotel und Bungalows Binz',
    hotelEn: `Rugen Hotel und Bungalows Binz - 4-star, directly on the promenade, dogs welcome at moderate fee. Bungalow option for families with dogs needing more space.`,
    hotelFr: `Rugen Hotel und Bungalows Binz - 4 etoiles, directement sur la promenade, chiens acceptes (supplement modere). Option bungalow pour les familles avec chiens ayant besoin de plus d'espace.`,
    hotelEs: `Rugen Hotel und Bungalows Binz - 4 estrellas, directamente en el paseo, perros admitidos (suplemento moderado). Opcion bungalow para familias con perros que necesitan mas espacio.`,
    hotelPt: `Rugen Hotel und Bungalows Binz - 4 estrelas, diretamente na promenade, caes aceites (taxa moderada). Opcao bungalow para familias com caes que precisam de mais espaco.`,
  },
  {
    slug: 'usedom',
    name: 'Usedom',
    country: 'Germany',
    destPath: '/destinations/usedom',
    augustTemp: '22C',
    dogBeachNote: 'Heringsdorf and Bansin Hundestrand, no seasonal ban',
    whyEn: `Usedom has the most sunshine hours of any German island (1906h/year) and three elegant Kaiser resorts: Heringsdorf, Ahlbeck and Bansin. Each has an official Hundestrand (dog beach) that operates year-round without the June-September bans found on many German beaches. The 13 km Strandpromenade (beach promenade) connecting all three resorts is flat, paved, and explicitly dog-welcome. Ahlbeck's pier is the oldest operating pier in Germany (1898) and accepts leashed dogs.`,
    whyFr: `Usedom est l'ile allemande qui compte le plus d'heures d'ensoleillement (1906h/an) et trois elegantes stations Kaiser : Heringsdorf, Ahlbeck et Bansin. Chacune dispose d'un Hundestrand (plage canine) officiel qui fonctionne toute l'annee sans les interdictions de juin a septembre presentes sur de nombreuses plages allemandes. La Strandpromenade de 13 km reliant les trois stations est plate, paved et explicitement ouverte aux chiens. La jetee d'Ahlbeck est la plus ancienne jetee en activite d'Allemagne (1898) et accepte les chiens en laisse.`,
    whyEs: `Usedom es la isla alemana con mas horas de sol de todas las islas alemanas (1906h/ano) y tres elegantes balnearios Kaiser: Heringsdorf, Ahlbeck y Bansin. Cada uno tiene un Hundestrand (playa canina) oficial que funciona todo el ano sin las prohibiciones de junio a septiembre que se encuentran en muchas playas alemanas. La Strandpromenade de 13 km que une los tres balnearios es plana, pavimentada y explicitamente abierta a los perros. El embarcadero de Ahlbeck es el mas antiguo en funcionamiento de Alemania (1898) y admite perros con correa.`,
    whyPt: `Usedom e a ilha alema com mais horas de sol de todas as ilhas alemas (1906h/ano) e tres elegantes resorts Kaiser: Heringsdorf, Ahlbeck e Bansin. Cada um tem um Hundestrand (praia canina) oficial que funciona durante todo o ano sem as proibicoes de junho a setembro encontradas em muitas praias alemas. A Strandpromenade de 13 km que liga os tres resorts e plana, pavimentada e explicitamente aberta a caes. O cais de Ahlbeck e o mais antigo em funcionamento na Alemanha (1898) e aceita caes a trela.`,
    hotelName: 'Travel Charme Strandhotel Bansin',
    hotelEn: `Travel Charme Strandhotel Bansin - 4-star beachfront, dogs welcome at moderate fee, garden. The hotel terrace faces the Hundestrand directly.`,
    hotelFr: `Travel Charme Strandhotel Bansin - 4 etoiles bord de mer, chiens acceptes (supplement modere), jardin. La terrasse de l'hotel donne directement sur le Hundestrand.`,
    hotelEs: `Travel Charme Strandhotel Bansin - 4 estrellas frente al mar, perros admitidos (suplemento moderado), jardin. La terraza del hotel da directamente al Hundestrand.`,
    hotelPt: `Travel Charme Strandhotel Bansin - 4 estrelas beira-mar, caes aceites (taxa moderada), jardim. O terraço do hotel da diretamente para o Hundestrand.`,
  },
  {
    slug: 'warnemunde',
    name: 'Warnemunde',
    country: 'Germany',
    destPath: '/destinations/warnemunde',
    augustTemp: '21C',
    dogBeachNote: 'Dog beach east of lighthouse, open all year',
    whyEn: `Warnemunde is the beach district of Rostock, reachable by S-Bahn from Rostock city centre in 22 minutes. It has a proper dog beach east of the lighthouse that operates year-round, a flat promenade suitable for any breed, and a historic fishing village centre (the Alter Strom canal) where restaurant terraces tolerate leashed dogs. The Ahrenshoop artist colony on the Fischland-Darss peninsula 40 km west is one of Germany's most beautiful unspoiled coastal areas with forest trails that accept dogs.`,
    whyFr: `Warnemunde est le quartier balneaire de Rostock, accessible en S-Bahn depuis le centre-ville de Rostock en 22 minutes. Il dispose d'une vraie plage canine a l'est du phare qui fonctionne toute l'annee, d'une promenade plate adaptee a toutes les races, et d'un centre de village de pecheurs historique (le canal Alter Strom) ou les terrasses des restaurants tolerent les chiens en laisse. La colonie d'artistes d'Ahrenshoop sur la peninsule de Fischland-Darss a 40 km a l'ouest est l'une des zones cotieres les plus belles et preservees d'Allemagne avec des sentiers forestiers qui acceptent les chiens.`,
    whyEs: `Warnemunde es el barrio de playa de Rostock, accesible en S-Bahn desde el centro de Rostock en 22 minutos. Tiene una verdadera playa canina al este del faro que funciona todo el ano, un paseo plano apto para cualquier raza y un historico centro de pueblo de pescadores (el canal Alter Strom) donde las terrazas de los restaurantes toleran los perros con correa. La colonia de artistas de Ahrenshoop en la peninsula de Fischland-Darss a 40 km al oeste es una de las zonas costeras mas bellas e intactas de Alemania con senderos forestales que admiten perros.`,
    whyPt: `Warnemunde e o bairro de praia de Rostock, acessivel de S-Bahn do centro de Rostock em 22 minutos. Tem uma verdadeira praia canina a leste do farol que funciona durante todo o ano, um passeio plano adequado para qualquer raca, e um historico centro de aldeia de pescadores (o canal Alter Strom) onde as esplanadas dos restaurantes toleram caes a trela. A colonia de artistas de Ahrenshoop na peninsula de Fischland-Darss a 40 km a oeste e uma das zonas costeiras mais belas e preservadas da Alemanha com trilhos florestais que aceitam caes.`,
    hotelName: 'Hotel Hubner',
    hotelEn: `Hotel Hubner - 3-star facing the lighthouse, dogs welcome at modest fee. Walk out the door and the dog beach is 5 minutes east.`,
    hotelFr: `Hotel Hubner - 3 etoiles face au phare, chiens acceptes (supplement modere). Sortez par la porte et la plage canine est a 5 minutes a l'est.`,
    hotelEs: `Hotel Hubner - 3 estrellas frente al faro, perros admitidos (suplemento moderado). Sal por la puerta y la playa canina esta a 5 minutos al este.`,
    hotelPt: `Hotel Hubner - 3 estrelas de frente para o farol, caes aceites (taxa moderada). Saia pela porta e a praia canina esta a 5 minutos a leste.`,
  },
  {
    slug: 'palanga',
    name: 'Palanga',
    country: 'Lithuania',
    destPath: '/destinations/palanga',
    augustTemp: '21C',
    dogBeachNote: 'Official dog beach at south end, access all August',
    whyEn: `Palanga is Lithuania's main beach resort and has a surprisingly cosmopolitan summer scene for such a small town (population 13,000 growing to 80,000 in August). The official dog beach at the southern end has clear signage and operates without seasonal interruption. The Botanical Park (Palanga Amber Museum park) is a 100-ha landscaped garden open to leashed dogs, one of the most beautiful parks on the Baltic coast. The town is entirely walkable in 30 minutes and terrace restaurant culture is dog-tolerant.`,
    whyFr: `Palanga est la principale station balneaire de Lituanie et dispose d'une scene estivale etonnamment cosmopolite pour une si petite ville (13 000 habitants passant a 80 000 en aout). La plage canine officielle a l'extremite sud dispose d'une signalisation claire et fonctionne sans interruption saisonniere. Le Parc Botanique (parc du Musee de l'Ambre de Palanga) est un jardin paysager de 100 ha ouvert aux chiens en laisse, l'un des plus beaux parcs de la cote baltique. La ville est entierement accessible a pied en 30 minutes et la culture des terrasses de restaurants est tolerante envers les chiens.`,
    whyEs: `Palanga es el principal balneario de Lituania y tiene una escena veraniega sorprendentemente cosmopolita para una ciudad tan pequena (13.000 habitantes que se convierten en 80.000 en agosto). La playa canina oficial en el extremo sur tiene una senalizacion clara y funciona sin interrupcion estacional. El Parque Botanico (parque del Museo del Ambar de Palanga) es un jardin paisajistico de 100 ha abierto a los perros con correa, uno de los parques mas hermosos de la costa baltica. La ciudad es totalmente transitable a pie en 30 minutos y la cultura de las terrazas de restaurantes es tolerante con los perros.`,
    whyPt: `Palanga e o principal resort balneario da Lituania e tem uma cena de verao surpreendentemente cosmopolita para uma cidade tao pequena (13.000 habitantes passando a 80.000 em agosto). A praia canina oficial na extremidade sul tem sinalizacao clara e funciona sem interrupcao sazonal. O Parque Botanico (parque do Museu do Ambar de Palanga) e um jardim paisagistico de 100 ha aberto a caes a trela, um dos mais belos parques da costa baltica. A cidade e inteiramente acessivel a pe em 30 minutos e a cultura das esplanadas dos restaurantes e tolerante com os caes.`,
    hotelName: 'Vanagupe Hotel Palanga',
    hotelEn: `Vanagupe Hotel Palanga - 4-star spa hotel, dogs welcome at moderate fee, forest location. Situated between the pine forest and the beach, with easy access to the botanical park.`,
    hotelFr: `Vanagupe Hotel Palanga - hotel spa 4 etoiles, chiens acceptes (supplement modere), emplacement forestier. Situe entre la foret de pins et la plage, avec un acces facile au parc botanique.`,
    hotelEs: `Vanagupe Hotel Palanga - hotel spa 4 estrellas, perros admitidos (suplemento moderado), ubicacion forestal. Situado entre el bosque de pinos y la playa, con facil acceso al parque botanico.`,
    hotelPt: `Vanagupe Hotel Palanga - hotel spa 4 estrelas, caes aceites (taxa moderada), localizacao florestal. Situado entre a floresta de pinheiros e a praia, com facil acesso ao parque botanico.`,
  },
  {
    slug: 'parnu',
    name: 'Parnu',
    country: 'Estonia',
    destPath: '/destinations/parnu',
    augustTemp: '20C',
    dogBeachNote: 'Dog zone Rannaniidu meadow + south beach section',
    whyEn: `Parnu is Estonia's summer capital and has the warmest water on the Estonian coast: still Baltic-cool at 18-20°C in August, but the sandy beach and spa town rhythm make it the Baltic coast's most livable resort. The Rannaniidu meadow park has an official off-leash area, the beach dog zone at the southern section is marked, and Parnu's entire terrace culture (cafe and restaurant) is explicitly dog-tolerant. Dogs sit at outdoor tables routinely without issue. August temperatures stay under 21°C with Baltic breeze.`,
    whyFr: `Parnu est la capitale estivale de l'Estonie et dispose des eaux les plus chaudes de la cote estonienne : encore fraiche baltique a 18-20°C en aout, mais la plage de sable et le rythme de la station thermale en font le resort le plus agreeable de la cote baltique. Le parc de prairie Rannaniidu dispose d'une zone officielle sans laisse, la zone canine de plage a la section sud est balisee, et toute la culture des terrasses de Parnu (cafes et restaurants) est explicitement tolerante envers les chiens. Les chiens s'assoient couramment aux tables exterieures sans probleme. Les temperatures d'aout restent sous 21°C grace a la brise baltique.`,
    whyEs: `Parnu es la capital veraniega de Estonia y tiene el agua mas calida de la costa estonia: aun fresca baltica a 18-20°C en agosto, pero la playa de arena y el ritmo de la ciudad balnearia lo convierten en el resort mas habitable de la costa baltica. El parque de pradera Rannaniidu tiene una zona oficial sin correa, la zona canina de playa en la seccion sur esta senalizada, y toda la cultura de terrazas de Parnu (cafes y restaurantes) es explicitamente tolerante con los perros. Los perros se sientan habitualmente en las mesas exteriores sin problema. Las temperaturas de agosto se mantienen bajo 21°C con la brisa baltica.`,
    whyPt: `Parnu e a capital de verao da Estonia e tem a agua mais quente da costa estoniana: ainda fresca baltica a 18-20°C em agosto, mas a praia de areia e o ritmo da cidade termal tornam-na no resort mais habitavel da costa baltica. O parque de prado Rannaniidu tem uma zona oficial sem trela, a zona canina de praia na seccao sul esta sinalizada, e toda a cultura de esplanadas de Parnu (cafes e restaurantes) e explicitamente tolerante com os caes. Os caes sentam-se habitualmente nas mesas exteriores sem problema. As temperaturas de agosto ficam abaixo dos 21°C com a brisa baltica.`,
    hotelName: 'Villa Wesset',
    hotelEn: `Villa Wesset - boutique spa quarter hotel, dogs welcome at modest fee, private garden. Located in the charming spa district, 10-minute walk to the beach dog zone.`,
    hotelFr: `Villa Wesset - hotel boutique du quartier thermal, chiens acceptes (supplement modere), jardin prive. Situe dans le charmant quartier thermal, 10 minutes a pied de la zone canine de plage.`,
    hotelEs: `Villa Wesset - hotel boutique del barrio termal, perros admitidos (suplemento moderado), jardin privado. Situado en el encantador barrio termal, 10 minutos andando a la zona canina de playa.`,
    hotelPt: `Villa Wesset - hotel boutique do bairro termal, caes aceites (taxa moderada), jardim privado. Localizado no encantador bairro termal, 10 minutos a pe da zona canina de praia.`,
  },
]

const COPY = {
  en: {
    eyebrow: 'BALTIC RIVIERA 2026 · DOG-FRIENDLY COAST',
    title: `Dog-Friendly Baltic Coast 2026: 8 Beach Destinations from Poland to Estonia`,
    intro: `The Baltic coast is Europe's fastest-growing summer destination: cooler than the Mediterranean, with a dog-friendly beach culture that is impossible to find in France, Spain or Italy. From the elegant pier resorts of Poland to the spa towns of Estonia, dogs are not just tolerated on Baltic beaches: they have official designated zones, year-round access, and a local culture built around outdoor life with animals. August temperatures stay at 20-22°C, water at 18-22°C, and the sea breeze makes it the safest European coast for any breed in summer.`,
    pickHeading: '8 Baltic beach destinations where dogs are welcome all summer',
    whyHere: 'Why here',
    hotelLabel: 'Where to stay',
    seeDestCta: 'Full city guide →',
    hotelCta: 'See availability →',
    augustLabel: 'Aug avg high',
    practicalHeading: 'Baltic coast practical info for dog owners',
    practical: [
      { h: 'Baltic dog beach rules vs Mediterranean', p: `Germany operates a formal Hundestrand system: official dog beaches are marked with clear signage, open year-round in most resorts, with no June-September ban. Poland has designated dog zones on official city maps (Sopot, Kolobrzeg, Swinoujscie, Gdynia) that are permanent. Lithuania (Palanga) and Estonia (Parnu) both have official marked zones with all-August access. Latvia offers total freedom: no seasonal beach ban anywhere on the coast. Compare this with France (total ban on supervised beaches June-September), Spain (ban June-September on most Costa beaches) and Italy (ban on most Adriatic and Tyrrhenian beaches all summer). The Baltic is the dog-beach capital of Europe.` },
      { h: 'Baltic water for dogs: is it safe?', p: `The Baltic is the least salty major sea in the world (8-12 per mill vs Mediterranean at 38 per mill). Dogs can swim freely without the coat damage or eye irritation that Mediterranean salt causes, but the water is still saline enough that drinking it is harmful. Always bring fresh water for your dog after swimming. The low salinity also means no jellyfish problem along the Polish and German coast in August. Water temperature stays 18-22°C in August at all 8 destinations, never uncomfortably cold for most breeds.` },
      { h: 'Getting to the Baltic coast by train and ferry', p: `Berlin to Rugen: 3h by direct train (IC) to Binz or Bergen auf Rugen. Warsaw to Sopot/Gdansk: 3.5h by Intercity express (dogs in crate or on leash, modest fee). Vilnius to Palanga: 3h by bus (no direct train). Riga to Parnu: 2h by bus (no direct train, frequent coaches). By ferry: Rostock to Helsinki (Tallink, 28h, dogs in cabin supplement or kennel), Travemunde to Helsinki (Finnlines, 28h), Travemunde to Tallinn (Tallink). Dogs are accepted on all Baltic ferries at modest supplement. From Western Europe, the E28 coastal road from Stettin through all Polish resorts and up to Lithuania is one of Europe's great dog road-trips.` },
      { h: 'Baltic vs Mediterranean for brachycephalic dogs', p: `The Baltic coast is the safest European coast in summer for flat-faced breeds (bulldogs, pugs, boxers, Boston terriers) and for senior dogs. August air temperature at all 8 destinations stays at 20-22°C: no pavement heat above 30°C, no asphalt risk, no humidity spike. Water at 18-22°C is refreshing rather than cold, and the low salinity is gentler on skin and coat. Compare with Mediterranean August: air at 30-38°C, asphalt at 50-60°C, salt concentration that irritates eyes and skin after each swim. The Baltic is not a compromise for heat-sensitive dogs: it is actively the right destination.` },
    ],
    faqHeading: 'Frequently asked questions',
    faqs: [
      { q: 'Is the Baltic Sea safe for dogs to swim in?', a: `Yes. The low salinity (8-12 per mill) is much gentler than the Mediterranean or Atlantic. Rinse the coat with fresh water after swimming, mainly to remove sand and any surface residue. No jellyfish problem along the Polish and German Baltic coast in summer. Water stays 18-22°C in August, which is refreshing but not cold for most breeds. Dogs with short coats (greyhounds, Weimaraners) can go in and out freely without chilling. Always bring fresh water for drinking: the Baltic is still saline enough to cause dehydration if your dog swallows significant quantities.` },
      { q: 'Which Polish resort is best for dogs?', a: `Sopot for atmosphere and elegance: Europe's longest pier, the Monte Cassino boulevard, the best restaurants, but expensive in peak August. Kolobrzeg for the longest beach and the best-organised dog zone: 18 km of beach, officially marked western dog zone, 40% cheaper than Sopot, and the spa promenade parks are all dog-accessible. Swinoujscie for the least crowds and the dual German-Polish experience: the German island of Usedom is a free ferry away, giving you access to two countries' worth of dog beaches from one base. For families driving from Germany or Scandinavia, Swinoujscie is the most logical entry point.` },
      { q: 'Can I drive along the whole Baltic coast with a dog?', a: `Yes. The E28 coastal road runs from Swinoujscie through Kolobrzeg to Gdansk (Sopot), then continues north through Gdynia and across the border into Lithuania toward Palanga, and from there up through Latvia and into Estonia toward Parnu and Tallinn. A full drive from Swinoujscie to Tallinn covers approximately 1,200 km and takes 10-12 hours non-stop. Split over 3-4 days with overnight stops at the destinations in this guide, it is one of Europe's best dog road trips: every resort on the route has a dog beach, a marked off-leash zone, or both.` },
      { q: 'What is the best month for the Baltic with a dog?', a: `August. Water is warmest (18-22°C at all 8 destinations), air temperature is 20-22°C, Baltic breezes keep coastal humidity low, and the dog beach season is in full swing everywhere. July is also excellent (slightly cooler water at 16-20°C, slightly less crowded). September is quiet and often half the price of August, with air temperature dropping to 15-18°C: excellent for dogs but a bit cool for owners who want to swim. October onward is off-season: most dog beaches remain officially open, but the resort towns go into hibernation.` },
    ],
    relatedHeading: 'See also',
  },
  fr: {
    eyebrow: 'RIVIERA BALTIQUE 2026 · COTE DOG-FRIENDLY',
    title: `Cote baltique pet-friendly 2026 : 8 destinations balneaires de la Pologne a l'Estonie`,
    intro: `La cote baltique est la destination estivale a la croissance la plus rapide d'Europe : plus fraiche que la Mediterranee, avec une culture de plage dog-friendly impossible a trouver en France, en Espagne ou en Italie. Des elegantes stations a jetee de Pologne aux villes thermales d'Estonie, les chiens ne sont pas juste toleres sur les plages baltiques : ils disposent de zones officielles designees, d'un acces toute l'annee et d'une culture locale construite autour de la vie en plein air avec les animaux. Les temperatures d'aout restent a 20-22°C, l'eau a 18-22°C, et la brise marine en fait la cote europeenne la plus sure pour toutes les races en ete.`,
    pickHeading: '8 destinations balneaires baltiques ou les chiens sont bienvenus tout l\'ete',
    whyHere: 'Pourquoi ici',
    hotelLabel: 'Ou dormir',
    seeDestCta: 'Guide complet →',
    hotelCta: 'Voir les disponibilites →',
    augustLabel: 'Max moy aout',
    practicalHeading: 'Info pratique cote baltique pour les maitres de chiens',
    practical: [
      { h: 'Regles plages canines Baltique vs Mediterranee', p: `L'Allemagne dispose d'un systeme formel de Hundestrand : les plages canines officielles sont balisees par des panneaux clairs, ouvertes toute l'annee dans la plupart des stations, sans interdiction de juin a septembre. La Pologne a des zones canines designees sur les plans officiels des villes (Sopot, Kolobrzeg, Swinoujscie, Gdynia) qui sont permanentes. La Lituanie (Palanga) et l'Estonie (Parnu) ont toutes deux des zones balisees officielles avec un acces tout le mois d'aout. La Lettonie offre une liberte totale : aucune interdiction saisonniere sur les plages nulle part sur la cote. Comparez avec la France (interdiction totale sur les plages surveillees de juin a septembre), l'Espagne (interdiction de juin a septembre sur la plupart des plages de la Costa) et l'Italie (interdiction sur la plupart des plages adriatiques et tyrrheniennes tout l'ete). La Baltique est la capitale europeenne des plages canines.` },
      { h: 'L\'eau baltique pour les chiens : est-elle sans danger ?', p: `La Baltique est la mer majeure la moins salee au monde (8-12 pour mille contre 38 pour mille en Mediterranee). Les chiens peuvent nager librement sans les dommages au pelage ou l'irritation oculaire que provoque le sel mediterraneen, mais l'eau est encore suffisamment saline pour que la boire soit nuisible. Apportez toujours de l'eau douce pour votre chien apres la baignade. La faible salinite signifie egalement qu'il n'y a pas de probleme de meduses le long des cotes polonaises et allemandes en aout. La temperature de l'eau reste a 18-22°C en aout dans les 8 destinations, jamais inconfortablement froide pour la plupart des races.` },
      { h: 'Rejoindre la cote baltique en train et en ferry', p: `Berlin a Rugen : 3h en train direct (IC) jusqu'a Binz ou Bergen auf Rugen. Varsovie a Sopot/Gdansk : 3h30 en Intercity express (chiens en cage ou en laisse, supplement modere). Vilnius a Palanga : 3h en bus (pas de train direct). Riga a Parnu : 2h en bus (pas de train direct, cars frequents). En ferry : Rostock a Helsinki (Tallink, 28h, chiens en cabine supplement ou chenil), Travemunde a Helsinki (Finnlines, 28h), Travemunde a Tallinn (Tallink). Les chiens sont acceptes sur tous les ferries baltiques avec un supplement modere. Depuis l'Europe de l'Ouest, la route cotiere E28 depuis Stettin a travers toutes les stations polonaises et remontant jusqu'en Lituanie est l'un des grands road trips canins d'Europe.` },
      { h: 'Baltique vs Mediterranee pour les chiens brachycephales', p: `La cote baltique est la cote europeenne la plus sure en ete pour les races a face plate (bouledogues, carlins, boxers, Boston terriers) et pour les chiens ages. La temperature de l'air en aout dans les 8 destinations reste a 20-22°C : pas de chaleur de trottoir au-dessus de 30°C, pas de risque d'asphalte, pas de pic d'humidite. L'eau a 18-22°C est rafraichissante plutot que froide, et la faible salinite est plus douce pour la peau et le pelage. Comparez avec la Mediterranee en aout : air a 30-38°C, asphalte a 50-60°C, concentration de sel qui irrite les yeux et la peau apres chaque baignade. La Baltique n'est pas un compromis pour les chiens sensibles a la chaleur : c'est activement la bonne destination.` },
    ],
    faqHeading: 'Questions frequentes',
    faqs: [
      { q: 'La mer Baltique est-elle sans danger pour les chiens ?', a: `Oui. La faible salinite (8-12 pour mille) est bien plus douce que la Mediterranee ou l'Atlantique. Rincez le pelage a l'eau douce apres la baignade, principalement pour enlever le sable et les residus de surface. Pas de probleme de meduses le long de la cote baltique polonaise et allemande en ete. L'eau reste a 18-22°C en aout, rafraichissante mais pas froide pour la plupart des races. Les chiens a poil court (levriers, Weimaraner) peuvent entrer et sortir librement sans se refroidir. Apportez toujours de l'eau douce pour boire : la Baltique est encore suffisamment salee pour provoquer une deshydratation si votre chien en avale des quantites importantes.` },
      { q: 'Quelle station balneaire polonaise est la meilleure pour les chiens ?', a: `Sopot pour l'atmosphere et l'elegance : la plus longue jetee d'Europe, le boulevard Monte Cassino, les meilleurs restaurants, mais chere en aout a la haute saison. Kolobrzeg pour la plus longue plage et la zone canine la mieux organisee : 18 km de plage, zone canine ouest officiellement balisee, 40% moins chere que Sopot, et les parcs de promenade le long de la mer sont tous accessibles aux chiens. Swinoujscie pour le moins de foule et l'experience germano-polonaise duale : l'ile allemande d'Usedom est accessible par bac gratuit, vous donnant acces aux plages canines de deux pays depuis une seule base. Pour les familles qui arrivent en voiture d'Allemagne ou de Scandinavie, Swinoujscie est le point d'entree le plus logique.` },
      { q: 'Puis-je parcourir toute la cote baltique en voiture avec un chien ?', a: `Oui. La route cotiere E28 va de Swinoujscie a travers Kolobrzeg jusqu'a Gdansk (Sopot), puis continue au nord a travers Gdynia et passe la frontiere en Lituanie vers Palanga, puis remonte a travers la Lettonie et l'Estonie vers Parnu et Tallinn. Un trajet complet de Swinoujscie a Tallinn couvre environ 1 200 km et prend 10-12 heures sans arret. Divise sur 3-4 jours avec des haltes dans les destinations de ce guide, c'est l'un des meilleurs road trips canins d'Europe : chaque station sur la route dispose d'une plage canine, d'une zone sans laisse officielle, ou des deux.` },
      { q: 'Quel est le meilleur mois pour la Baltique avec un chien ?', a: `Aout. L'eau est la plus chaude (18-22°C dans les 8 destinations), la temperature de l'air est de 20-22°C, les brises baltiques maintiennent une faible humidite cotiere, et la saison des plages canines bat son plein partout. Juillet est egalement excellent (eau un peu plus fraiche a 16-20°C, un peu moins encombre). Septembre est calme et souvent deux fois moins cher qu'aout, avec une temperature de l'air qui descend a 15-18°C : excellent pour les chiens mais un peu frais pour les proprietaires qui veulent se baigner. A partir d'octobre c'est la basse saison : la plupart des plages canines restent officiellement ouvertes, mais les stations entrent en hibernation.` },
    ],
    relatedHeading: 'Voir aussi',
  },
  es: {
    eyebrow: 'RIVIERA BALTICA 2026 · COSTA DOG-FRIENDLY',
    title: `Costa baltica pet-friendly 2026: 8 destinos de playa de Polonia a Estonia`,
    intro: `La costa baltica es el destino estival de mas rapido crecimiento de Europa: mas fresco que el Mediterraneo, con una cultura de playa dog-friendly imposible de encontrar en Francia, Espana o Italia. Desde los elegantes balnearios con embarcadero de Polonia hasta las ciudades termales de Estonia, los perros no solo son tolerados en las playas balticas: tienen zonas oficiales designadas, acceso durante todo el ano y una cultura local construida en torno a la vida al aire libre con animales. Las temperaturas de agosto se mantienen en 20-22°C, el agua a 18-22°C, y la brisa maritima hace de esta costa europea la mas segura para todas las razas en verano.`,
    pickHeading: '8 destinos de playa balticos donde los perros son bienvenidos todo el verano',
    whyHere: 'Por que aqui',
    hotelLabel: 'Donde alojarse',
    seeDestCta: 'Guia completa →',
    hotelCta: 'Ver disponibilidad →',
    augustLabel: 'Max media agosto',
    practicalHeading: 'Info practica costa baltica para propietarios de perros',
    practical: [
      { h: 'Reglas playas caninas Baltico vs Mediterraneo', p: `Alemania opera un sistema formal de Hundestrand: las playas caninas oficiales estan senalizadas con carteles claros, abiertas todo el ano en la mayoria de balnearios, sin prohibicion de junio a septiembre. Polonia tiene zonas caninas designadas en los planos oficiales de las ciudades (Sopot, Kolobrzeg, Swinoujscie, Gdynia) que son permanentes. Lituania (Palanga) y Estonia (Parnu) tienen ambas zonas senalizadas oficiales con acceso todo el mes de agosto. Letonia ofrece libertad total: ninguna prohibicion estacional en las playas en ninguna parte de la costa. Comparalo con Francia (prohibicion total en las playas vigiladas de junio a septiembre), Espana (prohibicion de junio a septiembre en la mayoria de playas de la Costa) e Italia (prohibicion en la mayoria de playas adriaticas y tirrenicas todo el verano). El Baltico es la capital europea de las playas caninas.` },
      { h: 'El agua baltica para los perros: es segura?', p: `El Baltico es el mar mayor menos salado del mundo (8-12 por mil frente a 38 por mil del Mediterraneo). Los perros pueden nadar libremente sin el dano al pelaje ni la irritacion ocular que provoca la sal mediterranea, pero el agua sigue siendo suficientemente salina como para que beberla sea perjudicial. Trae siempre agua dulce para tu perro despues de nadar. La baja salinidad tambien significa que no hay problema de medusas a lo largo de la costa polaca y alemana en agosto. La temperatura del agua se mantiene entre 18-22°C en agosto en los 8 destinos, nunca incomodamente fria para la mayoria de las razas.` },
      { h: 'Llegar a la costa baltica en tren y ferry', p: `Berlin a Rugen: 3h en tren directo (IC) hasta Binz o Bergen auf Rugen. Varsovia a Sopot/Gdansk: 3h30 en Intercity expres (perros en jaula o con correa, suplemento moderado). Vilnius a Palanga: 3h en autobus (no hay tren directo). Riga a Parnu: 2h en autobus (no hay tren directo, autocares frecuentes). En ferry: Rostock a Helsinki (Tallink, 28h, perros en camarote suplemento o perrera), Travemunde a Helsinki (Finnlines, 28h), Travemunde a Tallin (Tallink). Los perros son admitidos en todos los ferris balticos con suplemento moderado. Desde Europa occidental, la carretera costera E28 desde Szczecin a traves de todos los balnearios polacos y subiendo hasta Lituania es uno de los grandes road trips caninos de Europa.` },
      { h: 'Baltico vs Mediterraneo para perros braquicefalos', p: `La costa baltica es la costa europea mas segura en verano para razas de cara plana (bulldogs, carlinos, boxers, Boston terriers) y para perros mayores. La temperatura del aire en agosto en los 8 destinos se mantiene en 20-22°C: sin calor de asfalto por encima de 30°C, sin riesgo de pavimento, sin pico de humedad. El agua a 18-22°C es refrescante en lugar de fria, y la baja salinidad es mas suave para la piel y el pelaje. Comparalo con el Mediterraneo en agosto: aire a 30-38°C, asfalto a 50-60°C, concentracion de sal que irrita los ojos y la piel despues de cada bano. El Baltico no es un compromiso para perros sensibles al calor: es activamente el destino correcto.` },
    ],
    faqHeading: 'Preguntas frecuentes',
    faqs: [
      { q: 'Es el Mar Baltico seguro para que naden los perros?', a: `Si. La baja salinidad (8-12 por mil) es mucho mas suave que el Mediterraneo o el Atlantico. Aclara el pelaje con agua dulce despues de nadar, principalmente para eliminar la arena y cualquier residuo de la superficie. No hay problema de medusas a lo largo de la costa baltica polaca y alemana en verano. El agua se mantiene a 18-22°C en agosto, refrescante pero no fria para la mayoria de las razas. Los perros de pelo corto (galgos, Weimaraners) pueden entrar y salir libremente sin enfriarse. Trae siempre agua dulce para beber: el Baltico sigue siendo suficientemente salado como para causar deshidratacion si tu perro traga cantidades significativas.` },
      { q: 'Que balneario polaco es mejor para los perros?', a: `Sopot por la atmosfera y la elegancia: el embarcadero mas largo de Europa, el bulevar Monte Cassino, los mejores restaurantes, pero caro en el pico de agosto. Kolobrzeg por la playa mas larga y la zona canina mejor organizada: 18 km de playa, zona canina oeste oficialmente senalizada, 40% mas barato que Sopot, y los parques del paseo maritimo son todos accesibles para perros. Swinoujscie por las menos aglomeraciones y la experiencia germanopolaca dual: la isla alemana de Usedom esta a un ferry gratuito de distancia, dando acceso a las playas caninas de dos paises desde una sola base. Para las familias que llegan en coche desde Alemania o Escandinavia, Swinoujscie es el punto de entrada mas logico.` },
      { q: 'Puedo recorrer toda la costa baltica en coche con un perro?', a: `Si. La carretera costera E28 va desde Swinoujscie a traves de Kolobrzeg hasta Gdansk (Sopot), luego continua al norte a traves de Gdynia y cruza la frontera hacia Lituania hacia Palanga, y desde alli sube a traves de Letonia y hacia Estonia hacia Parnu y Tallin. Un trayecto completo de Swinoujscie a Tallin cubre aproximadamente 1.200 km y lleva 10-12 horas sin parar. Dividido en 3-4 dias con paradas nocturnas en los destinos de esta guia, es uno de los mejores road trips caninos de Europa: cada balneario en la ruta tiene una playa canina, una zona sin correa oficial, o ambas.` },
      { q: 'Cual es el mejor mes para el Baltico con un perro?', a: `Agosto. El agua es mas calida (18-22°C en los 8 destinos), la temperatura del aire es de 20-22°C, las brisas balticas mantienen la humedad costera baja, y la temporada de playas caninas esta en pleno apogeo en todos lados. Julio es tambien excelente (agua un poco mas fresca a 16-20°C, un poco menos concurrido). Septiembre es tranquilo y a menudo la mitad del precio de agosto, con la temperatura del aire bajando a 15-18°C: excelente para los perros pero un poco fresco para los propietarios que quieren nadar. A partir de octubre es temporada baja: la mayoria de las playas caninas siguen oficialmente abiertas, pero las ciudades balnearias entran en hibernacion.` },
    ],
    relatedHeading: 'Ver tambien',
  },
  pt: {
    eyebrow: 'RIVIERA BALTICA 2026 · COSTA DOG-FRIENDLY',
    title: `Costa baltica pet-friendly 2026: 8 destinos de praia da Polonia a Estonia`,
    intro: `A costa baltica e o destino de verao com crescimento mais rapido da Europa: mais fresca do que o Mediterraneo, com uma cultura de praia dog-friendly impossivel de encontrar em Franca, Espanha ou Italia. Desde os elegantes resorts com cais da Polonia ate as cidades termais da Estonia, os caes nao sao apenas tolerados nas praias balticas: tem zonas oficiais designadas, acesso durante todo o ano e uma cultura local construida em torno da vida ao ar livre com animais. As temperaturas de agosto ficam nos 20-22°C, a agua nos 18-22°C, e a brisa maritima torna-a a costa europeia mais segura para qualquer raca no verao.`,
    pickHeading: '8 destinos de praia balticos onde os caes sao bem-vindos todo o verao',
    whyHere: 'Porque aqui',
    hotelLabel: 'Onde ficar',
    seeDestCta: 'Guia completo →',
    hotelCta: 'Ver disponibilidade →',
    augustLabel: 'Max media agosto',
    practicalHeading: 'Info pratica costa baltica para donos de caes',
    practical: [
      { h: 'Regras praias caninas Baltico vs Mediterraneo', p: `A Alemanha opera um sistema formal de Hundestrand: as praias caninas oficiais estao sinalizadas com placas claras, abertas durante todo o ano na maioria dos resorts, sem proibicao de junho a setembro. A Polonia tem zonas caninas designadas nos mapas oficiais das cidades (Sopot, Kolobrzeg, Swinoujscie, Gdynia) que sao permanentes. A Lituania (Palanga) e a Estonia (Parnu) tem ambas zonas sinalizadas oficiais com acesso durante todo o mes de agosto. A Letonia oferece liberdade total: sem proibicao sazonal em praias em nenhuma parte da costa. Compare com a Franca (proibicao total nas praias vigiadas de junho a setembro), a Espanha (proibicao de junho a setembro na maioria das praias da Costa) e a Italia (proibicao na maioria das praias adriaticas e tirrenicas durante todo o verao). O Baltico e a capital europeia das praias caninas.` },
      { h: 'A agua baltica para os caes: e segura?', p: `O Baltico e o mar maior menos salgado do mundo (8-12 por mil vs 38 por mil do Mediterraneo). Os caes podem nadar livremente sem os danos no pelo ou a irritacao ocular que o sal mediterraneo provoca, mas a agua ainda e suficientemente salina para que bebe-la seja prejudicial. Traga sempre agua doce para o seu cao depois de nadar. A baixa salinidade tambem significa que nao ha problema de medusas ao longo da costa polaca e alema em agosto. A temperatura da agua mantém-se nos 18-22°C em agosto em todos os 8 destinos, nunca desconfortavelmente fria para a maioria das racas.` },
      { h: 'Chegar a costa baltica de comboio e ferry', p: `Berlim a Rugen: 3h de comboio direto (IC) ate Binz ou Bergen auf Rugen. Varsovia a Sopot/Gdansk: 3h30 de Intercity expresso (caes em gaiola ou a trela, taxa moderada). Vilnius a Palanga: 3h de autocarro (sem comboio direto). Riga a Parnu: 2h de autocarro (sem comboio direto, autocarros frequentes). De ferry: Rostock a Helsinquia (Tallink, 28h, caes em camarote com suplemento ou canil), Travemunde a Helsinquia (Finnlines, 28h), Travemunde a Talim (Tallink). Os caes sao aceites em todos os ferries balticos com suplemento moderado. Desde a Europa ocidental, a estrada costeira E28 desde Szczecin por todos os resorts polacos e subindo ate a Lituania e um dos melhores road trips caninos da Europa.` },
      { h: 'Baltico vs Mediterraneo para caes braquicefalicos', p: `A costa baltica e a costa europeia mais segura no verao para racas de cara achatada (bulldogs, carlins, boxers, Boston terriers) e para caes idosos. A temperatura do ar em agosto em todos os 8 destinos mantém-se nos 20-22°C: sem calor de asfalto acima dos 30°C, sem risco de pavimento, sem pico de humidade. A agua nos 18-22°C e refrescante em vez de fria, e a baixa salinidade e mais suave para a pele e o pelo. Compare com o Mediterraneo em agosto: ar a 30-38°C, asfalto a 50-60°C, concentracao de sal que irrita os olhos e a pele apos cada mergulho. O Baltico nao e um compromisso para caes sensiveis ao calor: e ativamente o destino certo.` },
    ],
    faqHeading: 'Perguntas frequentes',
    faqs: [
      { q: 'O Mar Baltico e seguro para os caes nadarem?', a: `Sim. A baixa salinidade (8-12 por mil) e muito mais suave do que o Mediterraneo ou o Atlantico. Passe agua doce pelo pelo depois de nadar, principalmente para remover areia e qualquer residuo de superficie. Sem problema de medusas ao longo da costa baltica polaca e alema no verao. A agua mantém-se nos 18-22°C em agosto, refrescante mas nao fria para a maioria das racas. Os caes de pelo curto (galgas, Weimaraners) podem entrar e sair livremente sem arrefecer. Traga sempre agua doce para beber: o Baltico ainda e suficientemente salgado para causar desidratacao se o seu cao engolir quantidades significativas.` },
      { q: 'Qual resort polaco e melhor para os caes?', a: `Sopot pela atmosfera e elegancia: o cais mais longo da Europa, o bulevar Monte Cassino, os melhores restaurantes, mas caro na alta temporada de agosto. Kolobrzeg pela praia mais longa e a zona canina mais bem organizada: 18 km de praia, zona canina oeste oficialmente sinalizada, 40% mais barato do que Sopot, e os parques do passeio maritimo sao todos acessiveis a caes. Swinoujscie pela menor aglomeracao e a experiencia germano-polaca dupla: a ilha alema de Usedom esta a um ferry gratuito de distancia, dando acesso as praias caninas de dois paises a partir de uma unica base. Para familias que chegam de carro da Alemanha ou da Escandinavias, Swinoujscie e o ponto de entrada mais logico.` },
      { q: 'Posso percorrer toda a costa baltica de carro com um cao?', a: `Sim. A estrada costeira E28 vai de Swinoujscie por Kolobrzeg ate Gdansk (Sopot), depois continua para norte por Gdynia e cruza a fronteira para a Lituania em direcao a Palanga, e dai sobe pela Letonia e para a Estonia em direcao a Parnu e Talim. Um percurso completo de Swinoujscie a Talim cobre aproximadamente 1.200 km e demora 10-12 horas sem parar. Dividido em 3-4 dias com paragens nocturnas nos destinos deste guia, e um dos melhores road trips caninos da Europa: cada resort na rota tem uma praia canina, uma zona oficial sem trela, ou ambas.` },
      { q: 'Qual e o melhor mes para o Baltico com um cao?', a: `Agosto. A agua e mais quente (18-22°C em todos os 8 destinos), a temperatura do ar e de 20-22°C, as brisas balticas mantem a humidade costeira baixa, e a temporada de praias caninas esta em pleno funcionamento em todo o lado. Julho tambem e excelente (agua um pouco mais fresca nos 16-20°C, um pouco menos lotado). Setembro e calmo e frequentemente metade do preco de agosto, com a temperatura do ar a descer para 15-18°C: excelente para os caes mas um pouco fresco para os donos que querem nadar. A partir de outubro e baixa temporada: a maioria das praias caninas mantém-se oficialmente abertas, mas as cidades turistica entram em hibernacao.` },
    ],
    relatedHeading: 'Ver tambem',
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

      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-700 via-teal-600 to-blue-500 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 40%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-100 mb-3">🌊 {t.eyebrow}</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{t.title}</h1>
          <p className="text-lg sm:text-xl text-cyan-50 leading-relaxed">{t.intro}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-8">{t.pickHeading}</h2>
        <div className="space-y-5">
          {PICKS.map((p, i) => (
            <article key={p.slug} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <header className="px-5 sm:px-7 py-4 bg-gradient-to-r from-cyan-50 to-teal-50 border-b border-stone-200 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-2xl font-black text-cyan-700">#{i + 1}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  <Link href={`/${locale}${p.destPath}`} className="hover:text-cyan-700">{p.name}</Link>
                </h3>
                <span className="text-sm text-stone-600">{p.country}</span>
                <span className="bg-cyan-100 text-cyan-900 text-xs font-bold px-3 py-1 rounded-full">
                  {t.augustLabel} {p.augustTemp}
                </span>
                <span className="ml-auto bg-cyan-100 text-cyan-800 text-xs font-bold px-3 py-1 rounded-full">
                  🐾 {p.dogBeachNote}
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
                  <Link href={`/${locale}${p.destPath}`} className="text-sm font-semibold text-cyan-700 hover:text-cyan-900 hover:underline">
                    {t.seeDestCta}
                  </Link>
                  <a
                    href={buildAllezDestLink(p.name, p.country, `${CAMPAIGN_BASE}-${p.slug}`, 5)}
                    target="_blank"
                    rel="noopener sponsored"
                    className="text-sm font-semibold text-stone-700 hover:text-cyan-700 hover:underline"
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
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">🌊 {t.practicalHeading}</h2>
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
        href={buildAllezDestLink('Baltic', 'Europe', `${CAMPAIGN_BASE}-sticky`, 5)}
      />
    </main>
  )
}
