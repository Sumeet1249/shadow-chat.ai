import { useParams, useNavigate, Link } from 'react-router-dom'
import { MOCK_PERSONAS } from '@/data/mock/personas'
import { GlassCard, Icon, Chip, Button } from '@/design-system/components'

export default function PersonaDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const persona = MOCK_PERSONAS.find(p => p.id === id) ?? MOCK_PERSONAS[0]

  return (
    <div className="enter">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button variant="ghost" onClick={() => navigate('/personas')} style={{ padding: '8px' }}>
            <Icon name="chevron_left" size={16} />
          </Button>
          <div>
            <h1 className="h-sm" style={{ marginBottom: 2 }}>Persona <span className="grad-v">Profile</span></h1>
            <div className="mono txt-2" style={{ fontSize: 9 }}>ID: {persona.id.toUpperCase()}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="ghost"><Icon name="content_copy" size={14} /> Clone</Button>
          <Button variant="primary"><Icon name="edit" size={14} /> Edit Identity</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18 }}>
        {/* Left Column: Core Identity & Tuning */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          <GlassCard variant="elevated" style={{ padding: '32px' } as React.CSSProperties}>
            <div style={{ display: 'flex', gap: 20, marginBottom: 32 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: `linear-gradient(135deg,${persona.gradient})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 800, color: '#fff', boxShadow: '0 0 25px rgba(124,58,237,0.3)' }}>
                {persona.name.charAt(0)}
              </div>
              <div>
                <h2 className="h-md" style={{ marginBottom: 8 }}>{persona.name}</h2>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Chip variant="violet">{persona.tone.toUpperCase()}</Chip>
                  <Chip variant="cyan">{persona.niche.toUpperCase()}</Chip>
                  <Chip variant="green" size="sm">ACTIVE</Chip>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 12, letterSpacing: '0.1em' }}>BEHAVIORAL LOGIC</div>
              <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.8 }}>{persona.traits}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              <div>
                <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>NEURAL TUNING</div>
                {[
                  { l: 'Creativity', v: 72, c: 'var(--cyan)' },
                  { l: 'Formality', v: 38, c: '#a78bfa' },
                  { l: 'Assertiveness', v: 85, c: 'var(--amber)' },
                ].map(s => (
                  <div key={s.l} style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span className="mono txt-2" style={{ fontSize: 9 }}>{s.l.toUpperCase()}</span>
                      <span className="mono" style={{ fontSize: 10, color: s.c }}>{s.v}%</span>
                    </div>
                    <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                      <div style={{ height: '100%', width: `${s.v}%`, background: s.c, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>MEMORY INJECTION</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {['ai_infrastructure.md', 'competitor_analysis.json', 'brand_voice_guide.pdf'].map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 8 }}>
                      <Icon name="description" size={13} color="var(--cyan)" />
                      <span className="mono" style={{ fontSize: 10 }}>{f}</span>
                    </div>
                  ))}
                  <Link to="/memory" className="mono txt-c" style={{ fontSize: 10, marginTop: 4, textDecoration: 'none' }}>+ Manage Matrix</Link>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Platforms Grid */}
          <GlassCard style={{ padding: '24px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>PLATFORM DEPLOYMENTS</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {['Twitter', 'LinkedIn', 'Reddit', 'Discord'].map(p => (
                <div key={p} style={{ padding: '14px', borderRadius: 12, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', textAlign: 'center' }}>
                  <Icon name={p === 'Twitter' ? 'alternate_email' : p === 'LinkedIn' ? 'business' : p === 'Reddit' ? 'forum' : 'groups'} size={20} color="var(--txt3)" style={{ marginBottom: 8 }} />
                  <div className="mono" style={{ fontSize: 10 }}>{p.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Analytics & Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          
          <GlassCard style={{ padding: '20px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>PERFORMANCE METRICS</div>
            {[
              { l: 'Total Replies', v: persona.replies.toLocaleString(), c: 'var(--cyan)' },
              { l: 'Win Rate', v: `${persona.wins}%`, c: 'var(--green)' },
              { l: 'Avg Engagement', v: persona.avgEng, c: '#a78bfa' },
              { l: 'Token Spend', v: '84.2K', c: 'var(--amber)' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                <span className="mono txt-2" style={{ fontSize: 10 }}>{s.l.toUpperCase()}</span>
                <span className="mono" style={{ fontSize: 11, color: s.c }}>{s.v}</span>
              </div>
            ))}
          </GlassCard>

          <GlassCard style={{ padding: '20px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 12 }}>QUICK ACTIONS</div>
            <Button variant="primary" onClick={() => navigate('/generate')} style={{ width: '100%', justifyContent: 'center', marginBottom: 8 }}>
              <Icon name="auto_awesome" size={14} /> NEW REPLY
            </Button>
            <Button variant="ghost" onClick={() => navigate('/arena')} style={{ width: '100%', justifyContent: 'center' }}>
              <Icon name="emoji_events" size={14} /> ENTER ARENA
            </Button>
          </GlassCard>

          <div style={{ marginTop: 'auto', padding: '16px', border: '1px solid rgba(248,113,113,0.1)', background: 'rgba(248,113,113,0.02)', borderRadius: 12 }}>
            <div className="mono" style={{ fontSize: 9, color: 'var(--red)', marginBottom: 8 }}>DANGER_ZONE</div>
            <p className="txt-2" style={{ fontSize: 11, marginBottom: 12 }}>Deleting this persona will purge all its associated neural weights and history.</p>
            <Button variant="ghost" style={{ color: 'var(--red)', borderColor: 'rgba(248,113,113,0.2)', width: '100%', justifyContent: 'center' }}>
              <Icon name="delete" size={13} /> DELETE PERSONA
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}
