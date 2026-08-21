import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'
import hotels from '@/data/hotels.json'
import { valueSort } from '@/lib/hotelSort'
import { getLocalizedCityName } from '@/lib/cityNames'

const SLUG = 'water-loving-dog-destinations-europe'
const CAMPAIGN = 'waterloving-dog'

type L4 = { en: string; fr: string; es: string; pt: string; de: string; nl: string }
type Dest = {
  slug: string
  name: string
  country: string
  tag: L4
  why: L4
}

const DESTINATIONS: Dest[] = [
  {
    slug: 'aix-les-bains',
    name: 'Aix-les-Bains',
    country: 'France',
    tag: {
      en: 'Lac du Bourget, dedicated dog beach',
      fr: 'Lac du Bourget, plage pour chiens dédiée',
      es: 'Lac du Bourget, playa para perros propia',
      pt: 'Lac du Bourget, praia própria para cães',
      de: 'Lac du Bourget, eigener Hundestrand',
      nl: 'Lac du Bourget, eigen hondenstrand',
    },
    why: {
      en: `Aix-les-Bains sits on Lac du Bourget, France's largest natural lake, but the supervised summer beaches (Lido, Mottets, Rowing, the municipal beach, Mémard) ban dogs in high season. The fix is a dedicated dog beach right next to Plage de Mémard, plus a stretch of shoreline along the voie verte between the Rowing and Mottets beaches where dogs can swim year-round.`,
      fr: `Aix-les-Bains borde le lac du Bourget, le plus grand lac naturel de France, mais les plages surveillées en été (Lido, Mottets, Rowing, plage municipale, Mémard) sont interdites aux chiens en haute saison. La solution : une plage pour chiens dédiée juste à côté de la plage de Mémard, plus un tronçon de rive le long de la voie verte entre les plages du Rowing et des Mottets, où les chiens peuvent nager toute l'année.`,
      es: `Aix-les-Bains bordea el Lac du Bourget, el mayor lago natural de Francia, pero las playas vigiladas en verano (Lido, Mottets, Rowing, la playa municipal, Mémard) prohíben los perros en temporada alta. La solución es una playa para perros propia justo al lado de la Plage de Mémard, además de un tramo de orilla junto a la voie verte entre las playas de Rowing y Mottets donde los perros pueden nadar todo el año.`,
      pt: `Aix-les-Bains fica à beira do Lac du Bourget, o maior lago natural de França, mas as praias vigiadas no verão (Lido, Mottets, Rowing, a praia municipal, Mémard) proíbem cães em época alta. A solução é uma praia própria para cães mesmo ao lado da Plage de Mémard, além de um trecho de margem junto à voie verte entre as praias de Rowing e Mottets, onde os cães podem nadar durante todo o ano.`,
      de: `Aix-les-Bains liegt am Lac du Bourget, Frankreichs größtem natürlichen See, doch die überwachten Sommerstrände (Lido, Mottets, Rowing, der Stadtstrand, Mémard) verbieten Hunde in der Hochsaison. Die Lösung ist ein eigener Hundestrand direkt neben der Plage de Mémard, dazu ein Uferabschnitt entlang der voie verte zwischen den Stränden Rowing und Mottets, wo Hunde das ganze Jahr über schwimmen dürfen.`,
      nl: `Aix-les-Bains ligt aan het Lac du Bourget, het grootste natuurlijke meer van Frankrijk, maar op de bewaakte zomerstranden (Lido, Mottets, Rowing, het gemeentestrand, Mémard) zijn honden in het hoogseizoen verboden. De oplossing is een eigen hondenstrand vlak naast de Plage de Mémard, plus een stuk oever langs de voie verte tussen de stranden Rowing en Mottets, waar honden het hele jaar door mogen zwemmen.`,
    },
  },
  {
    slug: 'annecy',
    name: 'Annecy',
    country: 'France',
    tag: {
      en: 'Lac d’Annecy, dogs banned on main beaches',
      fr: 'Lac d’Annecy, chiens interdits sur les plages principales',
      es: 'Lac d’Annecy, perros prohibidos en las playas principales',
      pt: 'Lac d’Annecy, cães proibidos nas praias principais',
      de: 'Lac d’Annecy, Hunde an den Hauptstränden verboten',
      nl: "Lac d'Annecy, honden verboden op de hoofdstranden",
    },
    why: {
      en: `Lake Annecy is one of the strictest lakes in France for dogs: Annecy's own Marquisats, Impérial and Albigny beaches, plus Saint-Jorioz's municipal beach, all ban dogs from the sand and the water. The only tolerated swim spot is the small Glières beach at Verthier, near Doussard, and it's generally accepted outside peak summer rather than guaranteed in July and August, so check locally before you set off.`,
      fr: `Le lac d'Annecy fait partie des lacs les plus stricts de France pour les chiens : les plages des Marquisats, de l'Impérial et d'Albigny à Annecy, ainsi que la plage municipale de Saint-Jorioz, interdisent toutes les chiens, sur le sable comme dans l'eau. Le seul point de baignade toléré est la petite plage des Glières à Verthier, près de Doussard, généralement accepté hors haute saison plutôt que garanti en juillet-août, à vérifier donc sur place avant de partir.`,
      es: `El lago de Annecy es uno de los más estrictos de Francia para los perros: las playas de Marquisats, Impérial y Albigny en Annecy, además de la playa municipal de Saint-Jorioz, prohíben los perros tanto en la arena como en el agua. El único punto de baño tolerado es la pequeña playa de Glières en Verthier, cerca de Doussard, generalmente aceptado fuera de la temporada alta más que garantizado en julio y agosto, así que comprueba la situación local antes de ir.`,
      pt: `O lago de Annecy é um dos mais rígidos de França para cães: as praias de Marquisats, Impérial e Albigny em Annecy, além da praia municipal de Saint-Jorioz, proíbem os cães tanto na areia como na água. O único local de banho tolerado é a pequena praia de Glières em Verthier, perto de Doussard, geralmente aceite fora da época alta mas não garantido em julho e agosto, por isso confirme no local antes de ir.`,
      de: `Der Lac d'Annecy gehört zu den strengsten Seen Frankreichs für Hunde: Annecys eigene Strände Marquisats, Impérial und Albigny sowie der Gemeindestrand von Saint-Jorioz verbieten Hunde sowohl im Sand als auch im Wasser. Der einzige geduldete Badeplatz ist der kleine Glières-Strand bei Verthier, nahe Doussard, und er wird außerhalb der Hochsaison meist akzeptiert, ist aber im Juli und August nicht garantiert, also vor Ort nachfragen, bevor Sie losfahren.`,
      nl: `Het meer van Annecy is een van de strengste meren van Frankrijk voor honden: de eigen stranden Marquisats, Impérial en Albigny van Annecy, plus het gemeentestrand van Saint-Jorioz, verbieden honden zowel op het zand als in het water. De enige getolereerde zwemplek is het kleine strand van Glières bij Verthier, dichtbij Doussard, en dat wordt meestal geaccepteerd buiten het hoogseizoen, maar is in juli en augustus niet gegarandeerd, dus vraag ter plekke na voordat je vertrekt.`,
    },
  },
  {
    slug: 'biarritz',
    name: 'Biarritz',
    country: 'France',
    tag: {
      en: 'Basque coast, off-season beach access',
      fr: 'Côte basque, accès plage hors saison',
      es: 'Costa vasca, acceso a la playa fuera de temporada',
      pt: 'Costa basca, acesso à praia fora de época',
      de: 'Baskische Küste, Strandzugang außerhalb der Saison',
      nl: 'Baskische kust, strandtoegang buiten het seizoen',
    },
    why: {
      en: `Biarritz bans dogs from its Grande Plage and Plage du Miramar between 1 April and 31 October, but every other beach in town welcomes them the rest of the year. From 1 October to 31 March dogs can swim freely, and from 1 November to 31 March the rule tightens further to on-lead 9am-11am and off-lead the rest of the day, so an autumn or winter Atlantic swim is the reliable plan here.`,
      fr: `Biarritz interdit les chiens sur sa Grande Plage et sur la plage du Miramar du 1er avril au 31 octobre, mais toutes les autres plages de la ville les accueillent le reste de l'année. Du 1er octobre au 31 mars, les chiens peuvent nager librement, et du 1er novembre au 31 mars la règle se resserre encore avec laisse obligatoire de 9h à 11h et liberté le reste de la journée : une baignade atlantique d'automne ou d'hiver reste donc le plan le plus sûr ici.`,
      es: `Biarritz prohíbe los perros en su Grande Plage y en la Plage du Miramar entre el 1 de abril y el 31 de octubre, pero el resto de las playas de la ciudad los acoge el resto del año. Del 1 de octubre al 31 de marzo los perros pueden nadar libremente, y del 1 de noviembre al 31 de marzo la norma se endurece aún más con correa obligatoria de 9h a 11h y libertad el resto del día, así que un baño atlántico en otoño o invierno es aquí el plan más fiable.`,
      pt: `Biarritz proíbe os cães na sua Grande Plage e na Plage du Miramar entre 1 de abril e 31 de outubro, mas todas as outras praias da cidade os recebem no resto do ano. De 1 de outubro a 31 de março os cães podem nadar livremente, e de 1 de novembro a 31 de março a regra aperta ainda mais com trela obrigatória das 9h às 11h e liberdade no resto do dia, por isso um banho atlântico no outono ou inverno é aqui o plano mais fiável.`,
      de: `Biarritz verbietet Hunde vom 1. April bis 31. Oktober an seiner Grande Plage und der Plage du Miramar, doch jeder andere Strand der Stadt heißt sie den Rest des Jahres willkommen. Vom 1. Oktober bis 31. März dürfen Hunde frei schwimmen, und vom 1. November bis 31. März verschärft sich die Regel weiter auf Leinenpflicht von 9 bis 11 Uhr und Freilauf den Rest des Tages, ein herbstliches oder winterliches Bad im Atlantik ist hier also der verlässliche Plan.`,
      nl: `Biarritz verbiedt honden van 1 april tot 31 oktober op de Grande Plage en de Plage du Miramar, maar elk ander strand van de stad verwelkomt ze de rest van het jaar. Van 1 oktober tot 31 maart mogen honden vrij zwemmen, en van 1 november tot 31 maart wordt de regel nog strenger met aanlijnplicht van 9 tot 11 uur en vrij loslopen de rest van de dag, dus een herfst- of winterduik in de Atlantische Oceaan is hier het betrouwbaarste plan.`,
    },
  },
  {
    slug: 'salcombe',
    name: 'Salcombe',
    country: 'United Kingdom',
    tag: {
      en: 'South Hams estuary, year-round alternatives',
      fr: 'Estuaire du South Hams, alternatives toute l’année',
      es: 'Estuario de South Hams, alternativas todo el año',
      pt: 'Estuário de South Hams, alternativas o ano todo',
      de: 'South-Hams-Mündung, ganzjährige Alternativen',
      nl: 'South Hams-riviermonding, alternatieven het hele jaar',
    },
    why: {
      en: `Salcombe's own South Sands has a 24-hour dog ban from 1 May to 30 September under a South Hams District Council order, with an exception only for dogs on lead crossing to catch the passenger ferry. Across the estuary, Mill Bay and Sunny Cove stay dog-friendly all year, making them the reliable swim spots whenever the summer restriction is in force at South Sands.`,
      fr: `La plage de South Sands, à Salcombe, applique une interdiction totale des chiens du 1er mai au 30 septembre en vertu d'un arrêté du South Hams District Council, avec une seule exception pour les chiens en laisse traversant pour prendre le ferry passagers. De l'autre côté de l'estuaire, Mill Bay et Sunny Cove restent accessibles aux chiens toute l'année, ce qui en fait les points de baignade fiables tant que la restriction estivale s'applique à South Sands.`,
      es: `La playa de South Sands, en Salcombe, aplica una prohibición total de perros del 1 de mayo al 30 de septiembre por orden del South Hams District Council, con una única excepción para los perros con correa que cruzan para tomar el ferry de pasajeros. Al otro lado del estuario, Mill Bay y Sunny Cove siguen siendo aptas para perros todo el año, lo que las convierte en las opciones fiables mientras dure la restricción veraniega en South Sands.`,
      pt: `A praia de South Sands, em Salcombe, aplica uma proibição total de cães de 1 de maio a 30 de setembro por ordem do South Hams District Council, com exceção apenas para cães com trela a atravessar para apanhar o ferry de passageiros. Do outro lado do estuário, Mill Bay e Sunny Cove continuam a receber cães durante todo o ano, o que as torna as opções fiáveis enquanto durar a restrição de verão em South Sands.`,
      de: `Salcombes eigener South-Sands-Strand hat vom 1. Mai bis 30. September ein rund um die Uhr geltendes Hundeverbot per Anordnung des South Hams District Council, mit einer Ausnahme nur für angeleinte Hunde auf dem Weg zur Passagierfähre. Auf der anderen Seite der Mündung bleiben Mill Bay und Sunny Cove das ganze Jahr hundefreundlich und sind damit die verlässlichen Badeplätze, solange die Sommerbeschränkung in South Sands gilt.`,
      nl: `Het eigen South Sands-strand van Salcombe kent van 1 mei tot 30 september een 24 uur durend hondenverbod op grond van een besluit van de South Hams District Council, met alleen een uitzondering voor aangelijnde honden die oversteken om de passagiersveerboot te halen. Aan de overkant van de riviermonding blijven Mill Bay en Sunny Cove het hele jaar hondvriendelijk, wat ze tot de betrouwbare zwemplekken maakt zolang de zomerbeperking op South Sands geldt.`,
    },
  },
  {
    slug: 'split',
    name: 'Split',
    country: 'Croatia',
    tag: {
      en: 'Duilovo dog beach, pebble shore',
      fr: 'Plage pour chiens de Duilovo, rivage de galets',
      es: 'Playa para perros de Duilovo, orilla de guijarros',
      pt: 'Praia para cães de Duilovo, costa de seixos',
      de: 'Hundestrand Duilovo, Kieselufer',
      nl: 'Hondenstrand Duilovo, kiezelstrand',
    },
    why: {
      en: `Split has its own official "plaza za pse" (dog beach) at Duilovo, in the Znjan area, a pebble shore with a gentle, shallow entry, showers and changing facilities set aside for dogs. Nearby Kaštela has added several more dog-friendly beaches along its stretch of coast, so a water-loving dog based in Split has more than one option within a short drive.`,
      fr: `Split dispose de sa propre "plaza za pse" (plage pour chiens) officielle à Duilovo, dans le quartier de Znjan, un rivage de galets à l'entrée en pente douce, avec douches et vestiaires réservés aux chiens. Non loin, Kaštela a aménagé plusieurs autres plages pour chiens le long de son littoral, de quoi offrir plus d'une option à courte distance pour un chien basé à Split.`,
      es: `Split cuenta con su propia "plaza za pse" (playa para perros) oficial en Duilovo, en la zona de Znjan, una orilla de guijarros con entrada suave y poco profunda, duchas y vestuarios reservados a los perros. Cerca, Kaštela ha habilitado varias playas para perros más a lo largo de su costa, así que un perro amante del agua con base en Split tiene más de una opción a poca distancia.`,
      pt: `Split tem a sua própria "plaza za pse" (praia para cães) oficial em Duilovo, na zona de Znjan, uma costa de seixos com entrada suave e pouco profunda, duches e vestiários reservados aos cães. Perto dali, Kaštela criou várias outras praias para cães ao longo da sua costa, dando a um cão que adora água com base em Split mais do que uma opção a curta distância.`,
      de: `Split hat seinen eigenen offiziellen "plaza za pse" (Hundestrand) in Duilovo, im Stadtteil Znjan, ein Kieselufer mit sanftem, flachem Einstieg, Duschen und Umkleiden speziell für Hunde. Im nahen Kaštela sind mehrere weitere hundefreundliche Strände entlang der Küste hinzugekommen, sodass ein wasserliebender Hund mit Basis in Split gleich mehrere Optionen in kurzer Fahrtdistanz hat.`,
      nl: `Split heeft zijn eigen officiële "plaza za pse" (hondenstrand) in Duilovo, in de wijk Znjan, een kiezelstrand met een zachte, ondiepe ingang, douches en kleedruimtes speciaal voor honden. Vlakbij heeft Kaštela meerdere extra hondvriendelijke stranden langs de kust toegevoegd, zodat een waterminnende hond die in Split verblijft meer dan één optie op korte rijafstand heeft.`,
    },
  },
  {
    slug: 'cadiz',
    name: 'Cadiz',
    country: 'Spain',
    tag: {
      en: 'Playa canina de Torregorda, seasonal',
      fr: 'Playa canina de Torregorda, saisonnière',
      es: 'Playa canina de Torregorda, temporada',
      pt: 'Playa canina de Torregorda, sazonal',
      de: 'Playa canina de Torregorda, saisonal',
      nl: 'Playa canina de Torregorda, seizoensgebonden',
    },
    why: {
      en: `Cadiz itself has an official dog beach, the Playa canina de Torregorda: 465 metres of shore split between an on-lead approach and a fenced 125-metre off-lead zone, with showers and waste bins. It's set up for the March-to-October season, and outside those months dogs are generally tolerated on ordinary beaches outside bathing hours, one of many dog-friendly stretches along the wider Costa de la Luz.`,
      fr: `Cadix dispose de sa propre plage pour chiens officielle, la Playa canina de Torregorda : 465 mètres de rivage répartis entre une zone d'accès en laisse et une zone clôturée de 125 mètres en liberté, avec douches et poubelles. Elle est aménagée pour la saison de mars à octobre, et en dehors de ces mois, les chiens sont généralement tolérés sur les plages ordinaires hors des heures de baignade, l'une des nombreuses zones dog-friendly de la Costa de la Luz.`,
      es: `Cádiz cuenta con su propia playa para perros oficial, la playa canina de Torregorda: 465 metros de orilla repartidos entre una zona de acceso con correa y una zona vallada de 125 metros en libertad, con duchas y papeleras. Está habilitada para la temporada de marzo a octubre, y fuera de esos meses los perros suelen tolerarse en las playas comunes fuera del horario de baño, una más de las numerosas zonas dog-friendly de la Costa de la Luz.`,
      pt: `Cádis tem a sua própria praia canina oficial, a Playa canina de Torregorda: 465 metros de costa divididos entre uma zona de acesso com trela e uma zona vedada de 125 metros em liberdade, com duches e caixotes do lixo. Está preparada para a época de março a outubro, e fora desses meses os cães costumam ser tolerados nas praias comuns fora do horário de banho, mais uma das várias zonas dog-friendly ao longo da Costa de la Luz.`,
      de: `Cádiz hat einen eigenen offiziellen Hundestrand, die Playa canina de Torregorda: 465 Meter Ufer, aufgeteilt in einen Bereich mit Leinenpflicht und eine eingezäunte 125-Meter-Freilaufzone, mit Duschen und Mülleimern. Er ist für die Saison von März bis Oktober eingerichtet, außerhalb dieser Monate werden Hunde außerhalb der Badezeiten meist auf gewöhnlichen Stränden toleriert, einer von vielen hundefreundlichen Abschnitten entlang der weiteren Costa de la Luz.`,
      nl: `Cádiz heeft zelf een officieel hondenstrand, de Playa canina de Torregorda: 465 meter oever, verdeeld in een gedeelte met aanlijnplicht en een omheinde zone van 125 meter waar honden los mogen lopen, met douches en afvalbakken. Het is ingericht voor het seizoen van maart tot oktober, en buiten die maanden worden honden buiten badtijden meestal getolereerd op gewone stranden, een van de vele hondvriendelijke stukken langs de bredere Costa de la Luz.`,
    },
  },
]

