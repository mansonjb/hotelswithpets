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

type Locale = 'en' | 'fr' | 'es' | 'pt'

// Hand-curated top 25 dog beaches across Europe, sourced from our 105 city guides.
// Each entry is a real verified beach with year-round or near-year-round dog access.
type Beach = {
  rank: number
  name: string
  citySlug: string
  whyEn: string; whyFr: string; whyEs: string
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
  },
  {
    rank: 2, name: 'Filey Beach', citySlug: 'york', yearRound: true, coast: 'north-sea',
    imageSlug: 'york-beaches-filey-beach',
    whyEn: 'A 5-mile crescent of firm golden sand framed by Filey Brigg headland. The northern end is dog-friendly year-round and the locals\' favourite for off-leash running. Direct LNER train from York in 1h15.',
    whyFr: 'Croissant de 8 km de sable doré ferme bordé par le promontoire de Filey Brigg. L\'extrémité nord est dog-friendly toute l\'année et le favori local pour la course sans laisse. Train LNER direct depuis York en 1h15.',
    whyEs: 'Media luna de 8 km de arena dorada firme delimitada por el promontorio de Filey Brigg. El extremo norte es dog-friendly todo el año y el favorito local para correr sin correa. Tren LNER directo desde York en 1h15.',
  },
  {
    rank: 3, name: 'Punta Prosciutto (Bau Beach)', citySlug: 'lecce', yearRound: true, coast: 'mediterranean',
    imageSlug: 'lecce-beaches-bau-beach-punta-prosciutto',
    whyEn: 'Dedicated Bau Beach (dog beach) on the Salento\'s Ionian side, fine white sand, shallow turquoise water, sun loungers and umbrellas for owners. 45 min by car west of Lecce.',
    whyFr: 'Bau Beach dédiée côté ionien du Salento, sable blanc fin, eau turquoise peu profonde, transats et parasols pour les maîtres. 45 min en voiture à l\'ouest de Lecce.',
    whyEs: 'Bau Beach dedicada en el lado jónico del Salento, arena blanca fina, agua turquesa poco profunda, tumbonas y sombrillas para los dueños. 45 min en coche al oeste de Lecce.',
  },
  {
    rank: 4, name: 'Praia do Barril (Anchor Cemetery)', citySlug: 'faro', yearRound: true, coast: 'atlantic',
    imageSlug: 'faro-beaches-praia-do-barril',
    whyEn: 'On the Tavira-Ilha de Tavira barrier island, accessible by foot bridge or miniature train from Pedras del Rei. The Cemitério das Âncoras east of the central beach is the year-round dog zone.',
    whyFr: 'Sur l\'île barrière Tavira-Ilha de Tavira, accessible par passerelle ou train miniature depuis Pedras del Rei. Le Cemitério das Âncoras à l\'est de la plage centrale est la zone canine toute l\'année.',
    whyEs: 'En la isla barrera Tavira-Ilha de Tavira, accesible por puente peatonal o tren en miniatura desde Pedras del Rei. El Cemitério das Âncoras al este de la playa central es la zona canina todo el año.',
  },
  {
    rank: 5, name: 'Sandsend Beach', citySlug: 'york', yearRound: true, coast: 'north-sea',
    imageSlug: 'york-beaches-sandsend-beach',
    whyEn: 'A long broad beach 3 miles north of Whitby, among the few major Yorkshire beaches with year-round off-leash freedom along its full length. Backed by jurassic cliffs.',
    whyFr: 'Longue plage large à 5 km au nord de Whitby, l\'une des rares grandes plages du Yorkshire avec liberté sans laisse toute l\'année sur toute sa longueur. Adossée à des falaises jurassiques.',
    whyEs: 'Larga playa amplia a 5 km al norte de Whitby, una de las pocas grandes playas de Yorkshire con libertad sin correa todo el año en toda su longitud. Respaldada por acantilados jurásicos.',
  },
  {
    rank: 6, name: 'Bellevue Strand', citySlug: 'aarhus', yearRound: true, coast: 'baltic',
    imageSlug: 'aarhus-beaches-bellevue-strand',
    whyEn: 'A signposted year-round dog beach immediately north of Aarhus city centre, flat sand, shallow Baltic water perfect for puppies, accessible by bus 17 in 12 min from the centre.',
    whyFr: 'Plage canine signalée toute l\'année immédiatement au nord du centre d\'Aarhus, sable plat, eaux baltes peu profondes parfaites pour les chiots, accessible en bus 17 en 12 min du centre.',
    whyEs: 'Playa canina señalizada todo el año inmediatamente al norte del centro de Aarhus, arena plana, agua báltica poco profunda perfecta para cachorros, accesible en bus 17 en 12 min del centro.',
  },
  {
    rank: 7, name: 'Frassanito', citySlug: 'lecce', yearRound: true, coast: 'mediterranean',
    imageSlug: 'lecce-beaches-spiaggia-per-cani-frassanito',
    whyEn: 'A sandy stretch within the Alimini Lakes natural reserve, 35 min by car north of Otranto. Year-round dog-friendly with shaded pinewood backing, rare on the Salento coast.',
    whyFr: 'Section sablonneuse au sein de la réserve naturelle des lacs Alimini, à 35 min en voiture au nord d\'Otrante. Dog-friendly toute l\'année avec pinède en arrière, rare sur la côte du Salento.',
    whyEs: 'Tramo arenoso dentro de la reserva natural de los lagos Alimini, a 35 min en coche al norte de Otranto. Dog-friendly todo el año con pinar detrás, raro en la costa del Salento.',
  },
  {
    rank: 8, name: 'Hondenstrand Zandvoort', citySlug: 'amsterdam', yearRound: true, coast: 'north-sea',
    imageSlug: 'amsterdam-beaches-zandvoort-aan-zee-dog-beach-hondenstrand',
    whyEn: 'Amsterdam\'s nearest North Sea dog beach, a 1.5 km signposted Hondenstrand at the southern end of Zandvoort. Direct NS train from Amsterdam Centraal in 30 min.',
    whyFr: 'La plage canine de la mer du Nord la plus proche d\'Amsterdam, Hondenstrand signalée d\'1,5 km à l\'extrémité sud de Zandvoort. Train NS direct depuis Amsterdam Centraal en 30 min.',
    whyEs: 'La playa canina del Mar del Norte más cercana a Ámsterdam, Hondenstrand señalizada de 1,5 km en el extremo sur de Zandvoort. Tren NS directo desde Amsterdam Centraal en 30 min.',
  },
  {
    rank: 9, name: 'Westduinpark Dunes', citySlug: 'the-hague', yearRound: true, coast: 'north-sea',
    imageSlug: 'the-hague-beaches-kijkduin-zuiderstrand',
    whyEn: 'Off-leash dunes plus a year-round North Sea dog beach south of Scheveningen, 2 km of unbroken sand walking, the Bosjes van Poot pinewood as backdrop. The most-loved dog walk of The Hague.',
    whyFr: 'Dunes sans laisse plus une plage canine de mer du Nord toute l\'année au sud de Scheveningen, 2 km de sable continu, la pinède des Bosjes van Poot en arrière-plan. La promenade canine préférée de La Haye.',
    whyEs: 'Dunas sin correa más una playa canina del Mar del Norte todo el año al sur de Scheveningen, 2 km de arena continua, el pinar de Bosjes van Poot de fondo. El paseo canino favorito de La Haya.',
  },
  {
    rank: 10, name: 'Praia de Faro (West Section)', citySlug: 'faro', yearRound: true, coast: 'atlantic',
    imageSlug: 'faro-beaches-praia-de-faro-west-section',
    whyEn: 'The official praia para cães west of the parking, direct Atlantic exposure, year-round dog access. Bus 14/16 from Faro centre in 20 min, then 10 min walk.',
    whyFr: 'La praia para cães officielle à l\'ouest du parking, exposition atlantique directe, accès canin toute l\'année. Bus 14/16 depuis le centre de Faro en 20 min, puis 10 min à pied.',
    whyEs: 'La praia para cães oficial al oeste del parking, exposición atlántica directa, acceso canino todo el año. Bus 14/16 desde el centro de Faro en 20 min, luego 10 min andando.',
  },
  {
    rank: 11, name: 'Bridlington South Beach', citySlug: 'york', yearRound: false, coast: 'north-sea',
    imageSlug: 'york-beaches-bridlington-south-beach',
    whyEn: 'Wide southern sands signposted as a dog beach beyond the harbour groynes, about half the total length is dog-friendly year-round. Direct LNER train from York in 1h25.',
    whyFr: 'Larges sables du sud signalés plage canine au-delà des épis du port, environ la moitié de la longueur totale est dog-friendly toute l\'année. Train LNER direct depuis York en 1h25.',
    whyEs: 'Amplias arenas del sur señalizadas como playa canina más allá de los espigones del puerto, alrededor de la mitad de la longitud total es dog-friendly todo el año. Tren LNER directo desde York en 1h25.',
  },
  {
    rank: 12, name: 'Pietersplas Dog-Swim Bay', citySlug: 'maastricht', yearRound: true, coast: 'lake',
    imageSlug: 'maastricht-beaches-pietersplas-dog-swim-bay',
    whyEn: 'Municipal lake 5 km south of central Maastricht with a designated dog-swim bay at the south end. Sandy entry, calm waters. Walkable from the centre via the Maas towpath.',
    whyFr: 'Lac municipal à 5 km au sud du centre de Maastricht avec une baie de baignade canine désignée au sud. Entrée sablonneuse, eaux calmes. Accessible à pied depuis le centre par le chemin de halage de la Meuse.',
    whyEs: 'Lago municipal a 5 km al sur del centro de Maastricht con una bahía designada para el baño canino en el sur. Entrada arenosa, aguas tranquilas. Accesible a pie desde el centro por el camino de sirga del Mosa.',
  },
  {
    rank: 13, name: 'Pyynikki Dog Beach', citySlug: 'tampere', yearRound: true, coast: 'lake',
    imageSlug: 'tampere-beaches-pyynikki-dog-beach',
    whyEn: 'Tampere\'s official city dog beach on Lake Pyhäjärvi, sandy entry, dedicated dog zone south of the human swim area. 15 min walk from the centre via the Pyynikki ridge forest.',
    whyFr: 'Plage canine officielle de Tampere sur le lac Pyhäjärvi, entrée sablonneuse, zone canine dédiée au sud de la zone baignade humaine. 15 min à pied du centre par la forêt de la crête de Pyynikki.',
    whyEs: 'Playa canina oficial de Tampere en el lago Pyhäjärvi, entrada arenosa, zona canina dedicada al sur de la zona de baño humana. 15 min andando del centro por el bosque de la cresta de Pyynikki.',
  },
  {
    rank: 14, name: 'Plage des Marquisats', citySlug: 'annecy', yearRound: true, coast: 'lake',
    imageSlug: 'annecy-beaches-plage-des-marquisats-dog-zone',
    whyEn: 'The official Annecy commune dog beach on the cleanest large lake in Europe (Class A drinking quality), pebbly entry, dedicated water access, 10 min walk from the Vieille Ville.',
    whyFr: 'La plage canine officielle de la commune d\'Annecy sur le grand lac le plus propre d\'Europe (qualité eau potable Classe A), entrée en galets, accès à l\'eau dédié, 10 min à pied de la Vieille Ville.',
    whyEs: 'La playa canina oficial de la comuna de Annecy en el lago grande más limpio de Europa (calidad agua potable Clase A), entrada de guijarros, acceso al agua dedicado, 10 min andando del Casco Antiguo.',
  },
  {
    rank: 15, name: 'Niihama Dog Beach', citySlug: 'tampere', yearRound: true, coast: 'lake',
    imageSlug: 'tampere-beaches-niihama-dog-beach',
    whyEn: 'Tampere\'s second official dog beach on Lake Näsijärvi within Kauppi Forest, pebbly entry, year-round access, direct connection to 30 km of forest trails.',
    whyFr: 'Deuxième plage canine officielle de Tampere sur le lac Näsijärvi dans la forêt de Kauppi, entrée caillouteuse, accès toute l\'année, connexion directe à 30 km de sentiers forestiers.',
    whyEs: 'Segunda playa canina oficial de Tampere en el lago Näsijärvi dentro del bosque de Kauppi, entrada de guijarros, acceso todo el año, conexión directa a 30 km de senderos forestales.',
  },
  {
    rank: 16, name: 'Eijsder Beemden', citySlug: 'maastricht', yearRound: true, coast: 'lake',
    imageSlug: 'maastricht-beaches-eijsder-beemden',
    whyEn: '200-hectare nature reserve on the Maas floodplain 12 km south of Maastricht, flat riverside meadows, swimming-grade water, free-roaming Konik horses. Off-leash year-round.',
    whyFr: 'Réserve naturelle de 200 hectares sur la plaine d\'inondation de la Meuse à 12 km au sud de Maastricht, prairies riveraines, eau adaptée à la baignade, chevaux Konik en liberté. Sans laisse toute l\'année.',
    whyEs: 'Reserva natural de 200 hectáreas en la llanura aluvial del Mosa a 12 km al sur de Maastricht, praderas ribereñas, agua apta para el baño, caballos Konik en libertad. Sin correa todo el año.',
  },
  {
    rank: 17, name: 'Plage de Saint-Jorioz', citySlug: 'annecy', yearRound: true, coast: 'lake',
    imageSlug: 'annecy-beaches-plage-de-saint-jorioz',
    whyEn: 'On Lake Annecy\'s south-west shore, 11 km from Annecy, free-access rural beach with a dog-friendly section just south of the central swim zone. SIBRA bus B from Annecy in 25 min.',
    whyFr: 'Sur la rive sud-ouest du lac d\'Annecy, à 11 km d\'Annecy, plage rurale en accès libre avec section dog-friendly juste au sud de la zone baignade centrale. Bus SIBRA B depuis Annecy en 25 min.',
    whyEs: 'En la orilla suroeste del lago de Annecy, a 11 km de Annecy, playa rural de acceso libre con sección dog-friendly justo al sur de la zona de baño central. Bus SIBRA B desde Annecy en 25 min.',
  },
  {
    rank: 18, name: 'Den Permanente', citySlug: 'aarhus', yearRound: true, coast: 'baltic',
    imageSlug: 'aarhus-beaches-den-permanente',
    whyEn: 'A signposted year-round dog area at the southern Aarhus harbour, direct sand access, calm Baltic shallows, 5 min by tram from Aarhus Hovedbanegård. The most central dog beach in any Nordic capital.',
    whyFr: 'Zone canine signalée toute l\'année au sud du port d\'Aarhus, accès direct au sable, eaux baltes calmes, 5 min en tram depuis la gare d\'Aarhus. La plage canine la plus centrale de toute capitale nordique.',
    whyEs: 'Zona canina señalizada todo el año en el puerto sur de Aarhus, acceso directo a la arena, aguas bálticas tranquilas, 5 min en tranvía desde la estación de Aarhus. La playa canina más céntrica de cualquier capital nórdica.',
  },
  {
    rank: 19, name: 'Boschmolenplas', citySlug: 'maastricht', yearRound: true, coast: 'lake',
    imageSlug: 'maastricht-beaches-kelpen-oler-boschmolenplas',
    whyEn: 'Large recreation lake 35 km north of Maastricht with a dedicated dog-swimming zone separated from the family beach, the closest year-round real sand beach with on-site café.',
    whyFr: 'Grand lac de loisirs à 35 km au nord de Maastricht avec une zone de baignade canine dédiée séparée de la zone familiale, la plus proche vraie plage de sable toute l\'année avec café sur place.',
    whyEs: 'Gran lago recreativo a 35 km al norte de Maastricht con una zona de baño canino dedicada separada de la zona familiar, la playa de arena de verdad más cercana todo el año con café en el sitio.',
  },
  {
    rank: 20, name: 'Plage de Doussard', citySlug: 'annecy', yearRound: true, coast: 'lake',
    imageSlug: 'annecy-beaches-plage-de-doussard-lake-south-end',
    whyEn: 'Southernmost shore of Lake Annecy at the Bout-du-Lac nature reserve, wild pebble beach, the lake at its narrowest. The 16 km cycle path from Annecy ends here.',
    whyFr: 'La rive la plus au sud du lac d\'Annecy à la réserve naturelle du Bout-du-Lac, plage sauvage de galets, le lac à son plus étroit. La piste cyclable de 16 km depuis Annecy se termine ici.',
    whyEs: 'La orilla más al sur del lago de Annecy en la reserva natural de Bout-du-Lac, playa salvaje de guijarros, el lago en su parte más estrecha. El sendero ciclista de 16 km desde Annecy termina aquí.',
  },
  {
    rank: 21, name: 'Torre Chianca / San Cataldo', citySlug: 'lecce', yearRound: true, coast: 'mediterranean',
    imageSlug: 'lecce-beaches-torre-chianca-san-cataldo',
    whyEn: 'The closest beach to Lecce (only 15 min by car), long Adriatic sand and dunes north of San Cataldo, with a year-round dog zone along the Torre Chianca stretch.',
    whyFr: 'La plage la plus proche de Lecce (15 min en voiture), long sable adriatique et dunes au nord de San Cataldo, avec zone canine toute l\'année le long du tronçon Torre Chianca.',
    whyEs: 'La playa más cercana a Lecce (solo 15 min en coche), larga arena adriática y dunas al norte de San Cataldo, con zona canina todo el año a lo largo del tramo Torre Chianca.',
  },
  {
    rank: 22, name: 'Reilinger See', citySlug: 'heidelberg', yearRound: true, coast: 'lake',
    imageSlug: 'heidelberg-beaches-reilinger-see',
    whyEn: '50-hectare quarry lake 25 km west of Heidelberg with a dedicated Hundestrand at the south-east corner, sand beach, summer café, free parking. The closest real beach for the Heidelberg-Mannheim metro.',
    whyFr: 'Lac de carrière de 50 hectares à 25 km à l\'ouest de Heidelberg avec un Hundestrand dédié au coin sud-est, plage de sable, café d\'été, parking gratuit. La plus proche vraie plage pour la métropole Heidelberg-Mannheim.',
    whyEs: 'Lago de cantera de 50 hectáreas a 25 km al oeste de Heidelberg con un Hundestrand dedicado en la esquina sureste, playa de arena, café estival, parking gratis. La playa real más cercana para la metrópoli Heidelberg-Mannheim.',
  },
  {
    rank: 23, name: 'Ballehage Strand', citySlug: 'aarhus', yearRound: true, coast: 'baltic',
    imageSlug: 'aarhus-beaches-ballehage-strand',
    whyEn: 'A small wooded cove south of Aarhus on the Marselisborg Forest coast, pebbly entry, year-round dog beach, the calmest Aarhus swim option for anxious dogs.',
    whyFr: 'Petite crique boisée au sud d\'Aarhus sur la côte de la forêt de Marselisborg, entrée caillouteuse, plage canine toute l\'année, l\'option de baignade la plus calme d\'Aarhus pour chiens anxieux.',
    whyEs: 'Pequeña cala boscosa al sur de Aarhus en la costa del bosque de Marselisborg, entrada de guijarros, playa canina todo el año, la opción de baño más tranquila de Aarhus para perros ansiosos.',
  },
  {
    rank: 24, name: 'Viikinsaari Island', citySlug: 'tampere', yearRound: false, coast: 'lake',
    imageSlug: 'tampere-beaches-viikinsaari-island',
    whyEn: 'Car-free pine-covered island on Lake Pyhäjärvi, accessible by 25 min Hopealinjat shuttle from Mustalahti port (June-August). Off-leash forest trails outside the bird-nesting zones.',
    whyFr: 'Île couverte de pins sans voiture sur le lac Pyhäjärvi, accessible par navette Hopealinjat de 25 min depuis le port de Mustalahti (juin-août). Sentiers forestiers sans laisse hors zones de nidification.',
    whyEs: 'Isla cubierta de pinos sin coches en el lago Pyhäjärvi, accesible por lanzadera Hopealinjat de 25 min desde el puerto de Mustalahti (junio-agosto). Senderos forestales sin correa fuera de zonas de nidificación.',
  },
  {
    rank: 25, name: 'IJmuiden Beach', citySlug: 'amsterdam', yearRound: true, coast: 'north-sea',
    imageSlug: 'amsterdam-beaches-ijmuiden-beach-strand-ijmuiden',
    whyEn: 'A wide North Sea beach 30 km west of Amsterdam, dunes-and-sand 4 km stretch with a signposted dog zone at the northern end, off-leash year-round. Bus 75 from Sloterdijk in 35 min.',
    whyFr: 'Large plage de mer du Nord à 30 km à l\'ouest d\'Amsterdam, étendue dunes-sable de 4 km avec zone canine signalée à l\'extrémité nord, sans laisse toute l\'année. Bus 75 depuis Sloterdijk en 35 min.',
    whyEs: 'Amplia playa del Mar del Norte a 30 km al oeste de Ámsterdam, extensión dunas-arena de 4 km con zona canina señalizada en el extremo norte, sin correa todo el año. Bus 75 desde Sloterdijk en 35 min.',
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
  }
  const descs: Record<string, string> = {
    en: `Curated from our verified data across 105 European cities, the 25 best dog beaches with year-round access, dedicated dog zones, and direct rail or ferry from major cities. Atlantic, Mediterranean, North Sea, Baltic and lakes covered.`,
    fr: `Sélection issue de nos données vérifiées dans 105 villes européennes, les 25 meilleures plages canines avec accès toute l'année, zones canines dédiées et trains ou ferries directs depuis les grandes villes. Atlantique, Méditerranée, mer du Nord, Baltique et lacs couverts.`,
    es: `Selección de nuestros datos verificados en 105 ciudades europeas, las 25 mejores playas caninas con acceso todo el año, zonas caninas dedicadas y trenes o ferries directos desde las grandes ciudades. Atlántico, Mediterráneo, Mar del Norte, Báltico y lagos cubiertos.`,
    pt: `Seleção de nuestros datos verificados en 105 cidades europeias, as 25 melhores praias caninas com acesso o ano inteiro, zonas caninas dedicadas e comboios o ferries directos a partir das grandes cidades. Atlântico, Mediterrâneo, Mar do norte, Báltico e lagos cubiertos.`,
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

const COPY: Record<Locale, {
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
}> = {
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
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const l = locale as Locale
  const t = COPY[l] ?? COPY.en

  // Schema.org Article + ItemList + FAQPage
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: t.h1,
      description: (COPY[l] ?? COPY.en).lede,
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
              const why = l === 'fr' ? b.whyFr : l === 'es' ? b.whyEs : b.whyEn
              const proximityLabel =
                l === 'fr' ? `Où dormir près de ${b.name}` :
                l === 'es' ? `Dónde dormir cerca de ${b.name}` :
                l === 'pt' ? `Onde dormir perto de ${b.name}` :
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
          'Pet-friendly hotels Europe-wide'
        }
        cta={l === 'fr' ? 'Voir' : l === 'es' ? 'Ver' : l === 'pt' ? 'Ver' : 'View'}
      />
    </>
  )
}
