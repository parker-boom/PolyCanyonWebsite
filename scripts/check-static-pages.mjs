import { resourceLinks } from '../src/structures/data/resourceLinks.js';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readStructures } from './structure-data.mjs';
import {
  policyIntroduction,
  policySections,
} from '../src/utils/privacyContent.js';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
const normalize = (value) =>
  String(value || '')
    .replace(/\s+/g, ' ')
    .trim();
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const records = await readStructures();
  const page = await browser.newPage({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  for (const record of records) {
    await page.goto(`${base}/structures/${record.url}`);
    assert.equal(await page.getByRole('heading', { level: 1 }).count(), 1);
    const text = normalize(await page.locator('main').innerText());
    for (const value of [
      record.description,
      record.extended_description,
      ...record.names,
    ]) {
      if (value)
        assert.ok(
          text.includes(normalize(value)),
          `${record.url}: missing source text (${normalize(value).slice(0, 90)}; rendered ${text.slice(0, 100)})`
        );
    }
    for (const resource of resourceLinks(record.links)) {
      if (!/^https?:\/\//.test(resource.URL || '')) continue;
      assert.ok(
        await page
          .locator('main a')
          .evaluateAll(
            (links, url) => links.some((a) => a.getAttribute('href') === url),
            resource.URL
          ),
        `${record.url}: missing resource ${resource.URL}`
      );
    }
    assert.equal(
      await page.locator('main img').count(),
      record.images?.length || 0
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth
      ),
      false
    );
  }
  await page.goto(`${base}/structures`);
  await page.getByRole('link', { name: '1. Entry Arch', exact: true }).click();
  await page
    .getByRole('heading', { name: 'Entry Arch', exact: true })
    .waitFor();
  await page.goto(`${base}/privacy`);
  const policy = normalize(await page.locator('main').innerText());
  assert.ok(policy.includes(policyIntroduction));
  for (const section of policySections)
    for (const parts of section.paragraphs) {
      assert.ok(
        policy.includes(
          normalize(
            parts
              .map((part) => (typeof part === 'string' ? part : part.text))
              .join('')
          )
        )
      );
    }
  await page.goto(`${base}/support`);
  assert.ok(
    (
      await page
        .getByRole('link', { name: 'Contact Parker' })
        .getAttribute('href')
    ).startsWith('mailto:')
  );
  await page.close();
  for (const width of [390, 1440]) {
    const live = await browser.newPage({ viewport: { width, height: 844 } });
    const errors = [];
    live.on('pageerror', (error) => errors.push(error.message));
    for (const route of [
      '/structures/entryArch',
      '/structures/accessory',
      '/privacy',
      '/info',
      '/support',
    ]) {
      await live.goto(base + route);
      await live.waitForFunction(
        () =>
          !document.querySelector('[data-static-page]') &&
          !document.querySelector('[role="status"]')
      );
      assert.equal(
        await live.locator('main').count(),
        1,
        `${route}: duplicate page body`
      );
      assert.equal(
        await live.evaluate(
          () => document.documentElement.scrollWidth > innerWidth
        ),
        false,
        `${width}: ${route} overflow`
      );
    }
    await live.goto(`${base}/info`);
    await live.waitForFunction(
      () =>
        !document.querySelector('[data-static-page]') &&
        document.querySelector('main img')
    );
    const before = await live
      .locator('main img')
      .evaluateAll((images) => images.map((img) => img.getAttribute('src')));
    await live.waitForTimeout(3500);
    assert.deepEqual(
      await live
        .locator('main img')
        .evaluateAll((images) => images.map((img) => img.getAttribute('src'))),
      before,
      'Info photos must stay fixed'
    );
    await live.goto(`${base}/admin/`);
    await live
      .getByRole('heading', { name: 'Page not found', exact: true })
      .waitFor();
    assert.deepEqual(errors, []);
    await live.close();
  }
  console.log(
    `Full text/resources/photos verified for ${records.length} JavaScript-disabled structure pages; policy parity, interactive mounting, fixed photos and retired editor passed.`
  );
} finally {
  await browser.close();
}
