import Link from 'next/link'
import { GuideFooter } from '../_components/GuideFooter'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'

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
    en: 'Flying with Your Pet in Europe: Which Airlines Allow Dogs & Cats (2025) | HotelsWithPets.com',
    fr: 'Prendre l\'avion avec son animal en Europe : quelles compagnies acceptent chiens et chats (2025) | HotelsWithPets.com',
    es: 'Volar con mascota en Europa: qué aerolíneas aceptan perros y gatos (2025) | HotelsWithPets.com',
  }
  const descriptions: Record<string, string> = {
    en: 'Complete guide to flying with a pet in Europe. Airline-by-airline comparison: Air France, Lufthansa, KLM, Iberia, Vueling and more. Cabin vs hold, weight limits, carrier requirements, breed restrictions and booking tips.',
    fr: 'Guide complet pour voyager en avion avec son animal de compagnie en Europe. Comparatif compagnie par compagnie : Air France, Lufthansa, KLM, Iberia, Vueling et plus. Cabine vs soute, limites de poids, dimensions de la caisse, races interdites.',
    es: 'Guía completa para volar con mascota en Europa. Comparativa por aerolínea: Air France, Lufthansa, KLM, Iberia, Vueling y más. Cabina vs bodega, límites de peso, medidas del transportín, razas prohibidas y consejos de reserva.',
  }

  const today = new Date().toISOString().split('T')[0]

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/avion-animal`,
      languages: {
        en: `${SITE_URL}/en/guides/avion-animal`,
        fr: `${SITE_URL}/fr/guides/avion-animal`,
        es: `${SITE_URL}/es/guides/avion-animal`,
        'x-default': `${SITE_URL}/en/guides/avion-animal`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      type: 'article',
      publishedTime: '2025-01-01T00:00:00Z',
      modifiedTime: `${today}T00:00:00Z`,
    },
  }
}

// ─── Airline data ───────────────────────────────────────────────────────────

type CabinPolicy = 'yes' | 'no' | 'cargo-only'

interface AirlineRow {
  name: string
  flag: string
  cabin: CabinPolicy
  hold: boolean
  cabinPrice: Record<string, string>
  holdPrice: Record<string, string>
  weightLimitCabin: string
  carrierMax: string
  snubNosed: Record<string, string>
  bookingProcess: Record<string, string>
}

const AIRLINES: AirlineRow[] = [
  {
    name: 'Air France',
    flag: '🇫🇷',
    cabin: 'yes',
    hold: true,
    cabinPrice: {
      en: '€70 (domestic FR) / €125 (Europe) / €200 (long-haul)',
      fr: '70 € (France) / 125 € (Europe) / 200 € (long-courrier)',
      es: '70 € (Francia) / 125 € (Europa) / 200 € (largo radio)',
    },
    holdPrice: {
      en: '€100 (domestic FR) / €200 (Europe) / €400 (long-haul)',
      fr: '100 € (France) / 200 € (Europe) / 400 € (long-courrier)',
      es: '100 € (Francia) / 200 € (Europa) / 400 € (largo radio)',
    },
    weightLimitCabin: '8 kg (pet + carrier)',
    carrierMax: '46 × 28 × 24 cm',
    snubNosed: {
      en: 'Snub-nosed breeds allowed in cabin; BANNED in hold',
      fr: 'Races camus acceptées en cabine ; INTERDITES en soute',
      es: 'Razas braquicéfalas aceptadas en cabina; PROHIBIDAS en bodega',
    },
    bookingProcess: {
      en: 'Book online or call Air France; add pet after booking via "My Bookings"',
      fr: 'Réservez en ligne ou par téléphone ; ajoutez l\'animal via "Mes réservations"',
      es: 'Reserva online o por teléfono; añade la mascota en "Mis reservas"',
    },
  },
  {
    name: 'Lufthansa',
    flag: '🇩🇪',
    cabin: 'yes',
    hold: true,
    cabinPrice: {
      en: '€55 (domestic DE) / €70–€100 (Europe) / €110–€160 (long-haul)',
      fr: '55 € (Allemagne) / 70–100 € (Europe) / 110–160 € (long-courrier)',
      es: '55 € (Alemania) / 70–100 € (Europa) / 110–160 € (largo radio)',
    },
    holdPrice: {
      en: 'Calculated by weight — contact Lufthansa cargo',
      fr: 'Calculé au poids — contacter Lufthansa cargo',
      es: 'Calculado por peso — contactar Lufthansa cargo',
    },
    weightLimitCabin: '8 kg (pet + carrier)',
    carrierMax: '55 × 40 × 23 cm',
    snubNosed: {
      en: 'Snub-nosed breeds NOT accepted in hold; cabin may be possible if weight permits',
      fr: 'Races camus NON acceptées en soute ; cabine possible si poids OK',
      es: 'Razas braquicéfalas NO aceptadas en bodega; cabina posible si el peso lo permite',
    },
    bookingProcess: {
      en: 'Add pet during booking or via Manage My Booking; advance reservation required',
      fr: 'Ajoutez l\'animal lors de la réservation ou via Gérer ma réservation',
      es: 'Añade la mascota al reservar o en Gestionar mi reserva; reserva anticipada obligatoria',
    },
  },
  {
    name: 'KLM',
    flag: '🇳🇱',
    cabin: 'yes',
    hold: true,
    cabinPrice: {
      en: '~€50–€75 (Europe routes)',
      fr: '~50–75 € (vols européens)',
      es: '~50–75 € (vuelos europeos)',
    },
    holdPrice: {
      en: 'Up to 3 pets, combined weight < 75 kg; price on request',
      fr: 'Jusqu\'à 3 animaux, poids combiné < 75 kg ; prix sur demande',
      es: 'Hasta 3 animales, peso combinado < 75 kg; precio a consultar',
    },
    weightLimitCabin: '8 kg (pet + carrier)',
    carrierMax: '46 × 28 × 24 cm',
    snubNosed: {
      en: 'English Bulldog, French Bulldog, Boston Terrier, Pug: BANNED in hold; cabin only if weight allows',
      fr: 'Bulldog anglais, Bouledogue français, Boston Terrier, Carlin : INTERDITS en soute ; cabine si poids OK',
      es: 'Bulldog inglés, Bulldog francés, Boston Terrier, Pug: PROHIBIDOS en bodega; cabina si el peso permite',
    },
    bookingProcess: {
      en: 'Book online; add pet via My Trip or call KLM; not accepted to UK',
      fr: 'Réservez en ligne ; ajoutez l\'animal via Mon voyage ou par téléphone ; non accepté vers le Royaume-Uni',
      es: 'Reserva online; añade la mascota en Mi viaje o llama a KLM; no aceptado a Reino Unido',
    },
  },
  {
    name: 'British Airways',
    flag: '🇬🇧',
    cabin: 'no',
    hold: false,
    cabinPrice: {
      en: 'Not accepted',
      fr: 'Non accepté',
      es: 'No aceptado',
    },
    holdPrice: {
      en: 'Not accepted as passenger baggage — cargo only via approved partner IAG Cargo',
      fr: 'Non accepté en bagages — fret uniquement via IAG Cargo',
      es: 'No aceptado como equipaje — solo flete vía IAG Cargo',
    },
    weightLimitCabin: '—',
    carrierMax: '—',
    snubNosed: {
      en: 'N/A — no pets in cabin or hold as passenger baggage',
      fr: 'N/A — aucun animal en cabine ou soute comme bagages',
      es: 'N/A — sin mascotas en cabina ni bodega como equipaje',
    },
    bookingProcess: {
      en: 'Contact IAG Cargo directly for freight shipment',
      fr: 'Contacter IAG Cargo directement pour fret',
      es: 'Contactar IAG Cargo directamente para envío de carga',
    },
  },
  {
    name: 'Iberia',
    flag: '🇪🇸',
    cabin: 'yes',
    hold: true,
    cabinPrice: {
      en: '€50 (domestic Spain) / €60 (international)',
      fr: '50 € (Espagne) / 60 € (international)',
      es: '50 € (doméstico España) / 60 € (internacional)',
    },
    holdPrice: {
      en: 'Available; contact Iberia for pricing',
      fr: 'Disponible ; contacter Iberia pour le tarif',
      es: 'Disponible; consultar precio con Iberia',
    },
    weightLimitCabin: '8 kg (pet + carrier)',
    carrierMax: '45 × 35 × 25 cm',
    snubNosed: {
      en: 'Restricted breeds may not travel in hold; check directly with Iberia',
      fr: 'Les races restreintes peuvent ne pas voyager en soute ; vérifier avec Iberia',
      es: 'Las razas restringidas pueden no viajar en bodega; verificar con Iberia',
    },
    bookingProcess: {
      en: 'Add pet when booking on iberia.com or call; max 2 pets per flight',
      fr: 'Ajoutez l\'animal à la réservation sur iberia.com ou par téléphone ; max 2 animaux par vol',
      es: 'Añade la mascota al reservar en iberia.com o llama; máx. 2 mascotas por vuelo',
    },
  },
  {
    name: 'Vueling',
    flag: '🇪🇸',
    cabin: 'yes',
    hold: false,
    cabinPrice: {
      en: '€50 (domestic Spain) / €60 (international / Canary Islands)',
      fr: '50 € (Espagne) / 60 € (international / Canaries)',
      es: '50 € (España) / 60 € (internacional / Canarias)',
    },
    holdPrice: {
      en: 'Not available',
      fr: 'Non disponible',
      es: 'No disponible',
    },
    weightLimitCabin: '8 kg (pet + carrier)',
    carrierMax: '45 × 39 × 21 cm (soft-sided only)',
    snubNosed: {
      en: 'Check directly with Vueling; generally cabin-only if small enough',
      fr: 'Vérifier avec Vueling ; généralement cabine seulement si assez petit',
      es: 'Verificar con Vueling; generalmente solo cabina si es suficientemente pequeño',
    },
    bookingProcess: {
      en: 'Add during booking on vueling.com; max 5 pets per flight',
      fr: 'Ajoutez lors de la réservation sur vueling.com ; max 5 animaux par vol',
      es: 'Añade al reservar en vueling.com; máx. 5 mascotas por vuelo',
    },
  },
  {
    name: 'Swiss (SWISS)',
    flag: '🇨🇭',
    cabin: 'yes',
    hold: true,
    cabinPrice: {
      en: '70 CHF (~€75) per flight segment',
      fr: '70 CHF (~75 €) par segment de vol',
      es: '70 CHF (~75 €) por tramo de vuelo',
    },
    holdPrice: {
      en: '120 CHF/kg up to 20 kg; 150 CHF/kg above 20 kg',
      fr: '120 CHF/kg jusqu\'à 20 kg ; 150 CHF/kg au-delà',
      es: '120 CHF/kg hasta 20 kg; 150 CHF/kg más de 20 kg',
    },
    weightLimitCabin: '8 kg (pet + carrier)',
    carrierMax: '55 × 40 × 23 cm',
    snubNosed: {
      en: 'Snub-nosed breeds restricted in hold; cabin travel possible if weight limit met',
      fr: 'Races camus restreintes en soute ; cabine possible si limite de poids respectée',
      es: 'Razas braquicéfalas restringidas en bodega; cabina posible si se cumple el límite de peso',
    },
    bookingProcess: {
      en: 'Book at swiss.com or call; reserve pet space in advance as spots are limited',
      fr: 'Réservez sur swiss.com ou par téléphone ; réservez tôt, places limitées',
      es: 'Reserva en swiss.com o llama; reserva con antelación, plazas limitadas',
    },
  },
  {
    name: 'Austrian Airlines',
    flag: '🇦🇹',
    cabin: 'yes',
    hold: true,
    cabinPrice: {
      en: '€65–€125 depending on destination',
      fr: '65–125 € selon la destination',
      es: '65–125 € según el destino',
    },
    holdPrice: {
      en: 'Available; contact Austrian for pricing',
      fr: 'Disponible ; contacter Austrian pour le tarif',
      es: 'Disponible; consultar precio con Austrian',
    },
    weightLimitCabin: '8 kg (pet + carrier)',
    carrierMax: '55 × 40 × 23 cm',
    snubNosed: {
      en: 'Brachycephalic breeds restricted or banned in hold; verify before booking',
      fr: 'Races brachycéphales restreintes ou interdites en soute ; vérifier avant de réserver',
      es: 'Razas braquicéfalas restringidas o prohibidas en bodega; verificar antes de reservar',
    },
    bookingProcess: {
      en: 'Add pet during booking or via Manage Booking on austrianairlines.com',
      fr: 'Ajoutez l\'animal lors de la réservation ou via Gérer ma réservation',
      es: 'Añade la mascota al reservar o en Gestionar reserva en austrianairlines.com',
    },
  },
  {
    name: 'TAP Air Portugal',
    flag: '🇵🇹',
    cabin: 'yes',
    hold: true,
    cabinPrice: {
      en: '~€50–€75 (European routes)',
      fr: '~50–75 € (vols européens)',
      es: '~50–75 € (vuelos europeos)',
    },
    holdPrice: {
      en: 'Available; contact TAP for pricing',
      fr: 'Disponible ; contacter TAP pour le tarif',
      es: 'Disponible; consultar precio con TAP',
    },
    weightLimitCabin: '8 kg (pet + carrier)',
    carrierMax: '45 × 35 × 25 cm',
    snubNosed: {
      en: 'Snub-nosed breeds may be restricted in hold; verify with TAP',
      fr: 'Races camus peuvent être restreintes en soute ; vérifier avec TAP',
      es: 'Razas braquicéfalas pueden estar restringidas en bodega; verificar con TAP',
    },
    bookingProcess: {
      en: 'Book at flytap.com and add pet during or after booking',
      fr: 'Réservez sur flytap.com et ajoutez l\'animal à la réservation',
      es: 'Reserva en flytap.com y añade la mascota durante o después de la reserva',
    },
  },
  {
    name: 'Transavia',
    flag: '🇫🇷',
    cabin: 'yes',
    hold: false,
    cabinPrice: {
      en: 'Varies by route; check transavia.com',
      fr: 'Varie selon le trajet ; voir transavia.com',
      es: 'Varía según la ruta; consultar transavia.com',
    },
    holdPrice: {
      en: 'Not available',
      fr: 'Non disponible',
      es: 'No disponible',
    },
    weightLimitCabin: '8 kg (pet + carrier)',
    carrierMax: '40 × 30 × 24 cm',
    snubNosed: {
      en: 'Cabin only; snub-nosed policy — check directly',
      fr: 'Cabine uniquement ; politique camus — vérifier directement',
      es: 'Solo cabina; política braquicéfalos — verificar directamente',
    },
    bookingProcess: {
      en: 'Add pet via transavia.com after booking; limited to 1 pet per passenger',
      fr: 'Ajoutez l\'animal sur transavia.com après réservation ; limité à 1 animal par passager',
      es: 'Añade la mascota en transavia.com tras reservar; limitado a 1 mascota por pasajero',
    },
  },
]

// ─── Brachycephalic breeds ──────────────────────────────────────────────────

const BRACHY_DOGS = [
  'Bouledogue Français / French Bulldog',
  'Bouledogue Anglais / English Bulldog',
  'Boston Terrier',
  'Carlin / Pug',
  'Boxer',
  'Pékinois / Pekingese',
  'Shih Tzu',
  'Bullmastiff',
  'Dogue de Bordeaux',
  'Griffon Bruxellois / Brussels Griffon',
  'Chow Chow',
  'Lhasa Apso',
  'Shar-Pei',
]

const BRACHY_CATS = [
  'Persan / Persian',
  'Himalayen / Himalayan',
  'Burmese',
  'Exotic Shorthair',
  'Scottish Fold',
]

// ─── Copy ───────────────────────────────────────────────────────────────────

const COPY = {
  fr: {
    hero: 'Prendre l\'avion avec son animal en Europe : guide complet 2025',
    subtitle: 'Cabine ou soute, poids autorisé, races interdites, prix par compagnie... Tout ce que vous devez savoir avant de voler avec votre chien ou chat en Europe.',
    lastUpdate: 'Mis à jour en',
    badge: 'Guide pratique',
    sourcesTitle: 'Sources vérifiées',
    sourcesText: 'Ce guide est basé sur les politiques officielles publiées par chaque compagnie aérienne. Les tarifs et conditions sont susceptibles de changer — vérifiez toujours directement auprès de la compagnie avant de réserver.',
    quickDecision: 'Cabine ou soute ? Guide rapide',
    quickDecisionItems: [
      { icon: '✅', title: 'Voyage en cabine possible si…', points: ['Votre animal pèse moins de 8 kg (y compris la caisse)', 'La caisse respecte les dimensions autorisées (≈ 46 × 28 × 24 cm)', 'La compagnie accepte les animaux en cabine (Air France, Lufthansa, KLM, Iberia…)', 'Votre race n\'est pas restreinte', 'Vous avez réservé une place à l\'avance (places limitées)'] },
      { icon: '📦', title: 'Soute nécessaire si…', points: ['Votre animal pèse entre 8 et 75 kg avec sa caisse', 'Votre compagnie ne permet pas la cabine', 'Voyage long-courrier avec certaines compagnies', 'Toujours exiger une soute climatisée et pressurisée'] },
      { icon: '🚫', title: 'Aucune option disponible si…', points: ['Vous volez sur Ryanair, easyJet ou Wizz Air (zéro animal accepté)', 'British Airways (animaux refusés en bagages, fret uniquement)', 'Votre animal est trop grand ou trop lourd pour les critères de la compagnie'] },
    ],
    tableTitle: 'Comparatif des compagnies',
    tableHeaders: {
      airline: 'Compagnie',
      cabin: 'Cabine',
      hold: 'Soute',
      cabinPrice: 'Tarif cabine',
      holdPrice: 'Tarif soute',
      weight: 'Poids max cabine',
      carrier: 'Dimensions caisse',
      snubNosed: 'Races camus',
    },
    yes: 'Oui',
    no: 'Non',
    cargoOnly: 'Fret uniquement',
    lowCostTitle: 'Low-cost : aucun animal accepté',
    lowCostText: 'Ryanair, easyJet et Wizz Air n\'acceptent aucun animal de compagnie en cabine ni en soute, à l\'exception des chiens d\'assistance certifiés. Si vous volez low-cost, vous devrez trouver une autre solution pour votre animal.',
    cabinVsHoldTitle: 'Cabine vs soute : ce qu\'il faut savoir',
    cabinPoints: [
      { title: 'Avantages de la cabine', points: ['Votre animal reste sous votre siège — vous le voyez et l\'entendez', 'Moins de stress pour l\'animal (pas de séparation)', 'Pas de risque de perte de bagages', 'Température et pression identiques à la cabine passagers'] },
      { title: 'Conditions requises', points: ['Poids max : 8 kg (animal + caisse)', 'Caisse souple sous le siège uniquement', 'L\'animal doit rester dans la caisse pendant tout le vol', '1 animal par passager en général', 'Nombre de places limité par vol — réservez tôt'] },
    ],
    holdPoints: [
      { title: 'Soute pressurisée', points: ['Les soutes modernes sont pressurisées et climatisées (15–25°C)', 'Recommandé pour les animaux de plus de 8 kg', 'La caisse doit répondre aux normes IATA (rigide, ventilée, sécurisée)'] },
      { title: 'Précautions importantes', points: ['Stress accru pour l\'animal (séparation, obscurité, bruit)', 'Les races brachycéphales sont très souvent interdites en soute', 'Évitez les vols en correspondance complexe', 'Toujours confirmer que la soute est pressurisée', 'Consultez votre vétérinaire avant tout vol en soute'] },
    ],
    carrierTitle: 'Exigences pour la caisse de transport',
    carrierCabin: {
      title: 'Caisse cabine (sous le siège)',
      points: [
        'Caisse SOUPLE obligatoire pour la cabine (les caisses rigides ne passent pas sous le siège)',
        'Dimensions typiques : 46 × 28 × 24 cm (vérifiez la compagnie)',
        'Matière : tissu maillé ou similaire, imperméable en dessous',
        'L\'animal doit pouvoir se retourner et s\'asseoir normalement',
        'Fermeture sécurisée (zip ou boucle) — pas de simple velcro',
        'Pas de roues — doit rester dans la caisse en soute du siège',
      ],
    },
    carrierHold: {
      title: 'Caisse soute (normes IATA)',
      points: [
        'Caisse RIGIDE obligatoire (plastique, fibre de verre ou métal)',
        'Fond, haut et côtés sécurisés avec boulons métalliques (pas de clips plastique)',
        'Porte en métal soudé avec loquet sécurisé',
        'Ventilation sur les 4 côtés (16 % min. de la surface totale)',
        'Bac collecteur d\'urine intégré',
        'L\'animal doit pouvoir se retourner, s\'asseoir et se coucher normalement',
        'Libellé "Live Animal" sur la caisse, avec flèches d\'orientation',
      ],
    },
    brachyTitle: 'Races restreintes ou interdites en avion',
    brachyIntro: 'Les races brachycéphales (à museau court) sont particulièrement sensibles aux changements de pression et de température en vol. La grande majorité des compagnies les interdisent en soute pour des raisons de sécurité et de bien-être animal.',
    brachyDogs: 'Races canines brachycéphales',
    brachyCats: 'Races félines brachycéphales',
    brachyWarning: 'Ces races peuvent généralement voyager en cabine si elles respectent la limite de poids (8 kg avec la caisse). La soute leur est quasiment systématiquement refusée. Consultez toujours la compagnie avant de réserver.',
    bookingTitle: 'Comment réserver et voyager avec son animal',
    bookingSteps: [
      {
        step: '1. Avant la réservation',
        points: [
          'Vérifiez la politique de la compagnie (nombre d\'animaux par vol limité)',
          'Pesez votre animal avec la caisse — les 8 kg sont souvent dépassés avec une grande caisse',
          'Préparez le passeport européen pour animaux (puce ISO + vaccin rage à jour)',
          'Consultez votre vétérinaire : stress, médicaments, restrictions de race',
        ],
      },
      {
        step: '2. À la réservation',
        points: [
          'Ajoutez l\'animal dès la réservation (ou immédiatement après)',
          'Ne comptez pas sur le fait d\'ajouter l\'animal à l\'aéroport — refus fréquent',
          'Payez les frais animaux en ligne ou par téléphone',
          'Gardez la confirmation avec numéro de référence',
        ],
      },
      {
        step: '3. Documents nécessaires',
        points: [
          'Passeport européen pour animaux (puce + vaccin rage valide)',
          'Certificat de santé récent du vétérinaire (certaines compagnies l\'exigent)',
          'Carnet de vaccination à jour',
          'Pour les pays hors UE : documents spécifiques au pays de destination',
        ],
      },
      {
        step: '4. À l\'aéroport',
        points: [
          'Présentez-vous à l\'enregistrement avec votre animal (guichet humain, pas borne)',
          'Prévoyez un délai supplémentaire (contrôle vétérinaire possible)',
          'Votre animal doit rester dans la caisse fermée pendant tout l\'aéroport',
          'En soute : remettre la caisse au service bagages spéciaux',
        ],
      },
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Mon chien peut-il voyager en cabine dans l\'avion ?',
        a: 'Oui, si votre chien pèse moins de 8 kg avec sa caisse et que vous volez sur une compagnie qui accepte les animaux en cabine (Air France, Lufthansa, KLM, Iberia, Vueling, Swiss, Austrian, TAP, Transavia). Les places sont limitées — réservez dès que possible.',
      },
      {
        q: 'Ryanair accepte-t-il les animaux de compagnie ?',
        a: 'Non. Ryanair n\'accepte aucun animal de compagnie, ni en cabine ni en soute. Seuls les chiens d\'assistance certifiés sont autorisés. Il en va de même pour easyJet et Wizz Air. Pour voyager avec un animal, vous devez choisir une compagnie classique comme Air France, Lufthansa ou KLM.',
      },
      {
        q: 'Quelles races sont interdites en avion ?',
        a: 'Les races brachycéphales (à museau plat) comme le Bouledogue Français, le Carlin, le Boston Terrier ou le Shih Tzu sont interdites en soute par la quasi-totalité des compagnies européennes. Ces races peuvent généralement voyager en cabine si elles respectent la limite de poids de 8 kg (animal + caisse).',
      },
      {
        q: 'Ai-je besoin d\'un passeport animal pour prendre l\'avion en Europe ?',
        a: 'Oui. Le passeport européen pour animaux est obligatoire pour voyager avec un chien ou un chat à l\'intérieur de l\'Union européenne. Il doit mentionner la puce ISO et le vaccin antirabique valide. Certaines compagnies demandent aussi un certificat de santé récent de moins de 10 jours.',
      },
      {
        q: 'Quelle est la taille maximale de la caisse en cabine ?',
        a: 'Les dimensions varient légèrement selon la compagnie, mais la norme est environ 46 × 28 × 24 cm pour Air France et KLM, 55 × 40 × 23 cm pour Lufthansa et Swiss. La caisse doit être souple pour passer sous le siège. Vérifiez toujours les dimensions exactes de votre compagnie.',
      },
      {
        q: 'Peut-on voyager en soute avec un grand chien ?',
        a: 'Oui, la soute est la solution pour les chiens de plus de 8 kg (avec caisse). La caisse doit respecter les normes IATA (rigide, ventilée, avec système de collecte des urines). Vérifiez que la soute est bien pressurisée et climatisée — c\'est le cas sur les vols commerciaux modernes. Évitez ce mode pour les races brachycéphales.',
      },
      {
        q: 'Combien coûte un billet d\'avion pour mon animal ?',
        a: 'Les tarifs varient de 50 € à 200 € par trajet pour la cabine, selon la compagnie et la destination. Air France facture 70 € en France et 125 € en Europe. Lufthansa de 55 € à 100 € en Europe. Ces frais s\'ajoutent à votre billet passager et ne donnent pas droit à un siège séparé.',
      },
    ],
    relatedTitle: 'Guides associés',
    relatedPassport: 'Passeport animal : tout savoir',
    relatedGuides: 'Tous nos guides voyageur',
    relatedHotels: 'Hôtels acceptant les animaux en Europe',
    internalLinksTitle: 'En savoir plus',
  },
  en: {
    hero: 'Flying with Your Pet in Europe: Complete 2025 Guide',
    subtitle: 'Cabin or hold, weight limits, breed restrictions, prices per airline... Everything you need to know before flying with your dog or cat in Europe.',
    lastUpdate: 'Updated in',
    badge: 'Practical guide',
    sourcesTitle: 'Verified sources',
    sourcesText: 'This guide is based on official policies published by each airline. Prices and conditions are subject to change — always verify directly with the airline before booking.',
    quickDecision: 'Cabin or hold? Quick decision guide',
    quickDecisionItems: [
      { icon: '✅', title: 'Cabin travel is possible if…', points: ['Your pet weighs under 8 kg including carrier', 'The carrier fits within the permitted dimensions (approx. 46 × 28 × 24 cm)', 'Your airline accepts pets in cabin (Air France, Lufthansa, KLM, Iberia…)', 'Your breed is not restricted', 'You have reserved a spot in advance (limited per flight)'] },
      { icon: '📦', title: 'Hold travel is needed if…', points: ['Your pet weighs between 8 and 75 kg with carrier', 'Your airline does not allow cabin pets', 'Long-haul flights with certain airlines', 'Always confirm the hold is pressurised and temperature-controlled'] },
      { icon: '🚫', title: 'No option available if…', points: ['You are flying Ryanair, easyJet or Wizz Air (zero pets accepted)', 'British Airways (pets refused as passenger baggage — freight only)', 'Your pet exceeds the airline\'s size or weight criteria'] },
    ],
    tableTitle: 'Airline comparison',
    tableHeaders: {
      airline: 'Airline',
      cabin: 'Cabin',
      hold: 'Hold',
      cabinPrice: 'Cabin fee',
      holdPrice: 'Hold fee',
      weight: 'Max cabin weight',
      carrier: 'Carrier dimensions',
      snubNosed: 'Snub-nosed policy',
    },
    yes: 'Yes',
    no: 'No',
    cargoOnly: 'Freight only',
    lowCostTitle: 'Low-cost airlines: no pets accepted',
    lowCostText: 'Ryanair, easyJet and Wizz Air do not accept any pets in the cabin or hold, with the sole exception of certified assistance dogs. If you are flying low-cost, you will need to make alternative arrangements for your pet.',
    cabinVsHoldTitle: 'Cabin vs hold: what you need to know',
    cabinPoints: [
      { title: 'Benefits of cabin travel', points: ['Your pet stays under your seat — you can see and hear them', 'Less stress for the animal (no separation)', 'No risk of lost baggage', 'Same temperature and pressure as the passenger cabin'] },
      { title: 'Requirements', points: ['Max weight: 8 kg (pet + carrier)', 'Soft-sided carrier under the seat only', 'Pet must remain in the carrier throughout the flight', 'Generally 1 pet per passenger', 'Limited spots per flight — book early'] },
    ],
    holdPoints: [
      { title: 'Pressurised hold', points: ['Modern holds are pressurised and temperature-controlled (15–25°C)', 'Recommended for pets over 8 kg', 'Carrier must meet IATA standards (rigid, ventilated, secure)'] },
      { title: 'Important precautions', points: ['Increased stress for the animal (separation, darkness, noise)', 'Brachycephalic breeds are almost universally banned from the hold', 'Avoid complex connecting flights', 'Always confirm the hold is pressurised', 'Consult your vet before any hold flight'] },
    ],
    carrierTitle: 'Carrier requirements',
    carrierCabin: {
      title: 'Cabin carrier (under the seat)',
      points: [
        'SOFT-SIDED carrier required for cabin (hard-sided will not fit under the seat)',
        'Typical dimensions: 46 × 28 × 24 cm (verify with your airline)',
        'Material: mesh fabric or similar, waterproof base',
        'Pet must be able to turn around and sit up normally',
        'Secure fastening (zip or buckle) — no simple velcro',
        'No wheels — must slide under the seat',
      ],
    },
    carrierHold: {
      title: 'Hold carrier (IATA standards)',
      points: [
        'RIGID carrier required (hard plastic, fibreglass or metal)',
        'Floor, roof and sides secured with metal nuts and bolts (not plastic clips)',
        'Single-piece welded or cast metal door with secure latch',
        'Ventilation on all 4 sides (minimum 16% of total surface area)',
        'Integrated urine collection tray',
        'Pet must be able to turn around, sit and lie down normally',
        '"Live Animal" label on the crate, with orientation arrows',
      ],
    },
    brachyTitle: 'Restricted or banned breeds',
    brachyIntro: 'Brachycephalic (flat-faced) breeds are particularly sensitive to changes in air pressure and temperature during flight. The vast majority of airlines ban them from the hold for safety and animal welfare reasons.',
    brachyDogs: 'Brachycephalic dog breeds',
    brachyCats: 'Brachycephalic cat breeds',
    brachyWarning: 'These breeds can generally travel in the cabin if they meet the weight limit (8 kg including carrier). Hold travel is almost always refused. Always check with your airline before booking.',
    bookingTitle: 'How to book and travel with your pet',
    bookingSteps: [
      {
        step: '1. Before booking',
        points: [
          'Check the airline\'s pet policy (number of pets per flight is limited)',
          'Weigh your pet with the carrier — the 8 kg limit is often reached with a larger crate',
          'Prepare the EU pet passport (ISO microchip + valid rabies vaccination)',
          'Consult your vet: stress, medication, breed restrictions',
        ],
      },
      {
        step: '2. At booking',
        points: [
          'Add your pet as soon as you book (or immediately after)',
          'Do not count on adding the pet at the airport — refusal is common',
          'Pay the pet fee online or by phone',
          'Keep your confirmation with a reference number',
        ],
      },
      {
        step: '3. Required documents',
        points: [
          'EU pet passport (ISO chip + valid rabies vaccination)',
          'Recent health certificate from your vet (some airlines require this)',
          'Up-to-date vaccination record',
          'For non-EU countries: destination-specific documents',
        ],
      },
      {
        step: '4. At the airport',
        points: [
          'Check in at the staffed desk (not a self-service kiosk) with your pet',
          'Allow extra time (veterinary check may be required)',
          'Your pet must remain in the closed carrier throughout the airport',
          'For hold travel: hand the crate to the oversized baggage desk',
        ],
      },
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Can my dog travel in the aircraft cabin?',
        a: 'Yes, if your dog weighs under 8 kg including the carrier and you are flying with an airline that accepts pets in cabin (Air France, Lufthansa, KLM, Iberia, Vueling, Swiss, Austrian, TAP, Transavia). Spots are limited — book as early as possible.',
      },
      {
        q: 'Does Ryanair accept pets?',
        a: 'No. Ryanair does not accept any pets, either in the cabin or in the hold. Only certified assistance dogs are allowed. The same applies to easyJet and Wizz Air. To travel with a pet you must choose a full-service carrier such as Air France, Lufthansa or KLM.',
      },
      {
        q: 'Which breeds are banned from flying?',
        a: 'Brachycephalic (flat-faced) breeds such as French Bulldog, Pug, Boston Terrier and Shih Tzu are banned from the hold by virtually all European airlines. These breeds can generally travel in the cabin if they meet the 8 kg weight limit (pet + carrier).',
      },
      {
        q: 'Do I need a pet passport to fly within Europe?',
        a: 'Yes. The EU pet passport is mandatory when travelling with a dog or cat within the European Union. It must show the ISO microchip and a valid rabies vaccination. Some airlines also require a recent health certificate (issued within 10 days of travel).',
      },
      {
        q: 'What is the maximum carrier size in the cabin?',
        a: 'Dimensions vary slightly by airline, but the standard is approximately 46 × 28 × 24 cm for Air France and KLM, and 55 × 40 × 23 cm for Lufthansa and Swiss. The carrier must be soft-sided to fit under the seat. Always check the exact dimensions with your airline.',
      },
      {
        q: 'Can a large dog travel in the hold?',
        a: 'Yes, the hold is the solution for dogs over 8 kg (with carrier). The crate must meet IATA standards (rigid, ventilated, with urine collection). Confirm the hold is pressurised and temperature-controlled — this is standard on modern commercial aircraft. Avoid this option for brachycephalic breeds.',
      },
      {
        q: 'How much does it cost to fly with a pet?',
        a: 'Cabin fees range from €50 to €200 per journey depending on the airline and destination. Air France charges €70 within France and €125 for European routes. Lufthansa charges €55–€100 within Europe. These fees are in addition to your passenger ticket and do not grant a separate seat.',
      },
    ],
    relatedTitle: 'Related guides',
    relatedPassport: 'EU pet passport: everything you need to know',
    relatedGuides: 'All our travel guides',
    relatedHotels: 'Pet-friendly hotels in Europe',
    internalLinksTitle: 'Learn more',
  },
  es: {
    hero: 'Volar con mascota en Europa: guía completa 2025',
    subtitle: 'Cabina o bodega, límites de peso, razas prohibidas, precios por aerolínea... Todo lo que necesitas saber antes de volar con tu perro o gato en Europa.',
    lastUpdate: 'Actualizado en',
    badge: 'Guía práctica',
    sourcesTitle: 'Fuentes verificadas',
    sourcesText: 'Esta guía se basa en las políticas oficiales publicadas por cada aerolínea. Los precios y condiciones pueden cambiar — verifica siempre directamente con la aerolínea antes de reservar.',
    quickDecision: '¿Cabina o bodega? Guía rápida de decisión',
    quickDecisionItems: [
      { icon: '✅', title: 'Cabina es posible si…', points: ['Tu mascota pesa menos de 8 kg incluido el transportín', 'El transportín cumple las dimensiones permitidas (aprox. 46 × 28 × 24 cm)', 'Tu aerolínea acepta mascotas en cabina (Air France, Lufthansa, KLM, Iberia…)', 'Tu raza no está restringida', 'Has reservado plaza con antelación (plazas limitadas por vuelo)'] },
      { icon: '📦', title: 'Bodega es necesaria si…', points: ['Tu mascota pesa entre 8 y 75 kg con el transportín', 'Tu aerolínea no permite mascotas en cabina', 'Vuelos de largo radio con ciertas aerolíneas', 'Confirma siempre que la bodega es presurizada y climatizada'] },
      { icon: '🚫', title: 'Sin opción disponible si…', points: ['Vuelas con Ryanair, easyJet o Wizz Air (cero mascotas aceptadas)', 'British Airways (mascotas rechazadas como equipaje — solo carga)', 'Tu mascota supera los criterios de tamaño o peso de la aerolínea'] },
    ],
    tableTitle: 'Comparativa de aerolíneas',
    tableHeaders: {
      airline: 'Aerolínea',
      cabin: 'Cabina',
      hold: 'Bodega',
      cabinPrice: 'Precio cabina',
      holdPrice: 'Precio bodega',
      weight: 'Peso máx. cabina',
      carrier: 'Medidas transportín',
      snubNosed: 'Política braquicéfalos',
    },
    yes: 'Sí',
    no: 'No',
    cargoOnly: 'Solo carga',
    lowCostTitle: 'Low-cost: ninguna mascota aceptada',
    lowCostText: 'Ryanair, easyJet y Wizz Air no aceptan ninguna mascota en cabina ni en bodega, con la única excepción de los perros de asistencia certificados. Si vuelas con una aerolínea de bajo coste, deberás buscar una alternativa para tu mascota.',
    cabinVsHoldTitle: 'Cabina vs bodega: lo que debes saber',
    cabinPoints: [
      { title: 'Ventajas de la cabina', points: ['Tu mascota permanece bajo tu asiento — puedes verla y escucharla', 'Menos estrés para el animal (sin separación)', 'Sin riesgo de pérdida de equipaje', 'Misma temperatura y presión que la cabina de pasajeros'] },
      { title: 'Requisitos', points: ['Peso máx.: 8 kg (mascota + transportín)', 'Transportín blando bajo el asiento únicamente', 'La mascota debe permanecer en el transportín durante todo el vuelo', 'Generalmente 1 mascota por pasajero', 'Plazas limitadas por vuelo — reserva con antelación'] },
    ],
    holdPoints: [
      { title: 'Bodega presurizada', points: ['Las bodegas modernas son presurizadas y climatizadas (15–25°C)', 'Recomendado para mascotas de más de 8 kg', 'El transportín debe cumplir las normas IATA (rígido, ventilado, seguro)'] },
      { title: 'Precauciones importantes', points: ['Mayor estrés para el animal (separación, oscuridad, ruido)', 'Las razas braquicéfalas están casi universalmente prohibidas en bodega', 'Evita vuelos con escalas complejas', 'Confirma siempre que la bodega es presurizada', 'Consulta a tu veterinario antes de cualquier vuelo en bodega'] },
    ],
    carrierTitle: 'Requisitos del transportín',
    carrierCabin: {
      title: 'Transportín de cabina (bajo el asiento)',
      points: [
        'Transportín BLANDO obligatorio para cabina (los rígidos no caben bajo el asiento)',
        'Dimensiones típicas: 46 × 28 × 24 cm (verifica con tu aerolínea)',
        'Material: tela de malla o similar, base impermeable',
        'La mascota debe poder darse la vuelta y sentarse normalmente',
        'Cierre seguro (cremallera o hebilla) — no solo velcro',
        'Sin ruedas — debe deslizarse bajo el asiento',
      ],
    },
    carrierHold: {
      title: 'Transportín de bodega (normas IATA)',
      points: [
        'Transportín RÍGIDO obligatorio (plástico duro, fibra de vidrio o metal)',
        'Suelo, techo y lados asegurados con tuercas y tornillos metálicos (no clips de plástico)',
        'Puerta de metal soldado o fundido con pestillo seguro',
        'Ventilación en los 4 lados (mínimo 16% de la superficie total)',
        'Bandeja colectora de orina integrada',
        'La mascota debe poder darse la vuelta, sentarse y tumbarse normalmente',
        'Etiqueta "Live Animal" en el transportín, con flechas de orientación',
      ],
    },
    brachyTitle: 'Razas restringidas o prohibidas en avión',
    brachyIntro: 'Las razas braquicéfalas (de cara plana) son especialmente sensibles a los cambios de presión y temperatura durante el vuelo. La gran mayoría de las aerolíneas las prohíben en bodega por razones de seguridad y bienestar animal.',
    brachyDogs: 'Razas caninas braquicéfalas',
    brachyCats: 'Razas felinas braquicéfalas',
    brachyWarning: 'Estas razas generalmente pueden viajar en cabina si cumplen el límite de peso (8 kg incluido el transportín). El viaje en bodega está casi siempre denegado. Consulta siempre con tu aerolínea antes de reservar.',
    bookingTitle: 'Cómo reservar y viajar con tu mascota',
    bookingSteps: [
      {
        step: '1. Antes de reservar',
        points: [
          'Verifica la política de mascotas de la aerolínea (número de animales por vuelo limitado)',
          'Pesa a tu mascota con el transportín — el límite de 8 kg se alcanza fácilmente con un transportín grande',
          'Prepara el pasaporte europeo para mascotas (microchip ISO + vacuna antirrábica válida)',
          'Consulta a tu veterinario: estrés, medicación, restricciones de raza',
        ],
      },
      {
        step: '2. Al reservar',
        points: [
          'Añade la mascota en cuanto reserves (o inmediatamente después)',
          'No cuentes con añadir la mascota en el aeropuerto — el rechazo es frecuente',
          'Paga la tarifa de mascota online o por teléfono',
          'Guarda la confirmación con número de referencia',
        ],
      },
      {
        step: '3. Documentos necesarios',
        points: [
          'Pasaporte europeo para mascotas (microchip ISO + vacuna antirrábica válida)',
          'Certificado de salud reciente del veterinario (algunas aerolíneas lo exigen)',
          'Cartilla de vacunación actualizada',
          'Para países fuera de la UE: documentos específicos del país de destino',
        ],
      },
      {
        step: '4. En el aeropuerto',
        points: [
          'Factura en el mostrador de atención personalizada (no en el quiosco automático) con tu mascota',
          'Reserva tiempo extra (puede haber control veterinario)',
          'La mascota debe permanecer en el transportín cerrado en todo el aeropuerto',
          'Para bodega: entrega el transportín en el mostrador de equipaje especial',
        ],
      },
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Puede mi perro viajar en la cabina del avión?',
        a: 'Sí, si tu perro pesa menos de 8 kg incluido el transportín y vuelas con una aerolínea que acepta mascotas en cabina (Air France, Lufthansa, KLM, Iberia, Vueling, Swiss, Austrian, TAP, Transavia). Las plazas son limitadas — reserva lo antes posible.',
      },
      {
        q: '¿Acepta Ryanair mascotas?',
        a: 'No. Ryanair no acepta ninguna mascota, ni en cabina ni en bodega. Solo se permiten los perros de asistencia certificados. Lo mismo ocurre con easyJet y Wizz Air. Para viajar con mascota debes elegir una aerolínea de red como Air France, Lufthansa o KLM.',
      },
      {
        q: '¿Qué razas están prohibidas en el avión?',
        a: 'Las razas braquicéfalas (de cara plana) como el Bulldog Francés, el Pug, el Boston Terrier y el Shih Tzu están prohibidas en bodega por prácticamente todas las aerolíneas europeas. Estas razas generalmente pueden viajar en cabina si cumplen el límite de 8 kg (mascota + transportín).',
      },
      {
        q: '¿Necesito un pasaporte de mascota para volar por Europa?',
        a: 'Sí. El pasaporte europeo para mascotas es obligatorio para viajar con perro o gato dentro de la Unión Europea. Debe incluir el microchip ISO y la vacuna antirrábica vigente. Algunas aerolíneas exigen también un certificado de salud reciente (emitido en los 10 días anteriores al viaje).',
      },
      {
        q: '¿Cuál es el tamaño máximo del transportín en cabina?',
        a: 'Las dimensiones varían ligeramente según la aerolínea, pero el estándar es aproximadamente 46 × 28 × 24 cm para Air France y KLM, y 55 × 40 × 23 cm para Lufthansa y Swiss. El transportín debe ser blando para caber bajo el asiento. Verifica siempre las medidas exactas con tu aerolínea.',
      },
      {
        q: '¿Puede un perro grande viajar en bodega?',
        a: 'Sí, la bodega es la solución para perros de más de 8 kg (con transportín). El transportín debe cumplir las normas IATA (rígido, ventilado, con bandeja colectora). Confirma que la bodega es presurizada y climatizada — es estándar en los aviones comerciales modernos. Evita esta opción para razas braquicéfalas.',
      },
      {
        q: '¿Cuánto cuesta volar con una mascota?',
        a: 'Las tarifas de cabina oscilan entre 50 € y 200 € por trayecto según la aerolínea y el destino. Air France cobra 70 € en Francia y 125 € en rutas europeas. Lufthansa cobra entre 55 € y 100 € en Europa. Estas tarifas se suman a tu billete de pasajero y no incluyen un asiento separado.',
      },
    ],
    relatedTitle: 'Guías relacionadas',
    relatedPassport: 'Pasaporte de mascota: todo lo que debes saber',
    relatedGuides: 'Todas nuestras guías de viaje',
    relatedHotels: 'Hoteles con mascotas en Europa',
    internalLinksTitle: 'Saber más',
  },
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function FlyingWithPetGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const lang = locale === 'fr' || locale === 'es' ? locale : 'en'
  const copy = COPY[lang]
  const today = new Date()
  const monthYear = today.toLocaleDateString(
    locale === 'fr' ? 'fr-FR' : locale === 'es' ? 'es-ES' : 'en-GB',
    { month: 'long', year: 'numeric' },
  )

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: copy.hero,
    description: copy.subtitle,
    datePublished: '2025-01-01',
    dateModified: today.toISOString().split('T')[0],
    author: {
      '@type': 'Person',
      name: 'HotelsWithPets Editorial',
      url: `${SITE_URL}/${locale}/about`,
      jobTitle: 'Pet Travel Editor',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HotelsWithPets.com',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 192, height: 192 },
    },
    mainEntityOfPage: `${SITE_URL}/${locale}/guides/avion-animal`,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: copy.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const cabinYes = AIRLINES.filter((a) => a.cabin === 'yes')
  const cabinNo = AIRLINES.filter((a) => a.cabin === 'no' || a.cabin === 'cargo-only')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gray-50">

        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-sky-950 to-blue-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Link href={`/${locale}/guides`} className="text-sky-300 hover:text-white text-sm transition-colors">
                {locale === 'fr' ? '← Guides' : locale === 'es' ? '← Guías' : '← Guides'}
              </Link>
              <span className="text-sky-500 text-sm">/</span>
              <span className="text-sky-400 text-sm">
                {locale === 'fr' ? 'Avion avec animal' : locale === 'es' ? 'Volar con mascota' : 'Flying with a pet'}
              </span>
            </div>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs font-medium mb-5">
              ✈️ {copy.badge} · {copy.lastUpdate} {monthYear}
            </span>
            <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">{copy.hero}</h1>
            <p className="text-sky-200 text-base leading-relaxed max-w-3xl">{copy.subtitle}</p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Sources note */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-10 flex items-start gap-3">
            <span className="text-blue-500 text-xl flex-shrink-0">🔍</span>
            <div>
              <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">{copy.sourcesTitle}</p>
              <p className="text-sm text-blue-800 leading-relaxed">{copy.sourcesText}</p>
            </div>
          </div>

          {/* Quick decision guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{copy.quickDecision}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {copy.quickDecisionItems.map((item, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border p-5 ${
                    i === 0
                      ? 'bg-emerald-50 border-emerald-100'
                      : i === 1
                      ? 'bg-amber-50 border-amber-100'
                      : 'bg-red-50 border-red-100'
                  }`}
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className={`font-bold text-sm mb-3 ${i === 0 ? 'text-emerald-800' : i === 1 ? 'text-amber-800' : 'text-red-800'}`}>
                    {item.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {item.points.map((pt, j) => (
                      <li key={j} className={`text-xs flex items-start gap-1.5 ${i === 0 ? 'text-emerald-700' : i === 1 ? 'text-amber-700' : 'text-red-700'}`}>
                        <span className="flex-shrink-0 mt-0.5">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Low-cost warning */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-10 flex items-start gap-3">
            <span className="text-red-500 text-xl flex-shrink-0">🚫</span>
            <div>
              <p className="text-sm font-bold text-red-800 mb-1">{copy.lowCostTitle}</p>
              <p className="text-sm text-red-700 leading-relaxed">{copy.lowCostText}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {['Ryanair', 'easyJet', 'Wizz Air'].map((name) => (
                  <span key={name} className="inline-flex items-center gap-1 text-xs font-semibold bg-red-100 text-red-700 border border-red-200 px-2.5 py-1 rounded-full">
                    🚫 {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Airlines comparison table */}
          <section className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{copy.tableTitle}</h2>

            {/* Cabin-yes airlines */}
            <div className="space-y-4 mb-6">
              {cabinYes.map((airline) => (
                <div key={airline.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-50">
                    <span className="text-2xl">{airline.flag}</span>
                    <h3 className="font-bold text-gray-900">{airline.name}</h3>
                    <div className="ml-auto flex gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                        ✈️ {copy.tableHeaders.cabin}: {copy.yes}
                      </span>
                      {airline.hold ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                          📦 {copy.tableHeaders.hold}: {copy.yes}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-gray-50 text-gray-500 border border-gray-200 px-2 py-0.5 rounded-full">
                          📦 {copy.tableHeaders.hold}: {copy.no}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Details grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-50">
                    <div className="px-5 py-3 space-y-2">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{copy.tableHeaders.cabinPrice}</p>
                        <p className="text-sm text-gray-700">{airline.cabinPrice[lang]}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{copy.tableHeaders.holdPrice}</p>
                        <p className="text-sm text-gray-700">{airline.holdPrice[lang]}</p>
                      </div>
                    </div>
                    <div className="px-5 py-3 space-y-2">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{copy.tableHeaders.weight}</p>
                        <p className="text-sm text-gray-700">{airline.weightLimitCabin}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{copy.tableHeaders.carrier}</p>
                        <p className="text-sm text-gray-700">{airline.carrierMax}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/50 space-y-1.5">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{copy.tableHeaders.snubNosed}</p>
                      <p className="text-xs text-gray-600">{airline.snubNosed[lang]}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{lang === 'fr' ? 'Réservation' : lang === 'es' ? 'Reserva' : 'Booking'}</p>
                      <p className="text-xs text-gray-600">{airline.bookingProcess[lang]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cabin-no airlines */}
            {cabinNo.map((airline) => (
              <div key={airline.name} className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden mb-4 opacity-80">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-red-50">
                  <span className="text-2xl">{airline.flag}</span>
                  <h3 className="font-bold text-gray-900">{airline.name}</h3>
                  <div className="ml-auto flex gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full">
                      🚫 {copy.tableHeaders.cabin}: {copy.no}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full">
                      🚫 {copy.tableHeaders.hold}: {copy.cargoOnly}
                    </span>
                  </div>
                </div>
                <div className="px-5 py-3 bg-red-50/30">
                  <p className="text-xs text-gray-600">{airline.holdPrice[lang]}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Cabin vs hold */}
          <section className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{copy.cabinVsHoldTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cabin */}
              <div className="space-y-4">
                {copy.cabinPoints.map((block, i) => (
                  <div key={i} className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                    <h3 className="font-bold text-emerald-800 text-sm mb-3">✈️ {block.title}</h3>
                    <ul className="space-y-1.5">
                      {block.points.map((pt, j) => (
                        <li key={j} className="text-xs text-emerald-700 flex items-start gap-1.5">
                          <span className="flex-shrink-0 mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {/* Hold */}
              <div className="space-y-4">
                {copy.holdPoints.map((block, i) => (
                  <div key={i} className={`border rounded-2xl p-5 ${i === 0 ? 'bg-blue-50 border-blue-100' : 'bg-amber-50 border-amber-100'}`}>
                    <h3 className={`font-bold text-sm mb-3 ${i === 0 ? 'text-blue-800' : 'text-amber-800'}`}>
                      {i === 0 ? '📦' : '⚠️'} {block.title}
                    </h3>
                    <ul className="space-y-1.5">
                      {block.points.map((pt, j) => (
                        <li key={j} className={`text-xs flex items-start gap-1.5 ${i === 0 ? 'text-blue-700' : 'text-amber-700'}`}>
                          <span className="flex-shrink-0 mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Carrier requirements */}
          <section className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{copy.carrierTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">🧳 {copy.carrierCabin.title}</h3>
                <ul className="space-y-2">
                  {copy.carrierCabin.points.map((pt, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="flex-shrink-0 text-emerald-500 mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">📦 {copy.carrierHold.title}</h3>
                <ul className="space-y-2">
                  {copy.carrierHold.points.map((pt, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="flex-shrink-0 text-blue-500 mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Breed restrictions */}
          <section className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{copy.brachyTitle}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{copy.brachyIntro}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
              <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
                <h3 className="font-bold text-orange-800 text-sm mb-3">🐕 {copy.brachyDogs}</h3>
                <ul className="space-y-1">
                  {BRACHY_DOGS.map((breed) => (
                    <li key={breed} className="text-xs text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                      {breed}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
                <h3 className="font-bold text-orange-800 text-sm mb-3">🐈 {copy.brachyCats}</h3>
                <ul className="space-y-1">
                  {BRACHY_CATS.map((breed) => (
                    <li key={breed} className="text-xs text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                      {breed}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-orange-500 text-lg flex-shrink-0">⚠️</span>
              <p className="text-sm text-orange-800 leading-relaxed">{copy.brachyWarning}</p>
            </div>
          </section>

          {/* Booking process */}
          <section className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{copy.bookingTitle}</h2>
            <div className="space-y-4">
              {copy.bookingSteps.map((stepBlock, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-3">{stepBlock.step}</h3>
                  <ul className="space-y-2">
                    {stepBlock.points.map((pt, j) => (
                      <li key={j} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="flex-shrink-0 text-blue-500 mt-0.5">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{copy.faqTitle}</h2>
            <div className="space-y-4">
              {copy.faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <section className="mb-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-5">{copy.internalLinksTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href={`/${locale}/guides/passeport-animal`}
                className="flex items-start gap-3 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-2xl p-5 transition-all shadow-sm group"
              >
                <span className="text-2xl flex-shrink-0">📔</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{copy.relatedPassport}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {locale === 'fr' ? 'Puce, vaccin rage, règles par pays' : locale === 'es' ? 'Microchip, vacuna rabia, normas por país' : 'Microchip, rabies vaccine, country rules'}
                  </p>
                </div>
              </Link>
              <Link
                href={`/${locale}/guides`}
                className="flex items-start gap-3 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-2xl p-5 transition-all shadow-sm group"
              >
                <span className="text-2xl flex-shrink-0">🗺️</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{copy.relatedGuides}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {locale === 'fr' ? 'Train, hôtels, destinations...' : locale === 'es' ? 'Tren, hoteles, destinos...' : 'Train, hotels, destinations...'}
                  </p>
                </div>
              </Link>
              <Link
                href={`/${locale}/destinations`}
                className="flex items-start gap-3 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-2xl p-5 transition-all shadow-sm group"
              >
                <span className="text-2xl flex-shrink-0">🏨</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{copy.relatedHotels}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {locale === 'fr' ? 'Comparez et réservez' : locale === 'es' ? 'Compara y reserva' : 'Compare and book'}
                  </p>
                </div>
              </Link>
            </div>
          </section>

          <GuideFooter locale={locale} currentSlug="avion-animal" />

        </div>
      </div>
    </>
  )
}
