'use client'

import { useState } from 'react'

type Loc = 'en' | 'fr' | 'es' | 'pt' | 'de' | 'nl' | 'it'

const TYPES = ['partenariat', 'correction', 'hotel', 'suggestion', 'presse', 'autre'] as const

const STR: Record<Loc, {
  name: string
  email: string
  company: string
  companyHint: string
  requestType: string
  options: Record<(typeof TYPES)[number], string>
  message: string
  submit: string
  sending: string
  successTitle: string
  successBody: string
  errorGeneric: string
  errorConfig: string
  errorFields: string
  privacy: string
  required: string
}> = {
  en: {
    name: 'Your name', email: 'Your email', company: 'Company (optional)', companyHint: 'If you represent a brand or insurer',
    requestType: 'What is your request about?',
    options: { partenariat: 'Partnership / advertising', correction: 'Report an error', hotel: 'Hotel / destination question', suggestion: 'Suggestion', presse: 'Press / media', autre: 'Other' },
    message: 'Your message', submit: 'Send message', sending: 'Sending…',
    successTitle: 'Message sent', successBody: 'Thank you. We have received your request and will reply to the email you provided.',
    errorGeneric: 'Something went wrong. Please try again, or email us directly.', errorConfig: 'The form is being set up. Please email us directly in the meantime.',
    errorFields: 'Please fill in your name, a valid email and a message.',
    privacy: 'We only use your details to answer you. Nothing is shared with third parties.', required: 'required',
  },
  fr: {
    name: 'Votre nom', email: 'Votre email', company: 'Société (facultatif)', companyHint: 'Si vous représentez une marque ou un assureur',
    requestType: 'Quel est l’objet de votre demande ?',
    options: { partenariat: 'Partenariat / annonceur', correction: 'Signalement d’erreur', hotel: 'Question hôtel / destination', suggestion: 'Suggestion', presse: 'Presse / média', autre: 'Autre' },
    message: 'Votre message', submit: 'Envoyer le message', sending: 'Envoi…',
    successTitle: 'Message envoyé', successBody: 'Merci. Nous avons bien reçu votre demande et vous répondrons à l’adresse indiquée.',
    errorGeneric: 'Une erreur est survenue. Réessayez, ou écrivez-nous directement.', errorConfig: 'Le formulaire est en cours de configuration. Écrivez-nous directement en attendant.',
    errorFields: 'Indiquez votre nom, un email valide et un message.',
    privacy: 'Vos informations servent uniquement à vous répondre. Rien n’est transmis à des tiers.', required: 'obligatoire',
  },
  es: {
    name: 'Tu nombre', email: 'Tu correo', company: 'Empresa (opcional)', companyHint: 'Si representas a una marca o aseguradora',
    requestType: '¿Cuál es el motivo de tu consulta?',
    options: { partenariat: 'Colaboración / publicidad', correction: 'Informar de un error', hotel: 'Consulta hotel / destino', suggestion: 'Sugerencia', presse: 'Prensa / medios', autre: 'Otro' },
    message: 'Tu mensaje', submit: 'Enviar mensaje', sending: 'Enviando…',
    successTitle: 'Mensaje enviado', successBody: 'Gracias. Hemos recibido tu consulta y te responderemos al correo indicado.',
    errorGeneric: 'Algo salió mal. Inténtalo de nuevo o escríbenos directamente.', errorConfig: 'El formulario se está configurando. Escríbenos directamente mientras tanto.',
    errorFields: 'Indica tu nombre, un correo válido y un mensaje.',
    privacy: 'Usamos tus datos solo para responderte. No se comparten con terceros.', required: 'obligatorio',
  },
  pt: {
    name: 'O seu nome', email: 'O seu email', company: 'Empresa (opcional)', companyHint: 'Se representa uma marca ou seguradora',
    requestType: 'Qual é o motivo do seu contacto?',
    options: { partenariat: 'Parceria / publicidade', correction: 'Reportar um erro', hotel: 'Questão hotel / destino', suggestion: 'Sugestão', presse: 'Imprensa / media', autre: 'Outro' },
    message: 'A sua mensagem', submit: 'Enviar mensagem', sending: 'A enviar…',
    successTitle: 'Mensagem enviada', successBody: 'Obrigado. Recebemos o seu pedido e responderemos ao email indicado.',
    errorGeneric: 'Algo correu mal. Tente novamente ou escreva-nos diretamente.', errorConfig: 'O formulário está a ser configurado. Escreva-nos diretamente entretanto.',
    errorFields: 'Indique o seu nome, um email válido e uma mensagem.',
    privacy: 'Usamos os seus dados apenas para lhe responder. Nada é partilhado com terceiros.', required: 'obrigatório',
  },
  de: {
    name: 'Ihr Name', email: 'Ihre E-Mail', company: 'Unternehmen (optional)', companyHint: 'Falls Sie eine Marke oder Versicherung vertreten',
    requestType: 'Worum geht es bei Ihrer Anfrage?',
    options: { partenariat: 'Partnerschaft / Werbung', correction: 'Fehler melden', hotel: 'Frage zu Hotel / Reiseziel', suggestion: 'Vorschlag', presse: 'Presse / Medien', autre: 'Sonstiges' },
    message: 'Ihre Nachricht', submit: 'Nachricht senden', sending: 'Senden…',
    successTitle: 'Nachricht gesendet', successBody: 'Vielen Dank. Wir haben Ihre Anfrage erhalten und antworten an die angegebene E-Mail.',
    errorGeneric: 'Etwas ist schiefgelaufen. Bitte erneut versuchen oder uns direkt schreiben.', errorConfig: 'Das Formular wird gerade eingerichtet. Bitte schreiben Sie uns vorerst direkt.',
    errorFields: 'Bitte Name, eine gültige E-Mail und eine Nachricht angeben.',
    privacy: 'Wir nutzen Ihre Daten nur, um Ihnen zu antworten. Nichts wird an Dritte weitergegeben.', required: 'erforderlich',
  },
  nl: {
    name: 'Uw naam', email: 'Uw e-mail', company: 'Bedrijf (optioneel)', companyHint: 'Als u een merk of verzekeraar vertegenwoordigt',
    requestType: 'Waar gaat uw vraag over?',
    options: { partenariat: 'Partnerschap / adverteren', correction: 'Een fout melden', hotel: 'Vraag over hotel / bestemming', suggestion: 'Suggestie', presse: 'Pers / media', autre: 'Overig' },
    message: 'Uw bericht', submit: 'Bericht versturen', sending: 'Versturen…',
    successTitle: 'Bericht verstuurd', successBody: 'Bedankt. We hebben uw vraag ontvangen en reageren op het opgegeven e-mailadres.',
    errorGeneric: 'Er ging iets mis. Probeer opnieuw of mail ons rechtstreeks.', errorConfig: 'Het formulier wordt ingesteld. Mail ons voorlopig rechtstreeks.',
    errorFields: 'Vul uw naam, een geldig e-mailadres en een bericht in.',
    privacy: 'We gebruiken uw gegevens alleen om u te antwoorden. Niets wordt met derden gedeeld.', required: 'verplicht',
  },
  it: {
    name: 'Il tuo nome', email: 'La tua email', company: 'Azienda (facoltativo)', companyHint: 'Se rappresenti un marchio o un assicuratore',
    requestType: 'Qual è l’oggetto della tua richiesta?',
    options: { partenariat: 'Partnership / pubblicità', correction: 'Segnalare un errore', hotel: 'Domanda hotel / destinazione', suggestion: 'Suggerimento', presse: 'Stampa / media', autre: 'Altro' },
    message: 'Il tuo messaggio', submit: 'Invia messaggio', sending: 'Invio…',
    successTitle: 'Messaggio inviato', successBody: 'Grazie. Abbiamo ricevuto la tua richiesta e ti risponderemo all’email indicata.',
    errorGeneric: 'Qualcosa è andato storto. Riprova o scrivici direttamente.', errorConfig: 'Il modulo è in fase di configurazione. Scrivici direttamente nel frattempo.',
    errorFields: 'Inserisci il tuo nome, un’email valida e un messaggio.',
    privacy: 'Usiamo i tuoi dati solo per risponderti. Nulla viene condiviso con terzi.', required: 'obbligatorio',
  },
}

