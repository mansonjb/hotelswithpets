import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import { CityTripGuide, type RouteCopy, type StickyConfig } from '../_components/CityTripGuide'
import { STAY22_AID } from '@/lib/site'

const SLUG = 'city-trip-chien'
const ROUTE_SLUGS = ['paris', 'brussels', 'amsterdam', 'berlin'] as const

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}

  const titles: Record<string, string> = {
    en: 'European City Trip With Your Dog: Paris → Brussels → Amsterdam → Berlin (10-Day Itinerary)',
    fr: 'City trip en Europe avec son chien : Paris → Bruxelles → Amsterdam → Berlin (itinéraire 10 jours)',
    es: 'City trip por Europa con tu perro: París → Bruselas → Ámsterdam → Berlín (itinerario 10 días)',
    pt: 'City trip por Europa com tu cão: París → Bruxelas → Amesterdão → Berlim (itinerario 10 dias)',
    de: 'Europäische Städtereise mit Ihrem Hund: Paris → Brüssel → Amsterdam → Berlin (10-Tage-Reiseplan)',
    nl: 'Europese city trip met je hond: Parijs → Brussel → Amsterdam → Berlijn (10-daagse route)',
  }
  const descriptions: Record<string, string> = {
    en: 'A 10-day train-friendly city-trip itinerary across four iconic European capitals with your dog. Recommended pet-friendly hotels, live Booking.com maps, transport rules and dog-walking spots in each city.',
    fr: "Itinéraire de 10 jours en train à travers quatre capitales européennes emblématiques avec votre chien. Hôtels pet-friendly recommandés, cartes Booking.com en direct, règles de transport et lieux de balade canine dans chaque ville.",
    es: 'Itinerario de 10 días en tren por cuatro icónicas capitales europeas con tu perro. Hoteles pet-friendly recomendados, mapas Booking.com en vivo, normas de transporte y lugares para pasear al perro en cada ciudad.',
    pt: 'Itinerario de 10 dias de comboio por cuatro icónicas capitales europeias com tu cão. Hotéis pet-friendly recomendados, mapas Booking.com en vivo, normas de transporte e lugares para pasear al cão en cada cidade.',
    de: 'Ein 10-tägiger, zugfreundlicher Städtereise-Reiseplan durch vier ikonische europäische Hauptstädte mit Ihrem Hund. Empfohlene hundefreundliche Hotels, Live-Karten von Booking.com, Transportregeln und Gassi-Spots in jeder Stadt.',
    nl: 'Een 10-daagse, treinvriendelijke city-trip route door vier iconische Europese hoofdsteden met je hond. Aanbevolen hondvriendelijke hotels, live Booking.com-kaarten, vervoersregels en uitlaatplekken in elke stad.',
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
      publishedTime: '2026-04-27T00:00:00Z',
      modifiedTime: `${today}T00:00:00Z`,
    },
  }
}

