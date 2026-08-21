import Link from 'next/link'
import Image from 'next/image'
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

type LocaleKey = 'en' | 'fr' | 'es' | 'pt' | 'de' | 'nl'

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
  nl: { periods: [
    { emoji: '🎆', dates: `Kerstvakantie & Nieuwjaar · za 19 dec 2026 t/m zo 3 jan 2027`, label: `Kerstvakantie & Nieuwjaar`, trip: `Korte winterbreak`, blurb: `Twee weken schoolvakantie rond de jaarwisseling, precies goed voor een korte trip net over de grens. De kou zit een hond met een dikke vacht wel, en de kerstmarkten staan tot begin januari nog overeind.`, picks: [
      { slug: 'maastricht', why: `De dichtstbijzijnde stap over de grens vanuit het zuiden: kerstmarkt op het Vrijthof, wandelpaden langs de Maas, en horeca die een hond op de stoep gewoon vindt.`, travel: `ca. 2 uur rijden via de A2, of NS-trein naar Maastricht met dagkaart hond` },
      { slug: 'cologne', why: `Zeven kerstmarkten in één stad, en Duitsland rekent doorgaans geen of weinig toeslag voor huisdieren in hotels. Vlakke oevers van de Rijn voor een lange wandeling na de drukte.`, travel: `ca. 2,5 uur rijden via de A61/A4, of ICE vanaf Amsterdam/Utrecht (hond met treinkaartje, muilkorf verplicht in Duitsland)` },
      { slug: 'ghent', why: `Rustiger dan Brugge, met verlichte grachten en een studentenstad-mentaliteit die zich ook uitstrekt naar honden op elk terras.`, travel: `ca. 3 uur rijden via de A16/E17, of trein via Antwerpen/Brussel (ca. 3 uur, hond in mand of aangelijnd met ticket)` },
    ] },
    { emoji: '⛄', dates: `Voorjaarsvakantie · Zuid 13-21 feb, Noord/Midden 20-28 feb 2027`, label: `Voorjaarsvakantie`, trip: `Wintersport of winterzon: een week`, blurb: `De voorjaarsvakantie loopt uiteen per regio, dus check zelf wanneer jouw school vrij is. Een week is genoeg om echt de bergen in te trekken voor sneeuwwandelingen met de hond, of juist zuidwaarts te vluchten voor wat winterzon.`, picks: [
      { slug: 'zell-am-see', why: `Geruimde winterwandelpaden direct langs het meer, weg van de skipistes waar honden niet mogen komen. Veel hotels in de Pinzgau zijn ingesteld op hondengasten met handdoeken en bakjes.`, travel: `ca. 8,5 uur rijden via Duitsland en Salzburg (A67/A3), of Nightjet naar Salzburg plus regionale trein` },
      { slug: 'innsbruck', why: `De stad ligt direct aan de voet van de Nordkette, dus met de kabelbaan en de hond aangelijnd sta je binnen tien minuten in de sneeuw. De stad zelf is compact en hondvriendelijk langs de Inn.`, travel: `ca. 8,5 uur rijden via Duitsland, of trein met overstap in Frankfurt/München (hond met treinkaartje)` },
      { slug: 'malaga', why: `In februari draait de Costa del Sol nog rond de 17-18°C, ideaal voor lange strandwandelingen zonder de zomerse hitte. Buiten het hoogseizoen tolereren meer stranden een hond, ook al geldt het officiële verbod formeel het hele jaar.`, travel: `directe vlucht vanaf Schiphol, ca. 2,5 uur (kleine hond in de cabine bij sommige maatschappijen, grotere in het verwarmde ruim), of ca. 20 uur rijden` },
    ] },
    { emoji: '🐣', dates: `Paasweekend · Goede Vrijdag 26 mrt t/m 2e Paasdag 29 mrt 2027`, label: `Paasweekend`, trip: `Verlengd weekend: vier dagen`, blurb: `Goede Vrijdag is in Nederland geen officiële vrije dag voor iedereen, maar veel scholen en bedrijven sluiten toch, wat er een verlengd weekend van maakt. Genoeg voor een korte stap over de grens naar een stad op loopafstand-schaal.`, picks: [
      { slug: 'bruges', why: `Vlak en zonder verkeer, dus heel comfortabel voor een hond die loopt: grachten, kasseien en parken zonder hoogteverschil. De Belgen zijn over het algemeen soepel met honden op het terras.`, travel: `ca. 3 uur rijden via de A16/E17, of trein via Antwerpen/Gent (ca. 3,5 uur)` },
      { slug: 'cologne', why: `Het voorjaar verzacht de stad: minder toeristen dan met kerst, terrasjes langs de Rijn gaan weer open, en de Hohenzollernbrücke is een makkelijke wandelroute met de hond.`, travel: `ca. 2,5 uur rijden via de A61/A4, of ICE vanaf Amsterdam/Utrecht (muilkorf verplicht in Duitsland)` },
      { slug: 'maastricht', why: `Een paasweekend zonder lange reistijd: de Cannerberg en het Maasdal geven volop ruimte om de hond los te laten op de hondenlosloopgebieden buiten het centrum.`, travel: `ca. 2 uur rijden via de A2, of NS-trein met dagkaart hond` },
    ] },
    { emoji: '🌷', dates: `Meivakantie · za 24 apr t/m zo 2 mei 2027 (incl. Koningsdag di 27 apr)`, label: `Meivakantie`, trip: `Negen dagen: verder de kaart op`, blurb: `Negen dagen is genoeg om verder te rijden dan de buurlanden. Koningsdag valt er middenin, dus vertrek liever een dag eerder of later om de drukte op de weg te vermijden. Het voorjaar is nog fris genoeg voor een hond die niet tegen hitte kan.`, picks: [
      { slug: 'san-sebastian', why: `De beschutte Concha-baai en pintxos-terrasjes in de lente, met Ondarreta buiten het hoogseizoen toegankelijk voor honden. Een lange rit, maar het weer is het waard.`, travel: `ca. 20 uur rijden via Frankrijk (beter over twee dagen verdelen), of vlucht via Madrid/Bilbao vanaf Schiphol (ca. 3,5 uur met overstap)` },
      { slug: 'annecy', why: `Het turquoise Alpenmeer met een hondenstrand (Plage des Marquisats) en schaduwrijke oeverpaden, nog rustig voor het hoogseizoen begint.`, travel: `ca. 8,5 uur rijden via Duitsland/Zwitserland, of trein met overstap in Parijs/Genève` },
      { slug: 'luxembourg', why: `Compact, groen en makkelijk te voet met een hond: de Chemin de la Corniche geeft uitzicht over de oude stad zonder dat je ver hoeft te lopen.`, travel: `ca. 4 uur rijden via de A67/A2, of trein met overstap in Brussel` },
    ] },
    { emoji: '🕊️', dates: `Bevrijdingsdag & Hemelvaart · wo 5 mei + do 6 mei 2027`, label: `Bevrijdingsdag/Hemelvaart-brug`, trip: `Lang weekend: vier tot vijf dagen`, blurb: `Bevrijdingsdag valt op woensdag, Hemelvaart op donderdag: samen met een vrije vrijdag krijg je een weekend van vijf dagen. Kort genoeg om dichtbij te blijven, maar lang genoeg voor iets verder dan de buurstad.`, picks: [
      { slug: 'texel', why: `Het eiland heeft kilometers hondenstrand waar een hond het hele jaar los mag lopen, en de duinpaden van Nationaal Park Duinen van Texel zijn gemaakt voor lange wandelingen.`, travel: `ca. 1,5 uur rijden naar Den Helder plus de TESO-veerboot (hond mag mee op het autodek of buitendek, geen reservering nodig voor de hond)` },
      { slug: 'antwerp', why: `Een compacte stad met de Cogels-Osylei en het Nachtegalenpark voor lange uitlaatrondes, en een haven waar de wandelpaden zich eindeloos voortzetten.`, travel: `ca. 2 uur rijden via de A16/A1, of NS-trein rechtstreeks naar Antwerpen-Centraal` },
      { slug: 'dusseldorf', why: `De Rijnoever bij de Altstadt is een lang, vlak wandelpad, en de stad staat bekend als een van de meest hondvriendelijke van Duitsland, met veel cafés die een bakje water klaarzetten.`, travel: `ca. 2 uur rijden via de A12/A3, of directe ICE vanaf Arnhem/Utrecht (muilkorf verplicht)` },
    ] },
    { emoji: '🌸', dates: `Pinksterweekend · zo 16 mei + ma 17 mei 2027 (weekend 15-17 mei)`, label: `Pinksterweekend`, trip: `Kort weekend: dichtbij`, blurb: `Een kort weekend van drie dagen, perfect voor een stad die je zonder haast te voet kunt zien. Half mei is Nederland en de buurlanden op hun groenst, en de terrassen gaan weer vol open.`, picks: [
      { slug: 'scheveningen', why: `Een lang, vlak strand vlak bij huis met vaste hondenstrandzones, plus de Pier voor een wandeling met zeezicht zonder ver te hoeven reizen.`, travel: `binnen Nederland, ca. 1 uur rijden of trein/tram vanaf de meeste steden` },
      { slug: 'rotterdam', why: `Het Park en de Kop van Zuid geven ruime, autoluwe wandelroutes langs het water, en de stad is over het algemeen soepel met honden in cafés met terras.`, travel: `binnen Nederland, NS-trein rechtstreeks (dagkaart hond nodig als de hond niet in een mand past)` },
      { slug: 'colmar', why: `Het kleine vakwerkstadje is in een lang weekend goed te overzien, met rustige wandelingen langs de Lauch weg van de drukte.`, travel: `ca. 6 uur rijden via Duitsland/Frankrijk, of trein met overstap in Straatsburg` },
    ] },
    { emoji: '☀️', dates: `Zomervakantie · Noord 10 jul-22 aug, Midden 17 jul-29 aug, Zuid 24 jul-5 sep 2027`, label: `Zomervakantie`, trip: `Zes weken: ver weg maar koel`, blurb: `Zes weken schoolvakantie, gespreid over drie regio's zodat je zelf kunt kiezen wanneer je gaat. De ene regel met een hond: mijd de Middellandse Zee in het hoogseizoen, waar het asfalt tot 50°C oploopt en de middagwandeling gevaarlijk wordt. Kies voor hoogte, meren of de koelere Atlantische kust.`, picks: [
      { slug: 'salzburg', why: `Een basiskamp voor de meren van het Salzkammergut: laat de hond zwemmen in de Wolfgangsee, wandel door koele bossen, en ontsnap aan de hitte in het dal door de hoogte in te trekken.`, travel: `ca. 9 uur rijden via Duitsland, of Nightjet met overstap` },
      { slug: 'bolzano', why: `Zuid-Tirol is bij hondenbezitters populair om de vele bewegwijzerde wandelpaden direct vanuit de stad, en de Italiaans-Oostenrijkse gastvrijheid tegenover honden in restaurants.`, travel: `ca. 11 uur rijden via Duitsland/Oostenrijk, beter te verdelen over twee dagen` },
      { slug: 'san-sebastian', why: `De Atlantische kust houdt de Baskische kust in augustus 8-10°C koeler dan de Middellandse Zee. Zeewind, groene heuvels en vroege ochtenduren op het strand voor de hond.`, travel: `ca. 20 uur rijden (verdeel over twee dagen), of vlucht via Madrid/Bilbao vanaf Schiphol` },
    ] },
    { emoji: '🍂', dates: `Herfstvakantie · Noord/Midden 16-24 okt, Zuid 23-31 okt 2027`, label: `Herfstvakantie`, trip: `Laatste warmte: een week`, blurb: `Eind oktober is het in Nederland al kil, maar het Iberisch schiereiland blijft nog mild. Een week is genoeg voor het uiterste zuidwesten, waar de zeetemperatuur nog aangenaam is en de hondenstranden weer open zijn na de zomerverboden.`, picks: [
      { slug: 'porto', why: `Oktobertemperaturen rond 21°C, wandelingen langs de Douro, en de Atlantische stranden bij Foz die weer honden verwelkomen zodra de zomer voorbij is.`, travel: `vlucht vanaf Schiphol, ca. 2,5 uur (kleine hond in de cabine bij sommige maatschappijen, grotere in verwarmd ruim), of ca. 20 uur rijden` },
      { slug: 'biarritz', why: `De herfst maakt de Baskische kust rustig, en het zomerse hondenverbod op het strand is dan opgeheven, dus de grote stranden gaan weer open voor een lange sprint.`, travel: `ca. 15 uur rijden via Frankrijk, beter over twee dagen, of vlucht via Bordeaux/Bilbao` },
      { slug: 'freiburg', why: `Een goed te belopen universiteitsstad met het Zwarte Woud op tien minuten voor lange, herfstkleurige boswandelingen ver van de drukte.`, travel: `ca. 5,5 uur rijden via Duitsland, of ICE met overstap in Mannheim` },
    ] },
    { emoji: '🎄', dates: `Kerstvakantie · za 25 dec 2027 t/m zo 9 jan 2028`, label: `Kerstvakantie`, trip: `Kerstmarkten: kort tot middellang`, blurb: `De kerstmarkten zijn de reden om in december te reizen, en de kou doet een hond over het algemeen goed. Alles hieronder ligt binnen een dagrit, dus je hoeft niet ver om toch echt van sfeer te wisselen.`, picks: [
      { slug: 'cologne', why: `Zeven markten in één goed te belopen stad en Duitslands laagste huisdiertoeslagen. Een makkelijke rit over de snelweg zodra je de grens over bent.`, travel: `ca. 2,5 uur rijden via de A61/A4, of ICE vanaf Amsterdam/Utrecht (muilkorf verplicht in Duitsland)` },
      { slug: 'strasbourg', why: `De grachten van Petite France onder kerstverlichting, en veel terrassen in de Elzas die een hond gewoon binnenlaten bij de open haard.`, travel: `ca. 6,5 uur rijden via Duitsland, of trein met overstap in Straatsburg` },
      { slug: 'dusseldorf', why: `De Altstadt-kerstmarkt is compact genoeg om met een hond aan de lijn goed te doen, en de Rijnoever geeft ruimte om tussen de kraampjes door even stevig door te lopen.`, travel: `ca. 2 uur rijden via de A12/A3, of directe ICE vanaf Arnhem/Utrecht` },
    ] },
  ] },
}

