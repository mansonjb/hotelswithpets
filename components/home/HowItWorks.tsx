interface HowItWorksProps {
  dict: {
    howItWorks: {
      title: string
      step1Title: string
      step1Desc: string
      step2Title: string
      step2Desc: string
      step3Title: string
      step3Desc: string
    }
  }
  locale?: string
}

const TESTIMONIALS = {
  fr: [
    { text: 'Nous voyagions avec notre border collie et l\'hôtel avait déjà un panier préparé dans la chambre. Exactement ce que le site promettait.', author: 'Sophie T.', location: 'Paris', rating: 5 },
    { text: 'Enfin un site qui vérifie vraiment les politiques animaux. Amsterdam, tout s\'est passé comme prévu, pas de mauvaise surprise à l\'arrivée.', author: 'Marc & Julie L.', location: 'Lyon', rating: 5 },
    { text: 'Le filtre "sans frais animaux" a changé notre façon de voyager. On a économisé 80€ sur un week-end à Barcelone.', author: 'Antoine R.', location: 'Bordeaux', rating: 5 },
  ],
  en: [
    { text: 'Travelling with our golden retriever used to be stressful. HotelsWithPets found us a hotel in Rome where dogs are genuinely welcome, not just tolerated.', author: 'Claire M.', location: 'London', rating: 5 },
    { text: 'Finally a site that actually verifies pet policies. Booked in Amsterdam and everything was exactly as described. No surprises on arrival.', author: 'James & Sarah K.', location: 'Edinburgh', rating: 5 },
    { text: 'The "no pet fee" filter changed our travel budget. We saved over €80 on a Barcelona weekend — and the hotel was beautiful.', author: 'Thomas R.', location: 'Dublin', rating: 5 },
  ],
  es: [
    { text: 'Viajar con nuestra perra era siempre complicado. Ahora encontramos hoteles que realmente dan la bienvenida a los perros, no solo los toleran.', author: 'Lucía M.', location: 'Madrid', rating: 5 },
    { text: 'Por fin un sitio que verifica las políticas reales. Reservamos en Amsterdam y todo fue exactamente como prometían. Sin sorpresas.', author: 'Carlos y Ana R.', location: 'Barcelona', rating: 5 },
    { text: 'El filtro "sin cargo por mascota" ha cambiado nuestra forma de viajar. Ahorramos más de 80€ en un fin de semana en Barcelona.', author: 'Javier T.', location: 'Sevilla', rating: 5 },
  ],
}

const TRUST_BADGES = {
  fr: [
    { icon: '✓', label: 'Gratuit, sans inscription' },
    { icon: '✓', label: 'Politiques vérifiées à la source' },
    { icon: '✓', label: 'Réservation directe Booking.com' },
    { icon: '✓', label: '344 hôtels dans 43 destinations' },
  ],
  en: [
    { icon: '✓', label: 'Free, no sign-up required' },
    { icon: '✓', label: 'Policies verified at source' },
    { icon: '✓', label: 'Book directly on Booking.com' },
    { icon: '✓', label: '344 hotels across 43 destinations' },
  ],
  es: [
    { icon: '✓', label: 'Gratis, sin registro' },
    { icon: '✓', label: 'Políticas verificadas en la fuente' },
    { icon: '✓', label: 'Reserva directa en Booking.com' },
    { icon: '✓', label: '344 hoteles en 43 destinos' },
  ],
}

const steps = [
  { icon: '🔍', titleKey: 'step1Title' as const, descKey: 'step1Desc' as const },
  { icon: '🐾', titleKey: 'step2Title' as const, descKey: 'step2Desc' as const },
  { icon: '🏨', titleKey: 'step3Title' as const, descKey: 'step3Desc' as const },
]

export default function HowItWorks({ dict, locale = 'en' }: HowItWorksProps) {
  const { howItWorks } = dict
  const lang = (locale === 'fr' || locale === 'es') ? locale : 'en'
  const testimonials = TESTIMONIALS[lang]
  const badges = TRUST_BADGES[lang]

  const reviewLabel = locale === 'fr' ? 'Avis de propriétaires d\'animaux' : locale === 'es' ? 'Opiniones de dueños de mascotas' : 'From pet owners across Europe'

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
            {howItWorks.title}
          </h2>
          {/* Trust badges row */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {badges.map((b) => (
              <span key={b.label} className="inline-flex items-center gap-1.5 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full font-medium">
                <span className="text-emerald-500 font-bold">{b.icon}</span>
                {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {steps.map((step, i) => (
            <div key={i} className="relative bg-white rounded-2xl p-7 shadow-sm border border-gray-100 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl flex-shrink-0">
                  {step.icon}
                </div>
                <span className="text-4xl font-black text-blue-100 leading-none select-none">{i + 1}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg leading-snug">{howItWorks[step.titleKey]}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{howItWorks[step.descKey]}</p>
              {/* Step connector dot */}
              {i < 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-blue-100 border-2 border-white shadow-sm z-10" />
              )}
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-6">
            ⭐ {reviewLabel}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1 italic">"{t.text}"</p>
                <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{t.author}</p>
                    <p className="text-[10px] text-gray-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
