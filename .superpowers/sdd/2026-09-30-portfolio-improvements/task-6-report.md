# Task 6 report — Image stability, landmark and metadata

## Implementation

- Moved the single `<main>` landmark around the full `MacWindow`, including its window chrome and sidebar. Kept the existing `home` ID and section IDs unchanged.
- Added the approved canonical URL (`https://www.congchuongtruong.net/`) plus descriptive Open Graph and Twitter image alt metadata.
- Added intrinsic width/height to every project image record and applied them to both card and preview images. Image markup remains conditional, so image-less projects do not trigger image requests.
- Re-exported `avatar.webp` at 140×152 (from 1041×1130), preserving its aspect ratio; kept its current CSS-rendered sizes and specified the new source dimensions in markup.
- Added browser coverage for landmarks, canonical/share metadata, image dimensions, desktop/mobile section navigation/reload/back anchor positions, and axe checks for serious violations and moderate `region` violations.
- Preserved the project IDs, Find behavior/highlight, and desktop Contents links. CV links are unchanged; no `/cv.pdf` was added.

## Baseline and paired anchor evidence

Before source implementation, the focused browser run failed the new landmark assertion (`main aside` had zero matches). The anchor capture also exposed a pre-existing end-of-page constraint: desktop `#contact` cannot scroll to the usual alignment because the browser has reached maximum scroll. The capture test was calibrated to preserve this observed baseline rather than treating it as image-induced drift.

Offsets are the section target's top relative to the sticky menu's bottom, in CSS pixels. Navigation captures covered all five non-home anchors at both widths; reload captured `#contact`; back traversed the preceding section targets. Baseline captures were performed against the unchanged source/build before implementation, and the final run repeated those same browser actions.

| Viewport | Anchors via navigation | Reload | Back traversal |
| --- | --- | --- | --- |
| Desktop 1440×900 | about 16, skills 16, works 16, projects 16, contact 151 | contact 151 | projects 16, works 16, skills 16, about 16 |
| Mobile 390×844 | about 10, skills 10, works 10, projects 10, contact 10 | contact 10 | projects 10, works 10, skills 10, about 10 |

**After implementation:** the paired captures produced the identical offsets above; every value remained within the test's ±8px baseline tolerance. No lazy-image anchor drift was reproduced, so this change does not claim to fix such drift. The desktop Contact offset is a pre-existing maximum-scroll limitation, not a lazy-image shift.

## Verification evidence

- Focused checks before implementation: `npm run test:e2e -- --grep 'landmarks, share metadata|section links keep their anchor offset'` — failed as expected because the old landmark boundary excluded the sidebar; recorded the baseline anchors in the test output.
- An intermediate focused run found that the approved URL existed as `og:url` but not as a canonical `<link>`; added the explicit canonical link. Final smoke coverage checks it along with avatar/card/preview image dimensions.
- `npm run check` — passed (ESLint and TypeScript/Vite production build).
- `npm run format:check` — passed (all files formatted).
- `npm run test:e2e` — passed, 13 tests; axe found zero serious violations and zero moderate `region` violations.
- Avatar source verified as WebP, 140×152, via `file` and `sips`.
- No local PDF was supplied/found under the repository (only `public/og-image.png` and `public/favicon.svg`); PDF signature verification was therefore not applicable. Remote CV links remain untouched.

## Remaining review

The social image description is factual based on the supplied `public/og-image.png`. Visual/content suitability and permission review remain with the owner. Existing desktop Contact bottom-of-page alignment remains constrained by maximum scroll and was intentionally not “fixed” with additional page space/layout changes.
