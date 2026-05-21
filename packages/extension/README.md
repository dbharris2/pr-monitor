# @pr-monitor/extension

A Chrome extension (Manifest V3) that surfaces the "review requested" PR list in a toolbar popup and badges the icon with the pending count.

Consumes [`@pr-monitor/ui`](../ui) for the UI — the popup renders the same `ReviewPage` component as the web app.

## Layout

- `manifest.json` — MV3 manifest. Declares `action.default_popup`, the `background.service_worker`, `storage` + `alarms` permissions, and `https://api.github.com/*` as the host permission.
- `popup.html` + `src/main.tsx` — the popup entry. Mounts the React app from `src/popup.tsx`.
- `src/popup.tsx` — composes the shared `Header` + `ReviewPage` from `@pr-monitor/ui`.
- `src/background.ts` — service worker. Wakes up every minute via `chrome.alarms`, fetches the review-requested PR count from GitHub, and calls `chrome.action.setBadgeText`.
- `src/token-storage.ts` + `src/use-token.ts` — chrome.storage wrappers replacing the web app's cookie/proxy pattern.
- `src/relay-env.ts` — Relay environment whose network layer fetches `api.github.com/graphql` directly with the token in the `Authorization` header (no proxy needed — extensions can use `host_permissions` for this).
- `vite.config.ts` — Vite + `@crxjs/vite-plugin` + `@rolldown/plugin-babel` running `babel-plugin-relay` over the shared `@pr-monitor/ui` components.
- `icons/` — toolbar/store icons at 48/96/128/256.

## Auth

Unlike the web app (which encrypts the token in an HTTP-only cookie via a server action), the extension stores the token in `chrome.storage.local` and sends it directly to GitHub from the popup and the service worker. Chrome's extension sandbox provides the same per-extension isolation, and `host_permissions` allows the cross-origin requests without CORS issues.

## Scripts

```bash
bun run dev          # Vite dev server with HMR — useful for iterating on the popup
bun run build        # Production build → dist/
bun run lint
bun run ts
bun run format
```

`prebuild` runs the Relay compiler first.

## Loading the unpacked extension

```bash
bun run build
```

Then in Chrome:

1. Visit `chrome://extensions`.
2. Toggle **Developer mode**.
3. Click **Load unpacked**.
4. Pick `packages/extension/dist`.

After a rebuild, click the refresh icon on the PR Monitor card in `chrome://extensions` to pick up the changes.

## Packaging for the Chrome Web Store

The Chrome Web Store wants a `.zip` of the **contents** of `dist/` (i.e. `manifest.json` at the root of the zip, not nested in a folder):

```bash
bun run build
cd dist
zip -r ../pr-monitor-extension.zip .
```

Upload `packages/extension/pr-monitor-extension.zip` to the developer dashboard.

## Privacy policy

[`PRIVACY.md`](./PRIVACY.md) — referenced from the Chrome Web Store listing.
