---
description: "Phase 5 specification for FreeLingo: Stripe-backed subscription system with monthly/yearly plans, 7-day trial, Customer Portal, webhook handler, full paywall when STRIPE_ENABLED=true, and zero impact on self-hosted deployments when STRIPE_ENABLED=false."
applyTo: "backend/**, frontend/**, messages/**, docker-compose.yml, .env.example"
---

# Phase 5 — Stripe Subscriptions & Paywall

## Objective

Introduce an optional, fully configurable subscription layer backed by Stripe. When `STRIPE_ENABLED=false` (the default for self-hosted deployments) the entire billing system is invisible — no paywall, no pricing page, no billing UI. When `STRIPE_ENABLED=true` users must have an active subscription (or be in trial) to access any AI-powered feature.

---

## Plans

| Plan | Price | Billing | Trial |
|------|-------|---------|-------|
| Monthly | 14.95 €/month | Monthly recurring | 7 days free (card required) |
| Yearly | 119 €/year (≈ 9.92 €/month, 34% off) | Annual recurring | 7 days free (card required) |

### Quotas applied on subscription activation
| Quota field | Value |
|---|---|
| `conversation_weekly_sessions` | 3 |
| `conversation_weekly_minutes` | 90 |
| `conversation_daily_minutes` | 30 |
| `monthly_tokens_limit` | 1 000 000 |

Admin can still override any quota field per user via the admin panel regardless of subscription status.

---

## Access rules

| Feature | `STRIPE_ENABLED=false` | `STRIPE_ENABLED=true` + active/trialing | `STRIPE_ENABLED=true` + no subscription |
|---|---|---|---|
| Register / Profile / Stats | ✅ | ✅ | ✅ |
| Progress / Streak | ✅ | ✅ | ✅ |
| Lecciones / Assessment / Flashcards | ✅ | ✅ | ❌ Paywall |
| Chat con tutor | ✅ | ✅ | ❌ Paywall |
| Conversación por voz | ✅ | ✅ | ❌ Paywall |
| Study Plan generation | ✅ | ✅ | ❌ Paywall |

**Single rule:** `is_subscribed(user) = True` when `STRIPE_ENABLED=false` OR when `subscription_status in ("trialing", "active")`.

---

## Environment variables

```env
# ── Stripe
# Set STRIPE_ENABLED=true to activate the subscription system.
# When false (default), all billing features are disabled and no paywall is shown.
# Self-hosted deployments should leave this false.
STRIPE_ENABLED=false

# Stripe secret key (sk_live_... or sk_test_... for development)
STRIPE_SECRET_KEY=sk_test_CHANGE_ME

# Webhook signing secret (whsec_...) — obtained from Stripe Dashboard → Webhooks
STRIPE_WEBHOOK_SECRET=whsec_CHANGE_ME

# Price IDs from Stripe Dashboard → Product catalog
STRIPE_PRICE_MONTHLY=price_CHANGE_ME
STRIPE_PRICE_YEARLY=price_CHANGE_ME

# Trial period in days (default 7). Set to 0 to disable trial.
STRIPE_TRIAL_DAYS=7
```

All variables must also be added to `docker-compose.yml` under the `backend` service environment block (with empty/default values so self-hosters see them clearly).

---

## Milestone 1 — Configuration & dependency

### 1.1 `requirements.txt`
Add `stripe>=10.0.0`.

### 1.2 `app/core/config.py`
Add to `Settings`:
```python
STRIPE_ENABLED: bool = False
STRIPE_SECRET_KEY: str = ""
STRIPE_WEBHOOK_SECRET: str = ""
STRIPE_PRICE_MONTHLY: str = ""
STRIPE_PRICE_YEARLY: str = ""
STRIPE_TRIAL_DAYS: int = 7
```

### 1.3 `docker-compose.yml`
Add under `backend.environment`:
```yaml
STRIPE_ENABLED: ${STRIPE_ENABLED:-false}
STRIPE_SECRET_KEY: ${STRIPE_SECRET_KEY:-}
STRIPE_WEBHOOK_SECRET: ${STRIPE_WEBHOOK_SECRET:-}
STRIPE_PRICE_MONTHLY: ${STRIPE_PRICE_MONTHLY:-}
STRIPE_PRICE_YEARLY: ${STRIPE_PRICE_YEARLY:-}
STRIPE_TRIAL_DAYS: ${STRIPE_TRIAL_DAYS:-7}
```

