/**
 * Curated registry of Amazon FR products we recommend on /accessoires-* pages.
 *
 * How to add a product:
 *   1. Copy the Amazon FR product URL (SiteStripe or browser URL bar — doesn't
 *      matter, we strip the noise).
 *   2. Run `npx tsx scripts/asin.ts <URL>` OR open the URL and grab the 10-char
 *      code after /dp/ (e.g. B072Q1NFC9).
 *   3. Add an entry below with the ASIN, name, 1-2 sentence FR description,
 *      category, petType, priceHint, emoji.
 *   4. The page templates auto-render any product matching the requested
 *      category + petType.
 *
 * Categories chosen for SEO + funnel logic:
 *   - voyage          : gourdes, sacs, cages de transport voiture/avion
 *   - rafraichissement: tapis, gilets, bandanas anti-chaleur, brumisateurs
 *   - gamelle         : bols, fontaines, distributeurs
 *   - transport       : harnais voiture, ceintures, paniers vélo
 *   - hygiene         : shampooings, brosses, lingettes
 *   - jouet           : Kong, balles, peluches durables
 *   - securite        : laisses LED, médailles, GPS
 *   - confort         : couchage, panier, couvertures
 */

export type ProductCategory =
  | 'voyage'
  | 'rafraichissement'
  | 'gamelle'
  | 'transport'
  | 'hygiene'
  | 'jouet'
  | 'securite'
  | 'confort'

export type PetType = 'dog' | 'cat' | 'both'

export interface AmazonProduct {
  asin: string
  /** Product title in French (concise, no SEO stuffing). */
  name: string
  /** 1-2 sentence French description. Why we recommend it, when to use it. */
  desc: string
  category: ProductCategory
  petType: PetType
  /** Optional price hint like "~25 €" or "15–30 €". Stay vague — prices change. */
  priceHint?: string
  /** Single emoji used as a visual category tag. */
  emoji: string
  /**
   * Optional: mark this product as the headline pick of its category.
   * Used to highlight at the top of category-specific lists.
   */
  featured?: boolean
}

// ──────────────────────────────────────────────────────────────────────────
// Real products — verified ASINs (user-supplied or hand-checked)
// ──────────────────────────────────────────────────────────────────────────

