# ⚙️ Shadow Node — Distributed Background Worker

Welcome to the `apps/worker` application. This is a dedicated NestJS background worker microservice designed to process autonomous workflows, agent evaluation loops, and platform posting schedules out-of-band.

---

## ⚡ Why Separate Workers in Production?

In a high-throughput, production-grade microservices topology, the main API Gateway (`apps/server`) and Background Processors (`apps/worker`) **must be strictly isolated** into separate deployable units:

```ini
                                     [ Redis / BullMQ ]
                                             │
      ┌──────────────────────────────────────┴──────────────────────────────────────┐
      ▼                                                                             ▼
[ apps/server ] (API Gateway)                                                [ apps/worker ] (Processors)
- Runs NestJS HTTP / WebSocket listeners                                      - Runs NestJS Standalone context
- Low memory footprint                                                        - Processes CPU-heavy LLM agent loops
- Handles user auth, dashboard telemetry, SSE generation streams             - Performs cron triggers, queue retries
- Auto-scales horizontally (2-20 Fargate tasks) based on CPU/HTTP connection  - Auto-scales independently based on Queue depth
```

### Production Benefits:
1. **API Response Protection**: CPU-intensive LLM evaluations or high-latency social network post loops can run for minutes. Running these on the API server will block the Node.js event loop, causing HTTP timeouts for online clients.
2. **Independent Scaling**: The worker service can auto-scale dynamically based on the number of waiting jobs in BullMQ (via KEDA/AWS metrics), while the API server scales strictly based on concurrent HTTP requests.
3. **Failure Containment**: If a background posting job fails or leaks memory during long-running tasks, only that isolated worker container crashes and restarts, leaving the client dashboard online and stable.

---

## 🚀 Setup & Execution

### Running Locally
To launch the background worker standalone instance:
```bash
cd apps/worker
npm install
npm run start:dev
```

### Production Deployment
The worker uses an optimized Docker build (`docker/Dockerfile.worker`) running on ECS Fargate without binding external HTTP ports. It relies on environment connection keys for Redis and PostgreSQL.
