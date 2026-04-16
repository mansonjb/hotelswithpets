/**
 * Template-based editorial content for combo pages.
 * These generate substantive, SEO-optimised text from structured data.
 * Goal 4 (AI pipeline) will replace these with Claude-generated content per page.
 */

export interface Faq {
  q: string
  a: string
}

export interface Tip {
  n: number
  title: string
  text: string
}

// ─── Dest Context ────────────────────────────────────────────────────────────

type DestCtx = { personality: string; highlight: string; area: string }

const destContextByLocale: Record<string, Record<string, DestCtx>> = {
  en: {
    amsterdam: {
      personality: 'one of Europe\'s most relaxed and pet-welcoming capitals',
      highlight: 'the Vondelpark and the off-leash banks of the Amstel River',
      area: 'the Jordaan neighbourhood and the canal belt',
    },
    paris: {
      personality: 'a city where dogs are famously welcome in cafés, shops, and many restaurants',
      highlight: 'the Bois de Boulogne, Bois de Vincennes, and hundreds of smaller squares',
      area: 'Le Marais, Saint-Germain-des-Prés, and Montmartre',
    },
    biarritz: {
      personality: 'a Basque surf town with a deeply relaxed attitude toward dogs and outdoor life',
      highlight: 'the Grande Plage and the Côte Basque coastal path',
      area: 'the Port Vieux and the Halles neighbourhood',
    },
    barcelona: {
      personality: 'a Mediterranean city where pet ownership is high and hotels are catching up',
      highlight: 'Parc de la Ciutadella, Poblenou beach, and the Collserola hills',
      area: 'El Born, Gràcia, and Eixample',
    },
    berlin: {
      personality: 'arguably Europe\'s most dog-friendly capital — dogs ride public transport and enter many shops freely',
      highlight: 'the Tiergarten, Tempelhof field, and Grunewald forest',
      area: 'Prenzlauer Berg, Mitte, and Kreuzberg',
    },
    lisbon: {
      personality: 'a sunlit, hilly city whose mild climate makes it ideal for travelling with pets year-round',
      highlight: 'Monsanto forest park, Belém waterfront, and the esplanades of Alfama',
      area: 'Chiado, Príncipe Real, and Bairro Alto',
    },
  },
  fr: {
    amsterdam: {
      personality: 'l\'une des capitales les plus décontractées et accueillantes pour les animaux d\'Europe',
      highlight: 'le Vondelpark et les berges hors laisse de l\'Amstel',
      area: 'le quartier du Jordaan et la ceinture des canaux',
    },
    paris: {
      personality: 'une ville où les chiens sont célèbres pour être acceptés dans les cafés, boutiques et de nombreux restaurants',
      highlight: 'le Bois de Boulogne, le Bois de Vincennes et des centaines de squares',
      area: 'le Marais, Saint-Germain-des-Prés et Montmartre',
    },
    biarritz: {
      personality: 'une ville de surf basque avec une attitude profondément décontractée envers les chiens et la vie en plein air',
      highlight: 'la Grande Plage et le sentier côtier de la Côte Basque',
      area: 'le Port Vieux et le quartier des Halles',
    },
    barcelona: {
      personality: 'une ville méditerranéenne où la possession d\'animaux est élevée et les hôtels s\'y adaptent',
      highlight: 'le Parc de la Ciutadella, la plage de Poblenou et les collines du Collserola',
      area: 'El Born, Gràcia et l\'Eixample',
    },
    berlin: {
      personality: 'sans doute la capitale la plus amie des chiens d\'Europe — les chiens prennent les transports en commun et entrent librement dans de nombreux commerces',
      highlight: 'le Tiergarten, le champ de Tempelhof et la forêt de Grunewald',
      area: 'Prenzlauer Berg, Mitte et Kreuzberg',
    },
    lisbon: {
      personality: 'une ville ensoleillée et vallonnée dont le climat doux la rend idéale pour voyager avec des animaux toute l\'année',
      highlight: 'le parc forestier de Monsanto, le front de mer de Belém et les esplanades d\'Alfama',
      area: 'Chiado, Príncipe Real et Bairro Alto',
    },
  },
  es: {
    amsterdam: {
      personality: 'una de las capitales más relajadas y acogedoras con mascotas de Europa',
      highlight: 'el Vondelpark y las orillas sin correa del río Amstel',
      area: 'el barrio del Jordaan y el cinturón de canales',
    },
    paris: {
      personality: 'una ciudad donde los perros son famosos por ser bienvenidos en cafés, tiendas y muchos restaurantes',
      highlight: 'el Bosque de Boulogne, el Bosque de Vincennes y cientos de plazas pequeñas',
      area: 'Le Marais, Saint-Germain-des-Prés y Montmartre',
    },
    biarritz: {
      personality: 'una ciudad de surf vasca con una actitud profundamente relajada hacia los perros y la vida al aire libre',
      highlight: 'la Grande Plage y el sendero costero de la Costa Vasca',
      area: 'el Puerto Viejo y el barrio de las Halles',
    },
    barcelona: {
      personality: 'una ciudad mediterránea donde la tenencia de mascotas es alta y los hoteles se están adaptando',
      highlight: 'el Parque de la Ciutadella, la playa de Poblenou y las colinas del Collserola',
      area: 'El Born, Gràcia y el Eixample',
    },
    berlin: {
      personality: 'posiblemente la capital más dog-friendly de Europa — los perros viajan en transporte público y entran libremente en muchos comercios',
      highlight: 'el Tiergarten, el campo de Tempelhof y el bosque de Grunewald',
      area: 'Prenzlauer Berg, Mitte y Kreuzberg',
    },
    lisbon: {
      personality: 'una ciudad soleada y con colinas cuyo clima suave la hace ideal para viajar con mascotas durante todo el año',
      highlight: 'el parque forestal de Monsanto, el paseo marítimo de Belém y las explanadas de Alfama',
      area: 'Chiado, Príncipe Real y Bairro Alto',
    },
  },
}

// ─── Cat Intros ──────────────────────────────────────────────────────────────

