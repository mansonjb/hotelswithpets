import Link from 'next/link'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL, buildAllezDestLink } from '@/lib/site'
import StickyHotelCTA from '@/components/StickyHotelCTA'
import { GuideFooter } from '../_components/GuideFooter'

const SLUG = 'summer-festivals-dog-europe-2026'
const CAMPAIGN_BASE = 'festivals-2026'

const STICKY_LABELS: Record<string, { label: string; cta: string }> = {
  en: { label: 'Festival city pet-friendly hotels', cta: 'See hotels' },
  fr: { label: 'Hotels pet-friendly villes de festival', cta: 'Voir les hotels' },
  es: { label: 'Hoteles para mascotas en ciudades de festival', cta: 'Ver hoteles' },
  pt: { label: 'Hoteis pet-friendly em cidades de festival', cta: 'Ver hoteis' },
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
    en: `Summer Festivals in Europe with Your Dog: 8 Festival Cities with Pet-Friendly Hotels (2026)`,
    fr: `Festivals d'ete en Europe avec son chien : 8 villes festivalières avec hotels pet-friendly (2026)`,
    es: `Festivales de verano en Europa con tu perro: 8 ciudades con hoteles para mascotas (2026)`,
    pt: `Festivais de verao na Europa com o seu cao: 8 cidades com hoteis pet-friendly (2026)`,
  }
  const descriptions: Record<string, string> = {
    en: `Eight European festival cities in July-August 2026 where your dog can thrive alongside the programme. Bayreuth, Perugia, Spoleto, Orange, Colmar, Sopot, Parnu and Bregenz, with verified pet-friendly hotels near the festival venues.`,
    fr: `Huit villes de festival en Europe en juillet-aout 2026 ou votre chien peut profiter du programme. Bayreuth, Pérouse, Spolète, Orange, Colmar, Sopot, Parnu et Bregenz, avec hotels pet-friendly verifies a proximite des lieux de festival.`,
    es: `Ocho ciudades de festival en Europa en julio-agosto 2026 donde tu perro puede disfrutar del programa. Bayreuth, Perugia, Spoleto, Orange, Colmar, Sopot, Parnu y Bregenz, con hoteles para mascotas verificados cerca de los recintos.`,
    pt: `Oito cidades de festival na Europa em julho-agosto 2026 onde o seu cao pode desfrutar do programa. Bayreuth, Perugia, Spoleto, Orange, Colmar, Sopot, Parnu e Bregenz, com hoteis pet-friendly verificados perto dos recintos.`,
  }
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
      url: `${SITE_URL}/${locale}/guides/${SLUG}`,
      siteName: 'HotelsWithPets.com',
    },
  }
}

type Pick = {
  slug: string
  name: string
  country: string
  destPath: string
  summerTemp: string
  festivalNote: string
  whyEn: string
  whyFr: string
  whyEs: string
  whyPt: string
  hotelName: string
  hotelEn: string
  hotelFr: string
  hotelEs: string
  hotelPt: string
}

