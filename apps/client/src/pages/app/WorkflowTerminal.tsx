import { useState, useRef, useEffect } from 'react'
import { GlassCard, Chip, Icon } from '@/design-system/primitives'
import { useNavigate } from 'react-router-dom'

import { RESPONSES } from '@/data/terminal'

// Preset command cards — matching the HTML prototype sidebar
const PRESETS = [
  { label: 'Generate batch',  cmd: 'generate',      icon: 'auto_awesome', color: 'var(--cyan)' },
  { label: 'Node status',     cmd: 'status',         icon: 'dns',          color: 'var(--green)' },
  { label: 'Persona list',    cmd: 'list-nodes',     icon: 'psychology',   color: '#a78bfa' },
  { label: 'Analytics pull',  cmd: 'analytics',      icon: 'analytics',    color: 'var(--amber)' },
  { label: 'Memory scan',     cmd: 'memory scan',    icon: 'memory',       color: 'var(--cyan)' },
  { label: 'Vault check',     cmd: 'vault check',    icon: 'key',          color: 'var(--green)' },
]

const TIPS = [
  'Type "help" to list all commands',
  'Use "clear" to reset the terminal',
  'Press Enter to execute commands',
  '"exit" returns to dashboard',
]

interface Line { text: string; type: 'input' | 'output' | 'system' }

export default function WorkflowTerminal() {
  const navigate = useNavigate()
  const [lines, setLines] = useState<Line[]>([
    { text: 'Shadow Node Neural Command Interface v2.4.1', type: 'system' },
    { text: 'Type "help" for available commands.', type: 'system' },
  ])
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [lines])

  const exec = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    if (trimmed === 'exit') { navigate('/dashboard'); return }
    setLines(ls => {
      const next = [...ls, { text: `> ${cmd}`, type: 'input' as const }]
      if (trimmed === 'clear') return [{ text: 'Terminal cleared.', type: 'system' as const }]
      const response = RESPONSES[trimmed] ?? `  Command not found: "${cmd}". Type "help" for available commands.`
      return [...next, { text: response, type: 'output' as const }]
    })
  }

  return (
    <div className="enter">
      <div style={{ marginBottom: 20 }}>
        <Chip variant="violet" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>TERMINAL</Chip>
        <h1 className="h-md">Workflow <span className="txt-v">Terminal</span></h1>
      </div>

      {/* Two-column layout: terminal + preset sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 16 }}>

        {/* Terminal */}
        <GlassCard variant="elevated" style={{ padding: '24px', fontFamily: 'var(--ff-mono)', position: 'relative' } as React.CSSProperties}>
          {/* Traffic lights (decorative) */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 16 }} aria-hidden>
            {['#ff5f57', '#febc2e', '#28c840'].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />)}
          </div>
          <div style={{ height: 440, overflowY: 'auto', paddingBottom: 8 }}>
            {lines.map((l, i) => (
              <div key={i} style={{ fontSize: 11.5, lineHeight: 1.7, whiteSpace: 'pre-wrap', color: l.type === 'input' ? 'var(--cyan)' : l.type === 'system' ? '#a78bfa' : 'var(--txt2)', marginBottom: 2 }}>
                {l.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div style={{ display: 'flex', gap: 8, borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 4 }}>
            <span style={{ color: 'var(--cyan)', fontSize: 12 }}>{'>'}</span>
            <input
              className="field"
              style={{ background: 'transparent', border: 'none', padding: 0, fontFamily: 'var(--ff-mono)', fontSize: 12 }}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && input.trim()) { exec(input); setInput('') } }}
              placeholder="Enter command..."
              autoFocus
              aria-label="Terminal input"
            />
          </div>
        </GlassCard>

        {/* Right sidebar — Preset Commands + Quick Tips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Preset commands */}
          <GlassCard style={{ padding: '16px 14px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 9, letterSpacing: '0.1em', marginBottom: 12 }}>PRESET COMMANDS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {PRESETS.map(p => (
                <button
                  key={p.cmd}
                  onClick={() => exec(p.cmd)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 10px',
                    borderRadius: 'var(--r-md)',
                    border: '1px solid var(--border)',
                    background: 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    color: 'var(--txt2)',
                    fontSize: 12,
                    textAlign: 'left',
                    transition: 'all var(--t-mid)',
                    width: '100%',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${p.color}44`
                    e.currentTarget.style.background = `${p.color}08`
                    e.currentTarget.style.color = p.color
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                    e.currentTarget.style.color = 'var(--txt2)'
                  }}
                  aria-label={`Run preset: ${p.label}`}
                >
                  <Icon name={p.icon} size={13} color={p.color} aria-hidden />
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Quick Tips */}
          <GlassCard style={{ padding: '16px 14px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 9, letterSpacing: '0.1em', marginBottom: 10 }}>QUICK TIPS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {TIPS.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{ marginTop: 1, flexShrink: 0 }}>
                    <Icon name="info" size={11} color="var(--txt3)" aria-hidden />
                  </div>
                  <span className="txt-2" style={{ fontSize: 11, lineHeight: 1.5 }}>{tip}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
