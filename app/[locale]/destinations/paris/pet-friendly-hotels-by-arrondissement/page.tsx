import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { hasLocale, locales } from '@/app/[locale]/dictionaries'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import arrondissements from '@/data/paris-arrondissements.json'

const SLUG_PATH = 'destinations/paris/pet-friendly-hotels-by-arrondissement'

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
    en: `Best Pet-Friendly Hotels in Paris by Arrondissement (2026) | HotelsWithPets`,
    fr: `Meilleurs Hotels Pet-Friendly a Paris par Arrondissement (2026) | HotelsWithPets`,
    es: `Mejores Hoteles Pet-Friendly en Paris por Arrondissement (2026) | HotelsWithPets`,
    pt: `Melhores Hoteis Pet-Friendly em Paris por Arrondissement (2026) | HotelsWithPets`,
    de: `Beste Hundefreundliche Hotels in Paris nach Arrondissement (2026) | HotelsWithPets`,
    nl: `Beste Hondvriendelijke Hotels in Parijs per Arrondissement (2026) | HotelsWithPets`,
    it: `Migliori Hotel Pet-Friendly a Parigi per Arrondissement (2026) | HotelsWithPets`,
  }
  const description =
    locale === 'fr'
      ? `60 hotels verifies dans les 20 arrondissements de Paris - parcs, veterinaires et politique chien par quartier.`
      : locale === 'es'
      ? `60 hoteles verificados en los 20 arrondissements de Paris - parques, veterinarios y politica canina por barrio.`
      : locale === 'pt'
      ? `60 hoteis verificados nos 20 arrondissements de Paris - parques, veterinarios e politica canina por bairro.`
      : locale === 'nl'
      ? `60 geverifieerde hotels in de 20 arrondissementen van Parijs, parken, dierenartsen en hondenbeleid per wijk.`
      : locale === 'it'
      ? `60 hotel verificati nei 20 arrondissement di Parigi - parchi, veterinari e regole sui cani per quartiere.`
      : locale === 'de'
      ? `60 geprüfte Hotels in den 20 Arrondissements von Paris, Parks, Tierärzte und Hunderegeln pro Viertel.`
      : `60 hotels verified across 20 Paris arrondissements - parks, vets and dog policy per neighbourhood.`

  return {
    title: titles[locale] ?? titles.en,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/${SLUG_PATH}`,
      languages: {
        en: `${SITE_URL}/en/${SLUG_PATH}`,
        fr: `${SITE_URL}/fr/${SLUG_PATH}`,
        es: `${SITE_URL}/es/${SLUG_PATH}`,
        pt: `${SITE_URL}/pt/${SLUG_PATH}`,
        de: `${SITE_URL}/de/${SLUG_PATH}`,
        nl: `${SITE_URL}/nl/${SLUG_PATH}`,
        it: `${SITE_URL}/it/${SLUG_PATH}`,
        'x-default': `${SITE_URL}/en/${SLUG_PATH}`,
      },
    },
  }
}

const COPY = {
  en: {
    breadcrumbHome: 'Home',
    breadcrumbParis: 'Paris',
    breadcrumbCurrent: 'Hotels by arrondissement',
    badge: '🐾 60 hotels verified',
    h1: 'Best pet-friendly hotels in Paris by arrondissement',
    intro: `Choosing the right arrondissement changes everything for a trip to Paris with a dog. Each neighbourhood has its own vibe, its own green spaces (or lack of them), its own access to the Metro and its own dog policies. We verified 60 hotels across all 20 districts so you can pick your base before you book.`,
    stat1: '20 arrondissements',
    stat2: '60 hotels',
    navTitle: 'Jump to an arrondissement',
    metrosLabel: 'Metro',
    priceFrom: 'From',
    petFee: 'Pet fee',
    petFeePerNight: '/night',
    petFeeIncluded: 'included',
    bookCta: 'Book on Booking.com',
    guideCta: 'Full guide for',
    faqTitle: 'Frequently asked questions about Paris with a dog',
    backParis: 'Back to Paris guide',
    faqs: [
      {
        q: 'Which arrondissement is best for dogs in Paris?',
        a: 'The 11th (Bastille/Oberkampf) and 12th (Bercy) offer the best combination of off-leash parks, affordable hotels and easy Metro access. The Bois de Vincennes in the 12th has the largest off-leash area in the city. For a central, walkable base, the 4th (Marais) has numerous dog-tolerant cafe terraces and the Place des Vosges arcades.',
      },
      {
        q: 'Are dogs allowed in Paris parks?',
        a: 'Most large Paris parks ban dogs from lawns and flower beds. Dogs on leash are permitted on the gravel alleys of most parks. The Bois de Boulogne and Bois de Vincennes have dedicated off-leash zones (canine areas). The Jardin des Plantes and the interior of the Jardin du Palais-Royal ban dogs entirely.',
      },
      {
        q: 'Can dogs use the Paris Metro?',
        a: 'Small dogs (under 6 kg when carried in a bag or carrier no larger than 45x30 cm) travel free on the RATP Metro, RER and buses. Larger dogs pay a reduced child ticket and must be muzzled and kept on a short leash. Dogs are not permitted in the first car of any Metro line.',
      },
      {
        q: 'What is the pet fee at Paris hotels?',
        a: 'Pet fees in Paris hotels range from free (many boutique and design hotels waive the charge) to EUR 50-100 per night at luxury palaces. Budget hotels often charge EUR 10-20 per stay. Always confirm at booking as the fee can vary by dog size and is sometimes per pet.',
      },
      {
        q: 'Which Paris neighbourhood has the most green space for dogs?',
        a: 'The 12th arrondissement (Bercy/Bois de Vincennes) has by far the most green space: the Bois de Vincennes covers 995 hectares with multiple off-leash canine areas. The 16th (Passy/Auteuil) borders the Bois de Boulogne with 846 hectares and its own off-leash zones. Both are ideal bases for owners of large or very active dogs.',
      },
      {
        q: 'Are there 24h vets in Paris?',
        a: 'Yes. The main 24h veterinary emergency centres in Paris are the Clinique Veterinaire des Champs-Elysees (9 rue Balzac, 75008, tel: +33 1 45 63 04 03) and the ADVET (Centre Hospitalier Veterinaire, Maisons-Alfort, 30 min by car/RER). The national emergency number 3115 can redirect to the nearest available vet any night.',
      },
    ],
  },
  fr: {
    breadcrumbHome: 'Accueil',
    breadcrumbParis: 'Paris',
    breadcrumbCurrent: 'Hotels par arrondissement',
    badge: '🐾 60 hotels verifies',
    h1: 'Meilleurs hotels pet-friendly a Paris par arrondissement',
    intro: `Le choix de l'arrondissement change tout pour un voyage a Paris avec un chien. Chaque quartier a son ambiance, ses espaces verts (ou leur absence), son acces au metro et ses propres regles pour les chiens. Nous avons verifie 60 hotels dans les 20 arrondissements pour que vous choisissiez votre base avant de reserver.`,
    stat1: '20 arrondissements',
    stat2: '60 hotels',
    navTitle: 'Aller a un arrondissement',
    metrosLabel: 'Metro',
    priceFrom: 'Des',
    petFee: 'Supplement animal',
    petFeePerNight: '/nuit',
    petFeeIncluded: 'inclus',
    bookCta: 'Reserver sur Booking.com',
    guideCta: 'Guide complet',
    faqTitle: 'Questions frequentes sur Paris avec un chien',
    backParis: 'Retour au guide Paris',
    faqs: [
      {
        q: 'Quel arrondissement est le meilleur pour les chiens a Paris ?',
        a: `Le 11e (Bastille/Oberkampf) et le 12e (Bercy) offrent la meilleure combinaison de parcs sans laisse, d'hotels abordables et d'acces facile au metro. Le Bois de Vincennes dans le 12e dispose de la plus grande zone sans laisse de la capitale. Pour une base centrale et marchable, le 4e (Marais) possede de nombreuses terrasses tolerantes et les arcades de la Place des Vosges.`,
      },
      {
        q: 'Les chiens sont-ils autorises dans les parcs parisiens ?',
        a: `La plupart des grands parcs parisiens interdisent les chiens sur les pelouses et les massifs. Les chiens tenus en laisse sont admis sur les allee gravillonnees de la majorite des parcs. Le Bois de Boulogne et le Bois de Vincennes disposent de zones canines sans laisse. Le Jardin des Plantes et l'interieur du Palais-Royal sont totalement interdits aux chiens.`,
      },
      {
        q: 'Les chiens peuvent-ils prendre le metro parisien ?',
        a: `Les petits chiens (moins de 6 kg dans un sac ou un panier de 45x30 cm maximum) voyagent gratuitement sur le metro RATP, le RER et les bus. Les chiens plus grands paient un demi-tarif et doivent etre museles et tenus en laisse courte. Les chiens ne sont pas autorises dans la premiere voiture de chaque ligne de metro.`,
      },
      {
        q: 'Quel est le supplement animal dans les hotels parisiens ?',
        a: `Le supplement varie de gratuit (de nombreux hotels boutique ou design n'en demandent pas) a 50-100 EUR par nuit dans les palaces. Les hotels plus economiques facturent souvent 10-20 EUR par sejour. Verifiez toujours au moment de la reservation, car le tarif peut varier selon la taille du chien.`,
      },
      {
        q: "Quel quartier parisien offre le plus d'espaces verts pour les chiens ?",
        a: `Le 12e arrondissement (Bercy/Bois de Vincennes) dispose de loin du plus grand espace vert : le Bois de Vincennes couvre 995 hectares avec plusieurs zones canines sans laisse. Le 16e (Passy/Auteuil) est a la limite du Bois de Boulogne (846 ha) et de ses propres zones sans laisse. Les deux sont ideaux pour les proprietaires de grands chiens ou tres actifs.`,
      },
      {
        q: 'Y a-t-il des veterinaires 24h a Paris ?',
        a: `Oui. Les principaux centres d'urgences veterinaires 24h/24 a Paris sont la Clinique Veterinaire des Champs-Elysees (9 rue Balzac, 75008, tel : +33 1 45 63 04 03) et l'ADVET (Centre Hospitalier Veterinaire, Maisons-Alfort, 30 min en voiture/RER). Le numero national 3115 redirige vers le veterinaire de garde le plus proche toutes les nuits.`,
      },
    ],
  },
  es: {
    breadcrumbHome: 'Inicio',
    breadcrumbParis: 'Paris',
    breadcrumbCurrent: 'Hoteles por arrondissement',
    badge: '🐾 60 hoteles verificados',
    h1: 'Mejores hoteles pet-friendly en Paris por arrondissement',
    intro: `Elegir el arrondissement adecuado cambia todo en un viaje a Paris con perro. Cada barrio tiene su propio ambiente, sus zonas verdes (o su ausencia), su acceso al metro y sus normas para animales. Hemos verificado 60 hoteles en los 20 distritos para que elijas tu base antes de reservar.`,
    stat1: '20 arrondissements',
    stat2: '60 hoteles',
    navTitle: 'Ir a un arrondissement',
    metrosLabel: 'Metro',
    priceFrom: 'Desde',
    petFee: 'Suplemento animal',
    petFeePerNight: '/noche',
    petFeeIncluded: 'incluido',
    bookCta: 'Reservar en Booking.com',
    guideCta: 'Guia completa',
    faqTitle: 'Preguntas frecuentes sobre Paris con perro',
    backParis: 'Volver a la guia Paris',
    faqs: [
      {
        q: 'Que arrondissement es el mejor para perros en Paris?',
        a: `El 11.º (Bastille/Oberkampf) y el 12.º (Bercy) ofrecen la mejor combinacion de parques sin correa, hoteles asequibles y facil acceso al metro. El Bois de Vincennes en el 12.º tiene la mayor zona sin correa de la ciudad. Para una base central y caminable, el 4.º (Marais) cuenta con numerosas terrazas tolerantes y las arcadas de la Place des Vosges.`,
      },
      {
        q: 'Los perros estan permitidos en los parques de Paris?',
        a: `La mayoria de los grandes parques parisinos prohiben a los perros en cesped y parterres. Los perros con correa estan permitidos en los senderos de grava de la mayoria de parques. El Bois de Boulogne y el Bois de Vincennes tienen zonas caninas sin correa. El Jardin des Plantes y el interior del Palais-Royal prohiben totalmente los perros.`,
      },
      {
        q: 'Los perros pueden usar el metro de Paris?',
        a: `Los perros pequenos (menos de 6 kg en bolsa o transportin de 45x30 cm max) viajan gratis en el metro RATP, el RER y los autobuses. Los perros mas grandes pagan tarifa reducida y deben llevar bozal y correa corta. Los perros no estan permitidos en el primer vagon de ninguna linea de metro.`,
      },
      {
        q: 'Cual es el suplemento animal en los hoteles parisinos?',
        a: `El suplemento va desde gratuito (muchos hoteles boutique o diseno no lo cobran) hasta 50-100 EUR por noche en los palacios. Los hoteles mas economicos suelen cobrar 10-20 EUR por estancia. Confirma siempre al reservar, ya que la tarifa puede variar segun el tamano del perro.`,
      },
      {
        q: 'Que barrio parisino tiene mas espacio verde para perros?',
        a: `El 12.º arrondissement (Bercy/Bois de Vincennes) tiene con diferencia mas espacio verde: el Bois de Vincennes cubre 995 hectareas con varias zonas caninas sin correa. El 16.º (Passy/Auteuil) limita con el Bois de Boulogne (846 ha) y sus propias zonas sin correa. Ambos son ideales para duenos de perros grandes o muy activos.`,
      },
      {
        q: 'Hay veterinarios 24h en Paris?',
        a: `Si. Los principales centros de urgencias veterinarias 24h en Paris son la Clinique Veterinaire des Champs-Elysees (9 rue Balzac, 75008, tel: +33 1 45 63 04 03) y el ADVET (Centre Hospitalier Veterinaire, Maisons-Alfort, 30 min en coche/RER). El numero nacional 3115 redirige al veterinario de guardia mas cercano cualquier noche.`,
      },
    ],
  },
  pt: {
    breadcrumbHome: 'Inicio',
    breadcrumbParis: 'Paris',
    breadcrumbCurrent: 'Hoteis por arrondissement',
    badge: '🐾 60 hoteis verificados',
    h1: 'Melhores hoteis pet-friendly em Paris por arrondissement',
    intro: `Escolher o arrondissement certo muda tudo numa viagem a Paris com cao. Cada bairro tem o seu ambiente, os seus espacos verdes (ou a sua ausencia), o seu acesso ao metro e as suas proprias regras para animais. Verificamos 60 hoteis nos 20 distritos para que escolha a sua base antes de reservar.`,
    stat1: '20 arrondissements',
    stat2: '60 hoteis',
    navTitle: 'Ir a um arrondissement',
    metrosLabel: 'Metro',
    priceFrom: 'A partir de',
    petFee: 'Taxa animal',
    petFeePerNight: '/noite',
    petFeeIncluded: 'incluido',
    bookCta: 'Reservar no Booking.com',
    guideCta: 'Guia completo',
    faqTitle: 'Perguntas frequentes sobre Paris com cao',
    backParis: 'Voltar ao guia Paris',
    faqs: [
      {
        q: 'Qual e o melhor arrondissement para caes em Paris?',
        a: `O 11.º (Bastille/Oberkampf) e o 12.º (Bercy) oferecem a melhor combinacao de parques sem trela, hoteis acessiveis e facil acesso ao metro. O Bois de Vincennes no 12.º tem a maior area sem trela da cidade. Para uma base central e caminhavel, o 4.º (Marais) tem numerosas esplanadas tolerantes e as arcadas da Place des Vosges.`,
      },
      {
        q: 'Os caes sao permitidos nos parques de Paris?',
        a: `A maioria dos grandes parques parisienses proibe caes em relvados e canteiros. Caes com trela sao permitidos nas alamedas de gravilha da maioria dos parques. O Bois de Boulogne e o Bois de Vincennes tem zonas caninas sem trela. O Jardin des Plantes e o interior do Palais-Royal proibem totalmente os caes.`,
      },
      {
        q: 'Os caes podem usar o metro de Paris?',
        a: `Caes pequenos (menos de 6 kg num saco ou transportador de 45x30 cm max) viajam gratuitamente no metro RATP, RER e autocarros. Caes maiores pagam tarifa reduzida e devem usar focinheira e trela curta. Os caes nao sao permitidos na primeira carruagem de nenhuma linha de metro.`,
      },
      {
        q: 'Qual e a taxa animal nos hoteis parisienses?',
        a: `A taxa vai de gratuita (muitos hoteis boutique ou design nao cobram) ate 50-100 EUR por noite nos palacios. Os hoteis mais economicos costumam cobrar 10-20 EUR por estadia. Confirme sempre ao reservar, pois a taxa pode variar com o tamanho do cao.`,
      },
      {
        q: 'Qual bairro parisiense tem mais espaco verde para caes?',
        a: `O 12.º arrondissement (Bercy/Bois de Vincennes) tem de longe mais espaco verde: o Bois de Vincennes cobre 995 hectares com varias zonas caninas sem trela. O 16.º (Passy/Auteuil) faz fronteira com o Bois de Boulogne (846 ha) e as suas proprias zonas sem trela. Ambos sao ideais para donos de caes grandes ou muito ativos.`,
      },
      {
        q: 'Ha veterinarios 24h em Paris?',
        a: `Sim. Os principais centros de urgencias veterinarias 24h em Paris sao a Clinique Veterinaire des Champs-Elysees (9 rue Balzac, 75008, tel: +33 1 45 63 04 03) e o ADVET (Centre Hospitalier Veterinaire, Maisons-Alfort, 30 min de carro/RER). O numero nacional 3115 redireciona para o veterinario de plantao mais proximo qualquer noite.`,
      },
    ],
  },
  nl: {
    breadcrumbHome: 'Home',
    breadcrumbParis: 'Parijs',
    breadcrumbCurrent: 'Hotels per arrondissement',
    badge: '🐾 60 hotels geverifieerd',
    h1: 'Beste hondvriendelijke hotels in Parijs per arrondissement',
    intro: `De keuze van het juiste arrondissement verandert alles voor een reis naar Parijs met je hond. Elke wijk heeft zijn eigen sfeer, zijn eigen groene ruimtes (of het gebrek daaraan), zijn eigen toegang tot de metro en zijn eigen hondenbeleid. We hebben 60 hotels in alle 20 wijken geverifieerd, zodat je je basis kiest voordat je boekt.`,
    stat1: '20 arrondissementen',
    stat2: '60 hotels',
    navTitle: 'Ga naar een arrondissement',
    metrosLabel: 'Metro',
    priceFrom: 'Vanaf',
    petFee: 'Huisdiertoeslag',
    petFeePerNight: '/nacht',
    petFeeIncluded: 'inbegrepen',
    bookCta: 'Boek op Booking.com',
    guideCta: 'Volledige gids voor',
    faqTitle: 'Veelgestelde vragen over Parijs met je hond',
    backParis: 'Terug naar de gids van Parijs',
    faqs: [
      {
        q: 'Welk arrondissement is het beste voor honden in Parijs?',
        a: `Het 11e (Bastille/Oberkampf) en het 12e (Bercy) bieden de beste combinatie van losloopgebieden, betaalbare hotels en gemakkelijke metrotoegang. Het Bois de Vincennes in het 12e heeft het grootste losloopgebied van de stad. Voor een centrale, goed te belopen basis heeft het 4e (Marais) talloze hondvriendelijke caféterrassen en de arcades van de Place des Vosges.`,
      },
      {
        q: 'Zijn honden toegestaan in de parken van Parijs?',
        a: `De meeste grote parken in Parijs verbieden honden op de grasvelden en bloemperken. Honden aan de lijn zijn toegestaan op de grindpaden van de meeste parken. Het Bois de Boulogne en het Bois de Vincennes hebben speciale losloopgebieden voor honden. De Jardin des Plantes en het binnenterrein van de Jardin du Palais-Royal verbieden honden helemaal.`,
      },
      {
        q: 'Mogen honden de metro van Parijs gebruiken?',
        a: `Kleine honden (onder 6 kg, in een tas of draagmand van maximaal 45x30 cm) reizen gratis mee met de RATP-metro, de RER en de bussen. Grotere honden betalen een gereduceerd kindertarief en moeten gemuilkorfd en aan een korte lijn zijn. Honden zijn niet toegestaan in de eerste wagon van een metrolijn.`,
      },
      {
        q: 'Wat is de huisdiertoeslag bij hotels in Parijs?',
        a: `De huisdiertoeslag in hotels in Parijs varieert van gratis (veel boetiek- en designhotels rekenen niets) tot 50-100 EUR per nacht bij luxe paleishotels. Budgethotels rekenen vaak 10-20 EUR per verblijf. Controleer dit altijd bij het boeken, want de toeslag kan verschillen per hondengrootte en is soms per huisdier.`,
      },
      {
        q: 'Welke wijk in Parijs heeft de meeste groene ruimte voor honden?',
        a: `Het 12e arrondissement (Bercy/Bois de Vincennes) heeft verreweg de meeste groene ruimte: het Bois de Vincennes beslaat 995 hectare met meerdere losloopgebieden voor honden. Het 16e (Passy/Auteuil) grenst aan het Bois de Boulogne met 846 hectare en zijn eigen losloopgebieden. Beide zijn ideale bases voor eigenaren van grote of zeer actieve honden.`,
      },
      {
        q: 'Zijn er dierenartsen met 24-uursdienst in Parijs?',
        a: `Ja. De belangrijkste 24-uurs spoedklinieken voor dieren in Parijs zijn de Clinique Veterinaire des Champs-Elysees (9 rue Balzac, 75008, tel: +33 1 45 63 04 03) en de ADVET (Centre Hospitalier Veterinaire, Maisons-Alfort, 30 min met de auto/RER). Het landelijke noodnummer 3115 verwijst je elke nacht door naar de dichtstbijzijnde beschikbare dierenarts.`,
      },
    ],
  },
  it: {
    breadcrumbHome: 'Home',
    breadcrumbParis: 'Parigi',
    breadcrumbCurrent: 'Hotel per arrondissement',
    badge: '🐾 60 hotel verificati',
    h1: 'Migliori hotel pet-friendly a Parigi per arrondissement',
    intro: `Scegliere l'arrondissement giusto cambia tutto in un viaggio a Parigi con il cane. Ogni quartiere ha la sua atmosfera, i suoi spazi verdi (o la loro mancanza), il suo accesso alla metro e le sue regole per gli animali. Abbiamo verificato 60 hotel nei 20 distretti cosi puoi scegliere la tua base prima di prenotare.`,
    stat1: '20 arrondissement',
    stat2: '60 hotel',
    navTitle: 'Vai a un arrondissement',
    metrosLabel: 'Metro',
    priceFrom: 'Da',
    petFee: 'Supplemento animale',
    petFeePerNight: '/notte',
    petFeeIncluded: 'incluso',
    bookCta: 'Prenota su Booking.com',
    guideCta: 'Guida completa per',
    faqTitle: 'Domande frequenti su Parigi con il cane',
    backParis: 'Torna alla guida di Parigi',
    faqs: [
      {
        q: 'Qual e il miglior arrondissement per i cani a Parigi?',
        a: `L'11e (Bastille/Oberkampf) e il 12e (Bercy) offrono la miglior combinazione di parchi liberi dal guinzaglio, hotel economici e facile accesso alla metro. Il Bois de Vincennes nel 12e ha la piu grande area libera dal guinzaglio della citta. Per una base centrale e percorribile a piedi, il 4e (Marais) ha numerose terrazze di caffe che tollerano i cani e i portici di Place des Vosges.`,
      },
      {
        q: 'I cani sono ammessi nei parchi di Parigi?',
        a: `La maggior parte dei grandi parchi parigini vieta i cani su prati e aiuole. I cani al guinzaglio sono ammessi sui viali ghiaiati della maggior parte dei parchi. Il Bois de Boulogne e il Bois de Vincennes hanno zone dedicate libere dal guinzaglio (aree canine). Il Jardin des Plantes e l'interno del Jardin du Palais-Royal vietano i cani del tutto.`,
      },
      {
        q: 'I cani possono usare la metro di Parigi?',
        a: `I cani piccoli (sotto i 6 kg trasportati in una borsa o trasportino non piu grande di 45x30 cm) viaggiano gratis sulla metro RATP, sul RER e sugli autobus. I cani piu grandi pagano un biglietto ridotto da bambino e devono avere museruola e guinzaglio corto. I cani non sono ammessi nella prima carrozza di nessuna linea della metro.`,
      },
      {
        q: 'Qual e il supplemento animale negli hotel di Parigi?',
        a: `Il supplemento animale negli hotel di Parigi va da gratuito (molti hotel boutique e di design non lo applicano) a 50-100 EUR a notte nei palazzi di lusso. Gli hotel economici spesso chiedono 10-20 EUR a soggiorno. Conferma sempre al momento della prenotazione, perche il supplemento puo variare in base alla taglia del cane ed e a volte per animale.`,
      },
      {
        q: 'Quale quartiere di Parigi ha piu spazio verde per i cani?',
        a: `Il 12e arrondissement (Bercy/Bois de Vincennes) ha di gran lunga piu spazio verde: il Bois de Vincennes copre 995 ettari con diverse aree libere dal guinzaglio. Il 16e (Passy/Auteuil) confina con il Bois de Boulogne, 846 ettari, e le sue proprie aree libere dal guinzaglio. Entrambi sono basi ideali per proprietari di cani grandi o molto attivi.`,
      },
      {
        q: 'Ci sono veterinari 24h a Parigi?',
        a: `Si. I principali centri veterinari d'urgenza 24h a Parigi sono la Clinique Veterinaire des Champs-Elysees (9 rue Balzac, 75008, tel: +33 1 45 63 04 03) e l'ADVET (Centre Hospitalier Veterinaire, Maisons-Alfort, 30 min in auto/RER). Il numero nazionale d'emergenza 3115 puo reindirizzarti al veterinario disponibile piu vicino ogni notte.`,
      },
    ],
  },
  de: {
    breadcrumbHome: 'Startseite',
    breadcrumbParis: 'Paris',
    breadcrumbCurrent: 'Hotels nach Arrondissement',
    badge: '🐾 60 Hotels geprüft',
    h1: 'Beste hundefreundliche Hotels in Paris nach Arrondissement',
    intro: `Die Wahl des richtigen Arrondissements verändert alles bei einer Reise nach Paris mit Hund. Jedes Viertel hat seine eigene Atmosphäre, seine eigenen Grünflächen (oder deren Fehlen), seinen eigenen Zugang zur Metro und seine eigenen Hunderegeln. Wir haben 60 Hotels in allen 20 Bezirken geprüft, damit Sie Ihre Basis wählen können, bevor Sie buchen.`,
    stat1: '20 Arrondissements',
    stat2: '60 Hotels',
    navTitle: 'Zu einem Arrondissement springen',
    metrosLabel: 'Metro',
    priceFrom: 'Ab',
    petFee: 'Haustiergebühr',
    petFeePerNight: '/Nacht',
    petFeeIncluded: 'inklusive',
    bookCta: 'Auf Booking.com buchen',
    guideCta: 'Vollständiger Guide für',
    faqTitle: 'Häufige Fragen zu Paris mit Hund',
    backParis: 'Zurück zum Paris-Guide',
    faqs: [
      {
        q: 'Welches Arrondissement ist das beste für Hunde in Paris?',
        a: `Das 11. (Bastille/Oberkampf) und das 12. (Bercy) bieten die beste Kombination aus Freilaufparks, günstigen Hotels und einfachem Metro-Zugang. Der Bois de Vincennes im 12. hat die größte Freilauffläche der Stadt. Für eine zentrale, gut zu Fuß erreichbare Basis bietet das 4. (Marais) zahlreiche hundefreundliche Café-Terrassen und die Arkaden der Place des Vosges.`,
      },
      {
        q: 'Sind Hunde in Pariser Parks erlaubt?',
        a: `Die meisten großen Pariser Parks verbieten Hunde auf Rasenflächen und Blumenbeeten. Angeleinte Hunde sind auf den Kieswegen der meisten Parks erlaubt. Der Bois de Boulogne und der Bois de Vincennes haben spezielle Freilaufzonen (Hundeauslaufbereiche). Der Jardin des Plantes und das Innere des Jardin du Palais-Royal verbieten Hunde vollständig.`,
      },
      {
        q: 'Dürfen Hunde die Pariser Metro benutzen?',
        a: `Kleine Hunde (unter 6 kg, getragen in einer Tasche oder Transportbox von höchstens 45x30 cm) fahren kostenlos in der RATP-Metro, im RER und in Bussen. Größere Hunde zahlen einen ermäßigten Kinderfahrschein und müssen einen Maulkorb tragen und an einer kurzen Leine geführt werden. Hunde sind im ersten Wagen jeder Metrolinie nicht erlaubt.`,
      },
      {
        q: 'Wie hoch ist die Haustiergebühr in Pariser Hotels?',
        a: `Die Haustiergebühren in Pariser Hotels reichen von kostenlos (viele Boutique- und Designhotels verzichten darauf) bis zu 50-100 EUR pro Nacht in Luxuspalästen. Budgethotels verlangen oft 10-20 EUR pro Aufenthalt. Bestätigen Sie dies immer bei der Buchung, da die Gebühr je nach Hundegröße variieren kann und manchmal pro Tier berechnet wird.`,
      },
      {
        q: 'Welches Pariser Viertel hat die meisten Grünflächen für Hunde?',
        a: `Das 12. Arrondissement (Bercy/Bois de Vincennes) hat mit Abstand die meisten Grünflächen: Der Bois de Vincennes umfasst 995 Hektar mit mehreren Hundeauslaufzonen. Das 16. (Passy/Auteuil) grenzt an den Bois de Boulogne mit 846 Hektar und eigenen Freilaufzonen. Beide sind ideale Basen für Besitzer großer oder sehr aktiver Hunde.`,
      },
      {
        q: 'Gibt es Tierärzte mit 24-Stunden-Dienst in Paris?',
        a: `Ja. Die wichtigsten tierärztlichen 24-Stunden-Notfallzentren in Paris sind die Clinique Veterinaire des Champs-Elysees (9 rue Balzac, 75008, Tel: +33 1 45 63 04 03) und die ADVET (Centre Hospitalier Veterinaire, Maisons-Alfort, 30 Min mit Auto/RER). Die nationale Notrufnummer 3115 leitet Sie jede Nacht an den nächstgelegenen verfügbaren Tierarzt weiter.`,
      },
    ],
  },
} as const

