// Import the static JSON files
import structuresList from './structuresList.json';
import structuresInfo from './structuresInfo.local.json';

// Get the basic list of structures (used in StructureList.js)
export const getStructuresList = () => structuresList;

// Get detailed info for a specific structure (used in StructureInfo.js)
export const getStructureInfo = (number) =>
  structuresInfo.find((structure) => structure.number === number);
