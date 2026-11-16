import type { ElementType, ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  as?: ElementType
  tone?: 'white' | 'lavender' | 'soft' | 'lime' | 'coral' | 'ink'
  /** Ombre decalee neo-editoriale. */
  shadow?: boolean
  className?: string
  id?: string
}

const TONES = {
  white: 'bg-white text-ink',
  lavender: 'bg-lavender text-ink',
  soft: 'bg-lavender-soft text-ink',
  lime: 'bg-lime text-ink',
  coral: 'bg-coral text-ink',
  ink: 'bg-ink text-white',
}

/** Carte arrondie 22px, bordure encre 1.6px, ombre nette decalee. */
export default function Card({ children, as: Tag = 'div', tone = 'white', shadow = true, className = '', id }: CardProps) {
  return (
    <Tag
      id={id}
      className={`rounded-[22px] border-[1.6px] border-ink ${TONES[tone]} ${shadow ? 'shadow-hard' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}
