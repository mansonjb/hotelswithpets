import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import { PRODUCTS } from '@/data/amazon-products'
import AmazonProductCard from '@/components/AmazonProductCard'
import AmazonDisclosure from '@/components/AmazonDisclosure'

const SLUG = 'accessoires-chien'
const CAMPAIGN = 'accessoires-chien'

// FR-only page. Static params returns only `fr` so /en/, /es/, /pt/
// variants 404 (the slug is French-specific).
export async function generateStaticParams() {
  return [{ locale: 'fr' }]
}

export const metadata: Metadata = {
  title: `Accessoires pour chien : la sélection voyage HotelsWithPets (2026) | HotelsWithPets.com`,
  description: `Les accessoires testés pour partir en voyage avec son chien : gourde nomade, tapis rafraîchissant, harnais voiture, sac de transport, fontaine. Sélection mise à jour, liens directs Amazon.fr.`,
  alternates: {
    canonical: `${SITE_URL}/fr/${SLUG}`,
    languages: {
      fr: `${SITE_URL}/fr/${SLUG}`,
    },
  },
  openGraph: {
    title: 'Accessoires pour chien voyageur - la sélection HotelsWithPets',
    description: `Gourde, tapis rafraîchissant, harnais voiture, fontaine : nos accessoires testés pour partir avec son chien.`,
    type: 'article',
    url: `${SITE_URL}/fr/${SLUG}`,
    siteName: 'HotelsWithPets.com',
  },
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (locale !== 'fr') notFound()

  const dogProducts = PRODUCTS.filter(p => p.petType === 'dog' || p.petType === 'both')

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-600 via-orange-600 to-rose-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20">
          <nav className="text-sm text-white/70 mb-6">
            <Link href="/fr" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Accessoires chien</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">
            Accessoires pour chien voyageur
          </h1>
          <p className="text-lg text-amber-50 max-w-2xl">
            La sélection HotelsWithPets : ce qu&apos;on emporte vraiment en voyage avec
            son chien - gourde nomade, tapis rafraîchissant, harnais de sécurité voiture,
            fontaine, sac de transport. Tous les liens pointent vers Amazon.fr, prix mis à
            jour côté Amazon.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* Quick links to internal funnels */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="text-sm text-stone-700 mb-3 font-semibold">
            👉 Aussi utile :
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <Link href="/fr/accessoires-chien-chaleur" className="bg-white border border-amber-300 text-amber-900 px-3 py-1.5 rounded-full hover:bg-amber-100">
              Spécial canicule →
            </Link>
            <Link href="/fr/guides/road-trip-chien" className="bg-white border border-stone-300 text-stone-700 px-3 py-1.5 rounded-full hover:bg-stone-100">
              Road trip avec son chien →
            </Link>
            <Link href="/fr/guides/dog-beaches-france" className="bg-white border border-stone-300 text-stone-700 px-3 py-1.5 rounded-full hover:bg-stone-100">
              Plages canines en France →
            </Link>
            <Link href="/fr/guides/brittany-pet-friendly-road-trip" className="bg-white border border-stone-300 text-stone-700 px-3 py-1.5 rounded-full hover:bg-stone-100">
              Bretagne en 5 jours →
            </Link>
          </div>
        </section>

        {/* Products */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Notre sélection</h2>
          {dogProducts.length === 0 ? (
            <p className="text-stone-600 italic">
              Sélection en cours de constitution - revenez bientôt.
            </p>
          ) : (
            <div className="space-y-3">
              {dogProducts.map((p, i) => (
                <AmazonProductCard key={p.asin} product={p} campaign={CAMPAIGN} rank={i + 1} />
              ))}
            </div>
          )}
        </section>

        {/* Methodology */}
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-stone-900 mb-3">Notre méthode</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-3">
            Pour chaque catégorie nous prenons un produit que nous, ou des voyageurs
            réguliers avec leur chien, utilisons effectivement. Critères systématiques :
            note Amazon &gt; 4,3 / 5 sur ≥ 200 avis, marque connue dans l&apos;univers
            pet, prix raisonnable comparé aux concurrents.
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">
            Les liens sont des liens d&apos;affiliation Amazon. Le prix que vous payez
            est identique - Amazon nous reverse une petite commission sur votre achat,
            ce qui finance le travail éditorial du site (vérification des hôtels,
            rédaction des guides ville).
          </p>
        </section>

        <AmazonDisclosure />
      </div>
    </main>
  )
}
