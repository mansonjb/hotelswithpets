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
    en: `Dog-Friendly Christmas Markets in Europe: 6 Cities Where Pets Are Welcome (2026) | HotelsWithPets.com`,
    fr: `Marchés de Noël dog-friendly en Europe : 6 villes où les animaux sont bienvenus (2026) | HotelsWithPets.com`,
    es: `Mercados navideños dog-friendly en Europa: 6 ciudades que admiten mascotas (2026) | HotelsWithPets.com`,
    pt: `Mercados de Natal dog-friendly na Europa: 6 cidades que aceitam animais (2026) | HotelsWithPets.com`,
  }
  const descriptions: Record<string, string> = {
    en: `Six European cities where Christmas markets genuinely welcome leashed dogs and the cold weather is your ally. Strasbourg, Vienna, Cologne, Prague, Bruges and Colmar with verified pet-friendly hotels and wooden stall etiquette.`,
    fr: `Six villes européennes où les marchés de Noël accueillent vraiment les chiens en laisse et où le froid est votre allié. Strasbourg, Vienne, Cologne, Prague, Bruges et Colmar avec hôtels pet-friendly vérifiés et étiquette des chalets en bois.`,
    es: `Seis ciudades europeas donde los mercados navideños realmente admiten perros con correa y donde el frío es tu aliado. Estrasburgo, Viena, Colonia, Praga, Brujas y Colmar con hoteles pet-friendly verificados.`,
    pt: `Seis cidades europeias onde os mercados de Natal aceitam realmente cães à trela e onde o frio é o seu aliado. Estrasburgo, Viena, Colónia, Praga, Bruges e Colmar com hotéis pet-friendly verificados.`,
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
  dates: string
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
    slug: 'strasbourg',
    name: 'Strasbourg',
    country: 'France',
    destPath: '/destinations/strasbourg',
    dates: '25 Nov - 24 Dec',
    whyEn: `The Christkindelsmärik since 1570 - the oldest still-running Christmas market in France. The market spreads across 12 squares in the UNESCO Grande Île, all cobbled and walkable with a leashed dog. The cathedral square (Place de la Cathédrale) is the iconic photo and a 4-second walk from the Petite France district. Trams accept leashed dogs free.`,
    whyFr: `Le Christkindelsmärik depuis 1570 - le plus ancien marché de Noël encore en activité en France. Le marché s'étend sur 12 places dans la Grande Île UNESCO, toutes pavées et praticables en laisse. Le parvis de la cathédrale (Place de la Cathédrale) est la photo iconique à 4 secondes à pied du quartier de la Petite France. Les trams acceptent les chiens en laisse gratuits.`,
    whyEs: `El Christkindelsmärik desde 1570 - el mercado navideño más antiguo aún en activo de Francia. El mercado se extiende por 12 plazas en la Grande Île UNESCO, todas adoquinadas y recorribles con perro con correa. La plaza de la catedral (Place de la Cathédrale) es la foto icónica a 4 segundos a pie del barrio de la Petite France. Los tranvías admiten perros con correa gratis.`,
    whyPt: `O Christkindelsmärik desde 1570 - o mercado de Natal mais antigo ainda em atividade em França. O mercado estende-se por 12 praças na Grande Île UNESCO, todas calcetadas e percorríveis com cão à trela. O adro da catedral (Place de la Cathédrale) é a foto icónica a 4 segundos a pé do bairro da Petite France. Os elétricos aceitam cães à trela gratuitamente.`,
    hotelName: `Hôtel Régent Petite France`,
    hotelEn: `4-star inside a converted 18th-century ice factory on the Ill river in Petite France. Pets up to 10 kg welcomed (small fee), the riverside rooms have the postcard half-timbered houses view, 5-min walk to the Christkindelsmärik.`,
    hotelFr: `4 étoiles dans une ancienne glacière du XVIIIᵉ sur l'Ill dans la Petite France. Chiens jusqu'à 10 kg acceptés (petit supplément), les chambres côté rivière ont la vue carte postale sur les maisons à colombages, 5 min à pied du Christkindelsmärik.`,
    hotelEs: `4 estrellas en una antigua fábrica de hielo del siglo XVIII junto al Ill en la Petite France. Perros hasta 10 kg admitidos (pequeño suplemento), las habitaciones lado río tienen la vista postal sobre las casas con entramado, 5 min andando al Christkindelsmärik.`,
    hotelPt: `4 estrelas numa antiga fábrica de gelo do século XVIII junto ao Ill na Petite France. Cães até 10 kg aceites (pequena taxa), os quartos lado rio têm a vista postal sobre as casas em tabique, 5 min a pé do Christkindelsmärik.`,
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
    hotelName: 'Hotel Sacher Wien',
    hotelEn: `5-star palace opposite the State Opera, with the original Sacher-Torte café on site. Pets welcomed at modest fee, dog bed and bowl provided, the Albertinaplatz Christmas market is a 1-min walk and the Rathausplatz market is 10 min via tram 1 or 71.`,
    hotelFr: `Palace 5 étoiles face à l'Opéra d'État, avec le café Sacher-Torte original sur place. Chiens acceptés (supplément modéré), panier et gamelle fournis, le marché de l'Albertinaplatz est à 1 min à pied et le Rathausplatz à 10 min en tram 1 ou 71.`,
    hotelEs: `Palacio 5 estrellas frente a la Ópera Estatal, con el café Sacher-Torte original in situ. Perros admitidos (suplemento moderado), cama y comedero, el mercado de la Albertinaplatz a 1 min andando y el Rathausplatz a 10 min en tranvía 1 o 71.`,
    hotelPt: `Palace 5 estrelas em frente à Ópera Estatal, com o café Sacher-Torte original no local. Cães aceites (taxa moderada), cama e tigela, o mercado da Albertinaplatz a 1 min a pé e o Rathausplatz a 10 min de elétrico 1 ou 71.`,
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
    hotelName: 'Excelsior Hotel Ernst am Dom',
    hotelEn: `5-star opposite the cathedral and the main Christmas market. Pets up to 14 kg welcomed (small fee), dog bed and welcome treats, the marble lobby tolerates a quiet leashed dog while you defrost.`,
    hotelFr: `5 étoiles face à la cathédrale et au marché principal. Chiens jusqu'à 14 kg acceptés (petit supplément), couchage et friandises de bienvenue, le lobby en marbre tolère un chien en laisse calme pendant que vous dégelez.`,
    hotelEs: `5 estrellas frente a la catedral y al mercado principal. Perros hasta 14 kg admitidos (pequeño suplemento), cama y golosinas de bienvenida, el lobby de mármol tolera un perro con correa tranquilo mientras te descongelas.`,
    hotelPt: `5 estrelas em frente à catedral e ao mercado principal. Cães até 14 kg aceites (pequena taxa), cama e guloseimas de boas-vindas, o lobby de mármore tolera um cão à trela calmo enquanto descongela.`,
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
    hotelName: 'Hotel U Prince',
    hotelEn: `Boutique 4-star directly on the Old Town Square, dating from 1380. Pets welcomed at modest fee, the rooftop terrace restaurant with cathedral view tolerates a quiet leashed dog, and the market stalls are literally at the hotel door.`,
    hotelFr: `Boutique 4 étoiles directement sur la place de la Vieille Ville, datant de 1380. Chiens acceptés (supplément modéré), la terrasse rooftop avec vue cathédrale tolère un chien en laisse calme, et les chalets du marché sont littéralement à la porte de l'hôtel.`,
    hotelEs: `Boutique 4 estrellas directamente en la plaza de la Ciudad Vieja, de 1380. Perros admitidos (suplemento moderado), la terraza con vista a la catedral tolera un perro con correa tranquilo, y los puestos del mercado están literalmente a la puerta del hotel.`,
    hotelPt: `Boutique 4 estrelas diretamente na praça da Cidade Velha, de 1380. Cães aceites (taxa moderada), a esplanada com vista para a catedral tolera um cão à trela calmo, e as barracas do mercado estão literalmente à porta do hotel.`,
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
    hotelName: 'Boutique Hotel De Castillion',
    hotelEn: `15-room townhouse in a former bishop's residence, 6-min walk to the Markt and the Wintermärkt. Pets up to 10 kg welcomed (modest fee), breakfast in the walled garden, the in-house bistro tolerates a quiet leashed dog at dinner.`,
    hotelFr: `15 chambres dans une ancienne résidence épiscopale, 6 min à pied du Markt et du Wintermärkt. Chiens jusqu'à 10 kg acceptés (supplément modéré), petit-déjeuner dans le jardin clos, le bistrot de l'hôtel tolère un chien en laisse calme au dîner.`,
    hotelEs: `15 habitaciones en una antigua residencia episcopal, 6 min andando al Markt y al Wintermärkt. Perros hasta 10 kg admitidos (suplemento moderado), desayuno en el jardín tapiado, el bistró del hotel tolera un perro con correa tranquilo en la cena.`,
    hotelPt: `15 quartos numa antiga residência episcopal, 6 min a pé do Markt e do Wintermärkt. Cães até 10 kg aceites (taxa moderada), pequeno-almoço no jardim murado, o bistrot do hotel tolera um cão à trela calmo ao jantar.`,
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
    hotelName: `Hôtel Régent Petite France (Strasbourg base)`,
    hotelEn: `Use the same Strasbourg hotel as your base. TER Strasbourg-Colmar runs every 30 min, dogs €0 in carrier or €3.50 leashed. Colmar station is 12 min walk from the markets.`,
    hotelFr: `Utilisez le même hôtel de Strasbourg comme base. TER Strasbourg-Colmar toutes les 30 min, chiens 0 € en sac ou 3,50 € en laisse. La gare de Colmar est à 12 min à pied des marchés.`,
    hotelEs: `Usa el mismo hotel de Estrasburgo como base. TER Estrasburgo-Colmar cada 30 min, perros 0 € en bolsa o 3,50 € con correa. La estación de Colmar está a 12 min andando de los mercados.`,
    hotelPt: `Use o mesmo hotel de Estrasburgo como base. TER Estrasburgo-Colmar de 30 em 30 min, cães 0 € em saco ou 3,50 € à trela. A estação de Colmar está a 12 min a pé dos mercados.`,
  },
]

