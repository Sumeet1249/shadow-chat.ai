import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from '@/router'
import { useAuthStore } from '@/store/useAuthStore'
import { useUIStore } from '@/store/useUIStore'
import '@/styles/index.css'

// Initialize session and theme on boot
const state = useUIStore.getState()
useAuthStore.getState().checkSession()

// Theme sync
const syncTheme = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme)
}
syncTheme(state.theme)
useUIStore.subscribe((state) => state.theme, syncTheme)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
