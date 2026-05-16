import { memo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUIStore } from '@/store/useUIStore'
import { useAuthStore } from '@/store/useAuthStore'
import { Icon, PulseDot } from '@/design-system/primitives'

const TITLES: Record<string, string> = {
  '/dashboard':   'Dashboard',
  '/generate':    'Neural Reply Generation',
  '/workflow':    'Workflow Terminal',
  '/arena':       'The Arena',
  '/memory':      'Memory Matrix',
  '/personas':    'Personas',
  '/marketplace': 'Marketplace',
  '/analytics':   'Analytics',
  '/feed':        'Signal Feed',
  '/archive':     'Archive',
  '/nodes':       'Nodes',
  '/telemetry':   'Telemetry',
}

function BellButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [hover, setHover] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <button
        aria-label="Notifications"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: isOpen ? 'rgba(0, 229, 255, 0.1)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${isOpen || hover ? 'var(--border2)' : 'var(--border)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all var(--t-mid)',
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Icon name="notifications" size={18} color={isOpen || hover ? 'var(--cyan)' : 'var(--txt2)'} />
        <PulseDot
          color="amber"
          size={5}
          style={{ position: 'absolute', top: 8, right: 8 } as React.CSSProperties}
        />
      </button>

      {isOpen && (
        <>
          <div 
            style={{ position: 'fixed', inset: 0, zIndex: 1000 }} 
            onClick={() => setIsOpen(false)} 
          />
          <div 
            className="enter"
            style={{ 
              position: 'absolute', 
              top: 'calc(100% + 12px)', 
              right: 0, 
              width: 320, 
              background: 'rgba(6, 11, 26, 0.98)', 
              border: '1px solid var(--border2)', 
              borderRadius: 16, 
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              zIndex: 1001,
              padding: '20px',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span className="mono" style={{ fontSize: 10, color: 'var(--txt3)', letterSpacing: '0.1em' }}>NOTIFICATIONS</span>
              <span className="mono" style={{ fontSize: 9, color: 'var(--cyan)', cursor: 'pointer' }}>Mark all read</span>
            </div>
            <div style={{ 
              height: 200, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              textAlign: 'center',
              gap: 12
            }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="notifications_off" size={20} color="var(--txt3)" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--txt2)', marginBottom: 4 }}>All clear</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--txt3)' }}>No new tactical alerts</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export const Topbar = memo(function Topbar() {
  const { openCmdPalette } = useUIStore()
  const { user } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  const title = TITLES[location.pathname] ?? 'Dashboard'

  return (
    <header className="topbar" style={{ height: 64, padding: '0 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <h1 style={{
          fontFamily: 'var(--ff-disp)',
          fontWeight: 700,
          fontSize: 18,
          color: '#fff',
          margin: 0,
        }}>
          {title}
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Search / Command Trigger (Matched Image 5) */}
        <button
          onClick={openCmdPalette}
          className="btn-g"
          style={{ 
            padding: '8px 14px', 
            borderRadius: 10, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12,
            background: 'rgba(255,255,255,0.02)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="search" size={14} color="var(--txt3)" />
            <span style={{ fontSize: 13, color: 'var(--txt2)', fontWeight: 500 }}>Search</span>
          </div>
          <div style={{ 
            padding: '2px 6px', 
            background: 'rgba(0,229,255,0.1)', 
            borderRadius: 6, 
            border: '1px solid rgba(0,229,255,0.2)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Icon name="keyboard_command_key" size={10} color="var(--cyan)" />
            <span className="mono" style={{ fontSize: 10, color: 'var(--cyan)', marginLeft: 2 }}>K</span>
          </div>
        </button>

        <BellButton />

        <button
          onClick={() => navigate('/generate')}
          className="btn-p"
          style={{ 
            padding: '8px 20px', 
            borderRadius: 10, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8,
            fontSize: 13
          }}
        >
          <Icon name="bolt" size={14} />
          Generate
        </button>
      </div>
    </header>
  )
})
