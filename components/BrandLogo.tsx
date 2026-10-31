'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Brand logo tile for comparison pages. Shows a coloured monogram immediately,
 * then swaps to a self-hosted brand logo (served from /public/logos, committed
 * to the repo so it never depends on a flaky runtime favicon service) once it
 * loads as a real image. If the file is missing or errors, the monogram stays.
 * A tile is therefore never empty, even during loading.
 */
export default function BrandLogo({
  src,
  name,
  initials,
  color,
  size = 48,
}: {
  src: string
  name: string
  initials: string
  color: string
  size?: number
}) {
  const [state, setState] = useState<'pending' | 'logo' | 'fallback'>('pending')
  const imgRef = useRef<HTMLImageElement>(null)

  // If the image is already cached, it can finish loading before React attaches
  // onLoad, so that event never fires and the tile would stay on the monogram.
  // Reconcile from the DOM on mount.
  useEffect(() => {
    const el = imgRef.current
    if (el && el.complete) {
      setState(el.naturalWidth >= 16 ? 'logo' : 'fallback')
    }
  }, [])

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
            ref={imgRef}
            src={src}
            alt={`Logo ${name}`}
            width={Math.round(size * 0.72)}
            height={Math.round(size * 0.72)}
            style={{ objectFit: 'contain' }}
            loading="lazy"
            onLoad={(e) => setState(e.currentTarget.naturalWidth >= 16 ? 'logo' : 'fallback')}
            onError={() => setState('fallback')}
          />
        </span>
      )}
    </span>
  )
}
