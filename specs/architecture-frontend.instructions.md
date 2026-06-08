---
description: "Frontend architecture reference for FreeLingo: directory structure, pages, components, state management, utilities, code standards, page content width convention, and test configuration."
applyTo: "frontend/**"
---

# Architecture — Frontend

> The general architecture overview (repository structure, data flows, auth design) lives in [architecture.instructions.md](architecture.instructions.md). Backend-specific architecture lives in [architecture-backend.instructions.md](architecture-backend.instructions.md).

## Directory structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Public routes (7 pages)
│   │   │   ├── billing/         # Stripe-managed billing (redirect)
│   │   │   ├── forgot-password/
│   │   │   ├── login/
│   │   │   ├── onboarding/      # Post-registration language + level setup
│   │   │   ├── register/
│   │   │   ├── reset-password/
│   │   │   └── verify-email/
│   │   │
│   │   ├── (app)/               # Authenticated routes — sidebar layout (17 pages)
│   │   │   ├── layout.tsx       # Sidebar + global layout shell
│   │   │   ├── loading.tsx
│   │   │   ├── admin/users/     # User management (admin only)
│   │   │   ├── admin/feedback/  # Feedback board admin panel (admin only)
│   │   │   ├── assessment/      # Level test: BeginnerGate → AdaptiveQuizCard → DurationSelector
│   │   │   ├── chat/            # AI tutor SSE chat + conversation history
│   │   │   ├── conversation/    # Real-time voice conversation (WebSocket + VAD)
│   │   │   ├── dashboard/       # Home: XP, streak, plan summary, language selector
│   │   │   ├── faq/             # Frequently asked questions
│   │   │   ├── feedback/        # Feature requests & bug reports board
│   │   │   ├── flashcards/      # Spaced-repetition flashcard review
│   │   │   ├── grammar/         # Grammar reference (index + [slug] detail)
│   │   │   ├── lesson/[id]/     # Lesson player with exercises
│   │   │   ├── listening/       # AI-generated listening exercises
│   │   │   ├── phrasebook/      # Common phrases by category
│   │   │   ├── plan/            # Study plan overview + unit drawer
│   │   │   ├── progress/        # Skills tracker with radar chart
│   │   │   ├── reading/         # AI-generated reading comprehension
│   │   │   ├── settings/        # Profile, avatar, subscription, conversation config
│   │   │   └── vocabulary/      # Vocabulary hub (index + [setId] detail)
│   │   │
│   │   ├── (legal)/             # Minimal layout (2 pages)
│   │   │   ├── layout.tsx
│   │   │   ├── privacy/
│   │   │   └── terms/
│   │   │
│   │   └── api/                 # Next.js Route Handlers (proxies to backend)
│   │       ├── chat/route.ts    # SSE chat streaming proxy
│   │       ├── stt/route.ts     # STT proxy
│   │       └── tts/route.ts     # TTS proxy
│   │
│   ├── components/              # 11 directories + 4 standalone files
│   │   ├── assessment/          # AdaptiveQuizCard, BeginnerGate, DurationSelector
│   │   ├── billing/             # Stripe subscription UI components
│   │   ├── chat/                # Chat message components
│   │   ├── conversation/        # ConversationMode, MicButton, StatusIndicator, TranscriptBubble...
│   │   ├── flashcard/           # Flashcard review components
│   │   ├── lesson/              # Lesson exercise components
│   │   ├── plan/                # LevelTestBanner, UnitCard, UnitDrawer
│   │   ├── settings/            # Settings form components
│   │   ├── tour/                # OnboardingTour components
│   │   ├── ui/                  # shadcn/ui + custom: AudioPlayer, VoiceRecorder, confirm-dialog...
│   │   ├── whats-new/           # What's New changelog modal
│   │   ├── CookieBanner.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── TargetLanguageSelector.tsx
│   │   └── ThemeProvider.tsx
│   │
│   ├── data/                    # Static content: curriculum, grammar, phrasebook — vocabulary + assessment now in backend
│   │   ├── types.ts              # Shared TypeScript types (CEFRLevel, AssessmentQuestion, VocabularyEntry, VocabularySet, etc.)
│   │   ├── curriculum.ts         # Curriculum definitions — language-aware dispatcher (API-backed)
│   │   ├── grammar.ts            # Grammar reference — language-aware dispatcher
│   │   ├── phrasebook.ts         # Phrasebook — language-aware dispatcher
│   │   ├── en/                   # English (3 files: curriculum, grammar, phrasebook)
│   │   ├── es/                   # Spanish (3 files)
│   │   ├── it/                   # Italian (3 files)
│   │   └── pt/                   # Portuguese (3 files)
│   │
│   ├── store/                   # Zustand stores (6)
│   │   ├── auth.ts              # Access token, user info, login/refresh/logout
│   │   ├── config.ts            # Public config: maintenance mode, feature flags, languages
│   │   ├── language.ts          # UI locale + target language state
│   │   ├── loading.ts           # Global loading spinner state
│   │   ├── progress.ts          # XP, streak, skill scores, dashboard data
│   │   └── theme.ts             # Dark/light/system theme
│   │
│   ├── lib/                     # Utility modules (7)
│   │   ├── api.ts               # apiFetch: auth interceptor, 401 → silent refresh → retry
│   │   ├── audio.ts             # Audio player, audio queue, gapless playback helpers
│   │   ├── conversation-ws.ts   # WebSocket client for voice conversation
│   │   ├── locales.ts           # Locale utilities for next-intl
│   │   ├── mappers.ts           # Data transformation / mapping utilities
│   │   ├── target-languages.ts  # Target language definitions and helpers
│   │   └── utils.ts             # General utility functions
│   │
│   ├── i18n/
│   │   └── request.ts           # next-intl request locale resolver
│   │
│   └── middleware.ts            # Auth guard (redirect to /login) + locale detection
│
├── tests/                       # Vitest suite
│   ├── setup.ts                 # Global mocks: localStorage, next/navigation, next-intl
│   ├── middleware.test.ts
│   ├── components/
│   │   ├── LanguageSwitcher.test.tsx
│   │   └── TargetLanguageSelector.test.tsx
│   ├── data/
│   │   └── curriculum.test.ts
│   ├── lib/
│   │   ├── api.test.ts
│   │   ├── audio.test.ts
│   │   ├── conversation-ws.test.ts
│   │   ├── mappers.test.ts
│   │   └── target-languages.test.ts
│   └── store/
│       ├── auth.test.ts
│       ├── config.test.ts
│       └── language.test.ts
│
├── public/                      # Static assets
│   ├── apple-touch-icon.png
│   ├── favicon.ico
│   ├── favicon.png
│   ├── github.svg
│   ├── github_white.svg
│   ├── logo.png
│   ├── og-image.png
│   ├── flags/                   # Language flag SVGs
│   └── vad/                     # Silero VAD ONNX models for browser WASM
│
├── messages/                    # i18n message bundles (en, es, fr, pt, de, it, nl, pl, ro, ru)
│   ├── en.json
│   ├── es.json
│   └── ...
│
└── scripts/
    └── copy-vad-models.js       # Postinstall: copies VAD WASM models to public/
