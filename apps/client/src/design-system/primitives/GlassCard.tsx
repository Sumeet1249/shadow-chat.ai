import { cn } from '@/lib/cn'
import type { ReactNode, MouseEventHandler } from 'react'

interface GlassCardProps {
  variant?: 'default' | 'elevated'
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  style?: React.CSSProperties
  id?: string
  role?: string
}

/**
 * GlassCard — Glassmorphism card container.
 * Maps to: glass (default), glass-hi (elevated)
 * Automatically applies hover-glow + cursor-pointer when onClick provided.
 */
export function GlassCard({
  variant = 'default',
  children,
  className,
  onClick,
  style,
  id,
  role,
}: GlassCardProps) {
  return (
    <div
      id={id}
      role={role}
      className={cn(
        variant === 'elevated' ? 'glass-hi' : 'glass',
        onClick && 'hover-glow cursor-pointer',
        className
      )}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  )
}
