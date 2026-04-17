export const SITE_URL = 'https://hotelswithpets.com'

/** Stay22 partner AID — used for map embeds and Allez deep links */
export const STAY22_AID = 'eijeanbaptistemanson'

/**
 * Build a Stay22 Allez deep link for a hotel.
 * Redirects the user to the right booking platform for their country (Booking.com, Expedia, etc.)
 * and tracks the click under our affiliate account.
 *
 * @param hotelName - Hotel name (will be URL-encoded)
 * @param cityName  - City name (will be URL-encoded, e.g. "Amsterdam")
 * @param country   - Country name (appended to address for precision, e.g. "Netherlands")
 * @param campaign  - Optional sub-label for analytics (default: "hotelswithpets")
 */
export function buildAllezLink(
  hotelName: string,
  cityName: string,
  country: string,
  campaign = 'hotelswithpets'
): string {
  const address = encodeURIComponent(`${cityName} ${country}`)
  const name = encodeURIComponent(hotelName)
  return `https://www.stay22.com/allez/roam?aid=${STAY22_AID}&campaign=${campaign}&hotelname=${name}&address=${address}`
}

/**
 * Build a Stay22 Allez destination link (no specific hotel — shows all options in the city).
 */
export function buildAllezDestLink(cityName: string, country: string, campaign = 'hotelswithpets'): string {
  const address = encodeURIComponent(`${cityName} ${country}`)
  return `https://www.stay22.com/allez/roam?aid=${STAY22_AID}&campaign=${campaign}&address=${address}`
}

/**
 * Build a Stay22 map embed URL for a destination.
 */
export function buildStay22MapSrc(lat: number, lng: number, campaign = 'hotelswithpets'): string {
  return `https://www.stay22.com/embed/gm?aid=${STAY22_AID}&lat=${lat}&lng=${lng}&campaign=${campaign}`
}
