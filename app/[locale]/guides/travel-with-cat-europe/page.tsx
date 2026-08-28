import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'travel-with-cat-europe'
const CAMPAIGN_BASE = 'cat-europe'

const STICKY_LABELS: Record<string, { label: string; cta: string }> = {
  en: { label: 'Cat-friendly European hotels', cta: 'See hotels' },
  fr: { label: `Hôtels cat-friendly en Europe`, cta: 'Voir les hôtels' },
  es: { label: 'Hoteles cat-friendly en Europa', cta: 'Ver hoteles' },
  pt: { label: 'Hotéis cat-friendly na Europa', cta: 'Ver hotéis' },
  de: { label: 'Katzenfreundliche Hotels in Europa', cta: 'Hotels ansehen' },
  nl: { label: 'Kattenvriendelijke hotels in Europa', cta: 'Bekijk hotels' },
  it: { label: 'Hotel cat-friendly in Europa', cta: 'Vedi gli hotel' },
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
    en: `Travel with Your Cat in Europe: Complete Guide (Train, Flight, Hotels) 2026`,
    fr: `Voyager avec son chat en Europe : guide complet (train, avion, hôtels) 2026`,
    es: `Viajar con tu gato en Europa: guía completa (tren, avión, hoteles) 2026`,
    pt: `Viajar com o seu gato na Europa: guia completo (comboio, avião, hotéis) 2026`,
    de: `Mit der Katze durch Europa reisen: der komplette Ratgeber (Zug, Flug, Hotels) 2026`,
    nl: `Reizen met je kat door Europa: complete gids (trein, vlucht, hotels) 2026`,
    it: `Viaggiare con il tuo gatto in Europa: guida completa (treno, aereo, hotel) 2026`,
  }
  const descriptions: Record<string, string> = {
    en: `The complete guide to travelling Europe with a cat: EU pet passport, IATA cabin carriers, train policies per country, anti-stress protocol, and 6 European cities with genuinely cat-friendly hotels (verified, not just pet-friendly).`,
    fr: `Le guide complet pour voyager en Europe avec son chat : passeport UE, sacs cabine IATA, politiques train par pays, protocole anti-stress, et 6 villes européennes avec hôtels vraiment cat-friendly (vérifiés, pas juste "pet-friendly").`,
    es: `La guía completa para viajar por Europa con tu gato: pasaporte UE, transportines IATA, políticas de tren por país, protocolo anti-estrés, y 6 ciudades europeas con hoteles realmente cat-friendly (verificados, no solo "pet-friendly").`,
    pt: `O guia completo para viajar pela Europa com o seu gato: passaporte UE, transportadoras IATA, políticas de comboio por país, protocolo anti-stress, e 6 cidades europeias com hotéis verdadeiramente cat-friendly (verificados, não apenas "pet-friendly").`,
    de: `Der komplette Ratgeber für Reisen durch Europa mit Katze: EU-Heimtierausweis, IATA-Kabinentransportboxen, Zugrichtlinien je Land, Anti-Stress-Protokoll, und 6 europäische Städte mit wirklich katzenfreundlichen Hotels (verifiziert, nicht nur "haustierfreundlich").`,
    nl: `De complete gids voor reizen door Europa met je kat: EU-dierenpaspoort, IATA-kattenmanden voor de cabine, treinregels per land, anti-stressprotocol, en 6 Europese steden met écht katvriendelijke hotels (geverifieerd, niet zomaar "huisdiervriendelijk").`,
    it: `La guida completa per viaggiare in Europa con il tuo gatto: passaporto UE, trasportini cabina IATA, regole treno per paese, protocollo anti-stress, e 6 città europee con hotel davvero cat-friendly (verificati, non solo "pet-friendly" con nota a piè di pagina).`,
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
        it: `${SITE_URL}/it/guides/${SLUG}`,
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
  whyEn: string
  whyFr: string
  whyEs: string
  whyPt: string
  whyDe?: string
  whyNl?: string
  whyIt?: string
  hotelName: string
  hotelEn: string
  hotelFr: string
  hotelEs: string
  hotelPt: string
  hotelDe?: string
  hotelNl?: string
  hotelIt?: string
}

