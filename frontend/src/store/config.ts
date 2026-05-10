import { create } from 'zustand'

interface ConfigStore {
  stripeEnabled: boolean
  stripeTrialDays: number
  loaded: boolean
  load: () => Promise<void>
}

export const useConfigStore = create<ConfigStore>((set, get) => ({
  stripeEnabled: false,
  stripeTrialDays: 7,
  loaded: false,
  load: async () => {
    if (get().loaded) return
    try {
      const res = await fetch('/api/config')
      if (!res.ok) return
      const data = await res.json()
      set({
        stripeEnabled: data.stripe_enabled ?? false,
        stripeTrialDays: data.stripe_trial_days ?? 7,
        loaded: true,
      })
    } catch {
      // Non-fatal: keep defaults (stripe disabled)
      set({ loaded: true })
    }
  },
}))
