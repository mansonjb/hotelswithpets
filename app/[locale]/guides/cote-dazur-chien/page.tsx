import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezLink, buildAllezDestLink, buildStay22MapSrc } from '@/lib/site'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'cote-dazur-chien'
const CAMPAIGN_BASE = 'cote-dazur-itinerary'

// Map centered between Cannes, Antibes, Nice and Menton.
const MAP_LAT = 43.69
const MAP_LNG = 7.27

const STICKY_LABELS: Record<string, { label: string; cta: string }> = {
  en: { label: `Côte d'Azur dog-friendly road trip hotels`, cta: 'See hotels' },
  fr: { label: `Hôtels du road trip sur la Côte d'Azur avec chien`, cta: 'Voir les hôtels' },
  es: { label: `Hoteles del road trip por la Costa Azul con perro`, cta: 'Ver hoteles' },
  pt: { label: `Hotéis do road trip pela Riviera Francesa com cão`, cta: 'Ver hotéis' },
  de: { label: `Hotels für den Roadtrip an der Côte d'Azur mit Hund`, cta: 'Hotels ansehen' },
  nl: { label: `Hotels voor de road trip aan de Côte d'Azur met je hond`, cta: 'Bekijk hotels' },
  it: { label: `Hotel per il road trip in Costa Azzurra con il tuo cane`, cta: 'Vedi gli hotel' },
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
    en: `5-Day Pet-Friendly Côte d'Azur Road Trip: Nice, Antibes, Cannes & Menton (2026)`,
    fr: `Road trip sur la Côte d'Azur avec son chien en 5 jours : Nice, Antibes, Cannes et Menton (2026)`,
    es: `Road trip pet-friendly por la Costa Azul en 5 días: Niza, Antibes, Cannes y Menton (2026)`,
    pt: `Road trip pet-friendly pela Riviera Francesa em 5 dias: Nice, Antibes, Cannes e Menton (2026)`,
    de: `5-tägiger hundefreundlicher Roadtrip an der Côte d'Azur: Nice, Antibes, Cannes und Menton (2026)`,
    nl: `5-daagse hondvriendelijke road trip aan de Côte d'Azur: Nice, Antibes, Cannes en Menton (2026)`,
    it: `Road trip pet-friendly di 5 giorni in Costa Azzurra: Nizza, Antibes, Cannes e Mentone (2026)`,
  }

  const descriptions: Record<string, string> = {
    en: `A 5-day pet-friendly road trip across the French Riviera: Nice, Antibes Cap d'Antibes, Cannes and Menton. Map, day-by-day itinerary, verified pet-friendly hotels, beach access rules, drive times.`,
    fr: `Un road trip de 5 jours sur la Côte d'Azur avec son chien : Nice, Antibes Cap d'Antibes, Cannes et Menton. Carte, itinéraire jour par jour, hôtels pet-friendly vérifiés, règles sur les plages et temps de route.`,
    es: `Un road trip de 5 días por la Costa Azul con perro: Niza, Antibes Cap d'Antibes, Cannes y Menton. Mapa, itinerario día a día, hoteles pet-friendly verificados, normativa de playas y tiempos de conducción.`,
    pt: `Um road trip de 5 dias pela Riviera Francesa com cão: Nice, Antibes Cap d'Antibes, Cannes e Menton. Mapa, itinerário dia a dia, hotéis pet-friendly verificados, regras nas praias e tempos de condução.`,
    de: `Ein 5-tägiger hundefreundlicher Roadtrip an der Côte d'Azur: Nice, Antibes Cap d'Antibes, Cannes und Menton. Karte, Tag-für-Tag-Reiseplan, geprüfte hundefreundliche Hotels, Regeln für Strände, Fahrzeiten.`,
    nl: `Een 5-daagse hondvriendelijke road trip langs de Côte d'Azur: Nice, Antibes Cap d'Antibes, Cannes en Menton. Kaart, dagindeling, geverifieerde hondvriendelijke hotels, regels voor de stranden, rijtijden.`,
    it: `Un road trip pet-friendly di 5 giorni in Costa Azzurra: Nizza, Antibes Cap d'Antibes, Cannes e Mentone. Mappa, itinerario giorno per giorno, hotel pet-friendly verificati, regole delle spiagge, tempi di guida.`,
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
      url: `${SITE_URL}/${locale}/guides/${SLUG}`,
      siteName: 'HotelsWithPets.com',
    },
    other: {
      'article:published_time': '2026-05-30',
      'article:modified_time': today,
    },
  }
}

type Stop = {
  slug: string
  name: string
  nights: number
  drive: { fr: string; en: string; es: string; pt: string; de: string; nl: string; it: string }
  whyEn: string
  whyFr: string
  whyEs: string
  whyPt: string
  whyDe: string
  whyNl: string
  whyIt: string
  highlightsEn: string[]
  highlightsFr: string[]
  highlightsEs: string[]
  highlightsPt: string[]
  highlightsDe: string[]
  highlightsNl: string[]
  highlightsIt: string[]
  hotels: { name: string; pitchEn: string; pitchFr: string; pitchEs: string; pitchPt: string; pitchDe: string; pitchNl: string; pitchIt: string }[]
  hasDestPage?: boolean
}