### 1.4 `.env.example`
Add the full block above with comments.

---

## Milestone 2 — Database

### 2.1 `app/models/user.py`
Add three fields (placed after `monthly_tokens_limit`):
```python
stripe_customer_id: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
subscription_status: Mapped[str] = mapped_column(String(20), nullable=False, default="none")
# Values: "none" | "trialing" | "active" | "past_due" | "canceled"
subscription_ends_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
```

### 2.2 Alembic migration `0015_stripe_subscription.py`
```
revision = "0015_stripe_subscription"
down_revision = "0014_monthly_token_quota"
```
Adds:
- `stripe_customer_id VARCHAR(255) NULL`
- `subscription_status VARCHAR(20) NOT NULL DEFAULT 'none'`
- `subscription_ends_at TIMESTAMP NULL`

---

## Milestone 3 — Backend services & endpoints

### 3.1 `app/services/subscription_service.py` (new file)

```python
def is_subscribed(user: User, stripe_enabled: bool) -> bool:
    """Returns True if the user has access to all features."""
    if not stripe_enabled:
        return True
    return user.subscription_status in ("trialing", "active")

async def apply_subscription_quotas(user: User, db: AsyncSession) -> None:
    """Set default quotas when a subscription becomes active."""
    user.conversation_weekly_sessions = 3
    user.conversation_weekly_minutes = 90
    user.conversation_daily_minutes = 30
    user.monthly_tokens_limit = 1_000_000
    await db.commit()
```

### 3.2 `app/core/deps.py`
Add dependency:
```python
async def require_subscription(current_user: User = Depends(get_current_user)) -> User:
    if not is_subscribed(current_user, settings.STRIPE_ENABLED):
        raise HTTPException(status_code=402, detail="subscription_required")
    return current_user
```

### 3.3 `GET /api/config` (new public endpoint, no auth)
Returns runtime flags the frontend needs:
```json
{
  "stripe_enabled": true,
  "stripe_trial_days": 7
}
```
No sensitive keys exposed. Rate limit: 60/minute.

### 3.4 `app/routers/billing.py` (new router, only registered when `STRIPE_ENABLED=true`)

#### `POST /api/billing/checkout`
- Auth required.
- Body: `{ "plan": "monthly" | "yearly" }`
- Creates or retrieves Stripe Customer for the user.
- Creates Stripe Checkout Session with:
  - `mode: "subscription"`
  - `trial_period_days: settings.STRIPE_TRIAL_DAYS`
  - `success_url: {FRONTEND_URL}/billing/success`
  - `cancel_url: {FRONTEND_URL}/billing/canceled`
- Returns `{ "url": "https://checkout.stripe.com/..." }`.
- Rate limit: 10/minute.

#### `POST /api/billing/portal`
- Auth required.
- Creates Stripe Customer Portal Session for the user's `stripe_customer_id`.
- Returns `{ "url": "https://billing.stripe.com/..." }`.
- Returns 400 if user has no `stripe_customer_id`.
- Rate limit: 10/minute.

#### `POST /api/billing/webhook` (no auth — verified by Stripe signature)
- Reads raw request body and verifies with `stripe.WebhookSignature.verify_header()`.
- Returns 400 immediately if signature invalid.
- Handles these events:

| Event | Action |
|---|---|
| `checkout.session.completed` | Set `stripe_customer_id`, `subscription_status = "trialing"` or `"active"`, apply quotas |
| `customer.subscription.updated` | Sync `subscription_status` and `subscription_ends_at` |
| `customer.subscription.deleted` | Set `subscription_status = "canceled"` |
| `invoice.payment_failed` | Set `subscription_status = "past_due"` |

- Always returns HTTP 200 to Stripe (even on handled errors) to prevent retries.
- Rate limit: 200/minute (Stripe can burst).

