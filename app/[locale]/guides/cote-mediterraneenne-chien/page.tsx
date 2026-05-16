import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import { CityTripGuide, type RouteCopy } from '../_components/CityTripGuide'

const SLUG = 'cote-mediterraneenne-chien'
const ROUTE_SLUGS = ['nice', 'genoa', 'florence', 'rome'] as const

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}

  const titles: Record<string, string> = {
    en: 'Mediterranean Coast With Your Dog: Nice → Genoa → Florence → Rome (10-Day Itinerary) | HotelsWithPets.com',
    fr: 'Côte méditerranéenne avec son chien : Nice → Gênes → Florence → Rome (itinéraire 10 jours) | HotelsWithPets.com',
    es: 'Costa mediterránea con tu perro: Niza → Génova → Florencia → Roma (itinerario 10 días) | HotelsWithPets.com',
    pt: 'Costa mediterrânea com tu cão: Niza → Génova → Florencia → Roma (itinerario 10 dias) | HotelsWithPets.com',
  }
  const descriptions: Record<string, string> = {
    en: 'A 10-day Mediterranean train itinerary with your dog along the French and Italian coast. Pet-friendly hotels, live Booking.com maps, summer beach rules and emergency vets in each city.',
    fr: 'Itinéraire méditerranéen de 10 jours en train avec votre chien le long des côtes française et italienne. Hôtels acceptant les animaux, cartes Booking.com en direct, règles de plage estivales et vétérinaires d\'urgence.',
    es: 'Itinerario mediterráneo de 10 días en tren con tu perro por la costa francesa e italiana. Hoteles que admiten mascotas, mapas Booking.com en vivo, normas de playa estivales y veterinarios de urgencias.',
    pt: 'Itinerario mediterrâneo de 10 dias de comboio com tu cão pela costa francesa e italiana. Hotéis que admiten animais, mapas Booking.com en vivo, normas de praia estivales e veterinários de urgências.',
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
        pt: `${SITE_URL}/é/guides/${SLUG}`,
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
    hero: { tagline: 'MEDITERRANEAN ITINERARY · 10 DAYS · WITH YOUR DOG', title: 'A train trip down the Mediterranean coast with your dog', subtitle: 'Nice, Genoa, Florence, Rome — four iconic cities along the French and Italian Riviera, connected by direct trains. Pet-welcoming hotels, dog beaches and the live Booking.com map for every stop.' },
    why: { title: 'Why this Mediterranean route works for dog owners', bullets: [
      'Direct Thello / Trenitalia trains the entire way — your dog rides next to you, not in cargo.',
      'All four cities have official pet-friendly beaches or dog swim spots within 30 minutes.',
      'Italian law allows dogs in restaurants by default — terrace dining is the norm everywhere.',
      'No border paperwork inside Schengen — just an EU pet passport with a valid rabies vaccine.',
      'Avoid July–August: pavement temperatures hit 55 °C and most beaches ban dogs 15 May–30 September. May, June, September, October are ideal.',
    ] },
    stats: { duration: 'Duration', cities: 'Cities', transport: 'Transport', budget: 'Budget', durationVal: '10 days', citiesVal: '4 cities', transportVal: 'Train (Thello / Trenitalia / Frecciarossa)', budgetVal: '€1,000–€2,200' },
    citiesIntro: { kicker: 'CITY BY CITY', title: 'Your stops, your hotels, your map' },
    cities: {
      nice: { days: 'Days 1–3', intro: "Start on the French Riviera. Nice is one of the most dog-friendly large French cities: tram T1 accepts dogs free, the 7 km Promenade des Anglais is fully walkable on leash, and three official dog beaches (Carras, Magnan, Lenval) operate year-round. The Old Town's narrow cobbled streets and the Cours Saleya market welcome leashed dogs. Heads up: Nice's pebble beaches are tough on paws — boots help.", highlight: 'Must-do with your dog: sunrise on the Promenade des Anglais', highlightDesc: 'Walk the full 7 km from the airport end to the Quai des États-Unis at golden hour, then refuel at any Vieux-Nice terrace café. Most accept leashed dogs and bring water bowls without asking.' },
      genoa: { days: 'Days 4–5', intro: "Three hours by Thello train along the Italian Riviera coast. Genoa is the most underrated dog-friendly Italian city: a labyrinthine medieval old town (the largest in Europe), the Spianata Castelletto with panoramic views, and direct trains to dog-beach towns like Bogliasco and Camogli. The historic centre's tight alleys (carruggi) make car-free walking the default — perfect with a dog.", highlight: 'Must-do with your dog: a Cinque Terre day trip', highlightDesc: 'Trenitalia from Genova-Brignole reaches Monterosso in 1h20 — leashed dogs travel for half-price. The five villages have dog-permitted seafront walks (off-season; summer beach bans apply 15 May–30 September).' },
      florence: { days: 'Days 6–8', intro: "Direct Frecciarossa from Genova-Piazza-Principe (3h, dog ticket ~€20). Florence is small enough to walk entirely with a dog, and Italian café culture lets you eat anywhere — even Michelin restaurants accept leashed dogs on terraces. The Cascine park (160 ha along the Arno) has off-leash zones; the Boboli Gardens accept dogs on leash with the regular ticket. Avoid the Uffizi and Accademia (no pets).", highlight: 'Must-do with your dog: Piazzale Michelangelo at sunset', highlightDesc: 'Climb from Ponte alle Grazie (the dog-friendly route via Costa San Giorgio takes 25 min) for the postcard view of the Duomo. The terrace stays cool until late and dogs run on the lawns just below the parapet.' },
      rome: { days: 'Days 9–10', intro: "Frecciarossa from Florence in 1h30 (the fastest leg). Rome is enormous and tough mid-summer, but spring and autumn are spectacular: the Villa Borghese (80 ha) and the Appia Antica (3,500 ha of Roman roads) are leash-friendly. Most trattorie and cafés accept dogs at outdoor tables. The metro requires leash and muzzle; trams are easier with anxious dogs.", highlight: 'Must-do with your dog: the Appia Antica on a Sunday', highlightDesc: 'On Sundays, the first 5 km of the ancient Roman road are car-free. Rent a dog-friendly e-bike at Bar Caffè dell\'Appia and cover 10 km of umbrella pines, ruins and grazing sheep. Dogs love it.' },
    },
    hotelsLabel: 'Recommended pet-friendly hotels',
    bookLabel: 'Book on Booking.com',
    detailsLabel: 'Details',
    mapLabel: 'Live map — all pet-friendly hotels',
    legsTitle: 'Transport between cities',
    legs: [
      { from: 'Nice', to: 'Genoa', duration: '~3h', service: 'Thello / Trenitalia regional (direct, scenic coastal)', petRule: 'Small dogs in carrier free, larger dogs need a half-price ticket. Leash + muzzle required.' },
      { from: 'Genoa', to: 'Florence', duration: '~3h', service: 'Frecciarossa / Frecciargento (direct)', petRule: 'Small dogs free. Larger dogs need a Frecciarossa pet ticket (~€20–25). Booked online.' },
      { from: 'Florence', to: 'Rome', duration: '~1h30', service: 'Frecciarossa (direct, every 30 min)', petRule: 'Same Trenitalia rules. The Frecciarossa is the fastest and quietest option.' },
    ],
    practicalTitle: 'Before you go: paperwork, vaccines, vet contacts',
    practicalBullets: [
      'EU pet passport with rabies vaccine valid (21+ days old, less than 12 months for the standard annual jab).',
      'Microchip ISO 11784/11785 — mandatory and must match the passport number.',
      'NO tapeworm treatment required (only for UK / Ireland / Finland / Norway / Malta).',
      'Italian law (Legge 281/1991) allows dogs in restaurants and shops by default. A "vietato l\'ingresso ai cani" sign means no — most other places say yes.',
      'Save 24/7 emergency vets: Nice (CHV des Cordeliers Nice, +33 4 93 80 26 90), Genoa (Clinica Veterinaria San Giorgio, +39 010 8602004), Florence (Clinica Veterinaria Valdinievole, +39 0573 794500), Rome (Clinica Veterinaria Roma Sud, +39 06 7842277).',
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Can my dog swim at the beach?', a: 'In Italy, most beaches ban dogs 15 May–30 September unless they are official "Spiagge Cani". Nice has 3 year-round dog beaches. The Liguria coast around Genoa has several. Florence and Rome are inland — see practical info for nearest options.' },
      { q: 'How much does the trip cost?', a: 'Budget €1,000–€2,200 depending on hotel category. Train fares total ~€350–€550 for 2 adults + 1 dog if booked 4–6 weeks ahead. The dog\'s pet fee is €0 to €50 per stop.' },
      { q: 'When is the best time to go?', a: 'May, June, September and early October are ideal: 18–26 °C, no beach ban issues outside high season, and full hotel availability. July–August are tough with a dog (heat + beach restrictions).' },
      { q: 'Is the metro dog-friendly?', a: 'Florence has no metro. Nice tram T1 is the most dog-friendly. Genoa metro and Rome metro require leash + muzzle for medium/large dogs. Carry a soft muzzle.' },
      { q: 'Can I add Naples or the Amalfi Coast?', a: 'Yes — Frecciarossa Rome → Naples is 1h10 and pet-friendly. The Amalfi Coast SITA buses accept leashed dogs. Most coastal towns have summer beach restrictions.' },
    ],
  },
  fr: {
    hero: { tagline: 'CÔTE MÉDITERRANÉENNE · 10 JOURS · AVEC SON CHIEN', title: 'Un train à travers la côte méditerranéenne avec son chien', subtitle: 'Nice, Gênes, Florence, Rome — quatre villes emblématiques sur la Riviera française et italienne, reliées par trains directs. Hôtels accueillant les animaux, plages canines et la carte Booking.com en direct pour chaque étape.' },
    why: { title: 'Pourquoi cet itinéraire méditerranéen fonctionne avec un chien', bullets: [
      'Trains Thello / Trenitalia directs sur tout le parcours — votre chien voyage à côté de vous, pas en soute.',
      "Les quatre villes ont des plages canines officielles ou points de baignade pour chiens à moins de 30 minutes.",
      'La loi italienne autorise les chiens dans les restaurants par défaut — les terrasses sont la norme partout.',
      "Pas de paperasse aux frontières Schengen — un passeport européen avec vaccination antirabique à jour suffit.",
      "Évitez juillet-août : l'asphalte monte à 55 °C et la plupart des plages interdisent les chiens du 15 mai au 30 septembre. Mai, juin, septembre, octobre sont parfaits.",
    ] },
    stats: { duration: 'Durée', cities: 'Villes', transport: 'Transport', budget: 'Budget', durationVal: '10 jours', citiesVal: '4 villes', transportVal: 'Train (Thello / Trenitalia / Frecciarossa)', budgetVal: '1 000 €–2 200 €' },
    citiesIntro: { kicker: 'VILLE PAR VILLE', title: 'Vos étapes, vos hôtels, votre carte' },
    cities: {
      nice: { days: 'Jours 1–3', intro: "Démarrez sur la Côte d'Azur. Nice est l'une des grandes villes françaises les plus dog-friendly : le tram T1 accepte les chiens gratuitement, la Promenade des Anglais (7 km) se fait entièrement en laisse, et trois plages canines officielles (Carras, Magnan, Lenval) fonctionnent toute l'année. Les ruelles pavées du Vieux-Nice et le marché du Cours Saleya accueillent les chiens en laisse. Attention : les plages de galets à Nice sont rudes pour les coussinets — bottines recommandées.", highlight: 'Incontournable avec son chien : lever du soleil sur la Promenade des Anglais', highlightDesc: 'Faites les 7 km complets côté aéroport jusqu\'au Quai des États-Unis à l\'heure dorée, puis café en terrasse dans le Vieux-Nice. La plupart acceptent les chiens en laisse et apportent une gamelle d\'eau sans demander.' },
      genoa: { days: 'Jours 4–5', intro: "Trois heures de Thello le long de la côte ligure. Gênes est la ville italienne dog-friendly la plus sous-cotée : la plus grande vieille ville médiévale d'Europe (carruggi), la Spianata Castelletto avec vue panoramique, et trains directs vers les plages canines de Bogliasco et Camogli. Le centre historique aux ruelles étroites est par défaut sans voiture — parfait avec un chien.", highlight: 'Incontournable avec son chien : escapade aux Cinque Terre', highlightDesc: 'Trenitalia depuis Genova-Brignole rejoint Monterosso en 1h20 — chiens en laisse demi-tarif. Les cinq villages offrent des promenades de bord de mer (hors saison ; interdiction de plage 15 mai-30 septembre).' },
      florence: { days: 'Jours 6–8', intro: "Frecciarossa direct depuis Genova-Piazza-Principe (3h, billet chien ~20 €). Florence est assez petite pour se parcourir entièrement à pied avec un chien, et la culture café italienne permet de manger partout — même les restaurants étoilés acceptent les chiens en laisse en terrasse. Le parc des Cascine (160 ha le long de l'Arno) a des zones sans laisse ; les Jardins de Boboli acceptent les chiens en laisse avec billet normal. Évitez les Offices et l'Accademia (animaux interdits).", highlight: 'Incontournable avec son chien : Piazzale Michelangelo au coucher du soleil', highlightDesc: 'Montez depuis le Ponte alle Grazie (route dog-friendly via Costa San Giorgio en 25 min) pour la vue carte postale du Duomo. La terrasse reste fraîche tard et les chiens courent sur les pelouses sous le parapet.' },
      rome: { days: 'Jours 9–10', intro: "Frecciarossa depuis Florence en 1h30 (le tronçon le plus rapide). Rome est immense et difficile en plein été, mais printemps et automne sont spectaculaires : la Villa Borghese (80 ha) et l'Appia Antica (3 500 ha de voies romaines) acceptent les chiens en laisse. La plupart des trattorie et cafés acceptent les chiens en terrasse. Le métro impose laisse et muselière ; le tram est plus simple pour les chiens anxieux.", highlight: "Incontournable avec son chien : l'Appia Antica le dimanche", highlightDesc: 'Le dimanche, les 5 premiers km de la voie romaine antique sont sans voitures. Louez un vélo électrique dog-friendly au Bar Caffè dell\'Appia et faites 10 km de pins parasol, ruines et moutons en pâturage. Les chiens adorent.' },
    },
    hotelsLabel: 'Hôtels recommandés acceptant les animaux',
    bookLabel: 'Réserver sur Booking.com',
    detailsLabel: 'Détails',
    mapLabel: 'Carte en direct — tous les hôtels pet-friendly',
    legsTitle: 'Transport entre les villes',
    legs: [
      { from: 'Nice', to: 'Gênes', duration: '~3h', service: 'Thello / Trenitalia régional (direct, pittoresque côtier)', petRule: 'Petits chiens en cage gratuits, grands chiens demi-tarif. Laisse + muselière obligatoires.' },
      { from: 'Gênes', to: 'Florence', duration: '~3h', service: 'Frecciarossa / Frecciargento (direct)', petRule: 'Petits chiens gratuits. Grands chiens : billet animal Frecciarossa (~20–25 €). Réservation en ligne.' },
      { from: 'Florence', to: 'Rome', duration: '~1h30', service: 'Frecciarossa (direct, toutes les 30 min)', petRule: 'Mêmes règles Trenitalia. Le Frecciarossa est l\'option la plus rapide et la plus calme.' },
    ],
    practicalTitle: 'Avant de partir : paperasse, vaccins, contacts vétérinaires',
    practicalBullets: [
      "Passeport européen pour animal avec vaccination antirabique valide (21+ jours, moins de 12 mois pour le rappel annuel).",
      'Puce électronique ISO 11784/11785 — obligatoire et doit correspondre au numéro du passeport.',
      "AUCUN traitement contre l'échinococcose requis (uniquement pour UK / Irlande / Finlande / Norvège / Malte).",
      "La loi italienne (Legge 281/1991) autorise les chiens dans les restaurants et boutiques par défaut. Une pancarte 'vietato l'ingresso ai cani' = non — partout ailleurs : oui.",
      "Vétérinaires d'urgence 24h/24 : Nice (CHV des Cordeliers Nice, +33 4 93 80 26 90), Gênes (Clinica Veterinaria San Giorgio, +39 010 8602004), Florence (Clinica Veterinaria Valdinievole, +39 0573 794500), Rome (Clinica Veterinaria Roma Sud, +39 06 7842277).",
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Mon chien peut-il se baigner à la plage ?', a: "En Italie, la plupart des plages interdisent les chiens du 15 mai au 30 septembre sauf Spiagge Cani officielles. Nice a 3 plages canines toute l'année. La côte ligure autour de Gênes en a plusieurs. Florence et Rome sont à l'intérieur des terres — voir infos pratiques pour les options les plus proches." },
      { q: 'Combien coûte le voyage ?', a: "Comptez 1 000 à 2 200 € selon catégorie d'hôtel. Billets de train ~350–550 € pour 2 adultes + 1 chien si réservés 4-6 semaines à l'avance. Supplément animal 0 à 50 € par étape." },
      { q: 'Quelle est la meilleure période ?', a: 'Mai, juin, septembre et début octobre sont idéaux : 18–26 °C, pas de problème d\'interdiction de plage hors haute saison, hôtels disponibles. Juillet-août sont durs avec un chien (chaleur + restrictions plage).' },
      { q: 'Le métro est-il dog-friendly ?', a: "Florence n'a pas de métro. Le tram T1 de Nice est le plus dog-friendly. Métro de Gênes et de Rome exigent laisse + muselière pour les chiens moyens/grands. Emportez une muselière souple." },
      { q: 'Puis-je ajouter Naples ou la côte amalfitaine ?', a: 'Oui — Frecciarossa Rome → Naples en 1h10, accepte les chiens. Les bus SITA de la côte amalfitaine acceptent les chiens en laisse. La plupart des villes côtières ont des restrictions estivales.' },
    ],
  },
  es: {
    hero: { tagline: 'COSTA MEDITERRÁNEA · 10 DÍAS · CON TU PERRO', title: 'Un viaje en tren por la costa mediterránea con tu perro', subtitle: 'Niza, Génova, Florencia, Roma — cuatro ciudades icónicas en la Riviera francesa e italiana, conectadas por trenes directos. Hoteles que admiten mascotas, playas caninas y el mapa Booking.com en vivo para cada parada.' },
    why: { title: 'Por qué este itinerario mediterráneo funciona con perro', bullets: [
      'Trenes Thello / Trenitalia directos en todo el recorrido — tu perro viaja a tu lado, no en bodega.',
      'Las cuatro ciudades tienen playas caninas oficiales o zonas de baño para perros a menos de 30 minutos.',
      'La ley italiana admite perros en restaurantes por defecto — las terrazas son la norma en todas partes.',
      'Sin papeleo en las fronteras Schengen — basta un pasaporte europeo con vacunación antirrábica vigente.',
      'Evita julio-agosto: el asfalto sube a 55 °C y la mayoría de playas prohíben perros del 15 mayo al 30 septiembre. Mayo, junio, septiembre, octubre son perfectos.',
    ] },
    stats: { duration: 'Duración', cities: 'Ciudades', transport: 'Transporte', budget: 'Presupuesto', durationVal: '10 días', citiesVal: '4 ciudades', transportVal: 'Tren (Thello / Trenitalia / Frecciarossa)', budgetVal: '1.000 €–2.200 €' },
    citiesIntro: { kicker: 'CIUDAD POR CIUDAD', title: 'Tus paradas, tus hoteles, tu mapa' },
    cities: {
      nice: { days: 'Días 1–3', intro: "Empieza en la Riviera francesa. Niza es una de las grandes ciudades francesas más dog-friendly: el tranvía T1 admite perros gratis, los 7 km de la Promenade des Anglais se recorren con correa, y tres playas caninas oficiales (Carras, Magnan, Lenval) funcionan todo el año. Las callejuelas empedradas del casco antiguo y el mercado del Cours Saleya admiten perros con correa. Aviso: las playas de guijarros de Niza son duras para las almohadillas — botines recomendados.", highlight: 'Imprescindible con tu perro: amanecer en la Promenade des Anglais', highlightDesc: 'Recorre los 7 km enteros desde el extremo del aeropuerto hasta el Quai des États-Unis a la hora dorada, luego café en cualquier terraza del Vieux-Nice. La mayoría admite perros con correa y trae bol de agua sin pedirlo.' },
      genoa: { days: 'Días 4–5', intro: "Tres horas en Thello por la costa ligur. Génova es la ciudad italiana dog-friendly más infravalorada: el casco antiguo medieval más grande de Europa (carruggi), la Spianata Castelletto con vistas panorámicas, y trenes directos a pueblos con playa canina como Bogliasco y Camogli. El centro histórico de callejones estrechos es peatonal por defecto — perfecto con perro.", highlight: 'Imprescindible con tu perro: excursión a Cinque Terre', highlightDesc: 'Trenitalia desde Génova-Brignole llega a Monterosso en 1h20 — perros con correa a mitad de precio. Los cinco pueblos tienen paseos costeros (fuera de temporada; veto de playa 15 mayo–30 septiembre).' },
      florence: { days: 'Días 6–8', intro: "Frecciarossa directo desde Génova-Piazza-Principe (3h, billete canino ~20 €). Florencia es lo bastante pequeña para recorrerla entera a pie con perro, y la cultura café italiana te deja comer en cualquier sitio — incluso restaurantes con estrella admiten perros con correa en terraza. El parque de las Cascine (160 ha junto al Arno) tiene zonas sin correa; los Jardines de Boboli admiten perros con correa con la entrada normal. Evita los Uffizi y la Accademia (sin animales).", highlight: 'Imprescindible con tu perro: Piazzale Michelangelo al atardecer', highlightDesc: 'Sube desde el Ponte alle Grazie (la ruta dog-friendly por Costa San Giorgio dura 25 min) para la vista postal del Duomo. La terraza se mantiene fresca hasta tarde y los perros corren por los céspedes bajo la balaustrada.' },
      rome: { days: 'Días 9–10', intro: "Frecciarossa desde Florencia en 1h30 (el tramo más rápido). Roma es enorme y dura en pleno verano, pero primavera y otoño son espectaculares: la Villa Borghese (80 ha) y la Appia Antica (3.500 ha de vías romanas) admiten perros con correa. La mayoría de trattorie y cafés admiten perros en mesas exteriores. El metro exige correa y bozal; el tranvía es más fácil con perros ansiosos.", highlight: 'Imprescindible con tu perro: la Appia Antica un domingo', highlightDesc: 'Los domingos, los primeros 5 km de la antigua vía romana son peatonales. Alquila una bici eléctrica dog-friendly en Bar Caffè dell\'Appia y haz 10 km de pinos piñoneros, ruinas y ovejas pastando. A los perros les encanta.' },
    },
    hotelsLabel: 'Hoteles recomendados que admiten mascotas',
    bookLabel: 'Reservar en Booking.com',
    detailsLabel: 'Detalles',
    mapLabel: 'Mapa en vivo — todos los hoteles pet-friendly',
    legsTitle: 'Transporte entre ciudades',
    legs: [
      { from: 'Niza', to: 'Génova', duration: '~3h', service: 'Thello / Trenitalia regional (directo, costero pintoresco)', petRule: 'Perros pequeños en transportín gratis, grandes a media tarifa. Correa + bozal obligatorios.' },
      { from: 'Génova', to: 'Florencia', duration: '~3h', service: 'Frecciarossa / Frecciargento (directo)', petRule: 'Perros pequeños gratis. Grandes: billete de mascota Frecciarossa (~20–25 €). Reserva online.' },
      { from: 'Florencia', to: 'Roma', duration: '~1h30', service: 'Frecciarossa (directo, cada 30 min)', petRule: 'Mismas normas Trenitalia. El Frecciarossa es la opción más rápida y silenciosa.' },
    ],
    practicalTitle: 'Antes de salir: papeleo, vacunas, contactos veterinarios',
    practicalBullets: [
      'Pasaporte europeo con vacunación antirrábica vigente (21+ días, menos de 12 meses para la dosis anual).',
      'Microchip ISO 11784/11785 — obligatorio y debe coincidir con el número del pasaporte.',
      'NO se requiere tratamiento contra la equinococosis (solo Reino Unido / Irlanda / Finlandia / Noruega / Malta).',
      "La ley italiana (Legge 281/1991) admite perros en restaurantes y tiendas por defecto. Cartel 'vietato l'ingresso ai cani' = no — en todos los demás sitios: sí.",
      "Veterinarios de urgencias 24/7: Niza (CHV des Cordeliers Nice, +33 4 93 80 26 90), Génova (Clinica Veterinaria San Giorgio, +39 010 8602004), Florencia (Clinica Veterinaria Valdinievole, +39 0573 794500), Roma (Clinica Veterinaria Roma Sud, +39 06 7842277).",
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Puede mi perro bañarse en la playa?', a: 'En Italia, la mayoría de playas prohíben perros del 15 mayo al 30 septiembre salvo Spiagge Cani oficiales. Niza tiene 3 playas caninas todo el año. La costa ligur en torno a Génova tiene varias. Florencia y Roma son interiores — ver info práctica para las opciones más cercanas.' },
      { q: '¿Cuánto cuesta el viaje?', a: 'Presupuesta 1.000–2.200 € según categoría de hotel. Los billetes de tren suman ~350–550 € para 2 adultos + 1 perro si se reservan con 4-6 semanas. El cargo por mascota va de 0 a 50 € por parada.' },
      { q: '¿Cuál es la mejor época?', a: 'Mayo, junio, septiembre y principios de octubre son ideales: 18–26 °C, sin problemas de prohibición de playa fuera de temporada alta, y hoteles disponibles. Julio-agosto son duros con perro (calor + restricciones de playa).' },
      { q: '¿Es dog-friendly el metro?', a: 'Florencia no tiene metro. El tranvía T1 de Niza es el más dog-friendly. Los metros de Génova y Roma exigen correa + bozal para perros medianos/grandes. Lleva un bozal flexible.' },
      { q: '¿Puedo añadir Nápoles o la Costa Amalfitana?', a: 'Sí — Frecciarossa Roma → Nápoles en 1h10, admite perros. Los buses SITA de la Costa Amalfitana admiten perros con correa. La mayoría de pueblos costeros tienen restricciones estivales.' },
    ],
  },
  pt: {
    hero: { tagline: 'Costa Mediterrânea · 10 Dias · Com O teu cão', title: 'Um viaje de comboio pela costa mediterrânea com o teu cão', subtitle: 'Niza, Génova, Florencia, Roma — cuatro cidades icónicas na Riviera francesa e italiana, conectadas por comboios directos. Hotéis que admitem animais, praias caninas e o mapa Booking.com em vivo para cada parada.' },
    why: { title: 'Porquê este itinerário mediterrâneo funciona com cão', bullets: [
      'Comboios Thello / Trenitalia directos em todo o recorrido — o teu cão viaja a tu lado, no em bodega.',
      'As cuatro cidades têm praias caninas oficiais o zonas de banho para cães a menos de 30 minutos.',
      'A lei italiana admite cães em restaurantes por defecto — as esplanadas são a norma em todo o lado.',
      'Sem burocracia nas fronteras Schengen — basta um passaporte europeu com vacinação antirrábica vigente.',
      'Evita julho-agosto: o asfalto sube a 55 °C e a maioria de praias proíbem cães do 15 maio ao 10 setembro. Maio, junho, setembro, outubro são perfeitos.',
    ] },
    stats: { duration: 'Duración', cities: 'Cidades', transport: 'Transporte', budget: 'Presupuesto', durationVal: '10 dias', citiesVal: '4 cidades', transportVal: 'Comboio (Thello / Trenitalia / Frecciarossa)', budgetVal: '1.000 €–2.200 €' },
    citiesIntro: { kicker: 'Cidade POR Cidade', title: 'Os teus paradas, os teus hotéis, tu mapa' },
    cities: {
      nice: { days: 'Dias 1–3', intro: "Empieza na Riviera francesa. Niza é uma das as grandes cidades francesas mais pet-friendly: o elétrico T1 admite cães grátis, os 7 km da Promenade des Anglais se recorren com trela, e tres praias caninas oficiais (Carras, Magnan, Lenval) funcionam o ano inteiro. As callejuelas empedradas do centro histórico e o mercado do Cours Saleya admitem cães com trela. Aviso: as praias de guijarros de Niza são duras para as almohadillas — botines recomendados.", highlight: 'Imprescindible com o teu cão: amanecer na Promenade des Anglais', highlightDesc: 'Recorre os 7 km enteros desde o extremo do aeroporto até o Quai des États-Unis a hora dorada, luego café em cualquier esplanada do Vieux-Nice. A mayoría admite cães com trela e trae bol de água sem pedirlo.' },
      genoa: { days: 'Dias 4–5', intro: "Tres horas em Thello pela costa ligur. Génova é a cidade italiana pet-friendly mais infravalorada: o centro histórico medieval mais GRANDE de Europa (carruggi), a Spianata Castelletto com vistas panorámicas, e comboios directos a pueblos com praia canina como Bogliasco e Camogli. O centro histórico de ruelas estreitos é peatonal por defecto — perfeito com cão.", highlight: 'Imprescindible com o teu cão: excursión a Cinque Terre', highlightDesc: 'Trenitalia desde Génova-Brignole chega a Monterosso em 1h20 — cães com trela a mitad de preço. Os cinco pueblos têm passeios costeros (fora de temporada; veto de praia 15 maio–30 setembro).' },
      florence: { days: 'Dias 6–8', intro: "Frecciarossa directo desde Génova-Piazza-Principe (3h, bilhete canino ~20 €). Florencia é lo bastante pequena para recorrerla entera a pé com cão, e a cultura café italiana te deixa comer em cualquier sitio — mesmo restaurantes com estrella admitem cães com trela em esplanada. O parque das Cascine (160 tem junto al Arno) tem zonas sem trela; os Jardins de Boboli admitem cães com trela com a entrada normal. Evita os Uffizi e a Accademia (sem animales).", highlight: 'Imprescindible com o teu cão: Piazzale Michelangelo al atardecer', highlightDesc: 'Sube desde o Ponte alle Grazie (a ruta pet-friendly por Costa San Giorgio dura 25 min) para a vista postal do Duomo. A esplanada se mantiene fresca até tarde e os cães corren pelos céspedes sob a balaustrada.' },
      rome: { days: 'Dias 9–10', intro: "Frecciarossa desde Florencia em 1h30 (o tramo mais rápido). Roma é enorme e dura em pleno verão, mas primavera e outono são espectaculares: a Villa Borghese (80 ha) e a Appia Antica (3.500 tem de vías romanas) admitem cães com trela. A maioria de trattorie e cafés admitem cães em mesas exteriores. O metro exige trela e bozal; o elétrico é mais fácil com cães ansiosos.", highlight: 'Imprescindible com o teu cão: a Appia Antica um domingo', highlightDesc: 'Os domingos, os primeros 5 km da antiga vía romana são peatonales. Alquila uma bici eléctrica pet-friendly em Bar Caffè dell\'Appia e haz 10 km de pinos pinhoneros, ruinas e ovejas pastando. Aos cães les encanta.' },
    },
    hotelsLabel: 'Hotéis recomendados que admitem animais',
    bookLabel: 'Reservar em Booking.com',
    detailsLabel: 'Detalhes',
    mapLabel: 'Mapa em vivo — todos os hotéis pet-friendly',
    legsTitle: 'Transporte entre cidades',
    legs: [
      { from: 'Niza', to: 'Génova', duration: '~3h', service: 'Thello / Trenitalia regional (directo, costero pintoresco)', petRule: 'Cães pequenos em transportadora grátis, grandes a meio preço. Trela + bozal obrigatórios.' },
      { from: 'Génova', to: 'Florencia', duration: '~3h', service: 'Frecciarossa / Frecciargento (directo)', petRule: 'Cães pequenos grátis. Grandes: bilhete de animal Frecciarossa (~20–25 €). Reserva online.' },
      { from: 'Florencia', to: 'Roma', duration: '~1h30', service: 'Frecciarossa (directo, cada 30 min)', petRule: 'Mismas normas Trenitalia. O Frecciarossa é a opção mais rápida e silenciosa.' },
    ],
    practicalTitle: 'Antes de salir: burocracia, vacunas, contactos veterinários',
    practicalBullets: [
      'Passaporte europeu com vacinação antirrábica vigente (21+ dias, menos de 12 meses para a dosis anual).',
      'Microchip ISO 11784/11785 — obrigatório e debe coincidir com o número do passaporte.',
      'NO se exige tratamento contra a equinococose (só Reino Unido / Irlanda / Finlândia / Norueguesa / Malta).',
      "A lei italiana (Legge 281/1991) admite cães em restaurantes e lojas por defecto. Cartel 'vietato l'ingresso ai cani' = no — em todos os demás sitios: sí.",
      "Veterinários de urgências 24/7: Niza (CHV des Cordeliers Nice, +33 4 93 80 26 90), Génova (Clinica Veterinária San Giorgio, +39 010 8602004), Florencia (Clinica Veterinária Valdinievole, +39 0573 794500), Roma (Clinica Veterinária Roma Sud, +39 06 7842277).",
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: 'Pode mi cão banhar-se na praia?', a: 'Em Italia, a maioria de praias proíbem cães do 15 maio ao 10 setembro salvo Spiagge Cani oficiais. Niza tem 3 praias caninas o ano inteiro. A costa ligur em torno a Génova tem varias. Florencia e Roma são interiores — ver info práctica para as opções mais cercanas.' },
      { q: 'Cuánto custa o viaje?', a: 'Presupuesta 1.000–2.200 € segundo categoría de hotel. Os bilhetes de comboio suman ~350–550 € para 2 adultos + 1 cão si se reservan com 4-6 semanas. O cargo por animal va de 0 a 50 € por parada.' },
      { q: 'Qual é a MELHOR época?', a: 'Maio, junho, setembro e principios de outubro são ideales: 18–26 °C, sem problemas de prohibición de praia fora de temporada alta, e hotéis disponibles. Julho-agosto são duros com cão (calor + restricciones de praia).' },
      { q: 'É pet-friendly o metro?', a: 'Florencia no tem metro. O elétrico T1 de Niza é o mais pet-friendly. Os metros de Génova e Roma exigen trela + bozal para cães medianos/grandes. Leva um bozal flexible.' },
      { q: 'Puedo anhadir Nápoles o a Costa Amalfitana?', a: 'Sí — Frecciarossa Roma → Nápoles em 1h10, admite cães. Os buses SITA da Costa Amalfitana admitem cães com trela. A maioria de pueblos costeros têm restricciones estivales.' },
    ],
  },
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  return <CityTripGuide slug={SLUG} routeSlugs={ROUTE_SLUGS} locale={locale} copy={COPY[locale] ?? COPY.en} />
}