const SIBLING_GUIDES = [
  { slug: 'high-energy-dog-destinations-europe', emoji: '🥾', label: { en: 'Best destinations for a high-energy dog', fr: 'Meilleures destinations pour un chien très actif', es: 'Mejores destinos para un perro muy activo', pt: 'Melhores destinos para um cão muito ativo', de: 'Beste Reiseziele für einen sehr aktiven Hund', nl: 'Beste bestemmingen voor een zeer actieve hond' } },
  { slug: 'dog-beaches-france', emoji: '🏖️', label: { en: 'Dog-friendly beaches in France', fr: 'Plages pour chiens en France', es: 'Playas para perros en Francia', pt: 'Praias para cães em França', de: 'Hundefreundliche Strände in Frankreich', nl: 'Hondvriendelijke stranden in Frankrijk' } },
  { slug: 'best-dog-beaches-europe-2026', emoji: '🌊', label: { en: 'Best dog beaches in Europe 2026', fr: 'Meilleures plages pour chiens en Europe 2026', es: 'Mejores playas para perros en Europa 2026', pt: 'Melhores praias para cães na Europa 2026', de: 'Beste Hundestrände in Europa 2026', nl: 'Beste hondenstranden in Europa 2026' } },
]

// Top 3 value-sorted, real pet-friendly hotels per featured destination, shown
// inline on each card so the guide is a money page in itself (3 internal links
// to hotel pages per destination), not just a list.
const HOTELS_BY_DEST: Record<string, typeof hotels> = {}
for (const slug of DESTINATIONS.map((d) => d.slug)) {
  HOTELS_BY_DEST[slug] = valueSort(hotels.filter((h) => h.destinationSlug === slug)).slice(0, 3)
}

