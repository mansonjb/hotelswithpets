import type { Metadata } from 'next'
import Link from 'next/link'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'allemagne-fraiche-chien'
const CAMPAIGN = 'allemagne-fraiche'

type L4 = { en: string; fr: string; es: string; pt: string }
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
    id: 'foret-noire',
    emoji: '🌲',
    title: { en: 'Black Forest', fr: 'Forêt-Noire', es: 'Selva Negra', pt: 'Floresta Negra' },
    cities: [
      {
        slug: 'freiburg-im-breisgau',
        name: 'Freiburg im Breisgau',
        region: { en: 'Black Forest', fr: 'Forêt-Noire', es: 'Selva Negra', pt: 'Floresta Negra' },
        julyTemp: 24,
        tag: { en: 'Sunniest city in Germany · forest trails · 24°C', fr: 'Ville la plus ensoleillée d\'Allemagne · forêt · 24°C', es: 'Ciudad más soleada de Alemania · bosque · 24°C', pt: 'Cidade mais soalheira da Alemanha · floresta · 24°C' },
        why: {
          en: 'Freiburg sits at 278m at the western foot of the Black Forest and records 24°C in July, significantly cooler than the Rhine plain (30°C) and without the Mediterranean heat of Marseille or Madrid. The Dreisam river path (off-lead for dogs, 15 km from the city to the forest) and the cable car to the Schauinsland peak (1,284m) are classic dog outings. The old town (Altstadt) is 80% pedestrianised. Germany\'s dog culture is among the most permissive in Europe: restaurants, trains and shops routinely welcome dogs.',
          fr: "Freiburg est à 278m au pied ouest de la Forêt-Noire et enregistre 24°C en juillet, nettement plus frais que la plaine du Rhin (30°C) et sans la chaleur méditerranéenne. Le chemin de la Dreisam (sans laisse pour les chiens, 15 km depuis la ville vers la forêt) et le téléphérique vers le Schauinsland (1 284m) sont des sorties canines classiques. La vieille ville (Altstadt) est piétonne à 80%. La culture canine allemande est parmi les plus permissives d'Europe.",
          es: 'Friburgo está a 278m al pie occidental de la Selva Negra y registra 24°C en julio, notablemente más fresco que la llanura del Rin (30°C). El camino del río Dreisam (sin correa para perros, 15 km desde la ciudad hacia el bosque) y el teleférico al Schauinsland (1.284m) son salidas caninas clásicas. La ciudad vieja (Altstadt) está peatonalizada en un 80%.',
          pt: 'Friburgo está a 278m ao pé ocidental da Floresta Negra e regista 24°C em julho, muito mais fresco do que a planície do Reno (30°C). O caminho do rio Dreisam (sem trela para cães, 15 km da cidade até à floresta) e o teleférico para o Schauinsland (1.284m) são passeios caninos clássicos. A cidade velha (Altstadt) está pedonalizada em 80%.',
        },
        dogTip: {
          en: 'Schauinsland cable car (12 km from the city centre): dogs travel for free, arrival at 1,220m, 35 km of signposted forest trails off-lead, cool all summer, a beer garden at the summit that welcomes dogs at the terrace.',
          fr: "Téléphérique du Schauinsland (12 km du centre) : chiens gratuits, arrivée à 1 220m, 35 km de sentiers forestiers balisés sans laisse, frais tout l'été, un Biergarten au sommet qui accueille les chiens en terrasse.",
          es: 'Teleférico del Schauinsland (12 km del centro): perros gratis, llegada a 1.220m, 35 km de senderos forestales señalizados sin correa, fresco todo el verano, un Biergarten en la cima que admite perros en terraza.',
          pt: 'Teleférico do Schauinsland (12 km do centro): cães de graça, chegada a 1.220m, 35 km de trilhos florestais sinalizados sem trela, fresco durante todo o verão, um Biergarten no cume que aceita cães na esplanada.',
        },
        hotels: [
          {
            name: 'Hotel Oberkirch',
            stars: 4,
            note: { en: 'Historic hotel on Münsterplatz, 13th-century cellar wine bar, dogs accepted.', fr: 'Hôtel historique sur la Münsterplatz, bar à vin du XIIIe siècle en cave, chiens acceptés.', es: 'Hotel histórico en Münsterplatz, bar de vinos del siglo XIII en bodega, perros aceptados.', pt: 'Hotel histórico na Münsterplatz, bar de vinhos do séc. XIII em adega, cães aceites.' },
          },
          {
            name: 'Novotel Freiburg am Konzerthaus',
            stars: 4,
            note: { en: 'Modern hotel near the Schlossberg hill, 5 min walk to old town, pets up to 15 kg accepted.', fr: 'Hôtel moderne près du Schlossberg, 5 min à pied du centre historique, animaux jusqu\'à 15 kg acceptés.', es: 'Hotel moderno cerca del Schlossberg, a 5 min a pie del casco histórico, mascotas hasta 15 kg aceptadas.', pt: 'Hotel moderno perto do Schlossberg, 5 min a pé do centro histórico, animais até 15 kg aceites.' },
          },
          {
            name: 'Hotel Schwarz Waldschenke',
            stars: 3,
            note: { en: 'Traditional inn on the Schauinsland road, forest setting, large garden, dogs of all sizes welcome.', fr: 'Auberge traditionnelle sur la route du Schauinsland, cadre forestier, grand jardin, chiens de toute taille bienvenus.', es: 'Posada tradicional en la carretera de Schauinsland, entorno forestal, jardín amplio, perros de cualquier tamaño bienvenidos.', pt: 'Estalagem tradicional na estrada do Schauinsland, ambiente florestal, jardim amplo, cães de qualquer tamanho bem-vindos.' },
          },
        ],
      },
      {
        slug: 'baden-baden',
        name: 'Baden-Baden',
        region: { en: 'Black Forest', fr: 'Forêt-Noire', es: 'Selva Negra', pt: 'Floresta Negra' },
        julyTemp: 23,
        tag: { en: 'Belle Époque spa · Lichtentaler Allee · 23°C', fr: 'Spa Belle Époque · Lichtentaler Allee · 23°C', es: 'Balneario Belle Époque · Lichtentaler Allee · 23°C', pt: 'Spa Belle Époque · Lichtentaler Allee · 23°C' },
        why: {
          en: 'Baden-Baden sits at 200m in the Oos valley with the Black Forest rising immediately to the east, keeping July at 23°C. The Lichtentaler Allee (3 km riverside promenade through rose gardens and centuries-old plane trees) is entirely dog-friendly and ranks among the most elegant dog walks in Europe. The Black Forest plateau directly above the town (Merkur funicular, 667m) has 15 km of off-lead mountain trails. The casino district is lined with café terraces that welcome dogs.',
          fr: "Baden-Baden est à 200m dans la vallée de l'Oos avec la Forêt-Noire qui monte immédiatement à l'est, maintenant juillet à 23°C. La Lichtentaler Allee (3 km de promenade fluviale à travers des roseraies et des platanes centenaires) est entièrement dog-friendly et figure parmi les plus élégantes promenades canines d'Europe. Le plateau de la Forêt-Noire directement au-dessus (funiculaire du Merkur, 667m) a 15 km de sentiers de montagne sans laisse.",
          es: 'Baden-Baden está a 200m en el valle del Oos con la Selva Negra elevándose inmediatamente al este, manteniendo julio a 23°C. El Lichtentaler Allee (3 km de paseo fluvial a través de rosedales y plátanos centenarios) es totalmente dog-friendly y figura entre los paseos caninos más elegantes de Europa. La meseta de la Selva Negra directamente arriba (funicular Merkur, 667m) tiene 15 km de senderos de montaña sin correa.',
          pt: 'Baden-Baden está a 200m no vale do Oos com a Floresta Negra a subir imediatamente a leste, mantendo julho a 23°C. O Lichtentaler Allee (3 km de passeio fluvial através de rosedais e plátanos centenários) é totalmente dog-friendly e figura entre os passeios caninos mais elegantes da Europa. O planalto da Floresta Negra diretamente acima (funicular do Merkur, 667m) tem 15 km de trilhos de montanha sem trela.',
        },
        dogTip: {
          en: 'Lichtentaler Allee: 3 km, dogs off-lead allowed on the inner grass paths, benches every 100m, the Gondrambad spa garden at the end also allows dogs outside. One of Europe\'s great dog promenades, free, central, shaded.',
          fr: "Lichtentaler Allee : 3 km, chiens sans laisse autorisés sur les allées herbeuses intérieures, bancs tous les 100m, le jardin du spa Gondrambad en bout autorise aussi les chiens à l'extérieur. L'une des grandes promenades canines d'Europe, gratuite, centrale, ombragée.",
          es: 'Lichtentaler Allee: 3 km, perros sin correa permitidos en los caminos de hierba interiores, bancos cada 100m, el jardín del spa Gondrambad al final también admite perros fuera. Uno de los grandes paseos caninos de Europa, gratuito, central, sombreado.',
          pt: 'Lichtentaler Allee: 3 km, cães sem trela permitidos nos caminhos de relva interiores, bancos a cada 100m, o jardim do spa Gondrambad no final também aceita cães no exterior. Um dos grandes passeios caninos da Europa, gratuito, central, sombreado.',
        },
        hotels: [
          {
            name: 'Brenners Park-Hotel und Spa',
            stars: 5,
            note: { en: 'Legendary grand hotel on the Lichtentaler Allee, private park, dogs accepted with bed and treats.', fr: 'Légendaire grand hôtel sur la Lichtentaler Allee, parc privé, chiens acceptés avec lit et friandises.', es: 'Legendario gran hotel en el Lichtentaler Allee, parque privado, perros aceptados con cama y golosinas.', pt: 'Lendário grande hotel no Lichtentaler Allee, parque privado, cães aceites com cama e guloseimas.' },
          },
          {
            name: 'Hotel Belle Epoque',
            stars: 5,
            note: { en: 'Boutique 5-star in a Victorian villa, garden, 5 min walk to the casino, dogs welcome.', fr: 'Boutique 5 étoiles dans une villa victorienne, jardin, 5 min du casino, chiens bienvenus.', es: 'Boutique 5 estrellas en una villa victoriana, jardín, a 5 min del casino, perros bienvenidos.', pt: 'Boutique 5 estrelas numa villa vitoriana, jardim, 5 min do casino, cães bem-vindos.' },
          },
          {
            name: 'Hotel am Sophienpark',
            stars: 4,
            note: { en: 'Classic hotel on a quiet park square, walking distance to the Allee, pets accepted.', fr: 'Hôtel classique sur une place de parc calme, à pied de l\'Allee, animaux acceptés.', es: 'Hotel clásico en una plaza de parque tranquila, a pie del Allee, mascotas aceptadas.', pt: 'Hotel clássico numa praça de parque tranquila, a pé do Allee, animais aceites.' },
          },
        ],
      },
    ],
  },
  {
    id: 'baviere-alpine',
    emoji: '⛰️',
    title: { en: 'Bavarian Alps', fr: 'Alpes bavaroises', es: 'Alpes bávaros', pt: 'Alpes bávaros' },
    cities: [
      {
        slug: 'garmisch-partenkirchen',
        name: 'Garmisch-Partenkirchen',
        region: { en: 'Bavarian Alps', fr: 'Alpes bavaroises', es: 'Alpes bávaros', pt: 'Alpes bávaros' },
        julyTemp: 22,
        tag: { en: 'Zugspitze base · Loisach river · 22°C', fr: 'Pied de la Zugspitze · Loisach · 22°C', es: 'Base de la Zugspitze · Loisach · 22°C', pt: 'Base da Zugspitze · Loisach · 22°C' },
        why: {
          en: 'Garmisch-Partenkirchen at 708m records 22°C in July while Munich swelters at 25°C and the Italian Po valley hits 34°C. It sits directly below the Zugspitze (2,962m) and is the starting point for the Zugspitze trail, one of Germany\'s great long-distance hikes. The Loisach river walk (15 km of off-lead riverbank paths) and the Partnach Gorge (dramatic limestone gorge, dogs on lead in the gorge, off-lead before and after) are the classic dog routes.',
          fr: "Garmisch-Partenkirchen à 708m enregistre 22°C en juillet alors que Munich souffre à 25°C et la plaine du Pô atteint 34°C. Elle est directement sous la Zugspitze (2 962m) et le départ du Zugspitztrail, une des grandes randonnées longue distance d'Allemagne. Le chemin de la Loisach (15 km de berges sans laisse) et les Gorges de la Partnach (gorge calcaire spectaculaire, chiens en laisse dans la gorge, sans laisse avant et après) sont les itinéraires canins classiques.",
          es: 'Garmisch-Partenkirchen a 708m registra 22°C en julio mientras Múnich sufre a 25°C y la llanura del Po llega a 34°C. Está directamente bajo la Zugspitze (2.962m) y es el punto de partida del Zugspitztrail. El paseo del río Loisach (15 km de ribera sin correa) y las Gargantas de la Partnach (perros con correa en la garganta, sin correa antes y después) son las rutas caninas clásicas.',
          pt: 'Garmisch-Partenkirchen a 708m regista 22°C em julho enquanto Munique sofre a 25°C e a planície do Pó atinge 34°C. Fica diretamente abaixo da Zugspitze (2.962m) e é o ponto de partida do Zugspitztrail. O caminho do rio Loisach (15 km de margens sem trela) e as Gargantas da Partnach (cães com trela na garganta, sem trela antes e depois) são os percursos caninos clássicos.',
        },
        dogTip: {
          en: 'Partnach Gorge (Partnachklamm): 700m of carved limestone gorge, dogs on lead, dramatic waterfalls, cool even in heatwaves (10°C inside the gorge in summer), 3 km round trip from the Olympic ski stadium car park.',
          fr: "Gorges de la Partnach (Partnachklamm) : 700m de gorge calcaire sculptée, chiens en laisse, cascades spectaculaires, frais même lors des canicules (10°C à l'intérieur de la gorge en été), 3 km aller-retour depuis le parking du stade de ski olympique.",
          es: 'Gargantas de la Partnach (Partnachklamm): 700m de garganta calcárea esculpida, perros con correa, espectaculares cascadas, fresco incluso en las olas de calor (10°C dentro de la garganta en verano), 3 km ida y vuelta desde el aparcamiento del estadio de esquí olímpico.',
          pt: 'Gargantas da Partnach (Partnachklamm): 700m de garganta calcária esculpida, cães com trela, cascatas espetaculares, fresco mesmo durante vagas de calor (10°C dentro da garganta no verão), 3 km ida e volta desde o parque de estacionamento do estádio de esqui olímpico.',
        },
        hotels: [
          {
            name: 'Hotel Zugspitze',
            stars: 4,
            note: { en: 'Classic Bavarian hotel at the foot of the Zugspitze cable car, mountain views, dogs of any size welcome.', fr: 'Hôtel bavarois classique au pied du téléphérique de la Zugspitze, vue montagne, chiens de toute taille bienvenus.', es: 'Clásico hotel bávaro al pie del teleférico de la Zugspitze, vistas a la montaña, perros de cualquier tamaño bienvenidos.', pt: 'Hotel bávaro clássico ao pé do teleférico da Zugspitze, vistas para a montanha, cães de qualquer tamanho bem-vindos.' },
          },
          {
            name: 'Riessersee Hotel',
            stars: 4,
            note: { en: 'Lakeside hotel with private beach on the Riessersee, lawns, dogs welcome up to 20 kg.', fr: 'Hôtel au bord du Riessersee avec plage privée, pelouses, chiens bienvenus jusqu\'à 20 kg.', es: 'Hotel a orillas del Riessersee con playa privada, céspedes, perros bienvenidos hasta 20 kg.', pt: 'Hotel à beira do Riessersee com praia privada, relvados, cães bem-vindos até 20 kg.' },
          },
          {
            name: 'Gasthof Fraundorfer',
            stars: 3,
            note: { en: 'Traditional Bavarian gasthaus with live Zither music nightly, central, dogs accepted in all rooms.', fr: 'Gasthaus bavarois traditionnel avec musique de Zither en direct chaque soir, central, chiens acceptés dans toutes les chambres.', es: 'Gasthaus bávaro tradicional con música de Zither en directo cada noche, central, perros aceptados en todas las habitaciones.', pt: 'Gasthaus bávaro tradicional com música de Zither ao vivo todas as noites, central, cães aceites em todos os quartos.' },
          },
        ],
      },
    ],
  },
  {
    id: 'lac-de-constance',
    emoji: '🌊',
    title: { en: 'Lake Constance', fr: 'Lac de Constance', es: 'Lago Constanza', pt: 'Lago Constança' },
    cities: [
      {
        slug: 'lindau',
        name: 'Lindau im Bodensee',
        region: { en: 'Lake Constance', fr: 'Lac de Constance', es: 'Lago Constanza', pt: 'Lago Constança' },
        julyTemp: 22,
        tag: { en: 'Island old town · Alpine panorama · 22°C', fr: 'Vieille ville insulaire · panorama alpin · 22°C', es: 'Ciudad vieja insular · panorama alpino · 22°C', pt: 'Cidade velha insular · panorama alpino · 22°C' },
        why: {
          en: 'Lindau is a medieval island-town connected by causeway to the Bavarian shore of Lake Constance (22°C in July). The lake\'s thermal mass keeps summer temperatures moderate. The island (1 km x 300m) is almost entirely pedestrianised. The Lake Constance cycle path (273 km round the lake, flat, asphalted, off-lead) is one of Europe\'s great dog cycling routes. Swimming at the lake beaches is year-round: most German lake beaches allow dogs before 9am and after 6pm in season.',
          fr: "Lindau est une ville médiévale insulaire reliée par une digue à la rive bavaroise du lac de Constance (22°C en juillet). La masse thermique du lac maintient des températures estivales modérées. L'île (1 km x 300m) est presque entièrement piétonne. La piste cyclable du lac de Constance (273 km autour du lac, plat, asphalté, sans laisse) est l'un des grands itinéraires canins cyclables d'Europe.",
          es: 'Lindau es una ciudad medieval insular conectada por una calzada a la orilla bávara del lago Constanza (22°C en julio). La masa térmica del lago mantiene temperaturas estivales moderadas. La isla (1 km x 300m) está casi totalmente peatonalizada. La vía ciclista del lago Constanza (273 km alrededor del lago, plana, asfaltada, sin correa) es una de las grandes rutas ciclistas caninas de Europa.',
          pt: 'Lindau é uma cidade medieval insular ligada por uma dique à margem bávara do Lago Constança (22°C em julho). A massa térmica do lago mantém temperaturas estivais moderadas. A ilha (1 km x 300m) está quase totalmente pedonalizada. A ciclovia do Lago Constança (273 km à volta do lago, plana, asfaltada, sem trela) é um dos grandes percursos ciclistas caninos da Europa.',
        },
        dogTip: {
          en: 'Bodensee-Radweg (Lake Constance cycle path): flat, 273 km around the entire lake crossing 3 countries (Germany, Austria, Switzerland), dogs off-lead on most sections, rental bikes available in Lindau that carry dogs in front baskets. The full circuit takes 5-7 days.',
          fr: "Bodensee-Radweg (piste cyclable du lac de Constance) : plat, 273 km autour du lac traversant 3 pays (Allemagne, Autriche, Suisse), chiens sans laisse sur la plupart des tronçons, vélos de location disponibles à Lindau avec panier avant pour chiens. Le circuit complet prend 5-7 jours.",
          es: 'Bodensee-Radweg (vía ciclista del lago Constanza): plana, 273 km alrededor del lago cruzando 3 países (Alemania, Austria, Suiza), perros sin correa en la mayoría de los tramos, bicicletas de alquiler en Lindau con cesta delantera para perros. El circuito completo dura 5-7 días.',
          pt: 'Bodensee-Radweg (ciclovia do Lago Constança): plana, 273 km à volta do lago cruzando 3 países (Alemanha, Áustria, Suíça), cães sem trela na maioria dos troços, bicicletas de aluguer em Lindau com cesto dianteiro para cães. O circuito completo demora 5-7 dias.',
        },
        hotels: [
          {
            name: 'Bayerischer Hof Lindau',
            stars: 4,
            note: { en: 'Traditional grand hotel on the harbour promenade, lake views, dogs accepted.', fr: 'Grand hôtel traditionnel sur la promenade du port, vue sur le lac, chiens acceptés.', es: 'Gran hotel tradicional en el paseo del puerto, vistas al lago, perros aceptados.', pt: 'Grande hotel tradicional no passeio do porto, vistas para o lago, cães aceites.' },
          },
          {
            name: 'Hotel Villino',
            stars: 4,
            note: { en: 'Elegant Mediterranean-style hotel with garden terrace on the lake, small pets welcome.', fr: 'Élégant hôtel de style méditerranéen avec terrasse-jardin sur le lac, petits animaux bienvenus.', es: 'Elegante hotel de estilo mediterráneo con terraza-jardín junto al lago, mascotas pequeñas bienvenidas.', pt: 'Elegante hotel de estilo mediterrânico com terraço-jardim junto ao lago, animais pequenos bem-vindos.' },
          },
          {
            name: 'Hotel Helvetia',
            stars: 4,
            note: { en: 'Lakefront hotel on the island with its own dock, dogs of all sizes accepted.', fr: 'Hôtel en bord de lac sur l\'île avec son propre ponton, chiens de toute taille acceptés.', es: 'Hotel frente al lago en la isla con su propio embarcadero, perros de cualquier tamaño aceptados.', pt: 'Hotel à beira do lago na ilha com o seu próprio cais, cães de qualquer tamanho aceites.' },
          },
        ],
      },
    ],
  },
  {
    id: 'cote-baltique',
    emoji: '🌊',
    title: { en: 'Baltic coast (Rügen)', fr: 'Côte baltique (Rügen)', es: 'Costa báltica (Rügen)', pt: 'Costa báltica (Rügen)' },
    cities: [
      {
        slug: 'rugen',
        name: 'Rügen',
        region: { en: 'Baltic coast', fr: 'Côte baltique', es: 'Costa báltica', pt: 'Costa báltica' },
        julyTemp: 21,
        tag: { en: 'Chalk cliffs · Baltic sea · dog beaches year-round', fr: 'Falaises de craie · mer Baltique · plages dog-friendly toute l\'année', es: 'Acantilados de tiza · mar Báltico · playas dog-friendly todo el año', pt: 'Falésias de giz · mar Báltico · praias dog-friendly o ano todo' },
        why: {
          en: 'Rügen is Germany\'s largest island (926 km²) and one of the most dog-friendly destinations in Europe. The Baltic coast stays at 21°C in July, 4°C cooler than Berlin. 90% of Rügen\'s beaches allow dogs year-round with no seasonal ban. The chalk cliffs of the Jasmund National Park are a UNESCO site with 15 km of off-lead cliff-top trails. The spa promenades of Binz, Sellin and Göhren are all dog-friendly. The Rügen train (Rasender Roland, 1895 vintage steam railway) accepts dogs free.',
          fr: "Rügen est la plus grande île d'Allemagne (926 km²) et l'une des destinations les plus dog-friendly d'Europe. La côte baltique reste à 21°C en juillet, 4°C de moins que Berlin. 90% des plages de Rügen acceptent les chiens toute l'année sans interdiction saisonnière. Les falaises de craie du Parc National de Jasmund sont un site UNESCO avec 15 km de sentiers en bord de falaise sans laisse. Le train de Rügen (Rasender Roland, locomotive à vapeur de 1895) accepte les chiens gratuitement.",
          es: 'Rügen es la mayor isla de Alemania (926 km²) y uno de los destinos más dog-friendly de Europa. La costa báltica se mantiene a 21°C en julio, 4°C menos que Berlín. El 90% de las playas de Rügen admiten perros todo el año sin prohibición estacional. Los acantilados de tiza del Parque Nacional de Jasmund son un sitio UNESCO con 15 km de senderos en lo alto del acantilado sin correa.',
          pt: 'Rügen é a maior ilha da Alemanha (926 km²) e um dos destinos mais dog-friendly da Europa. A costa báltica mantém-se a 21°C em julho, 4°C mais fresca do que Berlim. 90% das praias de Rügen aceitam cães durante todo o ano sem proibição sazonal. As falésias de giz do Parque Nacional de Jasmund são um local UNESCO com 15 km de trilhos no topo das falésias sem trela.',
        },
        dogTip: {
          en: 'Prora beach (Binz): 4 km of Baltic beach where dogs are allowed year-round, off-lead in designated sections, backed by a forest of Scots pines (shade in summer), the Baltic sea temperature reaches 20°C in July, dogs swim freely.',
          fr: 'Plage de Prora (Binz) : 4 km de plage baltique où les chiens sont autorisés toute l\'année, sans laisse dans les sections désignées, bordée d\'une forêt de pins sylvestres (ombre en été), la mer Baltique atteint 20°C en juillet, les chiens nagent librement.',
          es: 'Playa de Prora (Binz): 4 km de playa báltica donde los perros están permitidos todo el año, sin correa en las secciones designadas, respaldada por un bosque de pinos silvestres (sombra en verano), el mar Báltico alcanza 20°C en julio.',
          pt: 'Praia de Prora (Binz): 4 km de praia báltica onde os cães são permitidos durante todo o ano, sem trela nas secções designadas, margeada por uma floresta de pinheiros silvestres (sombra no verão), o mar Báltico atinge 20°C em julho.',
        },
        hotels: [
          {
            name: 'Grand Hotel Binz',
            stars: 4,
            note: { en: 'Historic grand hotel in Binz spa resort, seafront, dogs of any size accepted.', fr: 'Grand hôtel historique dans la station thermale de Binz, en bord de mer, chiens de toute taille acceptés.', es: 'Gran hotel histórico en el balneario de Binz, frente al mar, perros de cualquier tamaño aceptados.', pt: 'Grande hotel histórico no resort termal de Binz, frente ao mar, cães de qualquer tamanho aceites.' },
          },
          {
            name: 'Hotel Arkona Strandhotel',
            stars: 4,
            note: { en: 'Direct beach access in Binz, modern rooms, dogs welcome with dedicated pet amenities.', fr: 'Accès direct à la plage à Binz, chambres modernes, chiens bienvenus avec équipements dédiés.', es: 'Acceso directo a la playa en Binz, habitaciones modernas, perros bienvenidos con amenities dedicados.', pt: 'Acesso direto à praia em Binz, quartos modernos, cães bem-vindos com amenities dedicados.' },
          },
          {
            name: 'Naturresort Prora',
            stars: 3,
            note: { en: 'Converted historical building in Prora, forest and beach, dogs of all sizes accepted free.', fr: 'Bâtiment historique converti à Prora, forêt et plage, chiens de toute taille acceptés gratuitement.', es: 'Edificio histórico convertido en Prora, bosque y playa, perros de cualquier tamaño aceptados gratis.', pt: 'Edifício histórico convertido em Prora, floresta e praia, cães de qualquer tamanho aceites gratuitamente.' },
          },
        ],
      },
    ],
  },
  {
    id: 'vallee-romantique',
    emoji: '🏰',
    title: { en: 'Romantic Rhine & Neckar', fr: 'Rhin et Neckar romantiques', es: 'Rin y Neckar románticos', pt: 'Reno e Neckar românticos' },
    cities: [
      {
        slug: 'heidelberg',
        name: 'Heidelberg',
        region: { en: 'Romantic Rhine & Neckar', fr: 'Rhin et Neckar romantiques', es: 'Rin y Neckar románticos', pt: 'Reno e Neckar românticos' },
        julyTemp: 24,
        tag: { en: 'Neckar river · Germany\'s oldest university · 24°C', fr: 'Neckar · plus vieille université d\'Allemagne · 24°C', es: 'Neckar · universidad más antigua de Alemania · 24°C', pt: 'Neckar · universidade mais antiga da Alemanha · 24°C' },
        why: {
          en: 'Heidelberg at 114m in the Neckar valley records 24°C in July, tempered by the valley microclimate and the forested Heiligenberg ridge (440m) that blocks southern heat. The Philosophenweg (Philosopher\'s Path, 2 km off-lead hillside trail above the city with castle and river views) is the most famous dog walk in Baden-Württemberg. The Neckar riverbank (8 km of off-lead paths from the old bridge to Ziegelhausen) is flat and shaded. Germany\'s oldest university town has a strong outdoor café culture welcoming dogs.',
          fr: "Heidelberg à 114m dans la vallée du Neckar enregistre 24°C en juillet, tempéré par le microclimat de la vallée et la crête forestière de l'Heiligenberg (440m). Le Philosophenweg (2 km de chemin sans laisse sur la colline avec vue sur le château et la rivière) est la promenade canine la plus célèbre du Bade-Wurtemberg. La berge du Neckar (8 km de chemins sans laisse du vieux pont à Ziegelhausen) est plate et ombragée.",
          es: 'Heidelberg a 114m en el valle del Neckar registra 24°C en julio, atemperado por el microclima del valle y la cresta forestal del Heiligenberg (440m). El Philosophenweg (2 km de sendero sin correa en la colina con vistas al castillo y al río) es el paseo canino más famoso de Baden-Württemberg. La orilla del Neckar (8 km de senderos sin correa del puente viejo a Ziegelhausen) es plana y sombreada.',
          pt: 'Heidelberg a 114m no vale do Neckar regista 24°C em julho, temperado pelo microclima do vale e a crista florestal do Heiligenberg (440m). O Philosophenweg (2 km de caminho sem trela na colina com vistas para o castelo e o rio) é o passeio canino mais famoso do Baden-Württemberg. A margem do Neckar (8 km de caminhos sem trela da ponte velha a Ziegelhausen) é plana e sombreada.',
        },
        dogTip: {
          en: 'Philosophenweg (Philosopher\'s Path): 2 km hillside path off-lead above the old town, castle ruins visible directly across, spring flower meadows, benches every 300m, cool under beech trees even in July, access via the Schlangenweg steps from the old bridge.',
          fr: "Philosophenweg (Chemin des Philosophes) : 2 km de chemin sans laisse sur la colline au-dessus de la vieille ville, ruines du château directement en face, prairies fleuries au printemps, bancs tous les 300m, frais sous les hêtres même en juillet, accès par les escaliers du Schlangenweg depuis le vieux pont.",
          es: 'Philosophenweg (Camino de los Filósofos): 2 km de sendero sin correa en la colina sobre el casco histórico, ruinas del castillo visibles directamente enfrente, prados floridos en primavera, bancos cada 300m, fresco bajo los hayas incluso en julio.',
          pt: 'Philosophenweg (Caminho dos Filósofos): 2 km de caminho sem trela na colina acima da cidade velha, ruínas do castelo visíveis diretamente em frente, pradarias floridas na primavera, bancos a cada 300m, fresco sob as faias mesmo em julho.',
        },
        hotels: [
          {
            name: 'Heidelberg Marriott Hotel',
            stars: 4,
            note: { en: 'Neckar riverside hotel, terrace with castle views, dogs up to 25 kg accepted.', fr: 'Hôtel en bord du Neckar, terrasse avec vue sur le château, chiens jusqu\'à 25 kg acceptés.', es: 'Hotel a orillas del Neckar, terraza con vistas al castillo, perros hasta 25 kg aceptados.', pt: 'Hotel à beira do Neckar, terraço com vistas para o castelo, cães até 25 kg aceites.' },
          },
          {
            name: 'Hotel Zum Ritter St. Georg',
            stars: 4,
            note: { en: 'Renaissance building in the old town, the most historic hotel in Heidelberg, dogs accepted.', fr: 'Bâtiment Renaissance dans la vieille ville, l\'hôtel le plus historique de Heidelberg, chiens acceptés.', es: 'Edificio renacentista en el casco histórico, el hotel más histórico de Heidelberg, perros aceptados.', pt: 'Edifício renascentista na cidade velha, o hotel mais histórico de Heidelberg, cães aceites.' },
          },
          {
            name: 'NH Heidelberg',
            stars: 4,
            note: { en: 'Modern hotel on the Bismarckplatz, 5 min walk to the Neckar, pets up to 20 kg welcome.', fr: 'Hôtel moderne sur la Bismarckplatz, 5 min à pied du Neckar, animaux jusqu\'à 20 kg bienvenus.', es: 'Hotel moderno en Bismarckplatz, a 5 min a pie del Neckar, mascotas hasta 20 kg bienvenidas.', pt: 'Hotel moderno na Bismarckplatz, 5 min a pé do Neckar, animais até 20 kg bem-vindos.' },
          },
        ],
      },
    ],
  },
]

