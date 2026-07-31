import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'
import hotels from '@/data/hotels.json'
import { valueSort } from '@/lib/hotelSort'
import { getLocalizedCityName } from '@/lib/cityNames'

const SLUG = 'high-energy-dog-destinations-europe'
const CAMPAIGN = 'highenergy-dog'

type L4 = { en: string; fr: string; es: string; pt: string }
type Dest = {
  slug: string
  name: string
  country: string
  tag: L4
  why: L4
}

const DESTINATIONS: Dest[] = [
  {
    slug: 'chamonix',
    name: 'Chamonix-Mont-Blanc',
    country: 'France',
    tag: {
      en: 'Mont Blanc valley trails',
      fr: 'Sentiers de la vallée du Mont-Blanc',
      es: 'Senderos del valle del Mont Blanc',
      pt: 'Trilhos do vale do Mont Blanc',
    },
    why: {
      en: `Chamonix sits in the Mont Blanc valley with graded trails starting right from town, including the Petits Balcons Nord and Sud that climb the valley flanks for hours of real elevation with a dog on lead. Save the Aiguille du Midi cable car for a solo trip: dogs (other than assistance dogs) aren't allowed on it, and the Lac Blanc hike via the Grand Balcon Sud crosses the Aiguilles Rouges nature reserve, where dogs are banned outright.`,
      fr: `Chamonix se niche dans la vallée du Mont-Blanc avec des sentiers balisés au départ même de la ville, dont les Petits Balcons Nord et Sud, qui grimpent sur les flancs de la vallée pour des heures de vrai dénivelé, chien en laisse. Gardez le téléphérique de l'Aiguille du Midi pour une sortie sans lui : les chiens (hors chiens d'assistance) n'y sont pas admis, et la randonnée du Lac Blanc par le Grand Balcon Sud traverse la réserve naturelle des Aiguilles Rouges, où les chiens sont purement interdits.`,
      es: `Chamonix se asienta en el valle del Mont Blanc con senderos señalizados que arrancan desde el propio pueblo, incluidos los Petits Balcons Nord y Sud, que suben por las laderas del valle para horas de desnivel real con el perro atado. Reserva el teleférico de la Aiguille du Midi para una salida sin él: los perros (salvo los de asistencia) no están admitidos, y la ruta del Lac Blanc por el Grand Balcon Sud cruza la reserva natural de las Aiguilles Rouges, donde los perros están prohibidos sin excepción.`,
      pt: `Chamonix fica no vale do Mont Blanc com trilhos sinalizados que arrancam da própria vila, incluindo os Petits Balcons Nord e Sud, que sobem as encostas do vale para horas de desnível a sério com o cão em trela. Guarde o teleférico da Aiguille du Midi para uma saída sem ele: os cães (exceto cães de assistência) não são admitidos, e o trilho do Lac Blanc pelo Grand Balcon Sud atravessa a reserva natural das Aiguilles Rouges, onde os cães são proibidos sem exceção.`,
    },
  },
  {
    slug: 'windermere',
    name: 'Windermere',
    country: 'United Kingdom',
    tag: {
      en: 'Lake District fells, off-lead access land',
      fr: 'Fells du Lake District, terrain sans laisse',
      es: 'Fells del Lake District, terreno sin correa',
      pt: 'Fells do Lake District, terreno sem trela',
    },
    why: {
      en: `The fells above Windermere give a working dog genuine off-lead hiking on open access land, away from grazing sheep. Orrest Head is the classic starter climb, a short circuit with a big payoff view over the whole lake. English law requires a lead on open access land between 1 March and 31 July and near livestock at any time, so check the route and the season before letting a dog off.`,
      fr: `Les fells au-dessus de Windermere offrent à un chien actif de vraies randonnées sans laisse sur les terrains à accès libre, loin des moutons en pâture. Orrest Head est l'ascension classique de départ, un circuit court avec une vue d'ensemble sur tout le lac en récompense. La loi anglaise impose la laisse sur les terrains à accès libre entre le 1er mars et le 31 juillet et à proximité du bétail en toute saison, vérifiez donc l'itinéraire et la période avant de le détacher.`,
      es: `Los fells sobre Windermere ofrecen a un perro activo caminatas de verdad sin correa en terreno de acceso libre, lejos de las ovejas en pastoreo. Orrest Head es la subida clásica para empezar, un circuito corto con una vista de recompensa sobre todo el lago. La ley inglesa exige la correa en terreno de acceso libre entre el 1 de marzo y el 31 de julio y cerca del ganado en cualquier época, así que comprueba la ruta y la temporada antes de soltarlo.`,
      pt: `Os fells acima de Windermere dão a um cão ativo caminhadas verdadeiras sem trela em terreno de acesso livre, longe das ovelhas em pastoreio. Orrest Head é a subida clássica para começar, um circuito curto com uma vista de recompensa sobre todo o lago. A lei inglesa exige a trela em terreno de acesso livre entre 1 de março e 31 de julho e perto de gado em qualquer época, por isso verifique o percurso e a estação antes de o soltar.`,
    },
  },
  {
    slug: 'interlaken',
    name: 'Interlaken',
    country: 'Switzerland',
    tag: {
      en: 'Two lakes, Harder Kulm funicular',
      fr: 'Deux lacs, funiculaire du Harder Kulm',
      es: 'Dos lagos, funicular del Harder Kulm',
      pt: 'Dois lagos, funicular do Harder Kulm',
    },
    why: {
      en: `Interlaken sits between Lake Thun and Lake Brienz, and the Harder Kulm funicular carries leashed dogs to the summit free of charge, dropping you onto alpine trails with a view over both lakes at once. Lakeshore paths on either side connect into longer day hikes for a dog that has already done the funicular loop and wants more.`,
      fr: `Interlaken se niche entre le lac de Thoune et le lac de Brienz, et le funiculaire du Harder Kulm transporte gratuitement les chiens en laisse jusqu'au sommet, avec des sentiers alpins offrant une vue sur les deux lacs à la fois. Les chemins de rive de part et d'autre se prolongent en randonnées plus longues pour un chien qui a déjà fait la boucle du funiculaire et en veut encore.`,
      es: `Interlaken se sitúa entre el lago de Thun y el lago de Brienz, y el funicular del Harder Kulm sube gratis a los perros con correa hasta la cumbre, con senderos alpinos que ofrecen vistas de ambos lagos a la vez. Los caminos de orilla a ambos lados enlazan con caminatas más largas para un perro que ya ha hecho el circuito del funicular y quiere más.`,
      pt: `Interlaken fica entre o lago de Thun e o lago de Brienz, e o funicular do Harder Kulm sobe gratuitamente cães com trela até ao cume, com trilhos alpinos e vista sobre os dois lagos ao mesmo tempo. Os caminhos ribeirinhos de ambos os lados ligam a caminhadas mais longas para um cão que já fez o circuito do funicular e quer mais.`,
    },
  },
  {
    slug: 'zell-am-see',
    name: 'Zell am See',
    country: 'Austria',
    tag: {
      en: '11 km lake loop, alpine climbs',
      fr: 'Boucle du lac de 11 km, ascensions alpines',
      es: 'Circuito de lago de 11 km, ascensos alpinos',
      pt: 'Circuito de lago de 11 km, subidas alpinas',
    },
    why: {
      en: `The Zeller See loop is an almost-flat 11 km circuit right from town, an easy warm-up lap with a small fenced dog area near the car park at one end. From there the Schmittenhöhe slopes and the wider Hohe Tauern foothills toward Kaprun climb into steeper, longer routes for a dog that needs more than a lakeside stroll.`,
      fr: `La boucle du Zeller See est un circuit quasi plat de 11 km au départ même de la ville, un tour d'échauffement facile avec un petit parc à chiens clôturé près du parking à une extrémité. À partir de là, les pentes du Schmittenhöhe et les contreforts plus larges du Hohe Tauern vers Kaprun grimpent vers des itinéraires plus raides et plus longs pour un chien qui veut plus qu'une balade au bord du lac.`,
      es: `El circuito del Zeller See es un recorrido casi llano de 11 km desde el propio pueblo, una vuelta de calentamiento fácil con un pequeño parque canino vallado cerca del aparcamiento en un extremo. A partir de ahí, las laderas del Schmittenhöhe y los contrafuertes más amplios del Hohe Tauern hacia Kaprun suben hacia rutas más empinadas y largas para un perro que necesita más que un paseo junto al lago.`,
      pt: `O circuito do Zeller See é um percurso quase plano de 11 km a partir da própria vila, uma volta de aquecimento fácil com um pequeno parque canino vedado perto do parque de estacionamento numa extremidade. A partir daí, as encostas do Schmittenhöhe e os contrafortes mais amplos do Hohe Tauern em direção a Kaprun sobem para rotas mais íngremes e longas para um cão que precisa de mais do que um passeio à beira do lago.`,
    },
  },
  {
    slug: 'annecy',
    name: 'Annecy',
    country: 'France',
    tag: {
      en: 'Voie verte lakeshore, Semnoz plateau',
      fr: 'Voie verte du lac, plateau du Semnoz',
      es: 'Voie verte del lago, meseta del Semnoz',
      pt: 'Voie verte do lago, planalto do Semnoz',
    },
    why: {
      en: `The voie verte around Lake Annecy is a paved greenway open to leashed dogs, running along the water through several villages for nearly 33 km one-way, more than enough distance for a big dog's daily legs. For real elevation, the Semnoz plateau above town climbs past 1,600 metres on trails that allow dogs on lead, with views back down over the whole lake.`,
      fr: `La voie verte du lac d'Annecy est une piste goudronnée ouverte aux chiens en laisse, longeant l'eau à travers plusieurs villages sur près de 33 km en aller simple, largement de quoi épuiser les pattes d'un grand chien en une journée. Pour du vrai dénivelé, le plateau du Semnoz au-dessus de la ville grimpe au-delà de 1 600 mètres sur des sentiers qui admettent les chiens tenus en laisse, avec vue plongeante sur tout le lac.`,
      es: `La voie verte del lago de Annecy es un carril pavimentado abierto a perros con correa, que recorre la orilla a través de varios pueblos durante casi 33 km en un solo sentido, más que suficiente para agotar las patas de un perro grande en un día. Para desnivel real, la meseta del Semnoz sobre el pueblo sube más allá de los 1.600 metros por senderos que admiten perros atados, con vistas sobre todo el lago.`,
      pt: `A voie verte do lago de Annecy é uma via pavimentada aberta a cães com trela, que acompanha a água por várias aldeias ao longo de quase 33 km num só sentido, mais do que suficiente para cansar as patas de um cão grande num dia. Para desnível a sério, o planalto do Semnoz acima da vila sobe além dos 1.600 metros em trilhos que admitem cães presos à trela, com vista sobre todo o lago.`,
    },
  },
  {
    slug: 'innsbruck',
    name: 'Innsbruck',
    country: 'Austria',
    tag: {
      en: 'Nordkette cable car, alpine trails',
      fr: 'Téléphérique du Nordkette, sentiers alpins',
      es: 'Teleférico del Nordkette, senderos alpinos',
      pt: 'Teleférico do Nordkette, trilhos alpinos',
    },
    why: {
      en: `The Nordkette cable car lifts leashed or muzzled dogs from the city centre to alpine terrain above 2,200 metres in about 20 minutes, dropping you straight onto high-altitude hiking trails. Back in the valley, the paths along the Inn river give flat, easy miles for a cool-down lap, and the Patscherkofel side of town, reached from Igls, adds a separate, quieter hiking network for another day.`,
      fr: `Le téléphérique du Nordkette hisse les chiens en laisse ou muselés depuis le centre-ville jusqu'à un terrain alpin au-delà de 2 200 mètres en une vingtaine de minutes, pour déboucher directement sur des sentiers de haute altitude. Dans la vallée, les chemins le long de l'Inn offrent des kilomètres plats et faciles pour une boucle de récupération, et le versant du Patscherkofel, accessible depuis Igls, ajoute un réseau de randonnée séparé et plus calme pour une autre journée.`,
      es: `El teleférico del Nordkette sube a perros con correa o bozal desde el centro de la ciudad hasta terreno alpino por encima de los 2.200 metros en unos 20 minutos, dejándote directamente en senderos de alta montaña. De vuelta en el valle, los caminos junto al río Inn ofrecen kilómetros llanos y fáciles para una vuelta de recuperación, y el lado del Patscherkofel, al que se llega desde Igls, añade una red de senderismo aparte y más tranquila para otro día.`,
      pt: `O teleférico do Nordkette leva cães com trela ou açaime do centro da cidade até terreno alpino acima dos 2.200 metros em cerca de 20 minutos, deixando-o diretamente em trilhos de alta altitude. De volta ao vale, os caminhos junto ao rio Inn oferecem quilómetros planos e fáceis para uma volta de recuperação, e o lado do Patscherkofel, alcançável a partir de Igls, acrescenta uma rede de caminhadas separada e mais tranquila para outro dia.`,
    },
  },
]

