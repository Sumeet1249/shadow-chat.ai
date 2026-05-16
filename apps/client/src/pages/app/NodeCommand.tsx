import { useState } from 'react'
import { GlassCard, Chip, PulseDot, Icon, Button } from '@/design-system/primitives'
import { MOCK_NODES } from '@/data/mock/nodes'
import { useNodeStore } from '@/store/useNodeStore'
import type { NodeStatus } from '@/types'

const STATUS_INFO: Record<NodeStatus, { color: string; label: string }> = {
  active: { color: 'var(--green)', label: 'OPERATIONAL' },
  idle:   { color: 'var(--cyan)', label: 'IDLE' },
  error:  { color: 'var(--red)', label: 'FAULT' },
}

/** NodeVisualizer — Simulated 3D Blueprint of the cluster */
function NodeVisualizer() {
  return (
    <GlassCard style={{ height: 180, marginBottom: 22, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' } as React.CSSProperties}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(var(--cyan) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <svg width="400" height="140" viewBox="0 0 400 140" style={{ filter: 'drop-shadow(0 0 15px var(--cyan)40)' }}>
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--cyan)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Central Core */}
        <circle cx="200" cy="70" r="4" fill="var(--cyan)" className="pulse" />
        <circle cx="200" cy="70" r="12" fill="none" stroke="var(--cyan)" strokeWidth="0.5" opacity="0.3" />
        
        {/* Nodes */}
        {[
          { x: 80, y: 40 }, { x: 320, y: 40 },
          { x: 80, y: 100 }, { x: 320, y: 100 },
          { x: 140, y: 70 }, { x: 260, y: 70 }
        ].map((p, i) => (
          <g key={i}>
            <line x1="200" y1="70" x2={p.x} y2={p.y} stroke="url(#lineGrad)" strokeWidth="0.5" opacity="0.6" />
            <circle cx={p.x} cy={p.y} r="3" fill={i % 3 === 0 ? 'var(--green)' : 'var(--cyan)'} />
            <circle cx={p.x} cy={p.y} r="8" fill="none" stroke="var(--cyan)" strokeWidth="0.2" opacity="0.4" />
          </g>
        ))}
      </svg>
      <div style={{ position: 'absolute', bottom: 12, left: 18 }} className="mono txt-2" style={{ fontSize: 9 }}>CLUSTER_VISUALIZATION_v4.1</div>
    </GlassCard>
  )
}

export default function NodeCommand() {
  const { statuses, toggleStatus } = useNodeStore()
  const [filter, setFilter] = useState('all')

  const filteredNodes = MOCK_NODES.filter(n => {
    if (filter === 'active') return (statuses[n.id] ?? n.status) === 'active'
    return true
  })

  return (
    <div className="enter">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 22 }}>
        <div>
          <Chip variant="green" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>CLUSTER_CONTROL</Chip>
          <h1 className="h-md">Node <span className="grad-c">Command Center</span></h1>
          <p className="txt-2" style={{ fontSize: 13.5, marginTop: 4 }}>Orchestrate autonomous neural nodes across distributed infrastructure.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="ghost" style={{ padding: '8px 12px' }}><Icon name="refresh" size={14} /> Re-Sync</Button>
          <Button variant="primary" style={{ padding: '8px 16px' }}><Icon name="rocket_launch" size={14} /> Deploy All</Button>
        </div>
      </div>

      <NodeVisualizer />

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '0 4px' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setFilter('all')} className={`mono ${filter === 'all' ? 'txt-c' : 'txt-2'}`} style={{ background: 'none', border: 'none', fontSize: 10, cursor: 'pointer' }}>ALL_NODES ({MOCK_NODES.length})</button>
          <div style={{ width: 1, height: 10, background: 'var(--border)' }} />
          <button onClick={() => setFilter('active')} className={`mono ${filter === 'active' ? 'txt-c' : 'txt-2'}`} style={{ background: 'none', border: 'none', fontSize: 10, cursor: 'pointer' }}>OPERATIONAL</button>
        </div>
        <div className="mono txt-2" style={{ fontSize: 9 }}>LATENCY_P99: 142MS</div>
      </div>

      {/* Node Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
        {filteredNodes.map(node => {
          const overrideStatus = statuses[node.id]
          const effectiveStatus: NodeStatus = overrideStatus ?? node.status
          const info = STATUS_INFO[effectiveStatus]

          return (
            <GlassCard key={node.id} className="hover-glow" style={{ padding: '20px 24px' } as React.CSSProperties}>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 180px 140px', gap: 20, alignItems: 'center' }}>
                
                {/* Node Identity */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name="hub" size={20} color={info.color} />
                    </div>
                    <div style={{ position: 'absolute', bottom: -2, right: -2 }}>
                      <PulseDot color={effectiveStatus === 'active' ? 'green' : 'cyan'} size={8} />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{node.name}</div>
                    <div className="mono" style={{ fontSize: 9, color: info.color }}>{info.label}</div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div style={{ display: 'flex', gap: 24 }}>
                  {[
                    { l: 'PLATFORM', v: node.platform },
                    { l: 'UPTIME', v: node.uptime },
                    { l: 'REQUESTS', v: node.requests.toLocaleString() }
                  ].map(s => (
                    <div key={s.l}>
                      <div className="mono txt-2" style={{ fontSize: 8, marginBottom: 4 }}>{s.l}</div>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{s.v}</div>
                    </div>
                  ))}
                </div>

                {/* Health & Latency */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="mono txt-2" style={{ fontSize: 9 }}>NODE_HEALTH</span>
                    <span className="mono" style={{ fontSize: 10, color: node.health > 95 ? 'var(--green)' : 'var(--amber)' }}>{node.health}%</span>
                  </div>
                  <div style={{ height: 4, width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                    <div style={{ height: '100%', width: `${node.health}%`, background: node.health > 95 ? 'var(--green)' : 'var(--amber)', borderRadius: 2 }} />
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => toggleStatus(node.id)}
                    className="btn-g btn-sm"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <Icon name={effectiveStatus === 'active' ? 'stop' : 'play_arrow'} size={12} />
                    {effectiveStatus === 'active' ? 'STOP' : 'START'}
                  </button>
                  <button className="btn-g btn-sm" style={{ padding: '0 10px' }}>
                    <Icon name="terminal" size={12} />
                  </button>
                </div>

              </div>
            </GlassCard>
          )
        })}
      </div>

      {/* Bulk Danger Zone */}
      <div style={{ marginTop: 32, padding: '24px', border: '1px solid rgba(248,113,113,0.15)', background: 'rgba(248,113,113,0.03)', borderRadius: 'var(--r-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--red)', marginBottom: 4 }}>EMERGENCY OVERRIDE</div>
          <p className="txt-2" style={{ fontSize: 13 }}>Immediately terminate all active neural nodes and flush session buffers.</p>
        </div>
        <Button variant="primary" style={{ background: 'var(--red)', color: '#fff', border: 'none', padding: '12px 24px' }}>
          <Icon name="warning" size={14} /> HALT ALL OPERATIONS
        </Button>
      </div>
    </div>
  )
}
