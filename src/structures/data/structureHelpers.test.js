import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  sortStructures,
  galleryQuery,
  sortImages,
} from './structureHelpers.js';
const list = JSON.parse(
  readFileSync(new URL('./structuresList.json', import.meta.url))
);
test('every sort retains the complete archive, including Moment Monument', () => {
  for (const sort of ['Number', 'Year', 'Location']) {
    assert.equal(sortStructures(list, { sort }).length, list.length);
    assert.equal(sortStructures(list, { sort, query: 'Moment' })[0].number, 31);
  }
});
test('year sorting handles date ranges and unknown dates', () => {
  const entries = [
    { number: 1, year: '1980–1982' },
    { number: 2, year: '1965' },
    { number: 3 },
  ];
  assert.deepEqual(
    sortStructures(entries, { sort: 'Year' }).map((s) => s.number),
    [2, 1, 3]
  );
});
test('gallery links accept valid indices and reject malformed/out-of-bounds values', () => {
  assert.deepEqual(galleryQuery('?fullscreen=true&imageIndex=3', 5), {
    fullscreen: true,
    index: 3,
  });
  for (const value of ['-1', '5', '1.5', 'bad'])
    assert.equal(galleryQuery(`?imageIndex=${value}`, 5).index, 0);
});
test('gallery presentation ordering does not mutate the source archive', () => {
  const images = [{ type: 'closeup' }, { type: 'main' }, { type: 'other' }];
  assert.deepEqual(
    sortImages(images).map((i) => i.type),
    ['main', 'other', 'closeup']
  );
  assert.equal(images[0].type, 'closeup');
});

test('empty and missing photo records cannot request a fullscreen gallery', () => {
  for (const images of [[], undefined, null]) {
    assert.deepEqual(sortImages(images), []);
    assert.deepEqual(
      galleryQuery('?fullscreen=true&imageIndex=6', sortImages(images).length),
      {
        index: 0,
        fullscreen: false,
      }
    );
  }
});

test('malformed photo entries can be normalized without a sorting crash', () => {
  assert.doesNotThrow(() => sortImages([null, { type: 'main' }, undefined]));
});

test('adjacency stays within a collection and excludes invalid records', async () => {
  const { adjacentStructures } = await import('./structureHelpers.js');
  const records = [
    { number: 1, url: 'first', status: 'Active' },
    { number: 2, url: 'last', status: 'Active' },
    { number: 3, url: 'past', status: 'Ghost' },
    { number: -1, url: 'invalid', status: 'Active' },
  ];
  assert.deepEqual(adjacentStructures(records, 'first'), {
    previous: null,
    next: records[1],
  });
  assert.deepEqual(adjacentStructures(records, 'last'), {
    previous: records[0],
    next: null,
  });
  assert.deepEqual(adjacentStructures(records, 'past'), {
    previous: null,
    next: null,
  });
  assert.deepEqual(adjacentStructures(records, 'invalid'), {
    previous: null,
    next: null,
  });
});

test('search finds structures by their archived alternative names', () => {
  for (const [query] of [
    ['Water Tanks', 'waterStorage'],
    ['Earth House', 'undergroundHouse'],
    ['The Concrete Flower', 'blade'],
  ]) {
    const record = list.find((s) => s.aliases?.includes(query));
    assert.ok(record, `Missing archived alias: ${query}`);
    assert.ok(
      sortStructures(list, { query }).some((s) => s.url === record.url)
    );
  }
});
