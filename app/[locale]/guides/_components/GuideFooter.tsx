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
  {
    slug: 'city-trip-chien',
    emoji: '🚂',
    label: { fr: 'City trip en Europe avec son chien', en: 'European city trip with your dog', es: 'City trip por Europa con tu perro' },
    desc:  { fr: 'Paris → Bruxelles → Amsterdam → Berlin (10 j)', en: 'Paris → Brussels → Amsterdam → Berlin (10 days)', es: 'París → Bruselas → Ámsterdam → Berlín (10 días)' },
  },
  {
    slug: 'cote-mediterraneenne-chien',
    emoji: '🌊',
    label: { fr: 'Côte méditerranéenne avec son chien', en: 'Mediterranean coast with your dog', es: 'Costa mediterránea con tu perro' },
    desc:  { fr: 'Nice → Gênes → Florence → Rome (10 j)', en: 'Nice → Genoa → Florence → Rome (10 days)', es: 'Niza → Génova → Florencia → Roma (10 días)' },
  },
  {
    slug: 'iberique-chien',
    emoji: '🌅',
    label: { fr: 'Péninsule ibérique avec son chien', en: 'Iberian peninsula with your dog', es: 'Península ibérica con tu perro' },
    desc:  { fr: 'Lisbonne → Porto → Madrid → Barcelone (12 j)', en: 'Lisbon → Porto → Madrid → Barcelona (12 days)', es: 'Lisboa → Oporto → Madrid → Barcelona (12 días)' },
  },
  {
    slug: 'alpes-chien',
    emoji: '🏔️',
    label: { fr: 'Villes alpines avec son chien', en: 'Alpine cities with your dog', es: 'Ciudades alpinas con tu perro' },
    desc:  { fr: 'Genève → Zurich → Munich → Salzbourg (10 j)', en: 'Geneva → Zurich → Munich → Salzburg (10 days)', es: 'Ginebra → Zúrich → Múnich → Salzburgo (10 días)' },
  },
  {
    slug: 'top-dog-friendly-cities-europe',
    emoji: '🏆',
    label: { fr: 'Top 20 villes dog-friendly d\'Europe', en: 'Top 20 most dog-friendly cities in Europe', es: 'Top 20 ciudades más dog-friendly de Europa' },
    desc:  { fr: 'Classement 2026 audité sur 5 critères', en: '2026 ranking audited against 5 criteria', es: 'Ranking 2026 auditado por 5 criterios' },
  },
  {
    slug: 'pet-friendly-hotels-europe-guide',
    emoji: '📘',
    label: { fr: 'Hôtels pet-friendly en Europe : guide complet', en: 'Pet-friendly hotels in Europe: complete guide', es: 'Hoteles pet-friendly en Europa: guía completa' },
    desc:  { fr: 'Chaînes, règles pays, astuces réservation', en: 'Chains, country rules, booking tips', es: 'Cadenas, normas país, consejos de reserva' },
  },
  {
    slug: 'eurostar-with-dog',
    emoji: '🚆',
    label: { fr: 'Puis-je prendre mon chien dans l\'Eurostar ?', en: 'Can I take my dog on the Eurostar?', es: '¿Puedo llevar mi perro en el Eurostar?' },
    desc:  { fr: 'Réponse + 3 alternatives transmanche', en: 'Answer + 3 cross-Channel alternatives', es: 'Respuesta + 3 alternativas transmancha' },
  },
  {
    slug: 'animal-health-certificate-vs-pet-passport-2026',
    emoji: '🛂',
    label: { fr: 'Passeport européen vs AHC : règles 2026', en: 'EU Pet Passport vs AHC: 2026 rules', es: 'Pasaporte europeo vs AHC: normas 2026' },
    desc:  { fr: 'L\'erreur à 100 € que font 78 % des voyageurs', en: 'The €100+ mistake 78% of travellers make', es: 'El error de 100 € que comete el 78 %' },
  },
  {
    slug: 'pet-travel-cost-index-europe-2026',
    emoji: '📊',
    label: { fr: 'Pet Travel Cost Index Europe 2026', en: 'Pet Travel Cost Index Europe 2026', es: 'Pet Travel Cost Index Europa 2026' },
    desc:  { fr: '611 hôtels audités · suppléments par pays + ville', en: '611 hotels audited · pet fees by country + city', es: '611 hoteles auditados · tarifas por país + ciudad' },
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
