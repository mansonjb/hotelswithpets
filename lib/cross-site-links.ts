export type CrossSiteLink = {
  site: 'RaceWeekStays' | 'ScreenToTrip' | 'BestSnowHotels' | 'MyHoneymoonHotel' | 'ExploreIleDeRe' | 'PerfectCityBreak'
  url: string
  anchor: { en: string; fr: string; es: string }
  description: { en: string; fr: string; es: string }
}

export const CROSS_SITE_LINKS: Record<string, CrossSiteLink[]> = {
  barcelona: [
    {
      site: 'RaceWeekStays',
      url: 'https://raceweekstays.com/barcelona',
      anchor: {
        en: 'Hotels near the Spanish Grand Prix',
        fr: 'Hotels pres du Grand Prix d\'Espagne',
        es: 'Hoteles cerca del Gran Premio de Espana',
      },
      description: {
        en: 'Attending the Spanish Grand Prix? Find race-week accommodation near Circuit de Barcelona-Catalunya at RaceWeekStays.',
        fr: 'Vous venez pour le Grand Prix d\'Espagne ? Trouvez votre hebergement pour la semaine de course pres du Circuit de Barcelona-Catalunya.',
        es: '¿Vas al Gran Premio de Espana? Encuentra alojamiento para la semana de carrera cerca del Circuit de Barcelona-Catalunya.',
      },
    },
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/barcelona',
      anchor: {
        en: 'Film & TV locations in Barcelona',
        fr: 'Lieux de tournage a Barcelone',
        es: 'Localizaciones de rodaje en Barcelona',
      },
      description: {
        en: 'Barcelona has starred in iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'Barcelone a servi de decor a des films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Barcelona ha aparecido en peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
  ],
  budapest: [
    {
      site: 'RaceWeekStays',
      url: 'https://raceweekstays.com/hungaroring',
      anchor: {
        en: 'Hotels near the Hungarian Grand Prix',
        fr: 'Hotels pres du Grand Prix de Hongrie',
        es: 'Hoteles cerca del Gran Premio de Hungria',
      },
      description: {
        en: 'Attending the Hungarian Grand Prix? Find race-week accommodation near the Hungaroring at RaceWeekStays.',
        fr: 'Vous venez pour le Grand Prix de Hongrie ? Trouvez votre hebergement pour la semaine de course pres du Hungaroring.',
        es: '¿Vas al Gran Premio de Hungria? Encuentra alojamiento para la semana de carrera cerca del Hungaroring.',
      },
    },
  ],
  portimao: [
    {
      site: 'RaceWeekStays',
      url: 'https://raceweekstays.com/portimao',
      anchor: {
        en: 'Hotels near the Portuguese MotoGP',
        fr: 'Hotels pres du MotoGP du Portugal',
        es: 'Hoteles cerca del MotoGP de Portugal',
      },
      description: {
        en: 'Attending the Portuguese MotoGP? Find race-week accommodation near Autodromo Internacional do Algarve at RaceWeekStays.',
        fr: 'Vous venez pour le MotoGP du Portugal ? Trouvez votre hebergement pour la semaine de course pres de l\'Autodromo Internacional do Algarve.',
        es: '¿Vas al MotoGP de Portugal? Encuentra alojamiento para la semana de carrera cerca del Autodromo Internacional do Algarve.',
      },
    },
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/algarve',
      anchor: {
        en: 'Honeymoon hotels in the Algarve',
        fr: 'Hotels lune de miel en Algarve',
        es: 'Hoteles luna de miel en el Algarve',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in the Algarve at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Algarve sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en el Algarve en MyHoneymoonHotel.',
      },
    },
  ],
  madrid: [
    {
      site: 'RaceWeekStays',
      url: 'https://raceweekstays.com/madrid',
      anchor: {
        en: 'Hotels near the Madrid Grand Prix',
        fr: 'Hotels pres du Grand Prix de Madrid',
        es: 'Hoteles cerca del Gran Premio de Madrid',
      },
      description: {
        en: 'Attending the Madrid Grand Prix? Find race-week accommodation near the Madrid circuit at RaceWeekStays.',
        fr: 'Vous venez pour le Grand Prix de Madrid ? Trouvez votre hebergement pour la semaine de course pres du circuit de Madrid.',
        es: '¿Vas al Gran Premio de Madrid? Encuentra alojamiento para la semana de carrera cerca del circuito de Madrid.',
      },
    },
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/madrid',
      anchor: {
        en: 'Film & TV locations in Madrid',
        fr: 'Lieux de tournage a Madrid',
        es: 'Localizaciones de rodaje en Madrid',
      },
      description: {
        en: 'Madrid has starred in iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'Madrid a servi de decor a des films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Madrid ha aparecido en peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
  ],
  zaragoza: [
    {
      site: 'RaceWeekStays',
      url: 'https://raceweekstays.com/aragon',
      anchor: {
        en: 'Hotels near the Aragon MotoGP',
        fr: 'Hotels pres du MotoGP d\'Aragon',
        es: 'Hoteles cerca del MotoGP de Aragon',
      },
      description: {
        en: 'Attending the Aragon MotoGP? Find race-week accommodation near Motorland Aragon at RaceWeekStays.',
        fr: 'Vous venez pour le MotoGP d\'Aragon ? Trouvez votre hebergement pour la semaine de course pres de Motorland Aragon.',
        es: '¿Vas al MotoGP de Aragon? Encuentra alojamiento para la semana de carrera cerca de Motorland Aragon.',
      },
    },
  ],
  milan: [
    {
      site: 'RaceWeekStays',
      url: 'https://raceweekstays.com/monza',
      anchor: {
        en: 'Hotels near the Italian Grand Prix',
        fr: 'Hotels pres du Grand Prix d\'Italie',
        es: 'Hoteles cerca del Gran Premio de Italia',
      },
      description: {
        en: 'Attending the Italian Grand Prix? Find race-week accommodation near Autodromo Nazionale Monza at RaceWeekStays.',
        fr: 'Vous venez pour le Grand Prix d\'Italie ? Trouvez votre hebergement pour la semaine de course pres de l\'Autodromo Nazionale Monza.',
        es: '¿Vas al Gran Premio de Italia? Encuentra alojamiento para la semana de carrera cerca del Autodromo Nazionale Monza.',
      },
    },
  ],
  brussels: [
    {
      site: 'RaceWeekStays',
      url: 'https://raceweekstays.com/spa-francorchamps',
      anchor: {
        en: 'Hotels near the Belgian Grand Prix',
        fr: 'Hotels pres du Grand Prix de Belgique',
        es: 'Hoteles cerca del Gran Premio de Belgica',
      },
      description: {
        en: 'Attending the Belgian Grand Prix? Find race-week accommodation near Circuit de Spa-Francorchamps at RaceWeekStays.',
        fr: 'Vous venez pour le Grand Prix de Belgique ? Trouvez votre hebergement pour la semaine de course pres du Circuit de Spa-Francorchamps.',
        es: '¿Vas al Gran Premio de Belgica? Encuentra alojamiento para la semana de carrera cerca del Circuit de Spa-Francorchamps.',
      },
    },
  ],
  amsterdam: [
    {
      site: 'RaceWeekStays',
      url: 'https://raceweekstays.com/zandvoort',
      anchor: {
        en: 'Hotels near the Dutch Grand Prix',
        fr: 'Hotels pres du Grand Prix des Pays-Bas',
        es: 'Hoteles cerca del Gran Premio de los Paises Bajos',
      },
      description: {
        en: 'Attending the Dutch Grand Prix? Find race-week accommodation near Circuit Zandvoort at RaceWeekStays.',
        fr: 'Vous venez pour le Grand Prix des Pays-Bas ? Trouvez votre hebergement pour la semaine de course pres du Circuit Zandvoort.',
        es: '¿Vas al Gran Premio de los Paises Bajos? Encuentra alojamiento para la semana de carrera cerca del Circuit Zandvoort.',
      },
    },
  ],
  cologne: [
    {
      site: 'RaceWeekStays',
      url: 'https://raceweekstays.com/nurburgring',
      anchor: {
        en: 'Hotels near the 24h Nurburgring',
        fr: 'Hotels pres des 24h du Nurburgring',
        es: 'Hoteles cerca de las 24h de Nurburgring',
      },
      description: {
        en: 'Attending the 24h Nurburgring? Find race-week accommodation near the Nurburgring circuit at RaceWeekStays.',
        fr: 'Vous venez pour les 24h du Nurburgring ? Trouvez votre hebergement pour la semaine de course pres du circuit du Nurburgring.',
        es: '¿Vas a las 24h de Nurburgring? Encuentra alojamiento para la semana de carrera cerca del circuito de Nurburgring.',
      },
    },
  ],
  graz: [
    {
      site: 'RaceWeekStays',
      url: 'https://raceweekstays.com/spielberg',
      anchor: {
        en: 'Hotels near the Austrian Grand Prix',
        fr: 'Hotels pres du Grand Prix d\'Autriche',
        es: 'Hoteles cerca del Gran Premio de Austria',
      },
      description: {
        en: 'Attending the Austrian Grand Prix or MotoGP? Find race-week accommodation near Red Bull Ring at RaceWeekStays.',
        fr: 'Vous venez pour le Grand Prix d\'Autriche ou le MotoGP ? Trouvez votre hebergement pour la semaine de course pres du Red Bull Ring.',
        es: '¿Vas al Gran Premio de Austria o MotoGP? Encuentra alojamiento para la semana de carrera cerca del Red Bull Ring.',
      },
    },
  ],

  // ScreenToTrip - exact slug matches
  dubrovnik: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/dubrovnik',
      anchor: {
        en: 'Film & TV locations in Dubrovnik',
        fr: 'Lieux de tournage a Dubrovnik',
        es: 'Localizaciones de rodaje en Dubrovnik',
      },
      description: {
        en: 'Dubrovnik is famous as the filming location for King\'s Landing in Game of Thrones. Discover all filming locations at ScreenToTrip.',
        fr: 'Dubrovnik est celebre pour avoir servi de decor a Port-Real dans Game of Thrones. Decouvrez tous les lieux de tournage sur ScreenToTrip.',
        es: 'Dubrovnik es famosa como lugar de rodaje de Desembarco del Rey en Juego de Tronos. Descubre todas las localizaciones en ScreenToTrip.',
      },
    },
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/croatia',
      anchor: {
        en: 'Honeymoon hotels in Croatia',
        fr: 'Hotels lune de miel en Croatie',
        es: 'Hoteles luna de miel en Croacia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Croatia at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Croatie sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Croacia en MyHoneymoonHotel.',
      },
    },
  ],
  paris: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/paris',
      anchor: {
        en: 'Film & TV locations in Paris',
        fr: 'Lieux de tournage a Paris',
        es: 'Localizaciones de rodaje en Paris',
      },
      description: {
        en: 'Paris has starred in countless iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'Paris a servi de decor a d\'innombrables films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Paris ha aparecido en innumerables peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
  ],
  seville: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/seville',
      anchor: {
        en: 'Film & TV locations in Seville',
        fr: 'Lieux de tournage a Seville',
        es: 'Localizaciones de rodaje en Sevilla',
      },
      description: {
        en: 'Seville has starred in iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'Seville a servi de decor a des films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Sevilla ha aparecido en peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
  ],
  oxford: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/oxford',
      anchor: {
        en: 'Film & TV locations in Oxford',
        fr: 'Lieux de tournage a Oxford',
        es: 'Localizaciones de rodaje en Oxford',
      },
      description: {
        en: 'Oxford has starred in iconic films and TV series including Harry Potter and Inspector Morse. Discover filming locations at ScreenToTrip.',
        fr: 'Oxford a servi de decor a des films et series emblematiques dont Harry Potter. Decouvrez les lieux de tournage sur ScreenToTrip.',
        es: 'Oxford ha aparecido en peliculas y series emblematicas como Harry Potter. Descubre las localizaciones de rodaje en ScreenToTrip.',
      },
    },
  ],
  bath: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/bath',
      anchor: {
        en: 'Film & TV locations in Bath',
        fr: 'Lieux de tournage a Bath',
        es: 'Localizaciones de rodaje en Bath',
      },
      description: {
        en: 'Bath has starred in iconic films and TV series including Bridgerton and Persuasion. Discover filming locations at ScreenToTrip.',
        fr: 'Bath a servi de decor a des films et series emblematiques dont Bridgerton. Decouvrez les lieux de tournage sur ScreenToTrip.',
        es: 'Bath ha aparecido en peliculas y series emblematicas como Bridgerton. Descubre las localizaciones de rodaje en ScreenToTrip.',
      },
    },
  ],
  london: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/london',
      anchor: {
        en: 'Film & TV locations in London',
        fr: 'Lieux de tournage a Londres',
        es: 'Localizaciones de rodaje en Londres',
      },
      description: {
        en: 'London has starred in countless iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'Londres a servi de decor a d\'innombrables films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Londres ha aparecido en innumerables peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
  ],
  liverpool: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/liverpool',
      anchor: {
        en: 'Film & TV locations in Liverpool',
        fr: 'Lieux de tournage a Liverpool',
        es: 'Localizaciones de rodaje en Liverpool',
      },
      description: {
        en: 'Liverpool has starred in iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'Liverpool a servi de decor a des films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Liverpool ha aparecido en peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
  ],
  dublin: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/dublin',
      anchor: {
        en: 'Film & TV locations in Dublin',
        fr: 'Lieux de tournage a Dublin',
        es: 'Localizaciones de rodaje en Dublin',
      },
      description: {
        en: 'Dublin has starred in iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'Dublin a servi de decor a des films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Dublin ha aparecido en peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/ireland',
      anchor: {
        en: 'Honeymoon hotels in Ireland',
        fr: 'Hotels lune de miel en Irlande',
        es: 'Hoteles luna de miel en Irlanda',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Ireland at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Irlande sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Irlanda en MyHoneymoonHotel.',
      },
    },
  ],
  salzburg: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/salzburg',
      anchor: {
        en: 'Film & TV locations in Salzburg',
        fr: 'Lieux de tournage a Salzbourg',
        es: 'Localizaciones de rodaje en Salzburgo',
      },
      description: {
        en: 'Salzburg starred in The Sound of Music and other iconic productions. Discover filming locations at ScreenToTrip.',
        fr: 'Salzbourg a servi de decor a La Melodie du bonheur et d\'autres productions emblematiques. Decouvrez les lieux de tournage sur ScreenToTrip.',
        es: 'Salzburgo aparecio en Sonrisas y Lagrimas y otras producciones emblematicas. Descubre las localizaciones de rodaje en ScreenToTrip.',
      },
    },
    {
      site: 'BestSnowHotels',
      url: 'https://www.bestsnowhotels.com/en/destinations/kitzbuhel',
      anchor: {
        en: 'Ski hotels near Salzburg',
        fr: 'Hotels de ski pres de Salzbourg',
        es: 'Hoteles de esqui cerca de Salzburgo',
      },
      description: {
        en: 'Planning a ski trip? Kitzbuhel is 1 hour from Salzburg. Find ski-in/ski-out hotels at BestSnowHotels.',
        fr: 'Vous planifiez un sejour au ski ? Kitzbuhel est a 1h de Salzbourg. Trouvez des hotels ski-in/ski-out sur BestSnowHotels.',
        es: '¿Planeas un viaje de esqui? Kitzbuhel esta a 1 hora de Salzburgo. Encuentra hoteles ski-in/ski-out en BestSnowHotels.',
      },
    },
  ],
  rome: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/rome',
      anchor: {
        en: 'Film & TV locations in Rome',
        fr: 'Lieux de tournage a Rome',
        es: 'Localizaciones de rodaje en Roma',
      },
      description: {
        en: 'Rome has starred in countless iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'Rome a servi de decor a d\'innombrables films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Roma ha aparecido en innumerables peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
  ],
  venice: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/venice',
      anchor: {
        en: 'Film & TV locations in Venice',
        fr: 'Lieux de tournage a Venise',
        es: 'Localizaciones de rodaje en Venecia',
      },
      description: {
        en: 'Venice has starred in iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'Venise a servi de decor a des films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Venecia ha aparecido en peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/venice',
      anchor: {
        en: 'Honeymoon hotels in Venice',
        fr: 'Hotels lune de miel a Venise',
        es: 'Hoteles luna de miel en Venecia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Venice at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel a Venise sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Venecia en MyHoneymoonHotel.',
      },
    },
  ],
  florence: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/florence',
      anchor: {
        en: 'Film & TV locations in Florence',
        fr: 'Lieux de tournage a Florence',
        es: 'Localizaciones de rodaje en Florencia',
      },
      description: {
        en: 'Florence has starred in iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'Florence a servi de decor a des films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Florencia ha aparecido en peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/tuscany',
      anchor: {
        en: 'Honeymoon hotels in Tuscany',
        fr: 'Hotels lune de miel en Toscane',
        es: 'Hoteles luna de miel en Toscana',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Tuscany at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Toscane sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Toscana en MyHoneymoonHotel.',
      },
    },
  ],
  edinburgh: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/edinburgh',
      anchor: {
        en: 'Film & TV locations in Edinburgh',
        fr: 'Lieux de tournage a Edimbourg',
        es: 'Localizaciones de rodaje en Edimburgo',
      },
      description: {
        en: 'Edinburgh has starred in iconic films and TV series including Outlander. Discover filming locations at ScreenToTrip.',
        fr: 'Edimbourg a servi de decor a des films et series emblematiques dont Outlander. Decouvrez les lieux de tournage sur ScreenToTrip.',
        es: 'Edimburgo ha aparecido en peliculas y series emblematicas como Outlander. Descubre las localizaciones de rodaje en ScreenToTrip.',
      },
    },
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/scotland',
      anchor: {
        en: 'Honeymoon hotels in Scotland',
        fr: 'Hotels lune de miel en Ecosse',
        es: 'Hoteles luna de miel en Escocia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Scotland at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Ecosse sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Escocia en MyHoneymoonHotel.',
      },
    },
  ],
  vienna: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/vienna',
      anchor: {
        en: 'Film & TV locations in Vienna',
        fr: 'Lieux de tournage a Vienne',
        es: 'Localizaciones de rodaje en Viena',
      },
      description: {
        en: 'Vienna has starred in iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'Vienne a servi de decor a des films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Viena ha aparecido en peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
  ],
  krakow: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/krakow',
      anchor: {
        en: 'Film & TV locations in Krakow',
        fr: 'Lieux de tournage a Cracovie',
        es: 'Localizaciones de rodaje en Cracovia',
      },
      description: {
        en: 'Krakow has starred in iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'Cracovie a servi de decor a des films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Cracovia ha aparecido en peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
  ],
  bruges: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/bruges',
      anchor: {
        en: 'Film & TV locations in Bruges',
        fr: 'Lieux de tournage a Bruges',
        es: 'Localizaciones de rodaje en Brujas',
      },
      description: {
        en: 'Bruges starred in the acclaimed film "In Bruges". Discover all filming locations at ScreenToTrip.',
        fr: 'Bruges a servi de decor au film acclamé "In Bruges". Decouvrez tous les lieux de tournage sur ScreenToTrip.',
        es: 'Brujas fue el escenario de la aclamada pelicula "In Bruges". Descubre todas las localizaciones en ScreenToTrip.',
      },
    },
  ],
  verona: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/verona',
      anchor: {
        en: 'Film & TV locations in Verona',
        fr: 'Lieux de tournage a Verone',
        es: 'Localizaciones de rodaje en Verona',
      },
      description: {
        en: 'Verona, the city of Romeo and Juliet, has starred in iconic productions. Discover filming locations at ScreenToTrip.',
        fr: 'Verone, la ville de Romeo et Juliette, a servi de decor a des productions emblematiques. Decouvrez les lieux de tournage sur ScreenToTrip.',
        es: 'Verona, la ciudad de Romeo y Julieta, ha aparecido en producciones emblematicas. Descubre las localizaciones de rodaje en ScreenToTrip.',
      },
    },
  ],
  istanbul: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/istanbul',
      anchor: {
        en: 'Film & TV locations in Istanbul',
        fr: 'Lieux de tournage a Istanbul',
        es: 'Localizaciones de rodaje en Estambul',
      },
      description: {
        en: 'Istanbul has starred in iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'Istanbul a servi de decor a des films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Estambul ha aparecido en peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/turkey',
      anchor: {
        en: 'Honeymoon hotels in Turkey',
        fr: 'Hotels lune de miel en Turquie',
        es: 'Hoteles luna de miel en Turquia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Turkey at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Turquie sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Turquia en MyHoneymoonHotel.',
      },
    },
  ],
  interlaken: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/interlaken',
      anchor: {
        en: 'Film & TV locations in Interlaken',
        fr: 'Lieux de tournage a Interlaken',
        es: 'Localizaciones de rodaje en Interlaken',
      },
      description: {
        en: 'Interlaken has starred in iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'Interlaken a servi de decor a des films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Interlaken ha aparecido en peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
    {
      site: 'BestSnowHotels',
      url: 'https://www.bestsnowhotels.com/en/destinations/interlaken',
      anchor: {
        en: 'Ski hotels near Interlaken',
        fr: 'Hotels de ski pres d\'Interlaken',
        es: 'Hoteles de esqui cerca de Interlaken',
      },
      description: {
        en: 'Planning a ski trip? Find ski-in/ski-out hotels in the Interlaken region at BestSnowHotels.',
        fr: 'Vous planifiez un sejour au ski ? Trouvez des hotels ski-in/ski-out dans la region d\'Interlaken sur BestSnowHotels.',
        es: '¿Planeas un viaje de esqui? Encuentra hoteles ski-in/ski-out en la region de Interlaken en BestSnowHotels.',
      },
    },
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/switzerland',
      anchor: {
        en: 'Honeymoon hotels in Switzerland',
        fr: 'Hotels lune de miel en Suisse',
        es: 'Hoteles luna de miel en Suiza',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Switzerland at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Suisse sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Suiza en MyHoneymoonHotel.',
      },
    },
  ],
  dubai: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/dubai',
      anchor: {
        en: 'Film & TV locations in Dubai',
        fr: 'Lieux de tournage a Dubai',
        es: 'Localizaciones de rodaje en Dubai',
      },
      description: {
        en: 'Dubai has starred in iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'Dubai a servi de decor a des films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Dubai ha aparecido en peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/uae',
      anchor: {
        en: 'Honeymoon hotels in the UAE',
        fr: 'Hotels lune de miel aux Emirats',
        es: 'Hoteles luna de miel en los Emiratos',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in the UAE at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel aux Emirats sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en los Emiratos en MyHoneymoonHotel.',
      },
    },
  ],
  'abu-dhabi': [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/abu-dhabi',
      anchor: {
        en: 'Film & TV locations in Abu Dhabi',
        fr: 'Lieux de tournage a Abu Dhabi',
        es: 'Localizaciones de rodaje en Abu Dabi',
      },
      description: {
        en: 'Abu Dhabi has starred in iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'Abu Dhabi a servi de decor a des films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Abu Dabi ha aparecido en peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/uae',
      anchor: {
        en: 'Honeymoon hotels in the UAE',
        fr: 'Hotels lune de miel aux Emirats',
        es: 'Hoteles luna de miel en los Emiratos',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in the UAE at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel aux Emirats sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en los Emiratos en MyHoneymoonHotel.',
      },
    },
  ],
  taormina: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/taormina',
      anchor: {
        en: 'Film & TV locations in Taormina',
        fr: 'Lieux de tournage a Taormina',
        es: 'Localizaciones de rodaje en Taormina',
      },
      description: {
        en: 'Taormina starred in The White Lotus Season 2. Discover all filming locations at ScreenToTrip.',
        fr: 'Taormina a servi de decor a la saison 2 de The White Lotus. Decouvrez tous les lieux de tournage sur ScreenToTrip.',
        es: 'Taormina fue el escenario de la 2a temporada de The White Lotus. Descubre todas las localizaciones en ScreenToTrip.',
      },
    },
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/sicily',
      anchor: {
        en: 'Honeymoon hotels in Sicily',
        fr: 'Hotels lune de miel en Sicile',
        es: 'Hoteles luna de miel en Sicilia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Sicily at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Sicile sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Sicilia en MyHoneymoonHotel.',
      },
    },
  ],
  matera: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/matera',
      anchor: {
        en: 'Film & TV locations in Matera',
        fr: 'Lieux de tournage a Matera',
        es: 'Localizaciones de rodaje en Matera',
      },
      description: {
        en: 'Matera has starred in iconic films including No Time to Die. Discover filming locations at ScreenToTrip.',
        fr: 'Matera a servi de decor a des films emblematiques dont Mourir peut attendre. Decouvrez les lieux de tournage sur ScreenToTrip.',
        es: 'Matera ha aparecido en peliculas emblematicas como Sin tiempo para morir. Descubre las localizaciones de rodaje en ScreenToTrip.',
      },
    },
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/puglia',
      anchor: {
        en: 'Honeymoon hotels in Puglia',
        fr: 'Hotels lune de miel en Pouille',
        es: 'Hoteles luna de miel en Puglia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Puglia at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Pouille sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Puglia en MyHoneymoonHotel.',
      },
    },
  ],
  corfu: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/corfu',
      anchor: {
        en: 'Film & TV locations in Corfu',
        fr: 'Lieux de tournage a Corfou',
        es: 'Localizaciones de rodaje en Corfu',
      },
      description: {
        en: 'Corfu has starred in iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'Corfou a servi de decor a des films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Corfu ha aparecido en peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/greece',
      anchor: {
        en: 'Honeymoon hotels in Greece',
        fr: 'Hotels lune de miel en Grece',
        es: 'Hoteles luna de miel en Grecia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Greece at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Grece sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Grecia en MyHoneymoonHotel.',
      },
    },
  ],
  kefalonia: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/kefalonia',
      anchor: {
        en: 'Film & TV locations in Kefalonia',
        fr: 'Lieux de tournage a Kefalonie',
        es: 'Localizaciones de rodaje en Cefalonia',
      },
      description: {
        en: 'Kefalonia starred in Captain Corelli\'s Mandolin. Discover all filming locations at ScreenToTrip.',
        fr: 'Kefalonie a servi de decor au film Le Mandoline du Capitaine Corelli. Decouvrez tous les lieux de tournage sur ScreenToTrip.',
        es: 'Cefalonia fue el escenario del Capitan Corelli. Descubre todas las localizaciones en ScreenToTrip.',
      },
    },
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/greece',
      anchor: {
        en: 'Honeymoon hotels in Greece',
        fr: 'Hotels lune de miel en Grece',
        es: 'Hoteles luna de miel en Grecia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Greece at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Grece sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Grecia en MyHoneymoonHotel.',
      },
    },
  ],
  cefalu: [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/cefalu',
      anchor: {
        en: 'Film & TV locations in Cefalu',
        fr: 'Lieux de tournage a Cefalu',
        es: 'Localizaciones de rodaje en Cefalu',
      },
      description: {
        en: 'Cefalu has starred in iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'Cefalu a servi de decor a des films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Cefalu ha aparecido en peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/sicily',
      anchor: {
        en: 'Honeymoon hotels in Sicily',
        fr: 'Hotels lune de miel en Sicile',
        es: 'Hoteles luna de miel en Sicilia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Sicily at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Sicile sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Sicilia en MyHoneymoonHotel.',
      },
    },
  ],
  'new-york': [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/new-york',
      anchor: {
        en: 'Film & TV locations in New York',
        fr: 'Lieux de tournage a New York',
        es: 'Localizaciones de rodaje en Nueva York',
      },
      description: {
        en: 'New York has starred in countless iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'New York a servi de decor a d\'innombrables films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'Nueva York ha aparecido en innumerables peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
  ],
  'los-angeles': [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/los-angeles',
      anchor: {
        en: 'Film & TV locations in Los Angeles',
        fr: 'Lieux de tournage a Los Angeles',
        es: 'Localizaciones de rodaje en Los Angeles',
      },
      description: {
        en: 'Los Angeles is the heart of Hollywood. Discover iconic filming locations and studio sets at ScreenToTrip.',
        fr: 'Los Angeles est le coeur d\'Hollywood. Decouvrez les lieux de tournage iconiques et les studios sur ScreenToTrip.',
        es: 'Los Angeles es el corazon de Hollywood. Descubre las localizaciones iconicas de rodaje y los estudios en ScreenToTrip.',
      },
    },
  ],
  'san-francisco': [
    {
      site: 'ScreenToTrip',
      url: 'https://screentotrip.com/san-francisco',
      anchor: {
        en: 'Film & TV locations in San Francisco',
        fr: 'Lieux de tournage a San Francisco',
        es: 'Localizaciones de rodaje en San Francisco',
      },
      description: {
        en: 'San Francisco has starred in iconic films and TV series. Discover the exact filming locations at ScreenToTrip.',
        fr: 'San Francisco a servi de decor a des films et series emblematiques. Decouvrez les lieux de tournage exacts sur ScreenToTrip.',
        es: 'San Francisco ha aparecido en peliculas y series emblematicas. Descubre las localizaciones exactas de rodaje en ScreenToTrip.',
      },
    },
  ],

  // BestSnowHotels
  annecy: [
    {
      site: 'BestSnowHotels',
      url: 'https://www.bestsnowhotels.com/en/destinations/chamonix',
      anchor: {
        en: 'Ski hotels near Annecy',
        fr: 'Hotels de ski pres d\'Annecy',
        es: 'Hoteles de esqui cerca de Annecy',
      },
      description: {
        en: 'Planning a ski trip? Chamonix is 1 hour from Annecy. Find ski-in/ski-out hotels at BestSnowHotels.',
        fr: 'Vous planifiez un sejour au ski ? Chamonix est a 1h d\'Annecy. Trouvez des hotels ski-in/ski-out sur BestSnowHotels.',
        es: '¿Planeas un viaje de esqui? Chamonix esta a 1 hora de Annecy. Encuentra hoteles ski-in/ski-out en BestSnowHotels.',
      },
    },
  ],
  geneva: [
    {
      site: 'BestSnowHotels',
      url: 'https://www.bestsnowhotels.com/en/destinations/chamonix',
      anchor: {
        en: 'Ski hotels near Geneva',
        fr: 'Hotels de ski pres de Geneve',
        es: 'Hoteles de esqui cerca de Ginebra',
      },
      description: {
        en: 'Planning a ski trip? Chamonix is 1 hour from Geneva. Find ski-in/ski-out hotels at BestSnowHotels.',
        fr: 'Vous planifiez un sejour au ski ? Chamonix est a 1h de Geneve. Trouvez des hotels ski-in/ski-out sur BestSnowHotels.',
        es: '¿Planeas un viaje de esqui? Chamonix esta a 1 hora de Ginebra. Encuentra hoteles ski-in/ski-out en BestSnowHotels.',
      },
    },
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/switzerland',
      anchor: {
        en: 'Honeymoon hotels in Switzerland',
        fr: 'Hotels lune de miel en Suisse',
        es: 'Hoteles luna de miel en Suiza',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Switzerland at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Suisse sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Suiza en MyHoneymoonHotel.',
      },
    },
  ],
  innsbruck: [
    {
      site: 'BestSnowHotels',
      url: 'https://www.bestsnowhotels.com/en/destinations/innsbruck',
      anchor: {
        en: 'Ski hotels in Innsbruck',
        fr: 'Hotels de ski a Innsbruck',
        es: 'Hoteles de esqui en Innsbruck',
      },
      description: {
        en: 'Planning a ski trip? Find ski-in/ski-out hotels in Innsbruck at BestSnowHotels.',
        fr: 'Vous planifiez un sejour au ski ? Trouvez des hotels ski-in/ski-out a Innsbruck sur BestSnowHotels.',
        es: '¿Planeas un viaje de esqui? Encuentra hoteles ski-in/ski-out en Innsbruck en BestSnowHotels.',
      },
    },
  ],
  lausanne: [
    {
      site: 'BestSnowHotels',
      url: 'https://www.bestsnowhotels.com/en/destinations/verbier',
      anchor: {
        en: 'Ski hotels near Lausanne',
        fr: 'Hotels de ski pres de Lausanne',
        es: 'Hoteles de esqui cerca de Lausana',
      },
      description: {
        en: 'Planning a ski trip? Verbier is 1 hour from Lausanne. Find ski-in/ski-out hotels at BestSnowHotels.',
        fr: 'Vous planifiez un sejour au ski ? Verbier est a 1h de Lausanne. Trouvez des hotels ski-in/ski-out sur BestSnowHotels.',
        es: '¿Planeas un viaje de esqui? Verbier esta a 1 hora de Lausana. Encuentra hoteles ski-in/ski-out en BestSnowHotels.',
      },
    },
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/switzerland',
      anchor: {
        en: 'Honeymoon hotels in Switzerland',
        fr: 'Hotels lune de miel en Suisse',
        es: 'Hoteles luna de miel en Suiza',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Switzerland at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Suisse sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Suiza en MyHoneymoonHotel.',
      },
    },
  ],
  'st-moritz': [
    {
      site: 'BestSnowHotels',
      url: 'https://www.bestsnowhotels.com/en/destinations/st-moritz',
      anchor: {
        en: 'Ski hotels in St. Moritz',
        fr: 'Hotels de ski a Saint-Moritz',
        es: 'Hoteles de esqui en Saint-Moritz',
      },
      description: {
        en: 'Planning a ski trip? Find ski-in/ski-out hotels in St. Moritz at BestSnowHotels.',
        fr: 'Vous planifiez un sejour au ski ? Trouvez des hotels ski-in/ski-out a Saint-Moritz sur BestSnowHotels.',
        es: '¿Planeas un viaje de esqui? Encuentra hoteles ski-in/ski-out en Saint-Moritz en BestSnowHotels.',
      },
    },
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/switzerland',
      anchor: {
        en: 'Honeymoon hotels in Switzerland',
        fr: 'Hotels lune de miel en Suisse',
        es: 'Hoteles luna de miel en Suiza',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Switzerland at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Suisse sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Suiza en MyHoneymoonHotel.',
      },
    },
  ],

  // MyHoneymoonHotel only destinations
  albufeira: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/algarve',
      anchor: {
        en: 'Honeymoon hotels in the Algarve',
        fr: 'Hotels lune de miel en Algarve',
        es: 'Hoteles luna de miel en el Algarve',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in the Algarve at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Algarve sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en el Algarve en MyHoneymoonHotel.',
      },
    },
  ],
  faro: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/algarve',
      anchor: {
        en: 'Honeymoon hotels in the Algarve',
        fr: 'Hotels lune de miel en Algarve',
        es: 'Hoteles luna de miel en el Algarve',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in the Algarve at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Algarve sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en el Algarve en MyHoneymoonHotel.',
      },
    },
  ],
  lagos: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/algarve',
      anchor: {
        en: 'Honeymoon hotels in the Algarve',
        fr: 'Hotels lune de miel en Algarve',
        es: 'Hoteles luna de miel en el Algarve',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in the Algarve at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Algarve sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en el Algarve en MyHoneymoonHotel.',
      },
    },
  ],
  tavira: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/algarve',
      anchor: {
        en: 'Honeymoon hotels in the Algarve',
        fr: 'Hotels lune de miel en Algarve',
        es: 'Hoteles luna de miel en el Algarve',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in the Algarve at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Algarve sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en el Algarve en MyHoneymoonHotel.',
      },
    },
  ],
  nice: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/cote-dazur',
      anchor: {
        en: 'Honeymoon hotels on the Cote d\'Azur',
        fr: 'Hotels lune de miel sur la Cote d\'Azur',
        es: 'Hoteles luna de miel en la Costa Azul',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels on the Cote d\'Azur at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel sur la Cote d\'Azur sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en la Costa Azul en MyHoneymoonHotel.',
      },
    },
  ],
  cannes: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/cote-dazur',
      anchor: {
        en: 'Honeymoon hotels on the Cote d\'Azur',
        fr: 'Hotels lune de miel sur la Cote d\'Azur',
        es: 'Hoteles luna de miel en la Costa Azul',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels on the Cote d\'Azur at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel sur la Cote d\'Azur sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en la Costa Azul en MyHoneymoonHotel.',
      },
    },
  ],
  antibes: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/cote-dazur',
      anchor: {
        en: 'Honeymoon hotels on the Cote d\'Azur',
        fr: 'Hotels lune de miel sur la Cote d\'Azur',
        es: 'Hoteles luna de miel en la Costa Azul',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels on the Cote d\'Azur at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel sur la Cote d\'Azur sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en la Costa Azul en MyHoneymoonHotel.',
      },
    },
  ],
  menton: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/cote-dazur',
      anchor: {
        en: 'Honeymoon hotels on the Cote d\'Azur',
        fr: 'Hotels lune de miel sur la Cote d\'Azur',
        es: 'Hoteles luna de miel en la Costa Azul',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels on the Cote d\'Azur at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel sur la Cote d\'Azur sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en la Costa Azul en MyHoneymoonHotel.',
      },
    },
  ],
  'saint-tropez': [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/cote-dazur',
      anchor: {
        en: 'Honeymoon hotels on the Cote d\'Azur',
        fr: 'Hotels lune de miel sur la Cote d\'Azur',
        es: 'Hoteles luna de miel en la Costa Azul',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels on the Cote d\'Azur at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel sur la Cote d\'Azur sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en la Costa Azul en MyHoneymoonHotel.',
      },
    },
  ],
  'villefranche-sur-mer': [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/cote-dazur',
      anchor: {
        en: 'Honeymoon hotels on the Cote d\'Azur',
        fr: 'Hotels lune de miel sur la Cote d\'Azur',
        es: 'Hoteles luna de miel en la Costa Azul',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels on the Cote d\'Azur at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel sur la Cote d\'Azur sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en la Costa Azul en MyHoneymoonHotel.',
      },
    },
  ],
  antalya: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/turkey',
      anchor: {
        en: 'Honeymoon hotels in Turkey',
        fr: 'Hotels lune de miel en Turquie',
        es: 'Hoteles luna de miel en Turquia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Turkey at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Turquie sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Turquia en MyHoneymoonHotel.',
      },
    },
  ],
  bodrum: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/turkey',
      anchor: {
        en: 'Honeymoon hotels in Turkey',
        fr: 'Hotels lune de miel en Turquie',
        es: 'Hoteles luna de miel en Turquia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Turkey at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Turquie sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Turquia en MyHoneymoonHotel.',
      },
    },
  ],
  kas: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/turkey',
      anchor: {
        en: 'Honeymoon hotels in Turkey',
        fr: 'Hotels lune de miel en Turquie',
        es: 'Hoteles luna de miel en Turquia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Turkey at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Turquie sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Turquia en MyHoneymoonHotel.',
      },
    },
  ],
  goreme: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/turkey',
      anchor: {
        en: 'Honeymoon hotels in Turkey',
        fr: 'Hotels lune de miel en Turquie',
        es: 'Hoteles luna de miel en Turquia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Turkey at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Turquie sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Turquia en MyHoneymoonHotel.',
      },
    },
  ],
  palma: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/mallorca',
      anchor: {
        en: 'Honeymoon hotels in Mallorca',
        fr: 'Hotels lune de miel a Majorque',
        es: 'Hoteles luna de miel en Mallorca',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Mallorca at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel a Majorque sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Mallorca en MyHoneymoonHotel.',
      },
    },
  ],
  alcudia: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/mallorca',
      anchor: {
        en: 'Honeymoon hotels in Mallorca',
        fr: 'Hotels lune de miel a Majorque',
        es: 'Hoteles luna de miel en Mallorca',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Mallorca at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel a Majorque sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Mallorca en MyHoneymoonHotel.',
      },
    },
  ],
  soller: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/mallorca',
      anchor: {
        en: 'Honeymoon hotels in Mallorca',
        fr: 'Hotels lune de miel a Majorque',
        es: 'Hoteles luna de miel en Mallorca',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Mallorca at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel a Majorque sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Mallorca en MyHoneymoonHotel.',
      },
    },
  ],
  valldemossa: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/mallorca',
      anchor: {
        en: 'Honeymoon hotels in Mallorca',
        fr: 'Hotels lune de miel a Majorque',
        es: 'Hoteles luna de miel en Mallorca',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Mallorca at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel a Majorque sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Mallorca en MyHoneymoonHotel.',
      },
    },
  ],
  siena: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/tuscany',
      anchor: {
        en: 'Honeymoon hotels in Tuscany',
        fr: 'Hotels lune de miel en Toscane',
        es: 'Hoteles luna de miel en Toscana',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Tuscany at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Toscane sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Toscana en MyHoneymoonHotel.',
      },
    },
  ],
  'aix-en-provence': [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/provence',
      anchor: {
        en: 'Honeymoon hotels in Provence',
        fr: 'Hotels lune de miel en Provence',
        es: 'Hoteles luna de miel en Provenza',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Provence at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Provence sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Provenza en MyHoneymoonHotel.',
      },
    },
  ],
  arles: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/provence',
      anchor: {
        en: 'Honeymoon hotels in Provence',
        fr: 'Hotels lune de miel en Provence',
        es: 'Hoteles luna de miel en Provenza',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Provence at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Provence sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Provenza en MyHoneymoonHotel.',
      },
    },
  ],
  avignon: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/provence',
      anchor: {
        en: 'Honeymoon hotels in Provence',
        fr: 'Hotels lune de miel en Provence',
        es: 'Hoteles luna de miel en Provenza',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Provence at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Provence sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Provenza en MyHoneymoonHotel.',
      },
    },
  ],
  santorini: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/greece',
      anchor: {
        en: 'Honeymoon hotels in Greece',
        fr: 'Hotels lune de miel en Grece',
        es: 'Hoteles luna de miel en Grecia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Greece at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Grece sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Grecia en MyHoneymoonHotel.',
      },
    },
  ],
  hvar: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/croatia',
      anchor: {
        en: 'Honeymoon hotels in Croatia',
        fr: 'Hotels lune de miel en Croatie',
        es: 'Hoteles luna de miel en Croacia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Croatia at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Croatie sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Croacia en MyHoneymoonHotel.',
      },
    },
  ],
  split: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/croatia',
      anchor: {
        en: 'Honeymoon hotels in Croatia',
        fr: 'Hotels lune de miel en Croatie',
        es: 'Hoteles luna de miel en Croacia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Croatia at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Croatie sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Croacia en MyHoneymoonHotel.',
      },
    },
  ],
  rovinj: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/croatia',
      anchor: {
        en: 'Honeymoon hotels in Croatia',
        fr: 'Hotels lune de miel en Croatie',
        es: 'Hoteles luna de miel en Croacia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Croatia at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Croatie sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Croacia en MyHoneymoonHotel.',
      },
    },
  ],
  zadar: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/croatia',
      anchor: {
        en: 'Honeymoon hotels in Croatia',
        fr: 'Hotels lune de miel en Croatie',
        es: 'Hoteles luna de miel en Croacia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Croatia at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Croatie sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Croacia en MyHoneymoonHotel.',
      },
    },
  ],
  makarska: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/croatia',
      anchor: {
        en: 'Honeymoon hotels in Croatia',
        fr: 'Hotels lune de miel en Croatie',
        es: 'Hoteles luna de miel en Croacia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Croatia at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Croatie sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Croacia en MyHoneymoonHotel.',
      },
    },
  ],
  trogir: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/croatia',
      anchor: {
        en: 'Honeymoon hotels in Croatia',
        fr: 'Hotels lune de miel en Croatie',
        es: 'Hoteles luna de miel en Croacia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Croatia at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Croatie sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Croacia en MyHoneymoonHotel.',
      },
    },
  ],
  sibenik: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/croatia',
      anchor: {
        en: 'Honeymoon hotels in Croatia',
        fr: 'Hotels lune de miel en Croatie',
        es: 'Hoteles luna de miel en Croacia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Croatia at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Croatie sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Croacia en MyHoneymoonHotel.',
      },
    },
  ],
  glasgow: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/scotland',
      anchor: {
        en: 'Honeymoon hotels in Scotland',
        fr: 'Hotels lune de miel en Ecosse',
        es: 'Hoteles luna de miel en Escocia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Scotland at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Ecosse sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Escocia en MyHoneymoonHotel.',
      },
    },
  ],
  sintra: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/portugal',
      anchor: {
        en: 'Honeymoon hotels in Portugal',
        fr: 'Hotels lune de miel au Portugal',
        es: 'Hoteles luna de miel en Portugal',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Portugal at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel au Portugal sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Portugal en MyHoneymoonHotel.',
      },
    },
  ],
  cascais: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/portugal',
      anchor: {
        en: 'Honeymoon hotels in Portugal',
        fr: 'Hotels lune de miel au Portugal',
        es: 'Hoteles luna de miel en Portugal',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Portugal at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel au Portugal sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Portugal en MyHoneymoonHotel.',
      },
    },
  ],
  coimbra: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/portugal',
      anchor: {
        en: 'Honeymoon hotels in Portugal',
        fr: 'Hotels lune de miel au Portugal',
        es: 'Hoteles luna de miel en Portugal',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Portugal at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel au Portugal sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Portugal en MyHoneymoonHotel.',
      },
    },
  ],
  lisbon: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/portugal',
      anchor: {
        en: 'Honeymoon hotels in Portugal',
        fr: 'Hotels lune de miel au Portugal',
        es: 'Hoteles luna de miel en Portugal',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Portugal at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel au Portugal sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Portugal en MyHoneymoonHotel.',
      },
    },
  ],
  porto: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/portugal',
      anchor: {
        en: 'Honeymoon hotels in Portugal',
        fr: 'Hotels lune de miel au Portugal',
        es: 'Hoteles luna de miel en Portugal',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Portugal at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel au Portugal sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Portugal en MyHoneymoonHotel.',
      },
    },
  ],
  lecce: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/puglia',
      anchor: {
        en: 'Honeymoon hotels in Puglia',
        fr: 'Hotels lune de miel en Pouille',
        es: 'Hoteles luna de miel en Puglia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Puglia at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Pouille sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Puglia en MyHoneymoonHotel.',
      },
    },
  ],
  bari: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/puglia',
      anchor: {
        en: 'Honeymoon hotels in Puglia',
        fr: 'Hotels lune de miel en Pouille',
        es: 'Hoteles luna de miel en Puglia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Puglia at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Pouille sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Puglia en MyHoneymoonHotel.',
      },
    },
  ],
  cagliari: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/sardegna',
      anchor: {
        en: 'Honeymoon hotels in Sardinia',
        fr: 'Hotels lune de miel en Sardaigne',
        es: 'Hoteles luna de miel en Cerdena',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Sardinia at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Sardaigne sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Cerdena en MyHoneymoonHotel.',
      },
    },
  ],
  alghero: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/sardegna',
      anchor: {
        en: 'Honeymoon hotels in Sardinia',
        fr: 'Hotels lune de miel en Sardaigne',
        es: 'Hoteles luna de miel en Cerdena',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Sardinia at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Sardaigne sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Cerdena en MyHoneymoonHotel.',
      },
    },
  ],
  como: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/lake-como',
      anchor: {
        en: 'Honeymoon hotels on Lake Como',
        fr: 'Hotels lune de miel sur le Lac de Come',
        es: 'Hoteles luna de miel en el Lago de Como',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels on Lake Como at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel sur le Lac de Come sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en el Lago de Como en MyHoneymoonHotel.',
      },
    },
  ],
  reykjavik: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/iceland',
      anchor: {
        en: 'Honeymoon hotels in Iceland',
        fr: 'Hotels lune de miel en Islande',
        es: 'Hoteles luna de miel en Islandia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Iceland at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Islande sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Islandia en MyHoneymoonHotel.',
      },
    },
  ],
  ljubljana: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/slovenia',
      anchor: {
        en: 'Honeymoon hotels in Slovenia',
        fr: 'Hotels lune de miel en Slovenie',
        es: 'Hoteles luna de miel en Eslovenia',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Slovenia at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Slovenie sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Eslovenia en MyHoneymoonHotel.',
      },
    },
  ],
  munich: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/bavaria',
      anchor: {
        en: 'Honeymoon hotels in Bavaria',
        fr: 'Hotels lune de miel en Baviere',
        es: 'Hoteles luna de miel en Baviera',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Bavaria at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Baviere sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Baviera en MyHoneymoonHotel.',
      },
    },
  ],
  bergen: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/norway',
      anchor: {
        en: 'Honeymoon hotels in Norway',
        fr: 'Hotels lune de miel en Norvege',
        es: 'Hoteles luna de miel en Noruega',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Norway at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Norvege sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Noruega en MyHoneymoonHotel.',
      },
    },
  ],
  oslo: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/norway',
      anchor: {
        en: 'Honeymoon hotels in Norway',
        fr: 'Hotels lune de miel en Norvege',
        es: 'Hoteles luna de miel en Noruega',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Norway at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Norvege sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Noruega en MyHoneymoonHotel.',
      },
    },
  ],
  reims: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/champagne',
      anchor: {
        en: 'Honeymoon hotels in Champagne',
        fr: 'Hotels lune de miel en Champagne',
        es: 'Hoteles luna de miel en Champagne',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in Champagne at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Champagne sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en Champagne en MyHoneymoonHotel.',
      },
    },
  ],
  tours: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/loire-valley',
      anchor: {
        en: 'Honeymoon hotels in the Loire Valley',
        fr: 'Hotels lune de miel en Val de Loire',
        es: 'Hoteles luna de miel en el Valle del Loira',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in the Loire Valley at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Val de Loire sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en el Valle del Loira en MyHoneymoonHotel.',
      },
    },
  ],
  angers: [
    {
      site: 'MyHoneymoonHotel',
      url: 'https://myhoneymoonhotel.com/destinations/loire-valley',
      anchor: {
        en: 'Honeymoon hotels in the Loire Valley',
        fr: 'Hotels lune de miel en Val de Loire',
        es: 'Hoteles luna de miel en el Valle del Loira',
      },
      description: {
        en: 'Planning a romantic getaway? Discover curated honeymoon hotels in the Loire Valley at MyHoneymoonHotel.',
        fr: 'Vous planifiez un sejour romantique ? Decouvrez les meilleurs hotels pour lune de miel en Val de Loire sur MyHoneymoonHotel.',
        es: '¿Planeas una escapada romantica? Descubre los mejores hoteles de luna de miel en el Valle del Loira en MyHoneymoonHotel.',
      },
    },
  ],

  // ExploreIleDeRe
  'la-rochelle': [
    {
      site: 'ExploreIleDeRe',
      url: 'https://exploreiledere.com',
      anchor: {
        en: 'Hotels & stays on the Ile de Re',
        fr: 'Hebergements sur l\'Ile de Re',
        es: 'Alojamientos en la Ile de Re',
      },
      description: {
        en: 'La Rochelle is the gateway to the Ile de Re. Discover beaches, villages and holiday rentals on the island.',
        fr: 'La Rochelle est la porte d\'entree de l\'Ile de Re. Decouvrez plages, villages et hebergements sur l\'ile.',
        es: 'La Rochelle es la puerta de entrada a la Ile de Re. Descubre playas, pueblos y alojamientos en la isla.',
      },
    },
  ],
}

