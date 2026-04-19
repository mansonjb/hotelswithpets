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
    en: 'Travelling by Train with Your Dog in Europe: Complete Guide 2025 | HotelsWithPets.com',
    fr: 'Voyager en train avec son chien en Europe : Guide complet 2025 | HotelsWithPets.com',
    es: 'Viajar en tren con tu perro por Europa: Guía completa 2025 | HotelsWithPets.com',
  }
  const descriptions: Record<string, string> = {
    en: 'Everything you need to know about travelling by train with a dog in Europe. SNCF, Deutsche Bahn, Renfe, Trenitalia, Eurostar and more: prices, rules, muzzle requirements and practical tips.',
    fr: 'Tout ce qu\'il faut savoir pour voyager en train avec son chien en Europe. SNCF, Deutsche Bahn, Renfe, Trenitalia, Eurostar et plus : tarifs, règles, muselière et conseils pratiques.',
    es: 'Todo lo que necesitas saber para viajar en tren con tu perro por Europa. SNCF, Deutsche Bahn, Renfe, Trenitalia, Eurostar y más: precios, normas, bozal y consejos prácticos.',
  }

  const today = new Date().toISOString().split('T')[0]

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/train-avec-chien`,
      languages: {
        en: `${SITE_URL}/en/guides/train-avec-chien`,
        fr: `${SITE_URL}/fr/guides/train-avec-chien`,
        es: `${SITE_URL}/es/guides/train-avec-chien`,
        'x-default': `${SITE_URL}/en/guides/train-avec-chien`,
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

// ─── Operator data ─────────────────────────────────────────────────────────

type AllowedStatus = 'yes' | 'partial' | 'no'

interface Operator {
  slug: string
  flag: string
  name: string
  country: Record<string, string>
  allowed: AllowedStatus
  ticketRequired: Record<string, string>
  price: Record<string, string>
  sizeLimit: Record<string, string>
  muzzle: Record<string, string>
  carrier: Record<string, string>
  maxDogs: Record<string, string>
  notes: Record<string, string>
}

const OPERATORS: Operator[] = [
  {
    slug: 'sncf',
    flag: '🇫🇷',
    name: 'SNCF / TGV INOUI',
    country: { fr: 'France', en: 'France', es: 'Francia' },
    allowed: 'yes',
    ticketRequired: { fr: 'Oui', en: 'Yes', es: 'Sí' },
    price: { fr: '10 € (panier) · 20 € (en laisse)', en: '€10 (carrier) · €20 (on lead)', es: '10 € (transportín) · 20 € (con correa)' },
    sizeLimit: { fr: 'Panier < 6 kg : 45×30×25 cm. Grand chien en laisse.', en: 'Carrier < 6 kg: 45×30×25 cm. Large dog on lead.', es: 'Transportín < 6 kg: 45×30×25 cm. Perro grande con correa.' },
    muzzle: { fr: 'Obligatoire > 6 kg', en: 'Mandatory > 6 kg', es: 'Obligatorio > 6 kg' },
    carrier: { fr: 'Obligatoire < 6 kg', en: 'Mandatory < 6 kg', es: 'Obligatorio < 6 kg' },
    maxDogs: { fr: '1 par passager', en: '1 per passenger', es: '1 por pasajero' },
    notes: { fr: 'Chiens de cat. 1 interdits. Chiens guides gratuits.', en: 'Category 1 dogs banned. Guide dogs free.', es: 'Perros de cat. 1 prohibidos. Perros guía gratis.' },
  },
  {
    slug: 'ouigo',
    flag: '🇫🇷',
    name: 'OUIGO',
    country: { fr: 'France', en: 'France', es: 'Francia' },
    allowed: 'yes',
    ticketRequired: { fr: 'Oui', en: 'Yes', es: 'Sí' },
    price: { fr: '10 € (tous poids)', en: '€10 (all sizes)', es: '10 € (todos los tamaños)' },
    sizeLimit: { fr: 'Aucune limite de poids', en: 'No weight limit', es: 'Sin límite de peso' },
    muzzle: { fr: 'Obligatoire', en: 'Mandatory', es: 'Obligatorio' },
    carrier: { fr: 'Non requis (laisse suffisante)', en: 'Not required (lead sufficient)', es: 'No requerido (correa suficiente)' },
    maxDogs: { fr: '1 par passager adulte', en: '1 per adult passenger', es: '1 por pasajero adulto' },
    notes: { fr: 'Carnet de vaccination obligatoire. Cat. 1 interdits.', en: 'Vaccination booklet mandatory. Cat. 1 banned.', es: 'Cartilla de vacunación obligatoria. Cat. 1 prohibidos.' },
  },
  {
    slug: 'eurostar',
    flag: '🇬🇧',
    name: 'Eurostar',
    country: { fr: 'UK–France–Belgique', en: 'UK–France–Belgium', es: 'RU–Francia–Bélgica' },
    allowed: 'partial',
    ticketRequired: { fr: 'Oui (routes continentales)', en: 'Yes (continental routes)', es: 'Sí (rutas continentales)' },
    price: { fr: 'Gratuit < 6 kg · 30 € > 6 kg (routes continentales)', en: 'Free < 6 kg · €30 > 6 kg (continental routes)', es: 'Gratis < 6 kg · 30 € > 6 kg (rutas continentales)' },
    sizeLimit: { fr: '< 6 kg en panier 45×30×25 cm. Grand chien en laisse.', en: '< 6 kg in 45×30×25 cm carrier. Large dog on lead.', es: '< 6 kg en transportín 45×30×25 cm. Perro grande con correa.' },
    muzzle: { fr: 'Obligatoire > 6 kg', en: 'Mandatory > 6 kg', es: 'Obligatorio > 6 kg' },
    carrier: { fr: 'Obligatoire < 6 kg', en: 'Mandatory < 6 kg', es: 'Obligatorio < 6 kg' },
    maxDogs: { fr: '1 par passager', en: '1 per passenger', es: '1 por pasajero' },
    notes: { fr: '⚠️ Animaux INTERDITS sur les trains vers/depuis Londres (tunnel sous la Manche). Autorisés sur routes Belgique–France–Allemagne–Pays-Bas.', en: '⚠️ Pets BANNED on trains to/from London (Channel Tunnel). Allowed on Belgium–France–Germany–Netherlands routes.', es: '⚠️ Animales PROHIBIDOS en trenes hacia/desde Londres (Eurotúnel). Permitidos en rutas Bélgica–Francia–Alemania–Países Bajos.' },
  },
  {
    slug: 'deutsche-bahn',
    flag: '🇩🇪',
    name: 'Deutsche Bahn (DB)',
    country: { fr: 'Allemagne', en: 'Germany', es: 'Alemania' },
    allowed: 'yes',
    ticketRequired: { fr: 'Oui (grands chiens)', en: 'Yes (large dogs)', es: 'Sí (perros grandes)' },
    price: { fr: 'Gratuit en panier (taille chat). Demi-tarif adulte (grande distance) · plein tarif (régional)', en: 'Free in carrier (cat-sized). Half adult fare (long-distance) · full fare (regional)', es: 'Gratis en transportín (talla gato). Mitad tarifa adulto (larga distancia) · tarifa completa (regional)' },
    sizeLimit: { fr: 'Petit animal en panier gratuit. Grand chien : billet obligatoire.', en: 'Small pet in carrier free. Large dog: ticket required.', es: 'Animal pequeño en transportín gratis. Perro grande: billete obligatorio.' },
    muzzle: { fr: 'Obligatoire (grands chiens)', en: 'Mandatory (large dogs)', es: 'Obligatorio (perros grandes)' },
    carrier: { fr: 'Obligatoire (petits animaux)', en: 'Mandatory (small pets)', es: 'Obligatorio (animales pequeños)' },
    maxDogs: { fr: '1 par passager', en: '1 per passenger', es: '1 por pasajero' },
    notes: { fr: 'Billet chien réservable en ligne (app DB Next Navigator) ou en gare.', en: 'Dog ticket bookable online (DB Next Navigator app) or at station.', es: 'Billete perro reservable online (app DB Next Navigator) o en estación.' },
  },
  {
    slug: 'renfe',
    flag: '🇪🇸',
    name: 'Renfe',
    country: { fr: 'Espagne', en: 'Spain', es: 'España' },
    allowed: 'yes',
    ticketRequired: { fr: 'Oui', en: 'Yes', es: 'Sí' },
    price: { fr: '10 € (Avlo) · 35 € sans cage (trains AVE avec sièges chiens) · Gratuit (Media Distancia)', en: '€10 (Avlo) · €35 without crate (AVE with dog seats) · Free (Media Distancia)', es: '10 € (Avlo) · 35 € sin jaula (AVE con asientos perros) · Gratis (Media Distancia)' },
    sizeLimit: { fr: 'En cage : 60×35×35 cm max. Sans cage jusqu\'à 40 kg sur trains équipés.', en: 'In crate: max 60×35×35 cm. No crate up to 40 kg on fitted trains.', es: 'En jaula: máx 60×35×35 cm. Sin jaula hasta 40 kg en trenes equipados.' },
    muzzle: { fr: 'Obligatoire (Media Distancia)', en: 'Mandatory (Media Distancia)', es: 'Obligatorio (Media Distancia)' },
    carrier: { fr: 'Obligatoire (AVE, sauf sièges chiens)', en: 'Mandatory (AVE, except dog seats)', es: 'Obligatorio (AVE, salvo asientos perros)' },
    maxDogs: { fr: '1 par passager', en: '1 per passenger', es: '1 por pasajero' },
    notes: { fr: 'Présenter carnet de vaccination + assurance RC à l\'enregistrement (40 min avant départ).', en: 'Show vaccination booklet + liability insurance at check-in (40 min before departure).', es: 'Presentar cartilla de vacunación + seguro RC en facturación (40 min antes de salida).' },
  },
  {
    slug: 'trenitalia',
    flag: '🇮🇹',
    name: 'Trenitalia',
    country: { fr: 'Italie', en: 'Italy', es: 'Italia' },
    allowed: 'yes',
    ticketRequired: { fr: 'Oui (grand chien)', en: 'Yes (large dog)', es: 'Sí (perro grande)' },
    price: { fr: 'Gratuit (panier < 70×30×50 cm). 50 % du tarif 2e classe (grand chien).', en: 'Free (carrier < 70×30×50 cm). 50% of 2nd class fare (large dog).', es: 'Gratis (transportín < 70×30×50 cm). 50% tarifa 2ª clase (perro grande).' },
    sizeLimit: { fr: 'Petit en panier gratuit. Grand chien en laisse sur Frecce, Intercity.', en: 'Small in carrier free. Large dog on lead on Frecce, Intercity.', es: 'Pequeño en transportín gratis. Perro grande con correa en Frecce, Intercity.' },
    muzzle: { fr: 'Obligatoire (grands chiens)', en: 'Mandatory (large dogs)', es: 'Obligatorio (perros grandes)' },
    carrier: { fr: 'Obligatoire (petits)', en: 'Mandatory (small)', es: 'Obligatorio (pequeños)' },
    maxDogs: { fr: '1 par passager', en: '1 per passenger', es: '1 por pasajero' },
    notes: { fr: 'Carnet canin + livret sanitaire obligatoires. Promo été 2025 : grands chiens gratuits sur Frecce et Intercity.', en: 'Dog registration + health booklet mandatory. Summer 2025 promo: large dogs free on Frecce and Intercity.', es: 'Registro canino + libreta sanitaria obligatorios. Promo verano 2025: perros grandes gratis en Frecce e Intercity.' },
  },
  {
    slug: 'sncb',
    flag: '🇧🇪',
    name: 'SNCB / NMBS',
    country: { fr: 'Belgique', en: 'Belgium', es: 'Bélgica' },
    allowed: 'yes',
    ticketRequired: { fr: 'Oui (en laisse)', en: 'Yes (on lead)', es: 'Sí (con correa)' },
    price: { fr: 'Gratuit (panier 30×55×30 cm max). Supplément animal en laisse.', en: 'Free (carrier max 30×55×30 cm). Pet supplement on lead.', es: 'Gratis (transportín máx 30×55×30 cm). Suplemento mascota con correa.' },
    sizeLimit: { fr: 'Panier gratuit. Grand chien : supplément requis.', en: 'Carrier free. Large dog: supplement required.', es: 'Transportín gratis. Perro grande: suplemento requerido.' },
    muzzle: { fr: 'Non obligatoire (recommandée)', en: 'Not mandatory (recommended)', es: 'No obligatorio (recomendado)' },
    carrier: { fr: 'Obligatoire (petits animaux)', en: 'Mandatory (small pets)', es: 'Obligatorio (animales pequeños)' },
    maxDogs: { fr: '1 par passager', en: '1 per passenger', es: '1 por pasajero' },
    notes: { fr: 'Chiens guides gratuits et sans muselière obligatoire.', en: 'Guide dogs free and no muzzle required.', es: 'Perros guía gratis y sin bozal obligatorio.' },
  },
  {
    slug: 'ns',
    flag: '🇳🇱',
    name: 'NS (Nederlandse Spoorwegen)',
    country: { fr: 'Pays-Bas', en: 'Netherlands', es: 'Países Bajos' },
    allowed: 'yes',
    ticketRequired: { fr: 'Oui (grand chien)', en: 'Yes (large dog)', es: 'Sí (perro grande)' },
    price: { fr: 'Gratuit (panier 55×30×30 cm). Dagkaart Hond : 3,50 € (e-ticket) / 5 € (papier).', en: 'Free (carrier 55×30×30 cm). Dagkaart Hond: €3.50 (e-ticket) / €5 (paper).', es: 'Gratis (transportín 55×30×30 cm). Dagkaart Hond: 3,50 € (e-ticket) / 5 € (papel).' },
    sizeLimit: { fr: 'Panier < 55×30×30 cm gratuit. Grand chien : laisse + muselière.', en: 'Carrier < 55×30×30 cm free. Large dog: lead + muzzle.', es: 'Transportín < 55×30×30 cm gratis. Perro grande: correa + bozal.' },
    muzzle: { fr: 'Obligatoire (grands chiens)', en: 'Mandatory (large dogs)', es: 'Obligatorio (perros grandes)' },
    carrier: { fr: 'Obligatoire (petits animaux)', en: 'Mandatory (small pets)', es: 'Obligatorio (animales pequeños)' },
    maxDogs: { fr: '1 par passager', en: '1 per passenger', es: '1 por pasajero' },
    notes: { fr: 'Dagkaart Hond valable toute la journée sur tout le réseau domestique NS.', en: 'Dagkaart Hond valid all day on all domestic NS routes.', es: 'Dagkaart Hond válido todo el día en toda la red doméstica NS.' },
  },
  {
    slug: 'sbb',
    flag: '🇨🇭',
    name: 'SBB / CFF / FFS',
    country: { fr: 'Suisse', en: 'Switzerland', es: 'Suiza' },
    allowed: 'yes',
    ticketRequired: { fr: 'Oui (grand chien)', en: 'Yes (large dog)', es: 'Sí (perro grande)' },
    price: { fr: 'Gratuit (en sac/panier). Abonnement journalier chien : CHF 25.', en: 'Free (in bag/carrier). Dog day pass: CHF 25.', es: 'Gratis (en bolsa/transportín). Abono diario perro: CHF 25.' },
    sizeLimit: { fr: 'Petit en sac/panier gratuit. Grand chien : abonnement jour.', en: 'Small in bag/carrier free. Large dog: day pass.', es: 'Pequeño en bolsa/transportín gratis. Perro grande: abono día.' },
    muzzle: { fr: 'Recommandée', en: 'Recommended', es: 'Recomendado' },
    carrier: { fr: 'Obligatoire (petits animaux)', en: 'Mandatory (small pets)', es: 'Obligatorio (animales pequeños)' },
    maxDogs: { fr: '1 par passager', en: '1 per passenger', es: '1 por pasajero' },
    notes: { fr: 'Le TGV Lyria (France–Suisse) suit les tarifs SNCF : 10 € (panier) ou 20 € (laisse).', en: 'TGV Lyria (France–Switzerland) follows SNCF rates: €10 (carrier) or €20 (lead).', es: 'TGV Lyria (Francia–Suiza) sigue tarifas SNCF: 10 € (transportín) o 20 € (correa).' },
  },
  {
    slug: 'obb',
    flag: '🇦🇹',
    name: 'ÖBB',
    country: { fr: 'Autriche', en: 'Austria', es: 'Austria' },
    allowed: 'yes',
    ticketRequired: { fr: 'Oui (grand chien)', en: 'Yes (large dog)', es: 'Sí (perro grande)' },
    price: { fr: 'Gratuit (panier 70×30×50 cm). Grand chien : billet séparé + compartiment privatif.', en: 'Free (carrier 70×30×50 cm). Large dog: separate ticket + private compartment.', es: 'Gratis (transportín 70×30×50 cm). Perro grande: billete separado + compartimento privado.' },
    sizeLimit: { fr: 'Panier 70×30×50 cm gratuit. Grand chien : compartiment entier requis.', en: 'Carrier 70×30×50 cm free. Large dog: full compartment required.', es: 'Transportín 70×30×50 cm gratis. Perro grande: compartimento completo requerido.' },
    muzzle: { fr: 'Obligatoire (grands chiens)', en: 'Mandatory (large dogs)', es: 'Obligatorio (perros grandes)' },
    carrier: { fr: 'Obligatoire (petits animaux)', en: 'Mandatory (small pets)', es: 'Obligatorio (animales pequeños)' },
    maxDogs: { fr: '1 par passager', en: '1 per passenger', es: '1 por pasajero' },
    notes: { fr: 'Laisse et muselière obligatoires pour grands chiens.', en: 'Lead and muzzle mandatory for large dogs.', es: 'Correa y bozal obligatorios para perros grandes.' },
  },
  {
    slug: 'pkp',
    flag: '🇵🇱',
    name: 'PKP Intercity',
    country: { fr: 'Pologne', en: 'Poland', es: 'Polonia' },
    allowed: 'yes',
    ticketRequired: { fr: 'Oui', en: 'Yes', es: 'Sí' },
    price: { fr: 'Billet animal requis (tarif variable)', en: 'Pet ticket required (variable fare)', es: 'Billete mascota requerido (tarifa variable)' },
    sizeLimit: { fr: 'Petit en panier accepté. Grand chien en laisse.', en: 'Small in carrier accepted. Large dog on lead.', es: 'Pequeño en transportín aceptado. Perro grande con correa.' },
    muzzle: { fr: 'Obligatoire', en: 'Mandatory', es: 'Obligatorio' },
    carrier: { fr: 'Obligatoire (petits animaux)', en: 'Mandatory (small pets)', es: 'Obligatorio (animales pequeños)' },
    maxDogs: { fr: '1 par passager', en: '1 per passenger', es: '1 por pasajero' },
    notes: { fr: 'Chiens interdits dans les voitures-lits et couchettes EuroNight PKP.', en: 'Dogs banned in EuroNight PKP couchette and sleeping cars.', es: 'Perros prohibidos en coches cama y literas EuroNight PKP.' },
  },
]

// ─── Copy ──────────────────────────────────────────────────────────────────

const COPY = {
  fr: {
    hero: 'Voyager en train avec son chien en Europe',
    subtitle: 'SNCF, Deutsche Bahn, Renfe, Trenitalia, Eurostar... Le guide complet des règles, tarifs, muselières et conseils pratiques pour voyager sereinement avec votre compagnon à quatre pattes.',
    lastUpdate: 'Mis à jour en',
    breadcrumbGuides: 'Guides',
    breadcrumbCurrent: 'Train avec chien',
    badge: 'Guide pratique',

    keyFactsTitle: 'Les règles essentielles à retenir',
    keyFacts: [
      { icon: '🎫', title: 'Billet obligatoire', text: 'Dans toute l\'Europe, un chien de grande taille nécessite un billet. Les petits animaux en panier voyagent souvent gratuitement.' },
      { icon: '😷', title: 'Muselière requise', text: 'En France (SNCF, Ouigo), en Italie, en Autriche et dans la plupart des pays, la muselière est obligatoire pour les chiens de plus de 6 kg.' },
      { icon: '🚫', title: 'Eurostar tunnel = interdit', text: 'Les animaux de compagnie (sauf chiens guides) sont formellement interdits sur les trains Eurostar reliant Londres à l\'Europe continentale.' },
      { icon: '📋', title: 'Carnet de santé', text: 'Emportez toujours le carnet de vaccination de votre chien. Renfe (Espagne) exige aussi une assurance responsabilité civile.' },
      { icon: '📏', title: 'Gabarit panier', text: 'Le format standard pour les petits animaux est 45×30×25 cm (SNCF). Certains opérateurs acceptent jusqu\'à 70×30×50 cm.' },
      { icon: '🐕‍🦺', title: 'Chiens guides gratuits', text: 'Les chiens d\'assistance et guides d\'aveugle voyagent gratuitement dans toute l\'Europe, sans muselière obligatoire.' },
    ],

    tableTitle: 'Comparatif des compagnies ferroviaires européennes',
    colOperator: 'Compagnie',
    colAllowed: 'Admis ?',
    colTicket: 'Billet ?',
    colPrice: 'Tarif',
    colSize: 'Format',
    colMuzzle: 'Muselière',
    colCarrier: 'Panier',
    colMax: 'Max / voyageur',
    colNotes: 'Remarques',

    allowedYes: 'Oui',
    allowedPartial: 'Partiel',
    allowedNo: 'Non',

    sncfTitle: 'SNCF et Ouigo : voyager avec son chien en France',
    sncfContent: [
      'La SNCF est l\'opérateur le plus important pour nos lecteurs francophones. Les règles sont claires et relativement permissives.',
      'Pour les TGV INOUI et Intercités, vous avez deux options : (1) votre chien pèse moins de 6 kg et voyage dans un panier fermé (max 45×30×25 cm) pour 10 € ; (2) votre chien est plus grand et voyage en laisse, muselé, à vos pieds pour 20 €.',
      'Avec OUIGO, le low-cost ferroviaire de la SNCF, c\'est encore plus simple : un tarif unique de 10 € pour tous les chiens, quelle que soit leur taille. La muselière reste obligatoire.',
      'Les chiens de catégorie 1 (type pit-bull, mastiff, tosa) sont formellement interdits dans tous les trains. Les chiens de catégorie 2 voyagent normalement mais sous conditions.',
      'Pensez à réserver le billet de votre chien en même temps que le vôtre sur SNCF Connect ou l\'application OUIGO. Un seul animal par voyageur adulte.',
      'Sur les TGV Lyria (France–Suisse), les tarifs SNCF s\'appliquent : 10 € en panier ou 20 € en laisse avec muselière.',
    ],
    sncfTip: 'Bon à savoir : la SNCF précise que vous devez vérifier que votre chien ne dérange pas les autres voyageurs. En cas de problème, le contrôleur peut vous demander de placer votre animal autrement.',

    dbTitle: 'Deutsche Bahn : le train le plus dog-friendly d\'Europe',
    dbContent: [
      'L\'Allemagne est sans doute le pays le plus accueillant pour les chiens dans les transports en commun, et la Deutsche Bahn ne fait pas exception.',
      'Un petit animal (taille d\'un chat domestique) dans un panier voyage gratuitement. Pour un grand chien, vous devrez acheter un billet : demi-tarif adulte sur les grandes lignes (ICE, IC, EC), ou tarif adulte plein sur les trains régionaux.',
      'Grande nouveauté : les billets pour chiens sont désormais disponibles en ligne via l\'application DB Next Navigator ou sur next.bahn.de. Plus besoin de faire la queue en gare !',
      'La laisse et la muselière sont obligatoires pour les grands chiens. En gare, votre chien doit également être tenu en laisse sur les quais.',
    ],
    dbTip: 'Le Deutschland-Ticket (abonnement mensuel) ne couvre PAS les chiens. Vous devrez acheter un billet animal séparé même si vous possédez cet abonnement.',

    renfeTitle: 'Renfe : des options variées en Espagne',
    renfeContent: [
      'Renfe propose plusieurs formules selon le type de train. Sur les trains AVE (grande vitesse), votre chien voyage dans une cage (max 60×35×35 cm) pour la plupart des trajets. Certains trains AVE sont équipés de sièges spéciaux pour les chiens (jusqu\'à 40 kg) à 35 € sans cage.',
      'Sur les trains Avlo (le low-cost espagnol), le tarif est de 10 €. Sur les trains Media Distancia à écartement métrique, les chiens voyagent gratuitement en laisse avec muselière.',
      'Attention : vous devez vous présenter au comptoir Renfe en gare 40 minutes avant le départ avec le carnet de vaccination et une attestation d\'assurance responsabilité civile. C\'est une spécificité espagnole à ne pas négliger.',
    ],

    trenitTitle: 'Trenitalia : l\'Italie accueille les chiens',
    trenitContent: [
      'Trenitalia permet aux petits animaux (dans un panier de 70×30×50 cm max) de voyager gratuitement sur tous ses trains. Pour les grands chiens, le billet est vendu à 50 % du tarif de 2e classe.',
      'Les grands chiens sont acceptés sur les Frecciarossa, Frecciargento, Frecciabianca et Intercity, en 1re et 2e classe. Ils doivent être tenus en laisse et porter une muselière.',
      'N\'oubliez pas d\'emporter le certificato di iscrizione all\'anagrafe canina (équivalent de l\'identification officielle) et le libretto sanitario de votre chien.',
      'Bonne nouvelle pour l\'été 2025 : jusqu\'au 15 septembre 2025, Trenitalia offre la gratuité aux chiens de toutes tailles sur ses Frecce et Intercity.',
    ],

    eurostarTitle: 'Eurostar : une règle à bien mémoriser',
    eurostarContent: [
      'L\'Eurostar est le train qui suscite le plus de questions de la part de nos lecteurs. La règle est simple mais absolue : les animaux de compagnie (à l\'exception des chiens guides et d\'assistance) sont INTERDITS sur tous les trains passant par le tunnel sous la Manche, c\'est-à-dire ceux reliant Londres à Paris, Bruxelles, Amsterdam et autres destinations britanniques.',
      'En revanche, sur les routes continentales de l\'Eurostar (entre la Belgique, la France, l\'Allemagne et les Pays-Bas, sans passer par Londres), les animaux sont les bienvenus : gratuit pour les moins de 6 kg en panier, 30 € pour les grands chiens en laisse et muselière.',
      'Si vous souhaitez traverser la Manche avec votre chien, les seules options sont le ferry (Brittany Ferries, DFDS, P&O) ou le train Eurotunnel Le Shuttle (pour les voitures). Les chiens ne peuvent pas voyager seuls dans l\'Eurotunnel.',
    ],

    tipsTitle: 'Conseils pratiques pour voyager en train avec son chien',
    tips: [
      {
        icon: '📅',
        title: 'Réservez à l\'avance',
        text: 'Achetez le billet de votre chien en même temps que le vôtre. Sur SNCF Connect, cochez "Animal de compagnie" lors de la réservation. Sur DB, utilisez l\'appli DB Next Navigator.',
      },
      {
        icon: '🎒',
        title: 'Ce qu\'il faut emporter',
        text: 'Carnet de vaccination, laisse solide, muselière adaptée, eau et gamelle pliable, friandises pour rassurer, couverture ou coussin familier, sac hygiénique.',
      },
      {
        icon: '🏛️',
        title: 'En gare',
        text: 'Votre chien doit être tenu en laisse sur tous les quais. Dans certaines gares (Paris Montparnasse, Lyon Part-Dieu), des espaces verts à l\'extérieur permettent une dernière sortie avant le départ.',
      },
      {
        icon: '🚂',
        title: 'Dans le train',
        text: 'Installez-vous dès que possible. Vérifiez que votre chien ne gêne pas les voisins. Si votre chien est agité, proposez-lui de se coucher sous le siège. N\'hésitez pas à informer le contrôleur de la présence de votre animal.',
      },
      {
        icon: '😰',
        title: 'Si votre chien refuse de s\'installer',
        text: 'Préparez votre chien avant le voyage : habituation à la muselière, aux bruits du train, aux espaces confinés. Un voyage d\'entraînement sur un trajet court peut aider. En cas de forte anxiété, consultez votre vétérinaire (anxiolytiques naturels ou médicamenteux).',
      },
      {
        icon: '🚫',
        title: 'En cas de problème à bord',
        text: 'Si un autre voyageur se plaint ou est allergique, le contrôleur peut vous demander de déplacer votre chien. Dans les rares cas de refus d\'accès, demandez un rapport d\'irrégularité pour obtenir un remboursement.',
      },
    ],

    interrailTitle: 'Voyager avec un Interrail pass et un chien',
    interrailText: 'L\'Interrail pass couvre votre billet de voyageur, mais les billets animaux doivent être achetés séparément auprès de chaque compagnie ferroviaire. Les règles locales de chaque pays s\'appliquent. Notez que l\'Eurostar (tunnel) reste interdit aux animaux même avec un Interrail.',

    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Mon chien a-t-il besoin d\'un billet pour le train ?',
        a: 'Cela dépend de sa taille. Dans la plupart des pays européens, les petits animaux dans un panier adapté voyagent gratuitement. Les grands chiens nécessitent un billet payant. En France (SNCF), comptez 10 € (panier) ou 20 € (en laisse). En Allemagne (DB), c\'est le demi-tarif adulte sur les grandes lignes.',
      },
      {
        q: 'Faut-il une muselière pour mon chien dans le train ?',
        a: 'Oui, dans la majorité des pays et compagnies. En France (SNCF, Ouigo), la muselière est obligatoire pour les chiens de plus de 6 kg. En Italie (Trenitalia), en Autriche (ÖBB) et aux Pays-Bas (NS), c\'est également obligatoire pour les grands chiens. En Belgique (SNCB), elle est recommandée mais pas systématiquement exigée.',
      },
      {
        q: 'Puis-je mettre mon chien en soute dans un train ?',
        a: 'Non. Contrairement aux avions, il n\'existe pas de compartiment bagages pour animaux vivants dans les trains européens. Votre chien doit toujours être avec vous : soit dans un panier en cabine, soit en laisse à vos pieds.',
      },
      {
        q: 'Peut-on voyager avec un chien sur l\'Eurostar ?',
        a: 'Non, pas sur les trains passant par le tunnel sous la Manche (vers/depuis Londres). Les animaux sont strictement interdits sur ces routes pour des raisons sanitaires. Seuls les chiens guides d\'assistance peuvent voyager. Pour traverser la Manche avec un chien, il faut prendre le ferry ou le train Eurotunnel Le Shuttle (voiture uniquement).',
      },
      {
        q: 'Mon chien de race "dangereuse" peut-il prendre le train ?',
        a: 'Les chiens de catégorie 1 (type pit-bull, American Staffordshire Terrier, Mastiff Japonais, Tosa) sont interdits sur les trains SNCF et Ouigo. Les chiens de catégorie 2 (Rottweiler, Staffordshire Bull Terrier, Dobermann, etc.) peuvent voyager mais doivent obligatoirement porter une muselière et être tenus en laisse. Renseignez-vous auprès de chaque compagnie pour les autres pays.',
      },
      {
        q: 'Mon chien doit-il rester à sa place pendant tout le voyage ?',
        a: 'Oui, dans la mesure du possible. En SNCF, votre chien doit voyager à vos pieds, tenu en laisse et muselé. Il ne doit pas occuper un siège passager. Dans certains TER, il peut se trouver dans l\'espace entre les sièges ou dans le couloir si vous êtes en wagon de tête.',
      },
      {
        q: 'Faut-il présenter les vaccins de mon chien dans le train ?',
        a: 'Pas systématiquement en France, mais c\'est fortement recommandé d\'avoir le carnet de santé avec vous. En Espagne (Renfe), la présentation du carnet de vaccination est obligatoire à l\'enregistrement. En Italie (Trenitalia), le livret sanitaire est requis. Voyagez toujours avec les documents de votre animal.',
      },
    ],

    sourcesTitle: 'Sources vérifiées',
    sourcesText: 'Ce guide est basé sur les informations officielles de SNCF, Ouigo, Deutsche Bahn, Renfe, Trenitalia, Eurostar, SNCB, NS, SBB, ÖBB et PKP Intercity, vérifiées en 2025. Les tarifs et règles peuvent évoluer — consultez toujours le site de la compagnie avant votre voyage.',

    internalLinksTitle: 'Guides associés',
    guidePasseport: 'Passeport européen pour animaux : guide complet',
    guideAll: 'Tous nos guides pratiques',
  },

  en: {
    hero: 'Travelling by Train with Your Dog in Europe',
    subtitle: 'SNCF, Deutsche Bahn, Renfe, Trenitalia, Eurostar... The complete guide to rules, fares, muzzle requirements and practical tips for stress-free train travel with your dog.',
    lastUpdate: 'Updated in',
    breadcrumbGuides: 'Guides',
    breadcrumbCurrent: 'Train with dog',
    badge: 'Practical guide',

    keyFactsTitle: 'Key rules at a glance',
    keyFacts: [
      { icon: '🎫', title: 'Ticket required', text: 'Across Europe, large dogs need a ticket. Small pets in carriers often travel free.' },
      { icon: '😷', title: 'Muzzle required', text: 'In France (SNCF, Ouigo), Italy, Austria and most countries, muzzles are mandatory for dogs over 6 kg.' },
      { icon: '🚫', title: 'Eurostar tunnel = banned', text: 'Pets (except assistance dogs) are strictly banned on Eurostar trains through the Channel Tunnel between London and mainland Europe.' },
      { icon: '📋', title: 'Health booklet', text: 'Always carry your dog\'s vaccination booklet. Renfe (Spain) also requires public liability insurance.' },
      { icon: '📏', title: 'Carrier dimensions', text: 'Standard format for small pets is 45×30×25 cm (SNCF). Some operators accept up to 70×30×50 cm.' },
      { icon: '🐕‍🦺', title: 'Assistance dogs free', text: 'Guide and assistance dogs travel free throughout Europe with no mandatory muzzle requirement.' },
    ],

    tableTitle: 'European rail operators comparison',
    colOperator: 'Operator',
    colAllowed: 'Allowed?',
    colTicket: 'Ticket?',
    colPrice: 'Price',
    colSize: 'Size',
    colMuzzle: 'Muzzle',
    colCarrier: 'Carrier',
    colMax: 'Max / passenger',
    colNotes: 'Notes',

    allowedYes: 'Yes',
    allowedPartial: 'Partial',
    allowedNo: 'No',

    sncfTitle: 'SNCF and Ouigo: train travel with a dog in France',
    sncfContent: [
      'SNCF is the most important operator for our users. The rules are clear and reasonably permissive.',
      'On TGV INOUI and Intercités trains, you have two options: (1) your dog weighs under 6 kg and travels in a closed carrier (max 45×30×25 cm) for €10; (2) your dog is larger and travels on a lead, muzzled, at your feet for €20.',
      'With OUIGO, the low-cost rail brand, it\'s even simpler: a flat rate of €10 for all dogs regardless of size. A muzzle is still mandatory.',
      'Category 1 dogs (pit-bull type, mastiff, tosa) are banned from all trains. Category 2 dogs travel normally but must wear a muzzle and be on a lead.',
      'Book your dog\'s ticket at the same time as yours on SNCF Connect or the OUIGO app. One animal per adult passenger.',
      'On TGV Lyria (France–Switzerland), SNCF rates apply: €10 in a carrier or €20 on a lead with muzzle.',
    ],
    sncfTip: 'Good to know: SNCF states that you must ensure your dog does not disturb other passengers. If there is a problem, the conductor may ask you to reposition your pet.',

    dbTitle: 'Deutsche Bahn: Europe\'s most dog-friendly rail',
    dbContent: [
      'Germany is arguably the most dog-welcoming country for public transport in Europe, and Deutsche Bahn is no exception.',
      'A small pet (cat-sized) in a carrier travels free. For a large dog, you need to buy a ticket: half the adult fare on long-distance trains (ICE, IC, EC), or full adult fare on regional trains.',
      'A recent improvement: dog tickets are now available online via the DB Next Navigator app or at next.bahn.de. No more queuing at the station!',
      'Lead and muzzle are mandatory for large dogs. On platforms, your dog must also be on a lead.',
    ],
    dbTip: 'The Deutschland-Ticket (monthly subscription pass) does NOT cover dogs. You must buy a separate animal ticket even if you hold this pass.',

    renfeTitle: 'Renfe: varied options across Spain',
    renfeContent: [
      'Renfe offers several formats depending on train type. On AVE high-speed trains, your dog travels in a crate (max 60×35×35 cm) for most journeys. Some AVE trains have dedicated dog seats (up to 40 kg) at €35 without a crate.',
      'On Avlo trains (Spain\'s low-cost rail), the fare is €10. On Media Distancia metric-gauge trains, dogs travel free on a lead with muzzle.',
      'Important: you must present yourself at the Renfe desk at the station 40 minutes before departure with a vaccination booklet and proof of public liability insurance. This is a Spanish-specific requirement that is strictly enforced.',
    ],

    trenitTitle: 'Trenitalia: Italy welcomes dogs',
    trenitContent: [
      'Trenitalia allows small pets (in a carrier max 70×30×50 cm) to travel free on all trains. For large dogs, the ticket is sold at 50% of the 2nd class fare.',
      'Large dogs are accepted on Frecciarossa, Frecciargento, Frecciabianca and Intercity trains in 1st and 2nd class. They must be on a lead and wear a muzzle.',
      'Don\'t forget to bring your dog\'s certificato di iscrizione all\'anagrafe canina (official registration certificate) and their libretto sanitario (health booklet).',
      'Great news for summer 2025: until 15 September 2025, Trenitalia is offering free travel for dogs of all sizes on Frecce and Intercity trains.',
    ],

    eurostarTitle: 'Eurostar: one rule you must know',
    eurostarContent: [
      'Eurostar is the operator that generates the most questions from our readers. The rule is simple but absolute: pets (except guide and assistance dogs) are BANNED on all trains travelling through the Channel Tunnel — that is, those linking London with Paris, Brussels, Amsterdam and other UK destinations.',
      'However, on Eurostar\'s continental routes (between Belgium, France, Germany and the Netherlands, without passing through London), pets are welcome: free for pets under 6 kg in a carrier, €30 for large dogs on a lead with muzzle.',
      'If you want to cross the Channel with your dog, the only options are a ferry (Brittany Ferries, DFDS, P&O) or the Eurotunnel Le Shuttle train (for cars). Dogs cannot travel unaccompanied on the Eurotunnel.',
    ],

    tipsTitle: 'Practical tips for train travel with your dog',
    tips: [
      {
        icon: '📅',
        title: 'Book in advance',
        text: 'Buy your dog\'s ticket at the same time as yours. On SNCF Connect, tick "Pet" when booking. On DB, use the DB Next Navigator app.',
      },
      {
        icon: '🎒',
        title: 'What to bring',
        text: 'Vaccination booklet, sturdy lead, well-fitted muzzle, water and a foldable bowl, treats to reassure, a familiar blanket or cushion, waste bags.',
      },
      {
        icon: '🏛️',
        title: 'At the station',
        text: 'Your dog must be on a lead on all platforms. At some large stations, there are green spaces outside for a last walk before departure.',
      },
      {
        icon: '🚂',
        title: 'On the train',
        text: 'Settle in as quickly as possible. Check your dog is not disturbing neighbours. If restless, encourage your dog to lie under the seat. Inform the conductor of your pet\'s presence.',
      },
      {
        icon: '😰',
        title: 'If your dog refuses to settle',
        text: 'Prepare your dog before the trip: acclimatise to the muzzle, train sounds and confined spaces. A short training journey can help. For severe anxiety, consult your vet (natural or prescription anxiolytics).',
      },
      {
        icon: '🚫',
        title: 'If there is a problem on board',
        text: 'If another passenger complains or is allergic, the conductor may ask you to move your dog. In the rare case of refused boarding, request an irregularity report to obtain a refund.',
      },
    ],

    interrailTitle: 'Interrail pass and travelling with a dog',
    interrailText: 'Your Interrail pass covers your own travel, but pet tickets must be purchased separately from each rail operator. Local rules of each country apply. Note that Eurostar (Channel Tunnel) remains banned for pets even with an Interrail pass.',

    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Does my dog need a ticket on the train?',
        a: 'It depends on size. In most European countries, small pets in a suitable carrier travel free. Large dogs require a paid ticket. In France (SNCF), expect to pay €10 (carrier) or €20 (on lead). In Germany (DB), it is half the adult fare on long-distance trains.',
      },
      {
        q: 'Does my dog need a muzzle on the train?',
        a: 'Yes, in most countries and companies. In France (SNCF, Ouigo), a muzzle is mandatory for dogs over 6 kg. In Italy (Trenitalia), Austria (ÖBB) and the Netherlands (NS), it is also mandatory for large dogs. In Belgium (SNCB), it is recommended but not always strictly enforced.',
      },
      {
        q: 'Can I put my dog in the hold on a train?',
        a: 'No. Unlike aircraft, European trains have no cargo hold for live animals. Your dog must always be with you: either in a carrier in the passenger area, or on a lead at your feet.',
      },
      {
        q: 'Can I travel with a dog on the Eurostar?',
        a: 'No, not on trains passing through the Channel Tunnel (to/from London). Pets are strictly banned on these routes for biosecurity reasons. Only registered assistance dogs may travel. To cross the Channel with a dog, take a ferry or the Eurotunnel Le Shuttle (car-only service).',
      },
      {
        q: 'Can my "dangerous breed" dog travel by train?',
        a: 'Category 1 dogs (pit-bull type, American Staffordshire Terrier, Japanese Mastiff, Tosa) are banned from SNCF and Ouigo trains. Category 2 dogs (Rottweiler, Staffordshire Bull Terrier, Dobermann, etc.) may travel but must wear a muzzle and be on a lead at all times. Check the rules with each operator for other countries.',
      },
      {
        q: 'Does my dog have to stay in place throughout the journey?',
        a: 'Yes, as much as possible. On SNCF, your dog must travel at your feet, on a lead and muzzled, and cannot occupy a passenger seat. On some TER regional trains, there may be space in the gangway or carriage vestibule.',
      },
      {
        q: 'Do I need to show my dog\'s vaccinations on the train?',
        a: 'Not always required on French trains, but strongly recommended. In Spain (Renfe), presenting the vaccination booklet at check-in is mandatory. In Italy (Trenitalia), a health booklet is required. Always travel with your dog\'s documents.',
      },
    ],

    sourcesTitle: 'Verified sources',
    sourcesText: 'This guide is based on official information from SNCF, Ouigo, Deutsche Bahn, Renfe, Trenitalia, Eurostar, SNCB, NS, SBB, ÖBB and PKP Intercity, verified in 2025. Fares and rules may change — always check the operator\'s website before you travel.',

    internalLinksTitle: 'Related guides',
    guidePasseport: 'EU pet passport: complete guide',
    guideAll: 'All our practical guides',
  },

  es: {
    hero: 'Viajar en tren con tu perro por Europa',
    subtitle: 'SNCF, Deutsche Bahn, Renfe, Trenitalia, Eurostar... La guía completa de normas, tarifas, bozal y consejos prácticos para viajar tranquilamente en tren con tu perro.',
    lastUpdate: 'Actualizado en',
    breadcrumbGuides: 'Guías',
    breadcrumbCurrent: 'Tren con perro',
    badge: 'Guía práctica',

    keyFactsTitle: 'Las normas esenciales de un vistazo',
    keyFacts: [
      { icon: '🎫', title: 'Billete obligatorio', text: 'En toda Europa, los perros grandes necesitan billete. Los animales pequeños en transportín suelen viajar gratis.' },
      { icon: '😷', title: 'Bozal obligatorio', text: 'En Francia (SNCF, Ouigo), Italia, Austria y la mayoría de países, el bozal es obligatorio para perros de más de 6 kg.' },
      { icon: '🚫', title: 'Eurostar túnel = prohibido', text: 'Los animales de compañía (salvo perros guía) están totalmente prohibidos en los trenes Eurostar que cruzan el Eurotúnel entre Londres y Europa continental.' },
      { icon: '📋', title: 'Cartilla veterinaria', text: 'Lleva siempre la cartilla de vacunación de tu perro. Renfe (España) exige además un seguro de responsabilidad civil.' },
      { icon: '📏', title: 'Medidas del transportín', text: 'El formato estándar para animales pequeños es 45×30×25 cm (SNCF). Algunos operadores aceptan hasta 70×30×50 cm.' },
      { icon: '🐕‍🦺', title: 'Perros guía gratis', text: 'Los perros guía y de asistencia viajan gratis en toda Europa sin bozal obligatorio.' },
    ],

    tableTitle: 'Comparativa de compañías ferroviarias europeas',
    colOperator: 'Compañía',
    colAllowed: '¿Admitido?',
    colTicket: '¿Billete?',
    colPrice: 'Tarifa',
    colSize: 'Formato',
    colMuzzle: 'Bozal',
    colCarrier: 'Transportín',
    colMax: 'Máx / viajero',
    colNotes: 'Notas',

    allowedYes: 'Sí',
    allowedPartial: 'Parcial',
    allowedNo: 'No',

    sncfTitle: 'SNCF y Ouigo: viajar en tren con perro en Francia',
    sncfContent: [
      'SNCF es el operador más relevante para nuestros usuarios hispanohablantes que viajan por Francia. Las normas son claras y bastante permisivas.',
      'En los TGV INOUI e Intercités, tienes dos opciones: (1) tu perro pesa menos de 6 kg y viaja en un transportín cerrado (máx 45×30×25 cm) por 10 €; (2) tu perro es más grande y viaja con correa, con bozal, a tus pies por 20 €.',
      'Con OUIGO, la marca de bajo coste de SNCF, es aún más sencillo: tarifa única de 10 € para todos los perros independientemente del tamaño. El bozal sigue siendo obligatorio.',
      'Los perros de categoría 1 (tipo pit-bull, mastiff, tosa) están prohibidos en todos los trenes. Los de categoría 2 pueden viajar pero deben llevar bozal y correa.',
      'Reserva el billete de tu perro al mismo tiempo que el tuyo en SNCF Connect o la app de OUIGO. Un solo animal por viajero adulto.',
      'En los TGV Lyria (Francia–Suiza) se aplican las tarifas SNCF: 10 € en transportín o 20 € con correa y bozal.',
    ],
    sncfTip: 'Dato importante: SNCF indica que debes asegurarte de que tu perro no molesta a los demás viajeros. Si hay problemas, el revisor puede pedirte que recoloques a tu animal.',

    dbTitle: 'Deutsche Bahn: el tren más dog-friendly de Europa',
    dbContent: [
      'Alemania es probablemente el país más acogedor para perros en el transporte público europeo, y Deutsche Bahn no es una excepción.',
      'Un animal pequeño (del tamaño de un gato doméstico) en un transportín viaja gratis. Para un perro grande, necesitas comprar un billete: mitad del precio adulto en trenes de larga distancia (ICE, IC, EC), o tarifa adulta completa en trenes regionales.',
      'Una mejora reciente: los billetes para perros ya están disponibles online a través de la app DB Next Navigator o en next.bahn.de. ¡Adiós a las colas en la estación!',
      'La correa y el bozal son obligatorios para los perros grandes. En los andenes, tu perro también debe ir con correa.',
    ],
    dbTip: 'El Deutschland-Ticket (abono mensual) NO cubre perros. Debes comprar un billete animal separado aunque dispongas de este abono.',

    renfeTitle: 'Renfe: opciones variadas en España',
    renfeContent: [
      'Renfe ofrece varias modalidades según el tipo de tren. En trenes AVE (alta velocidad), tu perro viaja en una jaula (máx 60×35×35 cm) para la mayoría de trayectos. Algunos trenes AVE disponen de asientos especiales para perros (hasta 40 kg) por 35 € sin jaula.',
      'En los trenes Avlo (el bajo coste español), la tarifa es de 10 €. En los trenes de Media Distancia de vía métrica, los perros viajan gratis con correa y bozal.',
      'Importante: debes presentarte en el mostrador de Renfe en la estación 40 minutos antes de la salida con la cartilla de vacunación y un certificado de seguro de responsabilidad civil. Este es un requisito específico de España que se aplica estrictamente.',
    ],

    trenitTitle: 'Trenitalia: Italia da la bienvenida a los perros',
    trenitContent: [
      'Trenitalia permite que los animales pequeños (en transportín de máx 70×30×50 cm) viajen gratis en todos sus trenes. Para los perros grandes, el billete se vende al 50% de la tarifa de 2ª clase.',
      'Los perros grandes están admitidos en los Frecciarossa, Frecciargento, Frecciabianca e Intercity en 1ª y 2ª clase. Deben ir con correa y bozal.',
      'No olvides llevar el certificato di iscrizione all\'anagrafe canina (certificado de registro oficial) y el libretto sanitario de tu perro.',
      'Buenas noticias para el verano 2025: hasta el 15 de septiembre de 2025, Trenitalia ofrece viaje gratuito para perros de todos los tamaños en sus Frecce e Intercity.',
    ],

    eurostarTitle: 'Eurostar: una norma que debes conocer',
    eurostarContent: [
      'Eurostar es el operador que genera más preguntas entre nuestros lectores. La norma es simple pero absoluta: los animales de compañía (salvo perros guía y de asistencia) están PROHIBIDOS en todos los trenes que pasan por el Eurotúnel, es decir, los que unen Londres con París, Bruselas, Ámsterdam y otros destinos británicos.',
      'Sin embargo, en las rutas continentales de Eurostar (entre Bélgica, Francia, Alemania y Países Bajos, sin pasar por Londres), los animales son bienvenidos: gratis para menos de 6 kg en transportín, 30 € para perros grandes con correa y bozal.',
      'Si quieres cruzar el Canal de la Mancha con tu perro, las únicas opciones son el ferry (Brittany Ferries, DFDS, P&O) o el tren Eurotunnel Le Shuttle (solo para coches). Los perros no pueden viajar solos en el Eurotúnel.',
    ],

    tipsTitle: 'Consejos prácticos para viajar en tren con tu perro',
    tips: [
      {
        icon: '📅',
        title: 'Reserva con antelación',
        text: 'Compra el billete de tu perro al mismo tiempo que el tuyo. En SNCF Connect, marca "Animal de compañía" al reservar. En DB, usa la app DB Next Navigator.',
      },
      {
        icon: '🎒',
        title: 'Qué llevar',
        text: 'Cartilla de vacunación, correa resistente, bozal bien ajustado, agua y un cuenco plegable, premios para tranquilizar, una manta o cojín familiar, bolsas higiénicas.',
      },
      {
        icon: '🏛️',
        title: 'En la estación',
        text: 'Tu perro debe ir con correa en todos los andenes. En algunas estaciones grandes hay zonas verdes en el exterior para un último paseo antes de salir.',
      },
      {
        icon: '🚂',
        title: 'En el tren',
        text: 'Instálate lo antes posible. Comprueba que tu perro no molesta a los vecinos. Si está inquieto, anímalo a tumbarse debajo del asiento. Informa al revisor de la presencia de tu animal.',
      },
      {
        icon: '😰',
        title: 'Si tu perro no se instala',
        text: 'Prepara a tu perro antes del viaje: acostúmbralo al bozal, a los ruidos del tren y a los espacios reducidos. Un viaje de entrenamiento en trayecto corto puede ayudar. Para ansiedad severa, consulta a tu veterinario (ansiolíticos naturales o con receta).',
      },
      {
        icon: '🚫',
        title: 'Si hay un problema a bordo',
        text: 'Si otro viajero se queja o es alérgico, el revisor puede pedirte que cambies de lugar a tu perro. En el raro caso de denegación de embarque, solicita un parte de irregularidad para obtener el reembolso.',
      },
    ],

    interrailTitle: 'Interrail pass y viajar con un perro',
    interrailText: 'Tu pase Interrail cubre tu propio viaje, pero los billetes de animal deben comprarse por separado a cada operador ferroviario. Se aplican las normas locales de cada país. Ten en cuenta que Eurostar (Eurotúnel) sigue prohibido para animales incluso con pase Interrail.',

    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Mi perro necesita billete en el tren?',
        a: 'Depende del tamaño. En la mayoría de países europeos, los animales pequeños en un transportín adecuado viajan gratis. Los perros grandes necesitan billete de pago. En Francia (SNCF), son 10 € (transportín) o 20 € (con correa). En Alemania (DB), es la mitad del precio adulto en trenes de larga distancia.',
      },
      {
        q: '¿Mi perro necesita bozal en el tren?',
        a: 'Sí, en la mayoría de países y compañías. En Francia (SNCF, Ouigo), el bozal es obligatorio para perros de más de 6 kg. En Italia (Trenitalia), Austria (ÖBB) y Países Bajos (NS), también es obligatorio para perros grandes. En Bélgica (SNCB), se recomienda pero no siempre se exige estrictamente.',
      },
      {
        q: '¿Puedo poner a mi perro en bodega en el tren?',
        a: 'No. A diferencia de los aviones, los trenes europeos no tienen bodega para animales vivos. Tu perro debe estar siempre contigo: en un transportín en el área de pasajeros o con correa a tus pies.',
      },
      {
        q: '¿Puedo viajar con mi perro en el Eurostar?',
        a: 'No, no en los trenes que cruzan el Eurotúnel (hacia/desde Londres). Los animales están estrictamente prohibidos en estas rutas por razones sanitarias. Solo los perros de asistencia registrados pueden viajar. Para cruzar el Canal con un perro, toma un ferry o el Eurotunnel Le Shuttle (solo coches).',
      },
      {
        q: '¿Puede viajar en tren mi perro de raza "peligrosa"?',
        a: 'Los perros de categoría 1 (tipo pit-bull, American Staffordshire Terrier, Mastín Japonés, Tosa) están prohibidos en los trenes SNCF y Ouigo. Los de categoría 2 (Rottweiler, Staffordshire Bull Terrier, Dobermann, etc.) pueden viajar pero deben llevar bozal y correa en todo momento. Consulta las normas de cada operador para otros países.',
      },
      {
        q: '¿Mi perro debe permanecer en su sitio durante todo el viaje?',
        a: 'Sí, en la medida de lo posible. En SNCF, tu perro debe viajar a tus pies, con correa y bozal, y no puede ocupar un asiento de pasajero. En algunos TER regionales puede haber espacio en el pasillo o en el vestíbulo del vagón.',
      },
      {
        q: '¿Tengo que mostrar las vacunas de mi perro en el tren?',
        a: 'No siempre es obligatorio en Francia, pero es muy recomendable llevar la cartilla de salud. En España (Renfe), presentar la cartilla de vacunación en el mostrador es obligatorio. En Italia (Trenitalia), se requiere la libreta sanitaria. Viaja siempre con los documentos de tu animal.',
      },
    ],

    sourcesTitle: 'Fuentes verificadas',
    sourcesText: 'Esta guía se basa en información oficial de SNCF, Ouigo, Deutsche Bahn, Renfe, Trenitalia, Eurostar, SNCB, NS, SBB, ÖBB y PKP Intercity, verificada en 2025. Las tarifas y normas pueden cambiar — consulta siempre la web del operador antes de viajar.',

    internalLinksTitle: 'Guías relacionadas',
    guidePasseport: 'Pasaporte europeo para mascotas: guía completa',
    guideAll: 'Todas nuestras guías prácticas',
  },
}

const ALLOWED_COLORS: Record<AllowedStatus, { bg: string; text: string; border: string }> = {
  yes: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  partial: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  no: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
}

export default async function TrainAvecChienPage({
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
    { month: 'long', year: 'numeric' }
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
    mainEntityOfPage: `${SITE_URL}/${locale}/guides/train-avec-chien`,
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gray-50">

        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Link href={`/${locale}/guides`} className="text-blue-300 hover:text-white text-sm transition-colors">
                ← {copy.breadcrumbGuides}
              </Link>
              <span className="text-blue-500 text-sm">/</span>
              <span className="text-blue-400 text-sm">{copy.breadcrumbCurrent}</span>
            </div>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs font-medium mb-5">
              🚂 {copy.badge} · {copy.lastUpdate} {monthYear}
            </span>
            <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">{copy.hero}</h1>
            <p className="text-blue-200 text-base leading-relaxed max-w-3xl">{copy.subtitle}</p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Key facts box */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{copy.keyFactsTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {copy.keyFacts.map((fact, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="text-2xl mb-3">{fact.icon}</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{fact.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{fact.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Operators table */}
          <section className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{copy.tableTitle}</h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm bg-white">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left font-bold text-gray-700 px-4 py-3 whitespace-nowrap">{copy.colOperator}</th>
                    <th className="text-left font-bold text-gray-700 px-4 py-3 whitespace-nowrap">{copy.colAllowed}</th>
                    <th className="text-left font-bold text-gray-700 px-4 py-3 whitespace-nowrap">{copy.colPrice}</th>
                    <th className="text-left font-bold text-gray-700 px-4 py-3 whitespace-nowrap">{copy.colMuzzle}</th>
                    <th className="text-left font-bold text-gray-700 px-4 py-3 whitespace-nowrap hidden md:table-cell">{copy.colNotes}</th>
                  </tr>
                </thead>
                <tbody>
                  {OPERATORS.map((op, i) => {
                    const colors = ALLOWED_COLORS[op.allowed]
                    const allowedLabel = op.allowed === 'yes' ? copy.allowedYes : op.allowed === 'partial' ? copy.allowedPartial : copy.allowedNo
                    return (
                      <tr key={op.slug} className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                        <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">
                          <span className="mr-1.5">{op.flag}</span>{op.name}
                          <span className="block text-[10px] font-normal text-gray-400">{op.country[lang]}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                            {allowedLabel}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{op.price[lang]}</td>
                        <td className="px-4 py-3 text-gray-700 text-xs">{op.muzzle[lang]}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell max-w-xs">
                          {op.notes[lang].startsWith('⚠️') ? (
                            <span className="font-semibold text-amber-700">{op.notes[lang]}</span>
                          ) : op.notes[lang]}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* SNCF deep-dive */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-5">{copy.sncfTitle}</h2>
            <div className="space-y-4 mb-5">
              {copy.sncfContent.map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed">{para}</p>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-amber-500 text-xl flex-shrink-0">💡</span>
              <p className="text-sm text-amber-800 leading-relaxed">{copy.sncfTip}</p>
            </div>
          </section>

          {/* Deutsche Bahn deep-dive */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-5">{copy.dbTitle}</h2>
            <div className="space-y-4 mb-5">
              {copy.dbContent.map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed">{para}</p>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-blue-500 text-xl flex-shrink-0">ℹ️</span>
              <p className="text-sm text-blue-800 leading-relaxed">{copy.dbTip}</p>
            </div>
          </section>

          {/* Renfe */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-5">{copy.renfeTitle}</h2>
            <div className="space-y-4">
              {copy.renfeContent.map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed">{para}</p>
              ))}
            </div>
          </section>

          {/* Trenitalia */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-5">{copy.trenitTitle}</h2>
            <div className="space-y-4">
              {copy.trenitContent.map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed">{para}</p>
              ))}
            </div>
          </section>

          {/* Eurostar */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-5">{copy.eurostarTitle}</h2>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 mb-5 flex items-start gap-3">
              <span className="text-red-500 text-xl flex-shrink-0">⚠️</span>
              <p className="text-sm font-semibold text-red-800 leading-relaxed">{copy.eurostarContent[0]}</p>
            </div>
            <div className="space-y-4">
              {copy.eurostarContent.slice(1).map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed">{para}</p>
              ))}
            </div>
          </section>

          {/* Practical tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{copy.tipsTitle}</h2>
            <div className="space-y-4">
              {copy.tips.map((tip, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{tip.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{tip.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{tip.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interrail note */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 mb-12 flex items-start gap-3">
            <span className="text-indigo-500 text-xl flex-shrink-0">🌍</span>
            <div>
              <p className="text-sm font-bold text-indigo-800 mb-1">{copy.interrailTitle}</p>
              <p className="text-sm text-indigo-700 leading-relaxed">{copy.interrailText}</p>
            </div>
          </div>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8">{copy.faqTitle}</h2>
            <div className="space-y-4">
              {copy.faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sources */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-10 flex items-start gap-3">
            <span className="text-blue-500 text-xl flex-shrink-0">🔍</span>
            <div>
              <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">{copy.sourcesTitle}</p>
              <p className="text-sm text-blue-800 leading-relaxed">{copy.sourcesText}</p>
            </div>
          </div>

          {/* Internal links */}
          <section className="mb-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-4">{copy.internalLinksTitle}</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/guides/passeport-animal`}
                className="inline-flex items-center gap-2 text-sm font-semibold bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-4 py-2 rounded-full transition-all shadow-sm"
              >
                📔 {copy.guidePasseport}
              </Link>
              <Link
                href={`/${locale}/guides`}
                className="inline-flex items-center gap-2 text-sm font-semibold bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-4 py-2 rounded-full transition-all shadow-sm"
              >
                📚 {copy.guideAll}
              </Link>
            </div>
          </section>

          <GuideFooter locale={locale} currentSlug="train-avec-chien" />

        </div>
      </div>
    </>
  )
}