```

## Page routes

### Public (auth) routes — `(auth)/`

| Route | Description |
|-------|-------------|
| `/login` | Email + password login |
| `/register` | Registration form with native/target language selection |
| `/onboarding` | Post-registration: language preferences + level setup |
| `/verify-email` | Email verification token handler |
| `/forgot-password` | Request password reset email |
| `/reset-password` | Reset password with token |
| `/billing` | Stripe Customer Portal redirect (managed by Stripe) |

### Authenticated routes — `(app)/`

| Route | Description |
|-------|-------------|
| `/dashboard` | Home: XP counter, streak, next lesson card, target language selector |
| `/assessment` | Level placement test (BeginnerGate → AdaptiveQuiz → DurationSelector) |
| `/plan` | Study plan overview: unit cards, LevelTestBanner, UnitDrawer |
| `/lesson/[id]` | Lesson player: content + interactive exercises |
| `/chat` | AI tutor text chat with SSE streaming |
| `/conversation` | Real-time voice conversation with WebSocket + VAD |
| `/flashcards` | Spaced-repetition flashcard review |
| `/grammar` | Grammar reference index |
| `/grammar/[slug]` | Grammar topic detail page |
| `/vocabulary` | Vocabulary hub overview |
| `/vocabulary/[setId]` | Vocabulary set detail |
| `/phrasebook` | Common phrases by category |
| `/listening` | AI-generated listening comprehension exercises |
| `/reading` | AI-generated reading comprehension exercises |
| `/progress` | Skills tracker with radar chart |
| `/settings` | Profile, avatar, subscription, conversation settings |
| `/faq` | Frequently asked questions |
| `/feedback` | Feature requests and bug reports board (community) |
| `/admin/users` | User management (admin only) |
| `/admin/feedback` | Feedback board admin panel (admin only) |

### Legal routes — `(legal)/`

| Route | Description |
|-------|-------------|
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

### API route handlers

These are Next.js Route Handlers that proxy requests to the backend:

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/chat` | POST | SSE chat streaming proxy |
| `/api/tts` | POST | Text-to-speech proxy |
| `/api/stt` | POST | Speech-to-text proxy |

## State management (Zustand)

Six Zustand stores hold all client-side state. No React Context is used for global state.

| Store | Persisted? | Key state |
|-------|-----------|-----------|
| `auth` | No (JS memory) | `accessToken`, `user`, `isAuthenticated`, `login()`, `refresh()`, `logout()` |
| `config` | No | `maintenanceMode`, `availableLanguages`, `stripeEnabled`, feature flags from `GET /api/config` |
| `language` | Yes (localStorage) | `targetLanguage` (BCP-47), `uiLocale`, language switcher state |
| `loading` | No | `isLoading`, `startLoading()`, `stopLoading()` — global spinner control |
| `progress` | No | `xp`, `streak`, `skillScores`, `planSummary` — fetched from backend |
| `theme` | Yes (localStorage) | `"light"` / `"dark"` / `"system"` |