/**
 * PerfectCityBreak (perfectcitybreak.com): sister site with 3-day city-break itineraries.
 * Complementary intent: HotelsWithPets covers where to sleep with a pet, PerfectCityBreak covers
 * what to see and do. Only the cities below exist on both sites, so every link resolves (no 404).
 * City display names are localized per locale. Links are appended to CROSS_SITE_LINKS so cities
 * that already have a sister-site entry keep it and gain the PerfectCityBreak card too.
 */
const PERFECT_CITY_BREAK_CITIES: Record<string, { en: string; fr: string; es: string }> = {
  paris: { en: 'Paris', fr: 'Paris', es: 'Paris' },
  rome: { en: 'Rome', fr: 'Rome', es: 'Roma' },
  barcelona: { en: 'Barcelona', fr: 'Barcelone', es: 'Barcelona' },
  madrid: { en: 'Madrid', fr: 'Madrid', es: 'Madrid' },
  amsterdam: { en: 'Amsterdam', fr: 'Amsterdam', es: 'Amsterdam' },
  lisbon: { en: 'Lisbon', fr: 'Lisbonne', es: 'Lisboa' },
  prague: { en: 'Prague', fr: 'Prague', es: 'Praga' },
  vienna: { en: 'Vienna', fr: 'Vienne', es: 'Viena' },
  budapest: { en: 'Budapest', fr: 'Budapest', es: 'Budapest' },
  florence: { en: 'Florence', fr: 'Florence', es: 'Florencia' },
  venice: { en: 'Venice', fr: 'Venise', es: 'Venecia' },
  porto: { en: 'Porto', fr: 'Porto', es: 'Oporto' },
  berlin: { en: 'Berlin', fr: 'Berlin', es: 'Berlin' },
  seville: { en: 'Seville', fr: 'Seville', es: 'Sevilla' },
  edinburgh: { en: 'Edinburgh', fr: 'Edimbourg', es: 'Edimburgo' },
  munich: { en: 'Munich', fr: 'Munich', es: 'Munich' },
  dublin: { en: 'Dublin', fr: 'Dublin', es: 'Dublin' },
  brussels: { en: 'Brussels', fr: 'Bruxelles', es: 'Bruselas' },
  milan: { en: 'Milan', fr: 'Milan', es: 'Milan' },
  naples: { en: 'Naples', fr: 'Naples', es: 'Napoles' },
}

for (const [slug, name] of Object.entries(PERFECT_CITY_BREAK_CITIES)) {
  const entry: CrossSiteLink = {
    site: 'PerfectCityBreak',
    url: `https://perfectcitybreak.com/${slug}`,
    anchor: {
      en: `${name.en} city break guide`,
      fr: `Guide city break a ${name.fr}`,
      es: `Guia de city break en ${name.es}`,
    },
    description: {
      en: `Planning more than the hotel? Perfect City Break has the ${name.en} itinerary: top sights, walking routes and where to eat.`,
      fr: `Vous planifiez plus que l'hotel ? Perfect City Break propose l'itineraire a ${name.fr} : sites incontournables, balades et bonnes adresses.`,
      es: `¿Planeas mas que el hotel? Perfect City Break tiene el itinerario de ${name.es}: imprescindibles, rutas a pie y donde comer.`,
    },
  }
  ;(CROSS_SITE_LINKS[slug] ??= []).push(entry)
}
