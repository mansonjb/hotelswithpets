import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezLink, buildAllezDestLink, buildStay22MapSrc } from '@/lib/site'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'provence-chien'
const CAMPAIGN_BASE = 'provence-itinerary'

// Map centered between Avignon, Arles, Aix-en-Provence and Marseille.
const MAP_LAT = 43.65
const MAP_LNG = 4.95

const STICKY_LABELS: Record<string, { label: string; cta: string }> = {
  en: { label: 'Provence dog-friendly road trip hotels', cta: 'See hotels' },
  fr: { label: `Hôtels du road trip en Provence avec chien`, cta: 'Voir les hôtels' },
  es: { label: 'Hoteles del road trip por Provenza con perro', cta: 'Ver hoteles' },
  pt: { label: 'Hotéis do road trip pela Provença com cão', cta: 'Ver hotéis' },
  de: { label: 'Hotels für den Provence-Roadtrip mit Hund', cta: 'Hotels ansehen' },
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
    en: `5-Day Pet-Friendly Provence Road Trip: Avignon, Arles, Aix-en-Provence & Marseille (2026)`,
    fr: `Road trip en Provence avec son chien en 5 jours : Avignon, Arles, Aix-en-Provence et Marseille (2026)`,
    es: `Road trip pet-friendly por Provenza en 5 días: Aviñón, Arlés, Aix-en-Provence y Marsella (2026)`,
    pt: `Road trip pet-friendly pela Provença em 5 dias: Avinhão, Arles, Aix-en-Provence e Marselha (2026)`,
    de: `Hundefreundlicher 5-Tage-Roadtrip durch die Provence: Avignon, Arles, Aix-en-Provence & Marseille (2026)`,
  }

  const descriptions: Record<string, string> = {
    en: `A 5-day pet-friendly road trip through Provence: Avignon's Palais des Papes, Arles' Roman arena and Camargue, Aix-en-Provence's Sainte-Victoire, Marseille's Calanques. Map, day-by-day itinerary, verified pet-friendly hotels.`,
    fr: `Un road trip de 5 jours en Provence avec son chien : Avignon et le Palais des Papes, Arles et son arène romaine et la Camargue, Aix-en-Provence et la Sainte-Victoire, Marseille et les Calanques. Carte, itinéraire jour par jour, hôtels pet-friendly vérifiés.`,
    es: `Un road trip de 5 días por Provenza con perro: Aviñón y el Palacio de los Papas, Arlés y su arena romana y la Camarga, Aix-en-Provence y la Sainte-Victoire, Marsella y las Calanques. Mapa, itinerario día a día, hoteles pet-friendly verificados.`,
    pt: `Um road trip de 5 dias pela Provença com cão: Avinhão e o Palácio dos Papas, Arles e a sua arena romana e a Camarga, Aix-en-Provence e a Sainte-Victoire, Marselha e as Calanques. Mapa, itinerário dia a dia, hotéis pet-friendly verificados.`,
    de: `Ein hundefreundlicher 5-Tage-Roadtrip durch die Provence: Avignons Papstpalast, Arles' römische Arena und die Camargue, Aix-en-Provence mit der Sainte-Victoire, Marseilles Calanques. Karte, Tag-für-Tag-Reiseplan, geprüfte haustierfreundliche Hotels.`,
  }

  const today = new Date().toISOString().split('T')[0]

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/${SLUG}`,
      languages: {
        en: `${SITE_URL}/en/guides/${SLUG}`,
        fr: `${SITE_URL}/fr/guides/${SLUG}`,
        es: `${SITE_URL}/es/guides/${SLUG}`,
        pt: `${SITE_URL}/pt/guides/${SLUG}`,
        de: `${SITE_URL}/de/guides/${SLUG}`,
        'x-default': `${SITE_URL}/en/guides/${SLUG}`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      type: 'article',
      url: `${SITE_URL}/${locale}/guides/${SLUG}`,
      siteName: 'HotelsWithPets.com',
    },
    other: {
      'article:published_time': '2026-05-31',
      'article:modified_time': today,
    },
  }
}

type Stop = {
  slug: string
  name: string
  nights: number
  drive: { fr: string; en: string; es: string; pt: string; de: string }
  whyEn: string
  whyFr: string
  whyEs: string
  whyPt: string
  whyDe: string
  highlightsEn: string[]
  highlightsFr: string[]
  highlightsEs: string[]
  highlightsPt: string[]
  highlightsDe: string[]
  hotels: { name: string; pitchEn: string; pitchFr: string; pitchEs: string; pitchPt: string; pitchDe: string }[]
  hasDestPage?: boolean
}

const STOPS: Stop[] = [
  {
    slug: 'avignon',
    name: 'Avignon',
    nights: 1,
    drive: {
      en: `Arrival - TGV from Paris (2h40) drops you 5 min walk from the city walls. By car: A7 exit Avignon Nord, park at Parking des Italiens (free shuttle).`,
      fr: `Arrivée - TGV depuis Paris (2h40) à 5 min à pied des remparts. En voiture : sortie A7 Avignon Nord, Parking des Italiens (navette gratuite).`,
      es: `Llegada - TGV desde París (2h40) a 5 min andando de las murallas. En coche: salida A7 Avignon Nord, Parking des Italiens (lanzadera gratuita).`,
      pt: `Chegada - TGV desde Paris (2h40) a 5 min a pé das muralhas. De carro: saída A7 Avignon Nord, Parking des Italiens (transfer gratuito).`,
      de: `Ankunft - der TGV aus Paris (2h40) hält 5 Gehminuten von der Stadtmauer entfernt. Mit dem Auto: Ausfahrt A7 Avignon Nord, Parkplatz Parking des Italiens (kostenloser Shuttle).`,
    },
    whyEn: `Avignon is the gateway: 14th-century city walls you can circle with a leashed dog (4 km, flat), the Palais des Papes exterior plaza welcomes leashed pets (interior is no but the size of the square works for photos), and the half-bridge of the famous song heads onto the Rhône island where the local off-leash zone hides.`,
    whyFr: `Avignon, c'est la porte d'entrée : remparts médiévaux du XIVᵉ siècle longeables avec son chien en laisse (4 km plats), le parvis du Palais des Papes accueille les chiens (l'intérieur non mais la taille de la place suffit pour les photos), et le demi-pont de la chanson mène à l'île du Rhône où se cache la zone sans laisse locale.`,
    whyEs: `Avignon es la puerta de entrada: murallas medievales del siglo XIV bordeables con perro con correa (4 km llanos), la plaza del Palacio de los Papas admite perros (el interior no pero la plaza basta para fotos), y el medio puente de la canción lleva a la isla del Ródano donde se esconde la zona sin correa local.`,
    whyPt: `Avignon é a porta de entrada: muralhas medievais do século XIV percorríveis com cão à trela (4 km planos), o adro do Palácio dos Papas aceita cães (o interior não mas o tamanho da praça chega para fotos), e a meia-ponte da canção leva à ilha do Ródano onde se esconde a zona sem trela local.`,
    whyDe: `Avignon ist das Eingangstor: eine Stadtmauer aus dem 14. Jahrhundert, die Sie mit angeleintem Hund flach umrunden können (4 km), der Vorplatz des Papstpalasts heißt angeleinte Hunde willkommen (das Innere nicht, aber die Größe des Platzes reicht für Fotos), und die Brückenhälfte des berühmten Liedes führt zur Rhône-Insel, wo sich die örtliche Freilaufzone versteckt.`,
    highlightsEn: [
      `Remparts d'Avignon: 4 km of medieval walls, flat circuit with leashed dog`,
      `Place du Palais des Papes: exterior plaza dog-friendly`,
      `Île de la Barthelasse: largest river island in France, off-leash zones`,
      `Cours Jean-Jaurès terraces: dog-tolerant evening apéro`,
    ],
    highlightsDe: [
      `Stadtmauer von Avignon: 4 km mittelalterliche Mauer, flacher Rundweg mit angeleintem Hund`,
      `Place du Palais des Papes: Vorplatz hundefreundlich`,
      `Île de la Barthelasse: größte Flussinsel Frankreichs, Freilaufzonen`,
      `Terrassen am Cours Jean-Jaurès: hundetolerant für den Abend-Apéro`,
    ],
    highlightsFr: [
      `Remparts d'Avignon : 4 km médiévaux, circuit plat chien en laisse`,
      `Place du Palais des Papes : parvis ouvert aux chiens`,
      `Île de la Barthelasse : plus grande île fluviale de France, zones sans laisse`,
      `Cours Jean-Jaurès : terrasses tolérantes pour l'apéro`,
    ],
    highlightsEs: [
      `Murallas de Aviñón: 4 km medievales, circuito llano con perro con correa`,
      `Plaza del Palacio de los Papas: explanada abierta a perros`,
      `Île de la Barthelasse: mayor isla fluvial de Francia, zonas sin correa`,
      `Cours Jean-Jaurès: terrazas tolerantes para el aperitivo`,
    ],
    highlightsPt: [
      `Muralhas de Avignon: 4 km medievais, circuito plano com cão à trela`,
      `Place du Palais des Papes: adro aberto a cães`,
      `Île de la Barthelasse: maior ilha fluvial de França, zonas sem trela`,
      `Cours Jean-Jaurès: esplanadas tolerantes para o aperitivo`,
    ],
    hotels: [
      {
        name: 'La Mirande',
        pitchEn: `5-star palace tucked behind the Palais des Papes. Pets welcomed in the smaller suites with prior notice, the inner courtyard and walled garden are calm dog territory, breakfast served in a tearoom that allows leashed dogs.`,
        pitchFr: `Palace 5 étoiles caché derrière le Palais des Papes. Chiens acceptés dans les petites suites sur demande préalable, la cour intérieure et le jardin clos sont un terrain calme, petit-déjeuner servi dans un salon qui accepte les chiens en laisse.`,
        pitchEs: `Palacio 5 estrellas escondido tras el Palacio de los Papas. Perros admitidos en suites pequeñas con aviso previo, el patio interior y el jardín tapiado son territorio canino tranquilo, desayuno servido en un salón que admite perros con correa.`,
        pitchPt: `Palace 5 estrelas escondido atrás do Palácio dos Papas. Cães aceites em suítes menores com aviso prévio, o pátio interior e o jardim murado são terreno calmo, pequeno-almoço servido em sala que aceita cães à trela.`,
        pitchDe: `5-Sterne-Palast hinter dem Papstpalast versteckt. Hunde in den kleineren Suiten nach vorheriger Anmeldung willkommen, der Innenhof und der ummauerte Garten sind ruhiges Hundegebiet, Frühstück wird in einem Salon serviert, der angeleinte Hunde zulässt.`,
      },
      {
        name: 'Avignon Grand Hotel',
        pitchEn: `4-star opposite the TGV station with covered private parking. Pets up to 10 kg welcomed at a modest fee, easy 10-min walk into the walled city, indoor pool and quiet rooms above the courtyard.`,
        pitchFr: `4 étoiles face à la gare TGV avec parking privé couvert. Chiens jusqu'à 10 kg acceptés (supplément modeste), 10 min à pied de l'intra-muros, piscine intérieure et chambres calmes sur cour.`,
        pitchEs: `4 estrellas frente a la estación TGV con parking privado cubierto. Perros hasta 10 kg admitidos (suplemento modesto), 10 min andando a la ciudad amurallada, piscina interior y habitaciones tranquilas con patio.`,
        pitchPt: `4 estrelas em frente à estação TGV com parking privado coberto. Cães até 10 kg aceites (taxa modesta), 10 min a pé da cidade muralhada, piscina interior e quartos calmos com pátio.`,
        pitchDe: `4-Sterne-Hotel gegenüber dem TGV-Bahnhof mit überdachtem Privatparkplatz. Hunde bis 10 kg gegen geringen Aufpreis willkommen, 10 Gehminuten in die ummauerte Altstadt, Innenpool und ruhige Zimmer zum Innenhof.`,
      },
    ],
    hasDestPage: true,
  },
  {
    slug: 'arles',
    name: 'Arles',
    nights: 2,
    drive: {
      en: `Avignon to Arles: 38 km, ~40 min on the A7/N113. Two nights is the right depth: Camargue half-day, Roman Arles half-day, an optional Nîmes day trip (28 km, 25 min via the A54).`,
      fr: `Avignon à Arles : 38 km, environ 40 min par l'A7/N113. Deux nuits c'est la bonne durée : Camargue en demi-journée, Arles antique en demi-journée, possibilité Nîmes en day trip (28 km, 25 min par l'A54).`,
      es: `Aviñón a Arlés: 38 km, ~40 min por A7/N113. Dos noches es la duración justa: Camarga media jornada, Arlés romana media jornada, posible excursión a Nimes (28 km, 25 min por la A54).`,
      pt: `Avignon a Arles: 38 km, ~40 min pela A7/N113. Duas noites é a duração certa: Camarga meia tarde, Arles romana meia tarde, possível excursão a Nîmes (28 km, 25 min pela A54).`,
      de: `Avignon nach Arles: 38 km, ~40 Min. über die A7/N113. Zwei Nächte sind die richtige Dauer: Camargue an einem halben Tag, das römische Arles an einem halben Tag, optional ein Tagesausflug nach Nîmes (28 km, 25 Min. über die A54).`,
    },
    whyEn: `Arles is the heart of this loop: Roman heritage (the Amphithéâtre, Théâtre Antique, Alyscamps necropolis all walkable with leashed dogs on their parvis), Van Gogh's exact light still painting the Café Terrace square, and 30 km south the Camargue plains where Beauduc beach welcomes off-season dogs against a backdrop of pink flamingos and white horses. Nîmes is a 25-min drive for the third Roman city.`,
    whyFr: `Arles est le cœur de la boucle : patrimoine romain (Amphithéâtre, Théâtre Antique, Alyscamps, tous accessibles aux chiens en laisse sur leurs parvis), la lumière exacte de Van Gogh éclaire toujours la place du Café la Nuit, et à 30 km au sud la Camargue où la plage de Beauduc accueille les chiens hors saison entre flamants roses et chevaux blancs. Nîmes est à 25 min en voiture pour la troisième ville romaine.`,
    whyEs: `Arlés es el corazón del circuito: patrimonio romano (Anfiteatro, Teatro Antiguo, Alyscamps, todos accesibles a perros con correa en sus explanadas), la luz exacta de Van Gogh sigue iluminando la plaza del Café la Nuit, y a 30 km al sur la Camarga donde la playa de Beauduc admite perros fuera de temporada entre flamencos rosas y caballos blancos. Nimes a 25 min en coche para la tercera ciudad romana.`,
    whyPt: `Arles é o coração do circuito: património romano (Anfiteatro, Teatro Antigo, Alyscamps, todos acessíveis a cães à trela nos seus adros), a luz exacta de Van Gogh continua a iluminar a Place du Café la Nuit, e a 30 km a sul a Camarga onde a Praia de Beauduc aceita cães fora de época entre flamingos rosa e cavalos brancos. Nîmes a 25 min de carro para a terceira cidade romana.`,
    whyDe: `Arles ist das Herz dieser Schleife: römisches Erbe (das Amphitheater, das Théâtre Antique und die Nekropole Alyscamps sind alle mit angeleintem Hund auf ihren Vorplätzen begehbar), das exakte Licht Van Goghs bemalt noch immer den Platz mit der Café-Terrasse, und 30 km südlich liegen die Camargue-Ebenen, wo der Strand von Beauduc außerhalb der Saison Hunde vor der Kulisse rosa Flamingos und weißer Pferde willkommen heißt. Nîmes ist 25 Autominuten entfernt, die dritte römische Stadt.`,
    highlightsEn: [
      `Amphithéâtre and Théâtre Antique exteriors (leashed dogs welcome on parvis)`,
      `Alyscamps: 800 m walkable Roman necropolis, dogs on leash`,
      `Camargue Plage de Beauduc (40 min south, dogs off-season Oct-Apr)`,
      `Day trip Nîmes (25 min by A54): Arènes, Maison Carrée, Jardins de la Fontaine`,
    ],
    highlightsDe: [
      `Amphithéâtre und Théâtre Antique außen: angeleinte Hunde auf den Vorplätzen willkommen`,
      `Alyscamps: 800 m begehbare römische Nekropole, Hund an der Leine`,
      `Camargue-Strand Plage de Beauduc (40 Min. südlich, Hunde außerhalb der Saison Okt-Apr)`,
      `Tagesausflug Nîmes (25 Min. über die A54): Arènes, Maison Carrée, Jardins de la Fontaine`,
    ],
    highlightsFr: [
      `Amphithéâtre et Théâtre Antique : chiens en laisse sur les parvis`,
      `Alyscamps : 800 m de nécropole romaine, chiens en laisse`,
      `Plage de Beauduc en Camargue (40 min sud, chiens hors saison oct-avr)`,
      `Day trip Nîmes (25 min par A54) : Arènes, Maison Carrée, Jardins de la Fontaine`,
    ],
    highlightsEs: [
      `Anfiteatro y Teatro Antiguo: perros con correa en las explanadas`,
      `Alyscamps: 800 m de necrópolis romana, perros con correa`,
      `Playa de Beauduc en la Camarga (40 min sur, perros fuera de temporada oct-abr)`,
      `Excursión Nimes (25 min por A54): Arenas, Maison Carrée, Jardins de la Fontaine`,
    ],
    highlightsPt: [
      `Anfiteatro e Teatro Antigo: cães à trela nos adros`,
      `Alyscamps: 800 m de necrópole romana, cães à trela`,
      `Praia de Beauduc na Camarga (40 min sul, cães fora de época out-abr)`,
      `Excursão Nîmes (25 min pela A54): Arenas, Maison Carrée, Jardins de la Fontaine`,
    ],
    hotels: [
      {
        name: 'Hôtel Jules César MGallery',
        pitchEn: `Christian Lacroix's 5-star reinvention of a former 17th-century convent. Pets welcomed at a modest fee, walled garden and pool, 4-min walk to the Arènes and the Café Van Gogh terrace.`,
        pitchFr: `Réinvention 5 étoiles par Christian Lacroix d'un couvent du XVIIᵉ siècle. Chiens acceptés (supplément modeste), jardin clos et piscine, 4 min à pied des Arènes et de la terrasse du Café Van Gogh.`,
        pitchEs: `Reinvención 5 estrellas por Christian Lacroix de un convento del siglo XVII. Perros admitidos (suplemento modesto), jardín tapiado y piscina, 4 min andando a las Arenas y a la terraza del Café Van Gogh.`,
        pitchPt: `Reinvenção 5 estrelas por Christian Lacroix de um convento do século XVII. Cães aceites (taxa modesta), jardim murado e piscina, 4 min a pé das Arenas e da esplanada do Café Van Gogh.`,
        pitchDe: `5-Sterne-Neuinterpretation eines Klosters aus dem 17. Jahrhundert von Christian Lacroix. Hunde gegen geringen Aufpreis willkommen, ummauerter Garten und Pool, 4 Gehminuten zur Arena und zur Terrasse des Café Van Gogh.`,
      },
      {
        name: `Hôtel L'Arlatan`,
        pitchEn: `Boutique 4-star in a 15th-century Comte d'Arlatan mansion, fully reimagined by Cuban artist Jorge Pardo. Pets up to 10 kg welcomed, inner garden, 2 min walk to the Place du Forum and Café Van Gogh.`,
        pitchFr: `Boutique 4 étoiles dans l'hôtel du Comte d'Arlatan du XVᵉ, réinventé par l'artiste cubain Jorge Pardo. Chiens jusqu'à 10 kg acceptés, jardin intérieur, 2 min à pied de la Place du Forum et du Café Van Gogh.`,
        pitchEs: `Boutique 4 estrellas en el hotel del Conde de Arlatan del siglo XV, reinventado por el artista cubano Jorge Pardo. Perros hasta 10 kg admitidos, jardín interior, 2 min andando a la Place du Forum y al Café Van Gogh.`,
        pitchPt: `Boutique 4 estrelas no palácio do Conde de Arlatan do século XV, reimaginado pelo artista cubano Jorge Pardo. Cães até 10 kg aceites, jardim interior, 2 min a pé da Place du Forum e do Café Van Gogh.`,
        pitchDe: `4-Sterne-Boutiquehotel im Palais des Comte d'Arlatan aus dem 15. Jahrhundert, vollständig neu gestaltet vom kubanischen Künstler Jorge Pardo. Hunde bis 10 kg willkommen, Innengarten, 2 Gehminuten zur Place du Forum und zum Café Van Gogh.`,
      },
    ],
    hasDestPage: true,
  },
  {
    slug: 'aix-en-provence',
    name: 'Aix-en-Provence',
    nights: 1,
    drive: {
      en: `Arles to Aix-en-Provence: 75 km, ~55 min via the A54/A7. Park at Parking Rotonde and walk - the entire centro storico is car-free.`,
      fr: `Arles à Aix-en-Provence : 75 km, environ 55 min par l'A54/A7. Parking Rotonde puis à pied - le centre piéton.`,
      es: `Arlés a Aix-en-Provence: 75 km, ~55 min por A54/A7. Aparca en el Parking Rotonde y a pie - todo el centro es peatonal.`,
      pt: `Arles a Aix-en-Provence: 75 km, ~55 min pela A54/A7. Estacione no Parking Rotonde e a pé - todo o centro é pedonal.`,
      de: `Arles nach Aix-en-Provence: 75 km, ~55 Min. über die A54/A7. Parken Sie am Parking Rotonde und gehen Sie zu Fuß weiter - die gesamte Altstadt ist autofrei.`,
    },
    whyEn: `Aix-en-Provence is the cultured pause: 18th-century mansions lining the Cours Mirabeau (where dogs lie under every café table), Cézanne's painted Sainte-Victoire mountain rising 15 km east for a serious dog hike, the weekly market at Place Richelme, and the fountains - the Quatre Dauphins is the urban water-bowl of choice for a thirsty dog.`,
    whyFr: `Aix-en-Provence, c'est la pause culturelle : hôtels particuliers du XVIIIᵉ bordant le Cours Mirabeau (où les chiens dorment sous chaque table de café), la Sainte-Victoire peinte par Cézanne à 15 km à l'est pour une vraie rando canine, le marché de la Place Richelme, et les fontaines - les Quatre Dauphins reste la gamelle urbaine de référence pour un chien assoiffé.`,
    whyEs: `Aix-en-Provence es la pausa cultural: palacios del siglo XVIII bordeando el Cours Mirabeau (donde los perros duermen bajo cada mesa de café), la montaña Sainte-Victoire pintada por Cézanne a 15 km al este para una verdadera caminata canina, el mercado de la Place Richelme, y las fuentes - los Quatre Dauphins es la referencia urbana para perro sediento.`,
    whyPt: `Aix-en-Provence é a pausa cultural: palacetes do século XVIII a bordear o Cours Mirabeau (onde os cães dormem debaixo de cada mesa de café), a Sainte-Victoire pintada por Cézanne a 15 km a leste para uma verdadeira caminhada canina, o mercado da Place Richelme, e as fontes - a Quatre Dauphins é a tigela urbana de referência para cão sedento.`,
    whyDe: `Aix-en-Provence ist die kultivierte Pause: Stadtpalais aus dem 18. Jahrhundert säumen den Cours Mirabeau (wo Hunde unter jedem Café-Tisch liegen), der von Cézanne gemalte Berg Sainte-Victoire erhebt sich 15 km östlich für eine ernsthafte Hundewanderung, dazu der Wochenmarkt an der Place Richelme, und die Brunnen - der Quatre Dauphins ist der urbane Wassernapf erster Wahl für einen durstigen Hund.`,
    highlightsEn: [
      `Cours Mirabeau plane-tree avenue, dog-tolerant café terraces`,
      `Sainte-Victoire (15 km east): Cézanne's mountain, easy dog hikes`,
      `Atelier Cézanne (exterior gardens with dogs, interior is no)`,
      `Place Richelme market (Tue-Sun mornings, dog-friendly)`,
    ],
    highlightsDe: [
      `Platanenallee Cours Mirabeau, hundetolerante Café-Terrassen`,
      `Sainte-Victoire (15 km östlich): Cézannes Berg, leichte Hundewanderungen`,
      `Atelier Cézanne (Außengärten mit Hund erlaubt, drinnen nicht)`,
      `Markt an der Place Richelme (Di-So vormittags, hundefreundlich)`,
    ],
    highlightsFr: [
      `Cours Mirabeau bordé de platanes, terrasses tolérantes`,
      `Sainte-Victoire (15 km est) : la montagne de Cézanne, randos canines faciles`,
      `Atelier Cézanne (jardins extérieurs avec chiens, intérieur non)`,
      `Marché de la Place Richelme (mar-dim matin, dog-friendly)`,
    ],
    highlightsEs: [
      `Cours Mirabeau con avenida de plátanos, terrazas tolerantes`,
      `Sainte-Victoire (15 km este): la montaña de Cézanne, rutas caninas fáciles`,
      `Atelier Cézanne (jardines exteriores con perros, interior no)`,
      `Mercado de la Place Richelme (mar-dom mañanas, dog-friendly)`,
    ],
    highlightsPt: [
      `Cours Mirabeau com avenida de plátanos, esplanadas tolerantes`,
      `Sainte-Victoire (15 km leste): a montanha de Cézanne, trilhos caninos fáceis`,
      `Atelier Cézanne (jardins exteriores com cães, interior não)`,
      `Mercado da Place Richelme (ter-dom manhã, dog-friendly)`,
    ],
    hotels: [
      {
        name: 'Renaissance Aix-en-Provence Hotel',
        pitchEn: `Marriott 4-star with a quiet residential setting 5 min from the centre. Pets up to 14 kg welcomed at a modest fee, the largest private gardens of any central Aix hotel, perfect for dog downtime.`,
        pitchFr: `4 étoiles Marriott avec cadre résidentiel calme à 5 min du centre. Chiens jusqu'à 14 kg acceptés (supplément modeste), les plus grands jardins privés d'un hôtel central d'Aix, parfaits pour la pause canine.`,
        pitchEs: `4 estrellas Marriott con entorno residencial tranquilo a 5 min del centro. Perros hasta 14 kg admitidos (suplemento modesto), los mayores jardines privados de un hotel central de Aix, perfectos para descanso canino.`,
        pitchPt: `4 estrelas Marriott com ambiente residencial calmo a 5 min do centro. Cães até 14 kg aceites (taxa modesta), os maiores jardins privados de um hotel central em Aix, perfeitos para pausa canina.`,
        pitchDe: `4-Sterne-Marriott in ruhiger Wohnlage, 5 Gehminuten vom Zentrum. Hunde bis 14 kg gegen geringen Aufpreis willkommen, die größten Privatgärten aller zentralen Hotels in Aix, ideal für die Hundepause.`,
      },
      {
        name: 'Hôtel Cézanne',
        pitchEn: `Boutique 4-star opposite the TGV bus station and 7 min walk to the Cours Mirabeau. Pets up to 10 kg welcomed at small fee, the lobby has a self-service Nespresso bar dogs are welcome to lounge in.`,
        pitchFr: `Boutique 4 étoiles face à la navette TGV et 7 min à pied du Cours Mirabeau. Chiens jusqu'à 10 kg acceptés (petit supplément), le lobby a un bar Nespresso libre-service où les chiens peuvent traîner.`,
        pitchEs: `Boutique 4 estrellas frente a la lanzadera TGV y 7 min andando al Cours Mirabeau. Perros hasta 10 kg admitidos (pequeño suplemento), el lobby tiene un bar Nespresso self-service donde los perros pueden tumbarse.`,
        pitchPt: `Boutique 4 estrelas em frente ao shuttle TGV e 7 min a pé do Cours Mirabeau. Cães até 10 kg aceites (pequena taxa), o lobby tem um bar Nespresso self-service onde os cães podem descansar.`,
        pitchDe: `4-Sterne-Boutiquehotel gegenüber dem TGV-Shuttle und 7 Gehminuten vom Cours Mirabeau. Hunde bis 10 kg gegen kleinen Aufpreis willkommen, in der Lobby gibt es eine Nespresso-Selbstbedienungsbar, an der Hunde gerne liegen dürfen.`,
      },
    ],
    hasDestPage: true,
  },
  {
    slug: 'marseille',
    name: 'Marseille',
    nights: 1,
    drive: {
      en: `Aix to Marseille: 33 km, ~35 min on the A51. Use Parking Vieux-Port La Criée then walk - Marseille is best on foot with a dog.`,
      fr: `Aix à Marseille : 33 km, environ 35 min par l'A51. Parking Vieux-Port La Criée puis tout à pied - Marseille se découvre à pied avec un chien.`,
      es: `Aix a Marsella: 33 km, ~35 min por la A51. Aparca en Parking Vieux-Port La Criée y a pie - Marsella se descubre andando con perro.`,
      pt: `Aix a Marseille: 33 km, ~35 min pela A51. Estacione no Parking Vieux-Port La Criée e a pé - Marseille descobre-se a pé com cão.`,
      de: `Aix nach Marseille: 33 km, ~35 Min. über die A51. Nutzen Sie den Parking Vieux-Port La Criée und gehen Sie zu Fuß weiter - Marseille erschließt sich mit Hund am besten zu Fuß.`,
    },
    whyEn: `Marseille closes the loop with the sea: the Vieux-Port at sunset (leashed dogs allowed on the quays), the Calanques National Park 20 min east where the Sentier des Calanques (Cassis side, GR98) accepts leashed dogs year-round on the inland trail, and the Corniche Kennedy 4 km cliff walk back to the city. Several Calanques boat operators (Croisières Marseille Calanques) accept calm dogs on deck.`,
    whyFr: `Marseille clôt la boucle avec la mer : le Vieux-Port au coucher du soleil (chiens en laisse sur les quais), le Parc National des Calanques à 20 min à l'est où le Sentier des Calanques (côté Cassis, GR98) accepte les chiens en laisse toute l'année sur la partie terrestre, et la Corniche Kennedy 4 km en bord de falaise pour rentrer. Certains opérateurs bateau des Calanques (Croisières Marseille Calanques) acceptent les chiens calmes en pont.`,
    whyEs: `Marsella cierra el circuito con el mar: el Vieux-Port al atardecer (perros con correa en los muelles), el Parque Nacional de las Calanques a 20 min al este donde el Sentier des Calanques (lado Cassis, GR98) admite perros con correa todo el año en la parte terrestre, y la Corniche Kennedy 4 km al borde del acantilado para regresar. Algunos operadores de barco de las Calanques (Croisières Marseille Calanques) admiten perros tranquilos en cubierta.`,
    whyPt: `Marseille fecha o circuito com o mar: o Vieux-Port ao pôr-do-sol (cães à trela nos cais), o Parque Nacional das Calanques a 20 min a leste onde o Sentier des Calanques (lado Cassis, GR98) aceita cães à trela todo o ano na parte terrestre, e a Corniche Kennedy 4 km à beira da falésia para regressar. Alguns operadores de barco das Calanques (Croisières Marseille Calanques) aceitam cães calmos no convés.`,
    whyDe: `Marseille schließt die Schleife mit dem Meer: der Vieux-Port bei Sonnenuntergang (angeleinte Hunde auf den Kais erlaubt), der Nationalpark Calanques 20 Min. östlich, wo der Sentier des Calanques (Seite Cassis, GR98) auf dem landseitigen Pfad ganzjährig angeleinte Hunde zulässt, und der 4 km lange Klippenweg Corniche Kennedy zurück in die Stadt. Mehrere Bootsanbieter der Calanques (Croisières Marseille Calanques) nehmen ruhige Hunde an Deck mit.`,
    highlightsEn: [
      `Vieux-Port quays at sunset, leashed dogs welcome`,
      `Calanques de Cassis GR98 trail (20 min east, leashed year-round)`,
      `Corniche Kennedy: 4 km clifftop dog walk to Plages du Prado`,
      `MuCEM esplanade (museum interior is no, J4 esplanade is yes)`,
    ],
    highlightsDe: [
      `Kais des Vieux-Port bei Sonnenuntergang, angeleinte Hunde willkommen`,
      `GR98-Pfad der Calanques de Cassis (20 Min. östlich, ganzjährig an der Leine)`,
      `Corniche Kennedy: 4 km Klippenspaziergang mit Hund bis zu den Plages du Prado`,
      `Esplanade des MuCEM (Museumsinneres nein, Esplanade J4 ja)`,
    ],
    highlightsFr: [
      `Quais du Vieux-Port au coucher, chiens en laisse bienvenus`,
      `Sentier GR98 des Calanques de Cassis (20 min est, en laisse toute l'année)`,
      `Corniche Kennedy : 4 km en falaise jusqu'aux Plages du Prado`,
      `Esplanade du MuCEM (intérieur non, esplanade J4 oui)`,
    ],
    highlightsEs: [
      `Muelles del Vieux-Port al atardecer, perros con correa bienvenidos`,
      `Sendero GR98 de las Calanques de Cassis (20 min este, con correa todo el año)`,
      `Corniche Kennedy: 4 km de acantilado hasta las Plages du Prado`,
      `Esplanada del MuCEM (interior no, esplanada J4 sí)`,
    ],
    highlightsPt: [
      `Cais do Vieux-Port ao pôr-do-sol, cães à trela bem-vindos`,
      `Trilho GR98 das Calanques de Cassis (20 min leste, à trela todo o ano)`,
      `Corniche Kennedy: 4 km de falésia até às Plages du Prado`,
      `Esplanada do MuCEM (interior não, esplanada J4 sim)`,
    ],
    hotels: [
      {
        name: `InterContinental Marseille - Hotel Dieu`,
        pitchEn: `5-star palace overlooking the Vieux-Port from the converted 18th-century Hôtel Dieu. Pets welcomed at a modest fee, dog beds and bowls on request, the terrace bar is unbeatable for sunset with a dog at your feet.`,
        pitchFr: `Palace 5 étoiles surplombant le Vieux-Port depuis l'Hôtel Dieu du XVIIIᵉ siècle reconverti. Chiens acceptés (supplément modeste), couchage et gamelles sur demande, le bar terrasse imbattable au coucher avec son chien aux pieds.`,
        pitchEs: `Palacio 5 estrellas dominando el Vieux-Port desde el Hôtel Dieu del siglo XVIII reconvertido. Perros admitidos (suplemento modesto), camas y comederos a petición, el bar terraza imbatible al atardecer con perro a los pies.`,
        pitchPt: `Palace 5 estrelas a dominar o Vieux-Port a partir do Hôtel Dieu do século XVIII reconvertido. Cães aceites (taxa modesta), camas e tigelas a pedido, o bar esplanada imbatível ao pôr-do-sol com cão aos pés.`,
        pitchDe: `5-Sterne-Palast mit Blick auf den Vieux-Port im umgebauten Hôtel Dieu aus dem 18. Jahrhundert. Hunde gegen geringen Aufpreis willkommen, Hundebetten und Näpfe auf Anfrage, die Terrassenbar ist unschlagbar für den Sonnenuntergang mit Hund zu Füßen.`,
      },
      {
        name: 'Sofitel Marseille Vieux-Port',
        pitchEn: `5-star with the best dog-walking entrance in town: a small fenced lawn between the hotel and the Pharo gardens. Pets up to 14 kg welcomed, indoor heated pool, 8 min walk along the quays into the Old Port.`,
        pitchFr: `5 étoiles avec la meilleure sortie chien de la ville : petite pelouse clôturée entre l'hôtel et les jardins du Pharo. Chiens jusqu'à 14 kg acceptés, piscine intérieure chauffée, 8 min à pied le long des quais jusqu'au Vieux-Port.`,
        pitchEs: `5 estrellas con la mejor salida canina de la ciudad: pequeño césped vallado entre el hotel y los jardines del Pharo. Perros hasta 14 kg admitidos, piscina interior climatizada, 8 min andando por los muelles hasta el Vieux-Port.`,
        pitchPt: `5 estrelas com a melhor saída canina da cidade: pequena relva vedada entre o hotel e os jardins do Pharo. Cães até 14 kg aceites, piscina interior aquecida, 8 min a pé pelos cais até ao Vieux-Port.`,
        pitchDe: `5-Sterne-Hotel mit dem besten Hundeauslauf der Stadt: kleiner eingezäunter Rasen zwischen dem Hotel und den Pharo-Gärten. Hunde bis 14 kg willkommen, beheizter Innenpool, 8 Gehminuten entlang der Kais zum Vieux-Port.`,
      },
    ],
    hasDestPage: true,
  },
]

