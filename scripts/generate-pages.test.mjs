import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readStructures } from './structure-data.mjs';
import { escapeHTML } from './static-content.mjs';
import { resourceLinks } from '../src/structures/data/resourceLinks.js';

test('two generation passes preserve every research body and resource link', async () => {
  const out = await mkdtemp(path.join(tmpdir(), 'poly-pages-'));
  try {
    await mkdir(path.join(out, '.vite'));
    await writeFile(
      path.join(out, 'index.html'),
      await readFile(new URL('../index.html', import.meta.url))
    );
    const dimensions = JSON.parse(
      await readFile(
        new URL('../src/assets/generated/dimensions.json', import.meta.url),
        'utf8'
      )
    );
    await writeFile(
      path.join(out, '.vite/manifest.json'),
      JSON.stringify(
        Object.fromEntries([
          ...Object.keys(dimensions).map((file) => [
            `src/assets/generated/${file}`,
            { file: `assets/${file}` },
          ]),
          ...['A/A6.webp', 'C/C2.webp', 'D/D5.webp', 'F/F1.webp'].map(
            (file) => [
              `archive/chronicles/Story/Images/${file}`,
              { file: `assets/history/${file}` },
            ]
          ),
        ])
      )
    );
    const records = await readStructures();
    const first = new Map();
    for (let pass = 0; pass < 2; pass++) {
      execFileSync(process.execPath, [
        fileURLToPath(new URL('./generate-pages.mjs', import.meta.url)),
        out,
      ]);
      const about = await readFile(path.join(out, 'about/index.html'), 'utf8');
      assert.ok(about.includes('How it got here'));
      assert.ok(about.includes('assets/history/A/A6.webp'));
      assert.ok(about.includes('href="/structures/stickStructure"'));
      assert.ok(about.includes('Questions, corrections, or anything else?'));
      for (const record of records) {
        const html = await readFile(
          path.join(out, 'structures', record.url, 'index.html'),
          'utf8'
        );
        const body = html.match(
          /<!-- static-root:start -->([\s\S]*?)<!-- static-root:end -->/
        )?.[1];
        assert.ok(
          body?.includes(`<h1>${escapeHTML(record.names[0])}</h1>`),
          `${record.url}: wrong body on pass ${pass}`
        );
        for (const paragraph of record.extended_description
          .split(/\n\s*\n/)
          .filter((p) => p.trim())) {
          assert.ok(
            body.includes(escapeHTML(paragraph.trim())),
            `${record.url}: missing research`
          );
        }
        for (const link of resourceLinks(record.links))
          assert.ok(body.includes(`href="${escapeHTML(link.URL)}"`));
        assert.ok(!body.includes('href="https://google.com"'));
        assert.ok(
          !body.includes('<figcaption>'),
          `${record.url}: captions should stay hidden`
        );
        assert.ok(!body.includes('href="/structures/accessory"'));

        for (const [photo] of body.matchAll(/<img\b[^>]*>/g)) {
          assert.match(
            photo,
            /width="[1-9]\d*" height="[1-9]\d*"/,
            `${record.url}: photo needs intrinsic dimensions`
          );
          assert.match(
            photo,
            /src="\/assets\/structures\/mobile\//,
            `${record.url}: avoid a full-size preload before React mounts`
          );
          assert.match(
            photo,
            /srcset="[^"]+" sizes="[^"]+"/,
            `${record.url}: preserve responsive photo choices`
          );
        }
        assert.equal((html.match(/<title>/g) || []).length, 1);
        assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
        if (pass === 0) first.set(record.url, body);
        else
          assert.equal(
            body,
            first.get(record.url),
            `${record.url}: second pass changed body`
          );
      }
    }
  } finally {
    await rm(out, { recursive: true, force: true });
  }
});

test('resources omit placeholders and unsafe URLs while retaining real sources', () => {
  const valid = {
    URL: 'https://guides.lib.calpoly.edu/c.php?g=1365835&p=10429524',
  };
  assert.deepEqual(
    resourceLinks([
      { URL: 'https://google.com' },
      { URL: 'javascript:alert(1)' },
      { URL: '' },
      valid,
    ]),
    [valid]
  );
});
