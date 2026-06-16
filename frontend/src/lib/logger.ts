const DEFAULT_LEVEL = process.env.NODE_ENV === 'production' ? 2 : 0

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const LEVEL_WEIGHT: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

function shouldLog(level: LogLevel): boolean {
  return LEVEL_WEIGHT[level] >= DEFAULT_LEVEL
}

function format(namespace: string, message: string): string {
  return `[${namespace}] ${message}`
}

function serializePayload(payload: unknown): string {
  if (payload === undefined) return ''
  if (payload instanceof Error) {
    return ` error=${payload.message}`
  }
  if (typeof payload === 'string') {
    return ` ${payload}`
  }
  try {
    return ` ${JSON.stringify(payload)}`
  } catch {
    return ' [unserializable-payload]'
  }
}

function log(
  level: LogLevel,
  namespace: string,
  message: string,
  payload?: unknown
) {
  if (!shouldLog(level)) return
  const line = `${format(namespace, message)}${serializePayload(payload)}`
  switch (level) {
    case 'debug':
      console.debug(line)
      break
    case 'info':
      console.info(line)
      break
    case 'warn':
      console.warn(line)
      break
    case 'error':
      console.error(line)
      break
  }
}

export function getLogger(namespace: string) {
  return {
    debug: (message: string, payload?: unknown) =>
      log('debug', namespace, message, payload),
    info: (message: string, payload?: unknown) =>
      log('info', namespace, message, payload),
    warn: (message: string, payload?: unknown) =>
      log('warn', namespace, message, payload),
    error: (message: string, payload?: unknown) =>
      log('error', namespace, message, payload),
  }
}
