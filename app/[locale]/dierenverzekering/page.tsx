import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import { insuranceLanguages } from '@/lib/insuranceSlugs'
import BrandLogo from '@/components/BrandLogo'
import ContactCTA from '@/components/ContactCTA'

const SLUG = 'dierenverzekering'
const UPDATED = 'november 2026'

export async function generateStaticParams() {
  return [{ locale: 'nl' }]
}

export const metadata: Metadata = {
  title: 'Beste huisdierenverzekering 2026: hond & kat vergelijken',
  description:
    'Onafhankelijke vergelijking van de beste huisdierenverzekeringen voor hond en kat in Nederland in 2026: vergoeding, eigen risico, wachttijd en dekking van 10 verzekeraars, plus hoe je kiest.',
  alternates: {
    canonical: `${SITE_URL}/nl/${SLUG}`,
    languages: insuranceLanguages(),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Beste huisdierenverzekering 2026: hond & kat vergelijken',
    description:
      'Onafhankelijke vergelijking van de beste huisdierenverzekeringen voor hond en kat in Nederland in 2026.',
    url: `${SITE_URL}/nl/${SLUG}`,
    siteName: 'HotelsWithPets.com',
  },
}

// ─── Data ───────────────────────────────────────────────────────────────────
// Alle verzekeraars zijn echte bedrijven die in Nederland actief zijn. De
// gegevens zijn kwalitatief en bewust voorzichtig: premies verschillen sterk per
// dier, ras, leeftijd en dekking, dus we verwijzen naar een offerte in plaats
// van een bedrag te noemen dat we niet kunnen garanderen. Wachttijden en
// vergoedingen verschillen per polis, dus controleer altijd de voorwaarden.
// `sponsored` markeert een BETAALDE plek en toont een "Gesponsord"-label. Het is
// voor iedereen false tot een partner de positie koopt. De volgorde is redactioneel.
type Insurer = {
  name: string
  slug: string
  initials: string
  color: string
  kind: string
  verdict: string
  tagline: string
  species: string
  reimbursement: string
  waiting: string
  deductible: string
  limit: string
  covered: string[]
  summary: string
  pros: string[]
  cons: string[]
  claimMethod: string
  extras: string[]
  idealFor: string
  url: string
  sponsored: boolean
}

