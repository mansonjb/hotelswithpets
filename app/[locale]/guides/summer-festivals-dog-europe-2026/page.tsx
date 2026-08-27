import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'summer-festivals-dog-europe-2026'
const CAMPAIGN_BASE = 'festivals-2026'

const STICKY_LABELS: Record<string, { label: string; cta: string }> = {
  en: { label: 'Festival city pet-friendly hotels', cta: 'See hotels' },
  fr: { label: 'Hotels pet-friendly villes de festival', cta: 'Voir les hotels' },
  es: { label: 'Hoteles para mascotas en ciudades de festival', cta: 'Ver hoteles' },
  pt: { label: 'Hoteis pet-friendly em cidades de festival', cta: 'Ver hoteis' },
  de: { label: 'Hundefreundliche Hotels in Festivalstädten', cta: 'Hotels ansehen' },
  nl: { label: 'Hondvriendelijke hotels in festivalsteden', cta: 'Bekijk hotels' },
  it: { label: 'Hotel pet-friendly nelle città dei festival', cta: 'Vedi gli hotel' },
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
    en: `Summer Festivals in Europe with Your Dog: 8 Festival Cities with Pet-Friendly Hotels (2026)`,
    fr: `Festivals d'ete en Europe avec son chien : 8 villes festivalières avec hotels pet-friendly (2026)`,
    es: `Festivales de verano en Europa con tu perro: 8 ciudades con hoteles para mascotas (2026)`,
    pt: `Festivais de verao na Europa com o seu cao: 8 cidades com hoteis pet-friendly (2026)`,
    de: `Sommerfestivals in Europa mit Ihrem Hund: 8 Festivalstädte mit hundefreundlichen Hotels (2026)`,
    nl: `Zomerfestivals in Europa met je hond: 8 festivalsteden met huisdiervriendelijke hotels (2026)`,
    it: `Festival estivi in Europa con il tuo cane: 8 città di festival con hotel pet-friendly (2026)`,
  }
  const descriptions: Record<string, string> = {
    en: `Eight European festival cities in July-August 2026 where your dog can thrive alongside the programme. Bayreuth, Perugia, Spoleto, Orange, Colmar, Sopot, Parnu and Bregenz, with verified pet-friendly hotels near the festival venues.`,
    fr: `Huit villes de festival en Europe en juillet-aout 2026 ou votre chien peut profiter du programme. Bayreuth, Pérouse, Spolète, Orange, Colmar, Sopot, Parnu et Bregenz, avec hotels pet-friendly verifies a proximite des lieux de festival.`,
    es: `Ocho ciudades de festival en Europa en julio-agosto 2026 donde tu perro puede disfrutar del programa. Bayreuth, Perugia, Spoleto, Orange, Colmar, Sopot, Parnu y Bregenz, con hoteles para mascotas verificados cerca de los recintos.`,
    pt: `Oito cidades de festival na Europa em julho-agosto 2026 onde o seu cao pode desfrutar do programa. Bayreuth, Perugia, Spoleto, Orange, Colmar, Sopot, Parnu e Bregenz, com hoteis pet-friendly verificados perto dos recintos.`,
    de: `Acht europäische Festivalstädte im Juli und August 2026, in denen Ihr Hund das Programm in vollen Zügen genießen kann. Bayreuth, Perugia, Spoleto, Orange, Colmar, Sopot, Pärnu und Bregenz, mit geprüften hundefreundlichen Hotels in der Nähe der Festivalorte.`,
    nl: `Acht Europese festivalsteden in juli-augustus 2026 waar je hond volop kan meegenieten van het programma. Bayreuth, Perugia, Spoleto, Orange, Colmar, Sopot, Parnu en Bregenz, met geverifieerde huisdiervriendelijke hotels dicht bij de festivallocaties.`,
    it: `Otto città di festival in Europa tra luglio e agosto 2026 dove il tuo cane può godersi il programma insieme a te. Bayreuth, Perugia, Spoleto, Orange, Colmar, Sopot, Parnu e Bregenz, con hotel pet-friendly verificati vicino alle sedi dei festival.`,
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
  destPath: string
  summerTemp: string
  festivalNote: string
  whyEn: string
  whyFr: string
  whyEs: string
  whyPt: string
  whyDe: string
  whyNl?: string
  whyIt?: string
  hotelName: string
  hotelEn: string
  hotelFr: string
  hotelEs: string
  hotelPt: string
  hotelDe: string
  hotelNl?: string
  hotelIt?: string
}

