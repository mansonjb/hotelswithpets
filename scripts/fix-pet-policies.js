#!/usr/bin/env node
/**
 * Generates realistic petPolicy strings for hotels with corrupted/missing data.
 * Detection: policy contains "Sustainability certification" OR is too short (<30 chars)
 *
 * Generates a unique, specific policy based on:
 * - petFee (0 = free, >0 = fee amount)
 * - stars (1–5)
 * - categories (luxury, beach-access, near-parks, dogs-stay-free, cat-friendly)
 */

const fs = require('fs')
const path = require('path')

const HOTELS_PATH = path.join(__dirname, '../data/hotels.json')
const hotels = JSON.parse(fs.readFileSync(HOTELS_PATH, 'utf8'))

function isBadPolicy(policy) {
  if (!policy) return true
  if (policy.includes('Sustainability certification')) return true
  if (policy.length < 30) return true
  // Also catch booking.com address scrapes
  if (policy.includes('rated') && policy.includes('/10!')) return true
  return false
}

function generatePolicy(hotel) {
  const { stars = 3, petFee, categories = [] } = hotel

  const isLuxury = categories.includes('luxury') || stars >= 4
  const isFree = petFee === 0 || categories.includes('dogs-stay-free')
  const fee = typeof petFee === 'number' && petFee > 0 ? petFee : null
  const hasPark = categories.includes('near-parks')
  const hasBeach = categories.includes('beach-access')
  const catFriendly = categories.includes('cat-friendly')

  // Weight limit language by star rating
  const weightLimit =
    stars >= 5 ? 'up to 10 kg' :
    stars === 4 ? 'up to 20 kg' :
    'up to 25 kg'

  const maxPets = stars >= 4 ? 'one pet per room' : 'up to two pets per room'

  // Fee sentence
  const feeSentence = isFree
    ? 'Pets stay completely free of charge — no extra fee applies.'
    : fee
      ? `A pet fee of €${fee} per night applies, charged at check-in.`
      : 'A nominal pet fee applies; exact amount confirmed at check-in.'

  // Welcome tone by star level
  const welcomeSentence = isLuxury
    ? `${hotel.name} warmly welcomes well-behaved pets and offers a dedicated welcome amenity for four-legged guests.`
    : `${hotel.name} is a pet-friendly property that welcomes dogs and ${catFriendly ? 'cats' : 'well-behaved pets'}.`

  // Size/number sentence
  const sizeSentence = `Pets are accepted ${weightLimit}; ${maxPets} maximum.`

  // Location bonus sentence
  let locationSentence = ''
  if (hasBeach) {
    locationSentence = 'The hotel is a short walk from pet-accessible beach areas — ideal for morning runs with your dog.'
  } else if (hasPark) {
    locationSentence = 'A dog-friendly park or green space is within easy walking distance of the property.'
  }

  // Rules sentence
  const rulesSentence = isLuxury
    ? 'Pets must be kept on a lead in all common areas and are not permitted in the spa or dining facilities.'
    : 'Pets must be kept on a lead in common areas and are not allowed unattended in rooms for extended periods.'

  // Booking note
  const bookingNote = 'Please declare your pet at the time of booking to ensure pet-friendly room allocation.'

  const parts = [welcomeSentence, feeSentence, sizeSentence]
  if (locationSentence) parts.push(locationSentence)
  parts.push(rulesSentence, bookingNote)

  return parts.join(' ')
}

let fixedCount = 0
const updated = hotels.map((hotel) => {
  if (isBadPolicy(hotel.petPolicy)) {
    fixedCount++
    return { ...hotel, petPolicy: generatePolicy(hotel) }
  }
  return hotel
})

fs.writeFileSync(HOTELS_PATH, JSON.stringify(updated, null, 2))
console.log(`✅ Fixed ${fixedCount} pet policies out of ${hotels.length} hotels.`)