const INSURERS: Insurer[] = [
  {
    name: 'Figo', slug: 'nl-figo', initials: 'Fi', color: '#16a34a',
    kind: 'Digitale verzekeraar', verdict: 'Testwinnaar',
    tagline: 'Beste uit onderzoek voor hond én kat, zonder leeftijdsgrens',
    species: 'Honden en katten', reimbursement: '50%, 70% of 90% (zelf te kiezen)',
    waiting: 'Doorgaans circa 1 maand (ongeval vaak direct)',
    deductible: 'Eigen risico van €0 tot €500', limit: 'Verzekerd bedrag naar keuze',
    covered: ['Ongeval en ziekte', 'Erfelijke aandoeningen in de basis', 'Geen leeftijdsgrens'],
    summary: 'Figo komt in onafhankelijk onderzoek (Keuze.nl 2026) als beste uit de bus voor zowel hond als kat. Het is de enige van de onderzochte verzekeraars zonder leeftijdsgrens die erfelijke aandoeningen, heup- en elleboogproblemen en kankerbehandeling standaard in de basis dekt. Je kiest zelf je vergoeding (50%, 70% of 90%) en eigen risico (€0 tot €500), en alles regel je digitaal.',
    pros: ['Beste uit onafhankelijk onderzoek voor hond én kat', 'Geen leeftijdsgrens, erfelijke aandoeningen in de basis', 'Zelf vergoeding en eigen risico kiezen'],
    cons: ['Premie hangt sterk af van ras en leeftijd', 'Lees de voorwaarden over de wachttijd goed'],
    claimMethod: 'Je uploadt de dierenartsnota in de app; je krijgt je gekozen vergoeding terug na aftrek van het eigen risico.',
    extras: ['App', 'Geen leeftijdsgrens', 'Erfelijke dekking in de basis'],
    idealFor: 'Wie de breedste dekking zonder leeftijdsgrens wil.',
    url: 'https://www.figopet.nl', sponsored: false,
  },
  {
    name: 'Univé', slug: 'nl-unive', initials: 'Un', color: '#e2001a',
    kind: 'Coöperatieve verzekeraar', verdict: 'Sterk voor honden',
    tagline: 'In onafhankelijk onderzoek de beste tweede voor honden',
    species: 'Honden en katten', reimbursement: 'Per dekking',
    waiting: 'Per polis (ongeval vaak direct)',
    deductible: 'Per dekking', limit: 'Verzekerd bedrag per polis',
    covered: ['Ongeval en ziekte', 'Coöperatieve verzekeraar', 'Sterk voor honden'],
    summary: 'Univé, een coöperatieve verzekeraar, komt in het Keuze.nl-onderzoek 2026 naar voren als de beste tweede voor honden. Let op: Univé verzekert geen kortsnuitige (brachycefale) honden, dus voor een Franse Bulldog of Mopshond is het geen optie. Voor andere honden een solide keuze met de betrokkenheid van een coöperatie.',
    pros: ['Beste tweede voor honden in onafhankelijk onderzoek', 'Coöperatieve verzekeraar met lokale betrokkenheid', 'Brede dekking voor de meeste honden'],
    cons: ['Verzekert geen kortsnuitige (brachycefale) honden', 'Voor katten minder sterk in het onderzoek'],
    claimMethod: 'Je dient de nota online of in de app in en krijgt de vergoeding volgens je dekking terug.',
    extras: ['Coöperatie', 'Lokale winkels', 'Brede dekking'],
    idealFor: 'Hondenbezitters (geen kortsnuitige rassen) die een coöperatie waarderen.',
    url: 'https://www.unive.nl/huisdierenverzekering', sponsored: false,
  },
  {
    name: 'OHRA', slug: 'nl-ohra', initials: 'OH', color: '#ff6900',
    kind: 'Directe verzekeraar', verdict: 'Sterk voor katten',
    tagline: 'In onafhankelijk onderzoek de beste tweede voor katten',
    species: 'Honden en katten', reimbursement: 'Per dekking',
    waiting: 'Per polis (ongeval vaak direct)',
    deductible: 'Let op: eigen bijdrage én eigen risico mogelijk', limit: 'Verzekerd bedrag per polis',
    covered: ['Ongeval en ziekte', 'Sterk voor katten', 'Direct te regelen'],
    summary: 'OHRA komt in het Keuze.nl-onderzoek 2026 naar voren als de beste tweede voor katten. Een aandachtspunt is dat OHRA een eigen bijdrage én een eigen risico kan stapelen, wat de uiteindelijke kosten bij een schade verhoogt. Reken dus goed door wat je zelf betaalt voordat je afsluit.',
    pros: ['Beste tweede voor katten in onafhankelijk onderzoek', 'Bekende, direct te regelen verzekeraar', 'Brede ziektedekking'],
    cons: ['Kan eigen bijdrage én eigen risico stapelen', 'Reken je werkelijke kosten bij schade goed door'],
    claimMethod: 'Je dient de nota online in; de vergoeding volgt op je dekking, minus eventuele eigen bijdrage en eigen risico.',
    extras: ['Direct verzekeraar', 'Brede ziektedekking', 'Online beheer'],
    idealFor: 'Kattenbezitters die een bekende directe verzekeraar willen.',
    url: 'https://www.ohra.nl/huisdierenverzekering', sponsored: false,
  },
  {
    name: 'InShared', slug: 'nl-inshared', initials: 'In', color: '#e40046',
    kind: 'Digitale verzekeraar', verdict: 'Flexibel, voordelig voor katten',
    tagline: 'Flexibele, scherp geprijsde dekking, vooral voordelig voor katten',
    species: 'Honden en katten', reimbursement: 'Per dekking',
    waiting: 'Per polis (ongeval vaak direct)',
    deductible: 'Per dekking', limit: 'Verzekerd bedrag naar keuze',
    covered: ['Ongeval en ziekte', 'Voordelig voor katten', '100% online'],
    summary: 'InShared is een digitale verzekeraar met flexibele, scherp geprijsde dekkingen, vooral voordelig voor katten. Voor honden valt het vaak duurder uit, en InShared verzekert geen bulldogs, dus kortsnuitige honden kunnen beter verder kijken. Alles regel je online, zonder tussenpersoon.',
    pros: ['Flexibel en scherp geprijsd', 'Vooral voordelig voor katten', 'Volledig online te regelen'],
    cons: ['Voor honden vaak duurder', 'Verzekert geen bulldogs'],
    claimMethod: 'Je regelt en declareert alles online; de vergoeding volgt op je gekozen dekking.',
    extras: ['100% online', 'Flexibele dekking', 'Scherpe kattenpremie'],
    idealFor: 'Kattenbezitters die een voordelige, digitale polis willen.',
    url: 'https://www.inshared.nl/dierenverzekering', sponsored: false,
  },
  {
    name: 'a.s.r.', slug: 'nl-asr', initials: 'as', color: '#43b02a',
    kind: 'Grote verzekeraar', verdict: 'Grote verzekeraar',
    tagline: 'Dierenverzekering van een van de grootste Nederlandse verzekeraars',
    species: 'Honden en katten', reimbursement: 'Per dekking',
    waiting: 'Per polis (ongeval vaak direct)',
    deductible: 'Per dekking', limit: 'Verzekerd bedrag per polis',
    covered: ['Ongeval en ziekte', 'Grote verzekeraar', 'Solide dekking'],
    summary: 'a.s.r. is een van de grootste Nederlandse verzekeraars en biedt een dierenverzekering voor hond en kat. Voor wie de zekerheid van een grote, gevestigde partij zoekt is het een logische keuze, al scoorde a.s.r. in het Keuze.nl-onderzoek 2026 niet als hoogste. Vergelijk daarom de dekking goed met de testwinnaars.',
    pros: ['Een van de grootste Nederlandse verzekeraars', 'Solide, gevestigde partij', 'Brede dekking voor hond en kat'],
    cons: ['Niet de hoogste score in onafhankelijk onderzoek', 'Vergelijk de voorwaarden per dekking'],
    claimMethod: 'Je dient de nota online in en krijgt de vergoeding volgens je dekking.',
    extras: ['Grote verzekeraar', 'Solide dekking', 'Online beheer'],
    idealFor: 'Wie de zekerheid van een grote verzekeraar vooropstelt.',
    url: 'https://www.asr.nl', sponsored: false,
  },
  {
    name: 'Nationale-Nederlanden', slug: 'nl-nn', initials: 'NN', color: '#ea650d',
    kind: 'Grote bank-verzekeraar', verdict: 'Grote verzekeraar',
    tagline: 'Huisdierenverzekering van een grote, vertrouwde partij',
    species: 'Honden en katten', reimbursement: 'Per dekking',
    waiting: 'Per polis (ongeval vaak direct)',
    deductible: 'Per dekking', limit: 'Verzekerd bedrag per polis',
    covered: ['Ongeval en ziekte', 'Grote verzekeraar', 'Verzekeringen bundelen'],
    summary: 'Nationale-Nederlanden, een grote verzekeraar en bank-verzekeraar, biedt een huisdierenverzekering voor hond en kat. Interessant als je je verzekeringen wilt bundelen bij één grote, vertrouwde partij met een breed productaanbod en persoonlijk advies.',
    pros: ['Grote, vertrouwde verzekeraar', 'Verzekeringen bundelen mogelijk', 'Persoonlijk advies beschikbaar'],
    cons: ['Niet gespecialiseerd in huisdieren', 'Vergelijk premie en dekking goed'],
    claimMethod: 'Je dient de nota in via je account of adviseur; de vergoeding volgt op je dekking.',
    extras: ['Groot aanbod', 'Bundelvoordeel', 'Persoonlijk advies'],
    idealFor: 'Wie zijn verzekeringen bij één grote partij wil bundelen.',
    url: 'https://www.nn.nl', sponsored: false,
  },
  {
    name: 'Centraal Beheer', slug: 'nl-centraalbeheer', initials: 'CB', color: '#5b2d8e',
    kind: 'Breed, vertrouwd merk', verdict: 'Vertrouwd merk',
    tagline: 'Dierenverzekering van een breed en vertrouwd merk',
    species: 'Honden en katten', reimbursement: 'Per dekking',
    waiting: 'Per polis (ongeval vaak direct)',
    deductible: 'Per dekking', limit: 'Verzekerd bedrag per polis',
    covered: ['Ongeval en ziekte', 'Vertrouwd merk', 'Verzekeringen bundelen'],
    summary: 'Centraal Beheer ("Even Apeldoorn bellen") is een breed en vertrouwd merk dat ook een dierenverzekering voor hond en kat biedt. Aantrekkelijk als je meerdere verzekeringen onder één dak wilt en waarde hecht aan een bekende naam met goede service.',
    pros: ['Breed en vertrouwd merk', 'Meerdere verzekeringen onder één dak', 'Bekende service'],
    cons: ['Niet gespecialiseerd in huisdieren', 'Vergelijk de dekking met specialisten'],
    claimMethod: 'Je dient de nota online in; de vergoeding volgt op je dekking.',
    extras: ['Vertrouwd merk', 'Bundelvoordeel', 'Online beheer'],
    idealFor: 'Wie een bekend merk en gemak onder één dak wil.',
    url: 'https://www.centraalbeheer.nl', sponsored: false,
  },
  {
    name: 'FBTO', slug: 'nl-fbto', initials: 'FB', color: '#e6007e',
    kind: 'Directe verzekeraar', verdict: 'Modulair en direct',
    tagline: 'Directe verzekeraar waarbij je zelf je dekking samenstelt',
    species: 'Honden en katten', reimbursement: 'Per dekking',
    waiting: 'Per polis (ongeval vaak direct)',
    deductible: 'Per dekking', limit: 'Verzekerd bedrag naar keuze',
    covered: ['Ongeval en ziekte', 'Zelf modules kiezen', 'Direct te regelen'],
    summary: 'FBTO (onderdeel van Achmea) is een directe verzekeraar waarbij je zelf modules kiest, zodat je de dekking afstemt op je dier en budget. Alles regel je online, zonder tussenpersoon, met de zekerheid van een grote verzekeraar achter de schermen.',
    pros: ['Zelf je dekking samenstellen met modules', 'Directe verzekeraar, zonder tussenpersoon', 'Onderdeel van het grote Achmea'],
    cons: ['Geen persoonlijk advies op kantoor', 'Stel je modules zorgvuldig samen'],
    claimMethod: 'Je declareert online; de vergoeding volgt op de modules die je hebt gekozen.',
    extras: ['Modulair', 'Direct verzekeraar', 'Online beheer'],
    idealFor: 'Wie zelf de dekking wil samenstellen en digitaal regelt.',
    url: 'https://www.fbto.nl', sponsored: false,
  },
  {
    name: 'Interpolis', slug: 'nl-interpolis', initials: 'Ip', color: '#0a4ea2',
    kind: 'Grote verzekeraar (Achmea)', verdict: 'Glasheldere voorwaarden',
    tagline: 'Grote verzekeraar die bekendstaat om heldere voorwaarden',
    species: 'Honden en katten', reimbursement: 'Per dekking',
    waiting: 'Per polis (ongeval vaak direct)',
    deductible: 'Per dekking', limit: 'Verzekerd bedrag per polis',
    covered: ['Ongeval en ziekte', 'Heldere voorwaarden', 'Grote verzekeraar'],
    summary: 'Interpolis, een grote verzekeraar van Achmea, staat bekend om heldere voorwaarden ("glashelder") en biedt een dierenverzekering voor hond en kat met het gemak en de zekerheid van een grote partij. Een geruststellende keuze voor wie waarde hecht aan duidelijkheid.',
    pros: ['Bekend om heldere, duidelijke voorwaarden', 'Grote, solide verzekeraar', 'Gemak en zekerheid'],
    cons: ['Niet gespecialiseerd in huisdieren', 'Vergelijk premie en dekking'],
    claimMethod: 'Je dient de nota online of via je adviseur in; de vergoeding volgt op je dekking.',
    extras: ['Heldere voorwaarden', 'Grote verzekeraar', 'Online beheer'],
    idealFor: 'Wie duidelijkheid en de zekerheid van een grote partij wil.',
    url: 'https://www.interpolis.nl', sponsored: false,
  },
  {
    name: 'PetSecur', slug: 'nl-petsecur', initials: 'PS', color: '#1f9e8a',
    kind: 'Gespecialiseerde verzekeraar', verdict: 'Scherp geprijsd',
    tagline: 'Gespecialiseerde, vaak voordeligste hondenverzekering in vergelijkers',
    species: 'Honden en katten', reimbursement: 'Per dekking',
    waiting: 'Per polis (ongeval vaak direct)',
    deductible: 'Per dekking', limit: 'Verzekerd bedrag per polis',
    covered: ['Ongeval en ziekte', 'Scherp geprijsd', 'Online te regelen'],
    summary: 'PetSecur is een op huisdieren gerichte verzekeraar die in vergelijkers regelmatig als voordeligste hondenverzekering naar voren komt. Een scherpe optie om de basis te dekken; vergelijk wel het maximale vergoedingsbedrag en de wachttijd met de bredere polissen.',
    pros: ['Vaak de voordeligste hondenverzekering in vergelijkers', 'Op huisdieren gespecialiseerd', 'Online te regelen'],
    cons: ['Minder naamsbekendheid dan de grote merken', 'Vergelijk maximale vergoeding en wachttijd'],
    claimMethod: 'Je declareert online; de vergoeding volgt op je dekking, tot het maximale vergoedingsbedrag.',
    extras: ['Scherpe premie', 'Specialist', 'Online beheer'],
    idealFor: 'Wie de basis zo voordelig mogelijk wil dekken.',
    url: 'https://www.petsecur.nl', sponsored: false,
  },
]

