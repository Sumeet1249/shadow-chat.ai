import { useState, useRef, useCallback } from 'react'
import { GlassCard, Icon, Chip, Button } from '@/design-system/primitives'
import { MOCK_PERSONAS } from '@/data/mock/personas'
import { usePersonaStore } from '@/store/usePersonaStore'

const PLATFORMS = ['Twitter', 'LinkedIn', 'Reddit', 'Discord', 'Email']

export default function NeuralReply() {
  const { activePersonaId, setActivePersona } = usePersonaStore()
  const [platform, setPlatform] = useState('Twitter')
  const [prompt, setPrompt] = useState('')
  const [output, setOutput] = useState('')
  const [generating, setGenerating] = useState(false)
  const rafRef = useRef<number>(0)

  const SAMPLE = 'The real bottleneck in AI isn\'t compute—it\'s orchestration at scale. When you\'re running 50+ inference calls in parallel, the p99 latency kills your UX before the model quality matters. This is the infrastructure problem nobody is solving at the edge level.'

  const generate = useCallback(() => {
    if (!prompt.trim()) return
    setGenerating(true); setOutput('')
    let i = 0
    const stream = () => { if (i < SAMPLE.length) { i += 3; setOutput(SAMPLE.slice(0, i)); rafRef.current = requestAnimationFrame(stream) } else setGenerating(false) }
    rafRef.current = requestAnimationFrame(stream)
  }, [prompt])

  return (
    <div className="enter">
      <div style={{ marginBottom: 22 }}>
        <Chip variant="cyan" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>GENERATION</Chip>
        <h1 className="h-md">Neural Reply <span className="grad-c">Generation</span></h1>
        <p className="txt-2" style={{ fontSize: 13.5, marginTop: 4 }}>Configure persona, platform, and context to generate your reply.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <GlassCard style={{ padding: '22px 24px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 12 }}>TARGET CONTENT</div>
            <textarea className="field" rows={4} placeholder="Paste the tweet/post you want to reply to..." value={prompt} onChange={e => setPrompt(e.target.value)} style={{ resize: 'none', fontSize: 13 }} />
            <Button variant="primary" loading={generating} onClick={generate} style={{ marginTop: 12, width: '100%', justifyContent: 'center', padding: '12px' }}>
              <Icon name="auto_awesome" size={15} aria-hidden /> Generate Reply
            </Button>
          </GlassCard>

          <GlassCard variant="elevated" style={{ padding: '22px 24px', minHeight: 160 } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="mono txt-2" style={{ fontSize: 10 }}>NEURAL OUTPUT</span>
              {output && <button className="btn-g btn-sm" onClick={() => navigator.clipboard.writeText(output).catch(() => {})} aria-label="Copy output"><Icon name="content_copy" size={12} aria-hidden /></button>}
            </div>
            {output ? (
              <div style={{ fontSize: 14, lineHeight: 1.75 }}>{output}{generating && <span className="blink txt-c" aria-hidden>▌</span>}</div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 80, color: 'var(--txt3)' }}>
                <span className="mono" style={{ fontSize: 11 }}>// Configure and generate your reply</span>
              </div>
            )}
          </GlassCard>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <GlassCard style={{ padding: '18px 20px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 12 }}>PLATFORM</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {PLATFORMS.map(p => (
                <button key={p} onClick={() => setPlatform(p)} style={{ padding: '8px 12px', borderRadius: 'var(--r-md)', border: `1px solid ${platform === p ? 'rgba(0,229,255,0.3)' : 'var(--border)'}`, background: platform === p ? 'rgba(0,229,255,0.06)' : 'transparent', color: platform === p ? 'var(--cyan)' : 'var(--txt2)', fontSize: 13, cursor: 'pointer', textAlign: 'left', transition: 'all var(--t-mid)' }}>{p}</button>
              ))}
            </div>
          </GlassCard>

          <GlassCard style={{ padding: '18px 20px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 12 }}>ACTIVE PERSONA</div>
            {MOCK_PERSONAS.map(p => (
              <div key={p.id} onClick={() => setActivePersona(p.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 'var(--r-md)', background: p.id === (activePersonaId ?? MOCK_PERSONAS[0].id) ? 'rgba(0,229,255,0.06)' : 'transparent', border: `1px solid ${p.id === (activePersonaId ?? MOCK_PERSONAS[0].id) ? 'rgba(0,229,255,0.2)' : 'transparent'}`, cursor: 'pointer', marginBottom: 4, transition: 'all var(--t-mid)' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg,${p.gradient})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#fff', flexShrink: 0 }}>{p.name.charAt(0)}</div>
                <div><div style={{ fontSize: 12, fontWeight: 600 }}>{p.name}</div><div className="mono txt-2" style={{ fontSize: 9 }}>{p.tone}</div></div>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
