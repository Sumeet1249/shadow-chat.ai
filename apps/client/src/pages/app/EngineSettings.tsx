// EngineSettings — Phase 7.5 stub
import { useState } from 'react'
import { GlassCard, Chip, Button, Icon } from '@/design-system/primitives'
import { ToggleLeft, ToggleRight } from 'lucide-react'

const MODELS = [
  { id: 'gpt4o',   name: 'GPT-4o',            provider: 'OpenAI',    cost: '$0.005/1K' },
  { id: 'claude',  name: 'Claude 3.5 Sonnet', provider: 'Anthropic', cost: '$0.003/1K' },
  { id: 'gemini',  name: 'Gemini Pro 1.5',    provider: 'Google',    cost: '$0.0025/1K' },
]

export default function EngineSettings() {
  const [model, setModel] = useState('gpt4o')
  const [temp, setTemp] = useState(72)
  const [topP, setTopP] = useState(90)
  const [streaming, setStreaming] = useState(true)
  const [maxTokens, setMaxTokens] = useState(280)

  return (
    <div className="enter">
      <div style={{ marginBottom: 22 }}>
        <Chip variant="amber" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>ENGINE</Chip>
        <h1 className="h-md">Engine <span className="txt-a">Settings</span></h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <GlassCard style={{ padding: '22px 24px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 14 }}>MODEL SELECTION</div>
            {MODELS.map(m => (
              <label key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px', borderRadius: 'var(--r-lg)', border: `1px solid ${model === m.id ? 'rgba(0,229,255,0.25)' : 'var(--border)'}`, background: model === m.id ? 'rgba(0,229,255,0.05)' : 'transparent', cursor: 'pointer', marginBottom: 8, transition: 'all var(--t-mid)' }}>
                <input type="radio" name="model" value={m.id} checked={model === m.id} onChange={() => setModel(m.id)} style={{ accentColor: 'var(--cyan)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{m.name}</div>
                  <div className="mono txt-2" style={{ fontSize: 9 }}>{m.provider} · {m.cost}</div>
                </div>
              </label>
            ))}
          </GlassCard>

          <GlassCard style={{ padding: '22px 24px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>GENERATION PARAMETERS</div>
            {([['Temperature', temp, setTemp, 'Creativity and randomness'], ['Top P', topP, setTopP, 'Nucleus sampling threshold']] as const).map(([label, val, setter, desc]) => (
              <div key={label} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div><div style={{ fontSize: 13, fontWeight: 500 }}>{label}</div><div className="mono txt-2" style={{ fontSize: 9 }}>{desc}</div></div>
                  <span className="mono txt-c" style={{ fontSize: 14, fontWeight: 700 }}>{(val / 100).toFixed(2)}</span>
                </div>
                <input type="range" min={0} max={100} value={val} onChange={e => setter(+e.target.value)} aria-label={label} style={{ width: '100%', height: 4, appearance: 'none', background: `linear-gradient(to right,var(--cyan) ${val}%,rgba(255,255,255,0.06) ${val}%)`, borderRadius: 99, outline: 'none', cursor: 'pointer' }} />
              </div>
            ))}
          </GlassCard>
        </div>

        <GlassCard style={{ padding: '20px 22px' } as React.CSSProperties}>
          <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>ADVANCED OPTIONS</div>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 13 }}>Streaming Output</span>
              <button onClick={() => setStreaming(s => !s)} aria-label={`${streaming ? 'Disable' : 'Enable'} streaming output`} style={{ background: 'none', border: 'none', cursor: 'pointer', color: streaming ? 'var(--cyan)' : 'var(--txt3)' }}>
                {streaming ? <ToggleRight size={26} aria-hidden /> : <ToggleLeft size={26} aria-hidden />}
              </button>
            </div>
            <p className="txt-2" style={{ fontSize: 11 }}>Stream tokens as they are generated.</p>
          </div>
          <div style={{ marginBottom: 18 }}>
            <div className="mono txt-2" style={{ fontSize: 9, marginBottom: 6 }}>MAX TOKENS</div>
            <input type="number" className="field" value={maxTokens} onChange={e => setMaxTokens(+e.target.value)} min={50} max={4096} aria-label="Maximum tokens" />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="primary" style={{ flex: 1, justifyContent: 'center' }}><Icon name="save" size={13} aria-hidden /> Save</Button>
            <Button variant="ghost" size="sm" style={{ justifyContent: 'center' }}><Icon name="restart_alt" size={13} aria-hidden /></Button>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
