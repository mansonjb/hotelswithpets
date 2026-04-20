/**
 * Rich editorial content per destination city.
 * Used on the destination page to add history, key sights and pet travel tips.
 * To be expanded progressively for all covered cities.
 */

export interface Sight {
  name: string
  emoji: string
  petFriendly: boolean
  desc: Record<string, string>
}

export interface CityContent {
  history: Record<string, string>
  sights: Sight[]
  petTips: Record<string, string[]>
  practicalInfo: Record<string, string[]>
}

const cityContent: Record<string, CityContent> = {

  paris: {
    history: {
      fr: `Paris est une ville de chien — et les Parisiens le savent depuis toujours. On compte aujourd'hui plus de 500 000 chiens dans la capitale, soit un pour huit habitants. Cette relation ancienne entre Paris et ses animaux remonte aux cafés du XVIIIe siècle, où les chiens accompagnaient leurs maîtres sur les banquettes. La ville a beau être la plus visitée au monde, elle conserve cette culture de proximité : les chiens sont admis dans la plupart des brasseries, dans les boutiques, dans les jardins sans laisse désignés. Le Bois de Boulogne (846 ha) et le Bois de Vincennes (995 ha) constituent deux poumons verts immenses, parcourus chaque matin par des milliers de chiens en liberté.`,
      en: `Paris is a city of dogs — and Parisians have always known it. The capital is home to over 500,000 dogs, roughly one for every eight residents. This long-standing relationship between Paris and its animals stretches back to 18th-century café culture, when dogs lounged on banquettes beside their owners. Despite being the world's most visited city, Paris retains this intimacy: dogs are welcome in most brasseries, shops and designated off-leash garden zones. The Bois de Boulogne (846 ha) and Bois de Vincennes (995 ha) provide two vast green lungs, busy with off-leash dogs every morning.`,
      es: `París es una ciudad de perros, y los parisinos lo saben desde siempre. La capital cuenta con más de 500.000 perros, aproximadamente uno por cada ocho habitantes. Esta relación histórica entre París y sus animales se remonta a los cafés del siglo XVIII, donde los perros descansaban junto a sus dueños. A pesar de ser la ciudad más visitada del mundo, París conserva esa intimidad: los perros son bienvenidos en la mayoría de brasseries, tiendas y zonas de jardín designadas sin correa. El Bois de Boulogne (846 ha) y el Bois de Vincennes (995 ha) ofrecen dos inmensos pulmones verdes frecuentados cada mañana por miles de perros.`,
    },
    sights: [
      {
        name: 'Bois de Boulogne',
        emoji: '🌳',
        petFriendly: true,
        desc: {
          fr: '846 hectares de forêt à l\'ouest de Paris. De nombreuses zones permettent aux chiens de courir librement le matin. Le lac Inférieur et le Pré Catelan sont des incontournables pour une longue promenade matinale.',
          en: '846 hectares of forest on Paris\'s western edge. Many areas allow dogs to run freely in the morning. The Lac Inférieur and Pré Catelan are essential stops for a long morning walk.',
          es: '846 hectáreas de bosque al oeste de París. Numerosas zonas permiten a los perros correr libremente por la mañana. El Lac Inférieur y el Pré Catelan son paradas imprescindibles para un largo paseo matutino.',
        },
      },
      {
        name: 'Le Marais',
        emoji: '🏘️',
        petFriendly: true,
        desc: {
          fr: 'Le quartier le plus dog-friendly de Paris. Boutiques indépendantes, terrasses de café et pharmacies vétérinaires à chaque coin de rue. La Place des Vosges est magnifique mais les chiens y sont tenus en laisse.',
          en: 'Paris\'s most dog-friendly neighbourhood. Independent shops, café terraces and vet pharmacies on every street. Place des Vosges is stunning but dogs must be kept on leads inside.',
          es: 'El barrio más amigable con los perros de París. Tiendas independientes, terrazas de café y farmacias veterinarias en cada esquina. La Place des Vosges es preciosa, pero los perros deben llevar correa dentro.',
        },
      },
      {
        name: 'Jardin du Luxembourg',
        emoji: '🌸',
        petFriendly: false,
        desc: {
          fr: 'L\'un des jardins les plus beaux de Paris — mais les chiens n\'y sont pas admis. Contournez-le par le boulevard Saint-Michel ou profitez des rues piétonnes du Quartier Latin avec votre animal.',
          en: 'One of Paris\'s most beautiful gardens — but dogs are not permitted inside. Walk around it via Boulevard Saint-Michel or enjoy the pedestrian streets of the Latin Quarter with your pet instead.',
          es: 'Uno de los jardines más hermosos de París, pero los perros no están permitidos en su interior. Rodéalo por el Boulevard Saint-Michel o disfruta de las calles peatonales del Barrio Latino con tu mascota.',
        },
      },
      {
        name: 'Canal Saint-Martin',
        emoji: '⛵',
        petFriendly: true,
        desc: {
          fr: 'Le canal préféré des Parisiens pour une promenade décontractée. Les quais ombragés sont parfaits pour une balade avec un chien — terrasses de café et épiceries fines s\'y succèdent. Évitez les week-ends très fréquentés.',
          en: 'Parisians\' favourite canal for a relaxed stroll. The shaded quaysides are perfect for a dog walk — café terraces and delis line the route. Avoid peak weekend crowds.',
          es: 'El canal favorito de los parisinos para un paseo tranquilo. Los muelles sombreados son perfectos para pasear con un perro: terrazas de café y delicatessen se suceden a lo largo del recorrido. Evita los fines de semana muy concurridos.',
        },
      },
      {
        name: 'Tour Eiffel & Champ-de-Mars',
        emoji: '🗼',
        petFriendly: true,
        desc: {
          fr: 'Les pelouses du Champ-de-Mars accueillent les chiens en laisse — vue imprenable sur la Tour Eiffel garantie. L\'intérieur de la tour est interdit aux animaux, mais personne ne vient à Paris pour l\'éviter.',
          en: 'The Champ-de-Mars lawns welcome dogs on leads — with a guaranteed unbeatable view of the Eiffel Tower. The tower itself is off-limits to animals, but the gardens make for an iconic dog walk.',
          es: 'Los céspedes del Champ-de-Mars admiten perros con correa, con una vista inmejorable de la Torre Eiffel. El interior de la torre no está permitido para animales, pero los jardines son un paseo icónico.',
        },
      },
      {
        name: 'Montmartre & Sacré-Cœur',
        emoji: '⛪',
        petFriendly: true,
        desc: {
          fr: 'Les rues pavées de Montmartre sont parfaites pour se promener avec un chien. Les escaliers menant au Sacré-Cœur sont accessibles avec un animal — la vue vaut l\'effort. Le Square Louise Michel en contrebas est un bon spot pour souffler.',
          en: 'Montmartre\'s cobbled streets are perfect for a dog walk. The steps up to the Sacré-Cœur are accessible with a dog — the view is worth the effort. Square Louise Michel below is a good spot to rest.',
          es: 'Las calles empedradas de Montmartre son perfectas para pasear con un perro. Los escalones que suben al Sacré-Cœur son accesibles con mascota: la vista merece el esfuerzo. El Square Louise Michel, abajo, es un buen sitio para descansar.',
        },
      },
    ],
    petTips: {
      fr: [
        'Les chiens sont admis dans le métro parisien à condition d\'être dans un sac ou cage de transport. Les grands chiens peuvent voyager avec un billet enfant, tenus en laisse et muselés.',
        'La majorité des brasseries et bistros acceptent les chiens en terrasse et souvent en salle — demandez simplement à l\'entrée.',
        'Attention aux trottoirs : Paris reste une ville où la propreté canine est inégale. Gardez votre chien en laisse courte dans les zones commerçantes.',
        'L\'eau est fournie gratuitement dans de nombreuses terrasses — pensez à en demander un bol pour votre chien.',
        'Les Jardins des Tuileries, le Luxembourg et le Palais-Royal sont fermés aux chiens. Préparez des itinéraires alternatifs dans ces zones.',
      ],
      en: [
        'Dogs are allowed on the Paris Métro if carried in a bag or carrier. Larger dogs can travel with a child ticket, kept on a lead and muzzled.',
        'Most brasseries and bistros accept dogs on terraces and often inside — just ask at the door.',
        'Watch the pavements: Paris remains a city where street cleanliness is uneven. Keep your dog on a short lead in shopping areas.',
        'Water is provided free of charge on many terraces — ask for a bowl for your dog.',
        'The Tuileries Gardens, Luxembourg and Palais-Royal gardens are closed to dogs. Plan alternative routes in these areas.',
      ],
      es: [
        'Los perros pueden viajar en el metro de París si van en bolsa o transportín. Los perros grandes pueden hacerlo con un billete de niño, con correa y bozal.',
        'La mayoría de brasseries y bistrós aceptan perros en la terraza y a menudo dentro: solo hay que preguntarlo a la entrada.',
        'Cuidado con las aceras: París sigue siendo una ciudad donde la limpieza canina es irregular. Lleva a tu perro con correa corta en zonas comerciales.',
        'En muchas terrazas ofrecen agua gratuita: pide un cuenco para tu perro.',
        'Los Jardines de las Tullerías, el Luxemburgo y el Palais-Royal están cerrados a los perros. Prepara rutas alternativas en estas zonas.',
      ],
    },
    practicalInfo: {
      fr: [
        'Vétérinaire d\'urgence 24h/24 : Clinique Vétérinaire Frégis, 43 avenue Aristide Briand, Arcueil, +33 1 46 15 20 00',
        'Pharmacies vétérinaires : disponibles dans tous les arrondissements, notamment dans Le Marais et Montparnasse',
        'Eurostar depuis Londres : les chiens en sac ou cage sont acceptés. Les grands chiens ne sont pas admis dans l\'Eurostar — préférez le ferry + train.',
        'Aéroport Charles-de-Gaulle : les animaux de compagnie de l\'UE avec passeport valide peuvent entrer sans quarantaine.',
      ],
      en: [
        '24/7 emergency vet: Clinique Vétérinaire Frégis, 43 avenue Aristide Briand, Arcueil, +33 1 46 15 20 00',
        'Vet pharmacies available in every arrondissement, notably in Le Marais and Montparnasse',
        'Eurostar from London: dogs in bags or carriers accepted. Large dogs are not admitted on Eurostar — consider ferry + train instead.',
        'Charles de Gaulle Airport: EU pets with valid passport can enter without quarantine.',
      ],
      es: [
        'Veterinario de urgencias 24h: Clinique Vétérinaire Frégis, 43 avenue Aristide Briand, Arcueil, +33 1 46 15 20 00',
        'Farmacias veterinarias disponibles en todos los arrondissements, especialmente en Le Marais y Montparnasse',
        'Eurostar desde Londres: se aceptan perros en bolsa o transportín. Los perros grandes no están admitidos en el Eurostar — considera el ferry + tren.',
        'Aeropuerto Charles de Gaulle: mascotas de la UE con pasaporte válido pueden entrar sin cuarentena.',
      ],
    },
  },

  barcelona: {
    history: {
      fr: `Barcelone, fondée par les Romains sous le nom de Barcino vers 15 av. J.-C., est devenue au Moyen Âge la capitale de la Couronne d'Aragon, l'une des puissances maritimes majeures de la Méditerranée. La ville doit son visage actuel au visionnnaire Ildefons Cerdà, dont le plan d'extension de 1860 — l'Eixample — a créé ce quadrillage orthogonal caractéristique avec ses blocs arrondis et ses rues larges de 20 mètres. Gaudí a ensuite sculpté l'âme de la ville avec la Sagrada Família, le Parc Güell et la Casa Batlló. Aujourd'hui, Barcelone est l'une des villes d'Europe où le nombre d'animaux de compagnie croît le plus vite — et ses espaces verts et plages s'adaptent progressivement à cette réalité.`,
      en: `Barcelona, founded by the Romans as Barcino around 15 BC, became in the Middle Ages the capital of the Crown of Aragon, one of the Mediterranean's major maritime powers. The city owes its current face to the visionary Ildefons Cerdà, whose 1860 expansion plan — the Eixample — created the characteristic orthogonal grid with its chamfered corners and 20-metre-wide streets. Gaudí then sculpted the city's soul with the Sagrada Família, Parc Güell and Casa Batlló. Today Barcelona is one of Europe's fastest-growing cities for pet ownership — and its parks and beaches are gradually adapting to this reality.`,
      es: `Barcelona, fundada por los romanos como Barcino hacia el año 15 a. C., se convirtió en la Edad Media en la capital de la Corona de Aragón, una de las grandes potencias marítimas del Mediterráneo. La ciudad debe su fisonomía actual al visionario Ildefons Cerdà, cuyo plan de ensanche de 1860 —el Eixample— creó esa cuadrícula ortogonal característica con sus chaflanes y calles de 20 metros de ancho. Gaudí esculpió después el alma de la ciudad con la Sagrada Família, el Park Güell y la Casa Batlló. Hoy Barcelona es una de las ciudades europeas donde la tenencia de mascotas crece más rápido, y sus parques y playas se adaptan progresivamente a esta realidad.`,
    },
    sights: [
      {
        name: 'Parc de la Ciutadella',
        emoji: '🌳',
        petFriendly: true,
        desc: {
          fr: 'Le grand parc central de Barcelone (17 ha) est le rendez-vous préféré des chiens et de leurs maîtres. Zones de pelouse dégagées, lac avec barques et allées ombragées. Les chiens peuvent y aller sans laisse dans certaines zones désignées le matin.',
          en: 'Barcelona\'s main central park (17 ha) is the favourite meeting point for dogs and their owners. Open lawns, a boating lake and shaded paths. Dogs can go off-leash in designated areas in the morning.',
          es: 'El gran parque central de Barcelona (17 ha) es el punto de encuentro favorito de perros y dueños. Zonas de césped abierto, lago con barcas y caminos sombreados. Los perros pueden ir sin correa en zonas designadas por la mañana.',
        },
      },
      {
        name: 'Parc Güell',
        emoji: '🏛️',
        petFriendly: true,
        desc: {
          fr: 'Le parc de Gaudí est accessible aux chiens dans ses zones non payantes (la majeure partie du parc). La zone monumentale (payante) n\'accepte pas les animaux. Promenez les terrasses supérieures pour une vue imprenable sur la ville.',
          en: 'Gaudí\'s park welcomes dogs in its free areas (the majority of the park). The paid monumental zone does not accept pets. Walk the upper terraces for stunning views over the city.',
          es: 'El parque de Gaudí admite perros en sus zonas gratuitas (la mayor parte del parque). La zona monumental de pago no acepta mascotas. Recorre las terrazas superiores para una vista impresionante sobre la ciudad.',
        },
      },
      {
        name: 'Barceloneta & plage',
        emoji: '🏖️',
        petFriendly: false,
        desc: {
          fr: 'Les plages principales de Barcelone (Barceloneta, Bogatell) sont interdites aux chiens de juin à septembre. Hors saison, les chiens sont tolérés tôt le matin. La plage de Llevant (nord de la Barceloneta) dispose d\'une zone officielle pour chiens toute l\'année.',
          en: 'Barcelona\'s main beaches (Barceloneta, Bogatell) are closed to dogs from June to September. Off-season, dogs are tolerated early in the morning. Llevant beach (north of Barceloneta) has an official dog zone open year-round.',
          es: 'Las playas principales de Barcelona (Barceloneta, Bogatell) están prohibidas para perros de junio a septiembre. Fuera de temporada, los perros se toleran a primera hora. La playa de Llevant (al norte de la Barceloneta) tiene una zona oficial para perros abierta todo el año.',
        },
      },
      {
        name: 'Gràcia & Eixample',
        emoji: '🏘️',
        petFriendly: true,
        desc: {
          fr: 'Le quartier de Gràcia est le plus dog-friendly de Barcelone : terrasses animées, petites places comme la Plaça del Sol, et habitants habitués aux chiens. L\'Eixample avec ses larges trottoirs est idéal pour se promener et faire du lèche-vitrine.',
          en: 'The Gràcia neighbourhood is Barcelona\'s most dog-friendly: lively terraces, intimate squares like Plaça del Sol, and residents accustomed to dogs. The Eixample\'s wide pavements make for ideal window-shopping walks.',
          es: 'El barrio de Gràcia es el más amigable con los perros de Barcelona: terrazas animadas, plazas íntimas como la Plaça del Sol y vecinos acostumbrados a los perros. El Eixample, con sus amplias aceras, es ideal para pasear y hacer escaparates.',
        },
      },
      {
        name: 'Collserola',
        emoji: '🌲',
        petFriendly: true,
        desc: {
          fr: 'Le parc naturel de Collserola (8 000 ha) surplombe Barcelone et offre des dizaines de kilomètres de sentiers où les chiens peuvent courir librement. Accessible en FGC depuis la Plaça Catalunya. Idéal pour une matinée de randonnée avant de revenir en ville.',
          en: 'The Collserola natural park (8,000 ha) overlooks Barcelona and offers dozens of kilometres of trails where dogs can run freely. Accessible by FGC from Plaça Catalunya. Ideal for a morning hike before returning to the city.',
          es: 'El parque natural de Collserola (8.000 ha) domina Barcelona y ofrece decenas de kilómetros de senderos donde los perros pueden correr libremente. Accesible en FGC desde la Plaça Catalunya. Ideal para una mañana de senderismo antes de volver a la ciudad.',
        },
      },
      {
        name: 'La Sagrada Família',
        emoji: '⛪',
        petFriendly: false,
        desc: {
          fr: 'L\'intérieur de la basilique est interdit aux animaux. En revanche, la place et les jardins extérieurs sont accessibles pour admirer l\'architecture depuis l\'extérieur — et de nombreux cafés voisins acceptent les chiens en terrasse.',
          en: 'The basilica interior is off-limits to animals. However, the square and exterior gardens are open to enjoy the architecture from outside — and many nearby cafés welcome dogs on their terraces.',
          es: 'El interior de la basílica está prohibido para los animales. Sin embargo, la plaza y los jardines exteriores son accesibles para admirar la arquitectura desde fuera, y muchos cafés cercanos aceptan perros en su terraza.',
        },
      },
    ],
    petTips: {
      fr: [
        'Les chiens sont admis dans le métro barcelonais à condition d\'être en sac ou cage. Les grands chiens ne sont pas autorisés dans les transports en commun — préférez les taxis ou VTC (précisez à la réservation).',
        'La chaleur estivale (juillet-août) peut dépasser 35°C. Évitez les sorties entre 12h et 17h et assurez-vous que votre chien s\'hydrate régulièrement.',
        'La plage officielle pour chiens de Llevant est la seule plage accessible toute l\'année — notez sa localisation avant d\'arriver.',
        'Les supermarchés Mercadona et Lidl locaux vendent des croquettes et des accessoires pour animaux à prix raisonnables.',
        'Le Parc de la Ciutadella est gratuit et ouvert tôt — parfait pour une longue promenade matinale avant la chaleur et les touristes.',
      ],
      en: [
        'Dogs are allowed on Barcelona Metro if carried in a bag or carrier. Large dogs are not permitted on public transport — use taxis or ride-hailing (specify when booking).',
        'Summer heat (July–August) can exceed 35°C. Avoid outings between noon and 5pm and keep your dog well hydrated.',
        'The official dog beach at Llevant is the only beach accessible year-round — note its location before you arrive.',
        'Local Mercadona and Lidl supermarkets sell pet food and accessories at reasonable prices.',
        'Parc de la Ciutadella is free and opens early — perfect for a long morning walk before the heat and tourists arrive.',
      ],
      es: [
        'Los perros pueden viajar en el metro de Barcelona en bolsa o transportín. Los perros grandes no están permitidos en el transporte público: usa taxis o VTC (indícalo al reservar).',
        'El calor veraniego (julio-agosto) puede superar los 35°C. Evita las salidas entre las 12 y las 17 h y asegúrate de que tu perro beba suficiente agua.',
        'La playa oficial para perros de Llevant es la única abierta todo el año: anota su ubicación antes de llegar.',
        'Los supermercados Mercadona y Lidl locales venden pienso y accesorios para mascotas a precios razonables.',
        'El Parc de la Ciutadella es gratuito y abre temprano: perfecto para un largo paseo matutino antes del calor y los turistas.',
      ],
    },
    practicalInfo: {
      fr: [
        'Vétérinaire d\'urgence 24h/24 : Clínica Veterinaria Mediterrani, Carrer de Còrsega 251, +34 93 217 00 45',
        'Clinique vétérinaire bien équipée : Atenea Veterinaris, Carrer de Provença 320, Eixample',
        'Trains depuis Paris ou Madrid : les animaux en sac sont acceptés sur Renfe Avant. Les grands chiens doivent voyager en soute ou en voiture particulière.',
        'Aéroport de Barcelone-El Prat : animaux UE avec passeport valide admis sans quarantaine.',
      ],
      en: [
        '24/7 emergency vet: Clínica Veterinaria Mediterrani, Carrer de Còrsega 251, +34 93 217 00 45',
        'Well-equipped clinic: Atenea Veterinaris, Carrer de Provença 320, Eixample',
        'Trains from Paris or Madrid: animals in carriers accepted on Renfe Avant. Large dogs must travel in the hold or by private vehicle.',
        'Barcelona-El Prat Airport: EU pets with valid passport admitted without quarantine.',
      ],
      es: [
        'Veterinario de urgencias 24h: Clínica Veterinaria Mediterrani, Carrer de Còrsega 251, +34 93 217 00 45',
        'Clínica bien equipada: Atenea Veterinaris, Carrer de Provença 320, Eixample',
        'Trenes desde París o Madrid: animales en transportín admitidos en Renfe Avant. Los perros grandes deben viajar en bodega o en vehículo particular.',
        'Aeropuerto de Barcelona-El Prat: mascotas de la UE con pasaporte válido admitidas sin cuarentena.',
      ],
    },
  },

  rome: {
    history: {
      fr: `Rome est éternelle — et ses chiens le savent depuis l'Antiquité. Les Romains de l'Antiquité tenaient des chiens de chasse, des lévriers et des molosses, souvent représentés sur les mosaïques et bas-reliefs. Aujourd'hui, Rome compte près de 400 000 chiens pour 2,8 millions d'habitants. La ville a cette particularité unique en Italie : les chiens accompagnent leurs maîtres partout — restaurants en terrasse, marchés, piazzas baroques. La tradition du passeggiata (la promenade vespérale) est aussi une tradition canine. Le soir, le long du Tibre ou dans les parcs du Borghese, Rome révèle son visage le plus local et le plus chaleureux.`,
      en: `Rome is eternal — and its dogs have known it since antiquity. Ancient Romans kept hunting dogs, greyhounds and mastiffs, often depicted in mosaics and bas-reliefs. Today Rome is home to nearly 400,000 dogs for 2.8 million people. The city has a uniquely Italian quality: dogs accompany their owners everywhere — terrace restaurants, markets, baroque piazzas. The tradition of the passeggiata (evening stroll) is also a canine tradition. In the evening, along the Tiber or through the Borghese gardens, Rome reveals its most local and most welcoming face.`,
      es: `Roma es eterna, y sus perros lo saben desde la Antigüedad. Los romanos de la época clásica tenían perros de caza, galgos y mastines, representados a menudo en mosaicos y bajorrelieves. Hoy Roma alberga cerca de 400.000 perros para 2,8 millones de habitantes. La ciudad tiene esa cualidad única italiana: los perros acompañan a sus dueños a todas partes: restaurantes con terraza, mercados, plazas barrocas. La tradición de la passeggiata (el paseo vespertino) también es una tradición canina. Al atardecer, a orillas del Tíber o por los jardines del Borghese, Roma muestra su cara más local y acogedora.`,
    },
    sights: [
      {
        name: 'Villa Borghese',
        emoji: '🌿',
        petFriendly: true,
        desc: {
          fr: '80 hectares de jardins au cœur de Rome. Les chiens en laisse sont les bienvenus dans tout le parc. Les allées ombragées, les fontaines et les pelouses en font une promenade idéale à toute heure. Évitez le dimanche après-midi — très fréquenté.',
          en: '80 hectares of gardens in the heart of Rome. Dogs on leads are welcome throughout the park. Shaded paths, fountains and lawns make it an ideal walk at any time of day. Avoid Sunday afternoons — very busy.',
          es: '80 hectáreas de jardines en el corazón de Roma. Los perros con correa son bienvenidos en todo el parque. Los caminos sombreados, las fuentes y los céspedes lo convierten en un paseo ideal a cualquier hora. Evita los domingos por la tarde: muy concurrido.',
        },
      },
      {
        name: 'Parco dell\'Appia Antica',
        emoji: '🏛️',
        petFriendly: true,
        desc: {
          fr: 'L\'ancienne voie romaine bordée de pins parasols est l\'un des plus beaux parcs de Rome pour les chiens. Vastes espaces verts, zones sans laisse et atmosphère paisible loin du centre. Accessible en bus 118 depuis le Colisée.',
          en: 'The ancient Roman road lined with umbrella pines is one of Rome\'s finest parks for dogs. Vast green spaces, off-leash areas and a peaceful atmosphere far from the centre. Accessible by bus 118 from the Colosseum.',
          es: 'La antigua calzada romana bordeada de pinos piñoneros es uno de los mejores parques de Roma para los perros. Amplios espacios verdes, zonas sin correa y una atmósfera tranquila lejos del centro. Accesible en autobús 118 desde el Coliseo.',
        },
      },
      {
        name: 'Trastevere',
        emoji: '🏘️',
        petFriendly: true,
        desc: {
          fr: 'Le quartier le plus authentique et dog-friendly de Rome. Les ruelles médiévales, les osterie avec terrasses et la piazza Santa Maria in Trastevere accueillent chiens et propriétaires sans problème. Idéal pour dîner en terrasse le soir.',
          en: 'Rome\'s most authentic and dog-friendly neighbourhood. Medieval lanes, osterie with terraces and Piazza Santa Maria in Trastevere all welcome dogs and their owners. Ideal for an evening terrace dinner.',
          es: 'El barrio más auténtico y amigable con los perros de Roma. Los callejones medievales, las osterias con terrazas y la piazza Santa Maria in Trastevere acogen perros y dueños sin problemas. Ideal para cenar en terraza por la noche.',
        },
      },
      {
        name: 'Colisée & Forum romain',
        emoji: '🏟️',
        petFriendly: false,
        desc: {
          fr: 'L\'intérieur du Colisée et du Forum romain est interdit aux animaux. Profitez des abords extérieurs et du parc voisin pour une séance photo mémorable — votre chien et les ruines antiques forment un duo inoubliable.',
          en: 'The interior of the Colosseum and Roman Forum is off-limits to animals. Enjoy the surrounding exterior areas and neighbouring park for a memorable photo session — your dog and the ancient ruins make an unforgettable duo.',
          es: 'El interior del Coliseo y el Foro Romano están prohibidos para los animales. Disfruta de los alrededores exteriores y del parque vecino para una sesión de fotos memorable: tu perro y las ruinas antiguas forman un dúo inolvidable.',
        },
      },
      {
        name: 'Lungotevere',
        emoji: '🌊',
        petFriendly: true,
        desc: {
          fr: 'Les quais du Tibre sont le lieu de promenade préféré des Romains et de leurs chiens. Côté Prati ou Trastevere, les quais bas (accessibles par des escaliers) sont parfois utilisés comme zones de baignade canine informelles en été.',
          en: 'The Tiber quaysides are Rome\'s favourite walking spot for dogs and their owners. On the Prati or Trastevere side, the lower quays (accessible via steps) are sometimes used as informal dog swimming areas in summer.',
          es: 'Los paseos junto al Tíber son el lugar de paseo favorito de los romanos y sus perros. En el lado de Prati o Trastevere, los muelles bajos (accesibles por escaleras) se usan a veces como zonas informales de baño canino en verano.',
        },
      },
    ],
    petTips: {
      fr: [
        'Les chiens sont admis dans les bus et le métro romains à condition d\'être en sac ou avec un billet réduit et muselés. En pratique, les petits chiens montent librement dans les bus.',
        'La plupart des restaurants avec terrasse acceptent les chiens à Rome — c\'est culturellement ancré. Demandez simplement : "Posso portare il mio cane?"',
        'En été, les fontaines publiques (nasoni) sont partout dans Rome — elles dispensent une eau froide et potable, parfaite pour votre chien.',
        'Évitez le centre historique aux heures de pointe touristique (10h-18h) — préférez les promenades très tôt le matin ou en soirée.',
        'Le Parco dell\'Appia Antica est fermé aux voitures le dimanche : c\'est le meilleur moment pour s\'y rendre avec un chien.',
      ],
      en: [
        'Dogs are allowed on Rome\'s buses and metro if in a carrier or with a reduced ticket and muzzled. In practice, small dogs ride buses freely.',
        'Most terrace restaurants in Rome accept dogs — it\'s culturally embedded. Just ask: "Posso portare il mio cane?"',
        'In summer, the public "nasoni" fountains are everywhere in Rome — they dispense cold, drinkable water, perfect for your dog.',
        'Avoid the historic centre during peak tourist hours (10am–6pm) — opt for very early morning or evening walks instead.',
        'Parco dell\'Appia Antica is closed to cars on Sundays: that\'s the best time to visit with a dog.',
      ],
      es: [
        'Los perros pueden viajar en autobús y metro en Roma en transportín o con billete reducido y bozal. En la práctica, los perros pequeños suben libremente al autobús.',
        'La mayoría de los restaurantes con terraza en Roma aceptan perros: está arraigado culturalmente. Solo hay que preguntar: "Posso portare il mio cane?"',
        'En verano, las fuentes públicas "nasoni" están por toda Roma y dispensan agua fría y potable, perfecta para tu perro.',
        'Evita el centro histórico en las horas pico turísticas (10-18 h): opta por paseos muy temprano por la mañana o al anochecer.',
        'El Parco dell\'Appia Antica está cerrado a los coches los domingos: ese es el mejor momento para ir con un perro.',
      ],
    },
    practicalInfo: {
      fr: [
        'Vétérinaire d\'urgence 24h/24 : Clinica Veterinaria Roma Sud, Via Laurentina 514, +39 06 509 7849',
        'Clinique centrale : Ospedale Veterinario "I Portoni Rossi", Via Funo 52, Argelato (BO) — pour les urgences complexes',
        'Trains depuis Paris (Thello/Trenitalia) : les animaux en sac sont acceptés gratuitement. Les grands chiens nécessitent un billet et doivent être muselés.',
        'Aéroport de Rome-Fiumicino : animaux UE avec passeport valide admis sans quarantaine.',
      ],
      en: [
        '24/7 emergency vet: Clinica Veterinaria Roma Sud, Via Laurentina 514, +39 06 509 7849',
        'Central clinic: Policlinico Veterinario Roma, Via G. Borsi 3, +39 06 558 0710',
        'Trains from Paris (Trenitalia): animals in carriers accepted free. Large dogs need a ticket and must be muzzled.',
        'Rome Fiumicino Airport: EU pets with valid passport admitted without quarantine.',
      ],
      es: [
        'Veterinario de urgencias 24h: Clinica Veterinaria Roma Sud, Via Laurentina 514, +39 06 509 7849',
        'Clínica central: Policlinico Veterinario Roma, Via G. Borsi 3, +39 06 558 0710',
        'Trenes desde París (Trenitalia): animales en transportín admitidos gratis. Los perros grandes necesitan billete y deben llevar bozal.',
        'Aeropuerto de Roma-Fiumicino: mascotas de la UE con pasaporte válido admitidas sin cuarentena.',
      ],
    },
  },

  lisbon: {
    history: {
      fr: `Lisbonne est l'une des plus vieilles capitales d'Europe. Fondée par les Phéniciens, développée par les Romains sous le nom de Olisipo, elle est devenue au XVe siècle le centre névralgique des Grandes Découvertes portugaises — d'où partirent Vasco de Gama et les flottes qui ont relié l'Europe à l'Asie et à l'Amérique. Le grand séisme de 1755, suivi d'un tsunami et d'incendies, a détruit une grande partie du centre médiéval. Le marquis de Pombal a reconstruit la Baixa en damier — la première cité moderne planifiée d'Europe. Aujourd'hui, Lisbonne est une ville douce et ensoleillée, aux collines couvertes de miradouros et de cafés avec terrasses — idéale pour voyager avec un animal toute l'année.`,
      en: `Lisbon is one of Europe's oldest capitals. Founded by the Phoenicians and developed by the Romans as Olisipo, it became in the 15th century the nerve centre of the Portuguese Age of Discovery — the port from which Vasco da Gama and the fleets that connected Europe to Asia and the Americas set sail. The great earthquake of 1755, followed by a tsunami and fires, destroyed much of the medieval centre. The Marquis of Pombal rebuilt the Baixa on a grid — Europe's first planned modern city. Today Lisbon is a mild, sun-drenched city of hillside miradouros and terrace cafés — ideal for year-round pet travel.`,
      es: `Lisboa es una de las capitales más antiguas de Europa. Fundada por los fenicios y desarrollada por los romanos como Olisipo, se convirtió en el siglo XV en el centro neurálgico de los Grandes Descubrimientos portugueses: el puerto desde el que partieron Vasco de Gama y las flotas que unieron Europa con Asia y América. El gran terremoto de 1755, seguido de un tsunami e incendios, destruyó gran parte del centro medieval. El marqués de Pombal reconstruyó la Baixa en cuadrícula, la primera ciudad moderna planificada de Europa. Hoy Lisboa es una ciudad suave y soleada, de miradores en las colinas y cafés con terraza: ideal para viajar con mascota durante todo el año.`,
    },
    sights: [
      {
        name: 'Monsanto',
        emoji: '🌲',
        petFriendly: true,
        desc: {
          fr: 'Le poumon vert de Lisbonne (10 km²) est le meilleur endroit pour lâcher son chien dans la ville. Chemins forestiers, pique-niques, aires de jeux canines. Accessible en bus 723 depuis le Marquês de Pombal.',
          en: 'Lisbon\'s green lung (10 km²) is the best place to let your dog run free in the city. Forest paths, picnic areas, dog play zones. Accessible by bus 723 from Marquês de Pombal.',
          es: 'El pulmón verde de Lisboa (10 km²) es el mejor lugar para dejar correr a tu perro en la ciudad. Caminos forestales, zonas de picnic, áreas de juego caninas. Accesible en autobús 723 desde Marquês de Pombal.',
        },
      },
      {
        name: 'Belém & bord du Tage',
        emoji: '⛵',
        petFriendly: true,
        desc: {
          fr: 'Le quartier de Belém, avec sa Tour emblématique et le Monastère des Hiéronymites, offre de larges espaces piétonniers en bord de fleuve parfaits pour une promenade avec un chien. Les jardins du bord du Tage sont accessibles aux animaux en laisse.',
          en: 'The Belém neighbourhood, with its iconic Tower and Jerónimos Monastery, offers wide pedestrian riverside spaces perfect for a dog walk. The Tagus riverside gardens welcome dogs on leads.',
          es: 'El barrio de Belém, con su icónica Torre y el Monasterio de los Jerónimos, ofrece amplias zonas peatonales junto al río ideales para pasear con un perro. Los jardines junto al Tajo admiten perros con correa.',
        },
      },
      {
        name: 'Alfama & miradouros',
        emoji: '🌅',
        petFriendly: true,
        desc: {
          fr: 'Les ruelles de l\'Alfama et les belvédères (miradouros) comme le Miradouro da Graça ou de Santa Luzia sont accessibles aux chiens. La montée est rude mais la vue sur le Tage depuis le sommet avec son chien est l\'une des plus belles de la ville.',
          en: 'The lanes of Alfama and viewpoints (miradouros) such as Miradouro da Graça or Santa Luzia are accessible to dogs. The climb is steep but the view over the Tagus from the top with your dog is one of the city\'s finest.',
          es: 'Los callejones de la Alfama y los miradores como el Miradouro da Graça o de Santa Luzia son accesibles para los perros. La subida es empinada, pero la vista sobre el Tajo desde lo alto con tu perro es una de las más bellas de la ciudad.',
        },
      },
      {
        name: 'Chiado & Príncipe Real',
        emoji: '🏘️',
        petFriendly: true,
        desc: {
          fr: 'Le Chiado et le Príncipe Real sont les quartiers les plus dog-friendly du centre de Lisbonne. Boutiques indépendantes, marchés, cafés avec terrasses et pharmacies vétérinaires. Le Jardim do Príncipe Real est un havre de fraîcheur avec ses palmiers.',
          en: 'Chiado and Príncipe Real are central Lisbon\'s most dog-friendly neighbourhoods. Independent shops, markets, café terraces and vet pharmacies. The Jardim do Príncipe Real is a cool haven under its palm trees.',
          es: 'Chiado y Príncipe Real son los barrios más amigables con los perros del centro de Lisboa. Tiendas independientes, mercados, terrazas de café y farmacias veterinarias. El Jardim do Príncipe Real es un refugio de frescor bajo sus palmeras.',
        },
      },
      {
        name: 'Jardin de la Fondation Gulbenkian',
        emoji: '🌸',
        petFriendly: true,
        desc: {
          fr: 'L\'un des plus beaux jardins de Lisbonne, adjacent à la Fondation Calouste Gulbenkian. Les chiens en laisse y sont admis. Étang, pelouses et grandes allées ombragées — parfait pour une pause en milieu de journée.',
          en: 'One of Lisbon\'s finest gardens, adjacent to the Calouste Gulbenkian Foundation. Dogs on leads are welcome. Pond, lawns and wide shaded paths — perfect for a midday break.',
          es: 'Uno de los jardines más hermosos de Lisboa, junto a la Fundación Calouste Gulbenkian. Los perros con correa son bienvenidos. Estanque, céspedes y amplios caminos sombreados: perfecto para un descanso a mediodía.',
        },
      },
    ],
    petTips: {
      fr: [
        'Les chiens sont admis dans le métro lisbonnais à condition d\'être en sac ou cage. Les trams historiques (28, 15E) sont souvent bondés — mieux vaut y aller tôt ou les éviter.',
        'La chaleur estivale peut être intense à Lisbonne. Monsanto offre de l\'ombre et de la fraîcheur même en été — c\'est là qu\'il faut aller aux heures chaudes.',
        'Lisbonne est une ville très pentue. Vérifiez que votre chien est à l\'aise sur les pavés portugais (calceteiro) avant de vous lancer dans une longue promenade dans l\'Alfama.',
        'De nombreux restaurants et cafés du Chiado et de Santos acceptent les chiens en terrasse. Demandez simplement : "Posso trazer o meu cão?"',
        'L\'eau du robinet est potable à Lisbonne — les fontaines publiques sont nombreuses et votre chien peut s\'y désaltérer.',
      ],
      en: [
        'Dogs are allowed on Lisbon Metro if in a bag or carrier. The historic trams (28, 15E) are often packed — go early or avoid them.',
        'Summer heat can be intense in Lisbon. Monsanto offers shade and coolness even in summer — head there during the hottest hours.',
        'Lisbon is a very hilly city. Check your dog is comfortable on traditional Portuguese cobblestones (calceteiro) before attempting a long Alfama walk.',
        'Many restaurants and cafés in Chiado and Santos welcome dogs on terraces. Just ask: "Posso trazer o meu cão?"',
        'Tap water is drinkable in Lisbon — public fountains are plentiful and your dog can drink from them.',
      ],
      es: [
        'Los perros pueden viajar en el metro de Lisboa en bolsa o transportín. Los tranvías históricos (28, 15E) suelen ir llenos: ve temprano o evítalos.',
        'El calor veraniego puede ser intenso en Lisboa. Monsanto ofrece sombra y frescor incluso en verano: ve allí en las horas de más calor.',
        'Lisboa es una ciudad muy empinada. Comprueba que tu perro se desenvuelve bien sobre los adoquines portugueses (calceteiro) antes de aventurarte en un largo paseo por la Alfama.',
        'Muchos restaurantes y cafés en Chiado y Santos admiten perros en la terraza. Solo hay que preguntar: "Posso trazer o meu cão?"',
        'El agua del grifo es potable en Lisboa: las fuentes públicas son abundantes y tu perro puede beber de ellas.',
      ],
    },
    practicalInfo: {
      fr: [
        'Vétérinaire d\'urgence 24h/24 : Hospital Veterinário do Restelo, Rua Duarte Pacheco Pereira 15, +351 21 302 9999',
        'Clinique centrale : Clinica Veterinária de Lisboa, Av. António Augusto de Aguiar 138, +351 21 315 5590',
        'Trains depuis Paris ou Madrid : Renfe-SNCF accepte les animaux en cage sur les lignes internationales. Vérifiez à la réservation selon la taille.',
        'Aéroport de Lisbonne Humberto Delgado : animaux UE avec passeport valide admis sans quarantaine.',
      ],
      en: [
        '24/7 emergency vet: Hospital Veterinário do Restelo, Rua Duarte Pacheco Pereira 15, +351 21 302 9999',
        'Central clinic: Clinica Veterinária de Lisboa, Av. António Augusto de Aguiar 138, +351 21 315 5590',
        'Trains from Paris or Madrid: Renfe-SNCF accepts animals in carriers on international routes. Check at booking by size.',
        'Lisbon Humberto Delgado Airport: EU pets with valid passport admitted without quarantine.',
      ],
      es: [
        'Veterinario de urgencias 24h: Hospital Veterinário do Restelo, Rua Duarte Pacheco Pereira 15, +351 21 302 9999',
        'Clínica central: Clinica Veterinária de Lisboa, Av. António Augusto de Aguiar 138, +351 21 315 5590',
        'Trenes desde París o Madrid: Renfe-SNCF acepta animales en transportín en líneas internacionales. Consulta al reservar según el tamaño.',
        'Aeropuerto de Lisboa Humberto Delgado: mascotas de la UE con pasaporte válido admitidas sin cuarentena.',
      ],
    },
  },

  berlin: {
    history: {
      fr: `Berlin est la capitale du dog-friendly en Europe — et ce n'est pas un mythe. On estime à 100 000 le nombre de chiens enregistrés dans la ville, avec une « taxe chien » (Hundesteuer) qui finance leur coexistence avec les humains. Berlin est une ville jeune : détruite à 70% pendant la Seconde Guerre mondiale, elle a été reconstruite et réinventée. La réunification de 1989 lui a redonné un élan unique. Aujourd'hui, avec ses 2 500 espaces verts représentant 30% de la surface totale de la ville, ses chiens qui montent librement dans le métro et entrent dans les magasins et les cafés, Berlin offre une qualité de vie canine sans équivalent en Europe.`,
      en: `Berlin is Europe's dog-friendly capital — and that's no myth. An estimated 100,000 dogs are registered in the city, with a "dog tax" (Hundesteuer) funding their coexistence with humans. Berlin is a young city: 70% destroyed during the Second World War, it was rebuilt and reinvented. The 1989 reunification gave it a unique new momentum. Today, with 2,500 green spaces covering 30% of the city's total area, dogs riding the U-Bahn freely and entering shops and cafés, Berlin offers a quality of canine life unmatched anywhere in Europe.`,
      es: `Berlín es la capital dog-friendly de Europa, y no es un mito. Se estima que hay unos 100.000 perros registrados en la ciudad, con un "impuesto sobre perros" (Hundesteuer) que financia su convivencia con los humanos. Berlín es una ciudad joven: destruida en un 70% durante la Segunda Guerra Mundial, fue reconstruida y reinventada. La reunificación de 1989 le dio un impulso único. Hoy, con 2.500 zonas verdes que suponen el 30% de la superficie total de la ciudad, perros que viajan libremente en el U-Bahn y entran en tiendas y cafés, Berlín ofrece una calidad de vida canina sin parangón en Europa.`,
    },
    sights: [
      {
        name: 'Tiergarten',
        emoji: '🌳',
        petFriendly: true,
        desc: {
          fr: 'Le grand parc central de Berlin (210 ha) est le terrain de jeu préféré des Berlinois et de leurs chiens. De nombreuses zones sont off-leash. L\'axe est-ouest traverse le parc entier. Les matins de semaine, il appartient presque entièrement aux chiens.',
          en: 'Berlin\'s main central park (210 ha) is the favourite playground of Berliners and their dogs. Many areas are off-leash. The east-west axis traverses the entire park. On weekday mornings it belongs almost entirely to the dogs.',
          es: 'El gran parque central de Berlín (210 ha) es el terreno de juego favorito de los berlineses y sus perros. Numerosas zonas están sin correa. El eje este-oeste atraviesa todo el parque. Los días laborables por la mañana pertenece casi íntegramente a los perros.',
        },
      },
      {
        name: 'Tempelhofer Feld',
        emoji: '✈️',
        petFriendly: true,
        desc: {
          fr: 'L\'ancienne piste d\'atterrissage de l\'aéroport de Tempelhof est devenue le parc urbain le plus singulier d\'Europe. 355 hectares de prairies ouvertes — les chiens peuvent y courir librement sur les pistes. Un spot absolument unique, très prisé des Berlinois.',
          en: 'The former Tempelhof airport runway has become Europe\'s most singular urban park. 355 hectares of open grassland — dogs can run freely along the runways. An absolutely unique spot, hugely popular with Berliners.',
          es: 'La antigua pista del aeropuerto de Tempelhof se ha convertido en el parque urbano más singular de Europa. 355 hectáreas de praderas abiertas donde los perros pueden correr libremente por las pistas. Un lugar absolutamente único, muy querido por los berlineses.',
        },
      },
      {
        name: 'Grunewald',
        emoji: '🌲',
        petFriendly: true,
        desc: {
          fr: 'La forêt de Grunewald (3 000 ha) à l\'ouest de Berlin est le parc naturel urbain le plus grand d\'Europe. Des sentiers forestiers s\'étendent à perte de vue, les chiens y sont libres dans la plupart des zones. Le lac Schlachtensee est une plage canine populaire en été.',
          en: 'The Grunewald forest (3,000 ha) on Berlin\'s western edge is Europe\'s largest urban natural park. Forest trails extend as far as the eye can see, dogs are free in most areas. Lake Schlachtensee is a popular dog swimming spot in summer.',
          es: 'El bosque de Grunewald (3.000 ha) al oeste de Berlín es el mayor parque natural urbano de Europa. Los senderos forestales se extienden hasta donde alcanza la vista, y los perros están libres en la mayoría de las zonas. El lago Schlachtensee es un popular punto de baño canino en verano.',
        },
      },
      {
        name: 'Prenzlauer Berg',
        emoji: '🏘️',
        petFriendly: true,
        desc: {
          fr: 'Le quartier le plus dog-friendly de Berlin. Cafés avec eau pour chiens, boutiques pet-friendly et le Mauerpark le dimanche — un marché aux puces immense où les chiens se promènent librement entre les stands. Les terrasses du Kollwitzplatz sont idéales en soirée.',
          en: 'Berlin\'s most dog-friendly neighbourhood. Cafés with dog water bowls, pet-welcoming shops and the Mauerpark on Sundays — a huge flea market where dogs roam freely between stalls. Kollwitzplatz terraces are ideal for an evening drink.',
          es: 'El barrio más amigable con los perros de Berlín. Cafés con cuencos de agua para perros, tiendas pet-friendly y el Mauerpark los domingos: un enorme mercadillo donde los perros deambulan libremente entre los puestos. Las terrazas de Kollwitzplatz son ideales para tomar algo al anochecer.',
        },
      },
      {
        name: 'Museumsinsel (Île aux Musées)',
        emoji: '🏛️',
        petFriendly: false,
        desc: {
          fr: 'Les musées de l\'île (Pergamon, Bode, Neues Museum) n\'acceptent pas les animaux à l\'intérieur. Mais les rives de la Spree autour de l\'île sont magnifiques et entièrement dog-friendly — une promenade incontournable.',
          en: 'The island\'s museums (Pergamon, Bode, Neues Museum) do not accept animals inside. But the Spree riverbanks around the island are beautiful and entirely dog-friendly — an unmissable walk.',
          es: 'Los museos de la isla (Pergamon, Bode, Neues Museum) no aceptan animales en su interior. Pero las orillas del Spree alrededor de la isla son preciosas y completamente dog-friendly: un paseo imprescindible.',
        },
      },
    ],
    petTips: {
      fr: [
        'Les chiens voyagent dans le métro berlinois (U-Bahn et S-Bahn) avec un ticket réduit (Kleinkinderticket) et sans muselière obligatoire. C\'est l\'un des systèmes de transport les plus dog-friendly d\'Europe.',
        'La taxe chien (Hundesteuer) est due par les résidents, pas les touristes. Vous n\'avez rien à payer lors d\'un séjour.',
        'La plupart des supermarchés (Rewe, Lidl, dm) et des magasins de bricolage acceptent les chiens. Certains Kaufland ont même une zone d\'attache à l\'entrée.',
        'Les cafés et restaurants avec terrasse acceptent quasi universellement les chiens à Berlin. Demandez une Hundeecke (coin chien) si vous voulez être avec d\'autres propriétaires.',
        'En été, les lacs autour de Berlin (Schlachtensee, Wannsee, Müggelsee) offrent des zones de baignade canine désignées.',
      ],
      en: [
        'Dogs ride Berlin\'s U-Bahn and S-Bahn with a reduced ticket (Kleinkinderticket) and without a mandatory muzzle. It\'s one of Europe\'s most dog-friendly transport systems.',
        'The Hundesteuer (dog tax) applies to residents, not tourists. You don\'t need to pay anything during your stay.',
        'Most supermarkets (Rewe, Lidl, dm) and DIY stores welcome dogs. Some Kaufland stores even have a tethering area at the entrance.',
        'Café and restaurant terraces almost universally welcome dogs in Berlin. Ask for a Hundeecke (dog corner) if you want to sit with other dog owners.',
        'In summer, Berlin\'s surrounding lakes (Schlachtensee, Wannsee, Müggelsee) offer designated dog swimming areas.',
      ],
      es: [
        'Los perros viajan en el U-Bahn y S-Bahn de Berlín con un billete reducido (Kleinkinderticket) y sin bozal obligatorio. Es uno de los sistemas de transporte más dog-friendly de Europa.',
        'El Hundesteuer (impuesto sobre perros) lo pagan los residentes, no los turistas. No tienes que abonar nada durante tu estancia.',
        'La mayoría de supermercados (Rewe, Lidl, dm) y ferreterías admiten perros. Algunos Kaufland tienen incluso una zona de atado en la entrada.',
        'Las terrazas de cafés y restaurantes en Berlín admiten perros de forma casi universal. Pide una Hundeecke (rincón para perros) si quieres sentarte con otros dueños.',
        'En verano, los lagos de los alrededores de Berlín (Schlachtensee, Wannsee, Müggelsee) tienen zonas designadas de baño canino.',
      ],
    },
    practicalInfo: {
      fr: [
        'Vétérinaire d\'urgence 24h/24 : Tierklinik Haar, Mainzer Str. 27, Berlin-Neukölln, +49 30 688 364 00',
        'Clinique centrale réputée : Tierärztliche Spezialisten Berlin, Leibnizstraße 43, Charlottenburg, +49 30 883 5050',
        'Trains depuis Paris (ICE/Eurostar) : les animaux en sac sont acceptés gratuits sur la Deutsche Bahn. Les grands chiens voyagent avec un billet demi-tarif.',
        'Aéroport de Berlin Brandenburg (BER) : animaux UE avec passeport valide admis sans quarantaine.',
      ],
      en: [
        '24/7 emergency vet: Tierklinik Haar, Mainzer Str. 27, Berlin-Neukölln, +49 30 688 364 00',
        'Reputable central clinic: Tierärztliche Spezialisten Berlin, Leibnizstraße 43, Charlottenburg, +49 30 883 5050',
        'Trains from Paris (Deutsche Bahn): animals in carriers travel free. Large dogs need a half-price ticket.',
        'Berlin Brandenburg Airport (BER): EU pets with valid passport admitted without quarantine.',
      ],
      es: [
        'Veterinario de urgencias 24h: Tierklinik Haar, Mainzer Str. 27, Berlin-Neukölln, +49 30 688 364 00',
        'Clínica central de referencia: Tierärztliche Spezialisten Berlin, Leibnizstraße 43, Charlottenburg, +49 30 883 5050',
        'Trenes desde París (Deutsche Bahn): animales en transportín viajan gratis. Los perros grandes necesitan un billete a mitad de precio.',
        'Aeropuerto de Berlín Brandeburgo (BER): mascotas de la UE con pasaporte válido admitidas sin cuarentena.',
      ],
    },
  },

  vienna: {
    history: {
      fr: `Vienne a été pendant six siècles la capitale des Habsbourg et le centre de gravité de l'Europe centrale. Sous l'empire austro-hongrois, la ville a atteint une splendeur architecturale inégalée : le Ring, le Kunsthistorisches Museum, l'Opéra d'État. Mais Vienne, c'est aussi la ville du café — le Wiener Kaffeehaus, inscrit au patrimoine culturel immatériel de l'UNESCO, est une institution où l'on passe des heures à lire, penser et discuter... souvent avec son chien sur les genoux. Car Vienne prend le bien-être animal au sérieux : les chiens sont admis dans le métro, dans la plupart des musées (hors expositions) et dans d'innombrables cafés. La ville compte même des "Hundeauslaufflächen" — des espaces officiellement dédiés aux chiens sans laisse dans la majorité des parcs.`,
      en: `Vienna was for six centuries the capital of the Habsburg Empire and the gravitational centre of Central Europe. Under the Austro-Hungarian empire the city reached unrivalled architectural splendour: the Ring, the Kunsthistorisches Museum, the State Opera. But Vienna is also the city of the café — the Wiener Kaffeehaus, inscribed on UNESCO's intangible cultural heritage list, is an institution where people spend hours reading, thinking and talking... often with their dog on their lap. Vienna takes animal welfare seriously: dogs are admitted on the metro, in most museums (outside exhibitions) and in countless cafés. The city even has official off-leash areas (Hundeauslaufflächen) in most parks.`,
      es: `Viena fue durante seis siglos la capital de los Habsburgo y el centro de gravedad de Europa central. Bajo el Imperio austrohúngaro, la ciudad alcanzó un esplendor arquitectónico sin igual: el Ring, el Kunsthistorisches Museum, la Ópera del Estado. Pero Viena también es la ciudad del café: el Wiener Kaffeehaus, inscrito en el patrimonio cultural inmaterial de la UNESCO, es una institución donde se pasan horas leyendo, pensando y conversando... a menudo con el perro en el regazo. Viena se toma en serio el bienestar animal: los perros están admitidos en el metro, en la mayoría de los museos (fuera de las exposiciones) y en innumerables cafés. La ciudad dispone incluso de zonas oficiales sin correa (Hundeauslaufflächen) en la mayoría de sus parques.`,
    },
    sights: [
      {
        name: 'Prater & Würstelprater',
        emoji: '🎡',
        petFriendly: true,
        desc: {
          fr: 'Le Prater est un immense parc (6 km²) traversé par la Hauptallee, une avenue droite de 4,5 km idéale pour courir avec son chien. Les zones off-leash y sont nombreuses. La grande roue (Riesenrad) est un symbole mais les animaux n\'y sont pas admis.',
          en: 'The Prater is a vast park (6 km²) crossed by the Hauptallee, a 4.5 km straight avenue ideal for running with your dog. Off-leash zones are plentiful. The giant Ferris wheel (Riesenrad) is an icon but animals are not admitted.',
          es: 'El Prater es un enorme parque (6 km²) atravesado por la Hauptallee, una avenida recta de 4,5 km ideal para correr con tu perro. Las zonas sin correa son abundantes. La noria gigante (Riesenrad) es un símbolo, pero los animales no están admitidos.',
        },
      },
      {
        name: 'Donauinsel',
        emoji: '🏖️',
        petFriendly: true,
        desc: {
          fr: 'L\'île du Danube (21 km de long) est le paradis des chiens viennois en été. Zones de baignade canine aménagées, plages de sable et chemins cyclables accessibles aux piétons et aux animaux. Accès direct par le métro U1.',
          en: 'Danube Island (21 km long) is the paradise for Viennese dogs in summer. Purpose-built dog swimming areas, sandy beaches and cycle paths accessible to pedestrians and animals. Direct access by U1 metro.',
          es: 'La isla del Danubio (21 km de longitud) es el paraíso de los perros vieneses en verano. Zonas de baño canino habilitadas, playas de arena y carriles bici accesibles para peatones y animales. Acceso directo en metro U1.',
        },
      },
      {
        name: 'Lainzer Tiergarten',
        emoji: '🌲',
        petFriendly: true,
        desc: {
          fr: 'Ancienne réserve de chasse des Habsbourg (2 450 ha), le Lainzer Tiergarten est l\'un des plus grands parcs naturels urbains d\'Europe. Les chiens y sont admis en laisse sur les sentiers balisés. Sangliers et cerfs peuvent être aperçus.',
          en: 'Former Habsburg hunting reserve (2,450 ha), the Lainzer Tiergarten is one of Europe\'s largest urban natural parks. Dogs are admitted on leads on marked trails. Wild boar and deer can be spotted.',
          es: 'Antigua reserva de caza de los Habsburgo (2.450 ha), el Lainzer Tiergarten es uno de los mayores parques naturales urbanos de Europa. Los perros están admitidos con correa en los senderos señalizados. Se pueden avistar jabalíes y ciervos.',
        },
      },
      {
        name: 'Innere Stadt & cafés',
        emoji: '☕',
        petFriendly: true,
        desc: {
          fr: 'Le centre historique de Vienne (1er arrondissement) est truffé de Kaffeehäuser qui acceptent les chiens. Le Café Central, le Hawelka, le Café Landtmann — la plupart autorisent les animaux bien tenus. Une expérience culturelle unique.',
          en: 'Vienna\'s historic centre (1st district) is dotted with Kaffeehäuser that accept dogs. Café Central, Hawelka, Café Landtmann — most welcome well-behaved animals. A unique cultural experience.',
          es: 'El centro histórico de Viena (1er distrito) está repleto de Kaffeehäuser que admiten perros. Café Central, Hawelka, Café Landtmann: la mayoría acoge a animales bien educados. Una experiencia cultural única.',
        },
      },
      {
        name: 'Schönbrunn',
        emoji: '👑',
        petFriendly: true,
        desc: {
          fr: 'Les jardins du palais de Schönbrunn (1,7 km²) sont accessibles aux chiens en laisse. Le palais lui-même n\'accepte pas les animaux. Les allées de gravier et les panoramas sur Vienne en font une promenade royale — au sens propre.',
          en: 'The Schönbrunn palace gardens (1.7 km²) welcome dogs on leads. The palace interior does not accept animals. The gravel paths and panoramas over Vienna make for a walk that\'s royal in every sense.',
          es: 'Los jardines del palacio de Schönbrunn (1,7 km²) admiten perros con correa. El interior del palacio no acepta animales. Los caminos de grava y las panorámicas sobre Viena hacen de este paseo algo verdaderamente regio.',
        },
      },
    ],
    petTips: {
      fr: [
        'Les chiens voyagent dans le métro viennois (U-Bahn) avec un billet réduit (50% du tarif adulte) et doivent être muselés ou en sac. En pratique, les contrôleurs sont souvent indulgents.',
        'Vienne dispose de 26 espaces officiels "Hundeauslauf" où les chiens peuvent courir librement sans laisse. Une liste est disponible sur le site de la ville (wien.gv.at).',
        'La plupart des Kaffeehäuser acceptent les chiens — c\'est une tradition viennoise. Demandez simplement : "Darf mein Hund mit reinkommen?"',
        'En hiver, Vienne peut être froide et verglacée. Des bottes canines sont recommandées pour les petits chiens sensibles au sel de déverglaçage.',
        'Le Prater est gratuit et ouvert 24h/24. C\'est la promenade matinale idéale avant les musées.',
      ],
      en: [
        'Dogs travel on Vienna\'s U-Bahn with a reduced ticket (50% adult fare) and must be muzzled or in a carrier. In practice, inspectors are often lenient.',
        'Vienna has 26 official "Hundeauslauf" off-leash spaces. A full list is available on the city website (wien.gv.at).',
        'Most Kaffeehäuser accept dogs — it\'s a Viennese tradition. Just ask: "Darf mein Hund mit reinkommen?"',
        'In winter Vienna can be icy and cold. Dog boots are recommended for small dogs sensitive to de-icing salt.',
        'The Prater is free and open 24/7. It\'s the ideal morning walk before museum visits.',
      ],
      es: [
        'Los perros viajan en el U-Bahn de Viena con billete reducido (50% del adulto) y deben llevar bozal o ir en transportín. En la práctica, los revisores suelen ser indulgentes.',
        'Viena dispone de 26 espacios oficiales "Hundeauslauf" donde los perros pueden correr sin correa. La lista completa está en la web municipal (wien.gv.at).',
        'La mayoría de los Kaffeehäuser admiten perros: es una tradición vienesa. Solo hay que preguntar: "Darf mein Hund mit reinkommen?"',
        'En invierno Viena puede ser muy fría y helada. Se recomiendan botas caninas para perros pequeños sensibles a la sal antiglacial.',
        'El Prater es gratuito y está abierto 24 horas. Es el paseo matutino ideal antes de visitar los museos.',
      ],
    },
    practicalInfo: {
      fr: [
        'Vétérinaire d\'urgence 24h/24 : Tierklinik Strebersdorf, Kürschnergasse 4, +43 1 292 5200',
        'Clinique centrale : Tierspital Wien (Univ.), Veterinärplatz 1, +43 1 25 077 5100',
        'Trains depuis Paris (Railjet/ÖBB) : les animaux en cage ou sac voyagent gratuitement. Les grands chiens nécessitent un billet demi-tarif et un museau.',
        'Aéroport de Vienne-Schwechat : animaux UE avec passeport valide admis sans quarantaine.',
      ],
      en: [
        '24/7 emergency vet: Tierklinik Strebersdorf, Kürschnergasse 4, +43 1 292 5200',
        'Central clinic: Tierspital Wien (University), Veterinärplatz 1, +43 1 25 077 5100',
        'Trains from Paris (Railjet/ÖBB): animals in carriers or bags travel free. Large dogs need a half-price ticket and a muzzle.',
        'Vienna Schwechat Airport: EU pets with valid passport admitted without quarantine.',
      ],
      es: [
        'Veterinario de urgencias 24h: Tierklinik Strebersdorf, Kürschnergasse 4, +43 1 292 5200',
        'Clínica central: Tierspital Wien (Universidad), Veterinärplatz 1, +43 1 25 077 5100',
        'Trenes desde París (Railjet/ÖBB): animales en transportín o bolsa viajan gratis. Los perros grandes necesitan billete a mitad de precio y bozal.',
        'Aeropuerto de Viena-Schwechat: mascotas de la UE con pasaporte válido admitidas sin cuarentena.',
      ],
    },
  },

  prague: {
    history: {
      fr: `Prague est l'une des rares capitales européennes à avoir traversé les deux guerres mondiales pratiquement intacte. Son centre historique, classé au patrimoine mondial de l'UNESCO, conserve intact un millénaire d'architecture : romane, gothique, baroque, Art Nouveau, cubiste — un concentré unique qui en fait l'une des plus belles villes du monde. Fondée au IXe siècle sur les rives de la Vltava, Prague a connu son apogée sous Charles IV (XIVe siècle), qui en fit la capitale du Saint-Empire romain germanique. Aujourd'hui, Prague est une ville compacte et marchable, où les chiens sont bienvenus dans la quasi-totalité des pubs, wine bars et restaurants — une tradition tchèque bien ancrée.`,
      en: `Prague is one of the few European capitals to have emerged from both World Wars virtually intact. Its historic centre, a UNESCO World Heritage Site, preserves a millennium of architecture: Romanesque, Gothic, Baroque, Art Nouveau, Cubist — a unique concentration that makes it one of the world's most beautiful cities. Founded in the 9th century on the banks of the Vltava, Prague reached its peak under Charles IV (14th century), who made it the capital of the Holy Roman Empire. Today Prague is a compact, walkable city where dogs are welcome in virtually all pubs, wine bars and restaurants — a firmly established Czech tradition.`,
      es: `Praga es una de las pocas capitales europeas que sobrevivió a ambas guerras mundiales prácticamente intacta. Su centro histórico, declarado Patrimonio de la Humanidad por la UNESCO, conserva un milenio de arquitectura: románica, gótica, barroca, art nouveau, cubista: una concentración única que la convierte en una de las ciudades más bellas del mundo. Fundada en el siglo IX a orillas del Moldava, Praga alcanzó su esplendor bajo Carlos IV (siglo XIV), quien la convirtió en capital del Sacro Imperio Romano Germánico. Hoy Praga es una ciudad compacta y caminable, donde los perros son bienvenidos en prácticamente todos los pubs, bares de vinos y restaurantes: una tradición checa bien arraigada.`,
    },
    sights: [
      {
        name: 'Stromovka',
        emoji: '🌳',
        petFriendly: true,
        desc: {
          fr: 'L\'ancien parc royal (95 ha) dans le quartier de Holešovice est le parc préféré des chiens praguois. Zones sans laisse désignées, grands espaces ouverts et étangs. Calme en semaine, animé le week-end.',
          en: 'The former royal park (95 ha) in the Holešovice neighbourhood is the favourite park for Prague dogs. Designated off-leash areas, wide open spaces and ponds. Peaceful on weekdays, lively at weekends.',
          es: 'El antiguo parque real (95 ha) en el barrio de Holešovice es el parque favorito de los perros de Praga. Zonas sin correa designadas, grandes espacios abiertos y estanques. Tranquilo entre semana, animado los fines de semana.',
        },
      },
      {
        name: 'Letná',
        emoji: '🌅',
        petFriendly: true,
        desc: {
          fr: 'Le parc de Letná surplombe la vieille ville et offre une vue panoramique spectaculaire sur les ponts et la Vltava. Les chiens peuvent y aller sans laisse dans les zones dégagées. Le beer garden de Letná est l\'un des plus sympas de Prague — les chiens y sont bienvenus.',
          en: 'Letná Park overlooks the old town and offers a spectacular panoramic view of the bridges and Vltava. Dogs can go off-leash in the open areas. The Letná beer garden is one of Prague\'s nicest — dogs are welcome.',
          es: 'El parque de Letná domina el casco antiguo y ofrece una espectacular vista panorámica de los puentes y el Moldava. Los perros pueden ir sin correa en las zonas abiertas. El jardín de cerveza de Letná es uno de los más agradables de Praga, y los perros son bienvenidos.',
        },
      },
      {
        name: 'Vinohrady & Žižkov',
        emoji: '🏘️',
        petFriendly: true,
        desc: {
          fr: 'Les deux quartiers les plus dog-friendly de Prague hors du centre touristique. Pubs accueillants, cafés branchés et rues calmes. Le Riegrovy sady (parc de Vinohrady) avec son beer garden est un incontournable.',
          en: 'Prague\'s two most dog-friendly neighbourhoods outside the tourist centre. Welcoming pubs, trendy cafés and quiet streets. The Riegrovy sady (Vinohrady park) with its beer garden is unmissable.',
          es: 'Los dos barrios más amigables con los perros de Praga fuera del centro turístico. Pubs acogedores, cafés de moda y calles tranquilas. El Riegrovy sady (parque de Vinohrady) con su jardín de cerveza es imprescindible.',
        },
      },
      {
        name: 'Pont Charles (Karlův most)',
        emoji: '🌉',
        petFriendly: true,
        desc: {
          fr: 'Le pont médiéval le plus célèbre d\'Europe est ouvert aux piétons et aux chiens. Bondé en journée, il retrouve son calme avant 7h du matin et après 21h — c\'est le moment idéal pour s\'y promener avec son animal.',
          en: 'Europe\'s most famous medieval bridge is open to pedestrians and dogs. Packed during the day, it recovers its calm before 7am and after 9pm — the ideal moment to walk across with your pet.',
          es: 'El puente medieval más famoso de Europa está abierto a peatones y perros. Muy concurrido durante el día, recupera su calma antes de las 7 h y después de las 21 h: el momento ideal para cruzarlo con tu mascota.',
        },
      },
      {
        name: 'Château de Prague (Hradčany)',
        emoji: '🏰',
        petFriendly: false,
        desc: {
          fr: 'Les jardins du Château (Královská zahrada) n\'admettent pas les chiens. En revanche, les Jardins Sud du Château (Jižní zahrady) sont accessibles aux animaux en laisse et offrent une vue magnifique sur la ville.',
          en: 'The Castle gardens (Královská zahrada) do not admit dogs. However, the South Gardens (Jižní zahrady) welcome dogs on leads and offer magnificent views over the city.',
          es: 'Los jardines del Castillo (Královská zahrada) no admiten perros. En cambio, los Jardines del Sur (Jižní zahrady) admiten perros con correa y ofrecen magníficas vistas sobre la ciudad.',
        },
      },
    ],
    petTips: {
      fr: [
        'Les chiens sont admis dans le métro praguois avec un billet réduit et doivent être muselés ou en sac. Dans les tramways et bus, les règles sont similaires.',
        'Les pubs (hospody) tchèques sont presque universellement dog-friendly — c\'est une tradition nationale. Il est rare d\'être refusé avec un chien bien tenu.',
        'La Vltava est froide toute l\'année. Des zones de baignade canine existent en été près de Císařský ostrov (Île de l\'Empereur) dans le nord de Prague.',
        'Prague est très touristique en été — les quartiers centraux (Malá Strana, Staré Město) sont bondés. Préférez les promenades matinales ou vespérales.',
        'De nombreux cafés proposent de l\'eau pour les chiens spontanément — la culture dog-friendly est bien intégrée à Prague.',
      ],
      en: [
        'Dogs are allowed on Prague Metro with a reduced ticket and must be muzzled or in a carrier. Similar rules apply on trams and buses.',
        'Czech pubs (hospody) are almost universally dog-friendly — it\'s a national tradition. Being refused entry with a well-behaved dog is rare.',
        'The Vltava is cold year-round. Dog swimming areas exist in summer near Císařský ostrov (Emperor\'s Island) in northern Prague.',
        'Prague is very touristy in summer — central areas (Malá Strana, Staré Město) get packed. Opt for early morning or evening walks.',
        'Many cafés spontaneously bring water for dogs — dog-friendly culture is well established in Prague.',
      ],
      es: [
        'Los perros están admitidos en el metro de Praga con billete reducido y deben llevar bozal o ir en transportín. Reglas similares en tranvías y autobuses.',
        'Los pubs (hospody) checos son casi universalmente dog-friendly: es una tradición nacional. Es raro que te rechacen con un perro bien educado.',
        'El Moldava es frío todo el año. Hay zonas de baño canino en verano cerca de Císařský ostrov (Isla del Emperador) al norte de Praga.',
        'Praga es muy turística en verano: las zonas centrales (Malá Strana, Staré Město) se llenan. Opta por paseos a primera hora o al anochecer.',
        'Muchos cafés traen agua para los perros espontáneamente: la cultura dog-friendly está bien integrada en Praga.',
      ],
    },
    practicalInfo: {
      fr: [
        'Vétérinaire d\'urgence 24h/24 : Veterinární klinika Hloubětín, Slévačská 905, Prague 9, +420 281 911 219',
        'Clinique centrale : Veterinární klinika Praha, Štefánikova 6, Prague 5, +420 257 320 191',
        'Trains depuis Paris (Railjet) : les animaux en cage voyagent avec billet enfant sur les lignes internationales.',
        'Aéroport Václav-Havel : animaux UE avec passeport valide admis sans quarantaine.',
      ],
      en: [
        '24/7 emergency vet: Veterinární klinika Hloubětín, Slévačská 905, Prague 9, +420 281 911 219',
        'Central clinic: Veterinární klinika Praha, Štefánikova 6, Prague 5, +420 257 320 191',
        'Trains from Paris (Railjet): animals in carriers travel with a child ticket on international routes.',
        'Václav Havel Airport: EU pets with valid passport admitted without quarantine.',
      ],
      es: [
        'Veterinario de urgencias 24h: Veterinární klinika Hloubětín, Slévačská 905, Praga 9, +420 281 911 219',
        'Clínica central: Veterinární klinika Praha, Štefánikova 6, Praga 5, +420 257 320 191',
        'Trenes desde París (Railjet): animales en transportín viajan con billete de niño en líneas internacionales.',
        'Aeropuerto Václav Havel: mascotas de la UE con pasaporte válido admitidas sin cuarentena.',
      ],
    },
  },

  edinburgh: {
    history: {
      fr: `Édimbourg est une ville qui respire l'histoire. Construite sur des roches volcaniques au sommet desquelles trône le château (XIe siècle), elle fut la capitale du Royaume d'Écosse et le lieu de naissance de la Renaissance écossaise. Sa vieille ville médiévale et son New Town géorgien du XVIIIe siècle sont inscrits ensemble au patrimoine mondial de l'UNESCO. Mais Édimbourg est aussi une ville profondément dog-friendly : les chiens sont admis dans la plupart des pubs, sur les collines d'Arthur's Seat, dans les jardins publics et dans une majorité de cafés. La tradition britannique du chien au pub est ici une réalité quotidienne — et l'Écosse est, avec l'Allemagne, le pays d'Europe le plus accueillant pour les animaux de compagnie.`,
      en: `Edinburgh is a city that breathes history. Built on volcanic rock crowned by its castle (11th century), it was the capital of the Kingdom of Scotland and the birthplace of the Scottish Enlightenment. Its medieval Old Town and 18th-century Georgian New Town are jointly inscribed as a UNESCO World Heritage Site. But Edinburgh is also a deeply dog-friendly city: dogs are allowed in most pubs, on the Arthur's Seat hills, in public gardens and in the majority of cafés. The British tradition of dogs in pubs is a daily reality here — and Scotland is, alongside Germany, the most pet-welcoming country in Europe.`,
      es: `Edimburgo es una ciudad que respira historia. Construida sobre roca volcánica coronada por su castillo (siglo XI), fue la capital del Reino de Escocia y la cuna de la Ilustración escocesa. Su casco antiguo medieval y su New Town georgiano del siglo XVIII están inscritos conjuntamente como Patrimonio de la Humanidad por la UNESCO. Pero Edimburgo también es una ciudad profundamente amigable con los perros: los perros están admitidos en la mayoría de los pubs, en las colinas de Arthur's Seat, en los jardines públicos y en la mayoría de los cafés. La tradición británica de los perros en el pub es aquí una realidad cotidiana, y Escocia es, junto con Alemania, el país más acogedor de Europa para las mascotas.`,
    },
    sights: [
      {
        name: 'Arthur\'s Seat',
        emoji: '⛰️',
        petFriendly: true,
        desc: {
          fr: 'Le volcan endormi au cœur d\'Édimbourg (251 m) est un terrain de jeu extraordinaire pour les chiens. Les sentiers sont ouverts et les chiens peuvent y aller sans laisse dans la plupart des zones. La vue sur la ville depuis le sommet est spectaculaire.',
          en: 'The dormant volcano at Edinburgh\'s heart (251 m) is an extraordinary playground for dogs. Trails are open and dogs can go off-leash in most areas. The view over the city from the summit is spectacular.',
          es: 'El volcán dormido en el corazón de Edimburgo (251 m) es un extraordinario terreno de juego para los perros. Los senderos son abiertos y los perros pueden ir sin correa en la mayoría de las zonas. La vista sobre la ciudad desde la cima es espectacular.',
        },
      },
      {
        name: 'Water of Leith',
        emoji: '🌊',
        petFriendly: true,
        desc: {
          fr: 'La rivière qui traverse Édimbourg est bordée d\'un chemin piétonnier de 12 km, du centre-ville jusqu\'à Leith. Les chiens peuvent y aller sans laisse dans la plupart des sections. Un itinéraire vert et paisible loin de l\'agitation touristique.',
          en: 'The river that crosses Edinburgh is lined with a 12 km footpath from the city centre to Leith. Dogs can go off-leash in most sections. A green, peaceful route away from tourist bustle.',
          es: 'El río que atraviesa Edimburgo está bordeado por un sendero peatonal de 12 km desde el centro de la ciudad hasta Leith. Los perros pueden ir sin correa en la mayoría de los tramos. Una ruta verde y tranquila alejada del ajetreo turístico.',
        },
      },
      {
        name: 'Royal Mile & Vieille Ville',
        emoji: '🏰',
        petFriendly: true,
        desc: {
          fr: 'La rue principale de la vieille ville médiévale est accessible aux chiens. La plupart des closes (ruelles) latérales sont parfaites pour explorer avec un animal. Le château d\'Édimbourg n\'admet pas les animaux à l\'intérieur.',
          en: 'The main street of the medieval Old Town is accessible to dogs. Most lateral closes (alleyways) are perfect for exploring with a pet. Edinburgh Castle does not admit animals inside.',
          es: 'La calle principal del casco antiguo medieval es accesible para los perros. La mayoría de los "closes" (callejones) laterales son perfectos para explorar con una mascota. El Castillo de Edimburgo no admite animales en su interior.',
        },
      },
      {
        name: 'Holyrood Park',
        emoji: '🌿',
        petFriendly: true,
        desc: {
          fr: 'Le parc royal qui entoure Arthur\'s Seat (263 ha) est entièrement accessible aux chiens. Les lochans (petits lacs), les falaises de Salisbury Crags et les vastes prairies en font l\'un des meilleurs parcs urbains d\'Europe.',
          en: 'The royal park surrounding Arthur\'s Seat (263 ha) is fully accessible to dogs. The lochans (small lakes), Salisbury Crags cliffs and wide meadows make it one of Europe\'s finest urban parks.',
          es: 'El parque real que rodea Arthur\'s Seat (263 ha) es totalmente accesible para los perros. Los lochans (pequeños lagos), los acantilados de Salisbury Crags y los amplios prados lo convierten en uno de los mejores parques urbanos de Europa.',
        },
      },
      {
        name: 'Stockbridge & Dean Village',
        emoji: '🏘️',
        petFriendly: true,
        desc: {
          fr: 'Stockbridge est le quartier le plus charmant et dog-friendly d\'Édimbourg. Marché du dimanche, pubs accueillants, bouchers et épiceries qui gardent un biscuit pour votre chien. Dean Village, en contrebas, est une merveille architecturale au bord de l\'eau.',
          en: 'Stockbridge is Edinburgh\'s most charming and dog-friendly neighbourhood. Sunday market, welcoming pubs, butchers and delis that keep a treat for your dog. Dean Village below is an architectural gem by the water.',
          es: 'Stockbridge es el barrio más encantador y amigable con los perros de Edimburgo. Mercado dominical, pubs acogedores, carnicerías y delicatessen que guardan una golosina para tu perro. Dean Village, más abajo, es una joya arquitectónica junto al agua.',
        },
      },
    ],
    petTips: {
      fr: [
        '⚠️ IMPORTANT : Le Royaume-Uni n\'accepte plus le passeport européen pour animaux post-Brexit. Un Certificat Sanitaire Animal (AHC) est obligatoire pour entrer en Grande-Bretagne. Prenez rendez-vous chez votre vétérinaire 10 jours avant le départ.',
        'Les chiens sont admis dans la quasi-totalité des pubs écossais — c\'est une tradition nationale. Cherchez le signe "Dogs Welcome" à l\'entrée.',
        'Le ferry Stena Line ou P&O depuis Calais/Dunkerque vers Douvres est la meilleure option pour voyager avec un grand chien depuis le continent.',
        'Édimbourg est souvent ventée et fraîche même en été — prévoyez une couverture ou un imperméable pour votre chien.',
        'Les Meadows (grand parc au sud du centre) disposent de zones off-leash populaires avec les locaux.',
      ],
      en: [
        '⚠️ IMPORTANT: The UK no longer accepts the EU pet passport post-Brexit. An Animal Health Certificate (AHC) is required to enter Great Britain. Book a vet appointment 10 days before departure.',
        'Dogs are welcome in virtually all Scottish pubs — it\'s a national tradition. Look for the "Dogs Welcome" sign at the entrance.',
        'The Stena Line or P&O ferry from Calais/Dunkirk to Dover is the best option for travelling with a large dog from the continent.',
        'Edinburgh is often windy and cool even in summer — pack a blanket or waterproof coat for your dog.',
        'The Meadows (large park south of the centre) has popular off-leash zones used by locals.',
      ],
      es: [
        '⚠️ IMPORTANTE: El Reino Unido ya no acepta el pasaporte europeo para mascotas tras el Brexit. Se requiere un Certificado Sanitario Animal (AHC) para entrar en Gran Bretaña. Solicita cita con tu veterinario 10 días antes de salir.',
        'Los perros son bienvenidos en prácticamente todos los pubs escoceses: es una tradición nacional. Busca el cartel "Dogs Welcome" a la entrada.',
        'El ferry de Stena Line o P&O desde Calais/Dunkerque a Dover es la mejor opción para viajar con un perro grande desde el continente.',
        'Edimburgo es a menudo ventosa y fresca incluso en verano: lleva una manta o impermeable para tu perro.',
        'The Meadows (gran parque al sur del centro) tiene populares zonas sin correa frecuentadas por los locales.',
      ],
    },
    practicalInfo: {
      fr: [
        'Vétérinaire d\'urgence 24h/24 : Dick Vet Emergency Service, Easter Bush, Roslin, Midlothian, +44 131 650 7650',
        'Clinique centrale : Vets4Pets Edinburgh, 12 Fountain Park, +44 131 443 7474',
        '⚠️ Passeport UE non valable au Royaume-Uni — Certificat Sanitaire Animal (AHC) requis, délivré par un vétérinaire accrédité.',
        'Ferry recommandé : DFDS Dover-Calais ou Stena Line Fishguard-Rosslare (Irlande) — les animaux sont admis à bord.',
      ],
      en: [
        '24/7 emergency vet: Dick Vet Emergency Service, Easter Bush, Roslin, Midlothian, +44 131 650 7650',
        'Central clinic: Vets4Pets Edinburgh, 12 Fountain Park, +44 131 443 7474',
        '⚠️ EU pet passport not valid in the UK — Animal Health Certificate (AHC) required, issued by an accredited vet.',
        'Recommended ferry: DFDS Dover-Calais or Stena Line Fishguard-Rosslare (Ireland) — animals admitted on board.',
      ],
      es: [
        'Veterinario de urgencias 24h: Dick Vet Emergency Service, Easter Bush, Roslin, Midlothian, +44 131 650 7650',
        'Clínica central: Vets4Pets Edinburgh, 12 Fountain Park, +44 131 443 7474',
        '⚠️ El pasaporte UE para mascotas no es válido en el Reino Unido — se requiere Certificado Sanitario Animal (AHC) expedido por un veterinario acreditado.',
        'Ferry recomendado: DFDS Dover-Calais o Stena Line Fishguard-Rosslare (Irlanda) — animales admitidos a bordo.',
      ],
    },
  },

  dublin: {
    history: {
      fr: `Dublin — Baile Átha Cliath en irlandais, "la ville du gué aux claies" — a été fondée par les Vikings au IXe siècle sur les rives de la Liffey. Capitale de l'Irlande depuis la domination normande du XIIe siècle, elle a été le centre administratif de la présence britannique en Irlande pendant sept siècles avant de devenir la capitale de l'État libre d'Irlande en 1922. Aujourd'hui, Dublin est une ville chaleureuse et vivante, connue pour ses pubs, sa culture littéraire (Joyce, Beckett, Wilde) et son accueil légendaire. Les chiens y sont les bienvenus dans les beer gardens, sur les sentiers côtiers et dans le Phoenix Park — l'un des plus grands parcs urbains d'Europe, avec 1 750 hectares à explorer.`,
      en: `Dublin — Baile Átha Cliath in Irish, "the town of the ford of the hurdles" — was founded by the Vikings in the 9th century on the banks of the Liffey. Capital of Ireland since the Norman conquest of the 12th century, it was the administrative centre of British presence in Ireland for seven centuries before becoming the capital of the Irish Free State in 1922. Today Dublin is a warm, vibrant city known for its pubs, literary culture (Joyce, Beckett, Wilde) and legendary hospitality. Dogs are welcome in beer gardens, on coastal walks and in Phoenix Park — one of Europe's largest urban parks at 1,750 hectares.`,
      es: `Dublín — Baile Átha Cliath en irlandés, "la ciudad del vado de los zarzos" — fue fundada por los vikingos en el siglo IX a orillas del Liffey. Capital de Irlanda desde la conquista normanda del siglo XII, fue el centro administrativo de la presencia británica en Irlanda durante siete siglos antes de convertirse en la capital del Estado Libre Irlandés en 1922. Hoy Dublín es una ciudad cálida y animada, conocida por sus pubs, su cultura literaria (Joyce, Beckett, Wilde) y su legendaria hospitalidad. Los perros son bienvenidos en los beer gardens, en los paseos costeros y en el Phoenix Park: uno de los mayores parques urbanos de Europa, con 1.750 hectáreas por explorar.`,
    },
    sights: [
      {
        name: 'Phoenix Park',
        emoji: '🌳',
        petFriendly: true,
        desc: {
          fr: 'Avec 1 750 hectares, Phoenix Park est l\'un des plus grands parcs urbains enclos au monde. Les chiens peuvent y courir librement dans la plupart des zones. Le parc abrite des cerfs en liberté — gardez votre chien en laisse si vous en approchez.',
          en: 'At 1,750 hectares, Phoenix Park is one of the world\'s largest enclosed urban parks. Dogs can run freely in most areas. The park is home to free-roaming deer — keep your dog on a lead if you approach them.',
          es: 'Con 1.750 hectáreas, Phoenix Park es uno de los mayores parques urbanos cerrados del mundo. Los perros pueden correr libremente en la mayoría de las zonas. El parque alberga ciervos en libertad: mantén a tu perro con correa si te acercas a ellos.',
        },
      },
      {
        name: 'Dodder River Walk',
        emoji: '🌊',
        petFriendly: true,
        desc: {
          fr: 'Le chemin longeant la rivière Dodder depuis Rathfarnham jusqu\'au port de Ringsend est l\'une des promenades les plus appréciées des Dublinois avec leurs chiens. Verdoyant, varié et accessible toute l\'année.',
          en: 'The path along the Dodder river from Rathfarnham to Ringsend harbour is one of the most beloved walks for Dubliners and their dogs. Green, varied and accessible year-round.',
          es: 'El camino a lo largo del río Dodder desde Rathfarnham hasta el puerto de Ringsend es uno de los paseos más queridos por los dublineses y sus perros. Verde, variado y accesible todo el año.',
        },
      },
      {
        name: 'Sandymount Strand',
        emoji: '🏖️',
        petFriendly: true,
        desc: {
          fr: 'La plage de Sandymount, à 3 km du centre de Dublin, est accessible aux chiens toute l\'année (en laisse pendant la saison balnéaire). À marée basse, les vastes étendues de sable sont parfaites pour une longue promenade canine.',
          en: 'Sandymount Strand, 3 km from Dublin city centre, is accessible to dogs year-round (on lead during bathing season). At low tide, the vast sandy expanses are perfect for a long dog walk.',
          es: 'La playa de Sandymount, a 3 km del centro de Dublín, es accesible para los perros durante todo el año (con correa en temporada de baño). Con marea baja, las vastas extensiones de arena son perfectas para un largo paseo canino.',
        },
      },
      {
        name: 'Ranelagh & Portobello',
        emoji: '🏘️',
        petFriendly: true,
        desc: {
          fr: 'Ranelagh et Portobello sont les quartiers les plus dog-friendly de Dublin. Pubs avec beer gardens, cafés branchés et le Grand Canal longeant Portobello — idéal pour une promenade en fin d\'après-midi.',
          en: 'Ranelagh and Portobello are Dublin\'s most dog-friendly neighbourhoods. Pubs with beer gardens, trendy cafés and the Grand Canal running alongside Portobello — ideal for a late-afternoon walk.',
          es: 'Ranelagh y Portobello son los barrios más amigables con los perros de Dublín. Pubs con beer gardens, cafés de moda y el Grand Canal junto a Portobello: ideal para un paseo al final de la tarde.',
        },
      },
      {
        name: 'Wicklow Mountains (excursion)',
        emoji: '⛰️',
        petFriendly: true,
        desc: {
          fr: 'À 40 minutes au sud de Dublin en voiture, les montagnes de Wicklow offrent des randonnées dog-friendly spectaculaires. Glendalough (deux lacs glaciaires) est le site le plus populaire — les chiens y sont admis sur les sentiers.',
          en: 'A 40-minute drive south of Dublin, the Wicklow Mountains offer spectacular dog-friendly hiking. Glendalough (two glacial lakes) is the most popular site — dogs are allowed on the trails.',
          es: 'A 40 minutos al sur de Dublín en coche, las montañas de Wicklow ofrecen senderismo espectacular apto para perros. Glendalough (dos lagos glaciares) es el lugar más popular: los perros están admitidos en los senderos.',
        },
      },
    ],
    petTips: {
      fr: [
        '⚠️ IMPORTANT : L\'Irlande exige un traitement antiparasite (tapeworm) pour les chiens 24 à 120 heures avant l\'arrivée, et l\'entrée doit se faire par un port ou aéroport approuvé. Consultez votre vétérinaire.',
        'Les chiens ne sont pas admis dans les bus et DART (train de banlieue) dublinois sauf s\'ils sont dans un sac. Les taxis sont en général dog-friendly — confirmez à la réservation.',
        'Les beer gardens des pubs irlandais sont presque universellement dog-friendly. La culture du pub avec chien est bien ancrée à Dublin.',
        'L\'eau est un sujet en Irlande — il pleut souvent. Emportez une serviette pour sécher votre chien avant d\'entrer dans un café ou hôtel.',
        'Le marché de Temple Bar le samedi est ouvert aux chiens et offre une belle animation au cœur de Dublin.',
      ],
      en: [
        '⚠️ IMPORTANT: Ireland requires a tapeworm treatment for dogs 24–120 hours before arrival, and entry must be via an approved port or airport. Consult your vet in advance.',
        'Dogs are not admitted on Dublin buses or DART (suburban train) unless in a carrier. Taxis are generally dog-friendly — confirm when booking.',
        'Irish pub beer gardens are almost universally dog-friendly. The pub-with-dog culture is well established in Dublin.',
        'Water — and rain — is a constant in Ireland. Pack a towel to dry your dog before entering a café or hotel.',
        'Temple Bar market on Saturdays is open to dogs and offers a lively atmosphere in the heart of Dublin.',
      ],
      es: [
        '⚠️ IMPORTANTE: Irlanda exige un tratamiento antiparasitario (tenias) para los perros entre 24 y 120 horas antes de la llegada, y la entrada debe realizarse por un puerto o aeropuerto aprobado. Consulta a tu veterinario.',
        'Los perros no están admitidos en los autobuses ni en el DART (tren de cercanías) de Dublín, salvo en transportín. Los taxis suelen ser dog-friendly: confírmalo al reservar.',
        'Los beer gardens de los pubs irlandeses son casi universalmente dog-friendly. La cultura del pub con perro está muy arraigada en Dublín.',
        'El agua —y la lluvia— es constante en Irlanda. Lleva una toalla para secar a tu perro antes de entrar en un café u hotel.',
        'El mercado de Temple Bar los sábados admite perros y ofrece un ambiente animado en el corazón de Dublín.',
      ],
    },
    practicalInfo: {
      fr: [
        'Vétérinaire d\'urgence 24h/24 : UCD Veterinary Hospital, Belfield, Dublin 4, +353 1 716 6100',
        'Clinique centrale : Clontarf Veterinary Hospital, 193 Clontarf Road, +353 1 833 3284',
        '⚠️ Traitement tapeworm obligatoire 24-120h avant l\'entrée en Irlande — à faire chez un vétérinaire accrédité.',
        'Ferry recommandé : Irish Ferries Rosslare-Cherbourg ou Brittany Ferries Cork-Roscoff — chiens admis à bord dans les cabines ou chenils.',
      ],
      en: [
        '24/7 emergency vet: UCD Veterinary Hospital, Belfield, Dublin 4, +353 1 716 6100',
        'Central clinic: Clontarf Veterinary Hospital, 193 Clontarf Road, +353 1 833 3284',
        '⚠️ Tapeworm treatment required 24-120h before entering Ireland — carried out by an accredited vet.',
        'Recommended ferry: Irish Ferries Rosslare-Cherbourg or Brittany Ferries Cork-Roscoff — dogs admitted on board in cabins or kennels.',
      ],
      es: [
        'Veterinario de urgencias 24h: UCD Veterinary Hospital, Belfield, Dublín 4, +353 1 716 6100',
        'Clínica central: Clontarf Veterinary Hospital, 193 Clontarf Road, +353 1 833 3284',
        '⚠️ Tratamiento contra tenias obligatorio 24-120h antes de entrar en Irlanda: debe realizarlo un veterinario acreditado.',
        'Ferry recomendado: Irish Ferries Rosslare-Cherburgo o Brittany Ferries Cork-Roscoff — perros admitidos a bordo en cabinas o perreras.',
      ],
    },
  },

  florence: {
    history: {
      fr: `Florence est le berceau de la Renaissance. C'est ici, entre le XIVe et le XVIe siècle, que les Médicis ont financé Botticelli, Léonard de Vinci, Michel-Ange et Brunelleschi — transformant une cité marchande prospère en centre mondial de la culture et des arts. La Florence d'aujourd'hui est une ville à taille humaine (370 000 habitants) qui préserve avec soin ce patrimoine exceptionnel : 70% du patrimoine mondial de l'art selon une estimation célèbre est concentré en Italie, dont une part considérable à Florence. Mais Florence est aussi une ville vivante, avec ses marchés, ses cafés en terrasse le long de l'Arno et une culture canine très développée — les chiens accompagnent leurs maîtres dans les marchés couverts, les bars à vin et les jardins historiques.`,
      en: `Florence is the cradle of the Renaissance. It was here, between the 14th and 16th centuries, that the Medicis funded Botticelli, Leonardo da Vinci, Michelangelo and Brunelleschi — transforming a prosperous merchant city into the world's cultural and artistic centre. Today's Florence is a human-scaled city (370,000 inhabitants) that carefully preserves this exceptional heritage: an estimated 70% of the world's art heritage is concentrated in Italy, a considerable share of it in Florence. But Florence is also a living city, with its markets, terrace cafés along the Arno and a very developed canine culture — dogs accompany their owners in covered markets, wine bars and historic gardens.`,
      es: `Florencia es la cuna del Renacimiento. Fue aquí, entre los siglos XIV y XVI, donde los Médici financiaron a Botticelli, Leonardo da Vinci, Miguel Ángel y Brunelleschi, transformando una próspera ciudad mercantil en el centro mundial de la cultura y las artes. La Florencia de hoy es una ciudad a escala humana (370.000 habitantes) que cuida con esmero ese patrimonio excepcional: según una célebre estimación, el 70% del patrimonio artístico mundial está concentrado en Italia, y una parte considerable de él en Florencia. Pero Florencia también es una ciudad viva, con sus mercados, sus terrazas de café a orillas del Arno y una cultura canina muy desarrollada: los perros acompañan a sus dueños en los mercados cubiertos, los bares de vinos y los jardines históricos.`,
    },
    sights: [
      {
        name: 'Jardins de Boboli',
        emoji: '🌿',
        petFriendly: true,
        desc: {
          fr: 'Le jardin à l\'italienne derrière le Palazzo Pitti (45 000 m²) est accessible aux chiens en laisse. Terrasses, grottes, statues et vue panoramique sur Florence depuis le belvédère. Les chiens sont admis moyennant droit d\'entrée.',
          en: 'The Italian garden behind the Palazzo Pitti (45,000 m²) is accessible to dogs on leads. Terraces, grottos, statues and panoramic views over Florence from the belvedere. Dogs admitted with entry fee.',
          es: 'El jardín italiano detrás del Palazzo Pitti (45.000 m²) es accesible para perros con correa. Terrazas, grutas, estatuas y vistas panorámicas sobre Florencia desde el mirador. Los perros están admitidos previo pago de entrada.',
        },
      },
      {
        name: 'Parco delle Cascine',
        emoji: '🌳',
        petFriendly: true,
        desc: {
          fr: 'Le grand parc linéaire de Florence (160 ha) le long de l\'Arno est le terrain de jeu préféré des Florentins et de leurs chiens. Zones off-leash dans plusieurs sections, pistes cyclables et courts de tennis. Le marché du mardi y est animé.',
          en: 'Florence\'s large linear park (160 ha) along the Arno is the favourite playground of Florentines and their dogs. Off-leash areas in several sections, cycle paths and tennis courts. The Tuesday market here is lively.',
          es: 'El gran parque lineal de Florencia (160 ha) a lo largo del Arno es el terreno de juego favorito de los florentinos y sus perros. Zonas sin correa en varias secciones, carriles bici y pistas de tenis. El mercado del martes aquí es muy animado.',
        },
      },
      {
        name: 'Oltrarno & Santo Spirito',
        emoji: '🏘️',
        petFriendly: true,
        desc: {
          fr: 'Le quartier de l\'autre côté de l\'Arno (Oltrarno) est le plus authentique et dog-friendly de Florence. La Piazza Santo Spirito est une place vivante avec terrasses et bars à vin où les chiens sont bienvenus. San Frediano est le quartier préféré des artisans et des chiens.',
          en: 'The neighbourhood on the other side of the Arno (Oltrarno) is Florence\'s most authentic and dog-friendly. Piazza Santo Spirito is a lively square with terraces and wine bars where dogs are welcome. San Frediano is the favourite neighbourhood of artisans and dogs alike.',
          es: 'El barrio al otro lado del Arno (Oltrarno) es el más auténtico y amigable con los perros de Florencia. La Piazza Santo Spirito es una animada plaza con terrazas y bares de vinos donde los perros son bienvenidos. San Frediano es el barrio favorito de artesanos y perros.',
        },
      },
      {
        name: 'Lungarni (quais de l\'Arno)',
        emoji: '🌊',
        petFriendly: true,
        desc: {
          fr: 'Les quais de l\'Arno qui traversent Florence sont la promenade vespérale par excellence. Lumière dorée sur le Ponte Vecchio, terrasses animées et chiens en laisse partout. La passeggiata florentine se fait ici chaque soir.',
          en: 'The Arno quaysides through Florence are the quintessential evening walk. Golden light on the Ponte Vecchio, lively terraces and dogs on leads everywhere. Florence\'s passeggiata happens here every evening.',
          es: 'Los paseos junto al Arno a través de Florencia son el paseo vespertino por excelencia. Luz dorada sobre el Ponte Vecchio, terrazas animadas y perros con correa por todas partes. La passeggiata florentina tiene lugar aquí cada tarde.',
        },
      },
      {
        name: 'Offices & Académie',
        emoji: '🏛️',
        petFriendly: false,
        desc: {
          fr: 'Les Offices et le musée de l\'Académie (David de Michel-Ange) n\'admettent pas les animaux. Profitez-en pour confier votre chien à l\'hôtel ou à un service de garde — les visites sont longues et les files d\'attente importantes.',
          en: 'The Uffizi and Accademia (Michelangelo\'s David) do not admit animals. Use this time to leave your dog at the hotel or with a pet-sitting service — queues are long and visits are lengthy.',
          es: 'Los Uffizi y la Accademia (el David de Miguel Ángel) no admiten animales. Aprovecha para dejar a tu perro en el hotel o con un servicio de cuidado: las colas son largas y las visitas extensas.',
        },
      },
    ],
    petTips: {
      fr: [
        'Les chiens sont admis dans les bus florentins avec un billet réduit et doivent être en sac ou muselés. Pour les courtes distances dans le centre, marchez — Florence est très compacte.',
        'La plupart des marchés couverts (Mercato Centrale, Sant\'Ambrogio) acceptent les chiens en laisse — une véritable expérience locale.',
        'En été, Florence est l\'une des villes les plus chaudes d\'Italie (jusqu\'à 38°C). Le Parco delle Cascine et les quais de l\'Arno offrent de l\'ombre — évitez les promenades entre 12h et 17h.',
        'Le Mercato delle Pulci (marché aux puces) du Piazzale degli Uffizi est dog-friendly et fascinant pour une balade le dimanche matin.',
        'De nombreux restaurants proposent de l\'eau pour les chiens à Florence — c\'est dans la tradition toscane d\'hospitalité.',
      ],
      en: [
        'Dogs are admitted on Florence buses with a reduced ticket and must be in a carrier or muzzled. For short distances in the centre, walk — Florence is very compact.',
        'Most covered markets (Mercato Centrale, Sant\'Ambrogio) welcome dogs on leads — a genuine local experience.',
        'In summer, Florence is one of Italy\'s hottest cities (up to 38°C). The Parco delle Cascine and Arno quaysides offer shade — avoid walks between noon and 5pm.',
        'The Mercato delle Pulci (flea market) at Piazzale degli Uffizi is dog-friendly and fascinating for a Sunday morning stroll.',
        'Many Florence restaurants spontaneously bring water for dogs — it\'s part of the Tuscan tradition of hospitality.',
      ],
      es: [
        'Los perros están admitidos en los autobuses de Florencia con billete reducido y deben ir en transportín o con bozal. Para distancias cortas en el centro, camina: Florencia es muy compacta.',
        'La mayoría de los mercados cubiertos (Mercato Centrale, Sant\'Ambrogio) admiten perros con correa: una experiencia local genuina.',
        'En verano, Florencia es una de las ciudades más calurosas de Italia (hasta 38°C). El Parco delle Cascine y los paseos junto al Arno ofrecen sombra: evita los paseos entre las 12 y las 17 h.',
        'El Mercato delle Pulci (mercado de antigüedades) en Piazzale degli Uffizi es dog-friendly y fascinante para un paseo el domingo por la mañana.',
        'Muchos restaurantes de Florencia traen agua espontáneamente para los perros: es parte de la tradición toscana de hospitalidad.',
      ],
    },
    practicalInfo: {
      fr: [
        'Vétérinaire d\'urgence 24h/24 : Clinica Veterinaria Firenze Sud, Via Senese 251, +39 055 204 9818',
        'Clinique centrale : Clinica Veterinaria Scandicci, Via Strozzi 9, Scandicci, +39 055 756 4800',
        'Trains depuis Paris (Trenitalia Frecciarossa) : les animaux en cage voyagent avec billet enfant. Les grands chiens nécessitent un billet demi-tarif.',
        'Aéroport de Florence Peretola : animaux UE avec passeport valide admis sans quarantaine.',
      ],
      en: [
        '24/7 emergency vet: Clinica Veterinaria Firenze Sud, Via Senese 251, +39 055 204 9818',
        'Central clinic: Clinica Veterinaria Scandicci, Via Strozzi 9, Scandicci, +39 055 756 4800',
        'Trains from Paris (Trenitalia Frecciarossa): animals in carriers travel with a child ticket. Large dogs need a half-price ticket.',
        'Florence Peretola Airport: EU pets with valid passport admitted without quarantine.',
      ],
      es: [
        'Veterinario de urgencias 24h: Clinica Veterinaria Firenze Sud, Via Senese 251, +39 055 204 9818',
        'Clínica central: Clinica Veterinaria Scandicci, Via Strozzi 9, Scandicci, +39 055 756 4800',
        'Trenes desde París (Trenitalia Frecciarossa): animales en transportín viajan con billete de niño. Los perros grandes necesitan billete a mitad de precio.',
        'Aeropuerto de Florencia Peretola: mascotas de la UE con pasaporte válido admitidas sin cuarentena.',
      ],
    },
  },

  amsterdam: {
    history: {
      fr: `Fondée au XIIIe siècle autour d'un barrage sur la rivière Amstel — d'où son nom — Amsterdam est devenue au XVIIe siècle la capitale commerciale du monde. La Compagnie néerlandaise des Indes orientales (VOC), première multinationale de l'histoire, y avait son siège. Cette prospérité a financé les 165 canaux, les 1 500 ponts et les étroites maisons à pignons qui composent aujourd'hui le cœur historique, classé au patrimoine mondial de l'UNESCO depuis 2010. La ville a toujours cultivé une culture de tolérance et d'ouverture — et cela vaut aussi pour les chiens, bienvenus dans les cafés, les terrasses et même les transports en commun.`,
      en: `Founded in the 13th century around a dam on the Amstel river — hence its name — Amsterdam became the commercial capital of the world during the Dutch Golden Age. The VOC (Dutch East India Company), history's first multinational, was headquartered here. That prosperity funded the 165 canals, 1,500 bridges and narrow gabled houses that make up the UNESCO-listed historic centre. The city has always cultivated a culture of tolerance and openness — and that extends to dogs, who are welcome in cafés, terraces and even on public transport.`,
      es: `Fundada en el siglo XIII alrededor de una presa sobre el río Amstel (de ahí su nombre), Ámsterdam se convirtió en la capital comercial del mundo durante el Siglo de Oro holandés. La VOC (Compañía Holandesa de las Indias Orientales), la primera multinacional de la historia, tenía aquí su sede. Esa prosperidad financió los 165 canales, los 1.500 puentes y las estrechas casas con frontones que conforman el centro histórico, declarado Patrimonio de la Humanidad por la UNESCO en 2010. La ciudad siempre ha cultivado una cultura de tolerancia y apertura, y eso incluye a los perros, bienvenidos en cafés, terrazas e incluso en el transporte público.`,
    },
    sights: [
      {
        name: 'Vondelpark',
        emoji: '🌳',
        petFriendly: true,
        desc: {
          fr: 'Le plus grand parc de la ville (47 ha) est le terrain de jeu préféré des Amstelodamois et de leurs chiens. Plusieurs zones sont officiellement autorisées pour les chiens sans laisse. Idéal le matin avant de visiter le Rijksmuseum voisin.',
          en: 'The city\'s largest park (47 ha) is the favourite playground of Amsterdammers and their dogs. Several areas are officially off-leash zones. Ideal in the morning before visiting the nearby Rijksmuseum.',
          es: 'El parque más grande de la ciudad (47 ha) es el lugar de juego favorito de los amsterdameses y sus perros. Varias zonas son oficialmente zonas sin correa. Ideal por la mañana antes de visitar el cercano Rijksmuseum.',
        },
      },
      {
        name: 'Jordaan',
        emoji: '🏘️',
        petFriendly: true,
        desc: {
          fr: 'L\'ancien quartier ouvrier devenu le plus chic d\'Amsterdam est idéal pour flâner avec un chien. Les rues pavées, les petits canaux et les terrasses de cafés — souvent dog-friendly — en font une balade incontournable. Ne manquez pas le marché du Noordermarkt le samedi.',
          en: 'The former working-class neighbourhood that became Amsterdam\'s most chic district is ideal for strolling with a dog. Cobbled streets, small canals and café terraces — often dog-friendly — make it an unmissable walk. Don\'t miss the Noordermarkt on Saturdays.',
          es: 'El antiguo barrio obrero que se convirtió en el más elegante de Ámsterdam es ideal para pasear con un perro. Calles adoquinadas, pequeños canales y terrazas de cafés (a menudo pet-friendly) lo convierten en un paseo imprescindible. No te pierdas el mercado Noordermarkt los sábados.',
        },
      },
      {
        name: 'Amsterdamse Bos',
        emoji: '🌲',
        petFriendly: true,
        desc: {
          fr: 'Le "Bois d\'Amsterdam" est trois fois plus grand que le Vondelpark et offre des kilomètres de sentiers en forêt, des lacs pour la baignade canine et des prairies. Les chiens peuvent y courir librement dans la plupart des zones. À 20 minutes du centre en vélo.',
          en: 'The "Amsterdam Forest" is three times the size of Vondelpark and offers kilometres of forest trails, lakes for dog swimming and open meadows. Dogs can run freely in most areas. A 20-minute cycle from the centre.',
          es: 'El "Bosque de Ámsterdam" es tres veces más grande que el Vondelpark y ofrece kilómetros de senderos forestales, lagos para que los perros naden y praderas abiertas. Los perros pueden correr libremente en la mayoría de las zonas. A 20 minutos en bicicleta del centro.',
        },
      },
      {
        name: 'Rijksmuseum',
        emoji: '🏛️',
        petFriendly: false,
        desc: {
          fr: 'Le musée national néerlandais abrite les chefs-d\'œuvre de Rembrandt et Vermeer. Les chiens ne sont pas admis à l\'intérieur, mais la cour du musée (Museumplein) et les jardins sont accessibles. Consigne à bagages disponible pour laisser votre laisse et sac à dos.',
          en: 'The Dutch national museum houses masterpieces by Rembrandt and Vermeer. Dogs are not admitted inside, but the museum courtyard (Museumplein) and gardens are accessible. Bag storage available to leave your lead and backpack.',
          es: 'El museo nacional neerlandés alberga obras maestras de Rembrandt y Vermeer. No se admiten perros en el interior, pero el patio del museo (Museumplein) y los jardines son accesibles. Hay consigna disponible para dejar la correa y la mochila.',
        },
      },
      {
        name: 'Quartier des canaux (Grachtengordel)',
        emoji: '⛵',
        petFriendly: true,
        desc: {
          fr: 'La ceinture de canaux du XVIIe siècle est la colonne vertébrale d\'Amsterdam. Les quais le long de l\'Herengracht, du Keizersgracht et du Prinsengracht sont parfaits pour une promenade avec un chien. Attention aux péniches : la plupart des boat tours ne prennent pas les animaux.',
          en: 'The 17th-century canal belt is the backbone of Amsterdam. The quaysides along the Herengracht, Keizersgracht and Prinsengracht are perfect for a dog walk. Note: most canal boat tours do not accept pets.',
          es: 'El cinturón de canales del siglo XVII es la columna vertebral de Ámsterdam. Los muelles a lo largo del Herengracht, Keizersgracht y Prinsengracht son perfectos para pasear con un perro. Atención: la mayoría de los tours en barco por los canales no admiten mascotas.',
        },
      },
      {
        name: 'Marché Albert Cuyp',
        emoji: '🛒',
        petFriendly: true,
        desc: {
          fr: 'Le plus grand marché en plein air d\'Amsterdam (Pijp) est animé, coloré et très tolérant envers les chiens tenus en laisse. Stroopwafels, hareng frais et fleurs coupées — un concentré de vie néerlandaise. Ouvert du lundi au samedi.',
          en: 'Amsterdam\'s largest open-air market (Pijp) is lively, colourful and very tolerant of dogs on leads. Stroopwafels, fresh herring and cut flowers — a concentrated dose of Dutch life. Open Monday to Saturday.',
          es: 'El mercado al aire libre más grande de Ámsterdam (Pijp) es animado, colorido y muy tolerante con los perros con correa. Stroopwafels, arenque fresco y flores cortadas: una dosis concentrada de vida holandesa. Abierto de lunes a sábado.',
        },
      },
    ],
    petTips: {
      fr: [
        'Les chiens voyagent gratuitement dans le métro, le tram et le bus amsterdamois à condition d\'être dans un sac ou tenus en laisse et muselés. Sinon, un ticket "dog ticket" est requis (tarif enfant).',
        'La plupart des terrasses de cafés acceptent les chiens. Il suffit de demander ; le refus est rare dans le centre.',
        'L\'eau des canaux est techniquement navigable mais contient des bactéries : évitez que votre chien la boive ou s\'y baigne.',
        'Les vélos sont rois : restez vigilant et tenez votre chien en laisse courte dans les rues animées.',
        'Plusieurs parcs ont des robinets d\'eau potable pour les chiens, notamment le Vondelpark.',
      ],
      en: [
        'Dogs travel free on Amsterdam metro, tram and bus if carried in a bag or kept on a lead and muzzled. Otherwise a "dog ticket" (child fare) is required.',
        'Most café terraces accept dogs. Just ask; refusal is rare in the city centre.',
        'Canal water is technically navigable but contains bacteria: prevent your dog from drinking it or swimming in it.',
        'Bikes rule the road: stay alert and keep your dog on a short lead on busy streets.',
        'Several parks have drinking water taps for dogs, including the Vondelpark.',
      ],
      es: [
        'Los perros viajan gratis en metro, tranvía y autobús de Ámsterdam si van en bolsa o con correa y bozal. De lo contrario, se necesita un "billete de perro" (tarifa infantil).',
        'La mayoría de las terrazas de cafés aceptan perros. Solo hay que preguntar; el rechazo es raro en el centro.',
        'El agua de los canales es técnicamente navegable pero contiene bacterias: evita que tu perro la beba o nade en ella.',
        'Las bicicletas tienen prioridad: mantente alerta y lleva a tu perro con correa corta en las calles concurridas.',
        'Varios parques tienen grifos de agua potable para perros, incluido el Vondelpark.',
      ],
    },
    practicalInfo: {
      fr: [
        'Vétérinaire de garde 24h/24 : Dierenkliniek Boerhaave, +31 20 662 60 03',
        'Pharmacie vétérinaire : disponible chez la plupart des vétérinaires du centre',
        'Trains depuis Paris (Thalys/Eurostar) : les chiens en sac ou cage sont acceptés gratuitement, les grands chiens sur certains trains avec billet',
        'Aéroport Schiphol : pas de quarantaine pour les animaux de l\'UE munis d\'un passeport valide',
      ],
      en: [
        '24/7 emergency vet: Dierenkliniek Boerhaave, +31 20 662 60 03',
        'Veterinary pharmacy: available at most city-centre vets',
        'Trains from London (Eurostar): pets in bags or carriers accepted free; large dogs on select services with a ticket',
        'Schiphol airport: no quarantine for EU pets with a valid passport',
      ],
      es: [
        'Veterinario de guardia 24h: Dierenkliniek Boerhaave, +31 20 662 60 03',
        'Farmacia veterinaria: disponible en la mayoría de veterinarios del centro',
        'Trenes desde Madrid/Barcelona: consultar con el transportista según el tamaño de la mascota',
        'Aeropuerto de Schiphol: sin cuarentena para mascotas de la UE con pasaporte válido',
      ],
    },
  },

  venice: {
    history: {
      en: 'Built on 118 islands connected by 400 bridges, Venice has been home to dogs for as long as it has to people. The city\'s narrow calli and open campi create a surprisingly walkable — if car-free — environment for pets. Vaporetto rules are strict (pets in carriers only on most lines), but the islands of the Giudecca and Sant\'Erasmo offer space away from the tourist rush. Venice sees around 30 million visitors a year, making timing and neighbourhood choice critical for a stress-free dog trip.',
      fr: 'Construite sur 118 îles reliées par 400 ponts, Venise accueille des chiens depuis aussi longtemps qu\'elle accueille des habitants. Les calli étroites et les campi ouverts forment un environnement étonnamment praticable — sans voitures — pour les animaux. Les règles du vaporetto sont strictes (animaux en transport uniquement sur la plupart des lignes), mais les îles de la Giudecca et de Sant\'Erasmo offrent de l\'espace loin de l\'agitation touristique. Venise reçoit environ 30 millions de visiteurs par an : le choix du quartier et du moment est essentiel.',
      es: 'Construida sobre 118 islas unidas por 400 puentes, Venecia ha acogido perros desde siempre. Las estrechas calli y las campi abiertas crean un entorno sorprendentemente transitable — sin coches — para las mascotas. Las normas del vaporetto son estrictas (animales en transportín en la mayoría de líneas), pero las islas de la Giudecca y Sant\'Erasmo ofrecen espacio lejos del turismo masivo. Con unos 30 millones de visitantes al año, elegir bien el barrio y el momento es fundamental.',
    },
    sights: [
      {
        name: 'Giardini della Biennale',
        emoji: '🌿',
        petFriendly: true,
        desc: {
          en: 'The gardens of the Venice Biennale are among the few real green spaces on the main island. Outside exhibition season they\'re quiet, leafy and perfectly suited for an off-the-beaten-track walk with your dog.',
          fr: 'Les jardins de la Biennale font partie des rares espaces verts véritables de l\'île principale. Hors saison d\'exposition, ils sont calmes, ombragés et parfaits pour une promenade tranquille avec votre chien.',
          es: 'Los jardines de la Bienal son de los pocos espacios verdes reales de la isla principal. Fuera de temporada de exposición, son tranquilos, arbolados y perfectos para un paseo apartado del turismo.',
        },
      },
      {
        name: 'Isola di Sant\'Erasmo',
        emoji: '🏝️',
        petFriendly: true,
        desc: {
          en: 'The "garden of Venice" — a lagoon island of market gardens, quiet lanes and open fields. Take the vaporetto with your dog in a carrier and enjoy a near-deserted half-day of countryside wandering.',
          fr: 'Le "jardin de Venise" — une île de la lagune avec des maraîchers, des ruelles tranquilles et des champs ouverts. Prenez le vaporetto avec votre chien en transport et profitez d\'une demi-journée de campagne presque déserte.',
          es: 'El "jardín de Venecia" — una isla de la laguna con huertos, callejuelas tranquilas y campos abiertos. Tome el vaporetto con su perro en transportín y disfrute de medio día de campo casi desierto.',
        },
      },
      {
        name: 'Fondamenta delle Zattere',
        emoji: '🚶',
        petFriendly: true,
        desc: {
          en: 'The long sun-drenched promenade facing the Giudecca canal is one of Venice\'s most dog-friendly stretches. Wide, relatively uncrowded in the morning, and lined with cafés that welcome dogs on their terraces.',
          fr: 'La longue promenade ensoleillée face au canal de la Giudecca est l\'un des parcours les plus accueillants pour les chiens à Venise. Large, relativement peu fréquentée le matin, bordée de cafés qui accueillent les chiens en terrasse.',
          es: 'El largo paseo soleado frente al canal de la Giudecca es uno de los tramos más amigables para perros en Venecia. Amplio, relativamente tranquilo por la mañana y bordeado de cafés que admiten perros en terraza.',
        },
      },
      {
        name: 'Campo Santa Margherita',
        emoji: '☕',
        petFriendly: true,
        desc: {
          en: 'The liveliest square in Dorsoduro, beloved by students and locals alike. Dogs are a fixture here — you\'ll find water bowls outside several bars and a relaxed atmosphere far from the cruise-ship crowds.',
          fr: 'La place la plus animée du Dorsoduro, adorée des étudiants et des habitants. Les chiens y sont chez eux — vous trouverez des gamelles d\'eau devant plusieurs bars et une atmosphère décontractée, loin des groupes de touristes.',
          es: 'La plaza más animada de Dorsoduro, querida por estudiantes y locales. Los perros son habituales aquí — encontrará cuencos de agua frente a varios bares y un ambiente relajado, lejos de las multitudes.',
        },
      },
      {
        name: 'Basilica di San Marco',
        emoji: '⛪',
        petFriendly: false,
        desc: {
          en: 'Pets are not allowed inside St Mark\'s Basilica or the Doge\'s Palace. The square itself is accessible but extremely crowded — avoid bringing a nervous dog during high season.',
          fr: 'Les animaux ne sont pas admis dans la Basilique Saint-Marc ni dans le Palais des Doges. La place est accessible mais extrêmement fréquentée — évitez d\'y amener un chien anxieux en haute saison.',
          es: 'No se admiten mascotas en la Basílica de San Marcos ni en el Palacio Ducal. La plaza es accesible pero extremadamente concurrida — evite llevar un perro nervioso en temporada alta.',
        },
      },
    ],
    petTips: {
      en: [
        'Vaporetto rules: dogs must be in a carrier on most ACTV lines. Line 1 (Grand Canal) is often crowded — go early or take line 2 for shorter crossings.',
        'The streets of Venice are entirely car-free, but they are also narrow and cobbled. Small dogs can be carried; larger breeds may struggle with heavy tourist foot traffic at peak hours.',
        'Always carry a portable water bowl. Fountains (fontanelle) are common but some are at awkward heights for dogs.',
        'Book hotels in Dorsoduro or Cannaregio for quieter neighbourhoods. San Marco hotels are central but the constant foot traffic stresses most dogs.',
        'Summer heat is severe on the lagoon. Schedule walks before 9am and after 7pm in July and August — stone and brick surfaces retain heat long after sunset.',
      ],
      fr: [
        'Règles du vaporetto : les chiens doivent être en transport sur la plupart des lignes ACTV. La ligne 1 (Grand Canal) est souvent bondée — partez tôt ou prenez la ligne 2 pour les traversées courtes.',
        'Les rues de Venise sont entièrement sans voitures, mais aussi étroites et pavées. Les petits chiens peuvent être portés ; les grandes races peinent avec le flux touristique aux heures de pointe.',
        'Emportez toujours une gamelle portable. Les fontaines sont nombreuses, mais parfois à une hauteur difficile pour les chiens.',
        'Réservez dans le Dorsoduro ou le Cannaregio pour des quartiers plus calmes. Les hôtels près de San Marco sont centraux, mais le flux piétonnier continu stresse la plupart des chiens.',
        'La chaleur estivale est sévère sur la lagune. Planifiez vos promenades avant 9h et après 19h en juillet-août — les surfaces en pierre restent chaudes longtemps après le coucher du soleil.',
      ],
      es: [
        'Normas del vaporetto: los perros deben ir en transportín en la mayoría de líneas ACTV. La línea 1 (Gran Canal) suele estar abarrotada — salga temprano o tome la línea 2 para trayectos cortos.',
        'Las calles de Venecia son completamente sin coches, pero también estrechas y adoquinadas. Los perros pequeños pueden llevarse en brazos; las razas grandes pueden tener dificultades en horas punta.',
        'Lleve siempre un cuenco de agua portátil. Las fuentes son frecuentes, pero a veces están a una altura difícil para los perros.',
        'Reserve en Dorsoduro o Cannaregio para barrios más tranquilos. Los hoteles cerca de San Marcos son céntricos, pero el flujo peatonal constante estresa a la mayoría de perros.',
        'El calor estival es severo en la laguna. Planifique los paseos antes de las 9h y después de las 19h en julio y agosto — las superficies de piedra retienen el calor mucho después del atardecer.',
      ],
    },
    practicalInfo: {
      en: [
        'Emergency vet: Clinica Veterinaria Riviera del Brenta, Dolo (+39 041 410 606) — the nearest 24h facility to central Venice.',
        'Getting there: Venice Santa Lucia station is on the mainland connection. Dogs in carriers travel free on Trenitalia; larger dogs pay a reduced fare.',
        'ACTV vaporetto: dogs in carriers accepted on all lines. Unleashed dogs require a muzzle and a valid ticket as for a child.',
        'Nearest dog-friendly beach: Cavallino-Treporti and Jesolo (on the mainland side of the lagoon) have designated dog beach areas in summer.',
      ],
      fr: [
        'Vétérinaire d\'urgence : Clinica Veterinaria Riviera del Brenta, Dolo (+39 041 410 606) — l\'établissement 24h le plus proche du centre de Venise.',
        'Accès : la gare de Venise Santa Lucia est en connexion continentale. Les chiens en transport voyagent gratuitement sur Trenitalia ; les grands chiens paient un tarif réduit.',
        'ACTV vaporetto : les chiens en transport sont acceptés sur toutes les lignes. Les chiens en laisse sans transport doivent porter une muselière et un billet plein tarif enfant.',
        'Plage canine la plus proche : Cavallino-Treporti et Jesolo (côté continental de la lagune) disposent de zones de plage réservées aux chiens en été.',
      ],
      es: [
        'Veterinario de urgencias: Clinica Veterinaria Riviera del Brenta, Dolo (+39 041 410 606) — el centro 24h más cercano al centro de Venecia.',
        'Cómo llegar: la estación de Venecia Santa Lucía conecta con tierra firme. Los perros en transportín viajan gratis en Trenitalia; los perros grandes pagan tarifa reducida.',
        'Vaporetto ACTV: perros en transportín admitidos en todas las líneas. Los perros con correa sin transportín necesitan bozal y billete equivalente al infantil.',
        'Playa canina más cercana: Cavallino-Treporti y Jesolo (lado continental de la laguna) tienen zonas de playa para perros en verano.',
      ],
    },
  },

  bruges: {
    history: {
      en: 'Medieval Bruges — the "Venice of the North" — is one of Europe\'s best-preserved historic city centres, and one of its most dog-friendly. Belgians take dogs everywhere: into shops, cafés, restaurants and even some museums. The city\'s compact size (easily walkable in a day), its canal-side paths and its relaxed attitude to dogs in public spaces make it an ideal short-break destination for pet owners.',
      fr: 'Bruges médiévale — la "Venise du Nord" — est l\'un des centres historiques les mieux préservés d\'Europe, et l\'un des plus accueillants pour les chiens. Les Belges emmènent leurs chiens partout : dans les magasins, les cafés, les restaurants et même certains musées. La taille compacte de la ville (facilement explorable en une journée), ses promenades le long des canaux et son attitude détendue envers les chiens en font une destination idéale pour les propriétaires d\'animaux.',
      es: 'Brujas medieval — la "Venecia del Norte" — es uno de los centros históricos mejor conservados de Europa y uno de los más amigables para perros. Los belgas llevan a sus perros a todas partes: tiendas, cafés, restaurantes e incluso algunos museos. Su tamaño compacto (explorable fácilmente en un día), los senderos junto a los canales y su actitud relajada hacia los perros lo convierten en un destino ideal para escapadas cortas.',
    },
    sights: [
      {
        name: 'Minnewaterpark',
        emoji: '🦢',
        petFriendly: true,
        desc: {
          en: 'The "Lake of Love" and its surrounding park are a favourite with local dog walkers. The wide gravel paths circle the romantic lake and connect to the Begijnhof — a peaceful off-leash walk in the early morning.',
          fr: 'Le "Lac d\'amour" et son parc sont un lieu de prédilection pour les promeneurs avec chiens. Les larges allées de gravier encerclent le lac romantique et rejoignent le Béguinage — une promenade paisible en laisse longue le matin tôt.',
          es: 'El "Lago del Amor" y su parque son un lugar favorito de los paseantes con perros. Los amplios caminos de grava rodean el lago romántico y conectan con el Begijnhof — un paseo tranquilo a primera hora de la mañana.',
        },
      },
      {
        name: 'Canal-side walks (Groenerei & Dijver)',
        emoji: '🛶',
        petFriendly: true,
        desc: {
          en: 'The canal towpaths running along the Groenerei and Dijver are perfect for a slow, scenic dog walk. Wide enough to avoid crowds before 10am, lined with weeping willows and medieval façades.',
          fr: 'Les chemins de halage le long du Groenerei et du Dijver sont parfaits pour une promenade lente et pittoresque avec votre chien. Assez larges pour éviter la foule avant 10h, bordés de saules pleureurs et de façades médiévales.',
          es: 'Los caminos junto a los canales Groenerei y Dijver son perfectos para un paseo tranquilo y pintoresco. Suficientemente amplios para evitar la multitud antes de las 10h, bordeados de sauces llorones y fachadas medievales.',
        },
      },
      {
        name: 'Koningin Astridpark',
        emoji: '🌳',
        petFriendly: true,
        desc: {
          en: 'Bruges\'s main city park, with a bandstand, large pond and open lawns. Dogs on lead are welcome throughout; an enclosed dog run area is available near the northwest corner.',
          fr: 'Le principal parc de Bruges, avec un kiosque à musique, un grand étang et des pelouses ouvertes. Les chiens en laisse sont les bienvenus ; une zone de détente canine clôturée se trouve près du coin nord-ouest.',
          es: 'El principal parque urbano de Brujas, con un quiosco de música, un gran estanque y praderas abiertas. Los perros con correa son bienvenidos; hay una zona cercada para perros cerca del rincón noroeste.',
        },
      },
      {
        name: 'Markt & Burg squares',
        emoji: '🍺',
        petFriendly: true,
        desc: {
          en: 'The two central squares are accessible with dogs on lead. The café terraces around the Markt are very dog-friendly — it\'s not unusual to see dogs tied to chair legs while owners enjoy a Trappist beer.',
          fr: 'Les deux places centrales sont accessibles avec des chiens en laisse. Les terrasses de cafés autour du Markt sont très accueillantes pour les chiens — il est courant de voir des chiens attachés aux pieds de chaises pendant que leurs propriétaires savourent une bière trappiste.',
          es: 'Las dos plazas centrales son accesibles con perros con correa. Las terrazas de los cafés alrededor del Markt son muy amigables — es habitual ver perros atados a las patas de las sillas mientras sus dueños disfrutan de una cerveza trapense.',
        },
      },
      {
        name: 'Belfry of Bruges (Belfort)',
        emoji: '🔔',
        petFriendly: false,
        desc: {
          en: 'The iconic 83m bell tower involves a narrow 366-step climb and is not accessible for dogs. Admire it from the Markt square instead.',
          fr: 'L\'emblématique clocher de 83m implique une montée étroite de 366 marches et n\'est pas accessible aux chiens. Admirez-le depuis la place du Markt.',
          es: 'El icónico campanario de 83m implica una estrecha subida de 366 escalones y no es accesible para perros. Adíralo desde la plaza del Markt.',
        },
      },
    ],
    petTips: {
      en: [
        'Belgian café culture is exceptionally dog-friendly — most cafés, brasseries and even chocolatiers welcome dogs inside. Look for a water bowl by the door as the universal signal.',
        'Bruges is extremely compact: the historic centre is roughly 2km across, making it one of the easiest European cities to navigate on foot with a dog.',
        'Canal boat tours (reien): some operators allow small dogs in carriers; ask before booking. The narrow boats can be tricky with larger breeds.',
        'The city gets very crowded in summer (especially day-tripping from Brussels or Ghent). Arrive early or stay overnight to enjoy quieter morning walks.',
        'Belgian supermarkets (Delhaize, Carrefour) have good pet food sections for mid-trip supplies.',
      ],
      fr: [
        'La culture des cafés belges est exceptionnellement accueillante pour les chiens — la plupart des cafés, brasseries et même des chocolatiers acceptent les chiens à l\'intérieur. Un bol d\'eau posé devant la porte est le signal universel.',
        'Bruges est extrêmement compacte : le centre historique mesure environ 2 km de large, ce qui en fait l\'une des villes européennes les plus faciles à explorer à pied avec un chien.',
        'Excursions en bateau sur les canaux (reien) : certains opérateurs acceptent les petits chiens en transport ; renseignez-vous avant de réserver. Les bateaux étroits peuvent être difficiles avec les grandes races.',
        'La ville est très fréquentée en été (surtout les excursions en journée depuis Bruxelles ou Gand). Arrivez tôt ou séjournez sur place pour profiter de promenades matinales plus calmes.',
        'Les supermarchés belges (Delhaize, Carrefour) ont de bons rayons alimentation animale pour les approvisionnements en cours de voyage.',
      ],
      es: [
        'La cultura de café belga es excepcionalmente amigable con los perros — la mayoría de cafés, brasseries e incluso chocolaterías aceptan perros dentro. Un cuenco de agua junto a la puerta es la señal universal.',
        'Brujas es extremadamente compacta: el centro histórico mide unos 2 km de ancho, lo que la convierte en una de las ciudades europeas más fáciles de recorrer a pie con un perro.',
        'Paseos en barco por los canales (reien): algunos operadores permiten perros pequeños en transportín; consulte antes de reservar. Los barcos estrechos pueden ser difíciles con razas grandes.',
        'La ciudad se llena mucho en verano (especialmente de excursionistas desde Bruselas o Gante). Llegue temprano o quédese a dormir para disfrutar de paseos matutinos más tranquilos.',
        'Los supermercados belgas (Delhaize, Carrefour) tienen buenas secciones de alimentación animal para reabastecerse durante el viaje.',
      ],
    },
    practicalInfo: {
      en: [
        'Emergency vet: Dierenarts Urgentie Brugge, call the national animal emergency line +32 9 220 00 05 for the nearest on-call vet.',
        'Getting there: Bruges station is served by hourly direct trains from Brussels (1h) and Ghent (25 min). Dogs travel free in a carrier; larger dogs pay a reduced fare.',
        'From the UK: direct Eurostar to Brussels, then train to Bruges. Pets require a valid EU/UK pet passport and rabies vaccination.',
        'Car access: the historic centre is largely pedestrianised. Hotels provide parking information on booking; several have dedicated spots outside the zone.',
      ],
      fr: [
        'Vétérinaire d\'urgence : Dierenarts Urgentie Brugge, appelez la ligne nationale d\'urgence animale +32 9 220 00 05 pour le vétérinaire de garde le plus proche.',
        'Accès : la gare de Bruges est desservie par des trains directs toutes les heures depuis Bruxelles (1h) et Gand (25 min). Les chiens en transport voyagent gratuitement ; les grands chiens paient un tarif réduit.',
        'Depuis le Royaume-Uni : Eurostar direct jusqu\'à Bruxelles, puis train pour Bruges. Les animaux nécessitent un passeport animal UE/RU valide et une vaccination antirabique.',
        'Accès en voiture : le centre historique est en grande partie piétonnier. Les hôtels communiquent les informations de stationnement à la réservation.',
      ],
      es: [
        'Veterinario de urgencias: Dierenarts Urgentie Brugge, llame a la línea nacional de urgencias animales +32 9 220 00 05 para el veterinario de guardia más cercano.',
        'Cómo llegar: la estación de Brujas tiene trenes directos cada hora desde Bruselas (1h) y Gante (25 min). Los perros en transportín viajan gratis; los perros grandes pagan tarifa reducida.',
        'Desde el Reino Unido: Eurostar directo a Bruselas, luego tren a Brujas. Las mascotas necesitan un pasaporte de mascota UE/RU válido y vacunación antirrábica.',
        'Acceso en coche: el centro histórico es en gran parte peatonal. Los hoteles facilitan información de aparcamiento al reservar.',
      ],
    },
  },

  budapest: {
    history: {
      en: 'Budapest — formed from the merger of Buda, Óbuda and Pest in 1873 — is one of Central Europe\'s most dog-populated capitals, with an estimated 300,000 dogs registered in the metro area. Hungarians are deeply attached to their dogs and the city\'s infrastructure reflects this: dedicated off-leash zones (kutyafuttató) exist in almost every district, tram and metro rules allow dogs with muzzles, and thermal bath culture — while not dog-inclusive — is balanced by a network of parks and riverside promenades that make Budapest genuinely walker-friendly.',
      fr: 'Budapest — née de la fusion de Buda, Óbuda et Pest en 1873 — est l\'une des capitales d\'Europe centrale avec le plus grand nombre de chiens, avec environ 300 000 chiens enregistrés dans l\'agglomération. Les Hongrois sont profondément attachés à leurs chiens et l\'infrastructure de la ville le reflète : des zones de liberté (kutyafuttató) existent dans presque tous les quartiers, les tramways et le métro acceptent les chiens avec muselière, et la culture des bains thermaux — sans les chiens — est compensée par un réseau de parcs et de promenades au bord du Danube.',
      es: 'Budapest — formada por la fusión de Buda, Óbuda y Pest en 1873 — es una de las capitales de Europa Central con más perros, con unos 300.000 perros registrados en el área metropolitana. Los húngaros están profundamente apegados a sus perros y la infraestructura de la ciudad lo refleja: hay zonas de libertad (kutyafuttató) en casi todos los distritos, los tranvías y el metro admiten perros con bozal, y la cultura de los baños termales — sin mascotas — se compensa con una red de parques y paseos fluviales.',
    },
    sights: [
      {
        name: 'Margit-sziget (Margaret Island)',
        emoji: '🏝️',
        petFriendly: true,
        desc: {
          en: 'The car-free island in the middle of the Danube is Budapest\'s best dog walk: 2.5km of shaded paths, a running track, fountains and a dedicated kutyafuttató (dog run) at the northern tip. Dogs on lead are welcome everywhere.',
          fr: 'L\'île sans voitures au milieu du Danube est la meilleure promenade canine de Budapest : 2,5 km de sentiers ombragés, une piste de course, des fontaines et un kutyafuttató (parc canin) dédié à la pointe nord. Les chiens en laisse sont les bienvenus partout.',
          es: 'La isla sin coches en medio del Danubio es el mejor paseo canino de Budapest: 2,5 km de senderos sombreados, una pista de atletismo, fuentes y un kutyafuttató (parque canino) dedicado en el extremo norte. Los perros con correa son bienvenidos en todas partes.',
        },
      },
      {
        name: 'Budai-hegység (Buda Hills)',
        emoji: '⛰️',
        petFriendly: true,
        desc: {
          en: 'The forested hills of western Buda offer hours of off-leash hiking. The Hármashatárhegy and Normafa areas are popular with locals and their dogs on weekends — wild trails, clean air and city views.',
          fr: 'Les collines boisées de Buda offrent des heures de randonnée en liberté. Les secteurs de Hármashatárhegy et Normafa sont populaires auprès des locaux et de leurs chiens le week-end — des sentiers sauvages, un air pur et des vues sur la ville.',
          es: 'Las colinas boscosas del oeste de Buda ofrecen horas de senderismo sin correa. Las zonas de Hármashatárhegy y Normafa son populares entre los locales y sus perros los fines de semana — senderos salvajes, aire limpio y vistas de la ciudad.',
        },
      },
      {
        name: 'Városliget (City Park)',
        emoji: '🏰',
        petFriendly: true,
        desc: {
          en: 'Budapest\'s grand public park, home to Vajdahunyad Castle and the Széchenyi thermal baths. Dogs on lead are welcome in the park grounds; the large kutyafuttató near the Olof Palme sétány is a social hub for local dog owners.',
          fr: 'Le grand parc public de Budapest, accueillant le château Vajdahunyad et les bains thermaux Széchenyi. Les chiens en laisse sont les bienvenus dans le parc ; le grand kutyafuttató près de la promenade Olof Palme est un lieu de rassemblement pour les propriétaires de chiens locaux.',
          es: 'El gran parque público de Budapest, con el castillo Vajdahunyad y los baños termales Széchenyi. Los perros con correa son bienvenidos en el parque; el gran kutyafuttató cerca de la avenida Olof Palme es un punto de encuentro para los dueños de perros locales.',
        },
      },
      {
        name: 'Danube Promenade (Duna-korzó)',
        emoji: '🌊',
        petFriendly: true,
        desc: {
          en: 'The riverside promenade on the Pest bank, with views of Buda Castle and the Chain Bridge. Relaxed, wide, and welcoming to dogs. Many of the café terraces along here will bring a water bowl without being asked.',
          fr: 'La promenade en bord de Danube sur la rive de Pest, avec vue sur le château de Buda et le pont des Chaînes. Détendu, large et accueillant pour les chiens. Beaucoup de terrasses de cafés apporteront un bol d\'eau sans qu\'on le demande.',
          es: 'El paseo fluvial en la orilla de Pest, con vistas al castillo de Buda y al Puente de las Cadenas. Relajado, amplio y acogedor para los perros. Muchas terrazas traerán un cuenco de agua sin pedírselo.',
        },
      },
      {
        name: 'Széchenyi & Gellért Thermal Baths',
        emoji: '♨️',
        petFriendly: false,
        desc: {
          en: 'Thermal baths are not accessible to dogs. They are a Budapest highlight but require leaving your pet at the hotel. Book accommodation with secure on-site storage or garden access for these visits.',
          fr: 'Les bains thermaux ne sont pas accessibles aux chiens. C\'est un incontournable de Budapest, mais cela nécessite de laisser votre animal à l\'hôtel. Réservez un hébergement avec un espace sécurisé ou un accès au jardin pour ces visites.',
          es: 'Los baños termales no son accesibles para perros. Son un punto destacado de Budapest, pero requieren dejar a su mascota en el hotel. Reserve alojamiento con espacio seguro o acceso al jardín para estas visitas.',
        },
      },
    ],
    petTips: {
      en: [
        'BKV transport rules: dogs must wear a muzzle on metro, tram and bus lines. Small dogs in carriers travel free; larger dogs pay a child fare. Dogs are not permitted during peak commute hours on some lines.',
        'Kutyafuttató (off-leash dog runs): every district has at least one. They are fenced, often have water, and are free to use. The Városliget and Margit Island runs are the largest.',
        'Hungarian restaurants and ruin bars (romkocsmák) in the VII district are very dog-friendly — the outdoor courtyards of Szimpla Kert and similar venues welcome dogs.',
        'Thermal baths are Budapest\'s top attraction but dogs are strictly excluded. Plan your thermal bath days around dog-sitter options or build in hotel time.',
        'Summers are hot (35°C+) and winters cold (−5°C). The Buda Hills are a great summer refuge; in winter, the heated interior of romkocsmák makes them dog-walker havens.',
      ],
      fr: [
        'Transports BKV : les chiens doivent porter une muselière dans le métro, les tramways et les bus. Les petits chiens en transport voyagent gratuitement ; les grands chiens paient un tarif enfant. Les chiens ne sont pas autorisés aux heures de pointe sur certaines lignes.',
        'Kutyafuttató (parcs canins en liberté) : chaque arrondissement en possède au moins un. Ils sont clôturés, souvent équipés d\'eau et gratuits. Ceux de Városliget et de l\'île Margit sont les plus grands.',
        'Les restaurants hongrois et les ruin bars (romkocsmák) du VIIe arrondissement sont très accueillants pour les chiens — les cours extérieures de Szimpla Kert et d\'autres lieux similaires accueillent les chiens.',
        'Les bains thermaux sont l\'attraction principale de Budapest, mais les chiens en sont strictement exclus. Planifiez vos journées thermales en fonction des options de garde ou prévoyez du temps à l\'hôtel.',
        'Les étés sont chauds (35°C+) et les hivers froids (−5°C). Les collines de Buda sont un excellent refuge estival ; en hiver, les romkocsmák chauffées deviennent des havres pour les promeneurs avec chiens.',
      ],
      es: [
        'Transporte BKV: los perros deben llevar bozal en metro, tranvía y autobús. Los perros pequeños en transportín viajan gratis; los grandes pagan tarifa infantil. Los perros no están permitidos en algunas líneas en horas punta.',
        'Kutyafuttató (zonas de libertad): cada distrito tiene al menos uno. Son vallados, suelen tener agua y son gratuitos. Los de Városliget e Isla Margarita son los más grandes.',
        'Los restaurantes húngaros y los ruin bars (romkocsmák) del distrito VII son muy amigables con los perros — los patios exteriores de Szimpla Kert y locales similares admiten perros.',
        'Los baños termales son la principal atracción de Budapest, pero los perros están estrictamente excluidos. Planifique sus días de baños termales con opciones de cuidado de mascotas o reserve tiempo en el hotel.',
        'Los veranos son calurosos (35°C+) y los inviernos fríos (−5°C). Las colinas de Buda son un refugio estival ideal; en invierno, los romkocsmák calefaccionados se convierten en refugios para paseadores con perros.',
      ],
    },
    practicalInfo: {
      en: [
        'Emergency vet: Állatklinika Budapest, Thököly út (+36 1 251 2929) — 24-hour veterinary hospital in central Pest.',
        'Getting there: Budapest Keleti station connects to Vienna (2.5h Railjet), Prague (6h) and beyond. Dogs with muzzle and lead travel on a child ticket on MÁV trains.',
        'Currency: Hungary uses the forint (HUF), not the euro. Credit cards widely accepted but carry some cash for markets and dog-run vending machines.',
        'Pet passport: Hungary is an EU member — standard EU pet passport with microchip and rabies vaccination is sufficient.',
      ],
      fr: [
        'Vétérinaire d\'urgence : Állatklinika Budapest, Thököly út (+36 1 251 2929) — hôpital vétérinaire ouvert 24h/24 dans le centre de Pest.',
        'Accès : la gare Keleti de Budapest est reliée à Vienne (2h30 en Railjet), Prague (6h) et au-delà. Les chiens avec muselière et laisse voyagent avec un billet enfant sur les trains MÁV.',
        'Monnaie : la Hongrie utilise le forint (HUF), pas l\'euro. Les cartes bancaires sont largement acceptées, mais emportez un peu d\'argent liquide pour les marchés.',
        'Passeport animal : la Hongrie est membre de l\'UE — le passeport européen standard avec puce et vaccin antirabique suffit.',
      ],
      es: [
        'Veterinario de urgencias: Állatklinika Budapest, Thököly út (+36 1 251 2929) — hospital veterinario 24h en el centro de Pest.',
        'Cómo llegar: la estación Keleti de Budapest conecta con Viena (2,5h en Railjet), Praga (6h) y más destinos. Los perros con bozal y correa viajan con billete infantil en trenes MÁV.',
        'Moneda: Hungría usa el forinto (HUF), no el euro. Las tarjetas se aceptan ampliamente, pero lleve algo de efectivo para mercados.',
        'Pasaporte de mascota: Hungría es miembro de la UE — el pasaporte europeo estándar con microchip y vacunación antirrábica es suficiente.',
      ],
    },
  },

  dubrovnik: {
    history: {
      en: 'Dubrovnik — the "Pearl of the Adriatic" — is one of Europe\'s most visited cities, with its UNESCO-listed Old Town walls and crystal-clear sea attracting over two million tourists a year to a city of just 40,000 residents. For dog owners, Dubrovnik rewards careful planning: the Old Town itself has steep marble steps and severe summer heat, but the surrounding area offers dog-friendly beaches, forested hills and the quieter Elaphiti Islands within easy ferry reach. Croatian attitudes to dogs in public are welcoming, and the Adriatic coast is one of Europe\'s most scenic walking environments.',
      fr: 'Dubrovnik — la "Perle de l\'Adriatique" — est l\'une des villes les plus visitées d\'Europe, avec ses remparts classés à l\'UNESCO et sa mer cristalline attirant plus de deux millions de touristes par an dans une ville de seulement 40 000 habitants. Pour les propriétaires de chiens, Dubrovnik récompense une planification soigneuse : la vieille ville elle-même présente des marches en marbre raides et une chaleur estivale sévère, mais les alentours offrent des plages canines, des collines boisées et les îles Élaphites — plus tranquilles — accessibles en ferry.',
      es: 'Dubrovnik — la "Perla del Adriático" — es una de las ciudades más visitadas de Europa, con sus murallas de la Ciudad Vieja declaradas Patrimonio Mundial y su mar cristalino que atrae a más de dos millones de turistas al año a una ciudad de solo 40.000 habitantes. Para los dueños de perros, Dubrovnik recompensa una planificación cuidadosa: la Ciudad Vieja tiene escalones de mármol empinados y un calor estival severo, pero los alrededores ofrecen playas caninas, colinas boscosas y las tranquilas islas Elafiti a poca distancia en ferry.',
    },
    sights: [
      {
        name: 'Park Šuma Gradac',
        emoji: '🌲',
        petFriendly: true,
        desc: {
          en: 'The forested park just west of the Old Town walls is the best dog walk in central Dubrovnik. Shaded pine paths, sea views and a blessedly cooler temperature make it the go-to morning walk even in summer.',
          fr: 'Le parc forestier juste à l\'ouest des remparts de la vieille ville est la meilleure promenade canine du centre de Dubrovnik. Des sentiers ombragés sous les pins, des vues sur la mer et une température nettement plus fraîche en font la promenade matinale par excellence, même en été.',
          es: 'El parque forestal justo al oeste de las murallas de la Ciudad Vieja es el mejor paseo canino del centro de Dubrovnik. Senderos sombreados entre pinos, vistas al mar y una temperatura notablemente más fresca lo convierten en el paseo matutino de referencia, incluso en verano.',
        },
      },
      {
        name: 'Elaphiti Islands (Lopud & Šipan)',
        emoji: '⛵',
        petFriendly: true,
        desc: {
          en: 'The car-free Elaphiti Islands are a revelation for dog owners. Lopud and Šipan have sandy paths, quiet coves and a tiny year-round population. A 1-hour ferry from Dubrovnik port; dogs travel free.',
          fr: 'Les îles Élaphites sans voitures sont une révélation pour les propriétaires de chiens. Lopud et Šipan ont des sentiers sablonneux, des criques tranquilles et une population résidente très réduite toute l\'année. Ferry d\'1h depuis le port de Dubrovnik ; les chiens voyagent gratuitement.',
          es: 'Las islas Elafiti sin coches son una revelación para los dueños de perros. Lopud y Šipan tienen senderos de arena, calas tranquilas y una pequeña población permanente. Ferry de 1h desde el puerto de Dubrovnik; los perros viajan gratis.',
        },
      },
      {
        name: 'Cavtat & the Konavle Valley',
        emoji: '🍇',
        petFriendly: true,
        desc: {
          en: 'The charming coastal village of Cavtat, 20 minutes south of Dubrovnik by bus, is far less crowded and has a lovely seaside promenade. The hinterland Konavle Valley offers cycling tracks and vineyard walks with dogs welcome.',
          fr: 'Le charmant village côtier de Cavtat, à 20 minutes au sud de Dubrovnik en bus, est beaucoup moins fréquenté et dispose d\'une belle promenade en bord de mer. La vallée de Konavle offre des pistes cyclables et des promenades dans les vignobles, les chiens étant les bienvenus.',
          es: 'El encantador pueblo costero de Cavtat, a 20 minutos al sur de Dubrovnik en autobús, es mucho menos concurrido y tiene un bonito paseo marítimo. El valle de Konavle ofrece rutas ciclistas y paseos entre viñedos con perros bienvenidos.',
        },
      },
      {
        name: 'Stari Grad (Old Town Walls)',
        emoji: '🏛️',
        petFriendly: false,
        desc: {
          en: 'The Old Town walls are a UNESCO highlight but the narrow, stepped streets and extreme summer heat (40°C+) make them unsuitable for dogs. Visit the walls solo and plan dog time for early morning outside the walls.',
          fr: 'Les remparts de la vieille ville sont un site UNESCO incontournable, mais les ruelles étroites et les escaliers raides, combinés à la chaleur estivale extrême (40°C+), les rendent inadaptés aux chiens. Visitez les remparts seul et planifiez les sorties canines tôt le matin à l\'extérieur des remparts.',
          es: 'Las murallas de la Ciudad Vieja son un punto destacado de la UNESCO, pero las estrechas calles escalonadas y el calor estival extremo (40°C+) las hacen inadecuadas para los perros. Visite las murallas solo y planifique los paseos con perro temprano por la mañana fuera de las murallas.',
        },
      },
      {
        name: 'Lapad Peninsula',
        emoji: '🏖️',
        petFriendly: true,
        desc: {
          en: 'The residential Lapad Peninsula, 3km from the Old Town, has a long seaside promenade (šetalište), pine-shaded parks and several dog-friendly beaches. Most Dubrovnik pet-friendly hotels are located here.',
          fr: 'La péninsule résidentielle de Lapad, à 3 km de la vieille ville, dispose d\'une longue promenade maritime, de parcs ombragés de pins et de plusieurs plages canines. La plupart des hôtels pet-friendly de Dubrovnik s\'y trouvent.',
          es: 'La península residencial de Lapad, a 3 km de la Ciudad Vieja, tiene un largo paseo marítimo, parques sombreados por pinos y varias playas caninas. La mayoría de los hoteles pet-friendly de Dubrovnik se encuentran aquí.',
        },
      },
    ],
    petTips: {
      en: [
        'Summer heat is extreme (July–August regularly hits 38–40°C). Walk only before 8am and after 8pm. The marble paving stones of the Old Town retain heat dangerously — test with your hand before letting your dog walk on them.',
        'The Old Town\'s stepped streets and narrow passages are stressful for most dogs during tourist season. Base yourself in Lapad or Gruž and visit the Old Town early morning or out of season.',
        'Dog-friendly beaches exist at Lapad Bay and on the Elaphiti Islands. Most main city beaches (Banje, Copacabana) have pet restrictions in summer — check seasonal signage.',
        'Croatian phrase: "Mogu li ući s psom?" ("Can I come in with my dog?") — locals appreciate the effort and will often say yes.',
        'Dubrovnik\'s water is safe to drink and fountains are common. Always carry extra water in summer — the heat combined with walking will dehydrate your dog quickly.',
      ],
      fr: [
        'La chaleur estivale est extrême (juillet-août atteint régulièrement 38-40°C). Promenez-vous uniquement avant 8h et après 20h. Les dalles de marbre de la vieille ville retiennent la chaleur de manière dangereuse — testez avec votre main avant de laisser votre chien marcher dessus.',
        'Les ruelles en escalier et les passages étroits de la vieille ville sont stressants pour la plupart des chiens en haute saison. Établissez-vous à Lapad ou Gruž et visitez la vieille ville tôt le matin ou hors saison.',
        'Des plages canines existent à la baie de Lapad et sur les îles Élaphites. La plupart des plages principales (Banje, Copacabana) ont des restrictions pour animaux en été — vérifiez la signalisation saisonnière.',
        'Expression croate : "Mogu li ući s psom ?" ("Puis-je entrer avec mon chien ?") — les habitants apprécient l\'effort et diront souvent oui.',
        'L\'eau de Dubrovnik est potable et les fontaines sont nombreuses. Emportez toujours de l\'eau supplémentaire en été — la chaleur combinée à la marche déshydratera rapidement votre chien.',
      ],
      es: [
        'El calor estival es extremo (julio-agosto llega regularmente a 38-40°C). Pasee solo antes de las 8h y después de las 20h. Las losas de mármol de la Ciudad Vieja retienen el calor de forma peligrosa — pruebe con la mano antes de dejar a su perro caminar sobre ellas.',
        'Las calles escalonadas y los pasajes estrechos de la Ciudad Vieja son estresantes para la mayoría de los perros en temporada alta. Alójese en Lapad o Gruž y visite la Ciudad Vieja temprano por la mañana o fuera de temporada.',
        'Hay playas caninas en la bahía de Lapad y en las islas Elafiti. La mayoría de las playas principales (Banje, Copacabana) tienen restricciones para mascotas en verano — compruebe la señalización estacional.',
        'Frase croata: "Mogu li ući s psom?" ("¿Puedo entrar con mi perro?") — los locales aprecian el esfuerzo y a menudo dirán que sí.',
        'El agua de Dubrovnik es potable y las fuentes son frecuentes. Lleve siempre agua extra en verano — el calor combinado con el paseo deshidratará a su perro rápidamente.',
      ],
    },
    practicalInfo: {
      en: [
        'Emergency vet: Veterinarska Stanica Dubrovnik, Vukovarska ulica (+385 20 423 433) — for after-hours emergencies, the nearest 24h facility is in Split (3.5h) or consult the local police for the on-call vet.',
        'Getting there: Dubrovnik Airport is 20km south. Most visitors fly in. Ferries from Split, Rijeka and Italy (Jadrolinija) allow pets in carriers or with lead and muzzle on deck.',
        'Croatia is an EU member — standard EU pet passport with microchip and rabies vaccination is required.',
        'Best season for dog owners: May, June and September. Avoid July and August if possible — the combination of crowds, heat and limited dog-friendly beach access makes it the hardest time of year.',
      ],
      fr: [
        'Vétérinaire d\'urgence : Veterinarska Stanica Dubrovnik, Vukovarska ulica (+385 20 423 433) — pour les urgences nocturnes, le centre 24h le plus proche est à Split (3h30) ou consultez la police locale pour le vétérinaire de garde.',
        'Accès : l\'aéroport de Dubrovnik est à 20 km au sud. La plupart des visiteurs arrivent par avion. Les ferries de Split, Rijeka et d\'Italie (Jadrolinija) acceptent les animaux en transport ou avec laisse et muselière sur le pont.',
        'La Croatie est membre de l\'UE — le passeport européen standard avec puce et vaccin antirabique est requis.',
        'Meilleure saison pour les propriétaires de chiens : mai, juin et septembre. Évitez juillet et août si possible — la combinaison de foules, de chaleur et d\'accès limité aux plages canines en fait la période la plus difficile de l\'année.',
      ],
      es: [
        'Veterinario de urgencias: Veterinarska Stanica Dubrovnik, Vukovarska ulica (+385 20 423 433) — para urgencias nocturnas, el centro 24h más cercano está en Split (3,5h) o consulte a la policía local para el veterinario de guardia.',
        'Cómo llegar: el aeropuerto de Dubrovnik está a 20 km al sur. La mayoría de visitantes llega en avión. Los ferrís de Split, Rijeka e Italia (Jadrolinija) admiten mascotas en transportín o con correa y bozal en cubierta.',
        'Croacia es miembro de la UE — se requiere el pasaporte europeo estándar con microchip y vacunación antirrábica.',
        'Mejor temporada para dueños de perros: mayo, junio y septiembre. Evite julio y agosto si es posible — la combinación de multitudes, calor y acceso limitado a playas caninas lo convierte en la época más difícil del año.',
      ],
    },
  },

  porto: {
    history: {
      en: 'Porto — Portugal\'s second city and the origin of port wine — sits on the dramatic granite gorge of the Douro river. With around 240,000 inhabitants, it has the warmth of a neighbourhood city and a dog culture that mirrors Lisbon\'s openness. Portuenses (Porto residents) are matter-of-fact about dogs in public spaces: café terraces, riverside promenades and tram cars all see dogs as a normal part of daily life. The Atlantic coast is minutes away, and the Douro Valley wine country — an extraordinary day trip — is one of the most scenic walking environments in Europe.',
      fr: 'Porto — la deuxième ville du Portugal et l\'origine du vin de porto — s\'étend sur les gorges granitiques dramatiques du Douro. Avec environ 240 000 habitants, elle a la chaleur d\'une ville de quartier et une culture canine qui reflète l\'ouverture de Lisbonne. Les Portuenses considèrent les chiens dans les espaces publics comme une évidence : terrasses de cafés, promenades en bord de fleuve et tramways accueillent les chiens au quotidien. La côte atlantique est à quelques minutes, et la vallée du Douro — une excursion extraordinaire — est l\'un des environnements de marche les plus pittoresques d\'Europe.',
      es: 'Oporto — la segunda ciudad de Portugal y el origen del vino de Oporto — se extiende por el dramático cañón granítico del Duero. Con unos 240.000 habitantes, tiene la calidez de una ciudad de barrio y una cultura canina que refleja la apertura de Lisboa. Los portuenses consideran los perros en los espacios públicos como algo natural: terrazas de cafés, paseos fluviales y tranvías acogen a los perros a diario. La costa atlántica está a pocos minutos, y el valle del Duero — una excursión extraordinaria — es uno de los entornos de caminata más pintorescos de Europa.',
    },
    sights: [
      {
        name: 'Parque da Cidade',
        emoji: '🌊',
        petFriendly: true,
        desc: {
          en: 'Porto\'s largest park — 83 hectares of ponds, meadows and Atlantic-facing gardens — is the city\'s premier dog walking destination. Off-leash zones, water features and a direct path to the sea make it unmissable.',
          fr: 'Le plus grand parc de Porto — 83 hectares d\'étangs, de prairies et de jardins face à l\'Atlantique — est la destination de promenade canine par excellence de la ville. Des zones en liberté, des points d\'eau et un accès direct à la mer en font un incontournable.',
          es: 'El parque más grande de Oporto — 83 hectáreas de estanques, prados y jardines frente al Atlántico — es el destino de paseo canino por excelencia de la ciudad. Zonas de libertad, fuentes de agua y un acceso directo al mar lo hacen imprescindible.',
        },
      },
      {
        name: 'Ribeira & Cais da Ribeira',
        emoji: '🚣',
        petFriendly: true,
        desc: {
          en: 'The UNESCO-listed riverfront is one of Porto\'s most atmospheric walks. The narrow alleys of the Ribeira neighbourhood and the wide riverside promenade are perfect for dogs — most of the café terraces here welcome them warmly.',
          fr: 'Le front de fleuve classé à l\'UNESCO est l\'une des promenades les plus atmosphériques de Porto. Les ruelles étroites du quartier Ribeira et la large promenade en bord de fleuve sont parfaites pour les chiens — la plupart des terrasses les accueillent chaleureusement.',
          es: 'El frente fluvial declarado Patrimonio Mundial es uno de los paseos más atmosféricos de Oporto. Las estrechas callejuelas del barrio de la Ribeira y el amplio paseo fluvial son perfectos para los perros — la mayoría de las terrazas los acogen con calidez.',
        },
      },
      {
        name: 'Foz do Douro & Atlantic beaches',
        emoji: '🏄',
        petFriendly: true,
        desc: {
          en: 'Where the Douro meets the Atlantic, the Foz neighbourhood has a seaside promenade and several dog-friendly beach stretches. In autumn and winter (out of beach season) the entire coastline opens to dogs.',
          fr: 'Là où le Douro rencontre l\'Atlantique, le quartier de Foz dispose d\'une promenade maritime et de plusieurs zones de plage canines. En automne et en hiver (hors saison balnéaire), tout le littoral s\'ouvre aux chiens.',
          es: 'Donde el Duero se encuentra con el Atlántico, el barrio de Foz tiene un paseo marítimo y varias zonas de playa caninas. En otoño e invierno (fuera de temporada de playa), todo el litoral se abre a los perros.',
        },
      },
      {
        name: 'Douro Valley day trip',
        emoji: '🍷',
        petFriendly: true,
        desc: {
          en: 'A 1.5-hour drive east, the Douro Valley wine country is a revelation: terraced vineyards, ancient quintas and river views. Many quinta restaurants and wine estates welcome dogs on their terraces and in their gardens.',
          fr: 'À 1h30 à l\'est en voiture, le vignoble du Douro est une révélation : des vignes en terrasses, d\'anciennes quintas et des vues sur le fleuve. De nombreux restaurants de quinta et domaines viticoles accueillent les chiens sur leurs terrasses et dans leurs jardins.',
          es: 'A 1,5 horas en coche hacia el este, el valle del Duero es una revelación: viñedos en terrazas, antiguas quintas y vistas al río. Muchos restaurantes de quinta y bodegas acogen a los perros en sus terrazas y jardines.',
        },
      },
      {
        name: 'Livraria Lello & Clérigos Tower',
        emoji: '📚',
        petFriendly: false,
        desc: {
          en: 'The famous Lello bookshop and the Clérigos Tower are not accessible to dogs. Worth visiting solo — the bookshop entry requires a ticket that is redeemable on purchase.',
          fr: 'La célèbre librairie Lello et la Tour des Clercs ne sont pas accessibles aux chiens. Valent la visite en solo — l\'entrée de la librairie nécessite un billet remboursable sur achat.',
          es: 'La famosa librería Lello y la Torre de los Clérigos no son accesibles para perros. Vale la pena visitarlos solos — la entrada a la librería requiere un billete reembolsable en compra.',
        },
      },
    ],
    petTips: {
      en: [
        'Porto\'s hills are steep — the city climbs dramatically from the river to the upper districts. Small dogs can be carried; for larger breeds, plan routes that use the funicular (elevador) or stick to flat riverside paths.',
        'Atlantic beach access for dogs: Matosinhos beach (adjacent to Porto) has dedicated dog areas. In the off-season (October–May), most beaches are fully open to dogs.',
        'The Matosinhos neighbourhood, north of the city centre, is one of Porto\'s most dog-friendly: wide streets, a fish market, and a seafront that local dog owners use daily.',
        'Trams (vintage lines 1, 18, 22) allow small dogs in carriers; larger dogs need a lead and are generally accommodated by drivers. Ask before boarding.',
        'Porto\'s café culture is open to dogs: most pastelarias and coffee shops allow dogs on the terrace, and many — especially in Foz and Bonfim — welcome them inside.',
      ],
      fr: [
        'Les collines de Porto sont abruptes — la ville grimpe de manière spectaculaire depuis le fleuve jusqu\'aux quartiers hauts. Les petits chiens peuvent être portés ; pour les grandes races, planifiez des itinéraires utilisant le funiculaire ou restez sur les promenades plates en bord de fleuve.',
        'Accès à la plage pour les chiens : la plage de Matosinhos (adjacente à Porto) dispose de zones dédiées aux chiens. Hors saison (octobre-mai), la plupart des plages sont entièrement ouvertes aux chiens.',
        'Le quartier de Matosinhos, au nord du centre-ville, est l\'un des plus accueillants pour les chiens : rues larges, marché aux poissons et front de mer que les propriétaires de chiens utilisent quotidiennement.',
        'Les tramways (lignes vintage 1, 18, 22) acceptent les petits chiens en transport ; les grands chiens avec laisse sont généralement acceptés par les conducteurs. Renseignez-vous avant de monter.',
        'La culture des cafés à Porto est ouverte aux chiens : la plupart des pastelarias et cafés acceptent les chiens en terrasse, et beaucoup — surtout à Foz et Bonfim — les accueillent à l\'intérieur.',
      ],
      es: [
        'Las colinas de Oporto son empinadas — la ciudad sube dramáticamente desde el río hasta los barrios altos. Los perros pequeños pueden llevarse en brazos; para razas grandes, planifique rutas que usen el funicular o quédese en los paseos planos junto al río.',
        'Acceso a la playa para perros: la playa de Matosinhos (adyacente a Oporto) tiene zonas dedicadas a perros. En temporada baja (octubre-mayo), la mayoría de playas están completamente abiertas a los perros.',
        'El barrio de Matosinhos, al norte del centro de la ciudad, es uno de los más amigables para perros: calles amplias, mercado de pescado y un frente marítimo que los dueños de perros usan a diario.',
        'Los tranvías (líneas vintage 1, 18, 22) admiten perros pequeños en transportín; los perros grandes con correa suelen ser aceptados por los conductores. Pregunte antes de subir.',
        'La cultura del café en Oporto está abierta a los perros: la mayoría de pastelerías y cafés permiten perros en la terraza, y muchos — especialmente en Foz y Bonfim — los acogen dentro.',
      ],
    },
    practicalInfo: {
      en: [
        'Emergency vet: Hospital Veterinário do Porto, Rua da Constituição (+351 22 537 0937) — 24-hour service in the city centre.',
        'Getting there: Porto Francisco Sá Carneiro Airport is 15km north of the centre. The Metro line E connects it in 30 minutes. Dogs in carriers are accepted on the Metro; larger dogs travel on a lead.',
        'From Spain: direct trains from Vigo (2h) and Madrid (9h Lusitânia night train) via CP/Renfe. Dogs allowed with muzzle and lead.',
        'Best season: May–June and September–October for the best balance of weather, beach access and manageable tourist numbers.',
      ],
      fr: [
        'Vétérinaire d\'urgence : Hospital Veterinário do Porto, Rua da Constituição (+351 22 537 0937) — service 24h/24 au centre-ville.',
        'Accès : l\'aéroport Francisco Sá Carneiro de Porto est à 15 km au nord du centre. La ligne E du métro le relie en 30 minutes. Les chiens en transport sont acceptés dans le métro ; les grands chiens voyagent en laisse.',
        'Depuis l\'Espagne : trains directs depuis Vigo (2h) et Madrid (9h train de nuit Lusitânia) via CP/Renfe. Les chiens sont autorisés avec muselière et laisse.',
        'Meilleure saison : mai-juin et septembre-octobre pour le meilleur équilibre entre météo, accès à la plage et affluence touristique raisonnable.',
      ],
      es: [
        'Veterinario de urgencias: Hospital Veterinário do Porto, Rua da Constituição (+351 22 537 0937) — servicio 24h en el centro de la ciudad.',
        'Cómo llegar: el aeropuerto Francisco Sá Carneiro de Oporto está a 15 km al norte del centro. La línea E del metro conecta en 30 minutos. Los perros en transportín se admiten en el metro; los perros grandes viajan con correa.',
        'Desde España: trenes directos desde Vigo (2h) y Madrid (9h tren nocturno Lusitânia) vía CP/Renfe. Los perros están permitidos con bozal y correa.',
        'Mejor temporada: mayo-junio y septiembre-octubre para el mejor equilibrio entre clima, acceso a la playa y afluencia turística manejable.',
      ],
    },
  },

  nice: {
    history: {
      en: 'Nice — the capital of the French Riviera and France\'s fifth-largest city — has been a haven for well-heeled travellers and their pets since the 19th century, when English aristocrats wintering on the Côte d\'Azur made the Promenade des Anglais their daily constitutional. Today the city\'s 342,000 inhabitants share it with a substantial dog population drawn by the Mediterranean climate, the long pebbly beach and the easy access to the hills of the Alpes-Maritimes. Dogs are accepted in the city\'s many outdoor café terraces and restaurants; the old town (Vieux-Nice) is lively and navigable year-round with a well-socialised dog.',
      fr: 'Nice — capitale de la Côte d\'Azur et cinquième ville de France — est une villégiature pour les voyageurs aisés et leurs animaux depuis le XIXe siècle, quand les aristocrates britanniques hivernant sur la Riviera faisaient de la Promenade des Anglais leur promenade quotidienne. Aujourd\'hui, ses 342 000 habitants partagent la ville avec une importante population canine attirée par le climat méditerranéen, la longue plage de galets et l\'accès facile aux collines des Alpes-Maritimes.',
      es: 'Niza — capital de la Costa Azul y quinta ciudad de Francia — ha sido un refugio para viajeros con mascotas desde el siglo XIX, cuando los aristócratas británicos que pasaban el invierno en la Riviera convertían el Paseo de los Ingleses en su paseo diario. Hoy, sus 342.000 habitantes comparten la ciudad con una importante población canina atraída por el clima mediterráneo, la larga playa de guijarros y el fácil acceso a las colinas de los Alpes Marítimos.',
    },
    sights: [
      {
        name: 'Promenade des Anglais',
        emoji: '🌊',
        petFriendly: true,
        desc: {
          en: 'The iconic 7km seafront promenade is one of Europe\'s great dog walks. Wide, flat, sea-breezy and busy with locals at all hours. Dogs on lead; the pebble beach is accessible but mostly without dedicated dog areas in summer.',
          fr: 'La célèbre promenade de 7 km en bord de mer est l\'une des grandes promenades canines d\'Europe. Large, plate, ventée et animée à toute heure. Chiens en laisse ; la plage de galets est accessible mais sans zones canines dédiées en été.',
          es: 'El icónico paseo marítimo de 7 km es uno de los grandes paseos caninos de Europa. Amplio, llano, con brisa marina y animado a todas horas. Perros con correa; la playa de guijarros es accesible pero sin zonas caninas específicas en verano.',
        },
      },
      {
        name: 'Colline du Château',
        emoji: '🏰',
        petFriendly: true,
        desc: {
          en: 'The hilltop park overlooking the old town and the sea is a favourite with Nice dog owners. Shaded paths, a waterfall, open terraces and sweeping views — and almost always a breeze even in July. Reach it on foot from the old port or via the free lift.',
          fr: 'Le parc sur la colline surplombant la vieille ville et la mer est le favori des promeneurs avec chiens à Nice. Sentiers ombragés, cascade, terrasses ouvertes et vues panoramiques — et presque toujours une brise même en juillet. Accessible à pied depuis le vieux port ou par l\'ascenseur gratuit.',
          es: 'El parque en la colina que domina el casco antiguo y el mar es el favorito de los dueños de perros de Niza. Senderos sombreados, cascada, terrazas abiertas y vistas panorámicas — y casi siempre hay brisa incluso en julio. Se llega a pie desde el puerto viejo o en el ascensor gratuito.',
        },
      },
      {
        name: 'Vieux-Nice (Old Town)',
        emoji: '🍋',
        petFriendly: true,
        desc: {
          en: 'The baroque old town — all orange and yellow ochre façades, flower market and Socca stalls — is navigable with a calm dog. Most café terraces welcome dogs and the streets are narrow but not overwhelmingly so outside August.',
          fr: 'La vieille ville baroque — façades orange et jaune, marché aux fleurs et stands de socca — est praticable avec un chien calme. La plupart des terrasses accueillent les chiens et les ruelles sont étroites mais pas envahissantes hors du mois d\'août.',
          es: 'El casco antiguo barroco — fachadas naranja y amarillo ocre, mercado de flores y puestos de socca — es transitable con un perro tranquilo. La mayoría de terrazas admiten perros y las calles son estrechas pero no agobiantes fuera de agosto.',
        },
      },
      {
        name: 'Parc du Mont-Boron',
        emoji: '🌲',
        petFriendly: true,
        desc: {
          en: 'The 340-hectare forested park east of the city is Nice\'s best escape from the heat. Pine forest trails, sea views and a military fort at the summit. Dogs off-lead in most areas; very popular with local runners and their dogs at weekends.',
          fr: 'Le parc forestier de 340 hectares à l\'est de la ville est la meilleure échappatoire à la chaleur niçoise. Sentiers en forêt de pins, vues sur la mer et fort militaire au sommet. Chiens en liberté dans la plupart des zones ; très apprécié des coureurs locaux et de leurs chiens le week-end.',
          es: 'El parque forestal de 340 hectáreas al este de la ciudad es el mejor escape del calor de Niza. Senderos entre pinos, vistas al mar y un fuerte militar en la cima. Perros libres en la mayoría de zonas; muy popular entre los corredores locales y sus perros los fines de semana.',
        },
      },
      {
        name: 'Musée Matisse & Musée d\'Art Moderne',
        emoji: '🎨',
        petFriendly: false,
        desc: {
          en: 'Nice\'s museums are not accessible to dogs. The Matisse museum gardens (outside) are dog-friendly and offer a pleasant stroll in the Cimiez neighbourhood.',
          fr: 'Les musées de Nice ne sont pas accessibles aux chiens. Les jardins extérieurs du musée Matisse sont ouverts aux chiens et offrent une agréable promenade dans le quartier Cimiez.',
          es: 'Los museos de Niza no son accesibles para perros. Los jardines exteriores del museo Matisse están abiertos a los perros y ofrecen un agradable paseo por el barrio de Cimiez.',
        },
      },
    ],
    petTips: {
      en: [
        'Nice beaches are mostly pebble and private concessions in summer. Dogs are banned from most main beaches June–September. Coco Beach (east of the port) has a small dog area in season.',
        'The city tram (Ligne 1 and 2) does not allow dogs — use it alone for museum visits. Taxis and ride-share apps allow dogs at driver discretion.',
        'Arrière-pays excursion: the hinterland villages (Èze, La Turbie, Peille) are outstanding half-day trips with dogs — cool air, quiet trails and universally dog-friendly terraces.',
        'Summer heat on the Promenade can reach 38°C. Pavement and pebbles overheat quickly. Walk before 9am; carry water and a portable bowl at all times.',
        'Monaco day trip (20 min by train): dogs on lead are permitted in the Jardins Exotiques and on the Rocher. The casino and palace gardens are strictly no dogs.',
      ],
      fr: [
        'Les plages de Nice sont principalement des galets et des concessions privées en été. Les chiens sont interdits sur la plupart des plages principales de juin à septembre. Coco Beach (à l\'est du port) dispose d\'un espace canin en saison.',
        'Le tramway (lignes 1 et 2) n\'accepte pas les chiens — utilisez-le seul pour les visites de musées. Les taxis et applications de VTC acceptent les chiens à la discrétion du conducteur.',
        'Excursion dans l\'arrière-pays : les villages du hinterland (Èze, La Turbie, Peille) sont d\'excellentes demi-journées avec un chien — air frais, sentiers tranquilles et terrasses universellement accueillantes.',
        'La chaleur estivale sur la Promenade peut atteindre 38°C. Les trottoirs et les galets surchauffent rapidement. Promenez-vous avant 9h ; emportez de l\'eau et un bol portable en permanence.',
        'Excursion à Monaco (20 min en train) : les chiens en laisse sont admis dans les Jardins Exotiques et sur le Rocher. Les jardins du casino et du palais sont strictement interdits aux chiens.',
      ],
      es: [
        'Las playas de Niza son principalmente de guijarros y concesiones privadas en verano. Los perros están prohibidos en la mayoría de playas principales de junio a septiembre. Coco Beach (al este del puerto) tiene una zona canina en temporada.',
        'El tranvía (líneas 1 y 2) no admite perros — úselo solo para visitas a museos. Los taxis y aplicaciones de VTC admiten perros a discreción del conductor.',
        'Excursión al hinterland: los pueblos del interior (Èze, La Turbie, Peille) son excelentes medias jornadas con perro — aire fresco, senderos tranquilos y terrazas universalmente acogedoras.',
        'El calor estival en el Paseo puede alcanzar los 38°C. Las aceras y los guijarros se calientan rápidamente. Pasee antes de las 9h; lleve siempre agua y un cuenco portátil.',
        'Excursión a Mónaco (20 min en tren): los perros con correa están permitidos en los Jardines Exóticos y en la Roca. Los jardines del casino y del palacio son estrictamente sin perros.',
      ],
    },
    practicalInfo: {
      en: [
        'Emergency vet: Centre Hospitalier Vétérinaire Saint-Martin, Nice (+33 4 93 53 04 04) — 24-hour facility on the eastern edge of the city.',
        'Getting there: Nice Côte d\'Azur Airport is 7km from the centre. The Tramway Line 2 connects in 25 minutes. Dogs in carriers allowed on the tram.',
        'Train connections: Nice-Ville station connects to Paris (5h30 TGV), Marseille (2h30) and the scenic Côte d\'Azur local line (Menton, Monaco, Cannes, Antibes — all dog-friendly in terms of access).',
        'Best season: May–June and September–October. The Promenade is spectacular in all seasons but summer crowds and beach restrictions make autumn the sweet spot for dog owners.',
      ],
      fr: [
        'Vétérinaire d\'urgence : Centre Hospitalier Vétérinaire Saint-Martin, Nice (+33 4 93 53 04 04) — établissement 24h/24 à l\'est de la ville.',
        'Accès : l\'aéroport de Nice Côte d\'Azur est à 7 km du centre. La ligne 2 du tramway relie en 25 minutes. Les chiens en transport sont acceptés dans le tramway.',
        'Connexions ferroviaires : la gare de Nice-Ville est reliée à Paris (5h30 TGV), Marseille (2h30) et la pittoresque ligne locale de la Côte d\'Azur (Menton, Monaco, Cannes, Antibes — toutes accessibles aux chiens).',
        'Meilleure saison : mai-juin et septembre-octobre. La Promenade est spectaculaire en toute saison, mais les foules estivales et les restrictions sur les plages font de l\'automne la période idéale pour les propriétaires de chiens.',
      ],
      es: [
        'Veterinario de urgencias: Centre Hospitalier Vétérinaire Saint-Martin, Niza (+33 4 93 53 04 04) — centro 24h al este de la ciudad.',
        'Cómo llegar: el aeropuerto de Niza Côte d\'Azur está a 7 km del centro. La línea 2 del tranvía conecta en 25 minutos. Los perros en transportín están admitidos en el tranvía.',
        'Conexiones ferroviarias: la estación de Niza-Ville conecta con París (5h30 TGV), Marsella (2h30) y la pintoresca línea local de la Costa Azul (Menton, Mónaco, Cannes, Antibes — todas accesibles para perros).',
        'Mejor temporada: mayo-junio y septiembre-octubre. El Paseo es espectacular en todas las estaciones, pero las multitudes estivales y las restricciones de playa hacen del otoño el momento ideal para los dueños de perros.',
      ],
    },
  },

  lyon: {
    history: {
      en: 'Lyon — France\'s second city by economic weight, often called the gastronomic capital of the world — sits at the confluence of the Rhône and Saône rivers. With 500,000 inhabitants and a dense network of traboules (covered passageways), hillside parks and riverside quays, Lyon is as good for dog owners as it is for food lovers. The city\'s UNESCO-listed Vieux Lyon and the Fourvière hill offer contrasting dog walk environments: tight medieval lanes below, open gardens and Roman ruins above. Lyonnais take their dogs to the bouchons (traditional bistros) as a matter of course.',
      fr: 'Lyon — deuxième ville de France par le poids économique, souvent qualifiée de capitale gastronomique mondiale — est à la confluence du Rhône et de la Saône. Avec 500 000 habitants, un dense réseau de traboules, des parcs en pente et des quais fluviaux, Lyon est aussi accueillante pour les propriétaires de chiens que pour les amateurs de bonne cuisine. Le Vieux-Lyon classé à l\'UNESCO et la colline de Fourvière offrent des environnements de promenade contrastés : ruelles médiévales étroites en bas, jardins ouverts et ruines romaines en haut.',
      es: 'Lyon — segunda ciudad de Francia por peso económico, a menudo llamada capital gastronómica mundial — se asienta en la confluencia del Ródano y el Saona. Con 500.000 habitantes, una densa red de traboules (pasajes cubiertos), parques en pendiente y paseos fluviales, Lyon es tan acogedora para los dueños de perros como para los amantes de la buena mesa. Los lioneses llevan a sus perros a los bouchons (bistros tradicionales) como algo natural.',
    },
    sights: [
      {
        name: 'Parc de la Tête d\'Or',
        emoji: '🌹',
        petFriendly: true,
        desc: {
          en: 'Lyon\'s magnificent 117-hectare park — with a lake, rose garden, and a free zoo — is the city\'s premier dog destination. Dogs on lead welcome throughout; the lakeside paths and open meadows make it ideal for long walks morning or evening.',
          fr: 'Le magnifique parc de 117 hectares de Lyon — avec un lac, une roseraie et un zoo gratuit — est la destination canine principale de la ville. Chiens en laisse bienvenus partout ; les allées au bord du lac et les prairies ouvertes en font un lieu idéal pour de longues promenades matin et soir.',
          es: 'El magnífico parque de 117 hectáreas de Lyon — con un lago, un jardín de rosas y un zoo gratuito — es el principal destino canino de la ciudad. Perros con correa bienvenidos en todas partes; los senderos junto al lago y las praderas abiertas lo hacen ideal para largos paseos mañana y tarde.',
        },
      },
      {
        name: 'Colline de Fourvière',
        emoji: '⛪',
        petFriendly: true,
        desc: {
          en: 'The hilltop above old Lyon, topped by the Fourvière basilica and Roman amphitheatre ruins, is a superb elevated dog walk. The Jardin du Rosaire leads up through terraced gardens with views over the city. Most of the hill\'s gardens are accessible with dogs on lead.',
          fr: 'La colline surplombant le vieux Lyon, couronnée par la basilique de Fourvière et les ruines d\'un amphithéâtre romain, est une superbe promenade canine en altitude. Le Jardin du Rosaire monte à travers des jardins en terrasses avec des vues sur la ville. La plupart des jardins de la colline sont accessibles avec des chiens en laisse.',
          es: 'La colina sobre el Lyon antiguo, coronada por la basílica de Fourvière y las ruinas de un anfiteatro romano, es un magnífico paseo canino en altura. El Jardín del Rosario asciende por jardines en terrazas con vistas a la ciudad. La mayoría de los jardines de la colina son accesibles con perros con correa.',
        },
      },
      {
        name: 'Quais du Rhône & Saône',
        emoji: '🚴',
        petFriendly: true,
        desc: {
          en: 'The redeveloped riverside quays on both rivers are Lyon\'s most popular outdoor spaces. Flat, wide, shaded in parts and lined with cafés and food trucks — the Berges du Rhône on the left bank are especially dog-friendly, with water points and open lawns.',
          fr: 'Les quais réaménagés sur les deux fleuves sont les espaces extérieurs les plus populaires de Lyon. Plats, larges, partiellement ombragés et bordés de cafés et food trucks — les Berges du Rhône sur la rive gauche sont particulièrement accueillantes pour les chiens, avec des points d\'eau et des pelouses.',
          es: 'Los paseos fluviales rehabilitados en ambos ríos son los espacios exteriores más populares de Lyon. Llanos, amplios, parcialmente sombreados y bordeados de cafés y food trucks — las Berges del Ródano en la orilla izquierda son especialmente amigables para perros, con puntos de agua y praderas.',
        },
      },
      {
        name: 'Vieux-Lyon (St-Jean & St-Georges)',
        emoji: '🏛️',
        petFriendly: true,
        desc: {
          en: 'The UNESCO-listed Renaissance district below Fourvière is navigable with a dog, especially in the early morning or off-season. The traboules (hidden passageways) are accessible; dogs must be on lead in the narrow streets. Bouchons generally welcome dogs at outdoor tables.',
          fr: 'Le quartier Renaissance classé à l\'UNESCO sous Fourvière est praticable avec un chien, surtout tôt le matin ou hors saison. Les traboules (passages couverts) sont accessibles ; les chiens doivent être en laisse dans les ruelles. Les bouchons accueillent généralement les chiens aux tables extérieures.',
          es: 'El barrio renacentista declarado Patrimonio Mundial bajo Fourvière es transitable con un perro, especialmente por la mañana temprano o fuera de temporada. Las traboules (pasajes cubiertos) son accesibles; los perros deben ir con correa en las calles estrechas. Los bouchons generalmente admiten perros en las mesas exteriores.',
        },
      },
      {
        name: 'Musée des Beaux-Arts & Musée Lumière',
        emoji: '🎬',
        petFriendly: false,
        desc: {
          en: 'Museums in Lyon do not allow dogs. The courtyard of the Musée des Beaux-Arts (former Benedictine abbey) is accessible for a look from the garden side. The Lumière gardens are dog-friendly.',
          fr: 'Les musées lyonnais n\'acceptent pas les chiens. La cour intérieure du Musée des Beaux-Arts (ancienne abbaye bénédictine) est accessible pour un aperçu depuis le jardin. Les jardins Lumière sont ouverts aux chiens.',
          es: 'Los museos de Lyon no admiten perros. El patio del Musée des Beaux-Arts (antigua abadía benedictina) es accesible para una visita desde el jardín. Los jardines Lumière admiten perros.',
        },
      },
    ],
    petTips: {
      en: [
        'Lyon\'s TCL metro and tram allow dogs in carriers only. The extensive bus network allows small dogs in carriers; larger dogs with muzzle at driver discretion.',
        'Bouchons (traditional Lyon bistros) are among France\'s most dog-friendly restaurants — it\'s common to see dogs under the table at lunch. Always ask "Est-ce que je peux venir avec mon chien ?" first.',
        'The Croix-Rousse hill (the "hill that works," historically the silk-weaving district) has excellent dog-walking streets, independent cafés and a great Saturday market. Much quieter than Fourvière.',
        'Parc de la Tête d\'Or has free water points throughout. The lake area is popular for swimming (dogs included in some areas in early morning before the park fills).',
        'Lyon gets cold in winter but the covered traboules and indoor bouchon culture make it one of France\'s best off-season city breaks for dog owners.',
      ],
      fr: [
        'Le métro et le tramway TCL de Lyon n\'acceptent les chiens qu\'en transport. Le réseau de bus accepte les petits chiens en transport ; les grands chiens avec muselière à la discrétion du conducteur.',
        'Les bouchons (bistrots traditionnels lyonnais) sont parmi les restaurants les plus accueillants pour les chiens en France — il est courant de voir des chiens sous la table au déjeuner. Demandez toujours "Est-ce que je peux venir avec mon chien ?" en premier.',
        'La colline de la Croix-Rousse (la colline "qui travaille", historiquement le quartier des canuts) offre d\'excellentes rues de promenade, des cafés indépendants et un excellent marché du samedi. Beaucoup plus calme que Fourvière.',
        'Le parc de la Tête d\'Or dispose de points d\'eau gratuits partout. La zone du lac est populaire pour la baignade (chiens inclus dans certaines zones tôt le matin avant que le parc ne se remplisse).',
        'Lyon est froide en hiver mais les traboules couvertes et la culture bouchon font de Lyon l\'une des meilleures escapades citadines hors saison pour les propriétaires de chiens en France.',
      ],
      es: [
        'El metro y el tranvía TCL de Lyon solo admiten perros en transportín. La red de autobuses admite perros pequeños en transportín; perros grandes con bozal a discreción del conductor.',
        'Los bouchons (bistros tradicionales lioneses) están entre los restaurantes más acogedores para perros en Francia — es habitual ver perros bajo la mesa al mediodía. Pregunte siempre "Est-ce que je peux venir avec mon chien?" primero.',
        'La colina de Croix-Rousse (la colina "que trabaja", históricamente el barrio de los tejedores de seda) tiene excelentes calles para pasear, cafés independientes y un magnífico mercado de sábado. Mucho más tranquila que Fourvière.',
        'El parque de la Tête d\'Or tiene puntos de agua gratuitos por todo el recinto. La zona del lago es popular para nadar (perros incluidos en algunas zonas temprano por la mañana antes de que se llene el parque).',
        'Lyon es fría en invierno, pero las traboules cubiertas y la cultura del bouchon la convierten en una de las mejores escapadas urbanas fuera de temporada para dueños de perros en Francia.',
      ],
    },
    practicalInfo: {
      en: [
        'Emergency vet: VetaLyon, 79 Rue des Mûriers, Lyon 8e (+33 4 37 47 00 00) — 24-hour specialist animal hospital.',
        'Getting there: Lyon Part-Dieu and Lyon Perrache stations connect to Paris (2h TGV), Marseille (1h40), Geneva (2h) and beyond. Dogs in carriers free on TGV; larger dogs pay a reduced fare.',
        'Lyon is perfectly placed for a multi-city trip: Grenoble (1h30), Annecy (2h by car) and Burgundy wine country (1h north) all make excellent dog-friendly day trips.',
        'Food market tip: Les Halles de Lyon Paul Bocuse allow dogs in the covered market hall — a rare privilege for a food market of this scale.',
      ],
      fr: [
        'Vétérinaire d\'urgence : VetaLyon, 79 rue des Mûriers, Lyon 8e (+33 4 37 47 00 00) — hôpital animalier spécialisé ouvert 24h/24.',
        'Accès : les gares de Lyon Part-Dieu et Lyon Perrache sont reliées à Paris (2h TGV), Marseille (1h40), Genève (2h) et au-delà. Chiens en transport gratuits sur TGV ; les grands chiens paient un tarif réduit.',
        'Lyon est idéalement placée pour un voyage multi-villes : Grenoble (1h30), Annecy (2h en voiture) et la Bourgogne (1h au nord) sont d\'excellentes excursions d\'une journée.',
        'Bon plan marché : les Halles de Lyon Paul Bocuse acceptent les chiens dans le hall couvert — un privilège rare pour un marché de cette envergure.',
      ],
      es: [
        'Veterinario de urgencias: VetaLyon, 79 Rue des Mûriers, Lyon 8e (+33 4 37 47 00 00) — hospital animal especializado 24h.',
        'Cómo llegar: las estaciones de Lyon Part-Dieu y Lyon Perrache conectan con París (2h TGV), Marsella (1h40), Ginebra (2h) y más destinos. Perros en transportín gratis en TGV; los perros grandes pagan tarifa reducida.',
        'Lyon está perfectamente ubicada para un viaje multi-ciudad: Grenoble (1h30), Annecy (2h en coche) y la Borgoña vinícola (1h al norte) son excelentes excursiones de un día.',
        'Consejo de mercado: las Halles de Lyon Paul Bocuse admiten perros en el mercado cubierto — un privilegio poco común para un mercado de esta escala.',
      ],
    },
  },

  bordeaux: {
    history: {
      en: 'Bordeaux — the "sleeping beauty" famously woken by Alain Juppé\'s mayoral renovation in the 1990s — is now one of France\'s most liveable cities. Its UNESCO-listed 18th-century riverfront, its wine culture and its Atlantic-influenced climate draw over five million visitors a year. Dogs have always been part of Bordeaux life: the Girondins tradition of long Sunday walks along the Garonne, the wine estate (château) culture where working dogs guard the vines, and the outdoor café life of the Chartrons antiques district all make Bordeaux one of France\'s most dog-welcoming cities.',
      fr: 'Bordeaux — la "belle endormie" réveillée par la rénovation municipale d\'Alain Juppé dans les années 1990 — est aujourd\'hui l\'une des villes les plus agréables de France. Son front de Garonne classé à l\'UNESCO, sa culture viticole et son climat atlantique attirent plus de cinq millions de visiteurs par an. Les chiens ont toujours fait partie de la vie bordelaise : la tradition girondine des longues promenades du dimanche le long de la Garonne, la culture des châteaux viticoles et la vie de café en plein air du quartier des Chartrons en font l\'une des villes françaises les plus accueillantes pour les chiens.',
      es: 'Burdeos — la "bella durmiente" despertada por la renovación municipal de Alain Juppé en los años 90 — es hoy una de las ciudades más habitables de Francia. Su frente fluvial del siglo XVIII declarado Patrimonio Mundial, su cultura vinícola y su clima atlántico atraen a más de cinco millones de visitantes al año. Los perros siempre han formado parte de la vida bordelesa: la tradición girondina de largos paseos dominicales a orillas del Garona, la cultura de los châteaux vinícolas y la vida de café al aire libre del barrio de Chartrons la convierten en una de las ciudades francesas más acogedoras para perros.',
    },
    sights: [
      {
        name: 'Quais de la Garonne & Darwin Ecosystem',
        emoji: '🚲',
        petFriendly: true,
        desc: {
          en: 'The redesigned 4.5km riverfront quays are Bordeaux\'s great outdoor living room. Flat, wide and shaded by plane trees, they connect the Miroir d\'Eau (the world\'s largest reflecting pool — dogs wade in it daily) to the Darwin Ecosystem, a converted barracks with organic market, skate park and dog-friendly café terrace.',
          fr: 'Les quais réaménagés sur 4,5 km sont le grand salon en plein air de Bordeaux. Plats, larges et ombragés par des platanes, ils relient le Miroir d\'Eau (le plus grand miroir d\'eau du monde — les chiens y pataugent quotidiennement) au Darwin Ecosystème, une caserne reconvertie avec marché bio, skate park et terrasse de café chien-friendly.',
          es: 'Los paseos fluviales rehabilitados de 4,5 km son el gran salón exterior de Burdeos. Llanos, amplios y sombreados por plátanos, conectan el Miroir d\'Eau (el mayor espejo de agua del mundo — los perros chapotean en él a diario) con el Darwin Ecosystème, un cuartel reconvertido con mercado ecológico, skate park y terraza de café para perros.',
        },
      },
      {
        name: 'Parc Bordelais',
        emoji: '🌳',
        petFriendly: true,
        desc: {
          en: 'Bordeaux\'s main city park — 28 hectares of oak and chestnut woodland, a lake and dedicated off-leash areas. Extremely popular with local dog owners on weekend mornings. The rose garden and children\'s play area are lead-required zones.',
          fr: 'Le principal parc de Bordeaux — 28 hectares de chênes et châtaigniers, un lac et des zones en liberté dédiées. Extrêmement populaire auprès des propriétaires de chiens locaux le week-end matin. La roseraie et l\'espace de jeux pour enfants sont des zones en laisse obligatoire.',
          es: 'El principal parque de Burdeos — 28 hectáreas de robles y castaños, un lago y zonas de libertad dedicadas. Muy popular entre los dueños de perros locales las mañanas de fin de semana. El jardín de rosas y la zona de juegos infantiles son zonas con correa obligatoria.',
        },
      },
      {
        name: 'Quartier des Chartrons',
        emoji: '🍷',
        petFriendly: true,
        desc: {
          en: 'The antiques and wine merchant district north of the Quinconces is Bordeaux at its most relaxed. Sunday market, independent wine shops (caves) that often welcome dogs inside, and shaded street cafés where dogs are as normal a sight as wine glasses.',
          fr: 'Le quartier des antiquaires et des négociants en vin au nord des Quinconces est Bordeaux dans ce qu\'elle a de plus décontracté. Marché du dimanche, caves indépendantes qui accueillent souvent les chiens à l\'intérieur, et cafés de rue ombragés où les chiens sont aussi ordinaires que les verres de vin.',
          es: 'El barrio de anticuarios y comerciantes de vino al norte de los Quinconces es Burdeos en su versión más relajada. Mercado dominical, tiendas de vino independientes (caves) que a menudo admiten perros dentro, y cafés de calle sombreados donde los perros son tan habituales como las copas de vino.',
        },
      },
      {
        name: 'Lac de Bordeaux (Parc du Lac)',
        emoji: '🏊',
        petFriendly: true,
        desc: {
          en: 'The city\'s artificial lake north of the centre is ringed by a 10km path ideal for jogging and dog walks. Off-leash areas exist around the lake perimeter; in summer, the beach area has a dog zone separate from the main swimming beach.',
          fr: 'Le lac artificiel au nord du centre est entouré d\'un parcours de 10 km idéal pour les courses et les promenades canines. Des zones en liberté existent sur le pourtour du lac ; en été, la zone de plage dispose d\'un espace canin séparé de la plage principale.',
          es: 'El lago artificial al norte del centro está rodeado por un camino de 10 km ideal para correr y pasear con perros. Hay zonas de libertad alrededor del perímetro del lago; en verano, la zona de playa tiene un área canina separada de la playa principal.',
        },
      },
      {
        name: 'Cité du Vin',
        emoji: '🍾',
        petFriendly: false,
        desc: {
          en: 'The spectacular wine museum is not accessible to dogs. The riverside gardens and terraces of the Cité du Vin are dog-friendly; the rooftop bar (with views over the river) welcomes dogs on its terrace.',
          fr: 'Le spectaculaire musée du vin n\'est pas accessible aux chiens. Les jardins et terrasses en bord de fleuve de la Cité du Vin sont ouverts aux chiens ; le bar du belvédère (avec vue sur le fleuve) accueille les chiens sur sa terrasse.',
          es: 'El espectacular museo del vino no es accesible para perros. Los jardines y terrazas fluviales de la Cité du Vin admiten perros; el bar del mirador (con vistas al río) acoge perros en su terraza.',
        },
      },
    ],
    petTips: {
      en: [
        'Bordeaux tram (lines A–D): dogs in carriers accepted on all lines. Larger dogs need a muzzle and a child fare ticket. The tram is the main way to cross the city.',
        'Wine estate day trip: the Médoc, Saint-Émilion and Entre-Deux-Mers are all within 45 minutes by car. Many châteaux welcome dogs on their estate walks and vineyard tours — call ahead to confirm.',
        'The Miroir d\'Eau is Bordeaux\'s most famous sight and a genuine dog magnet — the shallow water (2cm at most) is refreshing in summer and dogs wade freely. Go early to avoid the crowd.',
        'Arcachon Bay (Bassin d\'Arcachon) is 45 minutes by train: the town has dog-friendly beaches, boat trips to the Dune du Pilat (dogs allowed outside July–August) and an excellent oyster market.',
        'Atlantic climate: Bordeaux is wetter and cooler than Provence. A waterproof dog coat and towel are worthwhile companions in spring and autumn.',
      ],
      fr: [
        'Tramway de Bordeaux (lignes A–D) : les chiens en transport sont acceptés sur toutes les lignes. Les grands chiens ont besoin d\'une muselière et d\'un billet tarif enfant. Le tramway est le principal moyen de traverser la ville.',
        'Excursion dans les vignobles : le Médoc, Saint-Émilion et l\'Entre-Deux-Mers sont tous à 45 minutes en voiture. De nombreux châteaux accueillent les chiens lors de leurs promenades dans le domaine et des visites de chais — appelez à l\'avance pour confirmer.',
        'Le Miroir d\'Eau est le site le plus célèbre de Bordeaux et un véritable aimant pour les chiens — l\'eau peu profonde (2 cm au maximum) est rafraîchissante en été et les chiens y pataugent librement. Arrivez tôt pour éviter la foule.',
        'Le Bassin d\'Arcachon est à 45 minutes en train : la ville dispose de plages canines, de balades en bateau jusqu\'à la Dune du Pilat (chiens admis hors juillet-août) et d\'un excellent marché aux huîtres.',
        'Climat atlantique : Bordeaux est plus humide et plus fraîche que la Provence. Un imperméable pour chien et une serviette sont des compagnons précieux au printemps et en automne.',
      ],
      es: [
        'Tranvía de Burdeos (líneas A–D): perros en transportín admitidos en todas las líneas. Los perros grandes necesitan bozal y billete tarifa infantil. El tranvía es el principal medio para cruzar la ciudad.',
        'Excursión por las bodegas: el Médoc, Saint-Émilion y Entre-Deux-Mers están todos a 45 minutos en coche. Muchos châteaux acogen perros en sus paseos por la finca y visitas a las bodegas — llame con antelación para confirmar.',
        'El Miroir d\'Eau es el lugar más famoso de Burdeos y un auténtico imán para perros — el agua poco profunda (2 cm como máximo) es refrescante en verano y los perros chapotean libremente. Vaya temprano para evitar la multitud.',
        'La Bahía de Arcachon (Bassin d\'Arcachon) está a 45 minutos en tren: la ciudad tiene playas caninas, paseos en barco hasta la Duna del Pilat (perros permitidos fuera de julio-agosto) y un excelente mercado de ostras.',
        'Clima atlántico: Burdeos es más húmeda y fresca que la Provenza. Un impermeable para perro y una toalla son compañeros valiosos en primavera y otoño.',
      ],
    },
    practicalInfo: {
      en: [
        'Emergency vet: Clinique Vétérinaire des Hauts de Garonne, Bègles (+33 5 56 49 19 19) — 24-hour facility south of the city centre.',
        'Getting there: Bordeaux-Saint-Jean station connects to Paris (2h TGV), Lyon (2h), and Spain (Irun connection for San Sebastián and Madrid). Dogs in carriers free on TGV; larger dogs pay a reduced fare.',
        'Bordeaux airport (BOD) is 10km west. The BUS LIANE 1 connects to the centre in 50 minutes. Dogs in carriers allowed on city buses.',
        'Best season: May–June and September–October for wine harvest season. The vendanges (harvest) period in September is particularly atmospheric and many estates organise dog-friendly open days.',
      ],
      fr: [
        'Vétérinaire d\'urgence : Clinique Vétérinaire des Hauts de Garonne, Bègles (+33 5 56 49 19 19) — établissement 24h/24 au sud du centre-ville.',
        'Accès : la gare de Bordeaux-Saint-Jean est reliée à Paris (2h TGV), Lyon (2h) et l\'Espagne (connexion Irun pour Saint-Sébastien et Madrid). Chiens en transport gratuits sur TGV ; les grands chiens paient un tarif réduit.',
        'L\'aéroport de Bordeaux (BOD) est à 10 km à l\'ouest. Le BUS LIANE 1 relie en 50 minutes. Les chiens en transport sont acceptés dans les bus de ville.',
        'Meilleure saison : mai-juin et septembre-octobre pour les vendanges. La période des vendanges en septembre est particulièrement atmosphérique et de nombreux domaines organisent des journées portes ouvertes.',
      ],
      es: [
        'Veterinario de urgencias: Clinique Vétérinaire des Hauts de Garonne, Bègles (+33 5 56 49 19 19) — centro 24h al sur del centro de la ciudad.',
        'Cómo llegar: la estación de Bordeaux-Saint-Jean conecta con París (2h TGV), Lyon (2h) y España (conexión Irun para San Sebastián y Madrid). Perros en transportín gratis en TGV; los perros grandes pagan tarifa reducida.',
        'El aeropuerto de Burdeos (BOD) está a 10 km al oeste. El BUS LIANE 1 conecta con el centro en 50 minutos. Los perros en transportín están admitidos en los autobuses de ciudad.',
        'Mejor temporada: mayo-junio y septiembre-octubre para la vendimia. El período de la vendimia en septiembre es especialmente atmosférico y muchas bodegas organizan jornadas de puertas abiertas.',
      ],
    },
  },

  copenhagen: {
    history: {
      en: 'Copenhagen — consistently ranked among the world\'s most liveable cities — is also one of Europe\'s most dog-friendly capitals. Danes have a deep and unsentimental relationship with their dogs: Copenhageners cycle with dogs in cargo bikes, take them to work, and bring them to the city\'s many dog-friendly cafés and restaurants as a matter of course. The city\'s commitment to cycling infrastructure, its network of harbour baths, parks and beaches within cycling distance, and its high social trust create an environment where dogs are genuinely welcomed rather than merely tolerated. An estimated 70,000 dogs live in the Copenhagen metropolitan area.',
      fr: 'Copenhague — régulièrement classée parmi les villes les plus agréables au monde — est aussi l\'une des capitales les plus accueillantes pour les chiens en Europe. Les Danois entretiennent avec leurs chiens une relation profonde et pragmatique : les Copenhaguois pédalent avec leurs chiens dans des vélos-cargo, les emmènent au bureau et les conduisent dans les nombreux cafés et restaurants dog-friendly de la ville. L\'engagement de la ville envers les infrastructures cyclables, son réseau de bains portuaires, de parcs et de plages accessibles à vélo, et sa grande confiance sociale créent un environnement où les chiens sont véritablement bienvenus.',
      es: 'Copenhague — clasificada sistemáticamente entre las ciudades más habitables del mundo — es también una de las capitales más acogedoras para perros de Europa. Los daneses tienen con sus perros una relación profunda y pragmática: los copenhagueses pedalean con sus perros en bicis de carga, los llevan al trabajo y los traen a los numerosos cafés y restaurantes dog-friendly de la ciudad. El compromiso de la ciudad con la infraestructura ciclista, su red de baños portuarios, parques y playas accesibles en bicicleta, y su elevada confianza social crean un entorno donde los perros son genuinamente bienvenidos.',
    },
    sights: [
      {
        name: 'Frederiksberg Have & Søndermarken',
        emoji: '🌿',
        petFriendly: true,
        desc: {
          en: 'The romantic English landscape gardens of Frederiksberg palace — 32 hectares of canals, hills and woodland — are among Copenhagen\'s best dog walks. Connecting directly to the 55-hectare Søndermarken park with a large off-leash zone, it\'s the go-to morning destination for dog owners in western Copenhagen.',
          fr: 'Les romantiques jardins paysagers anglais du château de Frederiksberg — 32 hectares de canaux, de collines et de bois — comptent parmi les meilleures promenades canines de Copenhague. En connexion directe avec le parc Søndermarken (55 ha) et sa grande zone en liberté, c\'est la destination matinale de prédilection des propriétaires de chiens du west de Copenhague.',
          es: 'Los románticos jardines paisajistas ingleses del palacio de Frederiksberg — 32 hectáreas de canales, colinas y bosque — están entre los mejores paseos caninos de Copenhague. Conectados directamente con el parque Søndermarken (55 ha) y su gran zona de libertad, es el destino matutino preferido de los dueños de perros del oeste de Copenhague.',
        },
      },
      {
        name: 'Refshaleøen & Amager Fælled',
        emoji: '🏭',
        petFriendly: true,
        desc: {
          en: 'The former shipyard island of Refshaleøen, now a creative and food hub, borders the vast Amager Fælled nature reserve. The fælled (common) is 3.5km² of meadow, wetland and forest — one of the best off-leash wild-feeling dog walks in any European capital.',
          fr: 'L\'ancienne île de chantier naval de Refshaleøen, aujourd\'hui un hub créatif et gastronomique, borde l\'immense réserve naturelle d\'Amager Fælled. Le fælled est un espace de 3,5 km² de prairies, zones humides et forêt — l\'une des meilleures promenades canines en liberté dans toute capitale européenne.',
          es: 'La antigua isla de astilleros de Refshaleøen, ahora un hub creativo y gastronómico, linda con la vasta reserva natural de Amager Fælled. El fælled es un espacio de 3,5 km² de praderas, humedales y bosque — uno de los mejores paseos caninos en libertad en cualquier capital europea.',
        },
      },
      {
        name: 'Nørrebro & Assistens Cemetery',
        emoji: '☕',
        petFriendly: true,
        desc: {
          en: 'Nørrebro is Copenhagen\'s most dog-friendly neighbourhood: independent cafés with dogs under the tables, a Saturday organic market and the Assistens Cemetery — burial place of Kierkegaard and H.C. Andersen — which doubles as a beloved public park where locals picnic and walk dogs.',
          fr: 'Nørrebro est le quartier le plus dog-friendly de Copenhague : cafés indépendants avec des chiens sous les tables, marché bio du samedi et le cimetière d\'Assistens — lieu de sépulture de Kierkegaard et H.C. Andersen — qui sert aussi de parc public aimé où les habitants pique-niquent et promènent leurs chiens.',
          es: 'Nørrebro es el barrio más amigable para perros de Copenhague: cafés independientes con perros bajo las mesas, mercado ecológico de sábado y el cementerio de Assistens — lugar de reposo de Kierkegaard y H.C. Andersen — que funciona también como querido parque público donde los locales hacen picnic y pasean a sus perros.',
        },
      },
      {
        name: 'Copenhagen Harbour & Nyhavn',
        emoji: '⛵',
        petFriendly: true,
        desc: {
          en: 'The colourful 17th-century canal of Nyhavn and the harbour front are navigable with a dog. The harbour baths (swimming spots) are not accessible to dogs, but the quayside promenade and the canal boat tours (Nettobådene) allow dogs in carriers.',
          fr: 'Le canal coloré du XVIIe siècle de Nyhavn et le front portuaire sont praticables avec un chien. Les bains portuaires (zones de baignade) ne sont pas accessibles aux chiens, mais la promenade sur le quai et les balades en bateau sur le canal (Nettobådene) acceptent les chiens en transport.',
          es: 'El colorido canal del siglo XVII de Nyhavn y el frente portuario son transitables con un perro. Los baños del puerto (zonas de baño) no son accesibles para perros, pero el paseo por el muelle y los paseos en barco por el canal (Nettobådene) admiten perros en transportín.',
        },
      },
      {
        name: 'Tivoli Gardens',
        emoji: '🎡',
        petFriendly: false,
        desc: {
          en: 'Tivoli does not allow dogs. It is one of Copenhagen\'s top attractions but requires leaving your pet at the hotel. Check accommodation with secure dog-minding facilities if you plan a Tivoli evening.',
          fr: 'Tivoli n\'accepte pas les chiens. C\'est l\'une des principales attractions de Copenhague, mais elle nécessite de laisser votre animal à l\'hôtel. Vérifiez les hébergements avec des services de garde de chiens sécurisés si vous prévoyez une soirée à Tivoli.',
          es: 'Tivoli no admite perros. Es una de las principales atracciones de Copenhague, pero requiere dejar a su mascota en el hotel. Compruebe alojamientos con servicios de cuidado de perros seguros si planea una velada en Tivoli.',
        },
      },
    ],
    petTips: {
      en: [
        'Copenhagen Metro allows dogs in carriers only. S-Tog (suburban trains) and regional trains allow dogs with a muzzle for a child fare. Buses allow dogs in carriers.',
        'Cargo bikes (Christiania bikes) are everywhere in Copenhagen and Danes routinely transport dogs in them. Some bike rental shops offer cargo bikes — a uniquely Copenhagen way to explore with a large dog.',
        'Danish cafés are predominantly dog-friendly — look for "hunde velkomne" (dogs welcome) signs. It\'s unusual to find a Copenhagen neighbourhood café that refuses dogs.',
        'Beaches: Bellevue Beach (20 min by S-Tog, Klampenborg) has a dedicated off-leash dog beach area. Amager Beach has dog-friendly sections outside June–August.',
        'The famous Strøget pedestrian street is accessible with dogs; the main department stores (Magasin, Illum) do not allow dogs.',
      ],
      fr: [
        'Le métro de Copenhague n\'accepte les chiens qu\'en transport. Les S-Tog (trains de banlieue) et les trains régionaux acceptent les chiens avec muselière au tarif enfant. Les bus acceptent les chiens en transport.',
        'Les vélos-cargo (vélos Christiania) sont omniprésents à Copenhague et les Danois y transportent régulièrement leurs chiens. Certaines boutiques de location de vélos proposent des vélos-cargo — une façon typiquement copenhaguoise d\'explorer avec un grand chien.',
        'Les cafés danois sont majoritairement dog-friendly — repérez les panneaux "hunde velkomne" (chiens bienvenus). Il est rare de trouver un café de quartier à Copenhague qui refuse les chiens.',
        'Plages : la plage de Bellevue (20 min en S-Tog, Klampenborg) dispose d\'une zone de plage canine en liberté. La plage d\'Amager a des sections dog-friendly hors juin-août.',
        'La célèbre rue piétonne Strøget est accessible avec des chiens ; les grands magasins (Magasin, Illum) n\'acceptent pas les chiens.',
      ],
      es: [
        'El metro de Copenhague solo admite perros en transportín. Los S-Tog (trenes de cercanías) y los trenes regionales admiten perros con bozal al precio de billete infantil. Los autobuses admiten perros en transportín.',
        'Las bicicletas de carga (bicicletas Christiania) están en todas partes en Copenhague y los daneses transportan habitualmente a sus perros en ellas. Algunas tiendas de alquiler de bicicletas ofrecen bicicletas de carga — una forma típicamente copenhaguesa de explorar con un perro grande.',
        'Los cafés daneses son mayoritariamente dog-friendly — busque los carteles "hunde velkomne" (perros bienvenidos). Es poco común encontrar un café de barrio en Copenhague que rechace perros.',
        'Playas: la playa de Bellevue (20 min en S-Tog, Klampenborg) tiene una zona de playa canina en libertad. La playa de Amager tiene secciones dog-friendly fuera de junio-agosto.',
        'La famosa calle peatonal Strøget es accesible con perros; los grandes almacenes (Magasin, Illum) no admiten perros.',
      ],
    },
    practicalInfo: {
      en: [
        'Emergency vet: Dyrehospitalet Frederiksberg, Howitzvej (+45 38 86 55 55) — 24-hour specialist animal hospital in central Copenhagen.',
        'Getting there: Copenhagen Airport (CPH) is connected to the city centre by Metro M2 in 15 minutes. Dogs in carriers accepted; larger dogs need a muzzle and lead.',
        'From Sweden: the Øresund Bridge connects Copenhagen to Malmö (35 min by train). Dogs with EU pet passport can cross freely.',
        'Denmark uses the Danish krone (DKK), not the euro. Most places accept card; cash is rarely needed.',
      ],
      fr: [
        'Vétérinaire d\'urgence : Dyrehospitalet Frederiksberg, Howitzvej (+45 38 86 55 55) — hôpital animalier spécialisé 24h/24 au centre de Copenhague.',
        'Accès : l\'aéroport de Copenhague (CPH) est relié au centre-ville par le métro M2 en 15 minutes. Les chiens en transport sont acceptés ; les grands chiens ont besoin d\'une muselière et d\'une laisse.',
        'Depuis la Suède : le pont de l\'Øresund relie Copenhague à Malmö (35 min en train). Les chiens avec passeport UE peuvent traverser librement.',
        'Le Danemark utilise la couronne danoise (DKK), pas l\'euro. La plupart des endroits acceptent la carte ; les espèces sont rarement nécessaires.',
      ],
      es: [
        'Veterinario de urgencias: Dyrehospitalet Frederiksberg, Howitzvej (+45 38 86 55 55) — hospital animal especializado 24h en el centro de Copenhague.',
        'Cómo llegar: el aeropuerto de Copenhague (CPH) conecta con el centro de la ciudad en 15 minutos por el metro M2. Los perros en transportín están admitidos; los perros grandes necesitan bozal y correa.',
        'Desde Suecia: el puente de Øresund une Copenhague con Malmö (35 min en tren). Los perros con pasaporte UE pueden cruzar libremente.',
        'Dinamarca usa la corona danesa (DKK), no el euro. La mayoría de los lugares aceptan tarjeta; el efectivo raramente es necesario.',
      ],
    },
  },

  stockholm: {
    history: {
      en: 'Stockholm — spread across 14 islands at the point where Lake Mälaren meets the Baltic — is a city that takes its relationship with nature seriously. Swedes are prolific dog owners (over 900,000 dogs nationwide, roughly one per ten people) and Stockholm\'s infrastructure reflects this: Djurgården island, the archipelago day trips and the city\'s extensive cycle and walking paths make it one of Europe\'s most naturally dog-friendly cities. The Gamla Stan (Old Town) island, with its 13th-century cobblestone alleys, is navigable with a calm dog; the surrounding water-city gives an almost unique sense of space for a European capital of 975,000 people.',
      fr: 'Stockholm — étendue sur 14 îles au point de rencontre du lac Mälaren et de la Baltique — est une ville qui prend au sérieux sa relation avec la nature. Les Suédois sont de grands propriétaires de chiens (plus de 900 000 chiens à l\'échelle nationale, soit environ un pour dix personnes) et l\'infrastructure de Stockholm le reflète : l\'île de Djurgården, les excursions dans l\'archipel et les nombreuses pistes cyclables et pédestres en font l\'une des capitales européennes les plus naturellement accueillantes pour les chiens.',
      es: 'Estocolmo — extendida por 14 islas en el punto donde el lago Mälaren se encuentra con el Báltico — es una ciudad que toma en serio su relación con la naturaleza. Los suecos son prolíficos dueños de perros (más de 900.000 perros en todo el país, aproximadamente uno por cada diez personas) y la infraestructura de Estocolmo lo refleja: la isla de Djurgården, las excursiones al archipiélago y los extensos caminos ciclistas y peatonales la convierten en una de las capitales europeas más naturalmente acogedoras para los perros.',
    },
    sights: [
      {
        name: 'Djurgården Island',
        emoji: '🦌',
        petFriendly: true,
        desc: {
          en: 'The royal park island — home to the Vasa Museum, Skansen open-air museum and ABBA The Museum — is Stockholm\'s premier dog destination. The forested southern half is entirely off-leash; the northern path along the water offers spectacular views of the city. Dogs see deer here regularly.',
          fr: 'L\'île du parc royal — accueillant le musée Vasa, le musée en plein air Skansen et le musée ABBA — est la destination canine principale de Stockholm. La moitié sud boisée est entièrement en liberté ; le sentier nord longeant l\'eau offre des vues spectaculaires sur la ville. Les chiens y croisent régulièrement des cerfs.',
          es: 'La isla del parque real — sede del Museo Vasa, el museo al aire libre Skansen y el Museo ABBA — es el principal destino canino de Estocolmo. La mitad sur boscosa está completamente libre de correa; el sendero norte a lo largo del agua ofrece vistas espectaculares de la ciudad. Los perros se cruzan regularmente con ciervos aquí.',
        },
      },
      {
        name: 'Södermalm & Tantolunden',
        emoji: '☕',
        petFriendly: true,
        desc: {
          en: 'Södermalm — Stockholm\'s bohemian southern island — is the most dog-friendly neighbourhood in the city. Tantolunden park has an allotment area, open lawns, a waterfront and a dedicated dog run. The café culture on SoFo (south of Folkungagatan) is excellent, with dogs welcome inside most establishments.',
          fr: 'Södermalm — l\'île bohème sud de Stockholm — est le quartier le plus dog-friendly de la ville. Le parc Tantolunden dispose d\'une zone de jardins ouvriers, de pelouses ouvertes, d\'un front d\'eau et d\'un parc canin dédié. La culture des cafés dans le SoFo (au sud de la Folkungagatan) est excellente, avec des chiens bienvenus à l\'intérieur de la plupart des établissements.',
          es: 'Södermalm — la isla bohemia sur de Estocolmo — es el barrio más amigable para perros de la ciudad. El parque Tantolunden tiene una zona de huertos, praderas abiertas, un frente fluvial y un parque canino dedicado. La cultura del café en SoFo (al sur de Folkungagatan) es excelente, con perros bienvenidos dentro de la mayoría de establecimientos.',
        },
      },
      {
        name: 'Ekoparken (Royal National City Park)',
        emoji: '🌲',
        petFriendly: true,
        desc: {
          en: 'The world\'s first national city park — 27km² of forest, meadow, lakes and royal palaces within the city limits. Dogs on lead in the meadow zones; off-lead in the forested areas. Moose, deer and hares are regular sightings — keep your dog under control.',
          fr: 'Le premier parc national urbain au monde — 27 km² de forêt, prairies, lacs et palais royaux dans les limites de la ville. Chiens en laisse dans les zones de prairies ; en liberté dans les zones boisées. Les élans, cerfs et lièvres sont des habitués — gardez votre chien sous contrôle.',
          es: 'El primer parque nacional urbano del mundo — 27 km² de bosque, praderas, lagos y palacios reales dentro de los límites de la ciudad. Perros con correa en las zonas de pradera; libres en las zonas boscosas. Los alces, ciervos y liebres son visitantes habituales — mantenga a su perro bajo control.',
        },
      },
      {
        name: 'Gamla Stan (Old Town)',
        emoji: '🏰',
        petFriendly: true,
        desc: {
          en: 'The medieval island at Stockholm\'s heart is navigable with a dog, especially in the morning before the tourist groups arrive. The cobblestone alleys (gränder) are narrow but the main square (Stortorget) and the waterfront paths are wide and welcoming to dogs.',
          fr: 'L\'île médiévale au cœur de Stockholm est praticable avec un chien, surtout le matin avant l\'arrivée des groupes touristiques. Les ruelles pavées (gränder) sont étroites, mais la grande place (Stortorget) et les promenades en bord d\'eau sont larges et accueillantes pour les chiens.',
          es: 'La isla medieval en el corazón de Estocolmo es transitable con un perro, especialmente por la mañana antes de que lleguen los grupos turísticos. Las callejuelas adoquinadas (gränder) son estrechas, pero la plaza principal (Stortorget) y los paseos fluviales son amplios y acogedores para los perros.',
        },
      },
      {
        name: 'Vasa Museum & Skansen',
        emoji: '⛵',
        petFriendly: false,
        desc: {
          en: 'Neither the Vasa Museum nor Skansen allows dogs inside. Skansen\'s outdoor areas allow dogs on lead in some sections — check the current rules on arrival. Both are worth a solo visit; plan dog time for Djurgården\'s forested southern paths meanwhile.',
          fr: 'Ni le musée Vasa ni Skansen n\'acceptent les chiens à l\'intérieur. Les espaces extérieurs de Skansen permettent les chiens en laisse dans certaines sections — vérifiez les règles actuelles à l\'arrivée. Les deux valent une visite en solo ; prévoyez du temps pour les sentiers boisés du sud de Djurgården.',
          es: 'Ni el Museo Vasa ni Skansen admiten perros dentro. Las áreas exteriores de Skansen permiten perros con correa en algunas secciones — compruebe las normas actuales a la llegada. Ambos merecen una visita en solitario; planifique tiempo para los senderos boscosos del sur de Djurgården.',
        },
      },
    ],
    petTips: {
      en: [
        'SL (Stockholm public transport): dogs in carriers travel free on all modes. Larger dogs need a muzzle and travel as a reduced-fare passenger. Dogs are not allowed on Arlanda Express.',
        'Stockholm archipelago day trip: Waxholmsbolaget ferries allow dogs on all routes. The islands of Vaxholm, Sandhamn and Utö have excellent dog walks and dog-friendly guesthouses (värdshus).',
        'Swedish wildlife warning: Djurgården and Ekoparken are home to moose (älg). These large animals can be aggressive if a dog gives chase — keep your dog on lead near dawn and dusk.',
        'Winter: Stockholm averages −3°C in January with short daylight (6h). Dog boots (hundtassar) are widely sold in Swedish pet shops and are recommended for icy pavements and road-salt protection.',
        'Swedish fika culture: most kafé and konditori (café-bakeries) in Stockholm welcome dogs. Södermalm has the highest concentration of dog-friendly independent cafés.',
      ],
      fr: [
        'SL (transports publics de Stockholm) : les chiens en transport voyagent gratuitement sur tous les modes. Les grands chiens ont besoin d\'une muselière et voyagent en passager à tarif réduit. Les chiens ne sont pas admis dans l\'Arlanda Express.',
        'Excursion dans l\'archipel de Stockholm : les ferries Waxholmsbolaget acceptent les chiens sur toutes les lignes. Les îles de Vaxholm, Sandhamn et Utö offrent d\'excellentes promenades canines et des maisons d\'hôtes (värdshus) dog-friendly.',
        'Avertissement faune : Djurgården et Ekoparken abritent des élans (älg). Ces grands animaux peuvent être agressifs si un chien les poursuit — gardez votre chien en laisse près de l\'aube et du crépuscule.',
        'Hiver : Stockholm connaît en moyenne −3°C en janvier avec peu de lumière du jour (6h). Les bottines pour chiens (hundtassar) sont largement vendues dans les animaleries suédoises et sont recommandées pour les trottoirs glacés et la protection contre le sel de voirie.',
        'Culture fika suédoise : la plupart des kafé et konditori (cafés-pâtisseries) de Stockholm accueillent les chiens. Södermalm concentre le plus grand nombre de cafés indépendants dog-friendly.',
      ],
      es: [
        'SL (transporte público de Estocolmo): los perros en transportín viajan gratis en todos los medios. Los perros grandes necesitan bozal y viajan como pasajero de tarifa reducida. Los perros no están permitidos en el Arlanda Express.',
        'Excursión al archipiélago de Estocolmo: los ferrís de Waxholmsbolaget admiten perros en todas las rutas. Las islas de Vaxholm, Sandhamn y Utö tienen excelentes paseos caninos y casas de huéspedes (värdshus) dog-friendly.',
        'Aviso de fauna: Djurgården y Ekoparken albergan alces (älg). Estos grandes animales pueden ser agresivos si un perro los persigue — mantenga a su perro con correa cerca del amanecer y el atardecer.',
        'Invierno: Estocolmo tiene una media de −3°C en enero con poca luz solar (6h). Las botitas para perros (hundtassar) se venden ampliamente en las tiendas de mascotas suecas y son recomendables para aceras heladas y protección contra la sal de la calzada.',
        'Cultura fika sueca: la mayoría de kafé y konditori (cafés-pastelerías) de Estocolmo admiten perros. Södermalm concentra la mayor cantidad de cafés independientes dog-friendly.',
      ],
    },
    practicalInfo: {
      en: [
        'Emergency vet: Evidensia Djursjukhuset Stockholm, Rasundavägen, Solna (+46 10 750 10 00) — 24-hour specialist animal hospital north of the city centre.',
        'Getting there: Stockholm Arlanda Airport is 42km north. The Arlanda Express takes 18 minutes to Stockholm Central (dogs not allowed); airport buses (Flygbussarna) allow dogs in carriers.',
        'From Norway: direct trains from Oslo to Stockholm (4h45, SJ Norge/SJ AB). Dogs in carriers or with muzzle and reduced fare ticket.',
        'Best season: June–August for long daylight (up to 18h), outdoor swimming and archipelago trips. December–January for Christmas markets and snow walks — but prepare for cold and darkness.',
      ],
      fr: [
        'Vétérinaire d\'urgence : Evidensia Djursjukhuset Stockholm, Rasundavägen, Solna (+46 10 750 10 00) — hôpital animalier spécialisé 24h/24 au nord du centre-ville.',
        'Accès : l\'aéroport Stockholm Arlanda est à 42 km au nord. L\'Arlanda Express met 18 minutes jusqu\'à Stockholm Central (chiens non admis) ; les bus aéroport (Flygbussarna) acceptent les chiens en transport.',
        'Depuis la Norvège : trains directs depuis Oslo vers Stockholm (4h45, SJ Norge/SJ AB). Chiens en transport ou avec muselière et billet à tarif réduit.',
        'Meilleure saison : juin-août pour la longue durée du jour (jusqu\'à 18h), la baignade en plein air et les excursions dans l\'archipel. Décembre-janvier pour les marchés de Noël et les promenades dans la neige — mais prévoir le froid et l\'obscurité.',
      ],
      es: [
        'Veterinario de urgencias: Evidensia Djursjukhuset Stockholm, Rasundavägen, Solna (+46 10 750 10 00) — hospital animal especializado 24h al norte del centro de la ciudad.',
        'Cómo llegar: el aeropuerto de Estocolmo Arlanda está a 42 km al norte. El Arlanda Express tarda 18 minutos hasta la Estación Central de Estocolmo (perros no admitidos); los autobuses del aeropuerto (Flygbussarna) admiten perros en transportín.',
        'Desde Noruega: trenes directos desde Oslo a Estocolmo (4h45, SJ Norge/SJ AB). Perros en transportín o con bozal y billete de tarifa reducida.',
        'Mejor temporada: junio-agosto para los días largos (hasta 18h), el baño al aire libre y las excursiones al archipiélago. Diciembre-enero para los mercados navideños y los paseos en la nieve — pero prepare para el frío y la oscuridad.',
      ],
    },
  },

  marseille: {
    history: {
      fr: `Marseille est la plus ancienne ville de France — fondée par les Grecs phocéens en 600 avant J.-C., elle a 2 600 ans de culture portuaire et méditerranéenne. Ville cosmopolite et populaire, Marseille entretient un rapport décomplexé avec les animaux : les chiens accompagnent leurs maîtres sur les quais du Vieux-Port, dans les bars du Panier, et sur les sentiers des Calanques. Le Parc National des Calanques, créé en 2012 aux portes de la ville, offre un cadre unique en Europe : 20 km de côtes sauvages accessibles à pied ou en bateau, où les chiens sont autorisés en laisse. La ville compte aussi 70 km de littoral et plus de 30 parcs, dont une poignée disposent de zones canines dédiées.`,
      en: `Marseille is France's oldest city — founded by Phocaean Greeks in 600 BC, it carries 2,600 years of Mediterranean port culture. A cosmopolitan, working-class city, Marseille has an unpretentious relationship with animals: dogs accompany their owners on the Vieux-Port quays, in the Panier's bars, and along the Calanques trails. The Calanques National Park, created in 2012 at the city's edge, offers a setting unmatched in Europe: 20 km of wild coastline accessible on foot or by boat, where dogs are allowed on leash. The city also has 70 km of coastline and more than 30 parks, a handful with dedicated canine zones.`,
      es: `Marsella es la ciudad más antigua de Francia: fundada por los griegos foceos en el 600 a. C., atesora 2.600 años de cultura portuaria mediterránea. Ciudad cosmopolita y popular, Marsella mantiene una relación natural con los animales: los perros acompañan a sus dueños en los muelles del Vieux-Port, en los bares del Panier y en los senderos de las Calanques. El Parque Nacional de las Calanques, creado en 2012 a las puertas de la ciudad, ofrece un entorno único en Europa: 20 km de costa salvaje accesibles a pie o en barco, donde se admiten perros con correa. La ciudad también cuenta con 70 km de litoral y más de 30 parques, algunos con zonas caninas dedicadas.`,
    },
    sights: [
      {
        name: 'Vieux-Port',
        emoji: '⚓',
        petFriendly: true,
        desc: {
          fr: 'Le cœur historique de Marseille depuis 26 siècles. Les quais sont entièrement dog-friendly, avec terrasses de café acceptant les chiens et marché aux poissons matinal. Vue iconique sur Notre-Dame de la Garde.',
          en: 'Marseille\'s beating heart for 26 centuries. The quays are fully dog-friendly, with café terraces welcoming pets and a morning fish market. Iconic view up to Notre-Dame de la Garde.',
          es: 'El corazón histórico de Marsella desde hace 26 siglos. Los muelles son totalmente dog-friendly, con terrazas de café que admiten perros y un mercado de pescado matinal. Vista icónica hacia Notre-Dame de la Garde.',
        },
      },
      {
        name: 'Calanques National Park',
        emoji: '🏞️',
        petFriendly: true,
        desc: {
          fr: '20 km de côtes sauvages aux portes de la ville. Les chiens sont autorisés en laisse sur tous les sentiers — Sugiton, En-Vau, Marseilleveyre. Attention aux fermetures estivales en cas de risque incendie.',
          en: '20 km of wild coastline on the city\'s doorstep. Dogs are permitted on leash on all trails — Sugiton, En-Vau, Marseilleveyre. Watch for summer closures during high fire risk.',
          es: '20 km de costa salvaje a las puertas de la ciudad. Los perros se admiten con correa en todos los senderos: Sugiton, En-Vau, Marseilleveyre. Atento a los cierres estivales en caso de riesgo alto de incendio.',
        },
      },
      {
        name: 'Le Panier',
        emoji: '🏘️',
        petFriendly: true,
        desc: {
          fr: 'Le plus ancien quartier de Marseille — labyrinthe de ruelles pavées, street art et cafés. Entièrement praticable avec un chien ; plusieurs terrasses acceptent les animaux.',
          en: 'Marseille\'s oldest neighbourhood — a labyrinth of cobblestone streets, street art and cafés. Fully walkable with a dog; several terraces welcome pets.',
          es: 'El barrio más antiguo de Marsella: un laberinto de calles empedradas, arte urbano y cafés. Totalmente accesible con perro; varias terrazas aceptan mascotas.',
        },
      },
      {
        name: 'Corniche Kennedy',
        emoji: '🌊',
        petFriendly: true,
        desc: {
          fr: 'Route côtière de 5 km entre la plage des Catalans et le Vallon des Auffes. Piste piétonne dédiée, vues sur mer constantes — la meilleure balade du soir en ville.',
          en: '5 km coastal road between Catalans beach and Vallon des Auffes. Dedicated pedestrian path and constant sea views — the city\'s best evening walk.',
          es: 'Carretera costera de 5 km entre la playa dels Catalans y Vallon des Auffes. Carril peatonal dedicado y vistas al mar constantes: el mejor paseo nocturno de la ciudad.',
        },
      },
      {
        name: 'MuCEM',
        emoji: '🏛️',
        petFriendly: false,
        desc: {
          fr: 'Musée des Civilisations de l\'Europe et de la Méditerranée. Les chiens sont autorisés sur l\'esplanade et les passerelles extérieures — seule l\'intérieur est interdit.',
          en: 'Museum of European and Mediterranean Civilisations. Dogs are allowed on the esplanade and outdoor walkways — only the interior is off-limits.',
          es: 'Museo de las Civilizaciones de Europa y el Mediterráneo. Los perros pueden estar en la esplanada y pasarelas exteriores; solo el interior está prohibido.',
        },
      },
      {
        name: 'Îles du Frioul',
        emoji: '🏝️',
        petFriendly: true,
        desc: {
          fr: 'Archipel accessible en ferry depuis le Vieux-Port (10 € aller-retour, chiens gratuits). 10 plages acceptant les chiens en laisse — la Calanque de la Crine aux eaux turquoises vaut la marche d\'une heure.',
          en: 'Archipelago accessible by ferry from the Vieux-Port (€10 return, dogs free). 10 beaches welcoming dogs on leash — the turquoise Calanque de la Crine rewards the one-hour walk.',
          es: 'Archipiélago accesible en ferry desde el Vieux-Port (10 € ida y vuelta, perros gratis). 10 playas que admiten perros con correa: la Calanque de la Crine de aguas turquesas merece la hora de caminata.',
        },
      },
    ],
    petTips: {
      fr: [
        'Été brûlant : les températures au sol dépassent 55°C à midi en juillet-août. Promenez votre chien avant 9h ou après 18h uniquement.',
        'Les grands chiens sont INTERDITS dans le métro et bus RTM — prévoyez Uber, Bolt ou un taxi pet-friendly.',
        'Le Parc Longchamp a une zone canine de 6 000 m² accessible uniquement depuis l\'entrée Métro 5 Avenues.',
        'Les plages urbaines (Prado, Catalans, Prophète) interdisent les chiens du 1er juin au 30 septembre — direction Frioul pour l\'été.',
        'Urgences vétérinaires : Vétérinaires 2 Toute Urgence au 04 91 13 44 44 (La Valentine) — ou composez le 3115 gratuit.',
      ],
      en: [
        'Scorching summers: ground temperatures exceed 55°C at midday in July–August. Walk your dog before 9am or after 6pm only.',
        'Large dogs are BANNED on RTM metro and buses — plan for Uber, Bolt or a pet-friendly taxi.',
        'Parc Longchamp has a 6,000 m² dog zone accessible only from the Métro 5 Avenues entrance.',
        'City beaches (Prado, Catalans, Prophète) ban dogs from June 1 to September 30 — head to the Frioul islands instead.',
        'Emergency vet: Vétérinaires 2 Toute Urgence on +33 4 91 13 44 44 (La Valentine) — or dial 3115 free from any French phone.',
      ],
      es: [
        'Veranos abrasadores: las temperaturas del suelo superan los 55°C al mediodía en julio-agosto. Pasea a tu perro solo antes de las 9 h o después de las 18 h.',
        'Los perros grandes están PROHIBIDOS en el metro y autobús RTM: planifica Uber, Bolt o un taxi pet-friendly.',
        'El Parc Longchamp tiene una zona canina de 6.000 m² accesible solo desde la entrada del Metro 5 Avenues.',
        'Las playas urbanas (Prado, Catalans, Prophète) prohíben perros del 1 de junio al 30 de septiembre: ve a las islas Frioul en verano.',
        'Urgencias veterinarias: Vétérinaires 2 Toute Urgence en el +33 4 91 13 44 44 (La Valentine) o marca el 3115 gratis desde cualquier teléfono francés.',
      ],
    },
    practicalInfo: {
      fr: [
        'Aéroport Marseille Provence (MRP) à 27 km au nord — navette-bus accepte les chiens en transportin (8 €).',
        'Depuis Paris : TGV direct (3h15) — chiens acceptés avec billet spécifique (7 € petit chien, tarif enfant pour grand chien).',
        'Meilleure saison : avril-juin et septembre-octobre. Éviter juillet-août pour la chaleur extrême et l\'affluence touristique.',
        'Location de bateau au Vieux-Port avec chien : possible sur certains catamarans — réserver avec Les Bateaux Marseillais.',
        'Pharmacies vétérinaires dans le 1er et le 8e arrondissement — la plupart ouvertes de 9h à 19h du lundi au samedi.',
      ],
      en: [
        'Marseille Provence Airport (MRP) is 27 km north — the airport shuttle bus accepts dogs in carriers (€8).',
        'From Paris: direct TGV (3h15) — dogs welcome with a specific ticket (€7 small dog, child fare for large dog).',
        'Best season: April–June and September–October. Avoid July–August for extreme heat and tourist crowds.',
        'Boat charter from Vieux-Port with a dog: possible on select catamarans — book with Les Bateaux Marseillais.',
        'Vet pharmacies in the 1st and 8th arrondissement — most open 9am–7pm Monday to Saturday.',
      ],
      es: [
        'Aeropuerto de Marsella Provenza (MRP) a 27 km al norte: el autobús lanzadera admite perros en transportín (8 €).',
        'Desde París: TGV directo (3h15): perros admitidos con billete específico (7 € perro pequeño, tarifa infantil para perro grande).',
        'Mejor temporada: abril-junio y septiembre-octubre. Evita julio-agosto por el calor extremo y las aglomeraciones turísticas.',
        'Alquiler de barco en el Vieux-Port con perro: posible en algunos catamaranes. Reserva con Les Bateaux Marseillais.',
        'Farmacias veterinarias en los distritos 1 y 8: la mayoría abren de 9 h a 19 h de lunes a sábado.',
      ],
    },
  },

  rotterdam: {
    history: {
      fr: `Rotterdam est née au 13e siècle sur un barrage de la rivière Rotte — d'où son nom. Entièrement détruite par les bombardements allemands en 1940, elle s'est reconstruite en une ville moderne et audacieuse, devenue le plus grand port d'Europe et un laboratoire d'architecture contemporaine. Cette culture d'innovation se retrouve dans le rapport aux chiens : Rotterdam est considérée comme l'une des villes les plus dog-friendly d'Europe. Les chiens voyagent gratuitement dans tout le réseau de transport public (métro, tram, bus), sans limite de taille ni de race. La ville compte 5 zones de liberté canine officielles et plus de 15 parcs accessibles aux chiens, dont Het Park (28 ha en plein centre, près de l'Euromast) et le Kralingse Bos (forêt et lac au bord de la ville).`,
      en: `Rotterdam was born in the 13th century on a dam of the Rotte river — hence its name. Completely destroyed by German bombing in 1940, it rebuilt itself as a modern, bold city that became Europe's largest port and a laboratory of contemporary architecture. This innovation culture carries over to dogs: Rotterdam is considered one of Europe's most dog-friendly cities. Dogs travel free on the entire public transport network (metro, tram, bus), with no size or breed limit. The city has five official off-leash dog zones and more than 15 parks welcoming dogs, including Het Park (28 ha in the centre, beside the Euromast) and Kralingse Bos (forest and lake on the city edge).`,
      es: `Rotterdam nació en el siglo XIII sobre una presa del río Rotte, de ahí su nombre. Completamente destruida por los bombardeos alemanes en 1940, se reconstruyó como una ciudad moderna y audaz que se convirtió en el mayor puerto de Europa y un laboratorio de arquitectura contemporánea. Esa cultura de innovación se traslada a su relación con los perros: Rotterdam está considerada una de las ciudades más dog-friendly de Europa. Los perros viajan gratis en toda la red de transporte público (metro, tranvía, autobús), sin límite de tamaño ni raza. La ciudad tiene 5 zonas oficiales de suelta y más de 15 parques que admiten perros, incluidos Het Park (28 ha en el centro, junto al Euromast) y el Kralingse Bos (bosque y lago en el borde de la ciudad).`,
    },
    sights: [
      {
        name: 'Het Park',
        emoji: '🌳',
        petFriendly: true,
        desc: {
          fr: '28 hectares d\'espace sans laisse en plein centre, juste à côté de l\'Euromast. Café du parc avec grande terrasse dog-friendly — parfait pour un café post-balade.',
          en: '28 hectares of off-leash space right in the centre, beside the Euromast. The park café has a large dog-friendly terrace — perfect for post-walk coffee.',
          es: '28 hectáreas de espacio sin correa en pleno centro, junto al Euromast. El café del parque tiene una amplia terraza dog-friendly: perfecto para café tras el paseo.',
        },
      },
      {
        name: 'Erasmus Bridge',
        emoji: '🌉',
        petFriendly: true,
        desc: {
          fr: 'Le pont signature de Rotterdam et ses gratte-ciels modernes du Wilhelminapier. Balade emblématique avec un chien — attention aux grilles métalliques qui gênent certains coussinets.',
          en: 'Rotterdam\'s signature bridge and the modern Wilhelminapier skyscrapers. Iconic dog walk — watch out for the metal grating that can bother sensitive paws.',
          es: 'El puente emblemático de Rotterdam y los modernos rascacielos del Wilhelminapier. Paseo icónico con perro: atención a las rejillas metálicas que pueden molestar las patas sensibles.',
        },
      },
      {
        name: 'Kralingse Bos',
        emoji: '🌲',
        petFriendly: true,
        desc: {
          fr: 'Forêt avec lac (Kralingse Plas) au nord-est de la ville. Les chiens peuvent nager dans le lac et courir en liberté sur les sentiers forestiers. Destination préférée des locaux.',
          en: 'Forest with lake (Kralingse Plas) on the city\'s northeast edge. Dogs can swim in the lake and run off-leash on forest trails. Locals\' favourite weekend destination.',
          es: 'Bosque con lago (Kralingse Plas) al noreste de la ciudad. Los perros pueden nadar en el lago y correr sueltos por los senderos. Destino favorito de los locales los fines de semana.',
        },
      },
      {
        name: 'Witte de Withstraat',
        emoji: '🎨',
        petFriendly: true,
        desc: {
          fr: 'La rue art et culture de Rotterdam, piétonnisée le week-end. Fresques murales, galeries et cafés dog-friendly côte à côte — le meilleur quartier pour un après-midi avec son chien.',
          en: 'Rotterdam\'s art and culture street, pedestrianised at weekends. Murals, galleries and dog-friendly cafés side by side — the best neighbourhood for a dog afternoon.',
          es: 'La calle de arte y cultura de Rotterdam, peatonal los fines de semana. Murales, galerías y cafés dog-friendly: el mejor barrio para una tarde con tu perro.',
        },
      },
      {
        name: 'Markthal',
        emoji: '🏪',
        petFriendly: false,
        desc: {
          fr: 'Le marché couvert iconique en arche. Les chiens ne sont pas admis à l\'intérieur, mais la place extérieure et les bars environnants sont entièrement dog-friendly.',
          en: 'The iconic arch-shaped indoor market. Dogs are not permitted inside, but the outdoor square and surrounding bars are fully dog-friendly.',
          es: 'El icónico mercado cubierto en forma de arco. No se admiten perros dentro, pero la plaza exterior y los bares cercanos son totalmente dog-friendly.',
        },
      },
      {
        name: 'Kubuswoningen (Cube Houses)',
        emoji: '🟧',
        petFriendly: true,
        desc: {
          fr: 'Les maisons cubes de Piet Blom, icône de l\'architecture rotterdamoise. Visibles et photographiables de l\'extérieur avec votre chien — l\'intérieur-musée n\'accepte pas les animaux.',
          en: 'Piet Blom\'s Cube Houses, a Rotterdam architectural icon. Viewable and photographable with your dog from outside — the museum interior doesn\'t accept pets.',
          es: 'Las Casas Cúbicas de Piet Blom, icono de la arquitectura de Rotterdam. Se pueden ver y fotografiar con tu perro desde fuera; el museo interior no admite mascotas.',
        },
      },
    ],
    petTips: {
      fr: [
        'Les chiens voyagent gratuitement sur tout le réseau RET (métro, tram, bus) — aucun billet requis, juste la laisse obligatoire.',
        'Pas de restriction de taille ou de race sur les transports — les grands chiens sont les bienvenus.',
        'Pour les trains NS hors Rotterdam, un petit chien en transportin voyage gratis ; un grand chien nécessite un « hondenbiljet » journée à 3,50 €.',
        'Plages de Hoek van Holland : chiens interdits 9h-19h du 1er mai au 1er octobre, sauf à la pointe de l\'estuaire.',
        'Urgences vétérinaires : Dierenziekenhuis Rotterdam au 010 492 51 51 jusqu\'à 22h, puis Evidensia Barendrecht 24h/24.',
      ],
      en: [
        'Dogs travel free on the entire RET network (metro, tram, bus) — no ticket required, just keep them on a leash.',
        'No size or breed restriction on public transport — large dogs are welcome.',
        'For NS trains outside Rotterdam, a small dog in a carrier travels free; a large dog needs a "hondenbiljet" day ticket at €3.50.',
        'Hoek van Holland beaches: dogs banned 9am–7pm from May 1 to October 1, except at the estuary tip.',
        'Emergency vet: Dierenziekenhuis Rotterdam on +31 10 492 51 51 until 10pm, then Evidensia Barendrecht 24/7.',
      ],
      es: [
        'Los perros viajan gratis en toda la red RET (metro, tranvía, autobús): no se necesita billete, solo hay que llevarlos con correa.',
        'Sin restricción de tamaño ni raza en el transporte público: los perros grandes son bienvenidos.',
        'En los trenes NS fuera de Rotterdam, un perro pequeño en transportín viaja gratis; uno grande necesita un "hondenbiljet" de día (3,50 €).',
        'Playas de Hoek van Holland: perros prohibidos 9:00-19:00 del 1 de mayo al 1 de octubre, excepto en la punta del estuario.',
        'Urgencias veterinarias: Dierenziekenhuis Rotterdam en el +31 10 492 51 51 hasta las 22:00, luego Evidensia Barendrecht 24/7.',
      ],
    },
    practicalInfo: {
      fr: [
        'Aéroport Rotterdam-The Hague (RTM) à 8 km — ou Amsterdam Schiphol (AMS) à 50 min en train (chiens acceptés).',
        'Depuis Amsterdam : trains NS directs toutes les 15 minutes (40 min de trajet).',
        'Meilleure saison : mai à septembre pour les terrasses et les canaux. L\'hiver reste fonctionnel mais humide.',
        'Rotterdam Central Station est entièrement accessible aux chiens, y compris la zone de restauration extérieure.',
        'Plupart des hôtels centre-ville acceptent les animaux (frais de 10-25 €/nuit typiquement).',
      ],
      en: [
        'Rotterdam-The Hague Airport (RTM) is 8 km away — or Amsterdam Schiphol (AMS) 50 min by train (dogs welcome).',
        'From Amsterdam: direct NS trains every 15 minutes (40-minute journey).',
        'Best season: May to September for terraces and canals. Winter is still functional but damp.',
        'Rotterdam Central Station is fully accessible to dogs, including the outdoor dining area.',
        'Most city-centre hotels accept pets (typically €10–25/night fee).',
      ],
      es: [
        'Aeropuerto Rotterdam-La Haya (RTM) a 8 km, o Ámsterdam Schiphol (AMS) a 50 min en tren (perros admitidos).',
        'Desde Ámsterdam: trenes NS directos cada 15 minutos (40 min de trayecto).',
        'Mejor temporada: mayo a septiembre para terrazas y canales. El invierno sigue siendo funcional pero húmedo.',
        'La Rotterdam Central Station es totalmente accesible para perros, incluida la zona de restauración exterior.',
        'La mayoría de hoteles céntricos admiten mascotas (tarifa típica de 10-25 €/noche).',
      ],
    },
  },

  cologne: {
    history: {
      fr: `Cologne (Köln), fondée par les Romains en 50 apr. J.-C. sous le nom de Colonia Claudia Ara Agrippinensium, est la quatrième ville d'Allemagne et la gardienne de la cathédrale gothique classée à l'UNESCO, dont les deux flèches dominent les berges du Rhin. Reconstruite après les bombardements, elle mêle l'effervescence du Carnaval à l'esprit décontracté de la Rhénanie. La culture canine y est solidement ancrée : la Rhénanie-du-Nord-Westphalie impose une Hundesteuer annuelle (environ 156 euros pour le premier chien en 2026) et l'enregistrement de l'animal auprès de la ville. Les grandes races ou races dites « listées » doivent passer un test comportemental, et leur maître détenir un Hundeführerschein. Les propriétaires en règle profitent de vastes espaces verts, de promenades au bord du fleuve et de cafés où la gamelle d'eau à l'entrée est la norme.`,
      en: `Cologne (Köln), founded by the Romans in 50 AD as Colonia Claudia Ara Agrippinensium, is Germany's fourth-largest city and guardian of the UNESCO-listed Gothic Kölner Dom, whose twin spires dominate the Rhine skyline. Rebuilt from wartime rubble, the city blends Carnival exuberance with a laid-back Rhineland spirit. Dog culture runs deep here: North Rhine-Westphalia requires owners to pay an annual Hundesteuer (dog tax, roughly 156 euros for the first dog in 2026) and register the animal with the city. Large or so-called 'listed' breeds must pass a temperament test and their owners carry a Hundeführerschein permit. Cologne rewards compliant owners with generous green space, riverside promenades, and a café culture where a water bowl at the door is the rule rather than the exception.`,
      es: `Colonia (Köln), fundada por los romanos en el año 50 d.C. como Colonia Claudia Ara Agrippinensium, es la cuarta ciudad de Alemania y guardiana de la catedral gótica declarada Patrimonio de la UNESCO, cuyas torres gemelas dominan el Rin. Reconstruida tras los bombardeos, combina la euforia del Carnaval con el espíritu relajado de Renania. La cultura canina está profundamente arraigada: Renania del Norte-Westfalia exige una Hundesteuer anual (unos 156 euros por el primer perro en 2026) y el registro del animal en el ayuntamiento. Las razas grandes o 'listadas' deben superar una prueba de temperamento, y sus dueños portar un Hundeführerschein. A cambio, Colonia ofrece amplios espacios verdes, paseos ribereños y una cultura de cafés donde el cuenco de agua en la puerta es la norma.`,
    },
    sights: [
      {
        name: 'Kölner Dom',
        emoji: '⛪',
        petFriendly: false,
        desc: {
          fr: 'La cathédrale aux deux flèches de 157 mètres a nécessité 632 ans de construction et abrite les reliques des Rois Mages. Les chiens ne sont pas admis à l\'intérieur, mais la vaste Domplatte qui l\'entoure se prête à une balade en laisse, avec des cafés accueillants.',
          en: 'The 157-metre twin-spired cathedral took 632 years to complete and holds the relics of the Three Magi. Dogs are not permitted inside, but the vast Domplatte plaza around it is a classic leashed stroll with cafés that welcome pets.',
          es: 'La catedral de dos torres de 157 metros tardó 632 años en terminarse y alberga las reliquias de los Reyes Magos. No se admiten perros en el interior, pero la amplia Domplatte invita a pasear con correa, con cafés que aceptan mascotas.',
        },
      },
      {
        name: 'Rhine Promenade & Altstadt',
        emoji: '🌉',
        petFriendly: true,
        desc: {
          fr: 'La Rheinuferpromenade pavée relie le pont Hohenzollern aux maisons à pignons colorés de la vieille ville. Les chiens doivent rester en laisse dans la Altstadt ; les Poller Wiesen, au sud, offrent un espace de liberté officieux aux heures calmes.',
          en: 'The cobbled Rheinuferpromenade links the Hohenzollern bridge to the colourful Altstadt gable houses. Dogs must stay on a leash within the old town, and the riverside Poller Wiesen just south offers unofficial off-leash space during quiet hours.',
          es: 'La adoquinada Rheinuferpromenade conecta el puente Hohenzollern con las coloridas casas de la Altstadt. Los perros deben ir con correa en el casco antiguo; los Poller Wiesen, al sur, ofrecen un espacio suelto extraoficial en horas tranquilas.',
        },
      },
      {
        name: 'Stadtwald',
        emoji: '🌲',
        petFriendly: true,
        desc: {
          fr: 'La « forêt urbaine » de Cologne s\'étend sur 205 hectares dans le quartier verdoyant de Lindenthal et dispose d\'un Hundeauslaufplatz clôturé où les chiens peuvent courir librement. Ailleurs, la laisse est obligatoire du 1er mars au 15 juillet pour protéger les oiseaux nicheurs.',
          en: 'Cologne\'s \'city forest\' covers 205 hectares in the leafy Lindenthal district, with a dedicated fenced Hundeauslaufplatz where dogs can run off-leash. Elsewhere in the park leashes are mandatory from 1 March to 15 July to protect ground-nesting birds.',
          es: 'El \'bosque urbano\' de Colonia abarca 205 hectáreas en el frondoso barrio de Lindenthal, con un Hundeauslaufplatz vallado donde los perros corren sueltos. En el resto del parque la correa es obligatoria del 1 de marzo al 15 de julio para proteger a las aves nidificantes.',
        },
      },
      {
        name: 'Beethovenpark & Decksteiner Weiher',
        emoji: '🦆',
        petFriendly: true,
        desc: {
          fr: 'Un parc paysager paisible au sud-ouest du centre, organisé autour d\'un étang d\'aviron de 1,5 km. La laisse est exigée près de l\'eau et des aires de jeux, mais les prairies attenantes font le bonheur des propriétaires de teckels et de bergers allemands.',
          en: 'A calm landscape park southwest of the centre wrapped around a 1.5-kilometre rowing pond. Leashes are required near the water and children\'s areas, but the adjoining meadows are a favourite of local Dackel and Schäferhund owners.',
          es: 'Un tranquilo parque paisajístico al suroeste del centro que rodea un estanque de remo de 1,5 km. La correa es obligatoria junto al agua y las zonas infantiles, pero los prados colindantes son los favoritos de los dueños de teckels y pastores alemanes.',
        },
      },
      {
        name: 'Belgisches Viertel',
        emoji: '☕',
        petFriendly: true,
        desc: {
          fr: 'Les rues ombragées du Belgisches Viertel, baptisées du nom de villes flamandes, forment le quartier le plus branché de Cologne. La plupart des bistrots de la Brüsseler Platz laissent une gamelle dehors et acceptent les chiens sages sous la table — demandez « Hund erlaubt ? ».',
          en: 'The Belgian Quarter\'s tree-lined streets named after Flemish cities form Cologne\'s hippest café grid. Most bistros on Brüsseler Platz keep water bowls outside, and many interiors welcome well-behaved dogs under the table — just ask \'Hund erlaubt?\' first.',
          es: 'Las calles arboladas del Belgisches Viertel, con nombres de ciudades flamencas, forman el barrio más moderno de Colonia. Casi todos los bistrós de Brüsseler Platz dejan un cuenco fuera y admiten perros tranquilos bajo la mesa — pregunta primero ¿Hund erlaubt?.',
        },
      },
      {
        name: 'Rheinpark & Cable Car',
        emoji: '🎡',
        petFriendly: true,
        desc: {
          fr: 'Rive droite face à la vieille ville, le Rheinpark déploie 40 hectares de pelouses soignées. Les chiens voyagent gratuitement sur le téléphérique Kölner Seilbahn (à l\'appréciation du conducteur) s\'ils sont tenus en laisse et muselés, offrant une vue aérienne sur le Rhin.',
          en: 'On the right bank opposite the Altstadt, the Rheinpark stretches 40 hectares with sculpted lawns. Dogs ride free on the Kölner Seilbahn cable car (subject to driver discretion) if leashed and muzzled, giving a stroller-friendly aerial view of the Rhine.',
          es: 'En la orilla derecha frente a la Altstadt, el Rheinpark despliega 40 hectáreas de césped cuidado. Los perros viajan gratis en el teleférico Kölner Seilbahn (a criterio del operador) con correa y bozal, ofreciendo una vista aérea del Rin.',
        },
      },
    ],
    petTips: {
      fr: [
        'La Deutsche Bahn facture un tarif enfant (environ 50 % du billet adulte) pour les chiens plus grands qu\'un chat ; les petits chiens en cage fermée voyagent gratuitement en ICE, IC et trains régionaux.',
        'La muselière est obligatoire pour les chiens de taille moyenne et grande dans les trams, bus et U-Bahn de la KVB aux heures de pointe — gardez une muselière souple dans votre sac.',
        'Au-delà de trois mois de séjour, vous devez déclarer votre chien au Kassenamt dans les 14 jours et commencer à payer la Hundesteuer le mois suivant.',
        'Gardez toujours le passeport européen sur vous : des contrôles aléatoires ont lieu dans les ICE venant de Belgique ou des Pays-Bas à la Hauptbahnhof de Cologne.',
        'Les sacs à déjections sont distribués gratuitement aux bornes vertes Köln-tipptopp dans tous les grands parcs ; l\'amende pour non-ramassage atteint 100 euros.',
      ],
      en: [
        'Deutsche Bahn charges a child fare (around 50 percent of the adult ticket) for dogs larger than a cat; small dogs in a closed carrier travel free on ICE, IC and regional trains.',
        'Muzzles are mandatory for medium and large dogs on all KVB trams, buses and the U-Bahn during rush hours; keep a soft muzzle in your bag.',
        'If you stay longer than three months, you must register your dog with the Kassenamt within 14 days and begin paying Hundesteuer the following month.',
        'Carry your EU pet passport at all times — random checks happen on ICE trains crossing from Belgium or the Netherlands into Cologne Hauptbahnhof.',
        'Dog waste bags are dispensed free at green Köln-tipptopp stations across all major parks; fines for not scooping reach 100 euros.',
      ],
      es: [
        'Deutsche Bahn cobra tarifa infantil (cerca del 50 % del billete de adulto) para perros mayores que un gato; los pequeños en transportín cerrado viajan gratis en ICE, IC y regionales.',
        'El bozal es obligatorio para perros medianos y grandes en los tranvías, autobuses y U-Bahn de KVB en hora punta; lleva un bozal flexible en la bolsa.',
        'Si te quedas más de tres meses, debes inscribir al perro en el Kassenamt en 14 días y empezar a pagar la Hundesteuer el mes siguiente.',
        'Lleva siempre el pasaporte europeo para mascotas: hay controles aleatorios en los ICE que llegan desde Bélgica o Países Bajos a la Hauptbahnhof de Colonia.',
        'Las bolsas para excrementos se reparten gratis en las estaciones verdes Köln-tipptopp de todos los parques; la multa por no recoger llega a 100 euros.',
      ],
    },
    practicalInfo: {
      fr: [
        'Urgences vétérinaires (Tierärztlicher Notdienst Köln) : +49 221 340 5555, rotation 24h/24 des cliniques participantes.',
        'Le Tierheim Köln-Dellbrück (Iddelsfelder Hardt 120) gère les déclarations de pertes et les lectures de puce, tous les jours 10h-16h.',
        'Les races « listées » en NRW incluent le Pit Bull, l\'American Staffordshire, le Staffordshire Bullterrier et le Bull Terrier — une autorisation d\'importation est requise avant l\'arrivée.',
        'L\'aéroport de Cologne/Bonn (CGN) accepte les chiens en cabine jusqu\'à 8 kg avec Eurowings ; les plus gros voyagent en soute via l\'Animal Lounge de Francfort.',
        'La tenue en laisse (Anleinpflicht) est obligatoire sur tous les trottoirs, zones piétonnes, cimetières et à moins de 5 mètres des aires de jeux.',
      ],
      en: [
        'Emergency vet (Tierärztlicher Notdienst Köln): +49 221 340 5555, 24/7 rotation of participating clinics.',
        'Tierheim Köln-Dellbrück (Iddelsfelder Hardt 120) handles lost-pet reports and microchip scans daily 10:00-16:00.',
        'Listed breeds in NRW include Pit Bull, American Staffordshire, Staffordshire Bullterrier and Bullterrier — import permits are required before arrival.',
        'Cologne/Bonn airport (CGN) accepts dogs in cabin up to 8 kg with Eurowings; larger animals travel as cargo via Lufthansa Animal Lounge in Frankfurt.',
        'Leash law (Anleinpflicht) applies citywide on all pavements, pedestrian zones, cemeteries and within 5 metres of playgrounds.',
      ],
      es: [
        'Urgencias veterinarias (Tierärztlicher Notdienst Köln): +49 221 340 5555, rotación 24/7 de clínicas.',
        'El Tierheim Köln-Dellbrück (Iddelsfelder Hardt 120) atiende mascotas perdidas y lectura de microchip de 10:00 a 16:00.',
        'Las razas \'listadas\' en NRW incluyen Pit Bull, American Staffordshire, Staffordshire Bullterrier y Bull Terrier — requieren permiso de importación previo.',
        'El aeropuerto Colonia/Bonn (CGN) admite perros en cabina hasta 8 kg con Eurowings; los mayores viajan como carga vía Animal Lounge de Fráncfort.',
        'La obligación de correa (Anleinpflicht) rige en toda la ciudad en aceras, zonas peatonales, cementerios y a menos de 5 metros de parques infantiles.',
      ],
    },
  },

  munich: {
    history: {
      fr: `Munich (München), capitale de la Bavière depuis 1506, est née d'un établissement monastique du XIIe siècle — son nom vient de « Mönche » — avant de devenir résidence royale baroque et capitale mondiale de la bière. Les Wittelsbach y ont tracé les grands axes et fondé en 1789 le Jardin anglais, l'un des plus vastes parcs urbains d'Europe. La culture bavaroise adore les chiens : les biergartens accueillent traditionnellement les Hunde sages sous les marronniers, et l'on voit des teckels et münsterländers somnoler près des chopes de Helles. La loi bavaroise impose une Hundesteuer (100 euros par an à Munich en 2026) et une assurance responsabilité civile. Les races listées passent un test comportemental. Le quotidien reste détendu : les transports MVG acceptent les chiens en laisse, les bancs de graviers de l'Isar offrent des zones de liberté, et la célèbre vague du Eisbach attire autant les chiens que les humains.`,
      en: `Munich (München), capital of Bavaria since 1506, grew from a 12th-century monks' settlement — its name comes from 'Mönche' — into a baroque royal residence and the world's beer capital. The Wittelsbach dynasty laid out its grand axes and founded the English Garden in 1789, one of Europe's largest urban parks. Bavarian culture adores dogs: biergartens traditionally welcome well-behaved Hunde under the chestnut trees, and you will spot Dackel and Münsterländer napping beside steins of Helles. Bavaria's Landeshundegesetz requires a Hundesteuer (100 euros per year in Munich for 2026) and liability insurance. Listed breeds face a temperament test. Yet daily life is relaxed: MVG public transport accepts leashed dogs, off-leash zones dot the Isar gravel banks, and the famous Surfer's Wave on the Eisbach draws crowds of pets and humans alike.`,
      es: `Múnich (München), capital de Baviera desde 1506, nació de un asentamiento monástico del siglo XII — su nombre viene de 'Mönche' — y se convirtió en residencia real barroca y capital mundial de la cerveza. Los Wittelsbach trazaron sus grandes ejes y fundaron en 1789 el Jardín Inglés, uno de los mayores parques urbanos de Europa. La cultura bávara adora a los perros: los biergartens acogen tradicionalmente Hunde educados bajo los castaños, y verás teckels y münsterländer dormitando junto a jarras de Helles. La ley bávara exige una Hundesteuer (100 euros anuales en Múnich en 2026) y un seguro de responsabilidad civil. Las razas listadas superan una prueba de temperamento. La vida diaria es relajada: el MVG admite perros con correa, las riberas del Isar ofrecen zonas sueltas, y la famosa ola del Eisbach atrae por igual a perros y humanos.`,
    },
    sights: [
      {
        name: 'Englischer Garten',
        emoji: '🌳',
        petFriendly: true,
        desc: {
          fr: 'Avec 375 hectares, le Jardin anglais est plus vaste que Central Park. La laisse est obligatoire sur les allées principales, mais quatre Freilaufflächen balisées — notamment près du Schwabinger Bach et de la Hirschau — autorisent la liberté du lever au coucher du soleil.',
          en: 'At 375 hectares, the English Garden is bigger than New York\'s Central Park. Dogs must be leashed on main paths, but four marked Freilaufflächen — notably near Schwabinger Bach and the Hirschau — allow off-leash running from sunrise to sunset.',
          es: 'Con 375 hectáreas, el Jardín Inglés supera a Central Park. Los perros deben ir con correa en los senderos principales, pero cuatro Freilaufflächen señalizadas — destacan la del Schwabinger Bach y la Hirschau — permiten soltarlos de sol a sol.',
        },
      },
      {
        name: 'Marienplatz & Glockenspiel',
        emoji: '🕰️',
        petFriendly: true,
        desc: {
          fr: 'Le cœur médiéval de la ville abrite le Neues Rathaus néo-gothique et son Glockenspiel aux 43 cloches, qui sonne tous les jours à 11h et 12h. La zone piétonne accepte les chiens en laisse, mais la foule aux heures de spectacle est à éviter avec un chien sensible.',
          en: 'The city\'s medieval heart hosts the neo-Gothic Neues Rathaus and its 43-bell Glockenspiel, which performs at 11:00 and 12:00 daily. The pedestrian zone allows leashed dogs, though the crowds at showtime are best avoided with sensitive pets.',
          es: 'El corazón medieval alberga el Neues Rathaus neogótico y su Glockenspiel de 43 campanas, que suena diariamente a las 11:00 y 12:00. La zona peatonal admite perros con correa, aunque conviene evitar las multitudes del espectáculo con perros sensibles.',
        },
      },
      {
        name: 'Isar River Path',
        emoji: '🏞️',
        petFriendly: true,
        desc: {
          fr: 'L\'Isar renaturée serpente sur 14 kilomètres à travers la ville avec bancs de graviers, bras morts et la zone du Flaucher, au sud du Wittelsbacher Brücke, officiellement ouverte aux chiens sans laisse. La baignade est autorisée hors du secteur central de la Museumsinsel.',
          en: 'The renaturalised Isar winds 14 kilometres through the city with gravel banks, shallow side channels and the Flaucher area south of Wittelsbacher Brücke designated as an official off-leash zone. Swimming is permitted for dogs outside the central Museumsinsel stretch.',
          es: 'El renaturalizado Isar serpentea 14 km por la ciudad con playas de grava, brazos laterales y la zona del Flaucher, al sur del Wittelsbacher Brücke, oficialmente sin correa. Los perros pueden bañarse fuera del tramo central de la Museumsinsel.',
        },
      },
      {
        name: 'Viktualienmarkt Biergarten',
        emoji: '🍺',
        petFriendly: true,
        desc: {
          fr: 'Le marché aux 140 étals accueille en son centre un biergarten de 600 places sous les mâts de mai et les marronniers. La tradition bavaroise y accueille expressément les chiens ; gamelles d\'eau fournies et Leberkäs-Semmel en récompense.',
          en: 'The 140-stall daily food market has a central biergarten seating 600 under maypoles and chestnuts. Bavarian tradition explicitly welcomes dogs at biergarten tables; water bowls are standard and a Leberkäs-Semmel ends most canine visits happily.',
          es: 'El mercado de 140 puestos alberga en su centro un biergarten de 600 plazas bajo maypoles y castaños. La tradición bávara acoge explícitamente a los perros; hay cuencos de agua y un Leberkäs-Semmel suele cerrar la visita canina.',
        },
      },
      {
        name: 'Nymphenburg Palace Park',
        emoji: '🏰',
        petFriendly: true,
        desc: {
          fr: 'La résidence d\'été des Wittelsbach s\'étend sur un parc baroque de 180 hectares, avec canaux et bois. Les chiens en laisse sont admis sur toutes les allées principales, mais interdits dans le parterre formel devant le palais et dans les quatre pavillons.',
          en: 'The summer Wittelsbach residence sits in a 180-hectare baroque park with canals and woodland. Dogs on leash are welcome on every main path, though they are banned from the formal parterre near the palace façade and from the four garden pavilions.',
          es: 'La residencia estival de los Wittelsbach se extiende en un parque barroco de 180 hectáreas con canales y bosques. Se admiten perros con correa en todos los senderos, pero no en el parterre formal junto al palacio ni en los cuatro pabellones.',
        },
      },
      {
        name: 'Olympiapark',
        emoji: '🏟️',
        petFriendly: true,
        desc: {
          fr: 'Aménagé pour les Jeux de 1972, le parc de 85 hectares déploie des collines faites de gravats de guerre autour d\'un lac central. Une vaste Hundewiese clôturée à l\'ouest de l\'Olympiaturm permet la course libre, avec vue sur les Alpes par temps de Föhn.',
          en: 'Built for the 1972 Games, the 85-hectare park has hills recycled from war rubble and a central lake. A large fenced Hundewiese west of the Olympiaturm lets dogs sprint off-leash while owners enjoy skyline views toward the Alps on clear Föhn days.',
          es: 'Construido para los Juegos de 1972, el parque de 85 hectáreas luce colinas de escombros de guerra alrededor de un lago. Una gran Hundewiese vallada al oeste de la Olympiaturm permite soltar al perro con vistas a los Alpes en días de Föhn.',
        },
      },
    ],
    petTips: {
      fr: [
        'Le MVG (U-Bahn, tram, bus) exige un Kinderticket (tarif enfant) pour tout chien plus gros qu\'un sac à main ; les petits en cage fermée voyagent gratuitement.',
        'La muselière n\'est pas obligatoire dans les transports munichois, mais le conducteur peut l\'exiger lors d\'événements bondés comme l\'Oktoberfest.',
        'Étiquette biergarten : chien sous le banc, jamais sur le siège, ni près du coin Brotzeit où l\'on déballe sa propre nourriture.',
        'Les bassins du Flaucher sur l\'Isar sont parfaits pour la baignade, mais l\'eau reste sous 14 °C même en juillet — séchez rapidement.',
        'L\'Oktoberfest (Theresienwiese) interdit officiellement les chiens sur le site ; seule exception : les chiens d\'assistance avec papiers.',
      ],
      en: [
        'MVG (U-Bahn, tram, bus) requires a child-fare Kinderticket for every dog larger than a handbag; small dogs in closed carriers ride free.',
        'Muzzles are not mandatory on Munich public transport, but drivers may request one at their discretion during crowded events like Oktoberfest.',
        'Biergarten etiquette: keep your dog tucked under the bench, never on seats, and never near the Brotzeit area where self-brought food is prepared.',
        'The Isar\'s Flaucher pools are ideal for swimming but water temperatures stay below 14 °C even in July — towel off quickly.',
        'Oktoberfest (Theresienwiese) officially bans dogs from the grounds; the only exception is registered assistance dogs with documentation.',
      ],
      es: [
        'El MVG (U-Bahn, tranvía, bus) exige un Kinderticket para cada perro más grande que un bolso; los pequeños en transportín cerrado viajan gratis.',
        'El bozal no es obligatorio en el transporte muniqués, pero el conductor puede exigirlo en eventos concurridos como el Oktoberfest.',
        'Etiqueta biergarten: perro bajo el banco, nunca en el asiento ni cerca del rincón Brotzeit donde se prepara comida propia.',
        'Las pozas del Flaucher en el Isar son ideales para bañarse, pero el agua sigue bajo 14 °C incluso en julio — seca rápido al perro.',
        'El Oktoberfest (Theresienwiese) prohíbe oficialmente los perros; única excepción, perros de asistencia con documentación.',
      ],
    },
    practicalInfo: {
      fr: [
        'Urgences vétérinaires de Munich : +49 89 5505 3434, nuits de semaine, week-ends et jours fériés.',
        'Le Tierheim München (Riemer Strasse 270) est l\'un des plus grands refuges d\'Europe et reçoit les chiens trouvés 24h/24 à l\'accueil.',
        'Les races listées bavaroises (catégorie 1) incluent Pit Bull Terrier, Bandog, American Staffordshire et Tosa Inu — l\'entrée requiert un permis du Kreisverwaltungsreferat.',
        'L\'aéroport de Munich (MUC) dispose d\'une Animal Lounge au Terminal 1 pour les transits internationaux ; réservez 48 heures à l\'avance.',
        'La laisse est obligatoire dans toutes les zones piétonnes, bâtiments publics et à moins de 200 mètres des écoles en période scolaire.',
      ],
      en: [
        'Tierärztlicher Notdienst München hotline: +49 89 5505 3434, active weekday nights, weekends and holidays.',
        'Tierheim München (Riemer Strasse 270) is one of Europe\'s largest shelters and accepts found dogs 24/7 at its intake desk.',
        'Bavarian listed breeds (Kategorie 1) include Pit Bull Terrier, Bandog, American Staffordshire and Tosa Inu — entry requires a special permit from the Kreisverwaltungsreferat.',
        'Munich airport (MUC) offers a dedicated Animal Lounge at Terminal 1 for international transits; reserve 48 hours ahead.',
        'City-wide leash requirement applies on all pedestrian zones, public buildings and within 200 metres of schools during term time.',
      ],
      es: [
        'Urgencias veterinarias Múnich: +49 89 5505 3434, noches entre semana, fines de semana y festivos.',
        'El Tierheim München (Riemer Strasse 270) es uno de los mayores refugios de Europa y recibe perros encontrados 24/7.',
        'Las razas listadas bávaras (categoría 1) incluyen Pit Bull Terrier, Bandog, American Staffordshire y Tosa Inu — la entrada requiere permiso del Kreisverwaltungsreferat.',
        'El aeropuerto de Múnich (MUC) cuenta con Animal Lounge en la Terminal 1 para tránsitos internacionales; reserva con 48 horas.',
        'La correa es obligatoria en zonas peatonales, edificios públicos y a menos de 200 metros de colegios en horario lectivo.',
      ],
    },
  },

  salzburg: {
    history: {
      fr: `Salzbourg, la « Rome du Nord » classée UNESCO, doit sa richesse à l'or blanc — le sel — extrait du Dürrnberg depuis les Celtes. Les princes-archevêques la gouvernèrent en État indépendant jusqu'en 1803, laissant la forteresse du Hohensalzburg, la vieille ville baroque et une tradition musicale couronnée par Mozart, l'enfant du pays. L'Autriche fixe les règles canines au niveau fédéral : puce, passeport européen et assurance responsabilité civile sont obligatoires, et la ville de Salzbourg perçoit une Hundeabgabe de 72 euros par an. Le Land exige un Hundeführerschein pour tout maître n'en ayant jamais détenu, à obtenir dans les quatre mois suivant l'enregistrement. La proximité des Alpes apporte hivers froids et étés de Föhn ; la ville compense par les berges vertes de la Salzach, les sentiers ombragés du Kapuzinerberg et une densité rare de Konditoreien dog-friendly.`,
      en: `Salzburg, the UNESCO-listed 'Rome of the North', grew rich on the white gold — salt — mined in the Dürrnberg since Celtic times. The prince-archbishops ruled it as an independent state until 1803, leaving behind the Hohensalzburg fortress, the baroque Altstadt and a music tradition crowned by native son Mozart. Austria's dog rules are set federally: microchip, EU passport and liability insurance are compulsory, and the city of Salzburg levies a Hundeabgabe of 72 euros per year. Salzburg Land requires a Hundeführerschein (dog licence) for any dog whose owner has never held one before, completed within four months of registration. Alpine proximity brings cold winters and hot Föhn summers; the city compensates with green banks along the Salzach, shaded Kapuzinerberg trails and an unusually high density of pet-welcoming Konditoreien.`,
      es: `Salzburgo, la 'Roma del Norte' declarada Patrimonio UNESCO, se enriqueció con el oro blanco — la sal — extraída del Dürrnberg desde tiempos celtas. Los príncipes-arzobispos la gobernaron como estado independiente hasta 1803, legando la fortaleza Hohensalzburg, el casco barroco y una tradición musical coronada por Mozart, hijo de la ciudad. Austria fija las normas caninas a nivel federal: microchip, pasaporte europeo y seguro de responsabilidad civil son obligatorios, y la ciudad cobra una Hundeabgabe de 72 euros anuales. El Land exige un Hundeführerschein a todo dueño primerizo, obtenible en los cuatro meses tras el registro. La cercanía alpina trae inviernos fríos y veranos de Föhn; la ciudad compensa con riberas verdes del Salzach, senderos sombreados del Kapuzinerberg y una densidad rara de Konditoreien que admiten perros.`,
    },
    sights: [
      {
        name: 'Hohensalzburg Fortress',
        emoji: '🏰',
        petFriendly: true,
        desc: {
          fr: 'Le plus grand château médiéval intact d\'Europe couronne le Festungsberg à 506 mètres. Les chiens en laisse peuvent emprunter le funiculaire et parcourir les cours extérieures et remparts ; les salles du musée et les appartements princiers leur sont interdits.',
          en: 'Europe\'s largest fully preserved medieval castle crowns the Festungsberg at 506 metres. Leashed dogs may ride the funicular and walk the outer courtyards and ramparts; interior museum rooms and the prince\'s chambers are not accessible with pets.',
          es: 'El mayor castillo medieval íntegro de Europa corona el Festungsberg a 506 metros. Los perros con correa pueden subir en el funicular y recorrer los patios exteriores y murallas; las salas del museo y los aposentos principescos quedan vetados.',
        },
      },
      {
        name: 'Mirabellgarten',
        emoji: '🌹',
        petFriendly: false,
        desc: {
          fr: 'Le jardin baroque de 1690 et sa fontaine du Pégase ont servi de décor à La Mélodie du bonheur. Les chiens sont strictement interdits dans les parterres, mais le Kurpark voisin, le long de la Salzach, les accepte en laisse.',
          en: 'The 1690 baroque garden with its Pegasus fountain starred in The Sound of Music. Dogs are strictly prohibited inside the formal parterres per city bylaw, but the adjoining Kurpark along the Salzach allows leashed pets and makes a fine substitute.',
          es: 'El jardín barroco de 1690 y su fuente de Pegaso aparecen en Sonrisas y Lágrimas. Los perros están estrictamente prohibidos en los parterres, pero el contiguo Kurpark junto al Salzach los admite con correa.',
        },
      },
      {
        name: 'Salzach River Path',
        emoji: '🚶',
        petFriendly: true,
        desc: {
          fr: 'Les deux rives de la Salzach émeraude offrent 7 kilomètres de promenade pavée reliant Mülln à Aigen. La plage de graviers du Glanspitz est l\'un des rares endroits de la ville où les chiens peuvent légalement se baigner hors zone de protection d\'eau potable.',
          en: 'Both banks of the emerald Salzach offer 7 kilometres of paved promenade linking Mülln to Aigen. The gravel beach at Glanspitz marks one of the few city spots where dogs may legally swim outside the drinking-water protection zone.',
          es: 'Ambas orillas del esmeralda Salzach ofrecen 7 km de paseo pavimentado entre Mülln y Aigen. La playa de grava del Glanspitz es uno de los pocos puntos urbanos donde los perros pueden bañarse legalmente fuera de la zona de protección de agua potable.',
        },
      },
      {
        name: 'Kapuzinerberg',
        emoji: '⛰️',
        petFriendly: true,
        desc: {
          fr: 'La colline boisée de 640 mètres face à la vieille ville se gravit en 40 minutes jusqu\'au monastère des Capucins ; des chevreuils y vivent librement. Laisse obligatoire toute l\'année (réserve naturelle), mais les sentiers restent ombragés en juillet.',
          en: 'The 640-metre wooded hill opposite the Altstadt offers a 40-minute climb to the Capuchin monastery with wild-roaming roe deer. Dogs must stay on leash year-round because of the wildlife reserve status, but paths are shaded even in July.',
          es: 'La colina boscosa de 640 metros frente a la Altstadt se sube en 40 minutos hasta el monasterio capuchino, con corzos en libertad. La correa es obligatoria todo el año por la reserva natural, pero los senderos se mantienen sombreados en julio.',
        },
      },
      {
        name: 'Hellbrunn Palace & Trick Fountains',
        emoji: '⛲',
        petFriendly: true,
        desc: {
          fr: 'Palais de plaisance de 1615 célèbre pour ses grottes et fontaines-farces destinées à arroser les invités. Le parc de 60 hectares accepte gratuitement les chiens en laisse ; la visite guidée des fontaines, elle, n\'est pas adaptée à cause des jets.',
          en: 'A 1615 pleasure palace famous for water-powered grottoes and trick fountains designed to soak unsuspecting guests. The 60-hectare park welcomes leashed dogs free of charge; the trick-fountain guided tour itself is not pet-appropriate due to spraying jets.',
          es: 'Palacio de recreo de 1615 célebre por sus grutas y fuentes-broma que mojan a los invitados. El parque de 60 hectáreas admite perros con correa gratis; la visita guiada de las fuentes no es apta por los chorros sorpresa.',
        },
      },
      {
        name: 'Getreidegasse & Mozart\'s Birthplace',
        emoji: '🎼',
        petFriendly: true,
        desc: {
          fr: 'La ruelle commerçante de 800 ans, célèbre pour ses enseignes en fer forgé, fait face à la maison natale jaune de Mozart, au numéro 9. Les chiens en laisse sont admis dans la rue et sur la plupart des terrasses, mais pas à l\'intérieur du musée.',
          en: 'The narrow 800-year-old shopping street with its wrought-iron guild signs fronts Mozart\'s bright-yellow birth house at number 9. Leashed dogs are permitted on the street and on most café terraces, but not inside the Mozart museum itself.',
          es: 'La callejuela comercial de 800 años, famosa por sus rótulos de hierro forjado, da al número 9 donde nació Mozart, en la casa amarilla. Se admiten perros con correa en la calle y en la mayoría de terrazas, no dentro del museo.',
        },
      },
    ],
    petTips: {
      fr: [
        'Les chemins de fer autrichiens ÖBB : grand chien = demi-tarif adulte, muselière et laisse obligatoires ; petit chien en cage, gratuit.',
        'Salzbourg impose le sac jaune Biokompostsackerl (biodégradable) disponible tous les 200 mètres — utiliser un sac non biodégradable dans les bacs de compost coûte 70 euros d\'amende.',
        'Dans les cafés et restaurants salzbourgeois, le chien reste au sol, jamais sur les banquettes — norme autrichienne stricte héritée de la tradition des cafés.',
        'Par temps de Föhn estival, le thermomètre dépasse 32 °C : marchez tôt dans l\'ombragée Leopoldskroner Allee et évitez les pavés de la Residenzplatz après 11h.',
        'Les races listées au Land (Bull Terrier, Rottweiler, American Staffordshire…) exigent un Sachkundenachweis obtenu avant l\'entrée sur le territoire.',
      ],
      en: [
        'ÖBB Austrian Railways: large dogs need a half-price adult ticket plus muzzle and leash on all trains; small dogs in a carrier ride free.',
        'Salzburg Stadt requires a yellow Biokompostsackerl (biodegradable bag) in dispensers every 200 metres — using non-biodegradable bags in the compost bins draws a 70 euro fine.',
        'In all Salzburg restaurants and cafés, dogs must lie on the floor, never on the upholstered benches — a strict Austrian norm also enforced in coffeehouse tradition.',
        'Summer Föhn days push temperatures above 32 °C; walk the shaded Leopoldskroner Allee early and avoid the open Residenzplatz cobblestones after 11:00.',
        'Listed \'aggressive\' breeds in Salzburg Land (e.g. Bull Terrier, Rottweiler, American Staffordshire) require a Sachkundenachweis obtained before the animal enters the state.',
      ],
      es: [
        'Los ferrocarriles austríacos ÖBB: perro grande, medio billete adulto con bozal y correa; perro pequeño en transportín, gratis.',
        'Salzburgo exige bolsa amarilla Biokompostsackerl (biodegradable) en dispensadores cada 200 metros — usar bolsas no biodegradables en los contenedores de compost supone 70 euros de multa.',
        'En cafés y restaurantes de Salzburgo el perro va al suelo, nunca sobre los bancos tapizados — norma austríaca estricta de la tradición cafetera.',
        'En días de Föhn estival se superan los 32 °C: camina temprano por la sombreada Leopoldskroner Allee y evita los adoquines de la Residenzplatz después de las 11:00.',
        'Las razas listadas del Land (Bull Terrier, Rottweiler, American Staffordshire…) requieren Sachkundenachweis obtenido antes de entrar en el estado.',
      ],
    },
    practicalInfo: {
      fr: [
        'Urgences vétérinaires (Ordre des vétérinaires de Salzbourg) : +43 662 435645, redirection vers la clinique de garde.',
        'Le Tierheim Salzburg (Bayernstrasse 1) accueille les chiens trouvés 24h/24 et croise les photos avec la Heimtierdatenbank nationale par puce.',
        'L\'aéroport de Salzbourg (SZG) admet en cabine les chiens de moins de 8 kg avec Austrian Airlines et Eurowings ; au-delà, soute uniquement et sur certaines lignes.',
        'Les chiens sont interdits dans les piscines publiques mais bienvenus sur le Hundebadeplatz du Glan, à Liefering.',
        'La laisse est obligatoire dans toute zone urbanisée, sur les sentiers des alpages (Almen) et en saison de protection du gibier forestier (1er avril-30 juin).',
      ],
      en: [
        'Veterinary emergency line (Tierärztekammer Salzburg): +43 662 435645, redirects to the on-duty clinic after hours.',
        'Tierheim Salzburg (Bayernstrasse 1) takes lost dogs 24/7 and maintains a photo database checked against microchips via the national Heimtierdatenbank.',
        'Salzburg airport (SZG) allows dogs under 8 kg in cabin with Austrian Airlines and Eurowings; larger animals fly as checked baggage only on selected routes.',
        'Dogs are banned from Salzburg\'s public swimming lidos but welcome at the dedicated Hundebadeplatz on the Glan stream in Liefering.',
        'Statewide leash requirement applies in all built-up areas, on marked hiking trails through alpine pastures (Almen), and during forest wildlife-protection season (1 April to 30 June).',
      ],
      es: [
        'Urgencias veterinarias (Colegio de Veterinarios de Salzburgo): +43 662 435645, redirige a la clínica de guardia.',
        'El Tierheim Salzburg (Bayernstrasse 1) recibe perros perdidos 24/7 y coteja fotos con la Heimtierdatenbank nacional por microchip.',
        'El aeropuerto de Salzburgo (SZG) admite en cabina perros de menos de 8 kg con Austrian Airlines y Eurowings; los mayores viajan en bodega solo en rutas seleccionadas.',
        'Los perros no entran en las piscinas públicas, pero sí en el Hundebadeplatz del arroyo Glan, en Liefering.',
        'La correa es obligatoria en toda zona urbanizada, en los senderos de pastos alpinos (Almen) y en temporada de protección de fauna forestal (1 de abril-30 de junio).',
      ],
    },
  },

  zurich: {
    history: {
      fr: `Zurich, fondée par les Romains sous le nom de Turicum au bord de la Limmat, est passée du bourg marchand médiéval au centre financier de la Suisse, référence mondiale de qualité de vie. Huldrych Zwingli y lança la Réforme suisse depuis le Grossmünster en 1519, façonnant une éthique civique encore attachée à l'ordre et à la précision. Le canton prend les chiens au sérieux : chaque maître paie une Hundesteuer cantonale (env. 170 CHF pour le premier chien en 2026), l'animal doit être pucé dans la base AMICUS et l'assurance responsabilité civile est obligatoire. Le Hundeführerschein fédéral a été supprimé en 2017, mais Zurich a réintroduit un cours pratique pour les primo-propriétaires. En échange, la ville est taillée pour les chiens : baignades propres dans le lac, compartiments de tram dédiés, crêtes boisées de l'Uetliberg et accueil exceptionnellement généreux dans les restaurants et boutiques.`,
      en: `Zurich, founded by the Romans as Turicum on the Limmat, grew from a medieval trading town into Switzerland's financial capital and a global benchmark for quality of life. Huldrych Zwingli launched the Swiss Reformation from the Grossmünster in 1519, shaping a civic ethic that still prizes order and precision. Canton Zurich is dog-serious: every owner pays a cantonal Hundesteuer (around 170 CHF for the first dog in 2026), the animal must be microchipped in the national AMICUS database, and liability insurance is mandatory. The old federal Hundeführerschein was abolished in 2017, but Canton Zurich reinstated a practical course requirement for first-time owners. The reward is a city built for dogs: clean lake swimming zones, dedicated tram compartments, the Uetliberg's forested ridges and an unusually generous welcome in restaurants and shops.`,
      es: `Zúrich, fundada por los romanos como Turicum a orillas del Limmat, pasó de burgo medieval a capital financiera de Suiza y referencia mundial de calidad de vida. Huldrych Zwingli lanzó la Reforma suiza desde el Grossmünster en 1519, forjando una ética cívica aún apegada al orden y la precisión. El cantón se toma en serio a los perros: cada dueño paga una Hundesteuer cantonal (unos 170 CHF por el primer perro en 2026), el animal debe ir chipado en la base AMICUS y el seguro de responsabilidad civil es obligatorio. El Hundeführerschein federal desapareció en 2017, pero Zúrich reintrodujo un curso práctico para dueños primerizos. A cambio, la ciudad está hecha para perros: baños limpios en el lago, compartimentos de tranvía dedicados, crestas boscosas del Uetliberg y una acogida excepcional en restaurantes y comercios.`,
    },
    sights: [
      {
        name: 'Lake Zurich & Seebad',
        emoji: '🏊',
        petFriendly: true,
        desc: {
          fr: 'Le lac glaciaire de 40 kilomètres dessine la bordure sud de la ville. Les chiens n\'entrent pas dans les Seebad aménagés (Enge, Utoquai) mais disposent de trois Hundebadeplätze — Wollishofen, Tiefenbrunnen et Zürichhorn — avec entrées herbeuses en pente douce.',
          en: 'The 40-kilometre glacial lake defines the city\'s southern edge. Dogs cannot enter the manicured swimming lidos (Seebad Enge, Utoquai) but have three dedicated Hundebadeplätze — Wollishofen, Tiefenbrunnen and Zürichhorn — with gently sloping grass entries.',
          es: 'El lago glaciar de 40 km define el borde sur de la ciudad. Los perros no entran en los Seebad ajardinados (Enge, Utoquai) pero tienen tres Hundebadeplätze — Wollishofen, Tiefenbrunnen y Zürichhorn — con rampas herbosas suaves.',
        },
      },
      {
        name: 'Uetliberg',
        emoji: '🥾',
        petFriendly: true,
        desc: {
          fr: 'Le « sommet de Zurich » à 870 mètres se rejoint en 20 minutes par le train S10 — chiens gratuits avec Hundepass ou demi-tarif. La crête de 4 kilomètres jusqu\'à Felsenegg enchaîne les bancs panoramiques ; laisse obligatoire en saison de nidification (1er avril-31 juillet).',
          en: 'The 870-metre \'top of Zurich\' is reachable in 20 minutes on the S10 train — dogs ride free with a Hundepass or half-fare ticket. A 4-kilometre ridge trail to Felsenegg links panoramic benches; watch for mandatory leash signs during nesting season from 1 April to 31 July.',
          es: 'La \'cumbre de Zúrich\', a 870 metros, se alcanza en 20 minutos con el tren S10 — los perros viajan gratis con Hundepass o billete de media tarifa. La cresta de 4 km hasta Felsenegg encadena bancos panorámicos; correa obligatoria en época de nidificación (1 de abril-31 de julio).',
        },
      },
      {
        name: 'Altstadt & Grossmünster',
        emoji: '⛪',
        petFriendly: true,
        desc: {
          fr: 'La vieille ville médiévale s\'étend sur les deux rives de la Limmat entre le Grossmünster à deux tours et les vitraux de Chagall du Fraumünster. Chiens en laisse bienvenus dans toutes les ruelles et sur la plupart des ponts, mais pas dans les églises ; la terrasse voisine du Lindenhof offre une pause ombragée.',
          en: 'The medieval old town straddles the Limmat between the twin-towered Grossmünster and the Fraumünster\'s Chagall windows. Dogs on leash are welcome on all lanes and most bridges, but not inside the churches; the nearby Lindenhof terrace offers a quiet shaded break.',
          es: 'El casco medieval se extiende a ambos lados del Limmat entre las dos torres del Grossmünster y las vidrieras de Chagall del Fraumünster. Se admiten perros con correa en todas las callejuelas y casi todos los puentes, no dentro de las iglesias; la cercana terraza del Lindenhof ofrece sombra tranquila.',
        },
      },
      {
        name: 'Zurichhorn & Chinese Garden',
        emoji: '🌸',
        petFriendly: true,
        desc: {
          fr: 'Parc au bord du lac sur la rive est, avec pelouses, la sculpture cinétique Heureka et le Jardin chinois (don de la ville jumelle de Kunming). Chiens libres tolérés sur les prairies, laisse près de l\'entrée du jardin et des kiosques.',
          en: 'A lakeside park on the eastern shore with lawns, the Heureka kinetic sculpture and Zurich\'s Chinese Garden (a gift from twin city Kunming). Dogs off-leash are tolerated on the meadows but must be leashed near the garden entrance and the kiosk areas.',
          es: 'Parque a orillas del lago en la costa este, con praderas, la escultura cinética Heureka y el Jardín Chino (regalo de la ciudad hermanada de Kunming). Se toleran perros sueltos en las praderas, correa cerca de la entrada del jardín y los kioscos.',
        },
      },
      {
        name: 'Sihlwald',
        emoji: '🌲',
        petFriendly: true,
        desc: {
          fr: 'L\'unique Wildnispark de Suisse couvre 11 km² de hêtraies anciennes à 20 minutes au sud par le S4. Laisse partout dans la réserve (protection des cerfs et du lynx) ; le sentier principal de la vallée de la Sihl reste accessible aux poussettes toute l\'année.',
          en: 'Switzerland\'s only Wildnispark covers 11 square kilometres of old-growth beech forest 20 minutes south by S4 train. Dogs must stay on leash everywhere inside the reserve to protect red deer and lynx, with the main Sihl valley path stroller-accessible year-round.',
          es: 'El único Wildnispark de Suiza abarca 11 km² de hayedos viejos a 20 minutos al sur en el S4. Correa obligatoria en toda la reserva (protección de ciervos y lince); el sendero principal del valle del Sihl es apto para cochecitos todo el año.',
        },
      },
      {
        name: 'Bahnhofstrasse & Paradeplatz',
        emoji: '💳',
        petFriendly: true,
        desc: {
          fr: 'L\'avenue commerçante de 1,4 km entre la gare et le lac figure parmi les plus chères du monde. Les chiens en laisse sont admis dans la plupart des grands magasins (Jelmoli, Globus), et le temple du chocolat Sprüngli, sur la Paradeplatz, met une gamelle à la porte.',
          en: 'The 1.4-kilometre shopping avenue from the main station to the lake is one of the world\'s most expensive addresses. Leashed dogs are admitted in most department stores (Jelmoli, Globus) and the chocolate temple Sprüngli on Paradeplatz provides a water bowl at the door.',
          es: 'La avenida comercial de 1,4 km entre la estación y el lago figura entre las direcciones más caras del mundo. Se admiten perros con correa en la mayoría de grandes almacenes (Jelmoli, Globus), y la chocolatería Sprüngli, en la Paradeplatz, deja un cuenco de agua en la puerta.',
        },
      },
    ],
    petTips: {
      fr: [
        'Le Hundebillett CFF coûte 25 CHF forfaitaires pour un jour sur tous les trains, trams et bus du pays ; les petits chiens de moins de 30 cm en cage voyagent gratuitement.',
        'Le Hundepass annuel à 350 CHF couvre les voyages illimités sur les CFF et devient rentable dès 14 jours de déplacement — idéal pour un tour de Suisse.',
        'Le canton de Zurich interdit 8 races à risque (Pit Bull Terrier, American Staffordshire, croisements Bull Terrier…) ; entrée touristique autorisée jusqu\'à 30 jours avec enregistrement obligatoire.',
        'Les stations Robidog se trouvent tous les 300 mètres le long du lac et des rivières ; amende de 80 CHF pour non-ramassage dans tout le canton.',
        'Les restaurants affichant l\'autocollant Hund willkommen (ville de Zurich) garantissent une gamelle et une place à l\'écart de la cuisine — raccourci utile.',
      ],
      en: [
        'SBB Hundebillett (dog ticket) costs a flat CHF 25 for a day pass covering all trains, trams and buses nationwide; small dogs under 30 cm in a carrier ride free.',
        'An annual Hundepass at CHF 350 covers unlimited SBB travel and pays off after roughly 14 day passes — ideal for holidays touring multiple cantons.',
        'Canton Zurich bans 8 high-risk breeds outright (Pit Bull Terrier, American Staffordshire, Bull Terrier crossings and others); temporary tourist entry up to 30 days is allowed but registration is mandatory.',
        'Poop-bag \'Robidog\' stations stand every 300 metres along lake and river paths; fine for not picking up is CHF 80 anywhere in Canton Zurich.',
        'Restaurants with a Hund willkommen sticker (issued by the city) guarantee a water bowl and a spot away from the kitchen — useful shortcut when scanning menus.',
      ],
      es: [
        'El Hundebillett de SBB cuesta 25 CHF fijos por un día en todos los trenes, tranvías y autobuses del país; los perros pequeños de menos de 30 cm en transportín viajan gratis.',
        'El Hundepass anual de 350 CHF cubre viajes ilimitados en SBB y resulta rentable a partir de 14 días de movimiento — ideal para recorrer cantones.',
        'El cantón de Zúrich prohíbe 8 razas de riesgo (Pit Bull Terrier, American Staffordshire, cruces de Bull Terrier…); entrada turística permitida hasta 30 días con registro obligatorio.',
        'Las estaciones Robidog están cada 300 metros en lago y ríos; la multa por no recoger es de 80 CHF en todo el cantón.',
        'Los restaurantes con la pegatina Hund willkommen (ciudad de Zúrich) garantizan cuenco de agua y mesa lejos de la cocina — atajo útil al elegir.',
      ],
    },
    practicalInfo: {
      fr: [
        'Le Tierspital de Zurich (Winterthurerstrasse 260) dispose d\'urgences petits animaux 24h/24 : +41 44 635 81 11.',
        'Chien perdu ? Zurich utilise la base nationale ANIS/AMICUS gérée par Identitas AG ; tout vétérinaire ou poste de police peut scanner la puce.',
        'L\'aéroport de Zurich (ZRH) abrite l\'Animal Welfare Zurich pour les transits internationaux ; Swiss WorldCargo accepte les animaux sur la plupart des long-courriers (réservation 72 h à l\'avance).',
        'Les chiens voyagent gratuitement sur les trams et bus VBZ en heures creuses ; en 6h-9h et 17h-19h, un billet enfant demi-tarif est exigé pour les moyens et grands chiens.',
        'Laisse obligatoire dans toutes les forêts du canton du 1er avril au 31 juillet (protection de la faune) ; amende jusqu\'à 300 CHF en cas de chien en liberté.',
      ],
      en: [
        'Tierspital Zurich (Winterthurerstrasse 260) runs a 24/7 small-animal emergency clinic: +41 44 635 81 11.',
        'Lost pet? Zurich uses the national ANIS/AMICUS microchip database run by Identitas AG; any vet or police station can scan and look up owners.',
        'Zurich Flughafen (ZRH) has the Animal Welfare Zurich cargo station for international transit; Swiss WorldCargo accepts pets on most long-haul flights with 72-hour booking.',
        'Dogs ride free on VBZ trams and buses outside peak hours; during 6:00-9:00 and 17:00-19:00 a half-fare child ticket is required for medium and large dogs.',
        'Canton-wide leash requirement runs from 1 April to 31 July in every forest to protect wildlife, with fines up to CHF 300 for free-running dogs.',
      ],
      es: [
        'El Tierspital de Zúrich (Winterthurerstrasse 260) tiene urgencias de pequeños animales 24/7: +41 44 635 81 11.',
        '¿Perro perdido? Zúrich usa la base nacional ANIS/AMICUS gestionada por Identitas AG; cualquier veterinario o comisaría puede escanear el chip.',
        'El aeropuerto de Zúrich (ZRH) alberga Animal Welfare Zurich para tránsitos internacionales; Swiss WorldCargo acepta mascotas en la mayoría de vuelos largos con reserva de 72 horas.',
        'Los perros viajan gratis en tranvías y buses VBZ en horas valle; entre 6:00-9:00 y 17:00-19:00 se exige billete infantil de media tarifa para medianos y grandes.',
        'Correa obligatoria en todos los bosques del cantón del 1 de abril al 31 de julio (protección de fauna); multa de hasta 300 CHF por perro suelto.',
      ],
    },
  },

  bologna: {
    history: {
      fr: `Bologne, capitale de l'Émilie-Romagne, a gagné ses surnoms La Dotta (la Savante) en accueillant la plus ancienne université d'Europe, fondée en 1088; La Rossa pour ses toits en terre cuite; et La Grassa pour une cuisine fondée sur les tortellini, la mortadelle et le ragù. Près de 62 kilomètres de portiques médiévaux, aujourd'hui classés à l'UNESCO, abritent les piétons du soleil et de la pluie, rendant le centre historique exceptionnellement agréable à parcourir avec un chien. La culture bolognaise embrasse les compagnons à quatre pattes: les trattorias accueillent volontiers les chiens bien élevés, et la race locale, le Bichon Bolonais, a été élevée ici comme chien de salon durant la Renaissance. Les collines verdoyantes au sud des remparts, notamment vers San Luca, sont depuis des siècles un lieu de promenade apprécié.`,
      en: `Bologna, capital of Emilia-Romagna, earned its nicknames La Dotta (the Learned) for hosting Europe's oldest university, founded in 1088; La Rossa for its terracotta rooftops; and La Grassa for a cuisine built on tortellini, mortadella and ragù. Nearly 38 miles of medieval porticoes, now UNESCO-listed, shelter pedestrians from sun and rain, making the historic core uniquely walkable with a dog at your side. Bolognese culture embraces four-legged companions: trattorie routinely welcome well-behaved dogs, and the city's own ancient breed, the Bolognese toy dog, was bred here as a Renaissance lap companion and gifted among European courts. Leafy hills rise immediately south of the walls, where trails toward San Luca have been a pilgrim and dog-walker favorite for centuries.`,
      es: `Bolonia, capital de Emilia-Romaña, ganó sus apodos La Dotta (la Sabia) por albergar la universidad más antigua de Europa, fundada en 1088; La Rossa por sus tejados de terracota; y La Grassa por una cocina basada en tortellini, mortadela y ragú. Casi 62 kilómetros de pórticos medievales, hoy declarados Patrimonio de la UNESCO, protegen a los peatones del sol y la lluvia, haciendo que el centro histórico sea excepcionalmente transitable con un perro. La cultura boloñesa abraza a los compañeros de cuatro patas: las trattorias suelen admitir perros bien educados, y la raza local, el Bichón Boloñés, se crió aquí como perro de regazo renacentista, regalado entre cortes europeas. Las colinas al sur de las murallas, hacia San Luca, son desde hace siglos un paseo muy querido.`,
    },
    sights: [
      {
        name: 'Portico di San Luca',
        emoji: '⛪',
        petFriendly: true,
        desc: {
          fr: 'Une arcade couverte de 3,8 km avec 666 arches grimpant la Colle della Guardia jusqu\'au Sanctuaire de la Madone de San Luca. Les chiens en laisse sont les bienvenus sur toute la montée, et les portiques ombragés la rendent praticable même en été.',
          en: 'A 3.8 km covered arcade with 666 arches climbing Colle della Guardia to the Sanctuary of the Madonna di San Luca. Dogs on leash are welcome along the entire ascent, and the shaded porticoes make it viable even in summer heat.',
          es: 'Una arcada cubierta de 3,8 km con 666 arcos que sube la Colle della Guardia hasta el Santuario de la Virgen de San Luca. Se admiten perros con correa en toda la subida, y los pórticos sombreados la hacen viable incluso con el calor del verano.',
        },
      },
      {
        name: 'Giardini Margherita',
        emoji: '🌳',
        petFriendly: true,
        desc: {
          fr: 'Le plus grand parc public de Bologne, ouvert en 1879 et inspiré des jardins anglais, couvre 26 hectares juste hors de Porta Santo Stefano. Il dispose de deux aires canines clôturées sans laisse, d\'un étang et de pelouses ombragées parfaites pour un pique-nique.',
          en: 'Bologna\'s largest public park, opened in 1879 and modeled on English gardens, covers 26 hectares just outside Porta Santo Stefano. It features two fenced off-leash dog areas, a pond and shaded lawns ideal for a picnic after a long city walk.',
          es: 'El mayor parque público de Bolonia, inaugurado en 1879 e inspirado en jardines ingleses, ocupa 26 hectáreas junto a Porta Santo Stefano. Cuenta con dos zonas caninas valladas sin correa, un estanque y praderas sombreadas ideales para un picnic.',
        },
      },
      {
        name: 'Piazza Maggiore & Basilica di San Petronio',
        emoji: '🏛️',
        petFriendly: false,
        desc: {
          fr: 'Le cœur civique de la ville depuis le XIIIe siècle, bordé du Palazzo d\'Accursio et de la façade inachevée de San Petronio, l\'une des plus grandes églises du monde. Les chiens sont admis sur la place mais pas à l\'intérieur de la basilique.',
          en: 'The civic heart of the city since the 13th century, flanked by the Palazzo d\'Accursio and the unfinished façade of San Petronio, one of the largest churches in the world. Dogs are welcome on the square itself, but not inside the basilica.',
          es: 'El corazón cívico de la ciudad desde el siglo XIII, flanqueado por el Palazzo d\'Accursio y la fachada inacabada de San Petronio, una de las iglesias más grandes del mundo. Se admiten perros en la plaza pero no dentro de la basílica.',
        },
      },
      {
        name: 'Quadrilatero Market',
        emoji: '🧀',
        petFriendly: true,
        desc: {
          fr: 'Un dédale médiéval à l\'est de Piazza Maggiore où salumerie, fromageries et osterie commercent depuis le Moyen Âge. Les chiens en laisse sont bienvenus en extérieur à la plupart des étals et terrasses, mais exclus des comptoirs intérieurs pour raisons d\'hygiène.',
          en: 'A dense grid of medieval lanes east of Piazza Maggiore where salumerie, cheese shops and osterie have traded since the Middle Ages. Leashed dogs are welcomed outdoors at most stalls and café terraces, though food-hygiene rules keep them out of indoor counters.',
          es: 'Una cuadrícula medieval al este de Piazza Maggiore donde salumerie, queserías y osterie comercian desde la Edad Media. Se admiten perros con correa al aire libre en la mayoría de puestos y terrazas, aunque las normas de higiene los excluyen de los mostradores interiores.',
        },
      },
      {
        name: 'Le Due Torri (Asinelli & Garisenda)',
        emoji: '🗼',
        petFriendly: false,
        desc: {
          fr: 'Les tours penchées jumelles, bâties par des familles rivales vers 1109-1119, définissent la silhouette de Bologne. La place en contrebas est accessible aux chiens, mais la montée de 498 marches de l\'Asinelli leur est interdite et l\'accès reste limité le temps de la restauration de la Garisenda.',
          en: 'The leaning twin towers built by rival noble families around 1109-1119 are Bologna\'s defining skyline. The base piazza is pet-friendly, but the 498-step climb up Asinelli is off-limits to dogs and currently restricted pending restoration of Garisenda.',
          es: 'Las torres gemelas inclinadas, construidas por familias rivales hacia 1109-1119, definen el perfil de Bolonia. La plaza a sus pies admite perros, pero los 498 escalones de la Asinelli están vetados para ellos y el acceso sigue limitado mientras se restaura la Garisenda.',
        },
      },
      {
        name: 'Parco di Villa Ghigi',
        emoji: '🌲',
        petFriendly: true,
        desc: {
          fr: 'Un parc de colline de 28 hectares à dix minutes des remparts, avec oliveraies, vergers et larges vues sur les toits. Les chiens peuvent courir sans laisse sur les prairies balisées, ce qui en fait l\'évasion préférée des habitants pour les longues balades matinales.',
          en: 'A 28-hectare hillside park ten minutes from the walls, with olive groves, orchards and wide views over the rooftops. Dogs may run off-leash on marked meadows, making it the locals\' favorite escape for long morning walks.',
          es: 'Un parque en la colina de 28 hectáreas a diez minutos de las murallas, con olivares, huertos y amplias vistas sobre los tejados. Los perros pueden correr sin correa en las praderas señalizadas, lo que lo convierte en el escape favorito de los locales.',
        },
      },
    ],
    petTips: {
      fr: [
        'La loi italienne impose d\'avoir une muselière sur soi et de la présenter sur demande, même si votre chien ne la porte pas; gardez toujours une laisse de 1,5 m maximum en public.',
        'Ramassez immédiatement — l\'arrêté municipal de Bologne exige des propriétaires qu\'ils aient sacs et petite bouteille d\'eau pour rincer l\'urine des portiques, sous peine d\'amende jusqu\'à 450 EUR.',
        'Les portiques sont votre meilleur allié l\'été: planifiez vos balades via Zamboni ou Strada Maggiore pour épargner les coussinets du pavé brûlant.',
        'Les chiens voyagent gratuitement dans les bus TPER, en laisse et muselés (ou en caisse); évitez l\'heure de pointe 7h30-9h00.',
        'La plupart des trattorias du Quadrilatero apportent une gamelle d\'eau sur demande — demandez \'una ciotola d\'acqua per il cane\'.',
      ],
      en: [
        'Under Italian law you must carry a muzzle and produce it on request, even if your dog never wears it; always keep a leash (max 1.5 m) in public.',
        'Clean up immediately — Bologna\'s municipal ordinance requires owners to carry both bags and a small bottle of water to rinse urine from porticoes, with fines up to 450 EUR.',
        'The porticoes are your summer best friend: plan walks along Via Zamboni or Strada Maggiore to keep paws off sun-baked pavement.',
        'Dogs ride free on TPER city buses when leashed and muzzled (or carried in a crate); avoid rush hour 7:30-9:00.',
        'Most trattorie in the Quadrilatero put out a water bowl on request — ask for \'una ciotola d\'acqua per il cane\'.',
      ],
      es: [
        'La ley italiana obliga a llevar bozal y mostrarlo si se solicita, aunque el perro no lo use; mantenga siempre una correa de máximo 1,5 m en público.',
        'Recoja de inmediato — la ordenanza municipal de Bolonia exige llevar bolsas y una botellita de agua para enjuagar la orina de los pórticos, con multas de hasta 450 EUR.',
        'Los pórticos son su mejor aliado en verano: planifique paseos por Via Zamboni o Strada Maggiore para evitar el pavimento ardiente.',
        'Los perros viajan gratis en los autobuses TPER con correa y bozal (o en transportín); evite la hora punta 7:30-9:00.',
        'La mayoría de trattorias del Quadrilatero sacan un bol de agua si lo pide — diga \'una ciotola d\'acqua per il cane\'.',
      ],
    },
    practicalInfo: {
      fr: [
        'Aéroport le plus proche: Bologne Guglielmo Marconi (BLQ), à 6 km du centre; les petits chiens en sac voyagent gratuitement sur le monorail Marconi Express, les plus gros uniquement en taxi.',
        'La clinique vétérinaire 24h/24 la plus proche est l\'Ospedale Veterinario San Francesco à San Lazzaro di Savena, à environ 15 minutes en voiture du centre historique.',
        'L\'eau du robinet est potable et les fontaines (fontanelle) coulent toute l\'année Piazza Maggiore et Giardini Margherita — remplissez la gamelle partout.',
        'L\'été dépasse régulièrement 35 °C; promenez avant 9h ou après 20h, car les rues en céramique gardent la chaleur jusque tard dans la nuit.',
        'La taxe canine ne concerne pas les touristes, mais emportez le passeport européen et la preuve de vaccination antirabique si vous venez de l\'étranger.',
      ],
      en: [
        'Nearest airport: Bologna Guglielmo Marconi (BLQ), 6 km from center; small dogs in carriers travel free on the Marconi Express monorail, larger dogs by taxi only.',
        'The closest 24-hour veterinary clinic is Ospedale Veterinario San Francesco in San Lazzaro di Savena, about 15 minutes by car from the historic center.',
        'Tap water is safe and fountains (fontanelle) run year-round in Piazza Maggiore and Giardini Margherita — fill your dog\'s bowl anywhere.',
        'Summer temperatures regularly exceed 35 °C; walk before 9:00 or after 20:00, as the ceramic-tiled streets retain heat into the night.',
        'Dog license tax does not apply to tourists, but you must carry the EU pet passport and proof of rabies vaccination if crossing from outside Italy.',
      ],
      es: [
        'Aeropuerto más cercano: Bolonia Guglielmo Marconi (BLQ), a 6 km del centro; los perros pequeños en transportín viajan gratis en el monorraíl Marconi Express, los grandes solo en taxi.',
        'La clínica veterinaria 24 horas más próxima es el Ospedale Veterinario San Francesco en San Lazzaro di Savena, a unos 15 minutos en coche del centro histórico.',
        'El agua del grifo es potable y las fuentes (fontanelle) funcionan todo el año en Piazza Maggiore y Giardini Margherita — rellene el bol en cualquier sitio.',
        'El verano supera a menudo los 35 °C; pasee antes de las 9:00 o después de las 20:00, porque las calles cerámicas conservan el calor hasta la noche.',
        'El impuesto canino no afecta a los turistas, pero lleve el pasaporte europeo y el certificado de vacunación antirrábica si llega desde fuera de Italia.',
      ],
    },
  },

  milan: {
    history: {
      fr: `Milan, capitale de la Lombardie et moteur financier et mode de l'Italie, remonte à l'établissement celte de Medhelan vers 600 av. J.-C. avant de devenir capitale impériale romaine en 286 apr. J.-C. La ville mêle aujourd'hui la grandeur gothique — le Duomo et ses 135 flèches ont mis près de six siècles à être achevés — aux gratte-ciel élégants de Porta Nuova et aux canaux restaurés des Navigli. Le mode de vie milanais est réputé dog-friendly: l'Italie a le plus fort taux de possession de chiens d'Europe, et on les voit impeccablement toilettés dans le Quadrilatero, aux terrasses de l'aperitivo des Navigli et au Parco Sempione le dimanche. La ville accueille même chaque année 'Quattrozampeinfiera' à la Fiera Milano. Les animaux sont admis dans les transports ATM — métro, tram, bus — à condition de porter laisse ET muselière, règle appliquée plus strictement qu'ailleurs en Italie.`,
      en: `Milan, capital of Lombardy and Italy's financial and fashion powerhouse, traces its origins to the Celtic settlement of Medhelan around 600 BCE before becoming a Roman imperial capital in 286 CE. Today it blends Gothic grandeur — the Duomo's 135 spires took nearly six centuries to complete — with sleek Porta Nuova skyscrapers and the restored Navigli canals. Milanese lifestyle is famously dog-forward: Italy's highest per-capita pet ownership sees immaculately groomed dogs in Quadrilatero boutiques, aperitivo terraces along the Navigli, and Sunday strolls in Parco Sempione. The city even hosts the annual 'Quattrozampeinfiera' pet fair at Fiera Milano. Pets are fully welcomed on ATM transit — metro, tram and bus — provided they wear both leash and muzzle, a rule enforced more strictly here than in most Italian cities.`,
      es: `Milán, capital de Lombardía y motor financiero y de la moda de Italia, nació como asentamiento celta de Medhelan hacia el 600 a.C. antes de convertirse en capital imperial romana en el 286 d.C. Hoy combina la grandeza gótica — el Duomo y sus 135 agujas tardaron casi seis siglos en completarse — con los rascacielos de Porta Nuova y los canales restaurados de los Navigli. El estilo de vida milanés es conocido por su amor a los perros: Italia tiene la mayor tasa de posesión canina de Europa, y se les ve impecables en las boutiques del Quadrilatero, en los aperitivos de los Navigli y en los paseos dominicales del Parco Sempione. La ciudad acoge cada año la feria 'Quattrozampeinfiera' en Fiera Milano. Las mascotas viajan en el transporte ATM — metro, tranvía y autobús — con correa Y bozal, norma aplicada con más rigor que en otras ciudades italianas.`,
    },
    sights: [
      {
        name: 'Parco Sempione',
        emoji: '🌳',
        petFriendly: true,
        desc: {
          fr: 'Aménagé en 1888 derrière le Castello Sforzesco, ce parc de 47 hectares est le poumon vert de Milan, avec lac, Arco della Pace et quatre aires canines clôturées sans laisse. Les Milanais et leurs chiens l\'envahissent chaque matin avant le bureau.',
          en: 'Laid out in 1888 behind the Sforza Castle, this 47-hectare park is Milan\'s green lung, complete with a lake, the Arco della Pace and four fenced off-leash dog areas. It fills with Milanese and their dogs every morning before office hours.',
          es: 'Diseñado en 1888 detrás del Castillo Sforzesco, este parque de 47 hectáreas es el pulmón verde de Milán, con lago, Arco della Pace y cuatro áreas caninas valladas sin correa. Los milaneses y sus perros lo toman cada mañana antes del trabajo.',
        },
      },
      {
        name: 'Navigli (Naviglio Grande & Pavese)',
        emoji: '🛶',
        petFriendly: true,
        desc: {
          fr: 'Le quartier des canaux du XIIe siècle, dessiné en partie par Léonard de Vinci, est aujourd\'hui l\'artère nocturne de Milan, avec des chemins de halage parfaits pour la balade du soir. Presque tous les bars à aperitivo acceptent les chiens en laisse en terrasse après 18h.',
          en: 'The 12th-century canal district designed in part by Leonardo da Vinci is now Milan\'s nightlife artery, with towpaths perfect for evening strolls. Nearly every aperitivo bar along the water accepts leashed dogs on the terrace after 18:00.',
          es: 'El distrito de canales del siglo XII, diseñado en parte por Leonardo da Vinci, es hoy la arteria nocturna de Milán, con caminos de sirga ideales para paseos al anochecer. Casi todos los bares de aperitivo junto al agua admiten perros con correa en la terraza a partir de las 18:00.',
        },
      },
      {
        name: 'Duomo di Milano',
        emoji: '⛪',
        petFriendly: false,
        desc: {
          fr: 'Quatrième plus grande cathédrale d\'Europe, commencée en 1386, elle domine la place avec ses flèches de marbre de Candoglia. Les chiens sont admis sur la Piazza del Duomo mais pas dans la cathédrale, le baptistère ou sur les terrasses du toit.',
          en: 'The fourth-largest cathedral in Europe, begun in 1386, dominates the city square with its Candoglia marble spires. Dogs are welcome on Piazza del Duomo, but not inside the cathedral, baptistery or rooftop terraces.',
          es: 'La cuarta catedral más grande de Europa, iniciada en 1386, domina la plaza con sus agujas de mármol de Candoglia. Se admiten perros en la Piazza del Duomo pero no dentro de la catedral, el baptisterio ni las terrazas del tejado.',
        },
      },
      {
        name: 'Brera District',
        emoji: '🎨',
        petFriendly: true,
        desc: {
          fr: 'Une trame bohème de ruelles pavées autour du Palazzo Brera du XVIIe siècle, pleine de galeries, boutiques et cafés. De nombreux commerces proposent une gamelle d\'eau, et l\'Orto Botanico di Brera admet les petits chiens en laisse pendant les horaires d\'ouverture.',
          en: 'A bohemian grid of cobbled streets around the 17th-century Palazzo Brera, packed with galleries, boutiques and cafés. Many shops set out water bowls, and the Orto Botanico di Brera admits leashed small dogs during its open hours.',
          es: 'Una trama bohemia de calles empedradas en torno al Palazzo Brera del siglo XVII, llena de galerías, tiendas y cafés. Muchos comercios ponen bol de agua, y el Orto Botanico di Brera admite perros pequeños con correa en horario de apertura.',
        },
      },
      {
        name: 'CityLife Park',
        emoji: '🏙️',
        petFriendly: true,
        desc: {
          fr: 'Le plus récent espace vert de Milan, ouvert en 2018 autour des tours Hadid, Isozaki et Libeskind, s\'étend sur 17 hectares avec une aire canine clôturée dédiée. Son tracé plat et sans voiture est idéal pour les chiens âgés et les petites races.',
          en: 'Milan\'s newest green space, opened in 2018 around the Hadid, Isozaki and Libeskind towers, spans 17 hectares with a dedicated fenced dog run. Its flat, traffic-free design is ideal for senior dogs and small breeds.',
          es: 'El espacio verde más nuevo de Milán, inaugurado en 2018 en torno a las torres de Hadid, Isozaki y Libeskind, ocupa 17 hectáreas con una zona canina vallada exclusiva. Su trazado plano y sin tráfico es ideal para perros mayores y razas pequeñas.',
        },
      },
      {
        name: 'Parco Nord Milano',
        emoji: '🌲',
        petFriendly: true,
        desc: {
          fr: 'Un parc de 640 hectares reconverti au nord de la ville, accessible en 25 minutes par le tram 4 depuis Cairoli. Prairies, pistes cyclables et vaste zone sans laisse clôturée en font l\'escapade week-end favorite des Milanais avec chien.',
          en: 'A 640-hectare reclaimed industrial park north of the city, reached by tram 4 from Cairoli in 25 minutes. Wide meadows, cycle paths and a large fenced off-leash zone make it the go-to weekend escape for Milanese dog owners.',
          es: 'Un parque de 640 hectáreas recuperado de antiguas zonas industriales al norte de la ciudad, a 25 minutos en el tranvía 4 desde Cairoli. Praderas, carriles bici y una gran zona sin correa vallada lo convierten en la escapada dominical favorita.',
        },
      },
    ],
    petTips: {
      fr: [
        'Les transports ATM autorisent les chiens dans le métro, le tram et le bus uniquement en laisse ET muselière — gardez une muselière panier même pour les petits chiens; les contrôleurs vérifient.',
        'Les petits chiens en sac entièrement fermé voyagent gratuitement sur ATM; les plus gros ont besoin d\'un billet urbain standard (2,20 EUR).',
        'La ville interdit les chiens sur la pelouse de Piazza della Scala et dans la cour intérieure de la Pinacoteca di Brera — préférez les rues alentour.',
        'Les étés milanais atteignent 36 °C avec forte humidité; les stations de métro restent fraîches mais seulement pour le transit, pas pour stationner.',
        'Les terrasses d\'aperitivo de Corso Como et des Navigli accueillent les chiens, mais réservez à l\'avance les restaurants en salle, tous ne sont pas étiquetés pet-friendly.',
      ],
      en: [
        'ATM transport allows dogs on metro, tram and bus only with leash AND muzzle — carry a basket muzzle even for tiny dogs; ticket inspectors do check.',
        'Small dogs in fully closed carriers ride free on ATM; larger dogs need a standard urban ticket (2.20 EUR).',
        'The city bans dogs from Piazza della Scala lawn and the Pinacoteca di Brera\'s interior courtyard — use the surrounding streets instead.',
        'Milan summers hit 36 °C with high humidity; the underground metro stations stay cool but only for transit, not lingering.',
        'Aperitivo terraces along Corso Como and the Navigli welcome dogs, but book indoor restaurants in advance, as not all comply with pet-friendly labeling.',
      ],
      es: [
        'El transporte ATM admite perros en metro, tranvía y autobús solo con correa Y bozal — lleve un bozal tipo cesta incluso para perros pequeños; los revisores comprueban.',
        'Los perros pequeños en transportín totalmente cerrado viajan gratis en ATM; los grandes necesitan un billete urbano estándar (2,20 EUR).',
        'La ciudad prohíbe perros en el césped de Piazza della Scala y el patio interior de la Pinacoteca di Brera — use las calles de alrededor.',
        'Los veranos milaneses alcanzan los 36 °C con alta humedad; las estaciones de metro permanecen frescas pero solo para el tránsito, no para quedarse.',
        'Las terrazas de aperitivo de Corso Como y los Navigli admiten perros, pero reserve con antelación los restaurantes en interior, no todos cumplen la etiqueta pet-friendly.',
      ],
    },
    practicalInfo: {
      fr: [
        'Deux aéroports principaux: Malpensa (MXP, 50 km) et Linate (LIN, 7 km); le train Malpensa Express accepte les chiens en laisse et muselés pour 2,50 EUR.',
        'La Clinica Veterinaria Gran Sasso (Via Donatello) est ouverte 24h/24 avec urgences spécialisées, à environ 2 km du Duomo.',
        'La loi italienne plafonne la laisse à 1,5 m et impose de porter une muselière sur soi; Milan sanctionne en outre l\'absence de ramassage par des amendes de 100 à 450 EUR.',
        'Des fontaines pour chiens équipent le Parco Sempione, les Giardini Montanelli et CityLife — l\'eau du robinet est potable partout.',
        'Les brouillards hivernaux et le froid de janvier peuvent flirter avec 0 °C; la cire protectrice aide contre le sel de déneigement.',
      ],
      en: [
        'Two main airports: Malpensa (MXP, 50 km) and Linate (LIN, 7 km); the Malpensa Express train accepts leashed and muzzled dogs for 2.50 EUR.',
        'Clinica Veterinaria Gran Sasso (Via Donatello) is open 24/7 with specialist emergency care about 2 km from the Duomo.',
        'Italian law caps leashes at 1.5 m in public and requires a muzzle to be carried; Milan additionally fines failure to clean up with penalties from 100-450 EUR.',
        'Dog drinking fountains exist throughout Parco Sempione, Giardini Montanelli and CityLife — tap water is safe citywide.',
        'Winter fog and January cold can bring temperatures near 0 °C; paw wax helps protect against road salt used on icy pavements.',
      ],
      es: [
        'Dos aeropuertos principales: Malpensa (MXP, 50 km) y Linate (LIN, 7 km); el tren Malpensa Express admite perros con correa y bozal por 2,50 EUR.',
        'La Clinica Veterinaria Gran Sasso (Via Donatello) abre 24/7 con urgencias especializadas, a unos 2 km del Duomo.',
        'La ley italiana limita la correa a 1,5 m y obliga a llevar bozal; Milán sanciona además no recoger con multas de 100 a 450 EUR.',
        'Hay fuentes caninas en Parco Sempione, Giardini Montanelli y CityLife — el agua del grifo es potable en toda la ciudad.',
        'La niebla invernal y el frío de enero pueden rozar los 0 °C; la cera protectora ayuda contra la sal antihielo de las aceras.',
      ],
    },
  },

  biarritz: {
    history: {
      fr: `Biarritz fut d'abord un modeste village basque de chasseurs de baleines, harponnées depuis les falaises jusqu'au XVIIIe siècle. Son destin bascule en 1854 quand l'impératrice Eugénie, épouse de Napoléon III, fait bâtir la Villa Eugénie (aujourd'hui Hôtel du Palais) au-dessus de la Grande Plage, attirant l'aristocratie européenne sur la Côte Basque. En 1957, le scénariste californien Peter Viertel introduit le surf sur la Côte des Basques, faisant de Biarritz le berceau européen du surf. Aujourd'hui villas Belle Époque, casino Art Déco et criques rocheuses côtoient les écoles de surf, les bars à pintxos et une identité basque forte. Côté chiens, Biarritz est tolérante hors saison — la plupart des plages admettent les animaux en laisse d'octobre à mai — et la promenade des falaises autour du phare Saint-Martin est l'une des plus belles balades canines de France.`,
      en: `Biarritz began as a humble Basque whaling village, harpooning cetaceans from the cliffs until the 18th century. Its fortunes changed in 1854 when Empress Eugénie, wife of Napoleon III, built the Villa Eugénie (now the Hôtel du Palais) above the Grande Plage, drawing European aristocracy to the Côte Basque. In 1957 Californian screenwriter Peter Viertel introduced surfing to the Côte des Basques, making Biarritz the cradle of European surf culture. Today its Belle Époque villas, Art Deco casino and rocky coves coexist with surf schools, pintxo bars and a deeply Basque identity. Dog-wise, Biarritz is liberal off-season — most beaches are open to leashed pets from October through May — and the clifftop promenade around the Phare Saint-Martin lighthouse is one of France's finest year-round dog walks.`,
      es: `Biarritz nació como un humilde pueblo vasco de balleneros que arponeaban cetáceos desde los acantilados hasta el siglo XVIII. Su destino cambió en 1854 cuando la emperatriz Eugenia, esposa de Napoleón III, construyó la Villa Eugénie (hoy Hôtel du Palais) sobre la Grande Plage, atrayendo a la aristocracia europea a la Costa Vasca. En 1957 el guionista californiano Peter Viertel introdujo el surf en la Côte des Basques, convirtiendo Biarritz en la cuna del surf europeo. Hoy conviven villas Belle Époque, casino Art Déco y calas rocosas con escuelas de surf, bares de pintxos y una fuerte identidad vasca. Con los perros, Biarritz es tolerante fuera de temporada — la mayoría de playas admite mascotas con correa de octubre a mayo — y el paseo por los acantilados hasta el faro Saint-Martin es uno de los más hermosos de Francia.`,
    },
    sights: [
      {
        name: 'Phare Saint-Martin',
        emoji: '🗼',
        petFriendly: true,
        desc: {
          fr: 'Le phare de 44 mètres, construit en 1834 à la Pointe Saint-Martin, marque la limite géologique entre la côte sableuse des Landes et la côte rocheuse basque. Les pelouses et le sentier littoral sont ouverts aux chiens en laisse toute l\'année, avec vue panoramique sur les Pyrénées par temps clair.',
          en: 'The 44-metre lighthouse, built in 1834 at Pointe Saint-Martin, marks the geological boundary between the sandy Landes coast and the rocky Basque coast. The surrounding clifftop lawns and coastal path are open to leashed dogs year-round, with panoramic views to the Pyrenees on clear days.',
          es: 'El faro de 44 metros, construido en 1834 en la Pointe Saint-Martin, marca el límite geológico entre la costa arenosa de las Landas y la rocosa vasca. Las praderas y el sendero costero admiten perros con correa todo el año, con vistas panorámicas a los Pirineos los días claros.',
        },
      },
      {
        name: 'Rocher de la Vierge',
        emoji: '🗻',
        petFriendly: true,
        desc: {
          fr: 'Un rocher coiffé d\'une statue de la Vierge, relié à la côte par une passerelle en fer attribuée à l\'atelier Eiffel (1887). Les chiens en laisse peuvent traverser et explorer l\'éperon rocheux, mais la passerelle ferme par forte houle.',
          en: 'A sea-stack crowned by a statue of the Virgin, linked to shore by an iron footbridge attributed to Eiffel\'s workshop (1887). Leashed dogs may cross the footbridge and explore the rocky outcrop, though the bridge closes during heavy swell.',
          es: 'Un peñón coronado por una estatua de la Virgen, unido a la costa por una pasarela de hierro atribuida al taller de Eiffel (1887). Los perros con correa pueden cruzar y explorar el espolón rocoso, aunque la pasarela cierra con oleaje fuerte.',
        },
      },
      {
        name: 'Grande Plage',
        emoji: '🏖️',
        petFriendly: false,
        desc: {
          fr: 'Le croissant de sable doré d\'un kilomètre, face au Casino et à l\'Hôtel du Palais, est la plage emblématique de Biarritz. Les chiens y sont interdits du 15 juin au 15 septembre par arrêté municipal; hors saison ils sont bienvenus en laisse à l\'aube et au crépuscule.',
          en: 'The 1 km crescent of golden sand fronted by the Casino and Hôtel du Palais is Biarritz\'s signature beach. Dogs are banned from 15 June to 15 September by municipal decree; outside those dates they are welcome on leash at dawn and dusk.',
          es: 'El arco de arena dorada de un kilómetro frente al Casino y al Hôtel du Palais es la playa emblemática de Biarritz. Los perros están prohibidos del 15 de junio al 15 de septiembre por decreto municipal; fuera de temporada se admiten con correa al amanecer y atardecer.',
        },
      },
      {
        name: 'Côte des Basques',
        emoji: '🏄',
        petFriendly: false,
        desc: {
          fr: 'Berceau du surf européen (1957), encadrée de falaises ocre qui disparaissent à marée haute. Les chiens sont interdits sur le sable de juin à septembre; la promenade sommitale reste accessible en laisse toute l\'année.',
          en: 'The birthplace of European surfing (1957), framed by ochre cliffs that disappear at high tide. Dogs are banned on the sand from June to September; the clifftop promenade above remains accessible on leash year-round.',
          es: 'Cuna del surf europeo (1957), enmarcada por acantilados ocres que desaparecen con la pleamar. Los perros están prohibidos en la arena de junio a septiembre; el paseo superior del acantilado sigue accesible con correa todo el año.',
        },
      },
      {
        name: 'Les Halles de Biarritz',
        emoji: '🥐',
        petFriendly: true,
        desc: {
          fr: 'Le marché couvert Art Déco, ouvert en 1885 et rénové en 2009, est le cœur gourmand de la ville, croulant sous le jambon de Bayonne, l\'Ossau-Iraty et le chorizo basque. Les chiens en laisse sont admis aux terrasses alentour mais pas à l\'intérieur de la halle.',
          en: 'The covered Art Deco market, opened in 1885 and renovated in 2009, is the city\'s culinary heart, piled with Bayonne ham, Ossau-Iraty cheese and Basque chorizo. Leashed dogs are welcome in the surrounding café terraces but not inside the market hall itself.',
          es: 'El mercado cubierto Art Déco, inaugurado en 1885 y renovado en 2009, es el corazón gastronómico de la ciudad, repleto de jamón de Bayona, queso Ossau-Iraty y chorizo vasco. Se admiten perros con correa en las terrazas cercanas pero no dentro de la lonja.',
        },
      },
      {
        name: 'Lac Marion',
        emoji: '🦆',
        petFriendly: true,
        desc: {
          fr: 'Un paisible lac d\'eau douce de 8 hectares entouré d\'un sentier ombragé de 2 km, à 3 km du centre. Les chiens en laisse sont admis toute l\'année; la prairie sud est un spot informel prisé pour lâcher le chien dès qu\'on quitte le sentier principal.',
          en: 'A peaceful 8-hectare freshwater lake ringed by a 2 km shaded path, 3 km from the center. Leashed dogs are welcome all year; the southern meadow is a popular informal off-leash spot once you leave the main path.',
          es: 'Un tranquilo lago de agua dulce de 8 hectáreas rodeado de un sendero sombreado de 2 km, a 3 km del centro. Se admiten perros con correa todo el año; la pradera sur es un lugar informal popular para soltarlos al salir del sendero principal.',
        },
      },
    ],
    petTips: {
      fr: [
        'Interdiction estivale des plages: les chiens sont bannis de toutes les plages de Biarritz du 15 juin au 15 septembre, de 10h à 19h, avec amende jusqu\'à 450 EUR — privilégiez les promenades des falaises.',
        'Les chiens de catégories 1 et 2 (races dites dangereuses selon la loi française) doivent porter une muselière en tout espace public et disposer du permis municipal.',
        'Les TER SNCF au départ de Biarritz facturent 7 EUR par grand chien et acceptent gratuitement les petits chiens en sac.',
        'La marée compte: vérifiez-la avant de descendre Plage du Miramar ou Plage de la Milady, la montée d\'eau peut piéger au pied des falaises.',
        'De nombreux cidreries basques et bars à pintxos autour des Halles sortent une gamelle d\'eau — culturellement, entrer avec un chien calme en laisse est naturel.',
      ],
      en: [
        'Summer beach ban: dogs are forbidden on all Biarritz beaches from 15 June to 15 September, 10:00-19:00, with fines up to 450 EUR — walk them on the clifftop promenades instead.',
        'Category 1 and 2 dogs (listed dangerous breeds under French law) must wear a muzzle in all public spaces and carry an official permit from the mairie.',
        'The SNCF regional TER trains from Biarritz station charge 7 EUR for large dogs and accept small dogs in carriers free of charge.',
        'Tide matters: check the marée before walking Plage du Miramar or Plage de la Milady, as rising water can trap you at cliff bases.',
        'Many Basque cider houses and pintxo bars in the Halles district put out water bowls — it\'s culturally normal to enter with a calm leashed dog.',
      ],
      es: [
        'Prohibición veraniega: los perros no pueden acceder a ninguna playa de Biarritz del 15 de junio al 15 de septiembre, de 10:00 a 19:00, con multas de hasta 450 EUR — use los paseos de los acantilados.',
        'Los perros de categorías 1 y 2 (razas consideradas peligrosas por la ley francesa) deben llevar bozal en espacios públicos y contar con permiso municipal.',
        'Los trenes regionales TER desde Biarritz cobran 7 EUR por perro grande y admiten gratis a los pequeños en transportín.',
        'La marea importa: consúltela antes de bajar a Plage du Miramar o Plage de la Milady, la subida puede atraparle al pie de los acantilados.',
        'Muchas sidrerías vascas y bares de pintxos junto a Les Halles ofrecen bol de agua — culturalmente es normal entrar con un perro tranquilo con correa.',
      ],
    },
    practicalInfo: {
      fr: [
        'Aéroport le plus proche: Biarritz-Pays Basque (BIQ), à 3 km du centre; les petits chiens voyagent gratuitement en cabine sur la plupart des lignes vers Paris et Londres.',
        'La Clinique Vétérinaire Iratzean avenue de Bayonne gère les urgences 24h/24 et se trouve à 5 minutes en voiture du centre.',
        'Climat océanique: hivers doux (10 °C), étés chauds mais rarement caniculaires (24 °C en moyenne); la pluie est possible toute l\'année, prévoyez une serviette.',
        'Les plages sableuses abritent des vives en été — rincez les coussinets à l\'eau douce après chaque baignade.',
        'La loi française exige passeport européen, puce ISO et vaccination antirabique valide pour tout animal transfrontalier; la clinique Iratzean délivre aussi des passeports.',
      ],
      en: [
        'Nearest airport: Biarritz-Pays Basque (BIQ), 3 km from center; small dogs travel free in the cabin on most airlines to/from Paris and London.',
        'The Clinique Vétérinaire Iratzean on Avenue de Bayonne handles 24-hour emergencies and is 5 minutes by car from the center.',
        'Oceanic climate: mild winters (10 °C), warm but rarely hot summers (24 °C average); rain is possible year-round, so pack a dog towel.',
        'Sand-bottomed beaches have sharp weever fish in warm months — rinse your dog\'s paws with fresh water after any beach session.',
        'French law requires an EU pet passport, ISO microchip and valid rabies vaccination for all cross-border pets; vet Iratzean can reissue passports for residents.',
      ],
      es: [
        'Aeropuerto más cercano: Biarritz-Pays Basque (BIQ), a 3 km del centro; los perros pequeños viajan gratis en cabina en la mayoría de líneas a París y Londres.',
        'La Clinique Vétérinaire Iratzean en Avenue de Bayonne atiende urgencias 24 horas, a 5 minutos en coche del centro.',
        'Clima oceánico: inviernos suaves (10 °C), veranos cálidos pero rara vez tórridos (24 °C de media); la lluvia es posible todo el año, lleve una toalla para el perro.',
        'Las playas de arena albergan peces araña en verano — enjuague las almohadillas con agua dulce después de cada baño.',
        'La ley francesa exige pasaporte europeo, chip ISO y vacuna antirrábica vigente para toda mascota transfronteriza; la clínica Iratzean también expide pasaportes.',
      ],
    },
  },

  toulouse: {
    history: {
      fr: `Toulouse, 'La Ville Rose' sur la Garonne, doit sa chaude teinte rose à la brique de terre cuite fabriquée avec l'argile du fleuve depuis l'époque romaine, où elle s'appelait Tolosa. Capitale des comtes médiévaux de Toulouse et berceau de la poésie des troubadours, elle s'enrichit au XVIe siècle grâce au commerce du pastel qui paya ses hôtels particuliers Renaissance. C'est aujourd'hui la quatrième ville de France et la capitale européenne de l'aérospatiale, siège d'Airbus et de la Cité de l'Espace. Les quais de la Garonne et le Canal du Midi du XVIIe siècle — classé UNESCO et œuvre de Pierre-Paul Riquet — forment une promenade fluviale presque ininterrompue, largement ombragée de platanes et dog-friendly. Avec la Prairie des Filtres et ses prairies sans laisse en plein centre, Toulouse figure parmi les villes françaises les plus accueillantes pour les chiens.`,
      en: `Toulouse, 'La Ville Rose' on the Garonne, owes its warm pink hue to the terracotta brick fired from river clay since Roman times, when it was known as Tolosa. Capital of the medieval Counts of Toulouse and a cradle of troubadour poetry, it grew rich on the 16th-century pastel (woad) trade that paid for its Renaissance hôtels particuliers. Today it is France's fourth-largest city and Europe's aerospace capital, home to Airbus and the Cité de l'Espace. The Garonne quays and the 17th-century Canal du Midi — a UNESCO site and the brainchild of Pierre-Paul Riquet — form a nearly continuous waterside promenade, much of it plane-tree-shaded and dog-friendly. With the Prairie des Filtres offering off-leash meadows in the heart of the city, Toulouse consistently ranks among France's most dog-welcoming urban centers.`,
      es: `Toulouse, 'La Ville Rose' sobre el Garona, debe su cálido tono rosado al ladrillo de terracota cocido con la arcilla del río desde época romana, cuando se llamaba Tolosa. Capital de los condes medievales de Toulouse y cuna de la poesía trovadoresca, se enriqueció en el siglo XVI gracias al comercio del pastel (azul) que pagó sus palacetes renacentistas. Hoy es la cuarta ciudad de Francia y la capital europea del sector aeroespacial, sede de Airbus y de la Cité de l'Espace. Los muelles del Garona y el Canal du Midi del siglo XVII — Patrimonio UNESCO y obra de Pierre-Paul Riquet — forman un paseo fluvial casi continuo, sombreado por plátanos y admisorio con perros. Con la Prairie des Filtres y sus praderas sin correa en pleno centro, Toulouse figura entre las ciudades francesas más acogedoras para perros.`,
    },
    sights: [
      {
        name: 'Prairie des Filtres',
        emoji: '🌾',
        petFriendly: true,
        desc: {
          fr: 'Une prairie inondable de 4 hectares sur la rive gauche de la Garonne, face à la vieille ville. C\'est l\'un des rares parcs français en centre-ville où les chiens peuvent courir sans laisse, et elle se remplit de Toulousains, frisbees et guitares au coucher du soleil.',
          en: 'A 4-hectare floodplain meadow on the left bank of the Garonne, directly opposite the old town. It is one of the few French city-center parks where dogs may run off-leash, and it fills with locals, frisbees and guitars at sunset.',
          es: 'Una pradera inundable de 4 hectáreas en la orilla izquierda del Garona, frente al casco antiguo. Es uno de los pocos parques franceses en pleno centro donde los perros pueden correr sin correa, y se llena de lugareños, frisbees y guitarras al atardecer.',
        },
      },
      {
        name: 'Canal du Midi',
        emoji: '🛥️',
        petFriendly: true,
        desc: {
          fr: 'Le canal de 240 km inscrit à l\'UNESCO commandé par Louis XIV démarre au Port Saint-Sauveur et rejoint la Méditerranée. Le chemin de halage ombragé de platanes est idéal pour de longues balades en laisse ou en vélo avec remorque.',
          en: 'The 240 km UNESCO-listed canal commissioned by Louis XIV begins at Port Saint-Sauveur and stretches to the Mediterranean. The continuous plane-tree-shaded towpath is ideal for long leashed walks or bike runs with a dog trailer.',
          es: 'El canal de 240 km declarado Patrimonio de la UNESCO por encargo de Luis XIV parte del Port Saint-Sauveur y llega al Mediterráneo. El camino de sirga sombreado por plátanos es ideal para largos paseos con correa o en bici con remolque.',
        },
      },
      {
        name: 'Basilique Saint-Sernin',
        emoji: '⛪',
        petFriendly: false,
        desc: {
          fr: 'Édifiée entre 1080 et 1120, c\'est la plus grande église romane conservée d\'Europe et une étape majeure du pèlerinage de Compostelle. Les chiens peuvent rester avec vous Place Saint-Sernin mais ne sont pas admis dans la basilique.',
          en: 'Built between 1080 and 1120, this is the largest surviving Romanesque church in Europe and a key stop on the pilgrimage to Santiago de Compostela. Dogs may sit with you on the surrounding Place Saint-Sernin but are not permitted inside the basilica.',
          es: 'Construida entre 1080 y 1120, es la mayor iglesia románica conservada de Europa y etapa clave del Camino de Santiago. Los perros pueden estar con usted en la Place Saint-Sernin pero no acceden al interior de la basílica.',
        },
      },
      {
        name: 'Place du Capitole',
        emoji: '🏛️',
        petFriendly: true,
        desc: {
          fr: 'La vaste place principale du XVIIIe siècle, dominée par le Capitole et sa Croix occitane incrustée dans le pavé. Les chiens en laisse sont bienvenus sur la place et sous les arcades, où plusieurs cafés sortent des gamelles l\'été.',
          en: 'The vast 18th-century main square, dominated by the Capitole city hall with its Occitan Cross inlaid in the pavement. Leashed dogs are welcome on the square and under the arcades, where several cafés set out water bowls in summer.',
          es: 'La vasta plaza mayor del siglo XVIII, dominada por el Capitolio y su cruz occitana incrustada en el pavimento. Se admiten perros con correa en la plaza y bajo los soportales, donde varios cafés sacan boles de agua en verano.',
        },
      },
      {
        name: 'Jardin des Plantes',
        emoji: '🌸',
        petFriendly: true,
        desc: {
          fr: 'Aménagé en 1794, ce jardin botanique de 7 hectares est relié au Grand-Rond et au Jardin Royal par des ponts cintrés. Les chiens en laisse sont admis sur toutes les allées principales, mais pas au Muséum d\'Histoire naturelle qui s\'y trouve.',
          en: 'Laid out in 1794, this 7-hectare botanical garden connects to the Grand-Rond and Jardin Royal via arched bridges. Leashed dogs are permitted on all main paths, though the Museum of Natural History inside the park does not admit them.',
          es: 'Diseñado en 1794, este jardín botánico de 7 hectáreas se une al Grand-Rond y al Jardin Royal mediante puentes arqueados. Se admiten perros con correa en todos los paseos principales, pero no en el Museo de Historia Natural que alberga.',
        },
      },
      {
        name: 'Pont Neuf & Quais de la Garonne',
        emoji: '🌉',
        petFriendly: true,
        desc: {
          fr: 'Inauguré par Louis XIV en 1659 après près d\'un siècle de travaux, le Pont Neuf relie la vieille ville à Saint-Cyprien. Les quais pavés des deux rives sont fermés aux voitures le dimanche, offrant aux promeneurs plusieurs kilomètres ininterrompus le long du fleuve en briques roses.',
          en: 'Inaugurated by Louis XIV in 1659 after nearly a century of construction, the Pont Neuf links the old town to Saint-Cyprien. The paved quays on both banks are closed to cars on Sundays, giving dog walkers uninterrupted kilometres along the pink-bricked river.',
          es: 'Inaugurado por Luis XIV en 1659 tras casi un siglo de obras, el Pont Neuf une el casco antiguo con Saint-Cyprien. Los muelles empedrados de ambas orillas cierran al tráfico los domingos, ofreciendo kilómetros ininterrumpidos de paseo canino junto al río de ladrillo rosa.',
        },
      },
    ],
    petTips: {
      fr: [
        'La Prairie des Filtres autorise le chien sans laisse sous contrôle vocal — pas d\'enclos fermé, entraînez le rappel avant d\'y aller.',
        'Le métro Tisséo lignes A et B accepte les petits chiens (<6 kg) en sac fermé gratuitement; les plus gros sont admis uniquement en tram et bus de surface, en laisse et muselés.',
        'Les chiens de catégories 1 et 2 nécessitent le permis de détention municipal (attestation et muselière) — la police toulousaine contrôle sur les quais du canal.',
        'Le Canal du Midi dispose de canisettes tous les 500 m en section centrale; l\'amende pour non-ramassage monte à 68 EUR.',
        'La chaleur estivale peut atteindre 38 °C; les quais de la Daurade et Saint-Pierre restent ombragés de platanes même à midi, contrairement à la Place du Capitole à découvert.',
      ],
      en: [
        'Prairie des Filtres allows off-leash dogs under effective voice control — no fenced enclosure, so train recall before going.',
        'Tisséo metro lines A and B accept small dogs (<6 kg) in closed carriers free; larger dogs are only allowed on ground-level tram and bus lines, leashed and muzzled.',
        'Category 1 and 2 dogs require the French city-hall permit (attestation and muzzle) — Toulouse police check on canal towpaths.',
        'The Canal du Midi has mandatory dog-waste stations every 500 m in the central section; fines for non-collection reach 68 EUR.',
        'Summer heat can hit 38 °C; the Daurade and Saint-Pierre quays stay shaded under plane trees even at midday, unlike the open Place du Capitole.',
      ],
      es: [
        'La Prairie des Filtres permite perros sueltos con control de voz — no hay recinto vallado, entrene la llamada antes de ir.',
        'El metro Tisséo líneas A y B admite perros pequeños (<6 kg) en transportín cerrado gratis; los más grandes solo en tranvía y autobús de superficie, con correa y bozal.',
        'Los perros de categorías 1 y 2 necesitan el permiso municipal (certificado y bozal) — la policía toulousana controla en los muelles del canal.',
        'El Canal du Midi cuenta con estaciones caninas cada 500 m en el tramo central; la multa por no recoger llega a 68 EUR.',
        'El calor estival alcanza los 38 °C; los muelles de la Daurade y Saint-Pierre siguen sombreados por plátanos incluso al mediodía, a diferencia de la expuesta Place du Capitole.',
      ],
    },
    practicalInfo: {
      fr: [
        'Aéroport le plus proche: Toulouse-Blagnac (TLS), à 8 km du centre, relié par le tram T2 qui accepte chiens en laisse et muselés.',
        'Vétérinaire d\'urgence 24h/24: Clinique Vétérinaire des Carmes (boulevard Lascrosses) pour le centre; ADVETIA à Purpan pour les spécialités.',
        'L\'eau du robinet est potable et les fontaines à boire parsèment le Jardin des Plantes, le Grand-Rond et la Prairie des Filtres — prenez une gamelle pliable.',
        'La Garonne déborde en hiver et au printemps; consultez Vigicrues avant les balades sur les quais bas après de fortes pluies.',
        'La loi française impose puce ISO, vaccin antirabique et passeport européen pour tout chien entrant, plus la laisse obligatoire dans tous les espaces publics toulousains.',
      ],
      en: [
        'Nearest airport: Toulouse-Blagnac (TLS), 8 km from center, linked by tram T2 which accepts leashed and muzzled dogs.',
        'The 24-hour emergency vet Clinique Vétérinaire des Carmes (boulevard Lascrosses) covers the central districts; ADVETIA in Purpan handles specialist referrals.',
        'Tap water is safe and drinking fountains dot the Jardin des Plantes, Grand-Rond and Prairie des Filtres — bring a collapsible bowl.',
        'The Garonne floods in winter and spring; check the Vigicrues website before planning walks on the lower quays after heavy rain.',
        'French law requires ISO microchip, rabies vaccination and EU pet passport for all dogs entering the country, plus leash use in all public spaces of Toulouse.',
      ],
      es: [
        'Aeropuerto más cercano: Toulouse-Blagnac (TLS), a 8 km del centro, unido por el tranvía T2 que admite perros con correa y bozal.',
        'Veterinario de urgencias 24 horas: Clinique Vétérinaire des Carmes (boulevard Lascrosses) para el centro; ADVETIA en Purpan para especialidades.',
        'El agua del grifo es potable y hay fuentes en el Jardin des Plantes, Grand-Rond y Prairie des Filtres — lleve un bol plegable.',
        'El Garona se desborda en invierno y primavera; consulte Vigicrues antes de pasear por los muelles bajos tras fuertes lluvias.',
        'La ley francesa exige chip ISO, vacuna antirrábica y pasaporte europeo para todo perro que entre, además de correa obligatoria en todos los espacios públicos de Toulouse.',
      ],
    },
  },

  london: {
    history: {
      fr: `L'histoire de Londres s'étend du Londinium romain à la capitale mondiale d'aujourd'hui, peuplée de près de 9 millions d'habitants, et son attachement aux chiens est tout aussi profond. Le Royaume-Uni est une nation réputée pour son amour des chiens, avec environ 13 millions de chiens de compagnie, dont plus d'un million rien qu'à Londres. Les parcs royaux comme Hyde Park et Hampstead Heath accueillent les promenades sans laisse depuis plus d'un siècle, et les pubs affichent fièrement des panneaux 'dogs welcome'. Depuis le Brexit, les visiteurs européens ne peuvent plus utiliser le passeport européen pour animaux et doivent obtenir un Certificat Sanitaire Animal (AHC) délivré dans les 10 jours précédant le voyage. Un traitement contre le ténia est également requis 24 à 120 heures avant l'arrivée. Malgré les formalités, Londres reste l'une des capitales européennes les plus agréables à découvrir avec son chien.`,
      en: `London's story stretches from Roman Londinium to today's global capital of nearly 9 million residents, and its affection for dogs runs just as deep. The UK is a famously dog-loving nation with an estimated 13 million pet dogs, and London alone is home to more than a million. Royal parks like Hyde Park and Hampstead Heath have welcomed off-leash walks for over a century, and pubs across the city proudly display 'dogs welcome' signs. Since Brexit, EU visitors can no longer use the EU Pet Passport to enter Great Britain and must instead obtain an Animal Health Certificate (AHC) issued within 10 days of travel. Dogs also require a tapeworm treatment 24-120 hours before arrival. Despite the paperwork, London remains one of Europe's most rewarding cities to explore with a four-legged companion.`,
      es: `La historia de Londres abarca desde el Londinium romano hasta la capital global actual de casi 9 millones de habitantes, y su afecto por los perros es igual de profundo. El Reino Unido es una nación célebre por su pasión canina, con aproximadamente 13 millones de perros de compañía, de los cuales más de un millón viven en Londres. Los parques reales como Hyde Park y Hampstead Heath permiten paseos sin correa desde hace más de un siglo, y los pubs exhiben con orgullo carteles de 'dogs welcome'. Desde el Brexit, los visitantes de la UE ya no pueden usar el Pasaporte Europeo para Mascotas y deben obtener un Certificado Sanitario Animal (AHC) emitido dentro de los 10 días previos al viaje. También se requiere un tratamiento antiparasitario contra la tenia entre 24 y 120 horas antes de la llegada. Pese a los trámites, Londres sigue siendo una de las capitales europeas más gratificantes para recorrer con un compañero de cuatro patas.`,
    },
    sights: [
      {
        name: 'Hyde Park',
        emoji: '🌳',
        petFriendly: true,
        desc: {
          fr: 'Ce parc royal de 140 hectares au cœur de Londres autorise les chiens sans laisse dans la majeure partie de son enceinte, à l\'exception de la fontaine Diana et des jardins fleuris. C\'est un incontournable pour une promenade matinale au bord de la Serpentine.',
          en: 'The 350-acre royal park in central London allows dogs off-leash throughout most of its grounds, except in the Diana Memorial Fountain and flower gardens. It\'s a classic morning walk spot along the Serpentine lake.',
          es: 'Este parque real de 140 hectáreas en el centro de Londres permite perros sin correa en casi todo su recinto, salvo en la Fuente Diana y los jardines de flores. Es un clásico para el paseo matinal junto al lago Serpentine.',
        },
      },
      {
        name: 'Hampstead Heath',
        emoji: '🐾',
        petFriendly: true,
        desc: {
          fr: 'Une lande sauvage de 320 hectares au nord de Londres, adorée des propriétaires de chiens, avec bois, prairies et étangs. Les chiens circulent librement sur la plupart des sentiers, et Parliament Hill offre l\'une des plus belles vues sur la ville.',
          en: 'A wild 320-hectare heath in north London beloved by dog owners, with woodlands, meadows and ponds. Dogs roam freely across most paths, and Parliament Hill offers one of the best skyline views in the city.',
          es: 'Un brezal salvaje de 320 hectáreas en el norte de Londres, adorado por los dueños de perros, con bosques, praderas y estanques. Los perros circulan libremente por casi todos los senderos, y Parliament Hill ofrece una de las mejores vistas del skyline.',
        },
      },
      {
        name: 'Notting Hill & Portobello Road',
        emoji: '🏘️',
        petFriendly: true,
        desc: {
          fr: 'Maisons aux façades pastel, cafés indépendants et célèbre marché aux antiquités du samedi font de Notting Hill un bonheur pour les promeneurs de chiens. De nombreux cafés de Portobello Road installent gamelles d\'eau et accueillent les chiens en terrasse.',
          en: 'Pastel townhouses, independent cafés and the famous Saturday antiques market make Notting Hill a dog-walker\'s delight. Many cafés along Portobello Road keep water bowls outside and welcome leashed dogs on their terraces.',
          es: 'Casas de fachadas pastel, cafés independientes y el famoso mercadillo sabatino de antigüedades hacen de Notting Hill un deleite para pasear con perro. Muchos cafés de Portobello Road dejan cuencos de agua fuera y reciben perros con correa en sus terrazas.',
        },
      },
      {
        name: 'Tower of London exterior',
        emoji: '🏰',
        petFriendly: false,
        desc: {
          fr: 'Les chiens ne sont pas admis à l\'intérieur de cette forteresse du XIe siècle, mais les jardins de Tower Hill et le Thames Path voisin offrent une superbe balade extérieure. La vue sur le Tower Bridge est d\'ailleurs plus belle depuis les quais.',
          en: 'Dogs aren\'t allowed inside this 11th-century fortress, but the Tower Hill gardens and nearby Thames Path make a scenic exterior walk. Views of Tower Bridge are arguably better from the outside anyway.',
          es: 'Los perros no pueden entrar en esta fortaleza del siglo XI, pero los jardines de Tower Hill y el cercano Thames Path permiten un paseo exterior muy pintoresco. Las vistas del Tower Bridge son incluso mejores desde fuera.',
        },
      },
      {
        name: 'Regent\'s Canal (Little Venice to Camden)',
        emoji: '🛶',
        petFriendly: true,
        desc: {
          fr: 'Un chemin de halage plat de 5 km relie Little Venice à Camden Lock en longeant Regent\'s Park. Péniches, saules pleureurs et nombreux pubs acceptant les chiens en font l\'une des plus jolies balades de Londres.',
          en: 'A flat 5km towpath links Little Venice to Camden Lock through Regent\'s Park borders. Narrowboats, willow trees and plenty of dog-friendly pubs make it one of London\'s most charming walks.',
          es: 'Un camino de sirga llano de 5 km une Little Venice con Camden Lock bordeando Regent\'s Park. Barcazas, sauces llorones y numerosos pubs dog-friendly lo convierten en uno de los paseos más encantadores de Londres.',
        },
      },
      {
        name: 'Greenwich Park',
        emoji: '🔭',
        petFriendly: true,
        desc: {
          fr: 'Le plus ancien parc royal clos de Londres grimpe jusqu\'à l\'Observatoire Royal et au méridien de Greenwich. Les chiens y sont acceptés en laisse près du parc aux daims, et sans laisse ailleurs, avec vue panoramique sur Canary Wharf.',
          en: 'London\'s oldest enclosed royal park climbs to the Royal Observatory and the Prime Meridian. Dogs are welcome on-leash near the deer enclosure and off-leash elsewhere, with panoramic views over Canary Wharf.',
          es: 'El parque real amurallado más antiguo de Londres sube hasta el Real Observatorio y el Meridiano de Greenwich. Los perros son bienvenidos con correa cerca del cercado de ciervos y sueltos en el resto, con vistas panorámicas sobre Canary Wharf.',
        },
      },
    ],
    petTips: {
      fr: [
        'Les chiens voyagent gratuitement sur tout le réseau TfL (métro, Overground, bus, DLR) mais doivent être portés dans les escalators ou tenus en laisse courte — sinon le personnel peut refuser l\'embarquement.',
        'Les black cabs (taxis Hackney agréés) sont légalement tenus d\'accepter les chiens sans supplément ; Uber et les VTC peuvent refuser, pensez à vérifier à la réservation.',
        'La plupart des pubs londoniens acceptent les chiens au bar mais pas en salle de restauration — repérez l\'autocollant \'dog-friendly\' sur la porte ou consultez Doggie Pubs UK.',
        'Pour les arrivées depuis l\'UE post-Brexit : votre Certificat Sanitaire Animal doit avoir moins de 10 jours à l\'entrée, et vous devez utiliser un Point d\'Entrée Voyageur désigné comme St Pancras (Eurostar) ou Heathrow.',
        'Hampstead Heath compte trois étangs de baignade non clôturés où les chiens sont autorisés dans certaines zones — lisez les panneaux, l\'étang mixte est interdit aux chiens en été.',
      ],
      en: [
        'Dogs travel free on the entire TfL network (Tube, Overground, buses, DLR) but must be carried on escalators or kept on a short leash — staff may refuse boarding otherwise.',
        'Black cabs (licensed Hackney carriages) are legally required to accept dogs at no extra charge; Uber and private hire firms can refuse, so check when booking.',
        'Most London pubs welcome dogs in the bar area but not in the dining room — look for the \'dog-friendly\' sticker on the door or check Doggie Pubs UK.',
        'For EU arrivals post-Brexit: your Animal Health Certificate must be under 10 days old on entry and you must use a designated Traveller Point of Entry like St Pancras (Eurostar) or Heathrow.',
        'Hampstead Heath has three unfenced swimming ponds where dogs are allowed in specific sections — check posted signs, as the mixed bathing pond is off-limits to dogs in summer.',
      ],
      es: [
        'Los perros viajan gratis en toda la red TfL (Metro, Overground, autobuses, DLR) pero deben ir en brazos en las escaleras mecánicas o con correa corta — de lo contrario el personal puede impedir el acceso.',
        'Los black cabs (taxis Hackney con licencia) están legalmente obligados a aceptar perros sin recargo; Uber y VTC pueden negarse, confírmalo al reservar.',
        'La mayoría de los pubs londinenses admiten perros en la zona de barra pero no en el comedor — busca la pegatina \'dog-friendly\' en la puerta o consulta Doggie Pubs UK.',
        'Para llegadas desde la UE tras el Brexit: tu Certificado Sanitario Animal debe tener menos de 10 días a la entrada y hay que usar un Traveller Point of Entry designado como St Pancras (Eurostar) o Heathrow.',
        'Hampstead Heath cuenta con tres estanques de baño sin vallar donde los perros son bienvenidos en zonas concretas — mira los carteles, el estanque mixto prohíbe perros en verano.',
      ],
    },
    practicalInfo: {
      fr: [
        'Aéroports principaux : Heathrow (LHR) et Gatwick (LGW) sont des points d\'entrée désignés ; les chiens ne voyagent pas en cabine et doivent arriver en fret manifesté via IAG Cargo ou équivalent.',
        'L\'Eurostar N\'ACCEPTE PAS les chiens, sauf chiens d\'assistance ; la seule option ferroviaire depuis Paris/Bruxelles avec un chien est l\'Eurotunnel Le Shuttle depuis Folkestone (en voiture).',
        'Meilleures saisons : avril-juin et septembre-octobre offrent des températures douces et peu de pluie ; évitez août (foule) et juillet (canicules occasionnelles au-dessus de 30°C).',
        'Urgence vétérinaire 24h/24 : Royal Veterinary College Hospital Camden, +44 20 7387 8134, ou The London Vet Clinic à Belgravia pour le centre.',
        'Les amendes pour déjections canines à Londres atteignent 150 £ (amende forfaitaire) et les municipalités comme Westminster sanctionnent activement ; les sacs sont obligatoires en permanence.',
      ],
      en: [
        'Main airports: Heathrow (LHR) and Gatwick (LGW) are designated pet entry points; dogs cannot arrive in the cabin and must travel as manifest cargo via IAG Cargo or similar.',
        'Eurostar does NOT accept dogs except registered assistance dogs — the only rail option from Paris/Brussels with a pet is via Folkestone (Eurotunnel Le Shuttle by car).',
        'Best seasons: April-June and September-October offer mild temperatures and dry-ish weather; avoid August for crowds and July for occasional heatwaves above 30°C.',
        '24/7 emergency vet: Royal Veterinary College Hospital Camden, +44 20 7387 8134, or The London Vet Clinic in Belgravia for central emergencies.',
        'Dog waste fines in London can reach £150 (fixed penalty notice) and councils like Westminster actively enforce; bags are mandatory at all times.',
      ],
      es: [
        'Aeropuertos principales: Heathrow (LHR) y Gatwick (LGW) son puntos de entrada designados; los perros no pueden viajar en cabina y deben llegar como carga manifiesta vía IAG Cargo o similar.',
        'Eurostar NO admite perros salvo perros de asistencia registrados — la única opción ferroviaria desde París/Bruselas con mascota es el Eurotunnel Le Shuttle desde Folkestone (en coche).',
        'Mejores temporadas: abril-junio y septiembre-octubre ofrecen temperaturas suaves y poca lluvia; evita agosto por las multitudes y julio por olas de calor ocasionales superiores a 30°C.',
        'Urgencia veterinaria 24h: Royal Veterinary College Hospital Camden, +44 20 7387 8134, o The London Vet Clinic en Belgravia para el centro.',
        'Las multas por excrementos caninos en Londres alcanzan 150 £ (sanción fija) y ayuntamientos como Westminster la aplican con rigor; las bolsas son obligatorias en todo momento.',
      ],
    },
  },

  antwerp: {
    history: {
      fr: `Anvers, capitale flamande du diamant et deuxième ville de Belgique, est une puissance commerciale depuis le XVIe siècle, époque où Rubens peignait et où le port rivalisait avec Venise. Aujourd'hui, ses 530 000 habitants partagent la ville avec une densité canine inhabituelle — la Flandre affiche l'un des plus hauts taux de possession de chiens d'Europe, et Anvers compte plusieurs centaines de zones de liberté clôturées (hondenlosloopzones). La ville prend le bien-être animal au sérieux : tous les chiens doivent être pucés et enregistrés dans DogID, et la laisse est stricte hors des zones désignées. Ville d'avant-garde grâce aux 'Six d'Anvers', elle est aussi étonnamment accueillante envers les compagnons à quatre pattes dans ses cafés et boutiques. Les quais de l'Escaut, le Grote Markt médiéval et le vaste parc de sculptures Middelheim sont des terrains de promenade de choix.`,
      en: `Antwerp, Flanders' diamond capital and Belgium's second-largest city, has been a trading powerhouse since the 16th century, when Rubens painted and the port rivalled Venice. Today its 530,000 residents share the city with an unusually high density of dogs — Flanders has one of Europe's highest dog-ownership rates, and Antwerp counts several hundred registered fenced dog runs (hondenlosloopzones). The city takes pet welfare seriously: all dogs must be microchipped and registered in DogID, and there are strict leash rules outside designated zones. A famously fashion-forward town thanks to the Antwerp Six designers, it's also surprisingly relaxed about four-legged customers in its cafés and boutiques. The Scheldt riverside promenade, the medieval Grote Markt and the vast Middelheim sculpture park all double as prime dog-walking territory.`,
      es: `Amberes, capital flamenca del diamante y segunda ciudad de Bélgica, es una potencia comercial desde el siglo XVI, cuando Rubens pintaba y el puerto rivalizaba con Venecia. Hoy, sus 530.000 habitantes comparten la ciudad con una densidad canina poco habitual — Flandes presenta una de las tasas más altas de tenencia de perros de Europa, y Amberes cuenta con varios centenares de zonas valladas de suelta (hondenlosloopzones). La ciudad se toma en serio el bienestar animal: todos los perros deben ir microchipados e inscritos en DogID, y la correa es obligatoria fuera de las áreas habilitadas. Ciudad vanguardista gracias a los Seis de Amberes, también es sorprendentemente abierta a los clientes de cuatro patas en sus cafés y boutiques. El paseo del Escalda, el medieval Grote Markt y el extenso parque escultórico Middelheim son territorios ideales para el paseo canino.`,
    },
    sights: [
      {
        name: 'Grote Markt & Cathedral of Our Lady',
        emoji: '⛪',
        petFriendly: false,
        desc: {
          fr: 'La place triangulaire médiévale est dominée par les maisons des guildes et la cathédrale gothique de 123 mètres abritant quatre retables de Rubens. Les chiens profitent de la place et des ruelles pavées environnantes, mais ne sont pas admis dans la cathédrale.',
          en: 'The triangular medieval square is dominated by guild houses and the 123-metre Gothic cathedral housing four Rubens altarpieces. Dogs can enjoy the square and surrounding cobbled streets, though they aren\'t allowed inside the cathedral itself.',
          es: 'La plaza triangular medieval está dominada por las casas gremiales y la catedral gótica de 123 metros, que alberga cuatro retablos de Rubens. Los perros disfrutan de la plaza y las callejuelas empedradas, pero no pueden entrar en la catedral.',
        },
      },
      {
        name: 'Park Spoor Noord',
        emoji: '🚂',
        petFriendly: true,
        desc: {
          fr: 'Ancienne gare de triage de 24 hectares reconvertie en parc urbain dans le quartier branché 2060, avec une grande zone clôturée sans laisse (hondenweide). Prisée des habitants pour les footings du week-end et les pataugeoires l\'été.',
          en: 'A reclaimed 24-hectare railway yard turned urban park in the trendy 2060 district, with a large fenced off-leash zone (hondenweide). Popular with locals for weekend runs and paddling-pool days in summer.',
          es: 'Una antigua estación de maniobras de 24 hectáreas convertida en parque urbano en el moderno distrito 2060, con una gran zona vallada sin correa (hondenweide). Muy popular entre los locales para correr los fines de semana y refrescarse en verano.',
        },
      },
      {
        name: 'Het Steen & Scheldt Riverside',
        emoji: '🏰',
        petFriendly: true,
        desc: {
          fr: 'Le château du XIIIe siècle sur l\'Escaut marque le départ d\'une longue promenade fluviale prisée des coureurs et des promeneurs de chiens. La nouvelle terrasse du Steenplein offre une vue dégagée sur Linkeroever.',
          en: 'The 13th-century castle on the Scheldt marks the start of a long riverside promenade popular with joggers and dog walkers. The new Steenplein terrace offers sweeping views across to Linkeroever.',
          es: 'El castillo del siglo XIII sobre el Escalda marca el inicio de un largo paseo fluvial muy querido por corredores y paseadores de perros. La nueva terraza del Steenplein ofrece vistas amplias hacia Linkeroever.',
        },
      },
      {
        name: 'Middelheim Open-Air Sculpture Museum',
        emoji: '🗿',
        petFriendly: true,
        desc: {
          fr: 'Un parc de 30 hectares exposant 400 sculptures modernes et contemporaines — dont Rodin et Henry Moore — où les chiens en laisse sont les bienvenus. Entrée gratuite toute l\'année.',
          en: 'A 30-hectare park displaying 400 modern and contemporary sculptures — including Rodin and Henry Moore — where leashed dogs are free to roam. Entry is free year-round.',
          es: 'Un parque de 30 hectáreas con 400 esculturas modernas y contemporáneas — incluidos Rodin y Henry Moore — donde los perros con correa son bienvenidos. Entrada gratuita todo el año.',
        },
      },
      {
        name: 'MAS Museum rooftop',
        emoji: '🏛️',
        petFriendly: true,
        desc: {
          fr: 'Les chiens ne sont pas admis dans les galeries du musée, mais la montée gratuite en escalators en plein air jusqu\'à 60 mètres leur est ouverte et offre le plus beau panorama sur le port et la vieille ville.',
          en: 'You can\'t take dogs into the museum galleries, but the free open-air rooftop escalator climb to 60 metres is dog-friendly and delivers the best panorama of the port and old town.',
          es: 'No se admiten perros en las salas del museo, pero el ascenso gratuito por las escaleras mecánicas al aire libre hasta los 60 metros sí lo es, y ofrece la mejor panorámica del puerto y el casco antiguo.',
        },
      },
      {
        name: 'Zurenborg & Cogels-Osylei',
        emoji: '🏘️',
        petFriendly: true,
        desc: {
          fr: 'Ce quartier fin de siècle est un musée vivant d\'Art Nouveau et d\'architecture éclectique, idéal à découvrir à pied sans se presser. Le Dakota Café et plusieurs terrasses de la Dageraadplaats accueillent les chiens.',
          en: 'This fin-de-siècle neighbourhood is a living museum of Art Nouveau and eclectic architecture — best explored slowly on foot. Dakota Café and several terraces on Dageraadplaats welcome dogs.',
          es: 'Este barrio finisecular es un museo vivo del Art Nouveau y la arquitectura ecléctica, ideal para recorrer a pie sin prisas. El Dakota Café y varias terrazas de Dageraadplaats admiten perros.',
        },
      },
    ],
    petTips: {
      fr: [
        'Les trams et bus De Lijn acceptent les chiens moyennant un tarif réduit de 1,80 € par trajet (les petits chiens en cage voyagent gratuitement) ; la muselière n\'est pas obligatoire, mais la laisse si.',
        'Téléchargez la carte \'Stad Antwerpen\' des hondenlosloopzones — plus de 40 zones clôturées sans laisse dans la ville, dont les grandes du Rivierenhof et du Nachtegalenpark.',
        'Les déjections canines sont sanctionnées jusqu\'à 350 € — et Anvers expérimente le traçage ADN dans certains quartiers, ramassez toujours.',
        'De nombreux hôtels anversois facturent 10-25 € par nuit et par chien ; les boutique-hôtels du Zuid sont souvent les plus accueillants — demandez les limites de taille à la réservation.',
        'Pour passer aux Pays-Bas avec votre chien, Anvers-Central dessert directement Rotterdam et Amsterdam en Intercity, avec un NS Dagkaart Hond à 3,40 €.',
      ],
      en: [
        'De Lijn trams and buses accept dogs for a reduced fare of €1.80 per trip (small dogs in a carrier travel free); muzzles aren\'t legally required but leash is mandatory.',
        'Download the \'Stad Antwerpen\' map of hondenlosloopzones — there are over 40 fenced off-leash areas across the city, including large ones at Rivierenhof and Nachtegalenpark.',
        'Dog waste is strictly enforced with fines up to €350 — and Antwerp has DNA tracking pilot projects in some districts, so always scoop.',
        'Many Antwerp hotels charge a \'dog fee\' of €10-25 per night; boutique hotels in Het Zuid are often the most accommodating — ask about size limits when booking.',
        'If you\'re crossing into the Netherlands with your dog, Antwerp-Centraal has direct Intercity trains to Rotterdam and Amsterdam where dogs travel for a €3.40 NS Dagkaart Hond.',
      ],
      es: [
        'Los tranvías y autobuses De Lijn admiten perros por 1,80 € por trayecto (los perros pequeños en transportín viajan gratis); el bozal no es obligatorio, la correa sí.',
        'Descarga el mapa \'Stad Antwerpen\' de hondenlosloopzones — más de 40 zonas valladas sin correa en la ciudad, con áreas grandes en Rivierenhof y Nachtegalenpark.',
        'Las multas por excrementos caninos llegan a 350 € — y Amberes prueba el rastreo por ADN en algunos distritos, así que recoge siempre.',
        'Muchos hoteles de Amberes cobran una tarifa de 10-25 € por noche y perro; los hoteles-boutique de Het Zuid suelen ser los más acogedores — pregunta por los límites de tamaño al reservar.',
        'Para cruzar a los Países Bajos con tu perro, Antwerpen-Centraal conecta directamente con Rotterdam y Ámsterdam en Intercity, con un NS Dagkaart Hond por 3,40 €.',
      ],
    },
    practicalInfo: {
      fr: [
        'Aéroport principal : Brussels Airport (BRU) à 45 km ; Antwerp Airport (ANR) gère uniquement le court-courrier. Thalys et Eurostar desservent Antwerpen-Centraal, l\'une des plus belles gares d\'Europe.',
        'Tout chien enregistré dans l\'UE doit disposer d\'un passeport européen, d\'une puce et d\'une vaccination antirabique valide (au moins 21 jours) pour entrer en Belgique.',
        'Meilleures saisons : mai-juin et septembre pour 18-22°C et parcs fleuris ; les hivers sont humides mais rarement sous zéro.',
        'Vétérinaire d\'urgence 24h/24 : Dierenkliniek Visserij (+32 3 449 55 51) et AniCura Kontich au sud pour les soins spécialisés.',
        'L\'eau du robinet est excellente et gratuite dans la plupart des cafés — demandez \'water voor de hond\' et on vous apportera une gamelle.',
      ],
      en: [
        'Main airport: Brussels Airport (BRU) is 45 km away; Antwerp Airport (ANR) handles short-haul only. Thalys and Eurostar reach Antwerpen-Centraal, one of Europe\'s most beautiful stations.',
        'All EU-registered dogs need an EU Pet Passport, microchip and a valid rabies vaccination (at least 21 days old) to enter Belgium.',
        'Best seasons: May-June and September for mild 18-22°C weather and blooming parks; winters are damp but rarely below freezing.',
        '24/7 emergency vet: Dierenkliniek Visserij (+32 3 449 55 51) and AniCura Kontich south of the city for specialist care.',
        'Tap water is excellent and free in most cafés — just ask for \'water voor de hond\' and you\'ll usually get a bowl.',
      ],
      es: [
        'Aeropuerto principal: Brussels Airport (BRU) a 45 km; Antwerp Airport (ANR) solo opera vuelos cortos. Thalys y Eurostar llegan a Antwerpen-Centraal, una de las estaciones más bellas de Europa.',
        'Todo perro registrado en la UE necesita Pasaporte Europeo, microchip y vacuna antirrábica vigente (mínimo 21 días) para entrar en Bélgica.',
        'Mejores temporadas: mayo-junio y septiembre por el clima suave de 18-22°C y los parques floridos; los inviernos son húmedos pero rara vez bajo cero.',
        'Urgencia veterinaria 24h: Dierenkliniek Visserij (+32 3 449 55 51) y AniCura Kontich al sur para atención especializada.',
        'El agua del grifo es excelente y gratuita en casi todos los cafés — pide \'water voor de hond\' y te traerán un cuenco.',
      ],
    },
  },

  brussels: {
    history: {
      fr: `Bruxelles, capitale de la Belgique et capitale de facto de l'Union européenne, mêle des origines médiévales flamandes à un présent diplomatique cosmopolite — et ses 1,2 million d'habitants sont massivement pro-chiens. La Belgique compte environ 1,7 million de chiens, et la capitale bilingue abrite des dizaines de parcs canins urbains et de sentiers forestiers sans clôture. L'héritage royal se lit au Parc du Cinquantenaire, érigé par Léopold II en 1880, tandis que la vaste Forêt de Soignes et le Bois de la Cambre, au sud, offrent des promenades à l'échelle de la campagne. La culture locale est réputée accueillante : les chiens sont admis en terrasse, dans la plupart des commerces, et — tenus en laisse et muselés ou en sac — sur tout le réseau STIB-MIVB. La Grand-Place est classée UNESCO, mais pour les chiens, la vraie magie, c'est la ceinture verte.`,
      en: `Brussels, capital of Belgium and de facto capital of the European Union, blends medieval Flemish origins with a cosmopolitan diplomatic present — and its 1.2 million residents are overwhelmingly pro-dog. Belgium has an estimated 1.7 million pet dogs nationally, and the bilingual capital hosts dozens of urban dog parks and unfenced forest paths. The city's royal heritage is visible in the Parc du Cinquantenaire, built by Leopold II in 1880, while the vast Sonian Forest and Bois de la Cambre on the southern edge offer countryside-scale walks. Local culture is famously dog-tolerant: dogs are welcomed on café terraces, in most shops, and — provided they're leashed and muzzled or in a bag — on the entire STIB-MIVB public transport network. The Grand-Place may be UNESCO-listed, but for dogs, the real magic is the green belt.`,
      es: `Bruselas, capital de Bélgica y capital de facto de la Unión Europea, mezcla raíces medievales flamencas con un presente diplomático cosmopolita — y sus 1,2 millones de habitantes son claramente properros. Bélgica cuenta con unos 1,7 millones de perros, y la capital bilingüe alberga decenas de parques caninos urbanos y senderos forestales sin vallar. La herencia real se aprecia en el Parc du Cinquantenaire, levantado por Leopoldo II en 1880, mientras que el extenso Bosque de Soignes y el Bois de la Cambre, al sur, ofrecen paseos de dimensiones rurales. La cultura local es muy tolerante con los perros: se les acepta en las terrazas, en la mayoría de las tiendas y — con correa y bozal o en bolsa — en toda la red STIB-MIVB. La Grand-Place es Patrimonio UNESCO, pero para los perros, la verdadera magia está en el cinturón verde.`,
    },
    sights: [
      {
        name: 'Parc du Cinquantenaire',
        emoji: '🏛️',
        petFriendly: true,
        desc: {
          fr: 'Parc néoclassique de 30 hectares couronné par l\'arc de triomphe érigé pour le cinquantenaire de la Belgique en 1880. Les chiens sont bienvenus en laisse partout, et les larges allées gravillonnées attirent les groupes de promeneurs expatriés.',
          en: 'A 30-hectare neoclassical park crowned by the triumphal arch built for Belgium\'s 50th anniversary in 1880. Dogs are welcome on leash throughout, and the wide gravel paths and lawns are popular with expat dog-walking groups.',
          es: 'Un parque neoclásico de 30 hectáreas coronado por el arco triunfal erigido por el 50 aniversario de Bélgica en 1880. Los perros son bienvenidos con correa en todo el recinto, y los anchos senderos de grava son un imán para los grupos de paseadores expatriados.',
        },
      },
      {
        name: 'Bois de la Cambre',
        emoji: '🌲',
        petFriendly: true,
        desc: {
          fr: 'Ce parc forestier de 124 hectares est l\'escapade favorite du week-end, avec lac, pelouses vallonnées et zone sans laisse non clôturée sur le flanc ouest. La route qui le traverse est fermée aux voitures chaque week-end.',
          en: 'This 124-hectare forest park is the city\'s favourite weekend escape, with a lake, rolling lawns and a dedicated unfenced off-leash zone on the western side. The road through it is closed to cars every weekend.',
          es: 'Este parque forestal de 124 hectáreas es la escapada preferida del fin de semana, con lago, praderas onduladas y zona sin correa sin vallar en el flanco oeste. La carretera que lo atraviesa se cierra al tráfico todos los fines de semana.',
        },
      },
      {
        name: 'Sonian Forest (Forêt de Soignes)',
        emoji: '🌳',
        petFriendly: true,
        desc: {
          fr: 'Une hêtraie classée UNESCO de 4 400 hectares au sud de la ville, avec des centaines de kilomètres de sentiers. Les chiens doivent être en laisse dans les réserves écologiques mais peuvent circuler librement sur la plupart des chemins.',
          en: 'A UNESCO-listed 4,400-hectare beech forest on the southern edge of the city, with hundreds of kilometres of trails. Dogs must be leashed in ecological reserves but can roam free on most footpaths.',
          es: 'Un hayedo Patrimonio UNESCO de 4.400 hectáreas al sur de la ciudad, con cientos de kilómetros de senderos. Los perros deben ir con correa en las reservas ecológicas pero pueden ir sueltos en la mayoría de los caminos.',
        },
      },
      {
        name: 'Grand-Place',
        emoji: '🏰',
        petFriendly: true,
        desc: {
          fr: 'La place centrale classée UNESCO est entourée des maisons des guildes dorées du XVIIe siècle et de l\'hôtel de ville gothique. Les chiens en laisse peuvent traverser et poser pour la photo, mais pas participer aux visites de l\'hôtel de ville.',
          en: 'The UNESCO-listed central square is surrounded by gilded 17th-century guild houses and the Gothic Town Hall. Leashed dogs are free to cross and even pose for photos, though they can\'t enter the Town Hall tours.',
          es: 'La plaza central Patrimonio UNESCO está rodeada por las casas gremiales doradas del siglo XVII y el Ayuntamiento gótico. Los perros con correa pueden cruzarla e incluso posar para fotos, aunque no entrar a las visitas del Ayuntamiento.',
        },
      },
      {
        name: 'Parc de Woluwe',
        emoji: '🦆',
        petFriendly: true,
        desc: {
          fr: 'Parc de style anglais de 70 hectares avec étangs et vieux hêtres, doté de deux grandes zones clôturées sans laisse. Très prisé de la communauté européenne installée à proximité.',
          en: 'A 70-hectare English-style park with ponds and ancient beeches, featuring two large fenced off-leash zones. A favourite with the Brussels-EU crowd living nearby.',
          es: 'Un parque de estilo inglés de 70 hectáreas con estanques y hayas centenarias, con dos grandes zonas valladas sin correa. Favorito de la comunidad Bruselas-UE que vive cerca.',
        },
      },
      {
        name: 'Sablon & Place du Grand Sablon',
        emoji: '☕',
        petFriendly: true,
        desc: {
          fr: 'Le quartier des antiquaires est aussi la place-café la plus chic de Bruxelles, avec les chocolatiers Wittamer et Pierre Marcolini. La plupart des terrasses accueillent les chiens, et le Petit Sablon voisin offre une pause fraîche et ombragée.',
          en: 'The antique-dealer district doubles as Brussels\' chicest café square, with chocolatiers like Wittamer and Pierre Marcolini. Most terraces welcome dogs, and the adjacent Petit Sablon gardens are a leafy cool-down spot.',
          es: 'El barrio de los anticuarios es también la plaza de café más chic de Bruselas, con chocolateros como Wittamer y Pierre Marcolini. Casi todas las terrazas admiten perros y los cercanos jardines del Petit Sablon son un refugio fresco y arbolado.',
        },
      },
    ],
    petTips: {
      fr: [
        'Sur le métro, les trams et bus STIB-MIVB, les petits chiens en cage voyagent gratis ; les grands chiens exigent laisse ET muselière et un titre à tarif réduit — beaucoup de locaux gardent la muselière roulée en poche pour les contrôles.',
        'Bruxelles compte plus de 20 espaces canins clôturés officiels ; les plus grands se trouvent au Parc Duden, au Parc Josaphat et près de l\'Atomium, au Parc de Laeken.',
        'Taxe sur les chiens : les résidents bruxellois doivent enregistrer leur chien et payer une petite redevance annuelle, mais les touristes en sont exemptés — gardez simplement votre passeport européen.',
        'Le marché dominical de la Gare du Midi (l\'un des plus grands d\'Europe) n\'est pas adapté aux chiens — trop de monde et trop de nourriture au sol ; préférez le marché du Châtelain, plus calme, le mercredi après-midi.',
        'Les sachets canins sont mis gratuitement à l\'entrée de la plupart des parcs, mais les amendes pour déjections vont jusqu\'à 250 € — les 19 communes verbalisent indépendamment.',
      ],
      en: [
        'On STIB-MIVB metro, trams and buses, small dogs travel free in a carrier; large dogs need a leash AND muzzle and a reduced fare ticket — many locals carry the muzzle rolled in a pocket for controls.',
        'Brussels has over 20 official fenced dog parks (espaces canins); the biggest are at Parc Duden, Parc Josaphat and near the Atomium in Parc de Laeken.',
        'Dog tax: if you live in Brussels you must register and pay a small annual fee per dog, but tourists are exempt — just carry your EU Pet Passport.',
        'The Sunday market at Gare du Midi (one of Europe\'s largest) is not dog-friendly — too crowded and too much dropped food; try the calmer Châtelain market on Wednesday afternoons instead.',
        'Pick up bags (sachets canins) are provided free at most park entrances, but fines for fouling run up to €250 — the 19 communes enforce independently.',
      ],
      es: [
        'En el metro, tranvías y autobuses STIB-MIVB, los perros pequeños en transportín viajan gratis; los perros grandes necesitan correa Y bozal y un billete a tarifa reducida — muchos locales llevan el bozal enrollado en el bolsillo para los controles.',
        'Bruselas cuenta con más de 20 espacios caninos vallados oficiales; los mayores están en el Parc Duden, el Parc Josaphat y junto al Atomium en el Parc de Laeken.',
        'Impuesto canino: los residentes deben inscribir al perro y pagar una pequeña tasa anual, pero los turistas están exentos — basta con llevar el Pasaporte Europeo.',
        'El mercado dominical de la Gare du Midi (uno de los más grandes de Europa) no es apto para perros — demasiada gente y comida por el suelo; mejor el mercado del Châtelain, más tranquilo, los miércoles por la tarde.',
        'Las bolsas caninas son gratuitas en la entrada de la mayoría de los parques, pero las multas por excrementos llegan a 250 € — los 19 municipios sancionan de forma independiente.',
      ],
    },
    practicalInfo: {
      fr: [
        'L\'aéroport de Bruxelles (BRU) à Zaventem est la porte d\'entrée principale ; Brussels-South Charleroi (CRL) accueille les low-cost à 55 km au sud. Eurostar relie Bruxelles-Midi à Londres et Paris — uniquement les petits chiens en cage, et pas sur les trains vers Londres.',
        'Les chiens venant de l\'UE doivent présenter un passeport européen, puce et vaccin antirabique. Hors UE, un certificat sanitaire UE et un titrage peuvent s\'appliquer — prévoir 3 mois minimum.',
        'Meilleures saisons : fin avril à juin pour les parcs en fleurs, septembre les années de Tapis de Fleurs ; les hivers sont gris et bruineux, rarement enneigés.',
        'Vétérinaire d\'urgence 24h/24 : Clinique Vétérinaire Universitaire (ULB) Anderlecht, +32 2 555 40 00, et Vetsuni à l\'est de la ville.',
        'La plupart des hôtels facturent 15-30 € par nuit et par chien ; l\'Hotel Amigo, The Dominican et plusieurs boutique-hôtels d\'Ixelles sont particulièrement accueillants.',
      ],
      en: [
        'Brussels Airport (BRU) in Zaventem is the main gateway; Brussels-South Charleroi (CRL) handles low-cost carriers 55 km south. Eurostar connects Brussels-Midi to London and Paris — small dogs in carriers only, not on London-bound trains.',
        'Dogs from EU countries need the EU Pet Passport, microchip and rabies vaccination. From non-EU, an EU health certificate and titre test may apply — plan 3+ months ahead.',
        'Best seasons: late April to June for blossoming parks, September for the Brussels Flower Carpet years; winters are grey and drizzly but rarely snowy.',
        '24/7 emergency vet: Clinique Vétérinaire Universitaire (ULB) Anderlecht, +32 2 555 40 00, and Vetsuni on the city\'s eastern edge.',
        'Most hotels charge €15-30 per night for a dog; Hotel Amigo, The Dominican and several Ixelles boutique hotels are particularly welcoming.',
      ],
      es: [
        'El Aeropuerto de Bruselas (BRU) en Zaventem es la puerta principal; Brussels-South Charleroi (CRL) opera low-cost a 55 km al sur. Eurostar conecta Bruselas-Midi con Londres y París — solo perros pequeños en transportín, y no en los trenes a Londres.',
        'Los perros procedentes de la UE necesitan Pasaporte Europeo, microchip y vacuna antirrábica. Desde fuera de la UE puede requerirse certificado sanitario UE y titulación — planifica con 3 meses de antelación.',
        'Mejores temporadas: finales de abril a junio por los parques en flor, septiembre los años de la Alfombra de Flores; los inviernos son grises y lluviosos, rara vez con nieve.',
        'Urgencia veterinaria 24h: Clinique Vétérinaire Universitaire (ULB) Anderlecht, +32 2 555 40 00, y Vetsuni al este de la ciudad.',
        'La mayoría de los hoteles cobran 15-30 € por noche y perro; el Hotel Amigo, The Dominican y varios hoteles-boutique de Ixelles son especialmente acogedores.',
      ],
    },
  },

  ghent: {
    history: {
      fr: `Gand, au cœur de la Flandre, fut la deuxième plus grande ville d'Europe du Nord médiévale après Paris, et sa silhouette aux trois tours — cathédrale Saint-Bavon, Beffroi et Saint-Nicolas — témoigne encore de cet âge d'or. C'est aujourd'hui une ville universitaire compacte de 265 000 habitants dotée de l'un des centres historiques les plus piétonniers d'Europe — un paradis pour qui promène son chien. La Flandre est la terre d'élection canine de Belgique, et Gand compte des dizaines de hondenlosloopzones officielles, dont les grandes réserves naturelles de Bourgoyen et du lac récréatif de Blaarmeersen. L'esprit progressiste de la ville s'étend aux animaux : elle a été la première en Europe à instaurer un Jeudi Veggie en 2009, et ses cafés du Graslei accueillent presque tous les chiens. Sans voitures depuis 2017, le centre médiéval se parcourt à pas d'homme — et de chien.`,
      en: `Ghent, in the heart of Flanders, was the second-largest city in medieval Northern Europe after Paris, and its skyline of three towers — St Bavo's Cathedral, the Belfry and St Nicholas' Church — still announces that golden age. Today it's a compact university city of 265,000 people with one of Europe's most pedestrianised historic centres, which makes it paradise for walking a dog. Flanders is Belgium's dog-owning heartland, and Ghent counts dozens of official hondenlosloopzones including large ones at Bourgoyen nature reserve and Blaarmeersen recreational lake. The city's famously progressive spirit extends to animals: it was the first European city to introduce a weekly Veggie Day in 2009, and its cafés along the Graslei canal almost universally welcome dogs. Car-free since 2017, the medieval centre lets you wander with a leashed dog at human (and canine) pace.`,
      es: `Gante, en el corazón de Flandes, fue la segunda ciudad más grande del norte de Europa medieval tras París, y su perfil de tres torres — catedral de San Bavón, Campanario y San Nicolás — aún evoca aquella edad dorada. Hoy es una ciudad universitaria compacta de 265.000 habitantes con uno de los centros históricos más peatonalizados de Europa, un paraíso para pasear con perro. Flandes es el territorio canino por excelencia de Bélgica, y Gante cuenta con decenas de hondenlosloopzones oficiales, incluidas las grandes de la reserva natural de Bourgoyen y el lago recreativo de Blaarmeersen. El espíritu progresista de la ciudad se extiende a los animales: fue la primera en Europa en instaurar un Día Vegetariano semanal en 2009, y sus cafés del Graslei admiten perros casi sin excepción. Sin coches desde 2017, el centro medieval se recorre a ritmo humano — y canino.`,
    },
    sights: [
      {
        name: 'Gravensteen Castle',
        emoji: '🏰',
        petFriendly: false,
        desc: {
          fr: 'Le château des Comtes, du XIIe siècle, dresse ses douves au cœur de la ville. Les chiens n\'ont pas accès à la visite intérieure, mais le tour des douves et la place Sint-Veerleplein voisine sont superbes.',
          en: 'The 12th-century Castle of the Counts stands moated in the city centre. Dogs can\'t enter the interior tour, but the exterior walk around the moat and the adjoining Sint-Veerleplein square are picture-perfect.',
          es: 'El Castillo de los Condes, del siglo XII, se alza con sus fosos en el centro. Los perros no pueden entrar en la visita interior, pero la vuelta exterior por el foso y la plaza Sint-Veerleplein son de postal.',
        },
      },
      {
        name: 'Graslei & Korenlei',
        emoji: '⛵',
        petFriendly: true,
        desc: {
          fr: 'Les deux quais médiévaux qui se font face sur la Lys forment le paysage le plus photogénique de Belgique. Les chiens sont acceptés à presque toutes les terrasses le long du canal — les Gantois pique-niquent souvent avec leur chien sur les marches du Graslei.',
          en: 'The two medieval quays facing each other across the Leie river form the most photogenic stretch in Belgium. Dogs are welcome at nearly every canal-side terrace — locals often picnic with their dogs on the Graslei steps.',
          es: 'Los dos muelles medievales enfrentados sobre el río Lys componen la estampa más fotogénica de Bélgica. Los perros son bienvenidos en casi todas las terrazas del canal — los locales suelen merendar con sus perros en las escaleras del Graslei.',
        },
      },
      {
        name: 'Bourgoyen-Ossemeersen Reserve',
        emoji: '🦢',
        petFriendly: true,
        desc: {
          fr: 'Réserve naturelle humide de 230 hectares à l\'ouest de la ville, avec caillebotis, observatoires ornithologiques et zones sans laisse dédiées. À quelques minutes du centre en tram 1.',
          en: 'A 230-hectare wetland nature reserve on the city\'s western edge, with boardwalks, bird hides and dedicated off-leash zones. A short tram 1 ride from the centre.',
          es: 'Una reserva natural de humedales de 230 hectáreas en el extremo oeste de la ciudad, con pasarelas, hides para avistar aves y zonas sin correa habilitadas. A pocos minutos del centro en el tranvía 1.',
        },
      },
      {
        name: 'Citadelpark',
        emoji: '🌷',
        petFriendly: true,
        desc: {
          fr: 'Parc central de Gand aménagé sur une ancienne citadelle, il abrite le SMAK (art contemporain) et le MSK (beaux-arts). Les chiens en laisse sont admis dans le parc, pas dans les musées.',
          en: 'Ghent\'s central public park, built on a former citadel, houses the SMAK contemporary art museum and the MSK fine arts museum. Leashed dogs are welcome in the grounds but not inside the museums.',
          es: 'El parque público central de Gante, levantado sobre una antigua ciudadela, alberga el SMAK de arte contemporáneo y el MSK de bellas artes. Los perros con correa son bienvenidos en el recinto pero no en los museos.',
        },
      },
      {
        name: 'Blaarmeersen',
        emoji: '🏊',
        petFriendly: true,
        desc: {
          fr: 'Zone de loisirs de 90 hectares avec lac de baignade, pistes de jogging et plage canine clôturée sans laisse sur la rive nord — l\'un des rares endroits urbains où les chiens peuvent nager l\'été.',
          en: 'A 90-hectare recreation area with a swimming lake, running tracks and a fenced off-leash dog beach on the northern shore — one of the rare city spots where dogs can swim in summer.',
          es: 'Una zona recreativa de 90 hectáreas con lago de baño, pistas de jogging y una playa canina vallada sin correa en la orilla norte — uno de los pocos lugares urbanos donde los perros pueden nadar en verano.',
        },
      },
      {
        name: 'Patershol district',
        emoji: '🍺',
        petFriendly: true,
        desc: {
          fr: 'Un dédale de ruelles médiévales derrière Gravensteen, truffé de restaurants indépendants et de \'brown cafés\'. Beaucoup accueillent les chiens en intérieur l\'hiver — essayez \'t Dreupelkot pour une dégustation de genièvre.',
          en: 'A warren of narrow medieval lanes behind Gravensteen, packed with independent restaurants and brown cafés. Many welcome dogs inside in winter — try \'t Dreupelkot for a genever tasting.',
          es: 'Un laberinto de callejuelas medievales detrás del Gravensteen, repleto de restaurantes independientes y \'brown cafés\'. Muchos admiten perros en el interior en invierno — prueba \'t Dreupelkot para una cata de ginebra genever.',
        },
      },
    ],
    petTips: {
      fr: [
        'Les trams De Lijn 1, 2 et 4 desservent toutes les grandes promenades canines depuis Gent-Sint-Pieters — 1,80 € par trajet pour le chien, gratuit en sac pour les petits, laisse obligatoire.',
        'Le centre médiéval sans voitures (depuis 2017) permet de promener son chien sereinement sur le Korenmarkt, le Vrijdagmarkt et les quais sans traverser de trafic.',
        'Les canaux de Gand sont accessibles en plusieurs points — évitez que votre chien y boive, la qualité de l\'eau varie ; les cafés vous prêteront une gamelle sur demande.',
        'Si vous louez un bateau chez Minerva ou la Rederij Dewaele pour une croisière, la plupart des opérateurs acceptent les chiens sages en laisse sans supplément — confirmez à la réservation.',
        'Attention aux cyclistes : Gand affiche l\'une des plus fortes parts modales vélo de Flandre, et les zones partagées exigent une laisse courte, notamment dans le quartier étudiant d\'Overpoort.',
      ],
      en: [
        'De Lijn trams 1, 2 and 4 serve all the main dog walks from Ghent-Sint-Pieters station — dogs pay €1.80 per trip, small dogs in a bag travel free, leash required.',
        'The car-free medieval centre (since 2017) means you can walk your dog stress-free through Korenmarkt, Vrijdagmarkt and the quays without crossing traffic.',
        'Ghent\'s canals are directly accessible at several spots — don\'t let your dog drink from them as the water quality is variable; cafés will give you a bowl on request.',
        'If you\'re renting a boat from Minerva or Rederij Dewaele for a canal cruise, most operators allow well-behaved leashed dogs at no extra charge — confirm when booking.',
        'Watch for cyclists: Ghent has one of Flanders\' highest bike-mode shares, and shared zones mean dogs must be kept on a short leash, especially around the student quarter Overpoort.',
      ],
      es: [
        'Los tranvías De Lijn 1, 2 y 4 conectan con todos los grandes paseos caninos desde Gent-Sint-Pieters — 1,80 € por trayecto para el perro, gratis en bolsa para los pequeños, correa obligatoria.',
        'El centro medieval sin coches (desde 2017) permite pasear sin estrés por el Korenmarkt, el Vrijdagmarkt y los muelles sin cruzar tráfico.',
        'Los canales de Gante son accesibles en varios puntos — evita que tu perro beba de ellos, la calidad del agua varía; los cafés te prestarán un cuenco si lo pides.',
        'Si alquilas un barco en Minerva o Rederij Dewaele para un crucero por los canales, casi todos los operadores aceptan perros tranquilos con correa sin recargo — confírmalo al reservar.',
        'Atención a las bicicletas: Gante tiene una de las mayores cuotas modales ciclistas de Flandes, y en zonas compartidas se exige correa corta, sobre todo en el barrio estudiantil de Overpoort.',
      ],
    },
    practicalInfo: {
      fr: [
        'Aéroport principal : Bruxelles (BRU) à 55 km avec un IC direct chaque heure pour Gent-Sint-Pieters (55 min) ; Brussels-South Charleroi pour les low-cost.',
        'Les trains NMBS/SNCB acceptent les chiens : gratis en sac pour les petits, 3,40 € en billet journée pour les grands, laisse obligatoire — idéal pour une journée à Bruges (25 min) ou Anvers (50 min).',
        'Meilleures saisons : avril-juin pour les floraisons au bord des canaux et les Floralies de Gand ; les Gentse Feesten fin juillet sont splendides mais bruyantes et bondées — à éviter avec un chien sensible.',
        'Vétérinaire d\'urgence 24h/24 : Faculté Vétérinaire de l\'Université de Gand à Merelbeke, +32 9 264 77 00 — l\'un des plus grands CHU vétérinaires d\'Europe.',
        'Les hôtels gantois affichent souvent des tarifs \'chien inclus\' — Ghent Marriott, 1898 The Post et NH Gent Belfort sont fiables côté accueil ; apportez toujours la preuve de vaccination antirabique.',
      ],
      en: [
        'Main airport: Brussels (BRU) is 55 km away with a direct hourly IC train to Gent-Sint-Pieters (55 min); Brussels-South Charleroi handles low-cost flights.',
        'NMBS/SNCB trains accept dogs: small dogs free in a bag, large dogs €3.40 day ticket, leash required — perfect for day trips to Bruges (25 min) or Antwerp (50 min).',
        'Best seasons: April-June for canal-side flowers and the Ghent Floralies, and the Ghent Festivities (Gentse Feesten) in late July — note it\'s very crowded and loud, not ideal for nervous dogs.',
        '24/7 emergency vet: Small Animal Department of Ghent University Veterinary Faculty in Merelbeke, +32 9 264 77 00 — one of Europe\'s leading veterinary teaching hospitals.',
        'Ghent hotels often quote \'dog included\' rates — Ghent Marriott, 1898 The Post and NH Gent Belfort are reliably pet-welcoming; always bring proof of rabies vaccination.',
      ],
      es: [
        'Aeropuerto principal: Bruselas (BRU) a 55 km con IC directo cada hora hasta Gent-Sint-Pieters (55 min); Brussels-South Charleroi para los low-cost.',
        'Los trenes NMBS/SNCB admiten perros: gratis en bolsa los pequeños, 3,40 € billete diario los grandes, correa obligatoria — ideal para excursiones a Brujas (25 min) o Amberes (50 min).',
        'Mejores temporadas: abril-junio por las floraciones junto a los canales y las Floralías de Gante; las Gentse Feesten de finales de julio son espectaculares pero ruidosas y abarrotadas — no aptas para perros nerviosos.',
        'Urgencia veterinaria 24h: Facultad de Veterinaria de la Universidad de Gante en Merelbeke, +32 9 264 77 00 — uno de los hospitales veterinarios universitarios más destacados de Europa.',
        'Los hoteles gantesess suelen ofrecer tarifas \'perro incluido\' — Ghent Marriott, 1898 The Post y NH Gent Belfort son fiables en acogida; lleva siempre la prueba de vacunación antirrábica.',
      ],
    },
  },


}

export default cityContent
