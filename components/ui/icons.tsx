/**
 * Jeu d'icones SVG inline (style trait, zero dependance).
 * Remplace les emojis dans l'UI du redesign pour un rendu plus pro et coherent.
 * Toutes les icones heritent de `currentColor` (stroke) et se dimensionnent via className.
 */
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function IconSearch({ className = 'w-6 h-6', ...p }: IconProps) {
  return (
    <svg className={className} {...base} {...p} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

export function IconPaw({ className = 'w-6 h-6', ...p }: IconProps) {
  return (
    <svg className={className} {...base} {...p} aria-hidden="true">
      <ellipse cx="7.5" cy="9" rx="1.6" ry="2.2" />
      <ellipse cx="12" cy="7.3" rx="1.7" ry="2.4" />
      <ellipse cx="16.5" cy="9" rx="1.6" ry="2.2" />
      <path d="M8.5 14.2c1-1.5 2.1-2.4 3.5-2.4s2.5.9 3.5 2.4c.9 1.3 1.6 2 1.6 3.1 0 1.3-1.1 2.1-2.5 2-1-.1-1.6-.5-2.6-.5s-1.6.4-2.6.5c-1.4.1-2.5-.7-2.5-2 0-1.1.7-1.8 1.6-3.1Z" />
    </svg>
  )
}

export function IconHotel({ className = 'w-6 h-6', ...p }: IconProps) {
  return (
    <svg className={className} {...base} {...p} aria-hidden="true">
      <path d="M4 21V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v16" />
      <path d="M3 21h18" />
      <path d="M9 8h.01M12 8h.01M15 8h.01M9 12h.01M12 12h.01M15 12h.01" />
      <path d="M10 21v-3a2 2 0 0 1 4 0v3" />
    </svg>
  )
}

export function IconDog({ className = 'w-6 h-6', ...p }: IconProps) {
  return (
    <svg className={className} {...base} {...p} aria-hidden="true">
      {/* floppy ears hanging down the sides */}
      <path d="M8 5c-2.1 0-3.5 1.5-3.7 3.6-.2 1.8.4 3.3 1.1 4.3" />
      <path d="M16 5c2.1 0 3.5 1.5 3.7 3.6.2 1.8-.4 3.3-1.1 4.3" />
      {/* head top + jaw */}
      <path d="M8 5C9.1 4.4 10.5 4.1 12 4.1s2.9.3 4 .9" />
      <path d="M5.4 12.3c0 3.3 2.9 6 6.6 6s6.6-2.7 6.6-6" />
      {/* eyes, nose, mouth */}
      <path d="M9.6 11.9h.01M14.4 11.9h.01" />
      <path d="M12 13.7v1.2M10.8 15c.7.5 1.7.5 2.4 0" />
    </svg>
  )
}

export function IconCat({ className = 'w-6 h-6', ...p }: IconProps) {
  return (
    <svg className={className} {...base} {...p} aria-hidden="true">
      <path d="M5.6 5.3 8 8.1A6.6 6.6 0 0 1 12 7a6.6 6.6 0 0 1 4 1.1l2.4-2.8a.4.4 0 0 1 .7.3l-.3 4.1c.1.5.2 1 .2 1.5a7 7 0 0 1-14 0c0-.5.1-1 .2-1.5l-.3-4.1a.4.4 0 0 1 .7-.3Z" />
      <path d="M9.6 12.3h.01M14.4 12.3h.01" />
      <path d="M12 14.2v1M9.8 14.8l2.2.6 2.2-.6" />
      <path d="M4.6 13.3 7 13.8M4.6 15.3 7 14.8M19.4 13.3 17 13.8M19.4 15.3 17 14.8" />
    </svg>
  )
}

export function IconTree({ className = 'w-6 h-6', ...p }: IconProps) {
  return (
    <svg className={className} {...base} {...p} aria-hidden="true">
      <path d="M12 3c3 0 5 2.2 5 4.8 0 1-.3 1.9-.9 2.6 1 .7 1.6 1.8 1.6 3 0 2.2-2 4-4.4 4H10.7C8.3 17.4 6.3 15.6 6.3 13.4c0-1.2.6-2.3 1.6-3-.6-.7-.9-1.6-.9-2.6C7 5.2 9 3 12 3Z" />
      <path d="M12 17.4V21" />
    </svg>
  )
}

export function IconSparkle({ className = 'w-6 h-6', ...p }: IconProps) {
  return (
    <svg className={className} {...base} {...p} aria-hidden="true">
      <path d="M12 3c.4 3.6 1.4 4.6 5 5-3.6.4-4.6 1.4-5 5-.4-3.6-1.4-4.6-5-5 3.6-.4 4.6-1.4 5-5Z" />
      <path d="M18 14c.2 1.6.6 2 2.2 2.2-1.6.2-2 .6-2.2 2.2-.2-1.6-.6-2-2.2-2.2 1.6-.2 2-.6 2.2-2.2Z" />
    </svg>
  )
}

export function IconUmbrella({ className = 'w-6 h-6', ...p }: IconProps) {
  return (
    <svg className={className} {...base} {...p} aria-hidden="true">
      <path d="M12 3a9 9 0 0 1 9 8.5c0 .6-.4.5-.8.3-1-.6-2-.6-3 0-1 .6-2 .6-3 0-1-.6-2-.6-3 0-1 .6-2 .6-3 0-1-.6-2-.6-3 0-.4.2-.8.3-.8-.3A9 9 0 0 1 12 3Z" />
      <path d="M12 3v9M12 18.5a2 2 0 0 1-4 0" />
    </svg>
  )
}

export function IconGem({ className = 'w-6 h-6', ...p }: IconProps) {
  return (
    <svg className={className} {...base} {...p} aria-hidden="true">
      <path d="M6 4h12l3 5-9 11L3 9Z" />
      <path d="M3 9h18M9 4 6 9l6 11M15 4l3 5-6 11" />
    </svg>
  )
}

export function IconEuro({ className = 'w-6 h-6', ...p }: IconProps) {
  return (
    <svg className={className} {...base} {...p} aria-hidden="true">
      <path d="M17 6.3A6 6 0 0 0 7.6 9m9.4 8.7A6 6 0 0 1 7.6 15" />
      <path d="M4.5 10.5h8M4.5 13.5h8" />
    </svg>
  )
}

export function IconTag({ className = 'w-6 h-6', ...p }: IconProps) {
  return (
    <svg className={className} {...base} {...p} aria-hidden="true">
      <path d="M3.5 11.6V4.5a1 1 0 0 1 1-1h7.1a2 2 0 0 1 1.4.6l7 7a2 2 0 0 1 0 2.8l-6.6 6.6a2 2 0 0 1-2.8 0l-7-7a2 2 0 0 1-.6-1.4Z" />
      <path d="M7.5 7.5h.01" />
    </svg>
  )
}

export function IconStar({ className = 'w-6 h-6', ...p }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...p} aria-hidden="true">
      <path d="M12 3.5l2.47 5 5.53.8-4 3.9.94 5.5L12 16.9l-4.94 2.6.94-5.5-4-3.9 5.53-.8Z" />
    </svg>
  )
}

