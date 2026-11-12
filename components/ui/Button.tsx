import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'dark' | 'lime' | 'blue' | 'secondary'
export type ButtonSize = 'md' | 'lg'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full border-[1.6px] border-ink font-semibold leading-none whitespace-nowrap transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none'

const VARIANTS: Record<ButtonVariant, string> = {
  dark: 'bg-ink text-white hover:shadow-hard-sm',
  lime: 'bg-lime text-ink shadow-hard hover:shadow-[7px_7px_0_#151524]',
  blue: 'bg-electric text-white shadow-hard hover:shadow-[7px_7px_0_#151524]',
  secondary: 'bg-white text-ink hover:shadow-hard-sm',
}

const SIZES: Record<ButtonSize, string> = {
  md: 'px-5 py-3 text-sm',
  lg: 'px-7 py-4 text-base',
}

export function buttonClasses(variant: ButtonVariant = 'dark', size: ButtonSize = 'md', extra = ''): string {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${extra}`.trim()
}

interface CommonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
}

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string; external?: boolean }

/** Bouton pill. Vrai <button> sans href, vrai lien <a>/<Link> avec href. */
export default function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = 'dark', size = 'md', className = '', children } = props
  const cls = buttonClasses(variant, size, className)

  if (props.href !== undefined) {
    const { href, external, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props
    void _v; void _s; void _c; void _ch
    if (external) {
      return (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    )
  }

  const { variant: _v, size: _s, className: _c, children: _ch, type = 'button', ...rest } = props as ButtonAsButton
  void _v; void _s; void _c; void _ch
  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  )
}
