import React, { useState } from 'react';
import { I } from '../../components/Icon';

const INITIAL_MEMBERS = [
  { id: 1, name: "Caleb_Shadow", role: "Owner", status: "online", nodes: 4, elo: 1847 },
  { id: 2, name: "NexusOps", role: "Admin", status: "online", nodes: 2, elo: 1623 },
  { id: 3, name: "PhantomRelay", role: "Member", status: "offline", nodes: 1, elo: 1456 },
  { id: 4, name: "GhostNode_7", role: "Member", status: "online", nodes: 3, elo: 1589 },
];

export function Syndicate({ nav }: { nav: (path: string) => void }) {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [modal, setModal] = useState({ open: false, email: "", role: "Member" });

  const handleSave = () => {
    if (!modal.email.trim()) return;
    const newName = modal.email.split('@')[0];
    const newMember = {
      id: Date.now(),
      name: newName,
      role: modal.role,
      status: "offline",
      nodes: 0,
      elo: 1000
    };
    setMembers([newMember, ...members]);
    setModal({ ...modal, open: false });
  };

  return (
    <div className="enter">
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 className="h-md"><span className="grad-c">Syndicate</span></h1>
          <p style={{ color: "var(--txt2)", fontSize: 13.5, marginTop: 4 }}>Team management & collaboration</p>
        </div>
        <button className="btn-p" onClick={() => setModal({ open: true, email: "", role: "Member" })}><I n="person_add" s={15} /> Invite</button>
      </div>
      <div className="glass" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Member", "Role", "Status", "Nodes", "ELO", "Actions"].map(h => (
                <th key={h} className="mono txt-2" style={{ fontSize: 10, padding: "14px 20px", textAlign: "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "14px 20px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#10b981,#059669)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "var(--txt)", fontSize: 12 }}>{m.name[0]}</div>
                    <span style={{ fontWeight: 600 }}>{m.name}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 20px" }}><span className={`chip ${m.role === "Owner" ? "chip-a" : m.role === "Admin" ? "chip-v" : "chip-c"}`} style={{ fontSize: 10 }}>{m.role}</span></td>
                <td style={{ padding: "14px 20px" }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: m.status === "online" ? "var(--green)" : "var(--txt3)" }} /><span className="mono txt-2" style={{ fontSize: 11 }}>{m.status}</span></div></td>
                <td style={{ padding: "14px 20px" }} className="mono">{m.nodes}</td>
                <td style={{ padding: "14px 20px", fontFamily: "var(--ff-disp)", fontWeight: 700 }}>{m.elo}</td>
                <td style={{ padding: "14px 20px" }}><button className="btn-g btn-sm"><I n="more_horiz" s={14} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {modal.open && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div className="glass" style={{ width: "100%", maxWidth: 400, padding: 24, display: "flex", flexDirection: "column" }}>
            <h2 className="h-md" style={{ marginBottom: 20 }}>Invite to Syndicate</h2>
            
            <div style={{ marginBottom: 16 }}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>OPERATOR EMAIL OR USERNAME</div>
              <input 
                className="field" 
                value={modal.email} 
                onChange={e => setModal({ ...modal, email: e.target.value })} 
                placeholder="e.g. shadow_operative@node.ai" 
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>ACCESS ROLE</div>
              <div style={{ display: "flex", gap: 8 }}>
                {["Admin", "Member", "Observer"].map(r => (
                  <button 
                    key={r}
                    className="btn-g btn-sm" 
                    onClick={() => setModal({ ...modal, role: r })}
                    style={{ 
                      flex: 1, 
                      justifyContent: "center",
                      borderColor: modal.role === r ? "var(--cyan)" : "var(--border)",
                      background: modal.role === r ? "rgba(5,150,105,0.1)" : "transparent"
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button className="btn-g" onClick={() => setModal({ ...modal, open: false })}>Cancel</button>
              <button className="btn-p" onClick={handleSave} disabled={!modal.email.trim()}><I n="send" s={13} /> Send Invite</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
