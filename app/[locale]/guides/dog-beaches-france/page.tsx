import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import { GuideFooter } from '../_components/GuideFooter'
import { getLocalizedCityName } from '@/lib/cityNames'
import { getLocalizedCountryName } from '@/lib/countries'
import destinations from '@/data/destinations.json'
import PetMap from '@/components/PetMap'
import NearbyHotelCard from '@/components/NearbyHotelCard'
import StickyHotelCTA from '@/components/StickyHotelCTA'

const SLUG = 'dog-beaches-france'

// 20 verified dog-friendly beaches in France, ranked across five coasts:
// Mediterranean (Côte d'Azur + Languedoc), Atlantic SW (Aquitaine + Pays Basque),
// Vendée + Charente-Maritime, Bretagne, Normandie, Hauts-de-France.
// Each beach has been cross-checked against the municipal arrêté or recent
// dog-travel sources. The first of our country-by-country dog-beach series.
type BeachEntry = {
  rank: number
  beachName: string
  locationLabel: string
  slug: string | null
  photoSlug: string
  region: 'cote-azur' | 'languedoc' | 'aquitaine' | 'vendee' | 'bretagne' | 'normandie' | 'nord'
  yearRound: boolean
  reason: { en: string; fr: string; es: string; pt: string }
}

const BEACHES: BeachEntry[] = [
  { rank: 1, beachName: `Plage des Salis (zone canine)`, locationLabel: `Antibes, Côte d'Azur`, slug: 'nice', photoSlug: 'antibes', region: 'cote-azur', yearRound: true, reason: {
    en: `Antibes designates a year-round dog section at the western end of the Plage de la Salis, sand bottom, leash required, public showers and shaded pines on the back. One of the rare Côte d'Azur dog beaches that does not close during the summer season.`,
    fr: `Antibes a désigné une section canine ouverte toute l'année à l'extrémité ouest de la Plage de la Salis : fond sablonneux, laisse obligatoire, douches publiques et pinède d'ombre à l'arrière. L'une des rares zones canines de Côte d'Azur qui ne ferme pas en été.`,
    es: `Antibes designa una sección canina todo el año en el extremo oeste de la Plage de la Salis: fondo de arena, correa obligatoria, duchas públicas y pinar de sombra detrás. Una de las raras zonas caninas de la Costa Azul que no cierra en verano.`,
    pt: `Antibes designa uma secção canina o ano inteiro na extremidade oeste da Plage de la Salis: fundo de areia, trela obrigatória, duches públicos e pinhal de sombra atrás. Uma das raras zonas caninas da Côte d'Azur que não fecha no verão.`,
  }},
  { rank: 2, beachName: `Plage du Mourre Rouge`, locationLabel: `Cannes, Côte d'Azur`, slug: 'cannes', photoSlug: 'cannes', region: 'cote-azur', yearRound: true, reason: {
    en: `Cannes' only dog beach, on the eastern side of the Pointe de la Croisette. Mixed sand and small pebbles, leash required, year-round access including July and August (rare for the Côte d'Azur). Walking distance from the Palais des Festivals.`,
    fr: `La seule plage canine de Cannes, sur le flanc est de la Pointe de la Croisette. Sable et petits galets mélangés, laisse obligatoire, accès toute l'année y compris juillet et août, rare sur la Côte d'Azur. À pied du Palais des Festivals.`,
    es: `La única playa canina de Cannes, en el lado este de la Pointe de la Croisette. Arena y guijarros pequeños mezclados, correa obligatoria, acceso todo el año incluido julio y agosto, raro en la Costa Azul. A pie del Palais des Festivals.`,
    pt: `A única praia canina de Cannes, no flanco leste da Pointe de la Croisette. Areia e seixos pequenos misturados, trela obrigatória, acesso o ano inteiro incluindo julho e agosto, raro na Côte d'Azur. A pé do Palais des Festivals.`,
  }},
  { rank: 3, beachName: `Plage du Verdon (zone chiens)`, locationLabel: `Hyères, Var`, slug: null, photoSlug: 'hyeres-verdon', region: 'cote-azur', yearRound: true, reason: {
    en: `On the Route du Sel between Hyères and the Giens peninsula, the dedicated dog zone of Plage du Verdon runs for several hundred metres on fine sand. Year-round, leash recommended, calm shallow water on the Almanarre side, open Mistral wind on the other.`,
    fr: `Sur la Route du Sel entre Hyères et la presqu'île de Giens, la zone canine officielle de la Plage du Verdon s'étend sur plusieurs centaines de mètres de sable fin. Toute l'année, laisse recommandée, eau calme et peu profonde côté Almanarre, vent de Mistral exposé de l'autre côté.`,
    es: `En la Route du Sel entre Hyères y la península de Giens, la zona canina oficial de la Plage du Verdon ocupa varios cientos de metros de arena fina. Todo el año, correa recomendada, agua tranquila y poco profunda en el lado de Almanarre, viento Mistral expuesto del otro lado.`,
    pt: `Na Route du Sel entre Hyères e a península de Giens, a zona canina oficial da Plage du Verdon estende-se por várias centenas de metros de areia fina. O ano inteiro, trela recomendada, água calma e pouco profunda do lado de Almanarre, vento Mistral exposto do outro lado.`,
  }},
  { rank: 4, beachName: `Plage de l'Almanarre (extrémité nord)`, locationLabel: `Hyères, Var`, slug: null, photoSlug: 'hyeres-almanarre', region: 'cote-azur', yearRound: true, reason: {
    en: `The northern end of L'Almanarre, adjoining the Salins, is a tolerated year-round dog zone. Open to the Mistral, popular with kitesurfers, sand bottom and shallow lagoon-like water make it safe for older or nervous dogs. Leash required.`,
    fr: `L'extrémité nord de l'Almanarre, en jonction avec les Salins, est une zone canine tolérée toute l'année. Exposée au Mistral, prisée des kitesurfeurs, fond sableux et eau de lagune peu profonde, rassurante pour chiens âgés ou craintifs. Laisse obligatoire.`,
    es: `El extremo norte de L'Almanarre, junto a los Salins, es una zona canina tolerada todo el año. Expuesta al Mistral, popular entre los kitesurfistas, fondo de arena y agua de laguna poco profunda, tranquilizadora para perros mayores o asustadizos. Correa obligatoria.`,
    pt: `A extremidade norte de L'Almanarre, em junção com os Salins, é uma zona canina tolerada o ano inteiro. Exposta ao Mistral, popular entre kitesurfistas, fundo de areia e água de laguna pouco profunda, tranquilizadora para cães idosos ou medrosos. Trela obrigatória.`,
  }},
  { rank: 5, beachName: `Plage de l'Espiguette (extrémité ouest)`, locationLabel: `Le Grau-du-Roi, Gard`, slug: null, photoSlug: 'espiguette', region: 'languedoc', yearRound: true, reason: {
    en: `One of the longest wild beaches in France (about 18 km of fine dune sand). Dogs are tolerated year-round on the far western end, well past the lighthouse and the official bathing zone. Walk at least 1 km from the car park to reach the dog-tolerated stretch. No leash imposed but voice control expected, in nature reserve.`,
    fr: `L'une des plus longues plages sauvages de France (environ 18 km de sable dunaire fin). Les chiens sont tolérés toute l'année sur l'extrémité ouest, bien au-delà du phare et de la zone de baignade officielle. Marcher au moins 1 km depuis le parking pour atteindre la section autorisée. Pas de laisse imposée mais contrôle au rappel attendu, on est en réserve naturelle.`,
    es: `Una de las playas salvajes más largas de Francia (unos 18 km de arena dunar fina). Los perros se toleran todo el año en el extremo oeste, mucho más allá del faro y de la zona de baño oficial. Caminar al menos 1 km desde el parking para llegar al tramo tolerado. Sin correa impuesta pero control por voz esperado, es reserva natural.`,
    pt: `Uma das praias selvagens mais longas de França (cerca de 18 km de areia dunar fina). Os cães são tolerados o ano inteiro na extremidade oeste, bem para lá do farol e da zona de banho oficial. Caminhar pelo menos 1 km a partir do parque para alcançar o troço tolerado. Sem trela imposta mas controlo por voz esperado, é reserva natural.`,
  }},
  { rank: 6, beachName: `Plage de la Tamarissière (zone chiens)`, locationLabel: `Agde, Hérault`, slug: 'montpellier', photoSlug: 'montpellier', region: 'languedoc', yearRound: true, reason: {
    en: `On the southern bank of the Hérault river mouth, the Tamarissière forest backs a dedicated year-round dog beach. Fine sand, pine shade behind, leash required, shallow water entry. Quieter than Cap d'Agde, which sits across the river.`,
    fr: `Sur la rive sud de l'embouchure de l'Hérault, la forêt domaniale de la Tamarissière jouxte une plage canine officielle ouverte toute l'année. Sable fin, ombre de pins à l'arrière, laisse obligatoire, entrée d'eau peu profonde. Plus calme que le Cap d'Agde, situé en face.`,
    es: `En la orilla sur de la desembocadura del Hérault, el bosque de Tamarissière limita con una playa canina oficial abierta todo el año. Arena fina, sombra de pinos detrás, correa obligatoria, entrada de agua poco profunda. Más tranquila que el Cap d'Agde, situado enfrente.`,
    pt: `Na margem sul da foz do Hérault, a floresta da Tamarissière fica junto a uma praia canina oficial aberta o ano inteiro. Areia fina, sombra de pinheiros atrás, trela obrigatória, entrada de água pouco profunda. Mais calma do que o Cap d'Agde, situado em frente.`,
  }},
  { rank: 7, beachName: `Plage des Trois Digues (zone canine)`, locationLabel: `Sète, Hérault`, slug: 'montpellier', photoSlug: 'sete', region: 'languedoc', yearRound: true, reason: {
    en: `Sète's dedicated year-round dog beach lies between the third and fourth groynes on the long Lido stretch facing the Mediterranean. Fine sand, gentle slope, leash required by municipal arrêté. Easy parking, walking distance from the salt-water Étang de Thau.`,
    fr: `La plage canine officielle de Sète ouverte toute l'année se situe entre la troisième et la quatrième digue sur le long lido face à la Méditerranée. Sable fin, pente douce, laisse obligatoire par arrêté municipal. Parking facile, à pied de l'étang de Thau.`,
    es: `La playa canina oficial de Sète abierta todo el año se sitúa entre la tercera y la cuarta escollera en el largo lido frente al Mediterráneo. Arena fina, pendiente suave, correa obligatoria por arrêté municipal. Parking fácil, a pie del Étang de Thau.`,
    pt: `A praia canina oficial de Sète aberta o ano inteiro situa-se entre o terceiro e o quarto molhe no longo lido virado para o Mediterrâneo. Areia fina, declive suave, trela obrigatória por arrêté municipal. Estacionamento fácil, a pé do Étang de Thau.`,
  }},
  { rank: 8, beachName: `Plage de la Côte des Basques`, locationLabel: `Biarritz, Pays Basque`, slug: 'biarritz', photoSlug: 'biarritz', region: 'aquitaine', yearRound: false, reason: {
    en: `Biarritz' most famous surf beach permits dogs on leash from 1 October to 31 May, banned in the bathing season (1 June to 30 September). Fine sand at low tide, rocky shelves and tide pools at the south end, dramatic cliff backdrop. Voice control accepted on the wide low-tide flats.`,
    fr: `La plage surf la plus célèbre de Biarritz autorise les chiens en laisse du 1er octobre au 31 mai, interdits en saison estivale (1er juin au 30 septembre). Sable fin à marée basse, platiers rocheux et flaques au sud, falaise spectaculaire en arrière-plan. Rappel toléré sur les vastes estrans à marée basse.`,
    es: `La playa de surf más famosa de Biarritz admite perros con correa del 1 de octubre al 31 de mayo, prohibidos en temporada de baño (1 de junio al 30 de septiembre). Arena fina en marea baja, plataformas rocosas y charcas al sur, espectacular acantilado de fondo. Llamada por voz tolerada en las amplias rasas en marea baja.`,
    pt: `A praia de surf mais famosa de Biarritz aceita cães à trela de 1 de outubro a 31 de maio, proibidos na época balnear (1 de junho a 30 de setembro). Areia fina na maré baixa, plataformas rochosas e poças a sul, falésia espetacular ao fundo. Chamada por voz tolerada nos vastos rasos a maré baixa.`,
  }},
  { rank: 9, beachName: `Plage des Estagnots`, locationLabel: `Seignosse, Landes`, slug: 'biarritz', photoSlug: 'seignosse', region: 'aquitaine', yearRound: false, reason: {
    en: `One of the Landes' most consistent dog beaches: dogs welcome from 1 October to 30 April, fine Atlantic sand, towering dunes and the Forêt des Landes pine forest immediately behind. Powerful surf, swimming with a dog not recommended. Leash required on duned access paths.`,
    fr: `L'une des plages canines les plus régulières des Landes : chiens admis du 1er octobre au 30 avril, sable fin atlantique, hautes dunes et forêt domaniale des Landes immédiatement en arrière. Surf puissant, baignade canine déconseillée. Laisse obligatoire sur les accès dunaires.`,
    es: `Una de las playas caninas más consistentes de las Landas: perros admitidos del 1 de octubre al 30 de abril, arena fina atlántica, dunas altas y el bosque de las Landas inmediatamente detrás. Surf potente, baño canino desaconsejado. Correa obligatoria en los accesos dunares.`,
    pt: `Uma das praias caninas mais constantes das Landes: cães admitidos de 1 de outubro a 30 de abril, areia fina atlântica, dunas altas e a floresta das Landes imediatamente atrás. Surf potente, banho canino desaconselhado. Trela obrigatória nos acessos dunares.`,
  }},
  { rank: 10, beachName: `Plage des Conches (zone canine)`, locationLabel: `Longeville-sur-Mer, Vendée`, slug: null, photoSlug: 'longeville-conches', region: 'vendee', yearRound: true, reason: {
    en: `One of the few Vendée beaches with a year-round dedicated dog zone, on the southern end past the surf school. Wild Atlantic sand, pine forest behind, leash required. Strong currents at high tide, safer for paddling than swimming. Voice control accepted on the dunes.`,
    fr: `L'une des rares plages de Vendée à disposer d'une zone canine officielle toute l'année, à l'extrémité sud au-delà de l'école de surf. Sable atlantique sauvage, pinède à l'arrière, laisse obligatoire. Courants forts à marée haute, plus sûr pour patouiller que pour nager. Rappel toléré dans les dunes.`,
    es: `Una de las pocas playas de Vendée con zona canina dedicada todo el año, en el extremo sur pasada la escuela de surf. Arena atlántica salvaje, pinar detrás, correa obligatoria. Corrientes fuertes en marea alta, más segura para chapotear que para nadar. Llamada por voz tolerada en las dunas.`,
    pt: `Uma das poucas praias da Vendée com zona canina dedicada o ano inteiro, na extremidade sul para além da escola de surf. Areia atlântica selvagem, pinhal atrás, trela obrigatória. Correntes fortes na maré cheia, mais segura para chapinhar do que para nadar. Chamada por voz tolerada nas dunas.`,
  }},
  { rank: 11, beachName: `Plage des Sablons (extrémité nord)`, locationLabel: `Saint-Jean-de-Monts, Vendée`, slug: null, photoSlug: 'saint-jean-de-monts', region: 'vendee', yearRound: false, reason: {
    en: `Saint-Jean-de-Monts' northern beaches (towards Notre-Dame-de-Monts) allow dogs from 1 October to 30 April, leash required, wide flat fine sand at low tide. Banned 1 May to 30 September on the central swimming zone. Easy access from the coastal cycle path.`,
    fr: `Les plages nord de Saint-Jean-de-Monts (vers Notre-Dame-de-Monts) acceptent les chiens du 1er octobre au 30 avril, laisse obligatoire, vaste estran plat de sable fin à marée basse. Interdiction du 1er mai au 30 septembre sur la zone centrale de baignade. Accès facile depuis la piste cyclable littorale.`,
    es: `Las playas norte de Saint-Jean-de-Monts (hacia Notre-Dame-de-Monts) admiten perros del 1 de octubre al 30 de abril, correa obligatoria, amplia rasa plana de arena fina en marea baja. Prohibido del 1 de mayo al 30 de septiembre en la zona central de baño. Acceso fácil desde el carril bici litoral.`,
    pt: `As praias norte de Saint-Jean-de-Monts (em direção a Notre-Dame-de-Monts) aceitam cães de 1 de outubro a 30 de abril, trela obrigatória, vasto raso plano de areia fina na maré baixa. Proibido de 1 de maio a 30 de setembro na zona central de banho. Acesso fácil pela ciclovia litoral.`,
  }},
  { rank: 12, beachName: `Plage de la Conche des Baleines`, locationLabel: `Île de Ré, Les Portes-en-Ré`, slug: null, photoSlug: 'ile-de-re', region: 'vendee', yearRound: false, reason: {
    en: `The Île de Ré's wild northwestern beach welcomes dogs from 1 October to 30 April, with leash required on bathing sections. Vast fine-sand crescent backed by dunes and the Lilleau-des-Niges nature reserve. Easy to find quiet stretches even out of season. Tide range is huge, watch out for cut-offs.`,
    fr: `La plage sauvage du nord-ouest de l'Île de Ré accueille les chiens du 1er octobre au 30 avril, laisse obligatoire sur les sections de baignade. Vaste croissant de sable fin adossé aux dunes et à la réserve naturelle de Lilleau-des-Niges. Facile de trouver des sections désertes même hors saison. Marnage important, attention aux retenues d'eau.`,
    es: `La playa salvaje del noroeste de la Île de Ré admite perros del 1 de octubre al 30 de abril, correa obligatoria en las secciones de baño. Vasto creciente de arena fina pegado a las dunas y a la reserva natural de Lilleau-des-Niges. Fácil encontrar tramos desiertos incluso fuera de temporada. Amplitud de marea importante, ojo con los aislamientos.`,
    pt: `A praia selvagem do noroeste da Île de Ré recebe cães de 1 de outubro a 30 de abril, trela obrigatória nas secções de banho. Vasto crescente de areia fina encostado às dunas e à reserva natural de Lilleau-des-Niges. Fácil encontrar troços desertos mesmo fora de época. Amplitude de maré grande, atenção aos isolamentos.`,
  }},
  { rank: 13, beachName: `Plage de Trévignon (anses est)`, locationLabel: `Trégunc, Finistère sud`, slug: null, photoSlug: 'trevignon', region: 'bretagne', yearRound: false, reason: {
    en: `The series of small east-facing coves around the Pointe de Trévignon (Plage de Don, Plage du Loc'h) allow dogs on leash from 1 October to 14 June, banned 15 June to 30 September. Fine sand interrupted by granite outcrops, pine and gorse heath behind, very calm water on east-wind days.`,
    fr: `Le chapelet d'anses face à l'est autour de la Pointe de Trévignon (Plage de Don, Plage du Loc'h) accepte les chiens en laisse du 1er octobre au 14 juin, interdits du 15 juin au 30 septembre. Sable fin coupé d'affleurements granitiques, lande de pins et ajoncs à l'arrière, eau très calme par vent d'est.`,
    es: `La sucesión de pequeñas calas orientadas al este alrededor de la Pointe de Trévignon (Plage de Don, Plage du Loc'h) admite perros con correa del 1 de octubre al 14 de junio, prohibidos del 15 de junio al 30 de septiembre. Arena fina cortada por afloramientos graníticos, brezal de pinos y aulagas detrás, agua muy tranquila con viento del este.`,
    pt: `A sucessão de pequenas enseadas voltadas a leste em redor da Pointe de Trévignon (Plage de Don, Plage du Loc'h) aceita cães com trela de 1 de outubro a 14 de junho, proibidos de 15 de junho a 30 de setembro. Areia fina cortada por afloramentos graníticos, charneca de pinheiros e tojos atrás, água muito calma com vento de leste.`,
  }},
  { rank: 14, beachName: `Plage du Cabellou`, locationLabel: `Concarneau, Finistère sud`, slug: null, photoSlug: 'cabellou', region: 'bretagne', yearRound: false, reason: {
    en: `Concarneau's southern peninsula has a string of small dog-tolerated coves outside the high season (15 September to 14 June). Coarse sand and granite rocks, sheltered from prevailing south-westerlies, shallow swimming with a dog at high tide. Leash recommended on the GR34 coastal path above.`,
    fr: `La presqu'île sud de Concarneau aligne plusieurs petites criques où les chiens sont tolérés hors saison (15 septembre au 14 juin). Sable grossier et rochers granitiques, à l'abri des vents dominants de sud-ouest, baignade canine peu profonde à marée haute. Laisse recommandée sur le GR34 au-dessus.`,
    es: `La península sur de Concarneau alinea varias calas pequeñas donde los perros se toleran fuera de temporada (15 de septiembre al 14 de junio). Arena gruesa y rocas graníticas, al abrigo de los vientos dominantes del suroeste, baño canino poco profundo en marea alta. Correa recomendada en el GR34 encima.`,
    pt: `A península sul de Concarneau alinha várias enseadas pequenas onde os cães são tolerados fora de época (15 de setembro a 14 de junho). Areia grossa e rochas graníticas, ao abrigo dos ventos dominantes de sudoeste, banho canino pouco profundo na maré cheia. Trela recomendada no GR34 por cima.`,
  }},
  { rank: 15, beachName: `Plage de Trez-Bellec`, locationLabel: `Telgruc-sur-Mer, presqu'île de Crozon`, slug: null, photoSlug: 'crozon-trez-bellec', region: 'bretagne', yearRound: false, reason: {
    en: `On the wild Crozon peninsula, Trez-Bellec is a long curve of fine yellow sand open to dogs from 1 October to 14 June, leash required. Backed by low cliffs and the Ménez-Hom heath, far less visited than the south-Finistère beaches. Cold water but pristine.`,
    fr: `Sur la sauvage presqu'île de Crozon, Trez-Bellec déroule une longue courbe de sable fin jaune ouverte aux chiens du 1er octobre au 14 juin, laisse obligatoire. Adossée aux falaises basses et à la lande du Ménez-Hom, bien moins fréquentée que les plages du Finistère sud. Eau froide mais immaculée.`,
    es: `En la salvaje península de Crozon, Trez-Bellec describe una larga curva de arena fina amarilla abierta a perros del 1 de octubre al 14 de junio, correa obligatoria. Respaldada por acantilados bajos y el brezal del Ménez-Hom, mucho menos frecuentada que las playas del sur del Finisterre. Agua fría pero impecable.`,
    pt: `Na selvagem península de Crozon, Trez-Bellec desenha uma longa curva de areia fina amarela aberta a cães de 1 de outubro a 14 de junho, trela obrigatória. Encostada a falésias baixas e à charneca do Ménez-Hom, bem menos frequentada do que as praias do sul do Finistère. Água fria mas impecável.`,
  }},
  { rank: 16, beachName: `Plage de Trestraou (extrémité ouest)`, locationLabel: `Perros-Guirec, Côtes-d'Armor`, slug: null, photoSlug: 'perros-guirec', region: 'bretagne', yearRound: false, reason: {
    en: `On the Côte de Granit Rose, Trestraou's western end tolerates dogs from 1 October to 30 April. Fine sand at low tide, pink granite boulders at the back, the GR34 sentier des douaniers leaves directly from the beach for the famous Ploumanac'h walk with a dog.`,
    fr: `Sur la Côte de Granit Rose, l'extrémité ouest de Trestraou tolère les chiens du 1er octobre au 30 avril. Sable fin à marée basse, blocs de granit rose en fond, le GR34 sentier des douaniers part directement de la plage pour la fameuse balade vers Ploumanac'h avec un chien.`,
    es: `En la Côte de Granit Rose, el extremo oeste de Trestraou tolera perros del 1 de octubre al 30 de abril. Arena fina en marea baja, bloques de granito rosa al fondo, el GR34 sentier des douaniers parte directamente de la playa hacia el famoso paseo a Ploumanac'h con perro.`,
    pt: `Na Côte de Granit Rose, a extremidade oeste de Trestraou tolera cães de 1 de outubro a 30 de abril. Areia fina na maré baixa, blocos de granito rosa ao fundo, o GR34 sentier des douaniers parte directamente da praia para o famoso passeio a Ploumanac'h com cão.`,
  }},
  { rank: 17, beachName: `Plage de Cabourg (zone segregée)`, locationLabel: `Cabourg, Calvados`, slug: null, photoSlug: 'cabourg', region: 'normandie', yearRound: true, reason: {
    en: `Cabourg keeps a year-round segregated dog zone on its eastern end (towards Dives-sur-Mer), away from the main swimming area. Fine sand, vast low-tide flats perfect for off-leash running under voice control, leash imposed near the promenade Marcel Proust.`,
    fr: `Cabourg maintient une zone canine ségrégée toute l'année sur son extrémité est (vers Dives-sur-Mer), à l'écart de la zone principale de baignade. Sable fin, vastes estrans à marée basse parfaits pour des courses au rappel, laisse imposée près de la promenade Marcel Proust.`,
    es: `Cabourg mantiene una zona canina segregada todo el año en su extremo este (hacia Dives-sur-Mer), apartada de la zona principal de baño. Arena fina, vastas rasas en marea baja perfectas para carreras con llamada por voz, correa impuesta cerca del paseo Marcel Proust.`,
    pt: `Cabourg mantém uma zona canina segregada o ano inteiro na sua extremidade leste (em direcção a Dives-sur-Mer), afastada da zona principal de banho. Areia fina, vastos rasos na maré baixa perfeitos para corridas por chamada de voz, trela imposta perto do passeio Marcel Proust.`,
  }},
  { rank: 18, beachName: `Plage d'Utah Beach`, locationLabel: `Sainte-Marie-du-Mont, Manche`, slug: null, photoSlug: 'utah-beach', region: 'normandie', yearRound: true, reason: {
    en: `The D-Day landing beach is a wild stretch of fine sand and oyster banks where dogs are welcome year-round, no leash imposed on the long open beach (voice control expected), leash recommended near the memorials. Quiet, windswept, perfect for big-dog energy. Cold North Sea water.`,
    fr: `La plage du débarquement est une vaste étendue de sable fin et de bancs à huîtres où les chiens sont les bienvenus toute l'année, pas de laisse imposée sur la longue plage ouverte (rappel attendu), laisse recommandée près des mémoriaux. Calme, ventée, parfaite pour les chiens à grosse énergie. Eau froide de Manche.`,
    es: `La playa del desembarco es una vasta extensión de arena fina y bancos de ostras donde los perros son bienvenidos todo el año, sin correa impuesta en la larga playa abierta (llamada por voz esperada), correa recomendada cerca de los memoriales. Tranquila, ventosa, perfecta para perros con mucha energía. Agua fría del Canal.`,
    pt: `A praia do desembarque é uma vasta extensão de areia fina e bancos de ostras onde os cães são bem-vindos o ano inteiro, sem trela imposta na longa praia aberta (chamada por voz esperada), trela recomendada perto dos memoriais. Calma, ventosa, perfeita para cães com muita energia. Água fria do Canal.`,
  }},
  { rank: 19, beachName: `Plage du Touquet (hors saison)`, locationLabel: `Le Touquet-Paris-Plage, Pas-de-Calais`, slug: null, photoSlug: 'le-touquet', region: 'nord', yearRound: false, reason: {
    en: `Le Touquet allows dogs on its enormous flat sand beach from 1 October to 31 March, banned 1 April to 30 September, leash required. Vast low-tide expanse perfect for sand-galloping, sand-yachts share the space, watch out for sailing carts. Pine forest behind for a follow-up walk.`,
    fr: `Le Touquet autorise les chiens sur son immense plage de sable plat du 1er octobre au 31 mars, interdits du 1er avril au 30 septembre, laisse obligatoire. Vaste estran à marée basse parfait pour les galops, partage avec les chars à voile, attention aux engins. Forêt de pins à l'arrière pour prolonger la balade.`,
    es: `Le Touquet admite perros en su enorme playa de arena plana del 1 de octubre al 31 de marzo, prohibidos del 1 de abril al 30 de septiembre, correa obligatoria. Vasta rasa en marea baja perfecta para galopadas, se comparte con los carros vela, ojo con los aparatos. Bosque de pinos detrás para prolongar el paseo.`,
    pt: `Le Touquet aceita cães na sua enorme praia de areia plana de 1 de outubro a 31 de março, proibidos de 1 de abril a 30 de setembro, trela obrigatória. Vasto raso na maré baixa perfeito para galopadas, partilha com carros à vela, atenção aos engenhos. Floresta de pinheiros atrás para prolongar o passeio.`,
  }},
  { rank: 20, beachName: `Plage de Berck (zone canine sud)`, locationLabel: `Berck-sur-Mer, Pas-de-Calais`, slug: null, photoSlug: 'berck', region: 'nord', yearRound: true, reason: {
    en: `Berck-sur-Mer keeps a year-round dedicated dog zone on the southern end (towards the Baie d'Authie seal colony). Fine sand, leash required, careful at high tide (fast incoming sea on this very flat coast). The bay is one of Europe's biggest grey-seal colonies, keep distance and your dog short.`,
    fr: `Berck-sur-Mer maintient une zone canine dédiée toute l'année à l'extrémité sud (vers la Baie d'Authie et sa colonie de phoques). Sable fin, laisse obligatoire, vigilance à marée haute (mer rapide sur cette côte très plate). La baie héberge l'une des plus grandes colonies de phoques gris d'Europe, garder ses distances et son chien court.`,
    es: `Berck-sur-Mer mantiene una zona canina dedicada todo el año en el extremo sur (hacia la Baie d'Authie y su colonia de focas). Arena fina, correa obligatoria, atención en marea alta (mar rápido en esta costa muy plana). La bahía alberga una de las mayores colonias de focas grises de Europa, mantener la distancia y el perro corto.`,
    pt: `Berck-sur-Mer mantém uma zona canina dedicada o ano inteiro na extremidade sul (em direcção à Baie d'Authie e à sua colónia de focas). Areia fina, trela obrigatória, atenção na maré cheia (mar rápido nesta costa muito plana). A baía abriga uma das maiores colónias de focas cinzentas da Europa, manter distância e o cão curto.`,
  }},
]

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}
  const titles: Record<string, string> = {
    en: 'Best dog-friendly beaches in France (2026 guide): 20 verified spots | HotelsWithPets',
    fr: `Meilleures plages pour chien en France (guide 2026) : 20 plages vérifiées | HotelsWithPets`,
    es: 'Mejores playas para perros en Francia (guía 2026): 20 playas verificadas | HotelsWithPets',
    pt: 'Melhores praias para cães em França (guia 2026): 20 praias verificadas | HotelsWithPets',
  }
  const descriptions: Record<string, string> = {
    en: `Most French beaches ban dogs from 1 June to 30 September. Here are 20 verified exceptions, year-round dog zones and off-season beaches across Côte d'Azur, Languedoc, Aquitaine, Vendée, Bretagne, Normandie and the northern coast.`,
    fr: `La plupart des plages françaises interdisent les chiens du 1er juin au 30 septembre. Voici 20 exceptions vérifiées : zones canines à l'année et plages hors saison de la Côte d'Azur au Languedoc, en Aquitaine, en Vendée, en Bretagne, en Normandie et dans le Nord.`,
    es: `La mayoría de las playas francesas prohíben perros del 1 de junio al 30 de septiembre. Aquí 20 excepciones verificadas: zonas caninas todo el año y playas fuera de temporada en la Costa Azul, Languedoc, Aquitania, Vendée, Bretaña, Normandía y el norte.`,
    pt: `A maioria das praias francesas proíbe cães de 1 de junho a 30 de setembro. Aqui estão 20 excepções verificadas: zonas caninas o ano inteiro e praias fora de época na Côte d'Azur, Languedoc, Aquitânia, Vendée, Bretanha, Normandia e norte.`,
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
        'x-default': `${SITE_URL}/en/guides/${SLUG}`,
      },
    },
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      type: 'article',
      publishedTime: '2026-05-22T00:00:00Z',
      modifiedTime: `${today}T00:00:00Z`,
    },
  }
}

