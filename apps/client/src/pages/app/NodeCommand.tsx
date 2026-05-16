import { GlassCard, Chip, PulseDot, Icon } from '@/design-system/primitives'
import { MOCK_NODES } from '@/data/mock/nodes'
import { useNodeStore } from '@/store/useNodeStore'
import type { NodeStatus } from '@/types'

const STATUS_DOT_COLOR: Record<NodeStatus, 'green' | 'red' | 'cyan'> = {
  active: 'green',
  idle:   'cyan',
  error:  'red',
}

export default function NodeCommand() {
  const { statuses, toggleStatus } = useNodeStore()

  return (
    <div className="enter">
      <div style={{ marginBottom: 22 }}>
        <Chip variant="green" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>OPERATIONS</Chip>
        <h1 className="h-md">Node <span className="txt-c">Command Center</span></h1>
        <p className="txt-2" style={{ fontSize: 13.5, marginTop: 4 }}>Orchestrate your neural network from a single command center.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {MOCK_NODES.map(node => {
          const overrideStatus = statuses[node.id]
          const effectiveStatus: NodeStatus = overrideStatus ?? node.status
          return (
            <GlassCard key={node.id} className="hover-glow" style={{ padding: '20px 24px' } as React.CSSProperties}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: 16, alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <PulseDot color={STATUS_DOT_COLOR[effectiveStatus]} size={7} />
                  <span style={{ fontFamily: 'var(--ff-mono)', fontWeight: 700, fontSize: 12 }}>{node.name}</span>
                </div>

                <div style={{ display: 'flex', gap: 20 }}>
                  {[['PLATFORM', node.platform.toUpperCase()], ['PERSONA', node.persona], ['UPTIME', node.uptime], ['REQUESTS', node.requests.toLocaleString()]].map(([l, v]) => (
                    <div key={l}>
                      <div className="mono txt-2" style={{ fontSize: 8 }}>{l}</div>
                      <div style={{ fontSize: 12, fontWeight: 500 }}>{v}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div>
                    <div className="mono txt-2" style={{ fontSize: 8, marginBottom: 4 }}>HEALTH</div>
                    <div className="mono" style={{ fontSize: 14, color: node.health > 95 ? 'var(--green)' : node.health > 80 ? 'var(--amber)' : 'var(--red)' }}>{node.health}%</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="btn-g btn-sm"
                    onClick={() => toggleStatus(node.id)}
                    aria-label={`${effectiveStatus === 'active' ? 'Deactivate' : 'Activate'} ${node.name}`}
                    style={{ color: effectiveStatus === 'active' ? 'var(--red)' : 'var(--green)', borderColor: effectiveStatus === 'active' ? 'rgba(248,113,113,0.2)' : 'rgba(52,211,153,0.2)' }}
                  >
                    <Icon name={effectiveStatus === 'active' ? 'stop' : 'play_arrow'} size={12} aria-hidden />
                    {effectiveStatus === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}
