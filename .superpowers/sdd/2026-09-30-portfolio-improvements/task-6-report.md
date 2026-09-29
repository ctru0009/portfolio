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

---

## Reviewer fix round 1 — Contact anchor end spacing and axe gate

### Changes

- Increased the outer page wrapper's desktop-only bottom padding from 8px to Tailwind `pb-36` (144px), an additional 136px of page-end scroll room at widths ≥800px. The mobile padding is unchanged. No section IDs, navigation logic, focus behavior, Contact content, or footer content changed.
- Replaced the desktop Contact anchor exception (151px) with the same absolute target as the other desktop anchors: 16px from the sticky menu bottom, ±8px. Kept the mobile target at 10px (the 46px menu plus 10px, within the 16px ±8px gate). Click, reload, and back measurements all retain absolute checks.
- Restored the explicit zero-critical axe assertion while retaining the zero-serious and no-moderate-region checks.
- This resolves the prior report's intentionally retained max-scroll limitation above.

### Evidence and validation

- Before screenshots at 1440×900 and 390×844 showed the Contact section at 151px and 10px from the menu bottom respectively. On desktop, the page was at maximum scroll with the Contact section still 135px below its 16px target.
- Red check: `npx playwright test tests/e2e/smoke.spec.ts --grep "section links keep their anchor offset|accessibility violations"` — the new Contact absolute assertion failed as expected (deviation 135px); the axe test passed.
- Focused green check: same command after the spacing change — **2 passed**. Logged offsets for every section across click, reload, and back: **16px at 1440px** and **10px at 390px**.
- `npm run check` — passed (ESLint and TypeScript/Vite build).
- `npm run format:check` — passed.
- `npm run test:e2e` — first run: 12 passed, one intermittent reload-anchor assertion failed at the reload measurement; immediate rerun: **13 passed**. Follow-up `npx playwright test tests/e2e/smoke.spec.ts --grep "section links keep their anchor offset" --repeat-each=5 --workers=3` — **5 passed**, with reload offsets stable at 16px/10px.
- `git diff --check` — passed.

### Visual review

Captured and inspected before/after Contact-and-footer views at both requested viewport sizes:

- Before: `/private/var/folders/qg/s7ncn_z15fn_qmk8b33qky900000gn/T/opencode/task6-before-1440.png` and `task6-before-390.png`.
- After: `/private/var/folders/qg/s7ncn_z15fn_qmk8b33qky900000gn/T/opencode/task6-after-1440.png` and `task6-after-390.png`.
- Footer-at-page-end captures: `task6-before-{1440,390}-footer.png` and `task6-after-{1440,390}-footer.png` in the same directory.

After the change, the `#contact` container is 16px below the desktop menu and 10px below the mobile menu. The desktop Mac window and footer remain visually intact; the extra runway is the dotted desktop canvas after the footer, not a blank gap inside the window. It measures about 144px at the bottom edge and is the minimum practical page-end room for this page's existing layout to let the Contact target reach the requested range. The captures show this as a clear but contained desktop end margin, not whitespace interrupting the Contact content or Mac window. Mobile layout and footer position are unchanged: before and after, the footer occupies y=734–836 of the 844px viewport. No motion or other visual changes were introduced.

### Concern

- The full E2E suite had one non-reproducible reload-anchor failure on its first parallel run; the full rerun and five repeated focused anchor runs all passed. Keep an eye on the existing reload-scroll check if it becomes flaky again.
