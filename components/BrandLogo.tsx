'use client'

import { useState } from 'react'

/**
 * Brand logo tile for comparison pages. Shows a coloured monogram immediately,
 * then swaps to the company's public favicon (Google favicon service, sz=128)
 * once it loads as a real logo. If the favicon is missing, errors, or is only a
 * tiny low-res icon (< 32px), the monogram stays. A tile is therefore never
 * empty, even during loading.
 */
export default function BrandLogo({
  domain,
  name,
  initials,
  color,
  size = 48,
}: {
  domain: string
  name: string
  initials: string
  color: string
  size?: number
}) {
  const [state, setState] = useState<'pending' | 'logo' | 'fallback'>('pending')

  return (
    <span
      className="relative inline-flex rounded-xl overflow-hidden flex-shrink-0 align-middle"
      style={{ width: size, height: size }}
    >
      {/* Monogram: visible until (and unless) a real logo loads */}
      {state !== 'logo' && (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: color, fontSize: Math.round(size * 0.3) }}
        >
          {initials}
        </span>
      )}

      {/* Logo layer: loads invisibly, revealed only once confirmed */}
      {state !== 'fallback' && (
        <span
          className="absolute inset-0 flex items-center justify-center bg-white border border-stone-200 rounded-xl"
          style={{ opacity: state === 'logo' ? 1 : 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://www.google.com/s2/favicons?sz=128&domain=${domain}`}
            alt={`Logo ${name}`}
            width={Math.round(size * 0.64)}
            height={Math.round(size * 0.64)}
            style={{ objectFit: 'contain' }}
            loading="lazy"
            onLoad={(e) => setState(e.currentTarget.naturalWidth >= 32 ? 'logo' : 'fallback')}
            onError={() => setState('fallback')}
          />
        </span>
      )}
    </span>
  )
}
