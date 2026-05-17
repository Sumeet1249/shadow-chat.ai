import { useState, useRef, useCallback } from 'react'
import { GlassCard, Icon, Chip } from '@/design-system/components'
import { MOCK_PERSONAS } from '@/data/mock/personas'
import { usePersonaStore } from '@/store/usePersonaStore'

const PLATFORM_INFO: Record<string, { icon: string; color: string; label: string }> = {
  Twitter: { icon: 'alternate_email', color: '#1DA1F2', label: 'Twitter' },
  LinkedIn: { icon: 'business', color: '#0077b5', label: 'LinkedIn' },
  Reddit: { icon: 'forum', color: '#FF4500', label: 'Reddit' },
  Discord: { icon: 'groups', color: '#5865F2', label: 'Discord' },
  Email: { icon: 'mail', color: 'var(--amber)', label: 'Email' },
  WhatsApp: { icon: 'chat', color: '#25D366', label: 'WhatsApp' },
  Instagram: { icon: 'camera_alt', color: '#E1306C', label: 'Instagram' },
}

const PLATFORMS = Object.keys(PLATFORM_INFO)

export default function NeuralReply() {
  const { activePersonaId, setActivePersona } = usePersonaStore()
  const [platform, setPlatform] = useState('Twitter')
  const [prompt, setPrompt] = useState('')
  const [output, setOutput] = useState('')
  const [generating, setGenerating] = useState(false)
  const rafRef = useRef<number>(0)

  const activePersona = MOCK_PERSONAS.find(p => p.id === activePersonaId) ?? MOCK_PERSONAS[0]

  const SAMPLE = "The infrastructure problem isn't compute — it's latency at the edge. We're solving the wrong bottleneck entirely. By moving the neural weights to the distributed node network, we eliminate the round-trip latency that kills user engagement."

  const generate = useCallback(() => {
    if (!prompt.trim()) return
    setGenerating(true); setOutput('')
    let i = 0
    const stream = () => {
      if (i < SAMPLE.length) {
        i += 3
        setOutput(SAMPLE.slice(0, i))
        rafRef.current = requestAnimationFrame(stream)
      } else {
        setGenerating(false)
      }
    }
    rafRef.current = requestAnimationFrame(stream)
  }, [prompt])

  return (
    <div className="enter">
      <div style={{ marginBottom: 32 }}>
        <Chip variant="cyan" size="sm" style={{ marginBottom: 12 }}>GENERATION ENGINE</Chip>
        <h1 className="h-lg" style={{ fontSize: 44, letterSpacing: '-0.02em', marginBottom: 8 }}>
          Neural <span className="grad-c">Reply Generation</span>
        </h1>
        <p className="txt-2" style={{ fontSize: 15, opacity: 0.8 }}>
          Craft context-aware responses powered by your active persona.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Platform Selector */}
          <GlassCard style={{ padding: '20px' } as React.CSSProperties}>
            <div className="mono txt-3" style={{ fontSize: 10, marginBottom: 16, letterSpacing: '0.1em' }}>TARGET PLATFORM</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {PLATFORMS.map(p => {
                const info = PLATFORM_INFO[p]
                const isActive = platform === p
                return (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    style={{
                      flex: 1,
                      padding: '16px 12px',
                      borderRadius: 12,
                      border: `1px solid ${isActive ? 'var(--cyan)' : 'var(--border)'}`,
                      background: isActive ? 'rgba(0, 229, 255, 0.05)' : 'rgba(255, 255, 255, 0.01)',
                      color: isActive ? 'var(--cyan)' : 'var(--txt3)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 10
                    }}
                  >
                    <Icon name={info.icon} size={18} color={isActive ? 'var(--cyan)' : 'var(--txt3)'} />
                    <span className="mono" style={{ fontSize: 8, fontWeight: 700 }}>{info.label.toUpperCase()}</span>
                  </button>
                )
              })}
            </div>
          </GlassCard>

          {/* Input */}
          <GlassCard style={{ padding: '24px' } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <div className="mono txt-3" style={{ fontSize: 10, letterSpacing: '0.1em' }}>CONTEXT / PROMPT</div>
              <div className="mono txt-3" style={{ fontSize: 10 }}>{prompt.length} chars</div>
            </div>
            <textarea
              className="field"
              rows={6}
              placeholder="Paste the conversation context, tweet, or topic you want to reply to..."
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              style={{ fontSize: 15, background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', lineHeight: 1.6 }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <button
                onClick={generate}
                className="btn-p"
                style={{ 
                  padding: '14px 32px', 
                  borderRadius: 12, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 10,
                  fontSize: 14,
                  fontWeight: 700
                }}
              >
                <Icon name="auto_awesome" size={16} />
                Generate Reply
              </button>
            </div>
          </GlassCard>

          {/* Output */}
          <GlassCard style={{ padding: '24px', minHeight: 240, background: 'rgba(10, 18, 38, 0.4)' } as React.CSSProperties}>
            <div className="mono txt-3" style={{ fontSize: 10, marginBottom: 20, letterSpacing: '0.1em' }}>OUTPUT</div>
            {output ? (
              <div style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--txt)' }}>
                {output}
                {generating && <span className="blink txt-c" style={{ marginLeft: 2 }}>▌</span>}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 140, opacity: 0.2 }}>
                <Icon name="auto_awesome" size={32} style={{ marginBottom: 16 }} />
                <span className="mono" style={{ fontSize: 12 }}>Enter context and generate</span>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <GlassCard style={{ padding: '20px' } as React.CSSProperties}>
            <div className="mono txt-3" style={{ fontSize: 10, marginBottom: 16, letterSpacing: '0.1em' }}>ACTIVE PERSONA</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { id: 'nexus', name: 'Nexus Architect', tone: 'Authoritative', color: '#7c3aed' },
                { id: 'ghost', name: 'Ghost Analyst', tone: 'Analytical', color: 'var(--cyan)' },
                { id: 'phantom', name: 'Corporate Phantom', tone: 'Professional', color: 'var(--amber)' },
                { id: 'signal', name: 'Signal_Zero', tone: 'Casual', color: '#f43f5e' },
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setActivePersona(p.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 12px',
                    borderRadius: 12,
                    background: p.id === activePersonaId ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                    border: `1px solid ${p.id === activePersonaId ? 'rgba(255, 255, 255, 0.08)' : 'transparent'}`,
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%'
                  }}
                >
                  <div style={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    background: p.color, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 900,
                    color: '#fff'
                  }}>
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: p.id === activePersonaId ? '#fff' : 'var(--txt2)' }}>{p.name}</div>
                    <div className="mono" style={{ fontSize: 9, color: 'var(--txt3)' }}>{p.tone}</div>
                  </div>
                  {p.id === activePersonaId && (
                    <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />
                  )}
                </button>
              ))}
            </div>
            <button className="btn-g" style={{ width: '100%', marginTop: 16, justifyContent: 'center', borderRadius: 10, fontSize: 12 }}>
              Manage Personas
            </button>
          </GlassCard>

          <GlassCard style={{ padding: '20px' } as React.CSSProperties}>
            <div className="mono txt-3" style={{ fontSize: 10, marginBottom: 16, letterSpacing: '0.1em' }}>SESSION STATS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Generations', value: '12', icon: 'auto_awesome' },
                { label: 'Tokens Used', value: '4,280', icon: 'memory' },
                { label: 'Avg Latency', value: '142ms', icon: 'speed' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon name={s.icon} size={14} color="var(--txt3)" />
                    <span className="mono" style={{ fontSize: 10, color: 'var(--txt3)' }}>{s.label.toUpperCase()}</span>
                  </div>
                  <span className="mono" style={{ fontSize: 11, color: '#fff', fontWeight: 700 }}>{s.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard style={{ padding: '20px' } as React.CSSProperties}>
            <div className="mono txt-3" style={{ fontSize: 10, marginBottom: 16, letterSpacing: '0.1em' }}>RECENT</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 0', opacity: 0.2 }}>
              <div className="mono" style={{ fontSize: 11 }}>// No generations yet</div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
