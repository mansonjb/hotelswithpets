import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import { insuranceLanguages } from '@/lib/insuranceSlugs'
import BrandLogo from '@/components/BrandLogo'
import ContactCTA from '@/components/ContactCTA'

const SLUG = 'seguro-animais'
const UPDATED = 'novembro de 2026'

export async function generateStaticParams() {
  return [{ locale: 'pt' }]
}

export const metadata: Metadata = {
  title: 'Melhor seguro de animais 2026: cães e gatos em Portugal',
  description:
    'Comparação independente dos melhores seguros para animais de estimação (cão e gato) em Portugal em 2026: reembolsos, capitais, franquias, carências e coberturas de 10 seguradoras, e como escolher.',
  alternates: {
    canonical: `${SITE_URL}/pt/${SLUG}`,
    languages: insuranceLanguages(),
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Melhor seguro de animais 2026: cães e gatos em Portugal',
    description:
      'Comparação independente dos melhores seguros para cão e gato em Portugal em 2026.',
    url: `${SITE_URL}/pt/${SLUG}`,
    siteName: 'HotelsWithPets.com',
  },
}

// ─── Dados ────────────────────────────────────────────────────────────────────
// Todas as seguradoras são empresas reais que operam em Portugal. Os dados são
// qualitativos e deliberadamente prudentes: os prémios variam muito por animal,
// raça, idade e plano, por isso remetemos para uma simulação em vez de indicar um
// valor que não podemos garantir. Carências, reembolsos e capitais variam por
// apólice: confirme sempre nas condições. `sponsored` marca um espaço PAGO e
// mostra a etiqueta "Patrocinado". É false para todos até um parceiro comprar a
// posição. A ordem é editorial.
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
    name: 'Barkibu', slug: 'pt-barkibu', initials: 'Ba', color: '#6366f1',
    kind: 'Seguradora digital de saúde', verdict: 'Digital, sem rede fechada',
    tagline: '100% digital, sem rede fechada: escolhe a clínica e pede reembolso na app',
    species: 'Cães e gatos', reimbursement: '80% das despesas veterinárias',
    waiting: 'Curta no acidente, mais longa na doença (confirme nas condições)',
    excess: 'Franquia conforme o plano', limit: 'Opção sem limite anual disponível',
    covered: ['Acidentes e doenças', 'Medicina preventiva', 'Sem rede fechada'],
    summary: 'A Barkibu é uma seguradora digital especializada na saúde de cães e gatos. Cobre acidentes, doenças e medicina preventiva, aceita novas adesões de cães dos 3 meses até aos 11 anos e funciona sem rede fechada: o tutor escolhe a clínica e pede o reembolso pela app. Reembolsa 80% das despesas veterinárias, com uma experiência totalmente online.',
    pros: ['Experiência e gestão 100% digitais', 'Sem rede fechada: escolhe a clínica que quiser', 'Aceita adesões de cães dos 3 meses aos 11 anos'],
    cons: ['Reembolso até 80% (não 100%)', 'Confirme as carências por doença'],
    claimMethod: 'Carrega a fatura do veterinário na app e recebe 80% do reembolso após a carência, sem rede fechada.',
    extras: ['App', 'Sem rede fechada', 'Medicina preventiva'],
    idealFor: 'Quem quer liberdade de clínica e uma experiência digital.',
    url: 'https://barkibu.com', sponsored: false,
  },
  {
    name: 'Mapfre', slug: 'pt-mapfre', initials: 'Ma', color: '#d50032',
    kind: 'Grande seguradora', verdict: 'Escolha Acertada da DECO',
    tagline: 'Plano Cuidado Extra: Escolha Acertada da DECO PROteste 2026',
    species: 'Cães e gatos', reimbursement: 'Conforme o plano',
    waiting: 'Conforme a cobertura (confirme nas condições)',
    excess: 'Franquia de 50€ em danos materiais (Cuidado Extra)', limit: 'RC 50.000€; cirurgia até 1.000€ (Cuidado Extra)',
    covered: ['Acidentes e doenças', 'RC 50.000€', 'Gama de essencial a cuidado total'],
    summary: 'A Mapfre foi distinguida como "Escolha Acertada" pela DECO PROteste em 2026 com o plano Cuidado Extra, que inclui responsabilidade civil de 50.000€, franquia de 50€ em danos materiais e cobertura de cirurgia até 1.000€. A gama vai de planos essenciais a planos de cuidado total. Exige subscrição antes dos 3 anos do animal para manter as cirurgias cobertas ao longo da vida.',
    pros: ['"Escolha Acertada" da DECO PROteste 2026 (Cuidado Extra)', 'Gama de essencial a cuidado total', 'Responsabilidade civil de 50.000€ incluída'],
    cons: ['Subscrição antes dos 3 anos para manter cirurgias cobertas', 'Cirurgia limitada a 1.000€ no plano Cuidado Extra'],
    claimMethod: 'Apresentas a fatura e recebes o reembolso conforme o plano, dentro dos limites e com a franquia aplicável.',
    extras: ['RC 50.000€', 'Vários planos', 'Rede de mediadores'],
    idealFor: 'Quem quer um plano validado por um teste independente.',
    url: 'https://www.mapfre.pt', sponsored: false,
  },
  {
    name: 'Fidelidade', slug: 'pt-fidelidade', initials: 'Fi', color: '#e30613',
    kind: 'Maior seguradora de Portugal', verdict: 'Três planos MyPets',
    tagline: 'MyPets em três planos (PET 1, 2 e 3), da maior seguradora nacional',
    species: 'Cães e gatos', reimbursement: 'Conforme o plano',
    waiting: 'Conforme a cobertura (confirme nas condições)',
    excess: 'Limites e franquias diferenciados por plano', limit: 'Limites por plano (PET 1, 2 e 3)',
    covered: ['Acidentes e doenças', 'Três planos PET', 'RC para cães perigosos'],
    summary: 'A Fidelidade, a maior seguradora de Portugal, tem o MyPets com três planos (PET 1, PET 2 e PET 3), com consultas, vacinas e cirurgia com limites e franquias diferenciados por plano, além de cobertura de responsabilidade civil para cães perigosos. É uma opção sólida de um grande grupo, embora o reembolso seja feito por envio de documentos e não haja app totalmente digital.',
    pros: ['Da maior seguradora de Portugal', 'Três planos para diferentes necessidades', 'Cobertura de RC para cães perigosos'],
    cons: ['Reembolso por envio de documentos (sem app totalmente digital)', 'Compara limites e franquias entre os planos'],
    claimMethod: 'Apresentas os documentos da despesa e recebes o reembolso conforme o plano PET contratado.',
    extras: ['Três planos PET', 'RC cães perigosos', 'Grande grupo'],
    idealFor: 'Quem prefere a maior seguradora nacional e planos escalonados.',
    url: 'https://mypets.fidelidade.pt', sponsored: false,
  },
  {
    name: 'Generali Tranquilidade', slug: 'pt-tranquilidade', initials: 'GT', color: '#c21807',
    kind: 'Grande seguradora', verdict: 'Base, Mais e Top',
    tagline: 'Seguro Pets em três níveis, com rede de parceiros',
    species: 'Cães e gatos', reimbursement: 'Conforme o nível',
    waiting: 'Conforme a cobertura (confirme nas condições)',
    excess: 'Conforme o nível', limit: 'Furto ou roubo limitado a 500€; varia por nível',
    covered: ['Acidentes e doenças', 'Três níveis (Base/Mais/Top)', 'Rede de parceiros'],
    summary: 'A Generali Tranquilidade oferece o seguro Pets em três níveis de proteção (Base, Mais e Top), com uma rede de parceiros. Por exemplo, o furto ou roubo do animal está limitado a 500€ e o check-up anual aparece a partir do nível Mais. Uma opção de um grande grupo, com um comparador próprio para escolher o nível adequado.',
    pros: ['Três níveis de proteção para cada orçamento', 'Rede de parceiros', 'Comparador próprio para escolher o nível'],
    cons: ['Algumas coberturas (furto/roubo) limitadas a 500€', 'Check-up anual só a partir do nível Mais'],
    claimMethod: 'Apresentas a fatura e recebes o reembolso conforme o nível contratado, com apoio da rede de parceiros.',
    extras: ['Três níveis', 'Rede de parceiros', 'Check-up anual (Mais/Top)'],
    idealFor: 'Quem quer escolher o nível de proteção de um grande grupo.',
    url: 'https://www.generalitranquilidade.pt/particulares/seguros/animais-domesticos/caes-e-gatos', sponsored: false,
  },
  {
    name: 'Ageas', slug: 'pt-ageas', initials: 'Ag', color: '#009b74',
    kind: 'Grande grupo segurador', verdict: 'Produto Pétis',
    tagline: 'Pétis: o seguro de animais do grupo Ageas',
    species: 'Cães e gatos', reimbursement: 'Conforme o plano',
    waiting: 'Conforme a cobertura (confirme nas condições)',
    excess: 'Conforme o plano', limit: 'Conforme o plano',
    covered: ['Acidentes e doenças', 'Produto Pétis', 'Grande grupo segurador'],
    summary: 'A Ageas, um dos grandes grupos seguradores a operar em Portugal, comercializa o seguro de animais domésticos Pétis para cão e gato. Com o peso e a solidez de um grande grupo, é uma opção a considerar, sobretudo em períodos de campanha com descontos de subscrição. Confirma coberturas e limites antes de contratar.',
    pros: ['Produto dedicado (Pétis) de um grande grupo', 'Solidez e abrangência do grupo Ageas', 'Campanhas de desconto em subscrição'],
    cons: ['Confirma coberturas e limites nas condições', 'Experiência menos digital do que as insurtech'],
    claimMethod: 'Apresentas a despesa e recebes o reembolso conforme o plano Pétis contratado.',
    extras: ['Produto Pétis', 'Grande grupo', 'Campanhas de desconto'],
    idealFor: 'Quem procura um produto dedicado de um grande grupo.',
    url: 'https://www.ageas.pt/particulares/produtos/animais-domesticos/petis/', sponsored: false,
  },
  {
    name: 'CTT', slug: 'pt-ctt', initials: 'CT', color: '#d52b1e',
    kind: 'Marca de confiança, três planos', verdict: 'Planos modulares',
    tagline: 'Três planos modulares (Base, Mais e Top) de uma marca de confiança',
    species: 'Cães e gatos', reimbursement: 'Conforme o plano',
    waiting: 'Conforme a cobertura (confirme nas condições)',
    excess: 'Conforme o plano', limit: 'Conforme o plano (Base/Mais/Top)',
    covered: ['Acidentes e doenças', 'Três planos modulares', 'Marca de confiança'],
    summary: 'Os CTT disponibilizam um seguro para animais com três planos modulares (Base, Mais e Top), permitindo ajustar a cobertura e o orçamento. É uma porta de entrada acessível e com uma marca de confiança para quem quer uma proteção simples de contratar. Compara os limites de cada plano antes de decidir.',
    pros: ['Três planos modulares para ajustar ao orçamento', 'Marca de confiança e ampla rede de balcões', 'Contratação simples'],
    cons: ['Confirma os limites de cada plano', 'Menos especializado do que uma insurtech pet'],
    claimMethod: 'Apresentas a fatura e recebes o reembolso conforme o plano modular contratado.',
    extras: ['Três planos', 'Rede de balcões', 'Marca de confiança'],
    idealFor: 'Quem quer uma proteção simples de uma marca de confiança.',
    url: 'https://www.ctt.pt', sponsored: false,
  },
  {
    name: 'Ocidental', slug: 'pt-ocidental', initials: 'Oc', color: '#004a99',
    kind: 'Marca do grupo Ageas (banca)', verdict: 'Canal bancário',
    tagline: 'Seguro de animais do grupo Ageas, pelo canal bancário',
    species: 'Cães e gatos', reimbursement: 'Conforme o plano',
    waiting: 'Conforme a cobertura (confirme nas condições)',
    excess: 'Conforme o plano', limit: 'Saúde até aos 7 anos de idade do animal',
    covered: ['Acidentes e doenças', 'Canal bancário', 'Grande grupo (Ageas)'],
    summary: 'A Ocidental, marca do grupo Ageas distribuída sobretudo pelo canal bancário, oferece um seguro de animais para cão e gato. Prático para quem centraliza os seguros junto do banco. Tem em conta que só dá acesso a coberturas de saúde até aos 7 anos de idade do animal, por isso convém aderir cedo.',
    pros: ['Prático pelo canal bancário', 'Solidez do grupo Ageas', 'Gestão junto do banco'],
    cons: ['Coberturas de saúde só até aos 7 anos do animal', 'Confirma limites e carências nas condições'],
    claimMethod: 'Apresentas a despesa pelo canal bancário ou área de cliente e recebes o reembolso conforme o plano.',
    extras: ['Canal bancário', 'Grupo Ageas', 'Gestão centralizada'],
    idealFor: 'Quem centraliza os seguros junto do banco.',
    url: 'https://www.ocidental.pt', sponsored: false,
  },
  {
    name: 'Seguros Continente', slug: 'pt-continente', initials: 'SC', color: '#e3000f',
    kind: 'Marca de retalho', verdict: 'Acessível, marca conhecida',
    tagline: 'O seguro de animais da marca Continente',
    species: 'Cães e gatos', reimbursement: 'Conforme o plano',
    waiting: 'Conforme a cobertura (confirme nas condições)',
    excess: 'Conforme o plano', limit: 'Saúde até aos 7 anos de idade do animal',
    covered: ['Acidentes e doenças', 'Marca conhecida', 'Gestão simples'],
    summary: 'Os Seguros Continente disponibilizam uma proteção para cão e gato com uma marca de retalho conhecida dos portugueses. Exige subscrição antes dos 3 anos do animal para manter as cirurgias cobertas ao longo da vida e só dá acesso a coberturas de saúde até aos 7 anos. Uma porta de entrada acessível, desde que se adira cedo.',
    pros: ['Marca de retalho conhecida e acessível', 'Contratação e gestão simples', 'Porta de entrada para um primeiro seguro'],
    cons: ['Subscrição antes dos 3 anos para manter cirurgias cobertas', 'Coberturas de saúde só até aos 7 anos'],
    claimMethod: 'Apresentas a fatura na área de cliente e recebes o reembolso conforme o plano.',
    extras: ['Marca conhecida', 'Gestão simples', 'Vantagens Continente'],
    idealFor: 'Um primeiro seguro acessível de uma marca conhecida.',
    url: 'https://www.seguroscontinente.pt', sponsored: false,
  },
  {
    name: 'NSeguros', slug: 'pt-nseguros', initials: 'NS', color: '#1565c0',
    kind: 'Seguradora direta', verdict: 'Direta e simples',
    tagline: 'Seguro de animais de uma seguradora direta',
    species: 'Cães e gatos', reimbursement: 'Conforme o plano',
    waiting: 'Conforme a cobertura (confirme nas condições)',
    excess: 'Conforme o plano', limit: 'Conforme o plano',
    covered: ['Acidentes e doenças', 'Seguradora direta', 'Contratação online'],
    summary: 'A NSeguros é uma seguradora direta que disponibiliza um seguro para animais de estimação, contratável sem intermediários. Tal como a Mapfre e os Seguros Continente, pede subscrição antes dos 3 anos do animal para manter as cirurgias cobertas ao longo da vida. Uma opção simples e direta para quem adere cedo.',
    pros: ['Seguradora direta, sem intermediários', 'Contratação e gestão online', 'Opção simples para aderir cedo'],
    cons: ['Subscrição antes dos 3 anos para manter cirurgias cobertas', 'Menor notoriedade do que os grandes grupos'],
    claimMethod: 'Contratas e geres online; o reembolso segue o plano contratado.',
    extras: ['Seguradora direta', 'Contratação online', 'Gestão simples'],
    idealFor: 'Quem quer uma seguradora direta e adere com o animal jovem.',
    url: 'https://www.nseguros.pt', sponsored: false,
  },
  {
    name: 'Allianz', slug: 'pt-allianz', initials: 'Al', color: '#003781',
    kind: 'Grande seguradora internacional', verdict: 'Sobretudo RC',
    tagline: 'Seguro de animais de uma grande seguradora, com foco na RC',
    species: 'Cães e gatos', reimbursement: 'Conforme o plano',
    waiting: 'Conforme a cobertura (confirme nas condições)',
    excess: 'Conforme o plano', limit: 'Conforme o plano',
    covered: ['Responsabilidade civil', 'Grande seguradora', 'Rede de mediadores'],
    summary: 'A Allianz, uma das maiores seguradoras internacionais, oferece em Portugal um seguro de animais sobretudo focado na responsabilidade civil para cães, isto é, nos danos que o animal possa causar a terceiros. É a escolha de quem valoriza a solidez de uma grande seguradora e pretende, antes de mais, garantir a RC.',
    pros: ['Solidez de uma grande seguradora internacional', 'Foco na responsabilidade civil para cães', 'Ampla rede de mediadores'],
    cons: ['Vocacionado sobretudo para a responsabilidade civil', 'Confirma as coberturas de saúde disponíveis'],
    claimMethod: 'Apresentas a participação pelo mediador ou área de cliente; a RC cobre os danos a terceiros.',
    extras: ['Responsabilidade civil', 'Grande seguradora', 'Rede de mediadores'],
    idealFor: 'Quem quer sobretudo garantir a responsabilidade civil do cão.',
    url: 'https://www.allianz.pt', sponsored: false,
  },
]

