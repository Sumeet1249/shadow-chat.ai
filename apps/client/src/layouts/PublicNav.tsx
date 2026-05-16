import { Link } from 'react-router-dom'
import { Brain } from 'lucide-react'

export function PublicNav() {
  return (
    <nav className="lnav" aria-label="Public navigation">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#00e5ff,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 18px rgba(0,229,255,0.35)' }}>
          <Brain size={16} color="#fff" aria-hidden />
        </div>
        <span style={{ fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 16 }}>SHADOW NODE</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <Link to="/pricing" className="lnav-link mono txt-2" style={{ fontSize: 11, letterSpacing: '0.08em' }}>PRICING</Link>
        <Link to="/features" className="lnav-link mono txt-2" style={{ fontSize: 11, letterSpacing: '0.08em' }}>FEATURES</Link>
        <Link to="/changelog" className="lnav-link mono txt-2" style={{ fontSize: 11, letterSpacing: '0.08em' }}>CHANGELOG</Link>
        <Link to="/login" className="btn-g btn-sm">Login</Link>
        <Link to="/register" className="btn-p btn-sm">Get Access →</Link>
      </div>
    </nav>
  )
}
