import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface Props {
  role: 'user' | 'assistant'
  text: string
  streaming?: boolean
  speaking?: boolean
  userAvatar?: string | null
  userInitial?: string
}

export default function TranscriptBubble({ role, text, streaming = false, speaking = false, userAvatar, userInitial }: Props) {
  const t = useTranslations('conversation')
  const isUser = role === 'user'

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className="relative flex-shrink-0 mb-0.5">
        {speaking && (
          <span className="absolute inset-[-4px] rounded-full border-2 border-fl-accent/60 animate-pulse pointer-events-none" />
        )}
        <div className="w-7 h-7 rounded-full overflow-hidden border border-fl-border">
          {!isUser ? (
            <Image src="/logo.png" alt="Tutor" width={28} height={28} className="w-full h-full object-cover" />
          ) : userAvatar ? (
            <Image src={userAvatar} alt="" width={28} height={28} className="w-full h-full object-cover" unoptimized />
          ) : (
            <div className="w-full h-full bg-fl-surface-2 flex items-center justify-center">
              <span className="font-mono text-fl-hint text-fl-muted-1 select-none">
                {(userInitial ?? '?').toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className={`max-w-[75%] flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
        <span className="font-mono text-fl-label tracking-widest text-fl-muted-4 uppercase">
          {isUser ? t('you') : t('assistant')}
        </span>
        <div
          className={`px-4 py-3 font-mono text-sm leading-relaxed border ${isUser
            ? 'bg-fl-accent text-fl-accent-fg border-fl-accent'
            : 'bg-fl-surface text-fl-fg border-fl-border'
            }`}
        >
          {text}
          {streaming && (
            <span className="inline-block w-1 h-3 ml-1 bg-current animate-pulse align-middle" />
          )}
        </div>
      </div>
    </div>
  )
}
