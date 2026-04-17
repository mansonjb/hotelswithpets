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
