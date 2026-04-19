import Link from 'next/link'

const ALL_GUIDES = [
  {
    slug: 'passeport-animal',
    emoji: '📋',
    label: { fr: 'Passeport animal par pays', en: 'Pet passport by country', es: 'Pasaporte de mascota por país' },
    desc:  { fr: 'Puce, vaccin rage, règles par pays', en: 'Microchip, rabies vaccine, country rules', es: 'Microchip, vacuna, normas por país' },
  },
  {
    slug: 'train-avec-chien',
    emoji: '🚂',
    label: { fr: 'Voyager en train avec son chien', en: 'Train travel with your dog', es: 'Viajar en tren con tu perro' },
    desc:  { fr: 'SNCF, Eurostar, DB, Renfe, Trenitalia…', en: 'SNCF, Eurostar, DB, Renfe, Trenitalia…', es: 'SNCF, Eurostar, DB, Renfe, Trenitalia…' },
  },
  {
    slug: 'avion-animal',
    emoji: '✈️',
    label: { fr: 'Prendre l\'avion avec son animal', en: 'Flying with your pet', es: 'Volar con tu mascota' },
    desc:  { fr: 'Cabine vs soute, compagnies, IATA', en: 'Cabin vs hold, airlines, IATA', es: 'Cabina vs bodega, aerolíneas, IATA' },
  },
  {
    slug: 'road-trip-chien',
    emoji: '🚗',
    label: { fr: 'Road trip avec son chien', en: 'Road-tripping with your dog', es: 'Road trip con tu perro' },
    desc:  { fr: 'Lois par pays, Eurotunnel, ferries', en: 'Laws by country, Eurotunnel, ferries', es: 'Leyes por país, Eurotunnel, ferrys' },
  },
  {
    slug: 'hotel-pet-friendly',
    emoji: '🏨',
    label: { fr: 'Choisir un hôtel pet-friendly', en: 'Choosing a pet-friendly hotel', es: 'Elegir un hotel pet-friendly' },
    desc:  { fr: 'Red flags, frais, questions clés', en: 'Red flags, fees, key questions', es: 'Red flags, tarifas, preguntas clave' },
  },
]

const TITLES: Record<string, string> = {
  fr: 'Tous nos guides pratiques',
  en: 'All practical guides',
  es: 'Todas nuestras guías prácticas',
}

interface GuideFooterProps {
  locale: string
  currentSlug: string
}

export function GuideFooter({ locale, currentSlug }: GuideFooterProps) {
  const lang = locale === 'fr' || locale === 'es' ? (locale as 'fr' | 'es') : 'en'
  const others = ALL_GUIDES.filter((g) => g.slug !== currentSlug)

  return (
    <section className="mt-12 mb-4 bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-100 rounded-3xl p-8">
      <h2 className="text-xl font-extrabold text-gray-900 mb-2">{TITLES[lang]}</h2>
      <p className="text-sm text-gray-500 mb-6">
        {lang === 'fr'
          ? 'Voyager sereinement avec votre animal en Europe — guide par guide.'
          : lang === 'es'
          ? 'Viaja tranquilo con tu mascota por Europa — guía a guía.'
          : 'Travel confidently with your pet across Europe — guide by guide.'}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {others.map((guide) => (
          <Link
            key={guide.slug}
            href={`/${locale}/guides/${guide.slug}`}
            className="group flex items-start gap-4 bg-white rounded-2xl border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all p-4"
          >
            <span className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
              {guide.emoji}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors leading-tight">
                {guide.label[lang]}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{guide.desc[lang]}</p>
            </div>
            <span className="flex-shrink-0 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all text-lg mt-0.5">→</span>
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          href={`/${locale}/guides`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          📚 {lang === 'fr' ? 'Voir tous les guides' : lang === 'es' ? 'Ver todas las guías' : 'View all guides'} →
        </Link>
      </div>
    </section>
  )
}
