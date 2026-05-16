import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { PLANS, type Plan } from '@/data/plans'
import { PlanCard } from '@/payments/PlanCard'
import { PublicNav } from '@/layouts/PublicNav'
import { AmbientOrbs } from '@/design-system/effects/AmbientOrbs'
import { Chip } from '@/design-system/primitives'
import React from 'react'

const PRICING_ORBS = [
  { width: 500, height: 500, top: -100, left: -100, color: 'rgba(0, 229, 255, 0.08)', floatClass: 'fl1' as const },
  { width: 600, height: 600, bottom: -100, right: -150, color: 'rgba(124, 58, 237, 0.1)', floatClass: 'fl2' as const }
]

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

  // Cast any object type checking if necessary based on user state
  const currentUserPlan = user ? ((user as any).plan ?? 'free') : null

  return (
    <div className="bg-void min-h-screen">
      <PublicNav />
      <AmbientOrbs orbs={PRICING_ORBS} />
      
      <main id="main-content" style={{ position: 'relative', zIndex: 10, paddingTop: 120 }}>
        <section className="hero" style={{ textAlign: 'center', marginBottom: 64 }}>
          <Chip variant="violet" style={{ display: 'inline-flex', marginBottom: 16 } as React.CSSProperties}>Pricing</Chip>
          <h1 className="h-xl">Choose Your Tier</h1>
          <p className="txt-2" style={{ marginTop: 8 }}>No hidden fees. Cancel anytime.</p>
        </section>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, maxWidth: 1000, margin: '0 auto', padding: '0 24px', paddingBottom: 96 }}>
          {PLANS.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isCurrentPlan={currentUserPlan === plan.id}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
