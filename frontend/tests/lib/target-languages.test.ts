import { describe, it, expect } from 'vitest'
import {
  SUPPORTED_TARGET_LANGUAGES,
  getLanguageByCode,
  DEFAULT_TARGET_LANGUAGE,
} from '@/lib/target-languages'

describe('SUPPORTED_TARGET_LANGUAGES', () => {
  it('contains exactly 7 languages', () => {
    expect(SUPPORTED_TARGET_LANGUAGES).toHaveLength(7)
  })

  const expectedCodes = ['en-US', 'en-GB', 'es-ES', 'it-IT', 'pt-PT', 'fr-FR', 'de-DE']

  it.each(expectedCodes)('%s has all required fields', (code) => {
    const lang = SUPPORTED_TARGET_LANGUAGES.find((l) => l.code === code)
    expect(lang).toBeDefined()
    expect(lang!.code).toBeTypeOf('string')
    expect(lang!.name).toBeTypeOf('string')
    expect(lang!.nameEn).toBeTypeOf('string')
    expect(lang!.flagPath).toMatch(/^\/flags\/[a-zA-Z]+\./)
    expect(lang!.iso639).toMatch(/^[a-z]{2}$/)
  })

  it('every code is unique', () => {
    const codes = SUPPORTED_TARGET_LANGUAGES.map((l) => l.code)
    expect(new Set(codes).size).toBe(codes.length)
  })

  it('flag paths match expected values', () => {
    const paths = SUPPORTED_TARGET_LANGUAGES.map((l) => l.flagPath)
    expect(paths).toContain('/flags/usa.jpg')
    expect(paths).toContain('/flags/uk.jpg')
    expect(paths).toContain('/flags/spain.jpg')
    expect(paths).toContain('/flags/italy.jpg')
    expect(paths).toContain('/flags/portugal.jpg')
    expect(paths).toContain('/flags/france.jpg')
    expect(paths).toContain('/flags/germany.jpg')
  })

  it('iso639 codes map to correct languages', () => {
    const enLangs = SUPPORTED_TARGET_LANGUAGES.filter((l) => l.iso639 === 'en')
    const esLangs = SUPPORTED_TARGET_LANGUAGES.filter((l) => l.iso639 === 'es')
    const itLangs = SUPPORTED_TARGET_LANGUAGES.filter((l) => l.iso639 === 'it')
    const ptLangs = SUPPORTED_TARGET_LANGUAGES.filter((l) => l.iso639 === 'pt')
    const frLangs = SUPPORTED_TARGET_LANGUAGES.filter((l) => l.iso639 === 'fr')
    const deLangs = SUPPORTED_TARGET_LANGUAGES.filter((l) => l.iso639 === 'de')
    expect(enLangs).toHaveLength(2)
    expect(esLangs).toHaveLength(1)
    expect(itLangs).toHaveLength(1)
    expect(ptLangs).toHaveLength(1)
    expect(frLangs).toHaveLength(1)
    expect(deLangs).toHaveLength(1)
  })
})

describe('getLanguageByCode', () => {
  it('returns the correct language for a valid code', () => {
    const lang = getLanguageByCode('es-ES')
    expect(lang).toBeDefined()
    expect(lang!.code).toBe('es-ES')
    expect(lang!.name).toBe('Español')
    expect(lang!.nameEn).toBe('Spanish')
    expect(lang!.iso639).toBe('es')
  })

  it('returns English (UK) for en-GB', () => {
    const lang = getLanguageByCode('en-GB')
    expect(lang).toBeDefined()
    expect(lang!.name).toBe('English (UK)')
  })

  it('returns English (US) for en-US', () => {
    const lang = getLanguageByCode('en-US')
    expect(lang).toBeDefined()
    expect(lang!.name).toBe('English (US)')
  })

  it('returns Italian for it-IT', () => {
    const lang = getLanguageByCode('it-IT')
    expect(lang).toBeDefined()
    expect(lang!.name).toBe('Italiano')
  })

  it('returns Portuguese for pt-PT', () => {
    const lang = getLanguageByCode('pt-PT')
    expect(lang).toBeDefined()
    expect(lang!.name).toBe('Português')
  })

  it('returns French for fr-FR', () => {
    const lang = getLanguageByCode('fr-FR')
    expect(lang).toBeDefined()
    expect(lang!.code).toBe('fr-FR')
    expect(lang!.name).toBe('Français')
    expect(lang!.nameEn).toBe('French')
    expect(lang!.iso639).toBe('fr')
  })

  it('returns German for de-DE', () => {
    const lang = getLanguageByCode('de-DE')
    expect(lang).toBeDefined()
    expect(lang!.code).toBe('de-DE')
    expect(lang!.name).toBe('Deutsch')
    expect(lang!.nameEn).toBe('German')
    expect(lang!.iso639).toBe('de')
  })

  it('returns undefined for an unknown code', () => {
    expect(getLanguageByCode('ja-JP')).toBeUndefined()
    expect(getLanguageByCode('')).toBeUndefined()
  })

  it('matches codes case-insensitively', () => {
    expect(getLanguageByCode('ES-ES')?.code).toBe('es-ES')
    expect(getLanguageByCode('es-es')?.code).toBe('es-ES')
    expect(getLanguageByCode('EN-US')?.code).toBe('en-US')
  })
})

describe('DEFAULT_TARGET_LANGUAGE', () => {
  it('is en-GB', () => {
    expect(DEFAULT_TARGET_LANGUAGE).toBe('en-GB')
  })

  it('is present in SUPPORTED_TARGET_LANGUAGES', () => {
    const lang = getLanguageByCode(DEFAULT_TARGET_LANGUAGE)
    expect(lang).toBeDefined()
  })
})

describe('TargetLanguage interface compliance', () => {
  it('all languages have non-empty nameEn', () => {
    SUPPORTED_TARGET_LANGUAGES.forEach((lang) => {
      expect(lang.nameEn.length).toBeGreaterThan(0)
    })
  })

  it('all languages have non-empty name', () => {
    SUPPORTED_TARGET_LANGUAGES.forEach((lang) => {
      expect(lang.name.length).toBeGreaterThan(0)
    })
  })
})
