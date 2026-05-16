// Arena — A/B model battle with ELO scoring
import { useState, useRef, useCallback } from 'react'
import { GlassCard, Icon, Chip, Button } from '@/design-system/primitives'

const MODELS = [
  { id: 'claude', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', color: '#a78bfa', elo: 1847 },
  { id: 'gpt4o',  name: 'GPT-4o',            provider: 'OpenAI',    color: 'var(--cyan)', elo: 1803 },
]

const OUTPUTS = {
  claude: 'The real bottleneck in AI isn\'t compute—it\'s orchestration at scale. When you\'re running 50+ inference calls in parallel, the p99 latency kills your UX before the model quality matters.',
  gpt4o:  'Most teams are solving the wrong problem. They optimize for benchmark scores while ignoring production latency. The gap between SOTA performance and actual PMF is where all the opportunity lives.',
}

export default function Arena() {
  const [prompt, setPrompt]     = useState('')
  const [outputs, setOutputs]   = useState<Record<string, string>>({ claude: '', gpt4o: '' })
  const [elo, setElo]           = useState({ claude: 1847, gpt4o: 1803 })
  const [generating, setGenerating] = useState(false)
  const [voted, setVoted]       = useState<string | null>(null)
  const rafRef = useRef<Record<string, number>>({})

  const generate = useCallback(() => {
    if (!prompt.trim()) return
    setGenerating(true); setVoted(null); setOutputs({ claude: '', gpt4o: '' })
    let done = 0
    MODELS.forEach(m => {
      let i = 0
      const target = OUTPUTS[m.id as keyof typeof OUTPUTS]
      const stream = () => {
        if (i < target.length) { i += 2; setOutputs(o => ({ ...o, [m.id]: target.slice(0, i) })); rafRef.current[m.id] = requestAnimationFrame(stream) }
        else { done++; if (done === MODELS.length) setGenerating(false) }
      }
      rafRef.current[m.id] = requestAnimationFrame(stream)
    })
  }, [prompt])

  const vote = useCallback((winner: string) => {
    setVoted(winner)
    setElo(e => {
      const loser = winner === 'claude' ? 'gpt4o' : 'claude'
      return { ...e, [winner]: e[winner as keyof typeof e] + 16, [loser]: e[loser as keyof typeof e] - 16 }
    })
  }, [])

  return (
    <div className="enter">
      {/* Page header — title + model ELO chips in same row (prototype pattern) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
        <div>
          <Chip variant="amber" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>A/B TESTING</Chip>
          <h1 className="h-md">The <span className="txt-a">Arena</span></h1>
          <p className="txt-2" style={{ fontSize: 13.5, marginTop: 4 }}>Battle models head-to-head. ELO scoring identifies the highest-performing configuration.</p>
        </div>

        {/* Model info chips — ELO scores in the header (prototype) */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', paddingTop: 4 }}>
          {MODELS.map(m => (
            <div key={m.id} className="glass" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: m.color, boxShadow: `0 0 6px ${m.color}` }} aria-hidden />
              <div>
                <div className="mono" style={{ fontSize: 10, color: m.color }}>{m.name}</div>
                <div className="mono txt-2" style={{ fontSize: 9 }}>ELO: <span style={{ color: m.color, fontWeight: 700 }}>{elo[m.id as keyof typeof elo]}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ELO display — large scoreboard */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 14, marginBottom: 20, alignItems: 'center' }}>
        {MODELS.map(m => (
          <GlassCard key={m.id} style={{ padding: '14px 18px', textAlign: 'center' } as React.CSSProperties}>
            <div style={{ fontWeight: 600, fontSize: 14, color: m.color, marginBottom: 2 }}>{m.name}</div>
            <div className="mono txt-2" style={{ fontSize: 9, marginBottom: 6 }}>{m.provider}</div>
            <div style={{ fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 26, color: m.color }}>{elo[m.id as keyof typeof elo]}</div>
            <div className="mono txt-2" style={{ fontSize: 8 }}>ELO RATING</div>
          </GlassCard>
        ))}
        <div style={{ textAlign: 'center' }}><div className="mono txt-2" style={{ fontSize: 12 }}>VS</div></div>
      </div>

      {/* Prompt */}
      <GlassCard style={{ padding: '20px 22px', marginBottom: 16 } as React.CSSProperties}>
        <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 10 }}>BATTLE PROMPT</div>
        <textarea className="field" rows={3} placeholder="Enter a prompt to battle the models..." value={prompt} onChange={e => setPrompt(e.target.value)} style={{ resize: 'none', fontSize: 13 }} />
        <Button variant="action" loading={generating} onClick={generate} style={{ marginTop: 12 }}>
          <Icon name="emoji_events" size={15} aria-hidden /> Start Battle
        </Button>
      </GlassCard>

      {/* Outputs — side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {MODELS.map(m => (
          <GlassCard key={m.id} variant={voted === m.id ? 'elevated' : 'default'} style={{ padding: '20px 22px', border: voted === m.id ? `1px solid ${m.color}40` : undefined } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="mono" style={{ fontSize: 10, color: m.color }}>{m.name}</span>
              {voted === m.id && <Chip variant="amber" size="sm">WINNER</Chip>}
            </div>
            <div style={{ fontSize: 13.5, lineHeight: 1.75, color: 'var(--txt2)', minHeight: 80 }}>
              {outputs[m.id] || <span className="mono txt-2" style={{ fontSize: 11 }}>// Waiting for generation...</span>}
              {generating && outputs[m.id] && <span className="blink txt-c" aria-hidden>▌</span>}
            </div>
            {outputs[m.id] && !generating && !voted && (
              <Button variant="ghost" onClick={() => vote(m.id)} style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}>
                Vote Winner
              </Button>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
