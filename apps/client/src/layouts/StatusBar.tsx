import { memo, useEffect, useState } from 'react'
import { PulseDot } from '@/design-system/primitives'

/**
 * StatusBar — Fixed bottom bar.
 * aria-live="polite" for screen reader announcements.
 * Clock uses <time> with dateTime attribute.
 */
export const StatusBar = memo(function StatusBar() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(iv)
  }, [])

  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
  const isoStr = now.toISOString()

  return (
    <footer
      className="statusbar"
      aria-live="polite"
      aria-atomic="true"
      role="contentinfo"
    >
      {/* System status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <PulseDot color="green" size={5} />
        <span className="mono txt-2" style={{ fontSize: 9, letterSpacing: '0.1em' }}>NEURAL ONLINE</span>
      </div>

      {/* Stats */}
      <span className="mono txt-2" style={{ fontSize: 9, letterSpacing: '0.08em' }}>
        LATENCY: <span style={{ color: 'var(--green)' }}>142ms</span>
      </span>
      <span className="mono txt-2" style={{ fontSize: 9, letterSpacing: '0.08em' }}>
        NODES: <span style={{ color: 'var(--cyan)' }}>4/6</span>
      </span>
      <span className="mono txt-2" style={{ fontSize: 9, letterSpacing: '0.08em' }}>
        TOKENS: <span style={{ color: '#a78bfa' }}>89.4K</span>
      </span>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Clock */}
      <time
        dateTime={isoStr}
        className="mono txt-2"
        style={{ fontSize: 9, letterSpacing: '0.1em' }}
      >
        {timeStr} UTC
      </time>

      <span className="mono txt-2" style={{ fontSize: 9, letterSpacing: '0.08em' }}>v2.4.1</span>
    </footer>
  )
})