const PICKS: Pick[] = [
  {
    slug: 'bayreuth',
    name: 'Bayreuth',
    country: 'Germany',
    destPath: '/destinations/bayreuth',
    summerTemp: '24°C',
    festivalNote: 'Wagner Festspiele · 25 Jul - 28 Aug',
    whyEn: `Bayreuth hosts the most prestigious opera festival in the world every summer: the Wagner Festspiele in the Festspielhaus on the green hill above town. Dogs obviously cannot attend the performances inside, but the Hofgarten park directly below the Festspielhaus is a large leash-welcome urban park perfect for morning walks while your travel companion attends the 5-hour operas. The town's Richard Wagner Museum has a dog-tolerant outer garden, the Eremitage baroque park 3 km east allows leashed dogs on all outer paths, and the biergarten culture of Franconia (the region) is the most dog-tolerant in Germany. The festival runs late July to late August.`,
    whyFr: `Bayreuth accueille le festival d'opera le plus prestigieux du monde chaque ete : le Wagner Festspiele au Festspielhaus sur la colline verte dominant la ville. Les chiens ne peuvent evidemment pas assister aux representations a l'interieur, mais le parc Hofgarten directement en dessous du Festspielhaus est un grand parc urbain ou les chiens en laisse sont bienvenus, parfait pour les promenades matinales pendant que votre compagnon de voyage assiste aux operas de 5 heures. Le musee Richard Wagner de la ville a un jardin exterieur tolerant aux chiens, le parc baroque Eremitage a 3 km a l'est autorise les chiens en laisse sur tous les sentiers exterieurs, et la culture biergarten de Franconie (la region) est la plus tolerante aux chiens d'Allemagne.`,
    whyEs: `Bayreuth acoge el festival de opera mas prestigioso del mundo cada verano: el Wagner Festspiele en el Festspielhaus sobre la colina verde que domina la ciudad. Los perros obviamente no pueden asistir a las actuaciones en el interior, pero el parque Hofgarten directamente debajo del Festspielhaus es un gran parque urbano donde los perros con correa son bienvenidos, perfecto para paseos matinales mientras tu companero de viaje asiste a las operas de 5 horas. El Museo Richard Wagner tiene un jardin exterior tolerante con perros, el parque barroco Eremitage a 3 km al este permite perros con correa en todos los senderos exteriores, y la cultura biergarten de Franconia (la region) es la mas tolerante con perros de Alemania.`,
    whyPt: `Bayreuth acolhe o festival de opera mais prestigioso do mundo todos os veraos: o Wagner Festspiele no Festspielhaus na colina verde acima da cidade. Os caes obviamente nao podem assistir as representacoes no interior, mas o parque Hofgarten diretamente abaixo do Festspielhaus e um grande parque urbano onde caes a trela sao bem-vindos, perfeito para passeios matinais enquanto o seu companheiro de viagem assiste as operas de 5 horas. O Museu Richard Wagner tem um jardim exterior tolerante com caes, o parque barroco Eremitage a 3 km a leste permite caes a trela em todos os trilhos exteriores, e a cultura biergarten da Franconia (a regiao) e a mais tolerante com caes da Alemanha.`,
    whyDe: `Bayreuth ist jeden Sommer Gastgeber des angesehensten Opernfestivals der Welt: die Wagner Festspiele im Festspielhaus auf dem grünen Hügel über der Stadt. Hunde dürfen die Aufführungen im Inneren natürlich nicht besuchen, aber der Hofgarten direkt unterhalb des Festspielhauses ist ein großer, leinenfreundlicher Stadtpark, ideal für Morgenspaziergänge, während Ihr Reisebegleiter die fünfstündigen Opern besucht. Das Richard-Wagner-Museum der Stadt hat einen hundetoleranten Außengarten, der barocke Eremitage-Park 3 km östlich erlaubt angeleinte Hunde auf allen Außenwegen, und die Biergartenkultur Frankens (der Region) ist die hundetoleranteste Deutschlands. Das Festival läuft von Ende Juli bis Ende August.`,
    whyNl: `Bayreuth is elke zomer gastheer van het meest prestigieuze operafestival ter wereld: de Wagner Festspiele in het Festspielhaus op de groene heuvel boven de stad. Je hond mag de voorstellingen binnen uiteraard niet bijwonen, maar de Hofgarten direct onder het Festspielhaus is een groot, hondvriendelijk stadspark, perfect voor ochtendwandelingen terwijl je reisgenoot de vijf uur durende opera's bijwoont. Het Richard Wagner Museum van de stad heeft een hondtolerante buitentuin, het barokke Eremitage-park 3 km ten oosten staat honden aan de lijn toe op alle buitenpaden, en de biergartencultuur van Franken (de regio) is de meest hondvriendelijke van Duitsland. Het festival loopt van eind juli tot eind augustus.`,
    whyIt: `Bayreuth ospita ogni estate il festival lirico più prestigioso del mondo: il Wagner Festspiele al Festspielhaus sulla collina verde sopra la città. Il tuo cane ovviamente non può assistere agli spettacoli all'interno, ma l'Hofgarten, proprio sotto il Festspielhaus, è un grande parco cittadino dove i cani al guinzaglio sono benvenuti, perfetto per le passeggiate mattutine mentre il tuo compagno di viaggio assiste alle opere di 5 ore. Il Museo Richard Wagner della città ha un giardino esterno tollerante verso i cani, il parco barocco Eremitage a 3 km a est permette cani al guinzaglio su tutti i sentieri esterni, e la cultura dei biergarten della Franconia (la regione) è la più tollerante verso i cani della Germania. Il festival va da fine luglio a fine agosto.`,
    hotelName: 'Hotel Goldener Anker',
    hotelEn: `Hotel Goldener Anker - historic 4-star preferred by festival guests, dogs accepted at moderate fee, walking distance to the Festspielhaus. The hotel has hosted festival-goers since the 19th century and understands that a Bayreuth trip often involves two very different programmes: opera inside, dog walks outside.`,
    hotelFr: `Hotel Goldener Anker - 4 etoiles historique favori des festivaliers, chiens acceptes (supplement modere), a distance a pied du Festspielhaus. L'hotel accueille des festivaliers depuis le XIXe siecle et comprend qu'un sejour a Bayreuth implique souvent deux programmes tres differents : opera a l'interieur, promenades canines a l'exterieur.`,
    hotelEs: `Hotel Goldener Anker - 4 estrellas historico favorito de los festivaleros, perros admitidos (suplemento moderado), a distancia a pie del Festspielhaus. El hotel ha acogido a asistentes al festival desde el siglo XIX y entiende que un viaje a Bayreuth a menudo implica dos programas muy diferentes: opera dentro, paseos con el perro fuera.`,
    hotelPt: `Hotel Goldener Anker - 4 estrelas historico favorito dos frequentadores do festival, caes aceites (taxa moderada), a distancia a pe do Festspielhaus. O hotel tem recebido frequentadores do festival desde o seculo XIX e compreende que uma viagem a Bayreuth frequentemente implica dois programas muito diferentes: opera dentro, passeios com o cao fora.`,
    hotelDe: `Hotel Goldener Anker - historisches 4-Sterne-Haus, bevorzugt von Festivalgästen, Hunde gegen moderate Gebühr willkommen, fußläufig zum Festspielhaus. Das Hotel beherbergt seit dem 19. Jahrhundert Festivalbesucher und weiß, dass eine Bayreuth-Reise oft zwei sehr unterschiedliche Programme umfasst: Oper drinnen, Hundespaziergänge draußen.`,
    hotelNl: `Hotel Goldener Anker - historisch 4-sterrenhotel, favoriet bij festivalgasten, honden welkom tegen een gematigde toeslag, loopafstand van het Festspielhaus. Het hotel herbergt al sinds de 19e eeuw festivalgangers en begrijpt dat een reis naar Bayreuth vaak twee heel verschillende programma's inhoudt: opera binnen, hondenwandelingen buiten.`,
    hotelIt: `Hotel Goldener Anker - 4 stelle storico preferito dagli spettatori del festival, cani accettati con supplemento moderato, a pochi passi dal Festspielhaus. L'hotel ospita spettatori del festival fin dal XIX secolo e capisce che un viaggio a Bayreuth spesso comprende due programmi molto diversi: opera all'interno, passeggiate col cane all'esterno.`,
  },
  {
    slug: 'perugia',
    name: 'Perugia',
    country: 'Italy',
    destPath: '/destinations/perugia',
    summerTemp: '28°C',
    festivalNote: 'Umbria Jazz · 11-20 Jul 2026',
    whyEn: `Umbria Jazz is one of Europe's largest jazz festivals, held in Perugia's hilltop medieval centre every July for 10 days. The outdoor stages in Piazza IV Novembre and the Giardini Carducci park welcome dogs at the free concerts (the ticketed tent concerts do not, but there are dozens of free outdoor performances). Perugia's escalator system connects the lower parking to the historic centre and accepts leashed dogs. The Corso Vannucci pedestrian main street is lined with cafe terraces that tolerate dogs. At 28°C in July, the hilltop Umbrian air is cooler than the valley below.`,
    whyFr: `Umbria Jazz est l'un des plus grands festivals de jazz d'Europe, tenu dans le centre medieval perché de Pérouse chaque juillet pendant 10 jours. Les scenes exterieures de la Piazza IV Novembre et du parc Giardini Carducci accueillent les chiens aux concerts gratuits (les concerts sous tente payants non, mais il y a des dizaines de representations gratuites en plein air). Le systeme d'escaliers mecaniques de Pérouse connecte le parking inferieur au centre historique et accepte les chiens en laisse. Le Corso Vannucci, rue pietonniereprincipale, est bordee de terrasses de cafes qui tolerent les chiens.`,
    whyEs: `Umbria Jazz es uno de los mayores festivales de jazz de Europa, celebrado en el centro medieval encaramado de Perugia cada julio durante 10 dias. Los escenarios al aire libre en la Piazza IV Novembre y el parque Giardini Carducci acogen perros en los conciertos gratuitos (las carpas de pago no, pero hay decenas de actuaciones gratuitas al aire libre). El sistema de escaleras mecanicas de Perugia conecta el aparcamiento inferior con el centro historico y admite perros con correa. El Corso Vannucci, calle peatonal principal, esta bordeado de terrazas de cafes que toleran perros.`,
    whyPt: `Umbria Jazz e um dos maiores festivais de jazz da Europa, realizado no centro medieval situado no alto de Perugia todos os julhos durante 10 dias. Os palcos ao ar livre na Piazza IV Novembre e no parque Giardini Carducci acolhem caes nos concertos gratuitos (as tendas com bilhetes nao, mas ha dezenas de espetaculos gratuitos ao ar livre). O sistema de escadas rolantes de Perugia liga o estacionamento inferior ao centro historico e aceita caes a trela. O Corso Vannucci, rua pedonal principal, e ladeado de esplanadas de cafes que toleram caes.`,
    whyDe: `Umbria Jazz ist eines der größten Jazzfestivals Europas und findet jeden Juli zehn Tage lang in Perugias mittelalterlichem Zentrum auf dem Hügel statt. Die Freiluftbühnen auf der Piazza IV Novembre und im Park Giardini Carducci heißen Hunde bei den kostenlosen Konzerten willkommen (bei den kostenpflichtigen Zeltkonzerten nicht, aber es gibt Dutzende kostenlose Freiluftauftritte). Die Rolltreppenanlage Perugias verbindet den unteren Parkplatz mit der Altstadt und lässt angeleinte Hunde zu. Die Fußgängerhauptstraße Corso Vannucci ist von Café-Terrassen gesäumt, die Hunde tolerieren. Bei 28 °C im Juli ist die Höhenluft Umbriens kühler als das Tal darunter.`,
    whyNl: `Umbria Jazz is een van de grootste jazzfestivals van Europa en vindt elke juli tien dagen lang plaats in het middeleeuwse centrum van Perugia op de heuvel. De buitenpodia op de Piazza IV Novembre en in het park Giardini Carducci verwelkomen honden bij de gratis concerten (de tentconcerten met kaartjes niet, maar er zijn tientallen gratis buitenoptredens). Het roltrappensysteem van Perugia verbindt de lagere parkeerplaats met het historische centrum en staat honden aan de lijn toe. De voetgangershoofdstraat Corso Vannucci is omzoomd met cafeterrassen die honden tolereren. Bij 28C in juli is de hoogteligging van Umbrie koeler dan de vallei eronder.`,
    whyIt: `Umbria Jazz è uno dei festival jazz più grandi d'Europa, ospitato ogni luglio per 10 giorni nel centro medievale collinare di Perugia. I palchi all'aperto in Piazza IV Novembre e nel parco dei Giardini Carducci accolgono i cani ai concerti gratuiti (i concerti a pagamento sotto tenda no, ma ci sono decine di spettacoli gratuiti all'aperto). Il sistema di scale mobili di Perugia collega il parcheggio a valle al centro storico e accetta cani al guinzaglio. Il Corso Vannucci, la via pedonale principale, è costeggiato da terrazze di caffè che tollerano i cani. Con 28°C a luglio, l'aria collinare dell'Umbria è più fresca della valle sottostante.`,
    hotelName: 'Sina Brufani',
    hotelEn: `Sina Brufani - 5-star on the main corso, pets welcome at moderate fee, terrace overlooking the Umbria valley. During Umbria Jazz, the hotel is the preferred choice of jazz musicians and their entourages: the terrace is one of the best listening spots in the city for the outdoor stages on the piazza below.`,
    hotelFr: `Sina Brufani - 5 etoiles sur le corso principal, animaux acceptes (supplement modere), terrasse dominant la vallee de l'Ombrie. Pendant Umbria Jazz, l'hotel est le choix prefere des musiciens de jazz et de leurs equipes : la terrasse est l'un des meilleurs spots d'ecoute de la ville pour les scenes exterieures sur la piazza en dessous.`,
    hotelEs: `Sina Brufani - 5 estrellas en el corso principal, mascotas admitidas (suplemento moderado), terraza con vistas al valle de Umbria. Durante Umbria Jazz, el hotel es la opcion preferida de los musicos de jazz y sus sequitos: la terraza es uno de los mejores puntos de escucha de la ciudad para los escenarios al aire libre en la piazza de abajo.`,
    hotelPt: `Sina Brufani - 5 estrelas no corso principal, animais de estimacao aceites (taxa moderada), esplanada com vista para o vale da Umbria. Durante o Umbria Jazz, o hotel e a escolha preferida dos musicos de jazz e suas comitivas: a esplanada e um dos melhores pontos de escuta da cidade para os palcos ao ar livre na praca abaixo.`,
    hotelDe: `Sina Brufani - 5-Sterne-Hotel am Hauptcorso, Haustiere gegen moderate Gebühr willkommen, Terrasse mit Blick auf das umbrische Tal. Während Umbria Jazz ist das Hotel die bevorzugte Wahl der Jazzmusiker und ihrer Entourage: Die Terrasse ist einer der besten Hörplätze der Stadt für die Freiluftbühnen auf der Piazza darunter.`,
    hotelNl: `Sina Brufani - 5-sterrenhotel aan de hoofdcorso, huisdieren welkom tegen een gematigde toeslag, terras met uitzicht op de vallei van Umbrie. Tijdens Umbria Jazz is het hotel de favoriete keuze van jazzmusici en hun entourage: het terras is een van de beste luisterplekken van de stad voor de buitenpodia op de piazza beneden.`,
    hotelIt: `Sina Brufani - 5 stelle sul corso principale, animali ammessi con supplemento moderato, terrazza affacciata sulla valle umbra. Durante Umbria Jazz, l'hotel è la scelta preferita dei musicisti jazz e del loro entourage: la terrazza è uno dei migliori punti d'ascolto della città per i palchi all'aperto sulla piazza sottostante.`,
  },
  {
    slug: 'spoleto',
    name: 'Spoleto',
    country: 'Italy',
    destPath: '/destinations/spoleto',
    summerTemp: '28°C',
    festivalNote: 'Festival dei Due Mondi · late Jun - mid Jul',
    whyEn: `The Festival dei Due Mondi (Two Worlds Festival) is Italy's most prestigious performing arts festival, combining theatre, opera, dance and concerts across Spoleto's Teatro Caio Melisso and outdoor venues from late June to mid-July. The Rocca Albornoziana fortress has open gardens where leashed dogs are tolerated, the 1st-century Roman amphitheatre exterior walk is completely dog-accessible, and the shaded Passeggiata del Giro trail circling the medieval walls is ideal for morning dog walks away from festival crowds.`,
    whyFr: `Le Festival dei Due Mondi (Festival des Deux Mondes) est le festival des arts du spectacle le plus prestigieux d'Italie, combinant theatre, opera, danse et concerts dans le Teatro Caio Melisso de Spolète et des lieux exterieurs de fin juin a mi-juillet. La forteresse Rocca Albornoziana a des jardins ouverts ou les chiens en laisse sont toleres, la promenade exterieure de l'amphitheatre romain du 1er siecle est entierement accessible aux chiens, et le sentier ombrage Passeggiata del Giro faisant le tour des remparts medievaux est ideal pour les promenades matinales loin des foules du festival.`,
    whyEs: `El Festival dei Due Mondi (Festival de los Dos Mundos) es el festival de artes escenicas mas prestigioso de Italia, combinando teatro, opera, danza y conciertos en el Teatro Caio Melisso de Spoleto y recintos al aire libre desde finales de junio hasta mediados de julio. La fortaleza Rocca Albornoziana tiene jardines abiertos donde se toleran los perros con correa, el paseo exterior del anfiteatro romano del siglo I es completamente accesible con perros, y el sombreado sendero Passeggiata del Giro que rodea las murallas medievales es ideal para paseos matinales lejos de las multitudes del festival.`,
    whyPt: `O Festival dei Due Mondi (Festival dos Dois Mundos) e o festival de artes performativas mais prestigioso de Italia, combinando teatro, opera, danca e concertos no Teatro Caio Melisso de Spoleto e recintos ao ar livre de finais de junho a meados de julho. A fortaleza Rocca Albornoziana tem jardins abertos onde caes a trela sao tolerados, o passeio exterior do anfiteatro romano do seculo I e completamente acessivel com caes, e o sombreado trilho Passeggiata del Giro que contorna as muralhas medievais e ideal para passeios matinais longe das multidoes do festival.`,
    whyDe: `Das Festival dei Due Mondi (Festival der Zwei Welten) ist Italiens angesehenstes Festival der darstellenden Künste und vereint von Ende Juni bis Mitte Juli Theater, Oper, Tanz und Konzerte im Teatro Caio Melisso von Spoleto und an Freiluftorten. Die Festung Rocca Albornoziana hat offene Gärten, in denen angeleinte Hunde toleriert werden, der Außenrundgang um das römische Amphitheater aus dem 1. Jahrhundert ist vollständig hundefreundlich, und der schattige Pfad Passeggiata del Giro rund um die mittelalterlichen Stadtmauern eignet sich ideal für Morgenspaziergänge abseits der Festivalmengen.`,
    whyNl: `Het Festival dei Due Mondi (Festival van de Twee Werelden) is het meest prestigieuze podiumkunstenfestival van Italie en combineert van eind juni tot half juli theater, opera, dans en concerten in het Teatro Caio Melisso van Spoleto en op buitenlocaties. Het fort Rocca Albornoziana heeft open tuinen waar honden aan de lijn worden getolereerd, de buitenwandeling rond het Romeinse amfitheater uit de 1e eeuw is volledig toegankelijk voor honden, en het schaduwrijke pad Passeggiata del Giro rond de middeleeuwse stadsmuren is ideaal voor ochtendwandelingen weg van de festivaldrukte.`,
    whyIt: `Il Festival dei Due Mondi è il festival delle arti performative più prestigioso d'Italia, che unisce teatro, opera, danza e concerti tra il Teatro Caio Melisso di Spoleto e le sedi all'aperto da fine giugno a metà luglio. La Rocca Albornoziana ha giardini aperti dove i cani al guinzaglio sono tollerati, la passeggiata esterna intorno all'anfiteatro romano del I secolo è completamente accessibile ai cani, e il sentiero ombreggiato della Passeggiata del Giro che circonda le mura medievali è ideale per le passeggiate mattutine lontano dalla folla del festival.`,
    hotelName: 'Hotel Clitunno',
    hotelEn: `Hotel Clitunno - 4-star in the historic centre, dogs welcome at modest fee. The hotel is a converted 16th-century palazzo a short walk from the Teatro Caio Melisso. The small inner courtyard is quiet enough for a dog to rest between evening performances and morning walks on the Passeggiata.`,
    hotelFr: `Hotel Clitunno - 4 etoiles en centre historique, chiens acceptes (supplement modeste). L'hotel est un palazzo du XVIe siecle reconverti a quelques pas du Teatro Caio Melisso. La petite cour interieure est suffisamment calme pour qu'un chien se repose entre les representations du soir et les promenades matinales sur la Passeggiata.`,
    hotelEs: `Hotel Clitunno - 4 estrellas en el centro historico, perros admitidos (suplemento modesto). El hotel es un palazzo del siglo XVI reconvertido a pocos pasos del Teatro Caio Melisso. El pequeno patio interior es suficientemente tranquilo para que un perro descanse entre las actuaciones nocturnas y los paseos matinales por la Passeggiata.`,
    hotelPt: `Hotel Clitunno - 4 estrelas no centro historico, caes aceites (taxa modesta). O hotel e um palazzo do seculo XVI reconvertido a poucos passos do Teatro Caio Melisso. O pequeno pateo interior e suficientemente calmo para um cao descansar entre as representacoes nocturnas e os passeios matinais na Passeggiata.`,
    hotelDe: `Hotel Clitunno - 4-Sterne-Haus im historischen Zentrum, Hunde gegen bescheidene Gebühr willkommen. Das Hotel ist ein umgebauter Palazzo aus dem 16. Jahrhundert, nur wenige Schritte vom Teatro Caio Melisso entfernt. Der kleine Innenhof ist ruhig genug, damit sich ein Hund zwischen Abendvorstellungen und Morgenspaziergängen auf der Passeggiata erholen kann.`,
    hotelNl: `Hotel Clitunno - 4-sterrenhotel in het historische centrum, honden welkom tegen een bescheiden toeslag. Het hotel is een omgebouwd palazzo uit de 16e eeuw, op korte loopafstand van het Teatro Caio Melisso. De kleine binnenplaats is rustig genoeg om een hond te laten uitrusten tussen de avondvoorstellingen en de ochtendwandelingen op de Passeggiata door.`,
    hotelIt: `Hotel Clitunno - 4 stelle nel centro storico, cani benvenuti con supplemento modesto. L'hotel è un palazzo del XVI secolo ristrutturato a pochi passi dal Teatro Caio Melisso. Il piccolo cortile interno è abbastanza tranquillo perché un cane si riposi tra gli spettacoli serali e le passeggiate mattutine sulla Passeggiata.`,
  },
  {
    slug: 'orange',
    name: 'Orange',
    country: 'France',
    destPath: '/destinations/orange',
    summerTemp: '30°C',
    festivalNote: `Chorégies d'Orange · Jul - Aug`,
    whyEn: `The Chorégies d'Orange are France's most spectacular open-air opera festival, held in the 2000-year-old Roman theatre every July and August. Dogs are not permitted inside the Antique Theatre during performances, but the surrounding esplanade is a wide open space where leashed dogs can wait during the intervals. The Arc de Triomphe park at the north end of the city and the Paul Cézanne garden are both dog-welcome green spaces. Orange sits in Provence where lavender is in bloom in July (peak season) and restaurant terraces allow dogs routinely.`,
    whyFr: `Les Chorégies d'Orange sont le festival d'opera en plein air le plus spectaculaire de France, tenu dans le theatre romain vieux de 2000 ans chaque juillet et aout. Les chiens ne sont pas autorises a l'interieur du Theatre Antique pendant les representations, mais l'esplanade environnante est un grand espace ouvert ou les chiens en laisse peuvent attendre pendant les entr'actes. Le parc de l'Arc de Triomphe au nord de la ville et le jardin Paul Cézanne sont deux espaces verts accueillants pour les chiens. Orange est en Provence ou la lavande est en fleur en juillet (pleine saison) et les terrasses de restaurants accueillent les chiens routinièrement.`,
    whyEs: `Las Chorégies d'Orange son el festival de opera al aire libre mas espectacular de Francia, celebrado en el teatro romano de 2000 anos de antiguedad cada julio y agosto. Los perros no estan permitidos dentro del Teatro Antiguo durante las actuaciones, pero la explanada circundante es un amplio espacio abierto donde los perros con correa pueden esperar durante los descansos. El parque del Arc de Triomphe en el extremo norte de la ciudad y el jardin Paul Cézanne son espacios verdes que acogen perros. Orange esta en Provenza, donde la lavanda esta en flor en julio (temporada alta) y las terrazas de restaurantes admiten perros routinariamente.`,
    whyPt: `As Chorégies d'Orange sao o festival de opera ao ar livre mais espetacular de Franca, realizado no teatro romano de 2000 anos todos os julhos e agostos. Os caes nao sao permitidos dentro do Teatro Antigo durante as representacoes, mas a esplandada envolvente e um amplo espaco aberto onde caes a trela podem esperar durante os intervalos. O parque do Arco de Triunfo no extremo norte da cidade e o jardim Paul Cézanne sao espacos verdes que acolhem caes. Orange fica na Provenca onde a lavanda esta em flor em julho (epoca alta) e as esplanadas de restaurantes aceitam caes routineiramente.`,
    whyDe: `Die Chorégies d'Orange sind Frankreichs spektakulärstes Freiluft-Opernfestival, das jeden Juli und August im 2000 Jahre alten römischen Theater stattfindet. Hunde sind während der Aufführungen nicht im Inneren des Antiken Theaters erlaubt, aber die umliegende Esplanade ist ein weiträumiger, offener Platz, auf dem angeleinte Hunde während der Pausen warten können. Der Park am Arc de Triomphe am Nordrand der Stadt und der Paul-Cézanne-Garten sind beide hundefreundliche Grünflächen. Orange liegt in der Provence, wo der Lavendel im Juli blüht (Hochsaison) und Restaurantterrassen Hunde routinemäßig zulassen.`,
    whyNl: `De Choregies d'Orange zijn het meest spectaculaire openluchtoperafestival van Frankrijk, dat elke juli en augustus plaatsvindt in het 2000 jaar oude Romeinse theater. Honden mogen tijdens de voorstellingen niet naar binnen bij het Antieke Theater, maar de omliggende esplanade is een ruime open plek waar honden aan de lijn tijdens de pauzes kunnen wachten. Het park bij de Arc de Triomphe aan de noordkant van de stad en de Paul Cezanne-tuin zijn allebei hondvriendelijke groene ruimtes. Orange ligt in de Provence waar de lavendel in juli bloeit (hoogseizoen) en restaurantterrassen honden standaard toelaten.`,
    whyIt: `Le Chorégies d'Orange sono il festival lirico all'aperto più spettacolare di Francia, ospitato ogni luglio e agosto nel teatro romano di 2000 anni. I cani non sono ammessi all'interno del Teatro Antico durante gli spettacoli, ma la spianata circostante è un ampio spazio aperto dove i cani al guinzaglio possono aspettare durante gli intervalli. Il parco dell'Arco di Trionfo a nord della città e il giardino Paul Cézanne sono entrambi spazi verdi che accolgono i cani. Orange si trova in Provenza, dove la lavanda fiorisce a luglio (alta stagione) e i dehors dei ristoranti accolgono i cani di norma.`,
    hotelName: 'Hotel Arene',
    hotelEn: `Hotel Arene - 3-star facing the Roman theatre, dogs accepted at modest fee. The hotel's position directly on the esplanade makes it the most practical festival base: the dog can be settled in the room before the 3-hour performance begins, and the esplanade walk takes under 5 minutes from the front door.`,
    hotelFr: `Hotel Arene - 3 etoiles face au theatre romain, chiens acceptes (supplement modeste). La position de l'hotel directement sur l'esplanade en fait la base de festival la plus pratique : le chien peut etre installe dans la chambre avant le debut de la representation de 3 heures, et la promenade sur l'esplanade prend moins de 5 minutes depuis la porte d'entree.`,
    hotelEs: `Hotel Arene - 3 estrellas frente al teatro romano, perros admitidos (suplemento modesto). La posicion del hotel directamente en la explanada lo convierte en la base de festival mas practica: el perro puede quedar acomodado en la habitacion antes de que comience la actuacion de 3 horas, y el paseo por la explanada toma menos de 5 minutos desde la puerta.`,
    hotelPt: `Hotel Arene - 3 estrelas em frente ao teatro romano, caes aceites (taxa modesta). A posicao do hotel diretamente na esplandada faz dele a base de festival mais pratica: o cao pode ficar acomodado no quarto antes do inicio da representacao de 3 horas, e o passeio na esplandada demora menos de 5 minutos a partir da porta da entrada.`,
    hotelDe: `Hotel Arene - 3-Sterne-Haus mit Blick auf das römische Theater, Hunde gegen bescheidene Gebühr willkommen. Die Lage des Hotels direkt an der Esplanade macht es zur praktischsten Festivalbasis: Der Hund kann im Zimmer versorgt werden, bevor die dreistündige Aufführung beginnt, und der Spaziergang über die Esplanade dauert von der Eingangstür aus weniger als 5 Minuten.`,
    hotelNl: `Hotel Arene - 3-sterrenhotel tegenover het Romeinse theater, honden welkom tegen een bescheiden toeslag. Door de ligging direct aan de esplanade is dit de meest praktische festivalbasis: je hond kan op de kamer worden achtergelaten voordat de drie uur durende voorstelling begint, en de wandeling over de esplanade duurt vanaf de voordeur minder dan 5 minuten.`,
    hotelIt: `Hotel Arene - 3 stelle davanti al teatro romano, cani accettati con supplemento modesto. La posizione dell'hotel direttamente sulla spianata lo rende la base più pratica per il festival: il cane può essere sistemato in camera prima dell'inizio dello spettacolo di 3 ore, e la passeggiata sulla spianata richiede meno di 5 minuti dalla porta d'ingresso.`,
  },
  {
    slug: 'colmar',
    name: 'Colmar',
    country: 'France',
    destPath: '/destinations/colmar',
    summerTemp: '26°C',
    festivalNote: 'Festival de Colmar · 5-14 Jul 2026',
    whyEn: `Colmar's July classical music festival brings international orchestras to the Eglise Saint-Matthieu and the Dominican convent (no dogs in concert venues), but the Petite Venise canal district and the Place de l'Ancienne Douane are among the most beautiful outdoor pedestrian spaces in France and are dog-accessible all day. The surrounding Alsatian wine route villages (Riquewihr, Ribeauville, Kaysersberg) begin 15 min by car and have vineyard walks that accept leashed dogs freely. The festival's evening concerts spill onto the half-timbered streets and the dog walk around the canals is genuinely magical at dusk.`,
    whyFr: `Le festival de musique classique de Colmar en juillet amene des orchestres internationaux a l'Eglise Saint-Matthieu et au couvent dominicain (sans chiens dans les lieux de concert), mais le quartier des canaux de la Petite Venise et la Place de l'Ancienne Douane comptent parmi les plus beaux espaces pietons exterieurs de France et sont accessibles aux chiens toute la journee. Les villages de la route des vins alsacienne (Riquewihr, Ribeauville, Kaysersberg) commencent a 15 min en voiture et ont des promenades dans les vignes qui acceptent les chiens en laisse librement.`,
    whyEs: `El festival de musica clasica de Colmar en julio trae orquestas internacionales a la Eglise Saint-Matthieu y al convento dominico (sin perros en los recintos de conciertos), pero el barrio de los canales de la Petite Venise y la Place de l'Ancienne Douane son de los espacios peatonales exteriores mas bonitos de Francia y son accesibles con perros todo el dia. Los pueblos de la ruta del vino alsaciana (Riquewihr, Ribeauville, Kaysersberg) comienzan a 15 min en coche y tienen paseos por los vinedos que admiten perros con correa libremente.`,
    whyPt: `O festival de musica classica de Colmar em julho traz orquestras internacionais a Eglise Saint-Matthieu e ao convento dominicano (sem caes nos recintos de concertos), mas o bairro dos canais da Petite Venise e a Place de l'Ancienne Douane estao entre os mais belos espacos pedonais exteriores de Franca e sao acessiveis com caes durante todo o dia. As aldeias da rota dos vinhos alsaciana (Riquewihr, Ribeauville, Kaysersberg) comecam a 15 min de carro e tem passeios pelos vinhedos que aceitam caes a trela livremente.`,
    whyDe: `Colmars klassisches Musikfestival im Juli bringt internationale Orchester in die Eglise Saint-Matthieu und das Dominikanerkloster (keine Hunde in den Konzertsälen), aber das Kanalviertel Petite Venise und die Place de l'Ancienne Douane gehören zu den schönsten Freiluft-Fußgängerbereichen Frankreichs und sind den ganzen Tag hundefreundlich zugänglich. Die umliegenden Dörfer der elsässischen Weinstraße (Riquewihr, Ribeauville, Kaysersberg) beginnen 15 Autominuten entfernt und bieten Weinbergspaziergänge, die angeleinte Hunde ohne Einschränkung zulassen. Die Abendkonzerte des Festivals ziehen in die Fachwerkgassen, und der Hundespaziergang entlang der Kanäle ist in der Dämmerung wirklich zauberhaft.`,
    whyNl: `Colmars klassieke muziekfestival in juli brengt internationale orkesten naar de Eglise Saint-Matthieu en het Dominicanenklooster (geen honden in de concertzalen), maar de kanalenwijk Petite Venise en de Place de l'Ancienne Douane behoren tot de mooiste buitenvoetgangersgebieden van Frankrijk en zijn de hele dag toegankelijk voor honden. De omliggende dorpjes van de Elzasser wijnroute (Riquewihr, Ribeauville, Kaysersberg) beginnen 15 autominuten verderop en bieden wandelingen door de wijngaarden waar honden aan de lijn vrij welkom zijn. De avondconcerten van het festival stromen de vakwerkstraatjes in, en de hondenwandeling langs de kanalen is bij schemering echt magisch.`,
    whyIt: `Il festival di musica classica di Colmar a luglio porta orchestre internazionali all'Eglise Saint-Matthieu e al convento domenicano (niente cani nelle sale da concerto), ma il quartiere dei canali Petite Venise e la Place de l'Ancienne Douane sono tra gli spazi pedonali all'aperto più belli di Francia e sono accessibili ai cani tutto il giorno. I villaggi circostanti della strada dei vini alsaziana (Riquewihr, Ribeauville, Kaysersberg) iniziano a 15 minuti d'auto e offrono passeggiate tra i vigneti che accolgono liberamente i cani al guinzaglio. I concerti serali del festival si riversano nelle stradine a graticcio, e la passeggiata col cane lungo i canali al crepuscolo è davvero magica.`,
    hotelName: 'La Maison des Tetes',
    hotelEn: `La Maison des Tetes - 5-star Renaissance facade hotel, dogs welcome at modest fee, central. The building dates from 1609 and the interior courtyard is a peaceful retreat from the festival crowds in the streets. The canal district of Petite Venise is 4 minutes on foot.`,
    hotelFr: `La Maison des Tetes - hotel 5 etoiles a facade Renaissance, chiens acceptes (supplement modeste), central. Le batiment date de 1609 et la cour interieure est un refuge paisible de la foule du festival dans les rues. Le quartier des canaux de la Petite Venise est a 4 minutes a pied.`,
    hotelEs: `La Maison des Tetes - hotel 5 estrellas de fachada renacentista, perros admitidos (suplemento modesto), central. El edificio data de 1609 y el patio interior es un refugio tranquilo de las multitudes del festival en las calles. El barrio de los canales de la Petite Venise esta a 4 minutos a pie.`,
    hotelPt: `La Maison des Tetes - hotel 5 estrelas de fachada renascentista, caes aceites (taxa modesta), central. O edificio data de 1609 e o patio interior e um refugio tranquilo das multidoes do festival nas ruas. O bairro dos canais da Petite Venise fica a 4 minutos a pe.`,
    hotelDe: `La Maison des Tetes - 5-Sterne-Hotel mit Renaissancefassade, Hunde gegen bescheidene Gebühr willkommen, zentral gelegen. Das Gebäude stammt aus dem Jahr 1609, und der Innenhof ist ein friedlicher Rückzugsort von den Festivalmengen in den Straßen. Das Kanalviertel Petite Venise ist 4 Gehminuten entfernt.`,
    hotelNl: `La Maison des Tetes - 5-sterrenhotel met renaissancegevel, honden welkom tegen een bescheiden toeslag, centraal gelegen. Het gebouw dateert uit 1609 en de binnenplaats is een vredige toevlucht voor de festivaldrukte in de straten. De kanalenwijk Petite Venise ligt op 4 minuten lopen.`,
    hotelIt: `La Maison des Tetes - hotel 5 stelle con facciata rinascimentale, cani benvenuti con supplemento modesto, centrale. L'edificio risale al 1609 e il cortile interno è un rifugio tranquillo dalla folla del festival nelle strade. Il quartiere dei canali Petite Venise è a 4 minuti a piedi.`,
  },
  {
    slug: 'sopot',
    name: 'Sopot',
    country: 'Poland',
    destPath: '/destinations/sopot',
    summerTemp: '22°C',
    festivalNote: 'Sopot International Song Contest · Aug',
    whyEn: `Sopot is the Baltic Riviera's jewel: a Belle Epoque resort town with Europe's longest wooden pier (512 metres, dogs allowed outside bathing hours), a car-free Monte Cassino pedestrian boulevard, and the famous Forest Opera amphitheatre (Lesna Opera) where dogs wait outside on the grassy hillside during shows. The beach has a dedicated dog zone at the northern end. August sees the International Song Contest (similar to Eurovision format) which fills the hotels but the town handles it well. Sopot is built for summer tourism.`,
    whyFr: `Sopot est le joyau de la Riviera baltique : une station Belle Epoque avec la plus longue jetee en bois d'Europe (512 metres, chiens autorises en dehors des heures de baignade), un boulevard pietomnier sans voiture Monte Cassino, et le celebre amphitheatre Forest Opera (Lesna Opera) ou les chiens attendent a l'exterieur sur le versant herbeux pendant les spectacles. La plage a une zone canine dediee a l'extremite nord. En aout se tient l'International Song Contest (format similaire a l'Eurovision) qui remplit les hotels, mais la ville gere bien l'affluence. Sopot est construite pour le tourisme estival.`,
    whyEs: `Sopot es la joya de la Riviera baltica: una ciudad balneario Belle Epoque con el muelle de madera mas largo de Europa (512 metros, perros permitidos fuera de las horas de bano), un bulevar peatonal sin coches Monte Cassino, y el famoso anfiteatro Forest Opera (Lesna Opera) donde los perros esperan fuera en la ladera herbosa durante los espectaculos. La playa tiene una zona canina dedicada en el extremo norte. En agosto se celebra el International Song Contest (formato similar a Eurovision) que llena los hoteles pero la ciudad lo gestiona bien. Sopot esta construida para el turismo veraniego.`,
    whyPt: `Sopot e a joia da Riviera baltica: uma cidade balneario Belle Epoque com o cais de madeira mais longo da Europa (512 metros, caes permitidos fora das horas de banho), uma avenida pedonal sem carros Monte Cassino, e o famoso anfiteatro Forest Opera (Lesna Opera) onde os caes esperam do lado de fora na encosta herbosa durante os espetaculos. A praia tem uma zona canina dedicada na extremidade norte. Em agosto realiza-se o International Song Contest (formato semelhante ao Eurovision) que enche os hoteis, mas a cidade gere bem o afluxo. Sopot foi construida para o turismo estival.`,
    whyDe: `Sopot ist das Juwel der baltischen Riviera: eine Belle-Époque-Kurstadt mit dem längsten Holzsteg Europas (512 Meter, Hunde außerhalb der Badezeiten erlaubt), der autofreien Fußgängerpromenade Monte Cassino und dem berühmten Amphitheater Waldoper (Lesna Opera), wo Hunde während der Vorstellungen draußen am Grashang warten. Der Strand hat am Nordende eine eigene Hundezone. Im August findet der Internationale Liederwettbewerb statt (ähnliches Format wie der Eurovision Song Contest), der die Hotels füllt, aber die Stadt bewältigt das gut. Sopot ist für den Sommertourismus gemacht.`,
    whyNl: `Sopot is het juweel van de Baltische Riviera: een Belle-Epoque-badplaats met de langste houten pier van Europa (512 meter, honden toegestaan buiten de zwemuren), de autovrije voetgangersboulevard Monte Cassino, en het beroemde amfitheater Waldoper (Lesna Opera), waar honden tijdens de voorstellingen buiten op de grashelling wachten. Het strand heeft aan het noordelijke uiteinde een eigen hondenzone. In augustus vindt de Internationale Liedjeswedstrijd plaats (vergelijkbaar met het Eurovisieformat), die de hotels vult, maar de stad kan het goed aan. Sopot is gebouwd voor het zomertoerisme.`,
    whyIt: `Sopot è il gioiello della Riviera baltica: una città balneare Belle Époque con il molo in legno più lungo d'Europa (512 metri, cani ammessi fuori dagli orari di balneazione), il viale pedonale senza auto Monte Cassino, e il famoso anfiteatro dell'Opera nel Bosco (Lesna Opera), dove i cani aspettano fuori sul pendio erboso durante gli spettacoli. La spiaggia ha una zona per cani dedicata all'estremità nord. Ad agosto si tiene il Concorso Internazionale della Canzone (formato simile all'Eurovision) che riempie gli hotel, ma la città gestisce bene l'afflusso. Sopot è costruita per il turismo estivo.`,
    hotelName: 'Sofitel Grand Sopot',
    hotelEn: `Sofitel Grand Sopot - 5-star Belle Epoque landmark, pets welcome at moderate fee, 2 min from the pier. The hotel has hosted the most celebrated artists who have performed at the Sopot festival for decades. The garden faces the Baltic and the pier walk starts at the garden gate.`,
    hotelFr: `Sofitel Grand Sopot - 5 etoiles Belle Epoque emblematique, animaux acceptes (supplement modere), 2 min de la jetee. L'hotel a accueilli les artistes les plus celebres qui se sont produits au festival de Sopot pendant des decennies. Le jardin fait face a la Baltique et la promenade sur la jetee commence a la porte du jardin.`,
    hotelEs: `Sofitel Grand Sopot - 5 estrellas Belle Epoque emblematico, mascotas admitidas (suplemento moderado), 2 min del muelle. El hotel ha acogido a los artistas mas celebres que han actuado en el festival de Sopot durante decadas. El jardin da al Baltico y el paseo por el muelle comienza en la puerta del jardin.`,
    hotelPt: `Sofitel Grand Sopot - 5 estrelas Belle Epoque emblematico, animais de estimacao aceites (taxa moderada), 2 min do cais. O hotel acolheu os artistas mais celebres que atuaram no festival de Sopot durante decadas. O jardim da para o Baltico e o passeio no cais comeca na porta do jardim.`,
    hotelDe: `Sofitel Grand Sopot - 5-Sterne-Wahrzeichen im Belle-Époque-Stil, Haustiere gegen moderate Gebühr willkommen, 2 Minuten vom Steg entfernt. Das Hotel beherbergt seit Jahrzehnten die gefeiertsten Künstler, die beim Sopot-Festival aufgetreten sind. Der Garten liegt zur Ostsee, und der Spaziergang zum Steg beginnt am Gartentor.`,
    hotelNl: `Sofitel Grand Sopot - iconisch 5-sterrenhotel in Belle-Epoque-stijl, huisdieren welkom tegen een gematigde toeslag, 2 minuten van de pier. Het hotel herbergt al decennialang de meest gevierde artiesten die optraden op het Sopot-festival. De tuin kijkt uit op de Oostzee en de wandeling naar de pier begint bij de tuinpoort.`,
    hotelIt: `Sofitel Grand Sopot - iconico hotel 5 stelle in stile Belle Époque, animali benvenuti con supplemento moderato, a 2 minuti dal molo. L'hotel ospita da decenni gli artisti più celebri che si sono esibiti al festival di Sopot. Il giardino affaccia sul Baltico e la passeggiata sul molo inizia dal cancello del giardino.`,
  },
  {
    slug: 'parnu',
    name: 'Parnu',
    country: 'Estonia',
    destPath: '/destinations/parnu',
    summerTemp: '20°C',
    festivalNote: 'Estonian summer capital · beach + music Jul-Aug',
    whyEn: `Parnu is Estonia's unofficial summer capital. Estonians call it "our Riviera" and it hosts a summer-long calendar of outdoor concerts, film screenings and beach markets throughout July and August. Temperatures stay under 22°C (Baltic breeze), the Parnu beach has a designated dog zone at the southern end, the Rannaniidu meadow park allows off-leash play, and Estonian culture is extremely dog-tolerant at restaurant terraces. The town is calm enough that you can walk the entire centre with a dog in 45 minutes.`,
    whyFr: `Parnu est la capitale estivale non officielle de l'Estonie. Les Estoniens l'appellent "notre Riviera" et elle accueille un calendrier tout l'ete de concerts en plein air, projections de films et marches de plage tout au long de juillet et aout. Les temperatures restent sous 22°C (brise baltique), la plage de Parnu a une zone canine designee a l'extremite sud, le parc-prairie Rannaniidu permet le jeu sans laisse, et la culture estonienne est extremement tolerante aux chiens dans les terrasses de restaurants. La ville est suffisamment calme pour que vous puissiez parcourir tout le centre avec un chien en 45 minutes.`,
    whyEs: `Parnu es la capital veraniega no oficial de Estonia. Los estonios la llaman "nuestra Riviera" y acoge un calendario de todo el verano de conciertos al aire libre, proyecciones de peliculas y mercados de playa a lo largo de julio y agosto. Las temperaturas se mantienen bajo 22°C (brisa baltica), la playa de Parnu tiene una zona canina designada en el extremo sur, el parque-pradera Rannaniidu permite el juego sin correa, y la cultura estonia es extremadamente tolerante con perros en las terrazas de restaurantes. La ciudad es suficientemente tranquila para que puedas recorrer todo el centro con un perro en 45 minutos.`,
    whyPt: `Parnu e a capital estival nao oficial da Estonia. Os estonianos chamam-lhe "a nossa Riviera" e acolhe um calendario de todo o verao de concertos ao ar livre, projeccoes de filmes e mercados de praia ao longo de julho e agosto. As temperaturas ficam abaixo dos 22°C (brisa baltica), a praia de Parnu tem uma zona canina designada na extremidade sul, o parque-pradaria Rannaniidu permite o jogo sem trela, e a cultura estonia e extremamente tolerante com caes nas esplanadas de restaurantes. A cidade e suficientemente calma para percorrer todo o centro com um cao em 45 minutos.`,
    whyDe: `Pärnu ist Estlands inoffizielle Sommerhauptstadt. Die Esten nennen sie "unsere Riviera", und den ganzen Sommer über gibt es hier Freiluftkonzerte, Filmvorführungen und Strandmärkte im Juli und August. Die Temperaturen bleiben unter 22 °C (Ostseebrise), der Strand von Pärnu hat am Südende eine ausgewiesene Hundezone, der Wiesenpark Rannaniidu erlaubt Freilauf, und die estnische Kultur ist auf Restaurantterrassen äußerst hundetolerant. Die Stadt ist ruhig genug, um das gesamte Zentrum mit Hund in 45 Minuten zu durchqueren.`,
    whyNl: `Parnu is de onofficiele zomerhoofdstad van Estland. Esten noemen het "onze Riviera" en de stad heeft de hele zomer een programma van buitenconcerten, filmvertoningen en strandmarkten in juli en augustus. De temperaturen blijven onder 22C (Baltische bries), het strand van Parnu heeft aan het zuidelijke uiteinde een aangewezen hondenzone, het weilandpark Rannaniidu staat loslopen toe, en de Estse cultuur is uitermate hondvriendelijk op restaurantterrassen. De stad is rustig genoeg om het hele centrum met je hond in 45 minuten te doorkruisen.`,
    whyIt: `Parnu è la capitale estiva non ufficiale dell'Estonia. Gli estoni la chiamano "la nostra Riviera" e ospita per tutta l'estate un calendario di concerti all'aperto, proiezioni di film e mercatini sulla spiaggia lungo luglio e agosto. Le temperature restano sotto i 22°C (brezza baltica), la spiaggia di Parnu ha una zona per cani dedicata all'estremità sud, il parco-prato Rannaniidu permette di lasciare il cane libero, e la cultura estone è estremamente tollerante verso i cani nei dehors dei ristoranti. La città è abbastanza tranquilla da poter percorrere tutto il centro con il cane in 45 minuti.`,
    hotelName: 'Villa Wesset',
    hotelEn: `Villa Wesset - boutique hotel in the spa quarter, dogs welcome at modest fee, private garden. The spa quarter of Parnu is the quietest and most residential part of the city, lined with wooden villas from the early 20th century. The private garden is perfect for a dog that wants to decompress after a car journey.`,
    hotelFr: `Villa Wesset - hotel boutique dans le quartier thermal, chiens acceptes (supplement modeste), jardin prive. Le quartier thermal de Parnu est la partie la plus calme et la plus residentielle de la ville, bordee de villas en bois du debut du XXe siecle. Le jardin prive est parfait pour un chien qui veut se detendre apres un trajet en voiture.`,
    hotelEs: `Villa Wesset - hotel boutique en el barrio de los banos, perros admitidos (suplemento modesto), jardin privado. El barrio de los banos de Parnu es la parte mas tranquila y residencial de la ciudad, bordeada de villas de madera de principios del siglo XX. El jardin privado es perfecto para un perro que quiere relajarse despues de un viaje en coche.`,
    hotelPt: `Villa Wesset - hotel boutique no bairro das termas, caes aceites (taxa modesta), jardim privado. O bairro das termas de Parnu e a parte mais calma e residencial da cidade, ladeada de vilas de madeira do inicio do seculo XX. O jardim privado e perfeito para um cao que quer descansar apos uma viagem de carro.`,
    hotelDe: `Villa Wesset - Boutique-Hotel im Kurviertel, Hunde gegen bescheidene Gebühr willkommen, privater Garten. Das Kurviertel von Pärnu ist der ruhigste und wohnlichste Teil der Stadt, gesäumt von Holzvillen aus dem frühen 20. Jahrhundert. Der private Garten eignet sich perfekt für einen Hund, der sich nach einer Autofahrt entspannen möchte.`,
    hotelNl: `Villa Wesset - boetiekhotel in de kuurwijk, honden welkom tegen een bescheiden toeslag, prive tuin. De kuurwijk van Parnu is het rustigste en meest residentiele deel van de stad, omzoomd door houten villa's uit het begin van de 20e eeuw. De prive tuin is perfect voor een hond die na een autorit tot rust wil komen.`,
    hotelIt: `Villa Wesset - hotel boutique nel quartiere termale, cani benvenuti con supplemento modesto, giardino privato. Il quartiere termale di Parnu è la parte più tranquilla e residenziale della città, costeggiata da ville in legno dei primi del Novecento. Il giardino privato è perfetto per un cane che vuole rilassarsi dopo un viaggio in auto.`,
  },
  {
    slug: 'bregenz',
    name: 'Bregenz',
    country: 'Austria',
    destPath: '/destinations/bregenz',
    summerTemp: '22°C',
    festivalNote: 'Bregenzer Festspiele · 17 Jul - 18 Aug 2026',
    whyEn: `The Bregenzer Festspiele are one of the world's most visually spectacular opera festivals: the stage is built on Lake Constance itself, seating 7000, and the performances are visible from the lakeside promenade where leashed dogs are welcome to watch (from a distance, with the audio). The lake promenade from Bregenz to Hard is a 4 km flat dog walk with mountain views across to Switzerland and Germany. The Pfander cable car accepts leashed dogs (10 EUR) to reach a 1065m plateau with alpine meadow trails.`,
    whyFr: `Les Bregenzer Festspiele sont l'un des festivals d'opera les plus spectaculaires du monde : la scene est construite sur le lac de Constance lui-meme, avec 7000 places, et les representations sont visibles depuis la promenade du lac ou les chiens en laisse sont bienvenus pour regarder (de loin, avec l'audio). La promenade du lac de Bregenz a Hard est une promenade canine plate de 4 km avec des vues sur les montagnes vers la Suisse et l'Allemagne. Le teleferique du Pfander accepte les chiens en laisse (10 EUR) pour acceder a un plateau de 1065m avec des sentiers de prairie alpine.`,
    whyEs: `Los Bregenzer Festspiele son uno de los festivales de opera visualmente mas espectaculares del mundo: el escenario esta construido sobre el lago Constanza mismo, con 7000 butacas, y las actuaciones son visibles desde el paseo lacustre donde los perros con correa son bienvenidos para ver (desde lejos, con el audio). El paseo lacustre de Bregenz a Hard es un paseo canino llano de 4 km con vistas a las montanas hacia Suiza y Alemania. El teleferico del Pfander admite perros con correa (10 EUR) para acceder a una meseta de 1065m con senderos de prado alpino.`,
    whyPt: `Os Bregenzer Festspiele sao um dos festivais de opera visualmente mais espetaculares do mundo: o palco esta construido sobre o proprio Lago Constanca, com 7000 lugares, e as representacoes sao visiveis a partir do passeio a beira do lago onde caes a trela sao bem-vindos para ver (de longe, com o audio). O passeio a beira do lago de Bregenz a Hard e um passeio canino plano de 4 km com vistas para as montanhas em direcao a Suica e a Alemanha. O telecabine do Pfander aceita caes a trela (10 EUR) para aceder a um planalto de 1065m com trilhos de prado alpino.`,
    whyDe: `Die Bregenzer Festspiele sind eines der visuell spektakulärsten Opernfestivals der Welt: Die Bühne ist direkt auf dem Bodensee errichtet, mit 7000 Sitzplätzen, und die Aufführungen sind von der Seepromenade aus sichtbar, wo angeleinte Hunde willkommen sind, um zuzuschauen (aus der Ferne, mit dem Ton). Die Seepromenade von Bregenz nach Hard ist ein 4 km langer, flacher Hundespaziergang mit Bergblick auf die Schweiz und Deutschland. Die Pfänderbahn nimmt angeleinte Hunde mit (10 EUR), um ein 1065 m hohes Plateau mit Almwiesenwegen zu erreichen.`,
    whyNl: `De Bregenzer Festspiele zijn een van de visueel meest spectaculaire operafestivals ter wereld: het podium is rechtstreeks op de Bodensee gebouwd, met 7000 zitplaatsen, en de voorstellingen zijn zichtbaar vanaf de meerpromenade, waar honden aan de lijn welkom zijn om te kijken (van een afstand, met het geluid erbij). De meerpromenade van Bregenz naar Hard is een vlakke hondenwandeling van 4 km met bergzicht op Zwitserland en Duitsland. De Pfanderbahn kabelbaan neemt honden aan de lijn mee (10 EUR) naar een plateau op 1065 m met alpenweidepaden.`,
    whyIt: `Il Bregenzer Festspiele è uno dei festival lirici visivamente più spettacolari al mondo: il palco è costruito direttamente sul Lago di Costanza, con 7000 posti, e gli spettacoli sono visibili dalla passeggiata sul lago, dove i cani al guinzaglio sono benvenuti per guardare (da lontano, con l'audio). La passeggiata sul lago da Bregenz a Hard è una camminata pianeggiante di 4 km per cani con vista sulle montagne verso Svizzera e Germania. La funivia del Pfander accetta cani al guinzaglio (10 EUR) per raggiungere un altopiano a 1065 m con sentieri tra i prati alpini.`,
    hotelName: 'Hotel Schwärzler',
    hotelEn: `Hotel Schwärzler - 4-star festival-season favourite, dogs welcome at moderate fee, 10 min walk to the lake stage. The hotel is the preferred choice of festival regulars who want a quieter location slightly back from the lakeside crowds. The breakfast terrace has a view of the Pfander mountain.`,
    hotelFr: `Hotel Schwärzler - 4 etoiles favori de la saison festivaliere, chiens acceptes (supplement modere), 10 min a pied de la scene sur le lac. L'hotel est le choix prefere des habitues du festival qui veulent un emplacement plus calme legerement a l'ecart des foules du lac. La terrasse du petit-dejeuner a vue sur la montagne du Pfander.`,
    hotelEs: `Hotel Schwärzler - 4 estrellas favorito de la temporada festivalera, perros admitidos (suplemento moderado), 10 min andando hasta el escenario del lago. El hotel es la opcion preferida de los habituales del festival que quieren una ubicacion mas tranquila, ligeramente alejada de las multitudes del lago. La terraza del desayuno tiene vista a la montana Pfander.`,
    hotelPt: `Hotel Schwärzler - 4 estrelas favorito da epoca do festival, caes aceites (taxa moderada), 10 min a pe do palco no lago. O hotel e a escolha preferida dos habituais do festival que querem uma localizacao mais calma, ligeiramente afastada das multidoes junto ao lago. A esplanada do pequeno-almoco tem vista para a montanha Pfander.`,
    hotelDe: `Hotel Schwärzler - beliebtes 4-Sterne-Haus zur Festspielzeit, Hunde gegen moderate Gebühr willkommen, 10 Gehminuten zur Seebühne. Das Hotel ist die bevorzugte Wahl von Festivalstammgästen, die eine ruhigere Lage etwas abseits der Menschenmengen am See suchen. Die Frühstücksterrasse bietet Aussicht auf den Pfänder.`,
    hotelNl: `Hotel Schwärzler - populair 4-sterrenhotel tijdens het festivalseizoen, honden welkom tegen een gematigde toeslag, 10 minuten lopen van het meerpodium. Het hotel is de favoriete keuze van vaste festivalgangers die een rustigere locatie zoeken, iets terug van de drukte aan het meer. Het ontbijtterras heeft uitzicht op de Pfander.`,
    hotelIt: `Hotel Schwärzler - hotel 4 stelle preferito durante la stagione del festival, cani benvenuti con supplemento moderato, a 10 minuti a piedi dal palco sul lago. L'hotel è la scelta preferita degli habitué del festival che vogliono una posizione più tranquilla, leggermente arretrata dalla folla del lago. La terrazza della colazione ha vista sul monte Pfander.`,
  },
]

