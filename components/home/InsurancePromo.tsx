import Link from 'next/link'
import type { Locale } from '@/app/[locale]/dictionaries'
import { insuranceHref } from '@/lib/insuranceSlugs'
import { IconShield, IconCheck } from '@/components/ui/icons'

/**
 * Home-page insurance block: pushes the monetised pet-insurance ranking pages
 * to the surface (SEO prominence + internal linking). One localized copy per
 * locale, deep-linking to that language's insurance page.
 */
const COPY: Record<Locale, { kicker: string; title: string; desc: string; bullets: string[]; cta: string }> = {
  en: {
    kicker: 'Pet insurance',
    title: 'Vet bills abroad can wreck a trip. Compare pet insurance first.',
    desc: 'We ranked the main pet insurers on cover, reimbursement rates, waiting periods, price and exclusions, with zero invented reviews. An independent comparison before you choose.',
    bullets: ['Objective criteria', 'Verified, nothing invented', 'Updated regularly'],
    cta: 'See the insurance ranking',
  },
  fr: {
    kicker: 'Assurance animaux',
    title: 'Une facture véto à l\'étranger peut gâcher un voyage. Comparez d\'abord.',
    desc: 'Nous avons classé les principaux assureurs sur les garanties, les taux de remboursement, les délais de carence, le prix et les exclusions, sans aucun avis inventé. Un comparatif indépendant avant de choisir.',
    bullets: ['Critères objectifs', 'Vérifié, rien d\'inventé', 'Mis à jour régulièrement'],
    cta: 'Voir le classement des assurances',
  },
  es: {
    kicker: 'Seguro para mascotas',
    title: 'Una factura veterinaria en el extranjero puede arruinar un viaje. Compara antes.',
    desc: 'Clasificamos las principales aseguradoras por coberturas, tasas de reembolso, periodos de carencia, precio y exclusiones, sin ninguna opinión inventada. Una comparativa independiente antes de elegir.',
    bullets: ['Criterios objetivos', 'Verificado, nada inventado', 'Actualizado regularmente'],
    cta: 'Ver el ranking de seguros',
  },
  pt: {
    kicker: 'Seguro para animais',
    title: 'Uma conta do veterinário no estrangeiro pode estragar uma viagem. Compare primeiro.',
    desc: 'Classificámos as principais seguradoras por coberturas, taxas de reembolso, períodos de carência, preço e exclusões, sem qualquer avaliação inventada. Uma comparação independente antes de escolher.',
    bullets: ['Critérios objetivos', 'Verificado, nada inventado', 'Atualizado regularmente'],
    cta: 'Ver o ranking dos seguros',
  },
  de: {
    kicker: 'Tierkrankenversicherung',
    title: 'Tierarztkosten im Ausland können die Reise ruinieren. Vorher vergleichen.',
    desc: 'Wir haben die wichtigsten Versicherer nach Leistungen, Erstattungssätzen, Wartezeiten, Preis und Ausschlüssen bewertet, ohne erfundene Bewertungen. Ein unabhängiger Vergleich vor der Wahl.',
    bullets: ['Objektive Kriterien', 'Geprüft, nichts erfunden', 'Regelmäßig aktualisiert'],
    cta: 'Zum Versicherungs-Ranking',
  },
  nl: {
    kicker: 'Dierenverzekering',
    title: 'Een dierenartsrekening in het buitenland kan je reis verpesten. Vergelijk eerst.',
    desc: 'We rangschikten de belangrijkste verzekeraars op dekking, vergoedingspercentages, wachttijden, prijs en uitsluitingen, zonder verzonnen reviews. Een onafhankelijke vergelijking voordat je kiest.',
    bullets: ['Objectieve criteria', 'Geverifieerd, niets verzonnen', 'Regelmatig bijgewerkt'],
    cta: 'Bekijk de verzekeringsranking',
  },
  it: {
    kicker: 'Assicurazione animali',
    title: 'Una fattura veterinaria all\'estero può rovinare un viaggio. Confronta prima.',
    desc: 'Abbiamo classificato i principali assicuratori per coperture, tassi di rimborso, periodi di carenza, prezzo ed esclusioni, senza alcuna recensione inventata. Un confronto indipendente prima di scegliere.',
    bullets: ['Criteri oggettivi', 'Verificato, niente di inventato', 'Aggiornato regolarmente'],
    cta: 'Vedi la classifica delle assicurazioni',
  },
}

export default function InsurancePromo({ locale }: { locale: Locale }) {
  const c = COPY[locale] ?? COPY.en
  return (
    <section className="bg-electric text-white border-b-[1.6px] border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          <div className="flex-1">
            <p className="eyebrow inline-flex items-center gap-2 text-lime mb-3">
              <IconShield className="w-4 h-4" /> {c.kicker}
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold leading-tight mb-3 max-w-3xl">{c.title}</h2>
            <p className="text-lavender text-base leading-relaxed max-w-3xl mb-5">{c.desc}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {c.bullets.map((b) => (
                <li key={b} className="inline-flex items-center gap-2 text-sm text-white/90">
                  <IconCheck className="w-4 h-4 text-lime" /> {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-shrink-0">
            <Link
              href={insuranceHref(locale)}
              className="inline-flex items-center justify-center gap-2 bg-lime text-ink font-bold px-7 py-4 rounded-full border-[1.6px] border-ink shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform text-center"
            >
              {c.cta} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
