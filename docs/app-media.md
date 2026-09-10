# App preview media

The three screen recordings in `public/media/app-v6/` were captured from app commit `aa86e4cb4b34f665252c017e71fc409b93738303`. They preserve the entire 720 × 1564 native screen (110:239); the website supplies the phone outline. Explore uses synthetic location movement for the demonstration.

MP4 is the primary format (about 1.7–2.8 MiB each), with matching WebP posters for reduced motion, failed playback and static HTML. The 8–10 MiB GIF exports remain with the source delivery rather than adding unnecessary page weight. Only the selected clip plays; switching resets the previous clip while retaining its buffer. The active clip preloads automatically; other clips load metadata. Tap the phone screen or press Space/Enter while it is focused to pause or resume playback, and reduced-motion preferences default to a still poster. Background tabs pause playback.

Earlier still captures are preserved in `archive/media/app-captures/`. The MP4s and posters committed in `public/media/app-v6/` are the website release assets. Keep capture notes and source masters when preparing replacements.

Explore now reaches Underground House after about 3.7 seconds of a short, unaccelerated approach, then opens its story (10.40 seconds total). Learn visibly opens search, enters Bridge House character by character, then opens and scrolls the story (12.97 seconds).

## Updating the previews

Replace the matching MP4 and WebP files in `public/media/app-v6/`. Keep the full native screen at 720 × 1564 (110:239), without a baked-in phone frame: the website supplies that outline. Keep filenames stable or update both interactive and static-page references together.

Watch each clip from start to finish inside the website phone on desktop and mobile. Check the opening action, readable text, tap timing, loop boundary, and poster. Test pause, keyboard switching, reduced motion, and failed video requests before publishing. Do not substitute a large GIF just to preserve the capture’s original format.

The recordings are published. Website updates remain independent of App Store review.

## Website validation

- `npm run check`: unit tests, lint, generated media validation, build and 49-page static checks passed.
- Desktop playback reviewed at a 224px screen width; all three sequences retain the website phone frame and full-screen aspect ratio.
- At 390 × 844, the page has no horizontal overflow; the screen renders at 244 × 530.
- Reduced motion starts all clips paused at time zero. Manual play/pause passed for each feature. Keyboard switching passed.
- Blocking MP4 requests falls back to a decoded 720 × 1564 still poster.
- Revised Explore and Learn contact sheets reviewed against the requested Underground House arrival and visible Bridge House search. Tour remains approved and unchanged.
