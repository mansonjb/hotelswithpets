import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'cool-portugal-dog-summer'
const CAMPAIGN_BASE = 'portugal-cool'

const STICKY_LABELS: Record<string, { label: string; cta: string }> = {
  en: { label: 'Cool Portugal pet-friendly hotels', cta: 'See hotels' },
  fr: { label: 'Hotels pet-friendly frais au Portugal', cta: 'Voir les hotels' },
  es: { label: 'Hoteles pet-friendly frescos en Portugal', cta: 'Ver hoteles' },
  pt: { label: 'Hoteis pet-friendly frescos em Portugal', cta: 'Ver hoteis' },
  de: { label: 'Kühles Portugal, haustierfreundliche Hotels', cta: 'Hotels ansehen' },
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
    en: `Cool Portugal with Your Dog in Summer: 8 Destinations Under 25C (2026)`,
    fr: `Portugal frais avec son chien en ete : 8 destinations a moins de 25C (2026)`,
    es: `Portugal fresco con tu perro en verano: 8 destinos a menos de 25C (2026)`,
    pt: `Portugal fresco com o seu cao no verao: 8 destinos a menos de 25C (2026)`,
    de: `Kühles Portugal mit Hund im Sommer: 8 Reiseziele unter 25C (2026)`,
  }
  const descriptions: Record<string, string> = {
    en: `Eight Portuguese destinations where August temperatures stay under 25C: Serra da Estrela, Viana do Castelo, Peniche and others. The Algarve hits 35C but the north and Atlantic coast stay genuinely cool. Verified pet-friendly hotels for each pick.`,
    fr: `Huit destinations portugaises ou la temperature d'aout reste sous 25C : Serra da Estrela, Viana do Castelo, Peniche et d'autres. L'Algarve depasse les 35C mais le nord et la cote atlantique restent vraiment frais. Hotels pet-friendly verifies pour chaque pick.`,
    es: `Ocho destinos portugueses donde la temperatura de agosto se mantiene bajo 25C: Serra da Estrela, Viana do Castelo, Peniche y otros. El Algarve supera los 35C pero el norte y la costa atlantica se mantienen frescos. Hoteles pet-friendly verificados para cada eleccion.`,
    pt: `Oito destinos portugueses onde a temperatura de agosto fica abaixo de 25C: Serra da Estrela, Viana do Castelo, Peniche e outros. O Algarve passa dos 35C mas o norte e a costa atlantica ficam genuinamente frescos. Hoteis pet-friendly verificados para cada escolha.`,
    de: `Acht portugiesische Reiseziele, an denen die Augusttemperaturen unter 25C bleiben: Serra da Estrela, Viana do Castelo, Peniche und weitere. Die Algarve erreicht 35C, aber der Norden und die Atlantikküste bleiben wirklich kühl. Geprüfte haustierfreundliche Hotels für jeden Favoriten.`,
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
  augustTemp: string
  whyEn: string
  whyFr: string
  whyEs: string
  whyPt: string
  whyDe: string
  hotelName: string
  hotelEn: string
  hotelFr: string
  hotelEs: string
  hotelPt: string
  hotelDe: string
}

