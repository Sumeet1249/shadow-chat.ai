import { useState } from 'react'
import { GlassCard, Chip, Button, Icon } from '@/design-system/components'
import { isPrivateIP, isValidJSON } from '@/lib/utils'
import { useAuthStore } from '@/store/useAuthStore'

const ALLOWED_PATHS = [
  '/api/health',
  '/api/auth/me',
  '/api/personas',
  '/api/nodes',
  '/api/analytics/summary',
  '/api/system/logs',
] as const

const METHODS = ['GET', 'POST', 'PUT', 'DELETE'] as const
type Method = typeof METHODS[number]

export default function DevSandbox() {
  const { user } = useAuthStore()
  const [method, setMethod] = useState<Method>('GET')
  const [path, setPath] = useState<string>(ALLOWED_PATHS[0])
  const [body, setBody] = useState('')
  const [bodyError, setBodyError] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  // SEC-5: Admin guard
  if (user?.role !== 'admin') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <GlassCard style={{ padding: '40px', textAlign: 'center', border: '1px solid var(--red)' } as React.CSSProperties}>
          <Icon name="gpp_bad" size={48} color="var(--red)" style={{ marginBottom: 16 }} />
          <h2 className="mono" style={{ color: 'var(--red)', fontSize: 16, marginBottom: 8 }}>ACCESS_DENIED</h2>
          <p className="txt-2" style={{ fontSize: 13 }}>Administrative privileges required to access the Neural Sandbox.</p>
          <Button variant="ghost" onClick={() => window.location.href='/dashboard'} style={{ marginTop: 24 }}>Return to Safety</Button>
        </GlassCard>
      </div>
    )
  }

  const validateAndSend = async () => {
    setBodyError('')
    if (body.trim() && !isValidJSON(body)) {
      setBodyError('INVALID_JSON_STRUCTURE')
      return
    }

    setLoading(true)
    setResponse('')

    // Simulate API call with "Admin" latency
    await new Promise(r => setTimeout(r, 600))
    const mockResponse = {
      status: 200,
      timestamp: new Date().toISOString(),
      node_id: 'SHADOW-ALPHA-01',
      execution_time: '42ms',
      payload: path === '/api/health' ? { status: 'healthy', version: '2.4.1', cluster: 'us-east-1' } : { success: true, resource: path },
    }
    setResponse(JSON.stringify(mockResponse, null, 2))
    setLoading(false)
  }

  return (
    <div className="enter">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <Chip variant="red" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>
             <span className="blink" style={{ marginRight: 6 }}>●</span> SYSTEM_CRITICAL
          </Chip>
          <h1 className="h-md">Neural <span className="grad-v">Sandbox</span></h1>
          <p className="txt-2" style={{ fontSize: 13.5, marginTop: 4 }}>Direct endpoint orchestration. Restricted to verified administrative nodes.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="ghost" style={{ borderColor: 'rgba(248,113,113,0.3)', color: 'var(--red)' }}><Icon name="warning" size={14} /> Global Halt</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: 18 }}>
        {/* Request Config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <GlassCard style={{ padding: '24px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 20 }}>REQUEST_PARAMETERS</div>
            
            <div style={{ marginBottom: 16 }}>
              <label className="mono txt-2" style={{ fontSize: 9, display: 'block', marginBottom: 8 }}>HTTP_METHOD</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
                {METHODS.map(m => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    style={{
                      padding: '8px',
                      borderRadius: 6,
                      border: `1px solid ${method === m ? 'var(--cyan)' : 'var(--border)'}`,
                      background: method === m ? 'var(--cyan)15' : 'transparent',
                      color: method === m ? 'var(--cyan)' : 'var(--txt3)',
                      fontSize: 10,
                      cursor: 'pointer'
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="mono txt-2" style={{ fontSize: 9, display: 'block', marginBottom: 8 }}>ENDPOINT_PATH</label>
              <select className="field" value={path} onChange={e => setPath(e.target.value)} style={{ fontSize: 12 }}>
                {ALLOWED_PATHS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {method !== 'GET' && (
              <div style={{ marginBottom: 20 }}>
                <label className="mono txt-2" style={{ fontSize: 9, display: 'block', marginBottom: 8 }}>JSON_PAYLOAD</label>
                <textarea
                  className="field"
                  rows={6}
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  placeholder='{"action": "sync"}'
                  style={{ fontFamily: 'var(--ff-mono)', fontSize: 11, background: 'rgba(0,0,0,0.3)' }}
                />
                {bodyError && <div className="mono" style={{ color: 'var(--red)', fontSize: 9, marginTop: 6 }}>{bodyError}</div>}
              </div>
            )}

            <Button variant="primary" loading={loading} onClick={validateAndSend} style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
              <Icon name="terminal" size={14} /> EXECUTE_COMMAND
            </Button>
          </GlassCard>

          <GlassCard style={{ padding: '20px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 9, marginBottom: 12 }}>ADMIN_LOGS</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--txt3)', lineHeight: 1.6 }}>
              <div>[04:44:12] AUTH_LEVEL_GRANTED: admin_01</div>
              <div>[04:44:15] SANDBOX_SESSION: initialized</div>
              <div>[04:45:01] HEARTBEAT: cluster_sync_ok</div>
            </div>
          </GlassCard>
        </div>

        {/* Response Window */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <GlassCard variant="elevated" style={{ flex: 1, padding: '24px', background: '#000', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' } as React.CSSProperties}>
             {/* Scanline effect specifically for terminal */}
             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%', pointerEvents: 'none', zIndex: 2 }} />
             
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, position: 'relative', zIndex: 3 }}>
                <span className="mono txt-2" style={{ fontSize: 10, color: 'var(--cyan)' }}>SYSTEM_RESPONSE</span>
                <span className="mono txt-2" style={{ fontSize: 9 }}>STATUS: 200 OK</span>
             </div>

             <pre style={{ position: 'relative', zIndex: 3, fontFamily: 'var(--ff-mono)', fontSize: 13, color: 'var(--green)', opacity: 0.9, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>
                {response || '// Awaiting system input...'}
                {loading && <span className="blink"> _</span>}
             </pre>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
