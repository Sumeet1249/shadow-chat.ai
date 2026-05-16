import { Link } from 'react-router-dom'
import { GlassCard, Icon, Chip, ProgressBar, PulseDot } from '@/design-system/primitives'
import { useCountUp } from '@/hooks/useCountUp'
import { usePersonaStore } from '@/store/usePersonaStore'
import { useAuthStore } from '@/store/useAuthStore'
import { MOCK_OUTPUTS, PLATFORM_COLORS } from '@/data/mock/outputs'
import { MOCK_PERSONAS } from '@/data/mock/personas'
import { MOCK_NODES } from '@/data/mock/nodes'

const QUICK_LAUNCH = [
  { to: '/generate',   icon: 'auto_awesome', label: 'New Reply',   color: 'var(--cyan)' },
  { to: '/workflow',   icon: 'terminal',     label: 'Terminal',    color: '#a78bfa' },
  { to: '/arena',      icon: 'emoji_events', label: 'Arena',       color: 'var(--amber)' },
  { to: '/analytics',  icon: 'analytics',    label: 'Analytics',   color: 'var(--green)' },
]

// Sparkline data — 12H activity bars (prototype values)
const SPARKLINE_BARS = [38, 62, 44, 78, 58, 88, 72, 94, 68, 86, 90, 83]
const SPARK_MAX = Math.max(...SPARKLINE_BARS)

/** StatCard — count-up animated metric tile */
function StatCard({ label, target, suffix = '', color = 'var(--cyan)', icon }: {
  label: string; target: number; suffix?: string; color?: string; icon: string
}) {
  const value = useCountUp(target, 1400)
  return (
    <GlassCard style={{ padding: '20px 22px' } as React.CSSProperties}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <span className="mono txt-2" style={{ fontSize: 10 }}>{label}</span>
        <Icon name={icon} size={16} color={color} aria-hidden />
      </div>
      <div style={{ fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 28, color }}>{value.toLocaleString()}{suffix}</div>
    </GlassCard>
  )
}

