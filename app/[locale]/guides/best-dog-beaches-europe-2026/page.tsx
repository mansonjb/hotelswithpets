import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, STAY22_AID } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'
import { getLocalizedCityName } from '@/lib/cityNames'
import { getLocalizedCountryName } from '@/lib/countries'
import destinations from '@/data/destinations.json'
import NearbyHotelCard from '@/components/NearbyHotelCard'
import StickyHotelCTA from '@/components/StickyHotelCTA'

const SLUG = 'best-dog-beaches-europe-2026'

type Locale = 'en' | 'fr' | 'es' | 'pt' | 'de' | 'nl' | 'it'

// Hand-curated top 25 dog beaches across Europe, sourced from our 105 city guides.
// Each entry is a real verified beach with year-round or near-year-round dog access.
type Beach = {
  rank: number
  name: string
  citySlug: string
  whyEn: string; whyFr: string; whyEs: string; whyDe?: string; whyNl?: string; whyIt?: string
  yearRound: boolean
  coast: 'atlantic' | 'mediterranean' | 'north-sea' | 'baltic' | 'lake'
  imageSlug: string // city-place image filename suffix
}

const BEACHES: Beach[] = [
  {
    rank: 1, name: 'Ilha Deserta', citySlug: 'faro', yearRound: true, coast: 'atlantic',
    imageSlug: 'faro-beaches-praia-da-ilha-deserta',
    whyEn: '10 km of car-free Atlantic barrier island, only one restaurant on the entire island, off-leash year-round on the western 8 km. Reachable by Animaris ferry from Faro Marina in 35 min.',
    whyFr: '10 km d\'île barrière atlantique sans voiture, un seul restaurant sur toute l\'île, sans laisse toute l\'année sur les 8 km à l\'ouest. Accessible par ferry Animaris depuis la marina de Faro en 35 min.',
    whyEs: '10 km de isla barrera atlántica sin coches, un solo restaurante en toda la isla, sin correa todo el año en los 8 km occidentales. Accesible en ferry Animaris desde la Marina de Faro en 35 min.',
    whyDe: '10 km autofreie atlantische Barriereinsel, nur ein Restaurant auf der ganzen Insel, ganzjährig Freilauf auf den westlichen 8 km. Erreichbar per Animaris-Fähre ab der Marina von Faro in 35 Min.',
    whyNl: '10 km autovrij Atlantisch barrière-eiland, met maar één restaurant op het hele eiland, het hele jaar door loslopen op de westelijke 8 km. Bereikbaar met de Animaris-veerboot vanaf Faro Marina in 35 min.',
    whyIt: `10 km di isola barriera atlantica senza auto, con un solo ristorante su tutta l'isola, libera dal guinzaglio tutto l'anno sugli 8 km occidentali. Raggiungibile con il traghetto Animaris dalla Marina di Faro in 35 min.`,
  },
  {
    rank: 2, name: 'Filey Beach', citySlug: 'york', yearRound: true, coast: 'north-sea',
    imageSlug: 'york-beaches-filey-beach',
    whyEn: 'A 5-mile crescent of firm golden sand framed by Filey Brigg headland. The northern end is dog-friendly year-round and the locals\' favourite for off-leash running. Direct LNER train from York in 1h15.',
    whyFr: 'Croissant de 8 km de sable doré ferme bordé par le promontoire de Filey Brigg. L\'extrémité nord est dog-friendly toute l\'année et le favori local pour la course sans laisse. Train LNER direct depuis York en 1h15.',
    whyEs: 'Media luna de 8 km de arena dorada firme delimitada por el promontorio de Filey Brigg. El extremo norte es dog-friendly todo el año y el favorito local para correr sin correa. Tren LNER directo desde York en 1h15.',
    whyDe: 'Ein 8 km langer Halbmond aus festem goldenem Sand, gerahmt vom Filey Brigg. Das nördliche Ende ist ganzjährig hundefreundlich und bei Einheimischen für den Freilauf beliebt. Direkter LNER-Zug ab York in 1h15.',
    whyNl: 'Een 8 km lange halve maan van stevig goudkleurig zand, omlijst door de landtong Filey Brigg. Het noordelijke uiteinde is het hele jaar hondvriendelijk en favoriet bij locals om los te rennen. Directe LNER-trein vanuit York in 1u15.',
    whyIt: `Una mezzaluna di 8 km di sabbia dorata compatta incorniciata dal promontorio di Filey Brigg. L'estremità nord è pet-friendly tutto l'anno ed è la preferita dai locali per correre senza guinzaglio. Treno LNER diretto da York in 1h15.`,
  },
  {
    rank: 3, name: 'Punta Prosciutto (Bau Beach)', citySlug: 'lecce', yearRound: true, coast: 'mediterranean',
    imageSlug: 'lecce-beaches-bau-beach-punta-prosciutto',
    whyEn: 'Dedicated Bau Beach (dog beach) on the Salento\'s Ionian side, fine white sand, shallow turquoise water, sun loungers and umbrellas for owners. 45 min by car west of Lecce.',
    whyFr: 'Bau Beach dédiée côté ionien du Salento, sable blanc fin, eau turquoise peu profonde, transats et parasols pour les maîtres. 45 min en voiture à l\'ouest de Lecce.',
    whyEs: 'Bau Beach dedicada en el lado jónico del Salento, arena blanca fina, agua turquesa poco profunda, tumbonas y sombrillas para los dueños. 45 min en coche al oeste de Lecce.',
    whyDe: 'Eigene Bau Beach (Hundestrand) an der ionischen Seite des Salento, feiner weißer Sand, seichtes türkisfarbenes Wasser, Liegen und Sonnenschirme für die Halter. 45 Min. mit dem Auto westlich von Lecce.',
    whyNl: 'Speciale Bau Beach (hondenstrand) aan de Ionische kant van het Salento, fijn wit zand, ondiep turquoise water, ligstoelen en parasols voor de baasjes. 45 min met de auto ten westen van Lecce.',
    whyIt: `Bau Beach dedicata sul lato ionico del Salento, sabbia bianca fine, acqua turchese poco profonda, lettini e ombrelloni per i padroni. 45 min in auto a ovest di Lecce.`,
  },
  {
    rank: 4, name: 'Praia do Barril (Anchor Cemetery)', citySlug: 'faro', yearRound: true, coast: 'atlantic',
    imageSlug: 'faro-beaches-praia-do-barril',
    whyEn: 'On the Tavira-Ilha de Tavira barrier island, accessible by foot bridge or miniature train from Pedras del Rei. The Cemitério das Âncoras east of the central beach is the year-round dog zone.',
    whyFr: 'Sur l\'île barrière Tavira-Ilha de Tavira, accessible par passerelle ou train miniature depuis Pedras del Rei. Le Cemitério das Âncoras à l\'est de la plage centrale est la zone canine toute l\'année.',
    whyEs: 'En la isla barrera Tavira-Ilha de Tavira, accesible por puente peatonal o tren en miniatura desde Pedras del Rei. El Cemitério das Âncoras al este de la playa central es la zona canina todo el año.',
    whyDe: 'Auf der Barriereinsel Tavira-Ilha de Tavira, erreichbar über eine Fußgängerbrücke oder die Miniaturbahn ab Pedras del Rei. Der Cemitério das Âncoras östlich des Hauptstrands ist die ganzjährige Hundezone.',
    whyNl: 'Op het barrière-eiland Tavira-Ilha de Tavira, bereikbaar via een loopbrug of het minitreintje vanaf Pedras del Rei. De Cemitério das Âncoras ten oosten van het centrale strand is het hele jaar de hondenzone.',
    whyIt: `Sull'isola barriera Tavira-Ilha de Tavira, raggiungibile a piedi tramite passerella o con il trenino dalle Pedras del Rei. Il Cemitério das Âncoras a est della spiaggia centrale è la zona cani aperta tutto l'anno.`,
  },
  {
    rank: 5, name: 'Sandsend Beach', citySlug: 'york', yearRound: true, coast: 'north-sea',
    imageSlug: 'york-beaches-sandsend-beach',
    whyEn: 'A long broad beach 3 miles north of Whitby, among the few major Yorkshire beaches with year-round off-leash freedom along its full length. Backed by jurassic cliffs.',
    whyFr: 'Longue plage large à 5 km au nord de Whitby, l\'une des rares grandes plages du Yorkshire avec liberté sans laisse toute l\'année sur toute sa longueur. Adossée à des falaises jurassiques.',
    whyEs: 'Larga playa amplia a 5 km al norte de Whitby, una de las pocas grandes playas de Yorkshire con libertad sin correa todo el año en toda su longitud. Respaldada por acantilados jurásicos.',
    whyDe: 'Ein langer, breiter Strand 5 km nördlich von Whitby, einer der wenigen großen Yorkshire-Strände mit ganzjährigem Freilauf auf voller Länge. Von Jurafelsen gesäumt.',
    whyNl: 'Een lang, breed strand 5 km ten noorden van Whitby, een van de weinige grote stranden van Yorkshire waar je het hele jaar over de volledige lengte los mag lopen. Met jurassische kliffen op de achtergrond.',
    whyIt: `Una spiaggia lunga e ampia a 5 km a nord di Whitby, tra le poche grandi spiagge dello Yorkshire con libertà dal guinzaglio tutto l'anno su tutta la sua lunghezza. Alle spalle scogliere giurassiche.`,
  },
  {
    rank: 6, name: 'Bellevue Strand', citySlug: 'aarhus', yearRound: true, coast: 'baltic',
    imageSlug: 'aarhus-beaches-bellevue-strand',
    whyEn: 'A signposted year-round dog beach immediately north of Aarhus city centre, flat sand, shallow Baltic water perfect for puppies, accessible by bus 17 in 12 min from the centre.',
    whyFr: 'Plage canine signalée toute l\'année immédiatement au nord du centre d\'Aarhus, sable plat, eaux baltes peu profondes parfaites pour les chiots, accessible en bus 17 en 12 min du centre.',
    whyEs: 'Playa canina señalizada todo el año inmediatamente al norte del centro de Aarhus, arena plana, agua báltica poco profunda perfecta para cachorros, accesible en bus 17 en 12 min del centro.',
    whyDe: 'Ein ausgeschilderter ganzjähriger Hundestrand direkt nördlich der Innenstadt von Aarhus, flacher Sand, seichtes Ostseewasser, perfekt für Welpen, mit Bus 17 in 12 Min. vom Zentrum erreichbar.',
    whyNl: 'Een bewegwijzerd hondenstrand dat het hele jaar open is, direct ten noorden van het centrum van Aarhus, vlak zand, ondiep Oostzeewater perfect voor puppy\'s, bereikbaar met bus 17 in 12 min vanaf het centrum.',
    whyIt: `Una spiaggia per cani segnalata e aperta tutto l'anno appena a nord del centro di Aarhus, sabbia piatta, acque baltiche basse perfette per i cuccioli, raggiungibile con il bus 17 in 12 min dal centro.`,
  },
  {
    rank: 7, name: 'Frassanito', citySlug: 'lecce', yearRound: true, coast: 'mediterranean',
    imageSlug: 'lecce-beaches-spiaggia-per-cani-frassanito',
    whyEn: 'A sandy stretch within the Alimini Lakes natural reserve, 35 min by car north of Otranto. Year-round dog-friendly with shaded pinewood backing, rare on the Salento coast.',
    whyFr: 'Section sablonneuse au sein de la réserve naturelle des lacs Alimini, à 35 min en voiture au nord d\'Otrante. Dog-friendly toute l\'année avec pinède en arrière, rare sur la côte du Salento.',
    whyEs: 'Tramo arenoso dentro de la reserva natural de los lagos Alimini, a 35 min en coche al norte de Otranto. Dog-friendly todo el año con pinar detrás, raro en la costa del Salento.',
    whyDe: 'Ein Sandabschnitt im Naturschutzgebiet der Alimini-Seen, 35 Min. mit dem Auto nördlich von Otranto. Ganzjährig hundefreundlich mit schattigem Pinienwald im Rücken, selten an der Salento-Küste.',
    whyNl: 'Een zandstrook in het natuurreservaat van de Alimini-meren, 35 min met de auto ten noorden van Otranto. Het hele jaar hondvriendelijk met een schaduwrijk pijnbos op de achtergrond, zeldzaam aan de kust van het Salento.',
    whyIt: `Un tratto sabbioso all'interno della riserva naturale dei Laghi Alimini, 35 min in auto a nord di Otranto. Pet-friendly tutto l'anno con pineta ombreggiata alle spalle, rara sulla costa del Salento.`,
  },
  {
    rank: 8, name: 'Hondenstrand Zandvoort', citySlug: 'amsterdam', yearRound: true, coast: 'north-sea',
    imageSlug: 'amsterdam-beaches-zandvoort-aan-zee-dog-beach-hondenstrand',
    whyEn: 'Amsterdam\'s nearest North Sea dog beach, a 1.5 km signposted Hondenstrand at the southern end of Zandvoort. Direct NS train from Amsterdam Centraal in 30 min.',
    whyFr: 'La plage canine de la mer du Nord la plus proche d\'Amsterdam, Hondenstrand signalée d\'1,5 km à l\'extrémité sud de Zandvoort. Train NS direct depuis Amsterdam Centraal en 30 min.',
    whyEs: 'La playa canina del Mar del Norte más cercana a Ámsterdam, Hondenstrand señalizada de 1,5 km en el extremo sur de Zandvoort. Tren NS directo desde Amsterdam Centraal en 30 min.',
    whyDe: 'Amsterdams nächstgelegener Nordsee-Hundestrand, ein ausgeschilderter 1,5 km langer Hondenstrand am südlichen Ende von Zandvoort. Direkter NS-Zug ab Amsterdam Centraal in 30 Min.',
    whyNl: 'Het dichtstbijzijnde Noordzee-hondenstrand van Amsterdam, een bewegwijzerd Hondenstrand van 1,5 km aan het zuidelijke uiteinde van Zandvoort. Directe NS-trein vanaf Amsterdam Centraal in 30 min.',
    whyIt: `La spiaggia per cani sul Mare del Nord più vicina ad Amsterdam, un Hondenstrand segnalato di 1,5 km all'estremità sud di Zandvoort. Treno NS diretto da Amsterdam Centraal in 30 min.`,
  },
  {
    rank: 9, name: 'Westduinpark Dunes', citySlug: 'the-hague', yearRound: true, coast: 'north-sea',
    imageSlug: 'the-hague-beaches-kijkduin-zuiderstrand',
    whyEn: 'Off-leash dunes plus a year-round North Sea dog beach south of Scheveningen, 2 km of unbroken sand walking, the Bosjes van Poot pinewood as backdrop. The most-loved dog walk of The Hague.',
    whyFr: 'Dunes sans laisse plus une plage canine de mer du Nord toute l\'année au sud de Scheveningen, 2 km de sable continu, la pinède des Bosjes van Poot en arrière-plan. La promenade canine préférée de La Haye.',
    whyEs: 'Dunas sin correa más una playa canina del Mar del Norte todo el año al sur de Scheveningen, 2 km de arena continua, el pinar de Bosjes van Poot de fondo. El paseo canino favorito de La Haya.',
    whyDe: 'Freilauf-Dünen plus ein ganzjähriger Nordsee-Hundestrand südlich von Scheveningen, 2 km durchgehender Sandweg, der Pinienwald Bosjes van Poot als Kulisse. Der beliebteste Hundespaziergang Den Haags.',
    whyNl: 'Losloopduinen plus een hondenstrand aan de Noordzee dat het hele jaar open is, ten zuiden van Scheveningen, 2 km aaneengesloten zandstrand om te wandelen, met de Bosjes van Poot als decor. De meest geliefde hondenwandeling van Den Haag.',
    whyIt: `Dune senza guinzaglio più una spiaggia per cani sul Mare del Nord aperta tutto l'anno a sud di Scheveningen, 2 km di sabbia ininterrotta da percorrere, con la pineta dei Bosjes van Poot sullo sfondo. La passeggiata per cani più amata dell'Aia.`,
  },
  {
    rank: 10, name: 'Praia de Faro (West Section)', citySlug: 'faro', yearRound: true, coast: 'atlantic',
    imageSlug: 'faro-beaches-praia-de-faro-west-section',
    whyEn: 'The official praia para cães west of the parking, direct Atlantic exposure, year-round dog access. Bus 14/16 from Faro centre in 20 min, then 10 min walk.',
    whyFr: 'La praia para cães officielle à l\'ouest du parking, exposition atlantique directe, accès canin toute l\'année. Bus 14/16 depuis le centre de Faro en 20 min, puis 10 min à pied.',
    whyEs: 'La praia para cães oficial al oeste del parking, exposición atlántica directa, acceso canino todo el año. Bus 14/16 desde el centro de Faro en 20 min, luego 10 min andando.',
    whyDe: 'Die offizielle praia para cães westlich des Parkplatzes, direkte Atlantiklage, ganzjähriger Hundezugang. Bus 14/16 ab der Innenstadt von Faro in 20 Min., dann 10 Min. zu Fuß.',
    whyNl: 'De officiële praia para cães ten westen van de parkeerplaats, direct aan de Atlantische Oceaan, het hele jaar toegankelijk voor honden. Bus 14/16 vanuit het centrum van Faro in 20 min, daarna 10 min lopen.',
    whyIt: `La praia para cães ufficiale a ovest del parcheggio, esposizione atlantica diretta, accesso per cani tutto l'anno. Bus 14/16 dal centro di Faro in 20 min, poi 10 min a piedi.`,
  },
  {
    rank: 11, name: 'Bridlington South Beach', citySlug: 'york', yearRound: false, coast: 'north-sea',
    imageSlug: 'york-beaches-bridlington-south-beach',
    whyEn: 'Wide southern sands signposted as a dog beach beyond the harbour groynes, about half the total length is dog-friendly year-round. Direct LNER train from York in 1h25.',
    whyFr: 'Larges sables du sud signalés plage canine au-delà des épis du port, environ la moitié de la longueur totale est dog-friendly toute l\'année. Train LNER direct depuis York en 1h25.',
    whyEs: 'Amplias arenas del sur señalizadas como playa canina más allá de los espigones del puerto, alrededor de la mitad de la longitud total es dog-friendly todo el año. Tren LNER directo desde York en 1h25.',
    whyDe: 'Breite Südstrände hinter den Hafenbuhnen, als Hundestrand ausgeschildert, etwa die Hälfte der Gesamtlänge ist ganzjährig hundefreundlich. Direkter LNER-Zug ab York in 1h25.',
    whyNl: 'Brede zuidelijke zandstranden die als hondenstrand zijn aangegeven voorbij de havenhoofden, ongeveer de helft van de totale lengte is het hele jaar hondvriendelijk. Directe LNER-trein vanuit York in 1u25.',
    whyIt: `Ampie sabbie meridionali segnalate come spiaggia per cani oltre i frangiflutti del porto, circa metà della lunghezza totale è pet-friendly tutto l'anno. Treno LNER diretto da York in 1h25.`,
  },
  {
    rank: 12, name: 'Pietersplas Dog-Swim Bay', citySlug: 'maastricht', yearRound: true, coast: 'lake',
    imageSlug: 'maastricht-beaches-pietersplas-dog-swim-bay',
    whyEn: 'Municipal lake 5 km south of central Maastricht with a designated dog-swim bay at the south end. Sandy entry, calm waters. Walkable from the centre via the Maas towpath.',
    whyFr: 'Lac municipal à 5 km au sud du centre de Maastricht avec une baie de baignade canine désignée au sud. Entrée sablonneuse, eaux calmes. Accessible à pied depuis le centre par le chemin de halage de la Meuse.',
    whyEs: 'Lago municipal a 5 km al sur del centro de Maastricht con una bahía designada para el baño canino en el sur. Entrada arenosa, aguas tranquilas. Accesible a pie desde el centro por el camino de sirga del Mosa.',
    whyDe: 'Städtischer See 5 km südlich der Innenstadt von Maastricht mit einer ausgewiesenen Hundeschwimmbucht am Südende. Sandiger Einstieg, ruhige Gewässer. Vom Zentrum aus zu Fuß über den Maas-Leinpfad erreichbar.',
    whyNl: 'Gemeentelijk meer 5 km ten zuiden van het centrum van Maastricht met een aangewezen hondenzwembaai aan het zuidelijke uiteinde. Zandige ingang, rustig water. Lopend bereikbaar vanaf het centrum via het jaagpad langs de Maas.',
    whyIt: `Lago comunale a 5 km a sud del centro di Maastricht con una baia per il bagno dei cani riservata all'estremità sud. Ingresso sabbioso, acque calme. Raggiungibile a piedi dal centro lungo l'alzaia della Mosa.`,
  },
  {
    rank: 13, name: 'Pyynikki Dog Beach', citySlug: 'tampere', yearRound: true, coast: 'lake',
    imageSlug: 'tampere-beaches-pyynikki-dog-beach',
    whyEn: 'Tampere\'s official city dog beach on Lake Pyhäjärvi, sandy entry, dedicated dog zone south of the human swim area. 15 min walk from the centre via the Pyynikki ridge forest.',
    whyFr: 'Plage canine officielle de Tampere sur le lac Pyhäjärvi, entrée sablonneuse, zone canine dédiée au sud de la zone baignade humaine. 15 min à pied du centre par la forêt de la crête de Pyynikki.',
    whyEs: 'Playa canina oficial de Tampere en el lago Pyhäjärvi, entrada arenosa, zona canina dedicada al sur de la zona de baño humana. 15 min andando del centro por el bosque de la cresta de Pyynikki.',
    whyDe: 'Tamperes offizieller städtischer Hundestrand am See Pyhäjärvi, sandiger Einstieg, eigene Hundezone südlich des Badebereichs für Menschen. 15 Min. zu Fuß vom Zentrum durch den Waldkamm von Pyynikki.',
    whyNl: 'Het officiële stedelijke hondenstrand van Tampere aan het meer Pyhäjärvi, zandige ingang, aparte hondenzone ten zuiden van het zwemgebied voor mensen. 15 min lopen vanaf het centrum door het bos op de Pyynikki-rug.',
    whyIt: `La spiaggia per cani ufficiale di Tampere sul lago Pyhäjärvi, ingresso sabbioso, zona cani dedicata a sud dell'area balneare per le persone. 15 min a piedi dal centro attraversando la foresta della cresta di Pyynikki.`,
  },
  {
    rank: 14, name: 'Plage des Marquisats', citySlug: 'annecy', yearRound: true, coast: 'lake',
    imageSlug: 'annecy-beaches-plage-des-marquisats-dog-zone',
    whyEn: 'The official Annecy commune dog beach on the cleanest large lake in Europe (Class A drinking quality), pebbly entry, dedicated water access, 10 min walk from the Vieille Ville.',
    whyFr: 'La plage canine officielle de la commune d\'Annecy sur le grand lac le plus propre d\'Europe (qualité eau potable Classe A), entrée en galets, accès à l\'eau dédié, 10 min à pied de la Vieille Ville.',
    whyEs: 'La playa canina oficial de la comuna de Annecy en el lago grande más limpio de Europa (calidad agua potable Clase A), entrada de guijarros, acceso al agua dedicado, 10 min andando del Casco Antiguo.',
    whyDe: 'Der offizielle Hundestrand der Gemeinde Annecy am saubersten großen See Europas (Trinkwasserqualität Klasse A), Kieseleinstieg, eigener Wasserzugang, 10 Min. zu Fuß von der Vieille Ville.',
    whyNl: 'Het officiële hondenstrand van de gemeente Annecy aan het schoonste grote meer van Europa (drinkwaterkwaliteit Klasse A), kiezelstrand, eigen toegang tot het water, 10 min lopen vanaf de Vieille Ville.',
    whyIt: `La spiaggia per cani ufficiale del comune di Annecy sul più grande lago pulito d'Europa (qualità potabile Classe A), ingresso di ciottoli, accesso all'acqua dedicato, 10 min a piedi dalla Vieille Ville.`,
  },
  {
    rank: 15, name: 'Niihama Dog Beach', citySlug: 'tampere', yearRound: true, coast: 'lake',
    imageSlug: 'tampere-beaches-niihama-dog-beach',
    whyEn: 'Tampere\'s second official dog beach on Lake Näsijärvi within Kauppi Forest, pebbly entry, year-round access, direct connection to 30 km of forest trails.',
    whyFr: 'Deuxième plage canine officielle de Tampere sur le lac Näsijärvi dans la forêt de Kauppi, entrée caillouteuse, accès toute l\'année, connexion directe à 30 km de sentiers forestiers.',
    whyEs: 'Segunda playa canina oficial de Tampere en el lago Näsijärvi dentro del bosque de Kauppi, entrada de guijarros, acceso todo el año, conexión directa a 30 km de senderos forestales.',
    whyDe: 'Tamperes zweiter offizieller Hundestrand am See Näsijärvi im Kauppi-Wald, Kieseleinstieg, ganzjähriger Zugang, direkte Anbindung an 30 km Waldwege.',
    whyNl: 'Het tweede officiële hondenstrand van Tampere aan het meer Näsijärvi in het Kauppi-bos, kiezelstrand, het hele jaar toegankelijk, directe aansluiting op 30 km bospaden.',
    whyIt: `La seconda spiaggia per cani ufficiale di Tampere sul lago Näsijärvi all'interno della foresta di Kauppi, ingresso di ciottoli, accesso tutto l'anno, collegamento diretto a 30 km di sentieri nel bosco.`,
  },
  {
    rank: 16, name: 'Eijsder Beemden', citySlug: 'maastricht', yearRound: true, coast: 'lake',
    imageSlug: 'maastricht-beaches-eijsder-beemden',
    whyEn: '200-hectare nature reserve on the Maas floodplain 12 km south of Maastricht, flat riverside meadows, swimming-grade water, free-roaming Konik horses. Off-leash year-round.',
    whyFr: 'Réserve naturelle de 200 hectares sur la plaine d\'inondation de la Meuse à 12 km au sud de Maastricht, prairies riveraines, eau adaptée à la baignade, chevaux Konik en liberté. Sans laisse toute l\'année.',
    whyEs: 'Reserva natural de 200 hectáreas en la llanura aluvial del Mosa a 12 km al sur de Maastricht, praderas ribereñas, agua apta para el baño, caballos Konik en libertad. Sin correa todo el año.',
    whyDe: '200 Hektar großes Naturschutzgebiet in der Maas-Aue 12 km südlich von Maastricht, flache Uferwiesen, badetaugliches Wasser, frei umherziehende Konik-Pferde. Ganzjährig Freilauf.',
    whyNl: '200 hectare groot natuurgebied in de Maasuiterwaarden 12 km ten zuiden van Maastricht, vlakke oeverweiden, zwemwater van goede kwaliteit, vrij rondlopende Konikpaarden. Het hele jaar loslopen.',
    whyIt: `Riserva naturale di 200 ettari nella pianura alluvionale della Mosa 12 km a sud di Maastricht, prati pianeggianti lungo il fiume, acqua balneabile, cavalli Konik allo stato brado. Senza guinzaglio tutto l'anno.`,
  },
  {
    rank: 17, name: 'Plage de Saint-Jorioz', citySlug: 'annecy', yearRound: true, coast: 'lake',
    imageSlug: 'annecy-beaches-plage-de-saint-jorioz',
    whyEn: 'On Lake Annecy\'s south-west shore, 11 km from Annecy, free-access rural beach with a dog-friendly section just south of the central swim zone. SIBRA bus B from Annecy in 25 min.',
    whyFr: 'Sur la rive sud-ouest du lac d\'Annecy, à 11 km d\'Annecy, plage rurale en accès libre avec section dog-friendly juste au sud de la zone baignade centrale. Bus SIBRA B depuis Annecy en 25 min.',
    whyEs: 'En la orilla suroeste del lago de Annecy, a 11 km de Annecy, playa rural de acceso libre con sección dog-friendly justo al sur de la zona de baño central. Bus SIBRA B desde Annecy en 25 min.',
    whyDe: 'Am Südwestufer des Lac d\'Annecy, 11 km von Annecy entfernt, frei zugänglicher ländlicher Strand mit hundefreundlichem Abschnitt direkt südlich des zentralen Badebereichs. SIBRA-Bus B ab Annecy in 25 Min.',
    whyNl: 'Aan de zuidwestelijke oever van het meer van Annecy, 11 km van Annecy, vrij toegankelijk landelijk strand met een hondvriendelijk gedeelte net ten zuiden van de centrale zwemzone. SIBRA-bus B vanuit Annecy in 25 min.',
    whyIt: `Sulla riva sud-ovest del Lago di Annecy, a 11 km da Annecy, spiaggia rurale ad accesso libero con una sezione pet-friendly subito a sud della zona balneare centrale. Bus SIBRA B da Annecy in 25 min.`,
  },
  {
    rank: 18, name: 'Den Permanente', citySlug: 'aarhus', yearRound: true, coast: 'baltic',
    imageSlug: 'aarhus-beaches-den-permanente',
    whyEn: 'A signposted year-round dog area at the southern Aarhus harbour, direct sand access, calm Baltic shallows, 5 min by tram from Aarhus Hovedbanegård. The most central dog beach in any Nordic capital.',
    whyFr: 'Zone canine signalée toute l\'année au sud du port d\'Aarhus, accès direct au sable, eaux baltes calmes, 5 min en tram depuis la gare d\'Aarhus. La plage canine la plus centrale de toute capitale nordique.',
    whyEs: 'Zona canina señalizada todo el año en el puerto sur de Aarhus, acceso directo a la arena, aguas bálticas tranquilas, 5 min en tranvía desde la estación de Aarhus. La playa canina más céntrica de cualquier capital nórdica.',
    whyDe: 'Eine ausgeschilderte ganzjährige Hundezone am Südhafen von Aarhus, direkter Sandzugang, ruhiges Ostseewasser, 5 Min. mit der Straßenbahn ab dem Hauptbahnhof Aarhus. Der zentralste Hundestrand aller nordischen Hauptstädte.',
    whyNl: 'Een bewegwijzerde hondenzone die het hele jaar open is in de zuidelijke haven van Aarhus, direct toegang tot het zand, rustig ondiep Oostzeewater, 5 min met de tram vanaf Aarhus Hovedbanegård. Het meest centraal gelegen hondenstrand van alle Scandinavische hoofdsteden.',
    whyIt: `Un'area per cani segnalata e aperta tutto l'anno nel porto sud di Aarhus, accesso diretto alla sabbia, acque baltiche basse e calme, 5 min in tram dalla stazione di Aarhus. La spiaggia per cani più centrale tra tutte le capitali nordiche.`,
  },
  {
    rank: 19, name: 'Boschmolenplas', citySlug: 'maastricht', yearRound: true, coast: 'lake',
    imageSlug: 'maastricht-beaches-kelpen-oler-boschmolenplas',
    whyEn: 'Large recreation lake 35 km north of Maastricht with a dedicated dog-swimming zone separated from the family beach, the closest year-round real sand beach with on-site café.',
    whyFr: 'Grand lac de loisirs à 35 km au nord de Maastricht avec une zone de baignade canine dédiée séparée de la zone familiale, la plus proche vraie plage de sable toute l\'année avec café sur place.',
    whyEs: 'Gran lago recreativo a 35 km al norte de Maastricht con una zona de baño canino dedicada separada de la zona familiar, la playa de arena de verdad más cercana todo el año con café en el sitio.',
    whyDe: 'Großer Freizeitsee 35 km nördlich von Maastricht mit eigener Hundeschwimmzone getrennt vom Familienstrand, der nächstgelegene echte Sandstrand mit ganzjährigem Zugang und Café vor Ort.',
    whyNl: 'Groot recreatiemeer 35 km ten noorden van Maastricht met een eigen hondenzwemzone, gescheiden van het familiestrand, het dichtstbijzijnde echte zandstrand dat het hele jaar open is met een café ter plekke.',
    whyIt: `Grande lago ricreativo a 35 km a nord di Maastricht con una zona per il bagno dei cani separata dalla spiaggia per famiglie, la vera spiaggia di sabbia più vicina aperta tutto l'anno con un caffè sul posto.`,
  },
  {
    rank: 20, name: 'Plage de Doussard', citySlug: 'annecy', yearRound: true, coast: 'lake',
    imageSlug: 'annecy-beaches-plage-de-doussard-lake-south-end',
    whyEn: 'Southernmost shore of Lake Annecy at the Bout-du-Lac nature reserve, wild pebble beach, the lake at its narrowest. The 16 km cycle path from Annecy ends here.',
    whyFr: 'La rive la plus au sud du lac d\'Annecy à la réserve naturelle du Bout-du-Lac, plage sauvage de galets, le lac à son plus étroit. La piste cyclable de 16 km depuis Annecy se termine ici.',
    whyEs: 'La orilla más al sur del lago de Annecy en la reserva natural de Bout-du-Lac, playa salvaje de guijarros, el lago en su parte más estrecha. El sendero ciclista de 16 km desde Annecy termina aquí.',
    whyDe: 'Das südlichste Ufer des Lac d\'Annecy im Naturschutzgebiet Bout-du-Lac, wilder Kieselstrand, der See an seiner schmalsten Stelle. Der 16 km lange Radweg ab Annecy endet hier.',
    whyNl: 'De meest zuidelijke oever van het meer van Annecy bij het natuurreservaat Bout-du-Lac, wild kiezelstrand, het meer op zijn smalst. Het fietspad van 16 km vanuit Annecy eindigt hier.',
    whyIt: `La riva più a sud del Lago di Annecy nella riserva naturale del Bout-du-Lac, spiaggia selvaggia di ciottoli, il lago nel suo punto più stretto. La pista ciclabile di 16 km da Annecy finisce qui.`,
  },
  {
    rank: 21, name: 'Torre Chianca / San Cataldo', citySlug: 'lecce', yearRound: true, coast: 'mediterranean',
    imageSlug: 'lecce-beaches-torre-chianca-san-cataldo',
    whyEn: 'The closest beach to Lecce (only 15 min by car), long Adriatic sand and dunes north of San Cataldo, with a year-round dog zone along the Torre Chianca stretch.',
    whyFr: 'La plage la plus proche de Lecce (15 min en voiture), long sable adriatique et dunes au nord de San Cataldo, avec zone canine toute l\'année le long du tronçon Torre Chianca.',
    whyEs: 'La playa más cercana a Lecce (solo 15 min en coche), larga arena adriática y dunas al norte de San Cataldo, con zona canina todo el año a lo largo del tramo Torre Chianca.',
    whyDe: 'Der Strand mit der kürzesten Anfahrt ab Lecce (nur 15 Min. mit dem Auto), langer Adriasand und Dünen nördlich von San Cataldo, mit ganzjähriger Hundezone entlang des Abschnitts Torre Chianca.',
    whyNl: 'Het dichtstbijzijnde strand bij Lecce (slechts 15 min met de auto), lang zand en duinen aan de Adriatische kust ten noorden van San Cataldo, met een hondenzone die het hele jaar open is langs het stuk Torre Chianca.',
    whyIt: `La spiaggia più vicina a Lecce (solo 15 min in auto), lunga sabbia e dune adriatiche a nord di San Cataldo, con una zona cani aperta tutto l'anno lungo il tratto di Torre Chianca.`,
  },
  {
    rank: 22, name: 'Reilinger See', citySlug: 'heidelberg', yearRound: true, coast: 'lake',
    imageSlug: 'heidelberg-beaches-reilinger-see',
    whyEn: '50-hectare quarry lake 25 km west of Heidelberg with a dedicated Hundestrand at the south-east corner, sand beach, summer café, free parking. The closest real beach for the Heidelberg-Mannheim metro.',
    whyFr: 'Lac de carrière de 50 hectares à 25 km à l\'ouest de Heidelberg avec un Hundestrand dédié au coin sud-est, plage de sable, café d\'été, parking gratuit. La plus proche vraie plage pour la métropole Heidelberg-Mannheim.',
    whyEs: 'Lago de cantera de 50 hectáreas a 25 km al oeste de Heidelberg con un Hundestrand dedicado en la esquina sureste, playa de arena, café estival, parking gratis. La playa real más cercana para la metrópoli Heidelberg-Mannheim.',
    whyDe: '50 Hektar großer Baggersee 25 km westlich von Heidelberg mit eigenem Hundestrand in der Südostecke, Sandstrand, Sommercafé, kostenlose Parkplätze. Der nächstgelegene echte Strand für die Metropolregion Heidelberg-Mannheim.',
    whyNl: '50 hectare grote voormalige grindput 25 km ten westen van Heidelberg met een eigen Hundestrand in de zuidoosthoek, zandstrand, zomercafé, gratis parkeren. Het dichtstbijzijnde echte strand voor de metropoolregio Heidelberg-Mannheim.',
    whyIt: `Lago di cava di 50 ettari a 25 km a ovest di Heidelberg con un Hundestrand dedicato nell'angolo sud-est, spiaggia di sabbia, caffè estivo, parcheggio gratuito. La vera spiaggia più vicina per l'area metropolitana Heidelberg-Mannheim.`,
  },
  {
    rank: 23, name: 'Ballehage Strand', citySlug: 'aarhus', yearRound: true, coast: 'baltic',
    imageSlug: 'aarhus-beaches-ballehage-strand',
    whyEn: 'A small wooded cove south of Aarhus on the Marselisborg Forest coast, pebbly entry, year-round dog beach, the calmest Aarhus swim option for anxious dogs.',
    whyFr: 'Petite crique boisée au sud d\'Aarhus sur la côte de la forêt de Marselisborg, entrée caillouteuse, plage canine toute l\'année, l\'option de baignade la plus calme d\'Aarhus pour chiens anxieux.',
    whyEs: 'Pequeña cala boscosa al sur de Aarhus en la costa del bosque de Marselisborg, entrada de guijarros, playa canina todo el año, la opción de baño más tranquila de Aarhus para perros ansiosos.',
    whyDe: 'Eine kleine bewaldete Bucht südlich von Aarhus an der Küste des Marselisborg-Waldes, Kieseleinstieg, ganzjähriger Hundestrand, die ruhigste Badeoption in Aarhus für ängstliche Hunde.',
    whyNl: 'Een kleine beboste inham ten zuiden van Aarhus aan de kust van het Marselisborg-bos, kiezelstrand, hondenstrand het hele jaar open, de rustigste zwemplek van Aarhus voor angstige honden.',
    whyIt: `Una piccola insenatura boscosa a sud di Aarhus sulla costa della foresta di Marselisborg, ingresso di ciottoli, spiaggia per cani aperta tutto l'anno, l'opzione di bagno più tranquilla di Aarhus per i cani ansiosi.`,
  },
  {
    rank: 24, name: 'Viikinsaari Island', citySlug: 'tampere', yearRound: false, coast: 'lake',
    imageSlug: 'tampere-beaches-viikinsaari-island',
    whyEn: 'Car-free pine-covered island on Lake Pyhäjärvi, accessible by 25 min Hopealinjat shuttle from Mustalahti port (June-August). Off-leash forest trails outside the bird-nesting zones.',
    whyFr: 'Île couverte de pins sans voiture sur le lac Pyhäjärvi, accessible par navette Hopealinjat de 25 min depuis le port de Mustalahti (juin-août). Sentiers forestiers sans laisse hors zones de nidification.',
    whyEs: 'Isla cubierta de pinos sin coches en el lago Pyhäjärvi, accesible por lanzadera Hopealinjat de 25 min desde el puerto de Mustalahti (junio-agosto). Senderos forestales sin correa fuera de zonas de nidificación.',
    whyDe: 'Autofreie, pinienbewachsene Insel im See Pyhäjärvi, erreichbar mit der 25-minütigen Hopealinjat-Fähre ab dem Hafen Mustalahti (Juni bis August). Freilauf-Waldwege außerhalb der Vogelbrutzonen.',
    whyNl: 'Autovrij, met dennen begroeid eiland in het meer Pyhäjärvi, bereikbaar met de 25 minuten durende Hopealinjat-pendelboot vanaf de haven van Mustalahti (juni-augustus). Bospaden om los te lopen, buiten de vogelbroedzones.',
    whyIt: `Isola coperta di pini e senza auto sul lago Pyhäjärvi, raggiungibile con la navetta Hopealinjat in 25 min dal porto di Mustalahti (giugno-agosto). Sentieri nel bosco senza guinzaglio fuori dalle zone di nidificazione.`,
  },
  {
    rank: 25, name: 'IJmuiden Beach', citySlug: 'amsterdam', yearRound: true, coast: 'north-sea',
    imageSlug: 'amsterdam-beaches-ijmuiden-beach-strand-ijmuiden',
    whyEn: 'A wide North Sea beach 30 km west of Amsterdam, dunes-and-sand 4 km stretch with a signposted dog zone at the northern end, off-leash year-round. Bus 75 from Sloterdijk in 35 min.',
    whyFr: 'Large plage de mer du Nord à 30 km à l\'ouest d\'Amsterdam, étendue dunes-sable de 4 km avec zone canine signalée à l\'extrémité nord, sans laisse toute l\'année. Bus 75 depuis Sloterdijk en 35 min.',
    whyEs: 'Amplia playa del Mar del Norte a 30 km al oeste de Ámsterdam, extensión dunas-arena de 4 km con zona canina señalizada en el extremo norte, sin correa todo el año. Bus 75 desde Sloterdijk en 35 min.',
    whyDe: 'Ein breiter Nordseestrand 30 km westlich von Amsterdam, 4 km langer Dünen- und Sandabschnitt mit ausgeschilderter Hundezone am nördlichen Ende, ganzjährig Freilauf. Bus 75 ab Sloterdijk in 35 Min.',
    whyNl: 'Een breed Noordzeestrand 30 km ten westen van Amsterdam, een strook duinen en zand van 4 km met een bewegwijzerde hondenzone aan het noordelijke uiteinde, het hele jaar loslopen. Bus 75 vanaf Sloterdijk in 35 min.',
    whyIt: `Un'ampia spiaggia sul Mare del Nord a 30 km a ovest di Amsterdam, un tratto di dune e sabbia di 4 km con una zona cani segnalata all'estremità nord, senza guinzaglio tutto l'anno. Bus 75 da Sloterdijk in 35 min.`,
  },
]

