interface OrbConfig {
  width: number
  height: number
  top?: string | number
  left?: string | number
  right?: string | number
  bottom?: string | number
  color: string
  floatClass?: 'fl1' | 'fl2' | 'fl3'
}

interface AmbientOrbsProps {
  orbs: OrbConfig[]
}

/**
 * AmbientOrbs — Background ambient glow orbs.
 * Replaces duplicated orb divs across all public pages.
 * All orb pages render <AmbientOrbs orbs={PAGE_ORBS} /> — no copy-pasted divs.
 */
export function AmbientOrbs({ orbs }: AmbientOrbsProps) {
  return (
    <div
      aria-hidden
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    >
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`orb ${orb.floatClass ?? 'fl1'}`}
          style={{
            width: orb.width,
            height: orb.height,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
          }}
        />
      ))}
    </div>
  )
}

// Pre-configured orb sets for common page layouts
export const SHELL_ORBS: OrbConfig[] = [
  { width: 600, height: 600, top: -200, left: -200, color: 'rgba(0,229,255,0.05)', floatClass: 'fl1' },
  { width: 500, height: 500, bottom: -200, right: -200, color: 'rgba(124,58,237,0.07)', floatClass: 'fl2' },
]

export const LANDING_ORBS: OrbConfig[] = [
  { width: 700, height: 700, top: -200, left: -200, color: 'rgba(0,229,255,0.08)', floatClass: 'fl1' },
  { width: 600, height: 600, top: -100, right: -150, color: 'rgba(124,58,237,0.1)', floatClass: 'fl2' },
  { width: 400, height: 400, bottom: -100, left: '40%', color: 'rgba(52,211,153,0.05)', floatClass: 'fl3' },
]

export const LOGIN_ORBS: OrbConfig[] = [
  { width: 400, height: 400, top: -100, left: '10%', color: 'rgba(0,229,255,0.06)', floatClass: 'fl1' },
  { width: 300, height: 300, bottom: -80, right: '5%', color: 'rgba(124,58,237,0.08)', floatClass: 'fl2' },
]
