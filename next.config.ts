import type { NextConfig } from "next";

const securityHeaders = [
  { key: 'X-Content-Type-Options',        value: 'nosniff' },
  { key: 'X-Frame-Options',               value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection',              value: '1; mode=block' },
  { key: 'Referrer-Policy',               value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',            value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security',     value: 'max-age=63072000; includeSubDomains; preload' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
  // Safety net: any legacy /images/... URL still served as a string (og:image,
  // JSON-LD, external inbound links) 301s to the Supabase CDN now that the files
  // no longer ship in the deploy. next/image goes through lib/image-loader.js and
  // never hits this.
  async redirects() {
    const CDN = process.env.NEXT_PUBLIC_IMAGE_CDN
    if (!CDN) return []
    return [{ source: '/images/:path*', destination: `${CDN}/:path*`, permanent: true }]
  },
  images: {
    // Custom loader serves images from the Supabase Storage CDN (see
    // lib/image-loader.js + NEXT_PUBLIC_IMAGE_CDN). Bypasses Vercel image
    // optimization (the CDN serves the pre-compressed files directly) and lets us
    // keep public/images out of the Git deploy.
    loader: 'custom',
    loaderFile: './lib/image-loader.js',
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
};

export default nextConfig;
