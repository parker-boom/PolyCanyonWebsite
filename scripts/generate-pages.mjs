import { createStaticContent } from './static-content.mjs';
import { readStructures } from './structure-data.mjs';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const out = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(root, 'build');
const shell = await readFile(path.join(out, 'index.html'), 'utf8');
const pages = JSON.parse(
  await readFile(path.join(root, 'src/app/metadata.generated.json'), 'utf8')
);
const manifest = JSON.parse(
  await readFile(path.join(out, '.vite/manifest.json'), 'utf8')
);
const renderBody = await createStaticContent(await readStructures(), manifest);
const routeModules = {
  '/': 'src/home/homeWeb.jsx',
  '/about': 'src/about/AboutPage.jsx',
  '/app': 'src/downloads/DownloadPage.jsx',
  '/structures': 'src/structures/list/StructureList.jsx',
  '/structures/history': 'src/structures/list/StructureList.jsx',
  '/support': 'src/support/SupportPage.jsx',
  '/privacy': 'src/utils/privacyPolicy.jsx',
};
const site = 'https://polycanyon.com';
const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
function htmlFor(route, page, robots = 'index,follow') {
  const tags = `<title>${escape(page.title)}</title>
<meta name="description" content="${escape(page.description)}" />
<meta name="robots" content="${robots}" />
<link rel="canonical" href="${site}${route}" />
<meta property="og:title" content="${escape(page.title)}" />
<meta property="og:description" content="${escape(page.description)}" />
<meta property="og:url" content="${site}${route}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Poly Canyon" />
<meta property="og:image" content="${site}/sharePNG/OGDefault.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escape(page.title)}" />
<meta name="twitter:description" content="${escape(page.description)}" />
<meta name="twitter:image" content="${site}/sharePNG/TwitDefault.png" />`;
  // Replace all owned tags so rerunning this generator cannot duplicate metadata.
  // Vite may remove comments, so do not rely on comment markers.
  const clean = shell
    .replace(/<title>[\s\S]*?<\/title>/g, '')
    .replace(
      /<meta\s+(?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g,
      ''
    )
    .replace(/<link\s+rel="canonical"[^>]*>/g, '');
  const routeModule =
    manifest[
      routeModules[route] ||
        (route.startsWith('/structures/')
          ? 'src/structures/info/StructureInfo.jsx'
          : '')
    ]?.file;
  const preload = routeModule
    ? `<link rel="modulepreload" data-route-preload href="/${routeModule}" />`
    : '';
  const posterPreload =
    route === '/app'
      ? '<link rel="preload" data-route-preload as="image" href="/media/app-tap-only/explore-poster.webp" fetchpriority="high" />'
      : '';
  const body = clean
    .replace(/<link[^>]*data-route-preload[^>]*>/g, '')
    .replace('</head>', tags + preload + posterPreload + '\n</head>')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript\s*>/, '');
  // These boundaries are emitted after Vite, so nested article divs and a
  // second generation pass cannot turn the homepage into every route's body.
  const generatedRoot =
    /<!-- static-root:start -->[\s\S]*?<!-- static-root:end -->/;
  const target = generatedRoot.test(body)
    ? generatedRoot
    : '<div id="root"></div>';
  if (!body.includes('<div id="root"></div>') && !generatedRoot.test(body)) {
    throw new Error(
      'Missing page root template. Run npm run build to restore the Vite shell.'
    );
  }
  return body.replace(
    target,
    `<!-- static-root:start --><div id="root">${renderBody(route, page)}</div><!-- static-root:end -->`
  );
}
for (const [route, page] of Object.entries(pages)) {
  const directory = route === '/' ? out : path.join(out, route.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), htmlFor(route, page));
}
await writeFile(
  path.join(out, '404.html'),
  htmlFor(
    '/404',
    {
      title: 'Page not found — Poly Canyon',
      description: 'Explore the Poly Canyon archive or return to the homepage.',
    },
    'noindex,follow'
  )
);
await writeFile(
  path.join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(
    pages
  )
    .map((route) => `  <url><loc>${site}${route}</loc></url>`)
    .join('\n')}\n</urlset>\n`
);
console.log(
  `Generated ${Object.keys(pages).length} pages with static metadata, plus sitemap and 404.`
);
