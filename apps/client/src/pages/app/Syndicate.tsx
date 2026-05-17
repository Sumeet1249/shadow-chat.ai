import { GlassCard, Chip, Icon, Button, ProgressBar } from '@/design-system/components'

const MEMBERS = [
  { handle: 'Caleb_Shadow', email: 'caleb@shadownode.ai', role: 'Owner',   replies: 2847, color: 'var(--amber)' },
  { handle: 'cipher_x',     email: 'cipher@shadow.io',   role: 'Admin',   replies: 1234, color: '#a78bfa' },
  { handle: 'neural_7',     email: 'n7@shadow.io',        role: 'Operator', replies: 567,  color: 'var(--cyan)' },
  { handle: 'ghost_op',     email: 'ghost@shadow.io',    role: 'Operator', replies: 421,  color: 'var(--green)' },
]

const ROLE_VARIANT: Record<string, 'amber' | 'violet' | 'cyan' | 'green' | 'red' | 'default'> = { 
  Owner: 'amber', Admin: 'violet', Operator: 'cyan' 
}

export default function Syndicate() {
  return (
    <div className="enter">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <Chip variant="violet" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>DISTRIBUTED_ORG</Chip>
          <h1 className="h-md">Syndicate <span className="grad-v">Operations</span></h1>
          <p className="txt-2" style={{ fontSize: 13.5, marginTop: 4 }}>Manage multi-operator nodes and collaborative neural resource allocation.</p>
        </div>
        <Button variant="primary" style={{ padding: '10px 20px' }}>
          <Icon name="person_add" size={14} /> INVITE_OPERATOR
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Members List */}
          <GlassCard style={{ padding: '24px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 20 }}>VERIFIED_OPERATORS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {MEMBERS.map(m => (
                <div key={m.handle} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: `linear-gradient(135deg,${m.color},transparent)`, border: `1px solid ${m.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: 18, flexShrink: 0 }}>
                    {m.handle.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{m.handle}</div>
                    <div className="mono txt-2" style={{ fontSize: 10 }}>{m.email}</div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <Chip variant={ROLE_VARIANT[m.role]} size="sm">{m.role.toUpperCase()}</Chip>
                    <div className="mono txt-c" style={{ fontSize: 10 }}>{m.replies.toLocaleString()} REPLIES</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Activity Feed */}
          <GlassCard style={{ padding: '24px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>OPERATIONAL_LOGS</div>
            {[
              { t: '14:22', u: 'cipher_x', a: 'Calibrated Persona: Corporate Phantom' },
              { t: '12:05', u: 'neural_7', a: 'Deployed 12 nodes to us-east-1' },
              { t: '09:14', u: 'Caleb_Shadow', a: 'Granted Admin access to cipher_x' },
            ].map((log, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, fontSize: 13 }}>
                <span className="mono txt-2" style={{ fontSize: 10, marginTop: 2 }}>{log.t}</span>
                <span style={{ color: 'var(--txt2)' }}><strong style={{ color: 'var(--txt)' }}>{log.u}</strong> {log.a}</span>
              </div>
            ))}
          </GlassCard>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <GlassCard variant="elevated" style={{ padding: '24px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 20 }}>SYNDICATE_RESOURCES</div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span className="mono txt-2" style={{ fontSize: 9 }}>TEAM_SEATS</span>
                <span className="mono" style={{ fontSize: 10 }}>4 / 10</span>
              </div>
              <ProgressBar value={40} color="var(--violet)" height={4} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span className="mono txt-2" style={{ fontSize: 9 }}>COMPUTE_SHARES</span>
                <span className="mono" style={{ fontSize: 10 }}>82% ACTIVE</span>
              </div>
              <ProgressBar value={82} color="var(--cyan)" height={4} />
            </div>
            <Button variant="ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>Manage Seats</Button>
          </GlassCard>

          <GlassCard style={{ padding: '20px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>SECURITY_POLICIES</div>
            {[
              { l: 'MFA_ENFORCED', v: 'YES', c: 'var(--green)' },
              { l: 'IP_WHITELIST', v: 'INACTIVE', c: 'var(--red)' },
              { l: 'SESSION_TTL', v: '12H', c: 'var(--txt3)' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="mono txt-2" style={{ fontSize: 9 }}>{s.l}</span>
                <span className="mono" style={{ fontSize: 10, color: s.c }}>{s.v}</span>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
