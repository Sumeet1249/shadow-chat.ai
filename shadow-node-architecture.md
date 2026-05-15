# SHADOW NODE — FULL-STACK ARCHITECTURE & EXPANSION BLUEPRINT

> Neural Noir Operator Stack · Monorepo Edition · Production-Grade

---

## PART 1 — MONOREPO STRUCTURE

**Toolchain:** Turborepo + npm workspaces · pnpm preferred  
**Strategy:** Two deployable apps (`client`, `server`) + three shared packages. Single `docker-compose.yml` spins the entire stack locally in one command.

```ini {"metadata":"[object Object]"}
shadow-node/                              # repo root
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                        # lint + typecheck + test on every PR
│   │   ├── deploy-client.yml             # build → push to Cloudflare Pages on main
│   │   ├── deploy-server.yml             # build Docker image → push ECR → ECS rolling deploy
│   │   └── infra.yml                     # terraform plan/apply on infra/** changes
│   ├── CODEOWNERS
│   └── pull_request_template.md
│
├── apps/
│   ├── client/                           # ── VITE + REACT 18 FRONTEND ──────────────
│   │   ├── public/
│   │   │   └── favicon.svg
│   │   ├── src/
│   │   │   ├── main.tsx                  # entry · RouterProvider + QueryClientProvider
│   │   │   ├── App.tsx                   # router root
│   │   │   │
│   │   │   ├── styles/
│   │   │   │   ├── tokens.css            # --void, --cyan, --violet … (single source of truth)
│   │   │   │   ├── base.css              # reset · scrollbar · ::selection
│   │   │   │   └── index.css             # @import chain → Tailwind directives
│   │   │   │
│   │   │   ├── design-system/
│   │   │   │   ├── components/
│   │   │   │   │   ├── Button.tsx        # btn-p / btn-g / btn-a · size prop
│   │   │   │   │   ├── Chip.tsx          # variant: cyan|violet|amber|green|red
│   │   │   │   │   ├── GlassCard.tsx     # glass / glass-hi
│   │   │   │   │   ├── Field.tsx         # controlled input · label · error · focus ring
│   │   │   │   │   ├── Icon.tsx          # Lucide wrapper → replaces <I n="…"/>
│   │   │   │   │   ├── Spinner.tsx
│   │   │   │   │   ├── ProgressBar.tsx
│   │   │   │   │   ├── PulseDot.tsx
│   │   │   │   │   └── index.ts          # barrel
│   │   │   │   └── effects/
│   │   │   │       ├── ParticleCanvas.tsx # spatial hash O(n) · Web Worker physics
│   │   │   │       ├── AmbientOrbs.tsx
│   │   │   │       └── ScanlineOverlay.tsx
│   │   │   │
│   │   │   ├── store/
│   │   │   │   ├── useAuthStore.ts       # token · user · login() · logout()
│   │   │   │   ├── usePersonaStore.ts    # activePersonaId · setActivePersona()
│   │   │   │   ├── useNodeStore.ts       # nodeStatuses · updateNodeStatus() · WS feed
│   │   │   │   ├── useUIStore.ts         # cmdPalette · sidebar collapsed
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── router/
│   │   │   │   ├── index.tsx             # createBrowserRouter · all 27 routes · lazy()
│   │   │   │   ├── ProtectedRoute.tsx    # → /login if !authed
│   │   │   │   └── PublicRoute.tsx       # → /dashboard if authed
│   │   │   │
│   │   │   ├── layouts/
│   │   │   │   ├── AppShell.tsx          # AnimatePresence · Outlet · z-layer mgr
│   │   │   │   ├── Sidebar.tsx           # NavLink · useUIStore collapsed state
│   │   │   │   ├── Topbar.tsx
│   │   │   │   ├── StatusBar.tsx         # aria-live="polite" · latency · token count
│   │   │   │   └── CommandPalette.tsx    # focus-trap · ⌘K · Esc · keyboard nav
│   │   │   │
│   │   │   ├── pages/
│   │   │   │   ├── public/
│   │   │   │   │   ├── Landing.tsx
│   │   │   │   │   ├── Login.tsx         # Lucide OAuth icons · no emojis
│   │   │   │   │   ├── Register.tsx
│   │   │   │   │   ├── Onboarding.tsx
│   │   │   │   │   ├── Calibrate.tsx
│   │   │   │   │   ├── Features.tsx
│   │   │   │   │   ├── Pricing.tsx
│   │   │   │   │   └── Changelog.tsx
│   │   │   │   ├── app/
│   │   │   │   │   ├── Dashboard.tsx
│   │   │   │   │   ├── NeuralReply.tsx
│   │   │   │   │   ├── WorkflowTerminal.tsx
│   │   │   │   │   ├── Arena.tsx
│   │   │   │   │   ├── MemoryMatrix.tsx
│   │   │   │   │   ├── Personas/
│   │   │   │   │   │   ├── index.tsx
│   │   │   │   │   │   └── Detail.tsx
│   │   │   │   │   ├── Marketplace.tsx
│   │   │   │   │   ├── Analytics.tsx
│   │   │   │   │   ├── SignalFeed.tsx
│   │   │   │   │   ├── ShadowArchive.tsx
│   │   │   │   │   ├── NodeCommand.tsx
│   │   │   │   │   ├── GlobalTelemetry.tsx
│   │   │   │   │   ├── Syndicate.tsx
│   │   │   │   │   ├── KeyVault.tsx
│   │   │   │   │   ├── EngineSettings.tsx
│   │   │   │   │   ├── DevSandbox.tsx
│   │   │   │   │   ├── AccountQuota.tsx
│   │   │   │   │   └── LiveAudio.tsx
│   │   │   │   └── NotFound.tsx
│   │   │   │
│   │   │   ├── hooks/
│   │   │   │   ├── useCountUp.ts         # animated counter (extracted from Dashboard)
│   │   │   │   ├── useCommandPalette.ts  # ⌘K binding + state
│   │   │   │   ├── useNodeStatus.ts      # WebSocket consumer → useNodeStore
│   │   │   │   └── useStreamingOutput.ts # SSE reader for NeuralReply generation
│   │   │   │
│   │   │   ├── data/
│   │   │   │   ├── nav.ts                # sidebar links config
│   │   │   │   ├── commands.ts           # command palette entries
│   │   │   │   └── mock/                 # stub data → replace with TanStack Query
│   │   │   │       ├── personas.ts
│   │   │   │       ├── nodes.ts
│   │   │   │       ├── outputs.ts
│   │   │   │       └── analytics.ts
│   │   │   │
│   │   │   ├── lib/
│   │   │   │   ├── api.ts                # Axios instance · JWT interceptor · refresh logic
│   │   │   │   └── utils.ts              # cn() · formatDate() · truncate()
│   │   │   │
│   │   │   └── types/                    # re-exports from @shadow/types package
│   │   │       └── index.ts
│   │   │
│   │   ├── index.html                    # Google Fonts preload · no FontLoader hack
│   │   ├── vite.config.ts                # SWC · path aliases @/ · chunk splitting
│   │   ├── tailwind.config.ts            # Neural Noir tokens
│   │   └── tsconfig.json
│   │
│   └── server/                           # ── NESTJS BACKEND ─────────────────────────
│       ├── src/
│       │   ├── main.ts                   # bootstrap · Helmet · global pipes · WS adapter
│       │   ├── app.module.ts             # root module · ConfigModule.forRoot()
│       │   │
│       │   ├── config/
│       │   │   ├── database.config.ts    # PG connection via env
│       │   │   ├── redis.config.ts       # BullMQ + cache
│       │   │   ├── jwt.config.ts         # access (15m) + refresh (7d) strategy
│       │   │   └── ai.config.ts          # per-provider API key resolution
│       │   │
│       │   ├── modules/
│       │   │   │
│       │   │   ├── auth/                 # ── AUTH DOMAIN ──────────────────────────
│       │   │   │   ├── auth.module.ts
│       │   │   │   ├── auth.controller.ts   # POST /auth/login · /register · /refresh · /logout
│       │   │   │   ├── auth.service.ts      # bcrypt · JWT issue · refresh rotation
│       │   │   │   ├── strategies/
│       │   │   │   │   ├── jwt.strategy.ts
│       │   │   │   │   └── refresh.strategy.ts
│       │   │   │   └── guards/
│       │   │   │       ├── jwt-auth.guard.ts
│       │   │   │       └── roles.guard.ts   # RBAC: operator | admin | syndicate
│       │   │   │
│       │   │   ├── users/                # ── USER DOMAIN ──────────────────────────
│       │   │   │   ├── users.module.ts
│       │   │   │   ├── users.controller.ts  # GET /users/me · PATCH profile
│       │   │   │   ├── users.service.ts
│       │   │   │   ├── dto/
│       │   │   │   │   ├── update-user.dto.ts
│       │   │   │   │   └── create-user.dto.ts
│       │   │   │   └── entities/
│       │   │   │       └── user.entity.ts   # Prisma model mirror
│       │   │   │
│       │   │   ├── personas/             # ── PERSONA DOMAIN ───────────────────────
│       │   │   │   ├── personas.module.ts
│       │   │   │   ├── personas.controller.ts  # CRUD /personas · /personas/:id/activate
│       │   │   │   ├── personas.service.ts
│       │   │   │   ├── dto/
│       │   │   │   │   ├── create-persona.dto.ts
│       │   │   │   │   └── update-persona.dto.ts
│       │   │   │   └── entities/
│       │   │   │       └── persona.entity.ts
│       │   │   │
│       │   │   ├── generation/           # ── AI GENERATION DOMAIN ─────────────────
│       │   │   │   ├── generation.module.ts
│       │   │   │   ├── generation.controller.ts # POST /generate (SSE stream)
│       │   │   │   ├── generation.service.ts    # routes to correct adapter
│       │   │   │   ├── adapters/
│       │   │   │   │   ├── base.adapter.ts      # abstract interface all LLMs implement
│       │   │   │   │   ├── openai.adapter.ts
│       │   │   │   │   ├── anthropic.adapter.ts
│       │   │   │   │   ├── gemini.adapter.ts
│       │   │   │   │   └── local-llm.adapter.ts # Ollama / vLLM local inference
│       │   │   │   └── dto/
│       │   │   │       └── generate.dto.ts      # platform · personaId · tone · content
│       │   │   │
│       │   │   ├── nodes/                # ── NODE COMMAND DOMAIN ──────────────────
│       │   │   │   ├── nodes.module.ts
│       │   │   │   ├── nodes.controller.ts      # CRUD + /nodes/:id/deploy · /toggle
│       │   │   │   ├── nodes.service.ts         # provisions infra via Pulumi SDK calls
│       │   │   │   ├── nodes.gateway.ts         # @WebSocketGateway → live telemetry push
│       │   │   │   └── entities/
│       │   │   │       └── node.entity.ts       # region · status · health · lastPing
│       │   │   │
│       │   │   ├── vault/                # ── KEY VAULT DOMAIN ─────────────────────
│       │   │   │   ├── vault.module.ts
│       │   │   │   ├── vault.controller.ts      # POST/GET/DELETE /vault/keys
│       │   │   │   ├── vault.service.ts         # AES-256-GCM encrypt at rest
│       │   │   │   └── entities/
│       │   │   │       └── api-key.entity.ts    # userId · service · ciphertext · iv
│       │   │   │
│       │   │   ├── memory/               # ── MEMORY MATRIX DOMAIN ─────────────────
│       │   │   │   ├── memory.module.ts
│       │   │   │   ├── memory.controller.ts     # CRUD /memory · semantic search /memory/recall
│       │   │   │   ├── memory.service.ts        # pgvector similarity search
│       │   │   │   └── entities/
│       │   │   │       └── memory.entity.ts     # content · embedding · personaId · tags
│       │   │   │
│       │   │   ├── archive/              # ── SHADOW ARCHIVE DOMAIN ────────────────
│       │   │   │   ├── archive.module.ts
│       │   │   │   ├── archive.controller.ts    # GET /archive · full-text search
│       │   │   │   ├── archive.service.ts
│       │   │   │   └── entities/
│       │   │   │       └── output.entity.ts     # generatedText · platform · tokens · cost
│       │   │   │
│       │   │   ├── analytics/            # ── ANALYTICS DOMAIN ─────────────────────
│       │   │   │   ├── analytics.module.ts
│       │   │   │   ├── analytics.controller.ts  # GET /analytics/summary · /breakdown
│       │   │   │   └── analytics.service.ts     # aggregation queries · TimescaleDB ext
│       │   │   │
│       │   │   ├── workflows/            # ── WORKFLOW TERMINAL DOMAIN ─────────────
│       │   │   │   ├── workflows.module.ts
│       │   │   │   ├── workflows.controller.ts  # CRUD + POST /workflows/:id/run
│       │   │   │   ├── workflows.service.ts     # BullMQ job dispatch
│       │   │   │   └── jobs/
│       │   │   │       ├── workflow.processor.ts # @Processor('workflow-queue')
│       │   │   │       └── scheduled.processor.ts # cron-based autonomous runs
│       │   │   │
│       │   │   ├── syndicate/            # ── SYNDICATE (TEAMS) DOMAIN ─────────────
│       │   │   │   ├── syndicate.module.ts
│       │   │   │   ├── syndicate.controller.ts  # invite · remove · role · workspace
│       │   │   │   └── syndicate.service.ts
│       │   │   │
│       │   │   └── telemetry/            # ── GLOBAL TELEMETRY DOMAIN ──────────────
│       │   │       ├── telemetry.module.ts
│       │   │       ├── telemetry.controller.ts  # GET /telemetry/geo · /latency
│       │   │       └── telemetry.service.ts     # node ping aggregation · geo resolve
│       │   │
│       │   ├── prisma/
│       │   │   ├── schema.prisma         # canonical schema — all entities
│       │   │   ├── migrations/           # auto-generated via prisma migrate dev
│       │   │   └── seed.ts               # dev seed: 1 user · 2 personas · 3 nodes
│       │   │
│       │   ├── common/
│       │   │   ├── decorators/
│       │   │   │   ├── current-user.decorator.ts
│       │   │   │   └── roles.decorator.ts
│       │   │   ├── filters/
│       │   │   │   └── http-exception.filter.ts  # uniform error shape
│       │   │   ├── guards/
│       │   │   │   └── throttle.guard.ts          # rate limit by userId tier
│       │   │   ├── interceptors/
│       │   │   │   ├── logging.interceptor.ts
│       │   │   │   └── response-transform.interceptor.ts
│       │   │   └── pipes/
│       │   │       └── zod-validation.pipe.ts
│       │   │
│       │   └── health/
│       │       └── health.controller.ts  # GET /health → Terminus DB + Redis check
│       │
│       ├── test/
│       │   ├── unit/                     # Jest unit tests per module
│       │   └── e2e/                      # Supertest integration tests
│       │
│       ├── Dockerfile                    # multi-stage: build → slim runtime
│       ├── nest-cli.json
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   ├── types/                            # @shadow/types — shared across client + server
│   │   ├── src/
│   │   │   ├── persona.ts
│   │   │   ├── node.ts
│   │   │   ├── platform.ts               # 'twitter'|'instagram'|'linkedin'|'tiktok'…
│   │   │   ├── generation.ts             # GenerateRequest · GenerateResponse · StreamChunk
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── eslint-config/                    # @shadow/eslint-config
│   │   ├── base.js                       # shared rules: no-console · import/order
│   │   ├── react.js                      # extends base + react-hooks
│   │   ├── node.js                       # extends base + node
│   │   └── package.json
│   │
│   └── tokens/                           # @shadow/tokens — design tokens as JS/CSS
│       ├── src/
│       │   ├── colors.ts                 # { void: '#040810', cyan: '#00e5ff', … }
│       │   ├── typography.ts
│       │   ├── spacing.ts
│       │   └── index.ts
│       ├── tokens.css                    # compiled CSS vars (generated by build script)
│       └── package.json
│
├── infra/                                # ── INFRASTRUCTURE AS CODE ───────────────
│   ├── terraform/
│   │   ├── main.tf                       # provider AWS · root module wiring
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── modules/
│   │       ├── ecs/                      # Fargate cluster · task def · service
│   │       │   ├── main.tf
│   │       │   └── variables.tf
│   │       ├── rds/                      # PostgreSQL 16 Aurora Serverless v2
│   │       │   ├── main.tf
│   │       │   └── variables.tf
│   │       ├── elasticache/              # Redis 7 cluster for BullMQ + cache
│   │       │   └── main.tf
│   │       ├── ecr/                      # Docker image registry
│   │       │   └── main.tf
│   │       └── cloudfront/              # CDN for client build artifacts
│   │           └── main.tf
│   └── scripts/
│       ├── migrate.sh                    # prisma migrate deploy in ECS one-off task
│       └── seed-prod.sh
│
├── docker/
│   ├── docker-compose.yml                # local: client + server + postgres + redis
│   ├── docker-compose.prod.yml           # prod override: no volumes, resource limits
│   ├── Dockerfile.client                 # nginx:alpine serving Vite build
│   └── Dockerfile.server                 # node:20-slim multi-stage
│
├── turbo.json                            # pipeline: build → test → lint (parallel)
├── package.json                          # pnpm workspaces root
├── pnpm-workspace.yaml
├── .env.example                          # ALL env vars documented, no defaults
└── README.md
```