const SIBLING_GUIDES = [
  { slug: 'alpes-chien', emoji: '🏔️', label: { en: 'Alpine cities: Geneva → Zurich → Munich → Salzburg', fr: 'Villes alpines : Genève → Zurich → Munich → Salzbourg', es: 'Ciudades alpinas: Ginebra → Zúrich → Múnich → Salzburgo', pt: 'Cidades alpinas: Genebra → Zurique → Munique → Salzburgo' } },
  { slug: 'fenced-dog-parks-europe', emoji: '🌳', label: { en: 'Fenced dog parks in Europe', fr: 'Parcs canins clôturés en Europe', es: 'Parques caninos vallados en Europa', pt: 'Parques caninos vedados na Europa' } },
  { slug: 'dog-friendly-europe-by-month', emoji: '📅', label: { en: 'Dog-friendly Europe by month', fr: 'Europe dog-friendly mois par mois', es: 'Europa dog-friendly mes a mes', pt: 'Europa dog-friendly mês a mês' } },
]

// Top 3 value-sorted, real pet-friendly hotels per featured destination, shown
// inline on each card so the guide is a money page in itself (3 internal links
// to hotel pages per destination), not just a list.
const HOTELS_BY_DEST: Record<string, typeof hotels> = {}
for (const slug of DESTINATIONS.map((d) => d.slug)) {
  HOTELS_BY_DEST[slug] = valueSort(hotels.filter((h) => h.destinationSlug === slug)).slice(0, 3)
}

