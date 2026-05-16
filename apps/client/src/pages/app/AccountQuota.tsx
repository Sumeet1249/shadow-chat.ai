import React, { useState } from 'react';
import { I } from '../../components/Icon';

export function AccountQuota({ nav }: { nav: (path: string) => void }) {
  const [profile, setProfile] = useState({ name: "Caleb_Shadow", email: "caleb@shadownode.ai" });
  const [modal, setModal] = useState({ open: false, name: "", email: "" });

  const handleEdit = () => {
    setModal({ open: true, name: profile.name, email: profile.email });
  };

  const handleSave = () => {
    if (!modal.name.trim() || !modal.email.trim()) return;
    setProfile({ name: modal.name.trim(), email: modal.email.trim() });
    setModal({ ...modal, open: false });
  };
  return (
    <div className="enter">
      <div style={{ marginBottom: 28 }}>
        <h1 className="h-md"><span className="grad-c">Account</span></h1>
        <p style={{ color: "var(--txt2)", fontSize: 13.5, marginTop: 4 }}>Profile & usage quota</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20 }}>
        {/* Profile Card */}
        <div className="glass" style={{ padding: "28px", textAlign: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#10b981,#059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: "var(--txt)", margin: "0 auto 16px", boxShadow: "0 0 24px rgba(5,150,105,.25)" }}>{profile.name[0]?.toUpperCase() || "?"}</div>
          <div style={{ fontFamily: "var(--ff-disp)", fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{profile.name}</div>
          <div className="mono txt-a" style={{ fontSize: 11, marginBottom: 16 }}>ELITE TIER</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "left" }}>
            {[{ l: "Email", v: profile.email }, { l: "Member Since", v: "Jan 2026" }, { l: "Plan", v: "Elite ($49/mo)" }].map((f, i) => (
              <div key={i} style={{ padding: "10px 14px", background: "rgba(5,150,105,.03)", border: "1px solid var(--border)", borderRadius: "var(--r-md)" }}>
                <div className="mono txt-2" style={{ fontSize: 9, marginBottom: 2 }}>{f.l}</div>
                <div style={{ fontSize: 13 }}>{f.v}</div>
              </div>
            ))}
          </div>
          <button className="btn-g" style={{ marginTop: 16, width: "100%" }} onClick={handleEdit}><I n="edit" s={14} /> Edit Profile</button>
        </div>
        {/* Quota */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="mono txt-2" style={{ fontSize: 10 }}>USAGE QUOTA</div>
          {[
            { label: "API Calls", used: 8420, limit: 15000, c: "var(--cyan)" },
            { label: "Tokens", used: 89420, limit: 150000, c: "#0d9488" },
            { label: "Generations", used: 284, limit: 500, c: "var(--amber)" },
            { label: "Storage", used: 2.4, limit: 5, unit: "GB", c: "var(--green)" },
          ].map((q, i) => {
            const pct = Math.round((q.used / q.limit) * 100);
            return (
              <div key={i} className="glass" style={{ padding: "18px 22px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{q.label}</span>
                  <span className="mono" style={{ fontSize: 11, color: pct > 80 ? "var(--amber)" : "var(--green)" }}>{pct}%</span>
                </div>
                <div className="pt" style={{ marginBottom: 6, height: 6 }}>
                  <div className="pf" style={{ width: `${pct}%`, background: q.c }} />
                </div>
                <div className="mono txt-2" style={{ fontSize: 10 }}>{q.used.toLocaleString()}{q.unit ? q.unit : ""} / {q.limit.toLocaleString()}{q.unit ? q.unit : ""}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {modal.open && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div className="glass" style={{ width: "100%", maxWidth: 400, padding: 24, display: "flex", flexDirection: "column" }}>
            <h2 className="h-md" style={{ marginBottom: 20 }}>Edit Profile</h2>
            
            <div style={{ marginBottom: 16 }}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>USERNAME</div>
              <input 
                className="field" 
                value={modal.name} 
                onChange={e => setModal({ ...modal, name: e.target.value })} 
                placeholder="e.g. shadow_operator" 
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>EMAIL ADDRESS</div>
              <input 
                className="field" 
                type="email"
                value={modal.email} 
                onChange={e => setModal({ ...modal, email: e.target.value })} 
                placeholder="e.g. operator@node.ai" 
              />
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button className="btn-g" onClick={() => setModal({ ...modal, open: false })}>Cancel</button>
              <button className="btn-p" onClick={handleSave} disabled={!modal.name.trim() || !modal.email.trim()}><I n="save" s={13} /> Save Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
