import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezLink, buildAllezDestLink, buildStay22MapSrc } from '@/lib/site'
import { imageUrl } from '@/lib/imageUrl'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'brittany-pet-friendly-road-trip'
const CAMPAIGN_BASE = 'brittany-itinerary'

// Map centered between Rennes, Saint-Malo, Dinard and Cancale.
const MAP_LAT = 48.45
const MAP_LNG = -1.9

const STICKY_LABELS: Record<string, { label: string; cta: string }> = {
  en: { label: 'Brittany dog-friendly road trip hotels', cta: 'See hotels' },
  fr: { label: 'Hôtels du road trip en Bretagne avec chien', cta: 'Voir les hôtels' },
  es: { label: 'Hoteles del road trip por Bretaña con perro', cta: 'Ver hoteles' },
  pt: { label: 'Hotéis do road trip pela Bretanha com cão', cta: 'Ver hotéis' },
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
    en: '5-Day Pet-Friendly Brittany Road Trip: Rennes, Saint-Malo, Dinard & Cancale (2026)',
    fr: 'Road trip en Bretagne avec son chien en 5 jours : Rennes, Saint-Malo, Dinard et Cancale (2026)',
    es: 'Road trip pet-friendly por Bretaña en 5 días: Rennes, Saint-Malo, Dinard y Cancale (2026)',
    pt: 'Road trip pet-friendly pela Bretanha em 5 dias: Rennes, Saint-Malo, Dinard e Cancale (2026)',
  }

  const descriptions: Record<string, string> = {
    en: 'A 5-day pet-friendly road trip across north Brittany covering Rennes, Saint-Malo, Dinard and Cancale. Map, day-by-day itinerary, dog-friendly hotels at every stop, beach access rules and driving times.',
    fr: `Un road trip de 5 jours en Bretagne nord avec son chien : Rennes, Saint-Malo, Dinard et Cancale. Carte, itinéraire jour par jour, hôtels pet-friendly à chaque étape, règles sur les plages et temps de route.`,
    es: 'Un road trip de 5 días por la Bretaña norte con perro: Rennes, Saint-Malo, Dinard y Cancale. Mapa, itinerario día a día, hoteles pet-friendly en cada parada, normativa de playas y tiempos de conducción.',
    pt: 'Um road trip de 5 dias pela Bretanha norte com cão: Rennes, Saint-Malo, Dinard e Cancale. Mapa, itinerário dia a dia, hotéis pet-friendly em cada paragem, regras nas praias e tempos de condução.',
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
        'x-default': `${SITE_URL}/en/guides/${SLUG}`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      type: 'article',
      url: `${SITE_URL}/${locale}/guides/${SLUG}`,
      siteName: 'HotelsWithPets.com',
      images: [
        {
          url: imageUrl(`/images/guides/brittany-road-trip.jpg`),
          width: 1600,
          height: 900,
          alt: 'Saint-Malo ramparts with the Brittany coast',
        },
      ],
    },
    other: {
      'article:published_time': '2026-05-25',
      'article:modified_time': today,
    },
  }
}

type Stop = {
  slug: string
  name: string
  nights: number
  drive: { fr: string; en: string; es: string; pt: string }
  whyEn: string
  whyFr: string
  whyEs: string
  whyPt: string
  highlightsEn: string[]
  highlightsFr: string[]
  highlightsEs: string[]
  highlightsPt: string[]
  hotels: { name: string; pitchEn: string; pitchFr: string; pitchEs: string; pitchPt: string }[]
  hasDestPage?: boolean
}

