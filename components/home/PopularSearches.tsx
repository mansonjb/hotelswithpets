import Link from 'next/link'
import type { Locale } from '@/app/[locale]/dictionaries'

interface PopularSearchesProps {
  locale: Locale
}

const searches = [
  { dest: 'amsterdam', destName: 'Amsterdam', cat: 'dog-friendly', catNameEn: 'dog-friendly', catNameFr: 'chiens acceptés', catNameEs: 'admite perros' },
  { dest: 'paris', destName: 'Paris', cat: 'luxury', catNameEn: 'luxury', catNameFr: 'luxe', catNameEs: 'lujo' },
  { dest: 'barcelona', destName: 'Barcelona', cat: 'dogs-stay-free', catNameEn: 'dogs stay free', catNameFr: 'chiens gratuits', catNameEs: 'perros gratis' },
  { dest: 'berlin', destName: 'Berlin', cat: 'near-parks', catNameEn: 'near parks', catNameFr: 'proche parcs', catNameEs: 'cerca de parques' },
  { dest: 'rome', destName: 'Rome', cat: 'dog-friendly', catNameEn: 'dog-friendly', catNameFr: 'chiens acceptés', catNameEs: 'admite perros' },
  { dest: 'lisbon', destName: 'Lisbon', cat: 'dog-friendly', catNameEn: 'dog-friendly', catNameFr: 'chiens acceptés', catNameEs: 'admite perros' },
  { dest: 'madrid', destName: 'Madrid', cat: 'luxury', catNameEn: 'luxury', catNameFr: 'luxe', catNameEs: 'lujo' },
  { dest: 'zurich', destName: 'Zurich', cat: 'luxury', catNameEn: 'luxury', catNameFr: 'luxe', catNameEs: 'lujo' },
  { dest: 'prague', destName: 'Prague', cat: 'near-parks', catNameEn: 'near parks', catNameFr: 'proche parcs', catNameEs: 'cerca de parques' },
  { dest: 'vienna', destName: 'Vienna', cat: 'dog-friendly', catNameEn: 'dog-friendly', catNameFr: 'chiens acceptés', catNameEs: 'admite perros' },
  { dest: 'florence', destName: 'Florence', cat: 'cat-friendly', catNameEn: 'cat-friendly', catNameFr: 'chats acceptés', catNameEs: 'admite gatos' },
  { dest: 'nice', destName: 'Nice', cat: 'beach-access', catNameEn: 'beach access', catNameFr: 'accès plage', catNameEs: 'acceso playa' },
  { dest: 'biarritz', destName: 'Biarritz', cat: 'beach-access', catNameEn: 'beach access', catNameFr: 'accès plage', catNameEs: 'acceso playa' },
  { dest: 'malaga', destName: 'Malaga', cat: 'beach-access', catNameEn: 'beach access', catNameFr: 'accès plage', catNameEs: 'acceso playa' },
  { dest: 'valencia', destName: 'Valencia', cat: 'beach-access', catNameEn: 'beach access', catNameFr: 'accès plage', catNameEs: 'acceso playa' },
  { dest: 'stockholm', destName: 'Stockholm', cat: 'dog-friendly', catNameEn: 'dog-friendly', catNameFr: 'chiens acceptés', catNameEs: 'admite perros' },
  { dest: 'amsterdam', destName: 'Amsterdam', cat: 'dogs-stay-free', catNameEn: 'dogs stay free', catNameFr: 'chiens gratuits', catNameEs: 'perros gratis' },
  { dest: 'paris', destName: 'Paris', cat: 'dog-friendly', catNameEn: 'dog-friendly', catNameFr: 'chiens acceptés', catNameEs: 'admite perros' },
]

function getCatLabel(s: typeof searches[number], locale: Locale) {
  if (locale === 'fr') return s.catNameFr
  if (locale === 'es') return s.catNameEs
  return s.catNameEn
}

const headings: Record<Locale, string> = {
  en: 'Popular searches',
  fr: 'Recherches populaires',
  es: 'Búsquedas populares',
}

export default function PopularSearches({ locale }: PopularSearchesProps) {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-5">
          {headings[locale]}
        </h2>
        <div className="flex flex-wrap gap-2">
          {searches.map((s) => {
            const label =
              locale === 'fr'
                ? `Hôtels ${s.catNameFr} à ${s.destName}`
                : locale === 'es'
                ? `Hoteles ${s.catNameEs} en ${s.destName}`
                : `${s.destName} ${s.catNameEn} hotels`
            return (
              <Link
                key={`${s.dest}-${s.cat}`}
                href={`/${locale}/${s.dest}/${s.cat}`}
                className="text-sm text-blue-700 hover:text-blue-900 hover:underline bg-white border border-gray-200 rounded-full px-4 py-1.5 transition-colors"
              >
                {label}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