---

## DATABASE SCHEMA — PRISMA (Key Models)

```prisma {"metadata":"[object Object]"}
// prisma/schema.prisma

model User {
  id          String    @id @default(cuid())
  email       String    @unique
  passwordHash String
  role        Role      @default(OPERATOR)
  tier        Tier      @default(FREE)           // quota enforcement
  workspaceId String?                            // null = solo operator
  personas    Persona[]
  apiKeys     ApiKey[]
  outputs     Output[]
  createdAt   DateTime  @default(now())
}

model Persona {
  id           String    @id @default(cuid())
  userId       String
  user         User      @relation(fields: [userId], references: [id])
  name         String
  handle       String
  niche        String
  voiceConfig  Json      // tone, style, vocabulary, forbidden words
  platforms    String[]  // ['twitter', 'instagram']
  memories     Memory[]
  outputs      Output[]
  isActive     Boolean   @default(false)
}

model Node {
  id         String     @id @default(cuid())
  name       String
  region     String                           // 'us-east-1' | 'eu-west-1' …
  provider   String                           // 'aws' | 'gcp' | 'azure'
  status     NodeStatus @default(IDLE)
  lastPing   DateTime?
  latencyMs  Int?
  userId     String
}

model ApiKey {
  id          String   @id @default(cuid())
  userId      String
  service     String                           // 'openai' | 'anthropic' …
  ciphertext  String                           // AES-256-GCM encrypted
  iv          String
  tag         String
  label       String?
  createdAt   DateTime @default(now())
}

model Memory {
  id        String   @id @default(cuid())
  personaId String
  persona   Persona  @relation(fields: [personaId], references: [id])
  content   String
  embedding Unsupported("vector(1536)")        // pgvector
  tags      String[]
  createdAt DateTime @default(now())
}

model Output {
  id          String   @id @default(cuid())
  userId      String
  personaId   String
  platform    String
  inputPrompt String
  outputText  String
  model       String
  tokensIn    Int
  tokensOut   Int
  costUsd     Float
  createdAt   DateTime @default(now())

  @@index([userId, createdAt(sort: Desc)])     // archive pagination
}

model Workflow {
  id         String           @id @default(cuid())
  userId     String
  name       String
  steps      Json             // ordered step definitions
  schedule   String?          // cron expression for autonomous mode
  lastRunAt  DateTime?
  status     WorkflowStatus   @default(IDLE)
}

enum Role   { OPERATOR ADMIN SYNDICATE_ADMIN }
enum Tier   { FREE PRO ENTERPRISE }
enum NodeStatus   { ACTIVE IDLE ERROR DEPLOYING }
enum WorkflowStatus { IDLE RUNNING PAUSED ERROR }
```

