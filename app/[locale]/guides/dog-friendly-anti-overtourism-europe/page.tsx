import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'dog-friendly-anti-overtourism-europe'
const CAMPAIGN_BASE = 'anti-overtourism'

const STICKY_LABELS: Record<string, { label: string; cta: string }> = {
  en: { label: 'Quieter pet-friendly alternatives', cta: 'See hotels' },
  fr: { label: 'Alternatives pet-friendly moins bondees', cta: 'Voir les hotels' },
  es: { label: 'Alternativas pet-friendly menos saturadas', cta: 'Ver hoteles' },
  pt: { label: 'Alternativas pet-friendly menos saturadas', cta: 'Ver hoteis' },
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
    en: `Dog-Friendly Alternatives to Europe's Most Overcrowded Cities: 8 Quieter Picks (2026) | HotelsWithPets.com`,
    fr: `Alternatives pet-friendly aux villes europeennes surpeuplees : 8 destinations moins bondees (2026) | HotelsWithPets.com`,
    es: `Alternativas pet-friendly a las ciudades europeas masificadas: 8 destinos menos saturados (2026) | HotelsWithPets.com`,
    pt: `Alternativas pet-friendly as cidades europeias superlotadas: 8 destinos menos saturados (2026) | HotelsWithPets.com`,
  }
  const descriptions: Record<string, string> = {
    en: `Barcelona protests, Venice tourist gates, Santorini caps: 2026's anti-overtourism movement is real. Dog owners have a hidden advantage: quieter cities are almost always more dog-friendly. Eight verified alternatives with pet-friendly hotels.`,
    fr: `Manifestations a Barcelone, portiques a Venise, quota a Santorin: le mouvement anti-surtourisme 2026 est bien reel. Les proprietaires de chiens ont un avantage cache: les villes moins bondees sont presque toujours plus accueillantes pour les chiens. Huit alternatives verifiees avec hotels pet-friendly.`,
    es: `Protestas en Barcelona, puertas en Venecia, cuotas en Santorini: el movimiento anti-masificacion 2026 es real. Los duenos de perros tienen una ventaja oculta: las ciudades mas tranquilas son casi siempre mas pet-friendly. Ocho alternativas verificadas con hoteles pet-friendly.`,
    pt: `Protestos em Barcelona, portas em Veneza, quotas em Santorini: o movimento anti-sobreturismo 2026 e real. Os donos de caes tem uma vantagem oculta: as cidades mais calmas sao quase sempre mais pet-friendly. Oito alternativas verificadas com hoteis pet-friendly.`,
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
  insteadOf: string
  whyEn: string
  whyFr: string
  whyEs: string
  whyPt: string
  hotelName: string
  hotelEn: string
  hotelFr: string
  hotelEs: string
  hotelPt: string
}

