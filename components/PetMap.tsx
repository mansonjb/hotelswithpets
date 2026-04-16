'use client'

interface PetMapProps {
  lat: number
  lng: number
  destName: string
  /** Stay22 map ID — uses Stay22 embed when provided, OpenStreetMap otherwise */
  stay22MapId?: string
  /** Map height in px, default 420 */
  height?: number
}

/**
 * Interactive hotel map. Uses Stay22 when a map ID is configured
 * (shows live hotel prices), falls back to OpenStreetMap otherwise.
 * Stay22 LetMeAllez affiliate script is handled separately in layout.tsx.
 */
export default function PetMap({ lat, lng, destName, stay22MapId, height = 420 }: PetMapProps) {
  if (stay22MapId) {
    return (
      <div className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        <iframe
          id="stay22-widget"
          src={`https://www.stay22.com/embed/${stay22MapId}`}
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

  // Fallback: OpenStreetMap embed — free, no API key
  const delta = 0.025
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`
  const fullMapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=14/${lat}/${lng}`

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative">
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
