// Spanish-only programmatic landing pages targeting GSC near-miss clusters.
// Top queries (28-day data, 0 clicks):
//   "hoteles pet friendly madrid" (32 impr, pos 66)
//   "hotel madrid pet friendly" (20 impr, pos 60)
//   "hoteles madrid mascotas" (16 impr, pos 59)
//   "veterinario urgencias cordoba" (29 impr, pos 36)
//   "pet-friendly hotels palma" (39 impr, pos 60)
//   ... 200+ Spanish-language impressions clustered on a handful of cities
//
// Strategy: dedicated landing pages with exact-match URL, exact-match H1,
// rich Spanish content, and ItemList schema to feed AI engines + Google.

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import destinations from '@/data/destinations.json'
import hotels from '@/data/hotels.json'
import { getLocalizedCityName } from '@/lib/cityNames'
import { getLocalizedCountryName } from '@/lib/countries'

// Whitelist of cities that get a dedicated Spanish landing page — focused on
// cities with high GSC impressions for "hoteles X pet friendly" patterns.
const TARGET_CITIES: { ciudad: string; citySlug: string }[] = [
  { ciudad: 'madrid',          citySlug: 'madrid' },
  { ciudad: 'barcelona',       citySlug: 'barcelona' },
  { ciudad: 'cordoba',         citySlug: 'cordoba' },
  { ciudad: 'sevilla',         citySlug: 'seville' },
  { ciudad: 'granada',         citySlug: 'granada' },
  { ciudad: 'valencia',        citySlug: 'valencia' },
  { ciudad: 'palma-de-mallorca', citySlug: 'palma' },
  { ciudad: 'malaga',          citySlug: 'malaga' },
  { ciudad: 'bilbao',          citySlug: 'bilbao' },
  { ciudad: 'san-sebastian',   citySlug: 'san-sebastian' },
  { ciudad: 'zaragoza',        citySlug: 'zaragoza' },
  { ciudad: 'toledo',          citySlug: 'toledo' },
]

export async function generateStaticParams() {
  // Only generate Spanish locale — these pages are ES-only by design
  return TARGET_CITIES.map((t) => ({ locale: 'es', ciudad: t.ciudad }))
}

export const dynamicParams = false

