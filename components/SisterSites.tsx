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
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
    borderColor: 'border-blue-200',
    dotColor: 'bg-blue-500',
  },
  MyHoneymoonHotel: {
    label: 'MyHoneymoonHotel',
    badgeBg: 'bg-pink-100',
    badgeText: 'text-pink-700',
    borderColor: 'border-pink-200',
    dotColor: 'bg-pink-500',
  },
  ExploreIleDeRe: {
    label: 'ExploreIleDeRe',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-700',
    borderColor: 'border-teal-200',
    dotColor: 'bg-teal-500',
  },
  PerfectCityBreak: {
    label: 'Perfect City Break',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-700',
    borderColor: 'border-indigo-200',
    dotColor: 'bg-indigo-500',
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
    <section className="py-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">
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
                className={`flex items-start gap-3 bg-gray-50 border ${config.borderColor} rounded-xl p-4 hover:bg-white transition-colors group`}
              >
                <div className={`flex-shrink-0 mt-0.5 w-2 h-2 rounded-full ${config.dotColor} mt-2`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${config.badgeBg} ${config.badgeText}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 group-hover:text-gray-900 leading-snug mb-1">
                    {link.anchor[loc]}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {link.description[loc]}
                  </p>
                </div>
                <svg
                  className="flex-shrink-0 w-4 h-4 text-gray-400 group-hover:text-gray-600 mt-1"
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