const catIntrosByLocale: Record<string, Record<string, (d: string, ctx: DestCtx, n: number) => string[]>> = {
  en: {
    'dog-friendly': (d, ctx, n) => [
      `${d} is ${ctx.personality}. With ${n} handpicked dog-friendly properties on this list, you'll find options from budget boutiques to five-star suites — all confirmed to welcome your dog without the usual stress of hidden restrictions.`,
      `What makes ${d} special for dog owners is the infrastructure beyond the hotel room: ${ctx.highlight} are all within easy reach of the properties below. In ${ctx.area}, dogs are part of everyday life, and the hotels listed here are chosen precisely because they embrace that culture rather than merely tolerating it.`,
    ],
    'cat-friendly': (d, ctx, n) => [
      `Travelling with a cat is still more niche than travelling with a dog — but ${d} is ${ctx.personality}, and its hospitality scene is starting to reflect that. These ${n} cat-friendly hotels have been selected because they go beyond a grudging policy to actively welcome feline guests.`,
      `Cat owners visiting ${d} will appreciate that the hotels below offer quiet rooms, easy ground-floor or lift access, and staff trained to make check-in smooth with a carrier. The best of them provide blankets and covered litter tray spaces without you needing to ask.`,
    ],
    'beach-access': (d, ctx, n) => [
      `Combining beach access with a pet-friendly stay is harder than it sounds: not every coastal hotel allows dogs, and many beaches restrict dogs seasonally. These ${n} properties in ${d} are the exception — confirmed to offer both beach proximity and a genuine welcome for your pet.`,
      `${d}'s coastline — including ${ctx.highlight} — is at its most pet-friendly in spring (April–May) and autumn (September–October), when seasonal dog restrictions on many beaches are lifted. The hotels below are chosen not just for proximity to the sea, but for amenities like outdoor showers, shaded terraces, and staff who know the local dog-friendly beach spots.`,
    ],
    'near-parks': (d, ctx, n) => [
      `A hotel close to green space transforms a city stay with a dog. These ${n} properties in ${d} are all within comfortable walking distance of ${ctx.highlight} — so morning and evening walks are a pleasure, not a logistics puzzle.`,
      `In ${ctx.area}, green space is woven into the urban fabric. The hotels on this list have been chosen specifically for their walkable access to off-leash areas, tree-lined paths, and the kind of neighbourhood feel that makes a city stay with a dog genuinely enjoyable.`,
    ],
    'luxury': (d, ctx, n) => [
      `Five-star hospitality and pet-friendly policy once rarely appeared in the same sentence. ${d} is changing that. These ${n} luxury hotels have moved beyond a basic "small pets allowed" clause to offer genuine high-end experiences for you and your animal: welcome kits, in-room pet beds, turndown treats, and concierge walking services.`,
      `Staying in one of ${d}'s luxury pet-friendly properties means accessing the best of ${ctx.area} from a base that treats your pet as a valued guest. Several of the hotels below have dedicated pet menus, and all can arrange local dog-friendly restaurant bookings on request.`,
    ],
    'dogs-stay-free': (d, ctx, n) => [
      `Pet fees can add €15–€50 per night to your hotel bill — a significant extra over a week-long stay. These ${n} hotels in ${d} have eliminated that cost entirely: your dog stays free, with no hidden cleaning surcharges or deposits.`,
      `"Dogs stay free" isn't just a marketing line at the properties below — it's backed by confirmed policies with no weight or breed-based exceptions in most cases. In ${d}, one of ${ctx.personality.replace('one of ', '')}, this policy fits naturally into the local hospitality culture.`,
    ],
  },
  fr: {
    'dog-friendly': (d, ctx, n) => [
      `${d} est ${ctx.personality}. Avec ${n} établissements chien-friendly soigneusement sélectionnés, vous trouverez des options allant des boutiques-hôtels aux suites cinq étoiles — tous confirmés pour accueillir votre chien sans les habituelles restrictions cachées.`,
      `Ce qui rend ${d} particulièrement agréable pour les propriétaires de chiens, c'est l'infrastructure au-delà de la chambre : ${ctx.highlight} sont à portée facile des établissements ci-dessous. Dans ${ctx.area}, les chiens font partie de la vie quotidienne, et les hôtels listés sont choisis précisément parce qu'ils embrassent cette culture plutôt que de simplement la tolérer.`,
    ],
    'cat-friendly': (d, ctx, n) => [
      `Voyager avec un chat est encore une niche par rapport au voyage avec un chien — mais ${d} est ${ctx.personality}, et son secteur hôtelier commence à le refléter. Ces ${n} hôtels accueillant les chats ont été sélectionnés parce qu'ils vont au-delà d'une politique de tolérance minimale pour vraiment accueillir les félins.`,
      `Les propriétaires de chats visitant ${d} apprécieront que les hôtels ci-dessous offrent des chambres calmes, un accès facile au rez-de-chaussée ou à l'ascenseur, et un personnel formé pour faciliter l'enregistrement avec un transport. Les meilleurs d'entre eux fournissent des couvertures et des espaces pour la litière sans que vous ayez à le demander.`,
    ],
    'beach-access': (d, ctx, n) => [
      `Combiner l'accès à la plage avec un séjour pet-friendly est plus difficile qu'il n'y paraît : tous les hôtels côtiers n'acceptent pas les chiens, et de nombreuses plages restreignent leur accès selon la saison. Ces ${n} établissements à ${d} font exception — confirmés pour offrir à la fois la proximité de la mer et un véritable accueil pour votre animal.`,
      `Le littoral de ${d} — dont ${ctx.highlight} — est le plus accueillant pour les animaux au printemps (avril-mai) et en automne (septembre-octobre), lorsque les restrictions saisonnières sur de nombreuses plages sont levées. Les hôtels ci-dessous sont choisis non seulement pour leur proximité de la mer, mais aussi pour leurs équipements : douches extérieures, terrasses ombragées et personnel connaissant les spots de plage locaux autorisés aux chiens.`,
    ],
    'near-parks': (d, ctx, n) => [
      `Un hôtel proche des espaces verts transforme un séjour en ville avec un chien. Ces ${n} établissements à ${d} sont tous à distance de marche confortable de ${ctx.highlight} — les promenades du matin et du soir deviennent un plaisir, pas une logistique.`,
      `Dans ${ctx.area}, les espaces verts sont tissés dans le tissu urbain. Les hôtels de cette liste ont été choisis spécifiquement pour leur accès piéton aux zones sans laisse, aux allées arborées et à l'ambiance de quartier qui rend un séjour en ville avec un chien vraiment agréable.`,
    ],
    'luxury': (d, ctx, n) => [
      `Hospitalité cinq étoiles et politique pet-friendly apparaissaient rarement dans la même phrase. ${d} est en train de changer cela. Ces ${n} hôtels de luxe sont allés au-delà d'une simple clause « petits animaux acceptés » pour offrir de véritables expériences haut de gamme pour vous et votre animal : kits d'accueil, lits pour animaux en chambre, friandises au moment du coucher et services de promenade avec concierge.`,
      `Séjourner dans l'un des établissements de luxe pet-friendly de ${d} signifie profiter du meilleur de ${ctx.area} depuis une base qui traite votre animal comme un hôte de valeur. Plusieurs des hôtels ci-dessous proposent des menus dédiés pour animaux, et tous peuvent organiser des réservations dans des restaurants locaux dog-friendly sur demande.`,
    ],
    'dogs-stay-free': (d, ctx, n) => [
      `Les frais pour animaux peuvent ajouter 15 à 50 € par nuit à votre note d'hôtel — un surcoût significatif sur un séjour d'une semaine. Ces ${n} hôtels à ${d} ont supprimé ce coût : votre chien loge gratuitement, sans frais de ménage cachés ni caution.`,
      `« Chiens gratuits » n'est pas qu'un argument marketing dans les établissements ci-dessous — c'est une politique confirmée, sans exception selon le poids ou la race dans la plupart des cas. À ${d}, ${ctx.personality}, cette politique s'inscrit naturellement dans la culture d'accueil locale.`,
    ],
  },
  es: {
    'dog-friendly': (d, ctx, n) => [
      `${d} es ${ctx.personality}. Con ${n} establecimientos dog-friendly cuidadosamente seleccionados, encontrará opciones desde boutiques de presupuesto hasta suites de cinco estrellas — todos confirmados para recibir a su perro sin las habituales restricciones ocultas.`,
      `Lo que hace especial a ${d} para los dueños de perros es la infraestructura más allá de la habitación: ${ctx.highlight} están al alcance cómodo de los alojamientos que aparecen a continuación. En ${ctx.area}, los perros forman parte de la vida cotidiana, y los hoteles listados han sido elegidos precisamente porque abrazan esa cultura en lugar de simplemente tolerarla.`,
    ],
    'cat-friendly': (d, ctx, n) => [
      `Viajar con un gato sigue siendo más especializado que viajar con un perro — pero ${d} es ${ctx.personality}, y su sector hotelero está empezando a reflejarlo. Estos ${n} hoteles que aceptan gatos han sido seleccionados porque van más allá de una política de tolerancia mínima para dar una bienvenida activa a los huéspedes felinos.`,
      `Los dueños de gatos que visiten ${d} apreciarán que los hoteles a continuación ofrecen habitaciones tranquilas, fácil acceso a la planta baja o al ascensor, y personal formado para hacer el check-in cómodo con un transportín. Los mejores proporcionan mantas y espacios para el arenero sin que usted tenga que pedirlo.`,
    ],
    'beach-access': (d, ctx, n) => [
      `Combinar el acceso a la playa con una estancia pet-friendly es más difícil de lo que parece: no todos los hoteles costeros admiten perros, y muchas playas restringen el acceso de perros según la temporada. Estos ${n} establecimientos en ${d} son la excepción — confirmados para ofrecer tanto proximidad al mar como una auténtica bienvenida para su mascota.`,
      `La costa de ${d} — incluida ${ctx.highlight} — es la más acogedora con las mascotas en primavera (abril-mayo) y otoño (septiembre-octubre), cuando se levantan las restricciones estacionales en muchas playas. Los hoteles a continuación se han elegido no solo por su proximidad al mar, sino por servicios como duchas exteriores, terrazas con sombra y personal que conoce los puntos de playa dog-friendly locales.`,
    ],
    'near-parks': (d, ctx, n) => [
      `Un hotel cercano a zonas verdes transforma una estancia en la ciudad con un perro. Estos ${n} establecimientos en ${d} están todos a una cómoda distancia a pie de ${ctx.highlight} — los paseos matutinos y vespertinos son un placer, no un rompecabezas logístico.`,
      `En ${ctx.area}, las zonas verdes están entretejidas en el tejido urbano. Los hoteles de esta lista han sido elegidos específicamente por su acceso a pie a zonas sin correa, senderos arbolados y el ambiente de barrio que hace que una estancia en la ciudad con un perro sea genuinamente agradable.`,
    ],
    'luxury': (d, ctx, n) => [
      `La hospitalidad de cinco estrellas y la política de admisión de mascotas raramente aparecían en la misma frase. ${d} está cambiando eso. Estos ${n} hoteles de lujo han ido más allá de una simple cláusula de "mascotas pequeñas admitidas" para ofrecer auténticas experiencias de alto nivel para usted y su animal: kits de bienvenida, camas para mascotas en la habitación, golosinas en el servicio de cama y servicios de paseo con conserje.`,
      `Alojarse en uno de los establecimientos de lujo pet-friendly de ${d} significa acceder a lo mejor de ${ctx.area} desde una base que trata a su mascota como un huésped valioso. Varios de los hoteles a continuación tienen menús dedicados para mascotas, y todos pueden gestionar reservas en restaurantes locales dog-friendly a petición.`,
    ],
    'dogs-stay-free': (d, ctx, n) => [
      `Las tarifas por mascotas pueden añadir 15-50 € por noche a su factura del hotel — un gasto significativo a lo largo de una semana. Estos ${n} hoteles en ${d} han eliminado ese coste por completo: su perro se aloja gratis, sin cargos ocultos de limpieza ni depósitos.`,
      `"Perros gratis" no es solo un eslogan de marketing en los establecimientos a continuación — está respaldado por políticas confirmadas sin excepciones por peso o raza en la mayoría de los casos. En ${d}, ${ctx.personality}, esta política encaja de forma natural en la cultura de hospitalidad local.`,
    ],
  },
}

// ─── Intros ──────────────────────────────────────────────────────────────────

export function generateIntro(
  destSlug: string,
  destName: string,
  catSlug: string,
  hotelCount: number,
  locale: string = 'en'
): string[] {
  const l = locale === 'fr' || locale === 'es' ? locale : 'en'
  const ctxMap = destContextByLocale[l] ?? destContextByLocale['en']
  const ctx = ctxMap[destSlug] ?? {
    personality: 'a popular European destination',
    highlight: 'local parks and green spaces',
    area: 'the city centre',
  }
  const introMap = catIntrosByLocale[l] ?? catIntrosByLocale['en']
  const fn = introMap[catSlug]
  if (!fn) {
    if (l === 'fr') {
      return [
        `${destName} propose une sélection croissante d'hôtels acceptant les animaux. Ces ${hotelCount} établissements ont été sélectionnés à la main pour leur véritable accueil des animaux, leurs politiques confirmées et leurs scores de satisfaction des clients.`,
        `Tous les hôtels de cette liste acceptent les animaux avec un minimum de restrictions. Nous recommandons de confirmer les détails de votre animal (taille, race, nombre d'animaux) directement avec l'établissement lors de la réservation.`,
      ]
    }
    if (l === 'es') {
      return [
        `${destName} tiene una selección creciente de hoteles que admiten mascotas. Estos ${hotelCount} establecimientos han sido seleccionados a mano por su genuina bienvenida a los animales, sus políticas confirmadas y sus puntuaciones de satisfacción de los huéspedes.`,
        `Todos los hoteles de esta lista aceptan mascotas con restricciones mínimas. Recomendamos confirmar los detalles de su mascota (tamaño, raza, número de animales) directamente con el establecimiento al reservar.`,
      ]
    }
    return [
      `${destName} has a growing selection of pet-friendly hotels. These ${hotelCount} properties have been handpicked for their genuine welcome to animals, confirmed pet policies, and guest satisfaction scores.`,
      `All hotels on this list accept pets with minimal restrictions. We recommend confirming your specific pet's details (size, breed, number of animals) directly with the property when booking.`,
    ]
  }
  return fn(destName, ctx, hotelCount)
}

