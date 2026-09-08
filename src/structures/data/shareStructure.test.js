import test from 'node:test';
import assert from 'node:assert/strict';
import { shareStructure } from './shareStructure.js';
const data = { url: 'https://polycanyon.com/structures/entryArch' };
test('unavailable native share falls back to clipboard with visible confirmation', async () => {
  let copied;
  const result = await shareStructure(data, {
    share: async () => {
      throw new Error('unavailable');
    },
    clipboard: {
      writeText: async (url) => {
        copied = url;
      },
    },
  });
  assert.equal(copied, data.url);
  assert.equal(result, 'Link copied.');
});
test('cancelling native share does not copy without asking', async () => {
  let copied = false;
  assert.equal(
    await shareStructure(data, {
      share: async () => {
        throw Object.assign(new Error(), { name: 'AbortError' });
      },
      clipboard: {
        writeText: async () => {
          copied = true;
        },
      },
    }),
    ''
  );
  assert.equal(copied, false);
});
test('denied clipboard offers a recoverable message', async () => {
  assert.match(await shareStructure(data, {}), /page’s address/);
});
