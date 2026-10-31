import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import BrandLogo from '@/components/BrandLogo'

const SLUG = 'assurance-animaux'
const UPDATED = 'octobre 2026'

// FR-only pilot page. Static params returns only `fr` so other locales 404
// (the slug and the market data are French-specific for now).
export async function generateStaticParams() {
  return [{ locale: 'fr' }]
}

export const metadata: Metadata = {
  title: `Meilleures assurances pour animaux 2026 : comparatif chien & chat`,
  description: `Comparatif indépendant des assurances santé chien et chat en France : tableau des garanties, taux de remboursement, délais de carence, prix, exclusions, guide pour choisir et FAQ. 10 assureurs analysés, mis à jour ${UPDATED}.`,
  alternates: {
    canonical: `${SITE_URL}/fr/${SLUG}`,
    languages: {
      'x-default': `${SITE_URL}/fr/${SLUG}`,
      fr: `${SITE_URL}/fr/${SLUG}`,
    },
  },
  openGraph: {
    title: 'Meilleures assurances pour animaux 2026 : comparatif chien & chat',
    description: `Tableau comparatif des 10 principaux assureurs animaux en France : garanties, remboursement, carence, prix, exclusions. Indépendant, mis à jour ${UPDATED}.`,
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
// value/UX basis; it is defensible on the merits. `domain` powers the logo.
type Insurer = {
  name: string
  domain: string
  initials: string
  color: string
  kind: string
  verdict: string
  reimbursement: string
  carence: string
  priceFrom?: string
  covered: string[]
  strength: string
  watch: string
  idealFor: string
  url: string
  sponsored: boolean
}

const INSURERS: Insurer[] = [
  {
    name: 'Lassie', domain: 'lassie.co', initials: 'La', color: '#0d9488',
    kind: 'Assureur digital nouvelle génération', verdict: 'Le plus complet',
    reimbursement: 'Jusqu’à 100 %', carence: 'Variable selon la formule',
    covered: ['Accidents et maladies', 'Chirurgie et hospitalisation', 'Prévention récompensée'],
    strength: 'Élu meilleur contrat chien au test allemand Stiftung Warentest (mai 2025). Souscription et déclarations 100 % en ligne, programme de prévention qui réduit la cotisation.',
    watch: 'Trois formules aux plafonds annuels différents : vérifiez le plafond avant de choisir.',
    idealFor: 'Ceux qui veulent une couverture complète et un suivi digital.',
    url: 'https://www.lassie.co/fr', sponsored: false,
  },
  {
    name: 'Dalma', domain: 'dalma.co', initials: 'Da', color: '#7c3aed',
    kind: 'Assureur digital, remboursement rapide', verdict: 'Remboursé en 48 h',
    reimbursement: 'Jusqu’à 100 %', carence: '48 h accident, délai maladie à confirmer',
    covered: ['Accidents et maladies', 'Téléconsultation vétérinaire', 'Appli de suivi des remboursements'],
    strength: 'Remboursements annoncés sous 48 h, application mobile, téléconsultation vétérinaire selon l’offre. Très bon rapport couverture / prix.',
    watch: 'Comparez le plafond annuel et la franchise entre les formules.',
    idealFor: 'Ceux qui veulent un remboursement rapide et tout piloter depuis une appli.',
    url: 'https://www.dalma.co', sponsored: false,
  },
  {
    name: 'Acheel', domain: 'acheel.com', initials: 'Ac', color: '#2563eb',
    kind: 'Assureur digital, entrée de gamme', verdict: 'Petit budget',
    reimbursement: 'Jusqu’à 100 %', carence: 'À confirmer aux CG',
    covered: ['Accidents et maladies', 'Contrat unique modulable', 'Souscription rapide'],
    strength: 'Souvent le tarif d’appel le plus bas du marché, un seul contrat que l’on module selon son budget.',
    watch: 'Un tarif bas peut rimer avec plafond annuel plus serré : lisez le détail des garanties.',
    idealFor: 'Les budgets serrés qui veulent une protection de base.',
    url: 'https://www.acheel.com', sponsored: false,
  },
  {
    name: 'Santévet', domain: 'santevet.com', initials: 'Sa', color: '#ea580c',
    kind: 'Référence du marché, large réseau', verdict: 'Réseau vétérinaire',
    reimbursement: 'Jusqu’à 100 % (Light / Confort / Premium)', carence: '48 h accident, 45 j maladie, 6 mois chirurgie',
    covered: ['Accidents et maladies', 'Large réseau de cliniques', 'Tiers payant possible'],
    strength: 'Un des plus anciens et des plus répandus en France. Large réseau de cliniques partenaires et tiers payant possible chez de nombreux vétérinaires (vous n’avancez pas les frais).',
    watch: 'Le délai de carence chirurgie de 6 mois est long : à anticiper pour un animal âgé.',
    idealFor: 'Ceux qui veulent éviter d’avancer les frais chez le vétérinaire.',
    url: 'https://www.santevet.com', sponsored: false,
  },
  {
    name: 'Carrefour', domain: 'carrefour-assurance.fr', initials: 'Ca', color: '#1d4ed8',
    kind: 'Grande distribution', verdict: 'Tarif d’appel bas',
    reimbursement: 'Selon la formule', carence: 'À confirmer aux CG', priceFrom: 'dès 5,99 €/mois',
    covered: ['Formules d’entrée accessibles', 'Marque connue', 'Gestion en ligne'],
    strength: 'Formules d’entrée annoncées dès 5,99 €/mois, marque rassurante, parcours simple.',
    watch: 'Le prix d’appel correspond à une couverture de base : comparez les plafonds.',
    idealFor: 'Une première assurance à petit prix.',
    url: 'https://www.carrefour-assurance.fr/animaux', sponsored: false,
  },
  {
    name: 'Matmut', domain: 'matmut.fr', initials: 'Ma', color: '#e11d48',
    kind: 'Mutuelle, offre Assur4pattes', verdict: 'Mutualiste',
    reimbursement: 'Selon la formule', carence: '48 h accident, 45 j maladie',
    covered: ['Accidents et maladies', 'Multi-contrats sociétaire', 'Agences physiques'],
    strength: 'Assureur mutualiste reconnu, intéressant si vous êtes déjà sociétaire Matmut (réductions multi-contrats).',
    watch: 'Offre pensée pour les sociétaires : comparez avec les pure players avant de souscrire.',
    idealFor: 'Les sociétaires Matmut qui regroupent leurs contrats.',
    url: 'https://www.matmut.fr', sponsored: false,
  },
  {
    name: 'CIC', domain: 'cic.fr', initials: 'CIC', color: '#334155',
    kind: 'Bancassurance', verdict: 'Via votre banque',
    reimbursement: 'Plafonds annuels 1 500 € ou 2 500 €', carence: 'À confirmer aux CG',
    covered: ['Deux formules lisibles', 'Gestion avec votre conseiller'],
    strength: 'Deux formules simples, pratique si vous centralisez vos contrats chez votre banque.',
    watch: 'Plafonds annuels relativement bas : à vérifier pour une grande race ou un animal à risque.',
    idealFor: 'Les clients qui veulent tout gérer avec leur banque.',
    url: 'https://www.cic.fr', sponsored: false,
  },
  {
    name: 'La Banque Postale', domain: 'labanquepostale.fr', initials: 'LBP', color: '#4338ca',
    kind: 'Bancassurance', verdict: 'Prévention dès J1',
    reimbursement: 'Selon la formule', carence: 'Certains soins préventifs dès le 1er jour',
    covered: ['Accidents et maladies', 'Soins de prévention', 'Réseau d’agences'],
    strength: 'Soins de prévention pris en charge rapidement selon la formule, accompagnement en agence.',
    watch: 'Comparez le plafond annuel et le reste à charge avec les offres digitales.',
    idealFor: 'Ceux qui veulent un interlocuteur en agence.',
    url: 'https://www.labanquepostale.fr', sponsored: false,
  },
  {
    name: 'Swiss Life', domain: 'swisslife.fr', initials: 'SL', color: '#b91c1c',
    kind: 'Assureur traditionnel', verdict: 'Conseil complet',
    reimbursement: 'Selon la formule', carence: '3 j accident, 90 j maladie',
    covered: ['Accidents et maladies', 'Conseil personnalisé', 'Contrat complet'],
    strength: 'Assureur établi, utile si vous cherchez un interlocuteur conseil et un contrat complet.',
    watch: 'Délai de carence maladie de 90 jours parmi les plus longs : à anticiper.',
    idealFor: 'Ceux qui privilégient le conseil et un contrat haut de gamme.',
    url: 'https://www.swisslife.fr', sponsored: false,
  },
  {
    name: 'Otherwise', domain: 'otherwise.fr', initials: 'Ot', color: '#059669',
    kind: 'Assureur digital (distribué via Floa)', verdict: '100 % digital',
    reimbursement: 'Selon la formule', carence: 'À confirmer aux CG',
    covered: ['Accidents et maladies', 'Parcours 100 % en ligne', 'Formules modulables'],
    strength: 'Parcours entièrement en ligne, formules modulables, distribution adossée à Floa.',
    watch: 'Vérifiez les exclusions liées aux antécédents et symptômes antérieurs à la souscription.',
    idealFor: 'Ceux qui veulent souscrire vite, 100 % en ligne.',
    url: 'https://www.otherwise.fr', sponsored: false,
  },
]

const BEST_FOR: Array<{ icon: string; label: string; pick: string; why: string }> = [
  { icon: '🏆', label: 'Meilleur choix global', pick: 'Lassie', why: 'Couverture complète, primé au test indépendant allemand, prévention récompensée.' },
  { icon: '⚡', label: 'Remboursement le plus rapide', pick: 'Dalma', why: 'Remboursements annoncés sous 48 h, pilotés depuis l’appli.' },
  { icon: '💶', label: 'Plus accessible', pick: 'Carrefour', why: 'Formules d’entrée dès 5,99 €/mois pour une première protection.' },
  { icon: '🏥', label: 'Sans avancer les frais', pick: 'Santévet', why: 'Tiers payant possible chez de nombreux vétérinaires grâce à son réseau.' },
  { icon: '📱', label: 'Le plus simple en ligne', pick: 'Acheel', why: 'Un seul contrat modulable, souscription rapide et tarif d’appel bas.' },
  { icon: '🏦', label: 'Via votre banque', pick: 'CIC / La Banque Postale', why: 'Pratique si vous préférez centraliser vos contrats et un conseiller.' },
]

const CHOOSE_STEPS: Array<{ title: string; text: string }> = [
  { title: 'Définissez votre budget mensuel', text: 'Les cotisations vont d’environ 5 € à plus de 50 € par mois. Fixez une fourchette avant de comparer : cela élimine déjà la moitié des offres.' },
  { title: 'Regardez le plafond annuel', text: 'C’est le montant maximal remboursé par an (souvent 1 500 € à 4 000 €+). Une seule opération lourde peut l’atteindre : visez haut si votre animal est à risque.' },
  { title: 'Vérifiez les délais de carence', text: 'Rien n’est remboursé pendant cette période. Court pour l’accident (48 h), plus long pour la maladie (45 à 90 j) et parfois plusieurs mois pour la chirurgie.' },
  { title: 'Lisez les exclusions', text: 'Les affections préexistantes sont toujours exclues. Vérifiez aussi les maladies héréditaires, les races écartées et les soins non couverts.' },
  { title: 'Comparez le taux de remboursement et la franchise', text: 'Un taux de 100 % avec une franchise élevée peut revenir plus cher qu’un taux de 80 % sans franchise. Regardez le reste à charge réel.' },
]

const COVERED: string[] = [
  'Consultations liées à un accident ou une maladie',
  'Chirurgie et hospitalisation',
  'Examens (radio, échographie, analyses)',
  'Médicaments prescrits sur ordonnance',
  'Soins de prévention selon la formule (vaccins, vermifuge, détartrage)',
]
const EXCLUDED: string[] = [
  'Affections préexistantes ou symptômes apparus avant la souscription',
  'Soins de convenance (certaines stérilisations hors forfait, soins esthétiques)',
  'Portées et saillies, sauf garantie spécifique',
  'Certaines maladies héréditaires selon le contrat',
  'Frais engagés pendant le délai de carence',
]

const REIMBURSE_STEPS: Array<{ title: string; text: string }> = [
  { title: 'Vous consultez le vétérinaire', text: 'Vous réglez la consultation et récupérez la feuille de soins (ou la facture détaillée).' },
  { title: 'Vous envoyez le justificatif', text: 'Via l’appli ou votre espace client, en quelques minutes. Les assureurs digitaux acceptent la photo de la feuille de soins.' },
  { title: 'L’assureur rembourse', text: 'Vous êtes remboursé du taux prévu (50 à 100 %), déduction faite de la franchise, dans la limite du plafond annuel.' },
  { title: 'Ou tiers payant', text: 'Chez certains assureurs à réseau (comme Santévet), le vétérinaire partenaire est payé directement : vous n’avancez que le reste à charge.' },
]

const PROFILE_ROWS: Array<{ profile: string; need: string; suggestion: string }> = [
  { profile: 'Chiot ou chaton', need: 'Assurer tôt pour un tarif bas et zéro exclusion', suggestion: 'Lassie, Dalma ou Acheel' },
  { profile: 'Animal âgé', need: 'Vérifier l’âge limite d’adhésion et les carences', suggestion: 'Santévet, Swiss Life (contrats établis)' },
  { profile: 'Grande race ou à risque', need: 'Plafond annuel élevé, taux de remboursement fort', suggestion: 'Lassie ou Santévet (plafonds larges)' },
  { profile: 'Petit budget', need: 'Cotisation minimale, couverture de base', suggestion: 'Carrefour ou Acheel' },
  { profile: 'Chat d’intérieur', need: 'Formule allégée, accidents et maladies courantes', suggestion: 'Dalma ou Lassie' },
]

const MISTAKES: string[] = [
  'Attendre que l’animal soit malade : les affections déjà déclarées ne sont jamais couvertes.',
  'Choisir sur le seul prix mensuel sans regarder le plafond annuel ni la franchise.',
  'Oublier le délai de carence et croire être couvert dès le premier jour.',
  'Ne pas lire les exclusions (maladies héréditaires, races écartées, soins de convenance).',
  'Sous-estimer le plafond pour une grande race, alors qu’une opération peut tout consommer.',
]

const GLOSSARY: Array<{ term: string; def: string }> = [
  { term: 'Délai de carence', def: 'Période après la souscription pendant laquelle vous cotisez déjà mais n’êtes pas encore remboursé. Court pour les accidents (souvent 48 h), plus long pour la maladie (45 à 90 jours), parfois plusieurs mois pour la chirurgie.' },
  { term: 'Taux de remboursement', def: 'Pourcentage des frais vétérinaires pris en charge, généralement de 50 % à 100 % selon la formule.' },
  { term: 'Plafond annuel', def: 'Montant maximal remboursé sur une année, souvent de 1 500 € à plus de 4 000 €. Au-delà, les frais restent à votre charge.' },
  { term: 'Franchise', def: 'Part des frais qui reste à votre charge à chaque soin ou chaque année, même après remboursement.' },
  { term: 'Affection préexistante', def: 'Maladie déjà déclarée ou dont les premiers symptômes sont apparus avant la souscription. Elle est systématiquement exclue.' },
  { term: 'Responsabilité civile (RC)', def: 'Garantie qui couvre les dommages causés par votre animal à autrui. En France elle est souvent déjà incluse dans l’assurance habitation ; en Espagne elle est obligatoire pour les chiens.' },
  { term: 'Tiers payant', def: 'Système où l’assureur règle directement le vétérinaire partenaire : vous n’avancez que la part restant à votre charge.' },
  { term: 'Forfait prévention', def: 'Enveloppe annuelle dédiée aux soins non liés à la maladie (vaccins, vermifuge, détartrage, stérilisation selon le contrat).' },
  { term: 'Questionnaire de santé', def: 'Déclaration de l’état de santé de l’animal à la souscription. Toute omission peut entraîner un refus de remboursement.' },
]

const PRICE_ROWS: Array<{ profile: string; range: string; note: string }> = [
  { profile: 'Responsabilité civile seule', range: 'Quelques € / mois', note: 'Souvent déjà incluse dans l’assurance habitation en France.' },
  { profile: 'Formule santé de base', range: '~ 12 à 20 € / mois', note: 'Accidents et maladies, plafond et remboursement limités.' },
  { profile: 'Formule complète', range: '~ 25 à 50 € / mois', note: 'Remboursement élevé, plafond large, prévention. Varie fortement avec l’âge et la race.' },
  { profile: 'Entrée de gamme', range: 'dès ~ 5 à 6 € / mois', note: 'Couverture minimale : à comparer de près avant de souscrire.' },
]

const VET_COSTS: Array<{ act: string; cost: string }> = [
  { act: 'Consultation simple', cost: '30 à 60 €' },
  { act: 'Radiographie', cost: '60 à 150 €' },
  { act: 'Opération du ligament croisé', cost: '1 000 à 2 500 €' },
  { act: 'Chirurgie lourde (occlusion, tumeur)', cost: '1 500 à 3 000 €+' },
]

const FAQ: Array<{ q: string; a: string }> = [
  { q: 'Quelle est la meilleure assurance pour animaux en 2026 ?', a: 'Il n’existe pas de meilleure assurance universelle : tout dépend de l’âge, de la race et de votre budget. Pour une couverture complète, Lassie se distingue (primé au test indépendant allemand). Pour un remboursement rapide, Dalma. Pour un petit budget, Carrefour ou Acheel. Pour éviter d’avancer les frais, Santévet et son tiers payant.' },
  { q: 'Combien coûte une assurance pour chien ou chat ?', a: 'Comptez environ 12 à 20 € par mois pour une formule de base et 25 à 50 € pour une formule complète. Les offres d’entrée de gamme démarrent autour de 5 à 6 € par mois. Le tarif dépend surtout de l’âge, de la race et du niveau de garantie. Un chat coûte généralement un peu moins cher qu’un chien.' },
  { q: 'Qu’est-ce qu’un délai de carence ?', a: 'C’est la période, après la souscription, pendant laquelle vous payez déjà mais n’êtes pas encore remboursé. Il est souvent court pour les accidents (48 h) et plus long pour la maladie (45 à 90 jours), parfois plusieurs mois pour la chirurgie.' },
  { q: 'Les maladies déjà déclarées sont-elles couvertes ?', a: 'Non. Les antécédents médicaux et les affections dont les premiers symptômes apparaissent avant la souscription ou pendant le délai de carence sont systématiquement exclus. Assurez votre animal jeune et en bonne santé.' },
  { q: 'À quel âge assurer son animal ?', a: 'Le plus tôt possible. Plus l’animal est jeune, moins la cotisation est élevée et moins le risque d’exclusion pour affection préexistante est grand. Certains assureurs fixent un âge limite d’adhésion : vérifiez-le avant de souscrire.' },
  { q: 'Peut-on assurer plusieurs animaux ?', a: 'Oui. La plupart des assureurs proposent une réduction multi-animaux lorsque vous couvrez plusieurs chiens ou chats sur le même compte. Demandez le détail de la remise avant de souscrire.' },
  { q: 'La stérilisation est-elle remboursée ?', a: 'Pas au titre de la maladie : c’est un soin de convenance. Elle peut en revanche être prise en charge via un forfait prévention, lorsque la formule en inclut un.' },
  { q: 'Peut-on résilier facilement son assurance animal ?', a: 'Oui. Après la première année, le contrat est en général résiliable à tout moment, et sinon à l’échéance annuelle avec un préavis. Vérifiez les conditions de résiliation dans vos CG.' },
  { q: 'Et si je voyage à l’étranger avec mon animal ?', a: 'Certaines formules couvrent les frais vétérinaires engagés lors d’un séjour dans l’Union européenne, mais pas toutes. Vérifiez la garantie « à l’étranger ». L’assurance ne remplace pas les papiers d’entrée : passeport européen pour animal et vaccination antirabique à jour restent obligatoires.' },
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
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Meilleures assurances pour animaux 2026',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: INSURERS.length,
    itemListElement: INSURERS.map((ins, i) => ({ '@type': 'ListItem', position: i + 1, name: ins.name, url: ins.url })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Meilleures assurances pour animaux 2026 : comparatif chien & chat',
    inLanguage: 'fr',
    datePublished: '2026-10-31',
    dateModified: '2026-10-31',
    author: { '@type': 'Person', name: 'Jean-Baptiste Manson', jobTitle: 'Founder & Editor', url: `${SITE_URL}/fr/about` },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets.com', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/fr/${SLUG}`,
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-800 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <nav className="text-sm text-white/70 mb-6">
            <Link href="/fr" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Assurance animaux</span>
          </nav>
          <span className="inline-block text-xs font-semibold tracking-wide uppercase bg-white/15 border border-white/20 rounded-full px-3 py-1 mb-5">
            Comparatif indépendant · mis à jour {UPDATED}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-5 max-w-3xl">
            Meilleures assurances pour animaux 2026
          </h1>
          <p className="text-lg text-sky-50 max-w-2xl mb-8">
            Le guide complet des assurances santé pour chien et chat en France :
            garanties, taux de remboursement, délais de carence, prix et exclusions des
            10 principaux assureurs, plus notre méthode pour choisir sans se tromper.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-sky-100">
            <span><strong className="text-white text-lg">10</strong> assureurs comparés</span>
            <span><strong className="text-white text-lg">6</strong> critères objectifs</span>
            <span><strong className="text-white text-lg">0</strong> avis inventé, tout vérifié</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        {/* ── Transparency banner ── */}
        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <p className="text-sm text-stone-800 leading-relaxed">
            <strong>Transparence.</strong> Ce comparatif est rédigé de façon indépendante.
            Certains emplacements du classement peuvent être sponsorisés : ils portent alors
            clairement la mention «&nbsp;Sponsorisé&nbsp;» et cela ne change pas notre analyse des
            garanties. Nous pouvons percevoir une commission si vous souscrivez via nos liens.{' '}
            <Link href="/fr/mentions-affiliees" className="text-blue-700 underline hover:text-blue-900">En savoir plus</Link>.
          </p>
        </section>

        {/* ── Intro ── */}
        <section className="prose-none">
          <p className="text-stone-700 leading-relaxed mb-4">
            En France, une minorité de chiens et de chats sont assurés, bien loin des taux
            observés au Royaume-Uni ou en Suède. Pourtant, les frais vétérinaires grimpent et
            une seule opération peut coûter plus cher qu’une année entière de cotisations.
            L’assurance santé animale sert exactement à cela : étaler un risque imprévisible
            sur une cotisation mensuelle prévisible.
          </p>
          <p className="text-stone-700 leading-relaxed">
            Le marché s’est transformé avec l’arrivée d’assureurs 100 % digitaux (Lassie,
            Dalma, Acheel) qui remboursent vite et se souscrivent en quelques minutes, face aux
            acteurs établis (Santévet, mutuelles, bancassurances). Voici notre comparatif complet
            pour s’y retrouver.
          </p>
        </section>

        {/* ── Verdict / best-for ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">En bref : le meilleur selon votre besoin</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BEST_FOR.map((b) => (
              <div key={b.label} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
                <div className="text-2xl mb-2" aria-hidden="true">{b.icon}</div>
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1">{b.label}</p>
                <p className="text-lg font-bold text-stone-900 mb-1">{b.pick}</p>
                <p className="text-sm text-stone-600 leading-relaxed">{b.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Comparison table ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Le tableau comparatif 2026</h2>
          <p className="text-sm text-stone-600 mb-5">Les 10 principaux assureurs animaux en France, classés par notre analyse éditoriale du rapport couverture / prix.</p>
          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
            <table className="w-full text-sm min-w-[760px] bg-white">
              <thead className="bg-stone-100 text-stone-700">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold w-8">#</th>
                  <th className="text-left px-4 py-3 font-semibold">Assureur</th>
                  <th className="text-left px-4 py-3 font-semibold">Points forts</th>
                  <th className="text-left px-4 py-3 font-semibold">Remboursement</th>
                  <th className="text-left px-4 py-3 font-semibold">Délai de carence</th>
                </tr>
              </thead>
              <tbody>
                {INSURERS.map((ins, i) => (
                  <tr key={ins.name} className="border-t border-stone-100 align-top hover:bg-stone-50">
                    <td className="px-4 py-4 font-bold text-stone-400">{i + 1}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <BrandLogo domain={ins.domain} name={ins.name} initials={ins.initials} color={ins.color} size={36} />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-stone-900">{ins.name}</span>
                            {ins.sponsored && (<span className="text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.5 rounded-full">Sponsorisé</span>)}
                          </div>
                          <span className="text-xs font-medium text-sky-700">{ins.verdict}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-stone-600">{ins.covered.join(' · ')}</td>
                    <td className="px-4 py-4 text-stone-700">
                      {ins.reimbursement}
                      {ins.priceFrom && <div className="text-xs text-emerald-700 font-semibold mt-1">{ins.priceFrom}</div>}
                    </td>
                    <td className="px-4 py-4 text-stone-600">{ins.carence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-stone-500 mt-3">Données indicatives à jour en {UPDATED}. Le prix exact dépend de l’âge, de la race et de la formule : demandez un devis et lisez les CG et l’IPID avant de souscrire.</p>
        </section>

        {/* ── Detailed ranking cards ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Le classement détaillé</h2>
          <div className="space-y-4">
            {INSURERS.map((ins, i) => (
              <article key={ins.name} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center flex-shrink-0 gap-1">
                    <span className="text-xs font-bold text-stone-400">#{i + 1}</span>
                    <BrandLogo domain={ins.domain} name={ins.name} initials={ins.initials} color={ins.color} size={48} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <h3 className="text-lg font-bold text-stone-900">{ins.name}</h3>
                      <span className="text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-full">{ins.verdict}</span>
                      {ins.sponsored && (<span className="text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">Sponsorisé</span>)}
                    </div>
                    <p className="text-sm text-stone-500 mb-3">{ins.kind}</p>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm mb-3">
                      <p className="text-stone-700"><span className="font-semibold text-stone-900">Remboursement :</span> {ins.reimbursement}</p>
                      <p className="text-stone-700"><span className="font-semibold text-stone-900">Carence :</span> {ins.carence}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {ins.covered.map((c) => (<span key={c} className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-full">✓ {c}</span>))}
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed mb-1.5"><span className="font-semibold text-stone-900">Point fort :</span> {ins.strength}</p>
                    <p className="text-sm text-stone-600 leading-relaxed mb-1.5"><span className="font-semibold text-stone-800">À vérifier :</span> {ins.watch}</p>
                    <p className="text-sm text-stone-600 leading-relaxed mb-4"><span className="font-semibold text-stone-800">Idéal pour :</span> {ins.idealFor}</p>
                    <a href={ins.url} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-1.5 text-sm font-bold text-white px-4 py-2 rounded-lg transition-opacity hover:opacity-90" style={{ backgroundColor: ins.color }}>
                      Voir l&apos;offre {ins.name} →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── How to choose ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Comment choisir en 5 étapes</h2>
          <ol className="space-y-3">
            {CHOOSE_STEPS.map((s, i) => (
              <li key={i} className="flex items-start gap-4 bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-700 text-white font-bold flex items-center justify-center">{i + 1}</span>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Covered / excluded ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Ce qui est couvert, ce qui ne l&apos;est pas</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-5">
              <h3 className="font-bold text-emerald-800 mb-3">✓ Généralement couvert</h3>
              <ul className="space-y-2 text-sm text-stone-700">
                {COVERED.map((c) => (<li key={c} className="flex gap-2"><span className="text-emerald-600">✓</span><span>{c}</span></li>))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-rose-200 shadow-sm p-5">
              <h3 className="font-bold text-rose-800 mb-3">✗ Généralement exclu</h3>
              <ul className="space-y-2 text-sm text-stone-700">
                {EXCLUDED.map((c) => (<li key={c} className="flex gap-2"><span className="text-rose-500">✗</span><span>{c}</span></li>))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── How reimbursement works ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Comment fonctionne le remboursement</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REIMBURSE_STEPS.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
                <span className="text-sky-700 font-bold text-sm">Étape {i + 1}</span>
                <h3 className="font-bold text-stone-900 mt-1 mb-1">{s.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Is it worth it ── */}
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-stone-900 mb-3">Faut-il vraiment assurer son animal ?</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-4">
            Tout dépend de votre capacité à absorber une grosse dépense imprévue. Les soins
            courants restent abordables, mais une chirurgie peut faire basculer un budget. Voici
            des ordres de grandeur fréquemment constatés chez le vétérinaire :
          </p>
          <div className="overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-sm bg-white">
              <thead className="bg-stone-100 text-stone-700">
                <tr><th className="text-left px-4 py-2.5 font-semibold">Acte vétérinaire</th><th className="text-left px-4 py-2.5 font-semibold">Coût indicatif</th></tr>
              </thead>
              <tbody>
                {VET_COSTS.map((v) => (
                  <tr key={v.act} className="border-t border-stone-100"><td className="px-4 py-2.5 text-stone-700">{v.act}</td><td className="px-4 py-2.5 font-semibold text-stone-900 whitespace-nowrap">{v.cost}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-stone-500 mt-3">Fourchettes indicatives, variables selon la clinique et la région. L&apos;assurance est surtout rentable face aux actes lourds ; pour les seuls soins courants, une épargne de précaution peut suffire.</p>
        </section>

        {/* ── By profile ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Quelle assurance selon le profil de votre animal</h2>
          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
            <table className="w-full text-sm min-w-[600px] bg-white">
              <thead className="bg-stone-100 text-stone-700">
                <tr><th className="text-left px-4 py-3 font-semibold">Profil</th><th className="text-left px-4 py-3 font-semibold">Ce qui compte</th><th className="text-left px-4 py-3 font-semibold">Pistes</th></tr>
              </thead>
              <tbody>
                {PROFILE_ROWS.map((r) => (
                  <tr key={r.profile} className="border-t border-stone-100 align-top">
                    <td className="px-4 py-3 font-semibold text-stone-900">{r.profile}</td>
                    <td className="px-4 py-3 text-stone-600">{r.need}</td>
                    <td className="px-4 py-3 text-sky-700 font-medium">{r.suggestion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-stone-500 mt-3">Pistes éditoriales à affiner avec un devis : chaque animal est un cas particulier.</p>
        </section>

        {/* ── Pricing ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Combien coûte une assurance animaux ?</h2>
          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
            <table className="w-full text-sm min-w-[560px] bg-white">
              <thead className="bg-stone-100 text-stone-700">
                <tr><th className="text-left px-4 py-3 font-semibold">Niveau de couverture</th><th className="text-left px-4 py-3 font-semibold">Prix indicatif</th><th className="text-left px-4 py-3 font-semibold">À savoir</th></tr>
              </thead>
              <tbody>
                {PRICE_ROWS.map((r) => (
                  <tr key={r.profile} className="border-t border-stone-100 align-top">
                    <td className="px-4 py-3 font-semibold text-stone-900">{r.profile}</td>
                    <td className="px-4 py-3 text-emerald-700 font-semibold whitespace-nowrap">{r.range}</td>
                    <td className="px-4 py-3 text-stone-600">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-stone-500 mt-3">Fourchettes indicatives : le tarif réel dépend de l’âge, de la race et de la formule. Un chat coûte généralement un peu moins cher qu’un chien.</p>
        </section>

        {/* ── Expensive breeds ── */}
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-stone-900 mb-3">Les races les plus coûteuses à assurer</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-3">
            Certaines races paient des cotisations plus élevées car elles présentent davantage de
            risques de santé. C’est le cas des races brachycéphales (bouledogue français, carlin,
            bouledogue anglais), sujettes aux problèmes respiratoires, et des grandes races (dogue
            allemand, berger allemand, labrador), plus exposées à la dysplasie des hanches.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            Pour ces animaux, privilégiez un plafond annuel élevé et un bon taux de remboursement,
            et assurez-les jeunes : les prédispositions découvertes plus tard pourraient être
            considérées comme préexistantes.
          </p>
        </section>

        {/* ── Mistakes ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Les erreurs à éviter</h2>
          <ul className="space-y-3">
            {MISTAKES.map((m, i) => (
              <li key={i} className="flex items-start gap-3 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">
                <span className="text-rose-500 font-bold flex-shrink-0">✗</span>
                <span className="text-sm text-stone-700 leading-relaxed">{m}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Glossary ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Le vocabulaire à connaître</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
                <h3 className="font-bold text-stone-900 mb-1.5">{g.term}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{g.def}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Travel ── */}
        <section className="bg-sky-50 border border-sky-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-stone-900 mb-3">Voyager avec son animal : que couvre l&apos;assurance ?</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-3">
            Si vous voyagez avec votre chien ou votre chat, vérifiez la garantie « frais
            vétérinaires à l’étranger » : toutes les formules ne couvrent pas les soins engagés
            hors de France, même dans l’Union européenne. L’assurance santé ne remplace jamais
            les formalités d’entrée : passeport européen pour animal de compagnie, puce
            d’identification et vaccination antirabique à jour restent obligatoires.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <Link href="/fr/destinations" className="bg-white border border-sky-300 text-sky-900 px-3 py-1.5 rounded-full hover:bg-sky-100">Hôtels acceptant les animaux →</Link>
            <Link href="/fr/accessoires-chien" className="bg-white border border-stone-300 text-stone-700 px-3 py-1.5 rounded-full hover:bg-stone-100">Accessoires chien voyage →</Link>
          </div>
        </section>

        {/* ── Verdict ── */}
        <section className="bg-gradient-to-br from-sky-800 to-indigo-900 text-white rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-3">Notre verdict</h2>
          <p className="text-sm text-sky-50 leading-relaxed mb-2">
            Pour la plupart des propriétaires, <strong>Lassie</strong> offre aujourd’hui le
            meilleur équilibre couverture / prix, avec une reconnaissance au test indépendant
            allemand. <strong>Dalma</strong> séduit par la rapidité de remboursement et l’appli,
            <strong> Santévet</strong> par son tiers payant qui évite d’avancer les frais, et
            <strong> Carrefour</strong> ou <strong>Acheel</strong> par leurs tarifs d’entrée.
          </p>
          <p className="text-sm text-sky-100 leading-relaxed">
            Dans tous les cas : assurez tôt, visez un plafond annuel suffisant, et lisez les
            délais de carence et les exclusions avant de signer.
          </p>
        </section>

        {/* ── Methodology ── */}
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-stone-900 mb-3">Notre méthode</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-3">
            Nous comparons chaque assureur sur six critères systématiques : étendue des garanties,
            taux de remboursement, plafond annuel, délai de carence, exclusions et qualité du
            service. Chaque information est vérifiée auprès de sources indépendantes et des
            documents officiels de l&apos;assureur. Ce qui n&apos;est pas vérifiable n&apos;est pas publié.
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">
            Le classement est éditorial. Les emplacements sponsorisés sont signalés par la mention
            «&nbsp;Sponsorisé&nbsp;» et n&apos;altèrent pas notre évaluation des garanties. Rédigé par
            Jean-Baptiste Manson, fondateur et éditeur de HotelsWithPets.com.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed mt-3 pt-3 border-t border-stone-100">
            Vous représentez un assureur et souhaitez apparaître ou faire remonter votre offre dans
            ce comparatif ? Écrivez-nous à{' '}
            <a href="mailto:contact@hotelswithpets.com" className="text-blue-700 underline hover:text-blue-900">contact@hotelswithpets.com</a>.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Questions fréquentes</h2>
          <div className="space-y-4">
            {FAQ.map((f, i) => (
              <details key={i} className="bg-white rounded-2xl border border-stone-200 shadow-sm group">
                <summary className="px-6 py-4 font-semibold text-stone-900 cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="text-stone-500 group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                </summary>
                <div className="px-6 pb-5 text-stone-700 text-sm leading-relaxed border-t border-stone-100 pt-4">{f.a}</div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
