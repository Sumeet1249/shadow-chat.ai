import { useState, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ParticleCanvas } from '@/design-system/effects/ParticleCanvas'
import { AmbientOrbs, LOGIN_ORBS } from '@/design-system/effects/AmbientOrbs'
import { ScanlineOverlay } from '@/design-system/effects/ScanlineOverlay'
import { Button, Field, Icon, Chip } from '@/design-system/components'
import { useAuthStore } from '@/store/useAuthStore'
import { Brain } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [failCount, setFailCount] = useState(0)
  const [lockoutSecs, setLockoutSecs] = useState(0)

  const { login } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard'

  const startLockout = useCallback((secs: number) => {
    setLockoutSecs(secs)
    const iv = setInterval(() => {
      setLockoutSecs(s => {
        if (s <= 1) { clearInterval(iv); return 0 }
        return s - 1
      })
    }, 1000)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (lockoutSecs > 0 || loading) return
    setLoading(true); setError('')
    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch {
      const newCount = failCount + 1
      setFailCount(newCount)
      setError('Invalid credentials')
      if (newCount >= 3) startLockout(60)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-grid" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 500px', minHeight: '100vh', background: 'var(--void)' }}>
      <ScanlineOverlay />
      <ParticleCanvas density={0.25} />

      {/* Left — Handshake Visualization (Matched Image 3) */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--border)', overflow: 'hidden' }}>
        <AmbientOrbs orbs={LOGIN_ORBS} />
        
        {/* Hexagonal Graphic */}
        <div style={{ marginBottom: 40, position: 'relative' }}>
          <svg width="240" height="240" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 0 20px rgba(0,229,255,0.4))' }}>
            <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" fill="none" stroke="var(--cyan)" strokeWidth="0.5" opacity="0.3" />
            <circle cx="50" cy="50" r="8" fill="none" stroke="var(--cyan)" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="2" fill="var(--cyan)" />
            {/* Connection nodes */}
            <circle cx="50" cy="10" r="1.5" fill="var(--cyan)" />
            <circle cx="85" cy="30" r="1.5" fill="var(--cyan)" />
            <circle cx="85" cy="70" r="1.5" fill="var(--cyan)" />
            <circle cx="50" cy="90" r="1.5" fill="var(--cyan)" />
            <circle cx="15" cy="70" r="1.5" fill="var(--cyan)" />
            <circle cx="15" cy="30" r="1.5" fill="var(--cyan)" />
            {/* Inter-node lines */}
            <line x1="50" y1="10" x2="85" y2="30" stroke="var(--cyan)" strokeWidth="0.2" />
            <line x1="85" y1="30" x2="50" y2="50" stroke="var(--cyan)" strokeWidth="0.2" />
            <line x1="15" y1="30" x2="50" y2="50" stroke="var(--cyan)" strokeWidth="0.2" />
          </svg>
        </div>

        <div style={{ textAlign: 'center', maxWidth: 480, padding: '0 40px' }}>
          <h1 className="h-xl grad-c" style={{ fontSize: 64, marginBottom: 24 }}>The Node Awaits</h1>
          <p className="txt-2" style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 48, color: 'var(--txt3)' }}>
            Your AI shadow is standing by. Authenticate to resume neural operations across all active channels.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start', width: 'fit-content', margin: '0 auto 60px' }}>
            {[
              'Neural Persona Engine — 12 active identities',
              'Zero-latency reply generation',
              'End-to-end encrypted operations'
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', border: '1px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(52,211,153,0.1)' }}>
                  <Icon name="check" size={12} color="var(--green)" />
                </div>
                <span className="mono" style={{ fontSize: 13, color: 'var(--txt2)' }}>{text}</span>
              </div>
            ))}
          </div>

          <Chip variant="green" size="sm" style={{ background: 'rgba(52,211,153,0.05)', padding: '6px 16px' }}>
            <div className="dot" style={{ marginRight: 8 }} />
            ALL SYSTEMS OPERATIONAL
          </Chip>
        </div>
      </div>

      {/* Right — Auth form (Matched Image 3) */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '60px 80px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 30, left: 30 }}>
          <Link to="/" className="btn-g btn-sm" style={{ padding: '6px 12px', fontSize: 11 }}>
            <Icon name="arrow_back" size={12} /> Back
          </Link>
        </div>

        <div style={{ margin: 'auto 0', width: '100%', maxWidth: 360 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#00e5ff,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brain size={16} color="#fff" />
            </div>
            <div style={{ fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 16, letterSpacing: '0.05em' }}>SHADOW NODE</div>
          </div>

          <h2 className="h-md" style={{ marginBottom: 8 }}>Welcome back</h2>
          <p className="txt-2" style={{ fontSize: 14, marginBottom: 40 }}>
            Enter your credentials to access the neural command center.
          </p>

          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <button className="btn-g" style={{ flex: 1, padding: '12px' }} type="button">
              <Icon name="globe" size={16} color="var(--cyan)" /> <span style={{ marginLeft: 8 }}>Google</span>
            </button>
            <button className="btn-g" style={{ flex: 1, padding: '12px' }} type="button">
              <Icon name="code" size={16} color="var(--txt3)" /> <span style={{ marginLeft: 8 }}>GitHub</span>
            </button>
          </div>

          <div style={{ position: 'relative', textAlign: 'center', marginBottom: 32 }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--border)' }} />
            <span className="mono txt-2" style={{ fontSize: 9, background: 'var(--void)', padding: '0 12px', position: 'relative', zIndex: 1 }}>OR CONTINUE WITH</span>
          </div>

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Field
              id="login-email"
              type="email"
              label="NODE IDENTIFIER"
              placeholder="operator@shadownode.ai"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <div style={{ position: 'relative' }}>
              <Field
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                label="ACCESS CIPHER"
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <Link to="/forgot-password" style={{ position: 'absolute', right: 0, top: 0, fontSize: 11, color: 'var(--cyan)', fontFamily: 'var(--ff-mono)' }}>
                Forgot cipher?
              </Link>
            </div>

            {error && (
              <div role="alert" style={{ color: 'var(--red)', fontSize: 12, textAlign: 'center' }}>{error}</div>
            )}

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={lockoutSecs > 0}
              style={{ width: '100%', justifyContent: 'center', padding: '14px', background: 'linear-gradient(135deg, var(--cyan), var(--violet))' }}
            >
              <Icon name="lock" size={14} /> Access Node
            </Button>
          </form>

          <p className="txt-2" style={{ textAlign: 'center', fontSize: 13, marginTop: 40 }}>
            New operator?{' '}
            <Link to="/register" style={{ color: 'var(--cyan)', fontWeight: 700, fontFamily: 'var(--ff-mono)' }}>
              Register node →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
