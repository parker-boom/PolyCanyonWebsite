import { readFile } from 'node:fs/promises';

// Fail before emitting routes: editor mistakes must not silently overwrite pages.
export function validateStructures(data) {
  if (!Array.isArray(data?.structures) || !data.structures.length)
    throw new Error('Structure data must contain a nonempty structures array.');
  const numbers = new Set();
  const urls = new Set(['history']);
  for (const structure of data.structures) {
    const label = `Structure ${structure?.number ?? '(missing number)'}`;
    if (!Number.isInteger(structure?.number) || structure.number < 1)
      throw new Error(`${label}: number must be a positive integer.`);
    if (numbers.has(structure.number))
      throw new Error(`${label}: duplicate number.`);
    numbers.add(structure.number);
    if (
      typeof structure.url !== 'string' ||
      !/^[A-Za-z0-9][A-Za-z0-9-]*$/.test(structure.url)
    )
      throw new Error(
        `${label}: URL must be a single letters/numbers/hyphens slug.`
      );
    if (urls.has(structure.url.toLowerCase()))
      throw new Error(`${label}: duplicate or reserved URL ${structure.url}.`);
    urls.add(structure.url.toLowerCase());
    if (
      !Array.isArray(structure.names) ||
      !structure.names.length ||
      structure.names.some((name) => typeof name !== 'string' || !name.trim())
    )
      throw new Error(`${label}: names must contain nonempty text.`);
    if (
      typeof structure.description !== 'string' ||
      !structure.description.trim()
    )
      throw new Error(`${label}: description must contain text.`);
    if (structure.images != null && !Array.isArray(structure.images))
      throw new Error(`${label}: images must be an array.`);
  }
  return data.structures;
}

export async function readStructures() {
  return validateStructures(
    JSON.parse(
      await readFile(
        new URL('../public/data/structuresInfo.json', import.meta.url),
        'utf8'
      )
    )
  );
}