export default function ContactForm({ locale, defaultType = 'autre' }: { locale: string; defaultType?: (typeof TYPES)[number] }) {
  const t = STR[(locale as Loc)] ?? STR.en
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error' | 'config' | 'fields'>('idle')
  // Seeded from the server-resolved ?type= (advertiser call-outs link with it),
  // so server and client render the same value with no hydration mismatch.
  const [reqType, setReqType] = useState<(typeof TYPES)[number]>(defaultType)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    if (!data.name || !data.email || !String(data.email).includes('@') || !data.message) {
      setStatus('fields')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      })
      if (res.ok) {
        setStatus('ok')
        form.reset()
      } else if (res.status === 503) {
        setStatus('config')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
        <div className="text-3xl mb-2" aria-hidden="true">✓</div>
        <h2 className="text-lg font-bold text-emerald-900 mb-1">{t.successTitle}</h2>
        <p className="text-sm text-emerald-800">{t.successBody}</p>
      </div>
    )
  }

  const inputCls = 'w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600'
  const labelCls = 'block text-sm font-semibold text-stone-800 mb-1.5'

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Honeypot (hidden from users) */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="c-name" className={labelCls}>{t.name} <span className="text-rose-500 font-normal text-xs">({t.required})</span></label>
          <input id="c-name" name="name" type="text" required maxLength={120} className={inputCls} />
        </div>
        <div>
          <label htmlFor="c-email" className={labelCls}>{t.email} <span className="text-rose-500 font-normal text-xs">({t.required})</span></label>
          <input id="c-email" name="email" type="email" required maxLength={160} className={inputCls} />
        </div>
      </div>

      <div>
        <label htmlFor="c-company" className={labelCls}>{t.company}</label>
        <input id="c-company" name="company" type="text" maxLength={160} placeholder={t.companyHint} className={inputCls} />
      </div>

      <div>
        <label htmlFor="c-type" className={labelCls}>{t.requestType}</label>
        <select id="c-type" name="requestType" value={reqType} onChange={(e) => setReqType(e.target.value as (typeof TYPES)[number])} className={inputCls}>
          {TYPES.map((v) => (<option key={v} value={v}>{t.options[v]}</option>))}
        </select>
      </div>

      <div>
        <label htmlFor="c-message" className={labelCls}>{t.message} <span className="text-rose-500 font-normal text-xs">({t.required})</span></label>
        <textarea id="c-message" name="message" required maxLength={5000} rows={6} className={inputCls} />
      </div>

      {status === 'error' && <p className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">{t.errorGeneric}</p>}
      {status === 'config' && <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">{t.errorConfig} <a href="mailto:contact@hotelswithpets.com" className="underline font-semibold">contact@hotelswithpets.com</a></p>}
      {status === 'fields' && <p className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">{t.errorFields}</p>}

      <button type="submit" disabled={status === 'sending'} className="inline-flex items-center justify-center gap-2 bg-sky-700 text-white font-bold text-sm px-6 py-3 rounded-lg hover:bg-sky-800 disabled:opacity-60 transition-colors">
        {status === 'sending' ? t.sending : t.submit}
      </button>
      <p className="text-xs text-stone-500">{t.privacy}</p>
    </form>
  )
}
