import Image from 'next/image'
import Link from 'next/link'
import { imageUrl } from '@/lib/imageUrl'

type Destination = {
  slug: string
  name: string
  country: string
  flag: string
  heroImage?: string
}

interface DestinationCardProps {
  destination: Destination
  hotelCount: number
  vibes: string[]
  locale: string
  size?: 'sm' | 'md'
}

const VIBE_STYLES: Record<string, { bg: string; label: string; emoji: string }> = {
  beach:    { bg: 'bg-teal-500',   label: 'Beach',    emoji: '🏖️' },
  island:   { bg: 'bg-cyan-500',   label: 'Island',   emoji: '🏝️' },
  mountain: { bg: 'bg-blue-700',   label: 'Mountain', emoji: '⛰️' },
  historic: { bg: 'bg-amber-600',  label: 'Historic', emoji: '🏛️' },
  luxury:   { bg: 'bg-purple-600', label: 'Luxury',   emoji: '✨' },
  coastal:  { bg: 'bg-sky-500',    label: 'Coastal',  emoji: '🌊' },
  urban:    { bg: 'bg-indigo-600', label: 'Urban',    emoji: '🏙️' },
}

export default function DestinationCard({
  destination,
  hotelCount,
  vibes,
  locale,
  size = 'md',
}: DestinationCardProps) {
  const primaryVibe = vibes[0]
  const vibeStyle = primaryVibe ? VIBE_STYLES[primaryVibe] : null

  const heroSrc = destination.heroImage
    ? imageUrl(destination.heroImage)
    : null

  const hotelsLabel =
    locale === 'fr'
      ? `${hotelCount} hotel${hotelCount !== 1 ? 's' : ''} pet-friendly`
      : locale === 'es'
      ? `${hotelCount} hotel${hotelCount !== 1 ? 'es' : ''} pet-friendly`
      : locale === 'pt'
      ? `${hotelCount} hotel${hotelCount !== 1 ? 'is' : ''} pet-friendly`
      : `${hotelCount} pet-friendly hotel${hotelCount !== 1 ? 's' : ''}`

  const heightClass = size === 'sm' ? 'h-40' : 'h-52'

  return (
    <Link
      href={`/${locale}/destinations/${destination.slug}`}
      className={`group relative overflow-hidden rounded-2xl ${heightClass} flex flex-col justify-end hover:scale-[1.02] transition-transform duration-200 shadow-sm hover:shadow-lg`}
    >
      {/* Background image or gradient fallback */}
      {heroSrc ? (
        <div className="absolute inset-0">
          <Image
            src={heroSrc}
            alt={destination.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-indigo-900" />
      )}

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

      {/* Vibe badge top-right */}
      {vibeStyle && (
        <div className="absolute top-2 right-2">
          <span className={`inline-flex items-center gap-1 ${vibeStyle.bg} text-white text-[10px] font-semibold px-2 py-0.5 rounded-full`}>
            {vibeStyle.emoji} {vibeStyle.label}
          </span>
        </div>
      )}

      {/* Bottom content */}
      <div className="relative z-10 p-4">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-xl">{destination.flag}</span>
          <div>
            <p className="text-white font-bold text-sm leading-tight">{destination.name}</p>
            <p className="text-white/70 text-xs">{destination.country}</p>
          </div>
        </div>
        {hotelCount > 0 && (
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1">
            🐾 {hotelsLabel}
          </span>
        )}
      </div>
    </Link>
  )
}
