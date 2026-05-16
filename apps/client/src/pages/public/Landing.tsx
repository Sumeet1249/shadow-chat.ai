import { Link } from 'react-router-dom'
import { ParticleCanvas } from '@/design-system/effects/ParticleCanvas'
import { AmbientOrbs, LANDING_ORBS } from '@/design-system/effects/AmbientOrbs'
import { GlassCard, Icon, Chip } from '@/design-system/primitives'
import { useTypewriter } from '@/hooks/useTypewriter'
import { Brain } from 'lucide-react'

const FEATURES = [
  { icon: 'auto_awesome', title: 'Neural Reply Engine',    desc: 'Sub-200ms generation across GPT-4o, Claude 3.5, and Gemini Pro simultaneously.', color: 'var(--cyan)' },
  { icon: 'psychology',   title: 'Persona Architecture',   desc: 'Configure distinct AI voices per platform. Each persona operates with isolated memory and tone calibration.', color: '#a78bfa' },
  { icon: 'memory',       title: 'Memory Matrix',          desc: 'Inject persistent context — niche expertise, competitor intelligence, tone rules — into every generation.', color: 'var(--amber)' },
  { icon: 'hub',          title: 'Node Command',           desc: 'Orchestrate multiple autonomous nodes across platforms from a single command center.', color: 'var(--green)' },
  { icon: 'emoji_events', title: 'Arena A/B Testing',      desc: 'Battle models head-to-head. ELO scoring identifies the highest-performing configuration for your niche.', color: 'var(--cyan)' },
  { icon: 'analytics',   title: 'Neural Analytics',       desc: 'Engagement tracking, platform breakdown, and AI-generated strategic insights.', color: '#a78bfa' },
]

// Prototype stats — marketing-grade values with pipe dividers
// null = vertical divider between stats
type StatEntry = { value: string; label: string } | null
const STATS: StatEntry[] = [
  { value: '2.4M+',  label: 'REPLIES GENERATED' },
  null,
  { value: '98.7%',  label: 'UPTIME SLA' },
  null,
  { value: '<180ms', label: 'AVG LATENCY' },
  null,
  { value: '47K+',   label: 'ACTIVE NODES' },
]

export default function Landing() {
  const typed = useTypewriter([
    'conversations.',
    'influence.',
    'authority.',
    'engagement.',
    'the narrative.',
  ], 70, 2200)

  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }} className="scan">
      <ParticleCanvas density={0.45} />
      <AmbientOrbs orbs={LANDING_ORBS} />

      {/* Nav */}
      <nav className="lnav" aria-label="Public navigation">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#00e5ff,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 18px rgba(0,229,255,0.35)' }}>
            <Brain size={16} color="#fff" aria-hidden />
          </div>
          <span style={{ fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 16 }}>SHADOW NODE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link to="/pricing" className="lnav-link mono txt-2" style={{ fontSize: 11, letterSpacing: '0.08em' }}>PRICING</Link>
          <Link to="/features" className="lnav-link mono txt-2" style={{ fontSize: 11, letterSpacing: '0.08em' }}>FEATURES</Link>
          <Link to="/changelog" className="lnav-link mono txt-2" style={{ fontSize: 11, letterSpacing: '0.08em' }}>CHANGELOG</Link>
          <Link to="/login" className="btn-g btn-sm">Login</Link>
          <Link to="/register" className="btn-p btn-sm">Get Access →</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
          <Chip variant="cyan" style={{ marginBottom: 20, display: 'inline-flex' } as React.CSSProperties}>
            <span className="dot" aria-hidden />
            NEURAL COMMAND SYSTEM v2.4
          </Chip>

          <h1 className="h-xl" style={{ marginBottom: 24, maxWidth: 860, margin: '0 auto 24px' }}>
            The neural layer between<br />
            you and every{' '}
            <span className="grad-c">
              {typed}
              <span className="blink" aria-hidden>▌</span>
            </span>
          </h1>

          <p style={{ fontSize: 17, color: 'var(--txt2)', maxWidth: 560, margin: '0 auto 44px', lineHeight: 1.75 }}>
            Configure AI personas, generate tactically superior replies, and operate across all platforms from one clandestine command center.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 72 }}>
            <Link to="/register" className="btn-p" style={{ padding: '14px 36px', fontSize: 15 }}>
              <Icon name="rocket_launch" size={16} aria-hidden />
              Deploy Node →
            </Link>
            <Link to="/features" className="btn-g" style={{ padding: '14px 32px', fontSize: 15 }}>
              <Icon name="monitoring" size={16} aria-hidden />
              View Architecture
            </Link>
          </div>

          {/* Stats row — prototype values with vertical pipe dividers */}
          <div className="stats-row">
            {STATS.map((s, i) =>
              s === null ? (
                // Vertical divider
                <div key={`div-${i}`} style={{ width: 1, height: 38, background: 'var(--border)', flexShrink: 0 }} aria-hidden />
              ) : (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 26, color: 'var(--cyan)' }}>{s.value}</div>
                  <div className="mono txt-2" style={{ fontSize: 9, letterSpacing: '0.12em', marginTop: 3 }}>{s.label}</div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '100px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <Chip variant="violet" style={{ marginBottom: 14, display: 'inline-flex' } as React.CSSProperties}>CAPABILITIES</Chip>
          <h2 className="h-lg">
            Everything you need to{' '}
            <span className="grad-c">dominate</span>
          </h2>
          <p className="txt-2" style={{ fontSize: 15, marginTop: 12, maxWidth: 520, margin: '12px auto 0', lineHeight: 1.7 }}>
            Six interconnected intelligence layers working in concert.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {FEATURES.map(f => (
            <div key={f.title} className="feat-card">
              <div className="icon-box" style={{ width: 48, height: 48, background: `${f.color}18`, border: `1px solid ${f.color}28`, marginBottom: 18 }}>
                <Icon name={f.icon} size={22} color={f.color} aria-hidden />
              </div>
              <h3 style={{ fontFamily: 'var(--ff-disp)', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{f.title}</h3>
              <p className="txt-2" style={{ fontSize: 13.5, lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 80px 120px', textAlign: 'center' }}>
        <GlassCard variant="elevated" style={{ maxWidth: 700, margin: '0 auto', padding: '60px 40px' } as React.CSSProperties}>
          <Chip variant="amber" style={{ marginBottom: 18, display: 'inline-flex' } as React.CSSProperties}>ACCESS RESTRICTED</Chip>
          <h2 className="h-lg" style={{ marginBottom: 14 }}>
            Ready to operate in the{' '}
            <span className="grad-a">shadows?</span>
          </h2>
          <p className="txt-2" style={{ fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
            Join 47,000+ operators running autonomous neural nodes across every major platform.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link to="/register" className="btn-a" style={{ padding: '14px 36px' }}>
              <Icon name="key" size={16} aria-hidden />
              Request Access
            </Link>
            <Link to="/login" className="btn-g" style={{ padding: '14px 28px' }}>
              Existing Operator →
            </Link>
          </div>
        </GlassCard>
      </section>
    </div>
  )
}