const STOPS: Stop[] = [
  {
    slug: 'rennes',
    name: 'Rennes',
    nights: 1,
    drive: {
      en: 'Arrival - TGV from Paris (1h25) or drive in. Park once, walk everywhere.',
      fr: `Arrivée - TGV depuis Paris (1h25) ou en voiture. On se gare et on marche.`,
      es: 'Llegada - TGV desde París (1h25) o en coche. Aparcas una vez, todo se hace andando.',
      pt: 'Chegada - TGV de Paris (1h25) ou de carro. Estacionas uma vez, tudo se faz a pé.',
    },
    whyEn: `Brittany's regional capital is the natural launch pad: a compact medieval centre, a 10-hectare central park (Parc du Thabor) that welcomes leashed dogs, and abundant café terraces. The half-timbered streets east of Place du Parlement de Bretagne were spared by the 1720 fire and remain the most photogenic dog-walking ground in the city.`,
    whyFr: `La capitale régionale est le point de départ logique : un centre médiéval compact, un parc central de 10 hectares (Parc du Thabor) qui accueille les chiens en laisse et des terrasses partout. Les rues à pans de bois à l'est de la Place du Parlement de Bretagne ont échappé à l'incendie de 1720 et restent le terrain de promenade le plus photogénique de la ville.`,
    whyEs: `La capital regional es el punto de partida lógico: un centro medieval compacto, un parque central de 10 hectáreas (Parc du Thabor) que admite perros con correa y terrazas por todas partes. Las calles con entramado de madera al este de la Place du Parlement de Bretagne se salvaron del incendio de 1720 y siguen siendo el terreno de paseo más fotogénico de la ciudad.`,
    whyPt: `A capital regional é o ponto de partida lógico: um centro medieval compacto, um parque central de 10 hectares (Parc du Thabor) que aceita cães com trela e esplanadas por todo o lado. As ruas em tabique a leste da Place du Parlement de Bretagne escaparam ao incêndio de 1720 e continuam a ser o terreno de passeio mais fotogénico da cidade.`,
    highlightsEn: ['Parc du Thabor (10 ha, leashed dogs welcome)', 'Half-timbered medieval centre', 'La Vilaine river towpath walk'],
    highlightsFr: ['Parc du Thabor (10 ha, chiens en laisse acceptés)', 'Centre médiéval à pans de bois', `Promenade sur les bords de la Vilaine`],
    highlightsEs: ['Parc du Thabor (10 ha, perros con correa)', 'Centro medieval con entramado', 'Paseo a orillas del Vilaine'],
    highlightsPt: ['Parc du Thabor (10 ha, cães com trela)', 'Centro medieval em tabique', 'Passeio à beira do Vilaine'],
    hasDestPage: true,
    hotels: [
      {
        name: 'Hôtel Le Magic Hall',
        pitchEn: 'Quirky boutique 4★ a 5-minute walk from the train station. Dogs welcome, theatrical decor, central but quiet at night.',
        pitchFr: `Boutique 4★ atypique à 5 minutes à pied de la gare. Chiens acceptés, décor théâtral, central mais calme la nuit.`,
        pitchEs: 'Boutique 4★ peculiar a 5 minutos a pie de la estación. Acepta perros, decoración teatral, céntrico pero tranquilo de noche.',
        pitchPt: 'Boutique 4★ peculiar a 5 minutos a pé da estação. Aceita cães, decoração teatral, central mas tranquilo à noite.',
      },
      {
        name: 'Mercure Rennes Centre Gare',
        pitchEn: 'Reliable Mercure right at the TGV station. Mercure chain has a consistent pet-friendly policy across France.',
        pitchFr: 'Mercure fiable juste à la gare TGV. La chaîne Mercure a une politique animaux constante partout en France.',
        pitchEs: 'Mercure fiable junto a la estación TGV. La cadena Mercure mantiene una política pet-friendly homogénea en Francia.',
        pitchPt: 'Mercure fiável junto à estação TGV. A cadeia Mercure mantém uma política pet-friendly homogénea em França.',
      },
    ],
  },
  {
    slug: 'saint-malo',
    name: 'Saint-Malo',
    nights: 2,
    drive: {
      en: '~70 km / 1h drive from Rennes via N137. Park outside the walled city (intramuros) - Parking des Remparts.',
      fr: `~70 km / 1h depuis Rennes par la N137. On se gare hors de la cité intramuros - Parking des Remparts.`,
      es: '~70 km / 1h desde Rennes por la N137. Aparca fuera de la ciudad amurallada (intramuros) - Parking des Remparts.',
      pt: '~70 km / 1h de Rennes pela N137. Estaciona fora da cidade muralhada (intramuros) - Parking des Remparts.',
    },
    whyEn: `The walled corsair city is the heart of the road trip. Two clear nights here let you cover the ramparts walk (2 km loop), the Plage du Sillon (Brittany's most famous beach - dogs allowed in the off-peak season, banned 1 June–30 September on the main stretch), and a day trip to either Cancale or Mont-Saint-Michel. Tides here are among the largest in Europe - check the horaire des marées before any beach walk.`,
    whyFr: `La cité corsaire fortifiée est le cœur du road trip. Deux nuits permettent de couvrir le tour des remparts (boucle de 2 km), la Plage du Sillon (la plus célèbre de Bretagne - chiens autorisés hors saison, interdits du 1ᵉʳ juin au 30 septembre sur la portion principale) et une excursion à Cancale ou au Mont-Saint-Michel. Les marées sont parmi les plus fortes d'Europe - consultez l'horaire des marées avant toute balade sur la plage.`,
    whyEs: `La ciudad corsaria amurallada es el corazón del viaje. Dos noches permiten cubrir las murallas (circuito de 2 km), la Plage du Sillon (la playa más famosa de Bretaña - perros admitidos fuera de temporada, prohibidos del 1 de junio al 30 de septiembre en el tramo principal) y una excursión a Cancale o al Mont-Saint-Michel. Las mareas están entre las más fuertes de Europa - consulta el horario antes de bajar a la playa.`,
    whyPt: `A cidade corsária muralhada é o coração da viagem. Duas noites permitem percorrer as muralhas (circuito de 2 km), a Plage du Sillon (a praia mais famosa da Bretanha - cães permitidos fora de época, proibidos de 1 de junho a 30 de setembro no troço principal) e uma excursão a Cancale ou ao Mont-Saint-Michel. As marés estão entre as mais fortes da Europa - consulta o horário antes de descer à praia.`,
    highlightsEn: ['Ramparts walk (2 km loop, dogs on leash welcome)', 'Plage du Sillon (off-season dog beach)', 'Fort National at low tide', 'Day trip to Mont-Saint-Michel (50 km)'],
    highlightsFr: ['Tour des remparts (2 km, chiens en laisse acceptés)', 'Plage du Sillon (plage à chiens hors saison)', 'Fort National à marée basse', 'Excursion au Mont-Saint-Michel (50 km)'],
    highlightsEs: ['Murallas (2 km, perros con correa)', 'Plage du Sillon (playa con perros fuera de temporada)', 'Fort National en bajamar', 'Excursión al Mont-Saint-Michel (50 km)'],
    highlightsPt: ['Muralhas (2 km, cães com trela)', 'Plage du Sillon (praia com cães fora de época)', 'Fort National com a maré baixa', 'Excursão ao Mont-Saint-Michel (50 km)'],
    hotels: [
      {
        name: 'Mercure Saint-Malo Front de Mer',
        pitchEn: 'Direct access to the Plage du Sillon, dog-friendly chain policy, easy parking and a 15-minute walk to intramuros.',
        pitchFr: `Accès direct à la Plage du Sillon, politique animaux Mercure, parking facile et 15 minutes à pied de l'intramuros.`,
        pitchEs: 'Acceso directo a la Plage du Sillon, política pet-friendly Mercure, parking fácil y 15 minutos a pie del intramuros.',
        pitchPt: 'Acesso direto à Plage du Sillon, política pet-friendly Mercure, estacionamento fácil e 15 minutos a pé do intramuros.',
      },
      {
        name: 'Grand Hôtel des Thermes',
        pitchEn: 'Belle-Époque seafront landmark with thalassotherapy spa. Pets accepted in-room (verify fee at booking). Luxury anchor of the trip.',
        pitchFr: 'Établissement Belle Époque en bord de mer avec thalasso. Animaux acceptés en chambre (vérifier le supplément à la réservation). Étape luxe du voyage.',
        pitchEs: 'Edificio Belle Époque frente al mar con talasoterapia. Mascotas admitidas en habitación (verifica el suplemento al reservar). Etapa de lujo del viaje.',
        pitchPt: 'Edifício Belle Époque à beira-mar com talassoterapia. Animais aceites em quarto (verifica o suplemento na reserva). Etapa de luxo da viagem.',
      },
    ],
  },
  {
    slug: 'dinard',
    name: 'Dinard',
    nights: 1,
    drive: {
      en: '~15 km / 25 min by road via Pont Saint-Hubert, or 10 min by foot-passenger ferry Le Compagnie Corsaire (dogs allowed on lead).',
      fr: `~15 km / 25 min par la route via le Pont Saint-Hubert, ou 10 min par la navette piétonne Compagnie Corsaire (chiens en laisse acceptés).`,
      es: '~15 km / 25 min por carretera vía Pont Saint-Hubert, o 10 min en lanzadera peatonal Compagnie Corsaire (perros con correa).',
      pt: '~15 km / 25 min por estrada via Pont Saint-Hubert, ou 10 min de barco de passageiros Compagnie Corsaire (cães com trela).',
    },
    whyEn: `Belle-Époque seaside resort facing Saint-Malo across the Rance estuary. The Promenade du Clair de Lune (1.5 km coastal path) and the Pointe du Moulinet are open to leashed dogs year-round. Quieter than Saint-Malo, with a softer pace ideal for an evening with the dog.`,
    whyFr: `Station balnéaire Belle Époque face à Saint-Malo, de l'autre côté de l'estuaire de la Rance. La Promenade du Clair de Lune (1,5 km en bord de mer) et la Pointe du Moulinet sont ouvertes aux chiens en laisse toute l'année. Plus calme que Saint-Malo, rythme plus doux, idéal pour une soirée avec le chien.`,
    whyEs: `Estación balnearia Belle Époque frente a Saint-Malo, al otro lado del estuario del Rance. La Promenade du Clair de Lune (1,5 km costero) y la Pointe du Moulinet admiten perros con correa todo el año. Más tranquila que Saint-Malo, ritmo más suave, ideal para una velada con el perro.`,
    whyPt: `Estância balnear Belle Époque frente a Saint-Malo, do outro lado do estuário do Rance. A Promenade du Clair de Lune (1,5 km à beira-mar) e a Pointe du Moulinet aceitam cães com trela todo o ano. Mais calma que Saint-Malo, ritmo mais suave, ideal para uma noite com o cão.`,
    highlightsEn: [`Promenade du Clair de Lune (1.5 km, year-round leashed)`, `Plage de l'Écluse (off-season dog beach)`, `Pointe du Moulinet viewpoint`],
    highlightsFr: [`Promenade du Clair de Lune (1,5 km, en laisse toute l'année)`, `Plage de l'Écluse (chiens hors saison)`, `Belvédère de la Pointe du Moulinet`],
    highlightsEs: [`Promenade du Clair de Lune (1,5 km, con correa todo el año)`, `Plage de l'Écluse (con perros fuera de temporada)`, `Mirador de la Pointe du Moulinet`],
    highlightsPt: [`Promenade du Clair de Lune (1,5 km, com trela todo o ano)`, `Plage de l'Écluse (cães fora de época)`, `Miradouro da Pointe du Moulinet`],
    hotels: [
      {
        name: 'Castelbrac Hôtel & Spa',
        pitchEn: 'Relais & Châteaux 5★ in a cliffside Belle-Époque villa with a private cove. Pets welcome on request - call ahead.',
        pitchFr: `Relais & Châteaux 5★ dans une villa Belle Époque accrochée à la falaise, avec crique privée. Animaux acceptés sur demande - appeler avant.`,
        pitchEs: 'Relais & Châteaux 5★ en una villa Belle Époque sobre el acantilado, con cala privada. Mascotas a petición - llama antes.',
        pitchPt: 'Relais & Châteaux 5★ numa villa Belle Époque sobre a falésia, com enseada privada. Animais sob pedido - telefona antes.',
      },
      {
        name: 'Hôtel Printania',
        pitchEn: 'Classic family-run seafront hotel facing Saint-Malo. Traditional Breton dining room, dogs welcome at extra charge.',
        pitchFr: `Hôtel familial classique en bord de mer face à Saint-Malo. Salle à manger bretonne traditionnelle, chiens acceptés avec supplément.`,
        pitchEs: 'Hotel familiar clásico frente al mar y a Saint-Malo. Comedor bretón tradicional, perros admitidos con suplemento.',
        pitchPt: 'Hotel familiar clássico à beira-mar frente a Saint-Malo. Sala bretã tradicional, cães aceites com suplemento.',
      },
    ],
  },
  {
    slug: 'cancale',
    name: 'Cancale',
    nights: 1,
    drive: {
      en: '~25 km / 35 min from Dinard via D201 (the corniche), or 15 km / 20 min directly from Saint-Malo.',
      fr: `~25 km / 35 min depuis Dinard par la D201 (corniche), ou 15 km / 20 min directement depuis Saint-Malo.`,
      es: '~25 km / 35 min desde Dinard por la D201 (cornisa), o 15 km / 20 min directamente desde Saint-Malo.',
      pt: '~25 km / 35 min de Dinard pela D201 (corniche), ou 15 km / 20 min diretamente de Saint-Malo.',
    },
    whyEn: `Brittany's oyster capital and the soft-landing end of the loop. The GR34 coastal path runs all along the Pointe du Grouin headland with sweeping bay views, leashed dogs welcome year-round. Plage du Verger, 6 km north, is one of the rare year-round dog beaches in the area (off the main season the whole bay is open). Eat oysters by the dozen at the Marché aux Huîtres dockside stalls.`,
    whyFr: `Capitale ostréicole de Bretagne et fin en douceur du circuit. Le GR34 longe toute la Pointe du Grouin avec des vues plongeantes sur la baie, chiens en laisse acceptés toute l'année. La Plage du Verger, 6 km au nord, est l'une des rares plages à chiens autorisées toute l'année du secteur (hors saison toute la baie est ouverte). Huîtres à la douzaine sur le port aux Marché aux Huîtres.`,
    whyEs: `Capital ostrícola de Bretaña y final suave del circuito. El GR34 recorre toda la Pointe du Grouin con vistas a la bahía, perros con correa todo el año. Plage du Verger, 6 km al norte, es una de las pocas playas con perros todo el año (fuera de temporada toda la bahía está abierta). Ostras a docenas en el puerto, en el Marché aux Huîtres.`,
    whyPt: `Capital ostreícola da Bretanha e fim suave do circuito. O GR34 percorre toda a Pointe du Grouin com vistas sobre a baía, cães com trela todo o ano. Plage du Verger, 6 km a norte, é uma das poucas praias com cães todo o ano (fora de época toda a baía está aberta). Ostras à dúzia no porto, no Marché aux Huîtres.`,
    highlightsEn: [`Pointe du Grouin (GR34 coastal headland)`, `Plage du Verger (year-round dog beach)`, `Marché aux Huîtres (waterfront oyster bar)`],
    highlightsFr: [`Pointe du Grouin (GR34 sur la falaise)`, `Plage du Verger (plage à chiens toute l'année)`, `Marché aux Huîtres (bar à huîtres du port)`],
    highlightsEs: [`Pointe du Grouin (GR34 en el acantilado)`, `Plage du Verger (playa con perros todo el año)`, `Marché aux Huîtres (bar de ostras del puerto)`],
    highlightsPt: [`Pointe du Grouin (GR34 sobre a falésia)`, `Plage du Verger (praia com cães todo o ano)`, `Marché aux Huîtres (bar de ostras do porto)`],
    hotels: [
      {
        name: 'Le Continental Cancale',
        pitchEn: 'Classic 3★ on the quay, walking distance to the oyster market. Dogs welcome at a small nightly fee.',
        pitchFr: `Classique 3★ sur le quai, à pied du marché aux huîtres. Chiens acceptés avec un petit supplément.`,
        pitchEs: 'Clásico 3★ en el muelle, a pie del mercado de ostras. Perros admitidos con un pequeño suplemento.',
        pitchPt: 'Clássico 3★ no cais, a pé do mercado de ostras. Cães aceites com pequeno suplemento.',
      },
      {
        name: 'Auberge de la Motte Jean',
        pitchEn: 'Renovated 17th-century farmhouse-hotel just outside town. Large enclosed garden, ideal final stop for a dog after 4 days on the road.',
        pitchFr: `Auberge du XVIIᵉ siècle rénovée à la sortie du village. Grand jardin clos, étape finale idéale pour un chien après 4 jours de route.`,
        pitchEs: 'Casona del siglo XVII rehabilitada a las afueras. Jardín cerrado amplio, parada final ideal para un perro tras 4 días de carretera.',
        pitchPt: 'Casa do século XVII recuperada à saída da vila. Jardim fechado amplo, paragem final ideal para um cão depois de 4 dias de estrada.',
      },
    ],
  },
]

