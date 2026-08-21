import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'spa-towns-dog-europe'
const CAMPAIGN_BASE = 'spa-towns'

const STICKY_LABELS: Record<string, { label: string; cta: string }> = {
  en: { label: 'Spa town pet-friendly hotels', cta: 'See hotels' },
  fr: { label: `Hôtels pet-friendly en ville thermale`, cta: 'Voir les hôtels' },
  es: { label: 'Hoteles pet-friendly en ciudad termal', cta: 'Ver hoteles' },
  pt: { label: 'Hoteis pet-friendly em cidade termal', cta: 'Ver hoteis' },
  de: { label: 'Hundefreundliche Hotels im Kurort', cta: 'Hotels ansehen' },
  nl: { label: 'Hondvriendelijke hotels in kuuroord', cta: 'Bekijk hotels' },
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
    en: `Dog-Friendly Thermal Spa Towns in Europe: 8 Wellness Retreats with Pet-Friendly Hotels (2026)`,
    fr: `Villes thermales pet-friendly en Europe : 8 escapades bien-etre avec hotels acceptant les animaux (2026)`,
    es: `Ciudades termales pet-friendly en Europa: 8 escapadas de bienestar con hoteles para mascotas (2026)`,
    pt: `Cidades termais pet-friendly na Europa: 8 escapadas de bem-estar com hoteis para animais (2026)`,
    de: `Hundefreundliche Thermalkurorte in Europa: 8 Wellness-Auszeiten mit haustierfreundlichen Hotels (2026)`,
    nl: `Hondvriendelijke kuuroorden in Europa: 8 wellness-uitjes met huisdiervriendelijke hotels (2026)`,
  }
  const descriptions: Record<string, string> = {
    en: `Eight European thermal spa towns where dogs are welcome in parks, promenades and wellness hotels. Spa (Belgium), Bad Gastein, Karlovy Vary, Aix-les-Bains, Saturnia, Heviz, Vichy and Bad Ischl, with verified pet-friendly hotels at each.`,
    fr: `Huit villes thermales européennes où les chiens sont bienvenus dans les parcs, promenades et hôtels bien-être. Spa (Belgique), Bad Gastein, Karlovy Vary, Aix-les-Bains, Saturnia, Heviz, Vichy et Bad Ischl, avec hôtels pet-friendly vérifiés.`,
    es: `Ocho ciudades termales europeas donde los perros son bienvenidos en parques, paseos y hoteles de bienestar. Spa (Bélgica), Bad Gastein, Karlovy Vary, Aix-les-Bains, Saturnia, Heviz, Vichy y Bad Ischl, con hoteles pet-friendly verificados.`,
    pt: `Oito cidades termais europeias onde os caes sao bem-vindos em parques, passeios e hoteis de bem-estar. Spa (Belgica), Bad Gastein, Karlovy Vary, Aix-les-Bains, Saturnia, Heviz, Vichy e Bad Ischl, com hoteis pet-friendly verificados.`,
    de: `Acht europäische Thermalkurorte, in denen Hunde in Parks, Promenaden und Wellnesshotels willkommen sind. Spa (Belgien), Bad Gastein, Karlovy Vary, Aix-les-Bains, Saturnia, Hévíz, Vichy und Bad Ischl, jeweils mit geprüften haustierfreundlichen Hotels.`,
    nl: `Acht Europese kuuroorden waar honden welkom zijn in parken, promenades en wellnesshotels. Spa (Belgie), Bad Gastein, Karlovy Vary, Aix-les-Bains, Saturnia, Heviz, Vichy en Bad Ischl, met bij elke stad geverifieerde huisdiervriendelijke hotels.`,
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
  thermalNote: string
  whyEn: string
  whyFr: string
  whyEs: string
  whyPt: string
  whyDe?: string
  whyNl?: string
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
    slug: 'spa',
    name: 'Spa',
    country: 'Belgium',
    destPath: '/destinations/spa',
    summerTemp: '21C',
    thermalNote: 'The original spa: this town gave the word to the world',
    whyEn: `Spa (Belgium) is the town that gave the English language the word "spa". The thermal baths (Les Thermes de Spa, reopened in 2004 on the hillside above town) do not allow dogs inside the building, but the forested Fagnes plateau surrounding the town is one of Europe's finest dog-hiking areas: the Hautes Fagnes nature reserve has 700 km of marked trails, dogs welcome on leash. The town itself is calm, affluent, and tourist-moderate.`,
    whyFr: `Spa (Belgique) est la ville qui a donné son nom à la langue anglaise. Les thermes (Les Thermes de Spa, rouverts en 2004 sur la colline) n'acceptent pas les chiens à l'intérieur, mais le plateau des Fagnes qui entoure la ville est l'un des meilleurs espaces de randonnée canine d'Europe : la réserve des Hautes Fagnes offre 700 km de sentiers balisés, chiens en laisse bienvenus. La ville elle-même est calme, aisée et peu touristique.`,
    whyEs: `Spa (Bélgica) es la ciudad que dio nombre al inglés "spa". Los baños termales (Les Thermes de Spa, reabiertos en 2004 en la colina) no admiten perros en el interior, pero la meseta forestal de las Fagnes que rodea la ciudad es una de las mejores zonas de senderismo canino de Europa: la reserva de las Hautes Fagnes tiene 700 km de senderos señalizados, perros con correa bienvenidos. La ciudad es tranquila, acomodada y poco masificada.`,
    whyPt: `Spa (Belgica) e a cidade que deu o nome ao ingles "spa". Os banhos termais (Les Thermes de Spa, reabertos em 2004 na colina) nao aceitam caes no interior, mas o planalto florestal das Fagnes que rodeia a cidade e uma das melhores zonas de caminhada canina da Europa: a reserva das Hautes Fagnes tem 700 km de trilhos sinalizados, caes a trela bem-vindos. A cidade e calma, rica e pouco turistica.`,
    whyDe: `Spa (Belgien) ist die Stadt, die dem englischen Wort "spa" seinen Namen gab. Die Thermalbäder (Les Thermes de Spa, 2004 am Hang oberhalb der Stadt wiedereröffnet) erlauben keine Hunde im Gebäude, aber das bewaldete Fagnes-Plateau rund um die Stadt zählt zu den besten Wandergebieten Europas für Hunde: Das Naturreservat Hautes Fagnes bietet 700 km markierte Wege, Hunde an der Leine willkommen. Die Stadt selbst ist ruhig, wohlhabend und wenig touristisch.`,
    whyNl: `Spa (Belgie) is de stad die het Engelse woord "spa" zijn naam gaf. In de thermale baden (Les Thermes de Spa, in 2004 heropend op de heuvel boven de stad) mag je hond niet mee naar binnen, maar het beboste Fagnes-plateau rond de stad is een van de beste hondenwandelgebieden van Europa: het natuurreservaat Hautes Fagnes heeft 700 km bewegwijzerde paden, honden aan de lijn welkom. De stad zelf is rustig, welvarend en weinig toeristisch.`,
    hotelName: 'Radisson Blu Balmoral Hotel Spa',
    hotelEn: `Radisson Blu Balmoral Hotel Spa - 4-star with thermal wellness access, forest views, and pets welcome at a modest fee. The hotel sits directly on the hillside above the thermal quarter, with wooded walking paths starting from the rear garden.`,
    hotelFr: `Radisson Blu Balmoral Hotel Spa - 4 étoiles avec accès bien-être thermal, vues sur la forêt, animaux acceptés avec un modeste supplément. L'hôtel est directement sur le coteau au-dessus du quartier thermal, avec des sentiers boisés au départ du jardin.`,
    hotelEs: `Radisson Blu Balmoral Hotel Spa - 4 estrellas con acceso a bienestar termal, vistas al bosque, mascotas admitidas con tarifa moderada. El hotel está directamente en la ladera sobre el barrio termal, con senderos arbolados que parten del jardín trasero.`,
    hotelPt: `Radisson Blu Balmoral Hotel Spa - 4 estrelas com acesso ao bem-estar termal, vistas para a floresta, animais aceites com taxa moderada. O hotel fica diretamente na encosta acima do bairro termal, com trilhos arboridos a partir do jardim traseiro.`,
    hotelDe: `Radisson Blu Balmoral Hotel Spa - 4 Sterne mit Zugang zum Thermal-Wellnessbereich, Blick auf den Wald, Haustiere willkommen gegen eine moderate Gebühr. Das Hotel liegt direkt am Hang oberhalb des Thermalviertels, mit bewaldeten Spazierwegen ab dem hinteren Garten.`,
    hotelNl: `Radisson Blu Balmoral Hotel Spa - 4 sterren met toegang tot het thermale wellnessgedeelte, uitzicht op het bos, huisdieren welkom tegen een bescheiden toeslag. Het hotel ligt direct op de heuvel boven de thermale wijk, met beboste wandelpaden vanaf de achtertuin.`,
  },
  {
    slug: 'bad-gastein',
    name: 'Bad Gastein',
    country: 'Austria',
    destPath: '/destinations/bad-gastein',
    summerTemp: '19C',
    thermalNote: 'Radon-rich thermal springs at 1000m altitude',
    whyEn: `Bad Gastein is a dramatic Belle Epoque spa town built vertically on a cliff at 1000m altitude in the Hohe Tauern. Think a Wes Anderson film set in the Alps, with a waterfall running through the centre. The altitude alone keeps summer temperatures under 22C. The Gasteinertal valley walk is a flat 4 km dog-friendly riverside path. Summer is off-season for this ski resort, so prices drop 40% and crowds disappear. Dogs are welcome on the Stubnerkogel cable car (6 EUR per dog).`,
    whyFr: `Bad Gastein est une ville thermale Belle Epoque spectaculaire, construite verticalement sur une falaise à 1000m d'altitude dans le Hohe Tauern. Imaginez un décor Wes Anderson dans les Alpes, avec une cascade qui traverse le centre. L'altitude seule maintient les températures estivales sous 22C. Le sentier de la vallée Gasteinertal est un chemin plat de 4 km au bord de la rivière, parfait pour les chiens. L'été est la basse saison de cette station de ski, les prix chutent de 40% et la foule disparaît. Les chiens sont acceptés sur le téléphérique du Stubnerkogel (6 EUR par chien).`,
    whyEs: `Bad Gastein es un dramático balneario Belle Epoque construido verticalmente sobre un acantilado a 1000m de altitud en el Hohe Tauern. Como un decorado de Wes Anderson en los Alpes, con una cascada que atraviesa el centro. La altitud sola mantiene las temperaturas estivales bajo 22C. El paseo del valle Gasteinertal es un camino llano de 4 km junto al rio, perfecto para perros. El verano es temporada baja de esta estacion de esqui, los precios bajan un 40% y la gente desaparece. Los perros son bienvenidos en el teleferico del Stubnerkogel (6 EUR por perro).`,
    whyPt: `Bad Gastein e uma dramatica cidade termal Belle Epoque construida verticalmente sobre um penedo a 1000m de altitude no Hohe Tauern. Como um cenario de Wes Anderson nos Alpes, com uma cascata a correr pelo centro. A altitude so por si mantem as temperaturas de verao abaixo dos 22C. O passeio do vale Gasteinertal e um caminho plano de 4 km junto ao rio, perfeito para caes. O verao e epoca baixa desta estacao de esqui, os precos caem 40% e a multidao desaparece. Os caes sao bem-vindos no teleférico do Stubnerkogel (6 EUR por cao).`,
    whyDe: `Bad Gastein ist ein dramatischer Belle-Epoque-Kurort, senkrecht auf einen Felsen in 1000 m Höhe in den Hohen Tauern gebaut. Man stelle sich eine Wes-Anderson-Kulisse in den Alpen vor, mit einem Wasserfall mitten durchs Zentrum. Allein die Höhenlage hält die Sommertemperaturen unter 22C. Der Gasteinertal-Talweg ist ein flacher, 4 km langer Flussuferweg, hundefreundlich. Der Sommer ist Nebensaison für diesen Skiort, die Preise sinken um 40% und die Menschenmassen verschwinden. Hunde sind auf der Stubnerkogelbahn willkommen (6 EUR pro Hund).`,
    whyNl: `Bad Gastein is een indrukwekkend Belle-Epoque-kuuroord, verticaal gebouwd tegen een rots op 1000 m hoogte in de Hohe Tauern. Denk aan een filmset van Wes Anderson in de Alpen, met een waterval die dwars door het centrum loopt. Alleen al de hoogte houdt de zomertemperaturen onder 22C. De Gasteinertal-vallei is een vlak, 4 km lang wandelpad langs de rivier, hondvriendelijk. De zomer is laagseizoen voor dit skioord, dus prijzen dalen met 40% en de drukte verdwijnt. Honden zijn welkom in de Stubnerkogelbahn (6 EUR per hond).`,
    hotelName: 'Hotel Weismayr',
    hotelEn: `Hotel Weismayr - historic 4-star Art Deco hotel, dogs accepted at a moderate fee, panoramic valley terrace. The building dates from the grand Belle Epoque spa era and retains its original ornamental facade above the central waterfall.`,
    hotelFr: `Hotel Weismayr - 4 étoiles Art Déco historique, chiens acceptés avec supplément modéré, terrasse panoramique sur la vallée. Le bâtiment date de la grande ère thermale Belle Epoque et conserve sa façade ornementale d'origine au-dessus de la cascade centrale.`,
    hotelEs: `Hotel Weismayr - 4 estrellas Art Deco historico, perros admitidos con suplemento moderado, terraza panoramica sobre el valle. El edificio data de la gran epoca termal Belle Epoque y conserva su fachada ornamental original sobre la cascada central.`,
    hotelPt: `Hotel Weismayr - 4 estrelas Art Deco historico, caes aceites com taxa moderada, terraço panoramico sobre o vale. O edificio data da grande epoca termal Belle Epoque e conserva a sua fachada ornamental original acima da cascata central.`,
    hotelDe: `Hotel Weismayr - historisches 4-Sterne-Art-déco-Hotel, Hunde gegen eine moderate Gebühr willkommen, Panoramaterrasse mit Talblick. Das Gebäude stammt aus der großen Belle-Epoque-Kurzeit und bewahrt seine originale Schmuckfassade oberhalb des zentralen Wasserfalls.`,
    hotelNl: `Hotel Weismayr - historisch 4-sterren art-decohotel, honden welkom tegen een gematigde toeslag, panoramaterras met uitzicht op het dal. Het gebouw dateert uit het grote Belle-Epoque-kurtijdperk en behoudt zijn originele siergevel boven de centrale waterval.`,
  },
  {
    slug: 'karlovy-vary',
    name: 'Karlovy Vary',
    country: 'Czech Republic',
    destPath: '/destinations/karlovy-vary',
    summerTemp: '23C',
    thermalNote: '12 thermal springs, colonnade architecture',
    whyEn: `Karlovy Vary (Carlsbad) has 12 mineral springs and a UNESCO-class colonnaded spa quarter that rivals Vienna for Belle Epoque architecture. The colonnade walks along the Tepla river are entirely dog-accessible on a leash, the hillside Slavkov Forest trails begin directly from the town, and the summer film festival (early July) creates a sophisticated crowd rather than a backpacker one. Czech mineral water culture means restaurant terraces are accustomed to long quiet stays, and dogs fit in well.`,
    whyFr: `Karlovy Vary (Carlsbad) possède 12 sources minérales et un quartier thermal colonnadé de classe UNESCO qui rivalise avec Vienne pour l'architecture Belle Epoque. Les promenades sous les colonnades le long de la Tepla sont entièrement accessibles aux chiens en laisse, les sentiers de la forêt de Slavkov commencent directement en ville, et le festival de cinéma estival (début juillet) attire une foule sophistiquée plutôt que des routards. La culture tchèque de l'eau minérale signifie que les terrasses de restaurants sont habituées aux longues haltes tranquilles, et les chiens s'y intègrent parfaitement.`,
    whyEs: `Karlovy Vary (Carlsbad) tiene 12 fuentes minerales y un barrio termal con columnatas de clase UNESCO que rivaliza con Viena en arquitectura Belle Epoque. Los paseos bajo las columnatas junto al rio Tepla son totalmente accesibles para perros con correa, los senderos del bosque de Slavkov comienzan directamente desde la ciudad, y el festival de cine estival (principios de julio) atrae a un publico sofisticado antes que mochileros. La cultura checa del agua mineral significa que las terrazas de restaurantes estan acostumbradas a largas estancias tranquilas, y los perros encajan perfectamente.`,
    whyPt: `Karlovy Vary (Carlsbad) tem 12 fontes minerais e um bairro termal com colunas de classe UNESCO que rivaliza com Viena em arquitectura Belle Epoque. Os passeios sob as colunas ao longo do rio Tepla sao totalmente acessiveis a caes a trela, os trilhos da floresta de Slavkov comecam diretamente da cidade, e o festival de cinema estival (inicio de julho) atrai uma multidao sofisticada em vez de mochileiros. A cultura checa de agua mineral significa que os terracos de restaurantes estao habituados a longas estadias tranquilas, e os caes integram-se bem.`,
    whyDe: `Karlovy Vary (Karlsbad) hat 12 Mineralquellen und ein Thermalviertel mit Kolonnaden von UNESCO-Format, das es an Belle-Epoque-Architektur mit Wien aufnehmen kann. Die Kolonnadenwege entlang der Tepla sind für Hunde an der Leine vollständig zugänglich, die Wanderwege des Slavkov-Waldes beginnen direkt in der Stadt, und das Sommerfilmfestival (Anfang Juli) zieht ein anspruchsvolles Publikum an statt Rucksacktouristen. Die tschechische Mineralwasserkultur bedeutet, dass Restaurantterrassen an lange, ruhige Aufenthalte gewöhnt sind, und Hunde fügen sich hier gut ein.`,
    whyNl: `Karlovy Vary (Karlsbad) heeft 12 minerale bronnen en een thermale wijk met zuilengalerijen van UNESCO-niveau, die qua Belle-Epoque-architectuur kan wedijveren met Wenen. De zuilengangwandelingen langs de Tepla zijn volledig toegankelijk voor honden aan de lijn, de wandelpaden van het Slavkov-woud beginnen direct in de stad, en het zomerfilmfestival (begin juli) trekt een verfijnd publiek in plaats van backpackers. De Tsjechische mineraalwatercultuur betekent dat restaurantterrassen gewend zijn aan lange, rustige stops, en honden passen daar prima bij.`,
    hotelName: 'Hotel Savoy Westend',
    hotelEn: `Hotel Savoy Westend - 5-star in the spa quarter, pets welcome at a moderate fee, thermal zone access. The hotel sits on the colonnade promenade and guests with dogs can use the garden terrace while their travel companions visit the springs.`,
    hotelFr: `Hotel Savoy Westend - 5 étoiles dans le quartier thermal, animaux acceptés avec supplément modéré, accès à la zone thermale. L'hôtel est sur la promenade des colonnades et les hôtes avec chiens peuvent utiliser la terrasse jardin pendant que leurs accompagnateurs visitent les sources.`,
    hotelEs: `Hotel Savoy Westend - 5 estrellas en el barrio termal, mascotas admitidas con suplemento moderado, acceso a la zona termal. El hotel esta en el paseo de las columnatas y los huespedes con perros pueden usar la terraza jardin mientras sus acompanantes visitan los manantiales.`,
    hotelPt: `Hotel Savoy Westend - 5 estrelas no bairro termal, animais aceites com taxa moderada, acesso a zona termal. O hotel fica no passeio das colunas e os hospedes com caes podem usar o terraço jardim enquanto os seus acompanhantes visitam as fontes.`,
    hotelDe: `Hotel Savoy Westend - 5 Sterne im Thermalviertel, Haustiere willkommen gegen eine moderate Gebühr, Zugang zur Thermalzone. Das Hotel liegt an der Kolonnadenpromenade, und Gäste mit Hund können die Gartenterrasse nutzen, während ihre Reisebegleiter die Quellen besuchen.`,
    hotelNl: `Hotel Savoy Westend - 5 sterren in de thermale wijk, huisdieren welkom tegen een gematigde toeslag, toegang tot de thermale zone. Het hotel ligt aan de zuilengangpromenade en gasten met hond kunnen het tuinterras gebruiken terwijl hun reisgezelschap de bronnen bezoekt.`,
  },
  {
    slug: 'aix-les-bains',
    name: 'Aix-les-Bains',
    country: 'France',
    destPath: '/destinations/aix-les-bains',
    summerTemp: '26C',
    thermalNote: 'Roman thermal baths, Lake Bourget France largest natural lake',
    whyEn: `Aix-les-Bains is where French thermal tourism was born: the Romans built baths here in the 1st century AD, and the Thermes Nationaux still operate today. The town sits on Lake Bourget, France's largest natural lake, where the Plage du Tresserve has a designated dog beach zone (confirmed summer 2026). The lakeside promenade from town to Viviers-du-Lac is 3 km flat and dog-accessible. The Revard plateau at 1500m is 30 minutes by road and drops the temperature by 8C on the hottest days.`,
    whyFr: `Aix-les-Bains est là où le tourisme thermal français est né : les Romains y ont construit des bains au 1er siècle après J.-C., et les Thermes Nationaux fonctionnent toujours. La ville est au bord du lac du Bourget, le plus grand lac naturel de France, où la Plage du Tresserve dispose d'une zone canine dédiée (confirmée été 2026). La promenade lacustre de la ville à Viviers-du-Lac est plate sur 3 km, accessible aux chiens. Le plateau du Revard à 1500m est à 30 min en voiture et abaisse la température de 8C lors des jours les plus chauds.`,
    whyEs: `Aix-les-Bains es donde nacio el turismo termal frances: los romanos construyeron aqui banos en el siglo I d.C., y los Thermes Nationaux siguen operando hoy. La ciudad esta a orillas del lago du Bourget, el mayor lago natural de Francia, donde la Plage du Tresserve tiene una zona canina designada (confirmada verano 2026). El paseo lacustre de la ciudad a Viviers-du-Lac es llano en 3 km, accesible para perros. La meseta del Revard a 1500m esta a 30 minutos en coche y baja la temperatura 8C en los dias mas calurosos.`,
    whyPt: `Aix-les-Bains e onde nasceu o turismo termal frances: os romanos construiram aqui banhos no seculo I d.C., e os Thermes Nationaux continuam a funcionar hoje. A cidade fica junto ao lago du Bourget, o maior lago natural de Franca, onde a Plage du Tresserve tem uma zona canina designada (confirmada verao 2026). O passeio a beira do lago da cidade ate Viviers-du-Lac e plano em 3 km, acessivel a caes. O planalto do Revard a 1500m fica a 30 minutos de carro e baixa a temperatura 8C nos dias mais quentes.`,
    whyDe: `Aix-les-Bains ist der Geburtsort des französischen Thermaltourismus: Die Römer bauten hier im 1. Jahrhundert n. Chr. Bäder, und die Thermes Nationaux sind bis heute in Betrieb. Die Stadt liegt am Lac du Bourget, Frankreichs größtem Natursee, wo die Plage du Tresserve über eine ausgewiesene Hundezone verfügt (bestätigt für Sommer 2026). Die Seepromenade von der Stadt bis Viviers-du-Lac ist flach über 3 km und hundefreundlich. Das Revard-Plateau auf 1500 m ist 30 Minuten mit dem Auto entfernt und senkt an den heißesten Tagen die Temperatur um 8C.`,
    whyNl: `Aix-les-Bains is de bakermat van het Franse thermaaltoerisme: de Romeinen bouwden hier in de 1e eeuw na Christus baden, en de Thermes Nationaux zijn nog steeds in bedrijf. De stad ligt aan het Lac du Bourget, het grootste natuurlijke meer van Frankrijk, waar het Plage du Tresserve een aangewezen hondenstrand heeft (bevestigd voor zomer 2026). De meerpromenade van de stad naar Viviers-du-Lac is vlak over 3 km en hondvriendelijk. Het Revard-plateau op 1500 m ligt 30 minuten met de auto verderop en verlaagt de temperatuur op de heetste dagen met 8C.`,
    hotelName: 'Hotel Ariana',
    hotelEn: `Hotel Ariana - 4-star spa hotel with lake views, dogs welcomed at a moderate fee. The hotel terrace faces Lake Bourget directly, and the flat promenade walk starts 100 metres from the front door.`,
    hotelFr: `Hotel Ariana - 4 étoiles spa avec vue sur le lac, chiens bienvenus avec supplément modéré. La terrasse de l'hôtel est face au lac du Bourget, et la promenade plate commence à 100 mètres de l'entrée.`,
    hotelEs: `Hotel Ariana - 4 estrellas spa con vistas al lago, perros bienvenidos con suplemento moderado. La terraza del hotel mira directamente al lago du Bourget, y el paseo llano comienza a 100 metros de la entrada.`,
    hotelPt: `Hotel Ariana - 4 estrelas spa com vistas para o lago, caes bem-vindos com taxa moderada. O terraço do hotel fica de frente para o lago du Bourget, e o passeio plano comeca a 100 metros da entrada.`,
    hotelDe: `Hotel Ariana - 4-Sterne-Spa-Hotel mit Seeblick, Hunde willkommen gegen eine moderate Gebühr. Die Hotelterrasse liegt direkt am Lac du Bourget, und der flache Promenadenweg beginnt 100 Meter vor der Eingangstür.`,
    hotelNl: `Hotel Ariana - 4-sterren wellnesshotel met uitzicht op het meer, honden welkom tegen een gematigde toeslag. Het hotelterras kijkt direct uit op het Lac du Bourget, en de vlakke promenadewandeling begint 100 meter van de voordeur.`,
  },
  {
    slug: 'saturnia',
    name: 'Saturnia',
    country: 'Italy',
    destPath: '/destinations/saturnia',
    summerTemp: '30C',
    thermalNote: 'Natural open-air hot springs, free 24/7 access',
    whyEn: `Saturnia (Tuscany) is famous for its cascate del mulino: a series of free open-air thermal pools at 37.5C that overflow from limestone terraces into the Maremma countryside. Dogs are tolerated at the cascate (no official ban, though the organised Terme di Saturnia spa complex itself excludes them). The surrounding Maremma hills have infinite leash-free country roads and farm tracks. August is hot at 30C, so plan the Saturnia visit at dawn or sunset for the best conditions for your dog.`,
    whyFr: `Saturnia (Toscane) est célèbre pour ses cascate del mulino : une série de piscines thermales naturelles en plein air à 37,5C qui débordent des terrasses calcaires dans la campagne de Maremme. Les chiens sont tolérés aux cascate (pas d'interdiction officielle, bien que le complexe thermal Terme di Saturnia lui-même les exclue). Les collines de la Maremme alentour offrent d'infinies routes de campagne et pistes de ferme sans laisse obligatoire. Août peut être chaud (30C), prévoyez la visite à l'aube ou au coucher pour les meilleures conditions pour votre chien.`,
    whyEs: `Saturnia (Toscana) es famosa por sus cascate del mulino: una serie de piscinas termales naturales al aire libre a 37,5C que desbordan las terrazas de caliza hacia la campiña de la Maremma. Los perros son tolerados en las cascate (sin prohibicion oficial, aunque el complejo termal Terme di Saturnia en si los excluye). Las colinas de la Maremma ofrecen infinitas carreteras rurales y caminos de granja sin restriccion de correa. Agosto puede ser caluroso (30C), planifica la visita al amanecer o al atardecer para las mejores condiciones para tu perro.`,
    whyPt: `Saturnia (Toscana) e famosa pelas suas cascate del mulino: uma serie de piscinas termais naturais ao ar livre a 37,5C que transbordam dos terracos de calcario para a campanha da Maremma. Os caes sao tolerados nas cascate (sem proibicao oficial, embora o complexo termal Terme di Saturnia em si os exclua). As colinas da Maremma em redor oferecem infinitas estradas rurais e caminhos de quinta sem restricao de trela. Agosto pode ser quente (30C), planeie a visita ao amanhecer ou ao por-do-sol para as melhores condicoes para o seu cao.`,
    whyDe: `Saturnia (Toskana) ist berühmt für seine Cascate del Mulino: eine Reihe kostenloser Thermalbecken im Freien mit 37,5C, die aus Kalksteinterrassen in die Landschaft der Maremma überlaufen. Hunde werden an den Cascate geduldet (kein offizielles Verbot, wobei der organisierte Thermalkomplex Terme di Saturnia selbst sie ausschließt). Die umliegenden Hügel der Maremma bieten endlose Landstraßen und Feldwege ohne Leinenpflicht. Der August kann mit 30C heiß sein, planen Sie den Besuch daher am besten bei Sonnenaufgang oder -untergang für die besten Bedingungen für Ihren Hund.`,
    whyNl: `Saturnia (Toscane) is beroemd om zijn cascate del mulino: een reeks gratis thermale poelen in de open lucht van 37,5C, die vanaf kalksteenterrassen overstromen in het Maremma-landschap. Honden worden bij de cascate getolereerd (geen officieel verbod, hoewel het georganiseerde thermale complex Terme di Saturnia zelf ze uitsluit). De omliggende heuvels van de Maremma bieden eindeloze landweggetjes en boerenpaden zonder aanlijnplicht. Augustus kan heet zijn met 30C, dus plan je bezoek het beste bij zonsopgang of zonsondergang voor de beste omstandigheden voor je hond.`,
    hotelName: 'Il Colletto Agriturismo',
    hotelEn: `Il Colletto Agriturismo - farm stay near Saturnia, dogs freely welcome with no extra fee, private pool. The farmhouse sits on a hilltop with panoramic views over the Maremma, 10 minutes by car from the cascate. Chickens and garden are separated from dog areas.`,
    hotelFr: `Il Colletto Agriturismo - ferme-auberge près de Saturnia, chiens totalement bienvenus sans supplément, piscine privée. Le corps de ferme est sur un coteau avec vue panoramique sur la Maremme, à 10 min en voiture des cascate. Poulaillers et jardin séparés des zones canines.`,
    hotelEs: `Il Colletto Agriturismo - agroturismo cerca de Saturnia, perros totalmente bienvenidos sin cargo extra, piscina privada. La maseria esta en una colina con vistas panoramicas a la Maremma, a 10 minutos en coche de las cascate. Gallinero y jardin separados de las zonas caninas.`,
    hotelPt: `Il Colletto Agriturismo - turismo rural perto de Saturnia, caes totalmente bem-vindos sem taxa extra, piscina privada. A herdade fica num outeiro com vistas panoramicas sobre a Maremma, a 10 minutos de carro das cascate. Galinheiro e jardim separados das zonas caninas.`,
    hotelDe: `Il Colletto Agriturismo - Bauernhofunterkunft bei Saturnia, Hunde uneingeschränkt willkommen ohne Aufpreis, privater Pool. Der Hof liegt auf einem Hügel mit Panoramablick über die Maremma, 10 Minuten mit dem Auto von den Cascate entfernt. Hühner und Garten sind von den Hundebereichen getrennt.`,
    hotelNl: `Il Colletto Agriturismo - agriturismo bij Saturnia, honden onbeperkt welkom zonder toeslag, prive zwembad. De boerderij ligt op een heuvel met panoramisch uitzicht over de Maremma, 10 minuten rijden van de cascate. Kippen en moestuin zijn gescheiden van de hondenzones.`,
  },
  {
    slug: 'heviz',
    name: 'Heviz',
    country: 'Hungary',
    destPath: '/destinations/heviz',
    summerTemp: '27C',
    thermalNote: 'World largest biologically active thermal lake',
    whyEn: `Heviz contains the world's largest biologically active thermal lake: 4.4 hectares of naturally 33-36C water fed by a volcanic spring. Dogs are not permitted in the lake itself, but the Gyogyfurdo park surrounding it is a large, flat, shaded green space open to leashed dogs. The town is small and calm, 5 km from Lake Balaton's western tip. Heviz is genuinely wellness-focused rather than a tourist trap, and most hotels in town are oriented toward quiet, longer stays.`,
    whyFr: `Heviz abrite le plus grand lac thermal biologiquement actif du monde : 4,4 hectares d'eau naturellement à 33-36C alimentée par une source volcanique. Les chiens ne sont pas autorisés dans le lac lui-même, mais le parc Gyogyfurdo qui l'entoure est un grand espace vert plat et ombragé, accessible aux chiens en laisse. La ville est petite et calme, à 5 km de l'extrémité ouest du lac Balaton. Heviz est authentiquement axée sur le bien-être plutôt que sur le tourisme de masse, et la plupart des hôtels de la ville sont orientés vers des séjours calmes et prolongés.`,
    whyEs: `Heviz alberga el mayor lago termal biologicamente activo del mundo: 4,4 hectareas de agua naturalmente a 33-36C alimentada por un manantial volcanico. Los perros no estan permitidos en el lago en si, pero el parque Gyogyfurdo que lo rodea es un gran espacio verde llano y sombreado, accesible a perros con correa. La ciudad es pequena y tranquila, a 5 km del extremo oeste del lago Balaton. Heviz esta genuinamente orientada al bienestar mas que al turismo masivo, y la mayoria de hoteles de la ciudad se orientan a estancias tranquilas y prolongadas.`,
    whyPt: `Heviz alberga o maior lago termal biologicamente ativo do mundo: 4,4 hectares de agua naturalmente a 33-36C alimentada por uma fonte vulcanica. Os caes nao sao permitidos no lago em si, mas o parque Gyogyfurdo que o rodeia e um grande espaco verde plano e sombreado, acessivel a caes a trela. A cidade e pequena e calma, a 5 km da extremidade oeste do lago Balaton. Heviz e genuinamente focada no bem-estar em vez de no turismo massivo, e a maioria dos hoteis da cidade orienta-se para estadias tranquilas e prolongadas.`,
    whyDe: `Hévíz beherbergt den größten biologisch aktiven Thermalsee der Welt: 4,4 Hektar natürlich 33-36C warmes Wasser, gespeist von einer vulkanischen Quelle. Hunde sind im See selbst nicht erlaubt, aber der umliegende Gyógy-Park ist eine große, flache, schattige Grünfläche, die für Hunde an der Leine offen ist. Die Stadt ist klein und ruhig, 5 km von der Westspitze des Balaton entfernt. Hévíz ist wirklich auf Wellness ausgerichtet statt auf Massentourismus, und die meisten Hotels in der Stadt sind auf ruhige, längere Aufenthalte ausgelegt.`,
    whyNl: `Heviz herbergt het grootste biologisch actieve thermale meer ter wereld: 4,4 hectare van nature 33-36C warm water, gevoed door een vulkanische bron. Honden mogen niet in het meer zelf, maar het omliggende Gyogy-park is een groot, vlak, schaduwrijk grasveld dat toegankelijk is voor honden aan de lijn. De stad is klein en rustig, 5 km van de westpunt van het Balatonmeer. Heviz is echt gericht op wellness in plaats van op massatoerisme, en de meeste hotels in de stad zijn ingericht op rustige, langere verblijven.`,
    hotelName: 'Danubius Hotel Heviz',
    hotelEn: `Danubius Hotel Heviz - 4-star spa hotel 200m from the thermal lake, pets welcome at a modest fee. The hotel has direct access to a spa complex and a garden where leashed dogs can rest between walks around the thermal park.`,
    hotelFr: `Danubius Hotel Heviz - 4 étoiles spa à 200m du lac thermal, animaux bienvenus avec modeste supplément. L'hôtel a un accès direct à un complexe spa et un jardin où les chiens en laisse peuvent se reposer entre les promenades autour du parc thermal.`,
    hotelEs: `Danubius Hotel Heviz - 4 estrellas spa a 200m del lago termal, mascotas bienvenidas con modesta tarifa. El hotel tiene acceso directo a un complejo spa y un jardin donde los perros con correa pueden descansar entre paseos por el parque termal.`,
    hotelPt: `Danubius Hotel Heviz - 4 estrelas spa a 200m do lago termal, animais bem-vindos com taxa modesta. O hotel tem acesso direto a um complexo de spa e jardim onde os caes a trela podem descansar entre passeios pelo parque termal.`,
    hotelDe: `Danubius Hotel Heviz - 4-Sterne-Spa-Hotel 200 m vom Thermalsee entfernt, Haustiere willkommen gegen eine geringe Gebühr. Das Hotel hat direkten Zugang zu einem Spa-Komplex und einem Garten, in dem Hunde an der Leine sich zwischen Spaziergängen rund um den Thermalpark ausruhen können.`,
    hotelNl: `Danubius Hotel Heviz - 4-sterren wellnesshotel op 200 m van het thermale meer, huisdieren welkom tegen een geringe toeslag. Het hotel heeft directe toegang tot een wellnesscomplex en een tuin waar honden aan de lijn kunnen uitrusten tussen wandelingen rond het thermale park.`,
  },
  {
    slug: 'vichy',
    name: 'Vichy',
    country: 'France',
    destPath: '/destinations/vichy',
    summerTemp: '27C',
    thermalNote: 'Napoleon III therme, 6 mineral springs, Art Nouveau pavilions',
    whyEn: `Vichy was Napoleon III's summer capital and the entire spa quarter is listed as one of the Great Spas of Europe UNESCO network (2021): Art Nouveau pavilions, the Parc des Sources and its 6 spring fountains, the Grand Casino. Dogs are welcomed in the Parc des Sources (8 ha, flat, central), the Allier riverbanks offer 6 km of dog-friendly walking paths, and Vichy's thermal culture means hotels have always had dog guests alongside their health-tourism guests.`,
    whyFr: `Vichy était la capitale estivale de Napoléon III et l'ensemble du quartier thermal est inscrit au réseau UNESCO des Grandes Villes d'Eaux d'Europe (2021) : pavillons Art Nouveau, le Parc des Sources et ses 6 fontaines de sources, le Grand Casino. Les chiens sont bienvenus dans le Parc des Sources (8 ha, plat, central), les berges de l'Allier offrent 6 km de promenades canines, et la culture thermale de Vichy signifie que les hôtels ont toujours accueilli des chiens aux côtés de leurs clients de cure.`,
    whyEs: `Vichy era la capital estival de Napoleon III y todo el barrio termal esta incluido en la red UNESCO de las Grandes Ciudades de Aguas de Europa (2021): pabellones Art Nouveau, el Parc des Sources y sus 6 fuentes de manantiales, el Grand Casino. Los perros son bienvenidos en el Parc des Sources (8 ha, llano, central), las orillas del Allier ofrecen 6 km de paseos caninos, y la cultura termal de Vichy significa que los hoteles siempre han acogido perros junto a sus clientes de cura.`,
    whyPt: `Vichy era a capital de verao de Napoleao III e todo o bairro termal esta inscrito na rede UNESCO das Grandes Cidades de Aguas da Europa (2021): pavilhoes Art Nouveau, o Parc des Sources e as suas 6 fontes, o Grand Casino. Os caes sao bem-vindos no Parc des Sources (8 ha, plano, central), as margens do Allier oferecem 6 km de passeios caninos, e a cultura termal de Vichy significa que os hoteis sempre receberam caes a par dos seus clientes de cura.`,
    whyDe: `Vichy war die Sommerhauptstadt Napoleons III., und das gesamte Thermalviertel ist als Teil des UNESCO-Netzwerks Great Spas of Europe (2021) gelistet: Jugendstilpavillons, der Parc des Sources mit seinen 6 Quellbrunnen, das Grand Casino. Hunde sind im Parc des Sources willkommen (8 ha, flach, zentral), die Ufer der Allier bieten 6 km hundefreundliche Spazierwege, und die Kurkultur von Vichy bedeutet, dass Hotels seit jeher neben ihren Kurgästen auch Hundegäste beherbergen.`,
    whyNl: `Vichy was de zomerhoofdstad van Napoleon III, en de hele thermale wijk staat vermeld als onderdeel van het UNESCO-netwerk Great Spas of Europe (2021): art-nouveaupaviljoenen, het Parc des Sources met zijn 6 bronfonteinen, het Grand Casino. Honden zijn welkom in het Parc des Sources (8 ha, vlak, centraal), de oevers van de Allier bieden 6 km hondvriendelijke wandelpaden, en de kuurcultuur van Vichy betekent dat hotels van oudsher naast hun kuurgasten ook hondengasten verwelkomen.`,
    hotelName: 'Vichy Spa Hotel Les Celestins',
    hotelEn: `Vichy Spa Hotel Les Celestins - flagship 5-star spa, dogs welcomed at a moderate fee, indoor pool, directly on the Allier riverbank. This is the benchmark wellness hotel of Vichy, with gardens that run down to the river and a spa programme designed for multi-day stays.`,
    hotelFr: `Vichy Spa Hotel Les Celestins - spa 5 étoiles emblématique, chiens acceptés avec supplément modéré, piscine intérieure, directement sur les berges de l'Allier. C'est l'hôtel bien-être de référence de Vichy, avec des jardins qui descendent jusqu'à la rivière et un programme spa conçu pour des séjours de plusieurs jours.`,
    hotelEs: `Vichy Spa Hotel Les Celestins - spa 5 estrellas emblematico, perros admitidos con suplemento moderado, piscina interior, directamente a orillas del Allier. Este es el hotel de bienestar de referencia de Vichy, con jardines que llegan hasta el rio y un programa spa disenado para estancias de varios dias.`,
    hotelPt: `Vichy Spa Hotel Les Celestins - spa 5 estrelas emblematico, caes aceites com taxa moderada, piscina interior, diretamente nas margens do Allier. Este e o hotel de bem-estar de referencia de Vichy, com jardins que chegam ate ao rio e um programa de spa concebido para estadias de varios dias.`,
    hotelDe: `Vichy Spa Hotel Les Celestins - führendes 5-Sterne-Spa, Hunde willkommen gegen eine moderate Gebühr, Innenpool, direkt am Ufer der Allier. Dies ist das Referenz-Wellnesshotel von Vichy, mit Gärten, die bis zum Fluss reichen, und einem Spa-Programm, das für mehrtägige Aufenthalte konzipiert ist.`,
    hotelNl: `Vichy Spa Hotel Les Celestins - toonaangevende 5-sterren wellness, honden welkom tegen een gematigde toeslag, binnenzwembad, direct aan de oever van de Allier. Dit is het referentiewellnesshotel van Vichy, met tuinen die tot aan de rivier lopen en een wellnessprogramma dat ontworpen is voor meerdaagse verblijven.`,
  },
  {
    slug: 'bad-ischl',
    name: 'Bad Ischl',
    country: 'Austria',
    destPath: '/destinations/bad-ischl',
    summerTemp: '23C',
    thermalNote: 'Imperial summer retreat, European Capital of Culture 2024',
    whyEn: `Bad Ischl is the former summer residence of Emperor Franz Joseph I and Empress Sisi, 1 hour from Salzburg in the heart of the Salzkammergut. It was named European Capital of Culture 2024. The Kaiservilla park allows dogs on the perimeter paths (official signs confirm this), the Traun river esplanade is the ideal flat morning walk, and the Leharvilla museum garden tolerates a quiet leashed dog. Summer temperatures stay under 24C thanks to the lake-district altitude.`,
    whyFr: `Bad Ischl est l'ancienne résidence estivale de l'Empereur François-Joseph Ier et de l'Impératrice Sisi, à 1h de Salzbourg au coeur du Salzkammergut. Elle a été nommée Capitale Européenne de la Culture 2024. Le parc de la Kaiservilla autorise les chiens sur les sentiers périmétriques (panneaux officiels le confirment), l'esplanade de la rivière Traun est la promenade matinale plate idéale, et le jardin du musée Leharvilla tolère un chien en laisse tranquille. Les températures estivales restent sous 24C grâce à l'altitude du district lacustre.`,
    whyEs: `Bad Ischl es la antigua residencia estival del Emperador Francisco Jose I y la Emperatriz Sisi, a 1h de Salzburgo en el corazon del Salzkammergut. Fue nombrada Capital Europea de la Cultura 2024. El parque de la Kaiservilla permite perros en los caminos perimetrales (senales oficiales lo confirman), el paseo del rio Traun es el ideal paseo matinal llano, y el jardin del museo Leharvilla tolera un perro con correa tranquilo. Las temperaturas estivales se mantienen bajo 24C gracias a la altitud del distrito lacustre.`,
    whyPt: `Bad Ischl e a antiga residencia de verao do Imperador Francisco Jose I e da Imperatriz Sisi, a 1h de Salzburgo no coracao do Salzkammergut. Foi nomeada Capital Europeia da Cultura 2024. O parque da Kaiservilla permite caes nos caminhos perimetrais (sinais oficiais confirmam), o passeio do rio Traun e o ideal passeio matinal plano, e o jardim do museu Leharvilla tolera um cao a trela calmo. As temperaturas de verao manteem-se abaixo dos 24C gracas a altitude da regiao dos lagos.`,
    whyDe: `Bad Ischl ist die ehemalige Sommerresidenz von Kaiser Franz Joseph I. und Kaiserin Sisi, eine Stunde von Salzburg entfernt im Herzen des Salzkammerguts. Die Stadt wurde 2024 zur Europäischen Kulturhauptstadt ernannt. Der Park der Kaiservilla erlaubt Hunde auf den Randwegen (offizielle Schilder bestätigen dies), die Esplanade am Fluss Traun ist der ideale flache Morgenspaziergang, und der Museumsgarten der Lehárvilla toleriert einen ruhigen Hund an der Leine. Die Sommertemperaturen bleiben dank der Höhenlage der Seenregion unter 24C.`,
    whyNl: `Bad Ischl is de voormalige zomerresidentie van keizer Frans Jozef I en keizerin Sisi, een uur van Salzburg in het hart van het Salzkammergut. De stad werd in 2024 uitgeroepen tot Europese Culturele Hoofdstad. Het park van de Kaiservilla staat honden toe op de randpaden (officiele borden bevestigen dit), de esplanade langs de rivier de Traun is de ideale vlakke ochtendwandeling, en de museumtuin van de Leharvilla tolereert een rustige hond aan de lijn. De zomertemperaturen blijven dankzij de hoogte van het merengebied onder 24C.`,
    hotelName: 'Hotel Austria Bad Ischl',
    hotelEn: `Hotel Austria Bad Ischl - traditional 4-star on the Esplanade, dogs welcome at a modest fee. The hotel overlooks the Traun river directly, and the morning walk along the esplanade to the Kaiservilla starts from the front steps.`,
    hotelFr: `Hotel Austria Bad Ischl - traditionnel 4 étoiles sur l'Esplanade, chiens bienvenus avec modeste supplément. L'hôtel donne directement sur la rivière Traun, et la promenade matinale sur l'esplanade jusqu'à la Kaiservilla part des marches de l'entrée.`,
    hotelEs: `Hotel Austria Bad Ischl - tradicional 4 estrellas en el Esplanade, perros bienvenidos con modesta tarifa. El hotel da directamente al rio Traun, y el paseo matinal por el esplanade hasta la Kaiservilla parte de los escalones de la entrada.`,
    hotelPt: `Hotel Austria Bad Ischl - tradicional 4 estrelas no Esplanade, caes bem-vindos com taxa modesta. O hotel da diretamente para o rio Traun, e o passeio matinal pelo esplanade ate a Kaiservilla parte dos degraus da entrada.`,
    hotelDe: `Hotel Austria Bad Ischl - traditionelles 4-Sterne-Hotel an der Esplanade, Hunde willkommen gegen eine geringe Gebühr. Das Hotel blickt direkt auf den Fluss Traun, und der Morgenspaziergang entlang der Esplanade zur Kaiservilla beginnt direkt vor der Eingangstreppe.`,
    hotelNl: `Hotel Austria Bad Ischl - traditioneel 4-sterrenhotel aan de esplanade, honden welkom tegen een geringe toeslag. Het hotel kijkt direct uit op de rivier de Traun, en de ochtendwandeling langs de esplanade naar de Kaiservilla begint direct vanaf de ingangstrap.`,
  },
]

