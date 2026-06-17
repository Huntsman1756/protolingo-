import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import React from 'react'

const { mockApiFetch, mockSearchParams, navigationState } = vi.hoisted(() => ({
  mockApiFetch: vi.fn(),
  mockSearchParams: new URLSearchParams(),
  navigationState: { pathname: '/admin' },
}))

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    React.createElement('a', { href: String(href), ...props }, children),
}))

vi.mock('next/navigation', () => ({
  usePathname: () => navigationState.pathname,
  useSearchParams: () => mockSearchParams,
}))

vi.mock('@/lib/api', () => ({
  apiFetch: mockApiFetch,
}))

import AdminFeedbackPage from '@/app/(app)/admin/feedback/page'
import AdminUsersPage from '@/app/(app)/admin/users/page'
import { useAuthStore } from '@/store/auth'
import { useConfigStore } from '@/store/config'
import { useLanguageStore } from '@/store/language'

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('admin page query params', () => {
  beforeEach(() => {
    mockApiFetch.mockReset()
    for (const key of Array.from(mockSearchParams.keys())) {
      mockSearchParams.delete(key)
    }
    navigationState.pathname = '/admin'
    useAuthStore.setState({
      accessToken: 'test-token',
      user: {
        id: 1,
        username: 'admin',
        displayName: 'Admin',
        email: 'admin@example.com',
        native_language: 'en',
        ui_locale: 'en',
        role: 'admin',
        avatar: null,
        is_verified: true,
        bio: null,
        learning_goals: [],
        conversation_max_duration: 30,
        conversation_inactivity_timeout: 3,
        subscription_status: 'active',
        subscription_ends_at: null,
      },
    })
    useConfigStore.setState({ maintenanceMode: false })
    useLanguageStore.setState({ availableLanguageCodes: [] })
  })

  it('initializes admin feedback filters from URL search params', async () => {
    navigationState.pathname = '/admin/feedback'
    mockSearchParams.set('type', 'bug')
    mockSearchParams.set('status', 'pending')
    mockSearchParams.set('sort', 'votes')
    mockApiFetch.mockResolvedValue(
      jsonResponse({ items: [], total: 0, skip: 0, limit: 20 })
    )

    render(<AdminFeedbackPage />)

    await waitFor(() => expect(mockApiFetch).toHaveBeenCalled())
    const url = String(mockApiFetch.mock.calls[0][0])
    expect(url).toContain('/api/feedback?')
    expect(url).toContain('type=bug')
    expect(url).toContain('status=pending')
    expect(url).toContain('sort=votes')
  })

  it('initializes admin users filters from URL search params', async () => {
    navigationState.pathname = '/admin/users'
    mockSearchParams.set('subscription', 'past_due')
    mockSearchParams.set('role', 'user')
    mockSearchParams.set('is_active', 'false')
    mockSearchParams.set('q', 'blocked')
    mockApiFetch.mockImplementation(async (url: string) => {
      if (url.startsWith('/api/admin/users?')) {
        return jsonResponse({ items: [], total: 0, skip: 0, limit: 10 })
      }
      return jsonResponse({ maintenance_mode: false })
    })

    render(<AdminUsersPage />)

    await waitFor(() => expect(mockApiFetch).toHaveBeenCalled())
    const usersCall = mockApiFetch.mock.calls.find(([url]) =>
      String(url).startsWith('/api/admin/users?')
    )
    expect(usersCall).toBeDefined()
    const url = String(usersCall![0])
    expect(url).toContain('q=blocked')
    expect(url).toContain('subscription=past_due')
    expect(url).toContain('role=user')
    expect(url).toContain('is_active=false')
  })
})