// One far, flight-reachable idea appended to each period (index-aligned to that
// locale's CALENDARS periods). Always a sun option in winter. Slugs come from
// the same scraped data so hotels + photos render.
const FAR: Record<LocaleKey, Pick[]> = {
  en: [
    { slug: 'tenerife', why: `Tenerife gives a winter-sun reset for you and the dog: mild 18-20C days, plenty of dog-friendly beaches like Playa de la Tejita, and coastal walks that beat a grey UK January. Good base if you want a proper week away rather than a quick hop.`, travel: `Flights from the UK are about 4-4.5h. UK dogs cannot fly in-cabin: options are manifested pet cargo with an approved carrier, or drive/ferry to France and fly on from an EU airport that allows dogs in the hold.` },
    { slug: 'lanzarote', why: `Lanzarote's volcanic landscape means dry, walkable trails even in February, and temperatures stay comfortably in the high teens, a real contrast to a wet UK half term. Fewer crowds than the Canaries' bigger islands too.`, travel: `Around 4-4.5h flight from the UK. No in-cabin flying for dogs from the UK: book approved pet cargo, or ferry/drive to mainland Europe and connect from there.` },
    { slug: 'corfu', why: `Corfu in April is green, blooming and warm without the summer heat, with shaded olive-grove walks and quiet coves that suit dogs far better than peak-season beaches. A nice step up from the short Easter drive/ferry trips.`, travel: `Roughly 3.5-4h flight from the UK. UK pet dogs cannot fly in-cabin: use manifested cargo, or drive/ferry to mainland Europe and pick up a flight from there.` },
    { slug: 'paphos', why: `Paphos offers reliable spring sunshine and coastal paths around the archaeological park that are pleasant for dogs before Cyprus gets too hot. A longer-haul option for a bank holiday if you want to bank real sun.`, travel: `About 4.5-5h flight from the UK. No in-cabin travel for UK dogs: arrange approved pet cargo, or drive/ferry to Europe and fly onward from there.` },
    { slug: 'rhodes', why: `Rhodes in late May is warm but not yet scorching, with old-town cobbled streets and pine-forest trails that give dogs shade and interest beyond just beach time. Good half-term length trip for a bigger change of scenery.`, travel: `Around 4h flight from the UK. UK dogs cannot fly in-cabin: book manifested pet cargo, or drive/ferry to mainland Europe and fly from an EU hub instead.` },
    { slug: 'funchal', why: `Madeira stays milder than the Mediterranean in summer thanks to the Atlantic, so it is a sun option that avoids the worst heat risk for dogs. Levada walks are shaded and there is always a cooler coastal breeze.`, travel: `Around 4h flight from the UK. No in-cabin flying for UK dogs: use approved pet cargo, or drive/ferry to mainland Europe and fly on, keeping travel to the cool early morning or evening.` },
    { slug: 'gozo', why: `Gozo is quieter and greener than Malta's main island, with rural paths and a slower pace that suits dogs once the worst of the summer heat starts to ease. Easy to keep walks to early morning or dusk.`, travel: `About 3h flight from the UK. UK pet dogs cannot fly in-cabin: arrange manifested cargo, or drive/ferry to mainland Europe and fly onward, planning walks outside the midday heat.` },
    { slug: 'gran-canaria', why: `Gran Canaria still runs 22-24C in October, so it is a solid autumn-sun swap for the usual half-term drive trips, with dune walks at Maspalomas and dog-friendly stretches away from the main resorts.`, travel: `Roughly 4-4.5h flight from the UK. No in-cabin option for UK dogs: book approved pet cargo, or drive/ferry to mainland Europe and fly from there instead.` },
    { slug: 'maspalomas', why: `If markets and cold walks are not for you this year, Maspalomas offers a genuine winter-sun alternative with flat, easy beach walks and mild 20C days over the Christmas period, low stress for an older or heat-sensitive dog.`, travel: `About 4.5h flight from the UK. UK dogs cannot fly in-cabin: use manifested pet cargo, or drive/ferry to mainland Europe and pick up a connecting flight there.` },
  ],
  fr: [
    { slug: 'funchal', why: `Madère garde une douceur printanière toute l'année (18-20°C en hiver), avec des sentiers côtiers et des levadas ombragées parfaites pour promener votre chien sans les frimas de la métropole. L'île reste petite et facile à explorer en voiture de location, avec de nombreux hébergements qui acceptent les animaux.`, travel: `Environ 3h30 de vol depuis Paris vers Funchal. Passeport européen pour animaux (Madère fait partie de l'UE) : petit chien en cabine selon la compagnie et le poids, sinon soute climatisée.` },
    { slug: 'valletta', why: `Malte offre un climat déjà printanier en avril et un archipel compact où l'on se déplace facilement avec un chien, entre remparts, criques et villages de pêcheurs. C'est une destination lointaine mais courte en vol, idéale pour un pont de quelques jours.`, travel: `Environ 2h30 de vol depuis Paris. Malte est dans l'UE : passeport européen suffit, petit chien en cabine possible sur certaines compagnies, sinon soute climatisée.` },
    { slug: 'corfu', why: `Corfou déroule déjà son vert méditerranéen au printemps, avec des criques tranquilles et des chemins de campagne agréables à arpenter avec votre chien, loin de la foule estivale. L'île reste accessible en voiture de location pour enchaîner plusieurs spots.`, travel: `Environ 3h de vol depuis Paris vers Corfou. Grèce membre de l'UE : passeport européen animal, petit chien en cabine selon compagnie et poids, sinon soute climatisée.` },
    { slug: 'agadir', why: `Agadir offre un soleil quasi garanti fin mai et de longues plages où votre chien peut courir en laisse tôt le matin. L'ambiance est plus dépaysante qu'en Europe, tout en restant simple d'accès pour un pont de quatre jours.`, travel: `Environ 3h20 de vol depuis Paris. Le Maroc est hors UE : carnet de vaccination et certificat sanitaire (AHC) à prévoir en plus, formalités à anticiper une à deux semaines avant. Petit chien en cabine rarement accepté vers le Maroc, prévoir la soute climatisée.` },
    { slug: 'ibiza', why: `Ibiza hors saison de fête révèle son visage le plus calme, avec des criques préservées et des sentiers dans le maquis où votre chien peut se dégourdir les pattes. Le vol est court pour une destination qui dépayse vraiment.`, travel: `Environ 1h50 de vol depuis Paris vers Ibiza. Espagne dans l'UE : passeport européen animal, petit chien en cabine selon compagnie, sinon soute climatisée.` },
    { slug: 'chania', why: `La Crète séduit par ses plages et son arrière-pays montagneux, mais l'été y est chaud : réservez les balades avec votre chien tôt le matin ou en fin de journée, et évitez le bitume brûlant en pleine chaleur de midi. De nombreuses tavernes en terrasse ombragée accueillent volontiers les chiens.`, travel: `Environ 3h30 de vol depuis Paris vers La Canée. Grèce dans l'UE : passeport européen animal, petit chien en cabine selon compagnie et poids, sinon soute climatisée (vérifiez les restrictions de température estivale).` },
    { slug: 'rhodes', why: `Rhodes profite encore d'une douce arrière-saison en automne, avec des températures agréables pour explorer la vieille ville et les plages plus tranquilles en laisse avec votre chien. Une bonne alternative ensoleillée aux vacances de Toussaint plus fraîches en France.`, travel: `Environ 3h30 de vol depuis Paris vers Rhodes. Grèce dans l'UE : passeport européen animal, petit chien en cabine selon compagnie, sinon soute climatisée.` },
    { slug: 'marrakech', why: `Marrakech offre un climat doux et ensoleillé en novembre, loin de la grisaille française, avec des riads qui acceptent parfois les chiens et des jardins ombragés pour les promenades. Le dépaysement est total pour un pont de quatre jours.`, travel: `Environ 3h20 de vol depuis Paris. Le Maroc est hors UE : certificat sanitaire (AHC) et formalités vétérinaires à prévoir en plus, à organiser une à deux semaines avant. Petit chien en cabine rarement accepté, prévoir la soute climatisée.` },
    { slug: 'lanzarote', why: `Lanzarote garantit un hiver doux (18-22°C) avec ses paysages volcaniques et ses longues plages où promener votre chien loin du froid métropolitain pendant les fêtes. L'île se parcourt facilement en voiture de location.`, travel: `Environ 4h de vol depuis Paris vers Lanzarote. Espagne dans l'UE : passeport européen animal, petit chien en cabine selon compagnie et poids, sinon soute climatisée.` },
  ],
  es: [
    { slug: 'maspalomas', why: `Sol garantizado en pleno invierno con playas amplias donde el perro puede correr sin agobios de calor. El paseo marítimo de Maspalomas es plano y largo, ideal para piernas cortas después de las comidas de estas fechas.`, travel: `Vuelo directo desde Madrid de unas 2h30 a Gran Canaria. Perros pequeños en cabina con Iberia o Vueling según peso y transportín homologado, los grandes en bodega climatizada.` },
    { slug: 'funchal', why: `Madeira ofrece clima suave todo el año, perfecto para escapar del frío peninsular sin el madrugón de un vuelo largo. Los miradores y levadas cerca de Funchal permiten rutas cortas con el perro atado.`, travel: `Vuelo directo desde Madrid o Lisboa de unas 3h. Al ser Portugal, solo hace falta el pasaporte europeo del perro, sin papeleo extra.` },
    { slug: 'paphos', why: `Chipre en primavera tiene temperaturas suaves y playas menos masificadas que otros destinos griegos, buen momento para explorar con calma junto al perro. El parque arqueológico junto al mar tiene zonas de paseo en sombra.`, travel: `Vuelo directo desde Madrid de unas 4h30, algo largo para un perro pequeño en cabina, mejor valorar bodega climatizada si el trayecto se hace pesado.` },
    { slug: 'gozo', why: `Gozo, la isla pequeña de Malta, tiene un ritmo tranquilo y calas accesibles a pie donde el perro puede refrescarse. Mayo trae temperaturas agradables sin el calor todavía agobiante del verano.`, travel: `Vuelo directo desde Madrid de unas 3h a Malta, luego ferry corto a Gozo. Trámite sencillo con pasaporte europeo, sin cuarentena.` },
    { slug: 'heraklion', why: `Creta compensa el calor del verano con playas de aguas cristalinas donde refrescar al perro a media mañana. Mejor reservar los paseos largos para el amanecer o el atardecer y evitar la caminata de mediodía.`, travel: `Vuelo directo desde Madrid de unas 3h30. En verano conviene comprobar que la aerolínea garantiza bodega climatizada, el asfalto del aeropuerto puede quemar las almohadillas.` },
    { slug: 'santorini', why: `Santorini en octubre pierde las multitudes del verano y conserva temperaturas suaves para pasear por los pueblos blancos con el perro. Las playas de arena oscura fuera de temporada están mucho más tranquilas.`, travel: `Vuelo con una escala desde Madrid, unas 4h de vuelo efectivo. Isla pequeña, mejor moverse en coche de alquiler con el perro que a pie por las cuestas.` },
    { slug: 'marrakech', why: `Marrakech en noviembre tiene un clima templado ideal para perderse por los jardines y la Medina con el perro con correa corta. Un destino distinto, con olores y ambiente que sorprenden tanto al dueño como al animal.`, travel: `Vuelo directo desde Madrid de solo 1h30, el más corto del pool, pero al ser fuera de la UE hace falta certificado veterinario y trámites de importación, mejor gestionarlo con antelación.` },
    { slug: 'lanzarote', why: `Lanzarote en diciembre regala sol seguro y paisajes volcánicos donde el perro puede corretear lejos del frío peninsular. Los senderos de El Golfo y la costa son llanos y fáciles para toda la familia.`, travel: `Vuelo directo desde Madrid de unas 2h45. Perros pequeños en cabina con Iberia, Vueling o Air Europa según peso y normativa de cada compañía.` },
  ],
  pt: [
    { slug: 'gran-canaria', why: `Clima ameno o ano inteiro, ótimo para fugir ao frio de dezembro com o cão. Muitos trilhos e praias fora de época, sem multidões. Ilha preparada para turismo com animais, fácil encontrar alojamento pet-friendly.`, travel: `Voo direto Lisboa-Gran Canaria, cerca de 2h30. A TAP aceita cão pequeno em cabine até 8kg, animais maiores no porão climatizado. Passaporte europeu do animal chega, sem formalidades extra.` },
    { slug: 'lanzarote', why: `Paisagem vulcânica com trilhos largos e pouco movimentados, ideal para fugir à confusão do Carnaval em Portugal. Sol garantido enquanto o continente está frio e chuvoso.`, travel: `Cerca de 2h40 desde Lisboa, voo direto ou com escala consoante a companhia. Cão pequeno em cabine até 8kg, maiores no porão climatizado. Passaporte europeu obrigatório.` },
    { slug: 'rhodes', why: `A cidade medieval de Rodes tem ruas pedonais e esplanadas onde o cão é bem-vindo. Praias ainda tranquilas antes da época alta, boa altura para explorar com calma.`, travel: `Cerca de 4h desde Lisboa, normalmente com escala em Atenas. Cão pequeno pode viajar em cabine consoante a companhia, maiores no porão. Passaporte europeu obrigatório.` },
    { slug: 'valletta', why: `Distâncias curtas entre os pontos turísticos, muitos cafés e passeios à beira-mar aceitam cães. Boa escolha para uma ponte curta sem grande cansaço de viagem.`, travel: `Voo direto de cerca de 3h desde Lisboa. A TAP e outras companhias aceitam cão pequeno em cabine até 8kg, maiores no porão climatizado.` },
    { slug: 'palma', why: `Fim da primavera ainda ameno em Maiorca, com muitos passeios costeiros e cafés dog-friendly em Palma. A distância curta compensa uma ponte de poucos dias.`, travel: `Voo curto, cerca de 1h40 desde Lisboa. Várias companhias aceitam cão em cabine até 8kg, opção de porão climatizado para cães maiores.` },
    { slug: 'corfu', why: `Ilha verde e sombreada ajuda a amenizar o calor intenso do verão grego. Melhor planear passeios de madrugada ou ao fim da tarde, evitando as horas de mais calor com o cão.`, travel: `Cerca de 4h desde Lisboa, geralmente com escala. Atenção ao calor no porão em pleno verão, preferir voos de madrugada ou noite. Passaporte europeu obrigatório.` },
    { slug: 'marrakech', why: `O outono traz temperaturas mais suaves em Marraquexe, jardins e riads costumam tolerar animais. Por ficar fora da União Europeia, exige mais atenção às formalidades do cão.`, travel: `Voo direto curto, cerca de 1h20 desde Lisboa. Fora do espaço UE, é preciso certificado sanitário e vacina antirrábica válida além do passaporte, confirmar sempre as regras junto da companhia aérea.` },
    { slug: 'las-palmas', why: `Dezembro ameno em Las Palmas, com praia urbana e passeio marítimo onde os cães são bem-vindos. Boa fuga ao frio numa ponte curta de dezembro.`, travel: `Voo direto de cerca de 2h30 desde Lisboa. Cão pequeno em cabine até 8kg, animais maiores no porão climatizado.` },
  ],
  de: [
    { slug: 'tenerife', why: `Teneriffa bietet auch im Januar noch 20 Grad und viele hundefreundliche Strände außerhalb der Hauptsaison. Lange Spaziergänge am Meer statt Kälte zuhause, ideal für aktive Hunde im Winter.`, travel: `Ca. 4,5 Stunden Flug ab Frankfurt/München. Kleine Hunde bis 8 kg dürfen bei Lufthansa in der Kabine mitfliegen, größere reisen im klimatisierten Frachtraum. EU-Heimtierausweis erforderlich.` },
    { slug: 'corfu', why: `Korfu zeigt sich im Frühling grün und mild, ideal für ausgedehnte Wanderungen mit dem Hund abseits der Sommerhitze. Viele Tavernen und Strände sind hundefreundlich und noch nicht überlaufen.`, travel: `Ca. 2,5 Stunden Flug ab Frankfurt/München. Kleine Hunde in der Kabine, größere im Frachtraum. EU-Heimtierausweis genügt, keine Zusatzformalitäten.` },
    { slug: 'palma', why: `Mallorca lockt im Mai mit angenehmen Temperaturen und vielen hundefreundlichen Buchten rund um Palma. Für ein verlängertes Wochenende reicht die kurze Flugzeit gut aus.`, travel: `Ca. 2 Stunden Flug ab Frankfurt/München. Kleine Hunde in der Kabine möglich, größere im Frachtraum. EU-Heimtierausweis reicht.` },
    { slug: 'paphos', why: `Zypern bietet im Juni schon Sommerfeeling mit angenehmer Trockenheit, gut für Hunde, die Hitze besser vertragen als Schwüle. Rund um Paphos gibt es ruhige, hundefreundliche Küstenwege.`, travel: `Ca. 3,5 Stunden Flug ab Frankfurt/München. Kleine Hunde in der Kabine, größere im klimatisierten Frachtraum. EU-Heimtierausweis nötig.` },
    { slug: 'heraklion', why: `Kreta ist im Hochsommer sehr heiß, Spaziergänge sollten früh morgens oder abends in der Dämmerung stattfinden. Dafür gibt es hundefreundliche Buchten mit schattigen Rückzugsorten.`, travel: `Ca. 3 Stunden Flug ab Frankfurt/München. Achtung: Im Sommer gelten bei vielen Airlines Hitzebeschränkungen für Tiere im Frachtraum, kleine Hunde besser in der Kabine buchen.` },
    { slug: 'funchal', why: `Madeira hat ein mildes Klima fast das ganze Jahr über und im Herbst angenehme 22 Grad. Die grünen Levada-Wege rund um Funchal eignen sich hervorragend für lange Hundewanderungen.`, travel: `Ca. 4 Stunden Flug ab Frankfurt/München. Kleine Hunde in der Kabine, größere im Frachtraum. EU-Heimtierausweis erforderlich.` },
    { slug: 'marrakech', why: `Marrakesch überrascht im Oktober mit warmen, trockenen Tagen und einer ganz anderen Kulisse als die üblichen Nahziele. Für ein kurzes Wochenende lohnt sich der Kontrast besonders.`, travel: `Ca. 3,5 Stunden Flug ab Frankfurt/München. Marokko ist nicht EU, zusätzlich zum Heimtierausweis braucht es eine Einfuhrgenehmigung und tierärztliche Bescheinigung, rechtzeitig planen.` },
    { slug: 'maspalomas', why: `Gran Canaria bietet über Weihnachten verlässlich Sonne und milde Temperaturen statt grauem Winterwetter. Die Dünen von Maspalomas laden zu langen Spaziergängen mit dem Hund ein.`, travel: `Ca. 4,5 Stunden Flug ab Frankfurt/München. Kleine Hunde bis 8 kg in der Kabine, größere im klimatisierten Frachtraum. EU-Heimtierausweis nötig.` },
  ],
  nl: [
    { slug: 'tenerife', why: `Tenerife biedt ook in januari nog 18-20°C en veel hondenstranden buiten het hoogseizoen, zoals Playa de la Tejita. Een echte reset na de grijze decembermaand thuis.`, travel: `directe vlucht vanaf Schiphol, ca. 4,5 uur. KLM neemt kleine honden tot 8 kg mee in de cabine, grotere honden reizen in het verwarmde ruim. EU-dierenpaspoort verplicht.` },
    { slug: 'lanzarote', why: `Het vulkanische landschap betekent droge, goed beloopbare paden, ook in februari, met temperaturen die prettig in de hoge tienen blijven. Rustiger dan de grotere Canarische eilanden.`, travel: `ca. 4,5 uur vlucht vanaf Schiphol. Kleine hond in de cabine bij sommige maatschappijen, grotere honden in het verwarmde ruim. EU-dierenpaspoort nodig.` },
    { slug: 'corfu', why: `Korfoe is in april groen en bloeiend zonder de zomerhitte, met schaduwrijke wandelingen tussen de olijfgaarden en rustige baaien die veel beter bij een hond passen dan een strand in het hoogseizoen.`, travel: `ca. 3,5 uur vlucht vanaf Schiphol. Kleine hond in de cabine, grotere in het ruim. EU-dierenpaspoort volstaat, geen extra formaliteiten binnen de EU.` },
    { slug: 'paphos', why: `Cyprus biedt betrouwbare lentezon en kustpaden rond het archeologisch park die prettig zijn voor de hond voordat het eiland te heet wordt. Een verdere bestemming voor wie de meivakantie echt wil benutten.`, travel: `ca. 4,5 uur vlucht vanaf Schiphol. Kleine hond in de cabine bij sommige maatschappijen, grotere in het verwarmde ruim. EU-dierenpaspoort verplicht.` },
    { slug: 'valletta', why: `Malta is in mei al zomers zonder de felste hitte, en de korte afstanden tussen de bezienswaardigheden maken het compact reizen met een hond aan de lijn.`, travel: `ca. 3,5 uur vlucht vanaf Schiphol. Kleine hond soms in de cabine, check per maatschappij; grotere honden in het verwarmde ruim. EU-dierenpaspoort nodig.` },
    { slug: 'rhodes', why: `Rhodos is eind mei warm maar nog niet verzengend, met geplaveide straatjes in de oude stad en pijnbossen die schaduw en afwisseling geven naast het strand.`, travel: `ca. 4 uur vlucht vanaf Schiphol. Kleine hond in de cabine bij sommige maatschappijen, grotere in het verwarmde ruim. EU-dierenpaspoort verplicht.` },
    { slug: 'heraklion', why: `Kreta compenseert de zomerhitte met kristalhelder water om de hond af te koelen. Plan lange wandelingen alleen vroeg in de ochtend of bij zonsondergang, nooit rond het middaguur.`, travel: `ca. 4 uur vlucht vanaf Schiphol. Check in de zomer of de maatschappij een verwarmd/gekoeld ruim garandeert, het asfalt op het platform kan de pootjes verbranden.` },
    { slug: 'funchal', why: `Madeira blijft door de Atlantische ligging milder dan de Middellandse Zee, dus het is een zon-optie zonder het ergste hitterisico voor de hond. De levada-paden liggen in de schaduw en er is altijd een koele zeebries.`, travel: `ca. 4,5 uur vlucht vanaf Schiphol, meestal met overstap. Kleine hond in de cabine, grotere in het ruim, en plan de reis in de vroege ochtend of avond om de hitte te vermijden.` },
    { slug: 'maspalomas', why: `Gran Canaria biedt rond de kerst betrouwbaar zon en milde temperaturen in plaats van grijs winterweer thuis. De duinen van Maspalomas zijn vlak en goed te belopen met de hond.`, travel: `ca. 4,5 uur vlucht vanaf Schiphol. Kleine hond tot 8 kg in de cabine, grotere honden in het verwarmde ruim. EU-dierenpaspoort verplicht.` },
  ],
}

