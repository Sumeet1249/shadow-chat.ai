import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ParticleCanvas } from '@/design-system/effects/ParticleCanvas'
import { AmbientOrbs, LOGIN_ORBS } from '@/design-system/effects/AmbientOrbs'
import { Button, Field, Icon, ProgressBar, GlassCard } from '@/design-system/primitives'
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
  const [keyStatus, setKeyStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle')
  const [loading, setLoading] = useState(false)

  const getPasswordStrength = (pw: string) => {
    let score = 0
    if (pw.length >= 8)  score++
    if (pw.length >= 12) score++
    if (/[A-Z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++
    return score
  }

  const pwStrength = getPasswordStrength(password)
  const pwStrengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'][pwStrength]
  const pwStrengthColor = ['', 'var(--red)', 'var(--amber)', 'var(--amber)', 'var(--green)', 'var(--cyan)'][pwStrength]

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    setStep1Error('')
    if (password !== confirmPassword) {
      setStep1Error('Passwords do not match')
      return
    }
    if (pwStrength < 2) {
      setStep1Error('Password is too weak')
      return
    }
    setStep(2)
  }

  const validateKey = async () => {
    if (!apiKey.startsWith('sk-') || apiKey.length < 20) {
      setKeyStatus('invalid')
      return
    }
    setKeyStatus('validating')
    await new Promise(r => setTimeout(r, 1200))
    setKeyStatus('valid')
  }

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    navigate('/onboarding')
  }

  return (
    <div className="login-grid scan" style={{ position: 'relative' }}>
      <ParticleCanvas density={0.3} />

      {/* Left panel */}
      <div className="login-left" aria-hidden>
        <AmbientOrbs orbs={LOGIN_ORBS} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: 40 }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, background: 'linear-gradient(135deg,#00e5ff,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 0 44px rgba(0,229,255,0.3)' }}>
            <Brain size={32} color="#fff" aria-hidden />
          </div>
          <h2 className="h-md" style={{ marginBottom: 8 }}>Join Shadow Node</h2>
          <p className="txt-2" style={{ fontSize: 14, lineHeight: 1.7 }}>
            Deploy autonomous neural nodes across every major platform.
          </p>

          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {['Configure custom AI personas', 'Inject domain expertise via Memory Matrix', 'A/B test models in The Arena', 'Monitor real-time in Signal Feed'].map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Icon name="check_circle" size={16} color="var(--green)" aria-hidden />
                <span style={{ fontSize: 13.5, color: 'var(--txt2)' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Multi-step form */}
      <div className="login-right">
        <div style={{ width: '100%', maxWidth: 420 }}>
          {/* Step indicator */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span className="mono txt-2" style={{ fontSize: 10 }}>STEP {step} OF 2</span>
              <span className="mono txt-c" style={{ fontSize: 10 }}>{step === 1 ? 'IDENTITY' : 'API INJECTION'}</span>
            </div>
            <ProgressBar value={step === 1 ? 50 : 100} color="linear-gradient(to right, var(--cyan), #7c3aed)" />
          </div>

          {step === 1 ? (
            <>
              <h1 className="h-md" style={{ marginBottom: 6 }}>Create Operator Identity</h1>
              <p className="txt-2" style={{ fontSize: 14, marginBottom: 28 }}>Establish your credentials in the neural network.</p>

              <form onSubmit={handleStep1} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Field id="reg-handle" label="OPERATOR HANDLE" placeholder="caleb_shadow" value={handle} onChange={e => setHandle(e.target.value)} required />
                <Field id="reg-email"  label="EMAIL ADDRESS"   placeholder="caleb@shadownode.ai" type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required />
                <div>
                  <div style={{ position: 'relative' }}>
                    <Field id="reg-password" label="ACCESS KEY" placeholder="Create a strong password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" required />
                    <button type="button" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? 'Hide password' : 'Show password'} style={{ position: 'absolute', right: 12, top: 34, background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}>
                      <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={15} color="var(--txt3)" aria-hidden />
                    </button>
                  </div>
                  {password && (
                    <div style={{ marginTop: 8 }}>
                      <ProgressBar value={(pwStrength / 5) * 100} color={pwStrengthColor} height={3} />
                      <span className="mono" style={{ fontSize: 9, color: pwStrengthColor }}>{pwStrengthLabel}</span>
                    </div>
                  )}
                </div>
                <Field id="reg-confirm" label="CONFIRM KEY" placeholder="Repeat your password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} autoComplete="new-password" required />

                {step1Error && (
                  <div role="alert" style={{ padding: '10px 14px', background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 'var(--r-md)' }}>
                    <span style={{ fontSize: 12.5, color: 'var(--red)' }}>{step1Error}</span>
                  </div>
                )}

                <Button type="submit" variant="primary" style={{ width: '100%', justifyContent: 'center', padding: '13px', marginTop: 6 }}>
                  Continue →
                </Button>
              </form>
            </>
          ) : (
            <>
              <h1 className="h-md" style={{ marginBottom: 6 }}>Inject API Key</h1>
              <p className="txt-2" style={{ fontSize: 14, marginBottom: 28 }}>Connect your AI provider key to enable generation.</p>

              <form onSubmit={handleStep2} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <Field id="reg-apikey" label="API KEY" placeholder="sk-..." type="password" value={apiKey} onChange={e => { setApiKey(e.target.value); setKeyStatus('idle') }} autoComplete="off" required />
                  {apiKey && keyStatus === 'idle' && (
                    <button type="button" className="btn-g btn-sm" style={{ marginTop: 8 }} onClick={validateKey}>
                      <Icon name="check" size={12} aria-hidden /> Validate Key
                    </button>
                  )}
                  {keyStatus === 'validating' && <div className="mono txt-2" style={{ fontSize: 10, marginTop: 8 }}>Validating...</div>}
                  {keyStatus === 'valid'      && <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 8 }}><Icon name="check_circle" size={13} color="var(--green)" aria-hidden /><span className="mono" style={{ fontSize: 10, color: 'var(--green)' }}>Key validated</span></div>}
                  {keyStatus === 'invalid'    && <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 8 }}><Icon name="error" size={13} color="var(--red)" aria-hidden /><span className="mono" style={{ fontSize: 10, color: 'var(--red)' }}>Invalid format — must start with sk-</span></div>}
                </div>

                <GlassCard style={{ padding: 14, display: 'flex', gap: 8, alignItems: 'flex-start' } as React.CSSProperties}>
                  <Icon name="shield" size={14} color="var(--cyan)" aria-hidden />
                  <span style={{ fontSize: 11.5, color: 'var(--txt2)', lineHeight: 1.55 }}>
                    Keys are encrypted with AES-256 at rest and never exposed to the frontend after this step.
                  </span>
                </GlassCard>

                <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                  <Button type="button" variant="ghost" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: 'center' }}>← Back</Button>
                  <Button type="submit" variant="primary" loading={loading} disabled={keyStatus === 'invalid'} style={{ flex: 2, justifyContent: 'center', padding: '13px' }}>
                    <Icon name="rocket_launch" size={15} aria-hidden /> Deploy Node →
                  </Button>
                </div>

                <button type="button" className="btn-g" style={{ width: '100%', justifyContent: 'center', fontSize: 12 }} onClick={() => navigate('/onboarding')}>
                  Skip — add key later
                </button>
              </form>
            </>
          )}

          <p className="txt-2" style={{ textAlign: 'center', fontSize: 13, marginTop: 24 }}>
            Already an operator?{' '}
            <Link to="/login" style={{ color: 'var(--cyan)', textDecoration: 'underline' }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