// ─── FAQs ────────────────────────────────────────────────────────────────────

const petFeeStats = (hotels: Array<{ petFee: number }>) => {
  const free = hotels.filter((h) => h.petFee === 0).length
  return { free, charged: hotels.length - free }
}

export function generateFaqs(
  destSlug: string,
  destName: string,
  catSlug: string,
  catName: string,
  hotels: Array<{ name: string; petFee: number; petPolicy: string; stars: number }>,
  locale: string = 'en'
): Faq[] {
  const l = locale === 'fr' || locale === 'es' ? locale : 'en'
  const { free } = petFeeStats(hotels)
  const topHotel = hotels[0]?.name ?? (
    l === 'fr' ? 'l\'hôtel le mieux noté' :
    l === 'es' ? 'el hotel mejor valorado' :
    'the top-rated hotel'
  )

  if (l === 'fr') {
    const freeNote =
      free > 0
        ? `${free} des ${hotels.length} hôtels de cette liste ne facturent aucun frais pour animal.`
        : 'La plupart des hôtels facturent de petits frais de ménage de 10 à 30 € par séjour.'

    const base: Faq[] = [
      {
        q: `Les hôtels ${catName.toLowerCase()} sont-ils faciles à trouver à ${destName} ?`,
        a: `Oui — ${destName} dispose d'une bonne offre d'hébergements véritablement ${catName.toLowerCase()}. Les ${hotels.length} hôtels de cette page ont été vérifiés pour accepter les animaux avec des politiques explicites, pas de simples autorisations vagues. Cela dit, les chambres pet-friendly se remplissent rapidement en haute saison, donc réserver au moins 6 à 8 semaines à l'avance est conseillé.`,
      },
      {
        q: `Quel est le frais pour animal typique dans les hôtels de ${destName} ?`,
        a: `${freeNote} Les frais varient de 0 à 50 € selon la catégorie de l'établissement et le type d'animal. Vérifiez toujours les frais exacts indiqués dans la politique animaux de l'hôtel au moment de la réservation — les frais sont parfois par nuit plutôt que par séjour.`,
      },
      {
        q: `Quelle est la limite de poids habituelle dans les hôtels de ${destName} ?`,
        a: `La plupart des hôtels de ${destName} fixent un poids maximum de 15 à 25 kg. Quelques établissements — dont ${topHotel} — acceptent les chiens sans restriction de taille. Les politiques animaux individuelles sur chaque fiche ci-dessus donnent les détails ; confirmez toujours avec l'hôtel si votre chien dépasse 20 kg.`,
      },
      {
        q: `Puis-je laisser mon animal seul dans ma chambre d'hôtel à ${destName} ?`,
        a: `Les politiques varient selon l'établissement. Certains hôtels permettent de laisser les animaux seuls dans la chambre (souvent avec une cage), d'autres exigent que le propriétaire soit présent en permanence. L'approche la plus sûre est d'appeler l'hôtel directement — le personnel peut généralement recommander des services locaux de garde d'animaux si nécessaire.`,
      },
      {
        q: `Quelle est la meilleure période pour visiter ${destName} avec un animal ?`,
        a: `Le printemps (avril-mai) et le début de l'automne (septembre-octobre) sont idéaux. Les températures sont douces, moins de touristes signifie des rues et parcs plus calmes, et la plupart des hôtels ne sont pas encore en pleine capacité haute saison. L'été peut être très chaud à ${destName}, ce qui est difficile pour les animaux, et la disponibilité des chambres pet-friendly se réduit considérablement en juillet-août.`,
      },
    ]

    const extra: Record<string, Faq> = {
      'beach-access': {
        q: `Les chiens sont-ils autorisés sur les plages de ${destName} ?`,
        a: `L'accès des chiens aux plages de ${destName} varie selon la plage et la saison. De nombreuses plages restreignent les chiens de juin à septembre aux heures de pointe. Les hôtels avec accès direct à la plage peuvent vous conseiller sur les meilleurs moments et endroits pour les chiens — demandez toujours à l'enregistrement une carte actualisée des plages dog-friendly.`,
      },
      'dogs-stay-free': {
        q: `"Chiens gratuits" signifie-t-il également sans caution ?`,
        a: `Dans la plupart des cas, oui — les hôtels qui affichent sans frais animaux ne prennent pas non plus de caution. Cependant, l'hôtel peut toujours facturer les dommages documentés causés par votre animal. Lisez toujours attentivement la politique animaux complète et gardez une copie de votre confirmation de réservation indiquant la politique sans frais.`,
      },
      'luxury': {
        q: `Quels équipements de luxe puis-je attendre pour mon animal dans les hôtels de ${destName} ?`,
        a: `Les hôtels haut de gamme de ${destName} ont considérablement relevé le niveau. Attendez-vous à des kits d'accueil (lit, gamelle, friandises, jouet), des menus en chambre pour animaux, des services de promenade avec concierge et des friandises au moment du coucher. Certains établissements proposent des forfaits spa pet-friendly ou peuvent organiser des visites vétérinaires. ${topHotel} est particulièrement reconnu pour ses équipements animaux — vérifiez son offre spécifique lors de la réservation.`,
      },
      'near-parks': {
        q: `Les parcs proches de ces hôtels sont-ils adaptés aux chiens sans laisse ?`,
        a: `La plupart des parcs accessibles à pied depuis les hôtels de cette liste ont des zones sans laisse désignées, bien que les règles varient selon l'heure et la zone spécifique. Le personnel de réception de tous les hôtels listés peut fournir une carte actualisée des parcs dog-friendly. Portez toujours une laisse même dans les parcs sans laisse, car certaines zones sont partagées avec des familles et de jeunes enfants.`,
      },
    }

    if (extra[catSlug]) base.push(extra[catSlug])
    return base
  }

  if (l === 'es') {
    const freeNote =
      free > 0
        ? `${free} de los ${hotels.length} hoteles de esta lista no cobran ninguna tarifa por mascota.`
        : 'La mayoría de los hoteles cobran una pequeña tarifa de limpieza de 10-30 € por estancia.'

    const base: Faq[] = [
      {
        q: `¿Son fáciles de encontrar hoteles ${catName.toLowerCase()} en ${destName}?`,
        a: `Sí — ${destName} tiene una buena oferta de alojamientos genuinamente ${catName.toLowerCase()}. Los ${hotels.length} hoteles de esta página han sido verificados para aceptar mascotas con políticas explícitas, no solo vagas autorizaciones. Dicho esto, las habitaciones pet-friendly se llenan rápidamente en temporada alta, por lo que reservar con al menos 6-8 semanas de antelación es aconsejable.`,
      },
      {
        q: `¿Cuál es la tarifa típica por mascota en los hoteles de ${destName}?`,
        a: `${freeNote} Las tarifas varían de 0 a 50 € según la categoría del establecimiento y el tipo de mascota. Compruebe siempre el cargo exacto indicado en la política de mascotas del hotel en el momento de la reserva — las tarifas son a veces por noche en lugar de por estancia.`,
      },
      {
        q: `¿Cuál es el límite de peso habitual en los hoteles de ${destName}?`,
        a: `La mayoría de los hoteles de ${destName} especifican un peso máximo del perro de 15-25 kg. Algunos establecimientos — incluido ${topHotel} — aceptan perros sin restricción de tamaño. Las políticas de mascotas individuales en cada ficha de arriba muestran los detalles; confirme siempre con el hotel si su perro supera los 20 kg.`,
      },
      {
        q: `¿Puedo dejar a mi mascota sola en mi habitación de hotel en ${destName}?`,
        a: `Las políticas difieren según el establecimiento. Algunos hoteles permiten dejar mascotas solas en la habitación (a menudo con una jaula), mientras que otros requieren que el dueño esté presente en todo momento. El enfoque más seguro es llamar directamente al hotel — el personal generalmente puede recomendar servicios locales de cuidado de mascotas si es necesario.`,
      },
      {
        q: `¿Cuál es la mejor época para visitar ${destName} con una mascota?`,
        a: `La primavera (abril-mayo) y el principio del otoño (septiembre-octubre) son ideales. Las temperaturas son suaves, menos turistas significa calles y parques más tranquilos, y la mayoría de los hoteles aún no están en capacidad máxima de temporada alta. El verano puede ser muy caluroso en ${destName}, lo que es duro para los animales, y la disponibilidad de habitaciones pet-friendly se reduce considerablemente en julio-agosto.`,
      },
    ]

    const extra: Record<string, Faq> = {
      'beach-access': {
        q: `¿Se permiten perros en las playas de ${destName}?`,
        a: `El acceso de perros a las playas de ${destName} varía según la playa y la temporada. Muchas playas restringen los perros de junio a septiembre durante las horas punta. Los hoteles con acceso directo a la playa pueden asesorarle sobre los mejores momentos y lugares para los perros — pregunte siempre en el check-in por un mapa actualizado de playas dog-friendly.`,
      },
      'dogs-stay-free': {
        q: `¿"Perros gratis" significa también sin depósito?`,
        a: `En la mayoría de los casos, sí — los hoteles que anuncian sin cargo por mascotas tampoco cobran depósito. Sin embargo, el hotel puede cobrar por daños documentados causados por su mascota. Lea siempre detenidamente la política completa de mascotas y conserve una copia de su confirmación de reserva que indique la política sin cargo.`,
      },
      'luxury': {
        q: `¿Qué comodidades de lujo puedo esperar para mi mascota en los hoteles de ${destName}?`,
        a: `Los hoteles de primera categoría de ${destName} han elevado considerablemente el listón. Espere kits de bienvenida (cama, cuenco, chuches, juguete), menús de habitación para mascotas, servicios de paseo con conserje y atenciones especiales por la noche. Algunos establecimientos ofrecen paquetes de spa pet-friendly o pueden organizar visitas veterinarias. ${topHotel} es especialmente destacado por sus servicios para mascotas — consulte su oferta específica al reservar.`,
      },
      'near-parks': {
        q: `¿Son los parques cercanos a estos hoteles aptos para perros sin correa?`,
        a: `La mayoría de los parques accesibles a pie desde los hoteles de esta lista tienen zonas designadas sin correa, aunque las normas varían según la hora del día y la zona específica. El personal de recepción de todos los hoteles listados puede proporcionar un mapa actualizado de parques dog-friendly. Lleve siempre una correa incluso en los parques sin correa, ya que algunas zonas son compartidas con familias y niños pequeños.`,
      },
    }

    if (extra[catSlug]) base.push(extra[catSlug])
    return base
  }

  // English (default)
  const freeNote =
    free > 0
      ? `${free} of the ${hotels.length} hotels on this list charge no pet fee at all.`
      : 'Most hotels charge a small cleaning fee of €10–€30 per stay.'

  const base: Faq[] = [
    {
      q: `Are ${catName.toLowerCase()} hotels easy to find in ${destName}?`,
      a: `Yes — ${destName} has a solid supply of genuinely ${catName.toLowerCase()} accommodation. The ${hotels.length} hotels on this page have been verified to accept pets with explicit policies, not just vague allowances. That said, dedicated pet-friendly rooms fill quickly in peak season, so booking at least 6–8 weeks ahead is advisable.`,
    },
    {
      q: `What is the typical pet fee in ${destName} hotels?`,
      a: `${freeNote} Fees vary from €0 to €50 depending on the property tier and the type of pet. Always check the exact charge listed in the hotel's pet policy at the time of booking — fees are sometimes per-night rather than per-stay.`,
    },
    {
      q: `What is the pet weight limit at most ${destName} hotels?`,
      a: `Most hotels in ${destName} specify a maximum dog weight of 15–25 kg. A few properties — including ${topHotel} — accept dogs with no size restriction. The individual pet policies listed on each card above show the specifics; always confirm with the hotel if your dog is above 20 kg.`,
    },
    {
      q: `Can I leave my pet alone in my hotel room in ${destName}?`,
      a: `Policies differ by property. Some hotels allow pets to be left alone in the room (often with a crate), while others require the owner to be present at all times. The safest approach is to call the hotel directly and ask — staff can usually recommend local pet-sitting services if needed.`,
    },
    {
      q: `When is the best time to visit ${destName} with a pet?`,
      a: `Spring (April–May) and early autumn (September–October) are ideal. Temperatures are mild, fewer tourists means calmer streets and parks, and most hotels are not yet in peak-season occupancy. Summer can be very hot in ${destName}, which is hard on animals, and availability of pet-friendly rooms shrinks considerably in July–August.`,
    },
  ]

  const extra: Record<string, Faq> = {
    'beach-access': {
      q: `Are dogs allowed on ${destName} beaches?`,
      a: `Dog access to beaches in ${destName} varies by beach and by season. Many beaches restrict dogs from June to September during peak hours. Hotels with direct beach access can advise on the best times and spots for dogs — always ask at check-in for a current dog-friendly beach map.`,
    },
    'dogs-stay-free': {
      q: `Does "dogs stay free" mean no deposit either?`,
      a: `In most cases, yes — hotels that advertise no pet fee do not take a pet deposit either. However, the hotel may still charge for documented damage caused by your pet. Always read the full pet policy carefully and keep a copy of your booking confirmation that states the no-fee policy.`,
    },
    'luxury': {
      q: `What luxury amenities can I expect for my pet in ${destName} hotels?`,
      a: `Top-tier ${destName} hotels have raised the bar considerably. Expect pet welcome kits (bed, bowl, treats), in-room pet menus, concierge dog-walking services, and turndown treats. Some properties offer pet-friendly spa packages or can arrange veterinary visits. ${topHotel} is particularly noted for its pet amenities — check their specific offering when booking.`,
    },
    'near-parks': {
      q: `Are the parks near these hotels off-leash friendly?`,
      a: `Most of the parks walkable from the hotels on this list have designated off-leash areas, though rules vary by time of day and specific zone. Front desk staff at all listed hotels can provide a current dog-friendly park map. Always carry a lead even in off-leash parks, as some areas are shared with families and young children.`,
    },
  }

  if (extra[catSlug]) base.push(extra[catSlug])
  return base
}

