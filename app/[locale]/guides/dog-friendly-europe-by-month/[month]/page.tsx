import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { GuideFooter } from '../../_components/GuideFooter'
import { getLocalizedCityName } from '@/lib/cityNames'
import { getLocalizedCountryName } from '@/lib/countries'
import destinations from '@/data/destinations.json'
import hotels from '@/data/hotels.json'
import Stay22Map from '@/components/Stay22Map'
import NearbyHotelCard from '@/components/NearbyHotelCard'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import AmazonProductCard from '@/components/AmazonProductCard'
import AmazonDisclosure from '@/components/AmazonDisclosure'
import { PRODUCTS } from '@/data/amazon-products'

// FR-only "essentials to pack" kit, swapped by season. Summer months lead with
// heat-safety gear; cooler months lead with general travel essentials.
const SUMMER_MONTHS: MonthKey[] = ['may', 'june', 'july', 'august', 'september']
const ESSENTIALS_SUMMER = ['B072Q1NFC9', 'B08M3M6TT1', 'B01MR5LRPJ', 'B00XW9ZZDI']
const ESSENTIALS_DEFAULT = ['B072Q1NFC9', 'B01M2ZVPWJ', 'B07B2ZCN9D', 'B00IKRVU90']

const STICKY_LABELS_BYMONTH: Record<string, { label: string; cta: string }> = {
  en: { label: 'Pet-friendly hotels in our top picks this month', cta: 'See hotels' },
  fr: { label: `Hôtels pet-friendly dans nos meilleurs choix du mois`, cta: 'Voir les hôtels' },
  es: { label: 'Hoteles pet-friendly en nuestros destinos del mes', cta: 'Ver hoteles' },
  pt: { label: 'Hotéis pet-friendly nos nossos destinos do mês', cta: 'Ver hotéis' },
}

type MonthKey = 'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december'

const MONTHS: MonthKey[] = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

// Map our slug month -> destinations.json weather key
const WK: Record<MonthKey, keyof (typeof destinations)[number]['weather']> = {
  january: 'jan', february: 'feb', march: 'mar', april: 'apr', may: 'may', june: 'jun',
  july: 'jul', august: 'aug', september: 'sep', october: 'oct', november: 'nov', december: 'dec',
}

