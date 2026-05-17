import { GlassCard } from '../components'

/**
 * SkeletonCard — Animated placeholder matching GlassCard dimensions.
 * Uses custom CSS keyframe shimmer — verified working in Tailwind v4.
 * No animate-pulse dependency.
 */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <GlassCard className={className}>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="skel" style={{ height: 12, borderRadius: 999, width: '33%' }} />
        <div className="skel" style={{ height: 32, borderRadius: 8, width: '50%' }} />
        <div className="skel" style={{ height: 10, borderRadius: 999, width: '66%' }} />
      </div>
    </GlassCard>
  )
}

/**
 * SkeletonList — Repeating skeleton rows.
 */
export function SkeletonList({ count = 4, className }: { count?: number; className?: string }) {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="glass skel"
          style={{
            borderRadius: 'var(--r-lg)',
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            opacity: 1 - i * 0.15,
          }}
        >
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            flexShrink: 0,
            background: 'rgba(255,255,255,0.05)',
          }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="skel" style={{ height: 10, borderRadius: 999, width: `${60 + i * 7}%` }} />
            <div className="skel" style={{ height: 8, borderRadius: 999, width: '33%' }} />
          </div>
        </div>
      ))}
    </div>
  )
}
