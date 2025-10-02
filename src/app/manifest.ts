import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Transition Marketing AI - CRM Dashboard',
    short_name: 'Transition CRM',
    description: 'AI-powered CRM platform for Indian businesses with lead generation, content creation, and sales automation',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1E40AF',
    orientation: 'portrait-primary',
    scope: '/',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    categories: ['business', 'productivity', 'utilities'],
    lang: 'en',
    dir: 'ltr',
    screenshots: [
      {
        src: '/og.png',
        sizes: '1200x630',
        type: 'image/png',
        platform: 'chromeos',
        label: 'Dashboard overview'
      }
    ]
  }
}
