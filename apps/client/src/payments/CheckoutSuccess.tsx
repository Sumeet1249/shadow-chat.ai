import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { GlassCard, Button, Icon } from '@/design-system/primitives'

export default function CheckoutSuccess() {
  const navigate = useNavigate()
  const { checkSession } = useAuthStore()

  useEffect(() => {
    // Re-fetch user session so plan update from webhook is reflected
    checkSession()
  }, [checkSession])

  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      <GlassCard variant="elevated" className="max-w-md w-full text-center" style={{ padding: '48px 32px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <Icon name="check_circle" size={48} color="var(--green)" />
        </div>
        <h1 className="h-lg mt-4">Payment Successful</h1>
        <p className="txt-2 mt-2 text-sm" style={{ marginTop: 8 }}>
          Your plan has been activated. Welcome to the next level.
        </p>
        <Button variant="primary" className="mt-6" onClick={() => navigate('/dashboard')} style={{ marginTop: 24 }}>
          Go to Dashboard
        </Button>
      </GlassCard>
    </div>
  )
}
