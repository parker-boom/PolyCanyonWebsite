import { intro, visit, history, project } from '../src/about/articleContent.js';
import { resourceLinks } from '../src/structures/data/resourceLinks.js';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import {
  policyDate,
  policyIntroduction,
  policySections,
} from '../src/utils/privacyContent.js';
import { contactEmail } from '../src/app/contact.js';
import { sortImages } from '../src/structures/data/structureHelpers.js';

export const escapeHTML = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
const paragraph = (value) =>
  String(value || '')
    .split(/\n\s*\n/)
    .filter((p) => p.trim())
    .map((p) => `<p>${escapeHTML(p.trim())}</p>`)
    .join('');
const link = (href, label) =>
  `<a href="${escapeHTML(href)}">${escapeHTML(label)}</a>`;

export async function createStaticContent(structures, manifest) {
  const imageModule = new URL(
    '../src/structures/images/structureImages.js',
    import.meta.url
  );
  const source = await readFile(imageModule, 'utf8');
  const imports = new Map(
    [...source.matchAll(/import (\w+) from '([^']+\.webp)';/g)].map(
      ([, name, file]) => [
        name,
        'src/assets/generated/' + file.split('/generated/')[1],
      ]
    )
  );
  const images = {};
  for (const [, name, body] of source.matchAll(
    /export const (\w+) = \{([^}]+)\};/g
  )) {
    images[name] = Object.fromEntries(
      body
        .split(',')
        .map((row) => row.trim())
        .filter(Boolean)
        .map((row) => {
          const [key, symbol = key] = row.split(':').map((part) => part.trim());
          return [key.replaceAll("'", ''), imports.get(symbol)];
        })
    );
  }
  // Static photos need the same responsive choices and intrinsic dimensions as
  // the interactive gallery; otherwise the preload scanner requests full-size
  // files before React mounts and cannot reserve their place on the page.
  const imageSizes = new Map(
    await Promise.all(
      Object.keys(manifest)
        .filter(
          (file) =>
            file.startsWith('src/assets/generated/') && file.endsWith('.webp')
        )
        .map(async (file) => {
          const { width, height } = await sharp(
            fileURLToPath(new URL('../' + file, import.meta.url))
          ).metadata();
          return [file, { width, height }];
        })
    )
  );
  const photo = (
    file,
    caption,
    sizes = '(max-width:700px) 100vw, 750px',
    eager = false
  ) => {
    const asset = manifest[file];
    if (!asset?.file)
      throw new Error(
        `Static page image is missing from the build manifest: ${file}`
      );
    const smallerFile = file.includes('/info/')
      ? file.replace('a1.webp', 'a1-800.webp')
      : file.includes('/home/')
        ? file.replace('-1600.webp', '-800.webp')
        : file.replace('/structures/', '/structures/mobile/');
    const smaller = smallerFile !== file ? manifest[smallerFile] : null;
    const size = imageSizes.get(file);
    const smallSize = imageSizes.get(smallerFile);
    const responsive =
      smaller?.file && smallSize
        ? ` srcset="/${escapeHTML(smaller.file)} ${smallSize.width}w, /${escapeHTML(asset.file)} ${size.width}w" sizes="${escapeHTML(sizes)}"`
        : '';
    const dimensions = size
      ? ` width="${size.width}" height="${size.height}"`
      : '';
    return `<figure><img src="/${escapeHTML(smaller?.file || asset.file)}"${responsive}${dimensions} alt="${escapeHTML(caption)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"><figcaption>${escapeHTML(caption)}</figcaption></figure>`;
  };
  const appPhoto = (name, caption) => {
    const small =
      manifest[`src/assets/generated/app/release-6/${name}-360.webp`];
    const large =
      manifest[`src/assets/generated/app/release-6/${name}-720.webp`];
    if (!small?.file || !large?.file)
      throw new Error(`Missing app screenshot: ${name}`);
    return `<figure><img src="/${escapeHTML(small.file)}" srcset="/${escapeHTML(small.file)} 360w, /${escapeHTML(large.file)} 720w" sizes="(max-width:360px) 76vw, (max-width:760px) 280px, 296px" width="1320" height="2868" alt="${escapeHTML(caption)}" loading="lazy" decoding="async"><figcaption>${escapeHTML(caption)}</figcaption></figure>`;
  };
  const researchArchive = await readFile(
    new URL('../src/about/researchArchive.html', import.meta.url),
    'utf8'
  );
  const recordByRoute = new Map(
    structures.map((record) => [`/structures/${record.url}`, record])
  );
  const { accessory_structures: accessories } = JSON.parse(
    await readFile(
      new URL(
        '../src/structures/data/accessoryStructures.json',
        import.meta.url
      ),
      'utf8'
    )
  );
  return (route, page) => {
    let body = `<h1>${escapeHTML(page.title.replace(/ — Poly Canyon$/, ''))}</h1>${paragraph(page.description)}`;
    const record = recordByRoute.get(route);
    if (record) {
      body = `<h1>${escapeHTML(record.names[0])}</h1>`;
      if (record.names.length > 1)
        body += paragraph(`Also known as ${record.names.slice(1).join(', ')}.`);
      body += `<p>No. ${escapeHTML(record.number)} · ${escapeHTML(record.year)} · ${escapeHTML(record.status)}</p>`;
      const fullResearch = record.extended_description?.trim();
      body += paragraph(fullResearch || record.description);
      if (record.advisor_builders?.length)
        body += `<section><h2>Builders and advisors</h2><ul>${record.advisor_builders.map((person) => `<li>${escapeHTML(person.name)}${person.role?.length ? ` — ${escapeHTML(person.role.join(', '))}` : ''}</li>`).join('')}</ul></section>`;
      if (record.tags?.length)
        body += `<p>${escapeHTML(record.tags.join(', '))}</p>`;
      if (record.location?.latitude)
        body += `<section><h2>Location</h2><p>${link(`https://www.google.com/maps/search/?api=1&query=${record.location.latitude},${record.location.longitude}`, 'Open in Google Maps')}</p></section>`;
      const resources = resourceLinks(record.links);
      if (resources.length)
        body += `<section><h2>Resources</h2><ul>${resources.map((item) => `<li>${link(item.URL, item.title || item.linkType || item.URL)}</li>`).join('')}</ul></section>`;
      if (fullResearch)
        body += `<details><summary>Research &amp; credits</summary>${paragraph(record.description)}</details>`;
      if (record.images?.length)
        body += `<section><h2>Photographs</h2>${sortImages(record.images)
          .map((image) => {
            const key = image.path.split('/').pop();
            const file =
              images.mainImages[key] ||
              images.closeUpImages[key] ||
              images.otherImages[key];
            return photo(file, image.description || record.names[0]);
          })
          .join('')}</section>`;
    } else if (route === '/') {
      body = `<h1>Student-built architecture at Cal Poly.</h1><p>${link('/structures', 'Explore the structures')}</p>${photo('src/assets/generated/home/M-24-1600.webp', 'Shell House', '(max-width:600px) calc(100vw - 36px), (max-width:1320px) calc(100vw - 80px), 1240px', true)}<h2>Shell House</h2><p>No. 24 · A cantilevered concrete shell resting on three points, conceived as a senior project in 1964.</p><p>${link('/structures/shellHouse', 'Read about Shell House')} · ${link('/structures/geodesicDome', 'Geodesic Dome')} · ${link('/structures/bridgeHouse', 'Bridge House')}</p><p>${link('/about', 'Learn about the canyon')} · ${link('/app', 'Download the app')}</p>`;
    } else if (route === '/structures') {
      body += `<ul>${structures.map((s) => `<li>${link(`/structures/${s.url}`, `${s.number}. ${s.names[0]}`)} — ${escapeHTML(s.description)}</li>`).join('')}<li>${link('/structures/accessory', 'Accessory structures')}</li></ul>`;
    } else if (route === '/structures/accessory') {
      body += accessories
        .map(
          (item) =>
            `<section><h2>${escapeHTML(item.name)}</h2><p>${escapeHTML(item.year)}</p>${paragraph(item.description)}${photo(
              images.accessoryImages[
                item.image
                  .split('/')
                  .pop()
                  .replace(/\.webp$/, '')
              ],
              item.name
            )}</section>`
        )
        .join('');
    } else if (route === '/privacy') {
      body = `<h1>Privacy Policy</h1><p>Last updated: ${escapeHTML(policyDate)}</p>${paragraph(policyIntroduction)}`;
      body += policySections
        .map(
          (section) =>
            `<section><h2>${escapeHTML(section.title)}</h2>${section.paragraphs.map((parts) => `<p>${parts.map((part) => (typeof part === 'string' ? escapeHTML(part) : link(part.contact ? `mailto:${contactEmail}` : part.href, part.text))).join('')}</p>`).join('')}</section>`
        )
        .join('');
    } else if (route === '/support') {
      body += `<p>${link(`mailto:${contactEmail}`, 'Contact Parker')} · ${escapeHTML(contactEmail)}</p>`;
    } else if (route === '/about') {
      body = `<h1>An outdoor construction laboratory</h1>${photo('src/assets/generated/info/a1.webp', 'The Geodesic Dome in Poly Canyon', '(max-width:600px) calc(100vw - 36px), (max-width:1120px) calc(100vw - 80px), 1040px', true)}${intro}${visit}${history}${project}<details><summary>Background notes &amp; original research</summary><p>Preserved background from the earlier About article, including historical stewardship and regional climate notes.</p>${researchArchive}</details>`;
    } else if (route === '/app') {
      body =
        '<h1>Poly Canyon for iPhone</h1><p>Take the canyon’s illustrated map, photographs, and stories with you, even offline.</p><p>Visits are optional and use location only while the app is open.</p>';

      body += `<p>${link('https://apps.apple.com/us/app/poly-canyon/id6499063781', 'Get Poly Canyon for iPhone on the App Store')}</p>`;
      for (const [name, caption] of [
        ['structures', 'Browse by name or number.'],
        ['shell-house', 'Read stories offline.'],
        ['map', 'Follow the illustrated map.'],
      ])
        body += appPhoto(name, caption);
      body += `<p>${link('/about#visit', 'Walking directions')} · ${link('/support', 'App support')} · ${link('/privacy', 'Privacy')}</p>`;
    }
    return `<div class="static-page" data-static-page><nav aria-label="Main navigation">${[
      ['/', 'Home'],
      ['/structures', 'Structures'],
      ['/about', 'About'],
      ['/app', 'App'],
    ]
      .map(([url, name]) => link(url, name))
      .join(
        ' '
      )}</nav><main id="main-content">${body}</main><footer>Poly Canyon · Built by Parker Jones · © ${new Date().getFullYear()} Poly Canyon · ${link('/privacy', 'Privacy')}<details><summary>Copyright</summary><p>Materials are presented for educational and archival purposes. Sources are credited where available. ${link('/support', 'Contact Parker about content or copyright')}.</p></details></footer></div>`;
  };
}
