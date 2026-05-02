import { useTranslations } from 'next-intl'

interface Props {
  role: 'user' | 'assistant'
  text: string
  streaming?: boolean
}

export default function TranscriptBubble({ role, text, streaming = false }: Props) {
  const t = useTranslations('conversation')
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <span className="font-mono text-fl-label tracking-widest text-fl-muted-4 uppercase">
          {isUser ? t('you') : t('assistant')}
        </span>
        <div
          className={`px-4 py-3 font-mono text-sm leading-relaxed border ${
            isUser
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
