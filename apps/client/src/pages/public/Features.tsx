import { Link } from 'react-router-dom'
import { ParticleCanvas } from '@/design-system/effects/ParticleCanvas'
import { GlassCard, Icon, Chip } from '@/design-system/primitives'
import { Brain } from 'lucide-react'

const LAYERS = [
  { name: 'Generation Engine', desc: 'Multi-model neural inference with sub-200ms latency', items: ['Reply Generation', 'Batch Processing', 'Streaming Output', 'Multi-Platform Sync'], color: 'var(--cyan)', icon: 'auto_awesome' },
  { name: 'Intelligence Layer', desc: 'Persistent memory, persona management, and context injection', items: ['Memory Matrix', 'Persona Engine', 'Marketplace', 'Context Injection'], color: '#a78bfa', icon: 'psychology' },
  { name: 'Operations Hub', desc: 'Node orchestration, team management, and workflow automation', items: ['Node Command Center', 'Syndicate Ops', 'Workflow Terminal', 'Signal Feed'], color: 'var(--amber)', icon: 'hub' },
  { name: 'Analytics Core', desc: 'ML-backed telemetry, engagement tracking, and AI insights', items: ['Neural Analytics', 'Global Telemetry', 'System Health', 'A/B Arena'], color: 'var(--green)', icon: 'analytics' },
]

export default function Features() {
  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh' }} className="scan enter">
      <ParticleCanvas density={0.3} />
      <nav className="lnav" aria-label="Public navigation">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: 'linear-gradient(135deg,#00e5ff,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Brain size={15} color="#fff" aria-hidden /></div>
          <span style={{ fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 16 }}>SHADOW NODE</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/login" className="btn-g btn-sm">Login</Link>
          <Link to="/register" className="btn-p btn-sm">Get Access →</Link>
        </div>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '120px 60px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <Chip variant="cyan" style={{ marginBottom: 14, display: 'inline-flex' } as React.CSSProperties}>ARCHITECTURE</Chip>
          <h1 className="h-lg">System <span className="grad-c">Architecture</span></h1>
          <p className="txt-2" style={{ fontSize: 15, marginTop: 12, maxWidth: 520, margin: '12px auto 0', lineHeight: 1.7 }}>Four interconnected layers powering the most advanced AI reply platform.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {LAYERS.map((l, i) => (
            <GlassCard key={i} className="hover-glow" style={{ padding: '28px 32px', transition: 'all var(--t-mid)' } as React.CSSProperties}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                <div className="icon-box" style={{ width: 56, height: 56, background: `${l.color}14`, border: `1px solid ${l.color}30`, flexShrink: 0 }}>
                  <Icon name={l.icon} size={24} color={l.color} aria-hidden />
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontFamily: 'var(--ff-disp)', fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{l.name}</h2>
                  <p className="txt-2" style={{ fontSize: 13, marginBottom: 14 }}>{l.desc}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {l.items.map((item, j) => (
                      <span key={j} className="chip" style={{ background: `${l.color}0a`, color: l.color, border: `1px solid ${l.color}25`, padding: '6px 14px' }}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
              {i < LAYERS.length - 1 && <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}><Icon name="arrow_downward" size={16} color="var(--txt3)" aria-hidden /></div>}
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}
