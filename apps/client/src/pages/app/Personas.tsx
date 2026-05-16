import { useNavigate } from 'react-router-dom'
import { GlassCard, Icon, Chip, Button } from '@/design-system/primitives'
import { MOCK_PERSONAS } from '@/data/mock/personas'
import { usePersonaStore } from '@/store/usePersonaStore'

export default function Personas() {
  const navigate = useNavigate()
  const { activePersonaId, setActivePersona } = usePersonaStore()
  return (
    <div className="enter">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 22 }}>
        <div>
          <Chip variant="violet" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>PERSONAS</Chip>
          <h1 className="h-md">Persona <span className="txt-v">Architecture</span></h1>
          <p className="txt-2" style={{ fontSize: 13.5, marginTop: 4 }}>Manage your AI voice configurations.</p>
        </div>
        <Button variant="primary" size="sm"><Icon name="add" size={13} aria-hidden /> New Persona</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {MOCK_PERSONAS.map(p => (
          <GlassCard key={p.id} className="hover-glow" style={{ padding: '24px', cursor: 'pointer', position: 'relative' } as React.CSSProperties} onClick={() => navigate(`/personas/${p.id}`)}>
            {p.id === (activePersonaId ?? MOCK_PERSONAS[0].id) && <div style={{ position: 'absolute', top: 16, right: 16 }}><Chip variant="cyan" size="sm">ACTIVE</Chip></div>}
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: `linear-gradient(135deg,${p.gradient})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: '#fff', flexShrink: 0 }}>{p.name.charAt(0)}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                  <span className="chip chip-v" style={{ fontSize: 9 }}>{p.tone}</span>
                  <span className="chip chip-c" style={{ fontSize: 9 }}>{p.niche}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
              {[['Replies', p.replies.toLocaleString()], ['Win Rate', `${p.wins}%`], ['Avg Eng', p.avgEng]].map(([l, v]) => (
                <div key={l} style={{ textAlign: 'center', padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                  <div style={{ fontFamily: 'var(--ff-disp)', fontWeight: 700, fontSize: 15 }}>{v}</div>
                  <div className="mono txt-2" style={{ fontSize: 8 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
              <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); setActivePersona(p.id) }}>
                <Icon name="check" size={12} aria-hidden /> {p.id === activePersonaId ? 'Active' : 'Set Active'}
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
