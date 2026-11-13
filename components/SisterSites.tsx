import { CROSS_SITE_LINKS } from '@/lib/cross-site-links'

type Locale = 'en' | 'fr' | 'es'

interface SisterSitesProps {
  slug: string
  locale: string
}

const SITE_CONFIG = {
  RaceWeekStays: {
    label: 'RaceWeekStays',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-700',
    borderColor: 'border-red-200',
    dotColor: 'bg-red-500',
  },
  ScreenToTrip: {
    label: 'ScreenToTrip',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-700',
    borderColor: 'border-purple-200',
    dotColor: 'bg-purple-500',
  },
  BestSnowHotels: {
    label: 'BestSnowHotels',
    badgeBg: 'bg-lavender',
    badgeText: 'text-electric',
    borderColor: 'border-line',
    dotColor: 'bg-electric',
  },
  MyHoneymoonHotel: {
    label: 'MyHoneymoonHotel',
    badgeBg: 'bg-pink-100',
    badgeText: 'text-ink',
    borderColor: 'border-line',
    dotColor: 'bg-pink-500',
  },
  ExploreIleDeRe: {
    label: 'ExploreIleDeRe',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-700',
    borderColor: 'border-teal-200',
    dotColor: 'bg-electric',
  },
  PerfectCityBreak: {
    label: 'Perfect City Break',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-700',
    borderColor: 'border-indigo-200',
    dotColor: 'bg-electric',
  },
  StaysInSwitzerland: {
    label: 'Stays in Switzerland',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-ink',
    borderColor: 'border-line',
    dotColor: 'bg-electric',
  },
} as const

const SECTION_TITLE: Record<string, string> = {
  en: 'Also explore',
  fr: 'A decouvrir aussi',
  es: 'Explora tambien',
}

export default function SisterSites({ slug, locale }: SisterSitesProps) {
  const links = CROSS_SITE_LINKS[slug]
  if (!links || links.length === 0) return null

  const loc = (['en', 'fr', 'es'].includes(locale) ? locale : 'en') as Locale

  return (
    <section className="py-10 border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold text-slate uppercase tracking-wide mb-5">
          {SECTION_TITLE[loc]}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link, i) => {
            const config = SITE_CONFIG[link.site]
            return (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener"
                className={`flex items-start gap-3 bg-cream border ${config.borderColor} rounded-xl p-4 hover:bg-white transition-colors group`}
              >
                <div className={`flex-shrink-0 mt-0.5 w-2 h-2 rounded-full ${config.dotColor} mt-2`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${config.badgeBg} ${config.badgeText}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-ink group-hover:text-ink leading-snug mb-1">
                    {link.anchor[loc]}
                  </p>
                  <p className="text-xs text-slate leading-relaxed">
                    {link.description[loc]}
                  </p>
                </div>
                <svg
                  className="flex-shrink-0 w-4 h-4 text-slate group-hover:text-slate mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
