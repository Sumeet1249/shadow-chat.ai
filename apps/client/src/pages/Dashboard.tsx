import React, { useState, useEffect } from 'react';
import { I } from '../components/Icon';

export function Dashboard({ nav }: { nav: (path: string) => void }) {
  const [cnt, setCnt] = useState({ r: 0, t: 0, w: 0 });
  useEffect(() => {
    const goal = { r: 2847, t: 89420, w: 91 }, dur = 1400, s = Date.now();
    const f = setInterval(() => {
      const p = Math.min((Date.now() - s) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      setCnt({ r: Math.floor(e * goal.r), t: Math.floor(e * goal.t), w: Math.floor(e * goal.w) });
      if (p >= 1) clearInterval(f);
    }, 16);
    return () => clearInterval(f);
  }, []);

  const spark = [38, 62, 44, 78, 58, 88, 72, 94, 68, 86, 90, 83];
  const max = Math.max(...spark);

  const outputs = [
    { pl: "Twitter", ps: "Nexus Architect", txt: "The infrastructure problem isn't compute — it's latency at the edge. We're solving the wrong bottleneck entirely...", time: "2m ago", eng: "+847 engagements", tag: "VIRAL", c: "#059669" },
    { pl: "LinkedIn", ps: "Corporate Phantom", txt: "After 3 years in ML infrastructure, the one pattern separating top-tier teams from the rest is deceptively simple...", time: "18m ago", eng: "+234 reactions", tag: "HIGH", c: "#0d9488" },
    { pl: "Reddit", ps: "Ghost Analyst", txt: "This take fundamentally misses the reward model problem with current RLHF approaches. Here's a better framing...", time: "1h ago", eng: "+1.2K upvotes", tag: "TOP", c: "#10b981" },
    { pl: "Discord", ps: "Signal_Zero", txt: "ngl the alpha leak yesterday checks out completely. the architecture changes in their latest commit confirm it...", time: "3h ago", eng: "+89 replies", tag: "ACTIVE", c: "#059669" },
  ];

  const nodes = [
    { n: "NODE-ALPHA", s: "active", pl: "Twitter", req: 1284, h: 99 },
    { n: "NODE-BETA", s: "active", pl: "LinkedIn", req: 445, h: 97 },
    { n: "NODE-GAMMA", s: "idle", pl: "Reddit", req: 0, h: 100 },
    { n: "NODE-DELTA", s: "active", pl: "Discord", req: 893, h: 94 },
  ];

  const hr = new Date().getHours();
  const greet = hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="enter">
      {/* Header */}
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div className="mono txt-2" style={{ marginBottom: 4, fontSize: 10 }}>{new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
          <h1 className="h-md" style={{ color: "var(--txt)" }}>{greet}, <span className="txt-c glow-c">Caleb</span></h1>
          <p style={{ color: "var(--txt2)", fontSize: 13.5, marginTop: 4 }}>Neural core stable · 4 nodes active · <span style={{ color: "var(--green)" }}>all systems nominal</span></p>
        </div>
        <button className="btn-p" onClick={() => nav("generate")}><I n="auto_awesome" s={15} />New Generation</button>
      </div>

      {/* Metric Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { lb: "TOTAL REPLIES", val: cnt.r.toLocaleString(), ch: "+12.4%", ic: "chat_bubble", c: "var(--cyan)" },
          { lb: "TOKENS USED", val: cnt.t.toLocaleString(), ch: "+8.1%", ic: "memory", c: "var(--violet)" },
          { lb: "WIN RATE", val: `${cnt.w}%`, ch: "+3.2%", ic: "emoji_events", c: "var(--amber)" },
          { lb: "ACTIVE NODES", val: "4 / 8", ch: "STABLE", ic: "hub", c: "var(--green)" },
        ].map((m, i) => (
          <div key={i} className="glass" style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <span className="mono txt-2" style={{ fontSize: 10 }}>{m.lb}</span>
              <div className="icon-box" style={{ width: 30, height: 30, background: `${m.c}15`, border: `1px solid ${m.c}25` }}>
                <I n={m.ic} s={15} c={m.c} />
              </div>
            </div>
            <div style={{ fontFamily: "var(--ff-disp)", fontWeight: 800, fontSize: 26, letterSpacing: "-.02em", marginBottom: 8, color: "var(--txt)" }}>{m.val}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "var(--green)", fontFamily: "var(--ff-mono)", fontSize: 11 }}>{m.ch}</span>
              <span className="mono txt-2" style={{ fontSize: 10 }}>vs last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18 }}>
        {/* Left: Recent Output */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div className="h-sm" style={{ color: "var(--txt)" }}>Recent Output</div>
            <button className="btn-g btn-sm" onClick={() => nav("archive")}>View Archive →</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {outputs.map((o, i) => (
              <div key={i} className="card-out hover-glow" onClick={() => nav("archive")}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: o.c, background: `${o.c}12`, border: `1px solid ${o.c}25`, padding: "2px 9px", borderRadius: 999 }}>{o.pl.toUpperCase()}</span>
                    <span className="chip chip-v">{o.ps}</span>
                  </div>
                  <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                    <span className={`chip ${o.tag==="VIRAL"||o.tag==="TOP"?"chip-a":"chip-c"}`}>{o.tag}</span>
                    <span className="mono txt-2" style={{ fontSize: 10 }}>{o.time}</span>
                  </div>
                </div>
                <p style={{ color: "var(--txt2)", fontSize: 13.5, lineHeight: 1.55, marginBottom: 10 }}>"{o.txt}"</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: "var(--green)" }}>{o.eng}</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn-g btn-sm"><I n="content_copy" s={11} /></button>
                    <button className="btn-g btn-sm"><I n="refresh" s={11} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Sparkline */}
          <div className="glass" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span className="mono txt-2" style={{ fontSize: 10 }}>ACTIVITY — 12H</span>
              <span className="chip chip-g">LIVE</span>
            </div>
            <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 56 }}>
              {spark.map((v, i) => (
                <div key={i} style={{ flex: 1, height: `${(v/max)*100}%`, borderRadius: 3, background: "linear-gradient(to top,rgba(5,150,105,.7),rgba(16,185,129,.4))", opacity: .45 + (i/spark.length)*.55 }} />
              ))}
            </div>
          </div>

          {/* Node Status */}
          <div className="glass" style={{ padding: "18px 20px", flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span className="mono txt-2" style={{ fontSize: 10 }}>NODE STATUS</span>
              <button className="btn-g btn-sm" onClick={() => nav("nodes")}>Manage</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {nodes.map((nd, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 11px", background: "rgba(5,150,105,.03)", borderRadius: 8, border: "1px solid var(--border)" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: nd.s==="active"?"var(--green)":"var(--txt3)", boxShadow: nd.s==="active"?"0 0 7px rgba(16,185,129,.5)":"none", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="mono" style={{ fontSize: 11, color: "var(--txt)", marginBottom: 1 }}>{nd.n}</div>
                    <div className="mono txt-2" style={{ fontSize: 10 }}>{nd.pl} · {nd.req} req</div>
                  </div>
                  <div className="mono" style={{ fontSize: 11, color: nd.h>95?"var(--green)":"var(--amber)" }}>{nd.h}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
