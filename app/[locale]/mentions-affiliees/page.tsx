import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'

const SLUG = 'mentions-affiliees'

export async function generateStaticParams() {
  return [{ locale: 'fr' }]
}

export const metadata: Metadata = {
  title: `Mentions affiliées et transparence | HotelsWithPets.com`,
  description: `Comment HotelsWithPets.com utilise les liens d'affiliation Amazon et Stay22 pour financer son contenu éditorial. Transparence totale sur nos rémunérations.`,
  alternates: {
    canonical: `${SITE_URL}/fr/${SLUG}`,
    languages: { fr: `${SITE_URL}/fr/${SLUG}` },
  },
  robots: { index: true, follow: true },
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (locale !== 'fr') notFound()

  return (
    <main className="min-h-screen bg-stone-50">
      <section className="bg-stone-900 text-white">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <nav className="text-sm text-white/60 mb-5">
            <Link href="/fr" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Mentions affiliées</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Mentions affiliées et transparence
          </h1>
          <p className="text-stone-300 mt-3">
            Comment on finance le site, et ce que ça change (ou pas) pour vous.
          </p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 py-10 space-y-8 text-stone-800 leading-relaxed">
        <section className="bg-white border border-stone-200 rounded-2xl p-6 space-y-3">
          <h2 className="text-xl font-bold text-stone-900">Programme Partenaires Amazon EU</h2>
          <p>
            HotelsWithPets.com participe au Programme Partenaires d&apos;Amazon EU,
            un programme d&apos;affiliation conçu pour permettre à des sites de
            percevoir une rémunération grâce à la création de liens vers
            Amazon.fr.
          </p>
          <p>
            Les liens vers Amazon présents sur nos pages accessoires
            (<Link href="/fr/accessoires-chien" className="text-amber-700 underline">chien</Link>,{' '}
            <Link href="/fr/accessoires-chat" className="text-amber-700 underline">chat</Link>,{' '}
            <Link href="/fr/accessoires-chien-chaleur" className="text-amber-700 underline">canicule</Link>)
            sont sponsorisés : si vous achetez un produit après avoir cliqué,
            nous touchons une petite commission sans surcoût pour vous. Cela
            ne change rien à notre sélection éditoriale - nous ne recommandons
            que des produits que nous trouvons réellement utiles pour voyager
            avec son animal.
          </p>
          <p className="text-sm text-stone-600">
            Identifiant partenaire Amazon : <code className="bg-stone-100 px-1.5 py-0.5 rounded">mansonjb-21</code>
          </p>
        </section>

        <section className="bg-white border border-stone-200 rounded-2xl p-6 space-y-3">
          <h2 className="text-xl font-bold text-stone-900">Liens hôteliers Stay22 / Booking</h2>
          <p>
            Les liens de réservation d&apos;hôtel sur HotelsWithPets.com passent
            par Stay22, un méta-moteur qui compare les prix sur Booking,
            Expedia, Hotels.com et les sites officiels des hôtels. Quand vous
            réservez via un de ces liens, le marchand reverse une commission
            à Stay22 qui en partage une partie avec nous.
          </p>
          <p>
            Vous payez exactement le même prix que si vous aviez tapé l&apos;URL
            directement dans votre navigateur. La commission finance le travail
            de vérification des hôtels (politique pet-friendly réelle, frais
            cachés, conditions d&apos;accueil) et la rédaction des guides
            ville en quatre langues.
          </p>
        </section>

        <section className="bg-white border border-stone-200 rounded-2xl p-6 space-y-3">
          <h2 className="text-xl font-bold text-stone-900">Notre engagement éditorial</h2>
          <p>
            Nous n&apos;acceptons ni argent ni produits gratuits en échange
            d&apos;une critique positive. Aucun hôtel ne paie pour figurer dans
            nos guides. Aucun fabricant ne paie pour être recommandé dans nos
            sélections accessoires.
          </p>
          <p>
            Les seuls critères d&apos;inclusion sont : (1) on l&apos;a testé,
            ou (2) on connaît quelqu&apos;un de confiance qui l&apos;a testé
            longuement, ou (3) la fiche produit Amazon a une note &gt; 4,3 / 5
            sur au moins 200 avis ET la marque est connue dans l&apos;univers
            pet. Si un produit nous déçoit, on le retire ou on ajoute un
            avertissement dans la description.
          </p>
        </section>

        <section className="bg-white border border-stone-200 rounded-2xl p-6 space-y-3">
          <h2 className="text-xl font-bold text-stone-900">Contact</h2>
          <p>
            Une question, une suggestion de produit, un signalement d&apos;erreur ?
            Écrivez-nous : <a href="mailto:hello@hotelswithpets.com" className="text-amber-700 underline">hello@hotelswithpets.com</a>
          </p>
        </section>
      </article>
    </main>
  )
}
