import React from 'react';
import { I } from '../../components/Icon';

const SIGNALS = [
  { src: "Twitter", topic: "GPT-5 Architecture Leak", strength: 94, sentiment: "bullish", time: "3m ago", mentions: 12400, c: "#00aaff" },
  { src: "Reddit", topic: "NVIDIA Blackwell Benchmarks", strength: 87, sentiment: "bullish", time: "12m ago", mentions: 8200, c: "#ff4500" },
  { src: "Discord", topic: "Anthropic Hiring Freeze", strength: 72, sentiment: "bearish", time: "28m ago", mentions: 3400, c: "#5865f2" },
  { src: "Twitter", topic: "Open Source MoE Breakthrough", strength: 89, sentiment: "bullish", time: "1h ago", mentions: 18900, c: "#00aaff" },
  { src: "Reddit", topic: "AI Regulation EU Vote", strength: 65, sentiment: "neutral", time: "2h ago", mentions: 6700, c: "#ff4500" },
  { src: "LinkedIn", topic: "Tech Layoffs Wave 3", strength: 78, sentiment: "bearish", time: "3h ago", mentions: 4200, c: "#0077b5" },
];

export function SignalFeed({ nav }: { nav: (path: string) => void }) {
  return (
    <div className="enter">
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 className="h-md"><span className="grad-c">Signal Feed</span></h1>
          <p style={{ color: "var(--txt2)", fontSize: 13.5, marginTop: 4 }}>Real-time trend detection · <span style={{ color: "var(--green)" }}>6 active signals</span></p>
        </div>
        <div className="dot" style={{ width: 8, height: 8 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {SIGNALS.map((s, i) => (
          <div key={i} className="card-out hover-glow">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: s.c, background: `${s.c}18`, border: `1px solid ${s.c}2e`, padding: "2px 9px", borderRadius: 999 }}>{s.src.toUpperCase()}</span>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{s.topic}</span>
              </div>
              <span className="mono txt-2" style={{ fontSize: 10 }}>{s.time}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div className="pt"><div className="pf" style={{ width: `${s.strength}%`, background: s.strength > 80 ? "var(--green)" : s.strength > 60 ? "var(--amber)" : "var(--red)" }} /></div>
              </div>
              <span className="mono" style={{ fontSize: 11, color: s.strength > 80 ? "var(--green)" : "var(--amber)" }}>{s.strength}%</span>
              <span className={`chip ${s.sentiment === "bullish" ? "chip-g" : s.sentiment === "bearish" ? "chip-r" : "chip-c"}`} style={{ fontSize: 10 }}>{s.sentiment.toUpperCase()}</span>
              <span className="mono txt-2" style={{ fontSize: 10 }}>{s.mentions.toLocaleString()} mentions</span>
              <button className="btn-g btn-sm" onClick={() => nav("generate")}><I n="auto_awesome" s={11} /> Generate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
