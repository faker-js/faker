// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
// Do not use `node:` in this file

const { buildSync } = require('esbuild');
const {
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync,
  readdirSync,
} = require('fs');
const { sync: globSync } = require('glob');

const locales = readdirSync('./src/locales').filter(
  (file) => !file.includes('.')
);

console.log(locales);

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
  target: ['es2020', 'node14.13.0'],
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
  target: ['es2020', 'node14.13.0'],
  outExtension: { '.js': '.mjs' },
});
