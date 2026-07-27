import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { GuideFooter } from '../_components/GuideFooter'
import hotels from '@/data/hotels.json'
import { valueSort } from '@/lib/hotelSort'
import { getLocalizedCityName } from '@/lib/cityNames'

// Top 3 value-sorted pet-friendly hotels per pick, keyed by destination slug.
const HOTELS_BY_DEST: Record<string, typeof hotels> = {}
const hotelFrom = (l: string) => (l === 'fr' ? 'dès' : l === 'es' || l === 'pt' ? 'desde' : 'from')
const hotelNoFee = (l: string) => (l === 'fr' ? 'sans supplément' : l === 'es' ? 'sin cargo mascota' : l === 'pt' ? 'sem suplemento' : 'no pet fee')

const SLUG = 'cool-august-dog-europe'
const CAMPAIGN_BASE = 'cool-august'

const STICKY_LABELS: Record<string, { label: string; cta: string }> = {
  en: { label: 'Cool August pet-friendly hotels', cta: 'See hotels' },
  fr: { label: 'Hotels pet-friendly frais en aout', cta: 'Voir les hotels' },
  es: { label: 'Hoteles pet-friendly frescos en agosto', cta: 'Ver hoteles' },
  pt: { label: 'Hoteis pet-friendly frescos em agosto', cta: 'Ver hoteis' },
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
    en: `Where to Go with Your Dog in August: 8 Cool European Cities Under 25C (2026)`,
    fr: `Ou partir avec son chien en aout : 8 villes europeennes fraiches a moins de 25C (2026)`,
    es: `Donde ir con tu perro en agosto: 8 ciudades europeas frescas a menos de 25C (2026)`,
    pt: `Para onde ir com o seu cao em agosto: 8 cidades europeias frescas a menos de 25C (2026)`,
  }
  const descriptions: Record<string, string> = {
    en: `Eight European cities where August temperatures stay under 25C: the safe zone for dogs that struggle in heat. Baltic capitals, Belgian canal cities, and Central European gems with verified pet-friendly hotels, dog beaches, and off-leash parks.`,
    fr: `Huit villes europeennes ou la temperature d'aout reste sous 25C : la zone sure pour les chiens sensibles a la chaleur. Capitales baltes, villes flamandes et perles d'Europe centrale avec hotels pet-friendly verifies, plages canines et parcs sans laisse.`,
    es: `Ocho ciudades europeas donde la temperatura de agosto se mantiene bajo 25C: la zona segura para los perros que sufren con el calor. Capitales balticas, ciudades flamencas y joyas de Europa central con hoteles pet-friendly verificados, playas caninas y parques sin correa.`,
    pt: `Oito cidades europeias onde a temperatura de agosto se mantém abaixo de 25C: a zona segura para caes que sofrem com o calor. Capitais balticas, cidades flamengas e joias da Europa central com hoteis pet-friendly verificados, praias caninas e parques sem trela.`,
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
    slug: 'tallinn',
    name: 'Tallinn',
    country: 'Estonia',
    destPath: '/destinations/tallinn',
    augustTemp: '20C',
    whyEn: `The Baltic breeze keeps Tallinn under 22C even in August, making it the coolest capital on the European mainland in summer. Pirita beach has a dedicated dog zone where your dog can run free along the sand. Kadriorg Park covers 70 hectares and accepts leashed dogs year-round, with wide shaded paths ideal for a midday walk. Trams accept leashed dogs free of charge throughout the city. Prices are roughly half what you pay in Scandinavia for the same quality of hotel.`,
    whyFr: `La brise baltique maintient Tallinn sous 22C meme en aout, ce qui en fait la capitale la plus fraiche du continent europeen en ete. La plage de Pirita dispose d'une zone canine dedicee ou votre chien peut courir librement sur le sable. Le Parc Kadriorg couvre 70 hectares et accueille les chiens en laisse toute l'annee, avec de larges sentiers ombrages ideaux pour une balade en milieu de journee. Les tramways acceptent les chiens en laisse gratuitement dans toute la ville. Les prix sont environ la moitie de ce que l'on paye en Scandinavie pour le meme niveau de confort.`,
    whyEs: `La brisa baltica mantiene Tallinn por debajo de 22C incluso en agosto, lo que la convierte en la capital mas fresca del continente europeo en verano. La playa de Pirita tiene una zona canina dedicada donde tu perro puede correr libremente por la arena. El Parque Kadriorg abarca 70 hectareas y acepta perros con correa todo el ano, con amplios senderos sombreados ideales para un paseo a mediodia. Los tranvias admiten perros con correa de forma gratuita en toda la ciudad. Los precios son aproximadamente la mitad de lo que se paga en Escandinavia por el mismo nivel de hotel.`,
    whyPt: `A brisa baltica mantem Talim abaixo dos 22C mesmo em agosto, tornando-a a capital mais fresca do continente europeu no verao. A praia de Pirita tem uma zona canina dedicada onde o seu cao pode correr livremente pela areia. O Parque Kadriorg cobre 70 hectares e aceita caes a trela todo o ano, com amplos caminhos sombreados ideais para um passeio a meio do dia. Os eletricos aceitam caes a trela gratuitamente em toda a cidade. Os precos sao cerca de metade do que se paga na Escandinavia pelo mesmo nivel de hotel.`,
    hotelName: 'Hotel Telegraaf Autograph Collection',
    hotelEn: `Hotel Telegraaf Autograph Collection is a 5-star property in the historic former telegraph building of the Old Town, with a spa courtyard where you can decompress after a walk. Dogs up to 10 kg are welcomed at a modest fee, and the central location puts Kadriorg Park and the old town walls within 15 minutes on foot.`,
    hotelFr: `Hotel Telegraaf Autograph Collection est un 5 etoiles dans l'ancien batiment du telegraphe de la vieille ville, avec une cour spa ideale pour decompresser apres une balade. Les chiens jusqu'a 10 kg sont acceptes avec un supplement modere, et l'emplacement central permet d'atteindre le Parc Kadriorg et les remparts en 15 minutes a pied.`,
    hotelEs: `Hotel Telegraaf Autograph Collection es un 5 estrellas en el antiguo edificio del telegrafo del casco antiguo, con un patio spa perfecto para descansar tras un paseo. Se admiten perros hasta 10 kg con suplemento moderado, y la ubicacion central permite llegar al Parque Kadriorg y las murallas en 15 minutos a pie.`,
    hotelPt: `Hotel Telegraaf Autograph Collection e um 5 estrelas no antigo edificio do telegrafo da cidade velha, com um patio spa ideal para descansar apos um passeio. Caes ate 10 kg sao aceites com taxa moderada, e a localizacao central permite chegar ao Parque Kadriorg e as muralhas em 15 minutos a pe.`,
  },
  {
    slug: 'riga',
    name: 'Riga',
    country: 'Latvia',
    destPath: '/destinations/riga',
    augustTemp: '21C',
    whyEn: `Riga is the Art Nouveau capital of Europe, with an architectural heritage that makes every walk in the city centre feel like an open-air museum. The Jurmala beach resort is 30 minutes by suburban train and has a dedicated dog beach section in August. Mezaparks forest park on the city edge offers off-leash zones in a pine forest that stays cool all summer. Beer garden terrace culture in Riga is very dog-tolerant, so your dog joins you at most outdoor tables. The Daugava riverside walk is a flat and wide promenade perfect for an early morning run.`,
    whyFr: `Riga est la capitale Art nouveau d'Europe, avec un patrimoine architectural qui fait de chaque balade dans le centre-ville une experience de musee a ciel ouvert. La station balneaire de Jurmala est a 30 minutes en train de banlieue et dispose d'une section de plage canine dedicee en aout. Le parc forestier Mezaparks en bordure de ville offre des zones sans laisse dans une foret de pins qui reste fraiche tout l'ete. La culture des terrasses de biergarten a Riga est tres tolerante aux chiens, votre chien vous accompagne donc a la plupart des tables en terrasse. La promenade le long de la Daugava est un boulevard plat et large parfait pour un footing matinal.`,
    whyEs: `Riga es la capital del Art Nouveau europeo, con un patrimonio arquitectonico que convierte cada paseo por el centro en un museo al aire libre. La estacion balnearia de Jurmala esta a 30 minutos en tren de cercanias y tiene una seccion de playa canina dedicada en agosto. El parque forestal Mezaparks en el borde de la ciudad ofrece zonas sin correa en un bosque de pinos que se mantiene fresco todo el verano. La cultura de las terrazas de biergarten en Riga es muy tolerante con los perros, asi que tu perro te acompana en la mayoria de mesas exteriores. El paseo maritimo junto al Daugava es un bulevar plano y amplio perfecto para un trote matutino.`,
    whyPt: `Riga e a capital da Arte Nova europeia, com um patrimonio arquitectonico que torna cada passeio pelo centro numa experiencia de museu ao ar livre. A estancia balnearia de Jurmala fica a 30 minutos de comboio suburbano e tem uma zona de praia canina dedicada em agosto. O parque florestal Mezaparks na orla da cidade oferece zonas sem trela numa floresta de pinheiros que se mantem fresca todo o verao. A cultura das esplanadas de cervejaria em Riga e muito tolerante com caes, pelo que o seu cao o acompanha na maioria das mesas ao ar livre. O passeio junto ao rio Daugava e um boulevard plano e largo perfeito para uma corrida matinal.`,
    hotelName: 'Grand Hotel Kempinski Riga',
    hotelEn: `Grand Hotel Kempinski Riga is a 5-star property on the banks of the Daugava river, with direct views of the Old Town across the water. Pets are welcomed at a modest fee, and the riverside location gives you immediate access to the flat riverside walk for early or late walks. The hotel's central position also puts the Art Nouveau district within a 10-minute walk.`,
    hotelFr: `Grand Hotel Kempinski Riga est un 5 etoiles sur les rives de la Daugava, avec une vue directe sur la vieille ville de l'autre cote de l'eau. Les animaux sont acceptes avec un supplement modere, et la situation riveraine donne un acces immediat a la promenade plate pour les balades matinales ou tardives. La position centrale de l'hotel met egalement le quartier Art nouveau a 10 minutes a pied.`,
    hotelEs: `Grand Hotel Kempinski Riga es un 5 estrellas a orillas del rio Daugava, con vistas directas al casco antiguo al otro lado del agua. Se admiten mascotas con suplemento moderado, y la ubicacion junto al rio da acceso inmediato al paseo llano para paseos matinales o tardios. La posicion central del hotel tambien pone el barrio Art Nouveau a 10 minutos a pie.`,
    hotelPt: `Grand Hotel Kempinski Riga e um 5 estrelas nas margens do rio Daugava, com vistas directas para a cidade velha do outro lado da agua. Os animais de estimacao sao aceites com taxa moderada, e a localizacao ribeirinha da acesso imediato ao passeio plano para caminhadas matinais ou tardias. A posicao central do hotel coloca tambem o bairro Arte Nova a 10 minutos a pe.`,
  },
  {
    slug: 'vilnius',
    name: 'Vilnius',
    country: 'Lithuania',
    destPath: '/destinations/vilnius',
    augustTemp: '21C',
    whyEn: `Vilnius is the Baroque jewel of the Baltics, with a UNESCO-listed old town of churches, courtyards, and cobbled lanes. The Bernardine Garden adjacent to the old town is open to leashed dogs and provides a shaded green escape in the centre. The Neris riverbank walk runs 6 km flat from the city centre outward, ideal for an early or late-evening walk when the stone streets have radiated their heat. Vingis Park on the western edge of the city has dedicated dog runs. Outdoor restaurant terraces throughout the city are universally dog-tolerant in the Lithuanian tradition.`,
    whyFr: `Vilnius est le joyau baroque des pays Baltes, avec une vieille ville classee UNESCO pour sa densite d'eglises, de cours interieures et de ruelles pavees. Le Jardin Bernardin adjacent a la vieille ville est ouvert aux chiens en laisse et offre une echappee verte ombragee en plein centre. La promenade le long du Neris s'etend sur 6 km plats depuis le centre-ville, ideale pour une balade tot le matin ou en soiree. Le Parc Vingis a l'ouest de la ville dispose de runs canins dedies. Les terrasses de restaurants en plein air dans toute la ville sont universellement tolerantes aux chiens selon la tradition lituanienne.`,
    whyEs: `Vilna es la joya barroca de los estados balticos, con un casco antiguo declarado Patrimonio de la Humanidad por su densidad de iglesias, patios y callejones adoquinados. El Jardin Bernardino adyacente al casco antiguo esta abierto a los perros con correa y ofrece un refugio verde sombreado en el centro. El paseo por la orilla del Neris discurre 6 km llanos desde el centro de la ciudad hacia el exterior, ideal para un paseo temprano o al atardecer. El Parque Vingis al oeste de la ciudad tiene zonas de carrera caninas dedicadas. Las terrazas de los restaurantes al aire libre en toda la ciudad son universalmente tolerantes con los perros segun la tradicion lituana.`,
    whyPt: `Vilnius e a joia barroca dos estados balticos, com uma cidade velha classificada pela UNESCO pela sua densidade de igrejas, patios e vielas de paralelepipedos. O Jardim Bernardino adjacente a cidade velha esta aberto a caes a trela e oferece uma escapatoria verde com sombra no centro. O passeio a beira do rio Neris percorre 6 km planos a partir do centro da cidade, ideal para uma caminhada matinal ou ao fim da tarde. O Parque Vingis na extremidade ocidental da cidade tem percursos caninos dedicados. As esplanadas dos restaurantes em toda a cidade sao universalmente tolerantes com caes segundo a tradicao lituana.`,
    hotelName: 'Stikliai Hotel',
    hotelEn: `Stikliai Hotel is a boutique 5-star in the heart of the old town, on one of the quietest cobbled streets of the Baroque quarter. Pets are accepted on request, and the hotel has a garden courtyard where your dog can rest in the shade between walks. The location is literally inside the UNESCO zone, minutes from the Bernardine Garden.`,
    hotelFr: `Stikliai Hotel est un boutique 5 etoiles au coeur de la vieille ville, dans l'une des rues pavees les plus calmes du quartier baroque. Les animaux sont acceptes sur demande, et l'hotel dispose d'une cour jardin ou votre chien peut se reposer a l'ombre entre les balades. L'emplacement est litteralement a l'interieur de la zone UNESCO, a quelques minutes du Jardin Bernardin.`,
    hotelEs: `Stikliai Hotel es un boutique 5 estrellas en el corazon del casco antiguo, en una de las calles adoquinadas mas tranquilas del barrio barroco. Las mascotas se aceptan bajo peticion, y el hotel tiene un patio jardin donde tu perro puede descansar a la sombra entre los paseos. La ubicacion esta literalmente dentro de la zona UNESCO, a pocos minutos del Jardin Bernardino.`,
    hotelPt: `Stikliai Hotel e um boutique 5 estrelas no coracao da cidade velha, numa das ruas de paralelepipedos mais calmas do bairro barroco. Os animais de estimacao sao aceites a pedido, e o hotel tem um patio jardim onde o seu cao pode descansar a sombra entre os passeios. A localizacao esta literalmente dentro da zona UNESCO, a poucos minutos do Jardim Bernardino.`,
  },
  {
    slug: 'bruges',
    name: 'Bruges',
    country: 'Belgium',
    destPath: '/destinations/bruges',
    augustTemp: '22C',
    whyEn: `Bruges stays under 23C in August and is one of the most walkable medieval cities in Europe, with canal towpaths offering a complete network of flat walking routes that require no admission and accept dogs throughout. Minnewater Park (the Lake of Love) is a flat green space with leashed dogs welcome alongside the water. Canal boat tours do not allow dogs, but the towpaths alongside every canal are a free and arguably more intimate alternative at your own pace. The city centre is compact enough to cover completely on foot, so you never need public transport.`,
    whyFr: `Bruges reste sous 23C en aout et est l'une des villes medievales les plus praticables a pied d'Europe, avec des chemins de halage qui offrent un reseau complet d'itineraires plats ne necessitant aucun droit d'entree et acceptant les chiens partout. Le Parc Minnewater (le Lac d'Amour) est un espace vert plat avec chiens en laisse les bienvenus au bord de l'eau. Les bateaux de visite des canaux n'admettent pas les chiens, mais les chemins de halage longeant chaque canal constituent une alternative gratuite et peut-etre plus intime a votre propre rythme. Le centre-ville est suffisamment compact pour etre couvert entierement a pied, sans jamais avoir besoin des transports en commun.`,
    whyEs: `Brujas se mantiene por debajo de 23C en agosto y es una de las ciudades medievales mas transitables de Europa, con caminos de sirga que ofrecen una red completa de rutas planas sin entrada y con perros permitidos en todo momento. El Parque Minnewater (el Lago del Amor) es un espacio verde llano con perros con correa bienvenidos junto al agua. Los botes turisticos de los canales no permiten perros, pero los caminos de sirga junto a cada canal son una alternativa gratuita y posiblemente mas intima a tu propio ritmo. El centro de la ciudad es suficientemente compacto para recorrerlo completamente a pie, sin necesidad de transporte publico.`,
    whyPt: `Bruges mantem-se abaixo dos 23C em agosto e e uma das cidades medievais mais percorriveis a pe da Europa, com caminhos de sirga que oferecem uma rede completa de percursos planos sem entrada e com caes permitidos ao longo de todo o percurso. O Parque Minnewater (o Lago do Amor) e um espaco verde plano com caes a trela bem-vindos junto a agua. Os barcos turisticos dos canais nao permitem caes, mas os caminhos de sirga ao longo de cada canal sao uma alternativa gratuita e porventura mais intima ao seu proprio ritmo. O centro da cidade e suficientemente compacto para ser percorrido inteiramente a pe, sem necessitar de transporte publico.`,
    hotelName: 'Hotel Heritage',
    hotelEn: `Hotel Heritage is a boutique 4-star canal house in the historic centre, with no extra charge for pets. The building dates to the 19th century, the rooms are quiet and well-appointed, and the location on the Niklaasstraat puts you 5 minutes from both the Market Square and the Minnewater Park towpath. Breakfast is included, making it one of the best-value pet-friendly options in Bruges.`,
    hotelFr: `Hotel Heritage est un boutique 4 etoiles dans une maison de canal du centre historique, sans supplement pour les animaux. Le batiment date du XIXe siecle, les chambres sont calmes et bien equipees, et l'emplacement sur la Niklaasstraat vous place a 5 minutes de la Grand-Place et du chemin de halage du Minnewater. Le petit-dejeuner est inclus, ce qui en fait l'une des meilleures options pet-friendly rapport qualite-prix a Bruges.`,
    hotelEs: `Hotel Heritage es un boutique 4 estrellas en una casa de canal del centro historico, sin suplemento por mascotas. El edificio data del siglo XIX, las habitaciones son tranquilas y bien equipadas, y la ubicacion en la Niklaasstraat te coloca a 5 minutos de la Plaza del Mercado y del camino de sirga del Minnewater. El desayuno esta incluido, lo que lo convierte en una de las mejores opciones pet-friendly en relacion calidad-precio en Brujas.`,
    hotelPt: `Hotel Heritage e um boutique 4 estrelas numa casa de canal do centro historico, sem custo extra para animais de estimacao. O edificio data do seculo XIX, os quartos sao calmos e bem equipados, e a localizacao na Niklaasstraat coloca-o a 5 minutos da Praca do Mercado e do caminho de sirga do Minnewater. O pequeno-almoco esta incluido, tornando-o uma das melhores opcoes pet-friendly em termos de relacao qualidade-preco em Bruges.`,
  },
  {
    slug: 'ghent',
    name: 'Ghent',
    country: 'Belgium',
    destPath: '/destinations/ghent',
    augustTemp: '22C',
    whyEn: `Ghent is Belgium's student city and considerably more relaxed than Bruges, with a local culture that treats dogs as a normal part of daily life. Citadelpark is a 12-hectare green space with an off-leash zone, a short tram ride from the city centre. The Graslei and Korenlei waterfront terraces along the inner harbour are lined with bar and restaurant terraces that all accept dogs at outdoor tables. The exterior walk around Gravensteen castle follows the canal and is dog-friendly throughout. Ghent also has a covered market (Vrijdagmarkt) where dogs on leash are tolerated at most stalls.`,
    whyFr: `Gand est la ville etudiante de Belgique, nettement plus detendue que Bruges, avec une culture locale qui traite les chiens comme une partie normale de la vie quotidienne. Le Citadelpark est un espace vert de 12 hectares avec une zone sans laisse, a quelques arrets de tramway du centre-ville. Les terrasses du bord de l'eau sur la Graslei et la Korenlei le long du port interieur sont bordees de terrasses de restaurants et de bars qui acceptent tous les chiens aux tables en plein air. La promenade exterieure autour du chateau Gravensteen longe le canal et est dog-friendly tout au long. Gand possede egalement un marche couvert (Vrijdagmarkt) ou les chiens en laisse sont toleres a la plupart des etals.`,
    whyEs: `Gante es la ciudad universitaria de Belgica, considerablemente mas relajada que Brujas, con una cultura local que trata a los perros como una parte normal de la vida cotidiana. El Citadelpark es un espacio verde de 12 hectareas con una zona sin correa, a pocos stops de tranvia del centro. Las terrazas del paseo maritimo en el Graslei y el Korenlei a lo largo del puerto interior estan flanqueadas por terrazas de restaurantes y bares que admiten perros en mesas exteriores. El paseo exterior alrededor del castillo Gravensteen sigue el canal y es apto para perros en todo momento. Gante tambien tiene un mercado cubierto (Vrijdagmarkt) donde se toleran los perros con correa en la mayoria de puestos.`,
    whyPt: `Gante e a cidade universitaria da Belgica, consideravelmente mais relaxada do que Bruges, com uma cultura local que trata os caes como uma parte normal do dia a dia. O Citadelpark e um espaco verde de 12 hectares com uma zona sem trela, a poucos paragens de eletrico do centro. As esplanadas a beira-agua na Graslei e no Korenlei ao longo do porto interior estao ladeadas por esplanadas de restaurantes e bares que aceitam todos os caes em mesas ao ar livre. O passeio exterior em redor do castelo Gravensteen acompanha o canal e e apto para caes em todo o percurso. Gante tem tambem um mercado coberto (Vrijdagmarkt) onde os caes a trela sao tolerados na maioria das bancas.`,
    hotelName: 'Pillows Grand Boutique Hotel Reylof',
    hotelEn: `Pillows Grand Boutique Hotel Reylof is a 4-star property in a restored patrician mansion near the Citadelpark, one of the most design-conscious hotels in Ghent. Dogs are welcomed at the hotel, and the park location means your morning walk starts from the garden gate. The quiet street gives you none of the tourist-centre noise found in Bruges.`,
    hotelFr: `Pillows Grand Boutique Hotel Reylof est un 4 etoiles dans un manoir patricien restaure pres du Citadelpark, l'un des hotels les plus design de Gand. Les chiens sont les bienvenus, et la situation pres du parc signifie que votre balade matinale commence des la grille du jardin. La rue calme vous preserve du bruit touristique du centre de Bruges.`,
    hotelEs: `Pillows Grand Boutique Hotel Reylof es un 4 estrellas en una mansion patriciana restaurada cerca del Citadelpark, uno de los hoteles mas con diseno de Gante. Los perros son bienvenidos, y la ubicacion junto al parque significa que tu paseo matutino empieza desde la verja del jardin. La calle tranquila te aleja del ruido turistico del centro de Brujas.`,
    hotelPt: `Pillows Grand Boutique Hotel Reylof e um 4 estrelas numa mansao patriciana restaurada perto do Citadelpark, um dos hoteis mais com design de Gante. Os caes sao bem-vindos, e a localizacao junto ao parque significa que o seu passeio matinal comeca desde o portao do jardim. A rua calma mantém-no longe do ruido turistico do centro de Bruges.`,
  },
  {
    slug: 'ljubljana',
    name: 'Ljubljana',
    country: 'Slovenia',
    destPath: '/destinations/ljubljana',
    augustTemp: '24C',
    whyEn: `Ljubljana is one of the few Central European capitals with a car-free city centre, which makes walking with a dog here immediately more pleasant than in any comparable city. Tivoli Park has an off-leash meadow area within 10 minutes walk of the old town, and the castle hill walk accepts leashed dogs with panoramic views over the city. The Barje Nature Reserve on the southern city edge is a flat marshland network of wooden boardwalks covering 25 km: a dog paradise with no traffic and plenty of shade in the willows. August temperatures peak at 24C, manageable for most dogs with early morning and evening walks.`,
    whyFr: `Ljubljana est l'une des rares capitales d'Europe centrale avec un veritable centre-ville sans voitures, ce qui rend la promenade avec un chien immediatement plus agreable que dans n'importe quelle ville comparable. Le Parc Tivoli dispose d'une prairie sans laisse a 10 minutes a pied de la vieille ville, et la promenade sur la colline du chateau accepte les chiens en laisse avec une vue panoramique sur la ville. La Reserve naturelle du Barje en bordure sud de la ville est un reseau de promenades en bois de 25 km dans les marais plats : un paradis canin sans circulation avec de l'ombre dans les saules. Les temperatures d'aout culminent a 24C, gerable pour la plupart des chiens avec des promenades tot le matin et en soiree.`,
    whyEs: `Liubliana es una de las pocas capitales de Europa central con un autentico centro historico sin coches, lo que hace que pasear con un perro sea inmediatamente mas agradable que en cualquier ciudad comparable. El Parque Tivoli tiene una zona de prado sin correa a 10 minutos a pie del casco antiguo, y el paseo por la colina del castillo acepta perros con correa con vistas panoramicas de la ciudad. La Reserva Natural de Barje en el borde sur de la ciudad es una red plana de pasarelas de madera de 25 km en marismas: un paraiso canino sin trafico y con abundante sombra en los sauces. Las temperaturas de agosto alcanzan los 24C, manejable para la mayoria de los perros con paseos temprano por la manana y por la noche.`,
    whyPt: `Liubliana e uma das poucas capitais da Europa central com um genuino centro historico sem carros, o que torna o passeio com um cao imediatamente mais agradavel do que em qualquer cidade comparavel. O Parque Tivoli tem uma area de prado sem trela a 10 minutos a pe da cidade velha, e o passeio na colina do castelo aceita caes a trela com vistas panoramicas sobre a cidade. A Reserva Natural do Barje na orla sul da cidade e uma rede plana de passadicos de madeira de 25 km em prados alagados: um paraiso canino sem trafego e com muita sombra nos salgueiros. As temperaturas de agosto chegam aos 24C, gerivel para a maioria dos caes com passeios de manha cedo e ao fim da tarde.`,
    hotelName: 'InterContinental Ljubljana',
    hotelEn: `InterContinental Ljubljana is a 4-star international property in the modern business district, a 10-minute walk from the old town. Pets are welcomed at a modest fee, and the hotel's location near the Sava riverbank gives you access to riverside walking paths outside the tourist centre. The rooms are consistently well air-conditioned for August stays, an advantage when the city reaches 24C by afternoon.`,
    hotelFr: `InterContinental Ljubljana est un 4 etoiles international dans le quartier d'affaires moderne, a 10 minutes a pied de la vieille ville. Les animaux sont acceptes avec un supplement modere, et la situation de l'hotel pres des berges de la Save donne acces a des chemins le long de la riviere en dehors du centre touristique. Les chambres sont constamment bien climatisees pour les sejours en aout, un avantage quand la ville atteint 24C en fin d'apres-midi.`,
    hotelEs: `InterContinental Liubliana es un 4 estrellas internacional en el moderno distrito de negocios, a 10 minutos a pie del casco antiguo. Se admiten mascotas con suplemento moderado, y la ubicacion del hotel cerca de las orillas del Sava da acceso a rutas a pie junto al rio fuera del centro turistico. Las habitaciones estan constantemente bien acondicionadas para las estancias en agosto, una ventaja cuando la ciudad alcanza los 24C por la tarde.`,
    hotelPt: `InterContinental Liubliana e um 4 estrelas internacional no moderno distrito de negocios, a 10 minutos a pe da cidade velha. Os animais de estimacao sao aceites com taxa moderada, e a localizacao do hotel perto das margens do Sava da acesso a percursos a pe junto ao rio fora do centro turistico. Os quartos estao constantemente bem climatizados para estadias em agosto, uma vantagem quando a cidade chega aos 24C ao fim da tarde.`,
  },
  {
    slug: 'wroclaw',
    name: 'Wroclaw',
    country: 'Poland',
    destPath: '/destinations/wroclaw',
    augustTemp: '24C',
    whyEn: `Wroclaw is the city of a hundred bridges, built on twelve islands connected by more than 100 bridges across the Odra river. Leashed dogs are welcome on all public bridges and the riverside paths, making every walk feel like an exploration of waterways. Szczytnicki Park on the eastern edge of the city has an off-leash area within the broader parkland. Craft beer terraces throughout the city are universally dog-tolerant, a distinct characteristic of Wroclaw's outdoor dining culture. The Psie Pole district in the north, whose name literally means "Dog Field" in Polish, confirms the city's historic relationship with dogs.`,
    whyFr: `Wroclaw est la ville aux cent ponts, construite sur douze iles reliees par plus de 100 ponts sur la riviere Odra. Les chiens en laisse sont les bienvenus sur tous les ponts publics et les chemins le long de la riviere, ce qui fait de chaque promenade une exploration de voies navigables. Le Parc Szczytnicki a l'est de la ville dispose d'une zone sans laisse au sein du parc plus large. Les terrasses de bieres artisanales dans toute la ville sont universellement tolerantes aux chiens, une caracteristique distincte de la culture de restauration en plein air de Wroclaw. Le quartier de Psie Pole au nord, dont le nom signifie litteralement "Champ des Chiens" en polonais, confirme la relation historique de la ville avec les chiens.`,
    whyEs: `Wroclaw es la ciudad de los cien puentes, construida sobre doce islas conectadas por mas de 100 puentes sobre el rio Odra. Se admiten perros con correa en todos los puentes publicos y caminos junto al rio, lo que hace que cada paseo parezca una exploracion de vias fluviales. El Parque Szczytnicki en el borde este de la ciudad tiene una zona sin correa dentro del parque mas amplio. Las terrazas de cerveza artesanal en toda la ciudad son universalmente tolerantes con los perros, una caracteristica distintiva de la cultura de comedor al aire libre de Wroclaw. El barrio de Psie Pole en el norte, cuyo nombre significa literalmente "Campo de Perros" en polaco, confirma la relacion historica de la ciudad con los perros.`,
    whyPt: `Wroclaw e a cidade das cem pontes, construida em doze ilhas ligadas por mais de 100 pontes sobre o rio Odra. Os caes a trela sao bem-vindos em todas as pontes publicas e caminhos junto ao rio, tornando cada passeio numa exploracao de vias fluviais. O Parque Szczytnicki na extremidade leste da cidade tem uma zona sem trela dentro do parque mais amplo. As esplanadas de cerveja artesanal em toda a cidade sao universalmente tolerantes com caes, uma caracteristica distintiva da cultura de refeicoes ao ar livre de Wroclaw. O bairro de Psie Pole a norte, cujo nome significa literalmente "Campo de Caes" em polaco, confirma a relacao historica da cidade com os caes.`,
    hotelName: 'HP Park Plaza Wroclaw',
    hotelEn: `HP Park Plaza Wroclaw is a 4-star riverside hotel next to the Szczytnicki Park, which puts you at the dog-friendly park zone within a 5-minute walk. Pets are welcomed at the property. The riverside location means you avoid the tourist centre noise while remaining within a short tram ride of the Market Square and the old town.`,
    hotelFr: `HP Park Plaza Wroclaw est un 4 etoiles au bord de la riviere, a cote du Parc Szczytnicki, ce qui vous place a 5 minutes a pied de la zone canine du parc. Les animaux sont acceptes dans l'etablissement. La situation riveraine vous permet d'eviter le bruit du centre touristique tout en restant a un court trajet de tram de la Place du Marche et de la vieille ville.`,
    hotelEs: `HP Park Plaza Wroclaw es un 4 estrellas junto al rio, al lado del Parque Szczytnicki, que te coloca a 5 minutos a pie de la zona canina del parque. Se admiten mascotas en el establecimiento. La ubicacion junto al rio significa que evitas el ruido del centro turistico mientras permaneces a un corto viaje en tranvia de la Plaza del Mercado y el casco antiguo.`,
    hotelPt: `HP Park Plaza Wroclaw e um 4 estrelas junto ao rio, ao lado do Parque Szczytnicki, colocando-o a 5 minutos a pe da zona canina do parque. Os animais de estimacao sao aceites no estabelecimento. A localizacao ribeirinha permite-lhe evitar o ruido do centro turistico enquanto permanece a uma curta viagem de eletrico da Praca do Mercado e da cidade velha.`,
  },
  {
    slug: 'krakow',
    name: 'Krakow',
    country: 'Poland',
    destPath: '/destinations/krakow',
    augustTemp: '24C',
    whyEn: `Krakow's Planty ring park is a 4-kilometre flat circular walk around the entire perimeter of the old town, entirely on green paths with leashed dogs welcome: arguably the best urban dog walk in Central Europe. The Vistula River beaches east of the Kazimierz district open up to dogs from August onwards when the swimming season begins to wind down. Wolski Forest 10 km west of the centre has designated psie biegowisko (off-leash dog run zones) in a proper woodland setting. The city's market square terraces accept dogs at most outdoor tables.`,
    whyFr: `Le Planty de Cracovie est une promenade circulaire plate de 4 km autour de tout le perimetre de la vieille ville, entierement sur des chemins verts avec chiens en laisse les bienvenus : sans doute la meilleure balade canine urbaine d'Europe centrale. Les plages de la Vistule a l'est du quartier de Kazimierz s'ouvrent aux chiens a partir d'aout lorsque la saison de baignade commence a se terminer. La Foret Wolski a 10 km a l'ouest du centre dispose de psie biegowisko designes (zones de course sans laisse) dans un vrai cadre boise. Les terrasses de la place du marche acceptent les chiens a la plupart des tables en plein air.`,
    whyEs: `El Planty de Cracovia es un paseo circular llano de 4 km alrededor de todo el perimetro del casco antiguo, completamente en senderos verdes con perros con correa bienvenidos: sin duda el mejor paseo canino urbano de Europa central. Las playas del Vistula al este del barrio de Kazimierz se abren a los perros a partir de agosto cuando la temporada de bano empieza a terminar. El Bosque Wolski a 10 km al oeste del centro tiene psie biegowisko designados (zonas de carrera sin correa) en un verdadero entorno forestal. Las terrazas de la plaza del mercado aceptan perros en la mayoria de las mesas al aire libre.`,
    whyPt: `O Planty de Cracovia e um passeio circular plano de 4 km em torno de todo o perimetro da cidade velha, inteiramente em caminhos verdes com caes a trela bem-vindos: sem duvida o melhor passeio canino urbano da Europa central. As praias do Vistula a leste do bairro de Kazimierz abrem-se aos caes a partir de agosto quando a epoca de banhos comeca a terminar. A Floresta Wolski a 10 km a oeste do centro tem psie biegowisko designados (zonas de corrida sem trela) num verdadeiro ambiente florestal. As esplanadas da praca do mercado aceitam caes na maioria das mesas ao ar livre.`,
    hotelName: 'Hotel Stary',
    hotelEn: `Hotel Stary is a boutique 5-star in the old town, converted from a restored 15th-century tenement house on Szczepanski Square. Pets are welcomed at the hotel. The location is exceptionally central: you step out of the door onto the Planty, and the Main Market Square is 2 minutes on foot. The rooftop pool with old-town views is a distinctive feature for hot August afternoons.`,
    hotelFr: `Hotel Stary est un boutique 5 etoiles dans la vieille ville, converti d'une maison de rapport restauree du XVe siecle sur la Place Szczepanski. Les animaux sont les bienvenus. L'emplacement est exceptionnellement central : vous sortez directement sur le Planty, et la Grand-Place est a 2 minutes a pied. La piscine sur le toit avec vue sur la vieille ville est une caracteristique distinctive pour les chaudes apres-midi d'aout.`,
    hotelEs: `Hotel Stary es un boutique 5 estrellas en el casco antiguo, convertido de una casa de vecinos restaurada del siglo XV en la Plaza Szczepanski. Las mascotas son bienvenidas en el hotel. La ubicacion es excepcionalmente central: sales directamente al Planty, y la Plaza del Mercado Principal esta a 2 minutos a pie. La piscina en la azotea con vistas al casco antiguo es una caracteristica distintiva para las calurosas tardes de agosto.`,
    hotelPt: `Hotel Stary e um boutique 5 estrelas na cidade velha, convertido de uma casa de habitacao restaurada do seculo XV na Praca Szczepanski. Os animais de estimacao sao bem-vindos no hotel. A localizacao e excepcionalmente central: sai directamente para o Planty, e a Praca do Mercado Principal fica a 2 minutos a pe. A piscina no telhado com vistas para a cidade velha e uma caracteristica distintiva para as quentes tardes de agosto.`,
  },
]