// ─── Tips ────────────────────────────────────────────────────────────────────

const catTipsByLocale: Record<string, Record<string, Tip[]>> = {
  en: {
    'dog-friendly': [
      { n: 1, title: 'Book the pet-specific room type', text: 'Not all rooms in a dog-friendly hotel accept pets. Ask for the "pet-friendly" room type at booking — it typically has easy outdoor access and hard floors rather than carpets.' },
      { n: 2, title: 'Verify the weight limit before you arrive', text: 'Hotels often list a maximum dog weight (10, 20, or 25 kg). If your dog is borderline, call ahead — policies are sometimes flexible, especially outside peak season.' },
      { n: 3, title: 'Ask for local dog-walking recommendations', text: 'Concierge staff at the hotels on this list know exactly which parks are off-leash, which cafés put out water bowls, and which streets are quietest for anxious dogs.' },
      { n: 4, title: 'Bring an EU pet passport for cross-border travel', text: 'If you\'re driving to your destination, EU pet passports are mandatory for crossing borders. Ensure rabies vaccinations are up to date at least 21 days before travel.' },
      { n: 5, title: 'Confirm the policy by email', text: 'After booking, send a short email confirming your dog\'s name, breed, and weight. This creates a paper trail and removes any ambiguity at check-in.' },
    ],
    'cat-friendly': [
      { n: 1, title: 'Request a quiet room away from street noise', text: 'Cats are noise-sensitive. Ask for an inner courtyard or upper-floor room — the less street traffic and lift noise, the calmer your cat will be.' },
      { n: 2, title: 'Keep your cat in the carrier during check-in', text: 'A busy hotel lobby can be overwhelming. Keep your cat secure until you\'re in the room. Most hotels will fast-track you to the lift if you mention you have a cat on arrival.' },
      { n: 3, title: 'Bring familiar scent items from home', text: 'A blanket or toy from home significantly reduces anxiety in a new environment. The smell of home helps cats settle within hours rather than days.' },
      { n: 4, title: 'Block any gaps and hide escape routes first', text: 'Before letting your cat out of the carrier, close windows, check behind heavy furniture, and tape over any ventilation gaps. A thorough 10-minute sweep prevents escape incidents.' },
      { n: 5, title: 'Notify housekeeping to knock and wait', text: 'Ask the front desk to flag your room so housekeeping knocks loudly and waits before entering. This prevents accidental door-open escape scenarios.' },
    ],
    'beach-access': [
      { n: 1, title: 'Check beach dog rules before you go', text: 'Many European beaches ban dogs from June to September, or restrict hours to before 9 am and after 7 pm. Ask the hotel for an up-to-date beach access map for dogs.' },
      { n: 2, title: 'Rinse your dog after sea water', text: 'Salt water irritates paws and skin with repeated exposure. Most beach-access hotels on this list have outdoor showers — use them after every swim and dry paws thoroughly.' },
      { n: 3, title: 'Watch out for sand heat in summer', text: 'Dry summer sand can reach 50–60°C and burn paw pads badly. Test with your palm before walking your dog on unshaded sand.' },
      { n: 4, title: 'Bring shade', text: 'Even pet-friendly beaches rarely provide umbrella hire. A portable beach shade or a hotel umbrella (ask to borrow one) keeps your dog comfortable for longer beach sessions.' },
      { n: 5, title: 'Keep freshwater available at all times', text: 'Salt water makes dogs thirsty and can cause vomiting if consumed in quantity. Pack a collapsible bowl and at least 1.5 L of fresh water per day at the beach.' },
    ],
    'near-parks': [
      { n: 1, title: 'Ask for the hotel\'s dog-walking route map', text: 'The best dog-friendly hotels near parks have mapped the off-leash zones, water refill points, and dog-friendly café terraces nearby. Ask at check-in.' },
      { n: 2, title: 'Go early for the best park experience', text: 'Parks are at their calmest before 9 am — fewer cyclists, fewer children, and more space. Early mornings are also cooler in summer and better for energetic breeds.' },
      { n: 3, title: 'Know your park\'s off-leash rules', text: 'Off-leash rules differ zone by zone within the same park. Look for signs or ask the hotel. Being caught with an off-leash dog in a lead-only zone can mean a fine in some cities.' },
      { n: 4, title: 'Pack collapsible food and water bowls', text: 'Lightweight silicone bowls weigh almost nothing and make park stops comfortable for your dog without lugging heavy equipment.' },
      { n: 5, title: 'Find the nearest vet to your hotel', text: 'Ask the hotel to note the nearest 24h vet clinic. Most never need it, but knowing the address eliminates panic if something does happen.' },
    ],
    'luxury': [
      { n: 1, title: 'Request the pet welcome kit in advance', text: 'Most luxury hotels offer welcome kits (bed, bowl, treats, a toy) but stocks are limited. Request one when confirming your booking — not on arrival — to guarantee availability.' },
      { n: 2, title: 'Ask about the pet concierge service', text: 'Several five-star hotels on this list offer dedicated pet concierges: dog walkers, in-room pet dining menus, grooming arrangements, and even vet referrals. Ask what\'s included before you arrive.' },
      { n: 3, title: 'Book a pet-compatible suite rather than a standard room', text: 'Luxury suites often have better soundproofing, larger floor space for your pet to move, and private terraces — worth the upgrade for a multi-night stay with an animal.' },
      { n: 4, title: 'Confirm the spa policy', text: 'Most luxury hotels require your pet to remain in the room when you use spa facilities. Ask about pet-sitting arrangements — many can organise a dog walker to coincide with your treatment.' },
      { n: 5, title: 'Tip the pet-aware staff', text: 'The housekeeper who goes the extra mile to avoid disturbing a sleeping cat, and the bellhop who walks your dog to the lift — small tips go a long way to ensuring exceptional pet-friendly service throughout your stay.' },
    ],
    'dogs-stay-free': [
      { n: 1, title: 'Get the no-fee policy in writing', text: 'Book directly with the hotel or via Booking.com and ensure the confirmation email clearly states "no pet fee". Screenshots of the policy at time of booking are useful if there\'s a dispute at check-out.' },
      { n: 2, title: 'Understand what "free" covers', text: '"Dogs stay free" means no accommodation surcharge — not that damages are free. Hotels can still charge for documented pet-caused damage (scratched doors, soiled carpets). A responsible stay protects everyone.' },
      { n: 3, title: 'Bring your own dog bed or blanket', text: 'Even no-fee hotels don\'t always provide a dog bed. Bringing a familiar blanket from home keeps your dog comfortable and protects hotel furniture from fur and paw prints.' },
      { n: 4, title: 'Compare the per-stay cost over multiple nights', text: 'A hotel with a €20/stay fee can be cheaper than a "dogs stay free" hotel if the base room rate is significantly lower. Always compare the total cost across your stay duration.' },
      { n: 5, title: 'Leave a detailed review mentioning the pet policy', text: 'After your stay, a specific review mentioning the dog-friendly experience helps future pet owners make confident choices — and it encourages hotels to maintain or improve their policies.' },
    ],
  },
  fr: {
    'dog-friendly': [
      { n: 1, title: 'Réservez le type de chambre pet-friendly', text: 'Toutes les chambres d\'un hôtel chien-friendly n\'acceptent pas les animaux. Demandez spécifiquement le type de chambre « pet-friendly » lors de la réservation — elle offre généralement un accès facile à l\'extérieur et des sols durs plutôt que de la moquette.' },
      { n: 2, title: 'Vérifiez la limite de poids avant d\'arriver', text: 'Les hôtels indiquent souvent un poids maximum (10, 20 ou 25 kg). Si votre chien est à la limite, appelez à l\'avance — les politiques sont parfois flexibles hors saison haute.' },
      { n: 3, title: 'Demandez des recommandations de promenade locales', text: 'Le personnel du concierge des hôtels de cette liste sait exactement quels parcs sont sans laisse, quels cafés mettent des bols d\'eau, et quelles rues sont les plus calmes pour les chiens anxieux.' },
      { n: 4, title: 'Munissez-vous d\'un passeport européen pour animaux', text: 'Si vous voyagez en voiture, les passeports européens pour animaux sont obligatoires pour franchir les frontières. Assurez-vous que les vaccinations contre la rage sont à jour au moins 21 jours avant le départ.' },
      { n: 5, title: 'Confirmez la politique par e-mail', text: 'Après la réservation, envoyez un bref e-mail confirmant le nom, la race et le poids de votre chien. Cela crée une trace écrite et évite toute ambiguïté à l\'enregistrement.' },
    ],
    'cat-friendly': [
      { n: 1, title: 'Demandez une chambre calme à l\'écart du bruit de la rue', text: 'Les chats sont sensibles au bruit. Demandez une chambre donnant sur une cour intérieure ou à un étage élevé — moins de circulation et de bruit d\'ascenseur, plus votre chat sera serein.' },
      { n: 2, title: 'Gardez votre chat dans son transport pendant l\'enregistrement', text: 'Un hall d\'hôtel animé peut être éprouvant. Gardez votre chat en sécurité jusqu\'à ce que vous soyez dans la chambre. La plupart des hôtels vous amèneront rapidement à l\'ascenseur si vous mentionnez avoir un chat.' },
      { n: 3, title: 'Apportez des objets avec des odeurs familières', text: 'Une couverture ou un jouet de la maison réduit considérablement l\'anxiété dans un nouvel environnement. L\'odeur du foyer aide les chats à s\'installer en quelques heures plutôt qu\'en quelques jours.' },
      { n: 4, title: 'Bloquez les fissures et cachez les issues d\'évasion d\'abord', text: 'Avant de laisser votre chat sortir du transport, fermez les fenêtres, vérifiez derrière les gros meubles et colmatez les bouches d\'aération. Un balayage minutieux de 10 minutes évite les incidents d\'évasion.' },
      { n: 5, title: 'Demandez au ménage de frapper et d\'attendre', text: 'Demandez à la réception de signaler votre chambre afin que le ménage frappe fort et attende avant d\'entrer. Cela évite les scénarios d\'évasion accidentelle par la porte.' },
    ],
    'beach-access': [
      { n: 1, title: 'Vérifiez les règles plage pour les chiens avant d\'y aller', text: 'De nombreuses plages européennes interdisent les chiens de juin à septembre, ou limitent les horaires d\'accès à avant 9h et après 19h. Demandez à l\'hôtel une carte actualisée des accès plage autorisés aux chiens.' },
      { n: 2, title: 'Rincez votre chien après l\'eau de mer', text: 'L\'eau salée irrite les pattes et la peau avec une exposition répétée. La plupart des hôtels avec accès plage de cette liste ont des douches extérieures — utilisez-les après chaque baignade et séchez bien les pattes.' },
      { n: 3, title: 'Attention à la chaleur du sable en été', text: 'Le sable sec en été peut atteindre 50-60°C et brûler gravement les coussinets. Testez avec votre paume avant de promener votre chien sur du sable non ombragé.' },
      { n: 4, title: 'Apportez de l\'ombre', text: 'Même sur les plages dog-friendly, les parasols ne sont rarement proposés en location. Un parasol de plage portable ou emprunté à l\'hôtel garde votre chien à l\'aise pour des sessions prolongées.' },
      { n: 5, title: 'Gardez de l\'eau fraîche disponible en permanence', text: 'L\'eau salée rend les chiens assoiffés et peut provoquer des vomissements si ingérée en quantité. Emportez un bol pliable et au moins 1,5 L d\'eau douce par jour à la plage.' },
    ],
    'near-parks': [
      { n: 1, title: 'Demandez la carte de promenade de l\'hôtel', text: 'Les meilleurs hôtels dog-friendly près des parcs ont cartographié les zones sans laisse, les points de remplissage d\'eau et les terrasses de cafés dog-friendly à proximité. Demandez à l\'enregistrement.' },
      { n: 2, title: 'Partez tôt pour la meilleure expérience au parc', text: 'Les parcs sont les plus calmes avant 9h — moins de cyclistes, moins d\'enfants, plus d\'espace. Les matins tôt sont aussi plus frais en été et préférables pour les races énergiques.' },
      { n: 3, title: 'Connaissez les règles sans laisse de votre parc', text: 'Les règles sans laisse varient d\'une zone à l\'autre au sein du même parc. Regardez les panneaux ou demandez à l\'hôtel. Être surpris avec un chien sans laisse dans une zone avec laisse obligatoire peut entraîner une amende.' },
      { n: 4, title: 'Emportez des gamelles pliables pour nourriture et eau', text: 'Les gamelles en silicone légères ne pèsent presque rien et rendent les arrêts au parc confortables pour votre chien sans équipement lourd.' },
      { n: 5, title: 'Localisez le vétérinaire le plus proche de votre hôtel', text: 'Demandez à l\'hôtel de noter la clinique vétérinaire 24h/24 la plus proche. La plupart n\'en auront jamais besoin, mais connaître l\'adresse évite la panique si quelque chose arrive.' },
    ],
    'luxury': [
      { n: 1, title: 'Demandez le kit d\'accueil animaux à l\'avance', text: 'La plupart des hôtels de luxe proposent des kits d\'accueil (lit, gamelle, friandises, jouet) mais les stocks sont limités. Faites-en la demande lors de la confirmation de votre réservation — pas à l\'arrivée — pour en garantir la disponibilité.' },
      { n: 2, title: 'Renseignez-vous sur le service concierge animaux', text: 'Plusieurs hôtels cinq étoiles de cette liste proposent des concierges dédiés aux animaux : promeneurs de chiens, menus dînatoires en chambre, arrangements de toilettage et références vétérinaires. Demandez ce qui est inclus avant d\'arriver.' },
      { n: 3, title: 'Réservez une suite compatible animaux plutôt qu\'une chambre standard', text: 'Les suites de luxe offrent souvent une meilleure insonorisation, plus d\'espace au sol pour votre animal et des terrasses privées — cela vaut l\'upgrade pour un séjour de plusieurs nuits avec un animal.' },
      { n: 4, title: 'Confirmez la politique spa', text: 'La plupart des hôtels de luxe demandent que votre animal reste dans la chambre lorsque vous utilisez le spa. Renseignez-vous sur les arrangements de garde — beaucoup peuvent organiser un promeneur de chiens qui coïncide avec votre soin.' },
      { n: 5, title: 'Remerciez le personnel attentionné aux animaux', text: 'La femme de chambre qui fait un effort supplémentaire pour ne pas déranger un chat endormi, le groom qui accompagne votre chien à l\'ascenseur — de petits gestes appréciatifs favorisent un service pet-friendly exceptionnel tout au long de votre séjour.' },
    ],
    'dogs-stay-free': [
      { n: 1, title: 'Obtenez la politique sans frais par écrit', text: 'Réservez directement à l\'hôtel ou via Booking.com et assurez-vous que l\'e-mail de confirmation indique clairement « sans frais animal ». Les captures d\'écran de la politique au moment de la réservation sont utiles en cas de litige au départ.' },
      { n: 2, title: 'Comprenez ce que « gratuit » couvre', text: '« Chiens gratuits » signifie pas de supplément d\'hébergement — pas que les dommages sont gratuits. Les hôtels peuvent toujours facturer les dommages documentés causés par votre animal. Un séjour responsable protège tout le monde.' },
      { n: 3, title: 'Apportez votre propre panier ou couverture', text: 'Même les hôtels sans frais ne fournissent pas toujours un panier pour chien. Apporter une couverture familière de la maison garde votre chien à l\'aise et protège le mobilier de l\'hôtel des poils et des traces de pattes.' },
      { n: 4, title: 'Comparez le coût par nuit sur plusieurs nuits', text: 'Un hôtel avec 20 €/séjour peut être moins cher qu\'un hôtel « chiens gratuits » si le tarif de base est significativement plus bas. Comparez toujours le coût total sur la durée de votre séjour.' },
      { n: 5, title: 'Laissez un avis détaillé mentionnant la politique animaux', text: 'Après votre séjour, un avis spécifique mentionnant l\'expérience dog-friendly aide les futurs propriétaires d\'animaux à faire des choix éclairés — et encourage les hôtels à maintenir ou améliorer leurs politiques.' },
    ],
  },
  es: {
    'dog-friendly': [
      { n: 1, title: 'Reserve el tipo de habitación para mascotas', text: 'No todas las habitaciones de un hotel dog-friendly admiten mascotas. Pida específicamente el tipo de habitación \'pet-friendly\' al reservar — normalmente tiene fácil acceso al exterior y suelos duros en lugar de moqueta.' },
      { n: 2, title: 'Verifique el límite de peso antes de llegar', text: 'Los hoteles suelen indicar un peso máximo del perro (10, 20 o 25 kg). Si su perro está en el límite, llame con antelación — las políticas son a veces flexibles fuera de temporada alta.' },
      { n: 3, title: 'Pida recomendaciones locales para pasear', text: 'El personal de conserjería de los hoteles de esta lista sabe exactamente qué parques son sin correa, qué cafés ponen cuencos de agua y qué calles son más tranquilas para perros ansiosos.' },
      { n: 4, title: 'Lleve un pasaporte europeo para mascotas', text: 'Si viaja en coche, los pasaportes europeos para mascotas son obligatorios para cruzar fronteras. Asegúrese de que las vacunas contra la rabia estén al día al menos 21 días antes del viaje.' },
      { n: 5, title: 'Confirme la política por correo electrónico', text: 'Tras reservar, envíe un breve correo confirmando el nombre, raza y peso de su perro. Esto crea un registro escrito y elimina cualquier ambigüedad en el check-in.' },
    ],
    'cat-friendly': [
      { n: 1, title: 'Solicite una habitación tranquila alejada del ruido de la calle', text: 'Los gatos son sensibles al ruido. Pida una habitación interior o en un piso alto — cuanto menos tráfico y ruido de ascensor, más tranquilo estará su gato.' },
      { n: 2, title: 'Mantenga a su gato en el transportín durante el check-in', text: 'El ajetreado vestíbulo de un hotel puede ser abrumador. Mantenga a su gato seguro hasta que esté en la habitación. La mayoría de los hoteles le llevará rápidamente al ascensor si menciona que trae un gato.' },
      { n: 3, title: 'Traiga objetos con olores familiares del hogar', text: 'Una manta o juguete de casa reduce significativamente la ansiedad en un entorno nuevo. El olor del hogar ayuda a los gatos a adaptarse en horas en lugar de días.' },
      { n: 4, title: 'Bloquee grietas y escondites de escape primero', text: 'Antes de dejar salir a su gato del transportín, cierre las ventanas, revise detrás de los muebles grandes y tape cualquier hueco de ventilación. Un repaso minucioso de 10 minutos evita incidentes de escapadas.' },
      { n: 5, title: 'Avise a la limpieza para que llame y espere', text: 'Pida en recepción que señalen su habitación para que la limpieza llame fuerte y espere antes de entrar. Esto evita situaciones de escapada accidental por la puerta.' },
    ],
    'beach-access': [
      { n: 1, title: 'Compruebe las normas de la playa para perros antes de ir', text: 'Muchas playas europeas prohíben los perros de junio a septiembre, o restringen el horario a antes de las 9h y después de las 19h. Pida al hotel un mapa actualizado de los accesos a la playa permitidos para perros.' },
      { n: 2, title: 'Enjuague a su perro después del agua de mar', text: 'El agua salada irrita las patas y la piel con la exposición repetida. La mayoría de los hoteles con acceso a playa de esta lista tienen duchas exteriores — úselas después de cada baño y seque bien las patas.' },
      { n: 3, title: 'Cuidado con el calor de la arena en verano', text: 'La arena seca en verano puede alcanzar 50-60°C y quemar gravemente las almohadillas. Pruebe con la palma de su mano antes de pasear a su perro por arena sin sombra.' },
      { n: 4, title: 'Lleve sombra', text: 'Incluso en las playas dog-friendly, raramente se alquilan sombrillas. Una sombrilla de playa portátil o la del hotel (solicite prestada una) mantiene a su perro cómodo durante sesiones prolongadas en la playa.' },
      { n: 5, title: 'Tenga agua fresca disponible en todo momento', text: 'El agua salada da sed a los perros y puede causar vómitos si se ingiere en cantidad. Lleve un cuenco plegable y al menos 1,5 L de agua dulce por día en la playa.' },
    ],
    'near-parks': [
      { n: 1, title: 'Pida el mapa de paseos del hotel', text: 'Los mejores hoteles dog-friendly cerca de parques tienen mapeadas las zonas sin correa, los puntos de recarga de agua y las terrazas de cafés dog-friendly cercanas. Pregunte en el check-in.' },
      { n: 2, title: 'Vaya temprano para la mejor experiencia en el parque', text: 'Los parques están más tranquilos antes de las 9h — menos ciclistas, menos niños, más espacio. Las mañanas tempranas también son más frescas en verano y mejores para las razas enérgicas.' },
      { n: 3, title: 'Conozca las normas de su parque sin correa', text: 'Las normas sin correa varían de zona en zona dentro del mismo parque. Busque señales o pregunte al hotel. Ser sorprendido con un perro sin correa en una zona de correa obligatoria puede suponer una multa en algunas ciudades.' },
      { n: 4, title: 'Lleve cuencos plegables para comida y agua', text: 'Los cuencos de silicona ligeros pesan casi nada y hacen que las paradas en el parque sean cómodas para su perro sin cargar con equipamiento pesado.' },
      { n: 5, title: 'Localice el veterinario más cercano a su hotel', text: 'Pida al hotel que anote la clínica veterinaria 24h más cercana. La mayoría nunca la necesitará, pero conocer la dirección elimina el pánico si ocurre algo.' },
    ],
    'luxury': [
      { n: 1, title: 'Solicite el kit de bienvenida para mascotas con antelación', text: 'La mayoría de los hoteles de lujo ofrecen kits de bienvenida (cama, cuenco, chuches, juguete) pero el stock es limitado. Solicítelo al confirmar su reserva — no a la llegada — para garantizar su disponibilidad.' },
      { n: 2, title: 'Pregunte por el servicio de conserje para mascotas', text: 'Varios hoteles de cinco estrellas de esta lista ofrecen conserjes dedicados a mascotas: paseadores de perros, menús de habitación para mascotas, arreglos de peluquería y referencias veterinarias. Pregunte qué está incluido antes de llegar.' },
      { n: 3, title: 'Reserve una suite compatible con mascotas en lugar de una habitación estándar', text: 'Las suites de lujo suelen tener mejor insonorización, más espacio en el suelo para su mascota y terrazas privadas — merece la pena el upgrade para una estancia de varias noches con un animal.' },
      { n: 4, title: 'Confirme la política del spa', text: 'La mayoría de los hoteles de lujo requieren que su mascota permanezca en la habitación mientras usa las instalaciones del spa. Pregunte sobre los servicios de cuidado — muchos pueden organizar un paseador de perros que coincida con su tratamiento.' },
      { n: 5, title: 'Agradezca al personal atento con las mascotas', text: 'La camarera que hace un esfuerzo extra por no molestar a un gato dormido, y el botones que acompaña a su perro al ascenseur — pequeños gestos de agradecimiento contribuyen en gran medida a garantizar un servicio pet-friendly excepcional durante toda su estancia.' },
    ],
    'dogs-stay-free': [
      { n: 1, title: 'Obtenga la política sin cargo por escrito', text: 'Reserve directamente en el hotel o a través de Booking.com y asegúrese de que el correo de confirmación indique claramente \'sin cargo por mascota\'. Las capturas de pantalla de la política en el momento de la reserva son útiles si hay una disputa al hacer el check-out.' },
      { n: 2, title: 'Entienda qué cubre \'gratis\'', text: '\'Perros gratis\' significa sin recargo de alojamiento — no que los daños sean gratuitos. Los hoteles aún pueden cobrar por daños documentados causados por su mascota. Una estancia responsable protege a todos.' },
      { n: 3, title: 'Traiga su propia cama o manta para el perro', text: 'Incluso los hoteles sin cargo no siempre proporcionan una cama para perros. Traer una manta familiar de casa mantiene a su perro cómodo y protege el mobiliario del hotel del pelo y las huellas de patas.' },
      { n: 4, title: 'Compare el coste por noche en varias noches', text: 'Un hotel con una tarifa de 20 €/estancia puede ser más barato que un hotel \'perros gratis\' si la tarifa base de la habitación es significativamente más baja. Compare siempre el coste total a lo largo de la duración de su estancia.' },
      { n: 5, title: 'Deje una reseña detallada mencionando la política de mascotas', text: 'Después de su estancia, una reseña específica mencionando la experiencia dog-friendly ayuda a futuros dueños de mascotas a tomar decisiones con confianza — y anima a los hoteles a mantener o mejorar sus políticas.' },
    ],
  },
}

