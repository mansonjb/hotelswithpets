import type { Metadata } from 'next'
import Link from 'next/link'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'escape-heat-dog-europe-2026'
const CAMPAIGN = 'escape-heat'

type L4 = { en: string; fr: string; es: string; pt: string }
type Dest = {
  slug: string
  name: string
  country: string
  countryCode: string
  julyTemp: number
  tag: L4
  why: L4
}
type Category = {
  id: string
  emoji: string
  title: L4
  intro: L4
  destinations: Dest[]
}

// Categories ordered by revenue signal from June 2026 transactions:
// 1. Atlantic / North Sea: Neringa €15.73 (NO user), beaches campaign = top converter
// 2. Mountain: Feldkirchen Kärnten €2.34, Innsbruck, Alpine bookings consistent
// 3. Forest & Lakes: same Alpine zone, strong DE user bookings
// 4. Cool Northern Cities: Tyssedal NO €2.77, Bergen consistent
const CATEGORIES: Category[] = [
  {
    id: 'atlantic',
    emoji: '🌊',
    title: {
      en: 'Atlantic & North Sea Coast',
      fr: 'Côtes Atlantique & Mer du Nord',
      es: 'Costa Atlántica y Mar del Norte',
      pt: 'Costa Atlântica e Mar do Norte',
    },
    intro: {
      en: 'Atlantic water stays 10–15°C cooler than the Mediterranean all summer. The constant westerly breeze makes air temperatures feel 4–6°C lower than the thermometer reads. These coasts are naturally air-conditioned — the ones our users book first when heat picks up in June.',
      fr: "L'eau atlantique reste 10 à 15°C plus froide que la Méditerranée tout l'été. La brise d'ouest constante rend la température ressentie 4 à 6°C inférieure au thermomètre. Ces côtes sont naturellement climatisées — celles que nos utilisateurs réservent en premier quand la chaleur monte en juin.",
      es: 'El agua atlántica se mantiene 10-15°C más fría que el Mediterráneo durante todo el verano. La brisa constante del oeste hace que la temperatura sentida sea 4-6°C inferior a la del termómetro. Estas costas son naturalmente climatizadas, las que nuestros usuarios reservan primero cuando sube el calor en junio.',
      pt: 'A água atlântica mantém-se 10-15°C mais fria do que o Mediterrâneo durante todo o verão. A brisa constante de oeste faz com que a temperatura sentida seja 4-6°C inferior ao termómetro. Estas costas são naturalmente climatizadas, as que os nossos utilizadores reservam primeiro quando o calor aumenta em junho.',
    },
    destinations: [
      {
        slug: 'neringa',
        name: 'Neringa',
        country: 'Lithuania',
        countryCode: 'LT',
        julyTemp: 21,
        tag: { en: 'Baltic spit', fr: 'Flèche baltique', es: 'Lengua báltica', pt: 'Língua báltica' },
        why: {
          en: 'A 97-km sand spit between the Baltic Sea and the Curonian Lagoon, with no cars allowed in the dunes, 50-metre pine forests, and a consistent sea breeze that caps summer at 21°C. Dogs run free on the lagoon-side beaches. Our highest single payout from a Norwegian user in June: €15.73.',
          fr: "Une flèche de sable de 97 km entre la mer Baltique et la lagune de Courlande, sans voiture dans les dunes, des forêts de pins de 50 mètres et une brise marine constante qui plafonne l'été à 21°C. Les chiens courent librement sur les plages côté lagune. Notre meilleur paiement unique d'un utilisateur norvégien en juin : 15,73€.",
          es: 'Una lengua de arena de 97 km entre el mar Báltico y la laguna de Curlandia, sin coches en las dunas, bosques de pinos de 50 metros y una brisa marina constante que mantiene el verano en 21°C. Los perros corren libres en las playas del lado de la laguna. Nuestro mayor pago individual de un usuario noruego en junio: 15,73€.',
          pt: 'Uma língua de areia de 97 km entre o Mar Báltico e a Lagoa da Curlândia, sem carros nas dunas, florestas de pinheiros de 50 metros e uma brisa marítima constante que limita o verão a 21°C. Os cães correm livremente nas praias do lado da lagoa. O nosso maior pagamento individual de um utilizador norueguês em junho: 15,73€.',
        },
      },
      {
        slug: 'peniche',
        name: 'Peniche',
        country: 'Portugal',
        countryCode: 'PT',
        julyTemp: 23,
        tag: { en: 'Atlantic surf', fr: 'Surf atlantique', es: 'Surf atlántico', pt: 'Surf atlântico' },
        why: {
          en: 'A fishing peninsula 90 km north of Lisbon where the Atlantic never reaches 20°C. Cliff walks, the 16th-century fortress, and Baleal surf beach, all with dogs on lead. July peak is 23°C air — 8°C below Lisbon at the same time. The water actually cools the air.',
          fr: "Une péninsule de pêcheurs à 90 km au nord de Lisbonne où l'Atlantique n'atteint jamais 20°C. Promenades côtières, forteresse du XVIe siècle et plage de surf de Baleal, tout avec des chiens en laisse. Pic de juillet à 23°C — 8°C de moins que Lisbonne au même moment. L'eau refroidit réellement l'air.",
          es: 'Una península pesquera a 90 km al norte de Lisboa donde el Atlántico nunca alcanza los 20°C. Paseos costeros, la fortaleza del siglo XVI y la playa de surf de Baleal, todo con perros con correa. Pico de julio de 23°C — 8°C por debajo de Lisboa al mismo tiempo. El agua realmente enfría el aire.',
          pt: 'Uma península piscatória a 90 km a norte de Lisboa onde o Atlântico nunca atinge os 20°C. Percursos costeiros, a fortaleza do século XVI e a praia de surf de Baleal, tudo com cães com trela. Pico de julho a 23°C — 8°C abaixo de Lisboa ao mesmo tempo. A água realmente arrefece o ar.',
        },
      },
      {
        slug: 'biarritz',
        name: 'Biarritz',
        country: 'France',
        countryCode: 'FR',
        julyTemp: 22,
        tag: { en: 'Surf & Basque coast', fr: 'Surf & côte basque', es: 'Surf & costa vasca', pt: 'Surf & costa basca' },
        why: {
          en: 'The Basque coast holds steady at 22°C while the French interior bakes at 38°C. Dogs are allowed on Plage de la Milady year-round and on Côte des Basques outside the July–August lifeguard hours. The ocean wind makes it feel like 18°C. Ten minutes from San Sebastián.',
          fr: "La côte basque se maintient à 22°C pendant que l'intérieur français cuit à 38°C. Les chiens sont autorisés sur la Plage de la Milady toute l'année et sur la Côte des Basques en dehors des heures de surveillance juillet-août. Le vent océanique donne une sensation de 18°C. À dix minutes de Saint-Sébastien.",
          es: 'La costa vasca se mantiene a 22°C mientras el interior francés se cuece a 38°C. Los perros están permitidos en la Plage de la Milady todo el año y en la Côte des Basques fuera de las horas de vigilancia de julio-agosto. El viento oceánico lo hace sentir como 18°C. A diez minutos de San Sebastián.',
          pt: 'A costa basca mantém-se a 22°C enquanto o interior francês assa a 38°C. Os cães são permitidos na Plage de la Milady durante todo o ano e na Côte des Basques fora das horas de vigilância de julho-agosto. O vento oceânico faz sentir como 18°C. A dez minutos de San Sebastián.',
        },
      },
      {
        slug: 'galway',
        name: 'Galway',
        country: 'Ireland',
        countryCode: 'IE',
        julyTemp: 18,
        tag: { en: 'Wild Atlantic Way', fr: 'Wild Atlantic Way', es: 'Wild Atlantic Way', pt: 'Wild Atlantic Way' },
        why: {
          en: 'The coolest dog-friendly coast in western Europe at 18°C in July. Dogs on most Irish beaches year-round, free camping at Connemara, and pub culture that welcomes dogs inside. If your dog is flat-faced or elderly, this is the safest summer coast in Europe.',
          fr: "La côte dog-friendly la plus fraîche d'Europe occidentale à 18°C en juillet. Chiens sur la plupart des plages irlandaises toute l'année, camping libre en Connemara, et culture des pubs qui accueille les chiens à l'intérieur. Si votre chien est brachycéphale ou âgé, c'est la côte estivale la plus sûre d'Europe.",
          es: 'La costa dog-friendly más fresca de Europa occidental a 18°C en julio. Perros en la mayoría de las playas irlandesas todo el año, camping libre en Connemara, y cultura de pubs que acoge a los perros en el interior. Si tu perro es braquicéfalo o anciano, esta es la costa veraniega más segura de Europa.',
          pt: 'A costa dog-friendly mais fresca da Europa ocidental a 18°C em julho. Cães na maioria das praias irlandesas durante todo o ano, campismo livre em Connemara, e cultura de pubs que acolhe cães no interior. Se o seu cão tem focinho curto ou é idoso, esta é a costa de verão mais segura da Europa.',
        },
      },
    ],
  },
  {
    id: 'mountain',
    emoji: '🏔️',
    title: {
      en: 'Mountain & Alpine Altitude',
      fr: 'Montagne & Altitude Alpine',
      es: 'Montaña & Altitud Alpina',
      pt: 'Montanha & Altitude Alpina',
    },
    intro: {
      en: 'Every 1,000 metres of altitude = −6.5°C. A destination at 1,200m like Grindelwald is 8°C cooler than the Swiss plains 90 minutes below. Mountain resorts designed for summer have cable cars, lake swimming, and long trail networks — and most accept dogs throughout.',
      fr: "Chaque 1000 mètres d'altitude = −6,5°C. Une destination à 1200m comme Grindelwald est 8°C plus fraîche que les plaines suisses 90 minutes en bas. Les stations de montagne conçues pour l'été ont des téléphériques, la baignade en lac et de longs réseaux de sentiers — et la plupart acceptent les chiens.",
      es: 'Cada 1.000 metros de altitud = −6,5°C. Un destino a 1.200m como Grindelwald es 8°C más fresco que las llanuras suizas 90 minutos más abajo. Los resorts de montaña diseñados para el verano tienen teleféricos, natación en lago y largas redes de senderos, y la mayoría acepta perros.',
      pt: 'Cada 1.000 metros de altitude = −6,5°C. Um destino a 1.200m como Grindelwald é 8°C mais fresco do que as planícies suíças 90 minutos abaixo. Os resorts de montanha concebidos para o verão têm teleféricos, natação em lago e longas redes de trilhos, e a maioria aceita cães.',
    },
    destinations: [
      {
        slug: 'grindelwald',
        name: 'Grindelwald',
        country: 'Switzerland',
        countryCode: 'CH',
        julyTemp: 19,
        tag: { en: '1,034m · Bernese Alps', fr: '1034m · Alpes bernoises', es: '1034m · Alpes berneses', pt: '1034m · Alpes berneses' },
        why: {
          en: 'The Eiger North Face above, the Grindelwald First plateau at 2,168m for off-lead hiking, Bachalpsee lake for dog swimming. Swiss trains accept dogs for €12 supplement. July air temperature: 19°C. July in Rome at the same time: 35°C.',
          fr: "La face nord de l'Eiger au-dessus, le plateau de Grindelwald First à 2168m pour la randonnée sans laisse, le lac Bachalpsee pour la baignade du chien. Les trains suisses acceptent les chiens avec un supplément de 12€. Température de l'air en juillet : 19°C. Juillet à Rome au même moment : 35°C.",
          es: 'La cara norte del Eiger arriba, la meseta de Grindelwald First a 2168m para senderismo sin correa, el lago Bachalpsee para que el perro nade. Los trenes suizos aceptan perros con suplemento de 12€. Temperatura del aire en julio: 19°C. Julio en Roma al mismo tiempo: 35°C.',
          pt: 'A face norte do Eiger acima, o planalto de Grindelwald First a 2.168m para caminhadas sem trela, o lago Bachalpsee para o cão nadar. Os comboios suíços aceitam cães com suplemento de 12€. Temperatura do ar em julho: 19°C. Julho em Roma ao mesmo tempo: 35°C.',
        },
      },
      {
        slug: 'innsbruck',
        name: 'Innsbruck',
        country: 'Austria',
        countryCode: 'AT',
        julyTemp: 24,
        tag: { en: '574m · Austrian Tirol', fr: '574m · Tirol autrichien', es: '574m · Tirol austriaco', pt: '574m · Tirol austríaco' },
        why: {
          en: 'The city sits in the Inn valley at 574m but the Nordkette cable car reaches 2,334m in 20 minutes — dogs free with muzzle. The Bergisel and Hofgarten stay shaded all day. At 24°C in July, Innsbruck is the coolest major city in the Alps and still has full city infrastructure.',
          fr: "La ville est dans la vallée de l'Inn à 574m mais le téléphérique Nordkette atteint 2334m en 20 minutes — chiens gratuits avec muselière. Le Bergisel et le Hofgarten restent ombragés toute la journée. À 24°C en juillet, Innsbruck est la grande ville la plus fraîche des Alpes avec toute l'infrastructure urbaine.",
          es: 'La ciudad está en el valle del Inn a 574m pero el teleférico Nordkette llega a 2334m en 20 minutos, perros gratis con bozal. El Bergisel y el Hofgarten permanecen sombreados todo el día. A 24°C en julio, Innsbruck es la gran ciudad más fresca de los Alpes con toda la infraestructura urbana.',
          pt: 'A cidade fica no vale do Inn a 574m mas o teleférico Nordkette alcança 2.334m em 20 minutos, cães grátis com focinheira. O Bergisel e o Hofgarten ficam ensombrados durante todo o dia. A 24°C em julho, Innsbruck é a grande cidade mais fresca dos Alpes com toda a infraestrutura urbana.',
        },
      },
      {
        slug: 'bled',
        name: 'Bled',
        country: 'Slovenia',
        countryCode: 'SI',
        julyTemp: 23,
        tag: { en: '501m · Julian Alps', fr: '501m · Alpes juliennes', es: '501m · Alpes julianas', pt: '501m · Alpes julianas' },
        why: {
          en: 'Lake Bled at 501m, ringed by Julian Alps and dominated by a clifftop castle. The lake circular trail (6 km) accepts dogs on lead. Dogs swim in the non-lifeguarded sections year-round. July peaks at 23°C with cool lake evenings. Half the price of Switzerland.',
          fr: "Le lac de Bled à 501m, entouré par les Alpes juliennes et dominé par un château sur falaise. Le sentier circulaire du lac (6 km) accepte les chiens en laisse. Les chiens nagent dans les sections sans surveillance toute l'année. Juillet culmine à 23°C avec des soirées fraîches au bord du lac. Moitié prix de la Suisse.",
          es: 'El lago Bled a 501m, rodeado por los Alpes julianos y dominado por un castillo en el acantilado. El sendero circular del lago (6 km) acepta perros con correa. Los perros nadan en las secciones sin vigilancia todo el año. Julio llega a 23°C con frescas noches junto al lago. La mitad del precio de Suiza.',
          pt: 'O Lago Bled a 501m, rodeado pelos Alpes julianos e dominado por um castelo no topo da falésia. O trilho circular do lago (6 km) aceita cães com trela. Os cães nadam nas secções sem vigilância durante todo o ano. Julho atinge os 23°C com noites frescas junto ao lago. Metade do preço da Suíça.',
        },
      },
      {
        slug: 'annecy',
        name: 'Annecy',
        country: 'France',
        countryCode: 'FR',
        julyTemp: 25,
        tag: { en: '448m · French Alps', fr: '448m · Alpes françaises', es: '448m · Alpes franceses', pt: '448m · Alpes franceses' },
        why: {
          en: 'Lake Annecy has the cleanest water in Europe and stays at 23°C in summer — dogs swim in the public sections. The medieval old town is completely walkable with dogs. At 448m with Alpine corridors, July peaks at 25°C compared to 36°C in Lyon 140 km south.',
          fr: "Le lac d'Annecy a l'eau la plus propre d'Europe et reste à 23°C en été — les chiens nagent dans les sections publiques. La vieille ville médiévale est entièrement praticable avec des chiens. À 448m avec des couloirs alpins, juillet culmine à 25°C contre 36°C à Lyon 140 km au sud.",
          es: 'El lago de Annecy tiene el agua más limpia de Europa y se mantiene a 23°C en verano, los perros nadan en las secciones públicas. El casco antiguo medieval es totalmente transitable con perros. A 448m con corredores alpinos, julio alcanza 25°C frente a 36°C en Lyon 140 km al sur.',
          pt: 'O Lago de Annecy tem a água mais limpa da Europa e mantém-se a 23°C no verão, os cães nadam nas secções públicas. O centro histórico medieval é totalmente percorrível com cães. A 448m com corredores alpinos, julho atinge os 25°C contra 36°C em Lyon 140 km a sul.',
        },
      },
    ],
  },
  {
    id: 'forest-lakes',
    emoji: '🌲',
    title: {
      en: 'Forests & Alpine Lakes',
      fr: 'Forêts & Lacs Alpins',
      es: 'Bosques & Lagos Alpinos',
      pt: 'Florestas & Lagos Alpinos',
    },
    intro: {
      en: 'Dense forest canopy reduces ground temperature by 8–12°C compared to open terrain. Alpine lakes stay at 18–22°C all summer — cold enough to cool a dog down instantly, warm enough to swim comfortably. These destinations combine shade, water, and off-lead trail access.',
      fr: "Un couvert forestier dense réduit la température au sol de 8 à 12°C par rapport au terrain ouvert. Les lacs alpins restent à 18-22°C tout l'été — assez froids pour refroidir instantanément un chien, assez chauds pour nager confortablement. Ces destinations combinent ombre, eau et accès aux sentiers sans laisse.",
      es: 'Un dosel forestal denso reduce la temperatura del suelo en 8-12°C comparado con el terreno abierto. Los lagos alpinos se mantienen a 18-22°C todo el verano, lo suficientemente fríos para enfriar a un perro instantáneamente, lo suficientemente cálidos para nadar cómodamente. Estos destinos combinan sombra, agua y acceso a senderos sin correa.',
      pt: 'Uma copa florestal densa reduz a temperatura do solo em 8-12°C comparada com terreno aberto. Os lagos alpinos mantêm-se a 18-22°C durante todo o verão, suficientemente frios para arrefecer um cão instantaneamente, suficientemente quentes para nadar confortavelmente. Estes destinos combinam sombra, água e acesso a trilhos sem trela.',
    },
    destinations: [
      {
        slug: 'hallstatt',
        name: 'Hallstatt',
        country: 'Austria',
        countryCode: 'AT',
        julyTemp: 22,
        tag: { en: 'Alpine lake · UNESCO', fr: 'Lac alpin · UNESCO', es: 'Lago alpino · UNESCO', pt: 'Lago alpino · UNESCO' },
        why: {
          en: 'A UNESCO-listed salt-mining village between a mountain wall and the Hallstätter See lake. Dogs on lead in the village streets, swimming allowed in the lake outside the bathing zone. The trail up to the Echern valley is off-lead and shaded by beech forest. July temperature: 22°C with cool lake air.',
          fr: "Un village minier de sel classé UNESCO entre une paroi montagneuse et le lac Hallstätter See. Chiens en laisse dans les rues du village, baignade autorisée dans le lac hors de la zone de baignade. Le sentier vers la vallée d'Echern est sans laisse et ombragé par une forêt de hêtres. Température de juillet : 22°C avec l'air frais du lac.",
          es: 'Un pueblo minero de sal declarado Patrimonio UNESCO entre una pared montañosa y el lago Hallstätter See. Perros con correa en las calles del pueblo, baño permitido en el lago fuera de la zona de baño. El sendero hasta el valle de Echern es sin correa y sombreado por un bosque de hayas. Temperatura de julio: 22°C con aire fresco del lago.',
          pt: 'Uma aldeia de mineração de sal listada pela UNESCO entre uma parede de montanha e o lago Hallstätter See. Cães com trela nas ruas da aldeia, natação permitida no lago fora da zona de banho. O trilho até ao vale de Echern é sem trela e sombreado por floresta de faias. Temperatura de julho: 22°C com ar fresco do lago.',
        },
      },
      {
        slug: 'freiburg',
        name: 'Freiburg',
        country: 'Germany',
        countryCode: 'DE',
        julyTemp: 24,
        tag: { en: 'Black Forest gateway', fr: 'Porte de la Forêt-Noire', es: 'Puerta de la Selva Negra', pt: 'Porta da Floresta Negra' },
        why: {
          en: "Freiburg is the sunniest city in Germany but the Black Forest begins at the city edge. 20 minutes by tram to Günterstal, then 200 km of shaded trails in the Schwarzwald, mostly off-lead. Dogs allowed on the Schauinsland cable car and in most forest Gasthäuser. July: 24°C in the city, 16°C in the forest.",
          fr: "Freiburg est la ville la plus ensoleillée d'Allemagne mais la Forêt-Noire commence au bord de la ville. 20 minutes en tram jusqu'à Günterstal, puis 200 km de sentiers ombragés dans le Schwarzwald, principalement sans laisse. Chiens admis sur le téléphérique du Schauinsland et dans la plupart des Gasthäuser forestiers. Juillet : 24°C en ville, 16°C en forêt.",
          es: 'Freiburg es la ciudad más soleada de Alemania pero el Bosque Negro comienza en el borde de la ciudad. 20 minutos en tranvía hasta Günterstal, luego 200 km de senderos sombreados en el Schwarzwald, principalmente sin correa. Perros admitidos en el teleférico Schauinsland y en la mayoría de los Gasthäuser forestales. Julio: 24°C en la ciudad, 16°C en el bosque.',
          pt: 'Freiburg é a cidade mais soalheira da Alemanha mas a Floresta Negra começa na beira da cidade. 20 minutos de elétrico até Günterstal, depois 200 km de trilhos ensombrados no Schwarzwald, principalmente sem trela. Cães admitidos no teleférico do Schauinsland e na maioria dos Gasthäuser florestais. Julho: 24°C na cidade, 16°C na floresta.',
        },
      },
      {
        slug: 'como',
        name: 'Lake Como',
        country: 'Italy',
        countryCode: 'IT',
        julyTemp: 26,
        tag: { en: 'Alpine lake · Lombardy', fr: 'Lac alpin · Lombardie', es: 'Lago alpino · Lombardía', pt: 'Lago alpino · Lombardia' },
        why: {
          en: 'At 198m, Lake Como stays 8°C cooler than Milan in July. The lakeside promenades of Bellagio, Varenna, and Menaggio are dog-friendly, the ferry network accepts dogs for €1, and the mountain paths above the lake reach 1,500m for serious cool-air hiking.',
          fr: "À 198m, le lac de Côme reste 8°C plus frais que Milan en juillet. Les promenades en bord de lac de Bellagio, Varenna et Menaggio sont dog-friendly, le réseau de ferries accepte les chiens pour 1€, et les sentiers de montagne au-dessus du lac atteignent 1500m pour une randonnée sérieuse à l'air frais.",
          es: 'A 198m, el lago de Como está 8°C más fresco que Milán en julio. Los paseos a orillas del lago de Bellagio, Varenna y Menaggio son dog-friendly, la red de ferries acepta perros por 1€, y los senderos de montaña sobre el lago llegan a 1500m para una seria senderismo en aire fresco.',
          pt: 'A 198m, o Lago de Como mantém-se 8°C mais fresco do que Milão em julho. Os passeios à beira-lago de Bellagio, Varenna e Menaggio são dog-friendly, a rede de ferries aceita cães por 1€, e os percursos de montanha acima do lago atingem 1.500m para caminhadas sérias em ar fresco.',
        },
      },
      {
        slug: 'locarno',
        name: 'Locarno',
        country: 'Switzerland',
        countryCode: 'CH',
        julyTemp: 27,
        tag: { en: 'Swiss-Italian lakes', fr: 'Lacs suisses-italiens', es: 'Lagos suizo-italianos', pt: 'Lagos suíço-italianos' },
        why: {
          en: "Locarno sits at the tip of Lake Maggiore at 200m with the Valle Maggia rising to 2,000m immediately behind. The warmest destination in this category at 27°C — but a 30-minute drive to Bosco Gurin (1,506m) drops it to 18°C. Ticino's dog-friendly culture means most restaurants accept dogs on terraces.",
          fr: "Locarno est à la pointe du lac Majeur à 200m avec la Valle Maggia montant à 2000m immédiatement derrière. La destination la plus chaude de cette catégorie à 27°C — mais un trajet de 30 minutes jusqu'à Bosco Gurin (1506m) la ramène à 18°C. La culture dog-friendly du Tessin signifie que la plupart des restaurants acceptent les chiens en terrasse.",
          es: 'Locarno está en la punta del lago Maggiore a 200m con el Valle Maggia subiendo a 2000m inmediatamente detrás. El destino más cálido de esta categoría a 27°C, pero un viaje de 30 minutos hasta Bosco Gurin (1506m) lo baja a 18°C. La cultura dog-friendly del Tesino significa que la mayoría de los restaurantes aceptan perros en las terrazas.',
          pt: 'Locarno fica na ponta do Lago Maggiore a 200m com o Valle Maggia a subir a 2.000m imediatamente atrás. O destino mais quente desta categoria a 27°C, mas uma viagem de 30 minutos até Bosco Gurin (1.506m) baixa para 18°C. A cultura dog-friendly do Ticino significa que a maioria dos restaurantes aceita cães nas esplanadas.',
        },
      },
    ],
  },
  {
    id: 'northern-cities',
    emoji: '🏙️',
    title: {
      en: 'Cool Northern Cities',
      fr: 'Villes Fraîches du Nord',
      es: 'Ciudades Frescas del Norte',
      pt: 'Cidades Frescas do Norte',
    },
    intro: {
      en: 'Northern European cities offer the full urban experience — museums, restaurants, public transport — at 17–22°C in July when Mediterranean cities are hitting 38°C. Dogs on public transport, dogs in restaurants, dogs on urban beaches. The complete holiday, just without the heat.',
      fr: "Les villes d'Europe du Nord offrent l'expérience urbaine complète — musées, restaurants, transports en commun — à 17-22°C en juillet quand les villes méditerranéennes atteignent 38°C. Chiens dans les transports en commun, chiens dans les restaurants, chiens sur les plages urbaines. Les vacances complètes, juste sans la chaleur.",
      es: 'Las ciudades del norte de Europa ofrecen la experiencia urbana completa: museos, restaurantes, transporte público, a 17-22°C en julio cuando las ciudades mediterráneas alcanzan los 38°C. Perros en el transporte público, perros en restaurantes, perros en playas urbanas. Las vacaciones completas, solo sin el calor.',
      pt: 'As cidades do norte da Europa oferecem a experiência urbana completa, museus, restaurantes, transporte público, a 17-22°C em julho quando as cidades mediterrânicas atingem os 38°C. Cães nos transportes públicos, cães em restaurantes, cães em praias urbanas. As férias completas, só sem o calor.',
    },
    destinations: [
      {
        slug: 'tallinn',
        name: 'Tallinn',
        country: 'Estonia',
        countryCode: 'EE',
        julyTemp: 21,
        tag: { en: 'Medieval Baltic capital', fr: 'Capitale baltique médiévale', es: 'Capital báltica medieval', pt: 'Capital báltica medieval' },
        why: {
          en: 'A UNESCO medieval old town at 21°C in July, dogs on Tallinn buses and trams for free, the Pirita beach area north of the city allows dogs year-round. Remarkably affordable — half the cost of Copenhagen for accommodation. One of the most consistent cities we track for pet-friendly hotel bookings.',
          fr: "Une vieille ville médiévale UNESCO à 21°C en juillet, chiens gratuits dans les bus et trams de Tallinn, la zone de plage Pirita au nord de la ville accepte les chiens toute l'année. Remarquablement abordable — moitié prix de Copenhague pour l'hébergement. L'une des villes les plus régulières que nous suivons pour les réservations d'hôtels pet-friendly.",
          es: 'Un casco antiguo medieval UNESCO a 21°C en julio, perros gratis en autobuses y tranvías de Tallin, la zona de playa Pirita al norte de la ciudad acepta perros todo el año. Notablemente asequible, la mitad del precio de Copenhague para alojamiento. Una de las ciudades más consistentes que seguimos para las reservas de hoteles pet-friendly.',
          pt: 'Uma cidade velha medieval da UNESCO a 21°C em julho, cães grátis nos autocarros e elétricos de Tallinn, a zona de praia Pirita a norte da cidade aceita cães durante todo o ano. Notavelmente acessível, metade do preço de Copenhague para alojamento. Uma das cidades mais consistentes que acompanhamos para reservas de hotéis pet-friendly.',
        },
      },
      {
        slug: 'copenhagen',
        name: 'Copenhagen',
        country: 'Denmark',
        countryCode: 'DK',
        julyTemp: 22,
        tag: { en: 'Scandinavian design capital', fr: 'Capitale du design scandinave', es: 'Capital del diseño escandinavo', pt: 'Capital do design escandinavo' },
        why: {
          en: 'Dogs on the Metro (small carrier) and S-Tog (on lead, free). Five designated off-lead dog parks within the city ring. Amager Strandpark beach allows dogs year-round in the morning. The canal swimming harbour (Havnebad) has a separate dog-friendly entry point. 22°C in July, empty in August when locals leave.',
          fr: "Chiens dans le Métro (petit transportin) et le S-Tog (en laisse, gratuit). Cinq parcs canins sans laisse dans la ville. La plage Amager Strandpark accepte les chiens toute l'année le matin. Le port de baignade dans les canaux (Havnebad) a un accès séparé dog-friendly. 22°C en juillet, calme en août quand les locaux partent.",
          es: 'Perros en el Metro (pequeño transportín) y el S-Tog (con correa, gratis). Cinco parques caninos sin correa dentro del anillo urbano. La playa Amager Strandpark permite perros todo el año por la mañana. El puerto de natación en el canal (Havnebad) tiene una entrada separada dog-friendly. 22°C en julio, vacío en agosto cuando los locales se van.',
          pt: 'Cães no Metro (caixa pequena) e S-Tog (com trela, grátis). Cinco parques caninos sem trela dentro do anel da cidade. A praia Amager Strandpark permite cães durante todo o ano de manhã. O porto de natação no canal (Havnebad) tem uma entrada separada dog-friendly. 22°C em julho, vazio em agosto quando os locais partem.',
        },
      },
      {
        slug: 'bergen',
        name: 'Bergen',
        country: 'Norway',
        countryCode: 'NO',
        julyTemp: 18,
        tag: { en: 'Norwegian fjord city', fr: 'Ville des fjords norvégiens', es: 'Ciudad de los fiordos noruegos', pt: 'Cidade dos fiordes noruegueses' },
        why: {
          en: 'Norway\'s gateway to the fjords at 18°C in July. Dogs on Bergen Bybanen tram for free, off-lead on most mountain trails (Fløyen, Ulriken). The Bryggen wharf area is walk-through with dogs. Norwegian culture has zero friction with dogs in public spaces. Consistent transaction signals from Norwegian users booking cooler summer destinations.',
          fr: "La porte d'entrée des fjords norvégiens à 18°C en juillet. Chiens gratuits dans le Bybanen de Bergen, sans laisse sur la plupart des sentiers de montagne (Fløyen, Ulriken). Le quai de Bryggen est accessible en se promenant avec des chiens. La culture norvégienne n'a aucune friction avec les chiens dans les espaces publics. Signaux de transactions cohérents d'utilisateurs norvégiens réservant des destinations estivales plus fraîches.",
          es: 'La puerta de entrada a los fiordos noruegos a 18°C en julio. Perros gratis en el Bybanen de Bergen, sin correa en la mayoría de los senderos de montaña (Fløyen, Ulriken). El muelle de Bryggen es transitable con perros. La cultura noruega no tiene ninguna fricción con los perros en espacios públicos. Señales de transacciones consistentes de usuarios noruegos reservando destinos de verano más frescos.',
          pt: 'A porta de entrada para os fiordes noruegueses a 18°C em julho. Cães grátis no Bybanen de Bergen, sem trela na maioria dos trilhos de montanha (Fløyen, Ulriken). O cais de Bryggen é percorrível com cães. A cultura norueguesa não tem nenhum atrito com cães em espaços públicos. Sinais de transações consistentes de utilizadores noruegueses a reservar destinos de verão mais frescos.',
        },
      },
      {
        slug: 'edinburgh',
        name: 'Edinburgh',
        country: 'Scotland',
        countryCode: 'GB',
        julyTemp: 19,
        tag: { en: 'Scottish Highlands gateway', fr: 'Porte des Highlands écossais', es: 'Puerta de las Highlands escocesas', pt: 'Porta das Highlands escocesas' },
        why: {
          en: "Scotland's capital at 19°C in July. Dogs on Arthur's Seat (extinct volcano in the city centre), on Portobello Beach year-round, and in most Edinburgh pubs. The Scottish dog culture is arguably the most permissive in Europe. A Scotrail ticket includes your dog free.",
          fr: "La capitale de l'Écosse à 19°C en juillet. Chiens sur Arthur's Seat (volcan éteint au centre-ville), sur la plage de Portobello toute l'année, et dans la plupart des pubs d'Édimbourg. La culture canine écossaise est sans doute la plus permissive d'Europe. Un billet Scotrail inclut votre chien gratuitement.",
          es: 'La capital de Escocia a 19°C en julio. Perros en Arthur\'s Seat (volcán extinto en el centro de la ciudad), en la playa Portobello todo el año, y en la mayoría de los pubs de Edimburgo. La cultura canina escocesa es posiblemente la más permisiva de Europa. Un billete de Scotrail incluye a tu perro gratis.',
          pt: 'A capital da Escócia a 19°C em julho. Cães em Arthur\'s Seat (vulcão extinto no centro da cidade), na praia de Portobello durante todo o ano, e na maioria dos pubs de Edimburgo. A cultura canina escocesa é possivelmente a mais permissiva da Europa. Um bilhete da Scotrail inclui o seu cão gratuitamente.',
        },
      },
    ],
  },
]

