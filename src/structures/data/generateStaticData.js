import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateStaticData() {
  try {
    // Read structuresInfo.json
    const structuresInfo = JSON.parse(
      await fs.readFile(path.join(__dirname, 'structuresInfo.json'), 'utf-8')
    );

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'src', 'structures', 'data');
    await fs.mkdir(dataDir, { recursive: true });

    // Create simplified list from structuresInfo.json
    const basicList = structuresInfo
      .map((structure) => ({
        number: structure.number,
        url: structure.url,
        title: structure.names[0], // Use first name as primary title
        image_key: `M-${structure.number}`,
      }))
      .sort((a, b) => a.number - b.number);

    // Save simplified list
    await fs.writeFile(
      path.join(dataDir, 'structuresList.json'),
      JSON.stringify(basicList),
      'utf-8'
    );

    console.log('Static data files generated successfully!');
  } catch (error) {
    console.error('Error generating static data:', error);
    process.exit(1);
  }
}

generateStaticData();
