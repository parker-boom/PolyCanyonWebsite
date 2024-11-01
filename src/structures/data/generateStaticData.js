import { MongoClient } from 'mongodb';
import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';

async function generateStaticData() {
  let client;
  try {
    // Connect to MongoDB
    client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db('poly_canyon_structures');

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'src', 'structures', 'data');
    await fs.mkdir(dataDir, { recursive: true });

    // Fetch full structure info
    const fullStructures = await db
      .collection('structure_full_info')
      .find({})
      .toArray();

    // Save full structure info
    await fs.writeFile(
      path.join(dataDir, 'structuresInfo.json'),
      JSON.stringify(fullStructures),
      'utf-8'
    );

    // Create and save simplified list
    const basicList = fullStructures
      .map((structure) => ({
        number: structure.number,
        url: structure.url,
        title: structure.name,
        image_key: `M-${structure.number}`,
      }))
      .sort((a, b) => a.number - b.number);

    await fs.writeFile(
      path.join(dataDir, 'structuresList.json'),
      JSON.stringify(basicList),
      'utf-8'
    );

    console.log('Static data files generated successfully!');
  } catch (error) {
    console.error('Error generating static data:', error);
    process.exit(1);
  } finally {
    if (client) await client.close();
  }
}

generateStaticData();
