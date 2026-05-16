import { useState, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ParticleCanvas } from '@/design-system/effects/ParticleCanvas'
import { AmbientOrbs, LOGIN_ORBS } from '@/design-system/effects/AmbientOrbs'
import { Button, Field, Icon, GlassCard } from '@/design-system/primitives'
import { useAuthStore } from '@/store/useAuthStore'
import { Brain } from 'lucide-react'

/**
 * Login — SEC-6: Rate limit UI after 3 failed attempts.
 * Error messages are generic — never confirm email/password specifically.
 */
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

    setLoading(true)
    setError('')

    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch {
      const newCount = failCount + 1
      setFailCount(newCount)

      // SEC-6: Generic error — never tells user which field is wrong
      setError('Invalid credentials')

      // Lock out after 3 attempts
      if (newCount >= 3) {
        startLockout(60)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-grid scan" style={{ position: 'relative' }}>
      <ParticleCanvas density={0.3} />

      {/* Left — Neural visualization panel */}
      <div className="login-left" aria-hidden>
        <AmbientOrbs orbs={LOGIN_ORBS} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: 40 }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ width: 72, height: 72, borderRadius: 18, background: 'linear-gradient(135deg,#00e5ff,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 0 44px rgba(0,229,255,0.3)' }}>
              <Brain size={32} color="#fff" aria-hidden />
            </div>
            <div style={{ fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 28, marginBottom: 8 }}>SHADOW NODE</div>
            <div className="mono txt-2" style={{ fontSize: 11, letterSpacing: '0.12em' }}>NEURAL COMMAND SYSTEM</div>
          </div>

          {/* Neural ASCII art panel */}
          <GlassCard style={{ padding: '24px 28px', textAlign: 'left', maxWidth: 380 } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 9, marginBottom: 12, letterSpacing: '0.1em' }}>LIVE FEED</div>
            {[
              { txt: 'NODE-ALPHA: 1,284 requests processed', color: 'var(--green)' },
              { txt: 'Reply generated for @elonmusk thread', color: 'var(--cyan)' },
              { txt: 'Persona "Nexus Architect" active', color: '#a78bfa' },
              { txt: '+847 engagements on viral take', color: 'var(--amber)' },
              { txt: 'Memory injection: ai_infrastructure context', color: 'var(--cyan)' },
            ].map((l, i) => (
              <div key={i} className="mono" style={{ fontSize: 10, color: l.color, marginBottom: 6, opacity: 1 - i * 0.1, display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--txt3)' }}>{'>'}</span>
                {l.txt}
              </div>
            ))}
            <div className="mono" style={{ fontSize: 10, color: 'var(--txt3)', marginTop: 6 }}>
              <span className="blink">▌</span>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Right — Auth form */}
      <div className="login-right">
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ marginBottom: 36 }}>
            <h1 className="h-md" style={{ marginBottom: 6 }}>Operator Login</h1>
            <p className="txt-2" style={{ fontSize: 14 }}>
              Access your neural command center.
            </p>
          </div>

          {/* OAuth buttons */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <button
              className="btn-g"
              style={{ flex: 1, justifyContent: 'center', padding: '12px', display: 'flex', alignItems: 'center', gap: 8 }}
              aria-label="Continue with Google"
              type="button"
            >
              <Icon name="globe" size={16} aria-hidden />
              Google
            </button>
            <button
              className="btn-g"
              style={{ flex: 1, justifyContent: 'center', padding: '12px', display: 'flex', alignItems: 'center', gap: 8 }}
              aria-label="Continue with GitHub"
              type="button"
            >
              <Icon name="code" size={16} aria-hidden />
              GitHub
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span className="mono txt-2" style={{ fontSize: 10 }}>OR CONTINUE WITH KEY</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field
              id="login-email"
              type="email"
              label="OPERATOR EMAIL"
              placeholder="caleb@shadownode.ai"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <div style={{ position: 'relative' }}>
              <Field
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                label="ACCESS KEY"
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{ position: 'absolute', right: 12, top: 34, background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}
              >
                <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={15} color="var(--txt3)" aria-hidden />
              </button>
            </div>

            {/* Error — SEC-6: Generic message */}
            {error && (
              <div role="alert" style={{ padding: '10px 14px', background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 'var(--r-md)', display: 'flex', gap: 8, alignItems: 'center' }}>
                <Icon name="error" size={14} color="var(--red)" aria-hidden />
                <span style={{ fontSize: 12.5, color: 'var(--red)' }}>{error}</span>
              </div>
            )}

            {/* Lockout UI — SEC-6 */}
            {lockoutSecs > 0 && (
              <div role="status" aria-live="polite" style={{ padding: '10px 14px', background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 'var(--r-md)', display: 'flex', gap: 8, alignItems: 'center' }}>
                <Icon name="timer" size={14} color="var(--amber)" aria-hidden />
                <span className="mono" style={{ fontSize: 12, color: 'var(--amber)' }}>
                  Try again in {lockoutSecs}s
                </span>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={lockoutSecs > 0}
              style={{ width: '100%', justifyContent: 'center', padding: '13px', marginTop: 4 }}
            >
              {lockoutSecs > 0 ? `Locked out (${lockoutSecs}s)` : 'Access System →'}
            </Button>
          </form>

          <p className="txt-2" style={{ textAlign: 'center', fontSize: 13, marginTop: 24 }}>
            No credentials?{' '}
            <Link to="/register" style={{ color: 'var(--cyan)', textDecoration: 'underline' }}>
              Request operator access
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
