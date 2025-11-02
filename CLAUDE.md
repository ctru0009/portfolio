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
  - `NavBar.tsx` - Navigation with smooth scrolling
  - `Footer.tsx` - Footer with navigation links
  - `ScrollProgress.tsx` - Reading progress indicator
- **Section Components**: `src/components/[section]/`
  - `Hero.tsx` - Introduction section with avatar and links
  - `About.tsx` - Education background
  - `Skills.tsx` - Technical skills display
  - `Work.tsx` / `WorkCard.tsx` - Work experience
  - `Projects.tsx` / `ProjectCard.tsx` / `ProjectDetails.tsx` - Project showcase
  - `Contact.tsx` / `ContactItem.tsx` - Contact information

### Data Management
- All content data is centralized in `src/data/data.ts`
- TypeScript interfaces define data structures for type safety
- Images are imported as modules in the data file
- Navigation data drives both NavBar and Footer components

### Styling and Assets
- TailwindCSS for utility-first styling
- Images stored in `src/assets/images/` (WebP format for performance)
- Framer Motion for scroll animations and transitions
- Responsive design with mobile-first approach
- Footer navigation uses React key props for optimized rendering

### Deployment
- Configured for GitHub Pages deployment
- Custom domain via CNAME file
- Base path set to '/' in vite.config.ts
- Build outputs to `dist/` directory

## Key Technical Details

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with React plugin
- **Styling**: TailwindCSS with PostCSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Deployment**: GitHub Pages via gh-pages package