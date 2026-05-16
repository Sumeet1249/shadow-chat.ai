import React, { useState, useEffect, useRef } from 'react';
import { I } from './Icon';

const CMDS = [
  { l: "Dashboard", i: "dashboard", p: "dashboard", cat: "Navigate" },
  { l: "Neural Reply Generation", i: "auto_awesome", p: "generate", cat: "Navigate" },
  { l: "Workflow Terminal", i: "terminal", p: "workflow", cat: "Navigate" },
  { l: "The Arena", i: "sports_esports", p: "arena", cat: "Navigate" },
  { l: "Memory Matrix", i: "memory", p: "memory", cat: "Navigate" },
  { l: "Neural Analytics", i: "analytics", p: "analytics", cat: "Navigate" },
  { l: "Signal Feed", i: "rss_feed", p: "feed", cat: "Navigate" },
  { l: "Shadow Archive", i: "history", p: "archive", cat: "Navigate" },
  { l: "Node Command Center", i: "hub", p: "nodes", cat: "Navigate" },
  { l: "Key Vault", i: "key", p: "vault", cat: "Settings" },
  { l: "Engine Settings", i: "settings", p: "engine", cat: "Settings" },
  { l: "Developer Sandbox", i: "code", p: "sandbox", cat: "Settings" },
  { l: "Account & Quota", i: "account_circle", p: "account", cat: "Account" },
];

export function CommandPalette({ onClose, nav }: { onClose: () => void, nav: (path: string) => void }) {
  const [q, setQ] = useState("");
  const inp = useRef<HTMLInputElement>(null);
  const filtered = CMDS.filter(c => c.l.toLowerCase().includes(q.toLowerCase()));
  
  useEffect(() => {
    inp.current?.focus();
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);
  
  return (
    <div className="overlay" onClick={onClose}>
      <div className="cmd" onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid var(--border)", gap: 10 }}>
          <I n="search" s={16} c="var(--txt3)" />
          <input ref={inp} value={q} onChange={e => setQ(e.target.value)} placeholder="Type a command or search pages..."
            style={{ flex: 1, background: "none", border: "none", outline: "none", color: "var(--txt)", fontFamily: "var(--ff-body)", fontSize: 14 }} />
          <span className="chip chip-c" onClick={onClose} style={{ cursor: "pointer" }}>ESC</span>
        </div>
        <div style={{ maxHeight: 400, overflowY: "auto", padding: "6px 0" }}>
          {filtered.map((cmd, i) => (
            <div key={i} onClick={() => { nav(cmd.p); onClose(); }}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 18px", cursor: "pointer", transition: "background var(--t-fast)" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(5,150,105,0.05)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <div className="icon-box" style={{ width: 30, height: 30, background: "rgba(5,150,105,0.06)", border: "1px solid var(--border)" }}>
                <I n={cmd.i} s={15} c="var(--cyan)" />
              </div>
              <span style={{ fontSize: 13, flex: 1, color: "var(--txt)" }}>{cmd.l}</span>
              <span className="chip chip-v" style={{ fontSize: 10 }}>{cmd.cat}</span>
            </div>
          ))}
          {!filtered.length && <div style={{ textAlign: "center", padding: "36px 20px", color: "var(--txt3)", fontFamily: "var(--ff-mono)", fontSize: 12 }}>// No results found</div>}
        </div>
      </div>
    </div>
  );
}
