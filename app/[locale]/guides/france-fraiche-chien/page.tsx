import type { Metadata } from 'next'
import Link from 'next/link'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'france-fraiche-chien'
const CAMPAIGN = 'france-fraiche'

type L4 = { en: string; fr: string; es: string; pt: string; de: string; nl: string }
type Hotel = { name: string; stars: number; note: L4 }
type City = {
  slug: string
  name: string
  region: L4
  julyTemp: number
  tag: L4
  why: L4
  dogTip: L4
  hotels: Hotel[]
}
type Region = {
  id: string
  emoji: string
  title: L4
  cities: City[]
}

const REGIONS: Region[] = [
  {
    id: 'bretagne',
    emoji: '🌊',
    title: { en: 'Brittany', fr: 'Bretagne', es: 'Bretaña', pt: 'Bretanha', de: 'Bretagne', nl: 'Bretagne' },
    cities: [
      {
        slug: 'brest',
        name: 'Brest',
        region: { en: 'Brittany', fr: 'Bretagne', es: 'Bretaña', pt: 'Bretanha', de: 'Bretagne', nl: 'Bretagne' },
        julyTemp: 17,
        tag: { en: 'Atlantic tip · coolest city in France', fr: "Pointe atlantique · ville la plus fraîche de France", es: 'Punta atlántica · ciudad más fresca de Francia', pt: 'Ponta atlântica · cidade mais fresca de França', de: 'Atlantikspitze · kühlste Stadt Frankreichs', nl: 'Atlantische punt · koelste stad van Frankrijk' },
        why: {
          en: 'Brest is the coolest city in metropolitan France at 17°C in July, moderated by the Atlantic and the Iroise Sea. The Penfeld river valley runs through the city centre and is a 4 km off-lead corridor for dogs. The Armorique Natural Park (Presqu\'île de Crozon, 30 min south) has 80 km of coastal paths, almost all off-lead. Brest\'s city beaches (Moulin Blanc, Ker Ar Beg) accept dogs year-round, no time restriction. The Océanopolis aquarium allows dogs in the outdoor areas.',
          fr: "Brest est la ville de France métropolitaine la plus fraîche avec 17°C en juillet, tempérée par l'Atlantique et la mer d'Iroise. La vallée de la Penfeld traverse le centre-ville et constitue un corridor de 4 km sans laisse pour les chiens. Le Parc Naturel d'Armorique (Presqu'île de Crozon, 30 min au sud) dispose de 80 km de sentiers côtiers, presque tous sans laisse. Les plages de la ville (Moulin Blanc, Ker Ar Beg) acceptent les chiens toute l'année sans restriction horaire.",
          es: 'Brest es la ciudad de Francia metropolitana más fresca con 17°C en julio, moderada por el Atlántico y el mar de Iroise. El valle del río Penfeld atraviesa el centro de la ciudad y es un corredor de 4 km sin correa para los perros. El Parque Natural de Armórica (Península de Crozon, 30 min al sur) tiene 80 km de senderos costeros, casi todos sin correa.',
          pt: 'Brest é a cidade da França metropolitana mais fresca com 17°C em julho, moderada pelo Atlântico e pelo mar de Iroise. O vale do rio Penfeld atravessa o centro da cidade e é um corredor de 4 km sem trela para os cães. O Parque Natural da Armorique (Península de Crozon, 30 min a sul) tem 80 km de trilhos costeiros, quase todos sem trela.',
          de: 'Brest ist mit 17°C im Juli die kühlste Stadt im französischen Mutterland, gemäßigt durch den Atlantik und die Iroise-See. Das Tal des Flusses Penfeld durchquert das Stadtzentrum und bildet einen 4 km langen Korridor ohne Leine für Hunde. Der Regionale Naturpark Armorique (Halbinsel Crozon, 30 Min. südlich) verfügt über 80 km Küstenwege, fast alle ohne Leinenpflicht. Die Stadtstrände von Brest (Moulin Blanc, Ker Ar Beg) akzeptieren Hunde das ganze Jahr über ohne zeitliche Einschränkung. Das Aquarium Océanopolis erlaubt Hunde in den Außenbereichen.', nl: 'Brest is met 17°C in juli de koelste stad van het Franse vasteland, getemperd door de Atlantische Oceaan en de Iroise-zee. De vallei van de rivier de Penfeld loopt dwars door het centrum en vormt een 4 km lange aanlijnvrije corridor voor honden. Het Regionaal Natuurpark Armorique (schiereiland Crozon, 30 min zuidelijker) heeft 80 km kustpaden, bijna allemaal aanlijnvrij. De stadsstranden van Brest (Moulin Blanc, Ker Ar Beg) accepteren honden het hele jaar door, zonder tijdsbeperking. In het aquarium Océanopolis mogen honden mee naar de buitenruimtes.',
        },
        dogTip: {
          en: 'Presqu\'île de Crozon, Pointe de Pen-Hir: 5 km of cliff paths above the Atlantic, entirely off-lead, some of the best coastal scenery in France, cool even in August.',
          fr: "Presqu'île de Crozon, Pointe de Pen-Hir : 5 km de sentiers de falaises au-dessus de l'Atlantique, entièrement sans laisse, parmi les plus beaux paysages côtiers de France, frais même en août.",
          es: 'Península de Crozon, Pointe de Pen-Hir: 5 km de senderos de acantilados sobre el Atlántico, totalmente sin correa, algunos de los mejores paisajes costeros de Francia, fresco incluso en agosto.',
          pt: 'Península de Crozon, Pointe de Pen-Hir: 5 km de trilhos de falésia acima do Atlântico, totalmente sem trela, algumas das melhores paisagens costeiras de França, fresco mesmo em agosto.',
          de: 'Halbinsel Crozon, Pointe de Pen-Hir: 5 km Klippenwege über dem Atlantik, vollständig ohne Leine, eine der schönsten Küstenlandschaften Frankreichs, kühl selbst im August.', nl: 'Schiereiland Crozon, Pointe de Pen-Hir: 5 km klippenpaden boven de Atlantische Oceaan, helemaal aanlijnvrij, een van de mooiste kustlandschappen van Frankrijk, koel zelfs in augustus.',
        },
        hotels: [
          {
            name: 'Oceania Hôtel de France',
            stars: 4,
            note: { en: 'Central Brest, large rooms, pets accepted up to 10 kg.', fr: 'Centre de Brest, grandes chambres, animaux acceptés jusqu\'à 10 kg.', es: 'Centro de Brest, habitaciones amplias, mascotas aceptadas hasta 10 kg.', pt: 'Centro de Brest, quartos amplos, animais aceites até 10 kg.', de: 'Zentral in Brest, große Zimmer, Haustiere bis 10 kg akzeptiert.', nl: 'Centraal in Brest, grote kamers, huisdieren tot 10 kg geaccepteerd.' },
          },
          {
            name: 'Hôtel Vauban',
            stars: 3,
            note: { en: 'Affordable hotel near the port and Penfeld valley, dog-friendly rooms available.', fr: 'Hôtel abordable près du port et de la vallée de la Penfeld, chambres dog-friendly disponibles.', es: 'Hotel asequible cerca del puerto y el valle de Penfeld, habitaciones dog-friendly disponibles.', pt: 'Hotel acessível perto do porto e do vale de Penfeld, quartos dog-friendly disponíveis.', de: 'Preiswertes Hotel nahe dem Hafen und dem Penfeld-Tal, hundefreundliche Zimmer verfügbar.', nl: 'Betaalbaar hotel bij de haven en de Penfeld-vallei, hondvriendelijke kamers beschikbaar.' },
          },
          {
            name: 'Hôtel Lecoq-Gadby',
            stars: 4,
            note: { en: 'Boutique hotel with garden in a quiet district, walking distance to beaches, pets welcome.', fr: 'Hôtel boutique avec jardin dans un quartier calme, à pied des plages, animaux bienvenus.', es: 'Hotel boutique con jardín en un barrio tranquilo, a pie de las playas, mascotas bienvenidas.', pt: 'Hotel boutique com jardim num bairro tranquilo, a pé das praias, animais bem-vindos.', de: 'Boutique-Hotel mit Garten in einem ruhigen Viertel, zu Fuß erreichbare Strände, Haustiere willkommen.', nl: 'Boutique hotel met tuin in een rustige wijk, op loopafstand van de stranden, huisdieren welkom.' },
          },
        ],
      },
      {
        slug: 'saint-malo',
        name: 'Saint-Malo',
        region: { en: 'Brittany', fr: 'Bretagne', es: 'Bretaña', pt: 'Bretanha', de: 'Bretagne', nl: 'Bretagne' },
        julyTemp: 20,
        tag: { en: 'Corsair city · ramparts · tidal beaches', fr: 'Cité corsaire · remparts · plages de marée', es: 'Ciudad corsaria · murallas · playas de marea', pt: 'Cidade corsária · muralhas · praias de maré', de: 'Korsarenstadt · Stadtmauern · Gezeitenstrände', nl: 'Kapersstad · stadsmuren · getijdenstranden' },
        why: {
          en: 'Saint-Malo is one of the most dog-tolerant coastal cities in France: the rampart walk (2 km circuit at 15m above sea level, with sea views on both sides) is off-lead year-round. Grande Plage de Sillon accepts dogs before 9am and after 7pm from June to September, and year-round outside those months. The tidal island of Grand Bé (accessible on foot at low tide) has no dog restrictions. Intra-muros restaurants universally accept dogs on the terrace.',
          fr: "Saint-Malo est l'une des villes côtières les plus dog-friendly de France : la promenade des remparts (circuit de 2 km à 15m au-dessus de la mer, avec vue sur mer des deux côtés) est sans laisse toute l'année. La Grande Plage du Sillon accepte les chiens avant 9h et après 19h de juin à septembre, et toute l'année hors de ces mois. L'île marémotrice du Grand Bé (accessible à pied à marée basse) n'a aucune restriction pour les chiens. Les restaurants intra-muros acceptent unanimement les chiens en terrasse.",
          es: 'Saint-Malo es una de las ciudades costeras más dog-friendly de Francia: el paseo de las murallas (circuito de 2 km a 15m sobre el mar, con vistas al mar por ambos lados) es sin correa todo el año. La Grande Plage du Sillon acepta perros antes de las 9h y después de las 19h de junio a septiembre, y todo el año fuera de esos meses.',
          pt: 'Saint-Malo é uma das cidades costeiras mais dog-friendly de França: o passeio das muralhas (circuito de 2 km a 15m acima do mar, com vistas para o mar de ambos os lados) é sem trela durante todo o ano. A Grande Plage du Sillon aceita cães antes das 9h e depois das 19h de junho a setembro, e durante todo o ano fora desses meses.',
          de: 'Saint-Malo ist eine der hundefreundlichsten Küstenstädte Frankreichs: Der Wallgang (2 km Rundweg 15 m über dem Meer, mit Meerblick auf beiden Seiten) ist das ganze Jahr über ohne Leine begehbar. Der Grande Plage de Sillon lässt Hunde von Juni bis September vor 9 Uhr und nach 19 Uhr zu, außerhalb dieser Monate das ganze Jahr über. Die Gezeiteninsel Grand Bé (bei Ebbe zu Fuß erreichbar) hat keine Einschränkungen für Hunde. Die Restaurants intra-muros akzeptieren Hunde auf der Terrasse durchweg.', nl: 'Saint-Malo is een van de meest hondvriendelijke kuststeden van Frankrijk: de wandeling over de stadsmuren (rondje van 2 km op 15 m boven zee, met zeezicht aan beide kanten) is het hele jaar door aanlijnvrij. Het Grande Plage de Sillon accepteert honden van juni tot september vóór 9 uur en na 19 uur, en buiten die maanden het hele jaar door. Het getijdeneiland Grand Bé (bij eb te voet bereikbaar) kent geen beperkingen voor honden. De restaurants binnen de stadsmuren accepteren honden vrijwel zonder uitzondering op het terras.',
        },
        dogTip: {
          en: 'Île du Grand Bé at low tide: walk out 500m across the sand flats, explore the rocky island (Victor Hugo\'s retreat), dogs off-lead, the tide returns in 3 hours so check the tide table.',
          fr: "Île du Grand Bé à marée basse : traversez 500m sur les grèves, explorez l'île rocheuse (retraite de Victor Hugo), chiens sans laisse, la marée revient en 3h donc consultez les horaires.",
          es: 'Isla Grand Bé en marea baja: cruzar 500m por las playas de arena, explorar la isla rocosa (retiro de Victor Hugo), perros sin correa, la marea vuelve en 3h así que consulta los horarios.',
          pt: 'Ilha Grand Bé na maré baixa: atravessar 500m pelas areias, explorar a ilha rochosa (retiro de Victor Hugo), cães sem trela, a maré volta em 3h por isso consulte os horários.',
          de: 'Île du Grand Bé bei Ebbe: 500 m über die Sandbänke laufen, die Felseninsel erkunden (Rückzugsort von Victor Hugo), Hunde ohne Leine, die Flut kehrt in 3 Stunden zurück, also Gezeitentabelle prüfen.', nl: 'Île du Grand Bé bij eb: loop 500 m over de zandvlakte, verken het rotseiland (toevluchtsoord van Victor Hugo), honden mogen los, het water komt binnen 3 uur terug dus check het getijdenschema.',
        },
        hotels: [
          {
            name: 'Grand Hôtel des Thermes',
            stars: 5,
            note: { en: 'Thalasso spa hotel on the beach, sea-view rooms, small pets accepted.', fr: 'Hôtel de thalassothérapie sur la plage, chambres vue mer, petits animaux acceptés.', es: 'Hotel de talasoterapia en la playa, habitaciones con vistas al mar, mascotas pequeñas aceptadas.', pt: 'Hotel de talassoterapia na praia, quartos com vista para o mar, animais pequenos aceites.', de: 'Thalasso-Spa-Hotel am Strand, Zimmer mit Meerblick, kleine Haustiere akzeptiert.', nl: 'Thalassotherapie-hotel aan het strand, kamers met zeezicht, kleine huisdieren geaccepteerd.' },
          },
          {
            name: 'Le Valmarin',
            stars: 4,
            note: { en: 'Historic 18th-century manor with garden near the ramparts, dogs welcome.', fr: 'Manoir historique du XVIIIe siècle avec jardin près des remparts, chiens bienvenus.', es: 'Mansión histórica del siglo XVIII con jardín cerca de las murallas, perros bienvenidos.', pt: 'Solar histórico do séc. XVIII com jardim perto das muralhas, cães bem-vindos.', de: 'Historisches Herrenhaus aus dem 18. Jahrhundert mit Garten nahe den Stadtmauern, Hunde willkommen.', nl: 'Historisch landhuis uit de 18e eeuw met tuin bij de stadsmuren, honden welkom.' },
          },
          {
            name: 'Hôtel Le Nautilus',
            stars: 3,
            note: { en: 'Affordable intra-muros hotel, 2 min walk to the rampart promenade, dogs accepted.', fr: 'Hôtel abordable intra-muros, 2 min à pied de la promenade des remparts, chiens acceptés.', es: 'Hotel intramuros asequible, a 2 min a pie del paseo de las murallas, perros aceptados.', pt: 'Hotel intra-muros acessível, 2 min a pé do passeio das muralhas, cães aceites.', de: 'Preiswertes Hotel intra-muros, 2 Min. zu Fuß von der Wallpromenade, Hunde akzeptiert.', nl: 'Betaalbaar hotel binnen de stadsmuren, 2 min lopen van de wandeling op de stadsmuren, honden geaccepteerd.' },
          },
        ],
      },
    ],
  },
  {
    id: 'normandie',
    emoji: '🏰',
    title: { en: 'Normandy', fr: 'Normandie', es: 'Normandía', pt: 'Normandia', de: 'Normandie', nl: 'Normandië' },
    cities: [
      {
        slug: 'cherbourg',
        name: 'Cherbourg',
        region: { en: 'Normandy', fr: 'Normandie', es: 'Normandía', pt: 'Normandia', de: 'Normandie', nl: 'Normandië' },
        julyTemp: 18,
        tag: { en: 'Cotentin peninsula · ferry port · 18°C', fr: 'Péninsule du Cotentin · port ferry · 18°C', es: 'Península de Cotentin · puerto ferry · 18°C', pt: 'Península de Cotentin · porto de ferry · 18°C', de: 'Halbinsel Cotentin · Fährhafen · 18°C', nl: 'Schiereiland Cotentin · veerhaven · 18°C' },
        why: {
          en: 'Cherbourg sits at the northernmost tip of Normandy, battered by Atlantic winds that keep July at 18°C. The Cité de la Mer covers the former transatlantic liner terminal and the surrounding dock is a 2 km off-lead dog walk. Cap de la Hague (30 km west) is the most dramatic headland in northern France: cliff paths off-lead, no restrictions, wild and deserted. The bocage and hedgerow country of the Cotentin is perfect cycling territory with dogs. Beaches on both sides of the peninsula accept dogs year-round.',
          fr: "Cherbourg est à la pointe nord de la Normandie, balayée par les vents atlantiques qui maintiennent juillet à 18°C. La Cité de la Mer occupe l'ancienne gare maritime des paquebots transatlantiques et le quai environnant est une promenade sans laisse de 2 km. Le Cap de la Hague (30 km à l'ouest) est le cap le plus spectaculaire du nord de la France : sentiers de falaises sans laisse, aucune restriction, sauvage et désert.",
          es: 'Cherburgo se encuentra en el extremo norte de Normandía, azotada por vientos atlánticos que mantienen julio a 18°C. La Cité de la Mer ocupa la antigua terminal de transatlánticos y el muelle circundante es un paseo sin correa de 2 km. El Cabo de la Hague (30 km al oeste) es el cabo más espectacular del norte de Francia: senderos de acantilados sin correa.',
          pt: 'Cherburgo fica na ponta mais a norte da Normandia, varrida por ventos atlânticos que mantêm julho a 18°C. A Cité de la Mer ocupa o antigo terminal de navios transatlânticos e o cais envolvente é um passeio sem trela de 2 km. O Cabo de la Hague (30 km a oeste) é o cabo mais espetacular do norte de França: trilhos de falésia sem trela.',
          de: 'Cherbourg liegt an der nördlichsten Spitze der Normandie, umtost von Atlantikwinden, die den Juli bei 18°C halten. Die Cité de la Mer belegt das ehemalige Terminal der Transatlantikliner, und der umliegende Kai ist ein 2 km langer Hundespaziergang ohne Leine. Das Cap de la Hague (30 km westlich) ist die eindrucksvollste Landzunge Nordfrankreichs: Klippenwege ohne Leine, keine Einschränkungen, wild und menschenleer. Die Bocage- und Heckenlandschaft des Cotentin ist perfektes Radgebiet mit Hund. Strände auf beiden Seiten der Halbinsel akzeptieren Hunde das ganze Jahr über.', nl: 'Cherbourg ligt aan de meest noordelijke punt van Normandië, geteisterd door Atlantische wind die juli op 18°C houdt. De Cité de la Mer neemt de voormalige terminal van de transatlantische lijnschepen in beslag, en de omliggende kade is een 2 km lange aanlijnvrije hondenwandeling. Cap de la Hague (30 km westelijker) is de meest indrukwekkende landtong van Noord-Frankrijk: klippenpaden zonder lijn, geen beperkingen, ruig en verlaten. Het bocage- en heggenlandschap van het Cotentin is perfect fietsgebied met hond. Stranden aan beide kanten van het schiereiland accepteren honden het hele jaar door.',
        },
        dogTip: {
          en: 'Cap de la Hague, Nez de Jobourg: the most westerly point of Normandy, 128m cliffs, sheep and seabirds, dogs off-lead the full 6 km coastal loop, almost always deserted.',
          fr: 'Cap de la Hague, Nez de Jobourg : le point le plus à l\'ouest de Normandie, falaises de 128m, moutons et oiseaux de mer, chiens sans laisse sur tout le circuit côtier de 6 km, presque toujours désert.',
          es: 'Cabo de la Hague, Nez de Jobourg: el punto más occidental de Normandía, acantilados de 128m, ovejas y aves marinas, perros sin correa en todo el circuito costero de 6 km, casi siempre desierto.',
          pt: 'Cabo de la Hague, Nez de Jobourg: o ponto mais ocidental da Normandia, falésias de 128m, ovelhas e aves marinhas, cães sem trela em todo o circuito costeiro de 6 km, quase sempre deserto.',
          de: 'Cap de la Hague, Nez de Jobourg: der westlichste Punkt der Normandie, 128 m hohe Klippen, Schafe und Seevögel, Hunde ohne Leine auf der gesamten 6 km langen Küstenrunde, fast immer menschenleer.', nl: 'Cap de la Hague, Nez de Jobourg: het meest westelijke punt van Normandië, 128 m hoge kliffen, schapen en zeevogels, honden mogen los op de hele 6 km lange kustroute, bijna altijd verlaten.',
        },
        hotels: [
          {
            name: 'Mercure Cherbourg',
            stars: 4,
            note: { en: 'Harbour-front hotel facing the marina, modern rooms, pets accepted up to 15 kg.', fr: 'Hôtel en bord de port face à la marina, chambres modernes, animaux acceptés jusqu\'à 15 kg.', es: 'Hotel frente al puerto y la marina, habitaciones modernas, mascotas aceptadas hasta 15 kg.', pt: 'Hotel à beira do porto em frente à marina, quartos modernos, animais aceites até 15 kg.', de: 'Hotel direkt am Hafen gegenüber der Marina, moderne Zimmer, Haustiere bis 15 kg akzeptiert.', nl: 'Hotel aan de haven tegenover de jachthaven, moderne kamers, huisdieren tot 15 kg geaccepteerd.' },
          },
          {
            name: 'La Renaissance',
            stars: 3,
            note: { en: 'Central hotel with good restaurant, walking distance to the port and Cité de la Mer, dogs welcome.', fr: 'Hôtel central avec bon restaurant, à pied du port et de la Cité de la Mer, chiens bienvenus.', es: 'Hotel central con buen restaurante, a pie del puerto y la Cité de la Mer, perros bienvenidos.', pt: 'Hotel central com bom restaurante, a pé do porto e da Cité de la Mer, cães bem-vindos.', de: 'Zentrales Hotel mit gutem Restaurant, zu Fuß erreichbar vom Hafen und der Cité de la Mer, Hunde willkommen.', nl: 'Centraal hotel met goed restaurant, op loopafstand van de haven en de Cité de la Mer, honden welkom.' },
          },
          {
            name: 'Hôtel de la Plage (Barneville-Carteret)',
            stars: 3,
            note: { en: '25 min south of Cherbourg, directly on a dog-friendly beach, ideal base for Cotentin coast.', fr: '25 min au sud de Cherbourg, directement sur une plage dog-friendly, base idéale pour la côte du Cotentin.', es: 'A 25 min al sur de Cherburgo, directamente en una playa dog-friendly, base ideal para la costa del Cotentin.', pt: '25 min a sul de Cherburgo, diretamente numa praia dog-friendly, base ideal para a costa do Cotentin.', de: '25 Min. südlich von Cherbourg, direkt an einem hundefreundlichen Strand, idealer Ausgangspunkt für die Küste des Cotentin.', nl: '25 min ten zuiden van Cherbourg, direct aan een hondvriendelijk strand, ideale uitvalsbasis voor de kust van het Cotentin.' },
          },
        ],
      },
      {
        slug: 'honfleur',
        name: 'Honfleur',
        region: { en: 'Normandy', fr: 'Normandie', es: 'Normandía', pt: 'Normandia', de: 'Normandie', nl: 'Normandië' },
        julyTemp: 21,
        tag: { en: 'Impressionist harbour · Seine estuary', fr: 'Port impressionniste · estuaire de la Seine', es: 'Puerto impresionista · estuario del Sena', pt: 'Porto impressionista · estuário do Sena', de: 'Impressionistischer Hafen · Seine-Mündung', nl: 'Impressionistische haven · monding van de Seine' },
        why: {
          en: 'Honfleur is the most consistently dog-friendly town in Normandy. The Vieux Bassin (old harbour) restaurants all accept dogs on terrace, it is the local norm. The Côte de Grâce cliff path above the town is off-lead (5 km, panoramic Seine estuary views). The Côte Fleurie beach access (Deauville, Trouville, 20 min east) allows dogs before 9am and after 7pm in season. The Marais Vernier wetland reserve (30 min south) has 30 km of dyke paths, entirely off-lead.',
          fr: "Honfleur est la ville normande la plus constamment dog-friendly. Les restaurants du Vieux Bassin acceptent tous les chiens en terrasse, c'est la norme locale. Le sentier de la Côte de Grâce au-dessus de la ville est sans laisse (5 km, vue panoramique sur l'estuaire de la Seine). L'accès aux plages de la Côte Fleurie (Deauville, Trouville, 20 min à l'est) permet les chiens avant 9h et après 19h en saison.",
          es: 'Honfleur es la ciudad normanda más constantemente dog-friendly. Los restaurantes del Vieux Bassin aceptan todos los perros en terraza, es la norma local. El sendero de la Côte de Grâce sobre la ciudad es sin correa (5 km, vistas panorámicas sobre el estuario del Sena).',
          pt: 'Honfleur é a cidade normanda mais consistentemente dog-friendly. Os restaurantes do Vieux Bassin aceitam todos os cães em esplanada, é a norma local. O trilho da Côte de Grâce acima da cidade é sem trela (5 km, vistas panorâmicas sobre o estuário do Sena).',
          de: 'Honfleur ist die durchweg hundefreundlichste Stadt der Normandie. Die Restaurants am Vieux Bassin (alter Hafen) akzeptieren alle Hunde auf der Terrasse, das ist hier die Norm. Der Klippenweg der Côte de Grâce oberhalb der Stadt ist ohne Leine begehbar (5 km, Panoramablick auf die Seine-Mündung). Der Strandzugang der Côte Fleurie (Deauville, Trouville, 20 Min. östlich) erlaubt Hunde in der Saison vor 9 Uhr und nach 19 Uhr. Das Feuchtgebiet Marais Vernier (30 Min. südlich) verfügt über 30 km Deichwege, vollständig ohne Leine.', nl: 'Honfleur is het meest consequent hondvriendelijke stadje van Normandië. De restaurants aan het Vieux Bassin (oude haven) accepteren stuk voor stuk honden op het terras, het is hier de norm. Het klippenpad van de Côte de Grâce boven het stadje is aanlijnvrij (5 km, panoramisch uitzicht over de monding van de Seine). Bij de stranden van de Côte Fleurie (Deauville, Trouville, 20 min oostelijker) mogen honden in het seizoen vóór 9 uur en na 19 uur. Het waterrijke natuurgebied Marais Vernier (30 min zuidelijker) heeft 30 km dijkpaden, helemaal aanlijnvrij.',
        },
        dogTip: {
          en: 'Marais Vernier nature reserve: drive 30 min south to this vast wetland, park at La Chapelle-Saint-Ouen, walk 15 km of dyke paths through apple orchards and marsh, off-lead, horses and Highland cattle but no specific dog restrictions.',
          fr: "Réserve naturelle du Marais Vernier : 30 min au sud en voiture, garez-vous à La Chapelle-Saint-Ouen, parcourez 15 km de chemins de digues à travers vergers de pommiers et marais, sans laisse, chevaux et vaches Highlands mais aucune restriction spécifique pour les chiens.",
          es: 'Reserva natural del Marais Vernier: 30 min al sur en coche, aparca en La Chapelle-Saint-Ouen, recorre 15 km de caminos de diques entre huertos de manzanos y marismas, sin correa.',
          pt: 'Reserva natural do Marais Vernier: 30 min a sul de carro, estacionar em La Chapelle-Saint-Ouen, percorrer 15 km de caminhos de diques entre pomares e pântanos, sem trela.',
          de: 'Naturschutzgebiet Marais Vernier: 30 Min. südlich mit dem Auto zu diesem weiten Feuchtgebiet, parken bei La Chapelle-Saint-Ouen, 15 km Deichwege durch Apfelplantagen und Sumpfland, ohne Leine, Pferde und Highland-Rinder, aber keine speziellen Einschränkungen für Hunde.', nl: 'Natuurgebied Marais Vernier: rijd 30 min zuidwaarts naar dit uitgestrekte waterrijke gebied, parkeer bij La Chapelle-Saint-Ouen, loop 15 km dijkpaden door appelboomgaarden en moeras, aanlijnvrij, paarden en Schotse hooglanders maar geen specifieke beperkingen voor honden.',
        },
        hotels: [
          {
            name: 'La Ferme Saint-Siméon',
            stars: 5,
            note: { en: 'Legendary Relais & Châteaux where the Impressionists painted, orchard and gardens, small pets accepted.', fr: 'Légendaire Relais & Châteaux où peignaient les Impressionnistes, verger et jardins, petits animaux acceptés.', es: 'Legendario Relais & Châteaux donde pintaban los Impresionistas, huerto y jardines, mascotas pequeñas aceptadas.', pt: 'Lendário Relais & Châteaux onde os Impressionistas pintavam, pomar e jardins, animais pequenos aceites.', de: 'Legendäres Relais & Châteaux, wo die Impressionisten malten, Obstgarten und Gärten, kleine Haustiere akzeptiert.', nl: 'Legendarisch Relais & Châteaux waar de impressionisten schilderden, boomgaard en tuinen, kleine huisdieren geaccepteerd.' },
          },
          {
            name: 'Le Manoir des Impressionnistes',
            stars: 4,
            note: { en: 'Belle Époque villa above the harbour with sea views, large garden, dogs welcome up to 20 kg.', fr: 'Villa Belle Époque au-dessus du port avec vue mer, grand jardin, chiens bienvenus jusqu\'à 20 kg.', es: 'Villa Belle Époque sobre el puerto con vistas al mar, gran jardín, perros bienvenidos hasta 20 kg.', pt: 'Vila Belle Époque acima do porto com vistas para o mar, grande jardim, cães bem-vindos até 20 kg.', de: 'Belle-Époque-Villa oberhalb des Hafens mit Meerblick, großer Garten, Hunde bis 20 kg willkommen.', nl: 'Belle Époque-villa boven de haven met zeezicht, grote tuin, honden tot 20 kg welkom.' },
          },
          {
            name: 'Hôtel Le Cheval Blanc',
            stars: 4,
            note: { en: 'Historic harbour-front hotel in the heart of the Vieux Bassin, dog-friendly rooms available.', fr: 'Hôtel historique en bord de port au coeur du Vieux Bassin, chambres dog-friendly disponibles.', es: 'Hotel histórico frente al puerto en el corazón del Vieux Bassin, habitaciones dog-friendly disponibles.', pt: 'Hotel histórico à beira do porto no coração do Vieux Bassin, quartos dog-friendly disponíveis.', de: 'Historisches Hotel direkt am Hafen im Herzen des Vieux Bassin, hundefreundliche Zimmer verfügbar.', nl: 'Historisch hotel aan de haven in het hart van het Vieux Bassin, hondvriendelijke kamers beschikbaar.' },
          },
        ],
      },
    ],
  },
  {
    id: 'alsace',
    emoji: '🍷',
    title: { en: 'Alsace', fr: 'Alsace', es: 'Alsacia', pt: 'Alsácia', de: 'Elsass', nl: 'de Elzas' },
    cities: [
      {
        slug: 'strasbourg',
        name: 'Strasbourg',
        region: { en: 'Alsace', fr: 'Alsace', es: 'Alsacia', pt: 'Alsácia', de: 'Elsass', nl: 'de Elzas' },
        julyTemp: 24,
        tag: { en: 'European capital · canals · wine route', fr: 'Capitale européenne · canaux · route des vins', es: 'Capital europea · canales · ruta del vino', pt: 'Capital europeia · canais · rota dos vinhos', de: 'Europäische Hauptstadt · Kanäle · Weinstraße', nl: 'Europese hoofdstad · kanalen · wijnroute' },
        why: {
          en: 'Strasbourg has a strong dog culture shaped by its German-French dual identity. The Rhine riverbanks (Île du Rhin, 3 km) are entirely off-lead. Petite France (the half-timbered canal quarter, UNESCO) is pedestrianised and dogs roam freely. The European institutions quarter has 8 km of park paths, off-lead. The Alsace wine route begins at Barr (30 km south): vineyard trails at 250-350m, winstub terraces all accept dogs, consistently cooler than the Rhine plain.',
          fr: "Strasbourg a une forte culture canine forgée par sa double identité franco-allemande. Les berges du Rhin (Île du Rhin, 3 km) sont entièrement sans laisse. La Petite France (le quartier de colombages et de canaux, UNESCO) est piétonne et les chiens y circulent librement. Le quartier des institutions européennes a 8 km de chemins de parc, sans laisse. La route des vins d'Alsace commence à Barr (30 km au sud) : sentiers de vignobles à 250-350m, winstubs avec terrasses qui acceptent tous les chiens.",
          es: 'Estrasburgo tiene una fuerte cultura canina forjada por su doble identidad franco-alemana. Las orillas del Rin (Île du Rhin, 3 km) son totalmente sin correa. La Petite France (el barrio de entramados y canales, UNESCO) es peatonal y los perros circulan libremente. El barrio de las instituciones europeas tiene 8 km de caminos de parque, sin correa.',
          pt: 'Estrasburgo tem uma forte cultura canina moldada pela sua dupla identidade franco-alemã. As margens do Reno (Île du Rhin, 3 km) são totalmente sem trela. A Petite France (o bairro de casas de enxaimel e canais, UNESCO) é pedonal e os cães circulam livremente.',
          de: 'Straßburg hat eine ausgeprägte Hundekultur, geprägt von seiner deutsch-französischen Doppelidentität. Die Rheinufer (Île du Rhin, 3 km) sind vollständig ohne Leine begehbar. Die Petite France (das Fachwerk- und Kanalviertel, UNESCO) ist Fußgängerzone, Hunde bewegen sich frei. Das Europaviertel bietet 8 km Parkwege ohne Leine. Die elsässische Weinstraße beginnt in Barr (30 km südlich): Weinbergpfade auf 250 bis 350 m Höhe, Winstub-Terrassen akzeptieren durchweg Hunde, beständig kühler als die Rheinebene.', nl: 'Straatsburg heeft een sterke hondencultuur, gevormd door zijn Duits-Franse dubbele identiteit. De oevers van de Rijn (Île du Rhin, 3 km) zijn helemaal aanlijnvrij. Petite France (de vakwerk- en kanalenwijk, UNESCO) is autovrij en honden lopen er vrij rond. De wijk van de Europese instellingen heeft 8 km parkpaden, aanlijnvrij. De Elzasser wijnroute begint bij Barr (30 km zuidelijker): wijngaardpaden op 250 tot 350 m hoogte, winstub-terrassen accepteren allemaal honden, en het is er steevast koeler dan op de Rijnvlakte.',
        },
        dogTip: {
          en: 'Barr and Andlau on the wine route (30 min south): vineyard loops at 280m, off-lead on the marked trails between the grands crus, winstubs accept dogs on terrace, 5°C cooler than central Strasbourg.',
          fr: 'Barr et Andlau sur la route des vins (30 min au sud) : boucles de vignobles à 280m, sans laisse sur les sentiers balisés entre les grands crus, winstubs qui acceptent les chiens en terrasse, 5°C plus frais que le centre de Strasbourg.',
          es: 'Barr y Andlau en la ruta del vino (30 min al sur): circuitos de viñedos a 280m, sin correa en los senderos marcados entre los grands crus, winstubs que aceptan perros en terraza, 5°C más fresco que el centro de Estrasburgo.',
          pt: 'Barr e Andlau na rota dos vinhos (30 min a sul): circuitos de vinha a 280m, sem trela nos trilhos marcados entre os grands crus, winstubs que aceitam cães em esplanada, 5°C mais fresco do que o centro de Estrasburgo.',
          de: 'Barr und Andlau an der Weinstraße (30 Min. südlich): Weinbergrunden auf 280 m, ohne Leine auf den markierten Pfaden zwischen den Grands Crus, Winstuben akzeptieren Hunde auf der Terrasse, 5°C kühler als das Zentrum von Straßburg.', nl: 'Barr en Andlau op de wijnroute (30 min zuidelijker): wijngaardrondjes op 280 m, aanlijnvrij op de gemarkeerde paden tussen de grands crus, winstubs accepteren honden op het terras, 5°C koeler dan het centrum van Straatsburg.',
        },
        hotels: [
          {
            name: 'Régent Petite France',
            stars: 5,
            note: { en: 'Converted ice factory in the heart of Petite France, canal views, small pets accepted.', fr: 'Ancienne glacière convertie au coeur de la Petite France, vue sur les canaux, petits animaux acceptés.', es: 'Antigua fábrica de hielo convertida en el corazón de la Petite France, vistas a los canales, mascotas pequeñas aceptadas.', pt: 'Antiga fábrica de gelo convertida no coração da Petite France, vistas para os canais, animais pequenos aceites.', de: 'Umgebaute Eisfabrik im Herzen der Petite France, Kanalblick, kleine Haustiere akzeptiert.', nl: 'Omgebouwde ijsfabriek in het hart van Petite France, uitzicht op de kanalen, kleine huisdieren geaccepteerd.' },
          },
          {
            name: 'Hôtel Beaucour',
            stars: 4,
            note: { en: 'Boutique hotel in a half-timbered house near Petite France, quiet courtyard, dogs up to 15 kg welcome.', fr: 'Hôtel boutique dans une maison à colombages près de la Petite France, cour calme, chiens jusqu\'à 15 kg bienvenus.', es: 'Hotel boutique en una casa de entramado cerca de la Petite France, patio tranquilo, perros hasta 15 kg bienvenidos.', pt: 'Hotel boutique numa casa de enxaimel perto da Petite France, pátio tranquilo, cães até 15 kg bem-vindos.', de: 'Boutique-Hotel in einem Fachwerkhaus nahe der Petite France, ruhiger Innenhof, Hunde bis 15 kg willkommen.', nl: 'Boutique hotel in een vakwerkhuis bij Petite France, rustige binnenplaats, honden tot 15 kg welkom.' },
          },
          {
            name: 'Hôtel Cardinal de Rohan',
            stars: 4,
            note: { en: 'Steps from the cathedral, central location, dog-friendly policy on most room types.', fr: 'À deux pas de la cathédrale, emplacement central, politique dog-friendly sur la plupart des types de chambres.', es: 'A dos pasos de la catedral, ubicación central, política dog-friendly en la mayoría de tipos de habitación.', pt: 'A dois passos da catedral, localização central, política dog-friendly na maioria dos tipos de quarto.', de: 'Nur wenige Schritte von der Kathedrale, zentrale Lage, hundefreundliche Richtlinie für die meisten Zimmertypen.', nl: 'Op een steenworp afstand van de kathedraal, centrale ligging, hondvriendelijk beleid voor de meeste kamertypes.' },
          },
        ],
      },
    ],
  },
  {
    id: 'alpes',
    emoji: '🏔️',
    title: { en: 'French Alps', fr: 'Alpes françaises', es: 'Alpes franceses', pt: 'Alpes franceses', de: 'Französische Alpen', nl: 'Franse Alpen' },
    cities: [
      {
        slug: 'annecy',
        name: 'Annecy',
        region: { en: 'French Alps', fr: 'Alpes françaises', es: 'Alpes franceses', pt: 'Alpes franceses', de: 'Französische Alpen', nl: 'Franse Alpen' },
        julyTemp: 25,
        tag: { en: 'Venice of the Alps · clearest lake in Europe', fr: "Venise des Alpes · lac le plus pur d'Europe", es: 'Venecia de los Alpes · lago más limpio de Europa', pt: 'Veneza dos Alpes · lago mais puro da Europa', de: 'Venedig der Alpen · klarster See Europas', nl: 'Venetië van de Alpen · helderste meer van Europa' },
        why: {
          en: 'Annecy sits at 448m at the foot of the Aravis and Bauges massifs, 7°C cooler than Lyon 130 km north in July. Lake Annecy is officially the cleanest lake in Europe. The full lake loop (41 km) by bike or foot accepts dogs its entire length. The Champ-de-Mars park (lakeside, 3 ha) is off-lead. Dogs can board pedal boats on the lake. The Col de la Forclaz (1,150m, 30 min by car) has paragliding, hiking, and off-lead trails with views over the entire lake.',
          fr: "Annecy est à 448m au pied des massifs des Aravis et des Bauges, 7°C plus frais que Lyon 130 km au nord en juillet. Le lac d'Annecy est officiellement le lac le plus pur d'Europe. Le tour complet du lac (41 km) à vélo ou à pied accepte les chiens sur toute sa longueur. Le Champ-de-Mars (bord du lac, 3 ha) est sans laisse. Les chiens peuvent embarquer sur les pédalos du lac. Le Col de la Forclaz (1 150m, 30 min en voiture) offre parapente, randonnée et sentiers sans laisse avec vue sur tout le lac.",
          es: 'Annecy está a 448m al pie de los macizos de Aravis y Bauges, 7°C más fresco que Lyon a 130 km al norte en julio. El lago de Annecy es oficialmente el lago más limpio de Europa. El circuito completo del lago (41 km) en bici o a pie acepta perros en toda su longitud. El Col de la Forclaz (1.150m, 30 min en coche) tiene parapente, senderismo y senderos sin correa con vistas a todo el lago.',
          pt: 'Annecy fica a 448m ao pé dos maciços dos Aravis e Bauges, 7°C mais fresca do que Lyon a 130 km a norte em julho. O lago de Annecy é oficialmente o lago mais puro da Europa. O circuito completo do lago (41 km) de bicicleta ou a pé aceita cães em toda a sua extensão. O Col de la Forclaz (1.150m, 30 min de carro) tem parapente, caminhadas e trilhos sem trela com vistas para todo o lago.',
          de: `Annecy liegt auf 448 m am Fuß der Massive der Aravis und der Bauges, im Juli 7°C kühler als Lyon 130 km nördlich. Der Lac d'Annecy gilt offiziell als sauberster See Europas. Die komplette Seerunde (41 km) mit Rad oder zu Fuß akzeptiert Hunde auf ihrer gesamten Länge. Der Champ-de-Mars-Park (am Seeufer, 3 ha) ist ohne Leine. Hunde dürfen mit auf die Tretboote des Sees. Der Col de la Forclaz (1.150 m, 30 Min. mit dem Auto) bietet Paragliding, Wandern und leinenfreie Wege mit Blick über den gesamten See.`, nl: 'Annecy ligt op 448 m aan de voet van de massieven van de Aravis en de Bauges, in juli 7°C koeler dan Lyon 130 km noordelijker. Het meer van Annecy geldt officieel als het schoonste meer van Europa. De volledige rondweg om het meer (41 km) per fiets of te voet accepteert honden over de hele lengte. Het Champ-de-Mars-park (aan het meer, 3 ha) is aanlijnvrij. Honden mogen mee op de waterfietsen op het meer. De Col de la Forclaz (1.150 m, 30 min met de auto) biedt paragliding, wandelen en aanlijnvrije paden met uitzicht over het hele meer.',
        },
        dogTip: {
          en: 'Réserve Naturelle du Bout du Lac (south end of the lake): 340 ha of wetland, off-lead on the marked trails, kingfishers, herons, rare orchids, swimming spots for dogs at the lake edge.',
          fr: "Réserve Naturelle du Bout du Lac (extrémité sud du lac) : 340 ha de zones humides, sans laisse sur les sentiers balisés, martins-pêcheurs, hérons, orchidées rares, baignades pour les chiens en bord de lac.",
          es: 'Reserva Natural del Bout du Lac (extremo sur del lago): 340 ha de humedales, sin correa en los senderos marcados, martines pescadores, garzas, orquídeas raras, zonas de baño para los perros en la orilla del lago.',
          pt: 'Reserva Natural do Bout du Lac (extremo sul do lago): 340 ha de zonas húmidas, sem trela nos trilhos marcados, martins-pescadores, garças, orquídeas raras, locais de banho para os cães na margem do lago.',
          de: 'Naturschutzgebiet Bout du Lac (Südende des Sees): 340 ha Feuchtgebiet, ohne Leine auf den markierten Wegen, Eisvögel, Reiher, seltene Orchideen, Badestellen für Hunde am Seeufer.', nl: 'Natuurreservaat Bout du Lac (zuidkant van het meer): 340 ha waterrijk gebied, aanlijnvrij op de gemarkeerde paden, ijsvogels, reigers, zeldzame orchideeën, zwemplekken voor honden aan de rand van het meer.',
        },
        hotels: [
          {
            name: 'Impérial Palace',
            stars: 5,
            note: { en: 'Grand lakeside hotel with private garden and beach, small pets accepted.', fr: 'Grand hôtel en bord de lac avec jardin et plage privés, petits animaux acceptés.', es: 'Gran hotel junto al lago con jardín y playa privados, mascotas pequeñas aceptadas.', pt: 'Grande hotel à beira do lago com jardim e praia privados, animais pequenos aceites.', de: 'Großes Hotel am See mit privatem Garten und Strand, kleine Haustiere akzeptiert.', nl: 'Groot hotel aan het meer met eigen tuin en strand, kleine huisdieren geaccepteerd.' },
          },
          {
            name: 'Hôtel du Palais de l\'Isle',
            stars: 4,
            note: { en: 'Boutique hotel in the old town, 2 min walk to the lake and Champ-de-Mars, dogs welcome.', fr: 'Hôtel boutique dans la vieille ville, 2 min à pied du lac et du Champ-de-Mars, chiens bienvenus.', es: 'Hotel boutique en el casco antiguo, a 2 min del lago y el Champ-de-Mars, perros bienvenidos.', pt: 'Hotel boutique na cidade velha, 2 min a pé do lago e do Champ-de-Mars, cães bem-vindos.', de: 'Boutique-Hotel in der Altstadt, 2 Min. zu Fuß vom See und vom Champ-de-Mars, Hunde willkommen.', nl: 'Boutique hotel in de oude stad, 2 min lopen van het meer en het Champ-de-Mars, honden welkom.' },
          },
          {
            name: 'Splendid Hôtel',
            stars: 4,
            note: { en: 'Classic hotel overlooking the lake, close to the market, dog-friendly rooms on lower floors.', fr: 'Hôtel classique dominant le lac, proche du marché, chambres dog-friendly aux étages inférieurs.', es: 'Hotel clásico con vistas al lago, cerca del mercado, habitaciones dog-friendly en plantas bajas.', pt: 'Hotel clássico com vista para o lago, perto do mercado, quartos dog-friendly nos andares inferiores.', de: 'Klassisches Hotel mit Blick auf den See, nahe dem Markt, hundefreundliche Zimmer in den unteren Etagen.', nl: 'Klassiek hotel met uitzicht op het meer, dicht bij de markt, hondvriendelijke kamers op de lagere verdiepingen.' },
          },
        ],
      },
    ],
  },
  {
    id: 'cote-basque',
    emoji: '🌊',
    title: { en: 'French Basque Coast', fr: 'Côte basque française', es: 'Costa vasca francesa', pt: 'Costa basca francesa', de: 'Französische Baskenküste', nl: 'Franse Baskische kust' },
    cities: [
      {
        slug: 'bayonne',
        name: 'Bayonne',
        region: { en: 'French Basque Country', fr: 'Pays basque français', es: 'País Vasco francés', pt: 'País Basco francês', de: 'Französisches Baskenland', nl: 'Frans Baskenland' },
        julyTemp: 25,
        tag: { en: 'Basque capital · chocolate · Nive river', fr: 'Capitale basque · chocolat · rivière Nive', es: 'Capital vasca · chocolate · río Nive', pt: 'Capital basca · chocolate · rio Nive', de: 'Baskische Hauptstadt · Schokolade · Fluss Nive', nl: 'Baskische hoofdstad · chocolade · rivier de Nive' },
        why: {
          en: 'Bayonne is the inland counterpart to Biarritz, 8 km from the ocean but protected from the worst of the Atlantic spray. July average of 25°C, with the Nive and Adour rivers providing natural cooling. The Nive riverbanks within the city are pedestrian and off-lead for 4 km. The Grand Bayonne medieval quarter restaurants accept dogs uniformly on terrace. The Landes forest (north) begins 20 km away: 100,000 ha of flat pine forest, almost entirely off-lead, the largest dog hiking terrain in western Europe.',
          fr: "Bayonne est le pendant intérieur de Biarritz, à 8 km de l'océan mais protégée du pire des embruns atlantiques. Moyenne de 25°C en juillet, avec la Nive et l'Adour qui rafraîchissent naturellement. Les berges de la Nive dans la ville sont piétonnes et sans laisse sur 4 km. Les restaurants du quartier médiéval du Grand Bayonne acceptent les chiens en terrasse sans exception. La forêt des Landes (au nord) commence à 20 km : 100 000 ha de forêt de pins, presque entièrement sans laisse.",
          es: 'Bayona es el contrapunto interior de Biarritz, a 8 km del océano pero protegida de lo peor de los aerosoles atlánticos. Media de 25°C en julio, con el Nive y el Adur que refrigeran naturalmente. Las orillas del Nive en la ciudad son peatonales y sin correa durante 4 km. Los restaurantes del barrio medieval del Grand Bayonne aceptan perros en terraza sin excepción.',
          pt: 'Bayonne é o contraponto interior de Biarritz, a 8 km do oceano mas protegida do pior dos borrifos atlânticos. Média de 25°C em julho, com o Nive e o Adour a refrescar naturalmente. As margens do Nive na cidade são pedonais e sem trela durante 4 km. Os restaurantes do bairro medieval do Grand Bayonne aceitam cães em esplanada sem exceção.',
          de: 'Bayonne ist das Gegenstück zu Biarritz im Landesinneren, 8 km vom Ozean entfernt, aber vor der ärgsten Atlantikgischt geschützt. Julidurchschnitt von 25°C, mit den Flüssen Nive und Adour, die auf natürliche Weise kühlen. Die Uferpromenaden der Nive in der Stadt sind Fußgängerzone und 4 km lang ohne Leine. Die Restaurants im mittelalterlichen Viertel Grand Bayonne akzeptieren Hunde auf der Terrasse durchweg. Der Wald der Landes (nördlich) beginnt 20 km entfernt: 100.000 ha flacher Kiefernwald, fast vollständig ohne Leine, das größte Hundewandergebiet Westeuropas.', nl: 'Bayonne is de tegenhanger van Biarritz in het binnenland, 8 km van de oceaan maar beschermd tegen het ergste van de Atlantische zeewind. Gemiddeld 25°C in juli, met de rivieren de Nive en de Adour die op natuurlijke wijze verkoeling brengen. De oevers van de Nive binnen de stad zijn voetgangersgebied en 4 km lang aanlijnvrij. De restaurants in de middeleeuwse wijk Grand Bayonne accepteren zonder uitzondering honden op het terras. Het bos van de Landes (noordelijker) begint 20 km verderop: 100.000 ha vlak dennenbos, vrijwel helemaal aanlijnvrij, het grootste hondenwandelgebied van West-Europa.',
        },
        dogTip: {
          en: 'Landes forest from Hossegor (30 min north): the GR8 long-distance trail runs 80 km through flat pine forest, entirely off-lead, streams to swim in, no altitude gain, ideal for large dogs in heat.',
          fr: "Forêt des Landes depuis Hossegor (30 min au nord) : le GR8 court sur 80 km à travers la forêt de pins plate, entièrement sans laisse, ruisseaux pour se baigner, aucun dénivelé, idéal pour les grands chiens par la chaleur.",
          es: 'Bosque de las Landas desde Hossegor (30 min al norte): el GR8 recorre 80 km por el bosque de pinos llano, totalmente sin correa, arroyos para bañarse, sin desnivel, ideal para perros grandes con calor.',
          pt: 'Floresta das Landes desde Hossegor (30 min a norte): o GR8 percorre 80 km pela floresta de pinheiros plana, totalmente sem trela, riachos para nadar, sem desnível, ideal para cães grandes com calor.',
          de: 'Wald der Landes ab Hossegor (30 Min. nördlich): der Fernwanderweg GR8 verläuft 80 km durch flachen Kiefernwald, vollständig ohne Leine, Bäche zum Baden, keine Höhenunterschiede, ideal für große Hunde bei Hitze.', nl: 'Bos van de Landes vanaf Hossegor (30 min noordelijker): de lange-afstandsroute GR8 loopt 80 km door vlak dennenbos, helemaal aanlijnvrij, beekjes om in te zwemmen, geen hoogteverschil, ideaal voor grote honden bij hitte.',
        },
        hotels: [
          {
            name: 'Grand Hôtel Bayonne',
            stars: 4,
            note: { en: 'Historic hotel in the city centre facing the Nive river, pets accepted up to 15 kg.', fr: 'Hôtel historique en centre-ville face à la Nive, animaux acceptés jusqu\'à 15 kg.', es: 'Hotel histórico en el centro de la ciudad frente al río Nive, mascotas aceptadas hasta 15 kg.', pt: 'Hotel histórico no centro da cidade em frente ao rio Nive, animais aceites até 15 kg.', de: 'Historisches Hotel im Stadtzentrum gegenüber dem Fluss Nive, Haustiere bis 15 kg akzeptiert.', nl: 'Historisch hotel in het centrum tegenover de rivier de Nive, huisdieren tot 15 kg geaccepteerd.' },
          },
          {
            name: 'Mercure Bayonne Centre',
            stars: 4,
            note: { en: 'Modern hotel near the old town, 10 min walk to the Nive promenade, dogs welcome.', fr: 'Hôtel moderne près de la vieille ville, 10 min à pied de la promenade de la Nive, chiens bienvenus.', es: 'Hotel moderno cerca del casco antiguo, a 10 min a pie del paseo del Nive, perros bienvenidos.', pt: 'Hotel moderno perto da cidade velha, 10 min a pé do passeio do Nive, cães bem-vindos.', de: 'Modernes Hotel nahe der Altstadt, 10 Min. zu Fuß von der Nive-Promenade, Hunde willkommen.', nl: 'Modern hotel bij de oude stad, 10 min lopen van de promenade langs de Nive, honden welkom.' },
          },
          {
            name: 'Hôtel des Basses Pyrénées',
            stars: 4,
            note: { en: 'Charming boutique hotel in the historic centre, dog-friendly rooms, ideal Landes forest base.', fr: 'Charmant hôtel boutique dans le centre historique, chambres dog-friendly, base idéale pour la forêt des Landes.', es: 'Encantador hotel boutique en el centro histórico, habitaciones dog-friendly, base ideal para el bosque de las Landas.', pt: 'Encantador hotel boutique no centro histórico, quartos dog-friendly, base ideal para a floresta das Landes.', de: 'Charmantes Boutique-Hotel im historischen Zentrum, hundefreundliche Zimmer, idealer Ausgangspunkt für den Wald der Landes.', nl: 'Charmant boutique hotel in het historische centrum, hondvriendelijke kamers, ideale uitvalsbasis voor het bos van de Landes.' },
          },
        ],
      },
    ],
  },
]

