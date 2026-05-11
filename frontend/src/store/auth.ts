import { create } from 'zustand'

export type SubscriptionStatus = 'none' | 'trialing' | 'active' | 'past_due' | 'canceled'

export interface User {
  id: number
  username: string
  displayName: string
  email?: string
  native_language?: string
  target_language?: string
  role: 'admin' | 'user'
  conversation_max_duration: number
  conversation_inactivity_timeout: number
  avatar?: string | null
  is_verified?: boolean
  bio?: string | null
  learning_goals?: string[]
  subscription_status?: SubscriptionStatus
  subscription_ends_at?: string | null
}

/** Returns true when the user has an active/trialing subscription, or when Stripe is disabled (self-hosted). */
export function isSubscribed(user: User | null, stripeEnabled: boolean): boolean {
  if (!stripeEnabled) return true
  if (!user) return false
  return user.subscription_status === 'active' || user.subscription_status === 'trialing'
}

interface AuthStore {
  accessToken: string | null
  user: User | null
  setTokens: (access: string) => void
  setUser: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  user: null,
  setTokens: (access: string) =>
    set({ accessToken: access }),
  setUser: (user: User) =>
    set({ user }),
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fl_tour_done')
    }
    set({ accessToken: null, user: null })
  },
}))
