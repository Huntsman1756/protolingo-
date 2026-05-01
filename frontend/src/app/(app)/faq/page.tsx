'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FAQItem {
  q: string
  a: React.ReactNode
}

const faqs: FAQItem[] = [
  {
    q: 'Where do I start?',
    a: (
      <>
        Start with the <strong className="text-fl-fg">Assessment</strong>. It detects your English level (A1–C2)
        and your strengths and weaknesses. With that result you can generate a personalized{' '}
        <strong className="text-fl-fg">Study Plan</strong> that fills your Dashboard with daily lessons. Without
        the Assessment, the Dashboard is empty.
      </>
    ),
  },
  {
    q: 'What is the full workflow?',
    a: (
      <ol className="list-none space-y-1">
        {[
          'Register and select your native language',
          'Take the Assessment → your CEFR level is detected',
          'Generate your Study Plan from the Dashboard',
          'Complete your daily lessons (START button in the Dashboard)',
          'Use Flashcards to train vocabulary in parallel',
          'Practice free conversation with the AI Tutor',
        ].map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="font-mono text-[10px] text-fl-muted-4 mt-0.5 shrink-0">{i + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    q: 'What language will I learn?',
    a: 'English only, for now. The native language you choose at registration is used exclusively for flashcard translations and tutor feedback — it does not change the target language.',
  },
  {
    q: 'What is the Assessment?',
    a: 'A 20-question AI-generated test covering grammar, vocabulary, reading comprehension, and sentence transformation, with difficulty ranging from A1 to C1. When you finish, you get your CEFR level, a score, and an analysis of your strengths and weaknesses. This result feeds into the Study Plan and generated Flashcards.',
  },
  {
    q: 'What is the Study Plan and how do I generate one?',
    a: (
      <>
        After the Assessment, go to the Dashboard and click{' '}
        <strong className="text-fl-fg">Take Assessment →</strong> to get your level first. Once you have a level,
        you can generate a week-by-week plan with daily lessons tailored to your CEFR level and goals. Each lesson
        includes multiple-choice and free-writing exercises evaluated by AI.
      </>
    ),
  },
  {
    q: 'What are Flashcards for?',
    a: (
      <>
        A vocabulary training system using the <strong className="text-fl-fg">SM-2</strong> spaced repetition
        algorithm. Generate cards on any topic (e.g. &quot;business&quot;, &quot;phrasal verbs&quot;, &quot;food&quot;)
        with a definition, example sentence, and translation into your native language. The system calculates when to
        show each card again just before you forget it. Completely independent from the Study Plan.
      </>
    ),
  },
  {
    q: 'How does the AI Tutor work?',
    a: 'A free-form streaming chat. The tutor knows your CEFR level and weak points to tailor its responses. Ask grammar questions, request explanations, practice writing in English, or just have a conversation. The chat history is preserved for the current session.',
  },
  {
    q: 'Which AI providers does FreeLingo support?',
    a: (
      <>
        Configurable in <code className="text-fl-fg bg-fl-surface-2 px-1">.env</code> via{' '}
        <code className="text-fl-fg bg-fl-surface-2 px-1">LLM_PROVIDER</code>:
        <ul className="mt-2 space-y-1 list-none">
          {[
            ['ollama', 'Local, free. Requires Ollama running on the host. Recommended model: gemma3:12b. May be slow without a GPU.'],
            ['openai', 'OpenAI API (GPT-4o, etc.). Fast and reliable. Requires OPENAI_API_KEY.'],
            ['anthropic', 'Anthropic Claude. Requires ANTHROPIC_API_KEY.'],
            ['deepseek', 'DeepSeek API. Requires DEEPSEEK_API_KEY.'],
          ].map(([name, desc]) => (
            <li key={name} className="flex items-start gap-2">
              <code className="text-fl-muted-1 shrink-0">{name}</code>
              <span className="text-fl-muted-2">— {desc}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    q: 'Can I invite other people?',
    a: (
      <>
        Yes. From <Link href="/admin/users" className="text-fl-fg underline underline-offset-2">Admin → Users</Link>{' '}
        the admin can create users directly or generate single-use invite links that expire in 48 hours. Public
        registration is disabled by default (<code className="text-fl-fg bg-fl-surface-2 px-1">ALLOW_REGISTRATION=false</code>).
      </>
    ),
  },
  {
    q: 'How do I change my password or native language?',
    a: (
      <>
        Go to <Link href="/settings" className="text-fl-fg underline underline-offset-2">Settings</Link>. You can
        update your display name, native language, and password from there.
      </>
    ),
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-fl-border">
        <p className="font-mono text-[10px] tracking-widest text-fl-muted-2 uppercase mb-1">Help</p>
        <h1 className="font-mono text-2xl font-bold tracking-tight text-fl-fg">Frequently Asked Questions</h1>
      </div>

      {/* Accordion */}
      <div className="border border-fl-border">
        {faqs.map((item, i) => (
          <div key={i} className={i < faqs.length - 1 ? 'border-b border-fl-border' : ''}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-fl-surface transition-colors"
            >
              <span className="font-mono text-xs text-fl-fg tracking-wide pr-4">{item.q}</span>
              <span className="font-mono text-fl-muted-2 text-sm shrink-0">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <div className="px-5 pb-5 font-mono text-xs text-fl-muted-1 leading-relaxed border-t border-fl-border pt-4 bg-fl-bg-alt">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
