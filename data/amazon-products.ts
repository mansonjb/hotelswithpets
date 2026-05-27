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
  {
    asin: 'B072Q1NFC9',
    name: `PETKIT Eversweet — Gourde nomade pour chien`,
    desc: `Bouteille de voyage 400 ml avec gamelle intégrée, déclenchement à une main et joint anti-fuite. La référence pour les balades estivales et les road trips — l'eau reste fraîche plusieurs heures.`,
    category: 'voyage',
    petType: 'both',
    priceHint: '~25 €',
    emoji: '💧',
    featured: true,
  },
  // ── User: paste more Amazon FR URLs here and I'll fill in the entries.
  // Each entry below is a placeholder slot — leave empty until you give me the URL.
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
