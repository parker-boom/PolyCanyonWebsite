import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import structuresRoutes from './routes/structures.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
let db;
const connectToDb = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    db = client.db('poly_canyon_structures');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Middleware to attach db to request
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use('/api/structures', structuresRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectToDb();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
