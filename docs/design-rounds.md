# Website design rounds — checkpoint 530ed15

This is candidate work for independent coordinator review, not a design sign-off. Final video is on hold.

## Round 1: collection and detail foundations

Baseline defects: collection used tiny photographs in flat rows; historical and standing work shared one view; detail outer gutters did not align with the header; number competed with title; photo counter and zoom controls duplicated simpler actions. Detail adjacency wrapped through the accessory sentinel, causing Entry Arch’s “-1 Previous” to open an unrelated group. Accessory entry itself selected a random item.

Changes: photographic cards; a separate /structures/history view; number/year controls only; random standing record; quiet source explanation; exact header/detail outer alignment; secondary number; visible Share action; image, thumbnails, then caption; fullscreen without zoom; named bounded neighbors within standing/historical collections and deterministic accessory navigation.

Rendered review: 1440 desktop and 390 mobile, collection → Entry Arch → fullscreen → arrow key → Escape → collection → historical view. Historical view has 11 records; standing view has 31. No overflow observed. Keyboard dismissal and image navigation work. Capture names under output/playwright/design-rounds: r1-collection-desktop/mobile and r1-entry-desktop/mobile.

Critique carried forward: portrait presentation still leaves excessive horizontal whitespace between the image and facts; removing the pale backdrop alone did not solve the composition. Cards now carry photographs but the search/sort toolbar still uses two lines unnecessarily. About/Home/App remain the rejected checkpoint at this stage. New historical route also exposed an outdated fixed 49-route build assertion. Original research prose has not been rewritten; the Entry Arch material claim flagged by the coordinator remains a source-review concern, not something to smooth over stylistically.

## Round 2: page composition, not separate boxes

Compared the rejected full-width Home hero with a split introduction/photograph composition. A contact sheet of all 31 standing source photographs supported choosing Tensile as a cleaner first feature, with Underground House, Shell House, and Moment Monument as alternatives. Home has one selected photograph and exactly three alternative buttons; swapping preserves keyboard focus. About returns to a balanced introduction and photograph. App now presents one real framed screen with selectable in-person, structure, and Tour explanations instead of three parallel screenshots.

The portrait gallery now derives its layout from original image dimensions: a 420-pixel column sits beside the facts, while the article spans a readable measure beneath. This removes the large gulf observed in round 1. Embedded detail maps are replaced with explicit Google Maps location links. Search now indexes aliases; dates are labeled Dates, raw Active/Ghost labels are removed, and generic “Main image of…” captions are suppressed. Accessory title remains the item name; conflicting Metal Entrance Sign date is not promoted as established.

Rendered review at 1440 and 390: Home selection via Enter retains focus and swaps the old hero into the same alternative slot. App Tour selection reaches the corresponding screen and explanation. Entry Arch portrait/facts now form a coherent group. Evidence: r2-home, r2-about, r2-app desktop/mobile and r2-entry-desktop in output/playwright/design-rounds.

Weaknesses found during this round: About’s HTML image height overrides the intended aspect ratio, stretching the opening vertically; fix before candidate review. Home’s initial fade gives a washed-out first frame; restrict transition to deliberate selection. App mobile has too much copy above the phone and needs a tighter hierarchy. Full static Home/App text still reflects the preceding checkpoint and must be aligned. Need fresh-visit variation that survives detail/Back, and complete alias/first/last/sparse/fullscreen journeys. These are round-three work, not passed checks.

## Round 3: complete journeys and independent review corrections

The Home composition survived review; its sources, state, and copy did not. The original photographs are 2175×1450 (Tensile, Underground House, Shell House) and 1934×1450 (Moment Monument). Home now imports dedicated 800/1600-pixel variants, with 800-pixel alternative images. At a 1440-pixel viewport and DPR 1, the actual hero currentSrc is the 800-pixel file for a 797.85-pixel rendered image; the 1600-pixel alternative covers that layout at DPR 2. Alternative images render at 256.62 pixels. Source file dimensions were checked rather than relying on density-corrected naturalWidth. The browser does not expose DPR emulation here, so actual Retina selection was not tested. Detail main-image variants also increased to 1600 pixels and collection variants to 800; originals remain untouched and smaller responsive choices remain available.

A visit now selects its initial Home feature once, synchronously. Explicit swaps persist for the life of that page document across route changes. The exact Shell House thumbnail → Shell House hero → browser Back journey retains Shell House. Three fresh document loads produced Tensile, Underground House, and Shell House. There is no autoplay. The initial fade is removed; a restrained fade applies only to deliberate swaps, with a reduced-motion CSS override. Reduced motion was inspected in source, not emulated. Slow-network static-to-React first-paint behavior has not been separately profiled; the static fallback is still a simpler document, not a matching server-rendered React layout.