for (const slug of PICKS.map((pk) => pk.slug)) {
  HOTELS_BY_DEST[slug] = valueSort(hotels.filter((h) => h.destinationSlug === slug)).slice(0, 3)
}

const COPY = {
  en: {
    eyebrow: 'PET-FRIENDLY AUGUST · ANTI-HEAT EUROPE',
    title: `Where to Go with Your Dog in August: 8 Cool European Cities Under 25C`,
    intro: `August is the worst month in Europe for travelling with a heat-sensitive dog. The entire Mediterranean basin exceeds 30C, asphalt in Rome, Barcelona, and Athens reaches 55C by noon, and brachycephalic breeds (bulldogs, pugs, French bulldogs, boxers) can be in heatstroke territory within minutes. The answer is not to cancel your summer trip: it is to shift north. These eight cities in the Baltic states, Belgium, and Central Europe stay reliably under 25C in August, have established dog cultures with off-leash parks and dog beaches, and offer hotels that take pets seriously.`,
    pickHeading: 'The eight August picks (ranked from coolest)',
    whyHere: 'Why here',
    hotelLabel: 'Where to stay',
    seeDestCta: 'Full city guide →',
    hotelCta: 'See availability →',
    augustLabel: 'Aug avg high',
    practicalHeading: 'August heat: what you need to know',
    practical: [
      { h: 'Why August is the worst month in southern Europe for dogs', p: `In July, temperatures in southern Europe are high but often peak in the early afternoon and drop somewhat by evening. August reverses this: the ground, roads, and buildings have stored six weeks of heat and release it through the night, meaning overnight lows stay above 25C in many Mediterranean cities. For a dog that cannot sweat (only panting, which is inefficient above 28C), August in Rome, Athens, or Seville is genuinely dangerous. Flat-faced breeds, seniors, and overweight dogs cannot regulate adequately: choose a northern city or travel at altitude instead.` },
      { h: 'The Baltic and Baltic states advantage', p: `Tallinn, Riga, and Vilnius share a specific August advantage: the Baltic Sea acts as a temperature regulator, keeping coastal and near-coastal temperatures 5-8C below the Central European inland average. These cities also have the best combination of dog culture and affordability in Europe: off-leash parks, dog beaches, dogs on public transit for free, and hotel pet fees that are often the EU lowest. Budget comparison: a 4-star hotel night in Tallinn averages €80-120, versus €180-250 for equivalent quality in Stockholm or €130-200 in Helsinki.` },
      { h: 'Dogs in Central European parks: the psie biegowisko', p: `Krakow and Wroclaw both have a specifically Polish institution: the psie biegowisko, or dedicated dog run zone within a public park. These are fenced off-leash areas, often with water points, that are marked on city park maps and respected by other park users. The equivalent in Belgium is the hondenlosloopweide (off-leash meadow), found in Citadelpark Ghent and similar green spaces. If your dog needs off-leash time in August, these are your guaranteed options in cities that otherwise require a leash in public spaces.` },
      { h: 'August hotel booking: timing and what to ask', p: `August is peak European tourism. In the Baltic capitals, summer demand means good pet-friendly hotels sell out by June for the August peak weeks (1-10 August and 20-31 August are the busiest). Book early, and when booking confirm two things directly with the hotel: the dog size limit (many Central European properties cap at 10 kg or 15 kg), and whether the pet policy extends to shared spaces like the bar terrace or breakfast area. In Bruges and Ghent, the August Ghent Festivities (mid-August) fill the city: book at least 8 weeks ahead.` },
    ],
    faqHeading: 'Frequently asked questions',
    faqs: [
      { q: 'Is August cheaper than July in northern Europe?', a: `In the Baltic capitals, August is actually slightly more expensive than July because international tourism peaks in the first two weeks of August. Prices drop noticeably after 20 August as school holidays end in most of Northern Europe. If flexibility is possible, the window from 21 August to 5 September offers the best combination of cool temperatures and lower prices. In Belgium (Bruges, Ghent), August is peak season throughout, with no significant discounts until mid-September.` },
      { q: 'Can my dog go on a Baltic beach in August?', a: `Yes, with conditions. Tallinn's Pirita beach has a dedicated dog zone accessible year-round. Riga's Jurmala resort beach has a dog-specific section in summer. In Estonia and Latvia, dogs are generally permitted on beaches outside the designated swimming areas. Lithuanian beaches (Palanga, Nida) apply stricter seasonal rules from 1 June to 30 September on the main stretches. Always check the current local regulations at the access point, as rules can change year to year. Carry a water bowl: Baltic beach sand heats more than the air temperature suggests.` },
      { q: 'Is Bruges manageable with a dog in August without the canal boats?', a: `Completely. The canal towpaths alongside every canal in Bruges form a complete walking network at no cost, and they are in many ways better than the tourist boats: you go at your own pace, you have shade from the towpath trees, and your dog is with you. The Minnewater Park (30-minute walk from the centre) and the Begijnhof courtyard (leashed dogs tolerated outside the church building) add two more quiet spaces. The only drawback is the August tourist crowds in the centre: plan your main walks before 9 AM or after 7 PM.` },
      { q: 'What about the Balkans in August? Is only Slovenia OK?', a: `Slovenia is the exception in the Balkans because Ljubljana sits at 295 metres altitude and benefits from Alpine air flows that cap August temperatures at 24C. The Croatian coast (Dubrovnik, Split, Hvar) hits 30-34C in August and is genuinely unsuitable for heat-sensitive dogs. Montenegro and Albania are hotter still. Bosnia at altitude (Sarajevo 26-28C) is borderline. Serbia (Belgrade 32C in August) and Bulgaria (Sofia 29C) are too hot. If you want the Adriatic in August with a dog, the best options are the Slovenian coast (Piran, Portoroz) at 26-27C, or the northern Croatian islands before the 20th of the month.` },
    ],
    relatedHeading: 'See also',
  },
  fr: {
    eyebrow: 'AOUT PET-FRIENDLY · ANTI-CHALEUR EUROPE',
    title: `Ou partir avec son chien en aout : 8 villes europeennes fraiches a moins de 25C`,
    intro: `Aout est le pire mois d'Europe pour voyager avec un chien sensible a la chaleur. Tout le bassin mediterraneen depasse les 30C, l'asphalte a Rome, Barcelone et Athenes atteint 55C a midi, et les races brachycephales (bouledogues, carlins, bouledogues francais, boxers) peuvent etre en zone de coup de chaleur en quelques minutes. La solution n'est pas d'annuler votre voyage d'ete : c'est de partir vers le nord. Ces huit villes des pays Baltes, de Belgique et d'Europe centrale restent en dessous de 25C en aout, ont une vraie culture canine avec des parcs sans laisse et des plages pour chiens, et proposent des hotels qui prennent les animaux au serieux.`,
    pickHeading: `Les huit picks d'aout (du plus frais au plus chaud)`,
    whyHere: 'Pourquoi ici',
    hotelLabel: 'Ou dormir',
    seeDestCta: 'Guide complet →',
    hotelCta: 'Voir les disponibilites →',
    augustLabel: 'Max moy aout',
    practicalHeading: `Chaleur en aout : ce qu'il faut savoir`,
    practical: [
      { h: `Pourquoi aout est le pire mois pour les chiens en Europe du Sud`, p: `En juillet, les temperatures en Europe du Sud sont elevees mais culminent souvent en debut d'apres-midi et baissent un peu le soir. Aout inverse ce schema : le sol, les routes et les batiments ont accumule six semaines de chaleur et la liberent pendant la nuit, ce qui signifie que les minimales nocturnes restent au-dessus de 25C dans de nombreuses villes mediterraneennes. Pour un chien qui ne transpire pas (seulement le halitement, inefficace au-dessus de 28C), aout a Rome, Athenes ou Seville est vraiment dangereux. Les races a face plate, les seniors et les chiens en surpoids ne peuvent pas reguler suffisamment : choisissez une ville nordique ou voyagez en altitude.` },
      { h: `L'avantage baltique`, p: `Tallinn, Riga et Vilnius partagent un avantage specifique en aout : la mer Baltique agit comme regulateur de temperature, maintenant les temperatures cotieres et proches des cotes de 5 a 8C sous la moyenne continentale d'Europe centrale. Ces villes ont egalement la meilleure combinaison de culture canine et d'accessibilite economique en Europe : parcs sans laisse, plages pour chiens, chiens dans les transports en commun gratuitement, et supplements animaux souvent parmi les plus bas de l'UE. Comparaison budget : une nuit d'hotel 4 etoiles a Tallinn coute en moyenne 80-120 euros, contre 180-250 euros pour une qualite equivalente a Stockholm ou 130-200 euros a Helsinki.` },
      { h: `Les chiens dans les parcs d'Europe centrale : le psie biegowisko`, p: `Cracovie et Wroclaw disposent toutes deux d'une institution specifiquement polonaise : le psie biegowisko, ou zone de course canine dediee au sein d'un parc public. Ce sont des espaces clos sans laisse, souvent avec des points d'eau, marques sur les plans des parcs et respectes par les autres usagers. L'equivalent en Belgique est le hondenlosloopweide (prairie sans laisse), que l'on trouve dans le Citadelpark de Gand et d'autres espaces verts similaires. Si votre chien a besoin de temps sans laisse en aout, ce sont vos options garanties dans des villes qui exigent par ailleurs une laisse dans les espaces publics.` },
      { h: `Reservation d'hotel en aout : timing et questions a poser`, p: `Aout est le pic du tourisme europeen. Dans les capitales baltes, la demande estivale signifie que les bons hotels pet-friendly affichent complet des juin pour les semaines de pointe d'aout (1-10 aout et 20-31 aout sont les plus chargees). Reservez tot, et lors de la reservation confirmez deux choses directement avec l'hotel : la limite de taille du chien (de nombreux etablissements d'Europe centrale plafonnent a 10 kg ou 15 kg), et si la politique animaux s'etend aux espaces partages comme la terrasse du bar ou la salle du petit-dejeuner. A Bruges et Gand, les Fetes de Gand (mi-aout) remplissent la ville : reservez au moins 8 semaines a l'avance.` },
    ],
    faqHeading: 'Questions frequentes',
    faqs: [
      { q: `Aout est-il moins cher que juillet en Europe du Nord ?`, a: `Dans les capitales baltes, aout est en realite legerement plus cher que juillet car le tourisme international atteint son pic dans les deux premieres semaines d'aout. Les prix baissent nettement apres le 20 aout lorsque les vacances scolaires se terminent dans la majeure partie de l'Europe du Nord. Si la flexibilite est possible, la periode du 21 aout au 5 septembre offre la meilleure combinaison de temperatures fraiches et de prix plus bas. En Belgique (Bruges, Gand), aout est pleine saison tout au long du mois, sans remises significatives avant mi-septembre.` },
      { q: `Mon chien peut-il aller sur une plage baltique en aout ?`, a: `Oui, avec des conditions. La plage de Pirita a Tallinn dispose d'une zone canine accessible toute l'annee. La station balneaire de Jurmala pres de Riga a une section specifique pour chiens en ete. En Estonie et en Lettonie, les chiens sont generalement autorises sur les plages en dehors des zones de baignade designees. Les plages lituaniennes (Palanga, Nida) appliquent des regles saisonnieres plus strictes du 1er juin au 30 septembre sur les principaux troncons. Verifiez toujours les reglements locaux en vigueur a l'entree, car ils peuvent changer d'une annee sur l'autre. Portez un bol d'eau : le sable des plages baltiques chauffe plus que la temperature de l'air ne le laisse supposer.` },
      { q: `Bruges est-il gerable avec un chien en aout sans les bateaux sur les canaux ?`, a: `Completement. Les chemins de halage le long de chaque canal de Bruges forment un reseau de promenade complet et gratuit, et ils sont a bien des egards meilleurs que les bateaux touristiques : vous allez a votre propre rythme, vous avez de l'ombre sous les arbres des berges, et votre chien est avec vous. Le Parc Minnewater (30 minutes a pied du centre) et la cour du Begijnhof (chiens en laisse toleres en dehors du batiment de l'eglise) ajoutent deux espaces calmes supplementaires. Le seul inconvenient est la foule touristique d'aout dans le centre : prevoyez vos principales balades avant 9h ou apres 19h.` },
      { q: `Qu'en est-il des Balkans en aout ? Seule la Slovenie est-elle acceptable ?`, a: `La Slovenie est l'exception dans les Balkans car Ljubljana se trouve a 295 metres d'altitude et beneficie de flux d'air alpins qui plafonnent les temperatures d'aout a 24C. La cote croate (Dubrovnik, Split, Hvar) atteint 30-34C en aout et est vraiment inadaptee aux chiens sensibles a la chaleur. Le Montenegro et l'Albanie sont encore plus chauds. La Bosnie en altitude (Sarajevo 26-28C) est a la limite. La Serbie (Belgrade 32C en aout) et la Bulgarie (Sofia 29C) sont trop chaudes. Si vous voulez l'Adriatique en aout avec un chien, les meilleures options sont la cote slovene (Piran, Portoroz) a 26-27C, ou les iles du nord de la Croatie avant le 20 du mois.` },
    ],
    relatedHeading: 'Voir aussi',
  },
  es: {
    eyebrow: 'AGOSTO PET-FRIENDLY · ANTI-CALOR EUROPA',
    title: `Donde ir con tu perro en agosto: 8 ciudades europeas frescas a menos de 25C`,
    intro: `Agosto es el peor mes en Europa para viajar con un perro sensible al calor. Toda la cuenca mediterranea supera los 30C, el asfalto en Roma, Barcelona y Atenas alcanza los 55C al mediodia, y las razas braquicefalas (bulldogs, carlinos, bulldogs franceses, boxers) pueden estar en zona de golpe de calor en cuestion de minutos. La solucion no es cancelar tu viaje de verano: es desplazarte hacia el norte. Estas ocho ciudades en los estados balticos, Belgica y Europa central se mantienen por debajo de los 25C en agosto, tienen una cultura canina establecida con parques sin correa y playas para perros, y ofrecen hoteles que toman en serio a los animales.`,
    pickHeading: 'Las ocho elecciones de agosto (del mas fresco al mas calido)',
    whyHere: 'Por que aqui',
    hotelLabel: 'Donde alojarse',
    seeDestCta: 'Guia completa →',
    hotelCta: 'Ver disponibilidad →',
    augustLabel: 'Max media agosto',
    practicalHeading: 'Calor en agosto: lo que necesitas saber',
    practical: [
      { h: 'Por que agosto es el peor mes para los perros en el sur de Europa', p: `En julio, las temperaturas en el sur de Europa son altas pero a menudo alcanzan su pico a primera hora de la tarde y bajan algo por la noche. Agosto invierte esto: el suelo, las carreteras y los edificios han almacenado seis semanas de calor y lo liberan durante la noche, lo que significa que las minimas nocturnas se mantienen por encima de los 25C en muchas ciudades mediterraneas. Para un perro que no puede sudar (solo jadear, lo cual es ineficiente por encima de los 28C), agosto en Roma, Atenas o Sevilla es genuinamente peligroso. Las razas de cara plana, los perros mayores y los perros con sobrepeso no pueden regular adecuadamente: elige una ciudad nortena o viaja a mayor altitud.` },
      { h: 'La ventaja baltica y de los estados balticos', p: `Tallinn, Riga y Vilna comparten una ventaja especifica en agosto: el mar Baltico actua como regulador de temperatura, manteniendo las temperaturas costeras y cercanas a la costa entre 5 y 8C por debajo de la media del interior de Europa central. Estas ciudades tambien tienen la mejor combinacion de cultura canina y asequibilidad en Europa: parques sin correa, playas para perros, perros en transporte publico de forma gratuita, y tarifas para mascotas en hoteles que suelen ser de las mas bajas de la UE. Comparacion de presupuesto: una noche de hotel 4 estrellas en Tallinn cuesta una media de 80-120 euros, frente a 180-250 euros por una calidad equivalente en Estocolmo o 130-200 euros en Helsinki.` },
      { h: 'Perros en parques de Europa central: el psie biegowisko', p: `Cracovia y Wroclaw tienen ambas una institucion especificamente polaca: el psie biegowisko, o zona de carreras caninas dedicada dentro de un parque publico. Son areas valladas sin correa, a menudo con puntos de agua, marcadas en los mapas de parques de la ciudad y respetadas por otros usuarios del parque. El equivalente en Belgica es el hondenlosloopweide (prado sin correa), que se encuentra en el Citadelpark de Gante y en espacios verdes similares. Si tu perro necesita tiempo sin correa en agosto, estas son tus opciones garantizadas en ciudades que de lo contrario requieren correa en los espacios publicos.` },
      { h: 'Reserva de hotel en agosto: cuando reservar y que preguntar', p: `Agosto es el pico del turismo europeo. En las capitales balticas, la demanda veraniega significa que los buenos hoteles pet-friendly se agotan en junio para las semanas punta de agosto (del 1 al 10 de agosto y del 20 al 31 de agosto son las mas concurridas). Reserva pronto, y al reservar confirma dos cosas directamente con el hotel: el limite de tamano del perro (muchos establecimientos de Europa central limitan a 10 kg o 15 kg), y si la politica de mascotas se extiende a los espacios comunes como la terraza del bar o la zona de desayuno. En Brujas y Gante, las Fiestas de Gante (mediados de agosto) llenan la ciudad: reserva con al menos 8 semanas de antelacion.` },
    ],
    faqHeading: 'Preguntas frecuentes',
    faqs: [
      { q: `Es agosto mas barato que julio en el norte de Europa?`, a: `En las capitales balticas, agosto es en realidad ligeramente mas caro que julio porque el turismo internacional alcanza su pico en las dos primeras semanas de agosto. Los precios bajan notablemente despues del 20 de agosto cuando las vacances escolares terminan en la mayor parte del norte de Europa. Si hay flexibilidad, el periodo del 21 de agosto al 5 de septiembre ofrece la mejor combinacion de temperaturas frescas y precios mas bajos. En Belgica (Brujas, Gante), agosto es temporada alta durante todo el mes, sin descuentos significativos hasta mediados de septiembre.` },
      { q: `Puede mi perro ir a una playa del Baltico en agosto?`, a: `Si, con condiciones. La playa de Pirita en Tallinn tiene una zona canina dedicada accesible durante todo el ano. La estacion balnearia de Jurmala cerca de Riga tiene una seccion especifica para perros en verano. En Estonia y Letonia, los perros estan generalmente permitidos en las playas fuera de las zonas de bano designadas. Las playas lituanas (Palanga, Nida) aplican normas estacionales mas estrictas del 1 de junio al 30 de septiembre en los tramos principales. Comprueba siempre la normativa local vigente en el punto de acceso, ya que las normas pueden cambiar de un ano a otro. Lleva un cuenco de agua: la arena de las playas balticas se calienta mas de lo que la temperatura del aire sugiere.` },
      { q: `Es Brujas manejable con un perro en agosto sin los barcos de los canales?`, a: `Completamente. Los caminos de sirga a lo largo de cada canal de Brujas forman una red completa de paseo sin coste, y son en muchos aspectos mejores que los barcos turisticos: vas a tu propio ritmo, tienes sombra de los arboles del camino de sirga, y tu perro esta contigo. El Parque Minnewater (30 minutos a pie del centro) y el patio del Begijnhof (perros con correa tolerados fuera del edificio de la iglesia) anaden dos espacios tranquilos mas. El unico inconveniente es la afluencia turistica de agosto en el centro: planifica tus principales paseos antes de las 9h o despues de las 19h.` },
      { q: `Que pasa con los Balcanes en agosto? Solo Eslovenia esta bien?`, a: `Eslovenia es la excepcion en los Balcanes porque Liubliana se encuentra a 295 metros de altitud y se beneficia de flujos de aire alpino que limitan las temperaturas de agosto a 24C. La costa croata (Dubrovnik, Split, Hvar) alcanza los 30-34C en agosto y es verdaderamente inadecuada para los perros sensibles al calor. Montenegro y Albania son aun mas calidas. Bosnia en altitud (Sarajevo 26-28C) esta en el limite. Serbia (Belgrado 32C en agosto) y Bulgaria (Sofia 29C) son demasiado calidas. Si quieres el Adriatico en agosto con un perro, las mejores opciones son la costa eslovena (Piran, Portoroz) a 26-27C, o las islas del norte de Croacia antes del dia 20 del mes.` },
    ],
    relatedHeading: 'Ver tambien',
  },
  pt: {
    eyebrow: 'AGOSTO PET-FRIENDLY · ANTI-CALOR EUROPA',
    title: `Para onde ir com o seu cao em agosto: 8 cidades europeias frescas a menos de 25C`,
    intro: `Agosto e o pior mes na Europa para viajar com um cao sensivel ao calor. Toda a bacia mediterranica ultrapassa os 30C, o asfalto em Roma, Barcelona e Atenas atinge os 55C ao meio-dia, e as racas braquicefalicas (bulldogs, carlins, bulldogs franceses, boxers) podem estar em zona de golpe de calor em poucos minutos. A solucao nao e cancelar a sua viagem de verao: e deslocar-se para norte. Estas oito cidades nos estados balticos, na Belgica e na Europa central mantêm-se abaixo dos 25C em agosto, tem uma cultura canina estabelecida com parques sem trela e praias para caes, e oferecem hoteis que levam os animais de estimacao a serio.`,
    pickHeading: 'As oito escolhas de agosto (do mais fresco ao mais quente)',
    whyHere: 'Porquê aqui',
    hotelLabel: 'Onde ficar',
    seeDestCta: 'Guia completo →',
    hotelCta: 'Ver disponibilidade →',
    augustLabel: 'Max media agosto',
    practicalHeading: 'Calor em agosto: o que precisa de saber',
    practical: [
      { h: 'Porque agosto e o pior mes para os caes no sul da Europa', p: `Em julho, as temperaturas no sul da Europa sao elevadas mas frequentemente atingem o pico no inicio da tarde e baixam um pouco a noite. Agosto inverte isto: o solo, as estradas e os edificios acumularam seis semanas de calor e libertam-no durante a noite, o que significa que as minimas nocturnas se mantêm acima dos 25C em muitas cidades mediterranicas. Para um cao que nao pode suar (apenas ofegamento, ineficiente acima dos 28C), agosto em Roma, Atenas ou Sevilha e genuinamente perigoso. As racas de cara achatada, os caes idosos e os caes com excesso de peso nao conseguem regular adequadamente: escolha uma cidade nortenha ou viaje a maior altitude.` },
      { h: 'A vantagem baltica e dos estados balticos', p: `Talim, Riga e Vilnius partilham uma vantagem especifica em agosto: o Mar Baltico actua como regulador de temperatura, mantendo as temperaturas costeiras e proximas da costa 5 a 8C abaixo da media do interior da Europa central. Estas cidades tem tambem a melhor combinacao de cultura canina e acessibilidade economica na Europa: parques sem trela, praias para caes, caes em transporte publico gratuitamente, e taxas para animais de estimacao em hoteis que sao frequentemente das mais baixas da UE. Comparacao de orcamento: uma noite de hotel 4 estrelas em Talim custa em media 80-120 euros, contra 180-250 euros por qualidade equivalente em Estocolmo ou 130-200 euros em Helsínquia.` },
      { h: 'Caes em parques da Europa central: o psie biegowisko', p: `Cracovia e Wroclaw tem ambas uma instituicao especificamente polaca: o psie biegowisko, ou zona de corrida canina dedicada dentro de um parque publico. Sao areas vedadas sem trela, frequentemente com pontos de agua, marcadas nos mapas dos parques da cidade e respeitadas pelos outros utilizadores. O equivalente na Belgica e o hondenlosloopweide (prado sem trela), encontrado no Citadelpark de Gante e em espacos verdes similares. Se o seu cao necessita de tempo sem trela em agosto, estas sao as suas opcoes garantidas em cidades que de outro modo exigem trela em espacos publicos.` },
      { h: 'Reserva de hotel em agosto: quando reservar e o que perguntar', p: `Agosto e o pico do turismo europeu. Nas capitais balticas, a procura de verao significa que os bons hoteis pet-friendly esgotam em junho para as semanas de pico de agosto (1 a 10 de agosto e 20 a 31 de agosto sao as mais concorridas). Reserve cedo, e ao reservar confirme duas coisas directamente com o hotel: o limite de tamanho do cao (muitos estabelecimentos da Europa central limitam a 10 kg ou 15 kg), e se a politica de animais se estende aos espacos partilhados como a esplanada do bar ou a area do pequeno-almoco. Em Bruges e Gante, as Festas de Gante (meados de agosto) enchem a cidade: reserve com pelo menos 8 semanas de antecedencia.` },
    ],
    faqHeading: 'Perguntas frequentes',
    faqs: [
      { q: `E agosto mais barato do que julho no norte da Europa?`, a: `Nas capitais balticas, agosto e na realidade ligeiramente mais caro do que julho porque o turismo internacional atinge o seu pico nas duas primeiras semanas de agosto. Os precos baixam notavelmente apos o dia 20 de agosto quando as ferias escolares terminam na maior parte da Europa do Norte. Se houver flexibilidade, o periodo de 21 de agosto a 5 de setembro oferece a melhor combinacao de temperaturas frescas e precos mais baixos. Na Belgica (Bruges, Gante), agosto e epoca alta ao longo de todo o mes, sem descontos significativos ate meados de setembro.` },
      { q: `O meu cao pode ir a uma praia baltica em agosto?`, a: `Sim, com condicoes. A praia de Pirita em Talim tem uma zona canina dedicada acessivel todo o ano. A estancia balnearia de Jurmala perto de Riga tem uma seccao especifica para caes no verao. Na Estonia e na Letonia, os caes sao geralmente permitidos nas praias fora das zonas de banho designadas. As praias lituanas (Palanga, Nida) aplicam regras sazonais mais rigorosas de 1 de junho a 30 de setembro nos principais trechos. Verifique sempre os regulamentos locais em vigor no ponto de acesso, pois as regras podem mudar de ano para ano. Leve uma tigela de agua: a areia das praias balticas aquece mais do que a temperatura do ar sugere.` },
      { q: `E Bruges gerivel com um cao em agosto sem os barcos dos canais?`, a: `Completamente. Os caminhos de sirga ao longo de cada canal de Bruges formam uma rede completa de passeio sem custo, e sao em muitos aspectos melhores do que os barcos turisticos: vai ao seu proprio ritmo, tem sombra das arvores do caminho de sirga, e o seu cao esta consigo. O Parque Minnewater (30 minutos a pe do centro) e o patio do Begijnhof (caes a trela tolerados fora do edificio da igreja) acrescentam mais dois espacos calmos. A unica desvantagem e a afluencia turistica de agosto no centro: planeie as suas principais caminhadas antes das 9h ou apos as 19h.` },
      { q: `O que acontece com os Balcas em agosto? So a Eslovenia e aceitavel?`, a: `A Eslovenia e a excepcao nos Balcas porque Liubliana se situa a 295 metros de altitude e beneficia de fluxos de ar alpino que limitam as temperaturas de agosto a 24C. A costa croata (Dubrovnik, Split, Hvar) atinge os 30-34C em agosto e e genuinamente inadequada para caes sensiveis ao calor. O Montenegro e a Albania sao ainda mais quentes. A Bosnia em altitude (Sarajevo 26-28C) esta no limite. A Serbia (Belgrado 32C em agosto) e a Bulgaria (Sofia 29C) sao demasiado quentes. Se quiser o Adriatico em agosto com um cao, as melhores opcoes sao a costa eslovena (Piran, Portoroz) a 26-27C, ou as ilhas do norte da Croacia antes do dia 20 do mes.` },
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
              <div className="relative h-40 sm:h-52">
                <Image
                  src={`/images/destinations/${p.slug}.jpg`}
                  alt={getLocalizedCityName(p.slug, p.name, locale)}
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-cover"
                />
              </div>
              <header className="px-5 sm:px-7 py-4 bg-gradient-to-r from-sky-50 to-emerald-50 border-b border-stone-200 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-2xl font-black text-sky-700">#{i + 1}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  <Link href={`/${locale}${p.destPath}`} className="hover:text-sky-700">{getLocalizedCityName(p.slug, p.name, locale)}</Link>
                </h3>
                <span className="text-sm text-stone-600">{p.country}</span>
                <span className="ml-auto bg-sky-100 text-sky-900 text-xs font-bold px-3 py-1 rounded-full">
                  {t.augustLabel} {p.augustTemp}
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
                  {(HOTELS_BY_DEST[p.slug] ?? []).length > 0 && (
                    <div className="mt-3 rounded-xl border border-stone-200 overflow-hidden divide-y divide-stone-100">
                      {(HOTELS_BY_DEST[p.slug] ?? []).map((h) => (
                        <Link
                          key={h.slug}
                          href={`/${locale}/hotels/${h.slug}`}
                          className="flex items-center gap-3 px-3 py-2.5 hover:bg-sky-50/60 transition-colors"
                        >
                          <Image
                            src={`/images/hotels/${h.id}.jpg`}
                            alt={h.name}
                            width={64}
                            height={48}
                            className="w-16 h-12 rounded-lg object-cover flex-shrink-0 bg-stone-100"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold text-stone-900 truncate">{h.name}</span>
                            <span className="block text-xs text-stone-500">
                              {'★'.repeat(h.stars || 0)} · {h.rating.toFixed(1)}/10{h.petFee === 0 ? ` · ${hotelNoFee(locale)}` : ''}
                            </span>
                          </span>
                          <span className="flex-shrink-0 text-right">
                            <span className="block text-[11px] text-stone-400">{hotelFrom(locale)}</span>
                            <span className="block text-sm font-bold text-stone-900">{h.currency === 'GBP' ? '£' : '€'}{h.priceFrom}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
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