### 3.5 Apply `require_subscription` to protected endpoints
Add `current_user: User = Depends(require_subscription)` replacing `Depends(get_current_user)` in:
- `POST /api/chat` (chat streaming)
- `WS /api/conversation/ws` (voice conversation)
- `POST /api/lessons/*` (all lesson endpoints)
- `POST /api/assessment/*` (assessment endpoints)
- `POST /api/flashcards/*` (flashcard generation)
- `POST /api/study-plan/*` (study plan generation)

### 3.6 Admin schema updates
Add to `AdminUserResponse`:
```python
stripe_customer_id: Optional[str] = None
subscription_status: str = "none"
subscription_ends_at: Optional[datetime] = None
```

Add to `AdminUserUpdate`:
```python
subscription_status: Optional[Literal["none", "trialing", "active", "past_due", "canceled"]] = None
subscription_ends_at: Optional[datetime] = None
```

Admin can manually override subscription status — useful for `STRIPE_ENABLED=false` deployments that manage access manually.

---

## Milestone 4 — Frontend

### 4.1 App config store
Fetch `GET /api/config` once on app load (in root layout or a dedicated hook). Store `stripeEnabled: boolean` and `stripeTrialDays: number` in a lightweight Zustand slice or React context.

### 4.2 User type
Add to the auth store user type:
```typescript
subscription_status: 'none' | 'trialing' | 'active' | 'past_due' | 'canceled'
subscription_ends_at: string | null
```

Helper:
```typescript
function isSubscribed(user: User, stripeEnabled: boolean): boolean {
  if (!stripeEnabled) return true
  return user.subscription_status === 'trialing' || user.subscription_status === 'active'
}
```

### 4.3 `PaywallBanner` component
Shown in place of protected page content when `stripeEnabled && !isSubscribed`.

- Headline: "Activa tu prueba gratuita de 7 días" (i18n)
- Subtext: brief list of what's included
- Two buttons: "Mensual — 14.95€/mes" and "Anual — 119€/año (ahorra 34%)"
- Each button calls `POST /api/billing/checkout` with the corresponding plan, then `router.push(url)`
- Small link "¿Ya eres suscriptor? Refresca tu sesión" (calls `/api/auth/refresh` to re-sync status)

### 4.4 Apply paywall to protected pages
In each protected page component, check `stripeEnabled && !isSubscribed(user, stripeEnabled)`:
- `/chat` → show `PaywallBanner`
- `/conversation` → show `PaywallBanner`
- `/lessons/[id]` → show `PaywallBanner`
- `/assessment` → show `PaywallBanner`
- `/flashcards` → show `PaywallBanner`
- `/dashboard` (study plan generation) → show `PaywallBanner`

The rest of the page (sidebar, header) remains visible — only the main content area is replaced.

### 4.5 Billing section in Settings/Profile
Only rendered when `stripeEnabled`. Shows:
- Current plan: "Mensual" / "Anual" / "Período de prueba" / "Sin suscripción"
- Status badge: active (green) / trialing (blue) / past_due (amber) / canceled (red)
- Next billing date (from `subscription_ends_at`)
- Button "Gestionar suscripción" → `POST /api/billing/portal` → `router.push(url)`

### 4.6 Pricing section in landing page (`/`)
Only rendered when `stripeEnabled`. Positioned after the features section.

Layout:
```
┌─────────────────────────┐  ┌─────────────────────────┐
│  Mensual                │  │  Anual  ★ Más popular   │
│  14.95 €/mes            │  │  119 €/año              │
│                         │  │  9.92 €/mes             │
│  7 días gratis          │  │  7 días gratis          │
│                         │  │  Ahorra 34%             │
│  ✓ 3 sesiones de voz    │  │  ✓ 3 sesiones de voz    │
│  ✓ 30 min por sesión    │  │  ✓ 30 min por sesión    │
│  ✓ Chat con tutor IA    │  │  ✓ Chat con tutor IA    │
│  ✓ Plan personalizado   │  │  ✓ Plan personalizado   │
│  ✓ Lecciones y          │  │  ✓ Lecciones y          │
│    flashcards           │  │    flashcards           │
│                         │  │                         │
│  [Empezar gratis]       │  │  [Empezar gratis]       │
└─────────────────────────┘  └─────────────────────────┘
         Cancela cuando quieras · Sin permanencia
```

Clicking "Empezar gratis" redirects to `/login` if not authenticated, or calls `/api/billing/checkout` directly if already logged in.

