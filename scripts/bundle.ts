import { buildSync } from 'esbuild';
import locales from '../src/locales';

// Build the library
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
