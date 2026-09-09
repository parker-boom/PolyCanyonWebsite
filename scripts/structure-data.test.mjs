import test from 'node:test';
import assert from 'node:assert/strict';
import { validateStructures, readStructures } from './structure-data.mjs';
const record = {
  number: 1,
  url: 'entryArch',
  names: ['Entry Arch'],
  description: 'A stone arch.',
};

test('current research data satisfies route generation requirements', async () => {
  assert.ok((await readStructures()).length > 0);
});
test('duplicate IDs and case-insensitive URLs cannot overwrite generated pages', () => {
  assert.throws(
    () =>
      validateStructures({
        structures: [record, { ...record, url: 'second' }],
      }),
    /duplicate number/
  );
  assert.throws(
    () =>
      validateStructures({
        structures: [record, { ...record, number: 2, url: 'EntryArch' }],
      }),
    /duplicate or reserved URL/
  );
});
test('unsafe paths and reserved history URL cannot become output directories', () => {
  for (const url of [
    '../outside',
    'nested/path',
    'history',
    'thing?query',
    'thing#hash',
  ])
    assert.throws(() =>
      validateStructures({ structures: [{ ...record, url }] })
    );
});
test('missing titles or descriptions fail with actionable context', () => {
  assert.throws(
    () => validateStructures({ structures: [{ ...record, names: [] }] }),
    /Structure 1: names/
  );
  assert.throws(
    () =>
      validateStructures({ structures: [{ ...record, description: null }] }),
    /Structure 1: description/
  );
});
