# Repository Guide

Working notes for coding agents. `CLAUDE.md` imports this file — keep it the single source of truth.

Static portfolio: React 18 + Vite 8 + TypeScript + Tailwind 3, 1-bit Macintosh design. No backend, no environment variables, no motion by design.

## Commands

- Install: `npm ci`
- Dev server: `npm run dev`
- **Definition of done: `npm run check`** — zero-warning lint plus the full build (`tsc -b && vite build`)
- Format: `npm run format` · verify: `npm run format:check`
- Smoke test (requires a build; install the browser once with `npx playwright install chromium`): `npm run test:e2e`
- No unit-test runner is configured. Use only these commands.

## Lint and type gates

- `npm run lint` runs ESLint with `--max-warnings 0` — warnings fail CI exactly like errors.
- Type-aware `strictTypeChecked` applies to `src/**` and `vite.config.ts` (via `projectService`), with two deliberate tunings: `restrict-template-expressions` allows numbers, `no-confusing-void-expression` ignores arrow shorthand. `tests/**` and `playwright.config.ts` are type-checked by `tsc` but linted with the base rules only.
- `complexity` is capped at 10 per function; MacDialog's focus trap sits exactly at the cap — split it before adding branches.
- `@types/node` exists for the test and tooling projects only; `tsconfig.app.json` sets `"types": []` so node globals stay out of `src`.
- Unused `eslint-disable` directives are errors: remove the directive instead of silencing it.

## Architecture

- Entry: `src/main.tsx` → `src/App.tsx` — `MenuBar` → `MacWindow` (`Sidebar` + numbered sections) → `Footer`.
- Section IDs — `home`, `about`, `skills`, `works`, `projects`, `contact` — live in the section components, `src/data/data.ts` (`NavigationData`), and `src/data/searchIndex.ts` (Find dialog). Keep all three in sync.
- Content: `src/data/data.ts`. Skills data: `src/components/skills/Skills.tsx`. Macintosh primitives: `src/components/mac/`.
- Styling: design tokens in `tailwind.config.js`, global styles in `src/index.css`. The site ships zero motion — keep transitions and animations out.
- Interaction standards: dialogs stay focus-trapped; mobile tap targets ≥ 44px.

For deployment topology and CI details, read `docs/ai-context/deployment-infrastructure.md`.

## Rules

- Run `npm run check` before finishing any change and fix what it reports.
- Stage files by explicit path — never `git add -A`; it would sweep the deliberately untracked spec files (`spec.md`, `spec-locked.md`, `docs/superpowers/`) into a commit.
- Ask first before adding a dependency, changing CI, or changing a section ID.
- Use `npm audit` for information only; `npm audit fix --force` upgrades `vite` outside `@vitejs/plugin-react@4`'s peer range and breaks installs.
- Never commit secrets — the site needs none.
- Deployments run in CI on `main` pushes; leave `npm run deploy` to the owner.
- Commit messages follow Conventional Commits (`feat(scope): …`).

## CI

- Pull requests: `.github/workflows/ci.yml` runs lint, format check, build, and the Playwright smoke test.
- `main` pushes: `.github/workflows/main.yml` runs the same suite, then deploys to `gh-pages` (`www.congchuongtruong.net`) only if every check passes; manual runs deploy from `main` only.
- `main` is branch-protected: land changes via PR with the `verify` check green — direct and force pushes are rejected, admins included.
