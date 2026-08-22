import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'christmas-markets-with-dog'
const CAMPAIGN_BASE = 'christmas-markets'

const STICKY_LABELS: Record<string, { label: string; cta: string }> = {
  en: { label: 'Pet-friendly Christmas market hotels', cta: 'See hotels' },
  fr: { label: `Hôtels pet-friendly pour les marchés de Noël`, cta: 'Voir les hôtels' },
  es: { label: 'Hoteles pet-friendly para mercados navideños', cta: 'Ver hoteles' },
  pt: { label: 'Hotéis pet-friendly para mercados de Natal', cta: 'Ver hotéis' },
  de: { label: 'Haustierfreundliche Hotels für Weihnachtsmärkte', cta: 'Hotels ansehen' },
  nl: { label: 'Huisdiervriendelijke hotels bij kerstmarkten', cta: 'Bekijk hotels' },
  it: { label: 'Hotel pet-friendly per i mercatini di Natale', cta: 'Vedi hotel' },
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
    en: `Dog-Friendly Christmas Markets in Europe: 6 Cities Where Pets Are Welcome (2026)`,
    fr: `Marchés de Noël dog-friendly en Europe : 8 villes où les animaux sont bienvenus (2026)`,
    es: `Mercados navideños dog-friendly en Europa: 8 ciudades que admiten mascotas (2026)`,
    pt: `Mercados de Natal dog-friendly na Europa: 8 cidades que aceitam animais (2026)`,
    de: `Hundefreundliche Weihnachtsmärkte in Europa: 8 Städte, die Haustiere willkommen heißen (2026)`,
    nl: `Hondvriendelijke kerstmarkten in Europa: 8 steden waar huisdieren welkom zijn (2026)`,
    it: `Mercatini di Natale pet-friendly in Europa: 8 città che accolgono gli animali (2026)`,
  }
  const descriptions: Record<string, string> = {
    en: `Six European cities where Christmas markets genuinely welcome leashed dogs and the cold weather is your ally. Strasbourg, Vienna, Cologne, Prague, Bruges and Colmar with verified pet-friendly hotels and wooden stall etiquette.`,
    fr: `Six villes européennes où les marchés de Noël accueillent vraiment les chiens en laisse et où le froid est votre allié. Strasbourg, Vienne, Cologne, Prague, Bruges et Colmar avec hôtels pet-friendly vérifiés et étiquette des chalets en bois.`,
    es: `Seis ciudades europeas donde los mercados navideños realmente admiten perros con correa y donde el frío es tu aliado. Estrasburgo, Viena, Colonia, Praga, Brujas y Colmar con hoteles pet-friendly verificados.`,
    pt: `Seis cidades europeias onde os mercados de Natal aceitam realmente cães à trela e onde o frio é o seu aliado. Estrasburgo, Viena, Colónia, Praga, Bruges e Colmar com hotéis pet-friendly verificados.`,
    de: `Sechs europäische Städte, in denen Weihnachtsmärkte angeleinte Hunde wirklich willkommen heißen und das kalte Wetter Ihr Verbündeter ist. Straßburg, Wien, Köln, Prag, Brügge und Colmar mit geprüften haustierfreundlichen Hotels und Etikette für die Holzbuden.`,
    nl: `Zes Europese steden waar kerstmarkten aangelijnde honden echt welkom heten en het koude weer je bondgenoot is. Straatsburg, Wenen, Keulen, Praag, Brugge en Colmar met geverifieerde huisdiervriendelijke hotels en etiquette voor de houten kraampjes.`,
    it: `Sei città europee dove i mercatini di Natale accolgono davvero i cani al guinzaglio e il freddo è il tuo alleato. Strasburgo, Vienna, Colonia, Praga, Bruges e Colmar con hotel pet-friendly verificati e galateo delle bancarelle in legno.`,
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
  dates: string
  whyEn: string
  whyFr: string
  whyEs: string
  whyPt: string
  whyDe: string
  whyNl: string
  whyIt: string
  hotelName: string
  hotelEn: string
  hotelFr: string
  hotelEs: string
  hotelPt: string
  hotelDe: string
  hotelNl: string
  hotelIt: string
}

