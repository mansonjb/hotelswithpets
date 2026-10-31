import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/site'
import BrandLogo from '@/components/BrandLogo'
import ContactCTA from '@/components/ContactCTA'

const SLUG = 'pet-insurance'
const UPDATED = 'October 2026'

export async function generateStaticParams() {
  return [{ locale: 'en' }]
}

export const metadata: Metadata = {
  title: 'Best Pet Insurance 2026: Dog & Cat Coverage Compared',
  description:
    'An independent comparison of the best US pet insurance companies in 2026: reimbursement rates, deductibles, waiting periods, what is covered and excluded for 10 leading insurers, plus how to choose.',
  alternates: {
    canonical: `${SITE_URL}/en/${SLUG}`,
    languages: { 'x-default': `${SITE_URL}/en/${SLUG}`, en: `${SITE_URL}/en/${SLUG}` },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Best Pet Insurance 2026: Dog & Cat Coverage Compared',
    description:
      'An independent comparison of the best US pet insurance companies in 2026: reimbursement, deductibles, waiting periods and coverage.',
    url: `${SITE_URL}/en/${SLUG}`,
    siteName: 'HotelsWithPets.com',
  },
}

// ─── Data ───────────────────────────────────────────────────────────────────
// Every insurer below is a real company operating in the United States. Figures
// are qualitative and deliberately conservative: exact premiums change by pet,
// breed, age, state and plan and go stale fast, so we point to a quote instead
// of publishing a number we cannot guarantee. Waiting periods and reimbursement
// ranges are drawn from multiple independent 2026 comparisons and may vary by
// state and plan, so always confirm on the insurer's current policy. `sponsored`
// marks a PAID slot and renders a visible "Sponsored" badge. It is false for
// everyone until a partner actually buys the position. Editorial order favours
// modern digital insurers at the top on a value/UX basis.
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
  strength: string
  watch: string
  idealFor: string
  url: string
  sponsored: boolean
}

