# Browser checks

Install the project dependencies and Chrome, then build and start a preview:

```sh
npm ci
npx playwright install chrome
npm run build
npm run preview -- --port 4173
```

In another terminal, run:

```sh
npm run check:browser
```

The scripts use the declared Playwright development dependency and Chrome. They cover archive search and return position, fullscreen navigation and decoded-image handoff, page-load recovery, mobile overflow, static research and privacy text, map links, and contact behavior when external services or clipboard access fail.

Set `BASE_URL` to check another preview address. These checks use local failure simulations; do not interpret their intercepted requests as production outages. They complement `npm run check` and a visual review, and do not publish or run on a schedule.

The gallery loading check holds image decoding on phone and desktop. It verifies that opening fullscreen retains the inline preview and moving to another photograph keeps the previous image visible until the replacement is ready.
