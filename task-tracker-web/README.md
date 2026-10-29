# Task Tracker Web

React + TypeScript frontend for the Task Tracker, built with [Vite](https://vite.dev).

The recruiter-facing overview (live demo, architecture, screenshots) is in the [root README](../README.md).

## Scripts

```bash
npm install
npm run dev      # dev server on http://localhost:3000
npm test         # unit tests (Vitest + Testing Library)
npm run build    # type-check and build into dist/
npm run preview  # serve the production build
```

## API base URL

The app reads `VITE_API_URL` at **build** time (`src/services/taskService.ts`). Include the `/api` path. A trailing slash is stripped.

| Situation | Value |
|---|---|
| `npm run dev` with nothing set | `http://localhost:8080/api` |
| Docker image default (Render) | `/api` — nginx proxies that path to `TASK_API_URL` |
| `docker compose` | `http://localhost:8080/api` (build arg) |

Copy `.env.example` to `.env.local` for a local override. Do not commit `.env.local`.

## Deploy

Deployed on Render with the `Dockerfile` in this directory (see the root `render.yaml`).

Node.js 22 (`engines` and `.node-version`).
