import { create } from 'zustand'
import api from '@/lib/api'
import type { User, LoginPayload } from '@/types'

/**
 * useAuthStore — SEC-1: HttpOnly Cookie Auth
 *
 * NO token field — ever.
 * The session token lives in an HttpOnly cookie managed by the server.
 * This store holds only non-sensitive UI state (isAuthenticated, user metadata).
 */
interface AuthState {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean

  login: (credentials: LoginPayload) => Promise<void>
  logout: () => void
  checkSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  /**
   * login — Posts credentials to /api/auth/login.
   * Server responds with Set-Cookie: session=...; HttpOnly; Secure
   * JS never sees the token — withCredentials=true on the Axios instance
   * ensures the browser attaches the cookie on future requests automatically.
   */
  login: async (credentials: LoginPayload) => {
    // In production this hits the real API. During development it simulates success.
    try {
      await api.post('/api/auth/login', credentials)
      // After login, fetch the user profile (cookie is now set)
      const res = await api.get<User>('/api/auth/me')
      set({ isAuthenticated: true, user: res.data })
    } catch {
      // Development fallback — simulates a logged-in admin user
      if (import.meta.env.DEV) {
        set({
          isAuthenticated: true,
          user: { handle: 'Caleb_Shadow', email: 'caleb@shadownode.ai', role: 'admin' },
        })
        return
      }
      throw new Error('Invalid credentials')
    }
  },

  /**
   * logout — Calls server to clear the HttpOnly cookie.
   * Server responds with Set-Cookie: session=; Max-Age=0
   * Cookie is deleted by the browser — JS cannot delete HttpOnly cookies directly.
   */
  logout: () => {
    api.post('/api/auth/logout').catch(() => {
      // Best-effort logout — clear local state regardless
    })
    set({ isAuthenticated: false, user: null })
  },

  /**
   * checkSession — Called once on app boot.
   * Hits GET /api/auth/me to validate the existing HttpOnly cookie.
   * If 401: cookie is invalid/expired, user stays unauthenticated.
   */
  checkSession: async () => {
    try {
      const res = await api.get<User>('/api/auth/me')
      set({ isAuthenticated: true, user: res.data, isLoading: false })
    } catch {
      // Dev mode: auto-login as admin for development
      if (import.meta.env.DEV) {
        set({
          isAuthenticated: true,
          user: { handle: 'Caleb_Shadow', email: 'caleb@shadownode.ai', role: 'admin' },
          isLoading: false,
        })
        return
      }
      set({ isAuthenticated: false, user: null, isLoading: false })
    }
  },
}))
