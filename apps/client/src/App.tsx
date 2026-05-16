import React, { useState } from 'react';
import { Shell } from './layouts/Shell';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Generate } from './pages/app/Generate';
import { ShadowArchive } from './pages/app/ShadowArchive';
import { WorkflowTerminal } from './pages/app/WorkflowTerminal';
import { Arena } from './pages/app/Arena';
import { MemoryMatrix } from './pages/app/MemoryMatrix';
import { PersonasPage } from './pages/app/Personas';
import { Marketplace } from './pages/app/Marketplace';
import { Analytics } from './pages/app/Analytics';
import { SignalFeed } from './pages/app/SignalFeed';
import { NodeCommand } from './pages/app/NodeCommand';
import { GlobalTelemetry } from './pages/app/GlobalTelemetry';
import { Syndicate } from './pages/app/Syndicate';
import { KeyVault } from './pages/app/KeyVault';
import { EngineSettings } from './pages/app/EngineSettings';
import { DevSandbox } from './pages/app/DevSandbox';
import { AccountQuota } from './pages/app/AccountQuota';
import './index.css';

export default function App() {
  const [cur, setCur] = useState("landing");

  // Helper to wrap a page component in the Shell layout
  const shell = (title: string, component: React.ReactNode) => (
    <Shell cur={cur} nav={setCur} title={title}>
      {component}
    </Shell>
  );

  const pages: Record<string, React.ReactNode> = {
    landing: <Landing nav={setCur} />,
    login: <Login nav={setCur} />,
    register: <Register nav={setCur} />,
    dashboard: shell("Dashboard", <Dashboard nav={setCur} />),
    generate: shell("Generate", <Generate nav={setCur} />),
    archive: shell("Archive", <ShadowArchive nav={setCur} />),
    workflow: shell("Workflow", <WorkflowTerminal nav={setCur} />),
    arena: shell("The Arena", <Arena nav={setCur} />),
    memory: shell("Memory Matrix", <MemoryMatrix nav={setCur} />),
    personas: shell("Personas", <PersonasPage nav={setCur} />),
    marketplace: shell("Marketplace", <Marketplace nav={setCur} />),
    analytics: shell("Analytics", <Analytics nav={setCur} />),
    feed: shell("Signal Feed", <SignalFeed nav={setCur} />),
    nodes: shell("Nodes", <NodeCommand nav={setCur} />),
    telemetry: shell("Telemetry", <GlobalTelemetry nav={setCur} />),
    syndicate: shell("Syndicate", <Syndicate nav={setCur} />),
    vault: shell("Key Vault", <KeyVault nav={setCur} />),
    engine: shell("Engine", <EngineSettings nav={setCur} />),
    sandbox: shell("Sandbox", <DevSandbox nav={setCur} />),
    account: shell("Account", <AccountQuota nav={setCur} />),
  };

  const Page = pages[cur] || pages.dashboard;

  return (
    <>
      {Page}
    </>
  );
}