const PICKS: Pick[] = [
  {
    slug: 'paris',
    name: 'Paris',
    country: 'France',
    destPath: '/destinations/paris',
    whyEn: `Paris has Europe's densest cat-friendly hotel inventory and a long café culture that quietly welcomes a calm cat in a soft carrier. The Pére-Lachaise cemetery is a famous resident-cat colony (300+ cats fed by city volunteers), the Café des Chats and Le Cafe des Chats both let you visit cats while travelling with your own, and most boutique hotels have window-screens that prevent the dreaded "cat-out-the-window" scenario.`,
    whyFr: `Paris a la densité d'hôtels cat-friendly la plus élevée d'Europe et une longue culture café qui accueille discrètement un chat calme dans un sac souple. Le cimetière du Père-Lachaise est une colonie de chats célèbres (300+ chats nourris par des bénévoles de la Ville), le Café des Chats et Le Cafe des Chats permettent de visiter des chats pendant que vous voyagez avec le vôtre, et la plupart des hôtels boutique ont des moustiquaires qui évitent le scénario "chat-par-la-fenêtre".`,
    whyEs: `París tiene la densidad de hoteles cat-friendly más alta de Europa y una larga cultura café que admite discretamente a un gato tranquilo en bolsa blanda. El cementerio del Père-Lachaise es una colonia de gatos famosa (300+ gatos alimentados por voluntarios de la ciudad), el Café des Chats y Le Café des Chats permiten visitar gatos mientras viajas con el tuyo, y la mayoría de hoteles boutique tienen mosquiteras que evitan el escenario "gato-por-la-ventana".`,
    whyPt: `Paris tem a densidade de hotéis cat-friendly mais alta da Europa e uma longa cultura café que aceita discretamente um gato calmo num saco mole. O cemitério do Père-Lachaise é uma colónia de gatos famosa (300+ gatos alimentados por voluntários da cidade), o Café des Chats e Le Café des Chats permitem visitar gatos enquanto viaja com o seu, e a maioria dos hotéis boutique tem redes mosquiteiras que evitam o cenário "gato-pela-janela".`,
    whyDe: `Paris hat die dichteste katzenfreundliche Hotellandschaft Europas und eine lange Café-Kultur, die eine ruhige Katze in einer weichen Transportbox diskret willkommen heißt. Der Friedhof Père-Lachaise ist eine bekannte Straßenkatzen-Kolonie (300+ Katzen, gefüttert von städtischen Freiwilligen), das Café des Chats und Le Café des Chats erlauben Ihnen, Katzen zu besuchen, während Sie mit Ihrer eigenen reisen, und die meisten Boutique-Hotels haben Fenstergitter, die das gefürchtete Szenario "Katze-aus-dem-Fenster" verhindern.`,
    whyNl: `Parijs heeft het dichtste aanbod katvriendelijke hotels van Europa en een lange cafécultuur die een rustige kat in een zachte mand stilletjes verwelkomt. Het kerkhof Père-Lachaise is een bekende kattenkolonie (300+ katten, gevoed door vrijwilligers van de stad), het Café des Chats en Le Café des Chats laten je katten bezoeken terwijl je met je eigen kat reist, en de meeste boetiekhotels hebben horren die het gevreesde scenario "kat-uit-het-raam" voorkomen.`,
    whyIt: `Parigi ha la densità di hotel cat-friendly più alta d'Europa e una lunga cultura del caffè che accoglie discretamente un gatto tranquillo in un trasportino morbido. Il cimitero di Père-Lachaise è una famosa colonia di gatti (300+ gatti nutriti da volontari della città), il Café des Chats e Le Café des Chats ti permettono di visitare i gatti mentre viaggi con il tuo, e la maggior parte degli hotel boutique ha zanzariere che evitano il temuto scenario "gatto-fuori-dalla-finestra".`,
    hotelName: 'Hôtel Particulier Montmartre',
    hotelEn: `Boutique 5-star tucked into a private garden in Montmartre, cats explicitly welcomed (the resident hotel cat is well known). Window screens on all rooms, no balcony access, quiet residential street with zero traffic noise.`,
    hotelFr: `Boutique 5 étoiles dans un jardin privé à Montmartre, chats explicitement bienvenus (la chatte résidente de l'hôtel est célèbre). Moustiquaires sur toutes les chambres, pas d'accès balcon, rue résidentielle calme sans bruit de circulation.`,
    hotelEs: `Boutique 5 estrellas en un jardín privado en Montmartre, gatos explícitamente bienvenidos (la gata residente del hotel es muy conocida). Mosquiteras en todas las habitaciones, sin acceso a balcón, calle residencial tranquila sin ruido de tráfico.`,
    hotelPt: `Boutique 5 estrelas num jardim privado em Montmartre, gatos explicitamente bem-vindos (a gata residente do hotel é famosa). Redes mosquiteiras em todos os quartos, sem acesso a varanda, rua residencial calma sem barulho de tráfego.`,
    hotelDe: `Boutique-5-Sterne-Hotel in einem privaten Garten in Montmartre, Katzen ausdrücklich willkommen (die hoteleigene Katze ist wohlbekannt). Fenstergitter in allen Zimmern, kein Balkonzugang, ruhige Wohnstraße ohne Verkehrslärm.`,
    hotelNl: `Boetiek 5-sterrenhotel verscholen in een privétuin in Montmartre, katten zijn expliciet welkom (de huiskat van het hotel is bekend). Horren in alle kamers, geen toegang tot een balkon, rustige woonstraat zonder verkeerslawaai.`,
    hotelIt: `Boutique 5 stelle immerso in un giardino privato a Montmartre, gatti esplicitamente benvenuti (il gatto residente dell'hotel è famoso). Zanzariere in tutte le camere, nessun accesso al balcone, strada residenziale tranquilla senza rumore di traffico.`,
  },
  {
    slug: 'rome',
    name: 'Rome',
    country: 'Italy',
    destPath: '/destinations/rome',
    whyEn: `Rome is one of Europe's most cat-tolerant cities by law: feral cats have official "biocultural heritage" status. The Largo di Torre Argentina cat sanctuary (where Julius Caesar was assassinated) hosts 130+ cats and welcomes visitors. Italian hotels routinely accept cats - the Italian word for stay (soggiorno) historically included a small fee for "the cat that travels with the family".`,
    whyFr: `Rome est l'une des villes d'Europe les plus tolérantes envers les chats par la loi : les chats errants ont le statut officiel de "patrimoine bioculturel". Le sanctuaire des chats du Largo di Torre Argentina (où Jules César a été assassiné) abrite 130+ chats et accueille les visiteurs. Les hôtels italiens acceptent souvent les chats - le mot italien pour séjour (soggiorno) incluait historiquement un petit supplément pour "le chat qui voyage avec la famille".`,
    whyEs: `Roma es una de las ciudades europeas más tolerantes con gatos por ley: los gatos callejeros tienen el estatus oficial de "patrimonio biocultural". El santuario de gatos del Largo di Torre Argentina (donde fue asesinado Julio César) alberga 130+ gatos y admite visitantes. Los hoteles italianos suelen aceptar gatos - la palabra italiana para estancia (soggiorno) incluía históricamente un pequeño suplemento por "el gato que viaja con la familia".`,
    whyPt: `Roma é uma das cidades europeias mais tolerantes com gatos por lei: os gatos vadios têm o estatuto oficial de "património biocultural". O santuário dos gatos do Largo di Torre Argentina (onde Júlio César foi assassinado) abriga 130+ gatos e aceita visitantes. Os hotéis italianos costumam aceitar gatos - a palavra italiana para estadia (soggiorno) incluía historicamente uma pequena taxa por "o gato que viaja com a família".`,
    whyDe: `Rom ist per Gesetz eine der katzenfreundlichsten Städte Europas: Straßenkatzen haben offiziell den Status "biokulturelles Erbe". Das Katzenschutzgebiet Largo di Torre Argentina (wo Julius Cäsar ermordet wurde) beherbergt 130+ Katzen und heißt Besucher willkommen. Italienische Hotels akzeptieren Katzen in der Regel - das italienische Wort für Aufenthalt (soggiorno) beinhaltete historisch einen kleinen Aufschlag für "die Katze, die mit der Familie reist".`,
    whyNl: `Rome is wettelijk een van de meest katvriendelijke steden van Europa: zwerfkatten hebben officieel de status "biocultureel erfgoed". Het kattenasiel Largo di Torre Argentina (waar Julius Caesar werd vermoord) huisvest 130+ katten en verwelkomt bezoekers. Italiaanse hotels accepteren doorgaans katten, het Italiaanse woord voor verblijf (soggiorno) omvatte historisch een klein toeslagje voor "de kat die met het gezin meereist".`,
    whyIt: `Roma è per legge una delle città più tolleranti verso i gatti d'Europa: i gatti randagi hanno lo status ufficiale di "patrimonio bioculturale". Il rifugio felino di Largo di Torre Argentina (dove fu assassinato Giulio Cesare) ospita oltre 130 gatti e accoglie i visitatori. Gli hotel italiani accettano di solito i gatti: la parola "soggiorno" storicamente includeva un piccolo extra per "il gatto che viaggia con la famiglia".`,
    hotelName: 'Portrait Roma',
    hotelEn: `Lungarno Collection 5-star on Via Bocca di Leone, cats welcomed in suites (mid fee). Heavy curtains and triple-glazed windows mean a quiet nest for an anxious traveller, the rooftop terrace is humans-only but the suite balconies have netting on request.`,
    hotelFr: `5 étoiles Lungarno Collection sur la Via Bocca di Leone, chats acceptés en suites (supplément modéré). Rideaux épais et triple vitrage = nid calme pour un voyageur anxieux, la terrasse rooftop est humaine uniquement mais les balcons des suites ont des filets sur demande.`,
    hotelEs: `5 estrellas Lungarno Collection en Via Bocca di Leone, gatos admitidos en suites (suplemento moderado). Cortinas gruesas y triple acristalamiento = nido tranquilo para viajero ansioso, la terraza es solo humanos pero los balcones de las suites tienen redes a petición.`,
    hotelPt: `5 estrelas Lungarno Collection na Via Bocca di Leone, gatos aceites em suítes (taxa moderada). Cortinas pesadas e vidro triplo = ninho calmo para viajante ansioso, o terraço é só humanos mas as varandas das suítes têm redes a pedido.`,
    hotelDe: `5-Sterne-Haus der Lungarno Collection in der Via Bocca di Leone, Katzen in Suiten willkommen (mittlerer Aufpreis). Schwere Vorhänge und dreifach verglaste Fenster bedeuten ein ruhiges Nest für einen ängstlichen Reisenden, die Dachterrasse ist nur für Menschen, aber die Suiten-Balkone haben auf Anfrage Netze.`,
    hotelNl: `5-sterrenhotel van de Lungarno Collection aan de Via Bocca di Leone, katten welkom in suites (gemiddelde toeslag). Zware gordijnen en driedubbel glas betekenen een rustig nestje voor een gestreste reiziger, het dakterras is alleen voor mensen, maar de suitebalkons hebben op verzoek gaas.`,
    hotelIt: `5 stelle Lungarno Collection in Via Bocca di Leone, gatti accettati nelle suite (supplemento moderato). Tende pesanti e triplo vetro significano un nido tranquillo per un viaggiatore ansioso, la terrazza sul tetto è solo per umani ma i balconi delle suite hanno reti su richiesta.`,
  },
  {
    slug: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    destPath: '/destinations/amsterdam',
    whyEn: `Home of the world-famous Poezenboot (Cat Boat) - a floating sanctuary on the Singel canal, open to visitors with their own carrier-bound cat. Dutch hotels lead Europe on cat infrastructure: window screens, scratching posts on request, and water-fountain rentals. Public transport (GVB metro and trams) accepts cats in carriers free.`,
    whyFr: `Foyer du célèbre Poezenboot (le bateau-chats) - un sanctuaire flottant sur le canal Singel, ouvert aux visiteurs avec leur propre chat en sac. Les hôtels néerlandais sont en tête de l'Europe sur l'infrastructure chat : moustiquaires, griffoirs sur demande, et fontaines à eau en location. Les transports publics (métro et trams GVB) acceptent les chats en sac gratuits.`,
    whyEs: `Hogar del famoso Poezenboot (el barco-gatos) - un santuario flotante en el canal Singel, abierto a visitantes con su propio gato en transportín. Los hoteles holandeses lideran Europa en infraestructura gatuna: mosquiteras, rascadores a petición, y fuentes de agua en alquiler. El transporte público (metro y tranvías GVB) admite gatos en transportín gratis.`,
    whyPt: `Lar do famoso Poezenboot (o barco-gatos) - um santuário flutuante no canal Singel, aberto a visitantes com o seu próprio gato em transportadora. Os hotéis holandeses lideram a Europa em infraestrutura felina: redes mosquiteiras, arranhadores a pedido, e fontes de água em aluguer. Os transportes públicos (metro e elétricos GVB) aceitam gatos em transportadora gratuitamente.`,
    whyDe: `Heimat des weltberühmten Poezenboot (Katzenboot) - ein schwimmendes Refugium am Singel-Kanal, offen für Besucher mit der eigenen Katze in der Transportbox. Niederländische Hotels führen Europa bei der Katzeninfrastruktur an: Fenstergitter, Kratzbäume auf Anfrage, und Trinkbrunnen zum Mieten. Öffentliche Verkehrsmittel (GVB-Metro und -Trams) nehmen Katzen in der Transportbox kostenlos mit.`,
    whyNl: `Thuisbasis van de wereldberoemde Poezenboot, een drijvend toevluchtsoord aan de Singel, open voor bezoekers met hun eigen kat in een mand. Nederlandse hotels lopen voorop in Europa op het gebied van kattenvoorzieningen: horren, krabpalen op verzoek en waterfonteintjes te huur. Het openbaar vervoer (GVB-metro en trams) neemt katten in een mand gratis mee.`,
    whyIt: `Sede del famosissimo Poezenboot (la barca dei gatti), un rifugio galleggiante sul canale Singel, aperto ai visitatori con il proprio gatto nel trasportino. Gli hotel olandesi guidano l'Europa nell'infrastruttura per gatti: zanzariere, tiragraffi su richiesta e fontanelle d'acqua a noleggio. I trasporti pubblici (metro e tram GVB) accettano gatti nel trasportino gratis.`,
    hotelName: 'Pulitzer Amsterdam',
    hotelEn: `5-star spread across 25 connected 17th-century canal houses on the Prinsengracht. Cats welcomed (small fee), the canal-side rooms have window-screens, and the inner garden courtyard is a calm spot for a curious leashed cat to take in 30 min of outdoor stimulation.`,
    hotelFr: `5 étoiles répartis sur 25 maisons de canal du XVIIᵉ reliées sur le Prinsengracht. Chats acceptés (petit supplément), les chambres côté canal ont des moustiquaires, et la cour-jardin intérieure est un spot calme pour 30 min de stimulation extérieure avec chat en laisse.`,
    hotelEs: `5 estrellas repartidos en 25 casas-canal del siglo XVII conectadas en el Prinsengracht. Gatos admitidos (pequeño suplemento), las habitaciones lado canal tienen mosquiteras, y el patio-jardín interior es un sitio tranquilo para 30 min de estimulación exterior con gato con arnés.`,
    hotelPt: `5 estrelas distribuídos por 25 casas-canal do século XVII conectadas no Prinsengracht. Gatos aceites (pequena taxa), os quartos lado canal têm redes mosquiteiras, e o pátio-jardim interior é um sítio calmo para 30 min de estimulação exterior com gato com peitoral.`,
    hotelDe: `5-Sterne-Hotel verteilt auf 25 verbundene Grachtenhäuser aus dem 17. Jahrhundert am Prinsengracht. Katzen willkommen (kleiner Aufpreis), die Zimmer zur Gracht haben Fenstergitter, und der Innenhof-Garten ist ein ruhiger Ort für 30 Minuten Außenreize mit angeleinter Katze.`,
    hotelNl: `5-sterrenhotel verspreid over 25 verbonden 17e-eeuwse grachtenpanden aan de Prinsengracht. Katten welkom (kleine toeslag), de kamers aan de gracht hebben horren, en de binnentuin is een rustige plek voor 30 minuten buitenprikkels met een aangelijnde kat.`,
    hotelIt: `5 stelle distribuito su 25 case di canale del XVII secolo collegate sul Prinsengracht. Gatti benvenuti (piccolo supplemento), le camere lato canale hanno zanzariere, e il cortile-giardino interno è un posto tranquillo per 30 minuti di stimolazione esterna con gatto al guinzaglio.`,
  },
  {
    slug: 'vienna',
    name: 'Vienna',
    country: 'Austria',
    destPath: '/destinations/vienna',
    whyEn: `Vienna's coffee-house culture is the most cat-tolerant in Europe: a calm cat in a soft carrier at your feet, ordering a melange, has been a Habsburg-era tradition since 1750. Most central hotels are quiet ground-floor heritage buildings with thick walls (low noise stress), and Wiener Linien public transport accepts cats in carriers free year-round. Cold winters mean an indoor-suited season for an indoor cat.`,
    whyFr: `La culture café viennoise est la plus tolérante envers les chats d'Europe : un chat calme dans un sac souple à vos pieds, commander un mélange, est une tradition habsbourgeoise depuis 1750. La plupart des hôtels centraux sont des bâtiments historiques au rez-de-chaussée avec murs épais (faible stress sonore), et les transports Wiener Linien acceptent les chats en sac gratuits toute l'année. Les hivers froids = saison idéale pour un chat d'intérieur.`,
    whyEs: `La cultura del café vienés es la más tolerante con gatos de Europa: un gato tranquilo en bolsa blanda a tus pies, pidiendo un melange, es tradición habsbúrgica desde 1750. La mayoría de hoteles centrales son edificios históricos de planta baja con muros gruesos (bajo estrés sonoro), y el transporte público Wiener Linien admite gatos en transportín gratis todo el año. Inviernos fríos = temporada ideal para gato de interior.`,
    whyPt: `A cultura do café vienense é a mais tolerante com gatos da Europa: um gato calmo num saco mole aos seus pés, a pedir um melange, é tradição habsbúrgica desde 1750. A maioria dos hotéis centrais são edifícios históricos no rés-do-chão com paredes espessas (baixo stress sonoro), e o transporte público Wiener Linien aceita gatos em sacos gratuitamente todo o ano. Invernos frios = época ideal para gato de interior.`,
    whyDe: `Die Wiener Kaffeehauskultur ist die katzentoleranteste Europas: eine ruhige Katze in einer weichen Transportbox zu Ihren Füßen, während Sie einen Melange bestellen, ist Habsburger Tradition seit 1750. Die meisten zentralen Hotels sind ruhige Altbauten im Erdgeschoss mit dicken Wänden (geringer Lärmstress), und die Wiener Linien nehmen Katzen in der Transportbox das ganze Jahr kostenlos mit. Kalte Winter bedeuten eine geeignete Saison für eine Wohnungskatze.`,
    whyNl: `De Weense koffiehuiscultuur is de meest katvriendelijke van Europa: een rustige kat in een zachte mand aan je voeten terwijl je een melange bestelt, is een traditie uit de Habsburgse tijd sinds 1750. De meeste centrale hotels zijn rustige historische panden op de begane grond met dikke muren (weinig geluidsstress), en het openbaar vervoer van Wiener Linien neemt het hele jaar door gratis katten in een mand mee. Koude winters zijn een goed seizoen voor een binnenkat.`,
    whyIt: `La cultura dei caffè viennesi è la più tollerante verso i gatti d'Europa: un gatto tranquillo in un trasportino morbido ai tuoi piedi mentre ordini un melange è tradizione asburgica dal 1750. La maggior parte degli hotel centrali sono tranquilli edifici storici al piano terra con muri spessi (poco stress da rumore), e i mezzi pubblici Wiener Linien accettano gatti nel trasportino gratis tutto l'anno. Gli inverni freddi sono una stagione ideale per un gatto d'appartamento.`,
    hotelName: 'Hotel Imperial, a Luxury Collection Hotel',
    hotelEn: `5-star Habsburg palace on the Ringstrasse. Cats welcomed in classic rooms (mid fee), in-room minibar can be replaced by a cat-stocked basket on request, and the lobby tolerates a carrier-bound cat while you check in.`,
    hotelFr: `Palace 5 étoiles habsbourgeois sur le Ringstrasse. Chats acceptés en chambres classiques (supplément modéré), le minibar de la chambre peut être remplacé par un panier de fournitures chat sur demande, et le lobby tolère un chat en sac pendant le check-in.`,
    hotelEs: `Palacio 5 estrellas habsbúrgico en la Ringstrasse. Gatos admitidos en habitaciones clásicas (suplemento moderado), el minibar de la habitación puede sustituirse por una cesta de suministros para gato a petición, y el lobby tolera un gato en transportín durante el check-in.`,
    hotelPt: `Palace 5 estrelas habsbúrgico na Ringstrasse. Gatos aceites em quartos clássicos (taxa moderada), o minibar do quarto pode ser substituído por um cesto de produtos para gato a pedido, e o lobby tolera um gato em transportadora durante o check-in.`,
    hotelDe: `5-Sterne-Habsburger-Palais an der Ringstraße. Katzen in klassischen Zimmern willkommen (mittlerer Aufpreis), die Minibar im Zimmer kann auf Anfrage durch einen Katzenkorb ersetzt werden, und die Lobby toleriert eine Katze in der Transportbox während des Check-ins.`,
    hotelNl: `5-sterren Habsburgs paleis aan de Ringstrasse. Katten welkom in klassieke kamers (gemiddelde toeslag), de minibar in de kamer kan op verzoek vervangen worden door een mand met kattenspullen, en de lobby staat een kat in een mand toe tijdens het inchecken.`,
    hotelIt: `Palazzo asburgico 5 stelle sulla Ringstrasse. Gatti benvenuti nelle camere classiche (supplemento moderato), il minibar in camera può essere sostituito su richiesta con un cestino di rifornimenti per gatti, e la hall tollera un gatto nel trasportino durante il check-in.`,
  },
  {
    slug: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    destPath: '/destinations/lisbon',
    whyEn: `Mild Atlantic climate year-round (rarely below 9°C or above 28°C) suits a cat that hates extremes. Lisbon hosts the Refúgio dos Gatos sanctuary in Belém, and the Alfama district has resident street-cat colonies fed by neighbours. Portuguese hotels are reliably cat-tolerant; the Carris Tram 28 is famously a cat-spotter's ride with cats lounging on Alfama windowsills.`,
    whyFr: `Climat atlantique doux toute l'année (rarement sous 9°C ou au-dessus de 28°C) convient à un chat qui déteste les extrêmes. Lisbonne accueille le sanctuaire Refúgio dos Gatos à Belém, et le quartier de l'Alfama a des colonies de chats de rue nourries par les voisins. Les hôtels portugais sont fiablement cat-tolerants ; le Tram Carris 28 est célèbre pour ses chats allongés sur les rebords de fenêtres de l'Alfama.`,
    whyEs: `Clima atlántico suave todo el año (raramente bajo 9°C o sobre 28°C) conviene a un gato que detesta los extremos. Lisboa acoge el santuario Refúgio dos Gatos en Belém, y el barrio de Alfama tiene colonias de gatos callejeros alimentadas por los vecinos. Los hoteles portugueses son fiablemente cat-tolerantes; el Tranvía Carris 28 es famoso por sus gatos tumbados en los alféizares de Alfama.`,
    whyPt: `Clima atlântico ameno todo o ano (raramente abaixo dos 9°C ou acima dos 28°C) convém a um gato que detesta extremos. Lisboa acolhe o santuário Refúgio dos Gatos em Belém, e o bairro de Alfama tem colónias de gatos de rua alimentadas pelos vizinhos. Os hotéis portugueses são fiavelmente cat-tolerantes; o Elétrico Carris 28 é famoso pelos seus gatos deitados nos parapeitos de Alfama.`,
    whyDe: `Mildes atlantisches Klima das ganze Jahr über (selten unter 9°C oder über 28°C) passt zu einer Katze, die Extreme hasst. Lissabon beherbergt das Katzenschutzgebiet Refúgio dos Gatos in Belém, und das Alfama-Viertel hat Straßenkatzen-Kolonien, die von Nachbarn gefüttert werden. Portugiesische Hotels sind zuverlässig katzentolerant; die Straßenbahn Carris 28 ist berühmt für Katzen, die auf den Fensterbänken der Alfama liegen.`,
    whyNl: `Mild Atlantisch klimaat het hele jaar door (zelden onder 9°C of boven 28°C) past bij een kat die extremen haat. Lissabon huisvest het opvangcentrum Refúgio dos Gatos in Belém, en de wijk Alfama heeft zwerfkattenkolonies die door buren worden gevoerd. Portugese hotels zijn betrouwbaar katvriendelijk; de tramlijn Carris 28 staat bekend als een echte kattenspotter, met katten die op de vensterbanken van Alfama liggen.`,
    whyIt: `Clima atlantico mite tutto l'anno (raramente sotto i 9°C o sopra i 28°C) adatto a un gatto che odia gli estremi. Lisbona ospita il santuario Refúgio dos Gatos a Belém, e il quartiere di Alfama ha colonie di gatti randagi nutrite dai vicini. Gli hotel portoghesi sono affidabilmente cat-tolerant; il tram Carris 28 è famoso per i gatti sdraiati sui davanzali di Alfama.`,
    hotelName: 'Memmo Alfama',
    hotelEn: `Boutique 5-star carved into a 17th-century convent in Alfama with rooftop pool views over the Tejo. Cats welcomed in classic rooms (small fee), the rooms have heavy shutters for darkness on demand, and the resident neighbourhood cats often visit the terrace boundary.`,
    hotelFr: `Boutique 5 étoiles dans un couvent du XVIIᵉ à Alfama avec piscine rooftop vue sur le Tage. Chats acceptés en chambres classiques (petit supplément), les chambres ont des volets épais pour obscurité à la demande, et les chats du quartier visitent souvent la limite de la terrasse.`,
    hotelEs: `Boutique 5 estrellas en un convento del siglo XVII en Alfama con piscina en azotea con vista al Tajo. Gatos admitidos en habitaciones clásicas (pequeño suplemento), las habitaciones tienen postigos gruesos para oscuridad a demanda, y los gatos del barrio visitan a menudo el borde de la terraza.`,
    hotelPt: `Boutique 5 estrelas num convento do século XVII em Alfama com piscina no terraço com vista para o Tejo. Gatos aceites em quartos clássicos (pequena taxa), os quartos têm portadas espessas para escuridão a pedido, e os gatos do bairro visitam frequentemente o limite do terraço.`,
    hotelDe: `Boutique-5-Sterne-Hotel in einem Kloster aus dem 17. Jahrhundert in Alfama mit Dachpool-Blick auf den Tejo. Katzen in klassischen Zimmern willkommen (kleiner Aufpreis), die Zimmer haben schwere Fensterläden für Dunkelheit auf Anfrage, und die Katzen der Nachbarschaft besuchen häufig die Terrassengrenze.`,
    hotelNl: `Boetiek 5-sterrenhotel in een 17e-eeuws klooster in Alfama met uitzicht op de Taag vanaf het dakzwembad. Katten welkom in klassieke kamers (kleine toeslag), de kamers hebben zware luiken voor duisternis op verzoek, en de buurtkatten komen vaak langs de rand van het terras.`,
    hotelIt: `Boutique 5 stelle ricavato in un convento del XVII secolo ad Alfama con piscina sul tetto vista Tago. Gatti benvenuti nelle camere classiche (piccolo supplemento), le camere hanno persiane pesanti per il buio su richiesta, e i gatti del quartiere visitano spesso il confine della terrazza.`,
  },
  {
    slug: 'innsbruck',
    name: 'Innsbruck',
    country: 'Austria',
    destPath: '/destinations/innsbruck',
    whyEn: `An off-piste pick for indoor cats who hate heat. Alpine cool July (avg high 23°C, nights 10°C) and Austrian hotel professionalism make Innsbruck the quiet alternative to Vienna for a 4-5 day cat trip. The old town is walkable in 20 min, hotel rooms are large by Austrian standards, and the surrounding Tirol nature is just a backdrop you appreciate from the window.`,
    whyFr: `Un pick hors-piste pour chats d'intérieur qui détestent la chaleur. Juillet alpin frais (max moyen 23°C, nuits 10°C) et le professionnalisme hôtelier autrichien font d'Innsbruck l'alternative calme à Vienne pour un séjour chat de 4-5 jours. La vieille ville se traverse en 20 min, les chambres sont grandes au standard autrichien, et la nature tyrolienne environnante est juste un décor que vous appréciez depuis la fenêtre.`,
    whyEs: `Una elección fuera de pista para gatos de interior que odian el calor. Julio alpino fresco (máx media 23°C, noches 10°C) y el profesionalismo hotelero austriaco hacen de Innsbruck la alternativa tranquila a Viena para una estancia gatuna de 4-5 días. El casco antiguo se atraviesa en 20 min, las habitaciones son grandes según el estándar austriaco, y la naturaleza tirolesa circundante es solo un decorado que aprecias desde la ventana.`,
    whyPt: `Uma escolha fora-de-pista para gatos de interior que odeiam o calor. Julho alpino fresco (máx média 23°C, noites 10°C) e o profissionalismo hoteleiro austríaco fazem de Innsbruck a alternativa calma a Viena para uma estadia felina de 4-5 dias. A cidade velha atravessa-se em 20 min, os quartos são grandes pelo padrão austríaco, e a natureza tirolesa circundante é apenas um cenário que aprecia da janela.`,
    whyDe: `Ein Geheimtipp für Wohnungskatzen, die Hitze hassen. Kühler Alpen-Juli (Durchschnittshoch 23°C, Nächte 10°C) und österreichische Hotelprofessionalität machen Innsbruck zur ruhigen Alternative zu Wien für eine 4-5-tägige Katzenreise. Die Altstadt ist in 20 Minuten zu Fuß durchquert, die Zimmer sind nach österreichischem Standard groß, und die umliegende Tiroler Natur ist nur eine Kulisse, die Sie vom Fenster aus genießen.`,
    whyNl: `Een verrassende keuze voor binnenkatten die hitte haten. Koele alpiene juli (gemiddeld hoog 23°C, nachten 10°C) en Oostenrijkse hotelprofessionaliteit maken Innsbruck het rustige alternatief voor Wenen voor een reis van 4-5 dagen met kat. De oude stad is in 20 minuten te belopen, hotelkamers zijn groot naar Oostenrijkse maatstaven, en de omliggende Tiroolse natuur is gewoon een decor dat je vanuit het raam bewondert.`,
    whyIt: `Una scelta fuori rotta per gatti d'appartamento che odiano il caldo. Il fresco luglio alpino (media massima 23°C, notti 10°C) e la professionalità alberghiera austriaca rendono Innsbruck l'alternativa tranquilla a Vienna per un viaggio con gatto di 4-5 giorni. Il centro storico si attraversa in 20 minuti, le camere sono grandi secondo gli standard austriaci, e la natura tirolese circostante è solo uno sfondo che apprezzi dalla finestra.`,
    hotelName: 'Hotel Maximilian',
    hotelEn: `Family-run boutique 4-star in the heart of the old town. Cats welcomed (small fee), rooms face the quiet Marktplatz courtyard, the family literally grew up with cats and the staff knows the routine - this matters more than any marble lobby for an anxious traveller.`,
    hotelFr: `Boutique 4 étoiles familial au cœur de la vieille ville. Chats acceptés (petit supplément), chambres côté Marktplatz calme, la famille a littéralement grandi avec des chats et le personnel connaît la routine - ce qui compte plus qu'un lobby en marbre pour un voyageur anxieux.`,
    hotelEs: `Boutique 4 estrellas familiar en el corazón del casco antiguo. Gatos admitidos (pequeño suplemento), habitaciones lado Marktplatz tranquilo, la familia creció literalmente con gatos y el personal conoce la rutina - importa más que cualquier lobby de mármol para un viajero ansioso.`,
    hotelPt: `Boutique 4 estrelas familiar no coração da cidade velha. Gatos aceites (pequena taxa), quartos lado Marktplatz calmo, a família cresceu literalmente com gatos e o staff conhece a rotina - importa mais que qualquer lobby de mármore para um viajante ansioso.`,
    hotelDe: `Familiengeführtes Boutique-4-Sterne-Hotel im Herzen der Altstadt. Katzen willkommen (kleiner Aufpreis), Zimmer zum ruhigen Marktplatz-Innenhof, die Familie ist buchstäblich mit Katzen aufgewachsen und das Personal kennt die Routine - das zählt für einen ängstlichen Reisenden mehr als jede Marmorlobby.`,
    hotelNl: `Familiehotel, boetiek 4-sterren in het hart van de oude stad. Katten welkom (kleine toeslag), kamers uitkijkend op de rustige binnenplaats aan de Marktplatz, het gezin is letterlijk opgegroeid met katten en het personeel kent de routine, dat telt voor een gestreste reiziger meer dan welke marmeren lobby dan ook.`,
    hotelIt: `Boutique 4 stelle a conduzione familiare nel cuore del centro storico. Gatti benvenuti (piccolo supplemento), camere lato Marktplatz tranquillo, la famiglia è letteralmente cresciuta con i gatti e lo staff conosce la routine, il che conta più di qualsiasi lobby in marmo per un viaggiatore ansioso.`,
  },
]

