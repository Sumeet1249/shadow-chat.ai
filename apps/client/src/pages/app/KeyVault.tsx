import React, { useState } from 'react';
import { I } from '../../components/Icon';

const INITIAL_KEYS = [
  { id: 1, name: "OpenAI GPT-4", key: "sk-...7xK4", fullKey: "sk-proj-1234567890abcdef", status: "active", usage: 67, limit: "100K tok/day", lastUsed: "2m ago" },
  { id: 2, name: "Anthropic Claude", key: "sk-ant-...9bR2", fullKey: "sk-ant-api03-abcdef123456", status: "active", usage: 42, limit: "50K tok/day", lastUsed: "18m ago" },
  { id: 3, name: "Twitter API v2", key: "tw-...mN8", fullKey: "tw-1234567890-abcdef", status: "active", usage: 82, limit: "500 req/15min", lastUsed: "3m ago" },
  { id: 4, name: "Reddit API", key: "rd-...pQ3", fullKey: "rd-1234567890-abcdef", status: "expired", usage: 0, limit: "100 req/min", lastUsed: "2d ago" },
  { id: 5, name: "Discord Bot Token", key: "dc-...wL5", fullKey: "dc-1234567890-abcdef", status: "active", usage: 31, limit: "Unlimited", lastUsed: "45m ago" },
];

export function KeyVault({ nav }: { nav: (path: string) => void }) {
  const [keys, setKeys] = useState(INITIAL_KEYS);
  const [reveal, setReveal] = useState<number | null>(null);
  const [modal, setModal] = useState({ open: false, name: "", key: "" });

  const handleSave = () => {
    if (!modal.name.trim() || !modal.key.trim()) return;
    const newKey = {
      id: Date.now(),
      name: modal.name.trim(),
      key: modal.key.substring(0, 3) + "-..." + modal.key.substring(modal.key.length - 4),
      fullKey: modal.key,
      status: "active",
      usage: 0,
      limit: "Unlimited",
      lastUsed: "Never"
    };
    setKeys([newKey, ...keys]);
    setModal({ open: false, name: "", key: "" });
  };

  const handleDelete = (id: number) => {
    setKeys(keys.filter(k => k.id !== id));
  };

  return (
    <div className="enter">
      <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 className="h-md"><span className="grad-c">Key Vault</span></h1>
          <p style={{ color: "var(--txt2)", fontSize: 13.5, marginTop: 4 }}>API keys & secrets · <span style={{ color: "var(--green)" }}>encrypted at rest</span></p>
        </div>
        <button className="btn-p" onClick={() => setModal({ open: true, name: "", key: "" })}><I n="add" s={15} /> Add Key</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {keys.map((k) => (
          <div key={k.id} className="glass" style={{ padding: "18px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flex: 1 }}>
                <div className="icon-box" style={{ width: 36, height: 36, background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.18)" }}><I n="key" s={16} c="var(--cyan)" /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{k.name}</span>
                    <span className={`chip ${k.status === "active" ? "chip-g" : "chip-r"}`} style={{ fontSize: 9 }}>{k.status.toUpperCase()}</span>
                  </div>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <span className="mono txt-2" style={{ fontSize: 11 }}>{reveal === k.id ? k.fullKey : k.key}</span>
                    <span className="mono txt-2" style={{ fontSize: 10 }}>Limit: {k.limit}</span>
                    <span className="mono txt-2" style={{ fontSize: 10 }}>Last: {k.lastUsed}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {k.status === "active" && (
                  <div style={{ width: 80 }}>
                    <div className="pt"><div className="pf" style={{ width: `${k.usage}%`, background: k.usage > 80 ? "var(--amber)" : "var(--green)" }} /></div>
                    <div className="mono txt-2" style={{ fontSize: 9, textAlign: "right", marginTop: 2 }}>{k.usage}%</div>
                  </div>
                )}
                <button className="btn-g btn-sm" onClick={() => setReveal(reveal === k.id ? null : k.id)}><I n={reveal === k.id ? "visibility_off" : "visibility"} s={12} /></button>
                <button className="btn-g btn-sm" onClick={() => handleDelete(k.id)}><I n="delete" s={12} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Key Modal */}
      {modal.open && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div className="glass" style={{ width: "100%", maxWidth: 420, padding: 24, display: "flex", flexDirection: "column" }}>
            <h2 className="h-md" style={{ marginBottom: 20 }}>Store API Key</h2>
            
            <div style={{ marginBottom: 16 }}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>PROVIDER / SERVICE NAME</div>
              <input 
                className="field" 
                value={modal.name} 
                onChange={e => setModal({ ...modal, name: e.target.value })} 
                placeholder="e.g. Stripe Live Key" 
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 8 }}>API KEY (ENCRYPTED)</div>
              <input 
                className="field" 
                type="password"
                value={modal.key} 
                onChange={e => setModal({ ...modal, key: e.target.value })} 
                placeholder="sk-..." 
              />
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button className="btn-g" onClick={() => setModal({ ...modal, open: false })}>Cancel</button>
              <button className="btn-p" onClick={handleSave} disabled={!modal.name.trim() || !modal.key.trim()}><I n="lock" s={13} /> Secure Key</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
