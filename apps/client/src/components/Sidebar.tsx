import React from 'react';
import { I } from './Icon';

const NAV = [
  { sec: "CORE" },
  { l: "Dashboard", i: "dashboard", p: "dashboard" },
  { l: "Generate", i: "auto_awesome", p: "generate" },
  { l: "Workflow", i: "terminal", p: "workflow" },
  { l: "The Arena", i: "sports_esports", p: "arena" },
  { sec: "INTELLIGENCE" },
  { l: "Memory Matrix", i: "memory", p: "memory" },
  { l: "Personas", i: "psychology", p: "personas" },
  { l: "Marketplace", i: "storefront", p: "marketplace" },
  { sec: "DATA" },
  { l: "Analytics", i: "analytics", p: "analytics" },
  { l: "Signal Feed", i: "rss_feed", p: "feed" },
  { l: "Archive", i: "history", p: "archive" },
  { sec: "OPERATIONS" },
  { l: "Nodes", i: "hub", p: "nodes" },
  { l: "Telemetry", i: "monitoring", p: "telemetry" },
  { l: "Syndicate", i: "group", p: "syndicate" },
  { sec: "SYSTEM" },
  { l: "Key Vault", i: "key", p: "vault" },
  { l: "Engine", i: "settings", p: "engine" },
  { l: "Sandbox", i: "code", p: "sandbox" },
  { l: "Account", i: "account_circle", p: "account" },
];

export function Sidebar({ cur, nav }: { cur: string, nav: (path: string) => void }) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ padding: "22px 18px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#059669,#10b981)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(5,150,105,.18)" }}>
          <I n="psychology" s={17} c="#fff" />
        </div>
        <div>
          <div style={{ fontFamily: "var(--ff-disp)", fontWeight: 800, fontSize: 15, letterSpacing: "-.02em", color: "var(--txt)" }}>SHADOW CHATS</div>
          <div className="mono" style={{ color: "var(--cyan)", opacity: .75, fontSize: 10 }}>v2.4.1 · NEURAL</div>
        </div>
      </div>
      {/* User */}
      <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#059669,#10b981)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", boxShadow: "0 0 10px rgba(5,150,105,.15)", flexShrink: 0 }}>C</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--txt)" }}>Caleb_Shadow</div>
          <div className="mono txt-a" style={{ fontSize: 10 }}>ELITE TIER</div>
        </div>
        <div className="dot" />
      </div>
      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
        {NAV.map((item, i) =>
          item.sec
            ? <div key={i} className="ssec">{item.sec}</div>
            : <div key={i} className={`slink${cur === item.p ? " on" : ""}`} onClick={() => nav(item.p || '')}>
                <I n={item.i || ''} s={15} />
                <span>{item.l}</span>
              </div>
        )}
      </nav>
      {/* Bottom */}
      <div style={{ padding: "10px 8px", borderTop: "1px solid var(--border)" }}>
        <div className="slink" onClick={() => nav("landing")} style={{ color: "var(--txt3)", fontSize: 11 }}>
          <I n="logout" s={13} />
          <span>Sign Out</span>
        </div>
      </div>
    </aside>
  );
}
