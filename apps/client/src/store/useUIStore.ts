import { create } from 'zustand'

export type Theme = 'dark' | 'sage' | 'purple'

interface UIState {
  isCmdPaletteOpen: boolean
  openCmdPalette: () => void
  closeCmdPalette: () => void
  toggleCmdPalette: () => void
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useUIStore = create<UIState>((set) => ({
  isCmdPaletteOpen: false,
  openCmdPalette: () => set({ isCmdPaletteOpen: true }),
  closeCmdPalette: () => set({ isCmdPaletteOpen: false }),
  toggleCmdPalette: () => set(s => ({ isCmdPaletteOpen: !s.isCmdPaletteOpen })),
  theme: (localStorage.getItem('sn-theme') as Theme) || 'dark',
  setTheme: (theme: Theme) => {
    localStorage.setItem('sn-theme', theme)
    set({ theme })
  },
}))
