import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import { insuranceLanguages } from '@/lib/insuranceSlugs'
import BrandLogo from '@/components/BrandLogo'
import ContactCTA from '@/components/ContactCTA'

const SLUG = 'tierkrankenversicherung'
const UPDATED = 'November 2026'

export async function generateStaticParams() {
  return [{ locale: 'de' }]
}

export const metadata: Metadata = {
  title: 'Beste Tierkrankenversicherung 2026: Hund & Katze im Vergleich',
  description:
    'Unabhängiger Vergleich der besten Tierkrankenversicherungen für Hund und Katze in Deutschland 2026: Erstattung, GOT-Satz, Wartezeiten, Selbstbeteiligung und Leistungen von 10 Anbietern, plus Tipps zur Wahl.',
  alternates: {
    canonical: `${SITE_URL}/de/${SLUG}`,
    languages: insuranceLanguages(),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Beste Tierkrankenversicherung 2026: Hund & Katze im Vergleich',
    description:
      'Unabhängiger Vergleich der besten Tierkrankenversicherungen für Hund und Katze in Deutschland 2026.',
    url: `${SITE_URL}/de/${SLUG}`,
    siteName: 'HotelsWithPets.com',
  },
}

// ─── Daten ───────────────────────────────────────────────────────────────────
// Alle Anbieter sind reale Versicherer in Deutschland. Die Angaben sind
// qualitativ und bewusst vorsichtig: Beiträge ändern sich nach Tier, Rasse,
// Alter und Tarif stark, daher verweisen wir auf ein Angebot statt eine Zahl zu
// nennen, die wir nicht garantieren können. Wartezeiten und Erstattungen
// variieren je Tarif, also immer in den Bedingungen pruefen. `sponsored` markiert
// einen BEZAHLTEN Platz und zeigt ein "Gesponsert"-Label. Es ist fuer alle false,
// bis ein Partner die Position kauft. Die Reihenfolge ist redaktionell.
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
    name: 'Lassie', slug: 'de-lassie', initials: 'La', color: '#0d9488',
    kind: 'Digitaler Versicherer', verdict: 'Digitaler Testsieger',
    tagline: 'OP-Erstattung ohne Jahreslimit, keine Altersgrenze, digital',
    species: 'Hunde und Katzen', reimbursement: 'Bis 100% der erstattungsfähigen Kosten',
    waiting: 'Üblich 30 Tage (bei Unfall sofort)',
    deductible: 'Je nach Tarif', limit: 'OP-Kosten oft ohne Jahreslimit',
    covered: ['Krankheit und OP', 'Praevention belohnt', 'Kein Kuendigungsrecht nach Schaden'],
    summary: 'Lassie ist ein digitaler Versicherer, der in mehreren Vergleichsportalen als beste Wahl für die meisten Hunde und Katzen gilt. Überzeugend sind die OP-Erstattung ohne Jahreslimit, das Fehlen einer Altershöchstgrenze beim Abschluss und der Verzicht auf ein Kündigungsrecht nach einem Schadensfall. Ein Präventionsprogramm kann den Beitrag senken, und Abschluss wie Meldungen laufen komplett online.',
    pros: ['OP-Erstattung ohne Jahreslimit', 'Keine Altersgrenze beim Abschluss', 'Kein Kündigungsrecht des Versicherers nach einem Schaden', 'Praemie sinkt durch Praevention'],
    cons: ['Noch junger Anbieter in Deutschland', 'Leistungen je nach Tarif genau pruefen'],
    claimMethod: 'Rechnung in der App hochladen, Erstattung zum vereinbarten Satz nach Abzug der Selbstbeteiligung.',
    extras: ['Praeventionsprogramm', 'App', 'Kein Kuendigungsrecht nach Schaden'],
    idealFor: 'Wer eine digitale Lösung ohne Altersgrenze und ohne Jahreslimit will.',
    url: 'https://www.lassie.co', sponsored: false,
  },
  {
    name: 'Petolo', slug: 'de-petolo', initials: 'Pe', color: '#f97316',
    kind: 'Digitaler Versicherer', verdict: 'Vollschutz bis 100%',
    tagline: 'Vollschutz mit bis zu 100% Erstattung, unbegrenzte Jahresleistung möglich',
    species: 'Hunde und Katzen', reimbursement: 'Bis 100%',
    waiting: 'Je nach Tarif (bei Unfall meist sofort)',
    deductible: 'Je nach Tarif', limit: 'Im Vollschutz unbegrenzt möglich',
    covered: ['Krankheit und OP', 'Vollschutz bis 100%', 'Digitale Verwaltung'],
    summary: 'Petolo ist ein digitaler Anbieter, der in Vergleichen vor allem beim Vollschutz vorn liegt: bis zu 100% Erstattung und eine im Spitzentarif unbegrenzte Jahresleistung. Abschluss und Schadenmeldung laufen online, was den Ablauf einfach hält. Für Freigänger-Katzen wird Petolo häufig neben AGILA empfohlen.',
    pros: ['Bis 100% Erstattung im Vollschutz', 'Unbegrenzte Jahresleistung im Spitzentarif möglich', 'Digitaler, einfacher Ablauf'],
    cons: ['Spitzenleistung nur im teuersten Tarif', 'Wartezeiten je nach Tarif pruefen'],
    claimMethod: 'Rechnung online einreichen, Erstattung zum gewählten Satz nach Selbstbeteiligung.',
    extras: ['Vollschutz', 'Digitale Verwaltung', 'Tarife waehlbar'],
    idealFor: 'Wer maximale Erstattung ohne Jahreslimit sucht.',
    url: 'https://www.petolo.de', sponsored: false,
  },
  {
    name: 'Figo', slug: 'de-figo', initials: 'Fi', color: '#16a34a',
    kind: 'Digitaler Versicherer', verdict: 'Digital, hohe Erstattung',
    tagline: 'Digitaler Anbieter mit hoher Erstattung und guten Kundenbewertungen',
    species: 'Hunde und Katzen', reimbursement: 'Bis 100% je nach Tarif',
    waiting: 'Je nach Tarif (bei Unfall meist sofort)',
    deductible: 'Je nach Tarif', limit: 'Je nach Tarif',
    covered: ['Krankheit und OP', 'Hohe Erstattung', 'Digitale Tools'],
    summary: 'Figo (Figo Pet) ist ein digitaler Tierversicherer mit App-basierter Verwaltung und einer je nach Tarif hohen Erstattung. Auf Trustpilot erreicht Figo rund 4,5 von 5 Punkten bei vielen Bewertungen, was als Hinweis auf die Servicequalität dient, aber keine unabhängige Prüfung ersetzt. Ein moderner Ablauf für alle, die ihre Versicherung online managen wollen.',
    pros: ['Hohe Erstattung je nach Tarif möglich', 'App-basierte, moderne Verwaltung', 'Gute Kundenbewertungen auf Trustpilot'],
    cons: ['Bewertungen ersetzen keine unabhaengige Pruefung', 'Leistungen je Tarif genau vergleichen'],
    claimMethod: 'Rechnung in der App hochladen, Erstattung zum Tarifsatz nach Selbstbeteiligung.',
    extras: ['App', 'Digitale Tools', 'Tarife waehlbar'],
    idealFor: 'Wer einen durchgehend digitalen Anbieter will.',
    url: 'https://www.figopet.de', sponsored: false,
  },
  {
    name: 'AGILA', slug: 'de-agila', initials: 'AG', color: '#e4002b',
    kind: 'Spezialversicherer, etabliert', verdict: 'Preis-Leistung',
    tagline: 'Einer der ältesten Tierspezialversicherer, starkes Preis-Leistungs-Verhältnis',
    species: 'Hunde und Katzen', reimbursement: 'Je nach Tarif',
    waiting: 'Üblich 30 Tage (bei Unfall sofort)',
    deductible: 'Je nach Tarif', limit: 'Je nach Tarif',
    covered: ['Krankheit und OP', 'Spezialversicherer', 'Gute Freigänger-Tarife'],
    summary: 'AGILA ist einer der ältesten auf Tiere spezialisierten Versicherer in Deutschland und wird in Vergleichen vor allem für sein Preis-Leistungs-Verhältnis gelobt. Für Freigänger-Katzen gehört AGILA neben Petolo zu den häufig empfohlenen Anbietern. Ein etablierter Name mit langer Erfahrung in Hunde- und Katzentarifen.',
    pros: ['Sehr gutes Preis-Leistungs-Verhältnis', 'Langjähriger Tierspezialversicherer', 'Beliebt für Freigänger-Katzen'],
    cons: ['Spitzenerstattung nur in höheren Tarifen', 'Wartezeiten und GOT-Satz pruefen'],
    claimMethod: 'Rechnung einreichen, Erstattung zum Tarifsatz nach Selbstbeteiligung.',
    extras: ['Spezialversicherer', 'Katzentarife', 'Lange Erfahrung'],
    idealFor: 'Wer ein gutes Preis-Leistungs-Verhältnis von einem Spezialisten sucht.',
    url: 'https://www.agila.de/tierkrankenversicherung', sponsored: false,
  },
  {
    name: 'HanseMerkur', slug: 'de-hansemerkur', initials: 'HM', color: '#003a5d',
    kind: 'Großer Versicherer', verdict: 'Stark bei OP',
    tagline: 'Großer Versicherer, besonders stark bei der reinen OP-Versicherung',
    species: 'Hunde und Katzen', reimbursement: 'Je nach Tarif',
    waiting: 'Üblich 30 Tage (bei Unfall sofort)',
    deductible: 'Je nach Tarif', limit: 'Je nach Tarif',
    covered: ['Krankheit und OP', 'Starke OP-Versicherung', 'Großer Versicherer'],
    summary: 'HanseMerkur ist ein großer, etablierter Versicherer, der in Vergleichen vor allem bei der reinen OP-Versicherung vorn liegt. Neben der vollen Tierkrankenversicherung gibt es die günstigere OP-Variante, die nur Operationskosten abdeckt, dafür aber deutlich weniger kostet als der Vollschutz. Eine solide Wahl für alle, die den Schwerpunkt auf teure Operationen legen.',
    pros: ['Besonders stark bei der OP-Versicherung', 'Großer, finanzstarker Versicherer', 'Günstigere OP-Variante verfügbar'],
    cons: ['OP-Variante deckt keine ambulanten Behandlungen', 'Vollschutz vergleichsweise teurer'],
    claimMethod: 'Rechnung einreichen, Erstattung zum Tarifsatz; die OP-Variante zahlt nur Operationen.',
    extras: ['OP-Versicherung', 'Vollschutz', 'Großer Versicherer'],
    idealFor: 'Wer vor allem teure Operationen absichern will.',
    url: 'https://www.hansemerkur.de/tierkrankenversicherung', sponsored: false,
  },
  {
    name: 'Barmenia', slug: 'de-barmenia', initials: 'Ba', color: '#78b833',
    kind: 'Großer Versicherer (BarmeniaGothaer)', verdict: 'Vier Tarife',
    tagline: 'Tarife Basis bis Premium Plus, bis 100% Erstattung und Vorsorgezuschuss',
    species: 'Hunde und Katzen', reimbursement: 'Bis 100% der erstattungsfähigen Kosten',
    waiting: 'Allgemein 30 Tage (bei Unfall sofort); Premium Plus 6 Monate statt 18',
    deductible: 'Optional 20% je Rechnung, max. 250€ pro Jahr', limit: 'Je nach Tarif',
    covered: ['Krankheit und OP', 'Vier Tarifstufen', 'Kastrationszuschuss (Premium Plus)'],
    summary: 'Barmenia (heute Teil von BarmeniaGothaer) bietet die Tierkrankenversicherung in vier Stufen an: Basis, Top, Premium und Premium Plus, mit bis zu 100% Erstattung. Der Top-Tarif Premium Plus verkürzt die Wartezeit auf 6 Monate (statt 18), bringt bis zu 150€ Zuschuss zur Kastration und einen jährlichen Vorsorgezuschuss. Eine Selbstbeteiligung von 20% je Rechnung (max. 250€ pro Jahr) ist wählbar, und es gilt ein weltweiter Schutz bis zu zwölf Monate auf Reisen.',
    pros: ['Vier Tarifstufen bis 100% Erstattung', 'Premium Plus mit kurzer Wartezeit und Vorsorgezuschuss', 'Weltweiter Schutz bis 12 Monate auf Reisen'],
    cons: ['Lange Wartezeiten in den unteren Tarifen', 'Altersgrenze beim Neuabschluss (Tier muss gesund sein)'],
    claimMethod: 'Rechnung einreichen, bis 100% Erstattung je nach Tarif; optionale Selbstbeteiligung von 20% (max. 250€/Jahr).',
    extras: ['Vier Tarife', 'Kastrationszuschuss', 'Weltweiter Reiseschutz'],
    idealFor: 'Wer gestaffelte Tarife und Vorsorgeleistungen schätzt.',
    url: 'https://www.barmenia.de/deu/bde_privat/bde_produkte_privat/bde_rund_ums_tier/tierkrankenversicherung.xhtml', sponsored: false,
  },
  {
    name: 'Gothaer', slug: 'de-gothaer', initials: 'Go', color: '#1a3b8b',
    kind: 'Großer Versicherer (BarmeniaGothaer)', verdict: 'Premium Plus unbegrenzt',
    tagline: 'Bis 100% Erstattung, im Premium Plus unbegrenzte OP-Kosten',
    species: 'Hunde, Katzen und Pferde', reimbursement: 'Bis 100% (GOT bis 3-fach, Notdienst bis 4-fach)',
    waiting: 'Allgemein 30 Tage (bei Unfall sofort)',
    deductible: 'Je nach Tarif', limit: 'Premium Plus: OP-Kosten unbegrenzt',
    covered: ['Krankheit und OP', 'Bis 4-fach GOT im Notdienst', 'Auch Pferde'],
    summary: 'Die Gothaer (Teil von BarmeniaGothaer) bietet Tierkrankenversicherung, OP-Versicherung und Tierhalterhaftpflicht für Hunde, Katzen und Pferde. Erstattet werden bis zu 100% der Kosten, bis zum 3-fachen GOT-Satz, im Notdienst sogar bis zum 4-fachen. Der Tarif Premium Plus übernimmt konservative Behandlungs- und OP-Kosten in unbegrenzter Höhe. Es gilt eine allgemeine Wartezeit von 30 Tagen, bei Unfall sofortiger Schutz.',
    pros: ['Bis 100% Erstattung, im Notdienst bis 4-fach GOT', 'Premium Plus mit unbegrenzten OP-Kosten', 'Auch Pferdeversicherung verfügbar'],
    cons: ['Altersgrenze beim Neuabschluss', 'Spitzenleistung nur im Premium-Plus-Tarif'],
    claimMethod: 'Rechnung einreichen, bis 100% Erstattung bis zum 3-fachen (Notdienst 4-fachen) GOT-Satz.',
    extras: ['Pferdeversicherung', 'Hohe GOT-Erstattung', 'Tierhalterhaftpflicht'],
    idealFor: 'Wer hohe GOT-Erstattung und unbegrenzte OP-Kosten will.',
    url: 'https://www.gothaer.de/tierversicherung/tierkrankenversicherung/', sponsored: false,
  },
  {
    name: 'Uelzener', slug: 'de-uelzener', initials: 'Ue', color: '#004c3f',
    kind: 'Ältester Tierversicherer Deutschlands', verdict: 'Traditionsanbieter',
    tagline: 'Der älteste Tierspezialversicherer, bewährt auch für ältere Tiere',
    species: 'Hunde, Katzen und Pferde', reimbursement: 'Je nach Tarif',
    waiting: 'Je nach Tarif (bei Unfall sofort)',
    deductible: 'Je nach Tarif', limit: 'Je nach Tarif',
    covered: ['Krankheit und OP', 'Traditionsversicherer', 'Auch für ältere Tiere'],
    summary: 'Die Uelzener ist der älteste auf Tiere spezialisierte Versicherer Deutschlands und wird in Vergleichen häufig für ältere Tiere empfohlen. Es gibt Hunde-, Katzen- und Pferdeversicherungen; die Hundekrankenversicherung startet laut Website bei rund 42,79€, die Katzenvariante bei etwa 21,49€ im Monat. Ein verlässlicher Traditionsname mit langer Erfahrung.',
    pros: ['Ältester Tierspezialversicherer Deutschlands', 'Häufig empfohlen für ältere Tiere', 'Auch Pferdeversicherung'],
    cons: ['Weniger digitaler Auftritt als die Insurtechs', 'Leistungen je Tarif genau pruefen'],
    claimMethod: 'Rechnung einreichen, Erstattung zum Tarifsatz nach Selbstbeteiligung.',
    extras: ['Traditionsversicherer', 'Pferdeversicherung', 'Tarife fuer aeltere Tiere'],
    idealFor: 'Besitzer älterer Tiere und wer einen Traditionsanbieter sucht.',
    url: 'https://uelzener.de/hund/', sponsored: false,
  },
  {
    name: 'Allianz', slug: 'de-allianz', initials: 'Al', color: '#003781',
    kind: 'Großer internationaler Versicherer', verdict: 'Großer Versicherer',
    tagline: 'Tierkrankenversicherung vom größten deutschen Versicherer',
    species: 'Hunde und Katzen', reimbursement: 'Je nach Tarif',
    waiting: 'Je nach Tarif (bei Unfall meist sofort)',
    deductible: 'Je nach Tarif', limit: 'Je nach Tarif',
    covered: ['Krankheit und OP', 'Großer Versicherer', 'Beratung vor Ort'],
    summary: 'Die Allianz, einer der größten Versicherer der Welt, bietet eine Tierkrankenversicherung für Hunde und Katzen an. Für alle, die Wert auf einen finanzstarken Anbieter und persönliche Beratung in einer Agentur legen, ist die Allianz eine naheliegende Wahl, mit der Möglichkeit, die Tierpolice mit anderen Verträgen zu bündeln.',
    pros: ['Sehr großer, finanzstarker Versicherer', 'Persönliche Beratung in Agenturen', 'Bündelung mit anderen Verträgen möglich'],
    cons: ['Konditionen je nach Vermittler', 'Nicht auf Tiere spezialisiert'],
    claimMethod: 'Rechnung über die Agentur oder online einreichen, Erstattung nach Tarif.',
    extras: ['Agenturnetz', 'Große Marke', 'Vertragsbündelung'],
    idealFor: 'Wer einen großen Versicherer und persönliche Beratung bevorzugt.',
    url: 'https://www.allianz.de/recht-und-eigentum/tierkrankenversicherung/', sponsored: false,
  },
  {
    name: 'DA Direkt', slug: 'de-dadirekt', initials: 'DA', color: '#e2001a',
    kind: 'Direktversicherer', verdict: 'Direkt und günstig',
    tagline: 'Direktversicherer mit schlanken, oft günstigen Tiertarifen',
    species: 'Hunde und Katzen', reimbursement: 'Je nach Tarif',
    waiting: 'Je nach Tarif (bei Unfall meist sofort)',
    deductible: 'Je nach Tarif', limit: 'Je nach Tarif',
    covered: ['Krankheit und OP', 'Direktversicherer', 'Online-Abschluss'],
    summary: 'DA Direkt ist ein Direktversicherer (Teil der Zurich-Gruppe), der seine Tierkrankenversicherung ohne Zwischenhändler und oft zu günstigen Konditionen anbietet. Abschluss und Verwaltung laufen direkt online oder telefonisch. Interessant für alle, die einen schlanken, direkten Anbieter mit dem Rückhalt eines großen Konzerns suchen.',
    pros: ['Direktversicherer, oft günstig', 'Online- und Telefonabschluss', 'Rückhalt der Zurich-Gruppe'],
    cons: ['Keine persönliche Agenturberatung', 'Leistungen je Tarif genau pruefen'],
    claimMethod: 'Rechnung online oder telefonisch einreichen, Erstattung nach Tarif.',
    extras: ['Direktversicherer', 'Online-Abschluss', 'Konzern-Rückhalt'],
    idealFor: 'Wer einen günstigen Direktversicherer mit Konzern-Rückhalt will.',
    url: 'https://www.da-direkt.de/tierkrankenversicherung', sponsored: false,
  },
]

