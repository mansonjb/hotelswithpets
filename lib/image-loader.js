// Custom next/image loader: rewrites local /images/... paths to the Supabase
// Storage public CDN (NEXT_PUBLIC_IMAGE_CDN, which already ends with "/images").
// External absolute URLs (Unsplash, Amazon, Booking) pass through untouched.
module.exports = function imageLoader({ src }) {
  if (/^https?:\/\//.test(src)) return src
  const CDN = process.env.NEXT_PUBLIC_IMAGE_CDN || ''
  if (CDN && src.startsWith('/images/')) return CDN + src.slice('/images'.length)
  return src
}
