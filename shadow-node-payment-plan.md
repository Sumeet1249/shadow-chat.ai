 # Shadow Node — Payment Setup Plan (Separate Module)

> This plan is intentionally separate from the core app migration plan.
> Build and ship the core app first. Add this module when ready to monetise.

---

## Dependency Cost Confirmation — Core App Plan

Every single dependency in the main migration plan is 100% free:

| Package | License | Cost |
|---------|---------|------|
| vite | MIT | Free forever |
| react / react-dom | MIT | Free forever |
| typescript | Apache 2.0 | Free forever |
| react-router-dom | MIT | Free forever |
| framer-motion | MIT | Free forever |
| zustand | MIT | Free forever |
| @tanstack/react-query | MIT | Free forever |
| lucide-react | ISC | Free forever |
| tailwindcss | MIT | Free forever |
| clsx | MIT | Free forever |
| tailwind-merge | MIT | Free forever |
| axios | MIT | Free forever |
| recharts | MIT | Free forever |
| vitest | MIT | Free forever |
| @testing-library/react | MIT | Free forever |
| eslint + prettier + husky | MIT | Free forever |

**You pay nothing to install, run, develop, or deploy any of these.**
The only costs that ever apply to open-source MIT packages are if
you use a paid hosting platform — the packages themselves are always free.

---

## Payment Module Overview

This module adds three things to the app:
1. A **Pricing page** (`/pricing`) — plan comparison UI
2. A **Checkout flow** — user selects plan, pays, gets upgraded
3. A **Subscription management section** in AccountQuota — view plan, cancel, change

### Payment Processor Choice: Stripe

Stripe is the industry standard. Here is why it fits this project:

| Factor | Detail |
|--------|--------|
| SDK cost | Free — MIT licensed client library |
| Setup fee | None |
| Monthly fee | None |
| Transaction fee | 2.9% + $0.30 per successful charge (only when you earn money) |
| Dashboard | Free — manage subscriptions, refunds, customers |
| Test mode | Fully free — unlimited test transactions with fake cards |
| Webhooks | Free |
| Documentation | Excellent |

You pay Stripe nothing until a real customer pays you.

---

## Payment Stack — All Free

```
Payment Processor:   Stripe (free SDK, % per transaction only)
Frontend SDK:        @stripe/stripe-js        — free, MIT
React Components:    @stripe/react-stripe-js  — free, MIT
Backend (required):  Your own server (Node/Express or any backend)
                     — Stripe keys must NEVER be in frontend code
Webhook handling:    Stripe CLI (free dev tool) for local testing
```

### Install (frontend additions only)

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

Both packages are free, MIT licensed, maintained by Stripe.

---

## New Files — Payment Module

These files are added on top of the existing structure.
Nothing in the core app is modified.

```
src/
├── pages/
│   └── public/
│       └── Pricing.tsx              # Restored — plan comparison page
│
├── pages/
│   └── app/
│       └── AccountQuota.tsx         # Add subscription section (existing file)
│
├── payments/
│   ├── StripeProvider.tsx           # Wraps checkout routes with <Elements>
│   ├── CheckoutPage.tsx             # /checkout — payment form
│   ├── CheckoutSuccess.tsx          # /checkout/success — post-payment confirmation
│   ├── CheckoutCancel.tsx           # /checkout/cancel — user backed out
│   ├── PlanCard.tsx                 # Reusable plan tier card component
│   └── useSubscription.ts          # Hook — reads current plan from auth store
│
└── data/
    └── plans.ts                     # Plan definitions (name, price, features)
```

---

## New Routes Added to Router

```
/pricing                → Pricing          (public — no auth required)
/checkout               → CheckoutPage     (ProtectedRoute)
/checkout/success       → CheckoutSuccess  (ProtectedRoute)
/checkout/cancel        → CheckoutCancel   (ProtectedRoute)
```

---

## Phase P1 — Pricing Page

### File: `src/pages/public/Pricing.tsx`

Three plan tiers displayed as GlassCard components.
Uses the existing design system — no new components needed.

