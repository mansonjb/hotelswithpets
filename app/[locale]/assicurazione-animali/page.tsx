import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import { insuranceLanguages } from '@/lib/insuranceSlugs'
import BrandLogo from '@/components/BrandLogo'
import ContactCTA from '@/components/ContactCTA'

const SLUG = 'assicurazione-animali'
const UPDATED = 'novembre 2026'

export async function generateStaticParams() {
  return [{ locale: 'it' }]
}

export const metadata: Metadata = {
  title: 'Migliore assicurazione cane e gatto 2026: confronto in Italia',
  description:
    'Confronto indipendente delle migliori assicurazioni per animali domestici (cane e gatto) in Italia nel 2026: rimborsi, massimali, franchigie, periodi di carenza e coperture di 9 compagnie, e come scegliere.',
  alternates: {
    canonical: `${SITE_URL}/it/${SLUG}`,
    languages: insuranceLanguages(),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Migliore assicurazione cane e gatto 2026: confronto in Italia',
    description:
      'Confronto indipendente delle migliori assicurazioni per cane e gatto in Italia nel 2026.',
    url: `${SITE_URL}/it/${SLUG}`,
    siteName: 'HotelsWithPets.com',
  },
}

// ─── Dati ────────────────────────────────────────────────────────────────────
// Tutte le compagnie sono reali e operano in Italia. I dati sono qualitativi e
// volutamente prudenti: i premi cambiano molto per animale, razza, età e
// pacchetto, quindi rimandiamo a un preventivo invece di indicare una cifra che
// non possiamo garantire. Carenze, rimborsi e massimali variano per polizza:
// verifica sempre le condizioni. `sponsored` indica uno spazio A PAGAMENTO e
// mostra l'etichetta "Sponsorizzato". È false per tutti finché un partner non
// acquista la posizione. L'ordine è redazionale.
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
  excess: string
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
    name: 'Santévet', slug: 'it-santevet', initials: 'Sa', color: '#ea580c',
    kind: 'Specialista animali', verdict: 'Massimale più alto',
    tagline: 'Specialista con tre pacchetti e massimale veterinario fino a 5.000€',
    species: 'Cani e gatti', reimbursement: 'Dal 50% all’85% secondo il pacchetto',
    waiting: 'Secondo la copertura (verifica le condizioni)',
    excess: 'Franchigia secondo il pacchetto', limit: 'Spese veterinarie fino a circa 5.000€',
    covered: ['Infortuni e malattie', 'Tre pacchetti (Light/Confort/Premium)', 'Massimale elevato'],
    summary: 'Santévet è una compagnia specializzata nella salute di cani e gatti, con tre pacchetti (Light, Confort e Premium) e, secondo i confronti di settore, uno dei massimali più alti per spese veterinarie da intervento, fino a circa 5.000€. I premi partono intorno agli 8,50€ al mese e il rimborso va dal 50% all’85% in base al pacchetto. Una scelta forte per chi vuole un tetto di rimborso ampio da uno specialista.',
    pros: ['Uno dei massimali più alti del mercato (fino a ~5.000€)', 'Tre pacchetti per ogni budget', 'Compagnia specializzata negli animali'],
    cons: ['Il rimborso massimo (85%) non arriva al 100%', 'Verifica le carenze per malattia'],
    claimMethod: 'Invii la fattura dall’area cliente e ricevi il rimborso previsto dal pacchetto fino al massimale.',
    extras: ['Specialista animali', 'Tre pacchetti', 'Massimale elevato'],
    idealFor: 'Chi vuole un massimale ampio da una compagnia specializzata.',
    url: 'https://www.santevet.it', sponsored: false,
  },
  {
    name: 'Baboop', slug: 'it-baboop', initials: 'Bp', color: '#7c3aed',
    kind: 'Assicuratore digitale', verdict: 'Digitale, rimborso fino al 90%',
    tagline: 'Polizza digitale con rimborso fino al 90%',
    species: 'Cani e gatti', reimbursement: 'Fino al 90%',
    waiting: 'Secondo la copertura (verifica le condizioni)',
    excess: 'Secondo il pacchetto', limit: 'Secondo il pacchetto',
    covered: ['Infortuni e malattie', 'Rimborso fino al 90%', 'Gestione digitale'],
    summary: 'Baboop è un assicuratore digitale che offre una polizza per cani e gatti con rimborso fino al 90% e premi a partire da circa 14,90€ al mese. In una classifica di Forbes Advisor 2026 rientra tra le migliori polizze del mercato italiano. Tutto si gestisce online, con un percorso rapido e moderno.',
    pros: ['Rimborso fino al 90%', 'Percorso 100% digitale e rapido', 'Tra le migliori in una classifica Forbes 2026'],
    cons: ['Premio di partenza più alto di una polizza base', 'Verifica massimali e carenze nel pacchetto'],
    claimMethod: 'Carichi la fattura dall’app o dall’area cliente e ricevi il rimborso fino al 90% secondo il pacchetto.',
    extras: ['App', 'Gestione digitale', 'Rimborso elevato'],
    idealFor: 'Chi vuole un’esperienza digitale con rimborso alto.',
    url: 'https://www.baboop.it', sponsored: false,
  },
  {
    name: 'Unipol', slug: 'it-unipol', initials: 'Un', color: '#003a70',
    kind: 'Grande compagnia', verdict: 'Ai vertici delle classifiche',
    tagline: 'La polizza UNICA Cane e Gatto di una grande compagnia',
    species: 'Cani e gatti', reimbursement: 'Secondo il pacchetto',
    waiting: 'Es. 7 giorni infortunio, più lunga per malattia (verifica)',
    excess: 'Secondo il pacchetto', limit: 'Secondo il pacchetto',
    covered: ['Infortuni e malattie', 'Grande compagnia', 'Rete di agenzie'],
    summary: 'Unipol propone la polizza UNICA Cane e Gatto e, in una classifica di Forbes Advisor 2026 su 12 polizze, si colloca al primo posto. Per sottoscrivere servono microchip o tatuaggio e il libretto delle vaccinazioni in regola. È la scelta di chi vuole una grande compagnia con una capillare rete di agenzie sul territorio.',
    pros: ['Ai vertici di una classifica Forbes 2026', 'Grande compagnia solida e capillare', 'Rete di agenzie per la consulenza'],
    cons: ['Richiede microchip e libretto vaccinazioni in regola', 'Condizioni variabili per pacchetto'],
    claimMethod: 'Invii la fattura tramite agenzia o area cliente e ricevi il rimborso secondo il pacchetto.',
    extras: ['Rete di agenzie', 'Grande compagnia', 'Prodotto UNICA'],
    idealFor: 'Chi preferisce una grande compagnia con agenzie sul territorio.',
    url: 'https://www.unipol.it', sponsored: false,
  },
  {
    name: 'Genertel', slug: 'it-genertel', initials: 'Ge', color: '#c8102e',
    kind: 'Compagnia diretta', verdict: 'Diretta, salute e RC',
    tagline: 'Protezione per il cane con copertura sanitaria, RC e assistenza legale',
    species: 'Cani e gatti', reimbursement: 'Secondo il pacchetto',
    waiting: 'Secondo la copertura (verifica le condizioni)',
    excess: 'Secondo il pacchetto', limit: 'Secondo il pacchetto',
    covered: ['Spese veterinarie', 'Responsabilità civile', 'Assistenza legale'],
    summary: 'Genertel, compagnia diretta del gruppo Generali, offre una polizza di protezione per il cane che unisce copertura sanitaria, responsabilità civile per i danni a terzi e assistenza legale, con pagamento anche a rate. In una classifica di Forbes Advisor 2026 figura tra le migliori. Si sottoscrive e si gestisce direttamente, senza intermediari.',
    pros: ['Copertura sanitaria con RC e assistenza legale', 'Compagnia diretta, senza intermediari', 'Tra le migliori in una classifica Forbes 2026'],
    cons: ['Prodotto incentrato soprattutto sul cane', 'Verifica massimali e carenze nelle condizioni'],
    claimMethod: 'Gestisci tutto direttamente online; il rimborso delle spese coperte segue le condizioni di polizza.',
    extras: ['RC inclusa', 'Assistenza legale', 'Gestione diretta'],
    idealFor: 'Chi vuole salute e responsabilità civile in un’unica polizza diretta.',
    url: 'https://www.genertel.it', sponsored: false,
  },
  {
    name: 'ConTe.it', slug: 'it-conte', initials: 'CT', color: '#e2001a',
    kind: 'Compagnia diretta (Admiral)', verdict: 'Quattro pacchetti',
    tagline: 'Cane e Gatto in quattro pacchetti, da una diretta molto conosciuta',
    species: 'Cani e gatti', reimbursement: 'Secondo il pacchetto (scoperto 20%)',
    waiting: 'Es. 15 giorni infortunio, 30 giorni malattia (Platinum+)',
    excess: 'Franchigia 250€, scoperto 20% per sinistro', limit: 'Ricovero con intervento fino a circa 2.000€/anno',
    covered: ['Infortuni e malattie', 'Quattro pacchetti', 'RC verso terzi'],
    summary: 'ConTe.it (gruppo Admiral) vende la polizza Cane e Gatto in quattro pacchetti. Rimborsa il ricovero con intervento fino a circa 2.000€ l’anno, con una franchigia di 250€ e uno scoperto del 20% per sinistro, e carenze a partire da 15 giorni per infortunio e 30 per malattia nel pacchetto Platinum+. Una diretta molto conosciuta con un percorso online semplice.',
    pros: ['Quattro pacchetti per ogni esigenza', 'Diretta molto conosciuta, percorso online', 'Include la responsabilità civile verso terzi'],
    cons: ['Scoperto del 20% e franchigia di 250€ per sinistro', 'Massimale ricovero più contenuto (~2.000€)'],
    claimMethod: 'Invii la fattura online; il rimborso segue il pacchetto, al netto di franchigia (250€) e scoperto (20%).',
    extras: ['Quattro pacchetti', 'RC verso terzi', 'Gestione online'],
    idealFor: 'Chi cerca una diretta conosciuta con pacchetti flessibili.',
    url: 'https://www.conte.it/animali-domestici', sponsored: false,
  },
  {
    name: 'Reale Mutua', slug: 'it-realemutua', initials: 'RM', color: '#002d72',
    kind: 'Mutua assicuratrice', verdict: 'Fino a 5 animali',
    tagline: 'Realmente Amici: fino a 5 animali su un’unica polizza, con pet sitter',
    species: 'Cani e gatti', reimbursement: 'Secondo la formula',
    waiting: 'Secondo la copertura (verifica le condizioni)',
    excess: 'Secondo la formula', limit: 'Secondo la formula',
    covered: ['Spese veterinarie', 'Fino a 5 animali', 'Servizio pet sitter'],
    summary: 'Reale Mutua propone la formula Realmente Amici, che permette di coprire fino a 5 animali con un’unica polizza e garantisce un servizio di pet sitter se il proprietario non può accudire l’animale. È sottoscrivibile per cani o gatti identificati con microchip e iscritti all’Anagrafe degli animali d’affezione. Una solida mutua assicuratrice storica.',
    pros: ['Fino a 5 animali su un’unica polizza', 'Servizio pet sitter incluso', 'Mutua assicuratrice storica e solida'],
    cons: ['Limiti di età all’ingresso (verifica le condizioni)', 'Richiede microchip e iscrizione all’Anagrafe'],
    claimMethod: 'Invii la fattura tramite agenzia o area cliente; il rimborso segue la formula scelta.',
    extras: ['Multi-animale (fino a 5)', 'Pet sitter', 'Rete di agenzie'],
    idealFor: 'Famiglie con più animali e chi vuole una mutua storica.',
    url: 'https://www.realemutua.it', sponsored: false,
  },
  {
    name: 'Europ Assistance', slug: 'it-europassistance', initials: 'EA', color: '#0a4ea2',
    kind: 'Specialista assistenza', verdict: 'Assistenza e RC elevata',
    tagline: 'Miglior Amico: forte sull’assistenza, con RC molto elevata',
    species: 'Cani e gatti', reimbursement: 'Secondo la formula',
    waiting: 'Secondo la copertura (verifica le condizioni)',
    excess: 'Secondo la formula', limit: 'Spese veterinarie da intervento fino a ~3.500€; RC fino a 1.000.000€',
    covered: ['Spese veterinarie', 'Responsabilità civile elevata', 'Assistenza dedicata'],
    summary: 'Europ Assistance, specialista dell’assistenza, offre la polizza Miglior Amico dedicata agli animali domestici. Secondo i confronti di settore propone un massimale per spese veterinarie da intervento intorno ai 3.500€ e una responsabilità civile verso terzi fino a 1.000.000€, tra le più alte. La scelta di chi dà valore all’assistenza e a una RC molto ampia.',
    pros: ['Responsabilità civile verso terzi molto elevata (fino a 1.000.000€)', 'Massimale veterinario da intervento tra i più alti', 'Forte cultura dell’assistenza'],
    cons: ['Impostata soprattutto su assistenza e RC', 'Verifica le spese veterinarie ordinarie coperte'],
    claimMethod: 'Attivi l’assistenza o invii la fattura; il rimborso e la RC seguono le condizioni della formula.',
    extras: ['RC fino a 1.000.000€', 'Assistenza dedicata', 'Massimale intervento elevato'],
    idealFor: 'Chi dà priorità all’assistenza e a una responsabilità civile ampia.',
    url: 'https://www.europassistance.it', sponsored: false,
  },
  {
    name: 'Quixa', slug: 'it-quixa', initials: 'Qx', color: '#00a0df',
    kind: 'Compagnia diretta (AXA)', verdict: 'Diretta, ben valutata',
    tagline: 'Compagnia diretta del gruppo AXA, ben valutata nei confronti',
    species: 'Cani e gatti', reimbursement: 'Secondo la formula',
    waiting: 'Secondo la copertura (verifica le condizioni)',
    excess: 'Secondo la formula', limit: 'Secondo la formula',
    covered: ['Spese veterinarie', 'Compagnia diretta', 'Gestione online'],
    summary: 'Quixa, compagnia diretta del gruppo AXA, propone una copertura per animali domestici ed è ben posizionata in una classifica 2026 basata su reclami IVASS e recensioni. Si sottoscrive e si gestisce direttamente online, con il solido retroterra di un grande gruppo assicurativo internazionale.',
    pros: ['Ben valutata in una classifica basata su reclami IVASS', 'Compagnia diretta del gruppo AXA', 'Gestione online senza intermediari'],
    cons: ['Condizioni e massimali da verificare nella formula', 'Meno specializzata sugli animali'],
    claimMethod: 'Invii la fattura online; il rimborso segue le condizioni della formula.',
    extras: ['Gruppo AXA', 'Gestione online', 'Diretta'],
    idealFor: 'Chi vuole una diretta solida con un grande gruppo alle spalle.',
    url: 'https://www.quixa.it', sponsored: false,
  },
  {
    name: 'Sara Assicurazioni', slug: 'it-sara', initials: 'Sr', color: '#e30613',
    kind: 'Compagnia storica (ACI)', verdict: 'Storica, ben valutata',
    tagline: 'La compagnia ufficiale dell’ACI, ben valutata nei confronti',
    species: 'Cani e gatti', reimbursement: 'Secondo la formula',
    waiting: 'Secondo la copertura (verifica le condizioni)',
    excess: 'Secondo la formula', limit: 'Secondo la formula',
    covered: ['Spese veterinarie', 'Compagnia storica', 'Rete di agenzie'],
    summary: 'Sara Assicurazioni, compagnia ufficiale dell’ACI, offre una copertura per animali domestici ed è ben posizionata in una classifica 2026 basata su reclami IVASS e recensioni. Un nome storico e radicato, con una rete di agenzie sul territorio per chi preferisce la consulenza di persona.',
    pros: ['Ben valutata in una classifica basata su reclami IVASS', 'Compagnia storica e radicata (ACI)', 'Rete di agenzie sul territorio'],
    cons: ['Condizioni e massimali da verificare nella formula', 'Meno specializzata sugli animali'],
    claimMethod: 'Invii la fattura tramite agenzia o area cliente; il rimborso segue le condizioni della formula.',
    extras: ['Rete di agenzie', 'Compagnia storica', 'Consulenza di persona'],
    idealFor: 'Chi preferisce una compagnia storica con agenzie sul territorio.',
    url: 'https://www.sara.it', sponsored: false,
  },
]

