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

const SLUG = 'winter-destinations-with-dog-2026'
const CAMPAIGN = 'winter-dog'

type L4 = { en: string; fr: string; es: string; pt: string; de: string }
type Dest = {
  slug: string
  name: string
  country: string
  janTemp: number
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
    id: 'winter-sun',
    emoji: '☀️',
    name: {
      en: 'Winter sun on the Atlantic islands',
      fr: 'Soleil d\'hiver sur les îles atlantiques',
      es: 'Sol de invierno en las islas atlánticas',
      pt: 'Sol de inverno nas ilhas atlânticas',
      de: 'Wintersonne auf den Atlantikinseln',
    },
    blurb: {
      en: 'The Canary Islands and Madeira sit off the coast of Africa, where the Atlantic keeps daytime highs near 21°C through January and February. This is the one part of Europe where a dog can swim and sunbathe in deep winter, and where flat-faced or heat-sensitive dogs stay comfortable year-round.',
      fr: `Les îles Canaries et Madère se trouvent au large de l'Afrique, où l'Atlantique maintient des maximales proches de 21°C en janvier et février. C'est le seul coin d'Europe où un chien peut nager et lézarder au soleil en plein hiver, et où les chiens à face plate ou sensibles à la chaleur restent à l'aise toute l'année.`,
      es: 'Las islas Canarias y Madeira se hallan frente a la costa de África, donde el Atlántico mantiene máximas cercanas a los 21°C en enero y febrero. Es el único rincón de Europa donde un perro puede nadar y tomar el sol en pleno invierno, y donde los perros de cara plana o sensibles al calor están cómodos todo el año.',
      pt: 'As ilhas Canárias e a Madeira ficam ao largo da costa de África, onde o Atlântico mantém máximas perto dos 21°C em janeiro e fevereiro. É o único canto da Europa onde um cão pode nadar e apanhar sol em pleno inverno, e onde os cães de cara achatada ou sensíveis ao calor se mantêm confortáveis todo o ano.',
      de: 'Die Kanarischen Inseln und Madeira liegen vor der Küste Afrikas, wo der Atlantik die Tageshöchstwerte im Januar und Februar bei rund 21°C hält. Dies ist der einzige Teil Europas, in dem ein Hund mitten im Winter schwimmen und sich sonnen kann, und in dem kurznasige oder hitzeempfindliche Hunde das ganze Jahr über wohlfühlen.',
    },
    destinations: [
      {
        slug: 'tenerife',
        name: 'Tenerife',
        country: 'Spain',
        janTemp: 21,
        tag: { en: 'Biggest island · Teide + coast', fr: 'La plus grande île · Teide + côte', es: 'La isla mayor · Teide + costa', pt: 'A maior ilha · Teide + costa', de: 'Größte Insel · Teide + Küste' },
        why: {
          en: 'Tenerife holds 21°C in January and pairs a dog beach at El Camison in the south with pine-forest trails high on Mount Teide, where dogs can walk in cool mountain air. Direct winter flights from across Europe make it the easiest Canary base for a longer stay.',
          fr: `Tenerife tient 21°C en janvier et associe une plage canine à El Camison, au sud, aux sentiers de forêt de pins en altitude sur le Teide, où les chiens marchent dans un air de montagne frais. Les vols directs d'hiver depuis toute l'Europe en font la base canarienne la plus simple pour un long séjour.`,
          es: 'Tenerife mantiene 21°C en enero y combina una playa canina en El Camisón, al sur, con senderos de pinar en altura en el Teide, donde los perros caminan en aire fresco de montaña. Los vuelos directos de invierno desde toda Europa la convierten en la base canaria más cómoda para una estancia larga.',
          pt: 'Tenerife segura 21°C em janeiro e junta uma praia canina em El Camisón, a sul, aos trilhos de pinhal em altitude no Teide, onde os cães caminham em ar fresco de montanha. Os voos diretos de inverno de toda a Europa fazem dela a base canária mais fácil para uma estadia longa.',
          de: 'Teneriffa hält im Januar 21°C und verbindet einen Hundestrand in El Camisón im Süden mit Kiefernwaldwegen hoch oben am Teide, wo Hunde in kühler Bergluft spazieren gehen können. Direkte Winterflüge aus ganz Europa machen die Insel zur einfachsten kanarischen Basis für einen längeren Aufenthalt.',
        },
      },
      {
        slug: 'gran-canaria',
        name: 'Gran Canaria',
        country: 'Spain',
        janTemp: 21,
        tag: { en: 'Dunes, ravines and dog beaches', fr: 'Dunes, ravins et plages canines', es: 'Dunas, barrancos y playas caninas', pt: 'Dunas, ravinas e praias caninas', de: 'Dünen, Schluchten und Hundestrände' },
        why: {
          en: 'Gran Canaria is a continent in miniature: 21°C on the coast, cooler pine highlands inland, and an official dog beach at El Confital just outside Las Palmas. The ravine hikes in the centre give a working dog a real winter workout without the heat.',
          fr: `Gran Canaria est un continent miniature : 21°C sur la côte, hauteurs de pins plus fraîches à l'intérieur, et une plage canine officielle à El Confital, juste à côté de Las Palmas. Les randonnées dans les ravins du centre offrent à un chien actif un vrai effort hivernal sans la chaleur.`,
          es: 'Gran Canaria es un continente en miniatura: 21°C en la costa, cumbres de pinar más frescas en el interior, y una playa canina oficial en El Confital, junto a Las Palmas. Las rutas por los barrancos del centro dan a un perro activo un ejercicio invernal de verdad sin el calor.',
          pt: 'A Gran Canaria é um continente em miniatura: 21°C na costa, terras altas de pinhal mais frescas no interior, e uma praia canina oficial em El Confital, mesmo à saída de Las Palmas. As caminhadas pelas ravinas do centro dão a um cão ativo um verdadeiro exercício de inverno sem o calor.',
          de: 'Gran Canaria ist ein Kontinent im Kleinen: 21°C an der Küste, kühlere Kiefernhöhen im Landesinneren und ein offizieller Hundestrand in El Confital, direkt vor den Toren von Las Palmas. Die Schluchtenwanderungen im Zentrum bieten einem aktiven Hund ein echtes Wintertraining ohne die Hitze.',
        },
      },
      {
        slug: 'maspalomas',
        name: 'Maspalomas',
        country: 'Spain',
        janTemp: 19,
        tag: { en: 'Gran Canaria dunes · sheltered south', fr: 'Dunes de Gran Canaria · sud abrité', es: 'Dunas de Gran Canaria · sur resguardado', pt: 'Dunas da Gran Canaria · sul abrigado', de: 'Dünen von Gran Canaria · geschützter Süden' },
        why: {
          en: 'On the sheltered south tip of Gran Canaria, Maspalomas wraps a protected dune reserve around a lighthouse and a long promenade. Winter days sit at 19°C with reliable sun, and the resort has the widest choice of pet-friendly apartments for a month-long escape.',
          fr: `Sur la pointe sud abritée de Gran Canaria, Maspalomas déploie une réserve de dunes protégée autour d'un phare et d'une longue promenade. Les journées d'hiver s'établissent à 19°C avec un soleil fiable, et la station offre le plus grand choix d'appartements pet-friendly pour une escapade d'un mois.`,
          es: 'En la resguardada punta sur de Gran Canaria, Maspalomas despliega una reserva de dunas protegida en torno a un faro y un largo paseo. Los días de invierno se sitúan en 19°C con sol fiable, y el destino ofrece la mayor variedad de apartamentos pet-friendly para una escapada de un mes.',
          pt: 'Na abrigada ponta sul da Gran Canaria, Maspalomas estende uma reserva de dunas protegida em torno de um farol e de um longo passeio. Os dias de inverno ficam nos 19°C com sol fiável, e o destino oferece a maior escolha de apartamentos pet-friendly para uma escapadela de um mês.',
          de: 'An der geschützten Südspitze von Gran Canaria umschließt Maspalomas ein geschütztes Dünenreservat rund um einen Leuchtturm und eine lange Promenade. Die Wintertage liegen bei 19°C mit verlässlichem Sonnenschein, und der Ferienort bietet die größte Auswahl an haustierfreundlichen Apartments für eine einmonatige Auszeit.',
        },
      },
      {
        slug: 'lanzarote',
        name: 'Lanzarote',
        country: 'Spain',
        janTemp: 21,
        tag: { en: 'Volcanic island · warm and dry', fr: 'Île volcanique · chaude et sèche', es: 'Isla volcánica · cálida y seca', pt: 'Ilha vulcânica · quente e seca', de: 'Vulkaninsel · warm und trocken' },
        why: {
          en: 'Lanzarote is the driest and one of the warmest Canaries at 21°C, a lunar landscape of black lava and whitewashed villages. Dogs are welcome on much of the coast out of the summer crowds, and the flat volcanic tracks make easy walking for older dogs.',
          fr: `Lanzarote est la plus sèche et l'une des plus chaudes des Canaries à 21°C, un paysage lunaire de lave noire et de villages blanchis à la chaux. Les chiens sont bienvenus sur une grande partie de la côte, loin de la foule estivale, et les pistes volcaniques plates offrent des balades faciles aux chiens âgés.`,
          es: 'Lanzarote es la más seca y una de las más cálidas de Canarias a 21°C, un paisaje lunar de lava negra y pueblos encalados. Los perros son bienvenidos en buena parte de la costa lejos de las multitudes estivales, y las pistas volcánicas llanas hacen fácil el paseo para perros mayores.',
          pt: 'Lanzarote é a mais seca e uma das mais quentes das Canárias a 21°C, uma paisagem lunar de lava negra e aldeias caiadas. Os cães são bem-vindos em grande parte da costa longe das multidões de verão, e os caminhos vulcânicos planos tornam o passeio fácil para cães idosos.',
          de: 'Lanzarote ist mit 21°C die trockenste und eine der wärmsten Kanareninseln, eine mondähnliche Landschaft aus schwarzer Lava und weiß getünchten Dörfern. Hunde sind auf großen Teilen der Küste abseits des Sommertrubels willkommen, und die flachen vulkanischen Wege eignen sich gut für ältere Hunde.',
        },
      },
      {
        slug: 'funchal',
        name: 'Funchal',
        country: 'Portugal',
        janTemp: 16,
        tag: { en: 'Madeira · levada trails', fr: 'Madère · sentiers des levadas', es: 'Madeira · senderos de levadas', pt: 'Madeira · veredas das levadas', de: 'Madeira · Levada-Wanderwege' },
        why: {
          en: 'Funchal is milder and greener than the Canaries at 16°C, terraced above the Atlantic on the island of Madeira. The famous levada water-channel trails run dog-friendly through laurel forest, and the seafront gardens stay in flower all winter.',
          fr: `Funchal est plus douce et plus verte que les Canaries à 16°C, en terrasses au-dessus de l'Atlantique sur l'île de Madère. Les célèbres sentiers des levadas, ces canaux d'irrigation, sont accessibles aux chiens à travers la forêt de lauriers, et les jardins du front de mer restent fleuris tout l'hiver.`,
          es: 'Funchal es más suave y verde que Canarias a 16°C, en terrazas sobre el Atlántico en la isla de Madeira. Los famosos senderos de las levadas, esos canales de riego, admiten perros a través del bosque de laurisilva, y los jardines del paseo marítimo siguen floridos todo el invierno.',
          pt: 'O Funchal é mais ameno e verde do que as Canárias a 16°C, em socalcos sobre o Atlântico na ilha da Madeira. As famosas veredas das levadas, os canais de rega, aceitam cães através da floresta laurissilva, e os jardins da marginal mantêm-se floridos todo o inverno.',
          de: 'Funchal ist milder und grüner als die Kanaren mit 16°C, terrassenförmig über dem Atlantik auf der Insel Madeira gelegen. Die berühmten Levada-Wasserkanalwege sind hundefreundlich und führen durch Lorbeerwald, und die Gärten an der Uferpromenade blühen den ganzen Winter über.',
        },
      },
    ],
  },
  {
    id: 'mild-coast',
    emoji: '🌊',
    name: {
      en: 'Mild southern coast, off-season and quiet',
      fr: 'Côte sud douce, hors saison et tranquille',
      es: 'Costa sur templada, fuera de temporada y tranquila',
      pt: 'Costa sul amena, fora de época e calma',
      de: 'Milde Südküste, außerhalb der Saison und ruhig',
    },
    blurb: {
      en: 'Mainland Andalusia and the Algarve stay mild through winter, with dry, sunny days in the mid-teens and the summer beach bans long lifted. Prices are at their lowest, the promenades belong to locals and their dogs, and a short flight puts you there.',
      fr: `L'Andalousie continentale et l'Algarve restent douces tout l'hiver, avec des journées sèches et ensoleillées autour de 13 à 17°C et les interdictions estivales de plage levées depuis longtemps. Les prix sont au plus bas, les promenades appartiennent aux habitants et à leurs chiens, et un court vol vous y dépose.`,
      es: 'La Andalucía continental y el Algarve se mantienen templados todo el invierno, con días secos y soleados de entre 13 y 17°C y las prohibiciones estivales de playa levantadas hace tiempo. Los precios están en su punto más bajo, los paseos son de los vecinos y sus perros, y un vuelo corto te deja allí.',
      pt: 'A Andaluzia continental e o Algarve mantêm-se amenos todo o inverno, com dias secos e soalheiros entre os 13 e os 17°C e as proibições de praia de verão levantadas há muito. Os preços estão no ponto mais baixo, as marginais são dos habitantes e dos seus cães, e um voo curto deixa-o lá.',
      de: 'Das andalusische Festland und die Algarve bleiben den ganzen Winter über mild, mit trockenen, sonnigen Tagen im mittleren Zehnergrad-Bereich, und die sommerlichen Strandverbote sind längst aufgehoben. Die Preise sind auf ihrem niedrigsten Stand, die Promenaden gehören den Einheimischen und ihren Hunden, und ein kurzer Flug bringt Sie hin.',
    },
    destinations: [
      {
        slug: 'malaga',
        name: 'Málaga',
        country: 'Spain',
        janTemp: 13,
        tag: { en: 'Andalusian city · museums + sea', fr: 'Ville andalouse · musées + mer', es: 'Ciudad andaluza · museos + mar', pt: 'Cidade andaluza · museus + mar', de: 'Andalusische Stadt · Museen + Meer' },
        why: {
          en: 'Málaga gives you a full Andalusian city in winter: a walkable old town, the Gibralfaro hill, palm-lined seafront and a dog beach at Guadalmar. At 13°C it is jacket weather rather than beach weather, ideal for exploring on foot with a dog that dislikes the heat.',
          fr: `Málaga vous offre une véritable ville andalouse en hiver : une vieille ville à parcourir à pied, la colline du Gibralfaro, un front de mer bordé de palmiers et une plage canine à Guadalmar. À 13°C, c'est un temps à veste plutôt qu'à plage, idéal pour explorer à pied avec un chien qui n'aime pas la chaleur.`,
          es: 'Málaga te da una ciudad andaluza completa en invierno: un casco antiguo peatonal, el monte Gibralfaro, un paseo marítimo con palmeras y una playa canina en Guadalmar. A 13°C es tiempo de chaqueta más que de playa, ideal para explorar a pie con un perro al que no le gusta el calor.',
          pt: 'Málaga dá-lhe uma cidade andaluza completa no inverno: um centro histórico a pé, o monte Gibralfaro, uma marginal com palmeiras e uma praia canina em Guadalmar. A 13°C é tempo de casaco mais do que de praia, ideal para explorar a pé com um cão que não gosta do calor.',
          de: 'Málaga bietet Ihnen im Winter eine vollständige andalusische Stadt: eine begehbare Altstadt, den Hügel Gibralfaro, eine palmengesäumte Uferpromenade und einen Hundestrand in Guadalmar. Bei 13°C ist es eher Jackenwetter als Strandwetter, ideal zum Erkunden zu Fuß mit einem Hund, der Hitze nicht mag.',
        },
      },
      {
        slug: 'fuengirola',
        name: 'Fuengirola',
        country: 'Spain',
        janTemp: 17,
        tag: { en: 'Costa del Sol · year-round dog beach', fr: 'Costa del Sol · plage canine toute l\'année', es: 'Costa del Sol · playa canina todo el año', pt: 'Costa del Sol · praia canina todo o ano', de: 'Costa del Sol · ganzjähriger Hundestrand' },
        why: {
          en: 'Fuengirola is the warmest mainland pick here at 17°C, thanks to a sheltered stretch of the Costa del Sol. Its Castillo Sohail dog beach is open all year, so your dog can swim in January, and the flat 7 km promenade and free airport train make it effortless.',
          fr: `Fuengirola est le choix continental le plus chaud de cette liste à 17°C, grâce à une portion abritée de la Costa del Sol. Sa plage canine du Castillo Sohail est ouverte toute l'année, votre chien peut donc nager en janvier, et la promenade plate de 7 km et le train gratuit vers l'aéroport rendent tout facile.`,
          es: 'Fuengirola es la opción continental más cálida de esta lista a 17°C, gracias a un tramo resguardado de la Costa del Sol. Su playa canina del Castillo Sohail está abierta todo el año, así que tu perro puede nadar en enero, y el paseo llano de 7 km y el tren gratuito al aeropuerto lo hacen todo sencillo.',
          pt: 'Fuengirola é a escolha continental mais quente desta lista a 17°C, graças a um troço abrigado da Costa del Sol. A sua praia canina do Castillo Sohail está aberta todo o ano, por isso o seu cão pode nadar em janeiro, e o passeio plano de 7 km e o comboio gratuito para o aeroporto tornam tudo fácil.',
          de: 'Fuengirola ist mit 17°C die wärmste Wahl auf dem Festland in dieser Liste, dank eines geschützten Abschnitts der Costa del Sol. Der Hundestrand Castillo Sohail ist ganzjährig geöffnet, sodass Ihr Hund im Januar schwimmen kann, und die flache 7 km lange Promenade sowie der kostenlose Flughafenzug machen alles mühelos.',
        },
      },
      {
        slug: 'nerja',
        name: 'Nerja',
        country: 'Spain',
        janTemp: 17,
        tag: { en: 'Cliff coves · slower pace', fr: 'Criques de falaise · rythme lent', es: 'Calas de acantilado · ritmo lento', pt: 'Enseadas de falésia · ritmo lento', de: 'Klippenbuchten · langsameres Tempo' },
        why: {
          en: 'Quieter than the resorts to the west, Nerja stays a warm 17°C and keeps a small-town winter rhythm. The cliff paths towards Maro and the coves below the Balcón de Europa are dog-friendly and gloriously empty between December and February.',
          fr: `Plus calme que les stations à l'ouest, Nerja garde un doux 17°C et un rythme d'hiver de petite ville. Les sentiers de falaise vers Maro et les criques sous le Balcón de Europa sont accessibles aux chiens et magnifiquement déserts entre décembre et février.`,
          es: 'Más tranquila que los destinos del oeste, Nerja mantiene unos cálidos 17°C y un ritmo invernal de pueblo. Los senderos de acantilado hacia Maro y las calas bajo el Balcón de Europa admiten perros y están gloriosamente vacíos entre diciembre y febrero.',
          pt: 'Mais calma do que os destinos a oeste, Nerja mantém uns amenos 17°C e um ritmo de inverno de vila pequena. Os trilhos de falésia para Maro e as enseadas por baixo do Balcón de Europa aceitam cães e estão gloriosamente vazios entre dezembro e fevereiro.',
          de: 'Ruhiger als die Ferienorte im Westen, hält Nerja beständige 17°C und einen kleinstädtischen Winterrhythmus. Die Klippenpfade Richtung Maro und die Buchten unterhalb des Balcón de Europa sind hundefreundlich und zwischen Dezember und Februar herrlich menschenleer.',
        },
      },
      {
        slug: 'albufeira',
        name: 'Albufeira',
        country: 'Portugal',
        janTemp: 13,
        tag: { en: 'Algarve · empty cliff trails', fr: 'Algarve · sentiers de falaise déserts', es: 'Algarve · senderos de acantilado vacíos', pt: 'Algarve · trilhos de falésia vazios', de: 'Algarve · leere Klippenwege' },
        why: {
          en: 'In winter the Algarve turns into a walkers\' coast: the Seven Hanging Valleys clifftop trail above Albufeira is glorious at 13°C, and several beaches allow dogs off-season. Flights and apartments are at their cheapest between December and February.',
          fr: `En hiver, l'Algarve devient une côte de randonneurs : le sentier des Sete Vales Suspensos au-dessus d'Albufeira est splendide à 13°C, et plusieurs plages acceptent les chiens hors saison. Vols et appartements sont au plus bas entre décembre et février.`,
          es: 'En invierno el Algarve se convierte en una costa de senderistas: el sendero de los Siete Valles Colgantes sobre Albufeira es espléndido a 13°C, y varias playas admiten perros fuera de temporada. Vuelos y apartamentos están en su punto más barato entre diciembre y febrero.',
          pt: 'No inverno o Algarve transforma-se numa costa de caminhantes: o trilho dos Sete Vales Suspensos por cima de Albufeira é esplêndido a 13°C, e várias praias aceitam cães fora de época. Voos e apartamentos estão no ponto mais barato entre dezembro e fevereiro.',
          de: 'Im Winter verwandelt sich die Algarve in eine Wanderküste: Der Klippenpfad der Sieben Hängenden Täler über Albufeira ist bei 13°C herrlich, und mehrere Strände erlauben Hunde außerhalb der Saison. Flüge und Apartments sind zwischen Dezember und Februar am günstigsten.',
        },
      },
    ],
  },
  {
    id: 'snow-and-culture',
    emoji: '🏔️',
    name: {
      en: 'Thermal spa and winter culture',
      fr: 'Thermes et culture d\'hiver',
      es: 'Termas y cultura de invierno',
      pt: 'Termas e cultura de inverno',
      de: 'Thermalbad und Winterkultur',
    },
    blurb: {
      en: 'Not every winter trip is about staying warm. For a snow-and-steam holiday, an Alpine thermal town lets a dog wait cosy while you soak, and a mild historic city offers museums, markets and gentle walks. Prefer festive crowds? See our dog-friendly Christmas markets guide.',
      fr: `Tout voyage d'hiver ne vise pas la chaleur. Pour des vacances neige et vapeur, une ville thermale alpine permet à un chien d'attendre au chaud pendant que vous vous baignez, et une ville historique douce offre musées, marchés et balades tranquilles. Vous préférez l'ambiance des fêtes ? Voyez notre guide des marchés de Noël dog-friendly.`,
      es: 'No todo viaje de invierno busca calor. Para unas vacaciones de nieve y vapor, un pueblo termal alpino permite que un perro espere calentito mientras te bañas, y una ciudad histórica templada ofrece museos, mercados y paseos tranquilos. ¿Prefieres el ambiente festivo? Mira nuestra guía de mercados navideños dog-friendly.',
      pt: 'Nem toda a viagem de inverno procura o calor. Para umas férias de neve e vapor, uma vila termal alpina deixa um cão esperar quentinho enquanto se banha, e uma cidade histórica amena oferece museus, mercados e passeios tranquilos. Prefere o ambiente festivo? Veja o nosso guia de mercados de Natal dog-friendly.',
      de: 'Nicht jede Winterreise dreht sich ums Warmbleiben. Für einen Urlaub mit Schnee und Dampf lässt eine alpine Thermalstadt Ihren Hund gemütlich warten, während Sie baden, und eine milde historische Stadt bietet Museen, Märkte und sanfte Spaziergänge. Bevorzugen Sie festliches Treiben? Sehen Sie unseren Guide zu hundefreundlichen Weihnachtsmärkten.',
    },
    destinations: [
      {
        slug: 'bad-gastein',
        name: 'Bad Gastein',
        country: 'Austria',
        janTemp: -2,
        tag: { en: 'Alpine thermal town · Belle Époque', fr: 'Ville thermale alpine · Belle Époque', es: 'Pueblo termal alpino · Belle Époque', pt: 'Vila termal alpina · Belle Époque', de: 'Alpine Thermalstadt · Belle Époque' },
        why: {
          en: 'Bad Gastein stacks Belle Époque hotels up a waterfall gorge deep in the Austrian Alps. It is properly cold at minus 2°C, so pack a coat for the dog, but the snowshoe trails, the frozen waterfall and the dog-welcoming thermal hotels make it a magical winter base. A short train ride reaches the Gastein valley ski slopes.',
          fr: `Bad Gastein empile ses hôtels Belle Époque le long d'une gorge à cascade, au coeur des Alpes autrichiennes. Il y fait vraiment froid, à moins 2°C, prévoyez donc un manteau pour le chien, mais les sentiers en raquettes, la cascade gelée et les hôtels thermaux qui accueillent les chiens en font une base d'hiver magique. Un court trajet en train mène aux pistes de la vallée de Gastein.`,
          es: 'Bad Gastein apila sus hoteles Belle Époque a lo largo de un desfiladero con cascada, en el corazón de los Alpes austriacos. Hace realmente frío, a menos 2°C, así que lleva un abrigo para el perro, pero los senderos con raquetas, la cascada helada y los hoteles termales que acogen perros lo convierten en una base invernal mágica. Un corto trayecto en tren llega a las pistas del valle de Gastein.',
          pt: 'Bad Gastein empilha os seus hotéis Belle Époque ao longo de um desfiladeiro com cascata, no coração dos Alpes austríacos. Faz mesmo frio, a menos 2°C, por isso leve um casaco para o cão, mas os trilhos de raquetas, a cascata gelada e os hotéis termais que acolhem cães fazem dela uma base de inverno mágica. Uma curta viagem de comboio chega às pistas do vale de Gastein.',
          de: 'Bad Gastein stapelt Belle-Époque-Hotels eine Wasserfallschlucht hinauf, tief in den österreichischen Alpen. Es ist wirklich kalt bei minus 2°C, packen Sie also einen Mantel für den Hund ein, aber die Schneeschuhwege, der gefrorene Wasserfall und die hundefreundlichen Thermalhotels machen es zu einer magischen Winterbasis. Eine kurze Zugfahrt führt zu den Skipisten im Gasteinertal.',
        },
      },
      {
        slug: 'granada',
        name: 'Granada',
        country: 'Spain',
        janTemp: 7,
        tag: { en: 'Alhambra city · Sierra Nevada above', fr: 'Ville de l\'Alhambra · Sierra Nevada au-dessus', es: 'Ciudad de la Alhambra · Sierra Nevada arriba', pt: 'Cidade da Alhambra · Serra Nevada por cima', de: 'Alhambra-Stadt · Sierra Nevada darüber' },
        why: {
          en: 'Granada offers the rare winter combination of a warm city and real snow within sight: crisp 7°C days in the Albaicín and free tapas on the terraces, with the Sierra Nevada ski resort forty minutes up the road. Dogs walk the Río Darro path and the Alhambra woods below the palace.',
          fr: `Grenade offre la rare combinaison hivernale d'une ville douce et de vraie neige en vue : des journées vives à 7°C dans l'Albaicín et des tapas offertes en terrasse, avec la station de ski de la Sierra Nevada à quarante minutes de route. Les chiens parcourent le chemin du Río Darro et les bois de l'Alhambra sous le palais.`,
          es: 'Granada ofrece la rara combinación invernal de una ciudad templada y nieve de verdad a la vista: días frescos de 7°C en el Albaicín y tapas gratis en las terrazas, con la estación de esquí de Sierra Nevada a cuarenta minutos. Los perros recorren el paseo del Río Darro y los bosques de la Alhambra bajo el palacio.',
          pt: 'Granada oferece a rara combinação de inverno de uma cidade amena e neve a sério à vista: dias frescos de 7°C no Albaicín e tapas gratuitas nas esplanadas, com a estância de esqui da Serra Nevada a quarenta minutos. Os cães percorrem o caminho do Río Darro e os bosques da Alhambra por baixo do palácio.',
          de: 'Granada bietet die seltene winterliche Kombination aus einer warmen Stadt und echtem Schnee in Sichtweite: klare 7°C-Tage im Albaicín und kostenlose Tapas auf den Terrassen, mit dem Skigebiet Sierra Nevada vierzig Minuten die Straße hinauf. Hunde gehen den Río-Darro-Weg und die Alhambra-Wälder unterhalb des Palasts entlang.',
        },
      },
    ],
  },
]

