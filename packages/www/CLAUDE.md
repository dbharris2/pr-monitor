# @pr-monitor/www

The Next.js web app. Deployed to Vercel at https://pr-monitor-zeta.vercel.app.

## Auth model

- The user pastes a GitHub PAT into the `Header` from `@pr-monitor/ui`.
- `app/actions/token.ts` is a `'use server'` server action: encrypts the token (AES via Node `crypto`) and writes it to an HTTP-only cookie with a 30-day expiry.
- Client code never touches the token directly. All GitHub requests go through `app/api/proxy/route.ts`, which decrypts the cookie and forwards to `api.github.com/graphql` with the `Authorization` header.

## Build wiring

- `next.config.mjs` enables the React Compiler, lists `@pr-monitor/ui` in `transpilePackages` so Next compiles the shared package through its own SWC pipeline, and configures the SWC Relay transform with paths pointing at `../ui/components` and `../ui/data/schema.graphql`.
- `prebuild` script runs `bun --filter @pr-monitor/ui relay` to ensure Relay artifacts exist before `next build`. Vercel picks this up automatically.

## Layout

- `app/` — Next.js app router. Server actions in `app/actions/`. GitHub proxy at `app/api/proxy/route.ts`.
- `utils/encryption.ts` — Node-only token encryption. Browser-safe utils live in `@pr-monitor/ui`.
- `tailwind.config.ts` — content globs cover `./app` plus `../ui/components` / `../ui/utils`. Uses the shared preset from `@pr-monitor/ui/tailwind-preset.ts`.

## Vercel

The project's _Root Directory_ is set to `packages/www` with "Include files outside of the Root Directory" enabled so the workspace lockfile + `packages/ui` ship to the build. No `vercel.json` — Vercel auto-detects Next.js.
