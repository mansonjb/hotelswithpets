import { ImageResponse } from 'next/og'
import categories from '@/data/categories.json'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params
  const cat = categories.find((c) => c.slug === slug)
  return [
    {
      id: slug,
      alt: cat
        ? `${cat.name} hotels in Europe — HotelsWithPets.com`
        : 'Pet-friendly hotels in Europe — HotelsWithPets.com',
    },
  ]
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const cat = categories.find((c) => c.slug === slug)

  if (!cat) {
    return new ImageResponse(
      <div style={{ background: '#0f172a', width: '100%', height: '100%', display: 'flex' }} />,
      { ...size }
    )
  }

  const catName =
    locale === 'fr' && cat.nameFr
      ? cat.nameFr
      : locale === 'es' && cat.nameEs
      ? cat.nameEs
      : cat.name

  const subtitles: Record<string, string> = {
    en: `Available across ${cat.cityCount} European cities`,
    fr: `Disponible dans ${cat.cityCount} villes européennes`,
    es: `Disponible en ${cat.cityCount} ciudades europeas`,
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #312e81 100%)',
          position: 'relative',
        }}
      >
        {/* Background emoji watermark */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 40,
            fontSize: 300,
            opacity: 0.06,
            display: 'flex',
          }}
        >
          {cat.emoji}
        </div>

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            padding: '0 80px',
            textAlign: 'center',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 24, display: 'flex' }}>🐾</span>
            <span style={{ fontSize: 20, color: '#93c5fd', display: 'flex' }}>HotelsWithPets.com</span>
          </div>

          {/* Category emoji */}
          <div style={{ fontSize: 100, display: 'flex' }}>{cat.emoji}</div>

          {/* Category name */}
          <div style={{ fontSize: 70, fontWeight: 800, color: '#ffffff', display: 'flex', lineHeight: 1.1 }}>
            {catName}
          </div>

          {/* Subtitle */}
          <div style={{ fontSize: 28, color: '#93c5fd', display: 'flex' }}>
            {subtitles[locale] ?? subtitles.en}
          </div>

          {/* Stats badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 100,
              padding: '12px 28px',
              marginTop: 8,
            }}
          >
            <span style={{ fontSize: 20, color: '#ffffff', fontWeight: 700, display: 'flex' }}>
              Booking.com verified ✓
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