const COUNTRY_TALLY = (() => {
  const tally: Record<string, number> = {}
  for (const b of BEACHES) {
    const country = destinations.find((d) => d.slug === b.citySlug)?.country
    if (country) tally[country] = (tally[country] ?? 0) + 1
  }
  return Object.entries(tally).sort((a, b) => b[1] - a[1])
})()

const STATS = {
  total: BEACHES.length,
  yearRound: BEACHES.filter((b) => b.yearRound).length,
  countries: COUNTRY_TALLY.length,
  cities: new Set(BEACHES.map((b) => b.citySlug)).size,
  coasts: new Set(BEACHES.map((b) => b.coast)).size,
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const titles: Record<string, string> = {
    en: `The 25 Best Dog Beaches in Europe 2026, Year-Round Access, Sand, Forest & Lakes`,
    fr: `Les 25 meilleures plages dog-friendly d'Europe 2026, Accès toute l'année, sable, forêt et lacs`,
    es: `Las 25 mejores playas dog-friendly de Europa 2026, Acceso todo el año, arena, bosque y lagos`,
    pt: `As 25 melhores praias pet-friendly de Europa 2026, Acesso o ano inteiro, areia, floresta e lagos`,
    de: `Die 25 besten Hundestrände in Europa 2026, ganzjähriger Zugang, Sand, Wald & Seen`,
    nl: `De 25 beste hondenstranden van Europa 2026, het hele jaar toegankelijk, zand, bos & meren`,
    it: `Le 25 migliori spiagge per cani in Europa 2026, accesso tutto l'anno, sabbia, bosco e laghi`,
  }
  const descs: Record<string, string> = {
    en: `Curated from our verified data across 105 European cities, the 25 best dog beaches with year-round access, dedicated dog zones, and direct rail or ferry from major cities. Atlantic, Mediterranean, North Sea, Baltic and lakes covered.`,
    fr: `Sélection issue de nos données vérifiées dans 105 villes européennes, les 25 meilleures plages canines avec accès toute l'année, zones canines dédiées et trains ou ferries directs depuis les grandes villes. Atlantique, Méditerranée, mer du Nord, Baltique et lacs couverts.`,
    es: `Selección de nuestros datos verificados en 105 ciudades europeas, las 25 mejores playas caninas con acceso todo el año, zonas caninas dedicadas y trenes o ferries directos desde las grandes ciudades. Atlántico, Mediterráneo, Mar del Norte, Báltico y lagos cubiertos.`,
    pt: `Seleção de nuestros datos verificados en 105 cidades europeias, as 25 melhores praias caninas com acesso o ano inteiro, zonas caninas dedicadas e comboios o ferries directos a partir das grandes cidades. Atlântico, Mediterrâneo, Mar do norte, Báltico e lagos cubiertos.`,
    de: `Zusammengestellt aus unseren verifizierten Daten aus 105 europäischen Städten, die 25 besten Hundestrände mit ganzjährigem Zugang, ausgewiesenen Hundezonen und direkter Bahn- oder Fährverbindung von großen Städten. Atlantik, Mittelmeer, Nordsee, Ostsee und Seen abgedeckt.`,
    nl: `Samengesteld uit onze geverifieerde gegevens over 105 Europese steden, de 25 beste hondenstranden met toegang het hele jaar door, aangewezen hondenzones en directe trein- of veerverbindingen vanuit grote steden. Atlantische Oceaan, Middellandse Zee, Noordzee, Oostzee en meren komen aan bod.`,
    it: `Selezionate dai nostri dati verificati su 105 città europee, le 25 migliori spiagge per cani con accesso tutto l'anno, zone cani dedicate e treni o traghetti diretti dalle grandi città. Atlantico, Mediterraneo, Mare del Nord, Baltico e laghi inclusi.`,
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
        'x-default': `${SITE_URL}/en/guides/${SLUG}`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descs[locale] ?? descs.en,
      type: 'article',
      publishedTime: '2026-05-06T00:00:00Z',
      modifiedTime: `${today}T00:00:00Z`,
    },
  }
}

