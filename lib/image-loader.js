// Custom next/image loader: rewrites local /images/... paths to the Supabase
// Storage public CDN (NEXT_PUBLIC_IMAGE_CDN, which already ends with "/images").
// External absolute URLs (Unsplash, Amazon, Booking) pass through untouched.
// width + quality are forwarded as Supabase image-transform query params.
module.exports = function imageLoader({ src, width, quality }) {
  if (/^https?:\/\//.test(src)) return src
  const CDN = process.env.NEXT_PUBLIC_IMAGE_CDN || ''
  if (CDN && src.startsWith('/images/')) {
    const url = CDN + src.slice('/images'.length)
    const params = new URLSearchParams()
    if (width) params.set('width', String(width))
    params.set('quality', String(quality || 75))
    return `${url}?${params.toString()}`
  }
  return src
}