const BEST_FOR: Array<{ icon: string; label: string; pick: string; why: string }> = [
  { icon: '🏆', label: 'Massimale più alto', pick: 'Santévet', why: 'Spese veterinarie da intervento fino a circa 5.000€.' },
  { icon: '📱', label: 'Migliore digitale', pick: 'Baboop', why: 'Percorso 100% online con rimborso fino al 90%.' },
  { icon: '🛡️', label: 'RC verso terzi più alta', pick: 'Europ Assistance', why: 'Responsabilità civile fino a 1.000.000€.' },
  { icon: '🐾', label: 'Più animali insieme', pick: 'Reale Mutua', why: 'Fino a 5 animali su un’unica polizza, con pet sitter.' },
  { icon: '🧩', label: 'Pacchetti flessibili', pick: 'ConTe.it', why: 'Cane e Gatto in quattro pacchetti diversi.' },
  { icon: '🏢', label: 'Grande compagnia', pick: 'Unipol', why: 'Ai vertici di una classifica Forbes 2026, con rete di agenzie.' },
]

const CHOOSE_STEPS: Array<{ title: string; text: string }> = [
  { title: 'Fissa il budget mensile', text: 'In Italia i premi vanno da circa 8 a 15€ al mese per una base fino a 25-45€ per una copertura completa. Definire una fascia elimina già metà delle offerte.' },
  { title: 'Guarda il massimale annuo', text: 'È l’importo massimo rimborsato in un anno (da ~2.000€ fino a ~5.000€ con Santévet). Un solo intervento può esaurire un massimale basso.' },
  { title: 'Confronta rimborso, franchigia e scoperto', text: 'Conta la percentuale rimborsata (spesso 50-90%), la franchigia (quota fissa) e lo scoperto (percentuale a tuo carico, es. 20% in ConTe). Guarda quanto resta davvero a te.' },
  { title: 'Verifica i periodi di carenza', text: 'In carenza paghi ma non sei ancora rimborsato. Breve per gli infortuni (es. 7-15 giorni), più lunga per la malattia (30 giorni o più), a volte mesi per alcuni interventi.' },
  { title: 'Leggi le esclusioni e i requisiti', text: 'Le patologie preesistenti sono sempre escluse. Verifica microchip e iscrizione all’Anagrafe (richiesti da molte compagnie) e i limiti di età all’ingresso.' },
]

