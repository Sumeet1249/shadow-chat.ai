import { Link } from 'react-router-dom'
import { ParticleCanvas } from '@/design-system/effects/ParticleCanvas'
import { GlassCard, Chip } from '@/design-system/primitives'
import { Brain } from 'lucide-react'

const RELEASES = [
  { ver: '2.4.1', date: 'May 12, 2025', tags: ['feature', 'improvement'] as const, notes: [
    { type: 'feature' as const,     text: 'Added Arena ELO scoring with persistent leaderboard' },
    { type: 'feature' as const,     text: 'New batch generation mode in Workflow Terminal' },
    { type: 'improvement' as const, text: 'Reduced generation latency by 23% (avg 142ms)' },
    { type: 'fix' as const,         text: 'Fixed Memory Matrix search indexing for special characters' },
  ]},
  { ver: '2.4.0', date: 'Apr 28, 2025', tags: ['feature'] as const, notes: [
    { type: 'feature' as const,     text: 'Launched Neural Marketplace for community persona templates' },
    { type: 'feature' as const,     text: 'Syndicate Operations — team management and role-based access' },
    { type: 'improvement' as const, text: 'Redesigned Global Telemetry with live animated map' },
  ]},
]

const TAG_COLORS = { feature: 'chip-c', fix: 'chip-r', improvement: 'chip-v' } as const

export default function Changelog() {
  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh' }} className="scan enter">
      <ParticleCanvas density={0.3} />
      <nav className="lnav" aria-label="Public navigation">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: 'linear-gradient(135deg,#00e5ff,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Brain size={15} color="#fff" aria-hidden /></div>
          <span style={{ fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 16 }}>SHADOW NODE</span>
        </div>
        <Link to="/" className="btn-g btn-sm">← Back</Link>
      </nav>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto', padding: '120px 32px 80px' }}>
        <div style={{ marginBottom: 40 }}>
          <Chip variant="violet" style={{ marginBottom: 14, display: 'inline-flex' } as React.CSSProperties}>UPDATES</Chip>
          <h1 className="h-lg">Neural <span className="txt-v">Changelog</span></h1>
        </div>
        {RELEASES.map((r, i) => (
          <div key={i} style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 22 }}>v{r.ver}</span>
              <span className="mono txt-2" style={{ fontSize: 11 }}>{r.date}</span>
              {r.tags.map((t, j) => <span key={j} className={`chip ${TAG_COLORS[t]}`} style={{ fontSize: 9 }}>{t.toUpperCase()}</span>)}
            </div>
            <GlassCard style={{ padding: '20px 24px' } as React.CSSProperties}>
              {r.notes.map((n, j) => (
                <div key={j} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: j < r.notes.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span className={`chip ${TAG_COLORS[n.type]}`} style={{ fontSize: 9, flexShrink: 0 }}>{n.type.toUpperCase()}</span>
                  <span style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5 }}>{n.text}</span>
                </div>
              ))}
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  )
}
