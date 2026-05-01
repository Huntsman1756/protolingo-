import { create } from 'zustand'

interface User {
  id: number
  username: string
  displayName: string
  email?: string
  native_language?: string
  english_variant?: string
  role: 'admin' | 'user'
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
