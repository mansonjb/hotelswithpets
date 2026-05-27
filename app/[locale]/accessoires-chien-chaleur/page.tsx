import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import { productsHeatSafety } from '@/data/amazon-products'
import AmazonProductCard from '@/components/AmazonProductCard'
import AmazonDisclosure from '@/components/AmazonDisclosure'

const SLUG = 'accessoires-chien-chaleur'
const CAMPAIGN = 'heat-guide-chien'

export async function generateStaticParams() {
  return [{ locale: 'fr' }]
}

export const metadata: Metadata = {
  title: `Meilleurs accessoires pour chien quand il fait chaud (2026) | HotelsWithPets.com`,
  description: `Canicule et balades estivales : gourde nomade, tapis rafraîchissant, gilet, bandana, brumisateur, gamelle pliante. Sélection testée et conseils anti-chaleur pour son chien.`,
  alternates: {
    canonical: `${SITE_URL}/fr/${SLUG}`,
    languages: { fr: `${SITE_URL}/fr/${SLUG}` },
  },
  openGraph: {
    title: 'Canicule et son chien : les accessoires qui changent tout',
    description: `Gourde, tapis rafraîchissant, gilet, bandana : la sélection HotelsWithPets pour l'été.`,
    type: 'article',
    url: `${SITE_URL}/fr/${SLUG}`,
    siteName: 'HotelsWithPets.com',
  },
}

const HEAT_TIPS = [
  {
    title: `Sortir à la bonne heure`,
    body: `Pas de balade entre 11 h et 18 h en été. Au-dessus de 25 °C l'asphalte peut atteindre 50 °C et brûler les coussinets en moins d'une minute. Test : posez votre main au sol 7 secondes - si vous ne tenez pas, votre chien non plus.`,
  },
  {
    title: `Hydratation : toutes les 30 min`,
    body: `Un chien qui halète sèche très vite. Emportez une gourde nomade (avec gamelle intégrée pour boire en marchant) et proposez de l'eau toutes les 30 minutes pendant une balade chaude, même s'il n'a pas l'air d'avoir soif.`,
  },
  {
    title: `Repérer le coup de chaleur`,
    body: `Halètement excessif, salivation épaisse, gencives rouge vif ou bleuâtres, vomissements, démarche instable : urgence vétérinaire. Mouillez le chien à l'eau tiède (pas glacée) au niveau du ventre, des pattes et des aisselles, puis filez chez le véto.`,
  },
  {
    title: `Jamais en voiture stationnée`,
    body: `À 25 °C extérieur, l'habitacle dépasse 45 °C en 20 minutes, même avec une vitre entrouverte. C'est non négociable et c'est un délit en France (art. R655-1 + L521-1 Code pénal - jusqu'à 30 000 € d'amende et 2 ans de prison).`,
  },
]

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (locale !== 'fr') notFound()

  const products = productsHeatSafety()

  // Schema.org Article + FAQPage
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Meilleurs accessoires pour chien quand il fait chaud (2026)',
    description: `Gourde, tapis rafraîchissant, gilet, bandana et conseils anti-chaleur pour son chien.`,
    datePublished: '2026-05-27',
    inLanguage: 'fr',
    author: { '@type': 'Organization', name: 'HotelsWithPets.com', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets.com', url: SITE_URL },
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="bg-gradient-to-br from-orange-500 via-rose-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20">
          <nav className="text-sm text-white/70 mb-6">
            <Link href="/fr" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/fr/accessoires-chien" className="hover:text-white">Accessoires chien</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Canicule</span>
          </nav>
          <div className="text-sm font-semibold uppercase tracking-widest text-orange-100 mb-3">
            Spécial canicule 🔥
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">
            Les meilleurs accessoires pour chien quand il fait chaud
          </h1>
          <p className="text-lg text-orange-50 max-w-2xl">
            Gourde nomade, tapis rafraîchissant, gilet ventilé, bandana mouillé, gamelle
            pliante : ce qui fait vraiment la différence entre un chien qui survit l&apos;été
            et un chien qui en profite.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {/* 4 essential tips */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">
            Les 4 règles canicule à connaître avant tout
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HEAT_TIPS.map((tip, i) => (
              <div key={i} className="bg-white rounded-2xl border border-stone-200 p-5">
                <h3 className="font-bold text-stone-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-stone-700 leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Notre sélection chaleur</h2>
          <p className="text-sm text-stone-600 mb-5">
            Produits testés et liens directs Amazon.fr. Mis à jour pour l&apos;été 2026.
          </p>
          {products.length === 0 ? (
            <p className="text-stone-600 italic">
              Sélection en cours d&apos;enrichissement - pour l&apos;instant seuls les
              produits voyage multi-saisons s&apos;affichent. Envoyez-moi les URLs Amazon
              des tapis rafraîchissants / gilets / bandanas que vous voulez référencer
              et je les ajoute en quelques minutes.
            </p>
          ) : (
            <div className="space-y-3">
              {products.map((p, i) => (
                <AmazonProductCard key={p.asin} product={p} campaign={CAMPAIGN} rank={i + 1} />
              ))}
            </div>
          )}
        </section>

        {/* Cross-links */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="text-sm text-stone-700 mb-3 font-semibold">
            👉 À lire aussi pour bien préparer l&apos;été :
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <Link href="/fr/guides/dog-beaches-france" className="bg-white border border-amber-300 text-amber-900 px-3 py-1.5 rounded-full hover:bg-amber-100">
              Les plages canines en France →
            </Link>
            <Link href="/fr/guides/road-trip-chien" className="bg-white border border-stone-300 text-stone-700 px-3 py-1.5 rounded-full hover:bg-stone-100">
              Road trip en voiture →
            </Link>
            <Link href="/fr/guides/brittany-pet-friendly-road-trip" className="bg-white border border-stone-300 text-stone-700 px-3 py-1.5 rounded-full hover:bg-stone-100">
              Bretagne en 5 jours →
            </Link>
            <Link href="/fr/accessoires-chien" className="bg-white border border-stone-300 text-stone-700 px-3 py-1.5 rounded-full hover:bg-stone-100">
              Tous les accessoires chien →
            </Link>
          </div>
        </section>

        <AmazonDisclosure />
      </div>
    </main>
  )
}
