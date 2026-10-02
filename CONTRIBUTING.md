# Contributing

Use Node.js 22, `npm ci`, and a feature branch from `main`. Run `npm run dev` and visit `/sunday-space/`.

Keep application and tests strictly typed. Put imports first, then interfaces/types, then constants and implementation. Use the object registry for metadata and focus targets, shared CSS tokens for UI values, and the scene palette for materials. Keep animation values out of React state; bound frame deltas and clean up subscriptions. All room visuals must be created in code.

Before a pull request:

```sh
npm run format
npm run check
npx playwright install chromium
npm run test:e2e
```

Commit `package-lock.json` alongside dependency changes. Include meaningful behavior tests when changing selection, motion, or accessibility. Check desktop, narrow mobile, browser zoom, keyboard-only operation, and reduced motion. Describe the problem, resulting behavior, validation, and remaining limitations in the PR. Attach screenshots for visual changes. Do not commit builds, secrets, recordings, or test artifacts.

CI checks pull requests. Production deployment happens only after verification on `main`. Updating pinned GitHub Action revisions requires checking the corresponding official release.
