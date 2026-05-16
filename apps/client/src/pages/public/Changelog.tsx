import { Link } from 'react-router-dom'
import { ParticleCanvas } from '@/design-system/effects/ParticleCanvas'
import { ScanlineOverlay } from '@/design-system/effects/ScanlineOverlay'
import { GlassCard, Chip, Icon, Button } from '@/design-system/primitives'
import { Brain } from 'lucide-react'

const RELEASES = [
  { ver: '2.4.1', date: 'MAY 12, 2025', notes: [
    { type: 'NEW', text: 'Added Arena ELO scoring with persistent leaderboard and battle history.' },
    { type: 'FIX', text: 'Corrected avatar glow rendering on Safari and legacy browsers.' },
    { type: 'IMP', text: 'Reduced inference latency by 23% across global node clusters.' },
  ]},
  { ver: '2.4.0', date: 'APR 28, 2025', notes: [
    { type: 'NEW', text: 'Launched Neural Marketplace for community persona templates and memory clusters.' },
    { type: 'NEW', text: 'Syndicate Operations: Role-based access control and team seats.' },
    { type: 'IMP', text: 'Redesigned Global Telemetry with real-time SVG animated infrastructure map.' },
  ]},
  { ver: '2.3.5', date: 'APR 10, 2025', notes: [
    { type: 'FIX', text: 'Resolved token budget calculation error for multi-model concurrent generation.' },
    { type: 'NEW', text: 'Support for Claude 3.5 Sonnet added to all node regions.' },
  ]},
]

const TAG_COLOR: Record<string, string> = {
  NEW: 'var(--green)',
  FIX: 'var(--red)',
  IMP: 'var(--cyan)',
}

export default function Changelog() {
  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh', position: 'relative' }}>
      <ScanlineOverlay />
      <ParticleCanvas density={0.2} />
      
      {/* Nav */}
      <nav className="lnav" style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg,#00e5ff,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={14} color="#fff" />
          </div>
          <span style={{ fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 14, color: '#fff' }}>SHADOW NODE</span>
        </Link>
        <Link to="/" className="btn-g btn-sm">← Back</Link>
      </nav>

      <main style={{ position: 'relative', zIndex: 1, paddingTop: 140, paddingBottom: 100, maxWidth: 800, margin: '0 auto', paddingLeft: 40, paddingRight: 40 }}>
        <div style={{ marginBottom: 60, textAlign: 'center' }}>
          <Chip variant="violet" style={{ marginBottom: 16, display: 'inline-flex' } as React.CSSProperties}>RELEASE_HISTORY</Chip>
          <h1 className="h-xl">System <span className="grad-v">Updates</span></h1>
          <p className="txt-2" style={{ fontSize: 16, marginTop: 8 }}>Tracking the evolution of the neural command center.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {RELEASES.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24 }}>
              <div style={{ textAlign: 'right', paddingTop: 4 }}>
                <div style={{ fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 24, marginBottom: 4 }}>v{r.ver}</div>
                <div className="mono txt-2" style={{ fontSize: 10 }}>{r.date}</div>
              </div>
              <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 24, position: 'relative' }}>
                <div style={{ position: 'absolute', left: -5, top: 12, width: 9, height: 9, borderRadius: '50%', background: 'var(--violet)', boxShadow: '0 0 10px var(--violet)' }} />
                <GlassCard style={{ padding: '24px' } as React.CSSProperties}>
                  {r.notes.map((n, j) => (
                    <div key={j} style={{ display: 'flex', gap: 12, marginBottom: j < r.notes.length - 1 ? 16 : 0, alignItems: 'flex-start' }}>
                      <span className="mono" style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: `${TAG_COLOR[n.type]}15`, color: TAG_COLOR[n.type], border: `1px solid ${TAG_COLOR[n.type]}30`, flexShrink: 0 }}>{n.type}</span>
                      <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.55 }}>{n.text}</p>
                    </div>
                  ))}
                </GlassCard>
              </div>
            </div>
          ))}
        </div>

        {/* Discord CTA */}
        <section style={{ marginTop: 80 }}>
          <GlassCard variant="elevated" style={{ padding: '40px', textAlign: 'center', background: 'rgba(124,58,237,0.03)' } as React.CSSProperties}>
            <Icon name="groups" size={40} color="var(--violet)" style={{ marginBottom: 16 }} />
            <h2 className="h-md" style={{ marginBottom: 8 }}>Join the Syndicate</h2>
            <p className="txt-2" style={{ fontSize: 15, marginBottom: 24, maxWidth: 460, margin: '0 auto 24px' }}>
              Connect with 47,000+ operators, share persona templates, and get early access to beta builds.
            </p>
            <Button variant="primary" style={{ padding: '12px 32px' }}>
              Access Community Discord →
            </Button>
          </GlassCard>
        </section>
      </main>
    </div>
  )
}
