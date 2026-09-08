import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    return url.origin === new URL(base).origin ? route.continue() : route.abort();
  });
  // Model denied clipboard permission and no usable mail application.
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: async () => { throw new Error('Permission denied'); } },
    });
  });
  await page.goto(`${base}/structures/entryArch`);
  await page.getByRole('heading', { name: 'Entry Arch', exact: true }).waitFor();
  assert.ok(await page.locator('main img').first().evaluate(img => img.complete && img.naturalWidth > 0));
  await page.goto(`${base}/info`);
  await page.getByRole('button', { name: 'Show map', exact: true }).click();
  assert.ok((await page.locator('main').innerText()).includes('Start on campus near the H-4f parking lot.'));
  await page.getByRole('button', { name: 'Next direction', exact: true }).click();
  assert.ok((await page.locator('main').innerText()).includes('Follow Poly Canyon Road to the yellow gate.'));
  await page.goto(`${base}/support`);
  await page.getByRole('button', { name: 'contact us', exact: true }).click();
  await page.getByRole('button', { name: 'Copy email address', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Contact Parker' });
  await dialog.getByText('Copy this address:', { exact: false }).waitFor();
  const email = await dialog.getByRole('link', { name: 'Open email app' }).getAttribute('href');
  assert.ok((await dialog.innerText()).includes(email.slice('mailto:'.length)));
  await page.keyboard.press('Escape');
  await page.getByRole('link', { name: 'Privacy Policy', exact: true }).click();
  await page.getByRole('heading', { name: 'Privacy Policy', exact: true }).waitFor();
  assert.ok((await page.locator('main').innerText()).includes('Contact and deletion requests'));
  assert.deepEqual(errors, []);
  console.log('External services blocked: research, photos, walking steps, contact fallback and privacy remain usable.');
} finally {
  await browser.close();
}
