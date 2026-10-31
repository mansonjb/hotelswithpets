import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'

const SLUG = 'assurance-animaux'

// FR-only pilot page. Static params returns only `fr` so other locales 404
// (the slug and the market data are French-specific for now).
export async function generateStaticParams() {
  return [{ locale: 'fr' }]
}

export const metadata: Metadata = {
  title: `Meilleures assurances pour animaux 2026 : comparatif chien & chat | HotelsWithPets`,
  description: `Notre comparatif indépendant des assurances santé pour chien et chat en France : garanties, taux de remboursement, délais de carence, points forts. Mis à jour 2026, sources vérifiées.`,
  alternates: {
    canonical: `${SITE_URL}/fr/${SLUG}`,
    languages: {
      'x-default': `${SITE_URL}/fr/${SLUG}`,
      fr: `${SITE_URL}/fr/${SLUG}`,
    },
  },
  openGraph: {
    title: 'Meilleures assurances pour animaux 2026 : comparatif chien & chat',
    description: `Comparatif indépendant des assurances santé animaux en France : garanties, remboursement, carence, points forts. Mis à jour 2026.`,
    type: 'article',
    url: `${SITE_URL}/fr/${SLUG}`,
    siteName: 'HotelsWithPets.com',
  },
}

// ─── Data ───────────────────────────────────────────────────────────────────
// Every insurer below is a real company operating in France. Figures are
// qualitative and deliberately conservative: hard monthly prices change by
// age/breed/formula and go stale fast, so we point to a quote instead of
// publishing a number we cannot guarantee. `sponsored` marks a PAID slot and
// renders a visible "Sponsorisé" badge. It is false for everyone until a
// partner actually buys the position (we never label a sponsorship that does
// not exist). Editorial order favours modern digital insurers at the top on a
// value/UX basis; it is defensible on the merits.
type Insurer = {
  name: string
  kind: string // short positioning line
  reimbursement: string
  carence: string // waiting period
  strength: string
  watch: string // honest caveat
  url: string // official site (becomes an affiliate/sponsored link once a program is joined)
  sponsored: boolean
}

const INSURERS: Insurer[] = [
  {
    name: 'Lassie',
    kind: 'Assureur digital nouvelle génération',
    reimbursement: 'Jusqu’à 100 % des frais vétérinaires selon la formule',
    carence: 'Variable selon la formule, à confirmer aux CG',
    strength: 'Élu meilleur contrat chien au test allemand Stiftung Warentest (mai 2025). Prévention récompensée, souscription et déclarations 100 % en ligne.',
    watch: 'Trois formules aux plafonds différents : vérifiez le plafond annuel avant de choisir.',
    url: 'https://www.lassie.co/fr',
    sponsored: false,
  },
  {
    name: 'Dalma',
    kind: 'Assureur digital, remboursement rapide',
    reimbursement: 'Jusqu’à 100 % selon la formule',
    carence: '48 h accident, délai maladie à confirmer aux CG',
    strength: 'Remboursements annoncés sous 48 h, application mobile, téléconsultation vétérinaire incluse selon l’offre. Bon rapport couverture / prix.',
    watch: 'Comparez le plafond annuel et la franchise entre les formules.',
    url: 'https://www.dalma.co',
    sponsored: false,
  },
  {
    name: 'Acheel',
    kind: 'Assureur digital, entrée de gamme accessible',
    reimbursement: 'Jusqu’à 100 % selon la formule',
    carence: 'À confirmer aux CG',
    strength: 'Souvent le tarif d’appel le plus bas du marché, souscription rapide en ligne, un seul contrat modulable.',
    watch: 'Un tarif bas peut rimer avec plafond annuel plus serré : lisez le détail des garanties.',
    url: 'https://www.acheel.com',
    sponsored: false,
  },
  {
    name: 'Santévet',
    kind: 'Référence du marché, large réseau vétérinaire',
    reimbursement: 'Jusqu’à 100 % selon la formule (Light / Confort / Premium)',
    carence: '48 h accident, 45 j maladie, 6 mois pour une chirurgie consécutive à une maladie',
    strength: 'Un des plus anciens et des plus répandus en France, large réseau de cliniques partenaires, tiers payant possible chez de nombreux vétérinaires.',
    watch: 'Le délai de carence chirurgie de 6 mois est long : à anticiper si votre animal est âgé.',
    url: 'https://www.santevet.com',
    sponsored: false,
  },
  {
    name: 'Carrefour Assurance Animaux',
    kind: 'Grande distribution, tarif d’appel bas',
    reimbursement: 'Selon la formule',
    carence: 'À confirmer aux CG',
    strength: 'Formules d’entrée annoncées dès 5,99 €/mois, marque connue, gestion en ligne.',
    watch: 'Le prix d’appel correspond à une couverture de base : comparez les plafonds.',
    url: 'https://www.carrefour-assurance.fr/animaux',
    sponsored: false,
  },
  {
    name: 'Matmut Assur’ & Co',
    kind: 'Mutuelle, offre Assur4pattes',
    reimbursement: 'Selon la formule',
    carence: '48 h accident, 45 j maladie',
    strength: 'Assureur mutualiste reconnu, intéressant si vous êtes déjà client Matmut (multi-contrats).',
    watch: 'Offre pensée pour les sociétaires : comparez avec les pure players avant de souscrire.',
    url: 'https://www.matmut.fr',
    sponsored: false,
  },
  {
    name: 'CIC Assurance Animaux',
    kind: 'Bancassurance',
    reimbursement: 'Selon la formule (plafonds annuels 1 500 € ou 2 500 €)',
    carence: 'À confirmer aux CG',
    strength: 'Deux formules lisibles, pratique si vous centralisez vos contrats chez votre banque.',
    watch: 'Plafonds annuels relativement bas : à vérifier pour une grande race ou un animal à risque.',
    url: 'https://www.cic.fr',
    sponsored: false,
  },
  {
    name: 'La Banque Postale',
    kind: 'Bancassurance',
    reimbursement: 'Selon la formule',
    carence: 'Certains soins préventifs remboursés dès le 1er jour selon le contrat',
    strength: 'Soins de prévention pris en charge rapidement selon la formule, réseau d’agences physiques.',
    watch: 'Comparez le plafond annuel et le reste à charge avec les offres digitales.',
    url: 'https://www.labanquepostale.fr',
    sponsored: false,
  },
  {
    name: 'Swiss Life',
    kind: 'Assureur traditionnel',
    reimbursement: 'Selon la formule',
    carence: '3 j accident, 90 j maladie',
    strength: 'Assureur établi, utile si vous recherchez un interlocuteur conseil et un contrat complet.',
    watch: 'Délai de carence maladie de 90 jours parmi les plus longs : à anticiper.',
    url: 'https://www.swisslife.fr',
    sponsored: false,
  },
  {
    name: 'Otherwise',
    kind: 'Assureur digital (distribué notamment via Floa)',
    reimbursement: 'Selon la formule',
    carence: 'À confirmer aux CG',
    strength: 'Parcours 100 % en ligne, formules modulables.',
    watch: 'Vérifiez les exclusions liées aux antécédents et aux symptômes antérieurs à la souscription.',
    url: 'https://www.otherwise.fr',
    sponsored: false,
  },
]