const PICKS: Pick[] = [
  {
    slug: 'serra-da-estrela',
    name: 'Serra da Estrela',
    country: 'Portugal',
    destPath: '/destinations/serra-da-estrela',
    augustTemp: '18C',
    whyEn: `Portugal's highest mountain range, with a summit at 1993m via the Torre road accessible by car with your dog. The Cao de Serra da Estrela breed originates here, so the region is deeply dog-friendly in culture: local quintas universally welcome dogs without extra charge. Designated off-leash meadows exist around the Torre summit area. This is the single coolest destination in mainland Portugal in August, genuinely suitable for brachycephalic breeds that struggle anywhere else in the country.`,
    whyFr: `Le massif le plus haut du Portugal, avec un sommet a 1993m accessible en voiture via la route de la Torre avec votre chien. La race Cao de Serra da Estrela est originaire de la region, donc la culture locale est profondement canine : les quintas acceptent universellement les chiens sans supplement. Des zones off-leash designees existent autour du sommet de la Torre. C'est la destination la plus fraiche de tout le Portugal continental en aout, veritablement adaptee aux races brachycephales qui souffrent partout ailleurs dans le pays.`,
    whyEs: `La sierra mas alta de Portugal, con una cumbre a 1993m accesible en coche por la carretera de la Torre con tu perro. La raza Cao de Serra da Estrela es originaria de la region, por lo que la cultura local es profundamente canina: las quintas universalmente aceptan perros sin cargo extra. Existen zonas off-leash designadas alrededor de la cumbre de la Torre. Es el destino mas fresco de todo Portugal continental en agosto, verdaderamente apto para razas braquicefalas que sufren en cualquier otro lugar del pais.`,
    whyPt: `O macico montanhoso mais alto de Portugal, com um cume a 1993m acessivel de carro pela estrada da Torre com o seu cao. A raca Cao da Serra da Estrela e originaria da regiao, pelo que a cultura local e profundamente canina: as quintas aceitam universalmente caes sem suplemento. Existem zonas off-leash designadas em torno do cume da Torre. E o destino mais fresco de todo o Portugal continental em agosto, verdadeiramente adequado para racas braquicefalicas que sofrem em qualquer outro local do pais.`,
    whyDe: `Portugals höchstes Gebirge, mit einem Gipfel auf 1993m, den Sie mit dem Auto über die Torre-Straße auch mit Ihrem Hund erreichen. Die Rasse Cão da Serra da Estrela stammt aus dieser Gegend, weshalb die örtliche Kultur zutiefst hundefreundlich geprägt ist: Die Quintas heißen Hunde ausnahmslos ohne Aufpreis willkommen. Rund um den Gipfelbereich der Torre gibt es ausgewiesene Bereiche ohne Leine. Dies ist das kühlste Reiseziel im gesamten portugiesischen Festland im August, wirklich geeignet auch für kurznasige Rassen, die überall sonst im Land leiden würden.`,
    hotelName: 'Hotel Serra da Estrela',
    hotelEn: `Hotel Serra da Estrela in Manteigas is a mountain lodge that explicitly welcomes dogs. Set in the valley at 760m altitude, temperatures stay around 18-20C even in mid-August. The hotel provides bowl and bedding on request, and the surrounding trails are walkable with leashed dogs directly from the property.`,
    hotelFr: `Hotel Serra da Estrela a Manteigas est un lodge de montagne qui accueille explicitement les chiens. Situe dans la vallee a 760m d'altitude, les temperatures restent autour de 18-20C meme mi-aout. L'hotel fournit gamelle et couchage sur demande, et les sentiers environnants se font en laisse directement depuis la propriete.`,
    hotelEs: `Hotel Serra da Estrela en Manteigas es un lodge de montana que acoge explicitamente a los perros. Situado en el valle a 760m de altitud, las temperaturas se mantienen en torno a 18-20C incluso a mediados de agosto. El hotel proporciona cuenco y cama a peticion, y los senderos cercanos son transitables con perro con correa directamente desde la propiedad.`,
    hotelPt: `Hotel Serra da Estrela em Manteigas e um lodge de montanha que acolhe explicitamente caes. Situado no vale a 760m de altitude, as temperaturas ficam em torno dos 18-20C mesmo em meados de agosto. O hotel fornece tigela e cama a pedido, e os trilhos circundantes sao percorriveis com cao a trela diretamente da propriedade.`,
    hotelDe: `Das Hotel Serra da Estrela in Manteigas ist eine Bergherberge, die Hunde ausdrücklich willkommen heißt. Im Tal auf 760m Höhe gelegen, bleiben die Temperaturen selbst Mitte August bei rund 18-20C. Das Hotel stellt auf Wunsch Napf und Liegeplatz zur Verfügung, und die umliegenden Wanderwege lassen sich mit angeleintem Hund direkt vom Hotel aus erkunden.`,
  },
  {
    slug: 'viana-do-castelo',
    name: 'Viana do Castelo',
    country: 'Portugal',
    destPath: '/destinations/viana-do-castelo',
    augustTemp: '22C',
    whyEn: `Minho coast at the mouth of the Lima river, kept under 23C all August by the Atlantic Nortada wind. The Santa Luzia basilica hill is walkable with a leashed dog, and the funicular accepts dogs. Afife beach north of town has a designated dog-accessible section that remains open in August when most Portuguese beaches enforce no-dog rules. The historic centre terraces are genuinely tolerant of well-behaved dogs, and the Lima riverside promenade is flat and shaded by plane trees.`,
    whyFr: `La cote du Minho a l'embouchure du Lima, maintenue sous 23C tout aout par le vent Nortada atlantique. La colline de la basilique Santa Luzia se fait en laisse (le funiculaire accepte aussi les chiens). La plage d'Afife au nord de la ville a une section designee pour les chiens ouverte en aout quand la plupart des plages portugaises interdisent les chiens. Les terrasses du centre historique sont genuinement tolerantes avec les chiens bien tenus, et la promenade fluviale du Lima est plate et ombragee par des platanes.`,
    whyEs: `La costa del Minho en la desembocadura del Lima, mantenida bajo 23C todo agosto por el viento atlantico Nortada. La colina de la basilica de Santa Luzia se puede recorrer con correa (el funicular tambien admite perros). La playa de Afife al norte de la ciudad tiene una seccion designada para perros abierta en agosto, cuando la mayoria de playas portuguesas prohiben los perros. Las terrazas del centro historico son genuinamente tolerantes con perros bien portados, y el paseo fluvial del Lima es llano y sombreado por platanos.`,
    whyPt: `A costa do Minho na foz do Lima, mantida abaixo dos 23C durante todo agosto pelo vento atlantico Nortada. A colina da basilica de Santa Luzia e percorrivel com cao a trela (o funicular tambem aceita caes). A praia de Afife a norte da cidade tem uma seccao designada para caes aberta em agosto, quando a maioria das praias portuguesas proibe caes. As esplanadas do centro historico sao genuinamente tolerantes com caes bem comportados, e o passeio ribeirinho do Lima e plano e sombreado por platanoscos.`,
    whyDe: `Die Minho-Küste an der Mündung des Lima, dank des atlantischen Nortada-Windes den ganzen August über unter 23C gehalten. Den Hügel mit der Basilika Santa Luzia können Sie mit angeleintem Hund erwandern, auch die Standseilbahn nimmt Hunde mit. Der Strand von Afife nördlich der Stadt hat einen ausgewiesenen Hundebereich, der im August geöffnet bleibt, während die meisten portugiesischen Strände Hunde verbieten. Die Terrassen der Altstadt sind gegenüber wohlerzogenen Hunden wirklich tolerant, und die Uferpromenade am Lima ist flach und von Platanen beschattet.`,
    hotelName: 'Pousada de Viana do Castelo',
    hotelEn: `Pousada de Viana do Castelo is a 4-star hilltop pousada next to the Santa Luzia basilica, pets welcome at a modest fee. The elevated position means it sits in the Nortada wind path, keeping the terrace genuinely fresh even at midday. Views over the Lima estuary, and your dog can walk from the hotel garden directly to the basilica trail.`,
    hotelFr: `La Pousada de Viana do Castelo est une pousada 4 etoiles perchee sur la colline a cote de la basilique Santa Luzia, animaux acceptes contre un supplement modeste. La position elevee signifie qu'elle est dans le couloir du vent Nortada, maintenant la terrasse genuinement fraiche meme a midi. Vue sur l'estuaire du Lima, et votre chien peut marcher depuis le jardin de l'hotel directement sur le sentier de la basilique.`,
    hotelEs: `La Pousada de Viana do Castelo es una pousada de 4 estrellas en la cima de la colina junto a la basilica de Santa Luzia, mascotas admitidas por una modesta tarifa. La posicion elevada significa que se encuentra en el camino del viento Nortada, manteniendo la terraza genuinamente fresca incluso al mediodia. Vistas sobre el estuario del Lima, y tu perro puede caminar desde el jardin del hotel directamente al sendero de la basilica.`,
    hotelPt: `A Pousada de Viana do Castelo e uma pousada de 4 estrelas no topo da colina junto a basilica de Santa Luzia, animais aceites mediante uma taxa modesta. A posicao elevada significa que fica no corredor do vento Nortada, mantendo a esplanada genuinamente fresca mesmo ao meio-dia. Vistas sobre o estuario do Lima, e o seu cao pode caminhar desde o jardim do hotel diretamente para o trilho da basilica.`,
    hotelDe: `Die Pousada de Viana do Castelo ist eine 4-Sterne-Pousada auf dem Hügel neben der Basilika Santa Luzia, Haustiere gegen eine moderate Gebühr willkommen. Die erhöhte Lage bedeutet, dass sie im Windkorridor des Nortada liegt, wodurch die Terrasse selbst mittags wirklich frisch bleibt. Ausblick über die Lima-Mündung, und Ihr Hund kann direkt vom Hotelgarten aus zum Wanderweg der Basilika gehen.`,
  },
  {
    slug: 'peniche',
    name: 'Peniche',
    country: 'Portugal',
    destPath: '/destinations/peniche',
    augustTemp: '22C',
    whyEn: `Atlantic peninsula kept under 23C by constant ocean wind from both sides. The Cabo Carvoeiro lighthouse walk is one of the best cliff-edge coastal paths in Portugal for dogs: exposed, windy, and spectacularly cool even in August. Baleal beach north of town has no seasonal dog ban. The surfing village culture is universally pet-tolerant at cafes, board shops, and terraces. The ferry to Berlenga island does not allow dogs, but the island is visible from the lighthouse walk.`,
    whyFr: `Peninsule atlantique maintenue sous 23C par le vent ocean constant des deux cotes. La promenade du phare de Cabo Carvoeiro est l'un des meilleurs sentiers cotiers au bord des falaises du Portugal pour les chiens : expose, venteux et spectaculairement frais meme en aout. La plage de Baleal au nord n'a pas d'interdiction saisonniere pour les chiens. La culture du village de surf est universellement tolerante aux animaux dans les cafes, les magasins de planches et les terrasses.`,
    whyEs: `Peninsula atlantica mantenida bajo 23C por el constante viento oceanico de ambos lados. El paseo del faro Cabo Carvoeiro es uno de los mejores senderos costeros en borde de acantilado de Portugal para perros: expuesto, ventoso y espectacularmente fresco incluso en agosto. La playa de Baleal al norte no tiene prohibicion estacional para perros. La cultura del pueblo surfero es universalmente tolerante con las mascotas en cafes, tiendas de tablas y terrazas.`,
    whyPt: `Peninsula atlantica mantida abaixo dos 23C pelo constante vento oceanico dos dois lados. O passeio do farol do Cabo Carvoeiro e um dos melhores trilhos costeiros a beira-mar de Portugal para caes: exposto, ventoso e espetacularmente fresco mesmo em agosto. A praia de Baleal a norte nao tem proibicao sazonal para caes. A cultura da aldeia de surf e universalmente tolerante com animais em cafes, lojas de pranchas e esplanadas.`,
    whyDe: `Atlantische Halbinsel, durch den ständigen Ozeanwind von beiden Seiten unter 23C gehalten. Der Spaziergang zum Leuchtturm Cabo Carvoeiro zählt zu den besten Küstenwegen Portugals für Hunde direkt an der Klippenkante: exponiert, windig und selbst im August spektakulär kühl. Der Strand von Baleal nördlich der Stadt hat kein saisonales Hundeverbot. Die Surferdorf-Kultur ist gegenüber Haustieren in Cafés, Surfshops und auf Terrassen durchweg tolerant. Die Fähre zur Insel Berlenga nimmt keine Hunde mit, doch die Insel ist vom Leuchtturmweg aus sichtbar.`,
    hotelName: 'Hotel Praia Norte',
    hotelEn: `Hotel Praia Norte is a seaside 3-star property with dogs welcome at a modest fee. Direct access to the beach, the hotel sits on the north-facing side of the peninsula that catches the most Atlantic breeze. Simple, practical, and genuinely set up for active holidaymakers who arrive with dogs.`,
    hotelFr: `Hotel Praia Norte est un etablissement 3 etoiles en bord de mer avec les chiens bienvenus contre un supplement modeste. Acces direct a la plage, l'hotel est situe sur le cote nord de la peninsule qui capte le plus de brise atlantique. Simple, pratique et genuinement configure pour les vacanciers actifs qui arrivent avec des chiens.`,
    hotelEs: `Hotel Praia Norte es un establecimiento de 3 estrellas frente al mar con perros bienvenidos por una modesta tarifa. Acceso directo a la playa, el hotel esta en el lado norte de la peninsula que mas brisa atlantica capta. Simple, practico y genuinamente pensado para los vacacionistas activos que llegan con perros.`,
    hotelPt: `Hotel Praia Norte e um estabelecimento de 3 estrelas a beira-mar com caes aceites mediante uma taxa modesta. Acesso direto a praia, o hotel fica no lado norte da peninsula que capta mais brisa atlantica. Simples, pratico e genuinamente preparado para ferias activas com caes.`,
    hotelDe: `Das Hotel Praia Norte ist ein 3-Sterne-Haus direkt am Meer, Hunde gegen eine moderate Gebühr willkommen. Direkter Strandzugang, das Hotel liegt auf der nach Norden ausgerichteten Seite der Halbinsel, die die meiste Atlantikbrise abbekommt. Schlicht, praktisch und wirklich auf aktive Urlauber ausgerichtet, die mit Hund anreisen.`,
  },
  {
    slug: 'ponte-de-lima',
    name: 'Ponte de Lima',
    country: 'Portugal',
    destPath: '/destinations/ponte-de-lima',
    augustTemp: '23C',
    whyEn: `The oldest municipality in Portugal, with a Roman bridge over the Lima river that you can cross with your dog on a leash. The vinho verde wine country means abundant shade from vineyards along river walks. Parque do Arnado is a riverside off-leash area in the town centre. Rural quintas in the TER (Turismo em Espaco Rural) network all welcome dogs free of charge, often with private gardens. Temperatures are moderated by valley microclimate and morning river mist.`,
    whyFr: `La plus ancienne commune du Portugal, avec un pont romain sur le Lima que vous traversez avec votre chien en laisse. Le pays du vinho verde signifie une abondante ombre de vignes le long des promenades en bord de riviere. Le Parque do Arnado est une zone sans laisse en bord de riviere dans le centre-ville. Les quintas rurales du reseau TER (Turismo em Espaco Rural) accueillent toutes les chiens gratuitement, souvent avec des jardins prives. Les temperatures sont moderees par le microclimat de la vallee et la brume matinale de la riviere.`,
    whyEs: `El municipio mas antiguo de Portugal, con un puente romano sobre el Lima que puedes cruzar con tu perro con correa. El pais del vinho verde significa abundante sombra de vinedos a lo largo de los paseos a orillas del rio. El Parque do Arnado es una zona sin correa a orillas del rio en el centro de la ciudad. Las quintas rurales de la red TER (Turismo em Espaco Rural) acogen perros gratis, a menudo con jardines privados. Las temperaturas estan moderadas por el microclima del valle y la niebla matinal del rio.`,
    whyPt: `O municipio mais antigo de Portugal, com uma ponte romana sobre o Lima que atravessa com o seu cao a trela. O pais do vinho verde significa abundante sombra de vinhas ao longo dos passeios ribeirinhos. O Parque do Arnado e uma zona sem trela a beira-rio no centro da cidade. As quintas rurais da rede TER (Turismo em Espaco Rural) aceitam todos caes gratuitamente, frequentemente com jardins privados. As temperaturas sao moderadas pelo microclima do vale e pela nebrina matinal do rio.`,
    whyDe: `Die älteste Gemeinde Portugals, mit einer römischen Brücke über den Lima, die Sie mit angeleintem Hund überqueren können. Das Vinho-Verde-Weinland bedeutet reichlich Schatten von Weinbergen entlang der Flusswege. Der Parque do Arnado ist ein Bereich ohne Leine direkt am Fluss im Stadtzentrum. Die ländlichen Quintas im TER-Netzwerk (Turismo em Espaço Rural) heißen Hunde durchweg kostenlos willkommen, oft mit privaten Gärten. Die Temperaturen werden durch das Talmikroklima und den morgendlichen Flussnebel gemildert.`,
    hotelName: 'Solar do Bertiandos',
    hotelEn: `Solar do Bertiandos is a rural manor house with extensive gardens where dogs are freely welcome at no extra charge. The property is set in the Lima valley with direct access to river walks. A working quinta in the vinho verde zone: the cool evening air comes off the river and vineyards, making even the warmest August nights comfortable.`,
    hotelFr: `Solar do Bertiandos est un manoir rural avec de vastes jardins ou les chiens sont librement bienvenus sans supplement. La propriete est situee dans la vallee du Lima avec acces direct aux promenades en bord de riviere. Une quinta en activite dans la zone du vinho verde : l'air frais du soir vient de la riviere et des vignes, rendant meme les nuits les plus chaudes d'aout confortables.`,
    hotelEs: `Solar do Bertiandos es una casa solariega rural con amplios jardines donde los perros son libremente bienvenidos sin cargo extra. La propiedad esta situada en el valle del Lima con acceso directo a los paseos junto al rio. Una quinta en funcionamiento en la zona del vinho verde: el aire fresco de la tarde llega del rio y los vinedos, haciendo confortables incluso las noches mas calurosas de agosto.`,
    hotelPt: `Solar do Bertiandos e uma casa solarenga rural com extensos jardins onde os caes sao livremente aceites sem suplemento. A propriedade fica no vale do Lima com acesso direto aos passeios ribeirinhos. Uma quinta em funcionamento na zona do vinho verde: o ar fresco da tarde vem do rio e das vinhas, tornando confortaveis mesmo as noites mais quentes de agosto.`,
    hotelDe: `Solar do Bertiandos ist ein ländliches Herrenhaus mit weitläufigen Gärten, in denen Hunde ohne Aufpreis frei willkommen sind. Das Anwesen liegt im Lima-Tal mit direktem Zugang zu Flussspaziergängen. Eine aktive Quinta in der Vinho-Verde-Zone: Die kühle Abendluft kommt vom Fluss und den Weinbergen und macht selbst die wärmsten Augustnächte angenehm.`,
  },
  {
    slug: 'aveiro',
    name: 'Aveiro',
    country: 'Portugal',
    destPath: '/destinations/aveiro',
    augustTemp: '24C',
    whyEn: `The Portuguese Venice, with flat canal towpaths that make for easy dog walking in any weather. Moliceiro boat tours do not allow dogs, but the canal network has several kilometres of shaded towpaths at water level that stay noticeably cooler than street level. Costa Nova beach 10km west has a dog-accessible section outside the main bathing zone. University city culture is very dog-tolerant at cafe terraces throughout the year.`,
    whyFr: `La Venise portugaise, avec des chemins de halage plats qui facilitent les promenades avec un chien par tous les temps. Les tours en moliceiro n'acceptent pas les chiens, mais le reseau de canaux a plusieurs kilometres de chemins de halage ombrages au niveau de l'eau qui restent sensiblement plus frais que le niveau de la rue. La plage de Costa Nova a 10km a l'ouest a une section accessible aux chiens hors de la zone de baignade principale. La culture de la ville universitaire est tres tolerante aux chiens dans les terrasses de cafes toute l'annee.`,
    whyEs: `La Venecia portuguesa, con caminos de sirga llanos que facilitan los paseos con perro en cualquier tiempo. Los tours en moliceiro no admiten perros, pero la red de canales tiene varios kilometros de caminos de sirga sombreados a nivel del agua que permanecen notablemente mas frescos que el nivel de la calle. La playa de Costa Nova a 10km al oeste tiene una seccion accesible para perros fuera de la zona de bano principal. La cultura de la ciudad universitaria es muy tolerante con los perros en las terrazas de cafes durante todo el ano.`,
    whyPt: `A Veneza portuguesa, com caminhos de sirga planos que facilitam os passeios com cao em qualquer tempo. Os passeios de moliceiro nao aceitam caes, mas a rede de canais tem varios quilometros de caminhos de sirga sombreados ao nivel da agua que ficam visivelmente mais frescos do que ao nivel da rua. A praia de Costa Nova a 10km a oeste tem uma seccao acessivel a caes fora da zona de banho principal. A cultura da cidade universitaria e muito tolerante com caes nas esplanadas de cafes durante todo o ano.`,
    whyDe: `Das portugiesische Venedig, mit flachen Treidelpfaden, die Hundespaziergänge bei jedem Wetter leicht machen. Moliceiro-Bootstouren nehmen keine Hunde mit, aber das Kanalnetz bietet mehrere Kilometer beschatteter Treidelpfade auf Wasserniveau, die spürbar kühler bleiben als das Straßenniveau. Der Strand von Costa Nova, 10km westlich, hat einen für Hunde zugänglichen Bereich außerhalb der Hauptbadezone. Die Universitätsstadtkultur ist an den Cafeterrassen das ganze Jahr über sehr hundetolerant.`,
    hotelName: 'Aveiro Palace Hotel',
    hotelEn: `Aveiro Palace Hotel is a 4-star central property with pets welcome. The hotel is a 5-minute walk to the main canal, and the flat canal-level walks are directly accessible. A reliable base for exploring both the city canals and the Costa Nova coastline for your dog's beach time.`,
    hotelFr: `Aveiro Palace Hotel est un etablissement central 4 etoiles avec animaux acceptes. L'hotel est a 5 minutes a pied du canal principal, et les promenades au niveau du canal sont directement accessibles. Une base fiable pour explorer a la fois les canaux de la ville et le littoral de Costa Nova pour la plage de votre chien.`,
    hotelEs: `Aveiro Palace Hotel es un establecimiento central de 4 estrellas con mascotas admitidas. El hotel esta a 5 minutos andando del canal principal, y los paseos al nivel del canal son directamente accesibles. Una base fiable para explorar tanto los canales de la ciudad como el litoral de Costa Nova para la playa de tu perro.`,
    hotelPt: `Aveiro Palace Hotel e um estabelecimento central de 4 estrelas com animais aceites. O hotel fica a 5 minutos a pe do canal principal, e os passeios ao nivel do canal sao diretamente acessiveis. Uma base fiavel para explorar tanto os canais da cidade como o litoral de Costa Nova para a praia do seu cao.`,
    hotelDe: `Das Aveiro Palace Hotel ist ein zentral gelegenes 4-Sterne-Haus, in dem Haustiere willkommen sind. Das Hotel liegt 5 Gehminuten vom Hauptkanal entfernt, und die flachen Wege auf Kanalniveau sind direkt zugänglich. Eine zuverlässige Basis, um sowohl die Kanäle der Stadt als auch die Küste von Costa Nova für den Strandtag Ihres Hundes zu erkunden.`,
  },
  {
    slug: 'guimaraes',
    name: 'Guimaraes',
    country: 'Portugal',
    destPath: '/destinations/guimaraes',
    augustTemp: '24C',
    whyEn: `UNESCO World Heritage birthplace of Portugal. The castle hill walk accepts leashed dogs and gives views over the entire Minho region. The Couros cultural quarter has several terrace cafes that allow dogs outside. Parque da Cidade at the southern edge has large dog-friendly meadows with plenty of shade. The medieval centre streets are narrow and stone-paved, staying noticeably cooler than open plazas, and afternoon cloud cover from Atlantic air keeps August temperatures reasonable.`,
    whyFr: `Berceau du Portugal au patrimoine mondial de l'UNESCO. La promenade de la colline du chateau accepte les chiens en laisse et offre une vue sur toute la region du Minho. Le quartier culturel de Couros a plusieurs terrasses de cafes qui autorisent les chiens. Le Parque da Cidade au bord sud dispose de grandes prairies conviviales pour les chiens avec beaucoup d'ombre. Les rues etroites du centre medieval, pavees de pierres, restent sensiblement plus fraiches que les places ouvertes.`,
    whyEs: `Cuna de Portugal como Patrimonio Mundial de la UNESCO. El paseo por la colina del castillo acepta perros con correa y ofrece vistas sobre toda la region del Minho. El barrio cultural de Couros tiene varias terrazas de cafes que permiten perros fuera. El Parque da Cidade en el borde sur tiene grandes prados aptos para perros con mucha sombra. Las estrechas calles del centro medieval, pavimentadas con piedra, permanecen notablemente mas frescas que las plazas abiertas.`,
    whyPt: `Bercario de Portugal classificado como Património Mundial da UNESCO. O percurso da colina do castelo aceita caes a trela e oferece vistas sobre toda a regiao do Minho. O bairro cultural de Couros tem varias esplanadas de cafes que permitem caes no exterior. O Parque da Cidade na extremidade sul tem grandes pradarias amigas dos caes com muita sombra. As ruas estreitas e calcadas do centro medieval ficam visivelmente mais frescas do que as pracas abertas.`,
    whyDe: `Als UNESCO-Weltkulturerbe geltende Wiege Portugals. Der Weg auf den Burghügel akzeptiert angeleinte Hunde und bietet Ausblicke über die gesamte Minho-Region. Das Kulturviertel Couros verfügt über mehrere Cafeterrassen, die Hunde im Freien zulassen. Der Parque da Cidade am südlichen Stadtrand hat große hundefreundliche Wiesen mit viel Schatten. Die engen, gepflasterten Gassen der mittelalterlichen Altstadt bleiben spürbar kühler als die offenen Plätze, und nachmittägliche Wolkendecken vom Atlantik halten die Augusttemperaturen erträglich.`,
    hotelName: 'Pousada de Guimaraes',
    hotelEn: `Pousada de Guimaraes is a 5-star pousada inside the converted Santa Marinha convent, one of the most historically significant hotels in Portugal. Dogs accepted on request: call ahead to confirm as the policy requires pre-authorisation. The cloister garden is a calm space for a dog to settle after a day on the castle trails.`,
    hotelFr: `La Pousada de Guimaraes est une pousada 5 etoiles dans le couvent converti de Santa Marinha, l'un des hotels les plus historiquement significatifs du Portugal. Chiens acceptes sur demande : appelez a l'avance pour confirmer car la politique necessite une pre-autorisation. Le jardin du cloitre est un espace calme pour qu'un chien se detende apres une journee sur les sentiers du chateau.`,
    hotelEs: `La Pousada de Guimaraes es una pousada de 5 estrellas dentro del convento convertido de Santa Marinha, uno de los hoteles historicamente mas significativos de Portugal. Perros admitidos a peticion: llama con antelacion para confirmar ya que la politica requiere preautorizacion. El jardin del claustro es un espacio tranquilo para que un perro se recupere tras un dia en los senderos del castillo.`,
    hotelPt: `A Pousada de Guimaraes e uma pousada de 5 estrelas dentro do convento convertido de Santa Marinha, um dos hoteis historicamente mais significativos de Portugal. Caes aceites a pedido: ligue antecipadamente para confirmar pois a politica requer pre-autorizacao. O jardim do claustro e um espaco calmo para um cao descansar apos um dia nos trilhos do castelo.`,
    hotelDe: `Die Pousada de Guimarães ist eine 5-Sterne-Pousada im umgebauten Kloster Santa Marinha, eines der historisch bedeutsamsten Hotels Portugals. Hunde werden auf Anfrage akzeptiert: Rufen Sie vorab an, da die Richtlinie eine Vorabgenehmigung erfordert. Der Kreuzgangsgarten ist ein ruhiger Ort, an dem sich ein Hund nach einem Tag auf den Burgwegen erholen kann.`,
  },
  {
    slug: 'porto',
    name: 'Porto',
    country: 'Portugal',
    destPath: '/destinations/porto',
    augustTemp: '24C',
    whyEn: `The Nortada wind is strongest in Porto in August, reliably dropping afternoon temperatures 5-8C below what the thermometer suggests. Parque da Cidade is 83 hectares with a dedicated off-leash zone, making it one of Europe's largest urban parks for dogs. Matosinhos beach north of the city has a dog-accessible section that remains open in August. Ribeira terrace restaurants are flexible with well-behaved leashed dogs, and the wine cave visits in Vila Nova de Gaia accept dogs in the outdoor areas of Quinta do Crasto and Quinta de la Rosa.`,
    whyFr: `Le vent Nortada est le plus fort a Porto en aout, faisant baisser de facon fiable les temperatures de l'apres-midi de 5-8C en dessous de ce que montre le thermometre. Le Parque da Cidade fait 83 hectares avec une zone sans laisse dediee, ce qui en fait l'un des plus grands parcs urbains d'Europe pour les chiens. La plage de Matosinhos au nord de la ville a une section accessible aux chiens ouverte en aout. Les restaurants avec terrasses de la Ribeira sont flexibles avec les chiens bien tenus en laisse, et les visites de caves a vin a Vila Nova de Gaia acceptent les chiens dans les zones exterieures de la Quinta do Crasto et de la Quinta de la Rosa.`,
    whyEs: `El viento Nortada es mas fuerte en Porto en agosto, reduciendo de manera fiable las temperaturas de la tarde 5-8C por debajo de lo que indica el termometro. El Parque da Cidade tiene 83 hectareas con una zona off-leash dedicada, convirtiendola en uno de los parques urbanos mas grandes de Europa para perros. La playa de Matosinhos al norte de la ciudad tiene una seccion accesible para perros abierta en agosto. Los restaurantes con terraza de la Ribeira son flexibles con los perros bien portados con correa, y las visitas a las bodegas en Vila Nova de Gaia admiten perros en las areas exteriores de la Quinta do Crasto y la Quinta de la Rosa.`,
    whyPt: `O vento Nortada e mais forte no Porto em agosto, baixando confiavelmente as temperaturas da tarde 5-8C abaixo do que o termometro indica. O Parque da Cidade tem 83 hectares com uma zona sem trela dedicada, tornando-o um dos maiores parques urbanos da Europa para caes. A praia de Matosinhos a norte da cidade tem uma seccao acessivel a caes aberta em agosto. Os restaurantes com esplanada da Ribeira sao flexiveis com caes bem comportados a trela, e as visitas as caves de vinho em Vila Nova de Gaia aceitam caes nas areas exteriores da Quinta do Crasto e da Quinta de la Rosa.`,
    whyDe: `Der Nortada-Wind ist im August in Porto am stärksten und senkt die Nachmittagstemperaturen zuverlässig um 5-8C unter das, was das Thermometer anzeigt. Der Parque da Cidade umfasst 83 Hektar mit einem eigenen Bereich ohne Leine und gehört damit zu Europas größten Stadtparks für Hunde. Der Strand von Matosinhos nördlich der Stadt hat einen im August geöffneten, für Hunde zugänglichen Bereich. Die Terrassenrestaurants der Ribeira zeigen sich gegenüber wohlerzogenen angeleinten Hunden flexibel, und die Weinkellerbesuche in Vila Nova de Gaia akzeptieren Hunde in den Außenbereichen der Quinta do Crasto und der Quinta de la Rosa.`,
    hotelName: 'The Yeatman',
    hotelEn: `The Yeatman is a 5-star wine hotel overlooking the Douro from Vila Nova de Gaia, with pets welcome on request. The infinity pool terrace faces north over the river and benefits directly from the Nortada afternoon breeze. A dog-friendly hotel within walking distance of the Douro riverside and the cable car up to the Port wine lodges.`,
    hotelFr: `The Yeatman est un hotel de vin 5 etoiles surplombant le Douro depuis Vila Nova de Gaia, avec animaux acceptes sur demande. La terrasse de la piscine a debordement fait face au nord sur la riviere et beneficie directement de la brise de l'apres-midi Nortada. Un hotel dog-friendly a distance de marche du bord du Douro et du teleferique jusqu'aux lodges de vin de Porto.`,
    hotelEs: `The Yeatman es un hotel de vino de 5 estrellas con vistas al Duero desde Vila Nova de Gaia, con mascotas admitidas a peticion. La terraza de la piscina infinity mira al norte sobre el rio y se beneficia directamente de la brisa de la tarde Nortada. Un hotel dog-friendly a distancia andando del Duero y el teleferico hasta las bodegas de vino de Oporto.`,
    hotelPt: `The Yeatman e um hotel de vinho de 5 estrelas com vista sobre o Douro a partir de Vila Nova de Gaia, com animais aceites a pedido. A esplanada da piscina infinita esta virada a norte sobre o rio e beneficia diretamente da brisa da tarde Nortada. Um hotel dog-friendly a distancia a pe das margens do Douro e do telecabine ate as caves de vinho do Porto.`,
    hotelDe: `The Yeatman ist ein 5-Sterne-Weinhotel mit Blick auf den Douro von Vila Nova de Gaia aus, Haustiere auf Anfrage willkommen. Die Infinity-Pool-Terrasse ist nach Norden zum Fluss ausgerichtet und profitiert direkt von der nachmittäglichen Nortada-Brise. Ein hundefreundliches Hotel in Gehweite zum Douro-Ufer und zur Seilbahn hinauf zu den Portwein-Kellereien.`,
  },
  {
    slug: 'sesimbra',
    name: 'Sesimbra',
    country: 'Portugal',
    destPath: '/destinations/sesimbra',
    augustTemp: '24C',
    whyEn: `Fishing village 40km south of Lisbon on the Atlantic, sheltered by the Serra da Arrabida and cooled by the upwelling cold Atlantic current. Arrabida Natural Park trails above the village accept leashed dogs on marked paths. The Fort beach in front of the village allows dogs outside the main bathing zone. Local fishermen's restaurants typically allow dogs on terraces, a tolerance uncommon this close to Lisbon. The Atlantic water temperature here is 18-20C in August, meaning your dog can actually swim without overheating.`,
    whyFr: `Village de peche a 40km au sud de Lisbonne sur l'Atlantique, abrite par la Serra da Arrabida et rafraichi par le courant atlantique froid remontant. Les sentiers du Parc Naturel de l'Arrabida au-dessus du village acceptent les chiens en laisse sur les chemins balises. La plage du Fort devant le village permet les chiens en dehors de la zone de baignade principale. Les restaurants de pecheurs locaux autorisent generalement les chiens en terrasse, une tolerance peu commune si pres de Lisbonne. La temperature de l'eau atlantique ici est de 18-20C en aout.`,
    whyEs: `Pueblo pesquero a 40km al sur de Lisboa en el Atlantico, protegido por la Serra da Arrabida y refrescado por la corriente fria atlantica de surgencia. Los senderos del Parque Natural de la Arrabida sobre el pueblo admiten perros con correa en los caminos senalizados. La playa del Fuerte frente al pueblo permite perros fuera de la zona de bano principal. Los restaurantes de pescadores locales tipicamente permiten perros en terrazas, una tolerancia poco comun tan cerca de Lisboa. La temperatura del agua atlantica aqui es de 18-20C en agosto.`,
    whyPt: `Aldeia de pescadores a 40km a sul de Lisboa no Atlantico, abrigada pela Serra da Arrabida e arrefecida pela corrente fria do Atlantico. Os trilhos do Parque Natural da Arrabida acima da aldeia aceitam caes a trela nos percursos sinalizados. A praia do Forte em frente a aldeia permite caes fora da zona de banho principal. Os restaurantes de pescadores locais tipicamente aceitam caes nas esplanadas, uma tolerancia pouco comum tao perto de Lisboa. A temperatura da agua atlantica aqui e de 18-20C em agosto.`,
    whyDe: `Fischerdorf 40km südlich von Lissabon am Atlantik, geschützt durch die Serra da Arrábida und gekühlt durch den kalten atlantischen Auftriebsstrom. Die Wanderwege des Naturparks Arrábida oberhalb des Dorfes akzeptieren angeleinte Hunde auf den markierten Pfaden. Der Fort-Strand vor dem Dorf erlaubt Hunde außerhalb der Hauptbadezone. Die örtlichen Fischerrestaurants lassen auf ihren Terrassen üblicherweise Hunde zu, eine Toleranz, die so nah an Lissabon ungewöhnlich ist. Die Atlantikwassertemperatur liegt hier im August bei 18-20C, sodass Ihr Hund tatsächlich schwimmen kann, ohne zu überhitzen.`,
    hotelName: 'Hotel do Mar',
    hotelEn: `Hotel do Mar is a 4-star cliff-top property with pets welcome at a moderate fee. The elevated position over the bay catches the Atlantic breeze and gives views of the Arrabida park. Pool access for guests, and the hotel is within walking distance of both the Fort beach and the start of the Arrabida trail network.`,
    hotelFr: `Hotel do Mar est un etablissement 4 etoiles en haut de falaise avec animaux acceptes contre une taxe moderee. La position elevee sur la baie capte la brise atlantique et donne vue sur le parc de l'Arrabida. Acces a la piscine pour les clients, et l'hotel est a distance de marche a la fois de la plage du Fort et du debut du reseau de sentiers de l'Arrabida.`,
    hotelEs: `Hotel do Mar es un establecimiento de 4 estrellas en lo alto del acantilado con mascotas admitidas por una tarifa moderada. La posicion elevada sobre la bahia capta la brisa atlantica y da vistas al parque de la Arrabida. Acceso a la piscina para los huespedes, y el hotel esta a distancia andando tanto de la playa del Fuerte como del inicio de la red de senderos de la Arrabida.`,
    hotelPt: `Hotel do Mar e um estabelecimento de 4 estrelas no topo da arriba com animais aceites mediante uma taxa moderada. A posicao elevada sobre a baia capta a brisa atlantica e oferece vistas sobre o parque da Arrabida. Acesso a piscina para hospedes, e o hotel fica a distancia a pe tanto da praia do Forte como do inicio da rede de trilhos da Arrabida.`,
    hotelDe: `Das Hotel do Mar ist ein 4-Sterne-Haus hoch oben auf der Klippe, Haustiere gegen eine moderate Gebühr willkommen. Die erhöhte Lage über der Bucht fängt die Atlantikbrise ein und bietet Ausblicke auf den Arrábida-Park. Poolzugang für Gäste, und das Hotel liegt sowohl zum Fort-Strand als auch zum Beginn des Arrábida-Wegenetzes in Gehweite.`,
  },
]

