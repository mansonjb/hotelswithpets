/** Logo: carre arrondi bleu electrique + patte SVG, puis wordmark. */
export function PawMark({ size = 36 }: { size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-[10px] border-[1.6px] border-ink bg-electric"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6} fill="#fff">
        <ellipse cx="6" cy="11" rx="2.1" ry="2.8" />
        <ellipse cx="10" cy="6.5" rx="2.1" ry="2.8" />
        <ellipse cx="14" cy="6.5" rx="2.1" ry="2.8" />
        <ellipse cx="18" cy="11" rx="2.1" ry="2.8" />
        <path d="M12 11.2c-3 0-5.6 3-5.6 5.3 0 1.7 1.3 2.5 2.9 2.5 1 0 1.8-.4 2.7-.4s1.7.4 2.7.4c1.6 0 2.9-.8 2.9-2.5 0-2.3-2.6-5.3-5.6-5.3z" />
      </svg>
    </span>
  )
}

export default function PawLogo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <PawMark />
      <span className={`font-display text-xl font-bold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
        HotelsWithPets
      </span>
    </span>
  )
}
