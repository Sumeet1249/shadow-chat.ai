import React, { useState } from 'react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { I } from '../components/Icon';

export function Login({ nav }: { nav: (path: string) => void }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handle = () => { 
      setLoading(true); 
      setTimeout(() => { 
          setLoading(false); 
          nav("dashboard"); 
      }, 1600); 
  };
  
  return (
    <div className="login-grid scan enter">
      <ParticleCanvas density={0.4} />
      {/* Left panel */}
      <div className="login-left">
        <div className="orb fl1" style={{ width: 380, height: 380, top: -60, left: -80, background: "radial-gradient(circle,rgba(0,229,255,.1),transparent 70%)" }} />
        <div className="orb fl2" style={{ width: 350, height: 350, bottom: -80, right: -50, background: "radial-gradient(circle,rgba(124,58,237,.12),transparent 70%)" }} />
        <div style={{ position: "relative", textAlign: "center", padding: "0 72px", zIndex: 1 }}>
          <div style={{ marginBottom: 36 }}>
            <svg width="260" height="190" viewBox="0 0 260 190" style={{ overflow: "visible" }}>
              {[[130,95],[72,45],[188,45],[55,145],[205,145],[130,170],[95,122],[165,122]].map(([x,y],i)=>(
                <g key={i}>
                  <circle cx={x} cy={y} r={i===0?11:5} fill={i===0?"rgba(0,229,255,.28)":"rgba(124,58,237,.18)"} stroke={i===0?"rgba(0,229,255,.8)":"rgba(124,58,237,.5)"} strokeWidth="1"/>
                  <circle cx={x} cy={y} r={i===0?20:9} fill="none" stroke={i===0?"rgba(0,229,255,.1)":"rgba(124,58,237,.08)"} strokeWidth="1"/>
                </g>
              ))}
              {[[0,1],[0,2],[0,6],[0,7],[1,3],[2,4],[3,5],[4,5],[6,3],[7,4],[1,6],[2,7]].map(([a,b],i)=>{
                const N=[[130,95],[72,45],[188,45],[55,145],[205,145],[130,170],[95,122],[165,122]];
                return <line key={i} x1={N[a][0]} y1={N[a][1]} x2={N[b][0]} y2={N[b][1]} stroke="rgba(0,229,255,.14)" strokeWidth="1"/>;
              })}
              <circle cx="130" cy="95" r="38" fill="none" stroke="rgba(0,229,255,.04)" strokeWidth="28"/>
            </svg>
          </div>
          <h2 className="h-lg grad-c" style={{ marginBottom: 14 }}>The Node Awaits</h2>
          <p style={{ color: "var(--txt2)", fontSize: 15, lineHeight: 1.75, maxWidth: 360, margin: "0 auto" }}>
            Your AI shadow is standing by. Authenticate to resume neural operations across all active channels.
          </p>
          <div style={{ marginTop: 44, display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start", maxWidth: 300, margin: "44px auto 0" }}>
            {["Neural Persona Engine — 12 active identities","Zero-latency reply generation","End-to-end encrypted operations"].map((it,i)=>(
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <div className="icon-box" style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(0,229,255,.1)", border: "1px solid rgba(0,229,255,.3)" }}>
                  <I n="check" s={12} c="var(--cyan)" />
                </div>
                <span className="mono" style={{ color: "var(--txt2)", fontSize: 11.5, letterSpacing: ".02em" }}>{it}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 28, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <div className="chip chip-g"><div className="dot" />ALL SYSTEMS OPERATIONAL</div>
        </div>
      </div>
      {/* Right panel */}
      <div className="login-right" style={{ zIndex: 1 }}>
        <button className="btn-g btn-sm" onClick={() => nav("landing")} style={{ position: "absolute", top: 28, left: 36 }}>
          <I n="arrow_back" s={13} />Back
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 44 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: "linear-gradient(135deg,#00e5ff,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 22px rgba(0,229,255,.32)" }}>
            <I n="psychology" s={19} c="#fff" />
          </div>
          <span style={{ fontFamily: "var(--ff-disp)", fontWeight: 800, fontSize: 20, letterSpacing: "-.02em" }}>SHADOW NODE</span>
        </div>
        <div style={{ width: "100%", maxWidth: 370 }}>
          <div className="h-md" style={{ marginBottom: 6 }}>Welcome back</div>
          <p style={{ color: "var(--txt2)", fontSize: 13.5, marginBottom: 32 }}>Enter your credentials to access the neural command center.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 26 }}>
            {[["🔵","Google"],["⬛","GitHub"]].map(([ico,lbl],i)=>(
              <button key={i} className="btn-g" style={{ fontSize: 12, padding: "9px 10px", justifyContent: "center" }}>
                <span style={{ fontSize: 15 }}>{ico}</span><span style={{ fontSize: 11 }}>{lbl}</span>
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span className="mono txt-2" style={{ whiteSpace: "nowrap", fontSize: 10 }}>OR CONTINUE WITH</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
            <div>
              <div className="mono txt-2" style={{ marginBottom: 6, fontSize: 10 }}>NODE IDENTIFIER</div>
              <input className="field" type="email" placeholder="operator@shadownode.ai" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div>
              <div className="mono txt-2" style={{ marginBottom: 6, fontSize: 10 }}>ACCESS CIPHER</div>
              <input className="field" type="password" placeholder="••••••••••••" value={pass} onChange={e=>setPass(e.target.value)} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
            <span className="mono txt-c" style={{ fontSize: 11.5, cursor: "pointer" }}>Forgot cipher?</span>
          </div>
          <button className="btn-p" style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: 14 }} onClick={handle} disabled={loading}>
            {loading ? <><span className="spinner" />Authenticating...</> : <><I n="lock_open" s={15} />Access Node</>}
          </button>
          <div style={{ textAlign: "center", marginTop: 22 }}>
            <span className="mono txt-2" style={{ fontSize: 11.5 }}>New operator? <span className="txt-c" style={{ cursor: "pointer" }} onClick={() => nav("register")}>Register node →</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
