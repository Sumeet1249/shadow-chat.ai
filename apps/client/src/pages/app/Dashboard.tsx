import { useNavigate } from 'react-router-dom'
import { GlassCard, Icon, Chip } from '@/design-system/primitives'

const STATS = [
  { label: 'TOTAL REPLIES', value: '2,847', trend: '+12.4%', icon: 'forum', color: 'var(--cyan)' },
  { label: 'TOKENS USED', value: '89,420', trend: '+8.1%', icon: 'memory', color: '#a78bfa' },
  { label: 'WIN RATE', value: '91%', trend: '+3.2%', icon: 'emoji_events', color: 'var(--amber)' },
  { label: 'ACTIVE NODES', value: '4/8', trend: 'STABLE', icon: 'settings_input_antenna', color: 'var(--green)' },
]

const OUTPUTS = [
  { 
    platform: 'TWITTER', 
    persona: 'Nexus Architect', 
    text: '"The infrastructure problem isn\'t compute — it\'s latency at the edge. We\'re solving the wrong bottleneck entirely..."', 
    meta: '+84 engagements', 
    tag: 'VIRAL', 
    tagColor: 'var(--amber)',
    time: '2m ago'
  },
  { 
    platform: 'LINKEDIN', 
    persona: 'Corporate Phantom', 
    text: '"After 3 years in ML infrastructure, the one pattern separating top-tier teams from the rest is deceptively simple..."', 
    meta: '+234 reactions', 
    tag: 'HIGH', 
    tagColor: 'var(--cyan)',
    time: '18m ago'
  },
  { 
    platform: 'REDDIT', 
    persona: 'Ghost Analyst', 
    text: '"This take fundamentally misses the reward model problem with current RLHF approaches. Here\'s a better framing..."', 
    meta: '+1.2K upvotes', 
    tag: 'TOP', 
    tagColor: 'var(--amber)',
    time: '1h ago'
  },
]

export default function Dashboard() {
  const navigate = useNavigate()
  return (
    <div className="enter">
      {/* Header Area */}
      <div style={{ marginBottom: 32 }}>
        <div className="mono txt-3" style={{ fontSize: 10, marginBottom: 8, letterSpacing: '0.1em' }}>Sunday, May 17, 2026</div>
        <h1 className="h-lg" style={{ fontSize: 48, marginBottom: 8 }}>
          Good morning, <span className="grad-c">Caleb</span>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="txt-2" style={{ fontSize: 14 }}>Neural core stable • 4 nodes active • </span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)' }}>all systems nominal</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        {/* Main Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {STATS.map((s, i) => (
              <GlassCard key={i} style={{ padding: '20px' } as React.CSSProperties}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <span className="mono txt-3" style={{ fontSize: 9, letterSpacing: '0.1em' }}>{s.label}</span>
                  <Icon name={s.icon} size={14} color="var(--txt3)" />
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 10, fontFamily: 'var(--ff-disp)' }}>{s.value}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 11, color: s.trend === 'STABLE' ? 'var(--green)' : s.color, fontWeight: 800 }}>{s.trend}</span>
                  <span className="mono txt-3" style={{ fontSize: 9 }}>vs last week</span>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Recent Output Feed */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 className="h-sm" style={{ fontSize: 18 }}>Recent Output</h2>
              <button 
                onClick={() => navigate('/archive')}
                className="mono" 
                style={{ fontSize: 10, color: 'var(--txt3)', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: 8, cursor: 'pointer' }}
              >
                View Archive â†’
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {OUTPUTS.map((o, i) => (
                <GlassCard key={i} style={{ padding: '20px', background: 'rgba(10, 18, 38, 0.4)' } as React.CSSProperties}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Chip variant="cyan" size="sm" style={{ fontSize: 9 }}>{o.platform}</Chip>
                      <Chip variant="violet" size="sm" style={{ fontSize: 9 }}>{o.persona}</Chip>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span className="mono" style={{ fontSize: 10, color: o.tagColor, fontWeight: 800, letterSpacing: '0.05em' }}>{o.tag}</span>
                      <span className="mono txt-3" style={{ fontSize: 10 }}>{o.time}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--txt2)', fontStyle: 'italic', marginBottom: 16 }}>
                    {o.text}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--green)', fontWeight: 700 }}>{o.meta}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn-g" style={{ padding: 6, borderRadius: 8 }}><Icon name="content_copy" size={14} /></button>
                      <button className="btn-g" style={{ padding: 6, borderRadius: 8 }}><Icon name="refresh" size={14} /></button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Activity Viz */}
          <GlassCard style={{ padding: '20px' } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span className="mono txt-3" style={{ fontSize: 10, letterSpacing: '0.1em' }}>ACTIVITY â€” 12H</span>
              <Chip variant="green" size="sm" style={{ fontSize: 8 }}>LIVE</Chip>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 60 }}>
              {[0.4, 0.6, 0.3, 0.8, 0.5, 0.9, 0.7, 1.0, 0.6, 0.4, 0.8, 0.5].map((h, i) => (
                <div key={i} style={{ 
                  flex: 1, 
                  height: `${h * 100}%`, 
                  background: 'linear-gradient(to top, #7c3aed, #00e5ff)',
                  borderRadius: '2px 2px 0 0',
                  opacity: 0.8
                }} />
              ))}
            </div>
          </GlassCard>

          {/* Node Grid Widget */}
          <GlassCard style={{ padding: '20px' } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span className="mono txt-3" style={{ fontSize: 10, letterSpacing: '0.1em' }}>NODE STATUS</span>
              <button 
                onClick={() => navigate('/nodes')}
                className="mono" 
                style={{ fontSize: 10, color: 'var(--txt3)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Manage
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { name: 'NODE-ALPHA', platform: 'Twitter', req: '1284 req', health: 90 },
                { name: 'NODE-BETA', platform: 'LinkedIn', req: '445 req', health: 87 },
                { name: 'NODE-GAMMA', platform: 'Reddit', req: '0 req', health: 100 },
                { name: 'NODE-DELTA', platform: 'Discord', req: '893 req', health: 84 },
              ].map((n, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: n.health > 90 ? 'var(--green)' : 'var(--amber)' }} />
                      <span style={{ fontSize: 11, fontWeight: 700 }}>{n.name}</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 800, color: n.health === 100 ? 'var(--green)' : '#fff' }}>{n.health}%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="mono txt-3" style={{ fontSize: 9 }}>{n.platform} â€¢ {n.req}</span>
                    <div style={{ width: 60, height: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: `${n.health}%`, height: '100%', background: n.health > 90 ? 'var(--green)' : 'var(--amber)' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <button 
            onClick={() => navigate('/generate')}
            className="btn-p" 
            style={{ width: '100%', padding: '14px', borderRadius: 12, justifyContent: 'center', gap: 10 }}
          >
            <Icon name="add" size={18} />
            New Generation
          </button>
        </div>
      </div>
    </div>
  )
}