---

## CI/CD PIPELINE — GITHUB ACTIONS

```yaml {"metadata":"[object Object]"}
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  lint-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - run: pnpm install --frozen-lockfile
      - run: pnpm turbo lint typecheck        # parallel across all packages

  test-server:
    runs-on: ubuntu-latest
    services:
      postgres: { image: pgvector/pgvector:pg16, env: { POSTGRES_PASSWORD: test } }
      redis:    { image: redis:7-alpine }
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - run: pnpm install --frozen-lockfile
      - run: pnpm --filter server test:e2e

  build-client:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - run: pnpm install --frozen-lockfile
      - run: pnpm --filter client build
      - run: pnpm --filter client exec vite-bundle-visualizer --json
      # Fail if main chunk > 80kb gzipped
      - run: node scripts/check-bundle-size.mjs

# .github/workflows/deploy-server.yml
  deploy:
    if: github.ref == 'refs/heads/main'
    needs: [lint-typecheck, test-server]
    steps:
      - uses: aws-actions/configure-aws-credentials@v4
      - run: |
          docker build -t $ECR_REGISTRY/shadow-server:$SHA .
          docker push $ECR_REGISTRY/shadow-server:$SHA
          aws ecs update-service --force-new-deployment …
      - run: bash infra/scripts/migrate.sh    # prisma migrate deploy
```

