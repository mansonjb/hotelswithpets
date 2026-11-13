import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import { insuranceLanguages } from '@/lib/insuranceSlugs'
import BrandLogo from '@/components/BrandLogo'
import ContactCTA from '@/components/ContactCTA'

const SLUG = 'seguro-mascotas'
const UPDATED = 'noviembre de 2026'

export async function generateStaticParams() {
  return [{ locale: 'es' }]
}

export const metadata: Metadata = {
  title: 'Mejores seguros para mascotas 2026: perros y gatos en España',
  description:
    'Comparativa independiente de los mejores seguros para mascotas en España en 2026: responsabilidad civil obligatoria, salud, reembolsos, carencias y coberturas de 10 aseguradoras, y cómo elegir.',
  alternates: {
    canonical: `${SITE_URL}/es/${SLUG}`,
    languages: insuranceLanguages(),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Mejores seguros para mascotas 2026: perros y gatos en España',
    description:
      'Comparativa independiente de los mejores seguros para mascotas en España en 2026: responsabilidad civil, salud, reembolsos y carencias.',
    url: `${SITE_URL}/es/${SLUG}`,
    siteName: 'HotelsWithPets.com',
  },
}

// ─── Data ───────────────────────────────────────────────────────────────────
// Todas las aseguradoras son empresas reales que operan en España. Las cifras
// son cualitativas y deliberadamente conservadoras: las primas exactas cambian
// según mascota, raza, edad, provincia y modalidad, así que remitimos a un
// presupuesto en lugar de publicar un número que no podamos garantizar. Las
// carencias, los reembolsos y los límites varían por póliza y comunidad, por lo
// que conviene confirmarlos en las condiciones de cada aseguradora. `sponsored`
// marca un hueco PAGADO y muestra una etiqueta "Patrocinado". Es false para
// todos hasta que un socio compre la posición. El orden es editorial y prima a
// las aseguradoras digitales por valor y experiencia.
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
  modalities: string
  rc: string
  priceFrom?: string
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
    name: 'Barkibu', slug: 'barkibu', initials: 'Ba', color: '#6366f1',
    kind: 'Aseguradora digital de salud', verdict: 'Digital, carencias cortas',
    tagline: '100% digital, con carencias cortas y opción sin límite anual',
    species: 'Perros y gatos', reimbursement: '80% de los gastos veterinarios',
    waiting: 'Unos 5 días en accidente, 28 en enfermedad, 6 meses en displasia',
    modalities: 'Plan de salud con reembolso del 80% y una opción sin límite anual',
    rc: 'Responsabilidad civil habitualmente incluida en la póliza',
    covered: ['Accidentes y enfermedad', 'Reembolso del 80%', 'Opción sin límite anual'],
    summary: 'Barkibu es una aseguradora digital especializada en la salud de perros y gatos. Destaca por una experiencia 100% online, por unas carencias de las más cortas del mercado (unos 5 días en accidentes y 28 en enfermedad) y por ofrecer una opción sin límite anual de reembolso, poco habitual en España. Reembolsa el 80% de los gastos veterinarios y la responsabilidad civil suele ir incluida en la póliza.',
    pros: ['Experiencia y gestión 100% digitales', 'Carencias de las más cortas del mercado', 'Opción sin límite anual de reembolso'],
    cons: ['El reembolso llega hasta el 80%, no al 100%', 'Precio de partida más alto que una RC básica', 'La displasia conserva 6 meses de carencia'],
    claimMethod: 'Subes la factura del veterinario desde la app y te reembolsan el 80% tras la carencia, sin tener que acudir a un cuadro cerrado de clínicas.',
    extras: ['App móvil', 'Opción sin límite anual', 'Veterinario a distancia'],
    idealFor: 'Quien quiere una experiencia digital y carencias cortas.',
    url: 'https://barkibu.com', sponsored: false,
  },
  {
    name: 'Caser', slug: 'caser', initials: 'Ca', color: '#e30613',
    kind: 'Aseguradora con red veterinaria propia', verdict: 'Salud sin carencias',
    tagline: 'RC, Plan Salud y Plan Salud Premium, sin carencias salvo incineración',
    species: 'Perros y gatos', reimbursement: 'Según modalidad (Plan Salud o Premium)',
    waiting: 'Sin carencia salvo la incineración (3 meses)',
    modalities: 'Tres niveles: Responsabilidad Civil, Plan Salud y Plan Salud Premium',
    rc: 'RC hasta 350.000€ y defensa jurídica, incluida en todas las modalidades',
    priceFrom: 'desde 3,90€/mes (RC)',
    covered: ['Responsabilidad civil 350.000€', 'Plan Salud y Premium', 'Más de 320 centros'],
    summary: 'Caser (hoy parte de Helvetia) ofrece su seguro MIMAscota en tres niveles: Responsabilidad Civil, Plan Salud y Plan Salud Premium, con la RC (hasta 350.000€ y defensa jurídica) incluida en todas. Su gran ventaja es que, según su web, no aplica carencias salvo en la incineración (3 meses), y cuenta con una red de más de 320 centros veterinarios. El Plan Salud Premium añade consultas ilimitadas.',
    pros: ['Una de las RC más altas (350.000€) con defensa jurídica', 'Sin carencias salvo la incineración', 'Más de 320 centros y consultas ilimitadas en Premium'],
    cons: ['El Plan Salud Premium es más caro que un seguro básico', 'La cobertura óptima solo está en la modalidad Premium'],
    claimMethod: 'Usas la red de más de 320 centros veterinarios o presentas la factura; sin periodos de espera salvo la incineración.',
    extras: ['Red veterinaria propia', 'Consultas ilimitadas (Premium)', 'Defensa jurídica'],
    idealFor: 'Quien prioriza la cobertura de salud sin carencias y una red de clínicas.',
    url: 'https://www.caser.es/seguros-de-mascotas', sponsored: false,
  },
  {
    name: 'Mapfre', slug: 'mapfre', initials: 'Ma', color: '#d50032',
    kind: 'Gran aseguradora, oferta modular', verdict: 'Modular y también exóticos',
    tagline: 'Desde solo RC hasta salud completa, y también exóticos y caballos',
    species: 'Perros, gatos, exóticos y caballos', reimbursement: '80%, con topes anuales de 500, 1.000 o 2.000€',
    waiting: 'Según la modalidad (consulta las condiciones)',
    modalities: 'De la responsabilidad civil básica a planes de salud con reembolso del 80%',
    rc: 'RC hasta 300.000€, desde unos 2,50€/mes',
    priceFrom: 'RC desde ~2,50€/mes',
    covered: ['Accidentes y enfermedad', 'RC desde ~2,50€', 'También exóticos y caballos'],
    summary: 'Mapfre, una de las mayores aseguradoras de España, ofrece una gama modular que va desde la responsabilidad civil básica (desde unos 2,50€/mes, hasta 300.000€) hasta planes de salud con reembolso del 80% y topes anuales de 500, 1.000 o 2.000€ a elegir. Es, además, de las pocas que aseguran también animales exóticos y caballos, no solo perros y gatos.',
    pros: ['Oferta muy modular, de solo RC a salud completa', 'Topes anuales elegibles (500, 1.000 o 2.000€)', 'Asegura también exóticos y caballos'],
    cons: ['El reembolso llega hasta el 80%', 'La experiencia de cliente recibe notas dispares', 'Topes anuales limitados frente a las opciones sin límite'],
    claimMethod: 'Presentas la factura veterinaria y te reembolsan el 80% hasta el tope anual elegido; la RC cubre los daños a terceros.',
    extras: ['Cobertura de exóticos', 'Topes anuales a elegir', 'Amplia red de oficinas'],
    idealFor: 'Quien quiere modular su cobertura o asegurar un animal exótico.',
    url: 'https://www.mapfre.es/seguros/particulares/otros-seguros/seguros-animales/', sponsored: false,
  },
  {
    name: 'Línea Directa', slug: 'lineadirecta', initials: 'LD', color: '#e4002b',
    kind: 'Aseguradora directa', verdict: 'De RC a plan veterinario',
    tagline: 'Tres pólizas: Esencial (RC), Completo y Completo con Plan Veterinario',
    species: 'Perros y gatos', reimbursement: 'Según póliza (Plan Veterinario)',
    waiting: 'Según la cobertura (eutanasia de 3 a 6 meses)',
    modalities: 'Esencial (RC), Completo (servicio veterinario) y Completo con Plan Veterinario',
    rc: 'Responsabilidad civil incluida en todas las pólizas',
    priceFrom: 'Plan Veterinario desde 18,90€/mes',
    covered: ['Responsabilidad civil', 'Servicio y asistencia veterinaria', 'Plan Veterinario completo'],
    summary: 'Línea Directa, aseguradora directa muy conocida, estructura su seguro de mascotas en tres niveles: Esencial (responsabilidad civil), Completo (añade servicio veterinario y asistencia) y Completo con Plan Veterinario, lanzado en octubre de 2026 desde 18,90€/mes. Al ser una aseguradora directa, se contrata y se gestiona sin intermediarios.',
    pros: ['Gama clara, de solo RC a plan veterinario completo', 'Aseguradora directa, sin intermediarios', 'Plan Veterinario reciente (2026)'],
    cons: ['El plan veterinario completo es el más caro de su gama', 'Algunas coberturas (eutanasia) con carencia de 3 a 6 meses'],
    claimMethod: 'Gestionas todo directamente con la aseguradora; el Plan Veterinario reembolsa los gastos cubiertos según la póliza.',
    extras: ['Asistencia incluida', 'Gestión directa', 'Plan Veterinario'],
    idealFor: 'Quien prefiere una aseguradora directa y elegir su nivel de cobertura.',
    url: 'https://www.lineadirecta.com/seguro-mascotas', sponsored: false,
  },
  {
    name: 'Santalucía', slug: 'santalucia', initials: 'SL', color: '#0072ce',
    kind: 'Aseguradora con variante PPP', verdict: 'Perro, gato y PPP',
    tagline: 'Seguro modular con variante expresa para perros potencialmente peligrosos',
    species: 'Perros, perros PPP y gatos', reimbursement: 'Según nivel (límite de gastos en torno a 1.000€)',
    waiting: 'La mayoría de garantías con carencia (fallecimiento, 6 meses)',
    modalities: 'Dos niveles de protección, para perro, perro PPP y gato',
    rc: 'Responsabilidad civil incluida según el nivel',
    covered: ['Responsabilidad civil', 'Variante PPP expresa', 'Dos niveles de protección'],
    summary: 'Santalucía ofrece un seguro de mascotas con dos niveles de protección y, a diferencia de muchos competidores, una variante expresa para perros potencialmente peligrosos (PPP), además de perro y gato. Es una opción sólida de una aseguradora establecida, aunque su límite de gastos veterinarios es más bajo (en torno a 1.000€) y la mayoría de sus garantías tienen carencia.',
    pros: ['Variante expresa para perros PPP', 'Aseguradora establecida y con red de oficinas', 'Dos niveles de protección'],
    cons: ['Límite de gastos veterinarios bajo (en torno a 1.000€)', 'La mayoría de garantías tienen carencia (fallecimiento, 6 meses)'],
    claimMethod: 'Presentas la factura y te reembolsan según el nivel contratado, hasta el límite de gastos veterinarios.',
    extras: ['Variante PPP', 'Red de oficinas', 'Dos niveles'],
    idealFor: 'Dueños de perros PPP y quien quiere una aseguradora con oficinas.',
    url: 'https://www.santalucia.es/seguros/mascotas', sponsored: false,
  },
  {
    name: 'FIATC', slug: 'fiatc', initials: 'Fi', color: '#e2001a',
    kind: 'Mutua, enfoque RC y salud', verdict: 'RC con defensa jurídica',
    tagline: 'RC para perros de 150.000€ o 300.000€, con defensa jurídica, y planes PPP',
    species: 'Perros, gatos, PPP y caballos', reimbursement: 'Según la modalidad de salud',
    waiting: 'Según la cobertura (consulta las condiciones)',
    modalities: 'RC (150.000€ o 300.000€) y asistencia veterinaria, con variante PPP',
    rc: 'RC de perros de 150.000€ o 300.000€, con defensa jurídica y fianzas',
    covered: ['Responsabilidad civil + defensa jurídica', 'Asistencia veterinaria', 'Variante PPP y caballos'],
    summary: 'FIATC, mutua aseguradora histórica, cubre tanto la responsabilidad civil de perros (con capitales de 150.000€ o 300.000€, defensa jurídica y fianzas incluidas) como la asistencia veterinaria. Ofrece además una variante específica para perros PPP, obligatoria por ley, y asegura incluso caballos. Para contratar la RC, el perro debe estar identificado con microchip.',
    pros: ['RC con defensa jurídica y fianzas incluidas', 'Variante PPP obligatoria cubierta', 'Mutua histórica, también asegura caballos'],
    cons: ['Menos enfoque digital que los pure players', 'Exige microchip para contratar la RC'],
    claimMethod: 'Presentas la factura para la asistencia veterinaria; la RC cubre los daños a terceros con defensa jurídica incluida.',
    extras: ['Defensa jurídica', 'Variante PPP', 'Seguro de caballos'],
    idealFor: 'Quien busca una RC sólida con defensa jurídica o un perro PPP.',
    url: 'https://www.fiatc.es/seguro-animales', sponsored: false,
  },
  {
    name: 'AXA', slug: 'axa', initials: 'AX', color: '#00008f',
    kind: 'Gran aseguradora internacional', verdict: 'Veterinario con RC optativa',
    tagline: 'Plan veterinario de una gran aseguradora, con RC optativa',
    species: 'Perros y gatos', reimbursement: 'Según el plan contratado',
    waiting: 'Según la cobertura (consulta las condiciones)',
    modalities: 'Seguro veterinario con responsabilidad civil como garantía optativa',
    rc: 'Responsabilidad civil como garantía optativa',
    covered: ['Asistencia veterinaria', 'RC optativa', 'Respaldo de gran aseguradora'],
    summary: 'AXA, una de las mayores aseguradoras internacionales, ofrece un seguro veterinario para perros y gatos en el que la responsabilidad civil se incluye como garantía optativa. Es la opción para quien prioriza el respaldo y la solvencia de una gran compañía, con la posibilidad de añadir o no la RC según sus necesidades.',
    pros: ['Respaldo de una gran aseguradora internacional', 'RC configurable como garantía optativa', 'Amplia red de agentes'],
    cons: ['La RC no viene incluida por defecto', 'Las condiciones varían según el mediador'],
    claimMethod: 'Presentas la factura veterinaria según tu plan; la RC se activa si la has contratado como garantía optativa.',
    extras: ['Respaldo internacional', 'RC optativa', 'Red de agentes'],
    idealFor: 'Quien valora el respaldo de una gran aseguradora y elegir la RC.',
    url: 'https://www.axa.es/seguros/mascotas', sponsored: false,
  },
  {
    name: 'RACC', slug: 'racc', initials: 'RA', color: '#d9a400',
    kind: 'Seguro del club (asegurado con AXA)', verdict: 'RC y asistencia',
    tagline: 'El seguro de mascota del RACC, con RC opcional y asistencia',
    species: 'Perros y gatos', reimbursement: 'Según el plan (riesgo asumido por AXA)',
    waiting: 'Según la cobertura (consulta las condiciones)',
    modalities: 'Seguro de mascota con RC opcional y asistencia incluida',
    rc: 'Responsabilidad civil opcional, desde unos 3,84€/mes',
    priceFrom: 'RC desde ~3,84€/mes',
    covered: ['Asistencia a la mascota', 'RC opcional', 'Orientación y asistencia en viaje'],
    summary: 'El RACC comercializa su seguro de mascotas en colaboración con AXA, con la responsabilidad civil como cobertura opcional (desde unos 3,84€/mes para un perro tipo). Encaja especialmente con quien ya es socio del club y valora la asistencia, incluida la orientación para viajar con la mascota.',
    pros: ['Precio de RC competitivo (desde ~3,84€)', 'Asistencia orientada también al viaje', 'Interesante para socios del RACC'],
    cons: ['Producto asegurado por AXA e intermediado por el club', 'La RC es opcional, no viene por defecto'],
    claimMethod: 'Gestionas el siniestro a través del RACC; el riesgo lo asume AXA y la RC se incluye si la contratas.',
    extras: ['Asistencia en viaje', 'RC opcional', 'Ventajas de socio'],
    idealFor: 'Socios del RACC y quien viaja a menudo con su mascota.',
    url: 'https://www.racc.es/seguros/mascotas', sponsored: false,
  },
  {
    name: 'Generali', slug: 'generali', initials: 'Ge', color: '#c21807',
    kind: 'Gran aseguradora internacional', verdict: 'Respaldo internacional',
    tagline: 'Seguro de mascotas de una gran aseguradora con amplia red de agentes',
    species: 'Perros y gatos', reimbursement: 'Según la modalidad',
    waiting: 'Según la cobertura (consulta las condiciones)',
    modalities: 'Seguro de mascotas con responsabilidad civil y asistencia veterinaria',
    rc: 'Responsabilidad civil incluida según la modalidad',
    covered: ['Responsabilidad civil', 'Asistencia veterinaria', 'Respaldo internacional'],
    summary: 'Generali, grupo asegurador internacional, ofrece un seguro de mascotas para perros y gatos que combina responsabilidad civil y asistencia veterinaria, con el respaldo de una gran compañía y una amplia red de agentes para quien prefiere un asesoramiento presencial frente a un proceso 100% digital.',
    pros: ['Respaldo de un gran grupo internacional', 'Combina RC y asistencia veterinaria', 'Amplia red de agentes para asesoramiento'],
    cons: ['Menos enfoque digital que las insurtech', 'El precio y las condiciones dependen del mediador'],
    claimMethod: 'Presentas la factura según tu modalidad; la RC cubre los daños a terceros causados por tu mascota.',
    extras: ['Respaldo internacional', 'Red de agentes', 'RC y asistencia'],
    idealFor: 'Quien prefiere un gran grupo y asesoramiento presencial.',
    url: 'https://www.generali.es/seguros-particulares/seguro-mascotas', sponsored: false,
  },
  {
    name: 'Welcome Seguros', slug: 'welcome', initials: 'We', color: '#ff6b00',
    kind: 'Aseguradora digital económica', verdict: 'El más barato',
    tagline: 'Uno de los precios de entrada más bajos, pero con franquicia',
    species: 'Perros y gatos', reimbursement: 'Con franquicia de 200€ por siniestro en salud',
    waiting: 'Según la cobertura (consulta las condiciones)',
    modalities: 'Seguro de mascota económico, con RC de 200.000€',
    rc: 'Responsabilidad civil de 200.000€ incluida',
    priceFrom: 'desde ~1,92€/mes',
    covered: ['Responsabilidad civil 200.000€', 'Precio de entrada bajo', 'Contratación online'],
    summary: 'Welcome Seguros es una opción digital de precio muy ajustado, con tarifas de entrada desde alrededor de 1,92€/mes y una responsabilidad civil de 200.000€. El contrapeso es una franquicia de 200€ por siniestro en la parte de salud, así que conviene mirar la letra pequeña: resulta atractiva para cubrir lo básico a bajo coste, menos para gastos veterinarios pequeños.',
    pros: ['De los precios de entrada más bajos del mercado', 'Contratación 100% online', 'Responsabilidad civil incluida (200.000€)'],
    cons: ['Franquicia de 200€ por siniestro en salud', 'RC más baja (200.000€) que las grandes aseguradoras'],
    claimMethod: 'Contratas y gestionas online; en salud se aplica una franquicia de 200€ por siniestro antes del reembolso.',
    extras: ['Contratación online', 'Precio bajo', 'RC incluida'],
    idealFor: 'Quien quiere cubrir lo básico (sobre todo la RC) al menor precio.',
    url: 'https://welcomeseguros.com/seguro-mascotas', sponsored: false,
  },
]

