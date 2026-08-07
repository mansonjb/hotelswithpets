'use client'

const STAY22_AID = 'eijeanbaptistemanson'

interface Stay22MapProps {
  lat: number
  lng: number
  destName: string
  /** Map height in px, default 420 */
  height?: number
  /** Locale for Stay22 widget UI (defaults to 'en'). Accepts 'en', 'fr', 'es', 'pt' */
  locale?: string
  /** Stay22 campaign tag for attribution (defaults to 'hotelswithpets'). */
  campaign?: string
}

/**
 * Stay22 interactive hotel map widget.
 * Uses the Stay22 /embed/gm endpoint with our AID (same as PetMap) - the
 * generated-map endpoint needs only the AID + lat/lng, no dashboard map ID.
 * The previous /embed/{lmaID} form treated the lmaID as a pre-created map ID
 * that does not exist, which rendered the "Help us find your Stay22 map"
 * fallback. The LetMeAllez script in layout.tsx auto-upgrades Booking.com
 * links on the page to multi-platform affiliate links.
 */
export default function Stay22Map({ lat, lng, destName, height = 420, locale = 'en', campaign = 'hotelswithpets' }: Stay22MapProps) {
  const stay22Lang = ['en', 'fr', 'es', 'pt', 'de'].includes(locale) ? locale : 'en'
  const src = `https://www.stay22.com/embed/gm?aid=${STAY22_AID}&lat=${lat}&lng=${lng}&campaign=${campaign}&lang=${stay22Lang}`

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      <iframe
        src={src}
        title={`Pet-friendly hotels in ${destName}`}
        width="100%"
        height={height}
        style={{ border: 0, display: 'block' }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
