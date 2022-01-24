import { buildSync } from 'esbuild';
import { sync as globSync } from 'glob';
import locales from '../src/locales';

console.log('Building dist for node (cjs)...');
buildSync({
  entryPoints: globSync('./src/**/*.ts'),
  // We can use the following entry points when esbuild supports cjs+splitting
  // entryPoints: [
  //   './src/index.ts',
  //   ...Object.keys(locales).map((locale) => `./src/locale/${locale}.ts`),
  //   './src/iban.ts',
  //   './src/mersenne.ts',
  // ],
  outdir: './dist/cjs',
  bundle: false, // Creates 390MiB bundle ...
  sourcemap: true,
  minify: true,
  // splitting: true, // Doesn't work with cjs
  format: 'cjs',
  platform: 'node',
  target: 'node12',
});

console.log('Building dist for node type=module (esm)...');
buildSync({
  entryPoints: [
    './src/index.ts',
    ...Object.keys(locales).map((locale) => `./src/locale/${locale}.ts`),
    './src/iban.ts',
    './src/mersenne.ts',
  ],
  outdir: './dist/esm',
  bundle: true,
  sourcemap: true,
  minify: true,
  splitting: true,
  format: 'esm',
  target: 'node12.20',
});
