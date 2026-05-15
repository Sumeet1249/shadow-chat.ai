import React, { useState, useEffect } from 'react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { I } from '../components/Icon';

export function Landing({ nav }: { nav: (path: string) => void }) {
  const [typed, setTyped] = useState("");
  const full = "Your AI Reply Shadow";
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => { setTyped(full.slice(0, ++i)); if (i >= full.length) clearInterval(t); }, 55);
    return () => clearInterval(t);
  }, []);

  const features = [
    { em: "🧠", t: "Neural Persona Engine", d: "Configure AI identities that mirror your voice with surgical precision across every platform you operate.", tag: "INTELLIGENCE" },
    { em: "⚡", t: "Zero-Latency Generation", d: "Context-aware replies streamed in under 200ms. Fastest neural inference in the stack.", tag: "SPEED" },
    { em: "🔐", t: "Shadow Architecture", d: "End-to-end encrypted operations. Your prompts, personas, and outputs remain clandestine.", tag: "SECURITY" },
    { em: "🌐", t: "Multi-Platform Sync", d: "One command center for Twitter, LinkedIn, Reddit, Discord, and email — fully synchronized.", tag: "REACH" },
    { em: "📊", t: "Neural Analytics", d: "Measure engagement, A/B test reply tones, and optimize strategy with ML-backed telemetry.", tag: "DATA" },
    { em: "🎭", t: "The Arena", d: "Run live AI model battles. Compare outputs side-by-side and crown the optimal response.", tag: "COMPETITIVE" },
  ];

  return (
    <div style={{ background: "var(--void)", minHeight: "100vh", position: "relative" }} className="scan">
      <ParticleCanvas density={0.65} />
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div className="orb fl1" style={{ width: 580, height: 580, top: -80, left: -120, background: "radial-gradient(circle,rgba(0,229,255,.13),transparent 70%)" }} />
        <div className="orb fl2" style={{ width: 480, height: 480, bottom: -60, right: -80, background: "radial-gradient(circle,rgba(124,58,237,.14),transparent 70%)" }} />
        <div className="orb fl3" style={{ width: 280, height: 280, top: "38%", right: "22%", background: "radial-gradient(circle,rgba(245,158,11,.08),transparent 70%)" }} />
      </div>

      {/* Nav */}
      <nav className="lnav" style={{ zIndex: 300 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: "linear-gradient(135deg,#00e5ff,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 18px rgba(0,229,255,.35)" }}>
            <I n="psychology" s={15} c="#fff" />
          </div>
          <span style={{ fontFamily: "var(--ff-disp)", fontWeight: 800, fontSize: 17, letterSpacing: "-.02em" }}>SHADOW NODE</span>
        </div>
        <div style={{ display: "flex", gap: 32, fontFamily: "var(--ff-mono)", fontSize: 11.5, letterSpacing: ".05em", color: "var(--txt2)" }}>
          {["FEATURES", "PRICING", "DOCS", "CHANGELOG"].map(l => (
            <span key={l} className="lnav-link">{l}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-g btn-sm" onClick={() => nav("login")}>Login</button>
          <button className="btn-p btn-sm" onClick={() => nav("register")}>Get Access →</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero enter" style={{ zIndex: 1 }}>
        <div style={{ textAlign: "center", maxWidth: 920, position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
            <div className="chip chip-c" style={{ padding: "6px 16px" }}>
              <div className="dot" /><span>NEURAL CORE v2.4.1 — NOW ACTIVE</span>
            </div>
          </div>
          <h1 className="h-xl grad-c glow-c" style={{ marginBottom: 20 }}>
            The Shadow<br />that Replies
          </h1>
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: 17, color: "var(--txt2)", marginBottom: 36, minHeight: 26 }}>
            <span style={{ color: "var(--txt3)" }}>// </span>{typed}<span className="blink txt-c">_</span>
          </div>
          <p style={{ fontFamily: "var(--ff-body)", fontSize: 17, color: "var(--txt2)", maxWidth: 620, margin: "0 auto 44px", lineHeight: 1.75 }}>
            Shadow Node is the neural layer between you and every conversation. Configure AI personas, generate tactically superior replies, and operate across all platforms from one clandestine command center.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 72 }}>
            <button className="btn-p" onClick={() => nav("register")} style={{ padding: "14px 34px", fontSize: 15 }}>
              <I n="bolt" s={16} />Activate Node
            </button>
            <button className="btn-g" style={{ padding: "14px 28px", fontSize: 15 }}>
              <I n="play_circle" s={16} />Watch Demo
            </button>
          </div>
          <div className="stats-row">
            {[["2.4M+", "REPLIES GENERATED"], null, ["98.7%", "UPTIME SLA"], null, ["<180ms", "AVG LATENCY"], null, ["47K+", "ACTIVE NODES"]].map((s, i) =>
              s === null
                ? <div key={i} style={{ width: 1, height: 38, background: "var(--border)" }} />
                : <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--ff-disp)", fontWeight: 800, fontSize: 26, color: "var(--cyan)", letterSpacing: "-.02em" }}>{s[0]}</div>
                    <div className="mono txt-2" style={{ fontSize: 10, marginTop: 2 }}>{s[1]}</div>
                  </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "60px 80px 100px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="chip chip-v" style={{ marginBottom: 14 }}>TACTICAL ADVANTAGES</div>
            <h2 className="h-lg" style={{ marginBottom: 14 }}>
              Built for the <span className="grad-c">Operator Mindset</span>
            </h2>
            <p style={{ color: "var(--txt2)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
              Every feature engineered for precision, speed, and strategic advantage in the attention economy.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {features.map((f, i) => (
              <div key={i} className="feat-card">
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                  <div className="icon-box" style={{ width: 44, height: 44, background: "rgba(0,229,255,.07)", border: "1px solid var(--border)", fontSize: 22 }}>{f.em}</div>
                  <span className="chip chip-c">{f.tag}</span>
                </div>
                <div className="h-sm" style={{ marginBottom: 8 }}>{f.t}</div>
                <p style={{ color: "var(--txt2)", fontSize: 13.5, lineHeight: 1.7 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 80px 100px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", background: "linear-gradient(135deg,rgba(0,229,255,.05),rgba(124,58,237,.08))", border: "1px solid var(--border2)", borderRadius: 22, padding: "56px 72px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
          <div className="orb" style={{ width: 280, height: 280, top: -80, right: -40, background: "radial-gradient(circle,rgba(0,229,255,.08),transparent 70%)" }} />
          <div>
            <h2 className="h-md" style={{ marginBottom: 10 }}>Ready to go <span className="txt-c glow-c">dark?</span></h2>
            <p style={{ color: "var(--txt2)", maxWidth: 420, lineHeight: 1.7 }}>Join 47,000+ operators running the Shadow Node. Free tier available — no card required.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexShrink: 0, position: "relative", zIndex: 1 }}>
            <button className="btn-a" onClick={() => nav("register")} style={{ padding: "13px 30px" }}><I n="rocket_launch" s={16} />Start Free</button>
            <button className="btn-g" style={{ padding: "13px 22px" }}>View Pricing</button>
          </div>
        </div>
      </section>
    </div>
  );
}
