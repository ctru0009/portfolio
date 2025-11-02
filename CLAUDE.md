# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with React, TypeScript, and Vite. The site showcases work experience, projects, skills, and contact information. It uses TailwindCSS for styling and Framer Motion for animations.

## Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build` (runs TypeScript compilation and Vite build)
- **Preview production build**: `npm run preview`
- **Lint code**: `npm run lint`
- **Deploy to GitHub Pages**: `npm run deploy` (builds and deploys to gh-pages branch)

## Architecture

### Component Structure
The app follows a section-based architecture with components organized by feature:

- **Main App**: `src/App.tsx` - Renders all sections in order
- **Common Components**: `src/components/common/`
  - `NavBar.tsx` - Navigation with smooth scrolling, responsive mobile menu, and search functionality
  - `Footer.tsx` - Footer with navigation links
  - `ScrollProgress.tsx` - Reading progress indicator
- **Section Components**: `src/components/[section]/`
  - `Hero.tsx` - Introduction section with avatar and links
  - `About.tsx` - Education background
  - `Skills.tsx` - Technical skills display
  - `Work.tsx` / `WorkCard.tsx` - Work experience
  - `Projects.tsx` / `ProjectCard.tsx` / `ProjectDetails.tsx` - Project showcase
  - `Contact.tsx` / `ContactItem.tsx` - Contact information and Web3Forms contact form

### Data Management
- All content data is centralized in `src/data/data.ts`
- TypeScript interfaces define data structures for type safety
- Images are imported as modules in the data file
- Navigation data drives both NavBar and Footer components

### Contact Form & Security
- **Web3Forms Integration**: Contact form uses Web3Forms for secure form submission
- **Honeypot Field**: Spam protection with dedicated honeypot field
- **Form Validation**: Comprehensive client-side validation with error handling
- **Web3Forms Utility**: Dedicated module (`src/utils/web3Forms.ts`) for form handling

### Styling and Assets
- TailwindCSS for utility-first styling
- Images stored in `src/assets/images/` (WebP format for performance)
- Framer Motion for scroll animations and transitions
- Responsive design with mobile-first approach
- Footer navigation uses React key props for optimized rendering

### Navigation Features
- **Search Functionality**: Advanced search across skills, projects, technologies, and experience
- **Responsive Mobile Menu**: Smooth animations and mobile-first navigation
- **Scroll Spy**: Active section highlighting based on scroll position
- **Accessibility**: ARIA labels and keyboard navigation support

### Deployment
- Configured for GitHub Pages deployment
- Custom domain via CNAME file
- Base path set to '/' in vite.config.ts
- Build outputs to `dist/` directory

## Key Technical Details

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.10 with React plugin
- **Styling**: TailwindCSS 3.4.14 with PostCSS
- **Animations**: Framer Motion 11.11.10
- **Icons**: React Icons 5.3.0
- **Additional Libraries**: React Intersection Observer, React Syntax Highlighter
- **Deployment**: GitHub Pages via gh-pages package

## Known Issues & Technical Debt

- **Work Component Path**: Inconsistent paths - Work components exist in both `/work/` and `/works/` directories
- **Lint Warning**: NavBar.tsx has a missing useEffect dependency (minor issue)
- **Unused Imports**: Styled Components imported but not actively used

## Environment Setup

- **Web3Forms**: Requires `VITE_WEB3FORMS_ACCESS_KEY` environment variable
- **GitHub Actions**: Automatically handles environment secrets for deployment
- **Development**: Uses Vite's hot module replacement for fast development