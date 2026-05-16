// MemoryMatrix — Phase 7.3 stub
import { useState } from 'react'
import { GlassCard, Chip, Icon, Button } from '@/design-system/primitives'
import { useDebounce } from '@/hooks/useDebounce'

const MEMORIES = [
  { id: 1, title: 'AI Infrastructure Expert',  content: 'Deep expertise in MLOps, LLM deployment, inference optimization, and distributed systems.', tags: ['AI', 'Technical'], active: true },
  { id: 2, title: 'Competitor Intelligence',    content: 'Main competitor analysis: Jasper AI focuses on marketing copy. ShadowNode has superior persona layering.', tags: ['Strategy', 'Intelligence'], active: true },
  { id: 3, title: 'Engagement Rules',           content: 'Always reply within 10 minutes of viral threads. Never engage trolls. Always add value before promoting.', tags: ['Rules', 'Engagement'], active: true },
  { id: 4, title: 'Style Guide',                content: 'No corporate jargon. Short paragraphs. Bold claims backed by data. End with a question when possible.', tags: ['Style', 'Tone'], active: false },
]

export default function MemoryMatrix() {
  const [q, setQ] = useState('')
  const dq = useDebounce(q, 300)
  const filtered = MEMORIES.filter(m => m.title.toLowerCase().includes(dq.toLowerCase()) || m.content.toLowerCase().includes(dq.toLowerCase()))

  return (
    <div className="enter">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 22 }}>
        <div>
          <Chip variant="cyan" style={{ marginBottom: 8, display: 'inline-flex' } as React.CSSProperties}>MEMORY</Chip>
          <h1 className="h-md">Memory <span className="txt-c">Matrix</span></h1>
        </div>
        <Button variant="primary" size="sm"><Icon name="add" size={13} aria-hidden /> Add Memory</Button>
      </div>
      <input className="field" placeholder="Search memories..." value={q} onChange={e => setQ(e.target.value)} style={{ marginBottom: 16 }} aria-label="Search memory matrix" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {filtered.map(m => (
          <GlassCard key={m.id} style={{ padding: '20px 22px', opacity: m.active ? 1 : 0.6 } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <h3 style={{ fontWeight: 600, fontSize: 14 }}>{m.title}</h3>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn-g btn-sm" aria-label={`Edit ${m.title}`}><Icon name="edit" size={11} aria-hidden /></button>
                <button className="btn-g btn-sm" aria-label={`Delete ${m.title}`}><Icon name="delete" size={11} color="var(--red)" aria-hidden /></button>
              </div>
            </div>
            <p className="txt-2" style={{ fontSize: 12.5, lineHeight: 1.6, marginBottom: 12 }}>{m.content}</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {m.tags.map(t => <span key={t} className="chip chip-c" style={{ fontSize: 9 }}>{t}</span>)}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