type Locale = keyof typeof COPY

type ArrondissementData = (typeof arrondissements)[number]

function getIntro(a: ArrondissementData, locale: Locale): string {
  if (locale === 'fr') return a.introFr
  if (locale === 'es') return a.introEs
  if (locale === 'pt') return a.introPt
  if (locale === 'nl') return a.introEn
  if (locale === 'it') return a.introEn
  if (locale === 'de') return a.introEn
  return a.introEn
}

function getPitch(
  hotel: ArrondissementData['hotels'][number],
  locale: Locale,
): string {
  if (locale === 'fr') return hotel.pitchFr
  if (locale === 'es') return hotel.pitchEs
  if (locale === 'pt') return hotel.pitchPt
  if (locale === 'nl') return hotel.pitchEn
  if (locale === 'it') return hotel.pitchEn
  if (locale === 'de') return hotel.pitchEn
  return hotel.pitchEn
}

function sectionId(slug: string): string {
  return `arr-${slug}`
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!hasLocale(rawLocale)) notFound()
  const locale = rawLocale as Locale
  const t = COPY[locale] ?? COPY.en

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.breadcrumbHome, item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: t.breadcrumbParis, item: `${SITE_URL}/${locale}/destinations/paris` },
      { '@type': 'ListItem', position: 3, name: t.breadcrumbCurrent, item: `${SITE_URL}/${locale}/${SLUG_PATH}` },
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

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-stone-900 to-stone-700 text-white">
        <div className="max-w-5xl mx-auto px-4 py-14 sm:py-20">
          {/* Breadcrumb */}
          <nav className="text-sm text-white/60 mb-5 relative z-10">
            <Link href={`/${locale}`} className="hover:text-white">{t.breadcrumbHome}</Link>
            <span className="mx-2">/</span>
            <Link href={`/${locale}/destinations/paris`} className="hover:text-white">{t.breadcrumbParis}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{t.breadcrumbCurrent}</span>
          </nav>
          <span className="inline-block bg-amber-400 text-stone-900 text-xs font-black px-3 py-1 rounded-full mb-4">
            {t.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4 relative z-10">
            {t.h1}
          </h1>
          <p className="text-lg text-stone-200 max-w-3xl mb-8 relative z-10">{t.intro}</p>
          {/* Quick stats */}
          <div className="flex gap-8 relative z-10">
            <div>
              <p className="text-3xl font-black text-amber-400">20</p>
              <p className="text-sm text-stone-300">{t.stat1}</p>
            </div>
            <div>
              <p className="text-3xl font-black text-amber-400">60</p>
              <p className="text-sm text-stone-300">{t.stat2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick nav pills */}
      <section className="bg-white border-b border-stone-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-2 hidden sm:block">
            {t.navTitle}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {arrondissements.map((a) => (
              <a
                key={a.slug}
                href={`#${sectionId(a.slug)}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 hover:bg-amber-100 hover:text-stone-900 text-stone-700 text-xs font-semibold transition-colors whitespace-nowrap"
              >
                <span className="font-black">{a.slug}</span>
                <span className="text-stone-500 hidden sm:inline">{a.popularName}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Arrondissement sections */}
      <div className="max-w-6xl mx-auto px-4">
        {arrondissements.map((a) => (
          <section
            key={a.slug}
            id={sectionId(a.slug)}
            className="py-12 border-b border-stone-100"
          >
            {/* Arrondissement header */}
            <div className="mb-6">
              {/* Image */}
              <div className="relative aspect-[16/7] rounded-2xl overflow-hidden mb-6">
                <Image
                  src={`/images/paris-arrondissements/${a.slug}.jpg`}
                  alt={`${a.popularName} - Paris ${a.slug}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block bg-amber-400 text-stone-900 text-xs font-black px-3 py-1 rounded-full">
                    {a.slug}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-1">
                    {a.slug} - {a.popularName}
                  </h2>
                  {/* Metro badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {a.metros.map((m) => (
                      <span
                        key={m}
                        className="inline-block bg-stone-100 text-stone-600 text-xs font-semibold px-2 py-0.5 rounded-full"
                      >
                        {t.metrosLabel} {m}
                      </span>
                    ))}
                  </div>
                  <p className="text-stone-600 text-sm sm:text-base max-w-3xl leading-relaxed">
                    {getIntro(a, locale)}
                  </p>
                </div>
              </div>
            </div>

            {/* Hotel cards */}
            {a.hotels.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {a.hotels.map((hotel) => (
                  <div
                    key={hotel.name}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col"
                  >
                    {/* Hotel image */}
                    <div className="relative aspect-[16/9] bg-stone-100">
                      <Image
                        src={hotel.image || `/images/paris-arrondissements/${a.slug}.jpg`}
                        alt={`${hotel.name} - pet-friendly hotel Paris ${a.slug}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      {/* Name + stars */}
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-stone-900 text-sm leading-snug">{hotel.name}</h3>
                        <span className="flex-shrink-0 text-amber-400 text-xs font-black tracking-tight">
                          {'★'.repeat(hotel.stars)}
                        </span>
                      </div>
                      {/* Price + pet fee */}
                      <div className="flex items-center gap-3 mb-2 text-xs text-stone-500">
                        <span>
                          <span className="font-bold text-stone-900 text-sm">
                            {t.priceFrom} €{hotel.priceFrom}
                          </span>
                        </span>
                        <span>
                          {t.petFee}:{' '}
                          {hotel.petFee === 0
                            ? <span className="text-green-600 font-semibold">{t.petFeeIncluded}</span>
                            : <span>€{hotel.petFee}{t.petFeePerNight}</span>
                          }
                        </span>
                      </div>
                      {/* Pitch */}
                      <p className="text-xs text-stone-600 leading-relaxed flex-1 mb-3 line-clamp-3">
                        {getPitch(hotel, locale)}
                      </p>
                      {/* CTA */}
                      <a
                        href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.name + ' Paris')}&aid=304142`}
                        target="_blank"
                        rel="noopener sponsored"
                        className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
                      >
                        {t.bookCta}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Link to full arrondissement guide */}
            <Link
              href={`/${locale}/destinations/paris/arrondissements/${a.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              {t.guideCta} {a.slug} ({a.popularName}) →
            </Link>
          </section>
        ))}
      </div>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mb-8">{t.faqTitle}</h2>
        <div className="space-y-5">
          {t.faqs.map((faq, i) => (
            <details key={i} className="group bg-white rounded-2xl border border-stone-200 px-6 py-5">
              <summary className="font-bold text-stone-900 cursor-pointer list-none flex items-start justify-between gap-4">
                <span>{faq.q}</span>
                <span className="flex-shrink-0 text-stone-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-stone-600 text-sm leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Back link */}
      <div className="max-w-6xl mx-auto px-4 pb-12 text-center">
        <Link
          href={`/${locale}/destinations/paris`}
          className="inline-block text-sm font-semibold text-stone-700 hover:text-blue-700 underline"
        >
          ← {t.backParis}
        </Link>
      </div>
    </main>
  )
}