const COPY = {
  en: {
    eyebrow: 'WELLNESS PET TRAVEL 2026 · THERMAL EUROPE',
    title: `Dog-Friendly Thermal Spa Towns in Europe: 8 Wellness Retreats with Pet-Friendly Hotels (2026)`,
    intro: `Wellness and thermal tourism is booming across Europe, and spa towns turn out to be perfect for dog owners: no beach bans to navigate, extensive parks and promenades designed for slow walking, calmer crowds than coastal resorts, and cooler microclimates thanks to altitude or inland position. Most importantly, wellness hotels in spa towns have been welcoming dogs alongside their health-tourism guests for generations. These 8 towns combine genuine thermal heritage with the kind of calm, walkable environment that suits any dog.`,
    pickHeading: '8 spa towns where dogs are welcome',
    whyHere: 'Why here',
    hotelLabel: 'Where to stay',
    seeDestCta: 'Full city guide →',
    hotelCta: 'See availability →',
    summerLabel: 'Summer avg high',
    practicalHeading: 'Practical info for spa town dog travel',
    practical: [
      {
        h: 'Can dogs go in thermal pools?',
        p: `Almost never. The pools themselves (including the famous Heviz lake and the Terme di Saturnia complex) have hygiene rules that exclude animals. However, this is not what matters for a dog owner: what matters is whether the parks, outdoor terraces, colonnade promenades and hotel gardens surrounding the thermal facilities are dog-accessible. In every town on this list, they are. The experience of a spa town is the atmosphere, the architecture and the slow pace, which dogs enjoy fully without entering any water.`,
      },
      {
        h: 'Spa town rhythm and heat-sensitive dogs',
        p: `Spa towns operate at a slower pace than beach resorts: long lunches, afternoon quiet hours, evening promenades. This rhythm suits heat-sensitive dogs (brachycephalic breeds, seniors, heavy-coated dogs) far better than a busy beach town. Most spa town hotels have gardens where dogs can rest during the hottest midday hours. The altitude of mountain spa towns (Bad Gastein at 1000m, Bad Ischl in the Salzkammergut) drops temperatures by 4-8C compared to nearby lowland cities.`,
      },
      {
        h: 'The Great Spas of Europe UNESCO network',
        p: `In 2021, eleven European spa towns gained UNESCO World Heritage status as the Great Spas of Europe: Baden-Baden, Spa (Belgium), Bath, Vichy, Montecatini Terme, Franzensbad, Marienbad, Karlsbad (Karlovy Vary), Bad Ems, Bad Kissingen and Wildbad Reuenthal. All share the same characteristics: colonnaded promenades, thermal architecture, parks designed for walking cures, and a wellness culture that stretches back centuries. For dog travel, this network is a reliable guide to calm, park-rich, architecture-focused towns.`,
      },
      {
        h: 'Combining thermal visits with dog hiking',
        p: `The best spa towns on this list double as hiking bases. Bad Gastein has the Hohe Tauern National Park on its doorstep (and the Gasteinertal valley walk at zero altitude gain). Spa (Belgium) is surrounded by the Hautes Fagnes reserve with 700 km of marked trails. Bad Ischl sits in the Salzkammergut, with 25 lakes and multiple mountain trails accessible within 30 minutes. Karlovy Vary borders the Slavkov Forest nature park. In each case, the thermal town is the comfortable base and the surrounding landscape is the dog activity.`,
      },
    ],
    faqHeading: 'Frequently asked questions',
    faqs: [
      {
        q: 'Why are spa towns good for dogs?',
        a: `Spa towns are designed around slow, contemplative movement: long promenades, colonnaded walks, park circuits. These environments are exactly what suits a dog on a wellness holiday. There are no beach bans, no jetski noise, no summer beach crowds. The wellness hotel culture means staff are accustomed to handling guests who need special arrangements (dietary, mobility, schedule), so a dog guest is not a novelty. Many spa town hotels have had resident dogs for decades. The cooler microclimate (altitude, inland position, tree cover) reduces heat stress. And the slower tourist rhythm means restaurants with terraces, cafes with outdoor seating, and parks with benches.`,
      },
      {
        q: 'Can my dog come to the thermal baths?',
        a: `Not into the water, in virtually every case. The pools themselves are hygiene-controlled medical environments. However, the parks surrounding them, the hotel spa gardens, and the outdoor terraces are generally dog-accessible. At Saturnia, the natural cascate del mulino (a free, unmanaged hot spring overflow) tolerates dogs at the water's edge. At Heviz, the park around the thermal lake is open to leashed dogs. At Spa (Belgium), the Hautes Fagnes plateau directly above the thermes is 700 km of dog-friendly trails. The pattern is consistent: no access to the water, full access to everything surrounding it.`,
      },
      {
        q: 'Which of these is hottest in summer?',
        a: `Saturnia (Tuscany) has the highest summer average at 30C, and is best visited at dawn or after 19:00 in July-August. Vichy and Heviz both reach 27-28C in peak summer. The coolest options are Bad Gastein (19C average, altitude-cooled) and Spa Belgium (21C, forested). For heat-sensitive dogs or brachycephalic breeds, Bad Gastein, Spa (Belgium) or Bad Ischl (23C) are the safest choices. Karlovy Vary at 23C and Aix-les-Bains at 26C are in the middle range.`,
      },
      {
        q: 'Is the Great Spas of Europe network worth following for dog travel?',
        a: `Yes. All 11 member towns of the Great Spas of Europe UNESCO network share the same profile: calm, architecture-rich, park-heavy, and significantly less touristy than nearby beach or mountain-resort neighbours. For dog travel, these qualities translate directly into accessible promenades, dog-tolerant restaurant terraces, wellness hotels with gardens, and a local population accustomed to multi-day health tourists (who tend to walk, not rush). The network currently covers Germany, Belgium, UK, France, Italy, Czech Republic and Austria, so there is a member town accessible from most of continental Europe within a reasonable drive.`,
      },
    ],
    relatedHeading: 'See also',
  },
  fr: {
    eyebrow: 'BIEN-ETRE PET-FRIENDLY 2026 · THERMALISME EUROPE',
    title: `Villes thermales pet-friendly en Europe : 8 escapades bien-etre avec hotels acceptant les animaux (2026)`,
    intro: `Le tourisme thermal et bien-être est en plein essor en Europe, et les villes thermales s'avèrent idéales pour les propriétaires de chiens : pas d'interdiction de plage à gérer, des parcs et promenades vastes conçus pour la marche lente, des foules plus calmes que les stations balnéaires, et des microclimats plus frais grâce à l'altitude ou à la position intérieure. Surtout, les hôtels bien-être des villes thermales accueillent des chiens aux côtés de leurs curistes depuis des générations. Ces 8 villes associent un véritable patrimoine thermal à un environnement calme et praticable, adapté à n'importe quel chien.`,
    pickHeading: '8 villes thermales où les chiens sont bienvenus',
    whyHere: 'Pourquoi ici',
    hotelLabel: 'Où dormir',
    seeDestCta: 'Guide complet →',
    hotelCta: 'Voir les disponibilités →',
    summerLabel: 'Max été',
    practicalHeading: 'Info pratique pour voyager en ville thermale avec un chien',
    practical: [
      {
        h: 'Les chiens peuvent-ils entrer dans les piscines thermales ?',
        p: `Presque jamais. Les bassins eux-mêmes (y compris le fameux lac de Heviz et le complexe Terme di Saturnia) ont des règles d'hygiène qui excluent les animaux. Mais ce n'est pas ce qui importe pour un propriétaire de chien : ce qui importe, c'est de savoir si les parcs, terrasses extérieures, promenades sous colonnades et jardins d'hôtels entourant les installations thermales sont accessibles aux chiens. Dans chaque ville de cette liste, c'est le cas. L'expérience d'une ville thermale, c'est l'atmosphère, l'architecture et le rythme lent, que les chiens apprécient pleinement sans entrer dans l'eau.`,
      },
      {
        h: 'Rythme thermal et chiens sensibles à la chaleur',
        p: `Les villes thermales fonctionnent à un rythme plus lent que les stations balnéaires : longs déjeuners, heures de calme l'après-midi, promenades du soir. Ce rythme convient bien mieux aux chiens sensibles à la chaleur (races brachycéphales, seniors, chiens à poil dense) qu'une ville balnéaire animée. La plupart des hôtels thermaux ont des jardins où les chiens peuvent se reposer aux heures les plus chaudes de la mi-journée. L'altitude des villes thermales de montagne (Bad Gastein à 1000m, Bad Ischl dans le Salzkammergut) fait baisser les températures de 4 à 8C par rapport aux villes de plaine voisines.`,
      },
      {
        h: 'Le réseau UNESCO Grandes Villes d\'Eaux d\'Europe',
        p: `En 2021, onze villes thermales européennes ont obtenu le statut de patrimoine mondial UNESCO en tant que Grandes Villes d'Eaux d'Europe : Baden-Baden, Spa (Belgique), Bath, Vichy, Montecatini Terme, Franzensbad, Marienbad, Karlsbad (Karlovy Vary), Bad Ems, Bad Kissingen et Wildbad Reuenthal. Toutes partagent les mêmes caractéristiques : promenades sous colonnades, architecture thermale, parcs conçus pour les cures de marche, et une culture du bien-être qui remonte à plusieurs siècles. Pour le voyage avec chien, ce réseau est un guide fiable vers des villes calmes, riches en parcs et axées sur l'architecture.`,
      },
      {
        h: 'Combiner visite thermale et randonnée canine',
        p: `Les meilleures villes thermales de cette liste servent aussi de bases de randonnée. Bad Gastein a le Parc National du Hohe Tauern à sa porte (et la promenade de la vallée Gasteinertal sans dénivelé). Spa (Belgique) est entourée de la réserve des Hautes Fagnes avec 700 km de sentiers balisés. Bad Ischl se trouve dans le Salzkammergut, avec 25 lacs et plusieurs sentiers de montagne accessibles en 30 minutes. Karlovy Vary borde le parc naturel de la forêt de Slavkov. Dans chaque cas, la ville thermale est la base confortable et le paysage environnant est l'activité canine.`,
      },
    ],
    faqHeading: 'Questions fréquentes',
    faqs: [
      {
        q: 'Pourquoi les villes thermales sont-elles bonnes pour les chiens ?',
        a: `Les villes thermales sont conçues autour d'un mouvement lent et contemplatif : longues promenades, galeries colonnées, circuits dans les parcs. Ces environnements correspondent exactement à ce qui convient à un chien en vacances bien-être. Pas d'interdictions de plage, pas de bruit de jet-ski, pas de foule estivale. La culture des hôtels bien-être signifie que le personnel est habitué à accueillir des clients ayant des besoins particuliers (régime, mobilité, horaires), donc un client avec chien n'est pas une nouveauté. Beaucoup d'hôtels thermaux ont des chiens résidents depuis des décennies. Le microclimat plus frais (altitude, position intérieure, couvert forestier) réduit le stress thermique. Et le rythme touristique plus lent signifie restaurants en terrasse, cafés avec sièges extérieurs, et parcs avec bancs.`,
      },
      {
        q: 'Mon chien peut-il venir aux bains thermaux ?',
        a: `Pas dans l'eau, dans pratiquement tous les cas. Les bassins eux-mêmes sont des environnements médicaux à hygiène contrôlée. Cependant, les parcs qui les entourent, les jardins spa des hôtels et les terrasses extérieures sont généralement accessibles aux chiens. A Saturnia, les cascate del mulino naturelles (un débordement de source chaude gratuit, non géré) tolèrent les chiens au bord de l'eau. A Heviz, le parc autour du lac thermal est ouvert aux chiens en laisse. A Spa (Belgique), le plateau des Hautes Fagnes directement au-dessus des thermes offre 700 km de sentiers canins. Le schéma est constant : pas d'accès à l'eau, accès complet à tout ce qui l'entoure.`,
      },
      {
        q: 'Laquelle de ces villes est la plus chaude en été ?',
        a: `Saturnia (Toscane) a la moyenne estivale la plus élevée à 30C, et est mieux visitée à l'aube ou après 19h en juillet-août. Vichy et Heviz atteignent toutes deux 27-28C en plein été. Les options les plus fraîches sont Bad Gastein (19C de moyenne, rafraîchi par l'altitude) et Spa Belgique (21C, forêts). Pour les chiens sensibles à la chaleur ou les races brachycéphales, Bad Gastein, Spa (Belgique) ou Bad Ischl (23C) sont les choix les plus sûrs. Karlovy Vary à 23C et Aix-les-Bains à 26C se situent dans la plage intermédiaire.`,
      },
      {
        q: 'Le réseau Grandes Villes d\'Eaux vaut-il la peine d\'être suivi pour le voyage canin ?',
        a: `Oui. Les 11 villes membres du réseau UNESCO Grandes Villes d'Eaux d'Europe ont toutes le même profil : calmes, riches en architecture, en parcs, et bien moins touristiques que leurs voisines stations balnéaires ou de montagne. Pour le voyage avec chien, ces qualités se traduisent directement par des promenades accessibles, des terrasses de restaurants canin-bienveillantes, des hôtels bien-être avec jardins, et une population locale habituée aux touristes de cure multi-jours (qui ont tendance à marcher, pas à se précipiter). Le réseau couvre actuellement l'Allemagne, la Belgique, le Royaume-Uni, la France, l'Italie, la République tchèque et l'Autriche, donc une ville membre est accessible depuis la plupart de l'Europe continentale en voiture raisonnable.`,
      },
    ],
    relatedHeading: 'Voir aussi',
  },
  es: {
    eyebrow: 'BIENESTAR PET-FRIENDLY 2026 · TERMALISMO EUROPA',
    title: `Ciudades termales pet-friendly en Europa: 8 escapadas de bienestar con hoteles para mascotas (2026)`,
    intro: `El turismo termal y de bienestar esta en auge en Europa, y las ciudades termales resultan ideales para los propietarios de perros: sin prohibiciones de playa que gestionar, amplios parques y paseos disenados para el paseo lento, ambientes mas tranquilos que las estaciones de costa, y microclimas mas frescos gracias a la altitud o a la posicion interior. Sobre todo, los hoteles de bienestar de las ciudades termales llevan generaciones acogiendo perros junto a sus clientes de cura. Estas 8 ciudades combinan un autentico patrimonio termal con el tipo de entorno calmo y practicable que se adapta a cualquier perro.`,
    pickHeading: '8 ciudades termales donde los perros son bienvenidos',
    whyHere: 'Por que aqui',
    hotelLabel: 'Donde alojarse',
    seeDestCta: 'Guia completa →',
    hotelCta: 'Ver disponibilidad →',
    summerLabel: 'Max verano',
    practicalHeading: 'Info practica para viajar con perro en ciudad termal',
    practical: [
      {
        h: 'Pueden los perros ir a las piscinas termales?',
        p: `Casi nunca. Las piscinas en si (incluido el famoso lago de Heviz y el complejo Terme di Saturnia) tienen normas de higiene que excluyen a los animales. Sin embargo, esto no es lo que importa para un propietario de perro: lo que importa es si los parques, terrazas exteriores, paseos con columnatas y jardines de hoteles que rodean las instalaciones termales son accesibles a los perros. En cada ciudad de esta lista, lo son. La experiencia de una ciudad termal es el ambiente, la arquitectura y el ritmo lento, que los perros disfrutan plenamente sin entrar en el agua.`,
      },
      {
        h: 'Ritmo termal y perros sensibles al calor',
        p: `Las ciudades termales funcionan a un ritmo mas lento que las estaciones de playa: largos almuerzos, horas de calma por la tarde, paseos vespertinos. Este ritmo se adapta mucho mejor a los perros sensibles al calor (razas braquicefalas, mayores, perros de pelo denso) que una animada ciudad costera. La mayoria de hoteles termales tienen jardines donde los perros pueden descansar durante las horas mas calurosas del mediodia. La altitud de las ciudades termales de montana (Bad Gastein a 1000m, Bad Ischl en el Salzkammergut) baja las temperaturas 4-8C respecto a las ciudades de llanura vecinas.`,
      },
      {
        h: 'La red UNESCO Grandes Balnearios de Europa',
        p: `En 2021, once ciudades termales europeas obtuvieron el estatus de Patrimonio Mundial UNESCO como Grandes Balnearios de Europa: Baden-Baden, Spa (Belgica), Bath, Vichy, Montecatini Terme, Franzensbad, Marienbad, Karlsbad (Karlovy Vary), Bad Ems, Bad Kissingen y Wildbad Reuenthal. Todas comparten las mismas caracteristicas: paseos con columnatas, arquitectura termal, parques disenados para curas de paseo, y una cultura del bienestar que se remonta a siglos. Para viajar con perros, esta red es una guia fiable de ciudades calmadas, ricas en parques y centradas en la arquitectura.`,
      },
      {
        h: 'Combinar visita termal con senderismo canino',
        p: `Las mejores ciudades termales de esta lista sirven tambien de bases de senderismo. Bad Gastein tiene el Parque Nacional del Hohe Tauern a su puerta (y el paseo del valle Gasteinertal sin desnivel). Spa (Belgica) esta rodeada de la reserva de las Hautes Fagnes con 700 km de senderos senalizados. Bad Ischl se encuentra en el Salzkammergut, con 25 lagos y multiples senderos de montana accesibles en 30 minutos. Karlovy Vary linda con el parque natural del bosque de Slavkov. En cada caso, la ciudad termal es la base comoda y el paisaje circundante es la actividad canina.`,
      },
    ],
    faqHeading: 'Preguntas frecuentes',
    faqs: [
      {
        q: 'Por que son buenas las ciudades termales para los perros?',
        a: `Las ciudades termales estan disenadas en torno a un movimiento lento y contemplativo: largos paseos, galerias con columnas, circuitos en parques. Estos entornos son exactamente lo que conviene a un perro en unas vacaciones de bienestar. Sin prohibiciones de playa, sin ruido de motos de agua, sin aglomeraciones veraniegas. La cultura de los hoteles de bienestar significa que el personal esta acostumbrado a atender a huespedes con necesidades especiales (dieta, movilidad, horarios), por lo que un huesped con perro no es una novedad. Muchos hoteles termales tienen perros residentes desde hace decadas. El microclimat mas fresco (altitud, posicion interior, arboleda) reduce el estres termico. Y el ritmo turistico mas lento significa restaurantes con terraza, cafes con asientos exteriores, y parques con bancos.`,
      },
      {
        q: 'Puede mi perro ir a los banos termales?',
        a: `No al agua, en practicamente todos los casos. Las piscinas en si son entornos medicos con higiene controlada. Sin embargo, los parques que las rodean, los jardines spa de los hoteles y las terrazas exteriores son generalmente accesibles a los perros. En Saturnia, las cascate del mulino naturales (un desbordamiento de manantial caliente gratuito y no gestionado) toleran perros a la orilla del agua. En Heviz, el parque alrededor del lago termal esta abierto a perros con correa. En Spa (Belgica), el plateau de las Hautes Fagnes directamente encima de las termas ofrece 700 km de senderos caninos. El patron es consistente: sin acceso al agua, acceso completo a todo lo que la rodea.`,
      },
      {
        q: 'Cual de estas ciudades es mas calurosa en verano?',
        a: `Saturnia (Toscana) tiene el maximo estival mas alto a 30C, y es mejor visitarla al amanecer o despues de las 19h en julio-agosto. Vichy y Heviz alcanzan ambas los 27-28C en pleno verano. Las opciones mas frescas son Bad Gastein (19C de media, enfriado por altitud) y Spa Belgica (21C, boscosa). Para perros sensibles al calor o razas braquicefalas, Bad Gastein, Spa (Belgica) o Bad Ischl (23C) son las opciones mas seguras. Karlovy Vary a 23C y Aix-les-Bains a 26C se situan en el rango intermedio.`,
      },
      {
        q: 'Vale la pena seguir la red Grandes Balnearios de Europa para viajar con perros?',
        a: `Si. Las 11 ciudades miembro de la red UNESCO Grandes Balnearios de Europa comparten el mismo perfil: tranquilas, ricas en arquitectura y parques, y significativamente menos turisticas que sus vecinas estaciones de playa o de montana. Para viajar con perros, estas cualidades se traducen directamente en paseos accesibles, terrazas de restaurantes tolerantes con perros, hoteles de bienestar con jardines, y una poblacion local acostumbrada a turistas de cura multi-dia (que tienden a pasear, no a correr). La red cubre actualmente Alemania, Belgica, Reino Unido, Francia, Italia, Republica Checa y Austria, por lo que hay una ciudad miembro accesible desde la mayor parte de la Europa continental en coche razonable.`,
      },
    ],
    relatedHeading: 'Ver tambien',
  },
  pt: {
    eyebrow: 'BEM-ESTAR PET-FRIENDLY 2026 · TERMALISMO EUROPA',
    title: `Cidades termais pet-friendly na Europa: 8 escapadas de bem-estar com hoteis para animais (2026)`,
    intro: `O turismo termal e de bem-estar esta em crescimento em toda a Europa, e as cidades termais revelam-se perfeitas para os donos de caes: sem proibicoes de praia para gerir, amplos parques e passeios concebidos para a caminhada lenta, ambientes mais calmos do que as estagoes costeiras, e microclimas mais frescos gracas a altitude ou a posicao interior. Acima de tudo, os hoteis de bem-estar das cidades termais acolhem caes a par dos seus clientes de cura ha geracoes. Estas 8 cidades combinam um autentico patrimonio termal com o tipo de ambiente calmo e praticavel que se adapta a qualquer cao.`,
    pickHeading: '8 cidades termais onde os caes sao bem-vindos',
    whyHere: 'Porquê aqui',
    hotelLabel: 'Onde ficar',
    seeDestCta: 'Guia completo →',
    hotelCta: 'Ver disponibilidade →',
    summerLabel: 'Max verao',
    practicalHeading: 'Info pratica para viajar com cao em cidade termal',
    practical: [
      {
        h: 'Os caes podem ir as piscinas termais?',
        p: `Quase nunca. As piscinas em si (incluindo o famoso lago de Heviz e o complexo Terme di Saturnia) tem regras de higiene que excluem animais. No entanto, isto nao e o que importa para um dono de cao: o que importa e saber se os parques, terracos exteriores, passeios com colunas e jardins de hoteis que rodeiam as instalacoes termais sao acessiveis a caes. Em todas as cidades desta lista, sao. A experiencia de uma cidade termal e a atmosfera, a arquitectura e o ritmo lento, que os caes desfrutam plenamente sem entrar na agua.`,
      },
      {
        h: 'Ritmo termal e caes sensiveis ao calor',
        p: `As cidades termais funcionam a um ritmo mais lento do que as estagoes balneares: longos almogos, horas de calma a tarde, passeios vespertinos. Este ritmo adapta-se muito melhor aos caes sensiveis ao calor (racas braquicefalicas, idosos, caes de pelagem densa) do que uma animada cidade costeira. A maioria dos hoteis termais tem jardins onde os caes podem descansar durante as horas mais quentes do meio-dia. A altitude das cidades termais de montanha (Bad Gastein a 1000m, Bad Ischl no Salzkammergut) baixa as temperaturas 4-8C em relacao as cidades de planicie vizinhas.`,
      },
      {
        h: 'A rede UNESCO Grandes Termas da Europa',
        p: `Em 2021, onze cidades termais europeias obtiveram o estatuto de Patrimonio Mundial UNESCO como Grandes Termas da Europa: Baden-Baden, Spa (Belgica), Bath, Vichy, Montecatini Terme, Franzensbad, Marienbad, Karlsbad (Karlovy Vary), Bad Ems, Bad Kissingen e Wildbad Reuenthal. Todas partilham as mesmas caracteristicas: passeios com colunas, arquitectura termal, parques concebidos para curas de caminhada, e uma cultura de bem-estar que remonta a seculos. Para viajar com caes, esta rede e um guia fiavel de cidades calmas, ricas em parques e focadas na arquitectura.`,
      },
      {
        h: 'Combinar visita termal com caminhada canina',
        p: `As melhores cidades termais desta lista servem tambem de bases de caminhada. Bad Gastein tem o Parque Nacional do Hohe Tauern a sua porta (e o passeio do vale Gasteinertal sem desnivel). Spa (Belgica) esta rodeada da reserva das Hautes Fagnes com 700 km de trilhos sinalizados. Bad Ischl fica no Salzkammergut, com 25 lagos e varios trilhos de montanha acessiveis em 30 minutos. Karlovy Vary confina com o parque natural da floresta de Slavkov. Em cada caso, a cidade termal e a base confortavel e a paisagem circundante e a actividade canina.`,
      },
    ],
    faqHeading: 'Perguntas frequentes',
    faqs: [
      {
        q: 'Porque sao as cidades termais boas para os caes?',
        a: `As cidades termais sao concebidas em torno de um movimento lento e contemplativo: longos passeios, galerias com colunas, circuitos em parques. Estes ambientes sao exatamente o que convem a um cao em ferias de bem-estar. Sem proibicoes de praia, sem ruido de jet-ski, sem multidoes de verao na praia. A cultura dos hoteis de bem-estar significa que o pessoal esta habituado a receber hospedes com necessidades especiais (dieta, mobilidade, horarios), pelo que um hospede com cao nao e uma novidade. Muitos hoteis termais tem caes residentes ha decadas. O microclimat mais fresco (altitude, posicao interior, coberto arboreo) reduz o stress termico. E o ritmo turistico mais lento significa restaurantes com terracos, cafes com assentos exteriores, e parques com bancos.`,
      },
      {
        q: 'O meu cao pode ir aos banhos termais?',
        a: `Nao para a agua, em praticamente todos os casos. As piscinas em si sao ambientes medicos com higiene controlada. No entanto, os parques que as rodeiam, os jardins spa dos hoteis e os terracos exteriores sao geralmente acessiveis a caes. Em Saturnia, as cascate del mulino naturais (um transbordamento de fonte quente gratuito e nao gerido) toleram caes a beira da agua. Em Heviz, o parque em volta do lago termal esta aberto a caes a trela. Em Spa (Belgica), o planalto das Hautes Fagnes directamente acima das termas oferece 700 km de trilhos caninos. O padrao e consistente: sem acesso a agua, acesso completo a tudo o que a rodeia.`,
      },
      {
        q: 'Qual destas cidades e mais quente no verao?',
        a: `Saturnia (Toscana) tem o maximo estival mais alto a 30C, e e melhor visitada ao amanhecer ou depois das 19h em julho-agosto. Vichy e Heviz atingem ambas os 27-28C no pleno verao. As opcoes mais frescas sao Bad Gastein (19C de media, arrefecida pela altitude) e Spa Belgica (21C, florestal). Para caes sensiveis ao calor ou racas braquicefalicas, Bad Gastein, Spa (Belgica) ou Bad Ischl (23C) sao as opcoes mais seguras. Karlovy Vary a 23C e Aix-les-Bains a 26C situam-se na faixa intermédia.`,
      },
      {
        q: 'Vale a pena seguir a rede Grandes Termas da Europa para viajar com caes?',
        a: `Sim. As 11 cidades membro da rede UNESCO Grandes Termas da Europa partilham o mesmo perfil: calmas, ricas em arquitectura e parques, e significativamente menos turisticas do que as suas vizinhas estagoes de praia ou de montanha. Para viajar com caes, estas qualidades traduzem-se diretamente em passeios acessiveis, terracos de restaurantes tolerantes com caes, hoteis de bem-estar com jardins, e uma populacao local habituada a turistas de cura multi-dia (que tendem a caminhar, nao a correr). A rede cobre actualmente a Alemanha, a Belgica, o Reino Unido, a Franca, a Italia, a Republica Checa e a Austria, pelo que ha uma cidade membro acessivel da maior parte da Europa continental em viagem de carro razoavel.`,
      },
    ],
    relatedHeading: 'Ver também',
  },
  de: {
    eyebrow: 'WELLNESS-REISEN MIT HUND 2026 · THERMALEUROPA',
    title: `Hundefreundliche Thermalkurorte in Europa: 8 Wellness-Auszeiten mit haustierfreundlichen Hotels (2026)`,
    intro: `Der Wellness- und Thermaltourismus boomt in ganz Europa, und Kurorte erweisen sich als ideal für Hundehalter: keine Strandverbote, weitläufige Parks und Promenaden, die für langsames Gehen gemacht sind, ruhigere Menschenmengen als an Küstenorten, und kühlere Mikroklimata dank Höhenlage oder Binnenlage. Vor allem heißen Wellnesshotels in Kurorten seit Generationen Hunde neben ihren Kurgästen willkommen. Diese 8 Städte verbinden echtes Thermalerbe mit der ruhigen, gut begehbaren Umgebung, die zu jedem Hund passt.`,
    pickHeading: '8 Kurorte, in denen Hunde willkommen sind',
    whyHere: 'Warum hier',
    hotelLabel: 'Wo übernachten',
    seeDestCta: 'Vollständiger Stadtguide →',
    hotelCta: 'Verfügbarkeit ansehen →',
    summerLabel: 'Sommer Ø Höchstwert',
    practicalHeading: 'Praktische Infos für Reisen mit Hund in Kurorten',
    practical: [
      {
        h: 'Dürfen Hunde in die Thermalbecken?',
        p: `Fast nie. Die Becken selbst (einschließlich des berühmten Hévíz-Sees und des Terme-di-Saturnia-Komplexes) unterliegen Hygienevorschriften, die Tiere ausschließen. Für Hundehalter zählt jedoch etwas anderes: ob die Parks, Außenterrassen, Kolonnadenpromenaden und Hotelgärten rund um die Thermalanlagen für Hunde zugänglich sind. In jeder Stadt dieser Liste ist das der Fall. Das Erlebnis eines Kurorts liegt in der Atmosphäre, der Architektur und dem ruhigen Tempo, was Hunde voll genießen können, ohne je ins Wasser zu müssen.`,
      },
      {
        h: 'Kurort-Rhythmus und hitzeempfindliche Hunde',
        p: `Kurorte funktionieren in einem langsameren Rhythmus als Strandorte: lange Mittagessen, ruhige Nachmittagsstunden, abendliche Spaziergänge. Dieser Rhythmus passt weit besser zu hitzeempfindlichen Hunden (brachyzephale Rassen, Senioren, Hunde mit dichtem Fell) als eine belebte Strandstadt. Die meisten Kurhotels verfügen über Gärten, in denen Hunde während der heißesten Mittagsstunden ruhen können. Die Höhenlage von Bergkurorten (Bad Gastein auf 1000 m, Bad Ischl im Salzkammergut) senkt die Temperaturen um 4-8C gegenüber nahegelegenen Städten im Flachland.`,
      },
      {
        h: 'Das UNESCO-Netzwerk Great Spas of Europe',
        p: `2021 erhielten elf europäische Kurorte den UNESCO-Welterbestatus als Great Spas of Europe: Baden-Baden, Spa (Belgien), Bath, Vichy, Montecatini Terme, Franzensbad, Marienbad, Karlsbad (Karlovy Vary), Bad Ems, Bad Kissingen und Bad Wildbad. Alle teilen dieselben Merkmale: Kolonnadenpromenaden, Thermalarchitektur, Parks für Kurwandelgänge und eine Wellnesskultur, die Jahrhunderte zurückreicht. Für Reisen mit Hund ist dieses Netzwerk ein verlässlicher Wegweiser zu ruhigen, parkreichen und architektonisch bemerkenswerten Städten.`,
      },
      {
        h: 'Thermalbesuche mit Hundewandern kombinieren',
        p: `Die besten Kurorte dieser Liste dienen auch als Wanderbasis. Bad Gastein hat den Nationalpark Hohe Tauern direkt vor der Tür (und den Gasteinertal-Talweg ohne Höhenmeter). Spa (Belgien) ist von der Reservat Hautes Fagnes mit 700 km markierten Wegen umgeben. Bad Ischl liegt im Salzkammergut mit 25 Seen und mehreren Bergwegen, die in 30 Minuten erreichbar sind. Karlovy Vary grenzt an den Naturpark Slavkov-Wald. In jedem Fall ist die Kurstadt die komfortable Basis, und die umgebende Landschaft ist die Hundeaktivität.`,
      },
    ],
    faqHeading: 'Häufig gestellte Fragen',
    faqs: [
      {
        q: 'Warum sind Kurorte gut für Hunde?',
        a: `Kurorte sind auf langsame, kontemplative Bewegung ausgelegt: lange Promenaden, Kolonnadenwege, Parkrundgänge. Diese Umgebungen passen genau zu einem Hund im Wellnessurlaub. Es gibt keine Strandverbote, keinen Jetski-Lärm, keine sommerlichen Strandmengen. Die Wellnesshotelkultur bedeutet, dass das Personal daran gewöhnt ist, Gäste mit besonderen Bedürfnissen zu betreuen (Ernährung, Mobilität, Zeitplan), sodass ein Gast mit Hund keine Neuheit ist. Viele Kurhotels haben seit Jahrzehnten hauseigene Hunde. Das kühlere Mikroklima (Höhenlage, Binnenlage, Baumbestand) reduziert Hitzestress. Und der langsamere Touristenrhythmus bedeutet Restaurants mit Terrassen, Cafés mit Außensitzplätzen und Parks mit Bänken.`,
      },
      {
        q: 'Darf mein Hund mit zu den Thermalbädern?',
        a: `Nicht ins Wasser, in praktisch allen Fällen. Die Becken selbst sind hygienisch kontrollierte medizinische Umgebungen. Die umliegenden Parks, die Spagärten der Hotels und die Außenterrassen sind jedoch in der Regel für Hunde zugänglich. In Saturnia toleriert der natürliche, frei zugängliche Überlauf der Cascate del Mulino Hunde am Wasserrand. In Hévíz ist der Park rund um den Thermalsee für Hunde an der Leine geöffnet. In Spa (Belgien) bietet das Hautes-Fagnes-Plateau direkt über den Thermen 700 km hundefreundliche Wege. Das Muster ist immer gleich: kein Zugang zum Wasser, voller Zugang zu allem drumherum.`,
      },
      {
        q: 'Welcher dieser Orte ist im Sommer am heißesten?',
        a: `Saturnia (Toskana) hat mit 30C den höchsten Sommerdurchschnitt und wird am besten bei Sonnenaufgang oder nach 19 Uhr im Juli-August besucht. Vichy und Hévíz erreichen beide im Hochsommer 27-28C. Die kühlsten Optionen sind Bad Gastein (Ø 19C, durch Höhenlage gekühlt) und Spa Belgien (21C, bewaldet). Für hitzeempfindliche Hunde oder brachyzephale Rassen sind Bad Gastein, Spa (Belgien) oder Bad Ischl (23C) die sichersten Wahlen. Karlovy Vary mit 23C und Aix-les-Bains mit 26C liegen im mittleren Bereich.`,
      },
      {
        q: 'Lohnt sich das Netzwerk Great Spas of Europe für Reisen mit Hund?',
        a: `Ja. Alle 11 Mitgliedsstädte des UNESCO-Netzwerks Great Spas of Europe teilen dasselbe Profil: ruhig, architektonisch reich, parkreich und deutlich weniger touristisch als benachbarte Strand- oder Bergorte. Für Reisen mit Hund übersetzen sich diese Eigenschaften direkt in zugängliche Promenaden, hundetolerante Restaurantterrassen, Wellnesshotels mit Gärten und eine lokale Bevölkerung, die an mehrtägige Kurgäste gewöhnt ist (die eher spazieren als hetzen). Das Netzwerk umfasst derzeit Deutschland, Belgien, das Vereinigte Königreich, Frankreich, Italien, Tschechien und Österreich, sodass von den meisten Orten in Kontinentaleuropa aus eine Mitgliedsstadt in vertretbarer Fahrzeit erreichbar ist.`,
      },
    ],
    relatedHeading: 'Siehe auch',
  },
  nl: {
    eyebrow: 'WELLNESSREIZEN MET HOND 2026 · THERMAAL EUROPA',
    title: `Hondvriendelijke kuuroorden in Europa: 8 wellness-uitjes met huisdiervriendelijke hotels (2026)`,
    intro: `Wellness- en thermaaltoerisme is booming in heel Europa, en kuuroorden blijken ideaal voor hondeneigenaren: geen strandverboden om mee om te gaan, uitgestrekte parken en promenades gemaakt voor rustig wandelen, minder drukte dan kuststeden, en koelere microklimaten dankzij hoogte of ligging landinwaarts. Nog belangrijker: wellnesshotels in kuuroorden verwelkomen al generaties lang honden naast hun kuurgasten. Deze 8 steden combineren echt thermaal erfgoed met precies de rustige, goed te belopen omgeving die bij elke hond past.`,
    pickHeading: '8 kuuroorden waar honden welkom zijn',
    whyHere: 'Waarom hier',
    hotelLabel: 'Waar je kunt overnachten',
    seeDestCta: 'Volledige stadsgids →',
    hotelCta: 'Bekijk beschikbaarheid →',
    summerLabel: 'Gem. max. zomer',
    practicalHeading: 'Praktische info voor reizen met hond naar kuuroorden',
    practical: [
      {
        h: 'Mogen honden in de thermale baden?',
        p: `Bijna nooit. De baden zelf (inclusief het beroemde Heviz-meer en het Terme di Saturnia-complex) hebben hygiëneregels die dieren uitsluiten. Voor een hondeneigenaar is dat echter niet waar het om draait: het gaat erom of de parken, buitenterrassen, zuilengangpromenades en hoteltuinen rond de thermale voorzieningen toegankelijk zijn voor honden. In elke stad op deze lijst is dat zo. De ervaring van een kuuroord zit in de sfeer, de architectuur en het rustige tempo, waar honden ten volle van genieten zonder ooit het water in te gaan.`,
      },
      {
        h: 'Kuuroordritme en hittegevoelige honden',
        p: `Kuuroorden werken op een trager tempo dan strandbestemmingen: lange lunches, rustige middaguren, avondwandelingen. Dit ritme past veel beter bij hittegevoelige honden (brachycefale rassen, oudere honden, honden met een dichte vacht) dan een drukke badstad. De meeste kuuroordhotels hebben tuinen waar honden kunnen rusten tijdens de heetste uren van de middag. De hoogte van bergkuuroorden (Bad Gastein op 1000 m, Bad Ischl in het Salzkammergut) verlaagt de temperatuur met 4-8C ten opzichte van nabijgelegen laaglandsteden.`,
      },
      {
        h: 'Het UNESCO-netwerk Great Spas of Europe',
        p: `In 2021 kregen elf Europese kuuroorden de status van UNESCO-Werelderfgoed als Great Spas of Europe: Baden-Baden, Spa (Belgie), Bath, Vichy, Montecatini Terme, Franzensbad, Marienbad, Karlsbad (Karlovy Vary), Bad Ems, Bad Kissingen en Bad Wildbad. Ze delen allemaal dezelfde kenmerken: zuilengangpromenades, thermale architectuur, parken ontworpen voor kuurwandelingen, en een wellnesscultuur die eeuwen teruggaat. Voor reizen met hond is dit netwerk een betrouwbare gids naar rustige, parkrijke, architectonisch waardevolle steden.`,
      },
      {
        h: 'Thermale bezoeken combineren met hondenwandelen',
        p: `De beste kuuroorden op deze lijst dienen ook als wandelbasis. Bad Gastein heeft het Hohe Tauern-nationaal park voor de deur (en de vallei van Gasteinertal is een wandeling zonder hoogteverschil). Spa (Belgie) wordt omringd door het Hautes Fagnes-reservaat met 700 km bewegwijzerde paden. Bad Ischl ligt in het Salzkammergut, met 25 meren en meerdere bergpaden binnen 30 minuten bereikbaar. Karlovy Vary grenst aan het natuurpark Slavkov-woud. In elk geval is de kuurstad de comfortabele basis en het omliggende landschap de hondenactiviteit.`,
      },
    ],
    faqHeading: 'Veelgestelde vragen',
    faqs: [
      {
        q: 'Waarom zijn kuuroorden goed voor honden?',
        a: `Kuuroorden zijn ontworpen rond langzame, contemplatieve beweging: lange promenades, zuilengangwandelingen, parkroutes. Deze omgevingen passen precies bij een hond op wellnessvakantie. Geen strandverboden, geen jetskilawaai, geen zomerse strandmenigten. De wellnesshotelcultuur betekent dat het personeel gewend is om gasten met bijzondere behoeften te begeleiden (dieet, mobiliteit, planning), dus een gast met hond is geen nieuwigheid. Veel kuurhotels hebben al tientallen jaren huishonden. Het koelere microklimaat (hoogte, ligging landinwaarts, boombedekking) vermindert hittestress. En het rustigere toeristenritme betekent restaurants met terrassen, cafes met buitenzitplaatsen, en parken met bankjes.`,
      },
      {
        q: 'Mag mijn hond mee naar de thermale baden?',
        a: `Niet het water in, in vrijwel alle gevallen. De baden zelf zijn hygienisch gecontroleerde medische omgevingen. De omliggende parken, de wellnesstuinen van de hotels en de buitenterrassen zijn echter over het algemeen toegankelijk voor honden. Bij Saturnia tolereert de natuurlijke, onbeheerde overloop van de cascate del mulino honden aan de waterkant. Bij Heviz is het park rond het thermale meer open voor honden aan de lijn. Bij Spa (Belgie) biedt het Hautes Fagnes-plateau direct boven de thermen 700 km hondvriendelijke paden. Het patroon is steeds hetzelfde: geen toegang tot het water, volledige toegang tot alles eromheen.`,
      },
      {
        q: 'Welke van deze steden is het heetst in de zomer?',
        a: `Saturnia (Toscane) heeft het hoogste zomergemiddelde met 30C, en wordt het best bezocht bij zonsopgang of na 19u in juli-augustus. Vichy en Heviz bereiken beide 27-28C in het hoogseizoen. De koelste opties zijn Bad Gastein (gem. 19C, gekoeld door hoogte) en Spa Belgie (21C, bebost). Voor hittegevoelige honden of brachycefale rassen zijn Bad Gastein, Spa (Belgie) of Bad Ischl (23C) de veiligste keuzes. Karlovy Vary met 23C en Aix-les-Bains met 26C liggen in het middensegment.`,
      },
      {
        q: 'Is het de moeite waard om het netwerk Great Spas of Europe te volgen voor reizen met hond?',
        a: `Ja. Alle 11 lidsteden van het UNESCO-netwerk Great Spas of Europe delen hetzelfde profiel: rustig, architectonisch rijk, parkrijk, en aanzienlijk minder toeristisch dan naburige strand- of bergbestemmingen. Voor reizen met hond vertalen deze kwaliteiten zich rechtstreeks naar toegankelijke promenades, hondvriendelijke restaurantterrassen, wellnesshotels met tuinen, en een lokale bevolking die gewend is aan meerdaagse kuurgasten (die eerder wandelen dan haasten). Het netwerk beslaat momenteel Duitsland, Belgie, het Verenigd Koninkrijk, Frankrijk, Italie, Tsjechie en Oostenrijk, dus er is vanuit vrijwel heel continentaal Europa een lidstad binnen een redelijke rijafstand bereikbaar.`,
      },
    ],
    relatedHeading: 'Zie ook',
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
    if (locale === 'de') return p.whyDe ?? p.whyEn
    if (locale === 'nl') return p.whyNl ?? p.whyEn
    return p.whyEn
  }
  const pickHotel = (p: Pick) => {
    if (locale === 'fr') return p.hotelFr
    if (locale === 'es') return p.hotelEs
    if (locale === 'pt') return p.hotelPt
    if (locale === 'de') return p.hotelDe ?? p.hotelEn
    if (locale === 'nl') return p.hotelNl ?? p.hotelEn
    return p.hotelEn
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-cyan-600 to-emerald-500 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 40%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-xs font-semibold uppercase tracking-widest text-teal-100 mb-3">💧 {t.eyebrow}</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{t.title}</h1>
          <p className="text-lg sm:text-xl text-teal-50 leading-relaxed">{t.intro}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-8">{t.pickHeading}</h2>
        <div className="space-y-5">
          {PICKS.map((p, i) => (
            <article key={p.slug} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <header className="px-5 sm:px-7 py-4 bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-stone-200 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-2xl font-black text-teal-700">#{i + 1}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  <Link href={`/${locale}${p.destPath}`} className="hover:text-teal-700">{p.name}</Link>
                </h3>
                <span className="text-sm text-stone-600">{p.country}</span>
                <span className="ml-auto bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full">
                  💧 {p.thermalNote}
                </span>
                <span className="bg-sky-100 text-sky-900 text-xs font-bold px-3 py-1 rounded-full">
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
                  <Link href={`/${locale}${p.destPath}`} className="text-sm font-semibold text-teal-700 hover:text-teal-900 hover:underline">
                    {t.seeDestCta}
                  </Link>
                  <a
                    href={buildAllezDestLink(p.name, p.country, `${CAMPAIGN_BASE}-${p.slug}`, 5)}
                    target="_blank"
                    rel="noopener sponsored"
                    className="text-sm font-semibold text-stone-700 hover:text-teal-700 hover:underline"
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
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">💧 {t.practicalHeading}</h2>
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