**Plan definitions in `src/data/plans.ts`:**
```ts
export const PLANS = [
  {
    id: 'free',
    name: 'Ghost',
    price: 0,
    period: 'forever',
    stripeProductId: null,           // No Stripe product for free tier
    stripePriceId: null,
    features: [
      '3 active personas',
      '500 generations/month',
      '2 node connections',
      'Shadow Archive (7 days)',
      'Community support',
    ],
    highlight: false,
    chipVariant: 'default',
  },
  {
    id: 'pro',
    name: 'Phantom',
    price: 29,
    period: 'month',
    stripeProductId: 'prod_xxx',     // From your Stripe dashboard
    stripePriceId: 'price_xxx',      // Monthly price ID from Stripe dashboard
    features: [
      'Unlimited personas',
      '10,000 generations/month',
      '10 node connections',
      'Shadow Archive (90 days)',
      'Neural Reply + Arena access',
      'Priority support',
    ],
    highlight: true,
    chipVariant: 'cyan',
  },
  {
    id: 'shadow',
    name: 'Wraith',
    price: 99,
    period: 'month',
    stripeProductId: 'prod_yyy',
    stripePriceId: 'price_yyy',
    features: [
      'Everything in Phantom',
      'Unlimited generations',
      'Unlimited nodes',
      'Shadow Archive (forever)',
      'Live Audio access',
      'Global Telemetry',
      'Dedicated support',
    ],
    highlight: false,
    chipVariant: 'violet',
  },
]
```

**`PlanCard.tsx`** — Renders a single plan using existing GlassCard + Chip + Button primitives:
```tsx
interface PlanCardProps {
  plan: Plan
  isCurrentPlan: boolean
  onSelect: (plan: Plan) => void
}

export function PlanCard({ plan, isCurrentPlan, onSelect }: PlanCardProps) {
  return (
    <GlassCard variant={plan.highlight ? 'elevated' : 'default'} className="relative">
      {plan.highlight && (
        <Chip variant="cyan" className="absolute -top-3 left-1/2 -translate-x-1/2">
          MOST POPULAR
        </Chip>
      )}
      <Chip variant={plan.chipVariant}>{plan.name}</Chip>
      <div className="h-xl mt-4">
        {plan.price === 0 ? 'Free' : `$${plan.price}`}
        {plan.price > 0 && <span className="txt-2 text-sm">/{plan.period}</span>}
      </div>
      <ul className="mt-4 space-y-2">
        {plan.features.map(f => (
          <li key={f} className="flex items-center gap-2 txt-2 text-sm">
            <Icon name="Check" size={14} color="var(--green)" />
            {f}
          </li>
        ))}
      </ul>
      <Button
        variant={plan.highlight ? 'primary' : 'ghost'}
        className="w-full mt-6"
        disabled={isCurrentPlan}
        onClick={() => !isCurrentPlan && plan.price > 0 && onSelect(plan)}
      >
        {isCurrentPlan ? 'Current Plan' : plan.price === 0 ? 'Get Started' : 'Upgrade'}
      </Button>
    </GlassCard>
  )
}
```

**`Pricing.tsx`** — The full page:
```tsx
export default function Pricing() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  function handleSelectPlan(plan: Plan) {
    if (!user) {
      navigate('/register')    // Prompt sign-up first
      return
    }
    navigate('/checkout', { state: { plan } })
  }

  return (
    <div className="min-h-screen bg-void">
      <PublicNav />
      <AmbientOrbs orbs={PRICING_ORBS} />
      <section className="hero text-center">
        <Chip variant="violet">Pricing</Chip>
        <h1 className="h-xl mt-4">Choose Your Tier</h1>
        <p className="txt-2 mt-2">No hidden fees. Cancel anytime.</p>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6 pb-24">
        {PLANS.map(plan => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isCurrentPlan={user?.plan === plan.id}
            onSelect={handleSelectPlan}
          />
        ))}
      </div>
    </div>
  )
}
```

---

## Phase P2 — Checkout Flow

### How Stripe Checkout Works (Secure Pattern)

