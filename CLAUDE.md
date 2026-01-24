# PR Monitor

A personal GitHub PR dashboard built with Next.js and Relay.

## Tech Stack

- Next.js 16 with Turbopack
- React 19 with React Compiler
- Relay for GraphQL data fetching from GitHub API
- Tailwind CSS with Catppuccin theme (dark mode)
- TypeScript

## Commands

```bash
bun dev      # Start dev server on port 3001
bun build    # Production build
bun lint     # ESLint (max 20 warnings)
bun ts       # TypeScript check
bun format   # Prettier formatting
bun relay    # Compile Relay GraphQL fragments
```

## Project Structure

- `app/` - Next.js app router pages and layout
- `components/` - React components with colocated Relay fragments
- `components/__generated__/` - Generated Relay types (do not edit)
- `data/schema.graphql` - GitHub GraphQL API schema
- `utils/` - Shared utilities

## Key Patterns

- GraphQL fragments are colocated with components using `graphql` tagged templates
- Run `npm run relay` after modifying any GraphQL queries/fragments
- Uses `useQueryLoader` for data fetching with visibility-based refresh
- GitHub token stored encrypted in a cookie

## Authentication

Users provide a GitHub personal access token directly (no OAuth flow). Token is stored encrypted in a cookie. Token needs `repo` scope for private repos or `public_repo` for public only.
