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
  julyTemp: number
  tag: L4
  why: L4
}
type Country = {
  id: string
  flag: string
  name: L4
  countrySlug: string
  country: string
  revenueNote?: string
  destinations: Dest[]
}

const COUNTRY_GUIDES = [
  {
    slug: 'espagne-fraiche-chien',
    flag: '🇪🇸',
    label: { en: 'Cool Spain', fr: 'Espagne fraîche', es: 'España fresca', pt: 'Espanha fresca' },
    desc: { en: 'Basque Country · Cantabria · Asturias · Galicia · Pyrenees · 8 cities', fr: 'Pays basque · Cantabrie · Asturies · Galice · Pyrénées · 8 villes', es: 'País Vasco · Cantabria · Asturias · Galicia · Pirineo · 8 ciudades', pt: 'País Basco · Cantábria · Astúrias · Galiza · Pirenéus · 8 cidades' },
    maxTemp: 22,
  },
  {
    slug: 'italie-fraiche-chien',
    flag: '🇮🇹',
    label: { en: 'Cool Italy', fr: 'Italie fraîche', es: 'Italia fresca', pt: 'Itália fresca' },
    desc: { en: 'South Tyrol · Aosta Valley · Trentino · Alpine Lakes · Liguria · 7 cities', fr: 'Haut-Adige · Val d\'Aoste · Trentin · Lacs alpins · Ligurie · 7 villes', es: 'Alto Adigio · Valle de Aosta · Trentino · Lagos alpinos · Liguria · 7 ciudades', pt: 'Alto Ádige · Vale de Aosta · Trentino · Lagos alpinos · Ligúria · 7 cidades' },
    maxTemp: 23,
  },
  {
    slug: 'france-fraiche-chien',
    flag: '🇫🇷',
    label: { en: 'Cool France', fr: 'France fraîche', es: 'Francia fresca', pt: 'França fresca' },
    desc: { en: 'Brittany · Normandy · Alsace · Alps · Basque coast · 7 cities', fr: 'Bretagne · Normandie · Alsace · Alpes · Côte basque · 7 villes', es: 'Bretaña · Normandía · Alsacia · Alpes · Costa vasca · 7 ciudades', pt: 'Bretanha · Normandia · Alsácia · Alpes · Costa basca · 7 cidades' },
    maxTemp: 20,
  },
  {
    slug: 'portugal-fraiche-chien',
    flag: '🇵🇹',
    label: { en: 'Cool Portugal', fr: 'Portugal frais', es: 'Portugal fresco', pt: 'Portugal fresco' },
    desc: { en: 'Porto · Minho coast · Historic Minho · Peneda-Gerês · Costa Vicentina · 6 cities', fr: 'Porto · Minho côtier · Minho historique · Peneda-Gerês · Costa Vicentina · 6 villes', es: 'Oporto · Miño costero · Miño histórico · Peneda-Gerês · Costa Vicentina · 6 ciudades', pt: 'Porto · Minho litoral · Minho histórico · Peneda-Gerês · Costa Vicentina · 6 cidades' },
    maxTemp: 20,
  },
  {
    slug: 'allemagne-fraiche-chien',
    flag: '🇩🇪',
    label: { en: 'Cool Germany', fr: 'Allemagne fraîche', es: 'Alemania fresca', pt: 'Alemanha fresca' },
    desc: { en: 'Black Forest · Bavarian Alps · Lake Constance · Baltic · Rhine · 6 cities', fr: 'Forêt-Noire · Alpes bavaroises · Lac de Constance · Baltique · Rhin · 6 villes', es: 'Selva Negra · Alpes bávaros · Lago Constanza · Báltico · Rin · 6 ciudades', pt: 'Floresta Negra · Alpes bávaros · Lago Constança · Báltico · Reno · 6 cidades' },
    maxTemp: 21,
  },
  {
    slug: 'autriche-fraiche-chien',
    flag: '🇦🇹',
    label: { en: 'Cool Austria', fr: 'Autriche fraîche', es: 'Austria fresca', pt: 'Áustria fresca' },
    desc: { en: 'Salzburg · Salzkammergut · Tyrol · Carinthia · Vorarlberg · 6 cities', fr: 'Salzbourg · Salzkammergut · Tyrol · Carinthie · Vorarlberg · 6 villes', es: 'Salzburgo · Salzkammergut · Tirol · Carintia · Vorarlberg · 6 ciudades', pt: 'Salzburgo · Salzkammergut · Tirol · Caríntia · Vorarlberg · 6 cidades' },
    maxTemp: 21,
  },
]

