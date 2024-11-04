import fs from 'fs/promises';
import path from 'path';

async function generateStaticData() {
  try {
    // Read from public folder
    const structuresInfo = JSON.parse(
      await fs.readFile(
        path.join(process.cwd(), 'public', 'data', 'structuresInfo.json'),
        'utf-8'
      )
    );

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'src', 'structures', 'data');
    await fs.mkdir(dataDir, { recursive: true });

    // Create simplified list from structuresInfo.json
    const basicList = structuresInfo
      .map((structure) => ({
        number: structure.number,
        url: structure.url,
        title: structure.names[0],
        image_key: `M-${structure.number}`,
      }))
      .sort((a, b) => a.number - b.number);

    // Save simplified list
    await fs.writeFile(
      path.join(dataDir, 'structuresList.json'),
      JSON.stringify(basicList),
      'utf-8'
    );

    // Save a local copy of structuresInfo for React
    await fs.writeFile(
      path.join(dataDir, 'structuresInfo.local.json'),
      JSON.stringify(structuresInfo),
      'utf-8'
    );

    console.log('Static data files generated successfully!');
  } catch (error) {
    console.error('Error generating static data:', error);
    process.exit(1);
  }
}

generateStaticData();
