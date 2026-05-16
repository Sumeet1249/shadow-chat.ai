import React, { useState, useRef, useEffect } from 'react';
import { I } from '../../components/Icon';

const INITIAL_BATTLES = [
  { id: 1, a: "Nexus Architect", b: "Corporate Phantom", topic: "AI Infrastructure Hot Take", aScore: 847, bScore: 623, status: "live", platform: "Twitter", time: "12m left" },
  { id: 2, a: "Ghost Analyst", b: "Signal_Zero", topic: "RLHF Critique Thread", aScore: 1204, bScore: 1189, status: "live", platform: "Reddit", time: "3m left" },
  { id: 3, a: "Nexus Architect", b: "Ghost Analyst", topic: "Quantization vs Distillation", aScore: 2341, bScore: 1876, status: "completed", platform: "Twitter", time: "Final" },
  { id: 4, a: "Corporate Phantom", b: "Signal_Zero", topic: "Engineering Leadership Take", aScore: 456, bScore: 891, status: "completed", platform: "LinkedIn", time: "Final" },
];

const LEADERBOARD = [
  { rank: 1, name: "Nexus Architect", wins: 47, losses: 8, wr: 85, elo: 1847, streak: "W5" },
  { rank: 2, name: "Ghost Analyst", wins: 42, losses: 12, wr: 78, elo: 1756, streak: "W2" },
  { rank: 3, name: "Signal_Zero", wins: 38, losses: 15, wr: 72, elo: 1698, streak: "L1" },
  { rank: 4, name: "Corporate Phantom", wins: 35, losses: 18, wr: 66, elo: 1634, streak: "W1" },
];

