import { useState } from 'react'
import { GlassCard, Chip, Button, Icon } from '@/design-system/primitives'
import { isPrivateIP, isValidJSON } from '@/lib/utils'
import { useAuthStore } from '@/store/useAuthStore'

/**
 * DevSandbox — SEC-5: Admin-only endpoint tester.
 * - Endpoint selector is <select> of allowed paths — no freeform URL input
 * - Private IP ranges blocked at validation level
 * - Request body validated as JSON only
 * - No stack traces in response panel (SEC-7)
 */

const ALLOWED_PATHS = [
  '/api/health',
  '/api/auth/me',
  '/api/personas',
  '/api/nodes',
  '/api/analytics/summary',
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
  const [curlCopied, setCurlCopied] = useState(false)

  // SEC-5: Admin guard (router guard handles page access, this is defense-in-depth)
  if (user?.role !== 'admin') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <Icon name="shield" size={40} color="var(--red)" />
          <p style={{ color: 'var(--red)', marginTop: 12, fontFamily: 'var(--ff-mono)', fontSize: 12 }}>ADMIN ACCESS REQUIRED</p>
        </div>
      </div>
    )
  }

  const validateAndSend = async () => {
    setBodyError('')

    // Validate request body as JSON only
    if (body.trim() && !isValidJSON(body)) {
      setBodyError('Request body must be valid JSON')
      return
    }

    // Private IP block — SEC-5
    const apiBase = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'
    try {
      const url = new URL(apiBase)
      if (isPrivateIP(url.hostname) && !import.meta.env.DEV) {
        setBodyError('Private IP ranges are not allowed in production')
        return
      }
    } catch {
      setBodyError('Invalid API base URL')
      return
    }

    setLoading(true)
    setResponse('')

    // Simulate API call
    await new Promise(r => setTimeout(r, 800))
    const mockResponse = {
      status: 200,
      headers: { 'content-type': 'application/json', 'x-request-id': 'req_shadow_' + Date.now() },
      data: path === '/api/health' ? { status: 'healthy', version: '2.4.1', uptime: '14d 7h' } : { ok: true, path },
    }
    setResponse(JSON.stringify(mockResponse, null, 2))
    setLoading(false)
  }

  const curlCmd = `curl -X ${method} '${import.meta.env.VITE_API_URL ?? 'http://localhost:8000'}${path}' -H 'Content-Type: application/json'${body ? ` -d '${body}'` : ''}`

  const copyCurl = () => {
    navigator.clipboard.writeText(curlCmd).then(() => { setCurlCopied(true); setTimeout(() => setCurlCopied(false), 2000) }).catch(() => {})
  }

  return (
    <div className="enter">
      <div style={{ marginBottom: 22 }}>
        <Chip variant="red" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>
          <Icon name="shield" size={11} color="var(--red)" aria-hidden />
          ADMIN ONLY
        </Chip>
        <h1 className="h-md">API <span className="txt-v">Sandbox</span></h1>
        <p className="txt-2" style={{ fontSize: 13.5, marginTop: 4 }}>Test API endpoints — restricted to approved paths. Private IPs blocked.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Request builder */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <GlassCard style={{ padding: '20px 22px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 14 }}>REQUEST</div>

            {/* Method select */}
            <div style={{ marginBottom: 12 }}>
              <label htmlFor="sandbox-method" className="mono txt-2" style={{ fontSize: 9, display: 'block', marginBottom: 6 }}>METHOD</label>
              <select
                id="sandbox-method"
                className="field"
                value={method}
                onChange={e => setMethod(e.target.value as Method)}
              >
                {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {/* Endpoint selector — SEC-5: <select> not <input> */}
            <div style={{ marginBottom: 12 }}>
              <label htmlFor="sandbox-path" className="mono txt-2" style={{ fontSize: 9, display: 'block', marginBottom: 6 }}>ENDPOINT (Allowed paths only)</label>
              <select
                id="sandbox-path"
                className="field"
                value={path}
                onChange={e => setPath(e.target.value)}
              >
                {ALLOWED_PATHS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* Body — JSON only */}
            {method !== 'GET' && (
              <div style={{ marginBottom: 12 }}>
                <label htmlFor="sandbox-body" className="mono txt-2" style={{ fontSize: 9, display: 'block', marginBottom: 6 }}>BODY (JSON only)</label>
                <textarea
                  id="sandbox-body"
                  className="field"
                  rows={5}
                  value={body}
                  onChange={e => { setBody(e.target.value); setBodyError('') }}
                  placeholder='{"key": "value"}'
                  style={{ fontFamily: 'var(--ff-mono)', fontSize: 11, resize: 'none' }}
                />
                {bodyError && <div role="alert" style={{ color: 'var(--red)', fontSize: 11, marginTop: 4 }}>{bodyError}</div>}
              </div>
            )}

            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="primary" loading={loading} onClick={validateAndSend} style={{ flex: 1, justifyContent: 'center' }}>
                <Icon name="send" size={13} aria-hidden /> Send
              </Button>
              <button className="btn-g btn-sm" onClick={copyCurl} aria-label="Copy cURL command">
                <Icon name="content_copy" size={13} aria-hidden />
                {curlCopied ? 'Copied!' : 'cURL'}
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Response panel */}
        <GlassCard variant="elevated" style={{ padding: '20px 22px' } as React.CSSProperties}>
          <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 14 }}>RESPONSE</div>
          <pre style={{ fontFamily: 'var(--ff-mono)', fontSize: 11, color: 'var(--txt2)', lineHeight: 1.7, overflowX: 'auto', minHeight: 200, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {response || '// Response will appear here'}
          </pre>
        </GlassCard>
      </div>
    </div>
  )
}
