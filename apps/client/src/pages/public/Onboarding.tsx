import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GlassCard, Icon, Chip, Button, ProgressBar } from '@/design-system/primitives'
import { ParticleCanvas } from '@/design-system/effects/ParticleCanvas'

const PLATFORMS = [
  { id: 'twitter',   label: 'Twitter / X',  color: '#1DA1F2', icon: 'chat_bubble', desc: 'AI replies & thread engagement' },
  { id: 'linkedin',  label: 'LinkedIn',      color: '#0077b5', icon: 'person_check', desc: 'Thought leadership & authority' },
  { id: 'reddit',    label: 'Reddit',        color: '#FF4500', icon: 'globe',       desc: 'Community & technical threads' },
  { id: 'discord',   label: 'Discord',       color: '#5865F2', icon: 'chat',        desc: 'Community builder & mod assist' },
]

const NICHES = ['AI & Machine Learning', 'Crypto & Web3', 'SaaS & Startups', 'Developer Tools', 'Data Science', 'Product & Design', 'Finance & Investing', 'Content & Marketing']

import { useState } from 'react'

type Step = 1 | 2 | 3

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>(1)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedNiche, setSelectedNiche] = useState('')
  const [personaName, setPersonaName] = useState('')
  const [personaTone, setPersonaTone] = useState('')

  const togglePlatform = (id: string) => setSelectedPlatforms(ps => ps.includes(id) ? ps.filter(p => p !== id) : [...ps, id])

  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }} className="scan">
      <ParticleCanvas density={0.2} />

      <div style={{ width: '100%', maxWidth: 640, position: 'relative', zIndex: 1 }}>
        {/* Step indicator */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            {['SELECT PLATFORMS', 'DEFINE NICHE', 'BUILD PERSONA'].map((label, i) => (
              <span key={i} className="mono" style={{ fontSize: 9, color: step > i + 1 ? 'var(--green)' : step === i + 1 ? 'var(--cyan)' : 'var(--txt3)', letterSpacing: '0.1em' }}>
                {i + 1}. {label}
              </span>
            ))}
          </div>
          <ProgressBar value={(step / 3) * 100} color="linear-gradient(to right, var(--cyan), #7c3aed)" />
        </div>

        <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <GlassCard variant="elevated" style={{ padding: '36px 40px' } as React.CSSProperties}>
            {step === 1 && (
              <>
                <Chip variant="cyan" style={{ marginBottom: 16, display: 'inline-flex' } as React.CSSProperties}>STEP 1 OF 3</Chip>
                <h1 className="h-md" style={{ marginBottom: 6 }}>Select Your Platforms</h1>
                <p className="txt-2" style={{ fontSize: 13.5, marginBottom: 28 }}>Choose where your neural nodes will operate.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
                  {PLATFORMS.map(p => (
                    <button key={p.id} onClick={() => togglePlatform(p.id)}
                      style={{ padding: '18px', borderRadius: 'var(--r-lg)', border: `1px solid ${selectedPlatforms.includes(p.id) ? p.color + '40' : 'var(--border)'}`, background: selectedPlatforms.includes(p.id) ? `${p.color}0a` : 'rgba(255,255,255,0.02)', cursor: 'pointer', textAlign: 'left', transition: 'all var(--t-mid)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <Icon name={p.icon} size={16} color={selectedPlatforms.includes(p.id) ? p.color : 'var(--txt3)'} aria-hidden />
                        <span style={{ fontWeight: 600, fontSize: 13, color: selectedPlatforms.includes(p.id) ? 'var(--txt)' : 'var(--txt2)' }}>{p.label}</span>
                      </div>
                      <div className="mono txt-2" style={{ fontSize: 9 }}>{p.desc}</div>
                    </button>
                  ))}
                </div>
                <Button variant="primary" style={{ width: '100%', justifyContent: 'center', padding: '13px' }} disabled={selectedPlatforms.length === 0} onClick={() => setStep(2)}>
                  Continue → <span className="mono" style={{ fontSize: 10, marginLeft: 4 }}>({selectedPlatforms.length} selected)</span>
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <Chip variant="violet" style={{ marginBottom: 16, display: 'inline-flex' } as React.CSSProperties}>STEP 2 OF 3</Chip>
                <h1 className="h-md" style={{ marginBottom: 6 }}>Define Your Niche</h1>
                <p className="txt-2" style={{ fontSize: 13.5, marginBottom: 28 }}>Your expertise domain shapes persona memory and tone.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                  {NICHES.map(n => (
                    <button key={n} onClick={() => setSelectedNiche(n)} style={{ padding: '8px 16px', borderRadius: 'var(--r-pill)', border: `1px solid ${selectedNiche === n ? 'rgba(0,229,255,0.3)' : 'var(--border)'}`, background: selectedNiche === n ? 'rgba(0,229,255,0.08)' : 'transparent', color: selectedNiche === n ? 'var(--cyan)' : 'var(--txt2)', fontSize: 13, cursor: 'pointer', transition: 'all var(--t-mid)' }}>
                      {n}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Button variant="ghost" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: 'center' }}>← Back</Button>
                  <Button variant="primary" disabled={!selectedNiche} onClick={() => setStep(3)} style={{ flex: 2, justifyContent: 'center', padding: '13px' }}>Build Persona →</Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <Chip variant="amber" style={{ marginBottom: 16, display: 'inline-flex' } as React.CSSProperties}>STEP 3 OF 3</Chip>
                <h1 className="h-md" style={{ marginBottom: 6 }}>Build Your Persona</h1>
                <p className="txt-2" style={{ fontSize: 13.5, marginBottom: 28 }}>Name your AI voice and define its operational tone.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
                  <div>
                    <label htmlFor="persona-name" className="mono txt-2" style={{ fontSize: 10, display: 'block', marginBottom: 6 }}>PERSONA NAME</label>
                    <input id="persona-name" className="field" placeholder="e.g. Nexus Architect" value={personaName} onChange={e => setPersonaName(e.target.value)} />
                  </div>
                  <div>
                    <label className="mono txt-2" style={{ fontSize: 10, display: 'block', marginBottom: 8 }}>OPERATIONAL TONE</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {['Authoritative', 'Provocative', 'Technical', 'Conversational', 'Analytical', 'Cryptic'].map(t => (
                        <button key={t} onClick={() => setPersonaTone(t)} style={{ padding: '10px', borderRadius: 'var(--r-md)', border: `1px solid ${personaTone === t ? 'rgba(0,229,255,0.3)' : 'var(--border)'}`, background: personaTone === t ? 'rgba(0,229,255,0.07)' : 'rgba(255,255,255,0.02)', color: personaTone === t ? 'var(--cyan)' : 'var(--txt2)', fontSize: 12.5, cursor: 'pointer', transition: 'all var(--t-mid)' }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Button variant="ghost" onClick={() => setStep(2)} style={{ flex: 1, justifyContent: 'center' }}>← Back</Button>
                  <Button variant="primary" disabled={!personaName || !personaTone} onClick={() => navigate('/calibrate')} style={{ flex: 2, justifyContent: 'center', padding: '13px' }}>
                    <Icon name="rocket_launch" size={15} aria-hidden /> Calibrate Persona →
                  </Button>
                </div>
              </>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