const PICKS: Pick[] = [
  {
    slug: 'strasbourg',
    name: 'Strasbourg',
    country: 'France',
    destPath: '/destinations/strasbourg',
    dates: '25 Nov - 24 Dec',
    whyEn: `The Christkindelsmärik since 1570 - the oldest still-running Christmas market in France. The market spreads across 12 squares in the UNESCO Grande Île, all cobbled and walkable with a leashed dog. The cathedral square (Place de la Cathédrale) is the iconic photo and a 4-second walk from the Petite France district. Trams accept leashed dogs free.`,
    whyFr: `Le Christkindelsmärik depuis 1570 - le plus ancien marché de Noël encore en activité en France. Le marché s'étend sur 12 places dans la Grande Île UNESCO, toutes pavées et praticables en laisse. Le parvis de la cathédrale (Place de la Cathédrale) est la photo iconique à 4 secondes à pied du quartier de la Petite France. Les trams acceptent les chiens en laisse gratuits.`,
    whyEs: `El Christkindelsmärik desde 1570 - el mercado navideño más antiguo aún en activo de Francia. El mercado se extiende por 12 plazas en la Grande Île UNESCO, todas adoquinadas y recorribles con perro con correa. La plaza de la catedral (Place de la Cathédrale) es la foto icónica a 4 segundos a pie del barrio de la Petite France. Los tranvías admiten perros con correa gratis.`,
    whyPt: `O Christkindelsmärik desde 1570 - o mercado de Natal mais antigo ainda em atividade em França. O mercado estende-se por 12 praças na Grande Île UNESCO, todas calcetadas e percorríveis com cão à trela. O adro da catedral (Place de la Cathédrale) é a foto icónica a 4 segundos a pé do bairro da Petite France. Os elétricos aceitam cães à trela gratuitamente.`,
    whyDe: `Der Christkindelsmärik seit 1570, der älteste noch bestehende Weihnachtsmarkt Frankreichs. Der Markt erstreckt sich über 12 Plätze in der UNESCO-Grande Île, alle gepflastert und mit einem angeleinten Hund gut begehbar. Der Kathedralenplatz (Place de la Cathédrale) ist das ikonische Fotomotiv, nur 4 Gehminuten vom Viertel Petite France entfernt. Straßenbahnen nehmen angeleinte Hunde kostenlos mit.`,
    whyNl: `De Christkindelsmärik bestaat al sinds 1570, de oudste nog actieve kerstmarkt van Frankrijk. De markt verspreidt zich over 12 pleinen in het UNESCO-gebied Grande Île, allemaal geplaveid en goed te belopen met een aangelijnde hond. Het kathedraalplein (Place de la Cathédrale) is de iconische foto, op 4 minuten lopen van de wijk Petite France. Trams nemen aangelijnde honden gratis mee.`,
    whyIt: `Il Christkindelsmärik esiste dal 1570, il più antico mercatino di Natale ancora attivo in Francia. Il mercatino si estende su 12 piazze nella Grande Île, patrimonio UNESCO, tutte lastricate e percorribili con un cane al guinzaglio. La piazza della cattedrale (Place de la Cathédrale) è la foto iconica, a 4 minuti a piedi dal quartiere Petite France. I tram accettano cani al guinzaglio gratis.`,
    hotelName: `Hôtel Régent Petite France`,
    hotelEn: `4-star inside a converted 18th-century ice factory on the Ill river in Petite France. Pets up to 10 kg welcomed (small fee), the riverside rooms have the postcard half-timbered houses view, 5-min walk to the Christkindelsmärik.`,
    hotelFr: `4 étoiles dans une ancienne glacière du XVIIIᵉ sur l'Ill dans la Petite France. Chiens jusqu'à 10 kg acceptés (petit supplément), les chambres côté rivière ont la vue carte postale sur les maisons à colombages, 5 min à pied du Christkindelsmärik.`,
    hotelEs: `4 estrellas en una antigua fábrica de hielo del siglo XVIII junto al Ill en la Petite France. Perros hasta 10 kg admitidos (pequeño suplemento), las habitaciones lado río tienen la vista postal sobre las casas con entramado, 5 min andando al Christkindelsmärik.`,
    hotelPt: `4 estrelas numa antiga fábrica de gelo do século XVIII junto ao Ill na Petite France. Cães até 10 kg aceites (pequena taxa), os quartos lado rio têm a vista postal sobre as casas em tabique, 5 min a pé do Christkindelsmärik.`,
    hotelDe: `4 Sterne in einer umgebauten Eisfabrik aus dem 18. Jahrhundert am Fluss Ill in Petite France. Haustiere bis 10 kg willkommen (kleine Gebühr), die Zimmer zum Fluss bieten den Postkartenblick auf die Fachwerkhäuser, 5 Gehminuten zum Christkindelsmärik.`,
    hotelNl: `4 sterren in een omgebouwde ijsfabriek uit de 18e eeuw aan de Ill in Petite France. Huisdieren tot 10 kg welkom (kleine toeslag), de kamers aan de rivierzijde hebben het ansichtkaartuitzicht op de vakwerkhuizen, 5 minuten lopen naar de Christkindelsmärik.`,
    hotelIt: `4 stelle in un'ex fabbrica del ghiaccio del XVIII secolo sull'Ill, nella Petite France. Cani fino a 10 kg accettati (piccolo supplemento), le camere lato fiume hanno la vista da cartolina sulle case a graticcio, 5 minuti a piedi dal Christkindelsmärik.`,
  },
  {
    slug: 'vienna',
    name: 'Vienna',
    country: 'Austria',
    destPath: '/destinations/vienna',
    dates: '15 Nov - 26 Dec',
    whyEn: `Vienna runs 20+ Christmas markets simultaneously, the central Rathausplatz is the giant one but the smaller markets at Schönbrunn Palace, Belvedere and Spittelberg are far more dog-friendly and intimate. Trams and the U-Bahn accept leashed dogs free (muzzled if large per Wiener Linien rules). The cold Vienna December (avg high 3°C) suits double-coated breeds and senior dogs that hate summer heat.`,
    whyFr: `Vienne tient 20+ marchés de Noël simultanément, le central Rathausplatz est le grand mais les plus petits marchés à Schönbrunn, Belvédère et Spittelberg sont bien plus dog-friendly et intimes. Les trams et le U-Bahn acceptent les chiens en laisse gratuits (muselière si grand selon les règles de la Wiener Linien). Le froid viennois de décembre (max moyen 3°C) convient aux races à double poil et chiens âgés qui détestent la chaleur estivale.`,
    whyEs: `Viena celebra 20+ mercados navideños simultáneamente, el central Rathausplatz es el gigante pero los mercados más pequeños en Schönbrunn, Belvedere y Spittelberg son mucho más dog-friendly e íntimos. Tranvías y U-Bahn admiten perros con correa gratis (bozal si son grandes según reglas Wiener Linien). El frío vienés de diciembre (máx media 3°C) conviene a razas de doble pelo y perros mayores que odian el calor estival.`,
    whyPt: `Viena tem 20+ mercados de Natal em simultâneo, o central Rathausplatz é o gigante mas os mercados menores em Schönbrunn, Belvedere e Spittelberg são muito mais dog-friendly e íntimos. Elétricos e U-Bahn aceitam cães à trela gratuitamente (açaime se forem grandes segundo regras Wiener Linien). O frio vienense de dezembro (máx média 3°C) convém a raças de pelo duplo e cães idosos que odeiam o calor estival.`,
    whyDe: `Wien veranstaltet über 20 Weihnachtsmärkte gleichzeitig, der zentrale Rathausplatz ist der große, aber die kleineren Märkte bei Schloss Schönbrunn, im Belvedere und am Spittelberg sind deutlich hundefreundlicher und intimer. Straßenbahnen und die U-Bahn nehmen angeleinte Hunde kostenlos mit (Maulkorbpflicht bei großen Hunden laut Wiener Linien). Der kalte Wiener Dezember (Höchsttemperatur im Schnitt 3 °C) passt zu doppelhaarigen Rassen und älteren Hunden, die die Sommerhitze hassen.`,
    whyNl: `Wenen organiseert meer dan 20 kerstmarkten tegelijk, het centrale Rathausplatz is de grote, maar de kleinere markten bij Schloss Schönbrunn, in het Belvedere en op de Spittelberg zijn veel hondvriendelijker en intiemer. Trams en de U-Bahn nemen aangelijnde honden gratis mee (muilkorfplicht voor grote honden volgens de regels van Wiener Linien). De koude Weense december (gemiddelde maximumtemperatuur 3 °C) past bij dubbelharige rassen en oudere honden die de zomerhitte haten.`,
    whyIt: `Vienna organizza oltre 20 mercatini di Natale in contemporanea, il centrale Rathausplatz è quello gigante ma i mercatini più piccoli allo Schönbrunn, al Belvedere e a Spittelberg sono molto più a misura di cane e intimi. Tram e U-Bahn accettano cani al guinzaglio gratis (museruola obbligatoria se grandi, secondo le regole Wiener Linien). Il freddo dicembre viennese (massima media 3°C) è perfetto per razze a doppio pelo e cani anziani che odiano il caldo estivo.`,
    hotelName: 'Hotel Sacher Wien',
    hotelEn: `5-star palace opposite the State Opera, with the original Sacher-Torte café on site. Pets welcomed at modest fee, dog bed and bowl provided, the Albertinaplatz Christmas market is a 1-min walk and the Rathausplatz market is 10 min via tram 1 or 71.`,
    hotelFr: `Palace 5 étoiles face à l'Opéra d'État, avec le café Sacher-Torte original sur place. Chiens acceptés (supplément modéré), panier et gamelle fournis, le marché de l'Albertinaplatz est à 1 min à pied et le Rathausplatz à 10 min en tram 1 ou 71.`,
    hotelEs: `Palacio 5 estrellas frente a la Ópera Estatal, con el café Sacher-Torte original in situ. Perros admitidos (suplemento moderado), cama y comedero, el mercado de la Albertinaplatz a 1 min andando y el Rathausplatz a 10 min en tranvía 1 o 71.`,
    hotelPt: `Palace 5 estrelas em frente à Ópera Estatal, com o café Sacher-Torte original no local. Cães aceites (taxa moderada), cama e tigela, o mercado da Albertinaplatz a 1 min a pé e o Rathausplatz a 10 min de elétrico 1 ou 71.`,
    hotelDe: `5-Sterne-Palace gegenüber der Staatsoper, mit dem original Sacher-Torte-Café im Haus. Haustiere gegen moderate Gebühr willkommen, Hundebett und Napf werden gestellt, der Weihnachtsmarkt am Albertinaplatz ist 1 Gehminute entfernt und der Rathausplatz-Markt 10 Minuten mit der Straßenbahn 1 oder 71.`,
    hotelNl: `5-sterren paleishotel tegenover de Staatsopera, met het originele Sacher-Torte café in huis. Huisdieren welkom tegen een bescheiden toeslag, hondenmand en bak worden verstrekt, de kerstmarkt op de Albertinaplatz is 1 minuut lopen en de markt op het Rathausplatz 10 minuten met tram 1 of 71.`,
    hotelIt: `Palace 5 stelle di fronte all'Opera di Stato, con l'originale caffè Sacher-Torte all'interno. Cani accettati con supplemento modesto, cuccia e ciotola forniti, il mercatino di Albertinaplatz è a 1 minuto a piedi e quello di Rathausplatz a 10 minuti con il tram 1 o 71.`,
  },
  {
    slug: 'cologne',
    name: 'Cologne',
    country: 'Germany',
    destPath: '/destinations/cologne',
    dates: '24 Nov - 23 Dec',
    whyEn: `Seven distinct Christmas markets across the city, all walkable in one long afternoon: the Cathedral market at the foot of the Dom (the iconic one), the Old Market with the medieval Town Hall, the Heinzels Wintermärchen on the Alter Markt (gnome-themed, dog favourite), and the floating market on the MS RheinFantasie boat. Cologne's pet supplement is among Germany's lowest. KVB trams and buses accept leashed dogs free.`,
    whyFr: `Sept marchés de Noël distincts à travers la ville, tous faisables en un long après-midi : le marché de la cathédrale au pied du Dom (l'iconique), le marché de l'Alter Markt avec l'Hôtel de Ville médiéval, le Heinzels Wintermärchen sur l'Alter Markt (thème lutins, favori canin), et le marché flottant sur le bateau MS RheinFantasie. Le supplément animaux de Cologne est parmi les plus bas d'Allemagne. Les trams et bus KVB acceptent les chiens en laisse gratuits.`,
    whyEs: `Siete mercados navideños distintos por la ciudad, todos recorribles en una tarde larga: el mercado de la catedral al pie del Dom (el icónico), el mercado del Alter Markt con el Ayuntamiento medieval, el Heinzels Wintermärchen en el Alter Markt (temática duendes, favorito canino), y el mercado flotante en el barco MS RheinFantasie. El suplemento canino de Colonia está entre los más bajos de Alemania. Tranvías y buses KVB admiten perros con correa gratis.`,
    whyPt: `Sete mercados de Natal distintos pela cidade, todos percorríveis numa longa tarde: o mercado da catedral aos pés do Dom (o icónico), o mercado do Alter Markt com a Câmara medieval, o Heinzels Wintermärchen no Alter Markt (tema duendes, favorito canino), e o mercado flutuante no barco MS RheinFantasie. A taxa canina de Colónia está entre as mais baixas da Alemanha. Elétricos e autocarros KVB aceitam cães à trela gratuitamente.`,
    whyDe: `Sieben eigenständige Weihnachtsmärkte in der ganzen Stadt, alle an einem langen Nachmittag zu Fuß erreichbar: der Marktplatz am Fuße des Doms (der ikonische), der Alter Markt mit dem mittelalterlichen Rathaus, der Heinzels Wintermärchen auf dem Alter Markt (Wichtel-Thema, Hunde-Liebling), und der schwimmende Markt auf dem Schiff MS RheinFantasie. Die Hundegebühr in Köln zählt zu den niedrigsten Deutschlands. KVB-Straßenbahnen und -Busse nehmen angeleinte Hunde kostenlos mit.`,
    whyNl: `Zeven aparte kerstmarkten door de hele stad, allemaal te belopen in één lange middag: de markt aan de voet van de Dom (de iconische), de Alter Markt met het middeleeuwse stadhuis, de Heinzels Wintermärchen op de Alter Markt (kaboutersthema, favoriet bij honden), en de drijvende markt op het schip MS RheinFantasie. De huisdiertoeslag in Keulen behoort tot de laagste van Duitsland. Trams en bussen van KVB nemen aangelijnde honden gratis mee.`,
    whyIt: `Sette mercatini di Natale distinti in tutta la città, tutti percorribili in un lungo pomeriggio: il mercatino ai piedi del Duomo (l'iconico), il mercatino dell'Alter Markt con il municipio medievale, l'Heinzels Wintermärchen sull'Alter Markt (tema gnomi, preferito dai cani), e il mercatino galleggiante sulla barca MS RheinFantasie. Il supplemento cane a Colonia è tra i più bassi della Germania. Tram e autobus KVB accettano cani al guinzaglio gratis.`,
    hotelName: 'Excelsior Hotel Ernst am Dom',
    hotelEn: `5-star opposite the cathedral and the main Christmas market. Pets up to 14 kg welcomed (small fee), dog bed and welcome treats, the marble lobby tolerates a quiet leashed dog while you defrost.`,
    hotelFr: `5 étoiles face à la cathédrale et au marché principal. Chiens jusqu'à 14 kg acceptés (petit supplément), couchage et friandises de bienvenue, le lobby en marbre tolère un chien en laisse calme pendant que vous dégelez.`,
    hotelEs: `5 estrellas frente a la catedral y al mercado principal. Perros hasta 14 kg admitidos (pequeño suplemento), cama y golosinas de bienvenida, el lobby de mármol tolera un perro con correa tranquilo mientras te descongelas.`,
    hotelPt: `5 estrelas em frente à catedral e ao mercado principal. Cães até 14 kg aceites (pequena taxa), cama e guloseimas de boas-vindas, o lobby de mármore tolera um cão à trela calmo enquanto descongela.`,
    hotelDe: `5 Sterne gegenüber dem Dom und dem Hauptweihnachtsmarkt. Haustiere bis 14 kg willkommen (kleine Gebühr), Hundebett und Willkommensleckerli, die Marmorlobby toleriert einen ruhigen angeleinten Hund, während Sie auftauen.`,
    hotelNl: `5 sterren tegenover de Dom en de hoofdkerstmarkt. Huisdieren tot 14 kg welkom (kleine toeslag), hondenmand en welkomstlekkernijen, de marmeren lobby tolereert een rustige aangelijnde hond terwijl je ontdooit.`,
    hotelIt: `5 stelle di fronte al Duomo e al mercatino principale. Cani fino a 14 kg accettati (piccolo supplemento), cuccia e snack di benvenuto, la hall in marmo tollera un cane tranquillo al guinzaglio mentre ti scongeli.`,
  },
  {
    slug: 'prague',
    name: 'Prague',
    country: 'Czech Republic',
    destPath: '/destinations/prague',
    dates: '30 Nov - 6 Jan',
    whyEn: `Prague extends its market season to Epiphany (6 January), the longest in this list. The Old Town Square (Staromětské náměstí) and Wenceslas Square (Václavské náměstí) are the two giants, both walkable with a dog on the cobbles. Czech beer halls welcome dogs all winter, the medieval lanes are flat under the snow, and the prices are among Europe's most reasonable.`,
    whyFr: `Prague étend sa saison de marchés jusqu'à l'Épiphanie (6 janvier), la plus longue de la liste. La place de la Vieille Ville (Staromětské náměstí) et la place Venceslas (Václavské náměstí) sont les deux géants, tous deux praticables avec chien sur les pavés. Les brasseries tchèques accueillent les chiens tout l'hiver, les ruelles médiévales sont plates sous la neige, et les prix sont parmi les plus raisonnables d'Europe.`,
    whyEs: `Praga extiende su temporada de mercados hasta Epifanía (6 enero), la más larga de la lista. La plaza de la Ciudad Vieja (Staromětské náměstí) y la plaza de Wenceslao (Václavské náměstí) son los dos gigantes, ambos recorribles con perro en el adoquinado. Las cervecerías checas admiten perros todo el invierno, las callejuelas medievales son llanas bajo la nieve, y los precios están entre los más razonables de Europa.`,
    whyPt: `Praga estende a sua época de mercados até Epifania (6 janeiro), a mais longa da lista. A praça da Cidade Velha (Staromětské náměstí) e a praça Venceslau (Václavské náměstí) são os dois gigantes, ambos percorríveis com cão no calcetado. As cervejarias checas aceitam cães todo o inverno, as ruelas medievais são planas sob a neve, e os preços estão entre os mais razoáveis da Europa.`,
    whyDe: `Prag verlängert seine Marktsaison bis Dreikönig (6. Januar), die längste in dieser Liste. Der Altstädter Ring (Staromětské náměstí) und der Wenzelsplatz (Václavské náměstí) sind die beiden Riesen, beide mit Hund auf dem Kopfsteinpflaster gut begehbar. Tschechische Bierstuben heißen Hunde den ganzen Winter willkommen, die mittelalterlichen Gassen sind unter dem Schnee flach, und die Preise gehören zu den moderatesten Europas.`,
    whyNl: `Praag verlengt zijn marktseizoen tot Driekoningen (6 januari), het langste op deze lijst. Het Oudestadsplein (Staromětské náměstí) en het Wenceslasplein (Václavské náměstí) zijn de twee reuzen, beide goed te belopen met een hond op de kasseien. Tsjechische bierhuizen heten honden de hele winter welkom, de middeleeuwse steegjes zijn vlak onder de sneeuw, en de prijzen behoren tot de redelijkste van Europa.`,
    whyIt: `Praga estende la sua stagione dei mercatini fino all'Epifania (6 gennaio), la più lunga di questa lista. La Piazza della Città Vecchia (Staromětské náměstí) e la Piazza San Venceslao (Václavské náměstí) sono le due giganti, entrambe percorribili con il cane sul ciottolato. Le birrerie ceche accolgono i cani tutto l'inverno, i vicoli medievali sono piatti sotto la neve, e i prezzi sono tra i più ragionevoli d'Europa.`,
    hotelName: 'Hotel U Prince',
    hotelEn: `Boutique 4-star directly on the Old Town Square, dating from 1380. Pets welcomed at modest fee, the rooftop terrace restaurant with cathedral view tolerates a quiet leashed dog, and the market stalls are literally at the hotel door.`,
    hotelFr: `Boutique 4 étoiles directement sur la place de la Vieille Ville, datant de 1380. Chiens acceptés (supplément modéré), la terrasse rooftop avec vue cathédrale tolère un chien en laisse calme, et les chalets du marché sont littéralement à la porte de l'hôtel.`,
    hotelEs: `Boutique 4 estrellas directamente en la plaza de la Ciudad Vieja, de 1380. Perros admitidos (suplemento moderado), la terraza con vista a la catedral tolera un perro con correa tranquilo, y los puestos del mercado están literalmente a la puerta del hotel.`,
    hotelPt: `Boutique 4 estrelas diretamente na praça da Cidade Velha, de 1380. Cães aceites (taxa moderada), a esplanada com vista para a catedral tolera um cão à trela calmo, e as barracas do mercado estão literalmente à porta do hotel.`,
    hotelDe: `Boutique-4-Sterne-Hotel direkt am Altstädter Ring, aus dem Jahr 1380. Haustiere gegen moderate Gebühr willkommen, das Dachterrassenrestaurant mit Blick auf die Kathedrale toleriert einen ruhigen angeleinten Hund, und die Marktstände liegen buchstäblich vor der Hoteltür.`,
    hotelNl: `Boutique 4-sterrenhotel direct aan het Oudestadsplein, daterend uit 1380. Huisdieren welkom tegen een bescheiden toeslag, het dakterrasrestaurant met uitzicht op de kathedraal tolereert een rustige aangelijnde hond, en de marktkraampjes staan letterlijk voor de hoteldeur.`,
    hotelIt: `Boutique 4 stelle direttamente sulla Piazza della Città Vecchia, risalente al 1380. Cani accettati con supplemento modesto, il ristorante in terrazza con vista sulla cattedrale tollera un cane tranquillo al guinzaglio, e le bancarelle del mercatino sono letteralmente davanti alla porta dell'hotel.`,
  },
  {
    slug: 'bruges',
    name: 'Bruges',
    country: 'Belgium',
    destPath: '/destinations/bruges',
    dates: '22 Nov - 5 Jan',
    whyEn: `Bruges in December is the fairytale at peak fairytale: the canals freeze partially, the Markt square hosts the Wintermärkt with the giant ice-skating ring (humans only, but the dog watches from the sidelines), and the Belfort tower glows above. Smaller markets in Simon Stevin square and Walplein are quieter and more dog-comfortable. The Belgian terraces welcome dogs all winter under heat lamps.`,
    whyFr: `Bruges en décembre est le conte de fées au pic du conte de fées : les canaux gèlent partiellement, la place du Markt accueille le Wintermärkt avec la grande patinoire (humains seulement, mais le chien regarde du bord), et le Belfort brille au-dessus. Les marchés plus petits sur Simon Stevin et Walplein sont plus calmes et plus confortables avec un chien. Les terrasses belges accueillent les chiens tout l'hiver sous chauffages.`,
    whyEs: `Brujas en diciembre es el cuento de hadas en su máximo cuento de hadas: los canales se congelan parcialmente, la plaza Markt acoge el Wintermärkt con la gran pista de patinaje (solo humanos, pero el perro mira desde el borde), y el Belfort brilla por encima. Los mercados más pequeños en Simon Stevin y Walplein son más tranquilos y más cómodos con perro. Las terrazas belgas admiten perros todo el invierno bajo calefactores.`,
    whyPt: `Bruges em dezembro é o conto de fadas no auge do conto de fadas: os canais congelam parcialmente, a praça Markt acolhe o Wintermärkt com a grande pista de patinagem (só humanos, mas o cão observa da margem), e o Belfort brilha por cima. Os mercados menores em Simon Stevin e Walplein são mais calmos e mais confortáveis com cão. As esplanadas belgas aceitam cães todo o inverno sob aquecedores.`,
    whyDe: `Brügge im Dezember ist das Märchen auf dem Höhepunkt des Märchens: Die Grachten frieren teilweise zu, der Markt beherbergt den Wintermärkt mit der riesigen Eisbahn (nur für Menschen, aber der Hund schaut vom Rand aus zu), und der Belfried leuchtet darüber. Die kleineren Märkte am Simon-Stevin-Platz und am Walplein sind ruhiger und hundefreundlicher. Die belgischen Terrassen heißen Hunde den ganzen Winter unter Heizstrahlern willkommen.`,
    whyNl: `Brugge in december is het sprookje op zijn sprookjesachtigst: de grachten vriezen deels dicht, de Markt herbergt de Wintermärkt met de reuzenschaatsbaan (alleen voor mensen, maar de hond kijkt vanaf de zijlijn toe), en het belfort gloeit erboven. De kleinere markten op het Simon Stevinplein en Walplein zijn rustiger en hondvriendelijker. De Belgische terrassen heten honden de hele winter welkom onder terrasverwarming.`,
    whyIt: `Bruges a dicembre è la favola al suo apice: i canali si ghiacciano in parte, la piazza Markt ospita il Wintermärkt con la gigantesca pista di pattinaggio (solo umani, ma il cane guarda dai bordi), e il Belfort brilla sopra di tutto. I mercatini più piccoli in Piazza Simon Stevin e a Walplein sono più tranquilli e più a misura di cane. I dehors belgi accolgono i cani tutto l'inverno sotto le stufe esterne.`,
    hotelName: 'Boutique Hotel De Castillion',
    hotelEn: `15-room townhouse in a former bishop's residence, 6-min walk to the Markt and the Wintermärkt. Pets up to 10 kg welcomed (modest fee), breakfast in the walled garden, the in-house bistro tolerates a quiet leashed dog at dinner.`,
    hotelFr: `15 chambres dans une ancienne résidence épiscopale, 6 min à pied du Markt et du Wintermärkt. Chiens jusqu'à 10 kg acceptés (supplément modéré), petit-déjeuner dans le jardin clos, le bistrot de l'hôtel tolère un chien en laisse calme au dîner.`,
    hotelEs: `15 habitaciones en una antigua residencia episcopal, 6 min andando al Markt y al Wintermärkt. Perros hasta 10 kg admitidos (suplemento moderado), desayuno en el jardín tapiado, el bistró del hotel tolera un perro con correa tranquilo en la cena.`,
    hotelPt: `15 quartos numa antiga residência episcopal, 6 min a pé do Markt e do Wintermärkt. Cães até 10 kg aceites (taxa moderada), pequeno-almoço no jardim murado, o bistrot do hotel tolera um cão à trela calmo ao jantar.`,
    hotelDe: `Stadthaus mit 15 Zimmern in einer ehemaligen Bischofsresidenz, 6 Gehminuten zum Markt und zum Wintermärkt. Haustiere bis 10 kg willkommen (moderate Gebühr), Frühstück im ummauerten Garten, das hoteleigene Bistro toleriert beim Abendessen einen ruhigen angeleinten Hund.`,
    hotelNl: `Stadshuis met 15 kamers in een voormalige bisschopsresidentie, 6 minuten lopen naar de Markt en de Wintermärkt. Huisdieren tot 10 kg welkom (bescheiden toeslag), ontbijt in de ommuurde tuin, het bistro van het hotel tolereert bij het diner een rustige aangelijnde hond.`,
    hotelIt: `Dimora di 15 camere in un'ex residenza vescovile, 6 minuti a piedi dal Markt e dal Wintermärkt. Cani fino a 10 kg accettati (supplemento modesto), colazione nel giardino recintato, il bistrot dell'hotel tollera a cena un cane tranquillo al guinzaglio.`,
  },
  {
    slug: 'strasbourg',
    name: 'Colmar (Strasbourg day trip)',
    country: 'France',
    destPath: '/destinations/strasbourg',
    dates: '22 Nov - 29 Dec',
    whyEn: `30 minutes south of Strasbourg by TER train, Colmar is the Alsatian village so picture-perfect it inspired Disney's Beauty and the Beast Belle's home town. Six small Christmas markets across the Little Venice canal district, all cobbled and walkable with a leashed dog. The half-timbered houses light up at sundown for a 90-minute postcard walk. Bring Strasbourg as your hotel base; Colmar fills as a perfect day trip.`,
    whyFr: `30 min au sud de Strasbourg en TER, Colmar est le village alsacien tellement parfait qu'il a inspiré la ville natale de Belle dans La Belle et la Bête de Disney. Six petits marchés de Noël dans le quartier des canaux de la Petite Venise, tous pavés et praticables en laisse. Les maisons à colombages s'allument à la tombée du jour pour 90 min de promenade carte postale. Gardez Strasbourg comme base hôtel ; Colmar se cale en day trip parfait.`,
    whyEs: `30 min al sur de Estrasburgo en TER, Colmar es el pueblo alsaciano tan perfecto que inspiró la ciudad natal de Bella en La Bella y la Bestia de Disney. Seis pequeños mercados navideños en el barrio de canales de la Pequeña Venecia, todos adoquinados y recorribles con correa. Las casas con entramado se iluminan al atardecer para 90 min de paseo postal. Conserva Estrasburgo como base de hotel; Colmar encaja como excursión perfecta.`,
    whyPt: `30 min a sul de Estrasburgo de TER, Colmar é a aldeia alsaciana tão perfeita que inspirou a vila natal de Bela em A Bela e o Monstro da Disney. Seis pequenos mercados de Natal no bairro dos canais da Pequena Veneza, todos calcetados e percorríveis com trela. As casas em tabique iluminam-se ao entardecer para 90 min de passeio postal. Mantenha Estrasburgo como base de hotel; Colmar encaixa como excursão perfeita.`,
    whyDe: `30 Minuten südlich von Straßburg mit dem TER-Zug liegt Colmar, das elsässische Dorf, das so bilderbuchhaft ist, dass es Belles Heimatstadt in Disneys Die Schöne und das Biest inspirierte. Sechs kleine Weihnachtsmärkte im Kanalviertel Klein-Venedig, alle gepflastert und mit angeleintem Hund begehbar. Die Fachwerkhäuser leuchten bei Einbruch der Dämmerung für einen 90-minütigen Postkartenspaziergang. Behalten Sie Straßburg als Hotelbasis; Colmar eignet sich perfekt als Tagesausflug.`,
    whyNl: `30 minuten ten zuiden van Straatsburg met de TER-trein ligt Colmar, het Elzasser dorp dat zo plaatjesmooi is dat het Belles geboortestad in Disneys De Schone en het Beest inspireerde. Zes kleine kerstmarkten in de kanalenwijk Klein-Venetië, allemaal geplaveid en te belopen met een aangelijnde hond. De vakwerkhuizen lichten op bij zonsondergang voor een ansichtkaartwandeling van 90 minuten. Houd Straatsburg als hotelbasis; Colmar is een perfect dagje uit.`,
    whyIt: `30 minuti a sud di Strasburgo con il treno TER, Colmar è il villaggio alsaziano così perfetto da aver ispirato la città natale di Belle nella Bella e la Bestia di Disney. Sei piccoli mercatini di Natale nel quartiere dei canali della Piccola Venezia, tutti lastricati e percorribili con un cane al guinzaglio. Le case a graticcio si illuminano al tramonto per una passeggiata da cartolina di 90 minuti. Tieni Strasburgo come base per l'hotel; Colmar è perfetta come gita di un giorno.`,
    hotelName: `Hôtel Régent Petite France (Strasbourg base)`,
    hotelEn: `Use the same Strasbourg hotel as your base. TER Strasbourg-Colmar runs every 30 min, dogs €0 in carrier or €3.50 leashed. Colmar station is 12 min walk from the markets.`,
    hotelFr: `Utilisez le même hôtel de Strasbourg comme base. TER Strasbourg-Colmar toutes les 30 min, chiens 0 € en sac ou 3,50 € en laisse. La gare de Colmar est à 12 min à pied des marchés.`,
    hotelEs: `Usa el mismo hotel de Estrasburgo como base. TER Estrasburgo-Colmar cada 30 min, perros 0 € en bolsa o 3,50 € con correa. La estación de Colmar está a 12 min andando de los mercados.`,
    hotelPt: `Use o mesmo hotel de Estrasburgo como base. TER Estrasburgo-Colmar de 30 em 30 min, cães 0 € em saco ou 3,50 € à trela. A estação de Colmar está a 12 min a pé dos mercados.`,
    hotelDe: `Nutzen Sie dasselbe Straßburger Hotel als Basis. Der TER Straßburg-Colmar fährt alle 30 Minuten, Hunde 0 € in der Transportbox oder 3,50 € angeleint. Der Bahnhof Colmar liegt 12 Gehminuten von den Märkten entfernt.`,
    hotelNl: `Gebruik hetzelfde hotel in Straatsburg als basis. De TER Straatsburg-Colmar rijdt elke 30 minuten, honden gratis in draagtas of € 3,50 aangelijnd. Het station van Colmar ligt 12 minuten lopen van de markten.`,
    hotelIt: `Usa lo stesso hotel di Strasburgo come base. Il TER Strasburgo-Colmar parte ogni 30 minuti, cani gratis in borsa trasportino o 3,50 € al guinzaglio. La stazione di Colmar è a 12 minuti a piedi dai mercatini.`,
  },
  {
    slug: 'gothenburg',
    name: 'Gothenburg',
    country: 'Sweden',
    destPath: '/destinations/gothenburg',
    dates: '16 Nov - 30 Dec',
    whyEn: `Gothenburg's Christmas searches doubled year-on-year, and it earns the hype. Skip Liseberg's giant light park (no dogs inside except assistance dogs) and head to the Haga district: cobbled 19th-century wooden houses, cinnamon-bun cafés that keep a water bowl by the door, and the Kronhusbodarna market in a 17th-century artillery courtyard, all leash-walkable. Gothenburg trams accept leashed dogs free. December averages 2°C, ideal for double-coated and senior dogs.`,
    whyFr: `Les recherches Noël sur Göteborg ont doublé en un an, et c'est mérité. Oubliez le parc illuminé de Liseberg (chiens non admis, sauf chiens d'assistance) et filez dans le quartier de Haga : maisons en bois du XIXe siècle sur pavés, cafés à brioche à la cannelle qui gardent une gamelle d'eau près de l'entrée, et le marché de Kronhusbodarna dans une cour d'artillerie du XVIIe, tout se fait en laisse. Les trams de Göteborg acceptent les chiens en laisse gratuitement. Décembre tourne autour de 2 °C, idéal pour les chiens à double poil et les seniors.`,
    whyEs: `Las búsquedas navideñas de Gotemburgo se duplicaron en un año, y se lo ha ganado. Salta el parque iluminado de Liseberg (perros no admitidos, salvo perros de asistencia) y ve al barrio de Haga: casas de madera del siglo XIX sobre adoquines, cafés de bollo de canela que dejan un cuenco de agua junto a la puerta, y el mercado de Kronhusbodarna en un patio de artillería del siglo XVII, todo recorrible con correa. Los tranvías de Gotemburgo admiten perros con correa gratis. Diciembre ronda los 2 °C, ideal para perros de doble pelo y mayores.`,
    whyPt: `As pesquisas de Natal sobre Gotemburgo duplicaram num ano, e é merecido. Ignore o parque iluminado de Liseberg (cães não admitidos, salvo cães de assistência) e vá para o bairro de Haga: casas de madeira do século XIX sobre calçada, cafés de pão de canela que mantêm uma tigela de água junto à porta, e o mercado de Kronhusbodarna num pátio de artilharia do século XVII, tudo percorrível com trela. Os elétricos de Gotemburgo aceitam cães à trela gratuitamente. Dezembro ronda os 2 °C, ideal para cães de pelo duplo e séniores.`,
    whyDe: `Die Weihnachtssuchen zu Göteborg haben sich binnen eines Jahres verdoppelt, und das zu Recht. Lassen Sie Lisebergs riesigen Lichterpark aus (Hunde nur als Assistenzhunde erlaubt) und gehen Sie ins Viertel Haga: gepflasterte Holzhäuser aus dem 19. Jahrhundert, Zimtschnecken-Cafés mit Wassernapf an der Tür und der Markt Kronhusbodarna in einem Artilleriehof aus dem 17. Jahrhundert, alles angeleint begehbar. Die Straßenbahnen Göteborgs nehmen angeleinte Hunde kostenlos mit. Der Dezember liegt im Schnitt bei 2 °C, ideal für doppelfellige und ältere Hunde.`,
    whyNl: `De kerstzoekopdrachten voor Göteborg zijn in een jaar verdubbeld, en terecht. Sla het reuzenlichtpark van Liseberg over (honden alleen toegelaten als assistentiehond) en ga naar de wijk Haga: geplaveide houten huizen uit de 19e eeuw, kaneelbroodjescafés met een waterbak bij de deur, en de markt Kronhusbodarna in een artilleriehof uit de 17e eeuw, alles te belopen aan de lijn. De trams van Göteborg nemen aangelijnde honden gratis mee. December ligt gemiddeld op 2 °C, ideaal voor dubbelharige en oudere honden.`,
    whyIt: `Le ricerche natalizie su Göteborg sono raddoppiate in un anno, e se lo merita. Salta il gigantesco parco di luci di Liseberg (cani ammessi solo come cani di assistenza) e vai nel quartiere di Haga: case di legno lastricate del XIX secolo, caffè di panini alla cannella che tengono una ciotola d'acqua alla porta, e il mercatino di Kronhusbodarna in un cortile di artiglieria del XVII secolo, tutto percorribile al guinzaglio. I tram di Göteborg accettano cani al guinzaglio gratis. A dicembre la media è di 2°C, ideale per razze a doppio pelo e cani anziani.`,
    hotelName: 'Clarion Hotel Post',
    hotelEn: `5-star inside the grand 1925 Central Post Office on Drottningtorget, dogs welcomed free of charge. Central at the tram hub, a 10-min walk to the Haga markets and 5 min to the Nordstan galleries. Rooftop pool and bar; the marble lobby tolerates a quiet leashed dog while you thaw.`,
    hotelFr: `5 étoiles dans l'imposante Poste centrale de 1925 sur Drottningtorget, chiens acceptés gratuitement. Central, au nœud des trams, à 10 min à pied des marchés de Haga et 5 min des galeries Nordstan. Piscine et bar sur le toit ; le hall de marbre tolère un chien en laisse calme pendant que vous vous réchauffez.`,
    hotelEs: `5 estrellas en la imponente Oficina Central de Correos de 1925 en Drottningtorget, perros admitidos gratis. Céntrico, en el nudo de tranvías, a 10 min andando de los mercados de Haga y 5 min de las galerías Nordstan. Piscina y bar en la azotea; el vestíbulo de mármol tolera un perro con correa tranquilo mientras te descongelas.`,
    hotelPt: `5 estrelas nos imponentes Correios Centrais de 1925 em Drottningtorget, cães aceites gratuitamente. Central, no nó dos elétricos, a 10 min a pé dos mercados de Haga e 5 min das galerias Nordstan. Piscina e bar no terraço; o átrio de mármore tolera um cão à trela calmo enquanto se aquece.`,
    hotelDe: `5 Sterne im prächtigen Hauptpostamt von 1925 am Drottningtorget, Hunde kostenlos willkommen. Zentral am Straßenbahnknoten, 10 Gehminuten zu den Haga-Märkten und 5 Minuten zu den Nordstan-Galerien. Dachpool und Bar; die Marmorlobby toleriert einen ruhigen angeleinten Hund, während Sie auftauen.`,
    hotelNl: `5 sterren in het statige hoofdpostkantoor uit 1925 aan het Drottningtorget, honden gratis welkom. Centraal bij het tramknooppunt, 10 minuten lopen naar de Haga-markten en 5 minuten naar de Nordstan-galerijen. Dakzwembad en bar; de marmeren lobby tolereert een rustige aangelijnde hond terwijl je opwarmt.`,
    hotelIt: `5 stelle nell'imponente ex ufficio postale centrale del 1925 su Drottningtorget, cani accettati gratis. Centrale, allo snodo dei tram, a 10 minuti a piedi dai mercatini di Haga e 5 minuti dalle gallerie Nordstan. Piscina e bar sul tetto; la hall in marmo tollera un cane tranquillo al guinzaglio mentre ti scaldi.`,
  },
  {
    slug: 'poznan',
    name: 'Poznań',
    country: 'Poland',
    destPath: '/destinations/poznan',
    dates: '28 Nov - 23 Dec',
    whyEn: `Poznań's Christmas searches doubled year-on-year and it is the value pick of the list. The Betlejem Poznańskie market fills the Renaissance Old Market Square (Stary Rynek), ringed by pastel merchant houses, with the famous mechanical billy goats butting heads on the Town Hall clock at noon (the dog looks up too). Ice sculptures, mulled-wine stalls, cobbled and flat and leash-walkable. Trams accept leashed dogs free, and Polish prices are the lowest here. December averages 2°C.`,
    whyFr: `Les recherches Noël sur Poznań ont doublé en un an, et c'est le choix rapport qualité-prix de la liste. Le marché Betlejem Poznańskie remplit la place du Vieux Marché Renaissance (Stary Rynek), cernée de maisons de marchands pastel, avec les célèbres boucs mécaniques qui se cognent la tête sur l'horloge de l'hôtel de ville à midi (le chien lève les yeux aussi). Sculptures de glace, stands de vin chaud, tout est pavé, plat et praticable en laisse. Les trams acceptent les chiens en laisse gratuitement, et les prix polonais sont les plus bas ici. Décembre tourne autour de 2 °C.`,
    whyEs: `Las búsquedas navideñas de Poznań se duplicaron en un año y es la opción calidad-precio de la lista. El mercado Betlejem Poznańskie llena la plaza del Mercado Viejo renacentista (Stary Rynek), rodeada de casas de mercaderes en tonos pastel, con las famosas cabras mecánicas que se topan la cabeza en el reloj del ayuntamiento a mediodía (el perro también mira). Esculturas de hielo, puestos de vino caliente, todo adoquinado, llano y recorrible con correa. Los tranvías admiten perros con correa gratis, y los precios polacos son los más bajos aquí. Diciembre ronda los 2 °C.`,
    whyPt: `As pesquisas de Natal sobre Poznań duplicaram num ano e é a escolha de melhor relação qualidade-preço da lista. O mercado Betlejem Poznańskie enche a praça do Mercado Velho renascentista (Stary Rynek), rodeada de casas de mercadores em tons pastel, com os famosos bodes mecânicos que batem cabeça no relógio da câmara ao meio-dia (o cão também olha para cima). Esculturas de gelo, bancas de vinho quente, tudo calcetado, plano e percorrível com trela. Os elétricos aceitam cães à trela gratuitamente, e os preços polacos são os mais baixos aqui. Dezembro ronda os 2 °C.`,
    whyDe: `Die Weihnachtssuchen zu Posen haben sich binnen eines Jahres verdoppelt, und es ist der Preis-Leistungs-Tipp der Liste. Der Markt Betlejem Poznańskie füllt den Renaissance-Altmarkt (Stary Rynek), umringt von pastellfarbenen Kaufmannshäusern, mit den berühmten mechanischen Ziegenböcken, die mittags am Rathaus die Köpfe zusammenstoßen (der Hund schaut auch hinauf). Eisskulpturen, Glühweinstände, alles gepflastert, flach und angeleint begehbar. Die Straßenbahnen nehmen angeleinte Hunde kostenlos mit, und die polnischen Preise sind hier die niedrigsten. Der Dezember liegt im Schnitt bei 2 °C.`,
    whyNl: `De kerstzoekopdrachten voor Poznań zijn in een jaar verdubbeld en het is de prijs-kwaliteittip van de lijst. De markt Betlejem Poznańskie vult de renaissance Oude Markt (Stary Rynek), omringd door pastelkleurige koopmanshuizen, met de beroemde mechanische geitenbokken die 's middags op de klok van het stadhuis met de koppen tegen elkaar botsen (de hond kijkt ook omhoog). IJssculpturen, glühweinkraampjes, alles geplaveid, vlak en te belopen aan de lijn. Trams nemen aangelijnde honden gratis mee, en de Poolse prijzen zijn hier het laagst. December ligt gemiddeld op 2 °C.`,
    whyIt: `Le ricerche natalizie su Poznań sono raddoppiate in un anno ed è la scelta migliore rapporto qualità-prezzo della lista. Il mercatino Betlejem Poznańskie riempie la rinascimentale Piazza del Mercato Vecchio (Stary Rynek), circondata da case di mercanti color pastello, con le famose capre meccaniche che a mezzogiorno si scontrano la testa sull'orologio del municipio (anche il cane guarda in su). Sculture di ghiaccio, bancarelle di vin brulé, tutto lastricato, piatto e percorribile al guinzaglio. I tram accettano cani al guinzaglio gratis, e i prezzi polacchi sono i più bassi qui. A dicembre la media è di 2°C.`,
    hotelName: 'PURO Hotel Poznan Stare Miasto',
    hotelEn: `Design 4-star in the Old Town with no pet fee. A 4-min walk to the Stary Rynek market, the lobby lends umbrellas and keeps dog water bowls, and the breakfast room tolerates a quiet leashed dog. Ask for an upper-floor room over the courtyard for quiet once the market closes.`,
    hotelFr: `4 étoiles design dans la vieille ville, sans supplément animaux. À 4 min à pied du marché de Stary Rynek, le hall prête des parapluies et garde des gamelles d'eau, et la salle du petit-déjeuner tolère un chien en laisse calme. Demandez une chambre en étage sur la cour pour le calme une fois le marché fermé.`,
    hotelEs: `4 estrellas de diseño en el casco antiguo, sin suplemento por mascota. A 4 min andando del mercado de Stary Rynek, el vestíbulo presta paraguas y tiene cuencos de agua, y la sala de desayuno tolera un perro con correa tranquilo. Pide una habitación en planta alta sobre el patio para tener calma cuando cierra el mercado.`,
    hotelPt: `4 estrelas de design na cidade velha, sem taxa para animais. A 4 min a pé do mercado de Stary Rynek, o átrio empresta guarda-chuvas e tem tigelas de água, e a sala de pequeno-almoço tolera um cão à trela calmo. Peça um quarto num andar superior sobre o pátio para ter sossego depois de o mercado fechar.`,
    hotelDe: `Design-4-Sterne in der Altstadt, ohne Haustiergebühr. 4 Gehminuten zum Markt am Stary Rynek, die Lobby verleiht Regenschirme und hält Wassernäpfe bereit, und der Frühstücksraum toleriert einen ruhigen angeleinten Hund. Bitten Sie um ein Zimmer in einer oberen Etage zum Innenhof für Ruhe, sobald der Markt schließt.`,
    hotelNl: `Design-4-sterrenhotel in de oude stad, zonder huisdiertoeslag. 4 minuten lopen naar de markt op de Stary Rynek, de lobby leent paraplu's uit en houdt waterbakken voor honden bij, en de ontbijtzaal tolereert een rustige aangelijnde hond. Vraag om een kamer op een hogere verdieping aan de binnenplaats voor rust zodra de markt sluit.`,
    hotelIt: `Design 4 stelle nel centro storico, senza supplemento per animali. A 4 minuti a piedi dal mercatino di Stary Rynek, la hall presta ombrelli e tiene ciotole d'acqua per cani, e la sala colazione tollera un cane tranquillo al guinzaglio. Chiedi una camera ai piani alti sul cortile interno per la quiete una volta chiuso il mercatino.`,
  },
]

