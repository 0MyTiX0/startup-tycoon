# startup-tycoon-public

Mini Next.js project exposing a statically-generated public stats page.

## Run

Install dependencies and run dev server:

```bash
cd startup-tycoon-public
npm install
npm run dev
```

Open http://localhost:3000/public-stats

## Verify SSR/SSG (View Source)

1. Build and start:

```bash
npm run build
npm run start
```

2. Open http://localhost:3000/public-stats
3. Right-click → View Page Source and verify the metrics `Total earned`, `Total clicks`, `Best income/sec` are present in the HTML before JS execution.

This project uses `getStaticProps` to generate `/public-stats` at build time from `data/public-stats.json`.
