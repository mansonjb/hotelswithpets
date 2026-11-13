import { NextResponse } from 'next/server'

/**
 * Contact form endpoint. Receives a QUALIFIED request (name, email, request
 * type, message) and emails it to contact@hotelswithpets.com via Web3Forms,
 * a free form-to-email service (no SMTP account, no domain verification).
 * No data is stored server-side: the email is the record.
 *
 * Setup required (one-time, by the site owner, ~1 min, no Brevo needed):
 *   1. Go to https://web3forms.com, enter contact@hotelswithpets.com and get
 *      an Access Key by email (free tier: 250 submissions/month).
 *   2. Set WEB3FORMS_ACCESS_KEY in Vercel (Project -> Settings -> Environment
 *      Variables) and in .env.local, then redeploy.
 * Until WEB3FORMS_ACCESS_KEY is set the endpoint returns 503 and the form shows
 * a graceful message inviting the visitor to email us directly.
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const REQUEST_TYPES = ['partenariat', 'correction', 'hotel', 'suggestion', 'presse', 'autre'] as const
const TYPE_LABELS: Record<string, string> = {
  partenariat: 'Partenariat / annonceur',
  correction: "Signalement d'erreur",
  hotel: 'Question hôtel / destination',
  suggestion: 'Suggestion',
  presse: 'Presse / média',
  autre: 'Autre',
}

function clean(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  // Honeypot: real users never fill this hidden field. Silently accept bots.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true })

  const name = clean(body.name, 120)
  const email = clean(body.email, 160)
  const message = clean(body.message, 5000)
  const company = clean(body.company, 160)
  const locale = clean(body.locale, 5) || 'en'
  const requestType = REQUEST_TYPES.includes(body.requestType as (typeof REQUEST_TYPES)[number])
    ? (body.requestType as string)
    : 'autre'

  if (!name || !email || !email.includes('@') || !message) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 422 })
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY
  if (!accessKey) {
    console.error('[contact] WEB3FORMS_ACCESS_KEY not set - submission could not be emailed')
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  const typeLabel = TYPE_LABELS[requestType]
  const subject = `[Contact HWP] ${typeLabel} - ${name}`

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: 'HotelsWithPets Contact',
        replyto: email,
        'Type de demande': typeLabel,
        Nom: name,
        Email: email,
        'Société': company || '-',
        Langue: locale,
        message,
      }),
    })
    const data = (await res.json().catch(() => ({}))) as { success?: boolean }
    if (!res.ok || !data.success) {
      console.error('[contact] Web3Forms send failed', res.status, JSON.stringify(data).slice(0, 300))
      return NextResponse.json({ error: 'send_failed' }, { status: 502 })
    }
  } catch (e) {
    console.error('[contact] Web3Forms request error', e)
    return NextResponse.json({ error: 'send_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
