# 🗄️ Shadow Node — Canonical Shared Database Workspace

Welcome to the `packages/database` workspace. This is the single source of truth for the database schema, Prisma clients, and raw similarity query optimizations across the entire Shadow monorepo.

---

## 💎 Why Share a Database Package?

In standard industry projects, separate apps often maintain their own ORM files or copy schemas back and forth. This is highly error-prone and leads to schema drift.

In an **industry-grade monorepo**, the schema lives in one place (`packages/database`) as a shared package:
* `apps/server` depends on `@shadow/database` to query endpoints and handle user authentication.
* `apps/worker` depends on `@shadow/database` to execute background agent workflow updates.
* `packages/ml` and `packages/research` can load this package directly to push preprocessed embeddings or export model trial logs.

### Key Benefits:
1. **Zero Schema Drift**: Modifying the schema instantly syncs client types across all applications and scripts.
2. **Optimized Connection Management**: The exported singleton prevents multiple, redundant connection pools in local hot-reloading configurations.
3. **pgvector Utility Integration**: Encapsulates raw Cosine Distance matches (`<=>` pgvector operator) so microservices can recall semantic context memories with a single, type-safe API.

---

## 🚀 Commands

### 1. Generating Types
Run this when you modify `schema.prisma` to rebuild the local typescript bindings:
```bash
npx prisma generate
```

### 2. Creating Migrations
Create a standard database migration during local schema prototyping:
```bash
npx prisma migrate dev --name <migration_name>
```