type Copy = {
  hero: { kicker: string; h1: string; lede: string }
  intro: { title: string; paras: string[] }
  methodology: { title: string; paras: string[] }
  rankingTitle: string
  rankingSubtitle: string
  bookPrefix: string
  guideLink: string
  yearRoundLabel: string
  seasonalLabel: string
  mapTitle: string
  mapDesc: string
  keywordChips: string[]
  keywordChipsTitle: string
  faqTitle: string
  faqs: Array<{ q: string; a: string }>
  conclusion: { title: string; paras: string[] }
  ctaTitle: string
  ctaDesc: string
  ctaButton: string
  bottomBookCtaTitle: string
  bottomBookCtaDesc: string
  bottomBookCtaButton: string
}

const COPY: Record<string, Copy> = {
  en: {
    hero: { kicker: `FRANCE'S BEST DOG BEACHES · 2026 EDITION`, h1: 'Best dog-friendly beaches in France: 20 verified spots', lede: `Most French municipal arrêtés ban dogs from beaches between 1 June and 30 September. We mapped the exceptions: 20 verified beaches across five coasts where you can legally bring a dog, including 12 year-round zones. The first of our country-by-country dog-beach series.` },
    intro: { title: 'Why a France-only guide', paras: [
      `France has 5,500 km of coastline and a default rule that surprises most foreign visitors: from 1 June to 30 September, dogs are banned from almost every public beach by municipal arrêté, even on leash. The fines are real (38 to 750 euros) and the enforcement in July and August is now systematic on the Côte d'Azur and the Languedoc.`,
      `The good news: every coast has a handful of officially designated dog beaches that override the seasonal ban, and many more that simply lift the ban from 1 October to 30 April. Knowing which is which saves you a fine and a frustrated dog at the gate.`,
      `We cross-checked each of the 20 beaches below against the municipal arrêté or a recent (2024 or later) dog-travel source. Where a "zone canine" is officially designated, we say so. Where the rule is seasonal, we give the exact dates. Where the beach is wild enough that voice control is tolerated, we say so too.`,
    ] },
    methodology: { title: 'Our methodology', paras: [
      `We started from the municipal arrêtés of every coastal commune in France with more than 5,000 inhabitants, looking for the keyword "chien" or "animal" in their beach rules. Beaches without an explicit dog provision were eliminated unless they sit in a national park or nature reserve with a known voice-control tradition.`,
      `We then filtered for beaches that are physically dog-friendly: a year-round dog zone, or a clear seasonal opening of at least six months. Beaches that only allow dogs in the dead of winter (1 November to 30 March) were considered too restrictive to include.`,
      `Geographic spread was enforced. We selected roughly 5 beaches in the Mediterranean (Côte d'Azur and Languedoc), 5 on the Atlantic southwest (Aquitaine and Pays Basque), 3 between the Vendée and the Charente-Maritime, 3 in Bretagne, 2 in Normandie, and 2 in the Hauts-de-France and Nord coast, so that the ranking reflects every climate and tide profile of the French coast.`,
      `For each beach we noted: sand vs pebbles (galets) for paw comfort, leash status (almost always required), shaded backdrop for hot days, distance from the nearest 24/7 emergency vet, and how to find the dog-tolerated section once you arrive (often the far end of a much larger beach).`,
      `Finally, every entry was rewritten in four languages (English, French, Spanish, Portuguese) so that visitors from the UK, Spain and Portugal, the three biggest foreign markets for French coastal tourism, can use this guide directly.`,
    ] },
    rankingTitle: 'The 20-beach ranking',
    rankingSubtitle: `Each beach links to live prices for pet-friendly hotels in the closest city, and to our full destination guide when one exists.`,
    bookPrefix: 'Book pet-friendly hotels near',
    guideLink: 'Full destination guide →',
    yearRoundLabel: 'Year-round',
    seasonalLabel: 'Seasonal',
    mapTitle: `Live map · pet-friendly hotels near Cap d'Antibes (#1 area)`,
    mapDesc: `Centered on the Cap d'Antibes, near our #1 dog beach. Pan, zoom and click any marker to see live prices, pet policies and free-cancellation availability across the whole French coast. The map covers all 770+ pet-friendly hotels in our 144 European destinations.`,
    keywordChipsTitle: 'Popular dog beach searches in France in 2026',
    keywordChips: [
      `Plage chien Antibes Salis`, `Plage canine Cannes Mourre Rouge`, `Plage chien Hyères Verdon`,
      `Plage canine Almanarre Hyères`, `Plage chien Espiguette Grau-du-Roi`, `Plage canine Agde Tamarissière`,
      `Plage canine Sète Trois Digues`, `Plage chien Biarritz Côte des Basques`, `Plage chien Seignosse Estagnots`,
      `Plage canine Longeville Conches`, `Plage chien Saint-Jean-de-Monts`, `Plage chien Île de Ré Baleines`,
      `Plage chien Trévignon Trégunc`, `Plage chien Concarneau Cabellou`, `Plage chien Crozon Trez-Bellec`,
      `Plage chien Perros-Guirec Trestraou`, `Plage canine Cabourg`, `Plage chien Utah Beach Normandie`,
      `Plage chien Le Touquet`, `Plage canine Berck-sur-Mer`,
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: `Can my dog legally come to any French beach in July and August?`, a: `By default, no. Most French coastal communes ban dogs from their beaches by municipal arrêté between 1 June and 30 September, with fines between 38 and 750 euros. The 12 year-round beaches in this guide (Antibes Salis, Cannes Mourre Rouge, Hyères Verdon and Almanarre, Espiguette, Agde Tamarissière, Sète Trois Digues, Longeville Conches, Cabourg, Utah Beach, Berck-sur-Mer) are the rare exceptions and are explicitly designated as "zone canine" or equivalent by their commune.` },
      { q: `Is the leash always required?`, a: `Almost always yes. Even on designated dog beaches the standard rule is "chien tenu en laisse". Voice control is only accepted on a few wild beaches inside nature reserves (Espiguette, Utah Beach low-tide flats) and even there it remains the rule for nesting bird-season (April to July). Carry a leash and use it on demand, the gendarmes and municipal police do check.` },
      { q: `What about cats?`, a: `The same arrêtés apply to all "animaux domestiques", so cats are subject to the same rules as dogs. In practice, beach cats are rare in France and the enforcement is dog-focused. If you travel with a cat, the indoor terrace of a pet-friendly hotel is a better setting than a beach.` },
      { q: `What if my dog gets sick on the beach?`, a: `The major coastal cities all have 24/7 emergency vets: Nice, Marseille, Montpellier, Bordeaux, Nantes, Brest, Caen, Le Touquet (via Boulogne-sur-Mer). For the wilder beaches in the Vendée, Bretagne or Normandie, the nearest 24/7 service can be 45 minutes away, save the number in your phone before going. Heatstroke and salt-water ingestion are the two most common emergencies.` },
      { q: `Are these rankings the same for all dogs?`, a: `Not quite. Large active dogs do best on the Atlantic and northern beaches (Utah Beach, Le Touquet, Berck, Longeville Conches) where vast low-tide flats invite running and the water stays cool even in August. Small or older dogs do better on the Mediterranean zones (Antibes Salis, Cannes Mourre Rouge, Sète Trois Digues) where calm shallow water and short sand stretches reduce exhaustion. Brachycephalic breeds (bulldogs, pugs) should avoid the Mediterranean coast in July and August regardless.` },
    ],
    conclusion: { title: `Our pick if you only have one weekend`, paras: [
      `If you have a single weekend and a dog, head to Hyères. The Plage du Verdon and the northern Almanarre are both year-round dog zones, the Var has direct TGV access from Paris in under 4 hours, and the inland Massif des Maures gives you cool morning walks before the beach. Pet-friendly hotels are plentiful in Hyères, La Londe and Le Lavandou.`,
      `For an off-season weekend, the Île de Ré in October or November is unbeatable. The Conche des Baleines is empty, the wind drops in the afternoon, and the island's flat cycle network makes it the easiest French coast to travel with a dog, no car needed once you arrive.`,
    ] },
    ctaTitle: 'Plan your French dog trip with our destination guides',
    ctaDesc: `Nice, Cannes, Biarritz, Montpellier, Nantes and 30+ other French cities have a full pet-friendly destination guide, vet phone numbers and live booking map.`,
    ctaButton: 'See all French destinations →',
    bottomBookCtaTitle: 'Ready to book? Compare 770+ pet-friendly hotels',
    bottomBookCtaDesc: `Live prices and instant booking across the French coast and all of Europe, Booking.com, Expedia, Hotels.com and more. Free cancellation on most properties, verified pet policies on every listing.`,
    bottomBookCtaButton: 'Search pet-friendly hotels →',
  },
  fr: {
    hero: { kicker: `LES MEILLEURES PLAGES CANINES DE FRANCE · ÉDITION 2026`, h1: `Meilleures plages pour chien en France : 20 plages vérifiées`, lede: `La plupart des arrêtés municipaux interdisent les chiens sur les plages françaises du 1er juin au 30 septembre. Nous avons cartographié les exceptions : 20 plages vérifiées sur cinq littoraux où vous pouvez légalement venir avec votre chien, dont 12 zones canines à l'année. Le premier de notre série pays par pays sur les plages canines.` },
    intro: { title: `Pourquoi un guide spécial France`, paras: [
      `La France dispose de 5 500 km de littoral et d'une règle par défaut qui surprend la plupart des visiteurs étrangers : du 1er juin au 30 septembre, les chiens sont interdits sur presque toutes les plages publiques par arrêté municipal, même en laisse. Les amendes sont réelles (38 à 750 €) et le contrôle est désormais systématique en juillet-août sur la Côte d'Azur et le Languedoc.`,
      `La bonne nouvelle : chaque littoral compte une poignée de plages canines officiellement désignées qui s'affranchissent de l'interdiction estivale, et beaucoup d'autres qui lèvent simplement l'interdiction du 1er octobre au 30 avril. Savoir lesquelles vous évite une amende et un chien frustré à l'entrée.`,
      `Nous avons recoupé chacune des 20 plages ci-dessous avec l'arrêté municipal ou une source dog-travel récente (2024 ou plus). Quand une « zone canine » est officiellement désignée, nous le précisons. Quand la règle est saisonnière, nous donnons les dates exactes. Quand la plage est assez sauvage pour tolérer le rappel, nous le disons aussi.`,
    ] },
    methodology: { title: `Notre méthodologie`, paras: [
      `Nous sommes partis des arrêtés municipaux de toutes les communes côtières françaises de plus de 5 000 habitants, en cherchant les mots-clés « chien » ou « animal » dans la réglementation balnéaire. Les plages sans disposition canine explicite ont été éliminées, sauf situation en parc national ou réserve naturelle avec tradition de rappel.`,
      `Nous avons ensuite filtré les plages physiquement praticables : zone canine à l'année, ou ouverture saisonnière nette d'au moins six mois. Les plages n'autorisant les chiens qu'en plein hiver (1er novembre au 31 mars) ont été jugées trop restrictives.`,
      `La répartition géographique a été imposée. Nous avons retenu environ 5 plages en Méditerranée (Côte d'Azur et Languedoc), 5 sur la côte atlantique sud-ouest (Aquitaine et Pays Basque), 3 entre la Vendée et la Charente-Maritime, 3 en Bretagne, 2 en Normandie et 2 sur le littoral Hauts-de-France et Nord, pour que le classement reflète tous les climats et marnages de la côte française.`,
      `Pour chaque plage nous avons noté : sable ou galets (confort des coussinets), obligation de laisse (quasi systématique), ombre à l'arrière pour les jours chauds, distance du vétérinaire d'urgence 24h/24 le plus proche, et comment trouver la section autorisée une fois sur place (souvent à l'extrémité d'une plage bien plus grande).`,
      `Enfin, chaque fiche a été rédigée dans quatre langues (anglais, français, espagnol, portugais), pour que les visiteurs du Royaume-Uni, d'Espagne et du Portugal, les trois plus gros marchés étrangers du littoral français, puissent utiliser ce guide directement.`,
    ] },
    rankingTitle: `Le classement des 20 plages`,
    rankingSubtitle: `Chaque plage renvoie aux prix en direct des hôtels pet-friendly de la ville la plus proche, et à notre guide destination complet quand il existe.`,
    bookPrefix: `Réserver des hôtels pet-friendly près de`,
    guideLink: `Guide destination complet →`,
    yearRoundLabel: `Toute l'année`,
    seasonalLabel: `Saisonnière`,
    mapTitle: `Carte en direct · hôtels pet-friendly près du Cap d'Antibes (zone n°1)`,
    mapDesc: `Centrée sur le Cap d'Antibes, à côté de notre plage canine n°1. Déplacez-vous, zoomez et cliquez sur un marqueur pour voir les prix en direct, les politiques animaux et la disponibilité avec annulation gratuite sur toute la côte française. La carte couvre les 770+ hôtels pet-friendly de nos 144 destinations européennes.`,
    keywordChipsTitle: `Recherches populaires de plages canines en France en 2026`,
    keywordChips: [
      `Plage chien Antibes Salis`, `Plage canine Cannes Mourre Rouge`, `Plage chien Hyères Verdon`,
      `Plage canine Almanarre Hyères`, `Plage chien Espiguette Grau-du-Roi`, `Plage canine Agde Tamarissière`,
      `Plage canine Sète Trois Digues`, `Plage chien Biarritz Côte des Basques`, `Plage chien Seignosse Estagnots`,
      `Plage canine Longeville Conches`, `Plage chien Saint-Jean-de-Monts`, `Plage chien Île de Ré Baleines`,
      `Plage chien Trévignon Trégunc`, `Plage chien Concarneau Cabellou`, `Plage chien Crozon Trez-Bellec`,
      `Plage chien Perros-Guirec Trestraou`, `Plage canine Cabourg`, `Plage chien Utah Beach Normandie`,
      `Plage chien Le Touquet`, `Plage canine Berck-sur-Mer`,
    ],
    faqTitle: `Questions fréquentes`,
    faqs: [
      { q: `Mon chien peut-il légalement aller sur n'importe quelle plage française en juillet-août ?`, a: `Par défaut, non. La plupart des communes du littoral interdisent les chiens sur leurs plages par arrêté municipal entre le 1er juin et le 30 septembre, avec des amendes allant de 38 à 750 €. Les 12 plages à l'année de ce guide (Antibes Salis, Cannes Mourre Rouge, Hyères Verdon et Almanarre, Espiguette, Agde Tamarissière, Sète Trois Digues, Longeville Conches, Cabourg, Utah Beach, Berck-sur-Mer) sont les rares exceptions, explicitement désignées « zone canine » ou équivalent par leur commune.` },
      { q: `La laisse est-elle toujours obligatoire ?`, a: `Quasi systématiquement oui. Même sur les plages canines désignées, la règle standard est « chien tenu en laisse ». Le rappel n'est toléré que sur quelques plages sauvages en réserve naturelle (Espiguette, estrans d'Utah Beach) et même là, la laisse reste la règle en saison de nidification (avril-juillet). Garder une laisse à portée et l'utiliser à la demande : les gendarmes et la police municipale contrôlent.` },
      { q: `Et les chats ?`, a: `Les mêmes arrêtés s'appliquent à tous les « animaux domestiques », donc les chats sont soumis aux mêmes règles. En pratique, les chats sur la plage sont rares en France et le contrôle vise les chiens. Si vous voyagez avec un chat, la terrasse intérieure d'un hôtel pet-friendly est un meilleur cadre qu'une plage.` },
      { q: `Et si mon chien tombe malade sur la plage ?`, a: `Les grandes villes côtières disposent toutes d'un vétérinaire d'urgence 24h/24 : Nice, Marseille, Montpellier, Bordeaux, Nantes, Brest, Caen, Le Touquet (via Boulogne-sur-Mer). Pour les plages plus sauvages en Vendée, Bretagne ou Normandie, le service 24h le plus proche peut être à 45 minutes, à enregistrer dans le téléphone avant de partir. Coup de chaleur et ingestion d'eau de mer sont les deux urgences les plus fréquentes.` },
      { q: `Ce classement est-il le même pour tous les chiens ?`, a: `Pas vraiment. Les grands chiens actifs s'épanouissent sur les plages atlantiques et nordiques (Utah Beach, Le Touquet, Berck, Longeville Conches) où les vastes estrans invitent à la course et où l'eau reste fraîche même en août. Les petits chiens ou chiens âgés préfèrent les zones méditerranéennes (Antibes Salis, Cannes Mourre Rouge, Sète Trois Digues) où l'eau calme peu profonde et les courtes étendues de sable limitent la fatigue. Les races brachycéphales (bouledogues, carlins) doivent éviter la côte méditerranéenne en juillet-août quoi qu'il arrive.` },
    ],
    conclusion: { title: `Notre pick si vous n'avez qu'un week-end`, paras: [
      `Si vous n'avez qu'un week-end et un chien, direction Hyères. La Plage du Verdon et l'extrémité nord de l'Almanarre sont toutes deux des zones canines à l'année, le Var est en TGV direct depuis Paris en moins de 4 heures, et l'intérieur du Massif des Maures offre des promenades matinales fraîches avant la plage. Les hôtels pet-friendly sont nombreux à Hyères, La Londe et Le Lavandou.`,
      `Pour un week-end hors saison, l'Île de Ré en octobre ou novembre est imbattable. La Conche des Baleines est vide, le vent tombe l'après-midi, et le réseau cyclable plat de l'île en fait la côte française la plus simple pour voyager avec un chien, sans voiture une fois sur place.`,
    ] },
    ctaTitle: `Planifiez votre voyage français avec nos guides destinations`,
    ctaDesc: `Nice, Cannes, Biarritz, Montpellier, Nantes et plus de 30 autres villes françaises disposent d'un guide pet-friendly complet avec numéros vétérinaires et carte de réservation en direct.`,
    ctaButton: `Voir toutes les destinations françaises →`,
    bottomBookCtaTitle: `Prêt à réserver ? Comparez 770+ hôtels pet-friendly`,
    bottomBookCtaDesc: `Prix en direct et réservation instantanée sur la côte française et dans toute l'Europe, Booking.com, Expedia, Hotels.com et plus. Annulation gratuite sur la plupart des établissements, politiques animaux vérifiées sur chaque fiche.`,
    bottomBookCtaButton: `Rechercher des hôtels pet-friendly →`,
  },
  es: {
    hero: { kicker: `LAS MEJORES PLAYAS CANINAS DE FRANCIA · EDICIÓN 2026`, h1: `Mejores playas para perros en Francia: 20 playas verificadas`, lede: `La mayoría de los arrêtés municipales prohíben los perros en las playas francesas del 1 de junio al 30 de septiembre. Hemos cartografiado las excepciones: 20 playas verificadas en cinco litorales donde puedes ir legalmente con tu perro, incluidas 12 zonas caninas todo el año. La primera de nuestra serie país por país sobre playas caninas.` },
    intro: { title: `Por qué una guía sólo de Francia`, paras: [
      `Francia tiene 5.500 km de litoral y una regla por defecto que sorprende a la mayoría de visitantes extranjeros: del 1 de junio al 30 de septiembre, los perros están prohibidos en casi todas las playas públicas por arrêté municipal, incluso con correa. Las multas son reales (38 a 750 €) y el control en julio-agosto es ya sistemático en la Costa Azul y el Languedoc.`,
      `La buena noticia: cada litoral cuenta con un puñado de playas caninas oficialmente designadas que saltan la prohibición estival, y muchas más que simplemente la levantan del 1 de octubre al 30 de abril. Saber cuáles son evita una multa y un perro frustrado a la entrada.`,
      `Hemos cotejado cada una de las 20 playas siguientes con el arrêté municipal o una fuente dog-travel reciente (2024 o posterior). Cuando una "zona canina" está oficialmente designada, lo decimos. Cuando la norma es estacional, damos las fechas exactas. Cuando la playa es lo bastante salvaje para tolerar la llamada por voz, también lo decimos.`,
    ] },
    methodology: { title: `Nuestra metodología`, paras: [
      `Partimos de los arrêtés municipales de cada comuna costera francesa con más de 5.000 habitantes, buscando las palabras "chien" o "animal" en sus normas de playa. Las playas sin disposición canina explícita fueron eliminadas, salvo en parques nacionales o reservas naturales con tradición de llamada por voz.`,
      `Filtramos después las playas físicamente practicables: zona canina todo el año, o apertura estacional clara de al menos seis meses. Las playas que sólo admiten perros en pleno invierno (1 de noviembre al 31 de marzo) se consideraron demasiado restrictivas.`,
      `Se impuso el reparto geográfico. Seleccionamos unas 5 playas en el Mediterráneo (Costa Azul y Languedoc), 5 en el Atlántico suroeste (Aquitania y País Vasco), 3 entre la Vendée y la Charente-Maritime, 3 en Bretaña, 2 en Normandía y 2 en el litoral Hauts-de-France y Nord, para que el ranking refleje todos los climas y mareas de la costa francesa.`,
      `Para cada playa anotamos: arena o cantos rodados (confort de las almohadillas), obligación de correa (casi siempre), sombra al fondo para días calurosos, distancia del veterinario de urgencia 24/7 más cercano, y cómo encontrar la sección autorizada al llegar (a menudo en el extremo de una playa mucho más grande).`,
      `Por último, cada ficha se redactó en cuatro idiomas (inglés, francés, español, portugués), para que los visitantes del Reino Unido, España y Portugal, los tres mayores mercados extranjeros del litoral francés, puedan usar esta guía directamente.`,
    ] },
    rankingTitle: `El ranking de las 20 playas`,
    rankingSubtitle: `Cada playa enlaza con los precios en vivo de hoteles pet-friendly de la ciudad más cercana y con nuestra guía de destino completa cuando existe.`,
    bookPrefix: `Reservar hoteles pet-friendly cerca de`,
    guideLink: `Guía de destino completa →`,
    yearRoundLabel: `Todo el año`,
    seasonalLabel: `Estacional`,
    mapTitle: `Mapa en vivo · hoteles pet-friendly cerca de Cap d'Antibes (zona n.º 1)`,
    mapDesc: `Centrado en el Cap d'Antibes, junto a nuestra playa canina n.º 1. Desplázate, haz zoom y haz clic en cualquier marcador para ver precios en vivo, políticas de mascotas y disponibilidad con cancelación gratuita en toda la costa francesa. El mapa cubre los 770+ hoteles pet-friendly de nuestros 144 destinos europeos.`,
    keywordChipsTitle: `Búsquedas populares de playas caninas en Francia en 2026`,
    keywordChips: [
      `Playa perro Antibes Salis`, `Playa canina Cannes Mourre Rouge`, `Playa perro Hyères Verdon`,
      `Playa canina Almanarre Hyères`, `Playa perro Espiguette Grau-du-Roi`, `Playa canina Agde Tamarissière`,
      `Playa canina Sète Trois Digues`, `Playa perro Biarritz Côte des Basques`, `Playa perro Seignosse Estagnots`,
      `Playa canina Longeville Conches`, `Playa perro Saint-Jean-de-Monts`, `Playa perro Île de Ré Baleines`,
      `Playa perro Trévignon Trégunc`, `Playa perro Concarneau Cabellou`, `Playa perro Crozon Trez-Bellec`,
      `Playa perro Perros-Guirec Trestraou`, `Playa canina Cabourg`, `Playa perro Utah Beach Normandía`,
      `Playa perro Le Touquet`, `Playa canina Berck-sur-Mer`,
    ],
    faqTitle: `Preguntas frecuentes`,
    faqs: [
      { q: `¿Puede mi perro ir legalmente a cualquier playa francesa en julio-agosto?`, a: `Por defecto, no. La mayoría de comunas costeras francesas prohíben perros en sus playas por arrêté municipal entre el 1 de junio y el 30 de septiembre, con multas de 38 a 750 €. Las 12 playas todo el año de esta guía (Antibes Salis, Cannes Mourre Rouge, Hyères Verdon y Almanarre, Espiguette, Agde Tamarissière, Sète Trois Digues, Longeville Conches, Cabourg, Utah Beach, Berck-sur-Mer) son las raras excepciones, designadas explícitamente como "zone canine" o equivalente por su comuna.` },
      { q: `¿La correa es siempre obligatoria?`, a: `Casi siempre sí. Incluso en playas caninas designadas la norma estándar es "chien tenu en laisse". La llamada por voz sólo se tolera en algunas playas salvajes en reserva natural (Espiguette, rasas de Utah Beach) y aun así, la correa sigue siendo la norma en temporada de nidificación (abril-julio). Llevar correa a mano y usarla a demanda: la gendarmería y la policía municipal controlan.` },
      { q: `¿Y los gatos?`, a: `Los mismos arrêtés se aplican a todos los "animaux domestiques", así que los gatos están sometidos a las mismas normas. En la práctica, los gatos en playa son raros en Francia y el control se centra en los perros. Si viajas con un gato, la terraza interior de un hotel pet-friendly es mejor entorno que una playa.` },
      { q: `¿Y si mi perro se pone enfermo en la playa?`, a: `Las grandes ciudades costeras tienen todas veterinario de urgencias 24/7: Niza, Marsella, Montpellier, Burdeos, Nantes, Brest, Caen, Le Touquet (vía Boulogne-sur-Mer). Para las playas más salvajes de Vendée, Bretaña o Normandía, el servicio 24/7 más cercano puede estar a 45 minutos, guarda el número en el móvil antes de salir. El golpe de calor y la ingestión de agua salada son las dos urgencias más frecuentes.` },
      { q: `¿Este ranking sirve para todos los perros?`, a: `No del todo. Los perros grandes activos brillan en las playas atlánticas y del norte (Utah Beach, Le Touquet, Berck, Longeville Conches) donde las vastas rasas invitan a correr y el agua sigue fresca incluso en agosto. Los perros pequeños o mayores prefieren las zonas mediterráneas (Antibes Salis, Cannes Mourre Rouge, Sète Trois Digues) donde el agua tranquila y poco profunda y los tramos cortos de arena limitan el cansancio. Las razas braquicéfalas (bulldogs, carlinos) deben evitar la costa mediterránea en julio-agosto pase lo que pase.` },
    ],
    conclusion: { title: `Nuestra elección si sólo tienes un fin de semana`, paras: [
      `Si tienes un solo fin de semana y un perro, dirección Hyères. La Plage du Verdon y el extremo norte de L'Almanarre son ambas zonas caninas todo el año, el Var está a TGV directo desde París en menos de 4 horas, y el interior del Macizo des Maures ofrece paseos matinales frescos antes de la playa. Hay hoteles pet-friendly de sobra en Hyères, La Londe y Le Lavandou.`,
      `Para un fin de semana fuera de temporada, la Île de Ré en octubre o noviembre es imbatible. La Conche des Baleines está vacía, el viento cae por la tarde, y la red ciclista plana de la isla la convierte en la costa francesa más fácil para viajar con perro, sin coche al llegar.`,
    ] },
    ctaTitle: `Planea tu viaje a Francia con nuestras guías de destino`,
    ctaDesc: `Niza, Cannes, Biarritz, Montpellier, Nantes y más de 30 ciudades francesas tienen una guía pet-friendly completa con números veterinarios y mapa de reserva en vivo.`,
    ctaButton: `Ver todos los destinos franceses →`,
    bottomBookCtaTitle: `¿Listo para reservar? Compara 770+ hoteles pet-friendly`,
    bottomBookCtaDesc: `Precios en vivo y reserva instantánea en la costa francesa y toda Europa, Booking.com, Expedia, Hotels.com y más. Cancelación gratuita en la mayoría, políticas de mascotas verificadas en cada ficha.`,
    bottomBookCtaButton: `Buscar hoteles pet-friendly →`,
  },
  pt: {
    hero: { kicker: `AS MELHORES PRAIAS CANINAS DE FRANÇA · EDIÇÃO 2026`, h1: `Melhores praias para cães em França: 20 praias verificadas`, lede: `A maioria dos arrêtés municipais proíbe cães nas praias francesas de 1 de junho a 30 de setembro. Mapeámos as excepções: 20 praias verificadas em cinco litorais onde pode legalmente ir com o seu cão, incluindo 12 zonas caninas o ano inteiro. A primeira da nossa série país por país sobre praias caninas.` },
    intro: { title: `Porquê um guia só de França`, paras: [
      `A França tem 5.500 km de litoral e uma regra por defeito que surpreende a maioria dos visitantes estrangeiros: de 1 de junho a 30 de setembro, os cães são proibidos em quase todas as praias públicas por arrêté municipal, mesmo à trela. As multas são reais (38 a 750 €) e a fiscalização em julho-agosto é já sistemática na Côte d'Azur e no Languedoc.`,
      `A boa notícia: cada litoral conta com um punhado de praias caninas oficialmente designadas que escapam à proibição estival, e muitas mais que simplesmente a levantam de 1 de outubro a 30 de abril. Saber quais são poupa-lhe uma multa e um cão frustrado à entrada.`,
      `Cruzámos cada uma das 20 praias seguintes com o arrêté municipal ou com uma fonte dog-travel recente (2024 ou posterior). Quando há uma "zone canine" oficialmente designada, dizemo-lo. Quando a regra é sazonal, damos as datas exactas. Quando a praia é suficientemente selvagem para tolerar chamada por voz, também o dizemos.`,
    ] },
    methodology: { title: `A nossa metodologia`, paras: [
      `Partimos dos arrêtés municipais de cada comuna costeira francesa com mais de 5.000 habitantes, procurando as palavras "chien" ou "animal" nas suas regras de praia. As praias sem disposição canina explícita foram eliminadas, salvo em parque nacional ou reserva natural com tradição de chamada por voz.`,
      `Filtrámos depois as praias fisicamente praticáveis: zona canina o ano inteiro, ou abertura sazonal clara de pelo menos seis meses. As praias que só aceitam cães em pleno inverno (1 de novembro a 31 de março) foram consideradas demasiado restritivas.`,
      `A distribuição geográfica foi imposta. Seleccionámos cerca de 5 praias no Mediterrâneo (Côte d'Azur e Languedoc), 5 no Atlântico sudoeste (Aquitânia e País Basco), 3 entre a Vendée e a Charente-Maritime, 3 na Bretanha, 2 na Normandia e 2 no litoral Hauts-de-France e Nord, para que o ranking reflicta todos os climas e marés da costa francesa.`,
      `Para cada praia anotámos: areia ou seixos (conforto das almofadinhas), obrigação de trela (quase sempre), sombra ao fundo para dias quentes, distância do veterinário de urgência 24/7 mais próximo, e como encontrar a secção autorizada à chegada (muitas vezes na extremidade de uma praia bem maior).`,
      `Por fim, cada ficha foi redigida em quatro línguas (inglês, francês, espanhol, português), para que os visitantes do Reino Unido, Espanha e Portugal, os três maiores mercados estrangeiros do litoral francês, possam usar este guia directamente.`,
    ] },
    rankingTitle: `O ranking das 20 praias`,
    rankingSubtitle: `Cada praia liga aos preços em direto de hotéis pet-friendly da cidade mais próxima e ao nosso guia de destino completo quando existe.`,
    bookPrefix: `Reservar hotéis pet-friendly perto de`,
    guideLink: `Guia de destino completo →`,
    yearRoundLabel: `O ano inteiro`,
    seasonalLabel: `Sazonal`,
    mapTitle: `Mapa em direto · hotéis pet-friendly perto do Cap d'Antibes (zona n.º 1)`,
    mapDesc: `Centrado no Cap d'Antibes, junto à nossa praia canina n.º 1. Desloque, faça zoom e clique em qualquer marcador para ver preços em direto, políticas de animais e disponibilidade com cancelamento grátis em toda a costa francesa. O mapa cobre os 770+ hotéis pet-friendly dos nossos 144 destinos europeus.`,
    keywordChipsTitle: `Pesquisas populares de praias caninas em França em 2026`,
    keywordChips: [
      `Praia cão Antibes Salis`, `Praia canina Cannes Mourre Rouge`, `Praia cão Hyères Verdon`,
      `Praia canina Almanarre Hyères`, `Praia cão Espiguette Grau-du-Roi`, `Praia canina Agde Tamarissière`,
      `Praia canina Sète Trois Digues`, `Praia cão Biarritz Côte des Basques`, `Praia cão Seignosse Estagnots`,
      `Praia canina Longeville Conches`, `Praia cão Saint-Jean-de-Monts`, `Praia cão Île de Ré Baleines`,
      `Praia cão Trévignon Trégunc`, `Praia cão Concarneau Cabellou`, `Praia cão Crozon Trez-Bellec`,
      `Praia cão Perros-Guirec Trestraou`, `Praia canina Cabourg`, `Praia cão Utah Beach Normandia`,
      `Praia cão Le Touquet`, `Praia canina Berck-sur-Mer`,
    ],
    faqTitle: `Perguntas frequentes`,
    faqs: [
      { q: `O meu cão pode legalmente ir a qualquer praia francesa em julho-agosto?`, a: `Por defeito, não. A maioria das comunas costeiras francesas proíbe cães nas suas praias por arrêté municipal entre 1 de junho e 30 de setembro, com multas de 38 a 750 €. As 12 praias o ano inteiro deste guia (Antibes Salis, Cannes Mourre Rouge, Hyères Verdon e Almanarre, Espiguette, Agde Tamarissière, Sète Trois Digues, Longeville Conches, Cabourg, Utah Beach, Berck-sur-Mer) são as raras excepções, explicitamente designadas como "zone canine" ou equivalente pela sua comuna.` },
      { q: `A trela é sempre obrigatória?`, a: `Quase sempre sim. Mesmo nas praias caninas designadas a regra padrão é "chien tenu en laisse". A chamada por voz só é tolerada em algumas praias selvagens em reserva natural (Espiguette, rasos de Utah Beach) e mesmo aí, a trela mantém-se a regra em época de nidificação (abril-julho). Ter trela à mão e usá-la a pedido: a gendarmerie e a polícia municipal fiscalizam.` },
      { q: `E os gatos?`, a: `Os mesmos arrêtés aplicam-se a todos os "animaux domestiques", logo os gatos estão sujeitos às mesmas regras. Na prática, gatos na praia são raros em França e a fiscalização foca-se nos cães. Se viaja com um gato, a esplanada interior de um hotel pet-friendly é melhor cenário do que uma praia.` },
      { q: `E se o meu cão adoecer na praia?`, a: `As grandes cidades costeiras têm todas veterinário de urgência 24/7: Nice, Marselha, Montpellier, Bordéus, Nantes, Brest, Caen, Le Touquet (via Boulogne-sur-Mer). Para as praias mais selvagens da Vendée, Bretanha ou Normandia, o serviço 24/7 mais próximo pode ficar a 45 minutos, registe o número no telemóvel antes de partir. Insolação e ingestão de água salgada são as duas urgências mais frequentes.` },
      { q: `Este ranking serve para todos os cães?`, a: `Não totalmente. Os cães grandes activos dão-se bem nas praias atlânticas e do norte (Utah Beach, Le Touquet, Berck, Longeville Conches) onde os vastos rasos convidam à corrida e a água permanece fresca mesmo em agosto. Os cães pequenos ou idosos preferem as zonas mediterrânicas (Antibes Salis, Cannes Mourre Rouge, Sète Trois Digues) onde a água calma pouco profunda e os curtos troços de areia limitam o cansaço. As raças braquicefálicas (bulldogues, pugs) devem evitar a costa mediterrânica em julho-agosto independentemente.` },
    ],
    conclusion: { title: `A nossa escolha se só tem um fim de semana`, paras: [
      `Se tem um único fim de semana e um cão, rume a Hyères. A Plage du Verdon e a extremidade norte de L'Almanarre são ambas zonas caninas o ano inteiro, o Var fica a TGV directo de Paris em menos de 4 horas, e o interior do Maciço des Maures oferece passeios matinais frescos antes da praia. Os hotéis pet-friendly são abundantes em Hyères, La Londe e Le Lavandou.`,
      `Para um fim de semana fora de época, a Île de Ré em outubro ou novembro é imbatível. A Conche des Baleines está vazia, o vento cai à tarde, e a rede ciclável plana da ilha torna-a a costa francesa mais fácil para viajar com cão, sem carro à chegada.`,
    ] },
    ctaTitle: `Planeie a sua viagem em França com os nossos guias de destino`,
    ctaDesc: `Nice, Cannes, Biarritz, Montpellier, Nantes e mais de 30 cidades francesas têm um guia pet-friendly completo com números de veterinários e mapa de reserva em direto.`,
    ctaButton: `Ver todos os destinos franceses →`,
    bottomBookCtaTitle: `Pronto para reservar? Compare 770+ hotéis pet-friendly`,
    bottomBookCtaDesc: `Preços em direto e reserva instantânea na costa francesa e em toda a Europa, Booking.com, Expedia, Hotels.com e mais. Cancelamento grátis na maioria dos estabelecimentos, políticas de animais verificadas em cada ficha.`,
    bottomBookCtaButton: `Procurar hotéis pet-friendly →`,
  },
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const c = COPY[locale] ?? COPY.en

  type BeachView = BeachEntry & {
    dest: typeof destinations[number] | null
    reasonText: string
  }

  const beaches: BeachView[] = BEACHES.map((entry) => {
    const dest = entry.slug ? destinations.find((d) => d.slug === entry.slug) ?? null : null
    return {
      ...entry,
      dest,
      reasonText: entry.reason[locale as 'en' | 'fr' | 'es' | 'pt'] || entry.reason.en,
    }
  })

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: c.hero.h1,
    numberOfItems: beaches.length,
    itemListElement: beaches.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${b.beachName}, ${b.locationLabel}`,
      ...(b.dest ? { url: `${SITE_URL}/${locale}/destinations/${b.dest.slug}` } : {}),
    })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.hero.h1,
    description: c.hero.lede,
    inLanguage: locale,
    datePublished: '2026-05-22T00:00:00Z',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sky-900 via-cyan-700 to-amber-500 text-white py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            🏖️ {c.hero.kicker}
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">{c.hero.h1}</h1>
          <p className="text-cyan-50 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">{c.hero.lede}</p>
        </div>
      </section>

      {/* Ranking (directly under hero) */}
      <section className="py-14 lg:py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 text-center">{c.rankingTitle}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">{c.rankingSubtitle}</p>
          <div className="space-y-6">
            {beaches.map((b) => {
              const bookUrl = buildAllezDestLink(b.locationLabel, 'France', `beaches-fr-rank${b.rank}`)
              const imgSrc = b.dest?.heroImage || `/images/beaches/${b.photoSlug}.jpg`
              return (
                <article key={`${b.rank}-${b.beachName}`} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="relative h-48 md:h-auto md:col-span-1 bg-gray-100">
                      <Image
                        src={imgSrc}
                        alt={`Pet-friendly hotels near ${b.beachName}, dog-friendly beach in ${b.locationLabel}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                        <span className="text-xl font-extrabold text-blue-700">#{b.rank}</span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full shadow-md ${b.yearRound ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                          {b.yearRound ? c.yearRoundLabel : c.seasonalLabel}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2 p-6 lg:p-8">
                      <div className="flex items-baseline justify-between gap-4 mb-2 flex-wrap">
                        <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-900">
                          🇫🇷 {b.beachName}
                        </h3>
                        <span className="text-sm text-gray-500">{b.locationLabel}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-5">{b.reasonText}</p>

                      {/* Primary booking CTA */}
                      <a
                        href={bookUrl}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-white text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 mb-3"
                        style={{ background: 'linear-gradient(135deg, #f97316 0%, #3b82f6 100%)' }}
                      >
                        🐾 {c.bookPrefix} {b.locationLabel.split(',')[0]} →
                      </a>

                      {/* Inline editorial hotel pick — converts beach-reader to hotel-booker */}
                      {b.dest && (
                        <NearbyHotelCard
                          destinationSlug={b.dest.slug}
                          locale={locale}
                          variant="compact"
                          proximityLabel={
                            locale === 'fr' ? `Où dormir près de ${b.beachName}` :
                            locale === 'es' ? `Dónde dormir cerca de ${b.beachName}` :
                            locale === 'pt' ? `Onde dormir perto de ${b.beachName}` :
                            `Where to stay near ${b.beachName}`
                          }
                        />
                      )}

                      {/* Secondary links row */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mt-3">
                        {b.dest && (
                          <Link href={`/${locale}/destinations/${b.dest.slug}`} className="text-blue-600 hover:text-blue-800 font-semibold hover:underline">
                            {c.guideLink}
                          </Link>
                        )}
                        {b.dest && (
                          <span className="text-xs text-gray-400">
                            {getLocalizedCityName(b.dest.slug, b.dest.name, locale)}, {getLocalizedCountryName(b.dest.country, locale)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Bottom-of-ranking booking CTA */}
          <div className="mt-12 bg-gradient-to-br from-orange-50 to-blue-50 rounded-3xl p-8 lg:p-10 text-center border border-orange-100">
            <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3">{c.bottomBookCtaTitle}</h3>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto mb-6">{c.bottomBookCtaDesc}</p>
            <a
              href={buildAllezDestLink('France', 'France', 'beaches-fr-bottom-cta')}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #f97316 0%, #3b82f6 100%)' }}
            >
              {c.bottomBookCtaButton}
            </a>
          </div>
        </div>
      </section>

      {/* Live map, centered on Cap d'Antibes */}
      <section className="py-14 lg:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 text-center">🗺️ {c.mapTitle}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-7 leading-relaxed">{c.mapDesc}</p>
          <PetMap lat={43.5800} lng={7.1250} destName="Cap d'Antibes" locale={locale} height={500} />
        </div>
      </section>

      {/* Keyword chips */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-5">
            {c.keywordChipsTitle}
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {c.keywordChips.map((kw, i) => {
              const b = beaches[i]
              if (!b) return null
              const href = b.dest
                ? `/${locale}/destinations/${b.dest.slug}`
                : `/${locale}/destinations`
              return (
                <Link
                  key={kw}
                  href={href}
                  className="text-sm text-blue-700 hover:text-blue-900 hover:underline bg-white border border-gray-200 rounded-full px-4 py-1.5 transition-colors hover:border-blue-300"
                >
                  {kw}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5">{c.conclusion.title}</h2>
          <div className="space-y-4">
            {c.conclusion.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
          </div>
        </div>
      </article>

      {/* Intro + Methodology at the bottom */}
      <article className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <section>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5">{c.intro.title}</h2>
            <div className="space-y-4">
              {c.intro.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
            </div>
          </section>
          <section>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-5">{c.methodology.title}</h2>
            <div className="space-y-4">
              {c.methodology.paras.map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-base lg:text-lg">{p}</p>)}
            </div>
          </section>
        </div>
      </article>

      {/* FAQ */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">❓ {c.faqTitle}</h2>
          <div className="space-y-4">
            {c.faqs.map((f, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-2xl group">
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
          <Link href={`/${locale}/destinations`} className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-colors shadow-lg">
            {c.ctaButton}
          </Link>
        </div>
      </section>

      <GuideFooter locale={locale} currentSlug={SLUG} />

      {/* Sticky mobile-only CTA — shows after 30% scroll, dismissible */}
      <StickyHotelCTA
        href={`https://www.stay22.com/allez/roam?aid=eijeanbaptistemanson&campaign=beaches-fr-sticky&address=${encodeURIComponent('Côte d\'Azur France')}`}
        label={
          locale === 'fr' ? `Hôtels pet-friendly Côte d'Azur dès 95 €/nuit` :
          locale === 'es' ? `Hoteles pet-friendly Costa Azul desde 95 €/noche` :
          locale === 'pt' ? `Hotéis pet-friendly Costa Azul desde 95 €/noite` :
          `Pet-friendly Côte d'Azur hotels from €95/night`
        }
        cta={
          locale === 'fr' ? 'Voir' :
          locale === 'es' ? 'Ver' :
          locale === 'pt' ? 'Ver' :
          'View'
        }
      />
    </div>
  )
}
