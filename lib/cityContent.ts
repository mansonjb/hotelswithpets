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

}

export default cityContent
