export type UserRole = 'user' | 'admin'

export interface User {
  handle: string
  email: string
  role: UserRole
  /** Plan ID — matches Plan.id in src/data/plans.ts: 'free' | 'pro' | 'shadow' */
  plan?: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  handle: string
  email: string
  password: string
  apiKey?: string
}