const PICKS: Pick[] = [
  {
    slug: 'girona',
    name: 'Girona',
    country: 'Spain',
    destPath: '/destinations/girona',
    summerTemp: '28C',
    insteadOf: 'Barcelona',
    whyEn: `Girona is 1h north of Barcelona by train (12 EUR), has the same Catalan culture and Gothic quarter atmosphere but receives 10x fewer tourists. The old Jewish quarter (Call) is walkable in an afternoon with a leashed dog, the Onyar river banks are flat and dog-accessible year-round, and the surrounding Gavarres hills start 15 min from the centre with marked leash-required trails. The city has been a film location for Game of Thrones which adds curious visitors but nothing like Barcelona's 30 million annual tourists.`,
    whyFr: `Girone est a 1h au nord de Barcelone en train (12 EUR), possede la meme culture catalane et la meme atmosphere de quartier gothique mais recoit 10 fois moins de touristes. Le vieux quartier juif (Call) se parcourt en une apres-midi avec un chien en laisse, les berges de l'Onyar sont plates et accessibles aux chiens toute l'annee, et les collines environnantes de Gavarres commencent a 15 min du centre avec des sentiers balisés laisse obligatoire.`,
    whyEs: `Girona esta a 1h al norte de Barcelona en tren (12 EUR), tiene la misma cultura catalana y ambiente de barrio gotico pero recibe 10 veces menos turistas. El antiguo barrio judio (Call) es recorrible en una tarde con un perro con correa, las orillas del Onyar son planas y accesibles para perros todo el ano, y las colinas de Gavarres empiezan a 15 min del centro con senderos senalizados de correa obligatoria.`,
    whyPt: `Girona fica a 1h a norte de Barcelona de comboio (12 EUR), tem a mesma cultura catalã e atmosfera de bairro gotico mas recebe 10 vezes menos turistas. O antigo bairro judeu (Call) percorre-se numa tarde com cão a trela, as margens do rio Onyar sao planas e acessiveis a caes todo o ano, e as colinas de Gavarres comecam a 15 min do centro com trilhos sinalizados de trela obrigatoria.`,
    hotelName: 'Hotel Llegendes de Girona Catedral',
    hotelEn: `Hotel Llegendes de Girona Catedral - boutique 4-star inside the medieval walls, dogs up to 15kg welcomed at modest fee, stone courtyard.`,
    hotelFr: `Hotel Llegendes de Girona Catedral - boutique 4 etoiles dans les remparts medievaux, chiens jusqu'a 15kg acceptes (supplement modere), cour en pierre.`,
    hotelEs: `Hotel Llegendes de Girona Catedral - boutique 4 estrellas dentro de las murallas medievales, perros hasta 15kg admitidos (suplemento moderado), patio de piedra.`,
    hotelPt: `Hotel Llegendes de Girona Catedral - boutique 4 estrelas dentro das muralhas medievais, caes ate 15kg aceites (taxa moderada), patio de pedra.`,
  },
  {
    slug: 'treviso',
    name: 'Treviso',
    country: 'Italy',
    destPath: '/destinations/treviso',
    summerTemp: '27C',
    insteadOf: 'Venice',
    whyEn: `Treviso is 30 min by train from Venice (4.50 EUR) and often described as "Venice without the crowds and the smell". It has the same painted medieval facades, canals, fish market and aperitivo culture, but receives a fraction of Venice's 30 million annual visitors. The Sile river walk through the centre is entirely flat and leash-welcome, the Piazza dei Signori is dog-tolerant at aperitivo hour, and the Prosecco Hills UNESCO begin 20 min north with walking paths that accept leashed dogs.`,
    whyFr: `Trevise est a 30 min en train de Venise (4,50 EUR) et souvent decrite comme "Venise sans la foule ni l'odeur". Elle partage les memes facades medievales peintes, canaux, marche aux poissons et culture aperitivo, mais recoit une infime fraction des 30 millions de visiteurs annuels de Venise. La promenade de la riviere Sile en centre-ville est entierement plate et accueille les chiens en laisse, la Piazza dei Signori est tolerante aux chiens a l'heure de l'aperitivo, et les Collines du Prosecco UNESCO commencent a 20 min au nord.`,
    whyEs: `Treviso esta a 30 min en tren de Venecia (4,50 EUR) y a menudo descrita como "Venecia sin la masificacion ni el olor". Tiene las mismas fachadas medievales pintadas, canales, mercado de pescado y cultura del aperitivo, pero recibe una fraccion de los 30 millones de visitantes anuales de Venecia. El paseo del rio Sile por el centro es totalmente llano y permite perros con correa, la Piazza dei Signori tolera los perros en la hora del aperitivo.`,
    whyPt: `Treviso fica a 30 min de comboio de Veneza (4,50 EUR) e e frequentemente descrita como "Veneza sem as multidoes e o cheiro". Tem as mesmas fachadas medievais pintadas, canais, mercado de peixe e cultura do aperitivo, mas recebe uma fracao dos 30 milhoes de visitantes anuais de Veneza. O passeio pelo rio Sile no centro e totalmente plano e aceita caes a trela, e a Piazza dei Signori e tolerante com caes na hora do aperitivo.`,
    hotelName: 'Hotel Continental Treviso',
    hotelEn: `Hotel Continental Treviso - 4-star central, river view, pets welcome at moderate fee.`,
    hotelFr: `Hotel Continental Treviso - 4 etoiles central, vue sur la riviere, animaux acceptes (supplement modere).`,
    hotelEs: `Hotel Continental Treviso - 4 estrellas central, vista al rio, mascotas admitidas (suplemento moderado).`,
    hotelPt: `Hotel Continental Treviso - 4 estrelas central, vista para o rio, animais aceites (taxa moderada).`,
  },
  {
    slug: 'olomouc',
    name: 'Olomouc',
    country: 'Czech Republic',
    destPath: '/destinations/olomouc',
    summerTemp: '24C',
    insteadOf: 'Prague',
    whyEn: `Olomouc is the second-largest historic city in Czechia and has a UNESCO-listed Holy Trinity Column and 6 baroque fountains that rival Prague's old town, but with virtually no tourist crowds. The Bezrucovy sady park is a flat 10-ha green space leash-welcome, trams accept leashed dogs free, and the city's university population means lively terraces that are universally dog-tolerant. Average hotel price is 60% of Prague for equivalent quality.`,
    whyFr: `Olomouc est la deuxieme plus grande ville historique de Tchequeie, avec une Colonne de la Sainte-Trinite classee a l'UNESCO et 6 fontaines baroques qui rivalisent avec la vieille ville de Prague, mais sans quasiment aucune foule touristique. Le parc Bezrucovy sady est un espace vert plat de 10 ha accueillant les chiens en laisse, les tramways acceptent les chiens en laisse gratuitement, et la population universitaire de la ville signifie des terrasses animees qui tolerent tous les chiens. Prix moyen de l'hotel a 60% de Prague pour une qualite equivalente.`,
    whyEs: `Olomouc es la segunda ciudad historica mas grande de Chequia y tiene una Columna de la Santisima Trinidad catalogada por la UNESCO y 6 fuentes barrocas que rivalizan con el casco antiguo de Praga, pero sin practicamente ningun turista. El parque Bezrucovy sady es un espacio verde llano de 10 ha que admite perros con correa, los tranvias aceptan perros con correa gratis, y la poblacion universitaria de la ciudad significa terrazas animadas que toleran universalmente los perros. Precio medio del hotel al 60% de Praga por calidad equivalente.`,
    whyPt: `Olomouc e a segunda maior cidade historica da Chequia e tem uma Coluna da Santissima Trindade classificada pela UNESCO e 6 fontes barrocas que rivalizam com a cidade velha de Praga, mas sem praticamente nenhuma multidao de turistas. O parque Bezrucovy sady e um espaco verde plano de 10 ha que aceita caes a trela, os elétricos aceitam caes a trela gratuitamente, e a populacao universitaria da cidade significa esplanadas animadas que toleram universalmente os caes. Preco medio do hotel a 60% de Praga por qualidade equivalente.`,
    hotelName: 'Hotel Trinity',
    hotelEn: `Hotel Trinity - boutique 4-star facing the Holy Trinity Column, dogs welcome at modest fee.`,
    hotelFr: `Hotel Trinity - boutique 4 etoiles face a la Colonne de la Sainte-Trinite, chiens acceptes (supplement modere).`,
    hotelEs: `Hotel Trinity - boutique 4 estrellas frente a la Columna de la Santisima Trinidad, perros admitidos (suplemento moderado).`,
    hotelPt: `Hotel Trinity - boutique 4 estrelas em frente a Coluna da Santissima Trindade, caes aceites (taxa moderada).`,
  },
  {
    slug: 'sifnos',
    name: 'Sifnos',
    country: 'Greece',
    destPath: '/destinations/sifnos',
    summerTemp: '27C',
    insteadOf: 'Santorini',
    whyEn: `Sifnos is a Cycladic island 3h by ferry from Athens (Piraeus) that has the same whitewashed cube architecture and Aegean views as Santorini but receives a tiny fraction of its 3 million annual visitors. The island is famous for its food (birthplace of Greek master chef Nikolaos Tselementes), has flat walking paths between villages, and most tavernas allow a leashed dog at an outdoor table. Dogs can board the Blue Star and Seajets ferries in a carrier (under 6kg in cabin, larger dogs on deck).`,
    whyFr: `Sifnos est une ile des Cyclades a 3h de ferry d'Athenes (Piree) qui possede la meme architecture cubique blanchie et les memes vues sur la mer Egee que Santorin, mais recoit une infime fraction de ses 3 millions de visiteurs annuels. L'ile est celebre pour sa gastronomie (lieu de naissance du grand chef grec Nikolaos Tselementes), a des chemins plats entre les villages, et la plupart des tavernes acceptent un chien en laisse en terrasse. Les chiens peuvent embarquer sur les ferries Blue Star et Seajets dans un sac transporteur (sous 6kg en cabine, chiens plus grands sur le pont).`,
    whyEs: `Sifnos es una isla de las Cicladas a 3h en ferri de Atenas (Pireo) que tiene la misma arquitectura de cubos blancos y vistas del Egeo que Santorini pero recibe una infima fraccion de sus 3 millones de visitantes anuales. La isla es famosa por su gastronomia (lugar de nacimiento del gran chef griego Nikolaos Tselementes), tiene caminos llanos entre pueblos, y la mayoria de las tabernas permiten un perro con correa en la terraza. Los perros pueden embarcar en los ferris Blue Star y Seajets en un transportin (menos de 6kg en cabina, perros mas grandes en cubierta).`,
    whyPt: `Sifnos e uma ilha das Ciclades a 3h de ferry de Atenas (Pireu) que tem a mesma arquitetura de cubos brancos e vistas do Mar Egeu que Santorini mas recebe uma fracao infima dos seus 3 milhoes de visitantes anuais. A ilha e famosa pela sua gastronomia (terra natal do grande chef grego Nikolaos Tselementes), tem caminhos planos entre aldeias, e a maioria das tabernas permite um cao a trela na esplanada. Os caes podem embarcar nos ferries Blue Star e Seajets num transportador (abaixo de 6kg em cabine, caes maiores no convés).`,
    hotelName: 'Petali Village Hotel',
    hotelEn: `Petali Village Hotel in Apollonia - traditional village hotel, dogs accepted in certain rooms on request.`,
    hotelFr: `Petali Village Hotel a Apollonia - hotel de village traditionnel, chiens acceptes dans certaines chambres sur demande.`,
    hotelEs: `Petali Village Hotel en Apollonia - hotel de pueblo tradicional, perros admitidos en ciertas habitaciones a peticion.`,
    hotelPt: `Petali Village Hotel em Apollonia - hotel de aldeia tradicional, caes aceites em certos quartos a pedido.`,
  },
  {
    slug: 'sibiu',
    name: 'Sibiu',
    country: 'Romania',
    destPath: '/destinations/sibiu',
    summerTemp: '25C',
    insteadOf: 'Budapest',
    whyEn: `Sibiu is Transylvania's most beautiful Saxon city and a former European Capital of Culture that remains genuinely affordable and crowd-free compared to Budapest. The three central squares are connected by medieval stairs and passages fully walkable with a leashed dog, the Astra Open-Air Museum 3km south is a 96-ha park accepting leashed dogs, and the city's culinary scene allows dogs on terraces everywhere. Prices are roughly 50% of Budapest for equivalent accommodation.`,
    whyFr: `Sibiu est la plus belle ville saxonne de Transylvanie et une ancienne Capitale Europeenne de la Culture qui reste genuinement abordable et sans foule par rapport a Budapest. Les trois places centrales sont reliees par des escaliers et passages medievaux entierement praticables avec un chien en laisse, le musee de plein air Astra a 3km au sud est un parc de 96 ha accueillant les chiens en laisse, et la scene culinaire de la ville accepte les chiens en terrasse partout. Les prix sont environ 50% de Budapest pour un hebergement equivalent.`,
    whyEs: `Sibiu es la ciudad sajona mas bella de Transilvania y una antigua Capital Europea de la Cultura que sigue siendo genuinamente asequible y sin masificacion en comparacion con Budapest. Las tres plazas centrales estan conectadas por escaleras y pasajes medievales totalmente transitables con un perro con correa, el Museo al Aire Libre Astra a 3km al sur es un parque de 96 ha que acepta perros con correa, y la escena culinaria de la ciudad permite perros en terrazas en todas partes. Los precios son aproximadamente el 50% de Budapest para alojamiento equivalente.`,
    whyPt: `Sibiu e a mais bela cidade saxonica da Transilvania e uma antiga Capital Europeia da Cultura que continua genuinamente acessivel e sem multidoes em comparacao com Budapeste. As tres pracas centrais estao ligadas por escadas e passagens medievais totalmente percorriveis com um cao a trela, o Museu ao Ar Livre Astra a 3km a sul e um parque de 96 ha que aceita caes a trela, e a cena culinaria da cidade permite caes em esplanadas em todo o lado. Os precos sao aproximadamente 50% de Budapeste para alojamento equivalente.`,
    hotelName: 'Hotel Imparatul Romanilor',
    hotelEn: `Hotel Imparatul Romanilor - 4-star historic grand hotel on the main square, dogs welcome at modest fee.`,
    hotelFr: `Hotel Imparatul Romanilor - grand hotel historique 4 etoiles sur la place principale, chiens acceptes (supplement modere).`,
    hotelEs: `Hotel Imparatul Romanilor - gran hotel historico de 4 estrellas en la plaza principal, perros admitidos (suplemento moderado).`,
    hotelPt: `Hotel Imparatul Romanilor - grande hotel historico de 4 estrelas na praca principal, caes aceites (taxa moderada).`,
  },
  {
    slug: 'orvieto',
    name: 'Orvieto',
    country: 'Italy',
    destPath: '/destinations/orvieto',
    summerTemp: '29C',
    insteadOf: 'Rome',
    whyEn: `Orvieto sits on a volcanic tufa plateau 90 min by direct train from Rome (10 EUR) and its Gothic cathedral is considered one of Italy's finest. The clifftop town is entirely pedestrianised, receives a fraction of Rome's 15 million annual visitors, and can be covered in half a day with a leashed dog on the stone-paved centro storico. The surrounding Umbrian hills are laced with wine-estate paths open to dogs. Day-trip from Rome for brachycephalic breeds is ideal: get there before 10h, leave before 14h to avoid midday heat.`,
    whyFr: `Orvieto est perchee sur un plateau de tuf volcanique a 90 min en train direct de Rome (10 EUR) et sa cathedrale gothique est consideree comme l'une des plus belles d'Italie. La ville perchee est entierement pietonniere, recoit une fraction des 15 millions de visiteurs annuels de Rome, et peut etre parcourue en une demi-journee avec un chien en laisse sur le centro storico pave. Les collines ombriennes environnantes sont parsemees de chemins de domaines viticoles ouverts aux chiens.`,
    whyEs: `Orvieto se asienta sobre una meseta de toba volcanica a 90 min en tren directo desde Roma (10 EUR) y su catedral gotica es considerada una de las mejores de Italia. La ciudad encaramada en el acantilado es totalmente peatonal, recibe una fraccion de los 15 millones de visitantes anuales de Roma, y puede recorrerse en medio dia con un perro con correa por el centro storico empedrado. Las colinas umbras circundantes estan sembradas de caminos de fincas vinicolas abiertos a los perros.`,
    whyPt: `Orvieto assenta num planalto de tufo vulcânico a 90 min de comboio direto de Roma (10 EUR) e a sua catedral gotica e considerada uma das mais belas de Italia. A cidade no topo do rochedo e totalmente pedestre, recebe uma fracao dos 15 milhoes de visitantes anuais de Roma, e pode ser percorrida em meio dia com um cao a trela no centro storico pavimentado. As colinas umbrinas circundantes estao repletas de caminhos de quintas vinicolas abertos a caes.`,
    hotelName: 'Hotel Maitani',
    hotelEn: `Hotel Maitani - 3-star facing the cathedral, dogs accepted at modest fee.`,
    hotelFr: `Hotel Maitani - 3 etoiles face a la cathedrale, chiens acceptes (supplement modere).`,
    hotelEs: `Hotel Maitani - 3 estrellas frente a la catedral, perros admitidos (suplemento moderado).`,
    hotelPt: `Hotel Maitani - 3 estrelas em frente a catedral, caes aceites (taxa moderada).`,
  },
  {
    slug: 'provins',
    name: 'Provins',
    country: 'France',
    destPath: '/destinations/provins',
    summerTemp: '25C',
    insteadOf: 'Paris',
    whyEn: `Provins is 1h15 from Paris Gare de l'Est by train (14 EUR) and is one of France's best-preserved medieval towns (UNESCO listed) with a 12th-century fortified upper town, ramparts walkable with a leashed dog, and the famous Jardin des Roses (2000+ varieties, open June-Sept, dogs on leash welcome on the paths). It receives day-trippers but empties completely by 17h. On summer weekends, medieval shows take place in the Grange aux Dimes with dogs tolerated outside the show perimeter.`,
    whyFr: `Provins est a 1h15 de Paris Gare de l'Est en train (14 EUR) et est l'une des meilleures villes medievales conservees de France (classee UNESCO) avec une haute ville fortifiee du XIIe siecle, des remparts praticables avec un chien en laisse, et le fameux Jardin des Roses (2000+ varietes, ouvert juin-sept, chiens en laisse bienvenus sur les chemins). Elle recoit des excursionnistes mais se vide completement apres 17h. Les week-ends d'ete, des spectacles medievaux ont lieu dans la Grange aux Dimes avec les chiens toleres en dehors du perimetre du spectacle.`,
    whyEs: `Provins esta a 1h15 de Paris Gare de l'Est en tren (14 EUR) y es una de las ciudades medievales mejor conservadas de Francia (Patrimonio UNESCO) con una ciudad alta fortificada del siglo XII, murallas transitables con un perro con correa, y el famoso Jardin des Roses (mas de 2000 variedades, abierto junio-sept, perros con correa bienvenidos en los caminos). Recibe excursionistas pero se vacia completamente a las 17h. Los fines de semana de verano, espectaculos medievales tienen lugar en la Grange aux Dimes con perros tolerados fuera del perimetro del espectaculo.`,
    whyPt: `Provins fica a 1h15 de Paris Gare de l'Est de comboio (14 EUR) e e uma das melhores cidades medievais conservadas de Franca (classificada pela UNESCO) com uma alta cidade fortificada do seculo XII, muralhas percorriveis com um cao a trela, e o famoso Jardin des Roses (mais de 2000 variedades, aberto junho-set, caes a trela bem-vindos nos caminhos). Recebe excursionistas mas fica completamente vazia apos as 17h. Nos fins de semana de verao, espetaculos medievais decorrem na Grange aux Dimes com caes tolerados fora do perimetro do espetaculo.`,
    hotelName: 'Hotel de Provins',
    hotelEn: `Hotel de Provins - 3-star just below the ramparts, dogs welcome, private parking.`,
    hotelFr: `Hotel de Provins - 3 etoiles juste sous les remparts, chiens acceptes, parking prive.`,
    hotelEs: `Hotel de Provins - 3 estrellas justo bajo las murallas, perros admitidos, aparcamiento privado.`,
    hotelPt: `Hotel de Provins - 3 estrelas mesmo abaixo das muralhas, caes aceites, estacionamento privado.`,
  },
  {
    slug: 'bad-ischl',
    name: 'Bad Ischl',
    country: 'Austria',
    destPath: '/destinations/bad-ischl',
    summerTemp: '23C',
    insteadOf: 'Salzburg',
    whyEn: `Bad Ischl is the former Imperial summer residence of Franz Joseph I, 1h from Salzburg by regional train (12 EUR), and was named European Capital of Culture 2024. The Kaiservilla park allows leashed dogs on the grounds perimeter, the Traun river walk is flat and completely dog-accessible, and the Salzkammergut lakes region begins directly from the town. Crowds are a fraction of Salzburg even in peak summer.`,
    whyFr: `Bad Ischl est l'ancienne residence estivale imperiale de Francois-Joseph Ier, a 1h de Salzbourg en train regional (12 EUR), et a ete nommee Capitale Europeenne de la Culture 2024. Le parc de la Kaiservilla autorise les chiens en laisse sur le perimetre du domaine, la promenade le long de la riviere Traun est plate et entierement accessible aux chiens, et la region des lacs du Salzkammergut commence directement depuis la ville. La foule est une fraction de celle de Salzbourg meme en haute saison estivale.`,
    whyEs: `Bad Ischl es la antigua residencia imperial de verano de Francisco Jose I, a 1h de Salzburgo en tren regional (12 EUR), y fue nombrada Capital Europea de la Cultura 2024. El parque de la Kaiservilla permite perros con correa en el perimetro de los terrenos, el paseo del rio Traun es llano y completamente accesible para perros, y la region de lagos del Salzkammergut comienza directamente desde la ciudad. La masificacion es una fraccion de la de Salzburgo incluso en pleno verano.`,
    whyPt: `Bad Ischl e a antiga residencia imperial de verao de Francisco Jose I, a 1h de Salzburgo de comboio regional (12 EUR), e foi nomeada Capital Europeia da Cultura 2024. O parque da Kaiservilla permite caes a trela no perimetro dos terrenos, o passeio pelo rio Traun e plano e completamente acessivel a caes, e a regiao dos lagos do Salzkammergut comeca diretamente da cidade. As multidoes sao uma fracao das de Salzburgo mesmo no pico do verao.`,
    hotelName: 'Hotel Austria Bad Ischl',
    hotelEn: `Hotel Austria Bad Ischl - traditional 4-star on the Esplanade, dogs welcome at modest fee.`,
    hotelFr: `Hotel Austria Bad Ischl - 4 etoiles traditionnel sur l'Esplanade, chiens acceptes (supplement modere).`,
    hotelEs: `Hotel Austria Bad Ischl - 4 estrellas tradicional en el Esplanade, perros admitidos (suplemento moderado).`,
    hotelPt: `Hotel Austria Bad Ischl - 4 estrelas tradicional na Esplanade, caes aceites (taxa moderada).`,
  },
]

