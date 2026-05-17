import { useState, useRef, useEffect } from 'react'
import { GlassCard, Chip, Button, Icon } from '@/design-system/components'

const TRANSCRIPT_SAMPLES = [
  "So the core thesis here is that retrieval is the new training. Instead of fine-tuning models, we focus on high-fidelity context injection.",
  "Which means our latency needs to be sub-200ms at the edge. The user experience depends entirely on the feedback loop speed.",
  "I agree. Most teams build the model first, but the winning strategy is building the evaluation pipeline first. That's the real alpha."
]

export default function LiveAudio() {
  const [recording, setRecording] = useState(false)
  const [transcript, setTranscript] = useState<string[]>([])
  const [reply, setReply] = useState('')
  const [generating, setGenerating] = useState(false)
  
  // Fingerprint animation bars
  const [bars, setBars] = useState(Array.from({ length: 24 }, () => 10 + Math.random() * 40))

  useEffect(() => {
    let iv: any
    if (recording) {
      iv = setInterval(() => {
        setBars(prev => prev.map(v => 5 + Math.random() * 90))
        if (Math.random() > 0.8 && transcript.length < TRANSCRIPT_SAMPLES.length) {
          setTranscript(prev => [...prev, TRANSCRIPT_SAMPLES[prev.length]])
        }
      }, 150)
    } else {
      setBars(prev => prev.map(() => 8))
    }
    return () => clearInterval(iv)
  }, [recording, transcript])

  const generateReply = () => {
    setGenerating(true)
    setReply('')
    setTimeout(() => {
      setReply("Tactical Reply: The 'retrieval is the new training' framework you're proposing matches the shift we're seeing in production ML. By prioritizing the evaluation pipeline before the model, you're building a system that's objectively measurable from day one.")
      setGenerating(false)
    }, 1500)
  }

  return (
    <div className="enter">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <Chip variant="red" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>
            {recording && <span className="blink" style={{ marginRight: 6 }}>●</span>}
            {recording ? 'RECORDING_ACTIVE' : 'AUDIO_SYNC_IDLE'}
          </Chip>
          <h1 className="h-md">Live Audio <span className="grad-v">Sync</span></h1>
          <p className="txt-2" style={{ fontSize: 13.5, marginTop: 4 }}>Real-time transcription and persona-aligned reply generation.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="ghost"><Icon name="settings" size={14} /> Mic Settings</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          
          {/* Waveform Card */}
          <GlassCard style={{ padding: '40px', textAlign: 'center' } as React.CSSProperties}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 4, height: 100, marginBottom: 32 }}>
              {bars.map((h, i) => (
                <div key={i} style={{ width: 6, height: `${h}%`, background: recording ? 'var(--cyan)' : 'var(--border)', borderRadius: 3, transition: 'height 0.15s ease' }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              <Button 
                variant={recording ? 'primary' : 'ghost'} 
                onClick={() => setRecording(!recording)}
                style={{ padding: '14px 40px', fontSize: 15, background: recording ? 'var(--red)' : undefined, border: recording ? 'none' : undefined }}
              >
                <Icon name={recording ? 'stop' : 'mic'} size={18} />
                {recording ? 'STOP CAPTURE' : 'INITIALIZE CAPTURE'}
              </Button>
            </div>
          </GlassCard>

          {/* Transcript */}
          <GlassCard style={{ padding: '24px', minHeight: 200 } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>LIVE_TRANSCRIPTION</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {transcript.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 12 }}>
                  <span className="mono txt-2" style={{ fontSize: 10, marginTop: 3 }}>[00:{i*4 < 10 ? '0' : ''}{i*4}]</span>
                  <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6 }}>{t}</p>
                </div>
              ))}
              {recording && (
                <div style={{ display: 'flex', gap: 12, opacity: 0.5 }}>
                  <span className="mono txt-2" style={{ fontSize: 10 }}>[--:--]</span>
                  <p className="blink" style={{ fontSize: 14, color: 'var(--txt2)' }}>Listening...</p>
                </div>
              )}
              {!recording && transcript.length === 0 && (
                <div style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--txt3)' }}>
                  <span className="mono" style={{ fontSize: 11 }}>// START CAPTURE TO BEGIN TRANSCRIPTION</span>
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Sidebar: Reply Gen */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <GlassCard variant="elevated" style={{ padding: '24px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>NEURAL_REPLY_SYNOPSIS</div>
            {reply ? (
              <div style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--txt2)', marginBottom: 20 }}>{reply}</div>
            ) : (
              <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.1, marginBottom: 20 }}>
                <Icon name="auto_awesome" size={48} />
              </div>
            )}
            <Button 
              variant="primary" 
              disabled={transcript.length === 0 || generating} 
              onClick={generateReply}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Icon name="psychology" size={14} /> {generating ? 'SYNCING...' : 'GENERATE SYNOPSIS'}
            </Button>
          </GlassCard>

          <GlassCard style={{ padding: '20px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 16 }}>MIC_SETTINGS</div>
            {[
              { l: 'INPUT_LEVEL', v: recording ? '72%' : '0%', c: 'var(--cyan)' },
              { l: 'SAMPLE_RATE', v: '48kHz', c: 'var(--txt3)' },
              { l: 'NOISE_GATE', v: 'ACTIVE', c: 'var(--green)' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span className="mono txt-2" style={{ fontSize: 9 }}>{s.l}</span>
                <span className="mono" style={{ fontSize: 10, color: s.c }}>{s.v}</span>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
