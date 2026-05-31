'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { apiFetch } from '@/lib/api'

/**
 * Returns a stable `handleLogout` function that:
 * 1. Calls the server-side logout endpoint (clears the httpOnly cookie)
 * 2. Clears the Zustand auth store
 * 3. Redirects to /login
 */
export function useLogout() {
  const router = useRouter()
  const logout = useAuthStore((s) => s.logout)

  async function handleLogout() {
    await apiFetch('/api/auth/logout', { method: 'POST' })
    logout()
    router.push('/login')
  }

  return handleLogout
}
