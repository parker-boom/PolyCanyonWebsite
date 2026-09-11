import assert from 'node:assert/strict';
import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
try {
  const page = await browser.newPage({ viewport: { width: 948, height: 746 } });
  page.setDefaultTimeout(15000);
  let release;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  await page.route('**/media/app-v6/*.mp4', async (route) => {
    await gate;
    await route.continue();
  });
  await page.goto(`${base}/app`);
  await page
    .locator('.screen img')
    .first()
    .evaluate((image) => image.decode());
  assert.equal(
    await page
      .locator('video')
      .first()
      .evaluate((video) => getComputedStyle(video).opacity),
    '0'
  );
  assert.match(
    await page
      .locator('.screen')
      .first()
      .evaluate((screen) => getComputedStyle(screen).backgroundImage),
    /data:image\/webp;base64/
  );
  await page
    .locator('.device')
    .screenshot({ path: 'output/playwright/app-waiting-poster.png' });
  release();
  await page.waitForFunction(
    () => document.querySelector('video')?.dataset.ready === 'true'
  );
  await page
    .getByRole('button', { name: 'Learn about the structures', exact: true })
    .click();
  await page.waitForFunction(
    () => document.querySelectorAll('video')[1]?.dataset.ready === 'true'
  );
  await page.evaluate(() => {
    window.retainedPreview = document.querySelectorAll('video')[1];
  });
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'About', exact: true })
    .click();
  await page
    .getByRole('heading', { name: 'What is Poly Canyon?', exact: true })
    .waitFor();
  assert.equal(
    await page
      .locator('video')
      .evaluateAll((videos) => videos.every((video) => video.paused)),
    true
  );
  assert.equal(await page.locator('.device').isVisible(), false);
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'App', exact: true })
    .click();
  await page.locator('.device').waitFor();
  assert.equal(
    await page.evaluate(
      () => window.retainedPreview === document.querySelectorAll('video')[1]
    ),
    true
  );
  assert.equal(
    await page
      .getByRole('button', { name: 'Learn about the structures', exact: true })
      .getAttribute('aria-pressed'),
    'true'
  );
  await page.waitForFunction(
    () => !document.querySelectorAll('video')[1].paused
  );
  assert.equal(
    await page
      .locator('.strip')
      .evaluate((strip) => Math.round(strip.scrollLeft / strip.clientWidth)),
    1
  );
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth
    ),
    false
  );
  await page.close();
  const still = await browser.newPage({ reducedMotion: 'reduce' });
  await still.goto(`${base}/app`);
  await still
    .locator('.screen img')
    .first()
    .evaluate((image) => image.decode());
  assert.equal(
    await still
      .locator('video')
      .evaluateAll((videos) => videos.every((video) => video.paused)),
    true
  );
  assert.equal(
    await still
      .locator('video')
      .first()
      .evaluate((video) => getComputedStyle(video).opacity),
    '0'
  );
  await still.goto(`${base}/app/`);
  await still.locator('.device').waitFor();
  assert.equal(await still.locator('.device').isVisible(), true);
  await still.close();
  console.log(
    'App preview: poster survives blocked video, first-frame reveal, retained player/selection on return, hidden playback paused, mobile and reduced motion passed.'
  );
} finally {
  await browser.close();
}