const COPY = {
  en: {
    eyebrow: 'CHRISTMAS MARKETS · PET-FRIENDLY EUROPE',
    title: `Dog-Friendly Christmas Markets: 6 European Cities Where Pets Are Welcome`,
    intro: `December is the friendliest month of the year to travel with a dog. The weather actively suits the breeds that suffer in summer (huskies, Bernese, double-coated everything), the crowds are warmer-bundled and less reactive to dogs at their feet, and the wooden Christmas market stalls are inherently flat, slow, and dog-paced. We picked six European Christmas markets that genuinely welcome leashed dogs - the etiquette is universal: keep them close, away from food samples, and out of the bratwurst grease zone.`,
    pickHeading: 'The six picks',
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
    title: `Marchés de Noël dog-friendly : 6 villes européennes où les animaux sont bienvenus`,
    intro: `Décembre est le mois le plus amical de l'année pour voyager avec son chien. La météo convient activement aux races qui souffrent en été (huskies, bernois, double poil de tout type), la foule est emmitouflée plus chaudement et moins réactive aux chiens aux pieds, et les chalets en bois des marchés sont fondamentalement plats, lents et au rythme du chien. On a sélectionné six marchés européens qui accueillent vraiment les chiens en laisse - l'étiquette est universelle : garder le chien près, loin des échantillons et hors de la zone graisse bratwurst.`,
    pickHeading: 'Les six picks',
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
    title: `Mercados navideños dog-friendly: 6 ciudades europeas que admiten mascotas`,
    intro: `Diciembre es el mes más amable del año para viajar con perro. El tiempo conviene activamente a las razas que sufren en verano (huskies, berneses, doble pelo de todo tipo), la multitud está más abrigada y menos reactiva a perros a los pies, y los puestos de madera de los mercados son inherentemente llanos, lentos y al ritmo del perro. Hemos seleccionado seis mercados europeos que admiten realmente perros con correa - la etiqueta es universal: mantener al perro cerca, lejos de las muestras y fuera de la zona de grasa bratwurst.`,
    pickHeading: 'Las seis elecciones',
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
    title: `Mercados de Natal dog-friendly: 6 cidades europeias que aceitam animais`,
    intro: `Dezembro é o mês mais amigável do ano para viajar com cão. O tempo convém ativamente às raças que sofrem no verão (huskies, berneses, pelo duplo de todo o tipo), a multidão está mais agasalhada e menos reativa a cães aos pés, e as barracas de madeira dos mercados são inerentemente planas, lentas e ao ritmo do cão. Selecionámos seis mercados europeus que aceitam genuinamente cães à trela - a etiqueta é universal: manter o cão próximo, longe das amostras e fora da zona de gordura de bratwurst.`,
    pickHeading: 'As seis escolhas',
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

  const pickWhy = (p: Pick) => locale === 'fr' ? p.whyFr : locale === 'es' ? p.whyEs : locale === 'pt' ? p.whyPt : p.whyEn
  const pickHotel = (p: Pick) => locale === 'fr' ? p.hotelFr : locale === 'es' ? p.hotelEs : locale === 'pt' ? p.hotelPt : p.hotelEn

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