const STOPS: Stop[] = [
  {
    slug: 'nice',
    name: 'Nice',
    nights: 1,
    drive: {
      en: `Arrival - direct flight to Nice Côte d'Azur airport (NCE) then 20 min taxi or tram line 2 to the centre. Park at Parking Sulzer (chiens admis) and walk.`,
      fr: `Arrivée - vol direct à l'aéroport Nice Côte d'Azur (NCE) puis 20 min en taxi ou tram ligne 2 jusqu'au centre. Parking Sulzer (chiens admis) puis tout à pied.`,
      es: `Llegada - vuelo directo al aeropuerto Niza Costa Azul (NCE) y luego 20 min en taxi o tranvía línea 2 hasta el centro. Parking Sulzer (admite perros) y luego todo a pie.`,
      pt: `Chegada - voo directo para o aeroporto Nice Côte d'Azur (NCE), depois 20 min de táxi ou eléctrico linha 2 até ao centro. Parking Sulzer (cães admitidos) e depois tudo a pé.`,
      de: `Ankunft - Direktflug zum Flughafen Nice Côte d'Azur (NCE), dann 20 Min. Taxi oder Straßenbahnlinie 2 ins Zentrum. Parking Sulzer (Hunde erlaubt) und danach alles zu Fuß.`,
      nl: `Aankomst - directe vlucht naar luchthaven Nice Côte d'Azur (NCE), daarna 20 min taxi of tramlijn 2 naar het centrum. Parking Sulzer (honden toegestaan) en daarna alles te voet.`,
      it: `Arrivo - volo diretto all'aeroporto di Nizza Costa Azzurra (NCE), poi 20 min di taxi o tram linea 2 fino al centro. Parking Sulzer (cani ammessi) e poi tutto a piedi.`,
    },
    whyEn: `Nice sets the tone: a city built for walking with a dog, anchored by the 7 km Promenade des Anglais, the year-round leashed-dog policy on the pebble beach below (after 21:00 in summer, anytime off-season), and the cool greenery of the Colline du Château that lifts you 92 m above the old town for a Mediterranean panorama.`,
    whyFr: `Nice donne le ton : ville faite pour marcher avec son chien, articulée autour des 7 km de la Promenade des Anglais, la politique chien en laisse acceptée sur la plage de galets en contrebas (après 21h en été, tout le temps hors saison), et la fraîcheur boisée de la Colline du Château qui vous élève à 92 m au-dessus du Vieux-Nice pour un panorama méditerranéen.`,
    whyEs: `Niza marca el tono: ciudad hecha para pasear con perro, articulada en torno a los 7 km del Paseo de los Ingleses, la política de perro con correa admitido en la playa de cantos rodados de abajo (después de las 21h en verano, todo el día fuera de temporada) y el frescor arbolado de la Colline du Château que sube a 92 m sobre el casco antiguo con panorámica mediterránea.`,
    whyPt: `Nice dá o tom: uma cidade feita para passear com cão, ancorada nos 7 km do Passeio dos Ingleses, na política de cão à trela aceite na praia de seixos abaixo (após as 21h no verão, sempre fora de época) e na frescura arborizada da Colline du Château que sobe a 92 m sobre a cidade velha para um panorama mediterrânico.`,
    whyDe: `Nice gibt den Ton an: eine Stadt, die zum Spazierengehen mit Hund gemacht ist, verankert an der 7 km langen Promenade des Anglais, der ganzjährigen Regelung für angeleinte Hunde am Kiesstrand darunter (im Sommer ab 21 Uhr, außerhalb der Saison jederzeit) und dem kühlen Grün der Colline du Château, die Sie 92 m über die Altstadt hinauf zu einem mediterranen Panorama führt.`,
    whyNl: `Nice zet direct de toon: een stad gemaakt om met je hond te wandelen, gebouwd rond de 7 km lange Promenade des Anglais, het hele jaar geldende beleid voor aangelijnde honden op het kiezelstrand eronder (na 21.00 uur in de zomer, buiten het seizoen de hele dag), en het koele groen van de Colline du Château dat je 92 m boven de oude stad tilt voor een mediterraan panorama.`,
    whyIt: `Nizza dà subito il tono: una città fatta per passeggiare con il cane, imperniata sui 7 km della Promenade des Anglais, la regola dei cani al guinzaglio ammessi tutto l'anno sulla spiaggia di ciottoli sottostante (dopo le 21:00 in estate, sempre fuori stagione) e il fresco verde della Colline du Château che ti porta a 92 m sopra la città vecchia per un panorama mediterraneo.`,
    highlightsEn: [
      `Promenade des Anglais (7 km seafront, dogs welcome on leash year-round)`,
      `Vieille Ville: narrow shaded lanes, Cours Saleya market terrace dog-tolerant`,
      `Colline du Château: free park with city panorama, dogs on leash`,
      `Tram lines 1 and 2: leashed dogs free, must be muzzled if large`,
    ],
    highlightsFr: [
      `Promenade des Anglais (7 km en bord de mer, chiens en laisse toute l'année)`,
      `Vieille Ville : ruelles ombragées, terrasses du Cours Saleya tolérantes`,
      `Colline du Château : parc gratuit avec panorama, chiens tenus en laisse`,
      `Trams 1 et 2 : chiens en laisse gratuits, muselière obligatoire si grand`,
    ],
    highlightsEs: [
      `Paseo de los Ingleses (7 km frente al mar, perros con correa todo el año)`,
      `Vieille Ville: callejuelas sombreadas, terrazas del Cours Saleya tolerantes`,
      `Colline du Château: parque gratuito con panorámica, perros con correa`,
      `Tranvías 1 y 2: perros con correa gratuitos, bozal obligatorio si son grandes`,
    ],
    highlightsPt: [
      `Promenade des Anglais (7 km à beira-mar, cães à trela todo o ano)`,
      `Cidade velha: ruas estreitas e sombreadas, esplanadas do Cours Saleya tolerantes`,
      `Colline du Château: parque gratuito com panorama, cães à trela`,
      `Eléctricos 1 e 2: cães à trela gratuitos, açaime obrigatório se forem grandes`,
    ],
    highlightsDe: [
      `Promenade des Anglais (7 km Uferpromenade, Hunde ganzjährig an der Leine erlaubt)`,
      `Altstadt: schmale schattige Gassen, Terrassen am Cours Saleya hundetolerant`,
      `Colline du Château: kostenloser Park mit Stadtpanorama, Hunde an der Leine`,
      `Straßenbahnlinien 1 und 2: angeleinte Hunde kostenlos, bei großen Hunden Maulkorbpflicht`,
    ],
    highlightsNl: [
      `Promenade des Anglais (7 km aan zee, honden het hele jaar aangelijnd welkom)`,
      `Vieille Ville: smalle beschaduwde steegjes, terrassen van de Cours Saleya hondvriendelijk`,
      `Colline du Château: gratis park met uitzicht over de stad, honden aan de lijn`,
      `Tramlijnen 1 en 2: aangelijnde honden gratis, muilkorf verplicht bij grote honden`,
    ],
    highlightsIt: [
      `Promenade des Anglais (7 km sul mare, cani ammessi al guinzaglio tutto l'anno)`,
      `Vieille Ville: vicoli stretti e ombreggiati, terrazze del Cours Saleya tolleranti`,
      `Colline du Château: parco gratuito con panorama sulla città, cani al guinzaglio`,
      `Tram linee 1 e 2: cani al guinzaglio gratis, museruola obbligatoria per i cani grandi`,
    ],
    hotels: [
      {
        name: 'Hyatt Regency Nice Palais de la Méditerranée',
        pitchEn: `Right on the Promenade des Anglais. Pets up to 14 kg welcomed, dog bed and bowl provided on request, walking distance to the beach and Vieille Ville.`,
        pitchFr: `Pile sur la Promenade des Anglais. Chiens jusqu'à 14 kg acceptés, couchage et gamelle fournis sur demande, à pied de la plage et de la Vieille Ville.`,
        pitchEs: `En pleno Paseo de los Ingleses. Perros hasta 14 kg admitidos, cama y comedero a petición, andando a la playa y al casco antiguo.`,
        pitchPt: `Mesmo na Promenade des Anglais. Cães até 14 kg aceites, cama e tigela fornecidas a pedido, a pé da praia e da cidade velha.`,
        pitchDe: `Direkt an der Promenade des Anglais. Haustiere bis 14 kg willkommen, Hundebett und Napf auf Anfrage, fußläufig zum Strand und zur Altstadt.`,
        pitchNl: `Direct aan de Promenade des Anglais. Huisdieren tot 14 kg welkom, hondenmand en bak op aanvraag, loopafstand van het strand en de oude stad.`,
        pitchIt: `Proprio sulla Promenade des Anglais. Animali fino a 14 kg accettati, cuccia e ciotola forniti su richiesta, a due passi dalla spiaggia e dalla Vieille Ville.`,
      },
      {
        name: 'Hôtel La Pérouse Nice Baie des Anges',
        pitchEn: `Carved into the Castle Hill above the old port. Quiet rooms with sea view, leashed dogs welcomed in lobby and rooms, easy 4-min walk to the Colline du Château green space.`,
        pitchFr: `Niché à flanc de la Colline du Château au-dessus du vieux port. Chambres calmes vue mer, chiens en laisse bienvenus en lobby et en chambre, 4 min à pied du parc de la colline.`,
        pitchEs: `Excavado en la Colina del Castillo sobre el puerto viejo. Habitaciones tranquilas con vistas al mar, perros con correa bienvenidos, 4 min andando al parque de la colina.`,
        pitchPt: `Encravado na Colina do Castelo acima do porto velho. Quartos calmos com vista mar, cães à trela bem-vindos, 4 min a pé do parque da colina.`,
        pitchDe: `In den Felsen der Colline du Château über dem alten Hafen eingebettet. Ruhige Zimmer mit Meerblick, angeleinte Hunde in Lobby und Zimmer willkommen, nur 4 Gehminuten zur Grünfläche der Colline du Château.`,
        pitchNl: `Uitgehouwen in de Colline du Château boven de oude haven. Rustige kamers met zeezicht, aangelijnde honden welkom in lobby en kamer, op 4 minuten lopen van het groene park van de Colline du Château.`,
        pitchIt: `Scavato nella collina del castello sopra il porto vecchio. Camere tranquille con vista mare, cani al guinzaglio benvenuti in hall e in camera, a soli 4 minuti a piedi dal verde della Colline du Château.`,
      },
    ],
    hasDestPage: true,
  },
  {
    slug: 'antibes',
    name: 'Antibes',
    nights: 2,
    drive: {
      en: `Nice to Antibes: 25 km, ~35 min on the A8 or the slower scenic Basse Corniche. Two nights is the right depth: Cap d'Antibes alone is a full half-day with a dog.`,
      fr: `Nice à Antibes : 25 km, environ 35 min par l'A8 ou la Basse Corniche scénique plus lente. Deux nuits c'est la bonne durée : le Cap d'Antibes seul fait une demi-journée pleine avec un chien.`,
      es: `Niza a Antibes: 25 km, ~35 min por la A8 o la Basse Corniche escénica más lenta. Dos noches es la duración justa: el Cap d'Antibes solo es media jornada completa con perro.`,
      pt: `Nice a Antibes: 25 km, ~35 min pela A8 ou pela Basse Corniche cénica mais lenta. Duas noites é a duração certa: o Cap d'Antibes sozinho é meia tarde com cão.`,
      de: `Nice nach Antibes: 25 km, ~35 Min. über die A8 oder die langsamere, malerische Basse Corniche. Zwei Nächte sind die richtige Dauer: allein der Cap d'Antibes füllt mit Hund einen halben Tag.`,
      nl: `Nice naar Antibes: 25 km, ~35 min via de A8 of de tragere, schilderachtige Basse Corniche. Twee nachten is de juiste lengte: alleen al Cap d'Antibes vult met een hond een halve dag.`,
      it: `Nizza ad Antibes: 25 km, ~35 min sull'A8 o sulla più lenta e panoramica Basse Corniche. Due notti sono la durata giusta: solo il Cap d'Antibes riempie mezza giornata con un cane.`,
    },
    whyEn: `Antibes is the heart of this loop and where the conversion data points: Cap d'Antibes packs a 5 km coastal trail (Sentier du Littoral) where leashed dogs are welcome year-round, the Vieille Ville inside Vauban's ramparts is compact and shaded, and Juan-les-Pins next door swaps the maritime quiet for pine forests and beach clubs that quietly accept polite dogs on terrace.`,
    whyFr: `Antibes est le cœur de la boucle et là où la conversion nous pousse : le Cap d'Antibes offre 5 km de Sentier du Littoral où les chiens en laisse sont bienvenus toute l'année, la Vieille Ville dans les remparts Vauban est compacte et ombragée, et Juan-les-Pins à côté troque le calme marin contre des pinèdes et des plages clubs qui acceptent discrètement les chiens sages en terrasse.`,
    whyEs: `Antibes es el corazón del circuito y donde apunta la conversión: el Cap d'Antibes ofrece 5 km de Sentier du Littoral con perros con correa admitidos todo el año, el casco antiguo dentro de las murallas Vauban es compacto y sombreado, y Juan-les-Pins al lado cambia la calma marítima por pinares y clubes de playa que aceptan perros tranquilos en terraza.`,
    whyPt: `Antibes é o coração do circuito e para onde a conversão aponta: o Cap d'Antibes oferece 5 km de Sentier du Littoral com cães à trela bem-vindos todo o ano, a cidade velha dentro das muralhas Vauban é compacta e sombreada, e Juan-les-Pins ao lado troca a calma marítima por pinhais e clubes de praia que aceitam discretamente cães educados em esplanada.`,
    whyDe: `Antibes ist das Herz dieser Route und dort, wo die Zahlen es zeigen: Der Cap d'Antibes bietet 5 km Sentier du Littoral, auf dem angeleinte Hunde ganzjährig willkommen sind, die Altstadt innerhalb der Vauban-Festungsmauern ist kompakt und schattig, und das benachbarte Juan-les-Pins tauscht die maritime Ruhe gegen Pinienwälder und Strandclubs, die brave Hunde auf der Terrasse diskret akzeptieren.`,
    whyNl: `Antibes is het hart van deze lus en waar de cijfers naar wijzen: Cap d'Antibes biedt 5 km Sentier du Littoral waar aangelijnde honden het hele jaar welkom zijn, de oude stad binnen de vestingmuren van Vauban is compact en beschaduwd, en het naburige Juan-les-Pins ruilt de maritieme rust in voor pijnbossen en strandclubs die brave honden discreet toelaten op het terras.`,
    whyIt: `Antibes è il cuore di questo anello ed è dove punta la conversione: il Cap d'Antibes offre 5 km di Sentier du Littoral dove i cani al guinzaglio sono benvenuti tutto l'anno, la Vieille Ville dentro le mura di Vauban è compatta e ombreggiata, e la vicina Juan-les-Pins scambia la calma marittima con pinete e beach club che accettano discretamente cani educati in terrazza.`,
    highlightsEn: [
      `Sentier du Littoral Cap d'Antibes (5 km coastal path, leashed dogs year-round)`,
      `Marché Provençal Cours Masséna under the covered hall, dog-tolerant`,
      `Port Vauban harbour walk, Bastion Saint-André ramparts`,
      `Juan-les-Pins pine grove and casino-end beach (dogs OK off-season)`,
    ],
    highlightsFr: [
      `Sentier du Littoral du Cap d'Antibes (5 km, chiens en laisse toute l'année)`,
      `Marché Provençal du Cours Masséna sous halle couverte, tolérant`,
      `Promenade du Port Vauban, remparts du Bastion Saint-André`,
      `Pinède de Juan-les-Pins et plage côté casino (chiens OK hors saison)`,
    ],
    highlightsEs: [
      `Sentier du Littoral del Cap d'Antibes (5 km, perros con correa todo el año)`,
      `Mercado Provenzal del Cours Masséna bajo cubierta, tolerante`,
      `Paseo del Puerto Vauban, murallas del Bastion Saint-André`,
      `Pinar de Juan-les-Pins y playa lado casino (perros OK fuera de temporada)`,
    ],
    highlightsPt: [
      `Sentier du Littoral do Cap d'Antibes (5 km, cães à trela todo o ano)`,
      `Mercado Provençal do Cours Masséna sob cobertura, tolerante`,
      `Passeio do Porto Vauban, muralhas do Bastion Saint-André`,
      `Pinhal de Juan-les-Pins e praia lado casino (cães OK fora de época)`,
    ],
    highlightsDe: [
      `Sentier du Littoral Cap d'Antibes (5 km Küstenweg, angeleinte Hunde ganzjährig erlaubt)`,
      `Marché Provençal am Cours Masséna unter der überdachten Markthalle, hundetolerant`,
      `Spaziergang am Hafen Port Vauban, Festungsmauern Bastion Saint-André`,
      `Pinienwald von Juan-les-Pins und Strand nahe dem Casino (Hunde außerhalb der Saison erlaubt)`,
    ],
    highlightsNl: [
      `Sentier du Littoral Cap d'Antibes (5 km kustpad, aangelijnde honden het hele jaar)`,
      `Marché Provençal Cours Masséna onder de overdekte markthal, hondvriendelijk`,
      `Wandeling langs de haven Port Vauban, vestingmuren van het Bastion Saint-André`,
      `Dennenbos van Juan-les-Pins en strand aan de casinokant (honden toegestaan buiten het seizoen)`,
    ],
    highlightsIt: [
      `Sentier du Littoral Cap d'Antibes (5 km di costa, cani al guinzaglio tutto l'anno)`,
      `Marché Provençal di Cours Masséna sotto il mercato coperto, tollerante ai cani`,
      `Passeggiata al Port Vauban, mura del Bastion Saint-André`,
      `Pineta di Juan-les-Pins e spiaggia lato casinò (cani ok fuori stagione)`,
    ],
    hotels: [
      {
        name: `Hôtel Beau Site Cap d'Antibes`,
        pitchEn: `200 m from the Sentier du Littoral trailhead. Pets up to 10 kg welcomed at no extra charge, garden and pool for downtime, the calm Cap d'Antibes setting away from the summer crowds.`,
        pitchFr: `À 200 m du départ du Sentier du Littoral. Chiens jusqu'à 10 kg acceptés sans frais, jardin et piscine pour la pause, le calme du Cap d'Antibes loin de l'agitation estivale.`,
        pitchEs: `A 200 m del inicio del Sentier du Littoral. Perros hasta 10 kg admitidos sin coste, jardín y piscina para descanso, calma del Cap d'Antibes lejos del bullicio.`,
        pitchPt: `A 200 m do início do Sentier du Littoral. Cães até 10 kg aceites sem custo, jardim e piscina para pausa, calma do Cap d'Antibes longe da multidão.`,
        pitchDe: `200 m vom Ausgangspunkt des Sentier du Littoral entfernt. Haustiere bis 10 kg ohne Aufpreis willkommen, Garten und Pool zum Entspannen, die ruhige Lage des Cap d'Antibes fernab des Sommertrubels.`,
        pitchNl: `Op 200 m van het startpunt van de Sentier du Littoral. Huisdieren tot 10 kg gratis welkom, tuin en zwembad om tot rust te komen, de rust van Cap d'Antibes ver van de zomerdrukte.`,
        pitchIt: `A 200 m dall'inizio del Sentier du Littoral. Animali fino a 10 kg accettati senza sovrapprezzo, giardino e piscina per rilassarsi, la calma del Cap d'Antibes lontano dalla folla estiva.`,
      },
      {
        name: 'Royal Antibes Hotel',
        pitchEn: `On the Plage de la Salis seafront. Pets accepted in standard rooms (small fee), private beach access (dogs allowed off-season), 10 min walk to the Vieille Ville and ramparts.`,
        pitchFr: `Front de mer sur la Plage de la Salis. Chiens acceptés en chambres standard (petit supplément), accès plage privée (chiens hors saison), 10 min à pied de la Vieille Ville et des remparts.`,
        pitchEs: `Primera línea en la Plage de la Salis. Perros admitidos en habitaciones estándar (pequeño suplemento), acceso a playa privada (perros fuera de temporada), 10 min andando al casco antiguo y a las murallas.`,
        pitchPt: `Frente-mar na Plage de la Salis. Cães aceites em quartos standard (pequena taxa), acesso a praia privada (cães fora de época), 10 min a pé da cidade velha e muralhas.`,
        pitchDe: `Direkt an der Plage de la Salis. Haustiere in Standardzimmern erlaubt (kleine Gebühr), Zugang zum Privatstrand (Hunde außerhalb der Saison erlaubt), 10 Gehminuten zur Altstadt und den Festungsmauern.`,
        pitchNl: `Direct aan de Plage de la Salis. Huisdieren toegestaan in standaardkamers (kleine toeslag), toegang tot privéstrand (honden buiten het seizoen), 10 minuten lopen naar de oude stad en de vestingmuren.`,
        pitchIt: `Sul lungomare della Plage de la Salis. Animali accettati nelle camere standard (piccolo supplemento), accesso alla spiaggia privata (cani ammessi fuori stagione), 10 minuti a piedi dalla Vieille Ville e dalle mura.`,
      },
    ],
    hasDestPage: true,
  },
  {
    slug: 'cannes',
    name: 'Cannes',
    nights: 1,
    drive: {
      en: `Antibes to Cannes: 12 km, ~25 min along the coast road. Park at Parking Suquet to avoid the Croisette gridlock and walk down.`,
      fr: `Antibes à Cannes : 12 km, environ 25 min par la route côtière. Garez-vous au Parking Suquet pour éviter les embouteillages de la Croisette et descendez à pied.`,
      es: `Antibes a Cannes: 12 km, ~25 min por la carretera costera. Aparca en el Parking Suquet para evitar los atascos de la Croisette y baja a pie.`,
      pt: `Antibes a Cannes: 12 km, ~25 min pela estrada costeira. Estacione no Parking Suquet para evitar engarrafamentos da Croisette e desça a pé.`,
      de: `Antibes nach Cannes: 12 km, ~25 Min. entlang der Küstenstraße. Parken Sie am Parking Suquet, um den Stau auf der Croisette zu vermeiden, und gehen Sie zu Fuß hinunter.`,
      nl: `Antibes naar Cannes: 12 km, ~25 min langs de kustweg. Parkeer bij Parking Suquet om de files op de Croisette te vermijden en loop naar beneden.`,
      it: `Antibes a Cannes: 12 km, ~25 min lungo la strada costiera. Parcheggia al Parking Suquet per evitare il traffico della Croisette e scendi a piedi.`,
    },
    whyEn: `Cannes layers the postcard sea-front (La Croisette, 2 km of palm-lined promenade where leashed dogs walk year-round) with the steep old town Le Suquet for a sunset climb, then ships you out for the day to the Île Sainte-Marguerite where the Trans Côte d'Azur ferry (dogs free in carrier or on leash) drops you in eucalyptus forest 15 min from the marina.`,
    whyFr: `Cannes superpose le bord de mer carte postale (la Croisette, 2 km bordés de palmiers où les chiens en laisse circulent toute l'année) avec le vieux Le Suquet pour grimper au coucher du soleil, puis vous éloigne à la journée sur l'Île Sainte-Marguerite où le ferry Trans Côte d'Azur (chiens gratuits en sac ou en laisse) vous dépose en forêt d'eucalyptus à 15 min du Vieux Port.`,
    whyEs: `Cannes superpone el frente marítimo postal (La Croisette, 2 km bordeados de palmeras con perros con correa todo el año) con el casco antiguo Le Suquet para subir al atardecer, y luego te aleja un día a la Île Sainte-Marguerite donde el ferri Trans Côte d'Azur (perros gratis en bolsa o con correa) te deja en bosque de eucaliptos a 15 min del Vieux Port.`,
    whyPt: `Cannes sobrepõe a frente-mar postal (La Croisette, 2 km bordejados de palmeiras com cães à trela todo o ano) com a cidade velha Le Suquet para subir ao pôr-do-sol, e leva-o por um dia à Île Sainte-Marguerite onde o ferry Trans Côte d'Azur (cães grátis em saco ou à trela) o deixa em floresta de eucaliptos a 15 min do Vieux Port.`,
    whyDe: `Cannes verbindet die postkartenreife Uferpromenade (La Croisette, 2 km palmengesäumte Promenade, auf der angeleinte Hunde ganzjährig unterwegs sind) mit der steilen Altstadt Le Suquet für einen Aufstieg zum Sonnenuntergang und schickt Sie dann für den Tag zur Île Sainte-Marguerite, wo die Fähre Trans Côte d'Azur (Hunde kostenlos in der Transporttasche oder an der Leine) Sie in einen Eukalyptuswald 15 Minuten vom Hafen entfernt bringt.`,
    whyNl: `Cannes combineert de ansichtkaart-boulevard (La Croisette, 2 km palmbomenpromenade waar aangelijnde honden het hele jaar wandelen) met het steile oude centrum Le Suquet voor een klim bij zonsondergang, en stuurt je vervolgens voor een dagje naar het Île Sainte-Marguerite waar de veerboot Trans Côte d'Azur (honden gratis in draagtas of aan de lijn) je afzet in een eucalyptusbos, 15 min van de jachthaven.`,
    whyIt: `Cannes sovrappone il lungomare da cartolina (La Croisette, 2 km di passeggiata tra le palme dove i cani al guinzaglio camminano tutto l'anno) con la ripida città vecchia di Le Suquet per una salita al tramonto, e poi ti porta per una giornata all'Île Sainte-Marguerite dove il traghetto Trans Côte d'Azur (cani gratis in trasportino o al guinzaglio) ti lascia in una foresta di eucalipti a 15 min dal porto.`,
    highlightsEn: [
      `La Croisette: 2 km seafront promenade, leashed dogs year-round`,
      `Le Suquet old town climb to Notre-Dame d'Espérance, sunset views`,
      `Île Sainte-Marguerite ferry: dogs free, eucalyptus forest trails`,
      `Marché Forville: covered Provençal market, dog-friendly aisles`,
    ],
    highlightsFr: [
      `La Croisette : 2 km de promenade, chiens en laisse toute l'année`,
      `Montée du Suquet jusqu'à Notre-Dame d'Espérance, vue au coucher`,
      `Ferry pour l'Île Sainte-Marguerite : chiens gratuits, sentiers en eucalyptus`,
      `Marché Forville : marché provençal couvert, allées dog-friendly`,
    ],
    highlightsEs: [
      `La Croisette: 2 km de paseo marítimo, perros con correa todo el año`,
      `Subida a Le Suquet hasta Notre-Dame d'Espérance, vista al atardecer`,
      `Ferri a la Île Sainte-Marguerite: perros gratis, senderos en eucaliptos`,
      `Marché Forville: mercado provenzal cubierto, pasillos dog-friendly`,
    ],
    highlightsPt: [
      `La Croisette: 2 km de avenida marítima, cães à trela todo o ano`,
      `Subida a Le Suquet até Notre-Dame d'Espérance, vista ao pôr-do-sol`,
      `Ferry para a Île Sainte-Marguerite: cães grátis, trilhos em eucaliptos`,
      `Marché Forville: mercado provençal coberto, corredores dog-friendly`,
    ],
    highlightsDe: [
      `La Croisette: 2 km Uferpromenade, ganzjährig angeleinte Hunde erlaubt`,
      `Aufstieg zur Altstadt Le Suquet bis zur Notre-Dame d'Espérance, Aussicht zum Sonnenuntergang`,
      `Fähre zur Île Sainte-Marguerite: Hunde kostenlos, Wanderwege im Eukalyptuswald`,
      `Marché Forville: überdachter provenzalischer Markt, hundefreundliche Gänge`,
    ],
    highlightsNl: [
      `La Croisette: 2 km boulevard aan zee, aangelijnde honden het hele jaar`,
      `Klim door het oude Le Suquet naar Notre-Dame d'Espérance, uitzicht bij zonsondergang`,
      `Veerboot naar Île Sainte-Marguerite: honden gratis, wandelpaden door eucalyptusbos`,
      `Marché Forville: overdekte Provençaalse markt, hondvriendelijke gangpaden`,
    ],
    highlightsIt: [
      `La Croisette: 2 km di lungomare, cani al guinzaglio tutto l'anno`,
      `Salita del vecchio Le Suquet fino a Notre-Dame d'Espérance, vista al tramonto`,
      `Traghetto per l'Île Sainte-Marguerite: cani gratis, sentieri nella foresta di eucalipti`,
      `Marché Forville: mercato provenzale coperto, corridoi dog-friendly`,
    ],
    hotels: [
      {
        name: 'Hotel Martinez',
        pitchEn: `Iconic Croisette palace, pets up to 10 kg welcomed in deluxe rooms, dog bed and welcome amenity provided, private beach with off-season dog access.`,
        pitchFr: `Palace iconique de la Croisette, chiens jusqu'à 10 kg acceptés en chambres deluxe, couchage et amenity de bienvenue fournis, plage privée avec accès chien hors saison.`,
        pitchEs: `Palacio icónico de La Croisette, perros hasta 10 kg admitidos en habitaciones deluxe, cama y obsequio de bienvenida, playa privada con acceso canino fuera de temporada.`,
        pitchPt: `Palácio icónico da Croisette, cães até 10 kg aceites em quartos deluxe, cama e amenity de boas-vindas, praia privada com acesso canino fora de época.`,
        pitchDe: `Ikonischer Palast an der Croisette, Haustiere bis 10 kg in Deluxe-Zimmern willkommen, Hundebett und Willkommensgeschenk inklusive, Privatstrand mit Hundezugang außerhalb der Saison.`,
        pitchNl: `Iconisch paleishotel aan de Croisette, huisdieren tot 10 kg welkom in deluxe kamers, hondenmand en welkomstcadeautje inbegrepen, privéstrand met toegang voor honden buiten het seizoen.`,
        pitchIt: `Palace iconico della Croisette, animali fino a 10 kg accettati nelle camere deluxe, cuccia e omaggio di benvenuto inclusi, spiaggia privata con accesso per cani fuori stagione.`,
      },
      {
        name: 'Hotel Le Canberra',
        pitchEn: `Boutique 4-star a short walk from the Croisette. Pets up to 12 kg welcomed (small fee), quiet courtyard pool, central enough to walk dogs to dinner across the old port.`,
        pitchFr: `Boutique 4 étoiles à 5 min de la Croisette. Chiens jusqu'à 12 kg acceptés (petit supplément), piscine en patio calme, central pour aller dîner à pied côté Vieux Port.`,
        pitchEs: `Boutique 4 estrellas a 5 min de la Croisette. Perros hasta 12 kg admitidos (pequeño suplemento), piscina en patio tranquilo, céntrico para cenar a pie junto al Vieux Port.`,
        pitchPt: `Boutique 4 estrelas a 5 min da Croisette. Cães até 12 kg aceites (pequena taxa), piscina em pátio calmo, central para jantar a pé junto ao Vieux Port.`,
        pitchDe: `4-Sterne-Boutiquehotel wenige Gehminuten von der Croisette. Haustiere bis 12 kg willkommen (kleine Gebühr), ruhiger Innenhof-Pool, zentral genug, um mit dem Hund zum Abendessen am alten Hafen zu spazieren.`,
        pitchNl: `4-sterren boutiquehotel op korte loopafstand van de Croisette. Huisdieren tot 12 kg welkom (kleine toeslag), rustig zwembad in de patio, centraal genoeg om met je hond te gaan eten bij de oude haven.`,
        pitchIt: `Boutique hotel 4 stelle a pochi passi dalla Croisette. Animali fino a 12 kg accettati (piccolo supplemento), piscina tranquilla nel cortile, centrale abbastanza per andare a cena a piedi verso il vecchio porto.`,
      },
    ],
    hasDestPage: true,
  },
  {
    slug: 'menton',
    name: 'Menton',
    nights: 1,
    drive: {
      en: `Cannes to Menton: 65 km, ~1h10 via the A8 (toll, fastest) or 1h45 via the Moyenne and Grande Corniche through Èze and Roquebrune for the cliffside views.`,
      fr: `Cannes à Menton : 65 km, environ 1h10 par l'A8 (péage, le plus rapide) ou 1h45 par la Moyenne et Grande Corniche via Èze et Roquebrune pour les panoramas en falaise.`,
      es: `Cannes a Menton: 65 km, ~1h10 por la A8 (peaje, lo más rápido) o 1h45 por la Moyenne y Grande Corniche pasando por Èze y Roquebrune con vistas de acantilado.`,
      pt: `Cannes a Menton: 65 km, ~1h10 pela A8 (portagem, mais rápida) ou 1h45 pela Moyenne e Grande Corniche por Èze e Roquebrune com vistas de falésia.`,
      de: `Cannes nach Menton: 65 km, ~1h10 über die A8 (mautpflichtig, am schnellsten) oder 1h45 über die Moyenne und Grande Corniche durch Èze und Roquebrune für die Aussicht auf die Klippen.`,
      nl: `Cannes naar Menton: 65 km, ~1u10 via de A8 (tol, snelst) of 1u45 via de Moyenne en Grande Corniche door Èze en Roquebrune voor het uitzicht op de kliffen.`,
      it: `Cannes a Mentone: 65 km, ~1h10 sull'A8 (a pagamento, la più veloce) o 1h45 sulla Moyenne e Grande Corniche passando per Èze e Roquebrune per la vista sulle scogliere.`,
    },
    whyEn: `Menton ends the loop with the rarest thing on the Riviera: a dog-accessible beach all year. The Plage des Sablettes specifies a leashed-dog zone open year-round (a municipal exception almost no neighbour replicates), the Jardin Serre de la Madone welcomes dogs in its terraced citrus garden, and the Italian border is a 2 km coastal walk for an evening cross-border aperitivo.`,
    whyFr: `Menton clôt la boucle avec la rareté absolue de la Riviera : une plage accessible aux chiens toute l'année. La Plage des Sablettes a une zone chien en laisse ouverte 12 mois sur 12 (exception municipale quasi unique sur la côte), le Jardin Serre de la Madone accueille les chiens dans son jardin d'agrumes en terrasses, et la frontière italienne est à 2 km à pied pour un apero transfrontalier le soir.`,
    whyEs: `Menton cierra el circuito con la rareza absoluta de la Riviera: una playa accesible para perros todo el año. La Playa de Sablettes tiene una zona de perros con correa abierta 12 meses (excepción municipal casi única en la costa), el Jardin Serre de la Madone admite perros en su jardín de cítricos en terraza, y la frontera italiana está a 2 km a pie para un aperitivo transfronterizo por la tarde.`,
    whyPt: `Menton fecha o circuito com a raridade absoluta da Riviera: uma praia acessível a cães todo o ano. A Plage des Sablettes tem uma zona de cães à trela aberta 12 meses (excepção municipal quase única na costa), o Jardin Serre de la Madone aceita cães no seu jardim de citrinos em socalcos, e a fronteira italiana está a 2 km a pé para um aperitivo transfronteiriço ao fim de tarde.`,
    whyDe: `Menton schließt die Route mit der größten Rarität der Riviera ab: einem ganzjährig für Hunde zugänglichen Strand. Die Plage des Sablettes hat eine ganzjährig geöffnete Zone für angeleinte Hunde (eine kommunale Ausnahme, die fast keine Nachbargemeinde kennt), der Jardin Serre de la Madone heißt Hunde in seinem terrassierten Zitrusgarten willkommen, und die italienische Grenze ist ein 2 km langer Küstenspaziergang für einen grenzüberschreitenden Abendaperitif.`,
    whyNl: `Menton sluit de lus af met het zeldzaamste wat de Riviera te bieden heeft: een strand dat het hele jaar toegankelijk is voor honden. De Plage des Sablettes heeft een aangelijnde-hondenzone die het hele jaar open is (een gemeentelijke uitzondering die bijna geen buurgemeente kent), de Jardin Serre de la Madone verwelkomt honden in zijn terrasvormige citrustuin, en de Italiaanse grens ligt op 2 km wandelafstand langs de kust voor een grensoverschrijdende avondborrel.`,
    whyIt: `Mentone chiude l'anello con la rarità assoluta della Riviera: una spiaggia accessibile ai cani tutto l'anno. La Plage des Sablettes ha una zona per cani al guinzaglio aperta 12 mesi su 12 (un'eccezione comunale che quasi nessun vicino replica), il Jardin Serre de la Madone accoglie i cani nel suo giardino di agrumi a terrazze, e il confine italiano è a 2 km di passeggiata costiera per un aperitivo transfrontaliero serale.`,
    highlightsEn: [
      `Plage des Sablettes year-round leashed-dog zone (Riviera rarity)`,
      `Vieille Ville cobbled climb to the Cimetière du Vieux-Château`,
      `Jardin Serre de la Madone: terraced citrus garden, dogs on leash`,
      `Promenade du Soleil to the Italian border (2 km, dog-walkable)`,
    ],
    highlightsFr: [
      `Plage des Sablettes : zone chien en laisse toute l'année (rare sur la Côte)`,
      `Montée pavée du vieux Menton jusqu'au Cimetière du Vieux-Château`,
      `Jardin Serre de la Madone : agrumes en terrasses, chiens en laisse`,
      `Promenade du Soleil jusqu'à la frontière italienne (2 km à pied)`,
    ],
    highlightsEs: [
      `Plage des Sablettes: zona canina con correa todo el año (rareza en la Costa)`,
      `Subida adoquinada del casco viejo hasta el Cementerio del Viejo Castillo`,
      `Jardin Serre de la Madone: cítricos en terrazas, perros con correa`,
      `Promenade du Soleil hasta la frontera italiana (2 km a pie)`,
    ],
    highlightsPt: [
      `Plage des Sablettes: zona canina à trela todo o ano (raridade na Riviera)`,
      `Subida calcetada da cidade velha até ao Cemitério do Velho Castelo`,
      `Jardin Serre de la Madone: citrinos em socalcos, cães à trela`,
      `Promenade du Soleil até à fronteira italiana (2 km a pé)`,
    ],
    highlightsDe: [
      `Plage des Sablettes: ganzjährig geöffnete Zone für angeleinte Hunde (Rarität an der Riviera)`,
      `Kopfsteingepflasterter Aufstieg der Altstadt zum Cimetière du Vieux-Château`,
      `Jardin Serre de la Madone: terrassierter Zitrusgarten, Hunde an der Leine`,
      `Promenade du Soleil bis zur italienischen Grenze (2 km, mit Hund begehbar)`,
    ],
    highlightsNl: [
      `Plage des Sablettes: hondenzone (aangelijnd) het hele jaar open (zeldzaam aan de Riviera)`,
      `Klim door de geplaveide oude stad naar de Cimetière du Vieux-Château`,
      `Jardin Serre de la Madone: terrasvormige citrustuin, honden aan de lijn`,
      `Promenade du Soleil naar de Italiaanse grens (2 km, met hond te doen)`,
    ],
    highlightsIt: [
      `Plage des Sablettes: zona cani al guinzaglio aperta tutto l'anno (rarità in Riviera)`,
      `Salita acciottolata della città vecchia fino al Cimetière du Vieux-Château`,
      `Jardin Serre de la Madone: giardino di agrumi a terrazze, cani al guinzaglio`,
      `Promenade du Soleil fino al confine italiano (2 km, percorribile con il cane)`,
    ],
    hotels: [
      {
        name: 'Hotel Royal Westminster',
        pitchEn: `Belle Époque seafront, 50 m from the Plage des Sablettes year-round dog zone. Pets welcomed at modest fee, walking distance to the old town stairs and Italian border.`,
        pitchFr: `Bord de mer Belle Époque, à 50 m de la zone chien toute l'année de la Plage des Sablettes. Chiens acceptés (supplément modeste), à pied de la vieille ville et de la frontière.`,
        pitchEs: `Frente al mar Belle Époque, a 50 m de la zona canina anual de la Plage des Sablettes. Perros admitidos (suplemento modesto), andando al casco antiguo y a la frontera.`,
        pitchPt: `Frente-mar Belle Époque, a 50 m da zona canina anual da Plage des Sablettes. Cães aceites (taxa modesta), a pé da cidade velha e da fronteira.`,
        pitchDe: `Belle-Époque-Haus direkt am Meer, 50 m von der ganzjährigen Hundezone der Plage des Sablettes entfernt. Haustiere gegen moderate Gebühr willkommen, fußläufig zur Altstadttreppe und zur italienischen Grenze.`,
        pitchNl: `Belle-Époquehotel aan zee, op 50 m van de hondenzone van de Plage des Sablettes die het hele jaar open is. Huisdieren welkom tegen een bescheiden toeslag, loopafstand van de trappen naar de oude stad en de Italiaanse grens.`,
        pitchIt: `Lungomare Belle Époque, a 50 m dalla zona cani aperta tutto l'anno della Plage des Sablettes. Animali accettati con un piccolo supplemento, a due passi dalle scalinate della città vecchia e dal confine italiano.`,
      },
      {
        name: 'Hotel Napoléon',
        pitchEn: `Quiet 4-star on the Promenade du Soleil. Heated outdoor pool, pets welcomed with a small fee, the lemon-tree garden is a calm spot to decompress with a tired dog.`,
        pitchFr: `4 étoiles calme sur la Promenade du Soleil. Piscine extérieure chauffée, chiens acceptés (petit supplément), le jardin de citronniers est parfait pour décompresser avec un chien fatigué.`,
        pitchEs: `4 estrellas tranquilo en la Promenade du Soleil. Piscina exterior climatizada, perros admitidos (pequeño suplemento), el jardín de limoneros para descomprimir con un perro cansado.`,
        pitchPt: `4 estrelas calmo na Promenade du Soleil. Piscina exterior aquecida, cães aceites (pequena taxa), o jardim de limoeiros para descomprimir com um cão cansado.`,
        pitchDe: `Ruhiges 4-Sterne-Haus an der Promenade du Soleil. Beheizter Außenpool, Haustiere gegen kleine Gebühr willkommen, der Zitronenbaumgarten ist ein ruhiger Ort, um sich mit einem müden Hund zu entspannen.`,
        pitchNl: `Rustig 4-sterrenhotel aan de Promenade du Soleil. Verwarmd buitenzwembad, huisdieren welkom tegen een kleine toeslag, de citroenboomgaard is een rustige plek om tot rust te komen met een vermoeide hond.`,
        pitchIt: `Tranquillo 4 stelle sulla Promenade du Soleil. Piscina esterna riscaldata, animali accettati con un piccolo supplemento, il giardino di limoni è un angolo tranquillo per rilassarsi con un cane stanco.`,
      },
    ],
  },
]