export function IconCheck({ className = 'w-6 h-6', ...p }: IconProps) {
  return (
    <svg className={className} {...base} strokeWidth={2.2} {...p} aria-hidden="true">
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  )
}

export function IconMap({ className = 'w-6 h-6', ...p }: IconProps) {
  return (
    <svg className={className} {...base} {...p} aria-hidden="true">
      <path d="m9 4-6 2.5v13.5l6-2.5 6 2.5 6-2.5V3.5L15 6 9 3.5Z" />
      <path d="M9 4v13.5M15 6v13.5" />
    </svg>
  )
}

export function IconShield({ className = 'w-6 h-6', ...p }: IconProps) {
  return (
    <svg className={className} {...base} {...p} aria-hidden="true">
      <path d="M12 3 5 5.8v5.2c0 4.3 3 7.5 7 9 4-1.5 7-4.7 7-9V5.8Z" />
      <path d="m9 12 2 2 4-4.5" />
    </svg>
  )
}

const CATEGORY_ICON: Record<string, (p: IconProps) => React.ReactElement> = {
  'dog-friendly': IconDog,
  'cat-friendly': IconCat,
  'near-parks': IconTree,
  luxury: IconSparkle,
  'beach-access': IconUmbrella,
  'dogs-stay-free': IconTag,
  'boutique-pet-friendly': IconGem,
  'budget-pet-friendly': IconEuro,
}

export function CategoryIcon({ slug, className }: { slug: string; className?: string }) {
  const Cmp = CATEGORY_ICON[slug] ?? IconPaw
  return <Cmp className={className} />
}
