/**
 * Value-aware hotel ordering.
 *
 * Plain rating-desc surfaces the most expensive luxury hotels first, which
 * causes price-shock on premium destinations (Lugano, Annecy, Zermatt...): a
 * user clicking from a free dog-beach page lands on a €475 palace and bounces.
 * Clarity/transaction analysis showed those pages generate clicks but no
 * bookings, while affordable sea-coast stays convert.
 *
 * `valueSort` keeps quality dominant but applies a mild price penalty relative
 * to the most expensive hotel in the same set, so a well-rated affordable
 * option leads. Where prices are tightly clustered (typical sea-coast town) the
 * penalty barely moves the order; where the spread is large (premium lake/alpine
 * destinations) it pulls the value option to the top and pushes luxury down.
 *
 *   score = rating - (priceFrom / maxPriceInSet) * 1.5
 */
type HotelLike = { rating: number; reviewCount: number; priceFrom: number }

const PRICE_WEIGHT = 1.5

export function valueSort<T extends HotelLike>(hotels: T[]): T[] {
  if (hotels.length <= 1) return [...hotels]
  const maxPrice = Math.max(...hotels.map((h) => h.priceFrom || 0)) || 1
  const score = (h: T) => h.rating - ((h.priceFrom || maxPrice) / maxPrice) * PRICE_WEIGHT
  return [...hotels].sort((a, b) => score(b) - score(a) || b.reviewCount - a.reviewCount)
}