---

## PART 2 — EXPANSION BLUEPRINT

### Phase A — AI & MODEL SCALING

*Target: Plug-in any LLM without touching generation logic*

```ini {"metadata":"[object Object]"}
Architecture: Adapter Registry Pattern
  generation.service.ts resolves adapter at runtime from Vault key metadata

adapters/
  base.adapter.ts          # interface: generate(dto) → AsyncIterable<StreamChunk>
  openai.adapter.ts        # GPT-4o · o3-mini · image: DALL·E 3
  anthropic.adapter.ts     # Claude 3.5 Sonnet · Claude 4
  gemini.adapter.ts        # Gemini 1.5 Pro · multimodal video frames
  local-llm.adapter.ts     # Ollama / vLLM · self-hosted finetunes
  image.adapter.ts         # unified image gen: DALL·E | Stable Diffusion | Midjourney API
  video.adapter.ts         # Sora | Runway Gen-3 | Kling — influencer clip gen
  tts.adapter.ts           # ElevenLabs | Play.ht — persona voice synthesis
  stt.adapter.ts           # Deepgram — LiveAudio transcription
```

| Capability | Adapter | Unlock |
|---|---|---|
| New LLM (Llama 3.3, Mistral) | `local-llm.adapter.ts` config entry | Zero code change |
| Image gen for persona posts | `image.adapter.ts` | POST /generate?mode=image |
| Video clips for Reels/TikTok | `video.adapter.ts` | POST /generate?mode=video |
| Custom finetune | Model string in Vault key | Runtime model routing |
| Arena ELO comparison | `generation.service.ts` parallel call | Already designed for it |

