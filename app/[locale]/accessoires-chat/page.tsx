import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import { PRODUCTS } from '@/data/amazon-products'
import AmazonProductCard from '@/components/AmazonProductCard'
import AmazonDisclosure from '@/components/AmazonDisclosure'

const SLUG = 'accessoires-chat'
const CAMPAIGN = 'accessoires-chat'

export async function generateStaticParams() {
  return [{ locale: 'fr' }]
}

export const metadata: Metadata = {
  title: `Accessoires pour chat voyageur : sélection HotelsWithPets (2026) | HotelsWithPets.com`,
  description: `Tout ce qu'il faut pour partir en voyage avec son chat : sac de transport, fontaine à eau, harnais ajusté, litière de voyage, anti-stress. Sélection mise à jour, liens Amazon.fr.`,
  alternates: {
    canonical: `${SITE_URL}/fr/${SLUG}`,
    languages: { fr: `${SITE_URL}/fr/${SLUG}` },
  },
  openGraph: {
    title: 'Accessoires pour chat voyageur - la sélection HotelsWithPets',
    description: `Sac de transport, fontaine, harnais, litière, anti-stress : nos accessoires testés pour partir avec son chat.`,
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

  const catProducts = PRODUCTS.filter(p => p.petType === 'cat' || p.petType === 'both')

  return (
    <main className="min-h-screen bg-stone-50">
      <section className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20">
          <nav className="text-sm text-white/70 mb-6">
            <Link href="/fr" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Accessoires chat</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">
            Accessoires pour chat voyageur
          </h1>
          <p className="text-lg text-fuchsia-50 max-w-2xl">
            La sélection HotelsWithPets pour partir l&apos;esprit tranquille avec son
            chat : sac de transport homologué cabine, fontaine à eau, harnais
            ajustable, litière de voyage compacte, diffuseurs anti-stress.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <section className="bg-fuchsia-50 border border-fuchsia-200 rounded-2xl p-5">
          <p className="text-sm text-stone-700 mb-3 font-semibold">👉 Aussi utile :</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <Link href="/fr/categories/cat-friendly" className="bg-white border border-fuchsia-300 text-fuchsia-900 px-3 py-1.5 rounded-full hover:bg-fuchsia-100">
              Hôtels qui acceptent les chats →
            </Link>
            <Link href="/fr/guides/avion-animal" className="bg-white border border-stone-300 text-stone-700 px-3 py-1.5 rounded-full hover:bg-stone-100">
              Prendre l&apos;avion avec son chat →
            </Link>
            <Link href="/fr/guides/train-avec-chien" className="bg-white border border-stone-300 text-stone-700 px-3 py-1.5 rounded-full hover:bg-stone-100">
              Voyager en train →
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Notre sélection</h2>
          {catProducts.length === 0 ? (
            <p className="text-stone-600 italic">
              Sélection chat en cours de constitution - envoyez-moi les URLs Amazon des
              produits que vous utilisez et je les ajoute. Pour l&apos;instant la page
              affiche seulement les produits multi-espèces (gourde nomade, etc.).
            </p>
          ) : (
            <div className="space-y-3">
              {catProducts.map((p, i) => (
                <AmazonProductCard key={p.asin} product={p} campaign={CAMPAIGN} rank={i + 1} />
              ))}
            </div>
          )}
        </section>

        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-stone-900 mb-3">Pourquoi cette page existe</h2>
          <p className="text-sm text-stone-700 leading-relaxed">
            Les chats voyagent moins que les chiens, mais quand ils voyagent, le matériel
            compte plus encore : un sac homologué cabine pas conforme = refus d&apos;embarquement,
            une fontaine bruyante = chat stressé. On a sélectionné ce qu&apos;on
            utilise réellement à domicile ou en déplacement.
          </p>
        </section>

        <AmazonDisclosure />
      </div>
    </main>
  )
}
