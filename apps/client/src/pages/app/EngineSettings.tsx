import React, { useState } from 'react';
import { I } from '../../components/Icon';

const INITIAL_SETTINGS = [
  { section: "Model Configuration", items: [
    { label: "Primary Model", value: "claude-3.5-sonnet", type: "select", options: ["claude-3.5-sonnet", "gpt-4-turbo", "llama-3-70b", "mixtral-8x7b"] },
    { label: "Temperature", value: "0.7", type: "range", min: 0, max: 2 },
    { label: "Max Tokens", value: "4096", type: "number" },
    { label: "Top P", value: "0.95", type: "range", min: 0, max: 1 },
  ]},
  { section: "Generation", items: [
    { label: "Auto-retry on failure", value: true, type: "toggle" },
    { label: "Stream responses", value: true, type: "toggle" },
    { label: "Cache generations", value: false, type: "toggle" },
  ]},
  { section: "Rate Limiting", items: [
    { label: "Max requests/minute", value: "60", type: "number" },
    { label: "Cooldown period (seconds)", value: "30", type: "number" },
    { label: "Auto-throttle", value: true, type: "toggle" },
  ]},
];

export function EngineSettings({ nav }: { nav: (path: string) => void }) {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [saved, setSaved] = useState(false);

  const updateSetting = (sIndex: number, iIndex: number, val: any) => {
    const newSettings = [...settings];
    newSettings[sIndex].items[iIndex].value = val;
    setSettings(newSettings);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="enter">
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 className="h-md"><span className="grad-c">Engine Settings</span></h1>
          <p style={{ color: "var(--txt2)", fontSize: 13.5, marginTop: 4 }}>Model configuration & system parameters</p>
        </div>
        <button className="btn-p" onClick={handleSave}><I n="save" s={15} /> Save Changes</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 680 }}>
        {settings.map((s, si) => (
          <div key={si} className="glass" style={{ padding: "22px" }}>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 18 }}>{s.section.toUpperCase()}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {s.items.map((item, ii) => (
                <div key={ii} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{item.label}</span>
                  {item.type === "toggle" ? (
                    <div onClick={() => updateSetting(si, ii, !item.value)} style={{ width: 40, height: 22, borderRadius: 99, background: item.value ? "var(--cyan)" : "var(--txt3)", cursor: "pointer", position: "relative", transition: "all var(--t-fast)" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: item.value ? 21 : 3, transition: "left var(--t-fast)" }} />
                    </div>
                  ) : item.type === "select" ? (
                    <select className="field" style={{ width: 200, padding: "8px 12px", fontSize: 12 }} value={item.value as string} onChange={e => updateSetting(si, ii, e.target.value)}>
                      {item.options?.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input className="field" value={item.value as string} onChange={e => updateSetting(si, ii, e.target.value)} style={{ width: 120, padding: "8px 12px", fontSize: 12, textAlign: "right" }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Toast Notification */}
      {saved && (
        <div style={{ position: "fixed", top: 32, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#059669,#10b981)", color: "#fff", padding: "12px 28px", borderRadius: 999, fontFamily: "var(--ff-mono)", fontSize: 12, letterSpacing: ".02em", boxShadow: "0 8px 32px rgba(5,150,105,.3)", zIndex: 9999, animation: "enter .3s ease", display: "flex", alignItems: "center", gap: 8 }}>
          <I n="check_circle" s={15} /> Successfully changed
        </div>
      )}
    </div>
  );
}
