# Task Tracker Web

React + TypeScript frontend for the Task Tracker, built with [Vite](https://vite.dev).

## Scripts

```bash
npm install
npm run dev      # dev server on http://localhost:3000
npm test         # unit tests (Vitest + Testing Library)
npm run build    # type-check and build into dist/
npm run preview  # serve the production build
```

## Configuration

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8080/api` | Base URL of the backend API |

Set it in a `.env.local` file or in the environment, e.g. `VITE_API_URL=https://api.example.com/api npm run build`.
