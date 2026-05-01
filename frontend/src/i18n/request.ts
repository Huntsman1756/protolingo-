import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'pt', 'de', 'it'] as const
type Locale = (typeof SUPPORTED_LOCALES)[number]

function resolveLocale(raw: string | undefined): Locale {
  if (raw && (SUPPORTED_LOCALES as readonly string[]).includes(raw)) {
    return raw as Locale
  }
  return 'en'
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const locale = resolveLocale(cookieStore.get('NEXT_LOCALE')?.value)

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