const INSURERS: Insurer[] = [
  {
    name: 'Lemonade', slug: 'lemonade', initials: 'Le', color: '#ec4899',
    kind: 'App-first digital insurer', verdict: 'Best value, app claims',
    tagline: 'Low starting premiums and AI-powered claims in the app',
    species: 'Dogs and cats', reimbursement: '70%, 80% or 90%',
    waiting: 'About 2 days accidents, 14 days illness (longer for orthopedic)',
    deductible: '$100 to $750 annual', limit: 'Annual limit you choose',
    covered: ['Accidents and illness', 'Instant app claims', 'Bundles with renters or car'],
    summary: 'Lemonade is a digital, app-first insurer offering some of the lowest starting premiums on the market. Claims are filed in the app and many straightforward ones are approved almost instantly through automation. You can bundle with Lemonade renters or car insurance for a discount. The base plan covers accidents and illnesses, while exam fees and routine care are optional add-ons.',
    pros: ['Among the lowest entry-level premiums', 'Fast, app-based claims (some paid instantly)', 'Bundle discounts with other Lemonade policies'],
    cons: ['Exam fees and some coverages are paid add-ons on the base plan', 'Not available in every state'],
    claimMethod: 'File in the mobile app with a photo of the invoice; many simple claims are approved instantly, then reimbursed at your rate after the deductible.',
    extras: ['Mobile app', 'Optional wellness add-ons', 'Bundle discounts'],
    strength: 'Lowest-cost entry point and the fastest app-based claims experience, with discounts if you bundle policies.',
    watch: 'Exam fees and preventive care cost extra on the base plan, and availability varies by state.',
    idealFor: 'Owners who want the lowest price and a fully digital, instant experience.',
    url: 'https://www.lemonade.com/pet', sponsored: false,
  },
  {
    name: 'Healthy Paws', slug: 'healthypaws', initials: 'HP', color: '#0ea5e9',
    kind: 'Specialist insurer, one simple plan', verdict: 'Unlimited coverage',
    tagline: 'No annual or lifetime payout caps, one straightforward plan',
    species: 'Dogs and cats', reimbursement: '50% to 90%',
    waiting: 'About 15 days accidents and illness, longer for hip dysplasia',
    deductible: '$100 to $1,000 annual', limit: 'No annual or lifetime cap',
    covered: ['Accidents and illness', 'Unlimited annual payouts', 'No per-incident caps'],
    summary: 'Healthy Paws keeps things simple with a single comprehensive plan and, notably, no annual or lifetime payout limits, which matters most for a serious, long-running illness. Claims have a strong reputation for being processed quickly. There is no wellness or routine-care option, and the base plan does not reimburse exam fees.',
    pros: ['No annual or lifetime payout caps', 'One straightforward plan, easy to understand', 'Reputation for fast claim processing'],
    cons: ['No wellness or routine-care add-on', 'Does not reimburse exam fees', 'Longer waiting period for hip dysplasia'],
    claimMethod: 'Submit a photo of the vet invoice through the app or website; you are reimbursed at your rate after the annual deductible, with no payout ceiling.',
    extras: ['Unlimited annual limit', 'Mobile app', 'Fast claims'],
    strength: 'No payout caps at all and a simple one-plan design, backed by a reputation for quick reimbursement.',
    watch: 'No routine-care option and no exam-fee coverage, with a longer wait for hip dysplasia.',
    idealFor: 'Owners who want maximum protection against big, long-term vet bills.',
    url: 'https://www.healthypawspetinsurance.com', sponsored: false,
  },
  {
    name: 'Figo', slug: 'figo', initials: 'Fi', color: '#16a34a',
    kind: 'Digital insurer, high reimbursement', verdict: 'Up to 100% back',
    tagline: 'A rare up-to-100% reimbursement tier and a fully digital toolkit',
    species: 'Dogs and cats', reimbursement: 'Up to 100%',
    waiting: 'About 1 day accidents, 14 days illness, 6 months orthopedic',
    deductible: 'Annual (100% tier pairs with a higher deductible)', limit: 'Annual limit you choose',
    covered: ['Accidents and illness', 'Up to 100% reimbursement', 'Digital Pet Cloud'],
    summary: 'Figo is a digital insurer and one of the very few that offers a 100% reimbursement tier, typically paired with a higher deductible so your share of a big bill can be close to zero. It runs a digital "Pet Cloud" for records, vet chat and claims, and has one of the shortest accident waiting periods on the market.',
    pros: ['Rare up-to-100% reimbursement option', 'Very short 1-day accident waiting period', 'Fully digital tools (Pet Cloud, 24/7 vet chat)'],
    cons: ['The 100% tier usually requires a higher deductible', '6-month waiting period for orthopedic conditions'],
    claimMethod: 'File through the Pet Cloud app; reimbursement follows your chosen rate (up to 100%) after the annual deductible.',
    extras: ['Up to 100% reimbursement', 'Digital Pet Cloud', 'Optional wellness'],
    strength: 'One of the only insurers that can reimburse 100% of covered costs, with short accident waits and strong digital tools.',
    watch: 'Reaching 100% usually means a higher deductible, and orthopedic conditions wait six months.',
    idealFor: 'Owners who want the highest possible reimbursement and a digital experience.',
    url: 'https://www.figopetinsurance.com', sponsored: false,
  },
  {
    name: 'Embrace', slug: 'embrace', initials: 'Em', color: '#2563eb',
    kind: 'Established insurer, wellness-friendly', verdict: 'Shrinking deductible',
    tagline: 'A deductible that drops every claim-free year, plus a wellness budget',
    species: 'Dogs and cats', reimbursement: '70%, 80% or 90%',
    waiting: 'About 2 days accidents, 14 days illness, 6 months cruciate/orthopedic',
    deductible: '$100 to $1,000, drops $50 each claim-free year', limit: 'Annual limit you choose',
    covered: ['Accidents and illness', 'Diminishing deductible', 'Optional Wellness Rewards'],
    summary: 'Embrace stands out for its Healthy Pet Deductible, which shrinks by $50 for every year you do not receive a claim payout, and for Wellness Rewards, an optional flat routine-care budget you can spend on preventive items. It covers accidents and illnesses, including exam fees, with short-to-moderate waiting periods.',
    pros: ['Deductible shrinks for every claim-free year', 'Optional Wellness Rewards routine-care budget', 'Covers exam fees and dental illness'],
    cons: ['6-month waiting period for cruciate/orthopedic conditions', 'Wellness is a separate paid add-on'],
    claimMethod: 'Submit the invoice online or in the app; reimbursement follows your rate after the deductible, which shrinks each claim-free year.',
    extras: ['Diminishing deductible', 'Wellness Rewards', 'Dental coverage'],
    strength: 'A deductible that keeps shrinking the longer your pet stays healthy, plus a flexible wellness budget and exam-fee coverage.',
    watch: 'Cruciate and orthopedic conditions wait six months, and routine care is a separate add-on.',
    idealFor: 'Owners who want rewards for healthy years and a routine-care option.',
    url: 'https://www.embracepetinsurance.com', sponsored: false,
  },
  {
    name: 'Pets Best', slug: 'petsbest', initials: 'PB', color: '#0891b2',
    kind: 'Established insurer, budget-friendly', verdict: 'Fast payout',
    tagline: 'Fast direct-deposit claims and flexible, affordable plans',
    species: 'Dogs and cats', reimbursement: '70%, 80% or 90%',
    waiting: 'About 3 days accidents, 14 days illness, 6 months cruciate',
    deductible: '$50 to $1,000 annual', limit: 'Annual limit you choose',
    covered: ['Accidents and illness', 'Accident-only option', 'Direct vet pay available'],
    summary: 'Pets Best offers flexible, budget-friendly plans, including a cheaper accident-only tier, fast claim reimbursement by direct deposit, and the option for participating vets to be paid directly so you do not front the whole bill. It is a long-standing, widely available choice with a low starting deductible.',
    pros: ['Fast direct-deposit reimbursement', 'Affordable, flexible tiers including accident-only', 'Optional direct payment to participating vets'],
    cons: ['6-month waiting period for cruciate ligament conditions', 'Routine care is a paid add-on'],
    claimMethod: 'Submit online or in the app; reimbursement by direct deposit after the deductible, or direct vet payment at participating clinics.',
    extras: ['Direct deposit', 'Accident-only option', 'Optional wellness'],
    strength: 'Quick direct-deposit payouts, a low entry deductible and flexible tiers down to accident-only.',
    watch: 'Cruciate ligament conditions wait six months, and routine care costs extra.',
    idealFor: 'Budget-focused owners who want fast reimbursement and flexible tiers.',
    url: 'https://www.petsbest.com', sponsored: false,
  },
  {
    name: 'Trupanion', slug: 'trupanion', initials: 'Tr', color: '#0284c7',
    kind: 'Specialist insurer, direct vet pay', verdict: 'Direct vet pay',
    tagline: 'Pays participating vets directly at checkout, 90% with no caps',
    species: 'Dogs and cats', reimbursement: 'Flat 90%',
    waiting: 'About 5 days accidents, 30 days illness',
    deductible: 'Per-condition, lifetime ($0 to $1,000)', limit: 'No payout limit',
    covered: ['Accidents and illness', 'Direct vet pay at checkout', 'No payout limits'],
    summary: 'Trupanion is best known for paying participating veterinarians directly at checkout, so you may only cover your share instead of fronting the entire bill. It uses a one-time per-condition lifetime deductible, a flat 90% reimbursement and no payout limits. Enrollment is before the pet turns 14, and there is no routine-care coverage.',
    pros: ['Direct payment to participating vets at checkout', 'Flat 90% reimbursement with no payout caps', 'Per-condition deductible is paid only once per condition'],
    cons: ['No wellness or routine-care coverage', 'Must enroll before the pet turns 14', 'One of the pricier options'],
    claimMethod: 'At participating clinics the vet is paid directly and you cover only your share; elsewhere you submit the invoice and are reimbursed 90% after the per-condition deductible.',
    extras: ['Direct vet pay', 'Unlimited payouts', 'Optional recovery/support rider'],
    strength: 'The strongest direct-vet-pay model on the market, with a flat 90% reimbursement and no payout ceiling.',
    watch: 'No routine care, enrollment is capped before age 14, and premiums run higher than average.',
    idealFor: 'Owners who want to avoid fronting large vet bills at checkout.',
    url: 'https://www.trupanion.com', sponsored: false,
  },
  {
    name: 'Spot', slug: 'spot', initials: 'Sp', color: '#ea580c',
    kind: 'Customizable plans, no age cap', verdict: 'No age limit',
    tagline: 'Highly customizable plans with no maximum enrollment age',
    species: 'Dogs and cats', reimbursement: '70%, 80% or 90%',
    waiting: 'About 14 days accidents and illness',
    deductible: '$100 to $1,000 annual', limit: '$2,500 to unlimited',
    covered: ['Accidents and illness', 'No upper age limit', 'Optional wellness'],
    summary: 'Spot offers highly customizable plans, letting you set the deductible, reimbursement rate and annual limit anywhere from $2,500 to unlimited, with no maximum age to enroll, which helps owners of older pets who many insurers turn away. Optional preventive-care add-ons cover routine items like exams and vaccines.',
    pros: ['No upper age limit to enroll', 'Highly customizable limits and deductibles', 'Optional preventive-care add-ons'],
    cons: ['14-day waiting period on accidents as well as illness', 'A cheap quote may reflect a low annual limit'],
    claimMethod: 'Submit the invoice online or in the app; reimbursement follows your chosen rate after the deductible, up to your annual limit.',
    extras: ['No age cap', 'Customizable limits', 'Optional wellness'],
    strength: 'No maximum enrollment age and fully adjustable limits, so you can tune the plan to your pet and budget.',
    watch: 'Accidents also carry a 14-day wait, and a low price may hide a low annual limit.',
    idealFor: 'Owners of older pets, or anyone who wants to fine-tune their plan.',
    url: 'https://www.spotpet.com', sponsored: false,
  },
  {
    name: 'ASPCA Pet Health Insurance', slug: 'aspca', initials: 'AS', color: '#c2410c',
    kind: 'Well-known brand, customizable', verdict: 'Trusted brand',
    tagline: 'A familiar name with flexible coverage and curable pre-existing cover',
    species: 'Dogs, cats and horses', reimbursement: '70%, 80% or 90%',
    waiting: 'About 14 days accidents and illness',
    deductible: '$100 to $500 annual', limit: 'Annual limit you choose',
    covered: ['Accidents and illness', 'Curable pre-existing after wait', 'Optional wellness'],
    summary: 'The ASPCA Pet Health Insurance program, administered by Crum & Forster, is one of the most recognized names in the category. Plans are customizable, and curable pre-existing conditions may be covered again after a symptom-free period, which is uncommon in this market. Enrollment starts from 8 weeks of age and optional preventive care is available.',
    pros: ['Highly recognized, trusted brand', 'May cover curable pre-existing conditions after a symptom-free period', 'Customizable plans with optional wellness'],
    cons: ['14-day waiting period on accidents as well as illness', 'Mid-pack pricing versus digital rivals'],
    claimMethod: 'Submit online, in the app, by email or fax; reimbursement follows your chosen rate after the deductible.',
    extras: ['Curable pre-existing coverage', 'Optional wellness', 'Multi-pet discount'],
    strength: 'A trusted household name that, unusually, can cover curable pre-existing conditions after a symptom-free period.',
    watch: 'Accidents also carry a 14-day wait, and pricing is mid-pack rather than cheapest.',
    idealFor: 'Owners who want a familiar brand and a shot at curable pre-existing cover.',
    url: 'https://www.aspcapetinsurance.com', sponsored: false,
  },
  {
    name: 'Nationwide', slug: 'nationwide', initials: 'Na', color: '#1e40af',
    kind: 'Large established insurer', verdict: 'Exotic pets',
    tagline: 'The major insurer that also covers birds, reptiles and exotics',
    species: 'Dogs, cats, birds and exotics', reimbursement: '50% to 80% (plan-dependent)',
    waiting: 'About 14 days accidents and illness',
    deductible: 'Annual, from around $250', limit: 'Annual limit by plan',
    covered: ['Accidents and illness', 'Birds and exotic pets', 'Whole-pet wellness options'],
    summary: 'Nationwide is one of the oldest and largest pet insurers in the US and the main option that also covers birds, reptiles and other exotic pets, not just dogs and cats. It offers whole-pet plans that can bundle wellness into the coverage, backed by a large, long-established company, though some plans reimburse on a benefit schedule rather than a flat percentage.',
    pros: ['Covers birds, reptiles and exotic pets', 'Whole-pet plans can bundle wellness', 'Large, long-established insurer'],
    cons: ['Some plans reimburse on a benefit schedule, not a flat percentage', 'Lower reimbursement ceiling than digital rivals'],
    claimMethod: 'Submit online, in the app or by mail; reimbursement follows the plan terms (percentage or benefit schedule) after the deductible.',
    extras: ['Exotic pet coverage', 'Whole-pet wellness', 'Established insurer'],
    strength: 'Essentially the only major insurer that covers exotic pets, with whole-pet plans from a large, stable company.',
    watch: 'Some plans pay from a benefit schedule and reimbursement tops out lower than digital competitors.',
    idealFor: 'Owners of birds, reptiles or exotics, or anyone wanting a big established name.',
    url: 'https://www.petinsurance.com', sponsored: false,
  },
  {
    name: 'MetLife Pet', slug: 'metlife', initials: 'Me', color: '#0369a1',
    kind: 'Large established insurer', verdict: 'Family plans',
    tagline: 'Flexible deductibles and family plans from a major insurer',
    species: 'Dogs and cats', reimbursement: '70%, 80% or 90% (up to 100% on some plans)',
    waiting: 'Varies by plan and state, often short',
    deductible: 'Flexible annual', limit: 'Annual limit you choose',
    covered: ['Accidents and illness', 'Family / multi-pet plans', 'Optional wellness'],
    summary: 'MetLife Pet offers flexible deductibles and reimbursement levels and can cover multiple pets on a single family plan, which simplifies a multi-pet household. As a large established insurer it may, in some cases, take prior coverage into account when you switch, and it is frequently available as a workplace benefit through employers.',
    pros: ['Family plans that cover multiple pets together', 'Flexible deductible and reimbursement levels', 'Often offered as an employee benefit'],
    cons: ['Terms and waiting periods vary by plan and state', 'Routine care is a paid add-on'],
    claimMethod: 'Submit online or in the app; reimbursement follows your chosen rate after the deductible.',
    extras: ['Family / multi-pet plans', 'Flexible terms', 'Workplace-benefit availability'],
    strength: 'Flexible terms and a single family plan for several pets, from a major insurer often available through employers.',
    watch: 'Exact terms vary by plan and state, and routine care costs extra.',
    idealFor: 'Multi-pet households and anyone offered pet cover as a work benefit.',
    url: 'https://www.metlifepetinsurance.com', sponsored: false,
  },
]

