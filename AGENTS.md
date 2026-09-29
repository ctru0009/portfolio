# Repository Guide

## Commands

- Install the lockfile exactly with `npm ci`.
- Run locally with `npm run dev`; preview a production build with `npm run preview`.
- Verify changes with `npm run lint` followed by `npm run build`. The build runs `tsc -b` before Vite, so there is no separate typecheck script.
- No automated test runner is configured. Do not invent a test command; use lint, build, and focused browser checks for the changed UI.
- `npm run deploy` publishes `dist/` to the `gh-pages` branch after a build; pushing to `main` runs the same lint → build → deploy flow through `.github/workflows/main.yml`. Treat both as release actions, not verification.

## Architecture and Content

- `src/main.tsx` mounts the single React app; `src/App.tsx` composes the mac shell — `MenuBar`, then `MacWindow` containing `Sidebar` and the section components, then `Footer`.
- Portfolio copy, links, navigation entries, work history, projects, and skills live in `src/data/data.ts`. Prefer updating that data over duplicating content in components.
- Section IDs are `home`, `about`, `skills`, `works`, `projects`, `contact`; both `NavigationData` links and the Find dialog entries in `src/data/searchIndex.ts` must match them.
- The active work section is `src/components/works/Work.tsx` with ID `works`; the similarly named `src/components/work/Work.tsx` is an orphan not imported by `App.tsx`.
- UI: macintosh primitives live in `src/components/mac/` (window, menu bar, status bar, buttons, dialogs), the profile panel in `src/components/sidebar/Sidebar.tsx`, `Footer` in `src/components/common/`, and page sections by feature under `src/components/`.
- The monochrome macintosh system is defined in `tailwind.config.js` — palette tokens (`ink`, `paper`, `chrome`, `desktop`, `panel`, `muted`), hard offset shadows, and the Departure Mono font — with global styles in `src/index.css` and `src/App.css`. Tailwind scans `index.html` and `src/**/*.{js,ts,jsx,tsx}`.

## Contact Form

- Contact submission flows from `src/components/contact/ContactForm.tsx` through `src/utils/web3forms.ts` to Web3Forms.
- Copy `.env.example` to `.env` and set `VITE_WEB3FORMS_ACCESS_KEY` to exercise submission. The app can build without it, but the contact form reports that it is unconfigured.
- Preserve the honeypot and client-side validation when changing the form. Read `src/utils/CONTEXT.md` when modifying this integration, but verify claims against the implementation because that document may lag the code.
