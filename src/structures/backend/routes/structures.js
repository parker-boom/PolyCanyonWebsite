import express from 'express';
const router = express.Router();

// Get all structures (basic list)
router.get('/list', async (req, res) => {
  try {
    console.log('Attempting to fetch structures from database...');

    const document = await req.db
      .collection('basic_structures_list')
      .findOne({ _id: 'basic_structure_list' });

    console.log('Database response:', document);

    if (document && document.structures) {
      console.log(`Found ${document.structures.length} structures`);
      res.json(document.structures);
    } else {
      console.log('No structures found in database');
      res.status(404).json({ message: 'Structure list not found' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get structure by number
router.get('/info/:number', async (req, res) => {
  try {
    const structureNumber = parseInt(req.params.number);
    console.log('Attempting to fetch structure...', {
      number: structureNumber,
      type: typeof structureNumber,
    });

    const collection = req.db.collection('structure_full_info');
    const structure = await collection.findOne({ number: structureNumber });

    if (structure) {
      console.log(`Found structure #${structureNumber}`);
      res.json(structure);
    } else {
      console.log(`No structure found with number ${structureNumber}`);
      res.status(404).json({
        message: 'Structure not found',
        searchedFor: { number: structureNumber },
      });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
});

export default router;