const BEST_FOR: Array<{ icon: string; label: string; pick: string; why: string }> = [
  { icon: '🏆', label: 'Mejor en general', pick: 'Barkibu', why: 'Digital, con carencias cortas y opción sin límite anual.' },
  { icon: '🏥', label: 'Mejor en salud', pick: 'Caser', why: 'Sin carencias salvo incineración y más de 320 centros.' },
  { icon: '💶', label: 'Más barato', pick: 'Welcome Seguros', why: 'Desde ~1,92€/mes, aunque con franquicia de 200€.' },
  { icon: '🐕', label: 'Para perros PPP', pick: 'Santalucía', why: 'Variante expresa para perros potencialmente peligrosos.' },
  { icon: '🦜', label: 'Para exóticos y caballos', pick: 'Mapfre', why: 'De las pocas que aseguran también exóticos y caballos.' },
  { icon: '🧭', label: 'Para socios y viaje', pick: 'RACC', why: 'RC opcional desde ~3,84€ y asistencia pensada para viajar.' },
]

const CHOOSE_STEPS: Array<{ title: string; text: string }> = [
  { title: 'Decide qué necesitas: RC, salud o ambas', text: 'La responsabilidad civil cubre los daños que tu perro cause a terceros y cuesta pocos euros al mes. El seguro de salud reembolsa los gastos veterinarios. Muchas pólizas combinan las dos.' },
  { title: 'Fija tu presupuesto mensual', text: 'En España una RC va de unos 2 a 5€/mes, una salud básica de 15 a 25€ y una completa de 25 a 40€ o más. Marcar una horquilla descarta ya la mitad de las ofertas.' },
  { title: 'Mira el límite anual y el reembolso', text: 'El límite anual es el máximo que te devuelven al año (desde unos 1.000€ hasta sin límite en Barkibu). El reembolso suele ser del 80%. Una sola operación puede agotar un límite bajo.' },
  { title: 'Comprueba las carencias', text: 'Durante la carencia pagas pero aún no te reembolsan. Es corta en accidentes, más larga en enfermedad y de meses en displasia o cirugías. Caser destaca por no aplicarlas salvo en la incineración.' },
  { title: 'Lee las exclusiones y la franquicia', text: 'Las enfermedades preexistentes siempre se excluyen. Revisa también la franquicia (lo que pagas por siniestro, como los 200€ de Welcome) y si hay cuadro de clínicas cerrado.' },
]

