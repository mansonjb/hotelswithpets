import type { Metadata } from 'next'
import Link from 'next/link'
import { hasLocale, locales, type Locale } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'eurostar-with-dog'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const titles: Record<string, string> = {
    en: 'Can I Take My Dog on the Eurostar? 2026 Rules, Prices and Alternatives | HotelsWithPets.com',
    fr: 'Puis-je prendre mon chien dans l\'Eurostar ? Règles, prix et alternatives 2026 | HotelsWithPets.com',
    es: '¿Puedo llevar mi perro en el Eurostar? Normas, precios y alternativas 2026 | HotelsWithPets.com',
  }
  const descriptions: Record<string, string> = {
    en: 'The straight answer: assistance dogs only, no exceptions. Here\'s what travellers with pets actually do — Le Shuttle, ferries, Channel Tunnel alternatives, full 2026 prices and rules.',
    fr: 'La réponse directe : uniquement les chiens d\'assistance, aucune exception. Voici ce que font vraiment les voyageurs avec animaux — Le Shuttle, ferries, alternatives au tunnel sous la Manche, prix et règles 2026.',
    es: 'La respuesta directa: solo perros de asistencia, sin excepciones. Esto es lo que realmente hacen los viajeros con mascotas — Le Shuttle, ferris, alternativas al Canal de la Mancha, precios y normas completas 2026.',
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
        'x-default': `${SITE_URL}/en/guides/${SLUG}`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      type: 'article',
      publishedTime: '2026-04-27T00:00:00Z',
      modifiedTime: `${today}T00:00:00Z`,
    },
  }
}

interface Copy {
  hero: { kicker: string; h1: string; tldr: string }
  sections: Array<{ id: string; h2: string; paras: string[]; bullets?: string[] }>
  table: { caption: string; head: string[]; rows: string[][] }
  faqTitle: string
  faqs: Array<{ q: string; a: string }>
  ctaTitle: string
  ctaDesc: string
  ctaButton: string
  ctaHref: string
  relatedTitle: string
}

