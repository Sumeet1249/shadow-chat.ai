import React, { useState } from 'react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { I } from '../components/Icon';

export function Register({ nav }: { nav: (path: string) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (provider: string) => {
    setToast(`${provider} authentication coming soon!`);
    setTimeout(() => setToast(""), 2500);
  };

  const handle = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      nav("dashboard");
    }, 1800);
  };

  return (
    <>
      <div className="login-grid scan enter">
        <ParticleCanvas density={0.4} />
        {/* Left panel */}
        <div className="login-left">
          <div className="orb fl1" style={{ width: 380, height: 380, top: -60, left: -80, background: "radial-gradient(circle,rgba(5,150,105,.08),transparent 70%)" }} />
          <div className="orb fl2" style={{ width: 350, height: 350, bottom: -80, right: -50, background: "radial-gradient(circle,rgba(16,185,129,.1),transparent 70%)" }} />
          <div style={{ position: "relative", textAlign: "left", padding: "0 72px", zIndex: 1, width: "100%", maxWidth: 540 }}>
            <div style={{ marginBottom: 36 }}>
              <svg width="260" height="190" viewBox="0 0 260 190" style={{ overflow: "visible" }}>
                {[[130, 95], [72, 45], [188, 45], [55, 145], [205, 145], [130, 170], [95, 122], [165, 122]].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r={i === 0 ? 11 : 5} fill={i === 0 ? "rgba(5,150,105,.2)" : "rgba(16,185,129,.12)"} stroke={i === 0 ? "rgba(5,150,105,.6)" : "rgba(16,185,129,.4)"} strokeWidth="1" />
                    <circle cx={x} cy={y} r={i === 0 ? 20 : 9} fill="none" stroke={i === 0 ? "rgba(5,150,105,.1)" : "rgba(16,185,129,.06)"} strokeWidth="1" />
                  </g>
                ))}
                {[[0, 1], [0, 2], [0, 6], [0, 7], [1, 3], [2, 4], [3, 5], [4, 5], [6, 3], [7, 4], [1, 6], [2, 7]].map(([a, b], i) => {
                  const N = [[130, 95], [72, 45], [188, 45], [55, 145], [205, 145], [130, 170], [95, 122], [165, 122]];
                  return <line key={i} x1={N[a][0]} y1={N[a][1]} x2={N[b][0]} y2={N[b][1]} stroke="rgba(5,150,105,.12)" strokeWidth="1" />;
                })}
                <circle cx="130" cy="95" r="38" fill="none" stroke="rgba(5,150,105,.04)" strokeWidth="28" />
              </svg>
            </div>
            <h2 className="h-lg grad-c" style={{ marginBottom: 14 }}>Join the Shadow</h2>
            <p style={{ color: "var(--txt2)", fontSize: 15, lineHeight: 1.75, maxWidth: 380 }}>
              Deploy your first AI persona in minutes. Free tier — no credit card required. Full access to neural command center.
            </p>
            <div style={{ marginTop: 44, display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start", maxWidth: 320 }}>
              {["Free tier — no card required", "12 active AI personas included", "End-to-end encrypted operations"].map((it, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <div className="icon-box" style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(5,150,105,.08)", border: "1px solid rgba(5,150,105,.2)" }}>
                    <I n="check" s={12} c="var(--cyan)" />
                  </div>
                  <span className="mono" style={{ color: "var(--txt2)", fontSize: 11.5, letterSpacing: ".02em" }}>{it}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 44 }}>
              <div className="chip chip-g" style={{ display: "inline-flex" }}><div className="dot" />FREE TIER AVAILABLE</div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="login-right" style={{ zIndex: 1, overflowY: "auto", justifyContent: "flex-start" }}>
          <button className="btn-g btn-sm" onClick={() => nav("landing")} style={{ position: "absolute", top: 28, left: 36, zIndex: 10 }}>
            <I n="arrow_back" s={13} />Back
          </button>
          <div style={{ margin: "auto 0", width: "100%", maxWidth: 370, padding: "80px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 44 }}>
              <div style={{ width: 38, height: 38, borderRadius: 9, background: "linear-gradient(135deg,#059669,#10b981)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 22px rgba(5,150,105,.2)" }}>
                <I n="psychology" s={19} c="#fff" />
              </div>
              <span style={{ fontFamily: "var(--ff-disp)", fontWeight: 800, fontSize: 20, letterSpacing: "-.02em", color: "var(--txt)" }}>SHADOW CHATS</span>
            </div>
            <div style={{ width: "100%" }}>
              <div className="h-md" style={{ marginBottom: 6, color: "var(--txt)" }}>Create your node</div>
              <p style={{ color: "var(--txt2)", fontSize: 13.5, marginBottom: 32 }}>
                Register your operator identity and activate your neural command center.
              </p>

              {/* OAuth */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 26 }}>
                {[["🔵", "Google"], ["⬛", "GitHub"]].map(([ico, lbl], i) => (
                  <button key={i} className="btn-g" style={{ fontSize: 12, padding: "9px 10px", justifyContent: "center" }} onClick={() => showToast(lbl as string)}>
                    <span style={{ fontSize: 15 }}>{ico}</span><span style={{ fontSize: 11 }}>{lbl}</span>
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                <span className="mono txt-2" style={{ whiteSpace: "nowrap", fontSize: 10 }}>OR REGISTER WITH</span>
                <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              </div>

              {/* Fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
                <div>
                  <div className="mono txt-2" style={{ marginBottom: 6, fontSize: 10 }}>USERNAME</div>
                  <input className="field" type="text" placeholder="your name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                  <div className="mono txt-2" style={{ marginBottom: 6, fontSize: 10 }}>EMAIL</div>
                  <input className="field" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                  <div className="mono txt-2" style={{ marginBottom: 6, fontSize: 10 }}>PASSWORD</div>
                  <input className="field" type="password" placeholder="••••••••••••" value={pass} onChange={e => setPass(e.target.value)} />
                </div>
              </div>

              <button
                className="btn-p"
                style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: 14 }}
                onClick={handle}
                disabled={loading}
              >
                {loading ? <><span className="spinner" />Activating Node...</> : <><I n="bolt" s={15} />Activate Node</>}
              </button>

              <div style={{ textAlign: "center", marginTop: 22 }}>
                <span className="mono txt-2" style={{ fontSize: 11.5 }}>
                  Already an operator? <span className="txt-c" style={{ cursor: "pointer" }} onClick={() => nav("login")}>Access node →</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toast && <div style={{ position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#059669,#10b981)", color: "#fff", padding: "12px 28px", borderRadius: 999, fontFamily: "var(--ff-mono)", fontSize: 12, letterSpacing: ".02em", boxShadow: "0 8px 32px rgba(5,150,105,.3)", zIndex: 9999, animation: "enter .3s ease" }}>{toast}</div>}
    </>
  );
}