## Utility modules (`lib/`)

| Module | Purpose |
|--------|---------|
| `api.ts` | Fetch wrapper with auth interceptor: injects `Authorization` header, catches 401 → silent refresh → retry, redirects to `/login` on refresh failure |
| `audio.ts` | Audio playback queue with gapless scheduling for voice conversation |
| `conversation-ws.ts` | WebSocket client for the voice conversation pipeline, handles WAV chunk sending and MP3 reception |
| `locales.ts` | next-intl locale detection and routing utilities |
| `mappers.ts` | Data transformation helpers between API responses and frontend models |
| `target-languages.ts` | Target language definitions: BCP-47 codes, display names, flag mappings, voice settings per language |
| `utils.ts` | General-purpose utilities: formatting, date helpers, class name merging |

## Components overview

### Page-specific components

| Directory | Key components |
|----------|---------------|
| `assessment/` | `AdaptiveQuizCard`, `BeginnerGate`, `DurationSelector` |
| `billing/` | Stripe subscription management UI |
| `chat/` | Message display, input, SSE stream handling |
| `conversation/` | `ConversationMode`, `MicButton`, `StatusIndicator`, `TranscriptBubble`, VAD integration |
| `flashcard/` | Flashcard flip animation, SM-2 rating buttons |
| `lesson/` | Exercise renderers (multiple choice, fill-in-blank, listening, reading) |
| `plan/` | `LevelTestBanner`, `UnitCard`, `UnitDrawer` |
| `settings/` | Profile form, avatar upload, conversation preferences |
| `tour/` | `OnboardingTour` step-by-step walkthrough |
| `whats-new/` | Version-aware changelog overlay modal |

### Shared/generic components

| Component | Purpose |
|-----------|---------|
| `ThemeProvider.tsx` | Dark/light/system theme via `next-themes` |
| `TargetLanguageSelector.tsx` | Language picker dropdown with flags |
| `LanguageSwitcher.tsx` | UI locale switcher |
| `CookieBanner.tsx` | GDPR cookie consent banner |
| `ui/` | shadcn/ui primitives (`button`, `card`, `input`, `progress`, `badge`, `separator`, `sheet`, `tabs`) + custom: `AudioPlayer`, `VoiceRecorder`, `confirm-dialog` |

---

## Code standards (TypeScript / Next.js 16)

| Tool | Purpose |
|------|---------|
| ESLint | TypeScript linting + Next.js rules |
| Prettier | Code formatting + `prettier-plugin-tailwindcss` |

- No semicolons, single quotes, 2-space tabs, trailing commas "es5".
- shadcn/ui components installed: `button card input progress badge separator sheet tabs`.

### Page content width convention

Every page wrapper uses `mx-auto` plus one of three canonical widths. Do not use other sizes:

| Class | Width | Use for |
|-------|-------|---------|
| `max-w-4xl` | 896 px | Index/overview pages with grids or card layouts (dashboard, grammar, vocabulary, phrasebook, progress) |
| `max-w-3xl` | 768 px | Admin list pages (admin/users, admin/feedback) |
| `max-w-2xl` | 672 px | Detail pages, forms, long-form content (lesson, grammar detail, settings, feedback, flashcards, faq, plan) |

Full-screen interactive experiences (conversation, chat, listening, reading, assessment) are exempt — they manage their own layout internally.

---

## State flow — Auth interceptor

```
Any fetch via apiFetch()
    ↓
Add Authorization: Bearer <accessToken>
    ↓
Request succeeds? → return response
    ↓ 401 received
Silent call to POST /api/auth/refresh
    ↓
Refresh succeeds? → store new accessToken, retry original request
    ↓
Refresh fails? → clear auth store, redirect to /login
```

---

## State flow — SSE chat streaming

```
User sends message → POST /api/chat (SSE proxy)
    ↓
Next.js Route Handler forwards to backend SSE endpoint
    ↓
Backend: LLM Adapter streams tokens → SSE events
    ↓
Frontend receives SSE events:
  - token events → append to message accumulator
  - done event → finalize message, add to ChatHistory
  - error event → show error, stop streaming
```

---

## State flow — WebSocket voice conversation

```
User opens /conversation → load VAD WASM models
    ↓
WebSocket connects: new WebSocket(`ws://backend/ws/conversation?token=<jwt>`)
    ↓
VAD detects speech → send WAV chunks via WS
    ↓
Server: STT → LLM stream → sentence splitting → TTS
    ↓
Receive MP3 chunks via WS → AudioQueue schedules gapless playback
    ↓
Barge-in: VAD detects new speech → cancel current generation, send new WAV
```

## Tests

Testing infrastructure and strategy are documented in [testing.instructions.md](testing.instructions.md).

**Summary:**
- **Framework**: Vitest with jsdom environment
- **Test files**: 12 (plus setup.ts) covering critical logic only
- **Setup**: Global mocks for `localStorage`, `next/navigation`, `next-intl`
- **Coverage areas**: API fetch interceptor, auth store, audio queue, conversation WebSocket, target language utilities, mapper functions, middleware, component rendering