const COVERED: string[] = [
  'Responsabilidad civil por daños a terceros',
  'Consultas, pruebas y hospitalización por accidente o enfermedad',
  'Cirugía y tratamientos',
  'Asistencia veterinaria y, según la póliza, urgencias 24 h',
  'Servicios de prevención o consultas ilimitadas en planes premium',
]
const EXCLUDED: string[] = [
  'Enfermedades preexistentes o síntomas anteriores a la contratación',
  'Gastos durante el periodo de carencia',
  'Camadas, gestación y cría, salvo garantía específica',
  'Procedimientos estéticos o de conveniencia',
  'Franquicia a tu cargo en algunas pólizas (por ejemplo, 200€ por siniestro)',
]

const CLAIM_STEPS: Array<{ title: string; text: string }> = [
  { title: 'Vas al veterinario', text: 'Pagas la consulta y guardas la factura detallada (y el historial para una primera reclamación de enfermedad).' },
  { title: 'Presentas la factura', text: 'Desde la app o el área de cliente, en unos minutos. Las aseguradoras digitales aceptan la foto de la factura.' },
  { title: 'Te reembolsan', text: 'Recibes el porcentaje previsto (normalmente el 80%), menos la franquicia si la hay, hasta el límite anual.' },
  { title: 'O cuadro veterinario', text: 'Con aseguradoras con red (como Caser y sus más de 320 centros) usas una clínica concertada y evitas adelantar parte del gasto.' },
]

