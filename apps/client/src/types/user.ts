export type UserRole = 'user' | 'admin'

export interface User {
  handle: string
  email: string
  role: UserRole
  plan?: 'FREE' | 'PRO' | 'ELITE'
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
