import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'
import { getLocalizedCityName } from '@/lib/cityNames'
import { getLocalizedCountryName } from '@/lib/countries'
import destinations from '@/data/destinations.json'
import hotels from '@/data/hotels.json'
import PetMap from '@/components/PetMap'
import NearbyHotelCard from '@/components/NearbyHotelCard'

const SLUG = 'top-dog-friendly-islands-europe'

// 25 islands ranked by: dog-beach availability (year-round vs seasonal), ferry/transport
// rules, density of pet-friendly accommodation, mild-climate suitability for dogs,
// and vet coverage. Where a destination slug exists, the rank card uses that city's
// hero image and links to its full guide. Where none exists, the card uses a hero
// image from /public/images/islands/{photoSlug}.jpg (fetched via Google Places).
type IslandEntry = {
  slug: string | null
  photoSlug: string
  rank: number
  islandName: string
  country: string
  flag: string
  reason: { en: string; fr: string; es: string; pt: string; de: string; nl: string }
}

const TOP_25: IslandEntry[] = [
  { slug: 'palma', rank: 1, photoSlug: 'palma', islandName: 'Mallorca', country: 'Spain', flag: '🇪🇸', reason: {
    en: `The largest Balearic island combines abundant pet-friendly fincas inland with several officially designated dog beaches around the coast, and a year-round mild climate ideal for travelling with a dog.`,
    fr: `La plus grande des Baléares cumule des fincas pet-friendly à l'intérieur des terres, plusieurs plages officiellement réservées aux chiens sur le littoral et un climat doux toute l'année, idéal pour voyager avec un chien.`,
    es: `La isla balear más grande combina abundantes fincas pet-friendly en el interior con varias playas caninas oficialmente designadas en la costa, y un clima suave todo el año ideal para viajar con perro.`,
    pt: `A maior ilha das Baleares combina abundantes fincas pet-friendly no interior com várias praias caninas oficialmente designadas ao longo da costa, e um clima ameno o ano inteiro, ideal para viajar com cão.`,
    de: `Die größte Baleareninsel vereint zahlreiche haustierfreundliche Fincas im Landesinneren mit mehreren offiziell ausgewiesenen Hundestränden an der Küste, dazu ein ganzjährig mildes Klima, ideal für Reisen mit Hund.`,
    nl: `Het grootste Balearen-eiland combineert talloze huisdiervriendelijke finca's landinwaarts met verschillende officieel aangewezen hondenstranden aan de kust, plus een jaarrond mild klimaat, ideaal als je met je hond op reis gaat.`,
  }},
  { slug: 'funchal', rank: 2, photoSlug: 'funchal', islandName: 'Madeira', country: 'Portugal', flag: '🇵🇹', reason: {
    en: `Year-round mild climate (18-24 °C even in winter), an extensive network of levadas for dog walking, and a pet-friendly hotel inventory that has grown sharply since 2023.`,
    fr: `Le climat est doux toute l'année (18-24 °C même en janvier), le réseau des levadas offre des centaines de kilomètres de promenades canines à l'ombre, et l'offre d'hôtels pet-friendly a explosé depuis 2023.`,
    es: `Clima suave todo el año (18-24 °C incluso en invierno), una extensa red de levadas para pasear al perro, y una oferta de hoteles pet-friendly en fuerte crecimiento desde 2023.`,
    pt: `Clima ameno o ano inteiro (18-24 °C mesmo no inverno), uma vasta rede de levadas para passear o cão, e uma oferta de hotéis pet-friendly em forte crescimento desde 2023.`,
    de: `Ganzjährig mildes Klima (18-24 °C selbst im Winter), ein ausgedehntes Netz von Levadas zum Gassigehen, und ein Angebot an haustierfreundlichen Hotels, das seit 2023 stark gewachsen ist.`,
    nl: `Jaarrond mild klimaat (18-24 °C zelfs in de winter), een uitgebreid netwerk van levadas om mee te wandelen met je hond, en een aanbod huisdiervriendelijke hotels dat sinds 2023 flink is gegroeid.`,
  }},
  { slug: 'heraklion', rank: 3, photoSlug: 'heraklion', islandName: 'Crete', country: 'Greece', flag: '🇬🇷', reason: {
    en: `The biggest Greek island offers Anek and Minoan ferries that accept dogs (in cabins or designated pet areas), a deep network of mountain villages and tavernas relaxed about dogs, and quieter shoulder-season beaches.`,
    fr: `Sur la plus grande île grecque, les compagnies Anek et Minoan acceptent les chiens à bord (en cabine ou dans des zones dédiées), les tavernes des villages de montagne sont traditionnellement détendues avec les animaux, et les plages se vident hors saison.`,
    es: `La mayor isla griega ofrece ferris Anek y Minoan que admiten perros (en camarote o zonas para mascotas), una red profunda de pueblos de montaña y tabernas relajadas con perros, y playas tranquilas fuera de temporada.`,
    pt: `A maior ilha grega oferece ferries Anek e Minoan que aceitam cães (em camarote ou zonas para animais), uma rede profunda de aldeias de montanha e tavernas descontraídas com cães, e praias tranquilas fora de época.`,
    de: `Die größte griechische Insel bietet Anek- und Minoan-Fähren, die Hunde an Bord akzeptieren (in der Kabine oder in speziellen Tierbereichen), ein dichtes Netz von Bergdörfern und Tavernen, die traditionell entspannt mit Hunden umgehen, sowie ruhigere Strände in der Nebensaison.`,
    nl: `Het grootste Griekse eiland heeft Anek- en Minoan-veerboten die honden aan boord toelaten (in de cabine of in speciale huisdierzones), een dicht netwerk van bergdorpjes en taverna's die van oudsher relaxed omgaan met honden, en rustigere stranden buiten het hoogseizoen.`,
  }},
  { slug: 'palermo', rank: 4, photoSlug: 'palermo', islandName: 'Sicily', country: 'Italy', flag: '🇮🇹', reason: {
    en: `The largest Mediterranean island. Bau Beach Mondello (near Palermo) is one of Italy's most established dog beaches, Etna offers high-altitude dog walks in summer, and Sicilian agriturismi are widely pet-tolerant.`,
    fr: `La plus grande île de Méditerranée. La Bau Beach de Mondello, près de Palerme, fait partie des plages canines italiennes les plus anciennes, l'Etna offre des sentiers d'altitude en été pour échapper à la chaleur, et les agriturismi siciliens acceptent presque tous les chiens.`,
    es: `La isla más grande del Mediterráneo. Bau Beach Mondello (cerca de Palermo) es una de las playas caninas italianas más establecidas, el Etna ofrece paseos en altitud en verano, y los agriturismi sicilianos son ampliamente tolerantes con perros.`,
    pt: `A maior ilha do Mediterrâneo. Bau Beach Mondello (perto de Palermo) é uma das praias caninas italianas mais estabelecidas, o Etna oferece passeios em altitude no verão, e os agriturismi sicilianos são largamente tolerantes com cães.`,
    de: `Die größte Insel im Mittelmeer. Der Bau Beach Mondello bei Palermo gehört zu Italiens etabliertesten Hundestränden, der Ätna bietet im Sommer Wanderungen in großer Höhe, und sizilianische Agriturismi sind überwiegend hundefreundlich.`,
    nl: `Het grootste eiland in de Middellandse Zee. Bau Beach Mondello bij Palermo is een van Italië's meest gevestigde hondenstranden, de Etna biedt 's zomers wandelingen op grote hoogte, en Siciliaanse agriturismi zijn overwegend hondvriendelijk.`,
  }},
  { slug: 'cagliari', rank: 5, photoSlug: 'sardinia', islandName: 'Sardinia', country: 'Italy', flag: '🇮🇹', reason: {
    en: `Beach-heavy and lower-density than Sicily, with pet-friendly agriturismi inland and a coastline dotted with cove beaches where dogs are tolerated off-season.`,
    fr: `Plage à perte de vue et densité humaine moitié moindre qu'en Sicile. Les agriturismi de l'intérieur acceptent presque tous les chiens, et le littoral est parsemé de criques où ils sont tolérés en avril-mai et septembre-octobre.`,
    es: `Muy enfocada a playas y menos poblada que Sicilia, con agriturismi pet-friendly en el interior y un litoral salpicado de calas donde se toleran perros fuera de temporada.`,
    pt: `Muito focada em praias e menos povoada do que a Sicília, com agriturismi pet-friendly no interior e um litoral pontuado de enseadas onde os cães são tolerados fora de época.`,
    de: `Sehr strandlastig und dünner besiedelt als Sizilien, mit haustierfreundlichen Agriturismi im Landesinneren und einer Küste voller Buchten, in denen Hunde außerhalb der Hochsaison toleriert werden.`,
    nl: `Veel strand en dunner bevolkt dan Sicilië, met huisdiervriendelijke agriturismi landinwaarts en een kust vol baaien waar honden buiten het hoogseizoen worden getolereerd.`,
  }},
  { slug: 'ibiza', rank: 6, photoSlug: 'ibiza', islandName: 'Ibiza', country: 'Spain', flag: '🇪🇸', reason: {
    en: `Cala Bassa and a few northern coves accept dogs out of peak season, the pine-forested interior is much calmer than the south, and shoulder-season Ibiza is genuinely dog-relaxing.`,
    fr: `Cala Bassa et plusieurs criques du nord ouvrent leurs portes aux chiens hors haute saison. L'intérieur, couvert de pinèdes, reste très calme, et Ibiza hors été est une vraie destination canine, à mille lieues du cliché du clubbing.`,
    es: `Cala Bassa y algunas calas del norte admiten perros fuera de temporada alta, el interior boscoso de pinos es mucho más tranquilo que el sur, y Ibiza fuera de temporada es realmente relajante para perros.`,
    pt: `Cala Bassa e algumas enseadas a norte aceitam cães fora da época alta, o interior coberto de pinhais é bem mais calmo do que o sul, e Ibiza fora de época é genuinamente relaxante para cães.`,
    de: `Cala Bassa und einige Buchten im Norden erlauben Hunde außerhalb der Hauptsaison, das kiefernbewaldete Landesinnere ist deutlich ruhiger als der Süden, und Ibiza in der Nebensaison ist eine wirklich entspannte Hundedestination.`,
    nl: `Cala Bassa en een paar baaien in het noorden laten honden toe buiten het hoogseizoen, het met dennen begroeide binnenland is veel rustiger dan het zuiden, en Ibiza buiten het seizoen is echt een ontspannen hondenbestemming.`,
  }},
  { slug: null, rank: 7, photoSlug: 'menorca', islandName: 'Menorca', country: 'Spain', flag: '🇪🇸', reason: {
    en: `The quieter Balearic, with a designated dog beach near Son Bou and the Camí de Cavalls coastal trail offering 185 km of off-season dog walking with sea views all the way.`,
    fr: `La plus tranquille des Baléares. Une plage canine désignée à proximité de Son Bou, et surtout le Camí de Cavalls : 185 km de sentier littoral en boucle autour de l'île, ouvert aux chiens en laisse hors saison estivale, avec vue mer permanente.`,
    es: `La balear más tranquila, con una playa canina designada cerca de Son Bou y el Camí de Cavalls que ofrece 185 km de paseo canino fuera de temporada con vistas al mar en todo el recorrido.`,
    pt: `A balear mais tranquila, com uma praia canina designada perto de Son Bou e o Camí de Cavalls que oferece 185 km de passeio canino fora de época com vista para o mar em todo o percurso.`,
    de: `Die ruhigere Baleareninsel, mit einem ausgewiesenen Hundestrand nahe Son Bou und dem Camí de Cavalls, der außerhalb der Sommersaison 185 km Küstenweg zum Gassigehen mit durchgehendem Meerblick bietet.`,
    nl: `Het rustigere Balearen-eiland, met een aangewezen hondenstrand vlak bij Son Bou en de Camí de Cavalls, die buiten het zomerseizoen 185 km kustpad biedt om mee te wandelen, met de hele route uitzicht op zee.`,
  }},
  { slug: 'ajaccio', rank: 8, photoSlug: 'corsica', islandName: 'Corsica', country: 'France', flag: '🇫🇷', reason: {
    en: `Mountains meet beach. Calvi and Bonifacio both have pet-friendly old towns, the GR20 (in its lower sections) accepts dogs, and Corsica Ferries officially welcomes dogs in cabins.`,
    fr: `La montagne plonge dans la mer. Calvi et Bonifacio ont chacune leur vieille ville pet-friendly, le GR20 accepte les chiens sur ses tronçons les plus bas, et Corsica Ferries propose officiellement des cabines acceptant les chiens depuis le continent.`,
    es: `La montaña se encuentra con la playa. Calvi y Bonifacio tienen ambos cascos viejos pet-friendly, el GR20 (en sus tramos bajos) admite perros, y Corsica Ferries acepta oficialmente perros en camarote.`,
    pt: `A montanha encontra a praia. Calvi e Bonifacio têm ambos centros antigos pet-friendly, o GR20 (nos seus troços baixos) aceita cães, e a Corsica Ferries acolhe oficialmente cães em camarote.`,
    de: `Berge treffen auf Strand. Calvi und Bonifacio haben beide haustierfreundliche Altstädte, der GR20 akzeptiert Hunde in seinen unteren Abschnitten, und Corsica Ferries heißt Hunde offiziell in Kabinen willkommen.`,
    nl: `Bergen ontmoeten strand. Calvi en Bonifacio hebben allebei een huisdiervriendelijke oude stad, de GR20 laat honden toe op de lagere trajecten, en Corsica Ferries heet honden officieel welkom in de cabines.`,
  }},
  { slug: 'reykjavik', rank: 9, photoSlug: 'reykjavik', islandName: 'Iceland', country: 'Iceland', flag: '🇮🇸', reason: {
    en: `Iceland counts as a (very large) island. The Heiðmörk reserve and dog beaches around Nauthólsvík are well used by locals, but strict import rules (4-week minimum quarantine, expensive paperwork) make this a destination for long stays only.`,
    fr: `L'Islande est techniquement une (très grande) île. La réserve de Heiðmörk et les plages de Nauthólsvík sont prisées des locaux, mais les règles d'importation sont parmi les plus strictes d'Europe (quarantaine de 4 semaines minimum, démarches coûteuses) : à réserver aux séjours longs ou à l'expatriation.`,
    es: `Islandia cuenta como una (muy grande) isla. La reserva de Heiðmörk y las playas caninas en Nauthólsvík son muy usadas por locales, pero las normas estrictas de importación (cuarentena mínima de 4 semanas, papeleo caro) la convierten en destino solo para estancias largas.`,
    pt: `A Islândia conta como uma ilha (muito grande). A reserva de Heiðmörk e as praias caninas em Nauthólsvík são muito usadas pelos locais, mas as regras de importação rigorosas (quarentena mínima de 4 semanas, burocracia cara) fazem dela um destino apenas para estadias longas.`,
    de: `Island zählt als (sehr große) Insel. Das Naturreservat Heiðmörk und die Hundestrände bei Nauthólsvík sind bei Einheimischen beliebt, doch strenge Einfuhrbestimmungen (mindestens 4 Wochen Quarantäne, teurer Papierkram) machen sie nur für lange Aufenthalte zum sinnvollen Ziel.`,
    nl: `IJsland telt als een (heel groot) eiland. Het natuurreservaat Heiðmörk en de hondenstranden bij Nauthólsvík zijn populair bij locals, maar strenge invoerregels (minimaal 4 weken quarantaine, dure papierwinkel) maken het alleen zinvol als je lang blijft.`,
  }},
  { slug: null, rank: 10, photoSlug: 'hvar', islandName: 'Hvar', country: 'Croatia', flag: '🇭🇷', reason: {
    en: `Boutique pet-friendly stays cluster around Stari Grad and Jelsa, much calmer than Hvar Town. Jadrolinija ferries from Split accept leashed dogs, and pine-shaded coves are walkable with dogs out of peak.`,
    fr: `Les hébergements pet-friendly haut de gamme se concentrent à Stari Grad et Jelsa, bien plus calmes que Hvar Town. Les ferries Jadrolinija au départ de Split acceptent les chiens en laisse, et les criques ombragées de pins sont accessibles à pied en avant- et arrière-saison.`,
    es: `Los alojamientos pet-friendly boutique se concentran en Stari Grad y Jelsa, mucho más tranquilos que Hvar Town. Los ferris Jadrolinija desde Split admiten perros con correa, y las calas con sombra de pinos se pasean con perro fuera de temporada.`,
    pt: `Os alojamentos pet-friendly boutique concentram-se em Stari Grad e Jelsa, muito mais calmos do que Hvar Town. Os ferries Jadrolinija a partir de Split aceitam cães com trela, e as enseadas com sombra de pinheiros são passeáveis com cão fora de época.`,
    de: `Boutique-Unterkünfte für Haustiere konzentrieren sich auf Stari Grad und Jelsa, deutlich ruhiger als Hvar Stadt. Die Jadrolinija-Fähren ab Split akzeptieren Hunde an der Leine, und die pinienbeschatteten Buchten sind außerhalb der Hochsaison mit Hund begehbar.`,
    nl: `Boetiek-accommodaties voor huisdieren concentreren zich rond Stari Grad en Jelsa, veel rustiger dan Hvar Stad. De Jadrolinija-veerboten vanuit Split laten honden aan de lijn toe, en de door pijnbomen beschaduwde baaien zijn buiten het hoogseizoen prima te belopen met je hond.`,
  }},
  { slug: null, rank: 11, photoSlug: 'korcula', islandName: 'Korčula', country: 'Croatia', flag: '🇭🇷', reason: {
    en: `Quiet, walkable and ferry-accessible from Split. The old walled town is small enough to cross with a dog in 20 minutes, and stone beaches around Lumbarda are dog-tolerant outside high season.`,
    fr: `Petite, piétonne, à 2 h de ferry de Split. La vieille ville fortifiée se traverse en 20 minutes avec un chien, et les plages de galets autour de Lumbarda restent tolérantes aux chiens en dehors de juillet-août.`,
    es: `Tranquila, peatonal y accesible en ferri desde Split. El casco viejo amurallado se cruza en 20 minutos con perro, y las playas de piedra alrededor de Lumbarda toleran perros fuera de temporada alta.`,
    pt: `Calma, pedonal e acessível por ferry a partir de Split. O centro antigo amuralhado atravessa-se em 20 minutos com cão, e as praias de pedra à volta de Lumbarda toleram cães fora de época alta.`,
    de: `Ruhig, fußläufig und per Fähre von Split aus erreichbar. Die ummauerte Altstadt lässt sich mit Hund in 20 Minuten durchqueren, und die Steinstrände rund um Lumbarda tolerieren Hunde außerhalb der Hochsaison.`,
    nl: `Rustig, goed te belopen en per veerboot vanuit Split bereikbaar. De ommuurde oude stad steek je met je hond in 20 minuten over, en de stenen stranden rond Lumbarda tolereren honden buiten het hoogseizoen.`,
  }},
  { slug: 'split', rank: 12, photoSlug: 'split', islandName: 'Brač', country: 'Croatia', flag: '🇭🇷', reason: {
    en: `Brač is a 50-minute ferry from Split. Zlatni Rat (the famous V-shaped beach) has a seasonal dog zone at its western end, and the island's interior pine forests are open for dog walking year-round.`,
    fr: `À 50 minutes de ferry de Split. La célèbre plage en V de Zlatni Rat dispose d'une zone canine saisonnière à son extrémité ouest, et les pinèdes de l'intérieur de l'île restent praticables à l'année.`,
    es: `Brač está a 50 min en ferri de Split. Zlatni Rat (la famosa playa en V) tiene una zona canina estacional en su extremo oeste, y los pinares del interior se abren al paseo canino todo el año.`,
    pt: `Brač fica a 50 min de ferry de Split. Zlatni Rat (a famosa praia em V) tem uma zona canina sazonal na extremidade oeste, e os pinhais do interior estão abertos a passeios caninos o ano inteiro.`,
    de: `Brač ist 50 Minuten per Fähre von Split entfernt. Zlatni Rat (der berühmte V-förmige Strand) hat an seinem Westende eine saisonale Hundezone, und die Kiefernwälder im Inselinneren sind ganzjährig zum Gassigehen geöffnet.`,
    nl: `Brač ligt 50 minuten per veerboot van Split. Zlatni Rat (het beroemde V-vormige strand) heeft aan zijn westpunt een seizoensgebonden hondenzone, en de dennenbossen in het binnenland zijn het hele jaar door open om te wandelen met je hond.`,
  }},
  { slug: null, rank: 13, photoSlug: 'rhodes', islandName: 'Rhodes', country: 'Greece', flag: '🇬🇷', reason: {
    en: `The medieval Old Town of Rhodes is walkable with a leashed dog, and the cliff paths around Lindos are open year-round. Dog-friendly tavernas are the norm rather than the exception in inland villages.`,
    fr: `On peut traverser la vieille ville médiévale de Rhodes (UNESCO) avec un chien en laisse, et les sentiers de falaise autour de Lindos sont ouverts toute l'année. Dans les villages de l'intérieur, les chiens sont la norme dans les tavernes, pas l'exception.`,
    es: `El casco viejo medieval de Rodas se pasea con perro con correa, y los senderos de acantilado alrededor de Lindos están abiertos todo el año. Las tabernas dog-friendly son la norma más que la excepción en los pueblos del interior.`,
    pt: `O centro medieval de Rodes é passeável com cão à trela, e os trilhos de falésia em redor de Lindos estão abertos o ano inteiro. As tavernas pet-friendly são a norma e não a exceção nas aldeias do interior.`,
    de: `Die mittelalterliche Altstadt von Rhodos lässt sich mit Hund an der Leine durchqueren, und die Klippenwege rund um Lindos sind ganzjährig geöffnet. Hundefreundliche Tavernen sind in den Dörfern im Landesinneren die Regel, nicht die Ausnahme.`,
    nl: `De middeleeuwse oude stad van Rhodos steek je met je hond aan de lijn zo over, en de klifpaden rond Lindos zijn het hele jaar open. Hondvriendelijke taverna's zijn in de dorpen landinwaarts eerder regel dan uitzondering.`,
  }},
  { slug: null, rank: 14, photoSlug: 'santorini', islandName: 'Santorini', country: 'Greece', flag: '🇬🇷', reason: {
    en: `The caldera-rim walk from Fira to Oia is one of Europe's most scenic dog walks, but summer heat (35 °C+ from June to September) and crowded narrow lanes make Santorini a winter and early-spring choice with a dog.`,
    fr: `La promenade de Fira à Oia sur la crête de la caldeira est l'une des plus spectaculaires d'Europe avec un chien. Mais avec 35 °C et plus de juin à septembre et des ruelles bondées, Santorin se garde pour l'hiver et le tout début du printemps.`,
    es: `El paseo por el borde de la caldera de Fira a Oia es uno de los más bellos de Europa con perro, pero el calor estival (35 °C+ de junio a septiembre) y las callejuelas abarrotadas la convierten en elección de invierno y principios de primavera.`,
    pt: `O passeio pela orla da caldeira de Fira a Oia é um dos mais belos da Europa com cão, mas o calor estival (35 °C+ de junho a setembro) e as ruelas apinhadas tornam-na uma escolha de inverno e início de primavera.`,
    de: `Der Spaziergang am Kalderarand von Fira nach Oia zählt zu den schönsten Hundewanderungen Europas, doch die Sommerhitze (35 °C+ von Juni bis September) und die überfüllten engen Gassen machen Santorin zu einem Winter- und Vorfrühlingsziel mit Hund.`,
    nl: `De wandeling langs de calderarand van Fira naar Oia is een van de mooiste hondenwandelingen van Europa, maar de zomerhitte (35 °C+ van juni tot september) en de drukke smalle straatjes maken Santorini vooral geschikt voor de winter en het vroege voorjaar met je hond.`,
  }},
  { slug: null, rank: 15, photoSlug: 'mykonos', islandName: 'Mykonos', country: 'Greece', flag: '🇬🇷', reason: {
    en: `In high season Mykonos is too hectic for most dogs, but the winter island is a different place: empty white-washed lanes, terrace cafés that welcome dogs and quiet beaches at Agios Sostis.`,
    fr: `En haute saison, Mykonos est trop bruyante pour la plupart des chiens. Mais l'île en hiver est un tout autre univers : ruelles blanchies désertes, terrasses de cafés qui sortent les écuelles d'eau et plages calmes du côté d'Agios Sostis.`,
    es: `En temporada alta Mykonos es demasiado frenética para la mayoría de perros, pero la isla en invierno es otra cosa: callejuelas encaladas vacías, cafés con terraza que admiten perros y playas tranquilas en Agios Sostis.`,
    pt: `Em época alta Mykonos é demasiado frenética para a maioria dos cães, mas a ilha no inverno é outra coisa: ruelas brancas vazias, esplanadas de café que acolhem cães e praias calmas em Agios Sostis.`,
    de: `In der Hochsaison ist Mykonos für die meisten Hunde zu hektisch, doch die Insel im Winter ist ein anderer Ort: leere weißgetünchte Gassen, Café-Terrassen, die Hunde willkommen heißen, und ruhige Strände bei Agios Sostis.`,
    nl: `In het hoogseizoen is Mykonos voor de meeste honden te hectisch, maar het eiland in de winter is een heel andere plek: lege witgekalkte straatjes, caféterrassen die honden welkom heten en rustige stranden bij Agios Sostis.`,
  }},
  { slug: null, rank: 16, photoSlug: 'cyprus', islandName: 'Cyprus', country: 'Cyprus', flag: '🇨🇾', reason: {
    en: `Year-round mild climate (no real winter), several officially designated dog beaches around Geroskipou and Larnaca, and 24/7 emergency vet coverage in both Limassol and Paphos.`,
    fr: `Climat doux toute l'année (il n'y a pas vraiment d'hiver), plusieurs plages canines officielles autour de Geroskipou et Larnaca, et une couverture vétérinaire d'urgence 24h/24 à Limassol comme à Paphos.`,
    es: `Clima suave todo el año (sin verdadero invierno), varias playas caninas oficialmente designadas alrededor de Yeroskipou y Lárnaca, y cobertura veterinaria de urgencias 24/7 en Limasol y Pafos.`,
    pt: `Clima ameno o ano inteiro (sem verdadeiro inverno), várias praias caninas oficialmente designadas em redor de Geroskipou e Larnaca, e cobertura veterinária de urgência 24/7 em Limassol e Pafos.`,
    de: `Ganzjährig mildes Klima (kein echter Winter), mehrere offiziell ausgewiesene Hundestrände rund um Geroskipou und Larnaka, und rund um die Uhr erreichbare Tierarzt-Notdienste sowohl in Limassol als auch in Paphos.`,
    nl: `Jaarrond mild klimaat (geen echte winter), meerdere officieel aangewezen hondenstranden rond Geroskipou en Larnaca, en 24/7 dierenarts-spoeddienst in zowel Limassol als Paphos.`,
  }},
  { slug: 'valletta', rank: 17, photoSlug: 'malta', islandName: 'Malta', country: 'Malta', flag: '🇲🇹', reason: {
    en: `English-speaking, walkable Valletta, mild year-round climate, and a dense network of pet-friendly cafés. Public transport is dog-friendly with carriers, and the limestone coast is walkable with dogs out of high season.`,
    fr: `Anglophone, La Valette piétonne, climat clément à l'année et un dense réseau de cafés pet-friendly. Les transports en commun acceptent les chiens en cage de transport, et la côte calcaire se prête à de longues promenades hors période estivale.`,
    es: `Anglófona, La Valeta peatonal, clima suave todo el año y una densa red de cafés pet-friendly. El transporte público admite perros en transportín, y la costa caliza se pasea con perro fuera de temporada alta.`,
    pt: `Anglófona, Valletta pedonal, clima ameno o ano inteiro e uma rede densa de cafés pet-friendly. Os transportes públicos aceitam cães em transportadora, e a costa calcária é passeável com cão fora de época alta.`,
    de: `Englischsprachig, fußläufiges Valletta, ganzjährig mildes Klima und ein dichtes Netz haustierfreundlicher Cafés. Öffentliche Verkehrsmittel akzeptieren Hunde in der Transportbox, und die Kalksteinküste ist außerhalb der Hochsaison mit Hund begehbar.`,
    nl: `Engelstalig, goed te belopen Valletta, jaarrond mild klimaat en een dicht netwerk van huisdiervriendelijke cafés. Het openbaar vervoer laat honden toe in een reismand, en de kalkstenen kust is buiten het hoogseizoen prima te belopen met je hond.`,
  }},
  { slug: null, rank: 18, photoSlug: 'gozo', islandName: 'Gozo', country: 'Malta', flag: '🇲🇹', reason: {
    en: `Quieter than Malta and reached by a 25-minute ferry from Ċirkewwa. The Dwejra coast and the Ta' Pinu hinterland offer open dog walks, and farm-stay gîtes are widely pet-tolerant.`,
    fr: `Plus calme que Malte, à 25 minutes de ferry depuis Ċirkewwa. La côte de Dwejra et l'arrière-pays de Ta' Pinu offrent des promenades dégagées sans circulation, et les gîtes ruraux acceptent presque tous les chiens.`,
    es: `Más tranquila que Malta y accesible en 25 min de ferri desde Ċirkewwa. La costa de Dwejra y el interior de Ta' Pinu ofrecen paseos caninos despejados, y los alojamientos rurales son ampliamente tolerantes con perros.`,
    pt: `Mais calma do que Malta e acessível em 25 min de ferry a partir de Ċirkewwa. A costa de Dwejra e o interior de Ta' Pinu oferecem passeios caninos abertos, e os alojamentos rurais são largamente tolerantes com cães.`,
    de: `Ruhiger als Malta und in 25 Minuten per Fähre ab Ċirkewwa erreichbar. Die Küste bei Dwejra und das Hinterland um Ta' Pinu bieten offene Gassi-Wege, und ländliche Unterkünfte sind überwiegend haustiertolerant.`,
    nl: `Rustiger dan Malta en in 25 minuten per veerboot vanaf Ċirkewwa te bereiken. De kust bij Dwejra en het achterland rond Ta' Pinu bieden open wandelroutes voor je hond, en boerderijverblijven zijn overwegend huisdiertolerant.`,
  }},
  { slug: 'capri', rank: 19, photoSlug: 'capri', islandName: 'Capri', country: 'Italy', flag: '🇮🇹', reason: {
    en: `Day-trippable from Naples or Sorrento. Anacapri (the quieter upper village) is the dog-friendly base, the Monte Solaro chairlift accepts small dogs on a leash, and the via Krupp clifftop walk is open year-round.`,
    fr: `Accessible à la journée depuis Naples ou Sorrente. Anacapri, le village haut plus calme que Capri-ville, est la meilleure base avec un chien, le télésiège du Monte Solaro accepte les petits chiens en laisse, et la via Krupp en falaise reste ouverte toute l'année.`,
    es: `Accesible en excursión desde Nápoles o Sorrento. Anacapri (el pueblo alto más tranquilo) es la base pet-friendly, el telesilla del Monte Solaro admite perros pequeños con correa, y la via Krupp en acantilado está abierta todo el año.`,
    pt: `Acessível em excursão a partir de Nápoles ou Sorrento. Anacapri (a aldeia alta mais calma) é a base pet-friendly, o teleférico do Monte Solaro aceita cães pequenos com trela, e a via Krupp na falésia está aberta o ano inteiro.`,
    de: `Tagesausflug ab Neapel oder Sorrent möglich. Anacapri (das ruhigere obere Dorf) ist die haustierfreundliche Basis, der Sessellift zum Monte Solaro nimmt kleine Hunde an der Leine mit, und der Klippenweg Via Krupp ist ganzjährig geöffnet.`,
    nl: `Dagtrip vanuit Napels of Sorrento mogelijk. Anacapri (het rustigere hoger gelegen dorp) is de huisdiervriendelijke basis, de stoeltjeslift naar de Monte Solaro neemt kleine honden aan de lijn mee, en het klifpad Via Krupp is het hele jaar open.`,
  }},
  { slug: null, rank: 20, photoSlug: 'elba', islandName: 'Elba', country: 'Italy', flag: '🇮🇹', reason: {
    en: `Elba's comune has officially designated seven dog beaches, more than almost any other Italian island. Ferries from Piombino accept leashed dogs free of charge.`,
    fr: `La commune d'Elbe a officiellement désigné sept plages canines, plus que pratiquement n'importe quelle autre île italienne. Les ferries depuis Piombino acceptent les chiens en laisse gratuitement, et la traversée ne dure qu'une heure.`,
    es: `El comune de Elba ha designado oficialmente siete playas caninas, más que casi cualquier otra isla italiana. Los ferris desde Piombino admiten perros con correa de forma gratuita.`,
    pt: `O comune de Elba designou oficialmente sete praias caninas, mais do que quase qualquer outra ilha italiana. Os ferries a partir de Piombino aceitam cães com trela gratuitamente.`,
    de: `Die Gemeinde Elba hat offiziell sieben Hundestrände ausgewiesen, mehr als fast jede andere italienische Insel. Fähren ab Piombino nehmen Hunde an der Leine kostenlos mit.`,
    nl: `De gemeente op Elba heeft officieel zeven hondenstranden aangewezen, meer dan bijna elk ander Italiaans eiland. Veerboten vanaf Piombino nemen honden aan de lijn gratis mee.`,
  }},
  { slug: null, rank: 21, photoSlug: 'sylt', islandName: 'Sylt', country: 'Germany', flag: '🇩🇪', reason: {
    en: `The Westerland Hundenstrand is one of northern Europe's best-known dedicated dog beaches. Mild summers (20-23 °C), the Sylt Shuttle train accepts dogs, and dog-friendly cafés are the rule along Friedrichstraße.`,
    fr: `Le Hundenstrand de Westerland est l'une des plages canines dédiées les plus célèbres d'Europe du Nord. Étés doux (20-23 °C, parfait pour les races nordiques et à poil long), le Sylt Shuttle accepte les chiens, et les cafés pet-friendly font la norme sur la Friedrichstraße.`,
    es: `El Hundenstrand de Westerland es una de las playas caninas dedicadas más conocidas del norte de Europa. Veranos suaves (20-23 °C), el Sylt Shuttle admite perros, y los cafés dog-friendly son la norma en Friedrichstraße.`,
    pt: `O Hundenstrand de Westerland é uma das praias caninas dedicadas mais conhecidas do norte da Europa. Verões amenos (20-23 °C), o Sylt Shuttle aceita cães, e os cafés pet-friendly são a norma na Friedrichstraße.`,
    de: `Der Hundestrand von Westerland gehört zu den bekanntesten ausgewiesenen Hundestränden Nordeuropas. Milde Sommer (20-23 °C), der Sylt Shuttle nimmt Hunde mit, und haustierfreundliche Cafés sind entlang der Friedrichstraße die Regel.`,
    nl: `Het Hundenstrand van Westerland is een van de bekendste aangewezen hondenstranden van Noord-Europa. Milde zomers (20-23 °C), de Sylt Shuttle neemt honden mee, en huisdiervriendelijke cafés zijn eerder regel dan uitzondering langs de Friedrichstraße.`,
  }},
  { slug: null, rank: 22, photoSlug: 'isle-of-skye', islandName: 'Isle of Skye', country: 'United Kingdom', flag: '🇬🇧', reason: {
    en: `Cuillin ridge walks, the Quiraing and the Old Man of Storr are all dog-friendly (sheep country, dogs must stay on leash). Since Brexit, EU visitors need an Animal Health Certificate, not a passport.`,
    fr: `Les sentiers de la crête des Cuillin, le Quiraing et l'Old Man of Storr sont tous accessibles aux chiens (zone d'élevage ovin, laisse obligatoire). Depuis le Brexit, les visiteurs européens doivent présenter un Animal Health Certificate, plus le passeport UE.`,
    es: `Los senderos de la cresta Cuillin, el Quiraing y el Old Man of Storr son todos dog-friendly (zona de ovejas, perros con correa obligatoria). Desde el Brexit, los visitantes UE necesitan un Animal Health Certificate, no un pasaporte.`,
    pt: `Os trilhos da crista Cuillin, o Quiraing e o Old Man of Storr são todos pet-friendly (zona de ovelhas, cães obrigatoriamente à trela). Desde o Brexit, os visitantes da UE precisam de um Animal Health Certificate, não de um passaporte.`,
    de: `Die Wanderwege am Cuillin-Grat, der Quiraing und der Old Man of Storr sind alle hundefreundlich (Schafgebiet, Hunde müssen an der Leine bleiben). Seit dem Brexit benötigen EU-Besucher ein Animal Health Certificate statt eines Heimtierausweises.`,
    nl: `De wandelroutes over de Cuillin-bergkam, de Quiraing en de Old Man of Storr zijn allemaal hondvriendelijk (schapengebied, honden moeten aangelijnd blijven). Sinds de Brexit hebben EU-bezoekers een Animal Health Certificate nodig in plaats van een dierenpaspoort.`,
  }},
  { slug: null, rank: 23, photoSlug: 'isle-of-wight', islandName: 'Isle of Wight', country: 'United Kingdom', flag: '🇬🇧', reason: {
    en: `Year-round dog beaches at Ryde, Sandown and Compton Bay (with seasonal restrictions on parts of each). The Wightlink and Red Funnel ferries from Portsmouth and Southampton both accept dogs at no charge.`,
    fr: `Plages canines à l'année à Ryde, Sandown et Compton Bay (avec des sections en restriction saisonnière). Les ferries Wightlink et Red Funnel, depuis Portsmouth et Southampton, acceptent les chiens gratuitement.`,
    es: `Playas caninas todo el año en Ryde, Sandown y Compton Bay (con restricciones estacionales en partes de cada una). Los ferris Wightlink y Red Funnel desde Portsmouth y Southampton admiten ambos perros sin coste.`,
    pt: `Praias caninas o ano inteiro em Ryde, Sandown e Compton Bay (com restrições sazonais em partes de cada). Os ferries Wightlink e Red Funnel a partir de Portsmouth e Southampton aceitam ambos cães sem custo.`,
    de: `Ganzjährige Hundestrände in Ryde, Sandown und Compton Bay (mit saisonalen Einschränkungen an Teilbereichen). Die Fähren von Wightlink und Red Funnel ab Portsmouth und Southampton nehmen beide Hunde kostenlos mit.`,
    nl: `Jaarrond hondenstranden in Ryde, Sandown en Compton Bay (met seizoensgebonden beperkingen op delen ervan). De veerboten van Wightlink en Red Funnel vanuit Portsmouth en Southampton nemen beide honden gratis mee.`,
  }},
  { slug: null, rank: 24, photoSlug: 'aran-islands', islandName: 'Aran Islands', country: 'Ireland', flag: '🇮🇪', reason: {
    en: `Inis Mór, Inis Meáin and Inis Oírr are off-the-grid in the best sense: limestone karst, ancient stone forts, no traffic, and dog-tolerant B&Bs. Aran Island Ferries accept dogs in carriers.`,
    fr: `Inis Mór, Inis Meáin et Inis Oírr sont à l'écart du monde dans le meilleur sens du terme : karst calcaire, forts de pierre préhistoriques, aucune circulation et B&B qui accueillent les chiens. La compagnie Aran Island Ferries embarque les chiens en cage de transport.`,
    es: `Inis Mór, Inis Meáin e Inis Oírr están fuera del circuito en el mejor sentido: karst calizo, antiguos fuertes de piedra, sin tráfico, y B&B tolerantes con perros. Aran Island Ferries admite perros en transportín.`,
    pt: `Inis Mór, Inis Meáin e Inis Oírr estão fora do circuito no melhor sentido: carso calcário, antigos fortes de pedra, sem trânsito, e B&Bs tolerantes com cães. A Aran Island Ferries aceita cães em transportadora.`,
    de: `Inis Mór, Inis Meáin und Inis Oírr sind abgelegen im besten Sinne: Kalksteinkarst, uralte Steinforts, kein Verkehr, und haustiertolerante B&Bs. Aran Island Ferries nimmt Hunde in der Transportbox mit.`,
    nl: `Inis Mór, Inis Meáin en Inis Oírr zijn afgelegen in de beste zin van het woord: kalksteenkarst, eeuwenoude stenen forten, geen verkeer, en huisdiertolerante B&B's. Aran Island Ferries neemt honden mee in een reismand.`,
  }},
  { slug: null, rank: 25, photoSlug: 'faroe-islands', islandName: 'Faroe Islands', country: 'Faroe Islands', flag: '🇫🇴', reason: {
    en: `Spectacular for the dog-walking traveller, but flag this clearly: dog import requires a special permit from the Faroese authorities, and the process is slower and stricter than the EU pet passport scheme. Plan months ahead.`,
    fr: `Spectaculaire pour qui aime marcher avec son chien, mais à signaler clairement : importer un chien nécessite un permis spécial des autorités féroïennes, et la procédure est plus longue et plus stricte que le passeport européen. À anticiper plusieurs mois à l'avance.`,
    es: `Espectaculares para el viajero paseador de perro, pero hay que advertirlo claramente: la importación de perro requiere un permiso especial de las autoridades feroesas, y el proceso es más lento y estricto que el pasaporte europeo. Planificar meses antes.`,
    pt: `Espetaculares para o viajante que passeia com o seu cão, mas atenção: a importação de cão exige uma licença especial das autoridades faroenses, e o processo é mais lento e rigoroso do que o passaporte europeu da UE. Planeie com meses de antecedência.`,
    de: `Spektakulär für Reisende, die gerne mit Hund unterwegs sind, aber Achtung: Die Einfuhr eines Hundes erfordert eine Sondergenehmigung der färöischen Behörden, und das Verfahren ist langsamer und strenger als der EU-Heimtierausweis. Planen Sie Monate im Voraus.`,
    nl: `Spectaculair voor de reiziger die graag met zijn hond wandelt, maar let op: de invoer van een hond vereist een speciale vergunning van de Faeröerse autoriteiten, en de procedure is trager en strenger dan het EU-dierenpaspoort. Plan maanden vooruit.`,
  }},
]

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const titles: Record<string, string> = {
    en: 'Top 25 Dog-Friendly Islands in Europe (2026 Edition)',
    fr: `Top 25 des îles européennes dog-friendly (édition 2026)`,
    es: 'Top 25 islas dog-friendly de Europa (edición 2026)',
    pt: 'Top 25 ilhas pet-friendly da Europa (edição 2026)',
    de: 'Top 25 hundefreundliche Inseln Europas (Ausgabe 2026)',
    nl: 'Top 25 hondvriendelijke eilanden van Europa (editie 2026)',
  }
  const descriptions: Record<string, string> = {
    en: 'Our 2026 ranking of the 25 best European islands for travelling with a dog: dog beaches, ferry rules, climate, pet-friendly hotel availability and import paperwork, island by island.',
    fr: `Notre classement 2026 des 25 meilleures îles européennes pour voyager avec un chien : plages canines, règles ferries, climat, disponibilité d'hôtels pet-friendly et paperasse d'importation, île par île.`,
    es: 'Nuestro ranking 2026 de las 25 mejores islas europeas para viajar con perro: playas caninas, normas de ferri, clima, disponibilidad de hoteles pet-friendly y papeleo de importación, isla por isla.',
    pt: 'O nosso ranking 2026 das 25 melhores ilhas europeias para viajar com cão: praias caninas, regras de ferry, clima, disponibilidade de hotéis pet-friendly e burocracia de importação, ilha a ilha.',
    de: 'Unser Ranking 2026 der 25 besten europäischen Inseln für Reisen mit Hund: Hundestrände, Fährregeln, Klima, Verfügbarkeit haustierfreundlicher Hotels und Einfuhrbestimmungen, Insel für Insel.',
    nl: 'Onze ranglijst 2026 van de 25 beste Europese eilanden om met je hond op reis te gaan: hondenstranden, veerbootregels, klimaat, beschikbaarheid van huisdiervriendelijke hotels en invoerpapieren, eiland voor eiland.',
  }
  const today = new Date().toISOString().split('T')[0]
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
      publishedTime: '2026-05-17T00:00:00Z',
      modifiedTime: `${today}T00:00:00Z`,
    },
  }
}