const COPY = {
  en: {
    dayLabels: ['Day 1', 'Days 2 & 3', 'Day 4', 'Day 5'],
    dayLabelsShort: ['Day 1', 'Days 2–3', 'Day 4', 'Day 5'],
    checkAvailability: 'Check availability →',
    browseAll: (city: string) => `Browse all pet-friendly hotels in ${city} →`,
    eyebrow: `5-day pet-friendly Côte d'Azur road trip`,
    title: `Côte d'Azur Road Trip with Your Dog: Nice, Antibes, Cannes & Menton`,
    intro: `The French Riviera packs four very different dog-friendly stops into a 100 km coastal loop you can drive in five days. Nice for the long Promenade des Anglais, Antibes for the year-round Sentier du Littoral, Cannes for the ferry to the Île Sainte-Marguerite, and Menton for the rare Riviera dog beach open all year. Verified hotels at every stop, beach windows clearly noted.`,
    stats: ['5 days', '~100 km total drive', '4 stops · 5 nights', 'Dogs welcome at every hotel'],
    routeHeading: 'The route at a glance',
    mapHeading: 'Interactive map',
    mapNote: 'Pan and zoom - every blue marker is a verified pet-friendly hotel.',
    itineraryHeading: 'Day-by-day itinerary',
    nightsLabel: (n: number) => `${n} night${n > 1 ? 's' : ''}`,
    driveLabel: 'Getting there',
    highlightsLabel: `Don't miss`,
    hotelsLabel: 'Where to sleep',
    practicalHeading: 'Practical info before you go',
    practical: [
      { h: 'Beach rules', p: `Most Côte d'Azur municipal beaches ban dogs between 1 May (or 15 June, varies by town) and 30 September. The big exceptions: Menton's Plage des Sablettes leashed zone is year-round, several Cap d'Antibes coves stay accessible, and the Sentier du Littoral coastal trail is open year-round. Always check the municipal arrêté before descending.` },
      { h: 'Heat & paw safety', p: `Riviera asphalt reaches 50-60 °C between 11:00 and 19:00 from June to mid-September. Walk early or after 19:00, do the 7-second hand test on stone (Vieille Ville, Le Suquet) and carry water. Most hotels welcome dogs to the pool deck but not the pool itself.` },
      { h: 'Driving with a dog', p: `French law requires dogs to be restrained (harness, crate or barrier). Toll roads (A8) accept dogs without restriction; toll plazas have shaded grass strips for stops. Never leave a dog in a parked car, even with a window cracked - it is a criminal offence (art. R655-1).` },
      { h: 'Emergency vet', p: `Nice: Clinique Vétérinaire de la Madeleine, +33 4 93 71 70 00 (24h). Cannes: Clinique Vétérinaire de Mougins, +33 4 92 92 28 50. Antibes: Clinique Vétérinaire du Port, +33 4 93 34 02 60. Menton: Clinique Vétérinaire Lou Pin, +33 4 93 35 95 16.` },
    ],
    faqHeading: 'Frequently asked questions',
    faq: [
      { q: 'Can I do this trip without a car?', a: `The four cities are linked by the TER Marseille-Vintimille line (Nice-Antibes 15 min, Antibes-Cannes 12 min, Cannes-Menton 50 min via Nice). Leashed dogs on TER cost €7.10 (small dogs in carrier free). It is the slower option but workable: skip the rental and rely on local taxis (no pet surcharge in Alpes-Maritimes regulations).` },
      { q: 'Best season for this trip with a dog?', a: `Mid-March to mid-May and mid-September to early November. Beach windows are open, temperatures are 16-22 °C, hotels run shoulder-season prices, and the Sentier du Littoral is bearable. July-August is hot for dogs (peak 30 °C+, asphalt scorching) and most municipal beaches are closed.` },
      { q: 'Will my dog be welcome at restaurants?', a: `Côte d'Azur terraces are very dog-tolerant - bring water and a small mat, request a shaded corner. Cours Saleya in Nice, Cours Masséna in Antibes, the Cannes Suquet old town and Menton's quayside all default to yes on terrace. Indoor dining depends on the establishment, ask.` },
      { q: `Which Côte d'Azur beach is open to dogs in summer?`, a: `Menton's Plage des Sablettes has a leashed-dog zone open year-round, including July and August - the only Riviera municipal beach with that rule. Outside Menton, most July/August dog access requires private beach clubs (Cap d'Antibes, Juan-les-Pins side). Verify each year as municipal arrêtés can shift.` },
    ],
  },
  fr: {
    dayLabels: [`Jour 1`, `Jours 2 & 3`, `Jour 4`, `Jour 5`],
    dayLabelsShort: [`Jour 1`, `Jours 2–3`, `Jour 4`, `Jour 5`],
    checkAvailability: `Voir les disponibilités →`,
    browseAll: (city: string) => `Voir tous les hôtels pet-friendly à ${city} →`,
    eyebrow: `Road trip de 5 jours sur la Côte d'Azur avec son chien`,
    title: `Road trip sur la Côte d'Azur avec son chien : Nice, Antibes, Cannes et Menton`,
    intro: `La Côte d'Azur réunit quatre étapes dog-friendly très différentes sur une boucle côtière de 100 km, faisable en cinq jours. Nice pour la longue Promenade des Anglais, Antibes pour le Sentier du Littoral ouvert toute l'année, Cannes pour le ferry vers l'Île Sainte-Marguerite, et Menton pour la rare plage canine de la Riviera accessible 12 mois sur 12. Hôtels vérifiés à chaque étape, fenêtres de plage clairement indiquées.`,
    stats: ['5 jours', '~100 km de route', '4 étapes · 5 nuits', 'Chiens acceptés dans tous les hôtels'],
    routeHeading: `L'itinéraire en un coup d'œil`,
    mapHeading: 'Carte interactive',
    mapNote: `Naviguez et zoomez - chaque marqueur bleu est un hôtel pet-friendly vérifié.`,
    itineraryHeading: 'Itinéraire jour par jour',
    nightsLabel: (n: number) => `${n} nuit${n > 1 ? 's' : ''}`,
    driveLabel: 'Comment y aller',
    highlightsLabel: 'À ne pas manquer',
    hotelsLabel: 'Où dormir',
    practicalHeading: 'À savoir avant de partir',
    practical: [
      { h: 'Règles de plage', p: `La plupart des plages municipales de la Côte d'Azur interdisent les chiens du 1er mai (ou 15 juin selon les communes) au 30 septembre. Les grandes exceptions : la zone chien en laisse de la Plage des Sablettes à Menton est ouverte toute l'année, plusieurs criques du Cap d'Antibes restent accessibles, et le Sentier du Littoral est ouvert 12 mois sur 12. Vérifiez toujours l'arrêté municipal avant de descendre.` },
      { h: 'Chaleur et coussinets', p: `L'asphalte de la Côte d'Azur atteint 50-60 °C entre 11h et 19h de juin à mi-septembre. Sortez tôt ou après 19h, faites le test des 7 secondes sur la pierre (Vieille Ville, Le Suquet) et emportez de l'eau. La plupart des hôtels acceptent les chiens en bord de piscine mais pas dans l'eau.` },
      { h: 'Conduire avec un chien', p: `La loi française impose le chien attaché (harnais, caisse ou grille). Les autoroutes à péage (A8) acceptent les chiens sans restriction ; les aires ont des bandes d'herbe ombragées. Ne jamais laisser un chien dans une voiture stationnée, même avec une vitre entrouverte - c'est un délit (art. R655-1).` },
      { h: `Vétérinaire d'urgence`, p: `Nice : Clinique Vétérinaire de la Madeleine, +33 4 93 71 70 00 (24h). Cannes : Clinique Vétérinaire de Mougins, +33 4 92 92 28 50. Antibes : Clinique Vétérinaire du Port, +33 4 93 34 02 60. Menton : Clinique Vétérinaire Lou Pin, +33 4 93 35 95 16.` },
    ],
    faqHeading: 'Questions fréquentes',
    faq: [
      { q: 'Peut-on faire ce voyage sans voiture ?', a: `Les quatre villes sont reliées par la ligne TER Marseille-Vintimille (Nice-Antibes 15 min, Antibes-Cannes 12 min, Cannes-Menton 50 min via Nice). Chien en laisse en TER : 7,10 €, petit chien en sac gratuit. C'est plus lent mais ça marche : zéro location de voiture, taxis locaux sans supplément animal (réglementation Alpes-Maritimes).` },
      { q: 'Quelle est la meilleure saison ?', a: `Mi-mars à mi-mai et mi-septembre à début novembre. Plages encore ouvertes, températures 16-22 °C, prix hors saison, Sentier du Littoral supportable. Juillet-août c'est trop chaud pour un chien (30 °C+, asphalte brûlant) et la plupart des plages municipales sont fermées.` },
      { q: 'Mon chien sera-t-il bien accueilli en terrasse ?', a: `Les terrasses de la Côte d'Azur sont très tolérantes - amenez de l'eau et un petit tapis, demandez un coin ombragé. Cours Saleya à Nice, Cours Masséna à Antibes, le Suquet à Cannes et le port de Menton acceptent presque tous. La salle dépend de l'établissement, demandez.` },
      { q: `Quelle plage de la Côte d'Azur est ouverte aux chiens l'été ?`, a: `La Plage des Sablettes à Menton a une zone chien en laisse ouverte toute l'année, juillet-août inclus - la seule plage municipale de la Riviera avec cette règle. Ailleurs, l'accès chien en été passe par les plages clubs privées (Cap d'Antibes, Juan-les-Pins). Vérifiez chaque année, les arrêtés municipaux évoluent.` },
    ],
  },
  es: {
    dayLabels: ['Día 1', 'Días 2 y 3', 'Día 4', 'Día 5'],
    dayLabelsShort: ['Día 1', 'Días 2–3', 'Día 4', 'Día 5'],
    checkAvailability: 'Ver disponibilidad →',
    browseAll: (city: string) => `Ver todos los hoteles pet-friendly en ${city} →`,
    eyebrow: `Road trip de 5 días por la Costa Azul con perro`,
    title: `Road trip por la Costa Azul con tu perro: Niza, Antibes, Cannes y Menton`,
    intro: `La Costa Azul reúne cuatro paradas dog-friendly muy distintas en un circuito costero de 100 km que se hace en cinco días. Niza por el largo Paseo de los Ingleses, Antibes por el Sentier du Littoral abierto todo el año, Cannes por el ferri a la Île Sainte-Marguerite, y Menton por la rara playa canina de la Riviera abierta 12 meses. Hoteles verificados en cada parada, ventanas de playa señaladas.`,
    stats: ['5 días', '~100 km totales', '4 paradas · 5 noches', 'Perros admitidos en cada hotel'],
    routeHeading: 'El recorrido de un vistazo',
    mapHeading: 'Mapa interactivo',
    mapNote: `Desplázate y haz zoom - cada marcador azul es un hotel pet-friendly verificado.`,
    itineraryHeading: 'Itinerario día a día',
    nightsLabel: (n: number) => `${n} noche${n > 1 ? 's' : ''}`,
    driveLabel: 'Cómo llegar',
    highlightsLabel: 'No te pierdas',
    hotelsLabel: 'Dónde dormir',
    practicalHeading: 'Antes de salir',
    practical: [
      { h: 'Normas de playas', p: `La mayoría de las playas municipales de la Costa Azul prohíben perros del 1 de mayo (o 15 de junio según el municipio) al 30 de septiembre. Las grandes excepciones: la zona canina con correa de la Plage des Sablettes en Menton está abierta todo el año, varias calas del Cap d'Antibes siguen accesibles, y el Sentier du Littoral está abierto 12 meses. Comprueba siempre el arrêté municipal antes de bajar.` },
      { h: 'Calor y almohadillas', p: `El asfalto de la Riviera alcanza 50-60 °C entre las 11:00 y las 19:00 de junio a mediados de septiembre. Sal temprano o después de las 19:00, haz el test de los 7 segundos en la piedra (casco antiguo, Le Suquet) y lleva agua. La mayoría de los hoteles aceptan perros junto a la piscina pero no dentro.` },
      { h: 'Conducir con perro', p: `La ley francesa exige el perro sujeto (arnés, transportín o reja). Las autopistas de peaje (A8) admiten perros sin restricción; las áreas tienen franjas de hierba sombreadas. Nunca dejes al perro en un coche aparcado, ni con la ventana entreabierta - es delito (art. R655-1).` },
      { h: 'Veterinario de urgencia', p: `Niza: Clinique Vétérinaire de la Madeleine, +33 4 93 71 70 00 (24h). Cannes: Clinique Vétérinaire de Mougins, +33 4 92 92 28 50. Antibes: Clinique Vétérinaire du Port, +33 4 93 34 02 60. Menton: Clinique Vétérinaire Lou Pin, +33 4 93 35 95 16.` },
    ],
    faqHeading: 'Preguntas frecuentes',
    faq: [
      { q: '¿Se puede hacer sin coche?', a: `Las cuatro ciudades están unidas por la línea TER Marsella-Ventimiglia (Niza-Antibes 15 min, Antibes-Cannes 12 min, Cannes-Menton 50 min vía Niza). Perro con correa en TER cuesta 7,10 €, perro pequeño en bolsa gratis. Es más lento pero funciona: sin alquiler de coche, taxis locales sin recargo (reglamento Alpes-Maritimes).` },
      { q: 'Mejor temporada con perro?', a: `Mediados de marzo a mediados de mayo y mediados de septiembre a principios de noviembre. Playas aún abiertas, temperaturas 16-22 °C, hoteles a precios de temporada media, Sentier du Littoral soportable. Julio-agosto hace demasiado calor (30 °C+, asfalto ardiente) y la mayoría de playas municipales cierran.` },
      { q: '¿Aceptan perros en terrazas?', a: `Las terrazas de la Costa Azul son muy tolerantes - lleva agua y una colchoneta, pide un rincón sombreado. Cours Saleya en Niza, Cours Masséna en Antibes, Le Suquet en Cannes y el puerto de Menton aceptan casi todos. La sala depende del establecimiento, pregunta.` },
      { q: `¿Qué playa de la Costa Azul está abierta a perros en verano?`, a: `La Plage des Sablettes en Menton tiene una zona canina con correa abierta todo el año, julio y agosto incluidos - la única playa municipal de la Riviera con esa regla. Fuera de Menton, el acceso canino en verano pasa por clubes de playa privados (Cap d'Antibes, Juan-les-Pins). Verifica cada año, los arrêtés municipales cambian.` },
    ],
  },
  pt: {
    dayLabels: ['Dia 1', 'Dias 2 e 3', 'Dia 4', 'Dia 5'],
    dayLabelsShort: ['Dia 1', 'Dias 2–3', 'Dia 4', 'Dia 5'],
    checkAvailability: 'Ver disponibilidade →',
    browseAll: (city: string) => `Ver todos os hotéis pet-friendly em ${city} →`,
    eyebrow: `Road trip de 5 dias pela Riviera Francesa com cão`,
    title: `Road trip pela Riviera Francesa com o seu cão: Nice, Antibes, Cannes e Menton`,
    intro: `A Riviera Francesa junta quatro paragens dog-friendly muito diferentes num circuito costeiro de 100 km que se faz em cinco dias. Nice pelo longo Passeio dos Ingleses, Antibes pelo Sentier du Littoral aberto todo o ano, Cannes pelo ferry para a Île Sainte-Marguerite, e Menton pela rara praia canina da Riviera aberta 12 meses. Hotéis verificados em cada paragem, janelas de praia sinalizadas.`,
    stats: ['5 dias', '~100 km totais', '4 paragens · 5 noites', 'Cães aceites em todos os hotéis'],
    routeHeading: 'O circuito num relance',
    mapHeading: 'Mapa interactivo',
    mapNote: `Desloque e amplie - cada marcador azul é um hotel pet-friendly verificado.`,
    itineraryHeading: 'Itinerário dia a dia',
    nightsLabel: (n: number) => `${n} noite${n > 1 ? 's' : ''}`,
    driveLabel: 'Como chegar',
    highlightsLabel: 'Não perca',
    hotelsLabel: 'Onde dormir',
    practicalHeading: 'Antes de partir',
    practical: [
      { h: 'Regras de praia', p: `A maioria das praias municipais da Riviera Francesa proíbe cães de 1 de maio (ou 15 de junho conforme o município) a 30 de setembro. As grandes exceções: a zona de cães à trela da Plage des Sablettes em Menton está aberta todo o ano, várias calas do Cap d'Antibes mantêm-se acessíveis, e o Sentier du Littoral está aberto 12 meses. Verifique sempre o arrêté municipal antes de descer.` },
      { h: 'Calor e almofadinhas', p: `O asfalto da Riviera atinge 50-60 °C entre as 11h e as 19h de junho a meados de setembro. Saia cedo ou depois das 19h, faça o teste dos 7 segundos na pedra (cidade velha, Le Suquet) e leve água. A maioria dos hotéis aceita cães junto à piscina mas não dentro.` },
      { h: 'Conduzir com o cão', p: `A lei francesa exige o cão preso (arnês, transportadora ou grelha). As autoestradas com portagem (A8) aceitam cães sem restrição; as áreas de serviço têm faixas de relva sombreadas. Nunca deixe um cão num carro estacionado, nem com janela entreaberta - é crime (art. R655-1).` },
      { h: 'Veterinário de urgência', p: `Nice: Clinique Vétérinaire de la Madeleine, +33 4 93 71 70 00 (24h). Cannes: Clinique Vétérinaire de Mougins, +33 4 92 92 28 50. Antibes: Clinique Vétérinaire du Port, +33 4 93 34 02 60. Menton: Clinique Vétérinaire Lou Pin, +33 4 93 35 95 16.` },
    ],
    faqHeading: 'Perguntas frequentes',
    faq: [
      { q: 'Dá para fazer sem carro?', a: `As quatro cidades estão ligadas pela linha TER Marseille-Vintimille (Nice-Antibes 15 min, Antibes-Cannes 12 min, Cannes-Menton 50 min via Nice). Cão à trela em TER custa 7,10 €, cão pequeno em saco gratuito. É mais lento mas funciona: sem aluguer de carro, táxis locais sem suplemento animal (regulamento Alpes-Maritimes).` },
      { q: 'Melhor época com cão?', a: `De meados de março a meados de maio e de meados de setembro a início de novembro. Praias ainda abertas, temperaturas 16-22 °C, hotéis em preços de época média, Sentier du Littoral suportável. Julho-agosto está demasiado quente (30 °C+, asfalto a escaldar) e a maioria das praias municipais fecha.` },
      { q: 'Aceitam cães nas esplanadas?', a: `As esplanadas da Riviera são muito tolerantes - leve água e um tapete pequeno, peça um canto sombreado. Cours Saleya em Nice, Cours Masséna em Antibes, Le Suquet em Cannes e o cais de Menton aceitam quase todos. A sala depende do estabelecimento, pergunte.` },
      { q: `Que praia da Riviera está aberta a cães no verão?`, a: `A Plage des Sablettes em Menton tem uma zona de cães à trela aberta todo o ano, julho e agosto incluídos - a única praia municipal da Riviera com essa regra. Fora de Menton, o acesso canino no verão passa por clubes de praia privados (Cap d'Antibes, Juan-les-Pins). Verifique todos os anos, os arrêtés municipais mudam.` },
    ],
  },
  de: {
    dayLabels: ['Tag 1', 'Tage 2 & 3', 'Tag 4', 'Tag 5'],
    dayLabelsShort: ['Tag 1', 'Tage 2–3', 'Tag 4', 'Tag 5'],
    checkAvailability: 'Verfügbarkeit prüfen →',
    browseAll: (city: string) => `Alle hundefreundlichen Hotels in ${city} ansehen →`,
    eyebrow: `5-tägiger hundefreundlicher Roadtrip an der Côte d'Azur`,
    title: `Roadtrip an der Côte d'Azur mit Ihrem Hund: Nice, Antibes, Cannes und Menton`,
    intro: `Die Côte d'Azur vereint vier sehr unterschiedliche hundefreundliche Stationen auf einer 100 km langen Küstenschleife, die Sie in fünf Tagen fahren können. Nice für die lange Promenade des Anglais, Antibes für den ganzjährig geöffneten Sentier du Littoral, Cannes für die Fähre zur Île Sainte-Marguerite und Menton für den seltenen, ganzjährig geöffneten Hundestrand der Riviera. Geprüfte Hotels an jeder Station, Strand-Zeitfenster klar gekennzeichnet.`,
    stats: ['5 Tage', '~100 km Gesamtstrecke', '4 Stationen · 5 Nächte', 'Hunde in jedem Hotel willkommen'],
    routeHeading: 'Die Route auf einen Blick',
    mapHeading: 'Interaktive Karte',
    mapNote: 'Verschieben und zoomen - jeder blaue Marker ist ein geprüftes haustierfreundliches Hotel.',
    itineraryHeading: 'Tag-für-Tag-Reiseplan',
    nightsLabel: (n: number) => `${n} ${n > 1 ? 'Nächte' : 'Nacht'}`,
    driveLabel: 'Anreise',
    highlightsLabel: `Nicht verpassen`,
    hotelsLabel: 'Wo Sie übernachten',
    practicalHeading: 'Praktische Infos vor der Abreise',
    practical: [
      { h: 'Strandregeln', p: `Die meisten Gemeindestrände der Côte d'Azur verbieten Hunde vom 1. Mai (oder 15. Juni, je nach Gemeinde) bis zum 30. September. Die großen Ausnahmen: die Leinenzone am Plage des Sablettes in Menton ist ganzjährig geöffnet, mehrere Buchten am Cap d'Antibes bleiben zugänglich, und der Küstenweg Sentier du Littoral ist ganzjährig offen. Prüfen Sie vor dem Abstieg immer den kommunalen Erlass (arrêté municipal).` },
      { h: 'Hitze und Pfotenschutz', p: `Der Asphalt an der Riviera erreicht zwischen 11 und 19 Uhr von Juni bis Mitte September 50-60 °C. Gehen Sie früh oder nach 19 Uhr spazieren, machen Sie auf Stein (Altstadt, Le Suquet) den 7-Sekunden-Handtest und nehmen Sie Wasser mit. Die meisten Hotels erlauben Hunde am Poolrand, aber nicht im Pool selbst.` },
      { h: 'Autofahren mit Hund', p: `Das französische Recht schreibt eine Hundesicherung vor (Geschirr, Box oder Trenngitter). Mautstraßen (A8) akzeptieren Hunde ohne Einschränkung; Rastplätze haben schattige Grünstreifen für Pausen. Lassen Sie einen Hund niemals im geparkten Auto zurück, auch nicht bei gekipptem Fenster - das ist eine Straftat (Art. R655-1).` },
      { h: 'Tierärztlicher Notdienst', p: `Nice: Clinique Vétérinaire de la Madeleine, +33 4 93 71 70 00 (24h). Cannes: Clinique Vétérinaire de Mougins, +33 4 92 92 28 50. Antibes: Clinique Vétérinaire du Port, +33 4 93 34 02 60. Menton: Clinique Vétérinaire Lou Pin, +33 4 93 35 95 16.` },
    ],
    faqHeading: 'Häufig gestellte Fragen',
    faq: [
      { q: 'Geht diese Reise auch ohne Auto?', a: `Die vier Städte sind durch die TER-Linie Marseille-Vintimille verbunden (Nice-Antibes 15 Min., Antibes-Cannes 12 Min., Cannes-Menton 50 Min. über Nice). Ein angeleinter Hund im TER kostet 7,10 € (kleine Hunde in der Transporttasche fahren kostenlos). Das ist langsamer, aber machbar: Verzichten Sie auf den Mietwagen und nutzen Sie lokale Taxis (kein Tierzuschlag laut Vorschriften der Alpes-Maritimes).` },
      { q: 'Beste Reisezeit für diese Tour mit Hund?', a: `Mitte März bis Mitte Mai und Mitte September bis Anfang November. Die Strand-Zeitfenster sind offen, die Temperaturen liegen bei 16-22 °C, die Hotels verlangen Nebensaisonpreise, und der Sentier du Littoral ist gut zu bewältigen. Juli-August ist für Hunde zu heiß (Spitzenwerte über 30 °C, glühender Asphalt), und die meisten Gemeindestrände sind gesperrt.` },
      { q: 'Ist mein Hund in Restaurants willkommen?', a: `Die Terrassen an der Côte d'Azur sind sehr hundetolerant - bringen Sie Wasser und eine kleine Decke mit und bitten Sie um eine schattige Ecke. Am Cours Saleya in Nice, am Cours Masséna in Antibes, in der Altstadt Le Suquet in Cannes und am Kai von Menton sagt man auf der Terrasse in der Regel Ja. Drinnen hängt es vom Lokal ab, fragen Sie einfach nach.` },
      { q: `Welcher Strand an der Côte d'Azur ist im Sommer für Hunde geöffnet?`, a: `Die Plage des Sablettes in Menton hat eine ganzjährig geöffnete Leinenzone, auch im Juli und August - der einzige Gemeindestrand an der Riviera mit dieser Regel. Außerhalb von Menton läuft der Hundezugang im Sommer meist über private Strandclubs (Cap d'Antibes, Seite Juan-les-Pins). Prüfen Sie das jedes Jahr neu, da sich die kommunalen Erlasse ändern können.` },
    ],
  },
  nl: {
    dayLabels: ['Dag 1', 'Dagen 2 & 3', 'Dag 4', 'Dag 5'],
    dayLabelsShort: ['Dag 1', 'Dagen 2–3', 'Dag 4', 'Dag 5'],
    checkAvailability: 'Bekijk beschikbaarheid →',
    browseAll: (city: string) => `Bekijk alle hondvriendelijke hotels in ${city} →`,
    eyebrow: `5-daagse hondvriendelijke road trip aan de Côte d'Azur`,
    title: `Road trip aan de Côte d'Azur met je hond: Nice, Antibes, Cannes en Menton`,
    intro: `De Côte d'Azur brengt vier heel verschillende hondvriendelijke stops samen in een kustlus van 100 km die je in vijf dagen rijdt. Nice voor de lange Promenade des Anglais, Antibes voor het hele jaar geopende Sentier du Littoral, Cannes voor de veerboot naar het Île Sainte-Marguerite, en Menton voor het zeldzame hondenstrand van de Riviera dat het hele jaar open is. Geverifieerde hotels bij elke stop, strandregels duidelijk vermeld.`,
    stats: ['5 dagen', '~100 km totaal', '4 stops · 5 nachten', 'Honden welkom in elk hotel'],
    routeHeading: 'De route in één oogopslag',
    mapHeading: 'Interactieve kaart',
    mapNote: 'Verschuif en zoom - elke blauwe marker is een geverifieerd hondvriendelijk hotel.',
    itineraryHeading: 'Dagindeling',
    nightsLabel: (n: number) => `${n} ${n > 1 ? 'nachten' : 'nacht'}`,
    driveLabel: 'Hoe kom je er',
    highlightsLabel: `Niet te missen`,
    hotelsLabel: 'Waar je slaapt',
    practicalHeading: 'Praktische info voor je vertrekt',
    practical: [
      { h: 'Strandregels', p: `De meeste gemeentelijke stranden aan de Côte d'Azur verbieden honden tussen 1 mei (of 15 juni, afhankelijk van de gemeente) en 30 september. De grote uitzonderingen: de aangelijnde-hondenzone van Mentons Plage des Sablettes is het hele jaar open, verschillende baaien op Cap d'Antibes blijven toegankelijk, en het kustpad Sentier du Littoral is het hele jaar open. Controleer altijd het gemeentelijke besluit voordat je naar beneden gaat.` },
      { h: 'Hitte en pootveiligheid', p: `Het asfalt aan de Riviera bereikt 50-60 °C tussen 11.00 en 19.00 uur van juni tot half september. Wandel vroeg of na 19.00 uur, doe de 7-secondentest met je hand op stenen (oude stad, Le Suquet) en neem water mee. De meeste hotels laten honden toe bij het zwembad, maar niet in het water zelf.` },
      { h: 'Autorijden met een hond', p: `De Franse wet schrijft voor dat honden vastgezet moeten zijn (tuigje, bench of scheidingsrek). Tolwegen (A8) accepteren honden zonder beperking; tolpleinen hebben beschaduwde grasstroken om te pauzeren. Laat een hond nooit alleen achter in een geparkeerde auto, zelfs niet met een raampje op een kier - dit is een strafbaar feit (art. R655-1).` },
      { h: 'Spoeddierenarts', p: `Nice: Clinique Vétérinaire de la Madeleine, +33 4 93 71 70 00 (24u). Cannes: Clinique Vétérinaire de Mougins, +33 4 92 92 28 50. Antibes: Clinique Vétérinaire du Port, +33 4 93 34 02 60. Menton: Clinique Vétérinaire Lou Pin, +33 4 93 35 95 16.` },
    ],
    faqHeading: 'Veelgestelde vragen',
    faq: [
      { q: 'Kan ik deze trip zonder auto doen?', a: `De vier steden zijn verbonden via de TER-lijn Marseille-Ventimiglia (Nice-Antibes 15 min, Antibes-Cannes 12 min, Cannes-Menton 50 min via Nice). Een aangelijnde hond in de TER kost € 7,10 (kleine honden in een draagtas reizen gratis). Het is de tragere optie, maar het werkt: sla de autoverhuur over en gebruik lokale taxi's (geen huisdiertoeslag volgens de regels in de Alpes-Maritimes).` },
      { q: 'Beste seizoen voor deze trip met een hond?', a: `Half maart tot half mei en half september tot begin november. Stranden zijn toegankelijk, temperaturen liggen tussen 16-22 °C, hotels rekenen tussenseizoenprijzen, en de Sentier du Littoral is goed te doen. Juli-augustus is te warm voor honden (pieken boven 30 °C, gloeiend asfalt) en de meeste gemeentelijke stranden zijn gesloten.` },
      { q: 'Is mijn hond welkom bij restaurants?', a: `De terrassen aan de Côte d'Azur zijn erg hondvriendelijk - neem water en een klein matje mee en vraag om een schaduwplek. Cours Saleya in Nice, Cours Masséna in Antibes, de oude stad Le Suquet in Cannes en de kade van Menton zeggen op het terras vrijwel altijd ja. Binnen eten hangt af van de zaak, dus vraag ernaar.` },
      { q: `Welk strand aan de Côte d'Azur is 's zomers open voor honden?`, a: `De Plage des Sablettes in Menton heeft een aangelijnde-hondenzone die het hele jaar open is, inclusief juli en augustus - het enige gemeentelijke strand aan de Riviera met die regel. Buiten Menton loopt hondentoegang in de zomer meestal via privéstrandclubs (Cap d'Antibes, kant Juan-les-Pins). Controleer dit elk jaar opnieuw, want gemeentelijke besluiten kunnen veranderen.` },
    ],
  },
  it: {
    dayLabels: ['Giorno 1', 'Giorni 2 e 3', 'Giorno 4', 'Giorno 5'],
    dayLabelsShort: ['Giorno 1', 'Giorni 2–3', 'Giorno 4', 'Giorno 5'],
    checkAvailability: 'Vedi disponibilità →',
    browseAll: (city: string) => `Vedi tutti gli hotel pet-friendly a ${city} →`,
    eyebrow: `Road trip pet-friendly di 5 giorni in Costa Azzurra`,
    title: `Road trip in Costa Azzurra con il tuo cane: Nizza, Antibes, Cannes e Mentone`,
    intro: `La Costa Azzurra riunisce quattro tappe pet-friendly molto diverse in un anello costiero di 100 km percorribile in cinque giorni. Nizza per la lunga Promenade des Anglais, Antibes per il Sentier du Littoral aperto tutto l'anno, Cannes per il traghetto verso l'Île Sainte-Marguerite, e Mentone per la rara spiaggia per cani della Riviera aperta 12 mesi su 12. Hotel verificati a ogni tappa, finestre di accesso alla spiaggia segnalate chiaramente.`,
    stats: ['5 giorni', '~100 km totali', '4 tappe · 5 notti', 'Cani ben accetti in ogni hotel'],
    routeHeading: `L'itinerario a colpo d'occhio`,
    mapHeading: 'Mappa interattiva',
    mapNote: `Sposta e zooma - ogni marcatore blu è un hotel pet-friendly verificato.`,
    itineraryHeading: 'Itinerario giorno per giorno',
    nightsLabel: (n: number) => `${n} nott${n > 1 ? 'i' : 'e'}`,
    driveLabel: 'Come arrivare',
    highlightsLabel: `Da non perdere`,
    hotelsLabel: 'Dove dormire',
    practicalHeading: 'Info pratiche prima di partire',
    practical: [
      { h: 'Regole delle spiagge', p: `La maggior parte delle spiagge comunali della Costa Azzurra vieta i cani dal 1° maggio (o dal 15 giugno, varia da comune a comune) al 30 settembre. Le grandi eccezioni: la zona per cani al guinzaglio della Plage des Sablettes a Mentone è aperta tutto l'anno, diverse calette del Cap d'Antibes restano accessibili, e il Sentier du Littoral è aperto 12 mesi su 12. Controlla sempre l'ordinanza comunale prima di scendere in spiaggia.` },
      { h: 'Caldo e sicurezza dei polpastrelli', p: `L'asfalto della Riviera raggiunge i 50-60 °C tra le 11:00 e le 19:00 da giugno a metà settembre. Cammina presto o dopo le 19:00, fai il test dei 7 secondi con la mano sulla pietra (Vieille Ville, Le Suquet) e porta sempre acqua. La maggior parte degli hotel accetta i cani a bordo piscina ma non dentro l'acqua.` },
      { h: 'Guidare con un cane', p: `La legge francese impone che il cane sia trattenuto (imbragatura, gabbia o barriera). Le autostrade a pedaggio (A8) accettano i cani senza restrizioni; le aree di sosta hanno strisce d'erba ombreggiate per le pause. Non lasciare mai un cane in auto parcheggiata, nemmeno con il finestrino socchiuso - è un reato (art. R655-1).` },
      { h: 'Veterinario di emergenza', p: `Nizza: Clinique Vétérinaire de la Madeleine, +33 4 93 71 70 00 (24h). Cannes: Clinique Vétérinaire de Mougins, +33 4 92 92 28 50. Antibes: Clinique Vétérinaire du Port, +33 4 93 34 02 60. Mentone: Clinique Vétérinaire Lou Pin, +33 4 93 35 95 16.` },
    ],
    faqHeading: 'Domande frequenti',
    faq: [
      { q: 'Posso fare questo viaggio senza auto?', a: `Le quattro città sono collegate dalla linea TER Marsiglia-Ventimiglia (Nizza-Antibes 15 min, Antibes-Cannes 12 min, Cannes-Mentone 50 min via Nizza). Il cane al guinzaglio sul TER costa 7,10 € (i cani piccoli nel trasportino viaggiano gratis). È l'opzione più lenta ma funziona bene: salta il noleggio auto e affidati ai taxi locali (nessun sovrapprezzo animali secondo il regolamento delle Alpes-Maritimes).` },
      { q: 'Qual è la stagione migliore per questo viaggio con un cane?', a: `Da metà marzo a metà maggio e da metà settembre a inizio novembre. Le finestre di accesso alla spiaggia sono aperte, le temperature sono di 16-22 °C, gli hotel hanno prezzi di bassa stagione, e il Sentier du Littoral è percorribile senza problemi. Luglio-agosto è troppo caldo per un cane (picchi oltre i 30 °C, asfalto rovente) e la maggior parte delle spiagge comunali è chiusa ai cani.` },
      { q: 'Il mio cane sarà ben accetto nei ristoranti?', a: `Le terrazze della Costa Azzurra sono molto tolleranti verso i cani - porta acqua e un tappetino, chiedi un angolo ombreggiato. Cours Saleya a Nizza, Cours Masséna ad Antibes, la città vecchia Le Suquet a Cannes e il porto di Mentone dicono quasi sempre sì in terrazza. All'interno dipende dal locale, chiedi sempre.` },
      { q: `Quale spiaggia della Costa Azzurra è aperta ai cani d'estate?`, a: `La Plage des Sablettes a Mentone ha una zona per cani al guinzaglio aperta tutto l'anno, luglio e agosto inclusi - l'unica spiaggia comunale della Riviera con questa regola. Fuori da Mentone, l'accesso per i cani d'estate passa quasi sempre per i beach club privati (Cap d'Antibes, lato Juan-les-Pins). Verifica ogni anno, perché le ordinanze comunali possono cambiare.` },
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

  const mapSrc = buildStay22MapSrc(MAP_LAT, MAP_LNG, `${CAMPAIGN_BASE}-map`)

  const tripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: `Côte d'Azur Pet-Friendly Road Trip`,
    description: `A 5-day road-trip itinerary across the French Riviera with a dog: Nice, Antibes, Cannes, Menton.`,
    touristType: 'Pet owners',
    itinerary: STOPS.map((s, i) => ({
      '@type': 'Place',
      name: s.name,
      address: { '@type': 'PostalAddress', addressCountry: 'FR', addressRegion: `Provence-Alpes-Côte d'Azur`, addressLocality: s.name },
      position: i + 1,
    })),
  }

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
    mainEntity: t.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const w = (s: Stop) => {
    if (locale === 'fr') return { why: s.whyFr, hl: s.highlightsFr, hotels: s.hotels.map(h => ({ name: h.name, pitch: h.pitchFr })) }
    if (locale === 'es') return { why: s.whyEs, hl: s.highlightsEs, hotels: s.hotels.map(h => ({ name: h.name, pitch: h.pitchEs })) }
    if (locale === 'pt') return { why: s.whyPt, hl: s.highlightsPt, hotels: s.hotels.map(h => ({ name: h.name, pitch: h.pitchPt })) }
    if (locale === 'de') return { why: s.whyDe, hl: s.highlightsDe, hotels: s.hotels.map(h => ({ name: h.name, pitch: h.pitchDe })) }
    if (locale === 'nl') return { why: s.whyNl, hl: s.highlightsNl, hotels: s.hotels.map(h => ({ name: h.name, pitch: h.pitchNl })) }
    if (locale === 'it') return { why: s.whyIt, hl: s.highlightsIt, hotels: s.hotels.map(h => ({ name: h.name, pitch: h.pitchIt })) }
    return { why: s.whyEn, hl: s.highlightsEn, hotels: s.hotels.map(h => ({ name: h.name, pitch: h.pitchEn })) }
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-700 via-cyan-700 to-amber-600 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 40%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-xs font-semibold uppercase tracking-widest text-sky-200 mb-3">{t.eyebrow}</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{t.title}</h1>
          <p className="text-lg sm:text-xl text-sky-50 max-w-3xl">{t.intro}</p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {t.stats.map((s, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-lg p-3 text-center text-sm font-medium">{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Route summary */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">{t.routeHeading}</h2>
        <ol className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {STOPS.map((s, i) => (
            <li key={s.slug} className="bg-white rounded-xl p-4 border border-stone-200">
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-700 mb-1">{t.dayLabelsShort[i]}</div>
              <div className="text-lg font-bold text-stone-900">{s.name}</div>
              <div className="text-sm text-stone-600 mt-1">{t.nightsLabel(s.nights)}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* Map */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">{t.mapHeading}</h2>
        <p className="text-sm text-stone-600 mb-4">{t.mapNote}</p>
        <div className="rounded-xl overflow-hidden border border-stone-200 shadow-sm">
          <iframe
            src={mapSrc}
            width="100%"
            height="520"
            style={{ border: 0 }}
            loading="lazy"
            title={`Côte d'Azur pet-friendly road trip map`}
          />
        </div>
      </section>

      {/* Day-by-day */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">{t.itineraryHeading}</h2>
        <div className="space-y-8">
          {STOPS.map((s, i) => {
            const localised = w(s)
            const dayLabel = t.dayLabels[i]
            return (
              <article key={s.slug} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                <header className="px-5 py-4 sm:px-7 sm:py-5 bg-gradient-to-r from-sky-50 to-amber-50 border-b border-stone-200">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-sky-700">{dayLabel}</span>
                    <h3 className="text-2xl font-bold text-stone-900">
                      {s.hasDestPage ? (
                        <Link href={`/${locale}/destinations/${s.slug}`} className="hover:text-sky-700">
                          {s.name}
                        </Link>
                      ) : (
                        s.name
                      )}
                    </h3>
                    <span className="text-sm text-stone-600">{t.nightsLabel(s.nights)}</span>
                  </div>
                </header>
                <div className="px-5 py-5 sm:px-7 sm:py-6 space-y-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">{t.driveLabel}</div>
                    <p className="text-stone-700 text-sm">{s.drive[locale]}</p>
                  </div>
                  <p className="text-stone-800 leading-relaxed">{localised.why}</p>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">{t.highlightsLabel}</div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-stone-700">
                      {localised.hl.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-sky-600 mt-0.5">●</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">{t.hotelsLabel}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {localised.hotels.map((h, idx) => (
                        <a
                          key={idx}
                          href={buildAllezLink(h.name, s.name, 'France', `${CAMPAIGN_BASE}-${s.slug}-${idx + 1}`, s.nights)}
                          target="_blank"
                          rel="noopener sponsored"
                          className="block bg-stone-50 hover:bg-sky-50 border border-stone-200 hover:border-sky-300 rounded-lg p-4 transition"
                        >
                          <div className="font-semibold text-stone-900">{h.name}</div>
                          <p className="text-xs text-stone-600 mt-1 leading-relaxed">{h.pitch}</p>
                          <div className="mt-2 text-xs font-semibold text-sky-700">
                            {t.checkAvailability}
                          </div>
                        </a>
                      ))}
                    </div>
                    <a
                      href={buildAllezDestLink(s.name, 'France', `${CAMPAIGN_BASE}-${s.slug}-all`, s.nights)}
                      target="_blank"
                      rel="noopener sponsored"
                      className="inline-block mt-3 text-sm text-stone-600 hover:text-sky-700 underline underline-offset-2"
                    >
                      {t.browseAll(s.name)}
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* Practical info */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">{t.practicalHeading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.practical.map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-stone-200">
              <h3 className="font-bold text-stone-900 mb-2">{p.h}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{p.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">{t.faqHeading}</h2>
        <div className="space-y-4">
          {t.faq.map((f, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-stone-200">
              <h3 className="font-semibold text-stone-900 mb-2">{f.q}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <GuideFooter locale={locale} currentSlug={SLUG} />

      <StickyHotelCTA
        label={stickyLabel.label}
        cta={stickyLabel.cta}
        href={buildAllezDestLink('Antibes', 'France', `${CAMPAIGN_BASE}-sticky`, 2)}
      />
    </main>
  )
}
