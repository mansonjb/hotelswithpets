/**
 * Generates rich, locale-aware, varied pet policy descriptions from structured hotel data.
 * Uses a deterministic hash of the hotel name to select sentence variants, so each hotel
 * gets a unique-feeling text while remaining stable across renders.
 */

interface HotelSnapshot {
  name: string
  petFee: number
  stars: number
  rating?: number
  categories: string[]
  highlights?: string[]
}

/** Stable hash → always same variants for same hotel name */
function nameHash(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0
  }
  return h
}

function pick<T>(arr: T[], seed: number, offset = 0): T {
  return arr[(seed + offset) % arr.length]
}

/** Map a highlight amenity to a short locale phrase */
function highlightPhrase(highlight: string, locale: string): string {
  const map: Record<string, Record<string, string>> = {
    'Free WiFi': { fr: 'Wi-Fi gratuit', en: 'free Wi-Fi', es: 'Wi-Fi gratuito' },
    'Swimming Pool': { fr: 'piscine', en: 'swimming pool', es: 'piscina' },
    'Spa': { fr: 'spa', en: 'spa', es: 'spa' },
    'Fitness Center': { fr: 'salle de sport', en: 'fitness centre', es: 'gimnasio' },
    'Restaurant': { fr: 'restaurant sur place', en: 'on-site restaurant', es: 'restaurante propio' },
    'Bar': { fr: 'bar', en: 'bar', es: 'bar' },
    'Parking': { fr: 'parking', en: 'parking', es: 'aparcamiento' },
    'Garden': { fr: 'jardin', en: 'garden', es: 'jardín' },
    'Terrace': { fr: 'terrasse', en: 'terrace', es: 'terraza' },
    'Airport Shuttle': { fr: 'navette aéroport', en: 'airport shuttle', es: 'lanzadera aeropuerto' },
    'Room Service': { fr: 'room service', en: 'room service', es: 'servicio de habitaciones' },
    'Breakfast Included': { fr: 'petit-déjeuner inclus', en: 'breakfast included', es: 'desayuno incluido' },
  }
  const l = locale === 'fr' ? 'fr' : locale === 'es' ? 'es' : 'en'
  return map[highlight]?.[l] ?? ''
}

/** Rating-based quality adjective */
function ratingWord(rating: number | undefined, locale: string): string {
  if (!rating) return ''
  const lang = locale === 'fr' ? 'fr' : locale === 'es' ? 'es' : 'en'
  if (rating >= 9.5) return { fr: 'exceptionnel', en: 'exceptional', es: 'excepcional' }[lang]
  if (rating >= 9.0) return { fr: 'remarquable', en: 'outstanding', es: 'sobresaliente' }[lang]
  if (rating >= 8.5) return { fr: 'excellent', en: 'excellent', es: 'excelente' }[lang]
  if (rating >= 8.0) return { fr: 'très bien noté', en: 'highly rated', es: 'muy valorado' }[lang]
  return { fr: 'bien noté', en: 'well rated', es: 'bien valorado' }[lang]
}

