import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * usePersonaStore — Active persona selection.
 * Persisted to localStorage — non-sensitive (only a persona ID string).
 */
interface PersonaState {
  activePersonaId: string | null
  setActivePersona: (id: string) => void
  clearActivePersona: () => void
}

export const usePersonaStore = create<PersonaState>()(
  persist(
    (set) => ({
      activePersonaId: null,
      setActivePersona: (id: string) => set({ activePersonaId: id }),
      clearActivePersona: () => set({ activePersonaId: null }),
    }),
    {
      name: 'shadow-active-persona',
      // Only persist the ID — no sensitive data
      partialize: (state) => ({ activePersonaId: state.activePersonaId }),
    }
  )
)
