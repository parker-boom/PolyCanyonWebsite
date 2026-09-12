import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 844 } });
    await page.addInitScript(() => {
      const decode = HTMLImageElement.prototype.decode;
      window.photoGate = false;
      window.releasePhotos = [];
      HTMLImageElement.prototype.decode = async function () {
        await decode.call(this);
        if (window.photoGate)
          await new Promise((resolve) => window.releasePhotos.push(resolve));
      };
    });
    await page.goto(`${base}/structures/entryArch`);
    const inline = page.locator('[data-gallery-frame] img[data-decoded-photo]');
    await inline.waitFor();
    const preview = await inline.getAttribute('src');
    await page.evaluate(() => {
      window.photoGate = true;
    });
    await page
      .getByRole('button', { name: 'Expand photograph', exact: true })
      .click();
    const viewer = page.getByRole('dialog', { name: 'Photograph viewer' });
    const photo = viewer.locator('img[data-decoded-photo]');
    await page.waitForFunction(() => window.releasePhotos.length > 0);
    assert.equal(
      await photo.getAttribute('src'),
      preview,
      'Fullscreen retains the decoded inline photo'
    );
    await page.evaluate(() => {
      window.photoGate = false;
      window.releasePhotos.splice(0).forEach((release) => release());
    });
    await page.waitForTimeout(100);
    const full = await photo.getAttribute('src');
    await page.evaluate(() => {
      window.photoGate = true;
    });
    await viewer
      .getByRole('button', { name: 'Next photograph', exact: true })
      .click();
    await page.waitForFunction(() => window.releasePhotos.length > 0);
    assert.equal(
      await photo.getAttribute('src'),
      full,
      'Next photograph waits for complete decoding'
    );
    await page.evaluate(() => {
      window.photoGate = false;
      window.releasePhotos.splice(0).forEach((release) => release());
    });
    await page.waitForFunction(
      (previous) =>
        document
          .querySelector('[role="dialog"] img[data-decoded-photo]')
          ?.getAttribute('src') !== previous,
      full
    );
    assert.ok(
      await photo.evaluate((img) => img.complete && img.naturalWidth > 0)
    );
    await page.screenshot({ path: `/private/tmp/canyon-gallery-${width}.png` });
    console.log(
      `${width}px: fullscreen preview retained; next photograph revealed only after decode`
    );
    await page.close();
  }
} finally {
  await browser.close();
}