const T = {
  title: {
    en: 'Best Cities to Escape the Heat in France with Your Dog (2026)',
    fr: 'Meilleures villes pour éviter la chaleur en France avec son chien (2026)',
    es: 'Mejores ciudades para evitar el calor en Francia con tu perro (2026)',
    pt: 'Melhores cidades para evitar o calor em França com o seu cão (2026)',
    de: 'Die besten Städte, um mit Ihrem Hund der Hitze in Frankreich zu entkommen (2026)', nl: 'De beste steden om met je hond de hitte in Frankrijk te ontvluchten (2026)',
  },
  metaTitle: {
    en: 'Cool France with Your Dog: 7 Cities Under 25°C in July (2026)',
    fr: 'France fraîche avec son chien : 7 villes sous 25°C en juillet (2026)',
    es: 'Francia fresca con tu perro: 7 ciudades con menos de 25°C en julio (2026)',
    pt: 'França fresca com o seu cão: 7 cidades abaixo de 25°C em julho (2026)',
    de: 'Kühles Frankreich mit Hund: 7 Städte unter 25°C im Juli (2026)', nl: 'Koel Frankrijk met je hond: 7 steden onder de 25°C in juli (2026)',
  },
  metaDesc: {
    en: 'While Paris and Lyon reach 32°C, Atlantic France stays cool. Brest (17°C), Saint-Malo, Cherbourg, Honfleur, Strasbourg, Annecy, Bayonne: 7 dog-friendly cities under 25°C in July with hotel picks.',
    fr: "Pendant que Paris et Lyon atteignent 32°C, la France atlantique reste fraîche. Brest (17°C), Saint-Malo, Cherbourg, Honfleur, Strasbourg, Annecy, Bayonne : 7 villes dog-friendly sous 25°C en juillet avec sélection d'hôtels.",
    es: 'Mientras París y Lyon alcanzan los 32°C, la Francia atlántica se mantiene fresca. Brest (17°C), Saint-Malo, Cherburgo, Honfleur, Estrasburgo, Annecy, Bayona: 7 ciudades dog-friendly con menos de 25°C en julio.',
    pt: 'Enquanto Paris e Lyon atingem 32°C, a França atlântica mantém-se fresca. Brest (17°C), Saint-Malo, Cherburgo, Honfleur, Estrasburgo, Annecy, Bayonne: 7 cidades dog-friendly abaixo de 25°C em julho.',
    de: 'Während Paris und Lyon 32°C erreichen, bleibt das atlantische Frankreich kühl. Brest (17°C), Saint-Malo, Cherbourg, Honfleur, Straßburg, Annecy, Bayonne: 7 hundefreundliche Städte unter 25°C im Juli mit Hotelauswahl.', nl: 'Terwijl Parijs en Lyon 32°C bereiken, blijft Atlantisch Frankrijk koel. Brest (17°C), Saint-Malo, Cherbourg, Honfleur, Straatsburg, Annecy, Bayonne: 7 hondvriendelijke steden onder de 25°C in juli, met hotelkeuzes.',
  },
  intro: {
    en: 'Paris hits 32°C, Lyon 33°C, Marseille 30°C in July. But Atlantic France (Brittany, Normandy, Basque coast), Alsace, and the Alpine foothills stay well below 26°C, cooled by ocean air, altitude, and Rhine breezes. These 7 cities offer genuinely French summers without the heat.',
    fr: "Paris atteint 32°C, Lyon 33°C, Marseille 30°C en juillet. Mais la France atlantique (Bretagne, Normandie, côte basque), l'Alsace et le piedmont alpin restent bien en dessous de 26°C, refroidis par l'air océanique, l'altitude et les brises rhénanes. Ces 7 villes offrent des étés vraiment français sans la chaleur.",
    es: 'París alcanza los 32°C, Lyon 33°C, Marsella 30°C en julio. Pero la Francia atlántica (Bretaña, Normandía, costa vasca), Alsacia y el piedemonte alpino se mantienen muy por debajo de los 26°C, refrescados por el aire oceánico, la altitud y las brisas del Rin. Estas 7 ciudades ofrecen veranos genuinamente franceses sin el calor.',
    pt: 'Paris atinge 32°C, Lyon 33°C, Marselha 30°C em julho. Mas a França atlântica (Bretanha, Normandia, costa basca), a Alsácia e o sopé alpino mantêm-se bem abaixo de 26°C, arrefecidos pelo ar oceânico, altitude e brisas do Reno. Estas 7 cidades oferecem verões genuinamente franceses sem o calor.',
    de: 'Paris erreicht 32°C, Lyon 33°C, Marseille 30°C im Juli. Doch das atlantische Frankreich (Bretagne, Normandie, Baskenküste), das Elsass und das Alpenvorland bleiben deutlich unter 26°C, gekühlt durch Meeresluft, Höhenlage und Rheinbrisen. Diese 7 Städte bieten echte französische Sommer ohne die Hitze.', nl: 'Parijs haalt 32°C, Lyon 33°C, Marseille 30°C in juli. Maar Atlantisch Frankrijk (Bretagne, Normandië, Baskische kust), de Elzas en de Alpenuitlopers blijven ruim onder de 26°C, verkoeld door zeelucht, hoogte en Rijnbriesjes. Deze 7 steden bieden echte Franse zomers zonder de hitte.',
  },
  julyTemp: { en: 'July avg high', fr: 'Max moy. juillet', es: 'Máx. prom. julio', pt: 'Máx. méd. julho', de: 'Ø Höchsttemp. Juli', nl: 'Gem. max. juli' },
  seeHotels: { en: 'All pet-friendly hotels', fr: 'Tous les hôtels pet-friendly', es: 'Todos los hoteles pet-friendly', pt: 'Todos os hotéis pet-friendly', de: 'Alle haustierfreundlichen Hotels', nl: 'Alle huisdiervriendelijke hotels' },
  hotelsLabel: { en: 'Our hotel picks', fr: 'Nos hôtels recommandés', es: 'Nuestros hoteles recomendados', pt: 'Os nossos hotéis recomendados', de: 'Unsere Hotelempfehlungen', nl: 'Onze hotelkeuzes' },
  dogTipLabel: { en: 'Dog tip', fr: 'Conseil chien', es: 'Consejo para tu perro', pt: 'Dica para o seu cão', de: 'Tipp für Hunde', nl: 'Tip voor je hond' },
  breadHome: { en: 'Home', fr: 'Accueil', es: 'Inicio', pt: 'Início', de: 'Startseite', nl: 'Home' },
  breadGuides: { en: 'Guides', fr: 'Guides', es: 'Guías', pt: 'Guias', de: 'Ratgeber', nl: 'Gidsen' },
  faq: {
    q1: { en: 'Which French cities stay cool in summer?', fr: 'Quelles villes françaises restent fraîches en été ?', es: '¿Qué ciudades francesas permanecen frescas en verano?', pt: 'Que cidades francesas se mantêm frescas no verão?', de: 'Welche französischen Städte bleiben im Sommer kühl?', nl: 'Welke Franse steden blijven koel in de zomer?' },
    a1: {
      en: 'Brittany and Normandy are the coolest regions: Brest averages 17°C in July, Cherbourg 18°C, Saint-Malo and Honfleur around 20-21°C. These cities are moderated by Atlantic air masses that make summers mild but cloudy. Alsace (Strasbourg, 24°C) is cooler than Paris by Rhine valley airflow. Alpine cities (Annecy, 25°C) benefit from altitude and lake microclimate. The French Basque coast (Bayonne, Biarritz) stays at 25°C year-round. Paris, Lyon, Bordeaux, Toulouse and Marseille all regularly exceed 30°C in July.',
      fr: "La Bretagne et la Normandie sont les régions les plus fraîches : Brest affiche 17°C en moyenne en juillet, Cherbourg 18°C, Saint-Malo et Honfleur autour de 20-21°C. Ces villes sont tempérées par les masses d'air atlantiques qui rendent les étés doux mais nuageux. L'Alsace (Strasbourg, 24°C) est plus fraîche que Paris grâce à la circulation d'air de la vallée du Rhin. Les villes alpines (Annecy, 25°C) bénéficient de l'altitude et du microclimat lacustre. La côte basque française (Bayonne, Biarritz) reste à 25°C toute l'année. Paris, Lyon, Bordeaux, Toulouse et Marseille dépassent régulièrement 30°C en juillet.",
      es: 'Bretaña y Normandía son las regiones más frescas: Brest tiene una media de 17°C en julio, Cherburgo 18°C, Saint-Malo y Honfleur alrededor de 20-21°C. Alsacia (Estrasburgo, 24°C) es más fresca que París gracias al flujo de aire del valle del Rin. Las ciudades alpinas (Annecy, 25°C) se benefician de la altitud y el microclima lacustre. París, Lyon, Burdeos, Toulouse y Marsella superan regularmente los 30°C en julio.',
      pt: 'A Bretanha e a Normandia são as regiões mais frescas: Brest tem uma média de 17°C em julho, Cherburgo 18°C, Saint-Malo e Honfleur cerca de 20-21°C. A Alsácia (Estrasburgo, 24°C) é mais fresca do que Paris graças ao fluxo de ar do vale do Reno. As cidades alpinas (Annecy, 25°C) beneficiam da altitude e do microclima lacustre.',
      de: 'Die Bretagne und die Normandie sind die kühlsten Regionen: Brest liegt im Juli im Schnitt bei 17°C, Cherbourg bei 18°C, Saint-Malo und Honfleur bei rund 20 bis 21°C. Diese Städte werden durch atlantische Luftmassen gemäßigt, die die Sommer mild, aber wolkig machen. Das Elsass (Straßburg, 24°C) ist dank der Luftströmung im Rheintal kühler als Paris. Alpenstädte (Annecy, 25°C) profitieren von Höhenlage und dem Mikroklima des Sees. Die französische Baskenküste (Bayonne, Biarritz) bleibt das ganze Jahr über bei 25°C. Paris, Lyon, Bordeaux, Toulouse und Marseille überschreiten im Juli regelmäßig 30°C.', nl: 'Bretagne en Normandië zijn de koelste regio\'s: Brest zit in juli gemiddeld op 17°C, Cherbourg op 18°C, Saint-Malo en Honfleur rond de 20-21°C. Deze steden worden getemperd door Atlantische luchtmassa\'s die de zomers mild maar bewolkt maken. De Elzas (Straatsburg, 24°C) is dankzij de luchtstroming door de Rijnvallei koeler dan Parijs. Alpensteden (Annecy, 25°C) profiteren van hoogte en het microklimaat van het meer. De Franse Baskische kust (Bayonne, Biarritz) blijft het hele jaar door op 25°C. Parijs, Lyon, Bordeaux, Toulouse en Marseille komen in juli allemaal regelmatig boven de 30°C uit.',
    },
    q2: { en: 'Are dogs allowed on beaches in Brittany and Normandy?', fr: 'Les chiens sont-ils autorisés sur les plages de Bretagne et Normandie ?', es: '¿Se permiten perros en las playas de Bretaña y Normandía?', pt: 'São permitidos cães nas praias da Bretanha e da Normandia?', de: 'Sind Hunde an Stränden in der Bretagne und Normandie erlaubt?', nl: 'Mogen honden op stranden in Bretagne en Normandië?' },
    a2: {
      en: 'Generally more permissive than southern France. Brittany: most beaches allow dogs before 9am and after 7pm from June to September, and year-round without restriction from October to May. Many Breton communes have year-round dog beaches (Brest, Quimper). Normandy: similar rules, with several year-round dog beaches along the Manche coast. Important exception: bathing beaches in peak season (July-August) usually require a lead even in the authorised time windows. Check the specific commune\'s arrêté for the beach you plan to visit.',
      fr: "Généralement plus permissives que le sud de la France. Bretagne : la plupart des plages autorisent les chiens avant 9h et après 19h de juin à septembre, et toute l'année sans restriction d'octobre à mai. De nombreuses communes bretonnes ont des plages dog-friendly toute l'année (Brest, Quimper). Normandie : règles similaires, avec plusieurs plages dog-friendly toute l'année sur la côte de la Manche. Exception importante : les plages de baignade en haute saison (juillet-août) exigent généralement une laisse même dans les créneaux autorisés.",
      es: 'Generalmente más permisivas que el sur de Francia. Bretaña: la mayoría de las playas permiten perros antes de las 9h y después de las 19h de junio a septiembre, y durante todo el año sin restricciones de octubre a mayo. Normandía: normas similares, con varias playas dog-friendly durante todo el año en la costa del Canal de la Mancha.',
      pt: 'Geralmente mais permissivas do que o sul de França. Bretanha: a maioria das praias permite cães antes das 9h e depois das 19h de junho a setembro, e durante todo o ano sem restrições de outubro a maio. Normandia: regras semelhantes, com várias praias dog-friendly durante todo o ano na costa do Canal da Mancha.',
      de: 'Generell großzügiger als in Südfrankreich. Bretagne: Die meisten Strände erlauben Hunde von Juni bis September vor 9 Uhr und nach 19 Uhr, und von Oktober bis Mai das ganze Jahr über ohne Einschränkung. Viele bretonische Gemeinden haben ganzjährige Hundestrände (Brest, Quimper). Normandie: ähnliche Regelungen, mit mehreren ganzjährigen Hundestränden entlang der Küste des Ärmelkanals. Wichtige Ausnahme: Badestrände in der Hochsaison (Juli/August) verlangen meist eine Leine, selbst in den erlaubten Zeitfenstern. Prüfen Sie den Erlass (arrêté) der jeweiligen Gemeinde für den geplanten Strand.', nl: 'Over het algemeen soepeler dan in Zuid-Frankrijk. Bretagne: de meeste stranden staan honden toe vóór 9 uur en na 19 uur van juni tot september, en het hele jaar door zonder beperking van oktober tot mei. Veel Bretonse gemeentes hebben het hele jaar door hondenstranden (Brest, Quimper). Normandië: vergelijkbare regels, met meerdere hondenstranden het hele jaar door langs de kust van het Kanaal. Belangrijke uitzondering: badstranden in het hoogseizoen (juli-augustus) vereisen meestal een lijn, zelfs binnen de toegestane tijdvensters. Check het gemeentelijke besluit (arrêté) van het strand dat je van plan bent te bezoeken.',
    },
    q3: { en: 'How do I travel to Brittany or Normandy with a dog by train?', fr: 'Comment rejoindre la Bretagne ou la Normandie avec un chien en train ?', es: '¿Cómo viajar a Bretaña o Normandía con un perro en tren?', pt: 'Como viajar para a Bretanha ou Normandia com um cão de comboio?', de: 'Wie reist man mit Hund per Zug in die Bretagne oder Normandie?', nl: 'Hoe reis ik met een hond per trein naar Bretagne of Normandië?' },
    a3: {
      en: 'SNCF policy: dogs under 6 kg in a carrier travel free. Dogs 6-40 kg travel at 50% of the second-class full fare (Plein Tarif) and must have a lead and muzzle on board. No dogs on high-speed TGV trains unless small enough to fit in a carrier. Paris-Brest: 4h by TGV. Paris-Saint-Malo: 2h15 by TGV to Rennes then TER (1h). Paris-Strasbourg: 1h47 by TGV (dog supplement applies). Paris-Annecy: 3h40 by TGV to Lyon then TER. Ouigo low-cost trains: dogs under 6 kg in a carrier only.',
      fr: "Politique SNCF : les chiens de moins de 6 kg en panier voyagent gratuitement. Les chiens de 6 à 40 kg voyagent à 50% du tarif plein 2e classe et doivent être en laisse et muselière à bord. Pas de chiens dans les TGV haute vitesse sauf s'ils tiennent dans un panier. Paris-Brest : 4h en TGV. Paris-Saint-Malo : 2h15 en TGV jusqu'à Rennes puis TER (1h). Paris-Strasbourg : 1h47 en TGV (supplément chien). Paris-Annecy : 3h40 en TGV jusqu'à Lyon puis TER. Trains Ouigo low-cost : chiens de moins de 6 kg en panier uniquement.",
      es: 'Política SNCF: los perros menores de 6 kg en transportín viajan gratis. Los perros de 6 a 40 kg viajan al 50% del precio completo de 2ª clase y deben llevar correa y bozal a bordo. No se admiten perros en los TGV de alta velocidad a menos que quepan en un transportín. París-Brest: 4h en TGV. París-Saint-Malo: 2h15 en TGV hasta Rennes luego TER (1h). París-Estrasburgo: 1h47 en TGV. París-Annecy: 3h40 en TGV hasta Lyon luego TER.',
      pt: 'Política SNCF: cães abaixo de 6 kg em caixa de transporte viajam gratuitamente. Cães de 6 a 40 kg viajam a 50% do preço completo de 2ª classe e devem usar trela e focinheira a bordo. Não são admitidos cães nos TGV de alta velocidade a menos que caibam numa caixa de transporte. Paris-Brest: 4h de TGV. Paris-Saint-Malo: 2h15 de TGV até Rennes depois TER (1h). Paris-Estrasburgo: 1h47 de TGV. Paris-Annecy: 3h40 de TGV até Lyon depois TER.',
      de: 'SNCF-Regelung: Hunde unter 6 kg in einer Transportbox reisen kostenlos. Hunde von 6 bis 40 kg zahlen 50 % des vollen Preises der 2. Klasse (Plein Tarif) und müssen an Bord Leine und Maulkorb tragen. In Hochgeschwindigkeits-TGVs sind Hunde nicht erlaubt, außer sie passen in eine Transportbox. Paris-Brest: 4 Std. mit dem TGV. Paris-Saint-Malo: 2 Std. 15 mit dem TGV bis Rennes, dann TER (1 Std.). Paris-Straßburg: 1 Std. 47 mit dem TGV (Hundezuschlag fällig). Paris-Annecy: 3 Std. 40 mit dem TGV bis Lyon, dann TER. Ouigo-Billigzüge: nur Hunde unter 6 kg in einer Transportbox.', nl: 'SNCF-beleid: honden onder de 6 kg in een reismand reizen gratis. Honden van 6 tot 40 kg reizen tegen 50% van het volledige tweedeklastarief (Plein Tarif) en moeten aan boord aangelijnd zijn en een muilkorf dragen. Geen honden in de hogesnelheids-TGV\'s, tenzij ze klein genoeg zijn voor een reismand. Parijs-Brest: 4 uur met de TGV. Parijs-Saint-Malo: 2 uur 15 met de TGV naar Rennes, dan TER (1 uur). Parijs-Straatsburg: 1 uur 47 met de TGV (hondentoeslag van toepassing). Parijs-Annecy: 3 uur 40 met de TGV naar Lyon, dan TER. Goedkope Ouigo-treinen: alleen honden onder de 6 kg in een reismand.',
    },
    q4: { en: 'Are dogs allowed in French restaurants and cafés?', fr: 'Les chiens sont-ils autorisés dans les restaurants et cafés français ?', es: '¿Se permiten perros en los restaurantes y cafés franceses?', pt: 'São permitidos cães nos restaurantes e cafés franceses?', de: 'Sind Hunde in französischen Restaurants und Cafés erlaubt?', nl: 'Mogen honden mee in Franse restaurants en cafés?' },
    a4: {
      en: 'France has one of the most dog-tolerant café cultures in Europe. Terraces: dogs are accepted almost universally on café and restaurant terraces across the country. Inside: legally allowed at the owner\'s discretion (decree of 1961, article L.223-9). In practice, dogs are accepted inside in rural areas and smaller towns, and in most neighbourhood cafés and brasseries. The main exception is upscale restaurants in major cities, which may refuse. In Brittany, Normandy, Alsace, and the Basque country the culture is very open. Always ask "Mon chien peut entrer?" before entering with a dog inside.',
      fr: "La France a l'une des cultures de café les plus tolérantes envers les chiens en Europe. Terrasses : les chiens sont acceptés presque universellement en terrasse de café et de restaurant. Intérieur : légalement autorisé à la discrétion du patron (décret de 1961, article L.223-9). En pratique, les chiens sont acceptés à l'intérieur dans les zones rurales et les petites villes, et dans la plupart des cafés de quartier et brasseries. La principale exception est les restaurants gastronomiques dans les grandes villes. En Bretagne, Normandie, Alsace et au Pays basque, la culture est très ouverte. Demandez toujours « Mon chien peut entrer ? » avant d'entrer avec un chien.",
      es: 'Francia tiene una de las culturas de café más tolerantes con los perros de Europa. Terrazas: los perros se aceptan casi universalmente en terrazas de cafés y restaurantes. Interior: legalmente permitido a discreción del propietario. En la práctica, los perros se aceptan en el interior en zonas rurales y ciudades pequeñas. La principal excepción son los restaurantes de alta gama en las grandes ciudades.',
      pt: 'França tem uma das culturas de café mais tolerantes para cães na Europa. Esplanadas: os cães são aceites quase universalmente em esplanadas de cafés e restaurantes. Interior: legalmente permitido à discrição do proprietário. Na prática, os cães são aceites no interior em zonas rurais e cidades pequenas. A principal exceção são os restaurantes sofisticados nas grandes cidades.',
      de: 'Frankreich hat eine der hundefreundlichsten Cafékulturen Europas. Terrassen: Hunde werden auf Café- und Restaurantterrassen im ganzen Land nahezu überall akzeptiert. Innenräume: gesetzlich im Ermessen des Betreibers erlaubt (Erlass von 1961, Artikel L.223-9). In der Praxis werden Hunde in ländlichen Gebieten und kleineren Städten sowie in den meisten Nachbarschaftscafés und Brasserien auch drinnen akzeptiert. Die Hauptausnahme sind gehobene Restaurants in Großstädten, die ablehnen können. In der Bretagne, Normandie, im Elsass und im Baskenland ist die Kultur sehr offen. Fragen Sie vor dem Betreten mit Hund immer: "Mon chien peut entrer?"', nl: 'Frankrijk heeft een van de meest hondvriendelijke cafécultures van Europa. Terrassen: honden worden op café- en restaurantterrassen door het hele land vrijwel overal geaccepteerd. Binnen: wettelijk toegestaan naar goeddunken van de eigenaar (decreet van 1961, artikel L.223-9). In de praktijk worden honden binnen geaccepteerd op het platteland en in kleinere plaatsen, en in de meeste buurtcafés en brasseries. De belangrijkste uitzondering zijn chique restaurants in grote steden, die het kunnen weigeren. In Bretagne, Normandië, de Elzas en het Baskenland is de cultuur heel open. Vraag altijd "Mon chien peut entrer?" voordat je met je hond naar binnen gaat.',
    },
    q5: { en: 'Can dogs hike in the Pyrenees and Vosges from these bases?', fr: 'Peut-on randonner avec son chien dans les Pyrénées et les Vosges depuis ces bases ?', es: '¿Se puede hacer senderismo con el perro en los Pirineos y los Vosgos desde estas bases?', pt: 'Pode-se fazer caminhadas com o cão nos Pirenéus e nos Vosges a partir destas bases?', de: 'Kann man von diesen Städten aus mit Hund in den Pyrenäen und Vogesen wandern?', nl: 'Kunnen honden vanaf deze steden wandelen in de Pyreneeën en de Vogezen?' },
    a5: {
      en: 'Yes, both are excellent. Pyrenees from Bayonne (1h30 to the Basque Pyrenees): dogs are welcome on almost all trails, mountain refuges (CAF huts) generally accept dogs, the GR10 long-distance trail runs the full length of the French Pyrenees and allows dogs on all sections. National Park zones require a lead. Vosges from Strasbourg (45 min to the ridge road): the Vosges have one of the most dog-permissive trail cultures in France, the Chaume (moorland) above 1,000m is almost entirely off-lead, refuge farms (fermes-auberges) all welcome dogs.',
      fr: "Oui, tous les deux sont excellents. Pyrénées depuis Bayonne (1h30 jusqu'aux Pyrénées basques) : les chiens sont bienvenus sur presque tous les sentiers, les refuges de montagne (refuges CAF) acceptent généralement les chiens, le GR10 de grande randonnée parcourt toute la longueur des Pyrénées françaises et permet les chiens sur toutes les sections. Les zones du Parc National exigent une laisse. Vosges depuis Strasbourg (45 min jusqu'à la route des crêtes) : les Vosges ont l'une des cultures de sentiers les plus permissives de France pour les chiens, les Chaumes (landes) au-dessus de 1 000m sont presque entièrement sans laisse, les fermes-auberges accueillent toutes les chiens.",
      es: 'Sí, ambas son excelentes. Pirineos desde Bayona (1h30 hasta los Pirineos vascos): los perros son bienvenidos en casi todos los senderos, los refugios de montaña (refugios CAF) generalmente aceptan perros, el GR10 de gran recorrido recorre toda la longitud de los Pirineos franceses. Vosgos desde Estrasburgo (45 min hasta la ruta de las cumbres): los Vosgos tienen una de las culturas de senderos más permisivas de Francia para los perros.',
      pt: 'Sim, ambas são excelentes. Pirenéus desde Bayonne (1h30 até os Pirenéus bascos): os cães são bem-vindos em quase todos os trilhos, os refúgios de montanha (refúgios CAF) geralmente aceitam cães, o GR10 de longa distância percorre toda a extensão dos Pirenéus franceses. Vosges desde Estrasburgo (45 min até à estrada das cumeeiras): os Vosges têm uma das culturas de trilhos mais permissivas de França para os cães.',
      de: 'Ja, beide sind ausgezeichnet. Pyrenäen ab Bayonne (1 Std. 30 bis zu den baskischen Pyrenäen): Hunde sind auf fast allen Wegen willkommen, Berghütten (CAF-Hütten) akzeptieren Hunde generell, der Fernwanderweg GR10 verläuft über die gesamte Länge der französischen Pyrenäen und erlaubt Hunde auf allen Abschnitten. In Zonen des Nationalparks ist Leinenpflicht. Vogesen ab Straßburg (45 Min. bis zur Kammstraße): Die Vogesen haben eine der hundefreundlichsten Wegekulturen Frankreichs, die Chaumes (Bergweiden) oberhalb von 1.000 m sind fast vollständig ohne Leine begehbar, Ferme-Auberges (Hüttenwirtschaften) heißen Hunde durchweg willkommen.', nl: 'Ja, allebei zijn uitstekend. Pyreneeën vanaf Bayonne (1 uur 30 naar de Baskische Pyreneeën): honden zijn welkom op vrijwel alle paden, berghutten (CAF-hutten) accepteren over het algemeen honden, de lange-afstandsroute GR10 loopt over de volledige lengte van de Franse Pyreneeën en staat honden op alle stukken toe. In zones van het nationale park geldt een aanlijnplicht. Vogezen vanaf Straatsburg (45 min naar de kammenweg): de Vogezen hebben een van de meest hondvriendelijke wandelculturen van Frankrijk, de Chaume (hoogveen) boven 1.000 m is vrijwel helemaal aanlijnvrij, en de fermes-auberges (berghoeves) heten honden stuk voor stuk welkom.',
    },
  },
}

