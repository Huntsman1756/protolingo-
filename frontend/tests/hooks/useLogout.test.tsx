import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'

const mockPush = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

vi.mock('@/lib/api', () => ({
  apiFetch: vi.fn(),
}))

describe('useLogout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls API logout and redirects to /login', async () => {
    const { apiFetch } = await import('@/lib/api')
    vi.mocked(apiFetch).mockResolvedValueOnce(new Response(null, { status: 200 }))

    const { useLogout } = await import('@/hooks/useLogout')
    const { result } = renderHook(() => useLogout())

    await act(async () => {
      await result.current()
    })

    expect(apiFetch).toHaveBeenCalledWith('/api/auth/logout', {
      method: 'POST',
    })
    expect(mockPush).toHaveBeenCalledWith('/login')
  })
})
