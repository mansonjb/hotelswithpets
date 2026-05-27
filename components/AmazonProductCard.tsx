import { buildAmazonLink } from '@/lib/amazon'
import type { AmazonProduct } from '@/data/amazon-products'

interface Props {
  product: AmazonProduct
  /** Campaign sub-tag for analytics (e.g. 'accessoires-chien' or 'heat-guide'). */
  campaign: string
  /** Optional rank shown as a small number badge (1, 2, 3…). */
  rank?: number
}

/**
 * Standard product card used across /accessoires-* pages. Renders the
 * product name, description, price hint, and a "Voir sur Amazon →" CTA
 * that opens an affiliate link with `tag=mansonjb-21` + per-campaign
 * `ascsubtag`.
 *
 * No image: Amazon's Operating Agreement only permits product images
 * served via the Amazon Product Advertising API (PA-API) or specific
 * Native Shopping Ads. Plain text + bold CTA is compliant and converts
 * fine.
 */
export default function AmazonProductCard({ product, campaign, rank }: Props) {
  const href = buildAmazonLink(product.asin, { campaign })

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored nofollow"
      className="block bg-white rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-lg transition-all p-5 group"
    >
      <div className="flex items-start gap-4">
        {rank !== undefined && (
          <span className="flex-shrink-0 w-9 h-9 bg-amber-100 text-amber-900 rounded-full font-bold flex items-center justify-center text-sm">
            {rank}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl" aria-hidden="true">{product.emoji}</span>
            {product.featured && (
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                Notre choix
              </span>
            )}
          </div>
          <h3 className="font-bold text-stone-900 leading-tight mb-2">{product.name}</h3>
          <p className="text-sm text-stone-700 leading-relaxed mb-3">{product.desc}</p>
          <div className="flex items-center justify-between gap-3">
            {product.priceHint && (
              <span className="text-sm font-semibold text-stone-600">{product.priceHint}</span>
            )}
            <span className="text-sm font-bold text-amber-700 group-hover:text-amber-900">
              Voir sur Amazon →
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}
