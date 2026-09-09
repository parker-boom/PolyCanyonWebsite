# September 8 website review

This pass follows Parker’s desktop review. Home now starts with Shell House and three manually selected photographic features. The collection has a single random-structure button, quiet research disclosure, and separated number/name/year hierarchy. The header is tighter and the footer is one compact band.

About is a single-column article with visiting information early, followed by origins, evolution, rebuilding, and the canyon today. Its longer predecessor remains accessible in “Background notes & original research,” including the historical stewardship and regional climate material. Shared article content feeds both React and static HTML. No original structure research or photographs were removed.

Cal Poly’s facilities page was checked on September 8, 2026 for the current annual Design Village description: https://caed.calpoly.edu/content/facilities/poly-canyon . No unsupported cycling or current resident-caretaker claims were added.

## Photographs

The former About derivative was 600 pixels wide. Its source is 2175 × 1450. About now has 800- and 1600-pixel derivatives from that original; neither is upscaled. Home has corresponding derivatives for Shell House, Geodesic Dome, and Bridge House. Shell House is about 83 KiB at 800 pixels and 331 KiB at 1600 pixels. About is about 123 / 566 KiB; the detailed dome framework accounts for the larger file. Originals remain intact. Static markup also selects responsive sources, avoiding a full-size request before React mounts.

## Review

Reviewed through a separate in-app browser tab at http://127.0.0.1:4182/ . Desktop 1440 pixels, mobile 390 pixels, and narrow mobile 320 pixels. No horizontal overflow on Home, Structures, About, or App. Checked thumbnail clicks and Enter activation, direct random-structure navigation, research dialog/Escape, preserved research expansion, support access, and App carousel controls. About had no map iframe at the top and loaded its 300-pixel destination map near the viewport. No new autoplay or continuous motion. Home’s short reveal is disabled by reduced-motion preferences.

Captures: output/playwright/review-september-8/ (desktop/mobile Home, Structures, About). No new video. These local browser checks are not field performance metrics.

## Deferred

App’s duplicate utility strips are removed and App support remains by the download action; privacy remains in the footer. Existing approved 6.0 stills are retained. The proposed map/walking, discovery, and remote-exploration showcase waits for approved app UI/media. Nothing was pushed, merged, or published.

## Copy correction and full-page evidence

Home now identifies the place directly: “Student-built architecture at Cal Poly.” The heading is 26–38 pixels, subordinate to the featured structure title. Static Home uses the same wording. Lint, production build, and all 49 static-route checks passed after this correction.

Full-page captures now cover Home, Structures, and About at 1440-pixel desktop and 390-pixel mobile widths, with no horizontal overflow. Files in `output/playwright/review-september-8/`: `home-desktop-full.png`, `home-mobile-full.png`, `structures-desktop-full.png`, `structures-mobile-full.png`, `about-desktop-full.png`, `about-mobile-full.png`. User-facing copies are in `/Users/parkerjones/Documents/Codex/2026-09-08/you-are-the-designer-and-engineer-2/outputs/website-review/`.

The browser’s automatic full-page capture duplicated content, so these are assembled from overlapping viewport captures at measured scroll positions, retaining the browser’s native capture scale. About was recaptured after its destination map loaded. No new video.

## Completed App showcase

The deferred App showcase is now implemented with the coordinator-approved current screenshots: illustrated Map, photographic Collection, and Palm Tree in the photo-led Tour. Full original screenshots are preserved under `src/assets/app-captures/second-pass/`; that folder’s README records source paths and app commit provenance. The app source settled at `8b2f9eb415ddccaa67f3d2bf424a108b8b939f1b` after the supplied captures. No Your Visit screenshot or former tab layout appears in the showcase.

Feature captions describe verified source behavior: walk with the map, discover structures through photographs and stories, and Tour from anywhere with each stop located on the map. The existing phone frames, manual carousel, 44-pixel arrow controls, live counter, and reduced-motion scroll branch remain. Static HTML includes the same three features and responsive images.

Reviewed at 1440, 390, 320, and 760 pixels with no horizontal page overflow. Enter on Next reached 2/3; clicking Next reached Tour at 3/3 and disabled the forward button. All screenshot assets loaded. Full-page evidence is `app-desktop-full.png` and `app-mobile-full.png`; `app-mobile-tour.png` shows the final carousel view. These files are beside the preceding Home/About/Structures captures in both evidence folders above.

`npm run check` passed: 18 tests, lint, 492 generated media assets, production build, and all 49 static routes. Small app derivatives total about 85 KiB; large variants about 294 KiB. No video, publication, push, or merge.
