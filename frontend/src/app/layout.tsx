import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { CookieBanner } from '@/components/CookieBanner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://freelingo.app'),
  title: {
    default: 'FreeLingo',
    template: '%s | FreeLingo',
  },
  description: 'FreeLingo is a self-hosted AI-powered English learning platform with voice conversation, flashcards, grammar lessons, and a personal AI tutor.',
  keywords: ['English learning', 'AI language tutor', 'self-hosted', 'voice conversation', 'flashcards', 'CEFR', 'language learning app', 'learn English online'],
  authors: [{ name: 'Arturo Carretero Calvo', url: 'https://arturocarreterocalvo.com' }],
  creator: 'Arturo Carretero Calvo',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://freelingo.app',
    siteName: 'FreeLingo',
    title: 'FreeLingo — AI-powered English learning',
    description: 'Learn English with an AI tutor, voice conversations, flashcards, and structured lessons. Self-hosted and privacy-friendly.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FreeLingo — AI-powered English learning' }],
  },
  twitter: {
    card: 'summary',
    title: 'FreeLingo — AI-powered English learning',
    description: 'Learn English with an AI tutor, voice conversations, flashcards, and structured lessons.',
    images: ['/logo.png'],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
