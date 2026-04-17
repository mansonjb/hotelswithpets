import { ImageResponse } from 'next/og'
import destinations from '@/data/destinations.json'
import categories from '@/data/categories.json'
import hotels from '@/data/hotels.json'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ locale: string; destination: string; category: string }>
}) {
  const { destination, category } = await params
  const dest = destinations.find((d) => d.slug === destination)
  const cat = categories.find((c) => c.slug === category)
  return [
    {
      id: `${destination}-${category}`,
      alt: dest && cat
        ? `${cat.name} hotels in ${dest.name} — HotelsWithPets.com`
        : 'Pet-friendly hotels — HotelsWithPets.com',
    },
  ]
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; destination: string; category: string }>
}) {
  const { locale, destination, category } = await params

  const dest = destinations.find((d) => d.slug === destination)
  const cat = categories.find((c) => c.slug === category)

  if (!dest || !cat) {
    return new ImageResponse(
      <div style={{ background: '#0f172a', width: '100%', height: '100%', display: 'flex' }} />,
      { ...size }
    )
  }

  const hotelCount = hotels.filter(
    (h) => h.destinationSlug === destination && h.categories.includes(category)
  ).length

  const catName =
    locale === 'fr' && cat.nameFr
      ? cat.nameFr
      : locale === 'es' && cat.nameEs
      ? cat.nameEs
      : cat.name

  const hotelLabel =
    locale === 'fr'
      ? `${hotelCount} hôtels`
      : locale === 'es'
      ? `${hotelCount} hoteles`
      : `${hotelCount} hotels`

  const tagline =
    locale === 'fr'
      ? `Hôtels ${catName.toLowerCase()} · ${dest.country}`
      : locale === 'es'
      ? `Hoteles ${catName.toLowerCase()} · ${dest.country}`
      : `${catName} hotels · ${dest.country}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 55%, #312e81 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Watermark flag */}
        <div
          style={{
            position: 'absolute',
            top: -30,
            right: -30,
            fontSize: 380,
            opacity: 0.07,
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
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 44 }}>
            <span style={{ fontSize: 28, display: 'flex' }}>🐾</span>
            <span style={{ fontSize: 22, color: '#93c5fd', fontWeight: 600, display: 'flex' }}>
              HotelsWithPets.com
            </span>
          </div>

          {/* Category badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 100,
              padding: '10px 24px',
              width: 'fit-content',
              marginBottom: 28,
            }}
          >
            <span style={{ fontSize: 28, display: 'flex' }}>{cat.emoji}</span>
            <span style={{ fontSize: 22, color: '#e0e7ff', fontWeight: 600, display: 'flex' }}>
              {catName}
            </span>
          </div>

          {/* City + flag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
            <span style={{ fontSize: 80, display: 'flex' }}>{dest.flag}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 68, fontWeight: 800, color: '#ffffff', display: 'flex', lineHeight: 1 }}>
                {dest.name}
              </span>
              <span style={{ fontSize: 26, color: '#93c5fd', display: 'flex' }}>{tagline}</span>
            </div>
          </div>

          {/* Hotel count pill */}
          <div style={{ display: 'flex', marginTop: 20 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 100,
                padding: '10px 24px',
              }}
            >
              <span style={{ fontSize: 20, color: '#ffffff', fontWeight: 700, display: 'flex' }}>
                {hotelLabel}
              </span>
              <span style={{ fontSize: 20, color: '#bfdbfe', display: 'flex' }}>
                · Booking.com verified ✓
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
