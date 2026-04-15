import Link from 'next/link'
import type { Locale } from '@/app/[locale]/dictionaries'

interface ComboItem {
  emoji: string
  label: string
  href: string
}

interface FeaturedCombosProps {
  locale: Locale
  dict: {
    combos: { title: string; items: ComboItem[] }
  }
}

export default function FeaturedCombos({ locale, dict }: FeaturedCombosProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          {dict.combos.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dict.combos.items.map((combo) => (
            <Link
              key={combo.href}
              href={`/${locale}/${combo.href}`}
              className="group flex items-center gap-4 bg-blue-50 hover:bg-blue-100 rounded-2xl px-6 py-5 transition-colors duration-200"
            >
              <span className="text-3xl flex-shrink-0">{combo.emoji}</span>
              <span className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors leading-snug">
                {combo.label}
              </span>
              <span className="ml-auto text-blue-500 group-hover:text-blue-700 text-lg">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
