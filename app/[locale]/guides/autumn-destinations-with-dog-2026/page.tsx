import type { Metadata } from 'next'
import Link from 'next/link'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'autumn-destinations-with-dog-2026'
const CAMPAIGN = 'autumn-dog'

type L4 = { en: string; fr: string; es: string; pt: string }
type Dest = {
  slug: string
  name: string
  country: string
  octTemp: number
  tag: L4
  why: L4
}
type Theme = {
  id: string
  emoji: string
  name: L4
  blurb: L4
  destinations: Dest[]
}

const THEMES: Theme[] = [
  {
    id: 'beaches-reopen',
    emoji: '🏖️',
    name: {
      en: 'Where dog beaches reopen after 30 September',
      fr: 'Là où les plages rouvrent aux chiens après le 30 septembre',
      es: 'Donde las playas reabren a los perros tras el 30 de septiembre',
      pt: 'Onde as praias reabrem aos cães depois de 30 de setembro',
    },
    blurb: {
      en: 'Across most of the Spanish and Portuguese coast, municipalities ban dogs from the main beaches during the official bathing season and lift the ban around 1 October. From then until spring your dog is back on the sand, the water is still swimmable, and the crowds are gone. Always check the local ordinance, dates vary by town.',
      fr: `Sur une grande partie du littoral espagnol et portugais, les communes interdisent les chiens sur les plages principales pendant la saison balnéaire officielle et lèvent l'interdiction autour du 1er octobre. À partir de là et jusqu'au printemps, votre chien retrouve le sable, l'eau reste baignable et la foule a disparu. Vérifiez toujours l'arrêté municipal, les dates varient d'une ville à l'autre.`,
      es: 'En buena parte del litoral español y portugués, los municipios prohíben los perros en las playas principales durante la temporada oficial de baño y levantan la prohibición hacia el 1 de octubre. A partir de ahí y hasta la primavera tu perro vuelve a la arena, el agua sigue siendo bañable y las multitudes han desaparecido. Consulta siempre la ordenanza local, las fechas cambian según el municipio.',
      pt: 'Em grande parte do litoral espanhol e português, os municípios proíbem os cães nas praias principais durante a época balnear oficial e levantam a proibição por volta de 1 de outubro. A partir daí e até à primavera o seu cão volta à areia, a água continua a dar banhos e as multidões desapareceram. Consulte sempre o regulamento local, as datas variam de terra para terra.',
    },
    destinations: [
      {
        slug: 'fuengirola',
        name: 'Fuengirola',
        country: 'Spain',
        octTemp: 24,
        tag: { en: 'Costa del Sol · year-round dog beach', fr: 'Costa del Sol · plage canine toute l\'année', es: 'Costa del Sol · playa canina todo el año', pt: 'Costa del Sol · praia canina todo o ano' },
        why: {
          en: 'Fuengirola keeps one of Andalusia\'s few official year-round dog beaches at Castillo Sohail, and in October the sea is still 22°C. The 7 km promenade, seven fenced dog parks and a free Cercanías train from Málaga Airport make it the easiest autumn base on the coast.',
          fr: `Fuengirola conserve l'une des rares plages canines officielles ouvertes toute l'année en Andalousie, au Castillo Sohail, et en octobre la mer est encore à 22°C. La promenade de 7 km, sept parcs canins clôturés et un train Cercanías gratuit depuis l'aéroport de Malaga en font la base d'automne la plus simple de la côte.`,
          es: 'Fuengirola mantiene una de las pocas playas caninas oficiales de Andalucía abierta todo el año, en el Castillo Sohail, y en octubre el mar sigue a 22°C. El paseo de 7 km, siete parques caninos vallados y un tren de Cercanías gratuito desde el aeropuerto de Málaga la convierten en la base otoñal más cómoda de la costa.',
          pt: 'Fuengirola mantém uma das poucas praias caninas oficiais da Andaluzia aberta todo o ano, no Castillo Sohail, e em outubro o mar continua a 22°C. O passeio de 7 km, sete parques caninos vedados e um comboio Cercanías gratuito a partir do aeroporto de Málaga fazem dela a base de outono mais fácil da costa.',
        },
      },
      {
        slug: 'nerja',
        name: 'Nerja',
        country: 'Spain',
        octTemp: 24,
        tag: { en: 'Balcón de Europa · quiet coves', fr: 'Balcón de Europa · criques calmes', es: 'Balcón de Europa · calas tranquilas', pt: 'Balcón de Europa · enseadas calmas' },
        why: {
          en: 'Once the summer ban lifts, Nerja\'s small coves below the Balcón de Europa become dog-friendly again, and the cliff paths east towards Maro stay warm at 24°C well into November. Fewer day-trippers than Málaga, more space for a dog to swim.',
          fr: `Une fois l'interdiction estivale levée, les petites criques de Nerja sous le Balcón de Europa redeviennent accessibles aux chiens, et les sentiers de falaise vers Maro restent doux à 24°C jusqu'en novembre. Moins de visiteurs qu'à Malaga, plus de place pour la baignade du chien.`,
          es: 'Una vez levantada la prohibición estival, las pequeñas calas de Nerja bajo el Balcón de Europa vuelven a admitir perros, y los senderos de acantilado hacia Maro siguen templados a 24°C hasta noviembre. Menos excursionistas que en Málaga, más espacio para que el perro nade.',
          pt: 'Levantada a proibição de verão, as pequenas enseadas de Nerja por baixo do Balcón de Europa voltam a aceitar cães, e os trilhos de falésia para Maro mantêm-se amenos a 24°C até novembro. Menos visitantes de um dia do que Málaga, mais espaço para o cão nadar.',
        },
      },
      {
        slug: 'tarifa',
        name: 'Tarifa',
        country: 'Spain',
        octTemp: 19,
        tag: { en: 'Endless Atlantic sand · Punta Paloma', fr: 'Sable atlantique infini · Punta Paloma', es: 'Arena atlántica infinita · Punta Paloma', pt: 'Areal atlântico infinito · Punta Paloma' },
        why: {
          en: 'Tarifa\'s huge open Atlantic beaches at Los Lances and Punta Paloma are wide enough that dogs run off-lead out of season without bothering anyone. The Levante wind eases in autumn, and Africa sits on the horizon across the strait. Cooler at 19°C, ideal for active dogs.',
          fr: `Les immenses plages atlantiques de Tarifa, à Los Lances et Punta Paloma, sont assez vastes pour que les chiens courent sans laisse hors saison sans gêner personne. Le vent de Levante faiblit en automne et l'Afrique se dessine à l'horizon, de l'autre côté du détroit. Plus frais, à 19°C, idéal pour les chiens actifs.`,
          es: 'Las enormes playas atlánticas de Tarifa, en Los Lances y Punta Paloma, son tan amplias que los perros corren sin correa fuera de temporada sin molestar a nadie. El viento de Levante amaina en otoño y África se dibuja en el horizonte, al otro lado del estrecho. Más fresco, a 19°C, ideal para perros activos.',
          pt: 'Os enormes areais atlânticos de Tarifa, em Los Lances e Punta Paloma, são tão amplos que os cães correm sem trela fora de época sem incomodar ninguém. O vento de Levante abranda no outono e a África desenha-se no horizonte, do outro lado do estreito. Mais fresco, a 19°C, ideal para cães ativos.',
        },
      },
      {
        slug: 'cascais',
        name: 'Cascais',
        country: 'Portugal',
        octTemp: 21,
        tag: { en: 'Lisbon coast · Guincho dunes', fr: 'Côte de Lisbonne · dunes de Guincho', es: 'Costa de Lisboa · dunas de Guincho', pt: 'Costa de Lisboa · dunas do Guincho' },
        why: {
          en: 'Half an hour by dog-friendly train from Lisbon, Cascais pairs a sheltered bay with the wild Guincho dunes inside Sintra-Cascais Natural Park. Out of season the boardwalks and the Boca do Inferno cliff walk are quiet, and October holds a steady 21°C.',
          fr: `À une demi-heure de Lisbonne en train ouvert aux chiens, Cascais associe une baie abritée aux dunes sauvages de Guincho, dans le parc naturel de Sintra-Cascais. Hors saison, les passerelles et le sentier de la falaise Boca do Inferno sont calmes, et octobre tient un stable 21°C.`,
          es: 'A media hora de Lisboa en tren que admite perros, Cascais combina una bahía resguardada con las dunas salvajes de Guincho, dentro del parque natural Sintra-Cascais. Fuera de temporada, las pasarelas y el sendero del acantilado Boca do Inferno están tranquilos, y octubre mantiene unos estables 21°C.',
          pt: 'A meia hora de Lisboa num comboio que aceita cães, Cascais junta uma baía abrigada às dunas selvagens do Guincho, dentro do Parque Natural de Sintra-Cascais. Fora de época, os passadiços e o trilho da falésia da Boca do Inferno estão calmos, e outubro segura uns estáveis 21°C.',
        },
      },
      {
        slug: 'albufeira',
        name: 'Albufeira',
        country: 'Portugal',
        octTemp: 21,
        tag: { en: 'Algarve · Praia da Marinha cliffs', fr: 'Algarve · falaises de Praia da Marinha', es: 'Algarve · acantilados de Praia da Marinha', pt: 'Algarve · falésias da Praia da Marinha' },
        why: {
          en: 'The Algarve empties out in October, and the cliff-top Seven Hanging Valleys trail above Albufeira is at its best without summer heat. Several beaches allow dogs once the season ends, and the sea holds 21°C into November. Direct flights keep it cheap off-peak.',
          fr: `L'Algarve se vide en octobre, et le sentier des Sete Vales Suspensos au-dessus d'Albufeira donne le meilleur de lui-même sans la chaleur estivale. Plusieurs plages acceptent les chiens dès la fin de saison, et la mer garde 21°C jusqu'en novembre. Les vols directs restent bon marché hors pointe.`,
          es: 'El Algarve se vacía en octubre, y el sendero de los Siete Valles Colgantes sobre Albufeira da lo mejor de sí sin el calor del verano. Varias playas admiten perros al terminar la temporada, y el mar mantiene 21°C hasta noviembre. Los vuelos directos siguen baratos fuera de temporada alta.',
          pt: 'O Algarve esvazia-se em outubro, e o trilho dos Sete Vales Suspensos por cima de Albufeira dá o seu melhor sem o calor do verão. Várias praias aceitam cães assim que a época termina, e o mar segura 21°C até novembro. Os voos diretos mantêm-se baratos fora de pico.',
        },
      },
      {
        slug: 'olhao',
        name: 'Olhão',
        country: 'Portugal',
        octTemp: 21,
        tag: { en: 'Ria Formosa · island ferries', fr: 'Ria Formosa · ferries vers les îles', es: 'Ria Formosa · ferris a las islas', pt: 'Ria Formosa · ferries para as ilhas' },
        why: {
          en: 'Olhão sits on the Ria Formosa lagoon, a maze of salt marsh and barrier islands where autumn brings flamingos and mild 21°C days. Dogs travel on the island ferries, and the sandy Ilha da Armona has huge empty stretches once the summer ban ends.',
          fr: `Olhão borde la lagune de la Ria Formosa, un dédale de marais salants et d'îles-barrières où l'automne amène les flamants roses et des journées douces à 21°C. Les chiens montent sur les ferries des îles, et l'Ilha da Armona offre d'immenses étendues de sable désertes une fois l'interdiction estivale terminée.`,
          es: 'Olhão se asoma a la laguna de la Ria Formosa, un laberinto de marisma e islas barrera donde el otoño trae flamencos y días templados de 21°C. Los perros viajan en los ferris a las islas, y la arenosa Ilha da Armona ofrece enormes tramos vacíos al terminar la prohibición estival.',
          pt: 'Olhão debruça-se sobre a Ria Formosa, um labirinto de sapal e ilhas-barreira onde o outono traz flamingos e dias amenos de 21°C. Os cães viajam nos ferries para as ilhas, e a arenosa Ilha da Armona oferece enormes areais vazios assim que a proibição de verão termina.',
        },
      },
    ],
  },
  {
    id: 'atlantic-north',
    emoji: '🌊',
    name: {
      en: 'Atlantic north coast, golden and empty',
      fr: 'Côte atlantique du nord, dorée et déserte',
      es: 'Costa atlántica del norte, dorada y vacía',
      pt: 'Costa atlântica do norte, dourada e vazia',
    },
    blurb: {
      en: 'Green Spain keeps its warmest, most stable weather for the shoulder season. September and October bring soft light, calm seas and beaches that never had a strict summer dog ban to begin with. Bring a towel, the Atlantic is bracing.',
      fr: `L'Espagne verte garde sa météo la plus douce et la plus stable pour l'arrière-saison. Septembre et octobre offrent une lumière tendre, une mer calme et des plages qui n'ont jamais connu d'interdiction estivale stricte. Prévoyez une serviette, l'Atlantique est vivifiant.`,
      es: 'La España verde reserva su tiempo más suave y estable para la temporada media. Septiembre y octubre traen luz tenue, mar en calma y playas que nunca tuvieron una prohibición estival estricta. Lleva una toalla, el Atlántico es vigorizante.',
      pt: 'A Espanha verde guarda o seu tempo mais ameno e estável para a época intermédia. Setembro e outubro trazem luz suave, mar calmo e praias que nunca tiveram uma proibição de verão rígida. Leve uma toalha, o Atlântico é revigorante.',
    },
    destinations: [
      {
        slug: 'san-sebastian',
        name: 'San Sebastián',
        country: 'Spain',
        octTemp: 15,
        tag: { en: 'La Concha bay · Basque pintxos', fr: 'Baie de la Concha · pintxos basques', es: 'Bahía de la Concha · pintxos vascos', pt: 'Baía da Concha · pintxos bascos' },
        why: {
          en: 'The Concha bay is at its calmest in autumn, and the Zurriola surf beach allows dogs outside the summer season. Basque pintxos bars are famously relaxed about a well-behaved dog at your feet, and Monte Igueldo walks stay comfortable at 15°C.',
          fr: `La baie de la Concha est au plus calme en automne, et la plage de surf de la Zurriola accepte les chiens hors saison estivale. Les bars à pintxos basques sont réputés détendus avec un chien sage à vos pieds, et les balades du Monte Igueldo restent agréables à 15°C.`,
          es: 'La bahía de la Concha está en su punto más calmo en otoño, y la playa de surf de la Zurriola admite perros fuera de la temporada estival. Los bares de pintxos vascos son conocidos por su tolerancia con un perro tranquilo a tus pies, y los paseos del Monte Igueldo siguen cómodos a 15°C.',
          pt: 'A baía da Concha está no seu ponto mais calmo no outono, e a praia de surf da Zurriola aceita cães fora da época de verão. Os bares de pintxos bascos são conhecidos pela descontração com um cão calmo aos seus pés, e os passeios do Monte Igueldo mantêm-se agradáveis a 15°C.',
        },
      },
      {
        slug: 'sanxenxo',
        name: 'Sanxenxo',
        country: 'Spain',
        octTemp: 19,
        tag: { en: 'Rías Baixas · Galician seafood', fr: 'Rías Baixas · fruits de mer galiciens', es: 'Rías Baixas · marisco gallego', pt: 'Rías Baixas · marisco galego' },
        why: {
          en: 'Sanxenxo sits on the sheltered Rías Baixas, where sea temperatures peak in early autumn and 19°C days feel warmer out of the wind. Once the season closes, the long Silgar and Montalvo beaches open up to dogs, with Galician seafood taverns steps away.',
          fr: `Sanxenxo se niche dans les Rías Baixas abritées, où la mer atteint son pic en début d'automne et où 19°C paraissent plus chauds à l'abri du vent. La saison close, les longues plages de Silgar et Montalvo s'ouvrent aux chiens, à deux pas des tavernes de fruits de mer galiciennes.`,
          es: 'Sanxenxo se asienta en las resguardadas Rías Baixas, donde el mar alcanza su punto máximo a principios de otoño y los 19°C se sienten más cálidos al abrigo del viento. Cerrada la temporada, las largas playas de Silgar y Montalvo se abren a los perros, con tabernas de marisco gallego a un paso.',
          pt: 'Sanxenxo assenta nas abrigadas Rías Baixas, onde o mar atinge o pico no início do outono e os 19°C parecem mais quentes ao abrigo do vento. Fechada a época, os longos areais de Silgar e Montalvo abrem-se aos cães, com tascas de marisco galego a dois passos.',
        },
      },
    ],
  },
  {
    id: 'lakes-cities',
    emoji: '🍂',
    name: {
      en: 'Lakes and mild cities, once the crowds go home',
      fr: 'Lacs et villes douces, une fois la foule repartie',
      es: 'Lagos y ciudades templadas, cuando la multitud se va',
      pt: 'Lagos e cidades amenas, quando a multidão vai embora',
    },
    blurb: {
      en: 'Autumn is the connoisseur\'s season for lakes and southern cities: vineyards turning colour, terraces still open, hotel prices down and pavements you can actually walk with a dog. Warm enough for shirtsleeves, cool enough for real hiking.',
      fr: `L'automne est la saison des connaisseurs pour les lacs et les villes du sud : vignes qui changent de couleur, terrasses encore ouvertes, prix d'hôtel en baisse et trottoirs enfin praticables avec un chien. Assez doux pour être en chemise, assez frais pour de vraies randonnées.`,
      es: 'El otoño es la temporada de los entendidos para lagos y ciudades del sur: viñedos que cambian de color, terrazas aún abiertas, precios de hotel a la baja y aceras por fin transitables con un perro. Bastante templado para ir en camisa, bastante fresco para caminatas de verdad.',
      pt: 'O outono é a época dos apreciadores para lagos e cidades do sul: vinhas a mudar de cor, esplanadas ainda abertas, preços de hotel em baixa e passeios finalmente percorríveis com um cão. Ameno que chegue para andar em mangas de camisa, fresco que chegue para caminhadas a sério.',
    },
    destinations: [
      {
        slug: 'como',
        name: 'Lake Como',
        country: 'Italy',
        octTemp: 13,
        tag: { en: 'Alpine lake · autumn colour', fr: 'Lac alpin · couleurs d\'automne', es: 'Lago alpino · color de otoño', pt: 'Lago alpino · cor de outono' },
        why: {
          en: 'The Como ferries still run in October (dogs travel for about €1) but the summer crush is over. Lakeside promenades at Bellagio and Varenna turn gold, the mountain paths above are perfect at 13°C, and half the hotels drop their rates after the high season.',
          fr: `Les ferries du lac de Côme circulent encore en octobre (les chiens voyagent pour environ 1€) mais la cohue estivale est finie. Les promenades de Bellagio et Varenna se dorent, les sentiers de montagne au-dessus sont parfaits à 13°C, et la moitié des hôtels baissent leurs tarifs après la haute saison.`,
          es: 'Los ferris del lago de Como siguen circulando en octubre (los perros viajan por alrededor de 1€) pero la aglomeración estival ha terminado. Los paseos de Bellagio y Varenna se doran, los senderos de montaña de arriba son perfectos a 13°C, y la mitad de los hoteles bajan sus tarifas tras la temporada alta.',
          pt: 'Os ferries do Lago de Como continuam a circular em outubro (os cães viajam por cerca de 1€) mas o aperto de verão acabou. Os passeios de Bellagio e Varenna douram-se, os trilhos de montanha lá em cima são perfeitos a 13°C, e metade dos hotéis baixam as tarifas depois da época alta.',
        },
      },
      {
        slug: 'granada',
        name: 'Granada',
        country: 'Spain',
        octTemp: 17,
        tag: { en: 'Alhambra city · Sierra Nevada air', fr: 'Ville de l\'Alhambra · air de la Sierra Nevada', es: 'Ciudad de la Alhambra · aire de Sierra Nevada', pt: 'Cidade da Alhambra · ar da Serra Nevada' },
        why: {
          en: 'Granada is punishing in August but a joy at 17°C in October. The Albaicín lanes and the Río Darro path are made for slow dog walks, the Sierra Nevada foothills start at the edge of town, and free tapas with every drink keep the terraces lively.',
          fr: `Granada est éprouvante en août mais un bonheur à 17°C en octobre. Les ruelles de l'Albaicín et le chemin du Río Darro sont faits pour les promenades tranquilles avec un chien, les contreforts de la Sierra Nevada commencent à la sortie de la ville, et les tapas offertes à chaque verre animent les terrasses.`,
          es: 'Granada es dura en agosto pero un placer a 17°C en octubre. Las callejuelas del Albaicín y el paseo del Río Darro están hechos para paseos tranquilos con perro, las estribaciones de Sierra Nevada empiezan a las afueras, y las tapas gratis con cada bebida animan las terrazas.',
          pt: 'Granada é dura em agosto mas uma alegria a 17°C em outubro. As vielas do Albaicín e o caminho do Río Darro são feitos para passeios tranquilos com cão, os sopés da Serra Nevada começam à saída da cidade, e as tapas gratuitas com cada bebida animam as esplanadas.',
        },
      },
      {
        slug: 'valencia',
        name: 'Valencia',
        country: 'Spain',
        octTemp: 21,
        tag: { en: 'Turia park · city + beach', fr: 'Parc du Turia · ville + plage', es: 'Parque del Turia · ciudad + playa', pt: 'Parque do Turia · cidade + praia' },
        why: {
          en: 'Valencia gives you a warm 21°C city with a nine-kilometre linear park in a drained riverbed, the Turia gardens, running right through it. Dogs are welcome the length of it, the Malvarrosa beach reopens to them off-season, and paella terraces stay open all autumn.',
          fr: `Valence, c'est une ville chaude à 21°C traversée par un parc linéaire de neuf kilomètres aménagé dans l'ancien lit du fleuve, les jardins du Turia. Les chiens y sont admis sur toute sa longueur, la plage de la Malvarrosa leur rouvre hors saison, et les terrasses à paella restent ouvertes tout l'automne.`,
          es: 'Valencia te da una ciudad cálida a 21°C atravesada por un parque lineal de nueve kilómetros en el antiguo cauce del río, los jardines del Turia. Los perros son bienvenidos en todo su recorrido, la playa de la Malvarrosa vuelve a admitirlos fuera de temporada, y las terrazas de paella siguen abiertas todo el otoño.',
          pt: 'Valência dá-lhe uma cidade quente a 21°C atravessada por um parque linear de nove quilómetros no antigo leito do rio, os jardins do Turia. Os cães são bem-vindos ao longo de todo ele, a praia da Malvarrosa volta a aceitá-los fora de época, e as esplanadas de paelha ficam abertas todo o outono.',
        },
      },
    ],
  },
]

