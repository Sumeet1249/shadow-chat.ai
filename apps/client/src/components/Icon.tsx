import React from 'react';

export const I = ({ n, s = 18, c }: { n: string, s?: number, c?: string }) => (
  <span className="material-symbols-outlined" style={{ fontSize: s, lineHeight: 1, color: c, flexShrink: 0 }}>{n}</span>
);
