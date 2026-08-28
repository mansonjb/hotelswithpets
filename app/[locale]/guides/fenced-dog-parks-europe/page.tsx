import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { hasLocale } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, STAY22_AID } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'
import { getLocalizedCityName } from '@/lib/cityNames'
import { getLocalizedCountryName } from '@/lib/countries'
import destinations from '@/data/destinations.json'
import NearbyHotelCard from '@/components/NearbyHotelCard'
import StickyHotelCTA from '@/components/StickyHotelCTA'

const SLUG = 'fenced-dog-parks-europe'

type Locale = 'en' | 'fr' | 'es' | 'pt' | 'de' | 'nl' | 'it'

type Park = {
  citySlug: string
  name: string
  neighborhood?: string
  size?: string
  photo?: string
  descEn: string
  descFr: string
  descEs: string
  descDe?: string
  descNl?: string
  descIt?: string
}

const PARKS: Park[] = [
  {
    citySlug: "aarhus",
    name: "Marselisborg Hundeskov",
    neighborhood: "Marselisborg Forest",
    size: "25 ha / 62 acres",
    photo: "/images/city-places/aarhus-parks-marselisborg-hundeskov.jpg",
    descEn: `Aarhus's largest official off-leash dog forest (hundeskov), 25 hectares of fenced beech and oak woodland inside the larger Marselisborg Forest. Multiple walking trails, a small clearing for ball games, and direct access to the rest of the 1,400-hectare forest on leash.`,
    descFr: `Plus grande forêt sans laisse officielle d'Aarhus (hundeskov), 25 hectares de hêtraie et chênaie clôturées à l'intérieur de la grande forêt de Marselisborg. Plusieurs sentiers, petite clairière pour jouer à la balle, et accès direct au reste des 1 400 hectares en laisse.`,
    descEs: `El mayor bosque sin correa oficial de Aarhus (hundeskov), 25 hectáreas de hayedo y robledal vallados dentro del mayor bosque de Marselisborg. Varios senderos, pequeño claro para jugar a la pelota, y acceso directo al resto de las 1.400 hectáreas con correa.`,
    descDe: `Aarhus' größter offizieller Freilaufwald für Hunde (hundeskov), 25 Hektar eingezäunter Buchen- und Eichenwald innerhalb des größeren Marselisborg-Waldes. Mehrere Wanderwege, eine kleine Lichtung für Ballspiele und direkter Zugang zum restlichen 1.400 Hektar großen Wald an der Leine.`,
    descNl: `Aarhus' grootste officiële aanlijnvrije hondenbos (hundeskov), 25 hectare omheind beuken- en eikenbos binnen het grotere Marselisborg-bos. Meerdere wandelpaden, een kleine open plek om te balspelen, en directe toegang tot de rest van het 1.400 hectare grote bos aan de lijn.`,
    descIt: `Il più grande bosco ufficiale per cani senza guinzaglio di Aarhus (hundeskov), 25 ettari di faggeta e querceto recintati all'interno della più ampia foresta di Marselisborg. Diversi sentieri, una piccola radura per giocare con la palla e accesso diretto al resto dei 1.400 ettari di bosco al guinzaglio.`,
  },
  {
    citySlug: "amsterdam",
    name: "Park Somerlust",
    neighborhood: "Amstel / Oost",
    photo: "/images/city-places/amsterdam-parks-park-somerlust.jpg",
    descEn: `A fully fenced off-leash dog area on Kruysweerstraat in the Amstel/Oost quarter, one of the few completely enclosed dog spaces inside the ring. The full fencing gives dogs with unreliable recall a secure place to run and socialise, with benches for owners. Open and free year-round.`,
    descFr: `Une aire canine entièrement clôturée sur la Kruysweerstraat, dans le quartier de l'Amstel (Oost), l'un des rares espaces canins totalement fermés à l'intérieur du périphérique. La clôture intégrale offre aux chiens au rappel incertain un endroit sûr pour courir et se sociabiliser, avec des bancs pour les maîtres. Ouverte et gratuite toute l'année.`,
    descEs: `Una zona canina totalmente vallada en la calle Kruysweerstraat, en el barrio del Amstel (Oost), uno de los pocos espacios para perros completamente cerrados dentro del anillo. El vallado íntegro ofrece a los perros con poca obediencia a la llamada un lugar seguro para correr y socializar, con bancos para los dueños. Abierta y gratuita todo el año.`,
    descDe: `Eine vollständig eingezäunte Freilauffläche für Hunde an der Kruysweerstraat im Viertel Amstel/Oost, einer der wenigen komplett umschlossenen Hundeplätze innerhalb des Rings. Die durchgehende Einzäunung bietet Hunden mit unzuverlässigem Rückruf einen sicheren Ort zum Rennen und Sozialisieren, mit Bänken für die Halter. Ganzjährig geöffnet und kostenlos.`,
    descNl: `Een volledig omheind losloopgebied voor honden aan de Kruysweerstraat in de wijk Amstel/Oost, een van de weinige volledig afgesloten hondenplekken binnen de ring. Dankzij de complete omheining hebben honden met een onbetrouwbare terugroep hier een veilige plek om te rennen en te socialiseren, met bankjes voor de baasjes. Het hele jaar door gratis en open.`,
    descIt: `Un'area cani completamente recintata sulla Kruysweerstraat, nel quartiere Amstel/Oost, uno dei pochi spazi per cani totalmente chiusi all'interno della cerchia. La recinzione integrale offre ai cani dal richiamo poco affidabile un posto sicuro dove correre e socializzare, con panchine per i proprietari. Aperta e gratuita tutto l'anno.`,
  },
  {
    citySlug: "barcelona",
    name: "Parc de Joan Miró",
    neighborhood: "Eixample",
    size: "800+ m²",
    photo: "/images/city-places/barcelona-parks-parc-de-joan-miro.jpg",
    descEn: `A busy fenced canine area of over 800 square metres inside Parc de Joan Miró, in the dense Eixample district beside the former bullring (now Las Arenas). Fully enclosed for off-leash play, it fills up on weekends given how many dog owners live nearby, and is shaded by the park's mature trees. Metro Espanya is two minutes away.`,
    descFr: `Une aire canine clôturée très fréquentée de plus de 800 mètres carrés à l'intérieur du Parc de Joan Miró, dans le dense quartier de l'Eixample, à côté des anciennes arènes (aujourd'hui Las Arenas). Entièrement fermée pour la liberté sans laisse, elle se remplit le week-end vu le nombre de maîtres du quartier, et reste ombragée par les arbres du parc. Le métro Espanya est à deux minutes.`,
    descEs: `Una concurrida área canina vallada de más de 800 metros cuadrados dentro del Parc de Joan Miró, en el denso barrio del Eixample, junto a la antigua plaza de toros (hoy Las Arenas). Totalmente cerrada para el juego sin correa, se llena los fines de semana por la cantidad de dueños que viven cerca, y da sombra el arbolado del parque. El metro Espanya está a dos minutos.`,
    descDe: `Eine belebte eingezäunte Hundefläche von über 800 Quadratmetern im Parc de Joan Miró, im dicht besiedelten Viertel Eixample neben der ehemaligen Stierkampfarena (heute Las Arenas). Vollständig umzäunt für den Freilauf, füllt sie sich am Wochenende, da viele Hundehalter in der Nähe wohnen, und liegt im Schatten der alten Bäume des Parks. Die Metrostation Espanya ist zwei Minuten entfernt.`,
    descNl: `Een drukbezochte omheinde hondenuitlaatplaats van ruim 800 vierkante meter in het Parc de Joan Miró, in de dichtbebouwde wijk Eixample naast de voormalige stierenarena (nu Las Arenas). Volledig afgesloten voor loslopen, raakt hij in het weekend vol door het grote aantal hondenbezitters in de buurt, en ligt hij in de schaduw van de oude bomen van het park. Metrostation Espanya ligt op twee minuten lopen.`,
    descIt: `Un'affollata area canina recintata di oltre 800 metri quadrati all'interno del Parc de Joan Miró, nel denso quartiere dell'Eixample accanto all'ex arena dei tori (oggi Las Arenas). Completamente recintata per il gioco libero, si riempie nei fine settimana vista la quantità di padroni di cani che vivono nei dintorni, ed è ombreggiata dagli alberi maturi del parco. La metro Espanya dista due minuti.`,
  },
  {
    citySlug: "basel",
    name: "Tierpark Lange Erlen",
    neighborhood: "Kleinh\u00fcningen / German border",
    photo: "/images/city-places/basel-parks-tierpark-lange-erlen.jpg",
    descEn: `A free animal park set in floodplain forest, with paddocks for deer, ibex and Highland cattle alongside leashed walking paths and a small river beach. Dogs are welcome on a leash inside the park itself, and the surrounding woods (signposted Bannwald) offer off-leash freedom on th`,
    descFr: `Un parc animalier gratuit installé dans la forêt alluviale, avec enclos pour cerfs, bouquetins et vaches Highland le long de sentiers en laisse et d'une petite plage de rivière. Les chiens sont les bienvenus en laisse dans le parc, et les bois environnants (Bannwald, signalé) off`,
    descEs: `Un parque de animales gratuito en pleno bosque aluvial, con recintos para ciervos, íbices y vacas Highland junto a senderos con correa y una pequeña playa fluvial. Los perros son bienvenidos con correa dentro del parque, y los bosques colindantes (señalizados Bannwald) ofrecen li`,
    descDe: `Ein kostenloser Tierpark im Auenwald, mit Gehegen für Rehe, Steinböcke und Hochlandrinder entlang von Wegen an der Leine und einem kleinen Flussstrand. Hunde sind an der Leine im Park selbst willkommen, und die umliegenden Wälder (ausgeschildert als Bannwald) bieten Freilauf a`,
    descNl: `Een gratis dierenpark in een uiterwaardenbos, met weides voor herten, steenbokken en Schotse hooglanders langs wandelpaden aan de lijn en een klein rivierstrandje. Honden zijn welkom aan de lijn in het park zelf, en de omliggende bossen (aangegeven als Bannwald) bieden loslopende vrijheid op de gemarkeerde paden.`,
    descIt: `Un parco animali gratuito immerso nel bosco alluvionale, con recinti per cervi, stambecchi e bovini Highland lungo sentieri al guinzaglio e una piccola spiaggia fluviale. I cani sono benvenuti al guinzaglio all'interno del parco stesso, e i boschi circostanti (segnalati come Bannwald) offrono libertà senza guinzaglio sui sentieri segnalati.`,
  },
  {
    citySlug: "basel",
    name: "Kannenfeldpark",
    neighborhood: "St. Johann",
    photo: "/images/city-places/basel-parks-kannenfeldpark.jpg",
    descEn: `A 6-hectare central park laid out on a former cemetery, with mature plane trees, wide lawns and a small lake. Dogs must stay on the leash but the park is open all night, the lawns are vast and shaded, and a fenced playground area helps families keep things calm. The closest serio`,
    descFr: `Un parc central de 6 hectares aménagé sur un ancien cimetière, avec platanes centenaires, pelouses ouvertes et un petit étang. Les chiens doivent rester en laisse, mais le parc est ouvert toute la nuit, les pelouses sont vastes et ombragées, et une aire de jeu clôturée permet de `,
    descEs: `Un parque central de 6 hectáreas trazado sobre un antiguo cementerio, con plátanos centenarios, amplios céspedes y un pequeño estanque. Los perros deben ir con correa, pero el parque está abierto toda la noche, los céspedes son amplios y sombreados, y una zona de juegos vallada a`,
    descDe: `Ein 6 Hektar großer Zentralpark auf einem ehemaligen Friedhof, mit alten Platanen, weiten Rasenflächen und einem kleinen Teich. Hunde müssen an der Leine bleiben, doch der Park ist die ganze Nacht geöffnet, die Rasenflächen sind weitläufig und schattig, und ein eingezäunter Spielplatzbereich hilft Familien, alles ruhig zu halten. Der nächste ernstzunehmende`,
    descNl: `Een 6 hectare groot centraal park, aangelegd op een voormalige begraafplaats, met oude platanen, ruime gazons en een klein meertje. Honden moeten aangelijnd blijven, maar het park is de hele nacht open, de gazons zijn uitgestrekt en schaduwrijk, en een omheinde speeltuin helpt gezinnen om het rustig te houden. Het dichtstbijzijnde serieuze losloopgebied ligt in de buurt.`,
    descIt: `Un parco centrale di 6 ettari realizzato su un ex cimitero, con platani secolari, ampi prati e un piccolo laghetto. I cani devono restare al guinzaglio, ma il parco è aperto tutta la notte, i prati sono vasti e ombreggiati, e un'area giochi recintata aiuta le famiglie a mantenere la calma. La zona di sgambamento seria più vicina si trova nei dintorni.`,
  },
  {
    citySlug: "belgrade",
    name: "Ta\u0161majdan Park",
    neighborhood: "Stari Grad",
    size: "9 hectares",
    photo: "/images/city-places/belgrade-parks-tasmajdan-park.jpg",
    descEn: `A 9-hectare central park around the St Mark's Church, with a fenced municipal dog park on the south side that opened in 2018. Mature plane trees, gravel paths, and several café-kiosks; the dog enclosure has agility equipment and water taps. Three blocks east of the Skadarlija boh`,
    descFr: `Parc central de 9 hectares autour de l'église Saint-Marc, avec un parc canin municipal clôturé du côté sud, ouvert en 2018. Platanes anciens, allées de gravier et plusieurs kiosques-cafés ; l'enclos canin dispose d'agility et de robinets. À trois pâtés de maisons à l'est de Skada`,
    descEs: `Parque central de 9 hectáreas en torno a la iglesia de San Marcos, con un parque canino municipal vallado en el lado sur, inaugurado en 2018. Plátanos maduros, paseos de grava y varios kioskos-café; el recinto canino tiene agility y fuentes. A tres manzanas al este de Skadarlija.`,
    descDe: `Ein 9 Hektar großer Zentralpark rund um die Sankt-Markus-Kirche, mit einem eingezäunten städtischen Hundepark auf der Südseite, der 2018 eröffnet wurde. Alte Platanen, Kieswege und mehrere Café-Kioske; das Hundegehege verfügt über Agility-Geräte und Wasserzapfstellen. Drei Straßenblocks östlich vom Künstlerviertel Skadarlija.`,
    descNl: `Een 9 hectare groot centraal park rond de Sint-Marcuskerk, met een omheind gemeentelijk hondenpark aan de zuidkant dat in 2018 werd geopend. Oude platanen, grindpaden en meerdere café-kiosken; het hondenterrein beschikt over agility-toestellen en waterkranen. Drie straten ten oosten van de kunstenaarswijk Skadarlija.`,
    descIt: `Un parco centrale di 9 ettari attorno alla chiesa di San Marco, con un parco cani comunale recintato sul lato sud, aperto nel 2018. Platani secolari, viali di ghiaia e diversi chioschi-bar; il recinto per cani dispone di attrezzi di agility e fontanelle d'acqua. Tre isolati a est del quartiere degli artisti di Skadarlija.`,
  },
  {
    citySlug: "berlin",
    name: "Volkspark Friedrichshain",
    photo: "/images/city-places/berlin-parks-volkspark-friedrichshain.jpg",
    descEn: `Berlin's oldest public park (1848), Volkspark Friedrichshain occupies 52 hectares in the heart of East Berlin's most vibrant neighbourhoods. The park has several large off-leash areas including the Hundewiese (dog meadow) near the north entrance, which is one of the best-maintain`,
    descFr: `Le plus ancien parc public de Berlin (1848), le Volkspark Friedrichshain occupe 52 hectares au cœur des quartiers les plus animés de Berlin-Est. Le parc dispose de plusieurs grandes zones de liberté, dont la Hundewiese (prairie pour chiens) près de l'entrée nord, l'une des zones `,
    descEs: `El parque público más antiguo de Berlín (1848), el Volkspark Friedrichshain ocupa 52 hectáreas en el corazón de los barrios más vibrantes del Berlín del Este. El parque tiene varias zonas grandes sin correa, incluida la Hundewiese (pradera para perros) cerca de la entrada norte, `,
    descDe: `Berlins ältester öffentlicher Park (1848), der Volkspark Friedrichshain erstreckt sich über 52 Hektar im Herzen der lebendigsten Viertel Ost-Berlins. Der Park bietet mehrere große Freilaufflächen, darunter die Hundewiese nahe dem Nordeingang, eine der bestgepflegten `,
    descNl: `Berlijns oudste openbare park (1848), het Volkspark Friedrichshain beslaat 52 hectare in het hart van de levendigste wijken van Oost-Berlijn. Het park heeft meerdere grote losloopgebieden, waaronder de Hundewiese (hondenweide) bij de noordelijke ingang, een van de best onderhouden in de stad.`,
    descIt: `Il parco pubblico più antico di Berlino (1848), il Volkspark Friedrichshain occupa 52 ettari nel cuore dei quartieri più vivaci di Berlino Est. Il parco ha diverse ampie aree senza guinzaglio, tra cui la Hundewiese (prato per cani) vicino all'ingresso nord, una delle meglio mantenute della città.`,
  },
  {
    citySlug: "bologna",
    name: "Parco del Velodromo",
    photo: "/images/city-places/bologna-parks-parco-del-velodromo.jpg",
    descEn: `A neighbourhood park in the Savena district with a fully fenced off-leash area specifically designed for dogs. The fenced enclosure makes it ideal for dogs with unreliable recall or those who need to exercise in a secure space. Smaller than Giardini Margherita but well-maintained`,
    descFr: `Un parc de quartier dans le district de Savena avec une zone de liberté entièrement clôturée spécifiquement conçue pour les chiens. L'enclos clôturé le rend idéal pour les chiens dont le rappel est peu fiable ou ceux qui ont besoin de s'exercer dans un espace sécurisé. Plus petit`,
    descEs: `Un parque de barrio en el distrito de Savena con una zona de libertad completamente vallada diseñada específicamente para perros. El recinto vallado lo hace ideal para perros con vuelta poco fiable o aquellos que necesitan ejercitarse en un espacio seguro. Más pequeño que los Già`,
    descDe: `Ein Stadtteilpark im Bezirk Savena mit einer vollständig eingezäunten Freilauffläche, die eigens für Hunde gestaltet wurde. Das eingezäunte Gehege macht ihn ideal für Hunde mit unzuverlässigem Rückruf oder für alle, die in einer sicheren Umgebung Auslauf brauchen. Kleiner als die Già`,
    descNl: `Een buurtpark in de wijk Savena met een volledig omheind losloopgebied dat speciaal voor honden is ontworpen. De afgesloten omheining maakt het ideaal voor honden met een onbetrouwbare terugroep of honden die in een veilige ruimte moeten bewegen. Kleiner dan de Giardini Margherita, maar goed onderhouden.`,
    descIt: `Un parco di quartiere nel distretto di Savena con un'area senza guinzaglio completamente recintata pensata appositamente per i cani. Il recinto lo rende ideale per cani dal richiamo poco affidabile o che hanno bisogno di muoversi in uno spazio sicuro. Più piccolo dei Giardini Margherita, ma ben curato.`,
  },
  {
    citySlug: "bordeaux",
    name: "Darwin Ecosyst\u00e8me",
    neighborhood: "Bastide (Rive Droite)",
    photo: "/images/city-places/bordeaux-parks-darwin-ecosysteme.jpg",
    descEn: `Strictly speaking Darwin is not a park, it is a converted military complex, but it functions as Bordeaux's most dog-permissive open space. The vast courtyard, rooftop terrace garden, and riverside access combine to create a sprawling urban environment where dogs move freely. Th`,
    descFr: `À strictement parler, Darwin n'est pas un parc, c'est un ancien complexe militaire reconverti, mais il fonctionne comme l'espace le plus dog-permissif de Bordeaux. La vaste cour intérieure, la terrasse-jardin sur les toits et l'accès aux berges se combinent pour créer un enviro`,
    descEs: `Estrictamente hablando, Darwin no es un parque, es un complejo militar reconvertido, pero funciona como el espacio más permisivo para perros de Burdeos. El vasto patio, el jardín en la azotea y el acceso al río se combinan para crear un entorno urbano extenso donde los perros s`,
    descDe: `Streng genommen ist Darwin kein Park, sondern ein umgebauter Militärkomplex, doch er fungiert als der hundefreundlichste Freiraum von Bordeaux. Der weitläufige Innenhof, der Dachterrassengarten und der Zugang zum Flussufer verbinden sich zu einer ausgedehnten urbanen Umgebung, in der sich Hunde fr`,
    descNl: `Strikt genomen is Darwin geen park, maar een omgebouwd militair complex, dat echter fungeert als de meest hondvriendelijke open ruimte van Bordeaux. De uitgestrekte binnenplaats, het daktuinterras en de toegang tot de rivieroever vormen samen een weidse stedelijke omgeving waarin honden zich vrij kunnen bewegen.`,
    descIt: `A rigor di termini Darwin non è un parco, ma un ex complesso militare riconvertito, che però funziona come lo spazio più permissivo per cani di Bordeaux. Il vasto cortile, il giardino-terrazza sul tetto e l'accesso al lungofiume si combinano per creare un ambiente urbano esteso in cui i cani si muovono liberamente.`,
  },
  {
    citySlug: "bratislava",
    name: "Sad Janka Kr\u00e1\u013ea",
    neighborhood: "Petr\u017ealka (south Danube bank)",
    size: "About 11 hectares",
    photo: "/images/city-places/bratislava-parks-sad-janka-krala.jpg",
    descEn: `Central Europe's oldest public park, opened in 1776 in Baroque style on the south bank of the Danube, directly opposite the Old Town and reachable in five minutes over the SNP Bridge. Wide gravel paths, mature plane trees, and a small fenced playground at the centre. Dogs are we`,
    descFr: `Plus vieux parc public d'Europe centrale, ouvert en 1776 en style baroque sur la rive sud du Danube, juste en face de la vieille ville, à cinq minutes par le pont SNP. Larges allées de gravier, platanes anciens et une petite aire de jeux clôturée au centre. Les chiens y sont les`,
    descEs: `El parque público más antiguo de Europa Central, inaugurado en 1776 en estilo barroco en la orilla sur del Danubio, justo enfrente del casco antiguo y a cinco minutos cruzando el puente SNP. Amplios paseos de grava, plátanos maduros y una pequeña zona de juegos vallada en el cent`,
    descDe: `Der älteste öffentliche Park Mitteleuropas, 1776 im Barockstil am Südufer der Donau angelegt, direkt gegenüber der Altstadt und in fünf Minuten über die SNP-Brücke erreichbar. Breite Kieswege, alte Platanen und ein kleiner eingezäunter Spielplatz in der Mitte. Hunde sind w`,
    descNl: `Het oudste openbare park van Midden-Europa, geopend in 1776 in barokstijl aan de zuidoever van de Donau, recht tegenover de oude binnenstad en in vijf minuten bereikbaar via de SNP-brug. Brede grindpaden, oude platanen en een klein omheind speelterrein in het midden. Honden zijn er welkom.`,
    descIt: `Il parco pubblico più antico dell'Europa centrale, aperto nel 1776 in stile barocco sulla riva sud del Danubio, proprio di fronte alla città vecchia e raggiungibile in cinque minuti attraversando il ponte SNP. Ampi viali di ghiaia, platani secolari e un piccolo parco giochi recintato al centro. I cani sono benvenuti.`,
  },
  {
    citySlug: "brno",
    name: "Lu\u017e\u00e1nky Park",
    neighborhood: "Brno-st\u0159ed",
    size: "Approx. 23 hectares",
    photo: "/images/city-places/brno-parks-luzanky-park.jpg",
    descEn: `Brno's oldest public park (opened 1786), formal allées, mature trees, a pond, ornamental fountains. Two fenced psí louka zones in the south and east corners. Free public WiFi, café, summer concerts.`,
    descFr: `Le plus ancien parc public de Brno (ouvert en 1786), allées formelles, arbres mûrs, étang, fontaines ornementales. Deux zones psí louka clôturées dans les coins sud et est. WiFi public gratuit, café, concerts d'été.`,
    descEs: `El parque público más antiguo de Brno (abierto en 1786), paseos formales, árboles maduros, estanque, fuentes ornamentales. Dos zonas psí louka valladas en las esquinas sur y este. WiFi público gratuito, café, conciertos de verano.`,
    descDe: `Brünns ältester öffentlicher Park (eröffnet 1786), formale Alleen, alte Bäume, ein Teich, Zierbrunnen. Zwei eingezäunte psí-louka-Zonen in der südlichen und östlichen Ecke. Kostenloses öffentliches WLAN, Café, Sommerkonzerte.`,
    descNl: `Brno's oudste openbare park (geopend in 1786), formele lanen, oude bomen, een vijver, sierfonteinen. Twee omheinde psí louka-zones in de zuidelijke en oostelijke hoek. Gratis openbare wifi, café, zomerconcerten.`,
    descIt: `Il parco pubblico più antico di Brno (aperto nel 1786), viali formali, alberi secolari, un laghetto, fontane ornamentali. Due zone psí louka recintate negli angoli sud ed est. Wifi pubblico gratuito, caffè, concerti estivi.`,
  },
  {
    citySlug: "bucharest",
    name: "King Mihai I Park (Herastrau)",
    neighborhood: "Aviatorilor / Floreasca (north of centre)",
    size: "187 hectares",
    photo: "/images/city-places/bucharest-parks-king-mihai-i-park-herastrau.jpg",
    descEn: `Bucharest's largest park, 187 hectares around the central Herastrau Lake, with two fully fenced municipal dog parks (the larger near the Aviator entrance, a medium-sized one near the Mioriță fountain). Beyond the enclosures, the park's footpaths are leash-friendly and the lakesid`,
    descFr: `Plus grand parc de Bucarest, 187 hectares autour du lac central de Herastrau, avec deux parcs canins municipaux entièrement clôturés (le plus grand près de l'entrée Aviator, un de taille moyenne près de la fontaine Mioriță). Au-delà des enclos, les sentiers du parc sont accessibl`,
    descEs: `El mayor parque de Bucarest, 187 hectáreas alrededor del lago central de Herastrau, con dos parques caninos municipales totalmente vallados (el mayor cerca de la entrada Aviator, otro mediano junto a la fuente Mioriță). Más allá de los recintos, los caminos del parque son accesib`,
    descDe: `Bukarests größter Park, 187 Hektar rund um den zentralen Herăstrău-See, mit zwei vollständig eingezäunten städtischen Hundeparks (der größere nahe dem Aviator-Eingang, ein mittelgroßer nahe dem Mioriță-Brunnen). Außerhalb der Gehege sind die Fußwege des Parks leinenfreundlich und das Seeuf`,
    descNl: `Boekarest' grootste park, 187 hectare rond het centrale Herăstrău-meer, met twee volledig omheinde gemeentelijke hondenparken (het grootste bij de Aviator-ingang, een middelgroot exemplaar bij de Mioriță-fontein). Buiten de omheiningen zijn de wandelpaden van het park aanlijnvriendelijk en biedt de oever van het meer volop ruimte om te wandelen.`,
    descIt: `Il parco più grande di Bucarest, 187 ettari attorno al lago centrale Herăstrău, con due parchi cani comunali completamente recintati (il più grande vicino all'ingresso Aviator, uno di medie dimensioni vicino alla fontana Mioriță). Oltre ai recinti, i sentieri del parco sono adatti al guinzaglio e la sponda del lago offre ampio spazio per passeggiare.`,
  },
  {
    citySlug: "bucharest",
    name: "Tineretului Park",
    neighborhood: "Tineretului (south of centre)",
    size: "86 hectares",
    photo: "/images/city-places/bucharest-parks-tineretului-park.jpg",
    descEn: `An 86-hectare park around the Tineretului Lake, less crowded than Herastrau or Cismigiu. The wide open lawns are popular with dog owners for ball-throwing; a fenced municipal dog park sits on the eastern edge. Metro M2 stops at Tineretului station, two minutes from the park gate.`,
    descFr: `Parc de 86 hectares autour du lac de Tineretului, moins fréquenté que Herastrau ou Cismigiu. Les vastes pelouses ouvertes sont prisées des propriétaires pour le lancer de balle ; un parc canin municipal clôturé se trouve sur la rive est. Le métro M2 s'arrête à la station Tineretu`,
    descEs: `Parque de 86 hectáreas alrededor del lago Tineretului, menos concurrido que Herastrau o Cismigiu. Las amplias praderas abiertas son favoritas para lanzar pelotas; hay un parque canino municipal vallado en el extremo este. El metro M2 para en la estación Tineretului, a dos minutos`,
    descDe: `Ein 86 Hektar großer Park rund um den Tineretului-See, weniger überlaufen als Herăstrău oder Cișmigiu. Die weiten offenen Rasenflächen sind bei Hundehaltern zum Ballspielen beliebt; ein eingezäunter städtischer Hundepark liegt am östlichen Rand. Die Metro M2 hält an der Station Tineretului, zwei Minuten vom Parktor entfernt.`,
    descNl: `Een 86 hectare groot park rond het Tineretului-meer, minder druk dan Herăstrău of Cișmigiu. De brede open gazons zijn populair bij hondenbezitters om bal te gooien; aan de oostrand ligt een omheind gemeentelijk hondenpark. Metrolijn M2 stopt bij station Tineretului, twee minuten van de parkpoort.`,
    descIt: `Un parco di 86 ettari attorno al lago Tineretului, meno affollato di Herăstrău o Cișmigiu. Gli ampi prati sono apprezzati dai padroni di cani per lanciare la palla; un parco cani comunale recintato si trova sul bordo orientale. La metro M2 ferma alla stazione Tineretului, a due minuti dal cancello del parco.`,
  },
  {
    citySlug: "budapest",
    name: "Városliget Kutyás Élménypark",
    neighborhood: "Városliget (City Park)",
    photo: "/images/city-places/budapest-parks-varosliget-kutyas-elmenypark.jpg",
    descEn: `A fully fenced dog adventure park inside Városliget (City Park), separated from the rest of the park by a 1.2-metre fence and split into large-dog and small-dog sections. One of the busiest dog parks in Europe, with up to 800 dogs a day, it has agility obstacles, water points and shaded seating. Metro M1 to Széchenyi fürdő stops at the edge.`,
    descFr: `Un parc d'aventure canin entièrement clôturé au sein du Városliget (parc de la Ville), séparé du reste du parc par une clôture d'1,2 mètre et divisé en zones pour grands et petits chiens. L'un des parcs canins les plus fréquentés d'Europe, avec jusqu'à 800 chiens par jour, il propose des agrès d'agility, des points d'eau et des bancs ombragés. La ligne M1 (arrêt Széchenyi fürdő) dessert l'entrée.`,
    descEs: `Un parque de aventuras canino totalmente vallado dentro del Városliget (parque de la Ciudad), separado del resto del parque por una valla de 1,2 metros y dividido en zonas para perros grandes y pequeños. Uno de los parques caninos más concurridos de Europa, con hasta 800 perros al día, cuenta con obstáculos de agility, fuentes de agua y bancos con sombra. La línea M1 (parada Széchenyi fürdő) llega hasta la entrada.`,
    descDe: `Ein vollständig eingezäunter Hunde-Erlebnispark im Városliget (Stadtwäldchen), durch einen 1,2 Meter hohen Zaun vom übrigen Park getrennt und in Bereiche für große und kleine Hunde unterteilt. Einer der meistbesuchten Hundeparks Europas mit bis zu 800 Hunden pro Tag, mit Agility-Hindernissen, Wasserstellen und schattigen Sitzgelegenheiten. Die Metrolinie M1 hält am Rand an der Station Széchenyi fürdő.`,
    descNl: `Een volledig omheind hondenavonturenpark binnen het Városliget (Stadspark), gescheiden van de rest van het park door een 1,2 meter hoog hek en verdeeld in secties voor grote en kleine honden. Een van de drukste hondenparken van Europa, met tot 800 honden per dag, met agility-obstakels, waterpunten en schaduwrijke zitplaatsen. Metrolijn M1 naar Széchenyi fürdő stopt bij de rand.`,
    descIt: `Un parco avventura per cani completamente recintato all'interno del Városliget (Parco Cittadino), separato dal resto del parco da una recinzione di 1,2 metri e diviso in sezioni per cani grandi e piccoli. Uno dei parchi cani più frequentati d'Europa, con fino a 800 cani al giorno, dispone di ostacoli di agility, punti d'acqua e sedute ombreggiate. La metro M1 ferma al bordo, alla stazione Széchenyi fürdő.`,
  },
  {
    citySlug: "copenhagen",
    name: "Fælledparken Hundegård",
    neighborhood: "Østerbro",
    photo: "/images/city-places/copenhagen-parks-faelledparken-hundegard.jpg",
    descEn: `Central Copenhagen's best-known fenced dog runs sit inside Fælledparken, the city's largest park in Østerbro, with separate enclosures for large and small dogs. Fully fenced grass and gravel, benches and water, open around the clock and free. Handy after a leashed walk across the rest of the 58-hectare park.`,
    descFr: `Les enclos canins clôturés les plus connus du centre de Copenhague se trouvent dans le Fælledparken, le plus grand parc de la ville à Østerbro, avec des zones séparées pour grands et petits chiens. Herbe et gravier entièrement clôturés, bancs et point d'eau, ouverts en continu et gratuits. Pratique après une promenade en laisse dans le reste des 58 hectares du parc.`,
    descEs: `Los recintos caninos vallados más conocidos del centro de Copenhague están dentro del Fælledparken, el mayor parque de la ciudad en Østerbro, con zonas separadas para perros grandes y pequeños. Césped y grava totalmente vallados, bancos y fuente de agua, abiertos las 24 horas y gratuitos. Práctico tras un paseo con correa por el resto de las 58 hectáreas del parque.`,
    descDe: `Die bekanntesten eingezäunten Hundeauslaufflächen im Zentrum Kopenhagens liegen im Fælledparken, dem größten Park der Stadt in Østerbro, mit getrennten Gehegen für große und kleine Hunde. Vollständig eingezäunter Rasen und Kies, Bänke und Wasser, rund um die Uhr geöffnet und kostenlos. Praktisch nach einem Spaziergang an der Leine durch den restlichen 58 Hektar großen Park.`,
    descNl: `De bekendste omheinde hondenuitlaatplaatsen van centraal Kopenhagen liggen in het Fælledparken, het grootste park van de stad in Østerbro, met aparte omheiningen voor grote en kleine honden. Volledig omheind gras en grind, bankjes en water, dag en nacht open en gratis. Handig na een aangelijnde wandeling door de rest van het 58 hectare grote park.`,
    descIt: `I recinti per cani più conosciuti del centro di Copenaghen si trovano all'interno di Fælledparken, il parco più grande della città a Østerbro, con recinti separati per cani grandi e piccoli. Erba e ghiaia completamente recintate, panchine e acqua, aperti giorno e notte e gratuiti. Comodo dopo una passeggiata al guinzaglio nel resto dei 58 ettari del parco.`,
  },
  {
    citySlug: "cordoba",
    name: "Parque Cruz Conde",
    neighborhood: "Centro",
    size: "37 ha / 91 acres",
    photo: "/images/city-places/cordoba-parks-parque-cruz-conde.jpg",
    descEn: `Cordoba's largest urban park (37 ha), a short walk south of the historic centre. Features a fenced Área de Esparcimiento Canino (off-leash zone), wide tree-lined avenues, fountains, and a small lake. Locally beloved for early-morning dog walks before the summer heat builds up.`,
    descFr: `Plus grand parc urbain de Cordoue (37 ha), à courte distance à pied au sud du centre historique. Possède une Área de Esparcimiento Canino clôturée (zone sans laisse), de larges avenues arborées, des fontaines et un petit lac. Apprécié des locaux pour les promenades canines au pet`,
    descEs: `El mayor parque urbano de Córdoba (37 ha), a poca distancia a pie al sur del centro histórico. Cuenta con un Área de Esparcimiento Canino vallada (zona sin correa), amplias avenidas arboladas, fuentes y un pequeño lago. Muy querido por los locales para paseos caninos a primera ho`,
    descDe: `Córdobas größter Stadtpark (37 ha), ein kurzer Spaziergang südlich des historischen Zentrums. Verfügt über eine eingezäunte Área de Esparcimiento Canino (Freilaufzone), breite baumgesäumte Alleen, Brunnen und einen kleinen See. Bei Einheimischen beliebt für frühmorgendliche Hundespaziergänge, bevor die Sommerhitze einsetzt.`,
    descNl: `Córdoba's grootste stadspark (37 ha), een korte wandeling ten zuiden van het historische centrum. Beschikt over een omheinde Área de Esparcimiento Canino (losloopzone), brede lanen met bomen, fonteinen en een klein meer. Bij de lokale bevolking geliefd voor vroege ochtendwandelingen met de hond voordat de zomerhitte toeslaat.`,
    descIt: `Il più grande parco urbano di Cordova (37 ha), a breve distanza a piedi a sud del centro storico. Dispone di un'Área de Esparcimiento Canino recintata (zona senza guinzaglio), ampi viali alberati, fontane e un piccolo lago. Molto amato dai residenti per le passeggiate mattutine con il cane prima che arrivi il caldo estivo.`,
  },
  {
    citySlug: "dublin",
    name: "Phoenix Park",
    neighborhood: "Dublin 7 / 8",
    size: "1,750 acres",
    photo: "/images/city-places/dublin-parks-phoenix-park.jpg",
    descEn: ``,
    descFr: `Avec ses 710 hectares, Phoenix Park est l'un des plus grands parcs urbains enclos d'Europe, plus grand que Central Park et Hyde Park réunis. C'est la destination de promenade canine par excellence pour les Dublinois. Les vastes prairies ouvertes, les longues allées bordées d'arb`,
    descEs: `Con 710 hectáreas, Phoenix Park es uno de los parques urbanos cerrados más grandes de Europa, más grande que Central Park y Hyde Park juntos. Es el destino de paseo canino definitivo para los dublineses. Las vastas praderas abiertas, las largas avenidas arboladas y las tranquila`,
    descDe: `Mit 710 Hektar ist der Phoenix Park einer der größten eingefriedeten Stadtparks Europas, größer als Central Park und Hyde Park zusammen. Er ist das ultimative Ziel für Hundespaziergänge in Dublin. Die weiten offenen Wiesen, die langen baumgesäumten Alle`,
    descNl: `Met 710 hectare is Phoenix Park een van de grootste omheinde stadsparken van Europa, groter dan Central Park en Hyde Park samen. Het is de ultieme bestemming voor een hondenwandeling in Dublin. De uitgestrekte open weiden, de lange met bomen omzoomde lanen en de rustige zijpaden bieden alle ruimte om te ravotten.`,
    descIt: `Con i suoi 710 ettari, Phoenix Park è uno dei più grandi parchi urbani recintati d'Europa, più grande di Central Park e Hyde Park messi insieme. È la meta per eccellenza per passeggiare con il cane per i dublinesi. I vasti prati aperti, i lunghi viali alberati e i tranquilli sentieri laterali offrono tutto lo spazio per correre.`,
  },
  {
    citySlug: "dusseldorf",
    name: "Hofgarten",
    neighborhood: "Stadtmitte",
    size: "28 hectares",
    photo: "/images/city-places/dusseldorf-parks-hofgarten.jpg",
    descEn: `Germany's first public park (1769), 28 hectares of English-landscape lawns and ponds in the very centre of Düsseldorf, between the Königsallee and the Rhine. Dogs must be leashed throughout the park; an off-leash Hundewiese borders the eastern edge along the Inselstraße for free `,
    descFr: `Premier parc public d'Allemagne (1769), 28 hectares de pelouses paysagères à l'anglaise et d'étangs au cœur même de Düsseldorf, entre la Königsallee et le Rhin. Les chiens doivent être tenus en laisse dans tout le parc ; une Hundewiese sans laisse longe le côté est, le long de la`,
    descEs: `Primer parque público de Alemania (1769), 28 hectáreas de praderas paisajísticas al estilo inglés y estanques en el mismo centro de Düsseldorf, entre la Königsallee y el Rin. Los perros deben ir con correa en todo el parque; una Hundewiese sin correa bordea el lado este a lo larg`,
    descDe: `Deutschlands erster öffentlicher Park (1769), 28 Hektar englische Landschaftsrasen und Teiche im Herzen von Düsseldorf, zwischen der Königsallee und dem Rhein. Hunde müssen im gesamten Park an der Leine geführt werden; eine Hundewiese ohne Leine grenzt entlang der Inselstraße am östlichen Rand a`,
    descNl: `Duitslands eerste openbare park (1769), 28 hectare Engels landschapsgazon en vijvers in het absolute centrum van Düsseldorf, tussen de Königsallee en de Rijn. Honden moeten in het hele park aangelijnd blijven; een aanlijnvrije Hundewiese grenst aan de oostrand langs de Inselstraße, gratis toegankelijk.`,
    descIt: `Il primo parco pubblico della Germania (1769), 28 ettari di prati in stile paesaggistico inglese e stagni nel cuore stesso di Düsseldorf, tra la Königsallee e il Reno. I cani devono stare al guinzaglio in tutto il parco; una Hundewiese senza guinzaglio costeggia il lato orientale lungo la Inselstraße, ad accesso gratuito.`,
  },
  {
    citySlug: "dusseldorf",
    name: "Volksgarten",
    neighborhood: "Oberbilk / Bilk",
    size: "70 hectares",
    photo: "/images/city-places/dusseldorf-parks-volksgarten.jpg",
    descEn: `A 70-hectare landscape park south of the centre, designed in the late 19th century around two ponds and a wooded ridge. Dogs must be leashed on paths, but a large fenced Hundewiese near the Auf'm Hennekamp entrance gives off-leash space; the southern wood section connects to the `,
    descFr: `Parc paysager de 70 hectares au sud du centre, conçu à la fin du XIXe siècle autour de deux étangs et d'une crête boisée. Les chiens doivent être tenus en laisse sur les sentiers, mais une grande Hundewiese clôturée près de l'entrée Auf'm Hennekamp offre un espace sans laisse ; l`,
    descEs: `Parque paisajístico de 70 hectáreas al sur del centro, diseñado a finales del siglo XIX en torno a dos estanques y una cresta boscosa. Los perros deben ir con correa en los senderos, pero una gran Hundewiese vallada cerca de la entrada de Auf'm Hennekamp ofrece espacio sin correa`,
    descDe: `Ein 70 Hektar großer Landschaftspark südlich des Zentrums, Ende des 19. Jahrhunderts rund um zwei Teiche und einen bewaldeten Höhenrücken angelegt. Hunde müssen auf den Wegen an der Leine bleiben, doch eine große eingezäunte Hundewiese nahe dem Eingang Auf'm Hennekamp bietet Freilauf; der südliche Waldabschnitt verbindet sich mit de`,
    descNl: `Een 70 hectare groot landschapspark ten zuiden van het centrum, aangelegd eind 19e eeuw rond twee vijvers en een beboste rug. Honden moeten op de paden aangelijnd blijven, maar een grote omheinde Hundewiese bij de ingang Auf'm Hennekamp biedt loslooprvrijheid; het zuidelijke bosgedeelte sluit aan op het aangrenzende bos.`,
    descIt: `Un parco paesaggistico di 70 ettari a sud del centro, progettato alla fine del XIX secolo attorno a due stagni e una collinetta boscosa. I cani devono restare al guinzaglio sui sentieri, ma un'ampia Hundewiese recintata vicino all'ingresso di Auf'm Hennekamp offre spazio libero; la sezione boschiva meridionale si collega al bosco adiacente.`,
  },
  {
    citySlug: "dusseldorf",
    name: "Nordpark",
    neighborhood: "Stockum (north)",
    size: "36 hectares",
    photo: "/images/city-places/dusseldorf-parks-nordpark.jpg",
    descEn: `A 36-hectare formal park laid out in 1937, near the Messe trade fair grounds and the EKŌ-Haus Japanese centre. The park's main lawns and rose garden require dogs on leash, but the wooded northern section near the Kaiserswerther Straße has an off-leash Hundewiese. The aquazoo Löbb`,
    descFr: `Parc à la française de 36 hectares aménagé en 1937, près du parc des expositions Messe et du centre japonais EKŌ-Haus. Les pelouses principales et la roseraie imposent la laisse, mais la section boisée nord près de la Kaiserswerther Straße abrite une Hundewiese sans laisse. L'aqu`,
    descEs: `Parque formal de 36 hectáreas trazado en 1937, cerca del recinto ferial Messe y del centro japonés EKŌ-Haus. Las praderas principales y la rosaleda exigen correa, pero la sección boscosa del norte, cerca de la Kaiserswerther Straße, alberga una Hundewiese sin correa. El aquazoo L`,
    descDe: `Ein 36 Hektar großer, 1937 angelegter formaler Park, nahe dem Messegelände und dem japanischen EKŌ-Haus. Die Hauptrasenflächen und der Rosengarten des Parks verlangen Hunde an der Leine, doch der bewaldete Nordteil nahe der Kaiserswerther Straße bietet eine Hundewiese ohne Leine. Der Aquazoo Löbb`,
    descNl: `Een 36 hectare groot formeel park, aangelegd in 1937, vlak bij het beursterrein Messe en het Japanse centrum EKŌ-Haus. De hoofdgazons en rozentuin van het park vereisen honden aan de lijn, maar het beboste noordelijke gedeelte bij de Kaiserswerther Straße heeft een aanlijnvrije Hundewiese. De Aquazoo Löbbecke ligt vlakbij.`,
    descIt: `Un parco formale di 36 ettari realizzato nel 1937, vicino al quartiere fieristico Messe e al centro giapponese EKŌ-Haus. I prati principali del parco e il roseto richiedono il guinzaglio, ma la sezione boschiva settentrionale vicino alla Kaiserswerther Straße ha una Hundewiese senza guinzaglio. L'acquario Löbbecke si trova nelle vicinanze.`,
  },
  {
    citySlug: "frankfurt",
    name: "Gr\u00fcneburgpark",
    neighborhood: "Westend-Nord",
    size: "29 ha / 72 acres",
    photo: "/images/city-places/frankfurt-parks-gruneburgpark.jpg",
    descEn: `A 29-hectare English-style park in the Westend district featuring a fenced Hundeauslauffläche (off-leash zone), one of the few official off-leash areas inside the city ring. The rest of the park requires a leash, but the wide lawns and shaded paths make it one of the most pleasa`,
    descFr: `Parc de 29 hectares à l'anglaise dans le Westend, doté d'un Hundeauslauffläche clôturé (zone sans laisse), l'une des rares aires officielles sans laisse à l'intérieur de la ceinture urbaine. Le reste du parc impose la laisse, mais les vastes pelouses et allées ombragées en font `,
    descEs: `Parque de 29 hectáreas de estilo inglés en el Westend, con una Hundeauslauffläche vallada (zona sin correa), una de las pocas áreas oficiales sin correa dentro del anillo urbano. El resto del parque requiere correa, pero sus amplios céspedes y senderos sombreados lo convierten en`,
    descDe: `Ein 29 Hektar großer Park im englischen Stil im Stadtteil Westend mit einer eingezäunten Hundeauslauffläche, einer der wenigen offiziellen Freilaufzonen innerhalb des Stadtrings. Im restlichen Park gilt Leinenpflicht, doch die weiten Rasenflächen und schattigen Wege machen ihn zu einem der angenehmst`,
    descNl: `Een 29 hectare groot park in Engelse stijl in de wijk Westend met een omheinde Hundeauslauffläche (losloopzone), een van de weinige officiële aanlijnvrije gebieden binnen de stadsring. In de rest van het park geldt een aanlijnplicht, maar de brede gazons en schaduwrijke paden maken het een van de aangenaamste plekken van de stad.`,
    descIt: `Un parco di 29 ettari in stile inglese nel quartiere Westend, con una Hundeauslauffläche recintata (zona senza guinzaglio), una delle poche aree ufficiali senza guinzaglio all'interno dell'anello cittadino. Il resto del parco richiede il guinzaglio, ma gli ampi prati e i sentieri ombreggiati lo rendono uno dei luoghi più piacevoli della città.`,
  },
  {
    citySlug: "gdansk",
    name: "Park Oliwski",
    neighborhood: "Oliwa",
    size: "Approx. 11 hectares",
    photo: "/images/city-places/gdansk-parks-park-oliwski.jpg",
    descEn: `Gdansk's most beautiful park, a 17th-century landscaped garden adjoining the Oliwa Cathedral, palm house, ornamental ponds, the Pałac Opatów art museum. Free entry, dog-friendly with leashed dogs and a fenced dog zone in the south-east corner.`,
    descFr: `Le plus beau parc de Gdansk, jardin paysager du XVIIe siècle attenant à la cathédrale d'Oliwa, palmeraie, étangs ornementaux, musée d'art Pałac Opatów. Entrée libre, dog-friendly avec chiens en laisse et zone canine clôturée au coin sud-est.`,
    descEs: `El parque más bello de Gdansk, jardín paisajístico del siglo XVII contiguo a la catedral de Oliwa, palmera, estanques ornamentales, museo de arte Pałac Opatów. Entrada libre, dog-friendly con perros con correa y zona canina vallada en la esquina sureste.`,
    descDe: `Gdańsks schönster Park, ein Landschaftsgarten aus dem 17. Jahrhundert neben der Oliwa-Kathedrale, mit Palmenhaus, Zierteichen und dem Kunstmuseum Pałac Opatów. Freier Eintritt, hundefreundlich mit Hunden an der Leine und einer eingezäunten Hundezone in der südöstlichen Ecke.`,
    descNl: `Het mooiste park van Gdańsk, een 17e-eeuwse landschapstuin naast de kathedraal van Oliwa, met een palmenhuis, sierlijke vijvers en het kunstmuseum Pałac Opatów. Gratis toegang, hondvriendelijk met honden aan de lijn en een omheinde hondenzone in de zuidoostelijke hoek.`,
    descIt: `Il parco più bello di Danzica, un giardino paesaggistico del XVII secolo adiacente alla cattedrale di Oliwa, con serra delle palme, stagni ornamentali e il museo d'arte Pałac Opatów. Ingresso libero, adatto ai cani al guinzaglio con una zona canina recintata nell'angolo sud-est.`,
  },
  {
    citySlug: "gothenburg",
    name: "Slottsskogen",
    neighborhood: "Slottsskogen",
    photo: "/images/city-places/gothenburg-parks-slottsskogen.jpg",
    descEn: `Gothenburg's most-loved urban park, 137 hectares of mixed forest, open meadow, and formal gardens with free-roaming deer, moose, and flamingos (in the open animal enclosures). Dogs are permitted throughout most of the park. The northern section has designated off-leash areas whe`,
    descFr: `Le parc urbain le plus aimé de Göteborg, 137 hectares de forêt mixte, prairies ouvertes et jardins formels avec cerfs, élans et flamants roses en liberté (dans des enclos ouverts). Les chiens sont autorisés dans la majeure partie du parc. La section nord dispose de zones désigné`,
    descEs: `El parque urbano más querido de Gotemburgo, 137 hectáreas de bosque mixto, prados abiertos y jardines formales con ciervos, alces y flamencos en libertad (en recintos abiertos). Los perros están permitidos en la mayor parte del parque. La sección norte tiene zonas designadas sin`,
    descDe: `Göteborgs beliebtester Stadtpark, 137 Hektar Mischwald, offene Wiesen und formale Gärten mit frei umherstreifenden Rehen, Elchen und Flamingos (in offenen Tiergehegen). Hunde sind im größten Teil des Parks erlaubt. Der nördliche Bereich verfügt über ausgewiesene Freilaufzonen, w`,
    descNl: `Göteborgs meest geliefde stadspark, 137 hectare gemengd bos, open weiden en formele tuinen met vrij rondlopende herten, elanden en flamingo's (in open dierenverblijven). Honden zijn in het grootste deel van het park toegestaan. Het noordelijke gedeelte heeft aangewezen losloopzones waar honden vrij mogen rennen.`,
    descIt: `Il parco urbano più amato di Göteborg, 137 ettari tra bosco misto, prati aperti e giardini formali, con cervi, alci e fenicotteri semiliberi (in recinti aperti). I cani sono ammessi nella maggior parte del parco. La sezione nord ha zone senza guinzaglio designate dove i cani possono correre liberamente.`,
  },
  {
    citySlug: "gothenburg",
    name: "Tr\u00e4dg\u00e5rdsf\u00f6reningen",
    neighborhood: "City Centre",
    photo: "/images/city-places/gothenburg-parks-tradgardsforeningen.jpg",
    descEn: `The 19th-century Garden Society park in the heart of Gothenburg, an enclosed formal garden with a Victorian palm house, an extensive rose garden (one of the finest in Scandinavia), and a popular outdoor café. Dogs on leads are permitted in the park and on the café terrace. Admis`,
    descFr: `Le parc de la Société du Jardin du XIXe siècle au cœur de Göteborg, un jardin formel clos avec une serre palmier victorienne, une vaste roseraie (l'une des plus belles de Scandinavie) et un café en plein air très fréquenté. Les chiens en laisse sont autorisés dans le parc et sur`,
    descEs: `El parque de la Sociedad del Jardín del siglo XIX en el corazón de Gotemburgo, un jardín formal cerrado con un invernadero victoriano de palmeras, un extenso jardín de rosas (uno de los más hermosos de Escandinavia) y un popular café al aire libre. Los perros con correa están pe`,
    descDe: `Der Park der Gartengesellschaft aus dem 19. Jahrhundert im Herzen Göteborgs, ein umschlossener formaler Garten mit viktorianischem Palmenhaus, einem weitläufigen Rosengarten (einer der schönsten Skandinaviens) und einem beliebten Café im Freien. Hunde an der Leine sind im Park und auf der Café-Terrasse erlaubt. Der Eintr`,
    descNl: `Het 19e-eeuwse park van de Tuinbouwvereniging in het hart van Göteborg, een omsloten formele tuin met een Victoriaans palmenhuis, een uitgestrekte rozentuin (een van de mooiste van Scandinavië) en een populair café in de open lucht. Aangelijnde honden zijn welkom in het park en op het caféterras. De toegang is betaald.`,
    descIt: `Il parco della Società del Giardino del XIX secolo nel cuore di Göteborg, un giardino formale recintato con una serra vittoriana delle palme, un vasto roseto (uno dei più belli di Scandinavia) e un popolare caffè all'aperto. I cani al guinzaglio sono ammessi nel parco e sulla terrazza del caffè. L'ingresso è a pagamento.`,
  },
  {
    citySlug: "granada",
    name: "Parque Ana Orantes",
    neighborhood: "Arabial",
    photo: "/images/city-places/granada-parks-parque-ana-orantes.jpg",
    descEn: `A fully enclosed off-leash dog park with a perimeter fence, agility obstacles, a drinking fountain, and night lighting that extends its usability into summer evenings. One of the best-maintained pipicanes in Granada, it is popular with residents of the Arabial and Zaidín neighbou`,
    descFr: `Un parc canin entièrement clôturé, en accès libre, avec une clôture périmétrique, des obstacles d'agility, une fontaine à eau et un éclairage nocturne qui permet de l'utiliser lors des soirées estivales. L'un des pipicanes les mieux entretenus de Grenade, très apprécié des habita`,
    descEs: `Un parque canino completamente vallado y sin correa, con valla perimetral, obstáculos de agility, fuente de agua e iluminación nocturna que amplía su uso a las noches de verano. Uno de los pipicanes mejor mantenidos de Granada, muy popular entre los vecinos de los barrios de Arab`,
    descDe: `Ein vollständig umzäunter Hundeauslauf mit Umfriedung, Agility-Hindernissen, einem Trinkbrunnen und Nachtbeleuchtung, die die Nutzung bis in die Sommerabende hinein verlängert. Einer der bestgepflegten Pipicanes in Granada, beliebt bei Anwohnern der Viertel Arabial und Zaid`,
    descNl: `Een volledig omheind losloopgebied voor honden met een perimeterhek, agility-obstakels, een drinkfontein en nachtverlichting die het gebruik ook op zomeravonden mogelijk maakt. Een van de best onderhouden pipicanes van Granada, populair bij bewoners van de wijken Arabial en Zaidín.`,
    descIt: `Un parco cani completamente recintato e senza guinzaglio, con recinzione perimetrale, ostacoli di agility, una fontanella e illuminazione notturna che ne estende l'uso alle serate estive. Uno dei pipicán meglio tenuti di Granada, popolare tra i residenti dei quartieri Arabial e Zaidín.`,
  },
  {
    citySlug: "granada",
    name: "Parque para Perros La Virgencica",
    neighborhood: "Zaid\u00edn",
    photo: "/images/city-places/granada-parks-parque-para-perros-la-virgencica.jpg",
    descEn: `A dedicated fenced dog park in the residential Zaidín neighbourhood, popular with local dog owners for its off-leash area, drinking fountain, and agility obstacles. Well-lit in the evenings, which makes it a practical option when summer temperatures finally cool after 20:00. The `,
    descFr: `Un parc canin clôturé dans le quartier résidentiel du Zaidín, apprécié des propriétaires de chiens pour sa zone en liberté, sa fontaine à eau et ses obstacles d'agility. Bien éclairé le soir, ce qui en fait une option pratique quand les températures estivales baissent enfin après`,
    descEs: `Un parque canino vallado en el barrio residencial del Zaidín, muy popular entre los propietarios de perros del barrio por su zona sin correa, fuente de agua y obstáculos de agility. Bien iluminado por las noches, lo que lo convierte en una opción práctica cuando las temperaturas `,
    descDe: `Ein eigener eingezäunter Hundepark im Wohnviertel Zaidín, beliebt bei lokalen Hundehaltern wegen der Freilauffläche, des Trinkbrunnens und der Agility-Hindernisse. Abends gut beleuchtet, was ihn zu einer praktischen Option macht, wenn die Sommertemperaturen nach 20 Uhr endlich sinken. Das`,
    descNl: `Een eigen omheind hondenpark in de woonwijk Zaidín, populair bij lokale hondenbezitters vanwege het losloopgebied, de drinkfontein en de agility-obstakels. 's Avonds goed verlicht, wat het een praktische optie maakt wanneer de zomertemperaturen na 20.00 uur eindelijk dalen. Het park ligt op wandelafstand van het centrum.`,
    descIt: `Un parco cani recintato dedicato nel quartiere residenziale dello Zaidín, apprezzato dai proprietari di cani locali per la sua area senza guinzaglio, la fontanella e gli ostacoli di agility. Ben illuminato la sera, il che lo rende un'opzione pratica quando le temperature estive finalmente si abbassano dopo le 20:00. Il parco è a distanza pedonale dal centro.`,
  },
  {
    citySlug: "graz",
    name: "Stadtpark Graz",
    neighborhood: "East of Altstadt",
    size: "23 ha",
    photo: "/images/city-places/graz-parks-stadtpark-graz.jpg",
    descEn: `Graz's main central park (23 ha), laid out in 1869 on the site of the old defensive walls. Mature trees, a pond, the Forum Stadtpark cultural centre, and a signed fenced Hundezone in the eastern corner.`,
    descFr: `Le parc central principal de Graz (23 ha), aménagé en 1869 sur les anciennes murailles. Arbres matures, étang, centre culturel Forum Stadtpark et zone canine clôturée signalée dans le coin est.`,
    descEs: `El parque central principal de Graz (23 ha), trazado en 1869 sobre las antiguas murallas. Árboles maduros, estanque, centro cultural Forum Stadtpark y zona canina vallada señalizada en el extremo este.`,
    descDe: `Graz' zentraler Hauptpark (23 ha), 1869 auf dem Gelände der alten Stadtmauern angelegt. Alte Bäume, ein Teich, das Kulturzentrum Forum Stadtpark und eine ausgeschilderte eingezäunte Hundezone in der östlichen Ecke.`,
    descNl: `Graz' belangrijkste centrale park (23 ha), aangelegd in 1869 op de plek van de oude verdedigingsmuren. Oude bomen, een vijver, het culturele centrum Forum Stadtpark en een aangegeven omheinde Hundezone in de oostelijke hoek.`,
    descIt: `Il parco centrale principale di Graz (23 ha), realizzato nel 1869 sul sito delle antiche mura difensive. Alberi secolari, un laghetto, il centro culturale Forum Stadtpark e una Hundezone recintata e segnalata nell'angolo orientale.`,
  },
  {
    citySlug: "hamburg",
    name: "Stadtpark Hamburg",
    neighborhood: "Winterhude",
    size: "148 ha / 366 acres",
    photo: "/images/city-places/hamburg-parks-stadtpark-hamburg.jpg",
    descEn: `Hamburg's central 148-hectare people's park designed in the 1910s. Features two Hundeauslaufzonen, a large one near the Planetarium and a smaller fenced one to the south, plus wide lawns where leashed dogs are welcome. Summer open-air concerts at the Freilichtbühne; dogs are ad`,
    descFr: `Parc populaire central de 148 hectares, dessiné dans les années 1910. Deux Hundeauslaufzonen, une grande près du Planétarium et une petite clôturée au sud, plus de vastes pelouses où les chiens en laisse sont bienvenus. Concerts d'été à la Freilichtbühne ; les chiens sont admis`,
    descEs: `Parque popular central de 148 hectáreas, diseñado en la década de 1910. Dispone de dos Hundeauslaufzonen, una grande junto al Planetario y otra más pequeña vallada al sur, además de amplios céspedes donde los perros con correa son bienvenidos. Conciertos al aire libre en verano`,
    descDe: `Hamburgs zentraler 148 Hektar großer Volkspark, in den 1910er Jahren angelegt. Verfügt über zwei Hundeauslaufzonen, eine große nahe dem Planetarium und eine kleinere eingezäunte im Süden, plus weite Rasenflächen, auf denen Hunde an der Leine willkommen sind. Sommerliche Open-Air-Konzerte an der Freilichtbühne; Hunde sind zug`,
    descNl: `Hamburgs centrale 148 hectare grote volkspark, ontworpen in de jaren 1910. Beschikt over twee Hundeauslaufzonen, een grote bij het Planetarium en een kleinere omheinde in het zuiden, plus brede gazons waar aangelijnde honden welkom zijn. In de zomer vinden er openluchtconcerten plaats bij de Freilichtbühne; honden zijn daar toegestaan.`,
    descIt: `Il parco popolare centrale di Amburgo, 148 ettari progettati negli anni '10 del Novecento. Dispone di due Hundeauslaufzonen, una grande vicino al Planetario e una più piccola recintata a sud, oltre ad ampi prati dove i cani al guinzaglio sono benvenuti. Concerti estivi all'aperto alla Freilichtbühne; i cani sono ammessi.`,
  },
  {
    citySlug: "hamburg",
    name: "Altonaer Volkspark",
    neighborhood: "Altona-Nord",
    size: "205 ha / 507 acres",
    photo: "/images/city-places/hamburg-parks-altonaer-volkspark.jpg",
    descEn: `At 205 hectares, Hamburg's largest public park, woodland, meadows, a rose garden and three large fenced Hundeauslaufzonen make it the city's top destination for off-leash romping. Extensive wooded trails; often quieter than the central Stadtpark.`,
    descFr: `Avec ses 205 hectares, le plus grand parc public de Hambourg, forêt, prairies, roseraie et trois grandes Hundeauslaufzonen clôturées en font la destination n°1 pour les chiens sans laisse. Larges sentiers forestiers ; souvent plus calme que le Stadtpark central.`,
    descEs: `Con 205 hectáreas, el mayor parque público de Hamburgo, bosque, praderas, rosaleda y tres grandes Hundeauslaufzonen valladas lo convierten en el destino nº1 para perros sin correa. Amplios senderos forestales; a menudo más tranquilo que el Stadtpark central.`,
    descDe: `Mit 205 Hektar Hamburgs größter öffentlicher Park; Wald, Wiesen, ein Rosengarten und drei große eingezäunte Hundeauslaufzonen machen ihn zum Top-Ziel der Stadt für ausgelassenen Freilauf. Ausgedehnte Waldwege; oft ruhiger als der zentrale Stadtpark.`,
    descNl: `Met 205 hectare is dit Hamburgs grootste openbare park; bos, weiden, een rozentuin en drie grote omheinde Hundeauslaufzonen maken het de belangrijkste bestemming van de stad voor aanlijnvrij ravotten. Uitgestrekte bospaden; vaak rustiger dan het centrale Stadtpark.`,
    descIt: `Con 205 ettari, il parco pubblico più grande di Amburgo; bosco, prati, un roseto e tre grandi Hundeauslaufzonen recintate ne fanno la destinazione numero uno della città per correre senza guinzaglio. Ampi sentieri boschivi; spesso più tranquillo dello Stadtpark centrale.`,
  },
  {
    citySlug: "lecce",
    name: "Parco di Belloluogo",
    neighborhood: "North-east",
    size: "Approx. 100 hectares",
    photo: "/images/city-places/lecce-parks-parco-di-belloluogo.jpg",
    descEn: `A protected agricultural-natural park ringing the north-east of the city, olive groves, the medieval Belloluogo tower, walking trails. Lecce's only large green space; a fenced losloop-style dog zone is in the south corner.`,
    descFr: `Parc agricole-naturel protégé qui ceint le nord-est de la ville, oliveraies, tour médiévale de Belloluogo, sentiers de promenade. Le seul grand espace vert de Lecce ; une zone canine clôturée façon losloop se trouve au coin sud.`,
    descEs: `Parque agrícola-natural protegido que rodea el noreste de la ciudad, olivares, torre medieval de Belloluogo, senderos. El único gran espacio verde de Lecce; una zona canina vallada estilo losloop está en la esquina sur.`,
    descDe: `Ein geschützter Landwirtschafts- und Naturpark, der den Nordosten der Stadt umgibt, mit Olivenhainen, dem mittelalterlichen Turm von Belloluogo und Wanderwegen. Lecces einzige große Grünfläche; eine eingezäunte Freilaufzone für Hunde liegt in der südlichen Ecke.`,
    descNl: `Een beschermd landbouw- en natuurpark dat het noordoosten van de stad omringt, met olijfgaarden, de middeleeuwse toren van Belloluogo en wandelpaden. Lecces enige grote groene ruimte; in de zuidelijke hoek ligt een omheinde losloopzone voor honden in losloop-stijl.`,
    descIt: `Un parco agricolo-naturale protetto che cinge il nord-est della città, uliveti, la torre medievale di Belloluogo, sentieri escursionistici. L'unico grande spazio verde di Lecce; una zona canina recintata in stile losloop si trova nell'angolo sud.`,
  },
  {
    citySlug: "leipzig",
    name: "Clara-Zetkin-Park",
    neighborhood: "Zentrum-S\u00fcd",
    size: "Approx. 124 hectares",
    photo: "/images/city-places/leipzig-parks-clara-zetkin-park.jpg",
    descEn: `Leipzig's largest central park, 124 hectares of meadows, ponds and the Auenwald forest tributaries. The fenced south-west off-leash zone (Hundeauslaufzone Clara-Zetkin-Park) is one of the largest in Saxony, with dog-agility equipment.`,
    descFr: `Le plus grand parc central de Leipzig, 124 hectares de prairies, étangs et bras de l'Auenwald. La Hundeauslaufzone clôturée du sud-ouest est l'une des plus grandes de Saxe, avec équipements d'agility.`,
    descEs: `El mayor parque central de Leipzig, 124 hectáreas de praderas, estanques y brazos del Auenwald. La Hundeauslaufzone vallada del suroeste es una de las mayores de Sajonia, con equipo de agility.`,
    descDe: `Leipzigs größter Zentralpark, 124 Hektar mit Wiesen, Teichen und Ausläufern des Auwalds. Die eingezäunte Freilaufzone im Südwesten (Hundeauslaufzone Clara-Zetkin-Park) ist eine der größten in Sachsen, mit Agility-Geräten für Hunde.`,
    descNl: `Leipzigs grootste centrale park, 124 hectare weiden, vijvers en zijtakken van het Auenwald. De omheinde losloopzone in het zuidwesten (Hundeauslaufzone Clara-Zetkin-Park) is een van de grootste van Saksen, met agility-uitrusting voor honden.`,
    descIt: `Il parco centrale più grande di Lipsia, 124 ettari di prati, stagni e affluenti del bosco alluvionale Auenwald. La zona senza guinzaglio recintata a sud-ovest (Hundeauslaufzone Clara-Zetkin-Park) è una delle più grandi della Sassonia, con attrezzature di agility per cani.`,
  },
  {
    citySlug: "lille",
    name: "Caniparc Jules Vall\u00e8s",
    neighborhood: "Lille-Sud",
    size: "Small fenced enclosures (~0.4 hectare combined)",
    photo: "/images/city-places/lille-parks-caniparc-jules-valles.jpg",
    descEn: `A fully fenced municipal dog park in the Lille-Sud neighbourhood, at the intersection of rue Jules Vallès and rue Alexandra David-Néel. Two separate enclosures (small/large dogs), agility equipment, water taps, and shaded benches. Free, open year-round, with €135 fouling fines en`,
    descFr: `Parc canin municipal entièrement clôturé dans le quartier Lille-Sud, au croisement de la rue Jules Vallès et de la rue Alexandra David-Néel. Deux enclos séparés (petits/grands chiens), agility, robinets et bancs ombragés. Gratuit, ouvert toute l'année, avec amendes de 135 € pour `,
    descEs: `Parque canino municipal totalmente vallado en el barrio Lille-Sud, en la intersección de la rue Jules Vallès con la rue Alexandra David-Néel. Dos recintos separados (perros pequeños/grandes), agility, fuentes y bancos con sombra. Gratis, abierto todo el año, con multas de 135 € p`,
    descDe: `Ein vollständig eingezäunter städtischer Hundepark im Viertel Lille-Sud, an der Kreuzung von rue Jules Vallès und rue Alexandra David-Néel. Zwei getrennte Gehege (kleine/große Hunde), Agility-Geräte, Wasserzapfstellen und schattige Bänke. Kostenlos, ganzjährig geöffnet, mit Bußgeldern von 135 € für Verunreinigun`,
    descNl: `Een volledig omheind gemeentelijk hondenpark in de wijk Lille-Sud, op het kruispunt van de rue Jules Vallès en de rue Alexandra David-Néel. Twee gescheiden omheiningen (kleine/grote honden), agility-toestellen, waterkranen en schaduwrijke bankjes. Gratis, het hele jaar open, met boetes van 135 € voor vervuiling.`,
    descIt: `Un parco cani comunale completamente recintato nel quartiere Lille-Sud, all'incrocio tra rue Jules Vallès e rue Alexandra David-Néel. Due recinti separati (cani piccoli/grandi), attrezzature di agility, fontanelle d'acqua e panchine ombreggiate. Gratuito, aperto tutto l'anno, con multe di 135 € per chi non raccoglie i bisogni del cane.`,
  },
  {
    citySlug: "lisbon",
    name: "Parque Canino da Bela Vista",
    neighborhood: "Marvila",
    photo: "/images/city-places/lisbon-parks-parque-canino-da-bela-vista.jpg",
    descEn: `A fully fenced dog park with a double-gated entrance inside the vast Parque da Bela Vista in Marvila, eastern Lisbon. The enclosure has waste stations, benches and play structures, and the surrounding park offers long leashed walks with city views. Reached by bus or a short walk from Chelas metro.`,
    descFr: `Un parc canin enti\u00e8rement cl\u00f4tur\u00e9 avec entr\u00e9e \u00e0 double portillon, \u00e0 l'int\u00e9rieur du vaste Parque da Bela Vista, \u00e0 Marvila, dans l'est de Lisbonne. L'enclos dispose de distributeurs de sacs, de bancs et de structures de jeu, et le parc alentour offre de longues promenades en laisse avec vue sur la ville. Accessible en bus ou \u00e0 courte distance du m\u00e9tro Chelas.`,
    descEs: `Un parque canino totalmente vallado con entrada de doble puerta, dentro del extenso Parque da Bela Vista, en Marvila, al este de Lisboa. El recinto cuenta con dispensadores de bolsas, bancos y estructuras de juego, y el parque circundante ofrece largos paseos con correa y vistas de la ciudad. Se llega en autob\u00fas o a poca distancia del metro Chelas.`,
    descDe: `Ein vollst\u00e4ndig eingez\u00e4unter Hundepark mit doppelter Toranlage innerhalb des weitl\u00e4ufigen Parque da Bela Vista in Marvila, im Osten Lissabons. Das Gehege verf\u00fcgt \u00fcber Beutelspender, B\u00e4nke und Spielger\u00e4te, und der umliegende Park bietet lange Spazierg\u00e4nge an der Leine mit Blick \u00fcber die Stadt. Erreichbar mit dem Bus oder zu Fu\u00df von der Metrostation Chelas.`,
    descNl: `Een volledig omheind hondenpark met een dubbele toegangspoort binnen het uitgestrekte Parque da Bela Vista in Marvila, oost-Lissabon. De omheining beschikt over afvalstations, bankjes en speeltoestellen, en het omliggende park biedt lange aangelijnde wandelingen met uitzicht over de stad. Bereikbaar met de bus of een korte wandeling vanaf metrostation Chelas.`,
    descIt: `Un parco cani completamente recintato con ingresso a doppio cancello all'interno del vasto Parque da Bela Vista, a Marvila, nella zona est di Lisbona. Il recinto dispone di distributori di sacchetti, panchine e strutture di gioco, mentre il parco circostante offre lunghe passeggiate al guinzaglio con vista sulla città. Si raggiunge in autobus o con una breve camminata dalla metro di Chelas.`,
  },
  {
    citySlug: "luxembourg",
    name: "Parc de la P\u00e9trusse",
    neighborhood: "P\u00e9trusse Valley (city centre)",
    size: "30 hectares",
    photo: "/images/city-places/luxembourg-parks-parc-de-la-petrusse.jpg",
    descEn: `A 30-hectare river-valley park slicing through the heart of Luxembourg City, with leafy paths beneath the UNESCO fortifications, two fenced municipal dog enclosures (enclos pour chiens), and the Adolphe Bridge soaring overhead. Leashed dogs are welcome the full length of the vall`,
    descFr: `Parc en vallée fluviale de 30 hectares qui traverse le cœur de Luxembourg, avec sentiers ombragés sous les fortifications UNESCO, deux enclos canins municipaux clôturés et le pont Adolphe qui surplombe l'ensemble. Les chiens en laisse sont les bienvenus sur toute la longueur de l`,
    descEs: `Parque en valle fluvial de 30 hectáreas que atraviesa el corazón de Luxemburgo, con senderos sombreados bajo las fortificaciones UNESCO, dos recintos caninos municipales vallados y el puente Adolphe sobrevolando el conjunto. Los perros con correa son bienvenidos en toda la longit`,
    descDe: `Ein 30 Hektar großer Flusstalpark, der sich durch das Herz von Luxemburg-Stadt zieht, mit begrünten Wegen unterhalb der UNESCO-Festungsanlagen, zwei eingezäunten städtischen Hundegehegen (enclos pour chiens) und der hoch darüber aufragenden Adolphe-Brücke. Hunde an der Leine sind auf der gesamten Länge des Ta`,
    descNl: `Een 30 hectare groot rivierdalpark dat dwars door het hart van Luxemburg-Stad snijdt, met begroeide paden onder de UNESCO-vestingwerken, twee omheinde gemeentelijke hondenomheiningen (enclos pour chiens) en de hoog daarboven torenende Adolphebrug. Aangelijnde honden zijn welkom over de volledige lengte van het dal.`,
    descIt: `Un parco di valle fluviale di 30 ettari che attraversa il cuore della città di Lussemburgo, con sentieri alberati sotto le fortificazioni UNESCO, due recinti cani comunali (enclos pour chiens) e il Ponte Adolphe che svetta sopra il tutto. I cani al guinzaglio sono benvenuti lungo tutta la valle.`,
  },
  {
    citySlug: "luxembourg",
    name: "Parc de Merl-Belair",
    neighborhood: "Merl",
    size: "14 hectares",
    photo: "/images/city-places/luxembourg-parks-parc-de-merl-belair.jpg",
    descEn: `A 14-hectare landscaped park in the western Merl district, with mature trees, a small lake with ducks, and a fenced dog enclosure on the north-east side. Leashed dogs welcome throughout the park; off-leash inside the enclosure. The Belair area concentrates a quiet residential dog`,
    descFr: `Parc paysager de 14 hectares dans le quartier ouest de Merl, avec arbres anciens, petit lac aux canards et un enclos canin clôturé sur le côté nord-est. Chiens en laisse acceptés dans tout le parc ; sans laisse à l'intérieur de l'enclos. Le quartier de Belair concentre une commun`,
    descEs: `Parque paisajista de 14 hectáreas en el barrio occidental de Merl, con árboles maduros, un pequeño lago con patos y un recinto canino vallado en el lado noreste. Perros con correa admitidos en todo el parque; sin correa dentro del recinto. La zona de Belair concentra una tranquil`,
    descDe: `Ein 14 Hektar großer Landschaftspark im westlichen Viertel Merl, mit alten Bäumen, einem kleinen Entenweiher und einem eingezäunten Hundegehege auf der Nordostseite. Hunde an der Leine sind im gesamten Park willkommen; ohne Leine innerhalb des Geheges. Das Viertel Belair vereint eine ruhige Wohngegend für Hundehalter`,
    descNl: `Een 14 hectare groot landschapspark in de westelijke wijk Merl, met oude bomen, een klein eendenvijvertje en een omheind hondengehege aan de noordoostzijde. Aangelijnde honden zijn welkom in het hele park; loslopen mag binnen de omheining. De buurt Belair vormt een rustige woonwijk voor hondenbezitters.`,
    descIt: `Un parco paesaggistico di 14 ettari nel quartiere occidentale di Merl, con alberi secolari, un piccolo lago con anatre e un recinto cani sul lato nord-est. I cani al guinzaglio sono benvenuti in tutto il parco; senza guinzaglio all'interno del recinto. La zona di Belair concentra una tranquilla comunità residenziale di proprietari di cani.`,
  },
  {
    citySlug: "maastricht",
    name: "Stadspark Maastricht",
    neighborhood: "Centre",
    size: "Approx. 9 hectares",
    photo: "/images/city-places/maastricht-parks-stadspark-maastricht.jpg",
    descEn: `A landscaped 19th-century park hugging the western medieval city walls, formal lawns, the river Jeker, mature trees, ornamental ponds and a fenced losloopgebied in the south corner. Connects directly to the Helpoort medieval gate.`,
    descFr: `Parc paysagé du XIXe siècle qui longe les remparts médiévaux ouest, pelouses formelles, rivière Jeker, arbres mûrs, étangs ornementaux et un losloopgebied clôturé au coin sud. Connecte directement à la porte médiévale Helpoort.`,
    descEs: `Parque paisajístico del siglo XIX que bordea las murallas medievales del oeste, céspedes formales, río Jeker, árboles maduros, estanques ornamentales y un losloopgebied vallado en la esquina sur. Conecta directamente con la puerta medieval Helpoort.`,
    descDe: `Ein im 19. Jahrhundert angelegter Landschaftspark entlang der westlichen mittelalterlichen Stadtmauer, mit formalen Rasenflächen, dem Fluss Jeker, alten Bäumen, Zierteichen und einem eingezäunten losloopgebied in der südlichen Ecke. Direkt angeschlossen an das mittelalterliche Tor Helpoort.`,
    descNl: `Een 19e-eeuws landschapspark dat langs de westelijke middeleeuwse stadsmuren loopt, met formele gazons, de rivier de Jeker, oude bomen, sierlijke vijvers en een omheind losloopgebied in de zuidelijke hoek. Sluit direct aan op de middeleeuwse Helpoort.`,
    descIt: `Un parco paesaggistico del XIX secolo addossato alle mura medievali occidentali, prati formali, il fiume Jeker, alberi secolari, stagni ornamentali e un losloopgebied recintato nell'angolo sud. Si collega direttamente alla porta medievale Helpoort.`,
  },
  {
    citySlug: "maastricht",
    name: "Maas Riverside Path",
    neighborhood: "South Maas bank",
    size: "Approx. 14 km one way",
    photo: "/images/city-places/maastricht-parks-maas-riverside-path.jpg",
    descEn: `The car-free Maas towpath runs uninterrupted from the city centre south through Sint Pieter to the Belgian border at Smeermaas, flat, paved, with the Albert Canal mirror on the west side. The Pietersplas lake (5 km south) has a designated dog-swimming bay.`,
    descFr: `Le chemin de halage de la Meuse, sans voiture, court sans interruption depuis le centre via Sint Pieter jusqu'à la frontière belge à Smeermaas, plat, pavé, avec le Canal Albert qui le double à l'ouest. Le lac Pietersplas (5 km au sud) a une baie de baignade canine désignée.`,
    descEs: `El camino de sirga del Mosa, sin coches, corre sin interrupción desde el centro vía Sint Pieter hasta la frontera belga en Smeermaas, plano, asfaltado, con el Canal Alberto reflejándolo al oeste. El lago Pietersplas (5 km al sur) tiene una bahía designada para el baño canino.`,
    descDe: `Der autofreie Treidelpfad an der Maas verläuft ununterbrochen vom Stadtzentrum südlich durch Sint Pieter bis zur belgischen Grenze bei Smeermaas, flach, asphaltiert, mit dem Albertkanal als Spiegelbild auf der Westseite. Der See Pietersplas (5 km südlich) verfügt über eine ausgewiesene Bucht zum Hundeschwimmen.`,
    descNl: `Het autovrije jaagpad langs de Maas loopt ononderbroken vanaf het centrum via Sint Pieter tot aan de Belgische grens bij Smeermaas, vlak, verhard, met het Albertkanaal als spiegelbeeld aan de westzijde. Het meer Pietersplas (5 km zuidelijker) heeft een aangewezen zwembaai voor honden.`,
    descIt: `L'alzaia senz'auto lungo la Mosa corre ininterrotta dal centro città a sud attraverso Sint Pieter fino al confine belga a Smeermaas, piatta, asfaltata, con il Canale Albert che la specchia sul lato ovest. Il lago Pietersplas (5 km a sud) ha una baia designata per il bagno dei cani.`,
  },
  {
    citySlug: "madrid",
    name: "Retiro Park (Parque del Buen Retiro)",
    neighborhood: "Jer\u00f3nimos / Retiro",
    size: "125 hectares",
    photo: "/images/city-places/madrid-parks-retiro-park-parque-del-buen-retiro.jpg",
    descEn: `Madrid's iconic central park and a UNESCO World Heritage Site. Dogs must be kept on a leash in most areas, but there is a designated off-leash enclosure near the Puerta de Hierro entrance on the northern side of the park. The paths around the Estanque Grande (the rowing lake) are`,
    descFr: `Le parc central emblématique de Madrid et site classé au patrimoine mondial de l'UNESCO. Les chiens doivent être tenus en laisse dans la plupart des zones, mais il existe un enclos de liberté désigné près de l'entrée de la Puerta de Hierro, côté nord du parc. Les allées autour de`,
    descEs: `El icónico parque central de Madrid y Patrimonio Mundial de la UNESCO. Los perros deben ir con correa en la mayoría de las zonas, pero hay un recinto designado sin correa cerca de la entrada de la Puerta de Hierro en el lado norte del parque. Los caminos alrededor del Estanque Gr`,
    descDe: `Madrids ikonischer Zentralpark und UNESCO-Weltkulturerbe. Hunde müssen in den meisten Bereichen an der Leine geführt werden, doch es gibt ein ausgewiesenes Freilaufgehege nahe dem Eingang Puerta de Hierro auf der Nordseite des Parks. Die Wege rund um den Estanque Grande (den Ruderteich) sin`,
    descNl: `Madrids iconische centrale park en UNESCO-Werelderfgoed. Honden moeten in de meeste gebieden aangelijnd blijven, maar er is een aangewezen losloopgebied bij de ingang Puerta de Hierro aan de noordkant van het park. De paden rond de Estanque Grande (het roeivijver) zijn levendig maar aanlijnverplicht.`,
    descIt: `L'iconico parco centrale di Madrid, Patrimonio dell'Umanità UNESCO. I cani devono stare al guinzaglio nella maggior parte delle aree, ma esiste un recinto designato senza guinzaglio vicino all'ingresso della Puerta de Hierro, sul lato nord del parco. I sentieri attorno all'Estanque Grande (il laghetto delle barche) sono vivaci ma richiedono il guinzaglio.`,
  },
  {
    citySlug: "malaga",
    name: "Parque del Oeste",
    neighborhood: "West Malaga",
    size: "Medium-large",
    photo: "/images/city-places/malaga-parks-parque-del-oeste.jpg",
    descEn: `Parque del Oeste is the main green lung of western Malaga, a large and well-maintained park with wide tree-lined paths, a dedicated dog area, and a relaxed neighbourhood atmosphere. It lacks the scenic drama of Monte de Gibralfaro or the botanical interest of La Concepción, but a`,
    descFr: `Le Parque del Oeste est le principal poumon vert de l'ouest de Malaga, un grand parc bien entretenu avec de larges allées bordées d'arbres, une zone dédiée aux chiens et une atmosphère détendue de quartier. Il manque du drame scénique du Monte de Gibralfaro ou de l'intérêt botani`,
    descEs: `El Parque del Oeste es el principal pulmón verde del oeste de Málaga, un parque grande y bien mantenido con amplios senderos arbolados, una zona dedicada a perros y un ambiente relajado de barrio. Carece del drama escénico del Monte de Gibralfaro o del interés botánico de La Conc`,
    descDe: `Der Parque del Oeste ist die grüne Lunge des westlichen Málaga, ein großer und gepflegter Park mit breiten baumgesäumten Wegen, einem eigenen Hundebereich und einer entspannten Nachbarschaftsatmosphäre. Ihm fehlt die landschaftliche Dramatik des Monte de Gibralfaro oder das botanische Interesse von La Conc`,
    descNl: `Het Parque del Oeste is de belangrijkste groene long van West-Malaga, een groot en goed onderhouden park met brede lanen met bomen, een eigen hondenzone en een ontspannen buurtsfeer. Het mist het dramatische landschap van de Monte de Gibralfaro of de botanische aantrekkingskracht van La Concepción, maar heeft daarvoor rust en ruimte terug.`,
    descIt: `Il Parque del Oeste è il principale polmone verde della zona ovest di Malaga, un parco ampio e ben curato con larghi viali alberati, un'area dedicata ai cani e un'atmosfera rilassata di quartiere. Gli manca la spettacolarità del Monte de Gibralfaro o l'interesse botanico de La Concepción, ma in cambio offre pace e spazio.`,
  },
  {
    citySlug: "manchester",
    name: "Fletcher Moss Botanical Gardens",
    neighborhood: "Didsbury (south Manchester)",
    size: "36 hectares",
    photo: "/images/city-places/manchester-parks-fletcher-moss-botanical-gardens.jpg",
    descEn: `A 90-acre estate of woodland, water gardens, and meadows along the Mersey in leafy Didsbury. Dogs on leash are welcome on every path; off-leash is tolerated on the back meadows and the riverside path along the Mersey. The botanical alpine garden has its own small fenced section t`,
    descFr: `Domaine de 90 acres (36 hectares) de forêt, jardins aquatiques et prairies le long de la Mersey, dans le verdoyant Didsbury. Les chiens en laisse sont les bienvenus sur tous les sentiers ; le sans laisse est toléré sur les prairies du fond et le sentier riverain de la Mersey. Le `,
    descEs: `Finca de 90 acres (36 hectáreas) de bosque, jardines acuáticos y praderas a lo largo del Mersey en el frondoso Didsbury. Los perros con correa son bienvenidos en todos los senderos; soltarlos se tolera en las praderas del fondo y en el sendero ribereño del Mersey. El jardín alpin`,
    descDe: `Ein 90 Acre (36 Hektar) großes Anwesen mit Wald, Wassergärten und Wiesen entlang des Mersey im grünen Didsbury. Hunde an der Leine sind auf jedem Weg willkommen; Freilauf wird auf den hinteren Wiesen und dem Uferpfad am Mersey geduldet. Der botanische Alpengarten hat einen eigenen kleinen eingezäunten Bereich, d`,
    descNl: `Een 90 acre (36 hectare) groot landgoed met bos, watertuinen en weiden langs de Mersey in het groene Didsbury. Aangelijnde honden zijn welkom op elk pad; loslopen wordt getolereerd op de achterste weiden en het rivierpad langs de Mersey. De botanische alpentuin heeft een eigen klein omheind gedeelte dat vrij toegankelijk is.`,
    descIt: `Una tenuta di 90 acri (36 ettari) di bosco, giardini d'acqua e prati lungo il Mersey nella verdeggiante Didsbury. I cani al guinzaglio sono benvenuti su ogni sentiero; senza guinzaglio è tollerato sui prati sul retro e sul sentiero lungo il fiume Mersey. Il giardino alpino botanico ha una sua piccola area recintata liberamente accessibile.`,
  },
  {
    citySlug: "marseille",
    name: "Colline Saint-Joseph \u2014 Canisite",
    neighborhood: "12e arrondissement",
    photo: "/images/city-places/marseille-parks-colline-saint-joseph-canisite.jpg",
    descEn: `A rare combination in Marseille: a 15 m² enclosed canisite (for off-leash play) adjacent to a 3,000 m² open dog-walking area. Less known and therefore less crowded than Longchamp.`,
    descFr: `Une combinaison rare à Marseille : un canisite clôturé de 15 m² (pour les jeux en liberté) adjacent à une zone de promenade canine de 3 000 m². Moins connu et donc moins fréquenté que Longchamp.`,
    descEs: `Una combinación rara en Marsella: un canisite cerrado de 15 m² (para juego suelto) junto a una zona de paseo canino de 3.000 m². Menos conocido y por tanto menos concurrido que Longchamp.`,
    descDe: `Eine seltene Kombination in Marseille: ein eingezäunter Canisite von 15 m² (für Freilauf) neben einem offenen, 3.000 m² großen Hundeauslaufgebiet. Weniger bekannt und daher weniger überlaufen als Longchamp.`,
    descNl: `Een zeldzame combinatie in Marseille: een omheinde canisite van 15 m² (voor loslopen) grenzend aan een 3.000 m² groot open hondenuitlaatgebied. Minder bekend en daardoor minder druk dan Longchamp.`,
    descIt: `Una combinazione rara a Marsiglia: un canisite recintato di 15 m² (per il gioco libero) adiacente a un'area di passeggio per cani aperta di 3.000 m². Meno conosciuto e quindi meno affollato di Longchamp.`,
  },
  {
    citySlug: "milan",
    name: "Area Cani del Parco Sempione",
    neighborhood: "Parco Sempione (centro)",
    size: "6,000 m²",
    photo: "/images/city-places/milan-parks-area-cani-del-parco-sempione.jpg",
    descEn: `A 6,000-square-metre fenced dog area inside Parco Sempione behind the Aquarium, redesigned by the Area Cani Milano volunteer association with the city. Split into large-dog and small-dog enclosures with custom paths, water and a canine first-aid point, it is the flagship off-leash space in the historic centre, steps from Castello Sforzesco. Under Milan's rules dogs run leash-free inside the fence.`,
    descFr: `Une aire canine clôturée de 6 000 mètres carrés à l'intérieur du Parco Sempione, derrière l'Aquarium, réaménagée par l'association de bénévoles Area Cani Milano avec la Ville. Divisée en enclos pour grands et petits chiens avec parcours dédiés, point d'eau et trousse de premiers secours canins, c'est l'espace sans laisse phare du centre historique, à deux pas du Castello Sforzesco. Selon le règlement milanais, les chiens y courent sans laisse à l'intérieur de la clôture.`,
    descEs: `Una zona canina vallada de 6.000 metros cuadrados dentro del Parco Sempione, detrás del Acuario, rediseñada por la asociación de voluntarios Area Cani Milano junto al Ayuntamiento. Dividida en recintos para perros grandes y pequeños con recorridos a medida, fuente de agua y un punto de primeros auxilios caninos, es el espacio sin correa de referencia del centro histórico, a un paso del Castello Sforzesco. Según la normativa de Milán, los perros corren sin correa dentro de la valla.`,
    descDe: `Eine 6.000 Quadratmeter große eingezäunte Hundefläche im Parco Sempione hinter dem Aquarium, umgestaltet vom Freiwilligenverein Area Cani Milano gemeinsam mit der Stadt. Aufgeteilt in Gehege für große und kleine Hunde mit eigens angelegten Wegen, einer Wasserstelle und einer Erste-Hilfe-Station für Hunde, ist sie die Vorzeige-Freilauffläche der Altstadt, nur wenige Schritte vom Castello Sforzesco entfernt. Nach den Mailänder Regeln laufen Hunde innerhalb des Zauns ohne Leine.`,
    descNl: `Een 6.000 vierkante meter grote omheinde hondenzone in het Parco Sempione achter het Aquarium, heringericht door de vrijwilligersvereniging Area Cani Milano samen met de gemeente. Verdeeld in gehegen voor grote en kleine honden met eigen paden, water en een eerstehulppunt voor honden, is dit de belangrijkste losloopruimte van het historische centrum, op loopafstand van het Castello Sforzesco. Volgens de regels van Milaan lopen honden binnen de omheining zonder lijn.`,
    descIt: `Un'area cani recintata di 6.000 metri quadrati all'interno del Parco Sempione dietro l'Acquario, riprogettata dall'associazione di volontari Area Cani Milano insieme al Comune. Divisa in recinti per cani grandi e piccoli con percorsi dedicati, acqua e un punto di primo soccorso canino, è lo spazio di riferimento senza guinzaglio del centro storico, a pochi passi dal Castello Sforzesco. Secondo il regolamento milanese, i cani corrono senza guinzaglio all'interno della recinzione.`,
  },
  {
    citySlug: "modena",
    name: "Parco Ducale Estense",
    neighborhood: "North of centre",
    size: "13 ha",
    photo: "/images/city-places/modena-parks-parco-ducale-estense.jpg",
    descEn: `The city's main park, designed for the Este dukes in the 17th century behind the Palazzo Ducale. Plane trees, ponds, a children's playground and a fenced off-leash dog area in the north-west corner.`,
    descFr: `Le parc principal de la ville, dessiné pour les ducs d'Este au XVIIe s. derrière le Palazzo Ducale. Platanes, étangs, aire de jeux et zone canine clôturée sans laisse dans le coin nord-ouest.`,
    descEs: `El parque principal de la ciudad, diseñado para los duques de Este en el s. XVII tras el Palazzo Ducale. Plátanos, estanques, zona infantil y área canina vallada sin correa en el extremo noroeste.`,
    descDe: `Der Hauptpark der Stadt, im 17. Jahrhundert für die Este-Herzöge hinter dem Palazzo Ducale angelegt. Platanen, Teiche, ein Kinderspielplatz und eine eingezäunte Freilauffläche für Hunde in der nordwestlichen Ecke.`,
    descNl: `Het hoofdpark van de stad, in de 17e eeuw aangelegd voor de hertogen van Este achter het Palazzo Ducale. Platanen, vijvers, een speeltuin en een omheinde losloopzone voor honden in de noordwestelijke hoek.`,
    descIt: `Il parco principale della città, progettato per i duchi d'Este nel XVII secolo dietro il Palazzo Ducale. Platani, stagni, un'area giochi per bambini e un'area cani recintata senza guinzaglio nell'angolo nord-ovest.`,
  },
  {
    citySlug: "modena",
    name: "Parco Novi Sad",
    neighborhood: "North of station",
    size: "23 ha",
    photo: "/images/city-places/modena-parks-parco-novi-sad.jpg",
    descEn: `Modern park built on former rail yards (2009), 23 ha north of the train station. Open lawns, jogging loop, large fenced sgambamento, and the city's main weekend market on Mondays.`,
    descFr: `Parc moderne aménagé sur d'anciennes voies ferrées (2009), 23 ha au nord de la gare. Pelouses dégagées, boucle de jogging, grande zone sgambamento clôturée, et le principal marché du lundi de la ville.`,
    descEs: `Parque moderno construido sobre antiguas vías de tren (2009), 23 ha al norte de la estación. Praderas abiertas, circuito para correr, gran zona sgambamento vallada, y el principal mercado del lunes de la ciudad.`,
    descDe: `Moderner Park auf einem ehemaligen Bahngelände (2009), 23 ha nördlich des Bahnhofs. Offene Rasenflächen, Jogging-Rundweg, eine große eingezäunte Sgambamento-Fläche und der wichtigste Wochenmarkt der Stadt montags.`,
    descNl: `Modern park aangelegd op voormalige spoorterreinen (2009), 23 ha ten noorden van het station. Open gazons, een hardlooprondje, een grote omheinde sgambamento en de belangrijkste weekmarkt van de stad op maandag.`,
    descIt: `Parco moderno realizzato su ex scali ferroviari (2009), 23 ha a nord della stazione. Prati aperti, percorso per la corsa, un grande sgambamento recintato e il principale mercato settimanale della città al lunedì.`,
  },
  {
    citySlug: "montpellier",
    name: "Parc M\u00e9ric \u2014 Grand Caniparc",
    photo: "/images/city-places/montpellier-parks-parc-meric-grand-caniparc.jpg",
    descEn: `Montpellier's best dedicated dog park, a 6,000 m² enclosed off-leash area beside the Lez River with canine play equipment, benches, and shaded areas. The riverside setting is beautiful and the park itself is one of the largest purpose-built dog spaces in southern France, popular`,
    descFr: `Le meilleur parc canin de Montpellier, un espace hors laisse clôturé de 6 000 m² en bordure du Lez avec des équipements canins, des bancs et des zones ombragées. Le cadre en bord de rivière est magnifique et le parc lui-même est l'un des plus grands espaces canins aménagés du su`,
    descEs: `El mejor parque canino de Montpellier: una zona sin correa de 6.000 m² junto al río Lez con equipamiento canino, bancos y zonas con sombra. El entorno fluvial es precioso y el parque en sí es uno de los mayores espacios caninos de uso específico del sur de Francia, frecuentado di`,
    descDe: `Montpelliers bester eigener Hundepark, eine 6.000 m² große eingezäunte Freilauffläche am Ufer des Lez mit Spielgeräten für Hunde, Bänken und schattigen Bereichen. Die Lage am Fluss ist wunderschön, und der Park selbst ist eine der größten eigens angelegten Hundeflächen Südfrankreichs, beliebt be`,
    descNl: `Montpelliers beste eigen hondenpark, een 6.000 m² grote omheinde losloopzone langs de Lez met speeltoestellen voor honden, bankjes en schaduwrijke plekken. De ligging aan de rivier is prachtig en het park zelf is een van de grootste speciaal voor honden aangelegde ruimtes in Zuid-Frankrijk, populair bij bezoekers uit de hele stad.`,
    descIt: `Il miglior parco cani dedicato di Montpellier, un'area senza guinzaglio recintata di 6.000 m² lungo il fiume Lez con attrezzature di gioco per cani, panchine e zone d'ombra. L'ambientazione fluviale è splendida e il parco stesso è uno dei più grandi spazi appositamente costruiti per cani della Francia meridionale, frequentato da visitatori di tutta la città.`,
  },
  {
    citySlug: "montpellier",
    name: "Berges du Lez \u2014 Riverside Walk",
    photo: "/images/city-places/montpellier-parks-berges-du-lez-riverside-walk.jpg",
    descEn: `The banks of the Lez River running through Montpellier offer several kilometres of walking path with off-leash sections where dogs can cool off in the water. The Montcalm and Aiguelongue sections are particularly popular and have formal caniparcs nearby, a complete loop through `,
    descFr: `Les berges du Lez traversant Montpellier offrent plusieurs kilomètres de chemin de promenade avec des sections hors laisse où les chiens peuvent se rafraîchir dans l'eau. Les sections Montcalm et Aiguelongue sont particulièrement populaires et disposent de caniparcs à proximité,`,
    descEs: `Las orillas del río Lez que atraviesa Montpellier ofrecen varios kilómetros de caminos con zonas sin correa donde los perros pueden refrescarse en el agua. Los tramos de Montcalm y Aiguelongue son especialmente populares y tienen caniparcs cercanos: un recorrido completo por amba`,
    descDe: `Die Ufer des Lez, der durch Montpellier fließt, bieten mehrere Kilometer Wanderwege mit Freilaufabschnitten, in denen sich Hunde im Wasser abkühlen können. Die Abschnitte Montcalm und Aiguelongue sind besonders beliebt und verfügen über nahegelegene offizielle Caniparcs, eine vollständige Runde durch beid`,
    descNl: `De oevers van de Lez die door Montpellier stromen bieden meerdere kilometers wandelpad met aanlijnvrije gedeeltes waar honden kunnen afkoelen in het water. De gedeeltes Montcalm en Aiguelongue zijn bijzonder populair en hebben formele caniparcs in de buurt, een volledige rondgang langs beide oevers.`,
    descIt: `Le rive del fiume Lez che attraversano Montpellier offrono diversi chilometri di sentiero con tratti senza guinzaglio dove i cani possono rinfrescarsi nell'acqua. I tratti di Montcalm e Aiguelongue sono particolarmente popolari e hanno caniparc formali nelle vicinanze, un giro completo lungo entrambe le sponde.`,
  },
  {
    citySlug: "munich",
    name: "Englischer Garten",
    photo: "/images/city-places/munich-parks-englischer-garten.jpg",
    descEn: `At 373 hectares, the Englischer Garten is larger than Central Park and one of the world's great urban parks. For dogs, it is the ultimate Munich destination: multiple designated off-leash areas, the Isar river and Eisbach stream for swimming, the famous artificial surf wave, and `,
    descFr: `Avec 373 hectares, l'Englischer Garten est plus grand que Central Park et l'un des grands parcs urbains du monde. Pour les chiens, c'est la destination ultime à Munich : plusieurs zones de liberté désignées, la rivière Isar et le ruisseau Eisbach pour la baignade, la célèbre vagu`,
    descEs: `Con 373 hectáreas, el Englischer Garten es más grande que el Central Park y uno de los grandes parques urbanos del mundo. Para los perros, es el destino definitivo en Múnich: múltiples zonas sin correa designadas, el río Isar y el arroyo Eisbach para nadar, la famosa ola de surf `,
    descDe: `Mit 373 Hektar ist der Englische Garten größer als der Central Park und einer der großen Stadtparks der Welt. Für Hunde ist er das ultimative Ziel in München: mehrere ausgewiesene Freilaufzonen, die Isar und der Eisbach zum Schwimmen, die berühmte künstliche Surfwelle, un`,
    descNl: `Met 373 hectare is de Englischer Garten groter dan Central Park en een van de grote stadsparken ter wereld. Voor honden is het de ultieme bestemming in München: meerdere aangewezen losloopgebieden, de rivier de Isar en de beek Eisbach om te zwemmen, de beroemde kunstmatige surfgolf, en volop schaduw.`,
    descIt: `Con 373 ettari, l'Englischer Garten è più grande di Central Park ed è uno dei grandi parchi urbani del mondo. Per i cani è la destinazione definitiva a Monaco: molteplici aree senza guinzaglio designate, il fiume Isar e il ruscello Eisbach per nuotare, la famosa onda artificiale da surf, e tanta ombra.`,
  },
  {
    citySlug: "nantes",
    name: "Parc de Proc\u00e9",
    neighborhood: "Proc\u00e9 / Dervalli\u00e8res",
    photo: "/images/city-places/nantes-parks-parc-de-proce.jpg",
    descEn: `Nantes' most beloved dog park has an official caniparc (fenced off-leash area) and sweeping lawns where dogs can run freely in designated zones, just 15 minutes on foot from the city centre. Tree-lined alleys, a rose garden, and scenic views over a tributary of the Erdre make it `,
    descFr: `Le parc pour chiens le plus apprécié de Nantes dispose d'un caniparc officiel (zone close sans laisse) et de grandes pelouses où les chiens peuvent courir librement dans les zones désignées, à 15 minutes à pied du centre-ville. Les allées bordées d'arbres, la roseraie et les vues`,
    descEs: `El parque para perros más querido de Nantes tiene un caniparc oficial (zona vallada sin correa) y amplias praderas donde los perros pueden correr en las zonas designadas, a 15 minutos a pie del centro. Los paseos arbolados, el jardín de rosas y las vistas sobre un afluente del Er`,
    descDe: `Nantes' beliebtester Hundepark verfügt über einen offiziellen Caniparc (eingezäunte Freilauffläche) und weite Rasenflächen, auf denen Hunde in ausgewiesenen Zonen frei laufen können, nur 15 Gehminuten vom Stadtzentrum entfernt. Baumgesäumte Alleen, ein Rosengarten und malerische Ausblicke auf einen Nebenarm der Er`,
    descNl: `Nantes' meest geliefde hondenpark heeft een officiële caniparc (omheind losloopgebied) en weidse gazons waar honden vrij mogen rennen in de aangewezen zones, op slechts 15 minuten lopen van het centrum. Met bomen omzoomde lanen, een rozentuin en fraaie uitzichten over een zijtak van de Erdre maken het tot een favoriet.`,
    descIt: `Il parco per cani più amato di Nantes ha un caniparc ufficiale (area recintata senza guinzaglio) e ampi prati dove i cani possono correre liberamente nelle zone designate, a soli 15 minuti a piedi dal centro città. Viali alberati, un roseto e viste suggestive su un affluente dell'Erdre lo rendono un preferito.`,
  },
  {
    citySlug: "nantes",
    name: "Parc Naturel de Beaulieu",
    neighborhood: "\u00cele de Nantes / Beaulieu",
    photo: "/images/city-places/nantes-parks-parc-naturel-de-beaulieu.jpg",
    descEn: `A vast natural meadow along the Loire River on Île Beaulieu, described as the last testament of Loire's humid meadows, with a new caniparc opened in January 2025. Wild grassy expanses and riverside views of the Loire make it perfect for a free-running session away from the city`,
    descFr: `Un vaste espace naturel le long de la Loire sur l'Île Beaulieu, décrit comme le dernier témoignage des prairies humides de la Loire, avec un nouveau caniparc ouvert en janvier 2025. Grandes étendues sauvages et vues sur la Loire en font l'endroit idéal pour une session en liber`,
    descEs: `Un vasto espacio natural junto al Loira en la Île Beaulieu, descrito como el último testimonio de las praderas húmedas del Loira, con un nuevo caniparque inaugurado en enero de 2025. Las extensiones de hierba salvaje y las vistas del Loira lo hacen perfecto para una sesión de c`,
    descDe: `Eine weitläufige Naturwiese entlang der Loire auf der Île Beaulieu, beschrieben als letztes Zeugnis der feuchten Loire-Wiesen, mit einem neuen Caniparc, der im Januar 2025 eröffnet wurde. Wilde Graslandschaften und Flussblicke auf die Loire machen sie perfekt für eine Freilaufsession fernab der Sta`,
    descNl: `Een uitgestrekte natuurlijke weide langs de Loire op het Île Beaulieu, omschreven als het laatste overblijfsel van de vochtige Loire-weiden, met een nieuwe caniparc die in januari 2025 werd geopend. Wilde grasvlaktes en uitzichten over de Loire maken het de perfecte plek voor een losloopsessie, ver van de stad.`,
    descIt: `Un vasto prato naturale lungo la Loira sull'Île Beaulieu, descritto come l'ultima testimonianza dei prati umidi della Loira, con un nuovo caniparc aperto nel gennaio 2025. Distese erbose selvagge e viste sulla Loira lo rendono perfetto per una sessione di corsa libera lontano dalla città.`,
  },
  {
    citySlug: "naples",
    name: "Parco Virgiliano",
    neighborhood: "Posillipo",
    size: "9 ha / 22 acres",
    photo: "/images/city-places/naples-parks-parco-virgiliano.jpg",
    descEn: `A terraced cliff-top park on Posillipo offering some of the most spectacular views in Naples, Vesuvius, the Gulf, and the islands of Procida, Ischia and Capri. Wide paved walking loops, benches, shaded pine avenues, and an Area Cani fenced dog run near the upper terrace.`,
    descFr: `Parc en terrasses au sommet de la falaise de Posillipo, offrant certaines des plus belles vues de Naples, Vésuve, Golfe et îles de Procida, Ischia et Capri. Vastes boucles pavées, bancs, allées ombragées de pins et une Area Cani clôturée près de la terrasse supérieure.`,
    descEs: `Parque en terrazas en lo alto del acantilado de Posillipo que ofrece algunas de las vistas más espectaculares de Nápoles, Vesubio, Golfo e islas de Procida, Ischia y Capri. Amplios circuitos pavimentados, bancos, avenidas sombreadas de pinos y un Area Cani vallada cerca de la te`,
    descDe: `Ein terrassierter Klippenpark auf Posillipo mit einigen der spektakulärsten Ausblicke Neapels, auf den Vesuv, den Golf und die Inseln Procida, Ischia und Capri. Breite gepflasterte Rundwege, Bänke, schattige Pinienalleen und ein eingezäunter Area-Cani-Hundeauslauf nahe der oberen Terrasse.`,
    descNl: `Een terrasvormig klifpark op Posillipo met enkele van de meest spectaculaire uitzichten van Napels, op de Vesuvius, de golf en de eilanden Procida, Ischia en Capri. Brede geplaveide wandelrondjes, bankjes, schaduwrijke dennenlanen en een omheind Area Cani-hondenrenveld bij het bovenste terras.`,
    descIt: `Un parco a terrazze sulla scogliera di Posillipo che offre alcune delle viste più spettacolari di Napoli, sul Vesuvio, sul Golfo e sulle isole di Procida, Ischia e Capri. Ampi percorsi pavimentati, panchine, viali ombreggiati di pini e un'Area Cani recintata vicino alla terrazza superiore.`,
  },
  {
    citySlug: "nuremberg",
    name: "Stadtpark N\u00fcrnberg",
    neighborhood: "North of Altstadt",
    size: "35 ha",
    photo: "/images/city-places/nuremberg-parks-stadtpark-nurnberg.jpg",
    descEn: `Nuremberg's main central park, laid out 1903–1905 on the site of old defensive ditches. Plane trees, rose garden, ponds, and a small fenced dog meadow in the western corner. 10 min walk north of the Altstadt.`,
    descFr: `Le parc central principal de Nuremberg, aménagé entre 1903 et 1905 sur d'anciens fossés défensifs. Platanes, roseraie, étangs et petite prairie canine clôturée dans le coin ouest. 10 min à pied au nord de l'Altstadt.`,
    descEs: `El parque central principal de Núremberg, trazado entre 1903 y 1905 sobre antiguos fosos defensivos. Plátanos, rosaleda, estanques y pequeña pradera canina vallada en el rincón oeste. 10 min a pie al norte de la Altstadt.`,
    descDe: `Nürnbergs zentraler Hauptpark, 1903-1905 auf dem Gelände alter Verteidigungsgräben angelegt. Platanen, Rosengarten, Teiche und eine kleine eingezäunte Hundewiese in der westlichen Ecke. 10 Gehminuten nördlich der Altstadt.`,
    descNl: `Neurenbergs belangrijkste centrale park, aangelegd tussen 1903 en 1905 op de plek van oude verdedigingsgrachten. Platanen, rozentuin, vijvers en een kleine omheinde hondenweide in de westelijke hoek. 10 minuten lopen ten noorden van de Altstadt.`,
    descIt: `Il parco centrale principale di Norimberga, realizzato tra il 1903 e il 1905 sul sito di antichi fossati difensivi. Platani, roseto, stagni e un piccolo prato per cani recintato nell'angolo occidentale. 10 minuti a piedi a nord dell'Altstadt.`,
  },
  {
    citySlug: "oxford",
    name: "University Parks",
    neighborhood: "Norham Manor",
    size: "37 hectares",
    photo: "/images/city-places/oxford-parks-university-parks.jpg",
    descEn: `37 hectares of grassland and woodland between the Cherwell and Parks Road, owned by Oxford University and open free to the public, King Charles II walked his dogs here in the 1680s. Dogs must stay on a lead at all times and are excluded from the cricket pitch enclosure in the ce`,
    descFr: `37 hectares de pelouses et bois entre le Cherwell et Parks Road, propriété de l'Université d'Oxford et ouverts gratuitement au public, le roi Charles II y promenait ses chiens dans les années 1680. Les chiens doivent rester en laisse en permanence et sont exclus de l'enclos du t`,
    descEs: `37 hectáreas de césped y bosque entre el Cherwell y Parks Road, propiedad de la Universidad de Oxford y abiertas gratis al público, el rey Carlos II paseaba aquí a sus perros en la década de 1680. Los perros deben llevar correa en todo momento y están excluidos del recinto del c`,
    descDe: `37 Hektar Wiesen und Wald zwischen dem Cherwell und der Parks Road, im Besitz der Universität Oxford und kostenlos für die Öffentlichkeit zugänglich; König Karl II. führte hier in den 1680er Jahren seine Hunde aus. Hunde müssen jederzeit an der Leine bleiben und sind vom eingezäunten Kricketfeld in der Mit`,
    descNl: `37 hectare grasland en bos tussen de Cherwell en Parks Road, eigendom van de universiteit van Oxford en gratis toegankelijk voor het publiek; koning Karel II liet hier in de jaren 1680 zijn honden uit. Honden moeten voortdurend aangelijnd blijven en zijn uitgesloten van het omheinde cricketveld in het midden.`,
    descIt: `37 ettari di prati e boschi tra il Cherwell e Parks Road, di proprietà dell'Università di Oxford e aperti gratuitamente al pubblico; re Carlo II vi portava a passeggiare i suoi cani negli anni 1680. I cani devono restare al guinzaglio in ogni momento e sono esclusi dal recinto del campo da cricket al centro.`,
  },
  {
    citySlug: "palma",
    name: "Parc de Krekovic",
    neighborhood: "Son Armadans",
    photo: "/images/city-places/palma-parks-parc-de-krekovic.jpg",
    descEn: `Parc de Krekovic is a tranquil residential park in the Son Armadans neighbourhood, a short walk from Castell de Bellver. It features a dedicated enclosed dog run (pipican) which is genuinely off-leash, making it one of the better urban parks in Palma for dogs to socialise freely.`,
    descFr: `Le Parc de Krekovic est un parc résidentiel tranquille dans le quartier de Son Armadans, à deux pas du Castell de Bellver. Il dispose d'un espace canin clôturé (pipican) réellement sans laisse, ce qui en fait l'un des meilleurs parcs urbains de Palma pour la socialisation des chi`,
    descEs: `El Parc de Krekovic es un tranquilo parque residencial en el barrio de Son Armadans, a poca distancia del Castell de Bellver. Cuenta con un pipican cerrado genuinamente sin correa, lo que lo convierte en uno de los mejores parques urbanos de Palma para que los perros socialicen l`,
    descDe: `Der Parc de Krekovic ist ein ruhiger Wohnpark im Viertel Son Armadans, nur einen kurzen Spaziergang vom Castell de Bellver entfernt. Er verfügt über einen eigenen umzäunten Hundeauslauf (pipican), der tatsächlich ohne Leine genutzt werden kann, was ihn zu einem der besseren Stadtparks Palmas macht, in dem Hunde frei sozialisieren können.`,
    descNl: `Parc de Krekovic is een rustig woonpark in de wijk Son Armadans, op korte wandelafstand van Castell de Bellver. Het beschikt over een eigen omheind hondenrenveld (pipican) dat echt aanlijnvrij is, waardoor het een van de betere stadsparken van Palma is voor honden om vrij te socialiseren.`,
    descIt: `Il Parc de Krekovic è un tranquillo parco residenziale nel quartiere di Son Armadans, a breve distanza a piedi dal Castell de Bellver. Dispone di un'area cani recintata dedicata (pipican) che è realmente senza guinzaglio, il che ne fa uno dei migliori parchi urbani di Palma per far socializzare liberamente i cani.`,
  },
  {
    citySlug: "paris",
    name: "Caniparc des Épinettes",
    neighborhood: "Les Épinettes (17e)",
    photo: "/images/city-places/paris-parks-caniparc-des-epinettes.jpg",
    descEn: `One of the largest fully enclosed caniparcs inside Paris proper, in the Épinettes quarter of the 17th arrondissement, with separate fenced areas for small and large dogs. Wood-chip and earth ground, benches and shade, and entry is free like every Paris caniparc. A secure off-leash option in a dense northern neighbourhood, near the Porte de Clichy transport hub.`,
    descFr: `L'un des plus grands caniparcs entièrement clos de Paris intra-muros, dans le quartier des Épinettes (17e arrondissement), avec des zones clôturées séparées pour petits et grands chiens. Sol en copeaux de bois et terre, bancs et ombre, et l'accès est gratuit comme dans tous les caniparcs parisiens. Une option sans laisse sécurisée dans un quartier dense du nord, près du pôle de transports de la Porte de Clichy.`,
    descEs: `Uno de los mayores caniparcs totalmente cerrados de París capital, en el barrio de Les Épinettes (distrito 17), con zonas valladas separadas para perros pequeños y grandes. Suelo de virutas de madera y tierra, bancos y sombra, y la entrada es gratuita como en todos los caniparcs parisinos. Una opción sin correa segura en un denso barrio del norte, cerca del intercambiador de Porte de Clichy.`,
    descDe: `Einer der größten vollständig eingezäunten Caniparcs innerhalb von Paris intra-muros, im Viertel Épinettes des 17. Arrondissements, mit getrennten eingezäunten Bereichen für kleine und große Hunde. Boden aus Holzschnitzeln und Erde, Bänke und Schatten, und der Eintritt ist kostenlos wie bei jedem Pariser Caniparc. Eine sichere Freilaufoption in einem dicht besiedelten nördlichen Viertel, nahe dem Verkehrsknotenpunkt Porte de Clichy.`,
    descNl: `Een van de grootste volledig omsloten caniparcs binnen Parijs zelf, in de wijk Épinettes van het 17e arrondissement, met gescheiden omheinde zones voor kleine en grote honden. Bodem van houtsnippers en aarde, bankjes en schaduw, en toegang is gratis zoals bij elke Parijse caniparc. Een veilige losloopoptie in een dichtbevolkte noordelijke wijk, vlak bij het vervoersknooppunt Porte de Clichy.`,
    descIt: `Uno dei più grandi caniparc completamente recintati all'interno di Parigi intra-muros, nel quartiere degli Épinettes del 17° arrondissement, con aree recintate separate per cani piccoli e grandi. Terreno in trucioli di legno e terra, panchine e ombra, e l'ingresso è gratuito come in ogni caniparc parigino. Un'opzione sicura senza guinzaglio in un denso quartiere del nord, vicino allo snodo dei trasporti di Porte de Clichy.`,
  },
  {
    citySlug: "pisa",
    name: "Parco Pinerolo Stazione",
    neighborhood: "Behind Pisa Centrale station",
    size: "Small fenced enclosure (~0.2 hectare)",
    photo: "/images/city-places/pisa-parks-parco-pinerolo-stazione.jpg",
    descEn: `A small but useful neighbourhood park behind Pisa Centrale, the city's only fully fenced municipal area dedicated to dogs. Off-leash inside the enclosure with benches and water taps; the wider park around it requires a leash. The location is ideal for a dog stretch between trains`,
    descFr: `Petit parc de quartier mais utile derrière la gare Centrale, seul espace municipal entièrement clôturé dédié aux chiens à Pise. Sans laisse à l'intérieur de l'enclos, avec bancs et robinets ; le parc autour exige la laisse. Emplacement idéal pour dégourdir un chien entre deux tra`,
    descEs: `Pequeño parque de barrio pero útil detrás de la estación Centrale, el único espacio municipal totalmente vallado dedicado a perros en Pisa. Sin correa dentro del recinto, con bancos y fuentes; el parque alrededor exige correa. Ubicación ideal para que el perro estire las patas en`,
    descDe: `Ein kleiner, aber nützlicher Stadtteilpark hinter dem Bahnhof Pisa Centrale, die einzige vollständig eingezäunte städtische Fläche der Stadt, die Hunden vorbehalten ist. Ohne Leine innerhalb des Geheges mit Bänken und Wasserzapfstellen; der umliegende Park verlangt eine Leine. Der Standort ist ideal, um den Hund zwischen zwei Zügen zu bewege`,
    descNl: `Een klein maar handig buurtpark achter station Pisa Centrale, de enige volledig omheinde gemeentelijke ruimte van de stad die aan honden is gewijd. Loslopen binnen de omheining met bankjes en waterkranen; het bredere park eromheen vereist een lijn. De locatie is ideaal om de hond even te laten bewegen tussen twee treinen door.`,
    descIt: `Un piccolo ma utile parco di quartiere dietro la stazione di Pisa Centrale, l'unica area comunale completamente recintata dedicata ai cani in città. Senza guinzaglio all'interno del recinto, con panchine e fontanelle d'acqua; il parco più ampio attorno richiede il guinzaglio. La posizione è ideale per sgranchire il cane tra un treno e l'altro.`,
  },
  {
    citySlug: "porto",
    name: "Parque das Virtudes",
    neighborhood: "Ribeira / Bairro de Miragaia",
    photo: "/images/city-places/porto-parks-parque-das-virtudes.jpg",
    descEn: `A multi-terraced park high above the Douro River in one of Porto's oldest neighbourhoods. The park has a fully fenced off-leash dog enclosure with a double-gated entrance and a small pool where dogs can cool off in summer. The viewpoint terraces overlook the rooftops of Ribeira a`,
    descFr: `Un parc en terrasses dominant le Douro dans l'un des quartiers les plus anciens de Porto. Il dispose d'un espace canin entièrement clôturé avec une entrée à double portail et un bassin où les chiens peuvent se rafraîchir en été. Les terrasses panoramiques surplombent les toits de`,
    descEs: `Un parque en terrazas elevado sobre el Duero en uno de los barrios más antiguos de Oporto. El parque cuenta con un recinto canino completamente vallado, con entrada de doble portón para mayor seguridad, y un pequeño estanque donde los perros pueden refrescarse en verano. Las terr`,
    descDe: `Ein mehrfach terrassierter Park hoch über dem Douro in einem der ältesten Viertel Portos. Der Park verfügt über ein vollständig eingezäuntes Hundegehege mit doppelter Toranlage und einem kleinen Becken, in dem sich Hunde im Sommer abkühlen können. Die Aussichtsterrassen blicken über die Dächer von Ribeira und de`,
    descNl: `Een uit meerdere terrassen bestaand park hoog boven de Douro in een van de oudste wijken van Porto. Het park heeft een volledig omheind aanlijnvrij hondengehege met een dubbele toegangspoort en een klein bassin waar honden 's zomers kunnen afkoelen. De uitzichtterrassen kijken uit over de daken van Ribeira en de rivier.`,
    descIt: `Un parco a più terrazze alto sopra il fiume Douro in uno dei quartieri più antichi di Porto. Il parco ha un recinto per cani completamente chiuso senza guinzaglio, con ingresso a doppio cancello e una piccola vasca dove i cani possono rinfrescarsi d'estate. Le terrazze panoramiche affacciano sui tetti di Ribeira e sul fiume.`,
  },
  {
    citySlug: "prague",
    name: "Psí hřiště Podolské nábřeží",
    neighborhood: "Podolí (Prague 4)",
    photo: "/images/city-places/prague-parks-psi-hriste-podolske-nabrezi.jpg",
    descEn: `Prague's first agility dog playground, a fenced enclosure on Podolské nábřeží on the right bank of the Vltava in Prague 4 (Podolí), entered through double gates. Inside are obstacles, jumps and a balance beam on soft ground, and the riverside setting keeps it shaded and breezy. Trams along the embankment stop nearby.`,
    descFr: `Le premier terrain d'agility pour chiens de Prague, un enclos clôturé sur le Podolské nábřeží, sur la rive droite de la Vltava à Prague 4 (Podolí), avec entrée à double portillon. À l'intérieur : obstacles, sauts et poutre d'équilibre sur sol souple, et le bord de rivière le maintient ombragé et aéré. Les tramways du quai s'arrêtent tout près.`,
    descEs: `El primer parque de agility para perros de Praga, un recinto vallado en el Podolské nábřeží, en la orilla derecha del Moldava en Praga 4 (Podolí), con entrada de doble puerta. Dentro hay obstáculos, saltos y una barra de equilibrio sobre suelo blando, y la ubicación junto al río lo mantiene sombreado y ventilado. Los tranvías del malecón paran muy cerca.`,
    descDe: `Prags erster Agility-Spielplatz für Hunde, ein eingezäuntes Gehege am Podolské nábřeží am rechten Moldauufer in Prag 4 (Podolí), mit Zugang durch ein doppeltes Tor. Im Inneren gibt es Hindernisse, Sprünge und einen Balancierbalken auf weichem Untergrund, und die Lage am Fluss hält es schattig und luftig. Straßenbahnen entlang des Ufers halten ganz in der Nähe.`,
    descNl: `Praags eerste agility-speelplaats voor honden, een omheind gehege aan de Podolské nábřeží op de rechteroever van de Moldau in Praag 4 (Podolí), toegankelijk via een dubbele poort. Binnen zijn er obstakels, sprongen en een balanceerbalk op zachte ondergrond, en de ligging aan de rivier houdt het schaduwrijk en winderig. Trams langs de kade stoppen vlakbij.`,
    descIt: `Il primo campo di agility per cani di Praga, un recinto sul Podolské nábřeží, sulla riva destra della Moldava a Praga 4 (Podolí), con accesso a doppio cancello. All'interno ostacoli, salti e una trave di equilibrio su terreno morbido, e la posizione sul fiume lo mantiene ombreggiato e ventilato. I tram lungo l'argine fermano nelle vicinanze.`,
  },
  {
    citySlug: "reims",
    name: "Parc de Champagne",
    neighborhood: "Centre south",
    size: "22 hectares",
    photo: "/images/city-places/reims-parks-parc-de-champagne.jpg",
    descEn: `22-hectare landscaped park immediately south of the cathedral. Fenced dog zone in the south-east corner.`,
    descFr: `Parc paysage de 22 hectares au sud de la cathedrale. Zone canine cloturee au coin sud-est.`,
    descEs: `Parque paisajistico de 22 hectareas al sur de la catedral. Zona canina vallada en la esquina sureste.`,
    descDe: `22 Hektar großer Landschaftspark direkt südlich der Kathedrale. Eingezäunte Hundezone in der südöstlichen Ecke.`,
    descNl: `22 hectare groot landschapspark direct ten zuiden van de kathedraal. Omheinde hondenzone in de zuidoostelijke hoek.`,
    descIt: `Parco paesaggistico di 22 ettari immediatamente a sud della cattedrale. Zona canina recintata nell'angolo sud-est.`,
  },
  {
    citySlug: "riga",
    name: "Lucavsala Recreational Park & Dog Area",
    photo: "/images/city-places/riga-parks-lucavsala-recreational-park-dog-area.jpg",
    descEn: `Lucavsala is a river island in the Daugava, reachable via the Salu Bridge. The northern part of the island hosts what the municipality designates as the largest dog walking park in Riga, a fenced off-leash area adjacent to a riverside swimming spot where dogs can enter the water`,
    descFr: `Lucavsala est une île fluviale dans la Daugava, accessible via le pont Salu. La partie nord de l'île abrite ce que la municipalité désigne comme le plus grand parc de promenade pour chiens de Riga, une zone sans laisse clôturée adjacente à un point de baignade en rivière où les `,
    descEs: `Lucavsala es una isla fluvial en el Daugava, accesible a través del puente Salu. La parte norte de la isla alberga lo que el municipio designa como el mayor parque de paseo para perros de Riga, un área cercada sin correa adyacente a un punto de baño en el río donde los perros pu`,
    descDe: `Lucavsala ist eine Flussinsel in der Daugava, erreichbar über die Salu-Brücke. Der nördliche Teil der Insel beherbergt das, was die Stadtverwaltung als den größten Hundeauslaufpark Rigas bezeichnet, eine eingezäunte Freilauffläche neben einem Badeplatz am Fluss, wo Hunde ins Wasser gehen könne`,
    descNl: `Lucavsala is een riviereiland in de Daugava, bereikbaar via de Salubrug. Het noordelijke deel van het eiland herbergt wat de gemeente aanduidt als het grootste hondenuitlaatpark van Riga, een omheind losloopgebied naast een zwemplek aan de rivier waar honden het water in kunnen.`,
    descIt: `Lucavsala è un'isola fluviale nella Daugava, raggiungibile tramite il ponte Salu. La parte settentrionale dell'isola ospita quello che il comune definisce il più grande parco per il passeggio dei cani di Riga, un'area senza guinzaglio recintata adiacente a un punto balneabile sul fiume dove i cani possono entrare in acqua.`,
  },
  {
    citySlug: "riga",
    name: "Viesturd\u0101rzs Dog Park",
    photo: "/images/city-places/riga-parks-viesturdarzs-dog-park.jpg",
    descEn: `One of Riga's best equipped urban dog parks, located across from the historic Viesturdārzs park near Eksporta iela. The fenced enclosure features a full agility course, table, barriers, soft tunnel, walls, arrows, making it a favourite for owners who want to train or simply let`,
    descFr: `L'un des parcs canins urbains les mieux équipés de Riga, situé en face du parc historique Viesturdārzs près d'Eksporta iela. L'enclos clôturé comprend un parcours d'agilité complet, table, barrières, tunnel souple, murs, flèches, ce qui en fait un favori pour les propriétaires `,
    descEs: `Uno de los mejores parques caninos urbanos de Riga, situado frente al histórico parque Viesturdārzs cerca de Eksporta iela. El recinto cercado cuenta con un circuito de agilidad completo, mesa, barreras, túnel blando, paredes, flechas, lo que lo convierte en el favorito de los `,
    descDe: `Einer der bestausgestatteten Stadthundeparks Rigas, gegenüber dem historischen Park Viesturdārzs nahe der Eksporta iela gelegen. Das eingezäunte Gehege verfügt über einen kompletten Agility-Parcours mit Tisch, Hindernissen, weichem Tunnel, Wänden und Pfeilen, was ihn zum Favoriten für Halter macht, die `,
    descNl: `Een van de best uitgeruste stedelijke hondenparken van Riga, gelegen tegenover het historische park Viesturdārzs bij de Eksporta iela. De omheinde ruimte beschikt over een volledig agility-parcours met tafel, hindernissen, zachte tunnel, muren en pijlen, wat het een favoriet maakt bij baasjes die willen trainen of hun hond gewoon willen laten loslopen.`,
    descIt: `Uno dei parchi cani urbani meglio attrezzati di Riga, situato di fronte allo storico parco Viesturdārzs vicino a Eksporta iela. Il recinto dispone di un percorso di agility completo, con tavolo, barriere, tunnel morbido, muri e frecce, il che lo rende un favorito tra i padroni che vogliono addestrare o semplicemente far correre il proprio cane.`,
  },
  {
    citySlug: "riga",
    name: "Gr\u012bzi\u0146kalns Park Dog Area",
    photo: "/images/city-places/riga-parks-grizinkalns-park-dog-area.jpg",
    descEn: `A neighbourhood park in central Riga on Pērnavas iela with a specially equipped fenced enclosure for dogs, featuring obstacles and training equipment. Popular with local dog owners for evening runs. The surrounding Grīziņkalns hill area is one of Riga's older neighbourhoods with `,
    descFr: `Un parc de quartier dans le centre de Riga sur Pērnavas iela avec un enclos spécialement équipé et clôturé pour les chiens, comprenant des obstacles et des équipements d'entraînement. Populaire auprès des propriétaires de chiens locaux pour les courses du soir. La zone environnan`,
    descEs: `Un parque de barrio en el centro de Riga en Pērnavas iela con un recinto cercado especialmente equipado para perros, con obstáculos y equipos de entrenamiento. Popular entre los dueños de perros locales para las carreras de tarde. La zona circundante de la colina Grīziņkalns es u`,
    descDe: `Ein Stadtteilpark im Zentrum Rigas an der Pērnavas iela mit einem speziell ausgestatteten eingezäunten Hundegehege, mit Hindernissen und Trainingsgeräten. Bei lokalen Hundehaltern beliebt für abendliche Ausläufe. Das umliegende Hügelviertel Grīziņkalns ist eines der älteren Viertel Rigas mit e`,
    descNl: `Een buurtpark in het centrum van Riga aan de Pērnavas iela met een speciaal uitgerust omheind hondengehege, met obstakels en trainingsmateriaal. Populair bij lokale hondenbezitters voor avondrondjes. De omliggende heuvelwijk Grīziņkalns is een van de oudere wijken van Riga, met een eigen sfeer.`,
    descIt: `Un parco di quartiere nel centro di Riga su Pērnavas iela con un recinto appositamente attrezzato per cani, con ostacoli e attrezzature di allenamento. Popolare tra i padroni di cani locali per le corse serali. La circostante collina di Grīziņkalns è uno dei quartieri più antichi di Riga, con un'atmosfera propria.`,
  },
  {
    citySlug: "rotterdam",
    name: "Zuiderpark \u2014 Hondeneiland",
    neighborhood: "Zuid",
    photo: "/images/city-places/rotterdam-parks-zuiderpark-hondeneiland.jpg",
    descEn: `Rotterdam's largest park (235 ha) contains the 'Hondeneiland' (Dog Island), a fenced off-leash island specifically designed for dogs to play and socialise. Great for dog owners in the south of the city.`,
    descFr: `Le plus grand parc de Rotterdam (235 ha) abrite le 'Hondeneiland' (l'île aux chiens), une île clôturée spécialement conçue pour les jeux et la socialisation canine. Idéal pour les propriétaires du sud de la ville.`,
    descEs: `El parque más grande de Rotterdam (235 ha) alberga el 'Hondeneiland' (isla de los perros): una isla vallada diseñada específicamente para que los perros jueguen y socialicen. Ideal para los dueños del sur de la ciudad.`,
    descDe: `Rotterdams größter Park (235 ha) beherbergt das 'Hondeneiland' (Hundeinsel), eine eingezäunte Freilaufinsel, die speziell für Hunde zum Spielen und Sozialisieren gestaltet wurde. Ideal für Hundehalter im Süden der Stadt.`,
    descNl: `Rotterdams grootste park (235 ha) herbergt het 'Hondeneiland', een omheind losloopeiland dat speciaal is ontworpen zodat honden er kunnen spelen en socialiseren. Ideaal voor hondenbezitters in het zuiden van de stad.`,
    descIt: `Il parco più grande di Rotterdam (235 ha) ospita l'Hondeneiland' (l'Isola dei Cani), un'isola recintata senza guinzaglio progettata appositamente perché i cani giochino e socializzino. Ottimo per i padroni di cani del sud della città.`,
  },
  {
    citySlug: "salamanca",
    name: "Parque de los Jesuitas",
    neighborhood: "South-east of centre",
    size: "13 ha",
    photo: "/images/city-places/salamanca-parks-parque-de-los-jesuitas.jpg",
    descEn: `The largest park in central Salamanca, 13 ha of lawns, mature trees, and a fenced dog area in the south-east corner. Popular with local dog owners morning and evening.`,
    descFr: `Le plus grand parc du centre de Salamanque, 13 ha de pelouses, arbres mûrs et zone canine clôturée dans le coin sud-est. Apprécié des propriétaires locaux matin et soir.`,
    descEs: `El parque más grande del centro de Salamanca, 13 ha de césped, árboles maduros y zona canina vallada en el extremo sureste. Popular entre los dueños locales mañana y tarde.`,
    descDe: `Der größte Park im Zentrum von Salamanca, 13 ha mit Rasenflächen, alten Bäumen und einer eingezäunten Hundefläche in der südöstlichen Ecke. Bei lokalen Hundehaltern morgens und abends beliebt.`,
    descNl: `Het grootste park in het centrum van Salamanca, 13 ha met gazons, oude bomen en een omheinde hondenzone in de zuidoostelijke hoek. Populair bij lokale hondenbezitters, ochtend en avond.`,
    descIt: `Il parco più grande del centro di Salamanca, 13 ha di prati, alberi secolari e un'area cani recintata nell'angolo sud-est. Popolare tra i padroni di cani locali mattina e sera.`,
  },
  {
    citySlug: "san-sebastian",
    name: "Parque Cristina Enea",
    photo: "/images/city-places/san-sebastian-parks-parque-cristina-enea.jpg",
    descEn: `San Sebastián's most elegant park, a 17-hectare woodland donated to the city in 1898 by the Duke of Mandas in memory of his wife. Shaded paths wind through exotic trees, ponds, and peacock enclosures along the river Urumea. Dogs are welcome throughout on leads, and the riverbank`,
    descFr: `Le parc le plus élégant de Saint-Sébastien, un bois de 17 hectares offert à la ville en 1898 par le duc de Mandas en mémoire de son épouse. Des allées ombragées serpentent parmi des arbres exotiques, des étangs et des enclos à paons le long de la rivière Urumea. Les chiens sont `,
    descEs: `El parque más elegante de San Sebastián, un bosque de 17 hectáreas donado a la ciudad en 1898 por el Duque de Mandas en memoria de su esposa. Senderos sombreados serpentean entre árboles exóticos, estanques y recintos de pavos reales a lo largo del río Urumea. Los perros son bie`,
    descDe: `San Sebastiáns eleganteste Parkanlage, ein 17 Hektar großer Waldpark, der der Stadt 1898 vom Herzog von Mandas zum Gedenken an seine Frau geschenkt wurde. Schattige Wege schlängeln sich durch exotische Bäume, Teiche und Pfauengehege entlang des Flusses Urumea. Hunde an der Leine sind überall willkommen, und das Flussufe`,
    descNl: `Het meest elegante park van San Sebastián, een 17 hectare groot bospark dat in 1898 door de hertog van Mandas aan de stad werd geschonken ter nagedachtenis aan zijn vrouw. Schaduwrijke paden slingeren tussen exotische bomen, vijvers en pauwenverblijven langs de rivier de Urumea. Honden aan de lijn zijn overal welkom, en de rivieroever biedt volop wandelplezier.`,
    descIt: `Il parco più elegante di San Sebastián, un bosco di 17 ettari donato alla città nel 1898 dal Duca di Mandas in memoria di sua moglie. Sentieri ombreggiati si snodano tra alberi esotici, stagni e recinti di pavoni lungo il fiume Urumea. I cani sono benvenuti ovunque al guinzaglio, e la riva del fiume offre ampio spazio per passeggiare.`,
  },
  {
    citySlug: "sofia",
    name: "Yuzhen Park (South Park)",
    neighborhood: "Lozenets / Hladilnika",
    size: "70 hectares",
    photo: "/images/city-places/sofia-parks-yuzhen-park-south-park.jpg",
    descEn: `A 70-hectare park south of the centre, famous as the city's most permissive off-leash dog space. Long winding paths, open lawns, two fenced enclosures dedicated to dogs (around Emil Berzinski and Petko Y. Todorov), and a route up to the Vitosha foothills. Trams 4 and 6 stop on th`,
    descFr: `Parc de 70 hectares au sud du centre, célèbre comme l'espace canin le plus souple sans laisse de la ville. Longs sentiers sinueux, pelouses ouvertes, deux enclos clôturés dédiés aux chiens (rues Emil Berzinski et Petko Y. Todorov) et un itinéraire qui rejoint les contreforts du V`,
    descEs: `Parque de 70 hectáreas al sur del centro, famoso como el espacio canino más permisivo sin correa de la ciudad. Largos senderos sinuosos, praderas abiertas, dos recintos vallados dedicados a perros (calles Emil Berzinski y Petko Y. Todorov) y una ruta que llega a las estribaciones`,
    descDe: `Ein 70 Hektar großer Park südlich des Zentrums, bekannt als die freizügigste Freilauffläche der Stadt für Hunde. Lange verschlungene Wege, offene Rasenflächen, zwei eingezäunte Hundegehege (rund um Emil Berzinski und Petko Y. Todorov) und eine Route hinauf zu den Ausläufern des Vitoscha. Die Straßenbahnlinien 4 und 6 halten a`,
    descNl: `Een 70 hectare groot park ten zuiden van het centrum, bekend als de meest hondvriendelijke losloopruimte van de stad. Lange kronkelende paden, open gazons, twee omheinde hondengehegen (rond Emil Berzinski en Petko Y. Todorov) en een route omhoog naar de uitlopers van de Vitosja. Tramlijnen 4 en 6 stoppen in de buurt.`,
    descIt: `Un parco di 70 ettari a sud del centro, famoso come lo spazio senza guinzaglio più permissivo della città per i cani. Lunghi sentieri tortuosi, prati aperti, due recinti dedicati ai cani (attorno a Emil Berzinski e Petko Y. Todorov) e un percorso che sale fino alle pendici del Vitosha. I tram 4 e 6 fermano nei dintorni.`,
  },
  {
    citySlug: "split",
    name: "Pseća plaža Kašjuni",
    neighborhood: "Marjan",
    photo: "/images/city-places/split-parks-pseca-plaza-kasjuni.jpg",
    descEn: `Split's main official off-leash spot for dogs is the fenced dog section of Kašjuni beach, on the wooded western flank of the Marjan peninsula. The enclosure lets dogs swim and play freely by the sea, right beside the main pebble beach and separated from it by rocks, so bring your own water as facilities are minimal. Reachable by bus 12 from the centre or a walk through the Marjan forest park, which itself welcomes leashed dogs year-round.`,
    descFr: `Le principal espace sans laisse officiel de Split est la section canine clôturée de la plage de Kašjuni, sur le flanc ouest boisé de la presqu'île de Marjan. L'enclos permet aux chiens de nager et de jouer librement au bord de la mer, juste à côté de la grande plage de galets dont il est séparé par des rochers, alors prévoyez votre eau car les équipements sont minimes. Accessible par le bus 12 depuis le centre ou à pied à travers le parc forestier de Marjan, qui accueille lui-même les chiens en laisse toute l'année.`,
    descEs: `El principal espacio sin correa oficial de Split es la sección canina vallada de la playa de Kašjuni, en la ladera oeste boscosa de la península de Marjan. El recinto permite que los perros naden y jueguen libremente junto al mar, justo al lado de la gran playa de guijarros de la que lo separan unas rocas, así que lleva tu propia agua porque los servicios son mínimos. Se llega en el autobús 12 desde el centro o caminando por el parque forestal de Marjan, que a su vez admite perros con correa todo el año.`,
    descDe: `Splits wichtigster offizieller Freilaufplatz für Hunde ist der eingezäunte Hundebereich am Strand Kašjuni, an der bewaldeten Westflanke der Halbinsel Marjan. Das Gehege lässt Hunde frei am Meer schwimmen und spielen, direkt neben dem großen Kiesstrand, von dem es durch Felsen getrennt ist, also eigenes Wasser mitbringen, da die Einrichtungen minimal sind. Erreichbar mit dem Bus 12 vom Zentrum oder zu Fuß durch den Waldpark Marjan, der selbst ganzjährig Hunde an der Leine willkommen heißt.`,
    descNl: `Splits belangrijkste officiële aanlijnvrije plek voor honden is het omheinde hondengedeelte van het strand Kašjuni, aan de beboste westflank van het schiereiland Marjan. De omheining laat honden vrij zwemmen en spelen aan zee, vlak naast het grote kiezelstrand waarvan het door rotsen is gescheiden, dus neem zelf water mee want voorzieningen zijn er nauwelijks. Bereikbaar met bus 12 vanuit het centrum of te voet door het bospark Marjan, dat zelf het hele jaar honden aan de lijn verwelkomt.`,
    descIt: `Il principale spazio ufficiale senza guinzaglio per cani a Spalato è la sezione recintata per cani della spiaggia di Kašjuni, sul versante occidentale boscoso della penisola di Marjan. Il recinto permette ai cani di nuotare e giocare liberamente in mare, proprio accanto alla grande spiaggia di ciottoli da cui è separato da rocce, quindi porta la tua acqua perché le strutture sono minime. Raggiungibile con l'autobus 12 dal centro o a piedi attraverso il parco boschivo di Marjan, che a sua volta accoglie i cani al guinzaglio tutto l'anno.`,
  },
  {
    citySlug: "stockholm",
    name: "Tantolunden",
    neighborhood: "S\u00f6dermalm",
    photo: "/images/city-places/stockholm-parks-tantolunden.jpg",
    descEn: `A large park on Södermalm's western waterfront with a designated off-leash dog area (hundrastgård) near the allotment gardens. The park slopes down to Lake Mälaren with lovely views across the water. Popular with locals and their dogs year-round, it is especially lively on summer`,
    descFr: `Un grand parc sur le front de mer ouest de Södermalm avec une zone dog-park (hundrastgård) désignée près des jardins ouvriers. Le parc descend vers le lac Mälaren avec de belles vues sur l'eau. Populaire auprès des locaux et de leurs chiens toute l'année, il est particulièrement `,
    descEs: `Un gran parque en el frente marítimo oeste de Södermalm con una zona designada para perros sin correa (hundrastgård) cerca de los jardines familiares. El parque desciende hasta el lago Mälaren con bonitas vistas al agua. Popular entre los locales y sus perros durante todo el año,`,
    descDe: `Ein großer Park am westlichen Ufer von Södermalm mit einer ausgewiesenen Freilauffläche für Hunde (hundrastgård) nahe den Schrebergärten. Der Park fällt hinunter zum Mälarsee mit herrlichem Blick über das Wasser. Bei Einheimischen und ihren Hunden ganzjährig beliebt, ist er besonders lebhaft an Sommera`,
    descNl: `Een groot park aan de westelijke waterkant van Södermalm met een aangewezen aanlijnvrij hondengebied (hundrastgård) bij de volkstuinen. Het park loopt af naar het meer Mälaren met prachtige uitzichten over het water. Het hele jaar door populair bij lokale bewoners en hun honden, en vooral levendig op zomeravonden.`,
    descIt: `Un grande parco sul lungomare occidentale di Södermalm con un'area designata senza guinzaglio per cani (hundrastgård) vicino agli orti urbani. Il parco degrada verso il lago Mälaren con belle viste sull'acqua. Popolare tra i residenti locali e i loro cani tutto l'anno, è particolarmente animato nelle sere estive.`,
  },
  {
    citySlug: "strasbourg",
    name: "Parc de l'Orangerie",
    neighborhood: "Orangerie / European Quarter",
    photo: "/images/city-places/strasbourg-parks-parc-de-l-orangerie.jpg",
    descEn: `Strasbourg's most beloved park, dating back to the 17th century and adjacent to the European Parliament, features a Napoleon III pavilion, a small deer park with Alsatian storks, a lake, and a miniature train. The 0.3-acre fenced off-leash dog area in the northeast corner of the `,
    descFr: `Le parc le plus aimé de Strasbourg, remontant au XVIIe siècle et jouxtant le Parlement Européen, comprend un pavillon Napoléon III, un petit parc aux cerfs avec des cigognes alsaciennes, un lac et un petit train. L'espace canin clôturé de 1 200 m² dans le coin nord-est est le plu`,
    descEs: `El parque más querido de Estrasburgo, que data del siglo XVII y es adyacente al Parlamento Europeo, cuenta con un pabellón Napoleón III, un pequeño parque de ciervos con cigüeñas alsacianas, un lago y un pequeño tren. La zona vallada sin correa de 1.200 m² en la esquina noreste e`,
    descDe: `Straßburgs beliebtester Park, der auf das 17. Jahrhundert zurückgeht und an das Europäische Parlament grenzt, verfügt über einen Napoleon-III.-Pavillon, einen kleinen Hirschpark mit elsässischen Störchen, einen See und eine Miniatureisenbahn. Die 1.200 m² große eingezäunte Freilauffläche für Hunde in der nordöstlichen Ecke de`,
    descNl: `Straatsburgs meest geliefde park, daterend uit de 17e eeuw en grenzend aan het Europees Parlement, heeft een Napoleon III-paviljoen, een klein hertenpark met Elzasser ooievaars, een meer en een miniatuurtreintje. Het 1.200 m² grote omheinde losloopgebied voor honden in de noordoostelijke hoek van het park is het populairste in de stad.`,
    descIt: `Il parco più amato di Strasburgo, risalente al XVII secolo e adiacente al Parlamento Europeo, presenta un padiglione Napoleone III, un piccolo parco dei cervi con cicogne alsaziane, un lago e un trenino in miniatura. L'area cani recintata senza guinzaglio di 1.200 m² nell'angolo nord-est del parco è la più frequentata della città.`,
  },
  {
    citySlug: "stuttgart",
    name: "Schlossgarten Hundeauslauf",
    neighborhood: "Mitte",
    photo: "/images/city-places/stuttgart-parks-schlossgarten-hundeauslauf.jpg",
    descEn: `The 61-hectare ribbon of Schlossgarten links the city centre to the Neckar at Bad Cannstatt and is the most central walking option. A fenced off-leash meadow (Hundeauslauf) sits in the middle Schlossgarten section between the Eckensee and the Mineralbad Berg.`,
    descFr: `Le ruban du Schlossgarten (61 ha) relie le centre-ville au Neckar à Bad Cannstatt et constitue la promenade la plus centrale. Une prairie clôturée sans laisse (Hundeauslauf) se trouve dans le Mittelschlossgarten, entre l'Eckensee et le Mineralbad Berg.`,
    descEs: `El cinturón del Schlossgarten (61 ha) une el centro con el Neckar en Bad Cannstatt y es la opción de paseo más céntrica. Una pradera vallada sin correa (Hundeauslauf) está en el Schlossgarten medio, entre el Eckensee y el Mineralbad Berg.`,
    descDe: `Das 61 Hektar große Band des Schlossgartens verbindet das Stadtzentrum mit dem Neckar in Bad Cannstatt und ist die zentralste Spazieroption. Eine eingezäunte Freilaufwiese (Hundeauslauf) liegt im Mittleren Schlossgarten zwischen dem Eckensee und dem Mineralbad Berg.`,
    descNl: `Het 61 hectare lange lint van de Schlossgarten verbindt het centrum met de Neckar bij Bad Cannstatt en is de meest centrale wandeloptie. Een omheinde losloopweide (Hundeauslauf) ligt in het middelste gedeelte van de Schlossgarten, tussen de Eckensee en het Mineralbad Berg.`,
    descIt: `Il nastro di 61 ettari dello Schlossgarten collega il centro città al Neckar a Bad Cannstatt ed è l'opzione di passeggiata più centrale. Un prato recintato senza guinzaglio (Hundeauslauf) si trova nella sezione centrale dello Schlossgarten, tra l'Eckensee e il Mineralbad Berg.`,
  },
  {
    citySlug: "tallinn",
    name: "Tiigiveski Park",
    photo: "/images/city-places/tallinn-parks-tiigiveski-park.jpg",
    descEn: `One of Tallinn's best-equipped urban dog parks, located south of the Old Town. Tiigiveski features a proper agility course within its off-leash area, a significant upgrade from a basic fenced enclosure. Popular with local dog owners for training and socialisation. The park is cl`,
    descFr: `L'un des parcs canins urbains les mieux équipés de Tallinn, situé au sud de la vieille ville. Tiigiveski dispose d'un véritable parcours d'agilité dans sa zone de liberté, une amélioration significative par rapport à un simple enclos clôturé. Populaire auprès des propriétaires d`,
    descEs: `Uno de los mejores parques caninos urbanos de Tallinn, ubicado al sur del casco antiguo. Tiigiveski cuenta con un circuito de agilidad completo dentro de su área sin correa, una mejora significativa respecto a un simple recinto cercado. Popular entre los dueños de perros locales`,
    descDe: `Einer der bestausgestatteten Stadthundeparks Tallinns, südlich der Altstadt gelegen. Tiigiveski verfügt über einen richtigen Agility-Parcours innerhalb seiner Freilauffläche, eine deutliche Aufwertung gegenüber einem einfachen eingezäunten Gehege. Bei lokalen Hundehaltern beliebt zum Trainieren und Sozialisieren. Der Park ist g`,
    descNl: `Een van de best uitgeruste stedelijke hondenparken van Tallinn, ten zuiden van de oude stad. Tiigiveski beschikt over een volwaardig agility-parcours binnen zijn losloopgebied, een aanzienlijke verbetering ten opzichte van een eenvoudige omheining. Populair bij lokale hondenbezitters om te trainen en te socialiseren. Het park is goed onderhouden.`,
    descIt: `Uno dei parchi cani urbani meglio attrezzati di Tallinn, situato a sud della città vecchia. Tiigiveski dispone di un vero percorso di agility all'interno della sua area senza guinzaglio, un netto miglioramento rispetto a un semplice recinto. Popolare tra i padroni di cani locali per l'addestramento e la socializzazione. Il parco è ben tenuto.`,
  },
  {
    citySlug: "tampere",
    name: "Kauppi Forest",
    neighborhood: "North-east",
    size: "Approx. 700 hectares",
    photo: "/images/city-places/tampere-parks-kauppi-forest.jpg",
    descEn: `Tampere's largest urban forest, 700 ha of pine and spruce north-east of the centre, 30 km of marked summer hiking and winter cross-country ski trails, 4 fenced koira-aitaus, and direct access to Lake Näsijärvi.`,
    descFr: `La plus grande forêt urbaine de Tampere, 700 ha de pins et d'épicéas au nord-est du centre, 30 km de sentiers de randonnée estivale et de ski de fond hivernal balisés, 4 koira-aitaus clôturés, et accès direct au lac Näsijärvi.`,
    descEs: `El mayor bosque urbano de Tampere, 700 ha de pinos y abetos al noreste del centro, 30 km de senderos balizados de senderismo estival y esquí de fondo invernal, 4 koira-aitaus vallados, y acceso directo al lago Näsijärvi.`,
    descDe: `Tamperes größter Stadtwald, 700 ha Kiefern- und Fichtenwald nordöstlich des Zentrums, 30 km markierte Sommerwander- und Winterloipenwege, 4 eingezäunte koira-aitaus und direkter Zugang zum Näsijärvi-See.`,
    descNl: `Tampere's grootste stadsbos, 700 ha den en spar ten noordoosten van het centrum, 30 km gemarkeerde zomerwandel- en winterlanglaufroutes, 4 omheinde koira-aitaus en directe toegang tot het meer Näsijärvi.`,
    descIt: `Il più grande bosco urbano di Tampere, 700 ha di pini e abeti a nord-est del centro, 30 km di sentieri escursionistici estivi e piste da sci di fondo invernali segnalate, 4 koira-aitaus recintati e accesso diretto al lago Näsijärvi.`,
  },
  {
    citySlug: "toledo",
    name: "Parque de la Vega",
    neighborhood: "North",
    size: "Approx. 13 hectares",
    photo: "/images/city-places/toledo-parks-parque-de-la-vega.jpg",
    descEn: `Toledo's largest urban green space, 13 hectares with fountains, ornamental gardens, the Río Tajo riverside section. Free, dog-friendly with leashed dogs on main paths and a fenced dog zone in the north corner.`,
    descFr: `Le plus grand espace vert urbain de Toledo, 13 hectares avec fontaines, jardins d'agrément, section riveraine du Tage. Gratuit, dog-friendly avec chiens en laisse sur les allées principales et une zone canine clôturée au coin nord.`,
    descEs: `El mayor espacio verde urbano de Toledo, 13 hectáreas con fuentes, jardines ornamentales, sección ribereña del Tajo. Gratis, dog-friendly con perros con correa en los paseos principales y una zona canina vallada en la esquina norte.`,
    descDe: `Toledos größte städtische Grünfläche, 13 Hektar mit Brunnen, Ziergärten und einem Abschnitt am Ufer des Río Tajo. Kostenlos, hundefreundlich mit Hunden an der Leine auf den Hauptwegen und einer eingezäunten Hundezone in der nördlichen Ecke.`,
    descNl: `Toledo's grootste stedelijke groene ruimte, 13 hectare met fonteinen, siertuinen en een gedeelte langs de rivier de Taag. Gratis, hondvriendelijk met honden aan de lijn op de hoofdpaden en een omheinde hondenzone in de noordelijke hoek.`,
    descIt: `Il più grande spazio verde urbano di Toledo, 13 ettari con fontane, giardini ornamentali e un tratto lungo il fiume Tago. Gratuito, adatto ai cani al guinzaglio sui sentieri principali e con un'area canina recintata nell'angolo nord.`,
  },
  {
    citySlug: "toulouse",
    name: "Jardins Compans-Caffarelli",
    photo: "/images/city-places/toulouse-parks-jardins-compans-caffarelli.jpg",
    descEn: `A 7-hectare formal garden near the Toulouse-Matabiau train station with alleys, lawns, and a Japanese garden section. Dogs can walk in the alleys and use the lawns for picnics, though the Japanese garden is restricted. A caniparc (fenced dog area) is available within the garden. `,
    descFr: `Un jardin formel de 7 hectares près de la gare Toulouse-Matabiau avec allées, pelouses et un jardin japonais. Les chiens peuvent se promener dans les allées et utiliser les pelouses pour les pique-niques, bien que le jardin japonais soit restreint. Un caniparc (espace canin clôtu`,
    descEs: `Un jardín formal de 7 hectáreas cerca de la estación de Toulouse-Matabiau con paseos, céspedes y un jardín japonés. Los perros pueden pasear por los senderos y usar los céspedes para picnics, aunque el jardín japonés está restringido. Hay un caniparc (área canina vallada) disponi`,
    descDe: `Ein 7 Hektar großer formaler Garten nahe dem Bahnhof Toulouse-Matabiau mit Alleen, Rasenflächen und einem japanischen Gartenteil. Hunde dürfen auf den Alleen laufen und die Rasenflächen für Picknicks nutzen, wobei der japanische Garten eingeschränkt ist. Ein Caniparc (eingezäunte Hundefläche) ist innerhalb des Gartens verfügba`,
    descNl: `Een 7 hectare grote formele tuin bij station Toulouse-Matabiau, met lanen, gazons en een Japans tuingedeelte. Honden mogen op de lanen lopen en de gazons gebruiken voor picknicks, al is de Japanse tuin beperkt toegankelijk. Binnen de tuin is een caniparc (omheinde hondenzone) beschikbaar.`,
    descIt: `Un giardino formale di 7 ettari vicino alla stazione di Toulouse-Matabiau con viali, prati e una sezione di giardino giapponese. I cani possono camminare sui viali e usare i prati per i picnic, anche se il giardino giapponese è ad accesso limitato. All'interno del giardino è disponibile un caniparc (area cani recintata).`,
  },
  {
    citySlug: "turin",
    name: "Parco del Valentino",
    neighborhood: "San Salvario / Valentino",
    size: "84 ha / 208 acres",
    photo: "/images/city-places/turin-parks-parco-del-valentino.jpg",
    descEn: `Turin's most beloved public park, 84 hectares stretched along the Po river from Corso Vittorio to the Borgo Medievale. Two fenced Aree Cani (one near the castle, one at the southern end), shaded riverside paths, and a dog-friendly gelateria on the promenade.`,
    descFr: `Le parc public le plus aimé de Turin, 84 hectares étirés le long du Pô, du Corso Vittorio au Borgo Medievale. Deux Aree Cani clôturées (une près du château, une à l'extrémité sud), sentiers ombragés le long du fleuve et une gelateria dog-friendly sur la promenade.`,
    descEs: `El parque público más querido de Turín, 84 hectáreas a lo largo del Po, desde Corso Vittorio hasta el Borgo Medievale. Dos Aree Cani valladas (una cerca del castillo, otra en el extremo sur), senderos sombreados junto al río y una gelatería dog-friendly en el paseo.`,
    descDe: `Turins beliebtester öffentlicher Park, 84 Hektar entlang des Po vom Corso Vittorio bis zum Borgo Medievale. Zwei eingezäunte Aree Cani (eine nahe dem Schloss, eine am südlichen Ende), schattige Uferwege und eine hundefreundliche Gelateria auf der Promenade.`,
    descNl: `Turijns meest geliefde openbare park, 84 hectare langs de Po, van de Corso Vittorio tot aan de Borgo Medievale. Twee omheinde Aree Cani (een bij het kasteel, een aan het zuidelijke eind), schaduwrijke oeverpaden en een hondvriendelijke gelateria op de promenade.`,
    descIt: `Il parco pubblico più amato di Torino, 84 ettari distesi lungo il Po da Corso Vittorio al Borgo Medievale. Due Aree Cani recintate (una vicino al castello, una all'estremità sud), sentieri ombreggiati lungo il fiume e una gelateria dog-friendly sul lungofiume.`,
  },
  {
    citySlug: "utrecht",
    name: "Griftpark",
    neighborhood: "Vogelenbuurt / Wittevrouwen",
    size: "\u2248 16 hectares",
    photo: "/images/city-places/utrecht-parks-griftpark.jpg",
    descEn: `A 16-hectare urban park north of the centre with a clearly marked off-leash zone, a fenced playground, a pet-friendly café, and a steady stream of local dogs from the Vogelenbuurt and Wittevrouwen neighbourhoods. It's the easiest off-leash run for anyone staying in central Utrech`,
    descFr: `Parc urbain de 16 hectares au nord du centre, avec zone sans laisse clairement balisée, plaine de jeu clôturée, café dog-friendly, et un défilé constant de chiens locaux des quartiers Vogelenbuurt et Wittevrouwen. C'est le terrain sans laisse le plus accessible pour quiconque log`,
    descEs: `Parque urbano de 16 hectáreas al norte del centro, con zona sin correa bien señalizada, parque infantil vallado, cafetería pet-friendly y un goteo constante de perros locales de los barrios Vogelenbuurt y Wittevrouwen. Es la salida sin correa más accesible para quien se aloja en `,
    descDe: `Ein 16 Hektar großer Stadtpark nördlich des Zentrums mit einer klar markierten Freilaufzone, einem eingezäunten Spielplatz, einem tierfreundlichen Café und einem stetigen Strom lokaler Hunde aus den Vierteln Vogelenbuurt und Wittevrouwen. Er ist der einfachste Freilaufort für alle, die im Zentrum von Utrech`,
    descNl: `Een 16 hectare groot stadspark ten noorden van het centrum met een duidelijk gemarkeerde losloopzone, een omheinde speeltuin, een dierenvriendelijk café en een gestage stroom lokale honden uit de wijken Vogelenbuurt en Wittevrouwen. Het is de makkelijkst bereikbare losloopplek voor iedereen die in het centrum van Utrecht verblijft.`,
    descIt: `Un parco urbano di 16 ettari a nord del centro con una zona senza guinzaglio chiaramente segnalata, un parco giochi recintato, un caffè pet-friendly e un flusso costante di cani locali dai quartieri Vogelenbuurt e Wittevrouwen. È il posto senza guinzaglio più comodo per chiunque alloggi nel centro di Utrecht.`,
  },
  {
    citySlug: "valencia",
    name: "Área Canina del Parque Central",
    neighborhood: "Russafa",
    size: "1,380 m²",
    photo: "/images/city-places/valencia-parks-area-canina-del-parque-central.jpg",
    descEn: `A fenced canine area of about 1,380 square metres inside the modern Parque Central near the North Station, in the Russafa quarter. Enclosed by a 1.5-metre fence with bag dispensers, drinking fountains and benches, it opened with the park in 2019 and gives inner-city dogs a secure off-leash run. A short walk from Xàtiva and Bailén stations.`,
    descFr: `Une aire canine clôturée d'environ 1 380 mètres carrés au sein du moderne Parque Central, près de la gare du Nord, dans le quartier de Russafa. Fermée par une clôture d'1,5 mètre, avec distributeurs de sacs, fontaines à boire et bancs, elle a ouvert avec le parc en 2019 et offre aux chiens du centre une course sans laisse en sécurité. À courte distance des stations Xàtiva et Bailén.`,
    descEs: `Una área canina vallada de unos 1.380 metros cuadrados dentro del moderno Parque Central, junto a la Estación del Norte, en el barrio de Russafa. Cerrada por una valla de 1,5 metros, con dispensadores de bolsas, fuentes de agua y bancos, abrió con el parque en 2019 y ofrece a los perros del centro una carrera sin correa segura. A poca distancia de las estaciones de Xàtiva y Bailén.`,
    descDe: `Eine eingezäunte Hundefläche von rund 1.380 Quadratmetern im modernen Parque Central nahe dem Nordbahnhof, im Viertel Russafa. Umgeben von einem 1,5 Meter hohen Zaun mit Beutelspendern, Trinkbrunnen und Bänken, wurde sie 2019 zusammen mit dem Park eröffnet und bietet Hunden aus der Innenstadt einen sicheren Freilauf. Ein kurzer Spaziergang von den Bahnhöfen Xàtiva und Bailén entfernt.`,
    descNl: `Een omheinde hondenzone van ongeveer 1.380 vierkante meter binnen het moderne Parque Central bij het Noordstation, in de wijk Russafa. Omsloten door een 1,5 meter hoog hek met zakjesdispensers, drinkfonteinen en bankjes, geopend samen met het park in 2019, biedt het honden uit de binnenstad een veilige losloopplek. Op korte loopafstand van de stations Xàtiva en Bailén.`,
    descIt: `Un'area canina recintata di circa 1.380 metri quadrati all'interno del moderno Parque Central vicino alla Estación del Norte, nel quartiere di Russafa. Chiusa da una recinzione di 1,5 metri con distributori di sacchetti, fontanelle e panchine, è stata inaugurata insieme al parco nel 2019 e offre ai cani del centro città una corsa sicura senza guinzaglio. A breve distanza a piedi dalle stazioni di Xàtiva e Bailén.`,
  },
  {
    citySlug: "verona",
    name: "Area Cani Via Andrea Doria",
    neighborhood: "Golosine",
    photo: "/images/city-places/verona-parks-area-cani-via-andrea-doria.jpg",
    descEn: `An official municipal dog park in the Golosine district with a fully fenced off-leash area featuring separate sections for large and small dogs. Equipped with water fountains, shaded seating, and double-gated entrances for security. Free parking is available nearby. Consistently `,
    descFr: `Un parc canin municipal officiel dans le quartier Golosine, avec une zone hors laisse entièrement clôturée divisée en sections pour grands et petits chiens. Équipé de fontaines d'eau, de sièges ombragés et de doubles portails de sécurité. Parking gratuit à proximité. Régulièremen`,
    descEs: `Un parque canino municipal oficial en el barrio Golosine, con una zona sin correa totalmente vallada con secciones separadas para perros grandes y pequeños. Equipado con fuentes de agua, asientos a la sombra y doble puerta de seguridad. Aparcamiento gratuito cerca. Constantemente`,
    descDe: `Ein offizieller städtischer Hundepark im Viertel Golosine mit einer vollständig eingezäunten Freilauffläche, aufgeteilt in getrennte Bereiche für große und kleine Hunde. Ausgestattet mit Wasserbrunnen, schattigen Sitzgelegenheiten und doppelten Toranlagen zur Sicherheit. In der Nähe steht kostenloser Parkplatz zur Verfügung. Durchgehen`,
    descNl: `Een officieel gemeentelijk hondenpark in de wijk Golosine met een volledig omheind losloopgebied met aparte gedeeltes voor grote en kleine honden. Uitgerust met waterfonteinen, schaduwrijke zitplaatsen en dubbele toegangspoorten voor de veiligheid. Gratis parkeren is in de buurt beschikbaar. Consequent goed onderhouden.`,
    descIt: `Un parco cani comunale ufficiale nel quartiere Golosine con un'area senza guinzaglio completamente recintata, divisa in sezioni per cani grandi e piccoli. Dotato di fontanelle d'acqua, sedute ombreggiate e ingressi a doppio cancello per la sicurezza. Parcheggio gratuito disponibile nelle vicinanze. Costantemente ben tenuto.`,
  },
  {
    citySlug: "vienna",
    name: "Hundezone Heldenplatz",
    neighborhood: "Innere Stadt (1st)",
    photo: "/images/city-places/vienna-parks-hundezone-heldenplatz.jpg",
    descEn: `A fully fenced off-leash Hundezone on Heldenplatz, right beside the Hofburg palace in Vienna's Innere Stadt (1st district), surfaced with bark mulch. Central and easy to reach, dogs run leash-free and muzzle-free inside the fence, as in all Vienna Hundezonen. Trams and the U3 at Herrengasse are a short walk, but note the muzzle rule on Vienna public transport getting there.`,
    descFr: `Une Hundezone sans laisse enti\u00e8rement cl\u00f4tur\u00e9e sur la Heldenplatz, juste \u00e0 c\u00f4t\u00e9 du palais de la Hofburg, dans l'Innere Stadt de Vienne (1er arrondissement), au sol en copeaux d'\u00e9corce. Centrale et facile d'acc\u00e8s, les chiens y courent sans laisse ni museli\u00e8re \u00e0 l'int\u00e9rieur de la cl\u00f4ture, comme dans toutes les Hundezonen viennoises. Tramways et U3 \u00e0 Herrengasse \u00e0 courte distance, mais attention \u00e0 l'obligation de museli\u00e8re dans les transports viennois pour y aller.`,
    descEs: `Una Hundezone sin correa totalmente vallada en la Heldenplatz, justo al lado del palacio de la Hofburg, en el centro hist\u00f3rico de Viena (distrito 1), con suelo de corteza triturada. C\u00e9ntrica y de f\u00e1cil acceso, los perros corren sin correa ni bozal dentro de la valla, como en todas las Hundezonen vienesas. Tranv\u00edas y la U3 en Herrengasse quedan cerca, pero ten en cuenta la obligaci\u00f3n de bozal en el transporte p\u00fablico vien\u00e9s para llegar.`,
    descDe: `Eine vollst\u00e4ndig eingez\u00e4unte Hundezone am Heldenplatz, direkt neben der Hofburg in Wiens Innerer Stadt (1. Bezirk), mit Rindenmulch als Bodenbelag. Zentral und leicht erreichbar, laufen Hunde innerhalb des Zauns ohne Leine und ohne Maulkorb, wie in allen Wiener Hundezonen. Stra\u00dfenbahnen und die U3 an der Herrengasse sind einen kurzen Fu\u00dfweg entfernt, doch beachten Sie die Maulkorbpflicht in den Wiener \u00f6ffentlichen Verkehrsmitteln auf dem Weg dorthin.`,
    descNl: `Een volledig omheinde aanlijnvrije Hundezone op de Heldenplatz, vlak naast de Hofburg in Wenens Innere Stadt (1e district), met een ondergrond van boomschors. Centraal en gemakkelijk bereikbaar, honden lopen binnen de omheining zonder lijn en zonder muilkorf, zoals in alle Weense Hundezonen. Trams en de U3 bij Herrengasse liggen op korte loopafstand, maar let op de muilkorfplicht in het Weense openbaar vervoer om er te komen.`,
    descIt: `Una Hundezone senza guinzaglio completamente recintata sulla Heldenplatz, proprio accanto al palazzo della Hofburg nell'Innere Stadt di Vienna (1° distretto), con fondo in corteccia triturata. Centrale e facile da raggiungere, i cani corrono senza guinzaglio e senza museruola all'interno della recinzione, come in tutte le Hundezonen viennesi. Tram e la U3 a Herrengasse sono a breve distanza a piedi, ma attenzione all'obbligo di museruola sui mezzi pubblici viennesi per arrivarci.`,
  },
  {
    citySlug: "vilnius",
    name: "Purina Dog Park (\u0160nipi\u0161k\u0117s)",
    neighborhood: "\u0160nipi\u0161k\u0117s (north bank, business district)",
    size: "Small fenced enclosure (~0.3 hectare)",
    photo: "/images/city-places/vilnius-parks-purina-dog-park-snipiskes.jpg",
    descEn: `Vilnius's only dedicated, fenced municipal dog park, sponsored by Purina and located on the north bank of the Neris in the modern Šnipiškės business district. Two separate fenced sections (small/large), agility equipment, water taps, and shaded benches. The Constitution Square is`,
    descFr: `Seul parc canin clôturé municipal dédié de Vilnius, sponsorisé par Purina et situé sur la rive nord de la Neris dans le quartier d'affaires moderne de Šnipiškės. Deux sections clôturées séparées (petits/grands), agility, robinets et bancs ombragés. La place de la Constitution est`,
    descEs: `El único parque canino municipal cerrado y dedicado de Vilna, patrocinado por Purina y situado en la orilla norte del Neris, en el moderno distrito de negocios de Šnipiškės. Dos secciones valladas separadas (pequeños/grandes), agility, fuentes y bancos con sombra. La Plaza de la `,
    descDe: `Vilnius' einziger eigener, eingezäunter städtischer Hundepark, gesponsert von Purina und am Nordufer der Neris im modernen Geschäftsviertel Šnipiškės gelegen. Zwei getrennte eingezäunte Bereiche (klein/groß), Agility-Geräte, Wasserzapfstellen und schattige Bänke. Der Verfassungsplatz i`,
    descNl: `Vilnius' enige eigen, omheinde gemeentelijke hondenpark, gesponsord door Purina en gelegen aan de noordoever van de Neris in de moderne zakenwijk Šnipiškės. Twee gescheiden omheinde gedeeltes (klein/groot), agility-toestellen, waterkranen en schaduwrijke bankjes. Het Grondwetplein ligt vlakbij.`,
    descIt: `L'unico parco cani comunale dedicato e recintato di Vilnius, sponsorizzato da Purina e situato sulla riva nord del Neris nel moderno quartiere degli affari di Šnipiškės. Due sezioni recintate separate (piccoli/grandi), attrezzature di agility, fontanelle d'acqua e panchine ombreggiate. La Piazza della Costituzione è vicina.`,
  },
  {
    citySlug: "wroclaw",
    name: "Park Grabiszy\u0144ski",
    neighborhood: "Grabiszyn / southwest",
    size: "About 50 hectares",
    photo: "/images/city-places/wroclaw-parks-park-grabiszynski.jpg",
    descEn: `A large, lived-in residential park covering roughly 50 hectares on the southwest side of the city, and arguably the most popular dog park in Wroclaw. Inside, the well-known Dog Meadow (Łąka dla psów) is a fully fenced off-leash zone with agility equipment, tunnels, ramps, and sla`,
    descFr: `Un grand parc résidentiel vivant d'environ 50 hectares au sud-ouest de la ville, sans doute le parc canin le plus populaire de Wroclaw. À l'intérieur, la fameuse Prairie aux Chiens (Łąka dla psów) est une zone clôturée sans laisse avec agility, tunnels, rampes et slalom, où les p`,
    descEs: `Un gran parque residencial muy vivo de unas 50 hectáreas en el suroeste de la ciudad, posiblemente el parque canino más popular de Wroclaw. Dentro, la conocida Pradera de Perros (Łąka dla psów) es una zona vallada sin correa con equipamiento de agility, túneles, rampas y eslalon,`,
    descDe: `Ein großer, lebendiger Wohnpark auf rund 50 Hektar im Südwesten der Stadt und wohl der beliebteste Hundepark in Wroclaw. Im Inneren ist die bekannte Hundewiese (Łąka dla psów) eine vollständig eingezäunte Freilaufzone mit Agility-Geräten, Tunneln, Rampen und Slalo`,
    descNl: `Een groot, levendig woonpark van ongeveer 50 hectare aan de zuidwestkant van de stad, en wellicht het populairste hondenpark van Wroclaw. Binnenin is de bekende Hondenweide (Łąka dla psów) een volledig omheinde losloopzone met agility-toestellen, tunnels, hellingen en een slalom, waar honden vrij kunnen ravotten.`,
    descIt: `Un grande e vissuto parco residenziale di circa 50 ettari nella zona sud-ovest della città, probabilmente il parco cani più popolare di Wroclaw. Al suo interno, il noto Prato dei Cani (Łąka dla psów) è una zona completamente recintata senza guinzaglio con attrezzature di agility, tunnel, rampe e uno slalom, dove i cani possono sfrenarsi liberamente.`,
  },
  {
    citySlug: "wroclaw",
    name: "Wyspa S\u0142odowa",
    neighborhood: "Old Town islands / Odra river",
    size: "Around 1 hectare",
    photo: "/images/city-places/wroclaw-parks-wyspa-s-odowa.jpg",
    descEn: `A small grassy island in the middle of the Odra river, a five-minute walk from the Rynek and the most beloved hangout in central Wroclaw. The lawn is open, shaded, and ringed by floating bars and views of the baroque University. Dogs are welcome everywhere on leash and the rivers`,
    descFr: `Une petite île herbeuse au milieu de l'Odra, à cinq minutes à pied du Rynek et le coin préféré du centre de Wroclaw. La pelouse est ouverte, ombragée et entourée de bars flottants avec vue sur l'Université baroque. Les chiens sont les bienvenus partout en laisse et les chemins en`,
    descEs: `Una pequeña isla con césped en medio del río Odra, a cinco minutos a pie del Rynek y el lugar favorito del centro de Wroclaw. La pradera es abierta, sombreada y está rodeada de bares flotantes y vistas a la Universidad barroca. Los perros son bienvenidos en todas partes con corre`,
    descDe: `Eine kleine Grasinsel mitten in der Oder, fünf Gehminuten vom Rynek entfernt und der beliebteste Treffpunkt im Zentrum von Wroclaw. Die Rasenfläche ist offen, schattig und von schwimmenden Bars sowie Ausblicken auf die barocke Universität umgeben. Hunde sind überall an der Leine willkommen, und die Ufe`,
    descNl: `Een klein grasrijk eiland midden in de Oder, vijf minuten lopen van het Rynek en de meest geliefde hangplek van centraal Wroclaw. Het gazon is open, schaduwrijk en omgeven door drijvende bars met uitzicht op de barokke universiteit. Honden zijn overal aan de lijn welkom en de oeverpaden bieden volop ruimte om te wandelen.`,
    descIt: `Una piccola isola erbosa in mezzo all'Oder, a cinque minuti a piedi dal Rynek e il ritrovo più amato del centro di Wroclaw. Il prato è aperto, ombreggiato e circondato da bar galleggianti con vista sull'Università barocca. I cani sono benvenuti ovunque al guinzaglio e i sentieri lungo il fiume offrono ampio spazio per passeggiare.`,
  },
  {
    citySlug: "zagreb",
    name: "Maksimir Park",
    neighborhood: "Maksimir",
    photo: "/images/city-places/zagreb-parks-maksimir-park.jpg",
    descEn: `Zagreb's flagship 316-hectare park with five lakes and the city's main fenced off-leash dog zone near the second lake. Tram lines 4, 7, 11, and 12 stop at the entrance. The 4 km perimeter loop is the classic long walk; the woodland sections beyond the lakes stay quiet even on wee`,
    descFr: `Parc emblématique de Zagreb (316 ha) avec cinq lacs et la principale zone sans laisse clôturée de la ville, près du deuxième lac. Les trams 4, 7, 11 et 12 desservent l'entrée. La boucle périmétrique de 4 km est la grande promenade classique ; les sections boisées au-delà des lacs`,
    descEs: `Parque emblemático de Zagreb (316 ha) con cinco lagos y la principal zona sin correa vallada de la ciudad, cerca del segundo lago. Los tranvías 4, 7, 11 y 12 paran en la entrada. El bucle perimetral de 4 km es el paseo largo clásico; las zonas boscosas más allá de los lagos sigue`,
    descDe: `Zagrebs Vorzeigepark mit 316 Hektar, fünf Seen und der wichtigsten eingezäunten Freilaufzone der Stadt für Hunde nahe dem zweiten See. Die Straßenbahnlinien 4, 7, 11 und 12 halten am Eingang. Die 4 km lange Umrundung ist der klassische lange Spaziergang; die Waldabschnitte jenseits der Seen bleiben selbst am Wochenend`,
    descNl: `Zagrebs vlaggenschippark van 316 hectare met vijf meren en de belangrijkste omheinde losloopzone van de stad, bij het tweede meer. Tramlijnen 4, 7, 11 en 12 stoppen bij de ingang. De 4 km lange rondgang is de klassieke lange wandeling; de bosgedeeltes voorbij de meren blijven rustig, zelfs in het weekend.`,
    descIt: `Il parco simbolo di Zagabria, 316 ettari con cinque laghi e la principale zona senza guinzaglio recintata della città, vicino al secondo lago. Le linee tram 4, 7, 11 e 12 fermano all'ingresso. L'anello perimetrale di 4 km è la classica lunga passeggiata; le sezioni boschive oltre i laghi restano tranquille anche nei fine settimana.`,
  },
  {
    citySlug: "zagreb",
    name: "Bundek Park",
    neighborhood: "Novi Zagreb",
    photo: "/images/city-places/zagreb-parks-bundek-park.jpg",
    descEn: `A 54-hectare modern park south of the Sava river with a designated fenced dog zone, two lakes, jogging paths, and broad open meadows. Quieter than Maksimir on weekdays. Tram lines 7 and 14 cross the river to the park edge, then a 5-minute walk.`,
    descFr: `Parc moderne de 54 hectares au sud de la Sava, avec une zone canine clôturée dédiée, deux lacs, des chemins de jogging et de larges prairies ouvertes. Plus calme que Maksimir en semaine. Les trams 7 et 14 traversent le fleuve jusqu'au bord du parc, puis 5 minutes à pied.`,
    descEs: `Parque moderno de 54 hectáreas al sur del río Sava, con una zona canina vallada, dos lagos, senderos para correr y amplias praderas abiertas. Más tranquilo que Maksimir entre semana. Los tranvías 7 y 14 cruzan el río hasta el borde del parque, luego 5 minutos a pie.`,
    descDe: `Ein 54 Hektar großer moderner Park südlich der Save mit einer ausgewiesenen eingezäunten Hundezone, zwei Seen, Jogging-Wegen und weiten offenen Wiesen. Unter der Woche ruhiger als Maksimir. Die Straßenbahnlinien 7 und 14 überqueren den Fluss bis zum Parkrand, dann 5 Minuten zu Fuß.`,
    descNl: `Een 54 hectare groot modern park ten zuiden van de Sava met een aangewezen omheinde hondenzone, twee meren, hardlooppaden en brede open weiden. Rustiger dan Maksimir doordeweeks. Tramlijnen 7 en 14 steken de rivier over tot aan de parkrand, gevolgd door 5 minuten lopen.`,
    descIt: `Un moderno parco di 54 ettari a sud del fiume Sava con una zona canina recintata designata, due laghi, sentieri per la corsa e ampi prati aperti. Più tranquillo di Maksimir nei giorni feriali. Le linee tram 7 e 14 attraversano il fiume fino al bordo del parco, seguite da 5 minuti a piedi.`,
  },
  {
    citySlug: "zaragoza",
    name: "Parque del T\u00edo Jorge",
    photo: "/images/city-places/zaragoza-parks-parque-del-tio-jorge.jpg",
    descEn: `On the north bank of the Ebro, opposite the Casco Histórico across the Pilar Bridge. Hosts one of the city's largest fenced canine recreation zones: 4,725 m² split into two perimeter-fenced areas, 2,050 m² for calm dogs and 2,675 m² for active dogs, with double security gates, `,
    descFr: `Sur la rive nord de l'Ebre, face au Casco Histórico via le Pont du Pilar. Abrite l'une des plus grandes zones canines clôturées de la ville : 4 725 m² divisés en deux espaces, 2 050 m² pour chiens calmes et 2 675 m² pour chiens actifs, avec doubles portails de sécurité, fontain`,
    descEs: `En la orilla norte del Ebro, frente al Casco Histórico cruzando el Puente del Pilar. Alberga una de las mayores zonas caninas valladas de la ciudad: 4.725 m² divididos en dos espacios, 2.050 m² para perros tranquilos y 2.675 m² para perros activos, con dobles puertas de segurid`,
    descDe: `Am Nordufer des Ebro, gegenüber dem Casco Histórico jenseits der Pilar-Brücke. Beherbergt eine der größten eingezäunten Hundeauslaufzonen der Stadt: 4.725 m², aufgeteilt in zwei umzäunte Bereiche, 2.050 m² für ruhige Hunde und 2.675 m² für aktive Hunde, mit doppelten Sicherheitstore`,
    descNl: `Aan de noordoever van de Ebro, tegenover de Casco Histórico via de Pilarbrug. Herbergt een van de grootste omheinde hondenrecreatiezones van de stad: 4.725 m², verdeeld in twee omheinde gedeeltes, 2.050 m² voor rustige honden en 2.675 m² voor actieve honden, met dubbele veiligheidspoorten en drinkfonteinen.`,
    descIt: `Sulla riva nord dell'Ebro, di fronte al Casco Histórico attraverso il Ponte del Pilar. Ospita una delle più grandi zone di svago canino recintate della città: 4.725 m² divisi in due aree recintate, 2.050 m² per cani tranquilli e 2.675 m² per cani attivi, con doppi cancelli di sicurezza e fontanelle d'acqua.`,
  },
  {
    citySlug: "zaragoza",
    name: "Parque de los Poetas",
    photo: "/images/city-places/zaragoza-parks-parque-de-los-poetas.jpg",
    descEn: `A 4-hectare neighbourhood park in the Almozara district with one of Zaragoza's most popular fenced dog enclosures, a flat, fully gated grass and gravel zone with two entrances, water fountains for dogs, and shade from mature pines. The enclosure is unrestricted by hour; the surr`,
    descFr: `Un parc de quartier de 4 hectares dans le district de l'Almozara, avec l'un des enclos à chiens clôturés les plus populaires de Saragosse, une zone plate, entièrement fermée, mêlant herbe et gravier, avec deux entrées, fontaines à eau pour chiens et ombrage de pins matures. L'en`,
    descEs: `Un parque de barrio de 4 hectáreas en el distrito de la Almozara con uno de los recintos caninos vallados más populares de Zaragoza, una zona plana, totalmente cerrada, con hierba y gravilla, dos entradas, fuentes de agua para perros y sombra de pinos maduros. El recinto no tien`,
    descDe: `Ein 4 Hektar großer Stadtteilpark im Bezirk Almozara mit einem der beliebtesten eingezäunten Hundegehege Zaragozas, einer flachen, vollständig umzäunten Rasen- und Kiesfläche mit zwei Eingängen, Trinkbrunnen für Hunde und Schatten von alten Pinien. Das Gehege ist zeitlich unbeschränkt zugänglich; die umliegen`,
    descNl: `Een 4 hectare groot buurtpark in de wijk Almozara met een van de populairste omheinde hondengehegen van Zaragoza, een vlak, volledig afgesloten terrein van gras en grind met twee ingangen, drinkfonteinen voor honden en schaduw van oude pijnbomen. De omheining is zonder tijdsbeperking toegankelijk; de omliggende buurt is rustig en residentieel.`,
    descIt: `Un parco di quartiere di 4 ettari nel distretto di Almozara con uno dei recinti per cani più popolari di Saragozza, un'area piatta, completamente chiusa, di erba e ghiaia con due ingressi, fontanelle d'acqua per cani e ombra di pini secolari. Il recinto è accessibile senza limiti orari; il quartiere circostante è tranquillo e residenziale.`,
  },]