const SIBLING_GUIDES = [
  { slug: 'winter-destinations-with-dog-2026', emoji: '❄️', label: { en: 'Winter destinations with your dog', fr: 'Destinations d\'hiver avec son chien', es: 'Destinos de invierno con tu perro', pt: 'Destinos de inverno com o seu cão' } },
  { slug: 'escape-heat-dog-europe-2026', emoji: '🌡️', label: { en: 'Escape the summer heat with your dog', fr: 'Fuir la chaleur estivale avec son chien', es: 'Escapar del calor veraniego con tu perro', pt: 'Fugir do calor de verão com o seu cão' } },
  { slug: 'best-dog-beaches-europe-2026', emoji: '🏖️', label: { en: 'The best dog beaches in Europe', fr: 'Les meilleures plages canines d\'Europe', es: 'Las mejores playas caninas de Europa', pt: 'As melhores praias caninas da Europa' } },
]

const T = {
  title: {
    en: 'Best Autumn 2026 Destinations to Travel With Your Dog',
    fr: 'Meilleures destinations automne 2026 pour voyager avec son chien',
    es: 'Mejores destinos de otoño 2026 para viajar con tu perro',
    pt: 'Melhores destinos de outono 2026 para viajar com o seu cão',
  },
  metaTitle: {
    en: '11 Best Autumn Destinations to Travel With Your Dog (2026)',
    fr: '11 meilleures destinations d\'automne pour voyager avec son chien (2026)',
    es: '11 mejores destinos de otoño para viajar con tu perro (2026)',
    pt: '11 melhores destinos de outono para viajar com o seu cão (2026)',
  },
  metaDesc: {
    en: 'Shoulder-season travel with your dog: 11 warm, quiet destinations across Spain, Portugal and Italy where dog beaches reopen after 30 September. Pet-friendly hotels included.',
    fr: 'Voyager avec son chien en arrière-saison : 11 destinations douces et calmes en Espagne, au Portugal et en Italie où les plages rouvrent aux chiens après le 30 septembre. Hôtels pet-friendly inclus.',
    es: 'Viajar con tu perro en temporada media: 11 destinos templados y tranquilos por España, Portugal e Italia donde las playas reabren a los perros tras el 30 de septiembre. Hoteles pet-friendly incluidos.',
    pt: 'Viajar com o seu cão na época intermédia: 11 destinos amenos e calmos por Espanha, Portugal e Itália onde as praias reabrem aos cães depois de 30 de setembro. Hotéis pet-friendly incluídos.',
  },
  intro: {
    en: 'Autumn is the smartest season to travel with a dog. The summer heat that endangers flat-faced and senior dogs is gone, the beach bans that keep dogs off the sand from June to September lift around 1 October, and the crowds and prices both drop. These 11 destinations across Spain, Portugal and Italy stay warm and welcoming well into November, and every one links to its own pet-friendly hotels.',
    fr: `L'automne est la saison la plus maligne pour voyager avec un chien. La chaleur estivale qui met en danger les chiens à face plate et âgés a disparu, les interdictions qui tiennent les chiens loin du sable de juin à septembre sont levées autour du 1er octobre, et la foule comme les prix baissent. Ces 11 destinations en Espagne, au Portugal et en Italie restent douces et accueillantes jusqu'en novembre, et chacune renvoie vers ses propres hôtels pet-friendly.`,
    es: 'El otoño es la temporada más inteligente para viajar con un perro. El calor veraniego que pone en peligro a los perros de cara plana y mayores ha desaparecido, las prohibiciones que mantienen a los perros fuera de la arena de junio a septiembre se levantan hacia el 1 de octubre, y tanto las multitudes como los precios bajan. Estos 11 destinos por España, Portugal e Italia siguen templados y acogedores hasta noviembre, y cada uno enlaza con sus propios hoteles pet-friendly.',
    pt: 'O outono é a época mais inteligente para viajar com um cão. O calor de verão que põe em perigo os cães de cara achatada e idosos desapareceu, as proibições que mantêm os cães longe da areia de junho a setembro levantam-se por volta de 1 de outubro, e tanto as multidões como os preços descem. Estes 11 destinos por Espanha, Portugal e Itália mantêm-se amenos e acolhedores até novembro, e cada um liga aos seus próprios hotéis pet-friendly.',
  },
  octTemp: { en: 'Oct avg high', fr: 'Max moy. oct.', es: 'Máx. prom. oct.', pt: 'Máx. méd. out.' },
  seeHotels: { en: 'See pet-friendly hotels', fr: 'Voir les hôtels pet-friendly', es: 'Ver hoteles pet-friendly', pt: 'Ver hotéis pet-friendly' },
  seeGuide: { en: 'Destination guide', fr: 'Guide destination', es: 'Guía del destino', pt: 'Guia do destino' },
  breadHome: { en: 'Home', fr: 'Accueil', es: 'Inicio', pt: 'Início' },
  breadGuides: { en: 'Guides', fr: 'Guides', es: 'Guías', pt: 'Guias' },
  kicker: { en: 'Autumn & dogs', fr: 'Automne & chien', es: 'Otoño & perro', pt: 'Outono & cão' },
  siblingTitle: { en: 'Plan the rest of the year', fr: 'Planifier le reste de l\'année', es: 'Planifica el resto del año', pt: 'Planeie o resto do ano' },
  faq: {
    q1: {
      en: 'When do dog beaches reopen in Spain and Portugal?',
      fr: 'Quand les plages rouvrent-elles aux chiens en Espagne et au Portugal ?',
      es: '¿Cuándo reabren las playas a los perros en España y Portugal?',
      pt: 'Quando reabrem as praias aos cães em Espanha e Portugal?',
    },
    a1: {
      en: 'Most coastal municipalities in Spain and Portugal ban dogs from their main beaches during the official bathing season, then lift the ban around 1 October, with dogs allowed back on the sand through winter until spring. Exact dates are set by each town hall, so check the local ordinance before you travel. Some beaches, such as Fuengirola\'s Castillo Sohail, stay open to dogs all year.',
      fr: `La plupart des communes côtières d'Espagne et du Portugal interdisent les chiens sur leurs plages principales pendant la saison balnéaire officielle, puis lèvent l'interdiction autour du 1er octobre, les chiens étant de nouveau admis sur le sable tout l'hiver jusqu'au printemps. Les dates exactes sont fixées par chaque mairie, vérifiez donc l'arrêté municipal avant de partir. Certaines plages, comme le Castillo Sohail à Fuengirola, restent ouvertes aux chiens toute l'année.`,
      es: 'La mayoría de los municipios costeros de España y Portugal prohíben los perros en sus playas principales durante la temporada oficial de baño, y luego levantan la prohibición hacia el 1 de octubre, con los perros de nuevo admitidos en la arena todo el invierno hasta la primavera. Las fechas exactas las fija cada ayuntamiento, así que consulta la ordenanza local antes de viajar. Algunas playas, como el Castillo Sohail de Fuengirola, permanecen abiertas a los perros todo el año.',
      pt: 'A maioria dos municípios costeiros de Espanha e Portugal proíbem os cães nas suas praias principais durante a época balnear oficial, e depois levantam a proibição por volta de 1 de outubro, com os cães novamente aceites na areia todo o inverno até à primavera. As datas exatas são fixadas por cada câmara municipal, por isso consulte o regulamento local antes de viajar. Algumas praias, como o Castillo Sohail em Fuengirola, permanecem abertas aos cães todo o ano.',
    },
    q2: {
      en: 'Is autumn a good time to travel with a dog?',
      fr: 'L\'automne est-il une bonne période pour voyager avec un chien ?',
      es: '¿Es el otoño una buena época para viajar con un perro?',
      pt: 'O outono é uma boa época para viajar com um cão?',
    },
    a2: {
      en: 'Yes, arguably the best. Temperatures stay warm enough for the beach on the southern coast but drop out of the danger zone for heatstroke, which matters most for brachycephalic breeds, senior dogs and overweight dogs. Beach bans lift, hotels lower their rates, and popular spots like Lake Como or Granada are far quieter than in summer. Ticks are still active in autumn, so keep up preventive treatment.',
      fr: `Oui, sans doute la meilleure. Les températures restent assez douces pour la plage sur la côte sud mais sortent de la zone de danger pour le coup de chaleur, ce qui compte surtout pour les races brachycéphales, les chiens âgés et en surpoids. Les interdictions de plage sont levées, les hôtels baissent leurs tarifs, et des lieux prisés comme le lac de Côme ou Granada sont bien plus calmes qu'en été. Les tiques restent actives en automne, maintenez donc le traitement préventif.`,
      es: 'Sí, seguramente la mejor. Las temperaturas siguen siendo bastante templadas para la playa en la costa sur pero salen de la zona de peligro de golpe de calor, lo que importa sobre todo para las razas braquicéfalas, los perros mayores y con sobrepeso. Se levantan las prohibiciones de playa, los hoteles bajan sus tarifas, y lugares populares como el lago de Como o Granada están mucho más tranquilos que en verano. Las garrapatas siguen activas en otoño, así que mantén el tratamiento preventivo.',
      pt: 'Sim, provavelmente a melhor. As temperaturas mantêm-se amenas que chegue para a praia na costa sul mas saem da zona de perigo de insolação, o que importa sobretudo para as raças braquicefálicas, os cães idosos e com excesso de peso. Levantam-se as proibições de praia, os hotéis baixam as tarifas, e lugares populares como o Lago de Como ou Granada estão muito mais calmos do que no verão. As carraças continuam ativas no outono, por isso mantenha o tratamento preventivo.',
    },
    q3: {
      en: 'Which autumn destination is warmest for a dog beach trip?',
      fr: 'Quelle destination d\'automne est la plus chaude pour un séjour plage avec un chien ?',
      es: '¿Qué destino de otoño es el más cálido para una escapada de playa con perro?',
      pt: 'Qual destino de outono é o mais quente para uma escapadela de praia com cão?',
    },
    a3: {
      en: 'On this list, Fuengirola and Nerja on the Costa del Sol hold the highest October averages at 24°C, with sea temperatures still around 22°C. Both have official year-round or off-season dog beaches. If you want warmth even later in the year, our winter guide points you towards the Canary Islands, where the coast stays near 21°C in January.',
      fr: `Dans cette liste, Fuengirola et Nerja sur la Costa del Sol affichent les moyennes d'octobre les plus élevées, à 24°C, avec une mer encore autour de 22°C. Toutes deux disposent de plages canines officielles ouvertes toute l'année ou hors saison. Pour de la chaleur encore plus tard dans l'année, notre guide hiver vous oriente vers les îles Canaries, où la côte reste proche de 21°C en janvier.`,
      es: 'En esta lista, Fuengirola y Nerja en la Costa del Sol presentan las medias de octubre más altas, a 24°C, con el mar aún en torno a 22°C. Ambas tienen playas caninas oficiales abiertas todo el año o fuera de temporada. Si quieres calor aún más tarde en el año, nuestra guía de invierno te orienta hacia las islas Canarias, donde la costa se mantiene cerca de 21°C en enero.',
      pt: 'Nesta lista, Fuengirola e Nerja na Costa del Sol apresentam as médias de outubro mais altas, a 24°C, com o mar ainda perto dos 22°C. Ambas têm praias caninas oficiais abertas todo o ano ou fora de época. Se quiser calor ainda mais tarde no ano, o nosso guia de inverno aponta-lhe as ilhas Canárias, onde a costa se mantém perto dos 21°C em janeiro.',
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

export default async function AutumnDestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const allDests = THEMES.flatMap((t) => t.destinations)

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
    numberOfItems: allDests.length,
    itemListElement: allDests.map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/${locale}/destinations/${d.slug}`,
      name: d.name,
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
      <section className="bg-gradient-to-br from-amber-900 via-orange-800 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="text-white/60 text-xs mb-4">
            <Link href={`/${locale}`} className="hover:text-white">{p(T.breadHome, locale)}</Link>
            <span className="mx-1.5">/</span>
            <Link href={`/${locale}/guides`} className="hover:text-white">{p(T.breadGuides, locale)}</Link>
          </nav>
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 text-orange-200 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            🍂 {p(T.kicker, locale)}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-5">
            {p(T.title, locale)}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
            {p(T.intro, locale)}
          </p>
          {/* Theme jump links */}
          <div className="flex flex-wrap gap-2 mt-8">
            {THEMES.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-full transition-colors"
              >
                {t.emoji} {p(t.name, locale)}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Themes */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {THEMES.map((theme, themeIdx) => (
          <section key={theme.id} id={theme.id} className="scroll-mt-20">
            {/* Theme header */}
            <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
              <div className="flex items-start gap-3">
                <span className="text-4xl leading-none">{theme.emoji}</span>
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900">{p(theme.name, locale)}</h2>
                </div>
              </div>
              <div className="text-2xl font-black text-gray-200 select-none tabular-nums">
                {String(themeIdx + 1).padStart(2, '0')}
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-3xl">{p(theme.blurb, locale)}</p>

            {/* Destination cards */}
            <div className="space-y-4">
              {theme.destinations.map((dest) => (
                <div
                  key={dest.slug}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl font-extrabold text-gray-900">{dest.name}</h3>
                        <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full mt-1">
                          {p(dest.tag, locale)}
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div className="text-2xl font-black text-orange-600">{dest.octTemp}°C</div>
                        <div className="text-xs text-gray-500">{p(T.octTemp, locale)}</div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{p(dest.why, locale)}</p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={buildAllezDestLink(dest.name, dest.country, `${CAMPAIGN}-${dest.slug}`, 3)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
                      >
                        🏨 {p(T.seeHotels, locale)}
                      </a>
                      <Link
                        href={`/${locale}/destinations/${dest.slug}`}
                        className="inline-flex items-center gap-1.5 border border-gray-200 hover:border-orange-300 text-gray-700 hover:text-orange-700 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                      >
                        🐾 {p(T.seeGuide, locale)}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Sibling guides */}
        <section className="bg-amber-50 border border-amber-100 rounded-3xl p-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-5">{p(T.siblingTitle, locale)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SIBLING_GUIDES.map((g) => (
              <Link
                key={g.slug}
                href={`/${locale}/guides/${g.slug}`}
                className="group flex items-start gap-3 bg-white rounded-2xl border border-amber-100 hover:border-orange-300 hover:shadow-md transition-all p-4"
              >
                <span className="text-2xl flex-shrink-0">{g.emoji}</span>
                <p className="font-semibold text-gray-900 text-sm group-hover:text-orange-700 transition-colors leading-snug">
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
