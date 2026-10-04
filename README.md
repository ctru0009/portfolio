# Portfolio Website

A personal portfolio website in a 1-bit Macintosh design, built with React, TypeScript, and Vite. TailwindCSS carries the design language; the site ships zero motion by design.

The light-only 1-bit theme and pure-white paper are intentional: there is no dark mode and no paper tint.

**Live Site**: [https://www.congchuongtruong.net/](https://www.congchuongtruong.net/)

## Features

- **Responsive Design**: Mobile-first approach that looks great on all devices
- **Macintosh Desktop Design**: Window chrome, menu bar, and numbered step sections in a strict 1-bit palette
- **Interactive Navigation**:
  - Keyboard-navigable Find dialog across skills, projects, and experience
  - Scroll spy for active section highlighting
  - Anchor navigation between sections
- **Contact Links**: Email, LinkedIn, GitHub, and resume links
- **Performance Optimized**: WebP images and optimized build configuration

## Tech Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 8.3.1
- **Styling**: TailwindCSS 3.4.14 with PostCSS
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 22 (see `.nvmrc`)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ctru0009/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
npm ci
```

3. No environment variables are required to build or run the site.

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Building for Production

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

This project is configured for GitHub Pages deployment. Pushing to `main` runs lint, format check, build and the Playwright suite → deploy via GitHub Actions.

To deploy manually:

```bash
npm run deploy
```

## Project Structure

```
portfolio/
├── public/                 # favicon.svg, og-image.png
├── docs/                   # Project documentation
├── src/
│   ├── components/         # React components
│   │   ├── common/        # Footer
│   │   ├── mac/           # Macintosh chrome primitives (window, dialogs, buttons, labels)
│   │   ├── sidebar/       # Identity sidebar
│   │   ├── about/         # About section
│   │   ├── skills/        # Skills section
│   │   ├── works/         # Work history section
│   │   ├── projects/      # Projects showcase
│   │   └── contact/       # Contact section
│   ├── data/              # data.ts (content) and searchIndex.ts (Find dialog)
│   ├── assets/            # Fonts and images
│   └── App.tsx            # Main app component
├── index.html             # HTML entry with SEO/social meta
├── eslint.config.js       # ESLint flat config (type-aware strict rules)
├── tsconfig.*.json        # App, tooling and test TypeScript projects
├── tailwind.config.js     # Design tokens
├── package.json           # Dependencies and scripts
└── vite.config.ts         # Vite configuration
```

## Customization

### Updating Content

Portfolio content is managed in `src/data/data.ts`:

- Personal information
- Work experience
- Projects
- Education
- Contact information

Find-dialog search entries live in `src/data/searchIndex.ts`; skills are defined in `src/components/skills/Skills.tsx`.

### Styling

The project uses TailwindCSS. Customize the design by:

1. Editing component classes directly
2. Modifying `tailwind.config.js` for design tokens (colors, type ladder, shadows)
3. Adding custom CSS in `src/index.css`

## Scripts

| Command                | Description                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| `npm run dev`          | Start development server with HMR                                                                |
| `npm run build`        | Build for production (TypeScript + Vite)                                                         |
| `npm run preview`      | Preview production build locally                                                                 |
| `npm run lint`         | Run ESLint with `--max-warnings 0`                                                               |
| `npm run format`       | Format all files with Prettier                                                                   |
| `npm run format:check` | Check formatting with Prettier                                                                   |
| `npm run check`        | Definition of done: lint plus `tsc -b` (app, tooling and test projects) and the production build |
| `npm run test:e2e`     | Run the Playwright smoke test (install the browser first with `npx playwright install chromium`) |
| `npm run deploy`       | Build and deploy to GitHub Pages                                                                 |

## Code Quality

- **Lint**: ESLint flat config with type-aware `strictTypeChecked` rules for `src/**` and `vite.config.ts`, a per-function `complexity` cap of 10, and `--max-warnings 0` so warnings fail the run.
- **Types**: `tsc -b` type-checks the app, tooling and test projects (`tsconfig.app.json`, `tsconfig.node.json`, `tsconfig.test.json`) — `tests/**` and `playwright.config.ts` included. `src` is pinned to browser-only typings.
- **Tests**: the Playwright suite (`npm run test:e2e`) covers navigation, content, contact, chrome metadata and axe accessibility, and runs against the built `dist/` — build first.

## License

This project is open source and available under the MIT License.

## Author

**Cong Chuong Truong**

- GitHub: [@ctru0009](https://github.com/ctru0009)
- Website: [https://www.congchuongtruong.net](https://www.congchuongtruong.net)
