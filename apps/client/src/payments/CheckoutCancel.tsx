import { useNavigate } from 'react-router-dom'
import { GlassCard, Button, Icon } from '@/design-system/components'

export default function CheckoutCancel() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      <GlassCard className="max-w-md w-full text-center" style={{ padding: '48px 32px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <Icon name="cancel" size={48} color="var(--amber)" />
        </div>
        <h1 className="h-lg mt-4">Payment Cancelled</h1>
        <p className="txt-2 mt-2 text-sm" style={{ marginTop: 8 }}>
          No charge was made. You can upgrade any time from your account.
        </p>
        <div className="flex gap-3 mt-6 justify-center" style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'center' }}>
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
