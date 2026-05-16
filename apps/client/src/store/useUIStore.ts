import { create } from 'zustand'

/**
 * useUIStore — In-memory UI flags.
 * CommandPalette open state and other UI toggles.
 */
interface UIState {
  isCmdPaletteOpen: boolean
  openCmdPalette: () => void
  closeCmdPalette: () => void
  toggleCmdPalette: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isCmdPaletteOpen: false,
  openCmdPalette: () => set({ isCmdPaletteOpen: true }),
  closeCmdPalette: () => set({ isCmdPaletteOpen: false }),
  toggleCmdPalette: () => set(s => ({ isCmdPaletteOpen: !s.isCmdPaletteOpen })),
}))
