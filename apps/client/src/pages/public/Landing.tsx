import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ParticleCanvas } from '@/design-system/effects/ParticleCanvas'
import { AmbientOrbs, LANDING_ORBS } from '@/design-system/effects/AmbientOrbs'
import { ScanlineOverlay } from '@/design-system/effects/ScanlineOverlay'
import { GlassCard, Icon, Chip } from '@/design-system/components'
import { useTypewriter } from '@/hooks/useTypewriter'
import { Brain } from 'lucide-react'

const FEATURES = [
  { icon: 'psychology',   title: 'Neural Persona Engine',   chip: 'INTELLIGENCE', desc: 'Configure AI identities that mirror your voice with surgical precision across every platform you operate.', color: 'var(--cyan)' },
  { icon: 'bolt',         title: 'Zero-Latency Generation', chip: 'SPEED',        desc: 'Context-aware replies streamed in under 200ms. Fastest neural inference in the stack.', color: '#a78bfa' },
  { icon: 'shield',       title: 'Shadow Architecture',    chip: 'SECURITY',     desc: 'End-to-end encrypted operations. Your prompts, personas, and outputs remain clandestine.', color: 'var(--amber)' },
  { icon: 'globe',        title: 'Multi-Platform Sync',     chip: 'REACH',        desc: 'One command center for Twitter, LinkedIn, Reddit, Discord, and email — fully synchronized.', color: 'var(--green)' },
  { icon: 'bar_chart',    title: 'Neural Analytics',       chip: 'DATA',         desc: 'Measure engagement, A/B test reply tones, and optimize strategy with ML-backed telemetry.', color: 'var(--cyan)' },
  { icon: 'sports_esports', title: 'The Arena',            chip: 'COMPETITIVE',  desc: 'Run live AI model battles. Compare outputs side-by-side and crown the optimal response.', color: '#a78bfa' },
]

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
    'Your AI Reply Shadow',
  ], 80, 5000)

  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      <ScanlineOverlay />
      <ParticleCanvas density={0.45} />
      <AmbientOrbs orbs={LANDING_ORBS} />

      {/* Nav */}
      <nav className="lnav" aria-label="Public navigation">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#00e5ff,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 18px rgba(0,229,255,0.35)' }}>
            <Brain size={16} color="#fff" aria-hidden />
          </div>
          <div style={{ fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 16, letterSpacing: '0.05em' }}>SHADOW NODE</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link to="/features" className="lnav-link mono txt-2" style={{ fontSize: 11 }}>FEATURES</Link>
          <Link to="/pricing" className="lnav-link mono txt-2" style={{ fontSize: 11 }}>PRICING</Link>
          <Link to="/docs" className="lnav-link mono txt-2" style={{ fontSize: 11 }}>DOCS</Link>
          <Link to="/changelog" className="lnav-link mono txt-2" style={{ fontSize: 11 }}>CHANGELOG</Link>
          <Link to="/login" className="mono txt-2" style={{ fontSize: 11, marginRight: 10 }}>Login</Link>
          <Link to="/register" className="btn-p btn-sm" style={{ padding: '8px 18px' }}>Get Access →</Link>
        </div>
      </nav>

      {/* Hero Section (Matched Image 6) */}
      <section className="hero" style={{ position: 'relative', zIndex: 1, padding: '160px 20px 80px' }}>
        <div style={{ textAlign: 'center', maxWidth: 1000, margin: '0 auto' }}>
          <Chip variant="green" style={{ marginBottom: 24, padding: '4px 12px' }}>
            <div className="dot" style={{ marginRight: 8 }} />
            NEURAL CORE v2.4.1 — NOW ACTIVE
          </Chip>

          <h1 className="h-xl" style={{ marginBottom: 20, position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60%', height: '60%', background: 'var(--cyan)', filter: 'blur(120px)', opacity: 0.15, borderRadius: '50%', zIndex: -1 }} />
            The<br />
            Shadow<br />
            that <span className="grad-c">Replies</span>
          </h1>

          <div className="mono txt-2" style={{ fontSize: 16, letterSpacing: '0.2em', marginBottom: 40, opacity: 0.8 }}>
            // {typed}
            <span className="blink">▌</span>
          </div>

          <p className="txt-2" style={{ fontSize: 17, maxWidth: 600, margin: '0 auto 48px', lineHeight: 1.8 }}>
            Shadow Node is the neural layer between you and every conversation. Configure AI personas, generate tactically superior replies, and operate across all platforms from one clandestine command center.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link to="/register" className="btn-p" style={{ padding: '16px 44px', fontSize: 16, borderRadius: 'var(--r-pill)' }}>
              <Icon name="bolt" size={18} /> Activate Node
            </Link>
            <button className="btn-g" style={{ padding: '16px 40px', fontSize: 16, borderRadius: 'var(--r-pill)' }}>
              <Icon name="play_arrow" size={18} /> Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats (Matched Image 2) */}
      <section style={{ position: 'relative', zIndex: 1, padding: '40px 0', display: 'flex', justifyContent: 'center' }}>
        <div className="stats-row">
          {STATS.map((s, i) =>
            s === null ? (
              <div key={`div-${i}`} style={{ width: 1, height: 32, background: 'var(--border)', opacity: 0.5 }} />
            ) : (
              <div key={s.label} style={{ textAlign: 'center', minWidth: 160 }}>
                <div className="h-sm grad-c" style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>{s.value}</div>
                <div className="mono txt-2" style={{ fontSize: 10, letterSpacing: '0.15em' }}>{s.label}</div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Features Grid (Matched Image 1 & 2) */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '120px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <Chip variant="violet" style={{ marginBottom: 16, textTransform: 'uppercase' }}>Tactical Advantages</Chip>
          <h2 className="h-lg">Built for the <span className="grad-c">Operator Mindset</span></h2>
          <p className="txt-2" style={{ fontSize: 16, marginTop: 16, maxWidth: 520, margin: '16px auto 0' }}>
            Every feature engineered for precision, speed, and strategic advantage in the attention economy.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {FEATURES.map(f => (
            <GlassCard key={f.title} style={{ padding: '32px' } as React.CSSProperties} className="hover-glow">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div className="icon-box" style={{ width: 44, height: 44, background: `${f.color}14`, border: `1px solid ${f.color}24` }}>
                  <Icon name={f.icon} size={20} color={f.color} />
                </div>
                <Chip variant="cyan" style={{ background: 'rgba(0,229,255,0.05)', fontSize: 9 }}>{f.chip}</Chip>
              </div>
              <h3 className="h-sm" style={{ marginBottom: 12 }}>{f.title}</h3>
              <p className="txt-2" style={{ fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA Section (Matched Image 1) */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 40px 160px' }}>
        <GlassCard 
          style={{ 
            maxWidth: 1100, 
            margin: '0 auto', 
            padding: '80px 60px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
          } as React.CSSProperties}
        >
          <div style={{ position: 'absolute', bottom: -50, right: -50, width: 300, height: 300, background: 'var(--cyan)', filter: 'blur(100px)', opacity: 0.1, borderRadius: '50%', zIndex: -1 }} />
          
          <div style={{ maxWidth: 500 }}>
            <h2 className="h-lg" style={{ marginBottom: 16 }}>
              Ready to go <span className="grad-c glow-c" style={{ textShadow: '0 0 30px var(--cyan)' }}>dark?</span>
            </h2>
            <p className="txt-2" style={{ fontSize: 16, lineHeight: 1.6 }}>
              Join 47,000+ operators running the Shadow Node. Free tier available — no card required.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Link 
              to="/register" 
              className="btn-p" 
              style={{ 
                padding: '16px 40px', 
                fontSize: 16, 
                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                color: '#fff',
                boxShadow: '0 0 30px rgba(245,158,11,0.2)'
              }}
            >
              <Icon name="bolt" size={18} /> Start Free
            </Link>
            <Link to="/pricing" className="btn-g" style={{ padding: '16px 32px', fontSize: 16 }}>
              View Pricing
            </Link>
          </div>
        </GlassCard>
      </section>
    </div>
  )
}
