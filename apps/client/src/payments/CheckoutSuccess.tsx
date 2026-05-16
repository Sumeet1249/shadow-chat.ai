import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlassCard, Chip, Button, Icon } from '@/design-system/primitives'
import { useAuthStore } from '@/store/useAuthStore'
import { ParticleCanvas } from '@/design-system/effects/ParticleCanvas'
import { ScanlineOverlay } from '@/design-system/effects/ScanlineOverlay'

export default function CheckoutSuccess() {
  const navigate = useNavigate()
  const { checkSession } = useAuthStore()

  useEffect(() => {
    // Refresh user state to reflect new plan
    checkSession()
    const timer = setTimeout(() => navigate('/dashboard'), 4000)
    return () => clearTimeout(timer)
  }, [checkSession, navigate])

  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <ScanlineOverlay />
      <ParticleCanvas density={0.2} />

      <GlassCard variant="elevated" style={{ maxWidth: 440, width: '100%', padding: '48px', textAlign: 'center', position: 'relative', zIndex: 1, border: '1px solid var(--green)40' } as React.CSSProperties}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(52,211,153,0.1)', border: '1px solid var(--green)30', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Icon name="check_circle" size={32} color="var(--green)" />
        </div>
        
        <Chip variant="green" style={{ marginBottom: 16, display: 'inline-flex' } as React.CSSProperties}>DEPLOYMENT_SUCCESS</Chip>
        <h1 className="h-md" style={{ marginBottom: 12 }}>Handshake <span className="grad-c">Complete</span></h1>
        <p className="txt-2" style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>
          Your neural infrastructure is now being calibrated. All high-tier features have been unlocked for your account.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button variant="primary" onClick={() => navigate('/dashboard')} style={{ width: '100%', justifyContent: 'center' }}>
            Enter Dashboard
          </Button>
          <div className="mono txt-2" style={{ fontSize: 9 }}>REDIRECTING IN 4 SECONDS...</div>
        </div>
      </GlassCard>
    </div>
  )
}
