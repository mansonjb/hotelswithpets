import Link from 'next/link'
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

  const titles: Record<string, string> = {
    en: 'Road Trip with Your Dog in Europe: Safety, Laws & Border Crossing Guide (2025) | HotelsWithPets.com',
    fr: 'Road trip avec son chien en Europe : sécurité, lois et franchissement des frontières (2025) | HotelsWithPets.com',
    es: 'Road trip con tu perro en Europa: seguridad, leyes y cruce de fronteras (2025) | HotelsWithPets.com',
  }
  const descriptions: Record<string, string> = {
    en: 'Complete guide to road-tripping across Europe with your dog: car safety laws by country, harness vs crate, border crossings, Eurotunnel & ferry policies, heat safety, stops, and first aid essentials.',
    fr: 'Guide complet pour un road trip en voiture avec son chien en Europe : lois par pays, harnais vs caisse, franchissement des frontières, Eurotunnel, gestion de la chaleur et trousse de premiers secours.',
    es: 'Guía completa para un road trip por Europa con tu perro: leyes por país, arnés vs transportín, cruce de fronteras, Eurotunnel, gestión del calor y botiquín esencial.',
  }

  const today = new Date().toISOString().split('T')[0]

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/road-trip-chien`,
      languages: {
        en: `${SITE_URL}/en/guides/road-trip-chien`,
        fr: `${SITE_URL}/fr/guides/road-trip-chien`,
        es: `${SITE_URL}/es/guides/road-trip-chien`,
        'x-default': `${SITE_URL}/en/guides/road-trip-chien`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      type: 'article',
      publishedTime: '2025-01-01T00:00:00Z',
      modifiedTime: `${today}T00:00:00Z`,
    },
  }
}

// ─── Country restraint law data ────────────────────────────────────────────────

interface RestraintRule {
  flag: string
  country: Record<string, string>
  mandatory: Record<string, string>
  fine: Record<string, string>
  notes: Record<string, string>
}

const RESTRAINT_RULES: RestraintRule[] = [
  {
    flag: '🇫🇷',
    country: { en: 'France', fr: 'France', es: 'Francia' },
    mandatory: { en: 'Yes', fr: 'Oui', es: 'Sí' },
    fine: { en: 'Up to €750 (general distraction fine)', fr: "Jusqu'à 750 € (infraction distraction)", es: 'Hasta 750 € (infracción distracción)' },
    notes: {
      en: 'Dog must be restrained by harness, crate or cargo net and cannot interfere with the driver. Must travel in the back seat or boot.',
      fr: "Le chien doit être attaché (harnais, caisse ou filet) et ne doit pas gêner le conducteur. Doit voyager à l'arrière ou dans le coffre.",
      es: 'El perro debe estar sujeto (arnés, transportín o red) y no puede interferir con el conductor. Debe viajar en la parte trasera o maletero.',
    },
  },
  {
    flag: '🇩🇪',
    country: { en: 'Germany', fr: 'Allemagne', es: 'Alemania' },
    mandatory: { en: 'Yes (under cargo rules)', fr: 'Oui (règles de chargement)', es: 'Sí (normas de carga)' },
    fine: { en: 'Up to €35–€75', fr: "Jusqu'à 35–75 €", es: 'Hasta 35–75 €' },
    notes: {
      en: 'Dogs classified as "cargo" must be secured so they cannot be thrown around or endanger passengers. Unsecured dogs causing an accident increase liability significantly.',
      fr: "Les chiens sont classés « marchandise » et doivent être fixés pour ne pas être projetés. Un chien non attaché causant un accident engage fortement la responsabilité du conducteur.",
      es: 'Los perros se clasifican como "carga" y deben estar fijados para no salir despedidos. Un perro sin sujetar que cause un accidente implica una responsabilidad considerable.',
    },
  },
  {
    flag: '🇪🇸',
    country: { en: 'Spain', fr: 'Espagne', es: 'España' },
    mandatory: { en: 'Yes', fr: 'Oui', es: 'Sí' },
    fine: { en: '€200 (up to €200,000 in serious cases)', fr: '200 € (jusqu\'à 200 000 € cas graves)', es: '200 € (hasta 200 000 € en casos graves)' },
    notes: {
      en: "Spain's Animal Welfare Law (Ley 7/2023) requires pets to be properly restrained in vehicles. The DGT (traffic authority) can fine drivers €200 for an unrestrained dog, with much higher fines if the animal is injured.",
      fr: "La loi espagnole de bien-être animal (Ley 7/2023) impose une retenue correcte des animaux dans les véhicules. La DGT inflige une amende de 200 € pour un chien non attaché, bien plus si l'animal est blessé.",
      es: 'La Ley de bienestar animal española (Ley 7/2023) exige que los animales estén debidamente sujetos en los vehículos. La DGT puede multar con 200 € por un perro sin sujetar, y mucho más si el animal resulta herido.',
    },
  },
  {
    flag: '🇮🇹',
    country: { en: 'Italy', fr: 'Italie', es: 'Italia' },
    mandatory: { en: 'Yes', fr: 'Oui', es: 'Sí' },
    fine: { en: '€78–€311 + possible licence suspension', fr: '78–311 € + possible suspension de permis', es: '78–311 € + posible suspensión del carnet' },
    notes: {
      en: "Italian Highway Code (Art. 169) requires dogs to be restrained if travelling alone, or secured in a carrier or by a divider. A maximum of one dog per front seat occupant is allowed (pets in laps while driving is banned).",
      fr: "Le Code de la route italien (art. 169) impose la retenue des chiens voyageant seuls ou la caisse/filet de séparation. Maximum un animal par occupant (sur les genoux du conducteur : interdit).",
      es: 'El Código de circulación italiano (Art. 169) exige que los perros que viajen solos estén sujetos o en transportín/malla separadora. Máximo un animal por ocupante (en el regazo del conductor: prohibido).',
    },
  },
  {
    flag: '🇧🇪',
    country: { en: 'Belgium', fr: 'Belgique', es: 'Bélgica' },
    mandatory: { en: 'Recommended, not explicit law', fr: 'Recommandé, pas de loi explicite', es: 'Recomendado, sin ley explícita' },
    fine: { en: 'Could be fined for causing distraction', fr: 'Amende possible pour distraction', es: 'Posible multa por distracción' },
    notes: {
      en: 'No specific dog-in-car law, but the general duty to avoid distracting the driver applies. Unrestrained dogs that cause an accident will affect insurance claims.',
      fr: "Pas de loi spécifique, mais l'obligation générale de ne pas distraire le conducteur s'applique. Un chien non attaché causant un accident impacte l'assurance.",
      es: 'Sin ley específica, pero se aplica la obligación general de no distraer al conductor. Un perro sin sujetar que cause un accidente afecta al seguro.',
    },
  },
  {
    flag: '🇳🇱',
    country: { en: 'Netherlands', fr: 'Pays-Bas', es: 'Países Bajos' },
    mandatory: { en: 'Recommended, not explicit law', fr: 'Recommandé, pas de loi explicite', es: 'Recomendado, sin ley explícita' },
    fine: { en: 'General distraction fine applies', fr: 'Amende distraction applicable', es: 'Multa por distracción aplicable' },
    notes: {
      en: 'No specific mandatory restraint law. However, under general traffic rules, any distraction — including an unrestrained dog — can lead to fines.',
      fr: "Pas de loi explicite sur la retenue. Mais toute distraction — y compris un chien non attaché — peut entraîner une amende selon le code de la route général.",
      es: 'Sin ley explícita de sujeción. Sin embargo, cualquier distracción, incluido un perro sin sujetar, puede derivar en multa según las normas generales de tráfico.',
    },
  },
  {
    flag: '🇨🇭',
    country: { en: 'Switzerland', fr: 'Suisse', es: 'Suiza' },
    mandatory: { en: 'Yes (under cargo law)', fr: 'Oui (loi sur le chargement)', es: 'Sí (ley de carga)' },
    fine: { en: 'CHF 100+', fr: 'CHF 100+', es: 'CHF 100+' },
    notes: {
      en: "Swiss Road Traffic Act classifies dogs as freight: they must be placed so they cannot fall, endanger anyone or block the driver's view. Stop every 1–1.5 hours is specifically recommended by Swiss authorities.",
      fr: "La loi suisse classe les chiens comme fret : ils doivent être placés pour ne pas tomber, mettre en danger quiconque ni bloquer la vue du conducteur. Les autorités suisses recommandent une pause toutes les 1–1,5 heure.",
      es: 'La ley suiza clasifica a los perros como mercancía: deben estar colocados de modo que no puedan caer, poner en peligro a nadie ni bloquear la visión del conductor. Las autoridades suizas recomiendan parar cada 1–1,5 horas.',
    },
  },
]

// ─── Copy ──────────────────────────────────────────────────────────────────────

const COPY = {
  fr: {
    hero: 'Road trip avec son chien en Europe : le guide complet',
    subtitle: "Lois par pays, sécurité en voiture, passages aux frontières, Eurotunnel, gestion de la chaleur et premiers secours — tout ce qu'il faut savoir avant de prendre la route avec son chien.",
    lastUpdate: 'Mis à jour en',
    breadcrumbGuides: 'Guides',
    breadcrumbCurrent: 'Road trip avec son chien',
    badge: 'Guide pratique',
    sources: 'Sources vérifiées',
    sourcesText: "Ce guide est basé sur les réglementations officielles des autorités de la route de chaque pays (Code de la Route français, BAST allemand, DGT espagnole, code de la route suisse, Codice della Strada italien), les politiques officielles d'Eurotunnel Le Shuttle, de DFDS, de Brittany Ferries et P&O Ferries, ainsi que sur les recommandations vétérinaires publiées. Vérifiez toujours auprès des autorités du pays de destination avant de voyager.",

    // Pre-departure checklist
    checklistTitle: 'Checklist avant le départ',
    checklist: [
      { icon: '📔', label: 'Passeport européen pour animaux à jour', note: 'Puce + vaccination antirabique valide' },
      { icon: '🔒', label: 'Système de retenue homologué et crash-testé', note: 'Harnais crash-testé, caisse solidarisée ou filet de séparation' },
      { icon: '💧', label: 'Eau fraîche et gamelle de voyage', note: 'Proposer à boire toutes les 2 heures' },
      { icon: '🩺', label: 'Trousse de premiers secours animale', note: 'Pince à tiques, antiseptique, bandes, muselière, contact du vétérinaire' },
      { icon: '🌡️', label: "Ne jamais laisser le chien seul dans la voiture", note: 'Même à l\'ombre, la température peut tuer en 10 minutes' },
      { icon: '🗂️', label: 'Photocopies des documents (sécurité)', note: "Garder les originaux accessibles, jamais en valise en soute" },
    ],

    // Car safety section
    safetyTitle: 'Sécurité en voiture : harnais, caisse ou barrière ?',
    safetyIntro: "Lors d'un choc à 50 km/h, un chien de 20 kg non attaché est projeté avec une force équivalente à environ 300 kg. Les tests de crash révèlent des résultats très différents selon le système de retenue choisi.",
    safetyOptions: [
      {
        icon: '🔒',
        title: 'Caisse de transport sécurisée',
        rating: 'Meilleure protection',
        ratingColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        text: "Une caisse rigide correctement fixée aux points d'ancrage du coffre ou sangléé est le système le plus sûr. Les parois rigides répartissent les forces d'impact autour du chien. Attention : une caisse simplement posée dans le coffre (non fixée) ne protège pas davantage qu'un chien libre.",
      },
      {
        icon: '🪢',
        title: 'Harnais crash-testé',
        rating: 'Protection correcte si certifié',
        ratingColor: 'text-amber-700 bg-amber-50 border-amber-200',
        text: "Sur les 11 harnais soumis aux tests du Center for Pet Safety (CPS), un seul a obtenu la certification. La plupart des harnais classiques cèdent au-delà de 40 km/h. Choisissez impérativement un modèle labellisé crash-testé — jamais un harnais de balade adapté.",
      },
      {
        icon: '🚧',
        title: 'Barrière ou filet de séparation',
        rating: 'Protection partielle',
        ratingColor: 'text-blue-700 bg-blue-50 border-blue-200',
        text: "Une barrière de coffre empêche le chien d'accéder à l'habitacle mais ne le protège pas lors d'un choc frontal violent : il peut être projeté contre la barrière elle-même. Utile combinée à une caisse, insuffisante seule pour les longs trajets.",
      },
    ],
    safetyCrashNote: "Conseil : quelle que soit la solution choisie, faites-y habituer votre chien progressivement avant le grand départ.",

    // Journey planning
    planningTitle: 'Planifier le trajet',
    planningIntro: 'La plupart des vétérinaires recommandent une pause toutes les 2 à 3 heures maximum. Certains chiens (jeunes chiots, chiens âgés, races brachycéphales) peuvent avoir besoin de pauses plus fréquentes.',
    planningItems: [
      { icon: '⏱️', title: 'Pause toutes les 2 heures', text: "15 à 30 minutes de marche, eau fraîche, vérification de la température corporelle. Ne dépassez pas 7 heures de route par jour." },
      { icon: '💧', title: 'Hydratation régulière', text: "Proposez de l'eau à chaque pause. Évitez les repas copieux avant le départ pour limiter les nausées. Un estomac vide 2–3h avant le départ est recommandé." },
      { icon: '🌿', title: 'Aires dog-friendly sur autoroute', text: "En France, les réseaux APRR/AREA et Vinci proposent des espaces canins spécialement aménagés (espace de jeu, obstacles, zones ombragées). La carte des aires dog-friendly APRR est disponible via l'app Fulli." },
      { icon: '🌡️', title: 'Gestion de la chaleur', text: "Par 25°C extérieur, l'habitacle atteint 50°C en moins de 30 minutes. Ne laissez JAMAIS votre chien seul dans la voiture. Fenêtres entrouvertes ne suffisent pas : la hausse de température est pratiquement identique." },
    ],

    // Border crossings
    borderTitle: 'Passages aux frontières en voiture',
    borderIntro: 'En zone Schengen (la plupart des pays de l\'UE), les contrôles aux frontières sont rares mais les documents doivent être présentés sur demande. Pour les pays hors Schengen, prévoyez un contrôle systématique.',
    borderItems: [
      {
        flag: '🇪🇺',
        zone: 'Pays de l\'UE (Schengen)',
        docs: 'Passeport européen pour animaux + puce + vaccin rage à jour',
        notes: 'Contrôles rares mais possible. Présentez les documents sur demande. Verif obligatoire : Finlande, Irlande (traitement tapeworm requis).',
      },
      {
        flag: '🇨🇭',
        zone: 'Suisse (hors UE, hors Schengen)',
        docs: 'Passeport UE ou document équivalent accepté + puce + vaccin rage',
        notes: 'Contrôle à la frontière. Rejoindre le canal rouge pour déclaration animale. Pas de traitement supplémentaire requis pour voyageurs UE.',
      },
      {
        flag: '🇳🇴',
        zone: 'Norvège (EEE, hors UE)',
        docs: 'Passeport UE accepté + traitement tapeworm obligatoire 1–5 jours avant l\'entrée',
        notes: 'Déclaration obligatoire à la douane norvégienne (canal rouge). Traitement Echinococcus enregistré dans le passeport par un vétérinaire.',
      },
      {
        flag: '🇬🇧',
        zone: 'Royaume-Uni (post-Brexit)',
        docs: 'Certificat Sanitaire Animal (AHC) délivré dans les 10 jours + traitement tapeworm 1–5 jours avant',
        notes: 'Le passeport UE n\'est plus accepté. Uniquement par points d\'entrée approuvés (Dover, St Pancras...). Transporteur approuvé obligatoire.',
      },
    ],

    // Eurotunnel & ferries
    crossingTitle: 'Eurotunnel et ferries : que savoir ?',
    eurotunnelTitle: 'Eurotunnel Le Shuttle (Folkestone ↔ Calais)',
    eurotunnelItems: [
      'Vos animaux restent dans le véhicule pendant toute la traversée (35 minutes) — pas de séparation.',
      'Enregistrement au guichet animal au moins 1 heure avant le départ (et pas plus de 2 heures).',
      'Les deux terminaux (Folkestone et Coquelles) disposent d\'un guichet animal 24h/24.',
      'Documents requis : passeport UE (ou AHC depuis le Royaume-Uni) + traitement tapeworm pour entrer en Grande-Bretagne.',
      'Tarif : environ 22 £ par animal par trajet (en plus du billet véhicule).',
    ],
    ferriesTitle: 'Ferries (Manche et mer du Nord)',
    ferries: [
      {
        name: 'Brittany Ferries',
        notes: 'Cabines pet-friendly disponibles (chien avec vous dans la cabine) sur la plupart des liaisons. Chenils à bord également disponibles. Muselière obligatoire dans les espaces communs. Tarif à partir de 35 £ aller simple.',
      },
      {
        name: 'DFDS',
        notes: 'Cabines pet-friendly (4 couchettes, vue mer, max 2 animaux). Chenils à bord disponibles à 40 € par chien par trajet. Chien doit être en laisse dans les espaces communs.',
      },
      {
        name: 'P&O Ferries',
        notes: '6 cabines dog-friendly par ferry sur Hull–Rotterdam (traversée ~12h de nuit). Max 2 petits chiens ou 1 chien moyen/grand par cabine.',
      },
    ],

    // First aid
    firstAidTitle: 'Trousse de premiers secours pour le voyage en voiture',
    firstAidItems: [
      { icon: '🪲', item: 'Pince à tiques (x2)', note: 'Essentiel en été et dans les zones forestières' },
      { icon: '🩹', item: 'Bandes de contention et compresses stériles', note: "Pour stabiliser une blessure jusqu'au vétérinaire" },
      { icon: '🧴', item: 'Antiseptique (chlorhexidine ou Bétadine)', note: 'Nettoyer plaies et coupures' },
      { icon: '😷', item: 'Muselière adaptée à la taille du chien', note: "Un chien blessé peut mordre par douleur — protégez-vous avant d'agir" },
      { icon: '🌡️', item: 'Thermomètre rectal', note: 'Température normale : 38–39°C. Au-dessus de 40°C = urgence' },
      { icon: '🧊', item: 'Pack de froid réutilisable', note: 'En cas de coup de chaleur : refroidir progressivement (jamais eau glacée)' },
      { icon: '💊', item: 'Médicament contre le mal des transports prescrit par le vétérinaire', note: 'À demander en consultation avant le départ' },
      { icon: '📋', item: 'Carte de contact du vétérinaire local + vétérinaire d\'urgence en Europe', note: 'Numéro ECVIM ou FindAVet selon le pays de destination' },
      { icon: '🚿', item: 'Lingettes désinfectantes et gants latex', note: 'Pour les soins de base propres' },
      { icon: '📌', item: 'Double photo de votre chien + numéro de puce', note: 'En cas de fugue dans un pays étranger' },
    ],

    // FAQ
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Mon chien doit-il être attaché en voiture en Europe ?',
        a: "Dans la plupart des pays européens (France, Allemagne, Espagne, Italie, Suisse), oui. La réglementation varie selon le pays : certains imposent une amende directe pour chien non attaché, d'autres se basent sur l'infraction de distraction du conducteur. En pratique, voyagez toujours avec un système de retenue crash-testé pour la sécurité de votre chien et votre propre protection juridique.",
      },
      {
        q: 'Combien de pauses faire lors d\'un long trajet ?',
        a: "Prévoyez une pause de 15 à 30 minutes toutes les 2 à 3 heures. Les chiots, chiens âgés et races brachycéphales (bouledogues, carlins...) peuvent avoir besoin de pauses plus fréquentes. Visez un maximum de 7 heures de route par jour. Offrez de l'eau à chaque arrêt.",
      },
      {
        q: 'Puis-je laisser mon chien seul dans la voiture lors d\'un road trip ?',
        a: "Non, pas par temps chaud ou ensoleillé. La température intérieure d'un habitacle peut monter à 50–60°C en moins de 30 minutes par 25°C extérieur. Même fenêtres entrouvertes, la hausse est quasi identique. Organisez vos pauses en équipe, utilisez des parkings ombragés, ou emmenez une couverture réfléchissante. En hiver par grand froid, le risque d'hypothermie existe également.",
      },
      {
        q: 'Ai-je besoin d\'un passeport pour mon chien pour traverser une frontière en voiture ?',
        a: "Oui. Pour voyager en Europe avec votre chien, le passeport européen pour animaux (ou document équivalent) est indispensable. Il doit contenir la puce ISO et la vaccination antirabique à jour. Pour le Royaume-Uni, un Certificat Sanitaire Animal (AHC) remplace le passeport UE depuis le Brexit. Pour la Norvège et la Finlande, un traitement antiparasitaire supplémentaire est obligatoire.",
      },
      {
        q: 'Puis-je traverser la Manche avec mon chien en voiture par le tunnel ?',
        a: "Oui, via l'Eurotunnel Le Shuttle. Vos animaux restent dans le véhicule pendant les 35 minutes de traversée. Enregistrement au guichet animal au moins 1 heure avant le départ. Documents requis : passeport UE (depuis la France) ou AHC + traitement tapeworm (depuis la Grande-Bretagne). Tarif : environ 22 £ par animal en plus du billet.",
      },
      {
        q: 'Quel est le risque de coup de chaleur pour un chien en voiture ?',
        a: "Un coup de chaleur peut survenir en moins de 10 minutes par forte chaleur. Les signes d'alerte : halètement excessif, gencives rouge vif, salivation importante, ataxie (démarche titubante), vomissements. En cas de coup de chaleur : mettez le chien à l'ombre, aspergez avec de l'eau fraîche (pas glacée), et consultez un vétérinaire en urgence. La température normale est de 38–39°C — au-delà de 40°C, c'est une urgence vitale.",
      },
      {
        q: 'Mon chien est-il assuré lors d\'un accident de voiture à l\'étranger ?',
        a: "Vérifiez votre assurance auto et votre assurance animale : certaines couvrent les frais vétérinaires à l'étranger, d'autres non. Certaines assurances auto premium incluent une assistance pour animaux. Souscrivez une assurance animale avec couverture internationale avant le départ — les frais vétérinaires d'urgence en Europe peuvent être très élevés.",
      },
    ],

    // Internal links
    relatedTitle: 'Guides connexes',
    relatedItems: [
      { href: 'passeport-animal', label: 'Passeport animal : guide complet par pays' },
      { href: '../', label: 'Tous nos guides voyages avec animaux' },
    ],
    tipTitle: 'Le conseil pratique',
    tipText: "Avant un long road trip, faites un bilan vétérinaire, mettez à jour les vaccins et demandez si votre chien a besoin d'un traitement contre le mal des transports. Votre vétérinaire peut aussi vous donner le contact de collègues dans votre pays de destination.",
    tableHeaderCountry: 'Pays',
    tableHeaderMandatory: 'Retenue obligatoire',
    tableHeaderFine: 'Amende',
    tableHeaderNotes: 'Règles spécifiques',
    countryLawTitle: 'Lois par pays : retenue du chien en voiture',
  },

  en: {
    hero: 'Road-Tripping Across Europe with Your Dog: The Complete Guide',
    subtitle: 'Car safety laws by country, harness vs crate, border crossings, Eurotunnel & ferry policies, heat safety, stop frequency, and first-aid essentials — everything before you hit the road.',
    lastUpdate: 'Updated in',
    breadcrumbGuides: 'Guides',
    breadcrumbCurrent: 'Road trip with your dog',
    badge: 'Practical guide',
    sources: 'Verified sources',
    sourcesText: 'This guide is based on official highway codes and transport authority regulations from each country (French Code de la Route, German StVO, Spanish DGT / Ley 7/2023, Italian Codice della Strada, Swiss Road Traffic Act), official Eurotunnel Le Shuttle, DFDS, Brittany Ferries and P&O Ferries policies, and published veterinary recommendations. Always check with the destination country\'s authorities before travelling.',

    checklistTitle: 'Pre-departure checklist',
    checklist: [
      { icon: '📔', label: 'Up-to-date EU pet passport', note: 'Microchip + valid rabies vaccination' },
      { icon: '🔒', label: 'Crash-tested restraint system', note: 'Crash-tested harness, secured crate or cargo barrier net' },
      { icon: '💧', label: 'Fresh water and travel bowl', note: 'Offer water every 2 hours' },
      { icon: '🩺', label: 'Dog first aid kit', note: 'Tick remover, antiseptic, bandages, muzzle, vet contact card' },
      { icon: '🌡️', label: 'Never leave your dog alone in the car', note: 'Even in the shade, temperature can become lethal in 10 minutes' },
      { icon: '🗂️', label: 'Document copies (security)', note: 'Keep originals accessible — never in checked luggage' },
    ],

    safetyTitle: 'Car safety: harness, crate or barrier?',
    safetyIntro: 'In a crash at 50 km/h, an unrestrained 20 kg dog becomes a 300 kg projectile. Crash test data shows very different levels of protection depending on the restraint method.',
    safetyOptions: [
      {
        icon: '🔒',
        title: 'Properly secured crate',
        rating: 'Best protection',
        ratingColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        text: 'A rigid crate bolted to boot anchor points or properly strapped down is the safest option. Rigid walls distribute crash forces around the dog rather than concentrating them at one point. Important: a crate simply sitting unsecured in the boot offers little better protection than an unrestrained dog.',
      },
      {
        icon: '🪢',
        title: 'Crash-tested harness',
        rating: 'Adequate if certified',
        ratingColor: 'text-amber-700 bg-amber-50 border-amber-200',
        text: 'Of 11 harnesses tested by the Center for Pet Safety (CPS), only one passed. Most standard harnesses fail above 40 km/h. Always choose a model with a verified crash-test certification — never a repurposed walking harness.',
      },
      {
        icon: '🚧',
        title: 'Boot barrier or cargo net',
        rating: 'Partial protection',
        ratingColor: 'text-blue-700 bg-blue-50 border-blue-200',
        text: 'A boot barrier stops your dog accessing the passenger cabin but provides little protection in a frontal crash — the dog can be thrown against the barrier itself. Useful combined with a crate; insufficient alone for long journeys.',
      },
    ],
    safetyCrashNote: 'Tip: whichever system you choose, let your dog get used to it gradually before the big trip.',

    planningTitle: 'Planning the journey',
    planningIntro: 'Most vets recommend stopping every 2–3 hours maximum. Puppies, senior dogs and brachycephalic breeds (bulldogs, pugs…) may need more frequent stops.',
    planningItems: [
      { icon: '⏱️', title: 'Stop every 2 hours', text: '15–30 minutes of walking, fresh water, check body temperature. Aim for no more than 7 hours of driving per day.' },
      { icon: '💧', title: 'Regular hydration', text: 'Offer water at every stop. Avoid large meals before departure to reduce motion sickness. An empty stomach 2–3 hours before is recommended.' },
      { icon: '🌿', title: 'Dog-friendly rest stops', text: 'On French autoroutes, the APRR/AREA and Vinci networks offer specially equipped canine areas (play equipment, obstacles, shaded zones). The APRR dog-friendly area map is available via the Fulli app.' },
      { icon: '🌡️', title: 'Heat management', text: 'At 25°C outside, a car interior reaches 50°C in under 30 minutes. NEVER leave your dog alone in the car. Cracked windows make almost no difference — the temperature rise is nearly identical.' },
    ],

    borderTitle: 'Border crossings by car',
    borderIntro: 'Within the Schengen zone (most EU countries), border checks are rare but documents must be presented on request. For non-Schengen countries, expect a systematic check.',
    borderItems: [
      {
        flag: '🇪🇺',
        zone: 'EU countries (Schengen)',
        docs: 'EU pet passport + microchip + up-to-date rabies vaccination',
        notes: 'Checks are rare but possible. Present documents on request. Mandatory verification: Finland, Ireland (tapeworm treatment required).',
      },
      {
        flag: '🇨🇭',
        zone: 'Switzerland (non-EU, non-Schengen)',
        docs: 'EU passport or equivalent accepted + microchip + rabies vaccination',
        notes: 'Border check on entry. Use the red channel for animal declaration. No additional treatment required for EU travellers.',
      },
      {
        flag: '🇳🇴',
        zone: 'Norway (EEA, non-EU)',
        docs: 'EU passport accepted + mandatory tapeworm treatment 1–5 days before entry',
        notes: 'Mandatory declaration at Norwegian customs (red channel). Echinococcus treatment must be recorded in the passport by a vet.',
      },
      {
        flag: '🇬🇧',
        zone: 'United Kingdom (post-Brexit)',
        docs: 'Animal Health Certificate (AHC) issued within 10 days + tapeworm treatment 1–5 days before',
        notes: 'EU pet passport no longer accepted. Approved entry points only (Dover, St Pancras…). Approved carrier required.',
      },
    ],

    crossingTitle: 'Eurotunnel and ferries: what you need to know',
    eurotunnelTitle: 'Eurotunnel Le Shuttle (Folkestone ↔ Calais)',
    eurotunnelItems: [
      'Your pets stay in the vehicle for the entire 35-minute crossing — no separation required.',
      'Check in at the pet booth at least 1 hour before departure (no more than 2 hours).',
      'Both terminals (Folkestone and Coquelles) have 24-hour pet check-in.',
      'Documents required: EU pet passport (or AHC from the UK) + tapeworm treatment to enter Great Britain.',
      'Cost: approximately £22 per pet per journey (on top of the vehicle ticket).',
    ],
    ferriesTitle: 'Ferries (English Channel and North Sea)',
    ferries: [
      {
        name: 'Brittany Ferries',
        notes: 'Pet-friendly cabins available (dog with you in the cabin) on most routes. On-board kennels also available. Muzzle required in shared spaces. From £35 one-way.',
      },
      {
        name: 'DFDS',
        notes: 'Pet-friendly cabins (4-berth, sea view, max 2 animals). On-board kennels at €40 per dog per journey. Dog must be on a lead in shared spaces.',
      },
      {
        name: 'P&O Ferries',
        notes: '6 dog-friendly cabins per ferry on Hull–Rotterdam (approx. 12h overnight crossing). Max 2 small dogs or 1 medium/large dog per cabin.',
      },
    ],

    firstAidTitle: 'Dog first aid kit for car travel',
    firstAidItems: [
      { icon: '🪲', item: 'Tick remover (x2)', note: 'Essential in summer and forested areas' },
      { icon: '🩹', item: 'Bandages and sterile gauze pads', note: 'To stabilise an injury until you reach a vet' },
      { icon: '🧴', item: 'Antiseptic (chlorhexidine or Betadine)', note: 'Clean wounds and cuts' },
      { icon: '😷', item: 'Muzzle sized for your dog', note: 'An injured dog may bite from pain — protect yourself before helping' },
      { icon: '🌡️', item: 'Rectal thermometer', note: 'Normal: 38–39°C. Above 40°C = emergency' },
      { icon: '🧊', item: 'Reusable cold pack', note: 'For heatstroke: cool gradually — never use ice-cold water' },
      { icon: '💊', item: 'Vet-prescribed motion-sickness medication', note: 'Ask your vet before the trip' },
      { icon: '📋', item: 'Local vet contact + emergency vet in Europe', note: 'ECVIM number or FindAVet for your destination country' },
      { icon: '🚿', item: 'Antiseptic wipes and latex gloves', note: 'For clean basic first aid' },
      { icon: '📌', item: 'Two photos of your dog + microchip number', note: 'In case of escape in a foreign country' },
    ],

    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Does my dog have to be restrained in the car in Europe?',
        a: 'In most European countries (France, Germany, Spain, Italy, Switzerland) yes — though the legal basis varies. Some countries have a direct fine for an unrestrained dog; others rely on the general duty not to distract the driver. In practice, always use a crash-tested restraint system for your dog\'s safety and your own legal protection.',
      },
      {
        q: 'How often should I stop on a long road trip?',
        a: 'Plan a 15–30 minute break every 2–3 hours. Puppies, senior dogs and brachycephalic breeds (bulldogs, pugs…) may need more frequent stops. Aim for a maximum of 7 hours of driving per day. Offer water at every stop.',
      },
      {
        q: 'Can I leave my dog alone in the car during a road trip?',
        a: 'Not in warm or sunny weather. At 25°C outside, the interior of a car can reach 50–60°C in under 30 minutes. Even with windows cracked, the temperature rise is almost identical. Plan stops as a team, use shaded car parks, or use a reflective sunshade. In very cold winter weather, hypothermia is also a risk.',
      },
      {
        q: 'Do I need a pet passport to cross a border by car?',
        a: 'Yes. To travel in Europe with your dog, the EU pet passport (or equivalent document) is essential. It must include the ISO microchip and up-to-date rabies vaccination. For the UK, an Animal Health Certificate (AHC) replaces the EU passport since Brexit. For Norway and Finland, additional anti-parasite treatment is mandatory.',
      },
      {
        q: 'Can I cross the Channel with my dog by car through the tunnel?',
        a: 'Yes, via Eurotunnel Le Shuttle. Your pets stay in the vehicle for the 35-minute crossing. Check in at the pet booth at least 1 hour before departure. Documents: EU pet passport (from France) or AHC + tapeworm treatment (from Britain). Cost: approx £22 per pet on top of the vehicle ticket.',
      },
      {
        q: 'What are the signs of heatstroke in a dog, and what should I do?',
        a: 'Warning signs: excessive panting, bright red gums, heavy drooling, unsteady gait, vomiting. If heatstroke is suspected: move the dog to shade, sponge with cool (not ice-cold) water, offer small amounts of water to drink, and get to a vet immediately. Normal temperature is 38–39°C — above 40°C is a life-threatening emergency.',
      },
      {
        q: 'Is my dog covered by insurance in a car accident abroad?',
        a: 'Check both your car insurance and pet insurance: some cover emergency vet costs abroad, others do not. Some premium car insurance policies include pet assistance. Take out international pet insurance before the trip — emergency vet fees in Europe can be very high.',
      },
    ],

    relatedTitle: 'Related guides',
    relatedItems: [
      { href: 'passeport-animal', label: 'Pet passport: complete country-by-country guide' },
      { href: '../', label: 'All our pet travel guides' },
    ],
    tipTitle: 'Expert tip',
    tipText: "Before a long road trip, book a vet check-up, update vaccinations and ask whether your dog needs motion-sickness medication. Your vet can also give you contact details for colleagues in your destination country.",
    tableHeaderCountry: 'Country',
    tableHeaderMandatory: 'Restraint mandatory?',
    tableHeaderFine: 'Fine',
    tableHeaderNotes: 'Specific rules',
    countryLawTitle: 'Dog car restraint laws by country',
  },

  es: {
    hero: 'Road trip por Europa con tu perro: la guía completa',
    subtitle: 'Leyes de seguridad en coche por país, arnés vs transportín, cruce de fronteras, políticas de Eurotunnel y ferries, gestión del calor, frecuencia de paradas y botiquín esencial — todo antes de ponerte en marcha.',
    lastUpdate: 'Actualizado en',
    breadcrumbGuides: 'Guías',
    breadcrumbCurrent: 'Road trip con tu perro',
    badge: 'Guía práctica',
    sources: 'Fuentes verificadas',
    sourcesText: 'Esta guía se basa en los códigos de circulación y regulaciones oficiales de las autoridades de transporte de cada país (Code de la Route francés, StVO alemán, DGT española / Ley 7/2023, Codice della Strada italiano, Ley de Tráfico suiza), las políticas oficiales de Eurotunnel Le Shuttle, DFDS, Brittany Ferries y P&O Ferries, y recomendaciones veterinarias publicadas. Verifica siempre con las autoridades del país de destino antes de viajar.',

    checklistTitle: 'Lista de verificación antes de salir',
    checklist: [
      { icon: '📔', label: 'Pasaporte europeo para mascotas actualizado', note: 'Microchip + vacuna antirrábica válida' },
      { icon: '🔒', label: 'Sistema de sujeción homologado con crash test', note: 'Arnés con crash test, transportín fijado o red separadora' },
      { icon: '💧', label: 'Agua fresca y cuenco de viaje', note: 'Ofrece agua cada 2 horas' },
      { icon: '🩺', label: 'Botiquín de primeros auxilios para perros', note: 'Quitagarrapatas, antiséptico, vendas, bozal, contacto del veterinario' },
      { icon: '🌡️', label: 'Nunca dejes a tu perro solo en el coche', note: 'Incluso a la sombra, la temperatura puede ser letal en 10 minutos' },
      { icon: '🗂️', label: 'Copias de los documentos (seguridad)', note: 'Lleva los originales siempre accesibles — nunca en el maletero' },
    ],

    safetyTitle: 'Seguridad en el coche: ¿arnés, transportín o barrera?',
    safetyIntro: 'En un accidente a 50 km/h, un perro de 20 kg sin sujetar se convierte en un proyectil de 300 kg. Los datos de crash test muestran niveles de protección muy distintos según el sistema elegido.',
    safetyOptions: [
      {
        icon: '🔒',
        title: 'Transportín correctamente fijado',
        rating: 'Mejor protección',
        ratingColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        text: 'Un transportín rígido atornillado a los puntos de anclaje del maletero o bien asegurado con correas es la opción más segura. Las paredes rígidas distribuyen las fuerzas del impacto alrededor del perro en lugar de concentrarlas en un único punto. Importante: un transportín simplemente apoyado en el maletero sin fijar ofrece apenas más protección que un perro suelto.',
      },
      {
        icon: '🪢',
        title: 'Arnés con crash test certificado',
        rating: 'Protección aceptable si está certificado',
        ratingColor: 'text-amber-700 bg-amber-50 border-amber-200',
        text: 'De 11 arneses probados por el Center for Pet Safety (CPS), solo uno superó las pruebas. La mayoría de los arneses estándar ceden por encima de los 40 km/h. Elige siempre un modelo con certificación de crash test verificada — nunca un arnés de paseo reconvertido.',
      },
      {
        icon: '🚧',
        title: 'Barrera de maletero o red separadora',
        rating: 'Protección parcial',
        ratingColor: 'text-blue-700 bg-blue-50 border-blue-200',
        text: 'Una barrera de maletero impide que el perro acceda al habitáculo, pero ofrece poca protección en un impacto frontal fuerte: el perro puede ser proyectado contra la propia barrera. Útil combinada con un transportín; insuficiente por sí sola en trayectos largos.',
      },
    ],
    safetyCrashNote: 'Consejo: sea cual sea el sistema elegido, acostumbra a tu perro a él poco a poco antes del gran viaje.',

    planningTitle: 'Planificación del trayecto',
    planningIntro: 'La mayoría de veterinarios recomiendan parar cada 2–3 horas como máximo. Los cachorros, perros mayores y razas braquicéfalas (bulldogs, pugs…) pueden necesitar paradas más frecuentes.',
    planningItems: [
      { icon: '⏱️', title: 'Para cada 2 horas', text: '15–30 minutos de paseo, agua fresca, comprobación de temperatura corporal. No superes las 7 horas de conducción al día.' },
      { icon: '💧', title: 'Hidratación regular', text: 'Ofrece agua en cada parada. Evita comidas copiosas antes de salir para reducir el mareo. Se recomienda estómago vacío 2–3 horas antes de partir.' },
      { icon: '🌿', title: 'Áreas de descanso dog-friendly', text: 'En las autopistas francesas, las redes APRR/AREA y Vinci ofrecen áreas caninas equipadas (juegos, obstáculos, zonas con sombra). El mapa de áreas dog-friendly de APRR está disponible en la app Fulli.' },
      { icon: '🌡️', title: 'Gestión del calor', text: 'Con 25°C en el exterior, el interior del coche puede alcanzar los 50°C en menos de 30 minutos. NUNCA dejes a tu perro solo en el coche. Dejar las ventanas entreabiertas no sirve de nada: el aumento de temperatura es casi idéntico.' },
    ],

    borderTitle: 'Cruce de fronteras en coche',
    borderIntro: 'Dentro del espacio Schengen (la mayoría de países de la UE), los controles fronterizos son raros, pero los documentos deben presentarse si se solicitan. En los países fuera del espacio Schengen, espera un control sistemático.',
    borderItems: [
      {
        flag: '🇪🇺',
        zone: 'Países de la UE (Schengen)',
        docs: 'Pasaporte europeo para mascotas + microchip + vacuna antirrábica actualizada',
        notes: 'Controles poco frecuentes pero posibles. Presenta los documentos si se solicitan. Verificación obligatoria: Finlandia, Irlanda (tratamiento antitenia obligatorio).',
      },
      {
        flag: '🇨🇭',
        zone: 'Suiza (fuera de la UE, fuera de Schengen)',
        docs: 'Pasaporte UE o equivalente aceptado + microchip + vacuna antirrábica',
        notes: 'Control en frontera. Utiliza el canal rojo para declaración de animales. Sin tratamiento adicional para viajeros de la UE.',
      },
      {
        flag: '🇳🇴',
        zone: 'Noruega (EEE, fuera de la UE)',
        docs: 'Pasaporte UE aceptado + tratamiento antitenia obligatorio 1–5 días antes de la entrada',
        notes: 'Declaración obligatoria en la aduana noruega (canal rojo). El tratamiento Echinococcus debe estar registrado en el pasaporte por un veterinario.',
      },
      {
        flag: '🇬🇧',
        zone: 'Reino Unido (post-Brexit)',
        docs: 'Certificado Sanitario Animal (AHC) emitido en los 10 días anteriores + tratamiento antitenia 1–5 días antes',
        notes: 'El pasaporte UE ya no es válido. Solo por puntos de entrada aprobados (Dover, St Pancras…). Transportista aprobado obligatorio.',
      },
    ],

    crossingTitle: 'Eurotunnel y ferries: lo que necesitas saber',
    eurotunnelTitle: 'Eurotunnel Le Shuttle (Folkestone ↔ Calais)',
    eurotunnelItems: [
      'Tus mascotas permanecen en el vehículo durante toda la travesía (35 minutos) — no hay separación.',
      'Haz el check-in en el mostrador de animales al menos 1 hora antes de la salida (y no más de 2 horas).',
      'Ambas terminales (Folkestone y Coquelles) tienen atención a mascotas las 24 horas.',
      'Documentos necesarios: pasaporte UE (o AHC desde el Reino Unido) + tratamiento antitenia para entrar en Gran Bretaña.',
      'Precio: aproximadamente 22 £ por mascota y trayecto (además del billete del vehículo).',
    ],
    ferriesTitle: 'Ferries (Canal de la Mancha y Mar del Norte)',
    ferries: [
      {
        name: 'Brittany Ferries',
        notes: 'Cabinas pet-friendly disponibles (perro contigo en la cabina) en la mayoría de rutas. También disponibles perreras a bordo. Bozal obligatorio en espacios compartidos. Desde 35 £ por trayecto.',
      },
      {
        name: 'DFDS',
        notes: 'Cabinas pet-friendly (4 literas, vista al mar, máx. 2 animales). Perreras a bordo a 40 € por perro y trayecto. El perro debe ir con correa en los espacios compartidos.',
      },
      {
        name: 'P&O Ferries',
        notes: '6 cabinas dog-friendly por barco en la ruta Hull–Róterdam (travesía nocturna de ~12 h). Máx. 2 perros pequeños o 1 perro mediano/grande por cabina.',
      },
    ],

    firstAidTitle: 'Botiquín de primeros auxilios para viaje en coche',
    firstAidItems: [
      { icon: '🪲', item: 'Quitagarrapatas (x2)', note: 'Imprescindible en verano y zonas boscosas' },
      { icon: '🩹', item: 'Vendas y gasas estériles', note: 'Para estabilizar una herida hasta llegar al veterinario' },
      { icon: '🧴', item: 'Antiséptico (clorhexidina o Betadine)', note: 'Limpiar heridas y cortes' },
      { icon: '😷', item: 'Bozal adaptado al tamaño del perro', note: 'Un perro herido puede morder por dolor — protégete antes de actuar' },
      { icon: '🌡️', item: 'Termómetro rectal', note: 'Normal: 38–39°C. Por encima de 40°C = urgencia' },
      { icon: '🧊', item: 'Bolsa de frío reutilizable', note: 'En caso de golpe de calor: enfriar progresivamente (nunca agua helada)' },
      { icon: '💊', item: 'Medicamento contra el mareo prescrito por el veterinario', note: 'Pídelo en consulta antes del viaje' },
      { icon: '📋', item: 'Contacto del veterinario local + veterinario de urgencias en Europa', note: 'Número ECVIM o FindAVet según el país de destino' },
      { icon: '🚿', item: 'Toallitas desinfectantes y guantes de látex', note: 'Para curas básicas en condiciones higiénicas' },
      { icon: '📌', item: 'Dos fotos de tu perro + número de microchip', note: 'En caso de fuga en un país extranjero' },
    ],

    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Tiene que ir mi perro sujeto en el coche en Europa?',
        a: 'En la mayoría de países europeos (Francia, Alemania, España, Italia, Suiza) sí, aunque la base legal varía. Algunos países tienen una multa directa por perro sin sujetar; otros se basan en la obligación general de no distraer al conductor. En la práctica, utiliza siempre un sistema de sujeción con crash test para la seguridad de tu perro y tu propia protección legal.',
      },
      {
        q: '¿Con qué frecuencia debo parar en un viaje largo?',
        a: 'Planifica una parada de 15–30 minutos cada 2–3 horas. Los cachorros, perros mayores y razas braquicéfalas (bulldogs, pugs…) pueden necesitar paradas más frecuentes. No superes las 7 horas de conducción al día. Ofrece agua en cada parada.',
      },
      {
        q: '¿Puedo dejar a mi perro solo en el coche durante un road trip?',
        a: 'No, con calor o sol. Con 25°C en el exterior, el interior de un coche puede alcanzar los 50–60°C en menos de 30 minutos. Dejar las ventanas entreabiertas apenas marca diferencia: el aumento de temperatura es casi idéntico. Organiza las paradas en equipo, usa aparcamientos con sombra o utiliza una pantalla solar reflectante. En invierno con gran frío también existe el riesgo de hipotermia.',
      },
      {
        q: '¿Necesito pasaporte para mi perro para cruzar una frontera en coche?',
        a: 'Sí. Para viajar por Europa con tu perro, el pasaporte europeo para mascotas (o documento equivalente) es imprescindible. Debe incluir el microchip ISO y la vacuna antirrábica actualizada. Para el Reino Unido, un Certificado Sanitario Animal (AHC) sustituye al pasaporte UE desde el Brexit. Para Noruega y Finlandia, es obligatorio un tratamiento antiparasitario adicional.',
      },
      {
        q: '¿Puedo cruzar el Canal de la Mancha con mi perro en coche por el túnel?',
        a: 'Sí, a través del Eurotunnel Le Shuttle. Tus mascotas permanecen en el vehículo durante los 35 minutos de travesía. Haz el check-in en el mostrador de animales al menos 1 hora antes. Documentos: pasaporte UE (desde Francia) o AHC + tratamiento antitenia (desde Gran Bretaña). Precio: aprox. 22 £ por mascota además del billete del vehículo.',
      },
      {
        q: '¿Cuáles son los síntomas del golpe de calor en un perro y qué debo hacer?',
        a: 'Señales de alerta: jadeo excesivo, encías rojo intenso, salivación abundante, marcha tambaleante, vómitos. Si sospechas un golpe de calor: lleva al perro a la sombra, mójalo con agua fresca (no helada), ofrécele pequeñas cantidades de agua y ve al veterinario de urgencias de inmediato. La temperatura normal es 38–39°C — por encima de 40°C es una emergencia vital.',
      },
      {
        q: '¿Está cubierto mi perro por el seguro en caso de accidente de coche en el extranjero?',
        a: 'Comprueba tanto tu seguro de coche como tu seguro de mascotas: algunos cubren los gastos veterinarios de urgencia en el extranjero, otros no. Algunos seguros de coche premium incluyen asistencia para animales. Contrata un seguro de mascota con cobertura internacional antes del viaje — los gastos veterinarios de urgencia en Europa pueden ser muy elevados.',
      },
    ],

    relatedTitle: 'Guías relacionadas',
    relatedItems: [
      { href: 'passeport-animal', label: 'Pasaporte para mascotas: guía completa por país' },
      { href: '../', label: 'Todas nuestras guías de viaje con mascotas' },
    ],
    tipTitle: 'Consejo práctico',
    tipText: 'Antes de un road trip largo, haz una revisión veterinaria, actualiza las vacunas y pregunta si tu perro necesita medicación contra el mareo. Tu veterinario también puede darte el contacto de colegas en el país de destino.',
    tableHeaderCountry: 'País',
    tableHeaderMandatory: '¿Sujeción obligatoria?',
    tableHeaderFine: 'Multa',
    tableHeaderNotes: 'Normas específicas',
    countryLawTitle: 'Leyes de sujeción del perro en el coche por país',
  },
}

export default async function RoadTripChienPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const lang = locale === 'fr' || locale === 'es' ? locale : 'en'
  const copy = COPY[lang]
  const today = new Date()
  const monthYear = today.toLocaleDateString(
    locale === 'fr' ? 'fr-FR' : locale === 'es' ? 'es-ES' : 'en-GB',
    { month: 'long', year: 'numeric' }
  )

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: copy.hero,
    description: copy.subtitle,
    datePublished: '2025-01-01',
    dateModified: today.toISOString().split('T')[0],
    author: {
      '@type': 'Person',
      name: 'HotelsWithPets Editorial',
      url: `${SITE_URL}/${locale}/about`,
      jobTitle: 'Pet Travel Editor',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HotelsWithPets.com',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 192, height: 192 },
    },
    mainEntityOfPage: `${SITE_URL}/${locale}/guides/road-trip-chien`,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: copy.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gray-50">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Link href={`/${locale}/guides`} className="text-emerald-300 hover:text-white text-sm transition-colors">
                ← {copy.breadcrumbGuides}
              </Link>
              <span className="text-emerald-500 text-sm">/</span>
              <span className="text-emerald-400 text-sm">{copy.breadcrumbCurrent}</span>
            </div>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs font-medium mb-5">
              🚗 {copy.badge} · {copy.lastUpdate} {monthYear}
            </span>
            <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">{copy.hero}</h1>
            <p className="text-emerald-200 text-base leading-relaxed max-w-3xl">{copy.subtitle}</p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* ── Sources note ─────────────────────────────────────────────── */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-10 flex items-start gap-3">
            <span className="text-blue-500 text-xl flex-shrink-0">🔍</span>
            <div>
              <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">{copy.sources}</p>
              <p className="text-sm text-blue-800 leading-relaxed">{copy.sourcesText}</p>
            </div>
          </div>

          {/* ── Pre-departure checklist ───────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-5">{copy.checklistTitle}</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {copy.checklist.map((item, i) => (
                <div key={i} className={`flex items-start gap-4 p-5 ${i < copy.checklist.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.note}</p>
                  </div>
                  <span className="ml-auto flex-shrink-0 text-emerald-500 text-lg mt-0.5">✓</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Expert tip ───────────────────────────────────────────────── */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-12 flex items-start gap-3">
            <span className="text-amber-500 text-xl flex-shrink-0">💡</span>
            <div>
              <p className="text-sm font-bold text-amber-800 mb-1">{copy.tipTitle}</p>
              <p className="text-sm text-amber-800 leading-relaxed">{copy.tipText}</p>
            </div>
          </div>

          {/* ── Country law table ─────────────────────────────────────────── */}
          <section className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{copy.countryLawTitle}</h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">{copy.tableHeaderCountry}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">{copy.tableHeaderMandatory}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden sm:table-cell">{copy.tableHeaderFine}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide hidden md:table-cell">{copy.tableHeaderNotes}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 bg-white">
                  {RESTRAINT_RULES.map((rule, i) => {
                    const isMandatory = rule.mandatory[lang].startsWith('Y') || rule.mandatory[lang].startsWith('O') || rule.mandatory[lang].startsWith('S')
                    return (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 font-medium text-gray-900">
                          <span className="mr-2">{rule.flag}</span>{rule.country[lang]}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${isMandatory && !rule.mandatory[lang].includes('Recomm') && !rule.mandatory[lang].includes('not') && !rule.mandatory[lang].includes('pas de') && !rule.mandatory[lang].includes('sin') ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                            {rule.mandatory[lang]}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-600 hidden sm:table-cell">{rule.fine[lang]}</td>
                        <td className="px-4 py-4 text-gray-500 text-xs leading-relaxed hidden md:table-cell max-w-xs">{rule.notes[lang]}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {/* Mobile notes */}
            <div className="mt-4 space-y-3 md:hidden">
              {RESTRAINT_RULES.map((rule, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 text-xs text-gray-600">
                  <span className="font-semibold text-gray-900">{rule.flag} {rule.country[lang]}:</span> {rule.notes[lang]}
                </div>
              ))}
            </div>
          </section>

          {/* ── Car safety ───────────────────────────────────────────────── */}
          <section className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">{copy.safetyTitle}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{copy.safetyIntro}</p>
            <div className="space-y-4">
              {copy.safetyOptions.map((opt, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">{opt.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <h3 className="font-bold text-gray-900">{opt.title}</h3>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${opt.ratingColor}`}>{opt.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{opt.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500 italic">{copy.safetyCrashNote}</p>
          </section>

          {/* ── Journey planning ─────────────────────────────────────────── */}
          <section className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">{copy.planningTitle}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{copy.planningIntro}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {copy.planningItems.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Border crossings ─────────────────────────────────────────── */}
          <section className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">{copy.borderTitle}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{copy.borderIntro}</p>
            <div className="space-y-3">
              {copy.borderItems.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{item.flag}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{item.zone}</h3>
                      <p className="text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full px-2.5 py-1 inline-block mb-2">{item.docs}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{item.notes}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href={`/${locale}/guides/passeport-animal`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-colors"
              >
                📔 {lang === 'fr' ? 'Guide complet passeport animal →' : lang === 'es' ? 'Guía completa del pasaporte →' : 'Complete pet passport guide →'}
              </Link>
            </div>
          </section>

          {/* ── Eurotunnel & ferries ──────────────────────────────────────── */}
          <section className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{copy.crossingTitle}</h2>

            {/* Eurotunnel */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                🚇 {copy.eurotunnelTitle}
              </h3>
              <ul className="space-y-3">
                {copy.eurotunnelItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="flex-shrink-0 text-emerald-500 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ferries */}
            <h3 className="font-bold text-gray-700 text-base mb-4">⛴️ {copy.ferriesTitle}</h3>
            <div className="space-y-4">
              {copy.ferries.map((ferry, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <h4 className="font-bold text-gray-900 text-sm mb-2">{ferry.name}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{ferry.notes}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── First aid kit ─────────────────────────────────────────────── */}
          <section className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{copy.firstAidTitle}</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {copy.firstAidItems.map((item, i) => (
                <div key={i} className={`flex items-start gap-4 p-4 ${i < copy.firstAidItems.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.item}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ───────────────────────────────────────────────────────── */}
          <section className="mb-14">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8">{copy.faqTitle}</h2>
            <div className="space-y-4">
              {copy.faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Internal links ────────────────────────────────────────────── */}
          <section className="mb-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{copy.relatedTitle}</h2>
            <div className="flex flex-wrap gap-3">
              {copy.relatedItems.map((item, i) => (
                <Link
                  key={i}
                  href={`/${locale}/guides/${item.href}`}
                  className="inline-flex items-center gap-2 text-sm font-medium bg-gray-50 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-4 py-2 rounded-full transition-all shadow-sm"
                >
                  {item.label} →
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  )
}