const COVERED: string[] = [
  'Visite per infortunio e malattia',
  'Interventi chirurgici e ricovero',
  'Diagnostica (radiografie, ecografie, esami)',
  'Farmaci prescritti',
  'Responsabilità civile verso terzi (secondo la polizza)',
  'Assistenza e, in alcune formule, servizi dedicati',
]
const EXCLUDED: string[] = [
  'Patologie preesistenti o sintomi anteriori alla sottoscrizione',
  'Spese durante il periodo di carenza',
  'Cucciolate, gravidanza e parto, salvo garanzia specifica',
  'Interventi estetici o non necessari dal punto di vista medico',
  'Franchigia e scoperto a tuo carico in molte polizze',
]

const CLAIM_STEPS: Array<{ title: string; text: string }> = [
  { title: 'Vai dal veterinario', text: 'Paghi la prestazione e conservi la fattura dettagliata (e il libretto per una prima richiesta per malattia).' },
  { title: 'Invii la fattura', text: 'Dall’app o dall’area cliente, in pochi minuti. Le compagnie digitali accettano la foto della fattura.' },
  { title: 'Ricevi il rimborso', text: 'Ricevi la percentuale prevista (50-90%), al netto di franchigia e scoperto, entro il massimale annuo.' },
  { title: 'Oppure assistenza o RC', text: 'Alcune compagnie (come Europ Assistance) puntano su assistenza e responsabilità civile verso terzi, oltre al rimborso delle spese.' },
]

