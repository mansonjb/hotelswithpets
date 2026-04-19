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
    en: 'Practical guides for travelling with your dog or cat across Europe: pet passport requirements, country-by-country rules, tips and more.',
    fr: 'Guides pratiques pour voyager avec votre chien ou chat en Europe : passeport animal, règles par pays, conseils essentiels.',
    es: 'Guías prácticas para viajar con tu perro o gato por Europa: pasaporte de mascota, normas por país, consejos imprescindibles.',
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
    subtitle: 'Tout ce qu\'il faut savoir pour voyager sereinement avec votre chien ou votre chat à travers l\'Europe.',
    guides: [
      {
        emoji: '📋',
        title: 'Passeport animal par pays',
        desc: 'Puce électronique, vaccin antirabique, traitement tapeworm... Les conditions d\'entrée pays par pays pour l\'UE, le Royaume-Uni, la Finlande, la Norvège, l\'Islande et plus encore. Fact-checké sur les sources officielles.',
        href: 'passeport-animal',
        badge: 'Essentiel',
        tags: ['Tous les pays', 'Réglementation', 'Vétérinaire'],
      },
      {
        emoji: '🚂',
        title: 'Voyager en train avec son chien',
        desc: 'SNCF, Deutsche Bahn, Renfe, Trenitalia, Eurostar — tarifs, règles muselière, dimensions des transportins et comment réserver. Fact-checké par compagnie.',
        href: 'train-avec-chien',
        badge: 'Nouveau',
        tags: ['Train', 'Europe', 'SNCF', 'Tarifs'],
      },
      {
        emoji: '✈️',
        title: 'Prendre l\'avion avec son animal',
        desc: 'Cabine ou soute, quelles compagnies acceptent les animaux, races brachycéphales interdites, dimensions IATA et processus de réservation. Ryanair & easyJet : la vérité.',
        href: 'avion-animal',
        badge: 'Nouveau',
        tags: ['Avion', 'Compagnies', 'Cabine vs soute'],
      },
      {
        emoji: '🚗',
        title: 'Road trip avec son chien',
        desc: 'Lois par pays (France, Allemagne, Espagne, Italie...), sécurité en voiture, Eurotunnel, ferries et trousse de premiers secours. Amendes et obligations légales.',
        href: 'road-trip-chien',
        badge: 'Nouveau',
        tags: ['Voiture', 'Frontières', 'Sécurité', 'Ferries'],
      },
      {
        emoji: '🏨',
        title: 'Choisir un vrai hôtel pet-friendly',
        desc: 'Les red flags à repérer, les green flags qui comptent, les bonnes questions à poser et le vrai coût des frais animaux. Guide sans langue de bois.',
        href: 'hotel-pet-friendly',
        badge: 'Nouveau',
        tags: ['Hôtels', 'Conseils', 'Frais animaux'],
      },
    ],
    comingSoon: '',
    comingSoonGuides: [],
  },
  en: {
    hero: 'Practical guides',
    subtitle: 'Everything you need to travel confidently with your dog or cat anywhere in Europe.',
    guides: [
      {
        emoji: '📋',
        title: 'Pet passport by country',
        desc: 'Microchip, rabies vaccination, tapeworm treatment... Entry requirements country by country for the EU, UK, Finland, Norway, Iceland and more. Fact-checked against official sources.',
        href: 'passeport-animal',
        badge: 'Essential',
        tags: ['All countries', 'Regulations', 'Vet'],
      },
      {
        emoji: '🚂',
        title: 'Travelling by train with your dog',
        desc: 'SNCF, Deutsche Bahn, Renfe, Trenitalia, Eurostar — fares, muzzle rules, carrier dimensions and how to book. Fact-checked per operator.',
        href: 'train-avec-chien',
        badge: 'New',
        tags: ['Train', 'Europe', 'Fares', 'Rules'],
      },
      {
        emoji: '✈️',
        title: 'Flying with your pet',
        desc: 'Cabin vs hold, which airlines accept pets, brachycephalic breed bans, IATA dimensions and booking process. Ryanair & easyJet: the truth.',
        href: 'avion-animal',
        badge: 'New',
        tags: ['Flight', 'Airlines', 'Cabin vs hold'],
      },
      {
        emoji: '🚗',
        title: 'Road tripping with your dog',
        desc: 'Laws by country (France, Germany, Spain, Italy...), car safety, Eurotunnel, ferries and first-aid kit. Fines and legal obligations.',
        href: 'road-trip-chien',
        badge: 'New',
        tags: ['Car', 'Borders', 'Safety', 'Ferries'],
      },
      {
        emoji: '🏨',
        title: 'Choosing a truly pet-friendly hotel',
        desc: 'Red flags to spot, green flags that matter, questions to ask before booking, and the real cost of pet fees. The no-nonsense guide.',
        href: 'hotel-pet-friendly',
        badge: 'New',
        tags: ['Hotels', 'Tips', 'Pet fees'],
      },
    ],
    comingSoon: '',
    comingSoonGuides: [],
  },
  es: {
    hero: 'Guías prácticas',
    subtitle: 'Todo lo que necesitas para viajar con tranquilidad con tu perro o gato por Europa.',
    guides: [
      {
        emoji: '📋',
        title: 'Pasaporte de mascota por país',
        desc: 'Microchip, vacuna antirrábica, tratamiento contra tenias... Requisitos de entrada país a país para la UE, Reino Unido, Finlandia, Noruega, Islandia y más. Verificado en fuentes oficiales.',
        href: 'passeport-animal',
        badge: 'Esencial',
        tags: ['Todos los países', 'Normativa', 'Veterinario'],
      },
      {
        emoji: '🚂',
        title: 'Viajar en tren con tu perro',
        desc: 'SNCF, Deutsche Bahn, Renfe, Trenitalia, Eurostar — tarifas, normas de bozal, dimensiones del transportín y cómo reservar. Verificado por operador.',
        href: 'train-avec-chien',
        badge: 'Nuevo',
        tags: ['Tren', 'Europa', 'Tarifas', 'Normas'],
      },
      {
        emoji: '✈️',
        title: 'Volar con tu mascota',
        desc: 'Cabina o bodega, qué aerolíneas aceptan mascotas, razas braquicéfalas prohibidas, dimensiones IATA y proceso de reserva. Ryanair & easyJet: la verdad.',
        href: 'avion-animal',
        badge: 'Nuevo',
        tags: ['Vuelo', 'Aerolíneas', 'Cabina vs bodega'],
      },
      {
        emoji: '🚗',
        title: 'Road trip con tu perro',
        desc: 'Leyes por país (Francia, Alemania, España, Italia...), seguridad en el coche, Eurotunnel, ferrys y botiquín. Multas y obligaciones legales.',
        href: 'road-trip-chien',
        badge: 'Nuevo',
        tags: ['Coche', 'Fronteras', 'Seguridad', 'Ferrys'],
      },
      {
        emoji: '🏨',
        title: 'Elegir un hotel realmente pet-friendly',
        desc: 'Red flags que detectar, green flags que importan, preguntas clave antes de reservar y el coste real de las tarifas por mascota. La guía sin rodeos.',
        href: 'hotel-pet-friendly',
        badge: 'Nuevo',
        tags: ['Hoteles', 'Consejos', 'Tarifas mascotas'],
      },
    ],
    comingSoon: '',
    comingSoonGuides: [],
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
            📚 {locale === 'fr' ? 'Ressources pratiques' : locale === 'es' ? 'Recursos prácticos' : 'Practical resources'}
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

        {/* Coming soon — section removed, all guides now published */}

      </div>
    </div>
  )
}
