import { ImageResponse } from 'next/og'

export const alt = 'HotelsWithPets — Pet-friendly hotels in Europe'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
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
        {/* Background paw prints */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 60,
            fontSize: 200,
            opacity: 0.07,
            display: 'flex',
          }}
        >
          🐾
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 40,
            fontSize: 140,
            opacity: 0.05,
            display: 'flex',
          }}
        >
          🐾
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            padding: '0 80px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 80, display: 'flex' }}>🐾</div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.1,
              display: 'flex',
            }}
          >
            HotelsWithPets
          </div>
          <div
            style={{
              fontSize: 30,
              color: '#93c5fd',
              fontWeight: 400,
              display: 'flex',
            }}
          >
            Pet-friendly hotels across Europe
          </div>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: 48,
              marginTop: 16,
            }}
          >
            {[
              { value: '34', label: 'Destinations' },
              { value: '100+', label: 'Verified hotels' },
              { value: '3', label: 'Languages' },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <span style={{ fontSize: 40, fontWeight: 800, color: '#ffffff', display: 'flex' }}>
                  {value}
                </span>
                <span style={{ fontSize: 18, color: '#bfdbfe', display: 'flex' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 100,
            padding: '10px 28px',
          }}
        >
          <span style={{ color: '#93c5fd', fontSize: 18, display: 'flex' }}>
            hotelswithpets.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
