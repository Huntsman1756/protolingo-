import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getLogger, silentLogger } from '@/lib/logger'

describe('getLogger', () => {
  let debugSpy: ReturnType<typeof vi.spyOn>
  let infoSpy: ReturnType<typeof vi.spyOn>
  let warnSpy: ReturnType<typeof vi.spyOn>
  let errorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
    infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    debugSpy.mockRestore()
    infoSpy.mockRestore()
    warnSpy.mockRestore()
    errorSpy.mockRestore()
  })

  it('logs debug messages with namespace', () => {
    const log = getLogger('myModule')
    log.debug('test message')
    expect(debugSpy).toHaveBeenCalledWith('[myModule] test message')
  })

  it('logs info messages with namespace', () => {
    const log = getLogger('api')
    log.info('request sent')
    expect(infoSpy).toHaveBeenCalledWith('[api] request sent')
  })

  it('logs warn messages with namespace', () => {
    const log = getLogger('auth')
    log.warn('token expiring')
    expect(warnSpy).toHaveBeenCalledWith('[auth] token expiring')
  })

  it('logs error messages with namespace', () => {
    const log = getLogger('store')
    log.error('something broke')
    expect(errorSpy).toHaveBeenCalledWith('[store] something broke')
  })

  it('appends string payload', () => {
    const log = getLogger('test')
    log.info('message', 'extra data')
    expect(infoSpy).toHaveBeenCalledWith('[test] message extra data')
  })

  it('serializes object payload as JSON', () => {
    const log = getLogger('test')
    log.debug('state', { user: 'test', count: 5 })
    expect(debugSpy).toHaveBeenCalledWith(
      '[test] state {"user":"test","count":5}'
    )
  })

  it('serializes Error payload with message', () => {
    const log = getLogger('test')
    log.error('failure', new Error('boom'))
    expect(errorSpy).toHaveBeenCalledWith('[test] failure error=boom')
  })

  it('handles undefined payload gracefully', () => {
    const log = getLogger('test')
    log.info('no data')
    expect(infoSpy).toHaveBeenCalledWith('[test] no data')
  })

  it('handles unserializable payload', () => {
    const log = getLogger('test')
    const circular: Record<string, unknown> = {}
    circular.self = circular
    log.warn('circular', circular)
    expect(warnSpy).toHaveBeenCalledWith(
      '[test] circular [unserializable-payload]'
    )
  })
})

describe('silentLogger', () => {
  it('all methods are no-ops', () => {
    expect(() => silentLogger.debug('x')).not.toThrow()
    expect(() => silentLogger.info('x')).not.toThrow()
    expect(() => silentLogger.warn('x')).not.toThrow()
    expect(() => silentLogger.error('x')).not.toThrow()
  })
})
