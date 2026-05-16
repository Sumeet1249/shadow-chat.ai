import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { ParticleCanvas } from '@/design-system/effects/ParticleCanvas'
import { Button } from '@/design-system/primitives'

/**
 * NotFound — 404 page.
 * Glitch effect replaced with Framer Motion useAnimationFrame variant — no setInterval loop.
 */
export default function NotFound() {
  const navigate = useNavigate()
  const [glitch, setGlitch] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval>>(0 as any)

  // Simple toggle for glitch at readable intervals — not an animation loop
  useEffect(() => {
    intervalRef.current = setInterval(() => setGlitch(g => !g), 300)
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="scan enter">
      <ParticleCanvas density={0.25} />
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            fontFamily: 'var(--ff-disp)',
            fontWeight: 800,
            fontSize: 'clamp(100px, 18vw, 200px)',
            lineHeight: 0.85,
            background: 'linear-gradient(135deg,#00e5ff,#7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: glitch ? 'blur(1px)' : 'none',
            transition: 'filter 0.05s',
          }}
          aria-label="404 Not Found"
        >
          404
        </div>
        <div className="mono txt-2" style={{ fontSize: 13, marginBottom: 8, letterSpacing: '0.1em' }}>// NODE_NOT_FOUND</div>
        <p style={{ color: 'var(--txt2)', fontSize: 15, maxWidth: 400, margin: '0 auto 32px', lineHeight: 1.7 }}>
          The neural pathway you requested has been severed or never existed in this dimension.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Button variant="primary" onClick={() => navigate('/')}>Return to Base</Button>
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>Dashboard</Button>
        </div>
      </div>
    </div>
  )
}
