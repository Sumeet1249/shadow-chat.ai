import { Link } from 'react-router-dom'
import { ParticleCanvas } from '@/design-system/effects/ParticleCanvas'
import { ScanlineOverlay } from '@/design-system/effects/ScanlineOverlay'
import { GlassCard, Icon, Chip, Button } from '@/design-system/primitives'
import { Brain } from 'lucide-react'

const FEATURES = [
  { icon: 'auto_awesome', title: 'Neural Generation', desc: 'Context-aware reply generation using state-of-the-art LLMs (GPT-4o, Claude 3.5).', color: 'var(--cyan)' },
  { icon: 'psychology', title: 'Persona Calibration', desc: 'Define unique AI voices with isolated memory, tone, and behavioral logic.', color: '#a78bfa' },
  { icon: 'hub', title: 'Node Cluster', desc: 'Distributed infrastructure to manage hundreds of accounts with unique IP signatures.', color: 'var(--amber)' },
  { icon: 'memory', title: 'Memory Matrix', desc: 'Inject persistent context and domain knowledge into every neural response.', color: 'var(--green)' },
  { icon: 'emoji_events', title: 'Arena Testing', desc: 'Battle personas head-to-head to find the highest-converting response patterns.', color: '#00e5ff' },
  { icon: 'shield', title: 'Encrypted Vault', desc: 'Enterprise-grade security with AES-256 encryption for all credentials and keys.', color: '#f87171' },
]

export default function Features() {
  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh', position: 'relative' }}>
      <ScanlineOverlay />
      <ParticleCanvas density={0.3} />
      
      {/* Nav */}
      <nav className="lnav" style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg,#00e5ff,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={14} color="#fff" />
          </div>
          <span style={{ fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 14, color: '#fff' }}>SHADOW NODE</span>
        </Link>
        <div style={{ display: 'flex', gap: 20 }}>
          <Link to="/pricing" className="mono txt-2" style={{ fontSize: 10, textDecoration: 'none' }}>PRICING</Link>
          <Link to="/login" className="btn-g btn-sm">Login</Link>
        </div>
      </nav>

      <main style={{ position: 'relative', zIndex: 1, paddingTop: 140, paddingBottom: 100 }}>
        {/* Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: 80, padding: '0 20px' }}>
          <Chip variant="violet" style={{ marginBottom: 16, display: 'inline-flex' } as React.CSSProperties}>CAPABILITIES</Chip>
          <h1 className="h-xl" style={{ marginBottom: 16 }}>The Core <span className="grad-v">Architecture</span></h1>
          <p className="txt-2" style={{ fontSize: 17, maxWidth: 600, margin: '0 auto', lineHeight: 1.65 }}>
            A unified neural command center built for the distributed agentic web.
          </p>
        </section>

        {/* Feature Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
          {FEATURES.map((f, i) => (
            <GlassCard key={i} className="hover-glow" style={{ padding: '32px' } as React.CSSProperties}>
              <div className="icon-box" style={{ width: 56, height: 56, background: `${f.color}15`, border: `1px solid ${f.color}30`, marginBottom: 20 }}>
                <Icon name={f.icon} size={24} color={f.color} />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{f.title}</h3>
              <p className="txt-2" style={{ fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </GlassCard>
          ))}
        </div>

        {/* Tech Specs Section */}
        <section style={{ maxWidth: 1100, margin: '80px auto 0', padding: '0 40px' }}>
          <GlassCard variant="elevated" style={{ padding: '40px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 11, marginBottom: 32, letterSpacing: '0.12em' }}>TECHNICAL_SPECIFICATIONS v2.4</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
              {[
                { l: 'INFERENCE', v: '<200ms', d: 'Latency across 3 regions' },
                { l: 'CAPACITY', v: '1M+', d: 'Tokens per persona / day' },
                { l: 'UPTIME', v: '99.98%', d: 'Distributed node cluster' },
                { l: 'SECURITY', v: 'AES-256', d: 'End-to-end key encryption' },
              ].map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 24, color: 'var(--cyan)', marginBottom: 4 }}>{s.v}</div>
                  <div className="mono" style={{ fontSize: 10, marginBottom: 4 }}>{s.l}</div>
                  <div className="txt-2" style={{ fontSize: 11 }}>{s.d}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', marginTop: 100 }}>
          <h2 className="h-lg" style={{ marginBottom: 20 }}>Ready to deploy?</h2>
          <Button variant="primary" style={{ padding: '14px 40px', fontSize: 15 }} onClick={() => window.location.href='/register'}>
            Initialize Node Cluster →
          </Button>
        </section>
      </main>
    </div>
  )
}
