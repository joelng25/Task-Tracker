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
| Vercel | Set `VITE_API_URL` in the Vercel project |

Copy `.env.example` to `.env.local` for a local override. Do not commit `.env.local`.

## Deploy on Vercel

Render is unchanged: it still builds `Dockerfile` in this directory.

To host this UI on Vercel:

1. Import the GitHub repository.
2. Set **Root Directory** to `task-tracker-web`. `vercel.json` here tells Vercel to run `npm run build`, publish `dist`, and fall back to `index.html` for client-side routes.
3. Add environment variable `VITE_API_URL` for Production and Preview. For the current public API:

   `https://task-tracker-api-fak9.onrender.com/api`

   That URL is public configuration, not a secret. Vite bakes it into the bundle, so change it and redeploy if the API host moves.

Leaving the Vercel root directory as the repository root also works: the root `vercel.json` builds this folder. Prefer the root directory above so the Vite preset matches this package.

Node.js 22 (`engines` and `.node-version`).