const T = {
  title: {
    en: 'Best Destinations for a Water-Loving Dog That Swims at Every Chance',
    fr: `Meilleures destinations pour un chien qui adore l'eau et nage à la moindre occasion`,
    es: 'Mejores destinos para un perro que ama el agua y nada en cuanto puede',
    pt: 'Melhores destinos para um cão que adora água e nada em cada oportunidade',
    de: 'Beste Reiseziele für einen wasserliebenden Hund, der bei jeder Gelegenheit schwimmt',
    nl: 'Beste bestemmingen voor een waterminnende hond die elke kans grijpt om te zwemmen',
  },
  metaTitle: {
    en: '6 Best Destinations for a Water-Loving Dog in Europe (2026)',
    fr: `6 meilleures destinations pour un chien qui adore l'eau en Europe (2026)`,
    es: '6 mejores destinos para un perro que ama el agua en Europa (2026)',
    pt: '6 melhores destinos para um cão que adora água na Europa (2026)',
    de: '6 beste Reiseziele für einen wasserliebenden Hund in Europa (2026)',
    nl: '6 beste bestemmingen voor een waterminnende hond in Europa (2026)',
  },
  metaDesc: {
    en: 'Lake and sea destinations verified for real dog swimming spots, seasonal rules and leash zones. Pet-friendly hotels included at every stop.',
    fr: `Des destinations lacustres et maritimes avec de vrais points de baignade pour chiens, règles saisonnières et zones de laisse, vérifiés. Hôtels pet-friendly inclus à chaque étape.`,
    es: 'Destinos de lago y mar verificados con puntos de baño reales para perros, normas de temporada y zonas de correa. Hoteles pet-friendly incluidos en cada parada.',
    pt: 'Destinos de lago e mar verificados com pontos de banho reais para cães, regras sazonais e zonas de trela. Hotéis pet-friendly incluídos em cada paragem.',
    de: 'See- und Meeresziele mit geprüften echten Badeplätzen für Hunde, saisonalen Regeln und Leinenzonen. Haustierfreundliche Hotels an jedem Ort inklusive.',
    nl: 'Meer- en zeebestemmingen met geverifieerde echte zwemplekken voor honden, seizoensregels en aanlijnzones. Op elke stop hondvriendelijke hotels inbegrepen.',
  },
  intro: {
    en: `A retriever, spaniel, Labrador or poodle that swims at every opportunity needs more than a warm beach, it needs a destination where dogs are actually allowed in the water. Rules vary wildly from one lake or coastline to the next, often changing block by block and month by month, so these six spots across France, England, Croatia and Spain are picked for having a real, checkable place for a dog to swim, not just a photogenic shoreline.`,
    fr: `Un retriever, un épagneul, un labrador ou un caniche qui nage à la moindre occasion a besoin de plus qu'une plage agréable : il lui faut une destination où les chiens sont réellement admis dans l'eau. Les règles varient énormément d'un lac ou d'un littoral à l'autre, changeant souvent de plage en plage et de mois en mois, ces six destinations en France, en Angleterre, en Croatie et en Espagne ont donc été choisies pour offrir un véritable point de baignade vérifiable pour un chien, pas seulement un rivage photogénique.`,
    es: `Un retriever, un spaniel, un labrador o un caniche que nada en cuanto tiene ocasión necesita algo más que una playa agradable: necesita un destino donde los perros estén realmente admitidos en el agua. Las normas varían muchísimo de un lago o litoral a otro, cambiando a menudo de una playa a otra y de un mes a otro, así que estos seis destinos en Francia, Inglaterra, Croacia y España se han elegido por tener un punto de baño real y verificable para un perro, no solo una orilla fotogénica.`,
    pt: `Um retriever, um spaniel, um labrador ou um caniche que nada em cada oportunidade precisa de mais do que uma praia bonita: precisa de um destino onde os cães sejam realmente admitidos na água. As regras variam muito de um lago ou litoral para outro, mudando muitas vezes de praia para praia e de mês para mês, por isso estes seis destinos em França, Inglaterra, Croácia e Espanha foram escolhidos por terem um local de banho real e verificável para um cão, não apenas uma costa fotogénica.`,
    de: `Ein Retriever, Spaniel, Labrador oder Pudel, der bei jeder Gelegenheit schwimmt, braucht mehr als einen schönen Strand, er braucht ein Reiseziel, an dem Hunde wirklich ins Wasser dürfen. Die Regeln unterscheiden sich stark von einem See oder Küstenabschnitt zum nächsten und ändern sich oft von Strand zu Strand und von Monat zu Monat. Diese sechs Orte in Frankreich, England, Kroatien und Spanien wurden deshalb ausgewählt, weil sie einen echten, überprüfbaren Badeplatz für Hunde bieten, nicht nur ein fotogenes Ufer.`,
    nl: `Een retriever, spaniël, labrador of poedel die bij elke gelegenheid zwemt, heeft meer nodig dan een mooi strand, hij heeft een bestemming nodig waar honden echt het water in mogen. De regels verschillen enorm van het ene meer of kustgebied naar het andere en veranderen vaak van strand tot strand en van maand tot maand, dus deze zes plekken in Frankrijk, Engeland, Kroatië en Spanje zijn gekozen omdat ze een echte, controleerbare zwemplek voor honden bieden, niet alleen een fotogenieke oever.`,
  },
  seeHotels: { en: 'See pet-friendly hotels', fr: 'Voir les hôtels pet-friendly', es: 'Ver hoteles pet-friendly', pt: 'Ver hotéis pet-friendly', de: 'Haustierfreundliche Hotels ansehen', nl: 'Bekijk hondvriendelijke hotels' },
  seeGuide: { en: 'Destination guide', fr: 'Guide destination', es: 'Guía del destino', pt: 'Guia do destino', de: 'Reiseführer', nl: 'Bestemmingsgids' },
  fromWord: { en: 'from', fr: 'dès', es: 'desde', pt: 'desde', de: 'ab', nl: 'vanaf' },
  noFee: { en: 'no pet fee', fr: 'sans supplément', es: 'sin cargo mascota', pt: 'sem suplemento', de: 'keine Haustiergebühr', nl: 'geen huisdiertoeslag' },
  ourPicks: { en: '3 pet-friendly picks', fr: '3 adresses pet-friendly', es: '3 opciones pet-friendly', pt: '3 opções pet-friendly', de: '3 haustierfreundliche Adressen', nl: '3 hondvriendelijke keuzes' },
  breadHome: { en: 'Home', fr: 'Accueil', es: 'Inicio', pt: 'Início', de: 'Startseite', nl: 'Home' },
  breadGuides: { en: 'Guides', fr: 'Guides', es: 'Guías', pt: 'Guias', de: 'Ratgeber', nl: 'Gidsen' },
  kicker: { en: 'By dog profile', fr: 'Par profil de chien', es: 'Por perfil de perro', pt: 'Por perfil de cão', de: 'Nach Hundeprofil', nl: 'Op hondprofiel' },
  closingTitle: {
    en: 'A note on water safety',
    fr: `Une note sur la sécurité dans l'eau`,
    es: 'Una nota sobre la seguridad en el agua',
    pt: 'Uma nota sobre a segurança na água',
    de: 'Ein Hinweis zur Sicherheit im Wasser',
    nl: 'Een woord over veiligheid in het water',
  },
  closingText: {
    en: `Lakes and seas each carry their own risks for a dog that swims often. In warm lake water from mid-summer onward, watch for blue-green algae blooms (cyanobacteria), visible as a scum or discoloration on the surface, which can be toxic if swallowed, check local advisories before letting a dog in. At the coast, currents and tides move faster than they look, so keep a new swimmer within easy reach until you know the spot. Rinse salt water and lake water off the coat afterward, and ask a vet about leptospirosis vaccination if lake swimming becomes a regular habit.`,
    fr: `Les lacs et la mer présentent chacun leurs propres risques pour un chien qui nage souvent. Dans l'eau chaude des lacs à partir du milieu de l'été, surveillez les proliférations d'algues bleu-vert (cyanobactéries), visibles sous forme d'un film ou d'une décoloration en surface, qui peuvent être toxiques en cas d'ingestion : vérifiez les avis locaux avant de laisser un chien entrer dans l'eau. Sur la côte, les courants et les marées se déplacent plus vite qu'il n'y paraît, gardez donc un chien qui découvre la baignade à portée immédiate tant que vous ne connaissez pas le lieu. Rincez le sel et l'eau de lac du pelage ensuite, et demandez à un vétérinaire s'il faut vacciner contre la leptospirose si la baignade en lac devient une habitude régulière.`,
    es: `Los lagos y el mar presentan riesgos propios para un perro que nada a menudo. En el agua templada de los lagos a partir de mediados de verano, vigila las proliferaciones de algas verdeazuladas (cianobacterias), visibles como una película o decoloración en la superficie, que pueden ser tóxicas si se ingieren: comprueba los avisos locales antes de dejar entrar al perro. En la costa, las corrientes y las mareas se mueven más rápido de lo que parece, así que mantén cerca a un perro que empieza a nadar hasta conocer bien el lugar. Aclara la sal y el agua de lago del pelaje después, y consulta con un veterinario sobre la vacuna de la leptospirosis si el baño en lago se convierte en un hábito habitual.`,
    pt: `Lagos e mar trazem cada um os seus próprios riscos para um cão que nada com frequência. Na água morna dos lagos a partir de meados do verão, atenção às proliferações de algas azul-esverdeadas (cianobactérias), visíveis como uma película ou descoloração à superfície, que podem ser tóxicas se ingeridas: confirme os avisos locais antes de deixar o cão entrar. Na costa, as correntes e as marés movem-se mais depressa do que parece, por isso mantenha um cão que está a começar a nadar por perto até conhecer bem o local. Enxague o sal e a água do lago do pelo depois, e pergunte a um veterinário sobre a vacina da leptospirose se o banho em lago se tornar um hábito regular.`,
    de: `Seen und Meer bergen jeweils eigene Risiken für einen Hund, der häufig schwimmt. Im warmen Seewasser ab Hochsommer sollten Sie auf Blaualgenblüten (Cyanobakterien) achten, erkennbar als Schlieren oder Verfärbung an der Oberfläche, die beim Verschlucken giftig sein können. Prüfen Sie lokale Warnhinweise, bevor Sie einen Hund ins Wasser lassen. An der Küste sind Strömungen und Gezeiten schneller, als sie aussehen, halten Sie einen ungeübten Schwimmer daher in leichter Reichweite, bis Sie den Ort kennen. Spülen Sie danach Salzwasser und Seewasser aus dem Fell, und fragen Sie einen Tierarzt nach einer Leptospirose-Impfung, wenn Schwimmen im See zur regelmäßigen Gewohnheit wird.`,
    nl: `Meren en zeeën hebben elk hun eigen risico's voor een hond die vaak zwemt. Let vanaf halverwege de zomer in warm meerwater op blauwalgen (cyanobacteriën), zichtbaar als een waas of verkleuring aan het oppervlak, die giftig kunnen zijn bij inslikken, controleer lokale waarschuwingen voordat je een hond het water in laat. Aan de kust bewegen stroming en getij sneller dan ze eruitzien, houd een onervaren zwemmer daarom dicht bij je tot je de plek kent. Spoel daarna zout en meerwater uit de vacht, en vraag een dierenarts naar een leptospirose-vaccinatie als zwemmen in meren een vaste gewoonte wordt.`,
  },
  siblingTitle: { en: 'Plan the rest of the trip', fr: `Planifier le reste du voyage`, es: 'Planifica el resto del viaje', pt: 'Planeie o resto da viagem', de: 'Den Rest der Reise planen', nl: 'Plan de rest van de reis' },
  faq: {
    q1: {
      en: 'Which of these destinations lets a dog swim year-round?',
      fr: 'Laquelle de ces destinations permet à un chien de nager toute l’année ?',
      es: '¿Cuál de estos destinos permite nadar a un perro todo el año?',
      pt: 'Qual destes destinos permite a um cão nadar durante todo o ano?',
      de: 'Welches dieser Reiseziele erlaubt einem Hund das ganze Jahr über zu schwimmen?',
      nl: 'Op welke van deze bestemmingen mag een hond het hele jaar door zwemmen?',
    },
    a1: {
      en: `Aix-les-Bains comes closest, with its dedicated dog beach next to Plage de Mémard and the voie verte shoreline open outside the supervised summer zones. Split's Duilovo dog beach and the Kaštela beaches nearby also run without a hard seasonal cutoff. Biarritz, Salcombe and Cadiz all swing between a restricted summer and a freer off-season, so check the exact dates before you travel.`,
      fr: `Aix-les-Bains s'en approche le plus, avec sa plage pour chiens dédiée à côté de la plage de Mémard et le rivage de la voie verte ouvert en dehors des zones surveillées l'été. La plage pour chiens de Duilovo à Split et les plages de Kaštela à proximité fonctionnent aussi sans coupure saisonnière stricte. Biarritz, Salcombe et Cadix basculent tous entre un été restreint et une période plus libre hors saison, vérifiez donc les dates exactes avant de partir.`,
      es: `Aix-les-Bains es lo más cercano, con su playa para perros dedicada junto a la Plage de Mémard y la orilla de la voie verte abierta fuera de las zonas vigiladas en verano. La playa para perros de Duilovo en Split y las playas de Kaštela cercanas también funcionan sin un corte estacional estricto. Biarritz, Salcombe y Cádiz oscilan entre un verano restringido y una temporada baja más libre, así que comprueba las fechas exactas antes de viajar.`,
      pt: `Aix-les-Bains é o que mais se aproxima, com a sua praia própria para cães junto à Plage de Mémard e a margem da voie verte aberta fora das zonas vigiadas no verão. A praia para cães de Duilovo em Split e as praias de Kaštela nas proximidades também funcionam sem um corte sazonal rígido. Biarritz, Salcombe e Cádis oscilam todos entre um verão restrito e uma época baixa mais livre, por isso confirme as datas exatas antes de viajar.`,
      de: `Aix-les-Bains kommt dem am nächsten, mit seinem eigenen Hundestrand neben der Plage de Mémard und dem Ufer der voie verte, das außerhalb der überwachten Sommerzonen offen ist. Der Hundestrand Duilovo in Split und die nahen Strände von Kaštela laufen ebenfalls ohne strikten saisonalen Schnitt. Biarritz, Salcombe und Cádiz pendeln alle zwischen einem eingeschränkten Sommer und einer freieren Nebensaison, prüfen Sie also die genauen Daten vor der Reise.`,
      nl: `Aix-les-Bains komt het dichtst in de buurt, met zijn eigen hondenstrand naast de Plage de Mémard en de oever van de voie verte die open is buiten de bewaakte zomerzones. Het hondenstrand Duilovo in Split en de nabijgelegen stranden van Kaštela werken ook zonder harde seizoensgrens. Biarritz, Salcombe en Cádiz schommelen allemaal tussen een beperkte zomer en een vrijer laagseizoen, controleer dus de exacte data voordat je op reis gaat.`,
    },
    q2: {
      en: 'Can I let my dog swim on any beach in these destinations?',
      fr: 'Puis-je laisser mon chien nager sur n’importe quelle plage de ces destinations ?',
      es: '¿Puedo dejar que mi perro nade en cualquier playa de estos destinos?',
      pt: 'Posso deixar o meu cão nadar em qualquer praia nestes destinos?',
      de: 'Kann ich meinen Hund an jedem Strand dieser Reiseziele schwimmen lassen?',
      nl: 'Mag mijn hond op elk strand van deze bestemmingen zwemmen?',
    },
    a2: {
      en: `No, and this is the main trap for a water-loving dog. Annecy bans dogs from its main beaches outright, Biarritz and Salcombe both ban them from their flagship beaches for most of the summer, and Cadiz and Split reserve swimming for specific, signposted dog beaches rather than the whole coastline. Always aim for the named spot in each section rather than the first stretch of sand you see.`,
      fr: `Non, et c'est le principal piège pour un chien qui adore l'eau. Annecy interdit purement et simplement les chiens sur ses plages principales, Biarritz et Salcombe les interdisent tous deux sur leur plage phare pour l'essentiel de l'été, et Cadix comme Split réservent la baignade à des plages pour chiens précises et signalées plutôt qu'à tout le littoral. Visez toujours l'endroit nommé dans chaque section plutôt que le premier bout de sable venu.`,
      es: `No, y esta es la principal trampa para un perro que ama el agua. Annecy prohíbe sin más los perros en sus playas principales, Biarritz y Salcombe los prohíben en su playa emblemática durante casi todo el verano, y Cádiz y Split reservan el baño a playas para perros concretas y señalizadas en lugar de a todo el litoral. Apunta siempre al lugar indicado en cada apartado en vez de al primer trozo de arena que veas.`,
      pt: `Não, e esta é a principal armadilha para um cão que adora água. Annecy proíbe simplesmente os cães nas suas praias principais, Biarritz e Salcombe proíbem-nos na praia emblemática durante a maior parte do verão, e Cádis e Split reservam o banho a praias para cães específicas e sinalizadas em vez de a toda a costa. Procure sempre o local indicado em cada secção em vez do primeiro pedaço de areia que encontrar.`,
      de: `Nein, und genau das ist die größte Falle für einen wasserliebenden Hund. Annecy verbietet Hunde an seinen Hauptstränden schlichtweg, Biarritz und Salcombe verbieten sie beide für den größten Teil des Sommers an ihren Vorzeigestränden, und Cádiz und Split beschränken das Schwimmen auf bestimmte, ausgeschilderte Hundestrände statt der gesamten Küste. Zielen Sie immer auf den in jedem Abschnitt genannten Ort statt auf den ersten Sandstreifen, den Sie sehen.`,
      nl: `Nee, en dat is de grootste valkuil voor een waterminnende hond. Annecy verbiedt honden simpelweg op zijn hoofdstranden, Biarritz en Salcombe verbieden ze allebei het grootste deel van de zomer op hun bekendste stranden, en Cádiz en Split beperken zwemmen tot specifieke, aangewezen hondenstranden in plaats van de hele kust. Richt je altijd op de genoemde plek in elk hoofdstuk in plaats van op het eerste stukje zand dat je ziet.`,
    },
    q3: {
      en: 'How do I know if a lake or beach is safe for my dog to swim in?',
      fr: `Comment savoir si un lac ou une plage est sûr pour la baignade de mon chien ?`,
      es: '¿Cómo sé si un lago o una playa es seguro para que nade mi perro?',
      pt: 'Como sei se um lago ou praia é seguro para o meu cão nadar?',
      de: 'Woher weiß ich, ob ein See oder Strand sicher zum Schwimmen für meinen Hund ist?',
      nl: 'Hoe weet ik of een meer of strand veilig is om mijn hond te laten zwemmen?',
    },
    a3: {
      en: `Check for posted signage or local council/tourist office guidance at the spot itself, rules change year to year and season to season, so what's allowed in one summer isn't guaranteed the next. In lakes, avoid visibly discoloured or scummy water, which can signal a blue-green algae bloom. At the sea, look for lifeguard flags and ask locally about currents, since a strong swimmer can still be pulled off course by a rip.`,
      fr: `Vérifiez la signalétique sur place ou les indications de la mairie ou de l'office de tourisme : les règles changent d'une année sur l'autre et d'une saison sur l'autre, ce qui est autorisé un été n'est pas garanti le suivant. Dans les lacs, évitez une eau visiblement décolorée ou recouverte d'un film, signe possible de prolifération d'algues bleu-vert. En mer, repérez les drapeaux de baignade et renseignez-vous localement sur les courants, un bon nageur peut quand même être déporté par une baïne.`,
      es: `Comprueba la señalización in situ o las indicaciones del ayuntamiento u oficina de turismo: las normas cambian de un año a otro y de una temporada a otra, lo permitido un verano no está garantizado al siguiente. En los lagos, evita el agua visiblemente decolorada o con una película en la superficie, señal posible de proliferación de algas verdeazuladas. En el mar, fíjate en las banderas de socorrismo y pregunta localmente por las corrientes, un buen nadador puede igualmente ser arrastrado por una resaca.`,
      pt: `Verifique a sinalização no local ou as indicações da câmara municipal ou do posto de turismo: as regras mudam de ano para ano e de época para época, o que é permitido num verão não está garantido no seguinte. Nos lagos, evite água visivelmente descolorada ou com uma película à superfície, possível sinal de proliferação de algas azul-esverdeadas. No mar, procure as bandeiras de nadador-salvador e informe-se localmente sobre as correntes, um bom nadador pode ainda assim ser arrastado por uma corrente de retorno.`,
      de: `Achten Sie vor Ort auf ausgeschilderte Hinweise oder Angaben der Gemeinde bzw. des Tourismusbüros, die Regeln ändern sich von Jahr zu Jahr und von Saison zu Saison, sodass das, was einen Sommer erlaubt ist, im nächsten nicht garantiert ist. Meiden Sie in Seen sichtbar verfärbtes oder schaumiges Wasser, das auf eine Blaualgenblüte hindeuten kann. Am Meer achten Sie auf Rettungsschwimmer-Flaggen und fragen Sie vor Ort nach Strömungen, denn selbst ein starker Schwimmer kann von einer Strömung abgetrieben werden.`,
      nl: `Let ter plekke op bordjes of aanwijzingen van de gemeente of het toeristenbureau, de regels veranderen van jaar tot jaar en van seizoen tot seizoen, dus wat de ene zomer is toegestaan, is de volgende niet gegarandeerd. Vermijd in meren zichtbaar verkleurd of schuimend water, dat kan wijzen op blauwalgen. Kijk bij de zee uit naar reddingsvlaggen en vraag lokaal naar stromingen, want zelfs een sterke zwemmer kan door een muistroom worden meegesleurd.`,
    },
  },
}

