import { useParams, useNavigate } from 'react-router-dom'
import { MOCK_PERSONAS } from '@/data/mock/personas'
import { GlassCard, Icon, Chip, Button } from '@/design-system/primitives'

export default function PersonaDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const persona = MOCK_PERSONAS.find(p => p.id === id) ?? MOCK_PERSONAS[0]

  return (
    <div className="enter">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <Button variant="ghost" size="sm" onClick={() => navigate('/personas')}><Icon name="arrow_back" size={13} aria-hidden /> Back</Button>
        <Chip variant="violet">PERSONA DETAIL</Chip>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 18 }}>
        <GlassCard variant="elevated" style={{ padding: '28px' } as React.CSSProperties}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: `linear-gradient(135deg,${persona.gradient})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 800, color: '#fff' }}>{persona.name.charAt(0)}</div>
            <div>
              <h1 className="h-sm">{persona.name}</h1>
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                <Chip variant="violet">{persona.tone}</Chip>
                <Chip variant="cyan">{persona.niche}</Chip>
              </div>
            </div>
          </div>
          <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>BEHAVIORAL TRAITS</div>
          <p style={{ fontSize: 13.5, color: 'var(--txt2)', lineHeight: 1.7, marginBottom: 20 }}>{persona.traits}</p>
          <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 12 }}>PLATFORMS</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {persona.platforms.map(p => <Chip key={p} variant="cyan">{p}</Chip>)}
          </div>
        </GlassCard>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <GlassCard style={{ padding: '18px 20px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 14 }}>PERFORMANCE</div>
            {[['Total Replies', persona.replies.toLocaleString()], ['Win Rate', `${persona.wins}%`], ['Avg Engagement', persona.avgEng], ['Total Uses', persona.uses.toLocaleString()]].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <span className="mono txt-2" style={{ fontSize: 10 }}>{l}</span>
                <span className="mono txt-c" style={{ fontSize: 11 }}>{v}</span>
              </div>
            ))}
          </GlassCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button variant="primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/generate')}><Icon name="auto_awesome" size={13} aria-hidden /> Generate with Persona</Button>
            <Button variant="ghost" size="sm" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/personas')}><Icon name="edit" size={12} aria-hidden /> Edit Persona</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
