import { buildSync } from 'esbuild';
import locales from '../src/locales';

console.log('Building library for node (cjs)...');
buildSync({
  entryPoints: [
    './src/index.ts',
    ...Object.keys(locales).map((locale) => `./src/locale/${locale}.ts`),
    './src/iban.ts',
    './src/mersenne.ts',
  ],
  outdir: './lib/cjs',
  bundle: true,
  sourcemap: true,
  minify: true,
  // splitting: true,
  // format: 'esm',
  platform: 'node',
  target: 'node12',
});

console.log('Building library for node type=module (esm)...');
buildSync({
  entryPoints: [
    './src/index.ts',
    ...Object.keys(locales).map((locale) => `./src/locale/${locale}.ts`),
    './src/iban.ts',
    './src/mersenne.ts',
  ],
  outdir: './lib/esm',
  bundle: true,
  sourcemap: true,
  minify: true,
  splitting: true,
  format: 'esm',
  target: 'node12.20',
});