const PROFILE_ROWS: Array<{ profile: string; need: string; suggestion: string }> = [
  { profile: 'Cachorro', need: 'Asegurar pronto para un precio bajo y sin exclusiones', suggestion: 'Barkibu, Caser o Mapfre' },
  { profile: 'Perro PPP', need: 'RC obligatoria con el capital que exija tu comunidad', suggestion: 'Santalucía o FIATC (variante PPP)' },
  { profile: 'Solo responsabilidad civil', need: 'Cubrir el mínimo legal al menor precio', suggestion: 'Mapfre, RACC o Welcome' },
  { profile: 'Raza grande o de riesgo', need: 'Límite anual alto y buen reembolso', suggestion: 'Barkibu (opción sin límite) o Caser' },
  { profile: 'Animal exótico', need: 'Cobertura más allá de perros y gatos', suggestion: 'Mapfre' },
  { profile: 'Presupuesto ajustado', need: 'Prima mínima, cobertura básica', suggestion: 'Welcome o Mapfre (solo RC)' },
]

const MISTAKES: string[] = [
  'Esperar a que la mascota enferme: las enfermedades ya declaradas nunca se cubren.',
  'Elegir solo por el precio mensual sin mirar el límite anual ni la franquicia.',
  'Olvidar las carencias y creerse cubierto desde el primer día.',
  'Contratar solo la RC cuando se necesitaba salud, o al revés.',
  'No comprobar el capital de RC exigido para un perro PPP en tu comunidad.',
]

const GLOSSARY: Array<{ term: string; def: string }> = [
  { term: 'Responsabilidad civil (RC)', def: 'Cobertura que paga los daños que tu mascota cause a terceros (personas, bienes u otros animales). En España la Ley 7/2023 la establece como obligatoria para los perros, con matices.' },
  { term: 'Carencia', def: 'Periodo tras la contratación durante el que ya pagas pero aún no te reembolsan. Corto en accidentes, más largo en enfermedad y de meses en displasia o cirugías.' },
  { term: 'Reembolso', def: 'Porcentaje de los gastos veterinarios que te devuelven, normalmente el 80% en España.' },
  { term: 'Límite anual', def: 'Importe máximo que la póliza paga al año. Va desde alrededor de 1.000€ hasta sin límite en algunas aseguradoras digitales.' },
  { term: 'Franquicia', def: 'Parte del gasto que asumes tú en cada siniestro antes del reembolso (por ejemplo, 200€ en Welcome).' },
  { term: 'Preexistente', def: 'Enfermedad ya declarada o cuyos síntomas aparecieron antes de contratar. Siempre queda excluida.' },
  { term: 'Perro PPP', def: 'Perro potencialmente peligroso. Está obligado por ley a tener un seguro de RC con un capital mínimo que fija cada comunidad autónoma.' },
  { term: 'Cuadro o red veterinaria', def: 'Conjunto de clínicas concertadas con la aseguradora donde puedes evitar adelantar parte del gasto.' },
  { term: 'Defensa jurídica', def: 'Garantía que asume tu defensa legal y las fianzas si tu mascota causa un daño a un tercero.' },
]

const PRICE_ROWS: Array<{ profile: string; range: string; note: string }> = [
  { profile: 'Solo responsabilidad civil', range: 'unos 2 a 5€ / mes', note: 'Cubre el mínimo legal. Caser desde 3,90€, Mapfre desde ~2,50€.' },
  { profile: 'Salud básica', range: 'unos 15 a 25€ / mes', note: 'Reembolso y límite más ajustados. Suele incluir la RC.' },
  { profile: 'Salud completa o premium', range: 'unos 25 a 40€+ / mes', note: 'Reembolso alto, consultas ilimitadas, red de clínicas.' },
  { profile: 'Perro PPP (RC obligatoria)', range: 'desde unos 5 a 10€ / mes', note: 'O desde ~98€/año en Caser. Capital mínimo según comunidad.' },
]

const VET_COSTS: Array<{ act: string; cost: string }> = [
  { act: 'Consulta sencilla', cost: '30 a 50€' },
  { act: 'Radiografía o ecografía', cost: '60 a 200€' },
  { act: 'Cirugía de rodilla (rotura de ligamento)', cost: '1.500 a 3.000€' },
  { act: 'Tratamiento oncológico o cirugía mayor', cost: '2.000 a 5.000€+' },
]

const CONDITIONS: Array<{ condition: string; cost: string; note: string }> = [
  { condition: 'Rotura de ligamento cruzado (cirugía)', cost: '1.500 a 3.000€', note: 'Una de las cirugías más frecuentes en perros; carencia a menudo larga.' },
  { condition: 'Cáncer (diagnóstico y tratamiento)', cost: '2.000 a 5.000€+', note: 'Quimioterapia, cirugía y pruebas se acumulan durante meses.' },
  { condition: 'Cuerpo extraño / obstrucción (cirugía)', cost: '1.000 a 3.000€', note: 'Objeto tragado; urgencia casi siempre imprevisible.' },
  { condition: 'Diabetes (seguimiento anual)', cost: '600 a 1.500€ / año', note: 'Insulina, controles y revisiones de por vida.' },
  { condition: 'Alergias crónicas (al año)', cost: '300 a 900€ / año', note: 'Muy frecuentes; tratamientos recurrentes y dieta especial.' },
  { condition: 'Urgencia veterinaria (noche o festivo)', cost: '150 a 800€', note: 'Las clínicas de guardia cobran bastante más que una consulta normal.' },
]

