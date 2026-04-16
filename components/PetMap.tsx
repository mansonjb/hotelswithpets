'use client'

// Stay22 affiliate campaign ID (LetMeAllez)
const STAY22_CAMPAIGN_ID = '69e08b99d5ab79f03e163885'

interface PetMapProps {
  lat: number
  lng: number
  destName: string
  country?: string
  /** Stay22 dashboard map ID — uses a pre-curated map when provided */
  stay22MapId?: string
  /** Map height in px, default 420 */
  height?: number
}

/**
 * Interactive hotel map powered by Stay22.
 * - When stay22MapId is provided: uses the pre-curated Stay22 dashboard map
 * - Otherwise: uses Stay22's location-search embed with coordinates
 * Stay22 LetMeAllez affiliate script is loaded separately in layout.tsx.
 */
export default function PetMap({ lat, lng, destName, country, stay22MapId, height = 420 }: PetMapProps) {
  const mapSrc = stay22MapId
    ? `https://www.stay22.com/embed/${stay22MapId}`
    : `https://www.stay22.com/embed?aid=${STAY22_CAMPAIGN_ID}&address=${encodeURIComponent(`${destName}${country ? ', ' + country : ''}`)}&lat=${lat}&lng=${lng}&zoom=13`

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      <iframe
        id="stay22-widget"
        src={mapSrc}
        title={`Pet-friendly hotels map — ${destName}`}
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
