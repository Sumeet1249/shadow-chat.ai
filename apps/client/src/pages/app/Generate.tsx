import React, { useState, useEffect, useRef } from 'react';
import { I } from '../../components/Icon';

const PLATFORMS = [
  { id: "twitter", label: "Twitter", icon: "tag", color: "#00aaff" },
  { id: "linkedin", label: "LinkedIn", icon: "work", color: "#0077b5" },
  { id: "reddit", label: "Reddit", icon: "forum", color: "#ff4500" },
  { id: "discord", label: "Discord", icon: "headset_mic", color: "#5865f2" },
];

const PERSONAS = [
  { id: "nexus", name: "Nexus Architect", style: "Technical thought leader", color: "#059669" },
  { id: "phantom", name: "Corporate Phantom", style: "Strategic & polished", color: "#0d9488" },
  { id: "ghost", name: "Ghost Analyst", style: "Data-driven contrarian", color: "#f59e0b" },
  { id: "signal", name: "Signal_Zero", style: "Underground alpha", color: "#34d399" },
];

const TONES = ["Authoritative", "Casual", "Provocative", "Analytical", "Witty"];
const LENGTHS = [
  { id: "short", label: "Short", desc: "1-2 sentences" },
  { id: "medium", label: "Medium", desc: "3-5 sentences" },
  { id: "long", label: "Long", desc: "Full thread" },
];