// Tally cities and countries for stats
const CITY_COUNT = new Set(PARKS.map((p) => p.citySlug)).size
const COUNTRY_TALLY: [string, number][] = Object.entries(
  PARKS.reduce<Record<string, number>>((acc, p) => {
    const c = destinations.find((d) => d.slug === p.citySlug)?.country
    if (c) acc[c] = (acc[c] ?? 0) + 1
    return acc
  }, {})
).sort((a, b) => b[1] - a[1])

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'es' }, { locale: 'pt' }, { locale: 'de' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const titles: Record<string, string> = {
    en: `${PARKS.length} Fenced Dog Parks in Europe, Off-Leash Zones Verified (${new Date().getFullYear()}) | HotelsWithPets`,
    fr: `${PARKS.length} parcs canins clôturés en Europe, zones sans laisse vérifiées (${new Date().getFullYear()}) | HotelsWithPets`,
    es: `${PARKS.length} parques caninos vallados en Europa, zonas sin correa verificadas (${new Date().getFullYear()}) | HotelsWithPets`,
    pt: `${PARKS.length} parques caninos vedados na Europa, zonas sem trela verificadas (${new Date().getFullYear()}) | HotelsWithPets`,
    de: `${PARKS.length} eingezäunte Hundeparks in Europa, geprüfte Freilaufzonen (${new Date().getFullYear()}) | HotelsWithPets`,
    nl: `${PARKS.length} omheinde hondenparken in Europa, geverifieerde losloopzones (${new Date().getFullYear()}) | HotelsWithPets`,
    it: `${PARKS.length} parchi cani recintati in Europa, aree senza guinzaglio verificate (${new Date().getFullYear()}) | HotelsWithPets`,
  }
  const descs: Record<string, string> = {
    en: `Verified list of ${PARKS.length} fenced dog parks across ${CITY_COUNT} European cities, secure off-leash zones, neighbourhood, size and the parent city guide for each park.`,
    fr: `Liste vérifiée de ${PARKS.length} parcs canins clôturés dans ${CITY_COUNT} villes européennes, zones sans laisse sécurisées, quartier, surface et guide de ville parent pour chacun.`,
    es: `Lista verificada de ${PARKS.length} parques caninos vallados en ${CITY_COUNT} ciudades europeas, zonas sin correa seguras, barrio, superficie y guía de la ciudad de cada parque.`,
    pt: `Lista verificada de ${PARKS.length} parques caninos vedados em ${CITY_COUNT} cidades europeias, zonas sem trela seguras, bairro, área e guia da cidade de cada parque.`,
    de: `Geprüfte Liste von ${PARKS.length} eingezäunten Hundeparks in ${CITY_COUNT} europäischen Städten, sichere Freilaufzonen, Stadtteil, Größe und den zugehörigen Stadtführer für jeden Park.`,
    nl: `Geverifieerde lijst van ${PARKS.length} omheinde hondenparken in ${CITY_COUNT} Europese steden, veilige losloopzones, wijk, oppervlakte en de bijbehorende stadsgids voor elk park.`,
    it: `Elenco verificato di ${PARKS.length} parchi cani recintati in ${CITY_COUNT} città europee, aree senza guinzaglio sicure, quartiere, superficie e la guida della città di riferimento per ogni parco.`,
  }
  const today = new Date().toISOString().split('T')[0]
  return {
    title: titles[locale] ?? titles.en,
    description: descs[locale] ?? descs.en,
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
      description: descs[locale] ?? descs.en,
      type: 'article',
      publishedTime: '2026-05-13T00:00:00Z',
      modifiedTime: `${today}T00:00:00Z`,
    },
  }
}