const BEST_FOR: Array<{ icon: string; label: string; pick: string; why: string }> = [
  { icon: '🏆', label: 'Bester Gesamtsieger', pick: 'Lassie', why: 'Digital, ohne Altersgrenze und mit OP-Erstattung ohne Jahreslimit.' },
  { icon: '💯', label: 'Beste Vollerstattung', pick: 'Petolo', why: 'Bis 100% Erstattung, im Spitzentarif unbegrenzte Jahresleistung.' },
  { icon: '💶', label: 'Bestes Preis-Leistungs-Verhältnis', pick: 'AGILA', why: 'Langjähriger Spezialist mit starkem Preis-Leistungs-Verhältnis.' },
  { icon: '🏥', label: 'Beste OP-Versicherung', pick: 'HanseMerkur', why: 'Besonders stark bei der reinen OP-Absicherung.' },
  { icon: '🐈', label: 'Für ältere Tiere', pick: 'Uelzener', why: 'Traditionsanbieter, oft empfohlen für ältere Tiere.' },
  { icon: '🛡️', label: 'Großer Versicherer', pick: 'Allianz', why: 'Finanzstark mit persönlicher Beratung in der Agentur.' },
]

const CHOOSE_STEPS: Array<{ title: string; text: string }> = [
  { title: 'Lege dein Monatsbudget fest', text: 'Beiträge reichen von etwa 15€ für eine Katze bis 70€+ für einen großen Hund. Eine Spanne festzulegen sortiert schon die Hälfte der Angebote aus.' },
  { title: 'Prüfe den Erstattungssatz und den GOT-Satz', text: 'Entscheidend ist, wie viel Prozent erstattet werden (oft bis 100%) und bis zum wievielfachen GOT-Satz (Gebührenordnung für Tierärzte). Seit 2022 rechnen Praxen höher ab, im Notdienst bis zum 4-fachen Satz.' },
  { title: 'Achte auf die Jahreshöchstgrenze', text: 'Manche Tarife begrenzen die jährliche Erstattung, andere (z.B. Lassie, Petolo Vollschutz) bieten OP-Kosten ohne Jahreslimit. Eine große Operation kann ein niedriges Limit schnell ausschöpfen.' },
  { title: 'Beachte die Wartezeiten', text: 'In der Wartezeit zahlst du bereits, bekommst aber noch nichts erstattet. Üblich sind 30 Tage, bei Unfall meist sofortiger Schutz, bei bestimmten Erkrankungen länger.' },
  { title: 'Lies die Ausschlüsse und die Altersgrenze', text: 'Vorerkrankungen sind immer ausgeschlossen. Prüfe außerdem die Altershöchstgrenze beim Abschluss und mögliche Selbstbeteiligungen.' },
]

