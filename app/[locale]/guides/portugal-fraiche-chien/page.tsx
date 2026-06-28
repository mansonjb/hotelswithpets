import type { Metadata } from 'next'
import Link from 'next/link'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'portugal-fraiche-chien'
const CAMPAIGN = 'portugal-fraiche'

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
    id: 'porto',
    emoji: '🌉',
    title: { en: 'Porto', fr: 'Porto', es: 'Oporto', pt: 'Porto' },
    cities: [
      {
        slug: 'porto',
        name: 'Porto',
        region: { en: 'Porto', fr: 'Porto', es: 'Oporto', pt: 'Porto' },
        julyTemp: 23,
        tag: { en: 'Atlantic granite city · Douro river · wine', fr: 'Ville de granit atlantique · Douro · vin', es: 'Ciudad atlántica de granito · Duero · vino', pt: 'Cidade atlântica de granito · Douro · vinho' },
        why: {
          en: 'Porto stays at 23°C in July while Lisbon hits 29°C and Seville 38°C, cooled by Atlantic airflow from the northwest and the Douro valley. The Marginal riverbank (Cais da Ribeira to Freixo, 8 km) is entirely pedestrian and dogs roam freely. The Serralves contemporary art park (18 ha) allows dogs on the full grounds. The Porto metro accepts dogs in carriers. The beaches of Foz do Douro and Matosinhos (3 km from the centre) allow dogs year-round in the mornings.',
          fr: "Porto reste à 23°C en juillet pendant que Lisbonne atteint 29°C et Séville 38°C, refroidie par l'air atlantique du nord-ouest et la vallée du Douro. La marginal du fleuve (Cais da Ribeira à Freixo, 8 km) est entièrement piétonne et les chiens y circulent librement. Le parc d'art contemporain Serralves (18 ha) autorise les chiens sur tout le domaine. Le métro de Porto accepte les chiens en panier. Les plages de Foz do Douro et Matosinhos (3 km du centre) acceptent les chiens toute l'année le matin.",
          es: 'Oporto se mantiene a 23°C en julio mientras Lisboa llega a 29°C y Sevilla a 38°C, refrescada por el flujo atlántico del noroeste y el valle del Duero. El Marginal del río (Cais da Ribeira a Freixo, 8 km) es totalmente peatonal y los perros circulan libremente. El parque de arte contemporáneo Serralves (18 ha) permite perros en todo el recinto.',
          pt: 'Porto mantém-se a 23°C em julho enquanto Lisboa atinge 29°C e Sevilha 38°C, arrefecida pelo fluxo atlântico do noroeste e o vale do Douro. A Marginal do rio (Cais da Ribeira a Freixo, 8 km) é totalmente pedonal e os cães circulam livremente. O parque de arte contemporânea Serralves (18 ha) permite cães em todo o recinto. O metro do Porto aceita cães em caixa de transporte.',
        },
        dogTip: {
          en: 'Parque da Cidade do Porto: the largest urban park in Portugal (83 ha), off-lead zones, direct access to Matosinhos beach (dog-friendly mornings), free entry, 20 min walk from the Serralves museum.',
          fr: 'Parque da Cidade do Porto : le plus grand parc urbain du Portugal (83 ha), zones sans laisse, accès direct à la plage de Matosinhos (dog-friendly le matin), entrée gratuite, 20 min à pied du musée Serralves.',
          es: 'Parque da Cidade do Porto: el mayor parque urbano de Portugal (83 ha), zonas sin correa, acceso directo a la playa de Matosinhos (dog-friendly por la mañana), entrada gratuita, a 20 min a pie del museo Serralves.',
          pt: 'Parque da Cidade do Porto: o maior parque urbano de Portugal (83 ha), zonas sem trela, acesso direto à praia de Matosinhos (dog-friendly de manhã), entrada gratuita, 20 min a pé do museu Serralves.',
        },
        hotels: [
          {
            name: 'The Yeatman',
            stars: 5,
            note: { en: 'Iconic wine hotel above the Douro in Vila Nova de Gaia, vineyard views, small pets accepted.', fr: 'Hôtel viticole iconique au-dessus du Douro à Vila Nova de Gaia, vue sur les vignobles, petits animaux acceptés.', es: 'Icónico hotel vinícola sobre el Duero en Vila Nova de Gaia, vistas a los viñedos, mascotas pequeñas aceptadas.', pt: 'Icónico hotel vínico acima do Douro em Vila Nova de Gaia, vistas para as vinhas, animais pequenos aceites.' },
          },
          {
            name: 'Torel Palace Porto',
            stars: 5,
            note: { en: 'Boutique palace hotel with garden terrace overlooking the city, dogs up to 10 kg welcome.', fr: 'Hôtel boutique avec terrasse-jardin dominant la ville, chiens jusqu\'à 10 kg bienvenus.', es: 'Hotel boutique con terraza-jardín con vistas a la ciudad, perros hasta 10 kg bienvenidos.', pt: 'Hotel boutique com terraço-jardim com vista para a cidade, cães até 10 kg bem-vindos.' },
          },
          {
            name: 'Hotel Infante de Sagres',
            stars: 4,
            note: { en: 'Historic grand hotel in the heart of the city, 5 min walk to the Ribeira, pets accepted.', fr: 'Grand hôtel historique au coeur de la ville, 5 min à pied de la Ribeira, animaux acceptés.', es: 'Gran hotel histórico en el corazón de la ciudad, a 5 min de la Ribeira, mascotas aceptadas.', pt: 'Grande hotel histórico no coração da cidade, 5 min a pé da Ribeira, animais aceites.' },
          },
        ],
      },
    ],
  },
  {
    id: 'costa-verde',
    emoji: '🌊',
    title: { en: 'Costa Verde (Minho coast)', fr: 'Costa Verde (Minho côtier)', es: 'Costa Verde (Miño costero)', pt: 'Costa Verde (Minho litoral)' },
    cities: [
      {
        slug: 'viana-do-castelo',
        name: 'Viana do Castelo',
        region: { en: 'Minho coast', fr: 'Minho côtier', es: 'Miño costero', pt: 'Minho litoral' },
        julyTemp: 22,
        tag: { en: 'Lima river mouth · Atlantic · 22°C', fr: 'Embouchure du Lima · Atlantique · 22°C', es: 'Desembocadura del Lima · Atlántico · 22°C', pt: 'Foz do Lima · Atlântico · 22°C' },
        why: {
          en: 'Viana do Castelo sits where the Lima river meets the Atlantic at 22°C in July, 7°C cooler than Lisbon. The Santa Luzia basilica (hilltop, 200m) is reached by funicular and the plateau has a 5 km off-lead path through pine forest with Atlantic views. The Cabedelo beach (the town beach, south bank of the Lima) allows dogs before 9am and after 6pm in season, and year-round outside July-August. The Lima river cycle path runs 50 km inland through the Minho valley, flat and almost entirely off-lead.',
          fr: "Viana do Castelo est à l'embouchure du Lima avec l'Atlantique à 22°C en juillet, 7°C plus frais que Lisbonne. La basilique de Santa Luzia (sommet de colline, 200m) est accessible par funiculaire et le plateau a un sentier sans laisse de 5 km à travers une forêt de pins avec vue sur l'Atlantique. La plage de Cabedelo (la plage de la ville, rive sud du Lima) accepte les chiens avant 9h et après 18h en saison.",
          es: 'Viana do Castelo está en la desembocadura del Lima con el Atlántico a 22°C en julio, 7°C más fresco que Lisboa. La basílica de Santa Luzia (cima de colina, 200m) se alcanza en funicular y la meseta tiene un sendero sin correa de 5 km a través del bosque de pinos con vistas al Atlántico.',
          pt: 'Viana do Castelo fica na foz do Lima com o Atlântico a 22°C em julho, 7°C mais fresca do que Lisboa. A basílica de Santa Luzia (topo de colina, 200m) é acessível de funicular e o planalto tem um trilho sem trela de 5 km através de floresta de pinheiros com vistas para o Atlântico. A praia do Cabedelo (a praia da cidade) aceita cães antes das 9h e depois das 18h na época.',
        },
        dogTip: {
          en: 'Monte de Santa Luzia forest trails: from the basilica at 200m, 10 km of marked paths through eucalyptus and pine, entirely off-lead, cool even in August, views from Galicia to Esposende.',
          fr: 'Sentiers forestiers du Monte de Santa Luzia : depuis la basilique à 200m, 10 km de chemins balisés à travers eucalyptus et pins, entièrement sans laisse, frais même en août, vue de la Galice à Esposende.',
          es: 'Senderos forestales del Monte de Santa Luzia: desde la basílica a 200m, 10 km de caminos marcados por eucaliptos y pinos, totalmente sin correa, fresco incluso en agosto, vistas desde Galicia hasta Esposende.',
          pt: 'Trilhos florestais do Monte de Santa Luzia: desde a basílica a 200m, 10 km de caminhos marcados através de eucaliptos e pinheiros, totalmente sem trela, fresco mesmo em agosto, vistas da Galiza até Esposende.',
        },
        hotels: [
          {
            name: 'Pousada de Viana do Castelo',
            stars: 4,
            note: { en: 'Historic pousada in a 1920s Art Nouveau building on the Monte de Santa Luzia, panoramic views, dogs accepted.', fr: 'Pousada historique dans un édifice Art Nouveau des années 1920 sur le Monte de Santa Luzia, vues panoramiques, chiens acceptés.', es: 'Histórica pousada en un edificio Art Nouveau de los años 20 en el Monte de Santa Luzia, vistas panorámicas, perros aceptados.', pt: 'Pousada histórica num edifício Art Nouveau dos anos 1920 no Monte de Santa Luzia, vistas panorâmicas, cães aceites.' },
          },
          {
            name: 'Fluviomar Hotel',
            stars: 4,
            note: { en: 'Lima riverside hotel near the marina, modern rooms, pets welcome up to 15 kg.', fr: 'Hôtel en bord du Lima près de la marina, chambres modernes, animaux bienvenus jusqu\'à 15 kg.', es: 'Hotel a orillas del Lima cerca del puerto deportivo, habitaciones modernas, mascotas bienvenidas hasta 15 kg.', pt: 'Hotel à beira do Lima perto da marina, quartos modernos, animais bem-vindos até 15 kg.' },
          },
          {
            name: 'Hotel Viana Heritage',
            stars: 4,
            note: { en: 'Central boutique hotel, 5 min walk to the Lima promenade and market, dog-friendly rooms.', fr: 'Hôtel boutique central, 5 min à pied de la promenade du Lima et du marché, chambres dog-friendly.', es: 'Hotel boutique central, a 5 min del paseo del Lima y el mercado, habitaciones dog-friendly.', pt: 'Hotel boutique central, 5 min a pé do passeio do Lima e do mercado, quartos dog-friendly.' },
          },
        ],
      },
    ],
  },
  {
    id: 'minho-historique',
    emoji: '🏰',
    title: { en: 'Historic Minho', fr: 'Minho historique', es: 'Miño histórico', pt: 'Minho histórico' },
    cities: [
      {
        slug: 'guimaraes',
        name: 'Guimarães',
        region: { en: 'Historic Minho', fr: 'Minho historique', es: 'Miño histórico', pt: 'Minho histórico' },
        julyTemp: 23,
        tag: { en: "Birthplace of Portugal · UNESCO · 23°C", fr: "Berceau du Portugal · UNESCO · 23°C", es: 'Cuna de Portugal · UNESCO · 23°C', pt: 'Berço de Portugal · UNESCO · 23°C' },
        why: {
          en: 'Guimarães is the birthplace of Portugal (first capital in the 12th century) with a UNESCO medieval centre and a 23°C July average thanks to the Serra de Penha massif (600m) that blocks southern heat. The entire old town is pedestrianised. The Penha mountain (548m, cable car from the city) is a 15 km off-lead trail network through granite boulders and oak forest. The Citânia de Briteiros Celtic hillfort (10 km north) has a 3 km off-lead archaeological trail.',
          fr: "Guimarães est le berceau du Portugal (première capitale au XIIe siècle) avec un centre médiéval UNESCO et une moyenne de 23°C en juillet grâce au massif de la Serra de Penha (600m) qui bloque la chaleur du sud. Tout le centre historique est piétonnier. La montagne de Penha (548m, téléphérique depuis la ville) est un réseau de 15 km de sentiers sans laisse à travers des rochers de granit et une forêt de chênes.",
          es: 'Guimarães es la cuna de Portugal (primera capital en el siglo XII) con un centro medieval UNESCO y una media de 23°C en julio gracias al macizo de la Serra de Penha (600m) que bloquea el calor del sur. Todo el casco histórico está peatonalizado. La montaña de Penha (548m, teleférico desde la ciudad) es una red de 15 km de senderos sin correa.',
          pt: 'Guimarães é o berço de Portugal (primeira capital no séc. XII) com um centro medieval UNESCO e uma média de 23°C em julho graças ao maciço da Serra de Penha (600m) que bloqueia o calor do sul. Todo o centro histórico está pedonalizado. A montanha de Penha (548m, teleférico desde a cidade) é uma rede de 15 km de trilhos sem trela através de penedos de granito e floresta de carvalhos.',
        },
        dogTip: {
          en: 'Serra de Penha cable car: 10 min ride from the city, arrive at 548m, 15 km of granite boulder trails off-lead, a Sanctuary chapel, cool all summer, dogs travel for free in the gondola.',
          fr: "Téléphérique de la Serra de Penha : 10 min depuis la ville, arrivée à 548m, 15 km de sentiers de rochers de granit sans laisse, une chapelle-sanctuaire, frais tout l'été, les chiens voyagent gratuitement dans la cabine.",
          es: 'Teleférico de la Serra de Penha: 10 min desde la ciudad, llegada a 548m, 15 km de senderos de rocas de granito sin correa, una capilla-santuario, fresco todo el verano, los perros viajan gratis en la cabina.',
          pt: 'Teleférico da Serra de Penha: 10 min desde a cidade, chegada a 548m, 15 km de trilhos de penedos de granito sem trela, uma capela-santuário, fresco durante todo o verão, os cães viajam de graça na cabine.',
        },
        hotels: [
          {
            name: 'Pousada de Guimarães',
            stars: 4,
            note: { en: 'National pousada in a converted 12th-century convent adjacent to the castle, dogs accepted.', fr: 'Pousada nationale dans un couvent du XIIe siècle converti adjacent au château, chiens acceptés.', es: 'Pousada nacional en un convento del siglo XII convertido junto al castillo, perros aceptados.', pt: 'Pousada nacional num convento do séc. XII convertido adjacente ao castelo, cães aceites.' },
          },
          {
            name: 'Hotel de Guimarães',
            stars: 4,
            note: { en: 'Modern hotel near the historic centre, walking distance to the cable car, pets up to 15 kg welcome.', fr: 'Hôtel moderne près du centre historique, à pied du téléphérique, animaux jusqu\'à 15 kg bienvenus.', es: 'Hotel moderno cerca del centro histórico, a pie del teleférico, mascotas hasta 15 kg bienvenidas.', pt: 'Hotel moderno perto do centro histórico, a pé do teleférico, animais até 15 kg bem-vindos.' },
          },
          {
            name: 'Casa de Sezim',
            stars: 4,
            note: { en: 'Manor house estate with vineyard 5 km south of the city, large grounds, dogs welcome.', fr: 'Domaine manorial avec vignoble à 5 km au sud de la ville, grands espaces, chiens bienvenus.', es: 'Casa señorial con viñedo a 5 km al sur de la ciudad, amplios espacios, perros bienvenidos.', pt: 'Solar com vinha a 5 km a sul da cidade, grandes espaços exteriores, cães bem-vindos.' },
          },
        ],
      },
      {
        slug: 'braga',
        name: 'Braga',
        region: { en: 'Historic Minho', fr: 'Minho historique', es: 'Miño histórico', pt: 'Minho histórico' },
        julyTemp: 24,
        tag: { en: 'Rome of Portugal · Bom Jesus · university', fr: 'Rome du Portugal · Bom Jesus · université', es: 'Roma de Portugal · Bom Jesus · universidad', pt: 'Roma de Portugal · Bom Jesus · universidade' },
        why: {
          en: 'Braga is Portugal\'s religious capital and oldest city, at 190m with a consistent Atlantic-influenced breeze that keeps July at 24°C. The Bom Jesus do Monte sanctuary (580m, 6 km from the centre) is a UNESCO pilgrimage site: the baroque staircase and surrounding forest are off-lead. Parque do Bom Jesus (12 ha of woodland) accepts dogs. The university quarter is full of café terraces. Braga has the most vibrant dog culture of any Portuguese city outside Lisbon and Porto.',
          fr: "Braga est la capitale religieuse et la plus ancienne ville du Portugal, à 190m avec une brise atlantique constante qui maintient juillet à 24°C. Le sanctuaire de Bom Jesus do Monte (580m, 6 km du centre) est un site UNESCO de pèlerinage : l'escalier baroque et la forêt environnante sont sans laisse. Le Parque do Bom Jesus (12 ha de bois) accepte les chiens. Le quartier universitaire est plein de terrasses de cafés. Braga a la culture canine la plus vivante de toutes les villes portugaises hors Lisbonne et Porto.",
          es: 'Braga es la capital religiosa y la ciudad más antigua de Portugal, a 190m con una brisa atlántica constante que mantiene julio a 24°C. El santuario de Bom Jesus do Monte (580m, a 6 km del centro) es un sitio UNESCO de peregrinación: la escalera barroca y el bosque circundante son sin correa. El Parque do Bom Jesus (12 ha de arbolado) acepta perros.',
          pt: 'Braga é a capital religiosa e a cidade mais antiga de Portugal, a 190m com uma brisa atlântica constante que mantém julho a 24°C. O santuário de Bom Jesus do Monte (580m, 6 km do centro) é um local de peregrinação UNESCO: a escadaria barroca e a floresta envolvente são sem trela. O Parque do Bom Jesus (12 ha de arvoredo) aceita cães.',
        },
        dogTip: {
          en: 'Parque do Bom Jesus: 12 ha of forest surrounding the sanctuary at 350m, dogs off-lead on all paths, a lake, picnic areas and fountains, 15°C cooler than central Braga on a summer afternoon.',
          fr: 'Parque do Bom Jesus : 12 ha de forêt entourant le sanctuaire à 350m, chiens sans laisse sur tous les chemins, un lac, des aires de pique-nique et des fontaines, 15°C plus frais que le centre de Braga un après-midi d\'été.',
          es: 'Parque do Bom Jesus: 12 ha de bosque rodeando el santuario a 350m, perros sin correa en todos los caminos, un lago, áreas de picnic y fuentes, 15°C más fresco que el centro de Braga en una tarde de verano.',
          pt: 'Parque do Bom Jesus: 12 ha de floresta envolvendo o santuário a 350m, cães sem trela em todos os caminhos, um lago, áreas de piquenique e fontes, 15°C mais fresco do que o centro de Braga numa tarde de verão.',
        },
        hotels: [
          {
            name: 'Meliá Braga',
            stars: 5,
            note: { en: 'Modern tower hotel next to the Forum Braga, rooftop pool, small pets accepted.', fr: 'Hôtel tour moderne près du Forum Braga, piscine sur le toit, petits animaux acceptés.', es: 'Hotel torre moderno junto al Forum Braga, piscina en la azotea, mascotas pequeñas aceptadas.', pt: 'Hotel torre moderno junto ao Forum Braga, piscina no telhado, animais pequenos aceites.' },
          },
          {
            name: 'Hotel do Parque',
            stars: 4,
            note: { en: 'Directly facing the Bom Jesus park and sanctuary, dogs accepted up to 15 kg, ideal for morning hikes.', fr: 'Face au parc et sanctuaire du Bom Jesus, chiens acceptés jusqu\'à 15 kg, idéal pour les randonnées matinales.', es: 'Frente al parque y santuario de Bom Jesus, perros aceptados hasta 15 kg, ideal para excursiones matinales.', pt: 'Em frente ao parque e santuário do Bom Jesus, cães aceites até 15 kg, ideal para caminhadas matinais.' },
          },
          {
            name: 'Hotel do Templo',
            stars: 4,
            note: { en: 'Boutique hotel steps from the Bom Jesus stairs, peaceful location, dog-friendly policy.', fr: 'Hôtel boutique à deux pas des escaliers du Bom Jesus, emplacement paisible, politique dog-friendly.', es: 'Hotel boutique a dos pasos de las escaleras del Bom Jesus, ubicación tranquila, política dog-friendly.', pt: 'Hotel boutique a dois passos das escadarias do Bom Jesus, localização tranquila, política dog-friendly.' },
          },
        ],
      },
    ],
  },
  {
    id: 'peneda-geres',
    emoji: '🌿',
    title: { en: 'Peneda-Gerês National Park', fr: 'Parc National Peneda-Gerês', es: 'Parque Nacional Peneda-Gerês', pt: 'Parque Nacional Peneda-Gerês' },
    cities: [
      {
        slug: 'arcos-de-valdevez',
        name: 'Arcos de Valdevez',
        region: { en: 'Peneda-Gerês', fr: 'Peneda-Gerês', es: 'Peneda-Gerês', pt: 'Peneda-Gerês' },
        julyTemp: 22,
        tag: { en: 'Park gateway · Vez river · 22°C', fr: 'Porte du parc · río Vez · 22°C', es: 'Puerta del parque · río Vez · 22°C', pt: 'Porta do parque · rio Vez · 22°C' },
        why: {
          en: 'Arcos de Valdevez is the quieter western gateway to the Peneda-Gerês National Park, Portugal\'s only national park and one of the least crowded in western Europe. The Vez river runs through the town centre and has three swimming holes (poços) where dogs swim freely. The park begins 8 km north: granite highlands at 1,100m, ancient Soajo granary villages, wolf and eagle habitat. Almost all paths within the park allow dogs on a lead. Outside the core protected zones, dogs are off-lead.',
          fr: "Arcos de Valdevez est la porte d'entrée ouest la plus calme du Parc National Peneda-Gerês, le seul parc national du Portugal et l'un des moins fréquentés d'Europe occidentale. Le río Vez traverse le centre-ville et compte trois zones de baignade (poços) où les chiens nagent librement. Le parc commence à 8 km au nord : hauts plateaux de granit à 1 100m, villages ancestraux de granges de Soajo, habitats de loups et d'aigles.",
          es: 'Arcos de Valdevez es la puerta de entrada oeste más tranquila al Parque Nacional Peneda-Gerês, el único parque nacional de Portugal y uno de los menos concurridos de Europa occidental. El río Vez atraviesa el centro de la ciudad y tiene tres zonas de baño (poços) donde los perros nadan libremente. El parque comienza a 8 km al norte: altiplanos de granito a 1.100m, aldeas ancestrales de hórreos de Soajo.',
          pt: 'Arcos de Valdevez é a porta de entrada oeste mais tranquila para o Parque Nacional Peneda-Gerês, o único parque nacional de Portugal e um dos menos frequentados da Europa ocidental. O rio Vez atravessa o centro da cidade e tem três poços onde os cães nadam livremente. O parque começa a 8 km a norte: planaltos de granito a 1.100m, aldeias ancestrais de espigueiros de Soajo, habitat de lobos e águias.',
        },
        dogTip: {
          en: 'Soajo granary village (10 km north): park at the village entrance, walk 3 km to the espigueiros (18th-century granite granaries on stilts), dogs off-lead, almost no tourists outside weekends, the most photographed village in northern Portugal.',
          fr: "Village des espigueiros de Soajo (10 km au nord) : garez-vous à l'entrée du village, marchez 3 km jusqu'aux espigueiros (greniers de granit du XVIIIe siècle sur pilotis), chiens sans laisse, presque pas de touristes en dehors des week-ends, le village le plus photographié du nord du Portugal.",
          es: 'Aldea de los espigueiros de Soajo (10 km al norte): aparca en la entrada del pueblo, camina 3 km hasta los espigueiros (graneros de granito del siglo XVIII sobre pilotes), perros sin correa, casi sin turistas fuera de los fines de semana.',
          pt: 'Aldeia dos espigueiros de Soajo (10 km a norte): estacionar à entrada da aldeia, caminhar 3 km até aos espigueiros (celeiros de granito do séc. XVIII sobre pilares), cães sem trela, quase sem turistas fora dos fins de semana.',
        },
        hotels: [
          {
            name: 'Quinta do Burgo',
            stars: 4,
            note: { en: 'Rural tourism estate on the Vez riverbank, large grounds, dogs welcome of any size.', fr: 'Domaine de tourisme rural au bord du Vez, grands espaces, chiens bienvenus de toute taille.', es: 'Finca de turismo rural a orillas del Vez, amplios espacios, perros bienvenidos de cualquier tamaño.', pt: 'Quinta de turismo rural à beira do Vez, grandes espaços exteriores, cães bem-vindos de qualquer tamanho.' },
          },
          {
            name: 'Convento dos Capuchos',
            stars: 4,
            note: { en: 'Converted 17th-century convent with garden and pool, 5 km from the park entrance, pets accepted.', fr: 'Couvent du XVIIe siècle converti avec jardin et piscine, 5 km de l\'entrée du parc, animaux acceptés.', es: 'Convento del siglo XVII convertido con jardín y piscina, a 5 km de la entrada del parque, mascotas aceptadas.', pt: 'Convento do séc. XVII convertido com jardim e piscina, 5 km da entrada do parque, animais aceites.' },
          },
          {
            name: 'Hotel do Soajo',
            stars: 3,
            note: { en: 'Simple mountain hotel in the village of Soajo inside the park, dogs accepted, local food.', fr: 'Hôtel de montagne simple dans le village de Soajo à l\'intérieur du parc, chiens acceptés, cuisine locale.', es: 'Sencillo hotel de montaña en el pueblo de Soajo dentro del parque, perros aceptados, cocina local.', pt: 'Hotel de montanha simples na aldeia de Soajo dentro do parque, cães aceites, comida local.' },
          },
        ],
      },
    ],
  },
  {
    id: 'costa-vicentina',
    emoji: '🌊',
    title: { en: 'Costa Vicentina', fr: 'Costa Vicentina', es: 'Costa Vicentina', pt: 'Costa Vicentina' },
    cities: [
      {
        slug: 'sagres',
        name: 'Sagres',
        region: { en: 'Costa Vicentina', fr: 'Costa Vicentina', es: 'Costa Vicentina', pt: 'Costa Vicentina' },
        julyTemp: 20,
        tag: { en: 'Coldest Atlantic coast · wild cliffs · 20°C', fr: 'Côte atlantique la plus froide · falaises sauvages · 20°C', es: 'Costa atlántica más fría · acantilados salvajes · 20°C', pt: 'Costa atlântica mais fria · falésias selvagens · 20°C' },
        why: {
          en: 'Sagres and the Costa Vicentina are the coolest coastal area in mainland Portugal at 20°C in July, cooled by the Canary Current (the same cold Atlantic upwelling that keeps the Canary Islands mild). The Costa Vicentina is Europe\'s last wild Atlantic coastline: 100 km of protected coast with almost no buildings, 90% of beaches allow dogs year-round with no restrictions (no seasonal ban), and 75 km of cliff-top paths off-lead. The Parque Natural do Sudoeste Alentejano has fewer dog rules than almost anywhere in Europe.',
          fr: "Sagres et la Costa Vicentina sont la zone côtière la plus fraîche du Portugal continental à 20°C en juillet, refroidie par le Courant des Canaries, le même upwelling atlantique froid qui maintient les Canaries clémentes. La Costa Vicentina est la dernière côte atlantique sauvage d'Europe : 100 km de côtes protégées avec presque aucune construction, 90% des plages acceptent les chiens toute l'année sans restriction (pas d'interdiction saisonnière), et 75 km de sentiers en bord de falaise sans laisse.",
          es: 'Sagres y la Costa Vicentina son la zona costera más fresca de Portugal continental a 20°C en julio, refrescada por la Corriente de Canarias. La Costa Vicentina es la última costa atlántica salvaje de Europa: 100 km de costa protegida con casi ninguna construcción, el 90% de las playas permiten perros todo el año sin restricciones, y 75 km de senderos en lo alto de los acantilados sin correa.',
          pt: 'Sagres e a Costa Vicentina são a zona costeira mais fresca de Portugal continental a 20°C em julho, arrefecida pela Corrente das Canárias. A Costa Vicentina é a última costa atlântica selvagem da Europa: 100 km de costa protegida com quase nenhuma construção, 90% das praias permitem cães durante todo o ano sem restrições, e 75 km de trilhos no topo das falésias sem trela.',
        },
        dogTip: {
          en: 'Praia do Castelejo (5 km north of Sagres): wild beach hemmed in by 80m cliffs, dogs off-lead year-round, accessible only by a 500m path from the car park, almost always uncrowded even in August.',
          fr: 'Praia do Castelejo (5 km au nord de Sagres) : plage sauvage encadrée par des falaises de 80m, chiens sans laisse toute l\'année, accessible uniquement par un chemin de 500m depuis le parking, presque toujours peu fréquentée même en août.',
          es: 'Praia do Castelejo (5 km al norte de Sagres): playa salvaje encajonada entre acantilados de 80m, perros sin correa todo el año, accesible solo por un camino de 500m desde el aparcamiento, casi siempre poco frecuentada incluso en agosto.',
          pt: 'Praia do Castelejo (5 km a norte de Sagres): praia selvagem encaixada entre falésias de 80m, cães sem trela durante todo o ano, acessível apenas por um caminho de 500m desde o parque de estacionamento, quase sempre pouco frequentada mesmo em agosto.',
        },
        hotels: [
          {
            name: 'Martinhal Sagres Beach Family Resort',
            stars: 5,
            note: { en: 'Award-winning resort with private beach, villas and suites, dogs of all sizes accepted.', fr: 'Resort primé avec plage privée, villas et suites, chiens de toute taille acceptés.', es: 'Resort premiado con playa privada, villas y suites, perros de cualquier tamaño aceptados.', pt: 'Resort premiado com praia privada, vilas e suites, cães de qualquer tamanho aceites.' },
          },
          {
            name: 'Memmo Baleeira',
            stars: 4,
            note: { en: 'Design hotel above Sagres harbour, sea views from every room, pets welcome.', fr: 'Hôtel design au-dessus du port de Sagres, vue mer depuis chaque chambre, animaux bienvenus.', es: 'Hotel de diseño sobre el puerto de Sagres, vistas al mar desde cada habitación, mascotas bienvenidas.', pt: 'Hotel de design acima do porto de Sagres, vista para o mar de todos os quartos, animais bem-vindos.' },
          },
          {
            name: 'Orquidea Aparthotel',
            stars: 3,
            note: { en: 'Affordable self-catering apartments near the village, quiet, dogs accepted of any size.', fr: 'Appartements en location avec cuisine abordables près du village, calme, chiens acceptés de toute taille.', es: 'Apartamentos asequibles con cocina cerca del pueblo, tranquilo, perros aceptados de cualquier tamaño.', pt: 'Apartamentos acessíveis com cozinha perto da aldeia, tranquilo, cães aceites de qualquer tamanho.' },
          },
        ],
      },
    ],
  },
]