const COPY: Partial<Record<Locale, {
  kicker: string; h1: string; lede: string
  introTitle: string; introParas: string[]
  countryTitle: string; countryIntro: string
  countriesLabel: string; rankLabel: string; yearRoundBadge: string; seasonalBadge: string
  coastLabels: Record<string, string>
  rankingTitle: string
  ctaTitle: string; ctaDesc: string; ctaButton: string
  faqTitle: string; faqs: { q: string; a: string }[]
  legalTitle: string; legalParas: string[]
  takeawayTitle: string; takeawayParas: string[]
}>> = {
  en: {
    kicker: 'BEST DOG BEACHES · 2026 EDITION',
    h1: `The 25 Best Dog Beaches in Europe`,
    lede: `Curated from our verified data across ${destinations.length} European cities, every beach below has been confirmed dog-accessible by an official municipal sign or year-round bylaw, with a real first-hand description from our city research team.`,
    introTitle: 'How we picked these 25',
    introParas: [
      `European municipal beach laws change every year, but the underlying inventory of "year-round signposted dog beaches" is small. We started from the ${BEACHES.reduce((n) => n + 1, 273)}+ beach entries in our city guides, kept only those with a) a posted municipal dog zone OR b) year-round off-leash access on the rural section, then ranked the survivors by a mix of accessibility (distance from a major airport-rail city), beach quality (sand vs pebbles), and year-round usability.`,
      `Each entry below links back to its parent city guide, where you'll find the full beach card with address, transport, vet number, and dog-friendly hotels nearby, every recommendation can be drilled down to the booking step.`,
    ],
    countryTitle: 'Distribution by country',
    countryIntro: `Europe's best dog beaches are concentrated in five countries. Portugal (Algarve), the UK (Yorkshire & Brighton), Italy (Salento), Denmark (Aarhus) and the Netherlands (North Sea coast) account for ${Math.round(100 * (BEACHES.filter((b) => ['Portugal', 'United Kingdom', 'Italy', 'Denmark', 'Netherlands'].includes(destinations.find((d) => d.slug === b.citySlug)?.country ?? '')).length / BEACHES.length))}% of our top 25.`,
    countriesLabel: 'Top countries',
    rankingTitle: 'The full ranking',
    rankLabel: '#',
    yearRoundBadge: 'Year-round',
    seasonalBadge: 'Seasonal',
    coastLabels: { atlantic: 'Atlantic', mediterranean: 'Mediterranean', 'north-sea': 'North Sea', baltic: 'Baltic', lake: 'Lake / River' },
    ctaTitle: 'Find a pet-friendly hotel near these beaches',
    ctaDesc: 'Every beach in the ranking links to its parent city guide, with verified pet-friendly hotels (5+ per city), pet fees in EUR and direct Booking.com affiliate links.',
    ctaButton: 'Browse all destinations →',
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Are dogs allowed on European beaches in summer?', a: 'It depends on the country and beach. Most municipal beaches in France, Italy, Spain and Portugal exclude dogs from June 1 to September 15-30 except in marked dog zones. The UK, Netherlands, Denmark and Finland have far more permissive rules with year-round access on most beaches.' },
      { q: 'Which European country has the most dog-friendly beaches?', a: 'By absolute count: Portugal (Algarve coast), the UK (Yorkshire and Brighton seafronts) and Italy (Salento, Liguria). By per-capita access: Denmark and the Netherlands, where most North Sea beaches accept dogs year-round outside the central tourist zones.' },
      { q: 'Can I take my dog on a European train to a beach?', a: 'Yes. NS Dutch trains accept leashed dogs free without a muzzle; Finnish VR trains the same. UK LNER and ScotRail accept up to 2 dogs free per passenger. SNCF (France), Trenitalia (Italy), CP (Portugal) and DB (Germany) require a half-fare ticket and a muzzle for medium/large dogs.' },
      { q: 'What about hot sand in summer?', a: 'Atlantic and Mediterranean sand exceeds 50 °C surface temperature in July-August, paw burns are real. Boots, paw balm and beach time before 10:00 / after 18:00 are essential. Northern beaches (Denmark, UK, Netherlands) stay below 35 °C even in heatwaves.' },
      { q: 'Where can I find pet-friendly hotels near these beaches?', a: 'Every beach in this ranking links to its parent city guide, with 5+ verified pet-friendly hotels per city, pet supplements in EUR, and direct Booking.com affiliate links.' },
    ],
    takeawayTitle: 'Key takeaways for 2026',
    takeawayParas: [
      `Year-round dog access is more common than you think, ${STATS.yearRound} of the 25 beaches above are accessible to dogs every day of the year.`,
      `Lakes are an underrated dog-swim option. Class A drinking-water lakes like Annecy (France) and the Tampere lakes (Finland) beat seawater on three counts: cleaner, calmer, and the dog can drink directly.`,
      `Cross-border rail access reshapes the map. Maastricht (NL) ↔ Liège ↔ Aachen, Annecy ↔ Geneva, and York ↔ Filey put proper dog beaches inside a 1h ride of three of Europe's most dog-tolerant cities.`,
    ],
    legalTitle: 'Legal notes, read before driving',
    legalParas: [
      `Beach signage trumps everything. Dog rules on European beaches are set at municipal level and change yearly, always check the on-site sign before unleashing.`,
      `Bird-nesting leash laws apply on most rural beaches between April 1 and August 19. The Mediterranean exempts most fenced dog zones; northern Europe is stricter.`,
      `Always carry a poo bag. Fines range from 50 € (Faro, Lecce) to 100 € (Brighton, York) per offence and are actively enforced by municipal wardens at most beaches in this list.`,
    ],
  },
  fr: {
    kicker: 'MEILLEURES PLAGES CANINES · ÉDITION 2026',
    h1: `Les 25 meilleures plages dog-friendly d'Europe`,
    lede: `Sélection issue de nos données vérifiées dans ${destinations.length} villes européennes, chaque plage ci-dessous a été confirmée comme accessible aux chiens par un panneau municipal officiel ou un arrêté toute l'année, avec une description de première main de notre équipe de recherche urbaine.`,
    introTitle: 'Comment nous avons choisi ces 25',
    introParas: [
      `Les arrêtés communaux européens sur les plages changent chaque année, mais l'inventaire sous-jacent des « plages canines toute l'année signalées » est limité. Nous sommes partis des 273+ plages présentes dans nos guides urbains, n'avons gardé que celles avec a) une zone canine municipale signalée OU b) un accès sans laisse toute l'année sur la section rurale, puis nous avons classé les survivantes selon un mélange d'accessibilité (distance à une grande ville aéroport-rail), de qualité (sable vs galets) et d'utilisabilité toute l'année.`,
      `Chaque entrée ci-dessous renvoie au guide de sa ville parente, où vous trouverez la fiche plage complète avec adresse, transport, numéro vétérinaire et hôtels dog-friendly à proximité, chaque recommandation peut être descendue jusqu'à l'étape réservation.`,
    ],
    countryTitle: 'Répartition par pays',
    countryIntro: `Les meilleures plages canines d'Europe se concentrent dans cinq pays. Portugal (Algarve), Royaume-Uni (Yorkshire & Brighton), Italie (Salento), Danemark (Aarhus) et Pays-Bas (côte mer du Nord) représentent ${Math.round(100 * (BEACHES.filter((b) => ['Portugal', 'United Kingdom', 'Italy', 'Denmark', 'Netherlands'].includes(destinations.find((d) => d.slug === b.citySlug)?.country ?? '')).length / BEACHES.length))} % de notre top 25.`,
    countriesLabel: 'Pays en tête',
    rankingTitle: 'Le classement complet',
    rankLabel: 'Rang',
    yearRoundBadge: 'Toute l\'année',
    seasonalBadge: 'Saisonnière',
    coastLabels: { atlantic: 'Atlantique', mediterranean: 'Méditerranée', 'north-sea': 'Mer du Nord', baltic: 'Baltique', lake: 'Lac / Rivière' },
    ctaTitle: 'Trouvez un hôtel pet-friendly près de ces plages',
    ctaDesc: `Chaque plage du classement renvoie au guide de sa ville parente, avec hôtels pet-friendly vérifiés (5+ par ville), suppléments en EUR et liens d'affiliation Booking.com directs.`,
    ctaButton: 'Toutes les destinations →',
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Les chiens sont-ils admis sur les plages européennes en été ?', a: `Cela dépend du pays et de la plage. La plupart des plages municipales en France, Italie, Espagne et Portugal excluent les chiens du 1er juin au 15-30 septembre sauf dans les zones canines marquées. Le Royaume-Uni, les Pays-Bas, le Danemark et la Finlande ont des règles bien plus permissives avec un accès toute l'année sur la plupart des plages.` },
      { q: 'Quel pays européen a le plus de plages dog-friendly ?', a: `En valeur absolue : Portugal (côte de l'Algarve), Royaume-Uni (front de mer Yorkshire et Brighton) et Italie (Salento, Ligurie). Par habitant : Danemark et Pays-Bas, où la plupart des plages mer du Nord acceptent les chiens toute l'année hors zones touristiques centrales.` },
      { q: 'Puis-je amener mon chien dans un train européen jusqu\'à une plage ?', a: `Oui. Les trains NS néerlandais acceptent les chiens en laisse gratuitement sans muselière ; les trains VR finlandais idem. Les LNER et ScotRail britanniques acceptent jusqu'à 2 chiens gratuits par passager. SNCF (France), Trenitalia (Italie), CP (Portugal) et DB (Allemagne) exigent un billet demi-tarif et une muselière pour les chiens moyens/grands.` },
      { q: 'Et le sable chaud en été ?', a: `Les sables atlantiques et méditerranéens dépassent 50 °C en surface en juillet-août, les brûlures de coussinets sont réelles. Bottines, baume pour coussinets et plage avant 10h / après 18h sont essentiels. Les plages nordiques (Danemark, UK, Pays-Bas) restent sous 35 °C même en canicule.` },
      { q: 'Où trouver des hôtels pet-friendly près de ces plages ?', a: `Chaque plage de ce classement renvoie au guide de sa ville parente, avec 5+ hôtels pet-friendly vérifiés par ville, suppléments en EUR et liens Booking.com d'affiliation directs.` },
    ],
    takeawayTitle: 'À retenir pour 2026',
    takeawayParas: [
      `L'accès canin toute l'année est plus courant qu'on ne le croit, ${STATS.yearRound} des 25 plages ci-dessus sont accessibles aux chiens chaque jour de l'année.`,
      `Les lacs sont une option de baignade canine sous-estimée. Les lacs en eau potable Classe A comme Annecy (France) et les lacs de Tampere (Finlande) battent l'eau de mer sur trois critères : plus propre, plus calme, et le chien peut boire directement.`,
      `L'accès ferroviaire transfrontalier redessine la carte. Maastricht (NL) ↔ Liège ↔ Aix-la-Chapelle, Annecy ↔ Genève, et York ↔ Filey placent de vraies plages canines à 1h de train de trois des villes les plus dog-tolérantes d'Europe.`,
    ],
    legalTitle: 'Notes légales, à lire avant de partir',
    legalParas: [
      `La signalétique sur place fait foi. Les arrêtés sur les plages européennes sont municipaux et changent chaque année, vérifiez toujours le panneau sur place avant de détacher.`,
      `Les lois laisse-nidification s'appliquent sur la plupart des plages rurales du 1er avril au 19 août. La Méditerranée exempte la plupart des zones canines clôturées ; le nord de l'Europe est plus strict.`,
      `Ayez toujours un sac. Les amendes vont de 50 € (Faro, Lecce) à 100 € (Brighton, York) par infraction et sont activement contrôlées par les agents municipaux sur la plupart des plages de cette liste.`,
    ],
  },
  es: {
    kicker: 'MEJORES PLAYAS CANINAS · EDICIÓN 2026',
    h1: `Las 25 mejores playas dog-friendly de Europa`,
    lede: `Selección de nuestros datos verificados en ${destinations.length} ciudades europeas, cada playa de abajo ha sido confirmada como accesible para perros por una señal municipal oficial o una ordenanza todo el año, con una descripción de primera mano de nuestro equipo de investigación urbana.`,
    introTitle: 'Cómo elegimos estas 25',
    introParas: [
      `Las ordenanzas municipales europeas sobre playas cambian cada año, pero el inventario subyacente de « playas caninas todo el año señalizadas » es reducido. Partimos de las 273+ playas de nuestras guías urbanas, conservamos solo las que tenían a) una zona canina municipal señalizada O b) acceso sin correa todo el año en la sección rural, y luego clasificamos las supervivientes con una mezcla de accesibilidad (distancia a una gran ciudad aeropuerto-tren), calidad (arena vs guijarros) y usabilidad todo el año.`,
      `Cada entrada de abajo enlaza con la guía de su ciudad madre, donde encontrarás la ficha completa de la playa con dirección, transporte, número del veterinario y hoteles dog-friendly cercanos, cada recomendación puede bajarse hasta la etapa de reserva.`,
    ],
    countryTitle: 'Distribución por país',
    countryIntro: `Las mejores playas caninas de Europa se concentran en cinco países. Portugal (Algarve), Reino Unido (Yorkshire & Brighton), Italia (Salento), Dinamarca (Aarhus) y Países Bajos (costa del Mar del Norte) representan el ${Math.round(100 * (BEACHES.filter((b) => ['Portugal', 'United Kingdom', 'Italy', 'Denmark', 'Netherlands'].includes(destinations.find((d) => d.slug === b.citySlug)?.country ?? '')).length / BEACHES.length))} % de nuestro top 25.`,
    countriesLabel: 'Países a la cabeza',
    rankingTitle: 'La clasificación completa',
    rankLabel: 'Posición',
    yearRoundBadge: 'Todo el año',
    seasonalBadge: 'Estacional',
    coastLabels: { atlantic: 'Atlántico', mediterranean: 'Mediterráneo', 'north-sea': 'Mar del Norte', baltic: 'Báltico', lake: 'Lago / Río' },
    ctaTitle: 'Encuentra un hotel pet-friendly cerca de estas playas',
    ctaDesc: `Cada playa de la clasificación enlaza con la guía de su ciudad madre, con hoteles pet-friendly verificados (5+ por ciudad), suplementos en EUR y enlaces directos de afiliación a Booking.com.`,
    ctaButton: 'Todos los destinos →',
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Se admiten perros en las playas europeas en verano?', a: `Depende del país y de la playa. La mayoría de las playas municipales en Francia, Italia, España y Portugal excluyen perros del 1 de junio al 15-30 de septiembre salvo en zonas caninas marcadas. Reino Unido, Países Bajos, Dinamarca y Finlandia tienen normas mucho más permisivas con acceso todo el año en la mayoría de las playas.` },
      { q: '¿Qué país europeo tiene más playas dog-friendly?', a: `En valor absoluto: Portugal (costa del Algarve), Reino Unido (paseos marítimos de Yorkshire y Brighton) e Italia (Salento, Liguria). Per cápita: Dinamarca y Países Bajos, donde la mayoría de las playas del Mar del Norte admite perros todo el año fuera de las zonas turísticas centrales.` },
      { q: '¿Puedo llevar a mi perro en un tren europeo a una playa?', a: `Sí. Los trenes NS holandeses admiten perros con correa gratis sin bozal; los trenes VR finlandeses igual. Los LNER y ScotRail británicos admiten hasta 2 perros gratis por pasajero. SNCF (Francia), Trenitalia (Italia), CP (Portugal) y DB (Alemania) exigen billete a media tarifa y bozal para perros medianos/grandes.` },
      { q: '¿Qué hay de la arena caliente en verano?', a: `Las arenas atlánticas y mediterráneas superan los 50 °C en superficie en julio-agosto, las quemaduras en almohadillas son reales. Botines, bálsamo para almohadillas y playa antes de las 10:00 / después de las 18:00 son esenciales. Las playas nórdicas (Dinamarca, UK, Países Bajos) se mantienen por debajo de 35 °C incluso en olas de calor.` },
      { q: '¿Dónde encontrar hoteles pet-friendly cerca de estas playas?', a: `Cada playa de esta clasificación enlaza con la guía de su ciudad madre, con 5+ hoteles pet-friendly verificados por ciudad, suplementos en EUR y enlaces directos de afiliación a Booking.com.` },
    ],
    takeawayTitle: 'Lo que hay que recordar para 2026',
    takeawayParas: [
      `El acceso canino todo el año es más común de lo que se cree, ${STATS.yearRound} de las 25 playas de arriba son accesibles a perros todos los días del año.`,
      `Los lagos son una opción de baño canino infravalorada. Los lagos con agua potable Clase A como Annecy (Francia) y los lagos de Tampere (Finlandia) baten al agua de mar en tres criterios: más limpia, más tranquila, y el perro puede beber directamente.`,
      `El acceso ferroviario transfronterizo rediseña el mapa. Maastricht (NL) ↔ Lieja ↔ Aquisgrán, Annecy ↔ Ginebra, y York ↔ Filey colocan playas caninas reales a 1h de tren de tres de las ciudades más dog-tolerantes de Europa.`,
    ],
    legalTitle: 'Notas legales, léelas antes de ir',
    legalParas: [
      `La señalización en el sitio prevalece. Las ordenanzas sobre playas europeas son municipales y cambian cada año, comprueba siempre la señal en el sitio antes de soltar.`,
      `Las leyes de correa por nidificación se aplican en la mayoría de las playas rurales del 1 de abril al 19 de agosto. El Mediterráneo exime la mayoría de las zonas caninas valladas; el norte de Europa es más estricto.`,
      `Lleva siempre una bolsa. Las multas van de 50 € (Faro, Lecce) a 100 € (Brighton, York) por infracción y se controlan activamente por los agentes municipales en la mayoría de las playas de esta lista.`,
    ],
  },
  pt: {
    kicker: 'MELHORES Praias Caninas · Edição 2026',
    h1: `As 25 MELHORES praias pet-friendly de Europa`,
    lede: `Seleção de nuestros datos verificados en ${destinations.length} cidades europeias, cada praia de abajo foi confirmada como acessível para cães por uma sinal municipal oficial o uma ordenanza o ano inteiro, com uma descrição de primera mano de nuestro equipo de investigación urbana.`,
    introTitle: 'Como escolhemos estas 25',
    introParas: [
      `As ordenanzas municipales europeias sobre praias cambian cada ano, mas o inventário subyacente de « praias caninas o ano inteiro senhalizadas » é reducido. Partimos das 273+ praias de nuestras guías urbanas, conservamos só as que tenían a) uma zona canina municipal senhalizada O b) acesso sem trela o ano inteiro na sección rural, e luego clasificamos as supervivientes com uma mezcla de accesibilidad (distancia a uma GRANDE cidade aeroporto-comboio), qualidade (areia vs guijarros) e usabilidad o ano inteiro.`,
      `Cada entrada de abajo liga com a guía do seu cidade madre, onde encontrarás a ficha completa da praia com direção, transporte, número do veterinário e hotéis pet-friendly cercanos, cada recomendación pode bajarse até a etapa de reserva.`,
    ],
    countryTitle: 'Distribución por país',
    countryIntro: `As MELHORES praias caninas de Europa se concentran em cinco países. Portugal (Algarve), Reino Unido (Yorkshire & Brighton), Italia (Salento), Dinamarca (Aarhus) e Países Bajos (costa do mar do norte) representan o ${Math.round(100 * (BEACHES.filter((b) => ['Portugal', 'United Kingdom', 'Italy', 'Denmark', 'Netherlands'].includes(destinations.find((d) => d.slug === b.citySlug)?.country ?? '')).length / BEACHES.length))} % de nuestro top 25.`,
    countriesLabel: 'Países a cabeza',
    rankingTitle: 'A clasificación completa',
    rankLabel: 'Posición',
    yearRoundBadge: 'O ano inteiro',
    seasonalBadge: 'Sazonal',
    coastLabels: { atlantic: 'Atlântico', mediterranean: 'Mediterrâneo', 'north-sea': 'Mar do norte', baltic: 'Báltico', lake: 'Lago / Rio' },
    ctaTitle: 'Encuentra um hotel pet-friendly perto destas praias',
    ctaDesc: `Cada praia da clasificación liga com a guía do seu cidade madre, com hotéis pet-friendly verificados (5+ por cidade), suplementos em EUR e ligações directos de afiliación a Booking.com.`,
    ctaButton: 'Todos os destinos →',
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: 'Se admitem cães nas praias europeias em verão?', a: `Depende do país e da praia. A maioria das praias municipales em Francia, Italia, Espanha e Portugal excluyen cães do 1 de junho ao 15-30 de setembro salvo em zonas caninas marcadas. Reino Unido, Países Bajos, Dinamarca e Finlândia têm normas muito mais permisivas com acesso o ano inteiro na maioria das praias.` },
      { q: 'Que país europeu tem mais praias pet-friendly?', a: `Em valor absoluto: Portugal (costa do Algarve), Reino Unido (passeios marítimos de Yorkshire e Brighton) e Italia (Salento, Liguria). Per cápita: Dinamarca e Países Bajos, onde a maioria das praias do mar do norte admite cães o ano inteiro fora das zonas turísticas centrales.` },
      { q: 'Puedo levar a mi cão num comboio europeu a uma praia?', a: `Sí. Os comboios NS neerlandeses admitem cães com trela grátis sem bozal; os comboios VR finlandeses igual. Os LNER e ScotRail britânicos admitem até 2 cães grátis por pasajero. SNCF (Francia), Trenitalia (Italia), CP (Portugal) e DB (Alemania) exigen bilhete a meio preço e bozal para cães medianos/grandes.` },
      { q: 'Que hay da areia caliente em verão?', a: `As arenas atlánticas e mediterráneas superan os 50 °C em superficie em julho-agosto, as quemaduras em almohadillas são reales. Botines, bálsamo para almohadillas e praia antes das 10:00 / depois das 18:00 são esenciales. As praias nórdicas (Dinamarca, UK, Países Bajos) se mantienen por debajo de 35 °C mesmo em olas de calor.` },
      { q: 'Dónde encontrar hotéis pet-friendly perto destas praias?', a: `Cada praia desta clasificación liga com a guía do seu cidade madre, com 5+ hotéis pet-friendly verificados por cidade, suplementos em EUR e ligações directos de afiliación a Booking.com.` },
    ],
    takeawayTitle: 'Lo que hay que recordar para 2026',
    takeawayParas: [
      `O acesso canino o ano inteiro é mais común de lo que se cree, ${STATS.yearRound} das 25 praias de arriba são acessíveis a cães todos os dias do ano.`,
      `Os lagos são uma opção de banho canino infravalorada. Os lagos com água potable Clase A como Annecy (Francia) e os lagos de Tampere (Finlândia) baten al água de mar em tres critérios: mais limpia, mais tranquila, e o cão pode beber directamente.`,
      `O acesso ferroviario transfronterizo redisenha o mapa. Maastricht (NL) ↔ Lieja ↔ Aquisgrán, Annecy ↔ Genebra, e York ↔ Filey colocan praias caninas reales a 1h de comboio de tres das cidades mais dog-tolerantes de Europa.`,
    ],
    legalTitle: 'Notas legales, léelas antes de ir',
    legalParas: [
      `A senhalización no sitio prevalece. As ordenanzas sobre praias europeias são municipales e cambian cada ano, comprueba sempre a sinal no sitio antes de soltar.`,
      `As leis de trela por nidificación se aplicam na maioria das praias rurales do 1 de abril ao 19 de agosto. O Mediterrâneo exime a maioria das zonas caninas vedadas; o norte de Europa é mais rigoroso.`,
      `Leva sempre uma bolsa. As multas van de 50 € (Faro, Lecce) a 100 € (Brighton, York) por infração e se controlan activamente pelos agentes municipales na maioria das praias desta lista.`,
    ],
  },
  de: {
    kicker: 'BESTE HUNDESTRÄNDE · AUSGABE 2026',
    h1: `Die 25 besten Hundestrände in Europa`,
    lede: `Zusammengestellt aus unseren verifizierten Daten aus ${destinations.length} europäischen Städten, wurde jeder Strand unten durch ein offizielles Gemeindeschild oder eine ganzjährige Verordnung als hundefreundlich zugänglich bestätigt, mit einer authentischen Beschreibung aus erster Hand von unserem Stadtrecherche-Team.`,
    introTitle: 'Wie wir diese 25 ausgewählt haben',
    introParas: [
      `Die europäischen Gemeindevorschriften für Strände ändern sich jedes Jahr, doch der zugrunde liegende Bestand an "ganzjährig ausgeschilderten Hundestränden" ist klein. Wir sind von den ${BEACHES.reduce((n) => n + 1, 273)}+ Strandeinträgen in unseren Stadtführern ausgegangen, haben nur jene behalten, die a) eine ausgewiesene kommunale Hundezone ODER b) ganzjährigen Freilauf im ländlichen Abschnitt bieten, und anschließend die verbliebenen nach einer Mischung aus Erreichbarkeit (Entfernung zu einer großen Flughafen-Bahn-Stadt), Strandqualität (Sand vs. Kiesel) und ganzjähriger Nutzbarkeit gereiht.`,
      `Jeder Eintrag unten verlinkt zurück zum zugehörigen Stadtführer, wo Sie die vollständige Strandkarte mit Adresse, Anreise, Tierarztnummer und nahegelegenen hundefreundlichen Hotels finden, jede Empfehlung lässt sich bis zum Buchungsschritt weiterverfolgen.`,
    ],
    countryTitle: 'Verteilung nach Land',
    countryIntro: `Die besten Hundestrände Europas konzentrieren sich auf fünf Länder. Portugal (Algarve), Großbritannien (Yorkshire & Brighton), Italien (Salento), Dänemark (Aarhus) und die Niederlande (Nordseeküste) machen ${Math.round(100 * (BEACHES.filter((b) => ['Portugal', 'United Kingdom', 'Italy', 'Denmark', 'Netherlands'].includes(destinations.find((d) => d.slug === b.citySlug)?.country ?? '')).length / BEACHES.length))}% unserer Top 25 aus.`,
    countriesLabel: 'Top-Länder',
    rankingTitle: 'Die vollständige Rangliste',
    rankLabel: '#',
    yearRoundBadge: 'Ganzjährig',
    seasonalBadge: 'Saisonal',
    coastLabels: { atlantic: 'Atlantik', mediterranean: 'Mittelmeer', 'north-sea': 'Nordsee', baltic: 'Ostsee', lake: 'See / Fluss' },
    ctaTitle: 'Finden Sie ein haustierfreundliches Hotel in der Nähe dieser Strände',
    ctaDesc: `Jeder Strand in der Rangliste verlinkt zu seinem zugehörigen Stadtführer, mit verifizierten haustierfreundlichen Hotels (5+ pro Stadt), Haustiergebühren in EUR und direkten Booking.com-Affiliate-Links.`,
    ctaButton: 'Alle Reiseziele ansehen →',
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      { q: 'Sind Hunde im Sommer an europäischen Stränden erlaubt?', a: `Das hängt vom Land und vom Strand ab. Die meisten Gemeindestrände in Frankreich, Italien, Spanien und Portugal schließen Hunde vom 1. Juni bis 15.-30. September aus, außer in ausgewiesenen Hundezonen. Großbritannien, die Niederlande, Dänemark und Finnland haben deutlich großzügigere Regeln mit ganzjährigem Zugang an den meisten Stränden.` },
      { q: 'Welches europäische Land hat die meisten hundefreundlichen Strände?', a: `In absoluten Zahlen: Portugal (Algarve-Küste), Großbritannien (Strandpromenaden von Yorkshire und Brighton) und Italien (Salento, Ligurien). Pro Kopf: Dänemark und die Niederlande, wo die meisten Nordseestrände außerhalb der zentralen Touristenzonen ganzjährig Hunde akzeptieren.` },
      { q: `Kann ich meinen Hund in einem europäischen Zug zu einem Strand mitnehmen?`, a: `Ja. Niederländische NS-Züge nehmen angeleinte Hunde kostenlos und ohne Maulkorb mit, finnische VR-Züge ebenso. Die britischen LNER und ScotRail nehmen bis zu 2 Hunde kostenlos pro Fahrgast mit. SNCF (Frankreich), Trenitalia (Italien), CP (Portugal) und DB (Deutschland) verlangen ein Halbtarif-Ticket und einen Maulkorb für mittelgroße/große Hunde.` },
      { q: 'Was ist mit heißem Sand im Sommer?', a: `Atlantik- und Mittelmeersand überschreitet im Juli/August 50 °C Oberflächentemperatur, Pfotenverbrennungen sind real. Schuhe, Pfotenbalsam und Strandzeit vor 10:00 / nach 18:00 Uhr sind unverzichtbar. Nördliche Strände (Dänemark, UK, Niederlande) bleiben auch bei Hitzewellen unter 35 °C.` },
      { q: 'Wo finde ich haustierfreundliche Hotels in der Nähe dieser Strände?', a: `Jeder Strand in dieser Rangliste verlinkt zu seinem zugehörigen Stadtführer, mit 5+ verifizierten haustierfreundlichen Hotels pro Stadt, Haustierzuschlägen in EUR und direkten Booking.com-Affiliate-Links.` },
    ],
    takeawayTitle: 'Die wichtigsten Erkenntnisse für 2026',
    takeawayParas: [
      `Ganzjähriger Hundezugang ist häufiger, als man denkt, ${STATS.yearRound} der 25 oben genannten Strände sind an jedem Tag des Jahres für Hunde zugänglich.`,
      `Seen sind eine unterschätzte Option zum Hundeschwimmen. Trinkwasserseen der Klasse A wie Annecy (Frankreich) und die Seen von Tampere (Finnland) schlagen das Meerwasser in drei Punkten: sauberer, ruhiger, und der Hund kann direkt daraus trinken.`,
      `Grenzüberschreitende Bahnverbindungen verändern die Landkarte. Maastricht (NL) ↔ Lüttich ↔ Aachen, Annecy ↔ Genf und York ↔ Filey bringen echte Hundestrände in eine Stunde Fahrzeit von drei der hundefreundlichsten Städte Europas.`,
    ],
    legalTitle: 'Rechtliche Hinweise, vor der Abfahrt lesen',
    legalParas: [
      `Die Beschilderung vor Ort hat immer Vorrang. Hunderegeln an europäischen Stränden werden auf Gemeindeebene festgelegt und ändern sich jährlich, prüfen Sie vor dem Ableinen stets das Schild vor Ort.`,
      `Leinenpflichten wegen Vogelbrut gelten an den meisten ländlichen Stränden vom 1. April bis 19. August. Das Mittelmeer nimmt die meisten eingezäunten Hundezonen davon aus, Nordeuropa ist strenger.`,
      `Führen Sie immer einen Kotbeutel mit. Bußgelder reichen von 50 € (Faro, Lecce) bis 100 € (Brighton, York) pro Verstoß und werden an den meisten Stränden dieser Liste aktiv von kommunalen Aufsichtspersonen kontrolliert.`,
    ],
  },
  nl: {
    kicker: 'BESTE HONDENSTRANDEN · EDITIE 2026',
    h1: `De 25 beste hondenstranden van Europa`,
    lede: `Samengesteld uit onze geverifieerde gegevens over ${destinations.length} Europese steden, is elk strand hieronder bevestigd als toegankelijk voor honden door een officieel gemeentebord of een verordening die het hele jaar geldt, met een echte beschrijving uit de eerste hand van ons stadsonderzoeksteam.`,
    introTitle: 'Hoe we deze 25 hebben gekozen',
    introParas: [
      `De Europese gemeentelijke strandregels veranderen elk jaar, maar het onderliggende bestand aan "het hele jaar bewegwijzerde hondenstranden" is klein. We zijn uitgegaan van de ${BEACHES.reduce((n) => n + 1, 273)}+ strandvermeldingen in onze stadsgidsen, hebben alleen die behouden met a) een aangegeven gemeentelijke hondenzone OF b) het hele jaar losloopgebied op het landelijke gedeelte, en hebben de overgebleven stranden vervolgens gerangschikt op basis van een mix van bereikbaarheid (afstand tot een grote luchthaven-treinstad), strandkwaliteit (zand versus kiezels) en bruikbaarheid het hele jaar door.`,
      `Elke vermelding hieronder linkt terug naar de bijbehorende stadsgids, waar je de volledige strandkaart vindt met adres, vervoer, dierenartsnummer en hondvriendelijke hotels in de buurt, elke aanbeveling kun je doorklikken tot aan de boekingsstap.`,
    ],
    countryTitle: 'Verdeling per land',
    countryIntro: `De beste hondenstranden van Europa concentreren zich in vijf landen. Portugal (Algarve), het Verenigd Koninkrijk (Yorkshire & Brighton), Italië (Salento), Denemarken (Aarhus) en Nederland (Noordzeekust) zijn goed voor ${Math.round(100 * (BEACHES.filter((b) => ['Portugal', 'United Kingdom', 'Italy', 'Denmark', 'Netherlands'].includes(destinations.find((d) => d.slug === b.citySlug)?.country ?? '')).length / BEACHES.length))}% van onze top 25.`,
    countriesLabel: 'Toplanden',
    rankingTitle: 'De volledige ranglijst',
    rankLabel: '#',
    yearRoundBadge: 'Het hele jaar',
    seasonalBadge: 'Seizoensgebonden',
    coastLabels: { atlantic: 'Atlantische Oceaan', mediterranean: 'Middellandse Zee', 'north-sea': 'Noordzee', baltic: 'Oostzee', lake: 'Meer / Rivier' },
    ctaTitle: 'Vind een huisdiervriendelijk hotel bij deze stranden',
    ctaDesc: `Elk strand in de ranglijst linkt naar de bijbehorende stadsgids, met geverifieerde huisdiervriendelijke hotels (5+ per stad), huisdiertoeslagen in EUR en directe Booking.com-affiliatelinks.`,
    ctaButton: 'Bekijk alle bestemmingen →',
    faqTitle: 'Veelgestelde vragen',
    faqs: [
      { q: `Zijn honden 's zomers toegestaan op Europese stranden?`, a: `Dat hangt af van het land en het strand. De meeste gemeentelijke stranden in Frankrijk, Italië, Spanje en Portugal sluiten honden uit van 1 juni tot 15-30 september, behalve in aangegeven hondenzones. Het Verenigd Koninkrijk, Nederland, Denemarken en Finland hebben veel soepelere regels met toegang het hele jaar door op de meeste stranden.` },
      { q: 'Welk Europees land heeft de meeste hondvriendelijke stranden?', a: `In absolute aantallen: Portugal (Algarvekust), het Verenigd Koninkrijk (boulevards van Yorkshire en Brighton) en Italië (Salento, Ligurië). Per hoofd van de bevolking: Denemarken en Nederland, waar de meeste Noordzeestranden buiten de centrale toeristenzones het hele jaar honden toelaten.` },
      { q: `Kan ik mijn hond meenemen in een Europese trein naar een strand?`, a: `Ja. Nederlandse NS-treinen laten aangelijnde honden gratis en zonder muilkorf toe; Finse VR-treinen hetzelfde. De Britse LNER en ScotRail laten tot 2 honden gratis per reiziger toe. SNCF (Frankrijk), Trenitalia (Italië), CP (Portugal) en DB (Duitsland) vereisen een halftariefticket en een muilkorf voor middelgrote/grote honden.` },
      { q: 'Wat met heet zand in de zomer?', a: `Atlantisch en mediterraan zand overschrijdt in juli-augustus een oppervlaktetemperatuur van 50 °C, brandwonden aan de pootjes zijn reëel. Laarsjes, pootbalsem en strandtijd voor 10:00 / na 18:00 uur zijn essentieel. Noordelijke stranden (Denemarken, VK, Nederland) blijven zelfs bij hittegolven onder de 35 °C.` },
      { q: 'Waar vind ik huisdiervriendelijke hotels bij deze stranden?', a: `Elk strand in deze ranglijst linkt naar de bijbehorende stadsgids, met 5+ geverifieerde huisdiervriendelijke hotels per stad, huisdiertoeslagen in EUR en directe Booking.com-affiliatelinks.` },
    ],
    takeawayTitle: 'De belangrijkste inzichten voor 2026',
    takeawayParas: [
      `Toegang voor honden het hele jaar door komt vaker voor dan je denkt, ${STATS.yearRound} van de 25 stranden hierboven zijn elke dag van het jaar toegankelijk voor honden.`,
      `Meren zijn een ondergewaardeerde optie om met je hond te zwemmen. Meren met drinkwaterkwaliteit Klasse A zoals Annecy (Frankrijk) en de meren van Tampere (Finland) verslaan zeewater op drie punten: schoner, rustiger, en je hond kan er direct uit drinken.`,
      `Grensoverschrijdende treinverbindingen tekenen de kaart opnieuw. Maastricht (NL) ↔ Luik ↔ Aken, Annecy ↔ Genève, en York ↔ Filey brengen echte hondenstranden binnen een uur reizen van drie van de meest hondvriendelijke steden van Europa.`,
    ],
    legalTitle: 'Juridische opmerkingen, lees dit voor je vertrekt',
    legalParas: [
      `De bebording ter plekke is altijd leidend. Regels voor honden op Europese stranden worden op gemeentelijk niveau vastgesteld en veranderen jaarlijks, controleer altijd het bord ter plekke voordat je loslaat.`,
      `Aanlijnplicht wegens vogelbroed geldt op de meeste landelijke stranden van 1 april tot 19 augustus. De Middellandse Zee stelt de meeste omheinde hondenzones hiervan vrij; Noord-Europa is strenger.`,
      `Neem altijd een poepzakje mee. Boetes lopen uiteen van 50 € (Faro, Lecce) tot 100 € (Brighton, York) per overtreding en worden op de meeste stranden in deze lijst actief gecontroleerd door gemeentelijke toezichthouders.`,
    ],
  },
  it: {
    kicker: 'MIGLIORI SPIAGGE PER CANI · EDIZIONE 2026',
    h1: `Le 25 migliori spiagge per cani in Europa`,
    lede: `Selezionate dai nostri dati verificati su ${destinations.length} città europee, ogni spiaggia qui sotto è stata confermata accessibile ai cani da un cartello comunale ufficiale o da un'ordinanza valida tutto l'anno, con una descrizione di prima mano del nostro team di ricerca cittadina.`,
    introTitle: 'Come abbiamo scelto queste 25',
    introParas: [
      `Le ordinanze comunali europee sulle spiagge cambiano ogni anno, ma l'inventario di base delle "spiagge per cani segnalate e aperte tutto l'anno" è ridotto. Siamo partiti dalle ${BEACHES.reduce((n) => n + 1, 273)}+ spiagge presenti nelle nostre guide cittadine, abbiamo tenuto solo quelle con a) una zona cani comunale segnalata OPPURE b) accesso senza guinzaglio tutto l'anno nel tratto rurale, poi abbiamo classificato le superstiti in base a un mix di accessibilità (distanza da una grande città con aeroporto e treno), qualità della spiaggia (sabbia contro ciottoli) e usabilità tutto l'anno.`,
      `Ogni voce qui sotto rimanda alla guida della città di riferimento, dove trovi la scheda completa della spiaggia con indirizzo, trasporti, numero del veterinario e hotel pet-friendly nelle vicinanze, ogni consiglio si può seguire fino al passo della prenotazione.`,
    ],
    countryTitle: 'Distribuzione per paese',
    countryIntro: `Le migliori spiagge per cani d'Europa si concentrano in cinque paesi. Portogallo (Algarve), Regno Unito (Yorkshire e Brighton), Italia (Salento), Danimarca (Aarhus) e Paesi Bassi (costa del Mare del Nord) rappresentano il ${Math.round(100 * (BEACHES.filter((b) => ['Portugal', 'United Kingdom', 'Italy', 'Denmark', 'Netherlands'].includes(destinations.find((d) => d.slug === b.citySlug)?.country ?? '')).length / BEACHES.length))}% della nostra top 25.`,
    countriesLabel: 'Paesi in testa',
    rankingTitle: 'La classifica completa',
    rankLabel: '#',
    yearRoundBadge: 'Tutto l\'anno',
    seasonalBadge: 'Stagionale',
    coastLabels: { atlantic: 'Atlantico', mediterranean: 'Mediterraneo', 'north-sea': 'Mare del Nord', baltic: 'Baltico', lake: 'Lago / Fiume' },
    ctaTitle: 'Trova un hotel pet-friendly vicino a queste spiagge',
    ctaDesc: `Ogni spiaggia della classifica rimanda alla guida della città di riferimento, con hotel pet-friendly verificati (5+ per città), supplementi per animali in EUR e link di affiliazione diretti a Booking.com.`,
    ctaButton: 'Guarda tutte le destinazioni →',
    faqTitle: 'Domande frequenti',
    faqs: [
      { q: 'I cani sono ammessi sulle spiagge europee in estate?', a: `Dipende dal paese e dalla spiaggia. La maggior parte delle spiagge comunali in Francia, Italia, Spagna e Portogallo esclude i cani dal 1 giugno al 15-30 settembre, tranne nelle zone cani segnalate. Regno Unito, Paesi Bassi, Danimarca e Finlandia hanno regole molto più permissive, con accesso tutto l'anno sulla maggior parte delle spiagge.` },
      { q: 'Quale paese europeo ha più spiagge pet-friendly?', a: `In valore assoluto: Portogallo (costa dell'Algarve), Regno Unito (lungomari di Yorkshire e Brighton) e Italia (Salento, Liguria). Per abitante: Danimarca e Paesi Bassi, dove la maggior parte delle spiagge del Mare del Nord accetta cani tutto l'anno fuori dalle zone turistiche centrali.` },
      { q: 'Posso portare il mio cane su un treno europeo fino a una spiaggia?', a: `Sì. I treni NS olandesi accettano cani al guinzaglio gratis senza museruola; i treni VR finlandesi allo stesso modo. Gli LNER e ScotRail britannici accettano fino a 2 cani gratis per passeggero. SNCF (Francia), Trenitalia (Italia), CP (Portogallo) e DB (Germania) richiedono un biglietto a tariffa ridotta e la museruola per cani medi/grandi.` },
      { q: 'E la sabbia bollente in estate?', a: `La sabbia atlantica e mediterranea supera i 50 °C in superficie a luglio-agosto, le scottature ai polpastrelli sono reali. Stivaletti, balsamo per zampe e spiaggia prima delle 10:00 / dopo le 18:00 sono essenziali. Le spiagge nordiche (Danimarca, UK, Paesi Bassi) restano sotto i 35 °C anche durante le ondate di calore.` },
      { q: 'Dove trovo hotel pet-friendly vicino a queste spiagge?', a: `Ogni spiaggia di questa classifica rimanda alla guida della città di riferimento, con 5+ hotel pet-friendly verificati per città, supplementi per animali in EUR e link di affiliazione diretti a Booking.com.` },
    ],
    takeawayTitle: 'I punti chiave per il 2026',
    takeawayParas: [
      `L'accesso ai cani tutto l'anno è più comune di quanto si pensi, ${STATS.yearRound} delle 25 spiagge qui sopra sono accessibili ai cani ogni giorno dell'anno.`,
      `I laghi sono un'opzione di bagno per cani sottovalutata. I laghi con acqua potabile di Classe A come Annecy (Francia) e i laghi di Tampere (Finlandia) battono l'acqua di mare su tre punti: più puliti, più calmi, e il cane può bere direttamente.`,
      `L'accesso ferroviario transfrontaliero ridisegna la mappa. Maastricht (NL) ↔ Liegi ↔ Aquisgrana, Annecy ↔ Ginevra, e York ↔ Filey mettono vere spiagge per cani a 1 ora di treno da tre delle città più tolleranti verso i cani d'Europa.`,
    ],
    legalTitle: 'Note legali, da leggere prima di partire',
    legalParas: [
      `La segnaletica sul posto prevale su tutto. Le regole sui cani sulle spiagge europee sono stabilite a livello comunale e cambiano ogni anno, controlla sempre il cartello sul posto prima di sganciare il guinzaglio.`,
      `Le norme sul guinzaglio per la nidificazione degli uccelli si applicano sulla maggior parte delle spiagge rurali dal 1 aprile al 19 agosto. Il Mediterraneo esenta la maggior parte delle zone cani recintate; il nord Europa è più rigido.`,
      `Porta sempre un sacchetto per i bisogni. Le multe vanno da 50 € (Faro, Lecce) a 100 € (Brighton, York) a infrazione e sono controllate attivamente dai vigili comunali nella maggior parte delle spiagge di questa lista.`,
    ],
  },
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const l = locale as Locale
  const t = COPY[l] ?? COPY.en!

  // Schema.org Article + ItemList + FAQPage
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: t.h1,
      description: (COPY[l] ?? COPY.en!).lede,
      datePublished: '2026-05-06T00:00:00Z',
      dateModified: '2026-06-26',
      author: { '@type': 'Person', name: 'HotelsWithPets Editorial', jobTitle: 'Pet Travel Editor', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL },
      mainEntityOfPage: `${SITE_URL}/${l}/guides/${SLUG}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: BEACHES.length,
      itemListElement: BEACHES.map((b) => ({
        '@type': 'ListItem',
        position: b.rank,
        name: b.name,
        url: `${SITE_URL}/${l}/destinations/${b.citySlug}`,
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
          <div className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-cyan-50 p-4 text-sm sm:grid-cols-4">
            <div><div className="text-2xl font-bold text-cyan-800">{STATS.total}</div><div className="text-cyan-900/70">beaches</div></div>
            <div><div className="text-2xl font-bold text-cyan-800">{STATS.yearRound}</div><div className="text-cyan-900/70">{t.yearRoundBadge.toLowerCase()}</div></div>
            <div><div className="text-2xl font-bold text-cyan-800">{STATS.cities}</div><div className="text-cyan-900/70">cities</div></div>
            <div><div className="text-2xl font-bold text-cyan-800">{STATS.coasts}</div><div className="text-cyan-900/70">coastlines</div></div>
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
                <th className="px-4 py-2 text-right font-medium">Beaches</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {COUNTRY_TALLY.map(([c, n]) => (
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
          <h2 className="mb-6 text-2xl font-bold text-gray-900">{t.rankingTitle}</h2>
          <ol className="space-y-6">
            {BEACHES.map((b) => {
              const dest = destinations.find((d) => d.slug === b.citySlug)
              if (!dest) return null
              const cityName = getLocalizedCityName(b.citySlug, dest.name, l)
              const countryName = getLocalizedCountryName(dest.country, l)
              const why = l === 'fr' ? b.whyFr : l === 'es' ? b.whyEs : l === 'de' ? b.whyDe ?? b.whyEn : l === 'nl' ? b.whyNl ?? b.whyEn : l === 'it' ? b.whyIt ?? b.whyEn : b.whyEn
              const proximityLabel =
                l === 'fr' ? `Où dormir près de ${b.name}` :
                l === 'es' ? `Dónde dormir cerca de ${b.name}` :
                l === 'pt' ? `Onde dormir perto de ${b.name}` :
                l === 'de' ? `Übernachten in der Nähe von ${b.name}` :
                l === 'nl' ? `Overnachten bij ${b.name}` :
                l === 'it' ? `Dove dormire vicino a ${b.name}` :
                `Where to stay near ${b.name}`
              return (
                <li key={b.rank} className="rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
                  <Link href={`/${l}/destinations/${b.citySlug}`} className="flex flex-col sm:flex-row">
                    <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-t-xl bg-gray-100 sm:h-auto sm:w-56 sm:rounded-l-xl sm:rounded-tr-none">
                      <Image src={`/images/city-places/${b.imageSlug}.jpg`} alt={b.name} fill sizes="(max-width:640px) 100vw, 224px" className="object-cover" />
                    </div>
                    <div className="flex-1 p-5">
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full bg-cyan-100 px-2 py-0.5 font-semibold text-cyan-800">#{b.rank}</span>
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">{t.coastLabels[b.coast]}</span>
                        <span className={`rounded-full px-2 py-0.5 ${b.yearRound ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {b.yearRound ? t.yearRoundBadge : t.seasonalBadge}
                        </span>
                      </div>
                      <h3 className="mb-1 text-xl font-bold text-gray-900">{b.name}</h3>
                      <p className="mb-2 text-sm text-gray-500">{dest.flag} {cityName}, {countryName}</p>
                      <p className="text-sm leading-relaxed text-gray-700">{why}</p>
                    </div>
                  </Link>
                  <div className="px-5 pb-5 sm:pl-56">
                    <NearbyHotelCard destinationSlug={b.citySlug} locale={l} variant="compact" proximityLabel={proximityLabel} />
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
          <h2 className="mb-4 text-2xl font-bold text-gray-900">{t.takeawayTitle}</h2>
          {t.takeawayParas.map((p, i) => (<p key={i} className="mb-3 leading-relaxed text-gray-700">{p}</p>))}
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
        href={`https://www.stay22.com/allez/roam?aid=${STAY22_AID}&campaign=best-beaches-europe-sticky&address=${encodeURIComponent('Europe')}`}
        label={
          l === 'fr' ? `Hôtels pet-friendly dans toute l'Europe` :
          l === 'es' ? 'Hoteles pet-friendly en toda Europa' :
          l === 'pt' ? `Hotéis pet-friendly em toda a Europa` :
          l === 'de' ? 'Haustierfreundliche Hotels in ganz Europa' :
          l === 'nl' ? 'Huisdiervriendelijke hotels in heel Europa' :
          l === 'it' ? "Hotel pet-friendly in tutta Europa" :
          'Pet-friendly hotels Europe-wide'
        }
        cta={l === 'fr' ? 'Voir' : l === 'es' ? 'Ver' : l === 'pt' ? 'Ver' : l === 'de' ? 'Ansehen' : l === 'nl' ? 'Bekijken' : l === 'it' ? 'Vedi' : 'View'}
      />
    </>
  )
}
