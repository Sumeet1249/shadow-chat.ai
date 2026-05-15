import React, { useState, useEffect } from 'react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { StatusBar } from '../components/StatusBar';
import { CommandPalette } from '../components/CommandPalette';

export function Shell({ children, cur, nav, title }: { children: React.ReactNode, cur: string, nav: (path: string) => void, title: string }) {
  const [cmd, setCmd] = useState(false);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setCmd(p => !p); } };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);
  return (
    <div style={{ background: "var(--void)", minHeight: "100vh" }}>
      <ParticleCanvas density={0.35} />
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 18% 52%,rgba(0,229,255,.04),transparent 58%),radial-gradient(ellipse at 82% 18%,rgba(124,58,237,.06),transparent 58%)", pointerEvents: "none", zIndex: 0 }} />
      <Sidebar cur={cur} nav={nav} />
      <TopBar title={title} onCmd={() => setCmd(true)} nav={nav} />
      <main className="main" style={{ position: "relative", zIndex: 1, paddingBottom: 50 }}>{children}</main>
      <StatusBar />
      {cmd && <CommandPalette onClose={() => setCmd(false)} nav={p => { nav(p); setCmd(false); }} />}
    </div>
  );
}
