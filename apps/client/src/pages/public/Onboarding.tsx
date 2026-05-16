import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GlassCard, Icon, Chip, Button, ProgressBar } from '@/design-system/primitives'
import { ParticleCanvas } from '@/design-system/effects/ParticleCanvas'
import { ScanlineOverlay } from '@/design-system/effects/ScanlineOverlay'

const PLATFORMS = [
  { id: 'twitter',   label: 'Twitter',   icon: 'alternate_email' },
  { id: 'linkedin',  label: 'LinkedIn',  icon: 'business' },
  { id: 'reddit',    label: 'Reddit',    icon: 'forum' },
  { id: 'discord',   label: 'Discord',   icon: 'groups' },
  { id: 'threads',   label: 'Threads',   icon: 'chat_bubble' },
  { id: 'tiktok',    label: 'TikTok',    icon: 'auto_awesome' },
  { id: 'instagram', label: 'Instagram', icon: 'star' },
  { id: 'email',     label: 'Email',     icon: 'mail' },
]

const NICHES = [
  'AI & Machine Learning', 'Crypto & Web3', 'SaaS & Startups', 'Developer Tools',
  'Data Science', 'Product & Design', 'Finance & Investing', 'Content & Marketing'
]

type Step = 0 | 1 | 2

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>(0)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedNiche, setSelectedNiche] = useState('')
  const [personaName, setPersonaName] = useState('')
  const [personaTone, setPersonaTone] = useState('')

  const togglePlatform = (id: string) => setSelectedPlatforms(ps => ps.includes(id) ? ps.filter(p => p !== id) : [...ps, id])

  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <ScanlineOverlay />
      <ParticleCanvas density={0.2} />

      <div style={{ width: '100%', maxWidth: 600, position: 'relative', zIndex: 1 }}>
        
        {/* Step progress bar */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span className="mono txt-2" style={{ fontSize: 10 }}>ONBOARDING PHASE {step + 1}/3</span>
            <span className="mono txt-c" style={{ fontSize: 10 }}>{['TARGET_CHANNELS', 'DOMAIN_EXPERT', 'NEURAL_PROFILE'][step]}</span>
          </div>
          <div style={{ height: 2, background: 'var(--border)', width: '100%', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${((step + 1) / 3) * 100}%`, background: 'var(--cyan)', transition: 'width 0.4s ease' }} />
          </div>
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
          <GlassCard style={{ padding: '40px' } as React.CSSProperties}>
            
            {step === 0 && (
              <>
                <h1 className="h-md" style={{ marginBottom: 6 }}>Target Platforms</h1>
                <p className="txt-2" style={{ fontSize: 14, marginBottom: 24 }}>Select the channels where your neural nodes will operate.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 32 }}>
                  {PLATFORMS.map(p => (
                    <button key={p.id} onClick={() => togglePlatform(p.id)} style={{ padding: '14px', borderRadius: 'var(--r-md)', border: `1px solid ${selectedPlatforms.includes(p.id) ? 'var(--cyan)' : 'var(--border)'}`, background: selectedPlatforms.includes(p.id) ? 'rgba(0,229,255,0.05)' : 'rgba(255,255,255,0.02)', color: selectedPlatforms.includes(p.id) ? 'var(--cyan)' : 'var(--txt2)', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Icon name={p.icon} size={16} />
                      <span className="mono" style={{ fontSize: 11 }}>{p.label.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
                <Button variant="primary" style={{ width: '100%', justifyContent: 'center' }} disabled={selectedPlatforms.length === 0} onClick={() => setStep(1)}>
                  Next: Define Niche →
                </Button>
              </>
            )}

            {step === 1 && (
              <>
                <h1 className="h-md" style={{ marginBottom: 6 }}>Operational Niche</h1>
                <p className="txt-2" style={{ fontSize: 14, marginBottom: 24 }}>Your expertise domain shapes the neural response logic.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 32 }}>
                  {NICHES.map(n => (
                    <button key={n} onClick={() => setSelectedNiche(n)} style={{ padding: '12px', borderRadius: 'var(--r-md)', border: `1px solid ${selectedNiche === n ? 'var(--cyan)' : 'var(--border)'}`, background: selectedNiche === n ? 'rgba(0,229,255,0.05)' : 'rgba(255,255,255,0.02)', color: selectedNiche === n ? 'var(--cyan)' : 'var(--txt2)', cursor: 'pointer', textAlign: 'left', fontSize: 13 }}>
                      {n}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Button variant="ghost" onClick={() => setStep(0)} style={{ flex: 1, justifyContent: 'center' }}>Back</Button>
                  <Button variant="primary" style={{ flex: 2, justifyContent: 'center' }} disabled={!selectedNiche} onClick={() => setStep(2)}>
                    Next: Build Persona →
                  </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="h-md" style={{ marginBottom: 6 }}>Neural Profile</h1>
                <p className="txt-2" style={{ fontSize: 14, marginBottom: 24 }}>Define the identity and voice of your primary persona.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
                  <div>
                    <label className="mono txt-2" style={{ fontSize: 9, display: 'block', marginBottom: 8 }}>PERSONA NAME</label>
                    <input className="field" placeholder="e.g. Nexus Architect" value={personaName} onChange={e => setPersonaName(e.target.value)} />
                  </div>
                  <div>
                    <label className="mono txt-2" style={{ fontSize: 9, display: 'block', marginBottom: 8 }}>VOICE TONE</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                      {['Analytical', 'Provocative', 'Helpful', 'Aggressive', 'Helpful', 'Helpful'].map((t, i) => (
                        <button key={i} onClick={() => setPersonaTone(t)} style={{ padding: '10px', borderRadius: 8, border: `1px solid ${personaTone === t ? 'var(--cyan)' : 'var(--border)'}`, background: personaTone === t ? 'rgba(0,229,255,0.05)' : 'transparent', color: personaTone === t ? 'var(--cyan)' : 'var(--txt2)', fontSize: 11, cursor: 'pointer' }}>{t}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Button variant="ghost" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: 'center' }}>Back</Button>
                  <Button variant="primary" style={{ flex: 2, justifyContent: 'center' }} disabled={!personaName || !personaTone} onClick={() => navigate('/calibrate')}>
                    Finish & Calibrate →
                  </Button>
                </div>
              </>
            )}

          </GlassCard>
        </motion.div>
        
        <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: 'var(--txt3)', fontSize: 12, marginTop: 24, cursor: 'pointer', width: '100%', textDecoration: 'underline' }}>Skip setup and go to dashboard</button>

      </div>
    </div>
  )
}
