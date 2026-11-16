import Link from 'next/link'

interface PaginationProps {
  page: number
  totalPages: number
  /** Construit l'URL d'une page. */
  hrefFor: (page: number) => string
  labels: { prev: string; next: string; nav: string; page: string }
}

/** Pagination accessible: vrais liens, aria-current, boutons arrondis. */
export default function Pagination({ page, totalPages, hrefFor, labels }: PaginationProps) {
  if (totalPages <= 1) return null
  const pages: number[] = []
  for (let p = Math.max(1, page - 2); p <= Math.min(totalPages, page + 2); p++) pages.push(p)
  const item = 'inline-flex h-11 min-w-11 items-center justify-center rounded-full border-[1.6px] border-ink px-3 text-sm font-semibold'
  return (
    <nav aria-label={labels.nav} className="flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link href={hrefFor(page - 1)} rel="prev" className={`${item} bg-white hover:bg-lime`}>
          {labels.prev}
        </Link>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={hrefFor(p)}
          aria-label={`${labels.page} ${p}`}
          aria-current={p === page ? 'page' : undefined}
          className={`${item} ${p === page ? 'bg-ink text-white' : 'bg-white hover:bg-lime'}`}
        >
          {p}
        </Link>
      ))}
      {page < totalPages && (
        <Link href={hrefFor(page + 1)} rel="next" className={`${item} bg-white hover:bg-lime`}>
          {labels.next}
        </Link>
      )}
    </nav>
  )
}
