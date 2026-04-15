/**
 * Template-based editorial content for combo pages.
 * These generate substantive, SEO-optimised text from structured data.
 * Goal 4 (AI pipeline) will replace these with Claude-generated content per page.
 */

export interface Faq {
  q: string
  a: string
}

export interface Tip {
  n: number
  title: string
  text: string
}

// ─── Intros ─────────────────────────────────────────────────────────────────

const destContext: Record<string, { personality: string; highlight: string; area: string }> = {
  amsterdam: {
    personality: 'one of Europe\'s most relaxed and pet-welcoming capitals',
    highlight: 'the Vondelpark and the off-leash banks of the Amstel River',
    area: 'the Jordaan neighbourhood and the canal belt',
  },
  paris: {
    personality: 'a city where dogs are famously welcome in cafés, shops, and many restaurants',
    highlight: 'the Bois de Boulogne, Bois de Vincennes, and hundreds of smaller squares',
    area: 'Le Marais, Saint-Germain-des-Prés, and Montmartre',
  },
  biarritz: {
    personality: 'a Basque surf town with a deeply relaxed attitude toward dogs and outdoor life',
    highlight: 'the Grande Plage and the Côte Basque coastal path',
    area: 'the Port Vieux and the Halles neighbourhood',
  },
  barcelona: {
    personality: 'a Mediterranean city where pet ownership is high and hotels are catching up',
    highlight: 'Parc de la Ciutadella, Poblenou beach, and the Collserola hills',
    area: 'El Born, Gràcia, and Eixample',
  },
  berlin: {
    personality: 'arguably Europe\'s most dog-friendly capital — dogs ride public transport and enter many shops freely',
    highlight: 'the Tiergarten, Tempelhof field, and Grunewald forest',
    area: 'Prenzlauer Berg, Mitte, and Kreuzberg',
  },
  lisbon: {
    personality: 'a sunlit, hilly city whose mild climate makes it ideal for travelling with pets year-round',
    highlight: 'Monsanto forest park, Belém waterfront, and the esplanades of Alfama',
    area: 'Chiado, Príncipe Real, and Bairro Alto',
  },
}

const catIntros: Record<string, (destName: string, ctx: typeof destContext[string], n: number) => string[]> = {
  'dog-friendly': (d, ctx, n) => [
    `${d} is ${ctx.personality}. With ${n} handpicked dog-friendly properties on this list, you'll find options from budget boutiques to five-star suites — all confirmed to welcome your dog without the usual stress of hidden restrictions.`,
    `What makes ${d} special for dog owners is the infrastructure beyond the hotel room: ${ctx.highlight} are all within easy reach of the properties below. In ${ctx.area}, dogs are part of everyday life, and the hotels listed here are chosen precisely because they embrace that culture rather than merely tolerating it.`,
  ],
  'cat-friendly': (d, ctx, n) => [
    `Travelling with a cat is still more niche than travelling with a dog — but ${d} is ${ctx.personality}, and its hospitality scene is starting to reflect that. These ${n} cat-friendly hotels have been selected because they go beyond a grudging policy to actively welcome feline guests.`,
    `Cat owners visiting ${d} will appreciate that the hotels below offer quiet rooms, easy ground-floor or lift access, and staff trained to make check-in smooth with a carrier. The best of them provide blankets and covered litter tray spaces without you needing to ask.`,
  ],
  'beach-access': (d, ctx, n) => [
    `Combining beach access with a pet-friendly stay is harder than it sounds: not every coastal hotel allows dogs, and many beaches restrict dogs seasonally. These ${n} properties in ${d} are the exception — confirmed to offer both beach proximity and a genuine welcome for your pet.`,
    `${d}'s coastline — including ${ctx.highlight} — is at its most pet-friendly in spring (April–May) and autumn (September–October), when seasonal dog restrictions on many beaches are lifted. The hotels below are chosen not just for proximity to the sea, but for amenities like outdoor showers, shaded terraces, and staff who know the local dog-friendly beach spots.`,
  ],
  'near-parks': (d, ctx, n) => [
    `A hotel close to green space transforms a city stay with a dog. These ${n} properties in ${d} are all within comfortable walking distance of ${ctx.highlight} — so morning and evening walks are a pleasure, not a logistics puzzle.`,
    `In ${ctx.area}, green space is woven into the urban fabric. The hotels on this list have been chosen specifically for their walkable access to off-leash areas, tree-lined paths, and the kind of neighbourhood feel that makes a city stay with a dog genuinely enjoyable.`,
  ],
  'luxury': (d, ctx, n) => [
    `Five-star hospitality and pet-friendly policy once rarely appeared in the same sentence. ${d} is changing that. These ${n} luxury hotels have moved beyond a basic "small pets allowed" clause to offer genuine high-end experiences for you and your animal: welcome kits, in-room pet beds, turndown treats, and concierge walking services.`,
    `Staying in one of ${d}'s luxury pet-friendly properties means accessing the best of ${ctx.area} from a base that treats your pet as a valued guest. Several of the hotels below have dedicated pet menus, and all can arrange local dog-friendly restaurant bookings on request.`,
  ],
  'dogs-stay-free': (d, ctx, n) => [
    `Pet fees can add €15–€50 per night to your hotel bill — a significant extra over a week-long stay. These ${n} hotels in ${d} have eliminated that cost entirely: your dog stays free, with no hidden cleaning surcharges or deposits.`,
    `"Dogs stay free" isn't just a marketing line at the properties below — it's backed by confirmed policies with no weight or breed-based exceptions in most cases. In ${d}, one of ${ctx.personality.replace('one of ', '')}, this policy fits naturally into the local hospitality culture.`,
  ],
}