// Countries ordered by June 2026 booking revenue signal:
// LT €15.73 (Neringa), NO €2.77 (Tyssedal), AT €2.34 (Feldkirchen),
// FR multiple, IE, CH, PT, DE, SI, IT, DK, EE, GB
const COUNTRIES: Country[] = [
  {
    id: 'lithuania',
    flag: '🇱🇹',
    name: { en: 'Lithuania', fr: 'Lituanie', es: 'Lituania', pt: 'Lituânia' },
    countrySlug: 'lithuania',
    country: 'Lithuania',
    revenueNote: '€15.73',
    destinations: [
      {
        slug: 'neringa',
        name: 'Neringa',
        julyTemp: 21,
        tag: { en: 'Baltic spit · car-free dunes', fr: 'Flèche baltique · dunes sans voiture', es: 'Lengua báltica · dunas sin coches', pt: 'Língua báltica · dunas sem carros' },
        why: {
          en: 'A 97-km sand spit between the Baltic Sea and the Curonian Lagoon, with no cars allowed in the dunes, 50-metre pine forests, and a sea breeze that caps summer at 21°C. Dogs run free on the lagoon-side beaches. Our top single payout in June: €15.73 from a Norwegian user.',
          fr: "Une flèche de sable de 97 km entre la mer Baltique et la lagune de Courlande, sans voiture dans les dunes, des pins de 50 mètres et une brise marine qui plafonne l'été à 21°C. Les chiens courent librement côté lagune. Notre meilleur paiement unique en juin : 15,73€.",
          es: 'Una lengua de arena de 97 km entre el mar Báltico y la laguna de Curlandia, sin coches en las dunas, pinos de 50 metros y brisa marina que mantiene el verano en 21°C. Los perros corren libres en las playas del lado de la laguna. Nuestro mayor pago individual en junio: 15,73€.',
          pt: 'Uma língua de areia de 97 km entre o Mar Báltico e a Lagoa da Curlândia, sem carros nas dunas, pinheiros de 50 metros e uma brisa marítima que limita o verão a 21°C. Os cães correm livremente nas praias do lado da lagoa. O nosso maior pagamento individual em junho: 15,73€.',
        },
      },
    ],
  },
  {
    id: 'norway',
    flag: '🇳🇴',
    name: { en: 'Norway', fr: 'Norvège', es: 'Noruega', pt: 'Noruega' },
    countrySlug: 'norway',
    country: 'Norway',
    revenueNote: '€2.77',
    destinations: [
      {
        slug: 'bergen',
        name: 'Bergen',
        julyTemp: 18,
        tag: { en: 'Fjord gateway · 18°C', fr: 'Porte des fjords · 18°C', es: 'Puerta a los fiordos · 18°C', pt: 'Porta dos fiordes · 18°C' },
        why: {
          en: "Norway's gateway to the fjords. Dogs on Bergen Bybanen tram for free, off-lead on Fløyen and Ulriken mountain trails. The Bryggen wharf is dog-welcoming throughout. Norwegian dog culture has zero friction in public spaces. Consistent booking signals from Norwegian users choosing cooler summer destinations.",
          fr: "La porte d'entrée des fjords norvégiens. Chiens gratuits dans le Bybanen, sans laisse sur les sentiers de Fløyen et Ulriken. Le quai de Bryggen est entièrement accessible avec des chiens. Signaux de réservation réguliers d'utilisateurs norvégiens qui choisissent des destinations estivales plus fraîches.",
          es: 'La puerta de entrada a los fiordos noruegos. Perros gratis en el Bybanen, sin correa en Fløyen y Ulriken. El muelle Bryggen es accesible con perros. Señales de reserva consistentes de usuarios noruegos que eligen destinos de verano más frescos.',
          pt: 'A porta de entrada para os fiordes noruegueses. Cães grátis no Bybanen, sem trela em Fløyen e Ulriken. O cais de Bryggen é acessível com cães. Sinais de reserva consistentes de utilizadores noruegueses a escolher destinos de verão mais frescos.',
        },
      },
    ],
  },
  {
    id: 'austria',
    flag: '🇦🇹',
    name: { en: 'Austria', fr: 'Autriche', es: 'Austria', pt: 'Áustria' },
    countrySlug: 'austria',
    country: 'Austria',
    revenueNote: '€2.34',
    destinations: [
      {
        slug: 'innsbruck',
        name: 'Innsbruck',
        julyTemp: 24,
        tag: { en: '574m · Tirol Alps', fr: '574m · Alpes du Tirol', es: '574m · Alpes del Tirol', pt: '574m · Alpes do Tirol' },
        why: {
          en: 'The coolest major Alpine city at 24°C in July. The Nordkette cable car reaches 2,334m in 20 minutes (dogs free with muzzle). Bergisel and Hofgarten parks stay shaded all day. Full city infrastructure, direct trains from Munich and Zurich.',
          fr: "La grande ville alpine la plus fraîche à 24°C en juillet. Le Nordkette atteint 2334m en 20 min, chiens gratuits avec muselière. Le Bergisel et le Hofgarten restent ombragés toute la journée. Trains directs depuis Munich et Zurich.",
          es: 'La gran ciudad alpina más fresca a 24°C en julio. El Nordkette alcanza 2334m en 20 min, perros gratis con bozal. Bergisel y Hofgarten con sombra todo el día. Trenes directos desde Múnich y Zúrich.',
          pt: 'A grande cidade alpina mais fresca a 24°C em julho. O Nordkette atinge 2.334m em 20 min, cães grátis com focinheira. Bergisel e Hofgarten com sombra todo o dia. Comboios diretos de Munique e Zurique.',
        },
      },
      {
        slug: 'hallstatt',
        name: 'Hallstatt',
        julyTemp: 22,
        tag: { en: 'Alpine lake · UNESCO', fr: 'Lac alpin · UNESCO', es: 'Lago alpino · UNESCO', pt: 'Lago alpino · UNESCO' },
        why: {
          en: 'A UNESCO salt-mining village wedged between a mountain wall and the Hallstätter See. Dogs swim in the lake outside the bathing zone. The Echern valley trail above is off-lead and shaded by beech forest. July: 22°C with constant cool lake air.',
          fr: "Un village minier classé UNESCO entre montagne et lac Hallstätter See. Chiens à la nage hors zone de baignade. Le sentier vers la vallée d'Echern est sans laisse et ombragé par des hêtres. Juillet : 22°C avec l'air frais du lac.",
          es: 'Un pueblo minero UNESCO entre una pared montañosa y el lago Hallstätter See. Perros pueden nadar fuera de la zona de baño. El sendero del valle Echern es sin correa y sombreado por hayas. Julio: 22°C con aire fresco del lago.',
          pt: 'Uma aldeia mineira UNESCO entre uma parede de montanha e o lago Hallstätter See. Cães nadam fora da zona de banho. O trilho do vale Echern é sem trela e ensombrado por faias. Julho: 22°C com ar fresco do lago.',
        },
      },
    ],
  },
  {
    id: 'france',
    flag: '🇫🇷',
    name: { en: 'France', fr: 'France', es: 'Francia', pt: 'França' },
    countrySlug: 'france',
    country: 'France',
    destinations: [
      {
        slug: 'biarritz',
        name: 'Biarritz',
        julyTemp: 22,
        tag: { en: 'Surf & Basque coast', fr: 'Surf & côte basque', es: 'Surf & costa vasca', pt: 'Surf & costa basca' },
        why: {
          en: "The Basque coast holds at 22°C while inland France bakes at 38°C. Dogs year-round on Plage de la Milady, and on Côte des Basques outside lifeguard hours. The ocean wind makes it feel like 18°C. Ten minutes from San Sebastián.",
          fr: "La côte basque tient à 22°C pendant que l'intérieur cuit à 38°C. Chiens toute l'année sur la Milady, hors surveillance sur la Côte des Basques. Le vent marin donne une sensation de 18°C. À 10 min de Saint-Sébastien.",
          es: 'La costa vasca se mantiene a 22°C mientras el interior se cuece a 38°C. Perros todo el año en la Milady, fuera de horarios de vigilancia en la Côte des Basques. El viento oceánico lo hace sentir 18°C. A 10 min de San Sebastián.',
          pt: 'A costa basca mantém-se a 22°C enquanto o interior assa a 38°C. Cães durante todo o ano na Milady, fora das horas de vigilância na Côte des Basques. O vento oceânico faz sentir 18°C. A 10 min de San Sebastián.',
        },
      },
      {
        slug: 'annecy',
        name: 'Annecy',
        julyTemp: 25,
        tag: { en: '448m · French Alps', fr: '448m · Alpes françaises', es: '448m · Alpes franceses', pt: '448m · Alpes francesas' },
        why: {
          en: 'Lake Annecy has the cleanest water in Europe and stays at 23°C in summer. Dogs swim in the public sections. Medieval old town fully walkable with dogs. At 448m with Alpine air corridors, July peaks at 25°C vs 36°C in Lyon 140 km south.',
          fr: "Le lac d'Annecy a l'eau la plus propre d'Europe à 23°C en été, chiens autorisés à la nage. Vieille ville médiévale entièrement praticable avec des chiens. À 448m, juillet plafonne à 25°C contre 36°C à Lyon.",
          es: 'El lago de Annecy tiene el agua más limpia de Europa, 23°C en verano, perros pueden nadar. Casco antiguo medieval totalmente accesible con perros. A 448m, julio alcanza 25°C frente a 36°C en Lyon.',
          pt: 'O Lago de Annecy tem a água mais limpa da Europa, 23°C no verão, cães podem nadar. Centro histórico medieval totalmente percorrível com cães. A 448m, julho atinge 25°C contra 36°C em Lyon.',
        },
      },
    ],
  },
  {
    id: 'ireland',
    flag: '🇮🇪',
    name: { en: 'Ireland', fr: 'Irlande', es: 'Irlanda', pt: 'Irlanda' },
    countrySlug: 'ireland',
    country: 'Ireland',
    destinations: [
      {
        slug: 'galway',
        name: 'Galway',
        julyTemp: 18,
        tag: { en: 'Wild Atlantic Way', fr: 'Wild Atlantic Way', es: 'Wild Atlantic Way', pt: 'Wild Atlantic Way' },
        why: {
          en: 'The coolest dog-friendly coast in western Europe at 18°C in July. Dogs on most Irish beaches year-round, free camping at Connemara, and pub culture that welcomes dogs inside. The safest summer coast for flat-faced or elderly dogs in Europe.',
          fr: "La côte dog-friendly la plus fraîche d'Europe occidentale à 18°C en juillet. Chiens sur presque toutes les plages irlandaises toute l'année, camping libre en Connemara, pubs qui accueillent les chiens. La côte estivale la plus sûre pour les chiens brachycéphales ou âgés.",
          es: 'La costa dog-friendly más fresca de Europa occidental a 18°C en julio. Perros en casi todas las playas irlandesas todo el año, camping libre en Connemara, pubs que acogen perros. La costa veraniega más segura para perros braquicéfalos o mayores.',
          pt: 'A costa dog-friendly mais fresca da Europa ocidental a 18°C em julho. Cães em quase todas as praias irlandesas durante todo o ano, campismo livre no Connemara, pubs que acolhem cães. A costa de verão mais segura para cães braquicefálicos ou idosos.',
        },
      },
    ],
  },
  {
    id: 'switzerland',
    flag: '🇨🇭',
    name: { en: 'Switzerland', fr: 'Suisse', es: 'Suiza', pt: 'Suíça' },
    countrySlug: 'switzerland',
    country: 'Switzerland',
    destinations: [
      {
        slug: 'grindelwald',
        name: 'Grindelwald',
        julyTemp: 19,
        tag: { en: '1,034m · Bernese Alps', fr: '1034m · Alpes bernoises', es: '1034m · Alpes berneses', pt: '1034m · Alpes berneses' },
        why: {
          en: 'Eiger North Face above, Grindelwald First plateau at 2,168m for off-lead hiking, Bachalpsee lake for dog swimming. Swiss trains accept dogs for €12. July: 19°C vs 35°C in Rome at the same time.',
          fr: "Face nord de l'Eiger, plateau de First à 2168m pour randonnée sans laisse, lac Bachalpsee pour nager. Trains suisses +12€ pour chien. Juillet : 19°C contre 35°C à Rome au même moment.",
          es: 'Cara norte del Eiger, meseta First a 2168m para senderismo sin correa, lago Bachalpsee para nadar. Trenes suizos +12€ por perro. Julio: 19°C frente a 35°C en Roma al mismo tiempo.',
          pt: 'Face norte do Eiger, planalto First a 2.168m para caminhadas sem trela, lago Bachalpsee para nadar. Comboios suíços +12€ por cão. Julho: 19°C contra 35°C em Roma ao mesmo tempo.',
        },
      },
      {
        slug: 'locarno',
        name: 'Locarno',
        julyTemp: 27,
        tag: { en: 'Swiss-Italian lakes · Ticino', fr: 'Lacs suisses-italiens · Tessin', es: 'Lagos suizo-italianos · Tesino', pt: 'Lagos suíço-italianos · Ticino' },
        why: {
          en: 'Warmest here at 27°C but Valle Maggia rises to 2,000m behind the city. A 30-minute drive to Bosco Gurin drops it to 18°C. Ticino dog culture means most restaurant terraces accept dogs.',
          fr: "Le plus chaud de la liste à 27°C, mais la Valle Maggia monte à 2000m derrière · 30 min jusqu'à Bosco Gurin pour descendre à 18°C. La culture dog-friendly du Tessin : terrasses ouvertes aux chiens.",
          es: 'El más cálido a 27°C pero el Valle Maggia sube a 2000m · 30 min hasta Bosco Gurin bajan a 18°C. Cultura dog-friendly del Tesino: terrazas abiertas a perros.',
          pt: 'O mais quente a 27°C mas o Valle Maggia sobe a 2.000m, 30 min até Bosco Gurin baixa para 18°C. Cultura dog-friendly do Ticino: esplanadas abertas a cães.',
        },
      },
    ],
  },
  {
    id: 'portugal',
    flag: '🇵🇹',
    name: { en: 'Portugal', fr: 'Portugal', es: 'Portugal', pt: 'Portugal' },
    countrySlug: 'portugal',
    country: 'Portugal',
    destinations: [
      {
        slug: 'peniche',
        name: 'Peniche',
        julyTemp: 23,
        tag: { en: 'Atlantic surf peninsula', fr: 'Péninsule surf atlantique', es: 'Península surf atlántico', pt: 'Península surf atlântico' },
        why: {
          en: 'A fishing peninsula 90 km north of Lisbon where the Atlantic never reaches 20°C. Cliff walks, 16th-century fortress, Baleal surf beach. All dogs on lead. July peaks at 23°C air · 8°C below Lisbon at the same time.',
          fr: "Péninsule de pêcheurs à 90 km au nord de Lisbonne où l'Atlantique ne dépasse pas 20°C. Sentiers côtiers, forteresse du XVIe, plage de Baleal. Chiens en laisse. Pic de juillet à 23°C, 8°C de moins que Lisbonne.",
          es: 'Península pesquera a 90 km al norte de Lisboa donde el Atlántico nunca alcanza 20°C. Rutas costeras, fortaleza del s.XVI, playa de Baleal. Perros con correa. Julio pico a 23°C, 8°C menos que Lisboa.',
          pt: 'Península piscatória a 90 km a norte de Lisboa onde o Atlântico nunca atinge 20°C. Percursos costeiros, fortaleza do séc. XVI, praia de Baleal. Cães com trela. Pico de julho a 23°C, 8°C abaixo de Lisboa.',
        },
      },
    ],
  },
  {
    id: 'germany',
    flag: '🇩🇪',
    name: { en: 'Germany', fr: 'Allemagne', es: 'Alemania', pt: 'Alemanha' },
    countrySlug: 'germany',
    country: 'Germany',
    destinations: [
      {
        slug: 'freiburg',
        name: 'Freiburg',
        julyTemp: 24,
        tag: { en: 'Black Forest gateway', fr: 'Porte de la Forêt-Noire', es: 'Puerta de la Selva Negra', pt: 'Porta da Floresta Negra' },
        why: {
          en: "Germany's sunniest city but the Black Forest starts at the city edge. 20 minutes by tram to 200 km of shaded off-lead trails. Dogs on the Schauinsland cable car and in most forest Gasthäuser. July: 24°C in town, 16°C in the forest.",
          fr: "La ville la plus ensoleillée d'Allemagne mais la Forêt-Noire commence au bord de la ville. 20 min en tram vers 200 km de sentiers ombragés sans laisse. Chiens au téléphérique Schauinsland. Juillet : 24°C en ville, 16°C en forêt.",
          es: 'La ciudad más soleada de Alemania pero el Bosque Negro empieza en el borde urbano. 20 min en tranvía hacia 200 km de senderos sombreados sin correa. Perros en el Schauinsland. Julio: 24°C en la ciudad, 16°C en el bosque.',
          pt: 'A cidade mais soalheira da Alemanha mas a Floresta Negra começa na beira da cidade. 20 min de elétrico para 200 km de trilhos ensombrados sem trela. Cães no Schauinsland. Julho: 24°C na cidade, 16°C na floresta.',
        },
      },
    ],
  },
  {
    id: 'slovenia',
    flag: '🇸🇮',
    name: { en: 'Slovenia', fr: 'Slovénie', es: 'Eslovenia', pt: 'Eslovénia' },
    countrySlug: 'slovenia',
    country: 'Slovenia',
    destinations: [
      {
        slug: 'bled',
        name: 'Bled',
        julyTemp: 23,
        tag: { en: '501m · Julian Alps', fr: '501m · Alpes juliennes', es: '501m · Alpes julianas', pt: '501m · Alpes julianas' },
        why: {
          en: 'Lake Bled at 501m ringed by Julian Alps, clifftop castle, 6-km dog-friendly circular trail. Dogs swim in non-lifeguarded sections year-round. July peaks at 23°C. Half the price of Switzerland.',
          fr: "Lac de Bled à 501m cerné par les Alpes juliennes, château sur falaise, sentier circulaire dog-friendly de 6 km. Chiens à la nage hors zones gardées. Juillet pic à 23°C. Moitié prix de la Suisse.",
          es: 'Lago Bled a 501m rodeado de Alpes julianos, castillo en acantilado, sendero circular dog-friendly de 6 km. Perros nadan fuera de zonas vigiladas. Julio pico 23°C. Mitad del precio de Suiza.',
          pt: 'Lago Bled a 501m rodeado pelos Alpes julianos, castelo no topo da falésia, trilho circular dog-friendly de 6 km. Cães nadam fora das zonas vigiadas. Julho pico 23°C. Metade do preço da Suíça.',
        },
      },
    ],
  },
  {
    id: 'italy',
    flag: '🇮🇹',
    name: { en: 'Italy', fr: 'Italie', es: 'Italia', pt: 'Itália' },
    countrySlug: 'italy',
    country: 'Italy',
    destinations: [
      {
        slug: 'como',
        name: 'Lake Como',
        julyTemp: 26,
        tag: { en: 'Alpine lake · Lombardy', fr: 'Lac alpin · Lombardie', es: 'Lago alpino · Lombardía', pt: 'Lago alpino · Lombardia' },
        why: {
          en: 'At 198m, Lake Como stays 8°C cooler than Milan in July. Dog-friendly promenades at Bellagio, Varenna, Menaggio. The ferry network accepts dogs for €1. Mountain paths above the lake reach 1,500m for cool-air hiking.',
          fr: "À 198m, le lac de Côme reste 8°C plus frais que Milan en juillet. Promenades dog-friendly à Bellagio, Varenna, Menaggio. Ferries à 1€ pour les chiens. Sentiers de montagne jusqu'à 1500m.",
          es: 'A 198m, el lago de Como está 8°C más fresco que Milán en julio. Paseos dog-friendly en Bellagio, Varenna, Menaggio. Ferries a 1€ para perros. Senderos de montaña hasta 1500m.',
          pt: 'A 198m, o Lago de Como mantém-se 8°C mais fresco do que Milão em julho. Passeios dog-friendly em Bellagio, Varenna, Menaggio. Ferries a 1€ para cães. Percursos de montanha até 1.500m.',
        },
      },
    ],
  },
  {
    id: 'denmark',
    flag: '🇩🇰',
    name: { en: 'Denmark', fr: 'Danemark', es: 'Dinamarca', pt: 'Dinamarca' },
    countrySlug: 'denmark',
    country: 'Denmark',
    destinations: [
      {
        slug: 'copenhagen',
        name: 'Copenhagen',
        julyTemp: 22,
        tag: { en: 'Scandinavian design capital', fr: 'Capitale du design scandinave', es: 'Capital del diseño escandinavo', pt: 'Capital do design escandinavo' },
        why: {
          en: 'Dogs on Metro (small carrier) and S-Tog (on lead, free). Five off-lead parks in the city ring. Amager Strandpark beach allows dogs year-round in the morning. Canal harbour Havnebad has a dog-friendly entry. 22°C in July, quieter in August.',
          fr: "Chiens dans le Métro (panier) et S-Tog (laisse, gratuit). Cinq parcs sans laisse dans la ville. Amager Strandpark le matin. Havnebad avec accès dog-friendly. 22°C en juillet.",
          es: 'Perros en Metro (transportín) y S-Tog (correa, gratis). Cinco parques sin correa. Amager Strandpark por la mañana. Havnebad con acceso dog-friendly. 22°C en julio.',
          pt: 'Cães no Metro (caixa) e S-Tog (trela, grátis). Cinco parques sem trela. Amager Strandpark de manhã. Havnebad com acesso dog-friendly. 22°C em julho.',
        },
      },
    ],
  },
  {
    id: 'estonia',
    flag: '🇪🇪',
    name: { en: 'Estonia', fr: 'Estonie', es: 'Estonia', pt: 'Estónia' },
    countrySlug: 'estonia',
    country: 'Estonia',
    destinations: [
      {
        slug: 'tallinn',
        name: 'Tallinn',
        julyTemp: 21,
        tag: { en: 'Medieval Baltic capital', fr: 'Capitale baltique médiévale', es: 'Capital báltica medieval', pt: 'Capital báltica medieval' },
        why: {
          en: 'UNESCO medieval old town, 21°C in July, dogs on buses and trams for free. Pirita beach north of the city allows dogs year-round. Half the cost of Copenhagen for accommodation. One of our most consistent cities for pet-friendly hotel bookings.',
          fr: "Vieille ville UNESCO à 21°C en juillet, chiens gratuits bus et trams. Plage Pirita toute l'année. Moitié prix de Copenhague. L'une de nos villes les plus régulières pour les réservations d'hôtels pet-friendly.",
          es: 'Ciudad vieja UNESCO a 21°C en julio, perros gratis en autobuses y tranvías. Playa Pirita todo el año. Mitad del precio de Copenhague. Una de nuestras ciudades más consistentes para reservas de hoteles pet-friendly.',
          pt: 'Cidade velha UNESCO a 21°C em julho, cães grátis em autocarros e elétricos. Praia Pirita durante todo o ano. Metade do preço de Copenhague. Uma das nossas cidades mais consistentes para reservas de hotéis pet-friendly.',
        },
      },
    ],
  },
  {
    id: 'united-kingdom',
    flag: '🇬🇧',
    name: { en: 'United Kingdom', fr: 'Royaume-Uni', es: 'Reino Unido', pt: 'Reino Unido' },
    countrySlug: 'united-kingdom',
    country: 'United Kingdom',
    destinations: [
      {
        slug: 'edinburgh',
        name: 'Edinburgh',
        julyTemp: 19,
        tag: { en: "Scottish Highlands gateway", fr: 'Porte des Highlands', es: 'Puerta de las Highlands', pt: 'Porta das Highlands' },
        why: {
          en: "Scotland's capital at 19°C in July. Dogs on Arthur's Seat (extinct volcano in the city centre), on Portobello Beach year-round, and in most pubs. Scottish dog culture is arguably the most permissive in Europe. Scotrail tickets include your dog free.",
          fr: "La capitale écossaise à 19°C en juillet. Chiens sur Arthur's Seat, sur la plage de Portobello toute l'année, et dans la plupart des pubs. La culture canine écossaise est la plus permissive d'Europe. Scotrail inclut le chien gratuitement.",
          es: "La capital escocesa a 19°C en julio. Perros en Arthur's Seat, en la playa Portobello todo el año, y en la mayoría de pubs. La cultura canina escocesa es la más permisiva de Europa. Los billetes Scotrail incluyen al perro gratis.",
          pt: "A capital escocesa a 19°C em julho. Cães em Arthur's Seat, na praia de Portobello durante todo o ano, e na maioria dos pubs. A cultura canina escocesa é a mais permissiva da Europa. Os bilhetes Scotrail incluem o cão gratuitamente.",
        },
      },
    ],
  },
]

