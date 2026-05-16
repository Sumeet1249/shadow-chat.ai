// ShadowArchive — Phase 6.7 stub
import { useState } from 'react'
import { GlassCard, Chip, Icon, } from '@/design-system/primitives'
import { MOCK_OUTPUTS, PLATFORM_COLORS } from '@/data/mock/outputs'
import { useDebounce } from '@/hooks/useDebounce'

export default function ShadowArchive() {
  const [q, setQ] = useState('')
  const dq = useDebounce(q, 300)
  const filtered = MOCK_OUTPUTS.filter(o =>
    o.text.toLowerCase().includes(dq.toLowerCase()) ||
    o.platform.toLowerCase().includes(dq.toLowerCase()) ||
    o.persona.toLowerCase().includes(dq.toLowerCase())
  )

  return (
    <div className="enter">
      <div style={{ marginBottom: 22 }}>
        <Chip variant="violet" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>ARCHIVE</Chip>
        <h1 className="h-md">Shadow <span className="txt-v">Archive</span></h1>
        <p className="txt-2" style={{ fontSize: 13.5, marginTop: 4 }}>All generated outputs — searchable and filterable.</p>
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input className="field" placeholder="Search outputs..." value={q} onChange={e => setQ(e.target.value)} style={{ flex: 1 }} aria-label="Search archive" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((o) => (
          <GlassCard key={o.id} className="hover-glow" style={{ padding: '16px 20px' } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 9, color: PLATFORM_COLORS[o.platform], background: `${PLATFORM_COLORS[o.platform]}18`, border: `1px solid ${PLATFORM_COLORS[o.platform]}2e`, padding: '2px 8px', borderRadius: 999 }}>{o.platform.toUpperCase()}</span>
                <span className="chip chip-v" style={{ fontSize: 9 }}>{o.persona}</span>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span className="mono" style={{ fontSize: 9, color: 'var(--green)' }}>{o.eng}</span>
                <span className="mono txt-2" style={{ fontSize: 9 }}>{o.time}</span>
                <button className="btn-g btn-sm" onClick={() => navigator.clipboard.writeText(o.text).catch(() => {})} aria-label="Copy output text">
                  <Icon name="content_copy" size={11} aria-hidden />
                </button>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6 }}>"{o.text}"</p>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
