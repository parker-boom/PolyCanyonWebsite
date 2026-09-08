# Poly Canyon

[Poly Canyon](https://polycanyon.com) is an independent guide to Cal Poly’s outdoor architectural laboratory. Explore the history, photographs, and original research behind 42 student-built structures, or find information for a visit.

The archive includes full research pages that can be read without JavaScript. Interactive browsing adds search, filters, and photo galleries. Home, Structures, About and App share a responsive field-guide layout. About includes the canyon’s history and visiting information; App introduces the iPhone guide.

## Run locally

Use Node 22.12 or newer (`.nvmrc` selects Node 22).

```sh
npm ci
npm run dev
```

## Check and build

```sh
npm run check
npm run preview
```

`check` runs tests, lint, photo integrity checks, and the production build. The site is built with React and Vite and outputs static files to `build/`. Netlify configuration is included; these commands do not publish the site.

## Edit content

Structure research lives in `public/data/structuresInfo.json`. Keep existing structure URLs so saved links continue to work. Original photographs live in `src/structures/images/`; after changing photos, run `npm run media:generate` and include the generated files.

See [content, maintenance, and release notes](docs/maintenance.md) for the data layout, browser checks, and hosting details. [Map behavior](docs/maps.md) explains destination previews and walking directions.
