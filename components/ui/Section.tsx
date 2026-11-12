import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  id?: string
  tone?: 'cream' | 'white' | 'lavender' | 'soft' | 'ink' | 'blue'
  /** Largeur max du contenu. */
  width?: 'narrow' | 'default' | 'wide'
  className?: string
  as?: 'section' | 'div'
  'aria-labelledby'?: string
}

const TONES = {
  cream: 'bg-cream text-ink',
  white: 'bg-white text-ink',
  lavender: 'bg-lavender text-ink',
  soft: 'bg-lavender-soft text-ink',
  ink: 'bg-night text-white',
  blue: 'bg-electric text-white',
}
const WIDTHS = { narrow: 'max-w-3xl', default: 'max-w-5xl', wide: 'max-w-7xl' }

/** Bloc de page: fond, largeur et rythme vertical coherents. */
export default function Section({
  children,
  id,
  tone = 'cream',
  width = 'wide',
  className = '',
  as: Tag = 'section',
  ...rest
}: SectionProps) {
  return (
    <Tag id={id} className={`${TONES[tone]} ${className}`} aria-labelledby={rest['aria-labelledby']}>
      <div className={`${WIDTHS[width]} mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20`}>{children}</div>
    </Tag>
  )
}
