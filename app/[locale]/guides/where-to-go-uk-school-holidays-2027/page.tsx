import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink, buildAllezLink } from '@/lib/site'
import hotels from '@/data/hotels.json'
import destinations from '@/data/destinations.json'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'where-to-go-uk-school-holidays-2027'
const CAMPAIGN_BASE = 'holidays-2027'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type LocaleKey = 'en' | 'fr' | 'es' | 'pt' | 'de'

// Each locale is its OWN country's 2027 school-holiday calendar, written in
// that language, with destination picks reachable from that country and a
// travel time framed from there. This is not a translation of one page: a
// French family cares about the French calendar, not the English one.
type Pick = { slug: string; why: string; travel: string }
type Period = { emoji: string; dates: string; label: string; trip: string; blurb: string; picks: Pick[] }
type Calendar = { periods: Period[] }

const DEST: Record<string, { name: string; country: string }> = {}
for (const d of destinations as { slug: string; name: string; country: string }[]) {
  DEST[d.slug] = { name: d.name, country: d.country }
}

const CALENDARS: Record<LocaleKey, Calendar> = {
  en: {
    periods: [
      {
        emoji: '🎆', dates: 'Fri 1 Jan 2027 · bank holiday weekend',
        label: 'New Year long weekend', trip: 'Short winter hop',
        blurb: 'Two or three nights just across the Channel. December cold suits thick-coated and senior dogs, and the festive markets are still up into the first days of January.',
        picks: [
          { slug: 'bruges', why: 'The fairytale at peak winter: frozen canals, heated café terraces that welcome a leashed dog, and cobbles flat enough for small legs.', travel: 'Le Shuttle Folkestone→Calais (35 min) + a 1 h 15 drive. The dog stays in your car the whole crossing.' },
          { slug: 'lille', why: 'A grand Flemish square, wood-panelled estaminets that seat dogs by the fire, and the closest big city to the tunnel for a two-night reset.', travel: 'Le Shuttle (35 min) + a 1 h 10 drive from Calais.' },
          { slug: 'ghent', why: 'Bruges without the crowds: floodlit medieval waterfront, canalside walks, and a student-city ease that extends to dogs on every terrace.', travel: 'Le Shuttle (35 min) + a 1 h 30 drive.' },
        ],
      },
      {
        emoji: '❄️', dates: '15–19 Feb 2027 · half term (check your council)',
        label: 'February half term', trip: 'Escape the grey: one full week',
        blurb: 'A full week is enough to justify real winter sun. The Costa del Sol sits around 17 °C in February and its dog beaches are open off-season, or stay close and cosy if the long haul is too much.',
        picks: [
          { slug: 'malaga', why: 'Winter sun with a city behind it: palm-lined promenades, February highs near 17 °C, and dog beaches (Playa del Peñón del Cuervo) open while the UK freezes.', travel: 'Portsmouth→Santander ferry (~24 h, dogs in cabins) + a long 8 h drive south. A proper expedition, best for a full week.' },
          { slug: 'nerja', why: 'The quieter beach-town alternative to Málaga, 50 km east: whitewashed lanes, the Balcón de Europa, and calm off-season coves for a swim.', travel: 'Portsmouth→Santander ferry + an 8 h 30 drive. Break it with a Madrid overnight.' },
          { slug: 'bruges', why: 'The short-and-cosy option if the drive south is too much with a dog: everything Bruges does in December it still does in half term.', travel: 'Le Shuttle (35 min) + a 1 h 15 drive. Home the same day if needed.' },
        ],
      },
      {
        emoji: '🌸', dates: '26 Mar–9 Apr 2027 · incl. Good Friday & Easter Monday',
        label: 'Easter holidays', trip: 'Two weeks: spring on the Atlantic',
        blurb: 'Two weeks over Easter is the window for the Atlantic southwest, where spring arrives early. Overnight ferries drop you in Brittany or the Basque Country rested rather than road-weary.',
        picks: [
          { slug: 'san-sebastian', why: 'Spring pintxos on terraces, the sheltered Concha bay, and Ondarreta’s off-season dog access. The ferry lands you an hour away.', travel: 'Portsmouth→Bilbao ferry (~24–32 h, cabins take dogs) + a 1 h drive east.' },
          { slug: 'biarritz', why: 'Belle-Époque surf town where spring swells roll in and several beaches allow dogs before the summer ban. Long tide-out sands for a run.', travel: 'Portsmouth→Bilbao ferry + a 45-min drive north, or Le Shuttle + a long two-day drive.' },
          { slug: 'saint-malo', why: 'A walled corsair city with huge tidal beaches; dogs are allowed on much of the sand outside high summer. Perfect first stop off the ferry.', travel: 'Portsmouth→St-Malo ferry (Brittany Ferries, ~9–11 h overnight, pet cabins). You wake up in Brittany.' },
        ],
      },
      {
        emoji: '🌷', dates: 'Mon 3 May 2027 · early May bank holiday',
        label: 'Early May bank holiday', trip: 'Long weekend: short hop',
        blurb: 'A three-day weekend is best spent within a couple of hours of the tunnel. Northern France and Belgium are green, quiet before the season, and cheap.',
        picks: [
          { slug: 'boulogne-sur-mer', why: 'The closest catch of all: a walled old town, a working fishing port, and the vast Côte d’Opale beaches where dogs run off-season.', travel: 'Le Shuttle (35 min) + a 35-min drive. The nearest continental beach town to the UK.' },
          { slug: 'lille', why: 'City-break energy an hour past Calais: parks, squares, and estaminets that treat a dog as a regular. An easy first taste of France for a puppy.', travel: 'Le Shuttle (35 min) + a 1 h 10 drive.' },
          { slug: 'bruges', why: 'Spring softens the fairytale: fewer crowds than December, canal boats restarting, and terrace weather returning to the Markt.', travel: 'Le Shuttle (35 min) + a 1 h 15 drive.' },
        ],
      },
      {
        emoji: '🌊', dates: 'Mon 31 May 2027 + 31 May–4 Jun · half term',
        label: 'Spring bank holiday & May half term', trip: 'A week on the Brittany coast',
        blurb: 'Late-May half term lands before the French school holidays, so Brittany’s wild beaches are warm enough to enjoy and still empty. The overnight ferry makes it a rested week, not a drive.',
        picks: [
          { slug: 'saint-malo', why: 'Base for the Emerald Coast: ramparts, the biggest tides in Europe, and miles of dog-friendly sand at low water.', travel: 'Portsmouth→St-Malo ferry overnight (pet cabins). The ferry drops you at the door.' },
          { slug: 'carnac', why: 'The megalith fields plus a gentle family beach; several Morbihan beaches allow leashed dogs in the shoulder season either side of summer.', travel: 'Portsmouth→St-Malo ferry + a 1 h 45 drive down the Morbihan coast.' },
          { slug: 'quiberon', why: 'A thin wild peninsula with the dramatic Côte Sauvage on one side and calm bays on the other. Coastal paths made for a long-lead walk.', travel: 'Portsmouth→St-Malo ferry + a 2 h drive onto the peninsula.' },
        ],
      },
      {
        emoji: '☀️', dates: '~22 Jul–1 Sep 2027 · summer holidays',
        label: 'Summer holidays', trip: 'Six weeks: go far, but go cool',
        blurb: 'Six weeks is the time to go far. The one rule with a dog: skip the peak-summer Mediterranean, where 35 °C tarmac burns paws and midday walks are unsafe. Aim for altitude, lakes, or the cooler Atlantic instead.',
        picks: [
          { slug: 'annecy', why: 'The turquoise Alpine lake with a dog beach (Plage des Marquisats), shaded lakeshore paths, and cool evenings a Mediterranean resort never gets.', travel: 'Le Shuttle (35 min) + a long drive best broken over two days, or fly to Geneva (40 min away).' },
          { slug: 'san-sebastian', why: 'The Atlantic keeps the Basque coast 8–10 °C below the Med in August. Ocean breezes, green hills, and early-morning dog hours on the beaches.', travel: 'Portsmouth→Bilbao ferry (~24–32 h) + a 1 h drive. The low-stress option for a dog.' },
          { slug: 'salzburg', why: 'A basecamp for the Salzkammergut lakes: swim your dog in the Wolfgangsee, walk cool forest trails, and escape the valley heat by climbing.', travel: 'Le Shuttle (35 min) + a two-day drive across Germany. A long haul that only makes sense for the six-week break.' },
        ],
      },
      {
        emoji: '🍦', dates: 'Mon 30 Aug 2027 · summer bank holiday',
        label: 'Summer bank holiday', trip: 'Long weekend: short to medium',
        blurb: 'The last long weekend of summer. Stay within a half-day of the Channel and pick a walkable city where late-August terraces still run warm.',
        picks: [
          { slug: 'ghent', why: 'Canalside evenings without Bruges’ crowds, and the tail end of the summer festival season.', travel: 'Le Shuttle (35 min) + a 1 h 30 drive.' },
          { slug: 'amsterdam', why: 'Parks, ferries and canal walks in a city built for dogs; the overnight ferry means the dog crosses asleep and you skip the drive.', travel: 'Harwich→Hook of Holland ferry (Stena, ~7 h, pet-friendly cabins), or Le Shuttle + a 3 h drive.' },
          { slug: 'bruges', why: 'Warm-stone evenings and quiet early mornings before the day-trippers arrive. The reliable short hop for any season.', travel: 'Le Shuttle (35 min) + a 1 h 15 drive.' },
        ],
      },
      {
        emoji: '🍂', dates: '25–29 Oct 2027 · half term',
        label: 'October half term', trip: 'A week chasing the last warmth',
        blurb: 'By late October the UK is done, but Iberia still runs mild. A week is enough for the far southwest, where sea temperatures hold and the dog beaches have reopened after the summer bans.',
        picks: [
          { slug: 'porto', why: 'October highs near 21 °C, riverside walks along the Douro, and Atlantic beaches at Foz that welcome dogs again once summer ends.', travel: 'Portsmouth→Santander ferry (~24 h) + a 5 h drive west. Milder and shorter than heading to southern Spain.' },
          { slug: 'lisbon', why: 'Warm light into November, miradouro viewpoints, and the Cascais coast a short train away with off-season dog beaches.', travel: 'Portsmouth→Santander ferry + a 7 h drive, or fly and hire a pet-friendly car.' },
          { slug: 'biarritz', why: 'A closer autumn option: the Basque coast stays mild and the summer dog bans lift, so the big beaches open back up for a run.', travel: 'Portsmouth→Bilbao ferry (~24–32 h) + a 45-min drive north.' },
        ],
      },
      {
        emoji: '🎄', dates: '~20 Dec 2027–early Jan · substitute bank hols Mon 27 & Tue 28 Dec',
        label: 'Christmas holidays', trip: 'Christmas markets: short to medium',
        blurb: 'The markets are the reason to travel in December, and the cold genuinely suits dogs. Everything here is within a day’s drive of the tunnel; see our full dog-friendly Christmas market guide for the etiquette.',
        picks: [
          { slug: 'bruges', why: 'The Wintermärkt on the Markt, the Belfort glowing above, and the quieter Simon Stevin market that suits a dog better. The classic short hop.', travel: 'Le Shuttle (35 min) + a 1 h 15 drive.' },
          { slug: 'lille', why: 'A big Christmas market and a Ferris wheel on the Grand-Place, an hour from Calais, with warm estaminets to duck into between stalls.', travel: 'Le Shuttle (35 min) + a 1 h 10 drive.' },
          { slug: 'cologne', why: 'Seven markets in one walkable city and Germany’s lowest pet supplements. An easy motorway run once you are through the tunnel.', travel: 'Le Shuttle (35 min) + a 3 h 30 drive up the A4.' },
        ],
      },
    ],
  },
  fr: { periods: [
    { emoji: '⛷️', dates: `Vacances d'hiver · Zones A/B/C, échelonné du 6 fév au 8 mars 2027`, label: `Vacances d'hiver`, trip: `Semaine ski ou soleil d'hiver`, blurb: `Trois semaines de vacances qui s'étalent selon les zones, de quoi choisir entre montagne enneigée et soleil du sud. Avec un chien, on privilégie les stations qui autorisent les sentiers hors pistes ou les destinations où il fait encore doux dehors.`, picks: [
      { slug: 'chamonix', why: `Les sentiers damés autour du village restent ouverts aux chiens en laisse, loin des remontées mécaniques où ils sont interdits. Les balades entre sapins enneigés et vue sur le Mont-Blanc sont idéales pour un chien qui aime le froid sec.`, travel: `3h40 de TGV depuis Paris, chien en cabine si moins de 6kg, sinon en laisse avec billet chien (environ 50% du tarif 2nde classe)` },
      { slug: 'malaga', why: `En février, la Costa del Sol tourne autour de 17-18°C, parfait pour de longues marches côtières sans la chaleur estivale. Plusieurs plages hors saison touristique tolèrent les chiens même si l'interdiction officielle reste en vigueur l'été.`, travel: `vol direct 2h20 depuis Paris (chien en cabine sous 8kg, en soute climatisée au-delà) ou route 15h via l'Espagne` },
      { slug: 'tenerife', why: `Climat printanier toute l'année (20-22°C en février), sentiers volcaniques du Teide et plages de sable noir acceptant les chiens en dehors des zones surveillées. Une vraie coupure hivernale sans neige ni canicule.`, travel: `vol direct 4h30 depuis Paris, chien en soute pour la plupart des gabarits (formalités carnet européen à vérifier avant réservation)` },
    ] },
    { emoji: '🐣', dates: `Pont de Pâques · Vendredi Saint 26 mars (Alsace-Moselle) et lundi de Pâques 29 mars 2027`, label: `Pont de Pâques`, trip: `Week-end prolongé de printemps`, blurb: `Un long week-end de quatre jours pour les Alsaciens et Mosellans, trois jours pour le reste de la France. Assez court pour rester proche, avec des villes à taille humaine et déjà les terrasses de printemps.`, picks: [
      { slug: 'strasbourg', why: `Le vendredi saint est férié sur place, donc un vrai pont local. Les quais de la Petite France et le parc de l'Orangerie offrent de longues balades ombragées, avec de nombreux cafés qui acceptent les chiens en terrasse.`, travel: `1h50 de TGV depuis Paris, chien en laisse et muselé recommandé (billet chien environ 7 euros en 2nde classe)` },
      { slug: 'colmar', why: `Ville compacte et piétonne, facile à parcourir avec un chien sans voiture. Les canaux de la Petite Venise et les vignes alentour se prêtent bien à des balades tranquilles hors des grosses foules estivales.`, travel: `2h30 de TGV avec correspondance depuis Paris, ou 5h30 de route` },
      { slug: 'bruges', why: `Ville plate et sans grand trafic, très confortable pour un chien qui marche : canaux, pavés et parcs se suivent sans dénivelé. Les Belges sont globalement tolérants avec les chiens en terrasse et dans les parcs.`, travel: `4h de route depuis Paris ou train avec changement à Lille/Bruxelles (environ 3h30)` },
    ] },
    { emoji: '🌸', dates: `Vacances de printemps · Zones A/B/C, échelonné du 3 avril au 3 mai 2027`, label: `Vacances de printemps`, trip: `Deux semaines de douceur avant l'été`, blurb: `Les températures grimpent doucement sans encore taper fort, c'est la fenêtre idéale pour la côte atlantique ou une escapade un peu plus lointaine chez nos voisins ibériques. Les plages retrouvent leur accès libre avant les interdictions estivales.`, picks: [
      { slug: 'ile-de-re', why: `L'île est un terrain de jeu pour chiens toute l'année hors juillet-août, où certaines plages restent accessibles même en pleine saison si le chien est tenu en laisse. Pistes cyclables plates et location de vélos avec panier chien très courante.`, travel: `2h40 de TGV Paris-La Rochelle puis 30 min de route sur le pont de l'île, chien en laisse obligatoire dans le train` },
      { slug: 'saint-malo', why: `Les remparts et la plage du Sillon se parcourent facilement en laisse, avec vue permanente sur la mer. Hors saison estivale, le chien peut courir librement sur une bonne partie du sable à marée basse.`, travel: `2h10 de TGV depuis Paris, chien accepté en cabine ou en laisse selon gabarit (billet chien demi-tarif)` },
      { slug: 'porto', why: `Ville vallonnée mais très marchable, avec les quais du Douro et le parc de la Cidade agréables pour de longues balades. Le climat d'avril reste doux (16-18°C), sans la chaleur du Portugal en été.`, travel: `vol direct 2h depuis Paris (chien en cabine sous 8kg, en soute au-delà) ou route de 13h` },
    ] },
    { emoji: '🌤️', dates: `Pont de l'Ascension · Jeudi 6 mai, pont recommandé vendredi 7 mai 2027`, label: `Pont de l'Ascension`, trip: `Week-end de quatre jours`, blurb: `En posant le vendredi, ce pont offre quatre jours pleins, assez pour rejoindre les lacs alpins ou le Pays basque sans se presser. La météo de début mai est encore fraîche en montagne, idéale pour un chien actif.`, picks: [
      { slug: 'annecy', why: `Le tour du lac à pied ou à vélo se fait très bien avec un chien, et la Vieille Ville regorge de terrasses ombragées au bord des canaux. Baignade autorisée pour les chiens sur certaines plages en dehors des zones surveillées.`, travel: `3h40 de TGV depuis Paris, chien en laisse (billet chien environ 50% du tarif)` },
      { slug: 'geneva', why: `Les rives du lac Léman et le Jardin Anglais offrent de grands espaces verts où les chiens circulent librement en laisse. Ville très propre et organisée pour les balades urbaines avec animal.`, travel: `3h10 de TGV Lyria depuis Paris, chien en laisse et muselé dans certains transports genevois` },
      { slug: 'san-sebastian', why: `La promenade de la Concha se fait toute l'année avec un chien tenu en laisse, et les collines autour offrent des sentiers plus sauvages pour le laisser courir. Ambiance décontractée et terrasses très tolérantes envers les chiens.`, travel: `5h de TGV jusqu'à Hendaye puis 30 min de route, ou 8h de route directe depuis Paris` },
    ] },
    { emoji: '🌷', dates: `Pont de la Pentecôte · Lundi 17 mai 2027 (week-end du 15 au 17 mai)`, label: `Pont de Pentecôte`, trip: `Week-end de trois jours`, blurb: `Un pont plus court, parfait pour une escapade en France ou juste de l'autre côté de la frontière nord, où le climat reste tempéré et les villes sont faites pour marcher.`, picks: [
      { slug: 'lille', why: `Ville plate et compacte, avec le parc de la Citadelle qui offre plusieurs kilomètres de sentiers boisés pour un chien qui a besoin de se dépenser. Vieux-Lille et ses terrasses acceptent facilement les chiens.`, travel: `1h de TGV depuis Paris, chien en laisse (billet chien environ 7 euros)` },
      { slug: 'brussels', why: `Le Bois de la Cambre et le parc du Cinquantenaire sont de vastes espaces verts où laisser courir un chien loin de la circulation. Ville habituée aux chiens en terrasse, y compris dans les cafés du centre.`, travel: `1h25 de Thalys/TGV depuis Paris, chien en laisse obligatoire` },
      { slug: 'vannes', why: `Le port et les remparts du centre historique se visitent facilement en laisse, et le golfe du Morbihan tout proche offre des sentiers côtiers moins fréquentés que la façade atlantique classique.`, travel: `2h30 de TGV depuis Paris, chien en laisse (billet chien demi-tarif en 2nde classe)` },
    ] },
    { emoji: '🏖️', dates: `Vacances d'été · À partir du samedi 3 juillet 2027 jusqu'à fin août`, label: `Vacances d'été`, trip: `Grandes vacances, deux mois complets`, blurb: `La longue coupure de l'année, mais aussi la période la plus délicate pour un chien : chaleur, plages interdites l'été sur la Méditerranée, bitume brûlant. On privilégie l'Atlantique, la Bretagne ou l'altitude, où les températures restent supportables.`, picks: [
      { slug: 'cap-ferret', why: `La pinède offre de l'ombre en continu et certaines plages du côté océan restent accessibles aux chiens tenus en laisse hors haute saison stricte. L'air marin et les températures plus fraîches qu'en Méditerranée sont un vrai confort pour l'animal.`, travel: `6h de route depuis Paris via Bordeaux, ou TGV jusqu'à Bordeaux (2h04) puis 1h de route` },
      { slug: 'quiberon', why: `La Côte Sauvage et ses sentiers de douanier permettent de longues marches ventées et jamais étouffantes, même en plein été. Plusieurs criques restent tolérantes aux chiens en dehors des zones de baignade surveillée.`, travel: `4h30 en train avec correspondance à Rennes ou Auray, ou 5h de route depuis Paris` },
      { slug: 'interlaken', why: `Entre les lacs de Thoune et Brienz, l'altitude garde des températures modérées même en août, et les rives herbeuses sont accessibles aux chiens en laisse. Nombreux sentiers de randonnée ombragés en forêt autour des lacs.`, travel: `6h de train avec changement à Bâle ou Berne depuis Paris, ou 7h de route` },
    ] },
    { emoji: '🍂', dates: `Vacances de la Toussaint · Du samedi 23 octobre au lundi 8 novembre 2027`, label: `Vacances de la Toussaint`, trip: `Deux semaines d'automne`, blurb: `Les températures redeviennent agréables pour marcher toute la journée sans souffrir de la chaleur, et les plages du littoral rouvrent officiellement aux chiens. Bon moment aussi pour une ville italienne encore douce en automne.`, picks: [
      { slug: 'bordeaux', why: `Les quais de Garonne réaménagés en promenade continue sur plusieurs kilomètres sont parfaits pour un chien qui a besoin de marcher longtemps. Le jardin public et ses grandes pelouses complètent bien le séjour.`, travel: `2h04 de TGV depuis Paris, chien en laisse (billet chien demi-tarif)` },
      { slug: 'carcassonne', why: `La Cité médiévale se visite entièrement à pied, remparts inclus, et la campagne environnante offre des sentiers vallonnés encore doux fin octobre. Moins de foule qu'en été, donc plus de tranquillité pour un chien nerveux en ville.`, travel: `4h30 de TGV depuis Paris (changement possible à Toulouse), ou 7h30 de route` },
      { slug: 'turin', why: `Ville aux longues arcades qui protègent de la pluie automnale, et le parc du Valentino le long du Pô est un grand espace vert pour lâcher le chien en laisse longue. Climat encore doux (15-18°C) début novembre.`, travel: `5h30 de train avec changement à Lyon ou Milan depuis Paris, ou 6h30 de route` },
    ] },
    { emoji: '🍁', dates: `Pont du 11 novembre · Jeudi 11 novembre, pont recommandé vendredi 12 novembre 2027`, label: `Pont du 11 novembre`, trip: `Week-end de quatre jours`, blurb: `En posant le vendredi, ce pont d'automne permet une escapade urbaine de quatre jours, sans viser trop loin puisque les journées raccourcissent déjà bien.`, picks: [
      { slug: 'lyon', why: `Les berges du Rhône et de la Saône forment un long ruban de promenade continue, très pratique pour un chien qui a besoin de sortir plusieurs fois par jour sans reprendre la voiture. Ville dense mais bien pourvue en parcs.`, travel: `2h de TGV depuis Paris, chien en laisse (billet chien demi-tarif en 2nde classe)` },
      { slug: 'reims', why: `Ville à taille humaine, facile à couvrir à pied, avec le parc de Champagne et ses grandes pelouses pour un chien qui a besoin de se défouler après le voyage. Bon point de chute pour un pont sans trop rouler.`, travel: `45 min de TGV depuis Paris, chien en laisse (billet chien environ 7 euros)` },
      { slug: 'cologne', why: `Les rives du Rhin offrent des kilomètres de promenade plane, et la ville reste praticable même sous la pluie de novembre grâce aux nombreuses galeries couvertes. Bonne tolérance générale envers les chiens en intérieur.`, travel: `3h15 d'ICE/Thalys depuis Paris, chien en laisse obligatoire dans les trains allemands` },
    ] },
    { emoji: '🎄', dates: `Vacances de Noël · Du samedi 18 décembre 2027 au lundi 3 janvier 2028`, label: `Vacances de Noël`, trip: `Deux semaines de fêtes et de froid`, blurb: `Marchés de Noël, neige en montagne ou simplement un cocon au chaud, cette période se prête aussi bien à une ville illuminée qu'à une station alpine hors ski. Attention au froid mordant pour les petites races et aux pattes sur le sel de déneigement.`, picks: [
      { slug: 'freiburg', why: `Petite ville universitaire très marchable, avec la Forêt-Noire à quelques minutes pour de longues balades enneigées loin des marchés bondés. Ambiance festive mais moins écrasante que dans les grandes métropoles allemandes.`, travel: `2h de TGV Strasbourg puis 1h de route ou train régional depuis Paris (environ 5h au total)` },
      { slug: 'munich', why: `L'Englischer Garten reste ouvert et enneigé en décembre, un grand parc où les chiens circulent librement en laisse même pendant les fêtes. La ville reste praticable à pied malgré la foule des marchés de Noël.`, travel: `6h de train avec changement à Stuttgart depuis Paris, ou vol direct 1h40 (chien en soute pour la plupart des gabarits)` },
      { slug: 'salzburg', why: `Décor de montagne enneigée dès la sortie de ville, avec des sentiers autour de la forteresse offrant de belles balades hivernales. Ambiance de marché de Noël plus intimiste qu'à Munich ou Vienne.`, travel: `vol avec escale environ 3h30 depuis Paris ou train de nuit/jour long (8-9h), chien en soute ou en laisse selon le trajet` },
    ] },
  ] },
  es: { periods: [
    { emoji: '🎄', dates: `Navidad y Año Nuevo · 24 dic 2026 - 6 ene 2027`, label: `Navidad y Reyes`, trip: `escapada de invierno con calor garantizado`, blurb: `Las vacaciones de Navidad son las más largas del curso escolar y el frío empuja a buscar sol. Canarias es la apuesta segura para huir del invierno peninsular sin salir de España, mientras el sur peninsular ofrece luz suave y menos gente que en verano.`, picks: [
      { slug: 'tenerife', why: `18-22°C en pleno enero y playas donde el perro puede correr fuera de temporada alta de baño. El Teide y los senderos de Anaga son ideales para rutas largas con el perro suelto en tramos permitidos.`, travel: `vuelo directo desde la Península, 2 h 30-3 h (transportín en cabina o bodega climatizada según peso)` },
      { slug: 'cadiz', why: `Clima templado todo el año y un paseo marítimo interminable para pasear al perro en Nochevieja sin agobios. La playa de la Victoria admite perros fuera de temporada alta.`, travel: `5 h 30 en coche desde Madrid, o AVE a Sevilla y coche final` },
      { slug: 'marbella', why: `Diciembre en la Costa del Sol se disfruta en manga corta al mediodía, con paseos por el casco antiguo y playas caninas activas fuera de julio-agosto.`, travel: `6 h en coche desde Madrid, o vuelo a Málaga (1 h) y 45 min en coche` },
    ] },
    { emoji: '🎁', dates: `Puente de Reyes · 6 ene 2027 (miércoles), festivo suelto`, label: `Puente de Reyes`, trip: `escapada corta de invierno`, blurb: `Reyes cae en miércoles en 2027, así que muchas familias hacen puente tomando el 4 y 5 de enero. Perfecto para una escapada corta a una ciudad con encanto y ambiente navideño todavía en pie.`, picks: [
      { slug: 'santiago-de-compostela', why: `El casco histórico bajo la lluvia fina gallega tiene un encanto especial en enero, con soportales para pasear al perro resguardado y menos peregrinos que en verano.`, travel: `5 h 30 en coche desde Madrid, o AVE a Ourense y coche final (1 h)` },
      { slug: 'cordoba', why: `La Judería vacía de turistas en enero se recorre tranquilamente con el perro, y las temperaturas suaves del interior andaluz invitan a caminar todo el día.`, travel: `1 h 45 en AVE desde Madrid (perro pequeño en transportín, plan piloto para perros grandes en algunos trenes)` },
    ] },
    { emoji: '🐣', dates: `Semana Santa · 21-28 marzo 2027 (Domingo de Resurrección 28 marzo, Viernes Santo 26 marzo festivo nacional)`, label: `Semana Santa`, trip: `vacaciones de primavera, procesiones y naturaleza`, blurb: `Una semana completa fuera del colegio, con la primavera ya asentada en la mitad sur y todavía fresca en el norte. Buen momento para ciudades con procesiones o para adelantarse a la playa antes de las restricciones del verano.`, picks: [
      { slug: 'seville', why: `Las procesiones llenan el centro, así que mejor buscar barrios tranquilos como Triana para pasear al perro; los parques como María Luisa dan espacio de sobra fuera del gentío.`, travel: `2 h 30 en AVE desde Madrid (transportín obligatorio para perros pequeños)` },
      { slug: 'granada', why: `Marzo permite combinar Alhambra desde fuera, paseo por el Albaicín y una escapada a Sierra Nevada, todavía con nieve residual, para rutas de montaña con el perro.`, travel: `4 h 30 en coche desde Madrid, o AVE a Antequera y coche final (1 h)` },
      { slug: 'porto', why: `Fuera de las fechas de procesiones españolas, Oporto en primavera tiene un clima suave y un paseo por el Duero con muelles perfectos para perros curiosos.`, travel: `6 h en coche desde Madrid, o vuelo a Oporto (1 h 30)` },
    ] },
    { emoji: '🌷', dates: `Puente del 1 de mayo · sábado 1 mayo 2027 (puente si se enlaza con el fin de semana previo)`, label: `Puente de mayo`, trip: `escapada de primavera cercana`, blurb: `El 1 de mayo cae en sábado en 2027, así que el puente natural es tomarse el viernes 30 de abril para alargar el fin de semana. Ideal para destinos a menos de 4-5 horas con playas y montaña todavía sin restricciones estivales.`, picks: [
      { slug: 'san-sebastian', why: `La bahía de la Concha en mayo, con temperatura suave y la playa de Ondarreta admitiendo perros fuera de temporada alta, es perfecta para paseos largos junto al mar.`, travel: `5 h en coche desde Madrid, o AVE a Vitoria y coche final (1 h)` },
      { slug: 'zaragoza', why: `Punto intermedio con parques enormes junto al Ebro y el Parque Grande, ideal para una escapada corta sin planificación de rutas largas en coche.`, travel: `1 h 20 en AVE desde Madrid (transportín obligatorio) o Barcelona (1 h 30)` },
    ] },
    { emoji: '☀️', dates: `Vacaciones de verano · finales de junio a principios de septiembre 2027 (varía según comunidad)`, label: `Verano`, trip: `vacaciones largas, costa fresca`, blurb: `Las vacaciones más largas del año, pero también las de más calor en el interior y el Mediterráneo. Julio y agosto conviene buscar el Atlántico norte, islas con brisa constante o el Pirineo, y recordar que muchas playas restringen perros en temporada alta salvo tramos habilitados.`, picks: [
      { slug: 'a-coruna', why: `Temperaturas de 22-24°C en pleno agosto y un paseo marítimo de 13 km con tramos caninos habilitados, muy lejos del calor sofocante del sur en esta época.`, travel: `5 h 45 en coche desde Madrid, o vuelo (1 h 15)` },
      { slug: 'santander', why: `El Sardinero y la bahía ofrecen playas frescas y varias zonas caninas activas todo el verano, con el clima más templado de la costa española en agosto.`, travel: `4 h 30 en coche desde Madrid, o AVE-avant a Santander (4 h)` },
      { slug: 'sanxenxo', why: `Rías Baixas con agua más fría que el Mediterráneo pero playas espaciosas y menos masificadas, buena opción para escapar del calor extremo del interior.`, travel: `6 h en coche desde Madrid, o vuelo a Vigo (1 h 15) y coche final (30 min)` },
    ] },
    { emoji: '🏛️', dates: `Puente del Pilar · martes 12 octubre 2027 (Fiesta Nacional, puente si se toma el lunes 11)`, label: `Puente de octubre`, trip: `escapada de otoño, ciudad y naturaleza`, blurb: `El 12 de octubre cae en martes en 2027, así que tomando el lunes 11 se consiguen cuatro días seguidos. El otoño temprano trae temperaturas ideales para recorrer ciudades o hacer rutas de senderismo sin el calor del verano.`, picks: [
      { slug: 'bilbao', why: `Octubre trae temperaturas suaves para recorrer la ría y el Casco Viejo, con parques como Doña Casilda cerca del Guggenheim para pasear al perro entre visita y visita.`, travel: `4 h en coche desde Madrid, o AVE a Vitoria y coche final (1 h)` },
      { slug: 'biarritz', why: `El otoño vacía las playas de surfistas de verano y muchas admiten perros fuera de temporada alta, con paseos por la Grande Plage al atardecer.`, travel: `5 h en coche desde Madrid, o AVE a Hendaya y coche final (30 min)` },
      { slug: 'valencia', why: `Clima todavía cálido pero sin el agobio del verano, con la playa de Pinedo habilitada para perros y el cauce del Turia como parque lineal infinito.`, travel: `1 h 40 en AVE desde Madrid (transportín obligatorio)` },
    ] },
    { emoji: '🕯️', dates: `Puente de Todos los Santos · lunes 1 noviembre 2027`, label: `Puente de Todos los Santos`, trip: `escapada corta de otoño`, blurb: `El 1 de noviembre cae en lunes en 2027, dando un puente natural de tres días. Buen momento para una escapada corta a una ciudad con encanto otoñal antes del frío de diciembre.`, picks: [
      { slug: 'toledo', why: `El casco histórico en noviembre, sin el calor ni las aglomeraciones del verano, se recorre a pie con el perro por callejuelas empedradas y miradores sobre el Tajo.`, travel: `35 min en AVE desde Madrid (transportín obligatorio) o 1 h en coche` },
      { slug: 'girona', why: `El casco antiguo junto al río Onyar y los alrededores del Empordà ofrecen rutas de senderismo suaves con clima otoñal muy agradable.`, travel: `6 h 30 en coche desde Madrid, o AVE a Barcelona y coche final (1 h 15)` },
    ] },
    { emoji: '🎅', dates: `Puente de la Constitución · lunes 6 y miércoles 8 diciembre 2027 (Constitución e Inmaculada)`, label: `Puente de diciembre`, trip: `escapada de invierno temprano`, blurb: `En 2027 la Constitución cae en lunes y la Inmaculada en miércoles, así que tomando también el martes 7 se logra un puente de seis días. Momento ideal para adelantarse al frío fuerte con una escapada de ciudad o de sol suave.`, picks: [
      { slug: 'lisbon', why: `Clima más templado que Madrid en diciembre y un paseo por el Tajo hasta Belém con muchas terrazas pet-friendly para hacer una pausa con el perro.`, travel: `6 h en coche desde Madrid, o vuelo (1 h 20)` },
      { slug: 'malaga', why: `Diciembre en Málaga capital todavía se disfruta en terraza, con el paseo del Muelle Uno y playas fuera de temporada alta admitiendo perros.`, travel: `2 h 30 en AVE desde Madrid (transportín obligatorio)` },
      { slug: 'las-palmas', why: `Para quien quiera aprovechar el puente largo con sol garantizado, Gran Canaria mantiene 20°C en diciembre y playas urbanas como Las Canteras con tramos caninos.`, travel: `vuelo directo desde la Península, 2 h 45` },
    ] },
  ] },
  pt: { periods: [
    { emoji: '🎄', dates: `Natal · 16 dez 2026 a 3 jan 2027`, label: `Férias de Natal`, trip: `escapadela longa de inverno`, blurb: `Duas semanas dão para fugir do frio com o cão sem pressa. Boa altura para trocar a chuva por sol ameno no Algarve, na Madeira ou já em Espanha, sempre com paragens frequentes para pernas esticadas.`, picks: [
      { slug: 'tavira', why: `Inverno ameno, ria calma para passeios longos com trela e muito menos gente que no verão. As esplanadas do centro histórico costumam aceitar cães deitados ao pé da mesa.`, travel: `cerca de 3h de carro desde Lisboa (A2), ou comboio Intercidades até Faro com transportadora para cão pequeno` },
      { slug: 'funchal', why: `Clima ameno o ano inteiro, ideal para fugir ao frio do continente. Levadas e miradouros dão caminhadas suaves, mas o cão precisa de boa condição física para os desníveis.`, travel: `voo Lisboa-Funchal, cerca de 1h30 (cão pequeno em cabine, animais maiores no porão climatizado, confirmar sempre com a companhia)` },
      { slug: 'seville', why: `Cidade plana e caminhável, ótima para o cão explorar parques como o María Luisa. Dezembro traz luzes de Natal e temperatura suave, sem o calor sufocante do verão andaluz.`, travel: `cerca de 4h de carro desde Lisboa (A6/A5, via Badajoz), com paragens a cada 2h` },
    ] },
    { emoji: '🎭', dates: `Carnaval · 6 a 10 fev 2027 (terça 9 fev)`, label: `Férias de Carnaval`, trip: `ponte curta de inverno`, blurb: `Cinco dias sem aulas, de sábado a quarta-feira. Dá para uma escapadela perto de casa, cidade com folia ou costa tranquila fora de época, sem quilómetros a mais.`, picks: [
      { slug: 'porto', why: `Cidade compacta e com muita vida na rua durante o Carnaval, boa para passear o cão pelas Ribeiras sem ser preciso o carro. Fora do verão, os cães entram em mais esplanadas.`, travel: `3h de carro desde Lisboa, ou 2h45 de Alfa Pendular (cão pequeno em transportadora)` },
      { slug: 'peniche', why: `Fora da época balnear, as praias ficam livres da proibição de cães, ótimo para correr à beira-mar sem trela. Ventoso mas tranquilo, longe da confusão do Carnaval urbano.`, travel: `1h30 de carro desde Lisboa` },
      { slug: 'santiago-de-compostela', why: `Casco histórico de pedra, fresco e caminhável, com muitos cães locais e donos habituados a cruzar-se com outros animais. Boa desculpa para atravessar a fronteira numa ponte mais longa.`, travel: `cerca de 3h de carro desde o Porto (A3/AP-9)` },
    ] },
    { emoji: '🐣', dates: `Páscoa · 22 mar a 4 abr 2027 (Páscoa 28 mar)`, label: `Férias da Páscoa`, trip: `interrupção da primavera`, blurb: `Quase duas semanas de primavera, temperatura ainda amena para andar de carro com o cão sem sofrer com o calor. Dá para ficar por Portugal ou avançar até Espanha com calma.`, picks: [
      { slug: 'coimbra', why: `Jardim Botânico e as margens do Mondego dão caminhadas longas à sombra, sem calor a incomodar o cão. Cidade estudantil mas tranquila fora dos picos de verão.`, travel: `2h de carro desde Lisboa, ou comboio Alfa Pendular (cerca de 1h45)` },
      { slug: 'salamanca', why: `Praças de pedra dourada e largas, fáceis de percorrer com o cão sem multidões de verão. Boa base para uma ponte mais longa em Espanha com paragens confortáveis.`, travel: `cerca de 3h30 de carro desde o Porto` },
      { slug: 'cordoba', why: `Fora do calor extremo do verão andaluz, o casco histórico e as margens do Guadalquivir dão para explorar a bom ritmo com o cão, com pausas frequentes à sombra.`, travel: `cerca de 6h de carro desde Lisboa via Badajoz, melhor dividir em duas etapas com o cão` },
    ] },
    { emoji: '🌷', dates: `Ponte de abril/maio · 24-25 abr e 1-2 maio 2027`, label: `Ponte da Liberdade e do Trabalhador`, trip: `escapadela de fim de semana`, blurb: `Ambos os feriados caem ao fim de semana em 2027, por isso são mais dois dias extra de folga do que verdadeiras pontes. Ainda assim, dão para uma fuga curta à costa antes do calor chegar.`, picks: [
      { slug: 'aveiro', why: `Canais e ria dão passeios planos e frescos, sem multidões de verão. Muitas esplanadas à beira-canal aceitam cães sem problema fora da época alta.`, travel: `comboio Lisboa-Aveiro, cerca de 2h45 (transportadora obrigatória para cão pequeno), ou 2h15 de carro` },
      { slug: 'nazare', why: `Fora da época balnear, a praia extensa ainda está livre da proibição de cães, ideal para correr sem trela ao início da manhã. O Sítio dá vistas e caminhadas com sombra.`, travel: `1h20 de carro desde Lisboa` },
      { slug: 'ericeira', why: `Vila pequena e fácil de percorrer a pé com o cão, com falésias e trilhos costeiros sem o movimento do verão. Muito perto de Lisboa para uma escapadela de dois dias.`, travel: `cerca de 40min de carro desde Lisboa` },
    ] },
    { emoji: '🇵🇹', dates: `Pontes de Corpo de Deus e Dia de Portugal · 27-28 maio e 10-11 jun 2027`, label: `Pontes de maio/junho`, trip: `duas pontes de norte`, blurb: `Duas quintas-feiras seguidas de feriado, com sexta de ponte, abrem caminho a duas escapadelas de quatro dias pelo norte de Portugal e Galiza, ainda antes do calor do verão.`, picks: [
      { slug: 'guimaraes', why: `Centro histórico compacto e sem trânsito, fácil de percorrer com o cão à trela. Menos turistas do que o Porto na mesma ponte.`, travel: `50min de carro desde o Porto` },
      { slug: 'sanxenxo', why: `Praias amplas na Galiza, ainda fora da época mais cheia, boas para o cão correr à beira-mar. Ambiente familiar e tranquilo nesta altura do ano.`, travel: `cerca de 2h30 de carro desde o Porto` },
      { slug: 'vigo', why: `Cidade portuária com passeios marítimos longos e parques amplos, fácil de combinar com uma praia próxima para o cão. Boa base para uma ponte de quatro dias sem pressa.`, travel: `cerca de 1h45 de carro desde o Porto` },
    ] },
    { emoji: '🏖️', dates: `Verão · junho a início de setembro 2027`, label: `Férias de Verão`, trip: `férias grandes de verão`, blurb: `As férias mais longas do ano, mas também as mais quentes. Vale a pena privilegiar a costa atlântica e o norte, mais frescos, e confirmar sempre as praias com acesso a cães (a maioria proíbe cães entre 15 de junho e 15 de setembro, exceto praias caninas identificadas).`, picks: [
      { slug: 'costa-da-caparica', why: `Tem praia canina identificada e aberta mesmo em pleno verão, rara vantagem tão perto de Lisboa. Fácil de combinar um dia de praia com o cão sem sair da região.`, travel: `cerca de 30-40min de carro desde Lisboa` },
      { slug: 'a-coruna', why: `Verão bem mais fresco do que o sul, com longos passeios marítimos e praias urbanas onde os cães circulam com naturalidade fora das zonas mais restritas.`, travel: `cerca de 3h de carro desde o Porto` },
      { slug: 'biarritz', why: `Verão atlântico ameno, praias amplas e cultura local muito habituada a cães, inclusive em esplanadas e comboios regionais. Vale como destino de férias grandes, não de fim de semana.`, travel: `melhor de avião desde Lisboa ou Porto (com escala), ou road trip de dois dias via Espanha para quem prefere ir de carro com o cão` },
    ] },
    { emoji: '🍂', dates: `Pontes de outono · 2-5 out e 30 out-1 nov 2027`, label: `Pontes de outubro/novembro`, trip: `duas pontes de outono`, blurb: `5 de outubro cai em terça e 1 de novembro em segunda, duas boas desculpas para fins de semana prolongados com o cão, já com temperaturas mais amenas e praias sem restrições.`, picks: [
      { slug: 'setubal', why: `A Serra da Arrábida dá trilhos com sombra e vistas sobre o mar, ótimos para o cão em outubro sem o calor do verão. As praias da zona já não têm restrição a esta altura.`, travel: `cerca de 45min de carro desde Lisboa` },
      { slug: 'sintra', why: `Trilhos na serra e parques amplos, frescos mesmo em dias de sol de outono. Muita gente leva cães aos jardins do Parque da Pena e da Monserrate fora da época alta.`, travel: `30-40min de carro ou comboio desde Lisboa` },
      { slug: 'santiago-de-compostela', why: `Centro histórico sem trânsito, pensado para andar a pé, ideal para o cão sem risco de estrada. As rias e caminhos da Galiza próximos dão passeios costeiros tranquilos no outono.`, travel: `cerca de 1h15 de carro desde o Porto (A3/AP-9)` },
    ] },
    { emoji: '✨', dates: `Pontes de dezembro · 1 e 8 dez 2027 (ambos quarta-feira)`, label: `Pontes de dezembro`, trip: `pontes antes do Natal`, blurb: `Restauração da Independência e Imaculada Conceição caem as duas numa quarta-feira, boas para emendar com quinta ou aproveitar o fim de semana seguinte, já com espírito natalício nas ruas.`, picks: [
      { slug: 'braga', why: `Iluminação de Natal entre as mais bonitas do país, com o centro histórico fechado ao trânsito e fácil de percorrer com o cão à trela. Fora do calor, os passeios podem ser mais longos.`, travel: `50min de carro desde o Porto` },
      { slug: 'evora', why: `Cidade murada tranquila em dezembro, sem o calor nem as multidões do verão alentejano. Boa para passeios calmos pelas ruas de calçada com o cão.`, travel: `cerca de 1h20 de carro desde Lisboa` },
      { slug: 'malaga', why: `As luzes de Natal da cidade são famosas em Espanha, e o clima ainda ameno permite longos passeios pela marina com o cão sem frio a mais.`, travel: `cerca de 3h30 de carro desde o Algarve (A22, via Espanha)` },
    ] },
  ] },
  de: { periods: [
    { emoji: '❄️', dates: `Winterferien/Fasching · je nach Bundesland Ende Jan. bis Anfang März 2027 (z. B. Bayern und Baden-Württemberg 8.-12. Februar)`, label: `Winterferien`, trip: `Skiurlaub in den Alpen`, blurb: `Nicht alle Bundesländer haben Winterferien, aber wer sie hat, nutzt die Woche gern für Schnee. Mit Hund lohnen sich Ziele mit Winterwanderwegen statt reinen Skipisten. Die Alpenregionen in Österreich sind von Süddeutschland aus in wenigen Stunden erreichbar.`, picks: [
      { slug: 'zell-am-see', why: `Rund um den Zeller See gibt es geräumte Winterwanderwege direkt am Wasser, ideal für lange Spaziergänge abseits der Pisten. Viele Hotels im Pinzgau sind auf Hundegäste eingestellt und bieten Winterausrüstung wie Handtücher und Näpfe an.`, travel: `ca. 6 Std. Autobahn ab Süddeutschland, mit der DB Nachtzug nach Salzburg plus Regionalbahn` },
      { slug: 'innsbruck', why: `Die Stadt liegt direkt am Fuß der Nordkette, sodass Sie mit der Seilbahn und dem Hund an der Leine in wenigen Minuten aus der Stadt in den Schnee kommen. Innsbruck selbst ist kompakt und hundefreundlich mit vielen Grünflächen entlang des Inn.`, travel: `ca. 5 Std. Autobahn über München, direkte DB-Verbindung ab München (Hund mit Fahrschein)` },
      { slug: 'kitzbuehel', why: `Neben den bekannten Pisten gibt es rund um Kitzbühel gut markierte Winterrundwege, die auch mit Hund gut zu laufen sind. Das Kitzbüheler Horn bietet zudem hundefreundliche Almhütten mit Terrasse.`, travel: `ca. 6 Std. Autobahn ab Süddeutschland über Rosenheim` },
    ] },
    { emoji: '🐣', dates: `Osterferien · je nach Bundesland 1. März bis 16. April 2027 (Karfreitag 26. März, Ostermontag 29. März)`, label: `Osterferien`, trip: `Frühlings-Kurztrip`, blurb: `Die Osterferien fallen je nach Bundesland unterschiedlich, das lange Osterwochenende mit Karfreitag und Ostermontag als Feiertage ist aber überall gleich. Ideal für einen Frühlingstrip mit Hund in Städte oder an milde Küsten, bevor es im Sommer wärmer wird.`, picks: [
      { slug: 'salzburg', why: `Die Altstadt ist zu Fuß gut erkundbar, und der Mirabellgarten sowie die Salzach-Auen bieten genug Auslauf für Ihren Hund. Viele Cafés in Salzburg heißen Hunde ausdrücklich willkommen.`, travel: `ca. 5 Std. Autobahn ab München, direkte DB-Verbindung` },
      { slug: 'maastricht', why: `Die niederländische Grenzstadt ist überschaubar und autofrei in der Innenstadt gut zu Fuß mit Hund zu bewältigen. Entlang der Maas gibt es lange Uferwege für ausgiebige Spaziergänge.`, travel: `ca. 3,5 Std. Autobahn ab Köln, DB-Verbindung mit Umstieg (Hund mit Fahrschein/Maulkorb)` },
      { slug: 'strasbourg', why: `Das Elsass ist von Baden-Württemberg aus in kurzer Zeit erreichbar, und die Grachten von Petite France laden zu ruhigen Spaziergängen ein. Viele Terrassen in Straßburg erlauben Hunde.`, travel: `ca. 2,5 Std. Autobahn ab Karlsruhe, DB-Verbindung über Kehl` },
    ] },
    { emoji: '🕊️', dates: `Christi Himmelfahrt · Donnerstag, 6. Mai 2027 (verlängertes Wochenende bis Sonntag, mit einem Urlaubstag bis Montag)`, label: `Himmelfahrt-Brücke`, trip: `Kurztrip übers lange Wochenende`, blurb: `Christi Himmelfahrt fällt 2027 auf einen Donnerstag und eignet sich mit einem Brückentag perfekt für einen viertägigen Ausflug. Für so kurze Trips lohnen sich Ziele, die auch mit der Bahn gut in wenigen Stunden zu erreichen sind.`, picks: [
      { slug: 'amsterdam', why: `Die Grachten und Parks wie das Vondelpark sind bei Hundebesitzern beliebt, und viele Cafés entlang der Kanäle erlauben Hunde an der Leine. Für ein langes Wochenende reicht die Zeit gut aus, um die Stadt zu Fuß zu erkunden.`, travel: `ca. 4 Std. mit der DB (Hund mit Fahrschein/Maulkorb), ca. 4,5 Std. Autobahn ab Köln` },
      { slug: 'prague', why: `Die Prager Altstadt ist kopfsteingepflastert, aber die Parks am Moldau-Ufer und der Letná-Park bieten viel Grünfläche für Ihren Hund. Tschechien ist bei Hundehaltern unkompliziert, da in vielen Parks keine strenge Leinenpflicht gilt.`, travel: `ca. 5 Std. Autobahn ab Nürnberg, direkte DB-Verbindung ab Dresden` },
      { slug: 'colmar', why: `Das kleine Elsass-Städtchen mit seinen Fachwerkhäusern ist an einem langen Wochenende bequem zu erkunden, und die Lauch-Ufer bieten ruhige Runden abseits des Trubels.`, travel: `ca. 3 Std. Autobahn ab Karlsruhe` },
    ] },
    { emoji: '🌸', dates: `Pfingstferien · je nach Bundesland 3. bis 25. Mai 2027 (Pfingstmontag 17. Mai)`, label: `Pfingstferien`, trip: `Seen und Alpenvorland`, blurb: `Die Pfingstferien liegen im Mai, wenn es in Deutschland noch mild ist, in Südtirol und am Gardasee aber schon angenehm warm. Ein guter Zeitpunkt für einen Alpensee-Trip mit Hund, bevor im Hochsommer die Hitze und der Andrang steigen.`, picks: [
      { slug: 'bolzano', why: `Südtirol ist bei Hundehaltern beliebt wegen der vielen beschilderten Wanderwege direkt ab der Stadt und der italienisch-österreichischen Gastfreundschaft gegenüber Hunden in Restaurants.`, travel: `ca. 6 Std. Autobahn über den Brenner ab München` },
      { slug: 'lucerne', why: `Der Vierwaldstättersee bietet zahlreiche Uferpromenaden, an denen Hunde an der Leine erlaubt sind, und die Bergbahnen rundherum sind meist hundefreundlich für einen Tagesausflug.`, travel: `ca. 4,5 Std. Autobahn ab Karlsruhe, direkte DB-Verbindung` },
      { slug: 'sirmione', why: `Die Halbinsel am Gardasee hat in der Nähe einen ausgewiesenen Hundestrand (Spiaggia dei Cani), und im Mai ist es dort schon warm, aber noch nicht überlaufen.`, travel: `ca. 8 Std. Autobahn über den Brenner, alternativ Nachtzug nach Verona plus Regionalbahn` },
    ] },
    { emoji: '☀️', dates: `Sommerferien · je nach Bundesland ca. Ende Juni bis Mitte September 2027 (erste Länder ab 28. Juni, Bayern zuletzt bis 13. September)`, label: `Sommerferien`, trip: `Großer Sommerurlaub`, blurb: `Die Sommerferien sind über sechs Wochen auf die 16 Bundesländer verteilt, sodass sich Reisezeiten und Preise gut staffeln lassen. Bei Sommerhitze sind Ostsee, Nordsee und höher gelegene Alpenseen für Hunde deutlich angenehmer als pralle Stadthitze im Süden.`, picks: [
      { slug: 'sylt', why: `Die Nordseeinsel hat ausgedehnte Hundestrandabschnitte, an denen auch im Hochsommer freies Laufen erlaubt ist, und das raue Klima erspart Ihrem Hund die südliche Hitze.`, travel: `ca. 5 Std. Autobahn ab Hamburg, direkte DB-Verbindung mit Autoverladung (Sylt-Shuttle)` },
      { slug: 'bellagio', why: `Am Comer See sorgt die Höhenlage für mildere Sommertemperaturen als am Gardasee, und viele Uferpromenaden sowie Fährverbindungen erlauben Hunde an der Leine.`, travel: `ca. 7,5 Std. Autobahn über den Gotthard oder Brenner` },
      { slug: 'rovinj', why: `Die kroatische Küste bei Rovinj hat mehrere offizielle Hundestrände, das Wasser der Adria ist im Sommer angenehm warm, und Istrien ist insgesamt sehr hundefreundlich mit vielen Terrassen, die Hunde erlauben.`, travel: `ca. 10 Std. Autobahn über Österreich und Slowenien` },
    ] },
    { emoji: '🍂', dates: `Herbstferien · je nach Bundesland ca. 4. Oktober bis 5. November 2027`, label: `Herbstferien`, trip: `Letzte Sonne und Städtereise`, blurb: `Im Herbst ziehen viele Familien mit Hund noch einmal Richtung Süden, bevor der Winter kommt, oder wählen ruhigere Städtereisen mit buntem Laub. Die Schweiz und Norditalien bieten im Oktober noch angenehme Temperaturen für lange Spaziergänge.`, picks: [
      { slug: 'lugano', why: `Das milde Klima im Tessin hält sich oft bis in den Oktober, und die Uferwege am Luganersee sind für Hunde bestens geeignet, ebenso die Bergbahnen rund um die Stadt.`, travel: `ca. 6 Std. Autobahn über den Gotthard, direkte DB-Verbindung mit Umstieg in Zürich` },
      { slug: 'verona', why: `Die Stadt ist kompakt und hundefreundlich, mit vielen Grünanlagen an der Etsch, und das Umland um den Gardasee ist im Herbst deutlich ruhiger als im Sommer.`, travel: `ca. 7 Std. Autobahn über den Brenner, direkte Nachtzug-Verbindung` },
      { slug: 'gdansk', why: `Die Ostseestadt zeigt sich im Herbst mit stillen Stränden und der historischen Altstadt ohne Sommertrubel, und viele Parks entlang der Mottlau eignen sich für lange Spaziergänge.`, travel: `ca. 7 Std. Autobahn über Berlin und Stettin` },
    ] },
    { emoji: '🇩🇪', dates: `Tag der Deutschen Einheit · Sonntag, 3. Oktober 2027 (mit Montag als Urlaubstag zur Brücke)`, label: `Einheit-Wochenende`, trip: `Kurztrip nach Osten`, blurb: `Da der 3. Oktober 2027 auf einen Sonntag fällt, lohnt sich ein zusätzlicher Urlaubstag am Montag für ein verlängertes Wochenende. Böhmen und Sachsen liegen nah genug für einen kurzen Trip ohne lange Anfahrt.`, picks: [
      { slug: 'dresden', why: `Der Große Garten und die Elbwiesen bieten viel Auslauf mitten in der Stadt, und die barocke Altstadt ist zu Fuß gut mit Hund zu erkunden.`, travel: `ca. 4 Std. Autobahn ab Frankfurt, direkte DB-Verbindung` },
      { slug: 'cesky-krumlov', why: `Das kleine Städtchen an der Moldau ist autofrei in der Altstadt und wirkt außerhalb der Sommersaison sehr ruhig, ideal für entspannte Spaziergänge mit Hund entlang des Flusses.`, travel: `ca. 5,5 Std. Autobahn ab Nürnberg über Prag` },
      { slug: 'karlovy-vary', why: `Die Kurstadt mit ihren Kolonnaden liegt in einem grünen Tal, und die umliegenden Wälder bieten ausgedehnte Wanderwege direkt ab der Stadt.`, travel: `ca. 3,5 Std. Autobahn ab Nürnberg` },
    ] },
    { emoji: '🎄', dates: `Weihnachtsferien · 20. Dezember 2027 bis 1. Januar 2028`, label: `Weihnachtsferien`, trip: `Weihnachtsmarkt und Winterzauber`, blurb: `Zwischen den Feiertagen bleibt Zeit für einen Trip zu einem der großen Weihnachtsmärkte oder für einen ruhigen Jahresausklang. Für Hunde eignen sich Städte mit viel Grünfläche neben der historischen Altstadt am besten.`, picks: [
      { slug: 'nuremberg', why: `Der Christkindlesmarkt ist zwar dicht besucht, aber die Altstadt hat genug ruhigere Ecken, und der nahe Stadtpark bietet Auslauf abseits des Trubels.`, travel: `ca. 3 Std. Autobahn ab Frankfurt, direkte DB-Verbindung` },
      { slug: 'vienna', why: `Die Wiener Ringstraße und der Prater bieten viel Platz für lange Winterspaziergänge, und viele Kaffeehäuser in Wien heißen Hunde an der Leine willkommen.`, travel: `ca. 3,5 Std. mit der DB Nightjet, ca. 8 Std. Autobahn` },
      { slug: 'copenhagen', why: `Die dänische Hauptstadt ist fahrradfreundlich und entsprechend auch für Hunde gut zu Fuß erschließbar, mit vielen Parks wie dem Kongens Have direkt in der Innenstadt.`, travel: `ca. 5 Std. Autobahn ab Hamburg, direkte DB-Verbindung (Hund mit Fahrschein/Maulkorb)` },
    ] },
  ] },
}