### 4.7 `/billing/success` page
- Shown after successful Stripe Checkout.
- Message: "¡Suscripción activada! Tu período de prueba de 7 días ha comenzado."
- Refreshes auth state (calls `/api/auth/me` or `/api/auth/refresh`).
- Auto-redirects to `/dashboard` after 3 seconds.

### 4.8 `/billing/canceled` page
- Shown if user abandons Stripe Checkout.
- Message: "No se ha realizado ningún cargo."
- Link back to dashboard or pricing section.

---

## Milestone 5 — i18n

Add keys in all 10 locales (`en`, `es`, `de`, `fr`, `it`, `nl`, `pl`, `pt`, `ro`, `ru`) for the following namespaces:

**`billing` namespace (new):**
- `trialHeadline`, `trialSubtext`
- `planMonthly`, `planYearly`, `planMonthlyPrice`, `planYearlyPrice`, `planYearlySavings`
- `featuredPlan`
- `featureSessions`, `featureMinutes`, `featureChat`, `featurePlan`, `featureLessons`
- `ctaStart`, `ctaManage`
- `alreadySubscriber`
- `statusActive`, `statusTrialing`, `statusPastDue`, `statusCanceled`, `statusNone`
- `nextBilling`, `cancelAnytime`
- `successTitle`, `successSubtext`, `canceledTitle`, `canceledSubtext`
- `sectionTitle`, `sectionSubtitle`

---

## Milestone 6 — Testing & docs

### 6.1 Backend tests
- `test_billing.py`: mock Stripe SDK, test checkout session creation, portal session, webhook signature verification, and all 4 webhook events.
- Test that `require_subscription` returns 402 when `STRIPE_ENABLED=true` and user has `subscription_status="none"`.
- Test that `require_subscription` passes through when `STRIPE_ENABLED=false`.

### 6.2 Stripe CLI (local development)
To test webhooks locally:
```bash
stripe listen --forward-to localhost:8000/api/billing/webhook
stripe trigger checkout.session.completed
```

### 6.3 Docs
- `CHANGELOG.md` + `specs/version.md`: version bump
- `specs/api-endpoints.instructions.md`: add 3 new billing endpoints
- `specs/architecture.instructions.md`: add subscription fields to User model section
- `specs/docker.instructions.md`: add Stripe env vars
- `README.md`: add Stripe configuration section
- `AGENTS.md`: update architecture section

---

## Implementation order summary

| # | Task | File(s) |
|---|---|---|
| 1 | Config + env vars | `config.py`, `.env.example`, `docker-compose.yml` |
| 2 | `requirements.txt` | `requirements.txt` |
| 3 | User model fields | `models/user.py` |
| 4 | Alembic migration 0015 | `alembic/versions/0015_stripe_subscription.py` |
| 5 | `subscription_service.py` | `services/subscription_service.py` |
| 6 | `require_subscription` dep | `core/deps.py` |
| 7 | `GET /api/config` | `routers/config.py` (new) |
| 8 | `POST /api/billing/checkout` | `routers/billing.py` |
| 9 | `POST /api/billing/portal` | `routers/billing.py` |
| 10 | `POST /api/billing/webhook` | `routers/billing.py` |
| 11 | Apply `require_subscription` | `routers/chat.py`, `conversation.py`, `lessons.py`, `assessment.py`, `flashcards.py`, `study_plan.py` |
| 12 | Admin schema update | `schemas/admin.py`, `routers/admin.py` |
| 13 | Frontend config store | `store/config.ts` |
| 14 | User type update | `store/auth.ts` |
| 15 | `PaywallBanner` component | `components/billing/PaywallBanner.tsx` |
| 16 | Paywall in protected pages | 6 page files |
| 17 | Billing section in settings | `app/(app)/settings/page.tsx` |
| 18 | Pricing section in landing | `app/(public)/page.tsx` |
| 19 | `/billing/success` page | `app/(public)/billing/success/page.tsx` |
| 20 | `/billing/canceled` page | `app/(public)/billing/canceled/page.tsx` |
| 21 | i18n keys (10 locales) | `messages/*.json` |
| 22 | Tests | `tests/test_billing.py` |
| 23 | Docs + version bump | Various |