const T = {
  title: {
    en: 'Best Cities to Escape the Heat in Germany with Your Dog (2026)',
    fr: 'Meilleures villes pour éviter la chaleur en Allemagne avec son chien (2026)',
    es: 'Mejores ciudades para evitar el calor en Alemania con tu perro (2026)',
    pt: 'Melhores cidades para evitar o calor na Alemanha com o seu cão (2026)',
  },
  metaTitle: {
    en: 'Cool Germany with Your Dog: 6 Cities Under 25°C in July (2026)',
    fr: 'Allemagne fraîche avec son chien : 6 villes sous 25°C en juillet (2026)',
    es: 'Alemania fresca con tu perro: 6 ciudades con menos de 25°C en julio (2026)',
    pt: 'Alemanha fresca com o seu cão: 6 cidades abaixo de 25°C em julho (2026)',
  },
  metaDesc: {
    en: 'While Munich hits 25°C and the Rhine plain 30°C, the Black Forest, Bavarian Alps and Baltic coast stay under 24°C. Freiburg, Baden-Baden, Garmisch, Lindau, Rügen, Heidelberg: 6 dog-friendly cities.',
    fr: "Pendant que Munich atteint 25°C et la plaine du Rhin 30°C, la Forêt-Noire, les Alpes bavaroises et la côte baltique restent sous 24°C. Freiburg, Baden-Baden, Garmisch, Lindau, Rügen, Heidelberg : 6 villes dog-friendly.",
    es: 'Mientras Múnich llega a 25°C y la llanura del Rin a 30°C, la Selva Negra, los Alpes bávaros y la costa báltica se mantienen por debajo de 24°C. Friburgo, Baden-Baden, Garmisch, Lindau, Rügen, Heidelberg: 6 ciudades dog-friendly.',
    pt: 'Enquanto Munique atinge 25°C e a planície do Reno 30°C, a Floresta Negra, os Alpes bávaros e a costa báltica mantêm-se abaixo de 24°C. Friburgo, Baden-Baden, Garmisch, Lindau, Rügen, Heidelberg: 6 cidades dog-friendly.',
  },
  intro: {
    en: 'Germany runs from the Baltic (19°C in July) to the Rhine plain (30°C). The sweet spot is the Black Forest, the Bavarian Alps and Lake Constance, all under 24°C and with some of Europe\'s most permissive dog laws. Dogs travel free on most regional trains, enter most restaurants and use most urban parks off-lead.',
    fr: "L'Allemagne va de la Baltique (19°C en juillet) à la plaine du Rhin (30°C). Le juste milieu est la Forêt-Noire, les Alpes bavaroises et le lac de Constance, tous sous 24°C, avec certaines des lois canines les plus permissives d'Europe. Les chiens voyagent gratuitement dans la plupart des trains régionaux, entrent dans la plupart des restaurants et utilisent la plupart des parcs urbains sans laisse.",
    es: 'Alemania va desde el Báltico (19°C en julio) hasta la llanura del Rin (30°C). El punto dulce es la Selva Negra, los Alpes bávaros y el lago Constanza, todos por debajo de 24°C, con algunas de las leyes caninas más permisivas de Europa. Los perros viajan gratis en la mayoría de los trenes regionales, entran en la mayoría de los restaurantes y usan la mayoría de los parques urbanos sin correa.',
    pt: 'A Alemanha vai do Báltico (19°C em julho) à planície do Reno (30°C). O ponto certo é a Floresta Negra, os Alpes bávaros e o Lago Constança, todos abaixo de 24°C, com algumas das leis caninas mais permissivas da Europa. Os cães viajam de graça na maioria dos comboios regionais, entram na maioria dos restaurantes e usam a maioria dos parques urbanos sem trela.',
  },
  julyTemp: { en: 'July avg high', fr: 'Max moy. juillet', es: 'Máx. prom. julio', pt: 'Máx. méd. julho' },
  seeHotels: { en: 'All pet-friendly hotels', fr: 'Tous les hôtels pet-friendly', es: 'Todos los hoteles pet-friendly', pt: 'Todos os hotéis pet-friendly' },
  hotelsLabel: { en: 'Our hotel picks', fr: 'Nos hôtels recommandés', es: 'Nuestros hoteles recomendados', pt: 'Os nossos hotéis recomendados' },
  dogTipLabel: { en: 'Dog tip', fr: 'Conseil chien', es: 'Consejo para tu perro', pt: 'Dica para o seu cão' },
  breadHome: { en: 'Home', fr: 'Accueil', es: 'Inicio', pt: 'Início' },
  breadGuides: { en: 'Guides', fr: 'Guides', es: 'Guías', pt: 'Guias' },
  faq: {
    q1: { en: 'Which German cities stay cool in summer?', fr: 'Quelles villes allemandes restent fraîches en été ?', es: '¿Qué ciudades alemanas permanecen frescas en verano?', pt: 'Que cidades alemãs se mantêm frescas no verão?' },
    a1: {
      en: 'The coolest German cities in July: Baltic coast (Rügen 19°C, Usedom 20°C), Black Forest (Baden-Baden 23°C, Freiburg 24°C), Bavarian Alps (Berchtesgaden 20°C, Garmisch-Partenkirchen 22°C), Lake Constance (Lindau 22°C). Munich averages 25°C (hot), the Rhine plain 28-30°C. Berlin (24°C) and Hamburg (22°C) are moderate. For the most reliable cool temperatures combined with great trails, the Bavarian Alps and Black Forest are the top choices.',
      fr: "Les villes allemandes les plus fraîches en juillet : côte baltique (Rügen 19°C, Usedom 20°C), Forêt-Noire (Baden-Baden 23°C, Freiburg 24°C), Alpes bavaroises (Berchtesgaden 20°C, Garmisch 22°C), lac de Constance (Lindau 22°C). Munich fait 25°C (chaud), la plaine du Rhin 28-30°C. Berlin (24°C) et Hambourg (22°C) sont modérées. Pour les températures fraîches les plus fiables combinées à de superbes randonnées, les Alpes bavaroises et la Forêt-Noire sont les premiers choix.",
      es: 'Las ciudades alemanas más frescas en julio: costa báltica (Rügen 19°C, Usedom 20°C), Selva Negra (Baden-Baden 23°C, Friburgo 24°C), Alpes bávaros (Berchtesgaden 20°C, Garmisch 22°C), lago Constanza (Lindau 22°C). Múnich promedia 25°C (caluroso), la llanura del Rin 28-30°C. Para las temperaturas frescas más fiables combinadas con grandes rutas, los Alpes bávaros y la Selva Negra son las mejores opciones.',
      pt: 'As cidades alemãs mais frescas em julho: costa báltica (Rügen 19°C, Usedom 20°C), Floresta Negra (Baden-Baden 23°C, Friburgo 24°C), Alpes bávaros (Berchtesgaden 20°C, Garmisch 22°C), Lago Constança (Lindau 22°C). Munique regista 25°C (quente), a planície do Reno 28-30°C. Para as temperaturas frescas mais fiáveis combinadas com excelentes trilhos, os Alpes bávaros e a Floresta Negra são as melhores escolhas.',
    },
    q2: { en: 'Are dogs allowed on German trains?', fr: 'Les chiens sont-ils autorisés dans les trains allemands ?', es: '¿Se permiten perros en los trenes alemanes?', pt: 'São permitidos cães nos comboios alemães?' },
    a2: {
      en: 'Deutsche Bahn (DB) rules: dogs in carriers under 55x45x25 cm travel free. Larger dogs require a half-price child\'s ticket, must be on a lead, and a muzzle is required in long-distance ICE and IC trains. Regional trains (RE, RB): dogs accepted on lead without a muzzle. S-Bahn and U-Bahn: dogs in carriers free, larger dogs at a reduced fare with lead and muzzle required in Berlin and Munich. The Bayern-Ticket (Bavaria day pass) covers dogs free on regional trains throughout Bavaria. The Schwarzwald-Ticket covers dogs free in the Black Forest network. Rügen: the Rasender Roland steam railway accepts dogs free in all cars.',
      fr: "Règles Deutsche Bahn (DB) : chiens en panier sous 55x45x25 cm, gratuits. Grands chiens : billet demi-tarif enfant, en laisse, muselière obligatoire dans les ICE et IC longue distance. Trains régionaux (RE, RB) : chiens acceptés en laisse sans muselière. S-Bahn et U-Bahn : chiens en panier gratuits, grands chiens à tarif réduit avec laisse et muselière. Le Bayern-Ticket (pass journée Bavière) couvre les chiens gratuitement dans les trains régionaux de toute la Bavière. Rügen : le Rasender Roland accepte les chiens gratuitement dans toutes les voitures.",
      es: 'Normas Deutsche Bahn (DB): perros en transportín bajo 55x45x25 cm, gratis. Perros grandes: billete de niño a mitad de precio, con correa, bozal obligatorio en trenes ICE e IC de larga distancia. Trenes regionales (RE, RB): perros aceptados con correa sin bozal. S-Bahn y U-Bahn: perros en transportín gratis, perros grandes a tarifa reducida con correa y bozal. El Bayern-Ticket cubre los perros gratis en trenes regionales de toda Baviera.',
      pt: 'Regras Deutsche Bahn (DB): cães em caixa abaixo de 55x45x25 cm, de graça. Cães grandes: bilhete de criança a meio preço, com trela, focinheira obrigatória em comboios ICE e IC de longa distância. Comboios regionais (RE, RB): cães aceites com trela sem focinheira. S-Bahn e U-Bahn: cães em caixa de graça, cães grandes a tarifa reduzida com trela e focinheira. O Bayern-Ticket cobre cães de graça em comboios regionais de toda a Baviera.',
    },
    q3: { en: 'Are dogs allowed in German restaurants and beer gardens?', fr: 'Les chiens sont-ils autorisés dans les restaurants et brasseries allemands ?', es: '¿Se permiten perros en los restaurantes y cervecerías alemanes?', pt: 'São permitidos cães nos restaurantes e cervejarias alemães?' },
    a3: {
      en: 'Germany has one of the most dog-permissive cultures in Europe. Beer gardens (Biergarten): dogs almost universally welcome, including the major ones (Englischer Garten in Munich, Tivoli in Berlin). Traditional restaurants (Gasthäuser, Wirtschaften): dogs welcome inside in the vast majority. The legal situation: German restaurant law leaves it to the owner\'s discretion, and refusal of dogs is the exception, not the norm, outside of fast food chains. Terraces (Biergartens, Café-Terrassen): virtually never any restriction. The phrase "Darf mein Hund mit rein?" (may my dog come in?) is almost always answered with "Ja natürlich."',
      fr: "L'Allemagne est l'une des cultures les plus permissives d'Europe en matière canine. Brasseries (Biergarten) : chiens presque universellement bienvenus, y compris dans les grands (Englischer Garten à Munich, Tivoli à Berlin). Restaurants traditionnels (Gasthäuser, Wirtschaften) : chiens bienvenus à l'intérieur dans la grande majorité. La loi allemande laisse cela à la discrétion du patron, et le refus des chiens est l'exception, non la norme, hors des chaînes de restauration rapide. Terrasses : pratiquement aucune restriction.",
      es: 'Alemania tiene una de las culturas más permisivas de Europa con los perros. Cervecerías (Biergarten): perros casi universalmente bienvenidos, incluyendo los grandes (Englischer Garten en Múnich, Tivoli en Berlín). Restaurantes tradicionales (Gasthäuser): perros bienvenidos en el interior en la gran mayoría. La ley alemana deja esto a discreción del propietario, y el rechazo de perros es la excepción, no la norma.',
      pt: 'A Alemanha tem uma das culturas mais permissivas da Europa em relação a cães. Cervejarias (Biergarten): cães quase universalmente bem-vindos, incluindo as grandes (Englischer Garten em Munique, Tivoli em Berlim). Restaurantes tradicionais (Gasthäuser): cães bem-vindos no interior na grande maioria. A lei alemã deixa isto à discrição do proprietário, e a recusa de cães é a exceção, não a norma.',
    },
    q4: { en: 'Are dogs allowed on German beaches?', fr: 'Les chiens sont-ils autorisés sur les plages allemandes ?', es: '¿Se permiten perros en las playas alemanas?', pt: 'São permitidos cães nas praias alemãs?' },
    a4: {
      en: 'German beach rules vary by state and municipality. Baltic coast (Mecklenburg-Vorpommern): Rügen and Usedom have the most permissive rules in Germany. 90% of beaches allow dogs year-round, with specific dog beaches (Hundestrand) at major resorts. Dogs are forbidden only on the main bathing sections (Badestrand) of busy resorts in July-August, but the adjacent beaches are open. North Sea coast (Schleswig-Holstein): similar rules. Lake Constance: most beaches allow dogs before 9am and after 6pm in summer. Bavarian lakes: variable, many allow dogs in dedicated sections. Always check for "Hundestrand" signs at the beach.',
      fr: "Les règles pour les plages allemandes varient selon les Länder et les communes. Côte baltique (Mecklembourg): Rügen et Usedom ont les règles les plus permissives d'Allemagne. 90% des plages acceptent les chiens toute l'année, avec des plages dédiées aux chiens (Hundestrand) dans les grandes stations. Lac de Constance : la plupart des plages acceptent les chiens avant 9h et après 18h en été. Lacs bavarois : variable, beaucoup admettent les chiens dans des sections dédiées. Regardez toujours les panneaux 'Hundestrand' sur la plage.",
      es: 'Las normas de las playas alemanas varían según el estado y el municipio. Costa báltica (Mecklemburgo): Rügen y Usedom tienen las normas más permisivas de Alemania. El 90% de las playas admiten perros todo el año, con playas dedicadas a perros (Hundestrand) en los grandes balnearios. Lago Constanza: la mayoría de las playas admiten perros antes de las 9h y después de las 18h en verano. Siempre comprueba los carteles de "Hundestrand" en la playa.',
      pt: 'As regras das praias alemãs variam por estado e município. Costa báltica (Meclemburgo): Rügen e Usedom têm as regras mais permissivas da Alemanha. 90% das praias aceitam cães durante todo o ano, com praias dedicadas (Hundestrand) nos grandes resorts. Lago Constança: a maioria das praias aceita cães antes das 9h e depois das 18h no verão. Verifique sempre os cartazes "Hundestrand" na praia.',
    },
    q5: { en: 'What is the dog tax (Hundesteuer) in Germany?', fr: 'Qu\'est-ce que la taxe sur les chiens (Hundesteuer) en Allemagne ?', es: '¿Qué es el impuesto sobre perros (Hundesteuer) en Alemania?', pt: 'O que é o imposto sobre cães (Hundesteuer) na Alemanha?' },
    a5: {
      en: 'The Hundesteuer is a municipal dog tax paid annually by registered dog owners in Germany. As a tourist, you are NOT required to pay it. Dog owners visiting Germany from abroad do not need to register their dog or pay the tax for stays under a few months. The Hundesteuer applies only to residents. However: your dog must be microchipped and have a valid EU pet passport (or non-EU equivalent) with up-to-date rabies vaccination. Some German states require a liability insurance for dogs (Hundehaftpflichtversicherung) from their own residents, but not from foreign visitors.',
      fr: "Le Hundesteuer est une taxe municipale sur les chiens payée annuellement par les propriétaires résidents en Allemagne. En tant que touriste, vous n'êtes PAS obligé de le payer. Les propriétaires de chiens en visite depuis l'étranger n'ont pas besoin d'enregistrer leur chien ou de payer la taxe pour des séjours de quelques mois. Le Hundesteuer s'applique uniquement aux résidents. Cependant : votre chien doit avoir une puce électronique et un passeport UE valide avec vaccination antirabique à jour.",
      es: 'El Hundesteuer es un impuesto municipal sobre perros que pagan anualmente los propietarios residentes en Alemania. Como turista, NO estás obligado a pagarlo. Los propietarios de perros que visitan Alemania desde el extranjero no necesitan registrar a su perro ni pagar el impuesto por estancias de pocos meses. Sin embargo, tu perro debe tener microchip y un pasaporte UE válido con vacuna antirrábica al día.',
      pt: 'O Hundesteuer é um imposto municipal sobre cães pago anualmente pelos proprietários residentes na Alemanha. Como turista, NÃO é obrigado a pagá-lo. Os proprietários de cães que visitam a Alemanha do estrangeiro não precisam de registar o seu cão nem pagar o imposto por estadias de poucos meses. No entanto: o seu cão deve ter microchip e um passaporte UE válido com vacinação antirrábica atualizada.',
    },
  },
}

const p = (o: L4, locale: string) =>
  locale === 'fr' ? o.fr : locale === 'es' ? o.es : locale === 'pt' ? o.pt : o.en

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

export default async function AllemagneFraicheChienPage({ params }: { params: Promise<{ locale: string }> }) {
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
      <section className="bg-gradient-to-br from-slate-900 via-gray-800 to-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="text-white/60 text-xs mb-4">
            <Link href={`/${locale}`} className="hover:text-white">{p(T.breadHome, locale)}</Link>
            <span className="mx-1.5">/</span>
            <Link href={`/${locale}/guides`} className="hover:text-white">{p(T.breadGuides, locale)}</Link>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-green-200 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            🇩🇪 {locale === 'fr' ? 'Forêt-Noire · Bavière · Baltique' : locale === 'es' ? 'Selva Negra · Baviera · Báltico' : locale === 'pt' ? 'Floresta Negra · Baviera · Báltico' : 'Black Forest · Bavaria · Baltic'}
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
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-700 text-sm font-black flex items-center justify-center">
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
                      <div className="inline-flex items-center gap-1 bg-gray-50 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
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
                        href={buildAllezDestLink(city.name, 'Germany', `${CAMPAIGN}-${city.slug}`, 3)}
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