const COPY: Record<LocaleKey, {
  eyebrow: string; title: string; intro: string; note: string
  travelLabel: string; whyLabel: string; staysLabel: string
  tierBudget: string; tierMid: string; tierPremium: string
  from: string; night: string; petFeeNil: string; petFee: string; bookCta: string; destCta: string
  practicalHeading: string; practical: { h: string; p: string }[]
  faqHeading: string; faqs: { q: string; a: string }[]
  sticky: { label: string; cta: string }
}> = {
  en: {
    eyebrow: 'UK SCHOOL HOLIDAYS 2027 · TRAVELLING WITH A DOG',
    title: 'Where to Go for the 2027 UK School Holidays & Bank Holidays (with your dog)',
    intro: 'A period-by-period plan for the 2027 English school calendar, built around one fact that changes everything for dog owners: the Eurostar does not carry pet dogs. Your real routes are Le Shuttle (the dog stays in your car) and the Brittany Ferries overnight crossings. So a bank-holiday weekend means a short hop just past Calais, while a two-week or six-week break earns the long haul south. Every idea below comes with the honest travel time from the UK and three real hotels across budgets.',
    note: 'Dates are the official 2027 England bank holidays; school holiday weeks are the typical England pattern and vary by council, so confirm your own term dates.',
    travelLabel: 'Travel from the UK', whyLabel: 'Why here', staysLabel: 'Where to stay, across budgets',
    tierBudget: 'Budget', tierMid: 'Mid-range', tierPremium: 'Premium',
    from: 'from', night: 'night', petFeeNil: 'No pet fee', petFee: 'pet fee', bookCta: 'Check dates →', destCta: 'Full city guide →',
    practicalHeading: 'Planning around the 2027 calendar',
    practical: [
      { h: 'The Eurostar rule', p: 'Eurostar carries assistance dogs only, not pet dogs. For a family dog the routes are Le Shuttle (Folkestone→Calais, 35 min, dog stays in the car) or the ferries. This is why "how far" tracks "how long you have off".' },
      { h: 'Match distance to days off', p: 'A 3-day bank holiday = within 2 hours of the tunnel (northern France, Belgium). A one-week half term = an overnight ferry to Brittany or the Basque Country. The six-week summer = worth the long drive to the Alps, Austria or Iberia.' },
      { h: 'Summer heat is the real risk', p: 'The peak-summer Mediterranean is dangerous for dogs: pavements hit 50 °C and burn paws, and cars turn lethal in minutes. In July–August aim for lakes, altitude or the cooler Atlantic, and walk at dawn and dusk only.' },
      { h: 'Seasonal beach bans', p: 'Most French, Spanish and Portuguese beaches ban dogs during the summer bathing season (roughly June–September) and reopen the rest of the year. Half terms and Easter fall in the open windows, a quiet advantage of school-holiday timing.' },
    ],
    faqHeading: 'Frequently asked questions',
    faqs: [
      { q: 'Can I take my dog on the Eurostar to plan around these holidays?', a: 'No. Eurostar only carries registered assistance dogs, not pet dogs. Use Le Shuttle through the tunnel (your dog stays with you in the car) or a Brittany Ferries / DFDS / Stena crossing with a pet-friendly cabin or kennel.' },
      { q: 'Are the school holiday dates the same everywhere in England?', a: 'No. Bank holidays are fixed nationally, but school term and half-term dates are set by each local council and academy trust, so they can shift by a week (February and October half terms especially). Always check your own school before booking.' },
      { q: 'Which 2027 holiday is best for a first trip abroad with a dog?', a: 'The early May or late-May bank holiday. The weather is kind, northern France and Belgium are a short hop through the tunnel, and a two-night trip lets a nervous or first-time dog get used to travel without a long haul.' },
      { q: 'When should we avoid the Mediterranean with a dog?', a: 'The whole summer holiday (late July to early September). Heat is genuinely dangerous and most southern beaches ban dogs in those months anyway. Save the south for February half term or October half term, when it is mild and the dog beaches are open.' },
    ],
    sticky: { label: 'Pet-friendly hotels for the 2027 holidays', cta: 'See hotels' },
  },
  fr: {
    eyebrow: 'VACANCES SCOLAIRES FRANCE 2027 · VOYAGER AVEC SON CHIEN',
    title: 'Où partir avec son chien pendant les vacances scolaires et jours fériés 2027',
    intro: 'Un plan période par période du vrai calendrier scolaire français 2027 : pour chaque vacance et chaque pont, deux ou trois idées de destinations avec son chien, le temps de trajet honnête depuis la France, et trois vrais hôtels étagés par budget. Un pont se joue près de chez soi ; une à deux semaines justifient d’aller plus loin. On tient compte de la réalité canine : la chaleur estivale, les interdictions de plage saisonnières, les règles de train.',
    note: 'Les dates suivent le calendrier scolaire français 2027 (vacances d’hiver et de printemps échelonnées par zones A/B/C) et les jours fériés nationaux. Vérifiez votre zone.',
    travelLabel: 'Trajet depuis la France', whyLabel: 'Pourquoi ici', staysLabel: 'Où dormir, selon les budgets',
    tierBudget: 'Économique', tierMid: 'Milieu de gamme', tierPremium: 'Premium',
    from: 'dès', night: 'nuit', petFeeNil: 'Sans supplément animal', petFee: 'suppl. animal', bookCta: 'Voir les dates →', destCta: 'Guide complet →',
    practicalHeading: 'Planifier autour du calendrier 2027',
    practical: [
      { h: 'Le chien dans le train', p: 'SNCF : chien de moins de 6 kg en sac (petit forfait), sinon en laisse avec un billet chien à environ 50 % du tarif. En voiture, prévoyez une pause toutes les 2 heures et ne laissez jamais le chien seul dans l’habitacle en été.' },
      { h: 'Adaptez la distance aux jours off', p: 'Un pont de 3 jours = à moins de 2-3 h de chez vous. Une semaine de vacances = une région voisine ou un pays limitrophe. Les deux mois d’été = le grand voyage vers l’Atlantique, les Alpes ou l’Ibérie du nord.' },
      { h: 'La chaleur estivale est le vrai danger', p: 'En juillet-août, évitez la Méditerranée en plein cagnard : le bitume monte à 50 °C et brûle les coussinets, une voiture devient mortelle en minutes. Visez les lacs, l’altitude ou la côte atlantique, et ne promenez qu’à l’aube et au crépuscule.' },
      { h: 'Interdictions de plage saisonnières', p: 'La plupart des plages françaises et espagnoles interdisent les chiens pendant la saison balnéaire (env. juin-septembre) et rouvrent le reste de l’année. La Toussaint, les vacances de printemps et de février tombent dans les fenêtres ouvertes.' },
    ],
    faqHeading: 'Questions fréquentes',
    faqs: [
      { q: 'Puis-je emmener mon chien en TGV pour ces vacances ?', a: 'Oui. La SNCF accepte les chiens : moins de 6 kg en sac pour un petit forfait, sinon en laisse (et muselière si demandé) avec un billet chien à environ 50 % du tarif. Réservez le billet du chien en même temps que le vôtre.' },
      { q: 'Les dates de vacances scolaires sont-elles les mêmes partout ?', a: 'Non. Les vacances d’hiver et de printemps sont échelonnées par zones A, B et C, tandis que la Toussaint, Noël et l’été sont communs. Vérifiez votre zone avant de réserver.' },
      { q: 'Quelle période 2027 pour un premier voyage avec un chien ?', a: 'Un pont de printemps (mai) ou les vacances de la Toussaint. La météo est clémente, les distances restent raisonnables, et deux ou trois nuits permettent à un chien novice de s’habituer au voyage sans long trajet.' },
      { q: 'Quand éviter la Méditerranée avec un chien ?', a: 'En plein été (juillet-août). La chaleur est réellement dangereuse et la plupart des plages du sud interdisent les chiens ces mois-là. Gardez le sud pour février ou la Toussaint, doux et plages rouvertes.' },
    ],
    sticky: { label: 'Hôtels pet-friendly pour les vacances 2027', cta: 'Voir les hôtels' },
  },
  es: {
    eyebrow: 'VACACIONES ESCOLARES ESPAÑA 2027 · VIAJAR CON PERRO',
    title: 'Dónde ir con tu perro en las vacaciones escolares y festivos de 2027',
    intro: 'Un plan periodo a periodo del calendario escolar español 2027: para cada vacación y cada puente, dos o tres ideas de destinos con tu perro, el tiempo de viaje honesto desde España, y tres hoteles reales por presupuesto. Un puente se resuelve cerca de casa; una o dos semanas justifican ir más lejos. Tenemos en cuenta la realidad canina: el calor del verano, las prohibiciones estacionales de playa y las normas del tren.',
    note: 'Las fechas siguen el calendario escolar español 2027 (que varía por comunidad autónoma) y los festivos nacionales. Confirma las de tu comunidad.',
    travelLabel: 'Viaje desde España', whyLabel: 'Por qué aquí', staysLabel: 'Dónde alojarse, por presupuesto',
    tierBudget: 'Económico', tierMid: 'Gama media', tierPremium: 'Premium',
    from: 'desde', night: 'noche', petFeeNil: 'Sin suplemento por mascota', petFee: 'suppl. mascota', bookCta: 'Ver fechas →', destCta: 'Guía completa →',
    practicalHeading: 'Planificar en torno al calendario 2027',
    practical: [
      { h: 'El perro en el tren', p: 'Renfe admite perros de hasta 10 kg en transportín; para perros grandes hay un plan piloto en algunos AVE. En coche, para cada 2 horas y nunca dejes al perro solo en el vehículo en verano.' },
      { h: 'Ajusta la distancia a los días libres', p: 'Un puente de 3 días = a menos de 2-3 h de casa. Una semana = una comunidad vecina o Portugal. Los dos meses de verano = el gran viaje al norte atlántico o a las islas con brisa.' },
      { h: 'El calor del verano es el riesgo real', p: 'En julio-agosto evita el Mediterráneo y el interior al mediodía: el pavimento alcanza 50 °C y quema las almohadillas, un coche se vuelve letal en minutos. Busca el Atlántico norte, las islas o la montaña, y pasea solo al amanecer y al anochecer.' },
      { h: 'Prohibiciones estacionales de playa', p: 'La mayoría de playas españolas y portuguesas prohíben perros en la temporada de baño (aprox. junio-septiembre) y reabren el resto del año. Semana Santa y los puentes de otoño e invierno caen en las ventanas abiertas.' },
    ],
    faqHeading: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Puedo llevar a mi perro en el AVE para estas vacaciones?', a: 'Sí, con matices. Renfe admite perros de hasta 10 kg en transportín, y hay un plan piloto para perros grandes en trayectos AVE seleccionados. Comprueba las condiciones de tu ruta al comprar el billete.' },
      { q: '¿Las fechas escolares son iguales en toda España?', a: 'No. Cada comunidad autónoma fija su propio calendario (Navidad, Semana Santa y verano varían), aunque los festivos nacionales son comunes. Confirma las fechas de tu comunidad antes de reservar.' },
      { q: '¿Qué vacación de 2027 es mejor para un primer viaje con perro?', a: 'Un puente de primavera o la Semana Santa. El tiempo es agradable, las distancias son razonables y dos o tres noches permiten a un perro novato acostumbrarse al viaje sin un trayecto largo.' },
      { q: '¿Cuándo evitar el Mediterráneo con perro?', a: 'En pleno verano (julio-agosto). El calor es peligroso y la mayoría de playas del sur prohíben perros esos meses. Reserva el sur para Semana Santa o los puentes de otoño, templados y con playas abiertas.' },
    ],
    sticky: { label: 'Hoteles pet-friendly para las vacaciones 2027', cta: 'Ver hoteles' },
  },
  pt: {
    eyebrow: 'FÉRIAS ESCOLARES PORTUGAL 2027 · VIAJAR COM CÃO',
    title: 'Para onde ir com o seu cão nas férias escolares e feriados de 2027',
    intro: 'Um plano período a período do calendário escolar português 2027: para cada interrupção e cada ponte, duas ou três ideias de destinos com o seu cão, o tempo de viagem honesto a partir de Portugal, e três hotéis reais por orçamento. Uma ponte resolve-se perto de casa; uma ou duas semanas justificam ir mais longe. Temos em conta a realidade canina: o calor do verão, as proibições sazonais de praia e as regras do comboio.',
    note: 'As datas seguem o calendário escolar português 2027 e os feriados nacionais. Confirme as datas da sua escola.',
    travelLabel: 'Viagem a partir de Portugal', whyLabel: 'Porquê aqui', staysLabel: 'Onde ficar, por orçamento',
    tierBudget: 'Económico', tierMid: 'Gama média', tierPremium: 'Premium',
    from: 'desde', night: 'noite', petFeeNil: 'Sem taxa de animal', petFee: 'taxa animal', bookCta: 'Ver datas →', destCta: 'Guia completo →',
    practicalHeading: 'Planear em torno do calendário 2027',
    practical: [
      { h: 'O cão no comboio', p: 'A CP aceita cães pequenos em transportadora; cães grandes com açaime e trela em condições limitadas. De carro, pare de 2 em 2 horas e nunca deixe o cão sozinho no veículo no verão.' },
      { h: 'Ajuste a distância aos dias de folga', p: 'Uma ponte de 3 dias = a menos de 2-3 h de casa. Uma semana = uma região vizinha ou a Galiza. Os dois meses de verão = a grande viagem pela costa atlântica ou até à Madeira.' },
      { h: 'O calor do verão é o verdadeiro risco', p: 'Em julho-agosto evite o interior e o sul ao meio-dia: o pavimento chega a 50 °C e queima as almofadinhas, um carro torna-se letal em minutos. Prefira a costa atlântica e o norte mais fresco, e passeie apenas ao amanhecer e ao anoitecer.' },
      { h: 'Proibições sazonais de praia', p: 'A maioria das praias portuguesas e espanholas proíbe cães na época balnear (cerca de junho-setembro) e reabre o resto do ano. A Páscoa e as pontes de outono e inverno caem nas janelas abertas.' },
    ],
    faqHeading: 'Perguntas frequentes',
    faqs: [
      { q: 'Posso levar o meu cão no comboio para estas férias?', a: 'Sim, com limites. A CP aceita cães pequenos em transportadora; cães maiores viajam com açaime e trela em condições restritas. Confirme as regras da sua ligação antes de comprar o bilhete.' },
      { q: 'As datas escolares são iguais em todo o país?', a: 'As interrupções (Natal, Carnaval, Páscoa) e o verão seguem o calendário nacional, mas podem existir pequenas diferenças por escola ou agrupamento. Confirme sempre antes de reservar.' },
      { q: 'Que férias de 2027 são melhores para uma primeira viagem com cão?', a: 'Uma ponte de primavera ou as férias da Páscoa. O tempo é ameno, as distâncias são razoáveis e duas ou três noites permitem a um cão inexperiente habituar-se à viagem sem um trajeto longo.' },
      { q: 'Quando evitar o sul e o Mediterrâneo com um cão?', a: 'Em pleno verão (julho-agosto). O calor é perigoso e muitas praias proíbem cães nesses meses. Guarde o sul para a Páscoa ou as pontes de outono, amenos e com praias reabertas.' },
    ],
    sticky: { label: 'Hotéis pet-friendly para as férias 2027', cta: 'Ver hotéis' },
  },
  de: {
    eyebrow: 'SCHULFERIEN DEUTSCHLAND 2027 · REISEN MIT HUND',
    title: 'Wohin mit dem Hund in den Schulferien und an den Feiertagen 2027',
    intro: 'Ein Plan Zeitraum für Zeitraum durch den echten deutschen Schulkalender 2027: für jede Ferienzeit und jedes lange Wochenende zwei oder drei Reiseideen mit Hund, die ehrliche Reisezeit ab Deutschland und drei echte Hotels über verschiedene Budgets. Ein langes Wochenende bleibt nah; ein oder zwei Wochen lohnen die weitere Fahrt. Wir denken die Hunde-Realität mit: Sommerhitze, saisonale Strandverbote und die Bahnregeln.',
    note: 'Die Termine folgen dem deutschen Schulkalender 2027 (je nach Bundesland stark gestaffelt, besonders im Sommer) und den Feiertagen. Prüfen Sie Ihr Bundesland.',
    travelLabel: 'Anreise ab Deutschland', whyLabel: 'Warum hier', staysLabel: 'Wo übernachten, über alle Budgets',
    tierBudget: 'Günstig', tierMid: 'Mittelklasse', tierPremium: 'Premium',
    from: 'ab', night: 'Nacht', petFeeNil: 'Keine Haustiergebühr', petFee: 'Haustiergebühr', bookCta: 'Termine prüfen →', destCta: 'Vollständiger Stadtführer →',
    practicalHeading: 'Rund um den Kalender 2027 planen',
    practical: [
      { h: 'Der Hund in der Bahn', p: 'DB: kleine Hunde fahren im Transportbehälter kostenlos, größere brauchen einen Fahrschein (etwa halber Preis) und oft einen Maulkorb. Im Auto alle zwei Stunden Pause machen und den Hund im Sommer nie allein im Wagen lassen.' },
      { h: 'Distanz an die freien Tage anpassen', p: 'Ein langes Wochenende = höchstens 2-3 Std. von zu Hause. Eine Ferienwoche = ein Nachbarland (Österreich, Schweiz, Südtirol, Niederlande). Die Sommerferien = die weite Fahrt an die Ostsee, in die Alpen oder nach Italien.' },
      { h: 'Sommerhitze ist das echte Risiko', p: 'Meiden Sie im Juli und August das Mittelmeer in der Mittagsglut: Gehwege erreichen 50 °C und verbrennen die Ballen, ein Auto wird in Minuten tödlich. Peilen Sie Ostsee und Nordsee, Alpenseen oder Höhenlagen an und gehen Sie nur in der Dämmerung spazieren.' },
      { h: 'Saisonale Strandverbote', p: 'Viele Strände im Süden verbieten Hunde in der Badesaison (etwa Juni bis September), die Nord- und Ostsee sind deutlich hundefreundlicher. Oster- und Herbstferien fallen in die offenen Fenster.' },
    ],
    faqHeading: 'Häufig gestellte Fragen',
    faqs: [
      { q: 'Darf mein Hund für diese Ferien in der Bahn mitfahren?', a: 'Ja. Kleine Hunde fahren bei der DB im geschlossenen Behälter kostenlos, größere Hunde brauchen einen Fahrschein zum halben Preis und meist einen Maulkorb. Buchen Sie den Hund gleich mit.' },
      { q: 'Sind die Schulferien in ganz Deutschland gleich?', a: 'Nein. Die 16 Bundesländer staffeln ihre Ferien, besonders im Sommer (Ende Juni bis Mitte September). Einige Feiertage sind zudem regional. Prüfen Sie die Termine Ihres Bundeslandes vor der Buchung.' },
      { q: 'Welche Ferien 2027 eignen sich am besten für eine erste Reise mit Hund?', a: 'Ein langes Wochenende im Frühjahr oder die Osterferien. Das Wetter ist mild, die Wege bleiben kurz, und zwei oder drei Nächte lassen einen unerfahrenen Hund das Reisen ohne lange Fahrt üben.' },
      { q: 'Wann sollten wir das Mittelmeer mit Hund meiden?', a: 'In den Sommerferien (Juli, August). Die Hitze ist gefährlich und viele Südstrände verbieten Hunde in diesen Monaten. Heben Sie den Süden für Ostern oder die Herbstferien auf, mild und mit offenen Stränden.' },
    ],
    sticky: { label: 'Haustierfreundliche Hotels für die Ferien 2027', cta: 'Hotels ansehen' },
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const t = COPY[(locale as LocaleKey)] ?? COPY.en
  return {
    title: t.title,
    description: t.intro.slice(0, 200),
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
    openGraph: { title: t.title, description: t.intro.slice(0, 200), type: 'article', url: `${SITE_URL}/${locale}/guides/${SLUG}` },
  }
}

