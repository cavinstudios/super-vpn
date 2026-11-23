# Super VPN

A polished, responsive Next.js landing page and dashboard concept for a VPN service. This preview includes mock server selection and connection controls; it does not create a VPN tunnel, encrypt data, or change network traffic. GitHub Pages serves the static preview from `docs/`.

## Run locally

1. Install pnpm 10.11 and Node.js 24.
2. Install dependencies with `pnpm install`.
3. Start the development server with `pnpm dev` and open [http://localhost:3000](http://localhost:3000).

To create and serve the static export:

1. Run `pnpm --filter @supervpn/web build` to generate the site in `apps/web/out/`.
2. Run `pnpm start` to serve the generated files at [http://localhost:3000](http://localhost:3000).

The export includes `/`, `/healthz/`, and `/readyz/` as static pages. No environment variables, credentials, API, or backend are required. `.env.sample` is included for reference.

## Project structure

- `apps/web/` — Next.js App Router pages, styles, and static export configuration
- `packages/core/` — platform-agnostic connection state model
- `apps/web/scripts/serve.mjs` — dependency-free static file server for the exported site
- `docs/` — published static export for GitHub Pages

For a GitHub Pages release, run `GITHUB_PAGES=true pnpm --filter @supervpn/web build`, copy the contents of `apps/web/out/` into `docs/`, and push to `main`. Pages serves that folder at `https://cavinstudios.github.io/super-vpn/`. The `.nojekyll` file keeps Next.js assets under `_next/` available.
