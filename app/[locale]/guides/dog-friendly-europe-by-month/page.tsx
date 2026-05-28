import { redirect } from 'next/navigation'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'] as const

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

// Bare /guides/dog-friendly-europe-by-month has no month segment, so it would
// 404. Redirect it to the current month's planner (the Guides hub links here
// without a month). This keeps a single clean hub URL that always lands on a
// useful, in-season page.
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const currentMonth = MONTHS[new Date().getMonth()]
  redirect(`/${locale}/guides/dog-friendly-europe-by-month/${currentMonth}`)
}
