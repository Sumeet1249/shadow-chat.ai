import { GlassCard, Chip, Icon, Button, ProgressBar } from '@/design-system/components'
import { useAuthStore } from '@/store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { PLANS } from '@/data/plans'
import api from '@/lib/api'

function SubscriptionCard() {
  const { user, checkSession } = useAuthStore()
  const navigate = useNavigate()
  const currentPlan = PLANS.find(p => p.id === user?.plan) ?? PLANS[0]

  async function handleCancel() {
    const confirmed = window.confirm('Cancel your subscription? You keep access until the end of your billing period.')
    if (!confirmed) return
    try {
      await api.post('/checkout/cancel-subscription')
      await checkSession()
    } catch (error) {
      console.error('Failed to cancel subscription:', error)
    }
  }

  return (
    <GlassCard variant="elevated" style={{ border: '1px solid var(--violet)30', padding: '24px' } as React.CSSProperties}>
      <div className="mono txt-2" style={{ fontSize: 9, marginBottom: 16 }}>SUBSCRIPTION_STATUS</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{currentPlan.name}</h3>
          <div style={{ display: 'flex', gap: 6 }}>
            <Chip variant={currentPlan.chipVariant} size="sm">ACTIVE</Chip>
            <span className="mono txt-2" style={{ fontSize: 10 }}>Renews on June 12, 2025</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>${currentPlan.price}</div>
          <div className="mono txt-2" style={{ fontSize: 9 }}>PER_MONTH</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button variant="primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => navigate('/pricing')}>UPGRADE</Button>
        {currentPlan.price > 0 && <Button variant="ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={handleCancel}>CANCEL</Button>}
      </div>
    </GlassCard>
  )
}

export default function AccountQuota() {
  const { user } = useAuthStore()

  return (
    <div className="enter">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <Chip variant="violet" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>OPERATOR_SETTINGS</Chip>
          <h1 className="h-md">Account <span className="grad-v">Management</span></h1>
          <p className="txt-2" style={{ fontSize: 13.5, marginTop: 4 }}>Configure your identity, security, and neural resource allocation.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          {/* Identity Card */}
          <GlassCard style={{ padding: '28px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 20 }}>IDENTITY_UNIT</div>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 32 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#00e5ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 800, color: '#fff', boxShadow: '0 0 20px rgba(124,58,237,0.2)' }}>
                {user?.handle?.charAt(0).toUpperCase() ?? 'S'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 2 }}>{user?.handle ?? 'Operator'}</div>
                    <div className="mono txt-2" style={{ fontSize: 11 }}>ID: {user?.id?.slice(0, 8).toUpperCase() ?? 'UNKNOWN'}</div>
                  </div>
                  <Button variant="ghost" size="sm"><Icon name="edit" size={13} /> Edit Profile</Button>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <label className="mono txt-2" style={{ fontSize: 9, display: 'block', marginBottom: 8 }}>PRIMARY_EMAIL</label>
                <div className="field" style={{ opacity: 0.6 }}>{user?.email ?? 'operator@shadownode.ai'}</div>
              </div>
              <div>
                <label className="mono txt-2" style={{ fontSize: 9, display: 'block', marginBottom: 8 }}>ACCESS_ROLE</label>
                <div className="field" style={{ opacity: 0.6 }}>{user?.role?.toUpperCase() ?? 'USER'}</div>
              </div>
            </div>
          </GlassCard>

          {/* Billing History */}
          <GlassCard style={{ padding: '24px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>BILLING_HISTORY</div>
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                    <th className="mono txt-2" style={{ fontSize: 9, padding: '12px 8px' }}>DATE</th>
                    <th className="mono txt-2" style={{ fontSize: 9, padding: '12px 8px' }}>INVOICE</th>
                    <th className="mono txt-2" style={{ fontSize: 9, padding: '12px 8px' }}>AMOUNT</th>
                    <th className="mono txt-2" style={{ fontSize: 9, padding: '12px 8px' }}>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { d: 'May 12, 2025', i: 'INV-2025-001', a: '$29.00', s: 'PAID' },
                    { d: 'Apr 12, 2025', i: 'INV-2025-002', a: '$29.00', s: 'PAID' },
                    { d: 'Mar 12, 2025', i: 'INV-2025-003', a: '$29.00', s: 'PAID' },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                      <td style={{ padding: '12px 8px' }}>{row.d}</td>
                      <td style={{ padding: '12px 8px' }} className="mono">{row.i}</td>
                      <td style={{ padding: '12px 8px' }}>{row.a}</td>
                      <td style={{ padding: '12px 8px' }}><Chip variant="green" size="sm">{row.s}</Chip></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <SubscriptionCard />
          
          <GlassCard style={{ padding: '24px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 20 }}>RESOURCE_QUOTA</div>
            {[
              { l: 'GENERATIONS', u: 8947, t: 10000, c: 'var(--cyan)' },
              { l: 'NODE_CONNECTIONS', u: 4, t: 6, c: 'var(--green)' },
              { l: 'MEMORY_UNITS', u: 12, t: 15, c: '#a78bfa' },
              { l: 'PERSONA_SLOTS', u: 3, t: 5, c: 'var(--amber)' },
            ].map(q => (
              <div key={q.l} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span className="mono txt-2" style={{ fontSize: 9 }}>{q.l}</span>
                  <span className="mono" style={{ fontSize: 10, color: q.c }}>{q.u} / {q.t}</span>
                </div>
                <ProgressBar value={(q.u / q.t) * 100} color={q.c} height={4} />
              </div>
            ))}
            <div style={{ marginTop: 24, padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <div className="mono txt-2" style={{ fontSize: 9, marginBottom: 6 }}>QUOTA_RESET</div>
              <div style={{ fontSize: 12 }}>Resets in 18 days (June 1)</div>
            </div>
          </GlassCard>

          <Button variant="ghost" style={{ color: 'var(--red)', borderColor: 'rgba(248,113,113,0.1)' }}>
            <Icon name="logout" size={14} /> TERMINATE_SESSION
          </Button>
        </div>
      </div>
    </div>
  )
}