const COPY: Record<LocaleKey, {
  eyebrow: string; title: string; intro: string; note: string
  calTitle: string; schoolLabel: string; holsLabel: string
  travelLabel: string; whyLabel: string; staysLabel: string; farLabel: string
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
    calTitle: 'The 2027 calendar at a glance', schoolLabel: 'School holidays', holsLabel: 'Bank holidays',
    travelLabel: 'Travel from the UK', whyLabel: 'Why here', staysLabel: 'Where to stay, across budgets', farLabel: 'By plane',
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
    calTitle: 'Le calendrier 2027 en un coup d\'œil', schoolLabel: 'Vacances scolaires', holsLabel: 'Jours fériés',
    travelLabel: 'Trajet depuis la France', whyLabel: 'Pourquoi ici', staysLabel: 'Où dormir, selon les budgets', farLabel: 'En avion',
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
    calTitle: 'El calendario 2027 de un vistazo', schoolLabel: 'Vacaciones escolares', holsLabel: 'Festivos',
    travelLabel: 'Viaje desde España', whyLabel: 'Por qué aquí', staysLabel: 'Dónde alojarse, por presupuesto', farLabel: 'En avión',
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
    calTitle: 'O calendário 2027 num relance', schoolLabel: 'Férias escolares', holsLabel: 'Feriados',
    travelLabel: 'Viagem a partir de Portugal', whyLabel: 'Porquê aqui', staysLabel: 'Onde ficar, por orçamento', farLabel: 'De avião',
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
    calTitle: 'Der Kalender 2027 auf einen Blick', schoolLabel: 'Schulferien', holsLabel: 'Feiertage',
    travelLabel: 'Anreise ab Deutschland', whyLabel: 'Warum hier', staysLabel: 'Wo übernachten, über alle Budgets', farLabel: 'Per Flug',
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
  nl: {
    eyebrow: 'SCHOOLVAKANTIES NEDERLAND 2027 · REIZEN MET HOND',
    title: 'Waar naartoe met je hond in de schoolvakanties en op feestdagen 2027',
    intro: 'Een periode-voor-periode plan door de echte Nederlandse schoolkalender van 2027: voor elke vakantie en elk lang weekend twee of drie reisideeën met je hond, de eerlijke reistijd vanuit Nederland, en drie echte hotels over verschillende budgetten. Een lang weekend blijft dichtbij; een of twee weken maken de langere rit de moeite waard. We houden rekening met de hondenrealiteit: zomerhitte, seizoensgebonden strandverboden en de regels voor de trein.',
    note: 'De data volgen de officiële Nederlandse schoolvakanties 2027 (Rijksoverheid, gestaffeld per regio Noord/Midden/Zuid) en de nationale feestdagen. Check altijd de vakantiedata van jouw eigen school of regio.',
    calTitle: 'De kalender van 2027 in één oogopslag', schoolLabel: 'Schoolvakanties', holsLabel: 'Feestdagen',
    travelLabel: 'Reizen vanuit Nederland', whyLabel: 'Waarom hier', staysLabel: 'Waar overnachten, per budget', farLabel: 'Met het vliegtuig',
    tierBudget: 'Budget', tierMid: 'Middenklasse', tierPremium: 'Premium',
    from: 'vanaf', night: 'nacht', petFeeNil: 'Geen huisdiertoeslag', petFee: 'huisdiertoeslag', bookCta: 'Data bekijken →', destCta: 'Volledige stadsgids →',
    practicalHeading: 'Plannen rond de kalender van 2027',
    practical: [
      { h: 'De hond in de trein', p: 'NS: een hond mag gratis mee in een gesloten mand die in de bagageruimte past, anders is een dagkaart hond nodig (aangelijnd, muilkorf aanbevolen). In Duitsland en België gelden vaak vergelijkbare regels, maar check altijd de muilkorfplicht van het land waar je naartoe reist.' },
      { h: 'Match de afstand met je vrije dagen', p: 'Een lang weekend van drie tot vijf dagen = binnen 2-3 uur rijden (België, West-Duitsland). Een vakantieweek = een buurland verder, zoals Oostenrijk of het Iberisch schiereiland. De zes weken zomervakantie = de lange rit naar de Alpen of het zuiden waard.' },
      { h: 'Zomerhitte is het echte risico', p: 'Vermijd in juli en augustus de Middellandse Zee rond het middaguur: het wegdek loopt op tot 50°C en verbrandt de pootjes, en een auto wordt binnen minuten dodelijk. Kies voor meren, hoogte of de koelere Atlantische kust, en wandel alleen bij zonsopgang en zonsondergang.' },
      { h: 'Seizoensgebonden strandverboden', p: 'De meeste Franse, Spaanse en Portugese stranden verbieden honden tijdens het badseizoen (ongeveer juni-september) en heropenen de rest van het jaar. De voorjaarsvakantie, de meivakantie en de herfstvakantie vallen in de open periodes, een stil voordeel van reizen rond de schoolvakanties.' },
    ],
    faqHeading: 'Veelgestelde vragen',
    faqs: [
      { q: 'Mag mijn hond mee in de trein voor deze vakanties?', a: 'Ja. Bij de NS reist een hond in een gesloten mand gratis mee; past de hond er niet in, dan is een dagkaart hond nodig en moet hij aangelijnd blijven. In Duitsland en België gelden losse regels, dus check dit vooraf per traject.' },
      { q: 'Zijn de schoolvakanties overal in Nederland gelijk?', a: 'Nee. De voorjaars-, mei- en zomervakantie zijn gestaffeld over regio Noord, Midden en Zuid, terwijl de herfst- en kerstvakantie grotendeels landelijk vastliggen. Check altijd de vakantiedata van jouw eigen regio voor je boekt.' },
      { q: 'Welke vakantie van 2027 is het beste voor een eerste reis met hond?', a: 'Het paasweekend of de meivakantie. Het weer is mild, de afstanden blijven overzichtelijk, en twee of drie nachten laten een onervaren hond wennen aan reizen zonder een lange rit.' },
      { q: 'Wanneer kun je beter de Middellandse Zee met hond mijden?', a: 'In het hoogseizoen (juli-augustus). De hitte is echt gevaarlijk en de meeste zuidelijke stranden verbieden honden in die maanden sowieso. Bewaar het zuiden voor de voorjaars- of herfstvakantie, mild en met open hondenstranden.' },
    ],
    sticky: { label: 'Huisdiervriendelijke hotels voor de vakanties van 2027', cta: 'Bekijk hotels' },
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
        nl: `${SITE_URL}/nl/guides/${SLUG}`,
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

// A compact "2027 at a glance" block at the top of each locale: the country's
// own school-holiday dates (by zone/region where they differ) and its public
// holidays, researched per country for 2027.
type CalRow = { name: string; dates: string }
type CalHol = { name: string; date: string }
const CAL_SUMMARY: Record<LocaleKey, { school: CalRow[]; public: CalHol[] }> = {
  en: {
    school: [
      { name: 'Spring half term', dates: '15-19 Feb 2027 (varies by council)' },
      { name: 'Easter holidays', dates: '22 Mar - 9 Apr 2027 (varies by council)' },
      { name: 'Summer half term', dates: '31 May - 4 Jun 2027 (varies by council)' },
      { name: 'Summer holidays', dates: '23 Jul - 3 Sep 2027 (approx, varies by council)' },
      { name: 'Autumn half term', dates: '25-29 Oct 2027 (varies by council)' },
      { name: 'Christmas holidays', dates: '17 Dec 2027 - 4 Jan 2028 (approx)' },
    ],
    public: [
      { name: `New Year's Day`, date: 'Fri 1 Jan' },
      { name: 'Good Friday', date: 'Fri 26 Mar' },
      { name: 'Easter Monday', date: 'Mon 29 Mar' },
      { name: 'Early May', date: 'Mon 3 May' },
      { name: 'Spring bank hol', date: 'Mon 31 May' },
      { name: 'Summer bank hol', date: 'Mon 30 Aug' },
      { name: 'Christmas (sub)', date: 'Mon 27 Dec' },
      { name: 'Boxing Day (sub)', date: 'Tue 28 Dec' },
    ],
  },
  fr: {
    school: [
      { name: `Vacances d'hiver`, dates: 'Zone C 6-22 fév, Zone A 13 fév-1 mars, Zone B 20 fév-8 mars 2027' },
      { name: 'Vacances de printemps', dates: 'Zone C 3-19 avr, Zone A 10-26 avr, Zone B 17 avr-3 mai 2027' },
      { name: `Pont de l'Ascension`, dates: 'jeu. 6 au ven. 7 mai 2027' },
      { name: `Vacances d'été`, dates: 'à partir du samedi 3 juillet 2027' },
      { name: 'Vacances de la Toussaint', dates: '23 octobre au 8 novembre 2027' },
      { name: 'Vacances de Noël', dates: '18 décembre 2027 au 3 janvier 2028' },
    ],
    public: [
      { name: `Jour de l'An`, date: 'ven. 1 jan' },
      { name: 'Lundi de Pâques', date: 'lun. 29 mars' },
      { name: 'Fête du Travail', date: 'sam. 1 mai' },
      { name: 'Victoire 1945', date: 'sam. 8 mai' },
      { name: 'Ascension', date: 'jeu. 6 mai' },
      { name: 'Lundi de Pentecôte', date: 'lun. 17 mai' },
      { name: 'Fête nationale', date: 'mer. 14 juil' },
      { name: 'Assomption', date: 'dim. 15 août' },
      { name: 'Toussaint', date: 'lun. 1 nov' },
      { name: 'Armistice 1918', date: 'jeu. 11 nov' },
      { name: 'Noël', date: 'sam. 25 déc' },
    ],
  },
  es: {
    school: [
      { name: 'Navidad', dates: '23 dic 2026 - 8 ene 2027 (según comunidad)' },
      { name: 'Semana Santa', dates: '20-28 mar 2027 aprox. (según comunidad, Viernes Santo 26 mar)' },
      { name: 'Verano', dates: 'finales de junio a mediados de septiembre 2027 (según comunidad)' },
    ],
    public: [
      { name: 'Año Nuevo', date: 'vie. 1 ene' },
      { name: 'Reyes', date: 'mié. 6 ene' },
      { name: 'Viernes Santo', date: 'vie. 26 mar' },
      { name: 'Trabajo', date: 'sáb. 1 may' },
      { name: 'Asunción', date: 'dom. 15 ago' },
      { name: 'Fiesta Nacional', date: 'mar. 12 oct' },
      { name: 'Todos los Santos', date: 'lun. 1 nov' },
      { name: 'Constitución', date: 'lun. 6 dic' },
      { name: 'Inmaculada', date: 'mié. 8 dic' },
      { name: 'Navidad', date: 'sáb. 25 dic' },
    ],
  },
  pt: {
    school: [
      { name: 'Férias de Natal', dates: '18 dez 2026 a 3 jan 2027' },
      { name: 'Interrupção do Carnaval', dates: '8 a 10 fev 2027' },
      { name: 'Férias da Páscoa', dates: '22 mar a 2 abr 2027' },
      { name: 'Férias de Verão', dates: 'final de junho a meados de setembro 2027' },
    ],
    public: [
      { name: 'Ano Novo', date: 'sex. 1 jan' },
      { name: 'Carnaval', date: 'ter. 9 fev' },
      { name: 'Sexta-feira Santa', date: 'sex. 26 mar' },
      { name: 'Páscoa', date: 'dom. 28 mar' },
      { name: 'Liberdade', date: 'dom. 25 abr' },
      { name: 'Trabalhador', date: 'sáb. 1 mai' },
      { name: 'Corpo de Deus', date: 'qui. 27 mai' },
      { name: 'Dia de Portugal', date: 'qui. 10 jun' },
      { name: 'Assunção', date: 'dom. 15 ago' },
      { name: 'Implantação da República', date: 'ter. 5 out' },
      { name: 'Todos os Santos', date: 'seg. 1 nov' },
      { name: 'Restauração', date: 'qua. 1 dez' },
      { name: 'Imaculada Conceição', date: 'qua. 8 dez' },
      { name: 'Natal', date: 'sáb. 25 dez' },
    ],
  },
  de: {
    school: [
      { name: 'Winterferien', dates: 'nur einige Länder, meist eine Woche im Februar 2027 (gestaffelt)' },
      { name: 'Osterferien', dates: 'je nach Bundesland Mitte März bis Mitte April 2027' },
      { name: 'Pfingstferien', dates: 'nur einige Länder, rund um Pfingstmontag (17. Mai) 2027' },
      { name: 'Sommerferien', dates: 'gestaffelt 28. Juni bis Mitte September 2027 (je nach Bundesland)' },
      { name: 'Herbstferien', dates: 'je nach Bundesland Anfang Oktober bis Anfang November 2027' },
      { name: 'Weihnachtsferien', dates: 'ca. 22./23. Dezember 2027 bis 5./6. Januar 2028' },
    ],
    public: [
      { name: 'Neujahr', date: 'Fr. 1. Jan' },
      { name: 'Karfreitag', date: 'Fr. 26. März' },
      { name: 'Ostermontag', date: 'Mo. 29. März' },
      { name: 'Tag der Arbeit', date: 'Sa. 1. Mai' },
      { name: 'Christi Himmelfahrt', date: 'Do. 6. Mai' },
      { name: 'Pfingstmontag', date: 'Mo. 17. Mai' },
      { name: 'Deutsche Einheit', date: 'So. 3. Okt' },
      { name: '1. Weihnachtstag', date: 'Sa. 25. Dez' },
      { name: '2. Weihnachtstag', date: 'So. 26. Dez' },
    ],
  },
  nl: {
    school: [
      { name: 'Kerstvakantie (start jaar)', dates: 'za 19 dec 2026 t/m zo 3 jan 2027 (heel Nederland)' },
      { name: 'Voorjaarsvakantie', dates: 'Zuid 13-21 feb, Noord/Midden 20-28 feb 2027' },
      { name: 'Meivakantie', dates: 'za 24 apr t/m zo 2 mei 2027 (heel Nederland)' },
      { name: 'Zomervakantie', dates: 'Noord 10 jul-22 aug, Midden 17 jul-29 aug, Zuid 24 jul-5 sep 2027' },
      { name: 'Herfstvakantie', dates: 'Noord/Midden 16-24 okt, Zuid 23-31 okt 2027' },
      { name: 'Kerstvakantie (eind jaar)', dates: 'za 25 dec 2027 t/m zo 9 jan 2028 (heel Nederland)' },
    ],
    public: [
      { name: 'Nieuwjaarsdag', date: 'vr 1 jan' },
      { name: 'Goede Vrijdag', date: 'vr 26 mrt' },
      { name: '1e Paasdag', date: 'zo 28 mrt' },
      { name: '2e Paasdag', date: 'ma 29 mrt' },
      { name: 'Koningsdag', date: 'di 27 apr' },
      { name: 'Bevrijdingsdag', date: 'wo 5 mei' },
      { name: 'Hemelvaartsdag', date: 'do 6 mei' },
      { name: '1e Pinksterdag', date: 'zo 16 mei' },
      { name: '2e Pinksterdag', date: 'ma 17 mei' },
      { name: '1e Kerstdag', date: 'za 25 dec' },
      { name: '2e Kerstdag', date: 'zo 26 dec' },
    ],
  },
}

// Per-period visual identity: periods are chronological, so a season-ordered
// palette (icy winter -> spring green -> summer amber -> autumn rose -> festive)
// makes each block instantly distinguishable instead of one flat wall. The last
// period of every calendar is December, so it always gets the festive theme.
const THEMES = [
  { band: 'from-indigo-500 to-sky-600', rail: 'border-indigo-200', cardHead: 'from-indigo-50 to-sky-50', numBg: 'text-indigo-700 bg-indigo-100', travelBox: 'bg-indigo-50 border-indigo-100', travelText: 'text-indigo-900' },
  { band: 'from-cyan-500 to-blue-600', rail: 'border-cyan-200', cardHead: 'from-cyan-50 to-blue-50', numBg: 'text-cyan-700 bg-cyan-100', travelBox: 'bg-cyan-50 border-cyan-100', travelText: 'text-cyan-900' },
  { band: 'from-emerald-500 to-teal-600', rail: 'border-emerald-200', cardHead: 'from-emerald-50 to-teal-50', numBg: 'text-emerald-700 bg-emerald-100', travelBox: 'bg-emerald-50 border-emerald-100', travelText: 'text-emerald-900' },
  { band: 'from-lime-500 to-emerald-600', rail: 'border-lime-200', cardHead: 'from-lime-50 to-emerald-50', numBg: 'text-lime-700 bg-lime-100', travelBox: 'bg-lime-50 border-lime-100', travelText: 'text-lime-900' },
  { band: 'from-teal-500 to-cyan-600', rail: 'border-teal-200', cardHead: 'from-teal-50 to-cyan-50', numBg: 'text-teal-700 bg-teal-100', travelBox: 'bg-teal-50 border-teal-100', travelText: 'text-teal-900' },
  { band: 'from-amber-500 to-orange-600', rail: 'border-amber-200', cardHead: 'from-amber-50 to-orange-50', numBg: 'text-amber-700 bg-amber-100', travelBox: 'bg-amber-50 border-amber-100', travelText: 'text-amber-900' },
  { band: 'from-orange-500 to-rose-600', rail: 'border-orange-200', cardHead: 'from-orange-50 to-rose-50', numBg: 'text-orange-700 bg-orange-100', travelBox: 'bg-orange-50 border-orange-100', travelText: 'text-orange-900' },
  { band: 'from-amber-600 to-rose-700', rail: 'border-rose-200', cardHead: 'from-amber-50 to-rose-50', numBg: 'text-rose-700 bg-rose-100', travelBox: 'bg-rose-50 border-rose-100', travelText: 'text-rose-900' },
  { band: 'from-rose-600 to-emerald-700', rail: 'border-emerald-200', cardHead: 'from-rose-50 to-emerald-50', numBg: 'text-rose-700 bg-rose-100', travelBox: 'bg-rose-50 border-rose-100', travelText: 'text-rose-900' },
] as const
const TIER_TEXT = ['text-emerald-700', 'text-sky-700', 'text-violet-700']

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!hasLocale(rawLocale)) notFound()
  const locale = rawLocale as string
  const t = COPY[(locale as LocaleKey)] ?? COPY.en
  const cal = CALENDARS[(locale as LocaleKey)] ?? CALENDARS.en
  const calSum = CAL_SUMMARY[(locale as LocaleKey)] ?? CAL_SUMMARY.en
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

      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        <div className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-7 shadow-lg">
          <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 mb-4 flex items-center gap-2">🗓️ {t.calTitle}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-2.5">{t.schoolLabel}</div>
              <ul className="space-y-2">
                {calSum.school.map((s, i) => (
                  <li key={i} className="text-sm leading-snug border-l-2 border-sky-200 pl-3">
                    <span className="font-semibold text-stone-900">{s.name}</span>
                    <span className="block text-stone-500 text-[13px]">{s.dates}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-2.5">{t.holsLabel}</div>
              <div className="flex flex-wrap gap-1.5">
                {calSum.public.map((h, i) => (
                  <span key={i} className="inline-flex items-baseline gap-1.5 text-xs bg-stone-100 rounded-lg px-2.5 py-1.5">
                    <span className="font-bold text-rose-700 whitespace-nowrap">{h.date}</span>
                    <span className="text-stone-600">{h.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        {cal.periods.map((period, pi) => {
          const isLast = pi === cal.periods.length - 1
          const theme = isLast ? THEMES[THEMES.length - 1] : THEMES[Math.min(pi, THEMES.length - 2)]
          return (
          <section key={pi} className="scroll-mt-20">
            <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${theme.band} text-white p-6 sm:p-7 shadow-md mb-6`}>
              <div className="absolute -right-3 -top-10 text-[140px] leading-none opacity-15 select-none pointer-events-none" aria-hidden="true">{period.emoji}</div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 text-2xl backdrop-blur-sm shadow-sm">{period.emoji}</span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/85">{period.dates}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">{period.label}</h2>
                <span className="inline-block mt-2 text-xs font-bold uppercase tracking-wide bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">{period.trip}</span>
                <p className="text-white/90 leading-relaxed mt-3 max-w-2xl text-sm sm:text-base">{period.blurb}</p>
              </div>
            </div>

            <div className={`space-y-4 sm:border-l-4 ${theme.rail} sm:pl-5`}>
              {[...period.picks, ...(FAR[(locale as LocaleKey)]?.[pi] ? [FAR[(locale as LocaleKey)][pi]] : [])].map((p, i) => {
                const meta = DEST[p.slug]
                if (!meta) return null
                const isFar = i >= period.picks.length
                const tiers = budgetTiers(p.slug)
                return (
                  <article key={`${pi}-${p.slug}-${i}`} className={`rounded-2xl border overflow-hidden shadow-sm ${isFar ? 'border-amber-300 ring-1 ring-amber-200 bg-amber-50/40' : 'border-stone-200 bg-white'}`}>
                    <header className={`px-5 sm:px-7 py-4 bg-gradient-to-r border-b ${isFar ? 'from-amber-100 to-orange-50 border-amber-200' : `${theme.cardHead} border-stone-200`}`}>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-black ${isFar ? 'text-amber-700 bg-amber-200' : theme.numBg}`}>{isFar ? '✈' : i + 1}</span>
                        <h3 className="text-xl font-bold text-stone-900">
                          <Link href={`/${locale}/destinations/${p.slug}`} className="hover:underline">{meta.name}</Link>
                        </h3>
                        <span className="text-sm text-stone-500">{meta.country}</span>
                        {isFar && <span className="ml-auto text-xs font-bold bg-amber-500 text-white px-2.5 py-1 rounded-full shadow-sm">✈️ {t.farLabel}</span>}
                      </div>
                    </header>
                    <div className="px-5 sm:px-7 py-5 space-y-4">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">{t.whyLabel}</div>
                        <p className="text-stone-800 leading-relaxed">{p.why}</p>
                      </div>
                      {p.travel && (
                        <div className={`flex items-start gap-2 rounded-xl p-3 border ${isFar ? 'bg-amber-50 border-amber-200' : theme.travelBox}`}>
                          <span className="text-base leading-none mt-0.5">{isFar ? '✈️' : '🚗'}</span>
                          <div>
                            <div className={`text-xs font-semibold uppercase tracking-wider ${isFar ? 'text-amber-800' : theme.travelText}`}>{t.travelLabel}</div>
                            <p className={`text-sm leading-relaxed ${isFar ? 'text-amber-900' : theme.travelText}`}>{p.travel}</p>
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
                                <div className="relative h-28 -mx-3 -mt-3 mb-2 overflow-hidden rounded-t-xl bg-stone-100">
                                  <Image
                                    src={`/images/hotels/${h.id}.jpg`}
                                    alt={h.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 280px"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                  <span className={`absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wide ${TIER_TEXT[Math.min(ti, 2)]} bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm`}>{tierLabels[Math.min(ti, 2)]}</span>
                                </div>
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
          )
        })}
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
