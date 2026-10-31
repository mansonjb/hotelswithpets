import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { hasLocale, locales, type Locale } from '@/app/[locale]/dictionaries'
import { SITE_URL } from '@/lib/site'
import ContactForm from '@/components/ContactForm'

const SLUG = 'contact'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const COPY: Record<Locale, { title: string; desc: string; crumb: string; lead: string }> = {
  en: { title: 'Contact us', crumb: 'Contact', desc: 'Get in touch with the HotelsWithPets.com team: partnerships, corrections, hotel questions or suggestions.', lead: 'A question, a correction, a partnership? Fill in the form below and we will reply by email. Tell us what your request is about so we can route it to the right person.' },
  fr: { title: 'Nous contacter', crumb: 'Contact', desc: 'Contactez l’équipe HotelsWithPets.com : partenariats, corrections, questions hôtels ou suggestions.', lead: 'Une question, une correction, un partenariat ? Remplissez le formulaire ci-dessous et nous vous répondrons par email. Précisez l’objet de votre demande pour qu’elle arrive à la bonne personne.' },
  es: { title: 'Contáctanos', crumb: 'Contacto', desc: 'Ponte en contacto con el equipo de HotelsWithPets.com: colaboraciones, correcciones, consultas de hoteles o sugerencias.', lead: '¿Una pregunta, una corrección, una colaboración? Rellena el formulario y te responderemos por correo. Indica el motivo de tu consulta para dirigirla a la persona adecuada.' },
  pt: { title: 'Contacte-nos', crumb: 'Contacto', desc: 'Contacte a equipa HotelsWithPets.com: parcerias, correções, questões sobre hotéis ou sugestões.', lead: 'Uma questão, uma correção, uma parceria? Preencha o formulário e responderemos por email. Indique o motivo do seu contacto para o encaminharmos à pessoa certa.' },
  de: { title: 'Kontakt', crumb: 'Kontakt', desc: 'Kontaktieren Sie das Team von HotelsWithPets.com: Partnerschaften, Korrekturen, Hotelfragen oder Vorschläge.', lead: 'Eine Frage, eine Korrektur, eine Partnerschaft? Füllen Sie das Formular aus und wir antworten per E-Mail. Geben Sie den Grund Ihrer Anfrage an, damit sie die richtige Person erreicht.' },
  nl: { title: 'Contact', crumb: 'Contact', desc: 'Neem contact op met het team van HotelsWithPets.com: partnerschappen, correcties, hotelvragen of suggesties.', lead: 'Een vraag, een correctie, een partnerschap? Vul het formulier in en we reageren per e-mail. Geef aan waar uw vraag over gaat zodat die bij de juiste persoon terechtkomt.' },
  it: { title: 'Contattaci', crumb: 'Contatti', desc: 'Contatta il team di HotelsWithPets.com: partnership, correzioni, domande sugli hotel o suggerimenti.', lead: 'Una domanda, una correzione, una partnership? Compila il modulo e ti risponderemo via email. Indica l’oggetto della tua richiesta così la indirizziamo alla persona giusta.' },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const c = COPY[locale]
  const languages: Record<string, string> = { 'x-default': `${SITE_URL}/en/${SLUG}` }
  for (const l of locales) languages[l] = `${SITE_URL}/${l}/${SLUG}`
  return {
    title: c.title,
    description: c.desc,
    alternates: { canonical: `${SITE_URL}/${locale}/${SLUG}`, languages },
    robots: { index: true, follow: true },
    openGraph: { title: c.title, description: c.desc, url: `${SITE_URL}/${locale}/${SLUG}`, siteName: 'HotelsWithPets.com', type: 'website' },
  }
}

const REQUEST_TYPES = ['partenariat', 'correction', 'hotel', 'suggestion', 'presse', 'autre'] as const

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ type?: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const c = COPY[locale]
  const { type } = await searchParams
  const defaultType = (REQUEST_TYPES as readonly string[]).includes(type ?? '')
    ? (type as (typeof REQUEST_TYPES)[number])
    : 'autre'

  return (
    <main className="min-h-screen bg-stone-50">
      <section className="bg-stone-900 text-white">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <nav className="text-sm text-white/60 mb-5">
            <Link href={`/${locale}`} className="hover:text-white">HotelsWithPets</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{c.crumb}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{c.title}</h1>
          <p className="text-stone-300 mt-3 leading-relaxed">{c.lead}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6 sm:p-8">
          <ContactForm locale={locale} defaultType={defaultType} />
        </div>
      </div>
    </main>
  )
}