const T = {
  title: {
    en: 'Best Destinations to Escape the Heat with Your Dog: Europe 2026',
    fr: 'Meilleures destinations pour échapper à la chaleur avec son chien: Europe 2026',
    es: 'Mejores destinos para escapar del calor con tu perro: Europa 2026',
    pt: 'Melhores destinos para escapar do calor com o seu cão: Europa 2026',
  },
  metaTitle: {
    en: '16 Dog-Friendly Destinations to Escape the Heat in Europe (2026)',
    fr: '16 destinations dog-friendly pour fuir la chaleur en Europe (2026)',
    es: '16 destinos dog-friendly para escapar del calor en Europa (2026)',
    pt: '16 destinos dog-friendly para escapar do calor na Europa (2026)',
  },
  metaDesc: {
    en: "Escape Europe's summer heat with your dog: 13 countries, 16 destinations under 27°C in July, ranked by real booking revenue. Pet-friendly hotels included.",
    fr: 'Fuyez la chaleur estivale avec votre chien : 13 pays, 16 destinations sous 27°C en juillet, classées par revenu de réservation réel. Hôtels pet-friendly inclus.',
    es: 'Escapa del calor veraniego con tu perro: 13 países, 16 destinos bajo 27°C en julio, ordenados por ingresos de reserva reales. Hoteles pet-friendly incluidos.',
    pt: 'Fuja do calor de verão com o seu cão: 13 países, 16 destinos abaixo de 27°C em julho, ordenados por receita de reserva real. Hotéis pet-friendly incluídos.',
  },
  intro: {
    en: "When the thermometer in Barcelona, Rome, or Athens hits 38°C, dogs with flat faces stop breathing efficiently. Senior dogs overheat in under 20 minutes in direct sun above 30°C. These 16 destinations across 13 countries stay under 27°C in July. We've ranked them by what our booking data actually converts: the countries that paid out most in June come first.",
    fr: "Quand le thermomètre à Barcelone, Rome ou Athènes atteint 38°C, les chiens à face plate cessent de respirer efficacement. Les chiens âgés surchauffent en moins de 20 min au soleil direct. Ces 16 destinations dans 13 pays restent sous 27°C en juillet. Classées par ce que nos données de réservation convertissent réellement : les pays qui ont le plus rapporté en juin passent en premier.",
    es: 'Cuando el termómetro en Barcelona, Roma o Atenas alcanza los 38°C, los perros de cara plana dejan de respirar eficientemente. Los perros mayores se sobrecalientan en menos de 20 min al sol. Estos 16 destinos en 13 países se mantienen bajo 27°C en julio. Clasificados por lo que nuestros datos de reserva convierten realmente: los países que más ingresaron en junio van primero.',
    pt: 'Quando o termómetro em Barcelona, Roma ou Atenas atinge os 38°C, os cães de cara achatada param de respirar eficientemente. Os cães idosos sobreaquecem em menos de 20 min ao sol. Estes 16 destinos em 13 países mantêm-se abaixo de 27°C em julho. Classificados pelo que os nossos dados de reserva realmente convertem: os países que mais renderam em junho vêm primeiro.',
  },
  julyTemp: { en: 'July avg high', fr: 'Max moy. juillet', es: 'Máx. prom. julio', pt: 'Máx. méd. julho' },
  seeHotels: { en: 'See pet-friendly hotels', fr: 'Voir les hôtels pet-friendly', es: 'Ver hoteles pet-friendly', pt: 'Ver hotéis pet-friendly' },
  seeGuide: { en: 'Dog travel guide', fr: 'Guide voyage chien', es: 'Guía viaje perro', pt: 'Guia viagem cão' },
  seeCountry: { en: 'All hotels in', fr: 'Tous les hôtels en', es: 'Todos los hoteles en', pt: 'Todos os hotéis em' },
  breadHome: { en: 'Home', fr: 'Accueil', es: 'Inicio', pt: 'Início' },
  breadGuides: { en: 'Guides', fr: 'Guides', es: 'Guías', pt: 'Guias' },
  revenueTop: { en: 'Top revenue', fr: 'Top revenu', es: 'Top ingresos', pt: 'Top receita' },
  faq: {
    q1: { en: 'At what temperature does heat become dangerous for dogs?', fr: 'À quelle température la chaleur devient-elle dangereuse pour les chiens ?', es: '¿A qué temperatura el calor se vuelve peligroso para los perros?', pt: 'A que temperatura o calor se torna perigoso para os cães?' },
    a1: { en: 'Heatstroke risk rises sharply above 25°C, especially for brachycephalic breeds (bulldogs, pugs, French bulldogs), senior dogs (over 7 years), and overweight dogs. At 30°C in direct sun with high humidity, a flat-faced dog can develop heatstroke in under 20 minutes. All destinations on this page stay at or below 27°C in July.', fr: "Le risque de coup de chaleur augmente fortement au-dessus de 25°C, surtout pour les races brachycéphales (bouledogues, carlins), les chiens âgés (plus de 7 ans) et en surpoids. À 30°C au soleil avec humidité élevée, un chien brachycéphale peut faire un coup de chaleur en moins de 20 min. Toutes les destinations de cette page restent à 27°C ou moins en juillet.", es: 'El riesgo de golpe de calor sube bruscamente por encima de 25°C, especialmente para razas braquicéfalas, perros mayores y obesos. A 30°C bajo el sol con alta humedad, un perro de cara plana puede sufrir un golpe de calor en menos de 20 min. Todos los destinos de esta página se mantienen en 27°C o menos en julio.', pt: 'O risco de insolação sobe acentuadamente acima de 25°C, especialmente para raças braquicefálicas, cães idosos e obesos. A 30°C ao sol com humidade elevada, um cão de cara achatada pode sofrer insolação em menos de 20 min. Todos os destinos desta página mantêm-se a 27°C ou abaixo em julho.' },
    q2: { en: 'Which country in Europe is coolest for dogs in summer?', fr: "Quel pays d'Europe est le plus frais pour les chiens en été ?", es: '¿Qué país europeo es el más fresco para los perros en verano?', pt: 'Qual país europeu é mais fresco para cães no verão?' },
    a2: { en: 'Ireland and Norway have the lowest July temperatures among mainstream tourist destinations: both averaging 18°C. Lithuania (Neringa) and Estonia (Tallinn) offer the best value at 18–21°C with strong dog-friendly infrastructure. For absolute minimum heat, Iceland averages 13°C in July but has limited pet-friendly hotel availability.', fr: "L'Irlande et la Norvège ont les températures de juillet les plus basses parmi les destinations touristiques courantes: toutes deux à 18°C en moyenne. La Lituanie (Neringa) et l'Estonie (Tallinn) offrent le meilleur rapport qualité-prix à 18-21°C avec une infrastructure dog-friendly solide.", es: 'Irlanda y Noruega tienen las temperaturas de julio más bajas entre los destinos turísticos principales, ambas con 18°C de media. Lituania (Neringa) y Estonia (Tallin) ofrecen la mejor relación calidad-precio a 18-21°C con buena infraestructura dog-friendly.', pt: 'A Irlanda e a Noruega têm as temperaturas de julho mais baixas entre os destinos turísticos principais, ambas com 18°C de média. A Lituânia (Neringa) e a Estónia (Tallinn) oferecem a melhor relação qualidade-preço a 18-21°C com boa infraestrutura dog-friendly.' },
    q3: { en: 'Which destination has the best dog-friendly beaches in Europe in summer?', fr: 'Quelle destination a les meilleures plages dog-friendly en Europe en été ?', es: '¿Qué destino tiene las mejores playas dog-friendly en Europa en verano?', pt: 'Qual destino tem as melhores praias dog-friendly na Europa no verão?' },
    a3: { en: "Neringa (Lithuania) leads: unlimited off-lead running on lagoon beaches at 21°C. Peniche (Portugal) follows with Atlantic surf beaches at 23°C. Galway (Ireland) offers Wild Atlantic Way beaches with dogs year-round at 18°C. All three avoid the Mediterranean's summer dog-ban season (most Italian, French, and Spanish beaches ban dogs June–September).", fr: "Neringa (Lituanie) en tête : course sans laisse illimitée sur les plages de la lagune à 21°C. Peniche (Portugal) suit avec plages de surf atlantique à 23°C. Galway (Irlande) offre les plages du Wild Atlantic Way avec chiens toute l'année à 18°C. Ces trois destinations évitent l'interdiction estivale méditerranéenne (la plupart des plages italiennes, françaises et espagnoles interdisent les chiens de juin à septembre).", es: 'Neringa (Lituania) lidera: carrera sin correa ilimitada en playas de laguna a 21°C. Peniche (Portugal) sigue con playas de surf atlántico a 23°C. Galway (Irlanda) ofrece playas de Wild Atlantic Way con perros todo el año a 18°C. Las tres evitan la temporada de prohibición mediterránea (la mayoría de playas italianas, francesas y españolas prohíben perros de junio a septiembre).', pt: 'Neringa (Lituânia) lidera: corrida sem trela ilimitada nas praias da lagoa a 21°C. Peniche (Portugal) segue com praias de surf atlântico a 23°C. Galway (Irlanda) oferece praias do Wild Atlantic Way com cães durante todo o ano a 18°C. As três evitam a proibição estival mediterrânica (a maioria das praias italianas, francesas e espanholas proibem cães de junho a setembro).' },
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
          {/* Country jump links */}
          <div className="flex flex-wrap gap-2 mt-8">
            {COUNTRIES.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-full transition-colors"
              >
                {c.flag} {p(c.name, locale)}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Country deep-dive guides */}
      <section className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-xl font-extrabold text-gray-900 mb-1">
            {locale === 'fr' ? 'Guides par pays (fraîcheur + chien)' : locale === 'es' ? 'Guías por país (frescor + perro)' : locale === 'pt' ? 'Guias por país (frescura + cão)' : 'Country guides (cool + dog-friendly)'}
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            {locale === 'fr' ? '6 guides complets avec hôtels, sentiers et conseils locaux.' : locale === 'es' ? '6 guías completas con hoteles, senderos y consejos locales.' : locale === 'pt' ? '6 guias completos com hotéis, trilhos e dicas locais.' : '6 in-depth guides with hotels, trails and local tips.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COUNTRY_GUIDES.map((g) => (
              <Link
                key={g.slug}
                href={`/${locale}/guides/${g.slug}`}
                className="group flex items-start gap-3 bg-white rounded-2xl border border-amber-100 hover:border-orange-300 hover:shadow-md transition-all p-4"
              >
                <span className="text-3xl flex-shrink-0">{g.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-gray-900 text-sm group-hover:text-orange-700 transition-colors">
                      {locale === 'fr' ? g.label.fr : locale === 'es' ? g.label.es : locale === 'pt' ? g.label.pt : g.label.en}
                    </p>
                    <span className="text-xs font-black text-blue-600">{g.maxTemp}°C</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-snug">
                    {locale === 'fr' ? g.desc.fr : locale === 'es' ? g.desc.es : locale === 'pt' ? g.desc.pt : g.desc.en}
                  </p>
                </div>
                <span className="flex-shrink-0 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all text-lg mt-0.5">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Countries */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {COUNTRIES.map((ctry, ctryIdx) => (
          <section key={ctry.id} id={ctry.id}>
            {/* Country header */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-4xl leading-none">{ctry.flag}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-extrabold text-gray-900">{p(ctry.name, locale)}</h2>
                    {ctry.revenueNote && (
                      <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        {p(T.revenueTop, locale)} {ctry.revenueNote}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/${locale}/countries/${ctry.countrySlug}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {p(T.seeCountry, locale)} {p(ctry.name, locale)} →
                  </Link>
                </div>
              </div>
              <div className="text-2xl font-black text-gray-200 select-none tabular-nums">
                {String(ctryIdx + 1).padStart(2, '0')}
              </div>
            </div>

            {/* Destination cards */}
            <div className="space-y-4">
              {ctry.destinations.map((dest) => (
                <div
                  key={dest.slug}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl font-extrabold text-gray-900">{dest.name}</h3>
                        <div className="inline-flex items-center gap-1 bg-cyan-50 text-cyan-700 text-xs font-semibold px-2.5 py-1 rounded-full mt-1">
                          {p(dest.tag, locale)}
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div className="text-2xl font-black text-blue-600">{dest.julyTemp}°C</div>
                        <div className="text-xs text-gray-500">{p(T.julyTemp, locale)}</div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{p(dest.why, locale)}</p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={buildAllezDestLink(dest.name, ctry.country, `${CAMPAIGN}-${dest.slug}`, 3)}
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
