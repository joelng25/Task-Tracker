# Joel Novio García — portfolio

Hand-coded personal site (React, TypeScript, Vite, Tailwind). One page, with English, Catalan, and Spanish, and a light/dark theme.

This folder is in the Task-Tracker repository only because this environment cannot create `joelng25/portfolio`. The GitHub token here is an installation token for Task-Tracker. `gh repo create joelng25/portfolio` fails with `Resource not accessible by integration (createRepository)`, and `gh api user` returns 403. **Move this site to its own repository** (`joelng25/portfolio`) so it is not tied to the task app.

Screenshot slots are marked `TODO` on purpose. Drop real images in when they exist.

## Scripts

```bash
cd portfolio
npm install
npm run dev
npm run build
npm run preview
```

`npm run dev` serves the site at `http://localhost:5173`.

## Move it to `joelng25/portfolio`

1. On GitHub, create an empty public repository named `portfolio` under `joelng25`.
2. Copy the contents of this `portfolio/` directory to that repository’s root (`package.json` should sit next to `index.html`, not inside another `portfolio/` folder).
3. Push the default branch.

```bash
git clone https://github.com/joelng25/portfolio.git
# copy the files from this folder into that clone, then:
git add .
git commit -m "Add personal portfolio"
git push
```

## Deploy on Vercel

No environment variables are required.

### From `joelng25/portfolio` (preferred)

1. In Vercel, choose **Add New… → Project** and import `joelng25/portfolio`.
2. Framework preset: **Vite**.
3. Root directory: leave it as the repository root.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

`vercel.json` in this folder already sets the build command, the output directory, and a few response headers. Vercel reads it when this folder is the project root.

### From this Task-Tracker branch (temporary)

1. Import `joelng25/Task-Tracker`.
2. Set **Root Directory** to `portfolio`.
3. Framework preset: **Vite**.
4. Build command: `npm run build`. Output directory: `dist`.
5. Deploy.

Use the production branch that contains this folder. After the site has its own repository, import that repository instead and remove the Task-Tracker project (or stop deploying it) so the portfolio is not rebuilt from the task app.
