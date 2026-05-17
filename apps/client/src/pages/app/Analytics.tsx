import { useState } from 'react'
import { GlassCard, Chip, Icon } from '@/design-system/components'

const STATS = [
  { label: 'TOTAL REPLIES', value: '2,847', trend: '+12.4%', icon: 'forum', color: 'var(--cyan)' },
  { label: 'ENGAGEMENT RATE', value: '8.7%', trend: '+2.1%', icon: 'trending_up', color: 'var(--green)' },
  { label: 'AVG LATENCY', value: '142ms', trend: '-18ms', icon: 'speed', color: '#a78bfa' },
  { label: 'WIN RATE', value: '91%', trend: '+3.2%', icon: 'emoji_events', color: 'var(--amber)' },
]

const PLATFORMS = [
  { name: 'Twitter', count: '1,360', pct: 48, color: 'var(--cyan)' },
  { name: 'LinkedIn', count: '684', pct: 24, color: '#a78bfa' },
  { name: 'Reddit', count: '513', pct: 18, color: 'var(--amber)' },
  { name: 'Discord', count: '282', pct: 10, color: 'var(--red)' },
]

const TOP_PERSONAS = [
  { name: 'Nexus Architect', replies: '1,284', winRate: '94%', trend: '+12.4%', char: 'N', color: '#3b82f6' },
  { name: 'Ghost Analyst', replies: '892', winRate: '87%', trend: '+8.7%', char: 'G', color: 'var(--cyan)' },
  { name: 'Corporate Phantom', replies: '445', winRate: '83%', trend: '+5.2%', char: 'C', color: 'var(--amber)' },
]

export default function Analytics() {
  const [period, setPeriod] = useState('7d')

  return (
    <div className="enter">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <Chip variant="cyan" size="sm" style={{ marginBottom: 12, display: 'inline-flex' } as React.CSSProperties}>DATA LAYER</Chip>
          <h1 className="h-lg" style={{ fontSize: 44, marginBottom: 8 }}>
            Neural <span className="grad-c">Analytics</span>
          </h1>
          <p className="txt-2" style={{ fontSize: 15 }}>Performance metrics and engagement intelligence.</p>
        </div>
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 12, padding: 4 }}>
          {['24h', '7d', '30d', '90d'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: period === p ? 'rgba(255,255,255,0.05)' : 'transparent', color: period === p ? 'var(--cyan)' : 'var(--txt3)', fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>{p}</button>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 24 }}>
        {STATS.map((s, i) => (
          <GlassCard key={i} style={{ padding: '20px' } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span className="mono txt-3" style={{ fontSize: 10, letterSpacing: '0.1em' }}>{s.label}</span>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={s.icon} size={14} color="var(--txt3)" />
              </div>
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 10, fontFamily: 'var(--ff-disp)' }}>{s.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--green)', fontWeight: 800 }}>{s.trend}</span>
              <span className="mono txt-3" style={{ fontSize: 9 }}>vs prev</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        {/* Main Charts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <GlassCard style={{ padding: '24px' } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <span className="mono txt-3" style={{ fontSize: 10, letterSpacing: '0.1em' }}>REPLY VOLUME</span>
              <Chip variant="green" size="sm" style={{ fontSize: 8 }}>LIVE</Chip>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 160, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
              {[0.2, 0.4, 0.3, 0.6, 0.4, 0.8, 0.5, 0.3, 0.7, 0.5, 0.4, 0.6, 0.8, 1.0].map((h, i) => (
                <div key={i} style={{ 
                  flex: 1, 
                  height: `${h * 100}%`, 
                  background: 'linear-gradient(to top, rgba(0, 229, 255, 0.1), var(--cyan))',
                  borderRadius: '2px 2px 0 0',
                  opacity: 0.8
                }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                <span key={d} className="mono txt-3" style={{ fontSize: 10 }}>{d}</span>
              ))}
            </div>
          </GlassCard>

          <GlassCard style={{ padding: '24px' } as React.CSSProperties}>
            <div className="mono txt-3" style={{ fontSize: 10, letterSpacing: '0.1em', marginBottom: 32 }}>PLATFORM BREAKDOWN</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {PLATFORMS.map((p, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.color }} />
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{p.name}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <span className="mono txt-2" style={{ fontSize: 11 }}>{p.count} replies</span>
                      <span className="mono" style={{ fontSize: 11, fontWeight: 800, color: p.color }}>{p.pct}%</span>
                    </div>
                  </div>
                  <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                    <div style={{ width: `${p.pct}%`, height: '100%', background: p.color, borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <GlassCard style={{ padding: '24px' } as React.CSSProperties}>
            <div className="mono txt-3" style={{ fontSize: 10, letterSpacing: '0.1em', marginBottom: 24 }}>TOP PERSONAS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {TOP_PERSONAS.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    background: p.color, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: 16, 
                    fontWeight: 800, 
                    color: '#fff' 
                  }}>{p.char}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{p.name}</span>
                      <span style={{ fontSize: 11, color: 'var(--green)', fontWeight: 800 }}>{p.trend}</span>
                    </div>
                    <div className="mono txt-3" style={{ fontSize: 10 }}>{p.replies} replies â€¢ {p.winRate} win</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard style={{ padding: '24px' } as React.CSSProperties}>
            <div className="mono txt-3" style={{ fontSize: 10, letterSpacing: '0.1em', marginBottom: 24 }}>AI INSIGHTS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', gap: 14 }}>
                <Icon name="lightbulb" size={18} color="var(--cyan)" />
                <p className="txt-2" style={{ fontSize: 12.5, lineHeight: 1.6 }}>Twitter engagement peaks between 9-11 AM EST</p>
              </div>
              <div style={{ display: 'flex', gap: 14 }}>
                <Icon name="article" size={18} color="var(--cyan)" />
                <p className="txt-2" style={{ fontSize: 12.5, lineHeight: 1.6 }}>Provocative tone +18% engagement on Reddit</p>
              </div>
              <div style={{ display: 'flex', gap: 14 }}>
                <Icon name="info" size={18} color="var(--cyan)" />
                <p className="txt-2" style={{ fontSize: 12.5, lineHeight: 1.6 }}>Consider activating NODE-GAMMA for Reddit coverage</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
