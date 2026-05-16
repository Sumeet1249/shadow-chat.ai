import React, { useState } from 'react';
import { I } from '../../components/Icon';

export function DevSandbox({ nav }: { nav: (path: string) => void }) {
  const [code, setCode] = useState(`// Shadow Chats — Dev Sandbox\n// Test prompts, API calls, and persona behavior\n\nconst persona = "Nexus Architect";\nconst platform = "twitter";\nconst prompt = "Generate a hot take about ML infrastructure";\n\n// Run this to test generation\nawait shadow.generate({ persona, platform, prompt });\n`);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);

  const handleRun = () => {
    setRunning(true);
    setOutput("");
    setTimeout(() => {
      setOutput(`[06:42:18] Initializing persona: Nexus Architect\n[06:42:18] Platform: Twitter | Model: claude-3.5-sonnet\n[06:42:19] Generating response...\n[06:42:21] ✓ Generation complete (1,240 tokens, 2.3s)\n[06:42:21] Output: "The infrastructure problem isn't compute — it's latency at the edge..."\n[06:42:21] Engagement prediction: HIGH (87% confidence)\n[06:42:21] Ready.`);
      setRunning(false);
    }, 2000);
  };

  return (
    <div className="enter">
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 className="h-md"><span className="grad-c">Dev Sandbox</span></h1>
          <p style={{ color: "var(--txt2)", fontSize: 13.5, marginTop: 4 }}>Test & debug · <span style={{ color: "var(--cyan)" }}>interactive console</span></p>
        </div>
        <button className="btn-p" onClick={handleRun} style={{ opacity: running ? 0.5 : 1 }}>
          {running ? <span className="spinner" /> : <I n="play_arrow" s={15} />} {running ? "Running..." : "Run"}
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, height: "calc(100vh - 220px)" }}>
        <div className="glass" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between" }}>
            <span className="mono txt-2" style={{ fontSize: 10 }}>EDITOR</span>
            <span className="mono txt-2" style={{ fontSize: 10 }}>JavaScript</span>
          </div>
          <textarea value={code} onChange={e => setCode(e.target.value)}
            style={{ flex: 1, padding: 18, background: "transparent", border: "none", color: "var(--cyan)", fontFamily: "var(--ff-mono)", fontSize: 13, lineHeight: 1.8, resize: "none", outline: "none" }} />
        </div>
        <div className="glass" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between" }}>
            <span className="mono txt-2" style={{ fontSize: 10 }}>OUTPUT</span>
            {running && <span className="chip chip-c" style={{ fontSize: 9 }}>RUNNING</span>}
          </div>
          <div style={{ flex: 1, padding: 18, fontFamily: "var(--ff-mono)", fontSize: 12, lineHeight: 1.9, color: "var(--green)", whiteSpace: "pre-wrap", overflowY: "auto", background: "rgba(5,150,105,.04)" }}>
            {output || (running ? "" : <span style={{ color: "var(--txt3)" }}>{"// Output will appear here after running..."}</span>)}
            {running && <span className="blink" style={{ color: "var(--cyan)" }}>▊</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
