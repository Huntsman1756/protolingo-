import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { buildConversationWsUrl } from '@/lib/conversation-ws'

describe('buildConversationWsUrl', () => {
  const originalEnv = process.env.NEXT_PUBLIC_API_URL

  beforeEach(() => {
    vi.stubGlobal('window', {
      location: {
        protocol: 'http:',
        host: 'localhost:3000',
      },
    })
  })

  afterEach(() => {
    process.env.NEXT_PUBLIC_API_URL = originalEnv
    vi.unstubAllGlobals()
  })

  it('uses NEXT_PUBLIC_API_URL with https → wss', () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com'
    const url = buildConversationWsUrl()
    expect(url).toBe('wss://api.example.com/ws/conversation')
  })

  it('uses NEXT_PUBLIC_API_URL with http → ws', () => {
    process.env.NEXT_PUBLIC_API_URL = 'http://api.example.com'
    const url = buildConversationWsUrl()
    expect(url).toBe('ws://api.example.com/ws/conversation')
  })

  it('derives ws:// from window.location when NEXT_PUBLIC_API_URL is empty', () => {
    process.env.NEXT_PUBLIC_API_URL = ''
    const url = buildConversationWsUrl()
    expect(url).toBe('ws://localhost:3000/ws/conversation')
  })

  it('derives wss:// from window.location when on https', () => {
    process.env.NEXT_PUBLIC_API_URL = ''
    vi.stubGlobal('window', {
      location: {
        protocol: 'https:',
        host: 'app.example.com',
      },
    })
    const url = buildConversationWsUrl()
    expect(url).toBe('wss://app.example.com/ws/conversation')
  })

  it('trims whitespace from NEXT_PUBLIC_API_URL', () => {
    process.env.NEXT_PUBLIC_API_URL = '  https://api.example.com  '
    const url = buildConversationWsUrl()
    expect(url).toBe('wss://api.example.com/ws/conversation')
  })

  it('handles NEXT_PUBLIC_API_URL with trailing slash', () => {
    process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com/'
    const url = buildConversationWsUrl()
    expect(url).toBe('wss://api.example.com/ws/conversation')
  })
})