const FACTORS: Array<{ factor: string; text: string }> = [
  { factor: 'Especie', text: 'El perro suele costar más de asegurar que el gato, con siniestros menos frecuentes y menos costosos.' },
  { factor: 'Raza', text: 'Las razas grandes y las de predisposición (braquicéfalas, displasia) pagan primas más altas que los mestizos.' },
  { factor: 'Edad', text: 'La prima es más baja en cachorros y sube cada año, de ahí la importancia de asegurar pronto.' },
  { factor: 'Comunidad autónoma', text: 'Los precios veterinarios varían por zona, así que la misma mascota cuesta más de asegurar en una gran ciudad.' },
  { factor: 'Tus elecciones', text: 'Un límite anual alto, un reembolso elevado y una franquicia baja suben la prima. Es la palanca para ajustar tu presupuesto.' },
]

const NOT_WORTH: string[] = [
  'Tienes un fondo de emergencia y podrías asumir sin problema una factura inesperada de 3.000€ o más.',
  'Tu mascota es mayor y con varias enfermedades ya declaradas, que quedarían excluidas como preexistentes.',
  'Solo quieres cubrir gastos pequeños y previsibles, que la franquicia suele absorber.',
]

const FAQ: Array<{ q: string; a: string }> = [
  { q: '¿Es obligatorio el seguro para perros en España?', a: 'La Ley 7/2023 de bienestar animal establece la obligación de tener un seguro de responsabilidad civil para los perros, en vigor desde el 29 de septiembre de 2023, pero su exigencia general depende de un reglamento todavía pendiente que fije el capital mínimo. Dos matices: los perros potencialmente peligrosos (PPP) ya están obligados a tener RC, y comunidades como Madrid o el País Vasco ya la exigen para todos los perros. Lo prudente es contratar al menos una RC, que cuesta pocos euros al mes.' },
  { q: '¿Cuál es el mejor seguro de mascotas en 2026?', a: 'No hay un mejor seguro universal: depende de tu mascota, tu presupuesto y si buscas RC, salud o ambas. Para una experiencia digital con carencias cortas, Barkibu. Para salud sin carencias y red de clínicas, Caser. Para modular desde solo RC, Mapfre. Para un perro PPP, Santalucía o FIATC. Para el precio más bajo, Welcome (con franquicia).' },
  { q: '¿Cuánto cuesta un seguro para perro o gato?', a: 'Una responsabilidad civil cuesta unos 2 a 5€ al mes. Un seguro de salud básico ronda los 15 a 25€ y uno completo los 25 a 40€ o más. El precio depende de la especie, la raza, la edad y el nivel de cobertura. Un gato suele costar algo menos que un perro.' },
  { q: '¿Qué es una carencia?', a: 'Es el periodo, tras contratar, durante el que ya pagas pero aún no te reembolsan. Suele ser corto en accidentes, más largo en enfermedad (semanas) y de varios meses en displasia o cirugías. Caser destaca por no aplicar carencias salvo en la incineración.' },
  { q: '¿Se cubren las enfermedades preexistentes?', a: 'No. Las enfermedades ya declaradas o cuyos síntomas aparecieron antes de contratar, o durante la carencia, quedan siempre excluidas. Por eso conviene asegurar a la mascota joven y sana.' },
  { q: '¿Qué capital de responsabilidad civil necesito para un perro PPP?', a: 'Los perros potencialmente peligrosos están obligados a tener un seguro de RC con un capital mínimo que fija cada comunidad autónoma; es habitual ver cifras entre 120.000€ y 180.000€. Comprueba el importe exacto en la normativa de tu comunidad antes de contratar.' },
  { q: '¿El seguro cubre la vacunación o la esterilización?', a: 'No como enfermedad: son actos de prevención o de conveniencia. Pueden estar cubiertos a través de un plan de salud premium o de un forfait de prevención, cuando la modalidad lo incluye.' },
  { q: '¿A qué edad conviene asegurar a la mascota?', a: 'Cuanto antes mejor. La prima es más baja y el riesgo de exclusión por enfermedad preexistente es menor. Algunas aseguradoras fijan una edad máxima de alta, así que conviene comprobarla antes de contratar.' },
  { q: '¿Y si viajo al extranjero con mi mascota?', a: 'Algunas pólizas cubren los gastos veterinarios durante un viaje por la Unión Europea, pero no todas. Revisa la garantía de asistencia en viaje. El seguro no sustituye a la documentación: el pasaporte europeo para animales y la vacunación antirrábica al día siguen siendo obligatorios.' },
  { q: '¿Cubre el seguro la limpieza dental?', a: 'Las enfermedades dentales (extracciones, tratamiento de infecciones) las cubren muchos planes de salud, a veces exigiendo un cuidado dental previo. La limpieza bucal de rutina se considera prevención y entra solo en un plan de salud premium o un forfait de prevención, no en la cobertura básica.' },
  { q: '¿Qué diferencia hay entre solo RC y un seguro de salud?', a: 'La responsabilidad civil cubre los daños que tu perro cause a terceros y cuesta pocos euros al mes; es ya una obligación legal. El seguro de salud reembolsa los gastos veterinarios por accidente o enfermedad. Muchas pólizas combinan ambas, y conviene tener al menos la RC.' },
  { q: '¿Puedo cambiar de aseguradora?', a: 'Sí, pero cambiar reinicia las carencias y cualquier enfermedad que tu mascota ya tenga pasa a ser preexistente con la nueva aseguradora, por lo que podría no quedar cubierta. Cambia solo si la nueva póliza es claramente mejor y tu mascota está sana.' },
  { q: '¿El seguro cubre la vacunación o la esterilización?', a: 'No como enfermedad: son actos de prevención o de conveniencia. Pueden estar cubiertos a través de un plan de salud premium o un forfait de prevención, cuando la modalidad lo incluye.' },
  { q: '¿Es más barato asegurar a un gato que a un perro?', a: 'Normalmente sí. El gato declara siniestros menos frecuentes y menos costosos, así que su prima suele ser más baja. Sus dolencias habituales (problemas urinarios, insuficiencia renal, hipertiroidismo) siguen cubiertas por el seguro de salud.' },
]

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale !== 'es') notFound()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Mejores seguros para mascotas 2026',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: INSURERS.length,
    itemListElement: INSURERS.map((ins, i) => ({ '@type': 'ListItem', position: i + 1, name: ins.name, url: ins.url })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Mejores seguros para mascotas 2026: perros y gatos en España',
    inLanguage: 'es',
    datePublished: '2026-11-01',
    dateModified: '2026-11-01',
    author: { '@type': 'Person', name: 'Jean-Baptiste Manson', jobTitle: 'Founder & Editor', url: `${SITE_URL}/es/about` },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets.com', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/es/${SLUG}`,
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
            <Link href="/es" className="hover:text-white">Inicio</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Seguro de mascotas</span>
          </nav>
          <span className="eyebrow inline-block bg-lime text-ink border-[1.6px] border-ink rounded-full px-3 py-1.5 mb-5">
            Comparativa independiente · actualizado en {UPDATED}
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold leading-[1.05] mb-5 max-w-3xl">
            Mejores seguros para mascotas 2026
          </h1>
          <p className="text-lg text-white/85 max-w-2xl mb-8">
            La guía completa del seguro para perros y gatos en España: responsabilidad
            civil (ahora obligatoria para los perros), salud, reembolsos, carencias,
            precios y exclusiones de las 10 principales aseguradoras, y cómo elegir
            sin equivocarte.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/85">
            <span><strong className="text-white text-lg">10</strong> aseguradoras comparadas</span>
            <span><strong className="text-white text-lg">6</strong> criterios objetivos</span>
            <span><strong className="text-white text-lg">0</strong> opiniones inventadas, todo verificado</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        {/* ── Intro ── */}
        <section className="prose-none">
          <p className="text-slate leading-relaxed mb-4">
            En España cada vez más dueños aseguran a su mascota, y no solo por salud: la Ley
            7/2023 de bienestar animal ha convertido la responsabilidad civil en una obligación
            para los perros. A la vez, los gastos veterinarios suben y una sola operación puede
            costar más que años de prima. El seguro hace justo eso: convierte un gasto imprevisible
            en una cuota mensual previsible, y te cubre frente a los daños que tu perro cause a terceros.
          </p>
          <p className="text-slate leading-relaxed">
            El mercado combina aseguradoras digitales (Barkibu) que reembolsan rápido, grandes
            compañías modulares (Mapfre, Caser, AXA, Generali) y mutuas (Santalucía, FIATC). Esta es
            nuestra comparativa completa para acertar.
          </p>
        </section>

        {/* ── RC obligatoria ── */}
        <section className="bg-lavender-soft border border-ink/20 rounded-[22px] p-6">
          <h2 className="text-xl font-bold text-ink mb-3">¿Es obligatorio el seguro para perros?</h2>
          <p className="text-sm text-slate leading-relaxed mb-3">
            La <strong>Ley 7/2023 de bienestar animal</strong> (artículo 30.3) establece que los
            dueños de perros deben contratar un seguro de <strong>responsabilidad civil</strong> que
            cubra los daños a terceros, en vigor desde el 29 de septiembre de 2023. Ahora bien, su
            exigencia general depende de un <strong>reglamento todavía pendiente</strong> que fije el
            capital mínimo: mientras no se apruebe, no se sanciona de forma generalizada.
          </p>
          <p className="text-sm text-slate leading-relaxed mb-3">
            Dos matices importantes: los <strong>perros potencialmente peligrosos (PPP)</strong> ya
            están obligados a tener RC, con un capital mínimo que fija cada comunidad autónoma (es
            habitual ver entre 120.000€ y 180.000€), y algunas comunidades, como <strong>Madrid</strong> o
            el <strong>País Vasco</strong>, ya la exigen para todos los perros.
          </p>
          <p className="text-sm text-slate leading-relaxed">
            Nuestra recomendación: contrata al menos una responsabilidad civil (cuesta pocos euros al
            mes) y valora añadir un plan de salud. Confirma siempre la normativa vigente en tu comunidad.
          </p>
        </section>

        {/* ── Comparison table ── */}
        <section id="tabla-comparativa" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-ink mb-2">La tabla comparativa 2026</h2>
          <p className="text-sm text-slate mb-5">Las 10 principales aseguradoras de mascotas en España, ordenadas por nuestro análisis editorial de cobertura, precio y experiencia. Haz clic en una aseguradora para abrir su ficha.</p>
          <div className="overflow-x-auto rounded-[22px] border-[1.6px] border-ink shadow-hard">
            <table className="w-full text-sm min-w-[760px] bg-white">
              <thead className="bg-lavender-soft text-slate">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold w-8">#</th>
                  <th className="text-left px-4 py-3 font-semibold">Aseguradora</th>
                  <th className="text-left px-4 py-3 font-semibold">Puntos fuertes</th>
                  <th className="text-left px-4 py-3 font-semibold">Reembolso</th>
                  <th className="text-left px-4 py-3 font-semibold">Carencia</th>
                </tr>
              </thead>
              <tbody>
                {INSURERS.map((ins, i) => (
                  <tr key={ins.name} className="border-t border-line align-top hover:bg-cream">
                    <td className="px-4 py-4 font-bold text-slate">{i + 1}</td>
                    <td className="px-4 py-4">
                      <a href={`#ficha-${ins.slug}`} className="flex items-center gap-2.5 group">
                        <BrandLogo src={`/logos/${ins.slug}.png`} name={ins.name} initials={ins.initials} color={ins.color} size={36} />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-ink group-hover:text-electric group-hover:underline">{ins.name}</span>
                            {ins.sponsored && (<span className="text-[10px] font-semibold bg-coral/25 text-ink border border-ink/20 px-1.5 py-0.5 rounded-full">Patrocinado</span>)}
                          </div>
                          <span className="text-xs font-medium text-electric">{ins.verdict}</span>
                          <span className="block text-[11px] text-slate group-hover:text-electric">Ver ficha ↓</span>
                        </div>
                      </a>
                    </td>
                    <td className="px-4 py-4 text-slate">{ins.covered.join(' · ')}</td>
                    <td className="px-4 py-4 text-slate">
                      {ins.reimbursement}
                      {ins.priceFrom && <div className="text-xs text-ink font-semibold mt-1">{ins.priceFrom}</div>}
                    </td>
                    <td className="px-4 py-4 text-slate">{ins.waiting}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate mt-3">Datos orientativos y actualizados en {UPDATED}. Carencias y reembolsos varían por póliza y comunidad. El precio exacto depende de la mascota, la raza, la edad y la modalidad: pide presupuesto y lee las condiciones antes de contratar.</p>
        </section>

        {/* ── Detailed ranking cards ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">El ranking detallado</h2>
          <div className="space-y-4">
            {INSURERS.map((ins, i) => (
              <article key={ins.name} id={`ficha-${ins.slug}`} className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-5 sm:p-6 scroll-mt-6">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center flex-shrink-0 gap-1">
                    <span className="text-xs font-bold text-slate">#{i + 1}</span>
                    <BrandLogo src={`/logos/${ins.slug}.png`} name={ins.name} initials={ins.initials} color={ins.color} size={48} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <h3 className="text-lg font-bold text-ink">{ins.name}</h3>
                      <span className="text-xs font-semibold bg-lavender-soft text-electric border border-ink/20 px-2 py-0.5 rounded-full">{ins.verdict}</span>
                      {ins.sponsored && (<span className="text-xs font-semibold bg-coral/25 text-ink border border-ink/20 px-2 py-0.5 rounded-full">Patrocinado</span>)}
                      <a href="#tabla-comparativa" className="ml-auto text-xs text-slate hover:text-electric whitespace-nowrap">↑ tabla</a>
                    </div>
                    <p className="text-sm text-slate">{ins.kind}</p>
                    <p className="text-[13px] font-semibold text-slate mt-1">{ins.tagline}</p>
                  </div>
                </div>

                <p className="text-sm text-slate leading-relaxed mt-4">{ins.summary}</p>

                <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm mt-4 border-t border-line pt-4">
                  <div><dt className="font-semibold text-ink">Animales</dt><dd className="text-slate">{ins.species}</dd></div>
                  <div><dt className="font-semibold text-ink">Reembolso</dt><dd className="text-slate">{ins.reimbursement}</dd></div>
                  <div><dt className="font-semibold text-ink">Responsabilidad civil</dt><dd className="text-slate">{ins.rc}</dd></div>
                  <div><dt className="font-semibold text-ink">Modalidades</dt><dd className="text-slate">{ins.modalities}</dd></div>
                  <div className="sm:col-span-2"><dt className="font-semibold text-ink">Carencia</dt><dd className="text-slate">{ins.waiting}</dd></div>
                </dl>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {ins.covered.map((c) => (<span key={c} className="text-xs bg-lime/30 text-ink border border-ink/20 px-2 py-0.5 rounded-full">✓ {c}</span>))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div className="bg-lime/30 border border-ink/20 rounded-xl p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-ink mb-2">Puntos fuertes</p>
                    <ul className="space-y-1.5 text-sm text-slate">
                      {ins.pros.map((p) => (<li key={p} className="flex gap-2"><span className="text-ink flex-shrink-0">✓</span><span>{p}</span></li>))}
                    </ul>
                  </div>
                  <div className="bg-coral/25 border border-ink/20 rounded-xl p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-ink mb-2">A tener en cuenta</p>
                    <ul className="space-y-1.5 text-sm text-slate">
                      {ins.cons.map((c) => (<li key={c} className="flex gap-2"><span className="text-ink flex-shrink-0">!</span><span>{c}</span></li>))}
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-slate leading-relaxed mt-4"><span className="font-semibold text-ink">Cómo se reembolsa:</span> {ins.claimMethod}</p>
                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  <span className="text-xs font-semibold text-slate mr-1">Servicios incluidos:</span>
                  {ins.extras.map((e) => (<span key={e} className="text-xs bg-lavender-soft text-electric border border-ink/20 px-2 py-0.5 rounded-full">{e}</span>))}
                </div>
                <p className="text-sm text-slate leading-relaxed mt-3"><span className="font-semibold text-ink">Ideal para:</span> {ins.idealFor}</p>

                <a href={ins.url} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-1.5 text-sm font-bold text-white px-4 py-2 rounded-lg transition-opacity hover:opacity-90 mt-4" style={{ backgroundColor: ins.color }}>
                  Ver {ins.name} y pedir presupuesto →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ── Best-for ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-2">En resumen: la mejor según lo que necesitas</h2>
          <p className="text-sm text-slate mb-5">Un repaso rápido para ir al grano. Haz clic en una aseguradora para abrir su ficha.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BEST_FOR.map((b) => {
              const match = INSURERS.find((x) => x.name === b.pick)
              return (
                <div key={b.label} className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-5">
                  <div className="text-2xl mb-2" aria-hidden="true">{b.icon}</div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate mb-1">{b.label}</p>
                  {match ? (
                    <a href={`#ficha-${match.slug}`} className="text-lg font-bold text-ink mb-1 inline-block hover:text-electric hover:underline">{b.pick} ↓</a>
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
          <h2 className="text-2xl font-bold text-ink mb-5">Cómo elegir en 5 pasos</h2>
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
            <h2 className="text-lg font-bold text-ink mb-3">Qué suele cubrir</h2>
            <ul className="space-y-2 text-sm text-slate">
              {COVERED.map((c) => (<li key={c} className="flex gap-2"><span className="text-ink">✓</span><span>{c}</span></li>))}
            </ul>
          </div>
          <div className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-6">
            <h2 className="text-lg font-bold text-ink mb-3">Qué queda excluido</h2>
            <ul className="space-y-2 text-sm text-slate">
              {EXCLUDED.map((c) => (<li key={c} className="flex gap-2"><span className="text-ink">✗</span><span>{c}</span></li>))}
            </ul>
          </div>
        </section>

        {/* ── How reimbursement works ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Cómo funciona el reembolso</h2>
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
          <h2 className="text-2xl font-bold text-ink mb-3">¿Merece la pena?</h2>
          <p className="text-sm text-slate leading-relaxed mb-5">
            Depende de cómo afrontarías una factura veterinaria inesperada de cuatro cifras. Las
            consultas de rutina son baratas y previsibles, pero un accidente o una enfermedad grave
            no lo son. Estos son costes orientativos en España sin seguro.
          </p>
          <div className="overflow-x-auto rounded-xl border-[1.6px] border-ink">
            <table className="w-full text-sm">
              <thead className="bg-lavender-soft text-slate"><tr><th className="text-left px-4 py-2.5 font-semibold">Tratamiento</th><th className="text-left px-4 py-2.5 font-semibold">Coste orientativo</th></tr></thead>
              <tbody>
                {VET_COSTS.map((v) => (<tr key={v.act} className="border-t border-line"><td className="px-4 py-2.5 text-slate">{v.act}</td><td className="px-4 py-2.5 font-semibold text-ink">{v.cost}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate leading-relaxed mt-4">
            Si una factura de miles de euros desajustaría tu economía, el seguro suele merecer la
            pena, sobre todo si aseguras joven y fijas una prima baja antes de que aparezca cualquier
            enfermedad. Y la responsabilidad civil, además de barata, es ya una obligación legal.
          </p>
        </section>

        {/* ── Reimbursement example ── */}
        <section className="bg-lime/30 border border-ink/20 rounded-[22px] p-6">
          <h2 className="text-xl font-bold text-ink mb-3">Un ejemplo de reembolso</h2>
          <p className="text-sm text-slate leading-relaxed mb-4">
            Imagina que tu perro se rompe el ligamento cruzado y la cirugía cuesta <strong>2.000€</strong>.
            Tu póliza reembolsa el 80%, con una franquicia de 60€ (aún sin alcanzar) y un límite anual de 2.500€:
          </p>
          <ul className="space-y-2 text-sm text-ink mb-4">
            <li className="flex justify-between gap-4 border-b border-ink/20 pb-2"><span>Factura veterinaria</span><span className="font-semibold">2.000€</span></li>
            <li className="flex justify-between gap-4 border-b border-ink/20 pb-2"><span>Menos la franquicia</span><span className="font-semibold">- 60€</span></li>
            <li className="flex justify-between gap-4 border-b border-ink/20 pb-2"><span>Reembolso del 80% de 1.940€</span><span className="font-semibold text-ink">= 1.552€ devueltos</span></li>
            <li className="flex justify-between gap-4"><span>Tu parte a cargo</span><span className="font-semibold">448€</span></li>
          </ul>
          <p className="text-xs text-slate leading-relaxed">
            El orden del cálculo puede variar según la aseguradora (franquicia por acto o anual, porcentaje aplicado antes o después de la franquicia). Comprueba siempre cómo se calcula en las condiciones de tu póliza.
          </p>
        </section>

        {/* ── Common conditions ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Dolencias frecuentes y su coste</h2>
          <div className="overflow-x-auto rounded-[22px] border-[1.6px] border-ink shadow-hard">
            <table className="w-full text-sm min-w-[640px] bg-white">
              <thead className="bg-lavender-soft text-slate"><tr><th className="text-left px-4 py-3 font-semibold">Dolencia</th><th className="text-left px-4 py-3 font-semibold">Coste típico</th><th className="text-left px-4 py-3 font-semibold">Por qué importa</th></tr></thead>
              <tbody>
                {CONDITIONS.map((c) => (<tr key={c.condition} className="border-t border-line"><td className="px-4 py-3 font-semibold text-ink">{c.condition}</td><td className="px-4 py-3 text-ink font-semibold whitespace-nowrap">{c.cost}</td><td className="px-4 py-3 text-slate">{c.note}</td></tr>))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── What affects your premium ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Qué influye en tu prima</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {FACTORS.map((f) => (
              <div key={f.factor} className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-5">
                <h3 className="font-bold text-ink mb-1">{f.factor}</h3>
                <p className="text-sm text-slate leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Expensive breeds ── */}
        <section className="bg-white border-[1.6px] border-ink rounded-[22px] p-6">
          <h2 className="text-2xl font-bold text-ink mb-3">Las razas más caras de asegurar</h2>
          <p className="text-sm text-slate leading-relaxed mb-3">
            Algunas razas pagan primas más altas porque presentan más riesgos de salud. Es el caso de
            las razas braquicéfalas (bulldog francés, carlino, bulldog inglés), propensas a problemas
            respiratorios, y de las razas grandes (gran danés, pastor alemán, labrador), más expuestas
            a la displasia de cadera y a lesiones de ligamentos.
          </p>
          <p className="text-sm text-slate leading-relaxed">
            Para estos perros, prioriza un límite anual alto y un buen reembolso, y asegúralos jóvenes:
            una predisposición detectada más tarde podría considerarse preexistente y quedar excluida.
          </p>
        </section>

        {/* ── When it might not be worth it ── */}
        <section className="bg-white rounded-[22px] border-[1.6px] border-ink shadow-hard p-6">
          <h2 className="text-xl font-bold text-ink mb-3">Cuándo quizá no compense</h2>
          <p className="text-sm text-slate leading-relaxed mb-4">
            El seguro no es automático para todo el mundo. Puede compensar menos si:
          </p>
          <ul className="space-y-2 text-sm text-slate">
            {NOT_WORTH.map((n) => (<li key={n} className="flex gap-2"><span className="text-ink flex-shrink-0">!</span><span>{n}</span></li>))}
          </ul>
          <p className="text-sm text-slate leading-relaxed mt-4">
            Aun así, asegurar a una mascota joven y sana en un plan de accidentes y enfermedad
            asequible es una protección barata frente a la factura que no puedes prever. Y la RC, recuerda, ya es obligatoria.
          </p>
        </section>

        {/* ── By profile ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Qué aseguradora según el perfil</h2>
          <div className="overflow-x-auto rounded-[22px] border-[1.6px] border-ink shadow-hard">
            <table className="w-full text-sm min-w-[640px] bg-white">
              <thead className="bg-lavender-soft text-slate"><tr><th className="text-left px-4 py-3 font-semibold">Perfil</th><th className="text-left px-4 py-3 font-semibold">Qué priorizar</th><th className="text-left px-4 py-3 font-semibold">Buena opción</th></tr></thead>
              <tbody>
                {PROFILE_ROWS.map((r) => (<tr key={r.profile} className="border-t border-line"><td className="px-4 py-3 font-semibold text-ink">{r.profile}</td><td className="px-4 py-3 text-slate">{r.need}</td><td className="px-4 py-3 text-electric font-medium">{r.suggestion}</td></tr>))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Cuánto cuesta al mes</h2>
          <div className="overflow-x-auto rounded-[22px] border-[1.6px] border-ink shadow-hard">
            <table className="w-full text-sm min-w-[640px] bg-white">
              <thead className="bg-lavender-soft text-slate"><tr><th className="text-left px-4 py-3 font-semibold">Tipo de seguro</th><th className="text-left px-4 py-3 font-semibold">Precio orientativo</th><th className="text-left px-4 py-3 font-semibold">Nota</th></tr></thead>
              <tbody>
                {PRICE_ROWS.map((r) => (<tr key={r.profile} className="border-t border-line"><td className="px-4 py-3 font-semibold text-ink">{r.profile}</td><td className="px-4 py-3 text-ink font-semibold whitespace-nowrap">{r.range}</td><td className="px-4 py-3 text-slate">{r.note}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate mt-3">Horquillas orientativas. Tu presupuesto depende de la especie, la raza, la edad, la comunidad y la modalidad elegida.</p>
        </section>

        {/* ── Mistakes ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Errores que evitar</h2>
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
          <h2 className="text-2xl font-bold text-ink mb-5">Glosario</h2>
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
          <h2 className="text-xl font-bold text-ink mb-3">Viajar con tu mascota</h2>
          <p className="text-sm text-slate leading-relaxed">
            Algunas pólizas cubren los gastos veterinarios durante un viaje por la Unión Europea, pero
            no todas, así que revisa la garantía de asistencia en viaje antes de salir. El seguro no
            sustituye a la documentación: el pasaporte europeo para animales y la vacunación antirrábica
            al día siguen siendo obligatorios para cruzar fronteras.
          </p>
        </section>

        {/* ── Verdict ── */}
        <section className="bg-electric text-white rounded-[22px] p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-3">Nuestro veredicto</h2>
          <p className="text-white/85 leading-relaxed">
            Para la mayoría, Barkibu ofrece la mejor mezcla de experiencia digital y carencias cortas,
            mientras que Caser destaca en salud (sin carencias y con red propia) y Mapfre es la opción
            más modular, incluso para exóticos. Para un perro PPP, Santalucía o FIATC; para el precio
            más bajo, Welcome. Sea cual sea tu elección, asegura a tu mascota joven y sana, fija un
            límite anual holgado y contrata al menos la responsabilidad civil, que ya es obligatoria.
          </p>
        </section>

        {/* ── Methodology ── */}
        <section className="bg-white border-[1.6px] border-ink rounded-[22px] p-6">
          <h2 className="text-xl font-bold text-ink mb-3">Nuestro método</h2>
          <p className="text-sm text-slate leading-relaxed mb-3">
            Comparamos cada aseguradora con seis criterios constantes: amplitud de la cobertura,
            reembolso, límite anual, carencias, exclusiones y calidad del servicio. Cada dato procede
            de comparativas independientes de 2026 y de las condiciones de cada aseguradora. Lo que no
            podemos verificar no se publica.
          </p>
          <p className="text-sm text-slate leading-relaxed">
            El ranking es editorial. Cualquier hueco patrocinado se señala con la etiqueta
            «Patrocinado» y no altera nuestra valoración de las coberturas. Redactado por
            Jean-Baptiste Manson, fundador y editor de HotelsWithPets.com.
          </p>
          <div className="mt-4 pt-4 border-t border-line">
            <ContactCTA locale="es" variant="advertiser" />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-2xl font-bold text-ink mb-5">Preguntas frecuentes</h2>
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
        <ContactCTA locale="es" variant="generic" />
      </div>
    </main>
  )
}
