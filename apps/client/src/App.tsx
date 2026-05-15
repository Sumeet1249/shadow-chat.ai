import React, { useState } from 'react';
import { Shell } from './layouts/Shell';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import './index.css';

export default function App() {
  const [cur, setCur] = useState("landing");
  const pages: Record<string, React.ReactNode> = {
    landing: <Landing nav={setCur} />,
    login: <Login nav={setCur} />,
    dashboard: (
      <Shell cur={cur} nav={setCur} title="Dashboard">
        <Dashboard nav={setCur} />
      </Shell>
    ),
    // For now, any other route goes to dashboard placeholder
    default: (
      <Shell cur={cur} nav={setCur} title={cur.charAt(0).toUpperCase() + cur.slice(1)}>
        <div style={{ textAlign: "center", paddingTop: "10vh" }}>
          <div className="mono txt-2">// {cur} module not implemented yet</div>
        </div>
      </Shell>
    )
  };

  const Page = pages[cur] || pages.default;

  return (
    <>
      {Page}
    </>
  );
}
