# Capacity Connect

Capacity Connect's beginner-friendly FastAPI backend.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the FastAPI server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `GET /health` — returns `{ "status": "ok" }`

## Stack

- pnpm workspaces and Python 3.13
- API: FastAPI served by Uvicorn
- No database or AI dependencies yet

## Where things live

- `artifacts/api-server/main.py` — FastAPI application and routes
- `pyproject.toml` — Python dependencies

## Architecture decisions

- The backend intentionally starts with one health route so future features can be added incrementally.

## Product

- Provides a health check for the Capacity Connect API.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