const PICKS: Pick[] = [
  {
    slug: 'bayreuth',
    name: 'Bayreuth',
    country: 'Germany',
    destPath: '/destinations/bayreuth',
    summerTemp: '24°C',
    festivalNote: 'Wagner Festspiele · 25 Jul - 28 Aug',
    whyEn: `Bayreuth hosts the most prestigious opera festival in the world every summer: the Wagner Festspiele in the Festspielhaus on the green hill above town. Dogs obviously cannot attend the performances inside, but the Hofgarten park directly below the Festspielhaus is a large leash-welcome urban park perfect for morning walks while your travel companion attends the 5-hour operas. The town's Richard Wagner Museum has a dog-tolerant outer garden, the Eremitage baroque park 3 km east allows leashed dogs on all outer paths, and the biergarten culture of Franconia (the region) is the most dog-tolerant in Germany. The festival runs late July to late August.`,
    whyFr: `Bayreuth accueille le festival d'opera le plus prestigieux du monde chaque ete : le Wagner Festspiele au Festspielhaus sur la colline verte dominant la ville. Les chiens ne peuvent evidemment pas assister aux representations a l'interieur, mais le parc Hofgarten directement en dessous du Festspielhaus est un grand parc urbain ou les chiens en laisse sont bienvenus, parfait pour les promenades matinales pendant que votre compagnon de voyage assiste aux operas de 5 heures. Le musee Richard Wagner de la ville a un jardin exterieur tolerant aux chiens, le parc baroque Eremitage a 3 km a l'est autorise les chiens en laisse sur tous les sentiers exterieurs, et la culture biergarten de Franconie (la region) est la plus tolerante aux chiens d'Allemagne.`,
    whyEs: `Bayreuth acoge el festival de opera mas prestigioso del mundo cada verano: el Wagner Festspiele en el Festspielhaus sobre la colina verde que domina la ciudad. Los perros obviamente no pueden asistir a las actuaciones en el interior, pero el parque Hofgarten directamente debajo del Festspielhaus es un gran parque urbano donde los perros con correa son bienvenidos, perfecto para paseos matinales mientras tu companero de viaje asiste a las operas de 5 horas. El Museo Richard Wagner tiene un jardin exterior tolerante con perros, el parque barroco Eremitage a 3 km al este permite perros con correa en todos los senderos exteriores, y la cultura biergarten de Franconia (la region) es la mas tolerante con perros de Alemania.`,
    whyPt: `Bayreuth acolhe o festival de opera mais prestigioso do mundo todos os veraos: o Wagner Festspiele no Festspielhaus na colina verde acima da cidade. Os caes obviamente nao podem assistir as representacoes no interior, mas o parque Hofgarten diretamente abaixo do Festspielhaus e um grande parque urbano onde caes a trela sao bem-vindos, perfeito para passeios matinais enquanto o seu companheiro de viagem assiste as operas de 5 horas. O Museu Richard Wagner tem um jardim exterior tolerante com caes, o parque barroco Eremitage a 3 km a leste permite caes a trela em todos os trilhos exteriores, e a cultura biergarten da Franconia (a regiao) e a mais tolerante com caes da Alemanha.`,
    hotelName: 'Hotel Goldener Anker',
    hotelEn: `Hotel Goldener Anker - historic 4-star preferred by festival guests, dogs accepted at moderate fee, walking distance to the Festspielhaus. The hotel has hosted festival-goers since the 19th century and understands that a Bayreuth trip often involves two very different programmes: opera inside, dog walks outside.`,
    hotelFr: `Hotel Goldener Anker - 4 etoiles historique favori des festivaliers, chiens acceptes (supplement modere), a distance a pied du Festspielhaus. L'hotel accueille des festivaliers depuis le XIXe siecle et comprend qu'un sejour a Bayreuth implique souvent deux programmes tres differents : opera a l'interieur, promenades canines a l'exterieur.`,
    hotelEs: `Hotel Goldener Anker - 4 estrellas historico favorito de los festivaleros, perros admitidos (suplemento moderado), a distancia a pie del Festspielhaus. El hotel ha acogido a asistentes al festival desde el siglo XIX y entiende que un viaje a Bayreuth a menudo implica dos programas muy diferentes: opera dentro, paseos con el perro fuera.`,
    hotelPt: `Hotel Goldener Anker - 4 estrelas historico favorito dos frequentadores do festival, caes aceites (taxa moderada), a distancia a pe do Festspielhaus. O hotel tem recebido frequentadores do festival desde o seculo XIX e compreende que uma viagem a Bayreuth frequentemente implica dois programas muito diferentes: opera dentro, passeios com o cao fora.`,
  },
  {
    slug: 'perugia',
    name: 'Perugia',
    country: 'Italy',
    destPath: '/destinations/perugia',
    summerTemp: '28°C',
    festivalNote: 'Umbria Jazz · 11-20 Jul 2026',
    whyEn: `Umbria Jazz is one of Europe's largest jazz festivals, held in Perugia's hilltop medieval centre every July for 10 days. The outdoor stages in Piazza IV Novembre and the Giardini Carducci park welcome dogs at the free concerts (the ticketed tent concerts do not, but there are dozens of free outdoor performances). Perugia's escalator system connects the lower parking to the historic centre and accepts leashed dogs. The Corso Vannucci pedestrian main street is lined with cafe terraces that tolerate dogs. At 28°C in July, the hilltop Umbrian air is cooler than the valley below.`,
    whyFr: `Umbria Jazz est l'un des plus grands festivals de jazz d'Europe, tenu dans le centre medieval perche de Pérouse chaque juillet pendant 10 jours. Les scenes exterieures de la Piazza IV Novembre et du parc Giardini Carducci accueillent les chiens aux concerts gratuits (les concerts sous tente payants non, mais il y a des dizaines de representations gratuites en plein air). Le systeme d'escaliers mecaniques de Pérouse connecte le parking inferieur au centre historique et accepte les chiens en laisse. Le Corso Vannucci, rue pietonniereprincipale, est bordee de terrasses de cafes qui tolerent les chiens.`,
    whyEs: `Umbria Jazz es uno de los mayores festivales de jazz de Europa, celebrado en el centro medieval encaramado de Perugia cada julio durante 10 dias. Los escenarios al aire libre en la Piazza IV Novembre y el parque Giardini Carducci acogen perros en los conciertos gratuitos (las carpas de pago no, pero hay decenas de actuaciones gratuitas al aire libre). El sistema de escaleras mecanicas de Perugia conecta el aparcamiento inferior con el centro historico y admite perros con correa. El Corso Vannucci, calle peatonal principal, esta bordeado de terrazas de cafes que toleran perros.`,
    whyPt: `Umbria Jazz e um dos maiores festivais de jazz da Europa, realizado no centro medieval situado no alto de Perugia todos os julhos durante 10 dias. Os palcos ao ar livre na Piazza IV Novembre e no parque Giardini Carducci acolhem caes nos concertos gratuitos (as tendas com bilhetes nao, mas ha dezenas de espetaculos gratuitos ao ar livre). O sistema de escadas rolantes de Perugia liga o estacionamento inferior ao centro historico e aceita caes a trela. O Corso Vannucci, rua pedonal principal, e ladeado de esplanadas de cafes que toleram caes.`,
    hotelName: 'Sina Brufani',
    hotelEn: `Sina Brufani - 5-star on the main corso, pets welcome at moderate fee, terrace overlooking the Umbria valley. During Umbria Jazz, the hotel is the preferred choice of jazz musicians and their entourages: the terrace is one of the best listening spots in the city for the outdoor stages on the piazza below.`,
    hotelFr: `Sina Brufani - 5 etoiles sur le corso principal, animaux acceptes (supplement modere), terrasse dominant la vallee de l'Ombrie. Pendant Umbria Jazz, l'hotel est le choix prefere des musiciens de jazz et de leurs equipes : la terrasse est l'un des meilleurs spots d'ecoute de la ville pour les scenes exterieures sur la piazza en dessous.`,
    hotelEs: `Sina Brufani - 5 estrellas en el corso principal, mascotas admitidas (suplemento moderado), terraza con vistas al valle de Umbria. Durante Umbria Jazz, el hotel es la opcion preferida de los musicos de jazz y sus sequitos: la terraza es uno de los mejores puntos de escucha de la ciudad para los escenarios al aire libre en la piazza de abajo.`,
    hotelPt: `Sina Brufani - 5 estrelas no corso principal, animais de estimacao aceites (taxa moderada), esplanada com vista para o vale da Umbria. Durante o Umbria Jazz, o hotel e a escolha preferida dos musicos de jazz e suas comitivas: a esplanada e um dos melhores pontos de escuta da cidade para os palcos ao ar livre na praca abaixo.`,
  },
  {
    slug: 'spoleto',
    name: 'Spoleto',
    country: 'Italy',
    destPath: '/destinations/spoleto',
    summerTemp: '28°C',
    festivalNote: 'Festival dei Due Mondi · late Jun - mid Jul',
    whyEn: `The Festival dei Due Mondi (Two Worlds Festival) is Italy's most prestigious performing arts festival, combining theatre, opera, dance and concerts across Spoleto's Teatro Caio Melisso and outdoor venues from late June to mid-July. The Rocca Albornoziana fortress has open gardens where leashed dogs are tolerated, the 1st-century Roman amphitheatre exterior walk is completely dog-accessible, and the shaded Passeggiata del Giro trail circling the medieval walls is ideal for morning dog walks away from festival crowds.`,
    whyFr: `Le Festival dei Due Mondi (Festival des Deux Mondes) est le festival des arts du spectacle le plus prestigieux d'Italie, combinant theatre, opera, danse et concerts dans le Teatro Caio Melisso de Spolète et des lieux exterieurs de fin juin a mi-juillet. La forteresse Rocca Albornoziana a des jardins ouverts ou les chiens en laisse sont toleres, la promenade exterieure de l'amphitheatre romain du 1er siecle est entierement accessible aux chiens, et le sentier ombrage Passeggiata del Giro faisant le tour des remparts medievaux est ideal pour les promenades matinales loin des foules du festival.`,
    whyEs: `El Festival dei Due Mondi (Festival de los Dos Mundos) es el festival de artes escenicas mas prestigioso de Italia, combinando teatro, opera, danza y conciertos en el Teatro Caio Melisso de Spoleto y recintos al aire libre desde finales de junio hasta mediados de julio. La fortaleza Rocca Albornoziana tiene jardines abiertos donde se toleran los perros con correa, el paseo exterior del anfiteatro romano del siglo I es completamente accesible con perros, y el sombreado sendero Passeggiata del Giro que rodea las murallas medievales es ideal para paseos matinales lejos de las multitudes del festival.`,
    whyPt: `O Festival dei Due Mondi (Festival dos Dois Mundos) e o festival de artes performativas mais prestigioso de Italia, combinando teatro, opera, danca e concertos no Teatro Caio Melisso de Spoleto e recintos ao ar livre de finais de junho a meados de julho. A fortaleza Rocca Albornoziana tem jardins abertos onde caes a trela sao tolerados, o passeio exterior do anfiteatro romano do seculo I e completamente acessivel com caes, e o sombreado trilho Passeggiata del Giro que contorna as muralhas medievais e ideal para passeios matinais longe das multidoes do festival.`,
    hotelName: 'Hotel Clitunno',
    hotelEn: `Hotel Clitunno - 4-star in the historic centre, dogs welcome at modest fee. The hotel is a converted 16th-century palazzo a short walk from the Teatro Caio Melisso. The small inner courtyard is quiet enough for a dog to rest between evening performances and morning walks on the Passeggiata.`,
    hotelFr: `Hotel Clitunno - 4 etoiles en centre historique, chiens acceptes (supplement modeste). L'hotel est un palazzo du XVIe siecle reconverti a quelques pas du Teatro Caio Melisso. La petite cour interieure est suffisamment calme pour qu'un chien se repose entre les representations du soir et les promenades matinales sur la Passeggiata.`,
    hotelEs: `Hotel Clitunno - 4 estrellas en el centro historico, perros admitidos (suplemento modesto). El hotel es un palazzo del siglo XVI reconvertido a pocos pasos del Teatro Caio Melisso. El pequeno patio interior es suficientemente tranquilo para que un perro descanse entre las actuaciones nocturnas y los paseos matinales por la Passeggiata.`,
    hotelPt: `Hotel Clitunno - 4 estrelas no centro historico, caes aceites (taxa modesta). O hotel e um palazzo do seculo XVI reconvertido a poucos passos do Teatro Caio Melisso. O pequeno pateo interior e suficientemente calmo para um cao descansar entre as representacoes nocturnas e os passeios matinais na Passeggiata.`,
  },
  {
    slug: 'orange',
    name: 'Orange',
    country: 'France',
    destPath: '/destinations/orange',
    summerTemp: '30°C',
    festivalNote: `Chorégies d'Orange · Jul - Aug`,
    whyEn: `The Chorégies d'Orange are France's most spectacular open-air opera festival, held in the 2000-year-old Roman theatre every July and August. Dogs are not permitted inside the Antique Theatre during performances, but the surrounding esplanade is a wide open space where leashed dogs can wait during the intervals. The Arc de Triomphe park at the north end of the city and the Paul Cézanne garden are both dog-welcome green spaces. Orange sits in Provence where lavender is in bloom in July (peak season) and restaurant terraces allow dogs routinely.`,
    whyFr: `Les Chorégies d'Orange sont le festival d'opera en plein air le plus spectaculaire de France, tenu dans le theatre romain vieux de 2000 ans chaque juillet et aout. Les chiens ne sont pas autorises a l'interieur du Theatre Antique pendant les representations, mais l'esplanade environnante est un grand espace ouvert ou les chiens en laisse peuvent attendre pendant les entr'actes. Le parc de l'Arc de Triomphe au nord de la ville et le jardin Paul Cézanne sont deux espaces verts accueillants pour les chiens. Orange est en Provence ou la lavande est en fleur en juillet (pleine saison) et les terrasses de restaurants accueillent les chiens routinièrement.`,
    whyEs: `Las Chorégies d'Orange son el festival de opera al aire libre mas espectacular de Francia, celebrado en el teatro romano de 2000 anos de antiguedad cada julio y agosto. Los perros no estan permitidos dentro del Teatro Antiguo durante las actuaciones, pero la explanada circundante es un amplio espacio abierto donde los perros con correa pueden esperar durante los descansos. El parque del Arc de Triomphe en el extremo norte de la ciudad y el jardin Paul Cézanne son espacios verdes que acogen perros. Orange esta en Provenza, donde la lavanda esta en flor en julio (temporada alta) y las terrazas de restaurantes admiten perros routinariamente.`,
    whyPt: `As Chorégies d'Orange sao o festival de opera ao ar livre mais espetacular de Franca, realizado no teatro romano de 2000 anos todos os julhos e agostos. Os caes nao sao permitidos dentro do Teatro Antigo durante as representacoes, mas a esplandada envolvente e um amplo espaco aberto onde caes a trela podem esperar durante os intervalos. O parque do Arco de Triunfo no extremo norte da cidade e o jardim Paul Cézanne sao espacos verdes que acolhem caes. Orange fica na Provenca onde a lavanda esta em flor em julho (epoca alta) e as esplanadas de restaurantes aceitam caes routineiramente.`,
    hotelName: 'Hotel Arene',
    hotelEn: `Hotel Arene - 3-star facing the Roman theatre, dogs accepted at modest fee. The hotel's position directly on the esplanade makes it the most practical festival base: the dog can be settled in the room before the 3-hour performance begins, and the esplanade walk takes under 5 minutes from the front door.`,
    hotelFr: `Hotel Arene - 3 etoiles face au theatre romain, chiens acceptes (supplement modeste). La position de l'hotel directement sur l'esplanade en fait la base de festival la plus pratique : le chien peut etre installe dans la chambre avant le debut de la representation de 3 heures, et la promenade sur l'esplanade prend moins de 5 minutes depuis la porte d'entree.`,
    hotelEs: `Hotel Arene - 3 estrellas frente al teatro romano, perros admitidos (suplemento modesto). La posicion del hotel directamente en la explanada lo convierte en la base de festival mas practica: el perro puede quedar acomodado en la habitacion antes de que comience la actuacion de 3 horas, y el paseo por la explanada toma menos de 5 minutos desde la puerta.`,
    hotelPt: `Hotel Arene - 3 estrelas em frente ao teatro romano, caes aceites (taxa modesta). A posicao do hotel diretamente na esplandada faz dele a base de festival mais pratica: o cao pode ficar acomodado no quarto antes do inicio da representacao de 3 horas, e o passeio na esplandada demora menos de 5 minutos a partir da porta da entrada.`,
  },
  {
    slug: 'colmar',
    name: 'Colmar',
    country: 'France',
    destPath: '/destinations/colmar',
    summerTemp: '26°C',
    festivalNote: 'Festival de Colmar · 5-14 Jul 2026',
    whyEn: `Colmar's July classical music festival brings international orchestras to the Eglise Saint-Matthieu and the Dominican convent (no dogs in concert venues), but the Petite Venise canal district and the Place de l'Ancienne Douane are among the most beautiful outdoor pedestrian spaces in France and are dog-accessible all day. The surrounding Alsatian wine route villages (Riquewihr, Ribeauville, Kaysersberg) begin 15 min by car and have vineyard walks that accept leashed dogs freely. The festival's evening concerts spill onto the half-timbered streets and the dog walk around the canals is genuinely magical at dusk.`,
    whyFr: `Le festival de musique classique de Colmar en juillet amene des orchestres internationaux a l'Eglise Saint-Matthieu et au couvent dominicain (sans chiens dans les lieux de concert), mais le quartier des canaux de la Petite Venise et la Place de l'Ancienne Douane comptent parmi les plus beaux espaces pietons exterieurs de France et sont accessibles aux chiens toute la journee. Les villages de la route des vins alsacienne (Riquewihr, Ribeauville, Kaysersberg) commencent a 15 min en voiture et ont des promenades dans les vignes qui acceptent les chiens en laisse librement.`,
    whyEs: `El festival de musica clasica de Colmar en julio trae orquestas internacionales a la Eglise Saint-Matthieu y al convento dominico (sin perros en los recintos de conciertos), pero el barrio de los canales de la Petite Venise y la Place de l'Ancienne Douane son de los espacios peatonales exteriores mas bonitos de Francia y son accesibles con perros todo el dia. Los pueblos de la ruta del vino alsaciana (Riquewihr, Ribeauville, Kaysersberg) comienzan a 15 min en coche y tienen paseos por los vinedos que admiten perros con correa libremente.`,
    whyPt: `O festival de musica classica de Colmar em julho traz orquestras internacionais a Eglise Saint-Matthieu e ao convento dominicano (sem caes nos recintos de concertos), mas o bairro dos canais da Petite Venise e a Place de l'Ancienne Douane estao entre os mais belos espacos pedonais exteriores de Franca e sao acessiveis com caes durante todo o dia. As aldeias da rota dos vinhos alsaciana (Riquewihr, Ribeauville, Kaysersberg) comecam a 15 min de carro e tem passeios pelos vinhedos que aceitam caes a trela livremente.`,
    hotelName: 'La Maison des Tetes',
    hotelEn: `La Maison des Tetes - 5-star Renaissance facade hotel, dogs welcome at modest fee, central. The building dates from 1609 and the interior courtyard is a peaceful retreat from the festival crowds in the streets. The canal district of Petite Venise is 4 minutes on foot.`,
    hotelFr: `La Maison des Tetes - hotel 5 etoiles a facade Renaissance, chiens acceptes (supplement modeste), central. Le batiment date de 1609 et la cour interieure est un refuge paisible de la foule du festival dans les rues. Le quartier des canaux de la Petite Venise est a 4 minutes a pied.`,
    hotelEs: `La Maison des Tetes - hotel 5 estrellas de fachada renacentista, perros admitidos (suplemento modesto), central. El edificio data de 1609 y el patio interior es un refugio tranquilo de las multitudes del festival en las calles. El barrio de los canales de la Petite Venise esta a 4 minutos a pie.`,
    hotelPt: `La Maison des Tetes - hotel 5 estrelas de fachada renascentista, caes aceites (taxa modesta), central. O edificio data de 1609 e o patio interior e um refugio tranquilo das multidoes do festival nas ruas. O bairro dos canais da Petite Venise fica a 4 minutos a pe.`,
  },
  {
    slug: 'sopot',
    name: 'Sopot',
    country: 'Poland',
    destPath: '/destinations/sopot',
    summerTemp: '22°C',
    festivalNote: 'Sopot International Song Contest · Aug',
    whyEn: `Sopot is the Baltic Riviera's jewel: a Belle Epoque resort town with Europe's longest wooden pier (512 metres, dogs allowed outside bathing hours), a car-free Monte Cassino pedestrian boulevard, and the famous Forest Opera amphitheatre (Lesna Opera) where dogs wait outside on the grassy hillside during shows. The beach has a dedicated dog zone at the northern end. August sees the International Song Contest (similar to Eurovision format) which fills the hotels but the town handles it well. Sopot is built for summer tourism.`,
    whyFr: `Sopot est le joyau de la Riviera baltique : une station Belle Epoque avec la plus longue jetee en bois d'Europe (512 metres, chiens autorises en dehors des heures de baignade), un boulevard pietomnier sans voiture Monte Cassino, et le celebre amphitheatre Forest Opera (Lesna Opera) ou les chiens attendent a l'exterieur sur le versant herbeux pendant les spectacles. La plage a une zone canine dediee a l'extremite nord. En aout se tient l'International Song Contest (format similaire a l'Eurovision) qui remplit les hotels, mais la ville gere bien l'affluence. Sopot est construite pour le tourisme estival.`,
    whyEs: `Sopot es la joya de la Riviera baltica: una ciudad balneario Belle Epoque con el muelle de madera mas largo de Europa (512 metros, perros permitidos fuera de las horas de bano), un bulevar peatonal sin coches Monte Cassino, y el famoso anfiteatro Forest Opera (Lesna Opera) donde los perros esperan fuera en la ladera herbosa durante los espectaculos. La playa tiene una zona canina dedicada en el extremo norte. En agosto se celebra el International Song Contest (formato similar a Eurovision) que llena los hoteles pero la ciudad lo gestiona bien. Sopot esta construida para el turismo veraniego.`,
    whyPt: `Sopot e a joia da Riviera baltica: uma cidade balneario Belle Epoque com o cais de madeira mais longo da Europa (512 metros, caes permitidos fora das horas de banho), uma avenida pedonal sem carros Monte Cassino, e o famoso anfiteatro Forest Opera (Lesna Opera) onde os caes esperam do lado de fora na encosta herbosa durante os espetaculos. A praia tem uma zona canina dedicada na extremidade norte. Em agosto realiza-se o International Song Contest (formato semelhante ao Eurovision) que enche os hoteis, mas a cidade gere bem o afluxo. Sopot foi construida para o turismo estival.`,
    hotelName: 'Sofitel Grand Sopot',
    hotelEn: `Sofitel Grand Sopot - 5-star Belle Epoque landmark, pets welcome at moderate fee, 2 min from the pier. The hotel has hosted the most celebrated artists who have performed at the Sopot festival for decades. The garden faces the Baltic and the pier walk starts at the garden gate.`,
    hotelFr: `Sofitel Grand Sopot - 5 etoiles Belle Epoque emblematique, animaux acceptes (supplement modere), 2 min de la jetee. L'hotel a accueilli les artistes les plus celebres qui se sont produits au festival de Sopot pendant des decennies. Le jardin fait face a la Baltique et la promenade sur la jetee commence a la porte du jardin.`,
    hotelEs: `Sofitel Grand Sopot - 5 estrellas Belle Epoque emblematico, mascotas admitidas (suplemento moderado), 2 min del muelle. El hotel ha acogido a los artistas mas celebres que han actuado en el festival de Sopot durante decadas. El jardin da al Baltico y el paseo por el muelle comienza en la puerta del jardin.`,
    hotelPt: `Sofitel Grand Sopot - 5 estrelas Belle Epoque emblematico, animais de estimacao aceites (taxa moderada), 2 min do cais. O hotel acolheu os artistas mais celebres que atuaram no festival de Sopot durante decadas. O jardim da para o Baltico e o passeio no cais comeca na porta do jardim.`,
  },
  {
    slug: 'parnu',
    name: 'Parnu',
    country: 'Estonia',
    destPath: '/destinations/parnu',
    summerTemp: '20°C',
    festivalNote: 'Estonian summer capital · beach + music Jul-Aug',
    whyEn: `Parnu is Estonia's unofficial summer capital. Estonians call it "our Riviera" and it hosts a summer-long calendar of outdoor concerts, film screenings and beach markets throughout July and August. Temperatures stay under 22°C (Baltic breeze), the Parnu beach has a designated dog zone at the southern end, the Rannaniidu meadow park allows off-leash play, and Estonian culture is extremely dog-tolerant at restaurant terraces. The town is calm enough that you can walk the entire centre with a dog in 45 minutes.`,
    whyFr: `Parnu est la capitale estivale non officielle de l'Estonie. Les Estoniens l'appellent "notre Riviera" et elle accueille un calendrier tout l'ete de concerts en plein air, projections de films et marches de plage tout au long de juillet et aout. Les temperatures restent sous 22°C (brise baltique), la plage de Parnu a une zone canine designee a l'extremite sud, le parc-prairie Rannaniidu permet le jeu sans laisse, et la culture estonienne est extremement tolerante aux chiens dans les terrasses de restaurants. La ville est suffisamment calme pour que vous puissiez parcourir tout le centre avec un chien en 45 minutes.`,
    whyEs: `Parnu es la capital veraniega no oficial de Estonia. Los estonios la llaman "nuestra Riviera" y acoge un calendario de todo el verano de conciertos al aire libre, proyecciones de peliculas y mercados de playa a lo largo de julio y agosto. Las temperaturas se mantienen bajo 22°C (brisa baltica), la playa de Parnu tiene una zona canina designada en el extremo sur, el parque-pradera Rannaniidu permite el juego sin correa, y la cultura estonia es extremadamente tolerante con perros en las terrazas de restaurantes. La ciudad es suficientemente tranquila para que puedas recorrer todo el centro con un perro en 45 minutos.`,
    whyPt: `Parnu e a capital estival nao oficial da Estonia. Os estonianos chamam-lhe "a nossa Riviera" e acolhe um calendario de todo o verao de concertos ao ar livre, projeccoes de filmes e mercados de praia ao longo de julho e agosto. As temperaturas ficam abaixo dos 22°C (brisa baltica), a praia de Parnu tem uma zona canina designada na extremidade sul, o parque-pradaria Rannaniidu permite o jogo sem trela, e a cultura estonia e extremamente tolerante com caes nas esplanadas de restaurantes. A cidade e suficientemente calma para percorrer todo o centro com um cao em 45 minutos.`,
    hotelName: 'Villa Wesset',
    hotelEn: `Villa Wesset - boutique hotel in the spa quarter, dogs welcome at modest fee, private garden. The spa quarter of Parnu is the quietest and most residential part of the city, lined with wooden villas from the early 20th century. The private garden is perfect for a dog that wants to decompress after a car journey.`,
    hotelFr: `Villa Wesset - hotel boutique dans le quartier thermal, chiens acceptes (supplement modeste), jardin prive. Le quartier thermal de Parnu est la partie la plus calme et la plus residentielle de la ville, bordee de villas en bois du debut du XXe siecle. Le jardin prive est parfait pour un chien qui veut se detendre apres un trajet en voiture.`,
    hotelEs: `Villa Wesset - hotel boutique en el barrio de los banos, perros admitidos (suplemento modesto), jardin privado. El barrio de los banos de Parnu es la parte mas tranquila y residencial de la ciudad, bordeada de villas de madera de principios del siglo XX. El jardin privado es perfecto para un perro que quiere relajarse despues de un viaje en coche.`,
    hotelPt: `Villa Wesset - hotel boutique no bairro das termas, caes aceites (taxa modesta), jardim privado. O bairro das termas de Parnu e a parte mais calma e residencial da cidade, ladeada de vilas de madeira do inicio do seculo XX. O jardim privado e perfeito para um cao que quer descansar apos uma viagem de carro.`,
  },
  {
    slug: 'bregenz',
    name: 'Bregenz',
    country: 'Austria',
    destPath: '/destinations/bregenz',
    summerTemp: '22°C',
    festivalNote: 'Bregenzer Festspiele · 17 Jul - 18 Aug 2026',
    whyEn: `The Bregenzer Festspiele are one of the world's most visually spectacular opera festivals: the stage is built on Lake Constance itself, seating 7000, and the performances are visible from the lakeside promenade where leashed dogs are welcome to watch (from a distance, with the audio). The lake promenade from Bregenz to Hard is a 4 km flat dog walk with mountain views across to Switzerland and Germany. The Pfander cable car accepts leashed dogs (10 EUR) to reach a 1065m plateau with alpine meadow trails.`,
    whyFr: `Les Bregenzer Festspiele sont l'un des festivals d'opera les plus spectaculaires du monde : la scene est construite sur le lac de Constance lui-meme, avec 7000 places, et les representations sont visibles depuis la promenade du lac ou les chiens en laisse sont bienvenus pour regarder (de loin, avec l'audio). La promenade du lac de Bregenz a Hard est une promenade canine plate de 4 km avec des vues sur les montagnes vers la Suisse et l'Allemagne. Le teleferique du Pfander accepte les chiens en laisse (10 EUR) pour acceder a un plateau de 1065m avec des sentiers de prairie alpine.`,
    whyEs: `Los Bregenzer Festspiele son uno de los festivales de opera visualmente mas espectaculares del mundo: el escenario esta construido sobre el lago Constanza mismo, con 7000 butacas, y las actuaciones son visibles desde el paseo lacustre donde los perros con correa son bienvenidos para ver (desde lejos, con el audio). El paseo lacustre de Bregenz a Hard es un paseo canino llano de 4 km con vistas a las montanas hacia Suiza y Alemania. El teleferico del Pfander admite perros con correa (10 EUR) para acceder a una meseta de 1065m con senderos de prado alpino.`,
    whyPt: `Os Bregenzer Festspiele sao um dos festivais de opera visualmente mais espetaculares do mundo: o palco esta construido sobre o proprio Lago Constanca, com 7000 lugares, e as representacoes sao visiveis a partir do passeio a beira do lago onde caes a trela sao bem-vindos para ver (de longe, com o audio). O passeio a beira do lago de Bregenz a Hard e um passeio canino plano de 4 km com vistas para as montanhas em direcao a Suica e a Alemanha. O telecabine do Pfander aceita caes a trela (10 EUR) para aceder a um planalto de 1065m com trilhos de prado alpino.`,
    hotelName: 'Hotel Schwärzler',
    hotelEn: `Hotel Schwärzler - 4-star festival-season favourite, dogs welcome at moderate fee, 10 min walk to the lake stage. The hotel is the preferred choice of festival regulars who want a quieter location slightly back from the lakeside crowds. The breakfast terrace has a view of the Pfander mountain.`,
    hotelFr: `Hotel Schwärzler - 4 etoiles favori de la saison festivaliere, chiens acceptes (supplement modere), 10 min a pied de la scene sur le lac. L'hotel est le choix prefere des habitues du festival qui veulent un emplacement plus calme legerement a l'ecart des foules du lac. La terrasse du petit-dejeuner a vue sur la montagne du Pfander.`,
    hotelEs: `Hotel Schwärzler - 4 estrellas favorito de la temporada festivalera, perros admitidos (suplemento moderado), 10 min andando hasta el escenario del lago. El hotel es la opcion preferida de los habituales del festival que quieren una ubicacion mas tranquila, ligeramente alejada de las multitudes del lago. La terraza del desayuno tiene vista a la montana Pfander.`,
    hotelPt: `Hotel Schwärzler - 4 estrelas favorito da epoca do festival, caes aceites (taxa moderada), 10 min a pe do palco no lago. O hotel e a escolha preferida dos habituais do festival que querem uma localizacao mais calma, ligeiramente afastada das multidoes junto ao lago. A esplanada do pequeno-almoco tem vista para a montanha Pfander.`,
  },
]