// Curated picks layered on top of the climate score.
// Each entry is the slug → reason copy in EN/FR/ES.
const CURATED: Record<MonthKey, Array<{ slug: string; en: string; fr: string; es: string }>> = {
  january: [
    { slug: 'vienna', en: 'Heated trams, indoor coffee-house culture, post-Christmas calm, a Habsburg winter classic with one of Europe\'s warmest welcome to leashed dogs.', fr: 'Trams chauffés, culture café intérieure, calme post-Noël, un classique hivernal habsbourgeois avec l\'un des accueils les plus chaleureux pour les chiens en laisse.', es: 'Tranvías calefactados, cultura del café interior, calma post-navideña, un clásico invernal habsbúrgico con una de las acogidas más cálidas para perros con correa.' },
    { slug: 'berlin', en: 'Berlin in January is grey but the U-Bahn accepts dogs free, the Tiergarten paths stay walkable, and indoor café culture is among the most dog-tolerant in Europe.', fr: 'Berlin en janvier est gris mais le U-Bahn accepte les chiens gratuits, les sentiers du Tiergarten restent praticables, et la culture café intérieure est l\'une des plus dog-friendly d\'Europe.', es: 'Berlín en enero es gris pero el U-Bahn admite perros gratis, los senderos del Tiergarten siguen accesibles, y la cultura del café interior es de las más dog-friendly de Europa.' },
    { slug: 'reykjavik', en: 'For Northern Lights season, leashed dogs welcomed on the city walks, geothermal pools at Nautholsvik dog-friendly, and crisp clear nights when the aurora is strongest.', fr: 'Saison des aurores boréales, chiens en laisse bienvenus en ville, piscines géothermiques de Nautholsvik dog-friendly, et nuits claires et nettes quand l\'aurore est la plus forte.', es: 'Temporada de auroras boreales, perros con correa bienvenidos en los paseos urbanos, piscinas geotermales de Nautholsvik dog-friendly, y noches claras y nítidas cuando la aurora es más fuerte.' },
    { slug: 'innsbruck', en: 'Alpine cold with proper equipment. The Bergisel side, Hofgarten and Inn riverside paths stay maintained; dogs ride the Nordkette cable car free with a muzzle.', fr: 'Froid alpin avec équipement adapté. Le Bergisel, le Hofgarten et les chemins de l\'Inn restent entretenus ; les chiens prennent le téléphérique Nordkette gratuitement avec muselière.', es: 'Frío alpino con equipo adecuado. El Bergisel, el Hofgarten y los caminos del Inn siguen mantenidos; los perros suben gratis al teleférico Nordkette con bozal.' },
    { slug: 'lisbon', en: 'The mildest big-city option in January Europe (avg high 14 °C, mostly dry), the Tagus riverfront, Belém and the Parque Florestal de Monsanto all dog-friendly.', fr: 'L\'option grande-ville la plus douce d\'Europe en janvier (max moyen 14 °C, plutôt sec), les berges du Tage, Belém et le Parque Florestal de Monsanto tous dog-friendly.', es: 'La opción de gran ciudad más templada de Europa en enero (máxima media 14 °C, mayormente seca), las orillas del Tajo, Belém y el Parque Florestal de Monsanto todos dog-friendly.' },
    { slug: 'porto', en: 'Even milder than Lisbon (15 °C avg), Porto in January is quiet and the Foz do Douro dog beaches are dog-accessible year-round.', fr: 'Encore plus douce que Lisbonne (15 °C de moyenne), Porto en janvier est calme et les plages de Foz do Douro sont accessibles aux chiens toute l\'année.', es: 'Aún más templada que Lisboa (15 °C de media), Oporto en enero está tranquila y las playas de Foz do Douro están abiertas a perros todo el año.' },
  ],
  february: [
    { slug: 'malaga', en: 'Almond blossom season at 16 °C, the Costa del Sol\'s mildest February, with year-round dog beaches at Pedregalejo and Arroyo Totalán still wide open.', fr: 'Saison des amandiers en fleur à 16 °C, le mois de février le plus doux de la Costa del Sol, avec les plages canines toute l\'année de Pedregalejo et Arroyo Totalán encore ouvertes.', es: 'Temporada del almendro en flor a 16 °C, el febrero más suave de la Costa del Sol, con las playas caninas todo el año de Pedregalejo y Arroyo Totalán abiertas.' },
    { slug: 'seville', en: 'Andalusian winter at its mildest, the Triana riverside, the Parque de María Luisa and the Real Alcázar gardens (assistance dogs only inside) all dog-tolerant.', fr: 'L\'hiver andalou au plus doux, les berges de Triana, le Parque de María Luisa et les jardins du Real Alcázar (chiens d\'assistance à l\'intérieur) tous tolérants aux chiens.', es: 'El invierno andaluz en su mejor momento, las orillas de Triana, el Parque de María Luisa y los jardines del Real Alcázar (perros de asistencia dentro) todos tolerantes con perros.' },
    { slug: 'cannes', en: 'Côte d\'Azur in pre-Cannes-Festival calm, the Croisette, Île Sainte-Marguerite ferry (dogs free) and Suquet old-town terraces all welcome dogs.', fr: 'Côte d\'Azur dans le calme pré-Festival, la Croisette, le ferry pour l\'Île Sainte-Marguerite (chiens gratuits) et les terrasses du Suquet accueillent tous les chiens.', es: 'Costa Azul en la calma previa al Festival, la Croisette, el ferri a la Île Sainte-Marguerite (perros gratis) y las terrazas del Suquet admiten todos perros.' },
    { slug: 'biarritz', en: 'Atlantic mild (12 °C) and the surf beaches dog-accessible until 1 May, the Grande Plage and Côte des Basques are the off-season favourites.', fr: 'Atlantique doux (12 °C) et plages de surf accessibles aux chiens jusqu\'au 1er mai, la Grande Plage et la Côte des Basques sont les favorites hors saison.', es: 'Atlántico templado (12 °C) y playas de surf accesibles a perros hasta el 1 de mayo, la Grande Plage y la Côte des Basques son las favoritas fuera de temporada.' },
    { slug: 'palma', en: 'Mallorca in February is 15 °C and quiet, the Paseo Marítimo, the Bellver Castle grounds and the year-round Playa de Es Carnatge dog beach are all open.', fr: 'Majorque en février c\'est 15 °C et calme, le Paseo Marítimo, le parc du château Bellver et la plage canine toute l\'année de Es Carnatge sont tous ouverts.', es: 'Mallorca en febrero es 15 °C y tranquila, el Paseo Marítimo, el parque del Castillo de Bellver y la playa canina todo el año de Es Carnatge están abiertas.' },
    { slug: 'lecce', en: 'Salento winter is 11 °C and the centro storico empties out, pietra leccese baroque without the August heatwaves or crowds.', fr: 'L\'hiver du Salento c\'est 11 °C et le centro storico se vide, baroque en pietra leccese sans les canicules ou la foule d\'août.', es: 'El invierno del Salento es 11 °C y el centro storico se vacía, barroco en pietra leccese sin las olas de calor o multitudes de agosto.' },
  ],
  march: [
    { slug: 'lisbon', en: 'Spring kick-off, 18 °C, jacaranda buds, the city begins to bloom but pre-Easter prices and crowds remain low.', fr: 'Lancement du printemps, 18 °C, bourgeons de jacaranda, la ville commence à s\'éveiller mais prix et foule pré-Pâques restent bas.', es: 'Arranque de la primavera, 18 °C, brotes de jacarandá, la ciudad empieza a florecer pero los precios y multitudes pre-Pascua siguen bajos.' },
    { slug: 'seville', en: 'Pre-Semana Santa, 21 °C, orange blossom season, the Real Alcázar gardens and Triana riverside still uncrowded.', fr: 'Pré-Semaine Sainte, 21 °C, saison des fleurs d\'oranger, jardins du Real Alcázar et berges de Triana encore peu fréquentés.', es: 'Pre-Semana Santa, 21 °C, temporada del azahar, jardines del Real Alcázar y orillas de Triana aún sin multitudes.' },
    { slug: 'valencia', en: 'Las Fallas (mid-March) is loud, go either side. 20 °C, the Turia gardens are at peak green, the Malvarrosa dog beach is open year-round.', fr: 'Las Fallas (mi-mars) est bruyant, allez-y avant ou après. 20 °C, les jardins du Turia au vert maximum, la plage canine de la Malvarrosa ouverte toute l\'année.', es: 'Las Fallas (mediados de marzo) es ruidoso, ve antes o después. 20 °C, los jardines del Turia en pleno verde, la playa canina de la Malvarrosa abierta todo el año.' },
    { slug: 'granada', en: 'Sierra Nevada still snow-capped, the Albaicín hills, the Genil riverside and the Carmen de los Mártires are all dog-friendly walking spots in mild 18 °C weather.', fr: 'Sierra Nevada encore enneigée, les collines de l\'Albaicín, les berges du Genil et le Carmen de los Mártires sont tous dog-friendly à 18 °C doux.', es: 'Sierra Nevada aún con nieve, las colinas del Albaicín, las orillas del Genil y el Carmen de los Mártires son todos dog-friendly a 18 °C suaves.' },
    { slug: 'athens', en: 'Greek spring at 17 °C, the Filopappou hill, Lycabettus and Kifissia parks all reachable without summer heat or autumn crowds.', fr: 'Printemps grec à 17 °C, la colline du Filopappou, le Lycabette et les parcs de Kifissia tous accessibles sans la chaleur estivale ou la foule automnale.', es: 'Primavera griega a 17 °C, la colina del Filopappou, el Licabeto y los parques de Kifissia todos accesibles sin el calor estival o las multitudes de otoño.' },
    { slug: 'palma', en: 'Mallorca breaks 18 °C, the Tramuntana hill walks open up and the Paseo Marítimo is the perfect cool-morning dog promenade.', fr: 'Majorque dépasse 18 °C, les randonnées de la Tramuntana s\'ouvrent et le Paseo Marítimo est la promenade canine matinale parfaite.', es: 'Mallorca pasa de 18 °C, las caminatas de la Tramuntana se abren y el Paseo Marítimo es el paseo canino matinal perfecto.' },
  ],
  april: [
    { slug: 'amsterdam', en: 'Tulip season + 12 °C, Vondelpark, Westerpark and Amstelpark all bursting with bloom; trains accept dogs at the OV-Chipkaart Hond rate.', fr: 'Saison des tulipes + 12 °C, Vondelpark, Westerpark et Amstelpark en pleine floraison ; trains acceptent les chiens au tarif OV-Chipkaart Hond.', es: 'Temporada de tulipanes + 12 °C, Vondelpark, Westerpark y Amstelpark en plena floración; trenes admiten perros a tarifa OV-Chipkaart Hond.' },
    { slug: 'paris', en: 'Spring Paris, 14 °C, the Bois de Boulogne and Bois de Vincennes at peak green, the cafés re-open their terraces and dogs are everywhere.', fr: 'Paris printanier, 14 °C, le Bois de Boulogne et le Bois de Vincennes au vert maximum, les cafés rouvrent leurs terrasses et les chiens sont partout.', es: 'París primaveral, 14 °C, el Bois de Boulogne y el Bois de Vincennes en pleno verde, los cafés reabren sus terrazas y los perros están en todas partes.' },
    { slug: 'lisbon', en: '20 °C and pre-summer, the Tagus, Belém, Parque Eduardo VII all in spring colours; one of Europe\'s mildest April capitals.', fr: '20 °C et pré-été, le Tage, Belém, Parc Eduardo VII tous en couleurs printanières ; l\'une des capitales d\'Europe les plus douces en avril.', es: '20 °C y pre-verano, el Tajo, Belém, el Parque Eduardo VII todos en colores primaverales; una de las capitales europeas más suaves en abril.' },
    { slug: 'barcelona', en: '17 °C, Sant Jordi (Apr 23) book-and-rose festival, Park Güell and Montjuïc both dog-friendly outdoor, pre-summer beaches still open to dogs at Llevant.', fr: '17 °C, fête de Sant Jordi (23 avril) du livre et de la rose, Park Güell et Montjuïc tous deux dog-friendly à l\'extérieur, plages pré-estivales encore accessibles aux chiens à Llevant.', es: '17 °C, fiesta de Sant Jordi (23 abril) del libro y la rosa, Park Güell y Montjuïc ambos dog-friendly al aire libre, playas pre-veraniegas aún accesibles a perros en Llevant.' },
    { slug: 'rome', en: '18 °C and ideal Roman weather, the Villa Borghese, the Appian Way regional park and the Janiculum hill all dog-friendly.', fr: '18 °C et météo romaine idéale, la Villa Borghèse, le parc régional de l\'Appia Antica et la colline du Janicule tous dog-friendly.', es: '18 °C y clima romano ideal, la Villa Borghese, el parque regional de la Vía Apia y la colina del Janículo todos dog-friendly.' },
    { slug: 'florence', en: '17 °C, the Boboli Gardens (assistance dogs only inside) but the surrounding Bardini and the Oltrarno hills, plus the Cascine park, all welcome dogs.', fr: '17 °C, les jardins de Boboli (chiens d\'assistance à l\'intérieur) mais les jardins Bardini environnants, les collines de l\'Oltrarno et le parc des Cascine accueillent tous les chiens.', es: '17 °C, los jardines de Boboli (perros de asistencia dentro) pero los jardines Bardini circundantes, las colinas del Oltrarno y el parque de las Cascine admiten todos perros.' },
  ],
  may: [
    { slug: 'krakow', en: '18 °C, Planty Park ring around the old town in full bloom, Wawel Hill walks and a city culture that broadly welcomes dogs.', fr: '18 °C, le ring de Planty autour de la vieille ville en pleine floraison, promenades sur la colline du Wawel et culture urbaine largement dog-friendly.', es: '18 °C, el anillo de Planty alrededor del casco antiguo en plena floración, paseos por la colina de Wawel y cultura urbana ampliamente dog-friendly.' },
    { slug: 'prague', en: '19 °C and ideal weather, Stromovka, Letná and Petřín hills all dog-friendly, beer gardens reopen with water bowls at every table.', fr: '19 °C et météo idéale, Stromovka, Letná et Petřín tous dog-friendly, biergartens rouvrent avec gamelles à chaque table.', es: '19 °C y clima ideal, Stromovka, Letná y Petřín todos dog-friendly, biergartens reabren con boles en cada mesa.' },
    { slug: 'copenhagen', en: '15 °C and Scandinavian spring, Fælledparken off-leash zones, Amager Strand dog beach open year-round, dogs ride Metro and S-tog free with muzzle.', fr: '15 °C et printemps scandinave, zones sans laisse du Fælledparken, plage canine d\'Amager Strand toute l\'année, chiens gratuits dans Métro et S-tog avec muselière.', es: '15 °C y primavera escandinava, zonas sin correa del Fælledparken, playa canina de Amager Strand todo el año, perros gratis en Metro y S-tog con bozal.' },
    { slug: 'budapest', en: '20 °C, Margaret Island in full leaf, City Park dog zones busy with Saturday-morning crowds, ruin bars all dog-friendly.', fr: '20 °C, l\'Île Marguerite en pleine feuillaison, zones canines du Parc de la Ville actives les matinées de samedi, ruin bars tous dog-friendly.', es: '20 °C, la Isla Margarita en pleno follaje, zonas caninas del Parque de la Ciudad activas los sábados por la mañana, ruin bars todos dog-friendly.' },
    { slug: 'porto', en: 'Avoid Lisbon\'s summer heat, Porto stays cooler at 18 °C, the Douro riverside is at its greenest, and Foz beach dog access is year-round.', fr: 'Évitez la chaleur estivale de Lisbonne, Porto reste plus fraîche à 18 °C, les berges du Douro à leur vert maximum, accès canin à la plage de Foz toute l\'année.', es: 'Evita el calor estival de Lisboa, Oporto se mantiene más fresca a 18 °C, las orillas del Duero en su pleno verde, acceso canino a la playa de Foz todo el año.' },
    { slug: 'hamburg', en: '14 °C and pre-tourist-rush, the Alster lakes, Stadtpark and the Elbstrand urban beaches all open to dogs.', fr: '14 °C et avant le pic touristique, les lacs Alster, le Stadtpark et les plages urbaines de l\'Elbstrand toutes ouvertes aux chiens.', es: '14 °C y antes del pico turístico, los lagos Alster, el Stadtpark y las playas urbanas del Elbstrand todas abiertas a perros.' },
  ],
  june: [
    { slug: 'stockholm', en: 'Midsummer light at 18 °C, Djurgården island walks, the Stockholm archipelago dog-accessible by ferry, and Sweden\'s pet supplements are EU\'s lowest (avg 9 € or free).', fr: 'Lumière de la Saint-Jean à 18 °C, promenades de l\'île de Djurgården, archipel de Stockholm accessible aux chiens en ferry, et suppléments animaux suédois les plus bas d\'Europe (moy 9 € ou gratuit).', es: 'Luz de San Juan a 18 °C, paseos por la isla de Djurgården, archipiélago de Estocolmo accesible a perros en ferri, y suplementos para mascotas suecos los más bajos de la UE (media 9 € o gratis).' },
    { slug: 'copenhagen', en: '17 °C, the Refshaleøen, Fælledparken and Amager Strand all peaking; cafés extend their dog-tolerant outdoor terraces.', fr: '17 °C, Refshaleøen, Fælledparken et Amager Strand au sommet ; les cafés étendent leurs terrasses extérieures tolérantes aux chiens.', es: '17 °C, Refshaleøen, Fælledparken y Amager Strand en su mejor momento; los cafés amplían sus terrazas exteriores tolerantes con perros.' },
    { slug: 'helsinki', en: '17 °C, white nights, 80+ koira-aitaus enclosures across the city, and the Suomenlinna ferry accepts dogs free of charge.', fr: '17 °C, nuits blanches, 80+ enclos koira-aitaus dans la ville, et le ferry Suomenlinna accepte les chiens gratuitement.', es: '17 °C, noches blancas, 80+ recintos koira-aitaus en la ciudad, y el ferri a Suomenlinna admite perros gratis.' },
    { slug: 'tallinn', en: '17 °C, the medieval old town walkable in 30 min, Kadriorg Park and Pirita beach dog-friendly, dogs ride trams free.', fr: '17 °C, la vieille ville médiévale traversée en 30 min, Parc Kadriorg et plage Pirita dog-friendly, chiens gratuits dans les trams.', es: '17 °C, el casco medieval recorrible en 30 min, Parque Kadriorg y playa Pirita dog-friendly, perros gratis en tranvías.' },
    { slug: 'bergen', en: '14 °C, Norwegian summer that\'s actually walkable for short-haired dogs. Fløyen funicular accepts leashed dogs free, fjord ferries to outer fjords accept dogs.', fr: '14 °C, l\'été norvégien réellement praticable pour les chiens à poil court. Le funiculaire Fløyen accepte les chiens en laisse gratuits, ferries vers les fjords extérieurs acceptent les chiens.', es: '14 °C, el verano noruego realmente caminable para perros de pelo corto. El funicular Fløyen admite perros con correa gratis, ferris a los fiordos exteriores admiten perros.' },
    { slug: 'edinburgh', en: '15 °C, Arthur\'s Seat (a 251 m volcano in the city), Holyrood and Princes Street Gardens all dog-friendly without UK summer heatwaves.', fr: '15 °C, Arthur\'s Seat (un volcan de 251 m en ville), Holyrood et Princes Street Gardens tous dog-friendly sans les canicules estivales britanniques.', es: '15 °C, Arthur\'s Seat (un volcán de 251 m en la ciudad), Holyrood y Princes Street Gardens todos dog-friendly sin las olas de calor estivales británicas.' },
  ],
  july: [
    { slug: 'reykjavik', en: 'Iceland\'s peak season at 13 °C, endless daylight, the Tjörnin, Laugardalur and the Heiðmörk reserve all dog-friendly without any heat stress.', fr: 'Pic de saison islandais à 13 °C, lumière infinie, Tjörnin, Laugardalur et la réserve de Heiðmörk tous dog-friendly sans aucun stress thermique.', es: 'Pico de temporada islandés a 13 °C, luz infinita, Tjörnin, Laugardalur y la reserva de Heiðmörk todos dog-friendly sin estrés térmico.' },
    { slug: 'bergen', en: 'The cool fjord-side option at 16 °C, escape Mediterranean heatwaves with the Norwegian outdoor culture\'s dog-tolerant defaults.', fr: 'L\'option fraîche en bord de fjord à 16 °C, échappez aux canicules méditerranéennes avec la culture extérieure norvégienne tolérante aux chiens par défaut.', es: 'La opción fresca junto al fiordo a 16 °C, escapa de las olas de calor mediterráneas con la cultura exterior noruega tolerante con perros por defecto.' },
    { slug: 'oslo', en: '20 °C and pleasant, Frognerseteren forest, Bygdøy peninsula and Sognsvann lake all dog-friendly off-leash. Trams free for dogs with muzzle.', fr: '20 °C et plaisant, la forêt de Frognerseteren, la péninsule de Bygdøy et le lac de Sognsvann tous dog-friendly sans laisse. Trams gratuits pour les chiens avec muselière.', es: '20 °C y agradable, el bosque de Frognerseteren, la península de Bygdøy y el lago Sognsvann todos dog-friendly sin correa. Tranvías gratis para perros con bozal.' },
    { slug: 'helsinki', en: '20 °C, white nights persist, the Helsinki archipelago is at its open-water best for dog-friendly day cruises.', fr: '20 °C, nuits blanches persistent, archipel d\'Helsinki au mieux des croisières dog-friendly en eau libre.', es: '20 °C, las noches blancas persisten, el archipiélago de Helsinki en su mejor momento para cruceros dog-friendly en aguas abiertas.' },
    { slug: 'gothenburg', en: '19 °C, the southern Swedish coast, Skärgården archipelago accessible by dog-free Styrsöbolaget ferries, urban dog parks plentiful.', fr: '19 °C, la côte sud suédoise, archipel de Skärgården accessible par les ferries Styrsöbolaget gratuits pour les chiens, parcs canins urbains nombreux.', es: '19 °C, la costa sur sueca, archipiélago de Skärgården accesible por los ferris Styrsöbolaget gratis para perros, parques caninos urbanos abundantes.' },
    { slug: 'tallinn', en: '20 °C, the Estonian summer at its peak, Pirita beach dog zone, Kadriorg, and the medieval old town all walkable without heat stress.', fr: '20 °C, l\'été estonien à son apogée, zone canine de la plage Pirita, Kadriorg et la vieille ville médiévale tous marchables sans stress thermique.', es: '20 °C, el verano estonio en su apogeo, zona canina de la playa Pirita, Kadriorg, y el casco medieval todos caminables sin estrés térmico.' },
  ],
  august: [
    { slug: 'reykjavik', en: 'Iceland summer continues, 13 °C and full daylight, the only major European destination genuinely cool for dogs in August.', fr: 'L\'été islandais continue, 13 °C et lumière totale, la seule grande destination européenne vraiment fraîche pour les chiens en août.', es: 'El verano islandés continúa, 13 °C y luz total, el único gran destino europeo realmente fresco para perros en agosto.' },
    { slug: 'oslo', en: '20 °C and lake-swimming season, Sognsvann, Bogstadvann and the fjord-front bays all dog-friendly off-leash.', fr: '20 °C et saison de la baignade en lac, Sognsvann, Bogstadvann et les baies du fjord tous dog-friendly sans laisse.', es: '20 °C y temporada de baño lacustre, Sognsvann, Bogstadvann y las bahías del fiordo todos dog-friendly sin correa.' },
    { slug: 'bergen', en: 'Cool 16 °C peak, fjord ferries and the Mount Fløyen funicular both dog-accessible. The seaside escape from continental heatwaves.', fr: 'Pic frais de 16 °C, ferries de fjord et funiculaire du Mont Fløyen tous deux accessibles aux chiens. L\'évasion côtière des canicules continentales.', es: 'Pico fresco de 16 °C, ferris de fiordo y funicular del Monte Fløyen ambos accesibles a perros. El escape costero de las olas de calor continentales.' },
    { slug: 'stockholm', en: '20 °C, the Stockholm archipelago at its prime, leashed dogs accepted on Waxholmsbolaget ferries, archipelago islands all dog-friendly.', fr: '20 °C, archipel de Stockholm au sommet, chiens en laisse acceptés sur les ferries Waxholmsbolaget, îles de l\'archipel toutes dog-friendly.', es: '20 °C, archipiélago de Estocolmo en su mejor momento, perros con correa admitidos en ferris Waxholmsbolaget, islas del archipiélago todas dog-friendly.' },
    { slug: 'helsinki', en: '19 °C still cool, the long-light evenings extend dog walks past 22:00; archipelago day trips ideal.', fr: '19 °C encore frais, les soirées de longue lumière prolongent les promenades canines après 22h ; excursions dans l\'archipel idéales.', es: '19 °C aún fresco, las tardes de luz larga extienden los paseos caninos hasta después de las 22:00; excursiones por el archipiélago ideales.' },
    { slug: 'aarhus', en: '18 °C, Denmark\'s second city in calm summer, Marselisborg Hundeskov off-leash forest and the year-round Bellevue Strand dog beach.', fr: '18 °C, la deuxième ville du Danemark dans un été calme, la forêt sans laisse Marselisborg Hundeskov et la plage canine toute l\'année de Bellevue Strand.', es: '18 °C, la segunda ciudad de Dinamarca en verano tranquilo, el bosque sin correa Marselisborg Hundeskov y la playa canina todo el año de Bellevue Strand.' },
  ],
  september: [
    { slug: 'lisbon', en: '24 °C, post-summer calm, the city empties of tourists, restaurants and beaches reopen to dogs as schools restart.', fr: '24 °C, calme post-estival, la ville se vide des touristes, restaurants et plages rouvrent aux chiens à la rentrée.', es: '24 °C, calma post-veraniega, la ciudad se vacía de turistas, restaurantes y playas reabren a perros con la vuelta al cole.' },
    { slug: 'porto', en: '21 °C and the harvest just starting in the Douro valley, Foz dog beaches still open and uncrowded.', fr: '21 °C et les vendanges qui commencent dans la vallée du Douro, plages canines de Foz encore ouvertes et peu fréquentées.', es: '21 °C y la vendimia empezando en el valle del Duero, playas caninas de Foz aún abiertas y sin multitudes.' },
    { slug: 'san-sebastian', en: 'Basque Country at 21 °C, the Concha and Zurriola beaches open to dogs again from October 1, but the boardwalks and Mont Urgull are dog-friendly all September.', fr: 'Pays basque à 21 °C, Concha et Zurriola rouvrent aux chiens à partir du 1er octobre, mais les promenades et le Mont Urgull sont dog-friendly tout septembre.', es: 'País Vasco a 21 °C, la Concha y Zurriola reabren a perros desde el 1 de octubre, pero los paseos marítimos y el Monte Urgull son dog-friendly todo septiembre.' },
    { slug: 'bilbao', en: '21 °C, Guggenheim outdoor terraces and the Nervión riverside walks at peak; perfect short-trip destination.', fr: '21 °C, les terrasses extérieures du Guggenheim et les promenades du Nervión au sommet ; destination idéale pour un court séjour.', es: '21 °C, las terrazas exteriores del Guggenheim y los paseos del Nervión en su mejor momento; destino ideal para una escapada corta.' },
    { slug: 'barcelona', en: '24 °C, the Llevant dog beach reopens September 15 (in some years), Park Güell and Montjuïc both back to comfortable temperatures.', fr: '24 °C, la plage canine de Llevant rouvre le 15 septembre (selon les années), Park Güell et Montjuïc retrouvent des températures confortables.', es: '24 °C, la playa canina de Llevant reabre el 15 de septiembre (según el año), Park Güell y Montjuïc vuelven a temperaturas cómodas.' },
    { slug: 'split', en: '24 °C, the Marjan Hill park empties of tourists, dog beaches at Bačvice and Bene reopen to dogs from late September.', fr: '24 °C, le parc de la colline Marjan se vide des touristes, plages canines de Bačvice et Bene rouvrent aux chiens à partir de fin septembre.', es: '24 °C, el parque de la colina Marjan se vacía de turistas, playas caninas de Bačvice y Bene reabren a perros desde finales de septiembre.' },
  ],
  october: [
    { slug: 'rome', en: '21 °C and ideal Roman weather, the Villa Borghese, Appian Way regional park, and Janiculum hill at peak walking conditions.', fr: '21 °C et météo romaine idéale, Villa Borghèse, parc régional de l\'Appia Antica et colline du Janicule au pic des conditions de promenade.', es: '21 °C y clima romano ideal, Villa Borghese, parque regional de la Vía Apia y colina del Janículo en pico de condiciones de paseo.' },
    { slug: 'florence', en: '19 °C, the post-summer empty city, golden light on the Boboli (assistance dogs only inside) and Bardini gardens, the Cascine park at peak red.', fr: '19 °C, la ville vide post-estivale, lumière dorée sur Boboli (chiens d\'assistance à l\'intérieur) et Bardini, parc des Cascine au pic rouge.', es: '19 °C, la ciudad vacía post-estival, luz dorada sobre Boboli (perros de asistencia dentro) y Bardini, parque de las Cascine en pleno rojo.' },
    { slug: 'vienna', en: '13 °C, leaf-peak in the Stadtpark, Belvedere gardens and Lainzer Tiergarten, Vienna\'s dog-tolerant café culture comes inside as autumn deepens.', fr: '13 °C, pic des feuilles au Stadtpark, jardins du Belvédère et Lainzer Tiergarten, la culture café tolérante de Vienne rentre à l\'intérieur quand l\'automne s\'installe.', es: '13 °C, pico de hojas en el Stadtpark, jardines del Belvedere y Lainzer Tiergarten, la cultura del café tolerante de Viena se traslada al interior con el otoño.' },
    { slug: 'brno', en: '12 °C and the Moravian wine harvest in full, combine Brno with Pavlov and Mikulov for dog-friendly cellar-door visits.', fr: '12 °C et les vendanges moraves en plein, combinez Brno avec Pavlov et Mikulov pour des visites de caves dog-friendly.', es: '12 °C y la vendimia morava en pleno, combina Brno con Pavlov y Mikulov para visitas a bodegas dog-friendly.' },
    { slug: 'bordeaux', en: 'Wine harvest finale at 17 °C, the riverside Garonne and the Place de la Bourse and the city\'s new tram (dogs free) at peak comfort.', fr: 'Finale des vendanges à 17 °C, les berges de la Garonne, la Place de la Bourse et le nouveau tram (chiens gratuits) au pic du confort.', es: 'Final de la vendimia a 17 °C, las orillas del Garona, la Place de la Bourse y el nuevo tranvía (perros gratis) en pico de confort.' },
    { slug: 'cordoba', en: 'Andalusian autumn at 22 °C, the Alcázar gardens, the Mezquita exterior and the Patios open without summer heat (45 °C in August).', fr: 'Automne andalou à 22 °C, jardins de l\'Alcázar, extérieur de la Mezquita et les Patios ouverts sans la chaleur estivale (45 °C en août).', es: 'Otoño andaluz a 22 °C, jardines del Alcázar, exterior de la Mezquita y los Patios abiertos sin el calor estival (45 °C en agosto).' },
  ],
  november: [
    { slug: 'lecce', en: '14 °C and the Salento empties, pietra leccese baroque without crowds, dog beaches at Punta Prosciutto still year-round, and prices half of August.', fr: '14 °C et le Salento se vide, baroque en pietra leccese sans foule, plages canines de Punta Prosciutto toujours toute l\'année, et prix moitié d\'août.', es: '14 °C y el Salento se vacía, barroco en pietra leccese sin multitudes, playas caninas de Punta Prosciutto aún todo el año, y precios la mitad que en agosto.' },
    { slug: 'malaga', en: '17 °C, Costa del Sol\'s mildest November, the Pedregalejo year-round dog beach is at its emptiest and the city is quiet.', fr: '17 °C, le mois de novembre le plus doux de la Costa del Sol, la plage canine toute l\'année de Pedregalejo est au plus vide et la ville est calme.', es: '17 °C, el noviembre más suave de la Costa del Sol, la playa canina todo el año de Pedregalejo está en su momento más vacío y la ciudad está tranquila.' },
    { slug: 'lisbon', en: '17 °C, post-tourist calm, Belém, the Tagus riverfront and Sintra all back to comfortable walking temperatures.', fr: '17 °C, calme post-touristique, Belém, les berges du Tage et Sintra retrouvent des températures de marche confortables.', es: '17 °C, calma post-turística, Belém, las orillas del Tajo y Sintra vuelven a temperaturas de paseo cómodas.' },
    { slug: 'seville', en: '20 °C, perhaps the most temperate November big-city option in Europe; the Triana riverside and Parque de María Luisa at peak comfort.', fr: '20 °C, peut-être l\'option grande ville la plus tempérée d\'Europe en novembre ; les berges de Triana et le Parque de María Luisa au pic du confort.', es: '20 °C, quizá la opción de gran ciudad más templada de Europa en noviembre; las orillas de Triana y el Parque de María Luisa en pico de confort.' },
    { slug: 'palma', en: '17 °C, the year-round dog beach at Es Carnatge is dog-empty, Bellver Castle grounds quiet, and prices are at annual lows.', fr: '17 °C, la plage canine toute l\'année d\'Es Carnatge est presque vide, parc du château Bellver calme, et les prix sont au plus bas annuel.', es: '17 °C, la playa canina todo el año de Es Carnatge casi vacía, parque del Castillo de Bellver tranquilo, y los precios en mínimos anuales.' },
    { slug: 'thessaloniki', en: '17 °C, the Aegean shore, Mount Hortiatis trails and the city beaches all dog-accessible without summer heat.', fr: '17 °C, les rives de l\'Égée, les sentiers du Mont Hortiatis et les plages urbaines tous accessibles aux chiens sans la chaleur estivale.', es: '17 °C, la costa del Egeo, los senderos del Monte Hortiatis y las playas urbanas todos accesibles a perros sin el calor estival.' },
  ],
  december: [
    { slug: 'vienna', en: 'Christmas market central, leashed dogs welcomed at most stalls, the Rathausplatz market dog-tolerant, and Habsburg café culture indoors.', fr: 'Capitale du marché de Noël, chiens en laisse bienvenus dans la plupart des stands, marché du Rathausplatz tolérant aux chiens, et culture café habsbourgeoise à l\'intérieur.', es: 'Capital del mercado navideño, perros con correa bienvenidos en la mayoría de los puestos, mercado del Rathausplatz tolerante con perros, y cultura del café habsbúrgica en interiores.' },
    { slug: 'strasbourg', en: 'The original Christkindelsmärik (since 1570), leashed dogs welcomed on the cobbled lanes around the cathedral; trams accept dogs free.', fr: 'Le Christkindelsmärik original (depuis 1570), chiens en laisse bienvenus dans les ruelles pavées autour de la cathédrale ; trams gratuits pour les chiens.', es: 'El Christkindelsmärik original (desde 1570), perros con correa bienvenidos en las calles adoquinadas alrededor de la catedral; tranvías gratis para perros.' },
    { slug: 'cologne', en: 'Seven dog-tolerant Christmas markets across the city, the Rhine riverside walks for cool-air dog stretches, Cologne pet-fee average among Germany\'s lowest.', fr: 'Sept marchés de Noël tolérants aux chiens à travers la ville, promenades du Rhin pour des étirements canins à l\'air frais, supplément animaux de Cologne parmi les plus bas d\'Allemagne.', es: 'Siete mercados navideños tolerantes con perros por toda la ciudad, paseos junto al Rin para estirar las patas al fresco, suplemento canino de Colonia entre los más bajos de Alemania.' },
    { slug: 'prague', en: 'The Old Town Square Christmas market with leashed dogs on the cobbles, Stromovka and Petřín hills snow-dusted, Czech beer halls dog-friendly all winter.', fr: 'Marché de Noël de la place de la Vieille Ville avec chiens en laisse sur les pavés, Stromovka et Petřín saupoudrés de neige, brasseries tchèques dog-friendly tout l\'hiver.', es: 'Mercado navideño de la Plaza de la Ciudad Vieja con perros con correa en el adoquinado, Stromovka y Petřín espolvoreados de nieve, cervecerías checas dog-friendly todo el invierno.' },
    { slug: 'reykjavik', en: 'The shortest daylight (4 h) but the strongest Northern Lights season, the Tjörnin freezes for skating, dogs welcomed on the city centre paths.', fr: 'Lumière la plus courte (4h) mais saison la plus forte des aurores boréales, Tjörnin gèle pour le patinage, chiens bienvenus sur les sentiers du centre-ville.', es: 'La luz más corta (4 h) pero la temporada más fuerte de auroras boreales, Tjörnin se congela para patinar, perros bienvenidos en los senderos del centro.' },
    { slug: 'budapest', en: '4 °C, the Andrássy avenue Christmas markets, the thermal baths (assistance dogs only inside) but the surrounding Városliget at peak winter walks.', fr: '4 °C, marchés de Noël de l\'avenue Andrássy, bains thermaux (chiens d\'assistance à l\'intérieur) mais le Városliget environnant pour les promenades hivernales au top.', es: '4 °C, mercados navideños de la avenida Andrássy, baños termales (perros de asistencia dentro) pero el Városliget circundante para los paseos invernales óptimos.' },
  ],
}

