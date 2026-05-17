import { useState, useEffect } from 'react'
import { GlassCard, Chip, Icon, ProgressBar } from '@/design-system/components'

const REGIONS = [
  { name: 'North America', pct: 38, nodes: 142, color: 'var(--cyan)' },
  { name: 'Europe',        pct: 28, nodes: 98,  color: '#a78bfa' },
  { name: 'Asia Pacific',  pct: 22, nodes: 74,  color: 'var(--amber)' },
  { name: 'South America', pct: 8,  nodes: 21,  color: 'var(--green)' },
]

const DOTS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: 10 + (Math.random() * 80),
  y: 10 + (Math.random() * 60),
  active: Math.random() > 0.4,
  color: ['var(--cyan)', '#a78bfa', 'var(--green)', 'var(--amber)'][i % 4],
}))

export default function GlobalTelemetry() {
  const [velocity, setVelocity] = useState<number[]>([40, 50, 45, 60, 55, 70, 65, 80, 75, 90])

  useEffect(() => {
    const iv = setInterval(() => {
      setVelocity(prev => [...prev.slice(1), Math.floor(Math.random() * 40) + 50])
    }, 3000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="enter">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <Chip variant="green" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>GLOBAL_NETWORK</Chip>
          <h1 className="h-md">Neural <span className="grad-c">Telemetry</span></h1>
          <p className="txt-2" style={{ fontSize: 13.5, marginTop: 4 }}>Real-time traffic orchestration across distributed operator clusters.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div className="glass" style={{ padding: '8px 14px' }}>
            <div className="mono txt-2" style={{ fontSize: 9 }}>TRAFFIC_P99</div>
            <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--cyan)' }}>142ms</div>
          </div>
          <div className="glass" style={{ padding: '8px 14px' }}>
            <div className="mono txt-2" style={{ fontSize: 9 }}>ACTIVE_NODES</div>
            <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--green)' }}>3,842</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Map */}
          <GlassCard style={{ padding: '24px', position: 'relative', overflow: 'hidden' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>GEOGRAPHIC_DISTRIBUTION</div>
            <div style={{ position: 'relative', width: '100%', height: 320, background: 'rgba(255,255,255,0.01)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <svg width="100%" height="100%" viewBox="0 0 100 80">
                {DOTS.map(d => (
                  <g key={d.id}>
                    {d.active && (
                      <circle cx={d.x} cy={d.y} r="2" fill={d.color} opacity="0.15" className="pulse-slow" />
                    )}
                    <circle cx={d.x} cy={d.y} r={d.active ? 0.6 : 0.4} fill={d.active ? d.color : 'rgba(255,255,255,0.1)'} />
                  </g>
                ))}
              </svg>
              <div style={{ position: 'absolute', bottom: 16, left: 16, padding: '8px 12px', background: 'rgba(0,0,0,0.4)', borderRadius: 8, border: '1px solid var(--border)' }}>
                <div className="mono" style={{ fontSize: 9 }}>SYSTEM_HEARTBEAT</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />
                  <span style={{ fontSize: 11, fontWeight: 700 }}>SYNCHRONIZED</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Traffic Chart */}
          <GlassCard style={{ padding: '24px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 20 }}>TRAFFIC_VELOCITY_PULSE</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 80, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
              {velocity.map((v, i) => (
                <div key={i} style={{ flex: 1, height: `${v}%`, background: 'var(--cyan)', borderRadius: '2px 2px 0 0', opacity: 0.3 + (i / 10) * 0.7 }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
              <span className="mono txt-2" style={{ fontSize: 9 }}>00:00:00</span>
              <span className="mono txt-c" style={{ fontSize: 10 }}>REQUEST_SURGE DETECTED</span>
              <span className="mono txt-2" style={{ fontSize: 9 }}>LIVE</span>
            </div>
          </GlassCard>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <GlassCard style={{ padding: '20px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>REGIONAL_LOAD</div>
            {REGIONS.map(r => (
              <div key={r.name} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12 }}>{r.name.toUpperCase()}</span>
                  <span className="mono" style={{ fontSize: 10, color: r.color }}>{r.nodes} NODES</span>
                </div>
                <ProgressBar value={r.pct} color={r.color} height={4} />
              </div>
            ))}
          </GlassCard>

          <GlassCard style={{ padding: '20px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>INFRASTRUCTURE_NODES</div>
            {[
              { n: 'Shadow-X', l: 'NY, USA', s: 'OPTIMAL' },
              { n: 'Shadow-V', l: 'London, UK', s: 'STABLE' },
              { n: 'Shadow-Z', l: 'Tokyo, JP', s: 'LATENCY_WARNING' },
            ].map((n, i) => (
              <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 8, marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{n.n}</span>
                  <span className="mono" style={{ fontSize: 9, color: n.s === 'OPTIMAL' ? 'var(--green)' : n.s === 'STABLE' ? 'var(--cyan)' : 'var(--amber)' }}>{n.s}</span>
                </div>
                <div className="mono txt-2" style={{ fontSize: 9 }}>{n.l}</div>
              </div>
            ))}
          </GlassCard>

          <GlassCard variant="elevated" style={{ padding: '20px', background: 'rgba(34,197,94,0.03)' } as React.CSSProperties}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Icon name="check_circle" size={18} color="var(--green)" />
              <span className="mono" style={{ fontSize: 12 }}>NETWORK_STABLE</span>
            </div>
            <p className="txt-2" style={{ fontSize: 11, lineHeight: 1.6 }}>
              Global consensus reached across 100% of nodes. Latency within SLA parameters (200ms).
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
