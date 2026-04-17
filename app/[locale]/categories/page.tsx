import Link from 'next/link'
import type { Metadata } from 'next'
import { getDictionary, hasLocale, locales, type Locale } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import categories from '@/data/categories.json'
import hotels from '@/data/hotels.json'
import destinations from '@/data/destinations.json'
import { SITE_URL } from '@/lib/site'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps<'/[locale]/categories'>): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const dict = await getDictionary(locale as Locale)
  return {
    title: `${dict.pages.categories.title} | HotelsWithPets.com`,
    description: dict.pages.categories.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${locale}/categories`,
      languages: {
        en: `${SITE_URL}/en/categories`,
        fr: `${SITE_URL}/fr/categories`,
        es: `${SITE_URL}/es/categories`,
        'x-default': `${SITE_URL}/en/categories`,
      },
    },
  }
}

function getCategoryName(cat: typeof categories[number], locale: Locale): string {
  if (locale === 'fr' && cat.nameFr) return cat.nameFr
  if (locale === 'es' && cat.nameEs) return cat.nameEs
  return cat.name
}

function getCategoryDesc(cat: typeof categories[number], locale: Locale): string {
  if (locale === 'fr' && cat.descriptionFr) return cat.descriptionFr
  if (locale === 'es' && cat.descriptionEs) return cat.descriptionEs
  return cat.description
}

function getTopCities(catSlug: string, count = 4): string[] {
  const tally: Record<string, number> = {}
  hotels.forEach((h) => {
    if (h.categories.includes(catSlug)) tally[h.destinationSlug] = (tally[h.destinationSlug] ?? 0) + 1
  })
  return Object.entries(tally)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([slug]) => destinations.find((d) => d.slug === slug)?.name ?? slug)
}

const COPY: Record<string, {
  intro: string
  whyTitle: string
  whyText: string
  howTitle: string
  howItems: string[]
  faqTitle: string
  faqs: { q: string; a: string }[]
}> = {
  fr: {
    intro: 'Tous nos hôtels acceptent les animaux, mais chaque séjour est différent. Filtrez par catégorie pour trouver exactement l\'hôtel qui correspond à votre situation : chien de grande taille, chat, hôtel de luxe, accès plage ou zéro supplément.',
    whyTitle: 'Pourquoi filtrer par catégorie ?',
    whyText: 'La politique animaux d\'un hôtel ne dit pas tout. Certains n\'acceptent que les petits chiens, d\'autres facturent un supplément élevé. Nos catégories vont plus loin : elles regroupent les hôtels selon des critères concrets vérifiés à la source.',
    howTitle: 'Comment utiliser les filtres',
    howItems: [
      'Choisissez une catégorie qui correspond à votre animal et vos préférences',
      'Sélectionnez une ville pour voir les hôtels disponibles',
      'Comparez les politiques, les notes et les prix',
      'Réservez directement sur Booking.com',
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Tous les hôtels acceptent-ils vraiment les animaux ?', a: 'Oui. Tous les hôtels listés sur HotelsWithPets.com ont une politique pet-friendly explicite vérifiée sur Booking.com. Nous excluons les hôtels qui n\'acceptent les animaux que "sous conditions non précisées".' },
      { q: 'Quelle est la différence entre "Chiens acceptés" et "Sans supplément animaux" ?', a: 'Tous les hôtels "Chiens acceptés" accueillent les chiens, mais certains facturent un supplément par nuit. La catégorie "Sans supplément animaux" regroupe uniquement les hôtels où votre chien séjourne gratuitement.' },
      { q: 'Les limites de poids sont-elles vérifiées ?', a: 'Nous affichons les informations disponibles sur Booking.com. Nous recommandons toujours de confirmer directement avec l\'hôtel pour les animaux de grande taille (au-dessus de 20 kg).' },
      { q: 'Les prix affichés incluent-ils le supplément animaux ?', a: 'Non. Le supplément animaux est généralement ajouté à l\'arrivée. Nous affichons le prix de base de la chambre tel que communiqué par Booking.com.' },
    ],
  },
  en: {
    intro: 'All our hotels accept pets, but every trip is different. Filter by category to find exactly the right hotel for your situation: large dog, cat, luxury stay, beach access, or zero pet fee.',
    whyTitle: 'Why filter by category?',
    whyText: 'A hotel\'s pet policy doesn\'t tell the whole story. Some only accept small dogs; others charge a high nightly fee. Our categories go further: they group hotels by concrete, source-verified criteria.',
    howTitle: 'How to use filters',
    howItems: [
      'Choose a category that matches your pet and preferences',
      'Select a city to see available hotels',
      'Compare policies, ratings, and prices',
      'Book directly on Booking.com',
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Do all listed hotels really accept pets?', a: 'Yes. Every hotel on HotelsWithPets.com has an explicit pet-friendly policy verified on Booking.com. We exclude hotels that only accept animals "subject to unspecified conditions".' },
      { q: 'What\'s the difference between "Dog-friendly" and "Dogs stay free"?', a: 'All "Dog-friendly" hotels welcome dogs, but some charge a nightly fee. "Dogs stay free" groups only hotels where your dog stays at no extra charge.' },
      { q: 'Are weight limits verified?', a: 'We display information available on Booking.com. We always recommend confirming directly with the hotel for large dogs (above 20 kg).' },
      { q: 'Do displayed prices include the pet fee?', a: 'No. The pet fee is typically added at check-in. We display the base room price as communicated by Booking.com.' },
    ],
  },
  es: {
    intro: 'Todos nuestros hoteles aceptan mascotas, pero cada viaje es diferente. Filtra por categoría para encontrar exactamente el hotel que se adapta a tu situación: perro grande, gato, estancia de lujo, acceso a la playa o sin cargo por mascota.',
    whyTitle: '¿Por qué filtrar por categoría?',
    whyText: 'La política de mascotas de un hotel no lo dice todo. Algunos solo aceptan perros pequeños; otros cobran una tarifa nocturna alta. Nuestras categorías van más allá: agrupan hoteles por criterios concretos verificados en la fuente.',
    howTitle: 'Cómo usar los filtros',
    howItems: [
      'Elige una categoría que se adapte a tu mascota y preferencias',
      'Selecciona una ciudad para ver los hoteles disponibles',
      'Compara políticas, valoraciones y precios',
      'Reserva directamente en Booking.com',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Todos los hoteles listados realmente aceptan mascotas?', a: 'Sí. Todos los hoteles en HotelsWithPets.com tienen una política pet-friendly explícita verificada en Booking.com. Excluimos los hoteles que solo aceptan animales "bajo condiciones no especificadas".' },
      { q: '¿Cuál es la diferencia entre "Admite perros" y "Sin cargo por mascota"?', a: 'Todos los hoteles "Admite perros" aceptan perros, pero algunos cobran una tarifa nocturna. "Sin cargo por mascota" agrupa solo los hoteles donde tu perro se aloja gratis.' },
      { q: '¿Se verifican los límites de peso?', a: 'Mostramos la información disponible en Booking.com. Siempre recomendamos confirmar directamente con el hotel para perros grandes (más de 20 kg).' },
      { q: '¿Los precios mostrados incluyen el cargo por mascota?', a: 'No. El cargo por mascota generalmente se añade al hacer el check-in. Mostramos el precio base de la habitación comunicado por Booking.com.' },
    ],
  },
}

export default async function CategoriesPage({ params }: PageProps<'/[locale]/categories'>) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const dict = await getDictionary(locale as Locale)
  const p = dict.pages.categories
  const lang = (locale === 'fr' || locale === 'es') ? locale : 'en'
  const copy = COPY[lang]

  const totalHotels = hotels.length
  const totalDests = new Set(hotels.map(h => h.destinationSlug)).size

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">{p.title}</h1>
            <p className="text-blue-200 text-lg leading-relaxed mb-8">{copy.intro}</p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-white/10 rounded-full px-4 py-1.5 text-sm">🏨 {totalHotels} {locale === 'fr' ? 'hôtels' : locale === 'es' ? 'hoteles' : 'hotels'}</span>
              <span className="bg-white/10 rounded-full px-4 py-1.5 text-sm">🗺️ {totalDests} {locale === 'fr' ? 'destinations' : 'destinations'}</span>
              <span className="bg-white/10 rounded-full px-4 py-1.5 text-sm">✓ {locale === 'fr' ? 'Politiques vérifiées' : locale === 'es' ? 'Políticas verificadas' : 'Verified policies'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why + How — editorial strip */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 mb-3">{copy.whyTitle}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{copy.whyText}</p>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 mb-3">{copy.howTitle}</h2>
              <ol className="space-y-2">
                {copy.howItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.filter((cat) => cat.cityCount > 0).map((cat) => {
              const hotelCount = hotels.filter((h) => h.categories.includes(cat.slug)).length
              const topCities = getTopCities(cat.slug, 4)
              return (
                <Link
                  key={cat.slug}
                  href={`/${locale}/categories/${cat.slug}`}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.gradient} p-8 min-h-[220px] flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1`}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute -right-4 -bottom-4 text-9xl opacity-10 select-none leading-none">{cat.emoji}</div>
                  <div className="relative">
                    <span className="text-4xl block mb-3">{cat.emoji}</span>
                    <h2 className="text-white font-bold text-xl leading-tight mb-1">
                      {getCategoryName(cat, locale as Locale)}
                    </h2>
                    <p className="text-white/70 text-sm mb-3">
                      {cat.cityCount} {p.destinations} · {hotelCount} {locale === 'fr' ? 'hôtels' : locale === 'es' ? 'hoteles' : 'hotels'}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {topCities.map((city) => (
                        <span key={city} className="text-white/80 text-[10px] bg-white/15 px-2 py-0.5 rounded-full">{city}</span>
                      ))}
                    </div>
                  </div>
                  <div className="relative mt-4">
                    <p className="text-white/80 text-sm leading-relaxed mb-4">{getCategoryDesc(cat, locale as Locale)}</p>
                    <span className="inline-flex items-center gap-1 text-white text-sm font-semibold group-hover:gap-2 transition-all">
                      {dict.pages.category.explore} →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">{copy.faqTitle}</h2>
          <div className="space-y-5">
            {copy.faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