const COPY: Record<string, RouteCopy> = {
  en: {
    hero: {
      tagline: 'CITY-TRIP ITINERARY · 10 DAYS · WITH YOUR DOG',
      title: 'A train-friendly European city trip with your dog',
      subtitle: 'Four iconic capitals, Paris, Brussels, Amsterdam, Berlin, connected by direct dog-friendly trains. Pet-welcoming hotels, parks, and the live Booking.com map for every city.',
    },
    why: {
      title: 'Why this route works for dog owners',
      bullets: [
        'Every leg is a direct, dog-friendly train. No flights, no airline cargo holds, just leashed walks from station to hotel.',
        'All four cities have major fenced off-leash parks within a 20-minute walk of the central stations.',
        'No border paperwork inside the Schengen zone, you only need a valid EU pet passport with up-to-date rabies vaccination.',
        'Each city has at least one 24/7 emergency vet clinic, saved in the practical info below.',
        'The route avoids the heat-stress risk of southern Europe, comfortable for short-haired and brachycephalic breeds even in summer.',
      ],
    },
    stats: { duration: 'Duration', cities: 'Cities', transport: 'Transport', budget: 'Budget', durationVal: '10 days', citiesVal: '4 capitals', transportVal: 'Train (Eurostar / Thalys / ICE)', budgetVal: '€1,200–€2,500' },
    citiesIntro: { kicker: 'CITY BY CITY', title: 'Your stops, your hotels, your map' },
    cities: {
      paris: { days: 'Days 1–3', intro: "Start in the city where over 500,000 dogs share life with their owners. Paris is unusually relaxed about four-legged guests: the Marais, Saint-Germain and Canal Saint-Martin all welcome leashed dogs in cafés and on terraces. The 850-hectare Bois de Boulogne and 995-hectare Bois de Vincennes, both reachable by metro, give your dog space to run after long museum mornings. The metro accepts small dogs free in carriers; larger dogs need a reduced ticket and a leash.", highlight: 'Must-do with your dog: a sunset walk along the Canal Saint-Martin', highlightDesc: 'The 4.5 km canal between République and La Villette is fully pedestrianised, lined with dog-friendly café terraces, and ends at the 55-hectare Parc de la Villette where dogs run off-leash on the central lawns.' },
      brussels: { days: 'Days 4–5', intro: "Two hours by Thalys from Paris-Nord. Brussels is one of the calmest pet-friendly capitals in Western Europe: less crowded than Paris or Amsterdam, with a strong café culture and the gigantic Forêt de Soignes (4,400 hectares of beech forest) on the city's southern edge. Bus, tram and metro accept dogs free of charge. Most Belgian restaurants and shops welcome dogs without question, a water bowl at the door is a common sight.", highlight: 'Must-do with your dog: the Bois de la Cambre + Forêt de Soignes loop', highlightDesc: 'Take tram 7 to Vivier d\'Oie. The Bois de la Cambre (122 ha) flows directly into the Forêt de Soignes, a continuous 4,500 hectares of beech forest, with off-leash zones around the Étangs de Boitsfort.' },
      amsterdam: { days: 'Days 6–8', intro: "Direct Eurostar from Brussels-Midi (1h45). Amsterdam is built for dogs: the Vondelpark (47 ha), the Westerpark and the Amstelpark all have off-leash zones; trams accept dogs with a small ticket; the canals are walking territory for hours; and the entire Jordaan neighbourhood is a low-traffic dog walker's paradise. Watch out for the bikes, they always have priority and are fast.", highlight: 'Must-do with your dog: the Vondelpark morning loop', highlightDesc: 'Enter from the Stadhouderskade gate at 8:00. The 47-hectare park has multiple off-leash sections and you\'ll meet hundreds of locals doing the same morning ritual. Coffee at \'t Blauwe Theehuis afterwards, dogs welcome on the terrace.' },
      berlin: { days: 'Days 9–10', intro: "Direct ICE train from Amsterdam Centraal (~6h, dog ticket ~€8 on Deutsche Bahn). Berlin is widely considered the most dog-friendly capital in Europe: an estimated 100,000 registered dogs, dogs on every U-Bahn and S-Bahn line, dogs in shops, dogs in offices. The Tiergarten (210 ha right in the centre) and the Volkspark Friedrichshain have huge off-leash sections. The Prenzlauer Berg and Kreuzberg neighbourhoods are full of dog-friendly cafés.", highlight: 'Must-do with your dog: a Tiergarten + Spree riverside walk', highlightDesc: 'Start at Brandenburg Gate, cross the Tiergarten to Schloss Bellevue, then follow the Spree down to Museum Island. Roughly 6 km, mostly off-leash territory inside the park. Locals stop for currywurst at Curry 36, dogs welcome at the standing tables.' },
    },
    hotelsLabel: 'Recommended pet-friendly hotels',
    bookLabel: 'Book on Booking.com',
    detailsLabel: 'Details',
    mapLabel: 'Live map, all pet-friendly hotels',
    legsTitle: 'Transport between cities',
    legs: [
      { from: 'Paris', to: 'Brussels', duration: '~1h25', service: 'Thalys / Eurostar (direct)', petRule: 'Small dogs in carrier €7, larger dogs €30 (one ticket per dog).' },
      { from: 'Brussels', to: 'Amsterdam', duration: '~1h50', service: 'Eurostar / Thalys (direct)', petRule: 'Same fares as Paris–Brussels. Dogs travel beside you, not in cargo.' },
      { from: 'Amsterdam', to: 'Berlin', duration: '~6h20', service: 'Deutsche Bahn IC Berlin (direct, 4 daily)', petRule: 'Small dogs free in a carrier. Larger dogs need a Hundeticket (half adult fare, ~€20–40) and must be muzzled and leashed.' },
    ],
    practicalTitle: 'Before you go: paperwork, vaccines, vet contacts',
    practicalBullets: [
      'EU pet passport with valid rabies vaccination, required at every hotel check-in. Vaccine must be at least 21 days old, less than 12 months for the standard 1-year jab.',
      'Microchip ISO 11784/11785, mandatory for all four countries. Must match the passport number.',
      'No tapeworm treatment required for this route (only relevant for UK / Ireland / Finland / Norway / Malta).',
      'Save the four 24/7 emergency vets in your phone before you leave: Paris (CHV des Cordeliers, +33 1 47 47 47 47), Brussels (Vétérinaires d\'Uccle, +32 2 374 80 99), Amsterdam (Medisch Centrum voor Dieren, +31 20 379 98 00), Berlin (Tierärztliche Klinik Falkenried, +49 30 8541 7099).',
      'Carry a soft muzzle in your bag at all times, required on Deutsche Bahn ICE/IC and on the Brussels and Berlin metros for larger dogs.',
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Can I really do this whole trip with no flights?', a: 'Yes. All three legs are direct trains, all dog-friendly. Total train time is roughly 9h45 spread over 10 days, very manageable for most dogs, especially with longer city stops in between.' },
      { q: 'How much does the trip cost for a couple with a medium dog?', a: 'Budget €1,200–€2,500 depending on hotel category. Train fares total ~€450–€700 for 2 adults + 1 dog if booked 4–6 weeks ahead. The dog\'s pet fee is €0 to €50 per stop depending on the hotel.' },
      { q: 'When is the best time of year for this route?', a: 'May–June and September are ideal: mild temperatures (15–22 °C), uncrowded parks and full hotel availability. July–August can hit 32 °C in Paris and Amsterdam, uncomfortable for dark-coated dogs.' },
      { q: 'Can I shorten this to a long weekend?', a: 'Yes, Paris + Brussels (4 days) is the easiest two-city version. The Eurostar between them is just 1h25 and pet rules are identical.' },
      { q: 'What if my dog is over 25 kg?', a: 'All four cities are large-dog friendly. The only friction point is metros where a leash + occasional muzzle are required. Hotels: most luxury properties accept dogs up to 25 kg, but call ahead to confirm if your dog is heavier.' },
    ],
  },
  fr: {
    hero: { tagline: 'CITY-TRIP · 10 JOURS · AVEC SON CHIEN', title: "Un city trip en train à travers l'Europe avec son chien", subtitle: 'Quatre capitales emblématiques, Paris, Bruxelles, Amsterdam, Berlin, reliées par des trains directs acceptant les chiens. Hôtels accueillant les animaux, parcs et la carte Booking.com en direct pour chaque ville.' },
    why: { title: 'Pourquoi cet itinéraire fonctionne avec un chien', bullets: [
      "Chaque tronçon est un train direct, accueillant les chiens. Pas d'avion, pas de soute, juste une laisse de la gare à l'hôtel.",
      'Les quatre villes disposent de grands parcs sans laisse à moins de 20 minutes à pied des gares centrales.',
      "Pas de paperasse aux frontières dans l'espace Schengen, il suffit d'un passeport européen valide avec vaccination antirabique à jour.",
      "Chaque ville dispose d'au moins une clinique vétérinaire d'urgence 24h/24, coordonnées dans la section pratique en bas.",
      "L'itinéraire évite la chaleur du sud, agréable pour les chiens à poil court et brachycéphales même en été.",
    ] },
    stats: { duration: 'Durée', cities: 'Villes', transport: 'Transport', budget: 'Budget', durationVal: '10 jours', citiesVal: '4 capitales', transportVal: 'Train (Eurostar / Thalys / ICE)', budgetVal: '1 200 €–2 500 €' },
    citiesIntro: { kicker: 'VILLE PAR VILLE', title: 'Vos étapes, vos hôtels, votre carte' },
    cities: {
      paris: { days: 'Jours 1–3', intro: "Commencez dans la ville où plus de 500 000 chiens partagent la vie de leurs propriétaires. Paris est étonnamment décontracté avec les compagnons à quatre pattes : le Marais, Saint-Germain et le Canal Saint-Martin accueillent les chiens en laisse dans les cafés et en terrasse. Le Bois de Boulogne (850 ha) et le Bois de Vincennes (995 ha), tous deux accessibles en métro, offrent à votre chien de l'espace après les longues matinées musée. Le métro accepte gratuitement les petits chiens en cage ; les plus grands nécessitent un billet réduit et une laisse.", highlight: 'Incontournable avec son chien : balade au coucher du soleil le long du Canal Saint-Martin', highlightDesc: 'Les 4,5 km du canal entre République et La Villette sont entièrement piétons, bordés de terrasses dog-friendly, et débouchent sur le Parc de la Villette (55 ha) où les chiens courent sans laisse sur les pelouses centrales.' },
      brussels: { days: 'Jours 4–5', intro: "Deux heures de Thalys depuis Paris-Nord. Bruxelles est l'une des capitales les plus calmes pour les chiens en Europe occidentale : moins bondée que Paris ou Amsterdam, avec une forte culture café et la gigantesque Forêt de Soignes (4 400 hectares de hêtraie) en bordure sud. Bus, tram et métro acceptent les chiens gratuitement. La plupart des restaurants et boutiques belges accueillent les chiens sans question, une gamelle d'eau à l'entrée est courante.", highlight: 'Incontournable avec son chien : la boucle Bois de la Cambre + Forêt de Soignes', highlightDesc: "Prenez le tram 7 jusqu'à Vivier d'Oie. Le Bois de la Cambre (122 ha) débouche directement sur la Forêt de Soignes, soit 4 500 hectares continus de hêtraie, avec des zones sans laisse autour des Étangs de Boitsfort." },
      amsterdam: { days: 'Jours 6–8', intro: "Eurostar direct depuis Bruxelles-Midi (1h45). Amsterdam est faite pour les chiens : Vondelpark (47 ha), Westerpark et Amstelpark ont tous des zones sans laisse ; les tramways acceptent les chiens avec un petit billet ; les canaux sont des terrains de promenade pendant des heures ; et tout le quartier Jordaan est un paradis du promeneur de chien à faible circulation. Attention aux vélos, ils ont toujours la priorité et roulent vite.", highlight: 'Incontournable avec son chien : la boucle matinale du Vondelpark', highlightDesc: "Entrez par la porte Stadhouderskade à 8h. Les 47 hectares du parc comptent plusieurs sections sans laisse et vous y croiserez des centaines de locaux faisant le même rituel matinal. Café au 't Blauwe Theehuis ensuite, chiens bienvenus en terrasse." },
      berlin: { days: 'Jours 9–10', intro: "Train ICE direct depuis Amsterdam Centraal (~6h, billet chien ~8 € sur la Deutsche Bahn). Berlin est largement considérée comme la capitale la plus dog-friendly d'Europe : environ 100 000 chiens enregistrés, chiens dans tous les U-Bahn et S-Bahn, chiens dans les boutiques, chiens dans les bureaux. Le Tiergarten (210 ha en plein centre) et le Volkspark Friedrichshain ont d'énormes sections sans laisse. Les quartiers de Prenzlauer Berg et Kreuzberg regorgent de cafés dog-friendly.", highlight: 'Incontournable avec son chien : Tiergarten + balade le long de la Spree', highlightDesc: "Partez de la Porte de Brandebourg, traversez le Tiergarten jusqu'au Schloss Bellevue, puis suivez la Spree jusqu'à l'Île aux Musées. Environ 6 km, principalement sans laisse à l'intérieur du parc. Les locaux s'arrêtent pour une currywurst chez Curry 36, chiens bienvenus aux tables debout." },
    },
    hotelsLabel: 'Hôtels recommandés acceptant les animaux',
    bookLabel: 'Réserver sur Booking.com',
    detailsLabel: 'Détails',
    mapLabel: 'Carte en direct, tous les hôtels pet-friendly',
    legsTitle: 'Transport entre les villes',
    legs: [
      { from: 'Paris', to: 'Bruxelles', duration: '~1h25', service: 'Thalys / Eurostar (direct)', petRule: 'Petits chiens en cage 7 €, grands chiens 30 € (un billet par chien).' },
      { from: 'Bruxelles', to: 'Amsterdam', duration: '~1h50', service: 'Eurostar / Thalys (direct)', petRule: 'Mêmes tarifs que Paris–Bruxelles. Le chien voyage à côté de vous, pas en soute.' },
      { from: 'Amsterdam', to: 'Berlin', duration: '~6h20', service: 'Deutsche Bahn IC Berlin (direct, 4 par jour)', petRule: 'Petits chiens gratuits en cage. Grands chiens : Hundeticket (demi-tarif adulte, ~20–40 €), muselière et laisse obligatoires.' },
    ],
    practicalTitle: 'Avant de partir : paperasse, vaccins, contacts vétérinaires',
    practicalBullets: [
      "Passeport européen pour animal avec vaccination antirabique valide, exigé à chaque enregistrement d'hôtel. Vaccin d'au moins 21 jours, moins de 12 mois pour le rappel annuel standard.",
      'Puce électronique ISO 11784/11785, obligatoire dans les quatre pays. Doit correspondre au numéro du passeport.',
      "Aucun traitement contre l'échinococcose requis pour cet itinéraire (uniquement pour le Royaume-Uni, l'Irlande, la Finlande, la Norvège, Malte).",
      "Enregistrez les quatre vétérinaires d'urgence 24h/24 dans votre téléphone avant de partir : Paris (CHV des Cordeliers, +33 1 47 47 47 47), Bruxelles (Vétérinaires d'Uccle, +32 2 374 80 99), Amsterdam (Medisch Centrum voor Dieren, +31 20 379 98 00), Berlin (Tierärztliche Klinik Falkenried, +49 30 8541 7099).",
      'Gardez une muselière souple dans votre sac en permanence, exigée sur les ICE/IC de la Deutsche Bahn et dans les métros bruxellois et berlinois pour les grands chiens.',
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Puis-je vraiment faire tout ce voyage sans avion ?', a: "Oui. Les trois tronçons sont des trains directs, tous acceptant les chiens. Le temps total de train est d'environ 9h45 réparti sur 10 jours, gérable pour la plupart des chiens, surtout avec des escales longues entre les étapes." },
      { q: 'Combien coûte ce voyage pour un couple avec un chien moyen ?', a: "Comptez 1 200 à 2 500 € selon la catégorie d'hôtel. Les billets de train totalisent ~450–700 € pour 2 adultes + 1 chien si réservés 4 à 6 semaines à l'avance. Le supplément animal varie de 0 à 50 € par étape selon l'hôtel." },
      { q: 'Quelle est la meilleure période ?', a: 'Mai-juin et septembre sont idéaux : températures douces (15–22 °C), parcs peu fréquentés et hôtels disponibles. Juillet-août peut atteindre 32 °C à Paris et Amsterdam, désagréable pour les chiens à poil sombre.' },
      { q: 'Puis-je raccourcir en long week-end ?', a: "Oui, Paris + Bruxelles (4 jours) est la version deux-villes la plus simple. L'Eurostar entre les deux ne fait que 1h25 et les règles animaux sont identiques." },
      { q: 'Et si mon chien fait plus de 25 kg ?', a: "Les quatre villes accueillent les grands chiens. Le seul point de friction est le métro où laisse + muselière occasionnelle sont requises. Hôtels : la plupart des établissements de luxe acceptent jusqu'à 25 kg, appelez à l'avance si votre chien dépasse." },
    ],
  },
  es: {
    hero: { tagline: 'CITY-TRIP · 10 DÍAS · CON TU PERRO', title: 'Un city trip europeo en tren con tu perro', subtitle: 'Cuatro capitales icónicas, París, Bruselas, Ámsterdam, Berlín, conectadas por trenes directos que admiten perros. Hoteles que reciben mascotas, parques y el mapa Booking.com en vivo para cada ciudad.' },
    why: { title: 'Por qué este itinerario funciona con perro', bullets: [
      'Cada tramo es un tren directo y dog-friendly. Sin aviones ni bodegas, solo un paseo con correa de la estación al hotel.',
      'Las cuatro ciudades cuentan con grandes parques sin correa a menos de 20 minutos a pie de las estaciones centrales.',
      'Sin papeleo en las fronteras dentro del espacio Schengen, solo necesitas un pasaporte europeo de mascota con vacunación antirrábica vigente.',
      'Cada ciudad tiene al menos una clínica veterinaria de urgencias 24/7, datos en la sección práctica al final.',
      'El itinerario evita el calor del sur, cómodo para perros de pelo corto y braquicéfalos incluso en verano.',
    ] },
    stats: { duration: 'Duración', cities: 'Ciudades', transport: 'Transporte', budget: 'Presupuesto', durationVal: '10 días', citiesVal: '4 capitales', transportVal: 'Tren (Eurostar / Thalys / ICE)', budgetVal: '1.200 €–2.500 €' },
    citiesIntro: { kicker: 'CIUDAD POR CIUDAD', title: 'Tus paradas, tus hoteles, tu mapa' },
    cities: {
      paris: { days: 'Días 1–3', intro: 'Empieza en la ciudad donde más de 500.000 perros comparten la vida con sus dueños. París es sorprendentemente relajado con los compañeros de cuatro patas: el Marais, Saint-Germain y el Canal Saint-Martin admiten perros con correa en cafés y terrazas. El Bois de Boulogne (850 ha) y el Bois de Vincennes (995 ha), accesibles en metro, dan a tu perro espacio tras largas mañanas de museo. El metro admite perros pequeños gratis en transportín; los más grandes necesitan billete reducido y correa.', highlight: 'Imprescindible con tu perro: paseo al atardecer por el Canal Saint-Martin', highlightDesc: 'Los 4,5 km del canal entre République y La Villette son totalmente peatonales, bordeados de terrazas dog-friendly, y desembocan en el Parc de la Villette (55 ha) donde los perros corren sin correa por las praderas centrales.' },
      brussels: { days: 'Días 4–5', intro: "Dos horas en Thalys desde París-Nord. Bruselas es una de las capitales más tranquilas para perros en Europa Occidental: menos masificada que París o Ámsterdam, con una fuerte cultura de café y la gigantesca Forêt de Soignes (4.400 hectáreas de hayedo) en su borde sur. Bus, tranvía y metro admiten perros gratis. La mayoría de restaurantes y tiendas belgas reciben perros sin objeción, un bol de agua en la puerta es habitual.", highlight: 'Imprescindible con tu perro: el circuito Bois de la Cambre + Forêt de Soignes', highlightDesc: "Toma el tranvía 7 hasta Vivier d'Oie. El Bois de la Cambre (122 ha) desemboca directamente en la Forêt de Soignes, 4.500 hectáreas continuas de hayedo, con zonas sin correa alrededor de los Étangs de Boitsfort." },
      amsterdam: { days: 'Días 6–8', intro: 'Eurostar directo desde Bruselas-Midi (1h45). Ámsterdam está hecha para perros: Vondelpark (47 ha), Westerpark y Amstelpark tienen zonas sin correa; los tranvías admiten perros con billete pequeño; los canales son terreno de paseo durante horas; y todo el barrio del Jordaan es un paraíso para los paseadores de perros con poco tráfico. Atención a las bicis, siempre tienen prioridad y van rápido.', highlight: 'Imprescindible con tu perro: el circuito matinal del Vondelpark', highlightDesc: "Entra por la puerta de Stadhouderskade a las 8:00. Las 47 hectáreas del parque tienen varias secciones sin correa y te cruzarás con cientos de locales en el mismo ritual matutino. Café en 't Blauwe Theehuis después, perros bienvenidos en terraza." },
      berlin: { days: 'Días 9–10', intro: 'Tren ICE directo desde Ámsterdam Centraal (~6h, billete canino ~8 € en Deutsche Bahn). Berlín es ampliamente considerada la capital más dog-friendly de Europa: unos 100.000 perros registrados, perros en cada U-Bahn y S-Bahn, perros en tiendas, perros en oficinas. El Tiergarten (210 ha en pleno centro) y el Volkspark Friedrichshain tienen enormes secciones sin correa. Los barrios de Prenzlauer Berg y Kreuzberg están llenos de cafés dog-friendly.', highlight: 'Imprescindible con tu perro: paseo por Tiergarten + Spree', highlightDesc: 'Empieza en la Puerta de Brandeburgo, cruza el Tiergarten hasta Schloss Bellevue, luego sigue el Spree hasta la Isla de los Museos. Unos 6 km, mayoritariamente sin correa dentro del parque. Los locales paran a por currywurst en Curry 36, perros bienvenidos en las mesas altas.' },
    },
    hotelsLabel: 'Hoteles recomendados que admiten mascotas',
    bookLabel: 'Reservar en Booking.com',
    detailsLabel: 'Detalles',
    mapLabel: 'Mapa en vivo, todos los hoteles pet-friendly',
    legsTitle: 'Transporte entre ciudades',
    legs: [
      { from: 'París', to: 'Bruselas', duration: '~1h25', service: 'Thalys / Eurostar (directo)', petRule: 'Perros pequeños en transportín 7 €, grandes 30 € (un billete por perro).' },
      { from: 'Bruselas', to: 'Ámsterdam', duration: '~1h50', service: 'Eurostar / Thalys (directo)', petRule: 'Mismas tarifas que París–Bruselas. El perro viaja a tu lado, no en bodega.' },
      { from: 'Ámsterdam', to: 'Berlín', duration: '~6h20', service: 'Deutsche Bahn IC Berlin (directo, 4 al día)', petRule: 'Perros pequeños gratis en transportín. Grandes: Hundeticket (media tarifa adulta, ~20–40 €), bozal y correa obligatorios.' },
    ],
    practicalTitle: 'Antes de salir: papeleo, vacunas, contactos veterinarios',
    practicalBullets: [
      'Pasaporte europeo de mascota con vacunación antirrábica vigente, exigido en cada check-in. La vacuna debe tener al menos 21 días y menos de 12 meses para la dosis anual estándar.',
      'Microchip ISO 11784/11785, obligatorio en los cuatro países. Debe coincidir con el número del pasaporte.',
      'No se requiere tratamiento contra la equinococosis para este itinerario (solo Reino Unido, Irlanda, Finlandia, Noruega, Malta).',
      "Guarda los cuatro veterinarios de urgencias 24/7 en tu móvil antes de salir: París (CHV des Cordeliers, +33 1 47 47 47 47), Bruselas (Vétérinaires d'Uccle, +32 2 374 80 99), Ámsterdam (Medisch Centrum voor Dieren, +31 20 379 98 00), Berlín (Tierärztliche Klinik Falkenried, +49 30 8541 7099).",
      'Lleva un bozal flexible en el bolso siempre, exigido en ICE/IC de Deutsche Bahn y en los metros de Bruselas y Berlín para perros grandes.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Puedo realmente hacer todo el viaje sin volar?', a: 'Sí. Los tres tramos son trenes directos y dog-friendly. El tiempo total de tren es de unas 9h45 repartidas en 10 días, manejable para la mayoría de perros, sobre todo con paradas largas entre etapas.' },
      { q: '¿Cuánto cuesta el viaje para una pareja con un perro mediano?', a: 'Presupuesta 1.200–2.500 € según categoría de hotel. Los billetes de tren suman ~450–700 € para 2 adultos + 1 perro si se reservan con 4–6 semanas. El cargo por mascota va de 0 a 50 € por parada según el hotel.' },
      { q: '¿Cuál es la mejor época?', a: 'Mayo-junio y septiembre son ideales: temperaturas suaves (15–22 °C), parques poco concurridos y hoteles disponibles. Julio-agosto puede alcanzar 32 °C en París y Ámsterdam, incómodo para perros de pelo oscuro.' },
      { q: '¿Puedo acortarlo a un fin de semana largo?', a: 'Sí, París + Bruselas (4 días) es la versión de dos ciudades más sencilla. El Eurostar entre ambas dura solo 1h25 y las normas de mascotas son idénticas.' },
      { q: '¿Y si mi perro pesa más de 25 kg?', a: 'Las cuatro ciudades son aptas para perros grandes. El único punto crítico es el metro, donde correa + bozal ocasional son obligatorios. Hoteles: la mayoría de los de lujo aceptan hasta 25 kg, llama antes si tu perro pesa más.' },
    ],
  },
  pt: {
    hero: { tagline: 'CITY-TRIP · 10 Dias · Com O teu cão', title: 'Um city trip europeu de comboio com o teu cão', subtitle: 'Cuatro capitales icónicas, París, Bruxelas, Amesterdão, Berlim, conectadas por comboios directos que admitem cães. Hotéis que reciben animais, parques e o mapa Booking.com em vivo para cada cidade.' },
    why: { title: 'Porquê este itinerário funciona com cão', bullets: [
      'Cada tramo é um comboio directo e pet-friendly. Sem aviones ni bodegas, só um passeio com trela da estação al hotel.',
      'As cuatro cidades têm com grandes parques sem trela a menos de 20 minutos a pé das estações centrales.',
      'Sem burocracia nas fronteras dentro do espaço Schengen, só necesitas um passaporte europeu de animal com vacinação antirrábica vigente.',
      'Cada cidade tem al menos uma clínica veterinária de urgências 24/7, datos na sección práctica al final.',
      'O itinerário evita o calor do sul, cómodo para cães de pelo curto e braquicéfalos mesmo em verão.',
    ] },
    stats: { duration: 'Duración', cities: 'Cidades', transport: 'Transporte', budget: 'Presupuesto', durationVal: '10 dias', citiesVal: '4 capitales', transportVal: 'Comboio (Eurostar / Thalys / ICE)', budgetVal: '1.200 €–2.500 €' },
    citiesIntro: { kicker: 'Cidade POR Cidade', title: 'Os teus paradas, os teus hotéis, tu mapa' },
    cities: {
      paris: { days: 'Dias 1–3', intro: 'Empieza na cidade onde mais de 500.000 cães comparten a vida com os seus donos. París é sorprendentemente descontraído com os companheros de cuatro patas: o Marais, Saint-Germain e o Canal Saint-Martin admitem cães com trela em cafés e esplanadas. O Bois de Boulogne (850 ha) e o Bois de Vincennes (995 ha), acessíveis no metro, dan ao teu cão espaço tras longas manhãs de museu. O metro admite cães pequenos grátis em transportadora; os mais grandes necesitan bilhete reducido e trela.', highlight: 'Imprescindible com o teu cão: passeio al atardecer pelo Canal Saint-Martin', highlightDesc: 'Os 4,5 km do canal entre République e A Villette são totalmente peatonales, bordeados de esplanadas pet-friendly, e desembocan no Parc da Villette (55 ha) onde os cães corren sem trela pelas pradarias centrales.' },
      brussels: { days: 'Dias 4–5', intro: "Duas horas em Thalys desde París-Nord. Bruxelas é uma das as capitales mais tranquilas para cães em Europa Occidental: menos masificada que París o Amesterdão, com uma forte cultura de café e a gigantesca Forêt de Soignes (4.400 hectáreas de hayedo) no seu borde sur. Bus, elétrico e metro admitem cães grátis. A maioria de restaurantes e lojas belgas reciben cães sem objeción, um bol de água na puerta é habitual.", highlight: 'Imprescindible com o teu cão: o circuito Bois da Cambre + Forêt de Soignes', highlightDesc: "Toma o elétrico 7 até Vivier d'Oie. O Bois da Cambre (122 ha) desemboca directamente na Forêt de Soignes, 4.500 hectáreas continuas de hayedo, com zonas sem trela alrededor dois Étangs de Boitsfort." },
      amsterdam: { days: 'Dias 6–8', intro: 'Eurostar directo desde Bruxelas-Midi (1h45). Amesterdão está hecha para cães: Vondelpark (47 ha), Westerpark e Amstelpark têm zonas sem trela; os elétricos admitem cães com bilhete pequeno; os canais são terreno de passeio durante horas; e todo o bairro do Jordaan é um paraíso para os paseadores de cães com pouco tráfico. Atención a as bicis, sempre têm prioridad e van rápido.', highlight: 'Imprescindible com o teu cão: o circuito matinal do Vondelpark', highlightDesc: "Entra pela puerta de Stadhouderskade a as 8:00. As 47 hectáreas do parque têm varias secciones sem trela e te cruzarás com cientos de locales no mismo ritual matutino. Café en 't Blauwe Theehuis depois, cães bem-vindos em esplanada." },
      berlin: { days: 'Dias 9–10', intro: 'Comboio ICE directo desde Amesterdão Centraal (~6h, bilhete canino ~8 € em Deutsche Bahn). Berlim é ampliamente considerada a capital mais pet-friendly de Europa: uns 100.000 cães registrados, cães em cada U-Bahn e S-Bahn, cães em lojas, cães em oficinas. O Tiergarten (210 tem em pleno centro) e o Volkspark Friedrichshain têm enormes secciones sem trela. Os bairros de Prenzlauer Berg e Kreuzberg estão llenos de cafés pet-friendly.', highlight: 'Imprescindible com o teu cão: passeio por Tiergarten + Spree', highlightDesc: 'Empieza na Puerta de Brandeburgo, cruza o Tiergarten até Schloss Bellevue, luego continua o Spree até a Ilha dois Museus. Uns 6 km, mayoritariamente sem trela dentro do parque. Os locales paran a por currywurst em Curry 36, cães bem-vindos nas mesas altas.' },
    },
    hotelsLabel: 'Hotéis recomendados que admitem animais',
    bookLabel: 'Reservar em Booking.com',
    detailsLabel: 'Detalhes',
    mapLabel: 'Mapa em vivo, todos os hotéis pet-friendly',
    legsTitle: 'Transporte entre cidades',
    legs: [
      { from: 'París', to: 'Bruxelas', duration: '~1h25', service: 'Thalys / Eurostar (directo)', petRule: 'Cães pequenos em transportadora 7 €, grandes 30 € (um bilhete por cão).' },
      { from: 'Bruxelas', to: 'Amesterdão', duration: '~1h50', service: 'Eurostar / Thalys (directo)', petRule: 'Mismas tarifas que París–Bruxelas. O cão viaja a tu lado, no em bodega.' },
      { from: 'Amesterdão', to: 'Berlim', duration: '~6h20', service: 'Deutsche Bahn IC Berlin (directo, 4 al dia)', petRule: 'Cães pequenos grátis em transportadora. Grandes: Hundeticket (meio preço adulta, ~20–40 €), bozal e trela obrigatórios.' },
    ],
    practicalTitle: 'Antes de salir: burocracia, vacunas, contactos veterinários',
    practicalBullets: [
      'Passaporte europeu de animal com vacinação antirrábica vigente, exigido em cada check-in. A vacuna debe tener al menos 21 dias e menos de 12 meses para a dosis anual estándar.',
      'Microchip ISO 11784/11785, obrigatório nos cuatro países. Debe coincidir com o número do passaporte.',
      'No se exige tratamento contra a equinococose para este itinerário (só Reino Unido, Irlanda, Finlândia, Norueguesa, Malta).',
      "Guarda os cuatro veterinários de urgências 24/7 em tu móvil antes de salir: París (CHV des Cordeliers, +33 1 47 47 47 47), Bruxelas (Vétérinaires d'Uccle, +32 2 374 80 99), Amesterdão (Medisch Centrum voor Dieren, +31 20 379 98 00), Berlim (Tierärztliche Klinik Falkenried, +49 30 8541 7099).",
      'Leva um bozal flexible no bolso sempre, exigido em ICE/IC de Deutsche Bahn e nos metros de Bruxelas e Berlim para cães grandes.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: 'Puedo realmente hacer todo o viaje sem volar?', a: 'Sí. Os tres tramos são comboios directos e pet-friendly. O tiempo total de comboio é de umas 9h45 repartidas em 10 dias, manejable para a maioria de cães, sobretudo com paradas longas entre etapas.' },
      { q: 'Cuánto custa o viaje para uma pareja com um cão mediano?', a: 'Presupuesta 1.200–2.500 € segundo categoría de hotel. Os bilhetes de comboio suman ~450–700 € para 2 adultos + 1 cão si se reservan com 4–6 semanas. O cargo por animal va de 0 a 50 € por parada segundo o hotel.' },
      { q: 'Qual é a MELHOR época?', a: 'Maio-junho e setembro são ideales: temperaturas suaves (15–22 °C), parques pouco concurridos e hotéis disponibles. Julho-agosto pode alcanzar 32 °C em París e Amesterdão, incómodo para cães de pelo escuro.' },
      { q: 'Puedo acortarlo a um fin de semana longo?', a: 'Sí, París + Bruxelas (4 dias) é a versión de duas cidades mais sencilla. O Eurostar entre ambas dura só 1h25 e as normas de animais são idénticas.' },
      { q: 'E si mi cão pesa mais de 25 kg?', a: 'As cuatro cidades são aptas para cães grandes. O único punto crítico é o metro, onde trela + bozal ocasional são obrigatórios. Hotéis: a maioria dois de lujo aceitam até 25 kg, chama antes si o teu cão pesa mais.' },
    ],
  },
  de: {
    hero: {
      tagline: 'STÄDTEREISE-PLAN · 10 TAGE · MIT IHREM HUND',
      title: 'Eine zugfreundliche europäische Städtereise mit Ihrem Hund',
      subtitle: 'Vier ikonische Hauptstädte, Paris, Brüssel, Amsterdam, Berlin, verbunden durch direkte hundefreundliche Züge. Tierfreundliche Hotels, Parks und die Live-Karte von Booking.com für jede Stadt.',
    },
    why: {
      title: 'Warum diese Route für Hundebesitzer funktioniert',
      bullets: [
        'Jede Etappe ist ein direkter, hundefreundlicher Zug. Keine Flüge, kein Frachtraum, nur Spaziergänge an der Leine vom Bahnhof zum Hotel.',
        'Alle vier Städte haben große eingezäunte Freilaufflächen in Parks, die in 20 Gehminuten von den zentralen Bahnhöfen erreichbar sind.',
        'Keine Grenzformalitäten innerhalb des Schengen-Raums, Sie benötigen nur einen gültigen EU-Heimtierausweis mit aktueller Tollwutimpfung.',
        'Jede Stadt hat mindestens eine 24-Stunden-Tierklinik, die Kontaktdaten finden Sie weiter unten in den praktischen Informationen.',
        'Die Route vermeidet das Hitzestress-Risiko Südeuropas und ist auch im Sommer angenehm für kurzhaarige und brachycephale Rassen.',
      ],
    },
    stats: { duration: 'Dauer', cities: 'Städte', transport: 'Transport', budget: 'Budget', durationVal: '10 Tage', citiesVal: '4 Hauptstädte', transportVal: 'Zug (Eurostar / Thalys / ICE)', budgetVal: '1.200 €–2.500 €' },
    citiesIntro: { kicker: 'STADT FÜR STADT', title: 'Ihre Stopps, Ihre Hotels, Ihre Karte' },
    cities: {
      paris: { days: 'Tag 1–3', intro: 'Beginnen Sie in der Stadt, in der über 500.000 Hunde das Leben mit ihren Besitzern teilen. Paris ist ungewöhnlich entspannt gegenüber vierbeinigen Gästen: das Marais, Saint-Germain und der Canal Saint-Martin heißen angeleinte Hunde in Cafés und auf Terrassen willkommen. Der 850 Hektar große Bois de Boulogne und der 995 Hektar große Bois de Vincennes, beide mit der Metro erreichbar, geben Ihrem Hund nach langen Vormittagen im Museum Platz zum Laufen. Die Metro nimmt kleine Hunde in einer Tragetasche kostenlos mit; größere Hunde benötigen ein ermäßigtes Ticket und eine Leine.', highlight: 'Unbedingt mit Ihrem Hund: ein Spaziergang bei Sonnenuntergang entlang des Canal Saint-Martin', highlightDesc: 'Der 4,5 km lange Kanal zwischen République und La Villette ist vollständig autofrei, gesäumt von hundefreundlichen Café-Terrassen, und endet am 55 Hektar großen Parc de la Villette, wo Hunde auf den zentralen Rasenflächen ohne Leine laufen können.' },
      brussels: { days: 'Tag 4–5', intro: `Zwei Stunden mit dem Thalys ab Paris-Nord. Brüssel ist eine der ruhigsten tierfreundlichen Hauptstädte Westeuropas: weniger überlaufen als Paris oder Amsterdam, mit einer ausgeprägten Cafékultur und dem riesigen Forêt de Soignes (4.400 Hektar Buchenwald) am südlichen Stadtrand. Bus, Straßenbahn und Metro nehmen Hunde kostenlos mit. Die meisten belgischen Restaurants und Geschäfte heißen Hunde ohne Weiteres willkommen, ein Wassernapf an der Tür ist ein gewohnter Anblick.`, highlight: 'Unbedingt mit Ihrem Hund: die Runde Bois de la Cambre + Forêt de Soignes', highlightDesc: `Nehmen Sie die Straßenbahn 7 bis Vivier d'Oie. Der Bois de la Cambre (122 ha) geht direkt in den Forêt de Soignes über, zusammenhängend 4.500 Hektar Buchenwald, mit Freilaufzonen rund um die Étangs de Boitsfort.` },
      amsterdam: { days: 'Tag 6–8', intro: `Direkter Eurostar ab Brüssel-Midi (1h45). Amsterdam ist wie gemacht für Hunde: der Vondelpark (47 ha), der Westerpark und der Amstelpark haben alle Freilaufzonen; Straßenbahnen nehmen Hunde gegen ein kleines Ticket mit; die Grachten bieten stundenlanges Spazierterrain; und das gesamte Jordaan-Viertel ist mit wenig Verkehr ein Paradies für Hundespaziergänger. Achten Sie auf die Fahrräder, sie haben immer Vorfahrt und sind schnell.`, highlight: 'Unbedingt mit Ihrem Hund: die Morgenrunde im Vondelpark', highlightDesc: `Betreten Sie den Park um 8:00 Uhr am Eingang Stadhouderskade. Der 47 Hektar große Park hat mehrere Freilaufbereiche, und Sie treffen Hunderte Einheimische bei demselben Morgenritual. Danach Kaffee im 't Blauwe Theehuis, Hunde auf der Terrasse willkommen.` },
      berlin: { days: 'Tag 9–10', intro: 'Direkter ICE ab Amsterdam Centraal (~6 Std., Hundeticket ~8 € bei der Deutschen Bahn). Berlin gilt weithin als die hundefreundlichste Hauptstadt Europas: schätzungsweise 100.000 angemeldete Hunde, Hunde in jeder U-Bahn- und S-Bahn-Linie, Hunde in Geschäften, Hunde in Büros. Der Tiergarten (210 ha mitten im Zentrum) und der Volkspark Friedrichshain haben riesige Freilaufflächen. Die Viertel Prenzlauer Berg und Kreuzberg sind voller hundefreundlicher Cafés.', highlight: 'Unbedingt mit Ihrem Hund: ein Spaziergang durch den Tiergarten und am Spreeufer', highlightDesc: 'Starten Sie am Brandenburger Tor, durchqueren Sie den Tiergarten bis zum Schloss Bellevue und folgen Sie dann der Spree bis zur Museumsinsel. Etwa 6 km, größtenteils Freilaufgebiet innerhalb des Parks. Einheimische machen Halt für eine Currywurst bei Curry 36, Hunde an den Stehtischen willkommen.' },
    },
    hotelsLabel: 'Empfohlene hundefreundliche Hotels',
    bookLabel: 'Auf Booking.com buchen',
    detailsLabel: 'Details',
    mapLabel: 'Live-Karte, alle hundefreundlichen Hotels',
    legsTitle: 'Transport zwischen den Städten',
    legs: [
      { from: 'Paris', to: 'Brüssel', duration: '~1h25', service: 'Thalys / Eurostar (direkt)', petRule: 'Kleine Hunde in der Tragetasche 7 €, größere Hunde 30 € (ein Ticket pro Hund).' },
      { from: 'Brüssel', to: 'Amsterdam', duration: '~1h50', service: 'Eurostar / Thalys (direkt)', petRule: 'Gleiche Preise wie Paris–Brüssel. Der Hund reist neben Ihnen, nicht im Frachtraum.' },
      { from: 'Amsterdam', to: 'Berlin', duration: '~6h20', service: 'Deutsche Bahn IC Berlin (direkt, 4-mal täglich)', petRule: 'Kleine Hunde kostenlos in der Tragetasche. Größere Hunde benötigen ein Hundeticket (halber Erwachsenenpreis, ~20–40 €) und müssen Maulkorb und Leine tragen.' },
    ],
    practicalTitle: 'Vor der Abreise: Papiere, Impfungen, Tierarztkontakte',
    practicalBullets: [
      'EU-Heimtierausweis mit gültiger Tollwutimpfung, bei jedem Hotel-Check-in erforderlich. Die Impfung muss mindestens 21 Tage zurückliegen und darf bei der Standard-Jahresimpfung nicht älter als 12 Monate sein.',
      'Mikrochip ISO 11784/11785, in allen vier Ländern Pflicht. Muss mit der Nummer im Ausweis übereinstimmen.',
      'Für diese Route ist keine Bandwurmbehandlung erforderlich (relevant nur für Großbritannien / Irland / Finnland / Norwegen / Malta).',
      `Speichern Sie die vier 24-Stunden-Tierkliniken vor der Abreise in Ihrem Telefon: Paris (CHV des Cordeliers, +33 1 47 47 47 47), Brüssel (Vétérinaires d'Uccle, +32 2 374 80 99), Amsterdam (Medisch Centrum voor Dieren, +31 20 379 98 00), Berlin (Tierärztliche Klinik Falkenried, +49 30 8541 7099).`,
      'Führen Sie stets einen weichen Maulkorb in Ihrer Tasche mit, er ist in den ICE/IC-Zügen der Deutschen Bahn sowie in den U-Bahnen von Brüssel und Berlin für größere Hunde vorgeschrieben.',
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      { q: 'Kann ich diese ganze Reise wirklich ohne Flüge machen?', a: 'Ja. Alle drei Etappen sind direkte, hundefreundliche Züge. Die gesamte Zugzeit beträgt etwa 9h45, verteilt auf 10 Tage, für die meisten Hunde gut machbar, besonders mit längeren Stadtaufenthalten dazwischen.' },
      { q: 'Wie viel kostet die Reise für ein Paar mit einem mittelgroßen Hund?', a: `Rechnen Sie mit 1.200 €–2.500 € je nach Hotelkategorie. Die Zugtickets kosten insgesamt ~450–700 € für 2 Erwachsene + 1 Hund, wenn 4–6 Wochen im Voraus gebucht wird. Die Tiergebühr liegt je nach Hotel zwischen 0 € und 50 € pro Station.` },
      { q: 'Wann ist die beste Jahreszeit für diese Route?', a: 'Mai bis Juni und September sind ideal: milde Temperaturen (15–22 °C), wenig überlaufene Parks und volle Hotelverfügbarkeit. Juli und August können in Paris und Amsterdam bis zu 32 °C erreichen, unangenehm für dunkel gefärbte Hunde.' },
      { q: 'Kann ich das auf ein langes Wochenende verkürzen?', a: 'Ja, Paris + Brüssel (4 Tage) ist die einfachste Zwei-Städte-Variante. Der Eurostar zwischen beiden dauert nur 1h25, und die Tierregeln sind identisch.' },
      { q: 'Was, wenn mein Hund über 25 kg wiegt?', a: 'Alle vier Städte sind auch für große Hunde geeignet. Der einzige Reibungspunkt sind die U-Bahnen, wo Leine und gelegentlich Maulkorb vorgeschrieben sind. Hotels: Die meisten Luxushotels akzeptieren Hunde bis 25 kg, rufen Sie aber vorher an, um dies zu bestätigen, wenn Ihr Hund schwerer ist.' },
    ],
  },
  nl: {
    hero: {
      tagline: 'CITY-TRIP · 10 DAGEN · MET JE HOND',
      title: 'Een treinvriendelijke Europese city trip met je hond',
      subtitle: 'Vier iconische hoofdsteden, Parijs, Brussel, Amsterdam, Berlijn, verbonden door directe hondvriendelijke treinen. Hondvriendelijke hotels, parken en de live Booking.com-kaart voor elke stad.',
    },
    why: {
      title: 'Waarom deze route werkt voor hondenbezitters',
      bullets: [
        'Elke etappe is een directe, hondvriendelijke trein. Geen vluchten, geen vrachtruim, gewoon aangelijnd wandelen van station naar hotel.',
        'Alle vier steden hebben grote omheinde losloopgebieden binnen 20 minuten lopen van de centrale stations.',
        'Geen grensformaliteiten binnen het Schengengebied, je hebt alleen een geldig EU-dierenpaspoort met actuele rabiësvaccinatie nodig.',
        'Elke stad heeft minstens een 24/7 spoedkliniek voor dieren, de contactgegevens staan verderop bij de praktische info.',
        'De route vermijdt het hitterisico van Zuid-Europa, comfortabel voor kortharige en brachycefale rassen, zelfs in de zomer.',
      ],
    },
    stats: { duration: 'Duur', cities: 'Steden', transport: 'Vervoer', budget: 'Budget', durationVal: '10 dagen', citiesVal: '4 hoofdsteden', transportVal: 'Trein (Eurostar / Thalys / ICE)', budgetVal: '€1.200–€2.500' },
    citiesIntro: { kicker: 'STAD VOOR STAD', title: 'Jouw stops, jouw hotels, jouw kaart' },
    cities: {
      paris: { days: 'Dag 1–3', intro: 'Begin in de stad waar meer dan 500.000 honden het leven delen met hun baasjes. Parijs is verrassend relaxed over viervoetige gasten: de Marais, Saint-Germain en het Canal Saint-Martin verwelkomen aangelijnde honden in cafés en op terrassen. Het 850 hectare grote Bois de Boulogne en het 995 hectare grote Bois de Vincennes, beide bereikbaar met de metro, geven je hond de ruimte om te rennen na lange museumochtenden. De metro laat kleine honden gratis toe in een draagtas; grotere honden hebben een gereduceerd ticket en een lijn nodig.', highlight: 'Een must met je hond: een zonsondergangwandeling langs het Canal Saint-Martin', highlightDesc: 'Het 4,5 km lange kanaal tussen République en La Villette is volledig autovrij, gezoomd door hondvriendelijke caféterrassen, en eindigt bij het 55 hectare grote Parc de la Villette waar honden loslopen op de centrale grasvelden.' },
      brussels: { days: 'Dag 4–5', intro: `Twee uur met de Thalys vanaf Paris-Nord. Brussel is een van de rustigste hondvriendelijke hoofdsteden van West-Europa: minder druk dan Parijs of Amsterdam, met een sterke cafécultuur en het gigantische Zoniënwoud (4.400 hectare beukenbos) aan de zuidrand van de stad. Bus, tram en metro nemen honden gratis mee. De meeste Belgische restaurants en winkels verwelkomen honden zonder vragen, een waterbakje bij de deur is een vertrouwd beeld.`, highlight: 'Een must met je hond: de lus Bois de la Cambre + Zoniënwoud', highlightDesc: `Neem tram 7 naar Vivier d'Oie. Het Bois de la Cambre (122 ha) gaat direct over in het Zoniënwoud, een aaneengesloten 4.500 hectare beukenbos, met losloopzones rond de Vijvers van Bosvoorde.` },
      amsterdam: { days: 'Dag 6–8', intro: `Directe Eurostar vanaf Brussel-Zuid (1u45). Amsterdam is gebouwd voor honden: het Vondelpark (47 ha), het Westerpark en het Amstelpark hebben allemaal losloopgebieden; trams nemen honden mee tegen een klein tarief; de grachten zijn urenlang wandelterrein; en de hele Jordaan is een rustig walhalla voor hondenuitlaters. Let op de fietsen, die hebben altijd voorrang en zijn snel.`, highlight: 'Een must met je hond: de ochtendronde in het Vondelpark', highlightDesc: `Ga naar binnen bij de Stadhouderskade-ingang om 8:00 uur. Het 47 hectare grote park heeft meerdere losloopgebieden en je ontmoet er honderden locals die hetzelfde ochtendritueel volgen. Koffie bij 't Blauwe Theehuis achteraf, honden welkom op het terras.` },
      berlin: { days: 'Dag 9–10', intro: 'Directe ICE-trein vanaf Amsterdam Centraal (~6 uur, hondenticket ~€8 bij Deutsche Bahn). Berlijn geldt algemeen als de hondvriendelijkste hoofdstad van Europa: naar schatting 100.000 geregistreerde honden, honden in elke U-Bahn- en S-Bahn-lijn, honden in winkels, honden op kantoor. De Tiergarten (210 ha vlak in het centrum) en het Volkspark Friedrichshain hebben enorme losloopgebieden. De wijken Prenzlauer Berg en Kreuzberg staan vol hondvriendelijke cafés.', highlight: 'Een must met je hond: een wandeling door de Tiergarten en langs de Spree', highlightDesc: 'Start bij de Brandenburger Tor, steek de Tiergarten over naar Schloss Bellevue en volg dan de Spree tot aan het Museumeiland. Ongeveer 6 km, grotendeels losloopgebied binnen het park. Locals stoppen voor een currywurst bij Curry 36, honden welkom aan de statafels.' },
    },
    hotelsLabel: 'Aanbevolen hondvriendelijke hotels',
    bookLabel: 'Boek op Booking.com',
    detailsLabel: 'Details',
    mapLabel: 'Live kaart, alle hondvriendelijke hotels',
    legsTitle: 'Vervoer tussen de steden',
    legs: [
      { from: 'Parijs', to: 'Brussel', duration: '~1u25', service: 'Thalys / Eurostar (direct)', petRule: 'Kleine honden in draagtas €7, grotere honden €30 (een ticket per hond).' },
      { from: 'Brussel', to: 'Amsterdam', duration: '~1u50', service: 'Eurostar / Thalys (direct)', petRule: 'Zelfde tarieven als Parijs–Brussel. Je hond reist naast je, niet in het vrachtruim.' },
      { from: 'Amsterdam', to: 'Berlijn', duration: '~6u20', service: 'Deutsche Bahn IC Berlin (direct, 4 keer per dag)', petRule: 'Kleine honden gratis in een draagtas. Grotere honden hebben een Hundeticket nodig (half volwassentarief, ~€20–40) en moeten een muilkorf en lijn dragen.' },
    ],
    practicalTitle: 'Voor je vertrekt: papieren, vaccinaties, dierenartscontacten',
    practicalBullets: [
      'EU-dierenpaspoort met geldige rabiësvaccinatie, verplicht bij elke hotelincheck. De vaccinatie moet minstens 21 dagen oud zijn en minder dan 12 maanden voor de standaard jaarlijkse prik.',
      'Microchip ISO 11784/11785, verplicht in alle vier de landen. Moet overeenkomen met het paspoortnummer.',
      'Geen lintwormbehandeling nodig voor deze route (alleen relevant voor het VK / Ierland / Finland / Noorwegen / Malta).',
      `Sla de vier 24/7 spoedklinieken op in je telefoon voor je vertrekt: Parijs (CHV des Cordeliers, +33 1 47 47 47 47), Brussel (Vétérinaires d'Uccle, +32 2 374 80 99), Amsterdam (Medisch Centrum voor Dieren, +31 20 379 98 00), Berlijn (Tierärztliche Klinik Falkenried, +49 30 8541 7099).`,
      `Neem altijd een zachte muilkorf mee in je tas, verplicht in de ICE/IC-treinen van Deutsche Bahn en in de metro's van Brussel en Berlijn voor grotere honden.`,
    ],
    faqTitle: 'Veelgestelde vragen',
    faqs: [
      { q: 'Kan ik deze hele reis echt zonder vliegen doen?', a: 'Ja. Alle drie de etappes zijn directe, hondvriendelijke treinen. De totale treintijd is ongeveer 9u45, verspreid over 10 dagen, goed te doen voor de meeste honden, zeker met langere stadsstops ertussen.' },
      { q: 'Hoeveel kost de reis voor een koppel met een middelgrote hond?', a: `Reken op €1.200–€2.500 afhankelijk van de hotelcategorie. Treinkaartjes komen in totaal op ~€450–€700 voor 2 volwassenen + 1 hond als je 4 tot 6 weken vooraf boekt. De hondentoeslag ligt tussen €0 en €50 per stop, afhankelijk van het hotel.` },
      { q: 'Wat is de beste tijd van het jaar voor deze route?', a: 'Mei-juni en september zijn ideaal: milde temperaturen (15–22 °C), rustige parken en volledige hotelbeschikbaarheid. Juli-augustus kan oplopen tot 32 °C in Parijs en Amsterdam, ongemakkelijk voor honden met een donkere vacht.' },
      { q: 'Kan ik dit inkorten tot een lang weekend?', a: 'Ja, Parijs + Brussel (4 dagen) is de makkelijkste versie met twee steden. De Eurostar tussen beide duurt maar 1u25 en de huisdierregels zijn identiek.' },
      { q: 'Wat als mijn hond zwaarder is dan 25 kg?', a: 'Alle vier steden zijn geschikt voor grote honden. Het enige knelpunt is de metro, waar een lijn en soms een muilkorf verplicht zijn. Hotels: de meeste luxehotels accepteren honden tot 25 kg, bel vooraf even om te bevestigen als jouw hond zwaarder is.' },
    ],
  },
}

function buildSticky(locale: string): StickyConfig {
  const address = encodeURIComponent('Paris Brussels Amsterdam Berlin')
  const href = `https://www.stay22.com/allez/roam?aid=${STAY22_AID}&campaign=city-trip-sticky&address=${address}`
  const labels: Record<string, string> = {
    en: 'Pet-friendly hotels Paris to Berlin',
    fr: `Hôtels pet-friendly Paris à Berlin`,
    es: 'Hoteles pet-friendly París a Berlín',
    pt: `Hotéis pet-friendly Paris a Berlim`,
    de: 'Hundefreundliche Hotels von Paris bis Berlin',
    nl: 'Hondvriendelijke hotels van Parijs tot Berlijn',
  }
  const ctas: Record<string, string> = { en: 'View', fr: 'Voir', es: 'Ver', pt: 'Ver', de: 'Ansehen', nl: 'Bekijken' }
  return { href, label: labels[locale] ?? labels.en, cta: ctas[locale] ?? ctas.en }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const copy = COPY[locale] ?? COPY.en
  return <CityTripGuide slug={SLUG} routeSlugs={ROUTE_SLUGS} locale={locale} copy={copy} sticky={buildSticky(locale)} />
}
