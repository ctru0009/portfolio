# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with React, TypeScript, and Vite in a 1-bit Macintosh design language (window chrome, menu bar, dotted desktop). It showcases work experience, projects, skills, and contact information. Styling is TailwindCSS; the site deliberately ships zero motion.

## Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build` (runs TypeScript compilation and Vite build)
- **Preview production build**: `npm run preview`
- **Lint code**: `npm run lint`
- **Deploy to GitHub Pages**: `npm run deploy` (builds and deploys to gh-pages branch)

## Architecture

### Component Structure
The app follows a section-based architecture with components organized by feature:

- **Main App**: `src/App.tsx` — MenuBar, MacWindow (Sidebar + numbered step sections), StatusBar, Footer
- **Mac chrome primitives**: `src/components/mac/` — shared Macintosh UI (MacWindow, MacDialog, FindDialog, MenuBar, SquareButton, SquareLink, TitleBar, FactRow, TagChip, StepTitle, StatusBar, linkClass, squareClass)
- **Sidebar**: `src/components/sidebar/Sidebar.tsx` — sticky identity block with facts and links
- **Section Components**: `src/components/[section]/` — About, Skills, Works, Projects, Contact (each section is a numbered step)

### Data Management
- Content data is centralized in `src/data/data.ts` (`HeroData`, `AboutData`, `WorkData`, `ProjectsData`, `NavigationData` with TypeScript interfaces)
- Find-dialog search entries live in `src/data/searchIndex.ts`
- Skills are defined in `src/components/skills/Skills.tsx`
- Images are imported as modules in the data file

### Contact & Security
- The site has no contact form or server integration; `#contact` renders contact rows and external links (email, LinkedIn, GitHub, resume)
- No environment variables are required to build or run the site
- The legacy `VITE_WEB3FORMS_ACCESS_KEY` CI secret may remain wired but is unused (tidy deferred)

### Styling and Assets
- TailwindCSS for utility-first styling; design tokens in `tailwind.config.js` (1-bit palette, hard shadow ladder, numeric type ladder)
- Global base styles and Mac component classes live in `src/index.css`
- Zero-motion discipline: no transitions or animations anywhere in `src/`
- Images in `src/assets/images/` (WebP format for performance); favicon and og-image in `public/`

### Navigation Features
- **Find Dialog**: keyboard-navigable search (arrows + Enter) across skills, projects, and experience
- **Mobile Menu**: `≡ Menu` dropdown below the 800px breakpoint
- **Scroll Spy**: active section highlighting via an rAF-throttled passive scroll listener
- **Accessibility**: focus-trapped dialogs with focus restore; 44px tap targets on mobile

### Deployment
- Configured for GitHub Pages deployment; pushing to `main` runs lint → build → deploy via GitHub Actions
- Custom domain via CNAME file
- Base path set to '/' in vite.config.ts
- Build outputs to `dist/` directory

## Key Technical Details

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.10 with React plugin
- **Styling**: TailwindCSS 3.4.14 with PostCSS
- **Deployment**: GitHub Pages via gh-pages package

## Environment Setup

- **No environment variables required** for local development or build
- **GitHub Actions**: runs lint and build, then deploys to the gh-pages branch
- **Development**: Uses Vite's hot module replacement for fast development
