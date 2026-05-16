import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ParticleCanvas } from '@/design-system/effects/ParticleCanvas'
import { AmbientOrbs, SHELL_ORBS } from '@/design-system/effects/AmbientOrbs'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { StatusBar } from './StatusBar'
import { CommandPalette } from './CommandPalette'
import { ErrorBoundary } from '@/design-system/feedback/EmptyState'

/**
 * AppShell — Persistent authenticated layout.
 * Sidebar + Topbar + StatusBar + CommandPalette wrap all app pages.
 * AnimatePresence keyed to pathname provides smooth page transitions.
 */
export function AppShell() {
  const location = useLocation()

  return (
    <div className="bg-void min-h-screen scan">
      {/* Skip to content — a11y */}
      <a
        href="#main-content"
        className="sr-only"
        style={{
          position: 'fixed',
          top: 8,
          left: 8,
          zIndex: 9999,
          padding: '8px 16px',
          background: 'var(--void)',
          border: '1px solid var(--cyan)',
          borderRadius: 'var(--r-md)',
          color: 'var(--cyan)',
          fontSize: 13,
          fontFamily: 'var(--ff-mono)',
        }}
        onFocus={e => e.currentTarget.style.removeProperty('clip')}
      >
        Skip to content
      </a>

      {/* Background effects */}
      <ParticleCanvas density={0.35} />
      <AmbientOrbs orbs={SHELL_ORBS} />

      {/* Layout */}
      <Sidebar />
      <Topbar />

      <main
        id="main-content"
        className="main relative"
        style={{ zIndex: 10 }}
        tabIndex={-1}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] },
            }}
            exit={{
              opacity: 0,
              y: -4,
              transition: { duration: 0.2 },
            }}
          >
            <ErrorBoundary level="page">
              <Outlet />
            </ErrorBoundary>
          </motion.div>
        </AnimatePresence>
      </main>

      <StatusBar />
      <CommandPalette />
    </div>
  )
}