const BEST_FOR: Array<{ icon: string; label: string; pick: string; why: string }> = [
  { icon: '🏆', label: 'Melhor validado (DECO)', pick: 'Mapfre', why: '"Escolha Acertada" da DECO PROteste 2026 com o Cuidado Extra.' },
  { icon: '📱', label: 'Melhor digital', pick: 'Barkibu', why: '100% online, sem rede fechada e com reembolso pela app.' },
  { icon: '🏢', label: 'Maior seguradora', pick: 'Fidelidade', why: 'Três planos MyPets da maior seguradora de Portugal.' },
  { icon: '🧩', label: 'Planos modulares', pick: 'CTT', why: 'Três planos (Base, Mais e Top) de uma marca de confiança.' },
  { icon: '🛡️', label: 'Responsabilidade civil', pick: 'Allianz', why: 'Foco na RC para os danos que o cão cause a terceiros.' },
  { icon: '💶', label: 'Primeiro seguro acessível', pick: 'Seguros Continente', why: 'Marca conhecida e acessível para um primeiro seguro.' },
]

const CHOOSE_STEPS: Array<{ title: string; text: string }> = [
  { title: 'Adere cedo (idade do animal)', text: 'Várias seguradoras (Mapfre, Seguros Continente, NSeguros) exigem subscrição antes dos 3 anos para manter cirurgias cobertas, e outras (Ocidental, Seguros Continente) só dão saúde até aos 7 anos. Aderir cedo é decisivo.' },
  { title: 'Define o orçamento mensal', text: 'Em Portugal, uma RC custa poucos euros por mês e uma saúde completa anda entre os 15 e os 35€. Definir uma faixa elimina logo metade das ofertas.' },
  { title: 'Olha para o capital e o reembolso', text: 'Vê o limite de reembolso (por exemplo, cirurgia até 1.000€ no Cuidado Extra da Mapfre) e a percentagem reembolsada. Uma só cirurgia pode esgotar um limite baixo.' },
  { title: 'Verifica as carências', text: 'Durante a carência já pagas, mas ainda não és reembolsado. É curta no acidente e mais longa na doença, às vezes meses em certas cirurgias.' },
  { title: 'Lê as exclusões e a RC', text: 'As doenças preexistentes estão sempre excluídas. Confirma a responsabilidade civil, obrigatória para cães perigosos, e os limites de furto/roubo ou de idade.' },
]