Home destinations now read About the canyon and Poly Canyon for iPhone. About's opening aligns with the header, places the title at the top, and uses a small landscape companion image showing the entire Cantilever Deck. At 1263×742 both header and opening begin at x40; the photo is 237.5 pixels high and visiting begins at y462.5. The article retains its deliberate narrower reading measure. Mobile also reaches visiting in the first screen. Introductory copy identifies the outdoor construction laboratory directly; the old research archive remains in the repository and is absent from the live About page.

App has one framed screen, three direct feature controls, a short introduction, and no redundant previous/next counter. Selecting Tour immediately selects its caption and keeps that caption while the phone passes Structures. Manual scroll changes are reflected after settling; keyboard arrows also select adjacent screens. Mobile suppresses the duplicative feature heading and retains the useful sentence. The approved real screenshots remain unchanged.

Historical navigation now names Historical structures, removes the dice control from that list, and labels map links Former location. Unknown facts are omitted. Page metadata matches the visible historical title. The first standing record has only Next; the last has only Previous plus return. The historical and accessory groups likewise do not wrap or cross into another group. Accessory item names are primary, and the group name is subordinate. Metal Entrance Sign still has a conflicting archived year and prose date; its fact row says Date not confirmed. We did not invent a replacement date or rewrite the archived prose.

### Actual browser checks

- Desktop 1440×900 and 1263×742; mobile 390×844. Full Home, About, App, collection and Shell House compositions were captured as overlapping viewport images and stitched without enlargement. The current full desktop collection/continuous article captures were checked for pending visible images before capture.
- Water Tanks resolves Water Infra-Structure; Earth House resolves Underground House; The Concrete Flower resolves Blade. Opening the Water Tanks result and using its Back control restores the query. A regression test covers the actual archived aliases. The result count stays visually hidden and uses singular grammar.
- Entry Arch portrait, Shell House landscape/long research, Water Infra-Structure long title, Palm Tree without valid sources, Botanical Garden unknown metadata, Cow Fence's single image, Compressed Earth Blocks long mobile title, and final Sculptural Windmill were reviewed. No horizontal overflow was observed in the checked mobile cases.
- All six accessory items were traversed, ending at Billboard without wrap. First/last standing and historical adjacency were checked in the rendered UI.
- Fullscreen arrow keys change photographs; Escape closes the viewer and restores focus to its trigger. The mobile close button works. Captions remain meaningful. The final footer correction keeps Next at x336/y788 at 390×844 across the first three Entry Arch photographs, including a long caption, so repeated taps do not chase it. Touch swipe behavior was not independently exercised on a physical device.
- App Tour direct selection and keyboard return to Structures were checked after the transition correction. No external App Store or map action was submitted.

### Candidate critique and limits

This is a materially better candidate than 530ed15: photographs carry the collection, navigation has deliberate boundaries, About reads as an article, and App has a single focal point. It is still a candidate for the coordinator's independent judgment. The inherited research prose remains uneven and sometimes promotional. In particular, the previously flagged Entry Arch asbestos/durability claim and the Metal Entrance Sign date conflict remain source-review concerns, not resolved facts. No broad research rewrite was attempted.

The old static Home/App content (including the offline claim and obsolete Home asset reference) was replaced; generation now completes all 50 routes. Full check passes: 20 tests, lint, media integrity, production build and generated-page validation. The final collection-only wording change was rebuilt successfully after that full check.

Evidence is in `output/playwright/design-rounds/`: `r3-*-full-desktop.jpg`, `r3-*-full-mobile.jpg`, targeted mobile/detail captures, and `r3-fullscreen-mobile-stable.jpg`. Full-page images are stitched from real overlapping viewports, not browser fullPage output (which proved unreliable). Earlier round captures remain for comparison. The walkthrough video is intentionally unchanged. Nothing was pushed, merged or published; filming awaits separate approval.

### Final orientation correction after the round-three checkpoint

The coordinator identified a real remaining shift: Entry Arch's facts column moved from x560.5 to x935.16 when its second photograph changed the page from portrait to landscape composition. The layout now uses the record's primary photograph to choose its columns; individual images still fit according to their own ratio. A repeated rendered check of photographs 1, 2 and 3 keeps the facts at x560.5 and gallery width at420 pixels throughout. This preserves the compact portrait composition without forcing every landscape photo into a tall empty frame. Capture: `r3-entry-landscape-stable.jpg`. Lint and the production/static build pass after this correction.


