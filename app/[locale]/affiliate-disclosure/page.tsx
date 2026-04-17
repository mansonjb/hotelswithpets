import type { Metadata } from 'next'
import { getDictionary, hasLocale, locales, type Locale } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  return {
    title: 'Affiliate Disclosure | HotelsWithPets.com',
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${SITE_URL}/${locale}/affiliate-disclosure`,
    },
  }
}

export default async function AffiliateDisclosurePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Affiliate Disclosure</h1>
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm prose prose-gray max-w-none">
          <p>
            HotelsWithPets.com participates in affiliate programmes, including the Booking.com Affiliate Partner Programme.
            This means that when you click on a hotel link and make a booking, we may receive a commission at no additional cost to you.
          </p>
          <p>
            These commissions help us run and improve this website, keeping it free for all visitors.
          </p>
          <h2>Our Editorial Independence</h2>
          <p>
            Our affiliate relationships do not influence which hotels we recommend. Hotels are selected based on their genuine pet-friendliness,
            guest ratings, and verified pet policies. We do not accept payment for featured placement.
          </p>
          <h2>Stay22 Affiliate Links</h2>
          <p>
            Some hotel links on this site use the Stay22 LetMeAllez system, which may redirect through a multi-platform search to find the best available rate across multiple booking platforms.
            This may include Booking.com, Expedia, Hotels.com, and others. We earn a commission on qualifying bookings.
          </p>
          <h2>Questions</h2>
          <p>
            If you have any questions about our affiliate relationships or how we select hotels, please visit our <a href={`/${locale}/about`}>About page</a>.
          </p>
          <p className="text-sm text-gray-500">Last updated: {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  )
}
