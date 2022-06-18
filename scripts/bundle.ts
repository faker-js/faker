import { buildSync } from 'esbuild';
import { sync as globSync } from 'glob';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';

const target = ['ES2019', 'node14.6'];

const locales = readdirSync('./src/locales').filter(
  (file) => !file.includes('.')
);

console.log('Building dist for node (cjs)...');

// Generate entry-points for cjs compatibility
const localeDir = 'locale';

if (existsSync(localeDir)) {
  rmSync(localeDir, { recursive: true, force: true });
}
mkdirSync(localeDir);
for (const locale of locales) {
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
  //   ...locales.map((locale) => `./src/locale/${locale}.ts`),
  // ],
  outdir: './dist/cjs',
  bundle: false, // Creates 390MiB bundle ...
  sourcemap: false,
  minify: true,
  // splitting: true, // Doesn't work with cjs
  format: 'cjs',
  platform: 'node',
  target,
});

console.log('Building dist for node type=module (esm)...');

buildSync({
  entryPoints: [
    './src/index.ts',
    ...locales.map((locale) => `./src/locale/${locale}.ts`),
  ],
  outdir: './dist/esm',
  bundle: true,
  sourcemap: false,
  minify: true,
  splitting: true,
  format: 'esm',
  target,
  outExtension: { '.js': '.mjs' },
});