const T = {
  title: {
    en: 'Best Cities to Escape the Heat in Portugal with Your Dog (2026)',
    fr: 'Meilleures villes pour éviter la chaleur au Portugal avec son chien (2026)',
    es: 'Mejores ciudades para evitar el calor en Portugal con tu perro (2026)',
    pt: 'Melhores cidades para evitar o calor em Portugal com o seu cão (2026)',
  },
  metaTitle: {
    en: 'Cool Portugal with Your Dog: 6 Cities Under 24°C in July (2026)',
    fr: 'Portugal frais avec son chien : 6 villes sous 24°C en juillet (2026)',
    es: 'Portugal fresco con tu perro: 6 ciudades con menos de 24°C en julio (2026)',
    pt: 'Portugal fresco com o seu cão: 6 cidades abaixo de 24°C em julho (2026)',
  },
  metaDesc: {
    en: 'While Lisbon hits 29°C and the Algarve 31°C, northern Portugal and the Atlantic coast stay cool. Porto, Viana do Castelo, Guimarães, Braga, Peneda-Gerês, Sagres: 6 dog-friendly cities under 24°C in July.',
    fr: "Pendant que Lisbonne atteint 29°C et l'Algarve 31°C, le nord du Portugal et la côte atlantique restent frais. Porto, Viana do Castelo, Guimarães, Braga, Peneda-Gerês, Sagres : 6 villes dog-friendly sous 24°C en juillet.",
    es: 'Mientras Lisboa llega a 29°C y el Algarve a 31°C, el norte de Portugal y la costa atlántica se mantienen frescos. Oporto, Viana do Castelo, Guimarães, Braga, Peneda-Gerês, Sagres: 6 ciudades dog-friendly con menos de 24°C en julio.',
    pt: 'Enquanto Lisboa atinge 29°C e o Algarve 31°C, o norte de Portugal e a costa atlântica mantêm-se frescos. Porto, Viana do Castelo, Guimarães, Braga, Peneda-Gerês, Sagres: 6 cidades dog-friendly abaixo de 24°C em julho.',
  },
  intro: {
    en: 'Lisbon reaches 29°C in July, the Algarve 31°C. But northern Portugal (Minho, Douro) stays at 22-24°C thanks to Atlantic airflow, and the Costa Vicentina coastline drops to 20°C due to the Canary Current. These 6 destinations offer genuine Portuguese character without the summer heat.',
    fr: "Lisbonne atteint 29°C en juillet, l'Algarve 31°C. Mais le nord du Portugal (Minho, Douro) reste à 22-24°C grâce à la circulation atlantique, et la Costa Vicentina descend à 20°C sous l'effet du Courant des Canaries. Ces 6 destinations offrent un caractère portugais authentique sans la chaleur estivale.",
    es: 'Lisboa alcanza los 29°C en julio, el Algarve 31°C. Pero el norte de Portugal (Miño, Duero) se mantiene a 22-24°C gracias a la circulación atlántica, y la Costa Vicentina baja a 20°C por efecto de la Corriente de Canarias. Estas 6 ciudades ofrecen carácter portugués genuino sin el calor estival.',
    pt: 'Lisboa atinge 29°C em julho, o Algarve 31°C. Mas o norte de Portugal (Minho, Douro) mantém-se a 22-24°C graças à circulação atlântica, e a Costa Vicentina desce a 20°C devido à Corrente das Canárias. Estas 6 cidades oferecem caráter português genuíno sem o calor do verão.',
  },
  julyTemp: { en: 'July avg high', fr: 'Max moy. juillet', es: 'Máx. prom. julio', pt: 'Máx. méd. julho' },
  seeHotels: { en: 'All pet-friendly hotels', fr: 'Tous les hôtels pet-friendly', es: 'Todos los hoteles pet-friendly', pt: 'Todos os hotéis pet-friendly' },
  hotelsLabel: { en: 'Our hotel picks', fr: 'Nos hôtels recommandés', es: 'Nuestros hoteles recomendados', pt: 'Os nossos hotéis recomendados' },
  dogTipLabel: { en: 'Dog tip', fr: 'Conseil chien', es: 'Consejo para tu perro', pt: 'Dica para o seu cão' },
  breadHome: { en: 'Home', fr: 'Accueil', es: 'Inicio', pt: 'Início' },
  breadGuides: { en: 'Guides', fr: 'Guides', es: 'Guías', pt: 'Guias' },
  faq: {
    q1: { en: 'Which Portuguese cities stay cool in summer?', fr: 'Quelles villes portugaises restent fraîches en été ?', es: '¿Qué ciudades portuguesas permanecen frescas en verano?', pt: 'Que cidades portuguesas se mantêm frescas no verão?' },
    a1: {
      en: 'The coolest mainland Portuguese cities are in the Minho (northwest): Viana do Castelo (22°C), Arcos de Valdevez (22°C), Guimarães (23°C), Porto (23°C), Braga (24°C). The Costa Vicentina (southwest cape) is the coldest coastal area at 20°C due to the Canary Current. Lisbon (29°C), the Alentejo coast (28°C), and the Algarve (30-32°C) are significantly hotter. The Azores (Ponta Delgada, 24°C) and Madeira (Funchal, 26°C) are warm but always oceanic.',
      fr: "Les villes portugaises continentales les plus fraîches se trouvent dans le Minho (nord-ouest) : Viana do Castelo (22°C), Arcos de Valdevez (22°C), Guimarães (23°C), Porto (23°C), Braga (24°C). La Costa Vicentina (cap sud-ouest) est la zone côtière la plus froide à 20°C grâce au Courant des Canaries. Lisbonne (29°C), la côte alentejane (28°C) et l'Algarve (30-32°C) sont nettement plus chaudes.",
      es: 'Las ciudades portuguesas continentales más frescas están en el Miño (noroeste): Viana do Castelo (22°C), Arcos de Valdevez (22°C), Guimarães (23°C), Oporto (23°C), Braga (24°C). La Costa Vicentina (cabo suroeste) es la zona costera más fría a 20°C gracias a la Corriente de Canarias. Lisboa (29°C), la costa alentejana (28°C) y el Algarve (30-32°C) son significativamente más cálidas.',
      pt: 'As cidades portuguesas continentais mais frescas estão no Minho (noroeste): Viana do Castelo (22°C), Arcos de Valdevez (22°C), Guimarães (23°C), Porto (23°C), Braga (24°C). A Costa Vicentina (cabo sudoeste) é a zona costeira mais fria a 20°C devido à Corrente das Canárias. Lisboa (29°C), a costa alentejana (28°C) e o Algarve (30-32°C) são significativamente mais quentes.',
    },
    q2: { en: 'Are dogs allowed on Portuguese beaches?', fr: 'Les chiens sont-ils autorisés sur les plages portugaises ?', es: '¿Se permiten perros en las playas portuguesas?', pt: 'São permitidos cães nas praias portuguesas?' },
    a2: {
      en: 'Portuguese beach rules vary by municipality. In general: Algarve and Lisbon area beaches prohibit dogs on bathing beaches from June to September. Northern Portugal (Minho coast, Porto area) is more permissive: most beaches allow dogs with a lead, and many have no restrictions at all outside July-August peak. Costa Vicentina: 90% of beaches have no seasonal dog ban at any time of year. The law (DL 309/93) allows dogs on beaches outside the bathing season, but municipal beach rules (regulamento de praia) define the bathing season dates and any year-round restrictions. Always check the specific beach\'s rules before visiting.',
      fr: "Les règles pour les plages portugaises varient selon les communes. En général : les plages de l'Algarve et de la région de Lisbonne interdisent les chiens sur les plages de baignade de juin à septembre. Le nord du Portugal (côte du Minho, région de Porto) est plus permissif : la plupart des plages acceptent les chiens en laisse. Costa Vicentina : 90% des plages n'ont pas d'interdiction saisonnière pour les chiens. La loi (DL 309/93) autorise les chiens sur les plages hors saison de baignade, mais les règlements municipaux définissent les dates de la saison. Vérifiez toujours les règles de la plage spécifique avant de visiter.",
      es: 'Las normas de las playas portuguesas varían según el municipio. En general: las playas del Algarve y la región de Lisboa prohíben los perros en las playas de baño de junio a septiembre. El norte de Portugal (costa del Miño, zona de Oporto) es más permisivo. Costa Vicentina: el 90% de las playas no tienen prohibición estacional para perros. Comprueba siempre las normas de la playa específica antes de visitarla.',
      pt: 'As regras das praias portuguesas variam por município. Em geral: as praias do Algarve e da região de Lisboa proibem cães nas praias de banho de junho a setembro. O norte de Portugal (costa do Minho, zona do Porto) é mais permissivo. Costa Vicentina: 90% das praias não têm proibição sazonal para cães. Verifique sempre as regras da praia específica antes de visitar.',
    },
    q3: { en: 'How do I travel by train in Portugal with a dog?', fr: 'Comment voyager en train au Portugal avec un chien ?', es: '¿Cómo viajar en tren en Portugal con un perro?', pt: 'Como viajar de comboio em Portugal com um cão?' },
    a3: {
      en: 'CP (Comboios de Portugal) rules: dogs under 8 kg in a carrier travel free. Dogs 8 kg and above: accepted on Regional and Intercidades trains at 50% of the adult fare, on a lead with a muzzle. Alfa Pendular (high-speed): dogs in carriers under 8 kg only. Porto to Viana do Castelo: 1h10 by Regional train (hourly, dogs accepted). Porto to Braga: 1h by Regional (dogs accepted). Porto to Guimarães: 1h by Metro-Sul do Tejo then suburban (dogs in carriers). Lisbon to Porto: 3h by Alfa Pendular (small dogs in carrier only), or 3h30 by Intercidades (larger dogs accepted with lead + muzzle).',
      fr: "Règles CP (Comboios de Portugal) : chiens de moins de 8 kg en panier, gratuit. Chiens de 8 kg et plus : acceptés dans les trains Regional et Intercidades à 50% du tarif adulte, en laisse avec muselière. Alfa Pendular (grande vitesse) : chiens en panier de moins de 8 kg uniquement. Porto-Viana do Castelo : 1h10 en train Regional (toutes les heures, chiens acceptés). Porto-Braga : 1h en Regional. Lisbonne-Porto : 3h en Alfa Pendular (petits chiens en panier uniquement) ou 3h30 en Intercidades (grands chiens acceptés en laisse + muselière).",
      es: 'Normas CP (Comboios de Portugal): perros menores de 8 kg en transportín, gratis. Perros de 8 kg en adelante: aceptados en trenes Regional e Intercidades al 50% de la tarifa adulta, con correa y bozal. Alfa Pendular (alta velocidad): solo perros en transportín menores de 8 kg. Oporto-Viana do Castelo: 1h10 en tren Regional (cada hora, perros aceptados). Lisboa-Oporto: 3h en Alfa Pendular (solo perros pequeños en transportín).',
      pt: 'Regras CP (Comboios de Portugal): cães abaixo de 8 kg em caixa de transporte, gratuito. Cães de 8 kg acima: aceites em comboios Regional e Intercidades a 50% da tarifa adulta, com trela e focinheira. Alfa Pendular (alta velocidade): apenas cães em caixa abaixo de 8 kg. Porto-Viana do Castelo: 1h10 em comboio Regional (de hora a hora, cães aceites). Lisboa-Porto: 3h em Alfa Pendular (apenas cães pequenos em caixa) ou 3h30 em Intercidades (cães maiores aceites com trela + focinheira).',
    },
    q4: { en: 'Are dogs welcome in Portuguese restaurants and cafés?', fr: 'Les chiens sont-ils bienvenus dans les restaurants et cafés portugais ?', es: '¿Son bienvenidos los perros en los restaurantes y cafés portugueses?', pt: 'Os cães são bem-vindos nos restaurantes e cafés portugueses?' },
    a4: {
      en: 'Portugal has one of the most relaxed dog cultures in Europe. Terrace (esplanada) dining: dogs are accepted almost universally. Inside restaurants: the law allows it at the owner\'s discretion, and in practice dogs are welcome inside in the majority of tascas, cervejarias and traditional restaurants, especially outside Lisbon and Porto city centres. Northern Portugal (Minho, Trás-os-Montes) is particularly open. Cafés (pastelarias) almost always welcome dogs. The phrase "posso entrar com o meu cão?" (may I enter with my dog?) is rarely met with a refusal.',
      fr: "Le Portugal a l'une des cultures canines les plus décontractées d'Europe. Repas en terrasse (esplanada) : les chiens sont acceptés presque universellement. À l'intérieur : la loi l'autorise à la discrétion du patron, et en pratique les chiens sont bienvenus à l'intérieur dans la majorité des tascas, cervejarias et restaurants traditionnels, surtout hors des centres de Lisbonne et Porto. Le nord du Portugal (Minho, Trás-os-Montes) est particulièrement ouvert. Les cafés (pastelarias) accueillent presque toujours les chiens.",
      es: 'Portugal tiene una de las culturas caninas más relajadas de Europa. Cenas en terraza (esplanada): los perros son aceptados casi universalmente. En el interior: la ley lo permite a discreción del propietario, y en la práctica los perros son bienvenidos en la mayoría de tascas, cervejarias y restaurantes tradicionales, especialmente fuera de los centros de Lisboa y Oporto. El norte de Portugal (Miño, Trás-os-Montes) es particularmente abierto.',
      pt: 'Portugal tem uma das culturas caninas mais descontraídas da Europa. Refeições em esplanada: os cães são aceites quase universalmente. No interior: a lei permite à discrição do proprietário, e na prática os cães são bem-vindos na maioria das tascas, cervejarias e restaurantes tradicionais, especialmente fora dos centros de Lisboa e Porto. O norte de Portugal (Minho, Trás-os-Montes) é particularmente aberto.',
    },
    q5: { en: 'Can dogs hike in Peneda-Gerês National Park?', fr: 'Les chiens peuvent-ils randonner dans le Parc National Peneda-Gerês ?', es: '¿Pueden los perros hacer senderismo en el Parque Nacional Peneda-Gerês?', pt: 'Os cães podem fazer trilhos no Parque Nacional Peneda-Gerês?' },
    a5: {
      en: 'Yes, with important nuances. Peneda-Gerês is Portugal\'s only national park and dogs are allowed on most trails, but a lead is required within the park boundaries. Outside the core protected zones (most of the Minho valley approaches, the Vez valley), dogs can be off-lead. Key trails that allow dogs on lead: Trilho das Pedras Boroas (Soajo, 6 km), Trilho do Rio Homem (Caldas do Gerês, 8 km), Trilho do Albergaria (ancient road, 5 km). The park has wolves. Keep dogs close on leads at dawn and dusk. Swimming holes (poços) within the park allow dogs. Rangers rarely issue warnings for well-controlled dogs on leads.',
      fr: "Oui, avec des nuances importantes. Peneda-Gerês est le seul parc national du Portugal et les chiens sont autorisés sur la plupart des sentiers, mais une laisse est obligatoire dans les limites du parc. Hors des zones centrales protégées, les chiens peuvent être sans laisse. Sentiers clés qui autorisent les chiens en laisse : Trilho das Pedras Boroas (Soajo, 6 km), Trilho do Rio Homem (Caldas do Gerês, 8 km), Trilho do Albergaria (ancienne voie romaine, 5 km). Le parc abrite des loups : gardez les chiens en laisse à l'aube et au crépuscule. Les zones de baignade (poços) dans le parc autorisent les chiens.",
      es: 'Sí, con matices importantes. Peneda-Gerês es el único parque nacional de Portugal y los perros están permitidos en la mayoría de los senderos, pero se requiere correa dentro de los límites del parque. Fuera de las zonas centrales protegidas, los perros pueden estar sin correa. Senderos clave que permiten perros con correa: Trilho das Pedras Boroas (Soajo, 6 km), Trilho do Rio Homem (Caldas do Gerês, 8 km). El parque tiene lobos: mantén a los perros cerca con correa al amanecer y al anochecer.',
      pt: 'Sim, com nuances importantes. Peneda-Gerês é o único parque nacional de Portugal e os cães são permitidos na maioria dos trilhos, mas é obrigatória trela dentro dos limites do parque. Fora das zonas centrais protegidas, os cães podem estar sem trela. Trilhos-chave que permitem cães com trela: Trilho das Pedras Boroas (Soajo, 6 km), Trilho do Rio Homem (Caldas do Gerês, 8 km), Trilho do Albergaria (antiga via romana, 5 km). O parque tem lobos: mantenha os cães perto com trela ao amanhecer e ao anoitecer.',
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

export default async function PortugalFraicheChienPage({ params }: { params: Promise<{ locale: string }> }) {
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
      <section className="bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="text-white/60 text-xs mb-4">
            <Link href={`/${locale}`} className="hover:text-white">{p(T.breadHome, locale)}</Link>
            <span className="mx-1.5">/</span>
            <Link href={`/${locale}/guides`} className="hover:text-white">{p(T.breadGuides, locale)}</Link>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-emerald-200 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            🇵🇹 {locale === 'fr' ? 'Minho · Douro · Costa Vicentina' : locale === 'es' ? 'Miño · Duero · Costa Vicentina' : locale === 'pt' ? 'Minho · Douro · Costa Vicentina' : 'Minho · Douro · Costa Vicentina'}
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
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 text-sm font-black flex items-center justify-center">
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
                      <div className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
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
                        href={buildAllezDestLink(city.name, 'Portugal', `${CAMPAIGN}-${city.slug}`, 3)}
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