```
User clicks Upgrade
       ↓
Frontend calls YOUR backend: POST /api/checkout/create-session
(sends: priceId, userId)
       ↓
Your backend calls Stripe API (using SECRET key — never in frontend)
Stripe returns a sessionId
       ↓
Frontend receives sessionId
       ↓
Frontend calls stripe.redirectToCheckout({ sessionId })
       ↓
User is on Stripe's hosted payment page (Stripe handles card data — you never touch it)
       ↓
Payment succeeds → Stripe redirects to /checkout/success
Payment cancelled → Stripe redirects to /checkout/cancel
       ↓
Stripe sends webhook to your backend: checkout.session.completed
       ↓
Your backend updates user's plan in your database
```

**Why this pattern:** Your frontend never sees card numbers. Your Stripe secret key never leaves your server. This is PCI compliant by design.

### File: `src/payments/CheckoutPage.tsx`

```tsx
export default function CheckoutPage() {
  const location = useLocation()
  const plan: Plan = location.state?.plan
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout() {
    if (!plan?.stripePriceId) return
    setLoading(true)
    setError(null)

    try {
      // Call YOUR backend — not Stripe directly
      const res = await api.post('/checkout/create-session', {
        priceId: plan.stripePriceId,
      })
      const { sessionId } = res.data

      // Load Stripe and redirect to hosted payment page
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
      await stripe?.redirectToCheckout({ sessionId })
    } catch {
      setError('Could not start checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!plan) return <Navigate to="/pricing" replace />

  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      <GlassCard variant="elevated" className="max-w-md w-full">
        <Chip variant={plan.chipVariant}>{plan.name} Plan</Chip>
        <p className="txt-2 mt-4 text-sm">
          You're about to upgrade to <strong>{plan.name}</strong> at
          ${plan.price}/{plan.period}. You'll be taken to a secure
          Stripe payment page.
        </p>
        {error && (
          <p className="text-red-400 text-sm mt-3" role="alert">{error}</p>
        )}
        <div className="flex gap-3 mt-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button variant="primary" loading={loading} onClick={handleCheckout}>
            Continue to Payment
          </Button>
        </div>
        <p className="txt-2 text-xs mt-4 flex items-center gap-1">
          <Icon name="Lock" size={12} />
          Payments secured by Stripe. We never see your card details.
        </p>
      </GlassCard>
    </div>
  )
}
```

### File: `src/payments/CheckoutSuccess.tsx`

```tsx
export default function CheckoutSuccess() {
  const navigate = useNavigate()
  const { checkSession } = useAuthStore()

  useEffect(() => {
    // Re-fetch user session so plan update from webhook is reflected
    checkSession()
  }, [])

  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      <GlassCard variant="elevated" className="max-w-md w-full text-center">
        <Icon name="CheckCircle" size={48} color="var(--green)" />
        <h1 className="h-lg mt-4">Payment Successful</h1>
        <p className="txt-2 mt-2 text-sm">
          Your plan has been activated. Welcome to the next level.
        </p>
        <Button variant="primary" className="mt-6" onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
      </GlassCard>
    </div>
  )
}
```

### File: `src/payments/CheckoutCancel.tsx`

```tsx
export default function CheckoutCancel() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      <GlassCard className="max-w-md w-full text-center">
        <Icon name="XCircle" size={48} color="var(--amber)" />
        <h1 className="h-lg mt-4">Payment Cancelled</h1>
        <p className="txt-2 mt-2 text-sm">
          No charge was made. You can upgrade any time from your account.
        </p>
        <div className="flex gap-3 mt-6 justify-center">
          <Button variant="ghost" onClick={() => navigate('/pricing')}>
            View Plans
          </Button>
          <Button variant="primary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </GlassCard>
    </div>
  )
}
```

---

## Phase P3 — Subscription Section in AccountQuota

Add a subscription section to the existing `AccountQuota.tsx`.
This is the only modification to an existing file.

