import Image from 'next/image'
import type { ReactNode } from 'react'
import Badge from '@/components/ui/Badge'
import { buttonClasses } from '@/components/ui/Button'

export interface UiHotelCardProps {
  name: string
  image: string
  href: string
  ctaLabel: string
  /** Ex: "Paris, France". */
  location?: string
  rating?: number
  reviewsLabel?: string
  priceLabel?: string
  /** Ex: "Sans supplement animal". */
  petNote?: string
  petNoteTone?: 'lime' | 'coral' | 'lavender'
  external?: boolean
  children?: ReactNode
}

/** Carte hotel partagee (version redesign). Presentationnelle: les donnees viennent du parent. */
export default function HotelCard({
  name,
  image,
  href,
  ctaLabel,
  location,
  rating,
  reviewsLabel,
  priceLabel,
  petNote,
  petNoteTone = 'lime',
  external = true,
  children,
}: UiHotelCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[22px] border-[1.6px] border-ink bg-white shadow-hard">
      <div className="relative h-52 border-b-[1.6px] border-ink bg-lavender-soft">
        <Image src={image} alt={name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        {petNote && (
          <Badge tone={petNoteTone} className="absolute left-3 top-3">
            {petNote}
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        {location && <p className="eyebrow text-slate">{location}</p>}
        <h3 className="font-display text-xl font-semibold leading-snug">{name}</h3>
        {(rating !== undefined || reviewsLabel) && (
          <p className="flex items-center gap-2 text-sm">
            {rating !== undefined && <Badge tone="blue">{rating.toFixed(1)}</Badge>}
            {reviewsLabel && <span className="text-slate">{reviewsLabel}</span>}
          </p>
        )}
        {children}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          {priceLabel && <p className="font-display text-lg font-semibold">{priceLabel}</p>}
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer sponsored' } : {})}
            className={buttonClasses('dark', 'md', 'ml-auto')}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </article>
  )
}
