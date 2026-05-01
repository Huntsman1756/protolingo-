'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import { apiFetch } from '@/lib/api'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { LoadingBar } from '@/components/ui/loading-bar'

const navItems = [
  { href: '/dashboard', label: 'DASHBOARD', dot: '·' },
  { href: '/assessment', label: 'ASSESSMENT', dot: '·' },
  { href: '/flashcards', label: 'FLASHCARDS', dot: '·' },
  { href: '/chat', label: 'AI TUTOR', dot: '·' },
  { href: '/settings', label: 'SETTINGS', dot: '·' },
  { href: '/faq', label: 'FAQ', dot: '·' },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const accessToken = useAuthStore((s) => s.accessToken)
  const setTokens = useAuthStore((s) => s.setTokens)
  const setUser = useAuthStore((s) => s.setUser)
  const logout = useAuthStore((s) => s.logout)
  const [initializing, setInitializing] = useState(true)
  const [logoutConfirm, setLogoutConfirm] = useState(false)

  // On every page load, Zustand is empty. Use the httpOnly refresh cookie
  // to silently get a new access token, then fetch /me to populate the user.
  useEffect(() => {
    async function init() {
      try {
        if (!accessToken) {
          const res = await fetch('/api/auth/refresh', {
            method: 'POST',
            credentials: 'include',
          })
          if (!res.ok) {
            logout()
            router.push('/login')
            return
          }
          const { access_token } = await res.json()
          setTokens(access_token)
        }
        // Fetch user info if not already loaded
        const meRes = await apiFetch('/api/auth/me')
        if (!meRes.ok) {
          logout()
          router.push('/login')
          return
        }
        const me = await meRes.json()
        setUser({
          id: me.id,
          username: me.username,
          displayName: me.display_name,
          email: me.email,
          native_language: me.native_language,
          role: me.role,
        })
      } catch {
        logout()
        router.push('/login')
      } finally {
        setInitializing(false)
      }
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleLogout() {
    await apiFetch('/api/auth/logout', { method: 'POST' })
    logout()
    router.push('/login')
  }

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-fl-bg"
        style={{ backgroundImage: 'radial-gradient(circle, #2a2a2a 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        <span className="font-mono text-xs text-fl-muted-2 tracking-widest uppercase animate-pulse">● Initializing…</span>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-fl-bg">
      {/* Sidebar */}
      <aside className="hidden md:flex w-52 flex-col border-r border-fl-border bg-fl-bg px-0 py-0 shrink-0">
        {/* Logo area */}
        <div className="flex items-center gap-2 px-5 py-5 border-b border-fl-border">
          <span className="text-[10px] text-fl-muted-2">●</span>
          <span className="font-mono text-sm font-bold tracking-widest text-fl-fg uppercase">FreeLingo</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-3 text-xs font-mono tracking-widest transition-colors ${active
                  ? 'text-fl-fg bg-fl-surface-2 border-l-2 border-fl-fg'
                  : 'text-fl-muted-2 hover:text-fl-fg hover:bg-fl-surface border-l-2 border-transparent'
                  }`}
              >
                <span className={`text-[10px] ${active ? 'text-fl-fg' : 'text-fl-muted-4'}`}>●</span>
                {item.label}
              </Link>
            )
          })}
          {user?.role === 'admin' && (
            <Link
              href="/admin/users"
              className={`flex items-center gap-3 px-5 py-3 text-xs font-mono tracking-widest transition-colors ${pathname.startsWith('/admin')
                ? 'text-fl-fg bg-fl-surface-2 border-l-2 border-fl-fg'
                : 'text-fl-muted-2 hover:text-fl-fg hover:bg-fl-surface border-l-2 border-transparent'
                }`}
            >
              <span className="text-[10px] text-fl-muted-4">●</span>
              ADMIN
            </Link>
          )}
        </nav>

        {/* User + logout */}
        <div className="border-t border-fl-border px-5 py-4">
          <p className="text-[11px] font-mono text-fl-muted-2 tracking-widest uppercase mb-1">
            {user?.displayName || user?.username}
          </p>
          <p className="text-[10px] font-mono text-fl-muted-4 mb-3">@{user?.username}</p>
          <button
            onClick={() => setLogoutConfirm(true)}
            className="w-full text-left text-[10px] font-mono tracking-widest text-fl-muted-2 hover:text-fl-fg transition-colors uppercase"
          >
            — LOGOUT
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-fl-border bg-fl-bg px-4 py-3">
        <span className="font-mono text-xs font-bold tracking-widest text-fl-fg uppercase">FreeLingo</span>
        <nav className="flex items-center gap-0">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase transition-colors ${active ? 'text-fl-fg border-b border-fl-fg' : 'text-fl-muted-2 hover:text-fl-fg'
                  }`}
              >
                {item.label.slice(0, 4)}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main */}
      <main className="flex-1 overflow-y-auto pt-14 md:pt-0 min-h-screen">
        {children}
      </main>

      <LoadingBar />

      <ConfirmDialog
        open={logoutConfirm}
        title="Log Out"
        message="Are you sure you want to log out of your session?"
        confirmLabel="Log Out"
        onConfirm={handleLogout}
        onCancel={() => setLogoutConfirm(false)}
      />
    </div>
  )
}
