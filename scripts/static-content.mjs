import { features } from '../src/home/features.js';
import {
  eras,
  introduction,
  transition,
  discoveries,
  structureLinks,
  linkedParts,
} from '../src/about/storyContent.js';
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
  const appPhoto = (name, caption) =>
    `<figure><img src="/media/app-tap-only/${name}.webp" width="720" height="1564" alt="${escapeHTML(caption)}" loading="lazy" decoding="async"></figure>`;
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
      body = `<h1>An outdoor architecture lab</h1><p>Student-built structures at Cal Poly, from experiments in the 1960s to the projects standing today.</p><p>${link('/structures', 'Browse the archive')}</p>${features.map((f) => `${photo(`src/assets/generated/home/M-${f.number}-1600.webp`, f.name)}<p>${escapeHTML(f.text)} ${link(`/structures/${f.url}`, `Read about ${f.name}`)}</p>`).join('')}<h2>${link('/about', 'Learn about the canyon')}</h2><p>Its history and how to visit.</p><h2>${link('/app', 'Download the app')}</h2><p>A walking map and virtual tour for iPhone.</p>`;
    } else if (route === '/structures' || route === '/structures/history') {
      const collection = (status) =>
        `<ul>${structures
          .filter((s) => s.status === status)
          .map(
            (s) =>
              `<li>${link(`/structures/${s.url}`, `${s.number}. ${s.names[0]}`)} — ${escapeHTML(s.description)}</li>`
          )
          .join('')}</ul>`;
      body = `<h1>Structures</h1>${collection('Active')}<details id="historical"${route === '/structures/history' ? ' open' : ''}><summary>Historical structures</summary>${collection('Ghost')}</details>`;
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
      const eraFiles = {
        beginnings: 'archive/chronicles/Story/Images/A/A6.webp',
        village: 'archive/chronicles/Story/Images/C/C2.webp',
        gathering: 'archive/chronicles/Story/Images/D/D5.webp',
        today: 'archive/chronicles/Story/Images/F/F1.webp',
      };
      const linkedStory = (text) =>
        linkedParts(text)
          .map((part) =>
            structureLinks[part]
              ? link(`/structures/${structureLinks[part]}`, part)
              : escapeHTML(part)
          )
          .join('');
      body = `<h1>What is Poly Canyon?</h1>${introduction.map((text) => `<p>${escapeHTML(text)}</p>`).join('')}${discoveries.map((item) => `<a href="/structures/${item.slug}">${photo(images.mainImages[`M-${item.number}`], item.name)}</a><p>${link(`/structures/${item.slug}`, item.name)}</p><p>${escapeHTML(item.text)}</p>`).join('')}<section id="visit"><h2>Visiting</h2>${photo(images.mainImages['M-1'], 'The stone Entry Arch beside the canyon path')}<p>The ${link('/structures/entryArch', 'Entry Arch')} marks your arrival.</p><p>Open to the public year-round. Come during daylight and follow any posted closures.</p><p>From the H-4f parking lot at Cal Poly, follow Poly Canyon Road through the yellow gate to the ${link('/structures/entryArch', 'Entry Arch')}. Bring water and shoes for uneven ground; paths can be muddy after rain.</p><p>${link('https://www.google.com/maps/dir/?api=1&origin=35.30302,-120.65913&destination=35.31344,-120.65192&travelmode=walking', 'Walking directions')} · ${link('https://www.alltrails.com/trail/us/california/architecture-graveyard-hike-private-property', 'Trail on AllTrails')}</p></section><section id="history"><h2>The history of the canyon</h2><p>${escapeHTML(transition)}</p>${eras.map((era) => `<h3>${escapeHTML(era.date)} · ${escapeHTML(era.title)}</h3><p>${linkedStory(era.text)}</p>${photo(eraFiles[era.photo], era.alt)}<p>${linkedStory(era.caption)}</p>`).join('')}</section><section id="project"><h2>About this archive</h2><p>Parker Jones assembled this collection of photographs, structure histories, and original project reports with help from Cal Poly’s Kennedy Library and architecture community. ${link('/structures', 'Browse the archive.')}</p><div aria-label="Contact Parker"><p>Questions, corrections, or anything else? Reach out.</p><p>${link('mailto:parker.jones@Live.com', 'parker.jones@Live.com')}</p><p>${link('mailto:parker.jones@Live.com', 'Email Parker')}</p></div></section>`;
    } else if (route === '/app') {
      body = '<h1>Poly Canyon for iPhone</h1>';

      body += `<p>${link('https://apps.apple.com/us/app/poly-canyon/id6499063781', 'Download on the App Store')}</p>`;
      for (const [name, caption] of [
        [
          'explore',
          'Explore. Navigate the canyon, discover its structures, and track your progress as you explore.',
        ],
        [
          'learn',
          'Learn. Discover who built each structure, how it was made, and the history behind its design.',
        ],
        [
          'tour',
          'Tour. Take a virtual walk through the canyon, exploring its structures and their surroundings.',
        ],
      ])
        body += `<p>${escapeHTML(caption)}</p>` + appPhoto(name, caption);
      body += `<p>${link('/about#visit', 'Walking directions')} · ${link('/privacy', 'Privacy')}</p>`;
    }
    return `<div class="static-page" data-static-page><nav aria-label="Main navigation">${[
      ['/', 'Home'],
      ['/about', 'About'],
      ['/app', 'App'],
      ['/structures', 'Structures'],
    ]
      .map(([url, name]) => link(url, name))
      .join(
        ' '
      )}</nav><main id="main-content">${body}</main><footer>Poly Canyon · Built by Parker Jones · © ${new Date().getFullYear()} Poly Canyon · ${link('/privacy', 'Privacy')}<details><summary>Copyright</summary><p>Materials are presented for educational and archival purposes. Sources are credited where available. ${link('/support', 'Contact Parker about content or copyright')}.</p></details></footer></div>`;
  };
}
