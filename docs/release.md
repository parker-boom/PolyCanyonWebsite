# Deployment

The live website is [polycanyon.com](https://polycanyon.com). Netlify project `polycanyon` deploys `main` from `parker-boom/PolyCanyonWebsite`.

`netlify.toml` specifies Node 22, `npm run check`, and the `build/` publish directory. No API key or runtime environment variable is required. HTML rewriting is disabled to preserve established mixed-case structure URLs.

## Publish a change

1. Run `npm ci` and `npm run check`, then review the production preview on desktop and mobile.
2. Push the change and inspect its Netlify preview. For a pull request, merge only after the build checks pass.
3. Verify Netlify’s published production commit matches GitHub `main`.
4. Open Home, About, App, a current structure, and a historical structure on the live domain. Check App playback and contact links.
5. Confirm `/sitemap.xml` loads; legacy `/info` and `/download` redirect; unknown URLs and `/admin/` return HTTP 404.

Local Vite preview does not implement Netlify redirects or HTTP 404 rules. Check hosting changes on Netlify before relying on them.

## Roll back

In Netlify’s production deploy history, publish the previous known-good deploy. Then revert the faulty change in Git and push the correction so a later build does not restore it. Keep the domain pointed at Netlify throughout.

Website publishing is independent of App Store review. Updating a preview recording does not establish which app version is available in the store.
