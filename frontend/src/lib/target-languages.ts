export interface TargetLanguage {
  code: string
  name: string
  nameEn: string
  flagPath: string
  iso639: string
}

export const SUPPORTED_TARGET_LANGUAGES: TargetLanguage[] = [
  {
    code: 'en-US',
    name: 'English (US)',
    nameEn: 'English (US)',
    flagPath: '/flags/usa.jpg',
    iso639: 'en',
  },
  {
    code: 'en-GB',
    name: 'English (UK)',
    nameEn: 'English (UK)',
    flagPath: '/flags/uk.jpg',
    iso639: 'en',
  },
  {
    code: 'es-ES',
    name: 'Español',
    nameEn: 'Spanish',
    flagPath: '/flags/spain.jpg',
    iso639: 'es',
  },
  {
    code: 'it-IT',
    name: 'Italiano',
    nameEn: 'Italian',
    flagPath: '/flags/italy.jpg',
    iso639: 'it',
  },
  {
    code: 'pt-PT',
    name: 'Português',
    nameEn: 'Portuguese',
    flagPath: '/flags/portugal.jpg',
    iso639: 'pt',
  },
  {
    code: 'fr-FR',
    name: 'Français',
    nameEn: 'French',
    flagPath: '/flags/france.jpg',
    iso639: 'fr',
  },
  {
    code: 'de-DE',
    name: 'Deutsch',
    nameEn: 'German',
    flagPath: '/flags/germany.jpg',
    iso639: 'de',
  },
]

export function getLanguageByCode(code: string): TargetLanguage | undefined {
  const upper = code.toUpperCase()
  return SUPPORTED_TARGET_LANGUAGES.find((l) => l.code.toUpperCase() === upper)
}

export const DEFAULT_TARGET_LANGUAGE = 'en-GB'

const LOCALES_CAPITALIZE_LANGUAGE = new Set(['en', 'de', 'nl'])

export function formatLanguageName(name: string, locale: string): string {
  const lang = locale.split('-')[0]
  return LOCALES_CAPITALIZE_LANGUAGE.has(lang) ? name : name.toLowerCase()
}
