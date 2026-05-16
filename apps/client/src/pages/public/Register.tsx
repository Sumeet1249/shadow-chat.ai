import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ParticleCanvas } from '@/design-system/effects/ParticleCanvas'
import { AmbientOrbs, LOGIN_ORBS } from '@/design-system/effects/AmbientOrbs'
import { ScanlineOverlay } from '@/design-system/effects/ScanlineOverlay'
import { Button, Field, Icon, Chip } from '@/design-system/primitives'
import { Brain } from 'lucide-react'

type Step = 1 | 2

export default function Register() {
  const [step, setStep] = useState<Step>(1)
  const navigate = useNavigate()

  // Step 1 fields
  const [handle, setHandle] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [step1Error, setStep1Error] = useState('')

  // Step 2 fields
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) { setStep1Error('Passwords do not match'); return }
    if (password.length < 8) { setStep1Error('Password too weak'); return }
    setStep(2)
  }

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    navigate('/onboarding')
  }

  return (
    <div className="login-grid" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 500px', minHeight: '100vh', background: 'var(--void)' }}>
      <ScanlineOverlay />
      <ParticleCanvas density={0.25} />

      {/* Left — Initialization Visualization (Matched Image 4) */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--border)', overflow: 'hidden' }}>
        <AmbientOrbs orbs={LOGIN_ORBS} />
        
        {/* Rectangular Neural Map Graphic */}
        <div style={{ marginBottom: 40, position: 'relative' }}>
          <svg width="240" height="240" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 0 20px rgba(0,229,255,0.3))' }}>
            <rect x="25" y="15" width="50" height="70" rx="6" fill="none" stroke="var(--cyan)" strokeWidth="0.5" opacity="0.3" />
            <circle cx="50" cy="50" r="10" fill="none" stroke="var(--cyan)" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="3" fill="var(--cyan)" />
            <line x1="50" y1="15" x2="50" y2="30" stroke="var(--cyan)" strokeWidth="0.3" strokeDasharray="1,2" />
            <line x1="50" y1="70" x2="50" y2="85" stroke="var(--cyan)" strokeWidth="0.3" strokeDasharray="1,2" />
          </svg>
        </div>

        <div style={{ textAlign: 'center', maxWidth: 480, padding: '0 40px' }}>
          <h1 className="h-xl grad-c" style={{ fontSize: 64, marginBottom: 24 }}>Initialize Your Node</h1>
          <p className="txt-2" style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 48, color: 'var(--txt3)' }}>
            Create your operator identity and inject your API credentials to activate neural operations.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start', width: 'fit-content', margin: '0 auto 60px' }}>
            {[
              'Multi-platform shadow deployment',
              'Encrypted credential vault',
              'Neural persona engine access'
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', border: '1px solid var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(124,58,237,0.1)' }}>
                  <Icon name="check" size={12} color="var(--violet)" />
                </div>
                <span className="mono" style={{ fontSize: 13, color: 'var(--txt2)' }}>{text}</span>
              </div>
            ))}
          </div>

          <Chip variant="violet" size="sm" style={{ background: 'rgba(124,58,237,0.05)', padding: '6px 16px' }}>
            <Icon name="lock" size={12} style={{ marginRight: 8 }} />
            SECURE ENROLLMENT
          </Chip>
        </div>
      </div>

      {/* Right — Step Form (Matched Image 4) */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '60px 80px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 30, left: 30 }}>
          <Link to="/login" className="btn-g btn-sm" style={{ padding: '6px 12px', fontSize: 11 }}>
            <Icon name="arrow_back" size={12} /> Back to Login
          </Link>
        </div>

        <div style={{ margin: 'auto 0', width: '100%', maxWidth: 360 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#00e5ff,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brain size={16} color="#fff" />
            </div>
            <div style={{ fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 16, letterSpacing: '0.05em' }}>SHADOW NODE</div>
          </div>

          {/* Steps Indicator */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 10, borderBottom: `2px solid ${step === 1 ? 'var(--cyan)' : 'var(--border)'}`, color: step === 1 ? 'var(--txt)' : 'var(--txt3)' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: step === 1 ? 'var(--cyan)' : 'var(--border)', color: 'var(--void)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800 }}>1</div>
              <span className="mono" style={{ fontSize: 10, fontWeight: 700 }}>CREDENTIALS</span>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 10, borderBottom: `2px solid ${step === 2 ? 'var(--cyan)' : 'var(--border)'}`, color: step === 2 ? 'var(--txt)' : 'var(--txt3)' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: step === 2 ? 'var(--cyan)' : 'var(--border)', color: 'var(--void)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800 }}>2</div>
              <span className="mono" style={{ fontSize: 10, fontWeight: 700 }}>API KEY</span>
            </div>
          </div>

          <h2 className="h-md" style={{ marginBottom: 8 }}>{step === 1 ? 'Create Identity' : 'Inject Key'}</h2>
          <p className="txt-2" style={{ fontSize: 14, marginBottom: 32 }}>
            {step === 1 ? 'Establish your operator credentials for neural command access.' : 'Connect your primary neural engine to start generating.'}
          </p>

          {step === 1 ? (
            <form onSubmit={handleStep1} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                <button className="btn-g" style={{ flex: 1, padding: '12px' }} type="button">
                  <Icon name="globe" size={16} /> Google
                </button>
                <button className="btn-g" style={{ flex: 1, padding: '12px' }} type="button">
                  <Icon name="code" size={16} /> GitHub
                </button>
              </div>

              <div style={{ position: 'relative', textAlign: 'center', margin: '8px 0' }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--border)' }} />
                <span className="mono txt-2" style={{ fontSize: 8, background: 'var(--void)', padding: '0 10px', position: 'relative', zIndex: 1 }}>OR REGISTER MANUALLY</span>
              </div>

              <Field
                id="reg-handle"
                label="OPERATOR HANDLE"
                placeholder="shadow_operator"
                value={handle}
                onChange={e => setHandle(e.target.value)}
                required
              />
              <Field
                id="reg-email"
                label="NODE IDENTIFIER (EMAIL)"
                placeholder="operator@domain.com"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <Field
                id="reg-password"
                label="ACCESS CIPHER"
                placeholder="Min 8 characters"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <Field
                id="reg-confirm"
                label="CONFIRM CIPHER"
                placeholder="Re-enter cipher"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />

              {step1Error && <div style={{ color: 'var(--red)', fontSize: 12, textAlign: 'center' }}>{step1Error}</div>}

              <Button
                type="submit"
                variant="primary"
                style={{ width: '100%', justifyContent: 'center', padding: '14px', background: 'linear-gradient(135deg, var(--cyan), var(--violet))', marginTop: 10 }}
              >
                Continue to Key Injection
              </Button>
            </form>
          ) : (
            <form onSubmit={handleDeploy} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Field
                id="reg-apikey"
                label="PRIMARY API KEY"
                placeholder="sk-..."
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                required
              />
              <p className="txt-2" style={{ fontSize: 11, lineHeight: 1.6, background: 'rgba(255,255,255,0.02)', padding: 12, borderRadius: 8, border: '1px solid var(--border)' }}>
                Your keys are encrypted locally and never stored on our servers. Access is restricted to this node only.
              </p>
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                style={{ width: '100%', justifyContent: 'center', padding: '14px', background: 'linear-gradient(135deg, var(--cyan), var(--violet))' }}
              >
                Deploy Shadow Node
              </Button>
              <button type="button" onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: 'var(--txt3)', fontSize: 12, textDecoration: 'underline', cursor: 'pointer' }}>Skip for now</button>
            </form>
          )}

          <p className="txt-2" style={{ textAlign: 'center', fontSize: 13, marginTop: 40 }}>
            Already an operator?{' '}
            <Link to="/login" style={{ color: 'var(--cyan)', fontWeight: 700, fontFamily: 'var(--ff-mono)' }}>
              Access Node →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
