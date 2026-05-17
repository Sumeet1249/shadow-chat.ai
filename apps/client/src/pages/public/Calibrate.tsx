import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlassCard, Icon, Button, Chip } from '@/design-system/components'
import { ParticleCanvas } from '@/design-system/effects/ParticleCanvas'
import { ScanlineOverlay } from '@/design-system/effects/ScanlineOverlay'

const SAMPLE_PROMPTS = [
  { label: 'Technical Authority', text: 'Most teams building on top of GPT-4 are optimizing for cost, not quality. The real alpha is in evaluation pipelines.' },
  { label: 'Counter-Narrative',   text: 'Hot take: RLHF is a band-aid on a broken reward model. Alignment needs first-principles rethinking.' },
  { label: 'Thought Leadership',  text: 'The infrastructure problem in AI isn\'t compute — it\'s latency at the edge. Nobody\'s talking about this.' },
]

const SAMPLE_OUTPUTS = [
  'The real bottleneck in AI isn\'t compute—it\'s orchestration at scale. When you\'re running 50+ inference calls in parallel, the p99 latency kills your UX before the model quality matters.',
  'Disagree with the core premise. RLHF is fundamentally misaligned with what we actually want from AI systems. We\'re training on human preferences, but human preferences are noisy, biased, and inconsistent.',
  'After 3 years building ML infra, the pattern I keep seeing: teams that win on benchmarks lose in production. The evaluation gap is where all the value lives.',
]

export default function Calibrate() {
  const navigate = useNavigate()
  const [selectedPrompt, setSelectedPrompt] = useState(0)
  const [output, setOutput] = useState('')
  const [generating, setGenerating] = useState(false)
  const [creativity, setCreativity] = useState(72)
  const [formality, setFormality] = useState(35)
  const [length, setLength] = useState(58)
  const rafRef = useRef<number>(0)

  const generate = useCallback(() => {
    setGenerating(true)
    setOutput('')
    const target = SAMPLE_OUTPUTS[selectedPrompt]
    let i = 0
    const stream = () => {
      if (i < target.length) {
        i += 3
        setOutput(target.slice(0, i))
        rafRef.current = requestAnimationFrame(stream)
      } else {
        setGenerating(false)
      }
    }
    rafRef.current = requestAnimationFrame(stream)
  }, [selectedPrompt])

  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }} className="enter">
      <ScanlineOverlay />
      <ParticleCanvas density={0.2} />
      <div style={{ width: '100%', maxWidth: 840, position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Chip variant="violet" style={{ marginBottom: 12, display: 'inline-flex' } as React.CSSProperties}>CALIBRATION</Chip>
          <h1 className="h-md">Test Your <span className="grad-c">Persona Voice</span></h1>
          <p className="txt-2" style={{ fontSize: 14, marginTop: 8 }}>Fine-tune neural parameters before deployment.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Sample prompts */}
            <GlassCard style={{ padding: 22 } as React.CSSProperties}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 14 }}>SAMPLE PROMPTS</div>
              {SAMPLE_PROMPTS.map((p, i) => (
                <button key={i} onClick={() => setSelectedPrompt(i)}
                  style={{ width: '100%', textAlign: 'left', padding: '12px 14px', borderRadius: 'var(--r-md)', border: `1px solid ${selectedPrompt === i ? 'rgba(0,229,255,0.25)' : 'var(--border)'}`, background: selectedPrompt === i ? 'rgba(0,229,255,0.05)' : 'transparent', cursor: 'pointer', marginBottom: 6, transition: 'all var(--t-mid)' }}>
                  <div className="mono" style={{ fontSize: 9, color: selectedPrompt === i ? 'var(--cyan)' : 'var(--txt3)', marginBottom: 4 }}>{p.label}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--txt2)', lineHeight: 1.5 }}>{p.text}</div>
                </button>
              ))}
              <Button variant="primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8, padding: '11px' }} loading={generating} onClick={generate}>
                <Icon name="auto_awesome" size={14} aria-hidden /> Generate Reply
              </Button>
            </GlassCard>

            {/* Output */}
            <GlassCard variant="elevated" style={{ padding: 22, minHeight: 140 } as React.CSSProperties}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 12 }}>NEURAL OUTPUT</div>
              {output ? (
                <div style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--txt)' }}>
                  {output}{generating && <span className="blink txt-c" aria-hidden>▌</span>}
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 80, color: 'var(--txt3)' }}>
                  <span className="mono" style={{ fontSize: 11 }}>// Select a prompt and generate</span>
                </div>
              )}
            </GlassCard>
          </div>

          {/* Right: sliders */}
          <GlassCard style={{ padding: '20px 22px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 18 }}>NEURAL PARAMETERS</div>
            {([['CREATIVITY', creativity, setCreativity, 'var(--cyan)'], ['FORMALITY', formality, setFormality, '#a78bfa'], ['LENGTH', length, setLength, 'var(--amber)']] as const).map(([label, val, setter, color]) => (
              <div key={label} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span className="mono txt-2" style={{ fontSize: 9 }}>{label}</span>
                  <span className="mono" style={{ fontSize: 10, color }}>{val}%</span>
                </div>
                <input type="range" min={0} max={100} value={val}
                  onChange={e => setter(+e.target.value)}
                  aria-label={label}
                  style={{ width: '100%', height: 4, appearance: 'none', background: `linear-gradient(to right,${color} ${val}%,rgba(255,255,255,0.06) ${val}%)`, borderRadius: 99, outline: 'none', cursor: 'pointer' }} />
              </div>
            ))}

            <div style={{ marginTop: 24 }}>
              <Button variant="primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }} onClick={() => navigate('/dashboard')}>
                <Icon name="check_circle" size={14} aria-hidden /> Approve & Deploy →
              </Button>
              <button className="btn-g" style={{ width: '100%', justifyContent: 'center', marginTop: 8, padding: '10px' }} onClick={() => navigate('/dashboard')}>
                Skip Calibration
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