const COPY = {
  en: {
    eyebrow: 'ANTI-OVERTOURISM 2026 · PET TRAVEL',
    title: `Dog-Friendly Alternatives to Europe's Most Overcrowded Cities: 8 Quieter Picks (2026)`,
    intro: `Barcelona protests, Venice tourist gates, Santorini visitor caps: the anti-overtourism movement of 2026 is forcing travellers to reconsider the big icons. Dog owners actually have a hidden advantage here: dogs are banned from many overcrowded iconic sites anyway (Alhambra, Colosseum, Acropolis), so you lose nothing by skipping them. Meanwhile, smaller and less-visited cities almost always have more dog-friendly cafes, calmer streets, and lower pet fees. This guide picks 8 quieter European alternatives that match or exceed their famous counterparts, for any dog owner tired of crowds.`,
    pickHeading: '8 quieter alternatives (with equivalent charm)',
    whyHere: 'Why here',
    hotelLabel: 'Where to stay',
    seeDestCta: 'Full city guide →',
    hotelCta: 'See availability →',
    summerLabel: 'Summer avg high',
    insteadOfLabel: 'Instead of',
    practicalHeading: 'Practical guide for anti-overtourism travel with a dog',
    practical: [
      { h: 'Why overcrowding is actually worse with a dog', p: `The iconic sites that draw the biggest crowds (Sagrada Familia, Colosseum, Alhambra, Acropolis) all ban dogs from their grounds. This means you are already queuing for hours and then leaving your dog with a stranger or alone in a hot car. Pavements in tourist-saturated areas are jammed with prams and luggage trolleys, leaving no room for a dog. Heat-island effect in dense tourist zones pushes asphalt temperatures 5-8C above the city average, which is a real risk for paw pads. Quieter alternatives remove all these frictions in one move.` },
      { h: 'Train connections to all 8 picks', p: `Girona: Barcelona Sants to Girona by Rodalies or regional train, 1h, 12 EUR. Treviso: Venice Santa Lucia to Treviso Centrale, 30 min, 4.50 EUR. Olomouc: Prague to Olomouc by RegioJet or CD, 2h10, 9-15 EUR. Sifnos: Athens Piraeus port by Blue Star or Seajets ferry, 3h fast ferry or 5h conventional. Sibiu: Bucharest to Sibiu by CFR, 3h40 direct. Orvieto: Rome Termini to Orvieto by Trenitalia, 1h15, 10 EUR. Provins: Paris Gare de l'Est by Transilien P, 1h15, 14 EUR return. Bad Ischl: Salzburg to Bad Ischl by OBB regional, 1h10, 12 EUR.` },
      { h: 'How to find dog-tolerant terraces in less-touristy cities', p: `In overtouristed cities, terrace staff are often too rushed to welcome a dog properly and some restaurants have outright banned them to manage throughput. In smaller cities with a local clientele, dog-tolerant terraces are the norm rather than the exception. Practical tips: look for "dogs welcome" or "animaux acceptes" in Google Maps reviews, arrive before the local lunch rush (12h-12h30), choose shaded terraces where your dog can settle under the chair, and avoid terraces next to souvenir market stalls where foot traffic is constant.` },
      { h: 'The overtourism calendar: when to travel', p: `Peak overcrowding in Barcelona, Venice, Santorini, Rome, Paris, Budapest and Salzburg runs from mid-June to late August, with July 14-August 15 being worst. All 8 alternatives in this guide are significantly calmer in the same window, and dramatically quieter in May-June and September, when temperatures are also easier for a dog. If you have the flexibility, September in Girona, Treviso or Sibiu is arguably the best time: 22-25C, empty streets by the time you arrive, and local harvest festivals that are universally dog-on-terrace affairs.` },
    ],
    faqHeading: 'Frequently asked questions',
    faqs: [
      { q: 'Are these alternatives actually comparable to the famous cities?', a: `For a dog owner specifically, several of them are better than their famous counterpart, not just comparable. Treviso has the same canal-and-medieval-facade atmosphere as Venice without the bridge-steps that are genuinely difficult for large dogs, without the tourist bottleneck crowds, and with flat river walks you cannot find in Venice's island layout. Girona's Gothic quarter and the Onyar river banks are architecturally on par with Barcelona's Barri Gotic, but you can actually walk your dog in peace. Olomouc's baroque fountains are objectively stunning and the city is so quiet mid-week that you feel like you have it to yourself.` },
      { q: 'What happened to dogs in Venice? Are they allowed?', a: `Dogs are technically allowed in Venice with a leash in most public areas, but the practical reality is genuinely difficult. The city's smooth stone bridges (over 400 of them) have no grips and can be slippery for large or older dogs. In peak summer the tourist density on the main routes is so high that you are effectively navigating a crowd with a dog on a leash, which is stressful for the animal. The vaporetti (water buses) accept small dogs in a carrier at a reduced fare but large dogs must wait for a taxi boat at significantly higher cost. Treviso gives you the same Venetian aesthetic experience minus all these frictions.` },
      { q: 'Is Sifnos reachable without a plane?', a: `Yes, entirely by land and sea. From most of Western Europe the route is: drive or train to Athens (or fly to Athens), then taxi or metro to Piraeus port, then Blue Star Ferries or Seajets to Sifnos. The fast Seajets catamaran does the crossing in under 3 hours. There is also an overnight conventional ferry option leaving Piraeus at 23h and arriving at 5h, which works well for dogs because the crossing happens during sleeping hours. Bring a mat and water for deck travel if your dog is over 6kg.` },
      { q: 'Which of these 8 is the most underrated?', a: `Olomouc, without question. It is genuinely unknown to most Western Europeans despite having a UNESCO monument, six baroque fountains, a lively university city atmosphere, a covered food market, and hotel prices that are 60% below Prague. The city's Czech Rail connections make it reachable from Vienna in 2h40 or from Prague in 2h10. Its dog culture is relaxed: leashed dogs ride trams free, most terrace restaurants welcome them, and the Bezrucovy sady park is a proper green space in the city centre. If you have been to Prague three times and find it overcrowded, Olomouc is the obvious next choice.` },
    ],
    relatedHeading: 'See also',
  },
  fr: {
    eyebrow: 'ANTI-SURTOURISME 2026 · VOYAGE AVEC CHIEN',
    title: `Alternatives pet-friendly aux villes europeennes surpeuplees : 8 destinations moins bondees (2026)`,
    intro: `Manifestations a Barcelone, portiques touristiques a Venise, quotas de visiteurs a Santorin: le mouvement anti-surtourisme de 2026 force les voyageurs a reconsiderer les grandes icones. Les proprietaires de chiens ont en realite un avantage cache ici: les chiens sont de toute facon interdits sur de nombreux sites iconiques bondees (Alhambra, Colisee, Acropole), donc vous ne perdez rien en les evitant. Les villes plus petites et moins visitees ont presque toujours plus de cafes dog-friendly, des rues plus calmes, et des frais animaux plus bas. Ce guide selectionne 8 alternatives europeennes plus calmes qui egalisent ou depassent leurs homologues celebres, pour tout proprietaire de chien fatigue des foules.`,
    pickHeading: '8 alternatives plus calmes (avec le meme charme)',
    whyHere: 'Pourquoi ici',
    hotelLabel: 'Ou dormir',
    seeDestCta: 'Guide complet →',
    hotelCta: 'Voir les disponibilites →',
    summerLabel: 'Max ete',
    insteadOfLabel: 'Alternative a',
    practicalHeading: 'Guide pratique anti-surtourisme en voyage avec chien',
    practical: [
      { h: 'Pourquoi la surpopulation est pire avec un chien', p: `Les sites iconiques qui drainent les plus grandes foules (Sagrada Familia, Colisee, Alhambra, Acropole) interdisent tous les chiens sur leurs domaines. Cela signifie que vous faites la queue pendant des heures pour ensuite laisser votre chien avec un inconnu ou seul dans une voiture chaude. Les trottoirs dans les zones saturees de touristes sont encombrés de poussettes et de chariots a bagages, ne laissant aucune place pour un chien. L'effet ilot de chaleur dans les zones touristiques denses pousse les temperatures du bitume 5-8C au-dessus de la moyenne de la ville, ce qui est un risque reel pour les coussinets. Les alternatives plus calmes eliminant toutes ces frictions en un seul choix.` },
      { h: 'Connexions en train vers les 8 destinations', p: `Girone: Barcelone Sants a Girone en Rodalies ou regional, 1h, 12 EUR. Trevise: Venise Santa Lucia a Trevise Centrale, 30 min, 4,50 EUR. Olomouc: Prague a Olomouc par RegioJet ou CD, 2h10, 9-15 EUR. Sifnos: port du Piree a Athenes par Blue Star ou Seajets, 3h ferry rapide ou 5h conventionnel. Sibiu: Bucarest a Sibiu par CFR, 3h40 direct. Orvieto: Rome Termini a Orvieto par Trenitalia, 1h15, 10 EUR. Provins: Paris Gare de l'Est par Transilien P, 1h15, 14 EUR aller-retour. Bad Ischl: Salzbourg a Bad Ischl par OBB regional, 1h10, 12 EUR.` },
      { h: 'Trouver des terrasses tolerantes aux chiens dans les villes moins touristiques', p: `Dans les villes surpeuplees de touristes, le personnel des terrasses est souvent trop presse pour bien accueillir un chien et certains restaurants les ont carrément interdits pour gerer le flux. Dans les petites villes a clientele locale, les terrasses tolerantes aux chiens sont la norme plutot que l'exception. Conseils pratiques: cherchez "chiens bienvenus" dans les avis Google Maps, arrivez avant le rush du dejeuner local (12h-12h30), choisissez des terrasses ombragees ou votre chien peut s'installer sous la chaise, et evitez les terrasses a cote des etals de marches de souvenirs ou la circulation pietons est constante.` },
      { h: 'Le calendrier du surtourisme: quand voyager', p: `Le pic de surpopulation a Barcelone, Venise, Santorin, Rome, Paris, Budapest et Salzbourg se situe de mi-juin a fin aout, avec le 14 juillet-15 aout comme moment le pire. Les 8 alternatives de ce guide sont sensiblement plus calmes dans la meme periode, et dramatiquement plus tranquilles en mai-juin et septembre, quand les temperatures sont aussi plus faciles pour un chien. Si vous avez la flexibilite, septembre a Girone, Trevise ou Sibiu est sans doute le meilleur moment: 22-25C, rues vides des votre arrivee, et fetes locales de la recolte qui sont universellement des affaires chien-en-terrasse.` },
    ],
    faqHeading: 'Questions frequentes',
    faqs: [
      { q: 'Ces alternatives sont-elles vraiment comparables aux villes celebres?', a: `Pour un proprietaire de chien specifiquement, plusieurs sont meilleures que leur homologue celebre, pas seulement comparables. Trevise a la meme atmosphere de canaux et facades medievales que Venise sans les marches de ponts qui sont reellement difficiles pour les grands chiens, sans les foules entonnoir touristiques, et avec des promenades de riviere plates introuvables dans la configuration insulaire de Venise. Le quartier gothique de Girone et les berges de l'Onyar sont architecturalement a la hauteur du Barri Gotic de Barcelone, mais vous pouvez reellement promener votre chien tranquillement. Les fontaines baroques d'Olomouc sont objectivement superbes et la ville est si calme en semaine qu'on a l'impression de l'avoir pour soi.` },
      { q: 'Que se passe-t-il avec les chiens a Venise? Sont-ils autorises?', a: `Les chiens sont techniquement autorises a Venise en laisse dans la plupart des espaces publics, mais la realite pratique est vraiment difficile. Les ponts en pierre lisse de la ville (plus de 400) n'ont pas de prises et peuvent etre glissants pour les grands chiens ou les chiens ages. En plein ete le densite touristique sur les routes principales est si elevee que vous naviguez effectivement dans une foule avec un chien en laisse, ce qui est stressant pour l'animal. Les vaporetti (bus de l'eau) acceptent les petits chiens dans un transporteur a tarif reduit mais les grands chiens doivent attendre un taxi-bateau a un cout nettement plus eleve. Trevise offre la meme experience esthetique venitienne sans toutes ces frictions.` },
      { q: 'Sifnos est-elle accessible sans avion?', a: `Oui, entierement par terre et mer. Depuis la plupart de l'Europe occidentale, l'itineraire est: conduire ou prendre le train jusqu'a Athenes (ou voler jusqu'a Athenes), puis taxi ou metro jusqu'au port du Piree, puis Blue Star Ferries ou Seajets jusqu'a Sifnos. Le catamaran rapide Seajets fait la traversee en moins de 3 heures. Il existe aussi une option de ferry conventionnel de nuit partant du Piree a 23h et arrivant a 5h, qui fonctionne bien pour les chiens car la traversee se deroule pendant les heures de sommeil. Apportez un tapis et de l'eau pour le voyage sur le pont si votre chien fait plus de 6kg.` },
      { q: 'Laquelle des 8 est la plus sous-estimee?', a: `Olomouc, sans aucun doute. Elle est genuinement inconnue de la plupart des Europeens occidentaux malgre un monument UNESCO, six fontaines baroques, une atmosphere de ville universitaire animee, un marche couvert et des prix d'hotel a 60% en dessous de Prague. Les connexions Czech Rail rendent la ville accessible depuis Vienne en 2h40 ou depuis Prague en 2h10. Sa culture canine est detendue: les chiens en laisse montent dans les tramways gratuitement, la plupart des restaurants en terrasse les accueillent, et le parc Bezrucovy sady est un vrai espace vert en centre-ville. Si vous etes alle a Prague trois fois et la trouvez surpeuplee, Olomouc est le choix evident suivant.` },
    ],
    relatedHeading: 'Voir aussi',
  },
  es: {
    eyebrow: 'ANTI-MASIFICACION 2026 · VIAJE CON MASCOTA',
    title: `Alternativas pet-friendly a las ciudades europeas masificadas: 8 destinos menos saturados (2026)`,
    intro: `Protestas en Barcelona, puertas turisticas en Venecia, cuotas de visitantes en Santorini: el movimiento anti-masificacion de 2026 esta obligando a los viajeros a reconsiderar los grandes iconos. Los duenos de perros tienen en realidad una ventaja oculta aqui: los perros ya estan prohibidos en muchos sitios iconicos masificados (Alhambra, Coliseo, Acropolis), asi que no pierdes nada al saltartelos. Mientras tanto, las ciudades mas pequenas y menos visitadas casi siempre tienen mas cafes pet-friendly, calles mas tranquilas y tasas por mascotas mas bajas. Esta guia selecciona 8 alternativas europeas mas tranquilas que igualan o superan a sus homologos famosos, para cualquier dueno de perro cansado de las multitudes.`,
    pickHeading: '8 alternativas mas tranquilas (con el mismo encanto)',
    whyHere: 'Por que aqui',
    hotelLabel: 'Donde alojarse',
    seeDestCta: 'Guia completa →',
    hotelCta: 'Ver disponibilidad →',
    summerLabel: 'Max verano',
    insteadOfLabel: 'En lugar de',
    practicalHeading: 'Guia practica de viaje anti-masificacion con perro',
    practical: [
      { h: 'Por que la masificacion es peor con un perro', p: `Los sitios iconicos que atraen a las multitudes mas grandes (Sagrada Familia, Coliseo, Alhambra, Acropolis) prohiben todos los perros en sus recintos. Esto significa que haces cola durante horas para luego dejar tu perro con un desconocido o solo en un coche caliente. Las aceras en las zonas saturadas de turistas estan abarrotadas de cochecitos y trolleys de equipaje, sin dejar espacio para un perro. El efecto isla de calor en las zonas turisticas densas empuja las temperaturas del asfalto 5-8C por encima de la media de la ciudad, lo que supone un riesgo real para las almohadillas. Las alternativas mas tranquilas eliminan todas estas fricciones de una sola vez.` },
      { h: 'Conexiones en tren a las 8 destinations', p: `Girona: Barcelona Sants a Girona por Rodalies o regional, 1h, 12 EUR. Treviso: Venecia Santa Lucia a Treviso Centrale, 30 min, 4,50 EUR. Olomouc: Praga a Olomouc por RegioJet o CD, 2h10, 9-15 EUR. Sifnos: puerto de El Pireo de Atenas por Blue Star o Seajets, 3h ferry rapido o 5h convencional. Sibiu: Bucarest a Sibiu por CFR, 3h40 directo. Orvieto: Roma Termini a Orvieto por Trenitalia, 1h15, 10 EUR. Provins: Paris Gare de l'Est por Transilien P, 1h15, 14 EUR ida y vuelta. Bad Ischl: Salzburgo a Bad Ischl por OBB regional, 1h10, 12 EUR.` },
      { h: 'Como encontrar terrazas tolerantes con perros en ciudades menos turisticas', p: `En las ciudades masificadas de turistas, el personal de las terrazas suele estar demasiado ajetreado para recibir bien a un perro y algunos restaurantes los han prohibido directamente para gestionar el flujo. En ciudades mas pequenas con clientela local, las terrazas tolerantes con perros son la norma mas que la excepcion. Consejos practicos: busca "perros bienvenidos" en las resenas de Google Maps, llega antes de la hora del almuerzo local (12h-12h30), elige terrazas con sombra donde tu perro pueda instalarse bajo la silla, y evita las terrazas junto a puestos de mercados de souvenirs donde el trafico de peatones es constante.` },
      { h: 'El calendario de la masificacion: cuando viajar', p: `El pico de masificacion en Barcelona, Venecia, Santorini, Roma, Paris, Budapest y Salzburgo va de mediados de junio a finales de agosto, con el 14 de julio al 15 de agosto como el momento mas critico. Las 8 alternativas de esta guia son significativamente mas tranquilas en la misma ventana, y dramaticamente mas quietas en mayo-junio y septiembre, cuando las temperaturas tambien son mas faciles para un perro. Si tienes flexibilidad, septiembre en Girona, Treviso o Sibiu es posiblemente el mejor momento: 22-25C, calles vacias cuando llegas, y fiestas locales de la cosecha que son universalmente asuntos de perro-en-terraza.` },
    ],
    faqHeading: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Son estas alternativas realmente comparables a las ciudades famosas?', a: `Para un dueno de perro especificamente, varias son mejores que su homologa famosa, no solo comparables. Treviso tiene la misma atmosfera de canales y fachadas medievales que Venecia sin los escalones de los puentes que son realmente dificiles para los perros grandes, sin las multitudes embudo turisticas, y con paseos de rio llanos imposibles de encontrar en la configuracion insular de Venecia. El barrio gotico de Girona y las orillas del Onyar son arquitectonicamente a la par del Barri Gotic de Barcelona, pero puedes realmente pasear a tu perro en paz. Las fuentes barrocas de Olomouc son objetivamente impresionantes y la ciudad es tan tranquila entre semana que parece que la tienes para ti.` },
      { q: '¿Que paso con los perros en Venecia? ¿Estan permitidos?', a: `Los perros estan tecnicamente permitidos en Venecia con correa en la mayoria de espacios publicos, pero la realidad practica es genuinamente dificil. Los puentes de piedra lisa de la ciudad (mas de 400) no tienen agarre y pueden ser resbaladizos para perros grandes o mayores. En pleno verano la densidad turistica en las rutas principales es tan alta que basicamente navegas entre multitudes con un perro con correa, lo cual es estresante para el animal. Los vaporetti (autobuses acuaticos) aceptan perros pequenos en transportin a tarifa reducida pero los perros grandes deben esperar un taxi acuatico a un coste significativamente mayor. Treviso ofrece la misma experiencia estetica veneciana sin todas estas fricciones.` },
      { q: '¿Es Sifnos accesible sin avion?', a: `Si, enteramente por tierra y mar. Desde la mayor parte de Europa occidental la ruta es: conducir o tomar el tren hasta Atenas (o volar a Atenas), luego taxi o metro al puerto de El Pireo, luego Blue Star Ferries o Seajets a Sifnos. El catamaran rapido Seajets hace la travesia en menos de 3 horas. Tambien existe una opcion de ferry convencional nocturno que sale de El Pireo a las 23h y llega a las 5h, lo cual funciona bien para los perros porque la travesia ocurre durante las horas de sueno. Lleva una manta y agua para el viaje en cubierta si tu perro pesa mas de 6kg.` },
      { q: '¿Cual de estas 8 es la mas infravalorada?', a: `Olomouc, sin duda. Es genuinamente desconocida para la mayoria de los europeos occidentales a pesar de tener un monumento UNESCO, seis fuentes barrocas, un ambiente de ciudad universitaria animada, un mercado cubierto y precios de hotel un 60% por debajo de Praga. Las conexiones de Czech Rail la hacen accesible desde Viena en 2h40 o desde Praga en 2h10. Su cultura canina es relajada: los perros con correa viajan en tranvia gratis, la mayoria de los restaurantes con terraza los reciben, y el parque Bezrucovy sady es un autentico espacio verde en el centro de la ciudad. Si has ido a Praga tres veces y la encuentras masificada, Olomouc es la siguiente eleccion obvia.` },
    ],
    relatedHeading: 'Ver tambien',
  },
  pt: {
    eyebrow: 'ANTI-SOBRETURISMO 2026 · VIAGEM COM ANIMAL',
    title: `Alternativas pet-friendly as cidades europeias superlotadas: 8 destinos menos saturados (2026)`,
    intro: `Protestos em Barcelona, portas turisticas em Veneza, quotas de visitantes em Santorini: o movimento anti-sobreturismo de 2026 esta a forcar os viajantes a reconsiderar os grandes icones. Os donos de caes tem na verdade uma vantagem oculta aqui: os caes ja estao proibidos em muitos sitios iconicos superlotados (Alhambra, Coliseu, Acropole), por isso nao perdem nada ao evita-los. Entretanto, as cidades mais pequenas e menos visitadas tem quase sempre mais cafes dog-friendly, ruas mais calmas e taxas para animais mais baixas. Este guia seleciona 8 alternativas europeias mais calmas que igualam ou superam os seus homologos famosos, para qualquer dono de cao cansado das multidoes.`,
    pickHeading: '8 alternativas mais calmas (com o mesmo charme)',
    whyHere: 'Porquê aqui',
    hotelLabel: 'Onde ficar',
    seeDestCta: 'Guia completo →',
    hotelCta: 'Ver disponibilidade →',
    summerLabel: 'Max verao',
    insteadOfLabel: 'Em vez de',
    practicalHeading: 'Guia pratico de viagem anti-sobreturismo com cao',
    practical: [
      { h: 'Por que a superlotacao e pior com um cao', p: `Os sitios iconicos que atraem as maiores multidoes (Sagrada Familia, Coliseu, Alhambra, Acropole) proibem todos os caes nas suas instalacoes. Isto significa que esta horas em fila para depois deixar o seu cao com um estranho ou sozinho num carro quente. Os passeios em zonas saturadas de turistas estao entupidos de carrinhos de bebe e carrinhos de bagagem, sem espaco para um cao. O efeito ilha de calor nas zonas turisticas densas empurra as temperaturas do asfalto 5-8C acima da media da cidade, o que e um risco real para as almofadas das patas. As alternativas mais calmas removem todas estas fricoes numa so decisao.` },
      { h: 'Ligacoes de comboio para os 8 destinos', p: `Girona: Barcelona Sants a Girona por Rodalies ou regional, 1h, 12 EUR. Treviso: Veneza Santa Lucia a Treviso Centrale, 30 min, 4,50 EUR. Olomouc: Praga a Olomouc por RegioJet ou CD, 2h10, 9-15 EUR. Sifnos: porto de Pireu de Atenas por Blue Star ou Seajets, 3h ferry rapido ou 5h convencional. Sibiu: Bucareste a Sibiu por CFR, 3h40 direto. Orvieto: Roma Termini a Orvieto por Trenitalia, 1h15, 10 EUR. Provins: Paris Gare de l'Est por Transilien P, 1h15, 14 EUR ida e volta. Bad Ischl: Salzburgo a Bad Ischl por OBB regional, 1h10, 12 EUR.` },
      { h: 'Como encontrar esplanadas tolerantes com caes em cidades menos turisticas', p: `Nas cidades saturadas de turistas, o pessoal das esplanadas esta muitas vezes demasiado ocupado para receber bem um cao e alguns restaurantes proibiram-nos diretamente para gerir o fluxo. Em cidades mais pequenas com clientela local, as esplanadas tolerantes com caes sao a norma e nao a excecao. Dicas praticas: procure "caes bem-vindos" nas avaliacoes do Google Maps, chegue antes da hora de almoco local (12h-12h30), escolha esplanadas com sombra onde o seu cao possa instalar-se sob a cadeira, e evite esplanadas junto a bancas de mercados de souvenirs onde o trafego de peoes e constante.` },
      { h: 'O calendario do sobreturismo: quando viajar', p: `O pico de superlotacao em Barcelona, Veneza, Santorini, Roma, Paris, Budapeste e Salzburgo vai de meados de junho a finais de agosto, com 14 de julho a 15 de agosto como o pior momento. As 8 alternativas deste guia sao significativamente mais calmas na mesma janela, e dramaticamente mais tranquilas em maio-junho e setembro, quando as temperaturas tambem sao mais faceis para um cao. Se tiver flexibilidade, setembro em Girona, Treviso ou Sibiu e possivelmente o melhor momento: 22-25C, ruas vazias quando chega, e festas locais de colheita que sao universalmente eventos de cao-em-esplanada.` },
    ],
    faqHeading: 'Perguntas frequentes',
    faqs: [
      { q: 'Estas alternativas sao realmente comparaveis as cidades famosas?', a: `Para um dono de cao especificamente, varias sao melhores do que o seu homologo famoso, nao apenas comparaveis. Treviso tem a mesma atmosfera de canais e fachadas medievais que Veneza sem os degraus das pontes que sao genuinamente dificeis para caes grandes, sem as multidoes engarrafadas de turistas, e com passeios de rio planos impossveis de encontrar na configuracao insular de Veneza. O bairro gotico de Girona e as margens do Onyar sao arquitetonicamente ao nivel do Barri Gotic de Barcelona, mas pode realmente passear o seu cao em paz. As fontes barrocas de Olomouc sao objetivamente deslumbrantes e a cidade e tao calma durante a semana que parece que e so sua.` },
      { q: 'O que aconteceu com os caes em Veneza? Sao permitidos?', a: `Os caes sao tecnicamente permitidos em Veneza com trela na maioria dos espacos publicos, mas a realidade pratica e genuinamente dificil. As pontes de pedra lisa da cidade (mais de 400) nao tem aderencia e podem ser escorregadias para caes grandes ou idosos. No pico do verao a densidade turistica nas rotas principais e tao elevada que basicamente navega numa multidao com um cao a trela, o que e stressante para o animal. Os vaporetti (autocarros de agua) aceitam caes pequenos num transportador a tarifa reduzida mas caes grandes tem de esperar por um taxi-barco a um custo significativamente maior. Treviso oferece a mesma experiencia estetica veneziana sem todas estas fricoes.` },
      { q: 'E Sifnos acessivel sem aviao?', a: `Sim, inteiramente por terra e mar. Da maior parte da Europa ocidental o percurso e: conduzir ou tomar o comboio ate Atenas (ou voar para Atenas), depois taxi ou metro ate ao porto do Pireu, depois Blue Star Ferries ou Seajets para Sifnos. O catamarao rapido Seajets faz a travessia em menos de 3 horas. Existe tambem uma opcao de ferry convencional noturno saindo do Pireu as 23h e chegando as 5h, que funciona bem para caes porque a travessia ocorre durante as horas de sono. Leve uma manta e agua para a viagem no convés se o seu cao pesar mais de 6kg.` },
      { q: 'Qual dos 8 e o mais subestimado?', a: `Olomouc, sem questao. E genuinamente desconhecida para a maioria dos europeus ocidentais apesar de ter um monumento UNESCO, seis fontes barrocas, uma atmosfera de cidade universitaria animada, um mercado coberto e precos de hotel 60% abaixo de Praga. As ligacoes de Czech Rail tornam-na acessivel a partir de Viena em 2h40 ou de Praga em 2h10. A sua cultura canina e relaxada: caes a trela viajam em elétrico gratuitamente, a maioria dos restaurantes com esplanada recebe-os, e o parque Bezrucovy sady e um verdadeiro espaco verde no centro da cidade. Se foi a Praga tres vezes e a acha superlotada, Olomouc e a proxima escolha obvia.` },
    ],
    relatedHeading: 'Ver tambem',
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
  const t = COPY[locale]

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
    return p.whyEn
  }
  const pickHotel = (p: Pick) => {
    if (locale === 'fr') return p.hotelFr
    if (locale === 'es') return p.hotelEs
    if (locale === 'pt') return p.hotelPt
    return p.hotelEn
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-amber-700 via-orange-600 to-rose-500 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 40%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-100 mb-3">🐾 {t.eyebrow}</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{t.title}</h1>
          <p className="text-lg sm:text-xl text-amber-50 leading-relaxed">{t.intro}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-8">{t.pickHeading}</h2>
        <div className="space-y-5">
          {PICKS.map((p, i) => (
            <article key={p.slug} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <header className="px-5 sm:px-7 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-stone-200 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-2xl font-black text-amber-700">#{i + 1}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  <Link href={`/${locale}${p.destPath}`} className="hover:text-amber-700">{p.name}</Link>
                </h3>
                <span className="text-sm text-stone-600">{p.country}</span>
                <span className="ml-auto bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                  {t.insteadOfLabel} {p.insteadOf}
                </span>
                <span className="bg-orange-100 text-orange-900 text-xs font-bold px-3 py-1 rounded-full">
                  {t.summerLabel} {p.summerTemp}
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
                  <Link href={`/${locale}${p.destPath}`} className="text-sm font-semibold text-amber-700 hover:text-amber-900 hover:underline">
                    {t.seeDestCta}
                  </Link>
                  <a
                    href={buildAllezDestLink(p.name, p.country, `${CAMPAIGN_BASE}-${p.slug}`, 5)}
                    target="_blank"
                    rel="noopener sponsored"
                    className="text-sm font-semibold text-stone-700 hover:text-amber-700 hover:underline"
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
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">🗺️ {t.practicalHeading}</h2>
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
