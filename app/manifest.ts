import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HotelsWithPets — Pet-Friendly Hotels in Europe',
    short_name: 'HotelsWithPets',
    description: 'Find and book pet-friendly hotels across 34 European destinations.',
    start_url: '/en',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
