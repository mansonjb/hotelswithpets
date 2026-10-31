import Link from 'next/link'

type Loc = 'en' | 'fr' | 'es' | 'pt' | 'de' | 'nl' | 'it'

const STR: Record<Loc, { generic: string; advertiser: string; button: string; buttonAdv: string }> = {
  en: { generic: 'A question or a correction? We read every message.', advertiser: 'A brand or an insurer? Talk to us about appearing in our rankings.', button: 'Contact us', buttonAdv: 'Advertise with us' },
  fr: { generic: 'Une question ou une correction ? Nous lisons chaque message.', advertiser: 'Une marque ou un assureur ? Parlons de votre visibilité dans nos classements.', button: 'Nous contacter', buttonAdv: 'Devenir partenaire' },
  es: { generic: '¿Una pregunta o una corrección? Leemos todos los mensajes.', advertiser: '¿Una marca o una aseguradora? Hablemos de tu visibilidad en nuestros rankings.', button: 'Contáctanos', buttonAdv: 'Anúnciate con nosotros' },
  pt: { generic: 'Uma questão ou uma correção? Lemos todas as mensagens.', advertiser: 'Uma marca ou uma seguradora? Falemos da sua visibilidade nos nossos rankings.', button: 'Contacte-nos', buttonAdv: 'Seja parceiro' },
  de: { generic: 'Eine Frage oder eine Korrektur? Wir lesen jede Nachricht.', advertiser: 'Eine Marke oder Versicherung? Sprechen wir über Ihre Sichtbarkeit in unseren Rankings.', button: 'Kontakt', buttonAdv: 'Partner werden' },
  nl: { generic: 'Een vraag of een correctie? We lezen elk bericht.', advertiser: 'Een merk of verzekeraar? Praat met ons over zichtbaarheid in onze rankings.', button: 'Contact', buttonAdv: 'Word partner' },
  it: { generic: 'Una domanda o una correzione? Leggiamo ogni messaggio.', advertiser: 'Un marchio o un assicuratore? Parliamo della tua visibilità nelle nostre classifiche.', button: 'Contattaci', buttonAdv: 'Diventa partner' },
}

/**
 * Compact contact call-out. `variant="advertiser"` targets brands/insurers
 * (monetisation capture) and deep-links to the contact form pre-qualified as
 * a partnership request; `variant="generic"` is the everyday contact prompt.
 */
export default function ContactCTA({
  locale,
  variant = 'generic',
}: {
  locale: string
  variant?: 'generic' | 'advertiser'
}) {
  const t = STR[(locale as Loc)] ?? STR.en
  const isAdv = variant === 'advertiser'
  const href = isAdv ? `/${locale}/contact?type=partenariat` : `/${locale}/contact`
  const text = isAdv ? t.advertiser : t.generic
  const label = isAdv ? t.buttonAdv : t.button

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-2xl border px-5 py-4 ${isAdv ? 'bg-sky-50 border-sky-200' : 'bg-stone-100 border-stone-200'}`}>
      <p className="text-sm text-stone-700 flex-1">{text}</p>
      <Link
        href={href}
        className={`inline-flex items-center justify-center gap-1.5 text-sm font-bold px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${isAdv ? 'bg-sky-700 text-white hover:bg-sky-800' : 'bg-stone-900 text-white hover:bg-stone-800'}`}
      >
        {label} →
      </Link>
    </div>
  )
}