---

### Phase B — PLATFORM INTEGRATION

*Target: Add TikTok, Threads, Telegram with zero backend rewrite*

```ini {"metadata":"[object Object]"}
Plugin Architecture: Platform Adapter Registry

platforms/
  base.platform.ts         # interface: post(content, credentials) → PlatformResult
  twitter.platform.ts      # Twitter API v2 · OAuth 2.0 PKCE
  instagram.platform.ts    # Instagram Graph API · media upload flow
  linkedin.platform.ts     # LinkedIn v2 API
  tiktok.platform.ts       # TikTok for Developers API v2           [Phase B-1]
  threads.platform.ts      # Threads API (Meta)                     [Phase B-1]
  telegram.platform.ts     # Bot API · channel broadcasting         [Phase B-2]
  bluesky.platform.ts      # AT Protocol · DID resolution           [Phase B-2]
  youtube.platform.ts      # Data API v3 · Shorts / Community       [Phase B-3]
```

**Credential flow:** Each platform's OAuth tokens encrypted in Vault, fetched by platform adapter at post time. Adding a new platform = one new adapter file + one Vault key type. No schema migration needed.

**UI surface:** Marketplace page ships new platform "modules" — operator installs from Shadow Marketplace, Vault stores OAuth token, platform appears in generation dropdowns. Identical to VS Code extension model.

