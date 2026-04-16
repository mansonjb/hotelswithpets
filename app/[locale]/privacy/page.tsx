import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  return {
    title: 'Privacy Policy | HotelsWithPets.com',
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${SITE_URL}/${locale}/privacy`,
    },
  }
}

const content: Record<string, { title: string; sections: Array<{ h: string; p: string | string[] }> }> = {
  en: {
    title: 'Privacy Policy',
    sections: [
      {
        h: 'Overview',
        p: 'HotelsWithPets.com ("we", "us") is a hotel discovery website. This policy explains what limited data we process when you visit our site.',
      },
      {
        h: 'Data we collect',
        p: [
          'We do not collect personal data directly. We do not have account registration, newsletter signup, or contact forms that store your data.',
          'When you click a hotel link to Booking.com or other booking platforms, you leave our site and are subject to their privacy policies.',
        ],
      },
      {
        h: 'Third-party services',
        p: [
          'Booking.com: Hotel data and booking links. See booking.com/content/privacy.en-gb.html for their privacy policy.',
          'Stay22: Map embeds on destination pages. Stay22 may set cookies for their service.',
          'Vercel: Our hosting provider. Vercel may log access requests. See vercel.com/legal/privacy-policy.',
        ],
      },
      {
        h: 'Cookies',
        p: 'Our site does not set first-party cookies. Third-party embeds (Stay22 maps) may set their own cookies. You can block these via your browser settings.',
      },
      {
        h: 'Analytics',
        p: 'We may use privacy-respecting analytics that do not track individual users or use cookies (e.g. aggregate page view counts). No personal data is collected.',
      },
      {
        h: 'Your rights',
        p: 'As we do not collect personal data, there is no data to access, correct, or delete. If you have questions, see our About page for contact information.',
      },
      {
        h: 'Changes',
        p: 'This policy may be updated periodically. Continued use of the site constitutes acceptance of the current policy.',
      },
    ],
  },
  fr: {
    title: 'Politique de Confidentialité',
    sections: [
      {
        h: 'Aperçu',
        p: 'HotelsWithPets.com est un site de découverte d\'hôtels. Cette politique explique les données limitées que nous traitons lorsque vous visitez notre site.',
      },
      {
        h: 'Données collectées',
        p: [
          'Nous ne collectons pas de données personnelles directement. Il n\'y a pas d\'inscription, d\'abonnement newsletter ni de formulaire de contact qui stocke vos données.',
          'Lorsque vous cliquez sur un lien vers Booking.com ou d\'autres plateformes, vous quittez notre site et êtes soumis à leurs politiques de confidentialité.',
        ],
      },
      {
        h: 'Services tiers',
        p: [
          'Booking.com : Données hôtelières et liens de réservation.',
          'Stay22 : Cartes interactives sur les pages de destination.',
          'Vercel : Notre hébergeur.',
        ],
      },
      {
        h: 'Cookies',
        p: 'Notre site ne dépose pas de cookies propriétaires. Les intégrations tierces (cartes Stay22) peuvent déposer leurs propres cookies.',
      },
      {
        h: 'Analytique',
        p: 'Nous pouvons utiliser des outils d\'analyse respectueux de la vie privée, sans suivi individuel ni cookies.',
      },
      {
        h: 'Vos droits',
        p: 'Nous ne collectant pas de données personnelles, il n\'y a rien à accéder, corriger ou supprimer.',
      },
      {
        h: 'Modifications',
        p: 'Cette politique peut être mise à jour périodiquement.',
      },
    ],
  },
  es: {
    title: 'Política de Privacidad',
    sections: [
      {
        h: 'Descripción general',
        p: 'HotelsWithPets.com es un sitio de descubrimiento de hoteles. Esta política explica los datos limitados que procesamos cuando visitas nuestro sitio.',
      },
      {
        h: 'Datos que recopilamos',
        p: [
          'No recopilamos datos personales directamente. No tenemos registro de cuentas, suscripción a newsletter ni formularios de contacto que almacenen tus datos.',
          'Cuando haces clic en un enlace a Booking.com u otras plataformas, abandonas nuestro sitio y estás sujeto a sus políticas de privacidad.',
        ],
      },
      {
        h: 'Servicios de terceros',
        p: [
          'Booking.com: Datos de hoteles y enlaces de reserva.',
          'Stay22: Mapas interactivos en páginas de destino.',
          'Vercel: Nuestro proveedor de alojamiento.',
        ],
      },
      {
        h: 'Cookies',
        p: 'Nuestro sitio no establece cookies propias. Las integraciones de terceros (mapas Stay22) pueden establecer sus propias cookies.',
      },
      {
        h: 'Análisis',
        p: 'Podemos usar herramientas de análisis que respetan la privacidad, sin seguimiento individual ni cookies.',
      },
      {
        h: 'Tus derechos',
        p: 'Como no recopilamos datos personales, no hay datos que acceder, corregir o eliminar.',
      },
      {
        h: 'Cambios',
        p: 'Esta política puede actualizarse periódicamente.',
      },
    ],
  },
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const c = content[locale] ?? content.en

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">{c.title}</h1>
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-8">
          {c.sections.map((section) => (
            <section key={section.h}>
              <h2 className="text-lg font-bold text-gray-900 mb-2">{section.h}</h2>
              {Array.isArray(section.p) ? (
                <ul className="list-disc list-inside space-y-2">
                  {section.p.map((line, i) => (
                    <li key={i} className="text-gray-600 text-sm leading-relaxed">{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 text-sm leading-relaxed">{section.p}</p>
              )}
            </section>
          ))}
          <p className="text-xs text-gray-400">Last updated: {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  )
}
