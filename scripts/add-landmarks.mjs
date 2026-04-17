/**
 * Adds curated landmarks to each destination in destinations.json.
 * Each landmark has: name, nameFr, nameEs, lat, lng, type (park/monument/station/beach/center)
 * These are hand-curated key pet-relevant points of interest per city.
 *
 * Usage: node scripts/add-landmarks.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// Curated landmarks: 3-5 per city, mix of parks (dog-relevant), stations (arrival), famous monuments
const LANDMARKS = {
  amsterdam: [
    { name: 'Vondelpark', nameFr: 'Vondelpark', nameEs: 'Vondelpark', lat: 52.3580, lng: 4.8686, type: 'park' },
    { name: 'Amsterdam Centraal', nameFr: 'Gare Centrale', nameEs: 'Estación Central', lat: 52.3791, lng: 4.9003, type: 'station' },
    { name: 'Rijksmuseum', nameFr: 'Rijksmuseum', nameEs: 'Rijksmuseum', lat: 52.3600, lng: 4.8852, type: 'monument' },
    { name: 'Jordaan', nameFr: 'Jordaan', nameEs: 'Jordaan', lat: 52.3742, lng: 4.8827, type: 'neighborhood' },
  ],
  paris: [
    { name: 'Eiffel Tower', nameFr: 'Tour Eiffel', nameEs: 'Torre Eiffel', lat: 48.8584, lng: 2.2945, type: 'monument' },
    { name: 'Champs-Élysées', nameFr: 'Champs-Élysées', nameEs: 'Campos Elíseos', lat: 48.8698, lng: 2.3078, type: 'center' },
    { name: 'Bois de Boulogne', nameFr: 'Bois de Boulogne', nameEs: 'Bosque de Bolonia', lat: 48.8637, lng: 2.2461, type: 'park' },
    { name: 'Gare du Nord', nameFr: 'Gare du Nord', nameEs: 'Estación del Norte', lat: 48.8809, lng: 2.3553, type: 'station' },
    { name: 'Le Marais', nameFr: 'Le Marais', nameEs: 'Le Marais', lat: 48.8571, lng: 2.3551, type: 'neighborhood' },
  ],
  barcelona: [
    { name: 'La Sagrada Família', nameFr: 'Sagrada Família', nameEs: 'Sagrada Família', lat: 41.4036, lng: 2.1744, type: 'monument' },
    { name: 'Park Güell', nameFr: 'Parc Güell', nameEs: 'Parque Güell', lat: 41.4145, lng: 2.1527, type: 'park' },
    { name: 'Barcelona Sants Station', nameFr: 'Gare de Barcelone-Sants', nameEs: 'Estación Barcelona Sants', lat: 41.3793, lng: 2.1401, type: 'station' },
    { name: 'Las Ramblas', nameFr: 'Las Ramblas', nameEs: 'Las Ramblas', lat: 41.3797, lng: 2.1730, type: 'center' },
    { name: 'Barceloneta Beach', nameFr: 'Plage de la Barceloneta', nameEs: 'Playa de la Barceloneta', lat: 41.3785, lng: 2.1925, type: 'beach' },
  ],
  berlin: [
    { name: 'Brandenburg Gate', nameFr: 'Porte de Brandebourg', nameEs: 'Puerta de Brandenburgo', lat: 52.5163, lng: 13.3777, type: 'monument' },
    { name: 'Tiergarten', nameFr: 'Tiergarten', nameEs: 'Tiergarten', lat: 52.5145, lng: 13.3501, type: 'park' },
    { name: 'Berlin Hauptbahnhof', nameFr: 'Gare Centrale de Berlin', nameEs: 'Estación Central de Berlín', lat: 52.5251, lng: 13.3694, type: 'station' },
    { name: 'Prenzlauer Berg', nameFr: 'Prenzlauer Berg', nameEs: 'Prenzlauer Berg', lat: 52.5396, lng: 13.4148, type: 'neighborhood' },
  ],
  lisbon: [
    { name: 'Alfama', nameFr: 'Alfama', nameEs: 'Alfama', lat: 38.7140, lng: -9.1320, type: 'neighborhood' },
    { name: 'Belém Tower', nameFr: 'Tour de Belém', nameEs: 'Torre de Belém', lat: 38.6916, lng: -9.2160, type: 'monument' },
    { name: 'Parque Eduardo VII', nameFr: 'Parc Édouard VII', nameEs: 'Parque Eduardo VII', lat: 38.7267, lng: -9.1517, type: 'park' },
    { name: 'Lisboa Oriente Station', nameFr: 'Gare Lisboa Oriente', nameEs: 'Estación Lisboa Oriente', lat: 38.7677, lng: -9.0989, type: 'station' },
  ],
  rome: [
    { name: 'Colosseum', nameFr: 'Colisée', nameEs: 'Coliseo', lat: 41.8902, lng: 12.4922, type: 'monument' },
    { name: 'Villa Borghese Gardens', nameFr: 'Jardins de la Villa Borghèse', nameEs: 'Jardines de la Villa Borghese', lat: 41.9139, lng: 12.4912, type: 'park' },
    { name: 'Roma Termini', nameFr: 'Gare de Roma Termini', nameEs: 'Estación Roma Termini', lat: 41.9009, lng: 12.5009, type: 'station' },
    { name: 'Trastevere', nameFr: 'Trastevere', nameEs: 'Trastevere', lat: 41.8869, lng: 12.4699, type: 'neighborhood' },
  ],
  madrid: [
    { name: 'Retiro Park', nameFr: 'Parc du Retiro', nameEs: 'Parque del Retiro', lat: 40.4153, lng: -3.6843, type: 'park' },
    { name: 'Puerta del Sol', nameFr: 'Puerta del Sol', nameEs: 'Puerta del Sol', lat: 40.4168, lng: -3.7038, type: 'center' },
    { name: 'Madrid Atocha', nameFr: 'Gare de Madrid Atocha', nameEs: 'Estación Madrid Atocha', lat: 40.4069, lng: -3.6891, type: 'station' },
    { name: 'Prado Museum', nameFr: 'Musée du Prado', nameEs: 'Museo del Prado', lat: 40.4138, lng: -3.6922, type: 'monument' },
  ],
  prague: [
    { name: 'Old Town Square', nameFr: 'Place de la Vieille Ville', nameEs: 'Plaza de la Ciudad Vieja', lat: 50.0875, lng: 14.4213, type: 'center' },
    { name: 'Prague Castle', nameFr: 'Château de Prague', nameEs: 'Castillo de Praga', lat: 50.0904, lng: 14.4015, type: 'monument' },
    { name: 'Stromovka Park', nameFr: 'Parc Stromovka', nameEs: 'Parque Stromovka', lat: 50.1010, lng: 14.4215, type: 'park' },
    { name: 'Praha hlavní nádraží', nameFr: 'Gare Centrale de Prague', nameEs: 'Estación Central de Praga', lat: 50.0831, lng: 14.4346, type: 'station' },
  ],
  vienna: [
    { name: 'Schönbrunn Palace', nameFr: 'Palais de Schönbrunn', nameEs: 'Palacio de Schönbrunn', lat: 48.1845, lng: 16.3122, type: 'monument' },
    { name: 'Prater Park', nameFr: 'Parc du Prater', nameEs: 'Parque del Prater', lat: 48.2135, lng: 16.3962, type: 'park' },
    { name: 'Wien Hauptbahnhof', nameFr: 'Gare Centrale de Vienne', nameEs: 'Estación Central de Viena', lat: 48.1851, lng: 16.3762, type: 'station' },
    { name: 'Stephansdom', nameFr: 'Cathédrale Saint-Étienne', nameEs: 'Catedral de San Esteban', lat: 48.2086, lng: 16.3728, type: 'monument' },
  ],
  zurich: [
    { name: 'Lake Zurich', nameFr: 'Lac de Zurich', nameEs: 'Lago de Zúrich', lat: 47.3569, lng: 8.5417, type: 'park' },
    { name: 'Zurich HB (Main Station)', nameFr: 'Gare Centrale de Zurich', nameEs: 'Estación Central de Zúrich', lat: 47.3778, lng: 8.5400, type: 'station' },
    { name: 'Old Town (Altstadt)', nameFr: 'Vieille Ville', nameEs: 'Ciudad Antigua', lat: 47.3726, lng: 8.5426, type: 'center' },
    { name: 'Uetliberg Forest', nameFr: 'Forêt de l\'Uetliberg', nameEs: 'Bosque de Uetliberg', lat: 47.3528, lng: 8.4915, type: 'park' },
  ],
  london: [
    { name: 'Hyde Park', nameFr: 'Hyde Park', nameEs: 'Hyde Park', lat: 51.5073, lng: -0.1657, type: 'park' },
    { name: 'Tower of London', nameFr: 'Tour de Londres', nameEs: 'Torre de Londres', lat: 51.5081, lng: -0.0759, type: 'monument' },
    { name: 'London St Pancras', nameFr: 'Gare de St Pancras', nameEs: 'Estación St Pancras', lat: 51.5309, lng: -0.1233, type: 'station' },
    { name: 'Notting Hill', nameFr: 'Notting Hill', nameEs: 'Notting Hill', lat: 51.5139, lng: -0.2012, type: 'neighborhood' },
  ],
  florence: [
    { name: 'Piazzale Michelangelo', nameFr: 'Piazzale Michel-Ange', nameEs: 'Piazzale Michelangelo', lat: 43.7629, lng: 11.2650, type: 'monument' },
    { name: 'Boboli Gardens', nameFr: 'Jardins de Boboli', nameEs: 'Jardines de Bóboli', lat: 43.7629, lng: 11.2481, type: 'park' },
    { name: 'Santa Maria Novella Station', nameFr: 'Gare Santa Maria Novella', nameEs: 'Estación Santa María Novella', lat: 43.7764, lng: 11.2482, type: 'station' },
    { name: 'Piazza del Duomo', nameFr: 'Piazza del Duomo', nameEs: 'Piazza del Duomo', lat: 43.7731, lng: 11.2560, type: 'center' },
  ],
  milan: [
    { name: 'Milan Cathedral', nameFr: 'Cathédrale de Milan', nameEs: 'Catedral de Milán', lat: 45.4641, lng: 9.1919, type: 'monument' },
    { name: 'Parco Sempione', nameFr: 'Parc Sempione', nameEs: 'Parque Sempione', lat: 45.4724, lng: 9.1723, type: 'park' },
    { name: 'Milano Centrale', nameFr: 'Gare Milano Centrale', nameEs: 'Estación Milano Centrale', lat: 45.4862, lng: 9.2045, type: 'station' },
    { name: 'Navigli District', nameFr: 'Quartier des Navigli', nameEs: 'Barrio de los Navigli', lat: 45.4504, lng: 9.1735, type: 'neighborhood' },
  ],
  edinburgh: [
    { name: 'Edinburgh Castle', nameFr: 'Château d\'Édimbourg', nameEs: 'Castillo de Edimburgo', lat: 55.9486, lng: -3.1999, type: 'monument' },
    { name: 'Holyrood Park', nameFr: 'Parc de Holyrood', nameEs: 'Parque de Holyrood', lat: 55.9444, lng: -3.1643, type: 'park' },
    { name: 'Edinburgh Waverley Station', nameFr: 'Gare de Waverley', nameEs: 'Estación Waverley', lat: 55.9521, lng: -3.1897, type: 'station' },
    { name: 'Royal Mile', nameFr: 'Royal Mile', nameEs: 'Royal Mile', lat: 55.9496, lng: -3.1887, type: 'center' },
  ],
  copenhagen: [
    { name: 'Tivoli Gardens', nameFr: 'Jardins de Tivoli', nameEs: 'Jardines de Tivoli', lat: 55.6736, lng: 12.5683, type: 'park' },
    { name: 'Nyhavn', nameFr: 'Nyhavn', nameEs: 'Nyhavn', lat: 55.6800, lng: 12.5930, type: 'center' },
    { name: 'Copenhagen Central Station', nameFr: 'Gare Centrale de Copenhague', nameEs: 'Estación Central de Copenhague', lat: 55.6726, lng: 12.5655, type: 'station' },
    { name: 'Frederiksberg Gardens', nameFr: 'Jardins de Frederiksberg', nameEs: 'Jardines de Frederiksberg', lat: 55.6782, lng: 12.5245, type: 'park' },
  ],
  athens: [
    { name: 'Acropolis', nameFr: 'Acropole', nameEs: 'Acrópolis', lat: 37.9715, lng: 23.7267, type: 'monument' },
    { name: 'National Garden', nameFr: 'Jardin National', nameEs: 'Jardín Nacional', lat: 37.9736, lng: 23.7376, type: 'park' },
    { name: 'Athens Larissa Station', nameFr: 'Gare de Larissa', nameEs: 'Estación de Larissa', lat: 37.9934, lng: 23.7213, type: 'station' },
    { name: 'Monastiraki', nameFr: 'Monastiraki', nameEs: 'Monastiraki', lat: 37.9759, lng: 23.7242, type: 'center' },
  ],
  budapest: [
    { name: 'Buda Castle', nameFr: 'Château de Buda', nameEs: 'Castillo de Buda', lat: 47.4960, lng: 19.0398, type: 'monument' },
    { name: 'Margaret Island', nameFr: 'Île Marguerite', nameEs: 'Isla Margarita', lat: 47.5298, lng: 19.0482, type: 'park' },
    { name: 'Budapest Keleti Station', nameFr: 'Gare de Keleti', nameEs: 'Estación Keleti', lat: 47.5003, lng: 19.0838, type: 'station' },
    { name: 'Váci Street', nameFr: 'Rue Váci', nameEs: 'Calle Váci', lat: 47.4963, lng: 19.0534, type: 'center' },
  ],
  porto: [
    { name: 'Dom Luís I Bridge', nameFr: 'Pont Dom Luís I', nameEs: 'Puente Dom Luís I', lat: 41.1399, lng: -8.6093, type: 'monument' },
    { name: 'Jardins do Palácio de Cristal', nameFr: 'Jardins du Palais de Cristal', nameEs: 'Jardines del Palacio de Cristal', lat: 41.1493, lng: -8.6259, type: 'park' },
    { name: 'Porto São Bento Station', nameFr: 'Gare de São Bento', nameEs: 'Estación São Bento', lat: 41.1458, lng: -8.6107, type: 'station' },
    { name: 'Ribeira', nameFr: 'Ribeira', nameEs: 'Ribeira', lat: 41.1409, lng: -8.6153, type: 'center' },
  ],
  brussels: [
    { name: 'Grand Place', nameFr: 'Grand-Place', nameEs: 'Grand Place', lat: 50.8467, lng: 4.3525, type: 'center' },
    { name: 'Bois de la Cambre', nameFr: 'Bois de la Cambre', nameEs: 'Bosque de la Cambre', lat: 50.8169, lng: 4.3784, type: 'park' },
    { name: 'Brussels-Midi Station', nameFr: 'Gare du Midi', nameEs: 'Estación Bruselas-Midi', lat: 50.8354, lng: 4.3363, type: 'station' },
    { name: 'Ixelles / Elsene', nameFr: 'Ixelles', nameEs: 'Ixelles', lat: 50.8319, lng: 4.3722, type: 'neighborhood' },
  ],
  oslo: [
    { name: 'Vigeland Park', nameFr: 'Parc Vigeland', nameEs: 'Parque Vigeland', lat: 59.9271, lng: 10.6999, type: 'park' },
    { name: 'Oslo Opera House', nameFr: 'Opéra d\'Oslo', nameEs: 'Ópera de Oslo', lat: 59.9074, lng: 10.7528, type: 'monument' },
    { name: 'Oslo S (Central Station)', nameFr: 'Gare Centrale d\'Oslo', nameEs: 'Estación Central de Oslo', lat: 59.9110, lng: 10.7528, type: 'station' },
    { name: 'Aker Brygge', nameFr: 'Aker Brygge', nameEs: 'Aker Brygge', lat: 59.9102, lng: 10.7250, type: 'center' },
  ],
  stockholm: [
    { name: 'Gamla Stan (Old Town)', nameFr: 'Gamla Stan (Vieille Ville)', nameEs: 'Gamla Stan (Ciudad Antigua)', lat: 59.3226, lng: 18.0714, type: 'center' },
    { name: 'Djurgården', nameFr: 'Djurgården', nameEs: 'Djurgården', lat: 59.3271, lng: 18.1063, type: 'park' },
    { name: 'Stockholm Central Station', nameFr: 'Gare Centrale de Stockholm', nameEs: 'Estación Central de Estocolmo', lat: 59.3307, lng: 18.0583, type: 'station' },
    { name: 'Södermalm', nameFr: 'Södermalm', nameEs: 'Södermalm', lat: 59.3146, lng: 18.0710, type: 'neighborhood' },
  ],
  warsaw: [
    { name: 'Royal Castle', nameFr: 'Château Royal', nameEs: 'Castillo Real', lat: 52.2479, lng: 21.0138, type: 'monument' },
    { name: 'Łazienki Park', nameFr: 'Parc Łazienki', nameEs: 'Parque Łazienki', lat: 52.2153, lng: 21.0363, type: 'park' },
    { name: 'Warsaw Central Station', nameFr: 'Gare Centrale de Varsovie', nameEs: 'Estación Central de Varsovia', lat: 52.2286, lng: 21.0031, type: 'station' },
    { name: 'Old Town Market Square', nameFr: 'Place du Marché de la Vieille Ville', nameEs: 'Plaza del Mercado de la Ciudad Vieja', lat: 52.2499, lng: 21.0120, type: 'center' },
  ],
  krakow: [
    { name: 'Main Market Square', nameFr: 'Grande Place du Marché', nameEs: 'Plaza del Mercado Principal', lat: 50.0617, lng: 19.9373, type: 'center' },
    { name: 'Planty Park', nameFr: 'Parc Planty', nameEs: 'Parque Planty', lat: 50.0616, lng: 19.9370, type: 'park' },
    { name: 'Wawel Castle', nameFr: 'Château du Wawel', nameEs: 'Castillo de Wawel', lat: 50.0541, lng: 19.9355, type: 'monument' },
    { name: 'Kraków Główny Station', nameFr: 'Gare Centrale de Cracovie', nameEs: 'Estación Central de Cracovia', lat: 50.0674, lng: 19.9474, type: 'station' },
  ],
  dublin: [
    { name: 'Phoenix Park', nameFr: 'Parc Phoenix', nameEs: 'Parque Phoenix', lat: 53.3601, lng: -6.3296, type: 'park' },
    { name: 'Trinity College Dublin', nameFr: 'Trinity College Dublin', nameEs: 'Trinity College Dublín', lat: 53.3438, lng: -6.2546, type: 'monument' },
    { name: 'Heuston Station', nameFr: 'Gare de Heuston', nameEs: 'Estación Heuston', lat: 53.3469, lng: -6.2946, type: 'station' },
    { name: 'Temple Bar', nameFr: 'Temple Bar', nameEs: 'Temple Bar', lat: 53.3454, lng: -6.2636, type: 'neighborhood' },
  ],
  amsterdam: [
    { name: 'Vondelpark', nameFr: 'Vondelpark', nameEs: 'Vondelpark', lat: 52.3580, lng: 4.8686, type: 'park' },
    { name: 'Amsterdam Centraal', nameFr: 'Gare Centrale', nameEs: 'Estación Central', lat: 52.3791, lng: 4.9003, type: 'station' },
    { name: 'Rijksmuseum', nameFr: 'Rijksmuseum', nameEs: 'Rijksmuseum', lat: 52.3600, lng: 4.8852, type: 'monument' },
    { name: 'Jordaan', nameFr: 'Jordaan', nameEs: 'Jordaan', lat: 52.3742, lng: 4.8827, type: 'neighborhood' },
  ],
  biarritz: [
    { name: 'Grande Plage', nameFr: 'Grande Plage', nameEs: 'Playa Grande', lat: 43.4937, lng: -1.5576, type: 'beach' },
    { name: 'Rocher de la Vierge', nameFr: 'Rocher de la Vierge', nameEs: 'Roca de la Virgen', lat: 43.4894, lng: -1.5604, type: 'monument' },
    { name: 'Biarritz Station', nameFr: 'Gare de Biarritz', nameEs: 'Estación de Biarritz', lat: 43.4841, lng: -1.5591, type: 'station' },
    { name: 'Côte des Basques Beach', nameFr: 'Plage de la Côte des Basques', nameEs: 'Playa de la Côte des Basques', lat: 43.4845, lng: -1.5639, type: 'beach' },
  ],
  nice: [
    { name: 'Promenade des Anglais', nameFr: 'Promenade des Anglais', nameEs: 'Paseo de los Ingleses', lat: 43.6956, lng: 7.2672, type: 'beach' },
    { name: 'Colline du Château', nameFr: 'Colline du Château', nameEs: 'Colina del Castillo', lat: 43.6937, lng: 7.2811, type: 'park' },
    { name: 'Nice-Ville Station', nameFr: 'Gare de Nice-Ville', nameEs: 'Estación Nice-Ville', lat: 43.7047, lng: 7.2617, type: 'station' },
    { name: 'Vieux-Nice', nameFr: 'Vieux-Nice', nameEs: 'Niza Vieja', lat: 43.6964, lng: 7.2770, type: 'center' },
  ],
  lyon: [
    { name: 'Vieux Lyon', nameFr: 'Vieux Lyon', nameEs: 'Lyon Antiguo', lat: 45.7600, lng: 4.8267, type: 'center' },
    { name: 'Parc de la Tête d\'Or', nameFr: 'Parc de la Tête d\'Or', nameEs: 'Parque de la Tête d\'Or', lat: 45.7785, lng: 4.8521, type: 'park' },
    { name: 'Lyon Part-Dieu Station', nameFr: 'Gare de Lyon Part-Dieu', nameEs: 'Estación Lyon Part-Dieu', lat: 45.7607, lng: 4.8600, type: 'station' },
    { name: 'Basilique Notre-Dame de Fourvière', nameFr: 'Basilique Notre-Dame de Fourvière', nameEs: 'Basílica Notre-Dame de Fourvière', lat: 45.7621, lng: 4.8222, type: 'monument' },
  ],
  marseille: [
    { name: 'Vieux-Port', nameFr: 'Vieux-Port', nameEs: 'Puerto Viejo', lat: 43.2951, lng: 5.3744, type: 'center' },
    { name: 'Calanques National Park', nameFr: 'Parc National des Calanques', nameEs: 'Parque Nacional de Calanques', lat: 43.2145, lng: 5.4389, type: 'park' },
    { name: 'Marseille Saint-Charles', nameFr: 'Gare Saint-Charles', nameEs: 'Estación Saint-Charles', lat: 43.3028, lng: 5.3809, type: 'station' },
    { name: 'Notre-Dame de la Garde', nameFr: 'Notre-Dame de la Garde', nameEs: 'Notre-Dame de la Garde', lat: 43.2843, lng: 5.3712, type: 'monument' },
  ],
  seville: [
    { name: 'Real Alcázar', nameFr: 'Alcázar Royal', nameEs: 'Real Alcázar', lat: 37.3836, lng: -5.9921, type: 'monument' },
    { name: 'Parque de María Luisa', nameFr: 'Parc de María Luisa', nameEs: 'Parque de María Luisa', lat: 37.3788, lng: -5.9883, type: 'park' },
    { name: 'Sevilla Santa Justa', nameFr: 'Gare de Santa Justa', nameEs: 'Estación Santa Justa', lat: 37.3921, lng: -5.9758, type: 'station' },
    { name: 'Plaza de España', nameFr: 'Plaza de España', nameEs: 'Plaza de España', lat: 37.3773, lng: -5.9869, type: 'center' },
  ],
  valencia: [
    { name: 'City of Arts and Sciences', nameFr: 'Cité des Arts et des Sciences', nameEs: 'Ciudad de las Artes y las Ciencias', lat: 39.4536, lng: -0.3505, type: 'monument' },
    { name: 'Turia Gardens', nameFr: 'Jardins du Turia', nameEs: 'Jardín del Turia', lat: 39.4739, lng: -0.3730, type: 'park' },
    { name: 'Valencia Nord Station', nameFr: 'Gare de Valencia Nord', nameEs: 'Estación Valencia Nord', lat: 39.4692, lng: -0.3765, type: 'station' },
    { name: 'Malvarrosa Beach', nameFr: 'Plage de Malvarrosa', nameEs: 'Playa de la Malvarrosa', lat: 39.4808, lng: -0.3235, type: 'beach' },
  ],
  milan: [
    { name: 'Milan Cathedral (Duomo)', nameFr: 'Cathédrale de Milan (Duomo)', nameEs: 'Catedral de Milán (Duomo)', lat: 45.4641, lng: 9.1919, type: 'monument' },
    { name: 'Parco Sempione', nameFr: 'Parc Sempione', nameEs: 'Parque Sempione', lat: 45.4724, lng: 9.1723, type: 'park' },
    { name: 'Milano Centrale', nameFr: 'Gare de Milan Centrale', nameEs: 'Estación de Milán Central', lat: 45.4862, lng: 9.2045, type: 'station' },
    { name: 'Navigli District', nameFr: 'Quartier des Navigli', nameEs: 'Barrio de los Navigli', lat: 45.4504, lng: 9.1735, type: 'neighborhood' },
  ],
  venice: [
    { name: 'Piazza San Marco', nameFr: 'Place Saint-Marc', nameEs: 'Plaza de San Marcos', lat: 45.4343, lng: 12.3388, type: 'center' },
    { name: 'Giardini della Biennale', nameFr: 'Jardins de la Biennale', nameEs: 'Jardines de la Biennale', lat: 45.4292, lng: 12.3619, type: 'park' },
    { name: 'Venice Santa Lucia', nameFr: 'Gare de Venise Santa Lucia', nameEs: 'Estación Venecia Santa Lucía', lat: 45.4414, lng: 12.3213, type: 'station' },
    { name: 'Rialto Bridge', nameFr: 'Pont du Rialto', nameEs: 'Puente de Rialto', lat: 45.4379, lng: 12.3358, type: 'monument' },
  ],
  split: [
    { name: 'Diocletian\'s Palace', nameFr: 'Palais de Dioclétien', nameEs: 'Palacio de Diocleciano', lat: 43.5081, lng: 16.4402, type: 'monument' },
    { name: 'Marjan Hill Park', nameFr: 'Parc de la Colline Marjan', nameEs: 'Parque de la Colina Marjan', lat: 43.5125, lng: 16.4177, type: 'park' },
    { name: 'Split Ferry Port', nameFr: 'Port de Ferries de Split', nameEs: 'Puerto de Ferries de Split', lat: 43.5061, lng: 16.4394, type: 'station' },
    { name: 'Split Promenade (Riva)', nameFr: 'Promenade de Split (Riva)', nameEs: 'Paseo de Split (Riva)', lat: 43.5074, lng: 16.4404, type: 'beach' },
  ],
  dubrovnik: [
    { name: 'Old City Walls', nameFr: 'Remparts de la Vieille Ville', nameEs: 'Murallas de la Ciudad Vieja', lat: 42.6407, lng: 18.1077, type: 'monument' },
    { name: 'Gradac Park', nameFr: 'Parc Gradac', nameEs: 'Parque Gradac', lat: 42.6497, lng: 18.0969, type: 'park' },
    { name: 'Dubrovnik Bus Station', nameFr: 'Gare Routière de Dubrovnik', nameEs: 'Estación de Autobuses de Dubrovnik', lat: 42.6490, lng: 18.1062, type: 'station' },
    { name: 'Stradun (Placa)', nameFr: 'Stradun', nameEs: 'Stradun', lat: 42.6409, lng: 18.1077, type: 'center' },
  ],
  salzburg: [
    { name: 'Hohensalzburg Fortress', nameFr: 'Forteresse de Hohensalzburg', nameEs: 'Fortaleza Hohensalzburg', lat: 47.7949, lng: 13.0472, type: 'monument' },
    { name: 'Mirabell Gardens', nameFr: 'Jardins de Mirabell', nameEs: 'Jardines de Mirabell', lat: 47.8059, lng: 13.0407, type: 'park' },
    { name: 'Salzburg Hauptbahnhof', nameFr: 'Gare Centrale de Salzbourg', nameEs: 'Estación Central de Salzburgo', lat: 47.8132, lng: 13.0455, type: 'station' },
    { name: 'Getreidegasse', nameFr: 'Getreidegasse', nameEs: 'Getreidegasse', lat: 47.7995, lng: 13.0449, type: 'center' },
  ],
  helsinki: [
    { name: 'Helsinki Cathedral', nameFr: 'Cathédrale d\'Helsinki', nameEs: 'Catedral de Helsinki', lat: 60.1699, lng: 24.9521, type: 'monument' },
    { name: 'Central Park (Keskuspuisto)', nameFr: 'Parc Central', nameEs: 'Parque Central (Keskuspuisto)', lat: 60.2268, lng: 24.9253, type: 'park' },
    { name: 'Helsinki Central Station', nameFr: 'Gare Centrale d\'Helsinki', nameEs: 'Estación Central de Helsinki', lat: 60.1719, lng: 24.9414, type: 'station' },
    { name: 'Market Square', nameFr: 'Place du Marché', nameEs: 'Plaza del Mercado', lat: 60.1675, lng: 24.9522, type: 'center' },
  ],
  reykjavik: [
    { name: 'Hallgrímskirkja', nameFr: 'Hallgrímskirkja', nameEs: 'Hallgrímskirkja', lat: 64.1416, lng: -21.9264, type: 'monument' },
    { name: 'Laugardalur Park', nameFr: 'Parc de Laugardalur', nameEs: 'Parque de Laugardalur', lat: 64.1412, lng: -21.8820, type: 'park' },
    { name: 'BSÍ Bus Terminal', nameFr: 'Terminal de Bus BSÍ', nameEs: 'Terminal de Autobuses BSÍ', lat: 64.1401, lng: -21.9239, type: 'station' },
    { name: 'Old Harbour', nameFr: 'Vieux Port', nameEs: 'Puerto Viejo', lat: 64.1528, lng: -21.9466, type: 'center' },
  ],
  zagreb: [
    { name: 'Zagreb Cathedral', nameFr: 'Cathédrale de Zagreb', nameEs: 'Catedral de Zagreb', lat: 45.8143, lng: 15.9779, type: 'monument' },
    { name: 'Maksimir Park', nameFr: 'Parc Maksimir', nameEs: 'Parque Maksimir', lat: 45.8234, lng: 16.0195, type: 'park' },
    { name: 'Zagreb Central Station', nameFr: 'Gare Centrale de Zagreb', nameEs: 'Estación Central de Zagreb', lat: 45.8040, lng: 15.9773, type: 'station' },
    { name: 'Ban Jelačić Square', nameFr: 'Place Ban Jelačić', nameEs: 'Plaza Ban Jelačić', lat: 45.8131, lng: 15.9778, type: 'center' },
  ],
  brussels: [
    { name: 'Grand Place', nameFr: 'Grand-Place', nameEs: 'Grand Place', lat: 50.8467, lng: 4.3525, type: 'center' },
    { name: 'Bois de la Cambre', nameFr: 'Bois de la Cambre', nameEs: 'Bosque de la Cambre', lat: 50.8169, lng: 4.3784, type: 'park' },
    { name: 'Brussels-Midi Station', nameFr: 'Gare du Midi', nameEs: 'Estación Bruselas-Midi', lat: 50.8354, lng: 4.3363, type: 'station' },
    { name: 'Ixelles / Elsene', nameFr: 'Ixelles', nameEs: 'Ixelles', lat: 50.8319, lng: 4.3722, type: 'neighborhood' },
  ],
  ghent: [
    { name: 'Ghent Altarpiece (St Bavo\'s)', nameFr: 'Retable de Gand (St-Bavon)', nameEs: 'Retablo de Gante (San Bavón)', lat: 51.0536, lng: 3.7191, type: 'monument' },
    { name: 'Citadelpark', nameFr: 'Citadelpark', nameEs: 'Citadelpark', lat: 51.0369, lng: 3.7240, type: 'park' },
    { name: 'Gent-Sint-Pieters Station', nameFr: 'Gare de Gand-Saint-Pierre', nameEs: 'Estación Gante Sint-Pieters', lat: 51.0358, lng: 3.7105, type: 'station' },
    { name: 'Graslei & Korenlei', nameFr: 'Graslei & Korenlei', nameEs: 'Graslei & Korenlei', lat: 51.0533, lng: 3.7217, type: 'center' },
  ],
  bruges: [
    { name: 'Market Square (Markt)', nameFr: 'Grand-Place (Markt)', nameEs: 'Plaza del Mercado (Markt)', lat: 51.2086, lng: 3.2246, type: 'center' },
    { name: 'Minnewater Park', nameFr: 'Parc du Minnewater', nameEs: 'Parque Minnewater', lat: 51.1991, lng: 3.2192, type: 'park' },
    { name: 'Bruges Station', nameFr: 'Gare de Bruges', nameEs: 'Estación de Brujas', lat: 51.1974, lng: 3.2163, type: 'station' },
    { name: 'Belfry of Bruges', nameFr: 'Beffroi de Bruges', nameEs: 'Campanario de Brujas', lat: 51.2083, lng: 3.2241, type: 'monument' },
  ],
}

async function main() {
  const destsPath = join(ROOT, 'data/destinations.json')
  const dests = JSON.parse(readFileSync(destsPath, 'utf-8'))

  let updated = 0
  let missing = []

  for (const dest of dests) {
    const lm = LANDMARKS[dest.slug]
    if (lm) {
      dest.landmarks = lm
      updated++
    } else {
      missing.push(dest.slug)
    }
  }

  writeFileSync(destsPath, JSON.stringify(dests, null, 2))

  console.log(`✓ Landmarks added to ${updated} destinations`)
  if (missing.length > 0) {
    console.log(`⚠ Missing landmarks for: ${missing.join(', ')}`)
  }
}

main().catch(console.error)