const BEST_FOR: Array<{ icon: string; label: string; pick: string; why: string }> = [
  { icon: '🏆', label: 'Best overall value', pick: 'Lemonade', why: 'Among the lowest premiums with fast, app-based claims.' },
  { icon: '♾️', label: 'Best for unlimited coverage', pick: 'Healthy Paws', why: 'No annual or lifetime payout caps on a single simple plan.' },
  { icon: '💯', label: 'Best for 100% reimbursement', pick: 'Figo', why: 'A rare up-to-100% tier so your share of a big bill is minimal.' },
  { icon: '🏥', label: 'Best for direct vet pay', pick: 'Trupanion', why: 'Pays participating vets directly so you do not front the bill.' },
  { icon: '🦜', label: 'Best for exotic pets', pick: 'Nationwide', why: 'The main insurer that also covers birds, reptiles and exotics.' },
  { icon: '🐕‍🦺', label: 'Best for older pets', pick: 'Spot', why: 'No maximum age to enroll and fully customizable limits.' },
]

const CHOOSE_STEPS: Array<{ title: string; text: string }> = [
  { title: 'Set your monthly budget', text: 'US premiums commonly run from about $10 a month for accident-only up to $70+ for a comprehensive dog plan. Fixing a range first rules out half the options.' },
  { title: 'Pick an annual limit', text: 'This is the most you can be reimbursed per policy year. Options range from a few thousand dollars to unlimited. One major surgery or illness can reach it fast, so aim high for a large or at-risk breed.' },
  { title: 'Choose a deductible and reimbursement rate', text: 'The deductible is what you pay before coverage kicks in (annual, or per-condition at Trupanion). The reimbursement rate (usually 70-90%, sometimes 100%) is the share paid back after it. A high rate with a high deductible can cost more overall than the reverse.' },
  { title: 'Check the waiting periods', text: 'Nothing is covered during these. They are short for accidents (often 1-5 days), about 14 days for illness, and up to 6-12 months for orthopedic or cruciate conditions.' },
  { title: 'Read the exclusions and exam-fee rules', text: 'Pre-existing conditions are always excluded. Also check whether exam/consultation fees are included or cost extra, and whether bilateral conditions are limited.' },
]