const SIBLING_GUIDES = [
  { slug: 'autumn-destinations-with-dog-2026', emoji: '🍂', label: { en: 'Autumn destinations with your dog', fr: 'Destinations d\'automne avec son chien', es: 'Destinos de otoño con tu perro', pt: 'Destinos de outono com o seu cão', de: 'Herbstziele mit Ihrem Hund' } },
  { slug: 'christmas-markets-with-dog', emoji: '🎄', label: { en: 'Dog-friendly Christmas markets', fr: 'Marchés de Noël dog-friendly', es: 'Mercados navideños dog-friendly', pt: 'Mercados de Natal dog-friendly', de: 'Hundefreundliche Weihnachtsmärkte' } },
  { slug: 'escape-heat-dog-europe-2026', emoji: '🌡️', label: { en: 'Escape the summer heat with your dog', fr: 'Fuir la chaleur estivale avec son chien', es: 'Escapar del calor veraniego con tu perro', pt: 'Fugir do calor de verão com o seu cão', de: 'Der Sommerhitze mit Ihrem Hund entkommen' } },
]

// Top 3 value-sorted pet-friendly hotels per featured destination, shown inline.
const HOTELS_BY_DEST: Record<string, typeof hotels> = {}
for (const slug of THEMES.flatMap((t) => t.destinations.map((d) => d.slug))) {
  HOTELS_BY_DEST[slug] = valueSort(hotels.filter((h) => h.destinationSlug === slug)).slice(0, 3)
}