const COVERED: string[] = [
  'Consultas, exames e internamento por acidente ou doença',
  'Cirurgia e tratamentos',
  'Medicina preventiva ou check-up conforme o plano',
  'Responsabilidade civil por danos a terceiros',
  'Assistência e, nalguns planos, serviços dedicados',
]
const EXCLUDED: string[] = [
  'Doenças preexistentes ou sintomas anteriores à subscrição',
  'Despesas durante o período de carência',
  'Ninhadas, gestação e parto, salvo garantia específica',
  'Procedimentos estéticos ou de conveniência',
  'Franquia a teu cargo em alguns planos',
]

const CLAIM_STEPS: Array<{ title: string; text: string }> = [
  { title: 'Vais ao veterinário', text: 'Pagas a consulta e guardas a fatura detalhada (e o boletim para uma primeira participação por doença).' },
  { title: 'Apresentas a despesa', text: 'Pela app ou área de cliente, em poucos minutos. As seguradoras digitais aceitam a foto da fatura.' },
  { title: 'És reembolsado', text: 'Recebes a percentagem prevista, menos a franquia, dentro do limite do plano.' },
  { title: 'Ou rede de parceiros', text: 'Com seguradoras com rede (como a Generali Tranquilidade), usas uma clínica parceira e evitas adiantar parte da despesa.' },
]

