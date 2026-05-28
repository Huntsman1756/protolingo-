'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel,
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const tCommon = useTranslations('common')
  // Close on Escape
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(2px)',
      }}
      onClick={onCancel}
    >
      <div
        className="border-fl-border bg-fl-surface w-full max-w-sm border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-fl-border flex items-center gap-2 border-b px-6 py-4">
          <span
            className={`text-fl-label ${danger ? 'text-fl-error-fg' : 'text-fl-muted-2'}`}
          >
            ●
          </span>
          <span className="text-fl-label text-fl-muted-2 font-mono tracking-widest uppercase">
            {title}
          </span>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p className="text-fl-muted-0 font-mono text-xs leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 px-6 pb-6">
          <button
            onClick={onCancel}
            className="border-fl-border text-fl-label text-fl-muted-2 hover:border-fl-border-2 hover:text-fl-fg flex-1 border py-3 font-mono font-bold tracking-widest uppercase transition-colors"
          >
            — {cancelLabel ?? tCommon('cancel')}
          </button>
          <button
            onClick={onConfirm}
            className={`text-fl-label flex-1 py-3 font-mono font-bold tracking-widest uppercase transition-colors ${
              danger
                ? 'bg-fl-error text-fl-fg-bright hover:bg-fl-error-hover'
                : 'bg-fl-fg text-fl-bg hover:bg-fl-fg-bright'
            }`}
          >
            — {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
