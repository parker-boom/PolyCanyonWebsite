import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async () => {
  const b = await chromium.launch({ channel: 'chrome', headless: true });
  for (let iteration = 0; iteration < 3; iteration++) {
    const p = await b.newPage({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const errors = [];
    p.on('pageerror', (e) => errors.push(e.message));
    await p.goto(
      `${process.env.BASE_URL || 'http://127.0.0.1:4173'}/structures/`
    );
    const navigation = p.getByRole('navigation', { name: 'Main navigation' });
    await navigation
      .getByRole('link', { name: 'Structures', exact: true })
      .waitFor();
    const search = p.getByRole('searchbox');
    await search.focus();
    await search.pressSequentially('bridge');
    assert.equal(await search.inputValue(), 'bridge');
    assert.equal(await p.locator(':focus').getAttribute('type'), 'search');
    await search.fill('');
    await p.getByRole('button', { name: 'Sort by year', exact: true }).click();
    await p.getByRole('button', { name: /^Ghost Structures/ }).click();
    await p.evaluate(() => scrollTo(0, 600));
    await p.waitForTimeout(200);
    const url = p.url(),
      y = await p.evaluate(() => scrollY);
    const cards = p.locator('main a[href^="/structures/"]');
    const visible = await cards.evaluateAll((es) =>
      es.findIndex((e) => {
        const r = e.getBoundingClientRect();
        return r.top > 100 && r.bottom < innerHeight;
      })
    );
    assert.ok(visible >= 0);
    await cards.nth(visible).click();
    await p
      .getByRole('button', { name: 'Back to structures', exact: true })
      .waitFor();
    await p.goBack();
    await p.getByRole('searchbox').waitFor();
    await p.waitForTimeout(300);
    assert.equal(p.url(), url);
    assert.ok(Math.abs((await p.evaluate(() => scrollY)) - y) < 3);
    await cards.nth(visible).click();
    await p
      .getByRole('button', { name: 'Next structure', exact: true })
      .click();
    await p
      .getByRole('button', { name: 'Back to structures', exact: true })
      .click();
    await p.getByRole('searchbox').waitFor();
    await p.waitForTimeout(300);
    assert.equal(p.url(), url);
    assert.ok(Math.abs((await p.evaluate(() => scrollY)) - y) < 3);
    await navigation.getByRole('link', { name: 'About', exact: true }).tap();
    await p.waitForURL('**/about');
    await navigation
      .getByRole('link', { name: 'Structures', exact: true })
      .tap();
    await p.getByRole('searchbox').waitFor();
    assert.deepEqual(errors, []);
    console.log({
      trailingSlashNavigation: true,
      backAndCloseRestore: true,
      scroll: y,
      touchNavigation: true,
      errors,
    });
    await p.close();
  }
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
