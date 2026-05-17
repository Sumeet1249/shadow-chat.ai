import { cn } from '@/lib/cn'

interface ProgressBarProps {
  /** 0–100 */
  value: number
  color?: string
  className?: string
  height?: number
}

/**
 * ProgressBar — Maps to .pt + .pf pattern.
 * No payment or billing usage anywhere — purely data visualization.
 */
export function ProgressBar({ value, color, className, height = 4 }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div
      className={cn('pt', className)}
      style={{ height }}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="pf"
        style={{
          width: `${clampedValue}%`,
          background: color ?? 'var(--cyan)',
          height: '100%',
        }}
      />
    </div>
  )
}
