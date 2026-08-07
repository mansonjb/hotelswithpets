import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, STAY22_AID } from '@/lib/site'
import { CityTripGuide, type RouteCopy, type StickyConfig } from '../_components/CityTripGuide'

const SLUG = 'iberique-chien'
const ROUTE_SLUGS = ['lisbon', 'porto', 'madrid', 'barcelona'] as const

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const titles: Record<string, string> = {
    en: 'Iberian Peninsula With Your Dog: Lisbon → Porto → Madrid → Barcelona (12-Day Itinerary)',
    fr: 'Péninsule ibérique avec son chien : Lisbonne → Porto → Madrid → Barcelone (itinéraire 12 jours)',
    es: 'Península ibérica con tu perro: Lisboa → Oporto → Madrid → Barcelona (itinerario 12 días)',
    pt: 'Península ibérica com tu cão: Lisboa → Porto → Madrid → Barcelona (itinerario 12 dias)',
  }
  const descriptions: Record<string, string> = {
    en: 'A 12-day Iberian rail itinerary with your dog: Portugal\'s coast then Spain\'s capitals. Pet-friendly hotels, AVE/Alfa Pendular train rules, summer heat tips, live Booking.com maps.',
    fr: 'Itinéraire ibérique de 12 jours en train avec votre chien : la côte portugaise puis les capitales espagnoles. Hôtels acceptant les animaux, règles AVE/Alfa Pendular, conseils canicule, cartes Booking.com en direct.',
    es: 'Itinerario ibérico de 12 días en tren con tu perro: la costa portuguesa y luego las capitales españolas. Hoteles que admiten mascotas, normas AVE/Alfa Pendular, consejos para el calor, mapas Booking.com en vivo.',
    pt: 'Itinerario ibérico de 12 dias de comboio com tu cão: a costa portuguesa e luego as capitales espanholas. Hotéis que admiten animais, normas AVE/Alfa Pendular, consejos para o calor, mapas Booking.com en vivo.',
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
    openGraph: { title: titles[locale] ?? titles.en, description: descriptions[locale] ?? descriptions.en, type: 'article', publishedTime: '2026-04-27T00:00:00Z', modifiedTime: `${today}T00:00:00Z` },
  }
}

