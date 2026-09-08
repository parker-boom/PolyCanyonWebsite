import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { readStructures } from '../../../scripts/structure-data.mjs';
const root = fileURLToPath(new URL('../../../', import.meta.url));

async function generateStaticData() {
  try {
    const structuresInfo = (await readStructures()).sort(
      (a, b) => a.number - b.number
    );

    // Create data directory
    const dataDir = path.join(root, 'src', 'structures', 'data');
    await fs.mkdir(dataDir, { recursive: true });

    // Create simplified list for navigation
    // Now including the status field
    const basicList = structuresInfo.map(
      ({ number, url, names, status, year, images }) => ({
        number,
        year,
        imageCount: images?.length || 0,
        url,
        title: names[0],
        image_key: `M-${number}`,
        status: status || 'Active', // Providing a default value in case status is missing
      })
    );

    // Add the accessory structures entry
    basicList.push({
      number: -1,
      url: 'accessory',
      title: 'Accessory Structures',
      image_key: 'M-accessory',
      status: 'Active',
    });

    // Save files
    await Promise.all([
      fs.writeFile(
        path.join(dataDir, 'structuresList.json'),
        JSON.stringify(basicList),
        'utf-8'
      ),
      fs.writeFile(
        path.join(dataDir, 'structuresInfo.local.json'),
        JSON.stringify(structuresInfo),
        'utf-8'
      ),
    ]);

    console.log('Static data files generated successfully!');
  } catch (error) {
    console.error('Error generating static data:', error);
    process.exit(1);
  }
}

generateStaticData();
