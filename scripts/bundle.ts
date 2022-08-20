import { buildSync } from 'esbuild';
import { sync as globSync } from 'glob';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';

/**
 * Pre-bundle locales
 */
async function preBundleLocales() {
  // Clean prev generated bundled locales
  globSync('src/locales/*.json').forEach((file) => rmSync(file));

  // Bundle locales
  const localeJsons: string[] = globSync('src/locales/**/*.json');
  const localeMap = {};

  for (const localeJson of localeJsons) {
    console.debug('Loading locale:', localeJson);

    const parts = localeJson.split('/');
    const locale = parts[2];

    // Ignore top level json files as these are the locales we want to generate here
    if (localeJson.endsWith(`locales/${locale}.json`)) {
      continue;
    }

    const content = await import(`../${localeJson}`);

    localeMap[locale] ||= {};

    if (parts[3] === 'index.json') {
      localeMap[locale] = { ...localeMap[locale], ...content.default };
    } else {
      let reference = localeMap[locale];
      for (let index = 4; ; index++) {
        const value = parts[index - 1];
        if (parts[index]?.endsWith('.json')) {
          const key = parts[index].replace('.json', '');
          reference[value] = {
            ...reference[value],
            [key]: {},
          };
          reference[value][key] = content.default;
          break;
        }
        // Load nested json files recursively
        else {
          reference = reference[value];
        }
      }
    }
  }

  for (const locale in localeMap) {
    const def = localeMap[locale];
    writeFileSync(`src/locales/${locale}.json`, JSON.stringify(def));
  }
}

function getLocaleNames(): string[] {
  return globSync('src/locales/*.json')
    .map((file) => file.split('/')[2])
    .filter(Boolean)
    .map((file) => file.replace('.json', ''))
    .filter(Boolean);
}

/**
 * `target` used for cjs and esm
 */
const TARGET = ['ES2019', 'node14.6'];

/**
 * Bundle CJS
 */
function bundleCjs() {
  console.log('Building dist for node (cjs)...');

  // Generate entry-points for cjs compatibility
  const localeDir = 'locale';

  if (existsSync(localeDir)) {
    rmSync(localeDir, { recursive: true, force: true });
  }
  mkdirSync(localeDir);
  for (const locale of getLocaleNames()) {
    writeFileSync(
      `${localeDir}/${locale}.js`,
      `module.exports = require('../dist/cjs/locale/${locale}');\n`,
      { encoding: 'utf8' }
    );
  }

  buildSync({
    entryPoints: globSync('./src/**/*.ts'),
    // We can use the following entry points when esbuild supports cjs+splitting
    // entryPoints: [
    //   './src/index.ts',
    //   ...Object.keys(locales).map((locale) => `./src/locale/${locale}.ts`),
    // ],
    outdir: './dist/cjs',
    bundle: false, // Creates 390MiB bundle ...
    sourcemap: false,
    minify: true,
    // splitting: true, // Doesn't work with cjs
    format: 'cjs',
    platform: 'node',
    target: TARGET,
  });
}

/**
 * Bundle ESM
 */
function bundleEsm() {
  console.log('Building dist for node type=module (esm)...');
  buildSync({
    entryPoints: globSync('./src/**/*.ts'),
    outdir: './dist/esm',
    bundle: false,
    sourcemap: false,
    minify: true,
    splitting: true,
    format: 'esm',
    target: TARGET,
    outExtension: { '.js': '.mjs' },
  });
}

function copyLocalesToDist() {
  mkdirSync('./dist/locales');
  getLocaleNames().forEach((locale) => {
    copyFileSync(`src/locales/${locale}.json`, `dist/locales/${locale}.json`);
  });
}

function relinkLocales() {
  const pattern = /"(\.\.?)\/locales\/(\w*)\.json"/gm;

  globSync('dist/**/*.?(m)js').forEach((file) => {
    console.log('Relinking locale files in', file);
    const content = readFileSync(file, { encoding: 'utf8' });
    const newContent = content.replace(
      pattern,
      (_, prefix: string, locale: string) =>
        `"${prefix === '.' ? '..' : '../..'}/locales/${locale}.json"`
    );
    writeFileSync(file, newContent, { encoding: 'utf8' });
  });
}

preBundleLocales()
  .then(bundleCjs)
  .then(bundleEsm)
  .then(copyLocalesToDist)
  .then(relinkLocales)
  .catch((err) => console.log('Bundling error:', err))
  .finally(() => console.log('Bundling finished'));
