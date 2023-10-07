import { buildSync } from 'esbuild';
import { globSync } from 'glob';
import { allLocales } from '../src';

console.log('Building dist for node (cjs)...');

const target = ['ES2019', 'node14.17'];

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
  target,
});

console.log('Building dist for node type=module (esm)...');
buildSync({
  entryPoints: [
    './src/index.ts',
    ...Object.keys(allLocales).map((locale) => `./src/locale/${locale}.ts`),
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
