import React, { useState } from 'react';
import { I } from '../../components/Icon';

const INITIAL_MEMORIES = [
  { id: 1, label: "ML Infrastructure Patterns", tokens: 4280, persona: "Nexus Architect", updated: "2h ago", refs: 47, type: "knowledge" },
  { id: 2, label: "Corporate Tone Guidelines", tokens: 1890, persona: "Corporate Phantom", updated: "6h ago", refs: 23, type: "style" },
  { id: 3, label: "RLHF Research Notes", tokens: 6720, persona: "Ghost Analyst", updated: "1d ago", refs: 89, type: "knowledge" },
  { id: 4, label: "Crypto Market Signals", tokens: 3100, persona: "Signal_Zero", updated: "30m ago", refs: 156, type: "data" },
  { id: 5, label: "Engagement Rules", tokens: 2450, persona: "All", updated: "3d ago", refs: 34, type: "strategy" },
];

export function MemoryMatrix({ nav }: { nav: (path: string) => void }) {
  const [search, setSearch] = useState("");
  const [memories, setMemories] = useState(INITIAL_MEMORIES);
  const [modal, setModal] = useState({ open: false, mode: "new", id: null as number | null, title: "", content: "" });

  const totalTokens = memories.reduce((s, m) => s + m.tokens, 0);
  const filtered = memories.filter(m => !search || m.label.toLowerCase().includes(search.toLowerCase()));

  const handleNewBlock = () => {
    setModal({ open: true, mode: "new", id: null, title: "", content: "" });
  };

  const handleDelete = (id: number) => {
    setMemories(memories.filter(m => m.id !== id));
  };

  const handleEdit = (id: number) => {
    const mem = memories.find(m => m.id === id);
    if (!mem) return;
    setModal({ open: true, mode: "edit", id, title: mem.label, content: (mem as any).content || "" });
  };

  const handleSave = () => {
    if (!modal.title.trim()) return;
    
    const tokenEstimate = Math.max(120, Math.floor((modal.title.length + modal.content.length) * 2.5));

    if (modal.mode === "new") {
      const newMem = {
        id: Date.now(),
        label: modal.title.trim(),
        content: modal.content.trim(),
        tokens: tokenEstimate,
        persona: "Global",
        updated: "Just now",
        refs: 0,
        type: "knowledge"
      };
      setMemories([newMem, ...memories]);
    } else {
      setMemories(memories.map(m => m.id === modal.id ? { ...m, label: modal.title.trim(), content: modal.content.trim(), tokens: tokenEstimate, updated: "Just now" } : m));
    }
    setModal({ ...modal, open: false });
  };

  return (
    <div className="enter">
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 className="h-md"><span className="grad-c">Memory Matrix</span></h1>
          <p style={{ color: "var(--txt2)", fontSize: 13.5, marginTop: 4 }}>{totalTokens.toLocaleString()} tokens · <span style={{ color: "var(--cyan)" }}>{memories.length} blocks</span></p>
        </div>
        <button className="btn-p" onClick={handleNewBlock}><I n="add" s={15} /> New Block</button>
      </div>
      <div className="glass" style={{ padding: "12px 18px", marginBottom: 16 }}>
        <input className="field" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search memory blocks..." style={{ height: 38, fontSize: 13 }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {filtered.map(m => (
          <div key={m.id} className="card-out hover-glow">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{m.label}</div>
              <span className="chip chip-c" style={{ fontSize: 9 }}>{m.updated}</span>
            </div>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 10 }}>{m.persona} · {m.type}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 14 }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--cyan)" }}>{m.tokens.toLocaleString()} tok</span>
                <span className="mono txt-2" style={{ fontSize: 11 }}>{m.refs} refs</span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="btn-g btn-sm" onClick={() => handleEdit(m.id)}><I n="edit" s={11} /></button>
                <button className="btn-g btn-sm" onClick={() => handleDelete(m.id)}><I n="delete" s={11} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Modal */}
      {modal.open && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div className="glass" style={{ width: "100%", maxWidth: 480, padding: 24, display: "flex", flexDirection: "column" }}>
            <h2 className="h-md" style={{ marginBottom: 20 }}>{modal.mode === "new" ? "New Memory Block" : "Edit Memory Block"}</h2>
            
            <div style={{ marginBottom: 16 }}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>BLOCK TITLE</div>
              <input 
                className="field" 
                value={modal.title} 
                onChange={e => setModal({ ...modal, title: e.target.value })} 
                placeholder="e.g. Project Context" 
              />
            </div>
            
            <div style={{ marginBottom: 24 }}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>KNOWLEDGE DATA (TEXT)</div>
              <textarea 
                className="field" 
                value={modal.content} 
                onChange={e => setModal({ ...modal, content: e.target.value })} 
                placeholder="Enter knowledge text or raw data..." 
                style={{ minHeight: 140, resize: "vertical", paddingTop: 12, paddingBottom: 12 }} 
              />
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button className="btn-g" onClick={() => setModal({ ...modal, open: false })}>Cancel</button>
              <button className="btn-p" onClick={handleSave} disabled={!modal.title.trim()}>Save Block</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
