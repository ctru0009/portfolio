# Portfolio Project Structure

This document provides the complete technology stack and file tree structure for the portfolio website project. **AI agents MUST read this file to understand the project organization before making any changes.**

## Technology Stack

### Frontend Technologies
- **TypeScript 5.x** with **npm** - Type-safe JavaScript development and dependency management
- **React 18.3.1** - UI framework with hooks and concurrent features
- **Vite 5.4.10** - Development server and build tool with fast hot reload
- **TailwindCSS** - Utility-first CSS framework for rapid styling
- **Framer Motion 11.11.10** - Animation library for smooth transitions and interactions

### Integration Services & APIs
- **EmailJS Browser 4.4.1** - Email service integration for contact form functionality
- **React Icons** - Icon library for UI components
- **React Syntax Highlighter** - Code syntax highlighting for projects section

### Development & Quality Tools
- **ESLint** - Code quality and linting for React/TypeScript
- **TypeScript Compiler** - Static type checking and compilation
- **GitHub Pages** - Static site hosting and deployment
- **gh-pages** - npm package for automated GitHub Pages deployment

### Development Patterns
- **Component-Based Architecture** - Modular React components organized by feature
- **Section-Based Layout** - Portfolio organized into distinct sections (Hero, About, Skills, Work, Projects, Contact)
- **Data Centralization** - All content data managed in `src/data/data.ts` with TypeScript interfaces
- **Responsive Design** - Mobile-first approach with TailwindCSS responsive utilities
- **Animation Integration** - Framer Motion for scroll-based animations and micro-interactions

## Complete Project Structure

```
portfolio/
├── README.md                           # Project overview and setup
├── CLAUDE.md                           # Master AI context file
├── package.json                        # Dependencies and scripts
├── package-lock.json                   # Locked dependency versions
├── vite.config.ts                      # Vite build configuration
├── tsconfig.json                       # TypeScript configuration
├── tailwind.config.js                  # TailwindCSS configuration
├── postcss.config.js                   # PostCSS configuration for Tailwind
├── .gitignore                          # Git ignore patterns
├── .env.example                        # Environment variable template
├── .env                                # Environment variables (gitignored)
├── docs/                               # Documentation directory
│   └── ai-context/                     # AI-specific documentation
│       ├── project-structure.md        # This file - project architecture
│       ├── docs-overview.md            # Documentation system overview
│       ├── system-integration.md       # Cross-component patterns
│       ├── deployment-infrastructure.md # Deployment patterns
│       └── handoff.md                  # Session continuity
├── public/                             # Static assets
│   ├── index.html                      # Main HTML template
│   ├── favicon.ico                     # Site favicon
│   └── CNAME                           # Custom domain configuration
├── src/                                # Source code
│   ├── main.tsx                        # Application entry point
│   ├── App.tsx                         # Root component with section routing
│   ├── index.css                       # Global styles and Tailwind imports
│   ├── vite-env.d.ts                   # Vite TypeScript definitions
│   ├── components/                     # React components organized by section
│   │   ├── common/                     # Shared components
│   │   │   ├── NavBar.tsx              # Navigation with smooth scrolling
│   │   │   ├── Footer.tsx              # Footer with navigation links
│   │   │   └── ScrollProgress.tsx      # Reading progress indicator
│   │   ├── hero/                       # Hero section components
│   │   │   └── Hero.tsx                # Introduction section with avatar and links
│   │   ├── about/                      # About section components
│   │   │   └── About.tsx               # Education background section
│   │   ├── skills/                     # Skills section components
│   │   │   ├── Skills.tsx              # Technical skills display
│   │   │   └── SkillItem.tsx           # Individual skill component
│   │   ├── work/                       # Work experience components
│   │   │   ├── Work.tsx                # Work experience section
│   │   │   └── WorkCard.tsx            # Individual work experience card
│   │   ├── works/                      # Alternative work components
│   │   │   ├── Work.tsx                # Work section
│   │   │   └── WorkCard.tsx            # Work experience card
│   │   ├── projects/                   # Projects section components
│   │   │   ├── Projects.tsx            # Projects showcase section
│   │   │   ├── ProjectCard.tsx         # Individual project card
│   │   │   └── ProjectDetails.tsx      # Project details modal
│   │   └── contact/                    # Contact section components
│   │       ├── Contact.tsx             # Contact information and layout
│   │       ├── ContactForm.tsx         # EmailJS-powered contact form
│   │       └── ContactItem.tsx         # Individual contact information item
│   ├── data/                           # Content data management
│   │   └── data.ts                     # Centralized portfolio data with TypeScript interfaces
│   ├── assets/                         # Static assets
│   │   └── images/                     # Image assets
│   │       ├── avatar.webp             # Profile picture
│   │       ├── project1.webp           # Project 1 screenshot
│   │       ├── project2.webp           # Project 2 screenshot
│   │       ├── project3.webp           # Project 3 screenshot
│   │       └── project4.webp           # Project 4 screenshot
│   └── utils/                          # Utility functions
│       └── emailjs.ts                  # EmailJS integration utilities
├── dist/                               # Build output directory
├── docs/                               # Additional documentation
│   ├── EMAILJS_SETUP.md                # EmailJS configuration guide
│   └── EMAILJS_TEMPLATE.md             # Email template setup instructions
└── node_modules/                       # Dependencies (gitignored)
```

---

*This document reflects the current state of the portfolio project with EmailJS integration and component-based architecture.*