const COPY: Partial<Record<Locale, {
  kicker: string; h1: string; lede: string
  introTitle: string; introParas: string[]
  countryTitle: string; countryIntro: string; countriesLabel: string
  listTitle: string
  parksLabel: string; citiesLabel: string; countriesStatLabel: string
  ctaTitle: string; ctaDesc: string; ctaButton: string
  faqTitle: string; faqs: { q: string; a: string }[]
  legalTitle: string; legalParas: string[]
}>> = {
  en: {
    kicker: 'FENCED DOG PARKS · 2026 EDITION',
    h1: `${PARKS.length} Fenced Dog Parks in Europe`,
    lede: `Every European city has at least one fenced dog zone where your dog can run safely off-leash, locally called Hundezone (Austria, Germany), sgambamento (Italy), hundeskov (Denmark), caniparc (France), área canina (Spain) or parque para perros (Portugal). This is the verified inventory across our ${destinations.length} city guides.`,
    introTitle: 'Why fenced matters',
    introParas: [
      `In most European cities, leash law applies in all public spaces by default. Fenced dog zones are the legal exception: secure perimeters where a dog can run free without breaking municipal bylaws, without risking traffic, and without conflict with joggers, cyclists or other park users.`,
      `Each entry below links back to its parent city guide, where you'll find the exact address, transport, opening hours, the local off-leash rules, and verified pet-friendly hotels nearby, every recommendation drills down to the booking step.`,
    ],
    countryTitle: 'Distribution by country',
    countryIntro: `Germany, Austria and Italy lead Europe on fenced dog infrastructure thanks to strong municipal park culture. Spain and France follow with growing caniparc and área canina networks.`,
    countriesLabel: 'Top countries',
    listTitle: 'The full list, alphabetical by city',
    parksLabel: 'fenced parks',
    citiesLabel: 'cities',
    countriesStatLabel: 'countries',
    ctaTitle: 'Find a pet-friendly hotel near these dog parks',
    ctaDesc: 'Every park in the list links to its parent city guide, with 5+ verified pet-friendly hotels per city, pet fees in EUR and direct Booking.com affiliate links.',
    ctaButton: 'Browse all destinations →',
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'What is a fenced dog park in Europe called?', a: 'Names vary by country: Hundezone or Hundewiese (Austria, Germany, Switzerland), sgambamento or area cani (Italy), hundeskov (Denmark), hondenuitlaatgebied or losloopgebied (Netherlands), caniparc or aire pour chiens (France), área canina or zona canina (Spain), parque para cães (Portugal). All refer to the same thing: a fenced perimeter where off-leash play is permitted.' },
      { q: 'Are fenced dog parks free to enter?', a: 'Yes, all the fenced dog zones on this list are public municipal infrastructure with free entry, 24/7 except where noted. A small minority of private commercial dog parks across Europe charge entry, none of those are included here.' },
      { q: 'Which European country has the best fenced dog park infrastructure?', a: 'By number per capita: Austria, Germany and Italy lead. Austrian cities like Vienna, Salzburg and Graz typically have 5+ fenced Hundezonen each. Italian cities maintain sgambamento areas in every major park. Spain has rapidly expanded its área canina network since 2018.' },
      { q: 'Are the fenced parks accessible by public transport?', a: 'Yes for all of them, every park in this list sits inside a city already served by our destination network, with tram, metro or bus access. Detailed transport info is in each parent city guide.' },
      { q: 'Can I bring more than one dog to a fenced park?', a: 'Yes in almost all cases. A small number of Italian sgambamento areas cap visitors at 2 dogs per owner during peak hours; signage on entry will state any local rules.' },
    ],
    legalTitle: 'Rules common to all fenced dog zones',
    legalParas: [
      `Sterile females, neutered males and well-socialised dogs are welcome. Aggressive or in-heat dogs should not be brought to a shared off-leash zone, this is a universal park-etiquette rule and not enforced by signage.`,
      `Poo bags are mandatory inside the fenced zone, most parks provide dispensers at the entrance. Fines range from 50 € to 750 € per missed pickup depending on the city and country.`,
      `Some parks separate small dogs (under 10 kg) from large dogs with a secondary fence. Look for "Small dogs" / "Petits chiens" / "Cani piccoli" signage at the gate.`,
    ],
  },
  fr: {
    kicker: 'PARCS CANINS CLÔTURÉS · ÉDITION 2026',
    h1: `${PARKS.length} parcs canins clôturés en Europe`,
    lede: `Toutes les grandes villes européennes ont au moins une zone canine clôturée où votre chien peut courir librement sans laisse, appelée localement Hundezone (Autriche, Allemagne), sgambamento (Italie), hundeskov (Danemark), caniparc (France), área canina (Espagne) ou parque para cães (Portugal). Voici l'inventaire vérifié issu de nos ${destinations.length} guides urbains.`,
    introTitle: 'Pourquoi la clôture compte',
    introParas: [
      `Dans la plupart des villes européennes, la laisse est obligatoire par défaut dans tout l'espace public. Les zones canines clôturées sont l'exception légale : un périmètre sécurisé où un chien peut courir sans enfreindre les arrêtés municipaux, sans risque de circulation, et sans conflit avec joggers, cyclistes ou autres usagers.`,
      `Chaque entrée ci-dessous renvoie au guide de sa ville parente, où vous trouverez l'adresse exacte, les transports, les horaires d'ouverture, les règles locales sans laisse et les hôtels pet-friendly vérifiés à proximité, chaque recommandation se prolonge jusqu'à l'étape réservation.`,
    ],
    countryTitle: 'Répartition par pays',
    countryIntro: `L'Allemagne, l'Autriche et l'Italie dominent l'Europe en infrastructure canine clôturée grâce à leur forte culture de parc municipal. L'Espagne et la France suivent avec leurs réseaux croissants de caniparcs et áreas caninas.`,
    countriesLabel: 'Pays en tête',
    listTitle: 'La liste complète, par ordre alphabétique de ville',
    parksLabel: 'parcs clôturés',
    citiesLabel: 'villes',
    countriesStatLabel: 'pays',
    ctaTitle: 'Trouvez un hôtel pet-friendly près de ces parcs canins',
    ctaDesc: `Chaque parc de la liste renvoie au guide de sa ville parente, avec 5+ hôtels pet-friendly vérifiés par ville, suppléments en EUR et liens d'affiliation Booking.com directs.`,
    ctaButton: 'Toutes les destinations →',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Comment appelle-t-on un parc canin clôturé en Europe ?', a: `Les noms varient selon les pays : Hundezone ou Hundewiese (Autriche, Allemagne, Suisse), sgambamento ou area cani (Italie), hundeskov (Danemark), hondenuitlaatgebied ou losloopgebied (Pays-Bas), caniparc ou aire pour chiens (France), área canina ou zona canina (Espagne), parque para cães (Portugal). Tous désignent la même chose : un périmètre clôturé où le sans laisse est autorisé.` },
      { q: 'Les parcs canins clôturés sont-ils gratuits ?', a: `Oui, toutes les zones canines clôturées de cette liste sont des équipements municipaux publics gratuits, ouverts 24h/24 sauf mention contraire. Une petite minorité de parcs canins privés payants existent en Europe, aucun n'est inclus ici.` },
      { q: 'Quel pays européen a la meilleure infrastructure de parcs canins clôturés ?', a: `Par nombre par habitant : Autriche, Allemagne et Italie en tête. Les villes autrichiennes (Vienne, Salzbourg, Graz) comptent typiquement 5+ Hundezonen chacune. Les villes italiennes maintiennent des sgambamento dans chaque grand parc. L'Espagne a rapidement étendu son réseau d'áreas caninas depuis 2018.` },
      { q: 'Les parcs clôturés sont-ils accessibles en transports ?', a: `Oui pour tous, chaque parc de cette liste se trouve dans une ville déjà couverte par notre réseau de destinations, avec accès tram, métro ou bus. Les informations détaillées sont dans chaque guide ville parent.` },
      { q: 'Puis-je amener plusieurs chiens dans un parc clôturé ?', a: `Oui dans la quasi-totalité des cas. Quelques sgambamenti italiens limitent les visiteurs à 2 chiens par maître aux heures de pointe ; la signalétique à l'entrée précise les règles locales.` },
    ],
    legalTitle: 'Règles communes à toutes les zones canines clôturées',
    legalParas: [
      `Les femelles stérilisées, mâles castrés et chiens bien socialisés sont les bienvenus. Les chiens agressifs ou en chaleur ne devraient pas entrer dans une zone sans laisse partagée, règle d'étiquette universelle non écrite.`,
      `Les sacs à déjections sont obligatoires dans la zone clôturée, la plupart des parcs ont des distributeurs à l'entrée. Les amendes vont de 50 € à 750 € par infraction selon la ville et le pays.`,
      `Certains parcs séparent les petits chiens (moins de 10 kg) des grands par une seconde clôture. Cherchez la signalétique « Small dogs » / « Petits chiens » / « Cani piccoli » à l'entrée.`,
    ],
  },
  es: {
    kicker: 'PARQUES CANINOS VALLADOS · EDICIÓN 2026',
    h1: `${PARKS.length} parques caninos vallados en Europa`,
    lede: `Toda gran ciudad europea tiene al menos una zona canina vallada donde tu perro puede correr libre sin correa, llamada Hundezone (Austria, Alemania), sgambamento (Italia), hundeskov (Dinamarca), caniparc (Francia), área canina (España) o parque para cães (Portugal). Este es el inventario verificado a partir de nuestras ${destinations.length} guías urbanas.`,
    introTitle: 'Por qué importa la valla',
    introParas: [
      `En la mayoría de las ciudades europeas, la correa es obligatoria por defecto en todo espacio público. Las zonas caninas valladas son la excepción legal: un perímetro seguro donde el perro puede correr libre sin violar las ordenanzas municipales, sin riesgo de tráfico y sin conflicto con corredores, ciclistas u otros usuarios.`,
      `Cada entrada abajo enlaza con la guía de su ciudad matriz, donde encontrarás la dirección exacta, el transporte, los horarios, las normas locales sin correa y los hoteles pet-friendly verificados cercanos, cada recomendación llega hasta el paso de reserva.`,
    ],
    countryTitle: 'Distribución por país',
    countryIntro: `Alemania, Austria e Italia lideran Europa en infraestructura canina vallada gracias a su fuerte cultura de parque municipal. España y Francia siguen con sus crecientes redes de áreas caninas y caniparcs.`,
    countriesLabel: 'Países líderes',
    listTitle: 'La lista completa, orden alfabético por ciudad',
    parksLabel: 'parques vallados',
    citiesLabel: 'ciudades',
    countriesStatLabel: 'países',
    ctaTitle: 'Encuentra un hotel pet-friendly cerca de estos parques caninos',
    ctaDesc: 'Cada parque de la lista enlaza con la guía de su ciudad matriz, con 5+ hoteles pet-friendly verificados por ciudad, suplementos en EUR y enlaces de afiliación Booking.com directos.',
    ctaButton: 'Todas las destinos →',
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Cómo se llama un parque canino vallado en Europa?', a: 'Los nombres varían según el país: Hundezone o Hundewiese (Austria, Alemania, Suiza), sgambamento o area cani (Italia), hundeskov (Dinamarca), hondenuitlaatgebied o losloopgebied (Países Bajos), caniparc o aire pour chiens (Francia), área canina o zona canina (España), parque para cães (Portugal). Todos designan lo mismo: un perímetro vallado donde se permite estar sin correa.' },
      { q: '¿Son gratuitos los parques caninos vallados?', a: 'Sí, todas las zonas caninas valladas de esta lista son equipamiento municipal público gratuito, abierto 24h salvo mención en contra. Una pequeña minoría de parques caninos privados de pago existen en Europa, ninguno está incluido aquí.' },
      { q: '¿Qué país europeo tiene la mejor infraestructura de parques caninos vallados?', a: 'Por número per cápita: Austria, Alemania e Italia en cabeza. Las ciudades austriacas (Viena, Salzburgo, Graz) suelen contar con 5+ Hundezonen cada una. Las ciudades italianas mantienen sgambamento en cada gran parque. España ha ampliado rápidamente su red de áreas caninas desde 2018.' },
      { q: '¿Son accesibles en transporte público los parques vallados?', a: 'Sí para todos, cada parque de la lista se encuentra en una ciudad ya cubierta por nuestra red de destinos, con acceso en tranvía, metro o autobús. La información detallada está en cada guía de ciudad matriz.' },
      { q: '¿Puedo llevar varios perros a un parque vallado?', a: 'Sí en casi todos los casos. Algunos sgambamenti italianos limitan a 2 perros por dueño en horas punta; la señalización en la entrada indica las normas locales.' },
    ],
    legalTitle: 'Reglas comunes a todas las zonas caninas valladas',
    legalParas: [
      `Las hembras esterilizadas, machos castrados y perros bien socializados son bienvenidos. Los perros agresivos o en celo no deberían entrar en una zona sin correa compartida, regla universal de etiqueta, no escrita.`,
      `Las bolsas para residuos son obligatorias en la zona vallada, la mayoría de parques tienen dispensadores en la entrada. Las multas van de 50 € a 750 € por infracción según la ciudad y el país.`,
      `Algunos parques separan los perros pequeños (menos de 10 kg) de los grandes con una segunda valla. Busca la señalización «Small dogs» / «Petits chiens» / «Cani piccoli» en la entrada.`,
    ],
  },
  pt: {
    kicker: 'Parques Caninos Vedados · Edição 2026',
    h1: `${PARKS.length} parques caninos vedados em Europa`,
    lede: `Toda GRANDE cidade europeia tem al menos uma zona canina vedada onde o teu cão pode correr libre sem trela, chamada Hundezone (Austria, Alemania), sgambamento (Italia), hundeskov (Dinamarca), caniparc (Francia), área canina (Espanha) o parque para cães (Portugal). Este é o inventário verificado a partir de nuestras ${destinations.length} guías urbanas.`,
    introTitle: 'Porquê importa a valla',
    introParas: [
      `Na maioria das cidades europeias, a trela é obrigatória por defecto em todo espaço público. As zonas caninas vedadas são a excepción legal: um perímetro seguro onde o cão pode correr libre sem violar as ordenanzas municipales, sem riesgo de tráfico e sem conflicto com corredores, ciclistas u otros usuarios.`,
      `Cada entrada abajo liga com a guía do seu cidade matriz, onde encontrarás a direção exacta, o transporte, os horarios, as normas locales sem trela e os hotéis pet-friendly verificados cercanos, cada recomendación chega até o paso de reserva.`,
    ],
    countryTitle: 'Distribución por país',
    countryIntro: `Alemania, Austria e Italia lideram Europa em infraestructura canina vedada gracias ao seu forte cultura de parque municipal. Espanha e Francia continuam com os seus crecientes redes de áreas caninas e caniparcs.`,
    countriesLabel: 'Países líderes',
    listTitle: 'A lista completa, orden alfabético por cidade',
    parksLabel: 'parques vedados',
    citiesLabel: 'cidades',
    countriesStatLabel: 'países',
    ctaTitle: 'Encuentra um hotel pet-friendly perto destes parques caninos',
    ctaDesc: 'Cada parque da lista liga com a guía do seu cidade matriz, com 5+ hotéis pet-friendly verificados por cidade, suplementos em EUR e ligações de afiliación Booking.com directos.',
    ctaButton: 'Todas as destinos →',
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: 'Como se chama um parque canino vedado em Europa?', a: 'Os nombres varían segundo o país: Hundezone o Hundewiese (Austria, Alemania, Suiza), sgambamento o area cani (Italia), hundeskov (Dinamarca), hondenuitlaatgebied o losloopgebied (Países Bajos), caniparc o aire pour chiens (Francia), área canina o zona canina (Espanha), parque para cães (Portugal). Todos designan lo mismo: um perímetro vedado onde se permite estar sem trela.' },
      { q: 'São gratuitos os parques caninos vedados?', a: 'Sí, todas as zonas caninas vedadas desta lista são equipamiento municipal público gratuito, abierto 24h salvo mención em contra. Uma pequena minoría de parques caninos privados de pago existen em Europa, ninguno está incluido aqui.' },
      { q: 'Que país europeu tem a MELHOR infraestructura de parques caninos vedados?', a: 'Por número per cápita: Austria, Alemania e Italia em cabeza. As cidades austriacas (Viena, Salzburgo, Graz) costumam contar com 5+ Hundezonen cada uma. As cidades italianas mantienen sgambamento em cada GRANDE parque. Espanha tem ampliado rápidamente o seu red de áreas caninas desde 2018.' },
      { q: 'São acessíveis em transporte público os parques vedados?', a: 'Sí para todos, cada parque da lista encontra-se numa cidade já cubierta por nuestra red de destinos, com acesso no elétrico, metro o autocarro. A informação detallada está em cada guía de cidade matriz.' },
      { q: 'Puedo levar varios cães a um parque vedado?', a: 'Sí em casi todos os casos. Algunos sgambamenti italianos limitan a 2 cães por dono em horas punta; a senhalización na entrada indica as normas locales.' },
    ],
    legalTitle: 'Reglas comunes a todas as zonas caninas vedadas',
    legalParas: [
      `As hembras esterilizadas, machos castrados e cães bien socializados são bem-vindos. Os cães agresivos o em celo no deberían entrar numa zona sem trela compartida, regla universal de etiqueta, no escrita.`,
      `As bolsas para residuos são obrigatórias na zona vedada, a maioria de parques têm dispensadores na entrada. As multas van de 50 € a 750 € por infração segundo a cidade e o país.`,
      `Algunos parques separan os cães pequenos (menos de 10 kg) dois grandes com uma segunda valla. Busca a senhalización «Small dogs» / «Petits chiens» / «Cani piccoli» na entrada.`,
    ],
  },
  de: {
    kicker: 'EINGEZÄUNTE HUNDEPARKS · AUSGABE 2026',
    h1: `${PARKS.length} eingezäunte Hundeparks in Europa`,
    lede: `Jede europäische Stadt hat mindestens eine eingezäunte Hundezone, in der Ihr Hund sicher ohne Leine laufen kann, lokal Hundezone (Österreich, Deutschland), sgambamento (Italien), hundeskov (Dänemark), caniparc (Frankreich), área canina (Spanien) oder parque para perros (Portugal) genannt. Dies ist das geprüfte Verzeichnis aus unseren ${destinations.length} Stadtführern.`,
    introTitle: 'Warum die Einzäunung wichtig ist',
    introParas: [
      `In den meisten europäischen Städten gilt die Leinenpflicht standardmäßig im gesamten öffentlichen Raum. Eingezäunte Hundezonen sind die rechtliche Ausnahme: gesicherte Bereiche, in denen ein Hund frei laufen kann, ohne gegen städtische Vorschriften zu verstoßen, ohne Verkehrsrisiko und ohne Konflikte mit Joggern, Radfahrern oder anderen Parkbesuchern.`,
      `Jeder Eintrag unten verlinkt zum zugehörigen Stadtführer, dort finden Sie die genaue Adresse, Verkehrsanbindung, Öffnungszeiten, die lokalen Regeln für den Freilauf und geprüfte haustierfreundliche Hotels in der Nähe, jede Empfehlung führt bis zum Buchungsschritt.`,
    ],
    countryTitle: 'Verteilung nach Land',
    countryIntro: `Deutschland, Österreich und Italien führen in Europa bei der Infrastruktur für eingezäunte Hundeparks dank ihrer starken Stadtpark-Kultur. Spanien und Frankreich folgen mit wachsenden Netzen an caniparcs und áreas caninas.`,
    countriesLabel: 'Top-Länder',
    listTitle: 'Die vollständige Liste, alphabetisch nach Stadt',
    parksLabel: 'eingezäunte Parks',
    citiesLabel: 'Städte',
    countriesStatLabel: 'Länder',
    ctaTitle: 'Finden Sie ein haustierfreundliches Hotel in der Nähe dieser Hundeparks',
    ctaDesc: 'Jeder Park in der Liste verlinkt zum zugehörigen Stadtführer, mit 5+ geprüften haustierfreundlichen Hotels pro Stadt, Haustiergebühren in EUR und direkten Booking.com-Affiliate-Links.',
    ctaButton: 'Alle Reiseziele ansehen →',
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      { q: 'Wie nennt man einen eingezäunten Hundepark in Europa?', a: `Die Bezeichnungen variieren je nach Land: Hundezone oder Hundewiese (Österreich, Deutschland, Schweiz), sgambamento oder area cani (Italien), hundeskov (Dänemark), hondenuitlaatgebied oder losloopgebied (Niederlande), caniparc oder aire pour chiens (Frankreich), área canina oder zona canina (Spanien), parque para cães (Portugal). Alle bezeichnen dasselbe: einen eingezäunten Bereich, in dem Freilauf erlaubt ist.` },
      { q: 'Sind eingezäunte Hundeparks kostenlos?', a: `Ja, alle eingezäunten Hundezonen dieser Liste sind öffentliche städtische Einrichtungen mit freiem Eintritt, sofern nicht anders angegeben rund um die Uhr geöffnet. Eine kleine Minderheit privater kommerzieller Hundeparks in Europa verlangt Eintritt, keiner davon ist hier enthalten.` },
      { q: 'Welches europäische Land hat die beste Infrastruktur für eingezäunte Hundeparks?', a: `Nach Anzahl pro Kopf führen Österreich, Deutschland und Italien. Österreichische Städte wie Wien, Salzburg und Graz haben in der Regel jeweils 5+ eingezäunte Hundezonen. Italienische Städte unterhalten sgambamento-Bereiche in jedem größeren Park. Spanien hat sein Netz an áreas caninas seit 2018 rasch ausgebaut.` },
      { q: 'Sind die eingezäunten Parks mit öffentlichen Verkehrsmitteln erreichbar?', a: `Ja, bei allen liegt jeder Park dieser Liste in einer Stadt, die bereits Teil unseres Reisezielnetzes ist, mit Anbindung durch Straßenbahn, U-Bahn oder Bus. Detaillierte Informationen zur Anreise finden Sie im jeweiligen Stadtführer.` },
      { q: 'Kann ich mehr als einen Hund in einen eingezäunten Park mitbringen?', a: `Ja, in fast allen Fällen. Eine kleine Zahl italienischer sgambamento-Bereiche begrenzt Besucher zu Stoßzeiten auf 2 Hunde pro Halter, Hinweisschilder am Eingang nennen etwaige lokale Regeln.` },
    ],
    legalTitle: 'Regeln, die für alle eingezäunten Hundezonen gelten',
    legalParas: [
      `Sterilisierte Hündinnen, kastrierte Rüden und gut sozialisierte Hunde sind willkommen. Aggressive oder läufige Hündinnen sollten nicht in eine gemeinsam genutzte Freilaufzone gebracht werden, dies ist eine allgemeine Park-Etikette-Regel und wird nicht durch Beschilderung durchgesetzt.`,
      `Kotbeutel sind in der eingezäunten Zone Pflicht, die meisten Parks stellen Spender am Eingang bereit. Die Bußgelder reichen je nach Stadt und Land von 50 € bis 750 € pro nicht entferntem Kot.`,
      `Manche Parks trennen kleine Hunde (unter 10 kg) mit einem zweiten Zaun von großen Hunden. Achten Sie am Tor auf Schilder wie „Small dogs" / „Petits chiens" / „Cani piccoli".`,
    ],
  },
  nl: {
    kicker: 'OMHEINDE HONDENPARKEN · EDITIE 2026',
    h1: `${PARKS.length} omheinde hondenparken in Europa`,
    lede: `Elke Europese stad heeft minstens één omheinde hondenzone waar je hond veilig los kan lopen, plaatselijk Hundezone (Oostenrijk, Duitsland), sgambamento (Italië), hundeskov (Denemarken), caniparc (Frankrijk), área canina (Spanje) of parque para cães (Portugal) genoemd. Dit is de geverifieerde inventaris uit onze ${destinations.length} stadsgidsen.`,
    introTitle: 'Waarom een omheining belangrijk is',
    introParas: [
      `In de meeste Europese steden geldt standaard een aanlijnplicht in alle openbare ruimtes. Omheinde hondenzones zijn de wettelijke uitzondering: veilige, afgesloten gebieden waar je hond vrij kan rennen zonder gemeentelijke regels te overtreden, zonder verkeersrisico en zonder conflicten met joggers, fietsers of andere parkbezoekers.`,
      `Elk item hieronder linkt terug naar de bijbehorende stadsgids, waar je het exacte adres, vervoer, openingstijden, de lokale losloopregels en geverifieerde huisdiervriendelijke hotels in de buurt vindt, elke aanbeveling gaat door tot en met de boekingsstap.`,
    ],
    countryTitle: 'Verdeling per land',
    countryIntro: `Duitsland, Oostenrijk en Italië lopen in Europa voorop op het gebied van omheinde hondeninfrastructuur, dankzij hun sterke stadsparkcultuur. Spanje en Frankrijk volgen met groeiende netwerken van caniparcs en áreas caninas.`,
    countriesLabel: 'Toplanden',
    listTitle: 'De volledige lijst, alfabetisch op stad',
    parksLabel: 'omheinde parken',
    citiesLabel: 'steden',
    countriesStatLabel: 'landen',
    ctaTitle: 'Vind een huisdiervriendelijk hotel bij deze hondenparken',
    ctaDesc: 'Elk park in de lijst linkt naar de bijbehorende stadsgids, met 5+ geverifieerde huisdiervriendelijke hotels per stad, huisdiertoeslagen in EUR en directe Booking.com-affiliatelinks.',
    ctaButton: 'Bekijk alle bestemmingen →',
    faqTitle: 'Veelgestelde vragen',
    faqs: [
      { q: 'Hoe noem je een omheind hondenpark in Europa?', a: `De namen verschillen per land: Hundezone of Hundewiese (Oostenrijk, Duitsland, Zwitserland), sgambamento of area cani (Italië), hundeskov (Denemarken), hondenuitlaatgebied of losloopgebied (Nederland), caniparc of aire pour chiens (Frankrijk), área canina of zona canina (Spanje), parque para cães (Portugal). Ze duiden allemaal hetzelfde aan: een omheind gebied waar loslopen is toegestaan.` },
      { q: 'Is de toegang tot omheinde hondenparken gratis?', a: `Ja, alle omheinde hondenzones in deze lijst zijn openbare gemeentelijke voorzieningen met gratis toegang, tenzij anders vermeld dag en nacht open. Een kleine minderheid van particuliere commerciële hondenparken in Europa vraagt entree, geen daarvan staat in deze lijst.` },
      { q: 'Welk Europees land heeft de beste infrastructuur voor omheinde hondenparken?', a: `Per hoofd van de bevolking lopen Oostenrijk, Duitsland en Italië voorop. Oostenrijkse steden zoals Wenen, Salzburg en Graz hebben doorgaans elk 5+ omheinde Hundezonen. Italiaanse steden onderhouden sgambamento-gebieden in elk groot park. Spanje heeft zijn netwerk van áreas caninas sinds 2018 snel uitgebreid.` },
      { q: 'Zijn de omheinde parken bereikbaar met het openbaar vervoer?', a: `Ja, voor allemaal, elk park in deze lijst ligt in een stad die al deel uitmaakt van ons bestemmingennetwerk, met tram-, metro- of busverbinding. Gedetailleerde vervoersinformatie staat in elke bijbehorende stadsgids.` },
      { q: 'Mag ik meer dan één hond meenemen naar een omheind park?', a: `Ja, in bijna alle gevallen. Een klein aantal Italiaanse sgambamento-gebieden beperkt bezoekers tijdens piekuren tot 2 honden per baasje; bordjes bij de ingang vermelden eventuele lokale regels.` },
    ],
    legalTitle: 'Regels die gelden voor alle omheinde hondenzones',
    legalParas: [
      `Gesteriliseerde teven, gecastreerde reuen en goed gesocialiseerde honden zijn welkom. Agressieve honden of teven die loops zijn, breng je beter niet naar een gedeelde losloopzone, dit is een algemene ongeschreven parketiquette en wordt niet met bordjes gehandhaafd.`,
      `Poepzakjes zijn verplicht binnen de omheinde zone, de meeste parken hebben dispensers bij de ingang. Boetes lopen van 50 € tot 750 € per niet opgeruimde drol, afhankelijk van stad en land.`,
      `Sommige parken scheiden kleine honden (onder de 10 kg) met een tweede hek van grote honden. Let bij het hek op bordjes als "Small dogs" / "Petits chiens" / "Cani piccoli".`,
    ],
  },
  it: {
    kicker: 'PARCHI CANI RECINTATI · EDIZIONE 2026',
    h1: `${PARKS.length} parchi cani recintati in Europa`,
    lede: `Ogni città europea ha almeno una zona canina recintata dove il tuo cane può correre libero senza guinzaglio, chiamata localmente Hundezone (Austria, Germania), sgambamento (Italia), hundeskov (Danimarca), caniparc (Francia), área canina (Spagna) o parque para cães (Portogallo). Questo è l'inventario verificato dalle nostre ${destinations.length} guide di città.`,
    introTitle: 'Perché la recinzione conta',
    introParas: [
      `Nella maggior parte delle città europee, il guinzaglio è obbligatorio per default in tutti gli spazi pubblici. Le zone canine recintate sono l'eccezione legale: perimetri sicuri dove il cane può correre libero senza infrangere i regolamenti comunali, senza rischio di traffico e senza conflitti con jogger, ciclisti o altri utenti del parco.`,
      `Ogni voce qui sotto rimanda alla guida della città di riferimento, dove trovi l'indirizzo esatto, i trasporti, gli orari di apertura, le regole locali senza guinzaglio e hotel pet-friendly verificati nelle vicinanze, ogni consiglio arriva fino al passo della prenotazione.`,
    ],
    countryTitle: 'Distribuzione per paese',
    countryIntro: `Germania, Austria e Italia guidano l'Europa nell'infrastruttura di parchi cani recintati grazie a una forte cultura del parco comunale. Spagna e Francia seguono con reti crescenti di caniparc e áreas caninas.`,
    countriesLabel: 'Paesi principali',
    listTitle: "L'elenco completo, in ordine alfabetico di città",
    parksLabel: 'parchi recintati',
    citiesLabel: 'città',
    countriesStatLabel: 'paesi',
    ctaTitle: 'Trova un hotel pet-friendly vicino a questi parchi cani',
    ctaDesc: `Ogni parco dell'elenco rimanda alla guida della città di riferimento, con 5+ hotel pet-friendly verificati per città, supplementi per animali in EUR e link di affiliazione diretti a Booking.com.`,
    ctaButton: 'Vedi tutte le destinazioni →',
    faqTitle: 'Domande frequenti',
    faqs: [
      { q: 'Come si chiama un parco cani recintato in Europa?', a: `I nomi variano da paese a paese: Hundezone o Hundewiese (Austria, Germania, Svizzera), sgambamento o area cani (Italia), hundeskov (Danimarca), hondenuitlaatgebied o losloopgebied (Paesi Bassi), caniparc o aire pour chiens (Francia), área canina o zona canina (Spagna), parque para cães (Portogallo). Indicano tutti la stessa cosa: un perimetro recintato dove è consentito il gioco senza guinzaglio.` },
      { q: "L'ingresso ai parchi cani recintati è gratuito?", a: `Sì, tutte le zone canine recintate di questo elenco sono infrastrutture comunali pubbliche a ingresso gratuito, aperte 24 ore su 24 salvo diversa indicazione. Una piccola minoranza di parchi cani privati a pagamento esiste in Europa, nessuno di questi è incluso qui.` },
      { q: 'Quale paese europeo ha la migliore infrastruttura di parchi cani recintati?', a: `Per numero pro capite: Austria, Germania e Italia sono in testa. Città austriache come Vienna, Salisburgo e Graz hanno tipicamente 5+ Hundezonen recintate ciascuna. Le città italiane mantengono aree sgambamento in ogni parco principale. La Spagna ha rapidamente ampliato la sua rete di áreas caninas dal 2018.` },
      { q: 'I parchi recintati sono raggiungibili con i mezzi pubblici?', a: `Sì, per tutti: ogni parco di questo elenco si trova in una città già coperta dalla nostra rete di destinazioni, con accesso in tram, metro o autobus. Le informazioni dettagliate sui trasporti sono in ogni guida della città di riferimento.` },
      { q: 'Posso portare più di un cane in un parco recintato?', a: `Sì, in quasi tutti i casi. Un piccolo numero di aree sgambamento italiane limita i visitatori a 2 cani per proprietario nelle ore di punta; la segnaletica all'ingresso indica eventuali regole locali.` },
    ],
    legalTitle: 'Regole comuni a tutte le zone canine recintate',
    legalParas: [
      `Femmine sterilizzate, maschi castrati e cani ben socializzati sono benvenuti. I cani aggressivi o in calore non dovrebbero essere portati in una zona senza guinzaglio condivisa, una regola universale di educazione al parco, non fatta rispettare da cartelli.`,
      `I sacchetti per le deiezioni sono obbligatori all'interno della zona recintata, la maggior parte dei parchi mette a disposizione distributori all'ingresso. Le multe vanno da 50 € a 750 € per ogni mancata raccolta, a seconda della città e del paese.`,
      `Alcuni parchi separano i cani piccoli (sotto i 10 kg) dai cani grandi con una seconda recinzione. Cerca la segnaletica "Small dogs" / "Petits chiens" / "Cani piccoli" al cancello.`,
    ],
  },
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const l = locale as Locale
  const t = COPY[l] ?? COPY.en!

  // Sort PARKS alphabetically by city name in the active locale
  const sorted = [...PARKS].sort((a, b) => {
    const an = getLocalizedCityName(a.citySlug, destinations.find((d) => d.slug === a.citySlug)?.name ?? a.citySlug, l)
    const bn = getLocalizedCityName(b.citySlug, destinations.find((d) => d.slug === b.citySlug)?.name ?? b.citySlug, l)
    return an.localeCompare(bn, l)
  })

  // Schema.org Article + ItemList + FAQPage
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: t.h1,
      description: t.lede,
      datePublished: '2026-05-13T00:00:00Z',
      dateModified: '2026-06-26',
      author: { '@type': 'Person', name: 'HotelsWithPets Editorial', jobTitle: 'Pet Travel Editor', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL },
      mainEntityOfPage: `${SITE_URL}/${l}/guides/${SLUG}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      numberOfItems: PARKS.length,
      itemListElement: sorted.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        url: `${SITE_URL}/${l}/destinations/${p.citySlug}/parks`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: t.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-700">{t.kicker}</p>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">{t.h1}</h1>
          <p className="text-lg leading-relaxed text-gray-700">{t.lede}</p>
          <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg bg-cyan-50 p-4 text-sm">
            <div><div className="text-2xl font-bold text-cyan-800">{PARKS.length}</div><div className="text-cyan-900/70">{t.parksLabel}</div></div>
            <div><div className="text-2xl font-bold text-cyan-800">{CITY_COUNT}</div><div className="text-cyan-900/70">{t.citiesLabel}</div></div>
            <div><div className="text-2xl font-bold text-cyan-800">{COUNTRY_TALLY.length}</div><div className="text-cyan-900/70">{t.countriesStatLabel}</div></div>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">{t.introTitle}</h2>
          {t.introParas.map((p, i) => (<p key={i} className="mb-4 leading-relaxed text-gray-700">{p}</p>))}
        </section>

        <section className="mb-12">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">{t.countryTitle}</h2>
          <p className="mb-4 leading-relaxed text-gray-700">{t.countryIntro}</p>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-600"><tr>
                <th className="px-4 py-2 font-medium">{t.countriesLabel}</th>
                <th className="px-4 py-2 text-right font-medium">{t.parksLabel}</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {COUNTRY_TALLY.slice(0, 10).map(([c, n]) => (
                  <tr key={c}>
                    <td className="px-4 py-2 text-gray-900">{getLocalizedCountryName(c, l)}</td>
                    <td className="px-4 py-2 text-right font-mono tabular-nums text-gray-700">{n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">{t.listTitle}</h2>
          <ol className="space-y-5">
            {sorted.map((p, i) => {
              const dest = destinations.find((d) => d.slug === p.citySlug)
              if (!dest) return null
              const cityName = getLocalizedCityName(p.citySlug, dest.name, l)
              const countryName = getLocalizedCountryName(dest.country, l)
              const desc = l === 'fr' ? p.descFr : l === 'es' ? p.descEs : l === 'nl' ? p.descNl ?? p.descEn : l === 'de' ? p.descDe ?? p.descEn : l === 'it' ? p.descIt ?? p.descEn : p.descEn
              const proximityLabel =
                l === 'fr' ? `Où dormir près de ${p.name}` :
                l === 'es' ? `Dónde dormir cerca de ${p.name}` :
                l === 'pt' ? `Onde dormir perto de ${p.name}` :
                l === 'nl' ? `Overnachten bij ${p.name}` :
                l === 'de' ? `Übernachten in der Nähe von ${p.name}` :
                l === 'it' ? `Dove dormire vicino a ${p.name}` :
                `Where to stay near ${p.name}`
              return (
                <li key={`${p.citySlug}-${p.name}-${i}`} className="rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
                  <Link href={`/${l}/destinations/${p.citySlug}/parks`} className="flex flex-col sm:flex-row">
                    {p.photo && (
                      <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-t-xl bg-gray-100 sm:h-auto sm:w-56 sm:rounded-l-xl sm:rounded-tr-none">
                        <Image src={p.photo} alt={p.name} fill sizes="(max-width:640px) 100vw, 224px" className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 p-5">
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-semibold text-emerald-800">🔒 Fenced</span>
                        {p.size && <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">{p.size}</span>}
                        {p.neighborhood && <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">{p.neighborhood}</span>}
                      </div>
                      <h3 className="mb-1 text-xl font-bold text-gray-900">{p.name}</h3>
                      <p className="mb-2 text-sm text-gray-500">{dest.flag} {cityName}, {countryName}</p>
                      <p className="text-sm leading-relaxed text-gray-700">{desc}</p>
                    </div>
                  </Link>
                  <div className="px-5 pb-5 sm:pl-56">
                    <NearbyHotelCard destinationSlug={p.citySlug} locale={l} variant="compact" proximityLabel={proximityLabel} />
                  </div>
                </li>
              )
            })}
          </ol>
        </section>

        <section className="mb-12 rounded-xl bg-cyan-50 p-6 sm:p-8">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">{t.ctaTitle}</h2>
          <p className="mb-5 leading-relaxed text-gray-700">{t.ctaDesc}</p>
          <Link href={`/${l}/destinations`} className="inline-flex rounded-lg bg-cyan-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-800">{t.ctaButton}</Link>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">{t.legalTitle}</h2>
          {t.legalParas.map((p, i) => (<p key={i} className="mb-3 leading-relaxed text-gray-700">{p}</p>))}
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">{t.faqTitle}</h2>
          <div className="space-y-4">
            {t.faqs.map((f, i) => (
              <details key={i} className="group rounded-lg border border-gray-200 bg-white p-4 open:shadow-sm">
                <summary className="cursor-pointer list-none font-semibold text-gray-900">{f.q}</summary>
                <p className="mt-3 leading-relaxed text-gray-700">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <GuideFooter locale={l} currentSlug={SLUG} />
      </article>

      <StickyHotelCTA
        href={`https://www.stay22.com/allez/roam?aid=${STAY22_AID}&campaign=fenced-parks-sticky&address=${encodeURIComponent('Europe')}`}
        label={
          l === 'fr' ? `Hôtels pet-friendly dans les grandes villes européennes` :
          l === 'es' ? 'Hoteles pet-friendly en grandes ciudades europeas' :
          l === 'pt' ? `Hotéis pet-friendly nas grandes cidades europeias` :
          l === 'nl' ? 'Huisdiervriendelijke hotels in grote Europese steden' :
          l === 'de' ? 'Tierfreundliche Hotels in den großen europäischen Städten' :
          l === 'it' ? 'Hotel pet-friendly nelle grandi città europee' :
          'Pet-friendly hotels in major European cities'
        }
        cta={l === 'fr' ? 'Voir' : l === 'es' ? 'Ver' : l === 'pt' ? 'Ver' : l === 'nl' ? 'Bekijk' : l === 'de' ? 'Ansehen' : l === 'it' ? 'Vedi' : 'View'}
      />
    </>
  )
}
