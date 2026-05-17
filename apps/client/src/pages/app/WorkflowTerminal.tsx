import { useState, useRef, useEffect } from 'react'
import { GlassCard, Icon, Chip } from '@/design-system/components'

const PRESETS = [
  { label: 'Generate batch', cmd: 'generate --batch --platform twitter --count=5', icon: 'auto_awesome' },
  { label: 'Node status', cmd: 'node status --all', icon: 'settings_input_antenna' },
  { label: 'Persona list', cmd: 'persona list --active', icon: 'person_search' },
  { label: 'Analytics pull', cmd: 'analytics pull --period=7d', icon: 'analytics' },
  { label: 'Memory scan', cmd: 'memory scan --context=latest', icon: 'psychology' },
  { label: 'Vault check', cmd: 'vault status --keys', icon: 'vpn_key' },
]

export default function WorkflowTerminal() {
  const [history, setHistory] = useState<string[]>([
    '// Shadow Node Terminal v2.4.1 — Neural Core Online',
    '// Type "help" for available commands. Press Enter to execute.',
    ''
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [history])

  const runCommand = (cmd: string = input) => {
    if (!cmd.trim()) return
    setHistory(prev => [...prev, `> ${cmd}`, `Executing: ${cmd.split(' ')[0]} protocol...`, 'Done.', ''])
    setInput('')
  }

  return (
    <div className="enter">
      <div style={{ marginBottom: 32 }}>
        <Chip variant="violet" size="sm" style={{ marginBottom: 12 }}>OPERATIONS</Chip>
        <h1 className="h-lg" style={{ fontSize: 44, letterSpacing: '-0.02em', marginBottom: 8 }}>
          Workflow <span style={{ color: '#a78bfa' }}>Terminal</span>
        </h1>
        <p className="txt-2" style={{ fontSize: 15, opacity: 0.8 }}>
          Execute neural commands and batch operations via CLI.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        {/* Terminal Area */}
        <div style={{ display: 'flex', flexDirection: 'column', height: 600 }}>
          <div style={{ 
            flex: 1, 
            background: 'rgba(4, 8, 16, 0.95)', 
            border: '1px solid var(--border)', 
            borderRadius: '16px 16px 0 0',
            padding: '24px',
            fontFamily: 'var(--ff-mono)',
            fontSize: 14,
            color: 'var(--txt2)',
            overflowY: 'auto',
            position: 'relative'
          }} ref={scrollRef}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
                <span style={{ marginLeft: 12, fontSize: 12, color: 'var(--txt3)' }}>shadow-node:~</span>
              </div>
              <Chip variant="green" size="sm" style={{ fontWeight: 800 }}>CONNECTED</Chip>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {history.map((line, i) => (
                <div key={i} style={{ color: line.startsWith('>') ? 'var(--cyan)' : line.startsWith('//') ? 'var(--txt3)' : 'inherit' }}>
                  {line}
                </div>
              ))}
            </div>
          </div>

          <div style={{ 
            background: 'rgba(10, 18, 38, 0.8)', 
            border: '1px solid var(--border)', 
            borderTop: 'none',
            borderRadius: '0 0 16px 16px',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 16
          }}>
            <Icon name="terminal" size={18} color="var(--cyan)" />
            <input 
              className="mono"
              placeholder="Type a command..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && runCommand()}
              style={{ 
                flex: 1, 
                background: 'none', 
                border: 'none', 
                outline: 'none', 
                color: '#fff', 
                fontSize: 14,
                letterSpacing: '0.05em'
              }}
            />
            <button 
              onClick={() => runCommand()}
              className="btn-p" 
              style={{ padding: '8px 24px', borderRadius: 10, fontSize: 13 }}
            >
              Run
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="mono txt-3" style={{ fontSize: 10, letterSpacing: '0.1em' }}>PRESET COMMANDS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PRESETS.map((p, i) => (
              <button
                key={i}
                onClick={() => runCommand(p.cmd)}
                style={{
                  padding: '14px 18px',
                  background: 'rgba(10, 18, 38, 0.4)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(0, 229, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={p.icon} size={14} color="var(--cyan)" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{p.label}</div>
                  <div className="mono" style={{ fontSize: 9, color: 'var(--txt3)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>{p.cmd}</div>
                </div>
              </button>
            ))}
          </div>

          <GlassCard style={{ padding: '20px', marginTop: 10 } as React.CSSProperties}>
            <div className="mono txt-3" style={{ fontSize: 10, marginBottom: 16, letterSpacing: '0.1em' }}>QUICK TIPS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 12, color: 'var(--txt2)', lineHeight: 1.5 }}>
                <span className="txt-c">â€¢</span> Use <span className="txt-c">--batch</span> for bulk operations
              </div>
              <div style={{ fontSize: 12, color: 'var(--txt2)', lineHeight: 1.5 }}>
                <span className="txt-c">â€¢</span> Pipe output with <span className="txt-c">|</span> operator
              </div>
              <div style={{ fontSize: 12, color: 'var(--txt2)', lineHeight: 1.5 }}>
                <span className="txt-c">â€¢</span> <span className="txt-c">clear</span> resets the terminal
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
