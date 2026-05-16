import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import type { ReactNode } from 'react'

/**
 * ProtectedRoute — Redirects unauthenticated users to /login.
 * Saves intended destination in location state for post-login redirect.
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore()
  const location = useLocation()

  if (isLoading) {
    // Session check in progress — render nothing (AppShell shows skeleton)
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

/**
 * AdminRoute — SEC-5: Restricts routes to admin role only.
 * Redirects non-admin authenticated users to /dashboard.
 */
export function AdminRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, user, isLoading } = useAuthStore()
  const location = useLocation()

  if (isLoading) return null

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

/**
 * PublicRoute — Redirects already-authenticated users away from login/register.
 */
export function PublicRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) return null

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