const COVERED: string[] = [
  'Tierarztbesuche bei Krankheit und Unfall',
  'Operationen und stationäre Behandlung',
  'Diagnostik (Röntgen, Ultraschall, Labor, MRT)',
  'Verschreibungspflichtige Medikamente',
  'Krebsbehandlung und chronische Erkrankungen',
  'Vorsorge und Kastrationszuschuss je nach Tarif',
]
const EXCLUDED: string[] = [
  'Vorerkrankungen (Symptome vor Abschluss oder in der Wartezeit)',
  'Kosten während der Wartezeit',
  'Zucht, Trächtigkeit und Geburt, außer als Zusatz',
  'Kosmetische und nicht medizinisch notwendige Eingriffe',
  'Leistungen oberhalb des vereinbarten GOT-Satzes oder Jahreslimits',
]

const CLAIM_STEPS: Array<{ title: string; text: string }> = [
  { title: 'Du gehst zum Tierarzt', text: 'Du bezahlst die Rechnung und erhältst eine detaillierte Rechnung (bei der ersten Krankheitsmeldung auch die Unterlagen).' },
  { title: 'Du reichst die Rechnung ein', text: 'Per App oder Kundenportal in wenigen Minuten. Digitale Anbieter akzeptieren ein Foto der Rechnung.' },
  { title: 'Du bekommst die Erstattung', text: 'Du erhältst deinen Erstattungssatz (bis 100%) nach Abzug der Selbstbeteiligung, bis zur Jahreshöchstgrenze, meist per Überweisung.' },
  { title: 'GOT-Satz beachten', text: 'Erstattet wird nur bis zum vereinbarten GOT-Satz (1- bis 4-fach). Rechnet die Praxis höher ab, bleibt der Rest bei dir.' },
]

