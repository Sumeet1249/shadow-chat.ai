import { useState } from 'react'
import { GlassCard, Chip, Icon, Button } from '@/design-system/primitives'
import { maskKey } from '@/lib/utils'
import { useFocusTrap } from '@/hooks/useFocusTrap'

interface VaultKey {
  id: string
  label: string
  provider: string
  key: string
  color: string
  added: string
}

const VAULT_KEYS: VaultKey[] = [
  { id: 'openai', label: 'OpenAI API Key', provider: 'OpenAI', key: 'sk-aB3dEfGhIjKlMnOpQrSt1234', color: 'var(--green)', added: '2025-01-15' },
  { id: 'anthropic', label: 'Anthropic API Key', provider: 'Anthropic', key: 'sk-ant-XyZ9aBcDeFgHiJkLmNoPqRs', color: '#a78bfa', added: '2025-02-01' },
  { id: 'google', label: 'Google Gemini Key', provider: 'Google', key: 'AIzaSyDaBcDeFgHiJkLmNoPqRsTuVwXyZ01234', color: 'var(--amber)', added: '2025-03-10' },
]

/**
 * KeyVault — SEC-4: Keys masked by default, reveal requires confirmation dialog,
 * auto-re-masks after 30 seconds.
 */
export default function KeyVault() {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const [confirmKey, setConfirmKey] = useState<string | null>(null)
  const [timers, setTimers] = useState<Record<string, ReturnType<typeof setTimeout>>>({})
  const dialogRef = useFocusTrap(confirmKey !== null)

  const revealKey = (id: string) => {
    setConfirmKey(null)
    setRevealed(r => ({ ...r, [id]: true }))
    // Auto-re-mask after 30s (SEC-4)
    if (timers[id]) clearTimeout(timers[id])
    const t = setTimeout(() => {
      setRevealed(r => ({ ...r, [id]: false }))
    }, 30_000)
    setTimers(prev => ({ ...prev, [id]: t }))
  }

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key).catch(() => {})
  }

  return (
    <div className="enter">
      <div style={{ marginBottom: 22 }}>
        <Chip variant="amber" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>SECURITY</Chip>
        <h1 className="h-md">Key <span className="txt-a">Vault</span></h1>
        <p className="txt-2" style={{ fontSize: 13.5, marginTop: 4 }}>API keys masked by default. Reveal requires confirmation. Auto-re-masks after 30 seconds.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {VAULT_KEYS.map(vk => (
          <GlassCard key={vk.id} style={{ padding: '20px 24px' } as React.CSSProperties}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div className="icon-box" style={{ width: 44, height: 44, background: `${vk.color}14`, border: `1px solid ${vk.color}25`, flexShrink: 0 }}>
                <Icon name="key" size={20} color={vk.color} aria-hidden />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{vk.label}</div>
                <div className="mono" style={{ fontSize: 12, color: 'var(--txt2)', letterSpacing: '0.05em' }}>
                  {revealed[vk.id] ? vk.key : maskKey(vk.key)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="btn-g btn-sm"
                  onClick={() => revealed[vk.id] ? setRevealed(r => ({ ...r, [vk.id]: false })) : setConfirmKey(vk.id)}
                  aria-label={revealed[vk.id] ? `Hide ${vk.label}` : `Reveal ${vk.label}`}
                >
                  <Icon name={revealed[vk.id] ? 'visibility_off' : 'visibility'} size={13} aria-hidden />
                  {revealed[vk.id] ? 'Hide' : 'Reveal'}
                </button>
                {revealed[vk.id] && (
                  <button
                    className="btn-g btn-sm"
                    onClick={() => copyKey(vk.key)}
                    aria-label={`Copy ${vk.label}`}
                  >
                    <Icon name="content_copy" size={13} aria-hidden />
                  </button>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Confirm Reveal Dialog — SEC-4 */}
      {confirmKey && (
        <div
          className="overlay"
          role="presentation"
          onClick={() => setConfirmKey(null)}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reveal-dialog-title"
            className="glass-hi"
            style={{ padding: '28px 32px', maxWidth: 420, margin: '20vh auto', borderRadius: 'var(--r-xl)' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
              <Icon name="warning" size={20} color="var(--amber)" aria-hidden />
              <h2 id="reveal-dialog-title" className="h-sm">Confirm Key Reveal</h2>
            </div>
            <p className="txt-2" style={{ fontSize: 13.5, lineHeight: 1.65, marginBottom: 20 }}>
              This API key will be visible in plaintext for 30 seconds before auto-masking. Ensure no one can see your screen.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="ghost" onClick={() => setConfirmKey(null)} style={{ flex: 1, justifyContent: 'center' }}>Cancel</Button>
              <Button variant="action" onClick={() => { if (confirmKey) revealKey(confirmKey) }} style={{ flex: 2, justifyContent: 'center' }}>
                <Icon name="visibility" size={14} aria-hidden /> Reveal Key
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
