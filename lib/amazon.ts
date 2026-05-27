/**
 * Amazon Associates affiliate-link builder for HotelsWithPets.com.
 *
 * Our Amazon FR tag: `mansonjb-21`. Stored as a constant — never override it
 * per-call. To attribute clicks per page or per campaign, use the `campaign`
 * option which sets `ascsubtag` (Amazon's free-form sub-tag, surfaced in the
 * Associates click report).
 *
 * `extractASIN` accepts ANY Amazon product URL the user copies — including
 * the bloated SiteStripe links with crid / dib / sprefix / linkId / etc.
 * — and returns just the 10-char ASIN. Pair it with `buildAmazonLink` to
 * produce a clean canonical affiliate URL.
 */

export const AMAZON_AFFILIATE_TAG = 'mansonjb-21'

/**
 * Extract the 10-character Amazon ASIN from any product URL.
 * Handles /dp/ASIN, /gp/product/ASIN, /-/dp/ASIN forms.
 * Returns null if the URL doesn't contain a recognisable ASIN.
 */
export function extractASIN(url: string): string | null {
  const m = url.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/i)
  return m ? m[1].toUpperCase() : null
}

interface BuildOpts {
  /**
   * Free-form analytics tag (sub-id). Visible in Amazon Associates click
   * reports under "Tracking ID sub-tag". Use it to identify the source page
   * or campaign, e.g. `accessoires-chien` or `tips-athens`.
   */
  campaign?: string
}

/**
 * Build a clean Amazon FR affiliate URL for a given ASIN.
 *
 * Output shape:
 *   https://www.amazon.fr/dp/{ASIN}?tag=mansonjb-21&linkCode=ll1&language=fr_FR
 *   (plus &ascsubtag=campaign when provided)
 */
export function buildAmazonLink(asin: string, opts: BuildOpts = {}): string {
  const params = new URLSearchParams({
    tag: AMAZON_AFFILIATE_TAG,
    linkCode: 'll1',
    language: 'fr_FR',
  })
  if (opts.campaign) params.set('ascsubtag', opts.campaign)
  return `https://www.amazon.fr/dp/${asin}?${params.toString()}`
}

/**
 * Convenience: take a raw Amazon URL (the bloated SiteStripe one the user
 * copies from their browser) and return the clean canonical affiliate URL.
 * Returns null if no ASIN can be extracted.
 */
export function rebuildAffiliateLink(rawUrl: string, opts: BuildOpts = {}): string | null {
  const asin = extractASIN(rawUrl)
  if (!asin) return null
  return buildAmazonLink(asin, opts)
}