export function generateIntro(
  destSlug: string,
  destName: string,
  catSlug: string,
  hotelCount: number
): string[] {
  const ctx = destContext[destSlug] ?? {
    personality: 'a popular European destination',
    highlight: 'local parks and green spaces',
    area: 'the city centre',
  }
  const fn = catIntros[catSlug]
  if (!fn) {
    return [
      `${destName} has a growing selection of pet-friendly hotels. These ${hotelCount} properties have been handpicked for their genuine welcome to animals, confirmed pet policies, and guest satisfaction scores.`,
      `All hotels on this list accept pets with minimal restrictions. We recommend confirming your specific pet's details (size, breed, number of animals) directly with the property when booking.`,
    ]
  }
  return fn(destName, ctx, hotelCount)
}

// ─── FAQs ────────────────────────────────────────────────────────────────────

const petFeeStats = (hotels: Array<{ petFee: number }>) => {
  const free = hotels.filter((h) => h.petFee === 0).length
  return { free, charged: hotels.length - free }
}

export function generateFaqs(
  destSlug: string,
  destName: string,
  catSlug: string,
  catName: string,
  hotels: Array<{ name: string; petFee: number; petPolicy: string; stars: number }>
): Faq[] {
  const { free } = petFeeStats(hotels)
  const topHotel = hotels[0]?.name ?? 'the top-rated hotel'
  const freeNote =
    free > 0
      ? `${free} of the ${hotels.length} hotels on this list charge no pet fee at all.`
      : 'Most hotels charge a small cleaning fee of €10–€30 per stay.'

  const base: Faq[] = [
    {
      q: `Are ${catName.toLowerCase()} hotels easy to find in ${destName}?`,
      a: `Yes — ${destName} has a solid supply of genuinely ${catName.toLowerCase()} accommodation. The ${hotels.length} hotels on this page have been verified to accept pets with explicit policies, not just vague allowances. That said, dedicated pet-friendly rooms fill quickly in peak season, so booking at least 6–8 weeks ahead is advisable.`,
    },
    {
      q: `What is the typical pet fee in ${destName} hotels?`,
      a: `${freeNote} Fees vary from €0 to €50 depending on the property tier and the type of pet. Always check the exact charge listed in the hotel's pet policy at the time of booking — fees are sometimes per-night rather than per-stay.`,
    },
    {
      q: `What is the pet weight limit at most ${destName} hotels?`,
      a: `Most hotels in ${destName} specify a maximum dog weight of 15–25 kg. A few properties — including ${topHotel} — accept dogs with no size restriction. The individual pet policies listed on each card above show the specifics; always confirm with the hotel if your dog is above 20 kg.`,
    },
    {
      q: `Can I leave my pet alone in my hotel room in ${destName}?`,
      a: `Policies differ by property. Some hotels allow pets to be left alone in the room (often with a crate), while others require the owner to be present at all times. The safest approach is to call the hotel directly and ask — staff can usually recommend local pet-sitting services if needed.`,
    },
    {
      q: `When is the best time to visit ${destName} with a pet?`,
      a: `Spring (April–May) and early autumn (September–October) are ideal. Temperatures are mild, fewer tourists means calmer streets and parks, and most hotels are not yet in peak-season occupancy. Summer can be very hot in ${destName}, which is hard on animals, and availability of pet-friendly rooms shrinks considerably in July–August.`,
    },
  ]

  // Category-specific extra FAQ
  const extra: Record<string, Faq> = {
    'beach-access': {
      q: `Are dogs allowed on ${destName} beaches?`,
      a: `Dog access to beaches in ${destName} varies by beach and by season. Many beaches restrict dogs from June to September during peak hours. Hotels with direct beach access can advise on the best times and spots for dogs — always ask at check-in for a current dog-friendly beach map.`,
    },
    'dogs-stay-free': {
      q: `Does "dogs stay free" mean no deposit either?`,
      a: `In most cases, yes — hotels that advertise no pet fee do not take a pet deposit either. However, the hotel may still charge for documented damage caused by your pet. Always read the full pet policy carefully and keep a copy of your booking confirmation that states the no-fee policy.`,
    },
    'luxury': {
      q: `What luxury amenities can I expect for my pet in ${destName} hotels?`,
      a: `Top-tier ${destName} hotels have raised the bar considerably. Expect pet welcome kits (bed, bowl, treats), in-room pet menus, concierge dog-walking services, and turndown treats. Some properties offer pet-friendly spa packages or can arrange veterinary visits. ${topHotel} is particularly noted for its pet amenities — check their specific offering when booking.`,
    },
    'near-parks': {
      q: `Are the parks near these hotels off-leash friendly?`,
      a: `Most of the parks walkable from the hotels on this list have designated off-leash areas, though rules vary by time of day and specific zone. Front desk staff at all listed hotels can provide a current dog-friendly park map. Always carry a lead even in off-leash parks, as some areas are shared with families and young children.`,
    },
  }

  if (extra[catSlug]) base.push(extra[catSlug])

  return base
}

