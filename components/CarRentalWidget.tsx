'use client'

import { useEffect, useRef } from 'react'

interface Props {
  /** Page locale, drives the widget UI language + heading. */
  locale: string
  /** Localized city name, used for the heading above the widget. */
  cityName: string
}

// GetRentacar.com search widget via Travelpayouts. Same marker/trs as the flight
// widget; its own campaign_id (222) so car-rental performance is tracked
// separately in the Travelpayouts dashboard. 10% reward, 90-day cookie.
const SHMARKER = '730118'
const TRS = '530832'
const PROMO_ID = '8813'
const CAMPAIGN_ID = '222'

const LOCALE_CURRENCY: Record<string, string> = {
  en: 'usd',
  fr: 'eur',
  es: 'eur',
  pt: 'eur',
  de: 'eur',
}

// Dog-travel angle: owners drive rather than fly with a pet, so car hire is the
// non-hotel vertical that actually fits this audience.
const HEADINGS: Record<string, { title: (c: string) => string; sub: (c: string) => string }> = {
  en: {
    title: c => `Rent a car for your dog-friendly trip to ${c}`,
    sub: c => `Most owners drive rather than fly with a pet. Compare car and van hire near ${c}, then confirm the rental's pet policy at pick-up.`,
  },
  fr: {
    title: c => `Louez une voiture pour votre séjour avec chien à ${c}`,
    sub: c => `La plupart des maîtres roulent plutôt que de prendre l'avion avec leur animal. Comparez la location de voitures et de vans près de ${c}, puis confirmez la politique animaux à la prise en charge.`,
  },
  es: {
    title: c => `Alquila un coche para tu viaje con perro a ${c}`,
    sub: c => `La mayoría de los dueños conducen en vez de volar con su mascota. Compara el alquiler de coches y furgonetas cerca de ${c} y confirma la política de mascotas al recoger el vehículo.`,
  },
  pt: {
    title: c => `Alugue um carro para a sua viagem com cão a ${c}`,
    sub: c => `A maioria dos donos conduz em vez de voar com o animal. Compare o aluguer de carros e carrinhas perto de ${c} e confirme a política de animais no levantamento.`,
  },
  de: {
    title: c => `Mietwagen für Ihre Reise mit Hund nach ${c}`,
    sub: c => `Die meisten Halter fahren mit dem Auto, statt mit dem Tier zu fliegen. Vergleichen Sie Mietwagen und Transporter in der Nähe von ${c} und bestätigen Sie die Tierregelung bei der Abholung.`,
  },
}

/**
 * GetRentacar.com car-rental search widget (Travelpayouts). Same async-injection
 * pattern as the flight widget so it doesn't block hydration.
 */
export default function CarRentalWidget({ locale, cityName }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    node.innerHTML = ''

    const params = new URLSearchParams({
      campaign_id: CAMPAIGN_ID,
      promo_id: PROMO_ID,
      shmarker: SHMARKER,
      trs: TRS,
      locale,
      currency: LOCALE_CURRENCY[locale] ?? 'eur',
    })

    const script = document.createElement('script')
    script.async = true
    script.charset = 'utf-8'
    script.src = `https://tp.media/content?${params.toString()}`
    node.appendChild(script)

    return () => {
      if (node) node.innerHTML = ''
    }
  }, [locale])

  const langKey = ['fr', 'es', 'pt', 'de'].includes(locale) ? locale : 'en'
  const heading = HEADINGS[langKey] ?? HEADINGS.en

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 text-center">
          🚗 {heading.title(cityName)}
        </h2>
        <p className="text-sm text-gray-500 text-center max-w-2xl mx-auto mb-6 leading-relaxed">
          {heading.sub(cityName)}
        </p>
        <div ref={containerRef} />
      </div>
    </section>
  )
}
