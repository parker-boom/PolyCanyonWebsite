# Poly Canyon

An independent guide to Cal Poly’s outdoor architectural laboratory, with photographs, history, and source material for 42 structures.

## Development

Use Node 22.12 or newer (the .nvmrc selects Node 22).

```
npm ci
npm run dev
```

Run checks in a second terminal (the development server stays running):

```
npm test
npm run lint
npm run build
npm run check:build
npm run preview
```

Keep this checkout and its `node_modules` and `build` directories on the external drive. For installs on this Mac, use `npm ci --cache "/Volumes/SSK Drive/Developer/npm-cache"` so the task cache also stays there.

Vite builds the site into `build/`. Netlify configuration is checked in; publishing is a separate action. React routes load on demand. The green-and-gold interface retains desktop and mobile structure galleries, source documents, directions, and app links.

## Content and photographs

`public/data/structuresInfo.json` is the source of truth for structure research. `npm run data` generates the browsing data and route metadata; it runs before development and production builds. Generation validates names, descriptions, unique numbers, and safe unique URL slugs before writing browsing data or metadata. Fix failures in the source JSON; do not edit generated JSON files. Preserve established `url` values because they are public links.

Original photographs stay in `src/structures/images/`. `npm run media:generate` creates committed display images and thumbnails using Sharp. Run it when adding or changing originals, then include the regenerated assets and dimensions alongside the source changes. Text-only changes do not need image regeneration. The browser selects responsive thumbnails and display photographs by their rendered size and pixel density. Pages load thumbnails lazily and warm only the next gallery image. Google Maps loads only after the visitor chooses Show map.

The `/about` page introduces the canyon, its experimental structures, landscape and seasonal climate, and the app and research archive. It replaces the former Chronicles interface. Its historical source pages and the original app recordings are preserved under `archive/`, outside the application bundle. Redirects preserve old links. Adding a regular structure requires a record in the source JSON and photographs in the existing image-key convention; accessory entries are maintained separately in `src/structures/data/accessoryStructures.json`.

## Search and sharing

The production build generates an HTML entry for each known route with its own title, description, canonical URL and social metadata, plus a sitemap and 404 page. Structure pages include complete research text, credits, resource links and photos; the archive index, accessory descriptions and full privacy policy also work without JavaScript. Other landing pages provide their summary and navigation, with written walking steps on Info. React replaces the static root when it mounts; it does not hydrate it or leave a duplicate hidden article. No server runs to render requests. Production metadata uses https://polycanyon.com (including in local and deploy previews). Routes and metadata derive from the same structure data.

## Checks

Node tests cover browsing order, gallery query behavior, and gesture thresholds/scaling. Archive filters are stored in the URL; history entries preserve scroll position through detail navigation. ESLint checks active source and build scripts. Production checks should include desktop and mobile navigation, search and sorting, direct gallery links, Escape/focus behavior, and static route metadata. Hosting rule changes also need a deployed preview check before production release.

The browser regression in `scripts/check-gallery-navigation.mjs` checks going Back from the last fullscreen photograph to a structure with fewer photographs, at mobile and desktop widths. With Playwright available, run it against the production preview:

```
node scripts/check-gallery-navigation.mjs
node scripts/check-archive-return.mjs
node scripts/check-page-recovery.mjs
```

The page-recovery check exercises automatic recovery from a missing old page chunk, bounded retries for persistent failures, keyboard/dialog behavior, and overflow at narrow mobile through desktop widths. The archive-return check repeats browser Back and explicit Close after Next, verifying filters, exact scroll position, and mobile navigation.

Set `PLAYWRIGHT_MODULE` to an existing installation if it is outside this project. To also check missing photographs without changing archive files, use the development server with `BASE_URL=http://127.0.0.1:5173 EMPTY_PHOTO_FIXTURE=1`. That fixture replaces photo records only in the test browser.

## Before a production release

1. Run `npm ci`, `npm test`, `npm run lint`, `npm run build`, and `npm run check:build`. The build check verifies every generated route, unique metadata, readable generated HTML, sitemap entries, local bundles, sharing images, and redirect targets. `npm run preview` serves that build; restart or rebuild after source changes.
2. Run the browser regressions above against that preview and visually review desktop/mobile archive, About, Info, downloads, and photo viewing. Browser automation is an optional developer tool, not a runtime dependency of this site.
3. When a release is authorized, validate a **Netlify deploy preview** before promoting it. Vite preview does not implement Netlify `_redirects`, its custom HTTP 404 handling, or domain redirects. A successful local page visit cannot verify those behaviors.

On that hosting preview, request `/about`, `/about/`, `/structures/bridgeHouse`, and `/structures/bridgeHouse/` directly. Each should reach the correct page with its route metadata and working assets. Check `/sitemap.xml` is XML; `/chronicles/story` and `/chronicles/people` redirect to About with their history/stewardship anchors; `/chronicles/projects` redirects to Structures; `/map` redirects to Info; and an invented URL returns **HTTP 404**, not a 200 response with an error message. Retired `/admin/` and `/admin/config.yml` must return HTTP 404, with navigation back to the public site.