```tsx
// Add inside AccountQuota.tsx — Subscription section

function SubscriptionSection() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const currentPlan = PLANS.find(p => p.id === user?.plan) ?? PLANS[0]

  async function handleCancel() {
    // Opens a confirmation dialog, then calls your backend
    // Backend calls Stripe to cancel at period end
    // User keeps access until the billing period ends
    const confirmed = window.confirm(
      'Cancel your subscription? You keep access until the end of your billing period.'
    )
    if (!confirmed) return
    await api.post('/checkout/cancel-subscription')
    await checkSession()
  }

  return (
    <GlassCard variant="elevated" className="border border-amber-500/30">
      <div className="flex items-center justify-between">
        <div>
          <p className="txt-2 text-xs uppercase tracking-widest">Current Plan</p>
          <Chip variant={currentPlan.chipVariant} className="mt-1">
            {currentPlan.name}
          </Chip>
          {currentPlan.price > 0 && (
            <p className="txt-2 text-sm mt-1">
              ${currentPlan.price}/{currentPlan.period} · Renews automatically
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="primary" onClick={() => navigate('/pricing')}>
            {currentPlan.price === 0 ? 'Upgrade' : 'Change Plan'}
          </Button>
          {currentPlan.price > 0 && (
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
  )
}
```

---

## Phase P4 — Backend Requirements (Your Server)

The frontend payment module requires these three backend endpoints.
These are standard and work with any backend language (Node, Python, Go, etc.).

### Required Endpoints

**`POST /api/checkout/create-session`**
- Receives: `{ priceId: string }`
- Creates a Stripe Checkout Session using your Stripe secret key
- Returns: `{ sessionId: string }`
- Sets: `success_url` = `https://yourdomain.com/checkout/success`
- Sets: `cancel_url` = `https://yourdomain.com/checkout/cancel`

**`POST /api/checkout/cancel-subscription`**
- Authenticated endpoint (reads user from HttpOnly cookie session)
- Calls Stripe to cancel the user's subscription at period end
- Returns: `{ cancelledAt: string }`

**`POST /api/webhooks/stripe`**
- Stripe calls this automatically after payment events
- Must verify Stripe signature header (`stripe-signature`) using your webhook secret
- Handles `checkout.session.completed` → update user plan in your database
- Handles `customer.subscription.deleted` → downgrade user to free tier
- Returns: `{ received: true }`

### Environment Variables

```bash
# Frontend (.env) — only the publishable key goes here
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx

# Backend (.env) — secret keys NEVER go in frontend
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

**Rule:** Anything starting with `sk_` or `whsec_` lives on the server only. It never touches the frontend codebase.

---

## Phase P5 — Testing Payments (Free — Stripe Test Mode)

Stripe provides full test mode at no cost. You can run unlimited test payments.

**Test card numbers (always work in test mode):**
```
Success:          4242 4242 4242 4242   Any future date   Any CVC
Card declined:    4000 0000 0000 0002
Requires 3D auth: 4000 0025 0000 3155
```

**Local webhook testing (free Stripe CLI tool):**
```bash
# Install Stripe CLI (free)
brew install stripe/stripe-cli/stripe

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger a test event
stripe trigger checkout.session.completed
```

This lets you test the full payment flow — checkout → webhook → plan upgrade — on your local machine without touching real money.

---

## Execution Order

Build and finish the core app plan first. Then execute this plan in order:

| Phase | What You Build | Prerequisite |
|-------|---------------|--------------|
| P1 | plans.ts + PlanCard + Pricing page | Core app Phase 3 done (router exists) |
| P2 | CheckoutPage + Success + Cancel pages | Stripe account created (free), publishable key in .env |
| P3 | AccountQuota subscription section | P1 done |
| P4 | Backend endpoints | Your backend exists |
| P5 | Full test run in Stripe test mode | P4 done |
| Go live | Switch from `pk_test_` to `pk_live_` keys | P5 fully tested |

---

## Stripe Account Setup (Free)

1. Go to `stripe.com` — create an account (free, no credit card needed to sign up)
2. Stay in **Test mode** during development (toggle in Stripe dashboard top-left)
3. Go to **Products** → create your two paid plans → copy the `price_xxx` IDs into `plans.ts`
4. Go to **Developers → Webhooks** → add your endpoint URL → copy the `whsec_xxx` secret to your backend `.env`
5. Copy your `pk_test_xxx` publishable key to your frontend `.env`
6. When ready to go live: verify your bank account in Stripe, switch to live mode, swap keys

Total cost to set up and test: **$0**
Cost when first real payment comes in: 2.9% + $0.30 of that transaction, nothing else.

---

*This plan is self-contained. The core app runs perfectly without it.
Add this module only when you are ready to accept payments.*
