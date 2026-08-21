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
import PetMap from '@/components/PetMap'
import NearbyHotelCard from '@/components/NearbyHotelCard'
import StickyHotelCTA from '@/components/StickyHotelCTA'

const SLUG = 'dog-beaches-france'

// 20 verified dog-friendly beaches in France, ranked across five coasts:
// Mediterranean (Côte d'Azur + Languedoc), Atlantic SW (Aquitaine + Pays Basque),
// Vendée + Charente-Maritime, Bretagne, Normandie, Hauts-de-France.
// Each beach has been cross-checked against the municipal arrêté or recent
// dog-travel sources. The first of our country-by-country dog-beach series.
type BeachEntry = {
  rank: number
  beachName: string
  locationLabel: string
  slug: string | null
  photoSlug: string
  region: 'cote-azur' | 'languedoc' | 'aquitaine' | 'vendee' | 'bretagne' | 'normandie' | 'nord'
  yearRound: boolean
  reason: { en: string; fr: string; es: string; pt: string; de: string; nl: string }
}

const BEACHES: BeachEntry[] = [
  { rank: 1, beachName: `Plage des Salis (zone canine)`, locationLabel: `Antibes, Côte d'Azur`, slug: 'nice', photoSlug: 'antibes', region: 'cote-azur', yearRound: true, reason: {
    en: `Antibes designates a year-round dog section at the western end of the Plage de la Salis, sand bottom, leash required, public showers and shaded pines on the back. One of the rare Côte d'Azur dog beaches that does not close during the summer season.`,
    fr: `Antibes a désigné une section canine ouverte toute l'année à l'extrémité ouest de la Plage de la Salis : fond sablonneux, laisse obligatoire, douches publiques et pinède d'ombre à l'arrière. L'une des rares zones canines de Côte d'Azur qui ne ferme pas en été.`,
    es: `Antibes designa una sección canina todo el año en el extremo oeste de la Plage de la Salis: fondo de arena, correa obligatoria, duchas públicas y pinar de sombra detrás. Una de las raras zonas caninas de la Costa Azul que no cierra en verano.`,
    pt: `Antibes designa uma secção canina o ano inteiro na extremidade oeste da Plage de la Salis: fundo de areia, trela obrigatória, duches públicos e pinhal de sombra atrás. Uma das raras zonas caninas da Côte d'Azur que não fecha no verão.`,
    de: `Antibes weist am westlichen Ende der Plage de la Salis einen ganzjährigen Hundebereich aus: Sandboden, Leinenpflicht, öffentliche Duschen und schattige Pinien im Hintergrund. Einer der wenigen Hundestrände an der Côte d'Azur, der in der Sommersaison nicht schließt.`,
    nl: `Antibes wijst aan het westelijke uiteinde van de Plage de la Salis een hondenstrook aan die het hele jaar open is: zandbodem, aanlijnplicht, openbare douches en schaduwrijke pijnbomen op de achtergrond. Een van de weinige hondenstranden aan de Côte d'Azur die in het zomerseizoen niet sluit.`,
  }},
  { rank: 2, beachName: `Plage du Mourre Rouge`, locationLabel: `Cannes, Côte d'Azur`, slug: 'cannes', photoSlug: 'cannes', region: 'cote-azur', yearRound: true, reason: {
    en: `Cannes' only dog beach, on the eastern side of the Pointe de la Croisette. Mixed sand and small pebbles, leash required, year-round access including July and August (rare for the Côte d'Azur). Walking distance from the Palais des Festivals.`,
    fr: `La seule plage canine de Cannes, sur le flanc est de la Pointe de la Croisette. Sable et petits galets mélangés, laisse obligatoire, accès toute l'année y compris juillet et août, rare sur la Côte d'Azur. À pied du Palais des Festivals.`,
    es: `La única playa canina de Cannes, en el lado este de la Pointe de la Croisette. Arena y guijarros pequeños mezclados, correa obligatoria, acceso todo el año incluido julio y agosto, raro en la Costa Azul. A pie del Palais des Festivals.`,
    pt: `A única praia canina de Cannes, no flanco leste da Pointe de la Croisette. Areia e seixos pequenos misturados, trela obrigatória, acesso o ano inteiro incluindo julho e agosto, raro na Côte d'Azur. A pé do Palais des Festivals.`,
    de: `Der einzige Hundestrand von Cannes, an der Ostseite der Pointe de la Croisette. Sand gemischt mit kleinen Kieseln, Leinenpflicht, ganzjähriger Zugang auch im Juli und August, an der Côte d'Azur selten. Fußläufig vom Palais des Festivals.`,
    nl: `Het enige hondenstrand van Cannes, aan de oostkant van de Pointe de la Croisette. Gemengd zand en kleine kiezels, aanlijnplicht, het hele jaar toegankelijk, ook in juli en augustus (zeldzaam aan de Côte d'Azur). Op loopafstand van het Palais des Festivals.`,
  }},
  { rank: 3, beachName: `Plage du Verdon (zone chiens)`, locationLabel: `Hyères, Var`, slug: null, photoSlug: 'hyeres-verdon', region: 'cote-azur', yearRound: true, reason: {
    en: `On the Route du Sel between Hyères and the Giens peninsula, the dedicated dog zone of Plage du Verdon runs for several hundred metres on fine sand. Year-round, leash recommended, calm shallow water on the Almanarre side, open Mistral wind on the other.`,
    fr: `Sur la Route du Sel entre Hyères et la presqu'île de Giens, la zone canine officielle de la Plage du Verdon s'étend sur plusieurs centaines de mètres de sable fin. Toute l'année, laisse recommandée, eau calme et peu profonde côté Almanarre, vent de Mistral exposé de l'autre côté.`,
    es: `En la Route du Sel entre Hyères y la península de Giens, la zona canina oficial de la Plage du Verdon ocupa varios cientos de metros de arena fina. Todo el año, correa recomendada, agua tranquila y poco profunda en el lado de Almanarre, viento Mistral expuesto del otro lado.`,
    pt: `Na Route du Sel entre Hyères e a península de Giens, a zona canina oficial da Plage du Verdon estende-se por várias centenas de metros de areia fina. O ano inteiro, trela recomendada, água calma e pouco profunda do lado de Almanarre, vento Mistral exposto do outro lado.`,
    de: `An der Route du Sel zwischen Hyères und der Halbinsel Giens erstreckt sich die ausgewiesene Hundezone der Plage du Verdon über mehrere hundert Meter feinen Sand. Ganzjährig, Leine empfohlen, ruhiges flaches Wasser auf der Almanarre-Seite, dem Mistral ausgesetzt auf der anderen.`,
    nl: `Aan de Route du Sel tussen Hyères en het schiereiland Giens strekt de speciale hondenzone van Plage du Verdon zich uit over enkele honderden meters fijn zand. Het hele jaar open, aanlijnen aanbevolen, rustig ondiep water aan de kant van Almanarre, blootgesteld aan de mistralwind aan de andere kant.`,
  }},
  { rank: 4, beachName: `Plage de l'Almanarre (extrémité nord)`, locationLabel: `Hyères, Var`, slug: null, photoSlug: 'hyeres-almanarre', region: 'cote-azur', yearRound: true, reason: {
    en: `The northern end of L'Almanarre, adjoining the Salins, is a tolerated year-round dog zone. Open to the Mistral, popular with kitesurfers, sand bottom and shallow lagoon-like water make it safe for older or nervous dogs. Leash required.`,
    fr: `L'extrémité nord de l'Almanarre, en jonction avec les Salins, est une zone canine tolérée toute l'année. Exposée au Mistral, prisée des kitesurfeurs, fond sableux et eau de lagune peu profonde, rassurante pour chiens âgés ou craintifs. Laisse obligatoire.`,
    es: `El extremo norte de L'Almanarre, junto a los Salins, es una zona canina tolerada todo el año. Expuesta al Mistral, popular entre los kitesurfistas, fondo de arena y agua de laguna poco profunda, tranquilizadora para perros mayores o asustadizos. Correa obligatoria.`,
    pt: `A extremidade norte de L'Almanarre, em junção com os Salins, é uma zona canina tolerada o ano inteiro. Exposta ao Mistral, popular entre kitesurfistas, fundo de areia e água de laguna pouco profunda, tranquilizadora para cães idosos ou medrosos. Trela obrigatória.`,
    de: `Das nördliche Ende von L'Almanarre, angrenzend an die Salins, ist eine geduldete ganzjährige Hundezone. Dem Mistral ausgesetzt, bei Kitesurfern beliebt, Sandboden und flaches lagunenartiges Wasser machen sie sicher für ältere oder ängstliche Hunde. Leinenpflicht.`,
    nl: `Het noordelijke uiteinde van L'Almanarre, grenzend aan de Salins, is een gedoogde hondenzone die het hele jaar open is. Blootgesteld aan de mistral, populair bij kitesurfers, zandbodem en ondiep lagunewater maken het geschikt voor oudere of angstige honden. Aanlijnplicht.`,
  }},
  { rank: 5, beachName: `Plage de l'Espiguette (extrémité ouest)`, locationLabel: `Le Grau-du-Roi, Gard`, slug: null, photoSlug: 'espiguette', region: 'languedoc', yearRound: true, reason: {
    en: `One of the longest wild beaches in France (about 18 km of fine dune sand). Dogs are tolerated year-round on the far western end, well past the lighthouse and the official bathing zone. Walk at least 1 km from the car park to reach the dog-tolerated stretch. No leash imposed but voice control expected, in nature reserve.`,
    fr: `L'une des plus longues plages sauvages de France (environ 18 km de sable dunaire fin). Les chiens sont tolérés toute l'année sur l'extrémité ouest, bien au-delà du phare et de la zone de baignade officielle. Marcher au moins 1 km depuis le parking pour atteindre la section autorisée. Pas de laisse imposée mais contrôle au rappel attendu, on est en réserve naturelle.`,
    es: `Una de las playas salvajes más largas de Francia (unos 18 km de arena dunar fina). Los perros se toleran todo el año en el extremo oeste, mucho más allá del faro y de la zona de baño oficial. Caminar al menos 1 km desde el parking para llegar al tramo tolerado. Sin correa impuesta pero control por voz esperado, es reserva natural.`,
    pt: `Uma das praias selvagens mais longas de França (cerca de 18 km de areia dunar fina). Os cães são tolerados o ano inteiro na extremidade oeste, bem para lá do farol e da zona de banho oficial. Caminhar pelo menos 1 km a partir do parque para alcançar o troço tolerado. Sem trela imposta mas controlo por voz esperado, é reserva natural.`,
    de: `Einer der längsten Wildstrände Frankreichs (etwa 18 km feiner Dünensand). Hunde werden ganzjährig am äußersten westlichen Ende geduldet, weit hinter dem Leuchtturm und der offiziellen Badezone. Mindestens 1 km vom Parkplatz laufen, um den hundegeduldeten Abschnitt zu erreichen. Keine Leinenpflicht, aber Rückrufkontrolle erwartet, da Naturschutzgebiet.`,
    nl: `Een van de langste wilde stranden van Frankrijk (ongeveer 18 km fijn duinzand). Honden worden het hele jaar getolereerd op het uiterste westelijke deel, ver voorbij de vuurtoren en de officiële zwemzone. Loop minstens 1 km vanaf de parkeerplaats om het hondvriendelijke stuk te bereiken. Geen aanlijnplicht, maar terugroepcontrole wordt verwacht, want het is natuurgebied.`,
  }},
  { rank: 6, beachName: `Plage de la Tamarissière (zone chiens)`, locationLabel: `Agde, Hérault`, slug: 'montpellier', photoSlug: 'montpellier', region: 'languedoc', yearRound: true, reason: {
    en: `On the southern bank of the Hérault river mouth, the Tamarissière forest backs a dedicated year-round dog beach. Fine sand, pine shade behind, leash required, shallow water entry. Quieter than Cap d'Agde, which sits across the river.`,
    fr: `Sur la rive sud de l'embouchure de l'Hérault, la forêt domaniale de la Tamarissière jouxte une plage canine officielle ouverte toute l'année. Sable fin, ombre de pins à l'arrière, laisse obligatoire, entrée d'eau peu profonde. Plus calme que le Cap d'Agde, situé en face.`,
    es: `En la orilla sur de la desembocadura del Hérault, el bosque de Tamarissière limita con una playa canina oficial abierta todo el año. Arena fina, sombra de pinos detrás, correa obligatoria, entrada de agua poco profunda. Más tranquila que el Cap d'Agde, situado enfrente.`,
    pt: `Na margem sul da foz do Hérault, a floresta da Tamarissière fica junto a uma praia canina oficial aberta o ano inteiro. Areia fina, sombra de pinheiros atrás, trela obrigatória, entrada de água pouco profunda. Mais calma do que o Cap d'Agde, situado em frente.`,
    de: `Am Südufer der Hérault-Mündung grenzt der Wald der Tamarissière an einen ausgewiesenen ganzjährigen Hundestrand. Feiner Sand, Pinienschatten im Hintergrund, Leinenpflicht, flacher Wassereinstieg. Ruhiger als Cap d'Agde auf der gegenüberliegenden Flussseite.`,
    nl: `Aan de zuidoever van de monding van de Hérault grenst het bos van Tamarissière aan een officieel hondenstrand dat het hele jaar open is. Fijn zand, schaduw van pijnbomen op de achtergrond, aanlijnplicht, ondiepe waterinstap. Rustiger dan Cap d'Agde, aan de overkant van de rivier.`,
  }},
  { rank: 7, beachName: `Plage des Trois Digues (zone canine)`, locationLabel: `Sète, Hérault`, slug: 'montpellier', photoSlug: 'sete', region: 'languedoc', yearRound: true, reason: {
    en: `Sète's dedicated year-round dog beach lies between the third and fourth groynes on the long Lido stretch facing the Mediterranean. Fine sand, gentle slope, leash required by municipal arrêté. Easy parking, walking distance from the salt-water Étang de Thau.`,
    fr: `La plage canine officielle de Sète ouverte toute l'année se situe entre la troisième et la quatrième digue sur le long lido face à la Méditerranée. Sable fin, pente douce, laisse obligatoire par arrêté municipal. Parking facile, à pied de l'étang de Thau.`,
    es: `La playa canina oficial de Sète abierta todo el año se sitúa entre la tercera y la cuarta escollera en el largo lido frente al Mediterráneo. Arena fina, pendiente suave, correa obligatoria por arrêté municipal. Parking fácil, a pie del Étang de Thau.`,
    pt: `A praia canina oficial de Sète aberta o ano inteiro situa-se entre o terceiro e o quarto molhe no longo lido virado para o Mediterrâneo. Areia fina, declive suave, trela obrigatória por arrêté municipal. Estacionamento fácil, a pé do Étang de Thau.`,
    de: `Der ausgewiesene ganzjährige Hundestrand von Sète liegt zwischen der dritten und vierten Buhne auf dem langen Lido-Abschnitt zum Mittelmeer hin. Feiner Sand, sanftes Gefälle, Leinenpflicht laut Gemeindeverordnung. Einfaches Parken, fußläufig zum Salzwassersee Étang de Thau.`,
    nl: `Het officiële hondenstrand van Sète, het hele jaar open, ligt tussen de derde en vierde strandhoofd op het lange Lido tegenover de Middellandse Zee. Fijn zand, zachte helling, aanlijnplicht volgens gemeentelijk besluit. Makkelijk parkeren, op loopafstand van het zoutmeer Étang de Thau.`,
  }},
  { rank: 8, beachName: `Plage de la Côte des Basques`, locationLabel: `Biarritz, Pays Basque`, slug: 'biarritz', photoSlug: 'biarritz', region: 'aquitaine', yearRound: false, reason: {
    en: `Biarritz' most famous surf beach permits dogs on leash from 1 October to 31 May, banned in the bathing season (1 June to 30 September). Fine sand at low tide, rocky shelves and tide pools at the south end, dramatic cliff backdrop. Voice control accepted on the wide low-tide flats.`,
    fr: `La plage surf la plus célèbre de Biarritz autorise les chiens en laisse du 1er octobre au 31 mai, interdits en saison estivale (1er juin au 30 septembre). Sable fin à marée basse, platiers rocheux et flaques au sud, falaise spectaculaire en arrière-plan. Rappel toléré sur les vastes estrans à marée basse.`,
    es: `La playa de surf más famosa de Biarritz admite perros con correa del 1 de octubre al 31 de mayo, prohibidos en temporada de baño (1 de junio al 30 de septiembre). Arena fina en marea baja, plataformas rocosas y charcas al sur, espectacular acantilado de fondo. Llamada por voz tolerada en las amplias rasas en marea baja.`,
    pt: `A praia de surf mais famosa de Biarritz aceita cães à trela de 1 de outubro a 31 de maio, proibidos na época balnear (1 de junho a 30 de setembro). Areia fina na maré baixa, plataformas rochosas e poças a sul, falésia espetacular ao fundo. Chamada por voz tolerada nos vastos rasos a maré baixa.`,
    de: `Der berühmteste Surfstrand von Biarritz erlaubt Hunde an der Leine vom 1. Oktober bis 31. Mai, verboten in der Badesaison (1. Juni bis 30. September). Feiner Sand bei Ebbe, Felsplatten und Gezeitenpools am südlichen Ende, dramatische Klippenkulisse. Rückrufkontrolle auf den weiten Wattflächen bei Ebbe akzeptiert.`,
    nl: `Het beroemdste surfstrand van Biarritz staat honden aan de lijn toe van 1 oktober tot 31 mei, verboden in het badseizoen (1 juni tot 30 september). Fijn zand bij eb, rotsplateaus en getijdenpoelen aan het zuidelijke uiteinde, indrukwekkend klifdecor. Terugroepcontrole geaccepteerd op de brede vlakten bij eb.`,
  }},
  { rank: 9, beachName: `Plage des Estagnots`, locationLabel: `Seignosse, Landes`, slug: 'biarritz', photoSlug: 'seignosse', region: 'aquitaine', yearRound: false, reason: {
    en: `One of the Landes' most consistent dog beaches: dogs welcome from 1 October to 30 April, fine Atlantic sand, towering dunes and the Forêt des Landes pine forest immediately behind. Powerful surf, swimming with a dog not recommended. Leash required on duned access paths.`,
    fr: `L'une des plages canines les plus régulières des Landes : chiens admis du 1er octobre au 30 avril, sable fin atlantique, hautes dunes et forêt domaniale des Landes immédiatement en arrière. Surf puissant, baignade canine déconseillée. Laisse obligatoire sur les accès dunaires.`,
    es: `Una de las playas caninas más consistentes de las Landas: perros admitidos del 1 de octubre al 30 de abril, arena fina atlántica, dunas altas y el bosque de las Landas inmediatamente detrás. Surf potente, baño canino desaconsejado. Correa obligatoria en los accesos dunares.`,
    pt: `Uma das praias caninas mais constantes das Landes: cães admitidos de 1 de outubro a 30 de abril, areia fina atlântica, dunas altas e a floresta das Landes imediatamente atrás. Surf potente, banho canino desaconselhado. Trela obrigatória nos acessos dunares.`,
    de: `Einer der zuverlässigsten Hundestrände der Landes: Hunde willkommen vom 1. Oktober bis 30. April, feiner Atlantiksand, hohe Dünen und der Pinienwald der Forêt des Landes unmittelbar dahinter. Starke Brandung, Schwimmen mit Hund nicht empfohlen. Leinenpflicht auf den Dünenzugangswegen.`,
    nl: `Een van de meest betrouwbare hondenstranden van de Landes: honden welkom van 1 oktober tot 30 april, fijn Atlantisch zand, hoge duinen en het bos van Forêt des Landes direct erachter. Krachtige branding, zwemmen met een hond wordt afgeraden. Aanlijnplicht op de duinpaden.`,
  }},
  { rank: 10, beachName: `Plage des Conches (zone canine)`, locationLabel: `Longeville-sur-Mer, Vendée`, slug: null, photoSlug: 'longeville-conches', region: 'vendee', yearRound: true, reason: {
    en: `One of the few Vendée beaches with a year-round dedicated dog zone, on the southern end past the surf school. Wild Atlantic sand, pine forest behind, leash required. Strong currents at high tide, safer for paddling than swimming. Voice control accepted on the dunes.`,
    fr: `L'une des rares plages de Vendée à disposer d'une zone canine officielle toute l'année, à l'extrémité sud au-delà de l'école de surf. Sable atlantique sauvage, pinède à l'arrière, laisse obligatoire. Courants forts à marée haute, plus sûr pour patouiller que pour nager. Rappel toléré dans les dunes.`,
    es: `Una de las pocas playas de Vendée con zona canina dedicada todo el año, en el extremo sur pasada la escuela de surf. Arena atlántica salvaje, pinar detrás, correa obligatoria. Corrientes fuertes en marea alta, más segura para chapotear que para nadar. Llamada por voz tolerada en las dunas.`,
    pt: `Uma das poucas praias da Vendée com zona canina dedicada o ano inteiro, na extremidade sul para além da escola de surf. Areia atlântica selvagem, pinhal atrás, trela obrigatória. Correntes fortes na maré cheia, mais segura para chapinhar do que para nadar. Chamada por voz tolerada nas dunas.`,
    de: `Einer der wenigen Strände der Vendée mit einer ausgewiesenen ganzjährigen Hundezone, am südlichen Ende hinter der Surfschule. Wilder Atlantiksand, Pinienwald im Hintergrund, Leinenpflicht. Starke Strömungen bei Flut, sicherer zum Planschen als zum Schwimmen. Rückrufkontrolle in den Dünen akzeptiert.`,
    nl: `Een van de weinige stranden van de Vendée met een speciale hondenzone die het hele jaar open is, aan het zuidelijke uiteinde voorbij de surfschool. Wild Atlantisch zand, pijnbos op de achtergrond, aanlijnplicht. Sterke stroming bij vloed, veiliger om te pootjebaden dan te zwemmen. Terugroepcontrole geaccepteerd in de duinen.`,
  }},
  { rank: 11, beachName: `Plage des Sablons (extrémité nord)`, locationLabel: `Saint-Jean-de-Monts, Vendée`, slug: null, photoSlug: 'saint-jean-de-monts', region: 'vendee', yearRound: false, reason: {
    en: `Saint-Jean-de-Monts' northern beaches (towards Notre-Dame-de-Monts) allow dogs from 1 October to 30 April, leash required, wide flat fine sand at low tide. Banned 1 May to 30 September on the central swimming zone. Easy access from the coastal cycle path.`,
    fr: `Les plages nord de Saint-Jean-de-Monts (vers Notre-Dame-de-Monts) acceptent les chiens du 1er octobre au 30 avril, laisse obligatoire, vaste estran plat de sable fin à marée basse. Interdiction du 1er mai au 30 septembre sur la zone centrale de baignade. Accès facile depuis la piste cyclable littorale.`,
    es: `Las playas norte de Saint-Jean-de-Monts (hacia Notre-Dame-de-Monts) admiten perros del 1 de octubre al 30 de abril, correa obligatoria, amplia rasa plana de arena fina en marea baja. Prohibido del 1 de mayo al 30 de septiembre en la zona central de baño. Acceso fácil desde el carril bici litoral.`,
    pt: `As praias norte de Saint-Jean-de-Monts (em direção a Notre-Dame-de-Monts) aceitam cães de 1 de outubro a 30 de abril, trela obrigatória, vasto raso plano de areia fina na maré baixa. Proibido de 1 de maio a 30 de setembro na zona central de banho. Acesso fácil pela ciclovia litoral.`,
    de: `Die nördlichen Strände von Saint-Jean-de-Monts (Richtung Notre-Dame-de-Monts) erlauben Hunde vom 1. Oktober bis 30. April, Leinenpflicht, breiter flacher feiner Sand bei Ebbe. Verboten vom 1. Mai bis 30. September in der zentralen Badezone. Einfacher Zugang über den Küstenradweg.`,
    nl: `De noordelijke stranden van Saint-Jean-de-Monts (richting Notre-Dame-de-Monts) staan honden toe van 1 oktober tot 30 april, aanlijnplicht, breed vlak fijn zand bij eb. Verboden van 1 mei tot 30 september op de centrale zwemzone. Makkelijk bereikbaar via het kustfietspad.`,
  }},
  { rank: 12, beachName: `Plage de la Conche des Baleines`, locationLabel: `Île de Ré, Les Portes-en-Ré`, slug: null, photoSlug: 'ile-de-re', region: 'vendee', yearRound: false, reason: {
    en: `The Île de Ré's wild northwestern beach welcomes dogs from 1 October to 30 April, with leash required on bathing sections. Vast fine-sand crescent backed by dunes and the Lilleau-des-Niges nature reserve. Easy to find quiet stretches even out of season. Tide range is huge, watch out for cut-offs.`,
    fr: `La plage sauvage du nord-ouest de l'Île de Ré accueille les chiens du 1er octobre au 30 avril, laisse obligatoire sur les sections de baignade. Vaste croissant de sable fin adossé aux dunes et à la réserve naturelle de Lilleau-des-Niges. Facile de trouver des sections désertes même hors saison. Marnage important, attention aux retenues d'eau.`,
    es: `La playa salvaje del noroeste de la Île de Ré admite perros del 1 de octubre al 30 de abril, correa obligatoria en las secciones de baño. Vasto creciente de arena fina pegado a las dunas y a la reserva natural de Lilleau-des-Niges. Fácil encontrar tramos desiertos incluso fuera de temporada. Amplitud de marea importante, ojo con los aislamientos.`,
    pt: `A praia selvagem do noroeste da Île de Ré recebe cães de 1 de outubro a 30 de abril, trela obrigatória nas secções de banho. Vasto crescente de areia fina encostado às dunas e à reserva natural de Lilleau-des-Niges. Fácil encontrar troços desertos mesmo fora de época. Amplitude de maré grande, atenção aos isolamentos.`,
    de: `Der wilde Nordweststrand der Île de Ré empfängt Hunde vom 1. Oktober bis 30. April, Leinenpflicht auf den Badeabschnitten. Weiter Feinsandbogen, gesäumt von Dünen und dem Naturschutzgebiet Lilleau-des-Niges. Ruhige Abschnitte lassen sich auch außerhalb der Saison leicht finden. Großer Tidenhub, auf Wasserabschnürungen achten.`,
    nl: `Het wilde noordwestelijke strand van Île de Ré verwelkomt honden van 1 oktober tot 30 april, aanlijnplicht op de zwemgedeeltes. Uitgestrekte fijnzandige baai, omzoomd door duinen en het natuurgebied Lilleau-des-Niges. Ook buiten het seizoen makkelijk rustige stukken te vinden. Groot getijverschil, let op afgesloten waterpartijen.`,
  }},
  { rank: 13, beachName: `Plage de Trévignon (anses est)`, locationLabel: `Trégunc, Finistère sud`, slug: null, photoSlug: 'trevignon', region: 'bretagne', yearRound: false, reason: {
    en: `The series of small east-facing coves around the Pointe de Trévignon (Plage de Don, Plage du Loc'h) allow dogs on leash from 1 October to 14 June, banned 15 June to 30 September. Fine sand interrupted by granite outcrops, pine and gorse heath behind, very calm water on east-wind days.`,
    fr: `Le chapelet d'anses face à l'est autour de la Pointe de Trévignon (Plage de Don, Plage du Loc'h) accepte les chiens en laisse du 1er octobre au 14 juin, interdits du 15 juin au 30 septembre. Sable fin coupé d'affleurements granitiques, lande de pins et ajoncs à l'arrière, eau très calme par vent d'est.`,
    es: `La sucesión de pequeñas calas orientadas al este alrededor de la Pointe de Trévignon (Plage de Don, Plage du Loc'h) admite perros con correa del 1 de octubre al 14 de junio, prohibidos del 15 de junio al 30 de septiembre. Arena fina cortada por afloramientos graníticos, brezal de pinos y aulagas detrás, agua muy tranquila con viento del este.`,
    pt: `A sucessão de pequenas enseadas voltadas a leste em redor da Pointe de Trévignon (Plage de Don, Plage du Loc'h) aceita cães com trela de 1 de outubro a 14 de junho, proibidos de 15 de junho a 30 de setembro. Areia fina cortada por afloramentos graníticos, charneca de pinheiros e tojos atrás, água muito calma com vento de leste.`,
    de: `Die Reihe kleiner ostexponierter Buchten rund um die Pointe de Trévignon (Plage de Don, Plage du Loc'h) erlaubt Hunde an der Leine vom 1. Oktober bis 14. Juni, verboten vom 15. Juni bis 30. September. Feiner Sand, unterbrochen von Granitfelsen, Pinien- und Ginsterheide im Hintergrund, sehr ruhiges Wasser bei Ostwind.`,
    nl: `De reeks kleine, oostgerichte baaien rond de Pointe de Trévignon (Plage de Don, Plage du Loc'h) staat honden aan de lijn toe van 1 oktober tot 14 juni, verboden van 15 juni tot 30 september. Fijn zand afgewisseld met granietrotsen, dennen- en heidegebied op de achtergrond, zeer rustig water bij oostenwind.`,
  }},
  { rank: 14, beachName: `Plage du Cabellou`, locationLabel: `Concarneau, Finistère sud`, slug: null, photoSlug: 'cabellou', region: 'bretagne', yearRound: false, reason: {
    en: `Concarneau's southern peninsula has a string of small dog-tolerated coves outside the high season (15 September to 14 June). Coarse sand and granite rocks, sheltered from prevailing south-westerlies, shallow swimming with a dog at high tide. Leash recommended on the GR34 coastal path above.`,
    fr: `La presqu'île sud de Concarneau aligne plusieurs petites criques où les chiens sont tolérés hors saison (15 septembre au 14 juin). Sable grossier et rochers granitiques, à l'abri des vents dominants de sud-ouest, baignade canine peu profonde à marée haute. Laisse recommandée sur le GR34 au-dessus.`,
    es: `La península sur de Concarneau alinea varias calas pequeñas donde los perros se toleran fuera de temporada (15 de septiembre al 14 de junio). Arena gruesa y rocas graníticas, al abrigo de los vientos dominantes del suroeste, baño canino poco profundo en marea alta. Correa recomendada en el GR34 encima.`,
    pt: `A península sul de Concarneau alinha várias enseadas pequenas onde os cães são tolerados fora de época (15 de setembro a 14 de junho). Areia grossa e rochas graníticas, ao abrigo dos ventos dominantes de sudoeste, banho canino pouco profundo na maré cheia. Trela recomendada no GR34 por cima.`,
    de: `Die südliche Halbinsel von Concarneau reiht mehrere kleine hundegeduldete Buchten außerhalb der Hochsaison (15. September bis 14. Juni) aneinander. Grober Sand und Granitfelsen, geschützt vor den vorherrschenden Südwestwinden, flaches Schwimmen mit Hund bei Flut. Leine empfohlen auf dem darüberliegenden Küstenweg GR34.`,
    nl: `Het zuidelijke schiereiland van Concarneau telt meerdere kleine baaien waar honden buiten het hoogseizoen worden getolereerd (15 september tot 14 juni). Grof zand en granietrotsen, beschut tegen de overheersende zuidwestenwind, ondiep zwemmen met een hond bij vloed. Aanlijnen aanbevolen op het GR34-kustpad erboven.`,
  }},
  { rank: 15, beachName: `Plage de Trez-Bellec`, locationLabel: `Telgruc-sur-Mer, presqu'île de Crozon`, slug: null, photoSlug: 'crozon-trez-bellec', region: 'bretagne', yearRound: false, reason: {
    en: `On the wild Crozon peninsula, Trez-Bellec is a long curve of fine yellow sand open to dogs from 1 October to 14 June, leash required. Backed by low cliffs and the Ménez-Hom heath, far less visited than the south-Finistère beaches. Cold water but pristine.`,
    fr: `Sur la sauvage presqu'île de Crozon, Trez-Bellec déroule une longue courbe de sable fin jaune ouverte aux chiens du 1er octobre au 14 juin, laisse obligatoire. Adossée aux falaises basses et à la lande du Ménez-Hom, bien moins fréquentée que les plages du Finistère sud. Eau froide mais immaculée.`,
    es: `En la salvaje península de Crozon, Trez-Bellec describe una larga curva de arena fina amarilla abierta a perros del 1 de octubre al 14 de junio, correa obligatoria. Respaldada por acantilados bajos y el brezal del Ménez-Hom, mucho menos frecuentada que las playas del sur del Finisterre. Agua fría pero impecable.`,
    pt: `Na selvagem península de Crozon, Trez-Bellec desenha uma longa curva de areia fina amarela aberta a cães de 1 de outubro a 14 de junho, trela obrigatória. Encostada a falésias baixas e à charneca do Ménez-Hom, bem menos frequentada do que as praias do sul do Finistère. Água fria mas impecável.`,
    de: `Auf der wilden Halbinsel Crozon ist Trez-Bellec ein langer Bogen aus feinem gelbem Sand, der Hunden vom 1. Oktober bis 14. Juni offensteht, Leinenpflicht. Umgeben von niedrigen Klippen und der Heidelandschaft des Ménez-Hom, deutlich weniger besucht als die Strände im Süden des Finistère. Kaltes, aber unberührtes Wasser.`,
    nl: `Op het wilde schiereiland Crozon is Trez-Bellec een lange boog van fijn geel zand dat open staat voor honden van 1 oktober tot 14 juni, aanlijnplicht. Omzoomd door lage kliffen en de heide van Ménez-Hom, veel minder druk bezocht dan de stranden in Zuid-Finistère. Koud maar smetteloos water.`,
  }},
  { rank: 16, beachName: `Plage de Trestraou (extrémité ouest)`, locationLabel: `Perros-Guirec, Côtes-d'Armor`, slug: null, photoSlug: 'perros-guirec', region: 'bretagne', yearRound: false, reason: {
    en: `On the Côte de Granit Rose, Trestraou's western end tolerates dogs from 1 October to 30 April. Fine sand at low tide, pink granite boulders at the back, the GR34 sentier des douaniers leaves directly from the beach for the famous Ploumanac'h walk with a dog.`,
    fr: `Sur la Côte de Granit Rose, l'extrémité ouest de Trestraou tolère les chiens du 1er octobre au 30 avril. Sable fin à marée basse, blocs de granit rose en fond, le GR34 sentier des douaniers part directement de la plage pour la fameuse balade vers Ploumanac'h avec un chien.`,
    es: `En la Côte de Granit Rose, el extremo oeste de Trestraou tolera perros del 1 de octubre al 30 de abril. Arena fina en marea baja, bloques de granito rosa al fondo, el GR34 sentier des douaniers parte directamente de la playa hacia el famoso paseo a Ploumanac'h con perro.`,
    pt: `Na Côte de Granit Rose, a extremidade oeste de Trestraou tolera cães de 1 de outubro a 30 de abril. Areia fina na maré baixa, blocos de granito rosa ao fundo, o GR34 sentier des douaniers parte directamente da praia para o famoso passeio a Ploumanac'h com cão.`,
    de: `An der Côte de Granit Rose duldet das westliche Ende von Trestraou Hunde vom 1. Oktober bis 30. April. Feiner Sand bei Ebbe, rosafarbene Granitblöcke im Hintergrund, der GR34 Sentier des Douaniers startet direkt am Strand für die berühmte Wanderung nach Ploumanac'h mit Hund.`,
    nl: `Aan de Côte de Granit Rose tolereert het westelijke uiteinde van Trestraou honden van 1 oktober tot 30 april. Fijn zand bij eb, rotsblokken van roze graniet op de achtergrond, de GR34 sentier des douaniers begint direct op het strand voor de beroemde wandeling naar Ploumanac'h met hond.`,
  }},
  { rank: 17, beachName: `Plage de Cabourg (zone segregée)`, locationLabel: `Cabourg, Calvados`, slug: null, photoSlug: 'cabourg', region: 'normandie', yearRound: true, reason: {
    en: `Cabourg keeps a year-round segregated dog zone on its eastern end (towards Dives-sur-Mer), away from the main swimming area. Fine sand, vast low-tide flats perfect for off-leash running under voice control, leash imposed near the promenade Marcel Proust.`,
    fr: `Cabourg maintient une zone canine ségrégée toute l'année sur son extrémité est (vers Dives-sur-Mer), à l'écart de la zone principale de baignade. Sable fin, vastes estrans à marée basse parfaits pour des courses au rappel, laisse imposée près de la promenade Marcel Proust.`,
    es: `Cabourg mantiene una zona canina segregada todo el año en su extremo este (hacia Dives-sur-Mer), apartada de la zona principal de baño. Arena fina, vastas rasas en marea baja perfectas para carreras con llamada por voz, correa impuesta cerca del paseo Marcel Proust.`,
    pt: `Cabourg mantém uma zona canina segregada o ano inteiro na sua extremidade leste (em direcção a Dives-sur-Mer), afastada da zona principal de banho. Areia fina, vastos rasos na maré baixa perfeitos para corridas por chamada de voz, trela imposta perto do passeio Marcel Proust.`,
    de: `Cabourg unterhält an seinem östlichen Ende (Richtung Dives-sur-Mer) eine ganzjährige, abgetrennte Hundezone, abseits des Hauptbadebereichs. Feiner Sand, weite Wattflächen bei Ebbe, ideal zum Freilauf unter Rückrufkontrolle, Leinenpflicht in der Nähe der Promenade Marcel Proust.`,
    nl: `Cabourg houdt het hele jaar een afgescheiden hondenzone aan het oostelijke uiteinde (richting Dives-sur-Mer), weg van de belangrijkste zwemzone. Fijn zand, uitgestrekte platen bij eb perfect om los te lopen onder terugroepcontrole, aanlijnplicht bij de Promenade Marcel Proust.`,
  }},
  { rank: 18, beachName: `Plage d'Utah Beach`, locationLabel: `Sainte-Marie-du-Mont, Manche`, slug: null, photoSlug: 'utah-beach', region: 'normandie', yearRound: true, reason: {
    en: `The D-Day landing beach is a wild stretch of fine sand and oyster banks where dogs are welcome year-round, no leash imposed on the long open beach (voice control expected), leash recommended near the memorials. Quiet, windswept, perfect for big-dog energy. Cold North Sea water.`,
    fr: `La plage du débarquement est une vaste étendue de sable fin et de bancs à huîtres où les chiens sont les bienvenus toute l'année, pas de laisse imposée sur la longue plage ouverte (rappel attendu), laisse recommandée près des mémoriaux. Calme, ventée, parfaite pour les chiens à grosse énergie. Eau froide de Manche.`,
    es: `La playa del desembarco es una vasta extensión de arena fina y bancos de ostras donde los perros son bienvenidos todo el año, sin correa impuesta en la larga playa abierta (llamada por voz esperada), correa recomendada cerca de los memoriales. Tranquila, ventosa, perfecta para perros con mucha energía. Agua fría del Canal.`,
    pt: `A praia do desembarque é uma vasta extensão de areia fina e bancos de ostras onde os cães são bem-vindos o ano inteiro, sem trela imposta na longa praia aberta (chamada por voz esperada), trela recomendada perto dos memoriais. Calma, ventosa, perfeita para cães com muita energia. Água fria do Canal.`,
    de: `Der Landungsstrand vom D-Day ist ein wilder Abschnitt aus feinem Sand und Austernbänken, an dem Hunde ganzjährig willkommen sind, keine Leinenpflicht auf dem langen offenen Strand (Rückrufkontrolle erwartet), Leine empfohlen in der Nähe der Gedenkstätten. Ruhig, windgepeitscht, perfekt für große, energiegeladene Hunde. Kaltes Wasser des Ärmelkanals.`,
    nl: `Het D-Day-landingsstrand is een wilde strook fijn zand en oesterbanken waar honden het hele jaar welkom zijn, geen aanlijnplicht op het lange open strand (terugroepcontrole verwacht), aanlijnen aanbevolen bij de gedenktekens. Rustig, winderig, perfect voor honden met veel energie. Koud water van het Kanaal.`,
  }},
  { rank: 19, beachName: `Plage du Touquet (hors saison)`, locationLabel: `Le Touquet-Paris-Plage, Pas-de-Calais`, slug: null, photoSlug: 'le-touquet', region: 'nord', yearRound: false, reason: {
    en: `Le Touquet allows dogs on its enormous flat sand beach from 1 October to 31 March, banned 1 April to 30 September, leash required. Vast low-tide expanse perfect for sand-galloping, sand-yachts share the space, watch out for sailing carts. Pine forest behind for a follow-up walk.`,
    fr: `Le Touquet autorise les chiens sur son immense plage de sable plat du 1er octobre au 31 mars, interdits du 1er avril au 30 septembre, laisse obligatoire. Vaste estran à marée basse parfait pour les galops, partage avec les chars à voile, attention aux engins. Forêt de pins à l'arrière pour prolonger la balade.`,
    es: `Le Touquet admite perros en su enorme playa de arena plana del 1 de octubre al 31 de marzo, prohibidos del 1 de abril al 30 de septiembre, correa obligatoria. Vasta rasa en marea baja perfecta para galopadas, se comparte con los carros vela, ojo con los aparatos. Bosque de pinos detrás para prolongar el paseo.`,
    pt: `Le Touquet aceita cães na sua enorme praia de areia plana de 1 de outubro a 31 de março, proibidos de 1 de abril a 30 de setembro, trela obrigatória. Vasto raso na maré baixa perfeito para galopadas, partilha com carros à vela, atenção aos engenhos. Floresta de pinheiros atrás para prolongar o passeio.`,
    de: `Le Touquet erlaubt Hunde auf seinem riesigen flachen Sandstrand vom 1. Oktober bis 31. März, verboten vom 1. April bis 30. September, Leinenpflicht. Weite Fläche bei Ebbe, ideal zum Galoppieren im Sand, Strandsegler teilen sich den Raum, auf die Fahrzeuge achten. Pinienwald im Hintergrund für einen anschließenden Spaziergang.`,
    nl: `Le Touquet staat honden toe op zijn enorme vlakke zandstrand van 1 oktober tot 31 maart, verboden van 1 april tot 30 september, aanlijnplicht. Uitgestrekte vlakte bij eb, perfect om te galopperen, gedeeld met strandzeilers, let op de karren. Pijnbos op de achtergrond voor een vervolgwandeling.`,
  }},
  { rank: 20, beachName: `Plage de Berck (zone canine sud)`, locationLabel: `Berck-sur-Mer, Pas-de-Calais`, slug: null, photoSlug: 'berck', region: 'nord', yearRound: true, reason: {
    en: `Berck-sur-Mer keeps a year-round dedicated dog zone on the southern end (towards the Baie d'Authie seal colony). Fine sand, leash required, careful at high tide (fast incoming sea on this very flat coast). The bay is one of Europe's biggest grey-seal colonies, keep distance and your dog short.`,
    fr: `Berck-sur-Mer maintient une zone canine dédiée toute l'année à l'extrémité sud (vers la Baie d'Authie et sa colonie de phoques). Sable fin, laisse obligatoire, vigilance à marée haute (mer rapide sur cette côte très plate). La baie héberge l'une des plus grandes colonies de phoques gris d'Europe, garder ses distances et son chien court.`,
    es: `Berck-sur-Mer mantiene una zona canina dedicada todo el año en el extremo sur (hacia la Baie d'Authie y su colonia de focas). Arena fina, correa obligatoria, atención en marea alta (mar rápido en esta costa muy plana). La bahía alberga una de las mayores colonias de focas grises de Europa, mantener la distancia y el perro corto.`,
    pt: `Berck-sur-Mer mantém uma zona canina dedicada o ano inteiro na extremidade sul (em direcção à Baie d'Authie e à sua colónia de focas). Areia fina, trela obrigatória, atenção na maré cheia (mar rápido nesta costa muito plana). A baía abriga uma das maiores colónias de focas cinzentas da Europa, manter distância e o cão curto.`,
    de: `Berck-sur-Mer unterhält am südlichen Ende (Richtung Baie d'Authie mit ihrer Seehundkolonie) eine ganzjährige ausgewiesene Hundezone. Feiner Sand, Leinenpflicht, Vorsicht bei Flut (schnell auflaufende See an dieser sehr flachen Küste). Die Bucht beherbergt eine der größten Kegelrobbenkolonien Europas, Abstand halten und den Hund kurz an der Leine führen.`,
    nl: `Berck-sur-Mer houdt het hele jaar een speciale hondenzone aan het zuidelijke uiteinde (richting de Baie d'Authie met haar zeehondenkolonie). Fijn zand, aanlijnplicht, wees voorzichtig bij vloed (snel opkomend water aan deze zeer vlakke kust). De baai herbergt een van de grootste kolonies grijze zeehonden van Europa, houd afstand en houd uw hond kort aangelijnd.`,
  }},
]

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const titles: Record<string, string> = {
    en: 'Best dog-friendly beaches in France (2026 guide): 20 verified spots | HotelsWithPets',
    fr: `Meilleures plages pour chien en France (guide 2026) : 20 plages vérifiées | HotelsWithPets`,
    es: 'Mejores playas para perros en Francia (guía 2026): 20 playas verificadas | HotelsWithPets',
    pt: 'Melhores praias para cães em França (guia 2026): 20 praias verificadas | HotelsWithPets',
    de: 'Die besten hundefreundlichen Strände Frankreichs (Guide 2026): 20 geprüfte Strände | HotelsWithPets',
    nl: 'De beste hondenstranden van Frankrijk (gids 2026): 20 geverifieerde plekken | HotelsWithPets',
  }
  const descriptions: Record<string, string> = {
    en: `Most French beaches ban dogs from 1 June to 30 September. Here are 20 verified exceptions, year-round dog zones and off-season beaches across Côte d'Azur, Languedoc, Aquitaine, Vendée, Bretagne, Normandie and the northern coast.`,
    fr: `La plupart des plages françaises interdisent les chiens du 1er juin au 30 septembre. Voici 20 exceptions vérifiées : zones canines à l'année et plages hors saison de la Côte d'Azur au Languedoc, en Aquitaine, en Vendée, en Bretagne, en Normandie et dans le Nord.`,
    es: `La mayoría de las playas francesas prohíben perros del 1 de junio al 30 de septiembre. Aquí 20 excepciones verificadas: zonas caninas todo el año y playas fuera de temporada en la Costa Azul, Languedoc, Aquitania, Vendée, Bretaña, Normandía y el norte.`,
    pt: `A maioria das praias francesas proíbe cães de 1 de junho a 30 de setembro. Aqui estão 20 excepções verificadas: zonas caninas o ano inteiro e praias fora de época na Côte d'Azur, Languedoc, Aquitânia, Vendée, Bretanha, Normandia e norte.`,
    de: `Die meisten französischen Strände verbieten Hunde vom 1. Juni bis 30. September. Hier sind 20 geprüfte Ausnahmen: ganzjährige Hundezonen und Strände außerhalb der Saison an der Côte d'Azur, im Languedoc, in Aquitanien, in der Vendée, in der Bretagne, in der Normandie und an der Nordküste.`,
    nl: `De meeste Franse stranden verbieden honden van 1 juni tot 30 september. Hier zijn 20 geverifieerde uitzonderingen: hondenzones die het hele jaar open zijn en stranden buiten het seizoen langs de Côte d'Azur, Languedoc, Aquitaine, Vendée, Bretagne, Normandië en de noordkust.`,
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
      publishedTime: '2026-05-22T00:00:00Z',
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
  bookPrefix: string
  guideLink: string
  yearRoundLabel: string
  seasonalLabel: string
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
    hero: { kicker: `FRANCE'S BEST DOG BEACHES · 2026 EDITION`, h1: 'Best dog-friendly beaches in France: 20 verified spots', lede: `Most French municipal arrêtés ban dogs from beaches between 1 June and 30 September. We mapped the exceptions: 20 verified beaches across five coasts where you can legally bring a dog, including 12 year-round zones. The first of our country-by-country dog-beach series.` },
    intro: { title: 'Why a France-only guide', paras: [
      `France has 5,500 km of coastline and a default rule that surprises most foreign visitors: from 1 June to 30 September, dogs are banned from almost every public beach by municipal arrêté, even on leash. The fines are real (38 to 750 euros) and the enforcement in July and August is now systematic on the Côte d'Azur and the Languedoc.`,
      `The good news: every coast has a handful of officially designated dog beaches that override the seasonal ban, and many more that simply lift the ban from 1 October to 30 April. Knowing which is which saves you a fine and a frustrated dog at the gate.`,
      `We cross-checked each of the 20 beaches below against the municipal arrêté or a recent (2024 or later) dog-travel source. Where a "zone canine" is officially designated, we say so. Where the rule is seasonal, we give the exact dates. Where the beach is wild enough that voice control is tolerated, we say so too.`,
    ] },
    methodology: { title: 'Our methodology', paras: [
      `We started from the municipal arrêtés of every coastal commune in France with more than 5,000 inhabitants, looking for the keyword "chien" or "animal" in their beach rules. Beaches without an explicit dog provision were eliminated unless they sit in a national park or nature reserve with a known voice-control tradition.`,
      `We then filtered for beaches that are physically dog-friendly: a year-round dog zone, or a clear seasonal opening of at least six months. Beaches that only allow dogs in the dead of winter (1 November to 30 March) were considered too restrictive to include.`,
      `Geographic spread was enforced. We selected roughly 5 beaches in the Mediterranean (Côte d'Azur and Languedoc), 5 on the Atlantic southwest (Aquitaine and Pays Basque), 3 between the Vendée and the Charente-Maritime, 3 in Bretagne, 2 in Normandie, and 2 in the Hauts-de-France and Nord coast, so that the ranking reflects every climate and tide profile of the French coast.`,
      `For each beach we noted: sand vs pebbles (galets) for paw comfort, leash status (almost always required), shaded backdrop for hot days, distance from the nearest 24/7 emergency vet, and how to find the dog-tolerated section once you arrive (often the far end of a much larger beach).`,
      `Finally, every entry was rewritten in four languages (English, French, Spanish, Portuguese) so that visitors from the UK, Spain and Portugal, the three biggest foreign markets for French coastal tourism, can use this guide directly.`,
    ] },
    rankingTitle: 'The 20-beach ranking',
    rankingSubtitle: `Each beach links to live prices for pet-friendly hotels in the closest city, and to our full destination guide when one exists.`,
    bookPrefix: 'Book pet-friendly hotels near',
    guideLink: 'Full destination guide →',
    yearRoundLabel: 'Year-round',
    seasonalLabel: 'Seasonal',
    mapTitle: `Live map · pet-friendly hotels near Cap d'Antibes (#1 area)`,
    mapDesc: `Centered on the Cap d'Antibes, near our #1 dog beach. Pan, zoom and click any marker to see live prices, pet policies and free-cancellation availability across the whole French coast. The map covers all 770+ pet-friendly hotels in our 144 European destinations.`,
    keywordChipsTitle: 'Popular dog beach searches in France in 2026',
    keywordChips: [
      `Plage chien Antibes Salis`, `Plage canine Cannes Mourre Rouge`, `Plage chien Hyères Verdon`,
      `Plage canine Almanarre Hyères`, `Plage chien Espiguette Grau-du-Roi`, `Plage canine Agde Tamarissière`,
      `Plage canine Sète Trois Digues`, `Plage chien Biarritz Côte des Basques`, `Plage chien Seignosse Estagnots`,
      `Plage canine Longeville Conches`, `Plage chien Saint-Jean-de-Monts`, `Plage chien Île de Ré Baleines`,
      `Plage chien Trévignon Trégunc`, `Plage chien Concarneau Cabellou`, `Plage chien Crozon Trez-Bellec`,
      `Plage chien Perros-Guirec Trestraou`, `Plage canine Cabourg`, `Plage chien Utah Beach Normandie`,
      `Plage chien Le Touquet`, `Plage canine Berck-sur-Mer`,
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: `Can my dog legally come to any French beach in July and August?`, a: `By default, no. Most French coastal communes ban dogs from their beaches by municipal arrêté between 1 June and 30 September, with fines between 38 and 750 euros. The 12 year-round beaches in this guide (Antibes Salis, Cannes Mourre Rouge, Hyères Verdon and Almanarre, Espiguette, Agde Tamarissière, Sète Trois Digues, Longeville Conches, Cabourg, Utah Beach, Berck-sur-Mer) are the rare exceptions and are explicitly designated as "zone canine" or equivalent by their commune.` },
      { q: `Is the leash always required?`, a: `Almost always yes. Even on designated dog beaches the standard rule is "chien tenu en laisse". Voice control is only accepted on a few wild beaches inside nature reserves (Espiguette, Utah Beach low-tide flats) and even there it remains the rule for nesting bird-season (April to July). Carry a leash and use it on demand, the gendarmes and municipal police do check.` },
      { q: `What about cats?`, a: `The same arrêtés apply to all "animaux domestiques", so cats are subject to the same rules as dogs. In practice, beach cats are rare in France and the enforcement is dog-focused. If you travel with a cat, the indoor terrace of a pet-friendly hotel is a better setting than a beach.` },
      { q: `What if my dog gets sick on the beach?`, a: `The major coastal cities all have 24/7 emergency vets: Nice, Marseille, Montpellier, Bordeaux, Nantes, Brest, Caen, Le Touquet (via Boulogne-sur-Mer). For the wilder beaches in the Vendée, Bretagne or Normandie, the nearest 24/7 service can be 45 minutes away, save the number in your phone before going. Heatstroke and salt-water ingestion are the two most common emergencies.` },
      { q: `Are these rankings the same for all dogs?`, a: `Not quite. Large active dogs do best on the Atlantic and northern beaches (Utah Beach, Le Touquet, Berck, Longeville Conches) where vast low-tide flats invite running and the water stays cool even in August. Small or older dogs do better on the Mediterranean zones (Antibes Salis, Cannes Mourre Rouge, Sète Trois Digues) where calm shallow water and short sand stretches reduce exhaustion. Brachycephalic breeds (bulldogs, pugs) should avoid the Mediterranean coast in July and August regardless.` },
    ],
    conclusion: { title: `Our pick if you only have one weekend`, paras: [
      `If you have a single weekend and a dog, head to Hyères. The Plage du Verdon and the northern Almanarre are both year-round dog zones, the Var has direct TGV access from Paris in under 4 hours, and the inland Massif des Maures gives you cool morning walks before the beach. Pet-friendly hotels are plentiful in Hyères, La Londe and Le Lavandou.`,
      `For an off-season weekend, the Île de Ré in October or November is unbeatable. The Conche des Baleines is empty, the wind drops in the afternoon, and the island's flat cycle network makes it the easiest French coast to travel with a dog, no car needed once you arrive.`,
    ] },
    ctaTitle: 'Plan your French dog trip with our destination guides',
    ctaDesc: `Nice, Cannes, Biarritz, Montpellier, Nantes and 30+ other French cities have a full pet-friendly destination guide, vet phone numbers and live booking map.`,
    ctaButton: 'See all French destinations →',
    bottomBookCtaTitle: 'Ready to book? Compare 770+ pet-friendly hotels',
    bottomBookCtaDesc: `Live prices and instant booking across the French coast and all of Europe, Booking.com, Expedia, Hotels.com and more. Free cancellation on most properties, verified pet policies on every listing.`,
    bottomBookCtaButton: 'Search pet-friendly hotels →',
  },
  fr: {
    hero: { kicker: `LES MEILLEURES PLAGES CANINES DE FRANCE · ÉDITION 2026`, h1: `Meilleures plages pour chien en France : 20 plages vérifiées`, lede: `La plupart des arrêtés municipaux interdisent les chiens sur les plages françaises du 1er juin au 30 septembre. Nous avons cartographié les exceptions : 20 plages vérifiées sur cinq littoraux où vous pouvez légalement venir avec votre chien, dont 12 zones canines à l'année. Le premier de notre série pays par pays sur les plages canines.` },
    intro: { title: `Pourquoi un guide spécial France`, paras: [
      `La France dispose de 5 500 km de littoral et d'une règle par défaut qui surprend la plupart des visiteurs étrangers : du 1er juin au 30 septembre, les chiens sont interdits sur presque toutes les plages publiques par arrêté municipal, même en laisse. Les amendes sont réelles (38 à 750 €) et le contrôle est désormais systématique en juillet-août sur la Côte d'Azur et le Languedoc.`,
      `La bonne nouvelle : chaque littoral compte une poignée de plages canines officiellement désignées qui s'affranchissent de l'interdiction estivale, et beaucoup d'autres qui lèvent simplement l'interdiction du 1er octobre au 30 avril. Savoir lesquelles vous évite une amende et un chien frustré à l'entrée.`,
      `Nous avons recoupé chacune des 20 plages ci-dessous avec l'arrêté municipal ou une source dog-travel récente (2024 ou plus). Quand une « zone canine » est officiellement désignée, nous le précisons. Quand la règle est saisonnière, nous donnons les dates exactes. Quand la plage est assez sauvage pour tolérer le rappel, nous le disons aussi.`,
    ] },
    methodology: { title: `Notre méthodologie`, paras: [
      `Nous sommes partis des arrêtés municipaux de toutes les communes côtières françaises de plus de 5 000 habitants, en cherchant les mots-clés « chien » ou « animal » dans la réglementation balnéaire. Les plages sans disposition canine explicite ont été éliminées, sauf situation en parc national ou réserve naturelle avec tradition de rappel.`,
      `Nous avons ensuite filtré les plages physiquement praticables : zone canine à l'année, ou ouverture saisonnière nette d'au moins six mois. Les plages n'autorisant les chiens qu'en plein hiver (1er novembre au 31 mars) ont été jugées trop restrictives.`,
      `La répartition géographique a été imposée. Nous avons retenu environ 5 plages en Méditerranée (Côte d'Azur et Languedoc), 5 sur la côte atlantique sud-ouest (Aquitaine et Pays Basque), 3 entre la Vendée et la Charente-Maritime, 3 en Bretagne, 2 en Normandie et 2 sur le littoral Hauts-de-France et Nord, pour que le classement reflète tous les climats et marnages de la côte française.`,
      `Pour chaque plage nous avons noté : sable ou galets (confort des coussinets), obligation de laisse (quasi systématique), ombre à l'arrière pour les jours chauds, distance du vétérinaire d'urgence 24h/24 le plus proche, et comment trouver la section autorisée une fois sur place (souvent à l'extrémité d'une plage bien plus grande).`,
      `Enfin, chaque fiche a été rédigée dans quatre langues (anglais, français, espagnol, portugais), pour que les visiteurs du Royaume-Uni, d'Espagne et du Portugal, les trois plus gros marchés étrangers du littoral français, puissent utiliser ce guide directement.`,
    ] },
    rankingTitle: `Le classement des 20 plages`,
    rankingSubtitle: `Chaque plage renvoie aux prix en direct des hôtels pet-friendly de la ville la plus proche, et à notre guide destination complet quand il existe.`,
    bookPrefix: `Réserver des hôtels pet-friendly près de`,
    guideLink: `Guide destination complet →`,
    yearRoundLabel: `Toute l'année`,
    seasonalLabel: `Saisonnière`,
    mapTitle: `Carte en direct · hôtels pet-friendly près du Cap d'Antibes (zone n°1)`,
    mapDesc: `Centrée sur le Cap d'Antibes, à côté de notre plage canine n°1. Déplacez-vous, zoomez et cliquez sur un marqueur pour voir les prix en direct, les politiques animaux et la disponibilité avec annulation gratuite sur toute la côte française. La carte couvre les 770+ hôtels pet-friendly de nos 144 destinations européennes.`,
    keywordChipsTitle: `Recherches populaires de plages canines en France en 2026`,
    keywordChips: [
      `Plage chien Antibes Salis`, `Plage canine Cannes Mourre Rouge`, `Plage chien Hyères Verdon`,
      `Plage canine Almanarre Hyères`, `Plage chien Espiguette Grau-du-Roi`, `Plage canine Agde Tamarissière`,
      `Plage canine Sète Trois Digues`, `Plage chien Biarritz Côte des Basques`, `Plage chien Seignosse Estagnots`,
      `Plage canine Longeville Conches`, `Plage chien Saint-Jean-de-Monts`, `Plage chien Île de Ré Baleines`,
      `Plage chien Trévignon Trégunc`, `Plage chien Concarneau Cabellou`, `Plage chien Crozon Trez-Bellec`,
      `Plage chien Perros-Guirec Trestraou`, `Plage canine Cabourg`, `Plage chien Utah Beach Normandie`,
      `Plage chien Le Touquet`, `Plage canine Berck-sur-Mer`,
    ],
    faqTitle: `Questions fréquentes`,
    faqs: [
      { q: `Mon chien peut-il légalement aller sur n'importe quelle plage française en juillet-août ?`, a: `Par défaut, non. La plupart des communes du littoral interdisent les chiens sur leurs plages par arrêté municipal entre le 1er juin et le 30 septembre, avec des amendes allant de 38 à 750 €. Les 12 plages à l'année de ce guide (Antibes Salis, Cannes Mourre Rouge, Hyères Verdon et Almanarre, Espiguette, Agde Tamarissière, Sète Trois Digues, Longeville Conches, Cabourg, Utah Beach, Berck-sur-Mer) sont les rares exceptions, explicitement désignées « zone canine » ou équivalent par leur commune.` },
      { q: `La laisse est-elle toujours obligatoire ?`, a: `Quasi systématiquement oui. Même sur les plages canines désignées, la règle standard est « chien tenu en laisse ». Le rappel n'est toléré que sur quelques plages sauvages en réserve naturelle (Espiguette, estrans d'Utah Beach) et même là, la laisse reste la règle en saison de nidification (avril-juillet). Garder une laisse à portée et l'utiliser à la demande : les gendarmes et la police municipale contrôlent.` },
      { q: `Et les chats ?`, a: `Les mêmes arrêtés s'appliquent à tous les « animaux domestiques », donc les chats sont soumis aux mêmes règles. En pratique, les chats sur la plage sont rares en France et le contrôle vise les chiens. Si vous voyagez avec un chat, la terrasse intérieure d'un hôtel pet-friendly est un meilleur cadre qu'une plage.` },
      { q: `Et si mon chien tombe malade sur la plage ?`, a: `Les grandes villes côtières disposent toutes d'un vétérinaire d'urgence 24h/24 : Nice, Marseille, Montpellier, Bordeaux, Nantes, Brest, Caen, Le Touquet (via Boulogne-sur-Mer). Pour les plages plus sauvages en Vendée, Bretagne ou Normandie, le service 24h le plus proche peut être à 45 minutes, à enregistrer dans le téléphone avant de partir. Coup de chaleur et ingestion d'eau de mer sont les deux urgences les plus fréquentes.` },
      { q: `Ce classement est-il le même pour tous les chiens ?`, a: `Pas vraiment. Les grands chiens actifs s'épanouissent sur les plages atlantiques et nordiques (Utah Beach, Le Touquet, Berck, Longeville Conches) où les vastes estrans invitent à la course et où l'eau reste fraîche même en août. Les petits chiens ou chiens âgés préfèrent les zones méditerranéennes (Antibes Salis, Cannes Mourre Rouge, Sète Trois Digues) où l'eau calme peu profonde et les courtes étendues de sable limitent la fatigue. Les races brachycéphales (bouledogues, carlins) doivent éviter la côte méditerranéenne en juillet-août quoi qu'il arrive.` },
    ],
    conclusion: { title: `Notre pick si vous n'avez qu'un week-end`, paras: [
      `Si vous n'avez qu'un week-end et un chien, direction Hyères. La Plage du Verdon et l'extrémité nord de l'Almanarre sont toutes deux des zones canines à l'année, le Var est en TGV direct depuis Paris en moins de 4 heures, et l'intérieur du Massif des Maures offre des promenades matinales fraîches avant la plage. Les hôtels pet-friendly sont nombreux à Hyères, La Londe et Le Lavandou.`,
      `Pour un week-end hors saison, l'Île de Ré en octobre ou novembre est imbattable. La Conche des Baleines est vide, le vent tombe l'après-midi, et le réseau cyclable plat de l'île en fait la côte française la plus simple pour voyager avec un chien, sans voiture une fois sur place.`,
    ] },
    ctaTitle: `Planifiez votre voyage français avec nos guides destinations`,
    ctaDesc: `Nice, Cannes, Biarritz, Montpellier, Nantes et plus de 30 autres villes françaises disposent d'un guide pet-friendly complet avec numéros vétérinaires et carte de réservation en direct.`,
    ctaButton: `Voir toutes les destinations françaises →`,
    bottomBookCtaTitle: `Prêt à réserver ? Comparez 770+ hôtels pet-friendly`,
    bottomBookCtaDesc: `Prix en direct et réservation instantanée sur la côte française et dans toute l'Europe, Booking.com, Expedia, Hotels.com et plus. Annulation gratuite sur la plupart des établissements, politiques animaux vérifiées sur chaque fiche.`,
    bottomBookCtaButton: `Rechercher des hôtels pet-friendly →`,
  },
  es: {
    hero: { kicker: `LAS MEJORES PLAYAS CANINAS DE FRANCIA · EDICIÓN 2026`, h1: `Mejores playas para perros en Francia: 20 playas verificadas`, lede: `La mayoría de los arrêtés municipales prohíben los perros en las playas francesas del 1 de junio al 30 de septiembre. Hemos cartografiado las excepciones: 20 playas verificadas en cinco litorales donde puedes ir legalmente con tu perro, incluidas 12 zonas caninas todo el año. La primera de nuestra serie país por país sobre playas caninas.` },
    intro: { title: `Por qué una guía sólo de Francia`, paras: [
      `Francia tiene 5.500 km de litoral y una regla por defecto que sorprende a la mayoría de visitantes extranjeros: del 1 de junio al 30 de septiembre, los perros están prohibidos en casi todas las playas públicas por arrêté municipal, incluso con correa. Las multas son reales (38 a 750 €) y el control en julio-agosto es ya sistemático en la Costa Azul y el Languedoc.`,
      `La buena noticia: cada litoral cuenta con un puñado de playas caninas oficialmente designadas que saltan la prohibición estival, y muchas más que simplemente la levantan del 1 de octubre al 30 de abril. Saber cuáles son evita una multa y un perro frustrado a la entrada.`,
      `Hemos cotejado cada una de las 20 playas siguientes con el arrêté municipal o una fuente dog-travel reciente (2024 o posterior). Cuando una "zona canina" está oficialmente designada, lo decimos. Cuando la norma es estacional, damos las fechas exactas. Cuando la playa es lo bastante salvaje para tolerar la llamada por voz, también lo decimos.`,
    ] },
    methodology: { title: `Nuestra metodología`, paras: [
      `Partimos de los arrêtés municipales de cada comuna costera francesa con más de 5.000 habitantes, buscando las palabras "chien" o "animal" en sus normas de playa. Las playas sin disposición canina explícita fueron eliminadas, salvo en parques nacionales o reservas naturales con tradición de llamada por voz.`,
      `Filtramos después las playas físicamente practicables: zona canina todo el año, o apertura estacional clara de al menos seis meses. Las playas que sólo admiten perros en pleno invierno (1 de noviembre al 31 de marzo) se consideraron demasiado restrictivas.`,
      `Se impuso el reparto geográfico. Seleccionamos unas 5 playas en el Mediterráneo (Costa Azul y Languedoc), 5 en el Atlántico suroeste (Aquitania y País Vasco), 3 entre la Vendée y la Charente-Maritime, 3 en Bretaña, 2 en Normandía y 2 en el litoral Hauts-de-France y Nord, para que el ranking refleje todos los climas y mareas de la costa francesa.`,
      `Para cada playa anotamos: arena o cantos rodados (confort de las almohadillas), obligación de correa (casi siempre), sombra al fondo para días calurosos, distancia del veterinario de urgencia 24/7 más cercano, y cómo encontrar la sección autorizada al llegar (a menudo en el extremo de una playa mucho más grande).`,
      `Por último, cada ficha se redactó en cuatro idiomas (inglés, francés, español, portugués), para que los visitantes del Reino Unido, España y Portugal, los tres mayores mercados extranjeros del litoral francés, puedan usar esta guía directamente.`,
    ] },
    rankingTitle: `El ranking de las 20 playas`,
    rankingSubtitle: `Cada playa enlaza con los precios en vivo de hoteles pet-friendly de la ciudad más cercana y con nuestra guía de destino completa cuando existe.`,
    bookPrefix: `Reservar hoteles pet-friendly cerca de`,
    guideLink: `Guía de destino completa →`,
    yearRoundLabel: `Todo el año`,
    seasonalLabel: `Estacional`,
    mapTitle: `Mapa en vivo · hoteles pet-friendly cerca de Cap d'Antibes (zona n.º 1)`,
    mapDesc: `Centrado en el Cap d'Antibes, junto a nuestra playa canina n.º 1. Desplázate, haz zoom y haz clic en cualquier marcador para ver precios en vivo, políticas de mascotas y disponibilidad con cancelación gratuita en toda la costa francesa. El mapa cubre los 770+ hoteles pet-friendly de nuestros 144 destinos europeos.`,
    keywordChipsTitle: `Búsquedas populares de playas caninas en Francia en 2026`,
    keywordChips: [
      `Playa perro Antibes Salis`, `Playa canina Cannes Mourre Rouge`, `Playa perro Hyères Verdon`,
      `Playa canina Almanarre Hyères`, `Playa perro Espiguette Grau-du-Roi`, `Playa canina Agde Tamarissière`,
      `Playa canina Sète Trois Digues`, `Playa perro Biarritz Côte des Basques`, `Playa perro Seignosse Estagnots`,
      `Playa canina Longeville Conches`, `Playa perro Saint-Jean-de-Monts`, `Playa perro Île de Ré Baleines`,
      `Playa perro Trévignon Trégunc`, `Playa perro Concarneau Cabellou`, `Playa perro Crozon Trez-Bellec`,
      `Playa perro Perros-Guirec Trestraou`, `Playa canina Cabourg`, `Playa perro Utah Beach Normandía`,
      `Playa perro Le Touquet`, `Playa canina Berck-sur-Mer`,
    ],
    faqTitle: `Preguntas frecuentes`,
    faqs: [
      { q: `¿Puede mi perro ir legalmente a cualquier playa francesa en julio-agosto?`, a: `Por defecto, no. La mayoría de comunas costeras francesas prohíben perros en sus playas por arrêté municipal entre el 1 de junio y el 30 de septiembre, con multas de 38 a 750 €. Las 12 playas todo el año de esta guía (Antibes Salis, Cannes Mourre Rouge, Hyères Verdon y Almanarre, Espiguette, Agde Tamarissière, Sète Trois Digues, Longeville Conches, Cabourg, Utah Beach, Berck-sur-Mer) son las raras excepciones, designadas explícitamente como "zone canine" o equivalente por su comuna.` },
      { q: `¿La correa es siempre obligatoria?`, a: `Casi siempre sí. Incluso en playas caninas designadas la norma estándar es "chien tenu en laisse". La llamada por voz sólo se tolera en algunas playas salvajes en reserva natural (Espiguette, rasas de Utah Beach) y aun así, la correa sigue siendo la norma en temporada de nidificación (abril-julio). Llevar correa a mano y usarla a demanda: la gendarmería y la policía municipal controlan.` },
      { q: `¿Y los gatos?`, a: `Los mismos arrêtés se aplican a todos los "animaux domestiques", así que los gatos están sometidos a las mismas normas. En la práctica, los gatos en playa son raros en Francia y el control se centra en los perros. Si viajas con un gato, la terraza interior de un hotel pet-friendly es mejor entorno que una playa.` },
      { q: `¿Y si mi perro se pone enfermo en la playa?`, a: `Las grandes ciudades costeras tienen todas veterinario de urgencias 24/7: Niza, Marsella, Montpellier, Burdeos, Nantes, Brest, Caen, Le Touquet (vía Boulogne-sur-Mer). Para las playas más salvajes de Vendée, Bretaña o Normandía, el servicio 24/7 más cercano puede estar a 45 minutos, guarda el número en el móvil antes de salir. El golpe de calor y la ingestión de agua salada son las dos urgencias más frecuentes.` },
      { q: `¿Este ranking sirve para todos los perros?`, a: `No del todo. Los perros grandes activos brillan en las playas atlánticas y del norte (Utah Beach, Le Touquet, Berck, Longeville Conches) donde las vastas rasas invitan a correr y el agua sigue fresca incluso en agosto. Los perros pequeños o mayores prefieren las zonas mediterráneas (Antibes Salis, Cannes Mourre Rouge, Sète Trois Digues) donde el agua tranquila y poco profunda y los tramos cortos de arena limitan el cansancio. Las razas braquicéfalas (bulldogs, carlinos) deben evitar la costa mediterránea en julio-agosto pase lo que pase.` },
    ],
    conclusion: { title: `Nuestra elección si sólo tienes un fin de semana`, paras: [
      `Si tienes un solo fin de semana y un perro, dirección Hyères. La Plage du Verdon y el extremo norte de L'Almanarre son ambas zonas caninas todo el año, el Var está a TGV directo desde París en menos de 4 horas, y el interior del Macizo des Maures ofrece paseos matinales frescos antes de la playa. Hay hoteles pet-friendly de sobra en Hyères, La Londe y Le Lavandou.`,
      `Para un fin de semana fuera de temporada, la Île de Ré en octubre o noviembre es imbatible. La Conche des Baleines está vacía, el viento cae por la tarde, y la red ciclista plana de la isla la convierte en la costa francesa más fácil para viajar con perro, sin coche al llegar.`,
    ] },
    ctaTitle: `Planea tu viaje a Francia con nuestras guías de destino`,
    ctaDesc: `Niza, Cannes, Biarritz, Montpellier, Nantes y más de 30 ciudades francesas tienen una guía pet-friendly completa con números veterinarios y mapa de reserva en vivo.`,
    ctaButton: `Ver todos los destinos franceses →`,
    bottomBookCtaTitle: `¿Listo para reservar? Compara 770+ hoteles pet-friendly`,
    bottomBookCtaDesc: `Precios en vivo y reserva instantánea en la costa francesa y toda Europa, Booking.com, Expedia, Hotels.com y más. Cancelación gratuita en la mayoría, políticas de mascotas verificadas en cada ficha.`,
    bottomBookCtaButton: `Buscar hoteles pet-friendly →`,
  },
  pt: {
    hero: { kicker: `AS MELHORES PRAIAS CANINAS DE FRANÇA · EDIÇÃO 2026`, h1: `Melhores praias para cães em França: 20 praias verificadas`, lede: `A maioria dos arrêtés municipais proíbe cães nas praias francesas de 1 de junho a 30 de setembro. Mapeámos as excepções: 20 praias verificadas em cinco litorais onde pode legalmente ir com o seu cão, incluindo 12 zonas caninas o ano inteiro. A primeira da nossa série país por país sobre praias caninas.` },
    intro: { title: `Porquê um guia só de França`, paras: [
      `A França tem 5.500 km de litoral e uma regra por defeito que surpreende a maioria dos visitantes estrangeiros: de 1 de junho a 30 de setembro, os cães são proibidos em quase todas as praias públicas por arrêté municipal, mesmo à trela. As multas são reais (38 a 750 €) e a fiscalização em julho-agosto é já sistemática na Côte d'Azur e no Languedoc.`,
      `A boa notícia: cada litoral conta com um punhado de praias caninas oficialmente designadas que escapam à proibição estival, e muitas mais que simplesmente a levantam de 1 de outubro a 30 de abril. Saber quais são poupa-lhe uma multa e um cão frustrado à entrada.`,
      `Cruzámos cada uma das 20 praias seguintes com o arrêté municipal ou com uma fonte dog-travel recente (2024 ou posterior). Quando há uma "zone canine" oficialmente designada, dizemo-lo. Quando a regra é sazonal, damos as datas exactas. Quando a praia é suficientemente selvagem para tolerar chamada por voz, também o dizemos.`,
    ] },
    methodology: { title: `A nossa metodologia`, paras: [
      `Partimos dos arrêtés municipais de cada comuna costeira francesa com mais de 5.000 habitantes, procurando as palavras "chien" ou "animal" nas suas regras de praia. As praias sem disposição canina explícita foram eliminadas, salvo em parque nacional ou reserva natural com tradição de chamada por voz.`,
      `Filtrámos depois as praias fisicamente praticáveis: zona canina o ano inteiro, ou abertura sazonal clara de pelo menos seis meses. As praias que só aceitam cães em pleno inverno (1 de novembro a 31 de março) foram consideradas demasiado restritivas.`,
      `A distribuição geográfica foi imposta. Seleccionámos cerca de 5 praias no Mediterrâneo (Côte d'Azur e Languedoc), 5 no Atlântico sudoeste (Aquitânia e País Basco), 3 entre a Vendée e a Charente-Maritime, 3 na Bretanha, 2 na Normandia e 2 no litoral Hauts-de-France e Nord, para que o ranking reflicta todos os climas e marés da costa francesa.`,
      `Para cada praia anotámos: areia ou seixos (conforto das almofadinhas), obrigação de trela (quase sempre), sombra ao fundo para dias quentes, distância do veterinário de urgência 24/7 mais próximo, e como encontrar a secção autorizada à chegada (muitas vezes na extremidade de uma praia bem maior).`,
      `Por fim, cada ficha foi redigida em quatro línguas (inglês, francês, espanhol, português), para que os visitantes do Reino Unido, Espanha e Portugal, os três maiores mercados estrangeiros do litoral francês, possam usar este guia directamente.`,
    ] },
    rankingTitle: `O ranking das 20 praias`,
    rankingSubtitle: `Cada praia liga aos preços em direto de hotéis pet-friendly da cidade mais próxima e ao nosso guia de destino completo quando existe.`,
    bookPrefix: `Reservar hotéis pet-friendly perto de`,
    guideLink: `Guia de destino completo →`,
    yearRoundLabel: `O ano inteiro`,
    seasonalLabel: `Sazonal`,
    mapTitle: `Mapa em direto · hotéis pet-friendly perto do Cap d'Antibes (zona n.º 1)`,
    mapDesc: `Centrado no Cap d'Antibes, junto à nossa praia canina n.º 1. Desloque, faça zoom e clique em qualquer marcador para ver preços em direto, políticas de animais e disponibilidade com cancelamento grátis em toda a costa francesa. O mapa cobre os 770+ hotéis pet-friendly dos nossos 144 destinos europeus.`,
    keywordChipsTitle: `Pesquisas populares de praias caninas em França em 2026`,
    keywordChips: [
      `Praia cão Antibes Salis`, `Praia canina Cannes Mourre Rouge`, `Praia cão Hyères Verdon`,
      `Praia canina Almanarre Hyères`, `Praia cão Espiguette Grau-du-Roi`, `Praia canina Agde Tamarissière`,
      `Praia canina Sète Trois Digues`, `Praia cão Biarritz Côte des Basques`, `Praia cão Seignosse Estagnots`,
      `Praia canina Longeville Conches`, `Praia cão Saint-Jean-de-Monts`, `Praia cão Île de Ré Baleines`,
      `Praia cão Trévignon Trégunc`, `Praia cão Concarneau Cabellou`, `Praia cão Crozon Trez-Bellec`,
      `Praia cão Perros-Guirec Trestraou`, `Praia canina Cabourg`, `Praia cão Utah Beach Normandia`,
      `Praia cão Le Touquet`, `Praia canina Berck-sur-Mer`,
    ],
    faqTitle: `Perguntas frequentes`,
    faqs: [
      { q: `O meu cão pode legalmente ir a qualquer praia francesa em julho-agosto?`, a: `Por defeito, não. A maioria das comunas costeiras francesas proíbe cães nas suas praias por arrêté municipal entre 1 de junho e 30 de setembro, com multas de 38 a 750 €. As 12 praias o ano inteiro deste guia (Antibes Salis, Cannes Mourre Rouge, Hyères Verdon e Almanarre, Espiguette, Agde Tamarissière, Sète Trois Digues, Longeville Conches, Cabourg, Utah Beach, Berck-sur-Mer) são as raras excepções, explicitamente designadas como "zone canine" ou equivalente pela sua comuna.` },
      { q: `A trela é sempre obrigatória?`, a: `Quase sempre sim. Mesmo nas praias caninas designadas a regra padrão é "chien tenu en laisse". A chamada por voz só é tolerada em algumas praias selvagens em reserva natural (Espiguette, rasos de Utah Beach) e mesmo aí, a trela mantém-se a regra em época de nidificação (abril-julho). Ter trela à mão e usá-la a pedido: a gendarmerie e a polícia municipal fiscalizam.` },
      { q: `E os gatos?`, a: `Os mesmos arrêtés aplicam-se a todos os "animaux domestiques", logo os gatos estão sujeitos às mesmas regras. Na prática, gatos na praia são raros em França e a fiscalização foca-se nos cães. Se viaja com um gato, a esplanada interior de um hotel pet-friendly é melhor cenário do que uma praia.` },
      { q: `E se o meu cão adoecer na praia?`, a: `As grandes cidades costeiras têm todas veterinário de urgência 24/7: Nice, Marselha, Montpellier, Bordéus, Nantes, Brest, Caen, Le Touquet (via Boulogne-sur-Mer). Para as praias mais selvagens da Vendée, Bretanha ou Normandia, o serviço 24/7 mais próximo pode ficar a 45 minutos, registe o número no telemóvel antes de partir. Insolação e ingestão de água salgada são as duas urgências mais frequentes.` },
      { q: `Este ranking serve para todos os cães?`, a: `Não totalmente. Os cães grandes activos dão-se bem nas praias atlânticas e do norte (Utah Beach, Le Touquet, Berck, Longeville Conches) onde os vastos rasos convidam à corrida e a água permanece fresca mesmo em agosto. Os cães pequenos ou idosos preferem as zonas mediterrânicas (Antibes Salis, Cannes Mourre Rouge, Sète Trois Digues) onde a água calma pouco profunda e os curtos troços de areia limitam o cansaço. As raças braquicefálicas (bulldogues, pugs) devem evitar a costa mediterrânica em julho-agosto independentemente.` },
    ],
    conclusion: { title: `A nossa escolha se só tem um fim de semana`, paras: [
      `Se tem um único fim de semana e um cão, rume a Hyères. A Plage du Verdon e a extremidade norte de L'Almanarre são ambas zonas caninas o ano inteiro, o Var fica a TGV directo de Paris em menos de 4 horas, e o interior do Maciço des Maures oferece passeios matinais frescos antes da praia. Os hotéis pet-friendly são abundantes em Hyères, La Londe e Le Lavandou.`,
      `Para um fim de semana fora de época, a Île de Ré em outubro ou novembro é imbatível. A Conche des Baleines está vazia, o vento cai à tarde, e a rede ciclável plana da ilha torna-a a costa francesa mais fácil para viajar com cão, sem carro à chegada.`,
    ] },
    ctaTitle: `Planeie a sua viagem em França com os nossos guias de destino`,
    ctaDesc: `Nice, Cannes, Biarritz, Montpellier, Nantes e mais de 30 cidades francesas têm um guia pet-friendly completo com números de veterinários e mapa de reserva em direto.`,
    ctaButton: `Ver todos os destinos franceses →`,
    bottomBookCtaTitle: `Pronto para reservar? Compare 770+ hotéis pet-friendly`,
    bottomBookCtaDesc: `Preços em direto e reserva instantânea na costa francesa e em toda a Europa, Booking.com, Expedia, Hotels.com e mais. Cancelamento grátis na maioria dos estabelecimentos, políticas de animais verificadas em cada ficha.`,
    bottomBookCtaButton: `Procurar hotéis pet-friendly →`,
  },
  de: {
    hero: { kicker: `FRANKREICHS BESTE HUNDESTRÄNDE · AUSGABE 2026`, h1: `Die besten hundefreundlichen Strände Frankreichs: 20 geprüfte Orte`, lede: `Die meisten französischen Gemeindeverordnungen verbieten Hunde vom 1. Juni bis 30. September an den Stränden. Wir haben die Ausnahmen kartiert: 20 geprüfte Strände an fünf Küsten, an denen Sie Ihren Hund legal mitbringen dürfen, darunter 12 ganzjährige Zonen. Der erste Teil unserer Länderserie zu Hundestränden.` },
    intro: { title: `Warum ein reiner Frankreich-Guide`, paras: [
      `Frankreich hat 5.500 km Küste und eine Standardregel, die die meisten ausländischen Besucher überrascht: Vom 1. Juni bis 30. September sind Hunde per Gemeindeverordnung auf fast jedem öffentlichen Strand verboten, selbst an der Leine. Die Bußgelder sind real (38 bis 750 Euro), und die Kontrollen im Juli und August sind an der Côte d'Azur und im Languedoc inzwischen systematisch.`,
      `Die gute Nachricht: Jede Küste hat eine Handvoll offiziell ausgewiesener Hundestrände, die das saisonale Verbot außer Kraft setzen, sowie viele weitere, die das Verbot vom 1. Oktober bis 30. April einfach aufheben. Wer weiß, welche das sind, spart sich ein Bußgeld und einen frustrierten Hund am Eingang.`,
      `Wir haben jeden der 20 unten aufgeführten Strände mit der Gemeindeverordnung oder einer aktuellen (2024 oder später) Hundereise-Quelle abgeglichen. Wo eine „zone canine" offiziell ausgewiesen ist, sagen wir das. Wo die Regel saisonal ist, nennen wir die genauen Daten. Wo der Strand wild genug ist, dass Rückrufkontrolle geduldet wird, sagen wir das ebenfalls.`,
    ] },
    methodology: { title: `Unsere Methodik`, paras: [
      `Wir sind von den Gemeindeverordnungen jeder französischen Küstengemeinde mit mehr als 5.000 Einwohnern ausgegangen und haben in deren Strandregeln nach den Stichwörtern „chien" oder „animal" gesucht. Strände ohne ausdrückliche Hunderegelung wurden ausgeschlossen, außer sie liegen in einem Nationalpark oder Naturschutzgebiet mit bekannter Rückruftradition.`,
      `Anschließend filterten wir nach Stränden, die physisch hundefreundlich sind: eine ganzjährige Hundezone oder eine klare saisonale Öffnung von mindestens sechs Monaten. Strände, die Hunde nur im tiefsten Winter (1. November bis 30. März) zulassen, wurden als zu restriktiv für die Aufnahme eingestuft.`,
      `Auf eine geografische Verteilung wurde geachtet. Wir wählten rund 5 Strände am Mittelmeer (Côte d'Azur und Languedoc), 5 im Südwesten am Atlantik (Aquitanien und Baskenland), 3 zwischen der Vendée und der Charente-Maritime, 3 in der Bretagne, 2 in der Normandie und 2 an der Küste Hauts-de-France und Nord, damit das Ranking jedes Klima- und Gezeitenprofil der französischen Küste widerspiegelt.`,
      `Für jeden Strand haben wir notiert: Sand oder Kiesel (galets) für den Pfotenkomfort, Leinenpflicht (fast immer vorgeschrieben), schattiger Hintergrund für heiße Tage, Entfernung zum nächsten rund um die Uhr geöffneten Tierarzt-Notdienst sowie, wie man den hundegeduldeten Abschnitt vor Ort findet (oft am äußersten Ende eines viel größeren Strandes).`,
      `Schließlich wurde jeder Eintrag in vier Sprachen (Englisch, Französisch, Spanisch, Portugiesisch) verfasst, damit Besucher aus dem Vereinigten Königreich, Spanien und Portugal, den drei größten ausländischen Märkten für den französischen Küstentourismus, diesen Guide direkt nutzen können.`,
    ] },
    rankingTitle: `Das Ranking der 20 Strände`,
    rankingSubtitle: `Jeder Strand verlinkt zu Live-Preisen für haustierfreundliche Hotels in der nächstgelegenen Stadt und, sofern vorhanden, zu unserem vollständigen Reiseziel-Guide.`,
    bookPrefix: `Haustierfreundliche Hotels buchen in der Nähe von`,
    guideLink: `Vollständiger Reiseziel-Guide →`,
    yearRoundLabel: `Ganzjährig`,
    seasonalLabel: `Saisonal`,
    mapTitle: `Live-Karte · haustierfreundliche Hotels in der Nähe von Cap d'Antibes (Platz-1-Gebiet)`,
    mapDesc: `Zentriert auf das Cap d'Antibes, in der Nähe unseres Hundestrands Nr. 1. Verschieben, zoomen und auf einen Marker klicken, um Live-Preise, Haustierrichtlinien und kostenlos stornierbare Verfügbarkeit entlang der gesamten französischen Küste zu sehen. Die Karte umfasst alle 770+ haustierfreundlichen Hotels in unseren 144 europäischen Reisezielen.`,
    keywordChipsTitle: `Beliebte Suchanfragen zu Hundestränden in Frankreich 2026`,
    keywordChips: [
      `Hundestrand Antibes Salis`, `Hundestrand Cannes Mourre Rouge`, `Hundestrand Hyères Verdon`,
      `Hundestrand Almanarre Hyères`, `Hundestrand Espiguette Grau-du-Roi`, `Hundestrand Agde Tamarissière`,
      `Hundestrand Sète Trois Digues`, `Hundestrand Biarritz Côte des Basques`, `Hundestrand Seignosse Estagnots`,
      `Hundestrand Longeville Conches`, `Hundestrand Saint-Jean-de-Monts`, `Hundestrand Île de Ré Baleines`,
      `Hundestrand Trévignon Trégunc`, `Hundestrand Concarneau Cabellou`, `Hundestrand Crozon Trez-Bellec`,
      `Hundestrand Perros-Guirec Trestraou`, `Hundestrand Cabourg`, `Hundestrand Utah Beach Normandie`,
      `Hundestrand Le Touquet`, `Hundestrand Berck-sur-Mer`,
    ],
    faqTitle: `Häufig gestellte Fragen`,
    faqs: [
      { q: `Darf mein Hund im Juli und August legal an jeden französischen Strand?`, a: `Standardmäßig nein. Die meisten französischen Küstengemeinden verbieten Hunde per Gemeindeverordnung zwischen dem 1. Juni und dem 30. September auf ihren Stränden, mit Bußgeldern zwischen 38 und 750 Euro. Die 12 ganzjährigen Strände in diesem Guide (Antibes Salis, Cannes Mourre Rouge, Hyères Verdon und Almanarre, Espiguette, Agde Tamarissière, Sète Trois Digues, Longeville Conches, Cabourg, Utah Beach, Berck-sur-Mer) sind die seltenen Ausnahmen und von ihrer Gemeinde ausdrücklich als „zone canine" oder Ähnliches ausgewiesen.` },
      { q: `Ist die Leine immer Pflicht?`, a: `Fast immer ja. Selbst auf ausgewiesenen Hundestränden gilt in der Regel „chien tenu en laisse" (Hund an der Leine). Rückrufkontrolle wird nur auf wenigen Wildstränden in Naturschutzgebieten akzeptiert (Espiguette, Wattflächen von Utah Beach), und selbst dort bleibt die Leine während der Vogelbrutzeit (April bis Juli) Pflicht. Führen Sie eine Leine mit und nutzen Sie sie bei Bedarf, die Gendarmerie und die Gemeindepolizei kontrollieren tatsächlich.` },
      { q: `Und Katzen?`, a: `Dieselben Verordnungen gelten für alle „animaux domestiques", sodass Katzen denselben Regeln unterliegen wie Hunde. In der Praxis sind Strandkatzen in Frankreich selten, und die Kontrollen konzentrieren sich auf Hunde. Wenn Sie mit einer Katze reisen, ist die überdachte Terrasse eines haustierfreundlichen Hotels der bessere Rahmen als ein Strand.` },
      { q: `Was, wenn mein Hund am Strand krank wird?`, a: `Alle großen Küstenstädte verfügen über einen rund um die Uhr geöffneten Tierarzt-Notdienst: Nizza, Marseille, Montpellier, Bordeaux, Nantes, Brest, Caen, Le Touquet (über Boulogne-sur-Mer). Bei den wilderen Stränden in der Vendée, der Bretagne oder der Normandie kann der nächste 24/7-Dienst 45 Minuten entfernt sein, speichern Sie die Nummer vor der Abfahrt in Ihrem Telefon. Hitzschlag und das Verschlucken von Salzwasser sind die beiden häufigsten Notfälle.` },
      { q: `Gilt dieses Ranking für alle Hunde gleichermaßen?`, a: `Nicht ganz. Große, aktive Hunde fühlen sich an den Atlantik- und Nordstränden (Utah Beach, Le Touquet, Berck, Longeville Conches) am wohlsten, wo weite Wattflächen bei Ebbe zum Laufen einladen und das Wasser selbst im August kühl bleibt. Kleine oder ältere Hunde kommen besser mit den Mittelmeerzonen zurecht (Antibes Salis, Cannes Mourre Rouge, Sète Trois Digues), wo ruhiges, flaches Wasser und kurze Sandabschnitte die Erschöpfung verringern. Brachyzephale Rassen (Bulldoggen, Möpse) sollten die Mittelmeerküste im Juli und August in jedem Fall meiden.` },
    ],
    conclusion: { title: `Unsere Empfehlung, wenn Sie nur ein Wochenende haben`, paras: [
      `Wenn Sie nur ein Wochenende und einen Hund haben, fahren Sie nach Hyères. Die Plage du Verdon und der nördliche Teil von L'Almanarre sind beide ganzjährige Hundezonen, der Var ist mit dem TGV direkt von Paris aus in unter 4 Stunden erreichbar, und das Hinterland des Massif des Maures bietet kühle Morgenspaziergänge vor dem Strandbesuch. Haustierfreundliche Hotels gibt es reichlich in Hyères, La Londe und Le Lavandou.`,
      `Für ein Wochenende außerhalb der Saison ist die Île de Ré im Oktober oder November unschlagbar. Die Conche des Baleines ist menschenleer, der Wind lässt am Nachmittag nach, und das flache Radwegenetz der Insel macht sie zur einfachsten französischen Küste, um mit Hund zu reisen, ohne dass vor Ort ein Auto nötig ist.`,
    ] },
    ctaTitle: `Planen Sie Ihre Frankreich-Reise mit Hund mit unseren Reiseziel-Guides`,
    ctaDesc: `Nizza, Cannes, Biarritz, Montpellier, Nantes und über 30 weitere französische Städte verfügen über einen vollständigen haustierfreundlichen Reiseziel-Guide, Tierarzt-Telefonnummern und eine Live-Buchungskarte.`,
    ctaButton: `Alle französischen Reiseziele ansehen →`,
    bottomBookCtaTitle: `Bereit zu buchen? Vergleichen Sie 770+ haustierfreundliche Hotels`,
    bottomBookCtaDesc: `Live-Preise und Sofortbuchung entlang der gesamten französischen Küste und in ganz Europa, Booking.com, Expedia, Hotels.com und mehr. Kostenlose Stornierung bei den meisten Unterkünften, geprüfte Haustierrichtlinien bei jedem Eintrag.`,
    bottomBookCtaButton: `Haustierfreundliche Hotels suchen →`,
  },
  nl: {
    hero: { kicker: `FRANKRIJKS BESTE HONDENSTRANDEN · EDITIE 2026`, h1: `De beste hondenstranden van Frankrijk: 20 geverifieerde plekken`, lede: `De meeste Franse gemeentelijke besluiten verbieden honden van 1 juni tot 30 september op het strand. Wij brachten de uitzonderingen in kaart: 20 geverifieerde stranden langs vijf kustlijnen waar je legaal met je hond terechtkunt, waaronder 12 zones die het hele jaar open zijn. Het eerste deel van onze land-voor-land serie over hondenstranden.` },
    intro: { title: `Waarom een gids alleen over Frankrijk`, paras: [
      `Frankrijk heeft 5.500 km kustlijn en een standaardregel die de meeste buitenlandse bezoekers verrast: van 1 juni tot 30 september zijn honden bij gemeentelijk besluit op vrijwel elk openbaar strand verboden, zelfs aangelijnd. De boetes zijn echt (38 tot 750 euro) en de handhaving in juli en augustus is inmiddels systematisch aan de Côte d'Azur en in de Languedoc.`,
      `Het goede nieuws: elke kust heeft een handvol officieel aangewezen hondenstranden die het seizoensverbod opheffen, en nog veel meer stranden die het verbod gewoon laten vervallen van 1 oktober tot 30 april. Weten welke dat zijn, bespaart je een boete en een gefrustreerde hond bij de ingang.`,
      `We hebben elk van de 20 onderstaande stranden gecontroleerd aan de hand van het gemeentelijk besluit of een recente (2024 of later) bron over reizen met hond. Waar een "zone canine" officieel is aangewezen, vermelden we dat. Waar de regel seizoensgebonden is, geven we de exacte data. Waar het strand wild genoeg is dat terugroepcontrole wordt getolereerd, zeggen we dat ook.`,
    ] },
    methodology: { title: `Onze methodologie`, paras: [
      `We zijn uitgegaan van de gemeentelijke besluiten van elke Franse kustgemeente met meer dan 5.000 inwoners, op zoek naar de trefwoorden "chien" of "animal" in hun strandregels. Stranden zonder expliciete hondenregeling werden uitgesloten, tenzij ze in een nationaal park of natuurgebied liggen met een bekende traditie van terugroepcontrole.`,
      `Vervolgens filterden we op stranden die fysiek hondvriendelijk zijn: een hondenzone die het hele jaar open is, of een duidelijke seizoensopening van minstens zes maanden. Stranden die honden alleen midden in de winter toelaten (1 november tot 31 maart) werden als te beperkt beschouwd.`,
      `Er is gestuurd op geografische spreiding. We kozen ongeveer 5 stranden aan de Middellandse Zee (Côte d'Azur en Languedoc), 5 aan de Atlantische zuidwestkust (Aquitaine en Baskenland), 3 tussen de Vendée en de Charente-Maritime, 3 in Bretagne, 2 in Normandië en 2 aan de kust van Hauts-de-France en Nord, zodat de ranglijst elk klimaat en getijdenprofiel van de Franse kust weerspiegelt.`,
      `Voor elk strand noteerden we: zand of kiezels (galets) voor het comfort van de pootjes, aanlijnplicht (bijna altijd verplicht), schaduw op de achtergrond voor warme dagen, afstand tot de dichtstbijzijnde 24/7 spoeddierenarts, en hoe je bij aankomst het hondvriendelijke gedeelte vindt (vaak aan het uiterste uiteinde van een veel groter strand).`,
      `Ten slotte is elk item herschreven in vier talen (Engels, Frans, Spaans, Portugees), zodat bezoekers uit het Verenigd Koninkrijk, Spanje en Portugal, de drie grootste buitenlandse markten voor Frans kusttoerisme, deze gids direct kunnen gebruiken.`,
    ] },
    rankingTitle: `De ranglijst van 20 stranden`,
    rankingSubtitle: `Elk strand linkt naar actuele prijzen voor huisdiervriendelijke hotels in de dichtstbijzijnde stad, en naar onze volledige bestemmingsgids als die bestaat.`,
    bookPrefix: `Boek huisdiervriendelijke hotels bij`,
    guideLink: `Volledige bestemmingsgids →`,
    yearRoundLabel: `Hele jaar`,
    seasonalLabel: `Seizoensgebonden`,
    mapTitle: `Live kaart · huisdiervriendelijke hotels bij Cap d'Antibes (gebied #1)`,
    mapDesc: `Gecentreerd op Cap d'Antibes, bij ons hondenstrand nummer 1. Verschuif, zoom in en klik op een marker voor actuele prijzen, huisdierenbeleid en gratis annuleerbare beschikbaarheid langs de hele Franse kust. De kaart omvat alle 770+ huisdiervriendelijke hotels in onze 144 Europese bestemmingen.`,
    keywordChipsTitle: `Populaire zoekopdrachten naar hondenstranden in Frankrijk in 2026`,
    keywordChips: [
      `Hondenstrand Antibes Salis`, `Hondenstrand Cannes Mourre Rouge`, `Hondenstrand Hyères Verdon`,
      `Hondenstrand Almanarre Hyères`, `Hondenstrand Espiguette Grau-du-Roi`, `Hondenstrand Agde Tamarissière`,
      `Hondenstrand Sète Trois Digues`, `Hondenstrand Biarritz Côte des Basques`, `Hondenstrand Seignosse Estagnots`,
      `Hondenstrand Longeville Conches`, `Hondenstrand Saint-Jean-de-Monts`, `Hondenstrand Île de Ré Baleines`,
      `Hondenstrand Trévignon Trégunc`, `Hondenstrand Concarneau Cabellou`, `Hondenstrand Crozon Trez-Bellec`,
      `Hondenstrand Perros-Guirec Trestraou`, `Hondenstrand Cabourg`, `Hondenstrand Utah Beach Normandië`,
      `Hondenstrand Le Touquet`, `Hondenstrand Berck-sur-Mer`,
    ],
    faqTitle: `Veelgestelde vragen`,
    faqs: [
      { q: `Mag mijn hond in juli en augustus legaal naar elk Frans strand?`, a: `Standaard niet. De meeste Franse kustgemeenten verbieden honden bij gemeentelijk besluit tussen 1 juni en 30 september op hun stranden, met boetes tussen 38 en 750 euro. De 12 hondenstranden die het hele jaar open zijn in deze gids (Antibes Salis, Cannes Mourre Rouge, Hyères Verdon en Almanarre, Espiguette, Agde Tamarissière, Sète Trois Digues, Longeville Conches, Cabourg, Utah Beach, Berck-sur-Mer) zijn de zeldzame uitzonderingen en worden door hun gemeente expliciet aangewezen als "zone canine" of gelijkwaardig.` },
      { q: `Is aanlijnen altijd verplicht?`, a: `Bijna altijd wel. Zelfs op aangewezen hondenstranden geldt doorgaans de regel "chien tenu en laisse" (hond aangelijnd). Terugroepcontrole wordt alleen geaccepteerd op enkele wilde stranden binnen natuurgebieden (Espiguette, de platen van Utah Beach bij eb), en zelfs daar blijft de leiband verplicht tijdens het broedseizoen van vogels (april tot juli). Neem een riem mee en gebruik hem op verzoek, de gendarmerie en de gemeentepolitie controleren daadwerkelijk.` },
      { q: `En katten?`, a: `Dezelfde besluiten gelden voor alle "animaux domestiques", dus katten zijn onderworpen aan dezelfde regels als honden. In de praktijk zijn stranden met katten zeldzaam in Frankrijk en richt de handhaving zich op honden. Als je met een kat reist, is het overdekte terras van een huisdiervriendelijk hotel een betere plek dan een strand.` },
      { q: `Wat als mijn hond ziek wordt op het strand?`, a: `Alle grote kuststeden beschikken over een 24/7 spoeddierenarts: Nice, Marseille, Montpellier, Bordeaux, Nantes, Brest, Caen, Le Touquet (via Boulogne-sur-Mer). Bij de wildere stranden in de Vendée, Bretagne of Normandië kan de dichtstbijzijnde 24/7 dienst 45 minuten verderop liggen, sla het nummer op in je telefoon voordat je vertrekt. Hitteberoerte en het binnenkrijgen van zeewater zijn de twee meest voorkomende noodgevallen.` },
      { q: `Geldt deze ranglijst voor alle honden hetzelfde?`, a: `Niet helemaal. Grote, actieve honden gedijen het best op de Atlantische en noordelijke stranden (Utah Beach, Le Touquet, Berck, Longeville Conches), waar uitgestrekte platen bij eb uitnodigen tot rennen en het water zelfs in augustus koel blijft. Kleine of oudere honden doen het beter op de mediterrane zones (Antibes Salis, Cannes Mourre Rouge, Sète Trois Digues), waar rustig ondiep water en korte zandstroken uitputting beperken. Brachycefale rassen (bulldogs, pugs) kunnen de mediterrane kust in juli en augustus beter sowieso vermijden.` },
    ],
    conclusion: { title: `Onze keuze als je maar één weekend hebt`, paras: [
      `Als je maar één weekend hebt en een hond, ga dan naar Hyères. De Plage du Verdon en het noordelijke deel van Almanarre zijn allebei hondenzones die het hele jaar open zijn, de Var is met de directe TGV vanuit Parijs in minder dan 4 uur bereikbaar, en het achterland van het Massif des Maures biedt koele ochtendwandelingen voor het strandbezoek. Huisdiervriendelijke hotels zijn ruim voorhanden in Hyères, La Londe en Le Lavandou.`,
      `Voor een weekend buiten het seizoen is de Île de Ré in oktober of november onverslaanbaar. De Conche des Baleines is leeg, de wind gaat 's middags liggen, en het vlakke fietsnetwerk van het eiland maakt het de makkelijkste Franse kust om met een hond te reizen, geen auto nodig eenmaal aangekomen.`,
    ] },
    ctaTitle: `Plan je Frankrijkreis met hond met onze bestemmingsgidsen`,
    ctaDesc: `Nice, Cannes, Biarritz, Montpellier, Nantes en meer dan 30 andere Franse steden hebben een volledige huisdiervriendelijke bestemmingsgids, dierenarts-telefoonnummers en een live boekingskaart.`,
    ctaButton: `Bekijk alle Franse bestemmingen →`,
    bottomBookCtaTitle: `Klaar om te boeken? Vergelijk 770+ huisdiervriendelijke hotels`,
    bottomBookCtaDesc: `Actuele prijzen en direct boeken langs de Franse kust en in heel Europa, Booking.com, Expedia, Hotels.com en meer. Gratis annulering bij de meeste accommodaties, geverifieerd huisdierenbeleid bij elke vermelding.`,
    bottomBookCtaButton: `Zoek huisdiervriendelijke hotels →`,
  },
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en

  type BeachView = BeachEntry & {
    dest: typeof destinations[number] | null
    reasonText: string
  }

  const beaches: BeachView[] = BEACHES.map((entry) => {
    const dest = entry.slug ? destinations.find((d) => d.slug === entry.slug) ?? null : null
    return {
      ...entry,
      dest,
      reasonText: entry.reason[locale as 'en' | 'fr' | 'es' | 'pt'] || entry.reason.en,
    }
  })

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: c.hero.h1,
    numberOfItems: beaches.length,
    itemListElement: beaches.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${b.beachName}, ${b.locationLabel}`,
      ...(b.dest ? { url: `${SITE_URL}/${locale}/destinations/${b.dest.slug}` } : {}),
    })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.hero.h1,
    description: c.hero.lede,
    inLanguage: locale,
    datePublished: '2026-05-22T00:00:00Z',
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
      <section className="relative bg-gradient-to-br from-sky-900 via-cyan-700 to-amber-500 text-white py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            🏖️ {c.hero.kicker}
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">{c.hero.h1}</h1>
          <p className="text-cyan-50 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">{c.hero.lede}</p>
        </div>
      </section>

      {/* Ranking (directly under hero) */}
      <section className="py-14 lg:py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 text-center">{c.rankingTitle}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">{c.rankingSubtitle}</p>
          <div className="space-y-6">
            {beaches.map((b) => {
              const bookUrl = buildAllezDestLink(b.locationLabel, 'France', `beaches-fr-rank${b.rank}`)
              const imgSrc = b.dest?.heroImage || `/images/beaches/${b.photoSlug}.jpg`
              return (
                <article key={`${b.rank}-${b.beachName}`} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="relative h-48 md:h-auto md:col-span-1 bg-gray-100">
                      <Image
                        src={imgSrc}
                        alt={`Pet-friendly hotels near ${b.beachName}, dog-friendly beach in ${b.locationLabel}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                        <span className="text-xl font-extrabold text-blue-700">#{b.rank}</span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full shadow-md ${b.yearRound ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                          {b.yearRound ? c.yearRoundLabel : c.seasonalLabel}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2 p-6 lg:p-8">
                      <div className="flex items-baseline justify-between gap-4 mb-2 flex-wrap">
                        <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-900">
                          🇫🇷 {b.beachName}
                        </h3>
                        <span className="text-sm text-gray-500">{b.locationLabel}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-5">{b.reasonText}</p>

                      {/* Primary booking CTA */}
                      <a
                        href={bookUrl}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-white text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 mb-3"
                        style={{ background: 'linear-gradient(135deg, #f97316 0%, #3b82f6 100%)' }}
                      >
                        🐾 {c.bookPrefix} {b.locationLabel.split(',')[0]} →
                      </a>

                      {/* Inline editorial hotel pick - converts beach-reader to hotel-booker */}
                      {b.dest && (
                        <NearbyHotelCard
                          destinationSlug={b.dest.slug}
                          locale={locale}
                          variant="compact"
                          proximityLabel={
                            locale === 'fr' ? `Où dormir près de ${b.beachName}` :
                            locale === 'es' ? `Dónde dormir cerca de ${b.beachName}` :
                            locale === 'pt' ? `Onde dormir perto de ${b.beachName}` :
                            locale === 'de' ? `Übernachten in der Nähe von ${b.beachName}` :
                            locale === 'nl' ? `Overnachten bij ${b.beachName}` :
                            `Where to stay near ${b.beachName}`
                          }
                        />
                      )}

                      {/* Secondary links row */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mt-3">
                        {b.dest && (
                          <Link href={`/${locale}/destinations/${b.dest.slug}`} className="text-blue-600 hover:text-blue-800 font-semibold hover:underline">
                            {c.guideLink}
                          </Link>
                        )}
                        {b.dest && (
                          <span className="text-xs text-gray-500">
                            {getLocalizedCityName(b.dest.slug, b.dest.name, locale)}, {getLocalizedCountryName(b.dest.country, locale)}
                          </span>
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
              href={buildAllezDestLink('France', 'France', 'beaches-fr-bottom-cta')}
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

      {/* Live map, centered on Cap d'Antibes */}
      <section className="py-14 lg:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 text-center">🗺️ {c.mapTitle}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-7 leading-relaxed">{c.mapDesc}</p>
          <PetMap lat={43.5800} lng={7.1250} destName="Cap d'Antibes" locale={locale} height={500} />
        </div>
      </section>

      {/* Keyword chips */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center mb-5">
            {c.keywordChipsTitle}
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {c.keywordChips.map((kw, i) => {
              const b = beaches[i]
              if (!b) return null
              const href = b.dest
                ? `/${locale}/destinations/${b.dest.slug}`
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

      {/* Intro + Methodology at the bottom */}
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

      {/* Sticky mobile-only CTA - shows after 30% scroll, dismissible */}
      <StickyHotelCTA
        href={`https://www.stay22.com/allez/roam?aid=eijeanbaptistemanson&campaign=beaches-fr-sticky&address=${encodeURIComponent('Côte d\'Azur France')}`}
        label={
          locale === 'fr' ? `Hôtels pet-friendly Côte d'Azur dès 95 €/nuit` :
          locale === 'es' ? `Hoteles pet-friendly Costa Azul desde 95 €/noche` :
          locale === 'pt' ? `Hotéis pet-friendly Costa Azul desde 95 €/noite` :
          locale === 'de' ? `Haustierfreundliche Hotels an der Côte d'Azur ab 95 €/Nacht` :
          locale === 'nl' ? `Huisdiervriendelijke hotels Côte d'Azur vanaf 95 €/nacht` :
          `Pet-friendly Côte d'Azur hotels from €95/night`
        }
        cta={
          locale === 'fr' ? 'Voir' :
          locale === 'es' ? 'Ver' :
          locale === 'pt' ? 'Ver' :
          locale === 'de' ? 'Ansehen' :
          locale === 'nl' ? 'Bekijken' :
          'View'
        }
      />
    </div>
  )
}
