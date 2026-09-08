import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

// Run against preview, or dev with EMPTY_PHOTO_FIXTURE=1 to exercise missing data.
// PLAYWRIGHT_MODULE may point to an existing external Playwright installation.
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 844 } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`${base}/structures/techiteBridge`);
    await page
      .getByRole('button', { name: 'Previous structure', exact: true })
      .click();
    await page.waitForURL('**/structures/entryArch');
    await page
      .getByRole('button', { name: 'Previous photograph', exact: true })
      .click();
    const open =
      width < 769 ? 'Open photograph full screen' : 'Toggle fullscreen mode';
    await page.getByRole('button', { name: open, exact: true }).click();
    if (width < 769)
      await page.getByRole('dialog', { name: 'Photograph viewer' }).waitFor();
    else await page.getByText('7 / 7', { exact: true }).waitFor();
    await page.goBack();
    await page.waitForURL('**/structures/techiteBridge');
    await page
      .getByRole('button', { name: 'Previous photograph', exact: true })
      .waitFor();
    await page.waitForTimeout(100);
    assert.equal(
      await page.getByRole('dialog', { name: 'Photograph viewer' }).count(),
      0
    );
    assert.ok(
      (await page
        .locator('img[alt="Main image of the Techite Bridge."]')
        .count()) > 0
    );
    assert.deepEqual(errors, []);
    console.log(
      `${width}px: fullscreen last photograph → browser Back to shorter gallery passed`
    );
    await page.close();
  }
  if (process.env.EMPTY_PHOTO_FIXTURE === '1') {
    for (const width of [390, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 844 } });
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      let fixtureApplied = false;
      await page.route(
        '**/src/structures/data/structuresData.js*',
        async (route) => {
          const response = await route.fetch();
          const body = await response.text();
          fixtureApplied = true;
          await route.fulfill({
            response,
            body: `${body}\nstructuresInfo.forEach((record) => { record.images = null; });`,
          });
        }
      );
      await page.goto(
        `${base}/structures/entryArch?fullscreen=true&imageIndex=6`
      );
      await page
        .getByText('No photographs are available for this structure.', {
          exact: true,
        })
        .waitFor();
      assert.ok(
        fixtureApplied,
        'Empty-photo fixture requires the Vite dev server'
      );
      assert.equal(await page.getByRole('dialog').count(), 0);
      await page
        .getByRole('button', { name: 'Next structure', exact: true })
        .click();
      await page.waitForURL('**/structures/techiteBridge');
      await page
        .getByText('No photographs are available for this structure.', {
          exact: true,
        })
        .waitFor();
      assert.deepEqual(errors, []);
      console.log(
        `${width}px: missing-photo direct fullscreen link and structure navigation passed`
      );
      await page.close();
    }
  }
} finally {
  await browser.close();
}
