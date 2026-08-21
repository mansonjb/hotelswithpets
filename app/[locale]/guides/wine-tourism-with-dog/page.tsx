import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'wine-tourism-with-dog'
const CAMPAIGN_BASE = 'wine-tourism'

const STICKY_LABELS: Record<string, { label: string; cta: string }> = {
  en: { label: 'Pet-friendly wine-country hotels', cta: 'See hotels' },
  fr: { label: `Hôtels pet-friendly en région viticole`, cta: 'Voir les hôtels' },
  es: { label: 'Hoteles pet-friendly en región vinícola', cta: 'Ver hoteles' },
  pt: { label: 'Hotéis pet-friendly em região vinícola', cta: 'Ver hotéis' },
  de: { label: 'Hundefreundliche Hotels im Weinanbaugebiet', cta: 'Hotels ansehen' },
  nl: { label: 'Hondvriendelijke hotels in wijnstreken', cta: 'Bekijk hotels' },
}

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

  const titles: Record<string, string> = {
    en: `Wine Tourism with Your Dog: 5 European Wine Regions That Welcome Pets (2026)`,
    fr: `Tourisme œnologique avec son chien : 5 régions viticoles européennes qui accueillent les animaux (2026)`,
    es: `Enoturismo con tu perro: 5 regiones vinícolas europeas que admiten mascotas (2026)`,
    pt: `Enoturismo com o seu cão: 5 regiões vinícolas europeias que aceitam animais (2026)`,
    de: `Weintourismus mit Ihrem Hund: 5 europäische Weinregionen, die Haustiere willkommen heißen (2026)`,
    nl: `Wijntoerisme met je hond: 5 Europese wijnstreken die huisdieren verwelkomen (2026)`,
  }
  const descriptions: Record<string, string> = {
    en: `Five European wine regions where you can taste and stay with your dog: Bordeaux Médoc, Tuscany Chianti, Rioja Alta, Douro Valley, Burgundy. Verified pet-friendly châteaux, palaces and quintas.`,
    fr: `Cinq régions viticoles européennes où déguster et dormir avec son chien : Bordeaux Médoc, Toscane Chianti, Rioja Alta, vallée du Douro, Bourgogne. Châteaux, palaces et quintas pet-friendly vérifiés.`,
    es: `Cinco regiones vinícolas europeas donde catar y alojarse con tu perro: Burdeos Médoc, Toscana Chianti, Rioja Alta, valle del Duero, Borgoña. Châteaux, palacios y quintas pet-friendly verificados.`,
    pt: `Cinco regiões vinícolas europeias onde provar e ficar com o seu cão: Bordeaux Médoc, Toscana Chianti, Rioja Alta, Vale do Douro, Borgonha. Châteaux, palaces e quintas pet-friendly verificados.`,
    de: `Fünf europäische Weinregionen, in denen Sie mit Ihrem Hund verkosten und übernachten können: Bordeaux Médoc, Toskana Chianti, Rioja Alta, Douro-Tal, Burgund. Geprüfte hundefreundliche Châteaux, Paläste und Quintas.`,
    nl: `Vijf Europese wijnstreken waar je met je hond kunt proeven en overnachten: Bordeaux Médoc, Toscane Chianti, Rioja Alta, Douro-vallei, Bourgogne. Geverifieerde hondvriendelijke châteaux, paleizen en quintas.`,
  }
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/${SLUG}`,
      languages: {
        en: `${SITE_URL}/en/guides/${SLUG}`,
        fr: `${SITE_URL}/fr/guides/${SLUG}`,
        es: `${SITE_URL}/es/guides/${SLUG}`,
        pt: `${SITE_URL}/pt/guides/${SLUG}`,
        de: `${SITE_URL}/de/guides/${SLUG}`,
        nl: `${SITE_URL}/nl/guides/${SLUG}`,
        'x-default': `${SITE_URL}/en/guides/${SLUG}`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      type: 'article',
      url: `${SITE_URL}/${locale}/guides/${SLUG}`,
      siteName: 'HotelsWithPets.com',
    },
  }
}

type Pick = {
  slug: string
  name: string
  country: string
  region: string
  destPath: string
  whyEn: string
  whyFr: string
  whyEs: string
  whyPt: string
  whyDe?: string
  whyNl?: string
  cellarsEn: string
  cellarsFr: string
  cellarsEs: string
  cellarsPt: string
  cellarsDe?: string
  cellarsNl?: string
  hotelName: string
  hotelEn: string
  hotelFr: string
  hotelEs: string
  hotelPt: string
  hotelDe?: string
  hotelNl?: string
}

const PICKS: Pick[] = [
  {
    slug: 'bordeaux',
    name: 'Bordeaux',
    country: 'France',
    region: 'Médoc & Saint-Émilion',
    destPath: '/destinations/bordeaux',
    whyEn: `France's most dog-tolerant wine region. The Médoc châteaux 45 minutes north (Margaux, Pauillac, Saint-Julien) routinely allow leashed dogs on the gravel courtyard and the vineyard walks, with the wine tasting happening on the terrace where your dog can lie at your feet. Saint-Émilion's medieval village (UNESCO) is fully walkable with a dog and has dozens of small négociant cellars welcoming pets in their cool stone tasting rooms.`,
    whyFr: `La région viticole la plus tolérante aux chiens de France. Les châteaux du Médoc à 45 min au nord (Margaux, Pauillac, Saint-Julien) acceptent les chiens en laisse sur la cour de graviers et la promenade dans les vignes, avec la dégustation en terrasse où le chien se couche à vos pieds. Saint-Émilion (UNESCO) se traverse à pied avec un chien et compte des dizaines de petits négociants accueillant les animaux dans leurs caves de dégustation en pierre fraîche.`,
    whyEs: `La región vinícola más tolerante con perros de Francia. Los châteaux del Médoc a 45 min al norte (Margaux, Pauillac, Saint-Julien) suelen admitir perros con correa en el patio de gravilla y el paseo por la viña, con la cata en la terraza donde el perro se tumba a tus pies. Saint-Émilion (UNESCO) se atraviesa a pie con perro y tiene decenas de pequeños négociants que admiten mascotas en sus salas de cata en piedra fresca.`,
    whyPt: `A região vinícola mais tolerante com cães de França. Os châteaux do Médoc a 45 min a norte (Margaux, Pauillac, Saint-Julien) aceitam cães à trela no pátio de gravilha e no passeio pela vinha, com a prova na esplanada onde o cão se deita aos seus pés. Saint-Émilion (UNESCO) atravessa-se a pé com cão e tem dezenas de pequenos négociants que aceitam animais nas salas de prova em pedra fresca.`,
    whyDe: `Frankreichs hundefreundlichste Weinregion. Die Châteaux im Médoc, 45 Minuten nördlich (Margaux, Pauillac, Saint-Julien), erlauben angeleinten Hunden regelmäßig den Kiesinnenhof und den Spaziergang durch den Weinberg, während die Weinprobe auf der Terrasse stattfindet, wo Ihr Hund zu Ihren Füßen liegen kann. Das mittelalterliche Dorf Saint-Émilion (UNESCO) lässt sich mit Hund vollständig zu Fuß erkunden und zählt Dutzende kleiner Négociant-Keller, die Haustiere in ihren kühlen Steinverkostungsräumen willkommen heißen.`,
    whyNl: `Frankrijks meest hondvriendelijke wijnstreek. De châteaux in de Médoc, 45 minuten ten noorden (Margaux, Pauillac, Saint-Julien), laten aangelijnde honden geregeld toe op de grindplaats en de wandeling door de wijngaard, terwijl de wijnproeverij op het terras plaatsvindt, waar je hond aan je voeten kan liggen. Het middeleeuwse dorp Saint-Émilion (UNESCO) is helemaal te belopen met een hond en telt tientallen kleine négociant-kelders die huisdieren welkom heten in hun koele stenen proeflokalen.`,
    cellarsEn: `Verified pet-friendly: Château Pichon Baron (Pauillac, gravel courtyard), Château Beauregard (Pomerol), Maison Sichel (Bordeaux centre négociant tour, dogs welcome in tasting room). Always email ahead: chateau pet policies are personal to the owner and shift each season.`,
    cellarsFr: `Pet-friendly vérifiés : Château Pichon Baron (Pauillac, cour de graviers), Château Beauregard (Pomerol), Maison Sichel (Bordeaux centre, négociant, chiens bienvenus en salle de dégustation). Emailez toujours à l'avance : les politiques chien sont personnelles aux propriétaires et changent à chaque saison.`,
    cellarsEs: `Pet-friendly verificados: Château Pichon Baron (Pauillac, patio de gravilla), Château Beauregard (Pomerol), Maison Sichel (centro Burdeos, négociant, perros bienvenidos en sala de cata). Emailea siempre con antelación: las políticas caninas son personales del propietario y cambian cada temporada.`,
    cellarsPt: `Pet-friendly verificados: Château Pichon Baron (Pauillac, pátio de gravilha), Château Beauregard (Pomerol), Maison Sichel (centro Bordeaux, négociant, cães bem-vindos na sala de prova). Envie sempre email antes: as políticas caninas são pessoais do proprietário e mudam a cada estação.`,
    cellarsDe: `Geprüft hundefreundlich: Château Pichon Baron (Pauillac, Kieshof), Château Beauregard (Pomerol), Maison Sichel (Négociant-Tour im Zentrum von Bordeaux, Hunde im Verkostungsraum willkommen). Immer vorab per E-Mail anfragen: Die Haustierrichtlinien der Châteaux sind Sache des Besitzers und ändern sich mit jeder Saison.`,
    cellarsNl: `Geverifieerd hondvriendelijk: Château Pichon Baron (Pauillac, grindplaats), Château Beauregard (Pomerol), Maison Sichel (négociant-tour in het centrum van Bordeaux, honden welkom in het proeflokaal). Mail altijd vooraf: het huisdierenbeleid van de châteaux is een zaak van de eigenaar en verandert elk seizoen.`,
    hotelName: `InterContinental Bordeaux - Le Grand Hôtel`,
    hotelEn: `Palace opposite the Grand Théâtre at the heart of the UNESCO 18th-century centre. Pets up to 14 kg welcomed in deluxe rooms, dog bed and bowl provided, the bar Le Lounge tolerates a quiet leashed dog while you pre-tour over a glass.`,
    hotelFr: `Palace face au Grand Théâtre au cœur du centre UNESCO du XVIIIᵉ. Chiens jusqu'à 14 kg en chambres deluxe, panier et gamelle fournis, le bar Le Lounge tolère un chien en laisse calme pendant un verre avant les châteaux.`,
    hotelEs: `Palacio frente al Grand Théâtre en el corazón del centro UNESCO del siglo XVIII. Perros hasta 14 kg en habitaciones deluxe, cama y comedero, el bar Le Lounge tolera un perro con correa tranquilo durante una copa antes de los châteaux.`,
    hotelPt: `Palácio em frente ao Grand Théâtre no coração do centro UNESCO do século XVIII. Cães até 14 kg em quartos deluxe, cama e tigela, o bar Le Lounge tolera um cão à trela calmo durante um copo antes dos châteaux.`,
    hotelDe: `Palast gegenüber dem Grand Théâtre im Herzen des UNESCO-Zentrums aus dem 18. Jahrhundert. Haustiere bis 14 kg in Deluxe-Zimmern willkommen, Hundebett und Napf werden gestellt, die Bar Le Lounge toleriert einen ruhigen angeleinten Hund bei einem Glas vor dem Château-Besuch.`,
    hotelNl: `Paleis tegenover het Grand Théâtre in het hart van het UNESCO-centrum uit de 18e eeuw. Huisdieren tot 14 kg welkom in deluxe kamers, hondenmand en bak worden verstrekt, de bar Le Lounge tolereert een rustige aangelijnde hond bij een glas voordat je langs de châteaux gaat.`,
  },
  {
    slug: 'florence',
    name: 'Tuscany (Florence)',
    country: 'Italy',
    region: 'Chianti Classico',
    destPath: '/destinations/florence',
    whyEn: `The Chianti hills between Florence and Siena are dog-walking paradise: rolling vineyards, cypress alleys, and a Tuscan agriturismo culture that has welcomed dogs for decades because farmers grew up with them. Half the family-run cantine in Greve, Castellina and Radda will pour you a Chianti Classico Riserva with your dog snoozing on the cantina floor. Florence itself has the Boboli Gardens (assistance dogs only inside) but the Bardini Gardens nearby welcome leashed dogs with one of the city's best Duomo views.`,
    whyFr: `Les collines du Chianti entre Florence et Sienne sont un paradis canin : vignes vallonnées, allées de cyprès, et une culture agritourisme toscane qui accueille les chiens depuis des décennies car les fermiers ont grandi avec eux. La moitié des cantine familiales à Greve, Castellina et Radda vous verseront un Chianti Classico Riserva avec votre chien somnolent sur le sol. Florence a les jardins de Boboli (chiens d'assistance uniquement) mais les jardins Bardini voisins acceptent les chiens en laisse avec l'une des meilleures vues sur le Duomo.`,
    whyEs: `Las colinas del Chianti entre Florencia y Siena son un paraíso canino: viñedos ondulados, alamedas de cipreses, y una cultura agriturismo toscana que admite perros desde hace décadas porque los granjeros crecieron con ellos. La mitad de las cantine familiares en Greve, Castellina y Radda te servirán un Chianti Classico Riserva con tu perro dormitando en el suelo. Florencia tiene los jardines de Boboli (solo perros de asistencia) pero los jardines Bardini vecinos admiten perros con correa con una de las mejores vistas del Duomo.`,
    whyPt: `As colinas do Chianti entre Florença e Siena são um paraíso canino: vinhas onduladas, aleias de ciprestes, e uma cultura agriturismo toscana que aceita cães há décadas porque os agricultores cresceram com eles. Metade das cantine familiares em Greve, Castellina e Radda servir-lhe-ão um Chianti Classico Riserva com o seu cão a dormitar no chão. Florença tem os jardins de Boboli (só cães de assistência) mas os jardins Bardini vizinhos aceitam cães à trela com uma das melhores vistas do Duomo.`,
    whyDe: `Die Chianti-Hügel zwischen Florenz und Siena sind ein Paradies für Hundespaziergänge: sanfte Weinberge, Zypressenalleen und eine toskanische Agriturismo-Kultur, die seit Jahrzehnten Hunde willkommen heißt, weil die Bauern mit ihnen aufgewachsen sind. Die Hälfte der familiengeführten Cantine in Greve, Castellina und Radda schenkt Ihnen einen Chianti Classico Riserva ein, während Ihr Hund auf dem Boden der Cantina döst. Florenz selbst hat den Boboli-Garten (nur Assistenzhunde erlaubt), aber der nahe gelegene Bardini-Garten heißt angeleinte Hunde willkommen und bietet einen der schönsten Blicke auf den Dom.`,
    whyNl: `De Chianti-heuvels tussen Florence en Siena zijn een paradijs om te wandelen met je hond: glooiende wijngaarden, cipressenlanen, en een Toscaanse agriturismo-cultuur die al decennia honden verwelkomt omdat de boeren ermee zijn opgegroeid. De helft van de familiecantine in Greve, Castellina en Radda schenkt je een Chianti Classico Riserva terwijl je hond op de vloer van de cantina ligt te doezelen. Florence zelf heeft de Boboli-tuinen (alleen hulphonden toegestaan), maar de nabijgelegen Bardini-tuinen verwelkomen aangelijnde honden met een van de mooiste uitzichten op de Duomo.`,
    cellarsEn: `Verified pet-friendly: Castello di Verrazzano (Greve in Chianti), Antinori nel Chianti Classico (Bargino, dogs in the outdoor amphitheatre tasting), Castello di Querceto (Greve). Booking is mandatory and €30-€60 per person for a proper tour-and-tasting.`,
    cellarsFr: `Pet-friendly vérifiés : Castello di Verrazzano (Greve in Chianti), Antinori nel Chianti Classico (Bargino, chiens dans l'amphithéâtre extérieur), Castello di Querceto (Greve). Réservation obligatoire et 30-60 € par personne pour une vraie visite-dégustation.`,
    cellarsEs: `Pet-friendly verificados: Castello di Verrazzano (Greve in Chianti), Antinori nel Chianti Classico (Bargino, perros en el anfiteatro exterior de cata), Castello di Querceto (Greve). Reserva obligatoria y 30-60 € por persona para una visita-cata seria.`,
    cellarsPt: `Pet-friendly verificados: Castello di Verrazzano (Greve in Chianti), Antinori nel Chianti Classico (Bargino, cães no anfiteatro exterior de prova), Castello di Querceto (Greve). Reserva obrigatória e 30-60 € por pessoa para uma visita-prova séria.`,
    cellarsDe: `Geprüft hundefreundlich: Castello di Verrazzano (Greve in Chianti), Antinori nel Chianti Classico (Bargino, Hunde bei der Verkostung im Freiluftamphitheater), Castello di Querceto (Greve). Reservierung ist Pflicht, 30-60 € pro Person für eine richtige Führung mit Verkostung.`,
    cellarsNl: `Geverifieerd hondvriendelijk: Castello di Verrazzano (Greve in Chianti), Antinori nel Chianti Classico (Bargino, honden bij de proeverij in het openluchtamfitheater), Castello di Querceto (Greve). Reserveren is verplicht, €30-60 per persoon voor een echte rondleiding met proeverij.`,
    hotelName: 'Four Seasons Hotel Firenze',
    hotelEn: `5-star palazzo in the Renaissance Della Gherardesca palace with a private 4.5-hectare park. Pets up to 10 kg welcomed (mid fee), dog bed and bowl, the garden is the largest private green space in central Florence - a quiet dog's paradise.`,
    hotelFr: `5 étoiles palazzo dans le palais Renaissance Della Gherardesca avec parc privé de 4,5 hectares. Chiens jusqu'à 10 kg acceptés (supplément modéré), couchage et gamelle, le jardin est le plus grand espace vert privé du centre de Florence - un paradis pour chien calme.`,
    hotelEs: `5 estrellas palazzo en el palacio renacentista Della Gherardesca con parque privado de 4,5 hectáreas. Perros hasta 10 kg admitidos (suplemento moderado), cama y comedero, el jardín es el mayor espacio verde privado del centro de Florencia - un paraíso para perro tranquilo.`,
    hotelPt: `5 estrelas palazzo no palácio renascentista Della Gherardesca com parque privado de 4,5 hectares. Cães até 10 kg aceites (taxa moderada), cama e tigela, o jardim é o maior espaço verde privado do centro de Florença - um paraíso para cão calmo.`,
    hotelDe: `5-Sterne-Palazzo im Renaissance-Palast Della Gherardesca mit privatem 4,5 Hektar großem Park. Haustiere bis 10 kg willkommen (mittlere Gebühr), Hundebett und Napf, der Garten ist die größte private Grünfläche im Zentrum von Florenz - ein ruhiges Hundeparadies.`,
    hotelNl: `5-sterren palazzo in het renaissancepaleis Della Gherardesca met een privépark van 4,5 hectare. Huisdieren tot 10 kg welkom (gemiddelde toeslag), hondenmand en bak, de tuin is de grootste privé-groenruimte in het centrum van Florence, een rustig hondenparadijs.`,
  },
  {
    slug: 'bilbao',
    name: 'Bilbao (Rioja access)',
    country: 'Spain',
    region: 'Rioja Alta',
    destPath: '/destinations/bilbao',
    whyEn: `Bilbao as the base for the Rioja Alta wine region: 1 h south by car through the Cantabrian mountains drops you in Haro and Briones, the heart of the Rioja Alta. The Marqués de Riscal (Frank Gehry building, Elciego), Ysios (Calatrava, Laguardia), and López de Heredia Tondonia (Haro) wineries all welcome leashed dogs on the cellar tour exterior and tasting terrace. Haro's 19th-century train-station wineries cluster (Barrio de la Estación) is walkable end-to-end with a dog in one afternoon.`,
    whyFr: `Bilbao comme base pour la Rioja Alta : 1h au sud en voiture à travers les montagnes cantabriques vous dépose à Haro et Briones, le cœur de la Rioja Alta. Les bodegas Marqués de Riscal (bâtiment Frank Gehry, Elciego), Ysios (Calatrava, Laguardia) et López de Heredia Tondonia (Haro) acceptent toutes les chiens en laisse en visite extérieure et terrasse de dégustation. Le Barrio de la Estación de Haro (cluster de bodegas du XIXᵉ autour de l'ancienne gare) se parcourt en entier avec un chien en un après-midi.`,
    whyEs: `Bilbao como base para la Rioja Alta: 1 h al sur en coche por la cordillera cantábrica te deja en Haro y Briones, el corazón de Rioja Alta. Las bodegas Marqués de Riscal (edificio Frank Gehry, Elciego), Ysios (Calatrava, Laguardia) y López de Heredia Tondonia (Haro) admiten todas perros con correa en la visita exterior y la terraza de cata. El Barrio de la Estación de Haro (clúster de bodegas del siglo XIX en torno a la antigua estación) se recorre entero con perro en una tarde.`,
    whyPt: `Bilbao como base para a Rioja Alta: 1 h a sul de carro pela cordilheira cantábrica deixa-o em Haro e Briones, o coração da Rioja Alta. As bodegas Marqués de Riscal (edifício Frank Gehry, Elciego), Ysios (Calatrava, Laguardia) e López de Heredia Tondonia (Haro) aceitam todas cães à trela na visita exterior e esplanada de prova. O Barrio de la Estación de Haro (cluster de bodegas do século XIX em torno da antiga estação) percorre-se inteiro com cão numa tarde.`,
    whyDe: `Bilbao als Ausgangspunkt für die Rioja Alta: 1 Stunde südlich mit dem Auto durch das Kantabrische Gebirge bringt Sie nach Haro und Briones, ins Herz der Rioja Alta. Die Bodegas Marqués de Riscal (Frank-Gehry-Gebäude, Elciego), Ysios (Calatrava, Laguardia) und López de Heredia Tondonia (Haro) erlauben allesamt angeleinten Hunden die Außenführung und die Verkostungsterrasse. Der Barrio de la Estación von Haro (Bodegas-Viertel aus dem 19. Jahrhundert rund um den alten Bahnhof) lässt sich mit Hund an einem Nachmittag vollständig erkunden.`,
    whyNl: `Bilbao als uitvalsbasis voor de Rioja Alta: 1 uur zuidwaarts met de auto door het Cantabrisch Gebergte brengt je naar Haro en Briones, het hart van de Rioja Alta. De bodega's Marqués de Riscal (Frank Gehry-gebouw, Elciego), Ysios (Calatrava, Laguardia) en López de Heredia Tondonia (Haro) laten allemaal aangelijnde honden toe bij de buitenrondleiding en het proefterras. De wijk Barrio de la Estación in Haro (19e-eeuwse bodega's rond het oude treinstation) is helemaal te belopen met een hond in één middag.`,
    cellarsEn: `Verified pet-friendly: Marqués de Riscal (Elciego, outdoor tour + tasting terrace), Bodegas Muga (Haro, garden tasting), López de Heredia Tondonia (Haro, historic cellar exterior). The Marqués de Riscal Frank Gehry hotel restaurant terrace welcomes leashed dogs at lunch (Michelin-starred).`,
    cellarsFr: `Pet-friendly vérifiés : Marqués de Riscal (Elciego, visite extérieure + terrasse de dégustation), Bodegas Muga (Haro, dégustation jardin), López de Heredia Tondonia (Haro, cave historique extérieur). La terrasse du restaurant Frank Gehry de l'hôtel Marqués de Riscal accueille les chiens en laisse au déjeuner (étoilé Michelin).`,
    cellarsEs: `Pet-friendly verificados: Marqués de Riscal (Elciego, visita exterior + terraza de cata), Bodegas Muga (Haro, cata en jardín), López de Heredia Tondonia (Haro, bodega histórica exterior). La terraza del restaurante Frank Gehry del hotel Marqués de Riscal admite perros con correa al mediodía (estrella Michelin).`,
    cellarsPt: `Pet-friendly verificados: Marqués de Riscal (Elciego, visita exterior + esplanada de prova), Bodegas Muga (Haro, prova no jardim), López de Heredia Tondonia (Haro, adega histórica exterior). A esplanada do restaurante Frank Gehry do hotel Marqués de Riscal aceita cães à trela ao almoço (estrela Michelin).`,
    cellarsDe: `Geprüft hundefreundlich: Marqués de Riscal (Elciego, Außenführung + Verkostungsterrasse), Bodegas Muga (Haro, Verkostung im Garten), López de Heredia Tondonia (Haro, historischer Keller außen). Die Restaurantterrasse des Frank-Gehry-Hotels Marqués de Riscal heißt angeleinte Hunde beim Mittagessen willkommen (Michelin-Stern).`,
    cellarsNl: `Geverifieerd hondvriendelijk: Marqués de Riscal (Elciego, buitenrondleiding + proefterras), Bodegas Muga (Haro, proeverij in de tuin), López de Heredia Tondonia (Haro, historische kelder buiten). Het restaurantterras van het Frank Gehry-hotel Marqués de Riscal verwelkomt aangelijnde honden bij de lunch (Michelinster).`,
    hotelName: 'Gran Hotel Domine Bilbao',
    hotelEn: `5-star opposite the Guggenheim with the perfect Frank Gehry view from the rooftop terrace. Pets up to 10 kg welcomed (small fee), the location lets you do morning Guggenheim walk + Casco Viejo pintxos + afternoon Rioja day trip without changing hotel.`,
    hotelFr: `5 étoiles face au Guggenheim avec la vue parfaite sur Frank Gehry depuis la terrasse rooftop. Chiens jusqu'à 10 kg acceptés (petit supplément), l'emplacement permet promenade Guggenheim le matin + pintxos Casco Viejo + day trip Rioja l'après-midi sans changer d'hôtel.`,
    hotelEs: `5 estrellas frente al Guggenheim con la vista perfecta sobre Frank Gehry desde la terraza. Perros hasta 10 kg admitidos (pequeño suplemento), la ubicación permite paseo Guggenheim de mañana + pintxos Casco Viejo + excursión Rioja de tarde sin cambiar de hotel.`,
    hotelPt: `5 estrelas em frente ao Guggenheim com a vista perfeita sobre Frank Gehry desde o terraço. Cães até 10 kg aceites (pequena taxa), a localização permite passeio Guggenheim de manhã + pintxos Casco Viejo + excursão Rioja à tarde sem mudar de hotel.`,
    hotelDe: `5-Sterne-Hotel gegenüber dem Guggenheim mit perfektem Blick auf Frank Gehrys Architektur von der Dachterrasse. Haustiere bis 10 kg willkommen (kleine Gebühr), die Lage erlaubt morgens einen Guggenheim-Spaziergang + Pintxos im Casco Viejo + nachmittags einen Rioja-Tagesausflug, ohne das Hotel zu wechseln.`,
    hotelNl: `5-sterrenhotel tegenover het Guggenheim met perfect zicht op de architectuur van Frank Gehry vanaf het dakterras. Huisdieren tot 10 kg welkom (kleine toeslag), de ligging maakt 's ochtends een Guggenheim-wandeling + pintxos in de Casco Viejo + 's middags een dagtrip naar de Rioja mogelijk, zonder van hotel te wisselen.`,
  },
  {
    slug: 'porto',
    name: 'Porto',
    country: 'Portugal',
    region: 'Douro Valley',
    destPath: '/destinations/porto',
    whyEn: `The Douro Valley up-river from Porto is the world's oldest demarcated wine region (1756) and one of the most dog-friendly thanks to the family quinta culture. Quintas in Pinhão, Tua and Régua often welcome dogs in the vineyard walks and the terrace tasting; the Douro train from Porto São Bento up to Pinhão is one of Europe's most scenic and accepts leashed dogs free. Porto itself has the Foz dog beach year-round and the cellar district of Vila Nova de Gaia is fully walkable with a dog.`,
    whyFr: `La vallée du Douro en amont de Porto est la plus vieille région viticole délimitée du monde (1756) et l'une des plus dog-friendly grâce à la culture quinta familiale. Les quintas à Pinhão, Tua et Régua acceptent souvent les chiens dans les promenades vignes et la terrasse de dégustation ; le train du Douro de Porto São Bento jusqu'à Pinhão est l'un des plus scéniques d'Europe et accepte les chiens en laisse gratuits. Porto a la plage canine de Foz toute l'année et le quartier des caves de Vila Nova de Gaia est entièrement à pied avec un chien.`,
    whyEs: `El valle del Duero río arriba desde Oporto es la región vinícola delimitada más antigua del mundo (1756) y una de las más dog-friendly gracias a la cultura quinta familiar. Las quintas en Pinhão, Tua y Régua suelen admitir perros en los paseos por la viña y la terraza de cata; el tren del Duero desde Oporto São Bento hasta Pinhão es uno de los más escénicos de Europa y admite perros con correa gratis. Oporto tiene la playa canina de Foz todo el año y el barrio de bodegas de Vila Nova de Gaia se recorre entero a pie con perro.`,
    whyPt: `O Vale do Douro a montante do Porto é a mais antiga região vinícola demarcada do mundo (1756) e uma das mais dog-friendly graças à cultura quinta familiar. As quintas em Pinhão, Tua e Régua aceitam frequentemente cães nos passeios pela vinha e na esplanada de prova; o comboio do Douro de Porto São Bento até Pinhão é um dos mais cénicos da Europa e aceita cães à trela gratuitamente. O Porto tem a praia canina de Foz todo o ano e o bairro das caves de Vila Nova de Gaia percorre-se inteiro a pé com cão.`,
    whyDe: `Das Douro-Tal flussaufwärts von Porto ist die älteste abgegrenzte Weinregion der Welt (1756) und dank der familiären Quinta-Kultur eine der hundefreundlichsten. Quintas in Pinhão, Tua und Régua heißen Hunde oft bei Spaziergängen durch den Weinberg und bei der Verkostung auf der Terrasse willkommen; die Douro-Bahn von Porto São Bento bis Pinhão ist eine der landschaftlich schönsten Europas und nimmt angeleinte Hunde kostenlos mit. Porto selbst hat den ganzjährig geöffneten Hundestrand Foz, und das Kellerviertel von Vila Nova de Gaia lässt sich mit Hund vollständig zu Fuß erkunden.`,
    whyNl: `De Douro-vallei stroomopwaarts van Porto is de oudste afgebakende wijnstreek ter wereld (1756) en dankzij de familiale quinta-cultuur een van de meest hondvriendelijke. Quinta's in Pinhão, Tua en Régua verwelkomen honden vaak bij wandelingen door de wijngaard en bij de proeverij op het terras; de Douro-trein van Porto São Bento naar Pinhão is een van de mooiste treinreizen van Europa en neemt aangelijnde honden gratis mee. Porto zelf heeft het hele jaar door het hondenstrand Foz, en de kelderwijk van Vila Nova de Gaia is helemaal te belopen met een hond.`,
    cellarsEn: `Verified pet-friendly: Quinta do Crasto (Sabrosa, dogs on the terrace tasting), Quinta da Roêda Croft (Pinhão, vineyard walk), Sandeman Cellars in Vila Nova de Gaia (Porto-side, dogs in the outdoor cellar area only). The Quinta do Bomfim by Symington welcomes dogs in the gardens.`,
    cellarsFr: `Pet-friendly vérifiés : Quinta do Crasto (Sabrosa, chiens en terrasse), Quinta da Roêda Croft (Pinhão, promenade dans les vignes), Sandeman à Vila Nova de Gaia (côté Porto, chiens en zone extérieure uniquement). La Quinta do Bomfim de Symington accueille les chiens dans les jardins.`,
    cellarsEs: `Pet-friendly verificados: Quinta do Crasto (Sabrosa, perros en terraza), Quinta da Roêda Croft (Pinhão, paseo por la viña), Sandeman en Vila Nova de Gaia (lado Oporto, perros solo zona exterior). La Quinta do Bomfim de Symington admite perros en los jardines.`,
    cellarsPt: `Pet-friendly verificados: Quinta do Crasto (Sabrosa, cães na esplanada), Quinta da Roêda Croft (Pinhão, passeio pela vinha), Sandeman em Vila Nova de Gaia (lado Porto, cães só zona exterior). A Quinta do Bomfim da Symington aceita cães nos jardins.`,
    cellarsDe: `Geprüft hundefreundlich: Quinta do Crasto (Sabrosa, Hunde bei der Verkostung auf der Terrasse), Quinta da Roêda Croft (Pinhão, Weinbergspaziergang), Sandeman-Keller in Vila Nova de Gaia (Porto-Seite, Hunde nur im Außenkellerbereich). Die Quinta do Bomfim von Symington heißt Hunde in den Gärten willkommen.`,
    cellarsNl: `Geverifieerd hondvriendelijk: Quinta do Crasto (Sabrosa, honden bij de proeverij op het terras), Quinta da Roêda Croft (Pinhão, wandeling door de wijngaard), Sandeman-kelders in Vila Nova de Gaia (Porto-zijde, honden alleen in het buitenkeldergedeelte). De Quinta do Bomfim van Symington verwelkomt honden in de tuinen.`,
    hotelName: 'The Yeatman',
    hotelEn: `5-star wine-themed palace in Vila Nova de Gaia with the panoramic Porto view and Portugal's largest Port wine cellar on site. Pets up to 12 kg welcomed (mid fee), the terrace garden and pool deck welcome leashed dogs at sunset.`,
    hotelFr: `5 étoiles à thème vinicole à Vila Nova de Gaia avec vue panoramique sur Porto et la plus grande cave de Port du Portugal sur place. Chiens jusqu'à 12 kg acceptés (supplément modéré), la terrasse jardin et la piscine acceptent les chiens en laisse au coucher.`,
    hotelEs: `5 estrellas con tema vinícola en Vila Nova de Gaia con vistas panorámicas a Oporto y la mayor bodega de Porto de Portugal in situ. Perros hasta 12 kg admitidos (suplemento moderado), la terraza jardín y la piscina admiten perros con correa al atardecer.`,
    hotelPt: `5 estrelas com tema vinícola em Vila Nova de Gaia com vista panorâmica sobre o Porto e a maior cave de Vinho do Porto de Portugal no local. Cães até 12 kg aceites (taxa moderada), a esplanada jardim e a piscina aceitam cães à trela ao pôr-do-sol.`,
    hotelDe: `5-Sterne-Weinpalast in Vila Nova de Gaia mit Panoramablick auf Porto und Portugals größtem Portwein-Keller vor Ort. Haustiere bis 12 kg willkommen (mittlere Gebühr), die Terrassengarten- und Pooldeck-Bereiche heißen angeleinte Hunde bei Sonnenuntergang willkommen.`,
    hotelNl: `5-sterren wijnpaleis in Vila Nova de Gaia met panoramisch uitzicht op Porto en de grootste Portwijnkelder van Portugal ter plaatse. Huisdieren tot 12 kg welkom (gemiddelde toeslag), het terrastuin- en zwembaddek verwelkomen aangelijnde honden bij zonsondergang.`,
  },
  {
    slug: 'lyon',
    name: 'Lyon (Beaune gateway)',
    country: 'France',
    region: 'Bourgogne (Côte d\'Or)',
    destPath: '/destinations/lyon',
    whyEn: `Lyon as the base for Burgundy: 1 h 30 north on the A6, you are in Beaune at the heart of the Côte d'Or. Côtes de Beaune and Côtes de Nuits villages (Pommard, Volnay, Vosne-Romanée, Gevrey-Chambertin) are tiny and walkable with a dog, the famous Route des Grands Crus is mostly flat vineyard road for the 60 km from Dijon to Santenay, and the village winemakers welcome dogs in the cool stone caves where you stand to taste. Lyon adds dog-friendly Parc de la Tête d'Or (one of France's largest urban parks) and the legendary bouchon lyonnais terraces.`,
    whyFr: `Lyon comme base pour la Bourgogne : 1h30 au nord sur l'A6, vous êtes à Beaune au cœur de la Côte d'Or. Les villages des Côtes de Beaune et Côtes de Nuits (Pommard, Volnay, Vosne-Romanée, Gevrey-Chambertin) sont minuscules et se parcourent avec un chien, la célèbre Route des Grands Crus est essentiellement plate sur 60 km de Dijon à Santenay, et les vignerons des villages accueillent les chiens dans leurs caves en pierre fraîche où l'on déguste debout. Lyon ajoute le Parc de la Tête d'Or dog-friendly (l'un des plus grands parcs urbains de France) et les légendaires terrasses des bouchons lyonnais.`,
    whyEs: `Lyon como base para Borgoña: 1 h 30 al norte por la A6, estás en Beaune en el corazón de la Côte d'Or. Los pueblos de las Côtes de Beaune y Côtes de Nuits (Pommard, Volnay, Vosne-Romanée, Gevrey-Chambertin) son minúsculos y se recorren con perro, la famosa Route des Grands Crus es esencialmente llana en sus 60 km de Dijon a Santenay, y los viticultores de los pueblos admiten perros en sus bodegas de piedra fresca donde se cata de pie. Lyon añade el Parc de la Tête d'Or dog-friendly (uno de los mayores parques urbanos de Francia) y las legendarias terrazas de los bouchons lyonnais.`,
    whyPt: `Lyon como base para a Borgonha: 1h30 a norte pela A6, estás em Beaune no coração da Côte d'Or. As aldeias das Côtes de Beaune e Côtes de Nuits (Pommard, Volnay, Vosne-Romanée, Gevrey-Chambertin) são minúsculas e percorrem-se com cão, a famosa Route des Grands Crus é essencialmente plana nos seus 60 km de Dijon a Santenay, e os vinhateiros das aldeias aceitam cães nas suas caves de pedra fresca onde se prova em pé. Lyon adiciona o Parc de la Tête d'Or dog-friendly (um dos maiores parques urbanos de França) e as lendárias esplanadas dos bouchons lyonnais.`,
    whyDe: `Lyon als Ausgangspunkt für das Burgund: 1,5 Stunden nördlich auf der A6 sind Sie in Beaune, im Herzen der Côte d'Or. Die Dörfer der Côtes de Beaune und Côtes de Nuits (Pommard, Volnay, Vosne-Romanée, Gevrey-Chambertin) sind winzig und mit Hund gut zu erkunden, die berühmte Route des Grands Crus verläuft auf ihren 60 km von Dijon nach Santenay größtenteils flach durch den Weinberg, und die Dorfwinzer heißen Hunde in ihren kühlen Steinkellern willkommen, in denen im Stehen verkostet wird. Lyon ergänzt das hundefreundliche Parc de la Tête d'Or (einer der größten Stadtparks Frankreichs) und die legendären Terrassen der Bouchons Lyonnais.`,
    whyNl: `Lyon als uitvalsbasis voor de Bourgogne: 1,5 uur noordwaarts over de A6 en je bent in Beaune, in het hart van de Côte d'Or. De dorpen van de Côtes de Beaune en Côtes de Nuits (Pommard, Volnay, Vosne-Romanée, Gevrey-Chambertin) zijn piepklein en goed te belopen met een hond, de beroemde Route des Grands Crus loopt op zijn 60 km van Dijon naar Santenay grotendeels vlak door de wijngaard, en de dorpswijnbouwers verwelkomen honden in hun koele stenen kelders waar je staand proeft. Lyon voegt daar het hondvriendelijke Parc de la Tête d'Or aan toe (een van de grootste stadsparken van Frankrijk) en de legendarische terrassen van de bouchons lyonnais.`,
    cellarsEn: `Verified pet-friendly: Château de Pommard (Côte de Beaune, dogs on the gravel courtyard tour), Domaine Faiveley (Nuits-Saint-Georges, cellar tasting), Hospices de Beaune historic site (dogs in the outer courtyards only). Many tiny village producers will let your dog in their cellar - ask in French and bring a mat for the cool stone floor.`,
    cellarsFr: `Pet-friendly vérifiés : Château de Pommard (Côte de Beaune, chiens dans la cour graviers), Domaine Faiveley (Nuits-Saint-Georges, dégustation cave), Hospices de Beaune (chiens dans cours extérieures uniquement). Beaucoup de petits vignerons de village laisseront votre chien dans leur cave - demandez en français et emportez un petit tapis pour la pierre froide.`,
    cellarsEs: `Pet-friendly verificados: Château de Pommard (Côte de Beaune, perros en el patio de gravilla), Domaine Faiveley (Nuits-Saint-Georges, cata en bodega), Hospices de Beaune (perros solo en los patios exteriores). Muchos pequeños viticultores de pueblo dejarán a tu perro en su bodega - pregunta en francés y lleva una colchoneta para la piedra fría.`,
    cellarsPt: `Pet-friendly verificados: Château de Pommard (Côte de Beaune, cães no pátio de gravilha), Domaine Faiveley (Nuits-Saint-Georges, prova na cave), Hospices de Beaune (cães só nos pátios exteriores). Muitos pequenos vinhateiros de aldeia deixarão o seu cão na cave - pergunte em francês e leve um tapete para a pedra fria.`,
    cellarsDe: `Geprüft hundefreundlich: Château de Pommard (Côte de Beaune, Hunde bei der Führung im Kieshof), Domaine Faiveley (Nuits-Saint-Georges, Kellerverkostung), Hospices de Beaune (Hunde nur in den Außenhöfen). Viele kleine Dorfwinzer lassen Ihren Hund in ihrem Keller zu - fragen Sie auf Französisch und bringen Sie eine kleine Matte für den kühlen Steinboden mit.`,
    cellarsNl: `Geverifieerd hondvriendelijk: Château de Pommard (Côte de Beaune, honden bij de rondleiding op de grindplaats), Domaine Faiveley (Nuits-Saint-Georges, proeverij in de kelder), Hospices de Beaune (honden alleen op de buitenplaatsen). Veel kleine dorpswijnbouwers laten je hond in hun kelder toe, vraag het in het Frans en neem een mattenkleedje mee voor de koude stenen vloer.`,
    hotelName: 'Cour des Loges Lyon, a Radisson Collection Hotel',
    hotelEn: `5-star Renaissance hotel inside four interconnected mansions in Vieux Lyon (UNESCO). Pets up to 14 kg welcomed (mid fee), dog bed and welcome amenity, the four covered courtyards (the cours) are perfect for a quiet leashed dog while you have coffee.`,
    hotelFr: `5 étoiles Renaissance dans quatre hôtels particuliers interconnectés dans le Vieux Lyon (UNESCO). Chiens jusqu'à 14 kg acceptés (supplément modéré), couchage et amenity de bienvenue, les quatre cours intérieures couvertes sont parfaites pour un chien en laisse calme pendant le café.`,
    hotelEs: `5 estrellas renacentista en cuatro palacetes interconectados en el Vieux Lyon (UNESCO). Perros hasta 14 kg admitidos (suplemento moderado), cama y obsequio de bienvenida, los cuatro patios cubiertos son perfectos para un perro con correa tranquilo durante el café.`,
    hotelPt: `5 estrelas renascentista em quatro palacetes interconectados no Vieux Lyon (UNESCO). Cães até 14 kg aceites (taxa moderada), cama e amenity de boas-vindas, os quatro pátios cobertos são perfeitos para um cão à trela calmo durante o café.`,
    hotelDe: `5-Sterne-Renaissancehotel in vier miteinander verbundenen Stadtpalais im Vieux Lyon (UNESCO). Haustiere bis 14 kg willkommen (mittlere Gebühr), Hundebett und Willkommensgeschenk, die vier überdachten Innenhöfe sind ideal für einen ruhigen angeleinten Hund während Sie Kaffee trinken.`,
    hotelNl: `5-sterren renaissancehotel in vier met elkaar verbonden herenhuizen in Vieux Lyon (UNESCO). Huisdieren tot 14 kg welkom (gemiddelde toeslag), hondenmand en welkomstcadeautje, de vier overdekte binnenplaatsen zijn perfect voor een rustige aangelijnde hond terwijl je koffie drinkt.`,
  },
]