type HotelRow = { id: string; name: string; destinationSlug: string; stars?: number; rating?: number; priceFrom?: number; currency?: string; petFee?: number }

// Three real hotels for a city spanning the budget spread (cheapest, mid,
// priciest). All from data we already scraped, so rendering costs nothing.
function budgetTiers(slug: string): HotelRow[] {
  const arr = (hotels as HotelRow[])
    .filter((h) => h.destinationSlug === slug && typeof h.priceFrom === 'number' && (h.priceFrom as number) > 0)
    .sort((a, b) => (a.priceFrom as number) - (b.priceFrom as number))
  if (arr.length === 0) return []
  if (arr.length <= 3) return arr
  const seen = new Set<string>()
  return [arr[0], arr[Math.floor(arr.length / 2)], arr[arr.length - 1]].filter((h) => {
    if (seen.has(h.id)) return false
    seen.add(h.id)
    return true
  })
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!hasLocale(rawLocale)) notFound()
  const locale = rawLocale as string
  const t = COPY[(locale as LocaleKey)] ?? COPY.en
  const cal = CALENDARS[(locale as LocaleKey)] ?? CALENDARS.en
  const tierLabels = [t.tierBudget, t.tierMid, t.tierPremium]

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/${locale}/guides` },
      { '@type': 'ListItem', position: 3, name: t.title, item: `${SITE_URL}/${locale}/guides/${SLUG}` },
    ],
  }
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: t.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  const articleSchema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: t.title, description: t.intro, inLanguage: locale,
    author: { '@type': 'Person', name: 'HotelsWithPets Editorial', jobTitle: 'Pet Travel Editor', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL },
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-sky-800 to-teal-700 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 15% 25%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 85% 75%, rgba(255,255,255,0.3), transparent 40%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-xs font-semibold uppercase tracking-widest text-sky-100 mb-3">🐾 {t.eyebrow}</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{t.title}</h1>
          <p className="text-lg sm:text-xl text-sky-50 leading-relaxed">{t.intro}</p>
          <p className="text-xs text-sky-200/90 mt-4 max-w-2xl">{t.note}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        {cal.periods.map((period, pi) => (
          <section key={pi} className="scroll-mt-20">
            <header className="mb-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-2xl">{period.emoji}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">{period.label}</h2>
                <span className="ml-auto text-xs font-bold uppercase tracking-wide bg-sky-100 text-sky-900 px-3 py-1 rounded-full">{period.trip}</span>
              </div>
              <div className="text-sm font-semibold text-teal-700 mt-1">{period.dates}</div>
              <p className="text-stone-700 leading-relaxed mt-2">{period.blurb}</p>
            </header>

            <div className="space-y-4">
              {period.picks.map((p, i) => {
                const meta = DEST[p.slug]
                if (!meta) return null
                const tiers = budgetTiers(p.slug)
                return (
                  <article key={`${pi}-${p.slug}-${i}`} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                    <header className="px-5 sm:px-7 py-4 bg-gradient-to-r from-sky-50 to-teal-50 border-b border-stone-200">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-lg font-black text-sky-800">{i + 1}</span>
                        <h3 className="text-xl font-bold text-stone-900">
                          <Link href={`/${locale}/destinations/${p.slug}`} className="hover:text-sky-700">{meta.name}</Link>
                        </h3>
                        <span className="text-sm text-stone-500">{meta.country}</span>
                      </div>
                    </header>
                    <div className="px-5 sm:px-7 py-5 space-y-4">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">{t.whyLabel}</div>
                        <p className="text-stone-800 leading-relaxed">{p.why}</p>
                      </div>
                      {p.travel && (
                        <div className="flex items-start gap-2 bg-teal-50 border border-teal-100 rounded-xl p-3">
                          <span className="text-base leading-none mt-0.5">🚗</span>
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-teal-800">{t.travelLabel}</div>
                            <p className="text-sm text-teal-900 leading-relaxed">{p.travel}</p>
                          </div>
                        </div>
                      )}
                      {tiers.length > 0 && (
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">{t.staysLabel}</div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {tiers.map((h, ti) => (
                              <a
                                key={h.id}
                                href={buildAllezLink(h.name, meta.name, meta.country, `${CAMPAIGN_BASE}-${locale}-${p.slug}-${ti}`, 3)}
                                target="_blank" rel="noopener sponsored"
                                className="group flex flex-col rounded-xl border border-stone-200 hover:border-sky-300 hover:shadow-md transition-all p-3"
                              >
                                <span className="text-[10px] font-bold uppercase tracking-wide text-sky-700 mb-1">{tierLabels[Math.min(ti, 2)]}</span>
                                <span className="font-semibold text-stone-900 text-sm leading-tight group-hover:text-sky-700">{h.name}</span>
                                <span className="text-xs text-stone-500 mt-1">
                                  {typeof h.stars === 'number' ? '★'.repeat(Math.round(h.stars)) + ' · ' : ''}
                                  {typeof h.rating === 'number' ? `${h.rating.toFixed(1)}/10` : ''}
                                </span>
                                <span className="text-sm font-bold text-stone-900 mt-2">{t.from} €{h.priceFrom}<span className="text-xs font-normal text-stone-500"> / {t.night}</span></span>
                                <span className={`text-[11px] mt-1 font-medium ${h.petFee === 0 ? 'text-green-700' : 'text-stone-500'}`}>
                                  {h.petFee === 0 ? `🐾 ${t.petFeeNil}` : typeof h.petFee === 'number' ? `🐾 €${h.petFee} ${t.petFee}` : ''}
                                </span>
                                <span className="text-xs font-semibold text-sky-700 mt-2 group-hover:underline">{t.bookCta}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      <div>
                        <Link href={`/${locale}/destinations/${p.slug}`} className="text-sm font-semibold text-sky-700 hover:text-sky-900 hover:underline">{t.destCta}</Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">🧭 {t.practicalHeading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.practical.map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-stone-200">
              <h3 className="font-bold text-stone-900 mb-2">{p.h}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{p.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">❓ {t.faqHeading}</h2>
        <div className="space-y-4">
          {t.faqs.map((f, i) => (
            <details key={i} className="bg-white border border-stone-200 rounded-2xl group">
              <summary className="cursor-pointer p-5 font-semibold text-stone-900 list-none flex items-center justify-between">
                <span>{f.q}</span>
                <span className="text-stone-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-stone-700 leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4">
        <GuideFooter locale={locale} currentSlug={SLUG} />
      </div>

      <StickyHotelCTA label={t.sticky.label} cta={t.sticky.cta} href={buildAllezDestLink('Bruges', 'Belgium', `${CAMPAIGN_BASE}-sticky`, 3)} />
    </main>
  )
}