const p = (o: L4, locale: string) =>
  locale === 'fr' ? o.fr : locale === 'es' ? o.es : locale === 'pt' ? o.pt : locale === 'de' ? o.de : locale === 'nl' ? o.nl : o.en

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
  return {
    title: `${p(T.metaTitle, locale)}`,
    description: p(T.metaDesc, locale),
    alternates: {
      canonical: `${SITE_URL}/${locale}/guides/${SLUG}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}/guides/${SLUG}`])),
        'x-default': `${SITE_URL}/en/guides/${SLUG}`,
      },
    },
    openGraph: {
      title: p(T.metaTitle, locale),
      description: p(T.metaDesc, locale),
      type: 'article',
      url: `${SITE_URL}/${locale}/guides/${SLUG}`,
    },
  }
}

export default async function WaterLovingDogDestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: p(T.breadHome, locale), item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: p(T.breadGuides, locale), item: `${SITE_URL}/${locale}/guides` },
      { '@type': 'ListItem', position: 3, name: p(T.metaTitle, locale), item: `${SITE_URL}/${locale}/guides/${SLUG}` },
    ],
  }

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p(T.metaTitle, locale),
    description: p(T.metaDesc, locale),
    inLanguage: locale,
    author: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/${locale}/guides/${SLUG}`,
  }

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: DESTINATIONS.length,
    itemListElement: DESTINATIONS.map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/${locale}/destinations/${d.slug}`,
      name: getLocalizedCityName(d.slug, d.name, locale),
    })),
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: p(T.faq.q1, locale), acceptedAnswer: { '@type': 'Answer', text: p(T.faq.a1, locale) } },
      { '@type': 'Question', name: p(T.faq.q2, locale), acceptedAnswer: { '@type': 'Answer', text: p(T.faq.a2, locale) } },
      { '@type': 'Question', name: p(T.faq.q3, locale), acceptedAnswer: { '@type': 'Answer', text: p(T.faq.a3, locale) } },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="text-white/60 text-xs mb-4">
            <Link href={`/${locale}`} className="hover:text-white">{p(T.breadHome, locale)}</Link>
            <span className="mx-1.5">/</span>
            <Link href={`/${locale}/guides`} className="hover:text-white">{p(T.breadGuides, locale)}</Link>
          </nav>
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            💧 {p(T.kicker, locale)}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-5">
            {p(T.title, locale)}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
            {p(T.intro, locale)}
          </p>
          {/* Destination jump links */}
          <div className="flex flex-wrap gap-2 mt-8">
            {DESTINATIONS.map((d) => (
              <a
                key={d.slug}
                href={`#${d.slug}`}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold px-3 py-1.5 rounded-full transition-colors"
              >
                💧 {getLocalizedCityName(d.slug, d.name, locale)}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section>
          <div className="space-y-4">
            {DESTINATIONS.map((dest, idx) => (
              <div
                key={dest.slug}
                id={dest.slug}
                className="scroll-mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="relative h-40 sm:h-52">
                  <Image
                    src={`/images/destinations/${dest.slug}.jpg`}
                    alt={getLocalizedCityName(dest.slug, dest.name, locale)}
                    fill
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between gap-3">
                    <h3 className="text-white text-xl sm:text-2xl font-extrabold drop-shadow-sm">{getLocalizedCityName(dest.slug, dest.name, locale)}</h3>
                    <div className="flex-shrink-0 text-right text-white">
                      <div className="text-2xl font-black leading-none drop-shadow-sm">{String(idx + 1).padStart(2, '0')}</div>
                    </div>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                    {p(dest.tag, locale)}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{p(dest.why, locale)}</p>
                  {(HOTELS_BY_DEST[dest.slug] ?? []).length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{p(T.ourPicks, locale)}</div>
                      <div className="rounded-xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
                        {(HOTELS_BY_DEST[dest.slug] ?? []).map((h) => (
                          <Link
                            key={h.slug}
                            href={`/${locale}/hotels/${h.slug}`}
                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-emerald-50/60 transition-colors"
                          >
                            <Image
                              src={`/images/hotels/${h.id}.jpg`}
                              alt={h.name}
                              width={64}
                              height={48}
                              className="w-16 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-semibold text-gray-900 truncate">{h.name}</span>
                              <span className="block text-xs text-gray-500">
                                {'★'.repeat(h.stars || 0)} · {h.rating.toFixed(1)}/10{h.petFee === 0 ? ` · ${p(T.noFee, locale)}` : ''}
                              </span>
                            </span>
                            <span className="flex-shrink-0 text-right">
                              <span className="block text-[11px] text-gray-400">{p(T.fromWord, locale)}</span>
                              <span className="block text-sm font-bold text-gray-900">{h.currency === 'GBP' ? '£' : '€'}{h.priceFrom}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={buildAllezDestLink(dest.name, dest.country, `${CAMPAIGN}-${dest.slug}`, 3)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
                    >
                      🏨 {p(T.seeHotels, locale)}
                    </a>
                    <Link
                      href={`/${locale}/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-1.5 border border-gray-200 hover:border-emerald-300 text-gray-700 hover:text-emerald-700 text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                    >
                      🐾 {p(T.seeGuide, locale)}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing safety note */}
        <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-3">{p(T.closingTitle, locale)}</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{p(T.closingText, locale)}</p>
        </section>

        {/* Sibling guides */}
        <section className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
          <h2 className="text-xl font-extrabold text-gray-900 mb-5">{p(T.siblingTitle, locale)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SIBLING_GUIDES.map((g) => (
              <Link
                key={g.slug}
                href={`/${locale}/guides/${g.slug}`}
                className="group flex items-start gap-3 bg-white rounded-2xl border border-gray-100 hover:border-emerald-300 hover:shadow-md transition-all p-4"
              >
                <span className="text-2xl flex-shrink-0">{g.emoji}</span>
                <p className="font-semibold text-gray-900 text-sm group-hover:text-emerald-700 transition-colors leading-snug">
                  {p(g.label, locale)}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="space-y-3">
            {[
              { q: T.faq.q1, a: T.faq.a1 },
              { q: T.faq.q2, a: T.faq.a2 },
              { q: T.faq.q3, a: T.faq.a3 },
            ].map((f, i) => (
              <details key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm group">
                <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                  {p(f.q, locale)}
                  <span aria-hidden="true" className="text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                </summary>
                <p className="px-6 pb-5 text-gray-600 leading-relaxed">{p(f.a, locale)}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <GuideFooter locale={locale} currentSlug={SLUG} />
    </>
  )
}
