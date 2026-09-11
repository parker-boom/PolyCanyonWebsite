# App preview media

The three screen recordings in `public/media/app-v6/` were captured from app commit `aa86e4cb4b34f665252c017e71fc409b93738303`. They preserve the entire 720 × 1564 native screen (110:239); the website supplies the phone outline. Explore uses synthetic location movement for the demonstration.

MP4 is the primary format (about 1.5–2.8 MiB each), with matching WebP posters for reduced motion, failed playback and static HTML. The 8–10 MiB GIF exports remain with the source delivery rather than adding unnecessary page weight. Only the selected clip plays; switching resets the previous clip while retaining its buffer. The active clip preloads automatically; other clips load metadata. Tap the phone screen or press Space/Enter while it is focused to pause or resume playback, and reduced-motion preferences default to a still poster. Background tabs and other website pages pause playback. After the first visit, the app page stays mounted while hidden, preserving its players, selected feature, and playback position when returning.

Earlier still captures are preserved in `archive/media/app-captures/`. The MP4s and posters committed in `public/media/app-v6/` are the website release assets. Keep capture notes and source masters when preparing replacements.

The current cuts reach their main action within about three seconds: Explore discovers Underground House and opens its story (6.67 seconds total); Learn visibly taps search, types Bridge House, then opens and scrolls its history and photos (6.37 seconds); Tour moves to Shell House and opens its story (5.93 seconds). Subtle tap cues clarify the interactions, and each ending fades back to its opening frame. These are tighter edits of the original captures, not new app-version recordings. Source masters, edit settings, and validation records are retained in the app workspace under `swift/.build/WebsiteDemos-v3/`.

The interactive phone uses 480px posters extracted from each video’s opening frame over tiny inline placeholders. Video stays transparent until a presented frame is available; the poster remains underneath. Direct `/app` visits preload the first poster from the HTML. The original 720px stills remain available for static HTML and future exports.

## Updating the previews

Replace the matching MP4 and WebP files in `public/media/app-v6/`. Keep the full native screen at 720 × 1564 (110:239), without a baked-in phone frame: the website supplies that outline. Keep filenames stable or update both interactive and static-page references together.

Run `npm run media:app` after replacing the source MP4s to regenerate the lightweight posters and inline placeholders.

Watch each clip from start to finish inside the website phone on desktop and mobile. Check the opening action, readable text, tap timing, loop boundary, and poster. Test pause, keyboard switching, reduced motion, and failed video requests before publishing. Do not substitute a large GIF just to preserve the capture’s original format.

The recordings are published. Website updates remain independent of App Store review.

## Website validation

- `npm run check`: unit tests, lint, generated media validation, build and 49-page static checks passed.
- Desktop playback reviewed at a 224px screen width; all three sequences retain the website phone frame and full-screen aspect ratio.
- At 390 × 844, the page has no horizontal overflow; the screen renders at 244 × 530.
- Reduced motion starts all clips paused at time zero. Manual play/pause passed for each feature. Keyboard switching passed.
- Blocking MP4 requests keeps the lightweight poster visible inside the phone.
- Revised Explore and Learn contact sheets reviewed against the requested Underground House arrival and visible Bridge House search. All three cuts now use shorter sequences with earlier structure reveals.
