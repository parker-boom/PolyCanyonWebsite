import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const pages = JSON.parse(
  await readFile(path.join(root, 'src/app/metadata.generated.json'), 'utf8')
);
const data = JSON.parse(
  await readFile(path.join(root, 'public/data/structuresInfo.json'), 'utf8')
);
assert.equal(Object.keys(pages).length, data.structures.length + 7);
assert.ok(
  pages['/support'],
  'The published app support URL must remain available'
);
const sitemap = await readFile(path.join(root, 'build/sitemap.xml'), 'utf8');
for (const route of Object.keys(pages)) {
  const html = await readFile(
    path.join(root, 'build', route.slice(1), 'index.html'),
    'utf8'
  );
  assert.equal((html.match(/<title>/g) || []).length, 1, route);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, route);
  assert.ok(html.includes(`href="https://polycanyon.com${route}"`), route);
  for (const attribute of [
    'name="description"',
    'name="robots"',
    'property="og:title"',
    'property="og:description"',
    'property="og:url"',
    'property="og:image"',
    'name="twitter:title"',
    'name="twitter:description"',
    'name="twitter:image"',
  ])
    assert.equal(html.split(attribute).length - 1, 1, `${route}: ${attribute}`);
  assert.ok(html.includes('<meta name="robots" content="index,follow"'), route);
  assert.ok(html.includes('data-static-page'), `${route}: readable page body`);
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g))
    await access(path.join(root, 'build', asset.slice(1)));
  assert.ok(
    sitemap.includes(`<loc>https://polycanyon.com${route}</loc>`),
    route
  );
}
assert.equal((sitemap.match(/<loc>/g) || []).length, Object.keys(pages).length);
assert.ok(!sitemap.includes('/chronicles'));
for (const asset of ['sharePNG/OGDefault.png', 'sharePNG/TwitDefault.png'])
  await access(path.join(root, 'build', asset));
const redirects = await readFile(path.join(root, 'build/_redirects'), 'utf8');
assert.equal(
  redirects,
  await readFile(path.join(root, 'public/_redirects'), 'utf8')
);
assert.match(redirects, /^\/\*\s+\/404\.html\s+404$/m);
assert.ok(
  !/^\/\*\s+\/index\.html\s+200/m.test(redirects),
  'A catch-all SPA rewrite would hide missing-page HTTP statuses.'
);
for (const line of redirects.split('\n')) {
  if (!line.trim() || line.startsWith('#')) continue;
  const [, target] = line.trim().split(/\s+/);
  const pathname = target.split('#')[0];
  if (pathname.endsWith('.html'))
    await access(path.join(root, 'build', pathname.slice(1)));
  else
    assert.ok(
      pages[pathname],
      `Redirect target has no generated route: ${target}`
    );
}
const missing = await readFile(path.join(root, 'build/404.html'), 'utf8');
assert.ok(missing.includes('noindex,follow'));
console.log(
  `Validated metadata and sitemap for ${Object.keys(pages).length} pages, linked bundles, redirect targets, social assets and the 404 page.`
);

await assert.rejects(access(path.join(root, 'build/admin')), {
  code: 'ENOENT',
});
