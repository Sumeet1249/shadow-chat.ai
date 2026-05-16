import { useState, useRef, useCallback } from 'react'
import { GlassCard, Icon, Chip, Button } from '@/design-system/primitives'

const MODELS = [
  { id: 'claude', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', color: 'var(--cyan)', elo: 1247 },
  { id: 'gpt4o',  name: 'GPT-4o',            provider: 'OpenAI',    color: '#a78bfa', elo: 1198 },
]

const SAMPLES = {
  claude: "The infrastructure problem isn't compute — it's latency at the edge. We're solving the wrong bottleneck entirely...",
  gpt4o: "After 3 years in ML infrastructure, the one pattern separating top-tier teams from the rest is deceptively simple...",
}

export default function Arena() {
  const [prompt, setPrompt] = useState('')
  const [outputs, setOutputs] = useState<Record<string, string>>({ claude: '', gpt4o: '' })
  const [generating, setGenerating] = useState(false)
  const rafRef = useRef<Record<string, number>>({})

  const startBattle = useCallback(() => {
    if (!prompt.trim()) return
    setGenerating(true); setOutputs({ claude: '', gpt4o: '' })
    let done = 0
    MODELS.forEach(m => {
      let i = 0
      const target = SAMPLES[m.id as keyof typeof SAMPLES]
      const stream = () => {
        if (i < target.length) {
          i += 3
          setOutputs(o => ({ ...o, [m.id]: target.slice(0, i) }))
          rafRef.current[m.id] = requestAnimationFrame(stream)
        } else {
          done++; if (done === MODELS.length) setGenerating(false)
        }
      }
      rafRef.current[m.id] = requestAnimationFrame(stream)
    })
  }, [prompt])

  return (
    <div className="enter">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <Chip variant="amber" size="sm" style={{ marginBottom: 12 }}>COMPETITIVE</Chip>
          <h1 className="h-lg" style={{ fontSize: 44, letterSpacing: '-0.02em', marginBottom: 8 }}>
            The <span style={{ color: '#f59e0b' }}>Arena</span>
          </h1>
          <p className="txt-2" style={{ fontSize: 15, opacity: 0.8 }}>
            Pit AI models head-to-head. Compare outputs. Crown the winner.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <GlassCard style={{ padding: '12px 20px', background: 'rgba(0, 229, 255, 0.03)', border: '1px solid rgba(0, 229, 255, 0.1)' } as React.CSSProperties}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)' }} />
              <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--cyan)' }}>Claude 3.5 Sonnet</div>
            </div>
            <div className="mono" style={{ fontSize: 10, marginTop: 4, color: 'var(--txt2)' }}>ELO: 1247</div>
          </GlassCard>
          <GlassCard style={{ padding: '12px 20px', background: 'rgba(167, 139, 250, 0.03)', border: '1px solid rgba(167, 139, 250, 0.1)' } as React.CSSProperties}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#a78bfa' }} />
              <div style={{ fontWeight: 600, fontSize: 13, color: '#a78bfa' }}>GPT-4o</div>
            </div>
            <div className="mono" style={{ fontSize: 10, marginTop: 4, color: 'var(--txt2)' }}>ELO: 1198</div>
          </GlassCard>
        </div>
      </div>

      <GlassCard style={{ padding: '24px', marginBottom: 24, background: 'rgba(10, 18, 38, 0.4)' } as React.CSSProperties}>
        <div className="mono txt-3" style={{ fontSize: 10, marginBottom: 14, letterSpacing: '0.1em' }}>BATTLE PROMPT</div>
        <div style={{ display: 'flex', gap: 16 }}>
          <textarea
            className="field"
            rows={2}
            placeholder="Enter a prompt to compare model outputs..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            style={{ flex: 1, fontSize: 15, background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)' }}
          />
          <button
            onClick={startBattle}
            className="btn-a"
            style={{ 
              height: 'fit-content', 
              padding: '16px 32px', 
              borderRadius: 12, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 10,
              fontSize: 15,
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              color: '#000',
              fontWeight: 800
            }}
          >
            <Icon name="bolt" size={18} />
            Start Battle
          </button>
        </div>
      </GlassCard>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {MODELS.map(m => (
          <GlassCard key={m.id} style={{ padding: '24px', minHeight: 320, background: 'rgba(10, 18, 38, 0.3)' } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.color }} />
                <div style={{ fontWeight: 700, fontSize: 15, color: m.color }}>{m.name}</div>
              </div>
              <div className="mono txt-c" style={{ fontSize: 11, fontWeight: 700 }}>{m.provider}</div>
            </div>
            
            <div style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--txt2)', minHeight: 180 }}>
              {outputs[m.id] ? (
                <>
                  {outputs[m.id]}
                  {generating && <span className="blink txt-c" style={{ marginLeft: 2 }}>▌</span>}
                </>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 180, opacity: 0.1 }}>
                  <span className="mono" style={{ fontSize: 13 }}>Awaiting battle...</span>
                </div>
              )}
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } as React.CSSProperties}>
        <div className="mono txt-3" style={{ fontSize: 10, letterSpacing: '0.1em' }}>BATTLE HISTORY</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--txt2)' }}>Claude 3.5 Sonnet:</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--cyan)', fontWeight: 800 }}>1247 ELO</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--txt2)' }}>GPT-4o:</span>
            <span className="mono" style={{ fontSize: 11, color: '#a78bfa', fontWeight: 800 }}>1198 ELO</span>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