const PROFILE_ROWS: Array<{ profile: string; need: string; suggestion: string }> = [
  { profile: 'Welpe oder Kitten', need: 'Früh abschließen für niedrigen Beitrag und keine Ausschlüsse', suggestion: 'Lassie, Petolo oder Figo' },
  { profile: 'Älteres Tier', need: 'Keine oder hohe Altersgrenze, faire Wartezeiten', suggestion: 'Lassie (keine Altersgrenze), Uelzener' },
  { profile: 'Große oder Risiko-Rasse', need: 'Hohe oder unbegrenzte Jahresleistung', suggestion: 'Lassie oder Petolo (ohne Jahreslimit)' },
  { profile: 'Knappes Budget', need: 'Niedriger Beitrag, ggf. nur OP', suggestion: 'DA Direkt oder HanseMerkur (OP-Versicherung)' },
  { profile: 'Freigänger-Katze', need: 'Guter Krankenschutz zu fairem Preis', suggestion: 'Petolo oder AGILA' },
  { profile: 'Auch Pferd versichern', need: 'Anbieter mit Pferdetarifen', suggestion: 'Gothaer oder Uelzener' },
]

const MISTAKES: string[] = [
  'Warten, bis das Tier krank ist: bereits gezeigte Erkrankungen werden nie erstattet.',
  'Nur auf den Monatsbeitrag schauen, ohne GOT-Satz und Jahreslimit zu prüfen.',
  'Die Wartezeit vergessen und glauben, der Schutz gelte ab dem ersten Tag.',
  'Den GOT-Satz ignorieren, obwohl Praxen seit 2022 oft den 3- bis 4-fachen Satz abrechnen.',
  'Die Jahreshöchstgrenze für eine große Rasse unterschätzen, die eine OP schnell ausschöpft.',
]

const GLOSSARY: Array<{ term: string; def: string }> = [
  { term: 'Erstattungssatz', def: 'Der Prozentsatz der erstattungsfähigen Tierarztkosten, der dir zurückgezahlt wird, oft bis zu 100%.' },
  { term: 'GOT-Satz', def: 'Die Gebührenordnung für Tierärzte legt Mindest- bis Höchstsätze fest (1- bis 4-fach). Tarife erstatten nur bis zu einem bestimmten GOT-Satz; im Notdienst ist der 4-fache Satz üblich.' },
  { term: 'Jahreshöchstgrenze', def: 'Der maximale Betrag, den der Tarif pro Jahr erstattet. Manche Tarife bieten OP-Kosten ohne Jahreslimit.' },
  { term: 'Selbstbeteiligung', def: 'Der Anteil der Kosten, den du je Rechnung oder je Jahr selbst trägst, z.B. 20% je Rechnung (oft gedeckelt).' },
  { term: 'Wartezeit', def: 'Zeitraum nach Abschluss, in dem du zahlst, aber noch keine Leistung erhältst. Üblich 30 Tage, bei Unfall meist sofort.' },
  { term: 'Vorerkrankung', def: 'Jede Erkrankung mit Symptomen vor Abschluss oder in der Wartezeit. Sie ist immer ausgeschlossen.' },
  { term: 'OP-Versicherung', def: 'Günstigere Variante, die nur Operationskosten abdeckt, nicht ambulante Behandlungen.' },
  { term: 'Tierhalterhaftpflicht', def: 'Deckt Schäden, die dein Tier Dritten zufügt. Für Hunde in mehreren Bundesländern Pflicht, getrennt von der Krankenversicherung.' },
  { term: 'Vorsorge', def: 'Zusatzleistungen für nicht krankheitsbedingte Kosten wie Impfungen, Zahnreinigung oder Kastration, je nach Tarif.' },
]

const PRICE_ROWS: Array<{ profile: string; range: string; note: string }> = [
  { profile: 'Reine OP-Versicherung', range: 'ca. 8 bis 20€ / Monat', note: 'Deckt nur Operationen, nicht ambulante Behandlung.' },
  { profile: 'Katze, Vollschutz', range: 'ca. 15 bis 40€ / Monat', note: 'Freigänger teurer als Wohnungskatzen.' },
  { profile: 'Hund, Vollschutz', range: 'ca. 30 bis 70€+ / Monat', note: 'Steigt stark mit Größe, Rasse und Alter.' },
  { profile: 'Tierhalterhaftpflicht (Hund)', range: 'ca. 3 bis 6€ / Monat', note: 'Separate Police, in einigen Bundesländern Pflicht.' },
]