const T = {
  title: {
    en: 'Best Destinations for a High-Energy Dog That Needs Big Walks',
    fr: `Meilleures destinations pour un chien très actif qui a besoin de grandes marches`,
    es: 'Mejores destinos para un perro muy activo que necesita grandes caminatas',
    pt: 'Melhores destinos para um cão muito ativo que precisa de grandes caminhadas',
  },
  metaTitle: {
    en: '6 Best Destinations for a High-Energy Dog in Europe (2026)',
    fr: `6 meilleures destinations pour un chien très actif en Europe (2026)`,
    es: '6 mejores destinos para un perro muy activo en Europa (2026)',
    pt: '6 melhores destinos para um cão muito ativo na Europa (2026)',
  },
  metaDesc: {
    en: 'Alpine and lake destinations built for a working dog, not a stroll: real trails, distances and lift policies, verified. Pet-friendly hotels included.',
    fr: `Des destinations alpines et lacustres pensées pour un chien de travail, pas pour une balade : vrais sentiers, distances et règles de remontées, vérifiés. Hôtels pet-friendly inclus.`,
    es: 'Destinos alpinos y de lago pensados para un perro de trabajo, no para un paseo: senderos reales, distancias y normas de remontes, verificados. Hoteles pet-friendly incluidos.',
    pt: 'Destinos alpinos e de lago pensados para um cão de trabalho, não para um passeio: trilhos reais, distâncias e regras de teleféricos, verificados. Hotéis pet-friendly incluídos.',
  },
  intro: {
    en: `A Border Collie, Vizsla or working Labrador doesn't want a 20-minute stroll around the block, it wants hours of real terrain: hills, distance and somewhere to actually stretch out. These six alpine and lake destinations across France, England, Switzerland and Austria give a high-energy dog what a beach town can't: graded trails, lakeshore loops long enough to matter, and lifts that mostly, though not always, welcome a leashed dog to the high ground.`,
    fr: `Un Border Collie, un Vizsla ou un Labrador de travail ne veut pas d'une balade de 20 minutes autour du pâté de maisons, il veut des heures de vrai terrain : du dénivelé, de la distance et de quoi vraiment se dégourdir. Ces six destinations alpines et lacustres en France, en Angleterre, en Suisse et en Autriche offrent à un chien très actif ce qu'une ville balnéaire ne peut pas : des sentiers balisés, des boucles au bord du lac assez longues pour compter, et des remontées qui, la plupart du temps mais pas toujours, acceptent un chien en laisse en altitude.`,
    es: `Un Border Collie, un Vizsla o un Labrador de trabajo no quiere un paseo de 20 minutos a la vuelta de la manzana, quiere horas de terreno real: desnivel, distancia y espacio para estirarse de verdad. Estos seis destinos alpinos y de lago en Francia, Inglaterra, Suiza y Austria ofrecen a un perro muy activo lo que un destino de playa no puede: senderos señalizados, circuitos de lago lo bastante largos para contar, y remontes que, la mayoría de las veces aunque no siempre, admiten a un perro con correa en altitud.`,
    pt: `Um Border Collie, um Vizsla ou um Labrador de trabalho não quer um passeio de 20 minutos ao quarteirão, quer horas de terreno a sério: desnível, distância e espaço para esticar as pernas de verdade. Estes seis destinos alpinos e de lago em França, Inglaterra, Suíça e Áustria dão a um cão muito ativo o que uma vila de praia não consegue: trilhos sinalizados, circuitos à beira do lago suficientemente longos para contar, e teleféricos que, na maioria das vezes mas nem sempre, aceitam um cão com trela em altitude.`,
  },
  seeHotels: { en: 'See pet-friendly hotels', fr: 'Voir les hôtels pet-friendly', es: 'Ver hoteles pet-friendly', pt: 'Ver hotéis pet-friendly' },
  seeGuide: { en: 'Destination guide', fr: 'Guide destination', es: 'Guía del destino', pt: 'Guia do destino' },
  fromWord: { en: 'from', fr: 'dès', es: 'desde', pt: 'desde' },
  noFee: { en: 'no pet fee', fr: 'sans supplément', es: 'sin cargo mascota', pt: 'sem suplemento' },
  ourPicks: { en: '3 pet-friendly picks', fr: '3 adresses pet-friendly', es: '3 opciones pet-friendly', pt: '3 opções pet-friendly' },
  breadHome: { en: 'Home', fr: 'Accueil', es: 'Inicio', pt: 'Início' },
  breadGuides: { en: 'Guides', fr: 'Guides', es: 'Guías', pt: 'Guias' },
  kicker: { en: 'By dog profile', fr: 'Par profil de chien', es: 'Por perfil de perro', pt: 'Por perfil de cão' },
  closingTitle: {
    en: 'A note on heat and altitude',
    fr: `Une note sur la chaleur et l'altitude`,
    es: 'Una nota sobre el calor y la altitud',
    pt: 'Uma nota sobre o calor e a altitude',
  },
  closingText: {
    en: `Altitude and heat both change the rules for a working dog. Above roughly 2,000 metres, pad protection and rest breaks matter more, a dog isn't acclimatised to altitude any faster than a person is. On hot valley-floor days, walk the big miles at dawn or dusk and save the cable-car summits for the heat of the afternoon, tarmac and rock get dangerously hot for paws well before the air does.`,
    fr: `L'altitude et la chaleur changent toutes les deux la donne pour un chien de travail. Au-delà d'environ 2 000 mètres, la protection des coussinets et les pauses comptent davantage, un chien ne s'acclimate pas plus vite à l'altitude qu'une personne. Les jours chauds en fond de vallée, faites les grandes distances tôt le matin ou en soirée et gardez les sommets en téléphérique pour l'heure la plus chaude, le bitume et la roche deviennent dangereux pour les coussinets bien avant que l'air ne le devienne.`,
    es: `La altitud y el calor cambian ambas las reglas para un perro de trabajo. Por encima de unos 2.000 metros, la protección de las almohadillas y las pausas importan más, un perro no se aclimata a la altitud más rápido que una persona. En los días calurosos en el fondo del valle, camina los grandes tramos al amanecer o al atardecer y reserva las cumbres en teleférico para la hora más calurosa, el asfalto y la roca se vuelven peligrosos para las almohadillas mucho antes que el aire.`,
    pt: `A altitude e o calor mudam ambos as regras para um cão de trabalho. Acima de cerca de 2.000 metros, a proteção das almofadinhas e as pausas contam mais, um cão não se aclimata à altitude mais depressa do que uma pessoa. Nos dias quentes no fundo do vale, faça as grandes distâncias ao amanhecer ou ao entardecer e guarde os cumes de teleférico para a hora mais quente, o alcatrão e a rocha ficam perigosos para as almofadinhas bem antes do ar.`,
  },
  siblingTitle: { en: 'Plan the rest of the trip', fr: `Planifier le reste du voyage`, es: 'Planifica el resto del viaje', pt: 'Planeie o resto da viagem' },
  faq: {
    q1: {
      en: 'Which of these destinations gives a dog the most exercise?',
      fr: 'Laquelle de ces destinations fait le plus dépenser un chien ?',
      es: '¿Cuál de estos destinos hace gastar más energía a un perro?',
      pt: 'Qual destes destinos faz um cão gastar mais energia?',
    },
    a1: {
      en: `Annecy and Chamonix offer the most combined distance and elevation: nearly 33 km of flat lakeshore greenway in Annecy plus a climb past 1,600 metres on the Semnoz, or the graded Petits Balcons trails climbing the Mont Blanc valley flanks from Chamonix. Windermere is the best pick for genuine off-lead running, since large stretches of open access land in the Lake District allow it away from livestock.`,
      fr: `Annecy et Chamonix offrent le plus de distance et de dénivelé combinés : près de 33 km de voie verte plate au bord du lac à Annecy, plus une ascension au-delà de 1 600 mètres sur le Semnoz, ou les sentiers balisés des Petits Balcons qui grimpent les flancs de la vallée du Mont-Blanc depuis Chamonix. Windermere reste le meilleur choix pour de la vraie course sans laisse, de larges étendues de terrain à accès libre dans le Lake District le permettant loin du bétail.`,
      es: `Annecy y Chamonix ofrecen la mayor distancia y desnivel combinados: casi 33 km de voie verte plana junto al lago en Annecy, más un ascenso más allá de los 1.600 metros en el Semnoz, o los senderos señalizados de los Petits Balcons que suben las laderas del valle del Mont Blanc desde Chamonix. Windermere es la mejor opción para correr de verdad sin correa, ya que amplias extensiones de terreno de acceso libre en el Lake District lo permiten lejos del ganado.`,
      pt: `Annecy e Chamonix oferecem a maior distância e desnível combinados: quase 33 km de voie verte plana à beira do lago em Annecy, mais uma subida além dos 1.600 metros no Semnoz, ou os trilhos sinalizados dos Petits Balcons que sobem as encostas do vale do Mont Blanc a partir de Chamonix. Windermere é a melhor escolha para correr de verdade sem trela, já que grandes extensões de terreno de acesso livre no Lake District o permitem, longe do gado.`,
    },
    q2: {
      en: 'Can I take my dog on cable cars and mountain lifts in these destinations?',
      fr: 'Puis-je emmener mon chien dans les téléphériques et remontées de ces destinations ?',
      es: '¿Puedo llevar a mi perro en los teleféricos y remontes de estos destinos?',
      pt: 'Posso levar o meu cão nos teleféricos destes destinos?',
    },
    a2: {
      en: `It depends on the lift. Interlaken's Harder Kulm funicular and Innsbruck's Nordkette cable car both carry leashed or muzzled dogs. Chamonix's Aiguille du Midi cable car does not accept dogs (other than assistance dogs), and the Lac Blanc trail beyond it crosses a nature reserve where dogs are banned entirely, so check each lift's own policy before you plan a route around it.`,
      fr: `Cela dépend de la remontée. Le funiculaire du Harder Kulm à Interlaken et le téléphérique du Nordkette à Innsbruck transportent tous deux les chiens en laisse ou muselés. Le téléphérique de l'Aiguille du Midi à Chamonix n'accepte pas les chiens (hors chiens d'assistance), et le sentier du Lac Blanc au-delà traverse une réserve naturelle où les chiens sont totalement interdits, vérifiez donc la politique de chaque remontée avant de bâtir un itinéraire autour.`,
      es: `Depende del remonte. El funicular del Harder Kulm en Interlaken y el teleférico del Nordkette en Innsbruck transportan a perros con correa o bozal. El teleférico de la Aiguille du Midi en Chamonix no admite perros (salvo los de asistencia), y el sendero del Lac Blanc más allá cruza una reserva natural donde los perros están totalmente prohibidos, así que comprueba la política de cada remonte antes de planear una ruta en torno a él.`,
      pt: `Depende do teleférico. O funicular do Harder Kulm em Interlaken e o teleférico do Nordkette em Innsbruck transportam ambos cães com trela ou açaime. O teleférico da Aiguille du Midi em Chamonix não aceita cães (exceto cães de assistência), e o trilho do Lac Blanc além dele atravessa uma reserva natural onde os cães são totalmente proibidos, por isso verifique a política de cada teleférico antes de planear uma rota à sua volta.`,
    },
    q3: {
      en: 'Is high-altitude hiking safe for a dog?',
      fr: `La randonnée en haute altitude est-elle sûre pour un chien ?`,
      es: '¿Es segura la caminata en alta montaña para un perro?',
      pt: 'A caminhada em alta altitude é segura para um cão?',
    },
    a3: {
      en: `Most healthy adult dogs handle the altitudes reached by lifts in this guide, roughly 2,000 to 2,300 metres, without issue, but build up gradually rather than sprinting straight up a summit trail on day one. Watch paw pads on rocky or scree terrain, carry water since alpine streams aren't always safe to drink from, and turn back at the first sign of excessive panting, stumbling or reluctance to continue.`,
      fr: `La plupart des chiens adultes en bonne santé supportent sans problème les altitudes atteintes par les remontées de ce guide, environ 2 000 à 2 300 mètres, mais montez progressivement plutôt que de foncer d'entrée sur un sentier de sommet le premier jour. Surveillez les coussinets sur terrain rocheux ou d'éboulis, emportez de l'eau car les ruisseaux alpins ne sont pas toujours sûrs à boire, et rebroussez chemin au moindre signe de halètement excessif, de trébuchement ou de réticence à continuer.`,
      es: `La mayoría de los perros adultos sanos soportan sin problema las altitudes que alcanzan los remontes de esta guía, unos 2.000 a 2.300 metros, pero sube de forma gradual en lugar de lanzarte directo a un sendero de cumbre el primer día. Vigila las almohadillas en terreno rocoso o de pedregal, lleva agua porque los arroyos alpinos no siempre son seguros para beber, y da la vuelta ante el primer signo de jadeo excesivo, tropiezos o reticencia a continuar.`,
      pt: `A maioria dos cães adultos saudáveis aguenta sem problemas as altitudes atingidas pelos teleféricos deste guia, cerca de 2.000 a 2.300 metros, mas suba gradualmente em vez de avançar diretamente para um trilho de cume no primeiro dia. Vigie as almofadinhas em terreno rochoso ou de pedras soltas, leve água porque os ribeiros alpinos nem sempre são seguros para beber, e volte para trás ao primeiro sinal de ofegar excessivo, tropeços ou relutância em continuar.`,
    },
  },
}

