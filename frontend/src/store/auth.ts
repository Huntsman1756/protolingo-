import { create } from 'zustand'

interface User {
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
  logout: () =>
    set({ accessToken: null, user: null }),
}))
