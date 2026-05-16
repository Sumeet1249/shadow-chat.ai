import { memo } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Icon } from '@/design-system/primitives'
import { useAuthStore } from '@/store/useAuthStore'
import { Brain } from 'lucide-react'

import { NAV } from '@/data/nav'

/**
 * Sidebar — Primary navigation.
 * Semantic <nav> wrapping <NavLink> elements.
 * Active state driven by URL match — no manual comparison.
 */
export const Sidebar = memo(function Sidebar() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ padding: '18px 16px 14px', borderBottom: '1px solid var(--border)' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            width: '100%',
          }}
          aria-label="Shadow Node — Return to landing"
        >
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: 'linear-gradient(135deg, #00e5ff, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 18px rgba(0,229,255,0.35)',
            flexShrink: 0,
          }}>
            <Brain size={16} color="#fff" aria-hidden />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--ff-disp)', fontWeight: 800, fontSize: 15, lineHeight: 1, letterSpacing: '0.02em' }}>
              SHADOW NODE
            </div>
            <div className="mono txt-2" style={{ fontSize: 9, marginTop: 2, letterSpacing: '0.1em' }}>
              NEURAL COMMAND
            </div>
          </div>
        </button>
      </div>

      {/* User Identity Widget */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Avatar */}
          <div style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed, #00e5ff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 800,
            color: '#fff',
            flexShrink: 0,
          }}>
            {user?.handle?.charAt(0).toUpperCase() ?? 'S'}
          </div>
          {/* Handle + tier */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 12, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.handle ?? 'Operator'}
            </div>
            <div className="mono txt-a" style={{ fontSize: 9, letterSpacing: '0.08em', marginTop: 2 }}>
              ELITE TIER
            </div>
          </div>
          {/* Live dot */}
          <span className="dot" style={{ background: 'var(--green)', flexShrink: 0 }} aria-hidden />
        </div>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Primary navigation"
        style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}
      >
        {NAV.map(group => (
          <div key={group.section}>
            <div className="ssec">{group.section}</div>
            {group.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `slink${isActive ? ' active' : ''}`}
                aria-current={undefined}
              >
                <Icon name={item.icon} size={15} aria-hidden />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)' }}>
        {/* System status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span className="dot" style={{ background: 'var(--green)' }} aria-hidden />
          <span className="mono txt-2" style={{ fontSize: 9, letterSpacing: '0.1em' }}>ALL SYSTEMS NOMINAL</span>
        </div>
        {/* Sign Out */}
        <button
          onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'none',
            border: 'none',
            padding: '6px 0',
            cursor: 'pointer',
            color: 'var(--txt3)',
            fontSize: 12,
            width: '100%',
            transition: 'color var(--t-mid)',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--red)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--txt3)')}
          aria-label="Sign out"
        >
          <Icon name="logout" size={14} aria-hidden />
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.06em' }}>SIGN OUT</span>
        </button>
      </div>
    </aside>
  )
})
