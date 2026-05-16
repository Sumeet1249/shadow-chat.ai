import React, { useState } from 'react';
import { I } from './Icon';

export function TopBar({ title, onCmd, nav }: { title: string, onCmd: () => void, nav: (path: string) => void }) {
  const [hasNotif, setHasNotif] = useState(true);
  const [openNotif, setOpenNotif] = useState(false);

  return (
    <header className="topbar">
      <div style={{ fontFamily: "var(--ff-disp)", fontWeight: 700, fontSize: 17, letterSpacing: "-.018em", color: "var(--txt)" }}>{title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button className="btn-g btn-sm" onClick={onCmd}>
          <I n="search" s={13} /> Search
          <span className="chip chip-c" style={{ padding: "1px 6px", fontSize: 10 }}>⌘K</span>
        </button>
        <div style={{ position: "relative" }}>
          <button style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(5,150,105,.04)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", transition: "all var(--t-fast)", color: "var(--txt2)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--cyan)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--txt2)"; }}
            onClick={() => { setHasNotif(false); setOpenNotif(!openNotif); }}>
            <I n="notifications" s={15} />
            {hasNotif && <div style={{ position: "absolute", top: 6, right: 6, width: 5, height: 5, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 5px rgba(5,150,105,.5)" }} />}
          </button>
          
          {openNotif && (
            <div className="glass" style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, width: 320, padding: 16, zIndex: 200, animation: "enter .2s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span className="mono txt-2" style={{ fontSize: 10 }}>NOTIFICATIONS</span>
                <button className="btn-g btn-sm" style={{ padding: "2px 6px!important" }} onClick={() => setOpenNotif(false)}><I n="close" s={14} /></button>
              </div>
              <div style={{ padding: 12, background: "rgba(5,150,105,0.03)", borderRadius: "var(--r-md)", border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ color: "var(--cyan)", marginTop: 2 }}><I n="info" s={14} /></div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2, color: "var(--txt)" }}>System Operational</div>
                    <div className="txt-2" style={{ fontSize: 12, lineHeight: 1.4 }}>All operational nodes are running at optimal capacity. 8,420 tasks processed today.</div>
                    <div className="mono txt-2" style={{ fontSize: 9, marginTop: 6, color: "var(--txt3)" }}>Just now</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <button className="btn-p btn-sm" onClick={() => nav("generate")}><I n="auto_awesome" s={13} /> Generate</button>
      </div>
    </header>
  );
}
