# Shadow Node — Full Backend Architecture & Integration Master Document

> **Scope:** This document consolidates all five phases of the Shadow Node backend engineering workflow — from frontend reverse-engineering through architecture design, integration strategy, API contract, and execution plan.

---

## Table of Contents

1. [Phase 1 — Ingestion & Reverse-Engineering](#phase-1)
   - 1.1 [Complete Frontend Entity Map](#11-complete-frontend-entity-map)
   - 1.2 [All API Endpoints Required](#12-all-api-endpoints-required)
   - 1.3 [Mock Data → Real Data Mapping](#13-mock-data--real-data-mapping)
2. [Phase 2 — Architecture & Database Design](#phase-2)
   - 2.1 [Tech Stack Recommendation](#21-tech-stack-recommendation)
   - 2.2 [System Architecture](#22-system-architecture)
   - 2.3 [Database Schema](#23-database-schema)
   - 2.4 [Security & Performance](#24-security--performance)
3. [Phase 3 — Integration Strategy](#phase-3)
   - 3.1 [API Consumption Layer](#31-api-consumption-layer)
   - 3.2 [State Management Strategy](#32-state-management-strategy)
   - 3.3 [Error Handling Strategy](#33-error-handling-strategy)
4. [Phase 4 — API Contract](#phase-4)
5. [Phase 5 — Actionable Execution Plan](#phase-5)

---

# Phase 1 — Ingestion & Reverse-Engineering {#phase-1}

> **Method:** Every page, store, and DevSandbox allowed path was analyzed line-by-line to extract the precise data contract the backend must fulfill.

---

## 1.1 Complete Frontend Entity Map

| Entity | Source File(s) | Fields Extracted |
|--------|---------------|-----------------|
| **User** | `useAuthStore.ts`, `AccountQuota.tsx`, `Register.tsx` | `id`, `handle`, `email`, `password_hash`, `role` (`admin`/`user`), `plan` (`free`/`starter`/`pro`), `created_at` |
| **Persona** | `Personas.tsx`, `PersonaDetail.tsx`, `NeuralReply.tsx` | `id`, `user_id`, `name`, `tone`, `niche`, `traits`, `status` (`active`/`idle`), `creativity` (0–100), `formality` (0–100), `assertiveness` (0–100), `uses`, `wins`, `replies`, `avg_eng`, `gradient`, `created_at` |
| **Persona–Platform join** | `PersonaDetail.tsx` | `persona_id`, `platform` |
| **Memory Unit** | `MemoryMatrix.tsx`, `PersonaDetail.tsx` | `id`, `user_id`, `persona_id` (nullable), `key`, `tag`, `description`, `status` (`INJECTED`/`OFFLINE`), `created_at` |
| **Node** | `NodeCommand.tsx`, `Dashboard.tsx`, `useNodeStore.ts` | `id`, `user_id`, `name`, `platform`, `status` (`active`/`idle`/`error`), `health` (0–100), `uptime`, `requests`, `cpu`, `memory`, `created_at` |
| **Generation** | `NeuralReply.tsx`, `ShadowArchive.tsx`, `Dashboard.tsx` | `id`, `user_id`, `persona_id`, `platform`, `prompt`, `output`, `tokens_used`, `latency_ms`, `engagement`, `tag` (`VIRAL`/`HIGH`/`TOP`/`ACTIVE`), `created_at` |
| **Arena Battle** | `Arena.tsx` | `id`, `user_id`, `prompt`, `model_a`, `output_a`, `model_b`, `output_b`, `winner`, `elo_a_before`, `elo_b_before`, `elo_a_after`, `elo_b_after`, `created_at` |
| **API Key (Vault)** | `KeyVault.tsx` | `id`, `user_id`, `label`, `provider`, `encrypted_key`, `added_at`, `last_used_at` |
| **Engine Config** | `EngineSettings.tsx` | `id`, `user_id`, `model`, `temperature`, `top_p`, `max_tokens`, `streaming`, `updated_at` |
| **Marketplace Template** | `Marketplace.tsx` | `id`, `author_id`, `name`, `category`, `tone`, `description`, `rating`, `installs`, `char`, `color`, `created_at` |
| **Syndicate Member** | `Syndicate.tsx` | `id`, `owner_id`, `user_id`, `role` (`Owner`/`Admin`/`Operator`), `invited_at`, `joined_at` |
| **Plan** | `Pricing.tsx`, `AccountQuota.tsx`, `Sidebar.tsx` | `id`, `name`, `price`, `generations_quota`, `node_quota`, `memory_quota`, `persona_quota` |
| **Invoice** | `AccountQuota.tsx` | `id`, `user_id`, `stripe_invoice_id`, `amount`, `status` (`PAID`/`PENDING`/`FAILED`), `created_at` |
| **Feed Event** | `SignalFeed.tsx` | `id`, `user_id`, `title`, `persona` (nullable), `platform` (nullable), `type` (`GENERATED`/`VIRAL`/`OPERATIONAL`/`WARNING`/`TOP`), `created_at` |
| **Analytics Snapshot** | `Analytics.tsx` | `id`, `user_id`, `period`, `total_replies`, `engagement_rate`, `avg_latency`, `win_rate`, `platform_breakdown` (JSON), `persona_breakdown` (JSON), `snapshot_at` |

---

## 1.2 All API Endpoints Required

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | handle, email, password |
| `POST` | `/api/auth/login` | email, password → sets HttpOnly cookie |
| `POST` | `/api/auth/logout` | clears HttpOnly cookie |
| `GET` | `/api/auth/me` | returns User object |
| `POST` | `/api/auth/oauth/google` | OAuth flow |
| `POST` | `/api/auth/oauth/github` | OAuth flow |

### Personas

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/personas` | returns Persona[] |
| `POST` | `/api/personas` | create persona |
| `GET` | `/api/personas/:id` | returns single Persona |
| `PUT` | `/api/personas/:id` | update persona |
| `DELETE` | `/api/personas/:id` | delete persona |
| `POST` | `/api/personas/:id/clone` | duplicate persona |
| `PATCH` | `/api/personas/:id/status` | toggle active/idle |

### Generations

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/generate` | persona_id, platform, prompt → streams SSE output |
| `GET` | `/api/generations` | paginated list for Archive |
| `GET` | `/api/generations/recent` | Dashboard feed |
| `DELETE` | `/api/generations/:id` | delete generation |

### Arena

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/arena/battle` | prompt, model_a, model_b → streams SSE dual outputs |
| `POST` | `/api/arena/battle/:id/vote` | winner |
| `GET` | `/api/arena/history` | Battle[] |

### Nodes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/nodes` | Node[] |
| `POST` | `/api/nodes` | deploy node |
| `PATCH` | `/api/nodes/:id/status` | start/stop |
| `POST` | `/api/nodes/halt-all` | emergency override |
| `GET` | `/api/nodes/:id/logs` | log stream |

### Memory

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/memory` | MemoryUnit[] |
| `POST` | `/api/memory` | create unit |
| `DELETE` | `/api/memory/:id` | delete unit |
| `PATCH` | `/api/memory/:id/status` | inject/offline |

### Key Vault

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/vault/keys` | masked key list (never full key) |
| `POST` | `/api/vault/keys` | add encrypted key |
| `DELETE` | `/api/vault/keys/:id` | delete key |
| `GET` | `/api/vault/keys/:id/reveal` | full key (30-second reveal, audit-logged) |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/analytics/summary?period=7d` | AnalyticsSnapshot |
| `GET` | `/api/analytics/platforms?period=7d` | platform breakdown |
| `GET` | `/api/analytics/personas?period=7d` | persona breakdown |

### Engine Settings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/engine/config` | EngineConfig |
| `PUT` | `/api/engine/config` | save settings |

### Marketplace

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/marketplace` | Template[] |
| `POST` | `/api/marketplace/install/:id` | clone template to user personas |

### Syndicate

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/syndicate/members` | Member[] |
| `POST` | `/api/syndicate/invite` | email, role |
| `PATCH` | `/api/syndicate/members/:id/role` | update role |
| `DELETE` | `/api/syndicate/members/:id` | remove member |

### Account & Billing

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/account/quota` | current usage vs limits |
| `PUT` | `/api/account/profile` | update handle/email |
| `GET` | `/api/billing/invoices` | Invoice[] |
| `POST` | `/checkout/cancel-subscription` | cancel plan |
| `POST` | `/checkout/create-session` | Stripe checkout session |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | health check |
| `GET` | `/api/system/logs` | admin only |
| `GET` | `/api/telemetry/global` | region/node stats |
| `GET` | `/api/telemetry/system` | cpu/ram/net/disk metrics |

### Feed

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/feed` | FeedEvent[] (paginated) |
| `GET` | `/api/feed/stream` | **Server-Sent Events** for real-time feed |

---

## 1.3 Mock Data → Real Data Mapping

| Current Mock | Replace With |
|---|---|
| `MOCK_OUTPUTS` in Dashboard/Archive | `GET /api/generations/recent` + `GET /api/generations` |
| `MOCK_PERSONAS` in NeuralReply/PersonaDetail | `GET /api/personas` |
| `MOCK_NODES` in NodeCommand | `GET /api/nodes` |
| `PLANS` from `@/data/plans` | Static config or `GET /api/plans` |
| `VAULT_KEYS` in KeyVault | `GET /api/vault/keys` |
| `MEMBERS` in Syndicate | `GET /api/syndicate/members` |
| `TEMPLATES` in Marketplace | `GET /api/marketplace` |
| `MEMORIES` in MemoryMatrix | `GET /api/memory` |
| Hardcoded stats in Analytics | `GET /api/analytics/summary?period=` |
| Hardcoded feed in SignalFeed | `GET /api/feed` + SSE stream |
| LATENCY/TOKEN in StatusBar | `GET /api/engine/config` |
| `generate()` RAF simulation in NeuralReply | `POST /api/generate` with SSE |
| `startBattle()` RAF simulation in Arena | `POST /api/arena/battle` with SSE |

---

# Phase 2 — Architecture & Database Design {#phase-2}

---

## 2.1 Tech Stack Recommendation

### Backend: Node.js + Express (TypeScript)

**Why Node.js over Python/FastAPI or Laravel:**

1. **SSE/Streaming is the core feature.** NeuralReply and Arena both stream AI output token-by-token (currently simulated with RAF). Node.js's non-blocking event loop handles hundreds of concurrent SSE streams without spawning threads. The frontend is already TypeScript — one language across the full stack reduces cognitive overhead and enables shared type contracts.

2. **The frontend already uses Axios with `withCredentials: true`.** Node + Express has the most mature CORS + cookie session middleware (`cookie-parser`, `cors`, `express-session`) that maps directly to the `HttpOnly` cookie pattern already implemented in `useAuthStore.ts`.

3. **The AI providers (OpenAI, Anthropic, Google) all have first-class Node SDKs** (`openai`, `@anthropic-ai/sdk`, `@google/generative-ai`) with native streaming support. This is the generate endpoint's most critical requirement.

4. **The DevSandbox is already TypeScript.** Shared utility logic is possible across the stack.

### Database: PostgreSQL

**Why PostgreSQL over MongoDB:**

The data is heavily relational: Users → Personas → Generations → Analytics. The quota system (`generations_quota`, `node_quota`) requires transactional `SELECT FOR UPDATE` to prevent race conditions when incrementing usage counts. MongoDB's eventual consistency model is wrong for billing-adjacent data. PostgreSQL's `JSONB` columns handle `platform_breakdown` and `persona_breakdown` analytics fields without sacrificing relational integrity.

**Supporting Services:**
- **Redis** — session store, rate-limit counters, SSE fan-out cache
- **Stripe** — subscription billing (`/checkout` routes already in frontend)
- **OpenAI / Anthropic / Google AI** — LLM providers for generation

### Complete Stack

```
Runtime:     Node.js 22 LTS
Language:    TypeScript 5.5
Framework:   Express 5
Database:    PostgreSQL 16
Cache/Queue: Redis 7
ORM:         Prisma 5
Auth:        express-session + connect-pg-simple (HttpOnly cookie)
Payments:    Stripe SDK
AI:          openai, @anthropic-ai/sdk
Validation:  Zod
Testing:     Vitest + Supertest
Deploy:      Docker + docker-compose
```

---

## 2.2 System Architecture

**Pattern: Modular Monolith**

Not microservices. The frontend is a single SPA serving one user context. Microservices would introduce network hops between Auth, Generation, Analytics — adding latency to the very metric the StatusBar prominently displays (`LATENCY 42ms`). A modular monolith delivers the same code separation with none of the distributed systems overhead.

```
┌─────────────────────────────────────────────────────┐
│                   FRONTEND (Vite SPA)                │
│  React + TanStack Query + Zustand + HttpOnly Cookie  │
└────────────────────┬────────────────────────────────┘
                     │ HTTPS + withCredentials
                     │
┌────────────────────▼────────────────────────────────┐
│              EXPRESS API SERVER (Node.js)            │
│                                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │  /auth   │ │/personas │ │/generate │ │ /arena │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────┘ │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │  /nodes  │ │ /memory  │ │  /vault  │ │  /feed │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────┘ │
│  ┌──────────┐ ┌────────────┐ ┌──────────────────┐  │
│  │/analytics│ │  /checkout │ │  /telemetry      │  │
│  └──────────┘ └────────────┘ └──────────────────┘  │
│                                                      │
│  Middleware: session | auth-guard | rate-limit | zod │
└────────────┬────────────────┬───────────────────────┘
             │                │
   ┌─────────▼──┐      ┌──────▼──────┐
   │ PostgreSQL  │      │   Redis     │
   │  (Prisma)  │      │  sessions   │
   └────────────┘      │  rate-limit │
                       │  SSE cache  │
                       └─────────────┘
             │
   ┌─────────▼──────────────────┐
   │  External AI Providers      │
   │  OpenAI / Anthropic / Gemini│
   └─────────────────────────────┘
             │
   ┌─────────▼──┐
   │   Stripe    │
   │  (billing)  │
   └────────────┘
```

---

## 2.3 Database Schema

```sql
-- ═══════════════════════════════════════════════
-- SHADOW NODE — POSTGRESQL SCHEMA
-- ═══════════════════════════════════════════════

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── USERS ─────────────────────────────────────
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  handle          VARCHAR(32)  NOT NULL UNIQUE,
  email           VARCHAR(255) NOT NULL UNIQUE,
  password_hash   TEXT,
  role            VARCHAR(16)  NOT NULL DEFAULT 'user'
                  CHECK (role IN ('user','admin')),
  plan            VARCHAR(32)  NOT NULL DEFAULT 'free'
                  CHECK (plan IN ('free','starter','pro')),
  stripe_customer_id VARCHAR(64) UNIQUE,
  stripe_subscription_id VARCHAR(64),
  plan_renews_at  TIMESTAMPTZ,
  quota_reset_at  TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '1 month'),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe_customer ON users(stripe_customer_id);

-- ── OAUTH ACCOUNTS ────────────────────────────
CREATE TABLE oauth_accounts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider    VARCHAR(32) NOT NULL,
  provider_id VARCHAR(128) NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (provider, provider_id)
);
CREATE INDEX idx_oauth_user ON oauth_accounts(user_id);

-- ── PLANS (static reference) ──────────────────
CREATE TABLE plans (
  id                  VARCHAR(32) PRIMARY KEY,
  name                VARCHAR(64) NOT NULL,
  price_cents         INTEGER NOT NULL DEFAULT 0,
  generations_quota   INTEGER NOT NULL,
  node_quota          INTEGER NOT NULL,
  memory_quota        INTEGER NOT NULL,
  persona_quota       INTEGER NOT NULL,
  stripe_price_id     VARCHAR(64)
);
INSERT INTO plans VALUES
  ('free',    'Free Operator', 0,     500,   2, 5,  2),
  ('starter', 'Starter',       2900,  5000,  4, 10, 5),
  ('pro',     'Pro',           9900,  25000, 8, 25, 15);

-- ── USAGE COUNTERS (billing-safe) ─────────────
CREATE TABLE usage (
  user_id          UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  generations      INTEGER NOT NULL DEFAULT 0,
  node_connections INTEGER NOT NULL DEFAULT 0,
  memory_units     INTEGER NOT NULL DEFAULT 0,
  persona_slots    INTEGER NOT NULL DEFAULT 0,
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── PERSONAS ──────────────────────────────────
CREATE TABLE personas (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name          VARCHAR(128) NOT NULL,
  tone          VARCHAR(64)  NOT NULL,
  niche         VARCHAR(64)  NOT NULL,
  traits        TEXT,
  status        VARCHAR(16)  NOT NULL DEFAULT 'active'
                CHECK (status IN ('active','idle')),
  creativity    SMALLINT NOT NULL DEFAULT 72 CHECK (creativity BETWEEN 0 AND 100),
  formality     SMALLINT NOT NULL DEFAULT 50 CHECK (formality BETWEEN 0 AND 100),
  assertiveness SMALLINT NOT NULL DEFAULT 70 CHECK (assertiveness BETWEEN 0 AND 100),
  gradient      VARCHAR(64),
  uses_count    INTEGER NOT NULL DEFAULT 0,
  wins_count    INTEGER NOT NULL DEFAULT 0,
  replies_count INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_personas_user ON personas(user_id);

-- ── PERSONA PLATFORMS ─────────────────────────
CREATE TABLE persona_platforms (
  persona_id  UUID NOT NULL REFERENCES personas(id) ON DELETE CASCADE,
  platform    VARCHAR(32) NOT NULL
              CHECK (platform IN ('Twitter','LinkedIn','Reddit','Discord',
                                  'Email','WhatsApp','Instagram','Threads','TikTok')),
  PRIMARY KEY (persona_id, platform)
);

-- ── MEMORY UNITS ──────────────────────────────
CREATE TABLE memory_units (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  persona_id  UUID REFERENCES personas(id) ON DELETE SET NULL,
  key         VARCHAR(128) NOT NULL,
  tag         VARCHAR(64),
  description TEXT NOT NULL,
  status      VARCHAR(16) NOT NULL DEFAULT 'INJECTED'
              CHECK (status IN ('INJECTED','OFFLINE')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_memory_user ON memory_units(user_id);
CREATE INDEX idx_memory_persona ON memory_units(persona_id);

-- ── NODES ─────────────────────────────────────
CREATE TABLE nodes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        VARCHAR(64) NOT NULL,
  platform    VARCHAR(32) NOT NULL,
  status      VARCHAR(16) NOT NULL DEFAULT 'idle'
              CHECK (status IN ('active','idle','error')),
  health      SMALLINT NOT NULL DEFAULT 100 CHECK (health BETWEEN 0 AND 100),
  uptime      VARCHAR(32),
  requests    INTEGER NOT NULL DEFAULT 0,
  cpu         SMALLINT DEFAULT 0,
  memory      SMALLINT DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_nodes_user ON nodes(user_id);
CREATE INDEX idx_nodes_status ON nodes(status);

-- ── GENERATIONS ───────────────────────────────
CREATE TABLE generations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  persona_id  UUID REFERENCES personas(id) ON DELETE SET NULL,
  platform    VARCHAR(32) NOT NULL,
  prompt      TEXT NOT NULL,
  output      TEXT NOT NULL,
  tokens_used INTEGER NOT NULL DEFAULT 0,
  latency_ms  INTEGER,
  engagement  INTEGER NOT NULL DEFAULT 0,
  tag         VARCHAR(16)
              CHECK (tag IN ('VIRAL','HIGH','TOP','ACTIVE')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_generations_user ON generations(user_id);
CREATE INDEX idx_generations_persona ON generations(persona_id);
CREATE INDEX idx_generations_created ON generations(created_at DESC);

-- ── ARENA BATTLES ─────────────────────────────
CREATE TABLE arena_battles (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  prompt       TEXT NOT NULL,
  model_a      VARCHAR(64) NOT NULL,
  output_a     TEXT,
  model_b      VARCHAR(64) NOT NULL,
  output_b     TEXT,
  winner       VARCHAR(64),
  elo_a_before INTEGER NOT NULL DEFAULT 1000,
  elo_b_before INTEGER NOT NULL DEFAULT 1000,
  elo_a_after  INTEGER,
  elo_b_after  INTEGER,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_battles_user ON arena_battles(user_id);

-- ── MODEL ELO RATINGS ─────────────────────────
CREATE TABLE model_elo (
  model_id    VARCHAR(64) PRIMARY KEY,
  model_name  VARCHAR(128) NOT NULL,
  provider    VARCHAR(64)  NOT NULL,
  elo         INTEGER NOT NULL DEFAULT 1000,
  battles     INTEGER NOT NULL DEFAULT 0,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
INSERT INTO model_elo VALUES
  ('claude-3-5-sonnet','Claude 3.5 Sonnet','Anthropic',1247,0,NOW()),
  ('gpt-4o','GPT-4o','OpenAI',1198,0,NOW());

-- ── API KEY VAULT ─────────────────────────────
CREATE TABLE vault_keys (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  label           VARCHAR(128) NOT NULL,
  provider        VARCHAR(64)  NOT NULL,
  encrypted_key   TEXT NOT NULL,
  key_preview     VARCHAR(24)  NOT NULL,
  last_used_at    TIMESTAMPTZ,
  reveal_count    INTEGER NOT NULL DEFAULT 0,
  added_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_vault_user ON vault_keys(user_id);

-- ── ENGINE CONFIG ─────────────────────────────
CREATE TABLE engine_configs (
  user_id     UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  model       VARCHAR(64) NOT NULL DEFAULT 'claude-3-5-sonnet',
  temperature SMALLINT NOT NULL DEFAULT 72 CHECK (temperature BETWEEN 0 AND 100),
  top_p       SMALLINT NOT NULL DEFAULT 90 CHECK (top_p BETWEEN 0 AND 100),
  max_tokens  SMALLINT NOT NULL DEFAULT 280 CHECK (max_tokens BETWEEN 50 AND 4096),
  streaming   BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── MARKETPLACE TEMPLATES ─────────────────────
CREATE TABLE marketplace_templates (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id   UUID REFERENCES users(id) ON DELETE SET NULL,
  name        VARCHAR(128) NOT NULL,
  category    VARCHAR(64)  NOT NULL,
  tone        VARCHAR(64)  NOT NULL,
  description TEXT NOT NULL,
  rating      NUMERIC(3,1) NOT NULL DEFAULT 0.0,
  installs    INTEGER NOT NULL DEFAULT 0,
  gradient    VARCHAR(64),
  is_public   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_marketplace_public ON marketplace_templates(is_public, installs DESC);

-- ── SYNDICATE (TEAMS) ─────────────────────────
CREATE TABLE syndicates (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id    UUID NOT NULL REFERENCES users(id),
  name        VARCHAR(128) NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE syndicate_members (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  syndicate_id UUID NOT NULL REFERENCES syndicates(id) ON DELETE CASCADE,
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role         VARCHAR(16) NOT NULL DEFAULT 'Operator'
               CHECK (role IN ('Owner','Admin','Operator')),
  invited_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  joined_at    TIMESTAMPTZ,
  UNIQUE (syndicate_id, user_id)
);
CREATE INDEX idx_syndicate_members_user ON syndicate_members(user_id);

-- ── INVOICES ──────────────────────────────────
CREATE TABLE invoices (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_invoice_id VARCHAR(64) UNIQUE NOT NULL,
  amount_cents      INTEGER NOT NULL,
  status            VARCHAR(16) NOT NULL DEFAULT 'PENDING'
                    CHECK (status IN ('PAID','PENDING','FAILED')),
  invoice_number    VARCHAR(32),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_invoices_user ON invoices(user_id, created_at DESC);

-- ── FEED EVENTS ───────────────────────────────
CREATE TABLE feed_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  persona_id  UUID REFERENCES personas(id) ON DELETE SET NULL,
  platform    VARCHAR(32),
  type        VARCHAR(32) NOT NULL
              CHECK (type IN ('GENERATED','VIRAL','OPERATIONAL','WARNING','TOP','ALERT')),
  icon        VARCHAR(64),
  color       VARCHAR(32),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_feed_user_time ON feed_events(user_id, created_at DESC);

-- ── ANALYTICS SNAPSHOTS ───────────────────────
CREATE TABLE analytics_snapshots (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  period              VARCHAR(8) NOT NULL,
  total_replies       INTEGER NOT NULL DEFAULT 0,
  engagement_rate     NUMERIC(5,2),
  avg_latency_ms      INTEGER,
  win_rate            NUMERIC(5,2),
  platform_breakdown  JSONB,
  persona_breakdown   JSONB,
  snapshot_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_analytics_user_period ON analytics_snapshots(user_id, period, snapshot_at DESC);

-- ── AUDIT LOG ─────────────────────────────────
CREATE TABLE audit_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action      VARCHAR(64) NOT NULL,
  resource_id UUID,
  ip_address  INET,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_audit_user ON audit_log(user_id, created_at DESC);
```

---

## 2.4 Security & Performance

### Authentication: HttpOnly Cookie Sessions

```
Session flow:
1. POST /api/auth/login → validate → generate session ID → store in Redis
2. Set-Cookie: sn_session=<id>; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800
3. Every subsequent request: Express reads cookie → Redis lookup → attach user to req
4. POST /api/auth/logout → Redis DELETE session → Set-Cookie: sn_session=; Max-Age=0
```

**Session storage: Redis** — sub-millisecond session validation. Session TTL: 7 days rolling.

### Password Security

- Bcrypt with cost factor **12**
- Login lockout after **3 failures** — Redis key `login_attempts:{email}` with 60s TTL
- The frontend's 60-second countdown in `Login.tsx` mirrors this lockout; backend enforces the same

### API Key Encryption (Vault)

- Keys encrypted with **AES-256-GCM** before storage
- Encryption key stored in `VAULT_ENCRYPTION_KEY` environment variable — never in DB
- `key_preview` stores only masked format: `sk-••••••••••••8fQa` (first 3 + last 4)
- Every reveal writes to `audit_log`
- Rate limit: max **5 reveals per hour** per user

### Rate Limiting

| Endpoint Group | Limit | Window |
|---|---|---|
| `POST /api/auth/login` | 10 | 15 min |
| `POST /api/auth/register` | 5 | 1 hour |
| `POST /api/generate` | per plan quota | 1 month |
| `POST /api/arena/battle` | 20 | 1 hour |
| `GET /api/vault/keys/:id/reveal` | 5 | 1 hour |
| All other authenticated | 300 | 1 min |

Rate limiting stored in Redis via `express-rate-limit` + `rate-limit-redis`.

### Quota Enforcement

The `usage` table tracks monthly counters. On `POST /api/generate`:

1. `SELECT FOR UPDATE` on `usage` row
2. Check `generations < plan.generations_quota`
3. If within quota: proceed + `UPDATE usage SET generations = generations + 1`
4. If exceeded: `429 Too Many Requests` with `X-Quota-Reset` header

### Caching Strategy

| Data | Cache | TTL |
|---|---|---|
| `GET /api/analytics/summary` | Redis | 5 min |
| `GET /api/marketplace` | Redis | 10 min |
| `GET /api/telemetry/global` | Redis | 30 sec |
| `GET /api/plans` | In-memory (static) | ∞ |
| Session validation | Redis | rolling 7d |

### CORS Configuration

```typescript
cors({
  origin: process.env.FRONTEND_URL,   // exact origin, never '*'
  credentials: true,                   // required for cookies
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
})
```

### SSE Architecture

`POST /api/generate` returns `Content-Type: text/event-stream`. Each token from the AI SDK is forwarded as a `data:` SSE event. Connection cleanup on client disconnect via `req.on('close')`.

### Architecture Decision Summary

| Decision | Choice | Reason |
|---|---|---|
| Framework | Node.js + Express | SSE streaming, TypeScript parity, AI SDK ecosystem |
| Database | PostgreSQL 16 | Relational integrity for quota/billing, JSONB for analytics |
| Cache | Redis 7 | Session store, rate limiting, SSE event cache |
| Auth | HttpOnly Cookie Sessions | Already required by frontend `useAuthStore.ts` |
| ORM | Prisma 5 | TypeScript-first, matches frontend type system |
| Payments | Stripe | Already referenced in `AccountQuota.tsx` + `Pricing.tsx` |
| Architecture | Modular Monolith | Single SPA context, SSE latency requirements |
| AI Keys | User-owned (Vault) | Keys belong to users, backend proxies requests |
| Deployment | Docker + docker-compose | Reproducible across dev/staging/prod |

---

# Phase 3 — Integration Strategy {#phase-3}

---

## 3.1 API Consumption Layer

**Stack:** TanStack Query v5 (server-state) + Axios (transport). Raw `useState` + `useEffect` for data fetching must be eliminated entirely.

### Axios Instance — `src/lib/api.ts`

```typescript
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4000',
  withCredentials: true,          // Required — HttpOnly cookie sessions
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
});

// Global response interceptor — handles 401 without per-hook logic
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearSession();
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);
```

### TanStack Query Setup — `src/main.tsx`

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,        // 30s — matches Redis cache TTLs
      retry: (failureCount, error: any) =>
        error?.response?.status !== 401 && failureCount < 2,
      refetchOnWindowFocus: true,
    },
  },
});
```

### Query Hook Pattern — Canonical Example

```typescript
// src/hooks/usePersonas.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Persona } from '@/types/entities';

export const personaKeys = {
  all: ['personas'] as const,
  detail: (id: string) => ['personas', id] as const,
};

export function usePersonas() {
  return useQuery({
    queryKey: personaKeys.all,
    queryFn: () => api.get<Persona[]>('/api/personas').then(r => r.data),
  });
}

export function useCreatePersona() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePersonaDTO) =>
      api.post<Persona>('/api/personas', payload).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: personaKeys.all }),
  });
}

export function useDeletePersona() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/api/personas/${id}`),
    onMutate: async (id) => {
      // Optimistic removal
      await qc.cancelQueries({ queryKey: personaKeys.all });
      const prev = qc.getQueryData<Persona[]>(personaKeys.all);
      qc.setQueryData(personaKeys.all, (old: Persona[]) =>
        old.filter(p => p.id !== id));
      return { prev };
    },
    onError: (_err, _id, ctx) =>
      qc.setQueryData(personaKeys.all, ctx?.prev),
    onSettled: () =>
      qc.invalidateQueries({ queryKey: personaKeys.all }),
  });
}
```

Apply this pattern identically for: `useNodes`, `useMemory`, `useVaultKeys`, `useGenerations`, `useSyndicate`, `useAnalytics`, `useMarketplace`.

### SSE Streaming Hook — `src/hooks/useGenerationStream.ts`

```typescript
export function useGenerationStream() {
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<'idle'|'streaming'|'done'|'error'>('idle');
  const esRef = useRef<EventSource | null>(null);

  const generate = useCallback(async (payload: GenerateDTO) => {
    setOutput('');
    setStatus('streaming');

    // POST to create the generation job, receive stream token
    const { data } = await api.post<{ streamToken: string }>('/api/generate', payload);

    const es = new EventSource(
      `${import.meta.env.VITE_API_URL}/api/generate/stream/${data.streamToken}`,
      { withCredentials: true }
    );
    esRef.current = es;

    es.onmessage = (e) => {
      if (e.data === '[DONE]') { es.close(); setStatus('done'); return; }
      setOutput(prev => prev + e.data);
    };
    es.onerror = () => { es.close(); setStatus('error'); };
  }, []);

  const abort = useCallback(() => {
    esRef.current?.close();
    setStatus('idle');
  }, []);

  return { output, status, generate, abort };
}
```

---

## 3.2 State Management Strategy

**Rule: Zustand owns auth identity only. TanStack Query owns all server state.**

| State Type | Owner | Why |
|---|---|---|
| `user`, `isAuthenticated` | Zustand (`useAuthStore`) | Survives route changes, available to Sidebar/StatusBar without re-fetch |
| `personas`, `nodes`, `generations` | TanStack Query | Server truth; invalidated on mutation |
| `engineConfig`, `quotaUsage` | TanStack Query | Server truth; polled every 60s |
| `streamingOutput`, `battleOutputs` | Local `useState` in component | Ephemeral; never needs persistence |
| `selectedPersonaId`, `activeTab` | Local `useState` / URL params | UI-only; no server round-trip needed |

**Auth store stays minimal:**

```typescript
// src/store/useAuthStore.ts — only these fields
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (u: User) => void;
  clearSession: () => void;
}
```

On app boot, `App.tsx` calls `GET /api/auth/me` once via TanStack Query. On success → `setUser()`. On 401 → `clearSession()` + redirect to `/login`. The cookie is the source of truth; Zustand is the in-memory projection.

---

## 3.3 Error Handling Strategy

### Layer 1 — Axios Interceptor (Global)

Handles 401 (session expired) universally. No per-component redirect logic.

### Layer 2 — TanStack Query Error Boundary

```tsx
// src/components/QueryErrorBoundary.tsx
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

export function QueryErrorBoundary({ children }: PropsWithChildren) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div className="error-panel">
          <p>{error.message}</p>
          <button onClick={resetErrorBoundary}>Retry</button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
```

### Layer 3 — Mutation Toast Feedback

```typescript
onError: (err: AxiosError<ApiError>) => {
  const message = err.response?.data?.message ?? 'Something went wrong';
  toast.error(message);
}
```

### Layer 4 — Form Validation Errors (422)

Backend responds with Zod-shaped errors:

```json
{
  "errors": {
    "name": "Name must be at least 2 characters",
    "tone": "Tone is required"
  }
}
```

Frontend extracts and sets on the form:

```typescript
onError: (err: AxiosError<ValidationError>) => {
  const errors = err.response?.data?.errors ?? {};
  Object.entries(errors).forEach(([field, msg]) =>
    form.setError(field as keyof FormData, { message: msg as string })
  );
}
```

### Layer 5 — Quota Exceeded (429)

```typescript
if (err.response?.status === 429) {
  const resetAt = err.response.headers['x-quota-reset'];
  showQuotaModal({ resetAt });
  return;
}
```

### Timeout Handling

Axios `timeout: 15_000` fires `ECONNABORTED`. Caught globally in the interceptor → `"Request timed out — please retry"` toast. SSE connections use a separate 30-second heartbeat check: if no event received in 30s, close and set `status('error')`.

---

# Phase 4 — API Contract {#phase-4}

> **Base URL:** `https://api.yourdomain.com`
> **Auth:** HttpOnly session cookie (`sn_session`). All endpoints except `/api/auth/*` require an active session. Unauthenticated requests return `401`.
> **Content-Type:** `application/json` for all request bodies.

---

## Endpoint 1: `POST /api/auth/login`

Authenticates a user and establishes a session via HttpOnly cookie.

**Auth required:** No

**Request Body:**
```json
{
  "email": "operator@shadownode.io",
  "password": "MyP@ssword123"
}
```

| Field | Type | Required | Rules |
|---|---|---|---|
| `email` | string | ✓ | Valid email format |
| `password` | string | ✓ | Min 8 characters |

**Success Response — `200 OK`:**
```json
{
  "user": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "handle": "ghost_operator",
    "email": "operator@shadownode.io",
    "role": "user",
    "plan": "pro",
    "createdAt": "2025-01-15T08:30:00Z"
  }
}
```

Sets header: `Set-Cookie: sn_session=<token>; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`

**Error Responses:**

| Status | Code | When |
|---|---|---|
| `401` | `INVALID_CREDENTIALS` | Email/password mismatch |
| `429` | `RATE_LIMITED` | >10 attempts in 15 min |
| `423` | `ACCOUNT_LOCKED` | >3 consecutive failures (60s lockout) |

```json
{ "error": "INVALID_CREDENTIALS", "message": "Email or password is incorrect" }
```

---

## Endpoint 2: `POST /api/generate`

Initiates an AI content generation job. Returns a `streamToken` the client uses to open an SSE connection. Replaces the RAF simulation in `NeuralReply.tsx`.

**Auth required:** Yes

**Request Body:**
```json
{
  "personaId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "platform": "Twitter",
  "prompt": "Write a viral thread about the future of autonomous AI agents",
  "model": "claude-3-5-sonnet"
}
```

| Field | Type | Required | Rules |
|---|---|---|---|
| `personaId` | UUID | ✓ | Must belong to authenticated user |
| `platform` | string | ✓ | Twitter, LinkedIn, Reddit, Discord, Email, Instagram, Threads, TikTok |
| `prompt` | string | ✓ | 10–2000 characters |
| `model` | string | ✗ | Defaults to user's engine config model |

**Success Response — `202 Accepted`:**
```json
{
  "generationId": "8d3f1e2a-9b4c-4d5e-6f7a-8b9c0d1e2f3a",
  "streamToken": "st_7xKpL9mQnRvWzAb3CdEfGh",
  "expiresIn": 60
}
```

Client opens: `GET /api/generate/stream/:streamToken` as EventSource with `withCredentials: true`

**SSE Stream Events:**
```
data: The future of autonomous
data:  AI agents is closer than
data:  most people think...
data: [DONE]
```

On `[DONE]`, backend persists full output to `generations` table and increments `usage.generations`.

**Error Responses:**

| Status | Code | When |
|---|---|---|
| `403` | `PERSONA_NOT_FOUND` | personaId not owned by user |
| `429` | `QUOTA_EXCEEDED` | Monthly generation limit hit |
| `503` | `PROVIDER_UNAVAILABLE` | AI provider returned 5xx |

```json
{
  "error": "QUOTA_EXCEEDED",
  "message": "Monthly generation limit reached",
  "quotaReset": "2025-02-01T00:00:00Z"
}
```

> `429 QUOTA_EXCEEDED` responses include the `X-Quota-Reset` header. The frontend quota modal reads this header directly.

---

## Endpoint 3: `POST /api/arena/battle`

Runs two AI models against the same prompt simultaneously. Returns a `battleId` and two `streamTokens` for parallel SSE connections. Replaces the RAF simulation in `Arena.tsx`.

**Auth required:** Yes

**Request Body:**
```json
{
  "prompt": "Explain quantum entanglement to a 10-year-old",
  "modelA": "claude-3-5-sonnet",
  "modelB": "gpt-4o"
}
```

| Field | Type | Required | Rules |
|---|---|---|---|
| `prompt` | string | ✓ | 10–2000 characters |
| `modelA` | string | ✓ | Must be in `model_elo` table |
| `modelB` | string | ✓ | Must differ from `modelA` |

**Success Response — `202 Accepted`:**
```json
{
  "battleId": "2c1d0e9f-8a7b-6c5d-4e3f-2a1b0c9d8e7f",
  "streams": {
    "modelA": {
      "token": "st_AaBbCcDdEeFfGg",
      "url": "/api/arena/stream/st_AaBbCcDdEeFfGg"
    },
    "modelB": {
      "token": "st_HhIiJjKkLlMmNn",
      "url": "/api/arena/stream/st_HhIiJjKkLlMmNn"
    }
  }
}
```

Client opens both EventSources concurrently. Vote UI activates when both receive `[DONE]`.

**Error Responses:**

| Status | Code | When |
|---|---|---|
| `400` | `SAME_MODEL` | `modelA === modelB` |
| `404` | `MODEL_NOT_FOUND` | Model ID not in `model_elo` |
| `429` | `RATE_LIMITED` | >20 battles per hour |

---

## Endpoint 4: `POST /api/personas`

Creates a new persona owned by the authenticated user. Enforces plan quota on `persona_slots`.

**Auth required:** Yes

**Request Body:**
```json
{
  "name": "TechVoice Alpha",
  "tone": "analytical",
  "niche": "AI & Technology",
  "traits": "Precise, data-driven, avoids hype",
  "creativity": 68,
  "formality": 75,
  "assertiveness": 80,
  "platforms": ["Twitter", "LinkedIn"],
  "gradient": "from-cyan-500 to-blue-600"
}
```

| Field | Type | Required | Rules |
|---|---|---|---|
| `name` | string | ✓ | 2–128 characters |
| `tone` | string | ✓ | Max 64 characters |
| `niche` | string | ✓ | Max 64 characters |
| `traits` | string | ✗ | Max 500 characters |
| `creativity` | integer | ✗ | 0–100, default 72 |
| `formality` | integer | ✗ | 0–100, default 50 |
| `assertiveness` | integer | ✗ | 0–100, default 70 |
| `platforms` | string[] | ✗ | Valid platform names |
| `gradient` | string | ✗ | Tailwind gradient string |

**Success Response — `201 Created`:**
```json
{
  "id": "c4d5e6f7-a8b9-0c1d-2e3f-4a5b6c7d8e9f",
  "userId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "TechVoice Alpha",
  "tone": "analytical",
  "niche": "AI & Technology",
  "traits": "Precise, data-driven, avoids hype",
  "status": "active",
  "creativity": 68,
  "formality": 75,
  "assertiveness": 80,
  "platforms": ["Twitter", "LinkedIn"],
  "gradient": "from-cyan-500 to-blue-600",
  "usesCount": 0,
  "winsCount": 0,
  "repliesCount": 0,
  "createdAt": "2025-01-20T14:22:00Z",
  "updatedAt": "2025-01-20T14:22:00Z"
}
```

**Error Responses:**

| Status | Code | When |
|---|---|---|
| `422` | `VALIDATION_ERROR` | Field fails Zod schema |
| `429` | `QUOTA_EXCEEDED` | Plan's `persona_quota` reached |

```json
{
  "error": "VALIDATION_ERROR",
  "errors": {
    "name": "Name must be at least 2 characters",
    "creativity": "Must be between 0 and 100"
  }
}
```

---

## Endpoint 5: `GET /api/account/quota`

Returns current usage counters against the user's plan limits. Used by `AccountQuota.tsx` and the `Sidebar.tsx` quota bar.

**Auth required:** Yes

**Request:** No body. No query parameters.

**Success Response — `200 OK`:**
```json
{
  "plan": {
    "id": "pro",
    "name": "Pro",
    "priceCents": 9900,
    "generationsQuota": 25000,
    "nodeQuota": 8,
    "memoryQuota": 25,
    "personaQuota": 15
  },
  "usage": {
    "generations": 8432,
    "nodeConnections": 3,
    "memoryUnits": 12,
    "personaSlots": 7,
    "updatedAt": "2025-01-20T14:18:42Z"
  },
  "quotaResetAt": "2025-02-01T00:00:00Z",
  "percentages": {
    "generations": 33.7,
    "nodes": 37.5,
    "memory": 48.0,
    "personas": 46.7
  }
}
```

> `percentages` is pre-computed by the backend so the frontend renders progress bars without any division logic.

**Error Responses:**

| Status | Code | When |
|---|---|---|
| `401` | `UNAUTHORIZED` | No valid session cookie |

---

# Phase 5 — Actionable Execution Plan {#phase-5}

> **Format:** 9 milestones, 27 atomic tasks. Each task is 30–60 minutes of real work. Zero scope creep — only what is required to make the provided frontend functional.

---

## Milestone 1 — Project Scaffold & Infrastructure

### Task 1.1: Initialize Backend Repository
**Description:** Scaffold the Node.js + Express + TypeScript project with all base dependencies.

**Acceptance Criteria:**
- `tsconfig.json` configured with `strict: true`, `target: ES2022`, `module: NodeNext`
- Dependencies installed: `express@5`, `typescript`, `tsx`, `@types/express`, `@types/node`, `dotenv`, `zod`, `cors`, `cookie-parser`, `helmet`
- Dev dependencies: `vitest`, `supertest`, `@types/supertest`
- `npm run dev` starts server via `tsx watch src/index.ts`
- `GET /api/health` returns `{ status: 'ok', timestamp: ISO_STRING }`

**Files:** `package.json`, `tsconfig.json`, `src/index.ts`, `src/routes/health.ts`

---

### Task 1.2: Docker Compose Setup
**Description:** Create `docker-compose.yml` with PostgreSQL 16, Redis 7, and the API service.

**Acceptance Criteria:**
- `docker compose up -d` starts all three services without error
- PostgreSQL at `localhost:5432`, Redis at `localhost:6379`
- `.env.example` documents all required vars: `DATABASE_URL`, `REDIS_URL`, `SESSION_SECRET`, `VAULT_ENCRYPTION_KEY`, `FRONTEND_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- API service connects to both DB and Redis on startup without crash

**Files:** `docker-compose.yml`, `.env.example`, `.env`

---

### Task 1.3: Prisma Setup & Database Schema Migration
**Description:** Install Prisma, write the full schema, and run the initial migration.

**Acceptance Criteria:**
- `prisma/schema.prisma` defines all 20 tables
- `npx prisma migrate dev --name init` runs without error
- `npx prisma db seed` inserts plan rows and model ELO seed rows
- `npx prisma studio` opens and shows all tables

**Files:** `prisma/schema.prisma`, `prisma/seed.ts`, `prisma/migrations/`

---

### Task 1.4: Redis Client & Session Middleware
**Description:** Configure `express-session` backed by Redis using `connect-redis`.

**Acceptance Criteria:**
- `ioredis` client connects and logs `Redis connected` on startup
- `express-session` configured: `httpOnly: true`, `secure` in production, `sameSite: 'lax'`, `maxAge: 604800000`, `rolling: true`
- Cookie name is `sn_session`
- Session survives across requests correctly

**Files:** `src/lib/redis.ts`, `src/middleware/session.ts`, `src/index.ts`

---

### Task 1.5: CORS & Security Middleware
**Description:** Configure Helmet, CORS, and cookie-parser middleware in the correct order.

**Acceptance Criteria:**
- `helmet()` applied globally before routes
- `cors()` with exact origin, `credentials: true`, correct methods
- `OPTIONS` preflight returns `204` with correct headers
- Non-whitelisted origin rejected with `403`

**Files:** `src/middleware/cors.ts`, `src/index.ts`

---

### Task 1.6: Global Rate Limiting Middleware
**Description:** Implement Redis-backed rate limiting using `express-rate-limit` + `rate-limit-redis`.

**Acceptance Criteria:**
- General authenticated limiter: 300 req/min per user session
- Auth-specific limiters ready for per-route application
- Rate limit exceeded returns `429` with `Retry-After` header
- `createRateLimiter(max, windowMs)` factory exported for reuse

**Files:** `src/middleware/rateLimiter.ts`

---

## Milestone 2 — Authentication Module

### Task 2.1: User Registration Endpoint
**Description:** Implement `POST /api/auth/register` with Zod validation and bcrypt hashing.

**Acceptance Criteria:**
- Validates `handle` (alphanumeric, 3–32), `email` (valid), `password` (min 8, 1 uppercase, 1 number)
- Hashes password with bcrypt cost factor 12
- Creates `users` + `usage` + `engine_configs` rows in single Prisma transaction
- Returns `201` with user object (no password hash)
- Duplicate email/handle → `409` with field-level error
- Rate limit: 5 req/hr per IP

**Files:** `src/routes/auth.ts`, `src/schemas/auth.schema.ts`, `src/services/auth.service.ts`

---

### Task 2.2: Login Endpoint
**Description:** Implement `POST /api/auth/login` with lockout enforcement and session creation.

**Acceptance Criteria:**
- Checks Redis `login_attempts:{email}` — ≥ 3 returns `423` with seconds remaining
- On success: clears attempt counter, creates session, returns user object
- On failure: increments Redis counter with 60s TTL, returns `401`
- Login rate limit: 10/15min applied

**Files:** `src/routes/auth.ts`, `src/services/auth.service.ts`

---

### Task 2.3: Logout & Session Me Endpoints
**Description:** Implement `POST /api/auth/logout` and `GET /api/auth/me`.

**Acceptance Criteria:**
- `GET /api/auth/me`: confirms session, queries Prisma, returns user; `401` if no session
- `POST /api/auth/logout`: destroys session in Redis, clears cookie, returns `200`

**Files:** `src/routes/auth.ts`, `src/middleware/requireAuth.ts`

---

### Task 2.4: Auth Guard Middleware
**Description:** Create `requireAuth` middleware applied to all non-auth routes.

**Acceptance Criteria:**
- Reads `req.session.userId`, fetches user from Prisma, attaches to `req.user`
- Missing or expired session → `401 { error: 'UNAUTHORIZED' }`
- TypeScript `express.Request` extended with `user: User` via declaration merging

**Files:** `src/middleware/requireAuth.ts`, `src/types/express.d.ts`

---

## Milestone 3 — Core Entity CRUD APIs

### Task 3.1: Personas API — List & Create
**Description:** Implement `GET /api/personas` and `POST /api/personas` with quota enforcement.

**Acceptance Criteria:**
- `GET`: returns personas by user, includes `platforms` array, ordered by `created_at DESC`
- `POST`: validates payload; checks quota with `SELECT FOR UPDATE`; creates persona + platforms in transaction; increments `usage.persona_slots`; returns `201`
- Quota exceeded → `429 QUOTA_EXCEEDED`
- Validation errors → `422` with field-level `errors` object

**Files:** `src/routes/personas.ts`, `src/services/persona.service.ts`, `src/schemas/persona.schema.ts`

---

### Task 3.2: Personas API — Detail, Update, Delete, Clone, Status
**Description:** Implement remaining 5 persona endpoints.

**Acceptance Criteria:**
- `GET /:id`: returns persona; `404` if not found or not owned
- `PUT /:id`: validates; updates + replaces platforms in transaction; returns updated
- `DELETE /:id`: deletes; decrements `usage.persona_slots`; returns `204`
- `POST /:id/clone`: duplicates (name + " (Copy)"); checks quota; returns `201`
- `PATCH /:id/status`: toggles `active`/`idle`; returns updated persona

**Files:** `src/routes/personas.ts`, `src/services/persona.service.ts`

---

### Task 3.3: Memory Units API
**Description:** Implement all 4 memory endpoints.

**Acceptance Criteria:**
- `GET`: returns all memory units for user, ordered by `created_at DESC`
- `POST`: validates; checks `memory_quota`; creates row; increments counter; returns `201`
- `DELETE /:id`: ownership check; deletes; decrements counter; returns `204`
- `PATCH /:id/status`: toggles `INJECTED`/`OFFLINE`; returns updated unit

**Files:** `src/routes/memory.ts`, `src/services/memory.service.ts`

---

### Task 3.4: Nodes API
**Description:** Implement all node management endpoints.

**Acceptance Criteria:**
- `GET`: returns nodes with computed uptime string
- `POST`: validates; checks `node_quota`; creates node in `idle` status; increments counter
- `PATCH /:id/status`: ownership check; updates; returns node
- `POST /halt-all`: sets all user's nodes to `idle` via `updateMany`; returns affected count
- `GET /:id/logs`: returns static placeholder log array (MVP)

**Files:** `src/routes/nodes.ts`, `src/services/node.service.ts`

---

### Task 3.5: Generations Archive API
**Description:** Implement `GET /api/generations`, `GET /api/generations/recent`, `DELETE`.

**Acceptance Criteria:**
- `GET`: accepts `?page&limit&platform&tag`; returns `{ data, total, page, pages }`; filtered by user
- `GET /recent`: returns last 5 generations for Dashboard
- `DELETE /:id`: ownership check; returns `204`

**Files:** `src/routes/generations.ts`, `src/services/generation.service.ts`

---

## Milestone 4 — AI Generation (SSE Streaming)

### Task 4.1: Engine Config API
**Description:** Implement `GET /api/engine/config` and `PUT /api/engine/config`.

**Acceptance Criteria:**
- `GET`: returns config for user; returns defaults if none exists (new user)
- `PUT`: validates all fields; upserts row; returns updated config

**Files:** `src/routes/engine.ts`, `src/services/engine.service.ts`

---

### Task 4.2: Generation Streaming Endpoint
**Description:** Implement `POST /api/generate` (job creation) and `GET /api/generate/stream/:token` (SSE).

**Acceptance Criteria:**
- `POST`: validates payload; checks quota with `SELECT FOR UPDATE`; generates Redis stream token (TTL 60s); returns `202 { generationId, streamToken, expiresIn: 60 }`
- `GET /stream/:token`: verifies token; sets SSE headers; calls AI provider with streaming; forwards each chunk as `data: <token>\n\n`; sends `data: [DONE]\n\n` on completion; saves to `generations` table; increments `usage.generations`; handles `req.on('close')` cleanup
- Provider errors return `503` before SSE opens

**Files:** `src/routes/generate.ts`, `src/services/generation.service.ts`, `src/lib/ai-providers.ts`

---

### Task 4.3: Arena Battle Streaming Endpoint
**Description:** Implement `POST /api/arena/battle`, vote endpoint, and history.

**Acceptance Criteria:**
- `POST /arena/battle`: validates prompt and models; creates `arena_battles` row; generates two stream tokens; returns `202` with `battleId` and dual `streams` object; rate limit 20/hr
- `GET /arena/stream/:token`: SSE for one model's output; on `[DONE]` marks output column
- `POST /arena/battle/:id/vote`: accepts winner; runs ELO update (K=32); updates battle + `model_elo` table
- `GET /arena/history`: returns battles for user, limit 50

**Files:** `src/routes/arena.ts`, `src/services/arena.service.ts`, `src/lib/elo.ts`

---

## Milestone 5 — Security-Sensitive Features

### Task 5.1: Key Vault API
**Description:** Implement all vault endpoints with AES-256-GCM encryption.

**Acceptance Criteria:**
- `src/lib/vault.ts` implements `encryptKey()` and `decryptKey()` using Node.js `crypto`, AES-256-GCM, key from env
- `POST /vault/keys`: validates; computes `key_preview`; encrypts key; stores; never returns plaintext
- `GET /vault/keys`: returns list with `key_preview` only
- `DELETE /vault/keys/:id`: ownership check; returns `204`
- `GET /vault/keys/:id/reveal`: rate limit 5/hr per user; decrypts; writes `audit_log` row with action, resource_id, ip, user_agent; returns `{ key }`

**Files:** `src/routes/vault.ts`, `src/services/vault.service.ts`, `src/lib/vault.ts`

---

### Task 5.2: Syndicate (Teams) API
**Description:** Implement all syndicate member management endpoints.

**Acceptance Criteria:**
- `GET /syndicate/members`: returns members; creates syndicate on first call if none exists
- `POST /syndicate/invite`: validates email/role; invitee must exist in `users`; creates member row; returns `201`
- `PATCH /syndicate/members/:id/role`: Owner-only; updates role; returns updated member
- `DELETE /syndicate/members/:id`: Owner or Admin only; cannot remove Owner; returns `204`

**Files:** `src/routes/syndicate.ts`, `src/services/syndicate.service.ts`

---

## Milestone 6 — Analytics, Feed & Marketplace

### Task 6.1: Analytics API
**Description:** Implement analytics endpoints with Redis caching.

**Acceptance Criteria:**
- `GET /analytics/summary?period=`: accepts `24h`, `7d`, `30d`, `90d`; Redis cache 5 min; aggregates from `generations` table on miss
- `GET /analytics/platforms?period=`: groups by `platform`; sorted by count DESC; 5-min cache
- `GET /analytics/personas?period=`: groups by persona with name join; 5-min cache

**Files:** `src/routes/analytics.ts`, `src/services/analytics.service.ts`

---

### Task 6.2: Signal Feed API + SSE Stream
**Description:** Implement paginated feed and real-time SSE feed stream.

**Acceptance Criteria:**
- `GET /feed`: accepts `?page&limit`; returns `{ data: FeedEvent[], total }`
- `GET /feed/stream`: SSE endpoint; uses Redis Pub/Sub (`PUBLISH feed:{userId} <event_json>`); cleans up on `req.on('close')`
- `createFeedEvent(userId, payload)` helper called by generation and node services

**Files:** `src/routes/feed.ts`, `src/services/feed.service.ts`

---

### Task 6.3: Marketplace API
**Description:** Implement marketplace listing and template install.

**Acceptance Criteria:**
- `GET /marketplace`: returns public templates ordered by `installs DESC`; Redis cache 10 min; optional `?category=` filter
- `POST /marketplace/install/:id`: checks persona quota; creates persona from template; increments `installs` and `usage.persona_slots`; returns `201`

**Files:** `src/routes/marketplace.ts`, `src/services/marketplace.service.ts`

---

## Milestone 7 — Account, Billing & Admin

### Task 7.1: Account Quota & Profile API
**Description:** Implement quota and profile endpoints.

**Acceptance Criteria:**
- `GET /account/quota`: joins `usage` + `plans`; pre-computes `percentages`; always fresh (no cache)
- `PUT /account/profile`: validates handle/email uniqueness; updates users row; `409` on conflict

**Files:** `src/routes/account.ts`, `src/services/account.service.ts`

---

### Task 7.2: Stripe Billing Endpoints
**Description:** Implement checkout session, cancellation, and webhook handler.

**Acceptance Criteria:**
- `POST /checkout/create-session`: creates Stripe Checkout Session; returns `{ url }`
- `POST /checkout/cancel-subscription`: sets `cancel_at_period_end: true`
- `POST /webhooks/stripe`: raw body parser; validates `stripe-signature`; handles `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.deleted`

**Files:** `src/routes/checkout.ts`, `src/routes/webhooks.ts`, `src/services/billing.service.ts`

---

### Task 7.3: Billing Invoices API
**Description:** Implement invoice listing endpoint.

**Acceptance Criteria:**
- `GET /billing/invoices`: returns invoices for user; ordered `created_at DESC`; limit 24

**Files:** `src/routes/billing.ts`

---

### Task 7.4: System Telemetry & Admin Endpoints
**Description:** Implement telemetry and admin-only endpoints.

**Acceptance Criteria:**
- `GET /api/health`: returns `{ status, db, redis, uptime, timestamp }`; pings both in parallel
- `GET /api/telemetry/global`: node count + total generations + user count; Redis cache 30s
- `GET /api/telemetry/system`: `process.cpuUsage()`, `process.memoryUsage()`, `os.loadavg()`; no cache
- `GET /api/system/logs`: admin-only; last 100 `audit_log` rows; non-admin → `403`

**Files:** `src/routes/telemetry.ts`, `src/routes/system.ts`

---

## Milestone 8 — Frontend Integration

### Task 8.1: Create Axios Instance & TanStack Query Setup
**Description:** Wire up the shared Axios instance and QueryClient in the frontend.

**Acceptance Criteria:**
- `src/lib/api.ts` with base URL, `withCredentials: true`, 15s timeout, 401 interceptor
- `QueryClient` in `src/main.tsx` with `staleTime: 30_000` and correct retry logic
- `QueryClientProvider` wraps the app
- `@tanstack/react-query` installed

**Files:** `src/lib/api.ts`, `src/main.tsx`, `package.json`

---

### Task 8.2: Replace Auth Mock with Real API Calls
**Description:** Update `useAuthStore.ts` to call real auth endpoints.

**Acceptance Criteria:**
- `login()` calls `POST /api/auth/login`; sets user in Zustand on success
- `logout()` calls `POST /api/auth/logout`; clears session; navigates to `/login`
- `checkSession()` calls `GET /api/auth/me`; handles 401 without redirect (app boot)
- App boot calls `checkSession()` once on mount

**Files:** `src/store/useAuthStore.ts`, `src/App.tsx`

---

### Task 8.3: Replace Persona Mock Data
**Description:** Remove `MOCK_PERSONAS` and wire persona pages to real API hooks.

**Acceptance Criteria:**
- `src/hooks/usePersonas.ts` with all 7 hooks
- `Personas.tsx`, `PersonaDetail.tsx`, `NeuralReply.tsx` use real hooks
- Loading and empty states implemented
- `MOCK_PERSONAS` constant deleted

**Files:** `src/hooks/usePersonas.ts`, `src/pages/Personas.tsx`, `src/pages/PersonaDetail.tsx`, `src/pages/NeuralReply.tsx`

---

### Task 8.4: Wire NeuralReply Generation to SSE
**Description:** Replace RAF simulation with real SSE streaming.

**Acceptance Criteria:**
- `src/hooks/useGenerationStream.ts` created per Phase 3.1 spec
- Output renders token-by-token as SSE data arrives
- Abort button calls `abort()`; submit disabled while streaming
- `429 QUOTA_EXCEEDED` triggers quota modal

**Files:** `src/hooks/useGenerationStream.ts`, `src/pages/NeuralReply.tsx`

---

### Task 8.5: Replace Remaining Mock Data (Nodes, Memory, Vault, Feed, Archive)
**Description:** Wire all remaining pages to real API hooks.

**Acceptance Criteria:**
- `useNodes` → `NodeCommand.tsx`
- `useMemory` → `MemoryMatrix.tsx`
- `useVaultKeys` → `KeyVault.tsx`; reveal shows key for 30s then clears from state
- `useGenerations` (paginated) → `ShadowArchive.tsx`; `useRecentGenerations` → Dashboard
- `useFeed` → `SignalFeed.tsx`; SSE connection prepends new events to list
- All mocks deleted

**Files:** `src/hooks/useNodes.ts`, `src/hooks/useMemory.ts`, `src/hooks/useVaultKeys.ts`, `src/hooks/useGenerations.ts`, `src/hooks/useFeed.ts` + corresponding page files

---

### Task 8.6: Wire Analytics, Marketplace, Syndicate & Account
**Description:** Replace remaining mocks in lower-priority pages.

**Acceptance Criteria:**
- `useAnalytics(period)` → `Analytics.tsx`; re-fetches when period selector changes
- `useMarketplace` → `Marketplace.tsx`; install mutation invalidates `personaKeys.all`
- `useSyndicate` → `Syndicate.tsx`
- `useQuota` → `AccountQuota.tsx` + Sidebar quota bar
- `useInvoices` → invoice table in `AccountQuota.tsx`
- Pricing checkout buttons call `POST /checkout/create-session` and redirect to Stripe URL

**Files:** `src/hooks/useAnalytics.ts`, `src/hooks/useMarketplace.ts`, `src/hooks/useSyndicate.ts`, `src/hooks/useAccount.ts` + corresponding page files

---

### Task 8.7: Wire Arena to Real Battle SSE
**Description:** Replace RAF simulation in `Arena.tsx` with dual SSE battle streams.

**Acceptance Criteria:**
- `useArenaBattle` hook calls `POST /api/arena/battle`; opens two EventSources concurrently
- Model A and B outputs update independently
- Vote buttons activate only when both streams emit `[DONE]`
- ELO delta displayed after vote response
- `useArenaHistory` populates battle history table

**Files:** `src/hooks/useArenaBattle.ts`, `src/pages/Arena.tsx`

---

### Task 8.8: Global Error Handling Integration
**Description:** Implement QueryErrorBoundary and mutation toast feedback across all pages.

**Acceptance Criteria:**
- `src/components/QueryErrorBoundary.tsx` wraps each main route
- All `useMutation` hooks have `onError` → `toast.error()`
- All forms call `form.setError` on `422` validation responses
- Axios timeout shows `"Request timed out — please retry"` toast via interceptor

**Files:** `src/components/QueryErrorBoundary.tsx`, `src/lib/api.ts`, `src/router.tsx`

---

## Milestone 9 — Testing & QA

### Task 9.1: Unit Tests — Auth Service
**Description:** Vitest unit tests for auth service functions.

**Acceptance Criteria:**
- `register()` creates user + usage + engine config in transaction
- `login()` increments Redis lockout on failure; clears on success; returns null at ≥ 3 failures
- Password stored as bcrypt hash; plaintext never persisted

**Files:** `src/services/auth.service.test.ts`

---

### Task 9.2: Integration Tests — Critical API Endpoints
**Description:** Supertest integration tests for the 5 critical endpoints.

**Acceptance Criteria:**
- `POST /api/auth/login`: 200 + cookie; 401 on wrong password; 423 after 3 failures
- `POST /api/personas`: 201 on valid; 422 on missing fields; 429 on quota exceeded
- `GET /api/account/quota`: 200 with correct structure; 401 without session
- `GET /api/vault/keys/:id/reveal`: 200 with decrypted key; audit log created; 429 after 5th reveal
- `POST /api/generate`: 202 with streamToken; 429 on quota exceeded

**Files:** `src/routes/auth.test.ts`, `src/routes/personas.test.ts`, `src/routes/vault.test.ts`, `src/routes/generate.test.ts`

---

### Task 9.3: Environment & Deployment Validation
**Description:** Validate production build works end-to-end with docker-compose.

**Acceptance Criteria:**
- `docker compose up` → `GET /api/health` returns `{ status: 'ok', db: 'ok', redis: 'ok' }`
- Login flow completes; `sn_session` cookie visible as HttpOnly in DevTools
- Generation SSE stream visible in Network tab as `text/event-stream`
- No `console.error` in browser during normal authenticated usage
- `npm run build` completes without TypeScript errors on both frontend and backend

**Files:** `docker-compose.yml`, `.env.production` template, `README.md`

---

## Quality Requirements

| Requirement | Description |
|---|---|
| Error shape | All endpoints return `{ error: string, message: string, errors?: Record<string, string> }` |
| No raw SQL | All DB access via Prisma client |
| TypeScript | No `any` types; `strict: true` enforced |
| Race safety | All mutations touching `usage` counters use `SELECT FOR UPDATE` |
| Vault security | `VAULT_ENCRYPTION_KEY` never logged or returned in any API response |
| SSE cleanup | All SSE connections clean up on `req.on('close')` |
| QA | Playwright capture: `./qa-playwright-capture.sh http://localhost:5173 public/qa-screenshots` |
| No background processes | No `&` in any npm scripts |
