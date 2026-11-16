import type { ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
  /** Legende facon "FIGURE 01": prefixe numerote optionnel. */
  figure?: string
  tone?: 'ink' | 'electric' | 'slate' | 'light'
  className?: string
}

const TONES = {
  ink: 'text-ink',
  electric: 'text-electric',
  slate: 'text-slate',
  light: 'text-white',
}

/** Label monospace capitales, letter-spacing .12em. */
export default function Eyebrow({ children, figure, tone = 'electric', className = '' }: EyebrowProps) {
  return (
    <p className={`eyebrow ${TONES[tone]} ${className}`}>
      {figure ? <span className="mr-2 opacity-70">{figure}</span> : null}
      {children}
    </p>
  )
}
