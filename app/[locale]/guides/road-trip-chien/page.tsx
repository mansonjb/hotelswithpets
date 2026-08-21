import Link from 'next/link'
import { GuideFooter } from '../_components/GuideFooter'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import TopHotelsStrip from '@/components/TopHotelsStrip'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import AmazonProductCard from '@/components/AmazonProductCard'
import AmazonDisclosure from '@/components/AmazonDisclosure'
import { PRODUCTS } from '@/data/amazon-products'

const STICKY_LABELS_ROAD: Record<string, { label: string; cta: string }> = {
  en: { label: 'Pet-friendly road trip bases in Europe', cta: 'See hotels' },
  fr: { label: `Hôtels pet-friendly pour road trip en Europe`, cta: 'Voir les hôtels' },
  es: { label: 'Hoteles pet-friendly para road trips en Europa', cta: 'Ver hoteles' },
  pt: { label: 'Hotéis pet-friendly para road trips em Europa', cta: 'Ver hotéis' },
  de: { label: 'Tierfreundliche Unterkünfte für Roadtrips in Europa', cta: 'Hotels ansehen' },
  nl: { label: 'Huisdiervriendelijke hotels voor je roadtrip door Europa', cta: 'Bekijk hotels' },
}

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
    en: 'Road Trip with Your Dog in Europe: Safety, Laws & Border Crossing Guide (2025)',
    fr: 'Road trip avec son chien en Europe : sécurité, lois et franchissement des frontières (2025)',
    es: 'Road trip con tu perro en Europa: seguridad, leyes y cruce de fronteras (2025)',
    pt: 'Road trip com tu cão en Europa: seguridad, leis e cruce de fronteras (2025)',
    de: 'Roadtrip mit Hund durch Europa: Sicherheit, Gesetze und Grenzübertritt (2025)',
    nl: 'Roadtrip met je hond door Europa: veiligheid, wetten en grensovergangen (2025)',
  }
  const descriptions: Record<string, string> = {
    en: 'Complete guide to road-tripping across Europe with your dog: car safety laws by country, harness vs crate, border crossings, Eurotunnel & ferry policies, heat safety, stops, and first aid essentials.',
    fr: 'Guide complet pour un road trip en voiture avec son chien en Europe : lois par pays, harnais vs caisse, franchissement des frontières, Eurotunnel, gestion de la chaleur et trousse de premiers secours.',
    es: 'Guía completa para un road trip por Europa con tu perro: leyes por país, arnés vs transportín, cruce de fronteras, Eurotunnel, gestión del calor y botiquín esencial.',
    pt: 'Guía completa para um road trip por Europa com tu cão: leis por país, arnés vs transportadora, cruce de fronteras, Eurotunnel, gestión do calor e botiquín esencial.',
    de: 'Der komplette Guide für einen Roadtrip mit Hund durch Europa: Sicherheitsgesetze im Auto nach Land, Auto-Sicherheitsgeschirr vs. Transportbox, Grenzübertritte, Eurotunnel- und Fährbestimmungen, Hitzeschutz, Pausen und die wichtigste Erste-Hilfe-Ausrüstung.',
    nl: 'Complete gids voor een roadtrip met je hond door Europa: veiligheidswetten in de auto per land, tuigje versus reisbench, grensovergangen, Eurotunnel- en veerbootbeleid, hittepreventie, stops en de belangrijkste EHBO-uitrusting.',
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
        pt: `${SITE_URL}/pt/guides/road-trip-chien`,
        de: `${SITE_URL}/de/guides/road-trip-chien`,
        nl: `${SITE_URL}/nl/guides/road-trip-chien`,
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
    country: { en: 'France', fr: 'France', es: 'Francia', pt: 'Francia', de: 'Frankreich', nl: 'Frankrijk' },
    mandatory: { en: 'Yes', fr: 'Oui', es: 'Sí', pt: 'Sí', de: 'Ja', nl: 'Ja' },
    fine: { en: 'Up to €750 (general distraction fine)', fr: "Jusqu'à 750 € (infraction distraction)", es: 'Hasta 750 € (infracción distracción)', pt: 'Até 750 € (infração distracción)', de: 'Bis zu 750 € (allgemeines Bußgeld für Ablenkung)', nl: 'Tot €750 (algemene boete voor afleiding)' },
    notes: {
      en: 'Dog must be restrained by harness, crate or cargo net and cannot interfere with the driver. Must travel in the back seat or boot.',
      fr: "Le chien doit être attaché (harnais, caisse ou filet) et ne doit pas gêner le conducteur. Doit voyager à l'arrière ou dans le coffre.",
      es: 'El perro debe estar sujeto (arnés, transportín o red) y no puede interferir con el conductor. Debe viajar en la parte trasera o maletero.',
      pt: 'O cão debe estar sujeto (arnés, transportadora o red) e no pode interferir com o conductor. Debe viajar na parte trasera o maletero.',
      de: 'Der Hund muss mit Auto-Sicherheitsgeschirr, Transportbox oder Trenngitter gesichert sein und darf den Fahrer nicht ablenken. Er muss auf der Rückbank oder im Kofferraum mitfahren.',
      nl: 'Je hond moet vastzitten met een tuigje, reisbench of scheidingsnet en mag de bestuurder niet afleiden. Hij moet op de achterbank of in de kofferbak reizen.',
    },
  },
  {
    flag: '🇩🇪',
    country: { en: 'Germany', fr: 'Allemagne', es: 'Alemania', pt: 'Alemania', de: 'Deutschland', nl: 'Duitsland' },
    mandatory: { en: 'Yes (under cargo rules)', fr: 'Oui (règles de chargement)', es: 'Sí (normas de carga)', pt: 'Sí (normas de carga)', de: 'Ja (nach Ladungsvorschriften)', nl: 'Ja (onder ladingregels)' },
    fine: { en: 'Up to €35–€75', fr: "Jusqu'à 35–75 €", es: 'Hasta 35–75 €', pt: 'Até 35–75 €', de: 'Bis zu 35–75 €', nl: 'Tot €35–€75' },
    notes: {
      en: 'Dogs classified as "cargo" must be secured so they cannot be thrown around or endanger passengers. Unsecured dogs causing an accident increase liability significantly.',
      fr: "Les chiens sont classés « marchandise » et doivent être fixés pour ne pas être projetés. Un chien non attaché causant un accident engage fortement la responsabilité du conducteur.",
      es: 'Los perros se clasifican como "carga" y deben estar fijados para no salir despedidos. Un perro sin sujetar que cause un accidente implica una responsabilidad considerable.',
      pt: 'Os cães se clasifican como "carga" e deben estar fijados para no salir despedidos. Um cão sem sujetar que cause um accidente implica uma responsabilidad considerable.',
      de: 'Hunde gelten als „Ladung" und müssen so gesichert sein, dass sie nicht umherfliegen oder Insassen gefährden können. Ein ungesicherter Hund, der einen Unfall verursacht, erhöht die Haftung erheblich.',
      nl: 'Honden gelden als "lading" en moeten zo vastzitten dat ze niet kunnen rondvliegen of passagiers in gevaar brengen. Een loslopende hond die een ongeluk veroorzaakt, verhoogt de aansprakelijkheid aanzienlijk.',
    },
  },
  {
    flag: '🇪🇸',
    country: { en: 'Spain', fr: 'Espagne', es: 'España', pt: 'Espanha', de: 'Spanien', nl: 'Spanje' },
    mandatory: { en: 'Yes', fr: 'Oui', es: 'Sí', pt: 'Sí', de: 'Ja', nl: 'Ja' },
    fine: { en: '€200 (up to €200,000 in serious cases)', fr: '200 € (jusqu\'à 200 000 € cas graves)', es: '200 € (hasta 200 000 € en casos graves)', pt: '200 € (até 200 000 € en casos graves)', de: '200 € (bei schweren Fällen bis zu 200.000 €)', nl: '€200 (tot €200.000 in ernstige gevallen)' },
    notes: {
      en: "Spain's Animal Welfare Law (Ley 7/2023) requires pets to be properly restrained in vehicles. The DGT (traffic authority) can fine drivers €200 for an unrestrained dog, with much higher fines if the animal is injured.",
      fr: "La loi espagnole de bien-être animal (Ley 7/2023) impose une retenue correcte des animaux dans les véhicules. La DGT inflige une amende de 200 € pour un chien non attaché, bien plus si l'animal est blessé.",
      es: 'La Ley de bienestar animal española (Ley 7/2023) exige que los animales estén debidamente sujetos en los vehículos. La DGT puede multar con 200 € por un perro sin sujetar, y mucho más si el animal resulta herido.',
      pt: 'A Lei de bienestar animal espanhola (Lei 7/2023) exige que os animales estén debidamente sujetos nos vehículos. A DGT pode multar com 200 € por um cão sem sujetar, e muito mais si o animal resulta herido.',
      de: 'Das spanische Tierschutzgesetz (Ley 7/2023) schreibt vor, dass Haustiere im Fahrzeug ordnungsgemäß gesichert sein müssen. Die DGT (Verkehrsbehörde) kann bei einem ungesicherten Hund ein Bußgeld von 200 € verhängen, deutlich mehr bei Verletzung des Tieres.',
      nl: 'De Spaanse dierenwelzijnswet (Ley 7/2023) schrijft voor dat huisdieren goed vastzitten in voertuigen. De DGT (verkeersautoriteit) kan bestuurders €200 boete geven voor een loslopende hond, veel meer als het dier gewond raakt.',
    },
  },
  {
    flag: '🇮🇹',
    country: { en: 'Italy', fr: 'Italie', es: 'Italia', pt: 'Italia', de: 'Italien', nl: 'Italië' },
    mandatory: { en: 'Yes', fr: 'Oui', es: 'Sí', pt: 'Sí', de: 'Ja', nl: 'Ja' },
    fine: { en: '€78–€311 + possible licence suspension', fr: '78–311 € + possible suspension de permis', es: '78–311 € + posible suspensión del carnet', pt: '78–311 € + posible suspensión do carnet', de: '78–311 € + möglicher Führerscheinentzug', nl: '€78–€311 + mogelijke schorsing van je rijbewijs' },
    notes: {
      en: "Italian Highway Code (Art. 169) requires dogs to be restrained if travelling alone, or secured in a carrier or by a divider. A maximum of one dog per front seat occupant is allowed (pets in laps while driving is banned).",
      fr: "Le Code de la route italien (art. 169) impose la retenue des chiens voyageant seuls ou la caisse/filet de séparation. Maximum un animal par occupant (sur les genoux du conducteur : interdit).",
      es: 'El Código de circulación italiano (Art. 169) exige que los perros que viajen solos estén sujetos o en transportín/malla separadora. Máximo un animal por ocupante (en el regazo del conductor: prohibido).',
      pt: 'O Código de circulación italiano (Art. 169) exige que os cães que viajen solos estén sujetos o en transportadora/malla separadora. Máximo um animal por ocupante (no regazo do conductor: prohibido).',
      de: 'Die italienische Straßenverkehrsordnung (Art. 169) verlangt, dass allein reisende Hunde gesichert oder durch eine Transportbox bzw. ein Trenngitter getrennt werden. Maximal ein Tier pro Sitzplatz vorn ist erlaubt (Hunde auf dem Schoß des Fahrers sind verboten).',
      nl: 'De Italiaanse verkeerswet (art. 169) verplicht dat alleen reizende honden vastzitten of in een reismand/met een scheidingsnet worden vervoerd. Maximaal één dier per voorstoelpassagier is toegestaan (een hond op schoot tijdens het rijden is verboden).',
    },
  },
  {
    flag: '🇧🇪',
    country: { en: 'Belgium', fr: 'Belgique', es: 'Bélgica', pt: 'Bélgica', de: 'Belgien', nl: 'België' },
    mandatory: { en: 'Recommended, not explicit law', fr: 'Recommandé, pas de loi explicite', es: 'Recomendado, sin ley explícita', pt: 'Recomendado, sem lei explícita', de: 'Empfohlen, kein ausdrückliches Gesetz', nl: 'Aanbevolen, geen expliciete wet' },
    fine: { en: 'Could be fined for causing distraction', fr: 'Amende possible pour distraction', es: 'Posible multa por distracción', pt: 'Posible multa por distracción', de: 'Bußgeld wegen Ablenkung möglich', nl: 'Boete mogelijk wegens afleiding' },
    notes: {
      en: 'No specific dog-in-car law, but the general duty to avoid distracting the driver applies. Unrestrained dogs that cause an accident will affect insurance claims.',
      fr: "Pas de loi spécifique, mais l'obligation générale de ne pas distraire le conducteur s'applique. Un chien non attaché causant un accident impacte l'assurance.",
      es: 'Sin ley específica, pero se aplica la obligación general de no distraer al conductor. Un perro sin sujetar que cause un accidente afecta al seguro.',
      pt: 'Sem lei específica, mas se aplica a obrigação general de no distraer al conductor. Um cão sem sujetar que cause um accidente afecta al seguro.',
      de: 'Es gibt kein spezifisches Gesetz für Hunde im Auto, aber die allgemeine Pflicht, den Fahrer nicht abzulenken, gilt trotzdem. Ein ungesicherter Hund, der einen Unfall verursacht, wirkt sich auf die Versicherung aus.',
      nl: 'Er is geen specifieke wet voor honden in de auto, maar de algemene plicht om de bestuurder niet af te leiden geldt wel. Een loslopende hond die een ongeluk veroorzaakt, heeft gevolgen voor je verzekering.',
    },
  },
  {
    flag: '🇳🇱',
    country: { en: 'Netherlands', fr: 'Pays-Bas', es: 'Países Bajos', pt: 'Países Bajos', de: 'Niederlande', nl: 'Nederland' },
    mandatory: { en: 'Recommended, not explicit law', fr: 'Recommandé, pas de loi explicite', es: 'Recomendado, sin ley explícita', pt: 'Recomendado, sem lei explícita', de: 'Empfohlen, kein ausdrückliches Gesetz', nl: 'Aanbevolen, geen expliciete wet' },
    fine: { en: 'General distraction fine applies', fr: 'Amende distraction applicable', es: 'Multa por distracción aplicable', pt: 'Multa por distracción aplicable', de: 'Allgemeines Bußgeld wegen Ablenkung möglich', nl: 'Algemene boete voor afleiding is van toepassing' },
    notes: {
      en: 'No specific mandatory restraint law. However, under general traffic rules, any distraction, including an unrestrained dog, can lead to fines.',
      fr: "Pas de loi explicite sur la retenue. Mais toute distraction, y compris un chien non attaché, peut entraîner une amende selon le code de la route général.",
      es: 'Sin ley explícita de sujeción. Sin embargo, cualquier distracción, incluido un perro sin sujetar, puede derivar en multa según las normas generales de tráfico.',
      pt: 'Sem lei explícita de sujeción. No entanto, cualquier distracción, incluido um cão sem sujetar, pode derivar en multa segundo as normas generales de tráfico.',
      de: 'Es gibt kein spezifisches Gesetz zur Sicherung. Nach den allgemeinen Verkehrsregeln kann jede Ablenkung, einschließlich eines ungesicherten Hundes, jedoch zu einem Bußgeld führen.',
      nl: 'Er is geen specifieke wet die vastzetten verplicht. Volgens de algemene verkeersregels kan elke afleiding, inclusief een loslopende hond, echter wel tot een boete leiden.',
    },
  },
  {
    flag: '🇨🇭',
    country: { en: 'Switzerland', fr: 'Suisse', es: 'Suiza', pt: 'Suiza', de: 'Schweiz', nl: 'Zwitserland' },
    mandatory: { en: 'Yes (under cargo law)', fr: 'Oui (loi sur le chargement)', es: 'Sí (ley de carga)', pt: 'Sí (lei de carga)', de: 'Ja (nach Frachtrecht)', nl: 'Ja (onder ladingrecht)' },
    fine: { en: 'CHF 100+', fr: 'CHF 100+', es: 'CHF 100+', pt: 'CHF 100+', de: 'CHF 100+', nl: 'CHF 100+' },
    notes: {
      en: "Swiss Road Traffic Act classifies dogs as freight: they must be placed so they cannot fall, endanger anyone or block the driver's view. Stop every 1–1.5 hours is specifically recommended by Swiss authorities.",
      fr: "La loi suisse classe les chiens comme fret : ils doivent être placés pour ne pas tomber, mettre en danger quiconque ni bloquer la vue du conducteur. Les autorités suisses recommandent une pause toutes les 1–1,5 heure.",
      es: 'La ley suiza clasifica a los perros como mercancía: deben estar colocados de modo que no puedan caer, poner en peligro a nadie ni bloquear la visión del conductor. Las autoridades suizas recomiendan parar cada 1–1,5 horas.',
      pt: 'A lei suiza clasifica aos cães como mercancía: deben estar colocados de modo que no puedan caer, poner en peligro a nadie ni bloquear a visión do conductor. As autoridades suizas recomiendan parar cada 1–1,5 horas.',
      de: 'Das Schweizer Straßenverkehrsgesetz stuft Hunde als Fracht ein: Sie müssen so platziert werden, dass sie nicht herunterfallen, niemanden gefährden oder die Sicht des Fahrers versperren können. Die Schweizer Behörden empfehlen ausdrücklich eine Pause alle 1–1,5 Stunden.',
      nl: 'De Zwitserse verkeerswet classificeert honden als vracht: ze moeten zo geplaatst worden dat ze niet kunnen vallen, niemand in gevaar brengen of het zicht van de bestuurder blokkeren. De Zwitserse autoriteiten bevelen expliciet elke 1 à 1,5 uur een pauze aan.',
    },
  },
]

