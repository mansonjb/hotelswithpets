import type { Metadata } from 'next'
import Link from 'next/link'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'espagne-fraiche-chien'
const CAMPAIGN = 'espagne-fraiche'

type L4 = { en: string; fr: string; es: string; pt: string }
type City = {
  slug: string
  name: string
  region: L4
  julyTemp: number
  tag: L4
  why: L4
  dogTip: L4
}
type Region = {
  id: string
  emoji: string
  title: L4
  cities: City[]
}

// Revenue signals: Oviedo €8.22 (PT user, dogfriendly campaign, Aug booking)
// Salamanca €2.59 (ES user, beaches campaign), Tarifa €55.47 (beaches)
// Strategy: cover the cool North (Basque, Cantabria, Asturias, Galicia) + Pyrenees
const REGIONS: Region[] = [
  {
    id: 'pays-basque',
    emoji: '🌊',
    title: {
      en: 'Basque Country',
      fr: 'Pays basque',
      es: 'País Vasco',
      pt: 'País Basco',
    },
    cities: [
      {
        slug: 'san-sebastian',
        name: 'San Sebastián',
        region: { en: 'Basque Country', fr: 'Pays basque', es: 'País Vasco', pt: 'País Basco' },
        julyTemp: 22,
        tag: { en: 'Atlantic surf coast', fr: 'Côte surf atlantique', es: 'Costa surf atlántica', pt: 'Costa surf atlântica' },
        why: {
          en: "The Basque coast stays at 22°C while Madrid hits 38°C. La Concha beach allows dogs before 10am and after 8pm in summer — the most famous urban dog beach in Spain. Ondarreta beach is dog-friendly year-round. The pintxos bars on Calle 31 de Agosto accept dogs on terrace. The old town is fully walkable with dogs.",
          fr: "La côte basque tient à 22°C pendant que Madrid atteint 38°C. La plage de la Concha autorise les chiens avant 10h et après 20h en été — la plus célèbre plage urbaine dog-friendly d'Espagne. Ondarreta est ouverte aux chiens toute l'année. Les bars à pintxos de la Calle 31 de Agosto acceptent les chiens en terrasse.",
          es: "La costa vasca se mantiene a 22°C mientras Madrid alcanza los 38°C. La playa de la Concha permite perros antes de las 10h y después de las 20h en verano — la playa urbana dog-friendly más famosa de España. Ondarreta es dog-friendly todo el año. Los bares de pintxos de la Calle 31 de Agosto aceptan perros en terraza.",
          pt: "A costa basca mantém-se a 22°C enquanto Madrid atinge 38°C. A praia da Concha permite cães antes das 10h e depois das 20h no verão — a praia urbana dog-friendly mais famosa de Espanha. Ondarreta é dog-friendly durante todo o ano. Os bares de pintxos da Calle 31 de Agosto aceitam cães na esplanada.",
        },
        dogTip: {
          en: 'Monte Urgull summit trail: 30 min off-lead, 360° bay views, almost always deserted.',
          fr: 'Sentier du Monte Urgull : 30 min sans laisse, vue 360° sur la baie, presque toujours désert.',
          es: 'Sendero del Monte Urgull: 30 min sin correa, vistas 360° de la bahía, casi siempre desierto.',
          pt: 'Trilho do Monte Urgull: 30 min sem trela, vistas 360° da baía, quase sempre deserto.',
        },
      },
      {
        slug: 'bilbao',
        name: 'Bilbao',
        region: { en: 'Basque Country', fr: 'Pays basque', es: 'País Vasco', pt: 'País Basco' },
        julyTemp: 22,
        tag: { en: 'Guggenheim city · Nervión river', fr: 'Ville du Guggenheim · río Nervión', es: 'Ciudad Guggenheim · ría del Nervión', pt: 'Cidade Guggenheim · ria do Nervión' },
        why: {
          en: "Bilbao sits inland but benefits from the same Atlantic air that keeps the Basque coast cool. The Nervión riverbank walkway is 12 km of flat, shaded dog walking. Parque Etxebarria is off-lead from the car park to the viewpoint. The Mercado de la Ribera terrace restaurants allow dogs. Cable car up to Artxanda mountain: dogs free.",
          fr: "Bilbao est en intérieur mais bénéficie du même air atlantique qui maintient la côte basque fraîche. La promenade du río Nervión fait 12 km de marche plate et ombragée pour les chiens. Parque Etxebarria est sans laisse du parking au belvédère. Les restaurants-terrasse du Mercado de la Ribera acceptent les chiens. Téléphérique vers le mont Artxanda : chiens gratuits.",
          es: "Bilbao está en el interior pero se beneficia del mismo aire atlántico que mantiene fresca la costa vasca. El paseo de la ría del Nervión son 12 km de paseo llano y sombreado para perros. El Parque Etxebarria es sin correa desde el aparcamiento hasta el mirador. Los restaurantes-terraza del Mercado de la Ribera aceptan perros. Teleférico al monte Artxanda: perros gratis.",
          pt: "Bilbau fica no interior mas beneficia do mesmo ar atlântico que mantém a costa basca fresca. O passeio do rio Nervión tem 12 km de caminhada plana e ensombrada para cães. O Parque Etxebarria é sem trela desde o parque de estacionamento até ao miradouro. Os restaurantes-esplanada do Mercado de la Ribera aceitam cães. Teleférico até ao monte Artxanda: cães grátis.",
        },
        dogTip: {
          en: 'Parque Natural Urkiola, 45 min by car: vast beech forest, off-lead, cool even in August.',
          fr: 'Parc Naturel Urkiola, 45 min en voiture : vaste forêt de hêtres, sans laisse, frais même en août.',
          es: 'Parque Natural de Urkiola, 45 min en coche: amplio hayedo, sin correa, fresco incluso en agosto.',
          pt: 'Parque Natural Urkiola, 45 min de carro: vasta floresta de faias, sem trela, fresco mesmo em agosto.',
        },
      },
    ],
  },
  {
    id: 'cantabrie',
    emoji: '🏖️',
    title: {
      en: 'Cantabria',
      fr: 'Cantabrie',
      es: 'Cantabria',
      pt: 'Cantábria',
    },
    cities: [
      {
        slug: 'santander',
        name: 'Santander',
        region: { en: 'Cantabria', fr: 'Cantabrie', es: 'Cantabria', pt: 'Cantábria' },
        julyTemp: 20,
        tag: { en: 'Atlantic bay · royal summer city', fr: 'Baie atlantique · ville royale d\'été', es: 'Bahía atlántica · ciudad real de verano', pt: 'Baía atlântica · cidade real de verão' },
        why: {
          en: "Santander sits on a peninsula between two bays, with sea breezes that rarely allow July to exceed 20°C. El Sardinero beach allows dogs before 10am and after 8pm. The Magdalena Peninsula park (former royal summer palace grounds) is 11 hectares of cliffs and gardens, mostly off-lead. Cantabria has the highest density of dog-friendly restaurants in northern Spain.",
          fr: "Santander occupe une péninsule entre deux baies, avec des brises marines qui dépassent rarement 20°C en juillet. La plage d'El Sardinero autorise les chiens avant 10h et après 20h. La péninsule de la Magdalena (anciens jardins de la résidence royale d'été) fait 11 hectares de falaises et jardins, majoritairement sans laisse. La Cantabrie a la plus haute densité de restaurants dog-friendly du Nord espagnol.",
          es: "Santander ocupa una península entre dos bahías, con brisas marinas que rara vez superan los 20°C en julio. La playa del Sardinero permite perros antes de las 10h y después de las 20h. La Península de la Magdalena (antigua residencia real de verano) tiene 11 hectáreas de acantilados y jardines, mayormente sin correa. Cantabria tiene la mayor densidad de restaurantes dog-friendly del norte de España.",
          pt: "Santander ocupa uma península entre duas baías, com brisas marítimas que raramente ultrapassam os 20°C em julho. A praia de El Sardinero permite cães antes das 10h e depois das 20h. A Península da Magdalena (antigos jardins da residência real de verão) tem 11 hectares de falésias e jardins, maioritariamente sem trela. A Cantábria tem a maior densidade de restaurantes dog-friendly do norte de Espanha.",
        },
        dogTip: {
          en: 'Playa del Puntal, reached by ferry from the port: long strip of sand, almost no rules on dogs in low season.',
          fr: 'Playa del Puntal, accessible en ferry depuis le port : longue bande de sable, presque aucune règle pour les chiens en basse saison.',
          es: 'Playa del Puntal, accesible en ferry desde el puerto: larga franja de arena, casi sin restricciones para perros en temporada baja.',
          pt: 'Playa del Puntal, acessível de ferry a partir do porto: longa faixa de areia, quase sem restrições para cães na época baixa.',
        },
      },
    ],
  },
  {
    id: 'asturies',
    emoji: '🌿',
    title: {
      en: 'Asturias',
      fr: 'Asturies',
      es: 'Asturias',
      pt: 'Astúrias',
    },
    cities: [
      {
        slug: 'gijon',
        name: 'Gijón',
        region: { en: 'Asturias', fr: 'Asturies', es: 'Asturias', pt: 'Astúrias' },
        julyTemp: 18,
        tag: { en: 'Cider coast · 18°C', fr: 'Côte du cidre · 18°C', es: 'Costa de la sidra · 18°C', pt: 'Costa da sidra · 18°C' },
        why: {
          en: "Gijón is the coolest large city on the Iberian Peninsula at 18°C in July — on the same latitude as the Spanish Mediterranean coast, but facing the Atlantic. San Lorenzo beach (3 km) allows dogs year-round in the early morning. The Cimadevilla historic quarter is dog-friendly throughout. Sidrería (cider house) terraces are a cultural norm for dogs.",
          fr: "Gijón est la grande ville la plus fraîche de la péninsule ibérique à 18°C en juillet — à la même latitude que la côte méditerranéenne espagnole, mais face à l'Atlantique. La plage San Lorenzo (3 km) accepte les chiens toute l'année le matin. Le quartier historique de Cimadevilla est dog-friendly partout. Les terrasses de sidrerias (maisons du cidre) sont culturellement ouvertes aux chiens.",
          es: "Gijón es la ciudad grande más fresca de la Península Ibérica a 18°C en julio, con la misma latitud que la costa mediterránea española pero cara al Atlántico. La playa San Lorenzo (3 km) admite perros todo el año por la mañana. El barrio histórico de Cimadevilla es dog-friendly en toda su extensión. Las terrazas de las sidrería son culturalmente abiertas a los perros.",
          pt: "Gijón é a maior cidade mais fresca da Península Ibérica a 18°C em julho, com a mesma latitude que a costa mediterrânica espanhola mas voltada para o Atlântico. A praia de San Lorenzo (3 km) aceita cães durante todo o ano de manhã. O bairro histórico de Cimadevilla é dog-friendly em toda a sua extensão. As esplanadas das sidrerías são culturalmente abertas a cães.",
        },
        dogTip: {
          en: 'Cabo Peñas, 30 min west: the northernmost point of Spain, dramatic cliffs, year-round dogs off-lead on the heathland.',
          fr: 'Cabo Peñas, 30 min à l\'ouest : le point le plus au nord d\'Espagne, falaises spectaculaires, chiens sans laisse toute l\'année sur la lande.',
          es: 'Cabo Peñas, 30 min al oeste: el punto más al norte de España, acantilados espectaculares, perros sin correa todo el año en el monte.',
          pt: 'Cabo Peñas, 30 min a oeste: o ponto mais a norte de Espanha, falésias espetaculares, cães sem trela durante todo o ano na charneca.',
        },
      },
      {
        slug: 'oviedo',
        name: 'Oviedo',
        region: { en: 'Asturias', fr: 'Asturies', es: 'Asturias', pt: 'Astúrias' },
        julyTemp: 18,
        tag: { en: 'Pre-Romanesque capital · 18°C', fr: 'Capitale pré-romane · 18°C', es: 'Capital prerrománica · 18°C', pt: 'Capital pré-românica · 18°C' },
        why: {
          en: "Our top revenue signal for an inland Asturian city: €8.22 from a Portuguese user booking an August stay via our dog-friendly campaign. Oviedo sits at 228m with a constant Atlantic breeze — 18°C in July when Madrid suffocates at 36°C. The city's pre-Romanesque churches are on the UNESCO Camino trail, so pedestrian and dog-friendly streets are the norm. El Parque San Francisco (7 ha, city centre) is off-lead and densely shaded.",
          fr: "Notre meilleur signal revenu pour une ville intérieure asturienne : 8,22€ d'un utilisateur portugais réservant un séjour d'août via notre campagne dog-friendly. Oviedo est à 228m avec une brise atlantique constante — 18°C en juillet quand Madrid étouffe à 36°C. Les églises pré-romanes de la ville sont sur le Camino UNESCO, donc les rues piétonnes dog-friendly sont la norme. Le Parque San Francisco (7 ha, centre-ville) est sans laisse et densément ombragé.",
          es: "Nuestra mejor señal de ingresos para una ciudad interior asturiana: 8,22€ de un usuario portugués reservando una estancia de agosto mediante nuestra campaña dog-friendly. Oviedo está a 228m con brisa atlántica constante: 18°C en julio cuando Madrid se asfixia a 36°C. Las iglesias prerrománicas de la ciudad están en el Camino UNESCO, por lo que las calles peatonales dog-friendly son la norma. El Parque San Francisco (7 ha, centro) es sin correa y muy sombreado.",
          pt: "O nosso melhor sinal de receita para uma cidade interior asturiana: 8,22€ de um utilizador português a reservar uma estadia de agosto através da nossa campanha dog-friendly. Oviedo está a 228m com brisa atlântica constante: 18°C em julho quando Madrid sufoca a 36°C. As igrejas pré-românicas da cidade fazem parte do Caminho da UNESCO, por isso as ruas pedonais dog-friendly são a norma. O Parque San Francisco (7 ha, centro) é sem trela e densamente ensombrado.",
        },
        dogTip: {
          en: 'Monte Naranco (3 km from centre): UNESCO pre-Romanesque churches at 680m altitude, nearly always cool, trail is off-lead.',
          fr: 'Monte Naranco (3 km du centre) : églises pré-romanes UNESCO à 680m d\'altitude, presque toujours frais, sentier sans laisse.',
          es: 'Monte Naranco (3 km del centro): iglesias prerrománicas UNESCO a 680m de altitud, casi siempre fresco, sendero sin correa.',
          pt: 'Monte Naranco (3 km do centro): igrejas pré-românicas UNESCO a 680m de altitude, quase sempre fresco, trilho sem trela.',
        },
      },
    ],
  },
  {
    id: 'galice',
    emoji: '🌧️',
    title: {
      en: 'Galicia',
      fr: 'Galice',
      es: 'Galicia',
      pt: 'Galiza',
    },
    cities: [
      {
        slug: 'santiago-de-compostela',
        name: 'Santiago de Compostela',
        region: { en: 'Galicia', fr: 'Galice', es: 'Galicia', pt: 'Galiza' },
        julyTemp: 21,
        tag: { en: 'Camino end · granite city', fr: 'Fin du Camino · ville de granit', es: 'Fin del Camino · ciudad de granito', pt: 'Fim do Caminho · cidade de granito' },
        why: {
          en: "Santiago sits at 260m with the Atlantic rain system that keeps Galicia green year-round, peaking at 21°C in July. The Camino pilgrimage culture means dogs are deeply embedded in the city's identity — the last 100 km section (Sarria to Santiago) is the world's most dog-walked long-distance trail. The historic centre is stone-paved and cool. Alameda park: 100,000 m² of oak, pine, and camellia forest, off-lead.",
          fr: "Saint-Jacques est à 260m avec le système de pluie atlantique qui maintient la Galice verte toute l'année, culminant à 21°C en juillet. La culture du pèlerinage du Camino signifie que les chiens sont profondément ancrés dans l'identité de la ville — les 100 derniers km (Sarria → Santiago) sont le sentier de randonnée longue distance le plus parcouru avec des chiens au monde. Le centre historique est pavé de pierre et frais. Parc Alameda : 100 000 m² de forêt de chênes, pins et camélias, sans laisse.",
          es: "Santiago está a 260m con el sistema de lluvias atlánticas que mantiene verde Galicia todo el año, con un máximo de 21°C en julio. La cultura del Camino hace que los perros sean parte fundamental de la identidad de la ciudad: los últimos 100 km (Sarria → Santiago) son el sendero de larga distancia más transitado con perros del mundo. El casco histórico es de piedra y fresco. Parque Alameda: 100.000 m² de bosque de robles, pinos y camelias, sin correa.",
          pt: "Santiago está a 260m com o sistema de chuvas atlânticas que mantém a Galiza verde durante todo o ano, com pico de 21°C em julho. A cultura do Caminho faz com que os cães sejam parte fundamental da identidade da cidade: os últimos 100 km (Sarria → Santiago) são o trilho de longa distância mais percorrido com cães do mundo. O centro histórico é de pedra e fresco. Parque Alameda: 100.000 m² de floresta de carvalhos, pinheiros e camélias, sem trela.",
        },
        dogTip: {
          en: 'Forested paths connecting the cathedral to Monte Pedroso (10 km loop): entirely off-lead, shaded, rarely above 18°C.',
          fr: 'Sentiers forestiers du Monte Pedroso (boucle 10 km depuis la cathédrale) : entièrement sans laisse, ombragés, rarement plus de 18°C.',
          es: 'Senderos forestales del Monte Pedroso (bucle 10 km desde la catedral): totalmente sin correa, sombreados, raramente más de 18°C.',
          pt: 'Trilhos florestais do Monte Pedroso (circuito de 10 km desde a catedral): totalmente sem trela, ensombrados, raramente acima de 18°C.',
        },
      },
      {
        slug: 'a-coruna',
        name: 'A Coruña',
        region: { en: 'Galicia', fr: 'Galice', es: 'Galicia', pt: 'Galiza' },
        julyTemp: 18,
        tag: { en: 'Atlantic tower city · 18°C', fr: 'Ville-phare atlantique · 18°C', es: 'Ciudad faro atlántica · 18°C', pt: 'Cidade farol atlântica · 18°C' },
        why: {
          en: "A Coruña's glass-fronted buildings (galerías) are a vernacular response to Atlantic wind and rain — an architecture built around weather. July average of 18°C. Riazor and Orzán beaches allow dogs before 10am and after 8pm in season — facing west into the ocean, they catch an afternoon sea breeze that drops perceived temperature by 4°C. The maritime promenade (8 km around the peninsula) is flat and dog-friendly.",
          fr: "Les façades vitrées d'A Coruña (galerías) sont une réponse vernaculaire au vent et à la pluie atlantiques — une architecture construite autour du temps. Moyenne de 18°C en juillet. Les plages Riazor et Orzán acceptent les chiens avant 10h et après 20h en saison — face à l'ouest dans l'océan, elles captent une brise marine l'après-midi qui abaisse la température ressentie de 4°C. La promenade maritime (8 km autour de la péninsule) est plate et dog-friendly.",
          es: "Las galerías de A Coruña son una respuesta vernácula al viento y la lluvia atlánticos: una arquitectura construida en torno al tiempo. Media de 18°C en julio. Las playas Riazor y Orzán admiten perros antes de las 10h y después de las 20h en temporada. La promenade marítima (8 km alrededor de la península) es llana y dog-friendly.",
          pt: "As galerias de A Coruña são uma resposta vernácula ao vento e à chuva atlânticos: uma arquitetura construída em torno do tempo. Média de 18°C em julho. As praias Riazor e Orzán admitem cães antes das 10h e depois das 20h na época. A promenade marítima (8 km à volta da península) é plana e dog-friendly.",
        },
        dogTip: {
          en: 'Torre de Hércules lighthouse park: 5 ha of lawn around the Roman lighthouse, dogs off-lead, ocean on three sides.',
          fr: 'Parc du phare Torre de Hércules : 5 ha de pelouse autour du phare romain, chiens sans laisse, océan sur trois côtés.',
          es: 'Parque del faro Torre de Hércules: 5 ha de césped alrededor del faro romano, perros sin correa, océano por tres lados.',
          pt: 'Parque do farol Torre de Hércules: 5 ha de relvado à volta do farol romano, cães sem trela, oceano em três lados.',
        },
      },
    ],
  },
  {
    id: 'pyrenees',
    emoji: '🏔️',
    title: {
      en: 'Aragonese Pyrenees',
      fr: 'Pyrénées aragonaises',
      es: 'Pirineo aragonés',
      pt: 'Pirenéus aragoneses',
    },
    cities: [
      {
        slug: 'jaca',
        name: 'Jaca',
        region: { en: 'Aragonese Pyrenees', fr: 'Pyrénées aragonaises', es: 'Pirineo aragonés', pt: 'Pirenéus aragoneses' },
        julyTemp: 23,
        tag: { en: '820m · Pyrenean gateway', fr: '820m · Porte des Pyrénées', es: '820m · Puerta del Pirineo', pt: '820m · Porta dos Pirenéus' },
        why: {
          en: "Jaca sits at 820m in the Pyrenean foothills — 15°C below Zaragoza 120 km south. The Valle de Hecho and Valle de Ansó begin 30 km from the city: untouched beech forests at 1,200m, waterfalls, and mountain refuges that accept dogs. The city itself has a Romanesque cathedral and the best-preserved medieval citadel in Spain. Ordesa National Park is 1 hour away.",
          fr: "Jaca est à 820m dans le piémont pyrénéen — 15°C de moins que Saragosse, 120 km au sud. La Valle de Hecho et la Valle de Ansó commencent à 30 km : forêts de hêtres vierges à 1200m, cascades et refuges de montagne qui acceptent les chiens. La ville possède une cathédrale romane et la citadelle médiévale la mieux conservée d'Espagne. Le Parc National d'Ordesa est à 1h.",
          es: "Jaca está a 820m en el piedemonte pirenaico, 15°C menos que Zaragoza, 120 km al sur. El Valle de Hecho y el Valle de Ansó empiezan a 30 km: hayedos vírgenes a 1200m, cascadas y refugios de montaña que admiten perros. La ciudad tiene una catedral románica y la ciudadela medieval mejor conservada de España. El Parque Nacional de Ordesa está a 1h.",
          pt: "Jaca está a 820m no sopé dos Pirenéus, 15°C menos do que Saragoça, 120 km a sul. O Vale de Hecho e o Vale de Ansó começam a 30 km: florestas de faias virgens a 1.200m, cascatas e refúgios de montanha que aceitam cães. A cidade tem uma catedral românica e a cidadela medieval melhor conservada de Espanha. O Parque Nacional de Ordesa fica a 1h.",
        },
        dogTip: {
          en: 'Valle de Hecho: park at Siresa village (930m) and walk the GR-65.8 through beech forest to Selva de Oza — off-lead all the way, 10°C cooler than the valley floor.',
          fr: 'Valle de Hecho : garez-vous au village de Siresa (930m) et marchez le GR-65.8 en forêt de hêtres jusqu\'à la Selva de Oza — sans laisse tout du long, 10°C plus frais que le fond de vallée.',
          es: 'Valle de Hecho: aparcar en el pueblo de Siresa (930m) y recorrer el GR-65.8 por el hayedo hasta la Selva de Oza, sin correa, 10°C más fresco que el fondo del valle.',
          pt: 'Valle de Hecho: estacionar no povo de Siresa (930m) e percorrer o GR-65.8 pela floresta de faias até à Selva de Oza, sem trela, 10°C mais fresco do que o fundo do vale.',
        },
      },
    ],
  },
]

