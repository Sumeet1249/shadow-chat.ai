import { GlassCard, Icon, Chip } from '@/design-system/components'

const STATS = [
  { label: 'TOTAL PERSONAS', value: '5', icon: 'psychology', color: 'var(--cyan)' },
  { label: 'TOTAL USES', value: '3,011', icon: 'auto_awesome', color: '#a78bfa' },
  { label: 'AVG WIN RATE', value: '84.8%', icon: 'emoji_events', color: 'var(--amber)' },
  { label: 'ACTIVE', value: '4/5', icon: 'toggle_on', color: 'var(--green)' },
]

const PERSONAS = [
  { 
    id: 1, 
    name: 'Nexus Architect', 
    cat: 'Authoritative â€¢ Tech/AI', 
    status: 'ACTIVE', 
    uses: '1,284', 
    win: '91%', 
    platforms: 2, 
    tags: ['TWITTER', 'LINKEDIN'], 
    char: 'N', 
    color: '#3b82f6' 
  },
  { 
    id: 2, 
    name: 'Ghost Analyst', 
    cat: 'Analytical â€¢ Crypto', 
    status: 'ACTIVE', 
    uses: '892', 
    win: '87%', 
    platforms: 2, 
    tags: ['REDDIT', 'DISCORD'], 
    char: 'G', 
    color: 'var(--cyan)' 
  },
  { 
    id: 3, 
    name: 'Corporate Phantom', 
    cat: 'Professional â€¢ Business', 
    status: 'ACTIVE', 
    uses: '445', 
    win: '83%', 
    platforms: 2, 
    tags: ['LINKEDIN', 'EMAIL'], 
    char: 'C', 
    color: 'var(--amber)' 
  },
  { 
    id: 4, 
    name: 'Signal_Zero', 
    cat: 'Casual â€¢ Gaming', 
    status: 'IDLE', 
    uses: '234', 
    win: '78%', 
    platforms: 2, 
    tags: ['DISCORD', 'TWITTER'], 
    char: 'S', 
    color: '#a78bfa' 
  },
  { 
    id: 5, 
    name: 'Data Wraith', 
    cat: 'Technical â€¢ Science', 
    status: 'ACTIVE', 
    uses: '156', 
    win: '85%', 
    platforms: 1, 
    tags: ['RESEARCH'], 
    char: 'D', 
    color: 'var(--green)' 
  },
]

export default function Personas() {
  return (
    <div className="enter">
      {/* Header Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <Chip variant="violet" size="sm" style={{ marginBottom: 12, display: 'inline-flex' } as React.CSSProperties}>INTELLIGENCE LAYER</Chip>
          <h1 className="h-lg" style={{ fontSize: 44, marginBottom: 8 }}>
            Neural <span style={{ color: '#a78bfa' }}>Personas</span>
          </h1>
          <p className="txt-2" style={{ fontSize: 15 }}>5 personas configured â€¢ 4 active</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-g" style={{ padding: '10px 20px', borderRadius: 12 }}>
            <Icon name="storefront" size={16} /> Marketplace
          </button>
          <button className="btn-p" style={{ padding: '10px 20px', borderRadius: 12 }}>
            <Icon name="add" size={16} /> New Persona
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 32 }}>
        {STATS.map((s, i) => (
          <GlassCard key={i} style={{ padding: '20px' } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span className="mono txt-3" style={{ fontSize: 10, letterSpacing: '0.1em' }}>{s.label}</span>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={s.icon} size={14} color="var(--txt3)" />
              </div>
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: s.color, fontFamily: 'var(--ff-disp)' }}>{s.value}</div>
          </GlassCard>
        ))}
      </div>

      {/* Persona Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
        {PERSONAS.map(p => (
          <GlassCard key={p.id} style={{ padding: '24px' } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ 
                  width: 52, 
                  height: 52, 
                  borderRadius: '50%', 
                  background: p.color, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: 20, 
                  fontWeight: 800, 
                  color: '#fff' 
                }}>{p.char}</div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{p.name}</h3>
                  <p className="txt-3" style={{ fontSize: 12 }}>{p.cat}</p>
                </div>
              </div>
              <Chip variant={p.status === 'ACTIVE' ? 'green' : 'cyan'} size="sm" style={{ opacity: p.status === 'IDLE' ? 0.5 : 1 }}>{p.status}</Chip>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <div className="mono txt-3" style={{ fontSize: 9, marginBottom: 4 }}>USES</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{p.uses}</div>
              </div>
              <div>
                <div className="mono txt-3" style={{ fontSize: 9, marginBottom: 4 }}>WIN RATE</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{p.win}</div>
              </div>
              <div>
                <div className="mono txt-3" style={{ fontSize: 9, marginBottom: 4 }}>PLATFORMS</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{p.platforms}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              {p.tags.map(t => <Chip key={t} variant="cyan" size="sm" style={{ fontSize: 9, background: 'rgba(255,255,255,0.03)' }}>{t}</Chip>)}
            </div>
          </GlassCard>
        ))}

        {/* Create Card */}
        <div style={{ 
          border: '2px dashed var(--border)', 
          borderRadius: 16, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 16,
          padding: '40px',
          cursor: 'pointer',
          background: 'rgba(255,255,255,0.01)'
        }}>
          <div style={{ 
            width: 48, 
            height: 48, 
            borderRadius: '50%', 
            border: '1px solid var(--border)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Icon name="add" size={24} color="var(--cyan)" />
          </div>
          <span className="mono txt-3" style={{ fontSize: 10, letterSpacing: '0.1em' }}>CREATE NEW PERSONA</span>
        </div>
      </div>
    </div>
  )
}