// ─── Copy ──────────────────────────────────────────────────────────────────────

const COPY = {
  fr: {
    hero: 'Road trip avec son chien en Europe : le guide complet',
    subtitle: "Lois par pays, sécurité en voiture, passages aux frontières, Eurotunnel, gestion de la chaleur et premiers secours, tout ce qu'il faut savoir avant de prendre la route avec son chien.",
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
        text: "Sur les 11 harnais soumis aux tests du Center for Pet Safety (CPS), un seul a obtenu la certification. La plupart des harnais classiques cèdent au-delà de 40 km/h. Choisissez impérativement un modèle labellisé crash-testé, jamais un harnais de balade adapté.",
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
      'Vos animaux restent dans le véhicule pendant toute la traversée (35 minutes), pas de séparation.',
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
      { icon: '😷', item: 'Muselière adaptée à la taille du chien', note: "Un chien blessé peut mordre par douleur, protégez-vous avant d'agir" },
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
        a: "Un coup de chaleur peut survenir en moins de 10 minutes par forte chaleur. Les signes d'alerte : halètement excessif, gencives rouge vif, salivation importante, ataxie (démarche titubante), vomissements. En cas de coup de chaleur : mettez le chien à l'ombre, aspergez avec de l'eau fraîche (pas glacée), et consultez un vétérinaire en urgence. La température normale est de 38–39°C, au-delà de 40°C, c'est une urgence vitale.",
      },
      {
        q: 'Mon chien est-il assuré lors d\'un accident de voiture à l\'étranger ?',
        a: "Vérifiez votre assurance auto et votre assurance animale : certaines couvrent les frais vétérinaires à l'étranger, d'autres non. Certaines assurances auto premium incluent une assistance pour animaux. Souscrivez une assurance animale avec couverture internationale avant le départ, les frais vétérinaires d'urgence en Europe peuvent être très élevés.",
      },
    ],

    // Internal links
    relatedTitle: 'Guides connexes',
    relatedItems: [
      { href: 'passeport-animal', label: 'Passeport animal : guide complet par pays' },
      { href: 'train-avec-chien', label: 'Voyager en train avec son chien' },
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
    subtitle: 'Car safety laws by country, harness vs crate, border crossings, Eurotunnel & ferry policies, heat safety, stop frequency, and first-aid essentials, everything before you hit the road.',
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
      { icon: '🗂️', label: 'Document copies (security)', note: 'Keep originals accessible, never in checked luggage' },
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
        text: 'Of 11 harnesses tested by the Center for Pet Safety (CPS), only one passed. Most standard harnesses fail above 40 km/h. Always choose a model with a verified crash-test certification, never a repurposed walking harness.',
      },
      {
        icon: '🚧',
        title: 'Boot barrier or cargo net',
        rating: 'Partial protection',
        ratingColor: 'text-blue-700 bg-blue-50 border-blue-200',
        text: 'A boot barrier stops your dog accessing the passenger cabin but provides little protection in a frontal crash, the dog can be thrown against the barrier itself. Useful combined with a crate; insufficient alone for long journeys.',
      },
    ],
    safetyCrashNote: 'Tip: whichever system you choose, let your dog get used to it gradually before the big trip.',

    planningTitle: 'Planning the journey',
    planningIntro: 'Most vets recommend stopping every 2–3 hours maximum. Puppies, senior dogs and brachycephalic breeds (bulldogs, pugs…) may need more frequent stops.',
    planningItems: [
      { icon: '⏱️', title: 'Stop every 2 hours', text: '15–30 minutes of walking, fresh water, check body temperature. Aim for no more than 7 hours of driving per day.' },
      { icon: '💧', title: 'Regular hydration', text: 'Offer water at every stop. Avoid large meals before departure to reduce motion sickness. An empty stomach 2–3 hours before is recommended.' },
      { icon: '🌿', title: 'Dog-friendly rest stops', text: 'On French autoroutes, the APRR/AREA and Vinci networks offer specially equipped canine areas (play equipment, obstacles, shaded zones). The APRR dog-friendly area map is available via the Fulli app.' },
      { icon: '🌡️', title: 'Heat management', text: 'At 25°C outside, a car interior reaches 50°C in under 30 minutes. NEVER leave your dog alone in the car. Cracked windows make almost no difference, the temperature rise is nearly identical.' },
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
      'Your pets stay in the vehicle for the entire 35-minute crossing, no separation required.',
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
      { icon: '😷', item: 'Muzzle sized for your dog', note: 'An injured dog may bite from pain, protect yourself before helping' },
      { icon: '🌡️', item: 'Rectal thermometer', note: 'Normal: 38–39°C. Above 40°C = emergency' },
      { icon: '🧊', item: 'Reusable cold pack', note: 'For heatstroke: cool gradually, never use ice-cold water' },
      { icon: '💊', item: 'Vet-prescribed motion-sickness medication', note: 'Ask your vet before the trip' },
      { icon: '📋', item: 'Local vet contact + emergency vet in Europe', note: 'ECVIM number or FindAVet for your destination country' },
      { icon: '🚿', item: 'Antiseptic wipes and latex gloves', note: 'For clean basic first aid' },
      { icon: '📌', item: 'Two photos of your dog + microchip number', note: 'In case of escape in a foreign country' },
    ],

    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Does my dog have to be restrained in the car in Europe?',
        a: 'In most European countries (France, Germany, Spain, Italy, Switzerland) yes, though the legal basis varies. Some countries have a direct fine for an unrestrained dog; others rely on the general duty not to distract the driver. In practice, always use a crash-tested restraint system for your dog\'s safety and your own legal protection.',
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
        a: 'Warning signs: excessive panting, bright red gums, heavy drooling, unsteady gait, vomiting. If heatstroke is suspected: move the dog to shade, sponge with cool (not ice-cold) water, offer small amounts of water to drink, and get to a vet immediately. Normal temperature is 38–39°C, above 40°C is a life-threatening emergency.',
      },
      {
        q: 'Is my dog covered by insurance in a car accident abroad?',
        a: 'Check both your car insurance and pet insurance: some cover emergency vet costs abroad, others do not. Some premium car insurance policies include pet assistance. Take out international pet insurance before the trip, emergency vet fees in Europe can be very high.',
      },
    ],

    relatedTitle: 'Related guides',
    relatedItems: [
      { href: 'passeport-animal', label: 'Pet passport: complete country-by-country guide' },
      { href: 'train-avec-chien', label: 'Train travel with your dog' },
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
    subtitle: 'Leyes de seguridad en coche por país, arnés vs transportín, cruce de fronteras, políticas de Eurotunnel y ferries, gestión del calor, frecuencia de paradas y botiquín esencial, todo antes de ponerte en marcha.',
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
      { icon: '🗂️', label: 'Copias de los documentos (seguridad)', note: 'Lleva los originales siempre accesibles, nunca en el maletero' },
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
        text: 'De 11 arneses probados por el Center for Pet Safety (CPS), solo uno superó las pruebas. La mayoría de los arneses estándar ceden por encima de los 40 km/h. Elige siempre un modelo con certificación de crash test verificada, nunca un arnés de paseo reconvertido.',
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
      'Tus mascotas permanecen en el vehículo durante toda la travesía (35 minutos), no hay separación.',
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
      { icon: '😷', item: 'Bozal adaptado al tamaño del perro', note: 'Un perro herido puede morder por dolor, protégete antes de actuar' },
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
        a: 'Señales de alerta: jadeo excesivo, encías rojo intenso, salivación abundante, marcha tambaleante, vómitos. Si sospechas un golpe de calor: lleva al perro a la sombra, mójalo con agua fresca (no helada), ofrécele pequeñas cantidades de agua y ve al veterinario de urgencias de inmediato. La temperatura normal es 38–39°C, por encima de 40°C es una emergencia vital.',
      },
      {
        q: '¿Está cubierto mi perro por el seguro en caso de accidente de coche en el extranjero?',
        a: 'Comprueba tanto tu seguro de coche como tu seguro de mascotas: algunos cubren los gastos veterinarios de urgencia en el extranjero, otros no. Algunos seguros de coche premium incluyen asistencia para animales. Contrata un seguro de mascota con cobertura internacional antes del viaje, los gastos veterinarios de urgencia en Europa pueden ser muy elevados.',
      },
    ],

    relatedTitle: 'Guías relacionadas',
    relatedItems: [
      { href: 'passeport-animal', label: 'Pasaporte para mascotas: guía completa por país' },
      { href: 'train-avec-chien', label: 'Viajar en tren con tu perro' },
    ],
    tipTitle: 'Consejo práctico',
    tipText: 'Antes de un road trip largo, haz una revisión veterinaria, actualiza las vacunas y pregunta si tu perro necesita medicación contra el mareo. Tu veterinario también puede darte el contacto de colegas en el país de destino.',
    tableHeaderCountry: 'País',
    tableHeaderMandatory: '¿Sujeción obligatoria?',
    tableHeaderFine: 'Multa',
    tableHeaderNotes: 'Normas específicas',
    countryLawTitle: 'Leyes de sujeción del perro en el coche por país',
  },
  pt: {
    hero: 'Road trip por Europa com o teu cão: a guía completa',
    subtitle: 'Leis de seguridad de carro por país, arnés vs transportadora, cruce de fronteras, políticas de Eurotunnel e ferries, gestión do calor, frecuencia de paradas e botiquín esencial, todo antes de ponerte em marcha.',
    lastUpdate: 'Atualizado en',
    breadcrumbGuides: 'Guías',
    breadcrumbCurrent: 'Road trip com o teu cão',
    badge: 'Guía práctica',
    sources: 'Fuentes verificadas',
    sourcesText: 'Esta guía se basa nos códigos de circulación e regulaciones oficiais das autoridades de transporte de cada país (Code da Route francês, StVO alemão, DGT espanhola / Lei 7/2023, Codice della Strada italiano, Lei de Tráfico suiza), as políticas oficiais de Eurotunnel Le Shuttle, DFDS, Brittany Ferries e P&O Ferries, e recomendaciones veterinárias publicadas. Verifica sempre com as autoridades do país de destino antes de viajar.',

    checklistTitle: 'Lista de verificación antes de salir',
    checklist: [
      { icon: '📔', label: 'Passaporte europeu para animais atualizado', note: 'Microchip + vacuna antirrábica válida' },
      { icon: '🔒', label: 'Sistema de sujeción homologado com crash test', note: 'Arnés com crash test, transportadora fijado o red separadora' },
      { icon: '💧', label: 'Água fresca e tigela de viaje', note: 'Ofrece água cada 2 horas' },
      { icon: '🩺', label: 'Botiquín de primeros auxilios para cães', note: 'Quitagarrapatas, antiséptico, vendas, bozal, contacto do veterinário' },
      { icon: '🌡️', label: 'Nunca dejes ao teu cão só no carro', note: 'Mesmo a sombra, a temperatura pode ser letal em 10 minutos' },
      { icon: '🗂️', label: 'Copias dois documentos (seguridad)', note: 'Leva os originales sempre acessíveis, nunca no maletero' },
    ],

    safetyTitle: 'Seguridad no carro: arnés, transportadora o barrera?',
    safetyIntro: 'Num accidente a 50 km/h, um cão de 20 kg sem sujetar torna-se num proyectil de 300 kg. Os datos de crash test muestran niveles de protección muito distintos segundo o sistema escolhido.',
    safetyOptions: [
      {
        icon: '🔒',
        title: 'Transportadora correctamente fijado',
        rating: 'MELHOR protección',
        ratingColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        text: 'Um transportadora rígido atornillado aos puntos de anclaje do maletero o bien asegurado com trelas é a opção mais segura. As paredes rígidas distribuyen as fuerzas do impacto alrededor do cão em lugar de concentrarlas num único punto. Importante: um transportadora simplemente apoyado no maletero sem fijar ofrece apenas mais protección que um cão suelto.',
      },
      {
        icon: '🪢',
        title: 'Arnés com crash test certificado',
        rating: 'Protección aceptable si está certificado',
        ratingColor: 'text-amber-700 bg-amber-50 border-amber-200',
        text: 'De 11 arneses probados pelo Center for Pet Safety (CPS), só uno superó as pruebas. A maioria dois arneses estándar ceden por encima dois 40 km/h. Elige sempre um modelo com certificación de crash test verificada, nunca um arnés de passeio reconvertido.',
      },
      {
        icon: '🚧',
        title: 'Barrera de maletero o red separadora',
        rating: 'Protección parcial',
        ratingColor: 'text-blue-700 bg-blue-50 border-blue-200',
        text: 'Uma barrera de maletero impide que o cão acceda al habitáculo, mas ofrece pouca protección num impacto frontal forte: o cão pode ser proyectado contra a propia barrera. Útil combinada com um transportadora; insuficiente por sí sola em trayectos longos.',
      },
    ],
    safetyCrashNote: 'Consejo: sea cual sea o sistema escolhido, acostumbra ao teu cão a él pouco a pouco antes do GRANDE viaje.',

    planningTitle: 'Planificación do trayecto',
    planningIntro: 'A maioria de veterinários recomiendan parar cada 2–3 horas como máximo. Os cachorros, cães mayores e razas braquicéfalas (bulldogs, pugs…) podem necesitar paradas mais frecuentes.',
    planningItems: [
      { icon: '⏱️', title: 'Para cada 2 horas', text: '15–30 minutos de passeio, água fresca, comprobación de temperatura corporal. No superes as 7 horas de conducción al dia.' },
      { icon: '💧', title: 'Hidratación regular', text: 'Ofrece água em cada parada. Evita comidas copiosas antes de salir para reducir o mareo. Se recomienda estómago vacío 2–3 horas antes de partir.' },
      { icon: '🌿', title: 'Áreas de descanso pet-friendly', text: 'Nas autopistas francesas, as redes APRR/AREA e Vinci ofrecen áreas caninas equipadas (juegos, obstáculos, zonas com sombra). O mapa de áreas pet-friendly de APRR está disponible na app Fulli.' },
      { icon: '🌡️', title: 'Gestión do calor', text: 'Com 25°C no exterior, o interior do carro pode alcanzar os 50°C em menos de 30 minutos. Nunca dejes ao teu cão só no carro. Deixar as ventanas entreabiertas no sirve de nada: o aumento de temperatura é casi idéntico.' },
    ],

    borderTitle: 'Cruce de fronteras de carro',
    borderIntro: 'Dentro do espaço Schengen (a maioria de países da UE), os controles fronterizos são raros, mas os documentos deben presentarse si se solicitan. Nos países fora do espaço Schengen, espera um control sistemático.',
    borderItems: [
      {
        flag: '🇪🇺',
        zone: 'Países da UE (Schengen)',
        docs: 'Passaporte europeu para animais + microchip + vacuna antirrábica atualizada',
        notes: 'Controles pouco frecuentes mas posibles. Apresenta os documentos si se solicitan. Verificación obrigatória: Finlândia, Irlanda (tratamento antitenia obrigatório).',
      },
      {
        flag: '🇨🇭',
        zone: 'Suiza (fora da UE, fora de Schengen)',
        docs: 'Passaporte UE o equivalente aceite + microchip + vacuna antirrábica',
        notes: 'Control em frontera. Utiliza o canal rojo para declaración de animales. Sem tratamento adicional para viajeros da UE.',
      },
      {
        flag: '🇳🇴',
        zone: 'Norueguesa (EEE, fora da UE)',
        docs: 'Passaporte UE aceite + tratamento antitenia obrigatório 1–5 dias antes da entrada',
        notes: 'Declaración obrigatória na aduana norueguesa (canal rojo). O tratamento Echinococcus debe estar registrado no passaporte por um veterinário.',
      },
      {
        flag: '🇬🇧',
        zone: 'Reino Unido (post-Brexit)',
        docs: 'Certificado Sanitario Animal (AHC) emitido nos 10 dias anteriores + tratamento antitenia 1–5 dias antes',
        notes: 'O passaporte UE já no é válido. Só por puntos de entrada aprobados (Dover, St Pancras…). Transportista aprobado obrigatório.',
      },
    ],

    crossingTitle: 'Eurotunnel e ferries: lo que necesitas saber',
    eurotunnelTitle: 'Eurotunnel Le Shuttle (Folkestone ↔ Calais)',
    eurotunnelItems: [
      'Os teus animais permanecen no vehículo durante toda a travesía (35 minutos), no hay separación.',
      'Haz o check-in no mostrador de animales al menos 1 hora antes da salida (e no mais de 2 horas).',
      'Ambas terminales (Folkestone e Coquelles) têm atención a animais as 24 horas.',
      'Documentos necesarios: passaporte UE (o AHC desde o Reino Unido) + tratamento antitenia para entrar em GRANDE Bretanha.',
      'Preço: aproximadamente 22 £ por animal e trayecto (além disso do bilhete do vehículo).',
    ],
    ferriesTitle: 'Ferries (Canal da Mancha e Mar do norte)',
    ferries: [
      {
        name: 'Brittany Ferries',
        notes: 'Cabinas pet-friendly disponibles (cão contigo na cabina) na maioria de rutas. Também disponibles perreras a bordo. Bozal obrigatório em espaços compartidos. Desde 35 £ por trayecto.',
      },
      {
        name: 'DFDS',
        notes: 'Cabinas pet-friendly (4 literas, vista al mar, máx. 2 animales). Perreras a bordo a 40 € por cão e trayecto. O cão debe ir com trela nos espaços compartidos.',
      },
      {
        name: 'P&O Ferries',
        notes: '6 cabinas pet-friendly por barco na ruta Hull–Róterdam (travesía nocturna de ~12 h). Máx. 2 cães pequenos o 1 cão mediano/GRANDE por cabina.',
      },
    ],

    firstAidTitle: 'Botiquín de primeros auxilios para viaje de carro',
    firstAidItems: [
      { icon: '🪲', item: 'Quitagarrapatas (x2)', note: 'Imprescindible em verão e zonas boscosas' },
      { icon: '🩹', item: 'Vendas e gasas estériles', note: 'Para estabilizar uma herida até chegar al veterinário' },
      { icon: '🧴', item: 'Antiséptico (clorhexidina o Betadine)', note: 'Limpiar heridas e cortes' },
      { icon: '😷', item: 'Bozal adaptado al tamanho do cão', note: 'Um cão herido pode morder por dolor, protégete antes de actuar' },
      { icon: '🌡️', item: 'Termómetro rectal', note: 'Normal: 38–39°C. Por encima de 40°C = urgência' },
      { icon: '🧊', item: 'Bolsa de frio reutilizable', note: 'Em caso de golpe de calor: enfriar progresivamente (nunca água helada)' },
      { icon: '💊', item: 'Medicamento contra o mareo prescrito pelo veterinário', note: 'Pídelo em consulta antes do viaje' },
      { icon: '📋', item: 'Contacto do veterinário local + veterinário de urgências em Europa', note: 'Número ECVIM o FindAVet segundo o país de destino' },
      { icon: '🚿', item: 'Toallitas desinfectantes e guantes de látex', note: 'Para curas básicas em condições higiénicas' },
      { icon: '📌', item: 'Dois fotos do teu cão + número de microchip', note: 'Em caso de fuga num país extranjero' },
    ],

    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: 'Tem que ir mi cão sujeto no carro em Europa?',
        a: 'Na maioria de países europeus (Francia, Alemania, Espanha, Italia, Suiza) sí, embora a base legal varía. Algunos países têm uma multa directa por cão sem sujetar; otros se basan na obrigação general de no distraer al conductor. Na práctica, utiliza sempre um sistema de sujeción com crash test para a seguridad do teu cão e tu propia protección legal.',
      },
      {
        q: 'Com que frecuencia debo parar num viaje longo?',
        a: 'Planifica uma parada de 15–30 minutos cada 2–3 horas. Os cachorros, cães mayores e razas braquicéfalas (bulldogs, pugs…) podem necesitar paradas mais frecuentes. No superes as 7 horas de conducción al dia. Ofrece água em cada parada.',
      },
      {
        q: 'Puedo deixar a mi cão só no carro durante um road trip?',
        a: 'No, com calor o sol. Com 25°C no exterior, o interior de um carro pode alcanzar os 50–60°C em menos de 30 minutos. Deixar as ventanas entreabiertas apenas marca diferença: o aumento de temperatura é casi idéntico. Organiza as paradas em equipo, usa aparcamientos com sombra o utiliza uma pantalla solar reflectante. Em inverno com GRANDE frio também existe o riesgo de hipotermia.',
      },
      {
        q: 'Necesito passaporte para mi cão para cruzar uma frontera de carro?',
        a: 'Sí. Para viajar por Europa com o teu cão, o passaporte europeu para animais (o documento equivalente) é imprescindible. Debe incluir o microchip ISO e a vacuna antirrábica atualizada. Para o Reino Unido, um Certificado Sanitario Animal (AHC) sustituye al passaporte UE desde o Brexit. Para Norueguesa e Finlândia, é obrigatório um tratamento antiparasitario adicional.',
      },
      {
        q: 'Puedo cruzar o Canal da Mancha com mi cão de carro pelo túnel?',
        a: 'Sí, a través do Eurotunnel Le Shuttle. Os teus animais permanecen no vehículo durante os 35 minutos de travesía. Haz o check-in no mostrador de animales al menos 1 hora antes. Documentos: passaporte UE (desde Francia) o AHC + tratamento antitenia (desde GRANDE Bretanha). Preço: aprox. 22 £ por animal além disso do bilhete do vehículo.',
      },
      {
        q: 'Quais são os síntomas do golpe de calor num cão e que debo hacer?',
        a: 'Sinais de alerta: jadeo excesivo, encías rojo intenso, salivación abundante, marcha tambaleante, vómitos. Si sospechas um golpe de calor: leva al cão a sombra, mójalo com água fresca (no helada), ofrécele pequenas cantidades de água e ve al veterinário de urgências de inmediato. A temperatura normal é 38–39°C, por encima de 40°C é uma emergência vital.',
      },
      {
        q: 'Está cubierto mi cão pelo seguro em caso de accidente de carro no extranjero?',
        a: 'Comprueba tanto tu seguro de carro como tu seguro de animais: algunos cubren os gastos veterinários de urgência no extranjero, otros no. Algunos seguros de carro premium incluyen asistencia para animales. Contrata um seguro de animal com cobertura internacional antes do viaje, os gastos veterinários de urgência em Europa podem ser muito elevados.',
      },
    ],

    relatedTitle: 'Guías relacionadas',
    relatedItems: [
      { href: 'passeport-animal', label: 'Passaporte para animais: guía completa por país' },
      { href: 'train-avec-chien', label: 'Viajar de comboio com o teu cão' },
    ],
    tipTitle: 'Consejo práctico',
    tipText: 'Antes de um road trip longo, haz uma revisión veterinária, actualiza as vacunas e pregunta si o teu cão necesita medicación contra o mareo. Tu veterinário também pode darte o contacto de colegas no país de destino.',
    tableHeaderCountry: 'País',
    tableHeaderMandatory: 'Sujeción obrigatória?',
    tableHeaderFine: 'Multa',
    tableHeaderNotes: 'Normas específicas',
    countryLawTitle: 'Leis de sujeción do cão no carro por país',
  },

  de: {
    hero: 'Roadtrip mit Hund durch Europa: der komplette Guide',
    subtitle: 'Sicherheitsgesetze im Auto nach Land, Auto-Sicherheitsgeschirr vs. Transportbox, Grenzübertritte, Eurotunnel- und Fährbestimmungen, Hitzeschutz, Pausenhäufigkeit und die wichtigste Erste-Hilfe-Ausrüstung, alles, bevor Sie losfahren.',
    lastUpdate: 'Aktualisiert im',
    breadcrumbGuides: 'Guides',
    breadcrumbCurrent: 'Roadtrip mit Hund',
    badge: 'Praktischer Guide',
    sources: 'Geprüfte Quellen',
    sourcesText: 'Dieser Guide basiert auf den offiziellen Straßenverkehrsordnungen und Vorschriften der Verkehrsbehörden jedes Landes (französischer Code de la Route, deutsche StVO, spanische DGT / Ley 7/2023, italienischer Codice della Strada, Schweizer Straßenverkehrsgesetz), den offiziellen Bestimmungen von Eurotunnel Le Shuttle, DFDS, Brittany Ferries und P&O Ferries sowie veröffentlichten tierärztlichen Empfehlungen. Prüfen Sie vor der Reise stets die aktuellen Vorschriften der Behörden des Ziellandes.',

    checklistTitle: 'Checkliste vor der Abfahrt',
    checklist: [
      { icon: '📔', label: 'Aktueller EU-Heimtierausweis', note: 'Mikrochip + gültige Tollwutimpfung' },
      { icon: '🔒', label: 'Crashgetestetes Rückhaltesystem', note: 'Crashgetestetes Auto-Sicherheitsgeschirr, gesicherte Transportbox oder Trenngitter' },
      { icon: '💧', label: 'Frisches Wasser und Reisenapf', note: 'Alle 2 Stunden Wasser anbieten' },
      { icon: '🩺', label: 'Erste-Hilfe-Set für den Hund', note: 'Zeckenzange, Antiseptikum, Verbandsmaterial, Maulkorb, Kontaktkarte des Tierarztes' },
      { icon: '🌡️', label: 'Den Hund nie allein im Auto lassen', note: 'Selbst im Schatten kann die Temperatur in 10 Minuten lebensgefährlich werden' },
      { icon: '🗂️', label: 'Kopien der Dokumente (Sicherheit)', note: 'Originale immer griffbereit halten, nie im aufgegebenen Gepäck' },
    ],

    safetyTitle: 'Sicherheit im Auto: Sicherheitsgeschirr, Transportbox oder Trenngitter?',
    safetyIntro: 'Bei einem Aufprall mit 50 km/h wird ein ungesicherter 20-kg-Hund zu einem 300-kg-Geschoss. Crashtest-Daten zeigen je nach gewähltem Rückhaltesystem sehr unterschiedliche Schutzniveaus.',
    safetyOptions: [
      {
        icon: '🔒',
        title: 'Ordnungsgemäß gesicherte Transportbox',
        rating: 'Bester Schutz',
        ratingColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        text: 'Eine feste Transportbox, die an den Verzurrösen des Kofferraums verschraubt oder ordentlich festgezurrt ist, bietet den sichersten Schutz. Feste Wände verteilen die Aufprallkräfte um den Hund herum, statt sie an einem Punkt zu konzentrieren. Wichtig: Eine lose im Kofferraum stehende Transportbox bietet kaum mehr Schutz als ein ungesicherter Hund.',
      },
      {
        icon: '🪢',
        title: 'Crashgetestetes Sicherheitsgeschirr',
        rating: 'Ausreichend bei Zertifizierung',
        ratingColor: 'text-amber-700 bg-amber-50 border-amber-200',
        text: 'Von 11 Sicherheitsgeschirren, die vom Center for Pet Safety (CPS) getestet wurden, bestand nur eines die Prüfung. Die meisten Standardgeschirre versagen oberhalb von 40 km/h. Wählen Sie stets ein Modell mit geprüfter Crashtest-Zertifizierung, niemals ein umfunktioniertes Spaziergeschirr.',
      },
      {
        icon: '🚧',
        title: 'Kofferraum-Trenngitter oder Netz',
        rating: 'Teilweiser Schutz',
        ratingColor: 'text-blue-700 bg-blue-50 border-blue-200',
        text: 'Ein Trenngitter hindert den Hund daran, in den Fahrgastraum zu gelangen, bietet bei einem frontalen Aufprall aber kaum Schutz: Der Hund kann gegen das Gitter selbst geschleudert werden. Sinnvoll in Kombination mit einer Transportbox, allein für lange Strecken nicht ausreichend.',
      },
    ],
    safetyCrashNote: 'Tipp: Egal für welches System Sie sich entscheiden, gewöhnen Sie Ihren Hund schrittweise daran, bevor es auf die große Reise geht.',

    planningTitle: 'Die Fahrt planen',
    planningIntro: 'Die meisten Tierärzte empfehlen maximal alle 2 bis 3 Stunden eine Pause. Welpen, ältere Hunde und brachyzephale Rassen (Bulldoggen, Möpse …) benötigen unter Umständen häufigere Pausen.',
    planningItems: [
      { icon: '⏱️', title: 'Alle 2 Stunden eine Pause', text: '15 bis 30 Minuten Bewegung, frisches Wasser, Körpertemperatur kontrollieren. Nicht mehr als 7 Stunden Fahrzeit pro Tag.' },
      { icon: '💧', title: 'Regelmäßige Flüssigkeitszufuhr', text: 'Bei jeder Pause Wasser anbieten. Vor der Abfahrt keine schweren Mahlzeiten, um Reiseübelkeit zu vermeiden. Ein leerer Magen 2–3 Stunden vor der Abfahrt wird empfohlen.' },
      { icon: '🌿', title: 'Hundefreundliche Raststätten', text: 'Auf französischen Autobahnen bieten die Netze APRR/AREA und Vinci speziell eingerichtete Hundebereiche (Spielgeräte, Hindernisse, schattige Zonen). Die APRR-Karte mit hundefreundlichen Rastplätzen ist über die App Fulli verfügbar.' },
      { icon: '🌡️', title: 'Hitzemanagement', text: 'Bei 25 °C Außentemperatur erreicht der Innenraum in unter 30 Minuten 50 °C. Lassen Sie Ihren Hund NIEMALS allein im Auto. Einen Spalt geöffnete Fenster machen kaum einen Unterschied, der Temperaturanstieg ist fast identisch.' },
    ],

    borderTitle: 'Grenzübertritte mit dem Auto',
    borderIntro: 'Innerhalb des Schengen-Raums (die meisten EU-Länder) sind Grenzkontrollen selten, die Dokumente müssen aber auf Verlangen vorgezeigt werden können. Bei Nicht-Schengen-Ländern ist mit einer systematischen Kontrolle zu rechnen.',
    borderItems: [
      {
        flag: '🇪🇺',
        zone: 'EU-Länder (Schengen)',
        docs: 'EU-Heimtierausweis + Mikrochip + aktuelle Tollwutimpfung',
        notes: 'Kontrollen sind selten, aber möglich. Dokumente auf Verlangen vorzeigen. Verpflichtende Prüfung: Finnland, Irland (Bandwurmbehandlung erforderlich).',
      },
      {
        flag: '🇨🇭',
        zone: 'Schweiz (außerhalb der EU, außerhalb Schengen)',
        docs: 'EU-Ausweis oder gleichwertiges Dokument akzeptiert + Mikrochip + Tollwutimpfung',
        notes: 'Kontrolle bei der Einreise. Für die Tiermeldung den roten Kanal nutzen. Für EU-Reisende ist keine zusätzliche Behandlung erforderlich.',
      },
      {
        flag: '🇳🇴',
        zone: 'Norwegen (EWR, außerhalb der EU)',
        docs: 'EU-Ausweis akzeptiert + verpflichtende Bandwurmbehandlung 1–5 Tage vor der Einreise',
        notes: 'Verpflichtende Meldung am norwegischen Zoll (roter Kanal). Die Echinococcus-Behandlung muss von einem Tierarzt im Ausweis eingetragen werden.',
      },
      {
        flag: '🇬🇧',
        zone: 'Vereinigtes Königreich (nach dem Brexit)',
        docs: 'Tiergesundheitsbescheinigung (AHC), innerhalb von 10 Tagen ausgestellt + Bandwurmbehandlung 1–5 Tage vorher',
        notes: 'Der EU-Heimtierausweis wird nicht mehr akzeptiert. Nur über zugelassene Einreisepunkte (Dover, St Pancras …). Zugelassener Beförderer erforderlich.',
      },
    ],

    crossingTitle: 'Eurotunnel und Fähren: das müssen Sie wissen',
    eurotunnelTitle: 'Eurotunnel Le Shuttle (Folkestone ↔ Calais)',
    eurotunnelItems: [
      'Ihre Tiere bleiben während der gesamten 35-minütigen Überfahrt im Fahrzeug, keine Trennung erforderlich.',
      'Check-in am Tierschalter mindestens 1 Stunde vor der Abfahrt (nicht mehr als 2 Stunden).',
      'Beide Terminals (Folkestone und Coquelles) bieten einen 24-Stunden-Tierschalter.',
      'Erforderliche Dokumente: EU-Heimtierausweis (oder AHC ab dem Vereinigten Königreich) + Bandwurmbehandlung für die Einreise nach Großbritannien.',
      'Kosten: etwa 22 £ pro Tier und Fahrt (zusätzlich zum Fahrzeugticket).',
    ],
    ferriesTitle: 'Fähren (Ärmelkanal und Nordsee)',
    ferries: [
      {
        name: 'Brittany Ferries',
        notes: 'Tierfreundliche Kabinen (Hund bei Ihnen in der Kabine) auf den meisten Strecken verfügbar. Zwinger an Bord ebenfalls verfügbar. Maulkorbpflicht in Gemeinschaftsbereichen. Ab 35 £ pro einfache Fahrt.',
      },
      {
        name: 'DFDS',
        notes: 'Tierfreundliche Kabinen (4 Betten, Meerblick, max. 2 Tiere). Zwinger an Bord für 40 € pro Hund und Fahrt. Der Hund muss in Gemeinschaftsbereichen an der Leine geführt werden.',
      },
      {
        name: 'P&O Ferries',
        notes: '6 hundefreundliche Kabinen pro Fähre auf der Strecke Hull–Rotterdam (nächtliche Überfahrt von ca. 12 Stunden). Max. 2 kleine Hunde oder 1 mittelgroßer/großer Hund pro Kabine.',
      },
    ],

    firstAidTitle: 'Erste-Hilfe-Set für die Autoreise',
    firstAidItems: [
      { icon: '🪲', item: 'Zeckenzange (x2)', note: 'Unverzichtbar im Sommer und in Waldgebieten' },
      { icon: '🩹', item: 'Verbandsmaterial und sterile Kompressen', note: 'Zur Stabilisierung einer Verletzung bis zum Tierarzt' },
      { icon: '🧴', item: 'Antiseptikum (Chlorhexidin oder Betadine)', note: 'Wunden und Schnitte reinigen' },
      { icon: '😷', item: 'Maulkorb passend zur Größe des Hundes', note: 'Ein verletzter Hund kann vor Schmerz beißen, schützen Sie sich, bevor Sie handeln' },
      { icon: '🌡️', item: 'Rektalthermometer', note: 'Normal: 38–39 °C. Über 40 °C = Notfall' },
      { icon: '🧊', item: 'Wiederverwendbarer Kühlakku', note: 'Bei Hitzschlag: schrittweise abkühlen (niemals eiskaltes Wasser)' },
      { icon: '💊', item: 'Vom Tierarzt verschriebenes Mittel gegen Reisekrankheit', note: 'Vor der Abfahrt beim Tierarzt erfragen' },
      { icon: '📋', item: 'Kontakt des örtlichen Tierarztes + Tiernotdienst in Europa', note: 'ECVIM-Nummer oder FindAVet je nach Zielland' },
      { icon: '🚿', item: 'Desinfektionstücher und Latexhandschuhe', note: 'Für saubere Erste-Hilfe-Maßnahmen' },
      { icon: '📌', item: 'Zwei Fotos Ihres Hundes + Mikrochip-Nummer', note: 'Für den Fall des Entlaufens im Ausland' },
    ],

    faqTitle: 'Häufig gestellte Fragen',
    faqs: [
      {
        q: 'Muss mein Hund im Auto in Europa gesichert sein?',
        a: 'In den meisten europäischen Ländern (Frankreich, Deutschland, Spanien, Italien, Schweiz) ja, wobei die rechtliche Grundlage variiert. Manche Länder verhängen ein direktes Bußgeld für einen ungesicherten Hund, andere stützen sich auf die allgemeine Pflicht, den Fahrer nicht abzulenken. In der Praxis sollten Sie stets ein crashgetestetes Rückhaltesystem nutzen, zur Sicherheit Ihres Hundes und zu Ihrem eigenen rechtlichen Schutz.',
      },
      {
        q: 'Wie oft sollte ich bei einem langen Roadtrip anhalten?',
        a: 'Planen Sie alle 2 bis 3 Stunden eine Pause von 15 bis 30 Minuten ein. Welpen, ältere Hunde und brachyzephale Rassen (Bulldoggen, Möpse …) benötigen unter Umständen häufigere Pausen. Streben Sie maximal 7 Stunden Fahrzeit pro Tag an. Bieten Sie bei jeder Pause Wasser an.',
      },
      {
        q: 'Darf ich meinen Hund während eines Roadtrips allein im Auto lassen?',
        a: 'Nicht bei warmem oder sonnigem Wetter. Bei 25 °C Außentemperatur kann der Innenraum eines Autos in unter 30 Minuten 50–60 °C erreichen. Selbst bei einen Spalt geöffneten Fenstern ist der Temperaturanstieg fast identisch. Planen Sie Pausen im Team, nutzen Sie schattige Parkplätze oder eine reflektierende Sonnenblende. Bei strengem Winterfrost besteht zudem das Risiko einer Unterkühlung.',
      },
      {
        q: 'Brauche ich einen Heimtierausweis für meinen Hund, um mit dem Auto eine Grenze zu überqueren?',
        a: 'Ja. Für Reisen mit Ihrem Hund innerhalb Europas ist der EU-Heimtierausweis (oder ein gleichwertiges Dokument) unverzichtbar. Er muss den ISO-Mikrochip und eine aktuelle Tollwutimpfung enthalten. Für das Vereinigte Königreich ersetzt seit dem Brexit eine Tiergesundheitsbescheinigung (AHC) den EU-Ausweis. Für Norwegen und Finnland ist eine zusätzliche Entwurmungsbehandlung verpflichtend.',
      },
      {
        q: 'Kann ich mit meinem Hund im Auto durch den Tunnel über den Ärmelkanal fahren?',
        a: 'Ja, über den Eurotunnel Le Shuttle. Ihre Tiere bleiben während der 35-minütigen Überfahrt im Fahrzeug. Check-in am Tierschalter mindestens 1 Stunde vor der Abfahrt. Dokumente: EU-Heimtierausweis (ab Frankreich) oder AHC + Bandwurmbehandlung (ab Großbritannien). Kosten: etwa 22 £ pro Tier zusätzlich zum Fahrzeugticket.',
      },
      {
        q: 'Woran erkenne ich einen Hitzschlag bei meinem Hund, und was sollte ich tun?',
        a: 'Warnzeichen: übermäßiges Hecheln, leuchtend rotes Zahnfleisch, starker Speichelfluss, unsicherer Gang, Erbrechen. Bei Verdacht auf einen Hitzschlag: den Hund in den Schatten bringen, mit kühlem (nicht eiskaltem) Wasser befeuchten, kleine Mengen Wasser zum Trinken anbieten und umgehend einen Tierarzt aufsuchen. Die normale Temperatur liegt bei 38–39 °C, über 40 °C liegt ein lebensbedrohlicher Notfall vor.',
      },
      {
        q: 'Ist mein Hund bei einem Autounfall im Ausland versichert?',
        a: 'Prüfen Sie sowohl Ihre Kfz-Versicherung als auch Ihre Tierkrankenversicherung: Manche übernehmen tierärztliche Notfallkosten im Ausland, andere nicht. Manche Premium-Kfz-Versicherungen beinhalten eine Tierassistance. Schließen Sie vor der Reise eine Tierkrankenversicherung mit internationalem Schutz ab, tierärztliche Notfallkosten in Europa können sehr hoch ausfallen.',
      },
    ],

    relatedTitle: 'Verwandte Guides',
    relatedItems: [
      { href: 'passeport-animal', label: 'Heimtierausweis: der komplette Guide nach Land' },
      { href: 'train-avec-chien', label: 'Mit dem Zug reisen mit Ihrem Hund' },
    ],
    tipTitle: 'Praktischer Tipp',
    tipText: 'Lassen Sie vor einem langen Roadtrip eine tierärztliche Untersuchung durchführen, aktualisieren Sie die Impfungen und fragen Sie, ob Ihr Hund ein Mittel gegen Reisekrankheit benötigt. Ihr Tierarzt kann Ihnen auch Kontakte von Kollegen in Ihrem Zielland nennen.',
    tableHeaderCountry: 'Land',
    tableHeaderMandatory: 'Sicherung Pflicht?',
    tableHeaderFine: 'Bußgeld',
    tableHeaderNotes: 'Spezifische Regeln',
    countryLawTitle: 'Gesetze zur Hundesicherung im Auto nach Land',
  },

  nl: {
    hero: 'Roadtrip met je hond door Europa: de complete gids',
    subtitle: 'Veiligheidswetten in de auto per land, tuigje versus reisbench, grensovergangen, Eurotunnel- en veerbootbeleid, hittepreventie, hoe vaak je moet stoppen en de belangrijkste EHBO-uitrusting, alles voordat je de weg op gaat.',
    lastUpdate: 'Bijgewerkt in',
    breadcrumbGuides: 'Gidsen',
    breadcrumbCurrent: 'Roadtrip met je hond',
    badge: 'Praktische gids',
    sources: 'Geverifieerde bronnen',
    sourcesText: 'Deze gids is gebaseerd op de officiële verkeerswetgeving en regelgeving van de vervoersautoriteiten van elk land (Franse Code de la Route, Duitse StVO, Spaanse DGT / Ley 7/2023, Italiaanse Codice della Strada, Zwitserse verkeerswet), het officiële beleid van Eurotunnel Le Shuttle, DFDS, Brittany Ferries en P&O Ferries, en gepubliceerde diergeneeskundige aanbevelingen. Controleer altijd bij de autoriteiten van je bestemmingsland voordat je vertrekt.',

    checklistTitle: 'Checklist voor vertrek',
    checklist: [
      { icon: '📔', label: 'Actueel Europees dierenpaspoort', note: 'Chip + geldige rabiësvaccinatie' },
      { icon: '🔒', label: 'Crashgetest bevestigingssysteem', note: 'Crashgetest tuigje, vastgezette reisbench of scheidingsnet' },
      { icon: '💧', label: 'Vers water en reisbak', note: 'Bied elke 2 uur water aan' },
      { icon: '🩺', label: 'EHBO-set voor je hond', note: 'Tekentang, antiseptisch middel, verband, muilkorf, contactkaart dierenarts' },
      { icon: '🌡️', label: 'Laat je hond nooit alleen in de auto', note: 'Zelfs in de schaduw kan de temperatuur binnen 10 minuten dodelijk worden' },
      { icon: '🗂️', label: 'Kopieën van documenten (veiligheid)', note: 'Houd de originelen altijd binnen handbereik, nooit in de kofferbak' },
    ],

    safetyTitle: 'Veiligheid in de auto: tuigje, reisbench of scheidingsrek?',
    safetyIntro: 'Bij een botsing van 50 km/u wordt een niet-vastgezette hond van 20 kg een projectiel van 300 kg. Crashtestgegevens laten zeer verschillende beschermingsniveaus zien, afhankelijk van het gekozen systeem.',
    safetyOptions: [
      {
        icon: '🔒',
        title: 'Goed vastgezette reisbench',
        rating: 'Beste bescherming',
        ratingColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        text: 'Een stevige reisbench die is vastgeschroefd aan de bevestigingspunten van de kofferbak of goed is vastgesjord, is de veiligste optie. Stevige wanden verdelen de botsingskrachten rond je hond in plaats van ze op één punt te concentreren. Belangrijk: een reisbench die los in de kofferbak staat, biedt nauwelijks meer bescherming dan een loslopende hond.',
      },
      {
        icon: '🪢',
        title: 'Crashgetest tuigje',
        rating: 'Voldoende indien gecertificeerd',
        ratingColor: 'text-amber-700 bg-amber-50 border-amber-200',
        text: 'Van de 11 tuigjes die zijn getest door het Center for Pet Safety (CPS), slaagde er slechts één. De meeste standaardtuigjes falen boven de 40 km/u. Kies altijd een model met een geverifieerde crashtestcertificering, nooit een gewoon wandeltuigje.',
      },
      {
        icon: '🚧',
        title: 'Scheidingsrek of net',
        rating: 'Gedeeltelijke bescherming',
        ratingColor: 'text-blue-700 bg-blue-50 border-blue-200',
        text: 'Een scheidingsrek voorkomt dat je hond bij de passagiersruimte kan, maar biedt weinig bescherming bij een frontale botsing: je hond kan tegen het rek zelf worden gesmeten. Handig in combinatie met een reisbench; alleen onvoldoende voor lange ritten.',
      },
    ],
    safetyCrashNote: 'Tip: welk systeem je ook kiest, laat je hond er geleidelijk aan wennen voordat je op grote reis gaat.',

    planningTitle: 'De rit plannen',
    planningIntro: 'De meeste dierenartsen raden aan maximaal elke 2 tot 3 uur te stoppen. Puppy\'s, oudere honden en brachycefale rassen (bulldogs, mopshonden...) hebben mogelijk vaker een pauze nodig.',
    planningItems: [
      { icon: '⏱️', title: 'Elke 2 uur een pauze', text: '15 tot 30 minuten wandelen, vers water, lichaamstemperatuur controleren. Rijd niet meer dan 7 uur per dag.' },
      { icon: '💧', title: 'Regelmatig water geven', text: 'Bied bij elke stop water aan. Vermijd zware maaltijden voor vertrek om reisziekte te beperken. Een lege maag 2–3 uur voor vertrek wordt aanbevolen.' },
      { icon: '🌿', title: 'Hondvriendelijke rustplaatsen', text: 'Op Franse snelwegen bieden de netwerken APRR/AREA en Vinci speciaal ingerichte hondenzones (speeltoestellen, hindernissen, schaduwrijke plekken). De kaart met hondvriendelijke rustplaatsen van APRR is beschikbaar via de Fulli-app.' },
      { icon: '🌡️', title: 'Omgaan met hitte', text: 'Bij 25°C buiten bereikt het interieur van de auto in minder dan 30 minuten 50°C. Laat je hond NOOIT alleen in de auto. Een kier openzetten helpt bijna niet: de temperatuurstijging is bijna identiek.' },
    ],

    borderTitle: 'Grensovergangen met de auto',
    borderIntro: 'Binnen het Schengengebied (de meeste EU-landen) zijn grenscontroles zeldzaam, maar documenten moeten op verzoek getoond kunnen worden. Voor landen buiten Schengen kun je een systematische controle verwachten.',
    borderItems: [
      {
        flag: '🇪🇺',
        zone: 'EU-landen (Schengen)',
        docs: 'Europees dierenpaspoort + chip + actuele rabiësvaccinatie',
        notes: 'Controles zijn zeldzaam maar mogelijk. Toon documenten op verzoek. Verplichte controle: Finland, Ierland (lintwormbehandeling verplicht).',
      },
      {
        flag: '🇨🇭',
        zone: 'Zwitserland (buiten de EU, buiten Schengen)',
        docs: 'EU-paspoort of gelijkwaardig document geaccepteerd + chip + rabiësvaccinatie',
        notes: 'Controle bij binnenkomst. Gebruik het rode kanaal voor de aangifte van dieren. Geen extra behandeling nodig voor EU-reizigers.',
      },
      {
        flag: '🇳🇴',
        zone: 'Noorwegen (EER, buiten de EU)',
        docs: 'EU-paspoort geaccepteerd + verplichte lintwormbehandeling 1–5 dagen voor binnenkomst',
        notes: 'Verplichte aangifte bij de Noorse douane (rode kanaal). De Echinococcus-behandeling moet door een dierenarts in het paspoort worden genoteerd.',
      },
      {
        flag: '🇬🇧',
        zone: 'Verenigd Koninkrijk (post-Brexit)',
        docs: 'Gezondheidscertificaat voor dieren (AHC), afgegeven binnen 10 dagen + lintwormbehandeling 1–5 dagen ervoor',
        notes: 'Het EU-dierenpaspoort wordt niet meer geaccepteerd. Alleen via erkende binnenkomstpunten (Dover, St Pancras...). Erkende vervoerder verplicht.',
      },
    ],

    crossingTitle: 'Eurotunnel en veerboten: wat je moet weten',
    eurotunnelTitle: 'Eurotunnel Le Shuttle (Folkestone ↔ Calais)',
    eurotunnelItems: [
      'Je huisdieren blijven tijdens de hele overtocht van 35 minuten in het voertuig, geen scheiding nodig.',
      'Check-in bij de dierenbalie minstens 1 uur voor vertrek (niet meer dan 2 uur).',
      'Beide terminals (Folkestone en Coquelles) hebben 24 uur per dag een dierenbalie.',
      'Vereiste documenten: EU-dierenpaspoort (of AHC vanuit het VK) + lintwormbehandeling voor binnenkomst in Groot-Brittannië.',
      'Kosten: ongeveer £22 per huisdier per reis (bovenop het voertuigticket).',
    ],
    ferriesTitle: 'Veerboten (Het Kanaal en de Noordzee)',
    ferries: [
      {
        name: 'Brittany Ferries',
        notes: 'Huisdiervriendelijke cabines beschikbaar (je hond bij je in de cabine) op de meeste routes. Kennels aan boord ook beschikbaar. Muilkorf verplicht in gemeenschappelijke ruimtes. Vanaf £35 enkele reis.',
      },
      {
        name: 'DFDS',
        notes: 'Huisdiervriendelijke cabines (4 bedden, zeezicht, max. 2 dieren). Kennels aan boord voor €40 per hond per reis. Je hond moet aangelijnd zijn in gemeenschappelijke ruimtes.',
      },
      {
        name: 'P&O Ferries',
        notes: '6 hondvriendelijke cabines per veerboot op de route Hull–Rotterdam (nachtelijke overtocht van ca. 12 uur). Max. 2 kleine honden of 1 middelgrote/grote hond per cabine.',
      },
    ],

    firstAidTitle: 'EHBO-set voor je hond tijdens de autoreis',
    firstAidItems: [
      { icon: '🪲', item: 'Tekentang (x2)', note: 'Essentieel in de zomer en in bosrijke gebieden' },
      { icon: '🩹', item: 'Verband en steriele kompressen', note: 'Om een verwonding te stabiliseren tot je bij een dierenarts bent' },
      { icon: '🧴', item: 'Antiseptisch middel (chloorhexidine of Betadine)', note: 'Wonden en sneden reinigen' },
      { icon: '😷', item: 'Muilkorf op maat van je hond', note: 'Een gewonde hond kan bijten van de pijn, bescherm jezelf voordat je helpt' },
      { icon: '🌡️', item: 'Rectale thermometer', note: 'Normaal: 38–39°C. Boven 40°C = noodgeval' },
      { icon: '🧊', item: 'Herbruikbaar koelelement', note: 'Bij hitteberoerte: geleidelijk afkoelen (nooit ijskoud water)' },
      { icon: '💊', item: 'Door de dierenarts voorgeschreven middel tegen reisziekte', note: 'Vraag ernaar bij je dierenarts vóór vertrek' },
      { icon: '📋', item: 'Contact lokale dierenarts + spoeddierenarts in Europa', note: 'ECVIM-nummer of FindAVet voor je bestemmingsland' },
      { icon: '🚿', item: 'Desinfecterende doekjes en latex handschoenen', note: 'Voor schone basisverzorging' },
      { icon: '📌', item: 'Twee foto\'s van je hond + chipnummer', note: 'Voor het geval hij wegloopt in een vreemd land' },
    ],

    faqTitle: 'Veelgestelde vragen',
    faqs: [
      {
        q: 'Moet mijn hond in Europa vastzitten in de auto?',
        a: 'In de meeste Europese landen (Frankrijk, Duitsland, Spanje, Italië, Zwitserland) wel, al verschilt de wettelijke basis per land. Sommige landen hebben een directe boete voor een loslopende hond; andere baseren zich op de algemene plicht om de bestuurder niet af te leiden. In de praktijk gebruik je altijd een crashgetest bevestigingssysteem, voor de veiligheid van je hond en je eigen juridische bescherming.',
      },
      {
        q: 'Hoe vaak moet ik pauzeren tijdens een lange roadtrip?',
        a: 'Plan elke 2 tot 3 uur een pauze van 15 tot 30 minuten. Puppy\'s, oudere honden en brachycefale rassen (bulldogs, mopshonden...) hebben mogelijk vaker een pauze nodig. Rijd maximaal 7 uur per dag. Bied bij elke stop water aan.',
      },
      {
        q: 'Mag ik mijn hond tijdens een roadtrip alleen in de auto laten?',
        a: 'Niet bij warm of zonnig weer. Bij 25°C buiten kan het interieur van een auto binnen 30 minuten 50–60°C bereiken. Zelfs met een kier open blijft de temperatuurstijging bijna identiek. Plan pauzes als team, gebruik schaduwrijke parkeerplaatsen of een reflecterende zonnescherm. Ook bij strenge winterkou bestaat het risico op onderkoeling.',
      },
      {
        q: 'Heb ik een dierenpaspoort nodig om met de auto een grens over te steken?',
        a: 'Ja. Om met je hond door Europa te reizen, is het Europese dierenpaspoort (of een gelijkwaardig document) onmisbaar. Het moet de ISO-chip en een actuele rabiësvaccinatie bevatten. Voor het VK vervangt een gezondheidscertificaat voor dieren (AHC) sinds de Brexit het EU-paspoort. Voor Noorwegen en Finland is een extra ontwormingsbehandeling verplicht.',
      },
      {
        q: 'Kan ik met mijn hond in de auto door de tunnel het Kanaal oversteken?',
        a: 'Ja, via Eurotunnel Le Shuttle. Je huisdieren blijven tijdens de overtocht van 35 minuten in het voertuig. Check-in bij de dierenbalie minstens 1 uur voor vertrek. Documenten: EU-dierenpaspoort (vanuit Frankrijk) of AHC + lintwormbehandeling (vanuit Groot-Brittannië). Kosten: ongeveer £22 per huisdier bovenop het voertuigticket.',
      },
      {
        q: 'Wat zijn de tekenen van een hitteberoerte bij een hond en wat moet ik doen?',
        a: 'Waarschuwingssignalen: overmatig hijgen, felrood tandvlees, veel kwijlen, wankele tred, braken. Bij vermoeden van een hitteberoerte: breng je hond naar de schaduw, maak hem nat met koel (niet ijskoud) water, bied kleine beetjes water aan om te drinken en ga meteen naar een dierenarts. De normale temperatuur is 38–39°C, boven 40°C is het een levensbedreigend noodgeval.',
      },
      {
        q: 'Is mijn hond verzekerd bij een auto-ongeluk in het buitenland?',
        a: 'Controleer zowel je autoverzekering als je huisdierenverzekering: sommige dekken diergeneeskundige spoedkosten in het buitenland, andere niet. Sommige premium autoverzekeringen bevatten hulp voor huisdieren. Sluit vóór vertrek een huisdierenverzekering met internationale dekking af, spoedkosten bij de dierenarts kunnen in Europa erg hoog oplopen.',
      },
    ],

    relatedTitle: 'Gerelateerde gidsen',
    relatedItems: [
      { href: 'passeport-animal', label: 'Dierenpaspoort: complete gids per land' },
      { href: 'train-avec-chien', label: 'Met de trein reizen met je hond' },
    ],
    tipTitle: 'Praktische tip',
    tipText: 'Laat je hond voor een lange roadtrip nakijken door de dierenarts, werk de vaccinaties bij en vraag of je hond medicatie tegen reisziekte nodig heeft. Je dierenarts kan je ook contactgegevens geven van collega\'s in je bestemmingsland.',
    tableHeaderCountry: 'Land',
    tableHeaderMandatory: 'Vastzetten verplicht?',
    tableHeaderFine: 'Boete',
    tableHeaderNotes: 'Specifieke regels',
    countryLawTitle: 'Wetten voor het vastzetten van je hond in de auto per land',
  },
}

