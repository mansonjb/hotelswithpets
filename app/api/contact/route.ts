import { NextResponse } from 'next/server'

/**
 * Contact form endpoint. Receives a QUALIFIED request (name, email, request
 * type, message) and emails it to contact@hotelswithpets.com via the Brevo
 * transactional API. No data is stored server-side: the email is the record.
 *
 * Setup required (one-time, by the site owner):
 *   1. Create a Brevo transactional API key and set BREVO_API_KEY in Vercel
 *      (Project → Settings → Environment Variables) and in .env.local.
 *   2. In Brevo, verify the sender contact@hotelswithpets.com (or a sender on
 *      the hotelswithpets.com domain) so transactional sends are authorised.
 * Until BREVO_API_KEY is set the endpoint returns 503 and the form shows a
 * graceful error; no submission is lost silently.
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TO = 'contact@hotelswithpets.com'
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
function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
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

  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    console.error('[contact] BREVO_API_KEY not set - submission could not be emailed')
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  const typeLabel = TYPE_LABELS[requestType]
  const subject = `[Contact HWP] ${typeLabel} - ${name}`
  const rows: Array<[string, string]> = [
    ['Type de demande', typeLabel],
    ['Nom', name],
    ['Email', email],
    ['Société', company || '-'],
    ['Langue du visiteur', locale],
  ]
  const htmlContent = `
    <h2 style="font-family:sans-serif">Nouvelle demande de contact</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
        )
        .join('')}
    </table>
    <p style="font-family:sans-serif;font-size:14px;margin-top:16px;white-space:pre-wrap">${escapeHtml(message)}</p>
  `

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'HotelsWithPets Contact', email: TO },
        to: [{ email: TO }],
        replyTo: { email, name },
        subject,
        htmlContent,
      }),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error('[contact] Brevo send failed', res.status, detail.slice(0, 300))
      return NextResponse.json({ error: 'send_failed' }, { status: 502 })
    }
  } catch (e) {
    console.error('[contact] Brevo request error', e)
    return NextResponse.json({ error: 'send_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
