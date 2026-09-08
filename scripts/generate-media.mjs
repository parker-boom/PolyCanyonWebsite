/**
 * Generate the committed display assets. Run `npm run media:generate` after
 * changing source photographs or archived app recordings. Originals are kept.
 */
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { mkdir, readdir, stat, writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const sourceRoot = path.join(root, 'src/structures/images');
const outputRoot = path.join(root, 'src/assets/generated');
const jobs = [];
for (const group of ['main', 'close', 'other', 'accessory']) {
  for (const filename of (await readdir(path.join(sourceRoot, group)))
    .filter((name) => name.endsWith('.webp'))
    .sort()) {
    const source = path.join(sourceRoot, group, filename);
    jobs.push({
      source,
      target: path.join(outputRoot, 'structures', group, filename),
      width: group === 'main' ? 1080 : 1440,
      quality: 78,
    });
    jobs.push({
      source,
      target: path.join(outputRoot, 'structures/mobile', group, filename),
      width: 800,
      quality: 76,
    });
    if (group === 'main')
      jobs.push({
        source,
        target: path.join(outputRoot, 'structures/thumbnails', filename),
        width: 480,
        quality: 74,
      });
    if (group === 'main')
      jobs.push({
        source,
        target: path.join(outputRoot, 'structures/small-thumbnails', filename),
        width: 320,
        quality: 74,
      });
  }
}
for (const number of [4, 7, 12, 14, 19, 24, 27]) {
  jobs.push({
    source: path.join(sourceRoot, 'close', `C-${number}.webp`),
    target: path.join(outputRoot, 'structures/thumbnails', `C-${number}.webp`),
    width: 480,
  });
}
jobs.push({
  source: path.join(root, 'src/assets/structures/a1.webp'),
  target: path.join(outputRoot, 'info/a1.webp'),
  width: 600,
});
jobs.push({
  source: path.join(root, 'src/assets/appPreview.webp'),
  target: path.join(outputRoot, 'app/overview.webp'),
  width: 960,
});
for (const [platform, filename] of [
  ['ios', 'appleGIF.gif'],
  ['android', 'androidGIF.gif'],
]) {
  jobs.push({
    source: path.join(root, 'archive/media', filename),
    target: path.join(outputRoot, 'app', `${platform}.webp`),
    width: 540,
  });
}
// Approved native app captures; keep originals and deliver uncropped variants.
for (const name of ['structures', 'entry-arch', 'map']) {
  for (const width of [360, 720]) {
    jobs.push({
      source: path.join(root, 'src/assets/app-captures', `${name}.png`),
      target: path.join(outputRoot, 'app/current', `${name}-${width}.webp`),
      width,
      quality: 84,
    });
  }
}
// Matching 9:41 captures from the reviewed 6.0 app. Earlier captures stay intact.
for (const name of ['structures', 'shell-house', 'map']) {
  for (const width of [360, 720]) {
    jobs.push({
      source: path.join(root, 'src/assets/app-captures/release-6', `${name}.jpg`),
      target: path.join(outputRoot, 'app/release-6', `${name}-${width}.webp`),
      width,
      quality: 84,
    });
  }
}
// Hash sources, outputs and the recipe so a normal check never re-encodes photos.
async function inventory() {
  const files = new Set(jobs.flatMap(({ source, target }) => [source, target]));
  for (const file of ['dimensions.json', 'responsiveImages.js'])
    files.add(path.join(outputRoot, file));
  files.add(fileURLToPath(import.meta.url));
  return Object.fromEntries(await Promise.all([...files].sort().map(async file => [
    path.relative(root, file).split(path.sep).join('/'),
    createHash('sha256').update(await readFile(file)).digest('hex'),
  ])));
}
const integrityFile = path.join(outputRoot, 'integrity.json');
if (process.argv.includes('--check')) {
  try {
    const expected = JSON.parse(await readFile(integrityFile, 'utf8'));
    assert.deepEqual(await inventory(), expected);
    console.log(`Verified ${jobs.length} generated images, originals and responsive manifests.`);
  } catch (error) {
    console.error('Missing or stale generated media. Run npm run media:generate and include the generated files.');
    console.error(error.message.slice(0, 1000));
    process.exitCode = 1;
  }
} else {
// Limit parallelism so regenerating the archive doesn't exhaust memory.
const queue = jobs.values();
const dimensions = {};
async function worker() {
  for (const { source, target, width, quality = 80 } of queue) {
    await mkdir(path.dirname(target), { recursive: true });
    const info = await sharp(source, { animated: false })
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(target);
    dimensions[path.relative(outputRoot, target).split(path.sep).join('/')] =
      info.width;
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
await writeFile(
  path.join(outputRoot, 'dimensions.json'),
  JSON.stringify(
    Object.fromEntries(Object.entries(dimensions).sort()),
    null,
    2
  ) + '\n'
);
// Emit asset references once instead of shipping glob paths and a width JSON
// table to every browser. Vite still fingerprints each imported photograph.
const pairs = Object.entries(dimensions)
  .flatMap(([file, width]) => {
    let smallerFile;
    if (/^structures\/(main|close|other|accessory)\//.test(file)) {
      smallerFile = file.replace('structures/', 'structures/mobile/');
    } else if (/^structures\/thumbnails\/M-/.test(file)) {
      smallerFile = file.replace('/thumbnails/', '/small-thumbnails/');
    }
    const smallerWidth = dimensions[smallerFile];
    return smallerWidth && smallerWidth < width
      ? [[file, smallerFile, width, smallerWidth]]
      : [];
  })
  .sort(([a], [b]) => a.localeCompare(b));
const imports = pairs.flatMap(([full, small], index) => [
  `import full${index} from './${full}';`,
  `import small${index} from './${small}';`,
]);
const rows = pairs.map(
  ([, , width, smallerWidth], index) =>
    `  [full${index}, small${index}, ${width}, ${smallerWidth}],`
);
await writeFile(
  path.join(outputRoot, 'responsiveImages.js'),
  '// Generated by scripts/generate-media.mjs. Do not edit by hand.\n' +
    imports.join('\n') +
    '\n\nexport default [\n' +
    rows.join('\n') +
    '\n];\n'
);

async function sizeOf(directory, prefix = '') {
  const files = (await readdir(directory)).filter(
    (name) => name.endsWith('.webp') && name.startsWith(prefix)
  );
  return (
    await Promise.all(
      files.map(async (name) => (await stat(path.join(directory, name))).size)
    )
  ).reduce((a, b) => a + b, 0);
}
const original = await sizeOf(path.join(sourceRoot, 'main'));
for (const variant of ['main', 'thumbnails']) {
  const bytes = await sizeOf(
    path.join(outputRoot, 'structures', variant),
    'M-'
  );
  console.log(
    `Main ${variant}: ${original.toLocaleString()} → ${bytes.toLocaleString()} bytes (${(100 * (1 - bytes / original)).toFixed(1)}% smaller)`
  );
}
console.log(
  `App previews: ${(await sizeOf(path.join(outputRoot, 'app'))).toLocaleString()} bytes`
);

await writeFile(integrityFile, JSON.stringify(await inventory(), null, 2) + '\n');
}
