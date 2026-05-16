import { memo } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Icon } from '@/design-system/primitives'
import { useAuthStore } from '@/store/useAuthStore'
import { Brain } from 'lucide-react'

import { NAV } from '@/data/nav'
import { PLANS } from '@/data/plans'

export const Sidebar = memo(function Sidebar() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const currentPlan = PLANS.find(p => p.id === user?.plan) ?? PLANS[0]

  return (
    <aside className="sidebar">
      {/* Logo Area (Matched Image 5) */}
      <div style={{ padding: '24px 22px', borderBottom: '1px solid var(--border)' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            textAlign: 'left'
          }}
          aria-label="Shadow Node — Dashboard Home"
        >
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #00e5ff, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0,229,255,0.25)',
            flexShrink: 0,
          }}>
            <Brain size={20} color="#fff" />
          </div>
          <div>
            <div style={{ 
              fontFamily: 'var(--ff-disp)', 
              fontWeight: 900, 
              fontSize: 16, 
              lineHeight: 1.1, 
              color: '#fff',
              letterSpacing: '0.05em'
            }}>
              SHADOW<br />NODE
            </div>
            <div className="mono" style={{ fontSize: 8, marginTop: 2, color: 'var(--cyan)', opacity: 0.8, letterSpacing: '0.1em' }}>
              v2.4.1 — NEURAL
            </div>
          </div>
        </button>
      </div>

      {/* User Widget (Matched Image 5) */}
      <div 
        onClick={() => navigate('/account')}
        style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 800,
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              {user?.handle?.charAt(0).toUpperCase() ?? 'C'}
            </div>
            <span className="dot" style={{ position: 'absolute', bottom: -1, right: -1, border: '2px solid var(--void)', background: 'var(--green)' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.handle ?? 'Caleb_Shadow'}
            </div>
            <div className="mono" style={{ fontSize: 9, color: 'var(--amber)', letterSpacing: '0.05em', fontWeight: 700, marginTop: 1 }}>
              ELITE TIER
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav aria-label="Primary navigation" style={{ flex: 1, overflowY: 'auto', padding: '10px 0' }}>
        {NAV.map(group => (
          <div key={group.section} style={{ marginBottom: 12 }}>
            <div className="ssec" style={{ marginBottom: 4 }}>{group.section}</div>
            {group.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `slink${isActive ? ' active' : ''}`}
                style={{ padding: '10px 14px' }}
              >
                <Icon name={item.icon} size={15} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer / Sign Out */}
      <div style={{ padding: '12px 0', borderTop: '1px solid var(--border)' }}>
        <button
          onClick={logout}
          className="slink"
          style={{ width: 'calc(100% - 24px)', margin: '0 12px', background: 'none', border: 'none', opacity: 0.7 }}
        >
          <Icon name="logout" size={14} />
          <span className="mono" style={{ fontSize: 10 }}>Sign Out</span>
        </button>
      </div>
    </aside>
  )
})
