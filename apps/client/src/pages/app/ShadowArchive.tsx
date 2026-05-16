import React, { useState } from 'react';
import { I } from '../../components/Icon';

const FILTERS = ["All", "Twitter", "LinkedIn", "Reddit", "Discord"];
const SORT_OPTIONS = ["Newest", "Most Engaged", "Highest Win Rate"];

const ARCHIVE_DATA = [
  {
    id: 1, pl: "Twitter", ps: "Nexus Architect", tag: "VIRAL",
    txt: "The infrastructure problem isn't compute — it's latency at the edge. We've been optimizing the wrong bottleneck for 3 years. Here's what the top 1% of ML teams actually focus on →",
    eng: "2,847 engagements", time: "2h ago", date: "May 16, 2026", tokens: 1240, winRate: 94,
    c: "#00aaff",
  },
  {
    id: 2, pl: "LinkedIn", ps: "Corporate Phantom", tag: "HIGH",
    txt: "After 3 years leading ML infrastructure teams at scale, I've noticed one pattern that consistently separates elite engineering organizations from the rest. It's deceptively simple...",
    eng: "1,234 reactions", time: "4h ago", date: "May 16, 2026", tokens: 2100, winRate: 88,
    c: "#0077b5",
  },
  {
    id: 3, pl: "Reddit", ps: "Ghost Analyst", tag: "TOP",
    txt: "This take fundamentally misses the reward model problem with current RLHF approaches. The real issue isn't that RLHF doesn't work — it's that most implementations conflate preference with values.",
    eng: "1,892 upvotes", time: "6h ago", date: "May 16, 2026", tokens: 1870, winRate: 91,
    c: "#ff4500",
  },
  {
    id: 4, pl: "Discord", ps: "Signal_Zero", tag: "ACTIVE",
    txt: "ngl the alpha leak yesterday checks out completely. the architecture changes in their latest commit confirm what we were speculating about. key findings inside 👇",
    eng: "342 replies", time: "8h ago", date: "May 16, 2026", tokens: 890, winRate: 79,
    c: "#5865f2",
  },
  {
    id: 5, pl: "Twitter", ps: "Nexus Architect", tag: "VIRAL",
    txt: "Everyone's building RAG wrong. The retrieval step isn't the bottleneck — it's the re-ranking. Most teams skip re-ranking entirely and wonder why their outputs hallucinate.",
    eng: "3,421 engagements", time: "1d ago", date: "May 15, 2026", tokens: 1560, winRate: 96,
    c: "#00aaff",
  },
  {
    id: 6, pl: "LinkedIn", ps: "Corporate Phantom", tag: "HIGH",
    txt: "The biggest mistake I see senior engineers make: optimizing for code quality when they should be optimizing for velocity. Here's the framework that changed how our team ships →",
    eng: "987 reactions", time: "1d ago", date: "May 15, 2026", tokens: 1980, winRate: 85,
    c: "#0077b5",
  },
  {
    id: 7, pl: "Reddit", ps: "Ghost Analyst", tag: "RISING",
    txt: "Just finished benchmarking the new Llama architecture against Mixtral on real production workloads. The results aren't even close, and not in the direction you'd expect.",
    eng: "756 upvotes", time: "2d ago", date: "May 14, 2026", tokens: 2340, winRate: 82,
    c: "#ff4500",
  },
  {
    id: 8, pl: "Twitter", ps: "Nexus Architect", tag: "HIGH",
    txt: "Hot take: fine-tuning is dead for 90% of use cases. The teams still fine-tuning are doing it out of inertia, not necessity. Prompt engineering + few-shot >> LoRA for most prod scenarios.",
    eng: "1,102 engagements", time: "3d ago", date: "May 13, 2026", tokens: 1120, winRate: 87,
    c: "#00aaff",
  },
];

