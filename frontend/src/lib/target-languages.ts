export interface TargetLanguage {
  code: string
  labelKey: string
  flag: string
}

export const TARGET_LANGUAGES: TargetLanguage[] = [
  { code: 'en-US', labelKey: 'en-US', flag: '/flags/usa.jpg' },
  { code: 'en-GB', labelKey: 'en-GB', flag: '/flags/uk.jpg' },
]

export const DEFAULT_TARGET_LANGUAGE = 'en-US'
