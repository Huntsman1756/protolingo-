'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { SUPPORTED_TARGET_LANGUAGES } from '@/lib/target-languages'

interface Spot {
  className: string
  delay: number
  speed: number
}

const SPOTS: Spot[] = [
  { className: 'top-[2%] left-[6%]', delay: 0, speed: 3.0 },
  { className: 'top-[8%] right-[4%]', delay: 0.4, speed: 3.4 },
  { className: 'top-[40%] -left-[5%]', delay: 0.8, speed: 2.8 },
  { className: 'top-[40%] -right-[5%]', delay: 1.2, speed: 3.2 },
  { className: 'bottom-[8%] left-[4%]', delay: 1.6, speed: 2.6 },
  { className: 'bottom-[8%] right-[4%]', delay: 2.0, speed: 3.6 },
  { className: 'bottom-[32%] left-1/2 -translate-x-1/2', delay: 0.5, speed: 3.1 },
]

export function LanguageBubbles() {
  const t = useTranslations('landing')

  return (
    <div className="relative flex items-center justify-center">
      <Image
        src="/logo.png"
        alt="FreeLingo"
        width={95}
        height={95}
        className="opacity-90"
      />

      {SUPPORTED_TARGET_LANGUAGES.map((lang, i) => {
        const spot = SPOTS[i]
        const greeting =
          t(`languageGreetings.${lang.code}`) ?? lang.name
        return (
          <div
            key={lang.code}
            className={`animate-float animate-bubble-in absolute ${spot.className} z-10`}
            style={{
              animationDelay: `${spot.delay}s, ${spot.delay}s`,
              animationDuration: `${spot.speed}s, 0.4s`,
            }}
          >
            <div className="border-fl-border bg-fl-surface flex items-center gap-1.5 rounded-full border px-2.5 py-1 shadow-sm transition-shadow hover:shadow-md">
              <Image
                src={lang.flagPath}
                alt={lang.nameEn}
                width={14}
                height={10}
                className="rounded-[2px]"
              />
              <span className="text-fl-fg whitespace-nowrap font-sans text-[11px] font-medium">
                {greeting}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
