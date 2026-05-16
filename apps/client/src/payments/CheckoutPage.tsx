import { useLocation, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { GlassCard, Chip, Button, Icon } from '@/design-system/primitives'
import api from '@/lib/api'
import type { Plan } from '@/data/plans'
import { ScanlineOverlay } from '@/design-system/effects/ScanlineOverlay'
import { ParticleCanvas } from '@/design-system/effects/ParticleCanvas'

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
      const res = await api.post('/checkout/create-session', { priceId: plan.stripePriceId })
      const { sessionId } = res.data
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')
      // @ts-expect-error - Standard Stripe method
      await stripe?.redirectToCheckout({ sessionId })
    } catch {
      setError('INITIALIZATION_FAILED: Could not establish secure handshake.')
    } finally {
      setLoading(false)
    }
  }

  if (!plan) return <Navigate to="/pricing" replace />

  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <ScanlineOverlay />
      <ParticleCanvas density={0.15} />

      <GlassCard variant="elevated" style={{ maxWidth: 480, width: '100%', padding: '40px', position: 'relative', zIndex: 1, border: '1px solid var(--cyan)30' } as React.CSSProperties}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Chip variant="cyan" style={{ marginBottom: 12, display: 'inline-flex' } as React.CSSProperties}>SECURE_HANDSHAKE</Chip>
          <h1 className="h-md">Neural Access <span className="grad-c">License</span></h1>
          <p className="txt-2" style={{ fontSize: 13.5, marginTop: 8 }}>Initialize your subscription to the {plan.name} cluster.</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span className="mono txt-2" style={{ fontSize: 10 }}>RESOURCE_UNIT</span>
            <span className="mono txt-2" style={{ fontSize: 10 }}>COST</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>{plan.name} Infrastructure</span>
            <span style={{ fontSize: 16, fontWeight: 800 }}>${plan.price}</span>
          </div>
          <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>Billed {plan.period === 'forever' ? 'once' : 'monthly'}</div>
          
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 600 }}>Total Commitment</span>
              <span style={{ fontWeight: 800, color: 'var(--cyan)' }}>${plan.price}.00</span>
            </div>
          </div>
        </div>

        {error && (
          <div style={{ padding: '12px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 8, color: 'var(--red)', fontSize: 12, marginBottom: 20, textAlign: 'center' }}>
            <Icon name="warning" size={14} style={{ marginRight: 8 }} />
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="ghost" onClick={() => navigate(-1)} style={{ flex: 1, justifyContent: 'center' }}>
            Cancel
          </Button>
          <Button variant="primary" loading={loading} onClick={handleCheckout} style={{ flex: 2, justifyContent: 'center' }}>
            Initiate Deployment
          </Button>
        </div>

        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: 0.5 }}>
          <Icon name="shield" size={14} color="var(--green)" />
          <span className="mono" style={{ fontSize: 9 }}>ENCRYPTED BY STRIPE_v3</span>
        </div>
      </GlassCard>
    </div>
  )
}