const COPY = {
  en: {
    eyebrow: 'CAT-FRIENDLY EUROPE · COMPLETE GUIDE',
    title: `Travel with Your Cat in Europe: The Complete Guide`,
    intro: `Travelling with a cat is not "the same as with a dog, just smaller". Cats are stress-driven, territory-driven, and their hotel needs are specific: window screens (the dreaded balcony jump), thick walls (sound isolation), no shared rooms with reactive dogs next door. This guide covers the EU pet passport for cats, IATA cabin carrier sizing, train policies per country, an anti-stress protocol that actually works (Feliway, 14-day pre-trip), and six European cities where the hotels we list are verified cat-friendly, not just "pet-friendly" with a polite footnote.`,
    pickHeading: 'The six cat-friendly cities',
    whyHere: 'Why here',
    hotelLabel: 'Where to stay',
    seeDestCta: 'Full city guide →',
    hotelCta: 'See availability →',
    practicalHeading: 'Cat travel essentials',
    practical: [
      { h: 'EU pet passport (cats too)', p: `Same paperwork as dogs: ISO microchip, valid rabies vaccination (3 weeks minimum before travel, valid 1-3 years depending on vaccine), EU pet passport from a vet. UK and Iceland additionally require an Animal Health Certificate (cats too) and Iceland also wants a rabies titre blood test. Cats CANNOT travel to Norway, Sweden, Finland or Malta without specific advance paperwork - check national agencies.` },
      { h: 'IATA cabin carrier (the right one)', p: `Most EU airlines accept cats up to 6-8 kg (carrier + cat) in cabin. Required: IATA-approved soft carrier, 46 cm L × 28 cm W × 23 cm H is the universal sizing that fits under all major European airline seats. Verified models: Trixie Wings, Sleepypod Air, Pet Magasin. Always buy a SECOND identical carrier - the cat has it for 2 weeks before the trip to associate it with safety, not stress.` },
      { h: 'The 14-day Feliway protocol', p: `Two weeks before travel, plug a Feliway Classic diffuser at home near the carrier (left open with a blanket inside). Day 1: carrier is treats-only. Day 7: short car rides with Feliway-sprayed cloth. Day 14: real trip. Effectiveness depends on the cat but for stress-sensitive cats this drops travel anxiety by 60-80% in observational studies. The Feliway Travel spray on the carrier 30 min before is the day-of layer.` },
      { h: 'Cat-friendly hotel checklist', p: `Email before booking. Ask explicitly: (1) window screens or non-openable windows in your room, (2) no balcony access from the room (or screened balcony), (3) room location away from elevator and ice machine, (4) housekeeping schedule on request (not surprise visits), (5) is there a resident hotel cat your cat might react to. The label "pet-friendly" often means "we accept small dogs" and the staff may have never hosted a cat. Verify.` },
    ],
    faqHeading: 'Frequently asked questions',
    faqs: [
      { q: 'Train: can I take a cat on French TGV, Italian Frecciarossa or German ICE?', a: `Yes, all three accept cats in a carrier (under 6-8 kg combined) for €7.10 (TGV), €5 (Frecciarossa, in the last carriage), free (ICE for cats in carrier). Eurostar (Paris-London) accepts assistance animals only - cats cannot go to the UK on Eurostar. Renfe (Spain) accepts cats in carrier up to 10 kg for €10. Always book the cat's space at the same time as the human ticket.` },
      { q: 'What about driving across borders?', a: `Inside the EU, the pet passport is enough at borders - no checks at most internal Schengen crossings (France-Spain, France-Italy, etc.). The cat must be in a carrier or restrained inside the car (loose cats are illegal in France, Germany, Italy, Spain). Stop every 3 hours, offer water (a Catit Pixi fountain in the carrier is a verified standard), and avoid direct sun. The carrier should be on the back seat with the seatbelt threaded through.` },
      { q: 'Will my cat be welcome at restaurant terraces?', a: `In Italy, Portugal, Spain, France: yes on terrace if quiet in a carrier or on a harness. In Germany, Austria, Switzerland: yes but ask the waiter first. In the UK, Ireland, Netherlands: more variable but quiet upscale cafes usually say yes. Indoor seating is almost always no anywhere for hygiene reasons. Cats almost never enjoy this experience the way dogs do; consider it a 30-min coffee, not a 2-hour dinner.` },
      { q: 'Emergency vet abroad with a cat?', a: `Same procedure as with a dog: most European countries have 24h emergency vet clinics in major cities, average cost €100-€250 plus treatment. Save the city's emergency vet phone in your phone BEFORE travel. The European Pet Passport includes a vet contact section - update it before the trip. Bring two weeks of your cat's regular food and any chronic medication in original packaging.` },
    ],
    relatedHeading: 'Related',
    accessoriesHeading: 'Cat travel essentials shop',
    accessoriesNote: `Our French-language cat accessories selection: carrier, water fountain, Feliway diffuser and refills, travel litter box.`,
    accessoriesCta: `See accessoires chat →`,
  },
  fr: {
    eyebrow: `CHAT-FRIENDLY EUROPE · GUIDE COMPLET`,
    title: `Voyager avec son chat en Europe : le guide complet`,
    intro: `Voyager avec un chat n'est pas "comme avec un chien, juste plus petit". Les chats sont stress-driven, territoriaux, et leurs besoins en hôtel sont spécifiques : moustiquaires (le redouté saut par le balcon), murs épais (isolation sonore), pas de chambre partagée avec des chiens réactifs à côté. Ce guide couvre le passeport UE pour chat, le sac cabine IATA, les politiques train par pays, un protocole anti-stress qui marche vraiment (Feliway, 14 jours avant), et six villes européennes où les hôtels listés sont vérifiés cat-friendly, pas juste "pet-friendly" avec un astérisque poli.`,
    pickHeading: 'Les six villes cat-friendly',
    whyHere: 'Pourquoi ici',
    hotelLabel: 'Où dormir',
    seeDestCta: 'Guide complet →',
    hotelCta: 'Voir les disponibilités →',
    practicalHeading: 'Les essentiels du voyage chat',
    practical: [
      { h: 'Passeport UE (chat aussi)', p: `Même paperasse que pour le chien : puce ISO, vaccin rage valide (3 semaines minimum avant voyage, valide 1-3 ans selon vaccin), passeport européen vétérinaire. Le UK et l'Islande demandent en plus un Animal Health Certificate (chat aussi) et l'Islande veut un titrage rage. Les chats NE peuvent PAS voyager en Norvège, Suède, Finlande ou Malte sans paperasse spécifique - vérifiez les agences nationales.` },
      { h: 'Sac cabine IATA (le bon)', p: `La plupart des compagnies UE acceptent les chats jusqu'à 6-8 kg (sac + chat) en cabine. Requis : sac souple IATA, 46 cm L × 28 cm l × 23 cm H est le format universel qui passe sous tous les sièges. Modèles vérifiés : Trixie Wings, Sleepypod Air, Pet Magasin. Achetez TOUJOURS un SECOND sac identique - le chat l'a 2 semaines avant le voyage pour l'associer à la sécurité, pas au stress.` },
      { h: 'Le protocole Feliway 14 jours', p: `Deux semaines avant le voyage, branchez un diffuseur Feliway Classic à la maison près du sac (ouvert, avec une couverture dedans). Jour 1 : le sac n'a que des friandises. Jour 7 : courts trajets voiture avec linge sprayé Feliway. Jour 14 : vrai voyage. Efficacité variable selon le chat mais pour les chats stress-sensibles ça baisse l'anxiété de voyage de 60-80% en études observationnelles. Le spray Feliway Travel sur le sac 30 min avant est la couche du jour J.` },
      { h: 'Checklist hôtel cat-friendly', p: `Email avant la réservation. Demandez explicitement : (1) moustiquaires ou fenêtres non ouvrables dans la chambre, (2) pas d'accès balcon (ou balcon filet), (3) chambre loin de l'ascenseur et de la machine à glaçons, (4) horaire ménage sur demande (pas de visites surprise), (5) y a-t-il un chat résident à l'hôtel auquel le vôtre pourrait réagir. Le label "pet-friendly" veut souvent dire "petits chiens acceptés" et l'équipe n'a peut-être jamais hébergé de chat. Vérifiez.` },
    ],
    faqHeading: 'Questions fréquentes',
    faqs: [
      { q: 'Train : puis-je prendre un chat en TGV, Frecciarossa ou ICE ?', a: `Oui, les trois acceptent les chats en sac (jusqu'à 6-8 kg combiné) pour 7,10 € (TGV), 5 € (Frecciarossa, dernière voiture), gratuit (ICE en sac). Eurostar (Paris-Londres) accepte les animaux d'assistance uniquement - les chats ne peuvent pas aller au UK en Eurostar. Renfe (Espagne) accepte les chats en sac jusqu'à 10 kg pour 10 €. Réservez toujours la place du chat en même temps que le billet humain.` },
      { q: 'Et la voiture transfrontalière ?', a: `Dans l'UE, le passeport européen suffit aux frontières - pas de contrôle aux passages Schengen internes (France-Espagne, France-Italie, etc.). Le chat doit être en sac ou attaché dans la voiture (chats en liberté illégaux en France, Allemagne, Italie, Espagne). Pause toutes les 3h, eau (une fontaine Catit Pixi dans le sac est une référence vérifiée), éviter le soleil direct. Le sac sur la banquette arrière avec ceinture passée à travers.` },
      { q: 'Mon chat sera-t-il bien accueilli en terrasse ?', a: `Italie, Portugal, Espagne, France : oui en terrasse si calme en sac ou harnais. Allemagne, Autriche, Suisse : oui mais demandez au serveur. UK, Irlande, Pays-Bas : plus variable mais les cafés haut de gamme calmes acceptent généralement. La salle c'est presque toujours non pour des raisons d'hygiène. Les chats n'apprécient quasi jamais cette expérience comme les chiens ; comptez un café de 30 min, pas un dîner de 2h.` },
      { q: `Véto d'urgence à l'étranger avec un chat ?`, a: `Même procédure que pour un chien : la plupart des pays européens ont des cliniques vétérinaires d'urgence 24h dans les grandes villes, coût moyen 100-250 € plus traitement. Enregistrez le téléphone véto d'urgence de la ville dans votre portable AVANT le départ. Le passeport européen a une section contacts véto - mettez-la à jour avant le voyage. Emportez 2 semaines de croquettes habituelles et tout médicament chronique dans l'emballage d'origine.` },
    ],
    relatedHeading: 'Liens utiles',
    accessoriesHeading: 'Boutique essentiels voyage chat',
    accessoriesNote: `Notre sélection FR d'accessoires chat : sac de transport, fontaine à eau, diffuseur Feliway et recharges, litière de voyage.`,
    accessoriesCta: `Voir les accessoires chat →`,
  },
  es: {
    eyebrow: `CAT-FRIENDLY EUROPA · GUÍA COMPLETA`,
    title: `Viajar con tu gato en Europa: la guía completa`,
    intro: `Viajar con un gato no es "como con un perro pero más pequeño". Los gatos son stress-driven, territoriales, y sus necesidades de hotel son específicas: mosquiteras (el temido salto por el balcón), muros gruesos (aislamiento sonoro), nada de habitación compartida con perros reactivos al lado. Esta guía cubre el pasaporte UE para gato, el transportín cabina IATA, políticas de tren por país, un protocolo anti-estrés que realmente funciona (Feliway, 14 días antes), y seis ciudades europeas donde los hoteles listados están verificados cat-friendly, no solo "pet-friendly" con un asterisco cortés.`,
    pickHeading: 'Las seis ciudades cat-friendly',
    whyHere: 'Por qué aquí',
    hotelLabel: 'Dónde alojarse',
    seeDestCta: 'Guía completa →',
    hotelCta: 'Ver disponibilidad →',
    practicalHeading: 'Esenciales del viaje gatuno',
    practical: [
      { h: 'Pasaporte UE (gato también)', p: `Misma papelería que perro: chip ISO, vacuna antirrábica válida (3 semanas mínimo antes de viajar, válida 1-3 años según vacuna), pasaporte europeo veterinario. Reino Unido e Islandia piden además un Animal Health Certificate (gato también) e Islandia quiere una titulación antirrábica. Los gatos NO pueden viajar a Noruega, Suecia, Finlandia o Malta sin papelería específica - consulta las agencias nacionales.` },
      { h: 'Transportín cabina IATA (el correcto)', p: `La mayoría de aerolíneas UE admiten gatos hasta 6-8 kg (transportín + gato) en cabina. Requerido: transportín blando IATA, 46 cm L × 28 cm A × 23 cm H es el tamaño universal que pasa bajo todos los asientos. Modelos verificados: Trixie Wings, Sleepypod Air, Pet Magasin. SIEMPRE compra un SEGUNDO transportín idéntico - el gato lo tiene 2 semanas antes del viaje para asociarlo con seguridad, no estrés.` },
      { h: 'Protocolo Feliway 14 días', p: `Dos semanas antes del viaje, enchufa un difusor Feliway Classic en casa cerca del transportín (abierto, con una manta dentro). Día 1: el transportín solo tiene golosinas. Día 7: trayectos cortos en coche con paño Feliway-sprayed. Día 14: viaje real. Eficacia variable según el gato pero para gatos sensibles al estrés baja la ansiedad de viaje 60-80% en estudios observacionales. El spray Feliway Travel sobre el transportín 30 min antes es la capa del día.` },
      { h: 'Checklist hotel cat-friendly', p: `Email antes de reservar. Pregunta explícitamente: (1) mosquiteras o ventanas no abribles en la habitación, (2) sin acceso a balcón (o balcón con red), (3) habitación lejos del ascensor y de la máquina de hielo, (4) horario limpieza a petición (no visitas sorpresa), (5) hay gato residente en el hotel al que el tuyo podría reaccionar. La etiqueta "pet-friendly" suele significar "perros pequeños admitidos" y el personal puede no haber alojado nunca un gato. Verifica.` },
    ],
    faqHeading: 'Preguntas frecuentes',
    faqs: [
      { q: 'Tren: ¿puedo llevar un gato en TGV, Frecciarossa o ICE?', a: `Sí, los tres admiten gatos en transportín (hasta 6-8 kg combinado) por 7,10 € (TGV), 5 € (Frecciarossa, último vagón), gratis (ICE en transportín). Eurostar (París-Londres) admite solo animales de asistencia - los gatos no pueden ir al Reino Unido en Eurostar. Renfe (España) admite gatos en transportín hasta 10 kg por 10 €. Reserva siempre la plaza del gato al mismo tiempo que el billete humano.` },
      { q: '¿Y conducir transfronterizo?', a: `Dentro de la UE, el pasaporte europeo basta en fronteras - sin control en pasos Schengen internos (Francia-España, Francia-Italia, etc.). El gato debe ir en transportín o sujeto en el coche (gatos sueltos ilegales en Francia, Alemania, Italia, España). Pausa cada 3 h, agua (una fuente Catit Pixi en el transportín es referencia verificada), evitar sol directo. El transportín en el asiento trasero con cinturón pasado por dentro.` },
      { q: '¿Mi gato será bienvenido en terrazas de restaurante?', a: `Italia, Portugal, España, Francia: sí en terraza si tranquilo en transportín o arnés. Alemania, Austria, Suiza: sí pero pregunta al camarero. Reino Unido, Irlanda, Países Bajos: más variable pero cafeterías tranquilas de alta gama suelen aceptar. La sala casi siempre es no por higiene. Los gatos casi nunca disfrutan esta experiencia como los perros; cuenta un café de 30 min, no una cena de 2 h.` },
      { q: '¿Veterinario de urgencia con un gato en el extranjero?', a: `Misma procedura que con perro: la mayoría de países europeos tienen clínicas de urgencia 24h en grandes ciudades, coste medio 100-250 € más tratamiento. Guarda el teléfono veterinario de urgencia de la ciudad en el móvil ANTES del viaje. El pasaporte europeo tiene una sección contactos veterinarios - actualízala antes del viaje. Lleva 2 semanas de pienso habitual y cualquier medicación crónica en el envase original.` },
    ],
    relatedHeading: 'Enlaces útiles',
    accessoriesHeading: 'Tienda esenciales viaje gato',
    accessoriesNote: `Nuestra selección FR de accesorios gato: transportín, fuente, difusor Feliway y recargas, arenero de viaje.`,
    accessoriesCta: `Ver accessoires chat →`,
  },
  pt: {
    eyebrow: `CAT-FRIENDLY EUROPA · GUIA COMPLETO`,
    title: `Viajar com o seu gato na Europa: o guia completo`,
    intro: `Viajar com um gato não é "como com um cão, só mais pequeno". Os gatos são stress-driven, territoriais, e as suas necessidades de hotel são específicas: redes mosquiteiras (o temido salto pela varanda), paredes espessas (isolamento sonoro), sem quarto partilhado com cães reativos ao lado. Este guia cobre o passaporte UE para gato, a transportadora cabine IATA, políticas de comboio por país, um protocolo anti-stress que realmente funciona (Feliway, 14 dias antes), e seis cidades europeias onde os hotéis listados estão verificados cat-friendly, não apenas "pet-friendly" com um asterisco delicado.`,
    pickHeading: 'As seis cidades cat-friendly',
    whyHere: 'Porquê aqui',
    hotelLabel: 'Onde ficar',
    seeDestCta: 'Guia completo →',
    hotelCta: 'Ver disponibilidade →',
    practicalHeading: 'Essenciais da viagem felina',
    practical: [
      { h: 'Passaporte UE (gato também)', p: `Mesma papelada que cão: chip ISO, vacina antirrábica válida (3 semanas mínimo antes de viajar, válida 1-3 anos conforme vacina), passaporte europeu veterinário. O Reino Unido e a Islândia exigem além disso um Animal Health Certificate (gato também) e a Islândia quer uma titulação antirrábica. Os gatos NÃO podem viajar para Noruega, Suécia, Finlândia ou Malta sem papelada específica - consulte as agências nacionais.` },
      { h: 'Transportadora cabine IATA (a certa)', p: `A maioria das companhias UE aceita gatos até 6-8 kg (transportadora + gato) em cabine. Requerido: transportadora mole IATA, 46 cm L × 28 cm A × 23 cm A é o tamanho universal que passa sob todos os assentos. Modelos verificados: Trixie Wings, Sleepypod Air, Pet Magasin. SEMPRE compre uma SEGUNDA transportadora idêntica - o gato tem-na 2 semanas antes da viagem para a associar a segurança, não a stress.` },
      { h: 'Protocolo Feliway 14 dias', p: `Duas semanas antes da viagem, ligue um difusor Feliway Classic em casa perto da transportadora (aberta, com uma manta dentro). Dia 1: a transportadora só tem guloseimas. Dia 7: trajetos curtos de carro com pano com Feliway. Dia 14: viagem real. Eficácia variável conforme o gato mas para gatos sensíveis ao stress baixa a ansiedade de viagem 60-80% em estudos observacionais. O spray Feliway Travel na transportadora 30 min antes é a camada do dia.` },
      { h: 'Checklist hotel cat-friendly', p: `Email antes de reservar. Pergunte explicitamente: (1) redes mosquiteiras ou janelas não-abríveis no quarto, (2) sem acesso a varanda (ou varanda com rede), (3) quarto longe do elevador e da máquina de gelo, (4) horário de limpeza a pedido (não visitas-surpresa), (5) há gato residente no hotel ao qual o seu pode reagir. O rótulo "pet-friendly" costuma significar "cães pequenos aceites" e o staff pode nunca ter alojado um gato. Verifique.` },
    ],
    faqHeading: 'Perguntas frequentes',
    faqs: [
      { q: 'Comboio: posso levar gato em TGV, Frecciarossa ou ICE?', a: `Sim, os três aceitam gatos em transportadora (até 6-8 kg combinado) por 7,10 € (TGV), 5 € (Frecciarossa, última carruagem), gratuito (ICE em transportadora). Eurostar (Paris-Londres) aceita só animais de assistência - os gatos não podem ir para o Reino Unido em Eurostar. Renfe (Espanha) aceita gatos em transportadora até 10 kg por 10 €. Reserve sempre o lugar do gato ao mesmo tempo que o bilhete humano.` },
      { q: 'E conduzir transfronteiriço?', a: `Dentro da UE, o passaporte europeu basta nas fronteiras - sem controlo em travessias Schengen internas (França-Espanha, França-Itália, etc.). O gato deve estar em transportadora ou preso no carro (gatos soltos ilegais em França, Alemanha, Itália, Espanha). Pausa de 3 em 3 h, água (uma fonte Catit Pixi na transportadora é referência verificada), evitar sol direto. A transportadora no banco de trás com cinto a passar por dentro.` },
      { q: 'O meu gato será bem-vindo em esplanadas de restaurante?', a: `Itália, Portugal, Espanha, França: sim em esplanada se calmo em transportadora ou peitoral. Alemanha, Áustria, Suíça: sim mas pergunte ao empregado. Reino Unido, Irlanda, Países Baixos: mais variável mas cafés calmos de gama alta costumam aceitar. A sala é quase sempre não por higiene. Os gatos quase nunca apreciam esta experiência como os cães; conte um café de 30 min, não um jantar de 2 h.` },
      { q: 'Veterinário de urgência com gato no estrangeiro?', a: `Mesma procedura que com cão: a maioria dos países europeus tem clínicas veterinárias de urgência 24h em grandes cidades, custo médio 100-250 € mais tratamento. Guarde o telefone veterinário de urgência da cidade no telemóvel ANTES da viagem. O passaporte europeu tem uma secção contactos veterinários - actualize-a antes da viagem. Leve 2 semanas de ração habitual e qualquer medicação crónica na embalagem original.` },
    ],
    relatedHeading: 'Ligações úteis',
    accessoriesHeading: 'Loja essenciais viagem gato',
    accessoriesNote: `A nossa seleção FR de acessórios gato: transportadora, fonte, difusor Feliway e recargas, caixa de areia de viagem.`,
    accessoriesCta: `Ver acessórios gato →`,
  },
  de: {
    eyebrow: `KATZENFREUNDLICHES EUROPA · KOMPLETTER RATGEBER`,
    title: `Mit der Katze durch Europa reisen: der komplette Ratgeber`,
    intro: `Mit einer Katze zu reisen ist nicht "wie mit einem Hund, nur kleiner". Katzen sind stressgetrieben, revierbezogen, und ihre Ansprüche ans Hotel sind spezifisch: Fenstergitter (der gefürchtete Sprung vom Balkon), dicke Wände (Schallisolierung), kein geteiltes Zimmer mit einem reaktiven Hund nebenan. Dieser Ratgeber behandelt den EU-Heimtierausweis für Katzen, die richtige Größe der IATA-Kabinentransportbox, Zugrichtlinien je Land, ein Anti-Stress-Protokoll, das wirklich funktioniert (Feliway, 14 Tage vor der Reise), und sechs europäische Städte, deren gelistete Hotels verifiziert katzenfreundlich sind, nicht nur "haustierfreundlich" mit einer höflichen Fußnote.`,
    pickHeading: 'Die sechs katzenfreundlichen Städte',
    whyHere: 'Warum hier',
    hotelLabel: 'Wo übernachten',
    seeDestCta: 'Vollständiger Stadtführer →',
    hotelCta: 'Verfügbarkeit ansehen →',
    practicalHeading: 'Das Wichtigste für Katzenreisen',
    practical: [
      { h: 'EU-Heimtierausweis (auch für Katzen)', p: `Gleiche Unterlagen wie bei Hunden: ISO-Mikrochip, gültige Tollwutimpfung (mindestens 3 Wochen vor der Reise, gültig 1-3 Jahre je nach Impfstoff), EU-Heimtierausweis vom Tierarzt. Großbritannien und Island verlangen zusätzlich eine Animal Health Certificate (auch für Katzen), und Island will zudem einen Tollwut-Titertest. Katzen KÖNNEN NICHT ohne spezifische Vorab-Unterlagen nach Norwegen, Schweden, Finnland oder Malta reisen - prüfen Sie die nationalen Behörden.` },
      { h: 'IATA-Kabinentransportbox (die richtige)', p: `Die meisten EU-Fluggesellschaften akzeptieren Katzen bis 6-8 kg (Transportbox + Katze) in der Kabine. Erforderlich: IATA-zugelassene weiche Transportbox, 46 cm L × 28 cm B × 23 cm H ist die universelle Größe, die unter alle wichtigen europäischen Fluggesellschaftssitze passt. Verifizierte Modelle: Trixie Wings, Sleepypod Air, Pet Magasin. Kaufen Sie IMMER eine ZWEITE identische Transportbox - die Katze hat sie 2 Wochen vor der Reise, um sie mit Sicherheit statt Stress zu verbinden.` },
      { h: 'Das 14-Tage-Feliway-Protokoll', p: `Zwei Wochen vor der Reise stecken Sie zu Hause in der Nähe der Transportbox einen Feliway-Classic-Diffusor ein (Box offen, mit einer Decke darin). Tag 1: Die Transportbox gibt es nur mit Leckerlis. Tag 7: kurze Autofahrten mit Feliway-besprühtem Tuch. Tag 14: die echte Reise. Die Wirksamkeit hängt von der Katze ab, aber bei stressanfälligen Katzen senkt dies laut Beobachtungsstudien die Reiseangst um 60-80%. Das Feliway-Travel-Spray auf der Transportbox 30 Minuten vorher ist die Schicht für den Reisetag.` },
      { h: 'Checkliste für katzenfreundliche Hotels', p: `Vor der Buchung eine E-Mail schreiben. Fragen Sie ausdrücklich: (1) Fenstergitter oder nicht zu öffnende Fenster im Zimmer, (2) kein Balkonzugang vom Zimmer aus (oder Balkon mit Netz), (3) Zimmerlage abseits von Aufzug und Eismaschine, (4) Reinigungsplan auf Anfrage (keine Überraschungsbesuche), (5) gibt es eine hoteleigene Katze, auf die Ihre Katze reagieren könnte. Das Label "haustierfreundlich" bedeutet oft "kleine Hunde willkommen", und das Personal hat womöglich noch nie eine Katze beherbergt. Prüfen Sie es.` },
    ],
    faqHeading: 'Häufig gestellte Fragen',
    faqs: [
      { q: 'Zug: Kann ich eine Katze im französischen TGV, italienischen Frecciarossa oder deutschen ICE mitnehmen?', a: `Ja, alle drei akzeptieren Katzen in einer Transportbox (unter 6-8 kg kombiniert) für 7,10 € (TGV), 5 € (Frecciarossa, im letzten Wagen), kostenlos (ICE für Katzen in der Transportbox). Der Eurostar (Paris-London) akzeptiert nur Assistenztiere - Katzen können nicht mit dem Eurostar nach Großbritannien reisen. Renfe (Spanien) akzeptiert Katzen in der Transportbox bis 10 kg für 10 €. Buchen Sie den Platz für die Katze immer zusammen mit dem Ticket für den Menschen.` },
      { q: 'Und was ist mit der Fahrt über Grenzen?', a: `Innerhalb der EU reicht der Heimtierausweis an den Grenzen aus - keine Kontrollen an den meisten innereuropäischen Schengen-Übergängen (Frankreich-Spanien, Frankreich-Italien usw.). Die Katze muss im Auto in einer Transportbox oder gesichert sein (freilaufende Katzen sind in Frankreich, Deutschland, Italien und Spanien nicht erlaubt). Alle 3 Stunden anhalten, Wasser anbieten (ein Catit-Pixi-Brunnen in der Transportbox ist ein verifizierter Standard), direkte Sonne vermeiden. Die Transportbox sollte auf der Rückbank stehen, mit dem Sicherheitsgurt hindurchgeführt.` },
      { q: 'Wird meine Katze auf Restaurantterrassen willkommen sein?', a: `In Italien, Portugal, Spanien, Frankreich: ja auf der Terrasse, wenn ruhig in der Transportbox oder am Geschirr. In Deutschland, Österreich, der Schweiz: ja, aber fragen Sie vorher das Personal. In Großbritannien, Irland, den Niederlanden: variabler, aber ruhige gehobene Cafés sagen meist ja. Der Innenbereich ist aus Hygienegründen fast überall tabu. Katzen genießen dieses Erlebnis fast nie so wie Hunde; planen Sie es als 30-minütigen Kaffee ein, nicht als 2-stündiges Abendessen.` },
      { q: 'Notfall-Tierarzt im Ausland mit einer Katze?', a: `Gleiches Vorgehen wie bei einem Hund: die meisten europäischen Länder haben 24-Stunden-Notfall-Tierarztkliniken in Großstädten, Durchschnittskosten 100-250 € zuzüglich Behandlung. Speichern Sie die Notfall-Tierarztnummer der Stadt VOR der Reise in Ihrem Handy. Der europäische Heimtierausweis enthält einen Tierarzt-Kontaktabschnitt - aktualisieren Sie ihn vor der Reise. Bringen Sie zwei Wochen des gewohnten Futters Ihrer Katze und jedes chronische Medikament in der Originalverpackung mit.` },
    ],
    relatedHeading: 'Nützliche Links',
    accessoriesHeading: 'Shop für Katzenreise-Essentials',
    accessoriesNote: `Unsere französischsprachige Auswahl an Katzenzubehör: Transportbox, Trinkbrunnen, Feliway-Diffusor und Nachfüllpackungen, Reise-Katzentoilette.`,
    accessoriesCta: `Katzenzubehör ansehen →`,
  },
  nl: {
    eyebrow: `KATVRIENDELIJK EUROPA · COMPLETE GIDS`,
    title: `Reizen met je kat door Europa: de complete gids`,
    intro: `Reizen met een kat is niet "hetzelfde als met een hond, maar dan kleiner". Katten zijn stressgevoelig, territoriaal, en hun eisen aan een hotel zijn specifiek: horren voor de ramen (de gevreesde sprong van het balkon), dikke muren (geluidsisolatie), geen gedeelde kamer met een reactieve hond ernaast. Deze gids behandelt het EU-dierenpaspoort voor katten, de juiste maat kattenmand voor de cabine (IATA), treinregels per land, een anti-stressprotocol dat echt werkt (Feliway, 14 dagen van tevoren), en zes Europese steden waar de hotels die we noemen geverifieerd katvriendelijk zijn, niet zomaar "huisdiervriendelijk" met een beleefde voetnoot.`,
    pickHeading: 'De zes katvriendelijke steden',
    whyHere: 'Waarom hier',
    hotelLabel: 'Waar je kunt overnachten',
    seeDestCta: 'Volledige stadsgids →',
    hotelCta: 'Bekijk beschikbaarheid →',
    practicalHeading: 'Onmisbaar voor reizen met kat',
    practical: [
      { h: 'EU-dierenpaspoort (ook voor katten)', p: `Dezelfde papieren als voor honden: ISO-chip, geldige rabiësvaccinatie (minimaal 3 weken voor vertrek, geldig 1-3 jaar afhankelijk van het vaccin), EU-dierenpaspoort van de dierenarts. Het VK en IJsland vragen daarnaast een Animal Health Certificate (ook voor katten), en IJsland wil ook een rabiës-titerbepaling. Katten KUNNEN NIET zonder specifieke papieren vooraf naar Noorwegen, Zweden, Finland of Malta reizen, check de nationale instanties.` },
      { h: 'De juiste kattenmand voor de cabine (IATA)', p: `De meeste EU-luchtvaartmaatschappijen accepteren katten tot 6-8 kg (mand + kat) in de cabine. Vereist: door IATA goedgekeurde zachte mand, 46 cm L × 28 cm B × 23 cm H is de universele maat die onder alle stoelen van grote Europese maatschappijen past. Geverifieerde modellen: Trixie Wings, Sleepypod Air, Pet Magasin. Koop altijd een TWEEDE identieke mand, je kat heeft die 2 weken voor de reis om hem met veiligheid te associëren, niet met stress.` },
      { h: 'Het 14-dagen-Feliwayprotocol', p: `Twee weken voor vertrek zet je thuis een Feliway Classic-verdamper bij de mand (open, met een dekentje erin). Dag 1: de mand is alleen maar snoepjes. Dag 7: korte ritjes met de auto met een doekje besprenkeld met Feliway. Dag 14: de echte reis. Het effect verschilt per kat, maar bij stressgevoelige katten daalt de reisangst volgens observationele studies met 60-80%. De Feliway Travel-spray op de mand 30 minuten van tevoren is de laag voor de dag zelf.` },
      { h: 'Checklist katvriendelijk hotel', p: `Mail voor je boekt. Vraag expliciet naar: (1) horren of niet-openbare ramen in je kamer, (2) geen toegang tot een balkon vanuit de kamer (of een balkon met net), (3) kamer uit de buurt van de lift en de ijsmachine, (4) schoonmaakschema op verzoek (geen verrassingsbezoeken), (5) is er een hotelkat aanwezig waar jouw kat op zou kunnen reageren. Het label "huisdiervriendelijk" betekent vaak "kleine honden toegestaan" en het personeel heeft misschien nog nooit een kat gehad. Check het.` },
    ],
    faqHeading: 'Veelgestelde vragen',
    faqs: [
      { q: 'Trein: kan ik mijn kat meenemen in de Franse TGV, Italiaanse Frecciarossa of Duitse ICE?', a: `Ja, alle drie accepteren katten in een mand (samen onder 6-8 kg) voor €7,10 (TGV), €5 (Frecciarossa, in het laatste rijtuig), gratis (ICE voor katten in mand). Eurostar (Parijs-Londen) accepteert alleen hulphonden, katten kunnen niet met de Eurostar naar het VK. Renfe (Spanje) accepteert katten in mand tot 10 kg voor €10. Boek de plek voor je kat altijd tegelijk met je eigen ticket.` },
      { q: 'En hoe zit het met grensoverschrijdend rijden?', a: `Binnen de EU volstaat het dierenpaspoort aan de grens, geen controles bij de meeste interne Schengen-overgangen (Frankrijk-Spanje, Frankrijk-Italië, enzovoort). Je kat moet in de auto in een mand zitten of vastzitten (loslopende katten zijn illegaal in Frankrijk, Duitsland, Italië, Spanje). Stop elke 3 uur, bied water aan (een Catit Pixi-fontein in de mand is een geverifieerde standaard), en vermijd direct zonlicht. Zet de mand op de achterbank met de gordel erdoorheen.` },
      { q: 'Is mijn kat welkom op restaurantterrassen?', a: `In Italië, Portugal, Spanje, Frankrijk: ja op het terras, als hij rustig in een mand of tuigje zit. In Duitsland, Oostenrijk, Zwitserland: ja, maar vraag eerst het personeel. In het VK, Ierland, Nederland: wisselender, maar rustige, chique cafés zeggen meestal ja. Binnen zitten mag bijna nergens vanwege hygiëne. Katten genieten hier bijna nooit zo van als honden; reken op 30 minuten koffie, geen diner van 2 uur.` },
      { q: 'Spoedeisende dierenarts in het buitenland met een kat?', a: `Dezelfde procedure als bij een hond: de meeste Europese landen hebben 24-uursklinieken in grote steden, gemiddelde kosten €100-€250 plus behandeling. Sla het spoednummer van de dierenarts in de stad VOOR vertrek op in je telefoon. Het Europese dierenpaspoort heeft een sectie voor dierenartscontact, werk die bij voor de reis. Neem twee weken vast voer van je kat mee en eventuele chronische medicatie in de originele verpakking.` },
    ],
    relatedHeading: 'Nuttige links',
    accessoriesHeading: 'Shop met kattenreisbenodigdheden',
    accessoriesNote: `Onze Franse selectie kattenaccessoires: draagmand, drinkfontein, Feliway-verdamper en navullingen, reiskattenbak.`,
    accessoriesCta: `Bekijk kattenaccessoires →`,
  },
  it: {
    eyebrow: `CAT-FRIENDLY EUROPA · GUIDA COMPLETA`,
    title: `Viaggiare con il tuo gatto in Europa: la guida completa`,
    intro: `Viaggiare con un gatto non è "come con un cane, solo più piccolo". I gatti sono stress-driven, territoriali, e le loro esigenze d'hotel sono specifiche: zanzariere (il temuto salto dal balcone), muri spessi (isolamento acustico), niente camera condivisa con cani reattivi accanto. Questa guida copre il passaporto UE per gatti, il trasportino cabina IATA giusto, le regole treno per paese, un protocollo anti-stress che funziona davvero (Feliway, 14 giorni prima), e sei città europee dove gli hotel elencati sono verificati cat-friendly, non solo "pet-friendly" con una nota a piè di pagina cortese.`,
    pickHeading: 'Le sei città cat-friendly',
    whyHere: 'Perché qui',
    hotelLabel: 'Dove alloggiare',
    seeDestCta: 'Guida completa della città →',
    hotelCta: 'Vedi disponibilità →',
    practicalHeading: 'Essenziali per viaggiare con il gatto',
    practical: [
      { h: 'Passaporto UE (anche per i gatti)', p: `Stessa documentazione dei cani: microchip ISO, vaccinazione antirabbica valida (minimo 3 settimane prima del viaggio, valida 1-3 anni a seconda del vaccino), passaporto UE per animali rilasciato dal veterinario. Regno Unito e Islanda richiedono inoltre un Animal Health Certificate (anche per i gatti) e l'Islanda vuole anche un test del titolo anticorpale antirabbico. I gatti NON possono viaggiare in Norvegia, Svezia, Finlandia o Malta senza documentazione specifica anticipata - controlla le agenzie nazionali.` },
      { h: 'Trasportino cabina IATA (quello giusto)', p: `La maggior parte delle compagnie aeree UE accetta gatti fino a 6-8 kg (trasportino + gatto) in cabina. Richiesto: trasportino morbido omologato IATA, 46 cm L × 28 cm P × 23 cm H è la misura universale che entra sotto tutti i sedili delle principali compagnie europee. Modelli verificati: Trixie Wings, Sleepypod Air, Pet Magasin. Compra sempre un SECONDO trasportino identico - il gatto lo ha per 2 settimane prima del viaggio per associarlo alla sicurezza, non allo stress.` },
      { h: 'Il protocollo Feliway di 14 giorni', p: `Due settimane prima del viaggio, attacca un diffusore Feliway Classic a casa vicino al trasportino (lasciato aperto con una copertina dentro). Giorno 1: il trasportino è solo premi. Giorno 7: brevi tragitti in auto con un panno spruzzato di Feliway. Giorno 14: il viaggio vero. L'efficacia dipende dal gatto ma nei gatti sensibili allo stress questo riduce l'ansia da viaggio del 60-80% negli studi osservazionali. Lo spray Feliway Travel sul trasportino 30 minuti prima è lo strato del giorno stesso.` },
      { h: 'Checklist hotel cat-friendly', p: `Scrivi un'email prima di prenotare. Chiedi esplicitamente: (1) zanzariere o finestre non apribili nella tua camera, (2) nessun accesso al balcone dalla camera (o balcone con rete), (3) camera lontana dall'ascensore e dalla macchina del ghiaccio, (4) orario delle pulizie su richiesta (niente visite a sorpresa), (5) c'è un gatto residente in hotel a cui il tuo potrebbe reagire. L'etichetta "pet-friendly" spesso significa "accettiamo cani piccoli" e lo staff potrebbe non aver mai ospitato un gatto. Verifica.` },
    ],
    faqHeading: 'Domande frequenti',
    faqs: [
      { q: 'Treno: posso portare un gatto sul TGV francese, sul Frecciarossa o sull\'ICE tedesco?', a: `Sì, tutti e tre accettano gatti in trasportino (sotto 6-8 kg combinati) per 7,10 € (TGV), 5 € (Frecciarossa, nell'ultima carrozza), gratis (ICE per gatti in trasportino). L'Eurostar (Parigi-Londra) accetta solo animali di assistenza - i gatti non possono andare nel Regno Unito con l'Eurostar. Renfe (Spagna) accetta gatti in trasportino fino a 10 kg per 10 €. Prenota sempre il posto del gatto insieme al biglietto umano.` },
      { q: 'E guidare attraverso i confini?', a: `All'interno dell'UE, il passaporto per animali basta ai confini - nessun controllo alla maggior parte dei passaggi Schengen interni (Francia-Spagna, Francia-Italia, ecc.). Il gatto deve stare in un trasportino o essere assicurato in auto (i gatti liberi sono illegali in Francia, Germania, Italia, Spagna). Fermati ogni 3 ore, offri acqua (una fontanella Catit Pixi nel trasportino è uno standard verificato), evita il sole diretto. Il trasportino va sul sedile posteriore con la cintura infilata attraverso.` },
      { q: 'Il mio gatto sarà benvenuto nei dehors dei ristoranti?', a: `In Italia, Portogallo, Spagna, Francia: sì all'aperto se tranquillo in trasportino o pettorina. In Germania, Austria, Svizzera: sì ma chiedi prima al cameriere. Nel Regno Unito, Irlanda, Paesi Bassi: più variabile ma i caffè tranquilli di fascia alta di solito dicono sì. All'interno è quasi sempre vietato ovunque per motivi igienici. I gatti quasi mai apprezzano questa esperienza come i cani; considerala un caffè di 30 minuti, non una cena di 2 ore.` },
      { q: 'Veterinario d\'emergenza all\'estero con un gatto?', a: `Stessa procedura di un cane: la maggior parte dei paesi europei ha cliniche veterinarie d'emergenza 24h nelle grandi città, costo medio 100-250 € più trattamento. Salva il numero del veterinario d'emergenza della città sul telefono PRIMA del viaggio. Il passaporto europeo per animali include una sezione contatto veterinario - aggiornala prima del viaggio. Porta due settimane del cibo abituale del tuo gatto e ogni farmaco cronico nella confezione originale.` },
    ],
    relatedHeading: 'Link utili',
    accessoriesHeading: 'Negozio essenziali viaggio gatto',
    accessoriesNote: `La nostra selezione FR di accessori per gatti: trasportino, fontanella, diffusore Feliway e ricariche, lettiera da viaggio.`,
    accessoriesCta: `Vedi gli accessori per gatti →`,
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

  const pickWhy = (p: Pick) => locale === 'fr' ? p.whyFr : locale === 'es' ? p.whyEs : locale === 'pt' ? p.whyPt : locale === 'de' ? (p.whyDe ?? p.whyEn) : locale === 'nl' ? (p.whyNl ?? p.whyEn) : locale === 'it' ? (p.whyIt ?? p.whyEn) : p.whyEn
  const pickHotel = (p: Pick) => locale === 'fr' ? p.hotelFr : locale === 'es' ? p.hotelEs : locale === 'pt' ? p.hotelPt : locale === 'de' ? (p.hotelDe ?? p.hotelEn) : locale === 'nl' ? (p.hotelNl ?? p.hotelEn) : locale === 'it' ? (p.hotelIt ?? p.hotelEn) : p.hotelEn

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-fuchsia-700 via-violet-700 to-indigo-800 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 40%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-xs font-semibold uppercase tracking-widest text-fuchsia-100 mb-3">🐈 {t.eyebrow}</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{t.title}</h1>
          <p className="text-lg sm:text-xl text-violet-50 leading-relaxed">{t.intro}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">📝 {t.practicalHeading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {t.practical.map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-stone-200">
              <h3 className="font-bold text-stone-900 mb-2">{p.h}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{p.p}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-8">{t.pickHeading}</h2>
        <div className="space-y-5">
          {PICKS.map((p, i) => (
            <article key={p.slug} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <header className="px-5 sm:px-7 py-4 bg-gradient-to-r from-fuchsia-50 to-violet-50 border-b border-stone-200 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-2xl font-black text-fuchsia-700">#{i + 1}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  <Link href={`/${locale}${p.destPath}`} className="hover:text-fuchsia-700">{p.name}</Link>
                </h3>
                <span className="text-sm text-stone-600">{p.country}</span>
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
                  <Link href={`/${locale}${p.destPath}`} className="text-sm font-semibold text-fuchsia-700 hover:text-fuchsia-900 hover:underline">
                    {t.seeDestCta}
                  </Link>
                  <a
                    href={buildAllezDestLink(p.name, p.country, `${CAMPAIGN_BASE}-${p.slug}`, 3)}
                    target="_blank"
                    rel="noopener sponsored"
                    className="text-sm font-semibold text-stone-700 hover:text-fuchsia-700 hover:underline"
                  >
                    {t.hotelCta}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Maillage Amazon FR accessoires-chat */}
      {locale === 'fr' && (
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <div className="bg-fuchsia-50 border border-fuchsia-200 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2">🛍️ {t.accessoriesHeading}</h2>
            <p className="text-stone-700 leading-relaxed mb-4">{t.accessoriesNote}</p>
            <Link
              href="/fr/accessoires-chat"
              className="inline-block bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold text-sm px-5 py-2.5 rounded-full transition-colors shadow-sm"
            >
              {t.accessoriesCta}
            </Link>
          </div>
        </section>
      )}

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
        href={buildAllezDestLink('Europe', 'Europe', `${CAMPAIGN_BASE}-sticky`, 3)}
      />
    </main>
  )
}