const COVERED: string[] = [
  'Accident and illness vet visits',
  'Surgery and hospitalization',
  'Diagnostics (X-rays, ultrasound, bloodwork, MRI)',
  'Prescription medications',
  'Cancer treatment and chronic conditions',
  'Exam fees and routine care on some plans or add-ons',
]
const EXCLUDED: string[] = [
  'Pre-existing conditions (symptoms before enrollment or during a waiting period)',
  'Elective and cosmetic procedures',
  'Breeding, pregnancy and whelping, unless a specific rider',
  'Preventable illness tied to missed core care, on some plans',
  'Costs incurred during the waiting period',
]

const CLAIM_STEPS: Array<{ title: string; text: string }> = [
  { title: 'You visit the vet', text: 'You pay the clinic and get an itemized invoice (and records for a first illness claim).' },
  { title: 'You file the claim', text: 'Upload the invoice in the app or member portal. Digital insurers like Lemonade approve many simple claims almost instantly.' },
  { title: 'You get reimbursed', text: 'You are paid your reimbursement rate (70-100%), minus the deductible, up to your annual limit, usually by direct deposit in a few days.' },
  { title: 'Or direct vet pay', text: 'At participating clinics, insurers like Trupanion (and Pets Best on some plans) pay the vet directly, so you only cover your share at checkout.' },
]

