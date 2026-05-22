import { create } from 'zustand'

interface ConfigStore {
  stripeEnabled: boolean
  stripeTrialDays: number
  ttsProvider: string
  openaiTtsVoice: string
  maintenanceMode: boolean
  loaded: boolean
  load: () => Promise<void>
}

export const useConfigStore = create<ConfigStore>((set, get) => ({
  stripeEnabled: false,
  stripeTrialDays: 7,
  ttsProvider: 'local',
  openaiTtsVoice: 'nova',
  maintenanceMode: false,
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
        ttsProvider: data.tts_provider ?? 'local',
        openaiTtsVoice: data.openai_tts_voice ?? 'nova',
        maintenanceMode: data.maintenance_mode ?? false,
        loaded: true,
      })
    } catch {
      // Non-fatal: keep defaults (stripe disabled)
      set({ loaded: true })
    }
  },
}))
