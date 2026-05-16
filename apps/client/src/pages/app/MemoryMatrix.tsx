import { useState } from 'react'
import { GlassCard, Chip, Icon } from '@/design-system/primitives'

const MEMORIES = [
  {
    id: 1,
    key: 'ai_infrastructure',
    tag: 'Tech/AI',
    status: 'INJECTED',
    time: '2h ago',
    desc: 'Focus on edge computing, latency optimization, and ML pipeline orchestration'
  },
  {
    id: 2,
    key: 'crypto_thesis',
    tag: 'Crypto',
    status: 'INJECTED',
    time: '1d ago',
    desc: 'Bullish on L2 scaling solutions, particularly optimistic rollups with data availability layers'
  },
  {
    id: 3,
    key: 'writing_style',
    tag: 'General',
    status: 'INJECTED',
    time: '3d ago',
    desc: 'Short paragraphs, bold claims backed by data, avoid hedging language'
  },
  {
    id: 4,
    key: 'competitor_map',
    tag: 'Business',
    status: 'INJECTED',
    time: '5d ago',
    desc: 'Main competitors: Typefully, Hypefury, Tweet Hunter â€” differentiate on AI depth'
  }
]

export default function MemoryMatrix() {
  const [search, setSearch] = useState('')

  return (
    <div className="enter">
      {/* Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <Chip variant="cyan" size="sm" style={{ marginBottom: 12, display: 'inline-flex' } as React.CSSProperties}>INTELLIGENCE</Chip>
          <h1 className="h-lg" style={{ fontSize: 44, marginBottom: 8 }}>
            Memory <span className="grad-c">Matrix</span>
          </h1>
          <p className="txt-2" style={{ fontSize: 15 }}>6 entries â€¢ 4 actively injected</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-g" style={{ padding: '10px 20px', borderRadius: 12 }}>
            <Icon name="hub" size={16} /> Graph View
          </button>
          <button className="btn-p" style={{ padding: '10px 20px', borderRadius: 12 }}>
            <Icon name="add" size={16} /> Add Memory
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: 32, display: 'flex', alignItems: 'center' }}>
        <Icon name="search" size={18} color="var(--txt3)" style={{ position: 'absolute', left: 16, zIndex: 1 }} />
        <input 
          type="text" 
          placeholder="Search memories..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ 
            width: '100%', 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid var(--border)', 
            borderRadius: 12, 
            padding: '14px 14px 14px 48px',
            color: 'var(--txt)',
            fontSize: 14,
            outline: 'none',
            height: 48
          }}
        />
      </div>

      {/* Memory List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {MEMORIES.map(m => (
          <GlassCard key={m.id} style={{ padding: '24px' } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span className="mono" style={{ fontSize: 15, fontWeight: 800, color: 'var(--cyan)' }}>{m.key}</span>
                <Chip variant="violet" size="sm" style={{ fontSize: 9 }}>{m.tag}</Chip>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Chip variant="green" size="sm" style={{ fontSize: 9 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', marginRight: 6, display: 'inline-block' }} />
                  {m.status}
                </Chip>
                <span className="mono txt-3" style={{ fontSize: 11 }}>{m.time}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <p className="txt-2" style={{ fontSize: 14, maxWidth: '80%', lineHeight: 1.6 }}>{m.desc}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Icon name="edit" size={14} color="var(--txt3)" />
                </div>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Icon name="toggle_on" size={14} color="var(--green)" />
                </div>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Icon name="delete" size={14} color="var(--red)" />
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