const T = {
  title: {
    en: 'Best Winter 2026 Destinations to Travel With Your Dog',
    fr: 'Meilleures destinations hiver 2026 pour voyager avec son chien',
    es: 'Mejores destinos de invierno 2026 para viajar con tu perro',
    pt: 'Melhores destinos de inverno 2026 para viajar com o seu cão',
    de: 'Die besten Winterziele 2026 zum Reisen mit Ihrem Hund',
  },
  metaTitle: {
    en: '11 Best Winter Destinations to Travel With Your Dog (2026)',
    fr: '11 meilleures destinations d\'hiver pour voyager avec son chien (2026)',
    es: '11 mejores destinos de invierno para viajar con tu perro (2026)',
    pt: '11 melhores destinos de inverno para viajar com o seu cão (2026)',
    de: '11 beste Winterziele zum Reisen mit Ihrem Hund (2026)',
  },
  metaDesc: {
    en: 'Where to travel with your dog in winter: winter-sun Canary Islands near 21°C, mild Andalusian and Algarve coast, and an Alpine thermal town. 11 destinations, pet-friendly hotels included.',
    fr: 'Où voyager avec son chien en hiver : îles Canaries au soleil proche de 21°C, côte douce d\'Andalousie et de l\'Algarve, et une ville thermale alpine. 11 destinations, hôtels pet-friendly inclus.',
    es: 'Dónde viajar con tu perro en invierno: islas Canarias con sol cerca de 21°C, costa templada de Andalucía y el Algarve, y un pueblo termal alpino. 11 destinos, hoteles pet-friendly incluidos.',
    pt: 'Onde viajar com o seu cão no inverno: ilhas Canárias com sol perto dos 21°C, costa amena da Andaluzia e do Algarve, e uma vila termal alpina. 11 destinos, hotéis pet-friendly incluídos.',
    de: 'Wohin mit dem Hund im Winter reisen: Wintersonne auf den Kanarischen Inseln nahe 21°C, milde andalusische und Algarve-Küste, und eine alpine Thermalstadt. 11 Ziele, haustierfreundliche Hotels inklusive.',
  },
  intro: {
    en: 'Winter is where a dog-friendly Europe splits in two. If you want warmth, the Canary Islands and Madeira keep the coast near 21°C, warm enough to swim, while mainland Andalusia and the Algarve stay mild and empty. If you want snow, an Alpine thermal town or a historic city with mountains behind it does the job. These 11 destinations cover both, and every one links straight to its pet-friendly hotels.',
    fr: `L'hiver partage l'Europe dog-friendly en deux. Pour de la chaleur, les îles Canaries et Madère maintiennent la côte proche de 21°C, assez chaud pour se baigner, tandis que l'Andalousie continentale et l'Algarve restent douces et désertes. Pour de la neige, une ville thermale alpine ou une cité historique adossée aux montagnes fait l'affaire. Ces 11 destinations couvrent les deux, et chacune renvoie directement vers ses hôtels pet-friendly.`,
    es: 'El invierno parte en dos la Europa dog-friendly. Si quieres calor, las islas Canarias y Madeira mantienen la costa cerca de 21°C, lo bastante cálida para bañarse, mientras que la Andalucía continental y el Algarve siguen templados y vacíos. Si quieres nieve, un pueblo termal alpino o una ciudad histórica con montañas detrás cumplen. Estos 11 destinos cubren ambas cosas, y cada uno enlaza directo con sus hoteles pet-friendly.',
    pt: 'O inverno divide em dois a Europa dog-friendly. Se quer calor, as ilhas Canárias e a Madeira mantêm a costa perto dos 21°C, quente que chegue para nadar, enquanto a Andaluzia continental e o Algarve se mantêm amenos e vazios. Se quer neve, uma vila termal alpina ou uma cidade histórica encostada às montanhas resolvem. Estes 11 destinos cobrem ambos, e cada um liga diretamente aos seus hotéis pet-friendly.',
    de: 'Der Winter teilt das hundefreundliche Europa in zwei Teile. Wer Wärme sucht: Die Kanarischen Inseln und Madeira halten die Küste nahe 21°C, warm genug zum Schwimmen, während das andalusische Festland und die Algarve mild und leer bleiben. Wer Schnee sucht: Eine alpine Thermalstadt oder eine historische Stadt mit Bergen im Hintergrund erfüllt den Zweck. Diese 11 Ziele decken beides ab, und jedes führt direkt zu seinen haustierfreundlichen Hotels.',
  },
  janTemp: { en: 'Jan avg high', fr: 'Max moy. janv.', es: 'Máx. prom. ene.', pt: 'Máx. méd. jan.', de: 'Ø Höchstwert Jan.' },
  seeHotels: { en: 'See pet-friendly hotels', fr: 'Voir les hôtels pet-friendly', es: 'Ver hoteles pet-friendly', pt: 'Ver hotéis pet-friendly', de: 'Haustierfreundliche Hotels ansehen' },
  seeGuide: { en: 'Destination guide', fr: 'Guide destination', es: 'Guía del destino', pt: 'Guia do destino', de: 'Reiseführer zum Ziel' },
  fromWord: { en: 'from', fr: 'dès', es: 'desde', pt: 'desde', de: 'ab' },
  noFee: { en: 'no pet fee', fr: 'sans supplément', es: 'sin cargo mascota', pt: 'sem suplemento', de: 'keine Haustiergebühr' },
  ourPicks: { en: '3 pet-friendly picks', fr: '3 adresses pet-friendly', es: '3 opciones pet-friendly', pt: '3 opções pet-friendly', de: '3 haustierfreundliche Empfehlungen' },
  breadHome: { en: 'Home', fr: 'Accueil', es: 'Inicio', pt: 'Início', de: 'Startseite' },
  breadGuides: { en: 'Guides', fr: 'Guides', es: 'Guías', pt: 'Guias', de: 'Guides' },
  kicker: { en: 'Winter & dogs', fr: 'Hiver & chien', es: 'Invierno & perro', pt: 'Inverno & cão', de: 'Winter & Hund' },
  siblingTitle: { en: 'Plan the rest of the year', fr: 'Planifier le reste de l\'année', es: 'Planifica el resto del año', pt: 'Planeie o resto do ano', de: 'Den Rest des Jahres planen' },
  faq: {
    q1: {
      en: 'Where can I travel with my dog in winter to find warm weather?',
      fr: 'Où voyager avec son chien en hiver pour trouver de la chaleur ?',
      es: '¿A dónde puedo viajar con mi perro en invierno para tener buen tiempo?',
      pt: 'Para onde posso viajar com o meu cão no inverno para ter calor?',
      de: 'Wohin kann ich mit meinem Hund im Winter reisen, um warmes Wetter zu finden?',
    },
    a1: {
      en: 'The Canary Islands are Europe\'s warmest winter destination, with Tenerife, Gran Canaria and Lanzarote all near 21°C in January and dog beaches open. Madeira (Funchal) is milder and greener at 16°C. On the mainland, the Costa del Sol (Fuengirola, Nerja) and the Algarve stay in the mid-to-high teens with dry, sunny days. Fuengirola even keeps a year-round dog beach at Castillo Sohail.',
      fr: `Les îles Canaries sont la destination hivernale la plus chaude d'Europe : Tenerife, Gran Canaria et Lanzarote sont toutes proches de 21°C en janvier, avec des plages canines ouvertes. Madère (Funchal) est plus douce et plus verte à 16°C. Sur le continent, la Costa del Sol (Fuengirola, Nerja) et l'Algarve restent autour de 13 à 17°C avec des journées sèches et ensoleillées. Fuengirola conserve même une plage canine ouverte toute l'année au Castillo Sohail.`,
      es: 'Las islas Canarias son el destino invernal más cálido de Europa: Tenerife, Gran Canaria y Lanzarote rondan los 21°C en enero, con playas caninas abiertas. Madeira (Funchal) es más suave y verde a 16°C. En la península, la Costa del Sol (Fuengirola, Nerja) y el Algarve se mantienen entre 13 y 17°C con días secos y soleados. Fuengirola conserva incluso una playa canina abierta todo el año en el Castillo Sohail.',
      pt: 'As ilhas Canárias são o destino de inverno mais quente da Europa: Tenerife, Gran Canaria e Lanzarote rondam os 21°C em janeiro, com praias caninas abertas. A Madeira (Funchal) é mais amena e verde a 16°C. No continente, a Costa del Sol (Fuengirola, Nerja) e o Algarve mantêm-se entre os 13 e os 17°C com dias secos e soalheiros. Fuengirola mantém até uma praia canina aberta todo o ano no Castillo Sohail.',
      de: 'Die Kanarischen Inseln sind Europas wärmstes Winterziel: Teneriffa, Gran Canaria und Lanzarote liegen im Januar alle nahe bei 21°C, mit geöffneten Hundestränden. Madeira (Funchal) ist milder und grüner bei 16°C. Auf dem Festland bleiben die Costa del Sol (Fuengirola, Nerja) und die Algarve im mittleren bis oberen Zehnergrad-Bereich mit trockenen, sonnigen Tagen. Fuengirola unterhält sogar einen ganzjährigen Hundestrand am Castillo Sohail.',
    },
    q2: {
      en: 'Can I take my dog on a winter or ski trip to the Alps?',
      fr: 'Puis-je emmener mon chien en voyage d\'hiver ou au ski dans les Alpes ?',
      es: '¿Puedo llevar a mi perro a un viaje de invierno o de esquí a los Alpes?',
      pt: 'Posso levar o meu cão numa viagem de inverno ou de esqui aos Alpes?',
      de: 'Kann ich meinen Hund auf eine Winter- oder Skireise in die Alpen mitnehmen?',
    },
    a2: {
      en: 'Yes, with preparation. Many Alpine towns like Bad Gastein have dog-welcoming thermal hotels and snowshoe or winter-walking trails where a dog can join you. Your dog cannot go on the ski slopes while you ski, so plan a day structure that works, and pack a warm coat and paw protection against ice and grit salt. Short-haired and small dogs feel the cold fast below zero.',
      fr: `Oui, avec de la préparation. Beaucoup de villes alpines comme Bad Gastein disposent d'hôtels thermaux qui accueillent les chiens et de sentiers en raquettes ou de balades hivernales où le chien peut vous accompagner. Votre chien ne peut pas aller sur les pistes pendant que vous skiez, prévoyez donc une organisation de journée adaptée, un manteau chaud et une protection des coussinets contre la glace et le sel de déneigement. Les chiens à poil ras et de petite taille ont vite froid en dessous de zéro.`,
      es: 'Sí, con preparación. Muchos pueblos alpinos como Bad Gastein tienen hoteles termales que acogen perros y senderos con raquetas o paseos invernales donde el perro puede acompañarte. Tu perro no puede subir a las pistas mientras esquías, así que planifica una estructura de día que funcione, y lleva un abrigo cálido y protección para las almohadillas contra el hielo y la sal de deshielo. Los perros de pelo corto y pequeños sienten el frío rápido bajo cero.',
      pt: 'Sim, com preparação. Muitas vilas alpinas como Bad Gastein têm hotéis termais que acolhem cães e trilhos de raquetas ou passeios de inverno onde o cão pode acompanhá-lo. O seu cão não pode ir às pistas enquanto esquia, por isso planeie uma estrutura de dia que funcione, e leve um casaco quente e proteção para as almofadinhas contra o gelo e o sal de degelo. Os cães de pelo curto e pequenos sentem o frio depressa abaixo de zero.',
      de: 'Ja, mit Vorbereitung. Viele alpine Orte wie Bad Gastein verfügen über hundefreundliche Thermalhotels sowie Schneeschuh- oder Winterwanderwege, auf denen ein Hund Sie begleiten kann. Ihr Hund kann nicht mit auf die Skipisten, während Sie skifahren, planen Sie also eine funktionierende Tagesstruktur und packen Sie einen warmen Mantel sowie Pfotenschutz gegen Eis und Streusalz ein. Kurzhaarige und kleine Hunde frieren unter null Grad schnell.',
    },
    q3: {
      en: 'Do dogs need extra care travelling in winter?',
      fr: 'Les chiens ont-ils besoin de précautions particulières en hiver ?',
      es: '¿Necesitan los perros cuidados especiales al viajar en invierno?',
      pt: 'Os cães precisam de cuidados especiais ao viajar no inverno?',
      de: 'Brauchen Hunde im Winter besondere Pflege auf Reisen?',
    },
    a3: {
      en: 'In warm destinations, very little beyond the usual: keep up tick and flea prevention, which continues year-round in the Canaries and southern coast. In cold and Alpine destinations, protect against the opposite risks: a coat for short-haired or small dogs, paw balm or boots against ice and road salt, and shorter outings below freezing. Check the pet-import rules for your route, and carry your EU pet passport or Animal Health Certificate.',
      fr: `Dans les destinations chaudes, presque rien de plus que d'habitude : maintenez la prévention contre les tiques et les puces, qui reste active toute l'année aux Canaries et sur la côte sud. Dans les destinations froides et alpines, protégez contre les risques inverses : un manteau pour les chiens à poil ras ou petits, un baume ou des bottines contre la glace et le sel de route, et des sorties plus courtes en dessous de zéro. Vérifiez les règles d'entrée pour votre itinéraire et emportez le passeport européen pour animaux ou l'Animal Health Certificate.`,
      es: 'En destinos cálidos, poco más de lo habitual: mantén la prevención contra garrapatas y pulgas, que sigue activa todo el año en Canarias y la costa sur. En destinos fríos y alpinos, protege contra los riesgos contrarios: un abrigo para perros de pelo corto o pequeños, bálsamo o botas para las almohadillas contra el hielo y la sal de carretera, y salidas más cortas bajo cero. Consulta las normas de entrada para tu ruta y lleva el pasaporte europeo de mascota o el Animal Health Certificate.',
      pt: 'Em destinos quentes, pouco além do habitual: mantenha a prevenção contra carraças e pulgas, que continua ativa todo o ano nas Canárias e na costa sul. Em destinos frios e alpinos, proteja contra os riscos contrários: um casaco para cães de pelo curto ou pequenos, bálsamo ou botas para as almofadinhas contra o gelo e o sal da estrada, e saídas mais curtas abaixo de zero. Consulte as regras de entrada para o seu percurso e leve o passaporte europeu para animais ou o Animal Health Certificate.',
      de: 'In warmen Zielen kaum mehr als sonst: Halten Sie die Zecken- und Flohprophylaxe aufrecht, die auf den Kanaren und der Südküste ganzjährig weiterläuft. In kalten und alpinen Zielen schützen Sie vor den entgegengesetzten Risiken: einen Mantel für kurzhaarige oder kleine Hunde, Pfotenbalsam oder Schuhe gegen Eis und Streusalz, sowie kürzere Ausflüge unter dem Gefrierpunkt. Prüfen Sie die Einreisebestimmungen für Haustiere auf Ihrer Route und führen Sie den EU-Heimtierausweis oder das Animal Health Certificate mit.',
    },
  },
}