const VET_COSTS: Array<{ act: string; cost: string }> = [
  { act: 'Routineuntersuchung', cost: '30 bis 60€' },
  { act: 'Röntgen oder Ultraschall', cost: '80 bis 300€' },
  { act: 'Kreuzband-OP', cost: '1.500 bis 4.000€' },
  { act: 'Krebsbehandlung oder große OP', cost: '3.000 bis 8.000€+' },
]

const FAQ: Array<{ q: string; a: string }> = [
  { q: 'Welche ist die beste Tierkrankenversicherung 2026?', a: 'Es gibt keine universell beste Versicherung: Es hängt von Tier, Budget und Bedarf ab. Für die meisten Hunde und Katzen gilt Lassie als starke digitale Wahl (ohne Altersgrenze, OP ohne Jahreslimit). Für maximale Erstattung Petolo, für das Preis-Leistungs-Verhältnis AGILA, für die reine OP-Versicherung HanseMerkur und für ältere Tiere die Uelzener.' },
  { q: 'Was kostet eine Tierkrankenversicherung?', a: 'Ein Vollschutz kostet für Katzen grob 15 bis 40€ und für Hunde etwa 30 bis 70€+ im Monat, eine reine OP-Versicherung oft schon ab 8 bis 20€. Der Beitrag hängt von Tierart, Rasse, Alter, Tarif und Selbstbeteiligung ab.' },
  { q: 'Was ist der GOT-Satz?', a: 'Die Gebührenordnung für Tierärzte (GOT) legt fest, was Tierärzte abrechnen dürfen, als 1- bis 4-facher Satz. Tarife erstatten nur bis zu einem bestimmten GOT-Satz. Seit der GOT-Reform 2022 sind die Kosten gestiegen, im Notdienst gilt oft der 4-fache Satz, daher lohnt ein Tarif mit hoher GOT-Erstattung.' },
  { q: 'Was ist eine Wartezeit?', a: 'Der Zeitraum nach Abschluss, in dem du bereits zahlst, aber noch keine Leistung bekommst. Üblich sind 30 Tage, bei Unfall meist sofortiger Schutz, bei bestimmten Erkrankungen (etwa Kreuzband) länger.' },
  { q: 'Werden Vorerkrankungen übernommen?', a: 'Nein. Erkrankungen, deren Symptome vor Abschluss oder in der Wartezeit auftreten, sind branchenweit ausgeschlossen. Deshalb lohnt sich der Abschluss, solange das Tier jung und gesund ist.' },
  { q: 'Ab welchem Alter sollte ich mein Tier versichern?', a: 'So früh wie möglich. Der Beitrag ist am niedrigsten und das Risiko eines Ausschlusses wegen Vorerkrankung am kleinsten, wenn das Tier jung ist. Manche Anbieter setzen eine Altersgrenze beim Abschluss, Lassie etwa verzichtet darauf.' },
  { q: 'Ist eine Tierversicherung in Deutschland Pflicht?', a: 'Die Tierkrankenversicherung ist freiwillig. Eine Tierhalterhaftpflicht für Hunde ist dagegen in mehreren Bundesländern (etwa Berlin, Hamburg, Niedersachsen, Schleswig-Holstein) sowie für als gefährlich eingestufte Hunde Pflicht. Das ist ein eigenes Produkt, getrennt von der Krankenversicherung.' },
  { q: 'Deckt die Versicherung Kastration oder Impfungen?', a: 'Nicht im Basisschutz: Das sind Vorsorgeleistungen. Sie sind nur über einen Vorsorgebaustein oder einen Premiumtarif abgedeckt, einige Tarife (z.B. Barmenia Premium Plus) geben einen Kastrationszuschuss.' },
  { q: 'Was ist, wenn ich mit meinem Tier ins Ausland reise?', a: 'Viele Tarife erstatten Tierarztkosten auch im Ausland, teils weltweit bis zu zwölf Monate (etwa Barmenia). Prüfe die Auslandsdeckung in den Bedingungen. Die Versicherung ersetzt keine Einreisepapiere: EU-Heimtierausweis und gültige Tollwutimpfung bleiben Pflicht.' },
]

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale !== 'de') notFound()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Beste Tierkrankenversicherung 2026',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: INSURERS.length,
    itemListElement: INSURERS.map((ins, i) => ({ '@type': 'ListItem', position: i + 1, name: ins.name, url: ins.url })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Beste Tierkrankenversicherung 2026: Hund & Katze im Vergleich',
    inLanguage: 'de',
    datePublished: '2026-11-12',
    dateModified: '2026-11-12',
    author: { '@type': 'Person', name: 'Jean-Baptiste Manson', jobTitle: 'Founder & Editor', url: `${SITE_URL}/de/about` },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets.com', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/de/${SLUG}`,
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-800 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <nav className="text-sm text-white/70 mb-6">
            <Link href="/de" className="hover:text-white">Startseite</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Tierkrankenversicherung</span>
          </nav>
          <span className="inline-block text-xs font-semibold tracking-wide uppercase bg-white/15 border border-white/20 rounded-full px-3 py-1 mb-5">
            Unabhängiger Vergleich · aktualisiert {UPDATED}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-5 max-w-3xl">
            Beste Tierkrankenversicherung 2026
          </h1>
          <p className="text-lg text-sky-50 max-w-2xl mb-8">
            Der komplette Leitfaden zur Kranken- und OP-Versicherung für Hund und Katze in
            Deutschland: Leistungen, Erstattungssatz, GOT-Satz, Wartezeiten, Preise und
            Ausschlüsse der 10 wichtigsten Anbieter, plus Tipps zur richtigen Wahl.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-sky-100">
            <span><strong className="text-white text-lg">10</strong> Anbieter verglichen</span>
            <span><strong className="text-white text-lg">6</strong> objektive Kriterien</span>
            <span><strong className="text-white text-lg">0</strong> erfundene Bewertungen, alles geprüft</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        {/* ── Intro ── */}
        <section className="prose-none">
          <p className="text-stone-700 leading-relaxed mb-4">
            Immer mehr Menschen in Deutschland versichern ihr Tier, und das aus gutem Grund: Seit der
            GOT-Reform 2022 sind die Tierarztkosten spürbar gestiegen, und eine einzige Operation kann
            mehr kosten als Jahre an Beiträgen. Eine Tierkrankenversicherung macht genau das: Sie
            verwandelt eine unvorhersehbare, hohe Rechnung in einen planbaren Monatsbeitrag.
          </p>
          <p className="text-stone-700 leading-relaxed">
            Der Markt teilt sich in digitale Anbieter (Lassie, Petolo, Figo), die schnell erstatten,
            spezialisierte Versicherer (AGILA, Uelzener) und große Gesellschaften (HanseMerkur,
            Barmenia, Gothaer, Allianz). Hier ist unser vollständiger Vergleich.
          </p>
        </section>

        {/* ── Pflicht? ── */}
        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-stone-900 mb-3">Ist eine Versicherung für Hunde Pflicht?</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-3">
            Die <strong>Tierkrankenversicherung</strong> ist freiwillig. Eine <strong>Tierhalterhaftpflicht</strong> für
            Hunde ist dagegen in mehreren Bundesländern Pflicht, darunter <strong>Berlin, Hamburg,
            Niedersachsen und Schleswig-Holstein</strong>, sowie bundesweit für als gefährlich eingestufte
            Hunde. Sie deckt Schäden, die dein Hund Dritten zufügt, und ist ein eigenes Produkt.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            Unser Rat: Prüfe zuerst die Haftpflicht-Pflicht in deinem Bundesland (sie kostet nur wenige
            Euro im Monat) und wähle dann eine Kranken- oder OP-Versicherung für die Tierarztkosten.
          </p>
        </section>

        {/* ── Comparison table ── */}
        <section id="vergleichstabelle" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Die Vergleichstabelle 2026</h2>
          <p className="text-sm text-stone-600 mb-5">Die 10 wichtigsten Tierversicherer in Deutschland, sortiert nach unserer redaktionellen Einschätzung von Leistung, Preis und Nutzererfahrung. Klicke auf einen Anbieter, um sein Profil zu öffnen.</p>
          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
            <table className="w-full text-sm min-w-[760px] bg-white">
              <thead className="bg-stone-100 text-stone-700">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold w-8">#</th>
                  <th className="text-left px-4 py-3 font-semibold">Anbieter</th>
                  <th className="text-left px-4 py-3 font-semibold">Stärken</th>
                  <th className="text-left px-4 py-3 font-semibold">Erstattung</th>
                  <th className="text-left px-4 py-3 font-semibold">Wartezeit</th>
                </tr>
              </thead>
              <tbody>
                {INSURERS.map((ins, i) => (
                  <tr key={ins.name} className="border-t border-stone-100 align-top hover:bg-stone-50">
                    <td className="px-4 py-4 font-bold text-stone-400">{i + 1}</td>
                    <td className="px-4 py-4">
                      <a href={`#profil-${ins.slug}`} className="flex items-center gap-2.5 group">
                        <BrandLogo src={`/logos/${ins.slug}.png`} name={ins.name} initials={ins.initials} color={ins.color} size={36} />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-stone-900 group-hover:text-sky-700 group-hover:underline">{ins.name}</span>
                            {ins.sponsored && (<span className="text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.5 rounded-full">Gesponsert</span>)}
                          </div>
                          <span className="text-xs font-medium text-sky-700">{ins.verdict}</span>
                          <span className="block text-[11px] text-stone-400 group-hover:text-sky-600">Profil ansehen ↓</span>
                        </div>
                      </a>
                    </td>
                    <td className="px-4 py-4 text-stone-600">{ins.covered.join(' · ')}</td>
                    <td className="px-4 py-4 text-stone-700">{ins.reimbursement}</td>
                    <td className="px-4 py-4 text-stone-600">{ins.waiting}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-stone-500 mt-3">Angaben als Richtwerte, Stand {UPDATED}. Wartezeiten und Erstattung variieren je Tarif. Der genaue Beitrag hängt von Tier, Rasse, Alter und Tarif ab: Angebot einholen und Bedingungen lesen, bevor du abschließt.</p>
        </section>

        {/* ── Detailed ranking cards ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Das detaillierte Ranking</h2>
          <div className="space-y-4">
            {INSURERS.map((ins, i) => (
              <article key={ins.name} id={`profil-${ins.slug}`} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6 scroll-mt-6">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center flex-shrink-0 gap-1">
                    <span className="text-xs font-bold text-stone-400">#{i + 1}</span>
                    <BrandLogo src={`/logos/${ins.slug}.png`} name={ins.name} initials={ins.initials} color={ins.color} size={48} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <h3 className="text-lg font-bold text-stone-900">{ins.name}</h3>
                      <span className="text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-full">{ins.verdict}</span>
                      {ins.sponsored && (<span className="text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">Gesponsert</span>)}
                      <a href="#vergleichstabelle" className="ml-auto text-xs text-stone-400 hover:text-sky-700 whitespace-nowrap">↑ Tabelle</a>
                    </div>
                    <p className="text-sm text-stone-500">{ins.kind}</p>
                    <p className="text-[13px] font-semibold text-stone-700 mt-1">{ins.tagline}</p>
                  </div>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed mt-4">{ins.summary}</p>

                <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm mt-4 border-t border-stone-100 pt-4">
                  <div><dt className="font-semibold text-stone-900">Tiere</dt><dd className="text-stone-600">{ins.species}</dd></div>
                  <div><dt className="font-semibold text-stone-900">Erstattung</dt><dd className="text-stone-600">{ins.reimbursement}</dd></div>
                  <div><dt className="font-semibold text-stone-900">Selbstbeteiligung</dt><dd className="text-stone-600">{ins.deductible}</dd></div>
                  <div><dt className="font-semibold text-stone-900">Jahreslimit</dt><dd className="text-stone-600">{ins.limit}</dd></div>
                  <div className="sm:col-span-2"><dt className="font-semibold text-stone-900">Wartezeit</dt><dd className="text-stone-600">{ins.waiting}</dd></div>
                </dl>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {ins.covered.map((c) => (<span key={c} className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-full">✓ {c}</span>))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-800 mb-2">Stärken</p>
                    <ul className="space-y-1.5 text-sm text-stone-700">
                      {ins.pros.map((p) => (<li key={p} className="flex gap-2"><span className="text-emerald-600 flex-shrink-0">✓</span><span>{p}</span></li>))}
                    </ul>
                  </div>
                  <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-amber-800 mb-2">Zu beachten</p>
                    <ul className="space-y-1.5 text-sm text-stone-700">
                      {ins.cons.map((c) => (<li key={c} className="flex gap-2"><span className="text-amber-600 flex-shrink-0">!</span><span>{c}</span></li>))}
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed mt-4"><span className="font-semibold text-stone-900">So funktioniert die Erstattung:</span> {ins.claimMethod}</p>
                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  <span className="text-xs font-semibold text-stone-500 mr-1">Enthaltene Leistungen:</span>
                  {ins.extras.map((e) => (<span key={e} className="text-xs bg-sky-50 text-sky-700 border border-sky-100 px-2 py-0.5 rounded-full">{e}</span>))}
                </div>
                <p className="text-sm text-stone-600 leading-relaxed mt-3"><span className="font-semibold text-stone-800">Ideal für:</span> {ins.idealFor}</p>

                <a href={ins.url} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-1.5 text-sm font-bold text-white px-4 py-2 rounded-lg transition-opacity hover:opacity-90 mt-4" style={{ backgroundColor: ins.color }}>
                  {ins.name} ansehen und Angebot anfordern →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ── Best-for ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Kurz gesagt: die beste je nach Bedarf</h2>
          <p className="text-sm text-stone-600 mb-5">Ein schneller Überblick. Klicke auf einen Anbieter, um sein Profil zu öffnen.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BEST_FOR.map((b) => {
              const match = INSURERS.find((x) => x.name === b.pick)
              return (
                <div key={b.label} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
                  <div className="text-2xl mb-2" aria-hidden="true">{b.icon}</div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1">{b.label}</p>
                  {match ? (
                    <a href={`#profil-${match.slug}`} className="text-lg font-bold text-stone-900 mb-1 inline-block hover:text-sky-700 hover:underline">{b.pick} ↓</a>
                  ) : (
                    <p className="text-lg font-bold text-stone-900 mb-1">{b.pick}</p>
                  )}
                  <p className="text-sm text-stone-600 leading-relaxed">{b.why}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── How to choose ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">In 5 Schritten zur richtigen Wahl</h2>
          <ol className="space-y-3">
            {CHOOSE_STEPS.map((s, i) => (
              <li key={i} className="flex items-start gap-4 bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-700 text-white font-bold flex items-center justify-center">{i + 1}</span>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Covered / excluded ── */}
        <section className="grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-stone-900 mb-3">Was üblicherweise abgedeckt ist</h2>
            <ul className="space-y-2 text-sm text-stone-700">
              {COVERED.map((c) => (<li key={c} className="flex gap-2"><span className="text-emerald-600">✓</span><span>{c}</span></li>))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-stone-900 mb-3">Was ausgeschlossen ist</h2>
            <ul className="space-y-2 text-sm text-stone-700">
              {EXCLUDED.map((c) => (<li key={c} className="flex gap-2"><span className="text-rose-500">✗</span><span>{c}</span></li>))}
            </ul>
          </div>
        </section>

        {/* ── How reimbursement works ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">So funktioniert die Erstattung</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CLAIM_STEPS.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
                <span className="inline-flex w-8 h-8 rounded-full bg-sky-700 text-white font-bold items-center justify-center mb-3">{i + 1}</span>
                <h3 className="font-bold text-stone-900 mb-1">{s.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Is it worth it ── */}
        <section className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
          <h2 className="text-2xl font-bold text-stone-900 mb-3">Lohnt sich das?</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-5">
            Es kommt darauf an, wie du eine plötzliche vier- oder fünfstellige Tierarztrechnung stemmen
            würdest. Routinebesuche sind günstig und planbar, ein Unfall oder eine schwere Krankheit sind
            es nicht. Hier typische Kosten in Deutschland ohne Versicherung.
          </p>
          <div className="overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-sm">
              <thead className="bg-stone-100 text-stone-700"><tr><th className="text-left px-4 py-2.5 font-semibold">Behandlung</th><th className="text-left px-4 py-2.5 font-semibold">Typische Kosten</th></tr></thead>
              <tbody>
                {VET_COSTS.map((v) => (<tr key={v.act} className="border-t border-stone-100"><td className="px-4 py-2.5 text-stone-700">{v.act}</td><td className="px-4 py-2.5 font-semibold text-stone-900">{v.cost}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed mt-4">
            Wenn eine Rechnung im vierstelligen Bereich dein Budget sprengen würde, lohnt sich die
            Versicherung meist, vor allem wenn du früh abschließt und einen niedrigen Beitrag sicherst,
            bevor eine Erkrankung auftritt.
          </p>
        </section>

        {/* ── Reimbursement example ── */}
        <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-stone-900 mb-3">Ein Erstattungsbeispiel</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-4">
            Angenommen, dein Hund reißt sich das Kreuzband und die Operation kostet <strong>3.000€</strong>.
            Dein Tarif erstattet 90%, mit einer Selbstbeteiligung von 20% je Rechnung bis maximal 250€ im Jahr:
          </p>
          <ul className="space-y-2 text-sm text-stone-800 mb-4">
            <li className="flex justify-between gap-4 border-b border-emerald-100 pb-2"><span>Tierarztrechnung</span><span className="font-semibold">3.000€</span></li>
            <li className="flex justify-between gap-4 border-b border-emerald-100 pb-2"><span>90% Erstattung</span><span className="font-semibold">2.700€</span></li>
            <li className="flex justify-between gap-4 border-b border-emerald-100 pb-2"><span>Abzüglich Selbstbeteiligung (gedeckelt auf 250€)</span><span className="font-semibold">- 250€</span></li>
            <li className="flex justify-between gap-4"><span>Deine Erstattung</span><span className="font-semibold text-emerald-700">= 2.450€ zurück</span></li>
          </ul>
          <p className="text-xs text-stone-500 leading-relaxed">
            Die Rechnung variiert je Anbieter (Selbstbeteiligung je Rechnung oder je Jahr, Erstattung vor oder nach Abzug). Zudem wird nur bis zum vereinbarten GOT-Satz erstattet. Prüfe immer die genaue Berechnung in den Bedingungen.
          </p>
        </section>

        {/* ── Common conditions ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Häufige Erkrankungen und ihre Kosten</h2>
          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
            <table className="w-full text-sm min-w-[640px] bg-white">
              <thead className="bg-stone-100 text-stone-700"><tr><th className="text-left px-4 py-3 font-semibold">Erkrankung</th><th className="text-left px-4 py-3 font-semibold">Typische Kosten</th><th className="text-left px-4 py-3 font-semibold">Warum es zählt</th></tr></thead>
              <tbody>
                {[
                  { c: 'Kreuzbandriss (Operation)', k: '1.500 bis 4.000€', n: 'Eine der häufigsten und teuersten Hunde-OPs; oft lange Wartezeit.' },
                  { c: 'Krebs (Diagnose und Behandlung)', k: '3.000 bis 8.000€+', n: 'Chemo, OP und Diagnostik summieren sich über Monate.' },
                  { c: 'Fremdkörper / Darmverschluss (OP)', k: '1.500 bis 4.000€', n: 'Verschlucktes Objekt; Notfall, meist unvorhersehbar.' },
                  { c: 'Diabetes (laufend, pro Jahr)', k: '800 bis 2.000€ / Jahr', n: 'Insulin, Kontrollen und Nachsorge lebenslang.' },
                  { c: 'Chronische Allergien (pro Jahr)', k: '300 bis 1.000€ / Jahr', n: 'Sehr häufig; wiederkehrende Medikamente und Spezialfutter.' },
                  { c: 'Notdienst (nachts, am Wochenende)', k: '150 bis 800€', n: 'Im Notdienst gilt oft der 4-fache GOT-Satz.' },
                ].map((r) => (<tr key={r.c} className="border-t border-stone-100"><td className="px-4 py-3 font-semibold text-stone-900">{r.c}</td><td className="px-4 py-3 text-emerald-700 font-semibold whitespace-nowrap">{r.k}</td><td className="px-4 py-3 text-stone-600">{r.n}</td></tr>))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── What affects your premium ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Was deinen Beitrag beeinflusst</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { f: 'Tierart', t: 'Hunde sind in der Regel teurer zu versichern als Katzen, die seltener und günstiger Schäden verursachen.' },
              { f: 'Rasse', t: 'Große Hunde und Rassen mit bekannten Risiken (Brachyzephalie, Hüftdysplasie) zahlen höhere Beiträge als Mischlinge.' },
              { f: 'Alter', t: 'Der Beitrag ist für Welpen und Kitten am niedrigsten und steigt jedes Jahr, deshalb lohnt der frühe Abschluss.' },
              { f: 'Wohnort', t: 'Tierarztkosten unterscheiden sich regional, daher kostet dasselbe Tier in einer teuren Großstadt mehr.' },
              { f: 'Deine Wahl', t: 'Ein hohes Jahreslimit, ein hoher Erstattungssatz und eine niedrige Selbstbeteiligung erhöhen den Beitrag. Das ist der Hebel für dein Budget.' },
            ].map((x) => (
              <div key={x.f} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
                <h3 className="font-bold text-stone-900 mb-1">{x.f}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{x.t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Expensive breeds ── */}
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-stone-900 mb-3">Die teuersten Rassen in der Versicherung</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-3">
            Manche Rassen zahlen höhere Beiträge, weil sie mehr gesundheitliche Risiken tragen. Dazu
            gehören kurznasige (brachyzephale) Rassen wie Französische Bulldogge, Mops und Englische
            Bulldogge mit Atemproblemen sowie große Rassen wie Deutsche Dogge, Deutscher Schäferhund
            und Labrador, die anfälliger für Hüftdysplasie und Kreuzbandverletzungen sind.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            Für diese Tiere lohnen ein hohes Jahreslimit und ein hoher Erstattungssatz, und ein früher
            Abschluss: Eine später entdeckte Veranlagung könnte als Vorerkrankung ausgeschlossen werden.
          </p>
        </section>

        {/* ── When it might not be worth it ── */}
        <section className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-stone-900 mb-3">Wann sie sich weniger lohnt</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-4">
            Eine Versicherung ist nicht für jeden automatisch sinnvoll. Sie lohnt sich weniger, wenn:
          </p>
          <ul className="space-y-2 text-sm text-stone-700">
            {[
              'Du eine Rücklage hast und eine überraschende Rechnung von 4.000€+ problemlos tragen könntest.',
              'Dein Tier alt ist und mehrere bestehende Erkrankungen hat, die als Vorerkrankung ausgeschlossen würden.',
              'Du nur kleine, planbare Kosten abdecken willst, die oft die Selbstbeteiligung aufzehrt.',
            ].map((n) => (<li key={n} className="flex gap-2"><span className="text-amber-600 flex-shrink-0">!</span><span>{n}</span></li>))}
          </ul>
          <p className="text-sm text-stone-600 leading-relaxed mt-4">
            Selbst dann ist der Abschluss für ein junges, gesundes Tier in einem günstigen Tarif eine
            preiswerte Absicherung gegen die eine Rechnung, die du nicht vorhersehen kannst.
          </p>
        </section>

        {/* ── By profile ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Welcher Anbieter nach Tierprofil</h2>
          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
            <table className="w-full text-sm min-w-[640px] bg-white">
              <thead className="bg-stone-100 text-stone-700"><tr><th className="text-left px-4 py-3 font-semibold">Profil</th><th className="text-left px-4 py-3 font-semibold">Worauf achten</th><th className="text-left px-4 py-3 font-semibold">Gute Wahl</th></tr></thead>
              <tbody>
                {PROFILE_ROWS.map((r) => (<tr key={r.profile} className="border-t border-stone-100"><td className="px-4 py-3 font-semibold text-stone-900">{r.profile}</td><td className="px-4 py-3 text-stone-600">{r.need}</td><td className="px-4 py-3 text-sky-700 font-medium">{r.suggestion}</td></tr>))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Was es im Monat kostet</h2>
          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
            <table className="w-full text-sm min-w-[640px] bg-white">
              <thead className="bg-stone-100 text-stone-700"><tr><th className="text-left px-4 py-3 font-semibold">Tarifart</th><th className="text-left px-4 py-3 font-semibold">Typischer Preis</th><th className="text-left px-4 py-3 font-semibold">Hinweis</th></tr></thead>
              <tbody>
                {PRICE_ROWS.map((r) => (<tr key={r.profile} className="border-t border-stone-100"><td className="px-4 py-3 font-semibold text-stone-900">{r.profile}</td><td className="px-4 py-3 text-emerald-700 font-semibold whitespace-nowrap">{r.range}</td><td className="px-4 py-3 text-stone-600">{r.note}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-stone-500 mt-3">Nur Richtwerte. Dein Beitrag hängt von Tierart, Rasse, Alter, Wohnort und gewähltem Tarif ab.</p>
        </section>

        {/* ── Mistakes ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Diese Fehler vermeiden</h2>
          <ul className="space-y-3">
            {MISTAKES.map((m, i) => (
              <li key={i} className="flex items-start gap-3 bg-white rounded-2xl border border-stone-200 shadow-sm p-4">
                <span className="text-rose-500 font-bold flex-shrink-0">✗</span>
                <span className="text-sm text-stone-700 leading-relaxed">{m}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Glossary ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Glossar</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
                <h3 className="font-bold text-stone-900 mb-1">{g.term}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{g.def}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Travel ── */}
        <section className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-stone-900 mb-3">Mit dem Tier verreisen</h2>
          <p className="text-sm text-stone-700 leading-relaxed">
            Viele Tarife erstatten Tierarztkosten auch im Ausland, einige weltweit bis zu zwölf Monate
            (etwa Barmenia). Prüfe die Auslandsdeckung vor der Abreise in den Bedingungen. Die
            Versicherung ersetzt keine Reisedokumente: EU-Heimtierausweis und gültige Tollwutimpfung
            bleiben für Grenzübertritte Pflicht.
          </p>
        </section>

        {/* ── Verdict ── */}
        <section className="bg-sky-900 text-white rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-3">Unser Fazit</h2>
          <p className="text-sky-50 leading-relaxed">
            Für die meisten bietet Lassie die beste Mischung aus digitaler Erfahrung, fehlender
            Altersgrenze und OP-Erstattung ohne Jahreslimit, während Petolo bei der Vollerstattung vorn
            liegt und AGILA beim Preis-Leistungs-Verhältnis. HanseMerkur ist stark bei der reinen
            OP-Versicherung, und Uelzener oder Barmenia sind gute Optionen für ältere Tiere. Egal wofür
            du dich entscheidest: Schließe früh ab, achte auf ein hohes Jahreslimit und einen hohen
            GOT-Satz und lies zuerst Wartezeiten und Ausschlüsse.
          </p>
        </section>

        {/* ── Methodology ── */}
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-stone-900 mb-3">Unsere Methode</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-3">
            Wir vergleichen jeden Anbieter anhand von sechs festen Kriterien: Umfang der Leistungen,
            Erstattungssatz, Jahreslimit, Wartezeiten, Ausschlüsse und Servicequalität. Jede Angabe
            stammt aus unabhängigen Vergleichen 2026 und aus den Bedingungen der Anbieter. Was wir nicht
            prüfen können, veröffentlichen wir nicht.
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">
            Das Ranking ist redaktionell. Jeder gesponserte Platz ist klar mit &quot;Gesponsert&quot;
            gekennzeichnet und ändert nichts an unserer Bewertung der Leistungen. Erstellt von
            Jean-Baptiste Manson, Gründer und Redakteur von HotelsWithPets.com.
          </p>
          <div className="mt-4 pt-4 border-t border-stone-100">
            <ContactCTA locale="de" variant="advertiser" />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Häufige Fragen</h2>
          <div className="space-y-4">
            {FAQ.map((f, i) => (
              <details key={i} className="bg-white rounded-2xl border border-stone-200 shadow-sm group">
                <summary className="px-6 py-4 font-semibold text-stone-900 cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="text-stone-500 group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                </summary>
                <div className="px-6 pb-5 text-stone-700 text-sm leading-relaxed border-t border-stone-100 pt-4">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <ContactCTA locale="de" variant="generic" />
      </div>
    </main>
  )
}
