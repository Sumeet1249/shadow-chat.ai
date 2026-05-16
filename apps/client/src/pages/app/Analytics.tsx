import React, { useState } from 'react';
import { I } from '../../components/Icon';

const CHART_DATA = [64, 72, 58, 85, 91, 78, 95, 88, 92, 87, 96, 89];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const PLATFORM_STATS = [
  { pl: "Twitter", posts: 284, eng: "48.2K", growth: "+18%", topPost: "2,847 eng", c: "#00aaff" },
  { pl: "LinkedIn", posts: 156, eng: "12.8K", growth: "+24%", topPost: "1,234 reactions", c: "#0077b5" },
  { pl: "Reddit", posts: 342, eng: "28.4K", growth: "+9%", topPost: "1,892 upvotes", c: "#ff4500" },
  { pl: "Discord", posts: 198, eng: "8.9K", growth: "+31%", topPost: "342 replies", c: "#5865f2" },
];

export function Analytics({ nav }: { nav: (path: string) => void }) {
  const max = Math.max(...CHART_DATA);
  return (
    <div className="enter">
      <div style={{ marginBottom: 28 }}>
        <h1 className="h-md"><span className="grad-c">Analytics</span></h1>
        <p style={{ color: "var(--txt2)", fontSize: 13.5, marginTop: 4 }}>Performance insights across all platforms</p>
      </div>
      {/* Chart */}
      <div className="glass" style={{ padding: "22px", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
          <span className="mono txt-2" style={{ fontSize: 10 }}>WIN RATE — 12 MONTHS</span>
          <span className="chip chip-g">TRENDING UP</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 140 }}>
          {CHART_DATA.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <span className="mono" style={{ fontSize: 9, color: "var(--txt3)" }}>{v}%</span>
              <div style={{ width: "100%", height: `${(v / max) * 100}%`, borderRadius: 4, background: "linear-gradient(to top, rgba(5,150,105,.7), rgba(16,185,129,.4))", minHeight: 8 }} />
              <span className="mono txt-2" style={{ fontSize: 8 }}>{MONTHS[i]}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Platform Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {PLATFORM_STATS.map((p, i) => (
          <div key={i} className="glass" style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <span className="mono" style={{ fontSize: 10, color: p.c }}>{p.pl.toUpperCase()}</span>
              <span className="mono" style={{ fontSize: 10, color: "var(--green)" }}>{p.growth}</span>
            </div>
            <div style={{ fontFamily: "var(--ff-disp)", fontWeight: 800, fontSize: 24, marginBottom: 4 }}>{p.eng}</div>
            <div className="mono txt-2" style={{ fontSize: 10, marginBottom: 10 }}>engagements</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="mono txt-2" style={{ fontSize: 10 }}>{p.posts} posts</span>
              <span className="mono txt-2" style={{ fontSize: 10 }}>Top: {p.topPost}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
