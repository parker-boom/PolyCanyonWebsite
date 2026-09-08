import { writeFile } from 'node:fs/promises';
import { readStructures } from './structure-data.mjs';
const structures = await readStructures();
const pages = {
  '/': {
    title: 'Poly Canyon — Explore the Structures',
    description:
      'Explore Cal Poly’s student-built architectural laboratory. Discover its structures, history, and the information you need for a visit.',
  },
  '/about': {
    title: 'About Poly Canyon',
    description:
      'Poly Canyon’s experimental structures, history and landscape, with walking directions and information for visiting Cal Poly’s outdoor laboratory.',
  },
  '/app': {
    title: 'Get the Poly Canyon App',
    description:
      'An illustrated canyon map, photographs, and offline structure stories in the Poly Canyon app for iPhone.',
  },
  '/structures': {
    title: 'Poly Canyon Structures — Explore the Archive',
    description:
      'Browse active and historic student-built structures in Poly Canyon. Explore photographs, project details, and original research resources.',
  },
  '/structures/history': {
    title: 'Past Structures — Poly Canyon',
    description:
      'Photographs and research documenting Poly Canyon projects that are no longer standing.',
  },
  '/structures/accessory': {
    title: 'Accessory Structures — Poly Canyon',
    description:
      'Explore the bridges, signs, and smaller structures that connect Poly Canyon’s outdoor architectural laboratory.',
  },
  '/support': {
    title: 'Support — Poly Canyon',
    description:
      'Get help with the Poly Canyon app and website, or send corrections and questions about the archive.',
  },
  '/privacy': {
    title: 'Privacy Policy — Poly Canyon',
    description: 'Privacy information for the Poly Canyon app and website.',
  },
};
for (const structure of structures) {
  const description = structure.description.replace(/\s+/g, ' ').trim();
  pages[`/structures/${structure.url}`] = {
    title: `${structure.names[0]} — Poly Canyon`,
    description:
      description.length > 170
        ? description.slice(0, 167).replace(/\s+\S*$/, '') + '…'
        : description,
  };
}
await writeFile(
  new URL('../src/app/metadata.generated.json', import.meta.url),
  JSON.stringify(pages, null, 2) + '\n'
);
console.log(`Prepared metadata for ${Object.keys(pages).length} public pages.`);
