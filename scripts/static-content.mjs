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
  const photo = (file, caption) => {
    const asset = manifest[file];
    if (!asset?.file)
      throw new Error(
        `Static page image is missing from the build manifest: ${file}`
      );
    const smallerFile = file.replace('/structures/', '/structures/mobile/');
    const smaller = smallerFile !== file ? manifest[smallerFile] : null;
    const size = imageSizes.get(file);
    const smallSize = imageSizes.get(smallerFile);
    const responsive =
      smaller?.file && smallSize
        ? ` srcset="/${escapeHTML(smaller.file)} ${smallSize.width}w, /${escapeHTML(asset.file)} ${size.width}w" sizes="(max-width:700px) 100vw, 750px"`
        : '';
    const dimensions = size
      ? ` width="${size.width}" height="${size.height}"`
      : '';
    return `<figure><img src="/${escapeHTML(smaller?.file || asset.file)}"${responsive}${dimensions} alt="${escapeHTML(caption)}" loading="lazy" decoding="async"><figcaption>${escapeHTML(caption)}</figcaption></figure>`;
  };
  const appPhoto = (name, caption) => {
    const small = manifest[`src/assets/generated/app/current/${name}-360.webp`];
    const large = manifest[`src/assets/generated/app/current/${name}-720.webp`];
    if (!small?.file || !large?.file)
      throw new Error(`Missing app screenshot: ${name}`);
    return `<figure><img src="/${escapeHTML(small.file)}" srcset="/${escapeHTML(small.file)} 360w, /${escapeHTML(large.file)} 720w" sizes="(max-width:360px) 76vw, (max-width:760px) 280px, 296px" width="1206" height="2622" alt="${escapeHTML(caption)}" loading="lazy" decoding="async"><figcaption>${escapeHTML(caption)}</figcaption></figure>`;
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
      body = `<h1>About Poly Canyon</h1>
        <p>Poly Canyon is an area of hills and trails northeast of Cal Poly’s campus. Within it, a ${link('https://caed.calpoly.edu/content/facilities/poly-canyon', 'nine-acre outdoor construction laboratory')} contains bridges, towers, houses, and other structures designed and built by students.</p>
        <p>Known today as the Architecture Graveyard, the canyon took shape as a place for students to try new ideas. Beginning in the 1960s, they brought designs out of the classroom and built them here at full scale, experimenting with materials, forms, and ways of building.</p>
        <section id="history"><h2>An outdoor construction laboratory</h2>
        <p>George Hasslein, the first dean of Cal Poly’s College of Architecture and Environmental Design, supported the canyon as a place for large experimental projects. Students could take a design through calculations, fabrication, and construction, leaving a full-size example for later classes to study.</p>
        <p>The ${link('/structures/blade', 'Blade Structure')} shows how that work has developed over time. First built in 1963 to test a method of strengthening concrete with tensioned steel, it was reconstructed by another student team in 2003 after the original deteriorated. More recent projects include the ${link('/structures/momentMonument', 'Moment Monument')}, whose exposed steel connections help students study earthquake-resistant framing.</p>
        <p id="stewardship">An outdoor site also needs ongoing care. Resident student caretakers historically maintained the grounds, and the student-led Canyon Days Committee formed in 2014 to address deterioration and vandalism. The canyon also hosts Design Village, a competition in which students build temporary shelters and inhabit them for a weekend.</p>
        <p>Read more: ${link('https://polycanyon.calpoly.edu/history', 'Cal Poly’s structure history')}, ${link('https://polycanyon.calpoly.edu/history/blade-structure', 'the Blade reconstruction')}, ${link('https://digitalcommons.calpoly.edu/arcesp/208/', 'the Moment Monument project report')}, and ${link('https://caed.calpoly.edu/about-canyon-days-committee', 'Canyon Days')}.</p></section>
        <section id="landscape"><h2>The landscape around the structures</h2>
        <p>The construction site occupies only a small part of the wider canyon. Brizzolara Creek runs through the valley, with grasslands, oak-covered slopes, and streamside vegetation around it. Rocky ridges support different plant communities from the wetter ground below.</p>
        <p>Those differences have a geological basis. Cal Poly’s ${link('https://polyland.net/overview/Archives/derome/geology.html', 'Poly Land field guide')} describes serpentinite along the ridge east of Poly Canyon Road, sandstone and shale elsewhere in the valley, and the changes in vegetation across them. The exposed rock, creek, and seasonal weather are part of the setting in which the structures were built and have aged.</p>
        <h3>Weather through the year</h3>
        <p><strong>May to early October.</strong> Rain is uncommon during the dry season. Pacific air moderates temperatures, and coastal fog can reach San Luis Obispo overnight and into the morning. Clear afternoons can feel quite different from the start of the day.</p>
        <p><strong>Late October through April.</strong> Most rain arrives with Pacific storms, especially in winter. Rainfall varies considerably from year to year. Wet ground and runoff change conditions along the paths and creek, even when the weather has cleared.</p>
        <p>Typical regional patterns for San Luis Obispo. Sources: ${link('https://www.weather.gov/media/wrh/online_publications/TMs/TM-223.pdf', 'National Weather Service climate study')} and ${link('https://afd.calpoly.edu/sustainability/campus-action/water/water-sources', 'Cal Poly’s water resources overview')}.</p></section>
        <section id="visit"><h2>Visiting the canyon</h2>
        <p>Access the area by walking along Poly Canyon Road on campus.</p>
        <h3>Walking directions</h3><ol>${steps.map((step) => `<li>${escapeHTML(step)}</li>`).join('')}</ol>
        <p>${link('https://www.alltrails.com/trail/us/california/architecture-graveyard-hike-private-property?sh=rvw6ps', 'AllTrails')} · ${link('https://maps.app.goo.gl/H8Dq6Y5x1E6pQJzk9', 'Google Maps')}</p>
        <p>Visit during daylight hours. Bring water and wear hiking shoes; the ground around the structures can be uneven. Keep your distance from wildlife and horses. Check the weather before you go: summer afternoons can be hot, and paths can be muddy after rain. Cell service can be spotty, so download the ${link('/app', 'app')} before your visit.</p></section>
        <section id="project"><h2>About the archive</h2>
        <p>This project began with a map. After visiting Poly Canyon as a Cal Poly student, Parker Jones found that existing maps had misplaced labels and poorly scaled paths. He traced paths and structures from aerial photography, then ${link('https://caed.calpoly.edu/student-developed-app-revolutionizes-poly-canyon-experience', 'developed the app')} to make that map available to other visitors.</p>
        <p>Research into the structures followed, with help from Kennedy Library and students in the College of Architecture and Environmental Design. The website brings together structure descriptions, historical photographs, and links to original project reports. The app provides a map for exploring on foot; the website offers more room to read through the research and compare past projects.</p>
        <p>The archive draws on original theses, photographs, and university records, including resources compiled by Danny Wills’s architecture studio and Jesse Vestermark’s library research guide. Source documents are linked in the Resources section of individual structure pages where available. Records are uneven, and a photograph or project report may describe an earlier condition of the site.</p></section>`;
    } else if (route === '/app') {
      body =
        '<h1>Poly Canyon for iPhone</h1><p>Take the canyon’s illustrated map, photographs, and stories with you, even offline.</p><p>Visits are optional and use location only while the app is open.</p>';

      body += `<p>${link('https://apps.apple.com/us/app/poly-canyon/id6499063781', 'Get Poly Canyon for iPhone on the App Store')}</p>`;
      for (const [name, caption] of [
        ['structures', 'Browse by name or number.'],
        ['entry-arch', 'Read stories offline.'],
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
      )}</nav><main id="main-content">${body}</main><footer>${link('/structures', 'Browse the structures')} · ${link('/privacy', 'Privacy')} · ${link('/support', 'Contact')}</footer></div>`;
  };
}
