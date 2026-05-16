// GlobalTelemetry — Phase 6.5 stub
import { GlassCard, Chip, ProgressBar } from '@/design-system/primitives'

const REGIONS = [
  { name: 'North America', pct: 38, nodes: 4, color: 'var(--cyan)' },
  { name: 'Europe',        pct: 28, nodes: 3, color: '#a78bfa' },
  { name: 'Asia Pacific',  pct: 22, nodes: 2, color: 'var(--amber)' },
  { name: 'South America', pct: 8,  nodes: 1, color: 'var(--green)' },
  { name: 'Other',         pct: 4,  nodes: 0, color: 'var(--txt3)' },
]

const DOTS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: 10 + (i * 17.3) % 80,
  y: 15 + (i * 11.7) % 65,
  active: Math.random() > 0.7,
  color: ['var(--cyan)', '#a78bfa', 'var(--green)'][i % 3],
}))

export default function GlobalTelemetry() {
  return (
    <div className="enter">
      <div style={{ marginBottom: 22 }}>
        <Chip variant="green" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>TELEMETRY</Chip>
        <h1 className="h-md">Global <span className="txt-c">Telemetry</span></h1>
      </div>

      <GlassCard style={{ padding: '24px', marginBottom: 16 } as React.CSSProperties}>
        <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>GEOGRAPHIC DISTRIBUTION</div>
        <div style={{ position: 'relative', width: '100%', height: 280, background: 'rgba(0,229,255,0.02)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
          {/* SVG dot map */}
          <svg width="100%" height="100%" viewBox="0 0 100 80" aria-label="World map showing operator node distribution">
            {DOTS.map(d => (
              <circle
                key={d.id}
                cx={d.x}
                cy={d.y}
                r={d.active ? 0.6 : 0.35}
                fill={d.active ? d.color : 'rgba(255,255,255,0.15)'}
                opacity={d.active ? 0.9 : 0.4}
              />
            ))}
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div className="mono txt-2" style={{ fontSize: 9, letterSpacing: '0.1em', background: 'rgba(4,8,16,0.7)', padding: '4px 10px', borderRadius: 4 }}>
              4,239 operators · 187 countries
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard style={{ padding: '22px 24px' } as React.CSSProperties}>
        <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>REGIONAL BREAKDOWN</div>
        {REGIONS.map(r => (
          <div key={r.name} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 13 }}>{r.name}</span>
                <span className="mono txt-2" style={{ fontSize: 9 }}>{r.nodes} nodes</span>
              </div>
              <span className="mono" style={{ fontSize: 10, color: r.color }}>{r.pct}%</span>
            </div>
            <ProgressBar value={r.pct} color={r.color} />
          </div>
        ))}
      </GlassCard>
    </div>
  )
}
