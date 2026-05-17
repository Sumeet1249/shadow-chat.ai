import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute, AdminRoute, PublicRoute } from './guards'
import { AppShell } from '@/layouts/AppShell'
import { SkeletonList } from '@/design-system/feedback/Skeleton'
import { ErrorBoundary } from '@/design-system/feedback/ErrorBoundary'

// ── Public Pages — lazy loaded ──────────────────────────────────
const Landing    = lazy(() => import('@/pages/public/Landing'))
const Login      = lazy(() => import('@/pages/public/Login'))
const Register   = lazy(() => import('@/pages/public/Register'))
const Onboarding = lazy(() => import('@/pages/public/Onboarding'))
const Calibrate  = lazy(() => import('@/pages/public/Calibrate'))
const Features   = lazy(() => import('@/pages/public/Features'))
const Changelog  = lazy(() => import('@/pages/public/Changelog'))
const Pricing    = lazy(() => import('@/pages/public/Pricing'))
const NotFound   = lazy(() => import('@/pages/NotFound'))

// ── App Pages — lazy loaded ─────────────────────────────────────
const Dashboard       = lazy(() => import('@/pages/app/Dashboard'))
const NeuralReply     = lazy(() => import('@/pages/app/NeuralReply'))
const WorkflowTerminal = lazy(() => import('@/pages/app/WorkflowTerminal'))
const Arena           = lazy(() => import('@/pages/app/Arena'))
const PersonaSetup    = lazy(() => import('@/pages/app/Personas'))
const PersonaDetail   = lazy(() => import('@/pages/app/Personas/Detail'))
const Marketplace     = lazy(() => import('@/pages/app/Marketplace'))
const Analytics       = lazy(() => import('@/pages/app/Analytics'))
const GlobalTelemetry = lazy(() => import('@/pages/app/GlobalTelemetry'))
const SystemTelemetry = lazy(() => import('@/pages/app/SystemTelemetry'))
const SignalFeed      = lazy(() => import('@/pages/app/SignalFeed'))
const LiveAudio       = lazy(() => import('@/pages/app/LiveAudio'))
const ShadowArchive   = lazy(() => import('@/pages/app/ShadowArchive'))
const NodeCommand     = lazy(() => import('@/pages/app/NodeCommand'))
const Syndicate       = lazy(() => import('@/pages/app/Syndicate'))
const MemoryMatrix    = lazy(() => import('@/pages/app/MemoryMatrix'))
const KeyVault        = lazy(() => import('@/pages/app/KeyVault'))
const EngineSettings  = lazy(() => import('@/pages/app/EngineSettings'))
const DevSandbox      = lazy(() => import('@/pages/app/DevSandbox'))
const AccountQuota    = lazy(() => import('@/pages/app/AccountQuota'))

const CheckoutPage    = lazy(() => import('@/payments/CheckoutPage'))
const CheckoutSuccess = lazy(() => import('@/payments/CheckoutSuccess'))
const CheckoutCancel  = lazy(() => import('@/payments/CheckoutCancel'))

const PageSkeleton = () => (
  <div className="enter p-8">
    <SkeletonList count={4} />
  </div>
)

const wrap = (element: React.ReactNode) => (
  <ErrorBoundary level="page">
    <Suspense fallback={<PageSkeleton />}>
      {element}
    </Suspense>
  </ErrorBoundary>
)

export const router = createBrowserRouter([
  // ── Public routes ──────────────────────────────────────────────
  {
    path: '/',
    element: wrap(<Landing />),
  },
  {
    path: '/login',
    element: wrap(<PublicRoute><Login /></PublicRoute>),
  },
  {
    path: '/register',
    element: wrap(<PublicRoute><Register /></PublicRoute>),
  },
  {
    path: '/onboarding',
    element: wrap(<Onboarding />),
  },
  {
    path: '/calibrate',
    element: wrap(<Calibrate />),
  },
  {
    path: '/features',
    element: wrap(<Features />),
  },
  {
    path: '/changelog',
    element: wrap(<Changelog />),
  },
  {
    path: '/pricing',
    element: wrap(<Pricing />),
  },

  // ── Authenticated app routes (inside AppShell) ─────────────────
  {
    element: <ProtectedRoute><AppShell /></ProtectedRoute>,
    children: [
      { path: '/dashboard',        element: wrap(<Dashboard />) },
      { path: '/generate',         element: wrap(<NeuralReply />) },
      { path: '/workflow',         element: wrap(<WorkflowTerminal />) },
      { path: '/arena',            element: wrap(<Arena />) },
      { path: '/memory',           element: wrap(<MemoryMatrix />) },
      { path: '/personas',         element: wrap(<PersonaSetup />) },
      { path: '/personas/:id',     element: wrap(<PersonaDetail />) },
      { path: '/marketplace',      element: wrap(<Marketplace />) },
      { path: '/analytics',        element: wrap(<Analytics />) },
      { path: '/feed',             element: wrap(<SignalFeed />) },
      { path: '/archive',          element: wrap(<ShadowArchive />) },
      { path: '/nodes',            element: wrap(<NodeCommand />) },
      { path: '/telemetry',        element: wrap(<GlobalTelemetry />) },
      { path: '/system',           element: wrap(<SystemTelemetry />) },
      { path: '/syndicate',        element: wrap(<Syndicate />) },
      { path: '/vault',            element: wrap(<KeyVault />) },
      { path: '/engine',           element: wrap(<EngineSettings />) },
      { path: '/sandbox',          element: <AdminRoute>{wrap(<DevSandbox />)}</AdminRoute> },
      { path: '/account',          element: wrap(<AccountQuota />) },
      { path: '/audio',            element: wrap(<LiveAudio />) },
    ],
  },

  // ── Protected checkout flow (no AppShell) ──────────────────────
  {
    path: '/checkout',
    element: (
      <ProtectedRoute>
        {wrap(<CheckoutPage />)}
      </ProtectedRoute>
    ),
  },
  {
    path: '/checkout/success',
    element: (
      <ProtectedRoute>
        {wrap(<CheckoutSuccess />)}
      </ProtectedRoute>
    ),
  },
  {
    path: '/checkout/cancel',
    element: (
      <ProtectedRoute>
        {wrap(<CheckoutCancel />)}
      </ProtectedRoute>
    ),
  },

  // /sandbox is handled inside the AppShell children above (no duplicate needed)

  // ── Catch-all ──────────────────────────────────────────────────
  {
    path: '/404',
    element: wrap(<NotFound />),
  },
  {
    path: '*',
    element: wrap(<NotFound />),
  },
])
