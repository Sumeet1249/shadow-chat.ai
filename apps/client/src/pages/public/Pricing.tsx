import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { PLANS, type Plan } from '@/data/plans'
import { PlanCard } from '@/payments/PlanCard'
import { AmbientOrbs, LANDING_ORBS } from '@/design-system/effects/AmbientOrbs'
import { ScanlineOverlay } from '@/design-system/effects/ScanlineOverlay'
import { Chip, Icon } from '@/design-system/components'
import { Brain } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Pricing() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  function handleSelectPlan(plan: Plan) {
    if (!user) {
      navigate('/register')
      return
    }
    navigate('/checkout', { state: { plan } })
  }

  const currentUserPlan = user ? ((user as any).plan ?? 'free') : null

  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <ScanlineOverlay />
      <AmbientOrbs orbs={LANDING_ORBS} />
      
      {/* Nav */}
      <nav className="lnav" style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg,#00e5ff,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={14} color="#fff" />
          </div>
          <span style={{ fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 14, color: '#fff' }}>SHADOW NODE</span>
        </Link>
        <div style={{ display: 'flex', gap: 20 }}>
          <Link to="/features" className="mono txt-2" style={{ fontSize: 10, textDecoration: 'none' }}>FEATURES</Link>
          <Link to="/login" className="mono txt-2" style={{ fontSize: 10, textDecoration: 'none' }}>LOGIN</Link>
        </div>
      </nav>

      <main style={{ position: 'relative', zIndex: 1, paddingTop: 120, paddingBottom: 100 }}>
        <section style={{ textAlign: 'center', marginBottom: 60, padding: '0 20px' }}>
          <Chip variant="cyan" style={{ marginBottom: 16, display: 'inline-flex' } as React.CSSProperties}>PRICING_MODEL v2.4</Chip>
          <h1 className="h-xl" style={{ marginBottom: 16 }}>Choose Your <span className="grad-c">Power Tier</span></h1>
          <p className="txt-2" style={{ fontSize: 16, maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>
            Scalable neural infrastructure for individuals and distributed syndicates.
          </p>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <PlanCard
                plan={plan}
                isCurrentPlan={currentUserPlan === plan.id}
                onSelect={handleSelectPlan}
              />
            </motion.div>
          ))}
        </div>

        <section style={{ textAlign: 'center', marginTop: 80 }}>
          <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 20 }}>ALL PLANS INCLUDE</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, opacity: 0.6 }}>
            {[
              { i: 'shield', l: 'AES-256 Encryption' },
              { i: 'hub', l: 'Distributed Nodes' },
              { i: 'monitoring', l: 'Real-time Telemetry' },
              { i: 'terminal', l: 'Neural API Access' },
            ].map(f => (
              <div key={f.l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name={f.i} size={14} color="var(--cyan)" />
                <span className="mono" style={{ fontSize: 9 }}>{f.l.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
