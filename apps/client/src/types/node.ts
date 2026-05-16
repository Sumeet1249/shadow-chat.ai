import type { Platform } from './platform'

export type NodeStatus = 'active' | 'idle' | 'error'

export interface ShadowNode {
  id: string
  name: string
  status: NodeStatus
  platform: Platform
  persona: string
  health: number
  requests: number
  uptime: string
  cpu: number
  memory: number
}
