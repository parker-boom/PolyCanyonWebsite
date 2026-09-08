import { resourceLinks } from '../src/structures/data/resourceLinks.js';
import { readFile } from 'node:fs/promises';
import {
  policyDate,
  policyIntroduction,
  policySections,
} from '../src/utils/privacyContent.js';
import { contactEmail } from '../src/app/contact.js';
import { steps } from '../src/info/directions.js';
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
  const photo = (file, caption) => {
    const asset = manifest[file];
    if (!asset?.file)
      throw new Error(
        `Static page image is missing from the build manifest: ${file}`
      );
    return `<figure><img src="/${escapeHTML(asset.file)}" alt="${escapeHTML(caption)}" loading="lazy" decoding="async"><figcaption>${escapeHTML(caption)}</figcaption></figure>`;
  };
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
      body += paragraph(
        record.extended_description?.trim() || record.description
      );
      if (record.extended_description?.trim())
        body += `<details><summary>Short overview</summary>${paragraph(record.description)}</details>`;
      if (record.advisor_builders?.length)
        body += `<section><h2>Builders and advisors</h2><ul>${record.advisor_builders.map((person) => `<li>${escapeHTML(person.name)}${person.role?.length ? ` — ${escapeHTML(person.role.join(', '))}` : ''}</li>`).join('')}</ul></section>`;
      if (record.tags?.length)
        body += `<p>${escapeHTML(record.tags.join(', '))}</p>`;
      if (record.location?.latitude)
        body += `<section><h2>Location</h2><p>${link(`https://www.google.com/maps/search/?api=1&query=${record.location.latitude},${record.location.longitude}`, 'Open in Google Maps')}</p></section>`;
      const resources = resourceLinks(record.links);
      if (resources.length)
        body += `<section><h2>Resources</h2><ul>${resources.map((item) => `<li>${link(item.URL, item.title || item.linkType || item.URL)}</li>`).join('')}</ul></section>`;
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
      body += `<h2 id="visiting">Walking directions</h2><ol>${steps.map((step) => `<li>${escapeHTML(step)}</li>`).join('')}</ol>`;
    } else if (route === '/app') {
      body += `<p>${link('https://apps.apple.com/us/app/poly-canyon/id6499063781', 'Get Poly Canyon for iPhone on the App Store')}</p>`;
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
      )}</nav><main id="main-content">${body}</main><footer>${link('/structures', 'Browse the structures')} · ${link('/privacy', 'Privacy')} · ${link('/support', 'Contact')}</footer></div>`;
  };
}
