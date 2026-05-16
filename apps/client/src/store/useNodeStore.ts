import { create } from 'zustand'
import type { NodeStatus } from '@/types'

/**
 * useNodeStore — In-memory node status tracking.
 * Not persisted — fresh on every session.
 */
interface NodeState {
  statuses: Record<string, NodeStatus>
  updateStatus: (id: string, status: NodeStatus) => void
  toggleStatus: (id: string) => void
}

export const useNodeStore = create<NodeState>((set, get) => ({
  statuses: {},

  updateStatus: (id: string, status: NodeStatus) =>
    set(state => ({ statuses: { ...state.statuses, [id]: status } })),

  toggleStatus: (id: string) => {
    const current = get().statuses[id] ?? 'idle'
    const next: NodeStatus = current === 'active' ? 'idle' : 'active'
    set(state => ({ statuses: { ...state.statuses, [id]: next } }))
  },
}))