const PROFILE_ROWS: Array<{ profile: string; need: string; suggestion: string }> = [
  { profile: 'Cucciolo o gattino', need: 'Assicurare presto per un premio basso e zero esclusioni', suggestion: 'Santévet, Baboop o ConTe.it' },
  { profile: 'Animale anziano', need: 'Verificare i limiti di età all’ingresso e le carenze', suggestion: 'Reale Mutua o Unipol (compagnie storiche)' },
  { profile: 'Razza grande o a rischio', need: 'Massimale annuo alto, rimborso elevato', suggestion: 'Santévet (massimale ~5.000€)' },
  { profile: 'Più animali', need: 'Un’unica polizza, risparmio multi-animale', suggestion: 'Reale Mutua (fino a 5 animali)' },
  { profile: 'Serve una RC forte', need: 'Responsabilità civile verso terzi elevata', suggestion: 'Europ Assistance o Genertel' },
  { profile: 'Budget contenuto', need: 'Premio minimo, copertura di base', suggestion: 'Santévet (da ~8,50€) o ConTe.it' },
]

const MISTAKES: string[] = [
  'Aspettare che l’animale si ammali: le patologie già dichiarate non sono mai rimborsate.',
  'Scegliere solo in base al premio mensile senza guardare massimale, franchigia e scoperto.',
  'Dimenticare il periodo di carenza e credersi coperti dal primo giorno.',
  'Non leggere le esclusioni e i requisiti (microchip, iscrizione all’Anagrafe, limiti di età).',
  'Sottovalutare il massimale per una razza grande, dove un intervento può esaurirlo.',
]

const GLOSSARY: Array<{ term: string; def: string }> = [
  { term: 'Massimale', def: 'L’importo massimo rimborsato dalla polizza, spesso su base annua. In Italia va da circa 2.000€ fino a circa 5.000€ per le spese veterinarie da intervento.' },
  { term: 'Rimborso', def: 'La percentuale delle spese veterinarie che ti viene restituita, di solito dal 50% al 90%.' },
  { term: 'Franchigia', def: 'La quota fissa delle spese che resti a tuo carico per ogni sinistro o per anno (es. 250€ in ConTe).' },
  { term: 'Scoperto', def: 'La percentuale delle spese che rimane a tuo carico dopo la franchigia (es. 20% per sinistro).' },
  { term: 'Periodo di carenza', def: 'Il periodo dopo la sottoscrizione in cui paghi ma non sei ancora rimborsato. Breve per gli infortuni, più lungo per la malattia.' },
  { term: 'Patologia preesistente', def: 'Malattia già dichiarata o con sintomi comparsi prima della sottoscrizione o durante la carenza. Sempre esclusa.' },
  { term: 'Responsabilità civile (RC)', def: 'Garanzia che copre i danni causati dal tuo animale a terzi. In alcune polizze arriva fino a 1.000.000€.' },
  { term: 'Anagrafe degli animali d’affezione', def: 'Il registro in cui va iscritto l’animale (con microchip). Molte compagnie lo richiedono per sottoscrivere la polizza.' },
]

const PRICE_ROWS: Array<{ profile: string; range: string; note: string }> = [
  { profile: 'Copertura base', range: 'circa 8 a 15€ / mese', note: 'Santévet parte da ~8,50€. Massimale e rimborso più contenuti.' },
  { profile: 'Copertura completa', range: 'circa 25 a 45€ / mese', note: 'Rimborso alto (fino al 90%), massimale ampio.' },
  { profile: 'Solo responsabilità civile', range: 'pochi € / mese', note: 'Copre i danni a terzi; spesso inclusa nelle polizze salute.' },
  { profile: 'Più animali', range: 'sconto multi-animale', note: 'Con Reale Mutua fino a 5 animali su un’unica polizza.' },
]

const VET_COSTS: Array<{ act: string; cost: string }> = [
  { act: 'Visita', cost: '30 a 50€' },
  { act: 'Radiografia o ecografia', cost: '50 a 180€' },
  { act: 'Operazione al legamento crociato', cost: '1.500 a 3.000€' },
  { act: 'Trattamento oncologico o intervento maggiore', cost: '2.000 a 5.000€+' },
]