Known public routes have physical `index.html` files. The final, unforced 404 rule lets existing files take precedence and returns the generated `404.html` only for unknown paths. Do not replace it with a catch-all `200` SPA rewrite. Netlify normalizes trailing slashes when matching redirects and may append slashes through its Pretty URLs setting; review that existing account setting and the resulting canonical URLs rather than adding competing slash redirects. See [Netlify routing behavior](https://docs.netlify.com/manage/routing/redirects/redirect-options/).

Privacy policy changes must match the app versions actually being released and their App Store / Google Play privacy declarations. The local Swift implementation has no collection declared; this does not verify already-published iOS or Android binaries. Reconcile those versions before publishing the combined policy. See [Apple privacy requirements](https://developer.apple.com/app-store/review/guidelines/#privacy) and [Google Play user-data requirements](https://support.google.com/googleplay/android-developer/answer/10144311).

## Keeping the site maintainable

`npm run check` runs the same checks as `.github/workflows/checks.yml`: research and interaction unit tests, lint, media integrity, production build and generated-page validation. Run `node scripts/check-static-pages.mjs` with the same Playwright setup to check full research parity with and without JavaScript, source links, fixed photos, and retired editor navigation. CI runs on pushes and pull requests only; it does not publish. For a clean checkout, use `npm ci` followed by `npm run check`. Commit the lockfile and all generated media with any photo change. Generated browsing JSON and route metadata are rebuilt from source; they are intentionally ignored by Git.

`npm run media:check` verifies a content-hash inventory of original photographs, generated variants, the generation recipe, dimensions and responsive imports. Missing, changed or newly added source photos fail clearly until `npm run media:generate` is run. Unit checks also resolve every photo key in the research/accessory records to an imported asset. Vite validates imported resources during the build. Original photographs and archived recordings remain in the repository, outside the public payload; do not move them into `public/` to fix a missing import.

Run `node scripts/check-external-fallbacks.mjs` with the same Playwright setup as the other browser checks. It blocks all external requests and denies clipboard writes, then verifies local research/photos, written walking directions, the manually copyable contact fallback, and the privacy route. This is separate from CI's dependency-free Node tests. A failed external paper, map or app-store link must not hide the local description or prevent further browsing. We cannot make an unavailable external document or mail provider work; preserve source titles/citations and local explanatory text when updating links.

The intended public app URLs are `https://polycanyon.com/support` and `https://polycanyon.com/privacy`. Keep both routes stable across redesigns. Support uses the same contact panel as the footer and policy: email-app link, clipboard copy, then selectable address if clipboard permission is denied. The destination is centralized in `src/app/contact.js` and used by `src/components/ContactLink.jsx` and the static support page. The contact destination is Parker’s personal address, `parker.jones@live.com`, rather than a campus account. No mailbox is an availability guarantee; change this centralized destination if ownership or access changes. No form service is required. Confirm the mailbox, domain renewal, hosting access and store links before a release or ownership handoff.

### Content ownership across website and iOS

| Content | Maintained here | Coordination rule |
| --- | --- | --- |
| Structure names, numbers, locations, dates and status | Website research JSON; duplicated in iOS bundled structure data | Review corrections in both repositories, preserving existing web slugs and app identifiers. Do not silently overwrite one dataset with the other. |
| Long descriptions, builders, citations and research links | `public/data/structuresInfo.json` | Website is the full research archive. App may retain shorter offline text; review substantive historical corrections for both. |
| Photo originals, ordering and captions | Website image sources and research JSON; app has its own asset catalog | Preserve originals and attribution. Generate web variants here; size and package app assets in the app project. |
| Accessory structures and historical/ghost points | Website accessory JSON; app structure/ghost/map data | Different browsing/map purposes. Coordinate identity and factual changes; do not force identical lists. |
| Trails, geofencing, offline location and visit progress | iOS project | App owns behavior and map registration. Website coordinates and written directions are visitor references, not a navigation engine. |
| About, visitor information, support and combined privacy text | Website pages | Keep app links stable; policy claims must match the actual released apps. |

The current iOS copies are under `Swift/Poly Canyon/Core/Data/` in the sibling PolyCanyon repository (`structuresList.json`, `mapPoints.json`, `ghostStructures.json`), with images in its asset catalog. Older React app data also exists; it is not an automatic source for this website. These are bundled, independently released datasets. A small reviewed correction in each repository is preferable to introducing a shared backend solely to eliminate duplication.

The public editor has been removed, including its scripts, configuration and invitation redirects. Retired `/admin/` URLs fall through to the normal 404 page. No remote hosting account services were changed.
