import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { readStructures } from './structure-data.mjs';

test('every research photo and accessory resolves to a bundled image', async () => {
  const moduleURL = new URL('../src/structures/images/structureImages.js', import.meta.url);
  const source = await readFile(moduleURL, 'utf8');
  const imports = new Map([...source.matchAll(/import (\w+) from '([^']+\.webp)';/g)]
    .map(([, symbol, file]) => [symbol, new URL(file, moduleURL)]));
  const maps = {};
  for (const [, name, body] of source.matchAll(/export const (\w+) = \{([^}]+)\};/g)) {
    maps[name] = new Map(body.split(',').map(row => row.trim()).filter(Boolean).map(row => {
      const [key, value = key] = row.split(':').map(part => part.trim());
      return [key.replaceAll("'", ''), imports.get(value)];
    }));
  }
  for (const url of imports.values()) await access(url);
  for (const record of await readStructures()) {
    assert.ok(maps.thumbnailImages.get(`M-${record.number}`), `${record.url}: missing thumbnail`);
    for (const image of record.images || []) {
      const key = image.path.split('/').pop();
      assert.ok(maps.mainImages.get(key) || maps.closeUpImages.get(key) || maps.otherImages.get(key),
        `${record.url}: unregistered image ${image.path}`);
    }
  }
  const { accessory_structures: accessories } = JSON.parse(await readFile(
    new URL('../src/structures/data/accessoryStructures.json', import.meta.url), 'utf8'));
  for (const item of accessories) {
    const key = item.image.split('/').pop().replace(/\.webp$/, '');
    assert.ok(maps.accessoryImages.get(key), `${item.name}: unregistered accessory image`);
  }
});
