import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  output: 'standalone',
  // NEXT_PUBLIC_API_URL: public backend URL used by the browser for WebSocket
  // connections (bypasses Next.js rewrites which don't support WS).
  // Leave empty to derive WS URL from window.location (same-origin setup).
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? '',
  },
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
        ],
      },
      {
        // SharedArrayBuffer is required by onnxruntime-web threaded WASM.
        // Firefox blocks it without cross-origin isolation (COOP + COEP).
        // 'credentialless' COEP allows cross-origin resources without CORP headers
        // while still enabling SharedArrayBuffer (Firefox 119+, Chrome 96+).
        source: '/conversation',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'credentialless' },
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