const PROFILE_ROWS: Array<{ profile: string; need: string; suggestion: string }> = [
  { profile: 'Puppy or kitten', need: 'Enroll early for a low rate and zero exclusions', suggestion: 'Lemonade, Figo or Pets Best' },
  { profile: 'Older pet', need: 'No maximum enrollment age, reasonable waits', suggestion: 'Spot (no age cap), ASPCA' },
  { profile: 'Large or at-risk breed', need: 'High or unlimited annual limit, high reimbursement', suggestion: 'Healthy Paws or Trupanion (no caps)' },
  { profile: 'Tight budget', need: 'Low premium, accident-only possible', suggestion: 'Lemonade or Pets Best (accident-only)' },
  { profile: 'Exotic pet (bird, reptile)', need: 'Coverage beyond dogs and cats', suggestion: 'Nationwide' },
  { profile: 'Multiple pets', need: 'One plan, multi-pet discount', suggestion: 'MetLife Pet or ASPCA' },
]

const MISTAKES: string[] = [
  'Waiting until the pet is sick: conditions already showing symptoms are never covered.',
  'Choosing on monthly price alone without checking the annual limit and deductible.',
  'Forgetting the waiting periods and assuming coverage starts on day one.',
  'Not checking whether exam fees are covered, since they add up across visits.',
  'Underestimating the annual limit for a large breed, where one surgery can use it up.',
]

const GLOSSARY: Array<{ term: string; def: string }> = [
  { term: 'Deductible', def: 'What you pay out of pocket before reimbursement begins. Most US insurers use an annual deductible; Trupanion uses a one-time per-condition (lifetime) deductible.' },
  { term: 'Reimbursement rate', def: 'The share of covered vet costs paid back to you, usually 70%, 80% or 90%, and up to 100% at Figo and some plans.' },
  { term: 'Annual limit', def: 'The most the policy pays per year. Options range from a few thousand dollars to unlimited (Healthy Paws, Trupanion). Costs above it are yours.' },
  { term: 'Waiting period', def: 'The time after enrollment before coverage starts. Short for accidents (often 1-5 days), around 14 days for illness, and up to 6-12 months for orthopedic or cruciate conditions.' },
  { term: 'Pre-existing condition', def: 'Any condition with signs or symptoms before enrollment or during a waiting period. Always excluded, though a few insurers cover curable ones after a symptom-free period.' },
  { term: 'Exam fee', def: 'The consultation charge for a vet visit. Covered on some plans (Embrace) and excluded or optional on others (base Lemonade, Healthy Paws).' },
  { term: 'Direct vet pay', def: 'The insurer pays the clinic directly at checkout so you only cover your share, instead of fronting the full bill and waiting for reimbursement. Trupanion is the main example.' },
  { term: 'Wellness / routine care', def: 'Optional add-on covering non-illness items such as vaccines, dental cleanings and annual exams. Separate from accident and illness coverage.' },
  { term: 'Bilateral exclusion', def: 'If a condition in a paired body part (for example a cruciate ligament) was pre-existing on one side, the other side may also be excluded.' },
]

const PRICE_ROWS: Array<{ profile: string; range: string; note: string }> = [
  { profile: 'Accident-only', range: 'about $10 to $20 / mo', note: 'Covers injuries only, not illness. A budget entry point.' },
  { profile: 'Basic accident & illness (cat)', range: 'about $15 to $30 / mo', note: 'Lower limit and reimbursement, cats cost less than dogs.' },
  { profile: 'Comprehensive dog plan', range: 'about $35 to $70+ / mo', note: 'High reimbursement and limit. Rises sharply with age and breed.' },
  { profile: 'Wellness / routine add-on', range: 'about $10 to $25 / mo extra', note: 'Optional budget for vaccines, dental and exams.' },
]

const VET_COSTS: Array<{ act: string; cost: string }> = [
  { act: 'Routine exam', cost: '$50 to $80' },
  { act: 'X-ray or ultrasound', cost: '$150 to $500' },
  { act: 'Cruciate (TPLO) surgery', cost: '$3,000 to $6,000' },
  { act: 'Cancer treatment or major surgery', cost: '$5,000 to $10,000+' },
]

