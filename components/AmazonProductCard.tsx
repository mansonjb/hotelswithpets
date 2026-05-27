'use client'

import { useState } from 'react'
import { AMAZON_AFFILIATE_TAG, buildAmazonLink } from '@/lib/amazon'
import type { AmazonProduct } from '@/data/amazon-products'

interface Props {
  product: AmazonProduct
  /** Campaign sub-tag for analytics (e.g. 'accessoires-chien' or 'heat-guide'). */
  campaign: string
  /** Optional rank shown as a small number badge (1, 2, 3...). */
  rank?: number
}

/**
 * Product image URLs we try in order:
 *   1. Explicit `imageUrl` from the registry (SiteStripe HD), if set.
 *   2. Amazon Associates image widget — official endpoint that works for
 *      any active ASIN regardless of category. This is what SiteStripe
 *      generates under the hood.
 *   3. Legacy `m.media-amazon.com/images/P/{ASIN}.jpg` pattern (~50–90%
 *      of products, fails on newer / non-book items).
 *   4. Older `images-na.ssl-images-amazon.com` fallback.
 *   5. If everything 404s, the card shows the product emoji.
 */
function getImageCandidates(product: AmazonProduct): string[] {
  const urls: string[] = []
  if (product.imageUrl) urls.push(product.imageUrl)
  urls.push(
    `https://ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${product.asin}&Format=_SL250_&ID=AsinImage&MarketPlace=FR&ServiceVersion=20070822&WS=1&tag=${AMAZON_AFFILIATE_TAG}`
  )
  urls.push(`https://m.media-amazon.com/images/P/${product.asin}.jpg`)
  urls.push(`https://images-na.ssl-images-amazon.com/images/P/${product.asin}.01._SCLZZZZZZZ_.jpg`)
  return urls
}

export default function AmazonProductCard({ product, campaign, rank }: Props) {
  const href = buildAmazonLink(product.asin, { campaign })
  const candidates = getImageCandidates(product)
  const [imgIdx, setImgIdx] = useState(0)
  const imgSrc = imgIdx < candidates.length ? candidates[imgIdx] : null

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

        {/* Product image (with multi-step fallback) */}
        <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 bg-stone-50 rounded-xl border border-stone-100 flex items-center justify-center overflow-hidden">
          {imgSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imgSrc}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
              onError={() => setImgIdx(i => i + 1)}
            />
          ) : (
            <span className="text-4xl" aria-hidden="true">{product.emoji}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
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
