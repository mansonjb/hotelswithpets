export const SITE_URL = 'https://www.hotelswithpets.com'

/** Stay22 partner AID, used for map embeds and Allez deep links */
export const STAY22_AID = 'eijeanbaptistemanson'

/**
 * Compute checkin/checkout query-string fragment for a given nights-default.
 * Checkin = today + 30 days (typical pet-travel planning horizon).
 * Returns empty string if nights <= 0 (caller wants Stay22's own default).
 */
function buildDateRange(nights: number): string {
  if (!nights || nights <= 0) return ''
  const today = new Date()
  const checkin = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
  const checkout = new Date(checkin.getTime() + nights * 24 * 60 * 60 * 1000)
  const fmt = (d: Date) => d.toISOString().split('T')[0]
  return `&checkin=${fmt(checkin)}&checkout=${fmt(checkout)}`
}

/**
 * Build a Stay22 Allez deep link for a hotel.
 * Redirects the user to the right booking platform for their country (Booking.com, Expedia, etc.)
 * and tracks the click under our affiliate account.
 *
 * @param hotelName - Hotel name (will be URL-encoded)
 * @param cityName  - City name (will be URL-encoded, e.g. "Amsterdam")
 * @param country   - Country name (appended to address for precision, e.g. "Netherlands")
 * @param campaign  - Optional sub-label for analytics (default: "hotelswithpets")
 * @param nights    - Optional. When > 0, pre-fills checkin (today+30) and checkout to push longer stays.
 *                    Use 2-3 for city-trip pages, 3-4 for multi-day itinerary pages. Default 0 = no date params.
 */
export function buildAllezLink(
  hotelName: string,
  cityName: string,
  country: string,
  campaign = 'hotelswithpets',
  nights = 0
): string {
  const address = encodeURIComponent(`${cityName} ${country}`)
  const name = encodeURIComponent(hotelName)
  return `https://www.stay22.com/allez/roam?aid=${STAY22_AID}&campaign=${campaign}&hotelname=${name}&address=${address}${buildDateRange(nights)}`
}

/**
 * Build a Stay22 Allez destination link (no specific hotel, shows all options in the city).
 * @param nights - Optional. When > 0, pre-fills checkin (today+30) and checkout. Default 0 = no date params.
 */
export function buildAllezDestLink(
  cityName: string,
  country: string,
  campaign = 'hotelswithpets',
  nights = 0
): string {
  const address = encodeURIComponent(`${cityName} ${country}`)
  return `https://www.stay22.com/allez/roam?aid=${STAY22_AID}&campaign=${campaign}&address=${address}${buildDateRange(nights)}`
}

/**
 * Build a Stay22 map embed URL for a destination.
 */
export function buildStay22MapSrc(lat: number, lng: number, campaign = 'hotelswithpets'): string {
  return `https://www.stay22.com/embed/gm?aid=${STAY22_AID}&lat=${lat}&lng=${lng}&campaign=${campaign}`
}
