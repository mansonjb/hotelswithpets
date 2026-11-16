import Link from 'next/link'
import type { Locale } from '@/app/[locale]/dictionaries'
import { CategoryIcon } from '@/components/ui/icons'

interface ComboItem {
  emoji: string
  label: string
  href: string
}

interface FeaturedCombosProps {
  locale: Locale
  dict: {
    combos: { title: string; featuredLabel: string; viewGuide: string; items: ComboItem[] }
  }
}

// Aplats colores uniquement (plus de noir), deux bleus pour varier
const secondaryGradients = [
  'bg-electric',
  'bg-[#1d1596]',
  'bg-electric',
  'bg-[#1d1596]',
  'bg-electric',
  'bg-[#1d1596]',
]

// Derive le slug de categorie depuis un href type "amsterdam/dog-friendly"
const catSlugFromHref = (href: string) => href.split('/').filter(Boolean).pop() ?? ''

export default function FeaturedCombos({ locale, dict }: FeaturedCombosProps) {
  const [main, ...rest] = dict.combos.items

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-ink mb-12 text-center">
          {dict.combos.title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main combo, full width */}
          <Link
            href={`/${locale}/${main.href}`}
            className="lg:col-span-3 group relative overflow-hidden rounded-[28px] bg-electric border-[1.6px] border-ink p-10 flex items-center justify-between shadow-hard hover:shadow-hard transition-all duration-300 hover:-translate-y-1"
          >
                        <div className="absolute right-20 top-0 bottom-0 w-64 h-full bg-white/5 rounded-full blur-3xl" />
            <div className="absolute right-0 top-0 bottom-0 w-48 h-full bg-white/5 rounded-full blur-2xl" />

            <div className="relative flex items-center gap-6">
              <span className="flex-shrink-0 inline-flex w-20 h-20 rounded-2xl bg-white/15 border-[1.6px] border-white/40 items-center justify-center text-white"><CategoryIcon slug={catSlugFromHref(main.href)} className="w-10 h-10" /></span>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-widest mb-1">{dict.combos.featuredLabel}</p>
                <h3 className="text-white font-bold text-2xl lg:text-3xl leading-tight">
                  {main.label}
                </h3>
              </div>
            </div>
            <span className="relative hidden lg:flex items-center gap-2 bg-lime text-ink font-semibold px-6 py-3 rounded-full border-[1.6px] border-ink group-hover:bg-white transition-colors whitespace-nowrap">
              {dict.combos.viewGuide}
            </span>
          </Link>

          {/* Secondary combos, 3 per row, cycling gradients */}
          {rest.map((combo, i) => (
            <Link
              key={combo.href}
              href={`/${locale}/${combo.href}`}
              className={`group relative overflow-hidden rounded-[22px] flex items-center gap-5 p-7 shadow-hard hover:shadow-hard transition-all duration-200 hover:-translate-y-1 border-[1.6px] border-ink ${secondaryGradients[i % secondaryGradients.length]}`}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <div className="absolute -right-4 -bottom-4 opacity-10 select-none leading-none text-white" aria-hidden="true">
                <CategoryIcon slug={catSlugFromHref(combo.href)} className="w-28 h-28" />
              </div>
              <span className="relative flex-shrink-0 inline-flex w-14 h-14 rounded-xl bg-white/15 border-[1.6px] border-white/40 items-center justify-center text-white"><CategoryIcon slug={catSlugFromHref(combo.href)} className="w-7 h-7" /></span>
              <div className="relative">
                <h3 className="text-white font-bold text-lg leading-snug">{combo.label}</h3>
                <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                  {dict.combos.viewGuide}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
