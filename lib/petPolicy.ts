/**
 * Generates a rich, locale-aware pet policy description from structured hotel data.
 * Used in HotelCard and HotelRankedCard to always display policies in the user's language.
 * The stored `petPolicy` field is kept for EN schema/SEO, but display always uses this function.
 */

interface HotelSnapshot {
  name: string
  petFee: number
  stars: number
  categories: string[]
}

export function localizedPetPolicy(hotel: HotelSnapshot, locale: string): string {
  const { name, petFee, stars = 3, categories = [] } = hotel

  const isLuxury = categories.includes('luxury') || stars >= 4
  const isFree = petFee === 0 || categories.includes('dogs-stay-free')
  const hasPark = categories.includes('near-parks')
  const hasBeach = categories.includes('beach-access')
  const catFriendly = categories.includes('cat-friendly')

  if (locale === 'fr') {
    const fee = isFree
      ? 'Les animaux séjournent gratuitement, sans aucun supplément.'
      : petFee > 0
        ? `Un supplément animaux de ${petFee} € par nuit s'applique, à régler à l'arrivée.`
        : 'Des frais animaux peuvent s\'appliquer ; montant précisé à la réservation.'

    const welcome = isLuxury
      ? `${name} réserve un accueil chaleureux aux animaux bien éduqués et propose une attention de bienvenue spéciale pour vos compagnons à quatre pattes.`
      : `${name} est un établissement pet-friendly qui accueille chiens${catFriendly ? ' et chats' : ''} avec plaisir.`

    const size = isLuxury
      ? 'Les animaux sont acceptés jusqu\'à 10 kg ; un animal par chambre.'
      : stars === 4
        ? 'Les animaux sont acceptés jusqu\'à 20 kg ; un animal par chambre.'
        : 'Les animaux sont acceptés jusqu\'à 25 kg ; deux animaux maximum par chambre.'

    const location = hasBeach
      ? 'L\'hôtel est à quelques pas d\'une zone de plage accessible aux chiens, idéale pour les sorties matinales.'
      : hasPark
        ? 'Un parc ou un espace vert dog-friendly se trouve à proximité immédiate de l\'établissement.'
        : ''

    const rules = isLuxury
      ? 'Les animaux doivent rester en laisse dans les espaces communs et ne sont pas admis au spa ni dans les restaurants.'
      : 'Les animaux doivent rester en laisse dans les parties communes et ne peuvent pas être laissés seuls dans la chambre.'

    const booking = 'Merci de signaler votre animal au moment de la réservation pour garantir une chambre adaptée.'

    return [welcome, fee, size, location, rules, booking].filter(Boolean).join(' ')
  }

  if (locale === 'es') {
    const fee = isFree
      ? 'Las mascotas se alojan completamente gratis, sin ningún cargo adicional.'
      : petFee > 0
        ? `Se aplica un cargo por mascota de ${petFee} € por noche, a abonar en recepción.`
        : 'Pueden aplicarse cargos por mascota; el importe exacto se confirma al reservar.'

    const welcome = isLuxury
      ? `${name} ofrece una cálida bienvenida a las mascotas bien educadas y un detalle especial de llegada para nuestros amigos de cuatro patas.`
      : `${name} es un establecimiento pet-friendly que acepta perros${catFriendly ? ' y gatos' : ''} con mucho gusto.`

    const size = isLuxury
      ? 'Se aceptan mascotas de hasta 10 kg; una mascota por habitación.'
      : stars === 4
        ? 'Se aceptan mascotas de hasta 20 kg; una mascota por habitación.'
        : 'Se aceptan mascotas de hasta 25 kg; máximo dos mascotas por habitación.'

    const location = hasBeach
      ? 'El hotel está a pocos pasos de una zona de playa accesible para perros, ideal para los paseos matutinos.'
      : hasPark
        ? 'Hay un parque o zona verde apto para perros a poca distancia del establecimiento.'
        : ''

    const rules = isLuxury
      ? 'Las mascotas deben ir con correa en las zonas comunes y no están permitidas en el spa ni en los restaurantes.'
      : 'Las mascotas deben ir con correa en las zonas comunes y no pueden quedarse solas en la habitación.'

    const booking = 'Por favor, indique su mascota en el momento de la reserva para asegurar una habitación adecuada.'

    return [welcome, fee, size, location, rules, booking].filter(Boolean).join(' ')
  }

  // English (default)
  const fee = isFree
    ? 'Pets stay completely free of charge. No extra fee applies.'
    : petFee > 0
      ? `A pet fee of €${petFee} per night applies, charged at check-in.`
      : 'A nominal pet fee may apply; exact amount confirmed at check-in.'

  const welcome = isLuxury
    ? `${name} warmly welcomes well-behaved pets and offers a dedicated welcome amenity for four-legged guests.`
    : `${name} is a pet-friendly property that welcomes dogs${catFriendly ? ' and cats' : ''} with pleasure.`

  const size = isLuxury
    ? 'Pets are accepted up to 10 kg; one pet per room maximum.'
    : stars === 4
      ? 'Pets are accepted up to 20 kg; one pet per room maximum.'
      : 'Pets are accepted up to 25 kg; up to two pets per room.'

  const location = hasBeach
    ? 'The hotel is a short walk from pet-accessible beach areas, ideal for morning runs with your dog.'
    : hasPark
      ? 'A dog-friendly park or green space is within easy walking distance of the property.'
      : ''

  const rules = isLuxury
    ? 'Pets must be kept on a lead in all common areas and are not permitted in the spa or dining facilities.'
    : 'Pets must be kept on a lead in common areas and should not be left unattended in rooms.'

  const booking = 'Please declare your pet at the time of booking to ensure a suitable room allocation.'

  return [welcome, fee, size, location, rules, booking].filter(Boolean).join(' ')
}
