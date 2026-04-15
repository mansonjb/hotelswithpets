import Link from 'next/link'
import destinations from '@/data/destinations.json'
import type { Locale } from '@/app/[locale]/dictionaries'

interface DestinationsGridProps {
  locale: Locale
  dict: {
    destinations: { title: string; cta: string; viewAll: string }
  }
}

export default function DestinationsGrid({ locale, dict }: DestinationsGridProps) {
  const { destinations: d } = dict
  const featured = destinations.slice(0, 6)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900">{d.title}</h2>
          <Link href={`/${locale}/destinations`} className="text-blue-600 hover:underline text-sm font-medium">
            {d.viewAll}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((dest) => (
            <Link
              key={dest.slug}
              href={`/${locale}/destinations/${dest.slug}`}
              className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{dest.flag}</span>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-sm text-gray-500">{dest.categoryCount} categories</p>
                </div>
              </div>
              <span className="text-blue-600 text-sm font-medium whitespace-nowrap group-hover:underline">
                {d.cta} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
