export type Platform = 'twitter' | 'linkedin' | 'reddit' | 'discord' | 'instagram' | 'youtube' | 'email' | 'mastodon'

export interface PlatformConfig {
  id: Platform
  label: string
  color: string
  desc: string
}
