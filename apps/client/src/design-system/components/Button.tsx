import { cn } from '@/lib/cn'
import { Loader2 } from 'lucide-react'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'action'
  size?: 'sm' | 'md'
  loading?: boolean
  children?: ReactNode
}

/**
 * Button — Design system button primitive.
 * Maps to: btn-p (primary), btn-g (ghost), btn-a (action)
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const base = {
    primary: 'btn-p',
    ghost: 'btn-g',
    action: 'btn-a',
  }[variant]

  const sizeClass = size === 'sm' ? 'btn-sm' : ''

  return (
    <button
      className={cn(base, sizeClass, className)}
      disabled={disabled ?? loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 size={14} className="animate-spin" aria-hidden />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
