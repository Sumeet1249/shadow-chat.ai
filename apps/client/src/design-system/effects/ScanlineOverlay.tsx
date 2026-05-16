/**
 * ScanlineOverlay — Full screen CRT scanline effect.
 * Extracted from raw CSS class .scan to enforce component boundaries.
 */
export function ScanlineOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.025) 2px, rgba(0, 0, 0, 0.025) 4px)',
        pointerEvents: 'none',
        zIndex: 9995,
      }}
    />
  )
}
