import Link from 'next/link'
import type { ReactNode } from 'react'

interface ChipProps {
  children: ReactNode
  href?: string
  active?: boolean
  className?: string
}

/** Filtre / tag arrondi. Lien si href, sinon simple etiquette. */
export default function Chip({ children, href, active = false, className = '' }: ChipProps) {
  const cls = `inline-flex items-center gap-1.5 rounded-full border-[1.6px] border-ink px-4 py-2 text-sm font-medium transition-colors ${
    active ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-lime'
  } ${className}`
  if (href) {
    return (
      <Link href={href} className={cls} aria-current={active ? 'true' : undefined}>
        {children}
      </Link>
    )
  }
  return <span className={cls}>{children}</span>
}
