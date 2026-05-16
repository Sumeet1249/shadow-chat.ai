// SignalFeed — Live signal stream (migrated to unified Icon system)
import { useState, useEffect } from 'react'
import { GlassCard, Chip, Icon } from '@/design-system/primitives'

type SignalType = 'insight' | 'trend' | 'network' | 'alert' | 'system'
interface Signal { id: number; type: SignalType; text: string; time: string; persona?: string }

const INITIAL_SIGNALS: Signal[] = [
  { id: 1, type: 'trend',   text: 'Thread "AI infrastructure debate" trending. 847 replies generated.', time: '2m ago', persona: 'Nexus Architect' },
  { id: 2, type: 'insight', text: 'Engagement peak detected: 8:30pm EST window. Reply velocity +23%.', time: '8m ago' },
  { id: 3, type: 'network', text: 'NODE-ALPHA exceeded 1,000 replies this session.', time: '14m ago' },
  { id: 4, type: 'alert',   text: 'NODE-EPSILON went offline. Investigate platform connection.', time: '22m ago' },
  { id: 5, type: 'system',  text: 'Model latency increased by 18ms. Switched to Claude 3.5 Sonnet.', time: '1h ago' },
]

// Unified Icon system names — no direct lucide-react imports
const TYPE_ICON: Record<SignalType, string> = {
  insight: 'auto_awesome',
  trend:   'trending_up',
  network: 'hub',
  alert:   'warning',
  system:  'settings',
}
const TYPE_COLOR: Record<SignalType, string> = {
  insight: 'var(--cyan)',
  trend:   'var(--amber)',
  network: '#a78bfa',
  alert:   'var(--red)',
  system:  'var(--txt3)',
}

export default function SignalFeed() {
  const [signals, setSignals] = useState<Signal[]>(INITIAL_SIGNALS)

  useEffect(() => {
    const iv = setInterval(() => {
      setSignals(s => [{
        id: Date.now(),
        type: 'trend',
        text: `New engagement spike detected on ${['Twitter', 'LinkedIn', 'Reddit'][Math.floor(Math.random() * 3)]}.`,
        time: 'just now',
      }, ...s.slice(0, 19)])
    }, 8000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="enter">
      <div style={{ marginBottom: 22 }}>
        <Chip variant="amber" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>LIVE FEED</Chip>
        <h1 className="h-md">Signal <span className="txt-a">Feed</span></h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {signals.map(s => {
          const iconName = TYPE_ICON[s.type]
          const color    = TYPE_COLOR[s.type]
          return (
            <GlassCard key={s.id} style={{ padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'flex-start', animation: 'enter 0.3s ease forwards' } as React.CSSProperties}>
              <div className="icon-box" style={{ width: 34, height: 34, background: `${color}14`, border: `1px solid ${color}25`, flexShrink: 0 }}>
                <Icon name={iconName} size={15} color={color} aria-hidden />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, lineHeight: 1.55, marginBottom: 4 }}>{s.text}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span className="mono txt-2" style={{ fontSize: 9 }}>{s.time}</span>
                  {s.persona && <span className="chip chip-v" style={{ fontSize: 9 }}>{s.persona}</span>}
                </div>
              </div>
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}
