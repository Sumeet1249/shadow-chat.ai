import { cn } from '@/lib/cn'

type PulseColor = 'green' | 'amber' | 'red' | 'cyan'

interface PulseDotProps {
  color?: PulseColor
  size?: number
  className?: string
}

const colorVars: Record<PulseColor, string> = {
  green: 'var(--green)',
  amber: 'var(--amber)',
  red:   'var(--red)',
  cyan:  'var(--cyan)',
}

/**
 * PulseDot — Animated status indicator dot.
 * Maps to: .dot CSS class with pulse animation.
 */
export function PulseDot({ color = 'green', size = 6, className }: PulseDotProps) {
  return (
    <span
      className={cn('dot', className)}
      aria-hidden
      style={{
        width: size,
        height: size,
        background: colorVars[color],
        boxShadow: `0 0 ${size * 2}px ${colorVars[color]}80`,
      }}
    />
  )
}