const COPY = {
  en: {
    eyebrow: 'PET-FRIENDLY SUMMER · COOL PORTUGAL',
    title: `Cool Portugal with Your Dog in Summer: 8 Destinations Under 25C`,
    intro: `There are two Portugals in August. The Algarve and the Alentejo interior hit 35C or more, with asphalt reaching 55C and genuine heatstroke risk for any brachycephalic or senior dog. But the north (Minho, Douro), the Atlantic coast from Peniche to Sesimbra, and the Serra da Estrela mountain range stay reliably under 25C, cooled by the Nortada wind that sweeps in every afternoon from the Atlantic. If you know where to go, Portugal in August is one of the finest dog travel destinations in Southern Europe.`,
    pickHeading: 'The eight cool picks (ranked coolest to warmest)',
    whyHere: 'Why here',
    hotelLabel: 'Where to stay',
    seeDestCta: 'Full city guide →',
    hotelCta: 'See availability →',
    augustLabel: 'Aug avg high',
    practicalHeading: 'Practical guide: Portugal with your dog in August',
    practical: [
      { h: 'The two Portugals in summer', p: `The Algarve (Faro, Lagos, Albufeira) and the Alentejo interior regularly hit 35-40C in August. Asphalt surface temperature exceeds 55C. This is not a dog-friendly environment in August. The north (Porto, Viana do Castelo, Ponte de Lima, Guimaraes) stays under 25C thanks to the Nortada. The Atlantic coast (Peniche, Sesimbra) is cooled by Atlantic upwelling. The Serra da Estrela mountains are genuinely alpine at altitude. Plan your route: cross Portugal north to south if you must, but avoid stopping south of Lisbon in August unless you are near the coast.` },
      { h: 'Dogs on Portuguese beaches in August', p: `Portugal bans dogs from most bathing beaches between June and September (the Praia Canina designation marks exceptions). In practice, many beaches have a dog-accessible section at one end outside the main flagged bathing area. Beaches mentioned in this guide (Afife, Baleal, Matosinhos, Costa Nova) have confirmed dog zones as of 2025. Always check with the local camara municipal before traveling, as rules change yearly. Before 9h and after 19h, enforcement is minimal even on beaches without a Praia Canina designation.` },
      { h: 'The Pastelaria cafe culture and dogs', p: `Portugal is one of the most dog-tolerant cafe cultures in Southern Europe. Pastelarias (pastry cafes) almost universally allow well-behaved dogs at outside tables, and many in the north tolerate leashed dogs inside at quiet hours. University cities (Porto, Aveiro) are especially relaxed. The exception is Lisbon's tourist core, where terrace rules are strictly enforced. In the north, ordering a galao and sitting outside with your dog is completely normal.` },
      { h: 'Quintas and rural tourism (TER network)', p: `Portugal's Turismo em Espaco Rural (TER) network is one of Europe's best for dog owners. Rural quintas, solares (manor houses), and casas de campo almost universally accept dogs at no extra charge. They offer private gardens, nearby river or forest access, and owners who typically keep dogs themselves. Prices are 30-50% below equivalent city hotels. The Minho, Douro, and Beira Interior regions have the highest density of quality TER properties. Book directly with the property: booking platforms often show incorrect pet policies for TER accommodations.` },
    ],
    faqHeading: 'Frequently asked questions',
    faqs: [
      { q: 'Is Porto really cool enough for a dog in August?', a: `Porto averages 24C in August but the Nortada afternoon wind regularly drops the felt temperature to 18-20C between 15h and 20h. For brachycephalic breeds (bulldogs, pugs, boxers, French bulldogs), Porto is manageable but Serra da Estrela (18C) or Viana do Castelo (22C) are significantly safer. Walk your flat-faced dog only in the morning before 10h and in the evening after 19h in Porto, and use the Parque da Cidade with its shade rather than the exposed Ribeira in peak heat. For brachycephalics, the mountain picks are always the safer call.` },
      { q: 'Can I drive from Spain to northern Portugal with a dog?', a: `Yes, the Vigo crossing into Portugal is straightforward: the A55/E01 from Vigo crosses at Valenca on the Lima river, no border check required within the Schengen zone. From Madrid, the Ouigo high-speed train reaches Porto in approximately 3.5 hours (dogs up to 10kg in a carrier accepted in cabin for a small fee). Driving from Seville to Porto is 7-8 hours: plan a stop in the cooler Alentejo highlands if traveling in August heat, not the coast road.` },
      { q: 'Which vineyards in Douro and Minho are dog-friendly?', a: `Quinta da Aveleda (Vinho Verde, Penafiel) has confirmed dogs welcome in the extensive garden park. Quinta do Crasto (Douro Superior) accepts dogs in the outdoor terrace area. Quinta de la Rosa (Pinhao, Douro) accepts dogs in the garden. All three have confirmed this policy directly with dog-traveling visitors. In the Vinho Verde region around Ponte de Lima and Braga, most quinta visits are outdoor and informal: arriving with a dog rarely causes issues. Call ahead for harvest season (September-October) as the policy may tighten during busy periods.` },
      { q: 'What is the Nortada and why does it matter for dogs?', a: `The Nortada is a cold north-Atlantic wind that sweeps down the Portuguese Atlantic coast every summer afternoon, typically arriving between 14h and 16h and lasting until sunset. It cools the coast by 5-8C below inland temperatures. In Porto, a day that hits 28C at midday will drop to 20C by 17h. In Viana do Castelo and Peniche, the Nortada is constant, keeping temperatures reliably under 23C. For dogs, this means afternoon walks are genuinely possible on the Atlantic coast in a way they are not in the Algarve. Plan your dog's main walk for 17h-20h to benefit from the full Nortada effect.` },
    ],
    relatedHeading: 'See also',
  },
  fr: {
    eyebrow: 'ETE PET-FRIENDLY · PORTUGAL FRAIS',
    title: `Portugal frais avec son chien en ete : 8 destinations a moins de 25C`,
    intro: `Il y a deux Portugals en aout. L'Algarve et l'Alentejo interieur atteignent 35C ou plus, avec un asphalte a 55C et un risque reel de coup de chaleur pour tout chien brachycephale ou age. Mais le nord (Minho, Douro), la cote atlantique de Peniche a Sesimbra, et le massif de la Serra da Estrela restent sous 25C de facon fiable, rafraichis par le vent Nortada qui souffle chaque apres-midi depuis l'Atlantique. Si vous savez ou aller, le Portugal en aout est l'une des meilleures destinations canines d'Europe du Sud.`,
    pickHeading: 'Les huit picks frais (du plus frais au plus chaud)',
    whyHere: 'Pourquoi ici',
    hotelLabel: 'Ou dormir',
    seeDestCta: 'Guide complet →',
    hotelCta: 'Voir les disponibilites →',
    augustLabel: 'Max moyen aout',
    practicalHeading: 'Guide pratique : Portugal avec son chien en aout',
    practical: [
      { h: 'Les deux Portugals en ete', p: `L'Algarve (Faro, Lagos, Albufeira) et l'Alentejo interieur atteignent regulierement 35-40C en aout. La temperature de surface de l'asphalte depasse 55C. Ce n'est pas un environnement dog-friendly en aout. Le nord (Porto, Viana do Castelo, Ponte de Lima, Guimaraes) reste sous 25C grace au Nortada. La cote atlantique (Peniche, Sesimbra) est rafraichie par les remontees d'eaux atlantiques. Les montagnes de la Serra da Estrela sont veritablement alpines en altitude. Planifiez votre route : traversez le Portugal du nord au sud si necessaire, mais evitez de vous arreter au sud de Lisbonne en aout sauf si vous etes pres de la cote.` },
      { h: 'Chiens sur les plages portugaises en aout', p: `Le Portugal interdit les chiens sur la plupart des plages de baignade de juin a septembre (la designation Praia Canina marque les exceptions). En pratique, de nombreuses plages ont une section accessible aux chiens a une extremite, hors de la zone de baignade principale. Les plages mentionnees dans ce guide (Afife, Baleal, Matosinhos, Costa Nova) ont des zones chiens confirmees a partir de 2025. Verifiez toujours aupres de la camara municipal locale avant de voyager, car les regles changent chaque annee. Avant 9h et apres 19h, l'application est minimale meme sur les plages sans designation Praia Canina.` },
      { h: 'La culture pastelaria et les chiens', p: `Le Portugal est l'une des cultures de cafe les plus tolerantes aux chiens d'Europe du Sud. Les pastelarias (cafes-patisseries) acceptent presque universellement les chiens bien tenus aux tables exterieures, et beaucoup dans le nord tolerent les chiens en laisse a l'interieur aux heures creuses. Les villes universitaires (Porto, Aveiro) sont particulierement detendues. L'exception est le coeur touristique de Lisbonne, ou les regles de terrasse sont strictement appliquees. Dans le nord, commander un galao et s'asseoir dehors avec son chien est tout a fait normal.` },
      { h: 'Quintas et tourisme rural (reseau TER)', p: `Le reseau Turismo em Espaco Rural (TER) du Portugal est l'un des meilleurs d'Europe pour les proprietaires de chiens. Les quintas rurales, solares (maisons de maitre) et casas de campo acceptent presque universellement les chiens sans supplement. Elles offrent des jardins prives, un acces proche a la riviere ou a la foret, et des proprietaires qui ont generalement eux-memes des chiens. Les prix sont 30-50% en dessous des hotels equivalents en ville. Le Minho, le Douro et la Beira Interior ont la plus forte densite de proprietes TER de qualite. Reservez directement aupres de la propriete : les plateformes de reservation affichent souvent des politiques animaux incorrectes pour les hebergements TER.` },
    ],
    faqHeading: 'Questions frequentes',
    faqs: [
      { q: 'Porto est-il vraiment assez frais pour un chien en aout ?', a: `Porto affiche 24C de moyenne en aout mais le vent Nortada de l'apres-midi fait regulierement baisser la temperature ressentie a 18-20C entre 15h et 20h. Pour les races brachycephales (bouledogues, carlins, boxers, bouledogues francais), Porto est geerable mais la Serra da Estrela (18C) ou Viana do Castelo (22C) sont significativement plus sures. Promenez votre chien a museau court uniquement le matin avant 10h et le soir apres 19h a Porto, et utilisez le Parque da Cidade avec son ombre plutot que la Ribeira exposee en pleine chaleur. Pour les brachycephales, les picks en montagne sont toujours le choix le plus sur.` },
      { q: 'Peut-on conduire d\'Espagne au nord du Portugal avec un chien ?', a: `Oui, le passage de Vigo au Portugal est simple : l'A55/E01 depuis Vigo traverse a Valenca sur le fleuve Lima, aucun controle aux frontieres requis dans la zone Schengen. Depuis Madrid, le train grande vitesse Ouigo rejoint Porto en environ 3h30 (chiens jusqu'a 10kg dans un sac acceptes en cabine pour un petit supplement). En voiture depuis Seville, comptez 7-8 heures jusqu'a Porto : prevoyez une halte dans les hauteurs de l'Alentejo, plus fraiches, si vous voyagez dans la chaleur d'aout.` },
      { q: 'Quels vignobles du Douro et du Minho acceptent les chiens ?', a: `Quinta da Aveleda (Vinho Verde, Penafiel) a confirme l'accueil des chiens dans le vaste parc-jardin. Quinta do Crasto (Douro Superieur) accepte les chiens dans la zone de terrasse exterieure. Quinta de la Rosa (Pinhao, Douro) accepte les chiens dans le jardin. Les trois ont confirme cette politique directement aupres de visiteurs voyageant avec des chiens. Dans la region du Vinho Verde autour de Ponte de Lima et Braga, la plupart des visites de quinta sont en exterieur et informelles : arriver avec un chien pose rarement probleme.` },
      { q: 'Qu\'est-ce que le Nortada et pourquoi est-ce important pour les chiens ?', a: `Le Nortada est un vent froid nord-atlantique qui balaye la cote atlantique portugaise chaque apres-midi d'ete, arrivant typiquement entre 14h et 16h et durant jusqu'au coucher du soleil. Il rafraichit la cote de 5-8C en dessous des temperatures interieures. A Porto, une journee qui atteint 28C a midi tombera a 20C a 17h. A Viana do Castelo et Peniche, le Nortada est constant, maintenant les temperatures sous 23C de facon fiable. Pour les chiens, cela signifie que les promenades de l'apres-midi sont reellement possibles sur la cote atlantique d'une maniere qui ne l'est pas en Algarve.` },
    ],
    relatedHeading: 'Voir aussi',
  },
  es: {
    eyebrow: 'VERANO PET-FRIENDLY · PORTUGAL FRESCO',
    title: `Portugal fresco con tu perro en verano: 8 destinos a menos de 25C`,
    intro: `Hay dos Portugales en agosto. El Algarve y el interior del Alentejo alcanzan 35C o mas, con asfalto a 55C y riesgo real de golpe de calor para cualquier perro braquicefalo o mayor. Pero el norte (Minho, Duero), la costa atlantica de Peniche a Sesimbra, y la sierra de la Serra da Estrela se mantienen fiablemente bajo 25C, refrescados por el viento Nortada que llega cada tarde desde el Atlantico. Si sabes donde ir, Portugal en agosto es uno de los mejores destinos para viajar con perro en el sur de Europa.`,
    pickHeading: 'Las ocho elecciones frescas (del mas fresco al mas calido)',
    whyHere: 'Por que aqui',
    hotelLabel: 'Donde alojarse',
    seeDestCta: 'Guia completa →',
    hotelCta: 'Ver disponibilidad →',
    augustLabel: 'Max media agosto',
    practicalHeading: 'Guia practica: Portugal con tu perro en agosto',
    practical: [
      { h: 'Los dos Portugales en verano', p: `El Algarve (Faro, Lagos, Albufeira) y el interior del Alentejo alcanzan regularmente 35-40C en agosto. La temperatura superficial del asfalto supera los 55C. No es un entorno dog-friendly en agosto. El norte (Porto, Viana do Castelo, Ponte de Lima, Guimaraes) se mantiene bajo 25C gracias al Nortada. La costa atlantica (Peniche, Sesimbra) se refresca por el afloramiento atlantico. Las montanas de la Serra da Estrela son genuinamente alpinas en altura. Planifica tu ruta: cruza Portugal de norte a sur si es necesario, pero evita parar al sur de Lisboa en agosto a menos que estes cerca de la costa.` },
      { h: 'Perros en playas portuguesas en agosto', p: `Portugal prohibe los perros en la mayoria de las playas de bano de junio a septiembre (la designacion Praia Canina marca las excepciones). En la practica, muchas playas tienen una seccion accesible para perros en un extremo fuera de la zona de bano principal. Las playas mencionadas en esta guia (Afife, Baleal, Matosinhos, Costa Nova) tienen zonas caninas confirmadas desde 2025. Consulta siempre con la camara municipal local antes de viajar, ya que las normas cambian cada ano. Antes de las 9h y despues de las 19h, la aplicacion es minima incluso en playas sin designacion Praia Canina.` },
      { h: 'La cultura de la pastelaria y los perros', p: `Portugal es una de las culturas de cafe mas tolerantes con los perros del sur de Europa. Las pastelarias (cafes-pastelerias) practicamente siempre admiten perros bien portados en las mesas del exterior, y muchas en el norte toleran perros con correa dentro en horas tranquilas. Las ciudades universitarias (Porto, Aveiro) son especialmente relajadas. La excepcion es el nucleo turistico de Lisboa, donde las normas de terraza se aplican estrictamente. En el norte, pedir un galao y sentarse fuera con tu perro es completamente normal.` },
      { h: 'Quintas y turismo rural (red TER)', p: `La red Turismo em Espaco Rural (TER) de Portugal es una de las mejores de Europa para duenos de perros. Las quintas rurales, solares (casas solariegas) y casas de campo practicamente siempre aceptan perros sin cargo extra. Ofrecen jardines privados, acceso cercano a rios o bosques, y propietarios que generalmente tienen perros ellos mismos. Los precios son un 30-50% por debajo de hoteles equivalentes en la ciudad. El Minho, el Duero y la Beira Interior tienen la mayor densidad de propiedades TER de calidad. Reserva directamente con la propiedad: las plataformas de reserva a menudo muestran politicas de mascotas incorrectas para los alojamientos TER.` },
    ],
    faqHeading: 'Preguntas frecuentes',
    faqs: [
      { q: 'Es Porto realmente lo suficientemente fresco para un perro en agosto?', a: `Porto tiene 24C de media en agosto pero el viento Nortada de la tarde regularmente baja la temperatura sentida a 18-20C entre las 15h y las 20h. Para razas braquicefalas (bulldogs, carlinos, boxers, bulldogs franceses), Porto es manejable pero Serra da Estrela (18C) o Viana do Castelo (22C) son significativamente mas seguras. Pasea a tu perro de hocico corto solo por la manana antes de las 10h y por la tarde despues de las 19h en Porto, y usa el Parque da Cidade con su sombra en lugar de la Ribeira expuesta en el pico de calor.` },
      { q: 'Se puede conducir de Espana al norte de Portugal con un perro?', a: `Si, el cruce de Vigo a Portugal es sencillo: la A55/E01 desde Vigo cruza en Valenca sobre el rio Lima, sin control de fronteras requerido dentro de la zona Schengen. Desde Madrid, el tren de alta velocidad Ouigo llega a Porto en aproximadamente 3,5 horas (perros de hasta 10 kg en transportin aceptados en cabine por una pequena tarifa). Conduciendo desde Sevilla, cuenta 7-8 horas hasta Porto: planifica una parada en las tierras altas del Alentejo, mas frescas, si viajas en el calor de agosto.` },
      { q: 'Que vinedos del Duero y del Minho admiten perros?', a: `Quinta da Aveleda (Vinho Verde, Penafiel) ha confirmado la acogida de perros en el extenso parque-jardin. Quinta do Crasto (Duero Superior) acepta perros en la zona de terraza exterior. Quinta de la Rosa (Pinhao, Duero) acepta perros en el jardin. Los tres han confirmado esta politica directamente con visitantes que viajan con perros. En la region del Vinho Verde en torno a Ponte de Lima y Braga, la mayoria de las visitas a quintas son al aire libre e informales: llegar con un perro raramente causa problemas.` },
      { q: 'Que es el Nortada y por que importa para los perros?', a: `El Nortada es un viento frio del norte-Atlantico que barre la costa atlantica portuguesa cada tarde de verano, llegando tipicamente entre las 14h y las 16h y durando hasta el atardecer. Enfria la costa 5-8C por debajo de las temperaturas del interior. En Porto, un dia que alcanza 28C al mediodia bajara a 20C a las 17h. En Viana do Castelo y Peniche, el Nortada es constante, manteniendo las temperaturas fiablemente bajo 23C. Para los perros, esto significa que los paseos de la tarde son genuinamente posibles en la costa atlantica de una manera que no lo son en el Algarve.` },
    ],
    relatedHeading: 'Ver tambien',
  },
  pt: {
    eyebrow: 'VERAO PET-FRIENDLY · PORTUGAL FRESCO',
    title: `Portugal fresco com o seu cao no verao: 8 destinos a menos de 25C`,
    intro: `Ha dois Portugais em agosto. O Algarve e o interior do Alentejo atingem 35C ou mais, com asfalto a 55C e risco real de golpe de calor para qualquer cao braquicefalico ou idoso. Mas o norte (Minho, Douro), a costa atlantica de Peniche a Sesimbra, e o macico da Serra da Estrela ficam confiavelmente abaixo dos 25C, refrescados pelo vento Nortada que chega todas as tardes desde o Atlantico. Se souber onde ir, Portugal em agosto e um dos melhores destinos de viagem com cao do sul da Europa.`,
    pickHeading: 'As oito escolhas frescas (do mais fresco ao mais quente)',
    whyHere: 'Porque aqui',
    hotelLabel: 'Onde ficar',
    seeDestCta: 'Guia completo →',
    hotelCta: 'Ver disponibilidade →',
    augustLabel: 'Max media agosto',
    practicalHeading: 'Guia pratico: Portugal com o seu cao em agosto',
    practical: [
      { h: 'Os dois Portugais no verao', p: `O Algarve (Faro, Lagos, Albufeira) e o interior do Alentejo atingem regularmente 35-40C em agosto. A temperatura superficial do asfalto ultrapassa os 55C. Nao e um ambiente dog-friendly em agosto. O norte (Porto, Viana do Castelo, Ponte de Lima, Guimaraes) fica abaixo dos 25C gracas ao Nortada. A costa atlantica (Peniche, Sesimbra) e refrescada pelo afloramento atlantico. As montanhas da Serra da Estrela sao genuinamente alpinas em altitude. Planeie a sua rota: atravesse Portugal de norte a sul se necessario, mas evite parar a sul de Lisboa em agosto a menos que esteja perto da costa.` },
      { h: 'Caes nas praias portuguesas em agosto', p: `Portugal proibe caes na maioria das praias de banho de junho a setembro (a designacao Praia Canina marca as excecoes). Na pratica, muitas praias tem uma seccao acessivel a caes numa extremidade fora da zona de banho principal. As praias mencionadas neste guia (Afife, Baleal, Matosinhos, Costa Nova) tem zonas caninas confirmadas a partir de 2025. Verifique sempre junto da camara municipal local antes de viajar, pois as regras mudam anualmente. Antes das 9h e depois das 19h, a fiscalizacao e minima mesmo em praias sem designacao Praia Canina.` },
      { h: 'A cultura da pastelaria e os caes', p: `Portugal e uma das culturas de cafe mais tolerantes com caes do sul da Europa. As pastelarias aceitam praticamente sempre caes bem comportados nas mesas do exterior, e muitas no norte toleram caes a trela no interior em horas calmas. As cidades universitarias (Porto, Aveiro) sao especialmente descontraidas. A excecao e o nucleo turistico de Lisboa, onde as regras das esplanadas sao aplicadas rigorosamente. No norte, pedir um galao e sentar la fora com o seu cao e completamente normal.` },
      { h: 'Quintas e turismo rural (rede TER)', p: `A rede Turismo em Espaco Rural (TER) de Portugal e uma das melhores da Europa para proprietarios de caes. Quintas rurais, solares e casas de campo aceitam praticamente sempre caes sem suplemento. Oferecem jardins privados, acesso proximo a rios ou florestas, e proprietarios que habitualmente tem caes eles proprios. Os precos sao 30-50% abaixo de hoteis equivalentes na cidade. O Minho, o Douro e a Beira Interior tem a maior densidade de propriedades TER de qualidade. Reserve diretamente com a propriedade: as plataformas de reserva mostram frequentemente politicas de animais incorretas para os alojamentos TER.` },
    ],
    faqHeading: 'Perguntas frequentes',
    faqs: [
      { q: 'O Porto e realmente fresco o suficiente para um cao em agosto?', a: `O Porto tem 24C de media em agosto mas o vento Nortada da tarde baixa regularmente a temperatura sentida para 18-20C entre as 15h e as 20h. Para racas braquicefalicas (bulldogs, carlins, boxers, bulldogs franceses), o Porto e gerivel mas a Serra da Estrela (18C) ou Viana do Castelo (22C) sao significativamente mais seguras. Passeie o seu cao de focinho curto apenas de manha antes das 10h e a tarde depois das 19h no Porto, e use o Parque da Cidade com a sua sombra em vez da Ribeira exposta no pico de calor.` },
      { q: 'Posso conduzir de Espanha para o norte de Portugal com um cao?', a: `Sim, a travessia de Vigo para Portugal e simples: a A55/E01 de Vigo passa em Valenca sobre o rio Minho, sem controlo de fronteiras necessario dentro da zona Schengen. De Madrid, o comboio de alta velocidade Ouigo chega ao Porto em aproximadamente 3,5 horas (caes ate 10 kg em transportadora aceites em cabine por uma pequena taxa). De carro desde Sevilha, conte 7-8 horas ate ao Porto: planeie uma paragem nas terras altas do Alentejo, mais frescas, se viajar no calor de agosto.` },
      { q: 'Que quintas no Douro e no Minho aceitam caes?', a: `Quinta da Aveleda (Vinho Verde, Penafiel) confirmou a recepcao de caes no extenso parque-jardim. Quinta do Crasto (Douro Superior) aceita caes na zona de esplanada exterior. Quinta de la Rosa (Pinhao, Douro) aceita caes no jardim. As tres confirmaram esta politica diretamente com visitantes que viajam com caes. Na regiao do Vinho Verde em torno de Ponte de Lima e Braga, a maioria das visitas a quintas sao ao ar livre e informais: chegar com um cao raramente causa problemas.` },
      { q: 'O que e o Nortada e porque importa para os caes?', a: `O Nortada e um vento frio do norte-Atlantico que varre a costa atlantica portuguesa todas as tardes de verao, chegando tipicamente entre as 14h e as 16h e durando ate ao por do sol. Arrefece a costa 5-8C abaixo das temperaturas do interior. No Porto, um dia que atinge 28C ao meio-dia descera para 20C as 17h. Em Viana do Castelo e Peniche, o Nortada e constante, mantendo as temperaturas confiavelmente abaixo dos 23C. Para os caes, isto significa que os passeios da tarde sao genuinamente possiveis na costa atlantica de uma forma que nao sao no Algarve.` },
    ],
    relatedHeading: 'Ver tambem',
  },
  de: {
    eyebrow: 'HAUSTIERFREUNDLICHER SOMMER · KÜHLES PORTUGAL',
    title: `Kühles Portugal mit Hund im Sommer: 8 Reiseziele unter 25C`,
    intro: `Es gibt zwei Portugals im August. Die Algarve und das Alentejo-Hinterland erreichen 35C oder mehr, mit Asphalttemperaturen von bis zu 55C und echtem Hitzschlagrisiko für jeden brachyzephalen oder älteren Hund. Der Norden (Minho, Douro), die Atlantikküste von Peniche bis Sesimbra und das Gebirge der Serra da Estrela bleiben dagegen zuverlässig unter 25C, gekühlt vom Nortada-Wind, der jeden Nachmittag vom Atlantik hereinweht. Wer weiß, wohin er fahren muss, findet in Portugal im August eines der besten Reiseziele für Hundebesitzer in Südeuropa.`,
    pickHeading: 'Die acht kühlen Favoriten (vom kühlsten zum wärmsten sortiert)',
    whyHere: 'Warum hier',
    hotelLabel: 'Wo übernachten',
    seeDestCta: 'Vollständiger Stadtführer →',
    hotelCta: 'Verfügbarkeit ansehen →',
    augustLabel: 'Ø Höchstwert Aug.',
    practicalHeading: 'Praktischer Ratgeber: Portugal mit Hund im August',
    practical: [
      { h: 'Die zwei Portugals im Sommer', p: `Die Algarve (Faro, Lagos, Albufeira) und das Alentejo-Hinterland erreichen im August regelmäßig 35-40C. Die Asphaltoberflächentemperatur übersteigt 55C. Das ist im August kein hundefreundliches Umfeld. Der Norden (Porto, Viana do Castelo, Ponte de Lima, Guimarães) bleibt dank des Nortada unter 25C. Die Atlantikküste (Peniche, Sesimbra) wird durch den atlantischen Kaltwasserauftrieb gekühlt. Das Gebirge der Serra da Estrela ist in der Höhe wirklich alpin. Planen Sie Ihre Route: Durchqueren Sie Portugal wenn nötig von Nord nach Süd, vermeiden Sie aber im August Zwischenstopps südlich von Lissabon, es sei denn, Sie sind küstennah.` },
      { h: 'Hunde an portugiesischen Stränden im August', p: `Portugal verbietet Hunde zwischen Juni und September an den meisten Badestränden (die Bezeichnung Praia Canina markiert die Ausnahmen). In der Praxis haben viele Strände an einem Ende einen für Hunde zugänglichen Bereich außerhalb der ausgewiesenen Hauptbadezone. Die in diesem Ratgeber genannten Strände (Afife, Baleal, Matosinhos, Costa Nova) haben Stand 2025 bestätigte Hundezonen. Prüfen Sie vor der Reise immer bei der örtlichen camara municipal, da sich die Regeln jährlich ändern. Vor 9h und nach 19h wird selbst an Stränden ohne Praia-Canina-Ausweisung kaum kontrolliert.` },
      { h: 'Die Pastelaria-Cafékultur und Hunde', p: `Portugal hat eine der hundefreundlichsten Cafékulturen Südeuropas. Pastelarias (Konditoreicafés) lassen an den Außentischen fast durchweg gut erzogene Hunde zu, und viele im Norden dulden zu ruhigen Zeiten auch angeleinte Hunde im Innenbereich. Universitätsstädte (Porto, Aveiro) sind besonders entspannt. Die Ausnahme ist der touristische Kern Lissabons, wo die Terrassenregeln streng durchgesetzt werden. Im Norden ist es völlig normal, einen galao zu bestellen und mit seinem Hund draußen zu sitzen.` },
      { h: 'Quintas und ländlicher Tourismus (TER-Netzwerk)', p: `Das portugiesische Netzwerk Turismo em Espaço Rural (TER) gehört für Hundebesitzer zu den besten in Europa. Ländliche Quintas, solares (Herrenhäuser) und casas de campo akzeptieren Hunde fast durchweg ohne Aufpreis. Sie bieten private Gärten, nahegelegenen Fluss- oder Waldzugang, und die Eigentümer halten meist selbst Hunde. Die Preise liegen 30-50% unter vergleichbaren Stadthotels. Die Regionen Minho, Douro und Beira Interior haben die höchste Dichte hochwertiger TER-Unterkünfte. Buchen Sie direkt bei der Unterkunft: Buchungsplattformen zeigen für TER-Unterkünfte oft falsche Haustierrichtlinien an.` },
    ],
    faqHeading: 'Häufig gestellte Fragen',
    faqs: [
      { q: 'Ist Porto im August wirklich kühl genug für einen Hund?', a: `Porto liegt im August im Schnitt bei 24C, aber der Nortada-Nachmittagswind senkt die gefühlte Temperatur zwischen 15h und 20h regelmäßig auf 18-20C. Für brachyzephale Rassen (Bulldoggen, Möpse, Boxer, Französische Bulldoggen) ist Porto machbar, aber Serra da Estrela (18C) oder Viana do Castelo (22C) sind deutlich sicherer. Gehen Sie mit Ihrem kurznasigen Hund in Porto nur morgens vor 10h und abends nach 19h spazieren, und nutzen Sie in der größten Hitze den schattigen Parque da Cidade statt der exponierten Ribeira. Für brachyzephale Hunde sind die Bergziele immer die sicherere Wahl.` },
      { q: `Kann ich mit dem Auto mit Hund von Spanien nach Nordportugal fahren?`, a: `Ja, der Grenzübergang bei Vigo nach Portugal ist unkompliziert: Die A55/E01 von Vigo überquert die Grenze bei Valença am Fluss Lima, ohne Grenzkontrolle innerhalb des Schengen-Raums. Von Madrid aus erreicht der Hochgeschwindigkeitszug Ouigo Porto in etwa 3,5 Stunden (Hunde bis 10kg in einer Transportbox gegen einen kleinen Aufpreis in der Kabine erlaubt). Mit dem Auto von Sevilla nach Porto dauert es 7-8 Stunden: Planen Sie bei Augusthitze einen Zwischenstopp im kühleren Alentejo-Hochland statt an der Küstenstraße.` },
      { q: `Welche Weingüter im Douro und Minho sind hundefreundlich?`, a: `Quinta da Aveleda (Vinho Verde, Penafiel) hat bestätigt, dass Hunde im weitläufigen Gartenpark willkommen sind. Quinta do Crasto (Douro Superior) akzeptiert Hunde im Außenterrassenbereich. Quinta de la Rosa (Pinhão, Douro) akzeptiert Hunde im Garten. Alle drei haben diese Richtlinie direkt gegenüber mit Hund reisenden Besuchern bestätigt. In der Vinho-Verde-Region um Ponte de Lima und Braga finden die meisten Quinta-Besuche im Freien und informell statt: Die Ankunft mit Hund verursacht selten Probleme. Rufen Sie zur Erntezeit (September bis Oktober) vorher an, da die Richtlinie in stark ausgelasteten Zeiten strenger gehandhabt werden kann.` },
      { q: `Was ist der Nortada und warum ist er für Hunde wichtig?`, a: `Der Nortada ist ein kalter Nordatlantikwind, der jeden Sommernachmittag die portugiesische Atlantikküste hinabweht, typischerweise zwischen 14h und 16h einsetzt und bis zum Sonnenuntergang anhält. Er kühlt die Küste um 5-8C unter die Temperaturen im Landesinneren. In Porto fällt ein Tag, der mittags 28C erreicht, bis 17h auf 20C. In Viana do Castelo und Peniche weht der Nortada konstant und hält die Temperaturen zuverlässig unter 23C. Für Hunde bedeutet das, dass Nachmittagsspaziergänge an der Atlantikküste tatsächlich möglich sind, anders als an der Algarve. Planen Sie den Hauptspaziergang Ihres Hundes für 17h-20h, um vom vollen Nortada-Effekt zu profitieren.` },
    ],
    relatedHeading: 'Siehe auch',
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
    return p.whyEn
  }
  const pickHotel = (p: Pick) => {
    if (locale === 'fr') return p.hotelFr
    if (locale === 'es') return p.hotelEs
    if (locale === 'pt') return p.hotelPt
    if (locale === 'de') return p.hotelDe
    return p.hotelEn
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-sky-700 via-cyan-600 to-emerald-500 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 40%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-xs font-semibold uppercase tracking-widest text-cyan-100 mb-3">❄️ {t.eyebrow}</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{t.title}</h1>
          <p className="text-lg sm:text-xl text-cyan-50 leading-relaxed">{t.intro}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-8">{t.pickHeading}</h2>
        <div className="space-y-5">
          {PICKS.map((p, i) => (
            <article key={p.slug} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <header className="px-5 sm:px-7 py-4 bg-gradient-to-r from-sky-50 to-emerald-50 border-b border-stone-200 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-2xl font-black text-sky-700">#{i + 1}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  <Link href={`/${locale}${p.destPath}`} className="hover:text-sky-700">{p.name}</Link>
                </h3>
                <span className="text-sm text-stone-600">{p.country}</span>
                <span className="ml-auto bg-sky-100 text-sky-900 text-xs font-bold px-3 py-1 rounded-full">
                  {t.augustLabel} {p.augustTemp}
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
                  <Link href={`/${locale}${p.destPath}`} className="text-sm font-semibold text-sky-700 hover:text-sky-900 hover:underline">
                    {t.seeDestCta}
                  </Link>
                  <a
                    href={buildAllezDestLink(p.name, p.country, `${CAMPAIGN_BASE}-${p.slug}`, 5)}
                    target="_blank"
                    rel="noopener sponsored"
                    className="text-sm font-semibold text-stone-700 hover:text-sky-700 hover:underline"
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
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">🌡️ {t.practicalHeading}</h2>
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
        href={buildAllezDestLink('Portugal', 'Portugal', `${CAMPAIGN_BASE}-sticky`, 5)}
      />
    </main>
  )
}
