import { useState } from 'react'
import { GlassCard, Chip, Button, Icon } from '@/design-system/primitives'
import { useDebounce } from '@/hooks/useDebounce'
import { Star } from 'lucide-react'

const ITEMS = [
  { id: 1, name: 'Nexus Protocol',  author: 'shadow_ops',   rating: 4.9, installs: 2847, desc: 'Technical authority persona for AI infrastructure discourse.', tags: ['AI', 'Technical'], color: 'var(--cyan)' },
  { id: 2, name: 'Ghost Protocol',  author: 'cipher_x',     rating: 4.7, installs: 1234, desc: 'Counter-narrative specialist for controversial threads.', tags: ['Debate', 'Reddit'], color: '#a78bfa' },
  { id: 3, name: 'Alpha Insider',   author: 'neural_trade',  rating: 4.8, installs: 987,  desc: 'Crypto & Web3 community voice with insider framing.', tags: ['Crypto', 'Discord'], color: 'var(--amber)' },
  { id: 4, name: 'Corporate Oracle', author: 'exec_shadow',  rating: 4.6, installs: 765,  desc: 'Executive voice for LinkedIn and B2B contexts.', tags: ['LinkedIn', 'B2B'], color: 'var(--green)' },
  { id: 5, name: 'Dev Evangelist',  author: 'code_noir',    rating: 4.5, installs: 543,  desc: 'Developer advocate persona for technical communities.', tags: ['Dev', 'Tech'], color: 'var(--cyan)' },
  { id: 6, name: 'Culture Critic',  author: 'void_takes',   rating: 4.4, installs: 421,  desc: 'Cultural commentary and media analysis voice.', tags: ['Media', 'Culture'], color: '#a78bfa' },
]

export default function Marketplace() {
  const [q, setQ] = useState('')
  const dq = useDebounce(q, 300)
  const [installing, setInstalling] = useState<number | null>(null)
  const filtered = ITEMS.filter(i =>
    i.name.toLowerCase().includes(dq.toLowerCase()) ||
    i.desc.toLowerCase().includes(dq.toLowerCase()) ||
    i.tags.some(t => t.toLowerCase().includes(dq.toLowerCase()))
  )

  const install = async (id: number) => {
    setInstalling(id)
    await new Promise(r => setTimeout(r, 1200))
    setInstalling(null)
  }

  return (
    <div className="enter">
      <div style={{ marginBottom: 22 }}>
        <Chip variant="cyan" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>MARKETPLACE</Chip>
        <h1 className="h-md">Neural <span className="grad-c">Marketplace</span></h1>
        <p className="txt-2" style={{ fontSize: 13.5, marginTop: 4 }}>Community persona templates — rated and battle-tested in the Arena.</p>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input
          className="field"
          placeholder="Search templates..."
          value={q}
          onChange={e => setQ(e.target.value)}
          style={{ flex: 1 }}
          aria-label="Search marketplace"
        />
        <Button variant="ghost" size="sm"><Icon name="filter_list" size={13} aria-hidden /> Filter</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {filtered.map(item => (
          <GlassCard key={item.id} className="hover-glow" style={{ padding: '22px 24px' } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div className="icon-box" style={{ width: 44, height: 44, background: `${item.color}14`, border: `1px solid ${item.color}25` }}>
                <Icon name="psychology" size={20} color={item.color} aria-hidden />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Star size={11} color="var(--amber)" aria-hidden />
                <span className="mono txt-a" style={{ fontSize: 10 }}>{item.rating}</span>
              </div>
            </div>
            <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.name}</h3>
            <div className="mono txt-2" style={{ fontSize: 9, marginBottom: 6 }}>by {item.author}</div>
            <p className="txt-2" style={{ fontSize: 12.5, lineHeight: 1.5, marginBottom: 12 }}>{item.desc}</p>
            <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
              {item.tags.map(t => <span key={t} className="chip chip-c" style={{ fontSize: 9 }}>{t}</span>)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono txt-2" style={{ fontSize: 9 }}>{item.installs.toLocaleString()} installs</span>
              <Button variant="ghost" size="sm" loading={installing === item.id} onClick={() => install(item.id)}>
                <Icon name="download" size={12} aria-hidden /> Install
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
