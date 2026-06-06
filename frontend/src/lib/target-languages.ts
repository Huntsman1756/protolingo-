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
    flagPath: '/flags/spain.jpeg',
    iso639: 'es',
  },
  {
    code: 'it-IT',
    name: 'Italiano',
    nameEn: 'Italian',
    flagPath: '/flags/italy.jpeg',
    iso639: 'it',
  },
  {
    code: 'pt-PT',
    name: 'Português',
    nameEn: 'Portuguese',
    flagPath: '/flags/portugal.jpeg',
    iso639: 'pt',
  },
]

export function getLanguageByCode(code: string): TargetLanguage | undefined {
  const upper = code.toUpperCase()
  return SUPPORTED_TARGET_LANGUAGES.find((l) => l.code.toUpperCase() === upper)
}

export const DEFAULT_TARGET_LANGUAGE = 'en-GB'
