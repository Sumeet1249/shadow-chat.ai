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
        <div className="orb fl1" style={{ width: 580, height: 580, top: -80, left: -120, background: "radial-gradient(circle,rgba(5,150,105,.1),transparent 70%)" }} />
        <div className="orb fl2" style={{ width: 480, height: 480, bottom: -60, right: -80, background: "radial-gradient(circle,rgba(16,185,129,.08),transparent 70%)" }} />
        <div className="orb fl3" style={{ width: 280, height: 280, top: "38%", right: "22%", background: "radial-gradient(circle,rgba(13,148,136,.06),transparent 70%)" }} />
      </div>

      {/* Nav */}
      <nav className="lnav" style={{ zIndex: 300 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: "linear-gradient(135deg,#059669,#10b981)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 18px rgba(5,150,105,.2)" }}>
            <I n="psychology" s={15} c="#fff" />
          </div>
          <span style={{ fontFamily: "var(--ff-disp)", fontWeight: 800, fontSize: 17, letterSpacing: "-.02em", color: "var(--txt)" }}>SHADOW CHATS</span>
        </div>
        <div style={{ display: "flex", gap: 32, fontFamily: "var(--ff-mono)", fontSize: 11.5, letterSpacing: ".05em", color: "var(--txt2)" }}>
          {["FEATURES", "PRICING", "DOCS", "CHANGELOG"].map(l => (
            <span key={l} className="lnav-link" onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth", block: "start" })}>{l}</span>
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
          <h1 className="h-xl" style={{ marginBottom: 20, color: "var(--txt)" }}>
            The Shadow<br />that <span className="grad-c">Replies</span>
          </h1>
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: 17, color: "var(--txt2)", marginBottom: 36, minHeight: 26 }}>
            <span style={{ color: "var(--txt3)" }}>// </span>{typed}<span className="blink txt-c">_</span>
          </div>
          <p style={{ fontFamily: "var(--ff-body)", fontSize: 17, color: "var(--txt2)", maxWidth: 620, margin: "0 auto 44px", lineHeight: 1.75 }}>
            Shadow Chats is the neural layer between you and every conversation. Configure AI personas, generate tactically superior replies, and operate across all platforms from one clandestine command center.
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
      <section id="features" style={{ padding: "60px 80px 100px", position: "relative", zIndex: 1, scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="chip chip-v" style={{ marginBottom: 14 }}>TACTICAL ADVANTAGES</div>
            <h2 className="h-lg" style={{ marginBottom: 14, color: "var(--txt)" }}>
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
                  <div className="icon-box" style={{ width: 44, height: 44, background: "rgba(5,150,105,.06)", border: "1px solid var(--border)", fontSize: 22 }}>{f.em}</div>
                  <span className="chip chip-c">{f.tag}</span>
                </div>
                <div className="h-sm" style={{ marginBottom: 8, color: "var(--txt)" }}>{f.t}</div>
                <p style={{ color: "var(--txt2)", fontSize: 13.5, lineHeight: 1.7 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: "60px 80px 100px", position: "relative", zIndex: 1, scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="chip chip-a" style={{ marginBottom: 14 }}>PRICING</div>
            <h2 className="h-lg" style={{ marginBottom: 14, color: "var(--txt)" }}>Choose Your <span className="grad-c">Tier</span></h2>
            <p style={{ color: "var(--txt2)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>Scale your shadow operations with a plan that fits your mission.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { tier: "RECON", price: "Free", features: ["3 Personas", "500 generations/mo", "2 Platforms", "Basic analytics", "Community support"], c: "var(--txt2)", popular: false },
              { tier: "OPERATOR", price: "$29", features: ["10 Personas", "5,000 generations/mo", "All Platforms", "Advanced analytics", "Priority support", "Arena access", "Workflow automation"], c: "var(--cyan)", popular: true },
              { tier: "ELITE", price: "$49", features: ["Unlimited Personas", "Unlimited generations", "All Platforms", "Neural analytics", "Dedicated support", "Custom models", "API access", "Syndicate tools"], c: "var(--amber)", popular: false },
            ].map((p, i) => (
              <div key={i} className="feat-card" style={{ padding: 32, border: p.popular ? "1px solid rgba(5,150,105,.3)" : undefined, boxShadow: p.popular ? "0 0 40px rgba(5,150,105,.06)" : undefined, position: "relative" }}>
                {p.popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)" }}><span className="chip chip-c">MOST POPULAR</span></div>}
                <div className="mono" style={{ fontSize: 11, color: p.c, marginBottom: 8 }}>{p.tier}</div>
                <div style={{ fontFamily: "var(--ff-disp)", fontWeight: 800, fontSize: 42, letterSpacing: "-.03em", marginBottom: 4, color: "var(--txt)" }}>{p.price}</div>
                <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 24 }}>{p.price === "Free" ? "forever" : "/month"}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13.5, color: "var(--txt2)" }}>
                      <I n="check" s={14} c={p.c} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <button className={p.popular ? "btn-p" : "btn-g"} style={{ width: "100%", justifyContent: "center" }} onClick={() => nav("register")}>{p.price === "Free" ? "Start Free" : "Get Started"}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Docs */}
      <section id="docs" style={{ padding: "60px 80px 100px", position: "relative", zIndex: 1, scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="chip chip-v" style={{ marginBottom: 14 }}>DOCUMENTATION</div>
            <h2 className="h-lg" style={{ marginBottom: 14, color: "var(--txt)" }}>Quick Start <span className="grad-c">Guides</span></h2>
            <p style={{ color: "var(--txt2)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>Everything you need to deploy your first shadow node in under 5 minutes.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { icon: "rocket_launch", title: "Getting Started", desc: "Set up your first persona and generate your initial reply in under 5 minutes.", tag: "BEGINNER" },
              { icon: "psychology", title: "Persona Design", desc: "Deep dive into crafting high-performing personas with advanced tone calibration.", tag: "INTERMEDIATE" },
              { icon: "account_tree", title: "Workflow Automation", desc: "Build scheduled workflows that operate autonomously across multiple platforms.", tag: "ADVANCED" },
              { icon: "key", title: "API Reference", desc: "Full endpoint documentation, authentication guides, and SDK examples for developers.", tag: "DEVELOPER" },
              { icon: "sports_esports", title: "Arena Guide", desc: "Master competitive engagement patterns and optimize your node's response strategy.", tag: "STRATEGY" },
              { icon: "shield", title: "Security & Privacy", desc: "Learn how Shadow Chats protects your data and ensures compliant operations.", tag: "TRUST" },
            ].map((d, i) => (
              <div key={i} className="feat-card" style={{ cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                  <div className="icon-box" style={{ width: 44, height: 44, background: "rgba(5,150,105,.06)", border: "1px solid rgba(5,150,105,.15)" }}>
                    <I n={d.icon} s={20} c="#059669" />
                  </div>
                  <span className="chip chip-c">{d.tag}</span>
                </div>
                <div className="h-sm" style={{ marginBottom: 8, color: "var(--txt)" }}>{d.title}</div>
                <p style={{ color: "var(--txt2)", fontSize: 13.5, lineHeight: 1.7 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Changelog */}
      <section id="changelog" style={{ padding: "60px 80px 100px", position: "relative", zIndex: 1, scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="chip chip-g" style={{ marginBottom: 14 }}>CHANGELOG</div>
            <h2 className="h-lg" style={{ marginBottom: 14, color: "var(--txt)" }}>What's <span className="grad-c">New</span></h2>
            <p style={{ color: "var(--txt2)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>Latest updates and improvements to the Shadow Chats platform.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { ver: "v2.4.1", date: "May 16, 2026", tag: "LATEST", tagClass: "chip-g", changes: ["Screenshot reference upload in Generate", "Shadow Archive with search & filters", "Node Command dashboard with health monitoring", "Bug fixes and performance improvements"] },
              { ver: "v2.4.0", date: "May 10, 2026", tag: "MAJOR", tagClass: "chip-c", changes: ["The Arena — persona vs persona battles", "ELO rating system for personas", "Workflow Terminal with live logs", "New Marketplace for community templates"] },
              { ver: "v2.3.2", date: "Apr 28, 2026", tag: "PATCH", tagClass: "chip-v", changes: ["Improved generation streaming speed", "Fixed Discord integration timeout", "Memory Matrix token optimization", "UI polish across all screens"] },
              { ver: "v2.3.0", date: "Apr 15, 2026", tag: "MAJOR", tagClass: "chip-c", changes: ["Signal Feed — real-time trend detection", "Global Telemetry dashboard", "Syndicate team management", "Key Vault with encrypted storage"] },
            ].map((entry, i) => (
              <div key={i} className="glass" style={{ padding: "24px 28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--ff-disp)", fontWeight: 700, fontSize: 18, color: "var(--txt)" }}>{entry.ver}</span>
                    <span className={`chip ${entry.tagClass}`} style={{ fontSize: 9 }}>{entry.tag}</span>
                  </div>
                  <span className="mono txt-2" style={{ fontSize: 10 }}>{entry.date}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {entry.changes.map((c, j) => (
                    <div key={j} style={{ display: "flex", gap: 8, alignItems: "center", color: "var(--txt2)", fontSize: 13.5 }}>
                      <I n="add" s={13} c="var(--green)" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 80px 100px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", background: "linear-gradient(135deg,rgba(5,150,105,.06),rgba(16,185,129,.08))", border: "1px solid var(--border2)", borderRadius: 22, padding: "56px 72px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
          <div className="orb" style={{ width: 280, height: 280, top: -80, right: -40, background: "radial-gradient(circle,rgba(5,150,105,.06),transparent 70%)" }} />
          <div>
            <h2 className="h-md" style={{ marginBottom: 10, color: "var(--txt)" }}>Ready to go <span className="txt-c glow-c">live?</span></h2>
            <p style={{ color: "var(--txt2)", maxWidth: 420, lineHeight: 1.7 }}>Join 47,000+ operators running the Shadow Chats. Free tier available — no card required.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexShrink: 0, position: "relative", zIndex: 1 }}>
            <button className="btn-a" onClick={() => nav("register")} style={{ padding: "13px 30px" }}><I n="rocket_launch" s={16} />Start Free</button>
            <button className="btn-g" style={{ padding: "13px 22px" }} onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" })}>View Pricing</button>
          </div>
        </div>
      </section>
    </div>
  );
}