const BEST_FOR: Array<{ icon: string; label: string; pick: string; why: string }> = [
  { icon: '🏆', label: 'Beste algemeen', pick: 'Figo', why: 'Testwinnaar voor hond én kat, zonder leeftijdsgrens.' },
  { icon: '🐕', label: 'Beste voor honden', pick: 'Univé', why: 'In onafhankelijk onderzoek de beste tweede voor honden.' },
  { icon: '🐈', label: 'Beste voor katten', pick: 'OHRA', why: 'In onafhankelijk onderzoek de beste tweede voor katten.' },
  { icon: '💶', label: 'Scherpst geprijsd', pick: 'PetSecur', why: 'Vaak de voordeligste hondenverzekering in vergelijkers.' },
  { icon: '🧩', label: 'Zelf samenstellen', pick: 'FBTO', why: 'Modulair: je kiest zelf je dekking en budget.' },
  { icon: '🛡️', label: 'Grote verzekeraar', pick: 'a.s.r.', why: 'De zekerheid van een van de grootste verzekeraars.' },
]

const CHOOSE_STEPS: Array<{ title: string; text: string }> = [
  { title: 'Bepaal je maandbudget', text: 'Premies lopen van ongeveer €10 per maand voor een kat tot €45+ voor een hond. Een bandbreedte kiezen schrapt al de helft van de opties.' },
  { title: 'Kijk naar het verzekerd bedrag per jaar', text: 'Dit is het maximum dat je per jaar vergoed krijgt. Eén operatie kan dit snel bereiken, dus mik hoog voor een groot of risicovol dier.' },
  { title: 'Vergelijk vergoeding en eigen risico', text: 'Je kiest vaak 50%, 70% of 90% vergoeding en een eigen risico (bij Figo €0 tot €500). Let op verzekeraars die eigen bijdrage én eigen risico stapelen (zoals OHRA).' },
  { title: 'Controleer de wachttijd', text: 'In de wachttijd betaal je al, maar krijg je nog niets vergoed. Vaak circa een maand, bij ongeval meestal direct, bij sommige aandoeningen langer.' },
  { title: 'Lees de uitsluitingen en de rasacceptatie', text: 'Bestaande aandoeningen zijn altijd uitgesloten. Let ook op kortsnuitige rassen: Univé en InShared weigeren brachycefale honden/bulldogs.' },
]