const p = (o: L4, locale: string) =>
  locale === 'fr' ? o.fr : locale === 'es' ? o.es : locale === 'pt' ? o.pt : o.en

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
  return {
    title: `${p(T.metaTitle, locale)}`,
    description: p(T.metaDesc, locale),
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/${SLUG}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}/guides/${SLUG}`])),
        'x-default': `${SITE_URL}/en/guides/${SLUG}`,
      },
    },
    openGraph: {
      title: p(T.metaTitle, locale),
      description: p(T.metaDesc, locale),
      type: 'article',
      url: `${SITE_URL}/${locale}/guides/${SLUG}`,
    },
  }
}

export default async function HighEnergyDogDestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: p(T.breadHome, locale), item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: p(T.breadGuides, locale), item: `${SITE_URL}/${locale}/guides` },
      { '@type': 'ListItem', position: 3, name: p(T.metaTitle, locale), item: `${SITE_URL}/${locale}/guides/${SLUG}` },
    ],
  }

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p(T.metaTitle, locale),
    description: p(T.metaDesc, locale),
    inLanguage: locale,
    author: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/${locale}/guides/${SLUG}`,
  }

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: DESTINATIONS.length,
    itemListElement: DESTINATIONS.map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/${locale}/destinations/${d.slug}`,
      name: getLocalizedCityName(d.slug, d.name, locale),
    })),
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: p(T.faq.q1, locale), acceptedAnswer: { '@type': 'Answer', text: p(T.faq.a1, locale) } },
      { '@type': 'Question', name: p(T.faq.q2, locale), acceptedAnswer: { '@type': 'Answer', text: p(T.faq.a2, locale) } },
      { '@type': 'Question', name: p(T.faq.q3, locale), acceptedAnswer: { '@type': 'Answer', text: p(T.faq.a3, locale) } },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="text-white/60 text-xs mb-4">
            <Link href={`/${locale}`} className="hover:text-white">{p(T.breadHome, locale)}</Link>
            <span className="mx-1.5">/</span>
            <Link href={`/${locale}/guides`} className="hover:text-white">{p(T.breadGuides, locale)}</Link>
          </nav>
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            🥾 {p(T.kicker, locale)}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-5">
            {p(T.title, locale)}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
            {p(T.intro, locale)}
          </p>
          {/* Destination jump links */}
          <div className="flex flex-wrap gap-2 mt-8">
            {DESTINATIONS.map((d) => (
              <a
                key={d.slug}
                href={`#${d.slug}`}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-full transition-colors"
              >
                🥾 {getLocalizedCityName(d.slug, d.name, locale)}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section>
          <div className="space-y-4">
            {DESTINATIONS.map((dest, idx) => (
              <div
                key={dest.slug}
                id={dest.slug}
                className="scroll-mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="relative h-40 sm:h-52">
                  <Image
                    src={`/images/destinations/${dest.slug}.jpg`}
                    alt={getLocalizedCityName(dest.slug, dest.name, locale)}
                    fill
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between gap-3">
                    <h3 className="text-white text-xl sm:text-2xl font-extrabold drop-shadow-sm">{getLocalizedCityName(dest.slug, dest.name, locale)}</h3>
                    <div className="flex-shrink-0 text-right text-white">
                      <div className="text-2xl font-black leading-none drop-shadow-sm">{String(idx + 1).padStart(2, '0')}</div>
                    </div>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                    {p(dest.tag, locale)}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{p(dest.why, locale)}</p>
                  {(HOTELS_BY_DEST[dest.slug] ?? []).length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{p(T.ourPicks, locale)}</div>
                      <div className="rounded-xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
                        {(HOTELS_BY_DEST[dest.slug] ?? []).map((h) => (
                          <Link
                            key={h.slug}
                            href={`/${locale}/hotels/${h.slug}`}
                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-emerald-50/60 transition-colors"
                          >
                            <Image
                              src={`/images/hotels/${h.id}.jpg`}
                              alt={h.name}
                              width={64}
                              height={48}
                              className="w-16 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-semibold text-gray-900 truncate">{h.name}</span>
                              <span className="block text-xs text-gray-500">
                                {'★'.repeat(h.stars || 0)} · {h.rating.toFixed(1)}/10{h.petFee === 0 ? ` · ${p(T.noFee, locale)}` : ''}
                              </span>
                            </span>
                            <span className="flex-shrink-0 text-right">
                              <span className="block text-[11px] text-gray-400">{p(T.fromWord, locale)}</span>
                              <span className="block text-sm font-bold text-gray-900">{h.currency === 'GBP' ? '£' : '€'}{h.priceFrom}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={buildAllezDestLink(dest.name, dest.country, `${CAMPAIGN}-${dest.slug}`, 3)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
                    >
                      🏨 {p(T.seeHotels, locale)}
                    </a>
                    <Link
                      href={`/${locale}/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-1.5 border border-gray-200 hover:border-emerald-300 text-gray-700 hover:text-emerald-700 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                    >
                      🐾 {p(T.seeGuide, locale)}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing safety note */}
        <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-3">{p(T.closingTitle, locale)}</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{p(T.closingText, locale)}</p>
        </section>

        {/* Sibling guides */}
        <section className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-5">{p(T.siblingTitle, locale)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SIBLING_GUIDES.map((g) => (
              <Link
                key={g.slug}
                href={`/${locale}/guides/${g.slug}`}
                className="group flex items-start gap-3 bg-white rounded-2xl border border-gray-100 hover:border-emerald-300 hover:shadow-md transition-all p-4"
              >
                <span className="text-2xl flex-shrink-0">{g.emoji}</span>
                <p className="font-semibold text-gray-900 text-sm group-hover:text-emerald-700 transition-colors leading-snug">
                  {p(g.label, locale)}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="space-y-3">
            {[
              { q: T.faq.q1, a: T.faq.a1 },
              { q: T.faq.q2, a: T.faq.a2 },
              { q: T.faq.q3, a: T.faq.a3 },
            ].map((f, i) => (
              <details key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm group">
                <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                  {p(f.q, locale)}
                  <span aria-hidden="true" className="text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                </summary>
                <p className="px-6 pb-5 text-gray-600 leading-relaxed">{p(f.a, locale)}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <GuideFooter locale={locale} currentSlug={SLUG} />
    </>
  )
}
