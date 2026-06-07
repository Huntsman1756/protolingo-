'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { SUPPORTED_TARGET_LANGUAGES } from '@/lib/target-languages'

interface Props {
  value: string
  onChange: (code: string) => void
  availableCodes: string[]
}

export default function TargetLanguageSelector({
  value,
  onChange,
  availableCodes,
}: Props) {
  const t = useTranslations('targetLanguages')

  const filtered = SUPPORTED_TARGET_LANGUAGES.filter((lang) =>
    availableCodes.includes(lang.code)
  )

  return (
    <div className="grid grid-cols-2 gap-2">
      {filtered.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => onChange(lang.code)}
          className={`flex items-center gap-2 border px-3 py-3 font-mono text-xs tracking-widest uppercase transition-colors ${
            value === lang.code
              ? 'border-fl-accent bg-fl-accent text-fl-accent-fg'
              : 'border-fl-border text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg'
          }`}
        >
          <Image
            src={lang.flagPath}
            alt={lang.code}
            width={20}
            height={16}
            className="object-cover"
          />
          {t(lang.code)}
        </button>
      ))}
    </div>
  )
}
