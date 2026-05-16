import React, { useState, useRef, useEffect } from 'react';
import { I } from '../../components/Icon';

const INITIAL_WORKFLOWS = [
  { id: 1, name: "Morning Twitter Storm", status: "active", steps: 5, completed: 3, schedule: "Daily 9:00 AM", lastRun: "2h ago", persona: "Nexus Architect", platform: "Twitter", c: "#00aaff" },
  { id: 2, name: "LinkedIn Thought Piece", status: "active", steps: 4, completed: 4, schedule: "Mon/Wed/Fri", lastRun: "18h ago", persona: "Corporate Phantom", platform: "LinkedIn", c: "#0077b5" },
  { id: 3, name: "Reddit Engagement Loop", status: "paused", steps: 6, completed: 0, schedule: "Every 4 hours", lastRun: "2d ago", persona: "Ghost Analyst", platform: "Reddit", c: "#ff4500" },
  { id: 4, name: "Discord Alpha Drops", status: "active", steps: 3, completed: 2, schedule: "Real-time", lastRun: "45m ago", persona: "Signal_Zero", platform: "Discord", c: "#5865f2" },
  { id: 5, name: "Cross-Platform Sync", status: "idle", steps: 8, completed: 0, schedule: "Manual", lastRun: "5d ago", persona: "Multi", platform: "All", c: "var(--cyan)" },
];

const LOGS = [
  { time: "06:42:18", type: "success", msg: "Twitter Storm → Step 3/5 completed. Generated reply to @elonmusk thread." },
  { time: "06:42:15", type: "info", msg: "Fetching trending topics from Twitter API..." },
  { time: "06:41:58", type: "success", msg: "Discord Alpha → Step 2/3 completed. Posted analysis in #alpha-signals." },
  { time: "06:40:22", type: "warn", msg: "Rate limit approaching on Twitter node (82% capacity)." },
  { time: "06:38:10", type: "info", msg: "LinkedIn Thought Piece → Scheduled for next run at 09:00 AM." },
  { time: "06:35:44", type: "success", msg: "Memory context loaded for Nexus Architect persona (1,284 tokens)." },
  { time: "06:34:01", type: "error", msg: "Reddit Engagement Loop paused — subreddit r/MachineLearning rate limit hit." },
];

