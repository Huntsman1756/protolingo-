import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'
import { SUPPORTED_LOCALES, type Locale } from '@/lib/locales'
import de from '../../messages/de.json'
import en from '../../messages/en.json'
import es from '../../messages/es.json'
import fr from '../../messages/fr.json'
import it from '../../messages/it.json'
import nl from '../../messages/nl.json'
import pl from '../../messages/pl.json'
import pt from '../../messages/pt.json'
import ro from '../../messages/ro.json'
import ru from '../../messages/ru.json'

const MESSAGES: Record<Locale, Record<string, unknown>> = {
  de,
  en,
  es,
  fr,
  it,
  nl,
  pl,
  pt,
  ro,
  ru,
}

function resolveLocale(raw: string | undefined): Locale {
  if (raw && (SUPPORTED_LOCALES as readonly string[]).includes(raw)) {
    return raw as Locale
  }
  return 'en'
}

export default getRequestConfig(async () => {
  const headerStore = await headers()
  const cookieStore = await cookies()

  // x-next-locale is injected by the middleware on every request (including the
  // very first one, before the NEXT_LOCALE cookie has been written to the client)
  const locale = resolveLocale(
    headerStore.get('x-next-locale') ?? cookieStore.get('NEXT_LOCALE')?.value
  )

  return {
    locale,
    messages: MESSAGES[locale] ?? MESSAGES.en,
  }
})
