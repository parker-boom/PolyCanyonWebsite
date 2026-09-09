import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    page.setDefaultTimeout(15000);
    let embeds = 0;
    await page.route('https://maps.google.com/**', (route) => {
      embeds++;
      return route.fulfill({
        contentType: 'text/html',
        body: '<p>Destination map fixture</p>',
      });
    });
    await page.goto(`${base}/about#visit`);
    await page.waitForFunction(
      () =>
        !document.querySelector('[data-static-page]') &&
        ![...document.querySelectorAll('[role="status"]')].some(
          (el) => el.textContent.trim() === 'Loading…'
        )
    );
    assert.equal(embeds, 0, 'Maps must not load automatically');
    assert.ok(
      !(await page.locator('main').innerText()).includes(
        'map below shows the route'
      )
    );
    const directions = page.getByRole('link', {
      name: /^Walking directions$/,
    });
    const before = await directions.getAttribute('href');
    const url = new URL(before);
    assert.equal(url.origin + url.pathname, 'https://www.google.com/maps/dir/');
    assert.equal(url.searchParams.get('api'), '1');
    assert.equal(url.searchParams.get('origin'), '35.30302,-120.65913');
    assert.equal(url.searchParams.get('destination'), '35.31344,-120.65192');
    assert.equal(url.searchParams.get('travelmode'), 'walking');
    assert.equal(await directions.getAttribute('target'), '_blank');
    assert.equal(await page.locator('iframe').count(), 0);
    assert.equal(embeds, 0, 'Maps are external links only');
    assert.ok(
      (await page.locator('#visit').innerText()).includes('yellow gate')
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth
      ),
      false
    );
    await page.goto(`${base}/structures/entryArch`);
    await page.waitForFunction(
      () =>
        !document.querySelector('[data-static-page]') &&
        ![...document.querySelectorAll('[role="status"]')].some(
          (el) => el.textContent.trim() === 'Loading…'
        )
    );
    await page
      .getByRole('link', { name: 'View on map', exact: true })
      .waitFor();
    assert.equal(
      await page
        .getByText('This map marks the destination.', { exact: false })
        .count(),
      0,
      'Regular structure maps retain their location-only UI'
    );
    await page.close();
    console.log(
      `${width}px: external map links, walking URL and written directions passed`
    );
  }
} finally {
  await browser.close();
}
