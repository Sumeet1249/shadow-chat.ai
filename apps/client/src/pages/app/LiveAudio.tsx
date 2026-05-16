// LiveAudio — Phase 7.8 stub
import { useState, useRef, useEffect } from 'react'
import { GlassCard, Chip, Button, Icon } from '@/design-system/primitives'
import { useReducedMotion } from 'framer-motion'

const TRANSCRIPT_LINES = [
  'So I think the key insight here is that language models are fundamentally pattern matching machines...',
  'And what that means for your go-to-market is you need to focus on the evaluation layer...',
  'The teams winning right now are building custom evals before they build the product...',
]

export default function LiveAudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const [recording, setRecording] = useState(false)
  const [transcript, setTranscript] = useState<string[]>([])
  const [lineIdx, setLineIdx] = useState(0)
  const [output, setOutput] = useState('')
  const shouldReduceMotion = useReducedMotion()

  // Waveform canvas
  useEffect(() => {
    if (shouldReduceMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = canvas.offsetWidth * devicePixelRatio
    canvas.height = canvas.offsetHeight * devicePixelRatio
    ctx.scale(devicePixelRatio, devicePixelRatio)
    let t = 0
    const draw = () => {
      const W = canvas.offsetWidth, H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)
      const bars = 48
      for (let i = 0; i < bars; i++) {
        const h = recording ? 4 + Math.abs(Math.sin(t + i * 0.35)) * (H - 8) * 0.7 : 4
        const x = (i / bars) * W
        ctx.fillStyle = `rgba(0,229,255,${recording ? 0.6 : 0.15})`
        ctx.fillRect(x, (H - h) / 2, W / bars - 2, h)
      }
      t += 0.08
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [recording, shouldReduceMotion])

  const toggleRecording = () => {
    setRecording(r => !r)
    if (!recording && lineIdx < TRANSCRIPT_LINES.length) {
      const iv = setInterval(() => {
        setTranscript(tr => {
          const next = [...tr, TRANSCRIPT_LINES[tr.length % TRANSCRIPT_LINES.length]]
          return next
        })
        setLineIdx(i => i + 1)
      }, 4000)
      setTimeout(() => clearInterval(iv), 12000)
    }
  }

  const genReply = () => {
    if (transcript.length === 0) return
    setOutput('Based on the conversation, here\'s a tactical reply: The evaluation-first approach you\'re describing aligns with what the top 5% of ML teams are doing. Most teams build the product and then wonder why it doesn\'t work in production. The eval gap is where all the value lives.')
  }

  return (
    <div className="enter">
      <div style={{ marginBottom: 22 }}>
        <Chip variant="red" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>
          {recording && <span className="dot" style={{ background: 'var(--red)', marginRight: 4 }} aria-hidden />}
          {recording ? 'RECORDING' : 'LIVE AUDIO'}
        </Chip>
        <h1 className="h-md">Live Audio <span className="txt-c">Sync</span></h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <GlassCard variant="elevated" style={{ padding: '24px' } as React.CSSProperties}>
            <canvas ref={canvasRef} aria-label="Audio waveform visualizer" style={{ width: '100%', height: 80, display: 'block', marginBottom: 20 }} />
            <div style={{ textAlign: 'center' }}>
              <Button variant={recording ? 'action' : 'primary'} onClick={toggleRecording} style={{ padding: '14px 32px', fontSize: 15 }}>
                <Icon name={recording ? 'stop' : 'mic'} size={18} aria-hidden />
                {recording ? 'Stop Recording' : 'Start Recording'}
              </Button>
            </div>
          </GlassCard>

          <GlassCard style={{ padding: '20px 22px', minHeight: 140 } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 12 }}>TRANSCRIPT</div>
            {transcript.length === 0 ? (
              <div className="mono txt-2" style={{ fontSize: 11 }}>// Start recording to transcribe audio</div>
            ) : (
              transcript.map((l, i) => <p key={i} style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--txt2)', marginBottom: 8 }}>"{l}"</p>)
            )}
          </GlassCard>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <GlassCard variant="elevated" style={{ padding: '20px 22px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 14 }}>GENERATED REPLY</div>
            {output ? (
              <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--txt2)', marginBottom: 14 }}>{output}</div>
            ) : (
              <div className="mono txt-2" style={{ fontSize: 11, marginBottom: 14 }}>// Transcribe audio first, then generate reply</div>
            )}
            <Button variant="primary" disabled={transcript.length === 0} onClick={genReply} style={{ width: '100%', justifyContent: 'center' }}>
              <Icon name="auto_awesome" size={14} aria-hidden /> Generate Reply
            </Button>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