const COVERED: string[] = [
  'Dierenartsbezoek bij ongeval en ziekte',
  'Operaties en opname',
  'Diagnostiek (röntgen, echo, bloedonderzoek, MRI)',
  'Voorgeschreven medicijnen',
  'Kankerbehandeling en chronische aandoeningen',
  'Erfelijke aandoeningen bij sommige polissen (standaard bij Figo)',
]
const EXCLUDED: string[] = [
  'Bestaande aandoeningen (klachten van vóór het afsluiten of in de wachttijd)',
  'Kosten tijdens de wachttijd',
  'Fokken, dracht en geboorte, tenzij apart meeverzekerd',
  'Cosmetische of niet-medisch noodzakelijke ingrepen',
  'Eigen bijdrage en eigen risico bij sommige polissen',
]

const CLAIM_STEPS: Array<{ title: string; text: string }> = [
  { title: 'Je gaat naar de dierenarts', text: 'Je betaalt de nota en bewaart de gespecificeerde rekening (bij een eerste ziekteclaim ook het dossier).' },
  { title: 'Je dient de nota in', text: 'Via de app of je account, in enkele minuten. Digitale verzekeraars accepteren een foto van de nota.' },
  { title: 'Je krijgt de vergoeding', text: 'Je ontvangt je gekozen vergoeding (50% tot 90%), na aftrek van het eigen risico, tot het verzekerd bedrag, meestal binnen enkele dagen.' },
  { title: 'Let op de eigen bijdrage', text: 'Sommige verzekeraars rekenen naast het eigen risico een eigen bijdrage per nota; dat verlaagt je uitkering.' },
]

const PROFILE_ROWS: Array<{ profile: string; need: string; suggestion: string }> = [
  { profile: 'Pup of kitten', need: 'Vroeg afsluiten voor lage premie en geen uitsluitingen', suggestion: 'Figo, Univé of InShared' },
  { profile: 'Ouder dier', need: 'Geen of ruime leeftijdsgrens', suggestion: 'Figo (geen leeftijdsgrens)' },
  { profile: 'Kortsnuitig ras', need: 'Verzekeraar die brachycefale honden accepteert', suggestion: 'Figo of OHRA (Univé/InShared weigeren)' },
  { profile: 'Kat', need: 'Scherpe premie, brede ziektedekking', suggestion: 'OHRA, InShared of Figo' },
  { profile: 'Krap budget', need: 'Lage premie, basisdekking', suggestion: 'PetSecur of InShared' },
  { profile: 'Grote of risicovolle hond', need: 'Hoog verzekerd bedrag, erfelijke dekking', suggestion: 'Figo (erfelijk in de basis)' },
]

const MISTAKES: string[] = [
  'Wachten tot het dier ziek is: bestaande aandoeningen worden nooit vergoed.',
  'Alleen op de maandpremie letten, zonder verzekerd bedrag en eigen risico te checken.',
  'De wachttijd vergeten en denken dat je direct gedekt bent.',
  'De eigen bijdrage over het hoofd zien, die naast het eigen risico je uitkering verlaagt.',
  'Het verzekerd bedrag onderschatten voor een groot ras, waarbij één operatie het opmaakt.',
]

const GLOSSARY: Array<{ term: string; def: string }> = [
  { term: 'Vergoedingspercentage', def: 'Het deel van de dierenartskosten dat je terugkrijgt, vaak 50%, 70% of 90% naar keuze.' },
  { term: 'Eigen risico', def: 'Het bedrag dat je per jaar zelf betaalt voordat de vergoeding begint. Bij Figo te kiezen tussen €0 en €500.' },
  { term: 'Eigen bijdrage', def: 'Een extra deel dat je per nota zelf betaalt, naast het eigen risico. Sommige verzekeraars (zoals OHRA) stapelen beide.' },
  { term: 'Verzekerd bedrag per jaar', def: 'Het maximum dat de polis per jaar uitkeert. Daarboven zijn de kosten voor jou.' },
  { term: 'Wachttijd', def: 'De periode na het afsluiten waarin je al betaalt, maar nog niets vergoed krijgt. Vaak circa een maand, bij ongeval meestal direct.' },
  { term: 'Bestaande aandoening', def: 'Een aandoening met klachten van vóór het afsluiten of in de wachttijd. Altijd uitgesloten.' },
  { term: 'Erfelijke aandoening', def: 'Een aandoening die met het ras samenhangt (zoals heup- of elleboogdysplasie). Niet elke polis dekt dit; Figo doet het standaard.' },
  { term: 'Aanvullende/preventieve dekking', def: 'Optionele dekking voor niet-ziektekosten zoals vaccinaties, gebitsreiniging of castratie.' },
]

const PRICE_ROWS: Array<{ profile: string; range: string; note: string }> = [
  { profile: 'Kat', range: 'ongeveer €10 tot €25 / maand', note: 'Katten claimen minder en zijn goedkoper dan honden.' },
  { profile: 'Hond', range: 'ongeveer €20 tot €45+ / maand', note: 'Stijgt sterk met ras, grootte en leeftijd.' },
  { profile: 'Hoog verzekerd bedrag', range: 'hogere premie', note: 'Een hoger jaarmaximum en 90% vergoeding kosten meer.' },
  { profile: 'Kortsnuitig ras', range: 'vaak duurder of geweigerd', note: 'Brachycefale honden betalen meer; sommige verzekeraars weigeren ze.' },
]

const VET_COSTS: Array<{ act: string; cost: string }> = [
  { act: 'Consult', cost: '€30 tot €55' },
  { act: 'Röntgen of echo', cost: '€75 tot €250' },
  { act: 'Kruisbandoperatie', cost: '€1.500 tot €3.000' },
  { act: 'Kankerbehandeling of grote operatie', cost: '€2.000 tot €6.000+' },
]