const T = {
  title: {
    en: 'Best Cities to Escape the Heat in Spain with Your Dog — 2026',
    fr: "Meilleures villes pour éviter la chaleur en Espagne avec son chien — 2026",
    es: 'Mejores ciudades para evitar el calor en España con tu perro — 2026',
    pt: 'Melhores cidades para evitar o calor em Espanha com o seu cão — 2026',
  },
  metaTitle: {
    en: 'Cool Spain with Your Dog: 8 Cities Under 23°C in July (2026)',
    fr: "Espagne fraîche avec son chien : 8 villes sous 23°C en juillet (2026)",
    es: 'España fresca con tu perro: 8 ciudades con menos de 23°C en julio (2026)',
    pt: 'Espanha fresca com o seu cão: 8 cidades abaixo de 23°C em julho (2026)',
  },
  metaDesc: {
    en: "While Madrid and Barcelona bake at 38°C, northern Spain stays cool. San Sebastián, Bilbao, Santander, Gijón, Oviedo, Santiago, A Coruña, Jaca — 8 dog-friendly cities under 23°C in July.",
    fr: "Pendant que Madrid et Barcelone cuisent à 38°C, le Nord de l'Espagne reste frais. Saint-Sébastien, Bilbao, Santander, Gijón, Oviedo, Saint-Jacques, A Coruña, Jaca — 8 villes dog-friendly sous 23°C en juillet.",
    es: "Mientras Madrid y Barcelona se cuecen a 38°C, el norte de España se mantiene fresco. San Sebastián, Bilbao, Santander, Gijón, Oviedo, Santiago, A Coruña, Jaca — 8 ciudades dog-friendly con menos de 23°C en julio.",
    pt: "Enquanto Madrid e Barcelona assam a 38°C, o norte de Espanha mantém-se fresco. San Sebastián, Bilbau, Santander, Gijón, Oviedo, Santiago, A Coruña, Jaca — 8 cidades dog-friendly abaixo de 23°C em julho.",
  },
  intro: {
    en: "Spain's Mediterranean coast hits 36–40°C in July. But 800 km north, 'Green Spain' — the Basque Country, Cantabria, Asturias, and Galicia — stays at 18–23°C, cooled by the same Atlantic system that keeps Ireland and Brittany mild. These 8 cities let you spend a Spanish holiday without overheating your dog.",
    fr: "La côte méditerranéenne espagnole atteint 36–40°C en juillet. Mais 800 km plus au nord, l'Espagne verte — Pays basque, Cantabrie, Asturies, Galice — reste à 18–23°C, refroidie par le même système atlantique qui maintient l'Irlande et la Bretagne clémentes. Ces 8 villes permettent de passer des vacances espagnoles sans surchauffer son chien.",
    es: "La costa mediterránea española alcanza los 36-40°C en julio. Pero 800 km al norte, la España verde — el País Vasco, Cantabria, Asturias y Galicia — se mantiene a 18-23°C, refrescada por el mismo sistema atlántico que mantiene suaves a Irlanda y Bretaña. Estas 8 ciudades permiten pasar unas vacaciones españolas sin que tu perro se recaliente.",
    pt: "A costa mediterrânica espanhola atinge 36-40°C em julho. Mas 800 km a norte, a Espanha verde — País Basco, Cantábria, Astúrias e Galiza — mantém-se a 18-23°C, refrescada pelo mesmo sistema atlântico que mantém a Irlanda e a Bretanha amenas. Estas 8 cidades permitem passar umas férias espanholas sem sobreaquecer o seu cão.",
  },
  julyTemp: { en: 'July avg high', fr: 'Max moy. juillet', es: 'Máx. prom. julio', pt: 'Máx. méd. julho' },
  seeHotels: { en: 'Pet-friendly hotels', fr: 'Hôtels pet-friendly', es: 'Hoteles pet-friendly', pt: 'Hotéis pet-friendly' },
  dogTipLabel: { en: 'Dog tip', fr: 'Conseil chien', es: 'Consejo para tu perro', pt: 'Dica para o seu cão' },
  breadHome: { en: 'Home', fr: 'Accueil', es: 'Inicio', pt: 'Início' },
  breadGuides: { en: 'Guides', fr: 'Guides', es: 'Guías', pt: 'Guias' },
  faq: {
    q1: {
      en: 'Which Spanish cities stay cool in summer?',
      fr: "Quelles villes espagnoles restent fraîches en été ?",
      es: '¿Qué ciudades españolas permanecen frescas en verano?',
      pt: 'Que cidades espanholas se mantêm frescas no verão?',
    },
    a1: {
      en: 'Northern Spain (the Basque Country, Cantabria, Asturias, Galicia) consistently stays 15–20°C cooler than the Mediterranean south in July. Gijón and A Coruña average 18°C — the same as Bergen, Norway. The Pyrenees at altitude (Jaca: 820m) peak at 23°C. The key is the Atlantic weather system: wet, cool, and dramatically different from southern Spain even at the same longitude.',
      fr: "Le Nord de l'Espagne (Pays basque, Cantabrie, Asturies, Galice) reste systématiquement 15 à 20°C plus frais que le sud méditerranéen en juillet. Gijón et A Coruña affichent 18°C en moyenne — autant que Bergen en Norvège. Les Pyrénées en altitude (Jaca : 820m) plafonnent à 23°C. La clé est le système météorologique atlantique : humide, frais, et radicalement différent du sud même à la même longitude.",
      es: 'El norte de España (País Vasco, Cantabria, Asturias, Galicia) se mantiene sistemáticamente 15-20°C más fresco que el sur mediterráneo en julio. Gijón y A Coruña tienen una media de 18°C, igual que Bergen, Noruega. Los Pirineos en altitud (Jaca: 820m) alcanzan un máximo de 23°C. La clave es el sistema meteorológico atlántico: húmedo, fresco y radicalmente diferente del sur.',
      pt: 'O norte de Espanha (País Basco, Cantábria, Astúrias, Galiza) mantém-se sistematicamente 15-20°C mais fresco do que o sul mediterrânico em julho. Gijón e A Coruña têm uma média de 18°C, igual a Bergen na Noruega. Os Pirenéus em altitude (Jaca: 820m) atingem um máximo de 23°C. A chave é o sistema meteorológico atlântico: húmido, fresco e radicalmente diferente do sul.',
    },
    q2: {
      en: 'Are there dog-friendly beaches in northern Spain?',
      fr: 'Y a-t-il des plages dog-friendly dans le Nord de l\'Espagne ?',
      es: '¿Hay playas dog-friendly en el norte de España?',
      pt: 'Há praias dog-friendly no norte de Espanha?',
    },
    a2: {
      en: "Yes — and far more liberal than the south. San Sebastián (Ondarreta, La Concha — before 10am/after 8pm in season), Santander (El Sardinero, Puntal), Gijón (San Lorenzo — mornings), and A Coruña (Riazor, Orzán — mornings) all have clear dog access policies. Outside July–August main season, most northern Spanish beaches are dog-friendly year-round without time restrictions.",
      fr: "Oui — et bien plus libérales que le sud. Saint-Sébastien (Ondarreta, La Concha — avant 10h/après 20h en saison), Santander (El Sardinero, Puntal), Gijón (San Lorenzo — le matin) et A Coruña (Riazor, Orzán — le matin) ont toutes des politiques claires d'accès aux chiens. Hors saison principale juillet-août, la plupart des plages du nord de l'Espagne sont dog-friendly toute l'année sans restriction horaire.",
      es: "Sí, y mucho más permisivas que las del sur. San Sebastián (Ondarreta, La Concha — antes de las 10h/después de las 20h en temporada), Santander (El Sardinero, Puntal), Gijón (San Lorenzo — por la mañana) y A Coruña (Riazor, Orzán — por la mañana) tienen políticas claras de acceso para perros. Fuera de la temporada principal de julio-agosto, la mayoría de las playas del norte son dog-friendly todo el año sin restricciones horarias.",
      pt: "Sim, e muito mais liberais do que as do sul. San Sebastián (Ondarreta, La Concha — antes das 10h/depois das 20h na época), Santander (El Sardinero, Puntal), Gijón (San Lorenzo — de manhã) e A Coruña (Riazor, Orzán — de manhã) têm políticas claras de acesso para cães. Fora da época principal de julho-agosto, a maioria das praias do norte de Espanha são dog-friendly durante todo o ano sem restrições horárias.",
    },
    q3: {
      en: 'How do I get to northern Spain with a dog by train?',
      fr: 'Comment rejoindre le nord de l\'Espagne avec un chien en train ?',
      es: '¿Cómo llegar al norte de España con un perro en tren?',
      pt: 'Como chegar ao norte de Espanha com um cão de comboio?',
    },
    a3: {
      en: "Renfe accepts dogs up to 10 kg in carriers (free) or up to any size on specific media-distancia trains (€10 supplement, muzzle required). From France: the Hendaye border crossing is easy by TGV + Renfe connection. San Sebastián is 45 min from Hendaye. For Galicia, the Alvia high-speed train reaches Santiago in 2h30 from Madrid — dogs accepted in carriers. The FEVE narrow-gauge coastal railway (Ferrocarriles de Vía Estrecha) runs the entire Cantabrian coast and accepts dogs.",
      fr: "Renfe accepte les chiens jusqu'à 10 kg en panier (gratuit) ou de toute taille sur certains trains media-distancia (supplément 10€, muselière obligatoire). Depuis la France : la frontière d'Hendaye est facile en TGV + correspondance Renfe. Saint-Sébastien est à 45 min d'Hendaye. Pour la Galice, le train haute vitesse Alvia atteint Saint-Jacques en 2h30 depuis Madrid — chiens acceptés en panier. Le FEVE (chemin de fer à voie étroite côtier) longe toute la côte cantabrique et accepte les chiens.",
      es: "Renfe admite perros de hasta 10 kg en transportín (gratis) o de cualquier tamaño en ciertos trenes de media distancia (10€ de suplemento, bozal obligatorio). Desde Francia: el paso fronterizo de Hendaya es fácil en TGV + conexión Renfe. San Sebastián está a 45 min de Hendaya. Para Galicia, el Alvia llega a Santiago en 2h30 desde Madrid con perros en transportín. El FEVE recorre toda la costa cantábrica y acepta perros.",
      pt: "A Renfe aceita cães até 10 kg em caixa transportadora (grátis) ou de qualquer tamanho em certos comboios de média distância (suplemento 10€, focinheira obrigatória). Desde França: a fronteira de Hendaia é fácil em TGV + ligação Renfe. San Sebastián fica a 45 min de Hendaia. Para a Galiza, o Alvia chega a Santiago em 2h30 de Madrid com cães em caixa. O FEVE percorre toda a costa cantábrica e aceita cães.",
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
    title: `${p(T.metaTitle, locale)} | HotelsWithPets.com`,
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

export default async function EspagneFraicheChienPage({
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

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: p(T.faq.q1, locale), acceptedAnswer: { '@type': 'Answer', text: p(T.faq.a1, locale) } },
      { '@type': 'Question', name: p(T.faq.q2, locale), acceptedAnswer: { '@type': 'Answer', text: p(T.faq.a2, locale) } },
      { '@type': 'Question', name: p(T.faq.q3, locale), acceptedAnswer: { '@type': 'Answer', text: p(T.faq.a3, locale) } },
    ],
  }

  let cityIndex = 0

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-900 via-orange-900 to-yellow-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="text-white/60 text-xs mb-4">
            <Link href={`/${locale}`} className="hover:text-white">{p(T.breadHome, locale)}</Link>
            <span className="mx-1.5">/</span>
            <Link href={`/${locale}/guides`} className="hover:text-white">{p(T.breadGuides, locale)}</Link>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-yellow-200 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            🇪🇸 {locale === 'fr' ? 'Espagne verte' : locale === 'es' ? 'España verde' : locale === 'pt' ? 'Espanha verde' : 'Green Spain'}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-5">
            {p(T.title, locale)}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl mb-8">
            {p(T.intro, locale)}
          </p>
          {/* Region jump links */}
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <a
                key={r.id}
                href={`#${r.id}`}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-full transition-colors"
              >
                {r.emoji} {p(r.title, locale)}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Regions & cities */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {REGIONS.map((region) => (
          <section key={region.id} id={region.id}>
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
              <span className="text-3xl">{region.emoji}</span>
              <h2 className="text-2xl font-extrabold text-gray-900">{p(region.title, locale)}</h2>
            </div>

            <div className="space-y-5">
              {region.cities.map((city) => {
                cityIndex++
                return (
                  <div
                    key={city.slug}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-700 text-sm font-black flex items-center justify-center">
                            {cityIndex}
                          </div>
                          <div>
                            <h3 className="text-xl font-extrabold text-gray-900">{city.name}</h3>
                            <p className="text-xs text-gray-500">{p(city.region, locale)}</p>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="text-2xl font-black text-blue-600">{city.julyTemp}°C</div>
                          <div className="text-xs text-gray-400">{p(T.julyTemp, locale)}</div>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                        {p(city.tag, locale)}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">{p(city.why, locale)}</p>
                      <div className="flex items-start gap-2 bg-green-50 rounded-xl px-3 py-2 mb-4">
                        <span className="text-green-600 text-xs font-bold uppercase tracking-wide flex-shrink-0 mt-0.5">🐾 {p(T.dogTipLabel, locale)}</span>
                        <p className="text-green-800 text-xs leading-relaxed">{p(city.dogTip, locale)}</p>
                      </div>
                      <a
                        href={buildAllezDestLink(city.name, 'Spain', `${CAMPAIGN}-${city.slug}`, 3)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
                      >
                        🏨 {p(T.seeHotels, locale)}
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}

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
                  <span aria-hidden="true" className="text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
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
