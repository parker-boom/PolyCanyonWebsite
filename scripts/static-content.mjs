import { features } from '../src/home/features.js';
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
    return `<figure><img src="/${escapeHTML(smaller?.file || asset.file)}"${responsive}${dimensions} alt="${escapeHTML(caption)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"></figure>`;
  };
  const appPhoto = (name, caption) => {
    const small =
      manifest[`src/assets/generated/app/second-pass/${name}-360.webp`];
    const large =
      manifest[`src/assets/generated/app/second-pass/${name}-720.webp`];
    if (!small?.file || !large?.file)
      throw new Error(`Missing app screenshot: ${name}`);
    return `<figure><img src="/${escapeHTML(small.file)}" srcset="/${escapeHTML(small.file)} 360w, /${escapeHTML(large.file)} 720w" sizes="(max-width:360px) 76vw, (max-width:760px) 280px, 296px" width="1320" height="2868" alt="${escapeHTML(caption)}" loading="lazy" decoding="async"></figure>`;
  };
  const recordByRoute = new Map(
    structures.map((record) => [`/structures/${record.url}`, record])
  );
  return (route, page) => {
    let body = `<h1>${escapeHTML(page.title.replace(/ — Poly Canyon$/, ''))}</h1>${paragraph(page.description)}`;
    const record = recordByRoute.get(route);
    if (record) {
      body = `<h1>${escapeHTML(record.names[0])}</h1>`;
      if (record.names.length > 1)
        body += paragraph(`Also known as ${record.names.slice(1).join(', ')}.`);
      body += `<p>No. ${escapeHTML(record.number)} · ${escapeHTML(record.year)}${record.status === 'Ghost' ? ' · Historical structure' : ''}</p>`;
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
        body += `<section><h2>Sources &amp; further reading</h2><ul>${resources.map((item) => `<li>${link(item.URL, item.title || item.linkType || item.URL)}</li>`).join('')}</ul></section>`;
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
      body = `<h1>Poly Canyon</h1><p>An outdoor architecture lab at Cal Poly, with student-built structures dating back to the 1960s.</p><p>${link('/structures', 'Explore the structures')}</p>${features.map((f) => `${photo(`src/assets/generated/home/M-${f.number}-1600.webp`, f.name)}<p>${escapeHTML(f.text)} ${link(`/structures/${f.url}`, `Read about ${f.name}`)}</p>`).join('')}<h2>${link('/about', 'Learn about the canyon')}</h2><p>Its history and how to visit.</p><h2>${link('/app', 'Download the app')}</h2><p>A walking map and virtual tour for iPhone.</p>`;
    } else if (route === '/structures' || route === '/structures/history') {
      body += `<ul>${structures
        .filter((s) =>
          route === '/structures/history'
            ? s.status === 'Ghost'
            : s.status === 'Active'
        )
        .map(
          (s) =>
            `<li>${link(`/structures/${s.url}`, `${s.number}. ${s.names[0]}`)} — ${escapeHTML(s.description)}</li>`
        )
        .join('')}</ul>`;
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
      body = `<h1>What is Poly Canyon?</h1>${intro}<a href="/structures/cantileverDeck">${photo(images.mainImages['M-8'], 'Cantilever Deck in Poly Canyon')}</a><p>${link('/structures/cantileverDeck', 'Cantilever Deck makes its support system visible: cables carry the deck’s load through the upright structure to its base.')}</p>${visit}${history}${project}`;
    } else if (route === '/app') {
      body =
        '<h1>Poly Canyon for iPhone</h1><p>Your interactive guide to everything the canyon has to offer.</p>';

      body += `<p>${link('https://apps.apple.com/us/app/poly-canyon/id6499063781', 'Download on the App Store')}</p>`;
      for (const [name, caption] of [
        [
          'map',
          'Explore on foot. Use the walking map to find paths and locate the structures.',
        ],
        [
          'collection',
          'Learn about the structures. Read each structure’s history and see photographs of its design and construction.',
        ],
        [
          'tour',
          'Take a virtual tour. Browse the structures in a photo tour and see where each one sits on the map.',
        ],
      ])
        body += `<p>${escapeHTML(caption)}</p>` + appPhoto(name, caption);
      body += `<p>${link('/about#visit', 'Walking directions')} · ${link('/privacy', 'Privacy')}</p>`;
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
