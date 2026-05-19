'use client'

import { useEffect, useRef } from 'react'

interface Props {
  /** IATA airport code for the destination being viewed (e.g. 'BCN'). Pre-fills the widget. */
  destinationIATA?: string
  /** Page locale, drives the widget UI language. */
  locale: string
  /** Localized city name, used only for the heading above the widget. */
  cityName: string
}

const SHMARKER = '730118'
const TRS = '530832'
const PROMO_ID = '3414'
const CAMPAIGN_ID = '111'

const LOCALE_CURRENCY: Record<string, string> = {
  en: 'eur',
  fr: 'eur',
  es: 'eur',
  pt: 'eur',
}

// Headings per locale. Falls back to EN for unknown locales.
const HEADINGS: Record<string, { title: (c: string) => string; sub: (c: string) => string }> = {
  en: {
    title: c => `Compare pet-friendly flights to ${c}`,
    sub: c => `Search live prices across airlines that allow pets in cabin (Air France, KLM, Lufthansa, SAS and more). Pet policy must always be confirmed with the carrier before booking.`,
  },
  fr: {
    title: c => `Comparer les vols pet-friendly vers ${c}`,
    sub: c => `Prix en direct sur les compagnies qui acceptent les animaux en cabine (Air France, KLM, Lufthansa, SAS et plus). La politique animaux est à confirmer auprès du transporteur avant de réserver.`,
  },
  es: {
    title: c => `Compara vuelos pet-friendly a ${c}`,
    sub: c => `Precios en vivo en aerolíneas que admiten mascotas en cabina (Air France, KLM, Lufthansa, SAS y más). La política de mascotas debe confirmarse con la compañía antes de reservar.`,
  },
  pt: {
    title: c => `Compare voos pet-friendly para ${c}`,
    sub: c => `Preços em direto em companhias que aceitam animais em cabina (Air France, KLM, Lufthansa, SAS e mais). A política de animais deve ser confirmada com a companhia antes de reservar.`,
  },
}

/**
 * Travelpayouts flight + hotel search widget.
 *
 * Renders the tpwgt.com search form pre-filled with the destination IATA
 * and localized to the page locale. Same async-injection pattern as the
 * global analytics scripts so it doesn't block hydration.
 */
export default function TravelpayoutsFlightWidget({ destinationIATA, locale, cityName }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    // Clear any previous widget render (e.g. on locale or destination change).
    node.innerHTML = ''

    const params = new URLSearchParams({
      currency: LOCALE_CURRENCY[locale] ?? 'eur',
      trs: TRS,
      shmarker: SHMARKER,
      locale,
      stops: 'any',
      show_hotels: 'true',
      powered_by: 'true',
      border_radius: '0',
      plain: 'true',
      color_button: '#00A991',
      color_button_text: '#ffffff',
      promo_id: PROMO_ID,
      campaign_id: CAMPAIGN_ID,
      // Force empty origin so the widget falls back to IP-detected user location
      // instead of the NTE default baked into the saved widget config (shmarker).
      default_origin: '',
    })
    if (destinationIATA) params.set('default_destination', destinationIATA)

    const script = document.createElement('script')
    script.async = true
    script.charset = 'utf-8'
    script.src = `https://tpwgt.com/content?${params.toString()}`
    node.appendChild(script)

    return () => {
      if (node) node.innerHTML = ''
    }
  }, [destinationIATA, locale])

  const langKey = locale === 'fr' || locale === 'es' || locale === 'pt' ? locale : 'en'
  const heading = HEADINGS[langKey] ?? HEADINGS.en

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 text-center">
          ✈️ {heading.title(cityName)}
        </h2>
        <p className="text-sm text-gray-500 text-center max-w-2xl mx-auto mb-6 leading-relaxed">
          {heading.sub(cityName)}
        </p>
        <div ref={containerRef} />
      </div>
    </section>
  )
}
