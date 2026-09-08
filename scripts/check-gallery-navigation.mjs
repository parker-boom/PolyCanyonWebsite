import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

// Run against preview, or dev with EMPTY_PHOTO_FIXTURE=1 to exercise missing data.
// PLAYWRIGHT_MODULE may point to an existing external Playwright installation.
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const width of [320, 390, 1440]) {
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
    const open = 'Open photograph full screen';
    await page.getByRole('button', { name: open, exact: true }).click();
    const viewer = page.getByRole('dialog', { name: 'Photograph viewer' });
    await viewer.waitFor();
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth
      ),
      false
    );
    await viewer.getByText('7 / 7', { exact: true }).waitFor();
    await viewer.getByRole('button', { name: 'Zoom in', exact: true }).click();
    await viewer
      .getByRole('button', { name: 'Reset zoom', exact: true })
      .waitFor();
    await page.keyboard.press('ArrowRight');
    await viewer.getByText('1 / 7', { exact: true }).waitFor();
    await viewer
      .getByRole('button', { name: 'Zoom in', exact: true })
      .waitFor();
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: open, exact: true }).waitFor();
    assert.equal(await page.locator(':focus').getAttribute('aria-label'), open);
    await page.getByRole('button', { name: open, exact: true }).click();
    await page.keyboard.press('ArrowLeft');
    await viewer.getByText('7 / 7', { exact: true }).waitFor();
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
  // Exercise the actual pointer handlers with emulated touch input.
  {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
    });
    await page.goto(`${base}/structures/entryArch?fullscreen=true`);
    const viewer = page.getByRole('dialog', { name: 'Photograph viewer' });
    await viewer.waitFor();
    const stage = await page.locator('.photo-viewer-stage').boundingBox();
    const client = await page.context().newCDPSession(page);
    const y = Math.round(stage.y + stage.height / 2);
    const touch = (type, points) =>
      client.send('Input.dispatchTouchEvent', {
        type,
        touchPoints: points.map(([id, x]) => ({ id, x, y })),
      });
    await touch('touchStart', [[0, 280]]);
    await touch('touchMove', [[0, 100]]);
    await touch('touchEnd', []);
    await viewer.getByText('2 / 7', { exact: true }).waitFor();
    await touch('touchStart', [
      [0, 150],
      [1, 240],
    ]);
    await touch('touchMove', [
      [0, 100],
      [1, 290],
    ]);
    await touch('touchEnd', []);
    await viewer
      .getByRole('button', { name: 'Reset zoom', exact: true })
      .waitFor();
    await page.waitForFunction(
      () =>
        Number(
          document
            .querySelector('.photo-viewer-stage img')
            .style.transform.match(/scale\(([^)]+)\)/)[1]
        ) > 1.5
    );
    await viewer
      .getByRole('button', { name: 'Reset zoom', exact: true })
      .click();
    await viewer
      .getByRole('button', { name: 'Zoom in', exact: true })
      .waitFor();
    await page.keyboard.press('Escape');
    await page.close();
    console.log(
      'Emulated touch: swipe navigation, pinch zoom and reset passed'
    );
  }
  if (process.env.EMPTY_PHOTO_FIXTURE === '1') {
    for (const width of [320, 390, 1440]) {
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
