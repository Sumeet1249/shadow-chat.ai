import { memo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUIStore } from '@/store/useUIStore'
import { useAuthStore } from '@/store/useAuthStore'
import { Icon } from '@/design-system/primitives'

// Route title map
const TITLES: Record<string, string> = {
  '/dashboard':   'Command Center',
  '/generate':    'Neural Reply',
  '/workflow':    'Workflow Terminal',
  '/arena':       'The Arena',
  '/memory':      'Memory Matrix',
  '/personas':    'Personas',
  '/marketplace': 'Neural Marketplace',
  '/analytics':   'Neural Analytics',
  '/feed':        'Signal Feed',
  '/archive':     'Shadow Archive',
  '/nodes':       'Node Command Center',
  '/telemetry':   'Global Telemetry',
  '/system':      'System Telemetry',
  '/syndicate':   'Syndicate Operations',
  '/vault':       'Key Vault',
  '/engine':      'Engine Settings',
  '/sandbox':     'API Sandbox',
  '/account':     'Account',
  '/audio':       'Live Audio Sync',
}

/**
 * Topbar — Fixed top bar with page title and quick actions.
 * Cmd+K opens CommandPalette.
 */
export const Topbar = memo(function Topbar() {
  const { openCmdPalette } = useUIStore()
  const { user } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  const title = TITLES[location.pathname] ?? 'Shadow Node'

  return (
    <header className="topbar" role="banner">
      {/* Page title — display typeface matching prototype */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <h1 style={{
          fontFamily: 'var(--ff-disp)',
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: '-0.018em',
          color: 'var(--txt)',
          margin: 0,
          lineHeight: 1,
        }}>
          {title}
        </h1>
      </div>

      {/* Actions — ⌘K → Bell → Generate */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

        {/* Command Palette trigger */}
        <button
          onClick={openCmdPalette}
          aria-label="Open command palette (⌘K)"
          className="btn-g btn-sm"
          style={{ padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <Icon name="search" size={13} aria-hidden />
          <span className="mono" style={{ fontSize: 10 }}>⌘K</span>
        </button>

        {/* Notification bell with amber dot */}
        <button
          aria-label="Notifications"
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            flexShrink: 0,
            transition: 'border-color var(--t-mid)',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border2)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          <Icon name="notifications" size={15} aria-hidden />
          {/* Amber indicator dot */}
          <div style={{
            position: 'absolute',
            top: 6,
            right: 6,
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: 'var(--amber)',
            boxShadow: '0 0 5px rgba(245,158,11,0.6)',
          }} aria-hidden />
        </button>

        {/* User handle (condensed — full identity is in Sidebar) */}
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#7c3aed,#00e5ff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 800,
              color: '#fff',
              flexShrink: 0,
            }} aria-hidden>
              {user.handle.charAt(0).toUpperCase()}
            </div>
            <span className="mono txt-2" style={{ fontSize: 10 }}>{user.handle}</span>
          </div>
        )}

        {/* Generate quick-action primary button */}
        <button
          onClick={() => navigate('/generate')}
          className="btn-p btn-sm"
          style={{ padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}
          aria-label="New generation"
        >
          <Icon name="auto_awesome" size={13} aria-hidden />
          <span style={{ fontSize: 12, fontWeight: 600 }}>Generate</span>
        </button>
      </div>
    </header>
  )
})
