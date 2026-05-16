'use client'

const STAY22_AID = 'eijeanbaptistemanson'

interface PetMapProps {
  lat: number
  lng: number
  destName: string
  country?: string
  /** Map height in px, default 420 */
  height?: number
  /** Ignored, kept for backward compat, Stay22 /gm endpoint doesn't need a dashboard map ID */
  stay22MapId?: string
  /** Locale for Stay22 widget UI (defaults to 'en'). Accepts 'en', 'fr', 'es', 'pt' */
  locale?: string
}

/**
 * Stay22 interactive hotel map.
 * Uses the Stay22 /embed/gm endpoint: no pre-created dashboard map ID required.
 * Requires only our partner AID + lat/lng coordinates.
 * The LetMeAllez script (in layout.tsx) auto-upgrades all Booking.com links on the page.
 */
export default function PetMap({ lat, lng, destName, height = 420, locale = 'en' }: PetMapProps) {
  // Stay22 widget locale, falls back to 'en' for unknown values
  const stay22Lang = ['en', 'fr', 'es', 'pt'].includes(locale) ? locale : 'en'
  const src = `https://www.stay22.com/embed/gm?aid=${STAY22_AID}&lat=${lat}&lng=${lng}&campaign=hotelswithpets&lang=${stay22Lang}`

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      <iframe
        id="stay22-widget"
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