export function Generate({ nav }: { nav: (path: string) => void }) {
  const [platform, setPlatform] = useState("twitter");
  const [persona, setPersona] = useState("nexus");
  const [tone, setTone] = useState("Authoritative");
  const [length, setLength] = useState("medium");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [screenshots, setScreenshots] = useState<{ file: File; preview: string }[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_SCREENSHOTS = 5;

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files)
      .filter(f => f.type.startsWith("image/"))
      .slice(0, MAX_SCREENSHOTS - screenshots.length)
      .map(file => ({ file, preview: URL.createObjectURL(file) }));
    setScreenshots(prev => [...prev, ...newFiles].slice(0, MAX_SCREENSHOTS));
  };

  const removeScreenshot = (index: number) => {
    setScreenshots(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const selectedPersona = PERSONAS.find(p => p.id === persona)!;
  const selectedPlatform = PLATFORMS.find(p => p.id === platform)!;

  // Simulated streaming generation
  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setOutput("");
    setCharCount(0);

    const samples: Record<string, string> = {
      twitter: `The infrastructure problem isn't compute — it's latency at the edge.\n\nWe've been optimizing the wrong bottleneck for 3 years.\n\nHere's what the top 1% of ML teams actually focus on:\n\n→ Edge-first inference pipelines\n→ Speculative decoding at the CDN layer\n→ Quantized models that fit in L2 cache\n\nThe future isn't bigger models. It's smarter deployment.\n\nThread 🧵👇`,
      linkedin: `After 3 years leading ML infrastructure teams at scale, I've noticed one pattern that consistently separates elite engineering organizations from the rest.\n\nIt's deceptively simple: they treat latency as a feature, not a constraint.\n\nThe best teams I've worked with don't ask "how fast can we make this?" — they ask "what experience does this latency enable?"\n\nThis mindset shift changes everything:\n\n• Architecture decisions become user-centric\n• Performance budgets get tied to business outcomes\n• The team stops optimizing for benchmarks and starts optimizing for impact\n\nWhat's the one engineering principle that transformed your team's approach?`,
      reddit: `Honestly, this take fundamentally misses the reward model problem with current RLHF approaches.\n\nThe real issue isn't that RLHF "doesn't work" — it's that most implementations conflate human preference with human values, and those are categorically different optimization targets.\n\nHere's a better framing:\n\n1. Preference data captures what humans *choose*, not what they *want*\n2. Reward models trained on choice data inherit all the biases of the choice architecture\n3. The gap between revealed preference and stated preference is where alignment actually breaks\n\nThe solution isn't "more RLHF" or "less RLHF" — it's decomposing the reward signal into interpretable components that can be independently audited.\n\nSource: spent 18 months on this exact problem.`,
      discord: `ngl the alpha leak yesterday checks out completely\n\nthe architecture changes in their latest commit confirm what we were speculating about\n\nkey findings:\n- they switched from dense to MoE in the attention layers\n- the routing mechanism is NOT standard top-k\n- there's a new gating function that looks suspiciously like what DeepMind patented last month\n\nif this ships in production, we're looking at 3-4x throughput gains with minimal quality loss\n\nthis is gonna shake up the entire inference market 📈`,
    };

    const fullText = samples[platform] || samples.twitter;
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        const chunk = fullText.slice(0, i + 1);
        setOutput(chunk);
        setCharCount(chunk.length);
        i++;
      } else {
        clearInterval(interval);
        setGenerating(false);
      }
    }, 18);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="enter">
      {/* Header */}
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <button className="btn-g btn-sm" onClick={() => nav("dashboard")} style={{ gap: 4 }}>
              <I n="arrow_back" s={13} /> Back
            </button>
          </div>
          <h1 className="h-md">
            <span className="grad-c">New Generation</span>
          </h1>
          <p style={{ color: "var(--txt2)", fontSize: 13.5, marginTop: 4 }}>
            Configure your neural output parameters · <span style={{ color: "var(--cyan)" }}>AI-powered content engine</span>
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-g" onClick={() => { setPrompt(""); setOutput(""); setCharCount(0); }}>
            <I n="refresh" s={15} /> Reset
          </button>
          <button
            className="btn-p"
            onClick={handleGenerate}
            style={{ opacity: generating || !prompt.trim() ? 0.5 : 1, pointerEvents: generating ? "none" : "auto" }}
          >
            {generating ? <span className="spinner" /> : <I n="auto_awesome" s={15} />}
            {generating ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 20 }}>
        {/* Left: Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Platform Selection */}
          <div className="glass" style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
              <I n="language" s={14} c="var(--cyan)" />
              <span className="mono txt-2" style={{ fontSize: 10 }}>TARGET PLATFORM</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {PLATFORMS.map(p => (
                <div
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 9, padding: "11px 14px",
                    background: platform === p.id ? `${p.color}12` : "rgba(5,150,105,.03)",
                    border: `1px solid ${platform === p.id ? `${p.color}44` : "var(--border)"}`,
                    borderRadius: "var(--r-md)", cursor: "pointer",
                    transition: "all var(--t-fast)",
                  }}
                >
                  <I n={p.icon} s={16} c={platform === p.id ? p.color : "var(--txt3)"} />
                  <span style={{
                    fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: ".04em",
                    color: platform === p.id ? p.color : "var(--txt2)",
                  }}>{p.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Persona Selection */}
          <div className="glass" style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
              <I n="psychology" s={14} c="#0d9488" />
              <span className="mono txt-2" style={{ fontSize: 10 }}>PERSONA</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {PERSONAS.map(p => (
                <div
                  key={p.id}
                  onClick={() => setPersona(p.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                    background: persona === p.id ? `${p.color}10` : "rgba(5,150,105,.03)",
                    border: `1px solid ${persona === p.id ? `${p.color}38` : "var(--border)"}`,
                    borderRadius: "var(--r-md)", cursor: "pointer",
                    transition: "all var(--t-fast)",
                  }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${p.color}, ${p.color}55)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: persona === p.id ? `0 0 12px ${p.color}44` : "none",
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--txt)" }}>{p.name[0]}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 12.5, color: persona === p.id ? p.color : "var(--txt)" }}>{p.name}</div>
                    <div className="mono txt-2" style={{ fontSize: 10 }}>{p.style}</div>
                  </div>
                  {persona === p.id && (
                    <I n="check_circle" s={16} c={p.color} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div className="glass" style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
              <I n="tune" s={14} c="var(--amber)" />
              <span className="mono txt-2" style={{ fontSize: 10 }}>TONE</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {TONES.map(t => (
                <span
                  key={t}
                  onClick={() => setTone(t)}
                  className={`chip ${tone === t ? "chip-c" : ""}`}
                  style={{
                    cursor: "pointer",
                    background: tone === t ? "rgba(5,150,105,0.09)" : "rgba(5,150,105,.04)",
                    color: tone === t ? "var(--cyan)" : "var(--txt3)",
                    border: `1px solid ${tone === t ? "rgba(5,150,105,0.3)" : "var(--border)"}`,
                    transition: "all var(--t-fast)",
                  }}
                >{t}</span>
              ))}
            </div>
          </div>

          {/* Length */}
          <div className="glass" style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
              <I n="straighten" s={14} c="var(--green)" />
              <span className="mono txt-2" style={{ fontSize: 10 }}>LENGTH</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {LENGTHS.map(l => (
                <div
                  key={l.id}
                  onClick={() => setLength(l.id)}
                  style={{
                    flex: 1, textAlign: "center", padding: "10px 8px",
                    background: length === l.id ? "rgba(52,211,153,0.08)" : "rgba(5,150,105,.03)",
                    border: `1px solid ${length === l.id ? "rgba(52,211,153,0.3)" : "var(--border)"}`,
                    borderRadius: "var(--r-md)", cursor: "pointer",
                    transition: "all var(--t-fast)",
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 12, color: length === l.id ? "var(--green)" : "var(--txt2)", marginBottom: 2 }}>{l.label}</div>
                  <div className="mono txt-2" style={{ fontSize: 9 }}>{l.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Prompt + Output */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Prompt */}
          <div className="glass" style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <I n="edit_note" s={14} c="var(--cyan)" />
                <span className="mono txt-2" style={{ fontSize: 10 }}>PROMPT</span>
              </div>
              <span className="mono txt-2" style={{ fontSize: 10 }}>{prompt.length} chars</span>
            </div>
            <textarea
              className="field"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe the content you want to generate. Be specific about the topic, angle, and key points to cover..."
              style={{
                minHeight: 140, resize: "vertical", lineHeight: 1.6,
                fontFamily: "var(--ff-body)", fontSize: 14,
              }}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              {["ML infrastructure hot take", "Contrarian market analysis", "Technical deep-dive thread", "Community engagement reply"].map(s => (
                <span
                  key={s}
                  onClick={() => setPrompt(s)}
                  className="chip"
                  style={{
                    cursor: "pointer", background: "rgba(5,150,105,.04)",
                    color: "var(--txt3)", border: "1px solid var(--border)",
                    transition: "all var(--t-fast)", fontSize: 10,
                  }}
                >{s}</span>
              ))}
            </div>
          </div>

          {/* Screenshot Upload */}
          <div className="glass" style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <I n="image" s={14} c="var(--amber)" />
                <span className="mono txt-2" style={{ fontSize: 10 }}>SCREENSHOT REFERENCE</span>
                <span className="chip" style={{ fontSize: 9, padding: "1px 7px", background: "rgba(5,150,105,.04)", color: "var(--txt3)", border: "1px solid var(--border)" }}>OPTIONAL</span>
              </div>
              {screenshots.length > 0 && (
                <span className="mono txt-2" style={{ fontSize: 10 }}>{screenshots.length}/{MAX_SCREENSHOTS}</span>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={e => { handleFiles(e.target.files); e.target.value = ""; }}
              style={{ display: "none" }}
            />

            {/* Drop Zone */}
            <div
              onClick={() => screenshots.length < MAX_SCREENSHOTS && fileInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
              style={{
                padding: screenshots.length > 0 ? "14px" : "28px 14px",
                border: `2px dashed ${dragOver ? "var(--cyan)" : "var(--border)"}`,
                borderRadius: "var(--r-md)",
                background: dragOver ? "rgba(5,150,105,0.05)" : "rgba(255,255,255,.015)",
                cursor: screenshots.length < MAX_SCREENSHOTS ? "pointer" : "default",
                transition: "all var(--t-fast)",
                textAlign: "center",
              }}
            >
              {screenshots.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "rgba(101,163,13,0.08)", border: "1px solid rgba(101,163,13,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <I n="add_photo_alternate" s={22} c="var(--amber)" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--txt2)", marginBottom: 2 }}>
                      Drop screenshots here or <span style={{ color: "var(--cyan)", textDecoration: "underline" }}>browse</span>
                    </div>
                    <div className="mono txt-2" style={{ fontSize: 10 }}>PNG, JPG, WEBP up to 10MB · Max {MAX_SCREENSHOTS} images</div>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {/* Thumbnails */}
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {screenshots.map((ss, i) => (
                      <div key={i} style={{ position: "relative", width: 88, height: 88, borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)", flexShrink: 0 }}>
                        <img
                          src={ss.preview}
                          alt={`Screenshot ${i + 1}`}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                        <div style={{
                          position: "absolute", inset: 0,
                          background: "linear-gradient(to top, rgba(0,0,0,.6), transparent 50%)",
                        }} />
                        <button
                          onClick={e => { e.stopPropagation(); removeScreenshot(i); }}
                          style={{
                            position: "absolute", top: 4, right: 4,
                            width: 20, height: 20, borderRadius: "50%",
                            background: "rgba(0,0,0,.7)", border: "1px solid rgba(255,255,255,.15)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", transition: "all var(--t-fast)",
                          }}
                        >
                          <I n="close" s={12} c="var(--txt2)" />
                        </button>
                        <div className="mono" style={{
                          position: "absolute", bottom: 4, left: 6,
                          fontSize: 9, color: "rgba(255,255,255,.7)",
                        }}>{(ss.file.size / 1024).toFixed(0)}KB</div>
                      </div>
                    ))}

                    {/* Add more button */}
                    {screenshots.length < MAX_SCREENSHOTS && (
                      <div
                        onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
                        style={{
                          width: 88, height: 88, borderRadius: 8,
                          border: "1px dashed var(--border)",
                          background: "rgba(5,150,105,.03)",
                          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                          gap: 4, cursor: "pointer", transition: "all var(--t-fast)",
                          flexShrink: 0,
                        }}
                      >
                        <I n="add" s={20} c="var(--txt3)" />
                        <span className="mono txt-2" style={{ fontSize: 9 }}>Add</span>
                      </div>
                    )}
                  </div>

                  {/* Clear all */}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      className="btn-g btn-sm"
                      onClick={e => {
                        e.stopPropagation();
                        screenshots.forEach(ss => URL.revokeObjectURL(ss.preview));
                        setScreenshots([]);
                      }}
                      style={{ fontSize: 10, padding: "4px 10px" }}
                    >
                      <I n="delete_sweep" s={12} /> Clear All
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Configuration Summary */}
          <div className="glass" style={{ padding: "14px 22px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: selectedPlatform.color }} />
              <span className="mono" style={{ fontSize: 10, color: selectedPlatform.color }}>{selectedPlatform.label.toUpperCase()}</span>
            </div>
            <div style={{ width: 1, height: 16, background: "var(--border)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: selectedPersona.color }} />
              <span className="mono" style={{ fontSize: 10, color: selectedPersona.color }}>{selectedPersona.name}</span>
            </div>
            <div style={{ width: 1, height: 16, background: "var(--border)" }} />
            <span className="mono txt-2" style={{ fontSize: 10 }}>{tone}</span>
            <div style={{ width: 1, height: 16, background: "var(--border)" }} />
            <span className="mono txt-2" style={{ fontSize: 10 }}>{length.toUpperCase()}</span>
            {screenshots.length > 0 && (
              <>
                <div style={{ width: 1, height: 16, background: "var(--border)" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <I n="image" s={12} c="var(--amber)" />
                  <span className="mono" style={{ fontSize: 10, color: "var(--amber)" }}>{screenshots.length} IMG</span>
                </div>
              </>
            )}
          </div>

          {/* Output */}
          <div className="glass" style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <I n="smart_toy" s={14} c="#0d9488" />
                <span className="mono txt-2" style={{ fontSize: 10 }}>OUTPUT</span>
                {generating && <span className="chip chip-c" style={{ fontSize: 9, padding: "2px 8px" }}>STREAMING</span>}
              </div>
              {output && !generating && (
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn-g btn-sm" onClick={() => navigator.clipboard.writeText(output)}>
                    <I n="content_copy" s={11} /> Copy
                  </button>
                  <button className="btn-g btn-sm" onClick={handleGenerate}>
                    <I n="refresh" s={11} /> Regenerate
                  </button>
                </div>
              )}
            </div>
            <div
              ref={outputRef}
              style={{
                flex: 1, minHeight: 200, padding: 16, background: "rgba(5,150,105,.03)",
                border: "1px solid var(--border)", borderRadius: "var(--r-md)",
                overflowY: "auto", position: "relative",
              }}
            >
              {output ? (
                <div style={{ whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.7, color: "var(--txt)" }}>
                  {output}
                  {generating && <span className="blink" style={{ color: "var(--cyan)" }}>▊</span>}
                </div>
              ) : (
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  height: "100%", gap: 12, opacity: 0.5,
                }}>
                  <I n="auto_awesome" s={36} c="var(--txt3)" />
                  <span className="mono txt-2" style={{ fontSize: 11 }}>Enter a prompt and hit Generate</span>
                  <span className="mono txt-2" style={{ fontSize: 10 }}>Output will stream here in real-time</span>
                </div>
              )}
            </div>
            {output && !generating && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                <span className="mono txt-2" style={{ fontSize: 10 }}>{charCount} characters · {output.split(/\s+/).length} words</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn-g btn-sm" onClick={() => nav("archive")}>
                    <I n="save" s={11} /> Save to Archive
                  </button>
                  <button className="btn-p btn-sm">
                    <I n="send" s={11} /> Deploy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