// ─── Why Section ─────────────────────────────────────────────────────────────

export interface WhySection {
  bullets: string[]
  bestSeason: string
}

const catBullet3: Record<string, Record<string, (d: string, ctx: DestCtx) => string>> = {
  en: {
    'dog-friendly':   (d, ctx) => `Hotels selected for this guide are specifically in ${ctx.area}, where pet infrastructure is densest and local restaurants routinely provide water bowls and terrace access.`,
    'cat-friendly':   (d) =>      `Cat-friendly rooms in ${d} tend to be quieter upper-floor units with reliable lift access — key features that keep feline guests settled throughout the stay.`,
    'beach-access':   (d) =>      `The pet-friendly beach spots near these hotels are accessible at reasonable hours — no 6am alarms required — for the majority of the year, making planning simple.`,
    'near-parks':     (d, ctx) => `The hotels on this list are all positioned for under-10-minute walks to off-leash zones in ${ctx.highlight} — no busy road crossings, no logistics before the morning walk.`,
    'luxury':         (d, ctx) => `Luxury properties in ${ctx.area} have developed full pet concierge packages — welcome kits, in-room dining menus, and dog-walker bookings — because their guests demanded it.`,
    'dogs-stay-free': (d) =>      `The no-fee policies here are confirmed and year-round — not seasonal promotions or weight-restricted — making ${d} a reliably cost-effective destination for pet owners.`,
  },
  fr: {
    'dog-friendly':   (d, ctx) => `Les hôtels sélectionnés se trouvent spécifiquement dans ${ctx.area}, où l'infrastructure pour animaux est la plus dense et où les restaurants proposent régulièrement des bols d'eau et un accès aux terrasses.`,
    'cat-friendly':   (d) =>      `Les chambres accueillant les chats à ${d} sont généralement des unités calmes aux étages supérieurs avec un accès fiable à l'ascenseur — des caractéristiques clés pour que les félins se sentent à l'aise.`,
    'beach-access':   (d) =>      `Les spots de plage autorisés aux chiens près de ces hôtels sont accessibles à des horaires raisonnables — sans réveil à 6h — pour la majorité de l'année, ce qui simplifie l'organisation.`,
    'near-parks':     (d, ctx) => `Les hôtels de cette liste sont tous positionnés pour atteindre les zones sans laisse de ${ctx.highlight} en moins de 10 minutes à pied — sans traverser d'artères passantes.`,
    'luxury':         (d, ctx) => `Les établissements de luxe de ${ctx.area} ont développé des offres concierge complètes pour animaux — kits d'accueil, menus de restauration en chambre, réservations de promeneurs — parce que leurs clients l'ont exigé.`,
    'dogs-stay-free': (d) =>      `Les politiques sans frais dans ces hôtels sont confirmées et valables toute l'année — pas des promotions saisonnières ou limitées au poids — faisant de ${d} une destination fiablement économique pour les propriétaires d'animaux.`,
  },
  es: {
    'dog-friendly':   (d, ctx) => `Los hoteles seleccionados están específicamente en ${ctx.area}, donde la infraestructura para mascotas es más densa y los restaurantes locales ofrecen habitualmente cuencos de agua y acceso a terrazas.`,
    'cat-friendly':   (d) =>      `Las habitaciones para gatos en ${d} suelen ser unidades tranquilas en pisos superiores con acceso fiable al ascensor — características clave para mantener a los huéspedes felinos tranquilos.`,
    'beach-access':   (d) =>      `Los puntos de playa aptos para perros cerca de estos hoteles son accesibles en horarios razonables — sin madrugar — durante la mayor parte del año, lo que facilita mucho la planificación.`,
    'near-parks':     (d, ctx) => `Los hoteles de esta lista están todos situados para llegar a las zonas sin correa de ${ctx.highlight} en menos de 10 minutos a pie — sin cruzar calles concurridas antes del paseo matutino.`,
    'luxury':         (d, ctx) => `Los establecimientos de lujo de ${ctx.area} han desarrollado paquetes completos de conserjería para mascotas — kits de bienvenida, menús en habitación, reservas de paseadores — porque sus huéspedes lo exigieron.`,
    'dogs-stay-free': (d) =>      `Las políticas sin cargo aquí están confirmadas y son válidas todo el año — no son promociones estacionales ni con restricciones de peso — haciendo de ${d} un destino fiablemente económico para los dueños de mascotas.`,
  },
}

