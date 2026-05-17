import { cn } from '@/lib/cn'
import type { CSSProperties, ReactNode } from 'react'

type ChipVariant = 'cyan' | 'violet' | 'amber' | 'green' | 'red' | 'default'

interface ChipProps {
  variant?: ChipVariant
  size?: 'sm' | 'md'
  children: ReactNode
  className?: string
  style?: CSSProperties
}

const variantMap: Record<ChipVariant, string> = {
  cyan:    'chip-c',
  violet:  'chip-v',
  amber:   'chip-a',
  green:   'chip-g',
  red:     'chip-r',
  default: 'chip',
}

/**
 * Chip — Status/label badge primitive.
 * Maps to: chip-c, chip-v, chip-a, chip-g, chip-r
 */
export function Chip({ variant = 'default', size, children, className, style }: ChipProps) {
  return (
    <span
      className={cn(
        'chip',
        variantMap[variant],
        size === 'sm' && 'chip-sm',
        className
      )}
      style={style}
    >
      {children}
    </span>
  )
}