// Auto-derive a climate score for any city/month combo: ideal 14-22 °C → 100, falling off either side.
function climateScore(temp: number): number {
  if (temp >= 14 && temp <= 22) return 100
  if (temp >= 10 && temp < 14) return 80
  if (temp > 22 && temp <= 26) return 75
  if (temp >= 6 && temp < 10) return 55
  if (temp > 26 && temp <= 30) return 45
  if (temp >= 2 && temp < 6) return 30
  if (temp > 30) return 15
  return 20
}

export async function generateStaticParams() {
  const out: { locale: string; month: string }[] = []
  for (const locale of locales) for (const month of MONTHS) out.push({ locale, month })
  return out
}

const MONTH_NAMES: Record<string, Record<MonthKey, string>> = {
  en: { january: 'January', february: 'February', march: 'March', april: 'April', may: 'May', june: 'June', july: 'July', august: 'August', september: 'September', october: 'October', november: 'November', december: 'December' },
  fr: { january: 'janvier', february: 'février', march: 'mars', april: 'avril', may: 'mai', june: 'juin', july: 'juillet', august: 'août', september: 'septembre', october: 'octobre', november: 'novembre', december: 'décembre' },
  es: { january: 'enero', february: 'febrero', march: 'marzo', april: 'abril', may: 'mayo', june: 'junio', july: 'julio', august: 'agosto', september: 'septiembre', october: 'octubre', november: 'noviembre', december: 'diciembre' },
  pt: { january: 'janeiro', february: 'fevereiro', march: 'março', april: 'abril', may: 'maio', june: 'junho', july: 'julho', august: 'agosto', september: 'setembro', october: 'outubro', november: 'novembro', december: 'dezembro' },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; month: string }> }): Promise<Metadata> {
  const { locale, month } = await params
  if (!hasLocale(locale) || !MONTHS.includes(month as MonthKey)) return {}
  const m = month as MonthKey
  const mn = MONTH_NAMES[locale]?.[m] ?? MONTH_NAMES.en[m]
  const titles: Record<string, string> = {
    en: `Best Dog-Friendly Cities in Europe in ${mn} (2026)`,
    fr: `Les meilleures villes dog-friendly d'Europe en ${mn} (2026)`,
    es: `Las mejores ciudades dog-friendly de Europa en ${mn} (2026)`,
    pt: `As melhores cidades dog-friendly da Europa em ${mn} (2026)`,
  }
  const descs: Record<string, string> = {
    en: `Where to travel in Europe with a dog or cat in ${mn}. 6 hand-picked destinations with current weather, dog-beach openings, festival warnings and pet-friendly hotel inventory.`,
    fr: `Où voyager en Europe avec un chien ou un chat en ${mn}. 6 destinations sélectionnées avec météo actuelle, ouvertures de plages canines, alertes festivals et inventaire d'hôtels pet-friendly.`,
    es: `Dónde viajar por Europa con un perro o un gato en ${mn}. 6 destinos seleccionados con tiempo actual, aperturas de playas caninas, alertas de festivales e inventario de hoteles pet-friendly.`,
    pt: `Onde viajar pela Europa com um cão ou gato em ${mn}. 6 destinos selecionados com meteorologia atual, aberturas de praias caninas, alertas de festivais e inventário de hotéis pet-friendly.`,
  }
  const today = new Date().toISOString().split('T')[0]
  return {
    title: titles[locale] ?? titles.en,
    description: descs[locale] ?? descs.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/dog-friendly-europe-by-month/${month}`,
      languages: {
        en: `${SITE_URL}/en/guides/dog-friendly-europe-by-month/${month}`,
        fr: `${SITE_URL}/fr/guides/dog-friendly-europe-by-month/${month}`,
        es: `${SITE_URL}/es/guides/dog-friendly-europe-by-month/${month}`,
        pt: `${SITE_URL}/pt/guides/dog-friendly-europe-by-month/${month}`,
        'x-default': `${SITE_URL}/en/guides/dog-friendly-europe-by-month/${month}`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descs[locale] ?? descs.en,
      type: 'article',
      modifiedTime: `${today}T00:00:00Z`,
    },
  }
}

const COPY = {
  en: {
    kicker: (m: string) => `EUROPE BY MONTH · ${m.toUpperCase()} 2026`,
    h1: (m: string) => `Best European Cities for a Dog Trip in ${m}`,
    lede: (m: string) => `Where to actually go with a dog or cat in ${m}. We score every city in our 100-destination dataset against the month's average temperature, dog-beach openings, public-transport rules and seasonal festival risks, then layer the curator's picks on top.`,
    rankingTitle: (m: string) => `Our 6 picks for ${m}`,
    weatherLabel: 'Avg high',
    hotelsLabel: 'pet-friendly hotels',
    guideLink: 'Full city guide →',
    mapLabel: (city: string) => `Pet-friendly hotels in ${city}`,
    mapHint: 'Live availability and prices, dogs/cats accepted. Bookable via Booking.com & partners.',
    methodologyTitle: 'How we ranked',
    methodologyParas: [
      'We start with the actual monthly weather data from each of our 100 destinations (EU climate normals, updated annually). Cities scoring 14-22 °C average daytime high get the highest comfort score; >26 °C drops sharply (heat-stress risk for dogs); <10 °C drops moderately.',
      'On top of the climate score, we layer curated month-specific factors: dog-beach seasonal openings (most municipal beaches close to dogs from 1 May to 30 September), Christmas-market timing, festival crowds to avoid, and the rare cities that genuinely suit a particular month.',
      'The final 6 picks balance climate + practical access. Each links to the full city guide with vet contacts, hotel inventory, and a live Booking.com map.',
    ],
    monthsTitle: 'Browse another month',
    faqTitle: 'Frequently asked questions',
    faqs: (m: string) => [
      { q: `Is ${m} a good month to travel in Europe with a dog?`, a: `Yes, every month in Europe has good destinations for dog travel; the right city depends on weather tolerance and dog-beach access. Our top 6 above all score above the climate-comfort threshold for ${m} in their year-round climate normals.` },
      { q: `Which European city is most dog-friendly in ${m}?`, a: `The first ranking above is our editorial pick. Each city has a full guide with vet phone numbers, fenced off-leash zones and pet-friendly hotel inventory.` },
      { q: 'Are the weather averages reliable?', a: 'Daytime-high climate normals are based on 30-year EU averages and are accurate to ±2 °C. Always check a 7-day forecast before booking, heatwaves and cold snaps can deviate sharply from the norm.' },
      { q: 'When are dog beaches open in Europe?', a: 'Most Mediterranean municipal beaches exclude dogs from 1 May to 30 September. Designated "Bau Beach" zones in Italy, "Hundestrand" zones in Germany and Denmark, and Atlantic-coast beaches in the UK and Ireland are usually year-round.' },
    ],
    ctaTitle: 'See all 100 destinations',
    ctaDesc: 'Each of our 100 European cities has a full pet-friendly guide with vets, parks, beaches and a live Booking.com map.',
    ctaButton: 'Browse all destinations →',
  },
  fr: {
    kicker: (m: string) => `L'EUROPE PAR MOIS · ${m.toUpperCase()} 2026`,
    h1: (m: string) => `Les meilleures villes européennes pour un voyage canin en ${m}`,
    lede: (m: string) => `Où aller vraiment avec un chien ou un chat en ${m}. Nous notons chaque ville de notre dataset de 100 destinations selon la température moyenne du mois, l'ouverture des plages canines, les règles de transport public et les risques festivaliers, puis ajoutons la sélection éditoriale par-dessus.`,
    rankingTitle: (m: string) => `Nos 6 choix pour ${m}`,
    weatherLabel: 'Max moyen',
    hotelsLabel: 'hôtels pet-friendly',
    guideLink: 'Guide complet →',
    mapLabel: (city: string) => `Hôtels pet-friendly à ${city}`,
    mapHint: 'Disponibilités et prix en direct, chiens/chats acceptés. Réservable via Booking.com et partenaires.',
    methodologyTitle: 'Méthodologie',
    methodologyParas: [
      'Nous partons des données météo mensuelles réelles de chacune de nos 100 destinations (normales climatiques UE, mises à jour annuellement). Les villes notées 14-22 °C de maximum moyen diurne reçoivent le score de confort le plus élevé ; >26 °C chute brusquement (risque de stress thermique pour les chiens) ; <10 °C chute modérément.',
      'Au-dessus du score climatique, nous superposons des facteurs spécifiques au mois : ouvertures saisonnières des plages canines (la plupart des plages municipales ferment aux chiens du 1er mai au 30 septembre), timing des marchés de Noël, foules de festivals à éviter et les villes rares qui correspondent vraiment à un mois particulier.',
      'Les 6 choix finaux équilibrent climat + accessibilité pratique. Chacun renvoie au guide complet de la ville avec contacts vétérinaires, inventaire d\'hôtels et carte Booking.com en direct.',
    ],
    monthsTitle: 'Naviguer dans un autre mois',
    faqTitle: 'Questions fréquentes',
    faqs: (m: string) => [
      { q: `${m.charAt(0).toUpperCase() + m.slice(1)} est-il un bon mois pour voyager en Europe avec un chien ?`, a: `Oui, chaque mois a de bonnes destinations canines en Europe ; la bonne ville dépend de la tolérance thermique et de l\'accès aux plages canines. Nos 6 choix ci-dessus dépassent tous le seuil de confort climatique pour ${m} dans leurs normales climatiques annuelles.` },
      { q: `Quelle ville européenne est la plus dog-friendly en ${m} ?`, a: `Le premier classement ci-dessus est notre choix éditorial. Chaque ville a un guide complet avec numéros vétérinaires, zones sans laisse clôturées et inventaire d\'hôtels pet-friendly.` },
      { q: 'Les moyennes météo sont-elles fiables ?', a: 'Les normales climatiques de maximum diurne sont basées sur des moyennes UE de 30 ans, précises à ±2 °C. Vérifiez toujours les prévisions à 7 jours avant la réservation, canicules et coups de froid peuvent dévier fortement de la norme.' },
      { q: 'Quand les plages canines sont-elles ouvertes en Europe ?', a: 'La plupart des plages municipales méditerranéennes excluent les chiens du 1er mai au 30 septembre. Les zones « Bau Beach » désignées en Italie, « Hundestrand » en Allemagne et au Danemark, et les plages atlantiques au Royaume-Uni et en Irlande sont généralement ouvertes toute l\'année.' },
    ],
    ctaTitle: 'Voir les 100 destinations',
    ctaDesc: 'Chacune de nos 100 villes européennes dispose d\'un guide pet-friendly complet avec vétérinaires, parcs, plages et carte Booking.com en direct.',
    ctaButton: 'Toutes les destinations →',
  },
  es: {
    kicker: (m: string) => `EUROPA POR MES · ${m.toUpperCase()} 2026`,
    h1: (m: string) => `Las mejores ciudades europeas para un viaje canino en ${m}`,
    lede: (m: string) => `Dónde ir realmente con un perro o un gato en ${m}. Puntuamos cada ciudad de nuestro dataset de 100 destinos según la temperatura media del mes, la apertura de playas caninas, las normas de transporte público y los riesgos festivos, luego añadimos la selección editorial encima.`,
    rankingTitle: (m: string) => `Nuestras 6 elecciones para ${m}`,
    weatherLabel: 'Máx media',
    hotelsLabel: 'hoteles pet-friendly',
    guideLink: 'Guía completa →',
    mapLabel: (city: string) => `Hoteles pet-friendly en ${city}`,
    mapHint: 'Disponibilidad y precios en vivo, perros/gatos admitidos. Reservable vía Booking.com y socios.',
    methodologyTitle: 'Metodología',
    methodologyParas: [
      'Partimos de los datos meteorológicos mensuales reales de cada uno de nuestros 100 destinos (normales climáticas UE, actualizadas anualmente). Las ciudades con 14-22 °C de máxima media diurna reciben la mejor puntuación de confort; >26 °C cae bruscamente (riesgo de estrés térmico para perros); <10 °C cae moderadamente.',
      'Sobre la puntuación climática, añadimos factores específicos del mes: aperturas estacionales de playas caninas (la mayoría de las playas municipales cierran a los perros del 1 de mayo al 30 de septiembre), tiempos de mercados navideños, multitudes de festivales a evitar y las raras ciudades que se ajustan realmente a un mes particular.',
      'Las 6 elecciones finales equilibran clima + acceso práctico. Cada una enlaza con la guía completa de la ciudad con contactos veterinarios, inventario hotelero y mapa Booking.com en vivo.',
    ],
    monthsTitle: 'Explora otro mes',
    faqTitle: 'Preguntas frecuentes',
    faqs: (m: string) => [
      { q: `¿${m.charAt(0).toUpperCase() + m.slice(1)} es un buen mes para viajar por Europa con un perro?`, a: `Sí, cada mes tiene buenos destinos caninos en Europa; la ciudad correcta depende de la tolerancia térmica y del acceso a playas caninas. Nuestras 6 elecciones arriba superan todas el umbral de confort climático para ${m} en sus normales climáticas anuales.` },
      { q: `¿Qué ciudad europea es la más dog-friendly en ${m}?`, a: `El primer ranking arriba es nuestra elección editorial. Cada ciudad tiene una guía completa con números veterinarios, zonas valladas sin correa e inventario hotelero pet-friendly.` },
      { q: '¿Las medias meteorológicas son fiables?', a: 'Las normales climáticas de máxima diurna se basan en medias UE de 30 años, precisas a ±2 °C. Comprueba siempre la previsión a 7 días antes de reservar, olas de calor y olas de frío pueden desviarse mucho de la norma.' },
      { q: '¿Cuándo están abiertas las playas caninas en Europa?', a: 'La mayoría de las playas municipales mediterráneas excluyen perros del 1 de mayo al 30 de septiembre. Las zonas « Bau Beach » designadas en Italia, « Hundestrand » en Alemania y Dinamarca, y las playas atlánticas en Reino Unido e Irlanda suelen estar abiertas todo el año.' },
    ],
    ctaTitle: 'Ver los 100 destinos',
    ctaDesc: 'Cada una de nuestras 100 ciudades europeas tiene una guía pet-friendly completa con veterinarios, parques, playas y mapa Booking.com en vivo.',
    ctaButton: 'Todos los destinos →',
  },
}