const COPY = {
  en: {
    eyebrow: 'WINE TOURISM · PET-FRIENDLY EUROPE',
    title: `Wine Tourism with Your Dog: 5 European Wine Regions That Welcome Pets`,
    intro: `Wine tourism and dog travel have a quiet truth in common: both reward the people who slow down. Vineyard walks are flat, cool, and quiet. Family winemakers grew up with farm dogs and remain culturally welcoming. We picked five European wine regions where the cellars, the tastings, and the verified five-star hotels all genuinely accept a dog at your feet. Plan three to four days per region: one for the city, two for the vineyards, one to digest.`,
    pickHeading: 'The five wine-country picks',
    whyHere: 'Why here',
    cellarsLabel: 'Verified pet-friendly cellars',
    hotelLabel: 'Where to stay',
    seeDestCta: 'Full city guide →',
    hotelCta: 'See availability →',
    practicalHeading: 'Practical info for wine-country dog travel',
    practical: [
      { h: 'Calling ahead is mandatory', p: `Even the most dog-friendly cellars expect you to email or call 1-2 days before to confirm the dog. Many winery websites do not publish pet policies - this is not because they refuse, but because the policy is per-owner. A polite "j'aimerais visiter avec mon chien en laisse, est-ce possible?" almost always gets a yes.` },
      { h: 'The 7-second paw test on gravel', p: `Most château courtyards are gravel that absorbs heat fast in summer. Above 26°C, do the back-of-hand test before letting your dog walk on it. Bring a small mat for the tasting room stone floor - it is comfortable for the dog and shows the winemaker you care about their floor.` },
      { h: 'Wine tasting + dog logistics', p: `Tastings last 60-90 min standing or sitting at a long stone counter. A quiet leashed dog at your feet is fine. Many tasting rooms have a water bowl on request. Use a dog bed app like Rover.com to book a 3-hour sitter if you want to do an extended cellar lunch or a 4-hour DRC tasting.` },
      { h: 'Best season per region', p: `Bordeaux Médoc: May-June and September (harvest). Tuscany Chianti: April-June and September-October. Rioja: May-October. Douro Valley: April-June and September-October (harvest is dramatic). Burgundy: May-June and September-October.` },
    ],
    faqHeading: 'Frequently asked questions',
    faqs: [
      { q: 'Can my dog actually go INSIDE the cellar?', a: `For underground cellars (cool stone or barrel rooms), most family winemakers will say yes for a quiet leashed dog because their own dog is usually there. For temperature-controlled fermentation rooms or steel-tank areas, the answer is usually no for hygiene reasons. The tasting room is almost always yes.` },
      { q: 'What if my dog barks at horses or other dogs at the château?', a: `Many châteaux have working dogs (vineyard dogs, hunting dogs, château dogs). If your dog is reactive, plan a "drive-up + I taste, you wait in the car with the AC on" alternative: many tastings are 20-30 min and tag-team works. Always ask if the cellar has dogs on site at booking.` },
      { q: 'Can I bring two dogs?', a: `Often yes but always confirm at booking. Two dogs in a tasting room is more presence than one and not every winemaker is comfortable. A château's "one dog OK" is sometimes a hard limit for noise reasons.` },
      { q: 'How does this work with kids?', a: `Burgundy and Chianti are kid-and-dog-friendly: villages are small, restaurant terraces are abundant, vineyard walks are short. Bordeaux Médoc and Rioja are more adult-tasting-focused (longer drives between châteaux, structured 90-min tours). Douro Valley is somewhere in between - the train ride is a kid favourite.` },
    ],
  },
  fr: {
    eyebrow: `TOURISME ŒNOLOGIQUE · PET-FRIENDLY EUROPE`,
    title: `Tourisme œnologique avec son chien : 5 régions viticoles européennes qui accueillent les animaux`,
    intro: `Le tourisme œnologique et le voyage avec son chien ont une vérité commune discrète : tous deux récompensent ceux qui ralentissent. Les promenades dans les vignes sont plates, fraîches et calmes. Les vignerons familiaux ont grandi avec les chiens de ferme et le restent culturellement. On a sélectionné cinq régions viticoles européennes où les caves, les dégustations et les hôtels 5 étoiles vérifiés acceptent vraiment un chien à vos pieds. Comptez trois à quatre jours par région : un pour la ville, deux pour les vignes, un pour digérer.`,
    pickHeading: 'Les cinq picks viticoles',
    whyHere: 'Pourquoi ici',
    cellarsLabel: 'Caves pet-friendly vérifiées',
    hotelLabel: 'Où dormir',
    seeDestCta: 'Guide complet →',
    hotelCta: 'Voir les disponibilités →',
    practicalHeading: 'Info pratique tourisme viticole canin',
    practical: [
      { h: 'Appeler avant est obligatoire', p: `Même les caves les plus dog-friendly attendent un email ou un appel 1-2 jours avant pour confirmer le chien. Beaucoup de sites web de vignerons ne publient pas la politique animaux - non par refus, mais parce que la politique est propre au propriétaire. Un poli "j'aimerais visiter avec mon chien en laisse, est-ce possible ?" reçoit presque toujours un oui.` },
      { h: 'Le test des 7 secondes sur graviers', p: `La plupart des cours de château sont en graviers qui chauffent vite en été. Au-dessus de 26°C, faites le test du dos de main avant de laisser le chien marcher. Emportez un petit tapis pour le sol en pierre de la salle de dégustation - confortable pour le chien et montre au vigneron que vous respectez son sol.` },
      { h: 'Logistique dégustation + chien', p: `Les dégustations durent 60-90 min, debout ou assis au comptoir en pierre. Un chien en laisse calme aux pieds c'est OK. Beaucoup de salles ont une gamelle d'eau sur demande. Utilisez une app type Rover.com pour réserver une dog-sitter 3h si vous voulez un déjeuner cave allongé ou une dégustation DRC de 4h.` },
      { h: 'Meilleure saison par région', p: `Bordeaux Médoc : mai-juin et septembre (vendanges). Toscane Chianti : avril-juin et septembre-octobre. Rioja : mai-octobre. Vallée du Douro : avril-juin et septembre-octobre (vendanges spectaculaires). Bourgogne : mai-juin et septembre-octobre.` },
    ],
    faqHeading: 'Questions fréquentes',
    faqs: [
      { q: 'Mon chien peut-il vraiment entrer DANS la cave ?', a: `Pour les caves souterraines (pierre fraîche, salles de fûts), la plupart des vignerons familiaux diront oui pour un chien en laisse calme parce que leur propre chien est souvent là. Pour les salles de fermentation à température contrôlée ou cuves inox, c'est généralement non pour des raisons d'hygiène. La salle de dégustation c'est presque toujours oui.` },
      { q: 'Et si mon chien aboie sur les chevaux ou autres chiens du château ?', a: `Beaucoup de châteaux ont des chiens de travail (chien des vignes, chien de chasse, chien du château). Si votre chien est réactif, prévoyez l'alternative "voiture clim + je déguste, tu attends" : beaucoup de dégustations font 20-30 min et le tag-team marche. Demandez toujours à la réservation s'il y a des chiens sur place.` },
      { q: 'Puis-je amener deux chiens ?', a: `Souvent oui mais confirmez à la réservation. Deux chiens dans une salle de dégustation c'est plus de présence qu'un et tous les vignerons ne sont pas à l'aise. Le "un chien OK" du château est parfois une limite ferme pour des raisons de bruit.` },
      { q: 'Et avec des enfants ?', a: `Bourgogne et Chianti sont enfants-et-chien-friendly : villages petits, terrasses restaurants abondantes, promenades dans les vignes courtes. Bordeaux Médoc et Rioja sont plus orientés dégustation adulte (longs trajets entre châteaux, visites structurées de 90 min). La vallée du Douro est entre les deux - le trajet en train est le favori des enfants.` },
    ],
  },
  es: {
    eyebrow: `ENOTURISMO · PET-FRIENDLY EUROPA`,
    title: `Enoturismo con tu perro: 5 regiones vinícolas europeas que admiten mascotas`,
    intro: `El enoturismo y el viaje con perro tienen una verdad común discreta: ambos premian a quien va despacio. Los paseos por la viña son llanos, frescos y tranquilos. Los viticultores familiares crecieron con perros de granja y siguen siéndolo culturalmente. Hemos seleccionado cinco regiones vinícolas europeas donde las bodegas, las catas y los hoteles 5 estrellas verificados aceptan de verdad un perro a tus pies. Cuenta tres a cuatro días por región: uno para la ciudad, dos para los viñedos, uno para digerir.`,
    pickHeading: 'Las cinco elecciones vinícolas',
    whyHere: 'Por qué aquí',
    cellarsLabel: 'Bodegas pet-friendly verificadas',
    hotelLabel: 'Dónde alojarse',
    seeDestCta: 'Guía completa →',
    hotelCta: 'Ver disponibilidad →',
    practicalHeading: 'Info práctica enoturismo canino',
    practical: [
      { h: 'Llamar antes es obligatorio', p: `Incluso las bodegas más dog-friendly esperan email o llamada 1-2 días antes para confirmar el perro. Muchas webs no publican política mascotas - no por rechazo, sino porque la política es del propietario. Un cortés "me gustaría visitar con mi perro con correa, ¿es posible?" recibe casi siempre un sí.` },
      { h: 'El test de 7 segundos en gravilla', p: `La mayoría de patios de châteaux son de gravilla que se calienta rápido en verano. Por encima de 26°C, haz el test del dorso de mano antes de dejar al perro caminar. Lleva una colchoneta para el suelo de piedra de la sala de cata - cómodo para el perro y demuestra al viticultor que respetas su suelo.` },
      { h: 'Logística cata + perro', p: `Las catas duran 60-90 min, de pie o sentado en el mostrador de piedra. Un perro con correa tranquilo a los pies es OK. Muchas salas tienen cuenco de agua a petición. Usa una app tipo Rover.com para reservar dog-sitter 3 h si quieres una comida en bodega larga o una cata DRC de 4 h.` },
      { h: 'Mejor temporada por región', p: `Burdeos Médoc: mayo-junio y septiembre (vendimia). Toscana Chianti: abril-junio y septiembre-octubre. Rioja: mayo-octubre. Valle del Duero: abril-junio y septiembre-octubre (vendimia espectacular). Borgoña: mayo-junio y septiembre-octubre.` },
    ],
    faqHeading: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Mi perro puede entrar DENTRO de la bodega?', a: `Para bodegas subterráneas (piedra fresca, sala de barricas), la mayoría de viticultores familiares dirán sí para un perro con correa tranquilo porque su propio perro suele estar allí. Para salas de fermentación a temperatura controlada o depósitos inox, suele ser no por higiene. La sala de cata casi siempre es sí.` },
      { q: '¿Y si mi perro ladra a caballos u otros perros del château?', a: `Muchos châteaux tienen perros de trabajo (perro de viña, perro de caza, perro del château). Si tu perro es reactivo, plan B "coche con aire + yo cato, tú esperas": muchas catas duran 20-30 min y el relevo funciona. Pregunta siempre en la reserva si hay perros en la finca.` },
      { q: '¿Puedo llevar dos perros?', a: `A menudo sí pero confirma en la reserva. Dos perros en una sala de cata es más presencia que uno y no todos los viticultores están cómodos. El "un perro OK" del château es a veces un límite firme por ruido.` },
      { q: '¿Y con niños?', a: `Borgoña y Chianti son niños-y-perro-friendly: pueblos pequeños, terrazas abundantes, paseos por la viña cortos. Burdeos Médoc y Rioja están más orientados a cata adulta (trayectos largos entre châteaux, visitas estructuradas de 90 min). El valle del Duero está en medio - el viaje en tren es el favorito de los niños.` },
    ],
  },
  pt: {
    eyebrow: `ENOTURISMO · PET-FRIENDLY EUROPA`,
    title: `Enoturismo com o seu cão: 5 regiões vinícolas europeias que aceitam animais`,
    intro: `O enoturismo e a viagem com cão têm uma verdade comum discreta: ambos premeiam quem vai devagar. Os passeios pela vinha são planos, frescos e calmos. Os vinhateiros familiares cresceram com cães de quinta e permanecem culturalmente acolhedores. Selecionámos cinco regiões vinícolas europeias onde as caves, as provas e os hotéis 5 estrelas verificados aceitam genuinamente um cão aos seus pés. Conte três a quatro dias por região: um para a cidade, dois para as vinhas, um para digerir.`,
    pickHeading: 'As cinco escolhas vinícolas',
    whyHere: 'Porquê aqui',
    cellarsLabel: 'Caves pet-friendly verificadas',
    hotelLabel: 'Onde ficar',
    seeDestCta: 'Guia completo →',
    hotelCta: 'Ver disponibilidade →',
    practicalHeading: 'Info prática enoturismo canino',
    practical: [
      { h: 'Telefonar antes é obrigatório', p: `Mesmo as caves mais dog-friendly esperam email ou chamada 1-2 dias antes para confirmar o cão. Muitos sites de vinhateiros não publicam política animais - não por recusa, mas porque a política é do proprietário. Um cortês "gostaria de visitar com o meu cão à trela, é possível?" recebe quase sempre um sim.` },
      { h: 'O teste dos 7 segundos na gravilha', p: `A maioria dos pátios de châteaux são de gravilha que aquece rápido no verão. Acima dos 26°C, faça o teste das costas da mão antes de deixar o cão andar. Leve um tapete pequeno para o chão de pedra da sala de prova - confortável para o cão e mostra ao vinhateiro que respeita o chão dele.` },
      { h: 'Logística prova + cão', p: `As provas duram 60-90 min, de pé ou sentado ao balcão de pedra. Um cão à trela calmo aos pés é OK. Muitas salas têm tigela de água a pedido. Use uma app tipo Rover.com para reservar dog-sitter 3 h se quiser um almoço prolongado na cave ou uma prova DRC de 4 h.` },
      { h: 'Melhor época por região', p: `Bordeaux Médoc: maio-junho e setembro (vindima). Toscana Chianti: abril-junho e setembro-outubro. Rioja: maio-outubro. Vale do Douro: abril-junho e setembro-outubro (vindima espetacular). Borgonha: maio-junho e setembro-outubro.` },
    ],
    faqHeading: 'Perguntas frequentes',
    faqs: [
      { q: 'O meu cão pode entrar DENTRO da cave?', a: `Para caves subterrâneas (pedra fresca, sala de barricas), a maioria dos vinhateiros familiares dirá sim para um cão à trela calmo porque o seu próprio cão costuma estar lá. Para salas de fermentação a temperatura controlada ou cubas de inox, costuma ser não por higiene. A sala de prova é quase sempre sim.` },
      { q: 'E se o meu cão ladrar a cavalos ou outros cães do château?', a: `Muitos châteaux têm cães de trabalho (cão da vinha, cão de caça, cão do château). Se o seu cão é reativo, plano B "carro com ar + eu provo, tu esperas": muitas provas duram 20-30 min e o revezamento funciona. Pergunte sempre na reserva se há cães no local.` },
      { q: 'Posso levar dois cães?', a: `Muitas vezes sim mas confirme na reserva. Dois cães numa sala de prova é mais presença que um e nem todos os vinhateiros se sentem à vontade. O "um cão OK" do château é por vezes um limite firme por ruído.` },
      { q: 'E com crianças?', a: `Borgonha e Chianti são crianças-e-cão-friendly: aldeias pequenas, esplanadas abundantes, passeios pela vinha curtos. Bordeaux Médoc e Rioja são mais orientados a prova adulta (trajetos longos entre châteaux, visitas estruturadas de 90 min). O Vale do Douro está no meio - a viagem de comboio é a favorita das crianças.` },
    ],
  },
  de: {
    eyebrow: `WEINTOURISMUS · HAUSTIERFREUNDLICHES EUROPA`,
    title: `Weintourismus mit Ihrem Hund: 5 europäische Weinregionen, die Haustiere willkommen heißen`,
    intro: `Weintourismus und das Reisen mit Hund haben eine stille Wahrheit gemeinsam: Beide belohnen jene, die es langsam angehen. Weinbergspaziergänge sind flach, kühl und ruhig. Familienwinzer sind mit Hofhunden aufgewachsen und heißen sie kulturell weiterhin willkommen. Wir haben fünf europäische Weinregionen ausgewählt, in denen die Keller, die Weinproben und die geprüften Fünf-Sterne-Hotels einen Hund zu Ihren Füßen wirklich akzeptieren. Planen Sie drei bis vier Tage pro Region: einen für die Stadt, zwei für die Weinberge, einen zum Verdauen.`,
    pickHeading: 'Die fünf Weinregion-Empfehlungen',
    whyHere: 'Warum hier',
    cellarsLabel: 'Geprüfte hundefreundliche Keller',
    hotelLabel: 'Wo übernachten',
    seeDestCta: 'Vollständiger Städteführer →',
    hotelCta: 'Verfügbarkeit ansehen →',
    practicalHeading: 'Praktische Infos für Weintourismus mit Hund',
    practical: [
      { h: 'Vorherige Anmeldung ist Pflicht', p: `Selbst die hundefreundlichsten Keller erwarten, dass Sie 1-2 Tage vorher per E-Mail oder Anruf den Hund ankündigen. Viele Winzer-Websites veröffentlichen keine Haustierrichtlinie - nicht weil sie ablehnen, sondern weil die Richtlinie Sache des jeweiligen Besitzers ist. Ein höfliches „J'aimerais visiter avec mon chien en laisse, est-ce possible?" erhält fast immer ein Ja.` },
      { h: 'Der 7-Sekunden-Pfotentest auf Kies', p: `Die meisten Château-Innenhöfe bestehen aus Kies, der sich im Sommer schnell aufheizt. Über 26 °C machen Sie den Handrückentest, bevor Sie Ihren Hund darauf laufen lassen. Bringen Sie eine kleine Matte für den Steinboden des Verkostungsraums mit - das ist bequem für den Hund und zeigt dem Winzer, dass Ihnen sein Boden wichtig ist.` },
      { h: 'Weinprobe und Hund: die Logistik', p: `Verkostungen dauern 60-90 Minuten, im Stehen oder Sitzen an einer langen Steintheke. Ein ruhiger angeleinter Hund zu Ihren Füßen ist kein Problem. Viele Verkostungsräume stellen auf Anfrage einen Wassernapf bereit. Nutzen Sie eine Hundesitter-App wie Rover.com, um einen 3-Stunden-Sitter zu buchen, falls Sie ein ausgedehntes Kellermittagessen oder eine 4-stündige DRC-Verkostung planen.` },
      { h: 'Beste Reisezeit pro Region', p: `Bordeaux Médoc: Mai-Juni und September (Weinlese). Toskana Chianti: April-Juni und September-Oktober. Rioja: Mai-Oktober. Douro-Tal: April-Juni und September-Oktober (die Weinlese ist spektakulär). Burgund: Mai-Juni und September-Oktober.` },
    ],
    faqHeading: 'Häufig gestellte Fragen',
    faqs: [
      { q: 'Darf mein Hund wirklich IN den Keller?', a: `Bei unterirdischen Kellern (kühler Stein oder Fassräume) sagen die meisten Familienwinzer ja zu einem ruhigen angeleinten Hund, weil ihr eigener Hund meist dort ist. Bei temperaturgeführten Gärräumen oder Stahltankbereichen lautet die Antwort meist nein, aus Hygienegründen. Der Verkostungsraum ist fast immer erlaubt.` },
      { q: 'Was, wenn mein Hund Pferde oder andere Hunde am Château anbellt?', a: `Viele Châteaux haben Arbeitshunde (Weinberghunde, Jagdhunde, Château-Hunde). Ist Ihr Hund reaktiv, planen Sie die Alternative „hinfahren, ich probiere, du wartest im Auto mit Klimaanlage": Viele Verkostungen dauern 20-30 Minuten, und das Wechselsystem funktioniert gut. Fragen Sie bei der Buchung immer, ob Hunde vor Ort sind.` },
      { q: 'Kann ich zwei Hunde mitbringen?', a: `Oft ja, aber bestätigen Sie es immer bei der Buchung. Zwei Hunde in einem Verkostungsraum sind spürbar mehr Präsenz als einer, und nicht jeder Winzer fühlt sich damit wohl. Das „ein Hund ist okay" eines Château ist manchmal eine feste Grenze aus Lärmgründen.` },
      { q: 'Wie funktioniert das mit Kindern?', a: `Burgund und Chianti sind kinder- und hundefreundlich: Dörfer sind klein, Restaurantterrassen reichlich vorhanden, Weinbergspaziergänge kurz. Bordeaux Médoc und Rioja sind eher auf Erwachsenenverkostungen ausgerichtet (längere Fahrten zwischen den Châteaux, strukturierte 90-minütige Führungen). Das Douro-Tal liegt dazwischen - die Zugfahrt ist bei Kindern besonders beliebt.` },
    ],
  },
  nl: {
    eyebrow: `WIJNTOERISME · HUISDIERVRIENDELIJK EUROPA`,
    title: `Wijntoerisme met je hond: 5 Europese wijnstreken die huisdieren verwelkomen`,
    intro: `Wijntoerisme en reizen met je hond hebben een stille waarheid gemeen: beide belonen wie het rustig aan doet. Wandelingen door de wijngaard zijn vlak, koel en stil. Familiewijnbouwers zijn opgegroeid met boerderijhonden en blijven cultureel gastvrij. We kozen vijf Europese wijnstreken waar de kelders, de proeverijen en de geverifieerde vijfsterrenhotels een hond echt aan je voeten accepteren. Reken op drie tot vier dagen per streek: één voor de stad, twee voor de wijngaarden, één om te verteren.`,
    pickHeading: 'De vijf wijnstreek-keuzes',
    whyHere: 'Waarom hier',
    cellarsLabel: 'Geverifieerde hondvriendelijke kelders',
    hotelLabel: 'Waar je kunt overnachten',
    seeDestCta: 'Volledige stadsgids →',
    hotelCta: 'Bekijk beschikbaarheid →',
    practicalHeading: 'Praktische info voor wijntoerisme met hond',
    practical: [
      { h: 'Vooraf bellen is verplicht', p: `Zelfs de meest hondvriendelijke kelders verwachten dat je 1-2 dagen van tevoren mailt of belt om je hond aan te kondigen. Veel wijnbouwerswebsites publiceren geen huisdierenbeleid, niet omdat ze weigeren, maar omdat het beleid per eigenaar verschilt. Een beleefde "j'aimerais visiter avec mon chien en laisse, est-ce possible?" krijgt bijna altijd een ja.` },
      { h: 'De 7-secondentest voor pootjes op grind', p: `De meeste châteauplaatsen bestaan uit grind dat 's zomers snel opwarmt. Boven 26°C doe je eerst de handruggentest voordat je je hond erop laat lopen. Neem een mattenkleedje mee voor de stenen vloer van het proeflokaal, dat is comfortabel voor je hond en laat de wijnbouwer zien dat je om zijn vloer geeft.` },
      { h: 'Logistiek wijnproeverij + hond', p: `Proeverijen duren 60-90 minuten, staand of zittend aan een lange stenen bar. Een rustige aangelijnde hond aan je voeten kan gewoon. Veel proeflokalen hebben op verzoek een waterbak. Gebruik een app als Rover.com om een 3-uurs oppas te boeken als je een uitgebreide kelderlunch of een 4-uur durende DRC-proeverij wilt doen.` },
      { h: 'Beste seizoen per streek', p: `Bordeaux Médoc: mei-juni en september (oogst). Toscane Chianti: april-juni en september-oktober. Rioja: mei-oktober. Douro-vallei: april-juni en september-oktober (spectaculaire oogst). Bourgogne: mei-juni en september-oktober.` },
    ],
    faqHeading: 'Veelgestelde vragen',
    faqs: [
      { q: 'Mag mijn hond echt de kelder IN?', a: `Bij ondergrondse kelders (koele steen of vatenruimtes) zeggen de meeste familiewijnbouwers ja tegen een rustige aangelijnde hond, omdat hun eigen hond er meestal ook is. Bij temperatuurgeregelde gistingsruimtes of rvs-tanks is het antwoord meestal nee, om hygiënische redenen. Het proeflokaal is bijna altijd toegestaan.` },
      { q: 'Wat als mijn hond blaft naar paarden of andere honden bij het château?', a: `Veel châteaux hebben werkhonden (wijngaardhonden, jachthonden, châteauhonden). Is jouw hond reactief, plan dan als alternatief "aanrijden, ik proef, jij wacht in de auto met de airco aan": veel proeverijen duren 20-30 minuten en dat wisselsysteem werkt goed. Vraag bij het boeken altijd of er honden aanwezig zijn.` },
      { q: 'Mag ik twee honden meenemen?', a: `Vaak wel, maar bevestig dit altijd bij het boeken. Twee honden in een proeflokaal is merkbaar meer aanwezigheid dan één, en niet elke wijnbouwer voelt zich daar prettig bij. Het "één hond is oké" van een château is soms een harde grens vanwege geluid.` },
      { q: 'Hoe werkt dit met kinderen?', a: `Bourgogne en Chianti zijn kind- en hondvriendelijk: dorpen zijn klein, restaurantterrassen volop aanwezig, wandelingen door de wijngaard kort. Bordeaux Médoc en Rioja zijn meer gericht op proeverijen voor volwassenen (langere ritten tussen de châteaux, gestructureerde rondleidingen van 90 minuten). De Douro-vallei zit ertussenin, de treinrit is een favoriet bij kinderen.` },
    ],
  },
} as const

