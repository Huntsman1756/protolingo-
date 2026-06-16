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

function log(
  level: LogLevel,
  namespace: string,
  message: string,
  payload?: unknown
) {
  if (!shouldLog(level)) return
  const tag = format(namespace, message)
  switch (level) {
    case 'debug':
      if (payload === undefined) console.debug(tag)
      else console.debug(tag, payload)
      break
    case 'info':
      if (payload === undefined) console.info(tag)
      else console.info(tag, payload)
      break
    case 'warn':
      if (payload === undefined) console.warn(tag)
      else console.warn(tag, payload)
      break
    case 'error':
      if (payload === undefined) console.error(tag)
      else console.error(tag, payload)
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
