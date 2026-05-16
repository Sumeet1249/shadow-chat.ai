import React, { useState } from 'react';
import { I } from '../../components/Icon';

const INITIAL_NODES = [
  { id: 1, n: "NODE-ALPHA", s: "active", pl: "Twitter", req: 1284, h: 99, uptime: "14d 6h", cpu: 42, mem: 67, region: "US-EAST" },
  { id: 2, n: "NODE-BETA", s: "active", pl: "LinkedIn", req: 445, h: 97, uptime: "14d 6h", cpu: 28, mem: 45, region: "EU-WEST" },
  { id: 3, n: "NODE-GAMMA", s: "idle", pl: "Reddit", req: 0, h: 100, uptime: "14d 6h", cpu: 2, mem: 12, region: "US-WEST" },
  { id: 4, n: "NODE-DELTA", s: "active", pl: "Discord", req: 893, h: 94, uptime: "8d 12h", cpu: 56, mem: 72, region: "ASIA-SE" },
  { id: 5, n: "NODE-EPSILON", s: "offline", pl: "Unassigned", req: 0, h: 0, uptime: "0d 0h", cpu: 0, mem: 0, region: "US-EAST" },
  { id: 6, n: "NODE-ZETA", s: "idle", pl: "Unassigned", req: 0, h: 100, uptime: "3d 2h", cpu: 1, mem: 8, region: "EU-WEST" },
];

export function NodeCommand({ nav }: { nav: (path: string) => void }) {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [modal, setModal] = useState({ open: false, n: "", region: "US-EAST", pl: "Unassigned" });

  const handleSave = () => {
    if (!modal.n.trim()) return;
    const newNode = {
      id: Date.now(),
      n: modal.n.trim().toUpperCase(),
      s: "active",
      pl: modal.pl,
      req: 0,
      h: 100,
      uptime: "0d 0h",
      cpu: Math.floor(Math.random() * 20) + 1,
      mem: Math.floor(Math.random() * 30) + 5,
      region: modal.region
    };
    setNodes([newNode, ...nodes]);
    setModal({ ...modal, open: false });
  };

  const handleRestart = (id: number) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, s: "active", h: 100, cpu: 5, mem: 10, uptime: "0d 0h" } : n));
  };

  return (
    <div className="enter">
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 className="h-md"><span className="grad-c">Node Command</span></h1>
          <p style={{ color: "var(--txt2)", fontSize: 13.5, marginTop: 4 }}>{nodes.filter(n => n.s === "active").length} active · {nodes.filter(n => n.s === "idle").length} idle · <span style={{ color: "var(--green)" }}>{nodes.length} total</span></p>
        </div>
        <button className="btn-p" onClick={() => setModal({ open: true, n: "", region: "US-EAST", pl: "Unassigned" })}><I n="add" s={15} /> Deploy Node</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {nodes.map((nd) => (
          <div key={nd.id} className="glass" style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: nd.s === "active" ? "var(--green)" : nd.s === "idle" ? "var(--amber)" : "var(--red)", boxShadow: nd.s === "active" ? "0 0 8px rgba(52,211,153,.5)" : "none" }} />
                <span className="mono" style={{ fontSize: 13, fontWeight: 700 }}>{nd.n}</span>
              </div>
              <span className={`chip ${nd.s === "active" ? "chip-g" : nd.s === "idle" ? "chip-a" : "chip-r"}`} style={{ fontSize: 9 }}>{nd.s.toUpperCase()}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
              {[{ l: "CPU", v: `${nd.cpu}%` }, { l: "MEM", v: `${nd.mem}%` }, { l: "HEALTH", v: `${nd.h}%` }].map((m, j) => (
                <div key={j}>
                  <div className="mono txt-2" style={{ fontSize: 9, marginBottom: 4 }}>{m.l}</div>
                  <div className="pt"><div className="pf" style={{ width: m.v, background: parseInt(m.v) > 80 ? "var(--amber)" : "var(--green)" }} /></div>
                  <div className="mono" style={{ fontSize: 10, marginTop: 3, color: "var(--txt2)" }}>{m.v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div className="mono txt-2" style={{ fontSize: 10 }}>{nd.pl} · {nd.region} · {nd.req} req</div>
              <div style={{ display: "flex", gap: 6 }}>
                <button 
                  className="btn-g btn-sm" 
                  onClick={() => setNodes(nodes.map(n => n.id === nd.id ? { ...n, s: n.s === 'active' ? 'idle' : 'active' } : n))} 
                  title={nd.s === 'active' ? "Pause Node" : "Activate Node"}
                >
                  <I n={nd.s === 'active' ? "pause" : "play_arrow"} s={12} />
                </button>
                <button className="btn-g btn-sm" onClick={() => handleRestart(nd.id)} title="Restart Node"><I n="restart_alt" s={12} /></button>
                <button className="btn-g btn-sm" onClick={() => setNodes(nodes.filter(n => n.id !== nd.id))} title="Terminate Node"><I n="delete" s={12} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deploy Node Modal */}
      {modal.open && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div className="glass" style={{ width: "100%", maxWidth: 460, padding: 24, display: "flex", flexDirection: "column" }}>
            <h2 className="h-md" style={{ marginBottom: 20 }}>Deploy New Node</h2>
            
            <div style={{ marginBottom: 16 }}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>NODE IDENTIFIER</div>
              <input 
                className="field mono" 
                value={modal.n} 
                onChange={e => setModal({ ...modal, n: e.target.value })} 
                placeholder="e.g. NODE-OMEGA" 
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              <div>
                <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>REGION</div>
                <select 
                  className="field" 
                  value={modal.region} 
                  onChange={e => setModal({ ...modal, region: e.target.value })}
                  style={{ cursor: "pointer" }}
                >
                  <option value="US-EAST">US-EAST</option>
                  <option value="US-WEST">US-WEST</option>
                  <option value="EU-WEST">EU-WEST</option>
                  <option value="ASIA-SE">ASIA-SE</option>
                </select>
              </div>
              <div>
                <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>PLATFORM ASSIGNMENT</div>
                <select 
                  className="field" 
                  value={modal.pl} 
                  onChange={e => setModal({ ...modal, pl: e.target.value })}
                  style={{ cursor: "pointer" }}
                >
                  <option value="Unassigned">Unassigned</option>
                  <option value="Twitter">Twitter</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Reddit">Reddit</option>
                  <option value="Discord">Discord</option>
                </select>
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button className="btn-g" onClick={() => setModal({ ...modal, open: false })}>Cancel</button>
              <button className="btn-p" onClick={handleSave} disabled={!modal.n.trim()}><I n="rocket_launch" s={13} /> Deploy Node</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
