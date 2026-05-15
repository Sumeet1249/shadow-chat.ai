import React, { useEffect, useRef } from 'react';

export function ParticleCanvas({ density = 0.5 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number | null>(null);
  
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    
    let W = (c.width = window.innerWidth), H = (c.height = window.innerHeight);
    const count = Math.floor((W * H) / 14000 * density);
    const P = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28,
      r: Math.random() * 1.8 + .4,
      op: Math.random() * .45 + .1,
      ps: Math.random() * .02 + .005,
      pp: Math.random() * Math.PI * 2,
    }));
    const D = 115;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const t = Date.now() * .001;
      for (let i = 0; i < P.length; i++) {
        for (let j = i + 1; j < P.length; j++) {
          const dx = P[i].x - P[j].x, dy = P[i].y - P[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < D) {
            ctx.beginPath(); ctx.moveTo(P[i].x, P[i].y); ctx.lineTo(P[j].x, P[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${(1 - d / D) * .13})`; ctx.lineWidth = .5; ctx.stroke();
          }
        }
      }
      P.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        const pulse = Math.sin(t * p.ps * 60 + p.pp) * .28 + .72;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.op * pulse})`; ctx.fill();
      });
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { 
        if(raf.current) cancelAnimationFrame(raf.current); 
        window.removeEventListener("resize", resize); 
    };
  }, [density]);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: .7 }} />;
}
