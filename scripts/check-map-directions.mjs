import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    let embeds = 0;
    await page.route('https://maps.google.com/**', (route) => {
      embeds++;
      return route.fulfill({
        contentType: 'text/html',
        body: '<p>Destination map fixture</p>',
      });
    });
    await page.goto(`${base}/info`);
    await page.waitForFunction(
      () =>
        !document.querySelector('[data-static-page]') &&
        !document.querySelector('[role="status"]')
    );
    const note = page.getByText(
      'This map marks the destination. Open Google Maps for the walking route from campus.',
      { exact: true }
    );
    await note.waitFor();
    assert.equal(embeds, 0, 'Google must not load before Show map');
    assert.ok(
      !(await page.locator('main').innerText()).includes(
        'map below shows the route'
      )
    );
    const directions = page.getByRole('link', {
      name: 'Walking directions in Google Maps',
      exact: true,
    });
    const before = await directions.getAttribute('href');
    const url = new URL(before);
    assert.equal(url.origin + url.pathname, 'https://www.google.com/maps/dir/');
    assert.equal(url.searchParams.get('api'), '1');
    assert.equal(url.searchParams.get('origin'), '35.30302,-120.65913');
    assert.equal(url.searchParams.get('destination'), '35.31344,-120.65192');
    assert.equal(url.searchParams.get('travelmode'), 'walking');
    assert.equal(await directions.getAttribute('target'), '_blank');
    await page.getByRole('button', { name: 'Show map', exact: true }).click();
    const frame = page.locator(
      'iframe[title="Find the canyon — destination map"]'
    );
    await frame.scrollIntoViewIfNeeded();
    await page
      .frameLocator('iframe')
      .getByText('Destination map fixture')
      .waitFor();
    assert.equal(embeds, 1);
    assert.equal(
      new URL(await frame.getAttribute('src')).searchParams.get('q'),
      '35.31344,-120.65192'
    );
    assert.equal(await note.isVisible(), true);
    assert.equal(await directions.getAttribute('href'), before);
    await page
      .getByRole('button', { name: 'Next direction', exact: true })
      .click();
    assert.ok(
      (await page.locator('main').innerText()).includes(
        'Follow Poly Canyon Road to the yellow gate.'
      )
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
        !document.querySelector('[role="status"]')
    );
    await page
      .getByRole('link', { name: 'Open in Google Maps', exact: true })
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
      `${width}px: destination labeling, opt-in map, supported walking URL, written steps and structure map passed`
    );
  }
} finally {
  await browser.close();
}
