# Super VPN

A polished, responsive Next.js landing page and dashboard concept for a VPN service. This local-only prototype includes a mock server selector and connection controls; it does not create a VPN tunnel, encrypt data, or change network traffic.

## Run locally

1. Install the project dependencies with `npm install`.
2. Start the development server with `npm run dev` and open [http://localhost:3000](http://localhost:3000).

To create and serve the static export:

1. Run `npm run build` to generate the site in `out/`.
2. Run `npm run start` to serve the generated files at [http://localhost:3000](http://localhost:3000).

The export includes `/`, `/healthz/`, and `/readyz/` as static pages. No environment variables, credentials, API, or backend are required. `.env.sample` is included for reference.

## Project structure

- `app/` — Next.js App Router pages and styles
- `scripts/serve.mjs` — dependency-free static file server for the exported site
- `next.config.ts` — static export configuration
