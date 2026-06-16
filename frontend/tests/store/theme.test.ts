import { describe, it, expect, beforeEach } from 'vitest'
import { useThemeStore } from '@/store/theme'

describe('useThemeStore', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'system' })
  })

  it('has system as default theme', () => {
    const store = useThemeStore.getState()
    expect(store.theme).toBe('system')
  })

  it('setTheme changes the theme', () => {
    useThemeStore.getState().setTheme('dark')
    expect(useThemeStore.getState().theme).toBe('dark')
  })

  it('can toggle between light and dark', () => {
    useThemeStore.getState().setTheme('light')
    expect(useThemeStore.getState().theme).toBe('light')

    useThemeStore.getState().setTheme('dark')
    expect(useThemeStore.getState().theme).toBe('dark')
  })

  it('can set back to system', () => {
    useThemeStore.getState().setTheme('dark')
    useThemeStore.getState().setTheme('system')
    expect(useThemeStore.getState().theme).toBe('system')
  })

  it('persists to localStorage with key fl-theme', () => {
    useThemeStore.getState().setTheme('dark')
    const stored = JSON.parse(localStorage.getItem('fl-theme') || '{}')
    expect(stored.state.theme).toBe('dark')
  })
})