const COPY = {
  en: {
    dayLabels: ['Day 1', 'Days 2 & 3', 'Day 4', 'Day 5'],
    dayLabelsShort: ['Day 1', 'Days 2–3', 'Day 4', 'Day 5'],
    checkAvailability: 'Check availability →',
    browseAll: (city: string) => `Browse all pet-friendly hotels in ${city} →`,
    eyebrow: '5-day pet-friendly Provence road trip',
    title: 'Provence Road Trip with Your Dog: Avignon, Arles, Aix & Marseille',
    intro: `Provence packs four very different dog-friendly stops into a 150 km loop you can drive in five days. Avignon's medieval ramparts and the Palais, Arles' Roman heritage plus the Camargue plains, Aix-en-Provence's plane-tree avenues and the Sainte-Victoire, and Marseille's Vieux-Port and Calanques. Verified hotels at every stop, beach and ferry windows noted, plus an optional Nîmes day trip from Arles.`,
    stats: ['5 days', '~150 km total drive', '4 stops · 5 nights', 'Dogs welcome at every hotel'],
    routeHeading: 'The route at a glance',
    mapHeading: 'Interactive map',
    mapNote: 'Pan and zoom - every blue marker is a verified pet-friendly hotel.',
    itineraryHeading: 'Day-by-day itinerary',
    nightsLabel: (n: number) => `${n} night${n > 1 ? 's' : ''}`,
    driveLabel: 'Getting there',
    highlightsLabel: `Don't miss`,
    hotelsLabel: 'Where to sleep',
    practicalHeading: 'Practical info before you go',
    practical: [
      { h: 'Beach rules', p: `Provence and the Bouches-du-Rhône coast follow the national pattern: most municipal beaches ban dogs between 1 May (or 15 June) and 30 September. The Camargue Plage de Beauduc (35 km south of Arles) accepts dogs off-season, the Sentier des Calanques GR98 inland trail accepts leashed dogs year-round. Always check the local arrêté municipal before descending.` },
      { h: 'Heat & paw safety', p: `Provence asphalt and limestone reach 50-65 °C between 11:00 and 19:00 from June to mid-September. Walk early (before 09:00) or after 19:00, do the 7-second hand test on stone (Avignon and Aix old towns), and carry water. The Mistral wind (40-90 km/h) is dehydrating - top up bowls more often than you think.` },
      { h: 'Driving with a dog', p: `French law requires dogs restrained in the car (harness, crate or barrier). Toll roads (A7, A8, A51, A54) accept dogs without restriction; aires have shaded grass strips. Never leave a dog in a parked car, even with a window cracked - it is a criminal offence (art. R655-1, fines up to €30 000).` },
      { h: 'Emergency vet', p: `Avignon: ChronoVet Avignon Le Pontet, +33 4 90 31 14 14 (24h). Arles: Clinique Vétérinaire des Arènes, +33 4 90 96 24 18. Aix-en-Provence: VétérinHôpital, +33 4 42 64 81 71 (24h). Marseille: ChronoVet Marseille Saint-Charles, +33 4 91 50 22 22 (24h).` },
    ],
    faqHeading: 'Frequently asked questions',
    faq: [
      { q: 'Can I do this trip without a car?', a: `All four cities are TGV-served: Avignon and Aix have TGV stations, Marseille is the rail hub, and Arles is on the TER Marseille-Bordeaux line (45 min from Marseille). Leashed dogs on TGV cost €7.10, small dogs in carrier free. The Pays d'Aix bus, Cartreize regional buses and Marseille metro all accept leashed dogs (muzzled if large) - workable without a car but slower.` },
      { q: 'Best season for this trip with a dog?', a: `April to mid-June and mid-September to early November. Temperatures 16-25 °C, lavender blooms in late June (north of Avignon), beach windows still open, and you avoid the July-August Provençal heat (35 °C+, scorching limestone) plus the summer beach ban. Winter is feasible: mild days, low prices, but the Mistral can be brutal for small dogs.` },
      { q: `Should I add Nîmes as a stop?`, a: `Nîmes works as a half-day from Arles (25 min via the A54). The Arènes de Nîmes still hosts bullfights but the exterior plaza accepts leashed dogs; the Jardins de la Fontaine are dog-friendly with the Tour Magne hike; the Maison Carrée plaza welcomes dogs. The Pont du Gard 25 km north of Nîmes accepts dogs on the riverside paths and the Gardon banks (free for swimming with a dog off-season).` },
      { q: 'Will my dog be welcome at restaurants?', a: `Provençal terraces are extremely dog-tolerant - bring water and a small mat. Cours Mirabeau in Aix, Cours Jean-Jaurès in Avignon, Place du Forum in Arles and the Vieux-Port quays in Marseille all default to yes on terrace. Indoor dining depends on the establishment, ask.` },
    ],
  },
  fr: {
    dayLabels: [`Jour 1`, `Jours 2 & 3`, `Jour 4`, `Jour 5`],
    dayLabelsShort: [`Jour 1`, `Jours 2–3`, `Jour 4`, `Jour 5`],
    checkAvailability: `Voir les disponibilités →`,
    browseAll: (city: string) => `Voir tous les hôtels pet-friendly à ${city} →`,
    eyebrow: `Road trip de 5 jours en Provence avec son chien`,
    title: `Road trip en Provence avec son chien : Avignon, Arles, Aix-en-Provence et Marseille`,
    intro: `La Provence réunit quatre étapes dog-friendly très différentes sur une boucle de 150 km, à parcourir en cinq jours. Les remparts médiévaux et le Palais d'Avignon, le patrimoine romain d'Arles plus la Camargue, les avenues de platanes d'Aix-en-Provence et la Sainte-Victoire, et le Vieux-Port et les Calanques de Marseille. Hôtels vérifiés à chaque étape, fenêtres de plages et ferry indiquées, plus un day trip optionnel à Nîmes depuis Arles.`,
    stats: ['5 jours', '~150 km de route', '4 étapes · 5 nuits', 'Chiens acceptés dans tous les hôtels'],
    routeHeading: `L'itinéraire en un coup d'œil`,
    mapHeading: 'Carte interactive',
    mapNote: `Naviguez et zoomez - chaque marqueur bleu est un hôtel pet-friendly vérifié.`,
    itineraryHeading: 'Itinéraire jour par jour',
    nightsLabel: (n: number) => `${n} nuit${n > 1 ? 's' : ''}`,
    driveLabel: 'Comment y aller',
    highlightsLabel: 'À ne pas manquer',
    hotelsLabel: 'Où dormir',
    practicalHeading: 'À savoir avant de partir',
    practical: [
      { h: 'Règles de plage', p: `La Provence et les Bouches-du-Rhône suivent le schéma national : la plupart des plages municipales interdisent les chiens du 1er mai (ou 15 juin selon les communes) au 30 septembre. La Plage de Beauduc en Camargue (35 km sud d'Arles) accueille les chiens hors saison, le Sentier des Calanques GR98 sur la partie terrestre est ouvert aux chiens en laisse toute l'année. Vérifiez toujours l'arrêté municipal avant de descendre.` },
      { h: 'Chaleur et coussinets', p: `L'asphalte et le calcaire provençaux atteignent 50-65 °C entre 11h et 19h de juin à mi-septembre. Sortez tôt (avant 9h) ou après 19h, faites le test des 7 secondes sur la pierre (vieux Avignon, vieux Aix), et emportez de l'eau. Le Mistral (40-90 km/h) déshydrate - remplissez les gamelles plus souvent que prévu.` },
      { h: 'Conduire avec un chien', p: `La loi française impose le chien attaché (harnais, caisse ou grille). Les autoroutes à péage (A7, A8, A51, A54) acceptent les chiens sans restriction ; les aires ont des bandes d'herbe ombragées. Ne jamais laisser un chien dans une voiture stationnée, même avec une vitre entrouverte - c'est un délit (art. R655-1, amende jusqu'à 30 000 €).` },
      { h: `Vétérinaire d'urgence`, p: `Avignon : ChronoVet Avignon Le Pontet, +33 4 90 31 14 14 (24h). Arles : Clinique Vétérinaire des Arènes, +33 4 90 96 24 18. Aix-en-Provence : VétérinHôpital, +33 4 42 64 81 71 (24h). Marseille : ChronoVet Marseille Saint-Charles, +33 4 91 50 22 22 (24h).` },
    ],
    faqHeading: 'Questions fréquentes',
    faq: [
      { q: 'Peut-on faire ce voyage sans voiture ?', a: `Les quatre villes sont desservies par le TGV : Avignon et Aix ont des gares TGV, Marseille est le hub ferroviaire, et Arles est sur la ligne TER Marseille-Bordeaux (45 min depuis Marseille). Chien en laisse en TGV : 7,10 €, petit chien en sac gratuit. Bus du Pays d'Aix, Cartreize régional et métro de Marseille acceptent tous les chiens en laisse (muselière si grand). Faisable sans voiture mais plus lent.` },
      { q: 'Quelle est la meilleure saison ?', a: `Avril à mi-juin et mi-septembre à début novembre. Températures 16-25 °C, floraison de la lavande fin juin (nord d'Avignon), plages encore ouvertes, et on évite la chaleur provençale de juillet-août (35 °C+, calcaire brûlant) plus l'interdiction estivale. L'hiver fonctionne : journées douces, prix bas, mais le Mistral peut être brutal pour les petits chiens.` },
      { q: `Faut-il ajouter Nîmes comme étape ?`, a: `Nîmes fonctionne en demi-journée depuis Arles (25 min par l'A54). Les Arènes accueillent encore des corridas mais le parvis extérieur accepte les chiens en laisse ; les Jardins de la Fontaine sont dog-friendly avec la montée à la Tour Magne ; la Maison Carrée a une place ouverte aux chiens. Le Pont du Gard à 25 km au nord de Nîmes accepte les chiens sur les berges du Gardon (baignade gratuite avec son chien hors saison).` },
      { q: 'Mon chien sera-t-il bien accueilli en terrasse ?', a: `Les terrasses provençales sont extrêmement tolérantes - amenez de l'eau et un petit tapis. Cours Mirabeau à Aix, Cours Jean-Jaurès à Avignon, Place du Forum à Arles et les quais du Vieux-Port à Marseille acceptent presque tous. La salle dépend de l'établissement, demandez.` },
    ],
  },
  es: {
    dayLabels: ['Día 1', 'Días 2 y 3', 'Día 4', 'Día 5'],
    dayLabelsShort: ['Día 1', 'Días 2–3', 'Día 4', 'Día 5'],
    checkAvailability: 'Ver disponibilidad →',
    browseAll: (city: string) => `Ver todos los hoteles pet-friendly en ${city} →`,
    eyebrow: `Road trip de 5 días por Provenza con perro`,
    title: `Road trip por Provenza con tu perro: Aviñón, Arlés, Aix-en-Provence y Marsella`,
    intro: `Provenza reúne cuatro paradas dog-friendly muy distintas en un circuito de 150 km que se hace en cinco días. Las murallas medievales y el Palacio de Aviñón, el patrimonio romano de Arlés más la Camarga, las avenidas de plátanos de Aix-en-Provence y la Sainte-Victoire, y el Vieux-Port y las Calanques de Marsella. Hoteles verificados en cada parada, ventanas de playa y ferri señaladas, más una excursión opcional a Nimes desde Arlés.`,
    stats: ['5 días', '~150 km totales', '4 paradas · 5 noches', 'Perros admitidos en cada hotel'],
    routeHeading: 'El recorrido de un vistazo',
    mapHeading: 'Mapa interactivo',
    mapNote: `Desplázate y haz zoom - cada marcador azul es un hotel pet-friendly verificado.`,
    itineraryHeading: 'Itinerario día a día',
    nightsLabel: (n: number) => `${n} noche${n > 1 ? 's' : ''}`,
    driveLabel: 'Cómo llegar',
    highlightsLabel: 'No te pierdas',
    hotelsLabel: 'Dónde dormir',
    practicalHeading: 'Antes de salir',
    practical: [
      { h: 'Normas de playas', p: `Provenza y las Bouches-du-Rhône siguen el patrón nacional: la mayoría de las playas municipales prohíben perros del 1 de mayo (o 15 de junio) al 30 de septiembre. La Playa de Beauduc en la Camarga (35 km sur de Arlés) admite perros fuera de temporada, el sendero GR98 de las Calanques en la parte terrestre admite perros con correa todo el año. Comprueba siempre el arrêté municipal antes de bajar.` },
      { h: 'Calor y almohadillas', p: `El asfalto y la caliza provenzales alcanzan 50-65 °C entre las 11:00 y las 19:00 de junio a mediados de septiembre. Sal temprano (antes de las 9:00) o después de las 19:00, haz el test de los 7 segundos en la piedra (cascos antiguos de Aviñón y Aix), y lleva agua. El Mistral (40-90 km/h) deshidrata - rellena los cuencos más a menudo de lo que crees.` },
      { h: 'Conducir con perro', p: `La ley francesa exige el perro sujeto (arnés, transportín o reja). Las autopistas de peaje (A7, A8, A51, A54) admiten perros sin restricción; las áreas tienen franjas de hierba sombreadas. Nunca dejes al perro en un coche aparcado, ni con la ventana entreabierta - es delito (art. R655-1, multas hasta 30 000 €).` },
      { h: 'Veterinario de urgencia', p: `Aviñón: ChronoVet Avignon Le Pontet, +33 4 90 31 14 14 (24h). Arlés: Clinique Vétérinaire des Arènes, +33 4 90 96 24 18. Aix-en-Provence: VétérinHôpital, +33 4 42 64 81 71 (24h). Marsella: ChronoVet Marseille Saint-Charles, +33 4 91 50 22 22 (24h).` },
    ],
    faqHeading: 'Preguntas frecuentes',
    faq: [
      { q: '¿Se puede hacer sin coche?', a: `Las cuatro ciudades están servidas por TGV: Aviñón y Aix tienen estaciones TGV, Marsella es el hub ferroviario, y Arlés está en la línea TER Marseille-Bordeaux (45 min desde Marsella). Perro con correa en TGV: 7,10 €, perro pequeño en bolsa gratis. Los buses del Pays d'Aix, Cartreize regional y el metro de Marsella admiten perros con correa (bozal si son grandes). Factible sin coche pero más lento.` },
      { q: '¿Mejor temporada con perro?', a: `Abril a mediados de junio y mediados de septiembre a principios de noviembre. Temperaturas 16-25 °C, floración de lavanda a finales de junio (norte de Aviñón), playas aún abiertas, y se evita el calor provenzal de julio-agosto (35 °C+, caliza ardiente) más la prohibición veraniega. El invierno funciona: días suaves, precios bajos, pero el Mistral puede ser brutal para perros pequeños.` },
      { q: `¿Añadir Nimes como parada?`, a: `Nimes funciona como media jornada desde Arlés (25 min por A54). Las Arenas siguen albergando corridas pero la explanada exterior admite perros con correa; los Jardins de la Fontaine son dog-friendly con subida a la Tour Magne; la Maison Carrée tiene una plaza abierta a perros. El Pont du Gard a 25 km al norte de Nimes admite perros en las orillas del Gardon (baño gratuito con perro fuera de temporada).` },
      { q: '¿Aceptan perros en terrazas?', a: `Las terrazas provenzales son extremadamente tolerantes - lleva agua y una colchoneta. Cours Mirabeau en Aix, Cours Jean-Jaurès en Aviñón, Place du Forum en Arlés y los muelles del Vieux-Port en Marsella aceptan casi todos. La sala depende del establecimiento, pregunta.` },
    ],
  },
  pt: {
    dayLabels: ['Dia 1', 'Dias 2 e 3', 'Dia 4', 'Dia 5'],
    dayLabelsShort: ['Dia 1', 'Dias 2–3', 'Dia 4', 'Dia 5'],
    checkAvailability: 'Ver disponibilidade →',
    browseAll: (city: string) => `Ver todos os hotéis pet-friendly em ${city} →`,
    eyebrow: `Road trip de 5 dias pela Provença com cão`,
    title: `Road trip pela Provença com o seu cão: Avinhão, Arles, Aix-en-Provence e Marselha`,
    intro: `A Provença junta quatro paragens dog-friendly muito diferentes num circuito de 150 km que se faz em cinco dias. As muralhas medievais e o Palácio de Avinhão, o património romano de Arles mais a Camarga, as avenidas de plátanos de Aix-en-Provence e a Sainte-Victoire, e o Vieux-Port e as Calanques de Marselha. Hotéis verificados em cada paragem, janelas de praia e ferry sinalizadas, mais uma excursão opcional a Nîmes desde Arles.`,
    stats: ['5 dias', '~150 km totais', '4 paragens · 5 noites', 'Cães aceites em todos os hotéis'],
    routeHeading: 'O circuito num relance',
    mapHeading: 'Mapa interactivo',
    mapNote: `Desloque e amplie - cada marcador azul é um hotel pet-friendly verificado.`,
    itineraryHeading: 'Itinerário dia a dia',
    nightsLabel: (n: number) => `${n} noite${n > 1 ? 's' : ''}`,
    driveLabel: 'Como chegar',
    highlightsLabel: 'Não perca',
    hotelsLabel: 'Onde dormir',
    practicalHeading: 'Antes de partir',
    practical: [
      { h: 'Regras de praia', p: `A Provença e as Bouches-du-Rhône seguem o padrão nacional: a maioria das praias municipais proíbe cães de 1 de maio (ou 15 de junho) a 30 de setembro. A Plage de Beauduc na Camarga (35 km a sul de Arles) aceita cães fora de época, o trilho GR98 das Calanques na parte terrestre aceita cães à trela todo o ano. Verifique sempre o arrêté municipal antes de descer.` },
      { h: 'Calor e almofadinhas', p: `O asfalto e a pedra calcária provençais atingem 50-65 °C entre as 11h e as 19h de junho a meados de setembro. Saia cedo (antes das 9h) ou depois das 19h, faça o teste dos 7 segundos na pedra (cidades velhas de Avignon e Aix), e leve água. O Mistral (40-90 km/h) desidrata - encha as tigelas mais vezes do que parece.` },
      { h: 'Conduzir com o cão', p: `A lei francesa exige o cão preso (arnês, transportadora ou grelha). As autoestradas com portagem (A7, A8, A51, A54) aceitam cães sem restrição; as áreas têm faixas de relva sombreadas. Nunca deixe um cão num carro estacionado, nem com janela entreaberta - é crime (art. R655-1, multas até 30 000 €).` },
      { h: 'Veterinário de urgência', p: `Avignon: ChronoVet Avignon Le Pontet, +33 4 90 31 14 14 (24h). Arles: Clinique Vétérinaire des Arènes, +33 4 90 96 24 18. Aix-en-Provence: VétérinHôpital, +33 4 42 64 81 71 (24h). Marseille: ChronoVet Marseille Saint-Charles, +33 4 91 50 22 22 (24h).` },
    ],
    faqHeading: 'Perguntas frequentes',
    faq: [
      { q: 'Dá para fazer sem carro?', a: `As quatro cidades têm TGV: Avignon e Aix têm estações TGV, Marseille é o hub ferroviário, e Arles está na linha TER Marseille-Bordeaux (45 min desde Marseille). Cão à trela em TGV custa 7,10 €, cão pequeno em saco gratuito. Os autocarros do Pays d'Aix, Cartreize regional e metro de Marseille aceitam cães à trela (açaime se forem grandes). Possível sem carro mas mais lento.` },
      { q: 'Melhor época com cão?', a: `Abril a meados de junho e meados de setembro a início de novembro. Temperaturas 16-25 °C, floração da lavanda no fim de junho (norte de Avignon), praias ainda abertas, e evita-se o calor provençal de julho-agosto (35 °C+, calcário a escaldar) mais a proibição estival. O inverno funciona: dias amenos, preços baixos, mas o Mistral pode ser brutal para cães pequenos.` },
      { q: `Adicionar Nîmes como paragem?`, a: `Nîmes funciona como meio dia desde Arles (25 min pela A54). As Arenas ainda recebem touradas mas o adro exterior aceita cães à trela; os Jardins de la Fontaine são dog-friendly com subida à Tour Magne; a Maison Carrée tem uma praça aberta a cães. O Pont du Gard a 25 km a norte de Nîmes aceita cães nas margens do Gardon (banhos gratuitos com cão fora de época).` },
      { q: 'Aceitam cães nas esplanadas?', a: `As esplanadas provençais são extremamente tolerantes - leve água e um tapete pequeno. Cours Mirabeau em Aix, Cours Jean-Jaurès em Avignon, Place du Forum em Arles e os cais do Vieux-Port em Marseille aceitam quase todos. A sala depende do estabelecimento, pergunte.` },
    ],
  },
  de: {
    dayLabels: [`Tag 1`, `Tag 2 & 3`, `Tag 4`, `Tag 5`],
    dayLabelsShort: [`Tag 1`, `Tag 2–3`, `Tag 4`, `Tag 5`],
    checkAvailability: 'Verfügbarkeit prüfen →',
    browseAll: (city: string) => `Alle haustierfreundlichen Hotels in ${city} ansehen →`,
    eyebrow: 'Hundefreundlicher 5-Tage-Roadtrip durch die Provence',
    title: 'Provence-Roadtrip mit Hund: Avignon, Arles, Aix-en-Provence & Marseille',
    intro: `Die Provence vereint vier sehr unterschiedliche hundefreundliche Stationen auf einer 150 km langen Schleife, die Sie in fünf Tagen befahren können. Avignons mittelalterliche Stadtmauer und der Papstpalast, Arles' römisches Erbe plus die Camargue-Ebenen, Aix-en-Provence mit seinen Platanenalleen und der Sainte-Victoire, und Marseilles Vieux-Port und Calanques. Geprüfte Hotels an jeder Station, Hinweise zu Strand- und Fährzeiten, dazu ein optionaler Tagesausflug nach Nîmes ab Arles.`,
    stats: ['5 Tage', '~150 km Gesamtstrecke', '4 Stationen · 5 Nächte', 'Hunde in jedem Hotel willkommen'],
    routeHeading: 'Die Route auf einen Blick',
    mapHeading: 'Interaktive Karte',
    mapNote: 'Verschieben und zoomen Sie - jeder blaue Marker ist ein geprüftes haustierfreundliches Hotel.',
    itineraryHeading: 'Tag-für-Tag-Reiseplan',
    nightsLabel: (n: number) => (n > 1 ? `${n} Nächte` : `${n} Nacht`),
    driveLabel: 'Anreise',
    highlightsLabel: 'Nicht verpassen',
    hotelsLabel: 'Wo übernachten',
    practicalHeading: 'Praktische Infos vor der Abreise',
    practical: [
      { h: 'Strandregeln', p: `Die Provence und die Bouches-du-Rhône-Küste folgen dem landesweiten Muster: Die meisten Gemeindestrände verbieten Hunde zwischen dem 1. Mai (oder 15. Juni) und dem 30. September. Der Camargue-Strand Plage de Beauduc (35 km südlich von Arles) nimmt Hunde außerhalb der Saison auf, der landseitige Pfad des Sentier des Calanques GR98 lässt angeleinte Hunde ganzjährig zu. Prüfen Sie vor dem Abstieg immer den örtlichen arrêté municipal.` },
      { h: 'Hitze und Pfotenschutz', p: `Asphalt und Kalkstein in der Provence erreichen zwischen 11 und 19 Uhr von Juni bis Mitte September 50-65 °C. Gehen Sie früh (vor 9 Uhr) oder nach 19 Uhr, machen Sie auf Stein (Altstädte von Avignon und Aix) den 7-Sekunden-Handtest, und führen Sie Wasser mit. Der Mistral (40-90 km/h) trocknet aus - füllen Sie die Näpfe häufiger auf, als Sie denken.` },
      { h: 'Autofahren mit Hund', p: `Das französische Recht schreibt vor, dass der Hund im Auto gesichert sein muss (Geschirr, Box oder Trenngitter). Mautstraßen (A7, A8, A51, A54) nehmen Hunde ohne Einschränkung mit; Rastplätze haben schattige Grünstreifen. Lassen Sie einen Hund niemals im geparkten Auto zurück, auch nicht mit gekipptem Fenster - das ist eine Straftat (Art. R655-1, Bußgelder bis 30 000 €).` },
      { h: 'Tierärztlicher Notdienst', p: `Avignon: ChronoVet Avignon Le Pontet, +33 4 90 31 14 14 (24h). Arles: Clinique Vétérinaire des Arènes, +33 4 90 96 24 18. Aix-en-Provence: VétérinHôpital, +33 4 42 64 81 71 (24h). Marseille: ChronoVet Marseille Saint-Charles, +33 4 91 50 22 22 (24h).` },
    ],
    faqHeading: 'Häufig gestellte Fragen',
    faq: [
      { q: 'Geht dieser Trip auch ohne Auto?', a: `Alle vier Städte sind an den TGV angebunden: Avignon und Aix haben TGV-Bahnhöfe, Marseille ist der Eisenbahnknoten, und Arles liegt an der TER-Linie Marseille-Bordeaux (45 Min. ab Marseille). Ein angeleinter Hund kostet im TGV 7,10 €, kleine Hunde in der Tasche fahren kostenlos. Die Busse des Pays d'Aix, der Regionalbus Cartreize und die Metro Marseille nehmen alle angeleinte Hunde mit (Maulkorb bei großen Hunden) - machbar ohne Auto, aber langsamer.` },
      { q: 'Beste Reisezeit für diesen Trip mit Hund?', a: `April bis Mitte Juni und Mitte September bis Anfang November. Temperaturen 16-25 °C, Lavendelblüte Ende Juni (nördlich von Avignon), Strandfenster noch offen, und Sie umgehen die provenzalische Hitze im Juli-August (35 °C+, glühender Kalkstein) sowie das Sommer-Strandverbot. Der Winter ist machbar: milde Tage, niedrige Preise, aber der Mistral kann für kleine Hunde brutal sein.` },
      { q: 'Sollte ich Nîmes als Station einplanen?', a: `Nîmes funktioniert als halber Tag ab Arles (25 Min. über die A54). Die Arènes de Nîmes beherbergen noch Stierkämpfe, aber der Außenplatz nimmt angeleinte Hunde auf; die Jardins de la Fontaine sind hundefreundlich mit Aufstieg zum Tour Magne; der Platz an der Maison Carrée heißt Hunde willkommen. Der Pont du Gard 25 km nördlich von Nîmes lässt Hunde auf den Uferwegen zu, und am Gardon-Ufer kann außerhalb der Saison mit Hund kostenlos gebadet werden.` },
      { q: 'Ist mein Hund in Restaurants willkommen?', a: `Provenzalische Terrassen sind äußerst hundetolerant - bringen Sie Wasser und eine kleine Matte mit. Cours Mirabeau in Aix, Cours Jean-Jaurès in Avignon, Place du Forum in Arles und die Kais am Vieux-Port in Marseille sagen auf der Terrasse fast immer Ja. Drinnen hängt es vom jeweiligen Lokal ab, fragen Sie einfach nach.` },
    ],
  },
} as const