export default async function RoadTripChienPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const lang = locale === 'fr' || locale === 'es' || locale === 'pt' || locale === 'de' || locale === 'nl' ? locale : 'en'
  const copy = COPY[lang] ?? COPY.en
  const today = new Date()
  const monthYear = today.toLocaleDateString(
    locale === 'fr' ? 'fr-FR' : locale === 'es' ? 'es-ES' : locale === 'de' ? 'de-DE' : locale === 'nl' ? 'nl-NL' : 'en-GB',
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

        {/* ── Top hôtels (remonté pour conversion) ──────────────────────── */}
        <TopHotelsStrip
          locale={locale}
          destinationSlugs={['bordeaux', 'marseille', 'geneva', 'munich', 'florence', 'salzburg']}
          campaign="road-trip"
        />

        {/* ── Meilleurs sacs de transport (FR only) ─────────────────────── */}
        {locale === 'fr' && (() => {
          const BAG_ASINS = [
            'B00Q5KBRBA', // Trixie Wings - cabine IATA
            'B000VBPEEU', // Trixie Ryan - souple
            'B07QNZFWHL', // Kurgo G-Train - sac à dos
            'B0002DI0UM', // Petmate Vari Kennel Jr - caisse rigide
            'B01NCHCI3F', // K9 Sport Sack Air - sac frontal
            'B0BYGCW5LY', // Doggyhut Premium L - remorque vélo 2-en-1
          ]
          const bags = BAG_ASINS
            .map(asin => PRODUCTS.find(p => p.asin === asin))
            .filter((p): p is NonNullable<typeof p> => Boolean(p))
          return (
            <section className="bg-amber-50 border-y border-amber-200">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-8">
                  <p className="text-sm font-bold uppercase tracking-widest text-amber-700 mb-2">
                    🎒 Équipement road-trip
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-2">
                    Les 6 meilleurs sacs et caisses de transport
                  </h2>
                  <p className="text-stone-600 max-w-2xl mx-auto">
                    Sac cabine avion, caisse rigide IATA, sac à dos rando, remorque vélo : six
                    options testées pour chaque format de voyage. Liens directs Amazon.fr.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {bags.map((p, i) => (
                    <AmazonProductCard key={p.asin} product={p} campaign="road-trip-bags" rank={i + 1} />
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/fr/accessoires-chien"
                    className="inline-block text-sm font-semibold text-amber-700 hover:text-amber-900 underline"
                  >
                    Voir tous nos accessoires chien voyageur →
                  </Link>
                </div>
                <div className="mt-4 text-center">
                  <AmazonDisclosure />
                </div>
              </div>
            </section>
          )
        })()}

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
                    const isMandatory = rule.mandatory[lang].startsWith('Y') || rule.mandatory[lang].startsWith('O') || rule.mandatory[lang].startsWith('S') || rule.mandatory[lang].startsWith('J')
                    return (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 font-medium text-gray-900">
                          <span className="mr-2">{rule.flag}</span>{rule.country[lang]}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${isMandatory && !rule.mandatory[lang].includes('Recomm') && !rule.mandatory[lang].includes('not') && !rule.mandatory[lang].includes('pas de') && !rule.mandatory[lang].includes('sin') && !rule.mandatory[lang].includes('Empfohlen') ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
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
                📔 {lang === 'fr' ? 'Guide complet passeport animal →' : lang === 'es' ? 'Guía completa del pasaporte →' : lang === 'de' ? 'Kompletter Guide zum Heimtierausweis →' : lang === 'nl' ? 'Complete gids over het dierenpaspoort →' : 'Complete pet passport guide →'}
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

          <GuideFooter locale={locale} currentSlug="road-trip-chien" />

        </div>
      </div>

      <StickyHotelCTA
        href={buildAllezDestLink('Europe', 'Europe', 'road-trip-sticky')}
        label={(STICKY_LABELS_ROAD[locale] ?? STICKY_LABELS_ROAD.en).label}
        cta={(STICKY_LABELS_ROAD[locale] ?? STICKY_LABELS_ROAD.en).cta}
      />
    </>
  )
}
