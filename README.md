# Polysage MVP

Polysage is an **AI-native multi-agent trading control plane for Polymarket**. The MVP focuses on transparent agent cognition:
- reasoning summaries
- short-term and long-term memory
- post-trade reflection
- strategy/skill extraction
- replay/backtest workflows

## Product Concept

This is not just a bot executor. The core differentiator is an explicit cognitive loop:

`observe -> context build -> retrieve memory -> decide -> risk check -> execute -> reflect -> update memory -> extract skill`

All steps are logged and visible in API data/UI panels.

## Architecture

The MVP uses a clean layered structure:

- **Frontend (`app/*`)**: Next.js App Router pages (Dashboard, Agent Studio, Trading Monitor, Memory Explorer, Backtest, Evolution, Settings).
- **Backend API (`app/api/*`)**: route handlers for agents, markets, runtime cycle, trades, memory, backtests, evolution, settings, health.
- **Domain (`lib/core/types.ts`)**: strongly typed entities for Agent, Market, TradeDecision, Execution, Reflection, Skill, and memory models.
- **Schemas (`lib/schemas/domain.ts`)**: zod validation for inbound API payloads.
- **Services (`lib/services/*`)**: business logic boundaries (agent, trading, memory, runtime, backtest).
- **Providers (`lib/providers/*`)**: adapter interfaces + implementations for market data, model generation, execution, memory search.
- **Persistence (`lib/store/state.ts`)**: in-memory state for MVP, replaceable with PostgreSQL/pgvector later.
- **Seed (`lib/seed/demo-data.ts`)**: local demo bootstrap data.

## Setup

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`


## Deploy to Cloudflare Workers

This repo is now configured for **direct deployment to Cloudflare Workers** using OpenNext.

### 1) Install dependencies

```bash
npm install
```

### 2) Build for Cloudflare

```bash
npm run cf:build
```

This generates the Worker bundle in `.open-next/`.

### 3) Preview locally with Cloudflare runtime

```bash
npm run cf:preview
```

### 4) Deploy

1. Authenticate once:
   ```bash
   npx wrangler login
   ```
2. Deploy:
   ```bash
   npm run cf:deploy
   ```

### Cloudflare config notes

- `wrangler.jsonc` is preconfigured to use `.open-next/worker.js` as entrypoint.
- Static assets are served from `.open-next/assets` via the `ASSETS` binding.
- `nodejs_compat` is enabled for Node compatibility in Worker runtime.
- Update `name` in `wrangler.jsonc` before production deploy.

### Environment variables

For local preview, copy `.dev.vars.example` to `.dev.vars` and set required values.
For production, set variables via Cloudflare dashboard or `wrangler secret put`.

## Dry Mode vs Real Mode

- **Dry mode** is default.
- **Real mode** is blocked unless `settings.allowRealTrading = true`.
- Execution adapter rejects real trades when flag is false.
- UI badges explicitly surface mode and warnings.

## Memory System

### Short-term memory
- Bounded by per-agent window size.
- Holds immediate observations, decision snippets, reflection snippets, active hypotheses.
- Supports reset per-agent.

### Long-term memory
- Persistent (MVP: in-memory persistence for run session).
- Stores reflections + extracted skills.
- Skills include structured rules (`trigger/action/constraints`), confidence, usage metrics, and provenance.

## Historical Replay / Backtest

- Backtest service supports multi-agent runs over date windows.
- Returns PnL curve, win rate, drawdown, and lessons.
- Market provider has a live Polymarket fetch path (Gamma API) with local fallback if network is unavailable.

## Extensibility Roadmap

1. PostgreSQL + pgvector persistence and retrieval augmentation.
2. Queue-backed concurrent agent orchestration.
3. Pluggable LLM providers and reasoning evaluators.
4. Real Polymarket execution adapter behind hardened signing + policy controls.
5. Agent tournaments, automatic mutation pipelines, and reusable skill deployment.

## Important MVP Constraints

- Current model provider is a **heuristic mock** for local demo and is explicitly labeled in code.
- Real execution adapter boundary exists, but live trade settlement is intentionally gated.
- Live data fetch depends on environment network access.
