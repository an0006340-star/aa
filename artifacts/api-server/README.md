# Capacity Connect API

This is the first small backend for Capacity Connect. It uses FastAPI and
currently exposes one endpoint:

```text
GET /health
```

The endpoint returns:

```json
{"status": "ok"}
```

## Run locally

From the repository root:

```bash
pnpm --filter @workspace/api-server run dev
```

The server listens on the port provided by `PORT` (5000 by default).