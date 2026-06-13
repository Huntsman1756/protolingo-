import { create } from 'zustand'

interface LoadingStore {
  count: number
  /** True when all requests finished and the bar should play its exit animation. */
  complete: boolean
  inc: () => void
  dec: () => void
  /** Called by the LoadingBar after the exit animation finishes. */
  finishComplete: () => void
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  count: 0,
  complete: false,
  inc: () => set((s) => ({ count: s.count + 1, complete: false })),
  dec: () =>
    set((s) => {
      const next = Math.max(0, s.count - 1)
      return { count: next, complete: next === 0 }
    }),
  finishComplete: () => set({ complete: false }),
}))
