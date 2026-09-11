# Maintaining the website

## Run locally

Use Node 22.12 or newer; `.nvmrc` selects Node 22.

```sh
npm ci
npm run dev
```

To check and preview the production build:

```sh
npm run check
npm run preview -- --port 4182
```

`check` runs the Node tests, lint, photograph integrity checks, build, and validation of all generated pages. It does not publish. Netlify and GitHub Actions run the same checks when code changes.

## Where things live

| Area | Location |
| --- | --- |
| Structure histories, credits, photo ordering, and source links | `public/data/structuresInfo.json` |
| Original structure photographs | `src/structures/images/` |
| Generated display images | `src/assets/generated/` |
| Home, About, App, and structure pages | `src/home/`, `src/about/`, `src/downloads/`, `src/structures/` |
| Shared navigation and footer | `src/layout/` |
| Contact address | `src/app/contact.js` |
| Shared privacy text | `src/utils/privacyContent.js` |
| App recordings and posters | `public/media/app-continuous/`; earlier set: `public/media/app-v6/` |
| Historical source material and design records | `archive/` |
| Static HTML, metadata, and media generation | `scripts/` |

## Change content

Edit the source research JSON. Browsing data and route metadata regenerate before development and builds; do not edit those generated files. Keep established structure URL slugs so saved links continue to work.

Keep the original photographs and their credits. After changing source photos, run `npm run media:generate` and commit the generated images and manifests together. Text-only edits do not need image regeneration. The numbered photo filenames are stable research keys, not disposable export names.

The iPhone app has its own bundled data and release process. Historical corrections may need a matching app change, but this website does not control location tracking, offline maps, or visit progress. Keep `/support` and `/privacy` stable for existing app links. Policy changes must match the released app’s behavior.

## Browser review

After building, review the preview at desktop and mobile widths:

- Search and sort the collection, expand Historical structures at the bottom, then open a detail page and go Back. History starts collapsed and expands to show search matches.
- Move through photographs, open fullscreen, and close with Escape. Check keyboard focus returns correctly.
- Switch the About history eras and follow visiting links.
- Switch all three App previews. Check pause, reduced motion, and the still-image fallback.
- Open Contact and try copying the email address; the address remains available if clipboard access fails.

The browser regression scripts in `scripts/check-*.mjs` supplement the build checks. Their setup and coverage are described in [browser checks](browser-checks.md).

## Static pages and external links

The build produces `build/` with a physical HTML page for every public route, plus a sitemap and a real 404 page. Structure research remains readable without JavaScript. During normal startup the plain HTML fallback stays hidden, and the requested page module is preloaded. React replaces the fallback when it loads. If JavaScript is disabled or fails, the research remains readable. There is no runtime rendering server.

Legacy Chronicles, Info, Map, and Download links redirect to their current pages. Retired `/admin/` URLs return 404. Never replace the final hosting rule with a catch-all 200 response.

[Maps and directions](maps.md) use external links, not an embedded map or API key. Preserve written visiting information so the page remains useful if an external service is unavailable.

## Leaving it running

The deployed site needs no scheduled job, database, or application secret. Domain registration and hosting access still need to remain active. Dependabot alerts and recurring CodeQL scans are disabled by owner preference; secret scanning and push protection remain enabled. Run `npm audit` before future dependency updates or releases.

## Website icon

The navigation icon and favicon use the approved Shell Sweep Clean Icon Composer export. The website keeps resized copies in `src/assets/shell-sweep.webp` and `public/favicon.png`; the editable master belongs to the iOS project. Use the Clean export when updating these assets, not the earlier raster draft.

## Loading and visual continuity

The homepage keeps four responsive hero images mounted. The initial photograph gets high fetch priority; alternatives load at low priority. A selection waits for the actual image element’s `decode()` promise before changing the photograph, caption, or destination. The previous image remains opaque under the reveal, so a slow or failed request never clears a working image. New clicks supersede pending requests.

Keep the route Suspense boundary outside the keyed error boundary. React Router’s transitions can then preserve the previous page during a lazy route download. Avoid fading entire pages from transparent: it briefly exposes the background even when everything is cached. The small page settling motion and hero reveal respect reduced-motion preferences.

`check-loading-continuity.mjs` tests delayed and failed images, caption/link consistency, and delayed navigation with normal and reduced motion.
