# System Integration Documentation

This document contains cross-component integration patterns and system-wide architectural decisions for the portfolio website.

## Component Integration Patterns

### Data Flow Architecture

- **Centralized Data Management**: All content data flows from `src/data/data.ts` to components
- **Unidirectional Data Flow**: Components receive data via props; no complex state management
- **Static Data, Static Rendering**: Content is static and the site ships zero motion by design

### Navigation Integration

- **Section Anchor Navigation**: Sections are anchored (`#home` … `#contact`) and linked from the menu bar
- **Find Dialog**: `src/components/mac/FindDialog.tsx` filters `src/data/searchIndex.ts` with keyboard navigation (arrows + Enter)
- **Scroll Spy**: Active section highlighting via an rAF-throttled, passive scroll listener in `MenuBar.tsx`
- **Mobile Menu**: `≡ Menu` dropdown below the 800px breakpoint with outside-click and Escape handling

### Interaction Integration

- **Zero Motion**: No transitions or animations; hover inverts colors and active states press in
- **Dialogs**: `MacDialog.tsx` traps focus while open and restores it to the opener on close
- **Tap Targets**: interactive controls measure at least 44px on mobile

## External Service Integration

### Runtime Services

- **None**: the site is fully static and makes no network requests
- **Contact**: mailto / LinkedIn / GitHub / resume links only
- **Legacy**: the `VITE_WEB3FORMS_ACCESS_KEY` CI secret was removed from the workflows and can be deleted from repository settings

### GitHub Pages Deployment

- **Build Process**: Automated build and deployment via GitHub Actions on push to `main`
- **Base Path Configuration**: Proper asset path handling for GitHub Pages
- **Custom Domain**: CNAME file configuration for custom domain
- **Asset Optimization**: WebP image format and build optimization

## Performance Patterns

### Code Splitting

- **Component-Level Imports**: Individual component imports for optimized bundling
- **Image Optimization**: WebP format; project screenshots use `loading="lazy"`
- **Static Output**: No client-side data fetching

### Rendering Performance

- **rAF-Throttled Scroll**: scroll-spy updates coalesced into animation frames
- **Zero Motion**: no animation work on the main thread
- **Self-Hosted Font**: Departure Mono with `font-display: swap`

## Security Integration

### Client Security

- **No Secrets in Client**: nothing sensitive ships in the bundle
- **No Server-Bound Input**: the only input is local Find filtering; nothing is transmitted
- **External Links**: opened with `rel="noopener noreferrer"`

### Environment Security

- **CI**: the workflows inject no secrets; the site builds without environment configuration

## Error Handling Strategies

### Navigation Error Handling

- **Missing Sections**: section lookups guard against null elements
- **Search Errors**: empty-state handling in the Find dialog
- **Accessibility**: ARIA labels and keyboard navigation support

## Testing Integration Patterns

### Component Testing

- **No unit-test runner is configured**: verify changes with `npm run check` (lint + build) and `npm run test:e2e` (Playwright smoke test against the built site)
- **Accessibility Testing**: an axe scan runs in the Playwright smoke test (asserts zero critical violations); keyboard and focus behaviour checked manually in the browser

---

_This document reflects the current integration patterns in the portfolio website: static output, zero motion, keyboard-accessible dialogs, and external-link contact._
