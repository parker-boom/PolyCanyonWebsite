import { writeFile } from 'node:fs/promises';
import { readStructures } from './structure-data.mjs';
const structures = await readStructures();
const pages = {
  '/': {
    title: 'Poly Canyon — Explore the Structures',
    description:
      'An outdoor architecture lab at Cal Poly, built by students since the 1960s. Browse the structures, read their histories, and find out how to visit.',
  },
  '/about': {
    title: 'About Poly Canyon',
    description:
      'What is Poly Canyon? Learn how Cal Poly’s outdoor architecture lab began, what stands there today, and how to get there.',
  },
  '/app': {
    title: 'Get the Poly Canyon App',
    description:
      'Find your way around Poly Canyon, track the structures you visit, and learn how they were built. Available for iPhone, with a virtual tour to explore from home.',
  },
  '/structures': {
    title: 'Poly Canyon Structures — Explore the Archive',
    description:
      'Browse Poly Canyon’s student-built houses, bridges, towers, and other experiments, with photographs, construction histories, and original project reports.',
  },
  '/structures/history': {
    title: 'Historical structures — Poly Canyon',
    description:
      'Photographs and research documenting Poly Canyon projects that are no longer standing.',
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