const COPY: Record<string, Copy> = {
  en: {
    hero: {
      kicker: 'PET TRAVEL Q&A · UPDATED 2026',
      h1: 'Can I take my dog on the Eurostar?',
      tldr: 'Short answer: no — Eurostar only accepts registered assistance dogs. Pet dogs and cats are not allowed in any class, including Premier and Business Premier. The good news: there are three reliable, dog-friendly alternatives between London and continental Europe, and we\'ll walk you through each one.',
    },
    sections: [
      { id: 'why', h2: 'Why doesn\'t Eurostar allow pets?', paras: [
        'The restriction is a safety and Channel Tunnel sanitation rule, not a commercial choice. Under the bilateral agreement governing the Channel Tunnel, the only animals authorised to cross by passenger train are registered assistance dogs and animals being transported by Eurotunnel\'s vehicle service (Le Shuttle).',
        'This rule has been in place since the Tunnel opened in 1994 and has not changed under any of Eurostar\'s ownership transitions. Brexit didn\'t affect it; the upcoming open-access competition from new cross-Channel rail operators won\'t either, because the constraint comes from the Tunnel concession itself.',
        'Eurostar staff cannot grant exceptions even for emotional support animals — UK and EU rail law treats them as pets, not assistance animals. Only certified assistance dogs (guide dogs, hearing dogs, medical alert dogs) registered with an Assistance Dogs International member organisation may travel.',
      ] },
      { id: 'shuttle', h2: 'Alternative #1 — Le Shuttle (Channel Tunnel by car)', paras: [
        'Le Shuttle (operated by Eurotunnel/Getlink) is the most popular and reliable option for travellers with pets. You drive your car directly onto a train carriage, and your pet stays with you in the vehicle for the 35-minute Tunnel crossing — no cargo hold, no separation, no stress.',
        'The pet supplement is £22 / €27 each way per pet. There is no size or breed restriction (though banned dangerous breeds under UK law cannot enter the UK at all). Up to 5 pets per vehicle. Booking happens at the regular Le Shuttle reservation step.',
        'Practical tip: pets must remain inside the vehicle during the crossing. You stay with them. There\'s a designated dog walking area at both Folkestone and Calais terminals — use it before and after the crossing for relief.',
      ] },
      { id: 'ferries', h2: 'Alternative #2 — Cross-Channel ferries (Dover–Calais, Portsmouth–Caen, etc.)', paras: [
        'P&O Ferries, DFDS and Brittany Ferries operate the main car-ferry routes between the UK and France/Spain/Netherlands. Pets are accepted on every route, generally for £20-£40 each way (pricing varies by operator and route).',
        'Most ferries require pets to remain in the vehicle on car decks during the crossing — owners typically check on them mid-crossing (announcements indicate when this is permitted). On longer overnight routes (Portsmouth–Bilbao, Hull–Rotterdam), some ships offer "pet-friendly cabins" with direct access — book these well in advance.',
        'If you\'re foot passengers (no car), only specific routes accept pets: Brittany Ferries Plymouth–Roscoff allows foot passengers with pets in a dedicated kennel area. Most other lines require a vehicle.',
      ] },
      { id: 'flights', h2: 'Alternative #3 — Short flights (London–Paris, London–Brussels, London–Amsterdam)', paras: [
        'British Airways, Air France and KLM accept dogs in the cabin (under 8 kg in carrier) on routes to/from London City and Heathrow. Larger dogs travel as IATA-compliant cargo (in-hold transport, climate-controlled).',
        'Cabin fee: typically £100-£150 per pet, each way. Cargo: £300-£500 each way for medium dogs, more for large breeds. Brachycephalic breeds (Bulldogs, Pugs, Persian cats) are banned by most airlines on summer routes and on routes that include short stopovers.',
        'In practice, flights are slower than Le Shuttle once you factor in 2h check-in, security, immigration and baggage retrieval. The Tunnel is door-to-door faster for the London-Paris/Brussels/Amsterdam range, and far less stressful for the dog.',
      ] },
      { id: 'recommendation', h2: 'Our practical recommendation', paras: [
        'For 95% of travellers between the UK and continental Europe, Le Shuttle is the right choice: cheapest pet supplement, fastest crossing, dog stays with you the entire time, no separation. Book a daytime crossing and be at the terminal 30 minutes before departure.',
        'Ferries are a viable alternative if you don\'t want to drive through Folkestone (e.g. coming from Yorkshire, Scotland or Wales) or if you want to extend the trip with a Spain/Netherlands ferry rather than driving through France.',
        'Flights are only sensible for very small dogs in cabin on long-distance routes (London-Madrid, London-Rome) where Le Shuttle would mean two days of driving. For anything within Le Shuttle\'s reach, the Tunnel wins on every metric.',
      ] },
    ],
    table: {
      caption: 'Cross-Channel options for travelling with a dog (2026 prices)',
      head: ['Option', 'Pet fee (each way)', 'Crossing time', 'Dog with you?', 'Size limit', 'Booking lead time'],
      rows: [
        ['Le Shuttle (Channel Tunnel)', '£22 / €27', '35 min', 'Yes, in your car', 'None (subject to UK BSL)', '24h'],
        ['P&O Dover–Calais', '£24', '90 min', 'In vehicle (car decks closed)', 'None', '48h'],
        ['DFDS Dover–Dunkirk', '£20', '2h', 'In vehicle', 'None', '48h'],
        ['Brittany Ferries Portsmouth–Caen', '£35', '6h', 'In vehicle or pet cabin', 'None', '7 days'],
        ['British Airways cabin (<8 kg)', '£150', '1h flight + 4h transit', 'In carrier under seat', '8 kg incl. carrier', '7 days'],
        ['British Airways cargo (>8 kg)', '£350+', '1h flight + 5h transit', 'In hold (climate-controlled)', 'No upper limit', '14 days'],
        ['Eurostar', '—', '—', 'NOT ALLOWED', 'Assistance dogs only', '—'],
      ],
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Are emotional support animals allowed on Eurostar?', a: 'No. Eurostar follows UK and EU rail law, which classifies emotional support animals as pets, not assistance animals. Only certified assistance dogs (guide, hearing, medical alert) are permitted, and the certification must come from an Assistance Dogs International member organisation.' },
      { q: 'What about the Eurostar Snap (cheap last-minute) tickets?', a: 'Same rules apply across all classes — Standard, Standard Premier, Business Premier, and Snap. There is no class on Eurostar that accepts pets.' },
      { q: 'Can I take a small dog in a carrier as carry-on?', a: 'No. Eurostar does not allow pet dogs or cats even in closed carriers. Even hamsters, rabbits and other small mammals are not permitted unless they are registered assistance animals.' },
      { q: 'Will the rule change for pet travel between London and Paris in the future?', a: 'Unlikely in the short term. The rule is set by the Channel Tunnel concession, not by Eurostar. New rail operators expected from 2026-2027 (Evolyn, FS) will face the same restriction. Pet travel by passenger train through the Tunnel would require a renegotiation of the concession.' },
      { q: 'How long does Le Shuttle take and is it really 35 minutes?', a: 'Yes — the actual rail crossing is 35 minutes from the moment the train departs. Add 30-45 minutes at the UK terminal for boarding and security check, and similar at the French side. Total terminal-to-terminal experience is roughly 90 minutes.' },
      { q: 'Do I need any paperwork for my dog on Le Shuttle?', a: 'Yes. Crossing into the UK from the EU requires an Animal Health Certificate (AHC, valid 10 days) plus mandatory tapeworm treatment given by a vet between 24h and 5 days before arrival in the UK. Crossing into the EU from the UK requires an EU pet passport or EU AHC, plus rabies vaccine valid at least 21 days.' },
      { q: 'Can I travel from London to Amsterdam with my dog and avoid driving?', a: 'Yes — take the cross-Channel ferry to Hook of Holland (Stena Line, Harwich–Hook of Holland, 7h overnight) and continue by Dutch Railways (NS) which accepts leashed dogs for €3.20/day. Or fly with KLM cabin/cargo. There is no direct rail option with pets.' },
    ],
    ctaTitle: 'Planning a London-to-Europe trip with your dog?',
    ctaDesc: 'Browse our pet-friendly hotels in Paris, Brussels, Amsterdam, and Berlin — all reachable from London by Le Shuttle in under 8 hours of driving.',
    ctaButton: 'See pet-friendly hotels →',
    ctaHref: '/en/destinations',
    relatedTitle: 'Related practical guides',
  },
  fr: {
    hero: {
      kicker: 'Q&R VOYAGE ANIMAL · MIS À JOUR 2026',
      h1: 'Puis-je prendre mon chien dans l\'Eurostar ?',
      tldr: 'Réponse courte : non — l\'Eurostar n\'accepte que les chiens d\'assistance enregistrés. Les chiens et chats domestiques ne sont autorisés dans aucune classe, y compris Premier et Business Premier. La bonne nouvelle : il existe trois alternatives fiables et accueillantes pour les chiens entre Londres et l\'Europe continentale, et nous vous expliquons chacune d\'entre elles.',
    },
    sections: [
      { id: 'why', h2: 'Pourquoi l\'Eurostar n\'accepte-t-il pas les animaux ?', paras: [
        'La restriction est une règle de sécurité et d\'hygiène du tunnel sous la Manche, pas un choix commercial. En vertu de l\'accord bilatéral régissant le tunnel, les seuls animaux autorisés à le traverser par train de voyageurs sont les chiens d\'assistance enregistrés et les animaux transportés via le service véhicules d\'Eurotunnel (Le Shuttle).',
        'Cette règle est en place depuis l\'ouverture du tunnel en 1994 et n\'a été modifiée par aucune des transitions de propriété de l\'Eurostar. Le Brexit n\'y a rien changé ; la prochaine concurrence d\'opérateurs ferroviaires transmanche n\'y changera rien non plus, car la contrainte vient de la concession du tunnel elle-même.',
        'Le personnel Eurostar ne peut accorder d\'exceptions, même pour les animaux de soutien émotionnel — la loi ferroviaire UK et UE les considère comme des animaux de compagnie, pas comme des animaux d\'assistance. Seuls les chiens d\'assistance certifiés (chiens guides, chiens d\'alerte médicale, chiens d\'assistance auditive) enregistrés auprès d\'une organisation membre d\'Assistance Dogs International peuvent voyager.',
      ] },
      { id: 'shuttle', h2: 'Alternative #1 — Le Shuttle (tunnel sous la Manche en voiture)', paras: [
        'Le Shuttle (exploité par Eurotunnel/Getlink) est l\'option la plus populaire et la plus fiable pour les voyageurs avec animaux. Vous montez votre voiture directement sur un wagon, et votre animal reste avec vous dans le véhicule pendant les 35 minutes de traversée — pas de soute, pas de séparation, pas de stress.',
        'Le supplément animal est de 22 £ / 27 € par trajet et par animal. Aucune restriction de taille ou de race (sauf races dangereuses interdites par la loi UK qui ne peuvent pas entrer au Royaume-Uni). Jusqu\'à 5 animaux par véhicule. La réservation se fait à l\'étape habituelle Le Shuttle.',
        'Conseil pratique : les animaux doivent rester dans le véhicule pendant la traversée. Vous restez avec eux. Une zone de promenade canine est aménagée aux terminaux de Folkestone et de Calais — utilisez-la avant et après la traversée pour les besoins.',
      ] },
      { id: 'ferries', h2: 'Alternative #2 — Ferries transmanche (Douvres-Calais, Portsmouth-Caen, etc.)', paras: [
        'P&O Ferries, DFDS et Brittany Ferries exploitent les principales lignes de ferry entre le Royaume-Uni et la France/l\'Espagne/les Pays-Bas. Les animaux sont acceptés sur toutes les lignes, généralement pour 20-40 £ par trajet (le tarif varie selon l\'opérateur et la ligne).',
        'La plupart des ferries exigent que les animaux restent dans le véhicule sur les ponts voitures pendant la traversée — les propriétaires les vérifient typiquement à mi-traversée (annonces indiquant quand c\'est autorisé). Sur les lignes de nuit plus longues (Portsmouth-Bilbao, Hull-Rotterdam), certains navires offrent des « cabines pet-friendly » avec accès direct — réservez-les bien à l\'avance.',
        'Si vous voyagez sans véhicule (à pied), seules certaines lignes acceptent les animaux : Brittany Ferries Plymouth-Roscoff autorise les piétons avec animaux dans une zone chenil dédiée. La plupart des autres lignes exigent un véhicule.',
      ] },
      { id: 'flights', h2: 'Alternative #3 — Vols courts (Londres-Paris, Londres-Bruxelles, Londres-Amsterdam)', paras: [
        'British Airways, Air France et KLM acceptent les chiens en cabine (moins de 8 kg en cage) sur les vols depuis et vers London City et Heathrow. Les chiens plus grands voyagent en soute via le fret IATA (climatisé).',
        'Tarif cabine : généralement 100-150 £ par animal, par trajet. Soute : 300-500 £ par trajet pour chiens moyens, plus pour les grandes races. Les races brachycéphales (Bouledogues, Carlins, Persans) sont interdites par la plupart des compagnies sur les lignes estivales et sur celles incluant de courtes escales.',
        'En pratique, les vols sont plus lents que Le Shuttle une fois pris en compte les 2h d\'enregistrement, sécurité, immigration et récupération bagages. Le tunnel est plus rapide porte-à-porte sur la portée Londres-Paris/Bruxelles/Amsterdam, et bien moins stressant pour le chien.',
      ] },
      { id: 'recommendation', h2: 'Notre recommandation pratique', paras: [
        'Pour 95 % des voyageurs entre le Royaume-Uni et l\'Europe continentale, Le Shuttle est le bon choix : supplément animal le moins cher, traversée la plus rapide, le chien reste avec vous tout le temps, pas de séparation. Réservez une traversée de jour et soyez au terminal 30 minutes avant le départ.',
        'Les ferries sont une alternative viable si vous ne voulez pas conduire jusqu\'à Folkestone (par exemple depuis le Yorkshire, l\'Écosse ou le Pays de Galles) ou si vous voulez prolonger le voyage avec un ferry vers l\'Espagne/les Pays-Bas plutôt que conduire à travers la France.',
        'Les vols ne sont sensés que pour de très petits chiens en cabine sur des lignes longue distance (Londres-Madrid, Londres-Rome) où Le Shuttle signifierait deux jours de route. Pour tout ce qui est à portée du Shuttle, le tunnel gagne sur tous les critères.',
      ] },
    ],
    table: {
      caption: 'Options transmanche pour voyager avec un chien (prix 2026)',
      head: ['Option', 'Tarif animal (par trajet)', 'Durée', 'Chien avec vous ?', 'Limite de taille', 'Délai de réservation'],
      rows: [
        ['Le Shuttle (tunnel)', '22 £ / 27 €', '35 min', 'Oui, dans la voiture', 'Aucune (sauf BSL UK)', '24h'],
        ['P&O Douvres-Calais', '24 £', '90 min', 'Dans le véhicule (ponts fermés)', 'Aucune', '48h'],
        ['DFDS Douvres-Dunkerque', '20 £', '2h', 'Dans le véhicule', 'Aucune', '48h'],
        ['Brittany Ferries Portsmouth-Caen', '35 £', '6h', 'Dans le véhicule ou cabine animal', 'Aucune', '7 jours'],
        ['British Airways cabine (<8 kg)', '150 £', '1h vol + 4h transit', 'En cage sous le siège', '8 kg cage incluse', '7 jours'],
        ['British Airways soute (>8 kg)', '350 £+', '1h vol + 5h transit', 'En soute (climatisée)', 'Sans limite haute', '14 jours'],
        ['Eurostar', '—', '—', 'NON AUTORISÉ', 'Chiens d\'assistance uniquement', '—'],
      ],
    },
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: 'Les animaux de soutien émotionnel sont-ils acceptés dans l\'Eurostar ?', a: 'Non. L\'Eurostar applique la loi ferroviaire UK et UE, qui classe les animaux de soutien émotionnel comme animaux de compagnie, pas comme animaux d\'assistance. Seuls les chiens d\'assistance certifiés (guide, audition, alerte médicale) sont autorisés, et la certification doit venir d\'une organisation membre d\'Assistance Dogs International.' },
      { q: 'Et les billets Eurostar Snap (dernière minute) ?', a: 'Mêmes règles dans toutes les classes — Standard, Standard Premier, Business Premier et Snap. Aucune classe Eurostar n\'accepte les animaux.' },
      { q: 'Puis-je prendre un petit chien en cage en bagage à main ?', a: 'Non. L\'Eurostar n\'autorise pas les chiens et chats domestiques même en cage fermée. Même les hamsters, lapins et autres petits mammifères ne sont pas autorisés s\'ils ne sont pas des animaux d\'assistance enregistrés.' },
      { q: 'La règle pour les animaux entre Londres et Paris va-t-elle changer ?', a: 'Peu probable à court terme. La règle est fixée par la concession du tunnel sous la Manche, pas par l\'Eurostar. Les nouveaux opérateurs ferroviaires attendus dès 2026-2027 (Evolyn, FS) feront face à la même restriction. Le voyage animal par train de voyageurs à travers le tunnel nécessiterait une renégociation de la concession.' },
      { q: 'Combien de temps prend Le Shuttle, est-ce vraiment 35 minutes ?', a: 'Oui — la traversée ferroviaire dure 35 minutes à partir du départ du train. Ajoutez 30-45 minutes au terminal UK pour l\'embarquement et le contrôle de sécurité, et un délai similaire côté français. L\'expérience totale terminal-à-terminal fait environ 90 minutes.' },
      { q: 'Quels documents pour mon chien sur Le Shuttle ?', a: 'Pour entrer au Royaume-Uni depuis l\'UE : un Animal Health Certificate (AHC, valable 10 jours) plus un traitement obligatoire contre l\'échinococcose administré par un vétérinaire entre 24h et 5 jours avant l\'arrivée au Royaume-Uni. Pour entrer dans l\'UE depuis le Royaume-Uni : passeport européen ou AHC UE, plus vaccin antirabique valide depuis au moins 21 jours.' },
      { q: 'Puis-je voyager de Londres à Amsterdam avec mon chien sans conduire ?', a: 'Oui — prenez le ferry transmanche jusqu\'au Hoek van Holland (Stena Line, Harwich-Hoek van Holland, 7h de nuit) puis continuez avec les chemins de fer néerlandais (NS) qui acceptent les chiens en laisse pour 3,20 € par jour. Ou volez avec KLM cabine/soute. Il n\'existe pas d\'option ferroviaire directe avec animaux.' },
    ],
    ctaTitle: 'Vous planifiez un voyage Londres-Europe avec votre chien ?',
    ctaDesc: 'Parcourez nos hôtels acceptant les animaux à Paris, Bruxelles, Amsterdam et Berlin — tous accessibles depuis Londres par Le Shuttle en moins de 8 heures de route.',
    ctaButton: 'Voir les hôtels pet-friendly →',
    ctaHref: '/fr/destinations',
    relatedTitle: 'Guides pratiques associés',
  },
  es: {
    hero: {
      kicker: 'P&R VIAJE CON MASCOTA · ACTUALIZADO 2026',
      h1: '¿Puedo llevar mi perro en el Eurostar?',
      tldr: 'Respuesta corta: no — el Eurostar solo admite perros de asistencia registrados. Los perros y gatos domésticos no se admiten en ninguna clase, incluidas Premier y Business Premier. La buena noticia: hay tres alternativas fiables y dog-friendly entre Londres y Europa continental, y te explicamos cada una.',
    },
    sections: [
      { id: 'why', h2: '¿Por qué el Eurostar no admite mascotas?', paras: [
        'La restricción es una norma de seguridad e higiene del Eurotúnel, no una decisión comercial. Según el acuerdo bilateral que rige el Eurotúnel, los únicos animales autorizados a cruzarlo en tren de pasajeros son los perros de asistencia registrados y los animales transportados mediante el servicio de vehículos de Eurotunnel (Le Shuttle).',
        'Esta norma está en vigor desde la apertura del túnel en 1994 y no ha cambiado con ninguna de las transiciones de propiedad del Eurostar. El Brexit no la afectó; la próxima competencia de operadores ferroviarios transmancha tampoco lo hará, porque la restricción viene de la concesión del túnel en sí.',
        'El personal del Eurostar no puede conceder excepciones ni siquiera para animales de soporte emocional — la legislación ferroviaria UK y UE los considera mascotas, no animales de asistencia. Solo los perros de asistencia certificados (perros guía, de alerta médica, de audición) registrados con una organización miembro de Assistance Dogs International pueden viajar.',
      ] },
      { id: 'shuttle', h2: 'Alternativa #1 — Le Shuttle (Eurotúnel en coche)', paras: [
        'Le Shuttle (operado por Eurotunnel/Getlink) es la opción más popular y fiable para viajeros con mascotas. Subes tu coche directamente a un vagón y tu mascota se queda contigo en el vehículo durante los 35 minutos de travesía — sin bodega, sin separación, sin estrés.',
        'El suplemento por mascota es de 22 £ / 27 € por trayecto y mascota. Sin restricciones de tamaño o raza (salvo las razas peligrosas prohibidas por la ley UK, que no pueden entrar en el Reino Unido). Hasta 5 mascotas por vehículo. La reserva se hace en el paso habitual de Le Shuttle.',
        'Consejo práctico: las mascotas deben permanecer dentro del vehículo durante la travesía. Tú te quedas con ellas. Hay una zona de paseo canino en las terminales de Folkestone y Calais — úsala antes y después de la travesía para que haga sus necesidades.',
      ] },
      { id: 'ferries', h2: 'Alternativa #2 — Ferris transmancha (Dover-Calais, Portsmouth-Caen, etc.)', paras: [
        'P&O Ferries, DFDS y Brittany Ferries operan las principales rutas de ferri entre el Reino Unido y Francia/España/Países Bajos. Las mascotas se admiten en todas las rutas, generalmente por 20-40 £ por trayecto (el precio varía según operador y ruta).',
        'La mayoría de los ferris exigen que las mascotas permanezcan en el vehículo en cubiertas de coches durante la travesía — los propietarios suelen revisarlas a media travesía (anuncios indican cuándo está permitido). En rutas nocturnas más largas (Portsmouth-Bilbao, Hull-Rotterdam), algunos barcos ofrecen "camarotes pet-friendly" con acceso directo — resérvalos con mucha antelación.',
        'Si viajas sin vehículo (a pie), solo ciertas rutas admiten mascotas: Brittany Ferries Plymouth-Roscoff permite peatones con mascotas en una zona perrera dedicada. La mayoría del resto de líneas requieren un vehículo.',
      ] },
      { id: 'flights', h2: 'Alternativa #3 — Vuelos cortos (Londres-París, Londres-Bruselas, Londres-Ámsterdam)', paras: [
        'British Airways, Air France y KLM admiten perros en cabina (menos de 8 kg en transportín) en rutas desde y hacia London City y Heathrow. Los perros más grandes viajan como carga IATA en bodega (climatizada).',
        'Tarifa cabina: típicamente 100-150 £ por mascota, por trayecto. Bodega: 300-500 £ por trayecto para perros medianos, más para razas grandes. Las razas braquicéfalas (Bulldogs, Carlinos, Persas) están prohibidas por la mayoría de aerolíneas en rutas estivales y en las que incluyan escalas cortas.',
        'En la práctica, los vuelos son más lentos que Le Shuttle una vez que cuentas las 2h de facturación, seguridad, inmigración y recogida de equipaje. El túnel es más rápido puerta a puerta para Londres-París/Bruselas/Ámsterdam, y mucho menos estresante para el perro.',
      ] },
      { id: 'recommendation', h2: 'Nuestra recomendación práctica', paras: [
        'Para el 95 % de los viajeros entre el Reino Unido y Europa continental, Le Shuttle es la opción correcta: suplemento de mascota más barato, travesía más rápida, el perro se queda contigo todo el tiempo, sin separación. Reserva una travesía diurna y llega a la terminal 30 minutos antes de la salida.',
        'Los ferris son una alternativa viable si no quieres conducir hasta Folkestone (por ejemplo desde Yorkshire, Escocia o Gales) o si quieres extender el viaje con un ferri a España/Países Bajos en lugar de conducir por Francia.',
        'Los vuelos solo tienen sentido para perros muy pequeños en cabina en rutas de larga distancia (Londres-Madrid, Londres-Roma) donde Le Shuttle implicaría dos días de carretera. Para todo lo que esté al alcance de Le Shuttle, el túnel gana en todos los aspectos.',
      ] },
    ],
    table: {
      caption: 'Opciones transmancha para viajar con perro (precios 2026)',
      head: ['Opción', 'Tarifa mascota (por trayecto)', 'Duración', '¿Perro contigo?', 'Límite de tamaño', 'Antelación de reserva'],
      rows: [
        ['Le Shuttle (Eurotúnel)', '22 £ / 27 €', '35 min', 'Sí, en tu coche', 'Ninguna (salvo BSL UK)', '24h'],
        ['P&O Dover-Calais', '24 £', '90 min', 'En el vehículo (cubiertas cerradas)', 'Ninguna', '48h'],
        ['DFDS Dover-Dunkerque', '20 £', '2h', 'En el vehículo', 'Ninguna', '48h'],
        ['Brittany Ferries Portsmouth-Caen', '35 £', '6h', 'En el vehículo o camarote', 'Ninguna', '7 días'],
        ['British Airways cabina (<8 kg)', '150 £', '1h vuelo + 4h tránsito', 'En transportín bajo el asiento', '8 kg incluido transportín', '7 días'],
        ['British Airways bodega (>8 kg)', '350 £+', '1h vuelo + 5h tránsito', 'En bodega (climatizada)', 'Sin límite máximo', '14 días'],
        ['Eurostar', '—', '—', 'NO PERMITIDO', 'Solo perros de asistencia', '—'],
      ],
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Se admiten animales de soporte emocional en el Eurostar?', a: 'No. El Eurostar aplica la legislación ferroviaria UK y UE, que clasifica a los animales de soporte emocional como mascotas, no como animales de asistencia. Solo se admiten perros de asistencia certificados (guía, audición, alerta médica), y la certificación debe ser de una organización miembro de Assistance Dogs International.' },
      { q: '¿Y los billetes Eurostar Snap (último minuto)?', a: 'Mismas normas en todas las clases — Standard, Standard Premier, Business Premier y Snap. Ninguna clase del Eurostar admite mascotas.' },
      { q: '¿Puedo llevar un perro pequeño en transportín como equipaje de mano?', a: 'No. El Eurostar no admite perros ni gatos domésticos ni siquiera en transportín cerrado. Tampoco hámsters, conejos ni otros pequeños mamíferos a menos que sean animales de asistencia registrados.' },
      { q: '¿Cambiará la norma para mascotas entre Londres y París en el futuro?', a: 'Improbable a corto plazo. La norma la fija la concesión del Eurotúnel, no el Eurostar. Los nuevos operadores ferroviarios previstos a partir de 2026-2027 (Evolyn, FS) tendrán la misma restricción. El viaje de mascotas en tren de pasajeros por el túnel requeriría renegociar la concesión.' },
      { q: '¿Cuánto dura Le Shuttle, son realmente 35 minutos?', a: 'Sí — la travesía ferroviaria dura 35 minutos desde la salida del tren. Suma 30-45 minutos en la terminal UK para embarque y control de seguridad, y un tiempo similar en el lado francés. La experiencia total terminal a terminal son unos 90 minutos.' },
      { q: '¿Qué papeleo necesita mi perro en Le Shuttle?', a: 'Para entrar al Reino Unido desde la UE: un Animal Health Certificate (AHC, válido 10 días) más tratamiento obligatorio contra la equinococosis administrado por un veterinario entre 24h y 5 días antes de la llegada al Reino Unido. Para entrar a la UE desde el Reino Unido: pasaporte europeo o AHC UE, más vacuna antirrábica vigente desde al menos 21 días.' },
      { q: '¿Puedo viajar de Londres a Ámsterdam con mi perro sin conducir?', a: 'Sí — coge el ferri transmancha hasta Hoek van Holland (Stena Line, Harwich-Hoek van Holland, 7h nocturno) y continúa con los ferrocarriles holandeses (NS), que admiten perros con correa por 3,20 € al día. O vuela con KLM cabina/bodega. No hay opción ferroviaria directa con mascotas.' },
    ],
    ctaTitle: '¿Planeas un viaje Londres-Europa con tu perro?',
    ctaDesc: 'Explora nuestros hoteles que admiten mascotas en París, Bruselas, Ámsterdam y Berlín — todos accesibles desde Londres en Le Shuttle en menos de 8 horas de carretera.',
    ctaButton: 'Ver hoteles pet-friendly →',
    ctaHref: '/es/destinations',
    relatedTitle: 'Guías prácticas relacionadas',
  },
  pt: {
    hero: {
      kicker: 'P&R VIAJE Com Animal · Atualizado 2026',
      h1: '¿Puedo levar mi cão no Eurostar?',
      tldr: 'Respuesta curta: no — o Eurostar só admite cães de asistencia registrados. Os cães e gatos domésticos no se admitem em ninguna clase, incluidas Premier e Business Premier. A boa noticia: hay tres alternativas fiables e pet-friendly entre Londres e Europa continental, e te explicamos cada uma.',
    },
    sections: [
      { id: 'why', h2: '¿Porquê o Eurostar no admite animais?', paras: [
        'A restricción é uma norma de seguridad e higiene do Eurotúnel, no uma decisión comercial. Segundo o acuerdo bilateral que rige o Eurotúnel, os únicos animales autorizados a cruzarlo de comboio de pasajeros são os cães de asistencia registrados e os animales transportados mediante o serviço de vehículos de Eurotunnel (Le Shuttle).',
        'Esta norma está em vigor desde a apertura do túnel en 1994 e no ha cambiado com ninguna das transiciones de propiedad do Eurostar. O Brexit no a afectó; a próxima competencia de operadores ferroviarios transmancha tampoco lo hará, porque a restricción viene da concessão do túnel em sí.',
        'O personal do Eurostar no pode conceder excepciones ni siquiera para animales de soporte emocional — a legislación ferroviaria UK e UE os considera animais, no animales de asistencia. Só os cães de asistencia certificados (cães guía, de alerta médica, de audición) registrados com uma organização miembro de Assistance Dogs International podem viajar.',
      ] },
      { id: 'shuttle', h2: 'Alternativa #1 — Le Shuttle (Eurotúnel de carro)', paras: [
        'Le Shuttle (operado por Eurotunnel/Getlink) é a opção mais popular e fiable para viajeros com animais. Subes tu carro directamente a um vagón e tu animal se queda contigo no vehículo durante os 35 minutos de travesía — sem bodega, sem separación, sem estrés.',
        'O suplemento por animal é de 22 £ / 27 € por trayecto e animal. Sem restricciones de tamanho o raza (salvo as razas peligrosas proibidas pela lei UK, que no podem entrar no Reino Unido). Até 5 animais por vehículo. A reserva se hace no paso habitual de Le Shuttle.',
        'Consejo práctico: as animais deben permanecer dentro do vehículo durante a travesía. Tú te quedas com ellas. Hay uma zona de passeio canino nas terminales de Folkestone e Calais — úsala antes e depois da travesía para que haga os seus necesidades.',
      ] },
      { id: 'ferries', h2: 'Alternativa #2 — Ferris transmancha (Dover-Calais, Portsmouth-Caen, etc.)', paras: [
        'P&O Ferries, DFDS e Brittany Ferries operan as principales rutas de ferri entre o Reino Unido e Francia/España/Países Bajos. As animais se admitem em todas as rutas, generalmente por 20-40 £ por trayecto (o preço varía segundo operador e ruta).',
        'A maioria dos ferris exigen que as animais permanezcan no vehículo em cubiertas de carros durante a travesía — os propietarios costumam revisarlas a media travesía (anuncios indican cuándo está permitido). Em rutas nocturnas mais longas (Portsmouth-Bilbao, Hull-Roterdão), algunos barcos ofrecen "camarotes pet-friendly" com acceso directo — resérvalos com muita antelación.',
        'Si viajas sem vehículo (a pé), só ciertas rutas admitem animais: Brittany Ferries Plymouth-Roscoff permite peatones com animais numa zona perrera dedicada. A mayoría do resto de líneas exigem um vehículo.',
      ] },
      { id: 'flights', h2: 'Alternativa #3 — Voos curtos (Londres-París, Londres-Bruxelas, Londres-Amesterdão)', paras: [
        'British Airways, Air France e KLM admitem cães em cabina (menos de 8 kg em transportadora) em rutas desde e hacia London City e Heathrow. Os cães mais grandes viajan como carga IATA em bodega (climatizada).',
        'Tarifa cabina: típicamente 100-150 £ por animal, por trayecto. Bodega: 300-500 £ por trayecto para cães medianos, mais para razas grandes. As razas braquicéfalas (Bulldogs, Carlinos, Persas) estão proibidas por a maioria de aerolíneas em rutas estivales e nas que incluyan escalas curtas.',
        'Na práctica, os voos são mais lentos que Le Shuttle uma vez que cuentas as 2h de facturación, seguridad, inmigración e recogida de equipaje. O túnel é mais rápido puerta a puerta para Londres-París/Bruxelas/Amesterdão, e muito menos estresante para o cão.',
      ] },
      { id: 'recommendation', h2: 'Nuestra recomendación práctica', paras: [
        'Para o 95 % dos viajeros entre o Reino Unido e Europa continental, Le Shuttle é a opção correcta: suplemento de animal mais barato, travesía mais rápida, o cão se queda contigo todo o tiempo, sem separación. Reserva uma travesía diurna e chega a a terminal 30 minutos antes da salida.',
        'Os ferris são uma alternativa viable si no quieres conducir até Folkestone (por ejemplo desde Yorkshire, Escocia o Gales) o si quieres extender o viaje com um ferri a España/Países Bajos em lugar de conducir por Francia.',
        'Os voos só têm sentido para cães muito pequenos em cabina em rutas de longa distancia (Londres-Madrid, Londres-Roma) onde Le Shuttle implicaría dos dias de carretera. Para todo lo que esté al alcance de Le Shuttle, o túnel ganha em todos os aspectos.',
      ] },
    ],
    table: {
      caption: 'Opções transmancha para viajar com cão (preços 2026)',
      head: ['Opção', 'Tarifa animal (por trayecto)', 'Duración', '¿Cão contigo?', 'Limite de tamanho', 'Antelación de reserva'],
      rows: [
        ['Le Shuttle (Eurotúnel)', '22 £ / 27 €', '35 min', 'Sí, em tu carro', 'Ninguna (salvo BSL UK)', '24h'],
        ['P&O Dover-Calais', '24 £', '90 min', 'No vehículo (cubiertas cerradas)', 'Ninguna', '48h'],
        ['DFDS Dover-Dunkerque', '20 £', '2h', 'No vehículo', 'Ninguna', '48h'],
        ['Brittany Ferries Portsmouth-Caen', '35 £', '6h', 'No vehículo o camarote', 'Ninguna', '7 dias'],
        ['British Airways cabina (<8 kg)', '150 £', '1h voo + 4h tránsito', 'Em transportadora sob o asiento', '8 kg incluido transportadora', '7 dias'],
        ['British Airways bodega (>8 kg)', '350 £+', '1h voo + 5h tránsito', 'Em bodega (climatizada)', 'Sem limite máximo', '14 dias'],
        ['Eurostar', '—', '—', 'NO PERMITIDO', 'Só cães de asistencia', '—'],
      ],
    },
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Se admitem animales de soporte emocional no Eurostar?', a: 'No. O Eurostar aplica a legislación ferroviaria UK e UE, que classifica aos animales de soporte emocional como animais, no como animales de asistencia. Só se admitem cães de asistencia certificados (guía, audición, alerta médica), e a certificación debe ser de uma organização miembro de Assistance Dogs International.' },
      { q: '¿E os bilhetes Eurostar Snap (último minuto)?', a: 'Mismas normas em todas as clases — Standard, Standard Premier, Business Premier e Snap. Ninguna clase do Eurostar admite animais.' },
      { q: '¿Puedo levar um cão pequeno em transportadora como equipaje de mano?', a: 'No. O Eurostar no admite cães ni gatos domésticos ni siquiera em transportadora cerrado. Tampoco hámsters, conejos ni otros pequenos mamíferos a menos que sean animales de asistencia registrados.' },
      { q: '¿Cambiará a norma para animais entre Londres e París no futuro?', a: 'Improbable a curto plazo. A norma a fija a concessão do Eurotúnel, no o Eurostar. Os novos operadores ferroviarios previstos a partir de 2026-2027 (Evolyn, FS) tendrán a misma restricción. O viaje de animais de comboio de pasajeros pelo túnel requeriría renegociar a concessão.' },
      { q: '¿Cuánto dura Le Shuttle, são realmente 35 minutos?', a: 'Sí — a travesía ferroviaria dura 35 minutos desde a salida do comboio. Suma 30-45 minutos na terminal UK para embarque e control de seguridad, e um tiempo similar no lado francés. A experiencia total terminal a terminal são uns 90 minutos.' },
      { q: '¿Qué burocracia necesita mi cão em Le Shuttle?', a: 'Para entrar al Reino Unido desde a UE: um Animal Health Certificate (AHC, válido 10 dias) mais tratamento obrigatório contra a equinococose administrado por um veterinário entre 24h e 5 dias antes da llegada al Reino Unido. Para entrar a a UE desde o Reino Unido: passaporte europeu o AHC UE, mais vacuna antirrábica vigente desde al menos 21 dias.' },
      { q: '¿Puedo viajar de Londres a Amesterdão com mi cão sem conducir?', a: 'Sí — coge o ferri transmancha até Hoek van Holland (Stena Line, Harwich-Hoek van Holland, 7h nocturno) e continúa com os ferrocarriles holandeses (NS), que admitem cães com trela por 3,20 € al dia. O vuela com KLM cabina/bodega. No hay opção ferroviaria directa com animais.' },
    ],
    ctaTitle: '¿Planeas um viaje Londres-Europa com tu cão?',
    ctaDesc: 'Explora nuestros hotéis que admitem animais em París, Bruxelas, Amesterdão e Berlim — todos acessíveis desde Londres em Le Shuttle em menos de 8 horas de carretera.',
    ctaButton: 'Ver hotéis pet-friendly →',
    ctaHref: '/é/destinations',
    relatedTitle: 'Guías prácticas relacionadas',
  },
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.hero.h1,
    description: c.hero.tldr,
    inLanguage: locale,
    datePublished: '2026-04-27T00:00:00Z',
    dateModified: new Date().toISOString().split('T')[0],
    author: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.ico` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/${locale}/guides/${SLUG}` },
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-900 text-white py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            🚆 {c.hero.kicker}
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">{c.hero.h1}</h1>
          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6">
            <p className="text-blue-100 text-base leading-relaxed">
              <strong className="text-white">TL;DR — </strong>{c.hero.tldr}
            </p>
          </div>
        </div>
      </section>

      {/* TOC + sections */}
      <article className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {c.sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5 leading-tight">{s.h2}</h2>
              <div className="space-y-4">
                {s.paras.map((p, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>
                ))}
              </div>
              {s.bullets && (
                <ul className="mt-5 space-y-2">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>

      {/* Comparison table */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-6 text-center">{c.table.caption}</h2>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <tr>
                  {c.table.head.map((h, i) => (
                    <th key={i} className="px-4 py-3 text-left font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {c.table.rows.map((row, i) => (
                  <tr key={i} className={i === c.table.rows.length - 1 ? 'bg-red-50' : 'hover:bg-gray-50'}>
                    {row.map((cell, j) => (
                      <td key={j} className={`px-4 py-3 ${j === 0 ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">❓ {c.faqTitle}</h2>
          <div className="space-y-4">
            {c.faqs.map((f, i) => (
              <details key={i} className="bg-gray-50 border border-gray-200 rounded-2xl group">
                <summary className="cursor-pointer p-5 font-semibold text-gray-900 list-none flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-700 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">{c.ctaTitle}</h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">{c.ctaDesc}</p>
          <Link href={c.ctaHref} className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-colors shadow-lg">
            {c.ctaButton}
          </Link>
        </div>
      </section>

      <GuideFooter locale={locale} currentSlug={SLUG} />
    </div>
  )
}
