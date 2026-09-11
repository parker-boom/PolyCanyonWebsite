import assert from 'node:assert/strict';
import { chromium } from 'playwright';
const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const reducedMotion of ['no-preference', 'reduce']) {
    const page = await browser.newPage({
      viewport: { width: 948, height: 746 },
      reducedMotion,
    });
    page.setDefaultTimeout(15000);
    await page.addInitScript(() => {
      Math.random = () => 0;
    });
    let releaseImage;
    const imageGate = new Promise((resolve) => {
      releaseImage = resolve;
    });
    await page.route(/M-10-.*\.webp$/, async (route) => {
      await imageGate;
      await route.continue();
    });
    await page.route(/M-31-.*\.webp$/, (route) => route.abort());
    await page.goto(base);
    const active = page.locator('.hero img[data-active="true"]');
    await active.evaluate((image) => image.decode());
    const initialSource = await active.getAttribute('src');
    await page
      .getByRole('button', { name: 'Feature Underground House', exact: true })
      .click();
    await page.waitForTimeout(350);
    assert.equal(
      await active.getAttribute('src'),
      initialSource,
      'Keep the decoded photograph while waiting'
    );
    assert.equal(await page.locator('.caption h2').textContent(), 'Tensile');
    assert.equal(
      await page.locator('.choices').getAttribute('aria-busy'),
      'true'
    );
    releaseImage();
    await page.waitForFunction(
      () =>
        document.querySelector('.caption h2')?.textContent ===
        'Underground House'
    );
    assert.equal(
      await active.evaluate(
        (image) => image.complete && image.naturalWidth > 0
      ),
      true
    );
    assert.match(
      await page.locator('.hero').getAttribute('href'),
      /undergroundHouse$/
    );
    assert.equal(
      await page.locator('.hero img').count(),
      4,
      'Image nodes persist through a swap'
    );
    await page
      .getByRole('button', { name: 'Feature Moment Monument', exact: true })
      .click();
    await page.locator('.image-status').waitFor();
    assert.equal(
      await page.locator('.caption h2').textContent(),
      'Underground House',
      'Failure preserves the current photograph'
    );
    assert.equal(
      await page.locator('.choices').getAttribute('aria-busy'),
      'false'
    );
    if (reducedMotion === 'reduce') {
      assert.equal(
        await active.evaluate((image) => getComputedStyle(image).animationName),
        'none'
      );
    }
    let releasePage;
    const pageGate = new Promise((resolve) => {
      releasePage = resolve;
    });
    await page.route(/AboutPage.*\.js$/, async (route) => {
      await pageGate;
      await route.continue();
    });
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'About', exact: true })
      .click();
    await page.waitForTimeout(350);
    assert.equal(
      await page.locator('.hero').isVisible(),
      true,
      'Keep the current page during a slow route download'
    );
    assert.equal(
      await page.getByText('Loading…', { exact: true }).isVisible(),
      false
    );
    releasePage();
    await page
      .getByRole('heading', { name: 'What is Poly Canyon?', exact: true })
      .waitFor();
    await page.close();
    console.log(
      `${reducedMotion}: delayed images, failed images, coherent captions, and slow navigation preserve visible content`
    );
  }
} finally {
  await browser.close();
}
