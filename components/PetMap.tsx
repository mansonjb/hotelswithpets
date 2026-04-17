'use client'

interface PetMapProps {
  lat: number
  lng: number
  destName: string
  country?: string
  /** Stay22 dashboard map ID — uses a pre-curated Stay22 map when provided */
  stay22MapId?: string
  /** Map height in px, default 420 */
  height?: number
}

/**
 * Interactive hotel map.
 * - When stay22MapId is provided: uses a pre-curated Stay22 dashboard map (shows hotels with booking links)
 * - Otherwise: falls back to Google Maps embed centred on the destination
 * Stay22 LetMeAllez affiliate script is loaded separately in layout.tsx.
 */
export default function PetMap({ lat, lng, destName, country, stay22MapId, height = 420 }: PetMapProps) {
  const mapSrc = stay22MapId
    ? `https://www.stay22.com/embed/${stay22MapId}`
    : `https://maps.google.com/maps?q=pet+friendly+hotels+${encodeURIComponent(`${destName}${country ? ' ' + country : ''}`)}&t=m&z=13&ie=UTF8&iwloc=&output=embed`

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
