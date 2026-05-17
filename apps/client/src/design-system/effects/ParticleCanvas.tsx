import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'

interface ParticleCanvasProps {
  density?: number
  className?: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity?: number
  color: string
}

interface Cell {
  particles: number[]
}

// IMPORTANT: Each color string is intentionally incomplete (no closing paren).
// fillStyle concatenates: `${p.color}${p.opacity})` → e.g., `rgba(0,229,255,0.25)`
const COLORS = ['rgba(0,229,255,', 'rgba(124,58,237,', 'rgba(52,211,153,']

/**
 * ParticleCanvas — O(n) spatial grid rewrite.
 * Spatial cell lookup replaces O(n²) nested loop from prototype.
 * useReducedMotion() from Framer Motion disables animation for prefers-reduced-motion users.
 */
export function ParticleCanvas({ density = 0.35 }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef   = useRef<number>(0)
  const shouldReduceMotion = useReducedMotion()

  const createParticles = useCallback((width: number, height: number): Particle[] => {
    const count = Math.floor((width * height * density) / 8000)
    return Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: 1 + Math.random() * 1.5,
      color: `${COLORS[Math.floor(Math.random() * COLORS.length)]}${(0.08 + Math.random() * 0.35).toFixed(2)})`,
    }))
  }, [density])

  useEffect(() => {
    if (shouldReduceMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width  = window.innerWidth
    let height = window.innerHeight
    canvas.width  = width
    canvas.height = height

    let particles = createParticles(width, height)
    const CELL_SIZE = 120

    // ── O(n) Spatial grid ────────────────────────────────────────
    function buildGrid(ps: Particle[], w: number, h: number) {
      const cols = Math.ceil(w / CELL_SIZE)
      const rows = Math.ceil(h / CELL_SIZE)
      const grid: Cell[][] = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({ particles: [] }))
      )
      ps.forEach((p, i) => {
        const col = Math.floor(p.x / CELL_SIZE)
        const row = Math.floor(p.y / CELL_SIZE)
        if (row >= 0 && row < rows && col >= 0 && col < cols) {
          grid[row][col].particles.push(i)
        }
      })
      return { grid, cols, rows }
    }

    function draw() {
      if (!ctx) return
      // Single guard — ctx is verified above and stable for the lifetime of this closure
      ctx.clearRect(0, 0, width, height)

      // Update positions
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width)  p.vx *= -1
        if (p.y < 0 || p.y > height)  p.vy *= -1
      })

      // Draw particles — single ctx guard at function scope
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })

      // O(n) connection lines via spatial grid
      const { grid, cols, rows } = buildGrid(particles, width, height)
      const CONNECTION_DIST    = 100
      const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cell = grid[row][col]
          const neighbors: number[] = []
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = row + dr
              const nc = col + dc
              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                neighbors.push(...grid[nr][nc].particles)
              }
            }
          }

          cell.particles.forEach(i => {
            neighbors.forEach(j => {
              if (j <= i) return
              const dx = particles[i].x - particles[j].x
              const dy = particles[i].y - particles[j].y
              const distSq = dx * dx + dy * dy
              if (distSq < CONNECTION_DIST_SQ) {
                const alpha = (1 - Math.sqrt(distSq) / CONNECTION_DIST) * 0.12
                ctx.beginPath()
                ctx.moveTo(particles[i].x, particles[i].y)
                ctx.lineTo(particles[j].x, particles[j].y)
                ctx.strokeStyle = `rgba(0,229,255,${alpha})`
                ctx.lineWidth   = 0.5
                ctx.stroke()
              }
            })
          })
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      width  = window.innerWidth
      height = window.innerHeight
      canvas.width  = width
      canvas.height = height
      particles = createParticles(width, height)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [shouldReduceMotion, createParticles])

  if (shouldReduceMotion) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
