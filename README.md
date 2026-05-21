# PR Monitor

A personal GitHub pull request dashboard. Shows the PRs that need your attention — review requests, mentions, your own PRs — and lets you browse any repo's open PRs at a glance.

Hosted at **https://pr-monitor-zeta.vercel.app**, and available as a Chrome extension. Paste a GitHub personal access token and go.

## Repo layout

This is a bun-workspaces monorepo. The interesting code lives under `packages/`:

| Package | Purpose |
| --- | --- |
| [`@pr-monitor/ui`](packages/ui) | Shared React components, utils, GraphQL schema, Relay fragments. Consumed by both apps. |
| [`@pr-monitor/www`](packages/www) | The Next.js web app deployed to Vercel. |
| [`@pr-monitor/extension`](packages/extension) | The Chrome extension (MV3 popup + service worker badging). |

Each package has its own README with package-specific instructions.

## First-time setup

```bash
bun install
bun relay   # generate Relay artifacts (not checked in)
```

You need `bun relay` once after cloning. Without it, `bun ts` and `bun lint` will fail with "Cannot find module" errors. The web and extension builds run it automatically as a `prebuild` step, so `bun build` / `bun ext:build` work without remembering to run it.

To use either the web app or the extension, you'll need a GitHub personal access token from https://github.com/settings/tokens — use `repo` scope for private repos, or `public_repo` for public-only.

## Common scripts (run from the repo root)

```bash
bun dev         # Web dev server on :3001
bun build       # Production build of the web app
bun ext:dev     # Vite dev server for the Chrome extension
bun ext:build   # Production build of the Chrome extension (output: packages/extension/dist/)
bun relay       # Regenerate Relay artifacts after editing GraphQL
bun ts          # TypeScript check across all packages
bun lint        # ESLint across all packages
bun format      # Prettier across all packages
```

All of these proxy to the relevant workspace via `bun --filter`. See the package READMEs for package-specific scripts.

## Tech stack

- Next.js 16 (Turbopack) + React 19 (with the React Compiler) for the web app
- Vite + `@crxjs/vite-plugin` for the Chrome extension
- Relay 21 for GraphQL data fetching, with the schema in `packages/ui/data/schema.graphql`
- Tailwind CSS + Catppuccin for styling
- TypeScript 6