const COPY = {
  en: {
    eyebrow: 'FESTIVAL SEASON 2026 · PET TRAVEL EUROPE',
    title: `Summer Festivals in Europe with Your Dog: 8 Festival Cities with Pet-Friendly Hotels (2026)`,
    intro: `Festival summer is the peak of European cultural life in July and August. Dog owners have historically avoided festival cities assuming their dog would be excluded. This guide explains how to attend the festival AND keep your dog happy: outdoor concerts, festival atmosphere in the parks, and cities that come alive at a human pace dogs actually enjoy.`,
    pickHeading: '8 festival cities where dogs thrive alongside the programme',
    whyHere: 'Why here',
    hotelLabel: 'Where to stay',
    seeDestCta: 'Full city guide →',
    hotelCta: 'See availability →',
    summerLabel: 'Summer avg high',
    practicalHeading: 'Festival travel with a dog: practical info',
    practical: [
      {
        h: 'The companion strategy',
        p: `One human attends the performance, one stays with the dog in the park or terrace. Most festival performances are 2-4 hours, the ideal duration for a dog nap in a hotel or city park. For Bayreuth operas (5 hours), plan a longer walk beforehand so the dog is settled before you leave. The companion strategy works across all 8 cities in this guide and turns a potential logistics headache into a pleasant parallel programme.`,
      },
      {
        h: 'Booking hotels during festival season',
        p: `Book 3-6 months ahead for Bayreuth (sells out in October for the following summer), 8 weeks ahead for Spoleto and Orange, 4 weeks for Parnu and Sopot. Festival cities impose city-wide peak pricing during the event week. For Bregenz and Colmar, the surrounding villages (Hard and Turckheim respectively) offer quieter alternatives at lower prices with a 15-20 min drive to the venues.`,
      },
      {
        h: 'Festival outdoor concerts vs ticketed venues',
        p: `Many festivals have free outdoor concerts on city squares where dogs are tolerated. Umbria Jazz (Perugia) has free piazza stages, the Bregenz lake promenade is a public space during performances, and the Colmar Petite Venise evening atmosphere extends the festival mood into dog-accessible streets. Check each festival's outdoor programme before booking: these free events are often as musically satisfying as the main ticketed events.`,
      },
      {
        h: 'Heat management at summer festivals',
        p: `Southern festivals (Orange, Perugia, Spoleto) hit 28-30°C in July. Attend evening performances, keep your dog in an air-conditioned hotel room during the hottest afternoon hours (14h-18h), and pre-book a hotel with a garden or shaded terrace. The 7-second paw test applies: press the back of your hand on asphalt for 7 seconds. If you cannot hold it, your dog cannot walk on it. Baltic cities (Parnu, Sopot) stay under 22°C and have no heat management issues.`,
      },
    ],
    faqHeading: 'Frequently asked questions',
    faqs: [
      {
        q: 'Can my dog attend outdoor concerts at these festivals?',
        a: `At free outdoor concerts (Umbria Jazz piazza stages, Bregenz lake promenade) yes. At ticketed venue concerts, no. The companion strategy works: one person attends, dog stays at hotel or city park. Colmar's evening canal-side atmosphere and Sopot's Monte Cassino boulevard are public spaces where a well-behaved leashed dog is entirely normal during festival season.`,
      },
      {
        q: 'Which of these festivals is most dog-friendly overall?',
        a: `Parnu and Sopot. Baltic culture is the most dog-tolerant in Europe, the outdoor festival format is decentralised across the city, and temperatures stay under 22°C so the dog is comfortable all day. Bayreuth is the second best choice for dog companions: the Eremitage park, the Franconian biergarten culture, and the Hofgarten hill walks make it genuinely enjoyable for the non-opera half of the trip.`,
      },
      {
        q: 'Is Bayreuth worth going to if only one of us has tickets?',
        a: `Absolutely. The Eremitage park (a full baroque park with fountains, grottos and outer trails accepting leashed dogs), the town's Franconian biergarten culture (the most dog-tolerant in Germany), and the free access to the Festspielhaus hill gardens make Bayreuth genuinely interesting for the non-opera half of the trip. The Wagner Museum outer garden and the Hofgarten are both within a 10-minute walk from most central hotels.`,
      },
      {
        q: 'What about large dogs at festival city hotels?',
        a: `Festival hotels tend to be boutique and impose weight limits (8-15 kg). Colmar, Sopot and Bregenz are the most flexible for larger breeds: look for 3-star family-run properties or aparthotels which typically have no weight restrictions. In Bayreuth, the Goldener Anker has hosted large dogs for festival guests historically. Always call ahead to confirm the current policy for your dog's weight and breed.`,
      },
    ],
    relatedHeading: 'See also',
  },
  fr: {
    eyebrow: `SAISON DES FESTIVALS 2026 · VOYAGE PET-FRIENDLY EUROPE`,
    title: `Festivals d'ete en Europe avec son chien : 8 villes festivalières avec hotels pet-friendly (2026)`,
    intro: `L'ete festivalier est le point culminant de la vie culturelle europeenne en juillet et aout. Les proprietaires de chiens ont historiquement evite les villes de festival en supposant que leur chien serait exclu. Ce guide explique comment assister au festival ET garder votre chien heureux : concerts en plein air, atmosphere festivaliere dans les parcs, et des villes qui s'animent a un rythme humain que les chiens apprecient vraiment.`,
    pickHeading: `8 villes de festival ou les chiens s'epanouissent aux cotes du programme`,
    whyHere: 'Pourquoi ici',
    hotelLabel: 'Ou dormir',
    seeDestCta: 'Guide complet →',
    hotelCta: 'Voir les disponibilites →',
    summerLabel: 'Max ete',
    practicalHeading: 'Voyage en festival avec un chien : info pratique',
    practical: [
      {
        h: 'La strategie du compagnon',
        p: `Un humain assiste au spectacle, l'autre reste avec le chien dans le parc ou en terrasse. La plupart des representations de festival durent 2 a 4 heures, la duree ideale pour une sieste canine dans un hotel ou un parc urbain. Pour les operas de Bayreuth (5 heures), prevoyer une longue promenade avant pour que le chien soit apaise avant votre depart. La strategie du compagnon fonctionne dans les 8 villes de ce guide et transforme un casse-tete logistique potentiel en un programme parallele agreable.`,
      },
      {
        h: 'Reserver les hotels pendant la saison festivaliere',
        p: `Reserver 3-6 mois a l'avance pour Bayreuth (complet en octobre pour l'ete suivant), 8 semaines a l'avance pour Spolète et Orange, 4 semaines pour Parnu et Sopot. Les villes de festival imposent des prix en pointe a l'echelle de la ville pendant la semaine de l'evenement. Pour Bregenz et Colmar, les villages environnants (Hard et Turckheim respectivement) offrent des alternatives plus calmes a des prix inferieurs avec 15-20 min de route jusqu'aux lieux.`,
      },
      {
        h: 'Concerts en plein air vs lieux payants',
        p: `De nombreux festivals proposent des concerts gratuits en plein air sur les places de la ville ou les chiens sont toleres. Umbria Jazz (Pérouse) a des scenes gratuites sur la piazza, la promenade du lac de Bregenz est un espace public pendant les representations, et l'atmosphere estivale de la Petite Venise de Colmar etend l'ambiance festivaliere dans des rues accessibles aux chiens. Verifier le programme exterieur de chaque festival avant de reserver.`,
      },
      {
        h: 'Gestion de la chaleur aux festivals estivaux',
        p: `Les festivals du sud (Orange, Pérouse, Spolète) atteignent 28-30°C en juillet. Assister aux representations du soir, garder votre chien dans une chambre d'hotel climatisee pendant les heures les plus chaudes de l'apres-midi (14h-18h), et prevoir un hotel avec jardin ou terrasse ombragee. Le test des 7 secondes s'applique : pressez le dos de votre main sur l'asphalte pendant 7 secondes. Si vous ne tenez pas, votre chien non plus. Les villes baltiques (Parnu, Sopot) restent sous 22°C et n'ont aucun probleme de gestion de la chaleur.`,
      },
    ],
    faqHeading: 'Questions frequentes',
    faqs: [
      {
        q: 'Mon chien peut-il assister aux concerts en plein air de ces festivals ?',
        a: `Aux concerts gratuits en plein air (scenes de piazza d'Umbria Jazz, promenade du lac de Bregenz) oui. Aux concerts en lieu payant, non. La strategie du compagnon fonctionne : une personne assiste, le chien reste a l'hotel ou dans le parc de la ville. L'atmosphere canaliere en soiree de Colmar et le boulevard Monte Cassino de Sopot sont des espaces publics ou un chien bien eleve en laisse est tout a fait normal pendant la saison des festivals.`,
      },
      {
        q: 'Lequel de ces festivals est le plus accueillant pour les chiens ?',
        a: `Parnu et Sopot. La culture baltique est la plus tolerante aux chiens d'Europe, le format de festival en plein air est decentralise dans toute la ville, et les temperatures restent sous 22°C pour que le chien soit confortable toute la journee. Bayreuth est le deuxieme meilleur choix pour les compagnons canins : le parc de l'Eremitage, la culture biergarten franconienne et les promenades sur la colline du Hofgarten rendent Bayreuth vraiment agreable pour la moitie non-opera du voyage.`,
      },
      {
        q: `Vaut-il la peine d'aller a Bayreuth si seulement l'un de nous a des billets ?`,
        a: `Absolument. Le parc de l'Eremitage (un parc baroque complet avec fontaines, grottes et sentiers exterieurs acceptant les chiens en laisse), la culture biergarten franconienne de la ville (la plus tolerante aux chiens d'Allemagne), et l'acces gratuit aux jardins de la colline du Festspielhaus rendent Bayreuth vraiment interessante pour la moitie non-opera du voyage. Le jardin exterieur du Musee Wagner et le Hofgarten sont tous deux a moins de 10 minutes a pied de la plupart des hotels du centre.`,
      },
      {
        q: `Qu'en est-il des grands chiens dans les hotels des villes de festival ?`,
        a: `Les hotels des villes de festival ont tendance a etre des boutiques qui imposent des limites de poids (8-15 kg). Colmar, Sopot et Bregenz sont les plus flexibles pour les grandes races : cherchez des proprietes familiales 3 etoiles ou des aparthotels qui n'ont generalement pas de restrictions de poids. A Bayreuth, le Goldener Anker a historiquement accueilli de grands chiens pour les festivaliers. Toujours appeler a l'avance pour confirmer la politique actuelle concernant le poids et la race de votre chien.`,
      },
    ],
    relatedHeading: 'Voir aussi',
  },
  es: {
    eyebrow: `TEMPORADA DE FESTIVALES 2026 · VIAJE PET-FRIENDLY EUROPA`,
    title: `Festivales de verano en Europa con tu perro: 8 ciudades con hoteles para mascotas (2026)`,
    intro: `El verano de los festivales es el punto culminante de la vida cultural europea en julio y agosto. Los duenos de perros han evitado historicamente las ciudades de festival suponiendo que su perro quedaria excluido. Esta guia explica como asistir al festival Y mantener a tu perro feliz: conciertos al aire libre, atmosfera festivalera en los parques, y ciudades que cobran vida a un ritmo humano que los perros realmente disfrutan.`,
    pickHeading: '8 ciudades de festival donde los perros prosperan junto al programa',
    whyHere: 'Por que aqui',
    hotelLabel: 'Donde alojarse',
    seeDestCta: 'Guia completa →',
    hotelCta: 'Ver disponibilidad →',
    summerLabel: 'Max verano',
    practicalHeading: 'Viaje a festivales con perro: info practica',
    practical: [
      {
        h: 'La estrategia del companero',
        p: `Un humano asiste a la actuacion, el otro se queda con el perro en el parque o la terraza. La mayoria de las actuaciones de festival duran 2-4 horas, la duracion ideal para una siesta canina en un hotel o parque urbano. Para las operas de Bayreuth (5 horas), planear un paseo mas largo antes para que el perro este tranquilo antes de irse. La estrategia del companero funciona en las 8 ciudades de esta guia y convierte un potencial dolor de cabeza logistico en un agradable programa paralelo.`,
      },
      {
        h: 'Reservar hoteles durante la temporada de festivales',
        p: `Reservar con 3-6 meses de antelacion para Bayreuth (se agota en octubre para el verano siguiente), 8 semanas para Spoleto y Orange, 4 semanas para Parnu y Sopot. Las ciudades de festival imponen precios de temporada alta a escala de toda la ciudad durante la semana del evento. Para Bregenz y Colmar, los pueblos cercanos (Hard y Turckheim respectivamente) ofrecen alternativas mas tranquilas a menor precio con 15-20 min en coche hasta los recintos.`,
      },
      {
        h: 'Conciertos al aire libre vs recintos de pago',
        p: `Muchos festivales tienen conciertos gratuitos al aire libre en plazas donde se toleran los perros. Umbria Jazz (Perugia) tiene escenarios gratuitos en la piazza, el paseo lacustre de Bregenz es un espacio publico durante las actuaciones, y el ambiente de la Petite Venise de Colmar por la tarde extiende el ambiente festivalero a calles accesibles con perros. Comprobar el programa exterior de cada festival antes de reservar.`,
      },
      {
        h: 'Gestion del calor en festivales de verano',
        p: `Los festivales del sur (Orange, Perugia, Spoleto) alcanzan 28-30°C en julio. Asistir a las actuaciones de la tarde, mantener al perro en una habitacion de hotel con aire acondicionado durante las horas mas calurosas de la tarde (14h-18h), y reservar con antelacion un hotel con jardin o terraza sombreada. El test de los 7 segundos aplica: presiona el dorso de la mano en el asfalto durante 7 segundos. Si no aguantas, tu perro tampoco. Las ciudades balticas (Parnu, Sopot) se mantienen bajo 22°C y no tienen problemas de gestion del calor.`,
      },
    ],
    faqHeading: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Puede mi perro asistir a los conciertos al aire libre de estos festivales?',
        a: `En los conciertos gratuitos al aire libre (escenarios de piazza de Umbria Jazz, paseo lacustre de Bregenz) si. En los conciertos en recintos de pago, no. La estrategia del companero funciona: una persona asiste, el perro se queda en el hotel o parque de la ciudad. La atmosfera canalera vespertina de Colmar y el bulevar Monte Cassino de Sopot son espacios publicos donde un perro bien educado con correa es completamente normal durante la temporada de festivales.`,
      },
      {
        q: '¿Cual de estos festivales es el mas amigable con los perros en general?',
        a: `Parnu y Sopot. La cultura baltica es la mas tolerante con los perros de Europa, el formato de festival al aire libre esta descentralizado por toda la ciudad, y las temperaturas se mantienen bajo 22°C para que el perro este comodo todo el dia. Bayreuth es la segunda mejor opcion para los companeros caninos: el parque Eremitage, la cultura biergarten franconiana y los paseos por la colina Hofgarten hacen que Bayreuth sea genuinamente disfrutable para la mitad no-opera del viaje.`,
      },
      {
        q: '¿Vale la pena ir a Bayreuth si solo uno de nosotros tiene entradas?',
        a: `Absolutamente. El parque Eremitage (un parque barroco completo con fuentes, grutas y senderos exteriores que admiten perros con correa), la cultura biergarten franconiana de la ciudad (la mas tolerante con perros de Alemania), y el acceso gratuito a los jardines de la colina del Festspielhaus hacen que Bayreuth sea genuinamente interesante para la mitad no-opera del viaje. El jardin exterior del Museo Wagner y el Hofgarten estan ambos a menos de 10 minutos andando de la mayoria de los hoteles del centro.`,
      },
      {
        q: '¿Que hay de los perros grandes en los hoteles de ciudades de festival?',
        a: `Los hoteles de las ciudades de festival tienden a ser boutique e imponen limites de peso (8-15 kg). Colmar, Sopot y Bregenz son los mas flexibles para razas grandes: buscar propiedades familiares de 3 estrellas o aparthoteles que tipicamente no tienen restricciones de peso. En Bayreuth, el Goldener Anker ha acogido historicamente a perros grandes para los festivaleros. Siempre llamar con antelacion para confirmar la politica actual sobre el peso y la raza de tu perro.`,
      },
    ],
    relatedHeading: 'Ver tambien',
  },
  pt: {
    eyebrow: `EPOCA DOS FESTIVAIS 2026 · VIAGEM PET-FRIENDLY EUROPA`,
    title: `Festivais de verao na Europa com o seu cao: 8 cidades com hoteis pet-friendly (2026)`,
    intro: `O verao dos festivais e o pico da vida cultural europeia em julho e agosto. Os donos de caes evitaram historicamente as cidades de festival presumindo que o seu cao ficaria excluido. Este guia explica como assistir ao festival E manter o seu cao feliz: concertos ao ar livre, atmosfera festivaleira nos parques, e cidades que ganham vida a um ritmo humano que os caes realmente apreciam.`,
    pickHeading: '8 cidades de festival onde os caes prosperam a par do programa',
    whyHere: 'Porque aqui',
    hotelLabel: 'Onde ficar',
    seeDestCta: 'Guia completo →',
    hotelCta: 'Ver disponibilidade →',
    summerLabel: 'Max verao',
    practicalHeading: 'Viagem a festivais com cao: info pratica',
    practical: [
      {
        h: 'A estrategia do companheiro',
        p: `Um humano assiste ao espetaculo, o outro fica com o cao no parque ou na esplanada. A maioria dos espetaculos de festival dura 2-4 horas, a duracao ideal para uma sesta canina num hotel ou parque urbano. Para as operas de Bayreuth (5 horas), planear uma caminhada mais longa antes para que o cao esteja tranquilo antes de partir. A estrategia do companheiro funciona nas 8 cidades deste guia e transforma um potencial problema logistico num agradavel programa paralelo.`,
      },
      {
        h: 'Reservar hoteis durante a epoca dos festivais',
        p: `Reservar com 3-6 meses de antecedencia para Bayreuth (esgota em outubro para o verao seguinte), 8 semanas para Spoleto e Orange, 4 semanas para Parnu e Sopot. As cidades de festival impoe precos de epoca alta a escala de toda a cidade durante a semana do evento. Para Bregenz e Colmar, as aldeias circundantes (Hard e Turckheim respetivamente) oferecem alternativas mais tranquilas a precos mais baixos com 15-20 min de carro ate os recintos.`,
      },
      {
        h: 'Concertos ao ar livre vs recintos com bilhetes',
        p: `Muitos festivais tem concertos gratuitos ao ar livre em pracas da cidade onde os caes sao tolerados. Umbria Jazz (Perugia) tem palcos gratuitos na praca, o passeio a beira do lago de Bregenz e um espaco publico durante as representacoes, e a atmosfera da Petite Venise de Colmar ao entardecer estende o ambiente festivaleiro a ruas acessiveis com caes. Verificar o programa exterior de cada festival antes de reservar.`,
      },
      {
        h: 'Gestao do calor nos festivais de verao',
        p: `Os festivais do sul (Orange, Perugia, Spoleto) atingem 28-30°C em julho. Assistir as representacoes noturnas, manter o cao num quarto de hotel com ar condicionado durante as horas mais quentes da tarde (14h-18h), e pre-reservar um hotel com jardim ou esplanada sombreada. O teste dos 7 segundos aplica-se: pressione as costas da mao no asfalto durante 7 segundos. Se nao aguentar, o seu cao tambem nao. As cidades balticas (Parnu, Sopot) ficam abaixo dos 22°C e nao tem problemas de gestao do calor.`,
      },
    ],
    faqHeading: 'Perguntas frequentes',
    faqs: [
      {
        q: 'O meu cao pode assistir a concertos ao ar livre nestes festivais?',
        a: `Nos concertos gratuitos ao ar livre (palcos de praca do Umbria Jazz, passeio a beira do lago de Bregenz) sim. Nos concertos em recintos com bilhetes, nao. A estrategia do companheiro funciona: uma pessoa assiste, o cao fica no hotel ou parque da cidade. A atmosfera canaleira vespertina de Colmar e o bulevar Monte Cassino de Sopot sao espacos publicos onde um cao bem-comportado a trela e completamente normal durante a epoca dos festivais.`,
      },
      {
        q: 'Qual destes festivais e o mais acolhedor para caes em geral?',
        a: `Parnu e Sopot. A cultura baltica e a mais tolerante com caes da Europa, o formato de festival ao ar livre esta descentralizado por toda a cidade, e as temperaturas ficam abaixo dos 22°C para que o cao esteja confortavel todo o dia. Bayreuth e a segunda melhor escolha para companheiros caninos: o parque Eremitage, a cultura biergarten franconiana e os passeios pela colina Hofgarten tornam Bayreuth genuinamente agradavel para a metade nao-opera da viagem.`,
      },
      {
        q: 'Vale a pena ir a Bayreuth se apenas um de nos tem bilhetes?',
        a: `Absolutamente. O parque Eremitage (um parque barroco completo com fontes, grutas e trilhos exteriores que aceitam caes a trela), a cultura biergarten franconiana da cidade (a mais tolerante com caes da Alemanha), e o acesso gratuito aos jardins da colina do Festspielhaus tornam Bayreuth genuinamente interessante para a metade nao-opera da viagem. O jardim exterior do Museu Wagner e o Hofgarten ficam ambos a menos de 10 minutos a pe da maioria dos hoteis do centro.`,
      },
      {
        q: 'O que acontece com caes grandes nos hoteis das cidades de festival?',
        a: `Os hoteis das cidades de festival tendem a ser boutique e impoe limites de peso (8-15 kg). Colmar, Sopot e Bregenz sao os mais flexiveis para racas grandes: procurar propriedades familiares de 3 estrelas ou aparthoteis que tipicamente nao tem restricoes de peso. Em Bayreuth, o Goldener Anker tem historicamente acolhido caes grandes para os frequentadores do festival. Ligar sempre com antecedencia para confirmar a politica atual sobre o peso e a raca do seu cao.`,
      },
    ],
    relatedHeading: 'Ver tambem',
  },
  de: {
    eyebrow: `FESTIVALSAISON 2026 · HAUSTIERREISEN EUROPA`,
    title: `Sommerfestivals in Europa mit Ihrem Hund: 8 Festivalstädte mit hundefreundlichen Hotels (2026)`,
    intro: `Der Festivalsommer ist der Höhepunkt des europäischen Kulturlebens im Juli und August. Hundebesitzer haben Festivalstädte in der Vergangenheit oft gemieden, weil sie annahmen, ihr Hund würde ausgeschlossen sein. Dieser Ratgeber erklärt, wie Sie das Festival besuchen UND Ihren Hund glücklich halten können: Freiluftkonzerte, Festivalstimmung in den Parks und Städte, die in einem menschlichen Tempo lebendig werden, das Hunde tatsächlich genießen.`,
    pickHeading: '8 Festivalstädte, in denen Hunde neben dem Programm aufblühen',
    whyHere: 'Warum hier',
    hotelLabel: 'Wo übernachten',
    seeDestCta: 'Vollständiger Stadtführer →',
    hotelCta: 'Verfügbarkeit ansehen →',
    summerLabel: 'Sommerhöchstwert',
    practicalHeading: 'Festivalreisen mit Hund: praktische Infos',
    practical: [
      {
        h: 'Die Begleiter-Strategie',
        p: `Ein Mensch besucht die Vorstellung, der andere bleibt mit dem Hund im Park oder auf der Terrasse. Die meisten Festivalvorstellungen dauern 2 bis 4 Stunden, die ideale Dauer für ein Hundenickerchen im Hotel oder Stadtpark. Für Bayreuther Opern (5 Stunden) sollten Sie vorher einen längeren Spaziergang einplanen, damit der Hund entspannt ist, bevor Sie losgehen. Die Begleiter-Strategie funktioniert in allen 8 Städten dieses Ratgebers und verwandelt ein mögliches logistisches Kopfzerbrechen in ein angenehmes Parallelprogramm.`,
      },
      {
        h: 'Hotels während der Festivalsaison buchen',
        p: `Buchen Sie 3-6 Monate im Voraus für Bayreuth (ausverkauft bereits im Oktober für den folgenden Sommer), 8 Wochen im Voraus für Spoleto und Orange, 4 Wochen für Pärnu und Sopot. Festivalstädte verhängen während der Veranstaltungswoche stadtweite Höchstpreise. Für Bregenz und Colmar bieten die umliegenden Dörfer (Hard beziehungsweise Turckheim) ruhigere Alternativen zu niedrigeren Preisen bei 15-20 Minuten Fahrzeit zu den Veranstaltungsorten.`,
      },
      {
        h: 'Freiluftkonzerte der Festivals vs. Veranstaltungsorte mit Eintrittskarten',
        p: `Viele Festivals bieten kostenlose Freiluftkonzerte auf Stadtplätzen an, bei denen Hunde toleriert werden. Umbria Jazz (Perugia) hat kostenlose Bühnen auf der Piazza, die Bregenzer Seepromenade ist während der Aufführungen ein öffentlicher Raum, und die abendliche Atmosphäre der Petite Venise in Colmar trägt die Festivalstimmung in hundefreundliche Straßen. Prüfen Sie vor der Buchung das Freiluftprogramm jedes Festivals: Diese kostenlosen Veranstaltungen sind musikalisch oft ebenso befriedigend wie die kostenpflichtigen Hauptveranstaltungen.`,
      },
      {
        h: 'Hitzemanagement bei Sommerfestivals',
        p: `Südliche Festivals (Orange, Perugia, Spoleto) erreichen im Juli 28-30 °C. Besuchen Sie Abendvorstellungen, halten Sie Ihren Hund während der heißesten Nachmittagsstunden (14-18 Uhr) in einem klimatisierten Hotelzimmer und buchen Sie im Voraus ein Hotel mit Garten oder schattiger Terrasse. Der 7-Sekunden-Pfotentest gilt: Drücken Sie 7 Sekunden lang den Handrücken auf den Asphalt. Wenn Sie es nicht aushalten, kann Ihr Hund auch nicht darauf laufen. Baltische Städte (Pärnu, Sopot) bleiben unter 22 °C und haben keine Hitzeprobleme.`,
      },
    ],
    faqHeading: 'Häufig gestellte Fragen',
    faqs: [
      {
        q: 'Darf mein Hund Freiluftkonzerte bei diesen Festivals besuchen?',
        a: `Bei kostenlosen Freiluftkonzerten (Piazza-Bühnen von Umbria Jazz, Bregenzer Seepromenade) ja. Bei Konzerten mit Eintrittskarten nein. Die Begleiter-Strategie funktioniert: Eine Person besucht die Vorstellung, der Hund bleibt im Hotel oder Stadtpark. Die abendliche Kanalatmosphäre von Colmar und die Monte-Cassino-Promenade von Sopot sind öffentliche Räume, in denen ein gut erzogener angeleinter Hund während der Festivalsaison völlig normal ist.`,
      },
      {
        q: 'Welches dieser Festivals ist insgesamt am hundefreundlichsten?',
        a: `Pärnu und Sopot. Die baltische Kultur ist die hundetoleranteste Europas, das Freiluft-Festivalformat ist über die ganze Stadt verteilt, und die Temperaturen bleiben unter 22 °C, sodass der Hund den ganzen Tag über angenehm untergebracht ist. Bayreuth ist die zweitbeste Wahl für Hundebegleiter: der Eremitage-Park, die fränkische Biergartenkultur und die Wanderungen auf dem Hofgarten-Hügel machen die opernfreie Hälfte der Reise wirklich angenehm.`,
      },
      {
        q: 'Lohnt sich Bayreuth, wenn nur einer von uns Karten hat?',
        a: `Absolut. Der Eremitage-Park (ein vollständiger Barockpark mit Springbrunnen, Grotten und Außenwegen, die angeleinte Hunde zulassen), die fränkische Biergartenkultur der Stadt (die hundetoleranteste Deutschlands) und der freie Zugang zu den Hügelgärten des Festspielhauses machen Bayreuth für die opernfreie Hälfte der Reise wirklich interessant. Der Außengarten des Wagner-Museums und der Hofgarten liegen beide innerhalb von 10 Gehminuten von den meisten zentralen Hotels entfernt.`,
      },
      {
        q: 'Wie sieht es mit großen Hunden in Hotels der Festivalstädte aus?',
        a: `Festivalhotels sind tendenziell Boutique-Häuser und verhängen Gewichtsgrenzen (8-15 kg). Colmar, Sopot und Bregenz sind für größere Rassen am flexibelsten: Suchen Sie nach familiengeführten 3-Sterne-Häusern oder Aparthotels, die in der Regel keine Gewichtsbeschränkungen haben. In Bayreuth hat der Goldener Anker historisch gesehen große Hunde für Festivalgäste aufgenommen. Rufen Sie immer vorher an, um die aktuelle Richtlinie für das Gewicht und die Rasse Ihres Hundes zu bestätigen.`,
      },
    ],
    relatedHeading: 'Siehe auch',
  },
  nl: {
    eyebrow: `FESTIVALSEIZOEN 2026 · HUISDIERREIZEN EUROPA`,
    title: `Zomerfestivals in Europa met je hond: 8 festivalsteden met huisdiervriendelijke hotels (2026)`,
    intro: `De festivalzomer is het hoogtepunt van het Europese culturele leven in juli en augustus. Hondeneigenaren hebben festivalsteden van oudsher gemeden, in de veronderstelling dat hun hond zou worden uitgesloten. Deze gids legt uit hoe je het festival kunt bijwonen EN je hond gelukkig kunt houden: buitenconcerten, festivalsfeer in de parken, en steden die tot leven komen op een menselijk tempo waar honden echt van genieten.`,
    pickHeading: '8 festivalsteden waar honden meegenieten van het programma',
    whyHere: 'Waarom hier',
    hotelLabel: 'Waar je kunt overnachten',
    seeDestCta: 'Volledige stadsgids →',
    hotelCta: 'Bekijk beschikbaarheid →',
    summerLabel: 'Gem. max. zomer',
    practicalHeading: 'Reizen naar festivals met een hond: praktische info',
    practical: [
      {
        h: 'De metgezelstrategie',
        p: `Een mens woont de voorstelling bij, de ander blijft bij de hond in het park of op het terras. De meeste festivalvoorstellingen duren 2-4 uur, de ideale duur voor een hondendutje in een hotel of stadspark. Voor de opera's in Bayreuth (5 uur) plan je van tevoren een langere wandeling zodat je hond al ontspannen is voordat je vertrekt. De metgezelstrategie werkt in alle 8 steden uit deze gids en maakt van een mogelijke logistieke hoofdpijn een aangenaam parallel programma.`,
      },
      {
        h: 'Hotels boeken tijdens het festivalseizoen',
        p: `Boek 3-6 maanden vooruit voor Bayreuth (in oktober al uitverkocht voor de volgende zomer), 8 weken vooruit voor Spoleto en Orange, 4 weken voor Parnu en Sopot. Festivalsteden hanteren tijdens de evenementweek stadsbrede piekprijzen. Voor Bregenz en Colmar bieden de omliggende dorpen (respectievelijk Hard en Turckheim) rustigere alternatieven tegen lagere prijzen, op 15-20 minuten rijden van de locaties.`,
      },
      {
        h: 'Buitenconcerten van festivals versus locaties met toegangsbewijs',
        p: `Veel festivals hebben gratis buitenconcerten op stadspleinen waar honden worden getolereerd. Umbria Jazz (Perugia) heeft gratis podia op de piazza, de meerpromenade van Bregenz is tijdens de voorstellingen een openbare ruimte, en de avondsfeer van Petite Venise in Colmar verlengt de festivalstemming tot in hondvriendelijke straten. Controleer voor het boeken het buitenprogramma van elk festival: deze gratis evenementen zijn muzikaal vaak net zo bevredigend als de betaalde hoofdevenementen.`,
      },
      {
        h: 'Hittemanagement bij zomerfestivals',
        p: `Zuidelijke festivals (Orange, Perugia, Spoleto) bereiken in juli 28-30C. Woon avondvoorstellingen bij, houd je hond tijdens de heetste middaguren (14-18 uur) in een geairconditioneerde hotelkamer, en boek vooraf een hotel met tuin of schaduwrijk terras. De 7-secondentest geldt: druk de rug van je hand 7 seconden op het asfalt. Als jij het niet volhoudt, kan je hond er ook niet op lopen. Baltische steden (Parnu, Sopot) blijven onder 22C en hebben geen hitteproblemen.`,
      },
    ],
    faqHeading: 'Veelgestelde vragen',
    faqs: [
      {
        q: 'Mag mijn hond mee naar buitenconcerten bij deze festivals?',
        a: `Bij gratis buitenconcerten (piazzapodia van Umbria Jazz, meerpromenade van Bregenz) ja. Bij concerten met toegangsbewijs, nee. De metgezelstrategie werkt: een persoon woont de voorstelling bij, de hond blijft in het hotel of stadspark. De avondsfeer aan de kanalen van Colmar en de Monte Cassino-boulevard van Sopot zijn openbare ruimtes waar een goed opgevoede hond aan de lijn tijdens het festivalseizoen volledig normaal is.`,
      },
      {
        q: 'Welk van deze festivals is over het geheel genomen het meest hondvriendelijk?',
        a: `Parnu en Sopot. De Baltische cultuur is de meest hondvriendelijke van Europa, het buitenfestivalformat is verspreid over de hele stad, en de temperaturen blijven onder 22C zodat de hond de hele dag comfortabel zit. Bayreuth is de op een na beste keuze voor hondengezelschap: het Eremitage-park, de Frankische biergartencultuur en de wandelingen op de Hofgarten-heuvel maken het opera-vrije deel van de reis echt aangenaam.`,
      },
      {
        q: 'Is Bayreuth de moeite waard als slechts een van ons kaartjes heeft?',
        a: `Absoluut. Het Eremitage-park (een volwaardig barokpark met fonteinen, grotten en buitenpaden waar honden aan de lijn welkom zijn), de Frankische biergartencultuur van de stad (de meest hondvriendelijke van Duitsland), en de vrije toegang tot de heuveltuinen van het Festspielhaus maken Bayreuth echt interessant voor het opera-vrije deel van de reis. De buitentuin van het Wagner Museum en de Hofgarten liggen allebei binnen 10 minuten lopen van de meeste hotels in het centrum.`,
      },
      {
        q: 'Hoe zit het met grote honden in hotels in festivalsteden?',
        a: `Festivalhotels zijn vaak boetiekhotels met gewichtslimieten (8-15 kg). Colmar, Sopot en Bregenz zijn het flexibelst voor grote rassen: zoek naar familiebedrijven met 3 sterren of aparthotels, die doorgaans geen gewichtsbeperkingen hebben. In Bayreuth heeft de Goldener Anker van oudsher grote honden verwelkomd voor festivalgasten. Bel altijd vooraf om het actuele beleid te bevestigen voor het gewicht en ras van je hond.`,
      },
    ],
    relatedHeading: 'Zie ook',
  },
  it: {
    eyebrow: `STAGIONE DEI FESTIVAL 2026 · VIAGGI PET-FRIENDLY EUROPA`,
    title: `Festival estivi in Europa con il tuo cane: 8 città di festival con hotel pet-friendly (2026)`,
    intro: `L'estate dei festival è il culmine della vita culturale europea a luglio e agosto. I proprietari di cani hanno storicamente evitato le città di festival, pensando che il loro cane sarebbe stato escluso. Questa guida spiega come vivere il festival E tenere il tuo cane felice: concerti all'aperto, atmosfera di festival nei parchi, e città che si animano a un ritmo umano che i cani apprezzano davvero.`,
    pickHeading: '8 città di festival dove i cani si godono il programma insieme a te',
    whyHere: 'Perché qui',
    hotelLabel: 'Dove alloggiare',
    seeDestCta: 'Guida completa della città →',
    hotelCta: 'Vedi disponibilità →',
    summerLabel: 'Max estate',
    practicalHeading: 'Viaggiare ai festival con il cane: info pratiche',
    practical: [
      {
        h: 'La strategia del compagno',
        p: `Una persona assiste allo spettacolo, l'altra resta con il cane nel parco o al dehors. La maggior parte degli spettacoli dei festival dura 2-4 ore, la durata ideale per un pisolino del cane in hotel o in un parco cittadino. Per le opere di Bayreuth (5 ore), pianifica prima una passeggiata più lunga in modo che il cane sia tranquillo prima che tu vada via. La strategia del compagno funziona in tutte le 8 città di questa guida e trasforma un possibile grattacapo logistico in un piacevole programma parallelo.`,
      },
      {
        h: 'Prenotare gli hotel durante la stagione dei festival',
        p: `Prenota 3-6 mesi prima per Bayreuth (esaurito già a ottobre per l'estate successiva), 8 settimane prima per Spoleto e Orange, 4 settimane per Parnu e Sopot. Le città di festival applicano tariffe di picco su scala cittadina durante la settimana dell'evento. Per Bregenz e Colmar, i villaggi circostanti (rispettivamente Hard e Turckheim) offrono alternative più tranquille a prezzi inferiori con 15-20 minuti d'auto dalle sedi.`,
      },
      {
        h: `Concerti all'aperto dei festival vs sedi a pagamento`,
        p: `Molti festival hanno concerti gratuiti all'aperto nelle piazze cittadine dove i cani sono tollerati. Umbria Jazz (Perugia) ha palchi gratuiti in piazza, la passeggiata sul lago di Bregenz è uno spazio pubblico durante gli spettacoli, e l'atmosfera serale della Petite Venise di Colmar estende il clima da festival a strade accessibili ai cani. Controlla il programma all'aperto di ogni festival prima di prenotare: questi eventi gratuiti sono spesso musicalmente soddisfacenti quanto gli eventi principali a pagamento.`,
      },
      {
        h: 'Gestione del caldo ai festival estivi',
        p: `I festival del sud (Orange, Perugia, Spoleto) toccano i 28-30°C a luglio. Partecipa agli spettacoli serali, tieni il tuo cane in una camera d'hotel climatizzata durante le ore più calde del pomeriggio (14-18), e prenota in anticipo un hotel con giardino o terrazza ombreggiata. Vale il test dei 7 secondi: premi il dorso della mano sull'asfalto per 7 secondi. Se non riesci a resistere, nemmeno il tuo cane può camminarci. Le città baltiche (Parnu, Sopot) restano sotto i 22°C e non hanno problemi di gestione del caldo.`,
      },
    ],
    faqHeading: 'Domande frequenti',
    faqs: [
      {
        q: `Il mio cane può assistere ai concerti all'aperto di questi festival?`,
        a: `Ai concerti gratuiti all'aperto (palchi in piazza di Umbria Jazz, passeggiata sul lago di Bregenz) sì. Ai concerti in sedi a pagamento, no. La strategia del compagno funziona: una persona assiste, il cane resta in hotel o nel parco cittadino. L'atmosfera serale sui canali di Colmar e il viale Monte Cassino di Sopot sono spazi pubblici dove un cane educato al guinzaglio è del tutto normale durante la stagione dei festival.`,
      },
      {
        q: 'Quale di questi festival è complessivamente il più pet-friendly?',
        a: `Parnu e Sopot. La cultura baltica è la più tollerante verso i cani in Europa, il formato del festival all'aperto è decentralizzato in tutta la città, e le temperature restano sotto i 22°C così il cane è a suo agio tutto il giorno. Bayreuth è la seconda scelta migliore per chi viaggia con il cane: il parco Eremitage, la cultura dei biergarten della Franconia e le passeggiate sulla collina dell'Hofgarten rendono la metà non-opera del viaggio davvero piacevole.`,
      },
      {
        q: 'Vale la pena andare a Bayreuth se solo uno di noi due ha i biglietti?',
        a: `Assolutamente sì. Il parco Eremitage (un parco barocco completo di fontane, grotte e sentieri esterni che accettano cani al guinzaglio), la cultura dei biergarten della Franconia della città (la più tollerante verso i cani della Germania), e l'accesso gratuito ai giardini sulla collina del Festspielhaus rendono Bayreuth davvero interessante per la metà non-opera del viaggio. Il giardino esterno del Museo Richard Wagner e l'Hofgarten sono entrambi a meno di 10 minuti a piedi dalla maggior parte degli hotel centrali.`,
      },
      {
        q: 'E i cani di grossa taglia negli hotel delle città di festival?',
        a: `Gli hotel delle città di festival tendono a essere boutique e a imporre limiti di peso (8-15 kg). Colmar, Sopot e Bregenz sono i più flessibili per le razze grandi: cerca strutture familiari 3 stelle o aparthotel, che tipicamente non hanno restrizioni di peso. A Bayreuth, il Goldener Anker ha storicamente ospitato cani di grossa taglia per gli spettatori del festival. Chiama sempre in anticipo per confermare la politica attuale riguardo al peso e alla razza del tuo cane.`,
      },
    ],
    relatedHeading: 'Vedi anche',
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

  const pickWhy = (p: Pick) => {
    if (locale === 'fr') return p.whyFr
    if (locale === 'es') return p.whyEs
    if (locale === 'pt') return p.whyPt
    if (locale === 'de') return p.whyDe
    if (locale === 'nl') return p.whyNl ?? p.whyEn
    if (locale === 'it') return p.whyIt ?? p.whyEn
    return p.whyEn
  }
  const pickHotel = (p: Pick) => {
    if (locale === 'fr') return p.hotelFr
    if (locale === 'es') return p.hotelEs
    if (locale === 'pt') return p.hotelPt
    if (locale === 'de') return p.hotelDe
    if (locale === 'nl') return p.hotelNl ?? p.hotelEn
    if (locale === 'it') return p.hotelIt ?? p.hotelEn
    return p.hotelEn
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-violet-600 to-indigo-500 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 40%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-xs font-semibold uppercase tracking-widest text-purple-100 mb-3">🎭 {t.eyebrow}</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{t.title}</h1>
          <p className="text-lg sm:text-xl text-purple-50 leading-relaxed">{t.intro}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-8">{t.pickHeading}</h2>
        <div className="space-y-5">
          {PICKS.map((p, i) => (
            <article key={p.slug} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <header className="px-5 sm:px-7 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-stone-200 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-2xl font-black text-purple-700">#{i + 1}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  <Link href={`/${locale}${p.destPath}`} className="hover:text-purple-700">{p.name}</Link>
                </h3>
                <span className="text-sm text-stone-600">{p.country}</span>
                <span className="ml-auto bg-sky-100 text-sky-900 text-xs font-bold px-3 py-1 rounded-full">
                  {t.summerLabel} {p.summerTemp}
                </span>
                <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full">
                  🎭 {p.festivalNote}
                </span>
              </header>
              <div className="px-5 sm:px-7 py-5 space-y-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">{t.whyHere}</div>
                  <p className="text-stone-800 leading-relaxed">{pickWhy(p)}</p>
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
                    href={buildAllezDestLink(p.name, p.country, `${CAMPAIGN_BASE}-${p.slug}`, 5)}
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
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">🎶 {t.practicalHeading}</h2>
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
        href={buildAllezDestLink('Europe', 'Europe', `${CAMPAIGN_BASE}-sticky`, 5)}
      />
    </main>
  )
}
