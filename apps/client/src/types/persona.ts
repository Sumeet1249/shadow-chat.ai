import type { Platform } from './platform'

export interface Persona {
  id: string
  name: string
  tone: string
  style: string
  niche: string
  uses: number
  wins: number
  replies: number
  avgEng: string
  platforms: Platform[]
  gradient: string
  active: boolean
  created: string
  traits: string
}

export interface PersonaTemplate {
  id: string
  name: string
  tone: string
  niche: string
  rating: number
  installs: number
  author: string
  gradient: string
  desc: string
  category: string
}