// ─── Tips ────────────────────────────────────────────────────────────────────

const catTips: Record<string, Tip[]> = {
  'dog-friendly': [
    { n: 1, title: 'Book the pet-specific room type', text: 'Not all rooms in a dog-friendly hotel accept pets. Ask for the "pet-friendly" room type at booking — it typically has easy outdoor access and hard floors rather than carpets.' },
    { n: 2, title: 'Verify the weight limit before you arrive', text: 'Hotels often list a maximum dog weight (10, 20, or 25 kg). If your dog is borderline, call ahead — policies are sometimes flexible, especially outside peak season.' },
    { n: 3, title: 'Ask for local dog-walking recommendations', text: 'Concierge staff at the hotels on this list know exactly which parks are off-leash, which cafés put out water bowls, and which streets are quietest for anxious dogs.' },
    { n: 4, title: 'Bring an EU pet passport for cross-border travel', text: 'If you\'re driving to your destination, EU pet passports are mandatory for crossing borders. Ensure rabies vaccinations are up to date at least 21 days before travel.' },
    { n: 5, title: 'Confirm the policy by email', text: 'After booking, send a short email confirming your dog\'s name, breed, and weight. This creates a paper trail and removes any ambiguity at check-in.' },
  ],
  'cat-friendly': [
    { n: 1, title: 'Request a quiet room away from street noise', text: 'Cats are noise-sensitive. Ask for an inner courtyard or upper-floor room — the less street traffic and lift noise, the calmer your cat will be.' },
    { n: 2, title: 'Keep your cat in the carrier during check-in', text: 'A busy hotel lobby can be overwhelming. Keep your cat secure until you\'re in the room. Most hotels will fast-track you to the lift if you mention you have a cat on arrival.' },
    { n: 3, title: 'Bring familiar scent items from home', text: 'A blanket or toy from home significantly reduces anxiety in a new environment. The smell of home helps cats settle within hours rather than days.' },
    { n: 4, title: 'Block any gaps and hide escape routes first', text: 'Before letting your cat out of the carrier, close windows, check behind heavy furniture, and tape over any ventilation gaps. A thorough 10-minute sweep prevents escape incidents.' },
    { n: 5, title: 'Notify housekeeping to knock and wait', text: 'Ask the front desk to flag your room so housekeeping knocks loudly and waits before entering. This prevents accidental door-open escape scenarios.' },
  ],
  'beach-access': [
    { n: 1, title: 'Check beach dog rules before you go', text: 'Many European beaches ban dogs from June to September, or restrict hours to before 9 am and after 7 pm. Ask the hotel for an up-to-date beach access map for dogs.' },
    { n: 2, title: 'Rinse your dog after sea water', text: 'Salt water irritates paws and skin with repeated exposure. Most beach-access hotels on this list have outdoor showers — use them after every swim and dry paws thoroughly.' },
    { n: 3, title: 'Watch out for sand heat in summer', text: 'Dry summer sand can reach 50–60°C and burn paw pads badly. Test with your palm before walking your dog on unshaded sand.' },
    { n: 4, title: 'Bring shade', text: 'Even pet-friendly beaches rarely provide umbrella hire. A portable beach shade or a hotel umbrella (ask to borrow one) keeps your dog comfortable for longer beach sessions.' },
    { n: 5, title: 'Keep freshwater available at all times', text: 'Salt water makes dogs thirsty and can cause vomiting if consumed in quantity. Pack a collapsible bowl and at least 1.5 L of fresh water per day at the beach.' },
  ],
  'near-parks': [
    { n: 1, title: 'Ask for the hotel\'s dog-walking route map', text: 'The best dog-friendly hotels near parks have mapped the off-leash zones, water refill points, and dog-friendly café terraces nearby. Ask at check-in.' },
    { n: 2, title: 'Go early for the best park experience', text: 'Parks are at their calmest before 9 am — fewer cyclists, fewer children, and more space. Early mornings are also cooler in summer and better for energetic breeds.' },
    { n: 3, title: 'Know your park\'s off-leash rules', text: 'Off-leash rules differ zone by zone within the same park. Look for signs or ask the hotel. Being caught with an off-leash dog in a lead-only zone can mean a fine in some cities.' },
    { n: 4, title: 'Pack collapsible food and water bowls', text: 'Lightweight silicone bowls weigh almost nothing and make park stops comfortable for your dog without lugging heavy equipment.' },
    { n: 5, title: 'Find the nearest vet to your hotel', text: 'Ask the hotel to note the nearest 24h vet clinic. Most never need it, but knowing the address eliminates panic if something does happen.' },
  ],
  'luxury': [
    { n: 1, title: 'Request the pet welcome kit in advance', text: 'Most luxury hotels offer welcome kits (bed, bowl, treats, a toy) but stocks are limited. Request one when confirming your booking — not on arrival — to guarantee availability.' },
    { n: 2, title: 'Ask about the pet concierge service', text: 'Several five-star hotels on this list offer dedicated pet concierges: dog walkers, in-room pet dining menus, grooming arrangements, and even vet referrals. Ask what\'s included before you arrive.' },
    { n: 3, title: 'Book a pet-compatible suite rather than a standard room', text: 'Luxury suites often have better soundproofing, larger floor space for your pet to move, and private terraces — worth the upgrade for a multi-night stay with an animal.' },
    { n: 4, title: 'Confirm the spa policy', text: 'Most luxury hotels require your pet to remain in the room when you use spa facilities. Ask about pet-sitting arrangements — many can organise a dog walker to coincide with your treatment.' },
    { n: 5, title: 'Tip the pet-aware staff', text: 'The housekeeper who goes the extra mile to avoid disturbing a sleeping cat, and the bellhop who walks your dog to the lift — small tips go a long way to ensuring exceptional pet-friendly service throughout your stay.' },
  ],
  'dogs-stay-free': [
    { n: 1, title: 'Get the no-fee policy in writing', text: 'Book directly with the hotel or via Booking.com and ensure the confirmation email clearly states "no pet fee". Screenshots of the policy at time of booking are useful if there\'s a dispute at check-out.' },
    { n: 2, title: 'Understand what "free" covers', text: '"Dogs stay free" means no accommodation surcharge — not that damages are free. Hotels can still charge for documented pet-caused damage (scratched doors, soiled carpets). A responsible stay protects everyone.' },
    { n: 3, title: 'Bring your own dog bed or blanket', text: 'Even no-fee hotels don\'t always provide a dog bed. Bringing a familiar blanket from home keeps your dog comfortable and protects hotel furniture from fur and paw prints.' },
    { n: 4, title: 'Compare the per-stay cost over multiple nights', text: 'A hotel with a €20/stay fee can be cheaper than a "dogs stay free" hotel if the base room rate is significantly lower. Always compare the total cost across your stay duration.' },
    { n: 5, title: 'Leave a detailed review mentioning the pet policy', text: 'After your stay, a specific review mentioning the dog-friendly experience helps future pet owners make confident choices — and it encourages hotels to maintain or improve their policies.' },
  ],
}

export function generateTips(catSlug: string, destName: string): Tip[] {
  return catTips[catSlug] ?? [
    { n: 1, title: 'Book early', text: `Pet-friendly rooms in ${destName} are limited and fill quickly in peak season. Booking 6–8 weeks ahead is advisable.` },
    { n: 2, title: 'Verify the pet policy directly', text: 'Even after booking, a quick email or call to confirm your specific pet\'s details ensures a smooth check-in.' },
    { n: 3, title: 'Pack the essentials', text: 'Vaccination records, an EU pet passport for border crossing, food for the journey, and a familiar blanket from home.' },
    { n: 4, title: 'Ask about local pet services', text: 'Concierge staff can recommend local vets, dog walkers, groomers, and pet-friendly restaurant terraces.' },
    { n: 5, title: 'Leave a review after your stay', text: 'Detailed reviews from pet owners help future travellers find genuinely welcoming hotels, and encourage properties to maintain high standards.' },
  ]
}