const COPY = {
  en: {
    dayLabels: ['Day 1', 'Day 2 & 3', 'Day 4', 'Day 5'],
    dayLabelsShort: ['Day 1', 'Day 2–3', 'Day 4', 'Day 5'],
    checkAvailability: 'Check availability →',
    browseAll: (city: string) => `Browse all pet-friendly hotels in ${city} →`,
    eyebrow: '5-day pet-friendly Brittany road trip',
    title: 'Brittany Road Trip with Your Dog: 5 Days, 4 Stops, 1 Loop',
    intro: `North Brittany packs four very different dog-friendly stops into a 200 km loop you can drive comfortably in five days. We've matched each city to the right length of stay, picked two verified hotels per stop and noted the seasonal beach rules that catch every visitor out the first time. Distances are short, drives are scenic, and dogs are welcome almost everywhere outside the peak summer beach ban.`,
    stats: ['5 days', '~200 km total drive', '4 stops · 4 nights', 'Dogs welcome at every hotel'],
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
      { h: 'Beach rules', p: `Most Brittany municipal beaches ban dogs between 1 June and 30 September. Outside that window, leashed dogs are accepted almost everywhere. The exceptions where dogs are allowed year-round are documented above.` },
      { h: 'Tide schedules', p: 'Tides here are among the largest in Europe (up to 13 m). Always check the horaire des marées before walking on any beach - the sand can disappear in minutes.' },
      { h: 'Driving with a dog', p: 'French law requires dogs to be restrained in the car (harness, crate or barrier). Heat is the bigger risk in summer - never leave a dog in a parked car, even with a window cracked.' },
      { h: 'Emergency vet', p: 'Saint-Malo: Clinique Vétérinaire de la Roche, 02 99 81 22 22. Rennes: ChronoVet Atlantia, 02 99 14 91 91 (24h).' },
    ],
    faqHeading: 'Frequently asked questions',
    faq: [
      { q: 'Can I do this trip without a car?', a: `Rennes is on the Paris TGV line and Saint-Malo is reachable by direct TER train (1h). Dinard and Cancale are harder without a car - the Compagnie Corsaire ferry covers Saint-Malo–Dinard (10 min), but Cancale requires a local bus (line 14) which accepts small dogs in carriers only. A rental car for days 2–5 is the comfortable option.` },
      { q: 'Best season to do this with a dog?', a: 'May to mid-June and September to mid-October. Mild weather, the beach ban is off, terraces are open, and the area is far less crowded than July–August. Winter is doable but several seasonal restaurants close.' },
      { q: 'Will my dog be welcome at restaurants?', a: 'Brittany terraces are very dog-tolerant. Indoor seating depends on the establishment - ask. The Marché aux Huîtres in Cancale is open-air dockside, perfect with a dog.' },
    ],
  },
  fr: {
    dayLabels: [`Jour 1`, `Jours 2 & 3`, `Jour 4`, `Jour 5`],
    dayLabelsShort: [`Jour 1`, `Jours 2–3`, `Jour 4`, `Jour 5`],
    checkAvailability: `Voir les disponibilités →`,
    browseAll: (city: string) => `Voir tous les hôtels pet-friendly à ${city} →`,
    eyebrow: 'Road trip de 5 jours en Bretagne avec son chien',
    title: 'Road trip en Bretagne avec son chien : 5 jours, 4 étapes, 1 boucle',
    intro: `Le nord de la Bretagne réunit quatre étapes dog-friendly très différentes sur une boucle de 200 km que l'on peut faire confortablement en cinq jours. On a calé la durée idéale de chaque ville, sélectionné deux hôtels vérifiés par étape et signalé les règles de plage saisonnières qui surprennent chaque visiteur à la première marée. Distances courtes, routes scéniques, chiens bienvenus presque partout hors interdiction estivale.`,
    stats: ['5 jours', '~200 km de route', '4 étapes · 4 nuits', 'Chiens acceptés dans tous les hôtels'],
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
      { h: 'Règles de plage', p: `La plupart des plages municipales bretonnes interdisent les chiens du 1ᵉʳ juin au 30 septembre. Hors saison, les chiens en laisse sont acceptés presque partout. Les exceptions ouvertes toute l'année sont indiquées plus haut.` },
      { h: 'Horaires des marées', p: `Les marées comptent parmi les plus fortes d'Europe (jusqu'à 13 m). Consultez toujours l'horaire avant de descendre sur la plage - le sable peut disparaître en quelques minutes.` },
      { h: 'Conduire avec un chien', p: 'La loi française impose que le chien soit attaché dans la voiture (harnais, caisse ou grille). La chaleur est le vrai risque l’été - ne jamais laisser un chien dans une voiture stationnée, même avec une vitre entrouverte.' },
      { h: `Vétérinaire d'urgence`, p: 'Saint-Malo : Clinique Vétérinaire de la Roche, 02 99 81 22 22. Rennes : ChronoVet Atlantia, 02 99 14 91 91 (24h).' },
    ],
    faqHeading: 'Questions fréquentes',
    faq: [
      { q: 'Peut-on faire ce voyage sans voiture ?', a: `Rennes est sur la ligne TGV depuis Paris et Saint-Malo se rejoint en TER direct (1h). Dinard et Cancale sont plus compliqués sans voiture - la navette Compagnie Corsaire couvre Saint-Malo–Dinard (10 min) mais Cancale nécessite un bus local (ligne 14) qui n'accepte les petits chiens qu'en sac. Une location pour les jours 2 à 5 reste l'option confortable.` },
      { q: 'Quelle est la meilleure saison ?', a: 'Mai à mi-juin et septembre à mi-octobre. Météo douce, fin de l’interdiction des plages, terrasses ouvertes, fréquentation très en dessous de juillet–août. L’hiver fonctionne aussi mais plusieurs restaurants saisonniers ferment.' },
      { q: 'Les chiens sont-ils bienvenus au restaurant ?', a: 'Les terrasses bretonnes sont très tolérantes. La salle dépend de l’établissement - demandez. Le Marché aux Huîtres à Cancale est en plein air sur le port, parfait avec un chien.' },
    ],
  },
  es: {
    dayLabels: ['Día 1', 'Días 2 y 3', 'Día 4', 'Día 5'],
    dayLabelsShort: ['Día 1', 'Días 2–3', 'Día 4', 'Día 5'],
    checkAvailability: 'Ver disponibilidad →',
    browseAll: (city: string) => `Ver todos los hoteles pet-friendly en ${city} →`,
    eyebrow: 'Road trip de 5 días por Bretaña con perro',
    title: 'Road trip por Bretaña con tu perro: 5 días, 4 paradas, 1 circuito',
    intro: `El norte de Bretaña reúne cuatro paradas dog-friendly muy distintas en un circuito de 200 km que se hace cómodamente en cinco días. Hemos ajustado la duración ideal de cada ciudad, seleccionado dos hoteles verificados por etapa y señalado las normas estacionales de playa que sorprenden a todo visitante novato. Distancias cortas, carreteras escénicas, perros bienvenidos casi en todas partes fuera de la prohibición veraniega.`,
    stats: ['5 días', '~200 km totales', '4 paradas · 4 noches', 'Perros admitidos en cada hotel'],
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
      { h: 'Normas de playas', p: `La mayoría de las playas municipales bretonas prohíben perros del 1 de junio al 30 de septiembre. Fuera de esa franja, los perros con correa se aceptan casi en todas. Las excepciones abiertas todo el año se indican arriba.` },
      { h: 'Horario de mareas', p: `Las mareas están entre las más fuertes de Europa (hasta 13 m). Consulta siempre el horaire des marées antes de bajar a la playa - la arena puede desaparecer en minutos.` },
      { h: 'Conducir con perro', p: 'La ley francesa exige que el perro vaya sujeto en el coche (arnés, transportín o reja). El calor es el riesgo real en verano - nunca dejes al perro en un coche aparcado, ni con la ventana entreabierta.' },
      { h: 'Veterinario de urgencia', p: 'Saint-Malo: Clinique Vétérinaire de la Roche, 02 99 81 22 22. Rennes: ChronoVet Atlantia, 02 99 14 91 91 (24h).' },
    ],
    faqHeading: 'Preguntas frecuentes',
    faq: [
      { q: '¿Se puede hacer sin coche?', a: `Rennes está en la línea TGV desde París y Saint-Malo se llega en TER directo (1h). Dinard y Cancale son más complicados sin coche - la lanzadera Compagnie Corsaire cubre Saint-Malo–Dinard (10 min), pero Cancale requiere un autobús local (línea 14) que solo admite perros pequeños en bolso. Un coche de alquiler de los días 2 a 5 es la opción cómoda.` },
      { q: '¿Mejor temporada con perro?', a: 'Mayo a mediados de junio y septiembre a mediados de octubre. Tiempo suave, prohibición de playa levantada, terrazas abiertas, mucho menos afluencia que en julio–agosto. El invierno funciona pero varios restaurantes estacionales cierran.' },
      { q: '¿Aceptan perros en restaurantes?', a: 'Las terrazas bretonas son muy tolerantes. La sala depende del establecimiento - pregunta. El Marché aux Huîtres de Cancale es al aire libre en el muelle, perfecto con perro.' },
    ],
  },
  pt: {
    dayLabels: ['Dia 1', 'Dias 2 e 3', 'Dia 4', 'Dia 5'],
    dayLabelsShort: ['Dia 1', 'Dias 2–3', 'Dia 4', 'Dia 5'],
    checkAvailability: 'Ver disponibilidade →',
    browseAll: (city: string) => `Ver todos os hotéis pet-friendly em ${city} →`,
    eyebrow: 'Road trip de 5 dias pela Bretanha com cão',
    title: 'Road trip pela Bretanha com o seu cão: 5 dias, 4 paragens, 1 circuito',
    intro: `O norte da Bretanha junta quatro paragens dog-friendly muito diferentes num circuito de 200 km que se faz confortavelmente em cinco dias. Calibrámos a duração ideal de cada cidade, seleccionámos dois hotéis verificados por etapa e sinalizámos as regras sazonais de praia que apanham qualquer visitante de surpresa. Distâncias curtas, estradas cénicas, cães bem-vindos quase em todo o lado fora da proibição de verão.`,
    stats: ['5 dias', '~200 km totais', '4 paragens · 4 noites', 'Cães aceites em todos os hotéis'],
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
      { h: 'Regras de praia', p: `A maioria das praias municipais bretãs proíbe cães de 1 de junho a 30 de setembro. Fora desse período, cães com trela são aceites quase em todo o lado. As excepções abertas todo o ano estão indicadas acima.` },
      { h: 'Horário das marés', p: `As marés estão entre as mais fortes da Europa (até 13 m). Consulte sempre o horaire des marées antes de descer à praia - a areia pode desaparecer em minutos.` },
      { h: 'Conduzir com o cão', p: 'A lei francesa exige que o cão esteja preso no carro (arnês, transportadora ou grelha). O calor é o verdadeiro risco no verão - nunca deixe o cão num carro estacionado, nem com janela entreaberta.' },
      { h: 'Veterinário de urgência', p: 'Saint-Malo: Clinique Vétérinaire de la Roche, 02 99 81 22 22. Rennes: ChronoVet Atlantia, 02 99 14 91 91 (24h).' },
    ],
    faqHeading: 'Perguntas frequentes',
    faq: [
      { q: 'Dá para fazer sem carro?', a: `Rennes está na linha TGV desde Paris e Saint-Malo chega-se em TER directo (1h). Dinard e Cancale são mais complicados sem carro - o barco Compagnie Corsaire cobre Saint-Malo–Dinard (10 min), mas Cancale exige um autocarro local (linha 14) que só aceita cães pequenos em saco. Um carro de aluguer nos dias 2 a 5 é a opção confortável.` },
      { q: 'Melhor época com cão?', a: 'Maio a meados de junho e setembro a meados de outubro. Clima ameno, proibição de praia levantada, esplanadas abertas, muito menos afluência que julho–agosto. O inverno funciona mas vários restaurantes sazonais fecham.' },
      { q: 'Aceitam cães nos restaurantes?', a: 'As esplanadas bretãs são muito tolerantes. A sala depende do estabelecimento - pergunte. O Marché aux Huîtres em Cancale é ao ar livre no cais, perfeito com cão.' },
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

  // Structured data: TouristTrip itinerary
  const tripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: 'Brittany Pet-Friendly Road Trip',
    description: 'A 5-day road-trip itinerary across north Brittany with a dog: Rennes, Saint-Malo, Dinard, Cancale.',
    touristType: 'Pet owners',
    itinerary: STOPS.map((s, i) => ({
      '@type': 'Place',
      name: s.name,
      address: { '@type': 'PostalAddress', addressCountry: 'FR', addressRegion: 'Brittany', addressLocality: s.name },
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
    return { why: s.whyEn, hl: s.highlightsEn, hotels: s.hotels.map(h => ({ name: h.name, pitch: h.pitchEn })) }
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-700 to-sky-800 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 40%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-xs font-semibold uppercase tracking-widest text-emerald-200 mb-3">{t.eyebrow}</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{t.title}</h1>
          <p className="text-lg sm:text-xl text-emerald-50 max-w-3xl">{t.intro}</p>
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
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">{t.dayLabelsShort[i]}</div>
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
            title="Brittany pet-friendly road trip map"
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
                <header className="px-5 py-4 sm:px-7 sm:py-5 bg-gradient-to-r from-emerald-50 to-sky-50 border-b border-stone-200">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">{dayLabel}</span>
                    <h3 className="text-2xl font-bold text-stone-900">
                      {s.hasDestPage ? (
                        <Link href={`/${locale}/destinations/${s.slug}`} className="hover:text-emerald-700">
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
                          <span className="text-emerald-600 mt-0.5">●</span>
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
                          className="block bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-lg p-4 transition"
                        >
                          <div className="font-semibold text-stone-900">{h.name}</div>
                          <p className="text-xs text-stone-600 mt-1 leading-relaxed">{h.pitch}</p>
                          <div className="mt-2 text-xs font-semibold text-emerald-700">
                            {t.checkAvailability}
                          </div>
                        </a>
                      ))}
                    </div>
                    <a
                      href={buildAllezDestLink(s.name, 'France', `${CAMPAIGN_BASE}-${s.slug}-all`, s.nights)}
                      target="_blank"
                      rel="noopener sponsored"
                      className="inline-block mt-3 text-sm text-stone-600 hover:text-emerald-700 underline underline-offset-2"
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
        href={buildAllezDestLink('Saint-Malo', 'France', `${CAMPAIGN_BASE}-sticky`, 2)}
      />
    </main>
  )
}
