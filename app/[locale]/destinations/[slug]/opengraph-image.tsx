import { ImageResponse } from 'next/og'
import destinations from '@/data/destinations.json'
import hotels from '@/data/hotels.json'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'


export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const dest = destinations.find((d) => d.slug === slug)
  if (!dest) {
    return new ImageResponse(<div style={{ background: '#0f172a', width: '100%', height: '100%', display: 'flex' }} />, { ...size })
  }

  const hotelCount = hotels.filter((h) => h.destinationSlug === slug).length

  const subtitle =
    locale === 'fr'
      ? `Hôtels acceptant animaux · ${dest.country}`
      : locale === 'es'
      ? `Hoteles con mascotas · ${dest.country}`
      : `Pet-friendly hotels · ${dest.country}`

  const hotelLabel =
    locale === 'fr'
      ? `${hotelCount} hôtels`
      : locale === 'es'
      ? `${hotelCount} hoteles`
      : `${hotelCount} hotels`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #312e81 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Large flag watermark */}
        <div
          style={{
            position: 'absolute',
            top: -20,
            right: -20,
            fontSize: 360,
            opacity: 0.08,
            display: 'flex',
            lineHeight: 1,
          }}
        >
          {dest.flag}
        </div>

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            padding: '60px 80px',
          }}
        >
          {/* Site brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 48,
            }}
          >
            <span style={{ fontSize: 32, display: 'flex' }}>🐾</span>
            <span style={{ fontSize: 26, color: '#93c5fd', fontWeight: 600, display: 'flex' }}>
              HotelsWithPets.com
            </span>
          </div>

          {/* Destination */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 20 }}>
            <span style={{ fontSize: 96, display: 'flex' }}>{dest.flag}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 72, fontWeight: 800, color: '#ffffff', display: 'flex', lineHeight: 1 }}>
                {dest.name}
              </div>
              <div style={{ fontSize: 28, color: '#93c5fd', display: 'flex' }}>{subtitle}</div>
            </div>
          </div>

          {/* Hotel count badge */}
          <div
            style={{
              display: 'flex',
              marginTop: 24,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 100,
                padding: '12px 28px',
              }}
            >
              <span style={{ fontSize: 22, color: '#ffffff', fontWeight: 700, display: 'flex' }}>
                {hotelLabel}
              </span>
              <span style={{ fontSize: 22, color: '#bfdbfe', display: 'flex' }}>
                · Booking.com ✓
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
