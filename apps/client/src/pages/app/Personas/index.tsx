import React, { useState } from 'react';
import { I } from '../../../components/Icon';

const INITIAL_PERSONAS = [
  { id: "nexus", name: "Nexus Architect", style: "Technical thought leader", platform: "Twitter", posts: 284, winRate: 94, elo: 1847, color: "#059669", bio: "Deep ML infrastructure expert. Speaks with authority on distributed systems, model deployment, and edge computing." },
  { id: "phantom", name: "Corporate Phantom", style: "Strategic & polished", platform: "LinkedIn", posts: 156, winRate: 88, elo: 1634, color: "#0d9488", bio: "Senior engineering leader voice. Polished takes on management, team building, and engineering culture." },
  { id: "ghost", name: "Ghost Analyst", style: "Data-driven contrarian", platform: "Reddit", posts: 342, winRate: 91, elo: 1756, color: "#f59e0b", bio: "Contrarian researcher who dismantles popular takes with data. Specializes in ML theory and RLHF critique." },
  { id: "signal", name: "Signal_Zero", style: "Underground alpha", platform: "Discord", posts: 198, winRate: 79, elo: 1698, color: "#34d399", bio: "Crypto-native alpha hunter. Casual tone, early signals, architecture leak analysis." },
];

export function PersonasPage({ nav }: { nav: (path: string) => void }) {
  const [personas, setPersonas] = useState(INITIAL_PERSONAS);
  const [selected, setSelected] = useState<string | null>(null);
  const [modal, setModal] = useState({ open: false, mode: "new", id: "", name: "", style: "", bio: "" });

  const persona = selected ? personas.find(p => p.id === selected) : null;

  const handleNewPersona = () => {
    setModal({ open: true, mode: "new", id: "", name: "", style: "", bio: "" });
  };

  const handleEdit = () => {
    if (!persona) return;
    setModal({ open: true, mode: "edit", id: persona.id, name: persona.name, style: persona.style, bio: persona.bio });
  };

  const handleSave = () => {
    if (!modal.name.trim()) return;

    if (modal.mode === "new") {
      const newP = {
        id: "p_" + Date.now(),
        name: modal.name.trim(),
        style: modal.style.trim() || "Unspecified style",
        bio: modal.bio.trim() || "No bio provided.",
        platform: "Global",
        posts: 0,
        winRate: 50,
        elo: 1000,
        color: "var(--cyan)"
      };
      setPersonas([newP, ...personas]);
      setSelected(newP.id);
    } else {
      setPersonas(personas.map(p => p.id === modal.id ? { ...p, name: modal.name.trim(), style: modal.style.trim(), bio: modal.bio.trim() } : p));
    }
    setModal({ ...modal, open: false });
  };

  return (
    <div className="enter">
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 className="h-md"><span className="grad-c">Personas</span></h1>
          <p style={{ color: "var(--txt2)", fontSize: 13.5, marginTop: 4 }}>{personas.length} active personas · <span style={{ color: "var(--green)" }}>identity engine online</span></p>
        </div>
        <button className="btn-p" onClick={handleNewPersona}><I n="person_add" s={15} /> Create Persona</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 380px" : "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr" : "1fr 1fr", gap: 12 }}>
          {personas.map(p => (
            <div key={p.id} className="card-out hover-glow" onClick={() => setSelected(p.id)} style={{ borderColor: selected === p.id ? `${p.color}44` : undefined }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${p.color}, ${p.color}55)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "var(--txt)", fontSize: 16, boxShadow: `0 0 14px ${p.color}33`, flexShrink: 0 }}>{p.name[0]}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                  <div className="mono txt-2" style={{ fontSize: 10 }}>{p.style}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <span className="mono" style={{ fontSize: 10, color: p.color }}>{p.platform}</span>
                <span className="mono txt-2" style={{ fontSize: 10 }}>{p.posts} posts</span>
                <span className="mono" style={{ fontSize: 10, color: "var(--green)" }}>{p.winRate}% WR</span>
                <span className="mono txt-2" style={{ fontSize: 10 }}>ELO {p.elo}</span>
              </div>
            </div>
          ))}
        </div>
        {persona && (
          <div className="glass" style={{ padding: "24px", alignSelf: "start" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${persona.color}, ${persona.color}55)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "var(--txt)", fontSize: 20, boxShadow: `0 0 18px ${persona.color}33` }}>{persona.name[0]}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17, color: persona.color }}>{persona.name}</div>
                  <div className="mono txt-2" style={{ fontSize: 10 }}>{persona.style}</div>
                </div>
              </div>
              <button className="btn-g btn-sm" onClick={() => setSelected(null)}><I n="close" s={13} /></button>
            </div>
            <p style={{ color: "var(--txt2)", fontSize: 13, lineHeight: 1.6, marginBottom: 18 }}>{persona.bio}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[{ l: "Posts", v: persona.posts.toString() }, { l: "Win Rate", v: `${persona.winRate}%` }, { l: "ELO", v: persona.elo.toString() }, { l: "Platform", v: persona.platform }].map((s, i) => (
                <div key={i} style={{ padding: "10px 12px", background: "rgba(5,150,105,.03)", border: "1px solid var(--border)", borderRadius: "var(--r-md)" }}>
                  <div className="mono txt-2" style={{ fontSize: 9, marginBottom: 4 }}>{s.l}</div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{s.v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <button className="btn-p btn-sm" style={{ flex: 1 }} onClick={() => nav("generate")}><I n="auto_awesome" s={13} /> Generate</button>
              <button className="btn-g btn-sm" onClick={handleEdit}><I n="edit" s={13} /></button>
            </div>
          </div>
        )}
      </div>

      {/* Custom Modal */}
      {modal.open && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div className="glass" style={{ width: "100%", maxWidth: 480, padding: 24, display: "flex", flexDirection: "column" }}>
            <h2 className="h-md" style={{ marginBottom: 20 }}>{modal.mode === "new" ? "Create Persona" : "Edit Persona"}</h2>
            
            <div style={{ marginBottom: 16 }}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>PERSONA NAME</div>
              <input 
                className="field" 
                value={modal.name} 
                onChange={e => setModal({ ...modal, name: e.target.value })} 
                placeholder="e.g. Code Reviewer" 
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>TONE / STYLE</div>
              <input 
                className="field" 
                value={modal.style} 
                onChange={e => setModal({ ...modal, style: e.target.value })} 
                placeholder="e.g. Critical, concise, helpful" 
              />
            </div>
            
            <div style={{ marginBottom: 24 }}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>SYSTEM BIO (DIRECTIVE)</div>
              <textarea 
                className="field" 
                value={modal.bio} 
                onChange={e => setModal({ ...modal, bio: e.target.value })} 
                placeholder="Enter the core identity and behavioral instructions..." 
                style={{ minHeight: 120, resize: "vertical", paddingTop: 12, paddingBottom: 12 }} 
              />
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button className="btn-g" onClick={() => setModal({ ...modal, open: false })}>Cancel</button>
              <button className="btn-p" onClick={handleSave} disabled={!modal.name.trim()}>Save Persona</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
