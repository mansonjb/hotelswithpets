import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}

  const titles: Record<string, string> = {
    en: 'Pet Travel Guides for Europe | HotelsWithPets.com',
    fr: 'Guides pratiques pour voyager avec son animal en Europe | HotelsWithPets.com',
    es: 'Guías prácticas para viajar con mascota en Europa | HotelsWithPets.com',
  }
  const descriptions: Record<string, string> = {
    en: 'Practical guides for travelling with your dog or cat in Europe: pet passport requirements, country rules, tips and more.',
    fr: 'Guides pratiques pour voyager avec votre chien ou chat en Europe : passeport animal, règles par pays, conseils.',
    es: 'Guías prácticas para viajar con tu perro o gato en Europa: pasaporte de mascota, normas por país, consejos.',
  }

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides`,
      languages: {
        en: `${SITE_URL}/en/guides`,
        fr: `${SITE_URL}/fr/guides`,
        es: `${SITE_URL}/es/guides`,
        'x-default': `${SITE_URL}/en/guides`,
      },
    },
  }
}

const COPY = {
  fr: {
    hero: 'Guides pratiques',
    subtitle: 'Tout ce qu\'il faut savoir pour voyager sereinement avec votre chien ou votre chat en Europe.',
    guides: [
      {
        emoji: '📋',
        title: 'Passeport animal par pays',
        desc: 'Puce, vaccin antirabique, traitement tapeworm... Les règles d\'entrée pays par pays pour l\'UE, le Royaume-Uni, la Finlande, l\'Islande et plus. Fact-checké sur les sources officielles.',
        href: 'passeport-animal',
        badge: 'Essentiel',
        tags: ['Tous les pays', 'Réglementation', 'Vétérinaire'],
      },
    ],
    comingSoon: 'À venir',
    comingSoonGuides: [
      { emoji: '🏖️', title: 'Voyager en train avec son chien', desc: 'Règles SNCF, Eurostar, Thalys, Renfe... Comment transporter votre animal en train à travers l\'Europe.' },
      { emoji: '✈️', title: 'Voyager en avion avec son animal', desc: 'Cabine vs soute, compagnies acceptant les animaux, restrictions de taille et de race.' },
      { emoji: '🚗', title: 'Road trip avec son chien', desc: 'Sécurité en voiture, pauses, frontières, trousse de premiers secours.' },
      { emoji: '🏨', title: 'Choisir un hôtel vraiment pet-friendly', desc: 'Les bons critères à vérifier avant de réserver, les pièges à éviter.' },
    ],
  },
  en: {
    hero: 'Practical guides',
    subtitle: 'Everything you need to know to travel confidently with your dog or cat in Europe.',
    guides: [
      {
        emoji: '📋',
        title: 'Pet passport by country',
        desc: 'Microchip, rabies vaccination, tapeworm treatment... Entry rules country by country for the EU, UK, Finland, Iceland and more. Fact-checked against official sources.',
        href: 'passeport-animal',
        badge: 'Essential',
        tags: ['All countries', 'Regulations', 'Vet'],
      },
    ],
    comingSoon: 'Coming soon',
    comingSoonGuides: [
      { emoji: '🏖️', title: 'Travelling by train with your dog', desc: 'Rules for Eurostar, Thalys, Renfe, and more. How to transport your pet by train across Europe.' },
      { emoji: '✈️', title: 'Flying with your pet', desc: 'Cabin vs hold, airlines that accept pets, size and breed restrictions.' },
      { emoji: '🚗', title: 'Road tripping with your dog', desc: 'Car safety, breaks, border crossings, first-aid kit.' },
      { emoji: '🏨', title: 'Choosing a truly pet-friendly hotel', desc: 'The right criteria to check before booking, common pitfalls to avoid.' },
    ],
  },
  es: {
    hero: 'Guías prácticas',
    subtitle: 'Todo lo que necesitas saber para viajar con tranquilidad con tu perro o gato en Europa.',
    guides: [
      {
        emoji: '📋',
        title: 'Pasaporte de mascota por país',
        desc: 'Microchip, vacuna antirrábica, tratamiento contra tenias... Normas de entrada país a país para la UE, Reino Unido, Finlandia, Islandia y más. Verificado en fuentes oficiales.',
        href: 'passeport-animal',
        badge: 'Esencial',
        tags: ['Todos los países', 'Normativa', 'Veterinario'],
      },
    ],
    comingSoon: 'Próximamente',
    comingSoonGuides: [
      { emoji: '🏖️', title: 'Viajar en tren con tu perro', desc: 'Normas de Renfe, Eurostar, Thalys... Cómo transportar a tu mascota en tren por Europa.' },
      { emoji: '✈️', title: 'Volar con tu mascota', desc: 'Cabina vs bodega, aerolíneas que aceptan mascotas, restricciones de tamaño y raza.' },
      { emoji: '🚗', title: 'Road trip con tu perro', desc: 'Seguridad en el coche, paradas, fronteras, botiquín de primeros auxilios.' },
      { emoji: '🏨', title: 'Elegir un hotel realmente pet-friendly', desc: 'Los criterios correctos a verificar antes de reservar, errores comunes a evitar.' },
    ],
  },
}

export default async function GuidesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const lang = locale === 'fr' || locale === 'es' ? locale : 'en'
  const copy = COPY[lang]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs font-medium mb-5">
            📚 {locale === 'fr' ? 'Ressources' : locale === 'es' ? 'Recursos' : 'Resources'}
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold mb-4">{copy.hero}</h1>
          <p className="text-blue-200 text-base leading-relaxed max-w-2xl">{copy.subtitle}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Published guides */}
        <div className="space-y-4 mb-14">
          {copy.guides.map((guide) => (
            <Link
              key={guide.href}
              href={`/${locale}/guides/${guide.href}`}
              className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-7"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl">
                  {guide.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h2 className="font-extrabold text-gray-900 text-lg group-hover:text-blue-700 transition-colors">
                      {guide.title}
                    </h2>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                      {guide.badge}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{guide.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {guide.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="flex-shrink-0 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200 text-xl mt-1">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming soon */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">{copy.comingSoon}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {copy.comingSoonGuides.map((guide) => (
              <div
                key={guide.title}
                className="bg-white rounded-xl border border-gray-100 border-dashed p-5 opacity-60"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{guide.emoji}</span>
                  <div>
                    <p className="font-semibold text-gray-700 text-sm mb-1">{guide.title}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{guide.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
