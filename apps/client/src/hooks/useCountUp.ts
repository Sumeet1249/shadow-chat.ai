import { useState, useEffect, useRef } from 'react'
import { easeOutCubic } from '@/lib/utils'

/**
 * useCountUp — Animates a number from 0 to target over duration ms.
 * Extracted from Dashboard component.
 */
export function useCountUp(target: number, duration = 1200): number {
  const [current, setCurrent] = useState(0)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    startRef.current = null

    const animate = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      setCurrent(Math.floor(easeOutCubic(progress) * target))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return current
}
