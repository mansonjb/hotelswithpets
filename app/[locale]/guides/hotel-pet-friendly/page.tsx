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
    en: 'How to Choose a Truly Pet-Friendly Hotel in Europe: The No-Nonsense Guide (2025) | HotelsWithPets.com',
    fr: 'Comment choisir un vrai hôtel pet-friendly en Europe : le guide sans langue de bois (2025) | HotelsWithPets.com',
    es: 'Cómo elegir un hotel realmente pet-friendly en Europa: la guía sin rodeos (2025) | HotelsWithPets.com',
  }
  const descriptions: Record<string, string> = {
    en: 'The definitive guide to decoding hotel pet policies in Europe. Red flags, green flags, questions to ask, real price ranges, and how booking platforms actually work — so you never get a nasty surprise at check-in.',
    fr: 'Le guide définitif pour décoder les politiques animaux des hôtels en Europe. Signaux d\'alarme, bons signes, questions à poser, vrais tarifs et fonctionnement des plateformes de réservation — pour ne plus jamais avoir de mauvaise surprise à l\'arrivée.',
    es: 'La guía definitiva para descifrar las políticas de mascotas en hoteles de Europa. Señales de alerta, buenas señales, preguntas que hacer, rangos de precios reales y cómo funcionan las plataformas de reserva — para no tener sorpresas desagradables al hacer el check-in.',
  }

  const today = new Date().toISOString().split('T')[0]

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/hotel-pet-friendly`,
      languages: {
        en: `${SITE_URL}/en/guides/hotel-pet-friendly`,
        fr: `${SITE_URL}/fr/guides/hotel-pet-friendly`,
        es: `${SITE_URL}/es/guides/hotel-pet-friendly`,
        'x-default': `${SITE_URL}/en/guides/hotel-pet-friendly`,
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

// ─── Copy ──────────────────────────────────────────────────────────────────

const COPY = {
  en: {
    breadcrumbGuides: 'Guides',
    breadcrumbThis: 'How to choose a pet-friendly hotel',
    badge: 'Ultimate guide',
    hero: 'How to choose a truly pet-friendly hotel in Europe',
    subtitle: 'This guide saves you from unpleasant surprises at check-in. Because "pet-friendly" can mean anything from a grudging tolerance to a genuine welcome kit for your dog.',
    lastUpdate: 'Updated in',

    realityTitle: '"Pet-friendly" means very different things',
    realityText: [
      'You search for "pet-friendly hotels", you filter, you book — and you arrive at the front desk with your dog to discover a €50/night surcharge, a ban from the breakfast room, and a laminated sign saying "pets must not be left unattended at any time". Welcome.',
      'At the other end of the spectrum, truly pet-welcoming hotels offer a dog welcome kit (treats, a toy, a bowl), a dedicated dog menu at the restaurant, staff who know the best local dog walks, and a ground-floor room with direct garden access. These hotels exist across Europe at all price points.',
      'The problem is that booking platforms use the same "pet-friendly" label for both. This guide teaches you to tell them apart before you arrive.',
    ],

    redFlagsTitle: 'Red flags: warning signs in hotel descriptions',
    redFlagsIntro: 'Spot these phrases in a hotel description or policy and proceed with caution — or with a phone call.',
    redFlags: [
      { flag: '"Pets considered"', meaning: 'This means they\'ll let you know whether your specific pet is welcome. Translation: not really pet-friendly.' },
      { flag: '"Small pets only" (no size defined)', meaning: 'What counts as small? 5 kg? 10 kg? If there\'s no weight stated, your 12 kg Beagle might be turned away at the door.' },
      { flag: '"Pets allowed in outdoor areas only"', meaning: 'Your dog waits outside while you sleep, eat, and exist. Read: your dog stays tied to a post in the car park.' },
      { flag: 'No mention of weight or breed restriction, but 5 kg cap in fine print', meaning: 'Always read the full pet policy, not just the filter result. Booking.com\'s "pet-friendly" badge doesn\'t guarantee your specific dog qualifies.' },
      { flag: '"Pet fee charged at check-in" (no amount stated)', meaning: 'A blank cheque you sign at midnight after a long drive. Always confirm the exact amount before booking.' },
      { flag: '"Pet-friendly rooms available"', meaning: 'Often means one specific room — farthest from the lift, facing the service entrance, booked solid for the next six months.' },
      { flag: 'No mention of pets on the website at all', meaning: 'If a hotel is proud of being pet-friendly, they say so loudly. Silence usually means they tolerate pets rather than welcome them.' },
    ],

    greenFlagsTitle: 'Green flags: signs of a genuinely pet-friendly hotel',
    greenFlagsIntro: 'These are the things that separate hotels that welcome pets from hotels that merely allow them.',
    greenFlags: [
      { flag: 'Stated pet fee (or explicitly free)', meaning: 'Transparency about pricing is the most reliable indicator of a hotel that has thought seriously about hosting pets.' },
      { flag: 'No breed or weight restrictions (or clearly stated ones)', meaning: 'If they accept all breeds and sizes — or clearly state the limits — they\'ve done the work of setting a real policy.' },
      { flag: 'Pet bed, bowl, mat provided on request', meaning: 'Shows infrastructure investment. These hotels have hosting pets built into their operations.' },
      { flag: 'Dog treats at reception or a dedicated dog menu', meaning: 'This is the gold standard. A hotel with a dog menu has genuinely embraced pet hospitality.' },
      { flag: 'Staff who know local dog walks', meaning: 'Ask when you call to confirm: "Can you recommend a dog walk nearby?" A good answer is a great sign.' },
      { flag: 'Ground floor rooms or guaranteed lift access', meaning: 'A pet-friendly room on the 5th floor with no lift is not actually pet-friendly for anyone with a large dog or mobility issues.' },
      { flag: 'Outdoor shower or paw rinse station', meaning: 'Thoughtful infrastructure. Especially useful after beach or countryside walks.' },
      { flag: 'Pet sitting or dog walking service available', meaning: 'Rare but wonderful. Signals a hotel that sees pets as valued guests, not problems to manage.' },
    ],

    questionsTitle: 'Questions to ask before you book',
    questionsIntro: 'Call or email the hotel directly before confirming. These seven questions will tell you everything you need to know.',
    questions: [
      'What is the exact pet fee per night — and is it per pet?',
      'Are all room types and categories available with a pet, or only specific rooms?',
      'Is there a weight or breed restriction? (State your dog\'s breed and weight.)',
      'Is the fee refundable if the pet causes no damage?',
      'Are pets allowed in common areas — lobby, restaurant, terrace, pool area?',
      'Is there a designated outdoor relief area or nearby park?',
      'Can we leave our pet unattended in the room? Are there any time limits?',
    ],
    questionsTip: 'Pro tip: send these questions by email so you have the answers in writing. If the hotel\'s response is vague, evasive, or takes more than 48 hours — that tells you something too.',

    platformsTitle: 'How booking platforms handle "pet-friendly"',
    platforms: [
      {
        name: 'Booking.com',
        icon: '🔵',
        how: 'Hotels self-declare as pet-friendly when setting up their listing. The filter shows all properties that have checked the box — but the box covers everything from "one cat under 3 kg" to "all pets welcome, no fee". The actual policy is buried in the property details tab. Always click through.',
        tip: 'After filtering, click the hotel page and look for the "Pets" section under "House Rules". This often reveals weight limits, fees, and restrictions not shown in the main listing.',
      },
      {
        name: 'Airbnb',
        icon: '🔴',
        how: 'Hosts opt into a "pets allowed" setting. Cleanliness fees can be significant. Some hosts have undisclosed allergies or pet bans per their building rules. Message the host before booking to confirm your specific pet.',
        tip: 'Airbnb\'s cancellation policies are stricter than hotel policies. Always confirm pet acceptance before paying the non-refundable service fee.',
      },
      {
        name: 'Expedia / Hotels.com',
        icon: '🟡',
        how: 'Similar self-declaration system to Booking.com. Pet policies vary widely. The "pet-friendly" filter is a starting point, not a guarantee.',
        tip: 'Use these platforms to discover options, then verify directly with the hotel before booking for a pet stay.',
      },
      {
        name: 'Direct hotel booking',
        icon: '✅',
        how: 'Always the gold standard for pet stays. You can ask specific questions, request the best pet-suitable room, and sometimes negotiate the fee — especially outside peak season.',
        tip: 'Many independent hotels offer their best pet policies when you book direct, because they can have a real conversation with you about your pet\'s needs.',
      },
    ],
    platformsConclusion: 'The universal rule: filter on a platform to discover options, then call or email the hotel directly to confirm. This one step eliminates 90% of unpleasant check-in surprises.',

    pricesTitle: 'What to expect to pay: pet fees in Europe (2025)',
    pricesIntro: 'Pet fees vary enormously across Europe. Here is what is normal, what is acceptable, and what is excessive.',
    priceTiers: [
      { range: 'Free', label: 'Free / No fee', desc: 'Increasingly common at independent hotels, boutique properties, and in very pet-friendly countries like Germany and the Netherlands. If a hotel advertises this, take them at their word — it\'s a genuine differentiator.', color: 'emerald' },
      { range: '€5–€15/night', label: 'Budget-friendly', desc: 'Standard for budget and mid-range hotels across Southern Europe (Spain, Portugal, Italy, Greece). Perfectly reasonable for what you get.', color: 'blue' },
      { range: '€20–€35/night', label: 'Mid-range standard', desc: 'Typical for 3–4 star hotels in France, Belgium, Switzerland, and Scandinavia. Often includes pet amenities. Acceptable if the hotel genuinely caters to pets.', color: 'amber' },
      { range: '€50+/night', label: 'Luxury tier', desc: 'Common at five-star and design hotels. Can include premium services (pet menu, pet sitting, specialist bedding). Some charge flat fees per stay rather than per night.', color: 'purple' },
      { range: '€80–€150+', label: 'Red flag territory', desc: 'At this level, ask what the fee covers. If it\'s just a surcharge with no services — negotiate, or walk away. Some city hotels in Paris and London have historically charged outrageous amounts with zero corresponding service.', color: 'red' },
    ],
    pricesNote: 'Note: some countries add a city tax for pets separately. Always confirm the total amount including any cleaning deposit, which is typically refundable.',

    categoriesTitle: 'Types of pet-friendly hotel: which is right for you?',
    categories: [
      {
        type: 'Dog-friendly hotels',
        icon: '🐕',
        desc: 'The most common category. Look for properties that explicitly welcome dogs of all sizes, have outdoor space, and are near parks or walking routes.',
        link: '/categories/dog-friendly',
        linkLabel: 'Browse dog-friendly hotels',
      },
      {
        type: 'Cat-friendly hotels',
        icon: '🐈',
        desc: 'Less common and often overlooked. Cats have different needs: indoor comfort, no canine neighbours, quiet floors. Some hotels explicitly cater to cats with designated zones.',
        link: '/categories/cat-friendly',
        linkLabel: 'Browse cat-friendly hotels',
      },
      {
        type: 'Dogs stay free',
        icon: '🆓',
        desc: 'A growing segment across Europe. Many independent and boutique hotels have dropped pet fees entirely as a competitive differentiator. Worth filtering specifically for this.',
        link: '/categories/dogs-stay-free',
        linkLabel: 'Find hotels with no pet fee',
      },
      {
        type: 'Luxury pet stays',
        icon: '⭐',
        desc: 'Five-star hotels in cities like Paris, London, Rome, and Zurich increasingly compete on pet hospitality: welcome gifts, in-room dog menus, dedicated concierge services, and pet-sitting.',
        link: '/categories/luxury-pet-friendly',
        linkLabel: 'Explore luxury pet hotels',
      },
      {
        type: 'Near-park & countryside stays',
        icon: '🌲',
        desc: 'For dogs that need space: hotels near national parks, forests, or coastal paths. Outdoor shower stations and drying rooms are standard in this category.',
        link: '/categories/countryside-pet-friendly',
        linkLabel: 'Countryside pet-friendly hotels',
      },
    ],

    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'What is the average pet fee at a hotel in Europe?',
        a: 'In 2025, the average pet fee at a European hotel ranges from free to around €25 per night. Budget properties in Southern Europe typically charge €10–15/night. Mid-range hotels in France, Belgium, and Scandinavia average €20–30/night. Luxury hotels can charge €50 or more, sometimes with a per-stay flat fee rather than a nightly charge. Germany and the Netherlands have a large proportion of hotels that charge nothing at all.',
      },
      {
        q: 'Can I leave my dog alone in a hotel room?',
        a: 'Policies vary enormously. Many hotels allow it for short periods (2–3 hours) if your dog is crate-trained and won\'t bark. Others prohibit it entirely. Some require pets to be crated even when you\'re present. Always ask explicitly before booking — don\'t assume. If you need to leave your dog regularly, look for hotels with pet-sitting services or those located near doggy daycare facilities.',
      },
      {
        q: 'How do I know if a hotel is genuinely pet-friendly vs just tolerating pets?',
        a: 'The clearest indicators are: (1) transparency about fees with no hidden surprises, (2) specific amenities mentioned (pet bed, bowls, treats, dog menu), (3) staff who can answer your pet-specific questions knowledgeably, and (4) online reviews from other pet owners mentioning their experience. If a hotel\'s pet policy is a single line saying "pets allowed, fee applies", treat it as tolerance rather than welcome.',
      },
      {
        q: 'Are there weight limits I should know about before booking?',
        a: 'Yes — weight limits are the most common source of check-in surprises. Many hotels nominally labelled "pet-friendly" on booking platforms have a 5 kg or 8 kg limit buried in their full policy. Dogs over 10 kg often face restrictions or are banned entirely. Always state your dog\'s breed and weight when enquiring, and get written confirmation that your specific dog is accepted.',
      },
      {
        q: 'Is Booking.com\'s pet-friendly filter reliable?',
        a: 'As a starting point, yes. As a guarantee, no. The filter shows hotels that have self-declared as pet-friendly, but policies vary dramatically. Always click through to the hotel\'s full "House Rules" section on Booking.com, and ideally call or email to confirm before booking. This applies to all booking platforms — the filter narrows the field but doesn\'t do your due diligence for you.',
      },
      {
        q: 'What\'s the difference between "pet-friendly" and "dogs stay free"?',
        a: '"Pet-friendly" means pets are allowed — but typically with a fee. "Dogs stay free" is an explicit policy by the hotel that no pet surcharge applies. The second category is smaller but growing. At HotelsWithPets.com you can filter specifically for no-fee properties to avoid any ambiguity.',
      },
      {
        q: 'Do I need to declare my pet when booking online?',
        a: 'Yes, always. Failing to declare your pet during booking and arriving with one is dishonest and can result in being asked to leave, especially if the hotel has limited pet-designated rooms. It also voids any pet-damage policy protections you might otherwise have. Always tick the pet declaration box, state your pet\'s type and size, and confirm directly with the hotel.',
      },
    ],

    internalLinksTitle: 'Keep exploring',
    internalLinks: [
      { label: 'Browse all pet-friendly hotels in Europe', href: '/search' },
      { label: 'Dog-friendly hotels', href: '/categories/dog-friendly' },
      { label: 'Hotels where dogs stay free', href: '/categories/dogs-stay-free' },
      { label: 'Pet passport requirements by country', href: '/guides/passeport-animal' },
      { label: 'All travel guides', href: '/guides' },
      { label: 'Top destinations for pets in Europe', href: '/destinations' },
    ],

    relatedDestTitle: 'Top pet-friendly destinations in Europe',
    relatedDestText: 'Find the best hotels for your pet in these destinations',
  },

  fr: {
    breadcrumbGuides: 'Guides',
    breadcrumbThis: 'Comment choisir un hôtel pet-friendly',
    badge: 'Guide complet',
    hero: 'Comment choisir un vrai hôtel pet-friendly en Europe',
    subtitle: 'Ce guide vous évite les mauvaises surprises à l\'arrivée. Parce que "pet-friendly" peut signifier aussi bien une tolérance à contrecœur qu\'un vrai kit de bienvenue pour votre chien.',
    lastUpdate: 'Mis à jour en',

    realityTitle: '"Pet-friendly" peut vouloir dire à peu près n\'importe quoi',
    realityText: [
      'Vous cherchez un hôtel acceptant les animaux, vous filtrez, vous réservez — et vous arrivez à la réception avec votre chien pour découvrir un supplément de 50 €/nuit, l\'interdiction de la salle de petit-déjeuner, et un panneau plastifié indiquant "les animaux ne doivent jamais être laissés sans surveillance". Bienvenue.',
      'À l\'autre bout du spectre, les hôtels véritablement accueillants pour les animaux proposent un kit de bienvenue (friandises, jouet, gamelle), un menu dédié aux chiens au restaurant, du personnel qui connaît les meilleures balades locales, et une chambre en rez-de-chaussée avec accès direct au jardin. Ces hôtels existent partout en Europe, à tous les prix.',
      'Le problème, c\'est que les plateformes de réservation utilisent le même label "pet-friendly" pour les deux. Ce guide vous apprend à les distinguer avant d\'arriver.',
    ],

    redFlagsTitle: 'Signaux d\'alarme : les formulations à repérer dans les descriptions',
    redFlagsIntro: 'Repérez ces formules dans la description ou la politique animaux d\'un hôtel — et méfiez-vous, ou appelez avant de réserver.',
    redFlags: [
      { flag: '"Animaux acceptés sur demande"', meaning: 'Traduction : pas vraiment pet-friendly. Ils décideront si votre animal spécifique est le bienvenu — ou non.' },
      { flag: '"Petits animaux uniquement" (sans préciser la taille)', meaning: 'Qu\'est-ce qu\'un "petit" animal ? 5 kg ? 10 kg ? Sans poids précisé, votre Beagle de 12 kg risque d\'être refoulé à la porte.' },
      { flag: '"Animaux autorisés dans les espaces extérieurs uniquement"', meaning: 'Votre chien attend dehors pendant que vous dormez, mangez et vivez. En clair : votre chien reste attaché au parking.' },
      { flag: 'Aucune restriction de poids mentionnée, mais limite de 5 kg dans les conditions générales', meaning: 'Lisez toujours la politique animaux complète, pas seulement le résultat du filtre. Le badge "pet-friendly" de Booking.com ne garantit pas que votre chien est concerné.' },
      { flag: '"Supplément animaux en sus à l\'arrivée" (sans montant)', meaning: 'Un chèque en blanc que vous signez à minuit après une longue route. Confirmez toujours le montant exact avant de réserver.' },
      { flag: '"Chambres pet-friendly disponibles"', meaning: 'Souvent une seule chambre — la plus éloignée de l\'ascenseur, côté entrée de service, réservée six mois à l\'avance.' },
      { flag: 'Aucune mention des animaux sur le site de l\'hôtel', meaning: 'Un hôtel fier d\'accueillir les animaux le dit haut et fort. Le silence signifie généralement tolérance, pas bienvenue.' },
    ],

    greenFlagsTitle: 'Bons signaux : les signes d\'un hôtel vraiment pet-friendly',
    greenFlagsIntro: 'Voici ce qui distingue les hôtels qui accueillent vraiment les animaux de ceux qui se contentent de les tolérer.',
    greenFlags: [
      { flag: 'Supplément animaux indiqué clairement (ou explicitement gratuit)', meaning: 'La transparence tarifaire est l\'indicateur le plus fiable d\'un hôtel qui a réfléchi sérieusement à l\'accueil des animaux.' },
      { flag: 'Aucune restriction de race ou de poids (ou restrictions clairement énoncées)', meaning: 'S\'ils acceptent toutes les races et tailles — ou indiquent clairement les limites — c\'est qu\'ils ont établi une vraie politique.' },
      { flag: 'Panier, gamelle, tapis fournis sur demande', meaning: 'Preuve d\'investissement en infrastructure. Ces hôtels ont intégré l\'accueil des animaux dans leur fonctionnement.' },
      { flag: 'Friandises à la réception ou menu dédié aux chiens', meaning: 'C\'est l\'étalon-or. Un hôtel avec un menu pour chiens a vraiment embrassé l\'hospitalité pour animaux.' },
      { flag: 'Personnel qui connaît les balades locales pour chiens', meaning: 'Posez la question quand vous appelez pour confirmer : "Pouvez-vous recommander une balade avec mon chien ?" Une bonne réponse est un excellent signe.' },
      { flag: 'Chambres en rez-de-chaussée ou accès ascenseur garanti', meaning: 'Une chambre "pet-friendly" au 5e étage sans ascenseur n\'est pas vraiment pet-friendly, surtout avec un grand chien.' },
      { flag: 'Douche extérieure ou station de lavage des pattes', meaning: 'Infrastructure réfléchie. Très utile après une plage ou une balade en campagne.' },
      { flag: 'Service de pet-sitting ou de promenade disponible', meaning: 'Rare mais précieux. Signe que l\'hôtel voit les animaux comme des hôtes à part entière, pas comme des problèmes à gérer.' },
    ],

    questionsTitle: 'Questions à poser avant de réserver',
    questionsIntro: 'Appelez ou écrivez à l\'hôtel directement avant de confirmer. Ces sept questions vous diront tout ce que vous devez savoir.',
    questions: [
      'Quel est le supplément animaux exact par nuit — et est-il par animal ?',
      'Tous les types de chambres sont-ils disponibles avec un animal, ou seulement certaines chambres spécifiques ?',
      'Y a-t-il une restriction de poids ou de race ? (Indiquez la race et le poids de votre chien.)',
      'Le supplément est-il remboursable si l\'animal ne cause aucun dégât ?',
      'Les animaux sont-ils autorisés dans les espaces communs — lobby, restaurant, terrasse, bord de piscine ?',
      'Y a-t-il un espace extérieur désigné pour les besoins de l\'animal ou un parc à proximité ?',
      'Peut-on laisser son animal seul dans la chambre ? Y a-t-il des limites de durée ?',
    ],
    questionsTip: 'Conseil pro : envoyez ces questions par email pour avoir les réponses par écrit. Si les réponses de l\'hôtel sont vagues, évasives, ou mettent plus de 48h — c\'est déjà une information.',

    platformsTitle: 'Comment les plateformes de réservation gèrent le "pet-friendly"',
    platforms: [
      {
        name: 'Booking.com',
        icon: '🔵',
        how: 'Les hôtels se déclarent eux-mêmes "pet-friendly" lors de la création de leur fiche. Le filtre affiche toutes les propriétés qui ont coché la case — mais la case couvre aussi bien "un chat de moins de 3 kg" que "tous les animaux bienvenus, sans supplément". La politique réelle est cachée dans l\'onglet conditions de la fiche. Cliquez toujours dessus.',
        tip: 'Après avoir filtré, cliquez sur la page de l\'hôtel et cherchez la section "Animaux" dans les "Règles de la maison". Elle révèle souvent les limites de poids, les suppléments et les restrictions non affichées dans la fiche principale.',
      },
      {
        name: 'Airbnb',
        icon: '🔴',
        how: 'Les hôtes activent un paramètre "animaux acceptés". Les frais de ménage peuvent être significatifs. Certains hôtes ont des allergies non déclarées ou des interdictions liées au règlement de leur immeuble. Contactez l\'hôte avant de réserver pour confirmer l\'acceptation de votre animal spécifique.',
        tip: 'Les politiques d\'annulation Airbnb sont plus strictes que celles des hôtels. Confirmez toujours l\'acceptation de votre animal avant de payer les frais de service non remboursables.',
      },
      {
        name: 'Expedia / Hotels.com',
        icon: '🟡',
        how: 'Système de déclaration similaire à Booking.com. Les politiques animaux varient énormément. Le filtre "pet-friendly" est un point de départ, pas une garantie.',
        tip: 'Utilisez ces plateformes pour découvrir des options, puis vérifiez directement auprès de l\'hôtel avant de réserver pour un séjour avec animal.',
      },
      {
        name: 'Réservation directe',
        icon: '✅',
        how: 'Toujours le meilleur choix pour les séjours avec animal. Vous pouvez poser des questions précises, demander la meilleure chambre adaptée aux animaux, et parfois négocier le supplément — surtout hors saison.',
        tip: 'Beaucoup d\'hôtels indépendants proposent leurs meilleures conditions animaux en direct, car ils peuvent avoir une vraie conversation sur les besoins de votre animal.',
      },
    ],
    platformsConclusion: 'La règle universelle : filtrez sur une plateforme pour découvrir des options, puis appelez ou écrivez directement à l\'hôtel pour confirmer. Cette seule étape élimine 90 % des mauvaises surprises à l\'arrivée.',

    pricesTitle: 'Ce qu\'il faut prévoir : les suppléments animaux en Europe (2025)',
    pricesIntro: 'Les suppléments animaux varient énormément en Europe. Voici ce qui est normal, acceptable, et ce qui est excessif.',
    priceTiers: [
      { range: 'Gratuit', label: 'Gratuit / Sans supplément', desc: 'De plus en plus courant dans les hôtels indépendants et boutique, et dans les pays très pet-friendly comme l\'Allemagne et les Pays-Bas. Si un hôtel l\'affiche, prenez-les au mot — c\'est un vrai différenciateur.', color: 'emerald' },
      { range: '5–15 €/nuit', label: 'Petit budget', desc: 'Standard pour les hôtels budget et milieu de gamme en Europe du Sud (Espagne, Portugal, Italie, Grèce). Tout à fait raisonnable.', color: 'blue' },
      { range: '20–35 €/nuit', label: 'Milieu de gamme standard', desc: 'Typique pour les hôtels 3–4 étoiles en France, Belgique, Suisse et Scandinavie. Inclut souvent des équipements pour animaux. Acceptable si l\'hôtel s\'occupe vraiment bien des animaux.', color: 'amber' },
      { range: '50 €+/nuit', label: 'Niveau luxe', desc: 'Courant dans les hôtels 5 étoiles et design. Peut inclure des services premium (menu pour chiens, pet-sitting, literie spécialisée). Certains facturent un forfait par séjour plutôt que par nuit.', color: 'purple' },
      { range: '80–150 €+', label: 'Signal d\'alarme', desc: 'À ce niveau, demandez ce que le supplément couvre. S\'il s\'agit d\'une simple surtaxe sans service associé — négociez, ou passez votre chemin. Certains hôtels de ville à Paris ont historiquement facturé des montants scandaleux sans aucun service correspondant.', color: 'red' },
    ],
    pricesNote: 'Note : certains pays ajoutent une taxe de séjour pour les animaux. Confirmez toujours le montant total, dépôt de garantie inclus (généralement remboursable).',

    categoriesTitle: 'Types d\'hébergement pet-friendly : lequel vous convient ?',
    categories: [
      {
        type: 'Hôtels dog-friendly',
        icon: '🐕',
        desc: 'La catégorie la plus courante. Cherchez des établissements qui accueillent explicitement les chiens de toutes tailles, disposent d\'espaces extérieurs et sont proches de parcs ou de sentiers.',
        link: '/categories/dog-friendly',
        linkLabel: 'Voir les hôtels dog-friendly',
      },
      {
        type: 'Hôtels cat-friendly',
        icon: '🐈',
        desc: 'Moins courant et souvent oublié. Les chats ont des besoins différents : confort intérieur, pas de voisins canins, étages calmes. Certains hôtels s\'adressent spécifiquement aux chats avec des zones dédiées.',
        link: '/categories/cat-friendly',
        linkLabel: 'Voir les hôtels cat-friendly',
      },
      {
        type: 'Chiens gratuits',
        icon: '🆓',
        desc: 'Un segment en pleine croissance en Europe. Beaucoup d\'hôtels indépendants et boutique ont supprimé les suppléments animaux comme différenciateur concurrentiel. Vaut la peine de filtrer spécifiquement.',
        link: '/categories/dogs-stay-free',
        linkLabel: 'Hôtels sans supplément animaux',
      },
      {
        type: 'Séjours luxe avec animaux',
        icon: '⭐',
        desc: 'Les hôtels 5 étoiles à Paris, Londres, Rome et Zurich rivalisent de plus en plus sur l\'hospitalité animaux : cadeaux de bienvenue, menus en chambre pour chiens, service de conciergerie dédié et pet-sitting.',
        link: '/categories/luxury-pet-friendly',
        linkLabel: 'Hôtels luxe pet-friendly',
      },
      {
        type: 'Séjours près des parcs et à la campagne',
        icon: '🌲',
        desc: 'Pour les chiens qui ont besoin d\'espace : hôtels proches de parcs nationaux, forêts ou sentiers côtiers. Douches extérieures et séchoirs sont souvent la norme dans cette catégorie.',
        link: '/categories/countryside-pet-friendly',
        linkLabel: 'Hôtels pet-friendly à la campagne',
      },
    ],

    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Combien coûte le supplément animaux en moyenne dans un hôtel en Europe ?',
        a: 'En 2025, le supplément animaux moyen dans un hôtel européen varie de gratuit à environ 25 €/nuit. Les établissements budget en Europe du Sud facturent généralement 10–15 €/nuit. Les hôtels milieu de gamme en France, Belgique et Scandinavie tournent autour de 20–30 €/nuit. Les hôtels de luxe peuvent facturer 50 € ou plus, parfois sous forme de forfait par séjour plutôt que par nuit. L\'Allemagne et les Pays-Bas ont une large proportion d\'hôtels qui ne facturent rien du tout.',
      },
      {
        q: 'Puis-je laisser mon chien seul dans la chambre d\'hôtel ?',
        a: 'Les politiques varient énormément. Beaucoup d\'hôtels le permettent pour de courtes périodes (2–3 heures) si votre chien est habitué à la cage et n\'aboie pas. D\'autres l\'interdisent totalement. Certains exigent que les animaux soient en cage même en votre présence. Demandez toujours explicitement avant de réserver — ne supposez rien. Si vous devez laisser votre chien régulièrement, cherchez des hôtels proposant du pet-sitting ou situés à proximité de services de garde.',
      },
      {
        q: 'Comment savoir si un hôtel est vraiment pet-friendly ou s\'il tolère juste les animaux ?',
        a: 'Les indicateurs les plus clairs sont : (1) transparence sur les tarifs sans mauvaises surprises, (2) équipements spécifiques mentionnés (panier, gamelles, friandises, menu pour chiens), (3) personnel capable de répondre à vos questions sur les animaux de façon précise, et (4) avis en ligne d\'autres propriétaires d\'animaux mentionnant leur expérience. Si la politique animaux d\'un hôtel se résume à "animaux acceptés, supplément applicable", traitez-le comme de la tolérance plutôt que de l\'accueil.',
      },
      {
        q: 'Y a-t-il des limites de poids que je dois connaître avant de réserver ?',
        a: 'Oui — les limites de poids sont la source la plus fréquente de mauvaises surprises à l\'arrivée. Beaucoup d\'hôtels nominalement "pet-friendly" sur les plateformes ont une limite de 5 ou 8 kg enterrée dans leur politique complète. Les chiens de plus de 10 kg font souvent face à des restrictions ou sont carrément refusés. Indiquez toujours la race et le poids de votre chien lors de votre demande, et obtenez une confirmation écrite que votre chien spécifique est accepté.',
      },
      {
        q: 'Le filtre pet-friendly de Booking.com est-il fiable ?',
        a: 'Comme point de départ, oui. Comme garantie, non. Le filtre affiche les hôtels qui se sont auto-déclarés pet-friendly, mais les politiques varient énormément. Cliquez toujours sur la section "Règles de la maison" de la fiche Booking.com, et idéalement appelez ou écrivez pour confirmer avant de réserver. C\'est valable pour toutes les plateformes — le filtre réduit le champ mais ne fait pas votre travail de vérification à votre place.',
      },
      {
        q: 'Quelle est la différence entre "pet-friendly" et "chiens gratuits" ?',
        a: '"Pet-friendly" signifie que les animaux sont acceptés — mais généralement avec un supplément. "Chiens gratuits" est une politique explicite de l\'hôtel indiquant qu\'aucune surtaxe animaux ne s\'applique. Cette deuxième catégorie est plus petite mais en croissance. Sur HotelsWithPets.com, vous pouvez filtrer spécifiquement les établissements sans supplément pour éviter toute ambiguïté.',
      },
      {
        q: 'Dois-je déclarer mon animal lors de la réservation en ligne ?',
        a: 'Oui, toujours. Réserver sans déclarer votre animal et arriver avec lui est malhonnête et peut conduire à vous demander de partir, surtout si l\'hôtel dispose d\'un nombre limité de chambres pet-friendly. Cela annule aussi les éventuelles protections liées aux dommages causés par les animaux. Cochez toujours la case de déclaration, précisez le type et la taille de votre animal, et confirmez directement avec l\'hôtel.',
      },
    ],

    internalLinksTitle: 'Continuez à explorer',
    internalLinks: [
      { label: 'Trouver tous les hôtels pet-friendly en Europe', href: '/search' },
      { label: 'Hôtels dog-friendly', href: '/categories/dog-friendly' },
      { label: 'Hôtels où les chiens séjournent gratuitement', href: '/categories/dogs-stay-free' },
      { label: 'Exigences passeport animal par pays', href: '/guides/passeport-animal' },
      { label: 'Tous les guides de voyage', href: '/guides' },
      { label: 'Meilleures destinations pet-friendly en Europe', href: '/destinations' },
    ],

    relatedDestTitle: 'Meilleures destinations pet-friendly en Europe',
    relatedDestText: 'Trouvez les meilleurs hôtels pour votre animal dans ces destinations',
  },

  es: {
    breadcrumbGuides: 'Guías',
    breadcrumbThis: 'Cómo elegir un hotel pet-friendly',
    badge: 'Guía completa',
    hero: 'Cómo elegir un hotel realmente pet-friendly en Europa',
    subtitle: 'Esta guía te evita las sorpresas desagradables al hacer el check-in. Porque "pet-friendly" puede significar desde una tolerancia a regañadientes hasta un auténtico kit de bienvenida para tu perro.',
    lastUpdate: 'Actualizado en',

    realityTitle: '"Pet-friendly" puede significar cosas muy diferentes',
    realityText: [
      'Buscas un hotel que acepte mascotas, filtras, reservas — y llegas a recepción con tu perro para descubrir un suplemento de 50 €/noche, la prohibición de entrar al comedor, y un cartel plastificado que dice "las mascotas no pueden dejarse sin vigilancia en ningún momento". Bienvenido.',
      'En el otro extremo, los hoteles verdaderamente acogedores para mascotas ofrecen un kit de bienvenida (snacks, un juguete, un cuenco), un menú dedicado para perros en el restaurante, personal que conoce los mejores paseos locales, y una habitación en planta baja con acceso directo al jardín. Estos hoteles existen en toda Europa a todos los precios.',
      'El problema es que las plataformas de reserva usan la misma etiqueta "pet-friendly" para ambos. Esta guía te enseña a distinguirlos antes de llegar.',
    ],

    redFlagsTitle: 'Señales de alarma: avisos en las descripciones de hoteles',
    redFlagsIntro: 'Detecta estas frases en la descripción o política de mascotas de un hotel — y procede con precaución o con una llamada previa.',
    redFlags: [
      { flag: '"Mascotas bajo consulta"', meaning: 'Significa que decidirán si tu mascota específica es bienvenida. Traducción: no es realmente pet-friendly.' },
      { flag: '"Solo mascotas pequeñas" (sin definir el tamaño)', meaning: '¿Qué cuenta como pequeño? ¿5 kg? ¿10 kg? Si no hay peso indicado, tu Beagle de 12 kg podría ser rechazado en la puerta.' },
      { flag: '"Mascotas permitidas solo en zonas exteriores"', meaning: 'Tu perro espera fuera mientras duermes, comes y vives. Léase: tu perro espera atado en el aparcamiento.' },
      { flag: 'Sin mención de límite de peso, pero límite de 5 kg en la letra pequeña', meaning: 'Lee siempre la política de mascotas completa, no solo el resultado del filtro. El badge "pet-friendly" de Booking.com no garantiza que tu perro específico esté incluido.' },
      { flag: '"Suplemento por mascota a cobrar en el check-in" (sin indicar el importe)', meaning: 'Un cheque en blanco que firmas a medianoche tras un viaje largo. Confirma siempre el importe exacto antes de reservar.' },
      { flag: '"Habitaciones pet-friendly disponibles"', meaning: 'A menudo significa una sola habitación — la más lejos del ascensor, frente a la entrada de servicio, reservada durante los próximos seis meses.' },
      { flag: 'Sin ninguna mención a mascotas en la web del hotel', meaning: 'Un hotel orgulloso de acoger mascotas lo dice bien alto. El silencio suele indicar tolerancia, no bienvenida.' },
    ],

    greenFlagsTitle: 'Buenas señales: indicadores de un hotel genuinamente pet-friendly',
    greenFlagsIntro: 'Esto es lo que separa a los hoteles que dan la bienvenida a las mascotas de los que simplemente las permiten.',
    greenFlags: [
      { flag: 'Suplemento por mascota indicado claramente (o explícitamente gratuito)', meaning: 'La transparencia en los precios es el indicador más fiable de un hotel que ha pensado seriamente en acoger mascotas.' },
      { flag: 'Sin restricciones de raza o peso (o restricciones claramente indicadas)', meaning: 'Si aceptan todas las razas y tamaños — o indican claramente los límites — han hecho el trabajo de establecer una política real.' },
      { flag: 'Cama, cuenco, alfombra para mascotas disponibles bajo petición', meaning: 'Demuestra inversión en infraestructura. Estos hoteles tienen el alojamiento de mascotas integrado en sus operaciones.' },
      { flag: 'Snacks para perros en recepción o menú dedicado para perros', meaning: 'Este es el estándar de oro. Un hotel con menú para perros ha abrazado genuinamente la hospitalidad para mascotas.' },
      { flag: 'Personal que conoce los paseos locales para perros', meaning: 'Pregunta cuando llames para confirmar: "¿Pueden recomendarme un paseo con mi perro cerca?" Una buena respuesta es una señal excelente.' },
      { flag: 'Habitaciones en planta baja o acceso garantizado al ascensor', meaning: 'Una habitación "pet-friendly" en el 5.º piso sin ascensor no es realmente pet-friendly para nadie con un perro grande.' },
      { flag: 'Ducha exterior o estación para limpiar las patas', meaning: 'Infraestructura bien pensada. Especialmente útil después de paseos por la playa o el campo.' },
      { flag: 'Servicio de pet-sitting o paseo de perros disponible', meaning: 'Poco frecuente pero muy valioso. Indica un hotel que ve a las mascotas como huéspedes valorados, no como problemas a gestionar.' },
    ],

    questionsTitle: 'Preguntas que hacer antes de reservar',
    questionsIntro: 'Llama o escribe al hotel directamente antes de confirmar. Estas siete preguntas te dirán todo lo que necesitas saber.',
    questions: [
      '¿Cuál es el suplemento exacto por mascota por noche — y es por mascota?',
      '¿Están disponibles todos los tipos de habitación con una mascota, o solo habitaciones específicas?',
      '¿Hay restricciones de peso o raza? (Indica la raza y el peso de tu perro.)',
      '¿Es reembolsable el suplemento si la mascota no causa daños?',
      '¿Se permite la entrada de mascotas en las zonas comunes — lobby, restaurante, terraza, zona de piscina?',
      '¿Hay una zona exterior designada para las necesidades de la mascota o un parque cercano?',
      '¿Podemos dejar a nuestra mascota sola en la habitación? ¿Hay límites de tiempo?',
    ],
    questionsTip: 'Consejo pro: envía estas preguntas por email para tener las respuestas por escrito. Si la respuesta del hotel es vaga, evasiva o tarda más de 48 horas — eso también te dice algo.',

    platformsTitle: 'Cómo gestionan las plataformas de reserva el "pet-friendly"',
    platforms: [
      {
        name: 'Booking.com',
        icon: '🔵',
        how: 'Los hoteles se auto-declaran "pet-friendly" al configurar su anuncio. El filtro muestra todas las propiedades que han marcado la casilla — pero la casilla abarca desde "un gato de menos de 3 kg" hasta "todas las mascotas bienvenidas, sin cargo". La política real está enterrada en la pestaña de detalles de la propiedad. Haz siempre clic para verla.',
        tip: 'Tras filtrar, accede a la página del hotel y busca la sección "Mascotas" en "Normas de la casa". A menudo revela límites de peso, cargos y restricciones no mostradas en el anuncio principal.',
      },
      {
        name: 'Airbnb',
        icon: '🔴',
        how: 'Los anfitriones activan un ajuste de "mascotas permitidas". Las tarifas de limpieza pueden ser significativas. Algunos anfitriones tienen alergias no declaradas o prohibiciones por las normas de su edificio. Contacta al anfitrión antes de reservar para confirmar que tu mascota específica es aceptada.',
        tip: 'Las políticas de cancelación de Airbnb son más estrictas que las de los hoteles. Confirma siempre la aceptación de tu mascota antes de pagar la tarifa de servicio no reembolsable.',
      },
      {
        name: 'Expedia / Hotels.com',
        icon: '🟡',
        how: 'Sistema de auto-declaración similar a Booking.com. Las políticas de mascotas varían enormemente. El filtro "pet-friendly" es un punto de partida, no una garantía.',
        tip: 'Usa estas plataformas para descubrir opciones, luego verifica directamente con el hotel antes de reservar para una estancia con mascota.',
      },
      {
        name: 'Reserva directa',
        icon: '✅',
        how: 'Siempre el estándar de oro para estancias con mascotas. Puedes hacer preguntas específicas, solicitar la mejor habitación apta para mascotas, y a veces negociar el cargo — especialmente fuera de temporada alta.',
        tip: 'Muchos hoteles independientes ofrecen sus mejores condiciones para mascotas cuando reservas directamente, porque pueden tener una conversación real sobre las necesidades de tu mascota.',
      },
    ],
    platformsConclusion: 'La regla universal: filtra en una plataforma para descubrir opciones, luego llama o escribe directamente al hotel para confirmar. Este único paso elimina el 90% de las sorpresas desagradables al hacer el check-in.',

    pricesTitle: 'Qué esperar pagar: suplementos por mascota en Europa (2025)',
    pricesIntro: 'Los suplementos por mascota varían enormemente en Europa. Esto es lo que es normal, lo que es aceptable y lo que es excesivo.',
    priceTiers: [
      { range: 'Gratuito', label: 'Gratis / Sin suplemento', desc: 'Cada vez más común en hoteles independientes y boutique, y en países muy pet-friendly como Alemania y los Países Bajos. Si un hotel lo anuncia, tómales la palabra — es un diferenciador genuino.', color: 'emerald' },
      { range: '5–15 €/noche', label: 'Económico', desc: 'Estándar para hoteles de presupuesto y gama media en el sur de Europa (España, Portugal, Italia, Grecia). Perfectamente razonable por lo que obtienes.', color: 'blue' },
      { range: '20–35 €/noche', label: 'Gama media estándar', desc: 'Típico en hoteles de 3–4 estrellas en Francia, Bélgica, Suiza y Escandinavia. A menudo incluye comodidades para mascotas. Aceptable si el hotel realmente cuida a las mascotas.', color: 'amber' },
      { range: '50 €+/noche', label: 'Nivel lujo', desc: 'Común en hoteles de cinco estrellas y de diseño. Puede incluir servicios premium (menú para mascotas, pet-sitting, ropa de cama especializada). Algunos cobran tarifas fijas por estancia en lugar de por noche.', color: 'purple' },
      { range: '80–150 €+', label: 'Territorio de alerta roja', desc: 'A este nivel, pregunta qué cubre el suplemento. Si es solo un recargo sin servicios — negocia o busca otra opción. Algunos hoteles de ciudad en París han cobrado históricamente cantidades exorbitantes sin ningún servicio correspondiente.', color: 'red' },
    ],
    pricesNote: 'Nota: algunos países añaden una tasa turística para mascotas por separado. Confirma siempre el importe total incluyendo cualquier depósito de seguridad, que suele ser reembolsable.',

    categoriesTitle: 'Tipos de alojamiento pet-friendly: ¿cuál es el adecuado para ti?',
    categories: [
      {
        type: 'Hoteles dog-friendly',
        icon: '🐕',
        desc: 'La categoría más común. Busca propiedades que acojan explícitamente perros de todos los tamaños, tengan espacio al aire libre y estén cerca de parques o rutas de senderismo.',
        link: '/categories/dog-friendly',
        linkLabel: 'Ver hoteles dog-friendly',
      },
      {
        type: 'Hoteles cat-friendly',
        icon: '🐈',
        desc: 'Menos común y a menudo ignorado. Los gatos tienen necesidades diferentes: comodidad interior, sin vecinos caninos, pisos tranquilos. Algunos hoteles se dirigen específicamente a los gatos con zonas designadas.',
        link: '/categories/cat-friendly',
        linkLabel: 'Ver hoteles cat-friendly',
      },
      {
        type: 'Perros gratis',
        icon: '🆓',
        desc: 'Un segmento en crecimiento en Europa. Muchos hoteles independientes y boutique han eliminado las tarifas por mascotas como diferenciador competitivo. Vale la pena filtrar específicamente por esto.',
        link: '/categories/dogs-stay-free',
        linkLabel: 'Hoteles sin suplemento por mascota',
      },
      {
        type: 'Estancias de lujo con mascotas',
        icon: '⭐',
        desc: 'Los hoteles de cinco estrellas en ciudades como París, Londres, Roma y Zúrich compiten cada vez más en hospitalidad para mascotas: regalos de bienvenida, menús en habitación para perros, servicios de conserjería dedicados y pet-sitting.',
        link: '/categories/luxury-pet-friendly',
        linkLabel: 'Hoteles de lujo pet-friendly',
      },
      {
        type: 'Estancias cerca de parques y en el campo',
        icon: '🌲',
        desc: 'Para perros que necesitan espacio: hoteles cerca de parques nacionales, bosques o senderos costeros. Las duchas exteriores y zonas de secado son habituales en esta categoría.',
        link: '/categories/countryside-pet-friendly',
        linkLabel: 'Hoteles pet-friendly en el campo',
      },
    ],

    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Cuánto cuesta de media el suplemento por mascota en un hotel en Europa?',
        a: 'En 2025, el suplemento medio por mascota en un hotel europeo oscila entre gratuito y unos 25 €/noche. Los establecimientos de presupuesto en el sur de Europa suelen cobrar entre 10 y 15 €/noche. Los hoteles de gama media en Francia, Bélgica y Escandinavia rondan los 20–30 €/noche. Los hoteles de lujo pueden cobrar 50 € o más, a veces como tarifa fija por estancia en lugar de por noche. Alemania y los Países Bajos tienen una gran proporción de hoteles que no cobran nada.',
      },
      {
        q: '¿Puedo dejar a mi perro solo en la habitación del hotel?',
        a: 'Las políticas varían enormemente. Muchos hoteles lo permiten por períodos cortos (2–3 horas) si tu perro está acostumbrado a la jaula y no ladra. Otros lo prohíben completamente. Algunos exigen que las mascotas estén en jaula incluso cuando estás presente. Pregunta siempre explícitamente antes de reservar — no lo des por supuesto. Si necesitas dejar a tu perro con regularidad, busca hoteles con servicios de pet-sitting o ubicados cerca de guarderías caninas.',
      },
      {
        q: '¿Cómo sé si un hotel es realmente pet-friendly o si simplemente tolera las mascotas?',
        a: 'Los indicadores más claros son: (1) transparencia en los precios sin sorpresas ocultas, (2) comodidades específicas mencionadas (cama para mascotas, cuencos, snacks, menú para perros), (3) personal que puede responder tus preguntas sobre mascotas con conocimiento, y (4) reseñas en línea de otros propietarios de mascotas mencionando su experiencia. Si la política de mascotas de un hotel se resume en una línea que dice "mascotas aceptadas, se aplica suplemento", trátalo como tolerancia más que como bienvenida.',
      },
      {
        q: '¿Hay límites de peso que deba conocer antes de reservar?',
        a: 'Sí — los límites de peso son la fuente más común de sorpresas desagradables al hacer el check-in. Muchos hoteles nominalmente "pet-friendly" en las plataformas tienen un límite de 5 u 8 kg enterrado en su política completa. Los perros de más de 10 kg a menudo se enfrentan a restricciones o están directamente prohibidos. Indica siempre la raza y el peso de tu perro al consultar, y obtén confirmación escrita de que tu perro específico es aceptado.',
      },
      {
        q: '¿Es fiable el filtro pet-friendly de Booking.com?',
        a: 'Como punto de partida, sí. Como garantía, no. El filtro muestra hoteles que se han auto-declarado pet-friendly, pero las políticas varían enormemente. Haz siempre clic en la sección "Normas de la casa" de la ficha de Booking.com, y lo ideal es llamar o escribir para confirmar antes de reservar. Esto se aplica a todas las plataformas — el filtro reduce el campo pero no hace tu due diligence por ti.',
      },
      {
        q: '¿Cuál es la diferencia entre "pet-friendly" y "perros gratis"?',
        a: '"Pet-friendly" significa que se aceptan mascotas — pero normalmente con un suplemento. "Perros gratis" es una política explícita del hotel que indica que no se aplica ningún recargo por mascota. Esta segunda categoría es más pequeña pero está creciendo. En HotelsWithPets.com puedes filtrar específicamente por propiedades sin suplemento para evitar cualquier ambigüedad.',
      },
      {
        q: '¿Tengo que declarar mi mascota al reservar en línea?',
        a: 'Sí, siempre. Reservar sin declarar tu mascota y llegar con ella es deshonesto y puede resultar en que te pidan que te vayas, especialmente si el hotel tiene habitaciones pet-friendly limitadas. También anula cualquier protección por daños causados por mascotas que de otro modo podrías tener. Marca siempre la casilla de declaración de mascotas, indica el tipo y tamaño de tu mascota, y confirma directamente con el hotel.',
      },
    ],

    internalLinksTitle: 'Sigue explorando',
    internalLinks: [
      { label: 'Ver todos los hoteles pet-friendly en Europa', href: '/search' },
      { label: 'Hoteles dog-friendly', href: '/categories/dog-friendly' },
      { label: 'Hoteles donde los perros se quedan gratis', href: '/categories/dogs-stay-free' },
      { label: 'Requisitos de pasaporte para mascotas por país', href: '/guides/passeport-animal' },
      { label: 'Todas las guías de viaje', href: '/guides' },
      { label: 'Mejores destinos pet-friendly en Europa', href: '/destinations' },
    ],

    relatedDestTitle: 'Mejores destinos pet-friendly en Europa',
    relatedDestText: 'Encuentra los mejores hoteles para tu mascota en estos destinos',
  },
}

const PRICE_COLOR_MAP: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200', dot: 'bg-blue-500' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', dot: 'bg-amber-500' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200', dot: 'bg-purple-500' },
  red: { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200', dot: 'bg-red-500' },
}

const RELATED_DESTINATIONS = [
  { slug: 'amsterdam', flag: '🇳🇱' },
  { slug: 'paris', flag: '🇫🇷' },
  { slug: 'barcelona', flag: '🇪🇸' },
  { slug: 'rome', flag: '🇮🇹' },
  { slug: 'lisbon', flag: '🇵🇹' },
  { slug: 'berlin', flag: '🇩🇪' },
  { slug: 'vienna', flag: '🇦🇹' },
  { slug: 'prague', flag: '🇨🇿' },
  { slug: 'london', flag: '🇬🇧' },
  { slug: 'budapest', flag: '🇭🇺' },
]

export default async function HotelPetFriendlyGuidePage({
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
    mainEntityOfPage: `${SITE_URL}/${locale}/guides/hotel-pet-friendly`,
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

        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-teal-950 to-emerald-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Link href={`/${locale}/guides`} className="text-teal-300 hover:text-white text-sm transition-colors">
                ← {copy.breadcrumbGuides}
              </Link>
              <span className="text-teal-500 text-sm">/</span>
              <span className="text-teal-400 text-sm">{copy.breadcrumbThis}</span>
            </div>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs font-medium mb-5">
              🐾 {copy.badge} · {copy.lastUpdate} {monthYear}
            </span>
            <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">{copy.hero}</h1>
            <p className="text-teal-200 text-base leading-relaxed max-w-3xl">{copy.subtitle}</p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Reality check */}
          <section className="mb-12">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 mb-6">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-5 flex items-center gap-3">
                <span className="text-2xl">🔎</span>
                {copy.realityTitle}
              </h2>
              <div className="space-y-4">
                {copy.realityText.map((para, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
          </section>

          {/* Red flags */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2 flex items-center gap-3">
              <span className="text-2xl">🚩</span>
              {copy.redFlagsTitle}
            </h2>
            <p className="text-gray-500 text-sm mb-6">{copy.redFlagsIntro}</p>
            <div className="space-y-3">
              {copy.redFlags.map((item, i) => (
                <div key={i} className="bg-red-50 border border-red-100 rounded-xl p-5 flex gap-4">
                  <span className="flex-shrink-0 text-red-500 text-lg mt-0.5">⚠️</span>
                  <div>
                    <p className="font-semibold text-red-900 text-sm mb-1">{item.flag}</p>
                    <p className="text-red-700 text-sm leading-relaxed">{item.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Green flags */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2 flex items-center gap-3">
              <span className="text-2xl">✅</span>
              {copy.greenFlagsTitle}
            </h2>
            <p className="text-gray-500 text-sm mb-6">{copy.greenFlagsIntro}</p>
            <div className="space-y-3">
              {copy.greenFlags.map((item, i) => (
                <div key={i} className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 flex gap-4">
                  <span className="flex-shrink-0 text-emerald-500 text-lg mt-0.5">✓</span>
                  <div>
                    <p className="font-semibold text-emerald-900 text-sm mb-1">{item.flag}</p>
                    <p className="text-emerald-800 text-sm leading-relaxed">{item.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Questions to ask */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2 flex items-center gap-3">
              <span className="text-2xl">📋</span>
              {copy.questionsTitle}
            </h2>
            <p className="text-gray-500 text-sm mb-6">{copy.questionsIntro}</p>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {copy.questions.map((q, i) => (
                <div key={i} className={`flex items-start gap-4 p-5 ${i < copy.questions.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">{i + 1}</span>
                  <p className="text-gray-800 text-sm leading-relaxed">{q}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
              <span className="text-amber-500 flex-shrink-0 text-lg">💡</span>
              <p className="text-amber-800 text-sm leading-relaxed">{copy.questionsTip}</p>
            </div>
          </section>

          {/* Platform comparison */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-2xl">🖥️</span>
              {copy.platformsTitle}
            </h2>
            <div className="space-y-4">
              {copy.platforms.map((platform, i) => (
                <div key={i} className={`bg-white rounded-xl border shadow-sm p-6 ${platform.icon === '✅' ? 'border-emerald-200' : 'border-gray-100'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{platform.icon}</span>
                    <h3 className="font-bold text-gray-900">{platform.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{platform.how}</p>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
                    <p className="text-blue-800 text-xs leading-relaxed"><span className="font-semibold">Tip: </span>{platform.tip}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-slate-800 text-white rounded-2xl p-6">
              <p className="text-sm leading-relaxed text-slate-200">{copy.platformsConclusion}</p>
            </div>
          </section>

          {/* Price reality check */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2 flex items-center gap-3">
              <span className="text-2xl">💶</span>
              {copy.pricesTitle}
            </h2>
            <p className="text-gray-500 text-sm mb-6">{copy.pricesIntro}</p>
            <div className="space-y-3">
              {copy.priceTiers.map((tier, i) => {
                const colors = PRICE_COLOR_MAP[tier.color]
                return (
                  <div key={i} className={`rounded-xl border p-5 ${colors.bg} ${colors.border}`}>
                    <div className="flex items-start gap-3">
                      <span className={`flex-shrink-0 w-2.5 h-2.5 rounded-full mt-2 ${colors.dot}`} />
                      <div>
                        <div className="flex items-center gap-3 flex-wrap mb-1">
                          <span className={`font-extrabold text-lg ${colors.text}`}>{tier.range}</span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-white/60 ${colors.text}`}>{tier.label}</span>
                        </div>
                        <p className={`text-sm leading-relaxed ${colors.text}`}>{tier.desc}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-gray-400 mt-4 italic">{copy.pricesNote}</p>
          </section>

          {/* Categories guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-2xl">🏨</span>
              {copy.categoriesTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {copy.categories.map((cat, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{cat.icon}</span>
                    <h3 className="font-bold text-gray-900 text-sm">{cat.type}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{cat.desc}</p>
                  <Link
                    href={`/${locale}${cat.link}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {cat.linkLabel} →
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
              <span className="text-2xl">❓</span>
              {copy.faqTitle}
            </h2>
            <div className="space-y-4">
              {copy.faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <section className="mb-12">
            <h2 className="text-xl font-extrabold text-gray-900 mb-5">{copy.internalLinksTitle}</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {copy.internalLinks.map((link, i) => (
                <Link
                  key={i}
                  href={`/${locale}${link.href}`}
                  className={`flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors ${i < copy.internalLinks.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                  <span className="text-blue-500 flex-shrink-0">→</span>
                  <span className="text-sm font-medium text-gray-800 hover:text-blue-700">{link.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Related destinations */}
          <section className="mb-8">
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">{copy.relatedDestTitle}</h2>
            <p className="text-sm text-gray-500 mb-6">{copy.relatedDestText}</p>
            <div className="flex flex-wrap gap-2">
              {RELATED_DESTINATIONS.map(({ slug, flag }) => (
                <Link
                  key={slug}
                  href={`/${locale}/destinations/${slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium bg-white border border-gray-200 hover:border-teal-300 hover:bg-teal-50 text-gray-700 hover:text-teal-700 px-4 py-2 rounded-full transition-all shadow-sm"
                >
                  {flag} {slug.charAt(0).toUpperCase() + slug.slice(1)}
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  )
}