const COPY = {
  en: {
    eyebrow: 'FESTIVAL SEASON 2026 · PET TRAVEL EUROPE',
    title: `Summer Festivals in Europe with Your Dog: 8 Festival Cities with Pet-Friendly Hotels (2026)`,
    intro: `Festival summer is the peak of European cultural life in July and August. Dog owners have historically avoided festival cities assuming their dog would be excluded. This guide explains how to attend the festival AND keep your dog happy: outdoor concerts, festival atmosphere in the parks, and cities that come alive at a human pace dogs actually enjoy.`,
    pickHeading: '8 festival cities where dogs thrive alongside the programme',
    whyHere: 'Why here',
    hotelLabel: 'Where to stay',
    seeDestCta: 'Full city guide →',
    hotelCta: 'See availability →',
    summerLabel: 'Summer avg high',
    practicalHeading: 'Festival travel with a dog: practical info',
    practical: [
      {
        h: 'The companion strategy',
        p: `One human attends the performance, one stays with the dog in the park or terrace. Most festival performances are 2-4 hours, the ideal duration for a dog nap in a hotel or city park. For Bayreuth operas (5 hours), plan a longer walk beforehand so the dog is settled before you leave. The companion strategy works across all 8 cities in this guide and turns a potential logistics headache into a pleasant parallel programme.`,
      },
      {
        h: 'Booking hotels during festival season',
        p: `Book 3-6 months ahead for Bayreuth (sells out in October for the following summer), 8 weeks ahead for Spoleto and Orange, 4 weeks for Parnu and Sopot. Festival cities impose city-wide peak pricing during the event week. For Bregenz and Colmar, the surrounding villages (Hard and Turckheim respectively) offer quieter alternatives at lower prices with a 15-20 min drive to the venues.`,
      },
      {
        h: 'Festival outdoor concerts vs ticketed venues',
        p: `Many festivals have free outdoor concerts on city squares where dogs are tolerated. Umbria Jazz (Perugia) has free piazza stages, the Bregenz lake promenade is a public space during performances, and the Colmar Petite Venise evening atmosphere extends the festival mood into dog-accessible streets. Check each festival's outdoor programme before booking: these free events are often as musically satisfying as the main ticketed events.`,
      },
      {
        h: 'Heat management at summer festivals',
        p: `Southern festivals (Orange, Perugia, Spoleto) hit 28-30°C in July. Attend evening performances, keep your dog in an air-conditioned hotel room during the hottest afternoon hours (14h-18h), and pre-book a hotel with a garden or shaded terrace. The 7-second paw test applies: press the back of your hand on asphalt for 7 seconds. If you cannot hold it, your dog cannot walk on it. Baltic cities (Parnu, Sopot) stay under 22°C and have no heat management issues.`,
      },
    ],
    faqHeading: 'Frequently asked questions',
    faqs: [
      {
        q: 'Can my dog attend outdoor concerts at these festivals?',
        a: `At free outdoor concerts (Umbria Jazz piazza stages, Bregenz lake promenade) yes. At ticketed venue concerts, no. The companion strategy works: one person attends, dog stays at hotel or city park. Colmar's evening canal-side atmosphere and Sopot's Monte Cassino boulevard are public spaces where a well-behaved leashed dog is entirely normal during festival season.`,
      },
      {
        q: 'Which of these festivals is most dog-friendly overall?',
        a: `Parnu and Sopot. Baltic culture is the most dog-tolerant in Europe, the outdoor festival format is decentralised across the city, and temperatures stay under 22°C so the dog is comfortable all day. Bayreuth is the second best choice for dog companions: the Eremitage park, the Franconian biergarten culture, and the Hofgarten hill walks make it genuinely enjoyable for the non-opera half of the trip.`,
      },
      {
        q: 'Is Bayreuth worth going to if only one of us has tickets?',
        a: `Absolutely. The Eremitage park (a full baroque park with fountains, grottos and outer trails accepting leashed dogs), the town's Franconian biergarten culture (the most dog-tolerant in Germany), and the free access to the Festspielhaus hill gardens make Bayreuth genuinely interesting for the non-opera half of the trip. The Wagner Museum outer garden and the Hofgarten are both within a 10-minute walk from most central hotels.`,
      },
      {
        q: 'What about large dogs at festival city hotels?',
        a: `Festival hotels tend to be boutique and impose weight limits (8-15 kg). Colmar, Sopot and Bregenz are the most flexible for larger breeds: look for 3-star family-run properties or aparthotels which typically have no weight restrictions. In Bayreuth, the Goldener Anker has hosted large dogs for festival guests historically. Always call ahead to confirm the current policy for your dog's weight and breed.`,
      },
    ],
    relatedHeading: 'See also',
  },
  fr: {
    eyebrow: `SAISON DES FESTIVALS 2026 · VOYAGE PET-FRIENDLY EUROPE`,
    title: `Festivals d'ete en Europe avec son chien : 8 villes festivalières avec hotels pet-friendly (2026)`,
    intro: `L'ete festivalier est le point culminant de la vie culturelle europeenne en juillet et aout. Les proprietaires de chiens ont historiquement evite les villes de festival en supposant que leur chien serait exclu. Ce guide explique comment assister au festival ET garder votre chien heureux : concerts en plein air, atmosphere festivaliere dans les parcs, et des villes qui s'animent a un rythme humain que les chiens apprecient vraiment.`,
    pickHeading: `8 villes de festival ou les chiens s'epanouissent aux cotes du programme`,
    whyHere: 'Pourquoi ici',
    hotelLabel: 'Ou dormir',
    seeDestCta: 'Guide complet →',
    hotelCta: 'Voir les disponibilites →',
    summerLabel: 'Max ete',
    practicalHeading: 'Voyage en festival avec un chien : info pratique',
    practical: [
      {
        h: 'La strategie du compagnon',
        p: `Un humain assiste au spectacle, l'autre reste avec le chien dans le parc ou en terrasse. La plupart des representations de festival durent 2 a 4 heures, la duree ideale pour une sieste canine dans un hotel ou un parc urbain. Pour les operas de Bayreuth (5 heures), prevoyer une longue promenade avant pour que le chien soit apaise avant votre depart. La strategie du compagnon fonctionne dans les 8 villes de ce guide et transforme un casse-tete logistique potentiel en un programme parallele agreable.`,
      },
      {
        h: 'Reserver les hotels pendant la saison festivaliere',
        p: `Reserver 3-6 mois a l'avance pour Bayreuth (complet en octobre pour l'ete suivant), 8 semaines a l'avance pour Spolète et Orange, 4 semaines pour Parnu et Sopot. Les villes de festival imposent des prix en pointe a l'echelle de la ville pendant la semaine de l'evenement. Pour Bregenz et Colmar, les villages environnants (Hard et Turckheim respectivement) offrent des alternatives plus calmes a des prix inferieurs avec 15-20 min de route jusqu'aux lieux.`,
      },
      {
        h: 'Concerts en plein air vs lieux payants',
        p: `De nombreux festivals proposent des concerts gratuits en plein air sur les places de la ville ou les chiens sont toleres. Umbria Jazz (Pérouse) a des scenes gratuites sur la piazza, la promenade du lac de Bregenz est un espace public pendant les representations, et l'atmosphere estivale de la Petite Venise de Colmar etend l'ambiance festivaliere dans des rues accessibles aux chiens. Verifier le programme exterieur de chaque festival avant de reserver.`,
      },
      {
        h: 'Gestion de la chaleur aux festivals estivaux',
        p: `Les festivals du sud (Orange, Pérouse, Spolète) atteignent 28-30°C en juillet. Assister aux representations du soir, garder votre chien dans une chambre d'hotel climatisee pendant les heures les plus chaudes de l'apres-midi (14h-18h), et prevoir un hotel avec jardin ou terrasse ombragee. Le test des 7 secondes s'applique : pressez le dos de votre main sur l'asphalte pendant 7 secondes. Si vous ne tenez pas, votre chien non plus. Les villes baltiques (Parnu, Sopot) restent sous 22°C et n'ont aucun probleme de gestion de la chaleur.`,
      },
    ],
    faqHeading: 'Questions frequentes',
    faqs: [
      {
        q: 'Mon chien peut-il assister aux concerts en plein air de ces festivals ?',
        a: `Aux concerts gratuits en plein air (scenes de piazza d'Umbria Jazz, promenade du lac de Bregenz) oui. Aux concerts en lieu payant, non. La strategie du compagnon fonctionne : une personne assiste, le chien reste a l'hotel ou dans le parc de la ville. L'atmosphere canaliere en soiree de Colmar et le boulevard Monte Cassino de Sopot sont des espaces publics ou un chien bien eleve en laisse est tout a fait normal pendant la saison des festivals.`,
      },
      {
        q: 'Lequel de ces festivals est le plus accueillant pour les chiens ?',
        a: `Parnu et Sopot. La culture baltique est la plus tolerante aux chiens d'Europe, le format de festival en plein air est decentralise dans toute la ville, et les temperatures restent sous 22°C pour que le chien soit confortable toute la journee. Bayreuth est le deuxieme meilleur choix pour les compagnons canins : le parc de l'Eremitage, la culture biergarten franconienne et les promenades sur la colline du Hofgarten rendent Bayreuth vraiment agreable pour la moitie non-opera du voyage.`,
      },
      {
        q: `Vaut-il la peine d'aller a Bayreuth si seulement l'un de nous a des billets ?`,
        a: `Absolument. Le parc de l'Eremitage (un parc baroque complet avec fontaines, grottes et sentiers exterieurs acceptant les chiens en laisse), la culture biergarten franconienne de la ville (la plus tolerante aux chiens d'Allemagne), et l'acces gratuit aux jardins de la colline du Festspielhaus rendent Bayreuth vraiment interessante pour la moitie non-opera du voyage. Le jardin exterieur du Musee Wagner et le Hofgarten sont tous deux a moins de 10 minutes a pied de la plupart des hotels du centre.`,
      },
      {
        q: `Qu'en est-il des grands chiens dans les hotels des villes de festival ?`,
        a: `Les hotels des villes de festival ont tendance a etre des boutiques qui imposent des limites de poids (8-15 kg). Colmar, Sopot et Bregenz sont les plus flexibles pour les grandes races : cherchez des proprietes familiales 3 etoiles ou des aparthotels qui n'ont generalement pas de restrictions de poids. A Bayreuth, le Goldener Anker a historiquement accueilli de grands chiens pour les festivaliers. Toujours appeler a l'avance pour confirmer la politique actuelle concernant le poids et la race de votre chien.`,
      },
    ],
    relatedHeading: 'Voir aussi',
  },
  es: {
    eyebrow: `TEMPORADA DE FESTIVALES 2026 · VIAJE PET-FRIENDLY EUROPA`,
    title: `Festivales de verano en Europa con tu perro: 8 ciudades con hoteles para mascotas (2026)`,
    intro: `El verano de los festivales es el punto culminante de la vida cultural europea en julio y agosto. Los duenos de perros han evitado historicamente las ciudades de festival suponiendo que su perro quedaria excluido. Esta guia explica como asistir al festival Y mantener a tu perro feliz: conciertos al aire libre, atmosfera festivalera en los parques, y ciudades que cobran vida a un ritmo humano que los perros realmente disfrutan.`,
    pickHeading: '8 ciudades de festival donde los perros prosperan junto al programa',
    whyHere: 'Por que aqui',
    hotelLabel: 'Donde alojarse',
    seeDestCta: 'Guia completa →',
    hotelCta: 'Ver disponibilidad →',
    summerLabel: 'Max verano',
    practicalHeading: 'Viaje a festivales con perro: info practica',
    practical: [
      {
        h: 'La estrategia del companero',
        p: `Un humano asiste a la actuacion, el otro se queda con el perro en el parque o la terraza. La mayoria de las actuaciones de festival duran 2-4 horas, la duracion ideal para una siesta canina en un hotel o parque urbano. Para las operas de Bayreuth (5 horas), planear un paseo mas largo antes para que el perro este tranquilo antes de irse. La estrategia del companero funciona en las 8 ciudades de esta guia y convierte un potencial dolor de cabeza logistico en un agradable programa paralelo.`,
      },
      {
        h: 'Reservar hoteles durante la temporada de festivales',
        p: `Reservar con 3-6 meses de antelacion para Bayreuth (se agota en octubre para el verano siguiente), 8 semanas para Spoleto y Orange, 4 semanas para Parnu y Sopot. Las ciudades de festival imponen precios de temporada alta a escala de toda la ciudad durante la semana del evento. Para Bregenz y Colmar, los pueblos cercanos (Hard y Turckheim respectivamente) ofrecen alternativas mas tranquilas a menor precio con 15-20 min en coche hasta los recintos.`,
      },
      {
        h: 'Conciertos al aire libre vs recintos de pago',
        p: `Muchos festivales tienen conciertos gratuitos al aire libre en plazas donde se toleran los perros. Umbria Jazz (Perugia) tiene escenarios gratuitos en la piazza, el paseo lacustre de Bregenz es un espacio publico durante las actuaciones, y el ambiente de la Petite Venise de Colmar por la tarde extiende el ambiente festivalero a calles accesibles con perros. Comprobar el programa exterior de cada festival antes de reservar.`,
      },
      {
        h: 'Gestion del calor en festivales de verano',
        p: `Los festivales del sur (Orange, Perugia, Spoleto) alcanzan 28-30°C en julio. Asistir a las actuaciones de la tarde, mantener al perro en una habitacion de hotel con aire acondicionado durante las horas mas calurosas de la tarde (14h-18h), y reservar con antelacion un hotel con jardin o terraza sombreada. El test de los 7 segundos aplica: presiona el dorso de la mano en el asfalto durante 7 segundos. Si no aguantas, tu perro tampoco. Las ciudades balticas (Parnu, Sopot) se mantienen bajo 22°C y no tienen problemas de gestion del calor.`,
      },
    ],
    faqHeading: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Puede mi perro asistir a los conciertos al aire libre de estos festivales?',
        a: `En los conciertos gratuitos al aire libre (escenarios de piazza de Umbria Jazz, paseo lacustre de Bregenz) si. En los conciertos en recintos de pago, no. La estrategia del companero funciona: una persona asiste, el perro se queda en el hotel o parque de la ciudad. La atmosfera canalera vespertina de Colmar y el bulevar Monte Cassino de Sopot son espacios publicos donde un perro bien educado con correa es completamente normal durante la temporada de festivales.`,
      },
      {
        q: '¿Cual de estos festivales es el mas amigable con los perros en general?',
        a: `Parnu y Sopot. La cultura baltica es la mas tolerante con los perros de Europa, el formato de festival al aire libre esta descentralizado por toda la ciudad, y las temperaturas se mantienen bajo 22°C para que el perro este comodo todo el dia. Bayreuth es la segunda mejor opcion para los companeros caninos: el parque Eremitage, la cultura biergarten franconiana y los paseos por la colina Hofgarten hacen que Bayreuth sea genuinamente disfrutable para la mitad no-opera del viaje.`,
      },
      {
        q: '¿Vale la pena ir a Bayreuth si solo uno de nosotros tiene entradas?',
        a: `Absolutamente. El parque Eremitage (un parque barroco completo con fuentes, grutas y senderos exteriores que admiten perros con correa), la cultura biergarten franconiana de la ciudad (la mas tolerante con perros de Alemania), y el acceso gratuito a los jardines de la colina del Festspielhaus hacen que Bayreuth sea genuinamente interesante para la mitad no-opera del viaje. El jardin exterior del Museo Wagner y el Hofgarten estan ambos a menos de 10 minutos andando de la mayoria de los hoteles del centro.`,
      },
      {
        q: '¿Que hay de los perros grandes en los hoteles de ciudades de festival?',
        a: `Los hoteles de las ciudades de festival tienden a ser boutique e imponen limites de peso (8-15 kg). Colmar, Sopot y Bregenz son los mas flexibles para razas grandes: buscar propiedades familiares de 3 estrellas o aparthoteles que tipicamente no tienen restricciones de peso. En Bayreuth, el Goldener Anker ha acogido historicamente a perros grandes para los festivaleros. Siempre llamar con antelacion para confirmar la politica actual sobre el peso y la raza de tu perro.`,
      },
    ],
    relatedHeading: 'Ver tambien',
  },
  pt: {
    eyebrow: `EPOCA DOS FESTIVAIS 2026 · VIAGEM PET-FRIENDLY EUROPA`,
    title: `Festivais de verao na Europa com o seu cao: 8 cidades com hoteis pet-friendly (2026)`,
    intro: `O verao dos festivais e o pico da vida cultural europeia em julho e agosto. Os donos de caes evitaram historicamente as cidades de festival presumindo que o seu cao ficaria excluido. Este guia explica como assistir ao festival E manter o seu cao feliz: concertos ao ar livre, atmosfera festivaleira nos parques, e cidades que ganham vida a um ritmo humano que os caes realmente apreciam.`,
    pickHeading: '8 cidades de festival onde os caes prosperam a par do programa',
    whyHere: 'Porque aqui',
    hotelLabel: 'Onde ficar',
    seeDestCta: 'Guia completo →',
    hotelCta: 'Ver disponibilidade →',
    summerLabel: 'Max verao',
    practicalHeading: 'Viagem a festivais com cao: info pratica',
    practical: [
      {
        h: 'A estrategia do companheiro',
        p: `Um humano assiste ao espetaculo, o outro fica com o cao no parque ou na esplanada. A maioria dos espetaculos de festival dura 2-4 horas, a duracao ideal para uma sesta canina num hotel ou parque urbano. Para as operas de Bayreuth (5 horas), planear uma caminhada mais longa antes para que o cao esteja tranquilo antes de partir. A estrategia do companheiro funciona nas 8 cidades deste guia e transforma um potencial problema logistico num agradavel programa paralelo.`,
      },
      {
        h: 'Reservar hoteis durante a epoca dos festivais',
        p: `Reservar com 3-6 meses de antecedencia para Bayreuth (esgota em outubro para o verao seguinte), 8 semanas para Spoleto e Orange, 4 semanas para Parnu e Sopot. As cidades de festival impoe precos de epoca alta a escala de toda a cidade durante a semana do evento. Para Bregenz e Colmar, as aldeias circundantes (Hard e Turckheim respetivamente) oferecem alternativas mais tranquilas a precos mais baixos com 15-20 min de carro ate os recintos.`,
      },
      {
        h: 'Concertos ao ar livre vs recintos com bilhetes',
        p: `Muitos festivais tem concertos gratuitos ao ar livre em pracas da cidade onde os caes sao tolerados. Umbria Jazz (Perugia) tem palcos gratuitos na praca, o passeio a beira do lago de Bregenz e um espaco publico durante as representacoes, e a atmosfera da Petite Venise de Colmar ao entardecer estende o ambiente festivaleiro a ruas acessiveis com caes. Verificar o programa exterior de cada festival antes de reservar.`,
      },
      {
        h: 'Gestao do calor nos festivais de verao',
        p: `Os festivais do sul (Orange, Perugia, Spoleto) atingem 28-30°C em julho. Assistir as representacoes noturnas, manter o cao num quarto de hotel com ar condicionado durante as horas mais quentes da tarde (14h-18h), e pre-reservar um hotel com jardim ou esplanada sombreada. O teste dos 7 segundos aplica-se: pressione as costas da mao no asfalto durante 7 segundos. Se nao aguentar, o seu cao tambem nao. As cidades balticas (Parnu, Sopot) ficam abaixo dos 22°C e nao tem problemas de gestao do calor.`,
      },
    ],
    faqHeading: 'Perguntas frequentes',
    faqs: [
      {
        q: 'O meu cao pode assistir a concertos ao ar livre nestes festivais?',
        a: `Nos concertos gratuitos ao ar livre (palcos de praca do Umbria Jazz, passeio a beira do lago de Bregenz) sim. Nos concertos em recintos com bilhetes, nao. A estrategia do companheiro funciona: uma pessoa assiste, o cao fica no hotel ou parque da cidade. A atmosfera canaleira vespertina de Colmar e o bulevar Monte Cassino de Sopot sao espacos publicos onde um cao bem-comportado a trela e completamente normal durante a epoca dos festivais.`,
      },
      {
        q: 'Qual destes festivais e o mais acolhedor para caes em geral?',
        a: `Parnu e Sopot. A cultura baltica e a mais tolerante com caes da Europa, o formato de festival ao ar livre esta descentralizado por toda a cidade, e as temperaturas ficam abaixo dos 22°C para que o cao esteja confortavel todo o dia. Bayreuth e a segunda melhor escolha para companheiros caninos: o parque Eremitage, a cultura biergarten franconiana e os passeios pela colina Hofgarten tornam Bayreuth genuinamente agradavel para a metade nao-opera da viagem.`,
      },
      {
        q: 'Vale a pena ir a Bayreuth se apenas um de nos tem bilhetes?',
        a: `Absolutamente. O parque Eremitage (um parque barroco completo com fontes, grutas e trilhos exteriores que aceitam caes a trela), a cultura biergarten franconiana da cidade (a mais tolerante com caes da Alemanha), e o acesso gratuito aos jardins da colina do Festspielhaus tornam Bayreuth genuinamente interessante para a metade nao-opera da viagem. O jardim exterior do Museu Wagner e o Hofgarten ficam ambos a menos de 10 minutos a pe da maioria dos hoteis do centro.`,
      },
      {
        q: 'O que acontece com caes grandes nos hoteis das cidades de festival?',
        a: `Os hoteis das cidades de festival tendem a ser boutique e impoe limites de peso (8-15 kg). Colmar, Sopot e Bregenz sao os mais flexiveis para racas grandes: procurar propriedades familiares de 3 estrelas ou aparthoteis que tipicamente nao tem restricoes de peso. Em Bayreuth, o Goldener Anker tem historicamente acolhido caes grandes para os frequentadores do festival. Ligar sempre com antecedencia para confirmar a politica atual sobre o peso e a raca do seu cao.`,
      },
    ],
    relatedHeading: 'Ver tambem',
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
  const t = COPY[locale]

  const stickyLabel = STICKY_LABELS[locale] ?? STICKY_LABELS.en

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
    mainEntity: t.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t.title,
    description: t.intro,
    inLanguage: locale,
    author: { '@type': 'Person', name: 'HotelsWithPets Editorial', jobTitle: 'Pet Travel Editor', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets', url: SITE_URL },
  }

  const pickWhy = (p: Pick) => {
    if (locale === 'fr') return p.whyFr
    if (locale === 'es') return p.whyEs
    if (locale === 'pt') return p.whyPt
    return p.whyEn
  }
  const pickHotel = (p: Pick) => {
    if (locale === 'fr') return p.hotelFr
    if (locale === 'es') return p.hotelEs
    if (locale === 'pt') return p.hotelPt
    return p.hotelEn
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-violet-600 to-indigo-500 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3), transparent 40%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-xs font-semibold uppercase tracking-widest text-purple-100 mb-3">🎭 {t.eyebrow}</div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{t.title}</h1>
          <p className="text-lg sm:text-xl text-purple-50 leading-relaxed">{t.intro}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-8">{t.pickHeading}</h2>
        <div className="space-y-5">
          {PICKS.map((p, i) => (
            <article key={p.slug} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <header className="px-5 sm:px-7 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-stone-200 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-2xl font-black text-purple-700">#{i + 1}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  <Link href={`/${locale}${p.destPath}`} className="hover:text-purple-700">{p.name}</Link>
                </h3>
                <span className="text-sm text-stone-600">{p.country}</span>
                <span className="ml-auto bg-sky-100 text-sky-900 text-xs font-bold px-3 py-1 rounded-full">
                  {t.summerLabel} {p.summerTemp}
                </span>
                <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full">
                  🎭 {p.festivalNote}
                </span>
              </header>
              <div className="px-5 sm:px-7 py-5 space-y-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">{t.whyHere}</div>
                  <p className="text-stone-800 leading-relaxed">{pickWhy(p)}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">{t.hotelLabel}</div>
                  <p className="text-stone-700 text-sm leading-relaxed">{pickHotel(p)}</p>
                </div>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link href={`/${locale}${p.destPath}`} className="text-sm font-semibold text-purple-700 hover:text-purple-900 hover:underline">
                    {t.seeDestCta}
                  </Link>
                  <a
                    href={buildAllezDestLink(p.name, p.country, `${CAMPAIGN_BASE}-${p.slug}`, 5)}
                    target="_blank"
                    rel="noopener sponsored"
                    className="text-sm font-semibold text-stone-700 hover:text-purple-700 hover:underline"
                  >
                    {t.hotelCta}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6">🎶 {t.practicalHeading}</h2>
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

      <GuideFooter locale={locale} currentSlug={SLUG} />

      <StickyHotelCTA
        label={stickyLabel.label}
        cta={stickyLabel.cta}
        href={buildAllezDestLink('Europe', 'Europe', `${CAMPAIGN_BASE}-sticky`, 5)}
      />
    </main>
  )
}
