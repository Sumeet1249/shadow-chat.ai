import { memo, useEffect, useState } from 'react'
import { PulseDot } from '@/design-system/components'

export const StatusBar = memo(function StatusBar() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(iv)
  }, [])

  const formatTime = (date: Date) => {
    const h = date.getHours().toString().padStart(2, '0')
    const m = date.getMinutes().toString().padStart(2, '0')
    const s = date.getSeconds().toString().padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  return (
    <footer className="statusbar" style={{ height: 32, padding: '0 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <PulseDot color="cyan" size={6} />
          <span className="mono" style={{ fontSize: 10, color: 'var(--cyan)', fontWeight: 700, letterSpacing: '0.05em' }}>MODEL ACTIVE</span>
        </div>

        <span className="mono" style={{ fontSize: 10, color: 'var(--txt2)' }}>claude-3.5-sonnet</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--txt3)' }}>TOKENS</span>
          <span className="mono" style={{ fontSize: 10, color: '#fff', fontWeight: 700 }}>128K</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--green)', fontWeight: 700 }}>LATENCY 42ms</span>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div className="mono" style={{ fontSize: 11, color: 'var(--txt2)', letterSpacing: '0.1em' }}>
        {formatTime(now)}
      </div>
    </footer>
  )
})
