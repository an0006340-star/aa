# Capacity Connect API

This is the first small backend for Capacity Connect. It uses FastAPI and
currently exposes these endpoints:

```text
GET /health
POST /analyze-skills
```

The endpoint returns:

```json
{"status": "ok"}
```

`POST /analyze-skills` accepts a JSON body with `skills`, `career_goal`, and
`experience_years`, then uses Gemini to return strengths, skill gaps, a
recommended competency, recommended courses, and a short learning path.

## Run locally

From the repository root:

```bash
pnpm --filter @workspace/api-server run dev
```

The server listens on the port provided by `PORT` (5000 by default).
The `GOOGLE_API_KEY` secret must be configured before using
`POST /analyze-skills`.

Example request:

```bash
curl -X POST http://localhost:80/analyze-skills \
  -H "Content-Type: application/json" \
  -d '{"skills":["Excel","Communication"],"career_goal":"Digital Governance Manager","experience_years":2}'
```