---

### Phase C — ENTERPRISE & MULTI-TENANT

*Target: Solo operator → Syndicate agency → Enterprise org*

```ini {"metadata":"[object Object]"}
Tenant Model:
  Workspace
    ├── Owner (SYNDICATE_ADMIN)
    ├── Members (OPERATOR)
    ├── Shared Personas (workspace-scoped)
    ├── Shared Nodes (pool)
    └── Shared Vault keys (team API keys)
```

| Concern | Implementation |
|---|---|
| __Workspace partitioning__ | All queries filter by `workspaceId`; Prisma global middleware enforces RLS |
| __RBAC__ | `Role` enum: `OPERATOR \| ADMIN \| SYNDICATE_ADMIN`; `@Roles()` decorator + guard |
| __Quota / rate limiting__ | `Tier` enum drives throttle guard; BullMQ concurrency limits per tier |
| __Billing__ | Stripe webhook → update `tier` + `quotaTokens` on User; metered billing per token output |
| __Audit log__ | Prisma middleware writes `AuditLog` row on every mutation (who, what, when, workspaceId) |
| __Isolated Vault__ | Workspace-scoped API keys; personal keys invisible to teammates |
| __Seats__ | `WorkspaceMember` join table; seat count enforced at invite time by tier |

---

### Phase D — AUTONOMOUS WORKFLOWS

