import type { User } from '@/store/auth'

/**
 * Map a raw API response (snake_case) to the front-end User shape.
 *
 * @param data    - Raw JSON from /api/auth/me or any PATCH /api/auth/me response.
 * @param current - Existing store user; used as fallback for optional fields that
 *                  may be absent in partial PATCH responses.
 */

export function mapUser(
  data: Record<string, any>,
  current?: User | null
): User {
  return {
    id: data.id,
    username: data.username,
    displayName: data.display_name,
    email: data.email,
    native_language: data.native_language,
    target_language: data.target_language,
    role: data.role,
    conversation_max_duration: data.conversation_max_duration,
    conversation_inactivity_timeout: data.conversation_inactivity_timeout,
    avatar: data.avatar ?? current?.avatar ?? null,
    is_verified: data.is_verified ?? current?.is_verified ?? true,
    bio: data.bio ?? current?.bio ?? null,
    learning_goals: data.learning_goals ?? current?.learning_goals ?? [],
    subscription_status:
      data.subscription_status ?? current?.subscription_status ?? 'none',
    subscription_ends_at:
      data.subscription_ends_at ?? current?.subscription_ends_at ?? null,
  }
}
