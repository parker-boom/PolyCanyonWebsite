# Website release readiness

## Selected release

The default App page uses the accepted framed composition with a pale gold outer panel (`#f3ecd9`) and green phone backdrop. Feature controls select the three real app recordings inside the existing phone frame. See [app media notes](app-media.md) for provenance, playback behavior and publication notes. The `design` query parameter no longer switches the App or About layout; previously shared comparison URLs reach the selected pages.

The release also includes the approved visual-history About page and contact actions, current/historical collection labels, and detail-page photo recovery and typography refinements. Original research and photographs are preserved. Local review handoff files are ignored rather than published.

## Verification

- Fresh lockfile install completed; `npm run check` passed again afterward.
- Production dependency audit: zero known advisories reported.
- Full `npm run check`: 20 tests, ESLint, integrity of 486 generated images, production build, and all 49 generated routes/metadata/sitemap/redirect targets.
- Fixed the static-page test fixture to include the four historical About photographs; the test also checks history, a structure link, and contact text.
- Current branch descends from remote `main` with no upstream commits missing as of the release review. A local release commit records the accepted changes.
- This final pass is code-only as requested. The framed composition and interactions were visually reviewed on desktop and 390px mobile before selection; the final gold tint has not had an additional browser review.

## Netlify

Repository: `parker-boom/PolyCanyonWebsite`. Configuration uses Node 22, command `npm run check`, and publish directory `build`. GitHub Actions independently runs the same checks on pushes and pull requests. No runtime server or secret is required to build the website.

The public domain `https://polycanyon.com` responds over HTTPS with HTTP 200 from Netlify. That verifies the existing site, not this local release. This environment has no Netlify CLI authentication or site link, so the connected repository, production branch, deploy status, account overrides, and deploy-preview routing have not been verified through the account API.

## Release sequence

1. Push the reviewed release branch and open a pull request to `main`; require the website checks to pass.
2. Verify the Netlify project connects to this repository and deploys `main`, with the checked-in build command and publish directory. Check its deploy preview before merging.
3. On that preview, verify direct/trailing-slash routes, legacy redirects, App Store and contact links, and unknown/retired admin URLs returning HTTP 404. Follow the exact routing checklist in [maintenance notes](maintenance.md#before-a-production-release).
4. Merge and confirm Netlify publishes the reviewed commit; then check the production domain. Retain the previous deployment for rollback.

No remote branch, production deployment, domain, or Netlify account setting was changed in this release-preparation pass.

## Hosted preview follow-up

The first hosted preview passed its build but exposed Netlify lowercasing mixed-case structure slugs. Pretty URL rewriting is now disabled in configuration, and record lookup/metadata also accept casing differences while keeping the original canonical URLs. A regression test covers every structure slug. PR #2 carries this correction.
