import React, { useState } from 'react';
import { I } from '../../components/Icon';

const INITIAL_ITEMS = [
  { id: 1, name: "Elon Reply Optimizer", author: "shadow_dev", downloads: 12400, rating: 4.8, type: "Workflow", c: "var(--cyan)" },
  { id: 2, name: "LinkedIn Viral Formula", author: "growth_hq", downloads: 8900, rating: 4.6, type: "Template", c: "#0d9488" },
  { id: 3, name: "Reddit Karma Engine", author: "phantom_x", downloads: 6200, rating: 4.3, type: "Persona", c: "#ff4500" },
  { id: 4, name: "Thread Unroller Pro", author: "node_alpha", downloads: 15800, rating: 4.9, type: "Workflow", c: "var(--cyan)" },
  { id: 5, name: "Contrarian Take Generator", author: "ghost_lab", downloads: 3400, rating: 4.1, type: "Template", c: "#0d9488" },
  { id: 6, name: "Discord Alpha Bot", author: "signal_forge", downloads: 7600, rating: 4.5, type: "Persona", c: "#5865f2" },
];

export function Marketplace({ nav }: { nav: (path: string) => void }) {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [modal, setModal] = useState({ open: false, name: "", type: "Workflow" });

  const handleSave = () => {
    if (!modal.name.trim()) return;
    const newItem = {
      id: Date.now(),
      name: modal.name.trim(),
      author: "you (operator)",
      downloads: 0,
      rating: 0.0,
      type: modal.type,
      c: modal.type === "Workflow" ? "var(--cyan)" : modal.type === "Template" ? "#0d9488" : "#ff4500"
    };
    setItems([newItem, ...items]);
    setModal({ ...modal, open: false });
  };

  return (
    <div className="enter">
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 className="h-md"><span className="grad-c">Marketplace</span></h1>
          <p style={{ color: "var(--txt2)", fontSize: 13.5, marginTop: 4 }}>Community workflows, personas & templates</p>
        </div>
        <button className="btn-p" onClick={() => setModal({ open: true, name: "", type: "Workflow" })}><I n="publish" s={15} /> Publish</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {items.map((item) => (
          <div key={item.id} className="card-out hover-glow">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span className="chip" style={{ background: `${item.c}15`, color: item.c, border: `1px solid ${item.c}2e`, fontSize: 10 }}>{item.type}</span>
              <span className="mono txt-2" style={{ fontSize: 10 }}>⭐ {item.rating}</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.name}</div>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 14 }}>by {item.author}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="mono txt-2" style={{ fontSize: 10 }}>{item.downloads.toLocaleString()} downloads</span>
              <button className="btn-g btn-sm"><I n="download" s={12} /> Install</button>
            </div>
          </div>
        ))}
      </div>

      {/* Publish Modal */}
      {modal.open && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div className="glass" style={{ width: "100%", maxWidth: 400, padding: 24, display: "flex", flexDirection: "column" }}>
            <h2 className="h-md" style={{ marginBottom: 20 }}>Publish to Marketplace</h2>
            
            <div style={{ marginBottom: 16 }}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>ASSET NAME</div>
              <input 
                className="field" 
                value={modal.name} 
                onChange={e => setModal({ ...modal, name: e.target.value })} 
                placeholder="e.g. Ultimate Crypto Workflow" 
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>ASSET TYPE</div>
              <div style={{ display: "flex", gap: 8 }}>
                {["Workflow", "Template", "Persona"].map(t => (
                  <button 
                    key={t}
                    className="btn-g btn-sm" 
                    onClick={() => setModal({ ...modal, type: t })}
                    style={{ 
                      flex: 1, 
                      justifyContent: "center",
                      borderColor: modal.type === t ? "var(--cyan)" : "var(--border)",
                      background: modal.type === t ? "rgba(5,150,105,0.1)" : "transparent"
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button className="btn-g" onClick={() => setModal({ ...modal, open: false })}>Cancel</button>
              <button className="btn-p" onClick={handleSave} disabled={!modal.name.trim()}><I n="publish" s={13} /> Publish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