const COPY = {
  en: {
    eyebrow: 'CHRISTMAS MARKETS · PET-FRIENDLY EUROPE',
    title: `Dog-Friendly Christmas Markets: 8 European Cities Where Pets Are Welcome`,
    intro: `December is the friendliest month of the year to travel with a dog. The weather actively suits the breeds that suffer in summer (huskies, Bernese, double-coated everything), the crowds are warmer-bundled and less reactive to dogs at their feet, and the wooden Christmas market stalls are inherently flat, slow, and dog-paced. We picked eight European Christmas markets that genuinely welcome leashed dogs - the etiquette is universal: keep them close, away from food samples, and out of the bratwurst grease zone.`,
    pickHeading: 'The eight picks',
    whyHere: 'Why here',
    datesLabel: 'Market dates',
    hotelLabel: 'Where to stay',
    seeDestCta: 'Full city guide →',
    hotelCta: 'See availability →',
    practicalHeading: 'Practical info for Christmas markets with a dog',
    practical: [
      { h: 'Crowd management', p: `Christmas markets peak Friday evening and weekends. Go weekday mornings (10:00-12:00) or weekday afternoons (15:00-17:00) to keep your dog comfortable. Avoid the Glühwein zones at 19:00-22:00: the bratwurst grease underfoot and the swaying crowd are hard for a small dog. Carrying a small dog through the densest zones is fine.` },
      { h: 'Mulled wine + dog', p: `Glühwein, Glögg, Vin chaud are served in ceramic cups that get hot. Hold the cup above the dog's head, not in front, and never put it down on a low ledge where a curious nose can reach. Spilled mulled wine is bad for dogs (alcohol + sugar + cinnamon). Carry your own water bottle and bowl.` },
      { h: 'Winter paw care', p: `Salt and grit on the streets are abrasive on paw pads. Wipe paws with a damp cloth before going inside the hotel; in heavy salt zones use a paw balm (Mushers Secret is the verified standard) or boots. Cobbled medieval streets get slippery wet - go slowly and use a short leash near steps.` },
      { h: 'Indoor escape plan', p: `Cold + crowds + smells = stress, even for confident dogs. Plan an indoor break every 90 minutes: a dog-friendly café, the hotel room, or a covered arcade. Vienna's coffee-house culture is exceptional for this. Cologne and Bruges have warm covered halls. Prague has beer halls. Strasbourg/Colmar has bakeries that quietly accept a small leashed dog.` },
    ],
    faqHeading: 'Frequently asked questions',
    faqs: [
      { q: 'Can my dog go INTO the wooden Christmas stalls?', a: `Standing in front and being served is always fine. Going inside the small wooden chalets is up to the vendor and usually no (it is their kitchen). Most vendors will happily slip a treat over the counter if you ask.` },
      { q: 'What about the giant ice rinks at the markets?', a: `Ice rinks are humans-only - dogs would damage the ice and be unsafe on it. Vienna Rathausplatz, Bruges Markt, Cologne Heumarkt and Strasbourg Place Kléber all have rinks. Your dog watches from the wooden boards perimeter; many ringside cafés have outdoor heaters and welcome a leashed dog.` },
      { q: 'Best dates to avoid the worst crowds?', a: `Opening week (last week of November) and the week between 26-31 December are the calmest. The closer you get to 21-24 December, the denser the crowds. Reservations at hotel restaurants are essential from 6 December onwards.` },
      { q: 'Cross-border by train?', a: `Strasbourg-Colmar TER (30 min), Vienna-Salzburg ÖBB (2.5 h, dogs €5 with muzzle), Cologne-Aachen DB (45 min), Prague-Dresden (2 h). Eurostar accepts assistance dogs only - for the UK, the Cherbourg + train via Paris route is the workaround for a pet dog.` },
    ],
  },
  fr: {
    eyebrow: `MARCHÉS DE NOËL · PET-FRIENDLY EUROPE`,
    title: `Marchés de Noël dog-friendly : 8 villes européennes où les animaux sont bienvenus`,
    intro: `Décembre est le mois le plus amical de l'année pour voyager avec son chien. La météo convient activement aux races qui souffrent en été (huskies, bernois, double poil de tout type), la foule est emmitouflée plus chaudement et moins réactive aux chiens aux pieds, et les chalets en bois des marchés sont fondamentalement plats, lents et au rythme du chien. On a sélectionné huit marchés européens qui accueillent vraiment les chiens en laisse - l'étiquette est universelle : garder le chien près, loin des échantillons et hors de la zone graisse bratwurst.`,
    pickHeading: 'Les huit picks',
    whyHere: 'Pourquoi ici',
    datesLabel: 'Dates du marché',
    hotelLabel: 'Où dormir',
    seeDestCta: 'Guide complet →',
    hotelCta: 'Voir les disponibilités →',
    practicalHeading: 'Info pratique marchés de Noël avec chien',
    practical: [
      { h: 'Gestion de la foule', p: `Les marchés de Noël culminent le vendredi soir et le week-end. Préférez les matinées en semaine (10h-12h) ou les après-midis en semaine (15h-17h) pour le confort du chien. Évitez les zones Glühwein à 19h-22h : la graisse de bratwurst au sol et la foule oscillante sont durs pour un petit chien. Porter un petit chien dans les zones les plus denses est OK.` },
      { h: 'Vin chaud + chien', p: `Glühwein, Glögg, vin chaud sont servis en céramiques qui chauffent. Tenez la tasse au-dessus de la tête du chien, pas devant, et ne la posez jamais sur un rebord bas qu'un nez curieux peut atteindre. Le vin chaud renversé est mauvais pour les chiens (alcool + sucre + cannelle). Emportez votre eau et gamelle.` },
      { h: 'Soin des pattes en hiver', p: `Le sel et les gravillons sur la chaussée abîment les coussinets. Essuyez les pattes au gant humide avant de rentrer à l'hôtel ; en zones très salées utilisez un baume (Mushers Secret est la référence) ou des chaussons. Les rues médiévales pavées deviennent glissantes mouillées - allez doucement et laisse courte près des marches.` },
      { h: `Plan d'évasion à l'intérieur`, p: `Froid + foule + odeurs = stress, même pour les chiens confiants. Prévoyez une pause intérieure toutes les 90 min : un café dog-friendly, la chambre d'hôtel, ou un passage couvert. La culture café viennoise est exceptionnelle pour ça. Cologne et Bruges ont des halles couvertes chauffées. Prague a les brasseries. Strasbourg/Colmar a les boulangeries qui acceptent discrètement un petit chien en laisse.` },
    ],
    faqHeading: 'Questions fréquentes',
    faqs: [
      { q: 'Mon chien peut-il entrer DANS les chalets en bois ?', a: `Se tenir devant et se faire servir est toujours OK. Entrer dans les petits chalets dépend du vendeur et c'est généralement non (c'est leur cuisine). La plupart des vendeurs glisseront volontiers une friandise par-dessus le comptoir si vous demandez.` },
      { q: 'Et les grandes patinoires des marchés ?', a: `Les patinoires sont humains-seulement - les chiens abîmeraient la glace et seraient en danger. Vienne Rathausplatz, Bruges Markt, Cologne Heumarkt et Strasbourg Place Kléber ont des patinoires. Le chien regarde depuis le périmètre en bois ; beaucoup de cafés en bordure ont des chauffages extérieurs et acceptent un chien en laisse.` },
      { q: 'Meilleures dates pour éviter le pic de foule ?', a: `La semaine d'ouverture (dernière semaine de novembre) et la semaine du 26-31 décembre sont les plus calmes. Plus on approche du 21-24 décembre, plus la foule est dense. Réservations restaurant d'hôtel essentielles à partir du 6 décembre.` },
      { q: 'Transfrontalier en train ?', a: `Strasbourg-Colmar TER (30 min), Vienne-Salzbourg ÖBB (2h30, chiens 5 € avec muselière), Cologne-Aix-la-Chapelle DB (45 min), Prague-Dresde (2h). Eurostar accepte chiens d'assistance uniquement - pour le UK, le ferry Cherbourg + train via Paris est le contournement pour un chien de compagnie.` },
    ],
  },
  es: {
    eyebrow: `MERCADOS NAVIDEÑOS · PET-FRIENDLY EUROPA`,
    title: `Mercados navideños dog-friendly: 8 ciudades europeas que admiten mascotas`,
    intro: `Diciembre es el mes más amable del año para viajar con perro. El tiempo conviene activamente a las razas que sufren en verano (huskies, berneses, doble pelo de todo tipo), la multitud está más abrigada y menos reactiva a perros a los pies, y los puestos de madera de los mercados son inherentemente llanos, lentos y al ritmo del perro. Hemos seleccionado ocho mercados europeos que admiten realmente perros con correa - la etiqueta es universal: mantener al perro cerca, lejos de las muestras y fuera de la zona de grasa bratwurst.`,
    pickHeading: 'Las ocho elecciones',
    whyHere: 'Por qué aquí',
    datesLabel: 'Fechas del mercado',
    hotelLabel: 'Dónde alojarse',
    seeDestCta: 'Guía completa →',
    hotelCta: 'Ver disponibilidad →',
    practicalHeading: 'Info práctica mercados navideños con perro',
    practical: [
      { h: 'Gestión de la multitud', p: `Los mercados navideños tienen su pico viernes noche y fines de semana. Mejor ir en mañanas entre semana (10h-12h) o tardes entre semana (15h-17h) para la comodidad del perro. Evita zonas Glühwein de 19h-22h: la grasa de bratwurst en el suelo y la multitud oscilante son duros para un perro pequeño. Llevar a un perrito en brazos por las zonas más densas es OK.` },
      { h: 'Vino caliente + perro', p: `Glühwein, Glögg, vino caliente se sirven en cerámicas que se calientan. Sujeta la taza por encima de la cabeza del perro, no delante, y nunca la pongas en un saliente bajo que un hocico curioso pueda alcanzar. El vino caliente derramado es malo para perros (alcohol + azúcar + canela). Lleva tu agua y cuenco.` },
      { h: 'Cuidado de almohadillas en invierno', p: `La sal y la gravilla en las calles dañan las almohadillas. Limpia las patas con paño húmedo antes de entrar al hotel; en zonas muy saladas usa un bálsamo (Mushers Secret es la referencia) o botines. Las calles medievales adoquinadas resbalan mojadas - ve despacio y correa corta cerca de los escalones.` },
      { h: 'Plan de escape interior', p: `Frío + multitud + olores = estrés, incluso para perros confiados. Planifica una pausa interior cada 90 min: un café dog-friendly, la habitación, o un pasaje cubierto. La cultura del café vienés es excepcional para esto. Colonia y Brujas tienen halls cubiertos calefactados. Praga tiene cervecerías. Estrasburgo/Colmar tiene panaderías que aceptan discretamente un perrito con correa.` },
    ],
    faqHeading: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Mi perro puede entrar DENTRO de los puestos de madera?', a: `Estar de pie delante y que te sirvan siempre está OK. Entrar dentro de los pequeños chalets depende del vendedor y suele ser no (es su cocina). La mayoría de vendedores deslizarán encantados una golosina por encima del mostrador si lo pides.` },
      { q: '¿Y las grandes pistas de hielo de los mercados?', a: `Las pistas de hielo son solo humanos - los perros dañarían el hielo y estarían en peligro. Viena Rathausplatz, Brujas Markt, Colonia Heumarkt y Estrasburgo Place Kléber tienen pistas. El perro mira desde el perímetro de madera; muchos cafés del borde tienen calefactores exteriores y admiten un perro con correa.` },
      { q: 'Mejores fechas para evitar el pico de multitud?', a: `La semana de apertura (última semana de noviembre) y la semana del 26-31 diciembre son las más tranquilas. Cuanto más te acercas al 21-24 diciembre, más densa es la multitud. Reservas en restaurantes de hotel esenciales desde el 6 de diciembre.` },
      { q: '¿Transfronterizo en tren?', a: `Estrasburgo-Colmar TER (30 min), Viena-Salzburgo ÖBB (2h30, perros 5 € con bozal), Colonia-Aquisgrán DB (45 min), Praga-Dresde (2 h). Eurostar admite solo perros de asistencia - para Reino Unido, el ferri Cherburgo + tren vía París es la vía para un perro de compañía.` },
    ],
  },
  pt: {
    eyebrow: `MERCADOS DE NATAL · PET-FRIENDLY EUROPA`,
    title: `Mercados de Natal dog-friendly: 8 cidades europeias que aceitam animais`,
    intro: `Dezembro é o mês mais amigável do ano para viajar com cão. O tempo convém ativamente às raças que sofrem no verão (huskies, berneses, pelo duplo de todo o tipo), a multidão está mais agasalhada e menos reativa a cães aos pés, e as barracas de madeira dos mercados são inerentemente planas, lentas e ao ritmo do cão. Selecionámos oito mercados europeus que aceitam genuinamente cães à trela - a etiqueta é universal: manter o cão próximo, longe das amostras e fora da zona de gordura de bratwurst.`,
    pickHeading: 'As oito escolhas',
    whyHere: 'Porquê aqui',
    datesLabel: 'Datas do mercado',
    hotelLabel: 'Onde ficar',
    seeDestCta: 'Guia completo →',
    hotelCta: 'Ver disponibilidade →',
    practicalHeading: 'Info prática mercados de Natal com cão',
    practical: [
      { h: 'Gestão da multidão', p: `Os mercados de Natal têm pico sexta à noite e fins-de-semana. Prefira manhãs de semana (10h-12h) ou tardes de semana (15h-17h) para o conforto do cão. Evite zonas Glühwein das 19h-22h: a gordura de bratwurst no chão e a multidão oscilante são duras para um cão pequeno. Levar um cãozinho ao colo pelas zonas mais densas é OK.` },
      { h: 'Vinho quente + cão', p: `Glühwein, Glögg, vinho quente são servidos em cerâmicas que aquecem. Segure a chávena acima da cabeça do cão, não à frente, e nunca a pouse num rebordo baixo que um focinho curioso possa alcançar. Vinho quente entornado é mau para cães (álcool + açúcar + canela). Leve a sua água e tigela.` },
      { h: 'Cuidado de almofadinhas no inverno', p: `O sal e o saibro nas ruas danificam as almofadinhas. Limpe as patas com pano húmido antes de entrar no hotel; em zonas muito salgadas use bálsamo (Mushers Secret é a referência) ou sapatinhos. As ruas medievais calcetadas escorregam molhadas - vá devagar e trela curta perto de degraus.` },
      { h: 'Plano de fuga interior', p: `Frio + multidão + cheiros = stress, mesmo para cães confiantes. Planeie uma pausa interior cada 90 min: um café dog-friendly, o quarto, ou uma passagem coberta. A cultura do café vienense é excecional para isto. Colónia e Bruges têm halls cobertos aquecidos. Praga tem cervejarias. Estrasburgo/Colmar tem padarias que aceitam discretamente um cãozinho à trela.` },
    ],
    faqHeading: 'Perguntas frequentes',
    faqs: [
      { q: 'O meu cão pode entrar DENTRO das barracas de madeira?', a: `Estar de pé à frente e ser servido está sempre OK. Entrar dentro dos pequenos chalés depende do vendedor e costuma ser não (é a cozinha deles). A maioria dos vendedores passa de boa-vontade uma guloseima por cima do balcão se pedir.` },
      { q: 'E as grandes pistas de gelo dos mercados?', a: `As pistas de gelo são só humanos - os cães danificariam o gelo e estariam em perigo. Viena Rathausplatz, Bruges Markt, Colónia Heumarkt e Estrasburgo Place Kléber têm pistas. O cão observa do perímetro de madeira; muitos cafés à beira têm aquecedores exteriores e aceitam um cão à trela.` },
      { q: 'Melhores datas para evitar o pico de multidão?', a: `A semana de abertura (última semana de novembro) e a semana de 26-31 de dezembro são as mais calmas. Quanto mais se aproxima de 21-24 de dezembro, mais densa é a multidão. Reservas em restaurantes de hotel essenciais a partir de 6 de dezembro.` },
      { q: 'Transfronteiriço de comboio?', a: `Estrasburgo-Colmar TER (30 min), Viena-Salzburgo ÖBB (2h30, cães 5 € com açaime), Colónia-Aquisgrão DB (45 min), Praga-Dresden (2 h). Eurostar aceita só cães de assistência - para o Reino Unido, o ferry Cherbourg + comboio via Paris é a alternativa para um cão de companhia.` },
    ],
  },
  de: {
    eyebrow: `WEIHNACHTSMÄRKTE · HAUSTIERFREUNDLICHES EUROPA`,
    title: `Hundefreundliche Weihnachtsmärkte: 6 europäische Städte, die Haustiere willkommen heißen`,
    intro: `Dezember ist der hundefreundlichste Monat des Jahres zum Reisen. Das Wetter kommt den Rassen entgegen, die im Sommer leiden (Huskys, Berner Sennenhunde, alles mit doppeltem Fell), die Menschenmenge ist wärmer eingepackt und reagiert gelassener auf Hunde zu ihren Füßen, und die hölzernen Weihnachtsmarktbuden sind von Natur aus flach, langsam und im Hundetempo. Wir haben acht europäische Weihnachtsmärkte ausgewählt, die Hunde an der Leine wirklich willkommen heißen, die Etikette ist universell: Hund nah halten, weg von Kostproben und aus der Bratwurst-Fettzone heraus.`,
    pickHeading: 'Die acht Auswahlen',
    whyHere: 'Warum hier',
    datesLabel: 'Markttermine',
    hotelLabel: 'Wo übernachten',
    seeDestCta: 'Vollständiger Stadtführer →',
    hotelCta: 'Verfügbarkeit ansehen →',
    practicalHeading: 'Praktische Infos für Weihnachtsmärkte mit Hund',
    practical: [
      { h: 'Besuchermanagement', p: `Weihnachtsmärkte erreichen ihren Höhepunkt am Freitagabend und am Wochenende. Gehen Sie unter der Woche vormittags (10:00–12:00 Uhr) oder nachmittags (15:00–17:00 Uhr), damit es für Ihren Hund angenehm bleibt. Meiden Sie die Glühweinzonen zwischen 19:00 und 22:00 Uhr: das Bratwurstfett am Boden und die schwankende Menschenmenge sind für einen kleinen Hund hart. Einen kleinen Hund durch die dichtesten Zonen zu tragen, ist in Ordnung.` },
      { h: 'Glühwein + Hund', p: `Glühwein, Glögg, Vin chaud werden in Keramikbechern serviert, die heiß werden. Halten Sie den Becher über dem Kopf des Hundes, nicht davor, und stellen Sie ihn nie auf eine niedrige Ablage, die eine neugierige Nase erreichen kann. Verschütteter Glühwein ist schlecht für Hunde (Alkohol + Zucker + Zimt). Bringen Sie Ihre eigene Wasserflasche und einen Napf mit.` },
      { h: 'Pfotenpflege im Winter', p: `Salz und Splitt auf den Straßen scheuern die Pfotenballen auf. Wischen Sie die Pfoten vor dem Betreten des Hotels mit einem feuchten Tuch ab; in stark gesalzenen Zonen verwenden Sie eine Pfotensalbe (Mushers Secret ist der bewährte Standard) oder Hundeschuhe. Gepflasterte mittelalterliche Gassen werden bei Nässe rutschig, gehen Sie langsam und nutzen Sie in der Nähe von Treppen eine kurze Leine.` },
      { h: 'Fluchtplan drinnen', p: `Kälte + Menschenmenge + Gerüche = Stress, selbst für selbstsichere Hunde. Planen Sie alle 90 Minuten eine Pause drinnen ein: ein hundefreundliches Café, das Hotelzimmer oder eine überdachte Passage. Wiens Kaffeehauskultur ist dafür ausgezeichnet geeignet. Köln und Brügge haben warme, überdachte Hallen. Prag hat Bierstuben. Straßburg/Colmar hat Bäckereien, die einen kleinen angeleinten Hund still akzeptieren.` },
    ],
    faqHeading: 'Häufig gestellte Fragen',
    faqs: [
      { q: 'Darf mein Hund IN die hölzernen Weihnachtsmarktbuden?', a: `Davorstehen und bedient werden ist immer in Ordnung. Ob er in die kleinen Holzhütten darf, entscheidet der Verkäufer, meist lautet die Antwort Nein (es ist seine Küche). Die meisten Verkäufer reichen gerne ein Leckerli über die Theke, wenn Sie danach fragen.` },
      { q: 'Was ist mit den riesigen Eisbahnen auf den Märkten?', a: `Eisbahnen sind nur für Menschen, Hunde würden das Eis beschädigen und wären darauf unsicher. Wiens Rathausplatz, Brügges Markt, Kölns Heumarkt und Straßburgs Place Kléber haben alle Eisbahnen. Ihr Hund schaut vom hölzernen Rand aus zu; viele Cafés am Rand haben Außenheizungen und heißen einen angeleinten Hund willkommen.` },
      { q: 'Beste Termine, um den größten Andrang zu vermeiden?', a: `Die Eröffnungswoche (letzte Novemberwoche) und die Woche zwischen dem 26. und 31. Dezember sind am ruhigsten. Je näher der 21. bis 24. Dezember rückt, desto dichter wird der Andrang. Reservierungen in Hotelrestaurants sind ab dem 6. Dezember unerlässlich.` },
      { q: 'Grenzüberschreitend mit dem Zug?', a: `Straßburg-Colmar TER (30 Min.), Wien-Salzburg ÖBB (2,5 Std., Hunde 5 € mit Maulkorb), Köln-Aachen DB (45 Min.), Prag-Dresden (2 Std.). Der Eurostar akzeptiert nur Assistenzhunde, für Großbritannien ist die Fährverbindung Cherbourg + Zug über Paris die Umgehungslösung für einen Haustierhund.` },
    ],
  },
  nl: {
    eyebrow: `KERSTMARKTEN · HUISDIERVRIENDELIJK EUROPA`,
    title: `Hondvriendelijke kerstmarkten: 8 Europese steden waar huisdieren welkom zijn`,
    intro: `December is de hondvriendelijkste maand van het jaar om te reizen. Het weer komt precies tegemoet aan de rassen die in de zomer lijden (husky's, Berner Sennenhonden, alles met dubbele vacht), de menigte is warmer ingepakt en reageert relaxter op honden aan hun voeten, en de houten kraampjes van de kerstmarkt zijn van nature vlak, langzaam en op hondentempo. We hebben acht Europese kerstmarkten geselecteerd die aangelijnde honden écht welkom heten, de etiquette is universeel: houd je hond dichtbij, weg van proefhapjes en uit de bratwurst-vetzone.`,
    pickHeading: 'De acht keuzes',
    whyHere: 'Waarom hier',
    datesLabel: 'Marktdata',
    hotelLabel: 'Waar je kunt overnachten',
    seeDestCta: 'Volledige stadsgids →',
    hotelCta: 'Bekijk beschikbaarheid →',
    practicalHeading: 'Praktische info voor kerstmarkten met je hond',
    practical: [
      { h: 'Drukte beheren', p: `Kerstmarkten pieken op vrijdagavond en in het weekend. Ga doordeweeks 's ochtends (10.00-12.00 uur) of 's middags (15.00-17.00 uur) voor het comfort van je hond. Vermijd de glühweinzones tussen 19.00 en 22.00 uur: het bratwurstvet op de grond en de zwalkende menigte zijn zwaar voor een kleine hond. Je hondje door de drukste zones dragen is prima.` },
      { h: 'Glühwein + hond', p: `Glühwein, Glögg, vin chaud worden geserveerd in keramische bekers die heet worden. Houd de beker boven de kop van je hond, niet ervoor, en zet hem nooit neer op een laag richeltje dat een nieuwsgierige neus kan bereiken. Gemorste glühwein is slecht voor honden (alcohol + suiker + kaneel). Neem je eigen waterfles en bak mee.` },
      { h: 'Pootverzorging in de winter', p: `Zout en split op straat schuren de voetkussentjes kapot. Veeg de poten met een vochtige doek af voordat je het hotel binnengaat; in zwaar gezouten zones gebruik je pootbalsem (Mushers Secret is de bewezen standaard) of hondenschoentjes. Geplaveide middeleeuwse straatjes worden glad als het nat is, ga langzaam en gebruik een korte lijn bij trappen.` },
      { h: 'Vluchtplan naar binnen', p: `Kou + drukte + geuren = stress, zelfs voor zelfverzekerde honden. Plan elke 90 minuten een pauze binnen: een hondvriendelijk café, de hotelkamer, of een overdekte passage. De koffiehuiscultuur van Wenen is hiervoor uitstekend geschikt. Keulen en Brugge hebben warme overdekte hallen. Praag heeft bierhuizen. Straatsburg/Colmar heeft bakkerijen die stilletjes een klein aangelijnd hondje toelaten.` },
    ],
    faqHeading: 'Veelgestelde vragen',
    faqs: [
      { q: 'Mag mijn hond IN de houten kerstkraampjes?', a: `Ervoor staan en bediend worden is altijd prima. Naar binnen mogen in de kleine houten hutjes is aan de verkoper en meestal niet (het is hun keuken). De meeste verkopers schuiven graag een hapje over de toonbank als je erom vraagt.` },
      { q: 'En de reuzenschaatsbanen op de markten?', a: `Schaatsbanen zijn alleen voor mensen, honden zouden het ijs beschadigen en er onveilig op zijn. Wenen Rathausplatz, Brugge Markt, Keulen Heumarkt en Straatsburg Place Kléber hebben allemaal een schaatsbaan. Je hond kijkt toe vanaf de houten omranding; veel cafés langs de rand hebben terrasverwarming en heten een aangelijnde hond welkom.` },
      { q: 'Beste data om de grootste drukte te vermijden?', a: `De openingsweek (laatste week van november) en de week tussen 26-31 december zijn het rustigst. Hoe dichter je bij 21-24 december komt, hoe drukker het wordt. Reserveringen bij hotelrestaurants zijn essentieel vanaf 6 december.` },
      { q: 'Grensoverschrijdend met de trein?', a: `Straatsburg-Colmar TER (30 min), Wenen-Salzburg ÖBB (2,5 uur, honden € 5 met muilkorf), Keulen-Aken DB (45 min), Praag-Dresden (2 uur). Eurostar accepteert alleen assistentiehonden, voor het VK is de route Cherbourg + trein via Parijs de omweg voor een gezelschapshond.` },
    ],
  },
  it: {
    eyebrow: `MERCATINI DI NATALE · EUROPA PET-FRIENDLY`,
    title: `Mercatini di Natale pet-friendly: 8 città europee che accolgono gli animali`,
    intro: `Dicembre è il mese più amichevole dell'anno per viaggiare con il tuo cane. Il clima va incontro alle razze che soffrono d'estate (husky, bovari del bernese, tutto ciò che ha il doppio pelo), la folla è più imbacuccata e meno reattiva ai cani tra i piedi, e le bancarelle di legno dei mercatini sono per natura piatte, lente e al ritmo del cane. Abbiamo scelto otto mercatini di Natale europei che accolgono davvero i cani al guinzaglio - il galateo è universale: tienilo vicino, lontano dagli assaggi e fuori dalla zona unta del bratwurst.`,
    pickHeading: 'Le otto scelte',
    whyHere: 'Perché qui',
    datesLabel: 'Date del mercatino',
    hotelLabel: 'Dove dormire',
    seeDestCta: 'Guida completa della città →',
    hotelCta: 'Vedi disponibilità →',
    practicalHeading: 'Info pratiche per i mercatini di Natale con il cane',
    practical: [
      { h: 'Gestione della folla', p: `I mercatini di Natale hanno il picco il venerdì sera e nei weekend. Vai nei giorni feriali di mattina (10:00-12:00) o di pomeriggio (15:00-17:00) per il comfort del tuo cane. Evita le zone del vin brulé dalle 19:00 alle 22:00: l'unto di bratwurst per terra e la folla che ondeggia sono duri per un cane piccolo. Portare in braccio un cane piccolo nelle zone più affollate va benissimo.` },
      { h: 'Vin brulé + cane', p: `Glühwein, Glögg, vin chaud vengono serviti in tazze di ceramica che scottano. Tieni la tazza sopra la testa del cane, non davanti, e non appoggiarla mai su un ripiano basso raggiungibile da un naso curioso. Il vin brulé rovesciato fa male ai cani (alcol + zucchero + cannella). Porta con te la tua bottiglia d'acqua e una ciotola.` },
      { h: 'Cura delle zampe in inverno', p: `Il sale e la graniglia sulle strade sono abrasivi per i cuscinetti. Pulisci le zampe con un panno umido prima di entrare in hotel; nelle zone molto salate usa un balsamo per zampe (Mushers Secret è lo standard verificato) o degli stivaletti. Le strade medievali lastricate diventano scivolose quando sono bagnate: vai piano e usa un guinzaglio corto vicino ai gradini.` },
      { h: 'Piano di fuga al chiuso', p: `Freddo + folla + odori = stress, anche per i cani più sicuri di sé. Pianifica una pausa al chiuso ogni 90 minuti: un caffè pet-friendly, la camera d'hotel, o un passaggio coperto. La cultura dei caffè viennesi è eccezionale per questo. Colonia e Bruges hanno gallerie coperte riscaldate. Praga ha le birrerie. Strasburgo/Colmar ha panetterie che accettano discretamente un cagnolino al guinzaglio.` },
    ],
    faqHeading: 'Domande frequenti',
    faqs: [
      { q: 'Il mio cane può entrare DENTRO le bancarelle di legno?', a: `Stare davanti e farsi servire va sempre bene. Entrare nei piccoli chalet di legno dipende dal venditore ed di solito la risposta è no (è la sua cucina). La maggior parte dei venditori è felice di passarti un premietto sul bancone se lo chiedi.` },
      { q: 'E le grandi piste di pattinaggio sul ghiaccio nei mercatini?', a: `Le piste di ghiaccio sono solo per umani - i cani danneggerebbero il ghiaccio e sarebbero in pericolo. Vienna Rathausplatz, Bruges Markt, Colonia Heumarkt e Strasburgo Place Kléber hanno tutte una pista. Il tuo cane guarda dal perimetro di legno; molti caffè a bordo pista hanno stufe esterne e accolgono un cane al guinzaglio.` },
      { q: 'Le date migliori per evitare la folla peggiore?', a: `La settimana di apertura (ultima settimana di novembre) e la settimana tra il 26 e il 31 dicembre sono le più tranquille. Più ti avvicini al 21-24 dicembre, più la folla si fa densa. Le prenotazioni nei ristoranti degli hotel sono essenziali dal 6 dicembre in poi.` },
      { q: 'Attraversare i confini in treno?', a: `Strasburgo-Colmar TER (30 min), Vienna-Salisburgo ÖBB (2,5 ore, cani 5 € con museruola), Colonia-Aquisgrana DB (45 min), Praga-Dresda (2 ore). L'Eurostar accetta solo cani di assistenza - per il Regno Unito, la tratta Cherbourg + treno via Parigi è la soluzione alternativa per un cane da compagnia.` },
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

  const pickWhy = (p: Pick) => locale === 'fr' ? p.whyFr : locale === 'es' ? p.whyEs : locale === 'pt' ? p.whyPt : locale === 'nl' ? p.whyNl : locale === 'de' ? p.whyDe : locale === 'it' ? p.whyIt : p.whyEn
  const pickHotel = (p: Pick) => locale === 'fr' ? p.hotelFr : locale === 'es' ? p.hotelEs : locale === 'pt' ? p.hotelPt : locale === 'nl' ? p.hotelNl : locale === 'de' ? p.hotelDe : locale === 'it' ? p.hotelIt : p.hotelEn

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-red-900 via-emerald-800 to-amber-700 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 40%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-xs font-semibold uppercase tracking-widest text-red-100 mb-3">🎄 {t.eyebrow}</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{t.title}</h1>
          <p className="text-lg sm:text-xl text-amber-50 leading-relaxed">{t.intro}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-8">{t.pickHeading}</h2>
        <div className="space-y-5">
          {PICKS.map((p, i) => (
            <article key={`${p.slug}-${i}`} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <header className="px-5 sm:px-7 py-4 bg-gradient-to-r from-red-50 to-emerald-50 border-b border-stone-200">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-2xl font-black text-red-800">#{i + 1}</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                    <Link href={`/${locale}${p.destPath}`} className="hover:text-red-700">{p.name}</Link>
                  </h3>
                  <span className="text-sm text-stone-600">{p.country}</span>
                  <span className="ml-auto bg-red-100 text-red-900 text-xs font-bold px-3 py-1 rounded-full">
                    {p.dates}
                  </span>
                </div>
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
                  <Link href={`/${locale}${p.destPath}`} className="text-sm font-semibold text-red-700 hover:text-red-900 hover:underline">
                    {t.seeDestCta}
                  </Link>
                  <a
                    href={buildAllezDestLink(p.name, p.country, `${CAMPAIGN_BASE}-${p.slug}-${i}`, 3)}
                    target="_blank"
                    rel="noopener sponsored"
                    className="text-sm font-semibold text-stone-700 hover:text-red-700 hover:underline"
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
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">🧣 {t.practicalHeading}</h2>
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
        href={buildAllezDestLink('Strasbourg', 'France', `${CAMPAIGN_BASE}-sticky`, 3)}
      />
    </main>
  )
}
