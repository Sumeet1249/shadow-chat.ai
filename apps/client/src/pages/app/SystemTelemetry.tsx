import { useState, useEffect } from 'react'
import { GlassCard, Chip, Icon, Button } from '@/design-system/primitives'

/** CircularGauge — SVG-based radial progress indicator */
function CircularGauge({ value, label, color }: { value: number; label: string; color: string }) {
  const r = 40;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;

  return (
    <GlassCard style={{ padding: '24px', textAlign: 'center' } as React.CSSProperties}>
      <div style={{ position: 'relative', width: 100, height: 100, margin: '0 auto 16px' }}>
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)', filter: `drop-shadow(0 0 5px ${color}40)` }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 20, color }}>
          {value}%
        </div>
      </div>
      <div className="mono txt-2" style={{ fontSize: 10, letterSpacing: '0.08em' }}>{label.toUpperCase()}</div>
    </GlassCard>
  )
}

export default function SystemTelemetry() {
  const [metrics, setMetrics] = useState({ cpu: 34, ram: 62, net: 28, disk: 15 })

  useEffect(() => {
    const iv = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.min(99, Math.max(10, prev.cpu + (Math.random() * 10 - 5))),
        ram: Math.min(99, Math.max(10, prev.ram + (Math.random() * 4 - 2))),
        net: Math.min(99, Math.max(5, prev.net + (Math.random() * 20 - 10))),
        disk: Math.min(99, Math.max(2, prev.disk + (Math.random() * 6 - 3))),
      }))
    }, 2000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="enter">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <Chip variant="cyan" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>INFRASTRUCTURE</Chip>
          <h1 className="h-md">System <span className="grad-c">Telemetry</span></h1>
          <p className="txt-2" style={{ fontSize: 13.5, marginTop: 4 }}>Real-time monitoring of neural node clusters and compute resources.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="ghost" style={{ padding: '8px 12px' }}><Icon name="refresh" size={14} /> Re-Sync</Button>
          <Button variant="primary" style={{ padding: '8px 16px' }}><Icon name="settings" size={14} /> Optimize</Button>
        </div>
      </div>

      {/* Top Gauges Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 22 }}>
        <CircularGauge value={Math.round(metrics.cpu)} label="CPU Load" color="var(--cyan)" />
        <CircularGauge value={Math.round(metrics.ram)} label="RAM Allocation" color="#a78bfa" />
        <CircularGauge value={Math.round(metrics.net)} label="Network I/O" color="var(--green)" />
        <CircularGauge value={Math.round(metrics.disk)} label="Disk Cache" color="var(--amber)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 18 }}>
        {/* Left: Performance Monitor (Simulated Grid Map) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <GlassCard style={{ padding: '24px' } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span className="mono txt-2" style={{ fontSize: 10 }}>MEMORY ALLOCATION MAP</span>
              <Chip variant="green" size="sm">ACTIVE</Chip>
            </div>
            {/* 12x24 grid of small blocks */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(24, 1fr)', gap: 4 }}>
              {Array.from({ length: 288 }).map((_, i) => {
                const isActive = Math.random() > (1 - metrics.ram / 100)
                return (
                  <div
                    key={i}
                    style={{
                      aspectRatio: '1',
                      background: isActive ? 'var(--cyan)' : 'rgba(255,255,255,0.03)',
                      borderRadius: 1,
                      opacity: isActive ? 0.4 + Math.random() * 0.6 : 1,
                      boxShadow: isActive ? '0 0 4px var(--cyan)40' : 'none'
                    }}
                  />
                )
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 8, height: 8, background: 'var(--cyan)', borderRadius: 1 }} />
                  <span className="mono txt-2" style={{ fontSize: 9 }}>ALLOCATED</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 8, height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 1 }} />
                  <span className="mono txt-2" style={{ fontSize: 9 }}>FREE</span>
                </div>
              </div>
              <span className="mono txt-2" style={{ fontSize: 9 }}>BLOCK_SIZE: 64MB</span>
            </div>
          </GlassCard>

          <GlassCard style={{ padding: '24px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>NEURAL ENGINE LOGS</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--txt2)', lineHeight: 1.8 }}>
              <div style={{ color: 'var(--green)' }}>[04:22:15] NODE_ALPHA: Connection established with Twitter_API_v2</div>
              <div>[04:22:18] PERSONA_ENGINE: Loading weights for 'Nexus Architect'...</div>
              <div>[04:22:21] INFERENCE: Latency 142ms | Tokens 244 | P99 Pass</div>
              <div style={{ color: 'var(--amber)' }}>[04:22:30] WARNING: Memory usage approaching soft-limit (85%)</div>
              <div>[04:22:45] NODE_BETA: Heartbeat detected from secondary cluster</div>
              <div style={{ display: 'flex', gap: 4 }}>[04:23:02] CACHE_MANAGER: Flushed 1.2GB stale context data <span className="blink">_</span></div>
            </div>
          </GlassCard>
        </div>

        {/* Right: Cluster Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <GlassCard style={{ padding: '20px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>NODE CLUSTER v2</div>
            {[
              { n: 'Shadow-Alpha', s: 'ONLINE', l: '12ms', u: 44 },
              { n: 'Shadow-Beta', s: 'ONLINE', l: '18ms', u: 62 },
              { n: 'Shadow-Gamma', s: 'STANDBY', l: '--', u: 0 },
              { n: 'Shadow-Delta', s: 'ONLINE', l: '14ms', u: 31 },
            ].map((node, i) => (
              <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 8, marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{node.n}</span>
                  <Chip variant={node.s === 'ONLINE' ? 'green' : 'amber'} size="sm">{node.s}</Chip>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="mono txt-2" style={{ fontSize: 10 }}>LATENCY: {node.l}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, marginLeft: 20 }}>
                    <div style={{ height: 4, flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                      <div style={{ height: '100%', width: `${node.u}%`, background: 'var(--cyan)', borderRadius: 2 }} />
                    </div>
                    <span className="mono" style={{ fontSize: 10 }}>{node.u}%</span>
                  </div>
                </div>
              </div>
            ))}
          </GlassCard>

          <GlassCard variant="elevated" style={{ padding: '20px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 12 }}>SECURITY STATUS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--green)', marginBottom: 12 }}>
              <Icon name="shield" size={18} />
              <span className="mono" style={{ fontSize: 12 }}>AES-256 ENCRYPTION ACTIVE</span>
            </div>
            <p className="txt-2" style={{ fontSize: 11.5, lineHeight: 1.6 }}>
              All neural traffic is tunneled through a distributed VPN mesh. Your private keys are stored in a local-only HSM.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