const PROFILE_ROWS: Array<{ profile: string; need: string; suggestion: string }> = [
  { profile: 'Cachorro ou gatinho', need: 'Aderir cedo para preço baixo e sem exclusões', suggestion: 'Barkibu, Mapfre ou Fidelidade' },
  { profile: 'Animal mais velho', need: 'Confirmar limites de idade (saúde até aos 7 anos)', suggestion: 'Barkibu (adesão até aos 11 anos nos cães)' },
  { profile: 'Cão perigoso', need: 'Responsabilidade civil obrigatória', suggestion: 'Fidelidade (RC cães perigosos) ou Allianz' },
  { profile: 'Raça grande ou de risco', need: 'Limite de reembolso alto', suggestion: 'Barkibu (opção sem limite) ou Mapfre' },
  { profile: 'Orçamento reduzido', need: 'Prémio mínimo, cobertura de base', suggestion: 'Seguros Continente ou CTT' },
  { profile: 'Só responsabilidade civil', need: 'Cobrir os danos a terceiros', suggestion: 'Allianz ou Mapfre' },
]

const MISTAKES: string[] = [
  'Esperar que o animal adoeça: as doenças já declaradas nunca são cobertas.',
  'Escolher só pelo prémio mensal sem ver o limite de reembolso nem a franquia.',
  'Esquecer o período de carência e julgar-se coberto desde o primeiro dia.',
  'Aderir tarde: muitas seguradoras exigem subscrição antes dos 3 anos para a cirurgia.',
  'Não confirmar a responsabilidade civil obrigatória para um cão perigoso.',
]

const GLOSSARY: Array<{ term: string; def: string }> = [
  { term: 'Reembolso', def: 'A percentagem das despesas veterinárias que te é devolvida, consoante o plano.' },
  { term: 'Capital / limite', def: 'O valor máximo reembolsado pela apólice, muitas vezes por tipo de despesa (por exemplo, cirurgia até 1.000€).' },
  { term: 'Franquia', def: 'A parte da despesa que fica a teu cargo em cada sinistro ou por ano (por exemplo, 50€ em danos materiais na Mapfre).' },
  { term: 'Carência', def: 'O período após a subscrição em que já pagas mas ainda não és reembolsado. Curto no acidente, mais longo na doença.' },
  { term: 'Doença preexistente', def: 'Doença já declarada ou com sintomas anteriores à subscrição. Está sempre excluída.' },
  { term: 'Responsabilidade civil (RC)', def: 'Cobertura dos danos que o teu animal cause a terceiros. É obrigatória para cães perigosos.' },
  { term: 'Idade de subscrição', def: 'Muitas seguradoras exigem adesão antes dos 3 anos para manter cirurgias cobertas, e dão saúde só até aos 7 anos.' },
  { term: 'Rede de parceiros', def: 'Conjunto de clínicas associadas à seguradora onde podes evitar adiantar parte da despesa.' },
]

