import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'

interface SpinnerProps {
  size?: 'sm' | 'md'
  className?: string
}

/**
 * Spinner — Loading indicator. Maps to .spinner CSS class.
 */
export function Spinner({ size = 'md', className }: SpinnerProps) {
  const px = size === 'sm' ? 14 : 18
  return (
    <Loader2
      size={px}
      className={cn('animate-spin', className)}
      aria-label="Loading"
      role="status"
    />
  )
}
