'use client'

interface Stay22MapProps {
  lat: number
  lng: number
  destName: string
  /** Map height in px, default 420 */
  height?: number
}

/**
 * Stay22 interactive hotel map widget.
 * Uses the Stay22 embed endpoint with our partner ID.
 * The LetMeAllez script in layout.tsx automatically upgrades
 * all Booking.com links on the page to multi-platform affiliate links.
 */
export default function Stay22Map({ lat, lng, destName, height = 420 }: Stay22MapProps) {
  const partnerId = '69e08b99d5ab79f03e163885'
  const src = `https://www.stay22.com/embed/${partnerId}?lat=${lat}&lng=${lng}&zoom=13&currency=EUR`

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
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
    </div>
  )
}