const PRICE_ROWS: Array<{ profile: string; range: string; note: string }> = [
  { profile: 'Só responsabilidade civil', range: 'poucos € / mês', note: 'Cobre os danos a terceiros; obrigatória para cães perigosos.' },
  { profile: 'Saúde de base', range: 'cerca de 10 a 18€ / mês', note: 'Reembolso e limites mais contidos.' },
  { profile: 'Saúde completa', range: 'cerca de 18 a 35€ / mês', note: 'Reembolso mais alto, limites mais amplos, check-up.' },
  { profile: 'Cão perigoso (RC)', range: 'conforme a seguradora', note: 'A RC é obrigatória; confirma o capital exigido.' },
]

const VET_COSTS: Array<{ act: string; cost: string }> = [
  { act: 'Consulta', cost: '25 a 45€' },
  { act: 'Radiografia ou ecografia', cost: '50 a 150€' },
  { act: 'Cirurgia ao ligamento cruzado', cost: '1.200 a 2.500€' },
  { act: 'Tratamento oncológico ou cirurgia major', cost: '1.500 a 4.000€+' },
]

const FAQ: Array<{ q: string; a: string }> = [
  { q: 'É obrigatório o seguro para cães em Portugal?', a: 'Para a generalidade dos cães o seguro de saúde é facultativo. A responsabilidade civil é, no entanto, obrigatória para cães perigosos ou potencialmente perigosos, que têm de ter um seguro de RC. Para todos os outros, a RC não é obrigatória por lei, mas é barata e muito recomendável. Confirma sempre a legislação em vigor.' },
  { q: 'Qual é o melhor seguro de animais em 2026?', a: 'Não há um melhor seguro universal: depende do animal, do orçamento e das prioridades. Validado por teste independente, a Mapfre foi "Escolha Acertada" da DECO PROteste. Para uma experiência digital, a Barkibu. Da maior seguradora, a Fidelidade (MyPets). Para cães perigosos, a Fidelidade ou a Allianz.' },
  { q: 'Quanto custa um seguro para cão ou gato?', a: 'Uma responsabilidade civil custa poucos euros por mês. Um seguro de saúde de base ronda os 10 a 18€ e um completo os 18 a 35€. O preço depende da espécie, da raça, da idade e do nível de cobertura. Um gato costuma custar um pouco menos do que um cão.' },
  { q: 'O que é uma carência?', a: 'É o período, após a subscrição, em que já pagas mas ainda não és reembolsado. Costuma ser curto no acidente e mais longo na doença, às vezes vários meses em certas cirurgias.' },
  { q: 'As doenças preexistentes são cobertas?', a: 'Não. As doenças já declaradas ou com sintomas anteriores à subscrição, ou durante a carência, estão sempre excluídas. Por isso convém segurar o animal jovem e saudável.' },
  { q: 'A partir de que idade devo segurar o meu animal?', a: 'O mais cedo possível. O prémio é mais baixo e o risco de exclusão é menor. Em Portugal, várias seguradoras exigem subscrição antes dos 3 anos para manter as cirurgias cobertas, e algumas só dão saúde até aos 7 anos.' },
  { q: 'O seguro cobre a vacinação ou a esterilização?', a: 'Não a título de doença: são atos de prevenção ou de conveniência. Podem estar cobertos através da medicina preventiva ou de um plano superior, quando a modalidade o inclui.' },
  { q: 'E se viajar para o estrangeiro com o meu animal?', a: 'Algumas apólices cobrem despesas veterinárias durante uma estadia na União Europeia, mas não todas. Verifica a garantia de assistência em viagem. O seguro não substitui a documentação: o passaporte europeu para animais e a vacinação antirrábica em dia continuam obrigatórios.' },
]

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale !== 'pt') notFound()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Melhores seguros de animais 2026',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: INSURERS.length,
    itemListElement: INSURERS.map((ins, i) => ({ '@type': 'ListItem', position: i + 1, name: ins.name, url: ins.url })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Melhor seguro de animais 2026: cães e gatos em Portugal',
    inLanguage: 'pt',
    datePublished: '2026-11-12',
    dateModified: '2026-11-12',
    author: { '@type': 'Person', name: 'Jean-Baptiste Manson', jobTitle: 'Founder & Editor', url: `${SITE_URL}/pt/about` },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets.com', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/pt/${SLUG}`,
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
            <Link href="/pt" className="hover:text-white">Início</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Seguro de animais</span>
          </nav>
          <span className="inline-block text-xs font-semibold tracking-wide uppercase bg-white/15 border border-white/20 rounded-full px-3 py-1 mb-5">
            Comparação independente · atualizado em {UPDATED}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-5 max-w-3xl">
            Melhor seguro de animais 2026
          </h1>
          <p className="text-lg text-sky-50 max-w-2xl mb-8">
            O guia completo do seguro para cães e gatos em Portugal: coberturas,
            reembolsos, capitais, carências, preços e exclusões das 10 principais
            seguradoras, mais o nosso método para escolher sem errar.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-sky-100">
            <span><strong className="text-white text-lg">10</strong> seguradoras comparadas</span>
            <span><strong className="text-white text-lg">6</strong> critérios objetivos</span>
            <span><strong className="text-white text-lg">0</strong> opiniões inventadas, tudo verificado</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        {/* ── Intro ── */}
        <section className="prose-none">
          <p className="text-stone-700 leading-relaxed mb-4">
            Em Portugal, cada vez mais tutores seguram o seu animal, e não por acaso: as despesas
            veterinárias sobem e uma só cirurgia pode custar mais do que anos de prémios. O seguro faz
            exatamente isto: transforma uma despesa imprevisível numa mensalidade previsível e cobre
            os danos que o teu cão possa causar a terceiros.
          </p>
          <p className="text-stone-700 leading-relaxed">
            O mercado junta seguradoras digitais (Barkibu), grandes grupos (Mapfre, Fidelidade, Generali
            Tranquilidade, Ageas, Allianz) e marcas de confiança (CTT, Seguros Continente). Esta é a nossa
            comparação completa para acertar.
          </p>
        </section>

        {/* ── Obrigatório? ── */}
        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-stone-900 mb-3">É obrigatório o seguro para cães?</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-3">
            Para a generalidade dos cães, o seguro de <strong>saúde é facultativo</strong>. A
            <strong> responsabilidade civil (RC)</strong>, que cobre os danos que o animal cause a
            terceiros, é <strong>obrigatória para cães perigosos ou potencialmente perigosos</strong>, que
            têm de ter uma apólice de RC. Para os restantes cães, a RC não é obrigatória por lei.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            A nossa recomendação: se tens um cão perigoso, garante primeiro a RC obrigatória; para os
            outros, uma RC custa poucos euros por mês e vale a pena, e podes juntar um plano de saúde.
            Confirma sempre a legislação em vigor.
          </p>
        </section>

        {/* ── Comparison table ── */}
        <section id="tabela-comparativa" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">A tabela comparativa 2026</h2>
          <p className="text-sm text-stone-600 mb-5">As 10 principais seguradoras de animais em Portugal, ordenadas pela nossa análise editorial de cobertura, preço e experiência. Clica numa seguradora para abrir a ficha.</p>
          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
            <table className="w-full text-sm min-w-[760px] bg-white">
              <thead className="bg-stone-100 text-stone-700">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold w-8">#</th>
                  <th className="text-left px-4 py-3 font-semibold">Seguradora</th>
                  <th className="text-left px-4 py-3 font-semibold">Pontos fortes</th>
                  <th className="text-left px-4 py-3 font-semibold">Reembolso</th>
                  <th className="text-left px-4 py-3 font-semibold">Carência</th>
                </tr>
              </thead>
              <tbody>
                {INSURERS.map((ins, i) => (
                  <tr key={ins.name} className="border-t border-stone-100 align-top hover:bg-stone-50">
                    <td className="px-4 py-4 font-bold text-stone-400">{i + 1}</td>
                    <td className="px-4 py-4">
                      <a href={`#ficha-${ins.slug}`} className="flex items-center gap-2.5 group">
                        <BrandLogo src={`/logos/${ins.slug}.png`} name={ins.name} initials={ins.initials} color={ins.color} size={36} />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-stone-900 group-hover:text-sky-700 group-hover:underline">{ins.name}</span>
                            {ins.sponsored && (<span className="text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.5 rounded-full">Patrocinado</span>)}
                          </div>
                          <span className="text-xs font-medium text-sky-700">{ins.verdict}</span>
                          <span className="block text-[11px] text-stone-400 group-hover:text-sky-600">Ver ficha ↓</span>
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
          <p className="text-xs text-stone-500 mt-3">Dados indicativos, atualizados em {UPDATED}. Carências e reembolsos variam por apólice. O preço exato depende do animal, da raça, da idade e do plano: pede uma simulação e lê as condições antes de subscrever.</p>
        </section>

        {/* ── Detailed ranking cards ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">A classificação detalhada</h2>
          <div className="space-y-4">
            {INSURERS.map((ins, i) => (
              <article key={ins.name} id={`ficha-${ins.slug}`} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6 scroll-mt-6">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center flex-shrink-0 gap-1">
                    <span className="text-xs font-bold text-stone-400">#{i + 1}</span>
                    <BrandLogo src={`/logos/${ins.slug}.png`} name={ins.name} initials={ins.initials} color={ins.color} size={48} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <h3 className="text-lg font-bold text-stone-900">{ins.name}</h3>
                      <span className="text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-full">{ins.verdict}</span>
                      {ins.sponsored && (<span className="text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">Patrocinado</span>)}
                      <a href="#tabela-comparativa" className="ml-auto text-xs text-stone-400 hover:text-sky-700 whitespace-nowrap">↑ tabela</a>
                    </div>
                    <p className="text-sm text-stone-500">{ins.kind}</p>
                    <p className="text-[13px] font-semibold text-stone-700 mt-1">{ins.tagline}</p>
                  </div>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed mt-4">{ins.summary}</p>

                <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm mt-4 border-t border-stone-100 pt-4">
                  <div><dt className="font-semibold text-stone-900">Animais</dt><dd className="text-stone-600">{ins.species}</dd></div>
                  <div><dt className="font-semibold text-stone-900">Reembolso</dt><dd className="text-stone-600">{ins.reimbursement}</dd></div>
                  <div><dt className="font-semibold text-stone-900">Franquia</dt><dd className="text-stone-600">{ins.excess}</dd></div>
                  <div><dt className="font-semibold text-stone-900">Capital / limite</dt><dd className="text-stone-600">{ins.limit}</dd></div>
                  <div className="sm:col-span-2"><dt className="font-semibold text-stone-900">Carência</dt><dd className="text-stone-600">{ins.waiting}</dd></div>
                </dl>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {ins.covered.map((c) => (<span key={c} className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-full">✓ {c}</span>))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-800 mb-2">Pontos fortes</p>
                    <ul className="space-y-1.5 text-sm text-stone-700">
                      {ins.pros.map((p) => (<li key={p} className="flex gap-2"><span className="text-emerald-600 flex-shrink-0">✓</span><span>{p}</span></li>))}
                    </ul>
                  </div>
                  <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-amber-800 mb-2">A ter em conta</p>
                    <ul className="space-y-1.5 text-sm text-stone-700">
                      {ins.cons.map((c) => (<li key={c} className="flex gap-2"><span className="text-amber-600 flex-shrink-0">!</span><span>{c}</span></li>))}
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed mt-4"><span className="font-semibold text-stone-900">Como é reembolsado:</span> {ins.claimMethod}</p>
                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  <span className="text-xs font-semibold text-stone-500 mr-1">Serviços incluídos:</span>
                  {ins.extras.map((e) => (<span key={e} className="text-xs bg-sky-50 text-sky-700 border border-sky-100 px-2 py-0.5 rounded-full">{e}</span>))}
                </div>
                <p className="text-sm text-stone-600 leading-relaxed mt-3"><span className="font-semibold text-stone-800">Ideal para:</span> {ins.idealFor}</p>

                <a href={ins.url} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-1.5 text-sm font-bold text-white px-4 py-2 rounded-lg transition-opacity hover:opacity-90 mt-4" style={{ backgroundColor: ins.color }}>
                  Ver {ins.name} e pedir simulação →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ── Best-for ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Em resumo: o melhor conforme a necessidade</h2>
          <p className="text-sm text-stone-600 mb-5">Um resumo rápido para ires direto ao assunto. Clica numa seguradora para abrir a ficha.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BEST_FOR.map((b) => {
              const match = INSURERS.find((x) => x.name === b.pick)
              return (
                <div key={b.label} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
                  <div className="text-2xl mb-2" aria-hidden="true">{b.icon}</div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1">{b.label}</p>
                  {match ? (
                    <a href={`#ficha-${match.slug}`} className="text-lg font-bold text-stone-900 mb-1 inline-block hover:text-sky-700 hover:underline">{b.pick} ↓</a>
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
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Como escolher em 5 passos</h2>
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
            <h2 className="text-lg font-bold text-stone-900 mb-3">O que costuma cobrir</h2>
            <ul className="space-y-2 text-sm text-stone-700">
              {COVERED.map((c) => (<li key={c} className="flex gap-2"><span className="text-emerald-600">✓</span><span>{c}</span></li>))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-stone-900 mb-3">O que fica excluído</h2>
            <ul className="space-y-2 text-sm text-stone-700">
              {EXCLUDED.map((c) => (<li key={c} className="flex gap-2"><span className="text-rose-500">✗</span><span>{c}</span></li>))}
            </ul>
          </div>
        </section>

        {/* ── How reimbursement works ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Como funciona o reembolso</h2>
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
          <h2 className="text-2xl font-bold text-stone-900 mb-3">Vale a pena?</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-5">
            Depende de como enfrentarias uma fatura veterinária inesperada de milhares de euros. As
            consultas de rotina são baratas e previsíveis, um acidente ou uma doença grave não são. Estes
            são custos indicativos em Portugal sem seguro.
          </p>
          <div className="overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-sm">
              <thead className="bg-stone-100 text-stone-700"><tr><th className="text-left px-4 py-2.5 font-semibold">Tratamento</th><th className="text-left px-4 py-2.5 font-semibold">Custo indicativo</th></tr></thead>
              <tbody>
                {VET_COSTS.map((v) => (<tr key={v.act} className="border-t border-stone-100"><td className="px-4 py-2.5 text-stone-700">{v.act}</td><td className="px-4 py-2.5 font-semibold text-stone-900">{v.cost}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed mt-4">
            Se uma fatura de milhares de euros desequilibrasse o teu orçamento, o seguro costuma valer a
            pena, sobretudo se segurares cedo e fixares um prémio baixo antes de surgir qualquer doença.
          </p>
        </section>

        {/* ── Reimbursement example ── */}
        <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-stone-900 mb-3">Um exemplo de reembolso</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-4">
            Imagina que o teu cão rompe o ligamento cruzado e a cirurgia custa <strong>2.000€</strong>.
            A tua apólice reembolsa 80%, com uma franquia de 50€ (ainda não atingida) e um limite de cirurgia de 1.000€:
          </p>
          <ul className="space-y-2 text-sm text-stone-800 mb-4">
            <li className="flex justify-between gap-4 border-b border-emerald-100 pb-2"><span>Fatura veterinária</span><span className="font-semibold">2.000€</span></li>
            <li className="flex justify-between gap-4 border-b border-emerald-100 pb-2"><span>80% reembolso</span><span className="font-semibold">1.600€ teóricos</span></li>
            <li className="flex justify-between gap-4 border-b border-emerald-100 pb-2"><span>Limitado ao capital de cirurgia (1.000€), menos franquia (50€)</span><span className="font-semibold text-emerald-700">= 950€ reembolsados</span></li>
            <li className="flex justify-between gap-4"><span>A teu cargo</span><span className="font-semibold">1.050€</span></li>
          </ul>
          <p className="text-xs text-stone-500 leading-relaxed">
            O cálculo varia por seguradora (franquia por ato ou anual, percentagem antes ou depois da franquia) e, sobretudo, pelo capital/limite de cada cobertura. Um limite baixo de cirurgia reduz muito o reembolso: verifica sempre os capitais nas condições.
          </p>
        </section>

        {/* ── Common conditions ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Doenças frequentes e o seu custo</h2>
          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
            <table className="w-full text-sm min-w-[640px] bg-white">
              <thead className="bg-stone-100 text-stone-700"><tr><th className="text-left px-4 py-3 font-semibold">Doença</th><th className="text-left px-4 py-3 font-semibold">Custo indicativo</th><th className="text-left px-4 py-3 font-semibold">Porque conta</th></tr></thead>
              <tbody>
                {[
                  { c: 'Rotura do ligamento cruzado (cirurgia)', k: '1.200 a 2.500€', n: 'Uma das cirurgias mais frequentes e caras no cão; carência muitas vezes longa.' },
                  { c: 'Cancro (diagnóstico e tratamento)', k: '1.500 a 4.000€+', n: 'Quimioterapia, cirurgia e exames somam-se ao longo de meses.' },
                  { c: 'Corpo estranho / obstrução (cirurgia)', k: '1.000 a 2.500€', n: 'Objeto engolido; emergência quase sempre imprevisível.' },
                  { c: 'Diabetes (seguimento anual)', k: '500 a 1.200€ / ano', n: 'Insulina, controlos e revisões para a vida.' },
                  { c: 'Alergias crónicas (ao ano)', k: '250 a 800€ / ano', n: 'Muito frequentes; tratamentos recorrentes e dieta específica.' },
                  { c: 'Urgência veterinária (noite ou fim de semana)', k: '100 a 500€', n: 'As clínicas de urgência cobram bastante mais do que uma consulta normal.' },
                ].map((r) => (<tr key={r.c} className="border-t border-stone-100"><td className="px-4 py-3 font-semibold text-stone-900">{r.c}</td><td className="px-4 py-3 text-emerald-700 font-semibold whitespace-nowrap">{r.k}</td><td className="px-4 py-3 text-stone-600">{r.n}</td></tr>))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── What affects your premium ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">O que influencia o prémio</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { f: 'Espécie', t: 'O cão costuma ser mais caro de segurar do que o gato, com sinistros menos frequentes e menos dispendiosos.' },
              { f: 'Raça', t: 'As raças grandes e as de predisposição (braquicéfalas, displasia) pagam prémios mais altos do que os rafeiros.' },
              { f: 'Idade', t: 'O prémio é mais baixo em cachorros e gatinhos e sobe a cada ano; em Portugal, aderir antes dos 3 anos é muitas vezes decisivo.' },
              { f: 'Zona', t: 'As tarifas veterinárias variam por região, por isso o mesmo animal custa mais numa grande cidade.' },
              { f: 'As tuas escolhas', t: 'Um capital alto, um reembolso elevado e uma franquia baixa sobem o prémio. É a alavanca para o teu orçamento.' },
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
          <h2 className="text-2xl font-bold text-stone-900 mb-3">As raças mais caras de segurar</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-3">
            Algumas raças pagam prémios mais altos por terem mais riscos de saúde. É o caso das raças
            braquicéfalas (Bulldog francês, Carlino, Bulldog inglês), propensas a problemas respiratórios,
            e das raças grandes (Dogue alemão, Pastor alemão, Labrador), mais expostas à displasia da anca
            e a lesões de ligamentos.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            Para estes animais, dá prioridade a um capital alto e a um bom reembolso, e segura-os jovens:
            uma predisposição detetada mais tarde pode ser considerada preexistente e ficar excluída.
          </p>
        </section>

        {/* ── When it might not be worth it ── */}
        <section className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-stone-900 mb-3">Quando compensa menos</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-4">
            O seguro não é automático para toda a gente. Compensa menos se:
          </p>
          <ul className="space-y-2 text-sm text-stone-700">
            {[
              'Tens um fundo de emergência e poderias suportar sem problemas uma fatura inesperada de 3.000€ ou mais.',
              'O teu animal é idoso e com várias doenças já declaradas, que ficariam excluídas como preexistentes.',
              'Só queres cobrir pequenas despesas previsíveis, que a franquia muitas vezes absorve.',
            ].map((n) => (<li key={n} className="flex gap-2"><span className="text-amber-600 flex-shrink-0">!</span><span>{n}</span></li>))}
          </ul>
          <p className="text-sm text-stone-600 leading-relaxed mt-4">
            Mesmo assim, segurar um animal jovem e saudável num plano acessível é uma proteção barata
            contra a fatura que não consegues prever.
          </p>
        </section>

        {/* ── By profile ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Que seguradora conforme o perfil</h2>
          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
            <table className="w-full text-sm min-w-[640px] bg-white">
              <thead className="bg-stone-100 text-stone-700"><tr><th className="text-left px-4 py-3 font-semibold">Perfil</th><th className="text-left px-4 py-3 font-semibold">O que priorizar</th><th className="text-left px-4 py-3 font-semibold">Boa opção</th></tr></thead>
              <tbody>
                {PROFILE_ROWS.map((r) => (<tr key={r.profile} className="border-t border-stone-100"><td className="px-4 py-3 font-semibold text-stone-900">{r.profile}</td><td className="px-4 py-3 text-stone-600">{r.need}</td><td className="px-4 py-3 text-sky-700 font-medium">{r.suggestion}</td></tr>))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Quanto custa por mês</h2>
          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
            <table className="w-full text-sm min-w-[640px] bg-white">
              <thead className="bg-stone-100 text-stone-700"><tr><th className="text-left px-4 py-3 font-semibold">Tipo de seguro</th><th className="text-left px-4 py-3 font-semibold">Preço indicativo</th><th className="text-left px-4 py-3 font-semibold">Nota</th></tr></thead>
              <tbody>
                {PRICE_ROWS.map((r) => (<tr key={r.profile} className="border-t border-stone-100"><td className="px-4 py-3 font-semibold text-stone-900">{r.profile}</td><td className="px-4 py-3 text-emerald-700 font-semibold whitespace-nowrap">{r.range}</td><td className="px-4 py-3 text-stone-600">{r.note}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-stone-500 mt-3">Apenas faixas indicativas. A tua simulação depende da espécie, raça, idade, zona e plano escolhido.</p>
        </section>

        {/* ── Mistakes ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Erros a evitar</h2>
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
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Glossário</h2>
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
          <h2 className="text-xl font-bold text-stone-900 mb-3">Viajar com o teu animal</h2>
          <p className="text-sm text-stone-700 leading-relaxed">
            Algumas apólices cobrem despesas veterinárias durante uma estadia na União Europeia, mas não
            todas, por isso verifica a garantia de assistência em viagem antes de partir. O seguro não
            substitui a documentação: o passaporte europeu para animais e a vacinação antirrábica em dia
            continuam obrigatórios para atravessar fronteiras.
          </p>
        </section>

        {/* ── Verdict ── */}
        <section className="bg-sky-900 text-white rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-3">O nosso veredicto</h2>
          <p className="text-sky-50 leading-relaxed">
            Para a maioria, a Mapfre oferece a garantia de um teste independente (Escolha Acertada da DECO),
            enquanto a Barkibu é a opção digital com liberdade de clínica e a Fidelidade a escolha da maior
            seguradora nacional. Para um cão perigoso, a Fidelidade ou a Allianz; para um primeiro seguro
            acessível, os Seguros Continente ou os CTT. Seja qual for a escolha, segura o animal jovem e
            saudável, privilegia um capital alto e lê primeiro as carências e exclusões.
          </p>
        </section>

        {/* ── Methodology ── */}
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-stone-900 mb-3">O nosso método</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-3">
            Comparamos cada seguradora com seis critérios constantes: amplitude da cobertura, reembolso,
            capital, carências, exclusões e qualidade do serviço. Cada dado provém de comparações
            independentes de 2026 (incluindo a DECO PROteste) e das condições das seguradoras. O que não
            podemos verificar não é publicado.
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">
            A classificação é editorial. Qualquer espaço patrocinado é assinalado com a etiqueta
            &quot;Patrocinado&quot; e não altera a nossa avaliação das coberturas. Redigido por
            Jean-Baptiste Manson, fundador e editor da HotelsWithPets.com.
          </p>
          <div className="mt-4 pt-4 border-t border-stone-100">
            <ContactCTA locale="pt" variant="advertiser" />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Perguntas frequentes</h2>
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
        <ContactCTA locale="pt" variant="generic" />
      </div>
    </main>
  )
}
