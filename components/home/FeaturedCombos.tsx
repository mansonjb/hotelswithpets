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
  const [main, ...rest] = dict.combos.items

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
          {dict.combos.title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main combo — full width on lg */}
          <Link
            href={`/${locale}/${main.href}`}
            className="lg:col-span-3 group relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 flex items-center justify-between shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-indigo-600/80 to-purple-600/80" />
            {/* Decorative blobs */}
            <div className="absolute right-20 top-0 bottom-0 w-64 h-full bg-white/5 rounded-full blur-3xl" />
            <div className="absolute right-0 top-0 bottom-0 w-48 h-full bg-white/5 rounded-full blur-2xl" />

            <div className="relative flex items-center gap-6">
              <span className="text-6xl filter drop-shadow-lg">{main.emoji}</span>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Featured Guide</p>
                <h3 className="text-white font-extrabold text-2xl lg:text-3xl leading-tight">
                  {main.label}
                </h3>
              </div>
            </div>
            <span className="relative hidden lg:flex items-center gap-2 bg-white text-indigo-700 font-bold px-6 py-3 rounded-2xl shadow-lg group-hover:bg-indigo-50 transition-colors whitespace-nowrap">
              View Guide →
            </span>
          </Link>

          {/* Two smaller combos */}
          {rest.map((combo, i) => (
            <Link
              key={combo.href}
              href={`/${locale}/${combo.href}`}
              className={`group relative overflow-hidden rounded-2xl flex items-center gap-5 p-7 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 ${
                i === 0
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600'
                  : 'bg-gradient-to-br from-amber-500 to-orange-500'
              }`}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <div className="absolute -right-4 -bottom-4 text-8xl opacity-10 select-none leading-none">
                {combo.emoji}
              </div>
              <span className="relative text-4xl filter drop-shadow">{combo.emoji}</span>
              <div className="relative">
                <h3 className="text-white font-bold text-lg leading-snug">{combo.label}</h3>
                <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                  View Guide →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
