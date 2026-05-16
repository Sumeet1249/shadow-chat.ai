// SystemTelemetry stub — Phase 7 implementation
import { GlassCard, Chip, ProgressBar,} from '@/design-system/primitives'

const METRICS = [
  { label: 'CPU Usage',        value: 34, color: 'var(--cyan)' },
  { label: 'Memory',           value: 62, color: '#a78bfa' },
  { label: 'Network I/O',      value: 28, color: 'var(--green)' },
  { label: 'Disk Read/Write',  value: 15, color: 'var(--amber)' },
]

export default function SystemTelemetry() {
  return (
    <div className="enter">
      <div style={{ marginBottom: 22 }}>
        <Chip variant="cyan" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>SYSTEM</Chip>
        <h1 className="h-md">System <span className="grad-c">Telemetry</span></h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {METRICS.map(m => (
          <GlassCard key={m.label} style={{ padding: '22px 24px' } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="mono txt-2" style={{ fontSize: 10 }}>{m.label.toUpperCase()}</span>
              <span className="mono" style={{ fontSize: 14, color: m.color, fontWeight: 700 }}>{m.value}%</span>
            </div>
            <ProgressBar value={m.value} color={m.color} height={6} />
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
