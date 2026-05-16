import axios from 'axios'

/**
 * Secure Axios instance — SEC-8
 * - withCredentials: sends HttpOnly cookie on every request
 * - 10s timeout
 * - Never logs sensitive response data
 * - On 401: clears auth state, redirects to /login
 * - Strips auth headers on cross-origin redirects
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000',
  withCredentials: true,   // Sends HttpOnly session cookie on every request
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor: strip auth headers on cross-origin requests
api.interceptors.request.use(config => {
  try {
    const requestUrl = new URL(config.url ?? '', import.meta.env.VITE_API_URL ?? 'http://localhost:8000')
    const apiOrigin = new URL(import.meta.env.VITE_API_URL ?? 'http://localhost:8000').origin
    if (requestUrl.origin !== apiOrigin) {
      // Cross-origin redirect — strip any auth headers that may have been set
      if (config.headers) {
        delete config.headers['Authorization']
      }
    }
  } catch {
    // URL parsing failed — let request proceed, server will validate
  }
  return config
})

// Response interceptor: on 401 clear auth state and redirect
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      // Dynamic import to avoid circular dependency with useAuthStore
      import('@/store/useAuthStore').then(({ useAuthStore }) => {
        useAuthStore.getState().logout()
      }).catch(() => {
        // Fallback: hard redirect
        window.location.replace('/login')
      })
    }
    // NEVER log err.response.data — may contain sensitive information
    return Promise.reject(new Error('Request failed'))
  }
)

export default api
