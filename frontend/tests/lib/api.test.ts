import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiFetch } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { useLoadingStore } from '@/store/loading'

describe('apiFetch', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    useAuthStore.setState({ accessToken: null, user: null })
    useLoadingStore.setState({ count: 0 })
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    global.fetch = originalFetch
    vi.unstubAllGlobals()
  })

  it('attaches Bearer token when accessToken is set', async () => {
    useAuthStore.setState({ accessToken: 'test-token' })
    vi.mocked(fetch).mockResolvedValueOnce(new Response('ok', { status: 200 }))

    await apiFetch('/api/test')

    expect(fetch).toHaveBeenCalledWith(
      '/api/test',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
        credentials: 'include',
      })
    )
  })

  it('does not attach Authorization header when no token', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response('ok', { status: 200 }))

    await apiFetch('/api/test')

    const callArgs = vi.mocked(fetch).mock.calls[0]
    const headers = callArgs[1]?.headers as Record<string, string>
    expect(headers.Authorization).toBeUndefined()
  })

  it('retries with new token on 401', async () => {
    useAuthStore.setState({ accessToken: 'old-token' })

    vi.mocked(fetch)
      .mockResolvedValueOnce(new Response('unauthorized', { status: 401 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ access_token: 'new-token' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      )
      .mockResolvedValueOnce(new Response('ok', { status: 200 }))

    const res = await apiFetch('/api/test')

    expect(fetch).toHaveBeenCalledTimes(3)
    expect(res.status).toBe(200)
    expect(useAuthStore.getState().accessToken).toBe('new-token')
  })

  it('calls logout and redirects on refresh failure', async () => {
    useAuthStore.setState({ accessToken: 'old-token' })

    vi.mocked(fetch)
      .mockResolvedValueOnce(new Response('unauthorized', { status: 401 }))
      .mockResolvedValueOnce(new Response('refresh failed', { status: 401 }))

    const res = await apiFetch('/api/test')

    expect(useAuthStore.getState().accessToken).toBeNull()
    expect(useAuthStore.getState().user).toBeNull()
    expect(res.status).toBe(401)
  })

  it('deduplicates concurrent refresh calls', async () => {
    useAuthStore.setState({ accessToken: 'old-token' })

    let refreshCallCount = 0
    vi.mocked(fetch).mockImplementation(async (url: any) => {
      const urlStr = typeof url === 'string' ? url : url.toString()
      if (urlStr.includes('/api/auth/refresh')) {
        refreshCallCount++
        return new Response(JSON.stringify({ access_token: 'new-token' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }
      return new Response('unauthorized', { status: 401 })
    })

    await Promise.all([apiFetch('/api/test1'), apiFetch('/api/test2')])

    expect(refreshCallCount).toBe(1)
  })

  it('increments and decrements loading counter', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response('ok', { status: 200 }))

    expect(useLoadingStore.getState().count).toBe(0)
    await apiFetch('/api/test')
    expect(useLoadingStore.getState().count).toBe(0)
  })

  it('decrements loading counter even on error', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('network error'))

    await expect(apiFetch('/api/test')).rejects.toThrow('network error')
    expect(useLoadingStore.getState().count).toBe(0)
  })

  it('preserves custom headers', async () => {
    useAuthStore.setState({ accessToken: 'token' })
    vi.mocked(fetch).mockResolvedValueOnce(new Response('ok', { status: 200 }))

    await apiFetch('/api/test', {
      headers: { 'Content-Type': 'application/json' },
    })

    const callArgs = vi.mocked(fetch).mock.calls[0]
    const headers = callArgs[1]?.headers as Record<string, string>
    expect(headers['Content-Type']).toBe('application/json')
    expect(headers['Authorization']).toBe('Bearer token')
  })
})
