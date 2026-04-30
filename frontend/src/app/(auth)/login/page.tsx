'use client'

import { Suspense, useCallback, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { apiFetch } from '@/lib/api'
import { useAuthStore } from '@/store/auth'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get('registered') === 'true'
  const setTokens = useAuthStore((s) => s.setTokens)
  const setUser = useAuthStore((s) => s.setUser)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError('')
      setLoading(true)
      try {
        const res = await apiFetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.detail || 'Invalid credentials')
        }
        const { access_token } = await res.json()
        setTokens(access_token)
        const meRes = await apiFetch('/api/auth/me')
        if (meRes.ok) setUser(await meRes.json())
        router.push('/dashboard')
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Login failed')
      } finally {
        setLoading(false)
      }
    },
    [username, password, router, setTokens, setUser]
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4"
      style={{ backgroundImage: 'radial-gradient(circle, #2a2a2a 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="font-mono text-xl font-bold tracking-widest text-[#f5f5f5] uppercase">FreeLingo</h1>
          <p className="font-mono text-[11px] text-[#777] tracking-widest uppercase mt-1">self-hosted language learning</p>
        </div>

        <div className="border border-[#2a2a2a] bg-[#111] p-8">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#2a2a2a]">
            <span className="text-[10px] text-[#777]">●</span>
            <span className="font-mono text-xs tracking-widest text-[#777] uppercase">Sign In</span>
          </div>

          {registered && (
            <div className="mb-5 border border-[#2a2a2a] px-4 py-3 font-mono text-xs text-[#888] tracking-wide">
              ✓ Account created — you can now sign in
            </div>
          )}
          {error && (
            <div className="mb-5 border border-[#ff3b3b]/40 px-4 py-3 font-mono text-xs text-[#ff3b3b] tracking-wide">
              ✕ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] tracking-widest text-[#777] uppercase mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-3 font-mono text-sm text-[#f5f5f5] focus:outline-none focus:border-[#444] transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-widest text-[#777] uppercase mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] px-4 py-3 font-mono text-sm text-[#f5f5f5] focus:outline-none focus:border-[#444] transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#f5f5f5] text-[#0a0a0a] font-mono text-xs font-bold tracking-widest uppercase py-3 hover:bg-white disabled:opacity-40 transition-colors"
            >
              {loading ? '— SIGNING IN...' : '— SIGN IN'}
            </button>
          </form>

          <p className="mt-6 font-mono text-[10px] text-[#777] tracking-wide text-center">
            No account?{' '}
            <a href="/register" className="text-[#888] hover:text-[#f5f5f5] transition-colors">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