type Copy = {
  hero: { kicker: string; h1: string; lede: string }
  intro: { title: string; paras: string[] }
  methodology: { title: string; paras: string[] }
  rankingTitle: string
  rankingSubtitle: string
  hotelsLabel: string
  guideLink: string
  bookOnBooking: string
  bookHotelsInPrefix: string
  mapTitle: string
  mapDesc: string
  keywordChips: string[]
  keywordChipsTitle: string
  faqTitle: string
  faqs: Array<{ q: string; a: string }>
  conclusion: { title: string; paras: string[] }
  ctaTitle: string
  ctaDesc: string
  ctaButton: string
  bottomBookCtaTitle: string
  bottomBookCtaDesc: string
  bottomBookCtaButton: string
}

const COPY: Record<string, Copy> = {
  en: {
    hero: { kicker: `EUROPE'S BEST DOG ISLANDS · 2026 EDITION`, h1: 'Top 25 Dog-Friendly Islands in Europe', lede: `From Mallorca to Madeira, Sicily to Skye, we audited 60 European islands on dog-beach access, ferry rules, climate, pet-friendly hotel density and import paperwork. Here are the 25 islands where travelling with a dog is genuinely worth the boat or the flight. Updated for 2026.` },
    intro: { title: 'Why an island guide is different', paras: [
      `Islands are not just smaller versions of mainland destinations. Travelling there with a dog adds a ferry or a flight, a stricter set of accommodation rules, and a climate that can swing from idyllic in shoulder season to brutal at peak summer. The wrong island in August is a heat-stressed dog and a frustrated traveller.`,
      `We audited 60 European islands against five criteria: officially designated dog beach availability, ferry company pet policy (cabin acceptance and pricing), climate suitability for dogs across the year, density of verified pet-friendly hotels, and the regulatory paperwork required to bring a dog in. Some islands that look obvious on paper (Santorini, Mykonos) drop because of summer heat and crowds. Others that travellers rarely think about (Elba, Sylt, the Isle of Wight) rise because of officially designated dog infrastructure.`,
      `The 25 islands below all clear the bar on at least three of the five criteria. Where we already publish a destination guide (Mallorca, Madeira, Crete, Sicily, Iceland, Brač via Split), the card links straight to it. Where no destination guide exists yet, we keep the entry general and verifiable rather than fabricating facility names.`,
    ] },
    methodology: { title: 'Our methodology', paras: [
      `Dog-beach availability was sourced from each island's local comune, municipality or tourism board. We split year-round dog beaches from seasonal ones, since most Mediterranean dog zones close from May to September just when travellers want to visit.`,
      `Ferry company pet policy was cross-checked against the operator's official terms (Corsica Ferries, Jadrolinija, Anek, Minoan, Wightlink, Red Funnel, Direct Ferries, Aran Island Ferries). Islands accessible only by flight were rated on the relevant airlines' cabin policies for the route.`,
      `Climate suitability was evaluated month by month using 30-year averages. Islands that exceed 32 °C in average July highs lose points for summer travel, and gain points for off-season or year-round travel.`,
      `Hotel availability was measured by counting pet-friendly properties rated 8.0+ on the major booking platforms within the island. Islands with fewer than 15 such properties dropped down the ranking, regardless of other strengths.`,
      `Regulatory paperwork was weighted last but decisive in the extremes: Iceland and the Faroe Islands keep their ranking thanks to genuine destination quality, but we flag the heavy import process clearly in their entry.`,
    ] },
    rankingTitle: 'The top 25 ranking',
    rankingSubtitle: `Each island links to live prices for pet-friendly hotels and, where available, our full city guide with vet numbers, beaches and transport rules.`,
    hotelsLabel: 'Hotels',
    guideLink: 'Full city guide →',
    bookOnBooking: 'Book pet-friendly hotels →',
    bookHotelsInPrefix: 'Book pet-friendly hotels in',
    mapTitle: 'Live map · pet-friendly hotels around Mallorca (#1)',
    mapDesc: `Centered on Palma de Mallorca, our #1 dog-friendly island. Pan, zoom and click any marker to see live prices, pet policies and free-cancellation availability across the Balearic islands and beyond.`,
    keywordChipsTitle: 'Popular pet-friendly island searches in 2026',
    keywordChips: [
      'Dog-friendly hotels Mallorca', 'Pet-friendly Madeira levadas', 'Crete with a dog by ferry',
      'Sicily Bau Beach Mondello', 'Sardinia agriturismo dogs', 'Ibiza off-season with dog',
      'Menorca Camí de Cavalls dog', 'Corsica Calvi with a dog', 'Iceland dog import rules',
      'Hvar dog-friendly Stari Grad', 'Korčula dog beaches', 'Brač Zlatni Rat dog zone',
      'Rhodes Lindos dog walks', 'Santorini dog walk caldera', 'Mykonos winter with dog',
      'Cyprus dog beach Geroskipou', 'Malta Valletta dog cafés', 'Gozo Dwejra dog walks',
      'Capri Anacapri with dog', 'Elba seven dog beaches', 'Sylt Hundenstrand Westerland',
      'Skye Cuillin dog walk', 'Isle of Wight dog beach', 'Aran Islands dog ferry', 'Faroe Islands dog permit',
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Are these rankings the same for cats?', a: `Mostly no. The criteria that matter for indoor cats (hotel acceptance, low stress on transport, no heat extremes) are very different from what we measure for dogs (dog beaches, off-leash zones, ferry pet cabins). For cats, Mallorca, Madeira, Cyprus and Malta still rank highly because their pet-friendly hotel inventory is strong, but the rest of the list is dog-specific.` },
      { q: `Why isn't Tenerife or Gran Canaria in the top 25?`, a: `The Canary Islands have a strong mainland-Spain regulatory framework and good climate, but officially designated dog beaches are surprisingly few and concentrated in just a couple of municipalities. Several spots have shown up and disappeared from local ordinances over the last three years, so we kept them out of the top 25 until the picture stabilises in 2026 and 2027.` },
      { q: `How do I get to these islands with my dog?`, a: `For Mediterranean islands, ferries are almost always the cheapest and least stressful option. Most operators (Corsica Ferries, Jadrolinija, Anek, Minoan, Wightlink) accept dogs in cabins for a modest fee, and your dog never leaves your side. Flights are only worth it for Iceland, the Faroes, Madeira, the Canaries and the very long-distance crossings.` },
      { q: 'What about the import paperwork?', a: `EU islands use the standard EU Pet Passport (microchip, rabies vaccine, valid passport). UK islands need an Animal Health Certificate since Brexit (about €100, valid 4 months). Iceland and the Faroe Islands require a special import permit with up to a month of advance paperwork. Plan early.` },
      { q: 'When is the best time to visit?', a: `For Mediterranean islands (Mallorca, Sicily, Crete, Corsica, Sardinia, Hvar, Brač, Rhodes, Santorini, Capri, Elba), shoulder season (April-June and September-October) is ideal: warm, fewer crowds, dog beaches still open in many cases. For Atlantic and northern islands (Madeira, Iceland, Sylt, Skye, Isle of Wight, Aran, Faroes), summer through early autumn is best.` },
    ],
    conclusion: { title: 'Our pick if you only have one island trip', paras: [
      `If we had to choose a single European island for a first dog trip, it would be Mallorca. The combination of officially designated dog beaches, a vast pet-friendly accommodation inventory inland and along the coast, a year-round mild climate and excellent direct flights from most European capitals makes it the lowest-friction choice. The mountains of the Tramuntana give you cool inland walks even in summer.`,
      `If you want something quieter, pick Menorca, Brač or the Aran Islands. If you want a year-round mild climate without the Mediterranean summer heat, pick Madeira or Cyprus. And if you only travel in winter, Mykonos, Santorini and Rhodes turn into a different kind of trip: empty, walkable and surprisingly dog-friendly.`,
    ] },
    ctaTitle: 'Plan your trip with our destination guides',
    ctaDesc: `Several of these 25 islands have a full pet-friendly destination guide with hotels, vets, beaches and a live booking map.`,
    ctaButton: 'See all destinations →',
    bottomBookCtaTitle: 'Ready to book? Compare 770+ pet-friendly hotels',
    bottomBookCtaDesc: `Live prices and instant booking across Europe, Booking.com, Expedia, Hotels.com and more. Free cancellation on most properties, verified pet policies on every listing.`,
    bottomBookCtaButton: 'Search pet-friendly hotels →',
  },
  fr: {
    hero: { kicker: `LES MEILLEURES ÎLES CANINES D'EUROPE · ÉDITION 2026`, h1: 'Top 25 des îles européennes dog-friendly', lede: `De Majorque à Madère, de la Sicile à Skye, nous avons audité 60 îles européennes sur l'accès aux plages canines, les règles ferries, le climat, la densité d'hôtels pet-friendly et la paperasse d'importation. Voici les 25 îles où voyager avec un chien vaut vraiment le bateau ou l'avion. Mis à jour pour 2026.` },
    intro: { title: `Pourquoi un guide d'îles est différent`, paras: [
      `Les îles ne sont pas que des versions plus petites des destinations continentales. Y voyager avec un chien ajoute un ferry ou un avion, des règles d'hébergement plus strictes et un climat qui peut basculer de l'idyllique en intersaison au brutal en plein été. La mauvaise île en août, c'est un chien en stress thermique et un voyageur frustré.`,
      `Nous avons audité 60 îles européennes selon cinq critères : disponibilité de plages canines officiellement désignées, politique animale des compagnies de ferry (acceptation en cabine et tarifs), adéquation climatique pour les chiens sur l'année, densité d'hôtels pet-friendly vérifiés, et paperasse réglementaire pour entrer avec un chien. Certaines îles évidentes sur le papier (Santorin, Mykonos) chutent à cause de la chaleur estivale et des foules. D'autres auxquelles les voyageurs pensent rarement (Elbe, Sylt, l'île de Wight) montent grâce à une infrastructure canine officiellement désignée.`,
      `Les 25 îles ci-dessous passent toutes la barre sur au moins trois des cinq critères. Lorsqu'un guide destination existe déjà (Majorque, Madère, Crète, Sicile, Islande, Brač via Split), la fiche y renvoie directement. Lorsqu'aucun guide n'existe encore, nous restons général et vérifiable plutôt que d'inventer des noms d'équipements.`,
    ] },
    methodology: { title: 'Notre méthodologie', paras: [
      `La disponibilité de plages canines a été sourcée depuis la comune, mairie ou office de tourisme de chaque île. Nous avons distingué les plages canines toute l'année des saisonnières, car la plupart des zones canines méditerranéennes ferment de mai à septembre, précisément quand les voyageurs veulent venir.`,
      `La politique animale des compagnies de ferry a été recoupée sur les conditions officielles (Corsica Ferries, Jadrolinija, Anek, Minoan, Wightlink, Red Funnel, Direct Ferries, Aran Island Ferries). Les îles accessibles uniquement en avion ont été notées selon la politique cabine des compagnies aériennes desservant la liaison.`,
      `L'adéquation climatique a été évaluée mois par mois sur les moyennes 30 ans. Les îles qui dépassent 32 °C de maximum moyen en juillet perdent des points pour le voyage estival et en gagnent pour le hors-saison ou l'année entière.`,
      `La disponibilité hôtelière a été mesurée en comptant les établissements pet-friendly notés 8,0+ sur les principales plateformes dans l'île. Les îles comptant moins de 15 hébergements sortent du classement, peu importe leurs autres atouts.`,
      `La paperasse réglementaire a été pondérée en dernier mais reste décisive dans les extrêmes : l'Islande et les îles Féroé restent dans le classement grâce à la vraie qualité de la destination, mais nous signalons clairement le processus d'importation lourd dans leur fiche.`,
    ] },
    rankingTitle: 'Le classement Top 25',
    rankingSubtitle: `Chaque île renvoie aux prix en direct des hôtels pet-friendly et, lorsqu'il existe, à notre guide ville complet avec numéros vétérinaires, plages et règles de transport.`,
    hotelsLabel: 'Hôtels',
    guideLink: 'Guide complet de la ville →',
    bookOnBooking: 'Réserver hôtels pet-friendly →',
    bookHotelsInPrefix: 'Réserver hôtels pet-friendly à',
    mapTitle: 'Carte en direct · hôtels pet-friendly autour de Majorque (n°1)',
    mapDesc: `Centrée sur Palma de Majorque, notre île dog-friendly n°1. Déplacez-vous, zoomez et cliquez sur un marqueur pour voir les prix en direct, les politiques animaux et la disponibilité avec annulation gratuite dans les Baléares et au-delà.`,
    keywordChipsTitle: `Recherches d'hôtels pet-friendly populaires sur les îles en 2026`,
    keywordChips: [
      'Hôtels chiens Majorque', 'Madère pet-friendly levadas', 'Crète avec chien en ferry',
      'Sicile Bau Beach Mondello', 'Sardaigne agriturismo chien', 'Ibiza hors saison chien',
      'Minorque Camí de Cavalls chien', 'Corse Calvi avec chien', 'Islande règles import chien',
      'Hvar dog-friendly Stari Grad', 'Korčula plages chien', 'Brač Zlatni Rat zone canine',
      'Rhodes Lindos promenades chien', 'Santorin caldeira avec chien', 'Mykonos hiver chien',
      'Chypre plage canine Geroskipou', 'Malte Valette cafés chien', 'Gozo Dwejra promenades chien',
      'Capri Anacapri avec chien', 'Elbe sept plages canines', 'Sylt Hundenstrand Westerland',
      'Skye Cuillin promenade chien', 'Île de Wight plage canine', 'Aran Islands ferry chien', 'Féroé permis chien',
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Ce classement est-il le même pour les chats ?', a: `Surtout pas. Les critères qui comptent pour un chat d'intérieur (acceptation hôtelière, faible stress transport, pas d'extrêmes thermiques) sont très différents de ce que nous mesurons pour les chiens (plages canines, zones sans laisse, cabines ferry animaux). Pour les chats, Majorque, Madère, Chypre et Malte restent hauts car leur inventaire d'hôtels pet-friendly est solide, mais le reste de la liste est spécifique aux chiens.` },
      { q: `Pourquoi Tenerife ou Gran Canaria ne sont-elles pas dans le top 25 ?`, a: `Les Canaries ont un cadre réglementaire espagnol solide et un bon climat, mais les plages canines officiellement désignées sont étonnamment peu nombreuses et concentrées dans quelques communes. Plusieurs spots sont apparus puis disparus des arrêtés municipaux ces trois dernières années, nous les gardons donc hors top 25 jusqu'à stabilisation du tableau en 2026 et 2027.` },
      { q: `Comment rejoindre ces îles avec mon chien ?`, a: `Pour les îles méditerranéennes, les ferries sont presque toujours l'option la moins chère et la moins stressante. La plupart des opérateurs (Corsica Ferries, Jadrolinija, Anek, Minoan, Wightlink) acceptent les chiens en cabine pour un supplément modéré, et votre chien reste à vos côtés. L'avion ne vaut le coup que pour l'Islande, les Féroé, Madère, les Canaries et les très longues traversées.` },
      { q: 'Et la paperasse à l\'importation ?', a: `Les îles UE utilisent le passeport européen standard (puce, vaccin antirabique, passeport valide). Les îles UK demandent un Animal Health Certificate depuis le Brexit (environ 100 €, valide 4 mois). L'Islande et les îles Féroé exigent un permis d'importation spécial avec jusqu'à un mois de paperasse en amont. Anticipez tôt.` },
      { q: 'Quelle est la meilleure période ?', a: `Pour les îles méditerranéennes (Majorque, Sicile, Crète, Corse, Sardaigne, Hvar, Brač, Rhodes, Santorin, Capri, Elbe), l'intersaison (avril-juin et septembre-octobre) est idéale : chaud, moins de monde, plages canines encore ouvertes dans bien des cas. Pour les îles atlantiques et nordiques (Madère, Islande, Sylt, Skye, île de Wight, Aran, Féroé), l'été jusqu'au début de l'automne est le meilleur moment.` },
    ],
    conclusion: { title: `Notre choix si vous n'avez qu'un seul voyage en île`, paras: [
      `Si nous devions choisir une seule île européenne pour un premier voyage canin, ce serait Majorque. La combinaison de plages canines officiellement désignées, d'un vaste inventaire d'hébergements pet-friendly à l'intérieur et sur la côte, d'un climat doux toute l'année et d'excellents vols directs depuis la plupart des capitales européennes en fait le choix le moins friction. Les montagnes de la Tramuntana offrent des promenades fraîches même en été.`,
      `Pour quelque chose de plus calme, optez pour Minorque, Brač ou les îles d'Aran. Pour un climat doux toute l'année sans la chaleur estivale méditerranéenne, optez pour Madère ou Chypre. Et si vous ne voyagez qu'en hiver, Mykonos, Santorin et Rhodes deviennent un autre type de voyage : vides, piétons et étonnamment dog-friendly.`,
    ] },
    ctaTitle: 'Planifiez votre voyage avec nos guides destinations',
    ctaDesc: `Plusieurs de ces 25 îles disposent d'un guide pet-friendly complet avec hôtels, vétérinaires, plages et carte de réservation en direct.`,
    ctaButton: 'Voir toutes les destinations →',
    bottomBookCtaTitle: 'Prêt à réserver ? Comparez 770+ hôtels pet-friendly',
    bottomBookCtaDesc: `Prix en direct et réservation instantanée à travers l'Europe, Booking.com, Expedia, Hotels.com et plus. Annulation gratuite sur la plupart des établissements, politiques animaux vérifiées sur chaque fiche.`,
    bottomBookCtaButton: 'Rechercher des hôtels pet-friendly →',
  },
  es: {
    hero: { kicker: 'LAS MEJORES ISLAS CANINAS DE EUROPA · EDICIÓN 2026', h1: 'Top 25 islas dog-friendly de Europa', lede: `De Mallorca a Madeira, de Sicilia a Skye, hemos auditado 60 islas europeas sobre acceso a playas caninas, normas de ferri, clima, densidad de hoteles pet-friendly y papeleo de importación. Estas son las 25 islas donde viajar con perro merece realmente el barco o el avión. Actualizado para 2026.` },
    intro: { title: 'Por qué una guía de islas es diferente', paras: [
      `Las islas no son sólo versiones más pequeñas de los destinos continentales. Viajar allí con perro añade un ferri o un vuelo, un conjunto más estricto de normas de alojamiento, y un clima que puede pasar de idílico en temporada media a brutal en pleno verano. La isla equivocada en agosto es un perro con estrés térmico y un viajero frustrado.`,
      `Auditámos 60 islas europeas según cinco criterios: disponibilidad de playas caninas oficialmente designadas, política de mascotas de las navieras (aceptación en camarote y tarifas), idoneidad climática para perros a lo largo del año, densidad de hoteles pet-friendly verificados y papeleo regulatorio necesario para entrar con perro. Algunas islas obvias sobre el papel (Santorini, Mykonos) caen por el calor estival y las multitudes. Otras que los viajeros raramente piensan (Elba, Sylt, la Isla de Wight) suben gracias a infraestructura canina oficialmente designada.`,
      `Las 25 islas de abajo superan el listón en al menos tres de los cinco criterios. Cuando ya publicamos una guía de destino (Mallorca, Madeira, Creta, Sicilia, Islandia, Brač vía Split), la ficha enlaza directamente. Cuando ninguna guía existe aún, mantenemos la entrada general y verificable en lugar de inventar nombres de instalaciones.`,
    ] },
    methodology: { title: 'Nuestra metodología', paras: [
      `La disponibilidad de playas caninas se obtuvo del comune, ayuntamiento u oficina de turismo de cada isla. Distinguimos las playas caninas todo el año de las estacionales, ya que la mayoría de zonas caninas mediterráneas cierran de mayo a septiembre, justo cuando los viajeros quieren visitar.`,
      `La política de mascotas de las navieras se cotejó con los términos oficiales del operador (Corsica Ferries, Jadrolinija, Anek, Minoan, Wightlink, Red Funnel, Direct Ferries, Aran Island Ferries). Las islas accesibles sólo en vuelo se valoraron según la política de cabina de las aerolíneas de la ruta.`,
      `La idoneidad climática se evaluó mes a mes con medias de 30 años. Las islas que superan 32 °C de máximo medio en julio pierden puntos para viaje estival y los ganan para viaje fuera de temporada o todo el año.`,
      `La disponibilidad hotelera se midió contando establecimientos pet-friendly con valoración 8,0+ en las principales plataformas dentro de la isla. Islas con menos de 15 alojamientos caen del ranking, sin importar otras fortalezas.`,
      `El papeleo regulatorio se ponderó al final pero resulta decisivo en los extremos: Islandia y las Islas Feroe mantienen su puesto por la calidad real del destino, pero señalamos claramente el proceso de importación pesado en su ficha.`,
    ] },
    rankingTitle: 'El ranking Top 25',
    rankingSubtitle: `Cada isla enlaza con precios en vivo de hoteles pet-friendly y, cuando existe, con nuestra guía de ciudad completa con números veterinarios, playas y normas de transporte.`,
    hotelsLabel: 'Hoteles',
    guideLink: 'Guía completa de la ciudad →',
    bookOnBooking: 'Reservar hoteles pet-friendly →',
    bookHotelsInPrefix: 'Reservar hoteles pet-friendly en',
    mapTitle: 'Mapa en vivo · hoteles pet-friendly alrededor de Mallorca (n.º 1)',
    mapDesc: `Centrado en Palma de Mallorca, nuestra isla dog-friendly n.º 1. Desplázate, haz zoom y haz clic en cualquier marcador para ver precios en vivo, políticas de mascotas y disponibilidad con cancelación gratuita en las Baleares y más allá.`,
    keywordChipsTitle: 'Búsquedas populares de hoteles pet-friendly en islas en 2026',
    keywordChips: [
      'Hoteles perros Mallorca', 'Madeira pet-friendly levadas', 'Creta con perro en ferri',
      'Sicilia Bau Beach Mondello', 'Cerdeña agriturismo perro', 'Ibiza fuera de temporada perro',
      'Menorca Camí de Cavalls perro', 'Córcega Calvi con perro', 'Islandia normas importación perro',
      'Hvar dog-friendly Stari Grad', 'Korčula playas perro', 'Brač Zlatni Rat zona canina',
      'Rodas Lindos paseos perro', 'Santorini caldera con perro', 'Mykonos invierno perro',
      'Chipre playa canina Yeroskipou', 'Malta Valeta cafés perro', 'Gozo Dwejra paseos perro',
      'Capri Anacapri con perro', 'Elba siete playas caninas', 'Sylt Hundenstrand Westerland',
      'Skye Cuillin paseo perro', 'Isla de Wight playa canina', 'Aran Islands ferri perro', 'Feroe permiso perro',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Este ranking es el mismo para gatos?', a: `Sobre todo no. Los criterios que importan para un gato de interior (aceptación hotelera, bajo estrés en transporte, sin extremos térmicos) son muy diferentes de lo que medimos para perros (playas caninas, zonas sin correa, camarotes para mascotas en ferri). Para gatos, Mallorca, Madeira, Chipre y Malta siguen altos porque su inventario de hoteles pet-friendly es fuerte, pero el resto de la lista es específica de perros.` },
      { q: `¿Por qué Tenerife o Gran Canaria no están en el top 25?`, a: `Las Islas Canarias tienen un marco regulatorio español sólido y buen clima, pero las playas caninas oficialmente designadas son sorprendentemente pocas y concentradas en unos pocos municipios. Varios puntos han aparecido y desaparecido de las ordenanzas locales en los últimos tres años, por lo que las dejamos fuera del top 25 hasta que el cuadro se estabilice en 2026 y 2027.` },
      { q: `¿Cómo llegar a estas islas con mi perro?`, a: `Para las islas mediterráneas, el ferri es casi siempre la opción más barata y menos estresante. La mayoría de operadores (Corsica Ferries, Jadrolinija, Anek, Minoan, Wightlink) admiten perros en camarote por una tarifa modesta, y tu perro nunca se separa de ti. El vuelo sólo merece la pena para Islandia, las Feroe, Madeira, Canarias y las travesías muy largas.` },
      { q: '¿Y el papeleo de importación?', a: `Las islas UE usan el pasaporte europeo estándar (microchip, vacuna antirrábica, pasaporte válido). Las islas UK exigen un Animal Health Certificate desde el Brexit (unos 100 €, válido 4 meses). Islandia y las Islas Feroe requieren un permiso especial de importación con hasta un mes de papeleo previo. Planifica con antelación.` },
      { q: '¿Cuándo es la mejor época?', a: `Para las islas mediterráneas (Mallorca, Sicilia, Creta, Córcega, Cerdeña, Hvar, Brač, Rodas, Santorini, Capri, Elba), la temporada media (abril-junio y septiembre-octubre) es ideal: calor, menos gente, playas caninas aún abiertas en muchos casos. Para las islas atlánticas y nórdicas (Madeira, Islandia, Sylt, Skye, Isla de Wight, Aran, Feroe), de verano a principios de otoño es lo mejor.` },
    ],
    conclusion: { title: 'Nuestra elección si sólo tienes un viaje en isla', paras: [
      `Si tuviéramos que elegir una sola isla europea para un primer viaje canino, sería Mallorca. La combinación de playas caninas oficialmente designadas, un vasto inventario de alojamientos pet-friendly en el interior y la costa, un clima suave todo el año y excelentes vuelos directos desde la mayoría de capitales europeas la convierten en la opción de menor fricción. Las montañas de la Tramuntana ofrecen paseos frescos incluso en verano.`,
      `Para algo más tranquilo, elige Menorca, Brač o las Islas Aran. Para un clima suave todo el año sin el calor estival mediterráneo, elige Madeira o Chipre. Y si sólo viajas en invierno, Mykonos, Santorini y Rodas se convierten en otro tipo de viaje: vacías, peatonales y sorprendentemente dog-friendly.`,
    ] },
    ctaTitle: 'Planea tu viaje con nuestras guías de destino',
    ctaDesc: `Varias de estas 25 islas tienen una guía pet-friendly completa con hoteles, veterinarios, playas y mapa de reserva en vivo.`,
    ctaButton: 'Ver todos los destinos →',
    bottomBookCtaTitle: '¿Listo para reservar? Compara 770+ hoteles pet-friendly',
    bottomBookCtaDesc: `Precios en vivo y reserva instantánea por toda Europa, Booking.com, Expedia, Hotels.com y más. Cancelación gratuita en la mayoría de los establecimientos, políticas de mascotas verificadas en cada ficha.`,
    bottomBookCtaButton: 'Buscar hoteles pet-friendly →',
  },
  pt: {
    hero: { kicker: 'AS MELHORES ILHAS CANINAS DA EUROPA · EDIÇÃO 2026', h1: 'Top 25 ilhas pet-friendly da Europa', lede: `De Maiorca à Madeira, da Sicília a Skye, auditámos 60 ilhas europeias quanto ao acesso a praias caninas, regras de ferry, clima, densidade de hotéis pet-friendly e burocracia de importação. Estas são as 25 ilhas onde viajar com um cão vale verdadeiramente o barco ou o avião. Atualizado para 2026.` },
    intro: { title: 'Porque um guia de ilhas é diferente', paras: [
      `As ilhas não são apenas versões mais pequenas dos destinos continentais. Viajar até lá com um cão acrescenta um ferry ou um voo, um conjunto mais rigoroso de regras de alojamento, e um clima que pode oscilar do idílico na época baixa ao brutal no pico do verão. A ilha errada em agosto é um cão com stress térmico e um viajante frustrado.`,
      `Auditámos 60 ilhas europeias contra cinco critérios: disponibilidade de praias caninas oficialmente designadas, política animal das companhias de ferry (aceitação em camarote e preços), adequação climática para cães ao longo do ano, densidade de hotéis pet-friendly verificados, e burocracia regulatória necessária para entrar com cão. Algumas ilhas óbvias no papel (Santorini, Mykonos) caem por causa do calor estival e das multidões. Outras em que os viajantes raramente pensam (Elba, Sylt, a Ilha de Wight) sobem graças a infraestrutura canina oficialmente designada.`,
      `As 25 ilhas abaixo superam o critério em pelo menos três dos cinco. Quando já publicamos um guia de destino (Maiorca, Madeira, Creta, Sicília, Islândia, Brač via Split), o cartão liga diretamente. Quando ainda não existe nenhum guia, mantemos a entrada geral e verificável em vez de inventar nomes de instalações.`,
    ] },
    methodology: { title: 'A nossa metodologia', paras: [
      `A disponibilidade de praias caninas foi obtida da comune, câmara ou posto de turismo de cada ilha. Separámos as praias caninas o ano inteiro das sazonais, já que a maioria das zonas caninas mediterrânicas fecha de maio a setembro, exatamente quando os viajantes querem visitar.`,
      `A política animal das companhias de ferry foi cruzada com os termos oficiais do operador (Corsica Ferries, Jadrolinija, Anek, Minoan, Wightlink, Red Funnel, Direct Ferries, Aran Island Ferries). As ilhas acessíveis apenas por voo foram avaliadas segundo a política de cabine das companhias aéreas da rota.`,
      `A adequação climática foi avaliada mês a mês com base em médias de 30 anos. As ilhas que ultrapassam 32 °C de máxima média em julho perdem pontos para viagem estival e ganham pontos para viagem fora de época ou o ano inteiro.`,
      `A disponibilidade hoteleira foi medida contabilizando estabelecimentos pet-friendly com avaliação 8,0+ nas principais plataformas dentro da ilha. Ilhas com menos de 15 estabelecimentos saem do ranking, independentemente de outros pontos fortes.`,
      `A burocracia regulatória foi ponderada por último mas é decisiva nos extremos: a Islândia e as Ilhas Faroé mantêm a sua posição pela verdadeira qualidade do destino, mas sinalizamos claramente o processo de importação pesado na sua ficha.`,
    ] },
    rankingTitle: 'O ranking Top 25',
    rankingSubtitle: `Cada ilha liga aos preços em direto de hotéis pet-friendly e, quando existe, ao nosso guia de cidade completo com números de veterinários, praias e regras de transporte.`,
    hotelsLabel: 'Hotéis',
    guideLink: 'Guia completo da cidade →',
    bookOnBooking: 'Reservar hotéis pet-friendly →',
    bookHotelsInPrefix: 'Reservar hotéis pet-friendly em',
    mapTitle: 'Mapa em direto · hotéis pet-friendly em redor de Maiorca (n.º 1)',
    mapDesc: `Centrado em Palma de Maiorca, a nossa ilha pet-friendly n.º 1. Desloque, faça zoom e clique em qualquer marcador para ver preços em direto, políticas de animais e disponibilidade com cancelamento grátis nas Baleares e além.`,
    keywordChipsTitle: 'Pesquisas populares de hotéis pet-friendly em ilhas em 2026',
    keywordChips: [
      'Hotéis com cães Maiorca', 'Madeira pet-friendly levadas', 'Creta com cão de ferry',
      'Sicília Bau Beach Mondello', 'Sardenha agriturismo cão', 'Ibiza fora de época cão',
      'Menorca Camí de Cavalls cão', 'Córsega Calvi com cão', 'Islândia regras importação cão',
      'Hvar pet-friendly Stari Grad', 'Korčula praias cão', 'Brač Zlatni Rat zona canina',
      'Rodes Lindos passeios cão', 'Santorini caldeira com cão', 'Mykonos inverno cão',
      'Chipre praia canina Geroskipou', 'Malta Valletta cafés cão', 'Gozo Dwejra passeios cão',
      'Capri Anacapri com cão', 'Elba sete praias caninas', 'Sylt Hundenstrand Westerland',
      'Skye Cuillin passeio cão', 'Ilha de Wight praia canina', 'Aran Islands ferry cão', 'Faroé licença cão',
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      { q: 'Este ranking é o mesmo para gatos?', a: `Sobretudo não. Os critérios que importam para um gato de interior (aceitação hoteleira, baixo stress em transporte, sem extremos térmicos) são muito diferentes do que medimos para cães (praias caninas, zonas sem trela, camarotes para animais em ferry). Para gatos, Maiorca, Madeira, Chipre e Malta permanecem em alta porque o seu inventário de hotéis pet-friendly é forte, mas o resto da lista é específica de cães.` },
      { q: `Porque é que Tenerife ou Gran Canaria não estão no top 25?`, a: `As Ilhas Canárias têm um quadro regulatório espanhol sólido e bom clima, mas as praias caninas oficialmente designadas são surpreendentemente poucas e concentradas em alguns municípios. Vários pontos surgiram e desapareceram das posturas locais nos últimos três anos, pelo que as mantemos fora do top 25 até que o quadro estabilize em 2026 e 2027.` },
      { q: `Como chegar a estas ilhas com o meu cão?`, a: `Para as ilhas mediterrânicas, o ferry é quase sempre a opção mais barata e menos stressante. A maioria dos operadores (Corsica Ferries, Jadrolinija, Anek, Minoan, Wightlink) aceita cães em camarote por um suplemento modesto, e o seu cão nunca se separa de si. O voo só compensa para a Islândia, as Faroé, a Madeira, as Canárias e as travessias muito longas.` },
      { q: 'E a burocracia de importação?', a: `As ilhas da UE usam o passaporte europeu standard (microchip, vacina antirrábica, passaporte válido). As ilhas do Reino Unido exigem um Animal Health Certificate desde o Brexit (cerca de 100 €, válido 4 meses). A Islândia e as Ilhas Faroé exigem uma licença especial de importação com até um mês de burocracia prévia. Planeie cedo.` },
      { q: 'Qual é a melhor altura?', a: `Para as ilhas mediterrânicas (Maiorca, Sicília, Creta, Córsega, Sardenha, Hvar, Brač, Rodes, Santorini, Capri, Elba), a época intermédia (abril-junho e setembro-outubro) é ideal: quente, menos gente, praias caninas ainda abertas em muitos casos. Para as ilhas atlânticas e nórdicas (Madeira, Islândia, Sylt, Skye, Ilha de Wight, Aran, Faroé), do verão ao início do outono é o melhor.` },
    ],
    conclusion: { title: 'A nossa escolha se só tiver uma viagem de ilha', paras: [
      `Se tivéssemos de escolher uma única ilha europeia para uma primeira viagem canina, seria Maiorca. A combinação de praias caninas oficialmente designadas, um vasto inventário de alojamentos pet-friendly no interior e na costa, um clima ameno o ano inteiro e excelentes voos diretos a partir da maioria das capitais europeias torna-a a escolha de menor atrito. As montanhas da Tramuntana oferecem passeios frescos mesmo no verão.`,
      `Para algo mais calmo, escolha Menorca, Brač ou as Ilhas Aran. Para um clima ameno o ano inteiro sem o calor estival mediterrânico, escolha a Madeira ou Chipre. E se viajar apenas no inverno, Mykonos, Santorini e Rodes transformam-se noutro tipo de viagem: vazias, pedonais e surpreendentemente pet-friendly.`,
    ] },
    ctaTitle: 'Planeie a sua viagem com os nossos guias de destino',
    ctaDesc: `Várias destas 25 ilhas têm um guia pet-friendly completo com hotéis, veterinários, praias e mapa de reserva em direto.`,
    ctaButton: 'Ver todos os destinos →',
    bottomBookCtaTitle: 'Pronto para reservar? Compare 770+ hotéis pet-friendly',
    bottomBookCtaDesc: `Preços em direto e reserva instantânea por toda a Europa, Booking.com, Expedia, Hotels.com e mais. Cancelamento grátis na maioria dos estabelecimentos, políticas de animais verificadas em cada ficha.`,
    bottomBookCtaButton: 'Procurar hotéis pet-friendly →',
  },
  de: {
    hero: { kicker: `EUROPAS BESTE HUNDEINSELN · AUSGABE 2026`, h1: 'Top 25 hundefreundliche Inseln Europas', lede: `Von Mallorca bis Madeira, von Sizilien bis Skye haben wir 60 europäische Inseln nach Hundestrand-Zugang, Fährregeln, Klima, Dichte haustierfreundlicher Hotels und Einfuhrbestimmungen geprüft. Hier sind die 25 Inseln, auf denen sich das Boot oder der Flug mit Hund wirklich lohnt. Aktualisiert für 2026.` },
    intro: { title: 'Warum ein Inselführer anders ist', paras: [
      `Inseln sind nicht einfach kleinere Versionen von Festlandzielen. Eine Reise dorthin mit Hund bringt eine Fähre oder einen Flug, strengere Unterkunftsregeln und ein Klima mit sich, das von idyllisch in der Nebensaison zu brutal im Hochsommer umschlagen kann. Die falsche Insel im August bedeutet einen hitzegestressten Hund und einen frustrierten Reisenden.`,
      `Wir haben 60 europäische Inseln nach fünf Kriterien geprüft: Verfügbarkeit offiziell ausgewiesener Hundestrände, Haustierrichtlinien der Fährgesellschaften (Kabinenmitnahme und Preise), klimatische Eignung für Hunde über das ganze Jahr, Dichte verifizierter haustierfreundlicher Hotels und die behördlichen Einfuhrbestimmungen für Hunde. Manche auf dem Papier naheliegende Inseln (Santorin, Mykonos) fallen wegen Sommerhitze und Menschenmassen zurück. Andere, an die Reisende selten denken (Elba, Sylt, die Isle of Wight), steigen dank offiziell ausgewiesener Hundeinfrastruktur auf.`,
      `Die 25 Inseln unten erfüllen alle mindestens drei der fünf Kriterien. Wo bereits ein eigener Reiseführer existiert (Mallorca, Madeira, Kreta, Sizilien, Island, Brač über Split), verlinkt die Karte direkt dorthin. Wo noch kein Reiseführer existiert, halten wir den Eintrag allgemein und überprüfbar, statt Einrichtungsnamen zu erfinden.`,
    ] },
    methodology: { title: 'Unsere Methodik', paras: [
      `Die Verfügbarkeit von Hundestränden wurde bei der jeweiligen Gemeinde, Stadtverwaltung oder Tourismusbehörde jeder Insel recherchiert. Wir haben ganzjährige von saisonalen Hundestränden getrennt, da die meisten mediterranen Hundezonen von Mai bis September schließen, genau dann, wenn Reisende kommen möchten.`,
      `Die Haustierrichtlinien der Fährgesellschaften wurden mit den offiziellen Bedingungen der Anbieter abgeglichen (Corsica Ferries, Jadrolinija, Anek, Minoan, Wightlink, Red Funnel, Direct Ferries, Aran Island Ferries). Inseln, die nur per Flug erreichbar sind, wurden nach den Kabinenrichtlinien der jeweiligen Fluggesellschaften auf der Route bewertet.`,
      `Die klimatische Eignung wurde Monat für Monat anhand von 30-Jahres-Durchschnittswerten bewertet. Inseln, deren durchschnittliche Julihöchstwerte über 32 °C liegen, verlieren Punkte für Sommerreisen und gewinnen Punkte für Nebensaison- oder Ganzjahresreisen.`,
      `Die Hotelverfügbarkeit wurde durch Zählung haustierfreundlicher Unterkünfte mit 8,0+ Bewertung auf den großen Buchungsplattformen auf der jeweiligen Insel gemessen. Inseln mit weniger als 15 solchen Unterkünften rutschten im Ranking ab, unabhängig von anderen Stärken.`,
      `Die behördlichen Einfuhrbestimmungen wurden zuletzt gewichtet, sind aber in Extremfällen entscheidend: Island und die Färöer-Inseln behalten ihre Platzierung dank echter Zielqualität, aber wir weisen in ihrem Eintrag klar auf den aufwendigen Einfuhrprozess hin.`,
    ] },
    rankingTitle: 'Das Top-25-Ranking',
    rankingSubtitle: `Jede Insel verlinkt zu Live-Preisen für haustierfreundliche Hotels und, sofern vorhanden, zu unserem vollständigen Stadtführer mit Tierarzt-Nummern, Stränden und Transportregeln.`,
    hotelsLabel: 'Hotels',
    guideLink: 'Vollständiger Stadtführer →',
    bookOnBooking: 'Haustierfreundliche Hotels buchen →',
    bookHotelsInPrefix: 'Haustierfreundliche Hotels buchen in',
    mapTitle: 'Live-Karte · haustierfreundliche Hotels rund um Mallorca (#1)',
    mapDesc: `Zentriert auf Palma de Mallorca, unsere hundefreundlichste Insel Nr. 1. Verschieben, zoomen und auf einen beliebigen Marker klicken, um Live-Preise, Haustierrichtlinien und die Verfügbarkeit mit kostenloser Stornierung auf den Balearen und darüber hinaus zu sehen.`,
    keywordChipsTitle: 'Beliebte Suchanfragen zu haustierfreundlichen Inseln 2026',
    keywordChips: [
      'Hundefreundliche Hotels Mallorca', 'Haustierfreundliche Madeira-Levadas', 'Kreta mit Hund per Fähre',
      'Sizilien Bau Beach Mondello', 'Sardinien Agriturismo Hunde', 'Ibiza Nebensaison mit Hund',
      'Menorca Camí de Cavalls Hund', 'Korsika Calvi mit Hund', 'Island Einfuhrregeln Hund',
      'Hvar hundefreundlich Stari Grad', 'Korčula Hundestrände', 'Brač Zlatni Rat Hundezone',
      'Rhodos Lindos Hundespaziergänge', 'Santorin Hundewanderung Caldera', 'Mykonos Winter mit Hund',
      'Zypern Hundestrand Geroskipou', 'Malta Valletta Hundecafés', 'Gozo Dwejra Hundespaziergänge',
      'Capri Anacapri mit Hund', 'Elba sieben Hundestrände', 'Sylt Hundenstrand Westerland',
      'Skye Cuillin Hundewanderung', 'Isle of Wight Hundestrand', 'Aran Islands Fähre Hund', 'Färöer Hunde-Einfuhrgenehmigung',
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      { q: 'Gilt dieses Ranking auch für Katzen?', a: `Größtenteils nein. Die Kriterien, die für Wohnungskatzen zählen (Hotelakzeptanz, geringer Transportstress, keine Hitzeextreme), unterscheiden sich stark von dem, was wir für Hunde messen (Hundestrände, Freilaufzonen, Haustierkabinen auf Fähren). Für Katzen bleiben Mallorca, Madeira, Zypern und Malta gut platziert, weil ihr Bestand an haustierfreundlichen Hotels stark ist, aber der Rest der Liste ist hundespezifisch.` },
      { q: `Warum stehen Teneriffa oder Gran Canaria nicht in den Top 25?`, a: `Die Kanarischen Inseln haben ein solides spanisches Regelwerk und ein gutes Klima, aber offiziell ausgewiesene Hundestrände sind überraschend wenige und auf nur wenige Gemeinden konzentriert. Mehrere Standorte sind in den letzten drei Jahren in lokalen Verordnungen aufgetaucht und wieder verschwunden, daher lassen wir sie bis zur Stabilisierung der Lage 2026 und 2027 außerhalb der Top 25.` },
      { q: `Wie komme ich mit meinem Hund zu diesen Inseln?`, a: `Für Mittelmeerinseln sind Fähren fast immer die günstigste und stressärmste Option. Die meisten Anbieter (Corsica Ferries, Jadrolinija, Anek, Minoan, Wightlink) nehmen Hunde gegen einen moderaten Aufpreis in der Kabine mit, und Ihr Hund bleibt jederzeit an Ihrer Seite. Flüge lohnen sich nur für Island, die Färöer, Madeira, die Kanaren und die sehr langen Überfahrten.` },
      { q: 'Wie sieht es mit den Einfuhrbestimmungen aus?', a: `EU-Inseln verwenden den Standard-EU-Heimtierausweis (Mikrochip, Tollwutimpfung, gültiger Ausweis). UK-Inseln benötigen seit dem Brexit ein Animal Health Certificate (rund 100 €, 4 Monate gültig). Island und die Färöer-Inseln verlangen eine spezielle Einfuhrgenehmigung mit bis zu einem Monat Vorlaufzeit für den Papierkram. Planen Sie frühzeitig.` },
      { q: 'Wann ist die beste Reisezeit?', a: `Für Mittelmeerinseln (Mallorca, Sizilien, Kreta, Korsika, Sardinien, Hvar, Brač, Rhodos, Santorin, Capri, Elba) ist die Nebensaison (April-Juni und September-Oktober) ideal: warm, weniger Andrang, Hundestrände in vielen Fällen noch geöffnet. Für atlantische und nördliche Inseln (Madeira, Island, Sylt, Skye, Isle of Wight, Aran, Färöer) ist der Sommer bis zum Frühherbst am besten.` },
    ],
    conclusion: { title: 'Unsere Empfehlung, wenn Sie nur eine Inselreise machen', paras: [
      `Müssten wir uns für eine einzige europäische Insel für die erste Hundereise entscheiden, wäre es Mallorca. Die Kombination aus offiziell ausgewiesenen Hundestränden, einem riesigen Bestand an haustierfreundlichen Unterkünften im Landesinneren und entlang der Küste, einem ganzjährig milden Klima und ausgezeichneten Direktflügen von den meisten europäischen Hauptstädten macht sie zur reibungslosesten Wahl. Die Berge der Tramuntana bieten selbst im Sommer kühle Wanderungen im Landesinneren.`,
      `Wenn Sie es ruhiger mögen, wählen Sie Menorca, Brač oder die Aran-Inseln. Für ein ganzjährig mildes Klima ohne die mediterrane Sommerhitze wählen Sie Madeira oder Zypern. Und wenn Sie nur im Winter reisen, verwandeln sich Mykonos, Santorin und Rhodos in eine andere Art von Reise: leer, fußläufig und überraschend hundefreundlich.`,
    ] },
    ctaTitle: 'Planen Sie Ihre Reise mit unseren Reisezielführern',
    ctaDesc: `Mehrere dieser 25 Inseln verfügen über einen vollständigen haustierfreundlichen Reiseführer mit Hotels, Tierärzten, Stränden und einer Live-Buchungskarte.`,
    ctaButton: 'Alle Reiseziele ansehen →',
    bottomBookCtaTitle: 'Bereit zu buchen? Vergleichen Sie 770+ haustierfreundliche Hotels',
    bottomBookCtaDesc: `Live-Preise und Sofortbuchung in ganz Europa, auf Booking.com, Expedia, Hotels.com und mehr. Kostenlose Stornierung bei den meisten Unterkünften, verifizierte Haustierrichtlinien bei jedem Eintrag.`,
    bottomBookCtaButton: 'Haustierfreundliche Hotels suchen →',
  },
  nl: {
    hero: { kicker: `EUROPA'S BESTE HONDENEILANDEN · EDITIE 2026`, h1: 'Top 25 hondvriendelijke eilanden van Europa', lede: `Van Mallorca tot Madeira, van Sicilië tot Skye: we hebben 60 Europese eilanden doorgelicht op toegang tot hondenstranden, veerbootregels, klimaat, dichtheid van huisdiervriendelijke hotels en invoerpapieren. Dit zijn de 25 eilanden waar reizen met je hond de boot of de vlucht echt waard is. Bijgewerkt voor 2026.` },
    intro: { title: 'Waarom een eilandengids anders is', paras: [
      `Eilanden zijn niet zomaar kleinere versies van bestemmingen op het vasteland. Er met je hond naartoe reizen betekent een veerboot of een vlucht erbij, strengere regels voor accommodatie, en een klimaat dat kan omslaan van idyllisch in het tussenseizoen naar meedogenloos in het hoogzomer. Het verkeerde eiland in augustus levert je een oververhitte hond en een gefrustreerde reiziger op.`,
      `We hebben 60 Europese eilanden doorgelicht op vijf criteria: beschikbaarheid van officieel aangewezen hondenstranden, huisdierenbeleid van veerbootmaatschappijen (acceptatie in cabines en tarieven), klimaatgeschiktheid voor honden door het jaar heen, dichtheid van geverifieerde huisdiervriendelijke hotels, en de papierwinkel die nodig is om je hond het land binnen te krijgen. Sommige eilanden die op papier voor de hand liggen (Santorini, Mykonos) zakken door zomerhitte en drukte. Andere waar reizigers zelden aan denken (Elba, Sylt, het Isle of Wight) stijgen dankzij officieel aangewezen hondeninfrastructuur.`,
      `De 25 eilanden hieronder halen allemaal minstens drie van de vijf criteria. Waar we al een bestemmingsgids publiceren (Mallorca, Madeira, Kreta, Sicilië, IJsland, Brač via Split), verwijst de kaart er rechtstreeks naartoe. Waar nog geen bestemmingsgids bestaat, houden we de vermelding algemeen en verifieerbaar in plaats van namen van voorzieningen te verzinnen.`,
    ] },
    methodology: { title: 'Onze methodologie', paras: [
      `De beschikbaarheid van hondenstranden is opgehaald bij de comune, gemeente of toeristendienst van elk eiland. We splitsten jaarrond hondenstranden af van seizoensgebonden stranden, omdat de meeste mediterrane hondenzones sluiten van mei tot september, precies wanneer reizigers willen komen.`,
      `Het huisdierenbeleid van veerbootmaatschappijen is gecontroleerd aan de hand van de officiële voorwaarden van de exploitant (Corsica Ferries, Jadrolinija, Anek, Minoan, Wightlink, Red Funnel, Direct Ferries, Aran Island Ferries). Eilanden die alleen per vlucht bereikbaar zijn, zijn beoordeeld op het cabinebeleid van de betrokken luchtvaartmaatschappijen voor die route.`,
      `De klimaatgeschiktheid is maand voor maand geëvalueerd met 30-jaarsgemiddelden. Eilanden die in juli boven de 32 °C gemiddelde maximumtemperatuur uitkomen, verliezen punten voor zomerreizen en winnen punten voor reizen buiten het seizoen of het hele jaar door.`,
      `De hotelbeschikbaarheid is gemeten door huisdiervriendelijke accommodaties met een beoordeling van 8,0+ te tellen op de grote boekingsplatforms binnen het eiland. Eilanden met minder dan 15 van dit soort accommodaties zakten in de ranglijst, ongeacht andere sterke punten.`,
      `De papierwinkel woog het laatst mee, maar is doorslaggevend in de uitersten: IJsland en de Faeröer eilanden behouden hun plek dankzij echte bestemmingskwaliteit, maar we vermelden het zware invoerproces duidelijk bij hun vermelding.`,
    ] },
    rankingTitle: 'De top 25-ranglijst',
    rankingSubtitle: `Elk eiland linkt naar live prijzen voor huisdiervriendelijke hotels en, waar beschikbaar, naar onze volledige stadsgids met dierenartsnummers, stranden en vervoersregels.`,
    hotelsLabel: 'Hotels',
    guideLink: 'Volledige stadsgids →',
    bookOnBooking: 'Boek huisdiervriendelijke hotels →',
    bookHotelsInPrefix: 'Boek huisdiervriendelijke hotels in',
    mapTitle: 'Live kaart · huisdiervriendelijke hotels rond Mallorca (#1)',
    mapDesc: `Gecentreerd op Palma de Mallorca, ons hondvriendelijkste eiland op #1. Verschuif, zoom in en klik op een marker om live prijzen, huisdierenbeleid en beschikbaarheid met gratis annulering te zien op de Balearen en daarbuiten.`,
    keywordChipsTitle: 'Populaire zoekopdrachten naar huisdiervriendelijke eilanden in 2026',
    keywordChips: [
      'Hondvriendelijke hotels Mallorca', 'Huisdiervriendelijke Madeira levadas', 'Kreta met hond per veerboot',
      'Sicilië Bau Beach Mondello', 'Sardinië agriturismo hond', 'Ibiza buiten het seizoen met hond',
      'Menorca Camí de Cavalls hond', 'Corsica Calvi met hond', 'IJsland invoerregels hond',
      'Hvar hondvriendelijk Stari Grad', 'Korčula hondenstranden', 'Brač Zlatni Rat hondenzone',
      'Rhodos Lindos hondenwandelingen', 'Santorini hondenwandeling caldera', 'Mykonos winter met hond',
      'Cyprus hondenstrand Geroskipou', 'Malta Valletta hondencafés', 'Gozo Dwejra hondenwandelingen',
      'Capri Anacapri met hond', 'Elba zeven hondenstranden', 'Sylt Hundenstrand Westerland',
      'Skye Cuillin hondenwandeling', 'Isle of Wight hondenstrand', 'Aran Islands veerboot hond', 'Faeröer hondenvergunning',
    ],
    faqTitle: 'Veelgestelde vragen',
    faqs: [
      { q: 'Is deze ranglijst hetzelfde voor katten?', a: `Meestal niet. De criteria die tellen voor een binnenkat (acceptatie in hotels, weinig stress bij vervoer, geen hitte-extremen) verschillen sterk van wat we voor honden meten (hondenstranden, aanlijnvrije zones, huisdiercabines op veerboten). Voor katten blijven Mallorca, Madeira, Cyprus en Malta hoog scoren omdat hun aanbod huisdiervriendelijke hotels sterk is, maar de rest van de lijst is hondspecifiek.` },
      { q: `Waarom staan Tenerife of Gran Canaria niet in de top 25?`, a: `De Canarische Eilanden hebben een solide Spaans regelgevend kader en een goed klimaat, maar officieel aangewezen hondenstranden zijn verrassend schaars en geconcentreerd in maar een paar gemeenten. Meerdere locaties zijn de afgelopen drie jaar in lokale verordeningen verschenen en weer verdwenen, dus we houden ze buiten de top 25 tot het beeld stabiliseert in 2026 en 2027.` },
      { q: `Hoe kom ik met mijn hond op deze eilanden?`, a: `Voor mediterrane eilanden is de veerboot bijna altijd de goedkoopste en minst stressvolle optie. De meeste maatschappijen (Corsica Ferries, Jadrolinija, Anek, Minoan, Wightlink) laten honden tegen een bescheiden toeslag in de cabine toe, en je hond blijft de hele tijd bij je. Vliegen is alleen de moeite waard voor IJsland, de Faeröer, Madeira, de Canarische Eilanden en de heel lange overtochten.` },
      { q: 'En de invoerpapieren?', a: `EU-eilanden gebruiken het standaard EU-dierenpaspoort (chip, rabiësvaccinatie, geldig paspoort). UK-eilanden vereisen sinds de Brexit een Animal Health Certificate (ongeveer 100 €, 4 maanden geldig). IJsland en de Faeröer eilanden vragen een speciale invoervergunning met tot een maand papierwerk vooraf. Plan op tijd.` },
      { q: 'Wanneer is de beste reistijd?', a: `Voor mediterrane eilanden (Mallorca, Sicilië, Kreta, Corsica, Sardinië, Hvar, Brač, Rhodos, Santorini, Capri, Elba) is het tussenseizoen (april-juni en september-oktober) ideaal: warm, minder drukte, hondenstranden in veel gevallen nog open. Voor Atlantische en noordelijke eilanden (Madeira, IJsland, Sylt, Skye, Isle of Wight, Aran, Faeröer) is de zomer tot begin herfst het beste moment.` },
    ],
    conclusion: { title: 'Onze keuze als je maar één eilandtrip hebt', paras: [
      `Als we voor een eerste hondentrip één Europees eiland moesten kiezen, zou het Mallorca zijn. De combinatie van officieel aangewezen hondenstranden, een enorm aanbod huisdiervriendelijke accommodaties landinwaarts en langs de kust, een jaarrond mild klimaat en uitstekende directe vluchten vanuit de meeste Europese hoofdsteden maakt het de keuze met de minste wrijving. De bergen van de Tramuntana geven je zelfs 's zomers koele wandelingen landinwaarts.`,
      `Wil je iets rustigers, kies dan Menorca, Brač of de Aran-eilanden. Wil je een jaarrond mild klimaat zonder de mediterrane zomerhitte, kies dan Madeira of Cyprus. En reis je alleen in de winter, dan worden Mykonos, Santorini en Rhodos een heel ander soort trip: leeg, goed te belopen en verrassend hondvriendelijk.`,
    ] },
    ctaTitle: 'Plan je reis met onze bestemmingsgidsen',
    ctaDesc: `Verschillende van deze 25 eilanden hebben een volledige huisdiervriendelijke bestemmingsgids met hotels, dierenartsen, stranden en een live boekingskaart.`,
    ctaButton: 'Bekijk alle bestemmingen →',
    bottomBookCtaTitle: 'Klaar om te boeken? Vergelijk 770+ huisdiervriendelijke hotels',
    bottomBookCtaDesc: `Live prijzen en directe boeking door heel Europa, op Booking.com, Expedia, Hotels.com en meer. Gratis annulering bij de meeste accommodaties, geverifieerd huisdierenbeleid bij elke vermelding.`,
    bottomBookCtaButton: 'Zoek huisdiervriendelijke hotels →',
  },
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en

  type IslandView = IslandEntry & {
    dest: typeof destinations[number] | null
    hotelCount: number
    reasonText: string
  }

  const islands: IslandView[] = TOP_25.map((entry) => {
    const dest = entry.slug ? destinations.find((d) => d.slug === entry.slug) ?? null : null
    const hotelCount = entry.slug ? hotels.filter((h) => h.destinationSlug === entry.slug).length : 0
    return {
      ...entry,
      dest,
      hotelCount,
      reasonText: entry.reason[locale as 'en' | 'fr' | 'es' | 'pt' | 'de' | 'nl'] || entry.reason.en,
    }
  })

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: c.hero.h1,
    numberOfItems: islands.length,
    itemListElement: islands.map((isl, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: isl.islandName,
      ...(isl.dest ? { url: `${SITE_URL}/${locale}/destinations/${isl.dest.slug}` } : {}),
    })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.hero.h1,
    description: c.hero.lede,
    inLanguage: locale,
    datePublished: '2026-05-17T00:00:00Z',
    dateModified: '2026-06-26',
    author: { '@type': 'Person', name: 'HotelsWithPets Editorial', jobTitle: 'Pet Travel Editor', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.ico` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/${locale}/guides/${SLUG}` },
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-cyan-900 via-blue-800 to-emerald-700 text-white py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            🏝️ {c.hero.kicker}
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">{c.hero.h1}</h1>
          <p className="text-blue-100 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">{c.hero.lede}</p>
        </div>
      </section>

      {/* Ranking (directly under hero) */}
      <section className="py-14 lg:py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 text-center">{c.rankingTitle}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">{c.rankingSubtitle}</p>
          <div className="space-y-6">
            {islands.map((isl) => {
              const localCountry = getLocalizedCountryName(isl.country, locale)
              const bookUrl = buildAllezDestLink(isl.islandName, isl.country, `top25islands-rank${isl.rank}`)
              const localCityName = isl.dest ? getLocalizedCityName(isl.dest.slug, isl.dest.name, locale) : isl.islandName
              return (
                <article key={`${isl.rank}-${isl.islandName}`} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="relative h-48 md:h-auto md:col-span-1 bg-gray-100">
                      <Image
                        src={isl.dest?.heroImage || `/images/islands/${isl.photoSlug}.jpg`}
                        alt={`Pet-friendly hotels on ${isl.islandName}, dog-friendly travel ${localCountry}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                        <span className="text-xl font-extrabold text-blue-700">#{isl.rank}</span>
                      </div>
                    </div>
                    <div className="md:col-span-2 p-6 lg:p-8">
                      <div className="flex items-baseline justify-between gap-4 mb-2 flex-wrap">
                        <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-900">
                          {isl.flag} {isl.islandName}
                        </h3>
                        <span className="text-sm text-gray-500">{localCountry}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-5">{isl.reasonText}</p>

                      {/* Primary booking CTA, full-width orange→blue gradient */}
                      <a
                        href={bookUrl}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-white text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 mb-3"
                        style={{ background: 'linear-gradient(135deg, #f97316 0%, #3b82f6 100%)' }}
                      >
                        🐾 {c.bookHotelsInPrefix} {isl.islandName} →
                      </a>

                      {/* Inline editorial hotel pick (only when island is wired to a destination) */}
                      {isl.dest && (
                        <NearbyHotelCard destinationSlug={isl.dest.slug} locale={locale} variant="compact" />
                      )}

                      {/* Secondary links row */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mt-3">
                        {isl.dest && (
                          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold">
                            {isl.hotelCount} {c.hotelsLabel}
                          </span>
                        )}
                        {isl.dest && (
                          <Link href={`/${locale}/destinations/${isl.dest.slug}`} className="text-blue-600 hover:text-blue-800 font-semibold hover:underline">
                            {c.guideLink}
                          </Link>
                        )}
                        {isl.dest && (
                          <Link href={`/${locale}/${isl.dest.slug}/dog-friendly`} className="text-gray-500 hover:text-blue-600 hover:underline">
                            {c.bookOnBooking}
                          </Link>
                        )}
                        {!isl.dest && (
                          <span className="text-xs text-gray-500 italic">{localCityName}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Bottom-of-ranking booking CTA */}
          <div className="mt-12 bg-gradient-to-br from-orange-50 to-blue-50 rounded-3xl p-8 lg:p-10 text-center border border-orange-100">
            <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3">{c.bottomBookCtaTitle}</h3>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto mb-6">{c.bottomBookCtaDesc}</p>
            <a
              href={buildAllezDestLink('Europe', 'Europe', 'top25islands-bottom-cta')}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #f97316 0%, #3b82f6 100%)' }}
            >
              {c.bottomBookCtaButton}
            </a>
          </div>
        </div>
      </section>

      {/* Live map, centered on Palma de Mallorca */}
      <section className="py-14 lg:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 text-center">🗺️ {c.mapTitle}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-7 leading-relaxed">{c.mapDesc}</p>
          <PetMap lat={39.5696} lng={2.6502} destName="Palma de Mallorca" locale={locale} height={500} />
        </div>
      </section>

      {/* Keyword chips, internal-link cluster targeting long-tail island queries */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center mb-5">
            {c.keywordChipsTitle}
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {c.keywordChips.map((kw, i) => {
              const island = islands[i]
              if (!island) return null
              // Link each chip to the closest existing destination if any, otherwise to the destinations index
              const href = island.dest
                ? `/${locale}/destinations/${island.dest.slug}`
                : `/${locale}/destinations`
              return (
                <Link
                  key={kw}
                  href={href}
                  className="text-sm text-blue-700 hover:text-blue-900 hover:underline bg-white border border-gray-200 rounded-full px-4 py-1.5 transition-colors hover:border-blue-300"
                >
                  {kw}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5">{c.conclusion.title}</h2>
          <div className="space-y-4">
            {c.conclusion.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
          </div>
        </div>
      </article>

      {/* Intro + Methodology (at the bottom, context for the curious) */}
      <article className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <section>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5">{c.intro.title}</h2>
            <div className="space-y-4">
              {c.intro.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
            </div>
          </section>
          <section>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5">{c.methodology.title}</h2>
            <div className="space-y-4">
              {c.methodology.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
            </div>
          </section>
        </div>
      </article>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">❓ {c.faqTitle}</h2>
          <div className="space-y-4">
            {c.faqs.map((f, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-2xl group">
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
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">{c.ctaTitle}</h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">{c.ctaDesc}</p>
          <Link href={`/${locale}/destinations`} className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-colors shadow-lg">
            {c.ctaButton}
          </Link>
        </div>
      </section>

      <GuideFooter locale={locale} currentSlug={SLUG} />
    </div>
  )
}
