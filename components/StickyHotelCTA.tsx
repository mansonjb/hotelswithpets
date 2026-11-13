'use client'

import { useEffect, useState } from 'react'

interface Props {
  /** Pre-built Stay22 Allez link to drop the user on. */
  href: string
  /** Localized headline e.g. "Hôtels pet-friendly Côte d'Azur - dès 95 €/nuit" */
  label: string
  /** Localized CTA button text */
  cta: string
  /** Scroll percentage after which the bar appears (0-1). Default 0.3 = 30%. */
  showAfterScroll?: number
}

/**
 * Mobile-first sticky bottom CTA that materialises after the user has scrolled
 * past a threshold. Dismissible with persistent close (session-storage).
 *
 * Designed for info-search guide pages where the reader has already gotten
 * value from the editorial content and is now warm to a booking CTA.
 */
export default function StickyHotelCTA({
  href,
  label,
  cta,
  showAfterScroll = 0.3,
}: Props) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Respect session-scoped dismissal
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem('hwp:sticky-cta-dismissed') === '1') {
      setDismissed(true)
      return
    }

    const onScroll = () => {
      const doc = document.documentElement
      const scrolled = (window.scrollY + window.innerHeight) / doc.scrollHeight
      setVisible(scrolled >= showAfterScroll)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [showAfterScroll])

  const handleDismiss = () => {
    setDismissed(true)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('hwp:sticky-cta-dismissed', '1')
    }
  }

  if (dismissed || !visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 pt-2 sm:hidden"
      style={{ backgroundImage: 'linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0))' }}
    >
      <div className="flex items-center gap-2 bg-white border-[1.6px] border-ink rounded-[22px] shadow-hard px-3 py-2.5">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-slate leading-tight">🏨</p>
          <p className="text-sm font-bold text-ink truncate leading-tight">{label}</p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="flex-shrink-0 text-xs font-bold px-3 py-2 rounded-lg text-white"
          style={{ background: '#3024eb' }}
        >
          {cta}
        </a>
        <button
          aria-label="Dismiss"
          onClick={handleDismiss}
          className="flex-shrink-0 w-7 h-7 rounded-full bg-lavender-soft hover:bg-lavender text-slate text-sm flex items-center justify-center"
        >
          ×
        </button>
      </div>
    </div>
  )
}