type Locale = keyof typeof COPY

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!hasLocale(rawLocale)) notFound()
  const locale = rawLocale as Locale
  const t = COPY[locale] ?? COPY.en

  const stickyLabel = STICKY_LABELS[locale] ?? STICKY_LABELS.en

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/${locale}/guides` },
      { '@type': 'ListItem', position: 3, name: t.title, item: `${SITE_URL}/${locale}/guides/${SLUG}` },
    ],
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t.title,
    description: t.intro,
    inLanguage: locale,
    author: { '@type': 'Person', name: 'HotelsWithPets Editorial', jobTitle: 'Pet Travel Editor', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL },
  }

  const pickWhy = (p: Pick) => locale === 'fr' ? p.whyFr : locale === 'es' ? p.whyEs : locale === 'pt' ? p.whyPt : locale === 'de' ? (p.whyDe ?? p.whyEn) : locale === 'nl' ? (p.whyNl ?? p.whyEn) : p.whyEn
  const pickCellars = (p: Pick) => locale === 'fr' ? p.cellarsFr : locale === 'es' ? p.cellarsEs : locale === 'pt' ? p.cellarsPt : locale === 'de' ? (p.cellarsDe ?? p.cellarsEn) : locale === 'nl' ? (p.cellarsNl ?? p.cellarsEn) : p.cellarsEn
  const pickHotel = (p: Pick) => locale === 'fr' ? p.hotelFr : locale === 'es' ? p.hotelEs : locale === 'pt' ? p.hotelPt : locale === 'de' ? (p.hotelDe ?? p.hotelEn) : locale === 'nl' ? (p.hotelNl ?? p.hotelEn) : p.hotelEn

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-red-800 to-amber-700 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 40%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-100 mb-3">🍷 {t.eyebrow}</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{t.title}</h1>
          <p className="text-lg sm:text-xl text-amber-50 leading-relaxed">{t.intro}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-8">{t.pickHeading}</h2>
        <div className="space-y-6">
          {PICKS.map((p, i) => (
            <article key={p.slug} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <header className="px-5 sm:px-7 py-4 bg-gradient-to-r from-purple-50 to-amber-50 border-b border-stone-200">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-2xl font-black text-purple-800">#{i + 1}</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                    <Link href={`/${locale}${p.destPath}`} className="hover:text-purple-700">{p.name}</Link>
                  </h3>
                  <span className="text-sm text-stone-600">{p.country}</span>
                  <span className="ml-auto bg-purple-100 text-purple-900 text-xs font-bold px-3 py-1 rounded-full">
                    {p.region}
                  </span>
                </div>
              </header>
              <div className="px-5 sm:px-7 py-5 space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">{t.whyHere}</div>
                  <p className="text-stone-800 leading-relaxed">{pickWhy(p)}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">🏛️ {t.cellarsLabel}</div>
                  <p className="text-stone-700 text-sm leading-relaxed">{pickCellars(p)}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">{t.hotelLabel}</div>
                  <p className="text-stone-700 text-sm leading-relaxed">{pickHotel(p)}</p>
                </div>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link href={`/${locale}${p.destPath}`} className="text-sm font-semibold text-purple-700 hover:text-purple-900 hover:underline">
                    {t.seeDestCta}
                  </Link>
                  <a
                    href={buildAllezDestLink(p.name, p.country, `${CAMPAIGN_BASE}-${p.slug}`, 4)}
                    target="_blank"
                    rel="noopener sponsored"
                    className="text-sm font-semibold text-stone-700 hover:text-purple-700 hover:underline"
                  >
                    {t.hotelCta}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">📝 {t.practicalHeading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.practical.map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-stone-200">
              <h3 className="font-bold text-stone-900 mb-2">{p.h}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{p.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">❓ {t.faqHeading}</h2>
        <div className="space-y-4">
          {t.faqs.map((f, i) => (
            <details key={i} className="bg-white border border-stone-200 rounded-2xl group">
              <summary className="cursor-pointer p-5 font-semibold text-stone-900 list-none flex items-center justify-between">
                <span>{f.q}</span>
                <span className="text-stone-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-stone-700 leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <GuideFooter locale={locale} currentSlug={SLUG} />

      <StickyHotelCTA
        label={stickyLabel.label}
        cta={stickyLabel.cta}
        href={buildAllezDestLink('Bordeaux', 'France', `${CAMPAIGN_BASE}-sticky`, 4)}
      />
    </main>
  )
}
