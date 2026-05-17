import { useState } from 'react'
import { GlassCard, Chip, Icon } from '@/design-system/components'

const FILTERS = ['All', 'Trending', 'Tech', 'Crypto', 'Business', 'Creative', 'Community']

const TEMPLATES = [
  {
    id: 1,
    name: 'Alpha Trader',
    cat: 'Aggressive â€¢ Crypto',
    desc: 'High-conviction market calls with zero hedging.',
    rating: 4.8,
    installs: '2,840',
    author: 'shadow_labs',
    char: 'A',
    color: 'var(--amber)'
  },
  {
    id: 2,
    name: 'Thought Leader',
    cat: 'Visionary â€¢ Tech',
    desc: 'LinkedIn-optimized thought leadership content.',
    rating: 4.7,
    installs: '3,120',
    author: 'neural_forge',
    char: 'T',
    color: '#3b82f6'
  },
  {
    id: 3,
    name: 'Code Mentor',
    cat: 'Helpful â€¢ Dev',
    desc: 'Technical explanations that make complex concepts clear.',
    rating: 4.9,
    installs: '1,890',
    author: 'adev_shadow',
    char: 'C',
    color: 'var(--green)'
  },
  {
    id: 4,
    name: 'Debate Lord',
    cat: 'Provocative â€¢ General',
    desc: 'Never backs down. Always has receipts.',
    rating: 4.5,
    installs: '4,210',
    author: 'arena_master',
    char: 'D',
    color: 'var(--red)'
  },
  {
    id: 5,
    name: 'Zen Advisor',
    cat: 'Empathetic â€¢ Health',
    desc: 'Thoughtful, measured responses with emotional intelligence.',
    rating: 4.6,
    installs: '1,560',
    author: 'calm_node',
    char: 'Z',
    color: 'var(--cyan)'
  },
  {
    id: 6,
    name: 'Data Scientist',
    cat: 'Technical â€¢ Science',
    desc: 'Stats-driven analysis with rigorous methodology.',
    rating: 4.8,
    installs: '2,100',
    author: 'quant_shadow',
    char: 'D',
    color: '#a78bfa'
  }
]

export default function Marketplace() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')

  return (
    <div className="enter">
      {/* Header Area */}
      <div style={{ marginBottom: 32 }}>
        <Chip variant="amber" size="sm" style={{ marginBottom: 12, display: 'inline-flex' } as React.CSSProperties}>COMMUNITY</Chip>
        <h1 className="h-lg" style={{ fontSize: 44, marginBottom: 8 }}>
          Neural <span style={{ color: 'var(--amber)' }}>Marketplace</span>
        </h1>
        <p className="txt-2" style={{ fontSize: 15 }}>Browse and install community-built persona templates.</p>
      </div>

      {/* Search and Filters */}
      <div style={{ position: 'relative', marginBottom: 20, display: 'flex', alignItems: 'center' }}>
        <Icon name="search" size={18} color="var(--txt3)" style={{ position: 'absolute', left: 16, zIndex: 1 }} />
        <input 
          type="text" 
          placeholder="Search personas..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ 
            width: '100%', 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid var(--border)', 
            borderRadius: 12, 
            padding: '14px 18px 14px 48px',
            color: 'var(--txt)',
            fontSize: 14,
            outline: 'none',
            height: 52
          }}
        />
        <div style={{ position: 'absolute', right: 16, top: 14, display: 'flex', gap: 8 }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                border: activeFilter === f ? '1px solid var(--cyan)' : '1px solid var(--border)',
                background: activeFilter === f ? 'var(--cyan)20' : 'transparent',
                color: activeFilter === f ? 'var(--cyan)' : 'var(--txt3)',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {TEMPLATES.map(t => (
          <GlassCard key={t.id} style={{ padding: '24px', display: 'flex', flexDirection: 'column' } as React.CSSProperties}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{ 
                width: 48, 
                height: 48, 
                borderRadius: '50%', 
                background: t.color, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: 18, 
                fontWeight: 800, 
                color: '#fff' 
              }}>{t.char}</div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 2 }}>{t.name}</h3>
                <p className="txt-3" style={{ fontSize: 11 }}>{t.cat}</p>
              </div>
            </div>

            <p className="txt-2" style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 20, flex: 1 }}>{t.desc}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <Icon key={i} name="star" size={12} color={i <= 4 ? 'var(--amber)' : 'rgba(255,255,255,0.1)'} />
                ))}
                <span className="mono" style={{ fontSize: 11, marginLeft: 6 }}>{t.rating}</span>
              </div>
              <span className="mono txt-3" style={{ fontSize: 10 }}>{t.installs} installs</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <span className="mono txt-3" style={{ fontSize: 11 }}>by @{t.author}</span>
              <button className="btn-c" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 11 }}>
                <Icon name="download" size={14} /> Install
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
