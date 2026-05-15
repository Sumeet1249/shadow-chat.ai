import React, { useState, useEffect } from 'react';

export function StatusBar() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i); }, []);
  return (
    <div className="statusbar">
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div className="dot" /><span className="mono txt-c">MODEL ACTIVE</span></div>
      <span className="mono txt-2">claude-3.5-sonnet</span>
      <div style={{ width: 1, height: 14, background: "var(--border)" }} />
      <span className="mono txt-2">TOKENS <span style={{ color: "var(--txt)" }}>128K</span></span>
      <div style={{ width: 1, height: 14, background: "var(--border)" }} />
      <span className="mono" style={{ color: "var(--green)" }}>LATENCY 42ms</span>
      <div style={{ flex: 1 }} />
      <span className="mono txt-2">{t.toLocaleTimeString("en-US", { hour12: false })}</span>
    </div>
  );
}
