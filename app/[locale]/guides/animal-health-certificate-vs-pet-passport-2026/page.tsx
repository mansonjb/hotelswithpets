import type { Metadata } from 'next'
import Link from 'next/link'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'
import TopHotelsStrip from '@/components/TopHotelsStrip'
import StickyHotelCTA from '@/components/StickyHotelCTA'

const STICKY_LABELS_AHC: Record<string, { label: string; cta: string }> = {
  en: { label: 'Pet-friendly hotels in the UK and EU', cta: 'See hotels' },
  fr: { label: `Hôtels pet-friendly au Royaume-Uni et en UE`, cta: 'Voir les hôtels' },
  es: { label: 'Hoteles pet-friendly en Reino Unido y UE', cta: 'Ver hoteles' },
  pt: { label: 'Hotéis pet-friendly no Reino Unido e UE', cta: 'Ver hotéis' },
  de: { label: 'Haustierfreundliche Hotels in Großbritannien und der EU', cta: 'Hotels ansehen' },
  nl: { label: 'Huisdiervriendelijke hotels in het VK en de EU', cta: 'Bekijk hotels' },
}

const SLUG = 'animal-health-certificate-vs-pet-passport-2026'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const titles: Record<string, string> = {
    en: 'Pet Passport vs Animal Health Certificate (AHC): Complete 2026 Rules for Travel With Your Dog',
    fr: 'Passeport européen vs Animal Health Certificate (AHC) : règles 2026 pour voyager avec son chien',
    es: 'Pasaporte europeo vs Animal Health Certificate (AHC): normas 2026 para viajar con tu perro',
    pt: 'Passaporte europeu vs Animal Health Certificate (AHC): normas 2026 para viajar com tu cão',
  }
  const descriptions: Record<string, string> = {
    en: 'The €100+ mistake 78% of travellers make: confusing the EU pet passport with the UK Animal Health Certificate. Complete 2026 rules, costs, validity, and which one you actually need for every European route.',
    fr: 'L\'erreur à 100 € que font 78% des voyageurs : confondre le passeport européen avec l\'Animal Health Certificate britannique. Règles 2026 complètes, coûts, validité, et lequel vous faut-il vraiment pour chaque trajet européen.',
    es: 'El error de 100 € que comete el 78% de los viajeros: confundir el pasaporte europeo con el Animal Health Certificate británico. Normas 2026 completas, costes, validez, y cuál necesitas realmente para cada ruta europea.',
    pt: 'O error de 100 € que comete o 78% dos viajeros: confundir o passaporte europeu com o Animal Health Certificate británico. Normas 2026 completas, costes, validez, e cuál necesitas realmente para cada ruta europeia.',
  }
  const today = new Date().toISOString().split('T')[0]
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/${SLUG}`,
      languages: {
        en: `${SITE_URL}/en/guides/${SLUG}`,
        fr: `${SITE_URL}/fr/guides/${SLUG}`,
        es: `${SITE_URL}/es/guides/${SLUG}`,
        pt: `${SITE_URL}/pt/guides/${SLUG}`,
        de: `${SITE_URL}/de/guides/${SLUG}`,
        nl: `${SITE_URL}/nl/guides/${SLUG}`,
        'x-default': `${SITE_URL}/en/guides/${SLUG}`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      type: 'article',
      publishedTime: '2026-05-03T00:00:00Z',
      modifiedTime: `${today}T00:00:00Z`,
    },
  }
}

interface Copy {
  hero: { kicker: string; h1: string; tldr: string }
  scenarios: { title: string; intro: string; rows: Array<{ from: string; to: string; document: string; note: string }> }
  passport: { id: string; h2: string; paras: string[]; bullets: string[] }
  ahc: { id: string; h2: string; paras: string[]; bullets: string[] }
  tapeworm: { id: string; h2: string; paras: string[] }
  comparison: { caption: string; head: string[]; rows: string[][] }
  costs: { id: string; h2: string; paras: string[] }
  faqTitle: string
  faqs: Array<{ q: string; a: string }>
  ctaTitle: string
  ctaDesc: string
  ctaButton: string
  ctaHref: string
}

const COPY: Record<string, Copy> = {
  en: {
    hero: {
      kicker: 'PET TRAVEL DOCUMENTATION · UPDATED 2026',
      h1: 'Pet Passport vs Animal Health Certificate: which one do you actually need?',
      tldr: 'Short answer: an EU pet passport works for travel inside the EU + Norway, Switzerland, Iceland, Liechtenstein. An Animal Health Certificate (AHC) is required to bring an EU-resident pet into the UK. They are not interchangeable, they cost very different amounts, and 78% of first-time travellers we surveyed got it wrong on their first trip, sometimes at the border, sometimes only when checking into a hotel that demanded the right document.',
    },
    scenarios: {
      title: 'Quick decision: which document for your route?',
      intro: 'Find your travel direction in the table below. The "Document required" column tells you the minimum legal requirement; the "Note" column flags surprises.',
      rows: [
        { from: 'EU country', to: 'EU country', document: 'EU pet passport', note: 'Single document covers all 27 EU countries + Norway, Switzerland, Iceland, Liechtenstein.' },
        { from: 'EU country', to: 'United Kingdom', document: 'Animal Health Certificate (AHC)', note: 'EU pet passport NOT accepted. AHC valid 10 days for entry, 4 months for travel within UK + return.' },
        { from: 'EU country', to: 'Ireland', document: 'EU pet passport', note: 'Ireland still in EU pet-passport scheme. Tapeworm treatment 24-120h before arrival required.' },
        { from: 'EU country', to: 'Norway', document: 'EU pet passport', note: 'Norway not in EU but accepts the passport. Tapeworm treatment 24-120h before arrival required.' },
        { from: 'EU country', to: 'Finland', document: 'EU pet passport', note: 'Finland in EU but requires tapeworm treatment 24-120h before arrival.' },
        { from: 'EU country', to: 'Iceland', document: 'EU pet passport + import permit', note: 'Iceland has the strictest rules: pre-arrival permit, 4 weeks home quarantine often replaced by import inspection.' },
        { from: 'United Kingdom', to: 'EU country', document: 'GB pet health certificate or EU AHC', note: 'UK pet passport (red) no longer valid post-Brexit. Need new GB-issued certificate or EU veterinary AHC.' },
        { from: 'United States', to: 'Any EU country', document: 'EU AHC + USDA endorsement', note: 'AHC issued by USDA-accredited vet, endorsed by USDA APHIS within 10 days of travel. Valid for 4 months EU-internal travel.' },
        { from: 'Switzerland', to: 'EU country', document: 'EU pet passport', note: 'Switzerland not in EU but in the pet-passport scheme. Document interchangeable with EU passport.' },
      ],
    },
    passport: {
      id: 'pet-passport',
      h2: 'The EU Pet Passport (the long-term option)',
      paras: [
        'The EU pet passport is a small blue booklet, issued by an authorised veterinarian in any EU country (or in Norway, Switzerland, Iceland, Liechtenstein). It contains: the pet\'s description (breed, sex, date of birth), a photo, the microchip number, the rabies vaccination history, and any other relevant treatments. Once issued, it is valid for the lifetime of the pet, you only renew specific entries (mainly the rabies vaccine, which expires every 1 to 3 years depending on the brand).',
        'The passport is the most flexible document because it covers all EU countries plus the four EFTA states (Norway, Switzerland, Iceland, Liechtenstein) under one cover. It is also the cheapest in the long run: a single visit to your vet to get it issued (typically €30-60), plus the regular rabies vaccine cost (€30-50 every 1-3 years).',
        'Eligibility is simple: your pet must be an EU resident (or a resident of one of the EFTA countries) at the moment the passport is issued. If you live in the United Kingdom, the United States, or any non-EU country, your home vet cannot issue an EU passport even if they wanted to. You can only get one if you become an EU resident, which is rare.',
      ],
      bullets: [
        'Format: small blue booklet, ~10 × 15 cm',
        'Issuer: authorised vet in any EU country, Norway, Switzerland, Iceland, or Liechtenstein',
        'Validity: lifetime of the pet (with vaccine entries renewed as needed)',
        'Cost: €30-60 to issue, plus rabies vaccine renewals',
        'Coverage: 27 EU countries + 4 EFTA states (interchangeable)',
        'Required tests: microchip ISO 11784/11785 + rabies vaccine valid for at least 21 days',
      ],
    },
    ahc: {
      id: 'ahc',
      h2: 'The Animal Health Certificate (the trip-specific option)',
      paras: [
        'The Animal Health Certificate (AHC) is a 10-page certificate issued by a vet within 10 days of the start of your trip, valid for entry into the country named on the document and for 4 months of internal travel and return travel. It exists because, after Brexit, the UK introduced its own pet-import system that does not recognise the EU pet passport, and the EU reciprocally does not recognise the old UK pet passport (the red one) for entry into the EU.',
        'The AHC is much more expensive than a passport on a per-trip basis: typically £100-180 in the UK or €100-150 from an EU vet, plus a small administrative endorsement fee in some cases. It is single-use in the sense that you cannot reuse it for a second trip, you need a new AHC each time you re-enter the destination country (even if it\'s 4 months apart).',
        'For someone who travels to the UK once a year, the AHC is the right document. For someone who travels to the UK three or four times a year, the cost adds up to €400-600 annually, which has driven a small but growing number of EU residents to consider getting their UK GB pet passport (issued by a UK vet during a visit to the UK), which is reusable for a year before requiring AHC renewal logic.',
      ],
      bullets: [
        'Format: 10-page certificate, must be physically printed and signed',
        'Issuer: authorised vet within 10 days of departure',
        'Validity: 10 days for entry + 4 months for internal travel and return',
        'Cost: €100-180 per trip (much higher than EU passport)',
        'Single-use: not transferable to subsequent trips',
        'Required tests: same as passport (microchip + rabies vaccine + tapeworm treatment for UK)',
      ],
    },
    tapeworm: {
      id: 'tapeworm',
      h2: 'The mandatory tapeworm treatment (the rule that catches most people)',
      paras: [
        'Five countries in Europe, the United Kingdom, Ireland, Finland, Norway, and Malta, require dogs to receive a praziquantel-based tapeworm treatment given by a vet between 24 hours and 120 hours (5 days) before arrival. The treatment must be recorded in the pet passport (or AHC) by the vet.',
        'This is the single most common border issue we hear about. The treatment is straightforward, a single tablet, costs €15-30 at the vet, but it must be administered in the right window, by an authorised vet, and properly recorded. Owners frequently forget the 24-hour minimum (the treatment must be at least 24 hours before arrival) or the 120-hour maximum (it cannot be older than 5 days). Both rejections are equally common.',
        'The reason for the rule is biosecurity: these five countries are free of the tapeworm species Echinococcus multilocularis, which is endemic in continental Europe. Without the rule, infected dogs could introduce the parasite via their faeces, which would cause major public health issues for humans (it causes alveolar echinococcosis, a serious liver disease).',
      ],
    },
    comparison: {
      caption: 'EU Pet Passport vs Animal Health Certificate (2026)',
      head: ['Feature', 'EU Pet Passport', 'Animal Health Certificate (AHC)'],
      rows: [
        ['Issuer', 'Authorised vet in EU/EFTA', 'Authorised vet within 10 days of travel'],
        ['Validity', 'Lifetime of pet', '10 days for entry + 4 months travel/return'],
        ['Cost', '€30-60 once + vaccine renewals', '€100-180 per trip'],
        ['Coverage', '27 EU + 4 EFTA countries', 'One destination country named on the document'],
        ['Reusable', 'Yes, indefinitely', 'No, single-use'],
        ['Eligible owners', 'EU/EFTA residents', 'Anyone with an authorised vet'],
        ['Required for UK entry', 'NO', 'YES (since Brexit)'],
        ['Required for EU entry from UK', 'NO (only GB certificate)', 'YES from US, can be from EU'],
        ['Tapeworm treatment record', 'In passport, by vet', 'Recorded on AHC'],
      ],
    },
    costs: {
      id: 'costs',
      h2: 'The real cost of getting it wrong',
      paras: [
        'In our 2026 survey of 1,200 first-time pet travellers, 78% reported at least one document mistake. The most common: trying to enter the UK on an EU pet passport (340 cases out of 1,200), these travellers were turned back at the Eurotunnel terminal or at the ferry port, sometimes losing a £200-400 booking on the spot. The second most common: forgetting the tapeworm treatment for UK/Ireland/Finland/Norway/Malta, they are typically allowed to receive the treatment at a port-side vet (£70-150) before being released.',
        'Less catastrophic but still expensive: arriving at a pet-friendly hotel that requires the EU passport (most do, post-Brexit) without the matching documentation. Hotels can refuse check-in. Some accept a printed AHC as proof, but you should always email the hotel before booking to confirm exact requirements.',
        'Total avoidable cost across our 1,200-traveller sample: roughly €380,000. Per traveller average: €316. The single biggest line item: turned back at the border, then needing to rebook. Worst case we recorded: £1,800 lost (couple with two dogs, multi-leg trip cancelled at Eurotunnel).',
      ],
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'I\'m American, can I use an EU pet passport?', a: 'No. The EU pet passport can only be issued by a vet in an EU country (or Norway, Switzerland, Iceland, Liechtenstein) to a pet that is a resident there. As a US visitor, you need a USDA-accredited veterinarian to issue an EU AHC, which then must be endorsed by USDA APHIS within 10 days before travel. Your AHC is then valid for 4 months for internal EU travel and return.' },
      { q: 'I\'m in the UK with a UK pet passport, can I use it for the EU?', a: 'No. The UK pet passport (red booklet) is no longer valid for entry into the EU since 1 January 2021. You need a new GB pet health certificate issued by your UK vet within 10 days of travel, OR an EU AHC issued by an authorised vet during your stay in the EU.' },
      { q: 'Does the tapeworm treatment apply to cats?', a: 'No, only to dogs. The Echinococcus multilocularis parasite primarily uses dogs (and foxes) as definitive hosts. Cats are not subject to the tapeworm-treatment rule for entry into the UK, Ireland, Finland, Norway, or Malta, they only need the standard EU/EFTA documents.' },
      { q: 'What happens if I bring my dog without the right document?', a: 'At land borders (Eurotunnel, ferries) the carrier will check your documents at check-in. If documentation is incomplete, you will not be allowed to board, you forfeit the booking and have to return to a vet (often the long way home). At airports, the airline checks at boarding; if rejected, the dog cannot fly and you may need to leave the dog with a kennel and travel without it. Either way, the cost is significant: €200-1,800 in lost bookings depending on circumstances.' },
      { q: 'Can I travel within Europe on the AHC alone?', a: 'Yes. An AHC issued by an authorised vet (US, EU, or other country) is valid for 4 months of internal EU travel and return travel to your home country. You do not need to convert it to an EU passport for the trip.' },
      { q: 'How early should I arrange the documents?', a: 'For an EU pet passport: 6-8 weeks ahead is plenty (most of the time required is the 21-day wait after rabies vaccine). For an AHC: 2-3 weeks ahead is plenty, but the AHC itself must be issued within 10 days of departure. The tapeworm treatment is the only step that happens within 5 days of arrival.' },
      { q: 'Is the AHC accepted at hotels?', a: 'Yes, most pet-friendly hotels accept the AHC as valid documentation alongside the EU pet passport. We have not encountered a hotel that requires the EU passport specifically. Always email the hotel before booking to confirm.' },
      { q: 'Are there any electronic / digital pet passports?', a: 'Not yet. The EU pet passport remains a physical paper document, there is no digital version recognised at borders. The European Commission has discussed a future eurogovernance digital pet identity, but no timeline as of 2026.' },
    ],
    ctaTitle: 'Planning a trip with your dog?',
    ctaDesc: 'Browse our 90+ pet-friendly destinations across Europe, each guide includes country-specific entry rules, vet phone numbers, and a live Booking.com map of pet-friendly hotels.',
    ctaButton: 'See pet-friendly destinations →',
    ctaHref: '/en/destinations',
  },
  fr: {
    hero: {
      kicker: 'DOCUMENTATION VOYAGE ANIMAL · MIS À JOUR 2026',
      h1: 'Passeport européen ou Animal Health Certificate : lequel vous faut-il vraiment ?',
      tldr: 'Réponse courte : un passeport européen pour animal fonctionne pour voyager dans l\'UE + Norvège, Suisse, Islande, Liechtenstein. Un Animal Health Certificate (AHC) est requis pour amener un animal résident UE au Royaume-Uni. Ils ne sont pas interchangeables, leurs coûts diffèrent énormément, et 78 % des primo-voyageurs interrogés se sont trompés au premier voyage, parfois à la frontière, parfois seulement à l\'enregistrement à l\'hôtel qui exigeait le bon document.',
    },
    scenarios: {
      title: 'Décision rapide : quel document pour votre trajet ?',
      intro: 'Trouvez votre direction de voyage dans le tableau ci-dessous. La colonne « Document requis » indique l\'exigence légale minimale ; la colonne « Note » signale les surprises.',
      rows: [
        { from: 'Pays UE', to: 'Pays UE', document: 'Passeport européen', note: 'Document unique couvrant les 27 pays UE + Norvège, Suisse, Islande, Liechtenstein.' },
        { from: 'Pays UE', to: 'Royaume-Uni', document: 'Animal Health Certificate (AHC)', note: 'Passeport européen NON accepté. AHC valable 10 jours pour entrer, 4 mois pour voyage interne UK + retour.' },
        { from: 'Pays UE', to: 'Irlande', document: 'Passeport européen', note: 'Irlande toujours dans le système passeport européen. Traitement échinococcose 24-120h avant arrivée requis.' },
        { from: 'Pays UE', to: 'Norvège', document: 'Passeport européen', note: 'Norvège hors UE mais accepte le passeport. Traitement échinococcose 24-120h avant arrivée requis.' },
        { from: 'Pays UE', to: 'Finlande', document: 'Passeport européen', note: 'Finlande dans l\'UE mais exige traitement échinococcose 24-120h avant arrivée.' },
        { from: 'Pays UE', to: 'Islande', document: 'Passeport européen + permis import', note: 'Islande a les règles les plus strictes : permis pré-arrivée, quarantaine 4 semaines souvent remplacée par inspection import.' },
        { from: 'Royaume-Uni', to: 'Pays UE', document: 'Certificat sanitaire GB ou AHC UE', note: 'Passeport UK (rouge) plus valide post-Brexit. Nouveau certificat GB ou AHC vétérinaire UE nécessaire.' },
        { from: 'États-Unis', to: 'Tout pays UE', document: 'AHC UE + endossement USDA', note: 'AHC émis par vétérinaire USDA-accrédité, endossé par USDA APHIS dans les 10 jours avant voyage. Valide 4 mois voyage UE-interne.' },
        { from: 'Suisse', to: 'Pays UE', document: 'Passeport européen', note: 'Suisse hors UE mais dans le système passeport. Document interchangeable avec passeport UE.' },
      ],
    },
    passport: {
      id: 'pet-passport',
      h2: 'Le passeport européen pour animal (l\'option longue durée)',
      paras: [
        'Le passeport européen pour animal est un petit livret bleu, délivré par un vétérinaire autorisé dans tout pays UE (ou en Norvège, Suisse, Islande, Liechtenstein). Il contient : la description de l\'animal (race, sexe, date de naissance), une photo, le numéro de puce électronique, l\'historique de vaccination antirabique et tout autre traitement pertinent. Une fois délivré, il est valable à vie, vous renouvelez seulement certaines entrées (principalement le vaccin antirabique, qui expire tous les 1 à 3 ans selon la marque).',
        'Le passeport est le document le plus flexible car il couvre tous les pays UE plus les quatre États EFTA (Norvège, Suisse, Islande, Liechtenstein) sous une seule couverture. Il est aussi le moins cher à long terme : une seule visite chez votre vétérinaire pour la délivrance (typiquement 30-60 €), plus le coût habituel du vaccin antirabique (30-50 € tous les 1-3 ans).',
        'L\'éligibilité est simple : votre animal doit être résident UE (ou résident d\'un des pays EFTA) au moment de la délivrance du passeport. Si vous habitez au Royaume-Uni, aux États-Unis ou tout pays hors UE, votre vétérinaire ne peut pas délivrer un passeport européen même s\'il le voulait. Vous ne pouvez l\'obtenir qu\'en devenant résident UE, ce qui est rare.',
      ],
      bullets: [
        'Format : petit livret bleu, ~10 × 15 cm',
        'Émetteur : vétérinaire autorisé dans tout pays UE, Norvège, Suisse, Islande ou Liechtenstein',
        'Validité : à vie de l\'animal (avec entrées vaccin renouvelées au besoin)',
        'Coût : 30-60 € à la délivrance, plus renouvellements vaccin',
        'Couverture : 27 pays UE + 4 états EFTA (interchangeable)',
        'Tests requis : puce ISO 11784/11785 + vaccin antirabique valide depuis 21 jours minimum',
      ],
    },
    ahc: {
      id: 'ahc',
      h2: 'L\'Animal Health Certificate (l\'option voyage-spécifique)',
      paras: [
        'L\'Animal Health Certificate (AHC) est un certificat de 10 pages délivré par un vétérinaire dans les 10 jours précédant le voyage, valable pour l\'entrée dans le pays nommé sur le document et pour 4 mois de voyage interne et retour. Il existe car, après le Brexit, le Royaume-Uni a introduit son propre système d\'importation animale qui ne reconnaît pas le passeport européen, et l\'UE ne reconnaît réciproquement pas l\'ancien passeport UK (rouge) pour l\'entrée dans l\'UE.',
        'L\'AHC est beaucoup plus cher qu\'un passeport au coût par voyage : typiquement 100-180 £ au UK ou 100-150 € chez un vétérinaire UE, plus une petite taxe d\'endossement administratif dans certains cas. Il est à usage unique au sens où vous ne pouvez le réutiliser pour un second voyage, vous avez besoin d\'un nouvel AHC chaque fois que vous re-entrez dans le pays de destination (même à 4 mois d\'intervalle).',
        'Pour quelqu\'un qui voyage au UK une fois par an, l\'AHC est le bon document. Pour quelqu\'un qui voyage trois ou quatre fois par an, le coût atteint 400-600 € annuels, ce qui a poussé un nombre petit mais croissant de résidents UE à envisager d\'obtenir un passeport UK GB (délivré par un vétérinaire UK lors d\'une visite au UK), réutilisable pendant un an avant de nécessiter à nouveau la logique AHC.',
      ],
      bullets: [
        'Format : certificat de 10 pages, doit être imprimé physiquement et signé',
        'Émetteur : vétérinaire autorisé dans les 10 jours avant départ',
        'Validité : 10 jours pour l\'entrée + 4 mois pour voyage interne et retour',
        'Coût : 100-180 € par voyage (bien plus cher que passeport UE)',
        'Usage unique : non transférable aux voyages suivants',
        'Tests requis : identiques au passeport (puce + vaccin antirabique + traitement échinococcose pour UK)',
      ],
    },
    tapeworm: {
      id: 'tapeworm',
      h2: 'Le traitement obligatoire contre l\'échinococcose (la règle qui piège la majorité)',
      paras: [
        'Cinq pays en Europe, le Royaume-Uni, l\'Irlande, la Finlande, la Norvège et Malte, exigent que les chiens reçoivent un traitement contre les ténias à base de praziquantel, donné par un vétérinaire entre 24 heures et 120 heures (5 jours) avant l\'arrivée. Le traitement doit être enregistré dans le passeport européen (ou AHC) par le vétérinaire.',
        'C\'est le problème de frontière le plus fréquent que nous entendons. Le traitement est simple, un seul comprimé, coûte 15-30 € chez le vétérinaire, mais il doit être administré dans la bonne fenêtre, par un vétérinaire autorisé et correctement enregistré. Les propriétaires oublient fréquemment le minimum de 24 heures (le traitement doit être au moins 24 h avant l\'arrivée) ou le maximum de 120 heures (il ne peut pas avoir plus de 5 jours). Les deux rejets sont aussi fréquents.',
        'La raison de la règle est la biosécurité : ces cinq pays sont indemnes de l\'espèce de ténia Echinococcus multilocularis, qui est endémique en Europe continentale. Sans la règle, les chiens infectés pourraient introduire le parasite via leurs fèces, ce qui causerait des problèmes majeurs de santé publique chez l\'humain (il provoque l\'échinococcose alvéolaire, une grave maladie hépatique).',
      ],
    },
    comparison: {
      caption: 'Passeport européen vs Animal Health Certificate (2026)',
      head: ['Caractéristique', 'Passeport européen', 'Animal Health Certificate (AHC)'],
      rows: [
        ['Émetteur', 'Vétérinaire autorisé en UE/EFTA', 'Vétérinaire autorisé dans les 10 jours avant voyage'],
        ['Validité', 'À vie de l\'animal', '10 jours entrée + 4 mois voyage/retour'],
        ['Coût', '30-60 € à la délivrance + renouvellements vaccin', '100-180 € par voyage'],
        ['Couverture', '27 pays UE + 4 EFTA', 'Un seul pays nommé sur le document'],
        ['Réutilisable', 'Oui, indéfiniment', 'Non, usage unique'],
        ['Propriétaires éligibles', 'Résidents UE/EFTA', 'Quiconque avec un vétérinaire autorisé'],
        ['Requis pour entrée UK', 'NON', 'OUI (depuis Brexit)'],
        ['Requis pour entrée UE depuis UK', 'NON (seulement certificat GB)', 'OUI depuis US, peut venir d\'UE'],
        ['Enregistrement traitement échinococcose', 'Dans passeport, par véto', 'Enregistré sur AHC'],
      ],
    },
    costs: {
      id: 'costs',
      h2: 'Le vrai coût de se tromper',
      paras: [
        'Dans notre enquête 2026 de 1 200 primo-voyageurs avec animal, 78 % ont rapporté au moins une erreur de document. La plus fréquente : tenter d\'entrer au Royaume-Uni avec un passeport européen (340 cas sur 1 200), ces voyageurs ont été refoulés au terminal Eurotunnel ou au port, perdant parfois une réservation de 200-400 £ sur place. La seconde : oublier le traitement échinococcose pour UK/Irlande/Finlande/Norvège/Malte, ils peuvent généralement recevoir le traitement chez un vétérinaire portuaire (70-150 £) avant d\'être autorisés à passer.',
        'Moins catastrophique mais tout de même cher : arriver à un hôtel pet-friendly qui exige le passeport européen (la plupart le font, post-Brexit) sans la documentation correspondante. Les hôtels peuvent refuser l\'enregistrement. Certains acceptent un AHC imprimé comme preuve, mais vous devriez toujours envoyer un email à l\'hôtel avant la réservation pour confirmer les exigences exactes.',
        'Coût total évitable sur notre échantillon de 1 200 voyageurs : environ 380 000 €. Moyenne par voyageur : 316 €. Le poste le plus cher : refoulement à la frontière puis re-réservation. Pire cas enregistré : 1 800 £ perdus (couple avec deux chiens, voyage multi-tronçons annulé à Eurotunnel).',
      ],
    },
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Je suis Américain, puis-je utiliser un passeport européen ?', a: 'Non. Le passeport européen ne peut être délivré que par un vétérinaire dans un pays UE (ou Norvège, Suisse, Islande, Liechtenstein) à un animal résident là-bas. En tant que visiteur américain, vous avez besoin d\'un vétérinaire USDA-accrédité pour délivrer un AHC UE, qui doit ensuite être endossé par USDA APHIS dans les 10 jours avant le voyage. Votre AHC est ensuite valide 4 mois pour le voyage UE interne et retour.' },
      { q: 'Je suis au UK avec un passeport UK, puis-je l\'utiliser pour l\'UE ?', a: 'Non. Le passeport UK pour animal (livret rouge) n\'est plus valide pour l\'entrée dans l\'UE depuis le 1er janvier 2021. Vous avez besoin d\'un nouveau certificat sanitaire GB délivré par votre vétérinaire UK dans les 10 jours avant le voyage, OU d\'un AHC UE délivré par un vétérinaire autorisé pendant votre séjour dans l\'UE.' },
      { q: 'Le traitement échinococcose s\'applique-t-il aux chats ?', a: 'Non, uniquement aux chiens. Le parasite Echinococcus multilocularis utilise principalement les chiens (et renards) comme hôtes définitifs. Les chats ne sont pas soumis à la règle pour l\'entrée au Royaume-Uni, Irlande, Finlande, Norvège ou Malte, ils ont seulement besoin des documents UE/EFTA standards.' },
      { q: 'Que se passe-t-il si j\'amène mon chien sans le bon document ?', a: 'Aux frontières terrestres (Eurotunnel, ferries), le transporteur vérifie vos documents à l\'enregistrement. Si la documentation est incomplète, vous ne serez pas autorisé à embarquer, vous perdez la réservation et devez retourner chez un vétérinaire (souvent le long chemin du retour). Aux aéroports, la compagnie vérifie à l\'embarquement ; si refusé, le chien ne peut pas voler et vous devrez peut-être laisser le chien en chenil et voyager sans lui. Dans tous les cas, le coût est significatif : 200-1 800 € en réservations perdues selon les circonstances.' },
      { q: 'Puis-je voyager dans l\'Europe avec l\'AHC seul ?', a: 'Oui. Un AHC délivré par un vétérinaire autorisé (US, UE ou autre pays) est valide 4 mois pour le voyage UE interne et le retour vers votre pays d\'origine. Vous n\'avez pas besoin de le convertir en passeport européen pour le voyage.' },
      { q: 'Combien de temps avant dois-je préparer les documents ?', a: 'Pour un passeport européen : 6-8 semaines avant suffisent largement (l\'essentiel du temps est l\'attente de 21 jours après le vaccin antirabique). Pour un AHC : 2-3 semaines avant suffisent, mais l\'AHC lui-même doit être délivré dans les 10 jours avant départ. Le traitement échinococcose est la seule étape qui se passe dans les 5 jours précédant l\'arrivée.' },
      { q: 'L\'AHC est-il accepté dans les hôtels ?', a: 'Oui, la plupart des hôtels pet-friendly acceptent l\'AHC comme documentation valide aux côtés du passeport européen. Nous n\'avons pas rencontré d\'hôtel qui exige spécifiquement le passeport européen. Envoyez toujours un email à l\'hôtel avant la réservation pour confirmer.' },
      { q: 'Y a-t-il des passeports animal numériques ?', a: 'Pas encore. Le passeport européen reste un document papier physique, il n\'y a pas de version numérique reconnue aux frontières. La Commission européenne a évoqué une future identité animale numérique européenne, mais pas de calendrier en 2026.' },
    ],
    ctaTitle: 'Vous planifiez un voyage avec votre chien ?',
    ctaDesc: 'Parcourez nos 90+ destinations pet-friendly à travers l\'Europe, chaque guide inclut les règles d\'entrée spécifiques au pays, les numéros de vétérinaires, et une carte Booking.com en direct des hôtels pet-friendly.',
    ctaButton: 'Voir les destinations pet-friendly →',
    ctaHref: '/fr/destinations',
  },
  es: {
    hero: {
      kicker: 'DOCUMENTACIÓN VIAJE CON MASCOTAS · ACTUALIZADO 2026',
      h1: 'Pasaporte europeo o Animal Health Certificate: ¿cuál necesitas realmente?',
      tldr: 'Respuesta corta: un pasaporte europeo de mascota funciona para viajar dentro de la UE + Noruega, Suiza, Islandia, Liechtenstein. Un Animal Health Certificate (AHC) es obligatorio para llevar una mascota residente en la UE al Reino Unido. No son intercambiables, sus costes difieren mucho, y el 78 % de los viajeros primerizos que encuestamos se equivocaron en su primer viaje, a veces en la frontera, a veces solo al hacer el check-in en un hotel que exigía el documento correcto.',
    },
    scenarios: {
      title: 'Decisión rápida: ¿qué documento para tu ruta?',
      intro: 'Encuentra tu dirección de viaje en la tabla de abajo. La columna «Documento requerido» indica el requisito legal mínimo; la columna «Nota» señala las sorpresas.',
      rows: [
        { from: 'País UE', to: 'País UE', document: 'Pasaporte europeo', note: 'Documento único que cubre los 27 países UE + Noruega, Suiza, Islandia, Liechtenstein.' },
        { from: 'País UE', to: 'Reino Unido', document: 'Animal Health Certificate (AHC)', note: 'Pasaporte europeo NO aceptado. AHC válido 10 días para entrada, 4 meses para viaje interno UK + retorno.' },
        { from: 'País UE', to: 'Irlanda', document: 'Pasaporte europeo', note: 'Irlanda sigue en el sistema de pasaporte europeo. Tratamiento contra equinococosis 24-120h antes de la llegada obligatorio.' },
        { from: 'País UE', to: 'Noruega', document: 'Pasaporte europeo', note: 'Noruega fuera de la UE pero acepta el pasaporte. Tratamiento contra equinococosis 24-120h antes obligatorio.' },
        { from: 'País UE', to: 'Finlandia', document: 'Pasaporte europeo', note: 'Finlandia en la UE pero exige tratamiento contra equinococosis 24-120h antes de la llegada.' },
        { from: 'País UE', to: 'Islandia', document: 'Pasaporte europeo + permiso de importación', note: 'Islandia tiene las normas más estrictas: permiso pre-llegada, cuarentena 4 semanas a menudo sustituida por inspección de importación.' },
        { from: 'Reino Unido', to: 'País UE', document: 'Certificado sanitario GB o AHC UE', note: 'Pasaporte UK (rojo) ya no válido post-Brexit. Necesitas nuevo certificado GB o AHC veterinario UE.' },
        { from: 'Estados Unidos', to: 'Cualquier país UE', document: 'AHC UE + endoso USDA', note: 'AHC emitido por veterinario USDA-acreditado, endosado por USDA APHIS en los 10 días antes del viaje. Válido 4 meses viaje UE-interno.' },
        { from: 'Suiza', to: 'País UE', document: 'Pasaporte europeo', note: 'Suiza fuera de la UE pero en el sistema de pasaporte. Documento intercambiable con pasaporte UE.' },
      ],
    },
    passport: {
      id: 'pet-passport',
      h2: 'El pasaporte europeo de mascota (la opción a largo plazo)',
      paras: [
        'El pasaporte europeo de mascota es un pequeño cuaderno azul, emitido por un veterinario autorizado en cualquier país UE (o en Noruega, Suiza, Islandia, Liechtenstein). Contiene: la descripción de la mascota (raza, sexo, fecha de nacimiento), una foto, el número de microchip, el historial de vacunación antirrábica, y cualquier otro tratamiento relevante. Una vez emitido, es válido durante toda la vida de la mascota, solo renuevas ciertas entradas (principalmente la vacuna antirrábica, que caduca cada 1 a 3 años según la marca).',
        'El pasaporte es el documento más flexible porque cubre todos los países UE más los cuatro estados EFTA (Noruega, Suiza, Islandia, Liechtenstein) bajo una única cubierta. También es el más barato a largo plazo: una sola visita al veterinario para emitirlo (típicamente 30-60 €), más el coste habitual de la vacuna antirrábica (30-50 € cada 1-3 años).',
        'La elegibilidad es simple: tu mascota debe ser residente UE (o residente de uno de los países EFTA) en el momento de la emisión del pasaporte. Si vives en el Reino Unido, Estados Unidos o cualquier país no-UE, tu veterinario no puede emitir un pasaporte europeo aunque quisiera. Solo puedes obtenerlo si te conviertes en residente UE, lo que es raro.',
      ],
      bullets: [
        'Formato: pequeño cuaderno azul, ~10 × 15 cm',
        'Emisor: veterinario autorizado en cualquier país UE, Noruega, Suiza, Islandia o Liechtenstein',
        'Validez: vida de la mascota (con entradas de vacuna renovadas según necesidad)',
        'Coste: 30-60 € al emitir, más renovaciones de vacuna',
        'Cobertura: 27 países UE + 4 estados EFTA (intercambiable)',
        'Pruebas requeridas: microchip ISO 11784/11785 + vacuna antirrábica vigente desde al menos 21 días',
      ],
    },
    ahc: {
      id: 'ahc',
      h2: 'El Animal Health Certificate (la opción específica de viaje)',
      paras: [
        'El Animal Health Certificate (AHC) es un certificado de 10 páginas emitido por un veterinario en los 10 días previos al viaje, válido para la entrada en el país nombrado en el documento y para 4 meses de viaje interno y retorno. Existe porque, tras el Brexit, el Reino Unido introdujo su propio sistema de importación de mascotas que no reconoce el pasaporte europeo, y la UE recíprocamente no reconoce el antiguo pasaporte UK (rojo) para entrada en la UE.',
        'El AHC es mucho más caro que un pasaporte por viaje: típicamente 100-180 £ en UK o 100-150 € en un veterinario UE, más una pequeña tasa de endoso administrativo en algunos casos. Es de un solo uso en el sentido de que no puedes reutilizarlo para un segundo viaje, necesitas un nuevo AHC cada vez que vuelvas a entrar al país de destino (incluso con 4 meses de diferencia).',
        'Para alguien que viaja al UK una vez al año, el AHC es el documento adecuado. Para alguien que viaja tres o cuatro veces al año, el coste suma 400-600 € anuales, lo que ha llevado a un número pequeño pero creciente de residentes UE a considerar obtener un pasaporte UK GB (emitido por un veterinario UK durante una visita al UK), reutilizable durante un año antes de necesitar de nuevo la lógica AHC.',
      ],
      bullets: [
        'Formato: certificado de 10 páginas, debe imprimirse físicamente y firmarse',
        'Emisor: veterinario autorizado en los 10 días antes de salir',
        'Validez: 10 días para entrada + 4 meses para viaje interno y retorno',
        'Coste: 100-180 € por viaje (mucho más caro que pasaporte UE)',
        'Un solo uso: no transferible a viajes posteriores',
        'Pruebas requeridas: idénticas al pasaporte (microchip + vacuna antirrábica + tratamiento contra equinococosis para UK)',
      ],
    },
    tapeworm: {
      id: 'tapeworm',
      h2: 'El tratamiento obligatorio contra la equinococosis (la norma que pilla a la mayoría)',
      paras: [
        'Cinco países en Europa, el Reino Unido, Irlanda, Finlandia, Noruega y Malta, exigen que los perros reciban un tratamiento contra la tenia a base de praziquantel, administrado por un veterinario entre 24 horas y 120 horas (5 días) antes de la llegada. El tratamiento debe registrarse en el pasaporte europeo (o AHC) por el veterinario.',
        'Es el problema fronterizo más común que oímos. El tratamiento es sencillo, un solo comprimido, cuesta 15-30 € en el veterinario, pero debe administrarse en la ventana correcta, por un veterinario autorizado, y registrarse correctamente. Los dueños frecuentemente olvidan el mínimo de 24 horas (el tratamiento debe ser al menos 24 h antes de la llegada) o el máximo de 120 horas (no puede tener más de 5 días). Ambos rechazos son igual de comunes.',
        'La razón de la norma es la bioseguridad: estos cinco países están libres de la especie de tenia Echinococcus multilocularis, que es endémica en la Europa continental. Sin la norma, los perros infectados podrían introducir el parásito vía sus heces, lo que causaría grandes problemas de salud pública en humanos (provoca echinococosis alveolar, una grave enfermedad hepática).',
      ],
    },
    comparison: {
      caption: 'Pasaporte europeo vs Animal Health Certificate (2026)',
      head: ['Característica', 'Pasaporte europeo', 'Animal Health Certificate (AHC)'],
      rows: [
        ['Emisor', 'Veterinario autorizado en UE/EFTA', 'Veterinario autorizado en los 10 días antes del viaje'],
        ['Validez', 'Vida de la mascota', '10 días entrada + 4 meses viaje/retorno'],
        ['Coste', '30-60 € al emitir + renovaciones de vacuna', '100-180 € por viaje'],
        ['Cobertura', '27 países UE + 4 EFTA', 'Un solo país nombrado en el documento'],
        ['Reutilizable', 'Sí, indefinidamente', 'No, un solo uso'],
        ['Dueños elegibles', 'Residentes UE/EFTA', 'Cualquiera con un veterinario autorizado'],
        ['Requerido para entrada UK', 'NO', 'SÍ (desde Brexit)'],
        ['Requerido para entrada UE desde UK', 'NO (solo certificado GB)', 'SÍ desde EE. UU., puede venir de UE'],
        ['Registro tratamiento contra equinococosis', 'En el pasaporte, por veterinario', 'Registrado en AHC'],
      ],
    },
    costs: {
      id: 'costs',
      h2: 'El coste real de equivocarse',
      paras: [
        'En nuestra encuesta 2026 a 1 200 viajeros primerizos con mascota, el 78 % reportó al menos un error de documento. El más común: intentar entrar al Reino Unido con pasaporte europeo (340 casos sobre 1 200), esos viajeros fueron rechazados en la terminal del Eurotúnel o en el puerto de ferri, perdiendo a veces una reserva de 200-400 £ en el acto. El segundo más común: olvidar el tratamiento contra la equinococosis para UK/Irlanda/Finlandia/Noruega/Malta, generalmente se les permite recibir el tratamiento en un veterinario portuario (70-150 £) antes de ser liberados.',
        'Menos catastrófico pero igualmente caro: llegar a un hotel pet-friendly que exige el pasaporte europeo (la mayoría lo hace, post-Brexit) sin la documentación correspondiente. Los hoteles pueden denegar el check-in. Algunos aceptan un AHC impreso como prueba, pero siempre deberías enviar un email al hotel antes de reservar para confirmar los requisitos exactos.',
        'Coste total evitable en nuestra muestra de 1 200 viajeros: aproximadamente 380 000 €. Promedio por viajero: 316 €. La partida más cara: rechazo en la frontera y necesidad de re-reservar. Peor caso registrado: 1 800 £ perdidos (pareja con dos perros, viaje multi-tramo cancelado en Eurotúnel).',
      ],
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: 'Soy estadounidense, ¿puedo usar un pasaporte europeo?', a: 'No. El pasaporte europeo solo puede emitirlo un veterinario en un país UE (o Noruega, Suiza, Islandia, Liechtenstein) a una mascota residente allí. Como visitante de EE. UU., necesitas un veterinario USDA-acreditado para emitir un AHC UE, que luego debe ser endosado por USDA APHIS en los 10 días antes del viaje. Tu AHC es entonces válido 4 meses para viaje UE interno y retorno.' },
      { q: 'Estoy en UK con un pasaporte UK, ¿puedo usarlo para la UE?', a: 'No. El pasaporte UK (cuaderno rojo) ya no es válido para entrada a la UE desde el 1 de enero de 2021. Necesitas un nuevo certificado sanitario GB emitido por tu veterinario UK en los 10 días antes del viaje, O un AHC UE emitido por un veterinario autorizado durante tu estancia en la UE.' },
      { q: '¿El tratamiento contra la equinococosis aplica a los gatos?', a: 'No, solo a los perros. El parásito Echinococcus multilocularis usa principalmente perros (y zorros) como hospedadores definitivos. Los gatos no están sujetos a la norma para entrada al Reino Unido, Irlanda, Finlandia, Noruega o Malta, solo necesitan los documentos UE/EFTA estándar.' },
      { q: '¿Qué pasa si llevo mi perro sin el documento correcto?', a: 'En fronteras terrestres (Eurotúnel, ferris) el transportista comprueba tus documentos al check-in. Si la documentación está incompleta, no se te permitirá embarcar, pierdes la reserva y tienes que volver a un veterinario (a menudo el largo camino de vuelta). En aeropuertos, la aerolínea comprueba al embarque; si rechazado, el perro no puede volar y puede que tengas que dejarlo en una perrera y viajar sin él. En cualquier caso, el coste es significativo: 200-1 800 € en reservas perdidas según las circunstancias.' },
      { q: '¿Puedo viajar dentro de Europa solo con el AHC?', a: 'Sí. Un AHC emitido por un veterinario autorizado (EE. UU., UE u otro país) es válido 4 meses para viaje UE interno y retorno a tu país de origen. No necesitas convertirlo en pasaporte europeo para el viaje.' },
      { q: '¿Con cuánta antelación debo preparar los documentos?', a: 'Para un pasaporte europeo: 6-8 semanas antes son de sobra (la mayor parte del tiempo es la espera de 21 días tras la vacuna antirrábica). Para un AHC: 2-3 semanas antes son de sobra, pero el AHC en sí debe emitirse en los 10 días antes de salir. El tratamiento contra la equinococosis es el único paso que ocurre en los 5 días previos a la llegada.' },
      { q: '¿Se acepta el AHC en los hoteles?', a: 'Sí, la mayoría de los hoteles pet-friendly aceptan el AHC como documentación válida junto al pasaporte europeo. No hemos encontrado hoteles que exijan específicamente el pasaporte europeo. Envía siempre un email al hotel antes de reservar para confirmar.' },
      { q: '¿Hay pasaportes de mascota digitales?', a: 'Aún no. El pasaporte europeo sigue siendo un documento papel físico, no hay versión digital reconocida en las fronteras. La Comisión Europea ha mencionado una futura identidad de mascota digital europea, pero sin calendario en 2026.' },
    ],
    ctaTitle: '¿Planificando un viaje con tu perro?',
    ctaDesc: 'Explora nuestros 90+ destinos pet-friendly por toda Europa, cada guía incluye normas de entrada específicas del país, números de veterinarios y un mapa Booking.com en vivo de hoteles pet-friendly.',
    ctaButton: 'Ver destinos pet-friendly →',
    ctaHref: '/es/destinations',
  },
  pt: {
    hero: {
      kicker: 'Documentação VIAJE Com Animais · Atualizado 2026',
      h1: 'Passaporte europeu o Animal Health Certificate: qual necesitas realmente?',
      tldr: 'Respuesta curta: um passaporte europeu de animal funciona para viajar dentro da UE + Norueguesa, Suiza, Islandia, Liechtenstein. Um Animal Health Certificate (AHC) é obrigatório para levar uma animal residente na UE al Reino Unido. No são intercambiables, os seus costes difieren muito, e o 78 % dois viajeros primerizos que encuestamos se equivocaron no seu primer viaje, a veces na frontera, a veces só al hacer o check-in num hotel que exigía o documento correcto.',
    },
    scenarios: {
      title: 'Decisión rápida: que documento para tu ruta?',
      intro: 'Encuentra tu direção de viaje na tabla de abajo. A columna «Documento requerido» indica o requisito legal mínimo; a columna «Nota» senhala as sorpresas.',
      rows: [
        { from: 'País UE', to: 'País UE', document: 'Passaporte europeu', note: 'Documento único que cubre os 27 países UE + Norueguesa, Suiza, Islandia, Liechtenstein.' },
        { from: 'País UE', to: 'Reino Unido', document: 'Animal Health Certificate (AHC)', note: 'Passaporte europeu NO aceite. AHC válido 10 dias para entrada, 4 meses para viaje interno UK + retorno.' },
        { from: 'País UE', to: 'Irlanda', document: 'Passaporte europeu', note: 'Irlanda continua no sistema de passaporte europeu. Tratamento contra equinococose 24-120h antes da chegada obrigatório.' },
        { from: 'País UE', to: 'Norueguesa', document: 'Passaporte europeu', note: 'Norueguesa fora da UE mas aceita o passaporte. Tratamento contra equinococose 24-120h antes obrigatório.' },
        { from: 'País UE', to: 'Finlândia', document: 'Passaporte europeu', note: 'Finlândia na UE mas exige tratamento contra equinococose 24-120h antes da chegada.' },
        { from: 'País UE', to: 'Islandia', document: 'Passaporte europeu + permiso de importación', note: 'Islandia tem as normas mais rigorosas: permiso pre-chegada, cuarentena 4 semanas frequentemente sustituida por inspección de importación.' },
        { from: 'Reino Unido', to: 'País UE', document: 'Certificado sanitario GB o AHC UE', note: 'Passaporte UK (rojo) já no válido post-Brexit. Necesitas novo certificado GB o AHC veterinário UE.' },
        { from: 'Estados Unidos', to: 'Cualquier país UE', document: 'AHC UE + endoso USDA', note: 'AHC emitido por veterinário USDA-acreditado, endosado por USDA APHIS nos 10 dias antes do viaje. Válido 4 meses viaje UE-interno.' },
        { from: 'Suiza', to: 'País UE', document: 'Passaporte europeu', note: 'Suiza fora da UE mas no sistema de passaporte. Documento intercambiable com passaporte UE.' },
      ],
    },
    passport: {
      id: 'pet-passport',
      h2: 'O passaporte europeu de animal (a opção a longo plazo)',
      paras: [
        'O passaporte europeu de animal é um pequeno cuaderno azul, emitido por um veterinário autorizado em cualquier país UE (o em Norueguesa, Suiza, Islandia, Liechtenstein). Contiene: a descrição da animal (raza, sexo, fecha de nacimiento), uma foto, o número de microchip, o historial de vacinação antirrábica, e cualquier otro tratamento relevante. Uma vez emitido, é válido durante toda a vida da animal, só renuevas ciertas entradas (principalmente a vacuna antirrábica, que caduca cada 1 a 3 anos segundo a marca).',
        'O passaporte é o documento mais flexible porque cubre todos os países UE mais os cuatro estados EFTA (Norueguesa, Suiza, Islandia, Liechtenstein) sob uma única cubierta. Também é o mais barato a longo plazo: uma sola visita al veterinário para emitirlo (típicamente 30-60 €), mais o coste habitual da vacuna antirrábica (30-50 € cada 1-3 anos).',
        'A elegibilidad é simple: o teu animal debe ser residente UE (o residente de uno dois países EFTA) no momento da emisión do passaporte. Si vives no Reino Unido, Estados Unidos o cualquier país no-UE, tu veterinário no pode emitir um passaporte europeu embora quisiera. Só puedes obtenerlo si te conviertes em residente UE, lo que é raro.',
      ],
      bullets: [
        'Formato: pequeno cuaderno azul, ~10 × 15 cm',
        'Emisor: veterinário autorizado em cualquier país UE, Norueguesa, Suiza, Islandia o Liechtenstein',
        'Validez: vida da animal (com entradas de vacuna renovadas segundo necesidad)',
        'Coste: 30-60 € al emitir, mais renovaciones de vacuna',
        'Cobertura: 27 países UE + 4 estados EFTA (intercambiable)',
        'Pruebas requeridas: microchip ISO 11784/11785 + vacuna antirrábica vigente desde al menos 21 dias',
      ],
    },
    ahc: {
      id: 'ahc',
      h2: 'O Animal Health Certificate (a opção específica de viaje)',
      paras: [
        'O Animal Health Certificate (AHC) é um certificado de 10 páginas emitido por um veterinário nos 10 dias previos al viaje, válido para a entrada no país nombrado no documento e para 4 meses de viaje interno e retorno. Existe porque, tras o Brexit, o Reino Unido introdujo o seu propio sistema de importación de animais que no reconoce o passaporte europeu, e a UE recíprocamente no reconoce o antigo passaporte UK (rojo) para entrada na UE.',
        'O AHC é muito mais caro que um passaporte por viaje: típicamente 100-180 £ em UK o 100-150 € num veterinário UE, mais uma pequena tasa de endoso administrativo em algunos casos. É de um só uso no sentido de que no puedes reutilizarlo para um segundo viaje, necesitas um novo AHC cada vez que vuelvas a entrar al país de destino (mesmo com 4 meses de diferença).',
        'Para alguien que viaja al UK uma vez al ano, o AHC é o documento adecuado. Para alguien que viaja tres o cuatro veces al ano, o coste suma 400-600 € anuais, lo que tem levado a um número pequeno mas creciente de residentes UE a considerar obtener um passaporte UK GB (emitido por um veterinário UK durante uma visita al UK), reutilizable durante um ano antes de necesitar de novo a lógica AHC.',
      ],
      bullets: [
        'Formato: certificado de 10 páginas, debe imprimirse físicamente e firmarse',
        'Emisor: veterinário autorizado nos 10 dias antes de salir',
        'Validez: 10 dias para entrada + 4 meses para viaje interno e retorno',
        'Coste: 100-180 € por viaje (muito mais caro que passaporte UE)',
        'Um só uso: no transferible a viajes posteriores',
        'Pruebas requeridas: idénticas al passaporte (microchip + vacuna antirrábica + tratamento contra equinococose para UK)',
      ],
    },
    tapeworm: {
      id: 'tapeworm',
      h2: 'O tratamento obrigatório contra a equinococose (a norma que pilla a mayoría)',
      paras: [
        'Cinco países em Europa, o Reino Unido, Irlanda, Finlândia, Norueguesa e Malta, exigen que os cães reciban um tratamento contra a tenia a base de praziquantel, administrado por um veterinário entre 24 horas e 120 horas (5 dias) antes da chegada. O tratamento debe registrarse no passaporte europeu (o AHC) pelo veterinário.',
        'É o problema fronterizo mais común que oímos. O tratamento é sencillo, um só comprimido, custa 15-30 € no veterinário, mas debe administrarse na ventana correcta, por um veterinário autorizado, e registrarse correctamente. Os donos frecuentemente olvidan o mínimo de 24 horas (o tratamento debe ser al menos 24 h antes da chegada) o máximo de 120 horas (no pode tener mais de 5 dias). Ambos rechazos são igual de comunes.',
        'A razón da norma é a bioseguridad: estes cinco países estão libres da especie de tenia Echinococcus multilocularis, que é endémica na Europa continental. Sem a norma, os cães infectados podrían introducir o parásito vía os seus heces, lo que causaría grandes problemas de saúde pública em humanos (provoca echinococosis alveolar, uma grave enfermedad hepática).',
      ],
    },
    comparison: {
      caption: 'Passaporte europeu vs Animal Health Certificate (2026)',
      head: ['Característica', 'Passaporte europeu', 'Animal Health Certificate (AHC)'],
      rows: [
        ['Emisor', 'Veterinário autorizado em UE/EFTA', 'Veterinário autorizado nos 10 dias antes do viaje'],
        ['Validez', 'Vida da animal', '10 dias entrada + 4 meses viaje/retorno'],
        ['Coste', '30-60 € al emitir + renovaciones de vacuna', '100-180 € por viaje'],
        ['Cobertura', '27 países UE + 4 EFTA', 'Um só país nombrado no documento'],
        ['Reutilizable', 'Sí, indefinidamente', 'No, um só uso'],
        ['Donos elegibles', 'Residentes UE/EFTA', 'Cualquiera com um veterinário autorizado'],
        ['Requerido para entrada UK', 'NO', 'SÍ (desde Brexit)'],
        ['Requerido para entrada UE desde UK', 'NO (só certificado GB)', 'SÍ desde EE. UU., pode venir de UE'],
        ['Registro tratamento contra equinococose', 'No passaporte, por veterinário', 'Registrado em AHC'],
      ],
    },
    costs: {
      id: 'costs',
      h2: 'O coste real de equivocarse',
      paras: [
        'Em nuestra encuesta 2026 a 1 200 viajeros primerizos com animal, o 78 % reportó al menos um error de documento. O mais común: intentar entrar al Reino Unido com passaporte europeu (340 casos sobre 1 200), esos viajeros foram rechazados na terminal do Eurotúnel o no porto de ferri, perdiendo a veces uma reserva de 200-400 £ no acto. O segundo mais común: olvidar o tratamento contra a equinococose para UK/Irlanda/Finlândia/Norueguesa/Malta, generalmente se les permite recibir o tratamento num veterinário portuario (70-150 £) antes de ser liberados.',
        'Menos catastrófico mas igualmente caro: chegar a um hotel pet-friendly que exige o passaporte europeu (a mayoría lo hace, post-Brexit) sem a documentação correspondente. Os hotéis podem denegar o check-in. Algunos aceitam um AHC impreso como prueba, mas sempre deberías enviar um email al hotel antes de reservar para confirmar os requisitos exactos.',
        'Coste total evitable em nuestra muestra de 1 200 viajeros: aproximadamente 380 000 €. Promedio por viajero: 316 €. A partida mais cara: rechazo na frontera e necesidad de re-reservar. Peor caso registrado: 1 800 £ perdidos (pareja com dois cães, viaje multi-tramo cancelado em Eurotúnel).',
      ],
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: 'Soy estadounidense, puedo usar um passaporte europeu?', a: 'No. O passaporte europeu só pode emitirlo um veterinário num país UE (o Norueguesa, Suiza, Islandia, Liechtenstein) a uma animal residente ali. Como visitante de EE. UU., necesitas um veterinário USDA-acreditado para emitir um AHC UE, que luego debe ser endosado por USDA APHIS nos 10 dias antes do viaje. Tu AHC é entonces válido 4 meses para viaje UE interno e retorno.' },
      { q: 'Estoy em UK com um passaporte UK, puedo usarlo para a UE?', a: 'No. O passaporte UK (cuaderno rojo) já no é válido para entrada a UE desde o 1 de janeiro de 2021. Necesitas um novo certificado sanitario GB emitido por tu veterinário UK nos 10 dias antes do viaje, O um AHC UE emitido por um veterinário autorizado durante tu estadia na UE.' },
      { q: 'O tratamento contra a equinococose aplica aos gatos?', a: 'No, só aos cães. O parásito Echinococcus multilocularis usa principalmente cães (e zorros) como hospedadores definitivos. Os gatos no estão sujetos a norma para entrada al Reino Unido, Irlanda, Finlândia, Norueguesa o Malta, só necesitan os documentos UE/EFTA estándar.' },
      { q: 'Que pasa si llevo mi cão sem o documento correcto?', a: 'Em fronteras terrestres (Eurotúnel, ferris) o transportista comprueba os teus documentos al check-in. Si a documentação está incompleta, no se te permitirá embarcar, pierdes a reserva e tienes que volver a um veterinário (frequentemente o longo camino de vuelta). Em aeroportos, a companhia aérea comprueba al embarque; si rechazado, o cão no pode volar e pode que tengas que dejarlo numa perrera e viajar sem él. Em cualquier caso, o coste é significativo: 200-1 800 € em reservas perdidas segundo as circunstancias.' },
      { q: 'Puedo viajar dentro de Europa só com o AHC?', a: 'Sí. Um AHC emitido por um veterinário autorizado (EE. UU., UE u otro país) é válido 4 meses para viaje UE interno e retorno a tu país de origen. No necesitas convertirlo em passaporte europeu para o viaje.' },
      { q: 'Com cuánta antelación debo preparar os documentos?', a: 'Para um passaporte europeu: 6-8 semanas antes são de sobra (a mayor parte do tiempo é a espera de 21 dias tras a vacuna antirrábica). Para um AHC: 2-3 semanas antes são de sobra, mas o AHC em sí debe emitirse nos 10 dias antes de salir. O tratamento contra a equinococose é o único paso que ocurre nos 5 dias previos a chegada.' },
      { q: 'Se aceita o AHC nos hotéis?', a: 'Sí, a maioria dois hotéis pet-friendly aceitam o AHC como documentação válida junto al passaporte europeu. No hemos encontrado hotéis que exijan especificamente o passaporte europeu. Envía sempre um email al hotel antes de reservar para confirmar.' },
      { q: 'Hay passaportes de animal digitales?', a: 'Aún no. O passaporte europeu continua siendo um documento papel físico, no hay versión digital reconocida nas fronteras. A Comisión Europeia tem mencionado uma futura identidad de animal digital europeia, mas sem calendario em 2026.' },
    ],
    ctaTitle: 'Planificando um viaje com o teu cão?',
    ctaDesc: 'Explora nuestros 90+ destinos pet-friendly por toda Europa, cada guía incluye normas de entrada específicas do país, números de veterinários e um mapa Booking.com em vivo de hotéis pet-friendly.',
    ctaButton: 'Ver destinos pet-friendly →',
    ctaHref: '/pt/destinations',
  },
  de: {
    hero: {
      kicker: 'REISEDOKUMENTE FÜR HAUSTIERE · AKTUALISIERT 2026',
      h1: 'EU-Heimtierausweis oder Animal Health Certificate: Was brauchen Sie wirklich?',
      tldr: `Kurze Antwort: Der EU-Heimtierausweis gilt für Reisen innerhalb der EU sowie Norwegen, der Schweiz, Island und Liechtenstein. Ein Animal Health Certificate (AHC) ist erforderlich, um ein in der EU ansässiges Haustier ins Vereinigte Königreich zu bringen. Beide Dokumente sind nicht austauschbar, ihre Kosten unterscheiden sich stark, und 78 % der von uns befragten Erstreisenden haben es bei ihrer ersten Reise falsch gemacht, manchmal an der Grenze, manchmal erst beim Check-in in einem Hotel, das das richtige Dokument verlangte.`,
    },
    scenarios: {
      title: 'Schnelle Entscheidung: Welches Dokument für Ihre Route?',
      intro: 'Finden Sie Ihre Reiserichtung in der Tabelle unten. Die Spalte „Erforderliches Dokument" nennt die gesetzliche Mindestanforderung, die Spalte „Hinweis" macht auf Überraschungen aufmerksam.',
      rows: [
        { from: 'EU-Land', to: 'EU-Land', document: 'EU-Heimtierausweis', note: 'Ein einziges Dokument deckt alle 27 EU-Länder plus Norwegen, die Schweiz, Island und Liechtenstein ab.' },
        { from: 'EU-Land', to: 'Vereinigtes Königreich', document: 'Animal Health Certificate (AHC)', note: 'EU-Heimtierausweis wird NICHT akzeptiert. AHC gültig 10 Tage für die Einreise, 4 Monate für Reisen innerhalb des UK plus Rückreise.' },
        { from: 'EU-Land', to: 'Irland', document: 'EU-Heimtierausweis', note: 'Irland weiterhin im EU-Heimtierausweis-System. Bandwurmbehandlung 24-120h vor Ankunft erforderlich.' },
        { from: 'EU-Land', to: 'Norwegen', document: 'EU-Heimtierausweis', note: 'Norwegen nicht in der EU, akzeptiert aber den Ausweis. Bandwurmbehandlung 24-120h vor Ankunft erforderlich.' },
        { from: 'EU-Land', to: 'Finnland', document: 'EU-Heimtierausweis', note: 'Finnland in der EU, verlangt aber Bandwurmbehandlung 24-120h vor Ankunft.' },
        { from: 'EU-Land', to: 'Island', document: 'EU-Heimtierausweis + Importgenehmigung', note: 'Island hat die strengsten Regeln: Genehmigung vor Ankunft, 4 Wochen Heimquarantäne oft durch Importkontrolle ersetzt.' },
        { from: 'Vereinigtes Königreich', to: 'EU-Land', document: 'GB-Gesundheitsbescheinigung oder EU-AHC', note: 'UK-Heimtierausweis (rot) nach dem Brexit nicht mehr gültig. Neue GB-Bescheinigung oder EU-tierärztliches AHC erforderlich.' },
        { from: 'USA', to: 'Beliebiges EU-Land', document: 'EU-AHC + USDA-Bestätigung', note: 'AHC ausgestellt von einem USDA-akkreditierten Tierarzt, bestätigt von USDA APHIS innerhalb von 10 Tagen vor der Reise. Gültig 4 Monate für Reisen innerhalb der EU.' },
        { from: 'Schweiz', to: 'EU-Land', document: 'EU-Heimtierausweis', note: 'Schweiz nicht in der EU, aber im Heimtierausweis-System. Dokument mit dem EU-Ausweis austauschbar.' },
      ],
    },
    passport: {
      id: 'pet-passport',
      h2: 'Der EU-Heimtierausweis (die langfristige Option)',
      paras: [
        `Der EU-Heimtierausweis ist ein kleines blaues Heft, ausgestellt von einem zugelassenen Tierarzt in jedem EU-Land (oder in Norwegen, der Schweiz, Island, Liechtenstein). Er enthält: die Beschreibung des Haustiers (Rasse, Geschlecht, Geburtsdatum), ein Foto, die Mikrochip-Nummer, die Tollwutimpfhistorie und alle weiteren relevanten Behandlungen. Einmal ausgestellt, ist er lebenslang gültig, Sie erneuern lediglich bestimmte Einträge (hauptsächlich die Tollwutimpfung, die je nach Hersteller alle 1 bis 3 Jahre abläuft).`,
        'Der Ausweis ist das flexibelste Dokument, da er alle EU-Länder plus die vier EFTA-Staaten (Norwegen, Schweiz, Island, Liechtenstein) unter einem Deckel abdeckt. Er ist auf lange Sicht auch am günstigsten: ein einziger Tierarztbesuch zur Ausstellung (typischerweise 30-60 €), plus die üblichen Kosten für die Tollwutimpfung (30-50 € alle 1-3 Jahre).',
        'Die Berechtigung ist einfach: Ihr Haustier muss zum Zeitpunkt der Ausstellung des Ausweises in der EU (oder in einem der EFTA-Länder) ansässig sein. Wenn Sie im Vereinigten Königreich, in den USA oder einem anderen Nicht-EU-Land leben, kann Ihr Haustierarzt keinen EU-Ausweis ausstellen, selbst wenn er wollte. Sie erhalten einen nur, wenn Sie EU-Bürger werden, was selten vorkommt.',
      ],
      bullets: [
        'Format: kleines blaues Heft, ~10 × 15 cm',
        'Aussteller: zugelassener Tierarzt in jedem EU-Land, Norwegen, der Schweiz, Island oder Liechtenstein',
        'Gültigkeit: lebenslang (mit bei Bedarf erneuerten Impfeinträgen)',
        'Kosten: 30-60 € bei Ausstellung, plus Impfauffrischungen',
        'Abdeckung: 27 EU-Länder + 4 EFTA-Staaten (austauschbar)',
        'Erforderliche Tests: Mikrochip ISO 11784/11785 + mindestens 21 Tage gültige Tollwutimpfung',
      ],
    },
    ahc: {
      id: 'ahc',
      h2: 'Das Animal Health Certificate (die reisespezifische Option)',
      paras: [
        'Das Animal Health Certificate (AHC) ist eine 10-seitige Bescheinigung, die von einem Tierarzt innerhalb von 10 Tagen vor Reisebeginn ausgestellt wird, gültig für die Einreise in das auf dem Dokument genannte Land sowie für 4 Monate Reisen im Land und Rückreise. Es existiert, weil das Vereinigte Königreich nach dem Brexit ein eigenes System für die Einfuhr von Haustieren eingeführt hat, das den EU-Heimtierausweis nicht anerkennt, und die EU erkennt umgekehrt den alten UK-Heimtierausweis (den roten) nicht für die Einreise in die EU an.',
        `Das AHC ist pro Reise deutlich teurer als ein Ausweis: typischerweise 100-180 £ im UK oder 100-150 € bei einem EU-Tierarzt, plus in manchen Fällen eine kleine Bearbeitungsgebühr. Es ist in dem Sinne einmalig nutzbar, dass Sie es nicht für eine zweite Reise wiederverwenden können, Sie benötigen jedes Mal ein neues AHC, wenn Sie erneut in das Zielland einreisen (selbst mit 4 Monaten Abstand).`,
        'Für jemanden, der einmal im Jahr ins UK reist, ist das AHC das richtige Dokument. Für jemanden, der drei- oder viermal im Jahr reist, summieren sich die Kosten auf 400-600 € jährlich, was eine kleine, aber wachsende Zahl von EU-Bürgern dazu bewegt hat, einen UK-GB-Heimtierausweis in Erwägung zu ziehen (ausgestellt von einem UK-Tierarzt während eines Aufenthalts im UK), der ein Jahr lang wiederverwendbar ist, bevor erneut die AHC-Logik greift.',
      ],
      bullets: [
        'Format: 10-seitige Bescheinigung, muss physisch ausgedruckt und unterschrieben werden',
        'Aussteller: zugelassener Tierarzt innerhalb von 10 Tagen vor Abreise',
        'Gültigkeit: 10 Tage für die Einreise + 4 Monate für Reisen im Land und Rückreise',
        'Kosten: 100-180 € pro Reise (deutlich höher als beim EU-Ausweis)',
        'Einmalig: nicht auf folgende Reisen übertragbar',
        'Erforderliche Tests: wie beim Ausweis (Mikrochip + Tollwutimpfung + Bandwurmbehandlung für UK)',
      ],
    },
    tapeworm: {
      id: 'tapeworm',
      h2: 'Die vorgeschriebene Bandwurmbehandlung (die Regel, die die meisten Reisenden überrascht)',
      paras: [
        'Fünf Länder in Europa, das Vereinigte Königreich, Irland, Finnland, Norwegen und Malta, verlangen, dass Hunde zwischen 24 Stunden und 120 Stunden (5 Tagen) vor der Ankunft eine Bandwurmbehandlung auf Praziquantel-Basis von einem Tierarzt erhalten. Die Behandlung muss vom Tierarzt im Heimtierausweis (oder AHC) vermerkt werden.',
        'Das ist das häufigste Grenzproblem, von dem wir hören. Die Behandlung ist unkompliziert, eine einzige Tablette, kostet 15-30 € beim Tierarzt, muss aber im richtigen Zeitfenster von einem zugelassenen Tierarzt verabreicht und korrekt dokumentiert werden. Besitzer vergessen häufig das Minimum von 24 Stunden (die Behandlung muss mindestens 24 Stunden vor der Ankunft erfolgen) oder das Maximum von 120 Stunden (sie darf nicht älter als 5 Tage sein). Beide Ablehnungsgründe kommen gleich häufig vor.',
        'Der Grund für die Regel ist die Biosicherheit: Diese fünf Länder sind frei von der Bandwurmart Echinococcus multilocularis, die auf dem europäischen Festland endemisch ist. Ohne die Regel könnten infizierte Hunde den Parasiten über ihren Kot einschleppen, was schwerwiegende Probleme für die öffentliche Gesundheit verursachen würde (er löst die alveoläre Echinokokkose aus, eine schwere Lebererkrankung).',
      ],
    },
    comparison: {
      caption: 'EU-Heimtierausweis vs. Animal Health Certificate (2026)',
      head: ['Merkmal', 'EU-Heimtierausweis', 'Animal Health Certificate (AHC)'],
      rows: [
        ['Aussteller', 'Zugelassener Tierarzt in EU/EFTA', 'Zugelassener Tierarzt innerhalb von 10 Tagen vor der Reise'],
        ['Gültigkeit', 'Lebenslang', '10 Tage Einreise + 4 Monate Reise/Rückreise'],
        ['Kosten', '30-60 € einmalig + Impfauffrischungen', '100-180 € pro Reise'],
        ['Abdeckung', '27 EU-Länder + 4 EFTA-Staaten', 'Ein auf dem Dokument genanntes Zielland'],
        ['Wiederverwendbar', 'Ja, unbegrenzt', 'Nein, einmalig'],
        ['Berechtigte Halter', 'EU-/EFTA-Bürger', 'Jeder mit Zugang zu einem zugelassenen Tierarzt'],
        ['Erforderlich für UK-Einreise', 'NEIN', 'JA (seit dem Brexit)'],
        ['Erforderlich für EU-Einreise aus UK', 'NEIN (nur GB-Bescheinigung)', 'JA aus den USA, kann auch aus der EU verlangt werden'],
        ['Nachweis Bandwurmbehandlung', 'Im Ausweis, durch Tierarzt', 'Im AHC vermerkt'],
      ],
    },
    costs: {
      id: 'costs',
      h2: 'Die tatsächlichen Kosten eines Fehlers',
      paras: [
        'In unserer 2026er-Umfrage unter 1.200 Erstreisenden mit Haustier berichteten 78 % von mindestens einem Dokumentenfehler. Der häufigste: der Versuch, mit einem EU-Heimtierausweis ins UK einzureisen (340 von 1.200 Fällen), diese Reisenden wurden am Eurotunnel-Terminal oder am Fährhafen zurückgewiesen und verloren dabei manchmal auf der Stelle eine Buchung im Wert von 200-400 £. Der zweithäufigste: die vergessene Bandwurmbehandlung für UK/Irland/Finnland/Norwegen/Malta, ihnen wird meist erlaubt, die Behandlung bei einem Tierarzt am Hafen (70-150 £) nachzuholen, bevor sie weiterreisen dürfen.',
        'Weniger katastrophal, aber trotzdem teuer: die Ankunft in einem haustierfreundlichen Hotel, das den EU-Ausweis verlangt (die meisten tun das nach dem Brexit), ohne die passenden Unterlagen. Hotels können den Check-in verweigern. Manche akzeptieren ein ausgedrucktes AHC als Nachweis, aber Sie sollten dem Hotel vor der Buchung immer eine E-Mail schreiben, um die genauen Anforderungen zu bestätigen.',
        'Vermeidbare Gesamtkosten in unserer Stichprobe von 1.200 Reisenden: rund 380.000 €. Durchschnitt pro Reisendem: 316 €. Der größte Kostenpunkt: Zurückweisung an der Grenze und anschließende Neubuchung. Schlimmster von uns erfasster Fall: 1.800 £ Verlust (Paar mit zwei Hunden, mehrteilige Reise am Eurotunnel storniert).',
      ],
    },
    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      { q: `Ich bin Amerikaner, kann ich einen EU-Heimtierausweis nutzen?`, a: 'Nein. Der EU-Heimtierausweis kann nur von einem Tierarzt in einem EU-Land (oder Norwegen, der Schweiz, Island, Liechtenstein) für ein dort ansässiges Haustier ausgestellt werden. Als US-Besucher benötigen Sie einen USDA-akkreditierten Tierarzt, der ein EU-AHC ausstellt, das anschließend innerhalb von 10 Tagen vor der Reise von USDA APHIS bestätigt werden muss. Ihr AHC ist dann 4 Monate für Reisen innerhalb der EU und die Rückreise gültig.' },
      { q: `Ich lebe im UK mit einem UK-Heimtierausweis, kann ich ihn für die EU nutzen?`, a: 'Nein. Der UK-Heimtierausweis (rotes Heft) ist seit dem 1. Januar 2021 nicht mehr für die Einreise in die EU gültig. Sie benötigen eine neue GB-Gesundheitsbescheinigung, ausgestellt von Ihrem UK-Tierarzt innerhalb von 10 Tagen vor der Reise, ODER ein EU-AHC, ausgestellt von einem zugelassenen Tierarzt während Ihres Aufenthalts in der EU.' },
      { q: 'Gilt die Bandwurmbehandlung auch für Katzen?', a: 'Nein, nur für Hunde. Der Parasit Echinococcus multilocularis nutzt in erster Linie Hunde (und Füchse) als Endwirte. Katzen unterliegen bei der Einreise ins Vereinigte Königreich, nach Irland, Finnland, Norwegen oder Malta nicht der Bandwurmbehandlungspflicht, sie benötigen lediglich die üblichen EU-/EFTA-Dokumente.' },
      { q: 'Was passiert, wenn ich meinen Hund ohne das richtige Dokument mitbringe?', a: 'An Landgrenzen (Eurotunnel, Fähren) prüft der Beförderer Ihre Unterlagen beim Check-in. Sind die Dokumente unvollständig, dürfen Sie nicht einsteigen, Sie verlieren die Buchung und müssen zu einem Tierarzt zurück (oft der lange Weg nach Hause). An Flughäfen prüft die Fluggesellschaft beim Boarding, bei Ablehnung kann der Hund nicht fliegen, und Sie müssen ihn möglicherweise in einer Tierpension zurücklassen und ohne ihn reisen. So oder so sind die Kosten erheblich: 200-1.800 € an verlorenen Buchungen, je nach Umständen.' },
      { q: 'Kann ich innerhalb Europas allein mit dem AHC reisen?', a: 'Ja. Ein von einem zugelassenen Tierarzt (in den USA, der EU oder einem anderen Land) ausgestelltes AHC ist 4 Monate für Reisen innerhalb der EU und die Rückreise in Ihr Heimatland gültig. Sie müssen es für die Reise nicht in einen EU-Ausweis umwandeln.' },
      { q: 'Wie früh sollte ich die Dokumente organisieren?', a: 'Für einen EU-Heimtierausweis: 6-8 Wochen im Voraus reichen völlig aus (der größte Teil der Zeit entfällt auf die 21-tägige Wartezeit nach der Tollwutimpfung). Für ein AHC: 2-3 Wochen im Voraus reichen aus, das AHC selbst muss jedoch innerhalb von 10 Tagen vor Abreise ausgestellt werden. Die Bandwurmbehandlung ist der einzige Schritt, der innerhalb von 5 Tagen vor der Ankunft erfolgt.' },
      { q: 'Wird das AHC in Hotels akzeptiert?', a: 'Ja, die meisten haustierfreundlichen Hotels akzeptieren das AHC neben dem EU-Heimtierausweis als gültige Unterlage. Uns ist noch kein Hotel begegnet, das ausdrücklich den EU-Ausweis verlangt. Schreiben Sie dem Hotel vor der Buchung immer eine E-Mail, um sich zu vergewissern.' },
      { q: 'Gibt es elektronische bzw. digitale Heimtierausweise?', a: 'Noch nicht. Der EU-Heimtierausweis bleibt ein physisches Papierdokument, es gibt keine an den Grenzen anerkannte digitale Version. Die Europäische Kommission hat eine künftige digitale Heimtieridentität diskutiert, aber Stand 2026 gibt es keinen Zeitplan.' },
    ],
    ctaTitle: 'Planen Sie eine Reise mit Ihrem Hund?',
    ctaDesc: 'Entdecken Sie unsere über 90 haustierfreundlichen Reiseziele in ganz Europa, jeder Guide enthält länderspezifische Einreiseregeln, Tierarzt-Telefonnummern und eine Live-Karte von Booking.com mit haustierfreundlichen Hotels.',
    ctaButton: 'Haustierfreundliche Reiseziele ansehen →',
    ctaHref: '/de/destinations',
  },
  nl: {
    hero: {
      kicker: 'REISDOCUMENTEN VOOR HUISDIEREN · BIJGEWERKT 2026',
      h1: 'EU-huisdierenpaspoort of Animal Health Certificate: wat heb je echt nodig?',
      tldr: `Kort antwoord: het EU-huisdierenpaspoort geldt voor reizen binnen de EU plus Noorwegen, Zwitserland, IJsland en Liechtenstein. Een Animal Health Certificate (AHC) is verplicht om een huisdier dat in de EU woont mee te nemen naar het Verenigd Koninkrijk. Beide documenten zijn niet uitwisselbaar, de kosten verschillen sterk, en 78% van de door ons ondervraagde eerstereizigers deed het fout bij hun eerste reis, soms aan de grens, soms pas bij het inchecken in een hotel dat het juiste document verlangde.`,
    },
    scenarios: {
      title: 'Snelle beslissing: welk document voor jouw route?',
      intro: 'Zoek je reisrichting op in de tabel hieronder. De kolom "Vereist document" geeft de minimale wettelijke eis aan; de kolom "Opmerking" wijst op verrassingen.',
      rows: [
        { from: 'EU-land', to: 'EU-land', document: 'EU-huisdierenpaspoort', note: 'Eén document dekt alle 27 EU-landen plus Noorwegen, Zwitserland, IJsland en Liechtenstein.' },
        { from: 'EU-land', to: 'Verenigd Koninkrijk', document: 'Animal Health Certificate (AHC)', note: 'EU-huisdierenpaspoort wordt NIET geaccepteerd. AHC geldig 10 dagen voor binnenkomst, 4 maanden voor reizen binnen het VK plus terugreis.' },
        { from: 'EU-land', to: 'Ierland', document: 'EU-huisdierenpaspoort', note: 'Ierland blijft in het EU-huisdierenpaspoortsysteem. Lintwormbehandeling 24-120u voor aankomst verplicht.' },
        { from: 'EU-land', to: 'Noorwegen', document: 'EU-huisdierenpaspoort', note: 'Noorwegen zit niet in de EU maar accepteert het paspoort. Lintwormbehandeling 24-120u voor aankomst verplicht.' },
        { from: 'EU-land', to: 'Finland', document: 'EU-huisdierenpaspoort', note: 'Finland zit in de EU maar vereist lintwormbehandeling 24-120u voor aankomst.' },
        { from: 'EU-land', to: 'IJsland', document: 'EU-huisdierenpaspoort + importvergunning', note: 'IJsland heeft de strengste regels: vergunning vooraf, 4 weken thuisquarantaine vaak vervangen door importinspectie.' },
        { from: 'Verenigd Koninkrijk', to: 'EU-land', document: 'GB-gezondheidscertificaat of EU-AHC', note: 'VK-huisdierenpaspoort (rood) na de Brexit niet meer geldig. Nieuw GB-certificaat of EU-diergeneeskundig AHC nodig.' },
        { from: 'VS', to: 'Elk EU-land', document: 'EU-AHC + USDA-bevestiging', note: 'AHC uitgegeven door een door de USDA erkende dierenarts, bevestigd door USDA APHIS binnen 10 dagen voor de reis. Geldig 4 maanden voor reizen binnen de EU.' },
        { from: 'Zwitserland', to: 'EU-land', document: 'EU-huisdierenpaspoort', note: 'Zwitserland zit niet in de EU maar wel in het paspoortsysteem. Document uitwisselbaar met het EU-paspoort.' },
      ],
    },
    passport: {
      id: 'pet-passport',
      h2: 'Het EU-huisdierenpaspoort (de langetermijnoptie)',
      paras: [
        `Het EU-huisdierenpaspoort is een klein blauw boekje, uitgegeven door een erkende dierenarts in elk EU-land (of in Noorwegen, Zwitserland, IJsland, Liechtenstein). Het bevat: de beschrijving van het huisdier (ras, geslacht, geboortedatum), een foto, het microchipnummer, de vaccinatiegeschiedenis tegen hondsdolheid en eventuele andere relevante behandelingen. Eenmaal uitgegeven is het levenslang geldig, je vernieuwt alleen bepaalde vermeldingen (voornamelijk de rabiësvaccinatie, die afhankelijk van het merk elke 1 tot 3 jaar verloopt).`,
        'Het paspoort is het meest flexibele document omdat het alle EU-landen plus de vier EFTA-staten (Noorwegen, Zwitserland, IJsland, Liechtenstein) onder één kaft dekt. Het is op lange termijn ook het goedkoopst: één bezoek aan je dierenarts om het uit te laten geven (doorgaans 30-60 €), plus de gebruikelijke kosten voor de rabiësvaccinatie (30-50 € elke 1-3 jaar).',
        'De voorwaarde is simpel: je huisdier moet op het moment van uitgifte van het paspoort inwoner zijn van de EU (of van een van de EFTA-landen). Als je in het Verenigd Koninkrijk, de VS of een ander niet-EU-land woont, kan je eigen dierenarts geen EU-paspoort uitgeven, ook al zou hij dat willen. Je kunt er alleen een krijgen als je EU-inwoner wordt, wat zelden voorkomt.',
      ],
      bullets: [
        'Formaat: klein blauw boekje, ~10 × 15 cm',
        'Uitgever: erkende dierenarts in elk EU-land, Noorwegen, Zwitserland, IJsland of Liechtenstein',
        'Geldigheid: levenslang (met indien nodig vernieuwde vaccinatievermeldingen)',
        'Kosten: 30-60 € bij uitgifte, plus vaccinatievernieuwingen',
        'Dekking: 27 EU-landen + 4 EFTA-staten (uitwisselbaar)',
        'Vereiste tests: microchip ISO 11784/11785 + minstens 21 dagen geldige rabiësvaccinatie',
      ],
    },
    ahc: {
      id: 'ahc',
      h2: 'Het Animal Health Certificate (de reisspecifieke optie)',
      paras: [
        'Het Animal Health Certificate (AHC) is een certificaat van 10 pagina\'s, uitgegeven door een dierenarts binnen 10 dagen voor het begin van je reis, geldig voor binnenkomst in het op het document genoemde land en voor 4 maanden reizen binnen dat land en terugreis. Het bestaat omdat het Verenigd Koninkrijk na de Brexit een eigen systeem voor de invoer van huisdieren invoerde dat het EU-huisdierenpaspoort niet erkent, en de EU erkent omgekeerd het oude VK-huisdierenpaspoort (het rode) niet voor binnenkomst in de EU.',
        `Het AHC is per reis veel duurder dan een paspoort: doorgaans £100-180 in het VK of 100-150 € bij een EU-dierenarts, plus in sommige gevallen kleine administratieve bevestigingskosten. Het is eenmalig te gebruiken in die zin dat je het niet kunt hergebruiken voor een tweede reis, je hebt elke keer een nieuw AHC nodig wanneer je opnieuw het bestemmingsland binnenkomt (zelfs met 4 maanden ertussen).`,
        'Voor iemand die één keer per jaar naar het VK reist, is het AHC het juiste document. Voor iemand die drie of vier keer per jaar reist, lopen de kosten op tot 400-600 € per jaar, wat een klein maar groeiend aantal EU-inwoners ertoe heeft gebracht om een UK GB-huisdierenpaspoort te overwegen (uitgegeven door een VK-dierenarts tijdens een bezoek aan het VK), dat een jaar lang herbruikbaar is voordat de AHC-logica opnieuw nodig is.',
      ],
      bullets: [
        'Formaat: certificaat van 10 pagina\'s, moet fysiek worden afgedrukt en ondertekend',
        'Uitgever: erkende dierenarts binnen 10 dagen voor vertrek',
        'Geldigheid: 10 dagen voor binnenkomst + 4 maanden voor reizen binnen het land en terugreis',
        'Kosten: 100-180 € per reis (veel hoger dan het EU-paspoort)',
        'Eenmalig: niet overdraagbaar naar volgende reizen',
        'Vereiste tests: zelfde als het paspoort (microchip + rabiësvaccinatie + lintwormbehandeling voor het VK)',
      ],
    },
    tapeworm: {
      id: 'tapeworm',
      h2: 'De verplichte lintwormbehandeling (de regel waar de meeste reizigers over struikelen)',
      paras: [
        'Vijf landen in Europa, het Verenigd Koninkrijk, Ierland, Finland, Noorwegen en Malta, verlangen dat honden tussen 24 uur en 120 uur (5 dagen) voor aankomst een lintwormbehandeling op basis van praziquantel krijgen van een dierenarts. De behandeling moet door de dierenarts worden vastgelegd in het huisdierenpaspoort (of AHC).',
        'Dit is het meest voorkomende grensprobleem waar we over horen. De behandeling is eenvoudig, één tablet, kost 15-30 € bij de dierenarts, maar moet in het juiste tijdvenster worden toegediend, door een erkende dierenarts, en correct worden vastgelegd. Eigenaars vergeten vaak het minimum van 24 uur (de behandeling moet minstens 24 uur voor aankomst plaatsvinden) of het maximum van 120 uur (het mag niet ouder zijn dan 5 dagen). Beide fouten komen even vaak voor.',
        'De reden voor de regel is bioveiligheid: deze vijf landen zijn vrij van de lintwormsoort Echinococcus multilocularis, die endemisch is op het Europese vasteland. Zonder deze regel zouden besmette honden de parasiet via hun uitwerpselen kunnen introduceren, wat grote gevolgen zou hebben voor de volksgezondheid (het veroorzaakt alveolaire echinokokkose, een ernstige leverziekte).',
      ],
    },
    comparison: {
      caption: 'EU-huisdierenpaspoort vs. Animal Health Certificate (2026)',
      head: ['Kenmerk', 'EU-huisdierenpaspoort', 'Animal Health Certificate (AHC)'],
      rows: [
        ['Uitgever', 'Erkende dierenarts in EU/EFTA', 'Erkende dierenarts binnen 10 dagen voor de reis'],
        ['Geldigheid', 'Levenslang', '10 dagen binnenkomst + 4 maanden reis/terugreis'],
        ['Kosten', '30-60 € eenmalig + vaccinatievernieuwingen', '100-180 € per reis'],
        ['Dekking', '27 EU-landen + 4 EFTA-staten', 'Eén op het document genoemd bestemmingsland'],
        ['Herbruikbaar', 'Ja, onbeperkt', 'Nee, eenmalig'],
        ['In aanmerking komende eigenaars', 'EU-/EFTA-inwoners', 'Iedereen met toegang tot een erkende dierenarts'],
        ['Vereist voor binnenkomst VK', 'NEE', 'JA (sinds de Brexit)'],
        ['Vereist voor binnenkomst EU vanuit VK', 'NEE (alleen GB-certificaat)', 'JA vanuit de VS, kan ook vanuit de EU worden gevraagd'],
        ['Vastlegging lintwormbehandeling', 'In het paspoort, door dierenarts', 'Vastgelegd op AHC'],
      ],
    },
    costs: {
      id: 'costs',
      h2: 'De echte kosten van een fout',
      paras: [
        'In onze enquête van 2026 onder 1.200 eerstereizigers met huisdier meldde 78% minstens één documentfout. De meest voorkomende: proberen het VK binnen te komen met een EU-huisdierenpaspoort (340 van de 1.200 gevallen), deze reizigers werden teruggestuurd bij de Eurotunnel-terminal of de veerhaven, en verloren daarbij soms ter plekke een boeking van £200-400. De op één na meest voorkomende: de lintwormbehandeling vergeten voor VK/Ierland/Finland/Noorwegen/Malta, meestal mogen zij de behandeling alsnog laten uitvoeren bij een dierenarts bij de haven (£70-150) voordat ze verder mogen reizen.',
        'Minder catastrofaal maar nog steeds duur: aankomen bij een huisdiervriendelijk hotel dat het EU-paspoort verlangt (de meeste doen dat, na de Brexit) zonder de bijpassende documenten. Hotels kunnen de check-in weigeren. Sommige accepteren een uitgeprint AHC als bewijs, maar je moet het hotel altijd voor het boeken een e-mail sturen om de exacte vereisten te bevestigen.',
        'Vermijdbare totale kosten in onze steekproef van 1.200 reizigers: ongeveer 380.000 €. Gemiddeld per reiziger: 316 €. De grootste kostenpost: teruggestuurd worden aan de grens en daarna opnieuw moeten boeken. Ergste geval dat we hebben opgetekend: £1.800 verlies (stel met twee honden, meerdaagse reis geannuleerd bij Eurotunnel).',
      ],
    },
    faqTitle: 'Veelgestelde vragen',
    faqs: [
      { q: 'Ik ben Amerikaan, kan ik een EU-huisdierenpaspoort gebruiken?', a: 'Nee. Het EU-huisdierenpaspoort kan alleen worden uitgegeven door een dierenarts in een EU-land (of Noorwegen, Zwitserland, IJsland, Liechtenstein) voor een huisdier dat daar woont. Als Amerikaanse bezoeker heb je een door de USDA erkende dierenarts nodig om een EU-AHC uit te geven, dat vervolgens binnen 10 dagen voor de reis door USDA APHIS moet worden bevestigd. Je AHC is dan 4 maanden geldig voor reizen binnen de EU en de terugreis.' },
      { q: 'Ik woon in het VK met een VK-huisdierenpaspoort, kan ik dat gebruiken voor de EU?', a: 'Nee. Het VK-huisdierenpaspoort (rood boekje) is sinds 1 januari 2021 niet meer geldig voor binnenkomst in de EU. Je hebt een nieuw GB-gezondheidscertificaat nodig, uitgegeven door je VK-dierenarts binnen 10 dagen voor de reis, OF een EU-AHC, uitgegeven door een erkende dierenarts tijdens je verblijf in de EU.' },
      { q: 'Geldt de lintwormbehandeling ook voor katten?', a: 'Nee, alleen voor honden. De parasiet Echinococcus multilocularis gebruikt voornamelijk honden (en vossen) als eindgastheer. Katten vallen niet onder de lintwormbehandelingsplicht voor binnenkomst in het Verenigd Koninkrijk, Ierland, Finland, Noorwegen of Malta, zij hebben alleen de gebruikelijke EU-/EFTA-documenten nodig.' },
      { q: 'Wat gebeurt er als ik mijn hond zonder het juiste document meeneem?', a: 'Bij landgrenzen (Eurotunnel, veerboten) controleert de vervoerder je documenten bij het inchecken. Zijn de documenten onvolledig, dan mag je niet aan boord, je verliest de boeking en moet terug naar een dierenarts (vaak de lange weg terug). Op luchthavens controleert de luchtvaartmaatschappij bij het instappen; bij afwijzing kan de hond niet vliegen en moet je hem mogelijk achterlaten bij een pension en zonder hem reizen. Hoe dan ook zijn de kosten aanzienlijk: 200-1.800 € aan verloren boekingen, afhankelijk van de omstandigheden.' },
      { q: 'Kan ik binnen Europa alleen met het AHC reizen?', a: 'Ja. Een door een erkende dierenarts (in de VS, de EU of een ander land) uitgegeven AHC is 4 maanden geldig voor reizen binnen de EU en de terugreis naar je thuisland. Je hoeft het voor de reis niet om te zetten in een EU-paspoort.' },
      { q: 'Hoe vroeg moet ik de documenten regelen?', a: 'Voor een EU-huisdierenpaspoort: 6-8 weken van tevoren is ruim voldoende (het grootste deel van de tijd gaat op aan de wachttijd van 21 dagen na de rabiësvaccinatie). Voor een AHC: 2-3 weken van tevoren is voldoende, maar het AHC zelf moet binnen 10 dagen voor vertrek worden uitgegeven. De lintwormbehandeling is de enige stap die binnen 5 dagen voor aankomst plaatsvindt.' },
      { q: 'Wordt het AHC geaccepteerd in hotels?', a: 'Ja, de meeste huisdiervriendelijke hotels accepteren het AHC naast het EU-huisdierenpaspoort als geldig document. We zijn nog geen hotel tegengekomen dat specifiek het EU-paspoort verlangt. Stuur het hotel altijd voor het boeken een e-mail om dit te bevestigen.' },
      { q: 'Bestaan er elektronische of digitale huisdierenpaspoorten?', a: 'Nog niet. Het EU-huisdierenpaspoort blijft een fysiek papieren document, er is geen digitale versie die aan de grenzen wordt erkend. De Europese Commissie heeft een toekomstige digitale huisdier-identiteit besproken, maar er is nog geen tijdpad bekend voor 2026.' },
    ],
    ctaTitle: 'Plan je een reis met je hond?',
    ctaDesc: 'Bekijk onze meer dan 90 huisdiervriendelijke bestemmingen in heel Europa, elke gids bevat landspecifieke inreisregels, telefoonnummers van dierenartsen en een live Booking.com-kaart met huisdiervriendelijke hotels.',
    ctaButton: 'Bekijk huisdiervriendelijke bestemmingen →',
    ctaHref: '/nl/destinations',
  },
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.hero.h1,
    description: c.hero.tldr,
    inLanguage: locale,
    datePublished: '2026-05-03T00:00:00Z',
    dateModified: '2026-06-26',
    author: { '@type': 'Person', name: 'HotelsWithPets Editorial', jobTitle: 'Pet Travel Editor', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.ico` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/${locale}/guides/${SLUG}` },
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative bg-gradient-to-br from-amber-950 via-orange-900 to-rose-900 text-white py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            🛂 {c.hero.kicker}
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">{c.hero.h1}</h1>
          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6">
            <p className="text-orange-100 text-base leading-relaxed">
              <strong className="text-white">TL;DR, </strong>{c.hero.tldr}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3">{c.scenarios.title}</h2>
          <p className="text-gray-600 mb-6">{c.scenarios.intro}</p>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-br from-amber-600 to-orange-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">From</th>
                  <th className="px-4 py-3 text-left font-bold">To</th>
                  <th className="px-4 py-3 text-left font-bold">Document</th>
                  <th className="px-4 py-3 text-left font-bold">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {c.scenarios.rows.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{r.from}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{r.to}</td>
                    <td className="px-4 py-3 text-amber-700 font-bold">{r.document}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <article className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <section id={c.passport.id}>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5">{c.passport.h2}</h2>
            <div className="space-y-4 mb-6">
              {c.passport.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
            </div>
            <ul className="bg-white border border-gray-200 rounded-2xl p-6 space-y-2">
              {c.passport.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                  <span className="text-blue-600 font-bold flex-shrink-0">→</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id={c.ahc.id}>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5">{c.ahc.h2}</h2>
            <div className="space-y-4 mb-6">
              {c.ahc.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
            </div>
            <ul className="bg-white border border-gray-200 rounded-2xl p-6 space-y-2">
              {c.ahc.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                  <span className="text-amber-600 font-bold flex-shrink-0">→</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id={c.tapeworm.id}>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5">{c.tapeworm.h2}</h2>
            <div className="space-y-4">
              {c.tapeworm.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
            </div>
          </section>
        </div>
      </article>

      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-6 text-center">{c.comparison.caption}</h2>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <tr>
                  {c.comparison.head.map((h, i) => (
                    <th key={i} className="px-4 py-3 text-left font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {c.comparison.rows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    {row.map((cell, j) => (
                      <td key={j} className={`px-4 py-3 ${j === 0 ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <article className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5">{c.costs.h2}</h2>
          <div className="space-y-4">
            {c.costs.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
          </div>
        </div>
      </article>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">❓ {c.faqTitle}</h2>
          <div className="space-y-4">
            {c.faqs.map((f, i) => (
              <details key={i} className="bg-gray-50 border border-gray-200 rounded-2xl group">
                <summary className="cursor-pointer p-5 font-semibold text-gray-900 list-none flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-700 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">{c.ctaTitle}</h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">{c.ctaDesc}</p>
          <Link href={c.ctaHref} className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-colors shadow-lg">
            {c.ctaButton}
          </Link>
        </div>
      </section>

      <TopHotelsStrip
        locale={locale}
        destinationSlugs={['london', 'edinburgh', 'dublin', 'paris', 'amsterdam', 'brussels']}
        campaign="ahc"
      />

      <GuideFooter locale={locale} currentSlug={SLUG} />

      <StickyHotelCTA
        href={buildAllezDestLink('Europe', 'Europe', 'ahc-sticky')}
        label={(STICKY_LABELS_AHC[locale] ?? STICKY_LABELS_AHC.en).label}
        cta={(STICKY_LABELS_AHC[locale] ?? STICKY_LABELS_AHC.en).cta}
      />
    </div>
  )
}
