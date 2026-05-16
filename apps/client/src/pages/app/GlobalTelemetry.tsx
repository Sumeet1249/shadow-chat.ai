import React from 'react';
import { I } from '../../components/Icon';

const METRICS = [
  { label: "Uptime", value: "99.97%", icon: "timer", color: "var(--green)" },
  { label: "Avg Latency", value: "42ms", icon: "speed", color: "var(--cyan)" },
  { label: "Error Rate", value: "0.03%", icon: "error_outline", color: "var(--green)" },
  { label: "Throughput", value: "1.2K/s", icon: "sync", color: "#0d9488" },
];

const EVENTS = [
  { time: "06:42", type: "info", msg: "Health check passed on all nodes" },
  { time: "06:38", type: "warn", msg: "Twitter API rate limit at 82%" },
  { time: "06:30", type: "info", msg: "Memory cleanup completed (freed 128MB)" },
  { time: "06:22", type: "success", msg: "Auto-scaling triggered: NODE-DELTA capacity +25%" },
  { time: "06:15", type: "info", msg: "Model cache refreshed for Nexus Architect" },
  { time: "06:01", type: "error", msg: "Reddit API timeout (retry succeeded)" },
];

export function GlobalTelemetry({ nav }: { nav: (path: string) => void }) {
  return (
    <div className="enter">
      <div style={{ marginBottom: 28 }}>
        <h1 className="h-md"><span className="grad-c">Telemetry</span></h1>
        <p style={{ color: "var(--txt2)", fontSize: 13.5, marginTop: 4 }}>System health & performance monitoring</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
        {METRICS.map((m, i) => (
          <div key={i} className="glass" style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span className="mono txt-2" style={{ fontSize: 10 }}>{m.label.toUpperCase()}</span>
              <I n={m.icon} s={16} c={m.color} />
            </div>
            <div style={{ fontFamily: "var(--ff-disp)", fontWeight: 800, fontSize: 28, color: m.color }}>{m.value}</div>
          </div>
        ))}
      </div>
      <div className="glass" style={{ padding: "20px" }}>
        <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 14 }}>SYSTEM EVENTS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {EVENTS.map((e, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 14px", background: "rgba(5,150,105,.03)", borderRadius: "var(--r-md)", border: "1px solid var(--border)" }}>
              <span className="mono txt-2" style={{ fontSize: 10, flexShrink: 0 }}>{e.time}</span>
              <I n={e.type === "success" ? "check_circle" : e.type === "warn" ? "warning" : e.type === "error" ? "error" : "info"} s={14} c={e.type === "success" ? "var(--green)" : e.type === "warn" ? "var(--amber)" : e.type === "error" ? "var(--red)" : "var(--cyan)"} />
              <span style={{ color: "var(--txt2)", fontSize: 13 }}>{e.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
