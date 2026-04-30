import { create } from 'zustand'

interface LoadingStore {
  count: number
  inc: () => void
  dec: () => void
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
  dec: () => set((s) => ({ count: Math.max(0, s.count - 1) })),
}))
