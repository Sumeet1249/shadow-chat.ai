import { GlassCard, Chip, Icon, Button, ProgressBar } from '@/design-system/primitives'
import { useAuthStore } from '@/store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { PLANS } from '@/data/plans'
import api from '@/lib/api'
import React from 'react'

function SubscriptionSection() {
  const { user, checkSession } = useAuthStore()
  const navigate = useNavigate()
  // User.plan is now properly typed in src/types/user.ts
  const currentPlan = PLANS.find(p => p.id === user?.plan) ?? PLANS[0]

  async function handleCancel() {
    const confirmed = window.confirm(
      'Cancel your subscription? You keep access until the end of your billing period.'
    )
    if (!confirmed) return
    try {
      await api.post('/checkout/cancel-subscription')
      await checkSession()
    } catch (error) {
      console.error('Failed to cancel subscription:', error)
    }
  }

  return (
    <GlassCard variant="elevated" style={{ border: '1px solid rgba(245, 158, 11, 0.3)', padding: '20px 22px' } as React.CSSProperties}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <p className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>CURRENT PLAN</p>
          <Chip variant={currentPlan.chipVariant}>
            {currentPlan.name}
          </Chip>
          {currentPlan.price > 0 && (
            <p className="txt-2 text-sm mt-1" style={{ fontSize: 13, marginTop: 8 }}>
              ${currentPlan.price}/{currentPlan.period} · Renews automatically
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="primary" size="sm" onClick={() => navigate('/pricing')}>
            {currentPlan.price === 0 ? 'Upgrade' : 'Change Plan'}
          </Button>
          {currentPlan.price > 0 && (
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
  )
}

/**
 * AccountQuota — Integrated with Phase P3 Subscription Management
 */
export default function AccountQuota() {
  const { user } = useAuthStore()

  return (
    <div className="enter">
      <div style={{ marginBottom: 22 }}>
        <Chip variant="violet" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>ACCOUNT</Chip>
        <h1 className="h-md">Account <span className="txt-v">Settings</span></h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Profile section */}
          <GlassCard style={{ padding: '24px 26px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 18 }}>OPERATOR PROFILE</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#00e5ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: '#fff' }}>
                {user?.handle?.charAt(0).toUpperCase() ?? 'S'}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{user?.handle ?? 'Operator'}</div>
                <div className="mono txt-2" style={{ fontSize: 11 }}>{user?.email ?? 'operator@shadownode.ai'}</div>
                <Chip variant={user?.role === 'admin' ? 'amber' : 'cyan'} size="sm" style={{ marginTop: 6 } as React.CSSProperties}>{user?.role?.toUpperCase() ?? 'USER'}</Chip>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[['Display Name', user?.handle ?? 'Operator'], ['Email Address', user?.email ?? 'operator@shadownode.ai']].map(([l, v]) => (
                <div key={l}>
                  <label className="mono txt-2" style={{ fontSize: 9, display: 'block', marginBottom: 6 }}>{l.toUpperCase()}</label>
                  <input className="field" defaultValue={v} />
                </div>
              ))}
              <Button variant="ghost" size="sm" style={{ alignSelf: 'flex-start' }}>
                <Icon name="save" size={13} aria-hidden /> Save Changes
              </Button>
            </div>
          </GlassCard>

          {/* Security section */}
          <GlassCard style={{ padding: '24px 26px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 18 }}>SECURITY</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[{ label: 'Change Password', icon: 'lock' }, { label: 'Two-Factor Authentication', icon: 'shield' }, { label: 'Active Sessions', icon: 'devices' }].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <Icon name={item.icon} size={16} color="var(--txt3)" aria-hidden />
                    <span style={{ fontSize: 13.5 }}>{item.label}</span>
                  </div>
                  <Button variant="ghost" size="sm">Manage</Button>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Subscription & Quota */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          
          {/* Subscription Section (Phase P3) */}
          <SubscriptionSection />

          <GlassCard variant="elevated" style={{ padding: '20px 22px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>USAGE QUOTAS</div>
            {[
              { label: 'API Requests', used: 8947, total: 10000, color: 'var(--cyan)' },
              { label: 'Token Budget', used: 89400, total: 100000, color: '#a78bfa' },
              { label: 'Active Nodes', used: 4, total: 6, color: 'var(--green)' },
              { label: 'Personas', used: 4, total: 10, color: 'var(--amber)' },
            ].map(q => (
              <div key={q.label} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13 }}>{q.label}</span>
                  <span className="mono" style={{ fontSize: 10, color: q.color }}>{q.used.toLocaleString()} / {q.total.toLocaleString()}</span>
                </div>
                <ProgressBar value={(q.used / q.total) * 100} color={q.color} />
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