*Target: "Generate on demand" → "Fully autonomous scheduled agents"*

```yaml {"metadata":"[object Object]"}
Autonomy Stack:
  BullMQ (Redis-backed)
    ├── workflow-queue     # immediate execution jobs
    ├── scheduled-queue    # cron-triggered (node-cron in processor)
    └── retry-queue        # exponential backoff on platform post failures

Workflow Step Types (stored as JSON in Workflow.steps):
  { type: "generate",  config: { personaId, platform, topic } }
  { type: "post",      config: { platform, delay: "5m" } }
  { type: "reply",     config: { monitorKeyword, personaId } }
  { type: "condition", config: { metric: "engagement", threshold: 0.02 } }
  { type: "wait",      config: { duration: "2h" } }
  { type: "notify",    config: { channel: "telegram", message: "…" } }
```

**Autonomy Levels:**

| Level | Trigger | Human Loop |
|---|---|---|
| 0 — On Demand | Operator clicks Generate | Full review before post |
| 1 — Scheduled Draft | Cron generates, queues for review | Operator approves in feed |
| 2 — Auto-Post | Cron generates + posts | Review after (archive) |
| 3 — Reactive | Monitor engagement → auto-reply | Policy rules only |
| 4 — Fully Autonomous | Agent loop: monitor → generate → post → analyze → adapt | Exception alerts only |

Level 4 is gated behind Enterprise tier. Workflow processor runs the agent loop, persisting state to `Workflow.steps` JSON between cycles. Operator retains kill-switch via `PATCH /workflows/:id { status: 'PAUSED' }`.

---

## DEPLOYMENT TOPOLOGY

```ini {"metadata":"[object Object]"}
Production (AWS)
├── CloudFront CDN
│   └── → S3/Cloudflare Pages (Vite build artifacts)
├── ALB (Application Load Balancer)
│   └── → ECS Fargate (NestJS server · auto-scale 2–20 tasks)
├── Aurora PostgreSQL 16 (Serverless v2 · pgvector extension)
├── ElastiCache Redis 7 (BullMQ + session cache)
├── ECR (Docker image registry)
└── Secrets Manager (master encryption key for Vault)

Local Dev (one command)
  docker-compose up --build
  → client :5173 (Vite HMR)
  → server :3000 (NestJS)
  → postgres :5432
  → redis :6379
  → pgAdmin :5050
```

---

## TECH DECISION MATRIX

| Concern | Choice | Rejected | Reason |
|---|---|---|---|
| Frontend build | Vite + SWC | CRA, Next.js | No SSR needed; instant HMR |
| Backend framework | NestJS | Express, Fastify | Module system maps 1:1 to domain model; DI built-in |
| Database | PostgreSQL 16 + pgvector | MongoDB, Supabase | Relational integrity + vector search in one engine |
| Queue | BullMQ + Redis | SQS, RabbitMQ | No AWS lock-in for self-hosted; excellent DX |
| State (client) | Zustand + TanStack Query | Redux, Jotai | Minimal boilerplate; Query handles server state |
| Encryption (Vault) | AES-256-GCM (node:crypto) | HashiCorp Vault | Sufficient for V1; migrate to HCV at Enterprise scale |
| Monorepo | Turborepo + pnpm | Nx, Lerna | Fastest build caching; minimal config |
| IaC | Terraform | Pulumi, CDK | Largest ecosystem; team familiarity |
| Auth | JWT RS256 + refresh rotation | Sessions, Clerk | Full control; no third-party dependency on critical path |
| Deployment | ECS Fargate | EC2, Lambda | Serverless ops without cold-start latency on WS connections |
