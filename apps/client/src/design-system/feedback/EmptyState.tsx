import { Icon } from '../primitives/Icon'
import { Button } from '../primitives/Button'
interface EmptyStateProps {
  icon?: string
  heading: string
  subtext?: string
  action?: {
    label: string
    onClick: () => void
  }
}

/**
 * EmptyState — Standard empty state: icon, heading, subtext, optional CTA.
 * Uses CSS variable inline styles — no Tailwind utility classes.
 * ErrorBoundary has been extracted to its own file: ErrorBoundary.tsx
 */
export function EmptyState({ icon = 'search', heading, subtext, action }: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '64px 24px',
      gap: 16,
      textAlign: 'center',
    }}>
      <div
        className="icon-box"
        style={{
          width: 56,
          height: 56,
          background: 'rgba(0,229,255,0.06)',
          border: '1px solid var(--border)',
          borderRadius: 14,
        }}
      >
        <Icon name={icon} size={24} color="var(--txt3)" />
      </div>
      <div>
        <div className="h-sm" style={{ fontSize: 17, marginBottom: 6 }}>{heading}</div>
        {subtext && (
          <p className="txt-2" style={{ fontSize: 13.5, maxWidth: 360, margin: '0 auto', lineHeight: 1.6 }}>
            {subtext}
          </p>
        )}
      </div>
      {action && (
        <Button variant="ghost" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}

// Re-export ErrorBoundary for any existing imports from this file
export { ErrorBoundary } from './ErrorBoundary'
