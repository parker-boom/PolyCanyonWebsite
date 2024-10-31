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

    // Fetch and save basic structures list
    const basicList = await db
      .collection('basic_structures_list')
      .findOne({ _id: 'basic_structure_list' });

    await fs.writeFile(
      path.join(dataDir, 'structuresList.json'),
      JSON.stringify(basicList.structures),
      'utf-8'
    );

    // Fetch and save full structure info
    const fullStructures = await db
      .collection('structure_full_info')
      .find({})
      .toArray();

    await fs.writeFile(
      path.join(dataDir, 'structuresInfo.json'),
      JSON.stringify(fullStructures),
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
