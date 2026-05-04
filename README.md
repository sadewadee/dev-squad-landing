# dev-squad-landing

Marketing landing page for **dev-squad** — a multi-agent orchestration plugin for Claude Code.

Eleven specialist agents run a nine-phase PDCA workflow with hard quality gates: anti-AI-slop design, runtime QA, stability auditing.

## Stack

- **Astro 5** + TypeScript strict
- **Tailwind v4** (via `@tailwindcss/vite`) with design tokens extracted from real reference computed styles
- **React 19** islands for the Workflows filter
- **Framer Motion** ready (CSS animations + view-transition fallbacks for now)
- Static output → deployable to any static host

## Local development

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # production build to ./dist/
pnpm preview      # preview built site locally
```

Requires Node ≥ 22.12.

## Deploy to Cloudflare Pages

1. Push to GitHub.
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Pick this repo, framework preset **Astro**, build command `pnpm build`, output `dist`.
4. Save & deploy.

`public/_headers` already configures long-cache for hashed assets and sane security headers.

## Structure

```
src/
├── components/
│   ├── layout/      # TopBar, Header, SideRails, Footer
│   ├── sections/    # Hero, Wire, About, Capabilities, Labs, Method, SelectedWork, Testimonial, CTASection
│   └── islands/     # LabsFilter (React, client:load)
├── data/            # capabilities, method, labs (typed content)
├── layouts/         # BaseLayout
├── pages/           # index.astro
├── styles/          # global.css (design tokens + utilities)
└── assets/          # editorial collage imagery
```

## License

Apache-2.0
