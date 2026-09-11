# App preview media

## Local continuous-demo candidate

The local app page uses `public/media/app-continuous/`. These are fresh, continuous simulator recordings from app commit `a80fad7` on the local `design/discovery-motion` branch. The app change and website candidate are **not published**. The previously published recordings remain in `public/media/app-v6/` during review.

- **Explore:** approach Underground House, receive a Liquid Glass discovery popup, then tap it to expand into the full-screen story. Location movement is simulated; discovery behavior is real.
- **Learn:** scroll the collection, open Bridge House, scroll its story, then swipe right to the previous structure, Pyramid.
- **Tour:** swipe twice, open Tensegrity, close it, then swipe through more structures.

Touch rings and swipe trails come from actual simulator touch events using an opt-in capture aid. The takes have no internal cuts or speed changes; only recorder setup and shutdown are trimmed. The new discovery transition is an app implementation, not an effect painted onto the footage.

Video masters were recorded first at 1320 × 2868. Website MP4s are 720 × 1564 at 30 fps; GIF exports are 540 × 1173 at 15 fps. All preserve the native screen aspect ratio without a hardware frame. The website supplies the phone outline and plays MP4 for sharper, lighter playback.

Originals, GIF exports, native test logs, and per-take provenance are retained in the app workspace under `swift/.build/WebsiteDemos-continuous/`.

## Playback and replacement

Only the selected video plays. Switching resets the previous clip while retaining its buffer. Hidden pages pause playback; returning preserves the selected player and its position. Reduced motion starts with a still image. Tap the phone or press Space/Enter to pause or resume.

Opening-frame WebP posters stay visible until the video presents a decoded frame. Tiny inline placeholders cover the initial image load, and direct app visits preload the first poster.

After replacing MP4s, run `npm run media:app` to regenerate full-size stills, lightweight posters, and inline placeholders. Give a substantially new set fresh URLs; update interactive, static-page, preload, and test references together so an open browser cannot retain the old recordings.

Before publishing, review each complete take and its loop inside the phone at desktop and mobile widths. Check touch timing, text readability, first-frame loading, switching, return navigation, reduced motion, and failed video requests. Run `npm run check` and the app-preview continuity browser check. Local review approval is required before publishing this candidate.
