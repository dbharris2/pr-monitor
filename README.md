# PR Monitor

A personal GitHub pull request dashboard. Shows the PRs that need your attention — review requests, mentions, your own PRs — and lets you browse any repo's open PRs at a glance.

Hosted at **https://pr-monitor-zeta.vercel.app** — paste a GitHub personal access token and go. Or run it locally (see [Setup](#setup) below).

## Features

- **Four "Me" lists** that you actually care about: review requested, reviewed, mentions, and your PRs.
- **Repository view** to browse any `owner/repo`'s open PRs, with quick-access pills for recently visited repos.
- **Standard and compact display modes** — toggle in the header to swap between roomy rows and a denser list.
- **Inline PR status**: merged / draft / approved / changes requested / needs review, plus CI status (pending, pass, fail). Rows tint green or red so the state is obvious from a scan.
- **Reviewer avatars** for both individuals and teams (teams render as rounded squares so they're distinguishable at a glance).
- **Relative timestamps** for "merged" and "last updated."
- **Auto-refresh on tab focus** — switch back to the tab and it re-fetches.
- **Catppuccin theme** with light/dark toggle.

## Setup

1. Create a GitHub personal access token at https://github.com/settings/tokens
   - Use `repo` scope for private repos, or `public_repo` for public-only.
2. Install dependencies and start the dev server:
   ```bash
   bun install
   bun dev
   ```
3. Open http://localhost:3001 and paste your token into the prompt in the header.

The token is encrypted and stored in an HTTP-only cookie (30-day expiry). It never leaves your machine except to talk to GitHub's GraphQL API.

## Tech stack

- Next.js 16 (Turbopack) + React 19 (with the React Compiler)
- Relay for GraphQL data fetching
- Tailwind CSS + Catppuccin
- TypeScript

## Scripts

```bash
bun dev      # Dev server on :3001
bun build    # Production build
bun lint     # ESLint
bun ts       # TypeScript check
bun format   # Prettier
bun relay    # Recompile Relay artifacts after editing GraphQL
```

Run `bun relay` whenever you change a `graphql` tagged template — generated types live in `components/__generated__/` and are not edited by hand.

## Project layout

- `app/` — Next.js app router pages, layout, server actions
- `components/` — UI components, each colocated with its Relay fragment
- `data/schema.graphql` — GitHub's GraphQL schema (used by the Relay compiler)
- `utils/` — shared helpers