const p = (o: L4, locale: string) =>
  locale === 'fr' ? o.fr : locale === 'es' ? o.es : locale === 'pt' ? o.pt : locale === 'de' ? o.de : o.en

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

export default async function WinterDestinationsPage({
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
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="text-white/60 text-xs mb-4">
            <Link href={`/${locale}`} className="hover:text-white">{p(T.breadHome, locale)}</Link>
            <span className="mx-1.5">/</span>
            <Link href={`/${locale}/guides`} className="hover:text-white">{p(T.breadGuides, locale)}</Link>
          </nav>
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 text-cyan-200 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            ❄️ {p(T.kicker, locale)}
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
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="relative h-40 sm:h-52">
                    <Image
                      src={`/images/destinations/${dest.slug}.jpg`}
                      alt={getLocalizedCityName(dest.slug, dest.name, locale)}
                      fill
                      sizes="(max-width: 768px) 100vw, 720px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between gap-3">
                      <h3 className="text-white text-xl sm:text-2xl font-extrabold drop-shadow-sm">{getLocalizedCityName(dest.slug, dest.name, locale)}</h3>
                      <div className="flex-shrink-0 text-right text-white">
                        <div className="text-2xl font-black leading-none drop-shadow-sm">{dest.janTemp}°C</div>
                        <div className="text-[11px] text-white/85">{p(T.janTemp, locale)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="inline-flex items-center gap-1 bg-cyan-50 text-cyan-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
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
                              className="flex items-center gap-3 px-3 py-2.5 hover:bg-cyan-50/60 transition-colors"
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
                        className="inline-flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
                      >
                        🏨 {p(T.seeHotels, locale)}
                      </a>
                      <Link
                        href={`/${locale}/destinations/${dest.slug}`}
                        className="inline-flex items-center gap-1.5 border border-gray-200 hover:border-cyan-300 text-gray-700 hover:text-cyan-700 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
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
        <section className="bg-slate-50 border border-blue-100 rounded-3xl p-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-5">{p(T.siblingTitle, locale)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SIBLING_GUIDES.map((g) => (
              <Link
                key={g.slug}
                href={`/${locale}/guides/${g.slug}`}
                className="group flex items-start gap-3 bg-white rounded-2xl border border-blue-100 hover:border-cyan-300 hover:shadow-md transition-all p-4"
              >
                <span className="text-2xl flex-shrink-0">{g.emoji}</span>
                <p className="font-semibold text-gray-900 text-sm group-hover:text-cyan-700 transition-colors leading-snug">
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
