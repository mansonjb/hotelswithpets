import type { Metadata } from 'next'
import Link from 'next/link'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'
import StickyHotelCTA from '@/components/StickyHotelCTA'

const SLUG = 'gps-tracker-dog-tractive-vs-weenect-vs-airtag'
const PUBLISHED = '2026-11-18T00:00:00Z'

const STICKY_LABELS: Record<string, { label: string; cta: string }> = {
  en: { label: 'Pet-friendly hotels across Europe', cta: 'See hotels' },
  fr: { label: 'Hôtels pet-friendly en Europe', cta: 'Voir les hôtels' },
  es: { label: 'Hoteles pet-friendly en Europa', cta: 'Ver hoteles' },
  pt: { label: 'Hotéis pet-friendly na Europa', cta: 'Ver hotéis' },
  de: { label: 'Haustierfreundliche Hotels in Europa', cta: 'Hotels ansehen' },
  nl: { label: 'Huisdiervriendelijke hotels in Europa', cta: 'Bekijk hotels' },
  it: { label: 'Hotel pet-friendly in Europa', cta: 'Vedi gli hotel' },
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const META_TITLES: Record<string, string> = {
  en: 'Dog GPS Tracker: Tractive vs Weenect vs Apple AirTag (2026 comparison)',
  fr: 'Traceur GPS chien : Tractive vs Weenect vs Apple AirTag (comparatif 2026)',
  es: 'Localizador GPS para perros: Tractive vs Weenect vs Apple AirTag (comparativa 2026)',
  pt: 'Localizador GPS para cães: Tractive vs Weenect vs Apple AirTag (comparação 2026)',
  de: 'GPS-Tracker für Hunde: Tractive vs Weenect vs Apple AirTag (Vergleich 2026)',
  nl: 'GPS-tracker voor honden: Tractive vs Weenect vs Apple AirTag (vergelijking 2026)',
  it: 'Localizzatore GPS per cani: Tractive vs Weenect vs Apple AirTag (confronto 2026)',
}

const META_DESCRIPTIONS: Record<string, string> = {
  en: 'Which tracker actually finds a dog that bolts abroad? Tractive and Weenect use real-time cellular GPS with a subscription; the AirTag has no GPS and only works as a backup. Full 2026 comparison of price, battery, range and live tracking.',
  fr: 'Quel traceur retrouve vraiment un chien qui s\'échappe à l\'étranger ? Tractive et Weenect utilisent un GPS cellulaire en temps réel avec abonnement ; l\'AirTag n\'a pas de GPS et ne sert que de secours. Comparatif 2026 complet : prix, batterie, portée et suivi en direct.',
  es: '¿Qué localizador encuentra de verdad a un perro que se escapa en el extranjero? Tractive y Weenect usan GPS celular en tiempo real con suscripción; el AirTag no tiene GPS y solo sirve de respaldo. Comparativa 2026 completa: precio, batería, alcance y seguimiento en directo.',
  pt: 'Que localizador encontra mesmo um cão que foge no estrangeiro? A Tractive e a Weenect usam GPS celular em tempo real com subscrição; o AirTag não tem GPS e só serve de reserva. Comparação 2026 completa: preço, bateria, alcance e seguimento em direto.',
  de: 'Welcher Tracker findet wirklich einen Hund, der im Ausland wegläuft? Tractive und Weenect nutzen Echtzeit-GPS über Mobilfunk mit Abo; der AirTag hat kein GPS und taugt nur als Reserve. Kompletter Vergleich 2026: Preis, Akku, Reichweite und Live-Ortung.',
  nl: 'Welke tracker vindt echt een hond die in het buitenland wegloopt? Tractive en Weenect gebruiken realtime gsm-GPS met abonnement; de AirTag heeft geen GPS en dient alleen als reserve. Volledige vergelijking 2026: prijs, batterij, bereik en live volgen.',
  it: 'Quale localizzatore ritrova davvero un cane che scappa all\'estero? Tractive e Weenect usano GPS cellulare in tempo reale con abbonamento; l\'AirTag non ha GPS e serve solo come riserva. Confronto 2026 completo: prezzo, batteria, portata e tracciamento live.',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const today = new Date().toISOString().split('T')[0]
  return {
    title: META_TITLES[locale] ?? META_TITLES.en,
    description: META_DESCRIPTIONS[locale] ?? META_DESCRIPTIONS.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/${SLUG}`,
      languages: {
        en: `${SITE_URL}/en/guides/${SLUG}`,
        fr: `${SITE_URL}/fr/guides/${SLUG}`,
        es: `${SITE_URL}/es/guides/${SLUG}`,
        pt: `${SITE_URL}/pt/guides/${SLUG}`,
        de: `${SITE_URL}/de/guides/${SLUG}`,
        nl: `${SITE_URL}/nl/guides/${SLUG}`,
        it: `${SITE_URL}/it/guides/${SLUG}`,
        'x-default': `${SITE_URL}/en/guides/${SLUG}`,
      },
    },
    openGraph: {
      title: META_TITLES[locale] ?? META_TITLES.en,
      description: META_DESCRIPTIONS[locale] ?? META_DESCRIPTIONS.en,
      type: 'article',
      publishedTime: PUBLISHED,
      modifiedTime: `${today}T00:00:00Z`,
    },
  }
}

interface Product {
  name: string
  tagline: string
  href: string
  hrefLabel: string
  pros: string[]
  cons: string[]
}

interface Copy {
  hero: { kicker: string; h1: string; tldr: string }
  verdict: { title: string; body: string }
  table: { caption: string; head: string[]; rows: string[][] }
  productsTitle: string
  products: Product[]
  profilesTitle: string
  profiles: Array<{ who: string; pick: string; why: string }>
  disclosure: string
  faqTitle: string
  faqs: Array<{ q: string; a: string }>
  ctaTitle: string
  ctaDesc: string
  ctaButton: string
  ctaHref: string
}

const EN: Copy = {
  hero: {
    kicker: 'PET TRAVEL GEAR · UPDATED 2026',
    h1: 'Dog GPS tracker for travel: Tractive vs Weenect vs Apple AirTag',
    tldr: 'Bottom line: if your worry is a dog that could bolt in an unfamiliar place, you need a real-time cellular GPS tracker (Tractive or Weenect), both of which require a paid subscription. An Apple AirTag has no GPS at all, it only reports a last-seen position when another Apple device passes near it, so it is a backup tag, not a travel tracker. Below we compare price, battery, range, live tracking and water resistance so you can pick the right one before you leave.',
  },
  verdict: {
    title: 'The 30-second answer',
    body: 'For travel, choose Tractive or Weenect: both are LTE trackers that show your dog moving on a live map anywhere there is mobile coverage, with Europe-wide roaming included and no distance limit. The trade-off is a subscription (roughly 4 to 13 euros a month depending on the plan length) and a battery you recharge every few days. The AirTag is cheaper and its battery lasts about a year, but it cannot tell you where your dog is in real time and goes blind in quiet, rural or foreign areas where few iPhones pass by. Keep an AirTag only as a second, redundant tag on the collar, never as your main safety net abroad.',
  },
  table: {
    caption: 'Dog GPS tracker comparison (2026)',
    head: ['Feature', 'Tractive', 'Weenect', 'Apple AirTag'],
    rows: [
      ['Positioning', 'Real-time GPS + LTE', 'Real-time GPS + LTE', 'No GPS (Bluetooth + Find My network)'],
      ['Live tracking', 'Yes, updates every few seconds in Live Mode', 'Yes, position roughly every second in the app', 'No, last-seen location only'],
      ['Range', 'Unlimited where there is mobile coverage', 'Unlimited where there is mobile coverage', 'Only when an Apple device is nearby'],
      ['Subscription', 'Required (about 5 to 10 euros per month)', 'Required (from about 4 euros per month)', 'None'],
      ['Device price', 'Around 50 to 70 euros', 'Around 45 to 70 euros', 'Around 35 euros'],
      ['Battery', 'Up to about 2 weeks, 1 to 2 days in Live Mode', 'About 3 days continuous, up to 10 days in saving mode', 'About 1 year (coin cell)'],
      ['Water resistance', 'Waterproof (swim-rated)', 'Waterproof (IP67)', 'Splash and dust resistant (IP67)'],
      ['Europe coverage', 'Yes, roaming included', 'Yes, roaming included', 'Works anywhere Apple devices are, weak in rural areas'],
      ['Best for', 'Escape-prone dogs, hikes, long trips', 'The same, with a French and EU support base', 'A cheap backup tag, on-leash city dogs'],
    ],
  },
  productsTitle: 'The three options in detail',
  products: [
    {
      name: 'Tractive',
      tagline: 'The market-leading real-time GPS tracker',
      href: 'https://tractive.com/en',
      hrefLabel: 'tractive.com',
      pros: [
        'True live tracking with no distance limit anywhere there is mobile signal',
        'Europe-wide roaming built in, so it keeps working across borders',
        'Virtual fence alerts when your dog leaves a set area',
        'Activity and sleep tracking, plus optional health vitals on newer models',
      ],
      cons: [
        'A subscription is mandatory, the device alone does nothing',
        'Battery drops to a day or two when Live Mode runs constantly',
      ],
    },
    {
      name: 'Weenect',
      tagline: 'The French challenger, strong in the EU',
      href: 'https://www.weenect.com/en/gps-dog-tracker/',
      hrefLabel: 'weenect.com',
      pros: [
        'Real-time position refreshed about once a second in the app',
        'Among the smallest and lightest trackers, good for medium and small dogs',
        'French company with EU-based support and SIM, clear euro pricing',
        'Cheaper entry device and a low monthly rate on long plans',
      ],
      cons: [
        'A subscription is mandatory, like all cellular trackers',
        'Battery life in continuous mode is shorter than Tractive, around 3 days',
      ],
    },
    {
      name: 'Apple AirTag',
      tagline: 'A Bluetooth tag, not a tracker',
      href: 'https://www.apple.com/airtag/',
      hrefLabel: 'apple.com',
      pros: [
        'No subscription and a coin-cell battery that lasts about a year',
        'Very cheap and tiny, useful as a redundant backup on the collar',
        'Works well enough to locate an on-leash dog in a busy city',
      ],
      cons: [
        'No GPS, it cannot report its own position, it waits for a passing iPhone',
        'No live tracking, you see only the last place it was detected',
        'Goes silent in rural, quiet or low-iPhone areas, exactly where dogs get lost',
        'Apple markets it for objects, not pets',
      ],
    },
  ],
  profilesTitle: 'Which one should you pick?',
  profiles: [
    { who: 'You travel with a dog that might run off', pick: 'Tractive or Weenect', why: 'Only a real-time cellular tracker lets you follow a bolting dog on a live map and reach it before it goes too far.' },
    { who: 'You want a French or EU brand and support', pick: 'Weenect', why: 'A French company with EU support, EU SIM and transparent euro pricing, and a smaller device for little dogs.' },
    { who: 'You want the longest battery and most features', pick: 'Tractive', why: 'Longer battery in standard mode, built-in roaming and activity or health tracking on recent models.' },
    { who: 'You just want a cheap backup and never lose the collar', pick: 'Apple AirTag', why: 'Fine as a second tag for an on-leash city dog, but never rely on it as your only safety net abroad.' },
  ],
  disclosure: 'We link to each maker\'s official product page. We are not paid to rank one above another, and prices and specifications change often, so always confirm the current figures on the maker\'s own site before buying.',
  faqTitle: 'Frequently asked questions',
  faqs: [
    { q: 'Can I really track my dog with an Apple AirTag?', a: 'Only loosely. An AirTag has no GPS and cannot work out its own location. It waits for a nearby Apple device to detect its Bluetooth signal and report an approximate position to the Find My network. In a busy city with an on-leash dog that can be enough to find a dropped collar, but if your dog bolts into countryside or a quiet foreign town where few iPhones pass, you may get no location at all. For travel safety, use a real GPS tracker and keep the AirTag only as a backup.' },
    { q: 'Do Tractive and Weenect work across Europe without extra fees?', a: 'Yes. Both include Europe-wide roaming in the subscription, so the tracker keeps reporting as you cross borders, with no separate SIM or roaming charge to arrange. Always confirm the exact country list on the maker\'s site, but both cover the EU and most neighbouring countries.' },
    { q: 'Why do GPS trackers need a monthly subscription?', a: 'Because they contain a cellular (LTE) SIM that sends your dog\'s live position over the mobile network, which carries an ongoing data cost. The subscription pays for that connectivity and the live app. The AirTag has no subscription precisely because it has no SIM and sends nothing itself, it relies on other people\'s Apple devices.' },
    { q: 'How long does the battery last on a dog GPS tracker?', a: 'It depends heavily on how often it reports. In normal mode Tractive lasts up to about two weeks and Weenect around a week with power-saving zones, but constant Live Mode drains either to one to three days. Plan to recharge every few days on a long trip, and pack the charging cable. The AirTag battery lasts about a year because it does so little.' },
    { q: 'Is a GPS tracker waterproof enough for a dog that swims?', a: 'The cellular trackers are built for it: Tractive is swim-rated and Weenect is IP67 rated, so a dog that wades or swims is fine. The AirTag is IP67 splash and dust resistant, enough for rain but not meant for a swimming dog, and it is not a tracker anyway.' },
    { q: 'Does a GPS tracker replace a microchip?', a: 'No. A microchip is a permanent legal identity that a vet or shelter scans if your dog is handed in, and it is required to travel in Europe. A GPS tracker is a live-location device you use to find a dog yourself in the moment. They do different jobs, so keep both: the chip for identification, the tracker for recovery.' },
  ],
  ctaTitle: 'Planning a trip with your dog?',
  ctaDesc: 'Browse our pet-friendly destinations across Europe. Each guide includes country entry rules, emergency vet details and a live map of pet-friendly hotels.',
  ctaButton: 'See pet-friendly destinations',
  ctaHref: '/en/destinations',
}

const FR: Copy = {
  hero: {
    kicker: 'ÉQUIPEMENT VOYAGE ANIMAL · MIS À JOUR 2026',
    h1: 'Traceur GPS pour chien en voyage : Tractive vs Weenect vs Apple AirTag',
    tldr: 'En résumé : si votre crainte est un chien qui s\'échappe dans un endroit inconnu, il vous faut un traceur GPS cellulaire en temps réel (Tractive ou Weenect), qui fonctionnent tous deux avec un abonnement payant. Un Apple AirTag n\'a aucun GPS, il signale seulement une dernière position connue quand un autre appareil Apple passe à proximité : c\'est une balise de secours, pas un traceur de voyage. Ci-dessous, nous comparons prix, batterie, portée, suivi en direct et étanchéité pour choisir le bon avant de partir.',
  },
  verdict: {
    title: 'La réponse en 30 secondes',
    body: 'Pour voyager, choisissez Tractive ou Weenect : ce sont des traceurs 4G qui affichent votre chien se déplaçant sur une carte en direct partout où il y a du réseau mobile, avec itinérance incluse dans toute l\'Europe et sans limite de distance. La contrepartie : un abonnement (environ 4 à 13 euros par mois selon la durée du plan) et une batterie à recharger tous les quelques jours. L\'AirTag est moins cher et sa pile dure environ un an, mais il ne peut pas vous dire où est votre chien en temps réel et devient aveugle dans les zones calmes, rurales ou étrangères où peu d\'iPhone passent. Gardez un AirTag uniquement comme seconde balise redondante sur le collier, jamais comme filet de sécurité principal à l\'étranger.',
  },
  table: {
    caption: 'Comparatif traceurs GPS pour chien (2026)',
    head: ['Caractéristique', 'Tractive', 'Weenect', 'Apple AirTag'],
    rows: [
      ['Localisation', 'GPS temps réel + 4G', 'GPS temps réel + 4G', 'Pas de GPS (Bluetooth + réseau Localiser)'],
      ['Suivi en direct', 'Oui, mise à jour toutes les quelques secondes en mode Live', 'Oui, position environ chaque seconde dans l\'app', 'Non, dernière position connue seulement'],
      ['Portée', 'Illimitée là où il y a du réseau mobile', 'Illimitée là où il y a du réseau mobile', 'Seulement si un appareil Apple est à proximité'],
      ['Abonnement', 'Obligatoire (environ 5 à 10 euros par mois)', 'Obligatoire (à partir d\'environ 4 euros par mois)', 'Aucun'],
      ['Prix de l\'appareil', 'Environ 50 à 70 euros', 'Environ 45 à 70 euros', 'Environ 35 euros'],
      ['Batterie', 'Jusqu\'à environ 2 semaines, 1 à 2 jours en mode Live', 'Environ 3 jours en continu, jusqu\'à 10 jours en mode économie', 'Environ 1 an (pile bouton)'],
      ['Étanchéité', 'Étanche (baignade possible)', 'Étanche (IP67)', 'Résistant aux éclaboussures et poussière (IP67)'],
      ['Couverture Europe', 'Oui, itinérance incluse', 'Oui, itinérance incluse', 'Partout où il y a des appareils Apple, faible en zone rurale'],
      ['Idéal pour', 'Chiens fugueurs, randonnées, longs voyages', 'Idem, avec un support français et européen', 'Une balise de secours bon marché, chien tenu en laisse en ville'],
    ],
  },
  productsTitle: 'Les trois options en détail',
  products: [
    {
      name: 'Tractive',
      tagline: 'Le traceur GPS temps réel leader du marché',
      href: 'https://tractive.com/fr',
      hrefLabel: 'tractive.com',
      pros: [
        'Vrai suivi en direct sans limite de distance partout où il y a du réseau',
        'Itinérance européenne intégrée, il continue de fonctionner au passage des frontières',
        'Alertes de clôture virtuelle quand le chien quitte une zone définie',
        'Suivi d\'activité et de sommeil, plus constantes de santé en option sur les modèles récents',
      ],
      cons: [
        'Un abonnement est obligatoire, l\'appareil seul ne fait rien',
        'La batterie tombe à un ou deux jours quand le mode Live tourne en continu',
      ],
    },
    {
      name: 'Weenect',
      tagline: 'Le challenger français, solide en Europe',
      href: 'https://www.weenect.com/fr/',
      hrefLabel: 'weenect.com',
      pros: [
        'Position en temps réel rafraîchie environ une fois par seconde dans l\'app',
        'Parmi les traceurs les plus petits et légers, adapté aux chiens moyens et petits',
        'Entreprise française, support et SIM européens, tarifs clairs en euros',
        'Appareil d\'entrée moins cher et tarif mensuel bas sur les plans longs',
      ],
      cons: [
        'Un abonnement est obligatoire, comme tous les traceurs cellulaires',
        'Autonomie en continu plus courte que Tractive, environ 3 jours',
      ],
    },
    {
      name: 'Apple AirTag',
      tagline: 'Une balise Bluetooth, pas un traceur',
      href: 'https://www.apple.com/fr/airtag/',
      hrefLabel: 'apple.com',
      pros: [
        'Pas d\'abonnement et une pile bouton qui dure environ un an',
        'Très bon marché et minuscule, utile comme secours redondant sur le collier',
        'Suffisant pour localiser un chien tenu en laisse dans une ville animée',
      ],
      cons: [
        'Pas de GPS, il ne peut pas signaler sa propre position, il attend un iPhone de passage',
        'Pas de suivi en direct, vous ne voyez que le dernier endroit détecté',
        'Devient muet en zone rurale, calme ou peu équipée en iPhone, précisément là où les chiens se perdent',
        'Apple le destine aux objets, pas aux animaux',
      ],
    },
  ],
  profilesTitle: 'Lequel choisir ?',
  profiles: [
    { who: 'Vous voyagez avec un chien qui pourrait fuguer', pick: 'Tractive ou Weenect', why: 'Seul un traceur cellulaire en temps réel permet de suivre un chien en fuite sur une carte en direct et de le rejoindre avant qu\'il aille trop loin.' },
    { who: 'Vous voulez une marque et un support français ou européen', pick: 'Weenect', why: 'Entreprise française avec support et SIM européens, tarifs transparents en euros, et un appareil plus petit pour les petits chiens.' },
    { who: 'Vous voulez la meilleure autonomie et le plus de fonctions', pick: 'Tractive', why: 'Autonomie plus longue en mode standard, itinérance intégrée et suivi d\'activité ou de santé sur les modèles récents.' },
    { who: 'Vous voulez juste un secours pas cher et ne perdez jamais le collier', pick: 'Apple AirTag', why: 'Correct comme seconde balise pour un chien tenu en laisse en ville, mais jamais comme unique filet de sécurité à l\'étranger.' },
  ],
  disclosure: 'Nous renvoyons vers la page produit officielle de chaque fabricant. Nous ne sommes pas payés pour en classer un devant un autre, et les prix et caractéristiques changent souvent : vérifiez toujours les chiffres actuels sur le site du fabricant avant d\'acheter.',
  faqTitle: 'Questions fréquentes',
  faqs: [
    { q: 'Puis-je vraiment suivre mon chien avec un Apple AirTag ?', a: 'Seulement de façon approximative. Un AirTag n\'a pas de GPS et ne peut pas déterminer sa propre position. Il attend qu\'un appareil Apple proche détecte son signal Bluetooth et remonte une position approximative au réseau Localiser. Dans une ville animée avec un chien tenu en laisse, cela peut suffire à retrouver un collier tombé, mais si votre chien file dans la campagne ou une ville étrangère calme où peu d\'iPhone passent, vous pouvez n\'obtenir aucune position. Pour la sécurité en voyage, utilisez un vrai traceur GPS et gardez l\'AirTag seulement en secours.' },
    { q: 'Tractive et Weenect fonctionnent-ils partout en Europe sans frais en plus ?', a: 'Oui. Tous deux incluent l\'itinérance européenne dans l\'abonnement : le traceur continue de remonter la position au passage des frontières, sans SIM ni forfait d\'itinérance à gérer séparément. Vérifiez la liste exacte des pays sur le site du fabricant, mais les deux couvrent l\'UE et la plupart des pays voisins.' },
    { q: 'Pourquoi les traceurs GPS exigent-ils un abonnement mensuel ?', a: 'Parce qu\'ils contiennent une SIM cellulaire (4G) qui envoie la position en direct de votre chien sur le réseau mobile, ce qui a un coût de données permanent. L\'abonnement paie cette connectivité et l\'application de suivi. L\'AirTag n\'a pas d\'abonnement précisément parce qu\'il n\'a pas de SIM et n\'envoie rien lui-même, il dépend des appareils Apple des autres.' },
    { q: 'Combien de temps dure la batterie d\'un traceur GPS chien ?', a: 'Cela dépend beaucoup de la fréquence des remontées. En mode normal, Tractive tient jusqu\'à environ deux semaines et Weenect environ une semaine avec les zones d\'économie d\'énergie, mais le mode Live constant fait tomber l\'un comme l\'autre à un à trois jours. Prévoyez de recharger tous les quelques jours sur un long voyage, et emportez le câble. La pile de l\'AirTag dure environ un an car il fait très peu de choses.' },
    { q: 'Un traceur GPS est-il assez étanche pour un chien qui nage ?', a: 'Les traceurs cellulaires sont conçus pour ça : Tractive supporte la baignade et Weenect est certifié IP67, donc un chien qui patauge ou nage ne pose pas de problème. L\'AirTag est IP67 (éclaboussures et poussière), suffisant pour la pluie mais pas pour un chien qui nage, et ce n\'est de toute façon pas un traceur.' },
    { q: 'Un traceur GPS remplace-t-il la puce électronique ?', a: 'Non. La puce est une identité légale permanente qu\'un vétérinaire ou un refuge scanne si votre chien est rapporté, et elle est obligatoire pour voyager en Europe. Un traceur GPS est un appareil de localisation en direct que vous utilisez pour retrouver vous-même un chien sur le moment. Ils font deux métiers différents : gardez les deux, la puce pour l\'identification, le traceur pour la récupération.' },
  ],
  ctaTitle: 'Vous planifiez un voyage avec votre chien ?',
  ctaDesc: 'Parcourez nos destinations pet-friendly à travers l\'Europe. Chaque guide inclut les règles d\'entrée par pays, les coordonnées de vétérinaires d\'urgence et une carte en direct des hôtels pet-friendly.',
  ctaButton: 'Voir les destinations pet-friendly',
  ctaHref: '/fr/destinations',
}

const ES: Copy = {
  hero: {
    kicker: 'EQUIPAMIENTO VIAJE CON MASCOTAS · ACTUALIZADO 2026',
    h1: 'Localizador GPS para perros en viaje: Tractive vs Weenect vs Apple AirTag',
    tldr: 'En resumen: si tu miedo es un perro que pueda escaparse en un lugar desconocido, necesitas un localizador GPS celular en tiempo real (Tractive o Weenect), que funcionan ambos con una suscripción de pago. Un Apple AirTag no tiene GPS, solo indica una última posición conocida cuando otro dispositivo Apple pasa cerca: es una baliza de respaldo, no un localizador de viaje. A continuación comparamos precio, batería, alcance, seguimiento en directo y resistencia al agua para elegir el adecuado antes de salir.',
  },
  verdict: {
    title: 'La respuesta en 30 segundos',
    body: 'Para viajar, elige Tractive o Weenect: son localizadores 4G que muestran a tu perro moviéndose en un mapa en directo allá donde haya cobertura móvil, con itinerancia incluida en toda Europa y sin límite de distancia. La contrapartida: una suscripción (entre 4 y 13 euros al mes según la duración del plan) y una batería que recargas cada pocos días. El AirTag es más barato y su pila dura alrededor de un año, pero no puede decirte dónde está tu perro en tiempo real y se queda ciego en zonas tranquilas, rurales o extranjeras por donde pasan pocos iPhone. Guarda un AirTag solo como segunda baliza redundante en el collar, nunca como tu red de seguridad principal en el extranjero.',
  },
  table: {
    caption: 'Comparativa de localizadores GPS para perros (2026)',
    head: ['Característica', 'Tractive', 'Weenect', 'Apple AirTag'],
    rows: [
      ['Localización', 'GPS en tiempo real + 4G', 'GPS en tiempo real + 4G', 'Sin GPS (Bluetooth + red Buscar)'],
      ['Seguimiento en directo', 'Sí, se actualiza cada pocos segundos en modo Live', 'Sí, posición cada segundo aproximadamente en la app', 'No, solo última posición conocida'],
      ['Alcance', 'Ilimitado donde hay cobertura móvil', 'Ilimitado donde hay cobertura móvil', 'Solo si hay un dispositivo Apple cerca'],
      ['Suscripción', 'Obligatoria (entre 5 y 10 euros al mes)', 'Obligatoria (desde unos 4 euros al mes)', 'Ninguna'],
      ['Precio del dispositivo', 'Entre 50 y 70 euros', 'Entre 45 y 70 euros', 'Unos 35 euros'],
      ['Batería', 'Hasta unas 2 semanas, 1 a 2 días en modo Live', 'Unos 3 días continuos, hasta 10 días en modo ahorro', 'Alrededor de 1 año (pila de botón)'],
      ['Resistencia al agua', 'Sumergible (apto para baño)', 'Sumergible (IP67)', 'Resistente a salpicaduras y polvo (IP67)'],
      ['Cobertura en Europa', 'Sí, itinerancia incluida', 'Sí, itinerancia incluida', 'Donde haya dispositivos Apple, débil en zona rural'],
      ['Ideal para', 'Perros huidizos, rutas de senderismo, viajes largos', 'Lo mismo, con soporte francés y europeo', 'Una baliza de respaldo barata, perro con correa en ciudad'],
    ],
  },
  productsTitle: 'Las tres opciones en detalle',
  products: [
    {
      name: 'Tractive',
      tagline: 'El localizador GPS en tiempo real líder del mercado',
      href: 'https://tractive.com/es',
      hrefLabel: 'tractive.com',
      pros: [
        'Seguimiento en directo real sin límite de distancia donde haya señal',
        'Itinerancia europea integrada, sigue funcionando al cruzar fronteras',
        'Alertas de valla virtual cuando el perro sale de una zona definida',
        'Seguimiento de actividad y sueño, más constantes de salud opcionales en modelos recientes',
      ],
      cons: [
        'La suscripción es obligatoria, el dispositivo solo no hace nada',
        'La batería baja a uno o dos días cuando el modo Live funciona sin parar',
      ],
    },
    {
      name: 'Weenect',
      tagline: 'El aspirante francés, fuerte en Europa',
      href: 'https://www.weenect.com/es/',
      hrefLabel: 'weenect.com',
      pros: [
        'Posición en tiempo real refrescada aproximadamente una vez por segundo en la app',
        'De los localizadores más pequeños y ligeros, bueno para perros medianos y pequeños',
        'Empresa francesa con soporte y SIM europeos, precios claros en euros',
        'Dispositivo de entrada más barato y tarifa mensual baja en planes largos',
      ],
      cons: [
        'La suscripción es obligatoria, como en todos los localizadores celulares',
        'Autonomía continua más corta que Tractive, unos 3 días',
      ],
    },
    {
      name: 'Apple AirTag',
      tagline: 'Una baliza Bluetooth, no un localizador',
      href: 'https://www.apple.com/es/airtag/',
      hrefLabel: 'apple.com',
      pros: [
        'Sin suscripción y una pila de botón que dura alrededor de un año',
        'Muy barato y diminuto, útil como respaldo redundante en el collar',
        'Suficiente para localizar a un perro con correa en una ciudad concurrida',
      ],
      cons: [
        'Sin GPS, no puede indicar su propia posición, espera a que pase un iPhone',
        'Sin seguimiento en directo, solo ves el último lugar detectado',
        'Se queda mudo en zonas rurales, tranquilas o con pocos iPhone, justo donde se pierden los perros',
        'Apple lo destina a objetos, no a mascotas',
      ],
    },
  ],
  profilesTitle: '¿Cuál deberías elegir?',
  profiles: [
    { who: 'Viajas con un perro que podría escaparse', pick: 'Tractive o Weenect', why: 'Solo un localizador celular en tiempo real permite seguir a un perro huido en un mapa en directo y alcanzarlo antes de que se aleje demasiado.' },
    { who: 'Quieres una marca y soporte franceses o europeos', pick: 'Weenect', why: 'Empresa francesa con soporte y SIM europeos, precios transparentes en euros, y un dispositivo más pequeño para perros pequeños.' },
    { who: 'Quieres la mejor autonomía y más funciones', pick: 'Tractive', why: 'Mayor autonomía en modo estándar, itinerancia integrada y seguimiento de actividad o salud en modelos recientes.' },
    { who: 'Solo quieres un respaldo barato y nunca pierdes el collar', pick: 'Apple AirTag', why: 'Vale como segunda baliza para un perro con correa en ciudad, pero nunca como única red de seguridad en el extranjero.' },
  ],
  disclosure: 'Enlazamos a la página de producto oficial de cada fabricante. No nos pagan por clasificar uno por encima de otro, y los precios y características cambian a menudo: confirma siempre las cifras actuales en la web del fabricante antes de comprar.',
  faqTitle: 'Preguntas frecuentes',
  faqs: [
    { q: '¿Puedo seguir de verdad a mi perro con un Apple AirTag?', a: 'Solo de forma aproximada. Un AirTag no tiene GPS y no puede determinar su propia posición. Espera a que un dispositivo Apple cercano detecte su señal Bluetooth y envíe una posición aproximada a la red Buscar. En una ciudad concurrida con un perro con correa puede bastar para encontrar un collar caído, pero si tu perro se escapa al campo o a una ciudad extranjera tranquila por donde pasan pocos iPhone, puede que no obtengas ninguna posición. Para la seguridad en viaje, usa un localizador GPS de verdad y guarda el AirTag solo como respaldo.' },
    { q: '¿Tractive y Weenect funcionan por toda Europa sin costes extra?', a: 'Sí. Ambos incluyen itinerancia europea en la suscripción: el localizador sigue enviando la posición al cruzar fronteras, sin SIM ni tarifa de itinerancia que gestionar aparte. Confirma la lista exacta de países en la web del fabricante, pero ambos cubren la UE y la mayoría de países vecinos.' },
    { q: '¿Por qué los localizadores GPS exigen una suscripción mensual?', a: 'Porque llevan una SIM celular (4G) que envía la posición en directo de tu perro por la red móvil, lo que tiene un coste de datos permanente. La suscripción paga esa conectividad y la aplicación de seguimiento. El AirTag no tiene suscripción precisamente porque no lleva SIM y no envía nada por sí mismo, depende de los dispositivos Apple de otras personas.' },
    { q: '¿Cuánto dura la batería de un localizador GPS para perros?', a: 'Depende mucho de la frecuencia de envío. En modo normal Tractive dura hasta unas dos semanas y Weenect alrededor de una semana con las zonas de ahorro, pero el modo Live constante baja cualquiera de los dos a uno o tres días. Cuenta con recargar cada pocos días en un viaje largo, y lleva el cable. La pila del AirTag dura alrededor de un año porque hace muy poco.' },
    { q: '¿Es un localizador GPS lo bastante resistente al agua para un perro que nada?', a: 'Los localizadores celulares están hechos para ello: Tractive es apto para baño y Weenect tiene certificación IP67, así que un perro que vadea o nada no supone problema. El AirTag es IP67 (salpicaduras y polvo), suficiente para la lluvia pero no pensado para un perro que nada, y de todos modos no es un localizador.' },
    { q: '¿Un localizador GPS sustituye al microchip?', a: 'No. El microchip es una identidad legal permanente que un veterinario o una protectora escanea si entregan a tu perro, y es obligatorio para viajar por Europa. Un localizador GPS es un dispositivo de ubicación en directo que usas para encontrar tú mismo a un perro en el momento. Hacen trabajos distintos: conserva ambos, el chip para la identificación, el localizador para la recuperación.' },
  ],
  ctaTitle: '¿Planificando un viaje con tu perro?',
  ctaDesc: 'Explora nuestros destinos pet-friendly por toda Europa. Cada guía incluye las normas de entrada por país, los datos de veterinarios de urgencia y un mapa en directo de hoteles pet-friendly.',
  ctaButton: 'Ver destinos pet-friendly',
  ctaHref: '/es/destinations',
}

const PT: Copy = {
  hero: {
    kicker: 'EQUIPAMENTO VIAGEM COM ANIMAIS · ATUALIZADO 2026',
    h1: 'Localizador GPS para cães em viagem: Tractive vs Weenect vs Apple AirTag',
    tldr: 'Em resumo: se o seu receio é um cão que possa fugir num local desconhecido, precisa de um localizador GPS celular em tempo real (Tractive ou Weenect), que funcionam ambos com uma subscrição paga. Um Apple AirTag não tem GPS, apenas indica uma última posição conhecida quando outro dispositivo Apple passa por perto: é uma etiqueta de reserva, não um localizador de viagem. A seguir comparamos preço, bateria, alcance, seguimento em direto e resistência à água para escolher o certo antes de partir.',
  },
  verdict: {
    title: 'A resposta em 30 segundos',
    body: 'Para viajar, escolha Tractive ou Weenect: são localizadores 4G que mostram o seu cão a mover-se num mapa em direto onde houver cobertura móvel, com roaming incluído em toda a Europa e sem limite de distância. A contrapartida: uma subscrição (cerca de 4 a 13 euros por mês consoante a duração do plano) e uma bateria que recarrega a cada poucos dias. O AirTag é mais barato e a pilha dura cerca de um ano, mas não consegue dizer-lhe onde está o seu cão em tempo real e fica cego em zonas calmas, rurais ou estrangeiras por onde passam poucos iPhone. Guarde um AirTag apenas como segunda etiqueta redundante na coleira, nunca como a sua rede de segurança principal no estrangeiro.',
  },
  table: {
    caption: 'Comparação de localizadores GPS para cães (2026)',
    head: ['Característica', 'Tractive', 'Weenect', 'Apple AirTag'],
    rows: [
      ['Localização', 'GPS em tempo real + 4G', 'GPS em tempo real + 4G', 'Sem GPS (Bluetooth + rede Encontrar)'],
      ['Seguimento em direto', 'Sim, atualiza a cada poucos segundos no modo Live', 'Sim, posição cerca de uma vez por segundo na app', 'Não, apenas última posição conhecida'],
      ['Alcance', 'Ilimitado onde houver cobertura móvel', 'Ilimitado onde houver cobertura móvel', 'Só se houver um dispositivo Apple por perto'],
      ['Subscrição', 'Obrigatória (cerca de 5 a 10 euros por mês)', 'Obrigatória (a partir de cerca de 4 euros por mês)', 'Nenhuma'],
      ['Preço do dispositivo', 'Cerca de 50 a 70 euros', 'Cerca de 45 a 70 euros', 'Cerca de 35 euros'],
      ['Bateria', 'Até cerca de 2 semanas, 1 a 2 dias no modo Live', 'Cerca de 3 dias contínuos, até 10 dias em modo de poupança', 'Cerca de 1 ano (pilha de botão)'],
      ['Resistência à água', 'Impermeável (próprio para banho)', 'Impermeável (IP67)', 'Resistente a salpicos e pó (IP67)'],
      ['Cobertura na Europa', 'Sim, roaming incluído', 'Sim, roaming incluído', 'Onde houver dispositivos Apple, fraco em zona rural'],
      ['Ideal para', 'Cães fugitivos, caminhadas, viagens longas', 'O mesmo, com apoio francês e europeu', 'Uma etiqueta de reserva barata, cão com trela na cidade'],
    ],
  },
  productsTitle: 'As três opções em detalhe',
  products: [
    {
      name: 'Tractive',
      tagline: 'O localizador GPS em tempo real líder de mercado',
      href: 'https://tractive.com/pt',
      hrefLabel: 'tractive.com',
      pros: [
        'Verdadeiro seguimento em direto sem limite de distância onde houver sinal',
        'Roaming europeu integrado, continua a funcionar ao atravessar fronteiras',
        'Alertas de cerca virtual quando o cão sai de uma zona definida',
        'Seguimento de atividade e sono, mais sinais vitais opcionais nos modelos recentes',
      ],
      cons: [
        'A subscrição é obrigatória, o dispositivo sozinho não faz nada',
        'A bateria cai para um ou dois dias quando o modo Live funciona sem parar',
      ],
    },
    {
      name: 'Weenect',
      tagline: 'O concorrente francês, forte na Europa',
      href: 'https://www.weenect.com/pt/',
      hrefLabel: 'weenect.com',
      pros: [
        'Posição em tempo real atualizada cerca de uma vez por segundo na app',
        'Entre os localizadores mais pequenos e leves, bom para cães médios e pequenos',
        'Empresa francesa com apoio e SIM europeus, preços claros em euros',
        'Dispositivo de entrada mais barato e mensalidade baixa nos planos longos',
      ],
      cons: [
        'A subscrição é obrigatória, como em todos os localizadores celulares',
        'Autonomia contínua mais curta do que a Tractive, cerca de 3 dias',
      ],
    },
    {
      name: 'Apple AirTag',
      tagline: 'Uma etiqueta Bluetooth, não um localizador',
      href: 'https://www.apple.com/pt/airtag/',
      hrefLabel: 'apple.com',
      pros: [
        'Sem subscrição e uma pilha de botão que dura cerca de um ano',
        'Muito barato e minúsculo, útil como reserva redundante na coleira',
        'Suficiente para localizar um cão com trela numa cidade movimentada',
      ],
      cons: [
        'Sem GPS, não consegue indicar a própria posição, espera por um iPhone que passe',
        'Sem seguimento em direto, só vê o último local detetado',
        'Fica mudo em zonas rurais, calmas ou com poucos iPhone, precisamente onde os cães se perdem',
        'A Apple destina-o a objetos, não a animais',
      ],
    },
  ],
  profilesTitle: 'Qual deve escolher?',
  profiles: [
    { who: 'Viaja com um cão que pode fugir', pick: 'Tractive ou Weenect', why: 'Só um localizador celular em tempo real permite seguir um cão em fuga num mapa em direto e alcançá-lo antes de se afastar demasiado.' },
    { who: 'Quer uma marca e apoio franceses ou europeus', pick: 'Weenect', why: 'Empresa francesa com apoio e SIM europeus, preços transparentes em euros, e um dispositivo mais pequeno para cães pequenos.' },
    { who: 'Quer a melhor autonomia e mais funções', pick: 'Tractive', why: 'Maior autonomia no modo padrão, roaming integrado e seguimento de atividade ou saúde nos modelos recentes.' },
    { who: 'Só quer uma reserva barata e nunca perde a coleira', pick: 'Apple AirTag', why: 'Serve como segunda etiqueta para um cão com trela na cidade, mas nunca como única rede de segurança no estrangeiro.' },
  ],
  disclosure: 'Ligamos à página de produto oficial de cada fabricante. Não somos pagos para classificar um acima de outro, e os preços e as características mudam com frequência: confirme sempre os valores atuais no site do fabricante antes de comprar.',
  faqTitle: 'Perguntas frequentes',
  faqs: [
    { q: 'Posso mesmo seguir o meu cão com um Apple AirTag?', a: 'Apenas de forma aproximada. Um AirTag não tem GPS e não consegue determinar a própria posição. Espera que um dispositivo Apple próximo detete o seu sinal Bluetooth e envie uma posição aproximada à rede Encontrar. Numa cidade movimentada com um cão com trela pode chegar para encontrar uma coleira caída, mas se o seu cão foge para o campo ou para uma cidade estrangeira calma por onde passam poucos iPhone, pode não obter posição nenhuma. Para a segurança em viagem, use um verdadeiro localizador GPS e guarde o AirTag só como reserva.' },
    { q: 'A Tractive e a Weenect funcionam por toda a Europa sem custos extra?', a: 'Sim. Ambas incluem roaming europeu na subscrição: o localizador continua a enviar a posição ao atravessar fronteiras, sem SIM nem tarifa de roaming para tratar à parte. Confirme a lista exata de países no site do fabricante, mas ambas cobrem a UE e a maioria dos países vizinhos.' },
    { q: 'Porque é que os localizadores GPS exigem uma subscrição mensal?', a: 'Porque têm um SIM celular (4G) que envia a posição em direto do seu cão pela rede móvel, o que tem um custo de dados permanente. A subscrição paga essa ligação e a aplicação de seguimento. O AirTag não tem subscrição precisamente porque não tem SIM e não envia nada por si mesmo, depende dos dispositivos Apple de outras pessoas.' },
    { q: 'Quanto dura a bateria de um localizador GPS para cães?', a: 'Depende muito da frequência de envio. No modo normal a Tractive dura até cerca de duas semanas e a Weenect cerca de uma semana com as zonas de poupança, mas o modo Live constante faz cair qualquer uma para um a três dias. Conte recarregar a cada poucos dias numa viagem longa, e leve o cabo. A pilha do AirTag dura cerca de um ano porque faz muito pouco.' },
    { q: 'Um localizador GPS é suficientemente impermeável para um cão que nada?', a: 'Os localizadores celulares são feitos para isso: a Tractive é própria para banho e a Weenect tem certificação IP67, por isso um cão que entra na água ou nada não é problema. O AirTag é IP67 (salpicos e pó), suficiente para a chuva mas não pensado para um cão que nada, e de qualquer forma não é um localizador.' },
    { q: 'Um localizador GPS substitui o microchip?', a: 'Não. O microchip é uma identidade legal permanente que um veterinário ou um canil lê se o seu cão for entregue, e é obrigatório para viajar na Europa. Um localizador GPS é um dispositivo de localização em direto que usa para encontrar você mesmo um cão no momento. Fazem trabalhos diferentes: mantenha os dois, o chip para a identificação, o localizador para a recuperação.' },
  ],
  ctaTitle: 'A planear uma viagem com o seu cão?',
  ctaDesc: 'Explore os nossos destinos pet-friendly por toda a Europa. Cada guia inclui as regras de entrada por país, os contactos de veterinários de urgência e um mapa em direto de hotéis pet-friendly.',
  ctaButton: 'Ver destinos pet-friendly',
  ctaHref: '/pt/destinations',
}

const DE: Copy = {
  hero: {
    kicker: 'REISEAUSRÜSTUNG FÜR HAUSTIERE · AKTUALISIERT 2026',
    h1: 'GPS-Tracker für Hunde auf Reisen: Tractive vs Weenect vs Apple AirTag',
    tldr: 'Kurz gesagt: Wenn Ihre Sorge ein Hund ist, der an einem fremden Ort weglaufen könnte, brauchen Sie einen Echtzeit-GPS-Tracker über Mobilfunk (Tractive oder Weenect), die beide ein kostenpflichtiges Abo erfordern. Ein Apple AirTag hat gar kein GPS, er meldet nur eine zuletzt bekannte Position, wenn ein anderes Apple-Gerät in die Nähe kommt: ein Reserve-Tag, kein Reise-Tracker. Unten vergleichen wir Preis, Akku, Reichweite, Live-Ortung und Wasserfestigkeit, damit Sie vor der Abreise das Richtige wählen.',
  },
  verdict: {
    title: 'Die Antwort in 30 Sekunden',
    body: 'Für Reisen wählen Sie Tractive oder Weenect: Das sind LTE-Tracker, die Ihren Hund überall dort, wo Mobilfunk verfügbar ist, live auf der Karte zeigen, mit europaweitem Roaming und ohne Entfernungsgrenze. Der Preis dafür: ein Abo (je nach Laufzeit etwa 4 bis 13 Euro pro Monat) und ein Akku, den Sie alle paar Tage laden. Der AirTag ist günstiger und seine Batterie hält rund ein Jahr, aber er kann Ihnen nicht in Echtzeit sagen, wo Ihr Hund ist, und wird in ruhigen, ländlichen oder fremden Gegenden blind, wo kaum iPhones vorbeikommen. Behalten Sie einen AirTag nur als zweites, redundantes Tag am Halsband, nie als wichtigstes Sicherheitsnetz im Ausland.',
  },
  table: {
    caption: 'Vergleich von GPS-Trackern für Hunde (2026)',
    head: ['Merkmal', 'Tractive', 'Weenect', 'Apple AirTag'],
    rows: [
      ['Ortung', 'Echtzeit-GPS + LTE', 'Echtzeit-GPS + LTE', 'Kein GPS (Bluetooth + Wo-ist-Netzwerk)'],
      ['Live-Ortung', 'Ja, alle paar Sekunden im Live-Modus', 'Ja, Position etwa jede Sekunde in der App', 'Nein, nur zuletzt bekannter Standort'],
      ['Reichweite', 'Unbegrenzt bei Mobilfunkabdeckung', 'Unbegrenzt bei Mobilfunkabdeckung', 'Nur wenn ein Apple-Gerät in der Nähe ist'],
      ['Abo', 'Erforderlich (etwa 5 bis 10 Euro pro Monat)', 'Erforderlich (ab etwa 4 Euro pro Monat)', 'Keines'],
      ['Gerätepreis', 'Etwa 50 bis 70 Euro', 'Etwa 45 bis 70 Euro', 'Etwa 35 Euro'],
      ['Akku', 'Bis zu etwa 2 Wochen, 1 bis 2 Tage im Live-Modus', 'Etwa 3 Tage durchgehend, bis zu 10 Tage im Sparmodus', 'Etwa 1 Jahr (Knopfzelle)'],
      ['Wasserfestigkeit', 'Wasserdicht (zum Schwimmen geeignet)', 'Wasserdicht (IP67)', 'Spritzwasser- und staubgeschützt (IP67)'],
      ['Europa-Abdeckung', 'Ja, Roaming inklusive', 'Ja, Roaming inklusive', 'Wo es Apple-Geräte gibt, schwach auf dem Land'],
      ['Am besten für', 'Ausreißer-Hunde, Wanderungen, lange Reisen', 'Dasselbe, mit französischem und EU-Support', 'Ein günstiges Reserve-Tag, angeleinter Stadthund'],
    ],
  },
  productsTitle: 'Die drei Optionen im Detail',
  products: [
    {
      name: 'Tractive',
      tagline: 'Der marktführende Echtzeit-GPS-Tracker',
      href: 'https://tractive.com/de',
      hrefLabel: 'tractive.com',
      pros: [
        'Echte Live-Ortung ohne Entfernungsgrenze überall mit Mobilfunksignal',
        'Europaweites Roaming integriert, funktioniert auch über Grenzen hinweg',
        'Virtueller-Zaun-Alarm, wenn der Hund einen festgelegten Bereich verlässt',
        'Aktivitäts- und Schlaftracking, plus optionale Gesundheitswerte bei neueren Modellen',
      ],
      cons: [
        'Ein Abo ist Pflicht, das Gerät allein tut nichts',
        'Der Akku fällt auf ein bis zwei Tage, wenn der Live-Modus dauerhaft läuft',
      ],
    },
    {
      name: 'Weenect',
      tagline: 'Der französische Herausforderer, stark in der EU',
      href: 'https://www.weenect.com/de/',
      hrefLabel: 'weenect.com',
      pros: [
        'Echtzeit-Position etwa einmal pro Sekunde in der App aktualisiert',
        'Einer der kleinsten und leichtesten Tracker, gut für mittlere und kleine Hunde',
        'Französisches Unternehmen mit EU-Support und EU-SIM, klare Euro-Preise',
        'Günstigeres Einstiegsgerät und niedrige Monatsrate bei langen Laufzeiten',
      ],
      cons: [
        'Ein Abo ist Pflicht, wie bei allen Mobilfunk-Trackern',
        'Akkulaufzeit im Dauerbetrieb kürzer als bei Tractive, etwa 3 Tage',
      ],
    },
    {
      name: 'Apple AirTag',
      tagline: 'Ein Bluetooth-Tag, kein Tracker',
      href: 'https://www.apple.com/de/airtag/',
      hrefLabel: 'apple.com',
      pros: [
        'Kein Abo und eine Knopfzelle, die rund ein Jahr hält',
        'Sehr günstig und winzig, nützlich als redundante Reserve am Halsband',
        'Reicht aus, um einen angeleinten Hund in einer belebten Stadt zu finden',
      ],
      cons: [
        'Kein GPS, er kann die eigene Position nicht melden, er wartet auf ein vorbeikommendes iPhone',
        'Keine Live-Ortung, Sie sehen nur den zuletzt erkannten Ort',
        'Verstummt in ländlichen, ruhigen oder iPhone-armen Gegenden, genau dort, wo Hunde verloren gehen',
        'Apple vermarktet ihn für Gegenstände, nicht für Haustiere',
      ],
    },
  ],
  profilesTitle: 'Welchen sollten Sie wählen?',
  profiles: [
    { who: 'Sie reisen mit einem Hund, der weglaufen könnte', pick: 'Tractive oder Weenect', why: 'Nur ein Echtzeit-Mobilfunk-Tracker lässt Sie einen ausgerissenen Hund live auf der Karte verfolgen und erreichen, bevor er zu weit weg ist.' },
    { who: 'Sie wollen eine französische oder EU-Marke und EU-Support', pick: 'Weenect', why: 'Französisches Unternehmen mit EU-Support, EU-SIM und transparenten Euro-Preisen, dazu ein kleineres Gerät für kleine Hunde.' },
    { who: 'Sie wollen den längsten Akku und die meisten Funktionen', pick: 'Tractive', why: 'Längere Akkulaufzeit im Standardmodus, integriertes Roaming und Aktivitäts- oder Gesundheitstracking bei neueren Modellen.' },
    { who: 'Sie wollen nur eine günstige Reserve und verlieren nie das Halsband', pick: 'Apple AirTag', why: 'Okay als zweites Tag für einen angeleinten Stadthund, aber nie als einziges Sicherheitsnetz im Ausland.' },
  ],
  disclosure: 'Wir verlinken auf die offizielle Produktseite jedes Herstellers. Wir werden nicht dafür bezahlt, einen über den anderen zu stellen, und Preise und technische Daten ändern sich oft: Prüfen Sie vor dem Kauf immer die aktuellen Angaben auf der Herstellerseite.',
  faqTitle: 'Häufige Fragen',
  faqs: [
    { q: 'Kann ich meinen Hund wirklich mit einem Apple AirTag orten?', a: 'Nur grob. Ein AirTag hat kein GPS und kann seine eigene Position nicht bestimmen. Er wartet, bis ein nahes Apple-Gerät sein Bluetooth-Signal erkennt und eine ungefähre Position an das Wo-ist-Netzwerk meldet. In einer belebten Stadt mit angeleintem Hund kann das reichen, um ein abgefallenes Halsband zu finden, aber wenn Ihr Hund aufs Land oder in eine ruhige fremde Stadt läuft, wo kaum iPhones vorbeikommen, erhalten Sie womöglich gar keine Position. Für die Reisesicherheit nutzen Sie einen echten GPS-Tracker und behalten den AirTag nur als Reserve.' },
    { q: 'Funktionieren Tractive und Weenect europaweit ohne Zusatzkosten?', a: 'Ja. Beide schließen europaweites Roaming ins Abo ein: Der Tracker meldet die Position auch beim Grenzübertritt weiter, ohne separate SIM oder Roaming-Gebühr. Prüfen Sie die genaue Länderliste auf der Herstellerseite, aber beide decken die EU und die meisten Nachbarländer ab.' },
    { q: 'Warum brauchen GPS-Tracker ein monatliches Abo?', a: 'Weil sie eine Mobilfunk-SIM (LTE) enthalten, die die Live-Position Ihres Hundes über das Mobilfunknetz sendet, was laufende Datenkosten verursacht. Das Abo bezahlt diese Verbindung und die Live-App. Der AirTag hat genau deshalb kein Abo, weil er keine SIM hat und selbst nichts sendet, er verlässt sich auf die Apple-Geräte anderer Leute.' },
    { q: 'Wie lange hält der Akku eines Hunde-GPS-Trackers?', a: 'Das hängt stark davon ab, wie oft er meldet. Im Normalmodus hält Tractive bis zu etwa zwei Wochen und Weenect rund eine Woche mit Sparzonen, aber der dauerhafte Live-Modus bringt beide auf ein bis drei Tage herunter. Rechnen Sie auf einer langen Reise damit, alle paar Tage zu laden, und packen Sie das Ladekabel ein. Die AirTag-Batterie hält rund ein Jahr, weil er so wenig tut.' },
    { q: 'Ist ein GPS-Tracker wasserfest genug für einen schwimmenden Hund?', a: 'Die Mobilfunk-Tracker sind dafür gebaut: Tractive ist zum Schwimmen geeignet und Weenect nach IP67 zertifiziert, ein watender oder schwimmender Hund ist also kein Problem. Der AirTag ist IP67 (Spritzwasser und Staub), genug für Regen, aber nicht für einen schwimmenden Hund gedacht, und ohnehin kein Tracker.' },
    { q: 'Ersetzt ein GPS-Tracker den Mikrochip?', a: 'Nein. Der Mikrochip ist eine dauerhafte rechtliche Identität, die ein Tierarzt oder ein Tierheim ausliest, wenn Ihr Hund abgegeben wird, und er ist für Reisen in Europa Pflicht. Ein GPS-Tracker ist ein Live-Ortungsgerät, mit dem Sie einen Hund im Moment selbst finden. Sie erfüllen verschiedene Aufgaben: Behalten Sie beide, den Chip zur Identifikation, den Tracker zur Wiederbeschaffung.' },
  ],
  ctaTitle: 'Planen Sie eine Reise mit Ihrem Hund?',
  ctaDesc: 'Durchstöbern Sie unsere haustierfreundlichen Reiseziele in ganz Europa. Jeder Ratgeber enthält die Einreiseregeln je Land, Notfall-Tierarztkontakte und eine Live-Karte haustierfreundlicher Hotels.',
  ctaButton: 'Haustierfreundliche Reiseziele ansehen',
  ctaHref: '/de/destinations',
}

const NL: Copy = {
  hero: {
    kicker: 'REISUITRUSTING VOOR HUISDIEREN · BIJGEWERKT 2026',
    h1: 'GPS-tracker voor honden op reis: Tractive vs Weenect vs Apple AirTag',
    tldr: 'Kort gezegd: als je bang bent dat je hond er op een onbekende plek vandoor gaat, heb je een realtime gsm-GPS-tracker nodig (Tractive of Weenect), die beide een betaald abonnement vereisen. Een Apple AirTag heeft helemaal geen GPS, hij meldt alleen een laatst bekende positie wanneer een ander Apple-apparaat in de buurt komt: een reserve-tag, geen reistracker. Hieronder vergelijken we prijs, batterij, bereik, live volgen en waterbestendigheid zodat je voor vertrek de juiste kiest.',
  },
  verdict: {
    title: 'Het antwoord in 30 seconden',
    body: 'Kies voor reizen Tractive of Weenect: dit zijn 4G-trackers die je hond live op de kaart tonen overal waar mobiel bereik is, met Europa-breed roaming inbegrepen en zonder afstandslimiet. De keerzijde: een abonnement (ongeveer 4 tot 13 euro per maand afhankelijk van de looptijd) en een batterij die je om de paar dagen oplaadt. De AirTag is goedkoper en de batterij gaat ongeveer een jaar mee, maar hij kan je niet in realtime vertellen waar je hond is en wordt blind in rustige, landelijke of buitenlandse gebieden waar weinig iPhones komen. Houd een AirTag alleen als tweede, redundante tag aan de halsband, nooit als je belangrijkste vangnet in het buitenland.',
  },
  table: {
    caption: 'Vergelijking van GPS-trackers voor honden (2026)',
    head: ['Kenmerk', 'Tractive', 'Weenect', 'Apple AirTag'],
    rows: [
      ['Plaatsbepaling', 'Realtime GPS + 4G', 'Realtime GPS + 4G', 'Geen GPS (Bluetooth + Zoek mijn-netwerk)'],
      ['Live volgen', 'Ja, elke paar seconden in Live-modus', 'Ja, positie ongeveer elke seconde in de app', 'Nee, alleen laatst bekende locatie'],
      ['Bereik', 'Onbeperkt waar mobiel bereik is', 'Onbeperkt waar mobiel bereik is', 'Alleen als er een Apple-apparaat in de buurt is'],
      ['Abonnement', 'Vereist (ongeveer 5 tot 10 euro per maand)', 'Vereist (vanaf ongeveer 4 euro per maand)', 'Geen'],
      ['Prijs apparaat', 'Ongeveer 50 tot 70 euro', 'Ongeveer 45 tot 70 euro', 'Ongeveer 35 euro'],
      ['Batterij', 'Tot ongeveer 2 weken, 1 tot 2 dagen in Live-modus', 'Ongeveer 3 dagen continu, tot 10 dagen in spaarstand', 'Ongeveer 1 jaar (knoopcel)'],
      ['Waterbestendigheid', 'Waterdicht (geschikt om te zwemmen)', 'Waterdicht (IP67)', 'Spat- en stofbestendig (IP67)'],
      ['Dekking in Europa', 'Ja, roaming inbegrepen', 'Ja, roaming inbegrepen', 'Waar Apple-apparaten zijn, zwak op het platteland'],
      ['Beste voor', 'Honden die ervandoor gaan, wandelingen, lange reizen', 'Hetzelfde, met Franse en EU-ondersteuning', 'Een goedkope reserve-tag, aangelijnde stadshond'],
    ],
  },
  productsTitle: 'De drie opties in detail',
  products: [
    {
      name: 'Tractive',
      tagline: 'De marktleidende realtime GPS-tracker',
      href: 'https://tractive.com/nl',
      hrefLabel: 'tractive.com',
      pros: [
        'Echt live volgen zonder afstandslimiet overal waar mobiel signaal is',
        'Europa-breed roaming ingebouwd, blijft werken over de grens',
        'Virtuele-omheining-waarschuwing wanneer je hond een ingesteld gebied verlaat',
        'Activiteits- en slaaptracking, plus optionele gezondheidswaarden op nieuwere modellen',
      ],
      cons: [
        'Een abonnement is verplicht, het apparaat alleen doet niets',
        'De batterij zakt naar een of twee dagen als de Live-modus constant aanstaat',
      ],
    },
    {
      name: 'Weenect',
      tagline: 'De Franse uitdager, sterk in de EU',
      href: 'https://www.weenect.com/nl/',
      hrefLabel: 'weenect.com',
      pros: [
        'Realtime positie ongeveer eens per seconde ververst in de app',
        'Een van de kleinste en lichtste trackers, goed voor middelgrote en kleine honden',
        'Frans bedrijf met EU-ondersteuning en EU-simkaart, duidelijke prijzen in euro',
        'Goedkoper instapapparaat en lage maandprijs bij lange looptijden',
      ],
      cons: [
        'Een abonnement is verplicht, zoals bij alle gsm-trackers',
        'Kortere accuduur bij continu gebruik dan Tractive, ongeveer 3 dagen',
      ],
    },
    {
      name: 'Apple AirTag',
      tagline: 'Een Bluetooth-tag, geen tracker',
      href: 'https://www.apple.com/nl/airtag/',
      hrefLabel: 'apple.com',
      pros: [
        'Geen abonnement en een knoopcel die ongeveer een jaar meegaat',
        'Zeer goedkoop en klein, nuttig als redundante reserve aan de halsband',
        'Volstaat om een aangelijnde hond in een drukke stad te vinden',
      ],
      cons: [
        'Geen GPS, hij kan zijn eigen positie niet melden, hij wacht op een passerende iPhone',
        'Geen live volgen, je ziet alleen de laatst gedetecteerde plek',
        'Valt stil in landelijke, rustige of iPhone-arme gebieden, juist waar honden verdwalen',
        'Apple positioneert hem voor voorwerpen, niet voor huisdieren',
      ],
    },
  ],
  profilesTitle: 'Welke moet je kiezen?',
  profiles: [
    { who: 'Je reist met een hond die ervandoor kan gaan', pick: 'Tractive of Weenect', why: 'Alleen een realtime gsm-tracker laat je een weggelopen hond live op de kaart volgen en bereiken voordat hij te ver weg is.' },
    { who: 'Je wilt een Frans of EU-merk en EU-ondersteuning', pick: 'Weenect', why: 'Frans bedrijf met EU-ondersteuning, EU-simkaart en transparante prijzen in euro, plus een kleiner apparaat voor kleine honden.' },
    { who: 'Je wilt de langste batterij en de meeste functies', pick: 'Tractive', why: 'Langere accuduur in standaardmodus, ingebouwde roaming en activiteits- of gezondheidstracking op nieuwere modellen.' },
    { who: 'Je wilt gewoon een goedkope reserve en verliest nooit de halsband', pick: 'Apple AirTag', why: 'Prima als tweede tag voor een aangelijnde stadshond, maar nooit als enige vangnet in het buitenland.' },
  ],
  disclosure: 'We linken naar de officiële productpagina van elke fabrikant. We worden niet betaald om de een boven de ander te zetten, en prijzen en specificaties veranderen vaak: controleer altijd de actuele cijfers op de site van de fabrikant voordat je koopt.',
  faqTitle: 'Veelgestelde vragen',
  faqs: [
    { q: 'Kan ik mijn hond echt volgen met een Apple AirTag?', a: 'Alleen globaal. Een AirTag heeft geen GPS en kan zijn eigen positie niet bepalen. Hij wacht tot een nabij Apple-apparaat zijn Bluetooth-signaal oppikt en een geschatte positie naar het Zoek mijn-netwerk stuurt. In een drukke stad met een aangelijnde hond kan dat genoeg zijn om een afgevallen halsband te vinden, maar als je hond het platteland in rent of een rustige buitenlandse stad waar weinig iPhones komen, krijg je misschien helemaal geen positie. Gebruik voor reisveiligheid een echte GPS-tracker en houd de AirTag alleen als reserve.' },
    { q: 'Werken Tractive en Weenect door heel Europa zonder extra kosten?', a: 'Ja. Beide hebben Europa-breed roaming in het abonnement: de tracker blijft de positie doorgeven over de grens, zonder aparte simkaart of roamingtarief te regelen. Controleer de exacte landenlijst op de site van de fabrikant, maar beide dekken de EU en de meeste buurlanden.' },
    { q: 'Waarom hebben GPS-trackers een maandabonnement nodig?', a: 'Omdat ze een gsm-simkaart (4G) bevatten die de live positie van je hond over het mobiele netwerk verstuurt, wat doorlopende datakosten meebrengt. Het abonnement betaalt die verbinding en de live-app. De AirTag heeft juist geen abonnement omdat hij geen simkaart heeft en zelf niets verstuurt, hij leunt op de Apple-apparaten van anderen.' },
    { q: 'Hoe lang gaat de batterij van een honden-GPS-tracker mee?', a: 'Dat hangt sterk af van hoe vaak hij doorgeeft. In de normale modus gaat Tractive tot ongeveer twee weken mee en Weenect ongeveer een week met spaarzones, maar de constante Live-modus brengt beide terug naar een tot drie dagen. Reken erop om op een lange reis om de paar dagen op te laden, en neem de oplaadkabel mee. De AirTag-batterij gaat ongeveer een jaar mee omdat hij zo weinig doet.' },
    { q: 'Is een GPS-tracker waterbestendig genoeg voor een zwemmende hond?', a: 'De gsm-trackers zijn ervoor gebouwd: Tractive is geschikt om te zwemmen en Weenect is IP67-gecertificeerd, dus een hond die waadt of zwemt is geen probleem. De AirTag is IP67 (spatten en stof), genoeg voor regen maar niet bedoeld voor een zwemmende hond, en het is sowieso geen tracker.' },
    { q: 'Vervangt een GPS-tracker de chip?', a: 'Nee. De chip is een permanente wettelijke identiteit die een dierenarts of asiel uitleest als je hond wordt afgegeven, en is verplicht om in Europa te reizen. Een GPS-tracker is een live-locatieapparaat waarmee je zelf een hond op het moment terugvindt. Ze doen verschillend werk: houd beide, de chip voor identificatie, de tracker voor terugvinden.' },
  ],
  ctaTitle: 'Plan je een reis met je hond?',
  ctaDesc: 'Blader door onze huisdiervriendelijke bestemmingen in heel Europa. Elke gids bevat de toegangsregels per land, contactgegevens van nooddierenartsen en een live kaart van huisdiervriendelijke hotels.',
  ctaButton: 'Bekijk huisdiervriendelijke bestemmingen',
  ctaHref: '/nl/destinations',
}

const IT: Copy = {
  hero: {
    kicker: 'ATTREZZATURA DA VIAGGIO PER ANIMALI · AGGIORNATO 2026',
    h1: 'Localizzatore GPS per cani in viaggio: Tractive vs Weenect vs Apple AirTag',
    tldr: 'In breve: se il tuo timore è un cane che possa scappare in un luogo sconosciuto, ti serve un localizzatore GPS cellulare in tempo reale (Tractive o Weenect), che funzionano entrambi con un abbonamento a pagamento. Un Apple AirTag non ha alcun GPS, segnala solo un\'ultima posizione nota quando un altro dispositivo Apple passa vicino: è un\'etichetta di riserva, non un localizzatore da viaggio. Qui sotto confrontiamo prezzo, batteria, portata, tracciamento live e resistenza all\'acqua per scegliere quello giusto prima di partire.',
  },
  verdict: {
    title: 'La risposta in 30 secondi',
    body: 'Per viaggiare scegli Tractive o Weenect: sono localizzatori 4G che mostrano il tuo cane muoversi su una mappa in diretta ovunque ci sia copertura mobile, con roaming incluso in tutta Europa e senza limiti di distanza. Il compromesso: un abbonamento (circa 4 a 13 euro al mese a seconda della durata del piano) e una batteria da ricaricare ogni pochi giorni. L\'AirTag costa meno e la pila dura circa un anno, ma non può dirti dove si trova il tuo cane in tempo reale e diventa cieco in zone tranquille, rurali o straniere dove passano pochi iPhone. Tieni un AirTag solo come seconda etichetta ridondante sul collare, mai come rete di sicurezza principale all\'estero.',
  },
  table: {
    caption: 'Confronto dei localizzatori GPS per cani (2026)',
    head: ['Caratteristica', 'Tractive', 'Weenect', 'Apple AirTag'],
    rows: [
      ['Localizzazione', 'GPS in tempo reale + 4G', 'GPS in tempo reale + 4G', 'Nessun GPS (Bluetooth + rete Dov\'è)'],
      ['Tracciamento live', 'Sì, aggiornato ogni pochi secondi in modalità Live', 'Sì, posizione circa ogni secondo nell\'app', 'No, solo ultima posizione nota'],
      ['Portata', 'Illimitata dove c\'è copertura mobile', 'Illimitata dove c\'è copertura mobile', 'Solo se c\'è un dispositivo Apple nelle vicinanze'],
      ['Abbonamento', 'Obbligatorio (circa 5 a 10 euro al mese)', 'Obbligatorio (da circa 4 euro al mese)', 'Nessuno'],
      ['Prezzo del dispositivo', 'Circa 50 a 70 euro', 'Circa 45 a 70 euro', 'Circa 35 euro'],
      ['Batteria', 'Fino a circa 2 settimane, 1 o 2 giorni in modalità Live', 'Circa 3 giorni continui, fino a 10 giorni in risparmio energetico', 'Circa 1 anno (pila a bottone)'],
      ['Resistenza all\'acqua', 'Impermeabile (adatto al bagno)', 'Impermeabile (IP67)', 'Resistente a schizzi e polvere (IP67)'],
      ['Copertura in Europa', 'Sì, roaming incluso', 'Sì, roaming incluso', 'Dove ci sono dispositivi Apple, debole in zona rurale'],
      ['Ideale per', 'Cani che scappano, escursioni, viaggi lunghi', 'Lo stesso, con assistenza francese ed europea', 'Un\'etichetta di riserva economica, cane al guinzaglio in città'],
    ],
  },
  productsTitle: 'Le tre opzioni in dettaglio',
  products: [
    {
      name: 'Tractive',
      tagline: 'Il localizzatore GPS in tempo reale leader di mercato',
      href: 'https://tractive.com/it',
      hrefLabel: 'tractive.com',
      pros: [
        'Vero tracciamento live senza limiti di distanza ovunque ci sia segnale',
        'Roaming europeo integrato, continua a funzionare oltre confine',
        'Avvisi di recinto virtuale quando il cane lascia un\'area definita',
        'Monitoraggio di attività e sonno, più parametri di salute opzionali sui modelli recenti',
      ],
      cons: [
        'L\'abbonamento è obbligatorio, il dispositivo da solo non fa nulla',
        'La batteria scende a uno o due giorni quando la modalità Live è sempre attiva',
      ],
    },
    {
      name: 'Weenect',
      tagline: 'Lo sfidante francese, forte nell\'UE',
      href: 'https://www.weenect.com/it/',
      hrefLabel: 'weenect.com',
      pros: [
        'Posizione in tempo reale aggiornata circa una volta al secondo nell\'app',
        'Tra i localizzatori più piccoli e leggeri, adatto a cani medi e piccoli',
        'Azienda francese con assistenza e SIM europee, prezzi chiari in euro',
        'Dispositivo di ingresso più economico e canone mensile basso sui piani lunghi',
      ],
      cons: [
        'L\'abbonamento è obbligatorio, come per tutti i localizzatori cellulari',
        'Autonomia in uso continuo più breve di Tractive, circa 3 giorni',
      ],
    },
    {
      name: 'Apple AirTag',
      tagline: 'Un\'etichetta Bluetooth, non un localizzatore',
      href: 'https://www.apple.com/it/airtag/',
      hrefLabel: 'apple.com',
      pros: [
        'Nessun abbonamento e una pila a bottone che dura circa un anno',
        'Molto economico e minuscolo, utile come riserva ridondante sul collare',
        'Sufficiente per localizzare un cane al guinzaglio in una città affollata',
      ],
      cons: [
        'Nessun GPS, non può segnalare la propria posizione, aspetta un iPhone di passaggio',
        'Nessun tracciamento live, vedi solo l\'ultimo luogo rilevato',
        'Diventa muto in zone rurali, tranquille o con pochi iPhone, proprio dove i cani si perdono',
        'Apple lo propone per gli oggetti, non per gli animali',
      ],
    },
  ],
  profilesTitle: 'Quale scegliere?',
  profiles: [
    { who: 'Viaggi con un cane che potrebbe scappare', pick: 'Tractive o Weenect', why: 'Solo un localizzatore cellulare in tempo reale permette di seguire un cane in fuga su una mappa in diretta e raggiungerlo prima che si allontani troppo.' },
    { who: 'Vuoi un marchio e un\'assistenza francesi o europei', pick: 'Weenect', why: 'Azienda francese con assistenza e SIM europee, prezzi trasparenti in euro, e un dispositivo più piccolo per cani piccoli.' },
    { who: 'Vuoi la migliore autonomia e più funzioni', pick: 'Tractive', why: 'Autonomia più lunga in modalità standard, roaming integrato e monitoraggio di attività o salute sui modelli recenti.' },
    { who: 'Vuoi solo una riserva economica e non perdi mai il collare', pick: 'Apple AirTag', why: 'Va bene come seconda etichetta per un cane al guinzaglio in città, ma mai come unica rete di sicurezza all\'estero.' },
  ],
  disclosure: 'Rimandiamo alla pagina prodotto ufficiale di ciascun produttore. Non siamo pagati per classificarne uno sopra l\'altro, e prezzi e specifiche cambiano spesso: verifica sempre i dati aggiornati sul sito del produttore prima di acquistare.',
  faqTitle: 'Domande frequenti',
  faqs: [
    { q: 'Posso davvero seguire il mio cane con un Apple AirTag?', a: 'Solo in modo approssimativo. Un AirTag non ha GPS e non può determinare la propria posizione. Aspetta che un dispositivo Apple vicino rilevi il suo segnale Bluetooth e invii una posizione approssimativa alla rete Dov\'è. In una città affollata con un cane al guinzaglio può bastare per ritrovare un collare caduto, ma se il tuo cane scappa in campagna o in una città straniera tranquilla dove passano pochi iPhone, potresti non ottenere alcuna posizione. Per la sicurezza in viaggio usa un vero localizzatore GPS e tieni l\'AirTag solo come riserva.' },
    { q: 'Tractive e Weenect funzionano in tutta Europa senza costi extra?', a: 'Sì. Entrambi includono il roaming europeo nell\'abbonamento: il localizzatore continua a inviare la posizione quando attraversi i confini, senza SIM o tariffa di roaming da gestire a parte. Verifica l\'elenco esatto dei paesi sul sito del produttore, ma entrambi coprono l\'UE e la maggior parte dei paesi vicini.' },
    { q: 'Perché i localizzatori GPS richiedono un abbonamento mensile?', a: 'Perché contengono una SIM cellulare (4G) che invia la posizione in tempo reale del tuo cane sulla rete mobile, il che comporta un costo dati continuo. L\'abbonamento paga questa connettività e l\'app live. L\'AirTag non ha abbonamento proprio perché non ha SIM e non invia nulla da solo, si affida ai dispositivi Apple di altre persone.' },
    { q: 'Quanto dura la batteria di un localizzatore GPS per cani?', a: 'Dipende molto dalla frequenza di invio. In modalità normale Tractive dura fino a circa due settimane e Weenect circa una settimana con le zone di risparmio, ma la modalità Live costante porta entrambi a uno o tre giorni. Metti in conto di ricaricare ogni pochi giorni in un viaggio lungo, e porta il cavo. La pila dell\'AirTag dura circa un anno perché fa pochissimo.' },
    { q: 'Un localizzatore GPS è abbastanza impermeabile per un cane che nuota?', a: 'I localizzatori cellulari sono fatti apposta: Tractive è adatto al bagno e Weenect è certificato IP67, quindi un cane che guada o nuota non è un problema. L\'AirTag è IP67 (schizzi e polvere), sufficiente per la pioggia ma non pensato per un cane che nuota, e comunque non è un localizzatore.' },
    { q: 'Un localizzatore GPS sostituisce il microchip?', a: 'No. Il microchip è un\'identità legale permanente che un veterinario o un canile legge se il tuo cane viene consegnato, ed è obbligatorio per viaggiare in Europa. Un localizzatore GPS è un dispositivo di posizione in diretta che usi per ritrovare tu stesso un cane sul momento. Svolgono compiti diversi: tieni entrambi, il chip per l\'identificazione, il localizzatore per il recupero.' },
  ],
  ctaTitle: 'Stai pianificando un viaggio con il tuo cane?',
  ctaDesc: 'Sfoglia le nostre destinazioni pet-friendly in tutta Europa. Ogni guida include le regole d\'ingresso per paese, i contatti dei veterinari d\'emergenza e una mappa in diretta degli hotel pet-friendly.',
  ctaButton: 'Vedi le destinazioni pet-friendly',
  ctaHref: '/it/destinations',
}

const COPY: Record<string, Copy> = { en: EN, fr: FR, es: ES, pt: PT, de: DE, nl: NL, it: IT }

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const c = COPY[locale] ?? EN
  const sticky = STICKY_LABELS[locale] ?? STICKY_LABELS.en

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: META_TITLES[locale] ?? META_TITLES.en,
    description: META_DESCRIPTIONS[locale] ?? META_DESCRIPTIONS.en,
    datePublished: PUBLISHED,
    inLanguage: locale,
    author: { '@type': 'Organization', name: 'HotelsWithPets.com' },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets.com' },
    mainEntityOfPage: `${SITE_URL}/${locale}/guides/${SLUG}`,
  }

  return (
    <main className="bg-cream text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero */}
      <section className="relative bg-electric text-white">
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <p className="font-mono text-xs tracking-[0.2em] text-lime">{c.hero.kicker}</p>
          <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{c.hero.h1}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/90">{c.hero.tldr}</p>
        </div>
      </section>

      {/* Verdict */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="border-l-4 border-electric bg-white p-6 shadow-hard">
          <h2 className="font-display text-2xl">{c.verdict.title}</h2>
          <p className="mt-3 text-lg leading-relaxed">{c.verdict.body}</p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="overflow-x-auto border border-ink">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">{c.table.caption}</caption>
            <thead>
              <tr className="bg-ink text-white">
                {c.table.head.map((h) => (
                  <th key={h} className="whitespace-nowrap p-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.table.rows.map((row, i) => (
                <tr key={i} className={i % 2 ? 'bg-white' : 'bg-lavender-soft'}>
                  {row.map((cell, j) => (
                    <td key={j} className={`p-3 align-top ${j === 0 ? 'font-semibold' : ''}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <h2 className="font-display text-3xl">{c.productsTitle}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {c.products.map((p) => (
            <div key={p.name} className="flex flex-col border border-ink bg-white p-6 shadow-hard">
              <h3 className="font-display text-2xl">{p.name}</h3>
              <p className="mt-1 text-sm text-slate">{p.tagline}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {p.pros.map((pro, i) => (
                  <li key={i} className="flex gap-2"><span aria-hidden className="text-electric">+</span><span>{pro}</span></li>
                ))}
              </ul>
              <ul className="mt-3 space-y-2 text-sm">
                {p.cons.map((con, i) => (
                  <li key={i} className="flex gap-2"><span aria-hidden className="text-coral">-</span><span>{con}</span></li>
                ))}
              </ul>
              <a href={p.href} target="_blank" rel="nofollow noopener" className="mt-5 inline-block font-semibold text-electric underline">{p.hrefLabel}</a>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate">{c.disclosure}</p>
      </section>

      {/* Profiles */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl">{c.profilesTitle}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {c.profiles.map((pr, i) => (
            <div key={i} className="border border-ink bg-white p-5">
              <p className="font-semibold">{pr.who}</p>
              <p className="mt-2 font-display text-xl text-electric">{pr.pick}</p>
              <p className="mt-2 text-sm leading-relaxed">{pr.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="font-display text-3xl">{c.faqTitle}</h2>
        <div className="mt-6 space-y-4">
          {c.faqs.map((f, i) => (
            <details key={i} className="group border border-ink bg-white p-5">
              <summary className="cursor-pointer font-semibold">{f.q}</summary>
              <p className="mt-3 text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-electric text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <h2 className="font-display text-3xl">{c.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">{c.ctaDesc}</p>
          <Link href={c.ctaHref} className="mt-6 inline-block bg-lime px-6 py-3 font-semibold text-ink">{c.ctaButton}</Link>
        </div>
      </section>

      <GuideFooter locale={locale} currentSlug={SLUG} />
      <StickyHotelCTA label={sticky.label} cta={sticky.cta} href={`/${locale}/destinations`} />
    </main>
  )
}