const T = {
  title: {
    en: 'Best Destinations to Escape the Heat with Your Dog — Europe 2026',
    fr: 'Meilleures destinations pour échapper à la chaleur avec son chien — Europe 2026',
    es: 'Mejores destinos para escapar del calor con tu perro — Europa 2026',
    pt: 'Melhores destinos para escapar do calor com o seu cão — Europa 2026',
  },
  metaTitle: {
    en: '16 Dog-Friendly Destinations to Escape the Heat in Europe (2026)',
    fr: '16 destinations dog-friendly pour fuir la chaleur en Europe (2026)',
    es: '16 destinos dog-friendly para escapar del calor en Europa (2026)',
    pt: '16 destinos dog-friendly para escapar do calor na Europa (2026)',
  },
  metaDesc: {
    en: 'Escape Europe\'s summer heat with your dog: Atlantic coasts, Alpine altitude, cool forests & northern cities. 16 verified destinations under 27°C, ordered by booking revenue, with pet-friendly hotels.',
    fr: "Fuyez la chaleur estivale européenne avec votre chien : côtes atlantiques, altitude alpine, forêts fraîches et villes du nord. 16 destinations vérifiées sous 27°C, classées par revenu de réservation, avec hôtels pet-friendly.",
    es: 'Escapa del calor veraniego europeo con tu perro: costas atlánticas, altitud alpina, bosques frescos y ciudades del norte. 16 destinos verificados bajo 27°C, ordenados por ingresos de reserva, con hoteles pet-friendly.',
    pt: 'Fuja do calor de verão europeu com o seu cão: costas atlânticas, altitude alpina, florestas frescas e cidades do norte. 16 destinos verificados abaixo de 27°C, ordenados por receita de reserva, com hotéis pet-friendly.',
  },
  intro: {
    en: 'When the thermometer in Barcelona, Rome, or Athens hits 38°C, dogs with flat faces stop breathing efficiently. Senior dogs overheat in under 20 minutes in direct sun above 30°C. The solution is not to stay home — it\'s to choose smarter. These 16 destinations stay under 27°C in July. We\'ve ordered them by what our booking data actually shows converts: Atlantic coasts first, then altitude, then forest and lakes, then northern cities.',
    fr: "Quand le thermomètre à Barcelone, Rome ou Athènes atteint 38°C, les chiens à face plate cessent de respirer efficacement. Les chiens âgés surchauffent en moins de 20 minutes au soleil direct au-dessus de 30°C. La solution n'est pas de rester à la maison — c'est de choisir plus intelligemment. Ces 16 destinations restent sous 27°C en juillet. Nous les avons classées par ce que nos données de réservation montrent réellement comme converti : côtes atlantiques en premier, puis altitude, puis forêt et lacs, puis villes du nord.",
    es: 'Cuando el termómetro en Barcelona, Roma o Atenas alcanza los 38°C, los perros de cara plana dejan de respirar eficientemente. Los perros mayores se sobrecalientan en menos de 20 minutos bajo el sol directo por encima de los 30°C. La solución no es quedarse en casa, sino elegir más inteligentemente. Estos 16 destinos se mantienen bajo 27°C en julio. Los hemos ordenado por lo que nuestros datos de reserva realmente muestran que convierte: costas atlánticas primero, luego altitud, luego bosque y lagos, luego ciudades del norte.',
    pt: 'Quando o termómetro em Barcelona, Roma ou Atenas atinge os 38°C, os cães de cara achatada param de respirar eficientemente. Os cães idosos sobreaquecem em menos de 20 minutos ao sol direto acima de 30°C. A solução não é ficar em casa, é escolher de forma mais inteligente. Estes 16 destinos mantêm-se abaixo de 27°C em julho. Ordenámo-los pelo que os nossos dados de reserva mostram realmente que converte: costas atlânticas primeiro, depois altitude, depois floresta e lagos, depois cidades do norte.',
  },
  julyTemp: { en: 'July avg high', fr: 'Max moy. juillet', es: 'Máx. prom. julio', pt: 'Máx. méd. julho' },
  seeHotels: { en: 'See pet-friendly hotels', fr: 'Voir les hôtels pet-friendly', es: 'Ver hoteles pet-friendly', pt: 'Ver hotéis pet-friendly' },
  seeGuide: { en: 'Dog travel guide', fr: 'Guide voyage chien', es: 'Guía viaje perro', pt: 'Guia viagem cão' },
  breadHome: { en: 'Home', fr: 'Accueil', es: 'Inicio', pt: 'Início' },
  breadGuides: { en: 'Guides', fr: 'Guides', es: 'Guías', pt: 'Guias' },
  categoryLabel: { en: 'Category', fr: 'Catégorie', es: 'Categoría', pt: 'Categoria' },
  faq: {
    q1: { en: 'At what temperature does heat become dangerous for dogs?', fr: 'À quelle température la chaleur devient-elle dangereuse pour les chiens ?', es: '¿A qué temperatura el calor se vuelve peligroso para los perros?', pt: 'A que temperatura o calor se torna perigoso para os cães?' },
    a1: { en: 'Heatstroke risk rises sharply above 25°C ambient temperature, especially for brachycephalic breeds (bulldogs, pugs, French bulldogs), senior dogs (over 7 years), and overweight dogs. At 30°C in direct sun with high humidity, a flat-faced dog can develop heatstroke in under 20 minutes. The destinations on this page stay at or below 27°C in July.', fr: "Le risque de coup de chaleur augmente fortement au-dessus de 25°C de température ambiante, en particulier pour les races brachycéphales (bouledogues, carlins, bouledogues français), les chiens âgés (plus de 7 ans) et les chiens en surpoids. À 30°C au soleil direct avec une humidité élevée, un chien à face plate peut développer un coup de chaleur en moins de 20 minutes. Les destinations de cette page restent à 27°C ou en dessous en juillet.", es: 'El riesgo de golpe de calor aumenta bruscamente por encima de los 25°C de temperatura ambiente, especialmente para las razas braquicéfalas (bulldogs, carlinos, bulldogs franceses), perros mayores (más de 7 años) y perros con sobrepeso. A 30°C bajo el sol directo con alta humedad, un perro de cara plana puede desarrollar un golpe de calor en menos de 20 minutos. Los destinos de esta página se mantienen en o por debajo de 27°C en julio.', pt: 'O risco de insolação aumenta acentuadamente acima de 25°C de temperatura ambiente, especialmente para raças braquicefálicas (bulldogs, carlins, bulldogs franceses), cães idosos (mais de 7 anos) e cães com excesso de peso. A 30°C ao sol direto com humidade elevada, um cão de cara achatada pode desenvolver insolação em menos de 20 minutos. Os destinos nesta página mantêm-se a 27°C ou abaixo em julho.' },
    q2: { en: 'Which European destination stays coolest in July?', fr: 'Quelle destination européenne reste la plus fraîche en juillet ?', es: '¿Qué destino europeo es el más fresco en julio?', pt: 'Qual destino europeu se mantém mais fresco em julho?' },
    a2: { en: 'Galway (Ireland) at 18°C is the coolest mainstream summer destination on this list. Bergen (Norway) also reaches 18°C. Both have full Atlantic exposure and established dog-friendly infrastructure. Reykjavík, covered in our separate cool-summer guide, averages 13°C in July — the absolute ceiling for summer heat anywhere in Europe.', fr: "Galway (Irlande) à 18°C est la destination estivale grand public la plus fraîche de cette liste. Bergen (Norvège) atteint également 18°C. Les deux ont une pleine exposition atlantique et une infrastructure dog-friendly établie. Reykjavík, couverte dans notre guide séparé cool-summer, moyenne 13°C en juillet — le plafond absolu pour la chaleur estivale en Europe.", es: 'Galway (Irlanda) a 18°C es el destino de verano más popular y fresco de esta lista. Bergen (Noruega) también alcanza los 18°C. Ambos tienen plena exposición atlántica e infraestructura dog-friendly establecida. Reikiavik, cubierta en nuestra guía separada cool-summer, promedia 13°C en julio, el techo absoluto para el calor de verano en Europa.', pt: 'Galway (Irlanda) a 18°C é o destino de verão mais popular e fresco desta lista. Bergen (Noruega) também atinge 18°C. Ambos têm plena exposição atlântica e infraestrutura dog-friendly estabelecida. Reiquiavique, coberta no nosso guia cool-summer separado, tem uma média de 13°C em julho, o teto absoluto para o calor de verão na Europa.' },
    q3: { en: 'Are Alpine destinations good for dogs in summer?', fr: 'Les destinations alpines sont-elles bonnes pour les chiens en été ?', es: '¿Son los destinos alpinos buenos para los perros en verano?', pt: 'Os destinos alpinos são bons para os cães no verão?' },
    a3: { en: 'Yes — mountain destinations are among the best summer options for dogs. Trail access is extensive, most mountain huts (Berghütten, rifugi) accept dogs, and the altitude keeps temperatures 6–8°C below nearby lowland cities. The main precaution is paw heat on exposed rock above the treeline on sunny days. Carry water and start hikes early.', fr: "Oui — les destinations montagneuses sont parmi les meilleures options estivales pour les chiens. L'accès aux sentiers est étendu, la plupart des refuges de montagne acceptent les chiens, et l'altitude maintient les températures 6 à 8°C en dessous des villes de plaine voisines. La principale précaution est la chaleur des pattes sur les roches exposées au-dessus de la limite des arbres par temps ensoleillé.", es: 'Sí: los destinos de montaña son de las mejores opciones veraniegas para los perros. El acceso a los senderos es extenso, la mayoría de los refugios de montaña (Berghütten, rifugi) aceptan perros, y la altitud mantiene las temperaturas 6-8°C por debajo de las ciudades de llanura cercanas. La principal precaución es el calor de las patas en roca expuesta sobre el límite del árbol en días soleados.', pt: 'Sim, os destinos de montanha estão entre as melhores opções de verão para os cães. O acesso a trilhos é extenso, a maioria dos refúgios de montanha (Berghütten, rifugi) aceita cães, e a altitude mantém as temperaturas 6-8°C abaixo das cidades das planícies próximas. A principal precaução é o calor das patas na rocha exposta acima da linha de árvores nos dias soalheiros.' },
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

export default async function EscapeHeatPage({
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="text-white/60 text-xs mb-4">
            <Link href={`/${locale}`} className="hover:text-white">{p(T.breadHome, locale)}</Link>
            <span className="mx-1.5">/</span>
            <Link href={`/${locale}/guides`} className="hover:text-white">{p(T.breadGuides, locale)}</Link>
          </nav>
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            🌡️ {locale === 'fr' ? 'Canicule & chien' : locale === 'es' ? 'Canícula & perro' : locale === 'pt' ? 'Calor & cão' : 'Heatwave & dogs'}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-5">
            {p(T.title, locale)}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
            {p(T.intro, locale)}
          </p>
          {/* Category jump links */}
          <div className="flex flex-wrap gap-2 mt-8">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
              >
                {cat.emoji} {p(cat.title, locale)}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {CATEGORIES.map((cat, catIdx) => (
          <section key={cat.id} id={cat.id}>
            {/* Category header */}
            <div className="flex items-start gap-3 mb-4">
              <span className="text-4xl">{cat.emoji}</span>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  {p(T.categoryLabel, locale)} {catIdx + 1}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {p(cat.title, locale)}
                </h2>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-8">{p(cat.intro, locale)}</p>

            {/* Destination cards */}
            <div className="space-y-5">
              {cat.destinations.map((dest, idx) => (
                <div
                  key={dest.slug}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-black flex items-center justify-center">
                          {catIdx * 4 + idx + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-extrabold text-gray-900">{dest.name}</h3>
                          <p className="text-xs text-gray-500">{dest.country}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div className="text-2xl font-black text-blue-600">{dest.julyTemp}°C</div>
                        <div className="text-xs text-gray-400">{p(T.julyTemp, locale)}</div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1 bg-cyan-50 text-cyan-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                      {p(dest.tag, locale)}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{p(dest.why, locale)}</p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={buildAllezDestLink(dest.name, dest.country, `${CAMPAIGN}-${dest.slug}`, 3)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
                      >
                        🏨 {p(T.seeHotels, locale)}
                      </a>
                      <Link
                        href={`/${locale}/destinations/${dest.slug}`}
                        className="inline-flex items-center gap-1.5 border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
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