export function Arena({ nav }: { nav: (path: string) => void }) {
  const [tab, setTab] = useState<"battles" | "leaderboard">("battles");
  const [battles, setBattles] = useState(INITIAL_BATTLES);
  const [modal, setModal] = useState({ open: false, a: "", b: "", topic: "" });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modal.open && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [modal.open]);

  const handleNewBattle = () => {
    setModal({ open: true, a: "", b: "", topic: "" });
  };

  const handleSaveBattle = () => {
    if (!modal.a.trim() || !modal.b.trim() || !modal.topic.trim()) return;
    const newBattle = {
      id: Date.now(),
      a: modal.a.trim(),
      b: modal.b.trim(),
      topic: modal.topic.trim(),
      aScore: 0,
      bScore: 0,
      status: "live",
      platform: "Global",
      time: "60m left"
    };
    setBattles([newBattle, ...battles]);
    setModal({ ...modal, open: false });
    setTab("battles");
  };

  return (
    <div className="enter">
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 className="h-md"><span className="grad-a">The Arena</span></h1>
          <p style={{ color: "var(--txt2)", fontSize: 13.5, marginTop: 4 }}>
            Persona vs Persona · <span style={{ color: "var(--amber)" }}>{battles.filter(b => b.status === "live").length} live battles</span>
          </p>
        </div>
        <button className="btn-a" onClick={handleNewBattle}><I n="sports_esports" s={15} /> New Battle</button>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
        {(["battles", "leaderboard"] as const).map(t => (
          <button key={t} className="btn-g btn-sm" onClick={() => setTab(t)}
            style={{ background: tab === t ? "rgba(101,163,13,0.08)" : "transparent", borderColor: tab === t ? "rgba(101,163,13,0.3)" : "var(--border)", color: tab === t ? "var(--amber)" : "var(--txt2)" }}>
            <I n={t === "battles" ? "swords" : "leaderboard"} s={13} />
            {t === "battles" ? "Battles" : "Leaderboard"}
          </button>
        ))}
      </div>

      {tab === "battles" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {battles.map(b => {
            const total = b.aScore + b.bScore;
            const aPct = total > 0 ? Math.round((b.aScore / total) * 100) : 50;
            return (
              <div key={b.id} className="card-out hover-glow">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span className="mono txt-2" style={{ fontSize: 10 }}>{b.topic}</span>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span className={`chip ${b.status === "live" ? "chip-r" : "chip-c"}`}>{b.status === "live" ? "🔴 LIVE" : "COMPLETED"}</span>
                    <span className="mono txt-2" style={{ fontSize: 10 }}>{b.time}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: b.aScore > b.bScore ? "var(--green)" : "var(--txt)" }}>{b.a}</div>
                    <div style={{ fontFamily: "var(--ff-disp)", fontWeight: 800, fontSize: 28, color: b.aScore > b.bScore ? "var(--green)" : "var(--txt2)", marginTop: 4 }}>{b.aScore.toLocaleString()}</div>
                  </div>
                  <div style={{ fontFamily: "var(--ff-disp)", fontWeight: 800, fontSize: 16, color: "var(--txt3)" }}>VS</div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: b.bScore > b.aScore ? "var(--green)" : "var(--txt)" }}>{b.b}</div>
                    <div style={{ fontFamily: "var(--ff-disp)", fontWeight: 800, fontSize: 28, color: b.bScore > b.aScore ? "var(--green)" : "var(--txt2)", marginTop: 4 }}>{b.bScore.toLocaleString()}</div>
                  </div>
                </div>
                <div style={{ display: "flex", height: 6, borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ width: `${aPct}%`, background: "linear-gradient(90deg, var(--cyan), #10b981)", transition: "width 1s ease" }} />
                  <div style={{ flex: 1, background: "linear-gradient(90deg, var(--amber), var(--red))" }} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass" style={{ overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["#", "Persona", "W", "L", "WR%", "ELO", "Streak"].map(h => (
                  <th key={h} className="mono txt-2" style={{ fontSize: 10, padding: "14px 18px", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LEADERBOARD.map(p => (
                <tr key={p.rank} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "14px 18px", fontFamily: "var(--ff-disp)", fontWeight: 800, fontSize: 18, color: p.rank <= 3 ? "var(--amber)" : "var(--txt2)" }}>{p.rank}</td>
                  <td style={{ padding: "14px 18px", fontWeight: 600 }}>{p.name}</td>
                  <td style={{ padding: "14px 18px", color: "var(--green)" }} className="mono">{p.wins}</td>
                  <td style={{ padding: "14px 18px", color: "var(--red)" }} className="mono">{p.losses}</td>
                  <td style={{ padding: "14px 18px" }} className="mono">{p.wr}%</td>
                  <td style={{ padding: "14px 18px", fontFamily: "var(--ff-disp)", fontWeight: 700 }}>{p.elo}</td>
                  <td style={{ padding: "14px 18px" }}><span className={`chip ${p.streak.startsWith("W") ? "chip-g" : "chip-r"}`}>{p.streak}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Battle Modal */}
      {modal.open && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div ref={modalRef} className="glass" style={{ width: "100%", maxWidth: 440, padding: 24, display: "flex", flexDirection: "column" }}>
            <h2 className="h-md" style={{ marginBottom: 20 }}>Initiate Battle</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>PERSONA A</div>
                <input 
                  className="field" 
                  value={modal.a} 
                  onChange={e => setModal({ ...modal, a: e.target.value })} 
                  placeholder="e.g. Nexus Architect" 
                />
              </div>
              <div>
                <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>PERSONA B</div>
                <input 
                  className="field" 
                  value={modal.b} 
                  onChange={e => setModal({ ...modal, b: e.target.value })} 
                  placeholder="e.g. Signal_Zero" 
                />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>DEBATE TOPIC / PROMPT</div>
              <input 
                className="field" 
                value={modal.topic} 
                onChange={e => setModal({ ...modal, topic: e.target.value })} 
                placeholder="e.g. The future of AGI alignment" 
              />
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button className="btn-g" onClick={() => setModal({ ...modal, open: false })}>Cancel</button>
              <button className="btn-p" onClick={handleSaveBattle} disabled={!modal.a.trim() || !modal.b.trim() || !modal.topic.trim()}>
                <I n="sports_esports" s={13} /> Start Match
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
