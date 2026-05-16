import { useLocation, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { GlassCard, Chip, Button, Icon } from '@/design-system/primitives'
import api from '@/lib/api'
import type { Plan } from '@/data/plans'

export default function CheckoutPage() {
  const location = useLocation()
  const navigate = useNavigate()
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
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')
      // @ts-expect-error - Standard Stripe method
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
      <GlassCard variant="elevated" className="max-w-md w-full" style={{ padding: '32px 24px' }}>
        <Chip variant={plan.chipVariant}>{plan.name} Plan</Chip>
        <p className="txt-2 mt-4 text-sm" style={{ marginTop: 16 }}>
          You're about to upgrade to <strong style={{ color: 'var(--txt)' }}>{plan.name}</strong> at
          ${plan.price}/{plan.period}. You'll be taken to a secure
          Stripe payment page.
        </p>
        {error && (
          <p style={{ color: 'var(--red)', fontSize: 14, marginTop: 12 }} role="alert">{error}</p>
        )}
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button variant="primary" loading={loading} onClick={handleCheckout}>
            Continue to Payment
          </Button>
        </div>
        <p className="txt-2 text-xs mt-4 flex items-center gap-1" style={{ marginTop: 16, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="lock" size={12} />
          Payments secured by Stripe. We never see your card details.
        </p>
      </GlassCard>
    </div>
  )
}
