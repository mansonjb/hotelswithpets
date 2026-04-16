'use client'

interface PetMapProps {
  lat: number
  lng: number
  destName: string
  /** Map height in px, default 420 */
  height?: number
  /** Zoom level 1-19, default 14 */
  zoom?: number
}

/**
 * OpenStreetMap embed — free, no API key, no account required.
 * Shows the destination area with a marker. Booking.com affiliate
 * links are handled separately by Stay22 LetMeAllez (in layout.tsx).
 */
export default function PetMap({ lat, lng, destName, height = 420, zoom = 14 }: PetMapProps) {
  // Bounding box: roughly 1.5 km radius around the city center
  const delta = 0.025
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`
  const fullMapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative group">
      <iframe
        src={src}
        title={`Pet-friendly hotels map — ${destName}`}
        width="100%"
        height={height}
        style={{ border: 0, display: 'block' }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      {/* "Open full map" link — OSM requirement */}
      <div className="absolute bottom-2 right-2">
        <a
          href={fullMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-xs text-gray-600 hover:text-blue-600 px-2 py-1 rounded-lg shadow transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          OpenStreetMap
        </a>
      </div>
    </div>
  )
}
