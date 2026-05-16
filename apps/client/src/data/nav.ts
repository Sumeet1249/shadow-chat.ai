/**
 * nav.ts — Single source of truth for all sidebar navigation items.
 * Both Sidebar.tsx and CommandPalette.tsx source from here to prevent divergence.
 */

export interface NavItem {
  to: string
  icon: string
  label: string
}

export interface NavSection {
  section: string
  items: NavItem[]
}

export const NAV: NavSection[] = [
  {
    section: 'CORE',
    items: [
      { to: '/dashboard',   icon: 'dashboard',    label: 'Command Center' },
      { to: '/generate',    icon: 'auto_awesome', label: 'Neural Reply' },
      { to: '/workflow',    icon: 'terminal',     label: 'Workflow Terminal' },
      { to: '/arena',       icon: 'emoji_events', label: 'The Arena' },
    ],
  },
  {
    section: 'INTELLIGENCE',
    items: [
      { to: '/personas',    icon: 'psychology',   label: 'Personas' },
      { to: '/marketplace', icon: 'hub',          label: 'Marketplace' },
      { to: '/memory',      icon: 'memory',       label: 'Memory Matrix' },
    ],
  },
  {
    section: 'DATA',
    items: [
      { to: '/analytics',   icon: 'analytics',    label: 'Neural Analytics' },
      { to: '/feed',        icon: 'radio',         label: 'Signal Feed' },
      { to: '/archive',     icon: 'archive',       label: 'Shadow Archive' },
    ],
  },
  {
    section: 'OPERATIONS',
    items: [
      { to: '/nodes',       icon: 'dns',           label: 'Node Command' },
      { to: '/telemetry',   icon: 'globe',         label: 'Global Telemetry' },
      { to: '/syndicate',   icon: 'group',         label: 'Syndicate' },
      { to: '/audio',       icon: 'mic',           label: 'Live Audio' },
    ],
  },
  {
    section: 'SYSTEM',
    items: [
      { to: '/vault',       icon: 'key',           label: 'Key Vault' },
      { to: '/engine',      icon: 'settings',      label: 'Engine Settings' },
      { to: '/account',     icon: 'person',        label: 'Account' },
    ],
  },
]
