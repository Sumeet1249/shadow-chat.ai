import { useState } from 'react'
import { GlassCard, Chip, Icon } from '@/design-system/primitives'

const FILTERS = ['All', 'Generated', 'Engagement', 'Nodes', 'Alerts']

const FEED_ITEMS = [
  {
    id: 1,
    title: 'Reply generated for @elonmusk thread',
    persona: 'Nexus Architect',
    platform: 'TWITTER',
    type: 'GENERATED',
    time: '12s ago',
    icon: 'forum',
    color: 'var(--cyan)'
  },
  {
    id: 2,
    title: '+847 engagements on viral take about AI infra',
    persona: 'Nexus Architect',
    platform: 'TWITTER',
    type: 'VIRAL',
    time: '2m ago',
    icon: 'trending_up',
    color: 'var(--amber)'
  },
  {
    id: 3,
    title: 'NODE-ALPHA processed 42 requests in last 5 min',
    type: 'OPERATIONAL',
    time: '3m ago',
    icon: 'hub',
    color: 'var(--cyan)'
  },
  {
    id: 4,
    title: "LinkedIn post drafted: 'After 3 years in ML...'",
    persona: 'Corporate Phantom',
    platform: 'LINKEDIN',
    type: 'GENERATED',
    time: '8m ago',
    icon: 'edit_note',
    color: '#a78bfa'
  },
  {
    id: 5,
    title: "NODE-GAMMA idle for 2+ hours â€” consider activation",
    type: 'WARNING',
    time: '14m ago',
    icon: 'warning',
    color: 'var(--red)'
  },
  {
    id: 6,
    title: '+1.2K upvotes on RAG vs fine-tuning reply',
    persona: 'Ghost Analyst',
    platform: 'REDDIT',
    type: 'TOP',
    time: '22m ago',
    icon: 'trending_up',
    color: 'var(--amber)'
  },
  {
    id: 7,
    title: 'Model switched to claude-3.5-sonnet (lower latency)',
    type: 'SYSTEM',
    time: '35m ago',
    icon: 'settings_input_antenna',
    color: 'var(--cyan)'
  }
]

export default function SignalFeed() {
  const [activeFilter, setActiveFilter] = useState('All')

  return (
    <div className="enter">
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <Chip variant="cyan" size="sm" style={{ marginBottom: 12, display: 'inline-flex', gap: 6 } as React.CSSProperties}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }} />
          LIVE
        </Chip>
        <h1 className="h-lg" style={{ fontSize: 44, marginBottom: 8 }}>
          Signal <span className="grad-c">Feed</span>
        </h1>
        <p className="txt-2" style={{ fontSize: 15 }}>Real-time activity stream across all nodes and platforms.</p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--r-pill)',
              border: '1px solid var(--border)',
              background: activeFilter === f ? 'var(--cyan)' : 'rgba(255,255,255,0.03)',
              color: activeFilter === f ? 'var(--void)' : 'var(--txt2)',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all var(--t-fast)'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Feed List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {FEED_ITEMS.map(item => (
          <GlassCard key={item.id} style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 20 } as React.CSSProperties}>
            <div style={{ 
              width: 44, 
              height: 44, 
              borderRadius: 12, 
              background: `${item.color}15`, 
              border: `1px solid ${item.color}30`, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Icon name={item.icon} size={18} color={item.color} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="h-sm" style={{ fontSize: 16, marginBottom: 10, color: 'var(--txt)' }}>{item.title}</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {item.persona && <Chip variant="violet" size="sm" style={{ fontSize: 9 }}>{item.persona.toUpperCase()}</Chip>}
                {item.platform && <Chip variant="cyan" size="sm" style={{ fontSize: 9 }}>{item.platform}</Chip>}
                <Chip variant={item.type === 'WARNING' ? 'red' : item.type === 'OPERATIONAL' ? 'green' : item.type === 'VIRAL' || item.type === 'TOP' ? 'amber' : 'cyan'} size="sm" style={{ fontSize: 9 }}>{item.type}</Chip>
              </div>
            </div>

            <div className="mono txt-3" style={{ fontSize: 11, flexShrink: 0 }}>
              {item.time}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