export function ShadowArchive({ nav }: { nav: (path: string) => void }) {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = ARCHIVE_DATA
    .filter(item => filter === "All" || item.pl === filter)
    .filter(item => !search || item.txt.toLowerCase().includes(search.toLowerCase()) || item.ps.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "Most Engaged") return parseInt(b.eng.replace(/\D/g, "")) - parseInt(a.eng.replace(/\D/g, ""));
      if (sort === "Highest Win Rate") return b.winRate - a.winRate;
      return 0; // default newest order
    });

  const totalEng = ARCHIVE_DATA.reduce((s, i) => s + parseInt(i.eng.replace(/\D/g, "")), 0);
  const avgWin = Math.round(ARCHIVE_DATA.reduce((s, i) => s + i.winRate, 0) / ARCHIVE_DATA.length);
  const totalTokens = ARCHIVE_DATA.reduce((s, i) => s + i.tokens, 0);

  return (
    <div className="enter">
      {/* Header */}
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 className="h-md">
            <span className="grad-c">Shadow Archive</span>
          </h1>
          <p style={{ color: "var(--txt2)", fontSize: 13.5, marginTop: 4 }}>
            {ARCHIVE_DATA.length} outputs stored · <span style={{ color: "var(--green)" }}>neural history preserved</span>
          </p>
        </div>
        <button className="btn-p" onClick={() => nav("generate")}>
          <I n="auto_awesome" s={15} /> New Generation
        </button>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { lb: "TOTAL OUTPUTS", val: ARCHIVE_DATA.length.toString(), ic: "history", c: "var(--cyan)" },
          { lb: "TOTAL ENGAGEMENTS", val: totalEng.toLocaleString(), ic: "trending_up", c: "var(--green)" },
          { lb: "AVG WIN RATE", val: `${avgWin}%`, ic: "emoji_events", c: "var(--amber)" },
          { lb: "TOKENS CONSUMED", val: totalTokens.toLocaleString(), ic: "memory", c: "#0d9488" },
        ].map((m, i) => (
          <div key={i} className="glass" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <span className="mono txt-2" style={{ fontSize: 10 }}>{m.lb}</span>
              <div className="icon-box" style={{ width: 28, height: 28, background: `${m.c}18`, border: `1px solid ${m.c}2e` }}>
                <I n={m.ic} s={14} c={m.c} />
              </div>
            </div>
            <div style={{ fontFamily: "var(--ff-disp)", fontWeight: 800, fontSize: 24, letterSpacing: "-.02em" }}>{m.val}</div>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="glass" style={{ padding: "16px 20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <I n="search" s={15} c="var(--txt3)" />
          <input
            className="field"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search outputs..."
            style={{ paddingLeft: 12, height: 38, fontSize: 13 }}
          />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {FILTERS.map(f => (
            <span
              key={f}
              onClick={() => setFilter(f)}
              className={`chip ${filter === f ? "chip-c" : ""}`}
              style={{
                cursor: "pointer",
                background: filter === f ? "rgba(5,150,105,0.09)" : "rgba(5,150,105,.04)",
                color: filter === f ? "var(--cyan)" : "var(--txt3)",
                border: `1px solid ${filter === f ? "rgba(5,150,105,0.3)" : "var(--border)"}`,
                transition: "all var(--t-fast)",
              }}
            >{f}</span>
          ))}
        </div>
        <div style={{ width: 1, height: 24, background: "var(--border)" }} />
        <div style={{ display: "flex", gap: 6 }}>
          {SORT_OPTIONS.map(s => (
            <span
              key={s}
              onClick={() => setSort(s)}
              className={`chip ${sort === s ? "chip-v" : ""}`}
              style={{
                cursor: "pointer",
                background: sort === s ? "rgba(16,185,129,0.09)" : "rgba(5,150,105,.04)",
                color: sort === s ? "#0d9488" : "var(--txt3)",
                border: `1px solid ${sort === s ? "rgba(16,185,129,0.3)" : "var(--border)"}`,
                transition: "all var(--t-fast)",
                fontSize: 10,
              }}
            >{s}</span>
          ))}
        </div>
      </div>

      {/* Archive Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.length === 0 ? (
          <div className="glass" style={{ padding: 48, textAlign: "center" }}>
            <I n="search_off" s={40} c="var(--txt3)" />
            <div className="mono txt-2" style={{ marginTop: 12 }}>No outputs match your filters</div>
          </div>
        ) : (
          filtered.map(item => (
            <div
              key={item.id}
              className="card-out hover-glow"
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
              style={{ transition: "all var(--t-mid)" }}
            >
              {/* Top Row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                  <span style={{
                    fontFamily: "var(--ff-mono)", fontSize: 10, color: item.c,
                    background: `${item.c}18`, border: `1px solid ${item.c}2e`,
                    padding: "2px 9px", borderRadius: 999,
                  }}>{item.pl.toUpperCase()}</span>
                  <span className="chip chip-v">{item.ps}</span>
                </div>
                <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                  <span className={`chip ${item.tag === "VIRAL" || item.tag === "TOP" ? "chip-a" : item.tag === "RISING" ? "chip-g" : "chip-c"}`}>
                    {item.tag}
                  </span>
                  <span className="mono txt-2" style={{ fontSize: 10 }}>{item.time}</span>
                </div>
              </div>

              {/* Content */}
              <p style={{
                color: "var(--txt2)", fontSize: 13.5, lineHeight: 1.55, marginBottom: 10,
                overflow: expanded === item.id ? "visible" : "hidden",
                maxHeight: expanded === item.id ? "none" : "42px",
                transition: "max-height var(--t-mid)",
              }}>
                "{item.txt}"
              </p>

              {/* Bottom Row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: "var(--green)" }}>{item.eng}</span>
                  <span className="mono txt-2" style={{ fontSize: 10 }}>Win: {item.winRate}%</span>
                  <span className="mono txt-2" style={{ fontSize: 10 }}>{item.tokens} tokens</span>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn-g btn-sm" onClick={e => { e.stopPropagation(); navigator.clipboard.writeText(item.txt); }}>
                    <I n="content_copy" s={11} />
                  </button>
                  <button className="btn-g btn-sm" onClick={e => { e.stopPropagation(); nav("generate"); }}>
                    <I n="refresh" s={11} />
                  </button>
                  <button className="btn-g btn-sm" onClick={e => { e.stopPropagation(); }}>
                    <I n="delete" s={11} />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expanded === item.id && (
                <div style={{
                  marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)",
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12,
                }}>
                  <div>
                    <div className="mono txt-2" style={{ fontSize: 9, marginBottom: 4 }}>PLATFORM</div>
                    <div style={{ fontSize: 13, color: item.c }}>{item.pl}</div>
                  </div>
                  <div>
                    <div className="mono txt-2" style={{ fontSize: 9, marginBottom: 4 }}>PERSONA</div>
                    <div style={{ fontSize: 13 }}>{item.ps}</div>
                  </div>
                  <div>
                    <div className="mono txt-2" style={{ fontSize: 9, marginBottom: 4 }}>GENERATED</div>
                    <div style={{ fontSize: 13 }}>{item.date}</div>
                  </div>
                  <div>
                    <div className="mono txt-2" style={{ fontSize: 9, marginBottom: 4 }}>PERFORMANCE</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div className="pt" style={{ flex: 1, height: 4 }}>
                        <div className="pf" style={{
                          width: `${item.winRate}%`,
                          background: item.winRate > 90 ? "var(--green)" : item.winRate > 80 ? "var(--amber)" : "var(--red)",
                        }} />
                      </div>
                      <span className="mono" style={{ fontSize: 11, color: item.winRate > 90 ? "var(--green)" : "var(--amber)" }}>{item.winRate}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