function resolveCity(ciudad: string) {
  return TARGET_CITIES.find((t) => t.ciudad === ciudad)
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; ciudad: string }> }): Promise<Metadata> {
  const { locale, ciudad } = await params
  if (locale !== 'es') return {}
  const target = resolveCity(ciudad)
  if (!target) return {}
  const dest = destinations.find((d) => d.slug === target.citySlug)
  if (!dest) return {}
  const cityEs = getLocalizedCityName(dest.slug, dest.name, 'es')
  const countryEs = getLocalizedCountryName(dest.country, 'es')
  const cityHotels = hotels.filter((h) => h.destinationSlug === target.citySlug)
  const count = cityHotels.length
  const minPrice = count > 0 ? Math.min(...cityHotels.map((h) => h.priceFrom).filter(Boolean)) : null
  const year = new Date().getFullYear()

  const title = `Hoteles pet-friendly en ${cityEs} (${year}) — ${count} hoteles que admiten mascotas | HotelsWithPets.com`
  const description = `Los mejores ${count} hoteles que admiten perros y gatos en ${cityEs}, ${countryEs} desde ${minPrice} €/noche. Suplemento mascotas, peso máximo y políticas detalladas. Reserva en Booking.com.`

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/es/hoteles-pet-friendly/${ciudad}`,
    },
    openGraph: { title, description, type: 'website' },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: string; ciudad: string }> }) {
  const { locale, ciudad } = await params

  // Only Spanish — redirect en/fr to the corresponding destination page
  if (locale !== 'es') {
    const target = resolveCity(ciudad)
    if (!target) notFound()
    redirect(`/${locale}/destinations/${target.citySlug}`)
  }

  const target = resolveCity(ciudad)
  if (!target) notFound()

  const dest = destinations.find((d) => d.slug === target.citySlug)
  if (!dest) notFound()

  const cityEs = getLocalizedCityName(dest.slug, dest.name, 'es')
  const countryEs = getLocalizedCountryName(dest.country, 'es')
  const cityHotels = hotels.filter((h) => h.destinationSlug === target.citySlug)
  const minPrice = cityHotels.length > 0 ? Math.min(...cityHotels.map((h) => h.priceFrom).filter(Boolean)) : 0
  const avgFee = cityHotels.length > 0
    ? Math.round(cityHotels.map((h) => h.petFee ?? 0).reduce((a, b) => a + b, 0) / cityHotels.length)
    : 0
  const freeHotels = cityHotels.filter((h) => (h.petFee ?? 1) < 0.5).length

  // Schema.org ItemList for the hotel ranking + FAQPage for AI citations
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `Hoteles pet-friendly en ${cityEs} — Guía 2026`,
      description: `Los ${cityHotels.length} mejores hoteles que admiten mascotas en ${cityEs}.`,
      datePublished: '2026-05-09T00:00:00Z',
      dateModified: new Date().toISOString(),
      author: { '@type': 'Organization', name: 'HotelsWithPets' },
      mainEntityOfPage: `${SITE_URL}/es/hoteles-pet-friendly/${ciudad}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: cityHotels.length,
      itemListElement: cityHotels.map((h, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: h.name,
        url: `${SITE_URL}/es/hotels/${h.slug}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `¿Cuáles son los mejores hoteles pet-friendly en ${cityEs}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Tenemos ${cityHotels.length} hoteles verificados que admiten mascotas en ${cityEs}: ${cityHotels.slice(0, 5).map((h) => h.name).join(', ')}${cityHotels.length > 5 ? `, y ${cityHotels.length - 5} más` : ''}. Todos con políticas de mascotas verificadas, suplementos en EUR y enlaces de reserva directos.`,
          },
        },
        {
          '@type': 'Question',
          name: `¿Cuánto cuesta el suplemento por mascota en ${cityEs}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `El suplemento medio por mascota en los hoteles de ${cityEs} es de ${avgFee} € por noche. ${freeHotels} de ${cityHotels.length} hoteles no cobran suplemento adicional por mascotas.`,
          },
        },
        {
          '@type': 'Question',
          name: `¿Hay hoteles que admiten gatos en ${cityEs}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Sí. ${cityHotels.filter((h) => h.categories?.includes('cat-friendly')).length} de los ${cityHotels.length} hoteles pet-friendly en ${cityEs} admiten gatos además de perros. Filtra por la categoría 'cat-friendly' en cada ficha de hotel.`,
          },
        },
      ],
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/es" className="hover:text-cyan-700">Inicio</Link>
          <span className="mx-2">›</span>
          <Link href="/es/destinations" className="hover:text-cyan-700">Destinos</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">Hoteles pet-friendly en {cityEs}</span>
        </nav>

        <header className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-700">{dest.flag} {countryEs} · {new Date().getFullYear()}</p>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
            Hoteles pet-friendly en {cityEs} — {cityHotels.length} hoteles que admiten mascotas
          </h1>
          <p className="text-lg leading-relaxed text-gray-700">
            Los <strong>{cityHotels.length} mejores hoteles pet-friendly en {cityEs}</strong>, con políticas
            de mascotas verificadas, suplementos en euros y enlaces de reserva directos. Hoteles que admiten{' '}
            <strong>perros y gatos</strong> desde {minPrice} €/noche, con suplemento medio de <strong>{avgFee} €/noche</strong>{freeHotels > 0 ? ` (${freeHotels} hoteles sin suplemento)` : ''}.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-cyan-50 p-4 text-sm sm:grid-cols-4">
            <div>
              <div className="text-2xl font-bold text-cyan-800">{cityHotels.length}</div>
              <div className="text-cyan-900/70">hoteles verificados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-800">{minPrice}€</div>
              <div className="text-cyan-900/70">desde / noche</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-800">{avgFee}€</div>
              <div className="text-cyan-900/70">supl. medio mascota</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-800">{freeHotels}</div>
              <div className="text-cyan-900/70">sin cargo</div>
            </div>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Por qué confiar en esta selección</h2>
          <p className="mb-3 leading-relaxed text-gray-700">
            Cada hotel listado aquí ha sido auditado individualmente: comprobamos su política de mascotas en
            Booking.com y en el sitio web del hotel, el suplemento por noche, el peso máximo aceptado, el
            número de mascotas permitidas por habitación y las zonas donde se admiten (lobby, restaurante,
            piscina). Sin ranking comprado, sin contenido patrocinado.
          </p>
          <p className="mb-3 leading-relaxed text-gray-700">
            <strong>Categorías destacadas en {cityEs}</strong>: hoteles que admiten perros, hoteles que
            admiten gatos, hoteles de lujo pet-friendly, hoteles boutique pet-friendly, hoteles cerca de
            parques caninos. Todas las reservas se gestionan en Booking.com con el mismo precio que verías
            directamente, sin coste adicional para ti.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Los {cityHotels.length} hoteles pet-friendly en {cityEs}</h2>
          <ol className="space-y-4">
            {cityHotels.map((h, i) => (
              <li key={h.id} className="rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
                <Link href={`/es/hotels/${h.slug}`} className="flex flex-col sm:flex-row">
                  <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-t-xl bg-gray-100 sm:h-auto sm:w-56 sm:rounded-l-xl sm:rounded-tr-none">
                    <Image
                      src={`/images/hotels/${h.id}.jpg`}
                      alt={`${h.name} - hotel pet-friendly en ${cityEs}`}
                      fill
                      sizes="(max-width:640px) 100vw, 224px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 p-5">
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-full bg-cyan-100 px-2 py-0.5 font-semibold text-cyan-800">#{i + 1}</span>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">{h.stars}★</span>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-800">⭐ {h.rating}/10</span>
                      {(h.petFee ?? 0) === 0 ? (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-semibold text-emerald-800">Sin cargo</span>
                      ) : (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-800">{h.petFee}€/noche</span>
                      )}
                      {h.categories?.includes('cat-friendly') && (
                        <span className="rounded-full bg-purple-100 px-2 py-0.5 text-purple-800">🐈 Admite gatos</span>
                      )}
                      {h.categories?.includes('luxury') && (
                        <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-yellow-800">✨ Lujo</span>
                      )}
                    </div>
                    <h3 className="mb-1 text-lg font-bold text-gray-900">{h.name}</h3>
                    <p className="mb-2 text-sm font-semibold text-cyan-700">Desde {h.priceFrom} €/noche</p>
                    <p className="line-clamp-2 text-sm leading-relaxed text-gray-700">{h.petPolicy}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12 rounded-xl bg-cyan-50 p-6 sm:p-8">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">¿Buscas más información sobre {cityEs} con tu mascota?</h2>
          <p className="mb-5 leading-relaxed text-gray-700">
            Consulta la guía completa de la ciudad: restaurantes que admiten perros, parques caninos, zonas
            sin correa, veterinarios de urgencias 24h, transporte público con mascotas, y los mejores
            paseos para perros en {cityEs}.
          </p>
          <Link
            href={`/es/destinations/${target.citySlug}`}
            className="inline-flex rounded-lg bg-cyan-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-800"
          >
            Ver la guía completa de {cityEs} →
          </Link>
        </section>
      </article>
    </>
  )
}
