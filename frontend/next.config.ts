import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  output: 'standalone',
  webpack(config, { isServer }) {
    if (isServer) {
      // Prevent SSR bundling of WASM-heavy packages; ConversationMode is
      // always loaded with dynamic({ ssr: false }) but this guards against
      // accidental server-side imports.
      const externals = Array.isArray(config.externals) ? config.externals : []
      config.externals = [
        ...externals,
        '@ricky0123/vad-react',
        '@ricky0123/vad-web',
        'onnxruntime-web',
      ]
    }
    return config
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(self), geolocation=()' },
          // Required for SharedArrayBuffer (onnxruntime-web threaded WASM).
          // credentialless COEP is more permissive than require-corp and works
          // with client-side navigation in Next.js (headers must be global).
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'credentialless' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; object-src 'none'; base-uri 'self'" },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL || 'http://backend:8000'}/api/:path*`,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
