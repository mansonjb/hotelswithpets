import Link from 'next/link'
import Image from 'next/image'
import { GuideFooter } from '../_components/GuideFooter'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezLink } from '@/lib/site'
import PetMap from '@/components/PetMap'
import destinations from '@/data/destinations.json'
import hotels from '@/data/hotels.json'

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
    en: 'European City Trip With Your Dog: Paris → Brussels → Amsterdam → Berlin (10-Day Itinerary) | HotelsWithPets.com',
    fr: 'City trip en Europe avec son chien : Paris → Bruxelles → Amsterdam → Berlin (itinéraire 10 jours) | HotelsWithPets.com',
    es: 'City trip por Europa con tu perro: París → Bruselas → Ámsterdam → Berlín (itinerario 10 días) | HotelsWithPets.com',
  }
  const descriptions: Record<string, string> = {
    en: 'A 10-day train-friendly city-trip itinerary across four iconic European capitals with your dog. Recommended pet-friendly hotels, live Booking.com maps, transport rules and dog-walking spots in each city.',
    fr: "Itinéraire de 10 jours en train à travers quatre capitales européennes emblématiques avec votre chien. Hôtels pet-friendly recommandés, cartes Booking.com en direct, règles de transport et lieux de balade canine dans chaque ville.",
    es: 'Itinerario de 10 días en tren por cuatro icónicas capitales europeas con tu perro. Hoteles pet-friendly recomendados, mapas Booking.com en vivo, normas de transporte y lugares para pasear al perro en cada ciudad.',
  }

  const today = new Date().toISOString().split('T')[0]

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/city-trip-chien`,
      languages: {
        en: `${SITE_URL}/en/guides/city-trip-chien`,
        fr: `${SITE_URL}/fr/guides/city-trip-chien`,
        es: `${SITE_URL}/es/guides/city-trip-chien`,
        'x-default': `${SITE_URL}/en/guides/city-trip-chien`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      type: 'article',
      publishedTime: '2026-04-27T00:00:00Z',
      modifiedTime: `${today}T00:00:00Z`,
    },
  }
}

// ─── Itinerary data (single source of truth) ────────────────────────────────────

const ROUTE_SLUGS = ['paris', 'brussels', 'amsterdam', 'berlin'] as const

interface CityCopy {
  days: string
  intro: string
  highlight: string  // single-line "must-do with your dog" headline
  highlightDesc: string
}

interface LegCopy {
  from: string
  to: string
  duration: string
  service: string
  petRule: string
}

interface PageCopy {
  hero: { tagline: string; title: string; subtitle: string }
  why: { title: string; bullets: string[] }
  stats: { duration: string; cities: string; transport: string; budget: string; durationVal: string; citiesVal: string; transportVal: string; budgetVal: string }
  citiesIntro: { kicker: string; title: string }
  cities: Record<string, CityCopy>
  hotelsLabel: string
  bookLabel: string
  detailsLabel: string
  mapLabel: string
  legsTitle: string
  legs: LegCopy[]
  practicalTitle: string
  practicalBullets: string[]
  faqTitle: string
  faqs: Array<{ q: string; a: string }>
}

const COPY: Record<string, PageCopy> = {
  en: {
    hero: {
      tagline: 'CITY-TRIP ITINERARY · 10 DAYS · WITH YOUR DOG',
      title: 'A train-friendly European city trip with your dog',
      subtitle: 'Four iconic capitals — Paris, Brussels, Amsterdam, Berlin — connected by direct dog-friendly trains. Pet-welcoming hotels, parks, and the live Booking.com map for every city.',
    },
    why: {
      title: 'Why this route works for dog owners',
      bullets: [
        'Every leg is a direct, dog-friendly train. No flights, no airline cargo holds — just leashed walks from station to hotel.',
        'All four cities have major fenced off-leash parks within a 20-minute walk of the central stations.',
        'No border paperwork inside the Schengen zone — you only need a valid EU pet passport with up-to-date rabies vaccination.',
        'Each city has at least one 24/7 emergency vet clinic — saved in the practical info below.',
        'The route avoids the heat-stress risk of southern Europe — comfortable for short-haired and brachycephalic breeds even in summer.',
      ],
    },
    stats: {
      duration: 'Duration', cities: 'Cities', transport: 'Transport', budget: 'Budget',
      durationVal: '10 days', citiesVal: '4 capitals', transportVal: 'Train (Eurostar / Thalys / ICE)', budgetVal: '€1,200–€2,500',
    },
    citiesIntro: { kicker: 'CITY BY CITY', title: 'Your stops, your hotels, your map' },
    cities: {
      paris: {
        days: 'Days 1–3',
        intro: "Start in the city where over 500,000 dogs share life with their owners. Paris is unusually relaxed about four-legged guests: the Marais, Saint-Germain and Canal Saint-Martin all welcome leashed dogs in cafés and on terraces. The 850-hectare Bois de Boulogne and 995-hectare Bois de Vincennes — both reachable by metro — give your dog space to run after long museum mornings. The metro accepts small dogs free in carriers; larger dogs need a reduced ticket and a leash.",
        highlight: 'Must-do with your dog: a sunset walk along the Canal Saint-Martin',
        highlightDesc: 'The 4.5 km canal between République and La Villette is fully pedestrianised, lined with dog-friendly café terraces, and ends at the 55-hectare Parc de la Villette where dogs run off-leash on the central lawns.',
      },
      brussels: {
        days: 'Days 4–5',
        intro: "Two hours by Thalys from Paris-Nord. Brussels is one of the calmest pet-friendly capitals in Western Europe: less crowded than Paris or Amsterdam, with a strong café culture and the gigantic Forêt de Soignes (4,400 hectares of beech forest) on the city's southern edge. Bus, tram and metro accept dogs free of charge. Most Belgian restaurants and shops welcome dogs without question — a water bowl at the door is a common sight.",
        highlight: 'Must-do with your dog: the Bois de la Cambre + Forêt de Soignes loop',
        highlightDesc: 'Take tram 7 to Vivier d\'Oie. The Bois de la Cambre (122 ha) flows directly into the Forêt de Soignes — a continuous 4,500 hectares of beech forest, with off-leash zones around the Étangs de Boitsfort.',
      },
      amsterdam: {
        days: 'Days 6–8',
        intro: "Direct Eurostar from Brussels-Midi (1h45). Amsterdam is built for dogs: the Vondelpark (47 ha), the Westerpark and the Amstelpark all have off-leash zones; trams accept dogs with a small ticket; the canals are walking territory for hours; and the entire Jordaan neighbourhood is a low-traffic dog walker's paradise. Watch out for the bikes — they always have priority and are fast.",
        highlight: 'Must-do with your dog: the Vondelpark morning loop',
        highlightDesc: 'Enter from the Stadhouderskade gate at 8:00. The 47-hectare park has multiple off-leash sections and you\'ll meet hundreds of locals doing the same morning ritual. Coffee at \'t Blauwe Theehuis afterwards — dogs welcome on the terrace.',
      },
      berlin: {
        days: 'Days 9–10',
        intro: "Direct ICE train from Amsterdam Centraal (~6h, dog ticket ~€8 on Deutsche Bahn). Berlin is widely considered the most dog-friendly capital in Europe: an estimated 100,000 registered dogs, dogs on every U-Bahn and S-Bahn line, dogs in shops, dogs in offices. The Tiergarten (210 ha right in the centre) and the Volkspark Friedrichshain have huge off-leash sections. The Prenzlauer Berg and Kreuzberg neighbourhoods are full of dog-friendly cafés.",
        highlight: 'Must-do with your dog: a Tiergarten + Spree riverside walk',
        highlightDesc: 'Start at Brandenburg Gate, cross the Tiergarten to Schloss Bellevue, then follow the Spree down to Museum Island. Roughly 6 km, mostly off-leash territory inside the park. Locals stop for currywurst at Curry 36 — dogs welcome at the standing tables.',
      },
    },
    hotelsLabel: 'Recommended pet-friendly hotels',
    bookLabel: 'Book on Booking.com',
    detailsLabel: 'Details',
    mapLabel: 'Live map — all pet-friendly hotels',
    legsTitle: 'Transport between cities',
    legs: [
      { from: 'Paris', to: 'Brussels', duration: '~1h25', service: 'Thalys / Eurostar (direct)', petRule: 'Small dogs in carrier €7, larger dogs €30 (one ticket per dog).' },
      { from: 'Brussels', to: 'Amsterdam', duration: '~1h50', service: 'Eurostar / Thalys (direct)', petRule: 'Same fares as Paris–Brussels. Dogs travel beside you, not in cargo.' },
      { from: 'Amsterdam', to: 'Berlin', duration: '~6h20', service: 'Deutsche Bahn IC Berlin (direct, 4 daily)', petRule: 'Small dogs free in a carrier. Larger dogs need a Hundeticket (half adult fare, ~€20–40) and must be muzzled and leashed.' },
    ],
    practicalTitle: 'Before you go: paperwork, vaccines, vet contacts',
    practicalBullets: [
      'EU pet passport with valid rabies vaccination — required at every hotel check-in. Vaccine must be at least 21 days old, less than 12 months for the standard 1-year jab.',
      'Microchip ISO 11784/11785 — mandatory for all four countries. Must match the passport number.',
      'No tapeworm treatment required for this route (only relevant for UK / Ireland / Finland / Norway / Malta).',
      'Save the four 24/7 emergency vets in your phone before you leave: Paris (CHV des Cordeliers, +33 1 47 47 47 47), Brussels (Vétérinaires d\'Uccle, +32 2 374 80 99), Amsterdam (Medisch Centrum voor Dieren, +31 20 379 98 00), Berlin (Tierärztliche Klinik Falkenried, +49 30 8541 7099).',
      'Carry a soft muzzle in your bag at all times — required on Deutsche Bahn ICE/IC and on the Brussels and Berlin metros for larger dogs.',
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Can I really do this whole trip with no flights?', a: 'Yes. All three legs are direct trains, all dog-friendly. Total train time is roughly 9h45 spread over 10 days — very manageable for most dogs, especially with longer city stops in between.' },
      { q: 'How much does the trip cost for a couple with a medium dog?', a: 'Budget €1,200–€2,500 depending on hotel category. Train fares total ~€450–€700 for 2 adults + 1 dog if booked 4–6 weeks ahead. The dog\'s pet fee is €0 to €50 per stop depending on the hotel.' },
      { q: 'When is the best time of year for this route?', a: 'May–June and September are ideal: mild temperatures (15–22 °C), uncrowded parks and full hotel availability. July–August can hit 32 °C in Paris and Amsterdam — uncomfortable for dark-coated dogs.' },
      { q: 'Can I shorten this to a long weekend?', a: 'Yes — Paris + Brussels (4 days) is the easiest two-city version. The Eurostar between them is just 1h25 and pet rules are identical.' },
      { q: 'What if my dog is over 25 kg?', a: 'All four cities are large-dog friendly. The only friction point is metros where a leash + occasional muzzle are required. Hotels: most luxury properties accept dogs up to 25 kg, but call ahead to confirm if your dog is heavier.' },
    ],
  },
  fr: {
    hero: {
      tagline: 'CITY-TRIP · 10 JOURS · AVEC SON CHIEN',
      title: 'Un city trip en train à travers l\'Europe avec son chien',
      subtitle: 'Quatre capitales emblématiques — Paris, Bruxelles, Amsterdam, Berlin — reliées par des trains directs acceptant les chiens. Hôtels accueillant les animaux, parcs et la carte Booking.com en direct pour chaque ville.',
    },
    why: {
      title: 'Pourquoi cet itinéraire fonctionne avec un chien',
      bullets: [
        'Chaque tronçon est un train direct, accueillant les chiens. Pas d\'avion, pas de soute — juste une laisse de la gare à l\'hôtel.',
        'Les quatre villes disposent de grands parcs sans laisse à moins de 20 minutes à pied des gares centrales.',
        'Pas de paperasse aux frontières dans l\'espace Schengen — il suffit d\'un passeport européen valide avec vaccination antirabique à jour.',
        'Chaque ville dispose d\'au moins une clinique vétérinaire d\'urgence 24h/24 — coordonnées dans la section pratique en bas.',
        'L\'itinéraire évite la chaleur du sud — agréable pour les chiens à poil court et brachycéphales même en été.',
      ],
    },
    stats: {
      duration: 'Durée', cities: 'Villes', transport: 'Transport', budget: 'Budget',
      durationVal: '10 jours', citiesVal: '4 capitales', transportVal: 'Train (Eurostar / Thalys / ICE)', budgetVal: '1 200 €–2 500 €',
    },
    citiesIntro: { kicker: 'VILLE PAR VILLE', title: 'Vos étapes, vos hôtels, votre carte' },
    cities: {
      paris: {
        days: 'Jours 1–3',
        intro: 'Commencez dans la ville où plus de 500 000 chiens partagent la vie de leurs propriétaires. Paris est étonnamment décontracté avec les compagnons à quatre pattes : le Marais, Saint-Germain et le Canal Saint-Martin accueillent les chiens en laisse dans les cafés et en terrasse. Le Bois de Boulogne (850 ha) et le Bois de Vincennes (995 ha) — tous deux accessibles en métro — offrent à votre chien de l\'espace après les longues matinées musée. Le métro accepte gratuitement les petits chiens en cage ; les plus grands nécessitent un billet réduit et une laisse.',
        highlight: 'Incontournable avec son chien : balade au coucher du soleil le long du Canal Saint-Martin',
        highlightDesc: 'Les 4,5 km du canal entre République et La Villette sont entièrement piétons, bordés de terrasses dog-friendly, et débouchent sur le Parc de la Villette (55 ha) où les chiens courent sans laisse sur les pelouses centrales.',
      },
      brussels: {
        days: 'Jours 4–5',
        intro: 'Deux heures de Thalys depuis Paris-Nord. Bruxelles est l\'une des capitales les plus calmes pour les chiens en Europe occidentale : moins bondée que Paris ou Amsterdam, avec une forte culture café et la gigantesque Forêt de Soignes (4 400 hectares de hêtraie) en bordure sud. Bus, tram et métro acceptent les chiens gratuitement. La plupart des restaurants et boutiques belges accueillent les chiens sans question — une gamelle d\'eau à l\'entrée est courante.',
        highlight: 'Incontournable avec son chien : la boucle Bois de la Cambre + Forêt de Soignes',
        highlightDesc: 'Prenez le tram 7 jusqu\'à Vivier d\'Oie. Le Bois de la Cambre (122 ha) débouche directement sur la Forêt de Soignes — soit 4 500 hectares continus de hêtraie, avec des zones sans laisse autour des Étangs de Boitsfort.',
      },
      amsterdam: {
        days: 'Jours 6–8',
        intro: 'Eurostar direct depuis Bruxelles-Midi (1h45). Amsterdam est faite pour les chiens : Vondelpark (47 ha), Westerpark et Amstelpark ont tous des zones sans laisse ; les tramways acceptent les chiens avec un petit billet ; les canaux sont des terrains de promenade pendant des heures ; et tout le quartier Jordaan est un paradis du promeneur de chien à faible circulation. Attention aux vélos — ils ont toujours la priorité et roulent vite.',
        highlight: 'Incontournable avec son chien : la boucle matinale du Vondelpark',
        highlightDesc: 'Entrez par la porte Stadhouderskade à 8h. Les 47 hectares du parc comptent plusieurs sections sans laisse et vous y croiserez des centaines de locaux faisant le même rituel matinal. Café au \'t Blauwe Theehuis ensuite — chiens bienvenus en terrasse.',
      },
      berlin: {
        days: 'Jours 9–10',
        intro: 'Train ICE direct depuis Amsterdam Centraal (~6h, billet chien ~8 € sur la Deutsche Bahn). Berlin est largement considérée comme la capitale la plus dog-friendly d\'Europe : environ 100 000 chiens enregistrés, chiens dans tous les U-Bahn et S-Bahn, chiens dans les boutiques, chiens dans les bureaux. Le Tiergarten (210 ha en plein centre) et le Volkspark Friedrichshain ont d\'énormes sections sans laisse. Les quartiers de Prenzlauer Berg et Kreuzberg regorgent de cafés dog-friendly.',
        highlight: 'Incontournable avec son chien : Tiergarten + balade le long de la Spree',
        highlightDesc: 'Partez de la Porte de Brandebourg, traversez le Tiergarten jusqu\'au Schloss Bellevue, puis suivez la Spree jusqu\'à l\'Île aux Musées. Environ 6 km, principalement sans laisse à l\'intérieur du parc. Les locaux s\'arrêtent pour une currywurst chez Curry 36 — chiens bienvenus aux tables debout.',
      },
    },
    hotelsLabel: 'Hôtels recommandés acceptant les animaux',
    bookLabel: 'Réserver sur Booking.com',
    detailsLabel: 'Détails',
    mapLabel: 'Carte en direct — tous les hôtels pet-friendly',
    legsTitle: 'Transport entre les villes',
    legs: [
      { from: 'Paris', to: 'Bruxelles', duration: '~1h25', service: 'Thalys / Eurostar (direct)', petRule: 'Petits chiens en cage 7 €, grands chiens 30 € (un billet par chien).' },
      { from: 'Bruxelles', to: 'Amsterdam', duration: '~1h50', service: 'Eurostar / Thalys (direct)', petRule: 'Mêmes tarifs que Paris–Bruxelles. Le chien voyage à côté de vous, pas en soute.' },
      { from: 'Amsterdam', to: 'Berlin', duration: '~6h20', service: 'Deutsche Bahn IC Berlin (direct, 4 par jour)', petRule: 'Petits chiens gratuits en cage. Grands chiens : Hundeticket (demi-tarif adulte, ~20–40 €), muselière et laisse obligatoires.' },
    ],
    practicalTitle: 'Avant de partir : paperasse, vaccins, contacts vétérinaires',
    practicalBullets: [
      'Passeport européen pour animal avec vaccination antirabique valide — exigé à chaque enregistrement d\'hôtel. Vaccin d\'au moins 21 jours, moins de 12 mois pour le rappel annuel standard.',
      'Puce électronique ISO 11784/11785 — obligatoire dans les quatre pays. Doit correspondre au numéro du passeport.',
      'Aucun traitement contre l\'échinococcose requis pour cet itinéraire (uniquement pour le Royaume-Uni, l\'Irlande, la Finlande, la Norvège, Malte).',
      'Enregistrez les quatre vétérinaires d\'urgence 24h/24 dans votre téléphone avant de partir : Paris (CHV des Cordeliers, +33 1 47 47 47 47), Bruxelles (Vétérinaires d\'Uccle, +32 2 374 80 99), Amsterdam (Medisch Centrum voor Dieren, +31 20 379 98 00), Berlin (Tierärztliche Klinik Falkenried, +49 30 8541 7099).',
      'Gardez une muselière souple dans votre sac en permanence — exigée sur les ICE/IC de la Deutsche Bahn et dans les métros bruxellois et berlinois pour les grands chiens.',
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Puis-je vraiment faire tout ce voyage sans avion ?', a: 'Oui. Les trois tronçons sont des trains directs, tous acceptant les chiens. Le temps total de train est d\'environ 9h45 réparti sur 10 jours — gérable pour la plupart des chiens, surtout avec des escales longues entre les étapes.' },
      { q: 'Combien coûte ce voyage pour un couple avec un chien moyen ?', a: 'Comptez 1 200 à 2 500 € selon la catégorie d\'hôtel. Les billets de train totalisent ~450–700 € pour 2 adultes + 1 chien si réservés 4 à 6 semaines à l\'avance. Le supplément animal varie de 0 à 50 € par étape selon l\'hôtel.' },
      { q: 'Quelle est la meilleure période ?', a: 'Mai-juin et septembre sont idéaux : températures douces (15–22 °C), parcs peu fréquentés et hôtels disponibles. Juillet-août peut atteindre 32 °C à Paris et Amsterdam — désagréable pour les chiens à poil sombre.' },
      { q: 'Puis-je raccourcir en long week-end ?', a: 'Oui — Paris + Bruxelles (4 jours) est la version deux-villes la plus simple. L\'Eurostar entre les deux ne fait que 1h25 et les règles animaux sont identiques.' },
      { q: 'Et si mon chien fait plus de 25 kg ?', a: 'Les quatre villes accueillent les grands chiens. Le seul point de friction est le métro où laisse + muselière occasionnelle sont requises. Hôtels : la plupart des établissements de luxe acceptent jusqu\'à 25 kg, appelez à l\'avance si votre chien dépasse.' },
    ],
  },
  es: {
    hero: {
      tagline: 'CITY-TRIP · 10 DÍAS · CON TU PERRO',
      title: 'Un city trip europeo en tren con tu perro',
      subtitle: 'Cuatro capitales icónicas — París, Bruselas, Ámsterdam, Berlín — conectadas por trenes directos que admiten perros. Hoteles que reciben mascotas, parques y el mapa Booking.com en vivo para cada ciudad.',
    },
    why: {
      title: 'Por qué este itinerario funciona con perro',
      bullets: [
        'Cada tramo es un tren directo y dog-friendly. Sin aviones ni bodegas — solo un paseo con correa de la estación al hotel.',
        'Las cuatro ciudades cuentan con grandes parques sin correa a menos de 20 minutos a pie de las estaciones centrales.',
        'Sin papeleo en las fronteras dentro del espacio Schengen — solo necesitas un pasaporte europeo de mascota con vacunación antirrábica vigente.',
        'Cada ciudad tiene al menos una clínica veterinaria de urgencias 24/7 — datos en la sección práctica al final.',
        'El itinerario evita el calor del sur — cómodo para perros de pelo corto y braquicéfalos incluso en verano.',
      ],
    },
    stats: {
      duration: 'Duración', cities: 'Ciudades', transport: 'Transporte', budget: 'Presupuesto',
      durationVal: '10 días', citiesVal: '4 capitales', transportVal: 'Tren (Eurostar / Thalys / ICE)', budgetVal: '1.200 €–2.500 €',
    },
    citiesIntro: { kicker: 'CIUDAD POR CIUDAD', title: 'Tus paradas, tus hoteles, tu mapa' },
    cities: {
      paris: {
        days: 'Días 1–3',
        intro: 'Empieza en la ciudad donde más de 500.000 perros comparten la vida con sus dueños. París es sorprendentemente relajado con los compañeros de cuatro patas: el Marais, Saint-Germain y el Canal Saint-Martin admiten perros con correa en cafés y terrazas. El Bois de Boulogne (850 ha) y el Bois de Vincennes (995 ha) — accesibles en metro — dan a tu perro espacio tras largas mañanas de museo. El metro admite perros pequeños gratis en transportín; los más grandes necesitan billete reducido y correa.',
        highlight: 'Imprescindible con tu perro: paseo al atardecer por el Canal Saint-Martin',
        highlightDesc: 'Los 4,5 km del canal entre République y La Villette son totalmente peatonales, bordeados de terrazas dog-friendly, y desembocan en el Parc de la Villette (55 ha) donde los perros corren sin correa por las praderas centrales.',
      },
      brussels: {
        days: 'Días 4–5',
        intro: 'Dos horas en Thalys desde París-Nord. Bruselas es una de las capitales más tranquilas para perros en Europa Occidental: menos masificada que París o Ámsterdam, con una fuerte cultura de café y la gigantesca Forêt de Soignes (4.400 hectáreas de hayedo) en su borde sur. Bus, tranvía y metro admiten perros gratis. La mayoría de restaurantes y tiendas belgas reciben perros sin objeción — un bol de agua en la puerta es habitual.',
        highlight: 'Imprescindible con tu perro: el circuito Bois de la Cambre + Forêt de Soignes',
        highlightDesc: 'Toma el tranvía 7 hasta Vivier d\'Oie. El Bois de la Cambre (122 ha) desemboca directamente en la Forêt de Soignes — 4.500 hectáreas continuas de hayedo, con zonas sin correa alrededor de los Étangs de Boitsfort.',
      },
      amsterdam: {
        days: 'Días 6–8',
        intro: 'Eurostar directo desde Bruselas-Midi (1h45). Ámsterdam está hecha para perros: Vondelpark (47 ha), Westerpark y Amstelpark tienen zonas sin correa; los tranvías admiten perros con billete pequeño; los canales son terreno de paseo durante horas; y todo el barrio del Jordaan es un paraíso para los paseadores de perros con poco tráfico. Atención a las bicis — siempre tienen prioridad y van rápido.',
        highlight: 'Imprescindible con tu perro: el circuito matinal del Vondelpark',
        highlightDesc: 'Entra por la puerta de Stadhouderskade a las 8:00. Las 47 hectáreas del parque tienen varias secciones sin correa y te cruzarás con cientos de locales en el mismo ritual matutino. Café en \'t Blauwe Theehuis después — perros bienvenidos en terraza.',
      },
      berlin: {
        days: 'Días 9–10',
        intro: 'Tren ICE directo desde Ámsterdam Centraal (~6h, billete canino ~8 € en Deutsche Bahn). Berlín es ampliamente considerada la capital más dog-friendly de Europa: unos 100.000 perros registrados, perros en cada U-Bahn y S-Bahn, perros en tiendas, perros en oficinas. El Tiergarten (210 ha en pleno centro) y el Volkspark Friedrichshain tienen enormes secciones sin correa. Los barrios de Prenzlauer Berg y Kreuzberg están llenos de cafés dog-friendly.',
        highlight: 'Imprescindible con tu perro: paseo por Tiergarten + Spree',
        highlightDesc: 'Empieza en la Puerta de Brandeburgo, cruza el Tiergarten hasta Schloss Bellevue, luego sigue el Spree hasta la Isla de los Museos. Unos 6 km, mayoritariamente sin correa dentro del parque. Los locales paran a por currywurst en Curry 36 — perros bienvenidos en las mesas altas.',
      },
    },
    hotelsLabel: 'Hoteles recomendados que admiten mascotas',
    bookLabel: 'Reservar en Booking.com',
    detailsLabel: 'Detalles',
    mapLabel: 'Mapa en vivo — todos los hoteles pet-friendly',
    legsTitle: 'Transporte entre ciudades',
    legs: [
      { from: 'París', to: 'Bruselas', duration: '~1h25', service: 'Thalys / Eurostar (directo)', petRule: 'Perros pequeños en transportín 7 €, grandes 30 € (un billete por perro).' },
      { from: 'Bruselas', to: 'Ámsterdam', duration: '~1h50', service: 'Eurostar / Thalys (directo)', petRule: 'Mismas tarifas que París–Bruselas. El perro viaja a tu lado, no en bodega.' },
      { from: 'Ámsterdam', to: 'Berlín', duration: '~6h20', service: 'Deutsche Bahn IC Berlin (directo, 4 al día)', petRule: 'Perros pequeños gratis en transportín. Grandes: Hundeticket (media tarifa adulta, ~20–40 €), bozal y correa obligatorios.' },
    ],
    practicalTitle: 'Antes de salir: papeleo, vacunas, contactos veterinarios',
    practicalBullets: [
      'Pasaporte europeo de mascota con vacunación antirrábica vigente — exigido en cada check-in. La vacuna debe tener al menos 21 días y menos de 12 meses para la dosis anual estándar.',
      'Microchip ISO 11784/11785 — obligatorio en los cuatro países. Debe coincidir con el número del pasaporte.',
      'No se requiere tratamiento contra la equinococosis para este itinerario (solo Reino Unido, Irlanda, Finlandia, Noruega, Malta).',
      'Guarda los cuatro veterinarios de urgencias 24/7 en tu móvil antes de salir: París (CHV des Cordeliers, +33 1 47 47 47 47), Bruselas (Vétérinaires d\'Uccle, +32 2 374 80 99), Ámsterdam (Medisch Centrum voor Dieren, +31 20 379 98 00), Berlín (Tierärztliche Klinik Falkenried, +49 30 8541 7099).',
      'Lleva un bozal flexible en el bolso siempre — exigido en ICE/IC de Deutsche Bahn y en los metros de Bruselas y Berlín para perros grandes.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Puedo realmente hacer todo el viaje sin volar?', a: 'Sí. Los tres tramos son trenes directos y dog-friendly. El tiempo total de tren es de unas 9h45 repartidas en 10 días — manejable para la mayoría de perros, sobre todo con paradas largas entre etapas.' },
      { q: '¿Cuánto cuesta el viaje para una pareja con un perro mediano?', a: 'Presupuesta 1.200–2.500 € según categoría de hotel. Los billetes de tren suman ~450–700 € para 2 adultos + 1 perro si se reservan con 4–6 semanas. El cargo por mascota va de 0 a 50 € por parada según el hotel.' },
      { q: '¿Cuál es la mejor época?', a: 'Mayo-junio y septiembre son ideales: temperaturas suaves (15–22 °C), parques poco concurridos y hoteles disponibles. Julio-agosto puede alcanzar 32 °C en París y Ámsterdam — incómodo para perros de pelo oscuro.' },
      { q: '¿Puedo acortarlo a un fin de semana largo?', a: 'Sí — París + Bruselas (4 días) es la versión de dos ciudades más sencilla. El Eurostar entre ambas dura solo 1h25 y las normas de mascotas son idénticas.' },
      { q: '¿Y si mi perro pesa más de 25 kg?', a: 'Las cuatro ciudades son aptas para perros grandes. El único punto crítico es el metro, donde correa + bozal ocasional son obligatorios. Hoteles: la mayoría de los de lujo aceptan hasta 25 kg, llama antes si tu perro pesa más.' },
    ],
  },
}

// ─── Page ────────────────────────────────────────────────────────────────────────

export default async function CityTripGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const c = COPY[locale] ?? COPY.en

  // Resolve cities from data
  const cities = ROUTE_SLUGS.map((slug) => {
    const dest = destinations.find((d) => d.slug === slug)
    if (!dest) return null
    const cityHotels = hotels
      .filter((h) => h.destinationSlug === slug)
      .slice(0, 3)
    return { slug, dest, hotels: cityHotels, copy: c.cities[slug] }
  }).filter((x): x is NonNullable<typeof x> => x !== null && Boolean(x.copy))

  // Schema.org TouristTrip
  const tripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: c.hero.title,
    description: c.hero.subtitle,
    url: `${SITE_URL}/${locale}/guides/city-trip-chien`,
    inLanguage: locale,
    touristType: 'Pet owner',
    itinerary: cities.map((city, i) => ({
      '@type': 'TouristDestination',
      position: i + 1,
      name: city.dest.name,
      address: { '@type': 'PostalAddress', addressCountry: city.dest.country, addressLocality: city.dest.name },
      geo: { '@type': 'GeoCoordinates', latitude: city.dest.lat, longitude: city.dest.lng },
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.12),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            🚂 {c.hero.tagline}
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">
            {c.hero.title}
          </h1>
          <p className="text-blue-100 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
            {c.hero.subtitle}
          </p>

          {/* Route visualization */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold">
            {cities.map((city, i) => (
              <span key={city.slug} className="flex items-center gap-2">
                <span className="bg-white/15 border border-white/20 px-3 py-1.5 rounded-full">
                  {city.dest.flag} {city.dest.name}
                </span>
                {i < cities.length - 1 && <span className="text-white/50">→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: c.stats.duration, val: c.stats.durationVal, emoji: '📅' },
              { label: c.stats.cities,   val: c.stats.citiesVal,   emoji: '🏙️' },
              { label: c.stats.transport,val: c.stats.transportVal,emoji: '🚂' },
              { label: c.stats.budget,   val: c.stats.budgetVal,   emoji: '💶' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl mb-1">{s.emoji}</p>
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">{s.label}</p>
                <p className="text-sm font-semibold text-gray-900">{s.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why this route ── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            🐾 {c.why.title}
          </h2>
          <ul className="space-y-4">
            {c.why.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-4 bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Cities intro ── */}
      <section className="bg-gray-50 pt-16 pb-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
            {c.citiesIntro.kicker}
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
            {c.citiesIntro.title}
          </h2>
        </div>
      </section>

      {/* ── City sections (one per city) ── */}
      {cities.map((city, idx) => (
        <section key={city.slug} className={`py-16 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white border-y border-gray-100'}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* City header */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="text-6xl">{city.dest.flag}</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">{city.copy.days}</p>
                <h3 className="text-3xl lg:text-4xl font-extrabold text-gray-900">{city.dest.name}</h3>
              </div>
              <Link
                href={`/${locale}/destinations/${city.slug}`}
                className="ml-auto text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
              >
                {locale === 'fr' ? 'Voir le guide complet →' : locale === 'es' ? 'Ver la guía completa →' : 'View full city guide →'}
              </Link>
            </div>

            {/* Hero photo */}
            {city.dest.heroImage && (
              <div className="relative w-full h-64 lg:h-80 rounded-2xl overflow-hidden mb-6 shadow-lg">
                <Image
                  src={city.dest.heroImage}
                  alt={`${city.dest.name} — pet-friendly city trip`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              </div>
            )}

            {/* Intro */}
            <p className="text-gray-700 text-lg leading-relaxed mb-8">{city.copy.intro}</p>

            {/* Highlight callout */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mb-10">
              <p className="text-sm font-bold text-amber-900 mb-2">⭐ {city.copy.highlight}</p>
              <p className="text-amber-900/80 text-sm leading-relaxed">{city.copy.highlightDesc}</p>
            </div>

            {/* Hotels */}
            {city.hotels.length > 0 && (
              <div className="mb-10">
                <h4 className="text-xl font-extrabold text-gray-900 mb-5">🏨 {c.hotelsLabel}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {city.hotels.map((hotel) => {
                    const allezUrl = buildAllezLink(hotel.name, city.dest.name, city.dest.country)
                    return (
                      <div key={hotel.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative h-40 bg-gray-100">
                          <Image
                            src={`/images/hotels/${hotel.id}.jpg`}
                            alt={hotel.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-amber-700">
                            {'★'.repeat(hotel.stars)}
                          </div>
                        </div>
                        <div className="p-4">
                          <h5 className="font-bold text-gray-900 text-sm leading-tight mb-1 line-clamp-2 min-h-[2.5rem]">{hotel.name}</h5>
                          <div className="flex items-center gap-2 mb-3 text-xs">
                            <span className="font-bold text-blue-700">{hotel.rating}/10</span>
                            <span className="text-gray-400">·</span>
                            <span className="text-gray-600">{hotel.priceFrom} €{locale === 'fr' ? '/nuit' : locale === 'es' ? '/noche' : '/night'}</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-4">
                            {hotel.petFee === 0
                              ? (locale === 'fr' ? '🐾 Sans supplément animal' : locale === 'es' ? '🐾 Sin cargo por mascota' : '🐾 No pet fee')
                              : (locale === 'fr' ? `🐾 Supplément ${hotel.petFee} €/nuit` : locale === 'es' ? `🐾 Cargo ${hotel.petFee} €/noche` : `🐾 Pet fee €${hotel.petFee}/night`)}
                          </p>
                          <div className="flex flex-col gap-2">
                            <a
                              href={allezUrl}
                              target="_blank"
                              rel="noopener nofollow sponsored"
                              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg transition-colors"
                            >
                              {c.bookLabel}
                            </a>
                            {'slug' in hotel && hotel.slug && (
                              <Link
                                href={`/${locale}/hotels/${hotel.slug}`}
                                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2 rounded-lg transition-colors"
                              >
                                {c.detailsLabel}
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Map */}
            <div>
              <h4 className="text-xl font-extrabold text-gray-900 mb-3">🗺️ {c.mapLabel}</h4>
              <PetMap
                lat={city.dest.lat}
                lng={city.dest.lng}
                destName={city.dest.name}
                country={city.dest.country}
                height={380}
              />
            </div>
          </div>
        </section>
      ))}

      {/* ── Transport between cities ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            🚂 {c.legsTitle}
          </h2>
          <div className="space-y-4">
            {c.legs.map((leg, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3 md:w-1/3">
                  <span className="text-lg font-bold text-gray-900">{leg.from}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-lg font-bold text-gray-900">{leg.to}</span>
                </div>
                <div className="md:w-2/3 text-sm text-gray-600 space-y-1">
                  <p><span className="font-semibold text-gray-900">⏱️ {leg.duration}</span> · {leg.service}</p>
                  <p>🐾 {leg.petRule}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Practical info ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            📋 {c.practicalTitle}
          </h2>
          <ul className="space-y-3">
            {c.practicalBullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4">
                <span className="text-blue-600 font-bold text-sm">✓</span>
                <p className="text-sm text-gray-700 leading-relaxed">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            ❓ {c.faqTitle}
          </h2>
          <div className="space-y-4">
            {c.faqs.map((f, i) => (
              <details key={i} className="bg-gray-50 border border-gray-200 rounded-2xl group">
                <summary className="cursor-pointer p-5 font-semibold text-gray-900 list-none flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-700 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other guides ── */}
      <GuideFooter locale={locale} currentSlug="city-trip-chien" />
    </div>
  )
}