export default function Dashboard() {
  const { user } = useAuthStore()
  const { activePersonaId } = usePersonaStore()
  const activePersona = MOCK_PERSONAS.find(p => p.id === activePersonaId) ?? MOCK_PERSONAS[0]
  const activeNodes = MOCK_NODES.filter(n => n.status === 'active')

  return (
    <div className="enter">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 26 }}>
        <div>
          <Chip variant="green" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>
            <PulseDot color="green" size={5} />
            LIVE
          </Chip>
          <h1 className="h-md">Welcome back, <span className="grad-c">{user?.handle ?? 'Operator'}</span></h1>
          <p className="txt-2" style={{ fontSize: 13.5, marginTop: 4 }}>Neural network nominal. {activeNodes.length} nodes operational.</p>
        </div>
        <Link to="/generate" className="btn-p btn-sm">
          <Icon name="auto_awesome" size={13} aria-hidden />
          New Reply
        </Link>
      </div>

      {/* Stat cards — exact prototype set: TOTAL REPLIES / TOKENS USED / WIN RATE / ACTIVE NODES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 22 }}>
        <StatCard label="TOTAL REPLIES"  target={2847}              icon="chat_bubble"  color="var(--cyan)"   />
        <StatCard label="TOKENS USED"    target={89420}             icon="memory"        color="#a78bfa"       />
        <StatCard label="WIN RATE"       target={91}   suffix="%"   icon="emoji_events"  color="var(--amber)"  />
        <StatCard label="ACTIVE NODES"   target={activeNodes.length} icon="hub"          color="var(--green)"  />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18 }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Sparkline — ACTIVITY 12H (prototype widget) */}
          <GlassCard style={{ padding: '20px 22px' } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span className="mono txt-2" style={{ fontSize: 10 }}>ACTIVITY — 12H</span>
              <Chip variant="green" style={{ display: 'inline-flex', gap: 4 } as React.CSSProperties}>
                <PulseDot color="green" size={4} />
                LIVE
              </Chip>
            </div>
            {/* 12 bars */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48 }}>
              {SPARKLINE_BARS.map((v, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${(v / SPARK_MAX) * 100}%`,
                    background: 'linear-gradient(to top, var(--cyan), #7c3aed)',
                    borderRadius: '2px 2px 0 0',
                    opacity: 0.7 + (v / SPARK_MAX) * 0.3,
                    transition: 'height 0.6s ease',
                  }}
                  aria-hidden
                />
              ))}
            </div>
          </GlassCard>

          {/* Quick Launch */}
          <GlassCard style={{ padding: '20px 22px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 14 }}>QUICK LAUNCH</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {QUICK_LAUNCH.map(q => (
                <Link key={q.to} to={q.to} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '16px 12px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', textDecoration: 'none', transition: 'all var(--t-mid)' }}
                  className="hover-glow">
                  <div className="icon-box" style={{ width: 42, height: 42, background: `${q.color}12`, border: `1px solid ${q.color}22` }}>
                    <Icon name={q.icon} size={18} color={q.color} aria-hidden />
                  </div>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--txt2)', letterSpacing: '0.06em' }}>{q.label}</span>
                </Link>
              ))}
            </div>
          </GlassCard>

          {/* Recent outputs */}
          <GlassCard style={{ padding: '20px 22px' } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <span className="mono txt-2" style={{ fontSize: 10 }}>RECENT OUTPUTS</span>
              <Link to="/archive" className="mono txt-c" style={{ fontSize: 10 }}>View archive →</Link>
            </div>
            {MOCK_OUTPUTS.slice(0, 4).map((o, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 9, color: PLATFORM_COLORS[o.platform], background: `${PLATFORM_COLORS[o.platform]}18`, border: `1px solid ${PLATFORM_COLORS[o.platform]}2e`, padding: '2px 8px', borderRadius: 999 }}>
                      {o.platform.toUpperCase()}
                    </span>
                    <span className="chip chip-v" style={{ fontSize: 9 }}>{o.persona}</span>
                  </div>
                  <span className="mono" style={{ fontSize: 9, color: 'var(--green)' }}>{o.eng}</span>
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--txt2)', lineHeight: 1.5 }}>"{o.text}"</p>
              </div>
            ))}
          </GlassCard>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Active persona */}
          <GlassCard variant="elevated" style={{ padding: '18px 20px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 12 }}>ACTIVE PERSONA</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg,${activePersona.gradient})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 800, color: '#fff' }}>
                {activePersona.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{activePersona.name}</div>
                <span className="chip chip-v" style={{ fontSize: 9 }}>{activePersona.tone}</span>
              </div>
            </div>
            {[['Replies', activePersona.replies.toLocaleString()], ['Win Rate', `${activePersona.wins}%`], ['Avg Eng.', activePersona.avgEng]].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                <span className="mono txt-2" style={{ fontSize: 10 }}>{l}</span>
                <span className="mono txt-c" style={{ fontSize: 10 }}>{v}</span>
              </div>
            ))}
          </GlassCard>

          {/* Node status */}
          <GlassCard style={{ padding: '18px 20px' } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="mono txt-2" style={{ fontSize: 10 }}>NODE STATUS</span>
              <Link to="/nodes" className="mono txt-c" style={{ fontSize: 10 }}>Manage →</Link>
            </div>
            {MOCK_NODES.slice(0, 4).map(n => (
              <div key={n.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: n.status === 'active' ? 'var(--green)' : n.status === 'error' ? 'var(--red)' : 'var(--txt3)', flexShrink: 0 }} aria-hidden />
                <span className="mono" style={{ fontSize: 10, flex: 1 }}>{n.name}</span>
                <ProgressBar value={n.health} color={n.health > 95 ? 'var(--green)' : 'var(--amber)'} height={3} />
                <span className="mono txt-2" style={{ fontSize: 9, width: 30, textAlign: 'right' }}>{n.health}%</span>
              </div>
            ))}
          </GlassCard>

          {/* Quota Usage widget (prototype — third right-column widget) */}
          <GlassCard style={{ padding: '18px 20px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 14 }}>QUOTA USAGE</div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12 }}>API Calls</span>
                <span className="mono txt-c" style={{ fontSize: 10 }}>8,400 / 10,000</span>
              </div>
              <ProgressBar value={84} color="var(--cyan)" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12 }}>Storage</span>
                <span className="mono" style={{ fontSize: 10, color: '#a78bfa' }}>2.4 / 10 GB</span>
              </div>
              <ProgressBar value={24} color="#a78bfa" />
            </div>
            <Link to="/account" className="btn-g btn-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 12px', textDecoration: 'none' }}>
              <Icon name="upgrade" size={13} aria-hidden />
              <span style={{ fontSize: 12 }}>Upgrade Plan →</span>
            </Link>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