const p = (o: L4, locale: string) =>
  locale === 'fr' ? o.fr : locale === 'es' ? o.es : locale === 'pt' ? o.pt : locale === 'de' ? o.de : locale === 'nl' ? o.nl : o.en

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  return {
    title: `${p(T.metaTitle, locale)}`,
    description: p(T.metaDesc, locale),
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/${SLUG}`,
      languages: {
        ...Object.fromEntries(locales.filter((hl) => hl !== 'it').map((l) => [l, `${SITE_URL}/${l}/guides/${SLUG}`])),
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

export default async function FranceFraicheChienPage({ params }: { params: Promise<{ locale: string }> }) {
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
      { '@type': 'Question', name: p(T.faq.q4, locale), acceptedAnswer: { '@type': 'Answer', text: p(T.faq.a4, locale) } },
      { '@type': 'Question', name: p(T.faq.q5, locale), acceptedAnswer: { '@type': 'Answer', text: p(T.faq.a5, locale) } },
    ],
  }

  let cityIndex = 0

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="text-white/60 text-xs mb-4">
            <Link href={`/${locale}`} className="hover:text-white">{p(T.breadHome, locale)}</Link>
            <span className="mx-1.5">/</span>
            <Link href={`/${locale}/guides`} className="hover:text-white">{p(T.breadGuides, locale)}</Link>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            🇫🇷 {locale === 'fr' ? 'France atlantique et alpine' : locale === 'es' ? 'Francia atlántica y alpina' : locale === 'pt' ? 'França atlântica e alpina' : locale === 'de' ? 'Atlantik- und Alpenfrankreich' : locale === 'nl' ? 'Atlantisch en Alpien Frankrijk' : 'Atlantic & Alpine France'}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-5">
            {p(T.title, locale)}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl mb-8">
            {p(T.intro, locale)}
          </p>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <a key={r.id} href={`#${r.id}`} className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-full transition-colors">
                {r.emoji} {p(r.title, locale)}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Regions */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {REGIONS.map((region) => (
          <section key={region.id} id={region.id}>
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
              <span className="text-3xl">{region.emoji}</span>
              <h2 className="text-2xl font-extrabold text-gray-900">{p(region.title, locale)}</h2>
            </div>
            <div className="space-y-6">
              {region.cities.map((city) => {
                cityIndex++
                return (
                  <div key={city.slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-black flex items-center justify-center">
                            {cityIndex}
                          </div>
                          <div>
                            <h3 className="text-xl font-extrabold text-gray-900">{city.name}</h3>
                            <p className="text-xs text-gray-500">{p(city.region, locale)}</p>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="text-2xl font-black text-blue-600">{city.julyTemp}°C</div>
                          <div className="text-xs text-gray-500">{p(T.julyTemp, locale)}</div>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                        {p(city.tag, locale)}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">{p(city.why, locale)}</p>

                      <div className="flex items-start gap-2 bg-green-50 rounded-xl px-3 py-2 mb-5">
                        <span className="text-green-600 text-xs font-bold uppercase tracking-wide flex-shrink-0 mt-0.5">🐾 {p(T.dogTipLabel, locale)}</span>
                        <p className="text-green-800 text-xs leading-relaxed">{p(city.dogTip, locale)}</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{p(T.hotelsLabel, locale)}</p>
                        <div className="space-y-2">
                          {city.hotels.map((hotel) => (
                            <div key={hotel.name} className="flex items-start gap-2">
                              <span className="text-xs text-yellow-500 flex-shrink-0 mt-0.5">{'★'.repeat(hotel.stars)}</span>
                              <div>
                                <span className="text-sm font-semibold text-gray-900">{hotel.name}</span>
                                <span className="text-xs text-gray-500 ml-1.5">{p(hotel.note, locale)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <a
                        href={buildAllezDestLink(city.name, 'France', `${CAMPAIGN}-${city.slug}`, 3)}
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
            {([
              { q: T.faq.q1, a: T.faq.a1 },
              { q: T.faq.q2, a: T.faq.a2 },
              { q: T.faq.q3, a: T.faq.a3 },
              { q: T.faq.q4, a: T.faq.a4 },
              { q: T.faq.q5, a: T.faq.a5 },
            ] as Array<{ q: L4; a: L4 }>).map((f, i) => (
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
