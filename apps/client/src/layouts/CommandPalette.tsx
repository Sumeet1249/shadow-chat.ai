import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUIStore } from '@/store/useUIStore'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { Icon } from '@/design-system/primitives'

import { NAV } from '@/data/nav'

const COMMANDS = NAV.flatMap(group =>
  group.items.map(item => ({
    label: item.label,
    icon: item.icon,
    path: item.to,
    cat: group.section === 'SYSTEM' ? (item.label === 'Account' ? 'Account' : 'Settings') : 'Navigate'
  }))
)

/**
 * CommandPalette — Global ⌘K command palette.
 * Uses custom useFocusTrap (SEC-3) — zero third-party dependency.
 * role="dialog", aria-modal="true", arrow key + Enter navigation.
 */
export function CommandPalette() {
  const { isCmdPaletteOpen, closeCmdPalette } = useUIStore()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useFocusTrap(isCmdPaletteOpen)

  const filtered = COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.cat.toLowerCase().includes(query.toLowerCase())
  )

  // Reset on open
  useEffect(() => {
    if (isCmdPaletteOpen) {
      setQuery('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isCmdPaletteOpen])

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        useUIStore.getState().toggleCmdPalette()
      }
    }
    document.addEventListener('keydown', handle)
    return () => document.removeEventListener('keydown', handle)
  }, [])

  // Arrow key navigation + Enter select + Escape close
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { closeCmdPalette(); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && filtered[activeIndex]) {
      navigate(filtered[activeIndex].path)
      closeCmdPalette()
    }
  }

  if (!isCmdPaletteOpen) return null

  return (
    <div
      className="overlay"
      role="presentation"
      onClick={closeCmdPalette}
    >
      <div
        ref={containerRef}
        className="cmd"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="search" size={16} color="var(--txt3)" aria-hidden />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIndex(0) }}
            placeholder="Search commands..."
            aria-label="Search commands"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--txt)',
              fontSize: 14,
              fontFamily: 'var(--ff-body)',
            }}
          />
          <button
            onClick={closeCmdPalette}
            aria-label="Close command palette"
            className="btn-g btn-sm"
            style={{ padding: '4px 8px' }}
          >
            <span className="mono" style={{ fontSize: 10 }}>ESC</span>
          </button>
        </div>

        {/* Results */}
        <div
          role="listbox"
          aria-label="Command results"
          style={{ maxHeight: 360, overflowY: 'auto', padding: '8px 0' }}
        >
          {filtered.length === 0 ? (
            <div className="mono txt-2" style={{ padding: '24px', textAlign: 'center', fontSize: 11 }}>
              No commands found
            </div>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.path}
                role="option"
                aria-selected={i === activeIndex}
                onClick={() => { navigate(cmd.path); closeCmdPalette() }}
                onMouseEnter={() => setActiveIndex(i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 20px',
                  background: i === activeIndex ? 'rgba(0,229,255,0.07)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.1s ease',
                  textAlign: 'left',
                }}
              >
                <div style={{
                  width: 30,
                  height: 30,
                  borderRadius: 7,
                  background: i === activeIndex ? 'rgba(0,229,255,0.1)' : 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon name={cmd.icon} size={14} color={i === activeIndex ? 'var(--cyan)' : 'var(--txt3)'} aria-hidden />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, color: i === activeIndex ? 'var(--txt)' : 'var(--txt2)' }}>{cmd.label}</div>
                  <div className="mono txt-2" style={{ fontSize: 9 }}>{cmd.cat}</div>
                </div>
                {i === activeIndex && (
                  <span className="mono txt-2" style={{ fontSize: 9 }}>↵</span>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