const FAQ: Array<{ q: string; a: string }> = [
  { q: 'Wat is de beste huisdierenverzekering in 2026?', a: 'Er is geen universeel beste polis: het hangt af van je dier, budget en wensen. In onafhankelijk onderzoek (Keuze.nl 2026) komt Figo als beste uit de bus voor zowel hond als kat, met als enige geen leeftijdsgrens en erfelijke aandoeningen in de basis. Univé is de beste tweede voor honden, OHRA voor katten, en PetSecur is vaak het voordeligst.' },
  { q: 'Wat kost een huisdierenverzekering?', a: 'Een kattenpolis kost grofweg €10 tot €25 per maand en een hondenpolis ongeveer €20 tot €45+. De premie hangt af van soort, ras, leeftijd, je postcode en het gekozen eigen risico en verzekerd bedrag.' },
  { q: 'Wat is een wachttijd?', a: 'De periode na het afsluiten waarin je al betaalt, maar nog geen vergoeding krijgt. Vaak is dit circa een maand, bij een ongeval meestal direct dekking, en bij sommige aandoeningen langer.' },
  { q: 'Worden bestaande aandoeningen vergoed?', a: 'Nee. Aandoeningen met klachten van vóór het afsluiten of in de wachttijd zijn altijd uitgesloten. Verzeker je dier daarom jong en gezond.' },
  { q: 'Worden erfelijke aandoeningen gedekt?', a: 'Niet bij elke verzekeraar. Volgens Keuze.nl is Figo de enige van de onderzochte verzekeraars die erfelijke aandoeningen, heup- en elleboogproblemen en kankerbehandeling standaard in de basis dekt. Controleer dit expliciet voor rassen met erfelijke risico’s.' },
  { q: 'Op welke leeftijd verzeker ik mijn huisdier?', a: 'Zo vroeg mogelijk. De premie is dan het laagst en de kans op uitsluiting door een bestaande aandoening het kleinst. Veel verzekeraars hanteren een maximale leeftijd bij afsluiten; Figo heeft geen leeftijdsgrens.' },
  { q: 'Dekt de verzekering vaccinaties of castratie?', a: 'Niet in de basis: dat is preventieve zorg. Het valt alleen onder een aanvullende of preventiemodule, die sommige verzekeraars apart aanbieden.' },
  { q: 'En als ik met mijn huisdier naar het buitenland reis?', a: 'Sommige polissen vergoeden dierenartskosten tijdens een verblijf in de EU, maar niet alle. Controleer de dekking voor het buitenland in de voorwaarden. De verzekering vervangt geen reisdocumenten: een Europees dierenpaspoort en een geldige rabiësvaccinatie blijven verplicht.' },
]

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale !== 'nl') notFound()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Beste huisdierenverzekering 2026',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: INSURERS.length,
    itemListElement: INSURERS.map((ins, i) => ({ '@type': 'ListItem', position: i + 1, name: ins.name, url: ins.url })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Beste huisdierenverzekering 2026: hond & kat vergelijken',
    inLanguage: 'nl',
    datePublished: '2026-11-12',
    dateModified: '2026-11-12',
    author: { '@type': 'Person', name: 'Jean-Baptiste Manson', jobTitle: 'Founder & Editor', url: `${SITE_URL}/nl/about` },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets.com', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/nl/${SLUG}`,
  }

  return (
    <main className="min-h-screen bg-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-electric text-white">
        <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <nav className="text-sm text-white/70 mb-6">
            <Link href="/nl" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Dierenverzekering</span>
          </nav>
          <span className="eyebrow inline-block bg-lime text-ink border-[1.6px] border-ink rounded-full px-3 py-1.5 mb-5">
            Onafhankelijke vergelijking · bijgewerkt in {UPDATED}
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold leading-[1.05] mb-5 max-w-3xl">
            Beste huisdierenverzekering 2026
          </h1>
          <p className="text-lg text-white/85 max-w-2xl mb-8">
            De complete gids voor de dierenverzekering voor hond en kat in Nederland:
            dekking, vergoeding, eigen risico, wachttijden, prijzen en uitsluitingen van
            de 10 belangrijkste verzekeraars, plus hoe je kiest zonder spijt.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/85">
            <span><strong className="text-white text-lg">10</strong> verzekeraars vergeleken</span>
            <span><strong className="text-white text-lg">6</strong> objectieve criteria</span>
            <span><strong className="text-white text-lg">0</strong> verzonnen reviews, alles gecontroleerd</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        {/* ── Intro ── */}
        <section className="prose-none">
          <p className="text-slate leading-relaxed mb-4">
            Steeds meer Nederlanders verzekeren hun huisdier, en niet voor niets: de dierenartskosten
            stijgen en één operatie kan meer kosten dan jaren aan premie. Een dierenverzekering doet
            precies één ding goed: ze verandert een onvoorspelbare, mogelijk hoge rekening in een
            voorspelbare maandpremie.
          </p>
          <p className="text-slate leading-relaxed">
            De markt bestaat uit digitale verzekeraars (Figo, InShared), grote partijen (a.s.r.,
            Nationale-Nederlanden, Centraal Beheer, Interpolis, FBTO) en specialisten (PetSecur). Dit
            is onze complete vergelijking om de juiste te vinden.
          </p>
        </section>

        {/* ── Comparison table ── */}
        <section id="vergelijkingstabel" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-ink mb-2">De vergelijkingstabel 2026</h2>
          <p className="text-sm text-slate mb-5">De 10 belangrijkste dierenverzekeraars in Nederland, gerangschikt volgens onze redactionele beoordeling van dekking, prijs en gebruikservaring. Klik op een verzekeraar om het profiel te openen.</p>
          <div className="overflow-x-auto rounded-[22px] border-[1.6px] border-ink shadow-hard">
            <table className="w-full text-sm min-w-[760px] bg-white">
              <thead className="bg-lavender-soft text-slate">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold w-8">#</th>
                  <th className="text-left px-4 py-3 font-semibold">Verzekeraar</th>
                  <th className="text-left px-4 py-3 font-semibold">Sterke punten</th>
                  <th className="text-left px-4 py-3 font-semibold">Vergoeding</th>
                  <th className="text-left px-4 py-3 font-semibold">Wachttijd</th>
                </tr>
              </thead>
              <tbody>
                {INSURERS.map((ins, i) => (
                  <tr key={ins.name} className="border-t border-line align-top hover:bg-cream">
                    <td className="px-4 py-4 font-bold text-slate">{i + 1}</td>
                    <td className="px-4 py-4">
                      <a href={`#profiel-${ins.slug}`} className="flex items-center gap-2.5 group">
                        <BrandLogo src={`/logos/${ins.slug}.png`} name={ins.name} initials={ins.initials} color={ins.color} size={36} />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-ink group-hover:text-electric group-hover:underline">{ins.name}</span>
                            {ins.sponsored && (<span className="text-[10px] font-semibold bg-coral/25 text-ink border border-ink/20 px-1.5 py-0.5 rounded-full">Gesponsord</span>)}
                          </div>
                          <span className="text-xs font-medium text-electric">{ins.verdict}</span>
                          <span className="block text-[11px] text-slate group-hover:text-electric">Profiel bekijken ↓</span>
                        </div>
                      </a>
                    </td>
                    <td className="px-4 py-4 text-slate">{ins.covered.join(' · ')}</td>
                    <td className="px-4 py-4 text-slate">{ins.reimbursement}</td>
                    <td className="px-4 py-4 text-slate">{ins.waiting}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate mt-3">Gegevens zijn indicatief, bijgewerkt in {UPDATED}. Wachttijden en vergoedingen verschillen per polis. De exacte premie hangt af van je dier, ras, leeftijd en dekking: vraag een offerte aan en lees de voorwaarden voordat je afsluit.</p>
        </section>

        {/* ── Detailed ranking cards ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">De uitgebreide ranglijst</h2>
          <div className="space-y-4">
            {INSURERS.map((ins, i) => (
              <article key={ins.name} id={`profiel-${ins.slug}`} className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-5 sm:p-6 scroll-mt-6">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center flex-shrink-0 gap-1">
                    <span className="text-xs font-bold text-slate">#{i + 1}</span>
                    <BrandLogo src={`/logos/${ins.slug}.png`} name={ins.name} initials={ins.initials} color={ins.color} size={48} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <h3 className="text-lg font-bold text-ink">{ins.name}</h3>
                      <span className="text-xs font-semibold bg-lavender-soft text-electric border border-ink/20 px-2 py-0.5 rounded-full">{ins.verdict}</span>
                      {ins.sponsored && (<span className="text-xs font-semibold bg-coral/25 text-ink border border-ink/20 px-2 py-0.5 rounded-full">Gesponsord</span>)}
                      <a href="#vergelijkingstabel" className="ml-auto text-xs text-slate hover:text-electric whitespace-nowrap">↑ tabel</a>
                    </div>
                    <p className="text-sm text-slate">{ins.kind}</p>
                    <p className="text-[13px] font-semibold text-slate mt-1">{ins.tagline}</p>
                  </div>
                </div>

                <p className="text-sm text-slate leading-relaxed mt-4">{ins.summary}</p>

                <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm mt-4 border-t border-line pt-4">
                  <div><dt className="font-semibold text-ink">Dieren</dt><dd className="text-slate">{ins.species}</dd></div>
                  <div><dt className="font-semibold text-ink">Vergoeding</dt><dd className="text-slate">{ins.reimbursement}</dd></div>
                  <div><dt className="font-semibold text-ink">Eigen risico</dt><dd className="text-slate">{ins.deductible}</dd></div>
                  <div><dt className="font-semibold text-ink">Verzekerd bedrag</dt><dd className="text-slate">{ins.limit}</dd></div>
                  <div className="sm:col-span-2"><dt className="font-semibold text-ink">Wachttijd</dt><dd className="text-slate">{ins.waiting}</dd></div>
                </dl>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {ins.covered.map((c) => (<span key={c} className="text-xs bg-lime/30 text-ink border border-ink/20 px-2 py-0.5 rounded-full">✓ {c}</span>))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div className="bg-lime/30 border border-ink/20 rounded-xl p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-ink mb-2">Sterke punten</p>
                    <ul className="space-y-1.5 text-sm text-slate">
                      {ins.pros.map((p) => (<li key={p} className="flex gap-2"><span className="text-ink flex-shrink-0">✓</span><span>{p}</span></li>))}
                    </ul>
                  </div>
                  <div className="bg-coral/25 border border-ink/20 rounded-xl p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-ink mb-2">Let op</p>
                    <ul className="space-y-1.5 text-sm text-slate">
                      {ins.cons.map((c) => (<li key={c} className="flex gap-2"><span className="text-ink flex-shrink-0">!</span><span>{c}</span></li>))}
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-slate leading-relaxed mt-4"><span className="font-semibold text-ink">Zo werkt de vergoeding:</span> {ins.claimMethod}</p>
                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  <span className="text-xs font-semibold text-slate mr-1">Inbegrepen:</span>
                  {ins.extras.map((e) => (<span key={e} className="text-xs bg-lavender-soft text-electric border border-ink/20 px-2 py-0.5 rounded-full">{e}</span>))}
                </div>
                <p className="text-sm text-slate leading-relaxed mt-3"><span className="font-semibold text-ink">Ideaal voor:</span> {ins.idealFor}</p>

                <a href={ins.url} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-1.5 text-sm font-bold text-white px-4 py-2 rounded-lg transition-opacity hover:opacity-90 mt-4" style={{ backgroundColor: ins.color }}>
                  {ins.name} bekijken en offerte aanvragen →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ── Best-for ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-2">Kort gezegd: de beste voor jouw situatie</h2>
          <p className="text-sm text-slate mb-5">Een snel overzicht. Klik op een verzekeraar om het profiel te openen.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BEST_FOR.map((b) => {
              const match = INSURERS.find((x) => x.name === b.pick)
              return (
                <div key={b.label} className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-5">
                  <div className="text-2xl mb-2" aria-hidden="true">{b.icon}</div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate mb-1">{b.label}</p>
                  {match ? (
                    <a href={`#profiel-${match.slug}`} className="text-lg font-bold text-ink mb-1 inline-block hover:text-electric hover:underline">{b.pick} ↓</a>
                  ) : (
                    <p className="text-lg font-bold text-ink mb-1">{b.pick}</p>
                  )}
                  <p className="text-sm text-slate leading-relaxed">{b.why}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── How to choose ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">In 5 stappen kiezen</h2>
          <ol className="space-y-3">
            {CHOOSE_STEPS.map((s, i) => (
              <li key={i} className="flex items-start gap-4 bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-5">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-electric text-white font-bold flex items-center justify-center">{i + 1}</span>
                <div>
                  <h3 className="font-bold text-ink mb-1">{s.title}</h3>
                  <p className="text-sm text-slate leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Covered / excluded ── */}
        <section className="grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-6">
            <h2 className="text-lg font-bold text-ink mb-3">Wat meestal gedekt is</h2>
            <ul className="space-y-2 text-sm text-slate">
              {COVERED.map((c) => (<li key={c} className="flex gap-2"><span className="text-ink">✓</span><span>{c}</span></li>))}
            </ul>
          </div>
          <div className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-6">
            <h2 className="text-lg font-bold text-ink mb-3">Wat uitgesloten is</h2>
            <ul className="space-y-2 text-sm text-slate">
              {EXCLUDED.map((c) => (<li key={c} className="flex gap-2"><span className="text-ink">✗</span><span>{c}</span></li>))}
            </ul>
          </div>
        </section>

        {/* ── How reimbursement works ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Zo werkt de vergoeding</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CLAIM_STEPS.map((s, i) => (
              <div key={i} className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-5">
                <span className="inline-flex w-8 h-8 rounded-full bg-electric text-white font-bold items-center justify-center mb-3">{i + 1}</span>
                <h3 className="font-bold text-ink mb-1">{s.title}</h3>
                <p className="text-sm text-slate leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Is it worth it ── */}
        <section className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-6">
          <h2 className="text-2xl font-bold text-ink mb-3">Is het de moeite waard?</h2>
          <p className="text-sm text-slate leading-relaxed mb-5">
            Het hangt ervan af hoe je een plotselinge rekening van honderden tot duizenden euro’s zou
            opvangen. Routinebezoeken zijn goedkoop en voorspelbaar, een ongeval of ernstige ziekte niet.
            Dit zijn indicatieve kosten in Nederland zonder verzekering.
          </p>
          <div className="overflow-x-auto rounded-xl border-[1.6px] border-ink">
            <table className="w-full text-sm">
              <thead className="bg-lavender-soft text-slate"><tr><th className="text-left px-4 py-2.5 font-semibold">Behandeling</th><th className="text-left px-4 py-2.5 font-semibold">Indicatieve kosten</th></tr></thead>
              <tbody>
                {VET_COSTS.map((v) => (<tr key={v.act} className="border-t border-line"><td className="px-4 py-2.5 text-slate">{v.act}</td><td className="px-4 py-2.5 font-semibold text-ink">{v.cost}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate leading-relaxed mt-4">
            Als een rekening van duizenden euro’s je budget zou ontwrichten, is een verzekering meestal
            de moeite waard, zeker als je jong afsluit en een lage premie vastlegt voordat er een
            aandoening ontstaat.
          </p>
        </section>

        {/* ── Reimbursement example ── */}
        <section className="bg-lime/30 border border-ink/20 rounded-[22px] p-6">
          <h2 className="text-xl font-bold text-ink mb-3">Een rekenvoorbeeld</h2>
          <p className="text-sm text-slate leading-relaxed mb-4">
            Stel dat je hond zijn kruisband scheurt en de operatie <strong>€2.500</strong> kost.
            Je polis vergoedt 90%, met een eigen risico van €150 (nog niet verbruikt):
          </p>
          <ul className="space-y-2 text-sm text-ink mb-4">
            <li className="flex justify-between gap-4 border-b border-ink/20 pb-2"><span>Dierenartsnota</span><span className="font-semibold">€2.500</span></li>
            <li className="flex justify-between gap-4 border-b border-ink/20 pb-2"><span>Min het eigen risico</span><span className="font-semibold">- €150</span></li>
            <li className="flex justify-between gap-4 border-b border-ink/20 pb-2"><span>90% vergoeding over €2.350</span><span className="font-semibold text-ink">= €2.115 terug</span></li>
            <li className="flex justify-between gap-4"><span>Jouw deel</span><span className="font-semibold">€385</span></li>
          </ul>
          <p className="text-xs text-slate leading-relaxed">
            De berekening verschilt per verzekeraar (eigen risico per jaar of per nota, percentage vóór of na het eigen risico), en sommige rekenen daarnaast een eigen bijdrage. Controleer altijd de voorwaarden.
          </p>
        </section>

        {/* ── Common conditions ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Veelvoorkomende aandoeningen en hun kosten</h2>
          <div className="overflow-x-auto rounded-[22px] border-[1.6px] border-ink shadow-hard">
            <table className="w-full text-sm min-w-[640px] bg-white">
              <thead className="bg-lavender-soft text-slate"><tr><th className="text-left px-4 py-3 font-semibold">Aandoening</th><th className="text-left px-4 py-3 font-semibold">Indicatieve kosten</th><th className="text-left px-4 py-3 font-semibold">Waarom het telt</th></tr></thead>
              <tbody>
                {[
                  { c: 'Kruisbandscheur (operatie)', k: '€1.500 tot €3.000', n: 'Een van de meest voorkomende en dure hondenoperaties; vaak lange wachttijd.' },
                  { c: 'Kanker (diagnose en behandeling)', k: '€2.000 tot €6.000+', n: 'Chemo, operatie en onderzoek lopen over maanden op.' },
                  { c: 'Vreemd voorwerp / darmobstructie (operatie)', k: '€1.500 tot €3.500', n: 'Ingeslikt voorwerp; spoedgeval, meestal onvoorspelbaar.' },
                  { c: 'Diabetes (doorlopend, per jaar)', k: '€800 tot €2.000 / jaar', n: 'Insuline, controles en nazorg levenslang.' },
                  { c: 'Chronische allergieën (per jaar)', k: '€300 tot €900 / jaar', n: 'Veel voorkomend; terugkerende medicatie en speciaal voer.' },
                  { c: 'Spoedbezoek (avond of weekend)', k: '€150 tot €600', n: 'Spoedklinieken rekenen fors meer dan een gewone dierenarts.' },
                ].map((r) => (<tr key={r.c} className="border-t border-line"><td className="px-4 py-3 font-semibold text-ink">{r.c}</td><td className="px-4 py-3 text-ink font-semibold whitespace-nowrap">{r.k}</td><td className="px-4 py-3 text-slate">{r.n}</td></tr>))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── What affects your premium ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Wat je premie beïnvloedt</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { f: 'Soort', t: 'Honden zijn doorgaans duurder te verzekeren dan katten, die minder en goedkoper claimen.' },
              { f: 'Ras', t: 'Grote honden en rassen met bekende risico’s (kortsnuitig, heupdysplasie) betalen meer dan kruisingen; sommige worden geweigerd.' },
              { f: 'Leeftijd', t: 'De premie is het laagst voor pups en kittens en stijgt elk jaar, daarom loont vroeg afsluiten.' },
              { f: 'Postcode', t: 'Dierenartstarieven verschillen per regio, dus hetzelfde dier kost in een dure stad meer.' },
              { f: 'Jouw keuzes', t: 'Een hoger verzekerd bedrag, een hoger vergoedingspercentage en een lager eigen risico verhogen de premie. Dat is de knop voor je budget.' },
            ].map((x) => (
              <div key={x.f} className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-5">
                <h3 className="font-bold text-ink mb-1">{x.f}</h3>
                <p className="text-sm text-slate leading-relaxed">{x.t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Expensive breeds ── */}
        <section className="bg-white border-[1.6px] border-ink rounded-[22px] p-6">
          <h2 className="text-2xl font-bold text-ink mb-3">De duurste rassen om te verzekeren</h2>
          <p className="text-sm text-slate leading-relaxed mb-3">
            Sommige rassen betalen hogere premies omdat ze meer gezondheidsrisico’s hebben. Dat geldt
            voor kortsnuitige (brachycefale) rassen zoals de Franse Bulldog, Mopshond en Engelse Bulldog,
            gevoelig voor ademhalingsproblemen, en voor grote rassen zoals de Duitse Dog, Duitse Herder
            en Labrador, vatbaarder voor heupdysplasie en kruisbandletsel. Sommige verzekeraars (Univé,
            InShared) weigeren kortsnuitige honden zelfs.
          </p>
          <p className="text-sm text-slate leading-relaxed">
            Kies voor deze dieren een hoog verzekerd bedrag en een hoog vergoedingspercentage, en sluit
            jong af: een later ontdekte aanleg kan als bestaande aandoening worden uitgesloten.
          </p>
        </section>

        {/* ── When it might not be worth it ── */}
        <section className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-6">
          <h2 className="text-xl font-bold text-ink mb-3">Wanneer het minder loont</h2>
          <p className="text-sm text-slate leading-relaxed mb-4">
            Een verzekering is niet voor iedereen vanzelfsprekend. Ze loont minder als:
          </p>
          <ul className="space-y-2 text-sm text-slate">
            {[
              'Je een buffer hebt en een onverwachte rekening van €4.000+ makkelijk kunt dragen.',
              'Je dier oud is met meerdere bestaande aandoeningen, die als bestaande aandoening worden uitgesloten.',
              'Je alleen kleine, voorspelbare kosten wilt dekken, die het eigen risico vaak opslokt.',
            ].map((n) => (<li key={n} className="flex gap-2"><span className="text-ink flex-shrink-0">!</span><span>{n}</span></li>))}
          </ul>
          <p className="text-sm text-slate leading-relaxed mt-4">
            Zelfs dan is een jong, gezond dier verzekeren in een voordelige polis een goedkope
            bescherming tegen de ene rekening die je niet kunt voorzien.
          </p>
        </section>

        {/* ── By profile ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Welke verzekeraar per dierprofiel</h2>
          <div className="overflow-x-auto rounded-[22px] border-[1.6px] border-ink shadow-hard">
            <table className="w-full text-sm min-w-[640px] bg-white">
              <thead className="bg-lavender-soft text-slate"><tr><th className="text-left px-4 py-3 font-semibold">Profiel</th><th className="text-left px-4 py-3 font-semibold">Waarop letten</th><th className="text-left px-4 py-3 font-semibold">Goede keuze</th></tr></thead>
              <tbody>
                {PROFILE_ROWS.map((r) => (<tr key={r.profile} className="border-t border-line"><td className="px-4 py-3 font-semibold text-ink">{r.profile}</td><td className="px-4 py-3 text-slate">{r.need}</td><td className="px-4 py-3 text-electric font-medium">{r.suggestion}</td></tr>))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Wat het per maand kost</h2>
          <div className="overflow-x-auto rounded-[22px] border-[1.6px] border-ink shadow-hard">
            <table className="w-full text-sm min-w-[640px] bg-white">
              <thead className="bg-lavender-soft text-slate"><tr><th className="text-left px-4 py-3 font-semibold">Type</th><th className="text-left px-4 py-3 font-semibold">Indicatieve prijs</th><th className="text-left px-4 py-3 font-semibold">Toelichting</th></tr></thead>
              <tbody>
                {PRICE_ROWS.map((r) => (<tr key={r.profile} className="border-t border-line"><td className="px-4 py-3 font-semibold text-ink">{r.profile}</td><td className="px-4 py-3 text-ink font-semibold whitespace-nowrap">{r.range}</td><td className="px-4 py-3 text-slate">{r.note}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate mt-3">Alleen indicatief. Je premie hangt af van soort, ras, leeftijd, postcode en gekozen dekking.</p>
        </section>

        {/* ── Mistakes ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Fouten om te vermijden</h2>
          <ul className="space-y-3">
            {MISTAKES.map((m, i) => (
              <li key={i} className="flex items-start gap-3 bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-4">
                <span className="text-ink font-bold flex-shrink-0">✗</span>
                <span className="text-sm text-slate leading-relaxed">{m}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Glossary ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Begrippenlijst</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-5">
                <h3 className="font-bold text-ink mb-1">{g.term}</h3>
                <p className="text-sm text-slate leading-relaxed">{g.def}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Travel ── */}
        <section className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-6">
          <h2 className="text-xl font-bold text-ink mb-3">Op reis met je huisdier</h2>
          <p className="text-sm text-slate leading-relaxed">
            Sommige polissen vergoeden dierenartskosten tijdens een verblijf in de EU, maar niet alle,
            dus controleer de buitenlanddekking voor vertrek. De verzekering vervangt geen reisdocumenten:
            een Europees dierenpaspoort en een geldige rabiësvaccinatie blijven verplicht om de grens over
            te gaan.
          </p>
        </section>

        {/* ── Verdict ── */}
        <section className="bg-electric text-white rounded-[22px] p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-3">Ons oordeel</h2>
          <p className="text-white/85 leading-relaxed">
            Voor de meesten biedt Figo de sterkste combinatie: testwinnaar voor hond én kat, zonder
            leeftijdsgrens en met erfelijke aandoeningen in de basis. Univé is sterk voor honden, OHRA
            voor katten, en PetSecur vaak het voordeligst. Grote partijen als a.s.r., Nationale-Nederlanden,
            Centraal Beheer en Interpolis geven zekerheid en gemak. Wat je ook kiest: verzeker jong en
            gezond, mik op een hoog verzekerd bedrag en lees eerst de wachttijden en uitsluitingen.
          </p>
        </section>

        {/* ── Methodology ── */}
        <section className="bg-white border-[1.6px] border-ink rounded-[22px] p-6">
          <h2 className="text-xl font-bold text-ink mb-3">Onze methode</h2>
          <p className="text-sm text-slate leading-relaxed mb-3">
            We vergelijken elke verzekeraar op zes vaste criteria: breedte van de dekking, vergoeding,
            verzekerd bedrag, wachttijden, uitsluitingen en servicekwaliteit. Elk gegeven komt uit
            onafhankelijk onderzoek van 2026 en uit de voorwaarden van de verzekeraars. Wat we niet kunnen
            controleren, publiceren we niet.
          </p>
          <p className="text-sm text-slate leading-relaxed">
            De ranglijst is redactioneel. Elke gesponsorde plek is duidelijk gemarkeerd met
            &quot;Gesponsord&quot; en verandert niets aan onze beoordeling van de dekking. Geschreven door
            Jean-Baptiste Manson, oprichter en redacteur van HotelsWithPets.com.
          </p>
          <div className="mt-4 pt-4 border-t border-line">
            <ContactCTA locale="nl" variant="advertiser" />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Veelgestelde vragen</h2>
          <div className="space-y-4">
            {FAQ.map((f, i) => (
              <details key={i} className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard group">
                <summary className="px-6 py-4 font-semibold text-ink cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="text-slate group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                </summary>
                <div className="px-6 pb-5 text-slate text-sm leading-relaxed border-t border-line pt-4">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <ContactCTA locale="nl" variant="generic" />
      </div>
    </main>
  )
}
