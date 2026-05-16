// Syndicate — Phase 7.2 stub
import { GlassCard, Chip, Icon, Button } from '@/design-system/primitives'

const MEMBERS = [
  { handle: 'Caleb_Shadow', email: 'caleb@shadownode.ai', role: 'Owner',   replies: 2847, color: 'var(--amber)' },
  { handle: 'cipher_x',     email: 'cipher@shadow.io',   role: 'Admin',   replies: 1234, color: '#a78bfa' },
  { handle: 'neural_7',     email: 'n7@shadow.io',        role: 'Operator', replies: 567,  color: 'var(--cyan)' },
  { handle: 'ghost_op',     email: 'ghost@shadow.io',    role: 'Operator', replies: 421,  color: 'var(--green)' },
]

const ROLE_CHIP: Record<string, string> = { Owner: 'chip-a', Admin: 'chip-v', Operator: 'chip-c' }

export default function Syndicate() {
  return (
    <div className="enter">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 22 }}>
        <div>
          <Chip variant="violet" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>SYNDICATE</Chip>
          <h1 className="h-md">Syndicate <span className="txt-v">Operations</span></h1>
        </div>
        <Button variant="primary" size="sm"><Icon name="person_add" size={13} aria-hidden /> Invite Member</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {MEMBERS.map(m => (
          <GlassCard key={m.handle} style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 14 } as React.CSSProperties}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${m.color}22`, border: `1px solid ${m.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: m.color, fontSize: 16, flexShrink: 0 }}>{m.handle.charAt(0).toUpperCase()}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{m.handle}</div>
              <div className="mono txt-2" style={{ fontSize: 10 }}>{m.email}</div>
            </div>
            <span className={`chip ${ROLE_CHIP[m.role]}`}>{m.role}</span>
            <span className="mono txt-c" style={{ fontSize: 11 }}>{m.replies.toLocaleString()} replies</span>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
