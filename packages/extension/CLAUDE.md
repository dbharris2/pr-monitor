# @pr-monitor/extension

Chrome extension (Manifest V3) — toolbar popup + background service worker. Reuses the React UI from `@pr-monitor/ui`.

## Auth model

Different from the web app. Extensions can't use HTTP-only cookies the way Next can, so:

- Token is stored in `chrome.storage.local` via `src/token-storage.ts`.
- Relay's network layer (`src/relay-env.ts`) fetches `api.github.com/graphql` directly with the `Authorization` header. No proxy needed — `host_permissions: ["https://api.github.com/*"]` in the manifest allows the cross-origin call without CORS issues.
- The shared `Header` from `@pr-monitor/ui` takes a `saveToken` prop; the extension passes its `chrome.storage` wrapper.

## Build wiring

- Vite + `@crxjs/vite-plugin` handles MV3 manifest output + service-worker bundling.
- `@rolldown/plugin-babel` runs `babel-plugin-relay` over the shared components (Vite doesn't have built-in Relay support like Next's SWC; without this, the `graphql` tag throws at runtime).
- `prebuild` script runs `bun --filter @pr-monitor/ui relay` first.
- The popup is sized 560×600. Chrome's max popup is 800×600.

## Layout

- `manifest.json` — MV3. Action popup, background service worker, `storage` + `alarms` permissions, `api.github.com` host permission.
- `popup.html` + `src/main.tsx` — popup entry, mounts React.
- `src/popup.tsx` — composes shared `Header` + `ReviewPage`.
- `src/background.ts` — service worker. `chrome.alarms` fires every minute, fetches the review-requested PR count, badges the toolbar icon. Uses the same search filter the UI applies.
- `src/token-storage.ts` + `src/use-token.ts` — `chrome.storage.local` wrappers.
- `src/relay-env.ts` — direct GitHub fetch.
- `icons/` — 48/96/128/256 PNG icons from the prior `prmonitor` extension.
- `screenshots/` — Chrome Web Store listing assets.
- `PRIVACY.md` — privacy policy linked from the CWS listing.

## Loading + packaging

- Dev: `bun ext:dev` (Vite HMR), or `bun ext:build` then load `dist/` via `chrome://extensions` → **Load unpacked**.
- For the Chrome Web Store: zip the **contents** of `dist/` (`manifest.json` at the root of the zip, not nested in a folder).

## Versioning

The `version` in `manifest.json` is a dev-only default — `release-extension.yml` rewrites it on the runner before building. Source of truth is the latest `extension-v*` git tag. Bump derived from conventional-commit prefixes since that tag (`feat:` → minor, `feat!:`/`BREAKING CHANGE` → major, otherwise patch).