export function localizedPetPolicy(hotel: HotelSnapshot, locale: string): string {
  const { name, petFee, stars = 3, rating, categories = [], highlights = [] } = hotel
  const seed = nameHash(name)

  const isLuxury = categories.includes('luxury') || stars >= 5
  const is4Star = stars === 4
  const isFree = petFee === 0 || categories.includes('dogs-stay-free')
  const hasPark = categories.includes('near-parks')
  const hasBeach = categories.includes('beach-access')
  const catFriendly = categories.includes('cat-friendly')
  const ratingAdj = ratingWord(rating, locale)

  // Pick a few amenity highlights to mention (avoid spa for non-luxury)
  const nicePicks = highlights
    .map(h => highlightPhrase(h, locale))
    .filter(Boolean)
    .filter(h => !isLuxury || !h.includes('spa'))
    .slice(0, 2)

  // ─── FRENCH ───────────────────────────────────────────────────────────────
  if (locale === 'fr') {
    const welcomeVariants = isLuxury ? [
      `${name} réserve un accueil chaleureux aux animaux bien éduqués et propose une attention de bienvenue spéciale pour vos compagnons.`,
      `Établissement ${ratingAdj || 'de prestige'}, ${name} accueille les animaux domestiques avec des attentions dédiées dès l'arrivée.`,
      `${name} fait partie des rares hôtels de luxe à offrir un véritable traitement VIP à vos animaux de compagnie.`,
    ] : [
      `${name} est un établissement pet-friendly qui accueille chiens${catFriendly ? ' et chats' : ''} avec plaisir.`,
      `Noté ${ratingAdj || 'positivement'} pour son accueil, ${name} est ouvert aux voyageurs accompagnés de leur animal.`,
      `${name} propose un cadre convivial pour les propriétaires d'animaux souhaitant voyager sans laisser leur compagnon derrière eux.`,
      `Chez ${name}, chiens${catFriendly ? ' et chats' : ''} sont les bienvenus : l'équipe connaît bien les besoins des voyageurs avec animaux.`,
    ]

    const feeVariants = isFree ? [
      `Les animaux séjournent gratuitement, sans aucun supplément.`,
      `Bonne nouvelle : aucun frais supplémentaire n'est appliqué pour votre animal.`,
      `Votre compagnon ne génère aucun coût additionnel : le séjour animal est offert.`,
    ] : petFee > 0 ? [
      `Un supplément animaux de ${petFee} € par nuit s'applique, à régler à l'arrivée.`,
      `Des frais animaux de ${petFee} € par nuit sont facturés à la réception lors du check-in.`,
      `L'hôtel applique un supplément de ${petFee} €/nuit pour les animaux, payable sur place.`,
    ] : [
      `Des frais animaux peuvent s'appliquer ; le montant exact est précisé à la réservation.`,
      `Un supplément animal est possible selon la saison ; renseignez-vous auprès de l'hôtel.`,
    ]

    const sizeVariants = isLuxury ? [
      `Les animaux sont acceptés jusqu'à 10 kg ; un animal par chambre.`,
      `Poids maximum accepté : 10 kg. Un seul animal par chambre.`,
    ] : is4Star ? [
      `Les animaux sont acceptés jusqu'à 20 kg ; un animal par chambre.`,
      `Poids maximum : 20 kg. Un animal par chambre est autorisé.`,
    ] : [
      `Les animaux sont acceptés jusqu'à 25 kg ; deux animaux maximum par chambre.`,
      `Poids jusqu'à 25 kg accepté, dans la limite de deux animaux par chambre.`,
      `L'hôtel admet les animaux de moins de 25 kg, jusqu'à deux par chambre.`,
    ]

    const locationSentence = hasBeach
      ? pick([
          `L'hôtel est à quelques pas d'une zone de plage accessible aux chiens, idéale pour les sorties matinales.`,
          `Une plage dog-friendly se trouve à courte distance, parfaite pour une balade au lever du soleil.`,
        ], seed, 2)
      : hasPark
      ? pick([
          `Un parc ou espace vert dog-friendly se trouve à proximité immédiate de l'établissement.`,
          `Des espaces verts et parcs adaptés aux chiens sont accessibles à pied depuis l'hôtel.`,
        ], seed, 2)
      : ''

    const amenitySentence = nicePicks.length > 0
      ? `L'établissement dispose également de : ${nicePicks.join(', ')}.`
      : ''

    const rulesVariants = isLuxury ? [
      `Les animaux doivent rester en laisse dans les espaces communs et ne sont pas admis dans les restaurants ni au spa.`,
      `En laisse dans les zones communes ; accès non autorisé au spa et aux espaces restauration.`,
    ] : [
      `Les animaux doivent rester en laisse dans les parties communes et ne peuvent pas être laissés seuls en chambre.`,
      `Laisse obligatoire dans les couloirs et halls. Les animaux ne peuvent rester seuls dans la chambre.`,
      `Merci de garder votre animal en laisse dans les parties communes et de ne pas le laisser seul dans la chambre.`,
    ]

    const bookingVariants = [
      `Merci de signaler votre animal au moment de la réservation pour garantir une chambre adaptée.`,
      `Pensez à préciser que vous voyagez avec un animal lors de la réservation.`,
      `Il est conseillé de mentionner votre animal dès la réservation pour faciliter l'organisation de l'hôtel.`,
    ]

    return [
      pick(welcomeVariants, seed),
      pick(feeVariants, seed, 1),
      pick(sizeVariants, seed, 2),
      locationSentence,
      amenitySentence,
      pick(rulesVariants, seed, 3),
      pick(bookingVariants, seed, 4),
    ].filter(Boolean).join(' ')
  }

  // ─── SPANISH ──────────────────────────────────────────────────────────────
  if (locale === 'es') {
    const welcomeVariants = isLuxury ? [
      `${name} ofrece una cálida bienvenida a las mascotas bien educadas y un detalle especial de llegada para nuestros amigos de cuatro patas.`,
      `Hotel ${ratingAdj || 'de lujo'}, ${name} trata a sus huéspedes animales con atenciones especiales desde la llegada.`,
      `${name} es uno de los pocos hoteles de lujo que ofrece un trato VIP a las mascotas.`,
    ] : [
      `${name} es un establecimiento pet-friendly que acepta perros${catFriendly ? ' y gatos' : ''} con mucho gusto.`,
      `Valorado como ${ratingAdj || 'una buena opción'}, ${name} da la bienvenida a los viajeros con mascotas.`,
      `En ${name} los dueños de mascotas se sienten como en casa: el equipo está acostumbrado a recibir a animales.`,
      `${name} abre sus puertas a perros${catFriendly ? ' y gatos' : ''} con una política clara y sin sorpresas.`,
    ]

    const feeVariants = isFree ? [
      `Las mascotas se alojan completamente gratis, sin ningún cargo adicional.`,
      `Tu mascota no genera ningún coste extra: el alojamiento es gratuito para ella.`,
      `Sin recargo por mascota: tu compañero se aloja gratis.`,
    ] : petFee > 0 ? [
      `Se aplica un cargo por mascota de ${petFee} € por noche, a abonar en recepción.`,
      `El hotel cobra ${petFee} € por noche por mascota, a pagar en el check-in.`,
      `Hay un suplemento de ${petFee} €/noche por mascota, pagadero al llegar.`,
    ] : [
      `Pueden aplicarse cargos por mascota; el importe exacto se confirma al reservar.`,
      `El suplemento por mascota puede variar; consúltalo directamente con el hotel.`,
    ]

    const sizeVariants = isLuxury ? [
      `Se aceptan mascotas de hasta 10 kg; una mascota por habitación.`,
      `Peso máximo aceptado: 10 kg. Solo una mascota por habitación.`,
    ] : is4Star ? [
      `Se aceptan mascotas de hasta 20 kg; una mascota por habitación.`,
      `Peso máximo: 20 kg. Una mascota por habitación.`,
    ] : [
      `Se aceptan mascotas de hasta 25 kg; máximo dos mascotas por habitación.`,
      `El hotel admite mascotas de menos de 25 kg, hasta dos por habitación.`,
      `Mascotas de hasta 25 kg bienvenidas, con un máximo de dos por habitación.`,
    ]

    const locationSentence = hasBeach
      ? pick([
          `El hotel está a pocos pasos de una zona de playa accesible para perros, ideal para los paseos matutinos.`,
          `Hay una playa para perros muy cerca, perfecta para empezar el día con una caminata junto al mar.`,
        ], seed, 2)
      : hasPark
      ? pick([
          `Hay un parque o zona verde apto para perros a poca distancia del establecimiento.`,
          `Zonas verdes y parques aptos para mascotas se encuentran a poca distancia a pie.`,
        ], seed, 2)
      : ''

    const amenitySentence = nicePicks.length > 0
      ? `El establecimiento también cuenta con: ${nicePicks.join(', ')}.`
      : ''

    const rulesVariants = isLuxury ? [
      `Las mascotas deben ir con correa en las zonas comunes y no están permitidas en el spa ni en los restaurantes.`,
      `Correa obligatoria en zonas comunes; acceso no permitido al spa ni a los espacios de restauración.`,
    ] : [
      `Las mascotas deben ir con correa en las zonas comunes y no pueden quedarse solas en la habitación.`,
      `Correa obligatoria en pasillos y zonas comunes. No se puede dejar al animal solo en la habitación.`,
      `Por favor, mantén a tu mascota con correa en las zonas comunes y no la dejes sola en la habitación.`,
    ]

    const bookingVariants = [
      `Por favor, indique su mascota en el momento de la reserva para asegurar una habitación adecuada.`,
      `Menciona tu mascota al reservar para que el hotel pueda prepararlo todo con antelación.`,
      `Recuerda informar al hotel de tu mascota durante la reserva.`,
    ]

    return [
      pick(welcomeVariants, seed),
      pick(feeVariants, seed, 1),
      pick(sizeVariants, seed, 2),
      locationSentence,
      amenitySentence,
      pick(rulesVariants, seed, 3),
      pick(bookingVariants, seed, 4),
    ].filter(Boolean).join(' ')
  }

  // ─── ENGLISH (default) ────────────────────────────────────────────────────
  const welcomeVariants = isLuxury ? [
    `${name} warmly welcomes well-behaved pets and offers a dedicated welcome amenity for four-legged guests.`,
    `${ratingAdj ? `Rated ${ratingAdj},` : 'A luxury property,'} ${name} extends genuine hospitality to pets with special arrival touches.`,
    `${name} stands out as one of the rare luxury hotels that provides a true VIP experience for your pet.`,
  ] : [
    `${name} is a pet-friendly property that welcomes dogs${catFriendly ? ' and cats' : ''} with genuine warmth.`,
    `${ratingAdj ? `Rated ${ratingAdj},` : ''} ${name} welcomes travellers and their pets with a relaxed, inclusive approach.`.trim(),
    `At ${name}, dogs${catFriendly ? ' and cats' : ''} are a familiar sight: the team is well versed in hosting four-legged guests.`,
    `${name} makes pet travel easy: a clear pet policy, no hidden surprises, and a genuinely welcoming team.`,
  ]

  const feeVariants = isFree ? [
    `Pets stay completely free of charge — no extra fee applies.`,
    `Great news: there is no pet surcharge. Your companion stays at no additional cost.`,
    `No pet fee here: your furry travel partner stays free of charge.`,
  ] : petFee > 0 ? [
    `A pet fee of €${petFee} per night applies, charged at check-in.`,
    `The hotel charges a €${petFee}/night pet fee, payable at reception on arrival.`,
    `Expect a €${petFee} nightly pet surcharge, collected at check-in.`,
  ] : [
    `A nominal pet fee may apply; the exact amount is confirmed at check-in.`,
    `Pet fees vary by season — the exact charge is clarified at the time of booking.`,
  ]

  const sizeVariants = isLuxury ? [
    `Pets are accepted up to 10 kg; one pet per room maximum.`,
    `Maximum accepted weight: 10 kg. One pet per room.`,
  ] : is4Star ? [
    `Pets are accepted up to 20 kg; one pet per room maximum.`,
    `Up to 20 kg allowed, with a maximum of one pet per room.`,
  ] : [
    `Pets are accepted up to 25 kg; up to two pets per room.`,
    `The property welcomes pets under 25 kg, up to two per room.`,
    `Dogs under 25 kg are welcome; a maximum of two pets per room applies.`,
  ]

  const locationSentence = hasBeach
    ? pick([
        `The hotel is a short walk from pet-accessible beach areas, ideal for morning runs with your dog.`,
        `Dog-friendly beach access is nearby — perfect for an early morning outing with your pet.`,
      ], seed, 2)
    : hasPark
    ? pick([
        `A dog-friendly park or green space is within easy walking distance of the property.`,
        `Convenient green spaces and dog-friendly parks are just a short walk away.`,
      ], seed, 2)
    : ''

  const amenitySentence = nicePicks.length > 0
    ? `The property also offers: ${nicePicks.join(', ')}.`
    : ''

  const rulesVariants = isLuxury ? [
    `Pets must be kept on a lead in all common areas and are not permitted in the spa or dining facilities.`,
    `Leads required in all shared spaces; pets are not admitted to the spa or restaurant areas.`,
  ] : [
    `Pets must be kept on a lead in common areas and should not be left unattended in rooms.`,
    `A lead is required in corridors and shared spaces. Please do not leave your pet alone in the room.`,
    `Keep your pet on a lead in public areas and avoid leaving them unsupervised in the room.`,
  ]

  const bookingVariants = [
    `Please declare your pet at the time of booking to ensure a suitable room allocation.`,
    `Remember to mention your pet when booking so the hotel can prepare accordingly.`,
    `Letting the hotel know about your pet at the time of booking is strongly recommended.`,
  ]

  return [
    pick(welcomeVariants, seed),
    pick(feeVariants, seed, 1),
    pick(sizeVariants, seed, 2),
    locationSentence,
    amenitySentence,
    pick(rulesVariants, seed, 3),
    pick(bookingVariants, seed, 4),
  ].filter(Boolean).join(' ')
}