export function WorkflowTerminal({ nav }: { nav: (path: string) => void }) {
  const [tab, setTab] = useState<"workflows" | "terminal">("workflows");
  const [workflows, setWorkflows] = useState(INITIAL_WORKFLOWS);
  const [modal, setModal] = useState({ open: false, name: "", persona: "Nexus Architect", platform: "Twitter", schedule: "Manual" });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modal.open && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [modal.open]);

  const handleNewWorkflow = () => {
    setModal({ open: true, name: "", persona: "Nexus Architect", platform: "Twitter", schedule: "Manual" });
  };

  const handleSaveWorkflow = () => {
    if (!modal.name.trim()) return;
    const newWf = {
      id: Date.now(),
      name: modal.name.trim(),
      status: "idle",
      steps: 5,
      completed: 0,
      schedule: modal.schedule,
      lastRun: "Never",
      persona: modal.persona,
      platform: modal.platform,
      c: "var(--cyan)"
    };
    setWorkflows([newWf, ...workflows]);
    setModal({ ...modal, open: false });
    setTab("workflows");
  };

  return (
    <div className="enter">
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 className="h-md"><span className="grad-c">Workflow Terminal</span></h1>
          <p style={{ color: "var(--txt2)", fontSize: 13.5, marginTop: 4 }}>
            {workflows.filter(w => w.status === "active").length} active workflows · <span style={{ color: "var(--green)" }}>automation engine online</span>
          </p>
        </div>
        <button className="btn-p" onClick={handleNewWorkflow}><I n="add" s={15} /> New Workflow</button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
        {(["workflows", "terminal"] as const).map(t => (
          <button key={t} className={`btn-g btn-sm`} onClick={() => setTab(t)}
            style={{ background: tab === t ? "rgba(5,150,105,0.08)" : "transparent", borderColor: tab === t ? "rgba(5,150,105,0.3)" : "var(--border)", color: tab === t ? "var(--cyan)" : "var(--txt2)" }}>
            <I n={t === "workflows" ? "account_tree" : "terminal"} s={13} />
            {t === "workflows" ? "Workflows" : "Live Terminal"}
          </button>
        ))}
      </div>

      {tab === "workflows" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {workflows.map(w => (
            <div key={w.id} className="card-out hover-glow">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: w.status === "active" ? "var(--green)" : w.status === "paused" ? "var(--amber)" : "var(--txt3)", boxShadow: w.status === "active" ? "0 0 8px rgba(52,211,153,.5)" : "none" }} />
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{w.name}</span>
                </div>
                <span className={`chip ${w.status === "active" ? "chip-g" : w.status === "paused" ? "chip-a" : "chip-c"}`}>{w.status.toUpperCase()}</span>
              </div>
              <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontFamily: "var(--ff-mono)", fontSize: 10, color: w.c, background: `${w.c}18`, border: `1px solid ${w.c}2e`, padding: "2px 9px", borderRadius: 999 }}>{w.platform.toUpperCase()}</span>
                <span className="mono txt-2" style={{ fontSize: 10 }}>{w.persona}</span>
                <span className="mono txt-2" style={{ fontSize: 10 }}>⏱ {w.schedule}</span>
                <span className="mono txt-2" style={{ fontSize: 10 }}>Last: {w.lastRun}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="pt" style={{ flex: 1 }}>
                  <div className="pf" style={{ width: `${(w.completed / w.steps) * 100}%`, background: "linear-gradient(90deg, var(--cyan), #10b981)" }} />
                </div>
                <span className="mono" style={{ fontSize: 11, color: "var(--txt2)" }}>{w.completed}/{w.steps}</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn-g btn-sm" onClick={() => setWorkflows(workflows.map(wf => wf.id === w.id ? { ...wf, status: wf.status === "active" ? "paused" : "active" } : wf))} title={w.status === "active" ? "Pause Workflow" : "Activate Workflow"}>
                    <I n={w.status === "active" ? "pause" : "play_arrow"} s={12} />
                  </button>
                  <button className="btn-g btn-sm" onClick={() => setWorkflows(workflows.filter(wf => wf.id !== w.id))} title="Delete Workflow">
                    <I n="delete" s={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div className="dot" />
              <span className="mono" style={{ fontSize: 11, color: "var(--green)" }}>LIVE FEED</span>
            </div>
            <button className="btn-g btn-sm"><I n="delete_sweep" s={12} /> Clear</button>
          </div>
          <div style={{ padding: 18, fontFamily: "var(--ff-mono)", fontSize: 12, lineHeight: 2.2, background: "rgba(5,150,105,.04)", minHeight: 400 }}>
            {LOGS.map((l, i) => (
              <div key={i} style={{ display: "flex", gap: 12 }}>
                <span style={{ color: "var(--txt3)", flexShrink: 0 }}>[{l.time}]</span>
                <span style={{ color: l.type === "success" ? "var(--green)" : l.type === "warn" ? "var(--amber)" : l.type === "error" ? "var(--red)" : "var(--txt2)", flexShrink: 0, width: 10 }}>
                  {l.type === "success" ? "✓" : l.type === "warn" ? "⚠" : l.type === "error" ? "✗" : "→"}
                </span>
                <span style={{ color: "var(--txt2)" }}>{l.msg}</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
              <span style={{ color: "var(--cyan)" }}>$</span>
              <span className="blink" style={{ color: "var(--cyan)" }}>▊</span>
            </div>
          </div>
        </div>
      )}

      {/* New Workflow Modal */}
      {modal.open && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div ref={modalRef} className="glass" style={{ width: "100%", maxWidth: 440, padding: 24, display: "flex", flexDirection: "column" }}>
            <h2 className="h-md" style={{ marginBottom: 20 }}>Create Workflow</h2>
            
            <div style={{ marginBottom: 16 }}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>WORKFLOW NAME</div>
              <input 
                className="field" 
                value={modal.name} 
                onChange={e => setModal({ ...modal, name: e.target.value })} 
                placeholder="e.g. Automated Alpha Scrape" 
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>ASSIGNED PERSONA</div>
                <select 
                  className="field" 
                  value={modal.persona} 
                  onChange={e => setModal({ ...modal, persona: e.target.value })}
                  style={{ cursor: "pointer" }}
                >
                  <option value="Nexus Architect">Nexus Architect</option>
                  <option value="Corporate Phantom">Corporate Phantom</option>
                  <option value="Ghost Analyst">Ghost Analyst</option>
                  <option value="Signal_Zero">Signal_Zero</option>
                </select>
              </div>
              <div>
                <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>TARGET PLATFORM</div>
                <select 
                  className="field" 
                  value={modal.platform} 
                  onChange={e => setModal({ ...modal, platform: e.target.value })}
                  style={{ cursor: "pointer" }}
                >
                  <option value="Twitter">Twitter</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Reddit">Reddit</option>
                  <option value="Discord">Discord</option>
                  <option value="Web">Web</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>EXECUTION SCHEDULE</div>
              <select 
                className="field" 
                value={modal.schedule} 
                onChange={e => setModal({ ...modal, schedule: e.target.value })}
                style={{ cursor: "pointer" }}
              >
                <option value="Manual">Manual</option>
                <option value="Hourly">Hourly</option>
                <option value="Daily 9:00 AM">Daily 9:00 AM</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button className="btn-g" onClick={() => setModal({ ...modal, open: false })}>Cancel</button>
              <button className="btn-p" onClick={handleSaveWorkflow} disabled={!modal.name.trim()}>
                <I n="account_tree" s={13} /> Save Workflow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