## Focused follow-up — 8 September 2026

Parker kept the Home and collection layouts. Home now uses his exact replacement intro and destination copy in React and static output. The separate six-item accessory section, routes, record data, original accessory-only photographs and generated derivatives were explicitly authorized for deletion. All 42 standing/historical research records and their photographs remain unchanged; the historical Accessory Shed is a regular historical record and remains. Earlier accessory notes above document superseded work.

Detail comparison URLs: `/structures/entryArch?layout=side` and `/structures/entryArch?layout=article`. Side keeps facts beside a 760 × 475 desktop gallery; Article centers the same gallery and places dates/aliases below it, with supporting people after the text. Both retain bounded named structure neighbors and preserve the explicit variant parameter through those links. Ordinary URLs do not gain comparison parameters. No variant switch appears in the UI. Mobile shares a single-column order and a 4:3 gallery. Photo arrows and fullscreen live on the frame; captions are hidden in detail and fullscreen but preserved in the research JSON and alternative text. The compact map link remains useful for locating a structure, with Former location for historical records.

### Rendered round 1

Reviewed both desktop layouts at 1440 × 1000, Entry Arch portrait and landscape selection, App/About desktop, and phone layouts at 390 × 844. The gallery preserved dimensions and facts-column position. Critique: the long App labels wrapped as two controls plus one orphan; builder credits delayed the article on mobile. The original short About rewrite lacked the original Chronicles chronology and was rejected.

### Rendered round 2

Changed mobile App controls to three equal columns and reserved a stable explanation height. Moved supporting people below the article on mobile and in the Article variant. Reviewed portrait/landscape Entry Arch, long Electric Infra-Structure title, one-image Cow Fence, first/last historical boundaries, fullscreen photo arrows and exit. Measurements: gallery 760 × 475 and facts x=900.5 at 1440px; 339 × 254.25 at a 390px viewport with native scrollbar. Entry Arch photo 1→3 preserved document y=260, width, height and facts x exactly. About photo survives a detail-and-Back visit and changes on a fresh document visit.

### Additional editorial/App corrections

Read all six original `archive/chronicles/Story/eras.json` eras, the People records, era captions and researchArchive. Proposed substantive About copy and source reconciliation are in root `about-editorial-review.md`, pending coordinator editorial sign-off. Rendered proposal includes the full chronological arc and contextual captions for each varying About photograph; the caption removal applies to detail galleries. Visiting uses year-round public access supported by the indexed 2025 ASEE paper and recommends daylight without inventing opening hours. Original Chronicles files are untouched.

App tagline is Parker’s exact “Know what you’re looking at.” Title, tagline and download button now align with the phone’s top; the feature controls form a separate group. At 1440 × 746, the complete phone runs from y=116 to y=682.77, inside the viewport. The single original framed-phone presentation remains. Final mobile Tour screenshot shows the selected Tour with matching description and screen.

Evidence is under `output/playwright/followup-review/`, including round 1/2/3 desktop/mobile screenshots, gallery metrics and frame-stability measurements. Source-based About remains an editorial proposal for review, not a claim of final approval. No filming, push or publishing in this follow-up.


### App control-placement comparison

Parker rejected the prior tagline. The approved replacement is “Your interactive guide to everything the canyon has to offer.” Implemented and rendered controls below the phone, then above it, at1440×746 and390×844. Below worked on desktop but put mobile switching below the entire phone. Retained above: desktop switcher immediately over the device, explanation below; mobile explanation directly beneath controls and above device. Phone y192.19–649.04 and explanation ending717.04 fit within the746px desktop viewport. Title/tagline/download stay grouped on the left. Exact copy updated in static output. Evidence: `app-controls-above-desktop.png`, `app-controls-below-desktop.png`, and matching mobile full-page images. Earlier App tagline and layout measurements above are superseded.


### App vertical balance refinement

Compared top-aligned and vertically centered left title/tagline/CTA groups at1263×742. Retained centering against the full right preview. Increased available phone width by reducing conservative viewport reservations and tightening the controls/explanation gaps. At1263×742 the phone is240.12px wide, y176.19–679.02; explanation ends735.02 within742px. Reviewed settled Tour,1440×746 and390×844 as well. Mobile retains controls and explanation before the phone. Evidence: `app-top-aligned-1263.png`, `app-centered-1263.png`, `app-centered-tour-1263.png`, `app-centered-1440.png`, `app-centered-mobile.png`.
