// Import the static JSON files
import structuresList from './structuresList.json';
import structuresInfo from './structuresInfo.local.json';
import accessoryStructures from './accessoryStructures.json';

// Get the basic list of structures (used in StructureList.js)
export const getStructuresList = () => structuresList;

// Get detailed info for a specific structure (used in StructureInfo.js)
export const getStructureInfo = (number) =>
  structuresInfo.find((structure) => structure.number === number);

// Get accessory structures data
export const getAccessoryStructures = () =>
  accessoryStructures.accessory_structures;

// Get a specific accessory structure by name
export const getAccessoryStructure = (name) =>
  accessoryStructures.accessory_structures.find(
    (structure) => structure.name === name
  );
