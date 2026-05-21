# @pr-monitor/www

The Next.js web app. Deployed to Vercel at https://pr-monitor-zeta.vercel.app.

Consumes [`@pr-monitor/ui`](../ui) for components and the GraphQL schema.

## Layout

- `app/` — Next.js app router. Server actions for token storage live in `app/actions/`. The GitHub GraphQL proxy lives in `app/api/proxy/route.ts`.
- `utils/encryption.ts` — Node-only token encryption (used by the server action and proxy). Browser-safe utils live in `@pr-monitor/ui`.
- `next.config.mjs` — enables the React Compiler, registers `@pr-monitor/ui` in `transpilePackages`, and configures the SWC Relay transform with paths pointing at `../ui/components`.
- `tailwind.config.ts` — content globs cover `./app` plus `../ui/components` / `../ui/utils`. Theme extends the shared preset from `@pr-monitor/ui/tailwind-preset.ts`.

## How auth works

The user pastes a GitHub PAT in the header. A `'use server'` action in `app/actions/token.ts` encrypts it (AES via Node `crypto`) and writes it to an HTTP-only cookie with a 30-day expiry. All GitHub requests go through `app/api/proxy/route.ts`, which decrypts the cookie and adds the `Authorization` header server-side, so the token never reaches client JS.

## Scripts

```bash
bun run dev    # Dev server on :3001 (Turbopack)
bun run build  # Production build (regenerates Relay artifacts via prebuild)
bun run start  # Start production server (after build)
bun run lint
bun run ts
bun run format
```

`prebuild` runs `bun --filter @pr-monitor/ui relay` automatically, so artifacts get generated before `next build` runs — Vercel deploys work out of the box once the project's *Root Directory* is set to `packages/www`.