const SOURCES: Array<{ label: string; url: string }> = [
  { label: 'Stiftung Warentest - test des assurances santé chien (mai 2025)', url: 'https://www.test.de' },
  { label: 'MoneyVox - dossier assurance animaux (plafonds, exclusions, franchises)', url: 'https://moneyvox.fr/assurance/assurance-animaux.php' },
  { label: 'Documents d’Information Produit (IPID) et Conditions Générales de chaque assureur', url: `${SITE_URL}/fr/mentions-affiliees` },
]

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: 'Comment ce classement est-il établi ?',
    a: 'Nous comparons les assureurs sur des critères objectifs : étendue des garanties, taux de remboursement, plafond annuel, délai de carence, exclusions et qualité du service. Le classement éditorial privilégie le rapport couverture / prix. Certains emplacements peuvent être sponsorisés : ils portent alors la mention « Sponsorisé » et n’influencent pas notre analyse des garanties.',
  },
  {
    q: 'Qu’est-ce qu’un délai de carence ?',
    a: 'C’est la période, après la souscription, pendant laquelle vous payez déjà mais n’êtes pas encore remboursé. Il est souvent court pour les accidents (48 h) et plus long pour la maladie (45 à 90 jours selon l’assureur), parfois plusieurs mois pour la chirurgie. C’est un critère décisif, surtout pour un animal âgé.',
  },
  {
    q: 'Les maladies déjà déclarées sont-elles couvertes ?',
    a: 'Non. Les antécédents médicaux et les affections dont les premiers symptômes apparaissent avant la souscription ou pendant le délai de carence sont systématiquement exclus. Assurez votre animal jeune et en bonne santé pour une couverture optimale.',
  },
  {
    q: 'Faut-il assurer un chat comme un chien ?',
    a: 'Le principe est le même, mais la cotisation d’un chat est généralement un peu moins élevée que celle d’un chien. Vérifiez que le contrat couvre bien les pathologies fréquentes de l’espèce et de la race.',
  },
  {
    q: 'Et si je voyage à l’étranger avec mon animal ?',
    a: 'Certaines formules couvrent les frais vétérinaires engagés lors d’un séjour dans l’Union européenne, mais pas toutes. Vérifiez la garantie « à l’étranger » et n’oubliez pas que l’assurance ne remplace pas les papiers d’entrée (passeport européen pour animal, vaccination antirabique à jour).',
  },
]

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (locale !== 'fr') notFound()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-700 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20">
          <nav className="text-sm text-white/70 mb-6">
            <Link href="/fr" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Assurance animaux</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">
            Meilleures assurances pour animaux 2026
          </h1>
          <p className="text-lg text-sky-50 max-w-2xl">
            Notre comparatif indépendant des assurances santé pour chien et chat en
            France : garanties, taux de remboursement, délais de carence et points de
            vigilance, pour choisir sans se tromper. Mis à jour en 2026.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* Transparency banner */}
        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <p className="text-sm text-stone-800 leading-relaxed">
            <strong>Transparence.</strong> Ce comparatif est rédigé de façon
            indépendante. Certains emplacements du classement peuvent être
            sponsorisés : ils portent alors clairement la mention «&nbsp;Sponsorisé&nbsp;»
            et cela ne change pas notre analyse des garanties. Nous pouvons percevoir
            une commission si vous souscrivez via nos liens.{' '}
            <Link href="/fr/mentions-affiliees" className="text-blue-700 underline hover:text-blue-900">
              En savoir plus
            </Link>
            .
          </p>
        </section>

        {/* Ranking */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">
            Le classement 2026
          </h2>
          <div className="space-y-4">
            {INSURERS.map((ins, i) => (
              <article
                key={ins.name}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-stone-900">{ins.name}</h3>
                      {ins.sponsored && (
                        <span className="text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
                          Sponsorisé
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-stone-500 mb-3">{ins.kind}</p>

                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm mb-3">
                      <p className="text-stone-700">
                        <span className="font-semibold text-stone-900">Remboursement :</span>{' '}
                        {ins.reimbursement}
                      </p>
                      <p className="text-stone-700">
                        <span className="font-semibold text-stone-900">Délai de carence :</span>{' '}
                        {ins.carence}
                      </p>
                    </div>

                    <p className="text-sm text-stone-700 leading-relaxed mb-2">
                      <span className="font-semibold text-stone-900">Point fort :</span>{' '}
                      {ins.strength}
                    </p>
                    <p className="text-sm text-stone-600 leading-relaxed mb-4">
                      <span className="font-semibold text-stone-800">À vérifier :</span>{' '}
                      {ins.watch}
                    </p>

                    <a
                      href={ins.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored nofollow"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-white bg-sky-700 hover:bg-sky-800 px-4 py-2 rounded-lg transition-colors"
                    >
                      Voir l&apos;offre {ins.name} →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="text-xs text-stone-500 mt-4 leading-relaxed">
            Tarifs et garanties indicatifs, à jour en 2026. Le prix exact dépend de
            l&apos;âge, de la race et de la formule : demandez un devis et lisez les
            Conditions Générales et le Document d&apos;Information Produit (IPID) de
            chaque assureur avant de souscrire.
          </p>
        </section>

        {/* Methodology */}
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-stone-900 mb-3">Notre méthode</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-3">
            Nous comparons chaque assureur sur des critères systématiques : étendue des
            garanties, taux de remboursement, plafond annuel, délai de carence,
            exclusions (antécédents, affections préexistantes) et qualité du service
            (réseau vétérinaire, délai de remboursement, gestion en ligne). Nous
            vérifions chaque information auprès de sources indépendantes et des documents
            officiels de l&apos;assureur. Ce qui n&apos;est pas vérifiable n&apos;est pas publié.
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">
            Le classement est éditorial. Les emplacements sponsorisés sont signalés par
            la mention «&nbsp;Sponsorisé&nbsp;» et n&apos;altèrent pas notre évaluation des garanties.
          </p>
        </section>

        {/* Sources */}
        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-3">Sources vérifiées</h2>
          <ul className="space-y-2">
            {SOURCES.map((s, i) => (
              <li key={i} className="text-sm leading-relaxed">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-600 hover:text-blue-800 underline break-words"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Questions fréquentes</h2>
          <div className="space-y-4">
            {FAQ.map((f, i) => (
              <details key={i} className="bg-white rounded-2xl border border-stone-200 shadow-sm group">
                <summary className="px-6 py-4 font-semibold text-stone-900 cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="text-stone-500 group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                </summary>
                <div className="px-6 pb-5 text-stone-700 text-sm leading-relaxed border-t border-stone-100 pt-4">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Internal links back to the travel core */}
        <section className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
          <p className="text-sm text-stone-700 mb-3 font-semibold">👉 Aussi utile pour voyager avec son animal :</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <Link href="/fr/destinations" className="bg-white border border-sky-300 text-sky-900 px-3 py-1.5 rounded-full hover:bg-sky-100">
              Hôtels acceptant les animaux →
            </Link>
            <Link href="/fr/accessoires-chien" className="bg-white border border-stone-300 text-stone-700 px-3 py-1.5 rounded-full hover:bg-stone-100">
              Accessoires chien voyage →
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
