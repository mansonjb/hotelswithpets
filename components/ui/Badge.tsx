import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  tone?: 'lime' | 'coral' | 'blue' | 'lavender' | 'ink' | 'white'
  /** round = pastille circulaire (numero, rang), pill = etiquette. */
  shape?: 'pill' | 'round'
  className?: string
}

const TONES = {
  lime: 'bg-lime text-ink',
  coral: 'bg-coral text-ink',
  blue: 'bg-electric text-white',
  lavender: 'bg-lavender text-ink',
  ink: 'bg-ink text-white',
  white: 'bg-white text-ink',
}

/** Badge pill ou circulaire (rang, numero). */
export default function Badge({ children, tone = 'lavender', shape = 'pill', className = '' }: BadgeProps) {
  const base =
    shape === 'round'
      ? 'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold'
      : 'inline-flex items-center rounded-full px-3 py-1 eyebrow'
  return <span className={`${base} border-[1.6px] border-ink ${TONES[tone]} ${className}`}>{children}</span>
}
