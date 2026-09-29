# Portfolio Project Structure

This document provides the complete technology stack and file tree structure for the portfolio website project. **AI agents MUST read this file to understand the project organization before making any changes.**

## Technology Stack

### Frontend Technologies

- **TypeScript 5.x** with **npm** - Type-safe JavaScript development and dependency management
- **React 18.3.1** - UI framework with hooks and concurrent features
- **Vite 5.4.10** - Development server and build tool with fast hot reload
- **TailwindCSS 3.4.14** - Utility-first CSS framework; 1-bit design tokens in `tailwind.config.js`

### Runtime Integrations

- **None** - the site is fully static; contact is via external links (email, LinkedIn, GitHub, resume)

### Development & Quality Tools

- **ESLint** - Code quality and linting for React/TypeScript
- **TypeScript Compiler** - Static type checking and compilation
- **GitHub Pages** - Static site hosting and deployment
- **gh-pages** - npm package for automated GitHub Pages deployment

### Development Patterns

- **Component-Based Architecture** - Modular React components organized by feature
- **Section-Based Layout** - Portfolio organized into numbered step sections (About, Skills, Work, Projects, Contact)
- **Data Centralization** - Content data managed in `src/data/data.ts`; find entries in `src/data/searchIndex.ts`
- **Macintosh Design Language** - 1-bit window chrome primitives in `src/components/mac/`
- **Zero Motion** - No transitions or animations anywhere in `src/`
- **Keyboard Accessibility** - Focus-trapped dialogs, keyboard-navigable Find, 44px mobile tap targets

## Complete Project Structure

```
portfolio/
├── README.md                           # Project overview and setup
├── CLAUDE.md                           # Master AI context file
├── package.json                        # Dependencies and scripts
├── package-lock.json                   # Locked dependency versions
├── vite.config.ts                      # Vite build configuration
├── tsconfig.json                       # TypeScript configuration
├── tailwind.config.js                  # Design tokens (palette, type ladder, shadows)
├── postcss.config.js                   # PostCSS configuration for Tailwind
├── .gitignore                          # Git ignore patterns
├── .nvmrc                              # Node version for CI and local dev (22)
├── docs/                               # Documentation directory
│   └── ai-context/                     # AI-specific documentation
│       ├── project-structure.md        # This file - project architecture
│       ├── docs-overview.md            # Documentation system overview
│       ├── system-integration.md       # Cross-component patterns
│       ├── deployment-infrastructure.md # Deployment patterns
│       └── handoff.md                  # Session continuity
├── public/                             # Static assets
│   ├── favicon.svg                     # Mac-window favicon
│   └── og-image.png                    # Social sharing card (1200×630)
├── index.html                          # Vite entry with SEO/OpenGraph meta
├── src/                                # Source code
│   ├── main.tsx                        # Application entry point
│   ├── App.tsx                         # Root composition (MenuBar → MacWindow → StatusBar → Footer)
│   ├── index.css                       # Global styles and Tailwind imports
│   ├── vite-env.d.ts                   # Vite TypeScript definitions
│   ├── components/                     # React components organized by feature
│   │   ├── common/                     # Shared components
│   │   │   └── Footer.tsx              # Footer with contact links
│   │   ├── mac/                        # Macintosh chrome primitives
│   │   │   ├── MacWindow.tsx           # Window chrome + MetaBar
│   │   │   ├── MacDialog.tsx           # Focus-trapped dialog shell
│   │   │   ├── FindDialog.tsx          # Keyboard-navigable find dialog
│   │   │   ├── MenuBar.tsx             # Sticky menu bar with scroll spy
│   │   │   ├── SquareButton.tsx        # Square action button
│   │   │   ├── SquareLink.tsx          # Square external link
│   │   │   ├── TitleBar.tsx            # Shared title bar
│   │   │   ├── FactRow.tsx             # Label/value row
│   │   │   ├── TagChip.tsx             # Tag chip
│   │   │   ├── StepTitle.tsx           # Numbered section title
│   │   │   ├── StatusBar.tsx           # Window status bar
│   │   │   ├── linkClass.ts            # Shared link styling
│   │   │   └── squareClass.ts          # Shared button/link classes
│   │   ├── sidebar/                    # Identity sidebar
│   │   │   └── Sidebar.tsx             # Sticky identity block with facts and links
│   │   ├── about/                      # About section
│   │   │   └── About.tsx               # About copy and education
│   │   ├── skills/                     # Skills section
│   │   │   └── Skills.tsx              # Skills table
│   │   ├── works/                      # Work history section
│   │   │   ├── Work.tsx                # Work section
│   │   │   └── WorkCard.tsx            # Individual work experience card
│   │   ├── projects/                   # Projects section
│   │   │   ├── Projects.tsx            # Projects grid
│   │   │   ├── ProjectCard.tsx         # Individual project card
│   │   │   └── ProjectPreview.tsx      # Wider preview dialog
│   │   └── contact/                    # Contact section
│   │       ├── Contact.tsx             # Contact rows and links
│   │       └── ContactItem.tsx         # Individual contact information item
│   ├── data/                           # Content data management
│   │   ├── data.ts                     # Centralized portfolio data with TypeScript interfaces
│   │   └── searchIndex.ts              # Find-dialog search entries
│   ├── assets/                         # Static assets
│   │   ├── fonts/                      # Departure Mono webfont
│   │   └── images/                     # Image assets (avatar, project screenshots)
├── dist/                               # Build output directory (gitignored)
└── node_modules/                       # Dependencies (gitignored)
```

---

_This document reflects the current state of the portfolio project: Macintosh design, zero motion, keyboard-accessible dialogs, and static output._

## Known Technical Debt

- **Unbundled legacy assets**: screenshots for removed projects remain in `src/assets/images` (not built into the bundle)

## Security Features

- **No forms or user-submitted data**: contact is via external links only; nothing is transmitted to a server
- **No secrets in the client**: the bundle contains no keys or endpoints
- **No CI secrets**: the workflows inject no secrets
