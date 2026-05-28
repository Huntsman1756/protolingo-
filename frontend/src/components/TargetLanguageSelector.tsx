'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { TARGET_LANGUAGES } from '@/lib/target-languages'

interface Props {
  value: string
  onChange: (code: string) => void
}

export default function TargetLanguageSelector({ value, onChange }: Props) {
  const t = useTranslations('targetLanguages')

  return (
    <div className="flex gap-2">
      {TARGET_LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => onChange(lang.code)}
          className={`flex flex-1 items-center justify-center gap-2 border px-3 py-3 font-mono text-xs tracking-widest uppercase transition-colors ${
            value === lang.code
              ? 'border-fl-accent bg-fl-accent text-fl-accent-fg'
              : 'border-fl-border text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg'
          }`}
        >
          <Image
            src={lang.flag}
            alt={lang.code}
            width={20}
            height={16}
            className="object-cover"
          />
          {t(lang.labelKey)}
        </button>
      ))}
    </div>
  )
}
