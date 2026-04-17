import { ImageResponse } from 'next/og'
import { getAllCountries, slugToCountry } from '@/lib/countries'
import hotels from '@/data/hotels.json'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const countries = getAllCountries()


export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const country = countries.find((c) => c.slug === slug)

  if (!country) {
    return new ImageResponse(
      <div style={{ background: '#0f172a', width: '100%', height: '100%', display: 'flex' }} />,
      { ...size }
    )
  }

  const totalHotels = hotels.filter((h) =>
    country.destinations.some((d) => d.slug === h.destinationSlug)
  ).length

  const headings: Record<string, string> = {
    en: `Pet-friendly hotels in ${country.name}`,
    fr: `Hôtels acceptant animaux en ${country.name}`,
    es: `Hoteles con mascotas en ${country.name}`,
  }
  const stats: Record<string, string> = {
    en: `${country.destinations.length} cities · ${totalHotels}+ hotels`,
    fr: `${country.destinations.length} villes · ${totalHotels}+ hôtels`,
    es: `${country.destinations.length} ciudades · ${totalHotels}+ hoteles`,
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
          overflow: 'hidden',
        }}
      >
        {/* Watermark */}
        <div
          style={{
            position: 'absolute',
            top: -20,
            right: -20,
            fontSize: 380,
            opacity: 0.07,
            display: 'flex',
            lineHeight: 1,
          }}
        >
          {country.flag}
        </div>

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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22, display: 'flex' }}>🐾</span>
            <span style={{ fontSize: 19, color: '#93c5fd', display: 'flex' }}>HotelsWithPets.com</span>
          </div>

          {/* Country flag */}
          <div style={{ fontSize: 100, display: 'flex' }}>{country.flag}</div>

          {/* Heading */}
          <div style={{ fontSize: 58, fontWeight: 800, color: '#ffffff', display: 'flex', lineHeight: 1.1 }}>
            {headings[locale] ?? headings.en}
          </div>

          {/* Stats */}
          <div style={{ fontSize: 26, color: '#93c5fd', display: 'flex' }}>
            {stats[locale] ?? stats.en}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
