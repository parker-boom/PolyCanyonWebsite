# App preview media

The three screen recordings in `public/media/app-v6/` were captured from app commit `aa86e4cb4b34f665252c017e71fc409b93738303`. They preserve the entire 720 × 1564 native screen (110:239); the website supplies the phone outline. Explore uses synthetic location movement for the demonstration.

MP4 is the primary format (about 1.5–2 MiB each), with matching WebP posters for reduced motion, failed playback and static HTML. The 8–10 MiB GIF exports remain with the source delivery rather than adding unnecessary page weight. Only the selected clip plays; switching resets the previous clip. Visitors can pause playback, and reduced-motion preferences default to a still poster. Background tabs pause playback.

Source masters, GIFs, checksums and capture QA: `/Volumes/SSK Drive/Developer/Redesign/FinalRelease/Media`.

## Release dependency

As of the media handoff, app 6.0 (1) was processing at Apple while 5.4 remained public. Confirm public availability with the app release task before publishing these new feature previews. This integration is a local release candidate, not confirmation that 6.0 is live.

## Website validation

- `npm run check`: unit tests, lint, generated media validation, build and 49-page static checks passed.
- Desktop playback reviewed at a 224px screen width; all three sequences retain the website phone frame and full-screen aspect ratio.
- At 390 × 844, the page has no horizontal overflow; the screen renders at 244 × 530.
- Reduced motion starts all clips paused at time zero. Manual play/pause passed for each feature. Keyboard switching passed.
- Blocking MP4 requests falls back to a decoded 720 × 1564 still poster.
- Source contact sheets and first/last frame comparisons reviewed; no asset re-edit required.