type Locale = keyof typeof COPY

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!hasLocale(rawLocale)) notFound()
  const locale = rawLocale as Locale
  const t = COPY[locale] ?? COPY.en

  const stickyLabel = STICKY_LABELS[locale] ?? STICKY_LABELS.en

  const mapSrc = buildStay22MapSrc(MAP_LAT, MAP_LNG, `${CAMPAIGN_BASE}-map`)

  const tripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: 'Provence Pet-Friendly Road Trip',
    description: 'A 5-day road-trip itinerary across Provence with a dog: Avignon, Arles, Aix-en-Provence, Marseille.',
    touristType: 'Pet owners',
    itinerary: STOPS.map((s, i) => ({
      '@type': 'Place',
      name: s.name,
      address: { '@type': 'PostalAddress', addressCountry: 'FR', addressRegion: `Provence-Alpes-Côte d'Azur`, addressLocality: s.name },
      position: i + 1,
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/${locale}/guides` },
      { '@type': 'ListItem', position: 3, name: t.title, item: `${SITE_URL}/${locale}/guides/${SLUG}` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const w = (s: Stop) => {
    if (locale === 'fr') return { why: s.whyFr, hl: s.highlightsFr, hotels: s.hotels.map(h => ({ name: h.name, pitch: h.pitchFr })) }
    if (locale === 'es') return { why: s.whyEs, hl: s.highlightsEs, hotels: s.hotels.map(h => ({ name: h.name, pitch: h.pitchEs })) }
    if (locale === 'pt') return { why: s.whyPt, hl: s.highlightsPt, hotels: s.hotels.map(h => ({ name: h.name, pitch: h.pitchPt })) }
    if (locale === 'de') return { why: s.whyDe, hl: s.highlightsDe, hotels: s.hotels.map(h => ({ name: h.name, pitch: h.pitchDe })) }
    return { why: s.whyEn, hl: s.highlightsEn, hotels: s.hotels.map(h => ({ name: h.name, pitch: h.pitchEn })) }
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-fuchsia-600 to-amber-500 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 40%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-xs font-semibold uppercase tracking-widest text-purple-200 mb-3">{t.eyebrow}</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{t.title}</h1>
          <p className="text-lg sm:text-xl text-purple-50 max-w-3xl">{t.intro}</p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {t.stats.map((s, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-lg p-3 text-center text-sm font-medium">{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Route summary */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">{t.routeHeading}</h2>
        <ol className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {STOPS.map((s, i) => (
            <li key={s.slug} className="bg-white rounded-xl p-4 border border-stone-200">
              <div className="text-xs font-semibold uppercase tracking-wider text-purple-700 mb-1">{t.dayLabelsShort[i]}</div>
              <div className="text-lg font-bold text-stone-900">{s.name}</div>
              <div className="text-sm text-stone-600 mt-1">{t.nightsLabel(s.nights)}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* Map */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">{t.mapHeading}</h2>
        <p className="text-sm text-stone-600 mb-4">{t.mapNote}</p>
        <div className="rounded-xl overflow-hidden border border-stone-200 shadow-sm">
          <iframe
            src={mapSrc}
            width="100%"
            height="520"
            style={{ border: 0 }}
            loading="lazy"
            title="Provence pet-friendly road trip map"
          />
        </div>
      </section>

      {/* Day-by-day */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">{t.itineraryHeading}</h2>
        <div className="space-y-8">
          {STOPS.map((s, i) => {
            const localised = w(s)
            const dayLabel = t.dayLabels[i]
            return (
              <article key={s.slug} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                <header className="px-5 py-4 sm:px-7 sm:py-5 bg-gradient-to-r from-purple-50 to-amber-50 border-b border-stone-200">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-purple-700">{dayLabel}</span>
                    <h3 className="text-2xl font-bold text-stone-900">
                      {s.hasDestPage ? (
                        <Link href={`/${locale}/destinations/${s.slug}`} className="hover:text-purple-700">
                          {s.name}
                        </Link>
                      ) : (
                        s.name
                      )}
                    </h3>
                    <span className="text-sm text-stone-600">{t.nightsLabel(s.nights)}</span>
                  </div>
                </header>
                <div className="px-5 py-5 sm:px-7 sm:py-6 space-y-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">{t.driveLabel}</div>
                    <p className="text-stone-700 text-sm">{s.drive[locale]}</p>
                  </div>
                  <p className="text-stone-800 leading-relaxed">{localised.why}</p>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">{t.highlightsLabel}</div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-stone-700">
                      {localised.hl.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-purple-600 mt-0.5">●</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">{t.hotelsLabel}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {localised.hotels.map((h, idx) => (
                        <a
                          key={idx}
                          href={buildAllezLink(h.name, s.name, 'France', `${CAMPAIGN_BASE}-${s.slug}-${idx + 1}`, s.nights)}
                          target="_blank"
                          rel="noopener sponsored"
                          className="block bg-stone-50 hover:bg-purple-50 border border-stone-200 hover:border-purple-300 rounded-lg p-4 transition"
                        >
                          <div className="font-semibold text-stone-900">{h.name}</div>
                          <p className="text-xs text-stone-600 mt-1 leading-relaxed">{h.pitch}</p>
                          <div className="mt-2 text-xs font-semibold text-purple-700">
                            {t.checkAvailability}
                          </div>
                        </a>
                      ))}
                    </div>
                    <a
                      href={buildAllezDestLink(s.name, 'France', `${CAMPAIGN_BASE}-${s.slug}-all`, s.nights)}
                      target="_blank"
                      rel="noopener sponsored"
                      className="inline-block mt-3 text-sm text-stone-600 hover:text-purple-700 underline underline-offset-2"
                    >
                      {t.browseAll(s.name)}
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* Practical info */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">{t.practicalHeading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.practical.map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-stone-200">
              <h3 className="font-bold text-stone-900 mb-2">{p.h}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{p.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">{t.faqHeading}</h2>
        <div className="space-y-4">
          {t.faq.map((f, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-stone-200">
              <h3 className="font-semibold text-stone-900 mb-2">{f.q}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <GuideFooter locale={locale} currentSlug={SLUG} />

      <StickyHotelCTA
        label={stickyLabel.label}
        cta={stickyLabel.cta}
        href={buildAllezDestLink('Arles', 'France', `${CAMPAIGN_BASE}-sticky`, 2)}
      />
    </main>
  )
}
