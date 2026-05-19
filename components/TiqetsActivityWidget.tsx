'use client'

import { useEffect, useRef } from 'react'

interface Props {
  /** Tiqets city ID (e.g. '260932' for Paris). Required; the widget needs it to fetch activities. */
  tiqetsCityId: string
  /** Page locale, drives both the widget UI language and the displayed currency. */
  locale: string
  /** Localized city name, used only for the heading above the widget. */
  cityName: string
}

const SHMARKER = '730118'
const TRS = '530832'
const PROMO_ID = '3947'
const CAMPAIGN_ID = '89'

/** Per-locale currency. EN→USD to match the global EN/US audience, others EUR. */
const LOCALE_CURRENCY: Record<string, string> = {
  en: 'USD',
  fr: 'EUR',
  es: 'EUR',
  pt: 'EUR',
}

const HEADINGS: Record<string, { title: (c: string) => string; sub: (c: string) => string }> = {
  en: {
    title: c => `Top-rated activities in ${c}`,
    sub: c => `Tours, museum tickets and experiences in ${c}, bookable in advance. Some venues allow leashed dogs, check each activity's pet policy on the booking page.`,
  },
  fr: {
    title: c => `Activités les mieux notées à ${c}`,
    sub: c => `Visites, billets musées et expériences à ${c}, réservables en amont. Certains lieux acceptent les chiens en laisse, vérifier la politique animaux sur la page de chaque activité.`,
  },
  es: {
    title: c => `Actividades mejor valoradas en ${c}`,
    sub: c => `Visitas, entradas de museos y experiencias en ${c}, reservables con antelación. Algunos lugares admiten perros con correa, comprueba la política en cada actividad.`,
  },
  pt: {
    title: c => `Atividades mais bem avaliadas em ${c}`,
    sub: c => `Visitas, bilhetes de museus e experiências em ${c}, reserváveis com antecedência. Alguns lugares aceitam cães com trela, verifique a política em cada atividade.`,
  },
}

/**
 * Tiqets activity-cards widget.
 *
 * Renders a horizontal carousel of top-rated activities for the given Tiqets
 * city ID. Same async-injection + cleanup pattern as TravelpayoutsFlightWidget.
 * Tiqets city IDs are stored on `destinations[].tiqetsId` (96/140 covered).
 */
export default function TiqetsActivityWidget({ tiqetsCityId, locale, cityName }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    node.innerHTML = ''

    const params = new URLSearchParams({
      currency: LOCALE_CURRENCY[locale] ?? 'EUR',
      trs: TRS,
      shmarker: SHMARKER,
      language: locale,
      locale: tiqetsCityId,
      layout: 'horizontal',
      cards: '4',
      powered_by: 'true',
      campaign_id: CAMPAIGN_ID,
      promo_id: PROMO_ID,
    })

    const script = document.createElement('script')
    script.async = true
    script.charset = 'utf-8'
    script.src = `https://tpwgt.com/content?${params.toString()}`
    node.appendChild(script)

    return () => {
      if (node) node.innerHTML = ''
    }
  }, [tiqetsCityId, locale])

  const langKey = locale === 'fr' || locale === 'es' || locale === 'pt' ? locale : 'en'
  const heading = HEADINGS[langKey] ?? HEADINGS.en

  return (
    <section className="py-10 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
          🎟️ {heading.title(cityName)}
        </h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed max-w-2xl">
          {heading.sub(cityName)}
        </p>
        <div ref={containerRef} />
      </div>
    </section>
  )
}
