import structuresList from './structuresList.json';
import structuresInfo from './structuresInfo.json';

export function getStructuresList() {
  return structuresList;
}

export function getStructureInfo(number) {
  return structuresInfo.find((structure) => structure.number === number);
}
