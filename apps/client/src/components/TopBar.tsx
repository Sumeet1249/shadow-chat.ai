import React from 'react';
import { I } from './Icon';

export function TopBar({ title, onCmd, nav }: { title: string, onCmd: () => void, nav: (path: string) => void }) {
  return (
    <header className="topbar">
      <div style={{ fontFamily: "var(--ff-disp)", fontWeight: 700, fontSize: 17, letterSpacing: "-.018em" }}>{title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button className="btn-g btn-sm" onClick={onCmd}>
          <I n="search" s={13} /> Search
          <span className="chip chip-c" style={{ padding: "1px 6px", fontSize: 10 }}>⌘K</span>
        </button>
        <button style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,.03)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", transition: "all var(--t-fast)", color: "var(--txt2)" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--cyan)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--txt2)"; }}>
          <I n="notifications" s={15} />
          <div style={{ position: "absolute", top: 6, right: 6, width: 5, height: 5, borderRadius: "50%", background: "var(--amber)", boxShadow: "0 0 5px rgba(245,158,11,.6)" }} />
        </button>
        <button className="btn-p btn-sm" onClick={() => nav("generate")}><I n="auto_awesome" s={13} />Generate</button>
      </div>
    </header>
  );
}
