import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  // A missing old chunk should recover without asking the visitor to retry.
  if (!base.includes(':5173')) {
    const page = await browser.newPage();
    let requests = 0;
    await page.route(/\/assets\/AboutPage-[^/]+\.js$/, (route) => {
      requests++;
      return requests === 1
        ? route.fulfill({ status: 404, body: 'Not found' })
        : route.continue();
    });
    await page.goto(`${base}/about?from=old-tab#project`);
    await page
      .getByRole('heading', { name: 'About Poly Canyon', exact: true })
      .waitFor();
    assert.equal(requests, 2);
    assert.equal(new URL(page.url()).search, '?from=old-tab');
    assert.equal(new URL(page.url()).hash, '#project');
    console.log('Missing page chunk: automatic recovery preserves URL');
    await page.close();
  }
  for (const recovery of ['reload', 'archive']) {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
    });
    const pattern =
      /\/(?:assets\/AboutPage-[^/]+\.js|src\/about\/AboutPage\.jsx)(?:\?.*)?$/;
    let failedRequests = 0;
    await page.route(pattern, (route) => {
      failedRequests++;
      return route.abort('failed');
    });
    await page.goto(`${base}/about`);
    await page
      .getByRole('heading', { name: 'This page couldn’t load.' })
      .waitFor();
    await page.waitForTimeout(300);
    assert.ok(
      failedRequests <= 2,
      'Persistent failures must not cause a reload loop'
    );
    await page.unroute(pattern);
    if (recovery === 'reload') {
      await page
        .getByRole('button', { name: 'Reload page', exact: true })
        .click();
      await page
        .getByRole('heading', { name: 'About Poly Canyon', exact: true })
        .waitFor();
    } else {
      await page
        .getByRole('link', { name: 'Browse the structures', exact: true })
        .click();
      await page.getByRole('searchbox').waitFor();
    }
    console.log(`Failed page download: ${recovery} recovery passed`);
    await page.close();
  }
  for (const width of [320, 768, 1024, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce',
    });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`${base}/about/`);
    await page
      .getByRole('heading', { name: 'About Poly Canyon', exact: true })
      .waitFor();
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').innerText(), 'Skip to content');
    await page.keyboard.press('Enter');
    assert.equal(
      await page.locator(':focus').getAttribute('id'),
      'main-content'
    );
    const navigation = page.getByRole('navigation', {
      name: 'Main navigation',
    });
    assert.deepEqual(await navigation.getByRole('link').allTextContents(), [
      'Home',
      'Structures',
      'About',
      'App',
    ]);
    assert.equal(
      await navigation
        .getByRole('link', { name: 'About', exact: true })
        .getAttribute('aria-current'),
      'page'
    );
    for (const name of ['Home', 'Structures', 'About', 'App']) {
      const item = navigation.getByRole('link', { name, exact: true });
      assert.ok(await item.isVisible(), `${width}px: ${name} is visible`);
      await item.focus();
      assert.equal(await page.locator(':focus').textContent(), name);
    }
    await navigation
      .getByRole('link', { name: 'Structures', exact: true })
      .click();
    await page.getByRole('searchbox').waitFor();
    for (const route of [
      '/about',
      '/about#visit',
      '/app',
      '/structures',
      '/structures/accessory',
      '/not-a-page',
    ]) {
      await page.goto(`${base}${route}`);
      await page.waitForFunction(
        () =>
          ![...document.querySelectorAll('[role="status"]')].some(
            (el) => el.textContent.trim() === 'Loading…'
          )
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth
        ),
        false,
        `${width}px overflow on ${route}`
      );
    }
    await page
      .getByRole('heading', { name: 'Page not found', exact: true })
      .waitFor();
    assert.equal(
      await page.locator('meta[name="robots"]').getAttribute('content'),
      'noindex,follow'
    );
    await page
      .getByRole('link', { name: 'Browse the structures', exact: true })
      .click();
    await page.getByRole('searchbox').waitFor();
    assert.deepEqual(errors, []);
    console.log(
      `${width}px: keyboard, navigation, route recovery and responsive layout passed`
    );
    await page.close();
  }
} finally {
  await browser.close();
}