const FAQ: Array<{ q: string; a: string }> = [
  { q: 'Qual è la migliore assicurazione per cani e gatti nel 2026?', a: 'Non esiste una polizza migliore in assoluto: dipende dal tuo animale, dal budget e dalle priorità. Per un massimale ampio spicca Santévet (fino a ~5.000€). Per un’esperienza digitale Baboop. Tra le grandi, Unipol e Genertel sono ai vertici di una classifica Forbes 2026. Per più animali, Reale Mutua; per la RC più alta, Europ Assistance.' },
  { q: 'Quanto costa un’assicurazione per cane o gatto?', a: 'Una copertura base parte da circa 8 a 15€ al mese, mentre una completa va da circa 25 a 45€. Il premio dipende da specie, razza, età e livello di garanzia. In genere un gatto costa un po’ meno di un cane.' },
  { q: 'Che cos’è il periodo di carenza?', a: 'È il periodo, dopo la sottoscrizione, in cui paghi ma non sei ancora rimborsato. È breve per gli infortuni (es. 7-15 giorni) e più lungo per la malattia (30 giorni o più), a volte mesi per alcuni interventi come il legamento crociato.' },
  { q: 'Le patologie preesistenti sono coperte?', a: 'No. Le malattie già dichiarate o con sintomi comparsi prima della sottoscrizione, o durante la carenza, sono sempre escluse. Conviene assicurare l’animale da giovane e in salute.' },
  { q: 'Serve il microchip per assicurare l’animale?', a: 'Nella maggior parte dei casi sì. Molte compagnie (ad esempio Unipol e Reale Mutua) richiedono che il cane o il gatto abbia microchip o tatuaggio e sia iscritto all’Anagrafe degli animali d’affezione, con il libretto delle vaccinazioni in regola.' },
  { q: 'A che età conviene assicurare l’animale?', a: 'Il prima possibile. Il premio è più basso e il rischio di esclusione per patologia preesistente è minore quando l’animale è giovane. Molte compagnie fissano un’età massima all’ingresso: verificala prima di sottoscrivere.' },
  { q: 'La sterilizzazione o i vaccini sono rimborsati?', a: 'Non a titolo di malattia: sono atti di prevenzione o di convenienza. Possono essere coperti tramite un pacchetto prevenzione o una formula premium, quando prevista.' },
  { q: 'E se viaggio all’estero con il mio animale?', a: 'Alcune formule rimborsano le spese veterinarie durante un soggiorno nell’Unione Europea, ma non tutte. Verifica la garanzia di assistenza in viaggio. L’assicurazione non sostituisce i documenti: passaporto europeo per animali e vaccinazione antirabbica in regola restano obbligatori.' },
]

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale !== 'it') notFound()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Migliori assicurazioni cane e gatto 2026',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: INSURERS.length,
    itemListElement: INSURERS.map((ins, i) => ({ '@type': 'ListItem', position: i + 1, name: ins.name, url: ins.url })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Migliore assicurazione cane e gatto 2026: confronto in Italia',
    inLanguage: 'it',
    datePublished: '2026-11-12',
    dateModified: '2026-11-12',
    author: { '@type': 'Person', name: 'Jean-Baptiste Manson', jobTitle: 'Founder & Editor', url: `${SITE_URL}/it/about` },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets.com', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/it/${SLUG}`,
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
            <Link href="/it" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Assicurazione animali</span>
          </nav>
          <span className="eyebrow inline-block bg-lime text-ink border-[1.6px] border-ink rounded-full px-3 py-1.5 mb-5">
            Confronto indipendente · aggiornato a {UPDATED}
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold leading-[1.05] mb-5 max-w-3xl">
            Migliore assicurazione cane e gatto 2026
          </h1>
          <p className="text-lg text-white/85 max-w-2xl mb-8">
            La guida completa all’assicurazione per cani e gatti in Italia: coperture,
            rimborsi, massimali, franchigie, periodi di carenza, prezzi ed esclusioni delle
            principali compagnie, più il nostro metodo per scegliere senza sbagliare.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/85">
            <span><strong className="text-white text-lg">{INSURERS.length}</strong> compagnie a confronto</span>
            <span><strong className="text-white text-lg">6</strong> criteri oggettivi</span>
            <span><strong className="text-white text-lg">0</strong> recensioni inventate, tutto verificato</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        {/* ── Intro ── */}
        <section className="prose-none">
          <p className="text-slate leading-relaxed mb-4">
            In Italia sempre più proprietari assicurano il proprio animale, e non a caso: le spese
            veterinarie crescono e un solo intervento può costare più di anni di premi. L’assicurazione
            fa esattamente questo: trasforma una spesa imprevedibile in un costo mensile prevedibile, e
            spesso copre anche i danni che il tuo cane può causare a terzi.
          </p>
          <p className="text-slate leading-relaxed">
            Il mercato unisce specialisti e compagnie digitali (Santévet, Baboop), grandi gruppi
            (Unipol, Genertel, Quixa, Sara) e mutue storiche (Reale Mutua), oltre allo specialista
            dell’assistenza Europ Assistance. Ecco il nostro confronto completo.
          </p>
        </section>

        {/* ── Comparison table ── */}
        <section id="tabella-confronto" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-ink mb-2">La tabella di confronto 2026</h2>
          <p className="text-sm text-slate mb-5">Le principali compagnie per animali domestici in Italia, ordinate secondo la nostra analisi redazionale di copertura, prezzo ed esperienza. Clicca su una compagnia per aprirne la scheda.</p>
          <div className="overflow-x-auto rounded-[22px] border-[1.6px] border-ink shadow-hard">
            <table className="w-full text-sm min-w-[760px] bg-white">
              <thead className="bg-lavender-soft text-slate">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold w-8">#</th>
                  <th className="text-left px-4 py-3 font-semibold">Compagnia</th>
                  <th className="text-left px-4 py-3 font-semibold">Punti di forza</th>
                  <th className="text-left px-4 py-3 font-semibold">Rimborso</th>
                  <th className="text-left px-4 py-3 font-semibold">Carenza</th>
                </tr>
              </thead>
              <tbody>
                {INSURERS.map((ins, i) => (
                  <tr key={ins.name} className="border-t border-line align-top hover:bg-cream">
                    <td className="px-4 py-4 font-bold text-slate">{i + 1}</td>
                    <td className="px-4 py-4">
                      <a href={`#scheda-${ins.slug}`} className="flex items-center gap-2.5 group">
                        <BrandLogo src={`/logos/${ins.slug}.png`} name={ins.name} initials={ins.initials} color={ins.color} size={36} />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-ink group-hover:text-electric group-hover:underline">{ins.name}</span>
                            {ins.sponsored && (<span className="text-[10px] font-semibold bg-coral/25 text-ink border border-ink/20 px-1.5 py-0.5 rounded-full">Sponsorizzato</span>)}
                          </div>
                          <span className="text-xs font-medium text-electric">{ins.verdict}</span>
                          <span className="block text-[11px] text-slate group-hover:text-electric">Vedi scheda ↓</span>
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
          <p className="text-xs text-slate mt-3">Dati indicativi, aggiornati a {UPDATED}. Carenze e rimborsi variano per polizza. Il premio esatto dipende da animale, razza, età e pacchetto: chiedi un preventivo e leggi le condizioni prima di sottoscrivere.</p>
        </section>

        {/* ── Detailed ranking cards ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">La classifica dettagliata</h2>
          <div className="space-y-4">
            {INSURERS.map((ins, i) => (
              <article key={ins.name} id={`scheda-${ins.slug}`} className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-5 sm:p-6 scroll-mt-6">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center flex-shrink-0 gap-1">
                    <span className="text-xs font-bold text-slate">#{i + 1}</span>
                    <BrandLogo src={`/logos/${ins.slug}.png`} name={ins.name} initials={ins.initials} color={ins.color} size={48} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <h3 className="text-lg font-bold text-ink">{ins.name}</h3>
                      <span className="text-xs font-semibold bg-lavender-soft text-electric border border-ink/20 px-2 py-0.5 rounded-full">{ins.verdict}</span>
                      {ins.sponsored && (<span className="text-xs font-semibold bg-coral/25 text-ink border border-ink/20 px-2 py-0.5 rounded-full">Sponsorizzato</span>)}
                      <a href="#tabella-confronto" className="ml-auto text-xs text-slate hover:text-electric whitespace-nowrap">↑ tabella</a>
                    </div>
                    <p className="text-sm text-slate">{ins.kind}</p>
                    <p className="text-[13px] font-semibold text-slate mt-1">{ins.tagline}</p>
                  </div>
                </div>

                <p className="text-sm text-slate leading-relaxed mt-4">{ins.summary}</p>

                <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm mt-4 border-t border-line pt-4">
                  <div><dt className="font-semibold text-ink">Animali</dt><dd className="text-slate">{ins.species}</dd></div>
                  <div><dt className="font-semibold text-ink">Rimborso</dt><dd className="text-slate">{ins.reimbursement}</dd></div>
                  <div><dt className="font-semibold text-ink">Franchigia / scoperto</dt><dd className="text-slate">{ins.excess}</dd></div>
                  <div><dt className="font-semibold text-ink">Massimale</dt><dd className="text-slate">{ins.limit}</dd></div>
                  <div className="sm:col-span-2"><dt className="font-semibold text-ink">Periodo di carenza</dt><dd className="text-slate">{ins.waiting}</dd></div>
                </dl>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {ins.covered.map((c) => (<span key={c} className="text-xs bg-lime/30 text-ink border border-ink/20 px-2 py-0.5 rounded-full">✓ {c}</span>))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div className="bg-lime/30 border border-ink/20 rounded-xl p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-ink mb-2">Punti di forza</p>
                    <ul className="space-y-1.5 text-sm text-slate">
                      {ins.pros.map((p) => (<li key={p} className="flex gap-2"><span className="text-ink flex-shrink-0">✓</span><span>{p}</span></li>))}
                    </ul>
                  </div>
                  <div className="bg-coral/25 border border-ink/20 rounded-xl p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-ink mb-2">Da valutare</p>
                    <ul className="space-y-1.5 text-sm text-slate">
                      {ins.cons.map((c) => (<li key={c} className="flex gap-2"><span className="text-ink flex-shrink-0">!</span><span>{c}</span></li>))}
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-slate leading-relaxed mt-4"><span className="font-semibold text-ink">Come funziona il rimborso:</span> {ins.claimMethod}</p>
                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  <span className="text-xs font-semibold text-slate mr-1">Servizi inclusi:</span>
                  {ins.extras.map((e) => (<span key={e} className="text-xs bg-lavender-soft text-electric border border-ink/20 px-2 py-0.5 rounded-full">{e}</span>))}
                </div>
                <p className="text-sm text-slate leading-relaxed mt-3"><span className="font-semibold text-ink">Ideale per:</span> {ins.idealFor}</p>

                <a href={ins.url} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-1.5 text-sm font-bold text-white px-4 py-2 rounded-lg transition-opacity hover:opacity-90 mt-4" style={{ backgroundColor: ins.color }}>
                  Vedi {ins.name} e richiedi un preventivo →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ── Best-for ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-2">In breve: la migliore secondo le tue esigenze</h2>
          <p className="text-sm text-slate mb-5">Un riepilogo rapido per andare dritto al punto. Clicca su una compagnia per aprirne la scheda.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BEST_FOR.map((b) => {
              const match = INSURERS.find((x) => x.name === b.pick)
              return (
                <div key={b.label} className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-5">
                  <div className="text-2xl mb-2" aria-hidden="true">{b.icon}</div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate mb-1">{b.label}</p>
                  {match ? (
                    <a href={`#scheda-${match.slug}`} className="text-lg font-bold text-ink mb-1 inline-block hover:text-electric hover:underline">{b.pick} ↓</a>
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
          <h2 className="text-2xl font-bold text-ink mb-5">Come scegliere in 5 passi</h2>
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
            <h2 className="text-lg font-bold text-ink mb-3">Cosa copre di solito</h2>
            <ul className="space-y-2 text-sm text-slate">
              {COVERED.map((c) => (<li key={c} className="flex gap-2"><span className="text-ink">✓</span><span>{c}</span></li>))}
            </ul>
          </div>
          <div className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-6">
            <h2 className="text-lg font-bold text-ink mb-3">Cosa è escluso</h2>
            <ul className="space-y-2 text-sm text-slate">
              {EXCLUDED.map((c) => (<li key={c} className="flex gap-2"><span className="text-ink">✗</span><span>{c}</span></li>))}
            </ul>
          </div>
        </section>

        {/* ── How reimbursement works ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Come funziona il rimborso</h2>
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
          <h2 className="text-2xl font-bold text-ink mb-3">Conviene davvero?</h2>
          <p className="text-sm text-slate leading-relaxed mb-5">
            Dipende da come affronteresti una spesa veterinaria improvvisa di migliaia di euro. Le visite
            di routine sono economiche e prevedibili, un incidente o una malattia grave no. Ecco i costi
            indicativi in Italia senza assicurazione.
          </p>
          <div className="overflow-x-auto rounded-xl border-[1.6px] border-ink">
            <table className="w-full text-sm">
              <thead className="bg-lavender-soft text-slate"><tr><th className="text-left px-4 py-2.5 font-semibold">Prestazione</th><th className="text-left px-4 py-2.5 font-semibold">Costo indicativo</th></tr></thead>
              <tbody>
                {VET_COSTS.map((v) => (<tr key={v.act} className="border-t border-line"><td className="px-4 py-2.5 text-slate">{v.act}</td><td className="px-4 py-2.5 font-semibold text-ink">{v.cost}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate leading-relaxed mt-4">
            Se una spesa di migliaia di euro metterebbe in difficoltà il tuo budget, l’assicurazione di
            solito conviene, soprattutto se assicuri da giovane e blocchi un premio basso prima che compaia
            qualsiasi patologia.
          </p>
        </section>

        {/* ── Reimbursement example ── */}
        <section className="bg-lime/30 border border-ink/20 rounded-[22px] p-6">
          <h2 className="text-xl font-bold text-ink mb-3">Un esempio di rimborso</h2>
          <p className="text-sm text-slate leading-relaxed mb-4">
            Supponiamo che il tuo cane si rompa il legamento crociato e l’operazione costi <strong>2.000€</strong>.
            La tua polizza rimborsa l’80%, con una franchigia di 250€ e uno scoperto del 20% per sinistro:
          </p>
          <ul className="space-y-2 text-sm text-ink mb-4">
            <li className="flex justify-between gap-4 border-b border-ink/20 pb-2"><span>Fattura veterinaria</span><span className="font-semibold">2.000€</span></li>
            <li className="flex justify-between gap-4 border-b border-ink/20 pb-2"><span>Meno la franchigia</span><span className="font-semibold">- 250€</span></li>
            <li className="flex justify-between gap-4 border-b border-ink/20 pb-2"><span>80% rimborso su 1.750€</span><span className="font-semibold text-ink">= 1.400€ rimborsati</span></li>
            <li className="flex justify-between gap-4"><span>A tuo carico</span><span className="font-semibold">600€</span></li>
          </ul>
          <p className="text-xs text-slate leading-relaxed">
            Il calcolo varia per compagnia (franchigia per sinistro o annua, scoperto in percentuale, rimborso prima o dopo la franchigia) ed entro il massimale annuo. Verifica sempre come si calcola nelle condizioni.
          </p>
        </section>

        {/* ── Common conditions ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Patologie frequenti e i loro costi</h2>
          <div className="overflow-x-auto rounded-[22px] border-[1.6px] border-ink shadow-hard">
            <table className="w-full text-sm min-w-[640px] bg-white">
              <thead className="bg-lavender-soft text-slate"><tr><th className="text-left px-4 py-3 font-semibold">Patologia</th><th className="text-left px-4 py-3 font-semibold">Costo indicativo</th><th className="text-left px-4 py-3 font-semibold">Perché conta</th></tr></thead>
              <tbody>
                {[
                  { c: 'Rottura del legamento crociato (intervento)', k: '1.500 a 3.000€', n: 'Uno degli interventi più frequenti e costosi nel cane; carenza spesso lunga.' },
                  { c: 'Tumore (diagnosi e trattamento)', k: '2.000 a 5.000€+', n: 'Chemioterapia, intervento ed esami si sommano in mesi.' },
                  { c: 'Corpo estraneo / occlusione (intervento)', k: '1.500 a 3.500€', n: 'Oggetto ingerito; emergenza, quasi sempre imprevedibile.' },
                  { c: 'Diabete (continuativo, l’anno)', k: '600 a 1.500€ / anno', n: 'Insulina, controlli e visite di controllo a vita.' },
                  { c: 'Allergie croniche (l’anno)', k: '300 a 900€ / anno', n: 'Molto frequenti; terapie ricorrenti e dieta specifica.' },
                  { c: 'Pronto soccorso (notte o festivo)', k: '150 a 700€', n: 'Le cliniche di guardia costano molto più di una visita normale.' },
                ].map((r) => (<tr key={r.c} className="border-t border-line"><td className="px-4 py-3 font-semibold text-ink">{r.c}</td><td className="px-4 py-3 text-ink font-semibold whitespace-nowrap">{r.k}</td><td className="px-4 py-3 text-slate">{r.n}</td></tr>))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── What affects your premium ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Cosa influenza il premio</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { f: 'Specie', t: 'Il cane di solito costa più del gatto, che ha sinistri meno frequenti e meno costosi.' },
              { f: 'Razza', t: 'Le razze grandi e quelle con predisposizioni (brachicefale, displasia) pagano premi più alti dei meticci.' },
              { f: 'Età', t: 'Il premio è più basso per cuccioli e gattini e cresce ogni anno, per questo conviene assicurare presto.' },
              { f: 'Zona', t: 'Le tariffe veterinarie variano per area, quindi lo stesso animale costa di più in una grande città.' },
              { f: 'Le tue scelte', t: 'Un massimale alto, un rimborso elevato e una franchigia bassa alzano il premio. È la leva per il tuo budget.' },
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
          <h2 className="text-2xl font-bold text-ink mb-3">Le razze più costose da assicurare</h2>
          <p className="text-sm text-slate leading-relaxed mb-3">
            Alcune razze pagano premi più alti perché presentano più rischi di salute. È il caso delle
            razze brachicefale (Bulldog francese, Carlino, Bulldog inglese), soggette a problemi
            respiratori, e delle razze grandi (Alano, Pastore tedesco, Labrador), più esposte a displasia
            dell’anca e lesioni dei legamenti.
          </p>
          <p className="text-sm text-slate leading-relaxed">
            Per questi animali conviene puntare su un massimale annuo alto e un buon rimborso, e assicurarli
            da giovani: una predisposizione scoperta più tardi potrebbe essere considerata preesistente ed
            esclusa.
          </p>
        </section>

        {/* ── When it might not be worth it ── */}
        <section className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-6">
          <h2 className="text-xl font-bold text-ink mb-3">Quando conviene di meno</h2>
          <p className="text-sm text-slate leading-relaxed mb-4">
            L’assicurazione non è automatica per tutti. Conviene di meno se:
          </p>
          <ul className="space-y-2 text-sm text-slate">
            {[
              'Hai un fondo di emergenza e potresti assorbire senza problemi una spesa improvvisa di 3.000€ o più.',
              'Il tuo animale è anziano e con più patologie già dichiarate, che sarebbero escluse come preesistenti.',
              'Vuoi coprire solo piccole spese prevedibili, che spesso la franchigia assorbe.',
            ].map((n) => (<li key={n} className="flex gap-2"><span className="text-ink flex-shrink-0">!</span><span>{n}</span></li>))}
          </ul>
          <p className="text-sm text-slate leading-relaxed mt-4">
            Anche così, assicurare un animale giovane e in salute con una polizza accessibile è una
            protezione economica contro la spesa che non puoi prevedere.
          </p>
        </section>

        {/* ── By profile ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Quale compagnia secondo il profilo</h2>
          <div className="overflow-x-auto rounded-[22px] border-[1.6px] border-ink shadow-hard">
            <table className="w-full text-sm min-w-[640px] bg-white">
              <thead className="bg-lavender-soft text-slate"><tr><th className="text-left px-4 py-3 font-semibold">Profilo</th><th className="text-left px-4 py-3 font-semibold">Cosa privilegiare</th><th className="text-left px-4 py-3 font-semibold">Buona scelta</th></tr></thead>
              <tbody>
                {PROFILE_ROWS.map((r) => (<tr key={r.profile} className="border-t border-line"><td className="px-4 py-3 font-semibold text-ink">{r.profile}</td><td className="px-4 py-3 text-slate">{r.need}</td><td className="px-4 py-3 text-electric font-medium">{r.suggestion}</td></tr>))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Quanto costa al mese</h2>
          <div className="overflow-x-auto rounded-[22px] border-[1.6px] border-ink shadow-hard">
            <table className="w-full text-sm min-w-[640px] bg-white">
              <thead className="bg-lavender-soft text-slate"><tr><th className="text-left px-4 py-3 font-semibold">Tipo di polizza</th><th className="text-left px-4 py-3 font-semibold">Prezzo indicativo</th><th className="text-left px-4 py-3 font-semibold">Nota</th></tr></thead>
              <tbody>
                {PRICE_ROWS.map((r) => (<tr key={r.profile} className="border-t border-line"><td className="px-4 py-3 font-semibold text-ink">{r.profile}</td><td className="px-4 py-3 text-ink font-semibold whitespace-nowrap">{r.range}</td><td className="px-4 py-3 text-slate">{r.note}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate mt-3">Solo fasce indicative. Il preventivo dipende da specie, razza, età, zona e pacchetto scelto.</p>
        </section>

        {/* ── Mistakes ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Errori da evitare</h2>
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
          <h2 className="text-2xl font-bold text-ink mb-5">Glossario</h2>
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
          <h2 className="text-xl font-bold text-ink mb-3">Viaggiare con il tuo animale</h2>
          <p className="text-sm text-slate leading-relaxed">
            Alcune formule rimborsano le spese veterinarie durante un soggiorno nell’Unione Europea, ma
            non tutte, quindi verifica la garanzia di assistenza in viaggio prima di partire.
            L’assicurazione non sostituisce i documenti: il passaporto europeo per animali e la
            vaccinazione antirabbica in regola restano obbligatori per varcare i confini.
          </p>
        </section>

        {/* ── Verdict ── */}
        <section className="bg-electric text-white rounded-[22px] p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-3">Il nostro verdetto</h2>
          <p className="text-white/85 leading-relaxed">
            Per la maggior parte, Santévet offre il massimale più ampio da uno specialista, mentre Baboop
            è la scelta digitale con rimborso fino al 90%. Tra le grandi, Unipol e Genertel sono ai vertici
            di una classifica Forbes 2026; per più animali c’è Reale Mutua e per la responsabilità civile
            più alta Europ Assistance. Qualunque sia la scelta, assicura da giovane e in salute, punta a un
            massimale alto e leggi prima carenze ed esclusioni.
          </p>
        </section>

        {/* ── Methodology ── */}
        <section className="bg-white border-[1.6px] border-ink rounded-[22px] p-6">
          <h2 className="text-xl font-bold text-ink mb-3">Il nostro metodo</h2>
          <p className="text-sm text-slate leading-relaxed mb-3">
            Confrontiamo ogni compagnia su sei criteri costanti: ampiezza della copertura, rimborso,
            massimale, periodi di carenza, esclusioni e qualità del servizio. Ogni dato proviene da
            confronti indipendenti del 2026 e dalle condizioni delle compagnie. Ciò che non possiamo
            verificare non lo pubblichiamo.
          </p>
          <p className="text-sm text-slate leading-relaxed">
            La classifica è redazionale. Ogni spazio sponsorizzato è segnalato con l’etichetta
            &quot;Sponsorizzato&quot; e non altera la nostra valutazione delle coperture. Scritto da
            Jean-Baptiste Manson, fondatore e redattore di HotelsWithPets.com.
          </p>
          <div className="mt-4 pt-4 border-t border-line">
            <ContactCTA locale="it" variant="advertiser" />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Domande frequenti</h2>
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
        <ContactCTA locale="it" variant="generic" />
      </div>
    </main>
  )
}