const FAQ: Array<{ q: string; a: string }> = [
  { q: 'What is the best pet insurance in 2026?', a: 'There is no single best plan: it depends on your pet, budget and priorities. For value and speed, Lemonade stands out. For unlimited coverage, Healthy Paws. For the highest reimbursement, Figo (up to 100%). For direct vet payment, Trupanion. For exotic pets, Nationwide. For older pets, Spot, which has no maximum enrollment age.' },
  { q: 'How much does pet insurance cost in the US?', a: 'Comprehensive accident-and-illness plans commonly run about $35 to $70+ a month for dogs and roughly $15 to $30 for cats, while accident-only cover can start near $10. The exact premium depends on species, breed, age, your state and the deductible, reimbursement rate and annual limit you pick.' },
  { q: 'How does pet insurance reimbursement work?', a: 'Most US pet insurance is reimbursement-based: you pay the vet, file a claim with the invoice, and the insurer pays you back your reimbursement rate (usually 70-90%, up to 100% at Figo) after your deductible, up to your annual limit. A few insurers, led by Trupanion, can pay participating vets directly at checkout.' },
  { q: 'Are pre-existing conditions covered?', a: 'No. Any condition with signs or symptoms before enrollment or during a waiting period is excluded across the industry. A few insurers, such as ASPCA Pet Health Insurance, may cover curable pre-existing conditions again after a symptom-free period. Enrolling while your pet is young and healthy avoids most exclusions.' },
  { q: 'What is a waiting period?', a: 'It is the time after you enroll before coverage starts. It is short for accidents (often 1 to 5 days), around 14 days for illness, and up to 6 to 12 months for orthopedic or cruciate conditions. Claims filed during a waiting period are denied.' },
  { q: 'What is the difference between an annual and a per-condition deductible?', a: 'An annual deductible is paid once per policy year across all claims. A per-condition deductible, used by Trupanion, is paid once for each separate condition but never resets for that condition, which can help for a single chronic illness.' },
  { q: 'Does pet insurance cover routine or wellness care?', a: 'Not by default. Core plans cover accidents and illness. Routine care (vaccines, dental cleanings, annual exams) is usually an optional wellness add-on, offered by insurers like Embrace, Spot, ASPCA and Nationwide.' },
  { q: 'At what age should I insure my pet?', a: 'As early as possible. Premiums are lowest and the risk of a pre-existing exclusion is smallest when the pet is young. Some insurers cap the age at enrollment, so check that limit; Spot notably has no maximum enrollment age for older pets.' },
  { q: 'Can I use any veterinarian?', a: 'Yes. US pet insurance generally works with any licensed vet, including specialists and emergency clinics, because you are reimbursed rather than tied to a network. Direct vet pay (Trupanion) depends on the clinic participating.' },
]

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale !== 'en') notFound()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best pet insurance 2026',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: INSURERS.length,
    itemListElement: INSURERS.map((ins, i) => ({ '@type': 'ListItem', position: i + 1, name: ins.name, url: ins.url })),
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Pet Insurance 2026: Dog & Cat Coverage Compared',
    inLanguage: 'en',
    datePublished: '2026-10-31',
    dateModified: '2026-10-31',
    author: { '@type': 'Person', name: 'Jean-Baptiste Manson', jobTitle: 'Founder & Editor', url: `${SITE_URL}/en/about` },
    publisher: { '@type': 'Organization', name: 'HotelsWithPets.com', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/en/${SLUG}`,
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
            <Link href="/en" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Pet insurance</span>
          </nav>
          <span className="inline-block text-xs font-semibold tracking-wide uppercase bg-white/15 border border-white/20 rounded-full px-3 py-1 mb-5">
            Independent comparison · updated {UPDATED}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-5 max-w-3xl">
            Best Pet Insurance 2026
          </h1>
          <p className="text-lg text-sky-50 max-w-2xl mb-8">
            The complete guide to dog and cat health insurance in the United States:
            coverage, reimbursement rates, deductibles, waiting periods, prices and
            exclusions for the 10 leading insurers, plus how to choose without regret.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-sky-100">
            <span><strong className="text-white text-lg">10</strong> insurers compared</span>
            <span><strong className="text-white text-lg">6</strong> objective criteria</span>
            <span><strong className="text-white text-lg">0</strong> invented reviews, all verified</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        {/* ── Intro ── */}
        <section className="prose-none">
          <p className="text-stone-700 leading-relaxed mb-4">
            Only a small share of American pets are insured, far below the rates seen in the
            UK or Sweden. Yet veterinary costs keep climbing, and a single surgery can cost
            more than years of premiums. Pet insurance does exactly one thing well: it turns an
            unpredictable, potentially huge bill into a predictable monthly cost.
          </p>
          <p className="text-stone-700 leading-relaxed">
            The market has split between app-first digital insurers (Lemonade, Figo, Healthy
            Paws) that reimburse fast and sign you up in minutes, and large established names
            (Nationwide, ASPCA, MetLife). Here is our full comparison to find the right fit.
          </p>
        </section>

        {/* ── Comparison table ── */}
        <section id="comparison-table" className="scroll-mt-6">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">The 2026 comparison table</h2>
          <p className="text-sm text-stone-600 mb-5">The 10 leading US pet insurers, ranked by our editorial read of value, coverage and user experience. Click an insurer to open its full profile.</p>
          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
            <table className="w-full text-sm min-w-[760px] bg-white">
              <thead className="bg-stone-100 text-stone-700">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold w-8">#</th>
                  <th className="text-left px-4 py-3 font-semibold">Insurer</th>
                  <th className="text-left px-4 py-3 font-semibold">Strengths</th>
                  <th className="text-left px-4 py-3 font-semibold">Reimbursement</th>
                  <th className="text-left px-4 py-3 font-semibold">Waiting period</th>
                </tr>
              </thead>
              <tbody>
                {INSURERS.map((ins, i) => (
                  <tr key={ins.name} className="border-t border-stone-100 align-top hover:bg-stone-50">
                    <td className="px-4 py-4 font-bold text-stone-400">{i + 1}</td>
                    <td className="px-4 py-4">
                      <a href={`#profile-${ins.slug}`} className="flex items-center gap-2.5 group">
                        <BrandLogo src={`/logos/${ins.slug}.png`} name={ins.name} initials={ins.initials} color={ins.color} size={36} />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-stone-900 group-hover:text-sky-700 group-hover:underline">{ins.name}</span>
                            {ins.sponsored && (<span className="text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.5 rounded-full">Sponsored</span>)}
                          </div>
                          <span className="text-xs font-medium text-sky-700">{ins.verdict}</span>
                          <span className="block text-[11px] text-stone-400 group-hover:text-sky-600">See profile ↓</span>
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
          <p className="text-xs text-stone-500 mt-3">Figures are indicative and current as of {UPDATED}. Waiting periods and reimbursement vary by plan and state. The exact premium depends on your pet, breed, age and plan: get a quote and read the policy before enrolling.</p>
        </section>

        {/* ── Detailed ranking cards ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">The detailed ranking</h2>
          <div className="space-y-4">
            {INSURERS.map((ins, i) => (
              <article key={ins.name} id={`profile-${ins.slug}`} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6 scroll-mt-6">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center flex-shrink-0 gap-1">
                    <span className="text-xs font-bold text-stone-400">#{i + 1}</span>
                    <BrandLogo src={`/logos/${ins.slug}.png`} name={ins.name} initials={ins.initials} color={ins.color} size={48} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <h3 className="text-lg font-bold text-stone-900">{ins.name}</h3>
                      <span className="text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-full">{ins.verdict}</span>
                      {ins.sponsored && (<span className="text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">Sponsored</span>)}
                      <a href="#comparison-table" className="ml-auto text-xs text-stone-400 hover:text-sky-700 whitespace-nowrap">↑ table</a>
                    </div>
                    <p className="text-sm text-stone-500">{ins.kind}</p>
                    <p className="text-[13px] font-semibold text-stone-700 mt-1">{ins.tagline}</p>
                  </div>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed mt-4">{ins.summary}</p>

                <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm mt-4 border-t border-stone-100 pt-4">
                  <div><dt className="font-semibold text-stone-900">Pets covered</dt><dd className="text-stone-600">{ins.species}</dd></div>
                  <div><dt className="font-semibold text-stone-900">Reimbursement</dt><dd className="text-stone-600">{ins.reimbursement}</dd></div>
                  <div><dt className="font-semibold text-stone-900">Deductible</dt><dd className="text-stone-600">{ins.deductible}</dd></div>
                  <div><dt className="font-semibold text-stone-900">Annual limit</dt><dd className="text-stone-600">{ins.limit}</dd></div>
                  <div className="sm:col-span-2"><dt className="font-semibold text-stone-900">Waiting period</dt><dd className="text-stone-600">{ins.waiting}</dd></div>
                </dl>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {ins.covered.map((c) => (<span key={c} className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-full">✓ {c}</span>))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-800 mb-2">Strengths</p>
                    <ul className="space-y-1.5 text-sm text-stone-700">
                      {ins.pros.map((p) => (<li key={p} className="flex gap-2"><span className="text-emerald-600 flex-shrink-0">✓</span><span>{p}</span></li>))}
                    </ul>
                  </div>
                  <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-amber-800 mb-2">Watch-outs</p>
                    <ul className="space-y-1.5 text-sm text-stone-700">
                      {ins.cons.map((c) => (<li key={c} className="flex gap-2"><span className="text-amber-600 flex-shrink-0">!</span><span>{c}</span></li>))}
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed mt-4"><span className="font-semibold text-stone-900">How claims work:</span> {ins.claimMethod}</p>
                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                  <span className="text-xs font-semibold text-stone-500 mr-1">Included services:</span>
                  {ins.extras.map((e) => (<span key={e} className="text-xs bg-sky-50 text-sky-700 border border-sky-100 px-2 py-0.5 rounded-full">{e}</span>))}
                </div>
                <p className="text-sm text-stone-600 leading-relaxed mt-3"><span className="font-semibold text-stone-800">Best for:</span> {ins.idealFor}</p>

                <a href={ins.url} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-flex items-center gap-1.5 text-sm font-bold text-white px-4 py-2 rounded-lg transition-opacity hover:opacity-90 mt-4" style={{ backgroundColor: ins.color }}>
                  See {ins.name} and get a quote →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ── Verdict / best-for ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">In short: the best for your needs</h2>
          <p className="text-sm text-stone-600 mb-5">A quick recap to cut to the chase. Click an insurer to open its full profile.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BEST_FOR.map((b) => {
              const match = INSURERS.find((x) => x.name === b.pick)
              return (
                <div key={b.label} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
                  <div className="text-2xl mb-2" aria-hidden="true">{b.icon}</div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1">{b.label}</p>
                  {match ? (
                    <a href={`#profile-${match.slug}`} className="text-lg font-bold text-stone-900 mb-1 inline-block hover:text-sky-700 hover:underline">{b.pick} ↓</a>
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
          <h2 className="text-2xl font-bold text-stone-900 mb-5">How to choose in 5 steps</h2>
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
            <h2 className="text-lg font-bold text-stone-900 mb-3">What is typically covered</h2>
            <ul className="space-y-2 text-sm text-stone-700">
              {COVERED.map((c) => (<li key={c} className="flex gap-2"><span className="text-emerald-600">✓</span><span>{c}</span></li>))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-stone-900 mb-3">What is excluded</h2>
            <ul className="space-y-2 text-sm text-stone-700">
              {EXCLUDED.map((c) => (<li key={c} className="flex gap-2"><span className="text-rose-500">✗</span><span>{c}</span></li>))}
            </ul>
          </div>
        </section>

        {/* ── How claims work ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">How reimbursement works</h2>
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
          <h2 className="text-2xl font-bold text-stone-900 mb-3">Is pet insurance worth it?</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-5">
            It depends on how you would handle a sudden four- or five-figure vet bill. Routine
            visits are cheap and predictable, but an accident or serious illness is neither.
            Here are typical US out-of-pocket costs without insurance.
          </p>
          <div className="overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-sm">
              <thead className="bg-stone-100 text-stone-700"><tr><th className="text-left px-4 py-2.5 font-semibold">Treatment</th><th className="text-left px-4 py-2.5 font-semibold">Typical cost</th></tr></thead>
              <tbody>
                {VET_COSTS.map((v) => (<tr key={v.act} className="border-t border-stone-100"><td className="px-4 py-2.5 text-stone-700">{v.act}</td><td className="px-4 py-2.5 font-semibold text-stone-900">{v.cost}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed mt-4">
            If one bill in the thousands would strain your budget, insurance is usually worth it,
            especially when you enroll young and lock in a low rate before any condition appears.
          </p>
        </section>

        {/* ── By profile ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Which insurer by pet profile</h2>
          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
            <table className="w-full text-sm min-w-[640px] bg-white">
              <thead className="bg-stone-100 text-stone-700"><tr><th className="text-left px-4 py-3 font-semibold">Profile</th><th className="text-left px-4 py-3 font-semibold">What to prioritize</th><th className="text-left px-4 py-3 font-semibold">Good fit</th></tr></thead>
              <tbody>
                {PROFILE_ROWS.map((r) => (<tr key={r.profile} className="border-t border-stone-100"><td className="px-4 py-3 font-semibold text-stone-900">{r.profile}</td><td className="px-4 py-3 text-stone-600">{r.need}</td><td className="px-4 py-3 text-sky-700 font-medium">{r.suggestion}</td></tr>))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">How much it costs per month</h2>
          <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-sm">
            <table className="w-full text-sm min-w-[640px] bg-white">
              <thead className="bg-stone-100 text-stone-700"><tr><th className="text-left px-4 py-3 font-semibold">Plan type</th><th className="text-left px-4 py-3 font-semibold">Typical price</th><th className="text-left px-4 py-3 font-semibold">Note</th></tr></thead>
              <tbody>
                {PRICE_ROWS.map((r) => (<tr key={r.profile} className="border-t border-stone-100"><td className="px-4 py-3 font-semibold text-stone-900">{r.profile}</td><td className="px-4 py-3 text-emerald-700 font-semibold whitespace-nowrap">{r.range}</td><td className="px-4 py-3 text-stone-600">{r.note}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-stone-500 mt-3">Indicative ranges only. Your quote depends on species, breed, age, state and the deductible, reimbursement rate and annual limit you choose.</p>
        </section>

        {/* ── Mistakes ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Mistakes to avoid</h2>
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
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Glossary</h2>
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
          <h2 className="text-xl font-bold text-stone-900 mb-3">Traveling with your pet</h2>
          <p className="text-sm text-stone-700 leading-relaxed">
            Most US pet insurance reimburses vet costs anywhere in the country, so a road trip or
            a move across states is usually covered the same as at home. Coverage outside the US
            and Canada is limited and varies by insurer, so check the policy before an international
            trip. Insurance does not replace travel paperwork: airlines and destinations set their
            own health-certificate and vaccination rules for pets.
          </p>
        </section>

        {/* ── Verdict ── */}
        <section className="bg-sky-900 text-white rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-3">Our verdict</h2>
          <p className="text-sky-50 leading-relaxed">
            For most owners, Lemonade offers the best blend of price and speed, while Healthy Paws
            is the pick when you want no payout caps at all and Figo when you want up to 100% back.
            Trupanion is unmatched if you would rather your vet be paid directly at checkout, and
            Spot or Nationwide fill the gaps for older or exotic pets. Whichever you choose, enroll
            while your pet is young and healthy, aim for a high annual limit, and always read the
            waiting periods and exclusions first.
          </p>
        </section>

        {/* ── Methodology ── */}
        <section className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-stone-900 mb-3">Our method</h2>
          <p className="text-sm text-stone-700 leading-relaxed mb-3">
            We compare each insurer on six consistent criteria: breadth of coverage, reimbursement
            rate, annual limit, waiting periods, exclusions and service quality. Every figure is
            drawn from independent 2026 comparisons and the insurers&apos; own policy documents.
            Anything we cannot verify is not published.
          </p>
          <p className="text-sm text-stone-700 leading-relaxed">
            The ranking is editorial. Any sponsored placement is clearly labeled &quot;Sponsored&quot;
            and does not change our assessment of coverage. Written by Jean-Baptiste Manson, founder
            and editor of HotelsWithPets.com.
          </p>
          <div className="mt-4 pt-4 border-t border-stone-100">
            <ContactCTA locale="en" variant="advertiser" />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-2xl font-bold text-stone-900 mb-5">Frequently asked questions</h2>
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
        <ContactCTA locale="en" variant="generic" />
      </div>
    </main>
  )
}
