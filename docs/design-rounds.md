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