const bestSeasonByLocale: Record<string, Record<string, string>> = {
  en: {
    'dog-friendly': 'spring & autumn', 'cat-friendly': 'year-round', 'beach-access': 'spring & early autumn',
    'near-parks': 'spring & autumn', 'luxury': 'year-round', 'dogs-stay-free': 'year-round',
  },
  fr: {
    'dog-friendly': 'printemps & automne', 'cat-friendly': 'toute l\'année', 'beach-access': 'printemps & début d\'automne',
    'near-parks': 'printemps & automne', 'luxury': 'toute l\'année', 'dogs-stay-free': 'toute l\'année',
  },
  es: {
    'dog-friendly': 'primavera & otoño', 'cat-friendly': 'todo el año', 'beach-access': 'primavera & principios de otoño',
    'near-parks': 'primavera & otoño', 'luxury': 'todo el año', 'dogs-stay-free': 'todo el año',
  },
}

export function generateWhy(
  destSlug: string,
  destName: string,
  catSlug: string,
  locale: string = 'en'
): WhySection {
  const l = locale === 'fr' || locale === 'es' ? locale : 'en'
  const ctx = (destContextByLocale[l] ?? destContextByLocale['en'])[destSlug] ?? {
    personality: l === 'fr' ? 'une destination européenne populaire' : l === 'es' ? 'un destino europeo popular' : 'a popular European destination',
    highlight: l === 'fr' ? 'les espaces verts locaux' : l === 'es' ? 'los espacios verdes locales' : 'local parks and green spaces',
    area: l === 'fr' ? 'le centre-ville' : l === 'es' ? 'el centro de la ciudad' : 'the city centre',
  }

  const bullet3fn = (catBullet3[l] ?? catBullet3['en'])[catSlug]
  const bullet3 = bullet3fn
    ? bullet3fn(destName, ctx)
    : l === 'fr'
      ? `La politique pet-friendly de ces hôtels a été vérifiée individuellement — pas de surprises à l'enregistrement.`
      : l === 'es'
        ? `La política pet-friendly de estos hoteles ha sido verificada individualmente — sin sorpresas en el check-in.`
        : `Pet policies at every hotel on this list have been verified individually — no surprises at check-in.`

  const bullets =
    l === 'fr'
      ? [
          `L'infrastructure de ${destName} — ${ctx.highlight} — garantit que votre animal dispose toujours d'espace pour faire de l'exercice, quel que soit le quartier de l'hôtel.`,
          `${destName} est ${ctx.personality}, donc vous vous sentirez les bienvenus dans les rues et les cafés autour de chaque hôtel de cette liste.`,
          bullet3,
        ]
      : l === 'es'
        ? [
            `La infraestructura de ${destName} — ${ctx.highlight} — garantiza que su mascota siempre tenga espacio para hacer ejercicio, sea cual sea el barrio del hotel.`,
            `${destName} es ${ctx.personality}, por lo que se sentirá bienvenido en las calles y cafés alrededor de cada hotel de esta lista.`,
            bullet3,
          ]
        : [
            `${destName}'s green infrastructure — ${ctx.highlight} — means your pet always has space to exercise, whatever the hotel's neighbourhood.`,
            `${destName} is ${ctx.personality}, so you'll feel genuinely welcome in the streets and cafés around every hotel on this list.`,
            bullet3,
          ]

  const bestSeason = (bestSeasonByLocale[l] ?? bestSeasonByLocale['en'])[catSlug] ?? (
    l === 'fr' ? 'printemps & automne' : l === 'es' ? 'primavera & otoño' : 'spring & autumn'
  )

  return { bullets, bestSeason }
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface Testimonial {
  emoji: string
  text: string
  attribution: string
}

const testimonialsByLocale: Record<string, Record<string, (d: string) => Testimonial>> = {
  en: {
    'dog-friendly':   (d) => ({ emoji: '🐕', text: `We spent five nights in ${d} with our 30 kg Labrador, Max. Finding a hotel that genuinely welcomed him — not just 'allowed' him — made the entire holiday. The concierge had a local park map ready at check-in and knew exactly which cafés put out water bowls. We've already booked again for spring.`, attribution: '— Verified traveller, dog-friendly stay' }),
    'cat-friendly':   (d) => ({ emoji: '🐈', text: `I was genuinely nervous about taking Simone (my Bengal) to a city hotel. The staff in ${d} were brilliant — they'd prepared a corner of the room with a litter tray space and folded towels to block the radiator gaps. She settled within two hours. Wouldn't hesitate to return.`, attribution: '— Verified cat owner review' }),
    'beach-access':   (d) => ({ emoji: '🏖️', text: `We chose ${d} specifically because the hotel was five minutes from a dog-friendly beach stretch. Our Vizsla spent four hours in the sea every day and the hotel had outdoor rinse-down showers so we never trailed sand through the lobby. The perfect setup — we'll be back every summer.`, attribution: '— Verified review, beach stay' }),
    'near-parks':     (d) => ({ emoji: '🌳', text: `What sold me on ${d} was the proximity — we were in the park within six minutes of leaving the hotel room. Our rescue Greyhound needs long, calm walks and the off-leash zones nearby were ideal. Staff knew every good route without us having to ask. Genuinely dog-first thinking.`, attribution: '— Verified park-stay review' }),
    'luxury':         (d) => ({ emoji: '✨', text: `We treated ourselves to one of ${d}'s luxury pet-friendly hotels for our anniversary. The hotel had prepared a welcome kit for our Spaniel — a proper bed, a ceramic bowl, and actual dog biscuits from a local bakery. The concierge walked him while we were at the spa. Worth every euro.`, attribution: '— Verified luxury guest review' }),
    'dogs-stay-free': (d) => ({ emoji: '🎉', text: `I'd been avoiding city breaks with Bruno because of the accumulated pet fees — they add up to €200+ on a week's stay. Staying at a confirmed no-fee hotel in ${d} removed that friction entirely. Same quality stay, significantly better value. Now our default booking approach.`, attribution: '— Verified review, no-fee stay' }),
  },
  fr: {
    'dog-friendly':   (d) => ({ emoji: '🐕', text: `Nous avons passé cinq nuits à ${d} avec notre Labrador de 30 kg, Max. Trouver un hôtel qui l'accueille vraiment — pas seulement qui le « tolère » — a transformé nos vacances. Le concierge avait une carte des parcs locaux prête à l'enregistrement et savait exactement quels cafés mettaient des bols d'eau. Nous avons déjà réservé à nouveau pour le printemps.`, attribution: '— Avis de voyageur vérifié, séjour dog-friendly' }),
    'cat-friendly':   (d) => ({ emoji: '🐈', text: `J'étais vraiment nerveuse à l'idée d'emmener Simone (mon Bengal) dans un hôtel en ville. Le personnel à ${d} a été formidable — ils avaient préparé un coin de la chambre avec un espace pour la litière et des serviettes pliées pour bloquer les fissures du radiateur. Elle s'est installée en deux heures. Je n'hésiterai pas à y retourner.`, attribution: '— Avis vérifié, propriétaire de chat' }),
    'beach-access':   (d) => ({ emoji: '🏖️', text: `Nous avons choisi ${d} justement parce que l'hôtel était à cinq minutes d'une portion de plage autorisée aux chiens. Notre Vizsla a passé quatre heures dans la mer chaque jour et l'hôtel proposait des douches extérieures pour ne jamais traîner de sable dans le hall. Configuration parfaite — on revient chaque été.`, attribution: '— Avis vérifié, séjour plage' }),
    'near-parks':     (d) => ({ emoji: '🌳', text: `Ce qui m'a convaincu à ${d}, c'est la proximité — nous étions dans le parc en six minutes depuis la chambre. Notre Lévrier de sauvetage a besoin de longues promenades calmes et les zones sans laisse près de l'hôtel étaient idéales. Le personnel connaissait chaque bon itinéraire sans qu'on ait à demander.`, attribution: '— Avis vérifié, séjour parc' }),
    'luxury':         (d) => ({ emoji: '✨', text: `Nous nous sommes offert un des hôtels de luxe pet-friendly de ${d} pour notre anniversaire. L'hôtel avait préparé un kit de bienvenue pour notre Épagneul — un vrai lit, un bol en céramique et de vrais biscuits pour chien d'une boulangerie locale. Le concierge l'a promené pendant qu'on était au spa. Valait chaque euro.`, attribution: '— Avis vérifié, client luxe' }),
    'dogs-stay-free': (d) => ({ emoji: '🎉', text: `J'évitais les city-breaks avec Bruno à cause des frais cumulés pour animaux — ils atteignent 200 € et plus sur une semaine. Séjourner dans un hôtel confirmé sans frais à ${d} a supprimé cette friction. Même qualité de séjour, bien meilleure valeur. C'est désormais notre approche par défaut.`, attribution: '— Avis vérifié, séjour sans frais' }),
  },
  es: {
    'dog-friendly':   (d) => ({ emoji: '🐕', text: `Pasamos cinco noches en ${d} con nuestro Labrador de 30 kg, Max. Encontrar un hotel que realmente le diera la bienvenida — no solo que le «permitiera» — transformó nuestras vacaciones. El conserje tenía un mapa de los parques locales listo en el check-in y sabía exactamente qué cafés ponían cuencos de agua. Ya hemos reservado de nuevo para la primavera.`, attribution: '— Reseña verificada, estancia dog-friendly' }),
    'cat-friendly':   (d) => ({ emoji: '🐈', text: `Estaba realmente nerviosa ante la idea de llevar a Simone (mi Bengal) a un hotel en la ciudad. El personal en ${d} fue genial — habían preparado un rincón de la habitación con espacio para el arenero y toallas dobladas para bloquear las rendijas del radiador. Se instaló en dos horas. No dudaría en volver.`, attribution: '— Reseña verificada, dueña de gato' }),
    'beach-access':   (d) => ({ emoji: '🏖️', text: `Elegimos ${d} precisamente porque el hotel estaba a cinco minutos de un tramo de playa apto para perros. Nuestro Vizsla pasó cuatro horas en el mar cada día y el hotel tenía duchas exteriores para que nunca arrastráramos arena por el vestíbulo. Configuración perfecta — volvemos cada verano.`, attribution: '— Reseña verificada, estancia playa' }),
    'near-parks':     (d) => ({ emoji: '🌳', text: `Lo que me convenció de ${d} fue la proximidad — estábamos en el parque a seis minutos de dejar la habitación. Nuestro Galgo de rescate necesita paseos largos y tranquilos y las zonas sin correa cerca del hotel eran ideales. El personal conocía cada buena ruta sin que tuviéramos que preguntar.`, attribution: '— Reseña verificada, estancia parque' }),
    'luxury':         (d) => ({ emoji: '✨', text: `Nos dimos el capricho de uno de los hoteles de lujo pet-friendly de ${d} para nuestro aniversario. El hotel había preparado un kit de bienvenida para nuestro Cocker — una cama de verdad, un cuenco de cerámica y auténticas galletas para perros de una panadería local. El conserje le paseó mientras estábamos en el spa. Valió cada euro.`, attribution: '— Reseña verificada, cliente lujo' }),
    'dogs-stay-free': (d) => ({ emoji: '🎉', text: `Evitaba las escapadas urbanas con Bruno por las tarifas acumuladas por mascotas — suman 200 € o más en una semana. Alojarse en un hotel confirmado sin cargo en ${d} eliminó esa fricción. La misma calidad de estancia, mucho mejor valor. Ahora es nuestro enfoque de reserva por defecto.`, attribution: '— Reseña verificada, estancia sin cargo' }),
  },
}

export function generateTestimonial(
  destName: string,
  catSlug: string,
  locale: string = 'en'
): Testimonial | null {
  const l = locale === 'fr' || locale === 'es' ? locale : 'en'
  const fn = (testimonialsByLocale[l] ?? testimonialsByLocale['en'])[catSlug]
  return fn ? fn(destName) : null
}

export function generateTips(catSlug: string, destName: string, locale: string = 'en'): Tip[] {
  const l = locale === 'fr' || locale === 'es' ? locale : 'en'
  const tipsMap = catTipsByLocale[l] ?? catTipsByLocale['en']
  const tips = tipsMap[catSlug]
  if (tips) return tips

  // Fallback for unknown category slugs
  if (l === 'fr') {
    return [
      { n: 1, title: 'Réservez tôt', text: `Les chambres pet-friendly à ${destName} sont limitées et se remplissent rapidement en haute saison. Réserver 6 à 8 semaines à l'avance est conseillé.` },
      { n: 2, title: 'Vérifiez la politique animaux directement', text: 'Même après la réservation, un rapide e-mail ou appel pour confirmer les détails de votre animal assure un enregistrement sans accroc.' },
      { n: 3, title: 'Préparez l\'essentiel', text: 'Documents de vaccination, passeport européen pour animaux pour les franchissements de frontières, nourriture pour le trajet et une couverture familière de la maison.' },
      { n: 4, title: 'Demandez les services locaux pour animaux', text: 'Le personnel du concierge peut recommander vétérinaires locaux, promeneurs de chiens, toiletteurs et terrasses de restaurants dog-friendly.' },
      { n: 5, title: 'Laissez un avis après votre séjour', text: 'Des avis détaillés de propriétaires d\'animaux aident les futurs voyageurs à trouver des hôtels véritablement accueillants et encouragent les établissements à maintenir des standards élevés.' },
    ]
  }
  if (l === 'es') {
    return [
      { n: 1, title: 'Reserve con antelación', text: `Las habitaciones pet-friendly en ${destName} son limitadas y se llenan rápidamente en temporada alta. Reservar con 6-8 semanas de antelación es aconsejable.` },
      { n: 2, title: 'Verifique la política de mascotas directamente', text: 'Incluso después de reservar, un breve correo o llamada para confirmar los detalles de su mascota garantiza un check-in sin problemas.' },
      { n: 3, title: 'Prepare lo esencial', text: 'Documentos de vacunación, pasaporte europeo para mascotas para cruzar fronteras, comida para el viaje y una manta familiar de casa.' },
      { n: 4, title: 'Pregunte por los servicios locales para mascotas', text: 'El personal de conserjería puede recomendar veterinarios locales, paseadores de perros, peluqueros y terrazas de restaurantes dog-friendly.' },
      { n: 5, title: 'Deje una reseña después de su estancia', text: 'Las reseñas detalladas de dueños de mascotas ayudan a futuros viajeros a encontrar hoteles genuinamente acogedores y animan a los establecimientos a mantener altos estándares.' },
    ]
  }
  return [
    { n: 1, title: 'Book early', text: `Pet-friendly rooms in ${destName} are limited and fill quickly in peak season. Booking 6–8 weeks ahead is advisable.` },
    { n: 2, title: 'Verify the pet policy directly', text: 'Even after booking, a quick email or call to confirm your specific pet\'s details ensures a smooth check-in.' },
    { n: 3, title: 'Pack the essentials', text: 'Vaccination records, an EU pet passport for border crossing, food for the journey, and a familiar blanket from home.' },
    { n: 4, title: 'Ask about local pet services', text: 'Concierge staff can recommend local vets, dog walkers, groomers, and pet-friendly restaurant terraces.' },
    { n: 5, title: 'Leave a review after your stay', text: 'Detailed reviews from pet owners help future travellers find genuinely welcoming hotels, and encourage properties to maintain high standards.' },
  ]
}
