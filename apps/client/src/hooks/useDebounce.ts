import { useState, useEffect } from 'react'

/**
 * useDebounce — Debounces a value by delay ms.
 * Used in: Marketplace search, ShadowArchive search, MemoryMatrix search.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