const COPY: Record<string, RouteCopy> = {
  en: {
    hero: { tagline: 'IBERIAN ITINERARY · 12 DAYS · WITH YOUR DOG', title: 'An Iberian rail journey with your dog', subtitle: 'Lisbon, Porto, Madrid, Barcelona, Portugal\'s Atlantic coast and Spain\'s great capitals, all connected by direct trains. Pet-friendly hotels, dog beaches and live Booking.com maps for every stop.' },
    why: { title: 'Why this Iberian route works for dog owners', bullets: [
      'Portugal and Spain are among Europe\'s most pet-tolerant countries, most cafés, restaurants and shops accept leashed dogs without question.',
      'Direct Alfa Pendular (Lisbon ↔ Porto) and AVE (Madrid ↔ Barcelona) trains accept dogs, with a connecting overnight option for the Porto–Madrid leg.',
      'All four cities have official year-round dog beaches or fenced off-leash zones within 30 minutes of the centre.',
      'No Schengen border paperwork, just an EU pet passport with valid rabies vaccine.',
      'Heat is the main constraint: avoid July–August, especially Madrid (40 °C+ regular). May, early June, late September, October are ideal.',
    ] },
    stats: { duration: 'Duration', cities: 'Cities', transport: 'Transport', budget: 'Budget', durationVal: '12 days', citiesVal: '4 cities', transportVal: 'Train (Alfa Pendular / Trenhotel / AVE)', budgetVal: '€1,000–€2,000' },
    citiesIntro: { kicker: 'CITY BY CITY', title: 'Your stops, your hotels, your map' },
    cities: {
      lisbon: { days: 'Days 1–3', intro: "Start in Lisbon, one of Europe's most relaxed dog cities. Trams (the historic 28 included) accept leashed dogs free of charge, the Tagus riverfront has 8 km of car-free promenade, and the Alcântara dog beach (Praia do Porto Brandão) is a 15-min ferry from the centre. The Bairro Alto and Alfama tile-paved alleys are dog-friendly during the day; nights get crowded.", highlight: 'Must-do with your dog: sunset at Miradouro da Senhora do Monte', highlightDesc: 'The highest viewpoint in the city, less crowded than Santa Catarina. Tram 28 brings you within 5 min walk; dogs welcome on the terrace bar afterwards.' },
      porto: { days: 'Days 4–5', intro: "Three hours by Alfa Pendular train. Porto is even more dog-friendly than Lisbon: the Douro riverbank in Ribeira accepts dogs in every café terrace, the Foz do Douro coast has dog-friendly beaches (Praia do Carneiro, Praia de Lavadores) reachable by tram, and the Crystal Palace gardens are off-leash welcoming in early morning.", highlight: 'Must-do with your dog: a Douro Valley wine train day trip', highlightDesc: 'Comboios de Portugal\'s Linha do Douro from Porto-São Bento to Régua takes 2h along the river. Leashed dogs travel free in carriers, half-price otherwise. Many quintas (port wineries) welcome dogs in their gardens.' },
      madrid: { days: 'Days 6–9', intro: "Trenhotel overnight (8h) or fly with dog (Iberia accepts in cabin) to bridge Porto-Madrid. Madrid is one of Europe's largest dog populations: 350,000 registered dogs, the giant Casa de Campo (1,700 ha) and Parque del Retiro (125 ha) both pet-friendly, and Madrid Metro accepts all dogs on leash + muzzle in off-peak hours.", highlight: 'Must-do with your dog: a Casa de Campo morning loop', highlightDesc: '1,700 hectares of pine forest 15 min from Sol by metro. Multiple off-leash zones and a small lake. Locals start at the Lago entrance and walk 6–8 km, your dog will sleep in the afternoon.' },
      barcelona: { days: 'Days 10–12', intro: "AVE high-speed train from Madrid in 2h30 (the fastest leg, dog ticket €15). Barcelona is dog-friendly along the seafront: Llevant Beach is the official year-round dog beach (off-leash swimming), Montjuïc has off-leash zones, the Born and Gràcia neighbourhoods are full of dog-welcoming café terraces. The metro requires leash + muzzle for medium/large dogs.", highlight: 'Must-do with your dog: Llevant dog beach + Bogatell promenade', highlightDesc: 'Barcelona\'s only year-round dog beach (off-leash, fresh-water shower, bins). Combine with the 4 km Bogatell promenade for a full morning. Stop at La Bombeta for tapas, leashed dogs welcome on the terrace.' },
    },
    hotelsLabel: 'Recommended pet-friendly hotels',
    bookLabel: 'Book on Booking.com',
    detailsLabel: 'Details',
    mapLabel: 'Live map, all pet-friendly hotels',
    legsTitle: 'Transport between cities',
    legs: [
      { from: 'Lisbon', to: 'Porto', duration: '~3h', service: 'Alfa Pendular (direct, every 1–2h)', petRule: 'Small dogs in carrier (max 10 kg) free. Larger dogs not officially permitted on Alfa Pendular, drive or use Renfe / Renfe-CP service via Vigo.' },
      { from: 'Porto', to: 'Madrid', duration: '~10h overnight or fly 1h30', service: 'Trenhotel Lusitania (overnight) or Iberia flight', petRule: 'Trenhotel accepts dogs in private cabin. Iberia flight: dogs <8 kg in cabin (€60), larger in hold (€150).' },
      { from: 'Madrid', to: 'Barcelona', duration: '~2h30', service: 'AVE Renfe (direct, every 30 min)', petRule: 'Small dogs (max 10 kg) free. Renfe Mascotas Grandes pilot allows dogs up to 40 kg with reservation (€15 / dog). Carry a soft muzzle.' },
    ],
    practicalTitle: 'Before you go: paperwork, vaccines, vet contacts',
    practicalBullets: [
      'EU pet passport with rabies vaccine valid (21+ days old).',
      'Microchip ISO 11784/11785, mandatory.',
      'Spain has breed-specific laws (Ley 50/1999): Pit Bull, Rottweiler, Am. Staff, Bullterrier, Tosa, Argentinian Mastiff, Brazilian Mastiff, Akita Inu, Doberman are PPP. Owners need a permit, leash + muzzle in public, civil insurance.',
      'Heat is the #1 risk: pavement at 50 °C in Madrid in July, walk 7–9 AM or after 9 PM, carry a foldable water bowl, never leave dog in car.',
      'Save 24/7 vets: Lisbon (Hospital Veterinário Restelo, +351 21 303 80 00), Porto (Hospital Veterinário Montenegro, +351 22 900 26 30), Madrid (Hospital Veterinario VETSIA, +34 91 632 95 76), Barcelona (Hospital Ars Veterinaria, +34 93 200 10 00).',
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Why no direct train Porto → Madrid?', a: 'Iberia historically had no high-speed rail link. The Trenhotel overnight is the only direct rail option (10h). Most travellers fly (Iberia 1h30, dog accepted) or take a long bus. Plans for a Porto–Madrid AVE exist but are not built yet.' },
      { q: 'Is Spain\'s heat too much for a dog?', a: 'In July–August, yes, Madrid hits 40 °C, Barcelona 32 °C with humidity. Plan walks 7–9 AM and after sunset. Hotels with AC are essential. Avoid those months for short-snouted breeds.' },
      { q: 'Are restaurants really dog-friendly in Spain?', a: 'Spanish law allows individual establishments to set rules, but Madrid and Barcelona have a strong "perro permitido" trend. Look for the green paw sticker. Most terraces accept dogs without issue; ask before sitting indoors.' },
      { q: 'Can I do this trip with a 25 kg+ dog?', a: 'Yes, but tighter logistics: Alfa Pendular doesn\'t officially accept large dogs (rent a car for Lisbon–Porto), and Renfe AVE Mascotas Grandes pilot is the easier Madrid–Barcelona option (~€15/dog). Hotels in this guide all accept large dogs.' },
      { q: 'Is the Madrid metro dog-friendly?', a: 'Yes, all sizes allowed on leash + muzzle, free of charge, but only in off-peak hours (before 7 AM, 10 AM–12 PM, 4 PM–7 PM, after 9 PM weekdays; all day weekends). Carry the muzzle in your bag.' },
    ],
  },
  fr: {
    hero: { tagline: 'PÉNINSULE IBÉRIQUE · 12 JOURS · AVEC SON CHIEN', title: 'Un voyage ibérique en train avec son chien', subtitle: 'Lisbonne, Porto, Madrid, Barcelone, la côte atlantique portugaise et les grandes capitales espagnoles, reliées par trains directs. Hôtels acceptant les animaux, plages canines et cartes Booking.com en direct pour chaque étape.' },
    why: { title: 'Pourquoi cet itinéraire ibérique fonctionne avec un chien', bullets: [
      "Portugal et Espagne sont parmi les pays d'Europe les plus tolérants envers les animaux, la plupart des cafés, restaurants et boutiques acceptent les chiens en laisse sans question.",
      "Les trains directs Alfa Pendular (Lisbonne ↔ Porto) et AVE (Madrid ↔ Barcelone) acceptent les chiens, avec une option overnight pour le tronçon Porto–Madrid.",
      "Les quatre villes ont des plages canines officielles toute l'année ou des zones sans laisse clôturées à moins de 30 minutes du centre.",
      "Pas de paperasse aux frontières Schengen, un passeport européen avec vaccination antirabique à jour suffit.",
      "La chaleur est la contrainte principale : évitez juillet-août, surtout Madrid (40 °C+ régulièrement). Mai, début juin, fin septembre, octobre sont parfaits.",
    ] },
    stats: { duration: 'Durée', cities: 'Villes', transport: 'Transport', budget: 'Budget', durationVal: '12 jours', citiesVal: '4 villes', transportVal: 'Train (Alfa Pendular / Trenhotel / AVE)', budgetVal: '1 000 €–2 000 €' },
    citiesIntro: { kicker: 'VILLE PAR VILLE', title: 'Vos étapes, vos hôtels, votre carte' },
    cities: {
      lisbon: { days: 'Jours 1–3', intro: "Démarrez à Lisbonne, l'une des villes européennes les plus décontractées avec les chiens. Les tramways (le 28 historique inclus) acceptent les chiens en laisse gratuitement, les berges du Tage offrent 8 km de promenade sans voitures, et la plage canine d'Alcântara (Praia do Porto Brandão) est à 15 min en ferry du centre. Les ruelles pavées du Bairro Alto et de l'Alfama sont dog-friendly de jour ; les soirées sont bondées.", highlight: 'Incontournable avec son chien : coucher de soleil au Miradouro da Senhora do Monte', highlightDesc: 'Le belvédère le plus haut de la ville, moins fréquenté que Santa Catarina. Le tram 28 vous y emmène à 5 min à pied ; chiens bienvenus au bar en terrasse ensuite.' },
      porto: { days: 'Jours 4–5', intro: "Trois heures d'Alfa Pendular. Porto est encore plus dog-friendly que Lisbonne : les berges du Douro à la Ribeira acceptent les chiens dans chaque terrasse de café, la côte de Foz do Douro a des plages canines (Praia do Carneiro, Praia de Lavadores) accessibles en tram, et les jardins du Palais de Cristal accueillent les chiens sans laisse tôt le matin.", highlight: "Incontournable avec son chien : escapade dans la vallée du Douro en train", highlightDesc: 'La Linha do Douro de Comboios de Portugal de Porto-São Bento à Régua dure 2h le long du fleuve. Chiens en laisse gratuits en cage, demi-tarif sinon. Beaucoup de quintas (caves de Porto) accueillent les chiens dans leurs jardins.' },
      madrid: { days: 'Jours 6–9', intro: "Trenhotel de nuit (8h) ou avion avec chien (Iberia accepte en cabine) pour relier Porto-Madrid. Madrid possède l'une des plus grandes populations canines d'Europe : 350 000 chiens enregistrés, l'immense Casa de Campo (1 700 ha) et le Parque del Retiro (125 ha) tous deux dog-friendly, et le métro madrilène accepte tous les chiens en laisse + muselière en heures creuses.", highlight: 'Incontournable avec son chien : boucle matinale à la Casa de Campo', highlightDesc: '1 700 hectares de forêt de pins à 15 min de Sol en métro. Plusieurs zones sans laisse et un petit lac. Les locaux partent de l\'entrée Lago et marchent 6 à 8 km, votre chien dormira l\'après-midi.' },
      barcelona: { days: 'Jours 10–12', intro: "AVE depuis Madrid en 2h30 (le tronçon le plus rapide, billet chien 15 €). Barcelone est dog-friendly le long du front de mer : la plage de Llevant est la plage canine officielle toute l'année (baignade sans laisse), Montjuïc a des zones sans laisse, les quartiers du Born et de Gràcia regorgent de terrasses accueillantes. Le métro impose laisse + muselière pour les chiens moyens/grands.", highlight: 'Incontournable avec son chien : plage canine de Llevant + promenade de Bogatell', highlightDesc: "Seule plage canine toute l'année de Barcelone (sans laisse, douche eau douce, poubelles). Combinez avec les 4 km de la promenade Bogatell pour une matinée complète. Arrêt à La Bombeta pour des tapas, chiens en laisse bienvenus en terrasse." },
    },
    hotelsLabel: 'Hôtels recommandés acceptant les animaux',
    bookLabel: 'Réserver sur Booking.com',
    detailsLabel: 'Détails',
    mapLabel: 'Carte en direct, tous les hôtels pet-friendly',
    legsTitle: 'Transport entre les villes',
    legs: [
      { from: 'Lisbonne', to: 'Porto', duration: '~3h', service: 'Alfa Pendular (direct, toutes les 1-2h)', petRule: "Petits chiens en cage (max 10 kg) gratuits. Grands chiens non officiellement admis sur l'Alfa Pendular, voiture ou Renfe / Renfe-CP via Vigo." },
      { from: 'Porto', to: 'Madrid', duration: '~10h de nuit ou avion 1h30', service: 'Trenhotel Lusitania (de nuit) ou vol Iberia', petRule: 'Le Trenhotel accepte les chiens en cabine privée. Vol Iberia : chiens <8 kg en cabine (60 €), plus grands en soute (150 €).' },
      { from: 'Madrid', to: 'Barcelone', duration: '~2h30', service: 'AVE Renfe (direct, toutes les 30 min)', petRule: 'Petits chiens (max 10 kg) gratuits. Renfe Mascotas Grandes (pilote) accepte les chiens jusqu\'à 40 kg avec réservation (15 € / chien). Emportez une muselière souple.' },
    ],
    practicalTitle: 'Avant de partir : paperasse, vaccins, contacts vétérinaires',
    practicalBullets: [
      "Passeport européen pour animal avec vaccination antirabique valide (21+ jours).",
      'Puce électronique ISO 11784/11785, obligatoire.',
      "L'Espagne a des lois spécifiques aux races (Ley 50/1999) : Pit Bull, Rottweiler, Am. Staff, Bullterrier, Tosa, Dogue argentin, Fila brasileiro, Akita Inu, Dobermann sont PPP. Permis requis, laisse + muselière en public, assurance civile.",
      "La chaleur est le risque n°1 : asphalte à 50 °C à Madrid en juillet, promener 7h-9h ou après 21h, gamelle d'eau pliable, jamais laisser le chien en voiture.",
      "Vétérinaires d'urgence 24h/24 : Lisbonne (Hospital Veterinário Restelo, +351 21 303 80 00), Porto (Hospital Veterinário Montenegro, +351 22 900 26 30), Madrid (Hospital Veterinario VETSIA, +34 91 632 95 76), Barcelone (Hospital Ars Veterinaria, +34 93 200 10 00).",
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Pourquoi pas de train direct Porto → Madrid ?', a: "L'Ibérie n'a historiquement pas eu de liaison à grande vitesse. Le Trenhotel de nuit est la seule option ferroviaire directe (10h). La plupart des voyageurs prennent l'avion (Iberia 1h30, chien accepté) ou un long bus. Un AVE Porto-Madrid est prévu mais pas encore construit." },
      { q: 'La chaleur espagnole est-elle trop pour un chien ?', a: 'En juillet-août, oui, Madrid atteint 40 °C, Barcelone 32 °C avec humidité. Promenades 7h-9h et après le coucher du soleil. Hôtels climatisés essentiels. Évitez ces mois pour les races à museau court.' },
      { q: 'Les restaurants espagnols sont-ils vraiment dog-friendly ?', a: "La loi espagnole laisse chaque établissement décider, mais Madrid et Barcelone ont une forte tendance 'perro permitido'. Cherchez l'autocollant patte verte. La plupart des terrasses acceptent sans problème ; demandez avant l'intérieur." },
      { q: 'Puis-je faire ce voyage avec un chien de 25 kg+ ?', a: "Oui, mais logistique plus serrée : Alfa Pendular n'admet pas officiellement les grands chiens (louez une voiture pour Lisbonne-Porto), et le pilote Renfe AVE Mascotas Grandes est la solution Madrid-Barcelone (~15 €/chien). Tous les hôtels du guide acceptent les grands chiens." },
      { q: 'Le métro de Madrid est-il dog-friendly ?', a: 'Oui, toutes tailles admises en laisse + muselière, gratuit, mais uniquement en heures creuses (avant 7h, 10h-12h, 16h-19h, après 21h en semaine ; toute la journée le week-end). Emportez la muselière dans votre sac.' },
    ],
  },
  es: {
    hero: { tagline: 'PENÍNSULA IBÉRICA · 12 DÍAS · CON TU PERRO', title: 'Un viaje ibérico en tren con tu perro', subtitle: 'Lisboa, Oporto, Madrid, Barcelona, la costa atlántica portuguesa y las grandes capitales españolas, conectadas por trenes directos. Hoteles que admiten mascotas, playas caninas y mapas Booking.com en vivo para cada parada.' },
    why: { title: 'Por qué este itinerario ibérico funciona con perro', bullets: [
      'Portugal y España son de los países más tolerantes con mascotas de Europa, la mayoría de cafés, restaurantes y tiendas admiten perros con correa sin objeción.',
      'Trenes directos Alfa Pendular (Lisboa ↔ Oporto) y AVE (Madrid ↔ Barcelona) admiten perros, con opción overnight para el tramo Oporto–Madrid.',
      'Las cuatro ciudades tienen playas caninas oficiales todo el año o zonas sin correa valladas a menos de 30 minutos del centro.',
      'Sin papeleo en las fronteras Schengen, basta un pasaporte europeo con vacunación antirrábica vigente.',
      'El calor es la principal restricción: evita julio-agosto, sobre todo Madrid (40 °C+ habitual). Mayo, principios de junio, finales de septiembre y octubre son ideales.',
    ] },
    stats: { duration: 'Duración', cities: 'Ciudades', transport: 'Transporte', budget: 'Presupuesto', durationVal: '12 días', citiesVal: '4 ciudades', transportVal: 'Tren (Alfa Pendular / Trenhotel / AVE)', budgetVal: '1.000 €–2.000 €' },
    citiesIntro: { kicker: 'CIUDAD POR CIUDAD', title: 'Tus paradas, tus hoteles, tu mapa' },
    cities: {
      lisbon: { days: 'Días 1–3', intro: 'Empieza en Lisboa, una de las ciudades más relajadas de Europa con perros. Los tranvías (el 28 histórico incluido) admiten perros con correa gratis, las orillas del Tajo ofrecen 8 km de paseo peatonal, y la playa canina de Alcântara (Praia do Porto Brandão) está a 15 min en ferri desde el centro. Las callejuelas adoquinadas de Bairro Alto y Alfama son dog-friendly de día; de noche se llenan.', highlight: 'Imprescindible con tu perro: atardecer en el Miradouro da Senhora do Monte', highlightDesc: 'El mirador más alto de la ciudad, menos concurrido que Santa Catarina. El tranvía 28 te deja a 5 min a pie; perros bienvenidos en el bar de la terraza después.' },
      porto: { days: 'Días 4–5', intro: 'Tres horas en Alfa Pendular. Oporto es aún más dog-friendly que Lisboa: la orilla del Duero en la Ribeira admite perros en todas las terrazas, la costa de Foz do Douro tiene playas caninas (Praia do Carneiro, Praia de Lavadores) accesibles en tranvía, y los jardines del Palacio de Cristal admiten perros sin correa a primera hora.', highlight: 'Imprescindible con tu perro: excursión en tren al Valle del Duero', highlightDesc: 'La Linha do Douro de Comboios de Portugal desde Porto-São Bento hasta Régua dura 2h junto al río. Perros con correa gratis en transportín, media tarifa si no. Muchas quintas (bodegas de oporto) admiten perros en sus jardines.' },
      madrid: { days: 'Días 6–9', intro: 'Trenhotel nocturno (8h) o avión con perro (Iberia admite en cabina) para enlazar Oporto-Madrid. Madrid tiene una de las mayores poblaciones caninas de Europa: 350.000 perros registrados, la enorme Casa de Campo (1.700 ha) y el Parque del Retiro (125 ha) ambos pet-friendly, y el Metro de Madrid admite todos los perros con correa + bozal en horas valle.', highlight: 'Imprescindible con tu perro: circuito matinal por la Casa de Campo', highlightDesc: '1.700 hectáreas de pinar a 15 min de Sol en metro. Varias zonas sin correa y un pequeño lago. Los locales empiezan en la entrada del Lago y caminan 6-8 km, tu perro dormirá toda la tarde.' },
      barcelona: { days: 'Días 10–12', intro: 'AVE desde Madrid en 2h30 (el tramo más rápido, billete canino 15 €). Barcelona es dog-friendly junto al mar: la playa de Llevant es la playa canina oficial todo el año (baño sin correa), Montjuïc tiene zonas sin correa, los barrios del Born y Gràcia están llenos de terrazas acogedoras. El metro exige correa + bozal para perros medianos/grandes.', highlight: 'Imprescindible con tu perro: playa canina de Llevant + paseo Bogatell', highlightDesc: 'Única playa canina todo el año de Barcelona (sin correa, ducha de agua dulce, papeleras). Combínalo con los 4 km del paseo de Bogatell para una mañana completa. Parada en La Bombeta para tapas, perros con correa bienvenidos en terraza.' },
    },
    hotelsLabel: 'Hoteles recomendados que admiten mascotas',
    bookLabel: 'Reservar en Booking.com',
    detailsLabel: 'Detalles',
    mapLabel: 'Mapa en vivo, todos los hoteles pet-friendly',
    legsTitle: 'Transporte entre ciudades',
    legs: [
      { from: 'Lisboa', to: 'Oporto', duration: '~3h', service: 'Alfa Pendular (directo, cada 1-2h)', petRule: 'Perros pequeños en transportín (máx 10 kg) gratis. Perros grandes no admitidos oficialmente en Alfa Pendular, coche o Renfe / Renfe-CP vía Vigo.' },
      { from: 'Oporto', to: 'Madrid', duration: '~10h nocturno o vuelo 1h30', service: 'Trenhotel Lusitania (nocturno) o vuelo Iberia', petRule: 'El Trenhotel admite perros en camarote privado. Vuelo Iberia: perros <8 kg en cabina (60 €), más grandes en bodega (150 €).' },
      { from: 'Madrid', to: 'Barcelona', duration: '~2h30', service: 'AVE Renfe (directo, cada 30 min)', petRule: 'Perros pequeños (máx 10 kg) gratis. Renfe Mascotas Grandes (piloto) admite perros hasta 40 kg con reserva (15 € / perro). Lleva un bozal flexible.' },
    ],
    practicalTitle: 'Antes de salir: papeleo, vacunas, contactos veterinarios',
    practicalBullets: [
      'Pasaporte europeo de mascota con vacunación antirrábica vigente (21+ días).',
      'Microchip ISO 11784/11785, obligatorio.',
      'España tiene leyes por raza (Ley 50/1999): Pit Bull, Rottweiler, Am. Staff, Bullterrier, Tosa, Dogo Argentino, Fila Brasileiro, Akita Inu, Dóberman son PPP. Se requiere licencia, correa + bozal en público, seguro civil.',
      'El calor es el riesgo nº1: asfalto a 50 °C en Madrid en julio, paseos 7-9 h y tras puesta de sol, bol de agua plegable, nunca dejar al perro en el coche.',
      'Veterinarios de urgencias 24/7: Lisboa (Hospital Veterinário Restelo, +351 21 303 80 00), Oporto (Hospital Veterinário Montenegro, +351 22 900 26 30), Madrid (Hospital Veterinario VETSIA, +34 91 632 95 76), Barcelona (Hospital Ars Veterinaria, +34 93 200 10 00).',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Por qué no hay tren directo Oporto → Madrid?', a: 'La península ibérica históricamente no ha tenido conexión de alta velocidad. El Trenhotel nocturno es la única opción ferroviaria directa (10h). La mayoría vuela (Iberia 1h30, perro admitido) o coge un bus largo. Un AVE Oporto-Madrid está previsto pero aún no se ha construido.' },
      { q: '¿Es demasiado el calor español para un perro?', a: 'En julio-agosto, sí, Madrid llega a 40 °C, Barcelona 32 °C con humedad. Pasea 7-9 h y tras el atardecer. Hoteles con A/C esenciales. Evita esos meses para razas braquicéfalas.' },
      { q: '¿Son realmente dog-friendly los restaurantes en España?', a: 'La ley española deja a cada establecimiento decidir, pero Madrid y Barcelona tienen una fuerte tendencia "perro permitido". Busca el adhesivo de huella verde. La mayoría de terrazas admite sin problema; pregunta antes de entrar.' },
      { q: '¿Puedo hacer este viaje con un perro de 25 kg+?', a: 'Sí, pero con logística más estrecha: Alfa Pendular no admite oficialmente perros grandes (alquila coche para Lisboa-Oporto), y el piloto Renfe AVE Mascotas Grandes es la solución Madrid-Barcelona (~15 €/perro). Todos los hoteles de la guía admiten perros grandes.' },
      { q: '¿Es dog-friendly el metro de Madrid?', a: 'Sí, todos los tamaños admitidos con correa + bozal, gratis, pero solo en horas valle (antes de las 7 h, 10-12 h, 16-19 h, tras las 21 h entre semana; todo el día los fines de semana). Lleva el bozal en el bolso.' },
    ],
  },
  pt: {
    hero: { tagline: 'PENÍNSULA IBÉRICA · 12 Dias · Com O teu cão', title: 'Um viaje ibérico de comboio com o teu cão', subtitle: 'Lisboa, Porto, Madrid, Barcelona, a costa atlântica portuguesa e as grandes capitales espanholas, conectadas por comboios directos. Hotéis que admitem animais, praias caninas e mapas Booking.com em vivo para cada parada.' },
    why: { title: 'Porquê este itinerário ibérico funciona com cão', bullets: [
      'Portugal e Espanha são dois países mais tolerantes com animais de Europa, a maioria de cafés, restaurantes e lojas admitem cães com trela sem objeción.',
      'Comboios directos Alfa Pendular (Lisboa ↔ Porto) e AVE (Madrid ↔ Barcelona) admitem cães, com opção overnight para o tramo Porto–Madrid.',
      'As cuatro cidades têm praias caninas oficiais o ano inteiro o zonas sem trela vedadas a menos de 30 minutos do centro.',
      'Sem burocracia nas fronteras Schengen, basta um passaporte europeu com vacinação antirrábica vigente.',
      'O calor é a principal restricción: evita julho-agosto, sobretudo Madrid (40 °C+ habitual). Maio, principios de junho, finais de setembro e outubro são ideales.',
    ] },
    stats: { duration: 'Duración', cities: 'Cidades', transport: 'Transporte', budget: 'Presupuesto', durationVal: '12 dias', citiesVal: '4 cidades', transportVal: 'Comboio (Alfa Pendular / Trenhotel / AVE)', budgetVal: '1.000 €–2.000 €' },
    citiesIntro: { kicker: 'Cidade POR Cidade', title: 'Os teus paradas, os teus hotéis, tu mapa' },
    cities: {
      lisbon: { days: 'Dias 1–3', intro: 'Empieza em Lisboa, uma das cidades mais descontraídas de Europa com cães. Os elétricos (o 28 histórico incluido) admitem cães com trela grátis, as margens do Tajo ofrecen 8 km de passeio peatonal, e a praia canina de Alcântara (Praia do Porto Brandão) está a 15 min em ferri desde o centro. As callejuelas adoquinadas de Bairro Alto e Alfama são pet-friendly de dia; de noite se llenan.', highlight: 'Imprescindible com o teu cão: atardecer no Miradouro da Senhora do Monte', highlightDesc: 'O mirador mais alto da cidade, menos concurrido que Santa Catarina. O elétrico 28 te deixa a 5 min a pé; cães bem-vindos no bar da esplanada depois.' },
      porto: { days: 'Dias 4–5', intro: 'Tres horas em Alfa Pendular. Porto é aún mais pet-friendly que Lisboa: a margem do Duero na Ribeira admite cães em todas as esplanadas, a costa de Foz do Douro tem praias caninas (Praia do Carneiro, Praia de Lavadores) acessíveis no elétrico, e os jardins do Palácio de Cristal admitem cães sem trela a primera hora.', highlight: 'Imprescindible com o teu cão: excursión de comboio al Valle do Duero', highlightDesc: 'A Linha do Douro de Comboios de Portugal desde Porto-São Bento até Régua dura 2h junto al rio. Cães com trela grátis em transportadora, meio preço si no. Muitas quintas (bodegas de Porto) admitem cães nos seus jardins.' },
      madrid: { days: 'Dias 6–9', intro: 'Trenhotel nocturno (8h) o avión com cão (Iberia admite em cabina) para ligar Porto-Madrid. Madrid tem uma das mayores poblaciones caninas de Europa: 350.000 cães registrados, a enorme Casa de Campo (1.700 ha) e o Parque do Retiro (125 ha) ambos pet-friendly, e o Metro de Madrid admite todos os cães com trela + bozal em horas valle.', highlight: 'Imprescindible com o teu cão: circuito matinal pela Casa de Campo', highlightDesc: '1.700 hectáreas de pinar a 15 min de Sol no metro. Varias zonas sem trela e um pequeno lago. Os locales empiezan na entrada do Lago e caminan 6-8 km, o teu cão dormirá toda a tarde.' },
      barcelona: { days: 'Dias 10–12', intro: 'AVE desde Madrid em 1h30 (o tramo mais rápido, bilhete canino 15 €). Barcelona é pet-friendly junto al mar: a praia de Llevant é a praia canina oficial o ano inteiro (banho sem trela), Montjuïc tem zonas sem trela, os bairros do Born e Gràcia estão llenos de esplanadas acogedoras. O metro exige trela + bozal para cães medianos/grandes.', highlight: 'Imprescindible com o teu cão: praia canina de Llevant + passeio Bogatell', highlightDesc: 'Única praia canina o ano inteiro de Barcelona (sem trela, ducha de água dulce, papeleras). Combínalo com os 4 km do passeio de Bogatell para uma manhã completa. Parada na Bombeta para tapas, cães com trela bem-vindos em esplanada.' },
    },
    hotelsLabel: 'Hotéis recomendados que admitem animais',
    bookLabel: 'Reservar em Booking.com',
    detailsLabel: 'Detalhes',
    mapLabel: 'Mapa em vivo, todos os hotéis pet-friendly',
    legsTitle: 'Transporte entre cidades',
    legs: [
      { from: 'Lisboa', to: 'Porto', duration: '~3h', service: 'Alfa Pendular (directo, cada 1-2h)', petRule: 'Cães pequenos em transportadora (máx 10 kg) grátis. Cães grandes no admitidos oficialmente em Alfa Pendular, carro o Renfe / Renfe-CP vía Vigo.' },
      { from: 'Porto', to: 'Madrid', duration: '~10h nocturno o voo 1h30', service: 'Trenhotel Lusitania (nocturno) o voo Iberia', petRule: 'O Trenhotel admite cães em camarote privado. Voo Iberia: cães <8 kg em cabina (60 €), mais grandes em bodega (150 €).' },
      { from: 'Madrid', to: 'Barcelona', duration: '~2h30', service: 'AVE Renfe (directo, cada 30 min)', petRule: 'Cães pequenos (máx 10 kg) grátis. Renfe Animais Grandes (piloto) admite cães até 40 kg com reserva (15 € / cão). Leva um bozal flexible.' },
    ],
    practicalTitle: 'Antes de salir: burocracia, vacunas, contactos veterinários',
    practicalBullets: [
      'Passaporte europeu de animal com vacinação antirrábica vigente (21+ dias).',
      'Microchip ISO 11784/11785, obrigatório.',
      'Espanha tem leis por raza (Lei 50/1999): Pit Bull, Rottweiler, Am. Staff, Bullterrier, Tosa, Dogo Argentino, Fila Brasileiro, Akita Inu, Dóberman são PPP. Se exige licencia, trela + bozal em público, seguro civil.',
      'O calor é o riesgo nº1: asfalto a 50 °C em Madrid em julho, passeios 7-9 h e tras puesta de sol, bol de água plegable, nunca deixar al cão no carro.',
      'Veterinários de urgências 24/7: Lisboa (Hospital Veterinário Restelo, +351 21 303 80 00), Porto (Hospital Veterinário Montenegro, +351 22 900 26 30), Madrid (Hospital Veterinário VETSIA, +34 91 632 95 76), Barcelona (Hospital Ars Veterinária, +34 93 200 10 00).',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: 'Porquê no hay comboio directo Porto → Madrid?', a: 'A península ibérica históricamente no tem tenido conexión de alta velocidad. O Trenhotel nocturno é a única opção ferroviaria directa (10h). A mayoría vuela (Iberia 1h30, cão admitido) o coge um bus longo. Um AVE Porto-Madrid está previsto mas aún no se tem construido.' },
      { q: 'É demasiado o calor espanhol para um cão?', a: 'Em julho-agosto, sí, Madrid chega a 40 °C, Barcelona 32 °C com humedad. Pasea 7-9 h e tras o atardecer. Hotéis com A/C esenciales. Evita esos meses para razas braquicéfalas.' },
      { q: 'São realmente pet-friendly os restaurantes em Espanha?', a: 'A lei espanhola deixa a cada establecimiento decidir, mas Madrid e Barcelona têm uma forte tendencia "cão permitido". Busca o adhesivo de huella verde. A maioria de esplanadas admite sem problema; pregunta antes de entrar.' },
      { q: 'Puedo hacer este viaje com um cão de 25 kg+?', a: 'Sí, mas com logística mais estreita: Alfa Pendular no admite oficialmente cães grandes (alquila carro para Lisboa-Porto), e o piloto Renfe AVE Animais Grandes é a solución Madrid-Barcelona (~15 €/cão). Todos os hotéis da guía admitem cães grandes.' },
      { q: 'É pet-friendly o metro de Madrid?', a: 'Sí, todos os tamanhos admitidos com trela + bozal, grátis, mas só em horas valle (antes das 7 h, 10-12 h, 16-19 h, tras as 21 h entre semana; todo o dia os fines de semana). Leva o bozal no bolso.' },
    ],
  },
}

function buildSticky(locale: string): StickyConfig {
  const address = encodeURIComponent('Lisbon Porto Madrid Barcelona')
  const href = `https://www.stay22.com/allez/roam?aid=${STAY22_AID}&campaign=iberique-sticky&address=${address}`
  const labels: Record<string, string> = {
    en: 'Pet-friendly hotels Iberian route',
    fr: `Hôtels pet-friendly route ibérique`,
    es: 'Hoteles pet-friendly ruta ibérica',
    pt: `Hotéis pet-friendly rota ibérica`,
  }
  const ctas: Record<string, string> = { en: 'View', fr: 'Voir', es: 'Ver', pt: 'Ver' }
  return { href, label: labels[locale] ?? labels.en, cta: ctas[locale] ?? ctas.en }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  return <CityTripGuide slug={SLUG} routeSlugs={ROUTE_SLUGS} locale={locale} copy={COPY[locale] ?? COPY.en} sticky={buildSticky(locale)} />
}
