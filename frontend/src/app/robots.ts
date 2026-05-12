import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/login', '/register', '/privacy', '/terms'],
        disallow: [
          '/dashboard',
          '/settings',
          '/chat',
          '/conversation',
          '/flashcards',
          '/plan',
          '/progress',
          '/grammar',
          '/vocabulary',
          '/phrasebook',
          '/assessment',
          '/admin',
          '/onboarding',
          '/faq',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://freelingo.app/sitemap.xml',
  }
}
