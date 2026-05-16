import { GlassCard, Chip, ProgressBar, Icon } from '@/design-system/primitives'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const CHART_DATA = [
  { day: 'Mon', replies: 124, eng: 89 },
  { day: 'Tue', replies: 187, eng: 102 },
  { day: 'Wed', replies: 156, eng: 94 },
  { day: 'Thu', replies: 214, eng: 127 },
  { day: 'Fri', replies: 198, eng: 118 },
  { day: 'Sat', replies: 89,  eng: 54 },
  { day: 'Sun', replies: 67,  eng: 41 },
]

const PLATFORMS = [
  { name: 'Twitter',  pct: 45, color: '#1DA1F2', replies: 1280 },
  { name: 'LinkedIn', pct: 28, color: '#0077b5', replies: 797 },
  { name: 'Reddit',   pct: 18, color: '#FF4500', replies: 512 },
  { name: 'Discord',  pct: 9,  color: '#5865F2', replies: 258 },
]

const CustomTooltip = ({ active, payload, label }: Record<string, unknown>) => {
  if (!(active as boolean) || !(payload as unknown[])?.length) return null
  return (
    <div className="glass-hi" style={{ padding: '8px 12px', fontSize: 11 }}>
      <div className="mono txt-2" style={{ fontSize: 9 }}>{label as string}</div>
      <div style={{ color: 'var(--cyan)' }}>Replies: {(payload as Array<{ payload: { replies: number } }>)[0].payload.replies}</div>
    </div>
  )
}

export default function Analytics() {
  return (
    <div className="enter">
      <div style={{ marginBottom: 22 }}>
        <Chip variant="violet" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>ANALYTICS</Chip>
        <h1 className="h-md">Neural <span className="txt-v">Analytics</span></h1>
        <p className="txt-2" style={{ fontSize: 13.5, marginTop: 4 }}>Engagement tracking — no billing or revenue metrics.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <GlassCard style={{ padding: '22px 24px' } as React.CSSProperties}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
            <span className="mono txt-2" style={{ fontSize: 10 }}>WEEKLY REPLY VOLUME</span>
            <button className="btn-g btn-sm" onClick={() => {
              const blob = new Blob([JSON.stringify(CHART_DATA, null, 2)], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              Object.assign(document.createElement('a'), { href: url, download: 'analytics.json' }).click()
              URL.revokeObjectURL(url)
            }} aria-label="Export analytics data">
              <Icon name="download" size={12} aria-hidden /> Export
            </button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={CHART_DATA}>
              <XAxis dataKey="day" stroke="var(--txt3)" tick={{ fontFamily: 'Space Mono', fontSize: 9 }} />
              <YAxis stroke="var(--txt3)" tick={{ fontFamily: 'Space Mono', fontSize: 9 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="replies" radius={[4, 4, 0, 0]}>
                {CHART_DATA.map((_, i) => <Cell key={i} fill={i === CHART_DATA.length - 1 ? 'var(--txt3)' : 'url(#grad)'} />)}
              </Bar>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--cyan)" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <GlassCard style={{ padding: '18px 20px' } as React.CSSProperties}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 14 }}>PLATFORM BREAKDOWN</div>
            {PLATFORMS.map(p => (
              <div key={p.name} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12 }}>{p.name}</span>
                  <span className="mono" style={{ fontSize: 10, color: p.color }}>{p.pct}%</span>
                </div>
                <ProgressBar value={p.pct} color={p.color} height={4} />
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
