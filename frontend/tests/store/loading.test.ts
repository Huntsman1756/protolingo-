import { describe, it, expect, beforeEach } from 'vitest'
import { useLoadingStore } from '@/store/loading'

describe('useLoadingStore', () => {
  beforeEach(() => {
    useLoadingStore.setState({ count: 0, complete: false })
  })

  it('starts with count 0 and complete false', () => {
    const s = useLoadingStore.getState()
    expect(s.count).toBe(0)
    expect(s.complete).toBe(false)
  })

  it('inc increments count and resets complete', () => {
    useLoadingStore.getState().inc()
    expect(useLoadingStore.getState().count).toBe(1)
    expect(useLoadingStore.getState().complete).toBe(false)
  })

  it('inc resets complete from true back to false', () => {
    useLoadingStore.setState({ count: 0, complete: true })
    useLoadingStore.getState().inc()
    expect(useLoadingStore.getState().count).toBe(1)
    expect(useLoadingStore.getState().complete).toBe(false)
  })

  it('dec decrements count', () => {
    useLoadingStore.setState({ count: 3 })
    useLoadingStore.getState().dec()
    expect(useLoadingStore.getState().count).toBe(2)
    expect(useLoadingStore.getState().complete).toBe(false)
  })

  it('dec never goes below 0', () => {
    useLoadingStore.getState().dec()
    expect(useLoadingStore.getState().count).toBe(0)
  })

  it('dec sets complete to true when count reaches 0', () => {
    useLoadingStore.setState({ count: 1 })
    useLoadingStore.getState().dec()
    expect(useLoadingStore.getState().count).toBe(0)
    expect(useLoadingStore.getState().complete).toBe(true)
  })

  it('finishComplete resets complete to false', () => {
    useLoadingStore.setState({ count: 0, complete: true })
    useLoadingStore.getState().finishComplete()
    expect(useLoadingStore.getState().complete).toBe(false)
  })

  it('full lifecycle: inc, inc, dec, dec, finishComplete', () => {
    const store = useLoadingStore.getState()

    store.inc()
    store.inc()
    expect(useLoadingStore.getState().count).toBe(2)
    expect(useLoadingStore.getState().complete).toBe(false)

    store.dec()
    expect(useLoadingStore.getState().count).toBe(1)
    expect(useLoadingStore.getState().complete).toBe(false)

    store.dec()
    expect(useLoadingStore.getState().count).toBe(0)
    expect(useLoadingStore.getState().complete).toBe(true)

    store.finishComplete()
    expect(useLoadingStore.getState().complete).toBe(false)
  })

  it('multiple inc from 0 resets complete flag', () => {
    useLoadingStore.getState().inc()
    useLoadingStore.getState().dec()
    expect(useLoadingStore.getState().complete).toBe(true)

    useLoadingStore.getState().inc()
    expect(useLoadingStore.getState().complete).toBe(false)
  })
})
