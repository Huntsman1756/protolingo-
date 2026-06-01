import { describe, it, expect } from 'vitest'
import { mapUser } from '@/lib/mappers'
import type { User } from '@/store/auth'

describe('mapUser', () => {
  const rawFull = {
    id: 1,
    username: 'john',
    display_name: 'John Doe',
    email: 'john@example.com',
    native_language: 'es',
    target_language: 'en',
    role: 'user' as const,
    conversation_max_duration: 300,
    conversation_inactivity_timeout: 30,
    avatar: 'https://example.com/avatar.png',
    is_verified: true,
    bio: 'Hello',
    learning_goals: ['travel', 'work'],
    subscription_status: 'active' as const,
    subscription_ends_at: '2025-12-31',
  }

  it('maps snake_case API response to camelCase User', () => {
    const user = mapUser(rawFull)

    expect(user).toEqual({
      id: 1,
      username: 'john',
      displayName: 'John Doe',
      email: 'john@example.com',
      native_language: 'es',
      target_language: 'en',
      role: 'user',
      conversation_max_duration: 300,
      conversation_inactivity_timeout: 30,
      avatar: 'https://example.com/avatar.png',
      is_verified: true,
      bio: 'Hello',
      learning_goals: ['travel', 'work'],
      subscription_status: 'active',
      subscription_ends_at: '2025-12-31',
      ui_locale: null,
    })
  })

  it('falls back to current user for optional fields absent in PATCH response', () => {
    const current: User = {
      id: 1,
      username: 'john',
      displayName: 'John Doe',
      role: 'user',
      conversation_max_duration: 300,
      conversation_inactivity_timeout: 30,
      avatar: 'old-avatar.png',
      is_verified: true,
      bio: 'old bio',
      learning_goals: ['travel'],
      subscription_status: 'trialing',
      subscription_ends_at: '2025-06-01',
    }

    const patchResponse = {
      id: 1,
      username: 'john',
      display_name: 'John Updated',
      role: 'user',
      conversation_max_duration: 300,
      conversation_inactivity_timeout: 30,
    }

    const user = mapUser(patchResponse, current)

    expect(user.displayName).toBe('John Updated')
    expect(user.avatar).toBe('old-avatar.png')
    expect(user.bio).toBe('old bio')
    expect(user.learning_goals).toEqual(['travel'])
    expect(user.subscription_status).toBe('trialing')
    expect(user.subscription_ends_at).toBe('2025-06-01')
  })

  it('uses safe defaults when no current user and optional fields missing', () => {
    const minimal = {
      id: 2,
      username: 'jane',
      display_name: 'Jane',
      role: 'admin',
      conversation_max_duration: 600,
      conversation_inactivity_timeout: 60,
    }

    const user = mapUser(minimal)

    expect(user.avatar).toBeNull()
    expect(user.is_verified).toBe(true)
    expect(user.bio).toBeNull()
    expect(user.learning_goals).toEqual([])
    expect(user.subscription_status).toBe('none')
    expect(user.subscription_ends_at).toBeNull()
  })

  it('prefers API data over current user when both present', () => {
    const current: User = {
      id: 1,
      username: 'john',
      displayName: 'Old Name',
      role: 'user',
      conversation_max_duration: 300,
      conversation_inactivity_timeout: 30,
      avatar: 'old.png',
      bio: 'old',
      learning_goals: ['old'],
      subscription_status: 'canceled',
    }

    const apiData = {
      id: 1,
      username: 'john',
      display_name: 'New Name',
      role: 'admin',
      conversation_max_duration: 300,
      conversation_inactivity_timeout: 30,
      avatar: 'new.png',
      bio: 'new bio',
      learning_goals: ['new'],
      subscription_status: 'active',
    }

    const user = mapUser(apiData, current)

    expect(user.displayName).toBe('New Name')
    expect(user.role).toBe('admin')
    expect(user.avatar).toBe('new.png')
    expect(user.bio).toBe('new bio')
    expect(user.learning_goals).toEqual(['new'])
    expect(user.subscription_status).toBe('active')
  })
})