export const PRODUCTS: AmazonProduct[] = [
  // ── Voyage / hydratation ──────────────────────────────────────────────
  {
    asin: 'B072Q1NFC9',
    name: `PETKIT Eversweet — Gourde nomade`,
    desc: `Bouteille de voyage 400 ml avec gamelle intégrée, déclenchement à une main et joint anti-fuite. La référence pour les balades estivales et les road trips — l'eau reste fraîche plusieurs heures.`,
    category: 'voyage',
    petType: 'both',
    priceHint: '~25 €',
    emoji: '💧',
    featured: true,
  },
  {
    asin: 'B06Y4CCPRC',
    name: `WoofWoof — Gamelle pliante silicone 350 ml`,
    desc: `Gamelle pliable en silicone alimentaire, mousqueton inclus pour l'accrocher au sac ou à la laisse. Indispensable pour les pauses-eau en rando ou sur l'autoroute.`,
    category: 'gamelle',
    petType: 'both',
    priceHint: '~8 €',
    emoji: '🥣',
  },

  // ── Transport voiture / avion ─────────────────────────────────────────
  {
    asin: 'B01M2ZVPWJ',
    name: `EzyDog Drive — Harnais de sécurité voiture (M)`,
    desc: `Harnais crash-testé ECE R16 + FMVSS 213, sangles de qualité automobile, ajustement numéroté. Le seul vraiment sérieux à ce prix — se clipse sur la ceinture passager en 5 secondes.`,
    category: 'transport',
    petType: 'dog',
    priceHint: '60–90 €',
    emoji: '🚗',
    featured: true,
  },
  {
    asin: 'B00Q5KBRBA',
    name: `Trixie Wings — Sac de transport cabine avion`,
    desc: `Sac IATA cabine 46×28×23 cm, conforme à la majorité des compagnies (Air France, Lufthansa, KLM). Idéal pour un chat ou un petit chien jusqu'à 6 kg — toile rigide qui ne s'écrase pas.`,
    category: 'transport',
    petType: 'both',
    priceHint: '40–55 €',
    emoji: '✈️',
  },
  {
    asin: 'B000VBPEEU',
    name: `Trixie Ryan — Sac de transport souple`,
    desc: `Sac souple polyester, bandoulière rembourrée, ouverture latérale + supérieure. Parfait pour les courts trajets vétérinaire ou train, dimensions adaptées aux chats et chiens jusqu'à 8 kg.`,
    category: 'transport',
    petType: 'both',
    priceHint: '~35 €',
    emoji: '🎒',
  },
  {
    asin: 'B07G495HGR',
    name: `HOMIMP — Harnais H anti-fugue pour chat`,
    desc: `Harnais en H réglable encolure + poitrail, double point d'attache anti-évasion. Indispensable pour habituer un chat aux sorties extérieures ou aux haltes en voyage.`,
    category: 'transport',
    petType: 'cat',
    priceHint: '15–20 €',
    emoji: '🐈',
  },

  // ── Fontaines / hydratation maison ────────────────────────────────────
  {
    asin: 'B0006L2LWS',
    name: `Catit — Fontaine à eau 3 L`,
    desc: `Fontaine silencieuse à filtration charbon, débit doux qui encourage les chats peu buveurs à s'hydrater. La référence depuis 15 ans — pièces détachées trouvables partout.`,
    category: 'gamelle',
    petType: 'cat',
    priceHint: '25–35 €',
    emoji: '⛲',
    featured: true,
  },

  // ── Rafraîchissement / canicule ───────────────────────────────────────
  {
    asin: 'B08M3M6TT1',
    name: `Pecute — Tapis rafraîchissant gel (M, 65×50 cm)`,
    desc: `Tapis gel auto-activé par pression, refroidit sans frigo ni eau. Format M pour chien moyen (15–25 kg) ou grand chat — à poser dans le panier, en voiture ou en chambre d'hôtel l'été.`,
    category: 'rafraichissement',
    petType: 'both',
    priceHint: '25–35 €',
    emoji: '❄️',
    featured: true,
  },
  {
    asin: 'B06XJXKLTG',
    name: `Pecute — Tapis rafraîchissant gel (L, 90×50 cm)`,
    desc: `Version grande taille du tapis gel Pecute, pour Labrador, Berger, Golden. Tient ~3 h en plein soleil, se recharge en 20 min à l'ombre.`,
    category: 'rafraichissement',
    petType: 'dog',
    priceHint: '35–50 €',
    emoji: '❄️',
  },
  {
    asin: 'B08144QV3P',
    name: `Pecute — Tapis rafraîchissant gel (XXL, 140×90 cm)`,
    desc: `Format XXL pour très grands chiens (Saint-Bernard, Dogue) ou pour couvrir tout un panier. Même technologie gel auto-activé, pas de branchement.`,
    category: 'rafraichissement',
    petType: 'dog',
    priceHint: '55–75 €',
    emoji: '❄️',
  },
  {
    asin: 'B01MR5LRPJ',
    name: `Ruffwear Swamp Cooler — Gilet rafraîchissant (L)`,
    desc: `Gilet 3 couches à mouiller : la couche extérieure réfléchit le soleil (SPF 50+), la couche intermédiaire stocke l'eau, la doublure mesh garde le chien au sec. Le meilleur outil canicule pour les chiens de rando.`,
    category: 'rafraichissement',
    petType: 'dog',
    priceHint: '70–90 €',
    emoji: '🦺',
    featured: true,
  },
  {
    asin: 'B00XW9ZZDI',
    name: `Aqua Coolkeeper — Bandana rafraîchissant (Pacific Blue, 44–52 cm)`,
    desc: `Bandana à cristaux Hydroquartz : on trempe 15 min dans l'eau froide, ça refroidit le chien par évaporation pendant 2 jours. Solution légère pour les balades en ville l'été.`,
    category: 'rafraichissement',
    petType: 'dog',
    priceHint: '15–25 €',
    emoji: '🟦',
  },
  {
    asin: 'B07SR9PCQH',
    name: `Lionto — Piscine pliable pour chien (120 cm)`,
    desc: `Piscine PVC pliable, fond antidérapant, valve de vidange. À installer sur la terrasse ou au camping — un chien qui se rafraîchit dans l'eau évite 80% des coups de chaleur estivaux.`,
    category: 'rafraichissement',
    petType: 'dog',
    priceHint: '30–45 €',
    emoji: '🏊',
  },

  // ── Anti-stress chat ──────────────────────────────────────────────────
  {
    asin: 'B0031TFZRK',
    name: `Feliway Classic — Kit diffuseur + recharge 48 ml`,
    desc: `Diffuseur de phéromones apaisantes, couvre 70 m² pendant 30 jours. À brancher 48h avant un déménagement, un voyage ou une arrivée à l'hôtel — réduit les marquages et l'anxiété.`,
    category: 'confort',
    petType: 'cat',
    priceHint: '25–35 €',
    emoji: '🌸',
    featured: true,
  },
  {
    asin: 'B015HDIQ1E',
    name: `Feliway Classic — Recharge seule 48 ml`,
    desc: `Recharge mensuelle pour diffuseur Feliway Classic déjà en place. À renouveler tous les 30 jours pendant les périodes de stress (voyages, travaux, nouvel animal).`,
    category: 'confort',
    petType: 'cat',
    priceHint: '15–20 €',
    emoji: '🌸',
  },

  // ── Jouet / occupation ────────────────────────────────────────────────
  {
    asin: 'B000AYN7LU',
    name: `KONG Classic — Jouet à garnir (M)`,
    desc: `Caoutchouc naturel ultra-résistant, à remplir de pâté ou de friandises pour occuper le chien 30+ minutes. L'arme absolue contre l'ennui en chambre d'hôtel ou en train.`,
    category: 'jouet',
    petType: 'dog',
    priceHint: '12–18 €',
    emoji: '🦴',
  },
  {
    asin: 'B0002AR0I8',
    name: `KONG Classic — Jouet à garnir (L)`,
    desc: `Version grande taille du Kong Classic, pour chiens 13–30 kg. Lavable lave-vaisselle, garantie à vie sur la robustesse — un investissement qui dure.`,
    category: 'jouet',
    petType: 'dog',
    priceHint: '15–22 €',
    emoji: '🦴',
  },
]

// Helper accessors used by the page templates
export const productsByCategory = (cat: ProductCategory) =>
  PRODUCTS.filter(p => p.category === cat)

export const productsForPetType = (pet: PetType) =>
  PRODUCTS.filter(p => p.petType === pet || p.petType === 'both')

export const productsHeatSafety = () =>
  PRODUCTS.filter(p =>
    p.category === 'rafraichissement' ||
    p.category === 'voyage' ||
    (p.category === 'gamelle' && /fontaine|fraîch/i.test(p.desc))
  )
