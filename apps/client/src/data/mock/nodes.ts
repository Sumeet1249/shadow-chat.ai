import type { ShadowNode } from '@/types'

export const MOCK_NODES: ShadowNode[] = [
  { id: 'alpha',   name: 'NODE-ALPHA',   status: 'active', platform: 'twitter',   persona: 'Nexus Architect',   health: 99, requests: 1284, uptime: '14d 7h',  cpu: 34, memory: 62 },
  { id: 'beta',    name: 'NODE-BETA',    status: 'active', platform: 'linkedin',  persona: 'Corporate Phantom', health: 97, requests: 445,  uptime: '12d 3h',  cpu: 28, memory: 55 },
  { id: 'gamma',   name: 'NODE-GAMMA',   status: 'idle',   platform: 'reddit',    persona: 'Ghost Analyst',     health: 100, requests: 0,  uptime: '8d 1h',   cpu: 2,  memory: 18 },
  { id: 'delta',   name: 'NODE-DELTA',   status: 'active', platform: 'discord',   persona: 'Signal_Zero',       health: 94, requests: 893,  uptime: '10d 5h',  cpu: 45, memory: 71 },
  { id: 'epsilon', name: 'NODE-EPSILON', status: 'error',  platform: 'instagram', persona: 'Unassigned',        health: 0,  requests: 0,    uptime: '0d 0h',   cpu: 0,  memory: 0  },
  { id: 'zeta',    name: 'NODE-ZETA',    status: 'active', platform: 'email',     persona: 'Corporate Phantom', health: 96, requests: 234,  uptime: '6d 2h',   cpu: 22, memory: 41 },
]