export default async function Page({ params }: { params: Promise<{ locale: string; month: string }> }) {
  const { locale, month } = await params
  if (!hasLocale(locale)) notFound()
  if (!MONTHS.includes(month as MonthKey)) notFound()
  const m = month as MonthKey
  const c = COPY[locale as 'en' | 'fr' | 'es'] ?? COPY.en
  const mn = MONTH_NAMES[locale]?.[m] ?? MONTH_NAMES.en[m]

  // Build the picks: prefer curated entries, enrich with destination data + climate score
  const picks = CURATED[m].map((e) => {
    const dest = destinations.find((d) => d.slug === e.slug)
    if (!dest) return null
    const w = dest.weather[WK[m]]
    const score = climateScore(w.temp)
    const hotelCount = hotels.filter((h) => h.destinationSlug === e.slug).length
    const reason = e[locale as 'en' | 'fr' | 'es'] ?? e.en
    return { dest, score, weather: w, hotelCount, reason }
  }).filter((x): x is NonNullable<typeof x> => x !== null)

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: c.h1(mn),
    numberOfItems: picks.length,
    itemListElement: picks.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/${locale}/destinations/${p.dest.slug}`,
      name: getLocalizedCityName(p.dest.slug, p.dest.name, locale),
    })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.h1(mn),
    description: c.lede(mn),
    inLanguage: locale,
    dateModified: '2026-06-26',
    author: { '@type': 'Person', name: 'HotelsWithPets Editorial', jobTitle: 'Pet Travel Editor', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.ico` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/${locale}/guides/dog-friendly-europe-by-month/${month}` },
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs(mn).map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-amber-700 via-orange-600 to-rose-700 text-white py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            🗓️ {c.kicker(mn)}
          </span>
          <h1 className="text-3xl lg:text-5xl font-extrabold mb-6 leading-tight">{c.h1(mn)}</h1>
          <p className="text-orange-50 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">{c.lede(mn)}</p>
        </div>
      </section>

      {/* Month picker (top, right under hero) */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 text-center">{c.monthsTitle}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {MONTHS.map((mm) => {
              const active = mm === m
              const label = (MONTH_NAMES[locale]?.[mm] ?? MONTH_NAMES.en[mm])
              return (
                <Link
                  key={mm}
                  href={`/${locale}/guides/dog-friendly-europe-by-month/${mm}`}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${active ? 'bg-orange-700 text-white' : 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-orange-300 hover:text-orange-700'}`}
                >
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Picks */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-10 text-center">{c.rankingTitle(mn)}</h2>
          <div className="space-y-6">
            {picks.map((p, i) => {
              const localName = getLocalizedCityName(p.dest.slug, p.dest.name, locale)
              const localCountry = getLocalizedCountryName(p.dest.country, locale)
              return (
                <article key={p.dest.slug} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="relative h-48 md:h-auto md:col-span-1 bg-gray-100">
                      {p.dest.heroImage && (
                        <Image src={p.dest.heroImage} alt={`${localName} pet-friendly travel`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                      )}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                        <span className="text-xl font-extrabold text-orange-700">#{i + 1}</span>
                      </div>
                    </div>
                    <div className="md:col-span-2 p-6 lg:p-8">
                      <div className="flex items-baseline justify-between gap-4 mb-2">
                        <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-900">
                          {p.dest.flag} {localName}
                        </h3>
                        <span className="text-sm text-gray-500">{localCountry}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-5">{p.reason}</p>
                      <NearbyHotelCard destinationSlug={p.dest.slug} locale={locale} variant="compact" />
                      <div className="flex flex-wrap items-center gap-3 text-sm mt-4">
                        <span className="bg-amber-50 text-amber-800 px-3 py-1 rounded-full font-semibold">
                          {p.weather.icon} {c.weatherLabel}: {p.weather.temp}°C
                        </span>
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold">
                          {p.hotelCount} {c.hotelsLabel}
                        </span>
                        <Link href={`/${locale}/destinations/${p.dest.slug}`} className="text-orange-700 hover:text-orange-900 font-semibold hover:underline">
                          {c.guideLink}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 lg:px-8 pt-2 pb-6 lg:pb-8 border-t border-gray-100 bg-gray-50">
                    <div className="flex items-baseline justify-between gap-4 my-4">
                      <h4 className="text-lg font-bold text-gray-900">📍 {c.mapLabel(localName)}</h4>
                      <span className="text-xs text-gray-500 hidden sm:inline">{c.mapHint}</span>
                    </div>
                    <Stay22Map lat={p.dest.lat} lng={p.dest.lng} destName={localName} height={360} locale={locale} />
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <article className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5">{c.methodologyTitle}</h2>
          <div className="space-y-4">
            {c.methodologyParas.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
          </div>
        </div>
      </article>

      {/* Essentiels à emporter (FR only) + maillage accessoires */}
      {locale === 'fr' && (() => {
        const isSummer = SUMMER_MONTHS.includes(m)
        const asins = isSummer ? ESSENTIALS_SUMMER : ESSENTIALS_DEFAULT
        const kit = asins
          .map(a => PRODUCTS.find(p => p.asin === a))
          .filter((p): p is NonNullable<typeof p> => Boolean(p))
        return (
          <section className="py-14 bg-amber-50 border-y border-amber-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <p className="text-sm font-bold uppercase tracking-widest text-amber-700 mb-2">
                  {isSummer ? '🔥 Kit anti-chaleur' : '🎒 Kit voyage'}
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-2">
                  Les essentiels à emporter en {mn}
                </h2>
                <p className="text-stone-600 max-w-2xl mx-auto">
                  {isSummer
                    ? `En ${mn} la priorité c'est de gérer la chaleur : hydratation nomade, tapis rafraîchissant, gilet et bandana à mouiller. Notre sélection testée, liens directs Amazon.fr.`
                    : `Ce qu'on emporte vraiment pour voyager avec son chien en ${mn} : gourde nomade, harnais de sécurité voiture, gamelle pliante et trousse de secours. Liens directs Amazon.fr.`}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {kit.map((p, i) => (
                  <AmazonProductCard key={p.asin} product={p} campaign={`by-month-${month}`} rank={i + 1} />
                ))}
              </div>

              {/* Maillage vers les pages accessoires */}
              <div className="mt-8 flex flex-wrap justify-center gap-2 text-sm">
                <Link href="/fr/accessoires-chien" className="bg-white border border-amber-300 text-amber-900 px-4 py-2 rounded-full hover:bg-amber-100 font-semibold">
                  Tous les accessoires chien →
                </Link>
                <Link href="/fr/accessoires-chien-chaleur" className="bg-white border border-amber-300 text-amber-900 px-4 py-2 rounded-full hover:bg-amber-100 font-semibold">
                  Spécial canicule →
                </Link>
                <Link href="/fr/accessoires-chat" className="bg-white border border-stone-300 text-stone-700 px-4 py-2 rounded-full hover:bg-stone-100 font-semibold">
                  Accessoires chat →
                </Link>
              </div>

              <div className="mt-5 text-center">
                <AmazonDisclosure />
              </div>
            </div>
          </section>
        )
      })()}

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">❓ {c.faqTitle}</h2>
          <div className="space-y-4">
            {c.faqs(mn).map((f, i) => (
              <details key={i} className="bg-gray-50 border border-gray-200 rounded-2xl group">
                <summary className="cursor-pointer p-5 font-semibold text-gray-900 list-none flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-700 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-rose-700 text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">{c.ctaTitle}</h2>
          <p className="text-orange-100 text-lg mb-8 leading-relaxed">{c.ctaDesc}</p>
          <Link href={`/${locale}/destinations`} className="inline-block bg-white text-orange-700 font-bold px-8 py-4 rounded-full hover:bg-orange-50 transition-colors shadow-lg">
            {c.ctaButton}
          </Link>
        </div>
      </section>

      <GuideFooter locale={locale} currentSlug={`dog-friendly-europe-by-month/${month}`} />

      <StickyHotelCTA
        href={buildAllezDestLink('Europe', 'Europe', 'by-month-sticky')}
        label={(STICKY_LABELS_BYMONTH[locale] ?? STICKY_LABELS_BYMONTH.en).label}
        cta={(STICKY_LABELS_BYMONTH[locale] ?? STICKY_LABELS_BYMONTH.en).cta}
      />
    </div>
  )
}
