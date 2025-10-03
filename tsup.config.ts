import { defineConfig } from 'tsup';
import { allLocales } from './src';

export default defineConfig({
  entry: [
    'src/index.ts',
    ...Object.keys(allLocales).map((locale) => `src/locale/${locale}.ts`),
  ],
  outDir: 'dist',
  clean: true,
  format: 'esm',
  target: ['es2023', 'node20.11'],
  dts: true,
  minify: true,
  sourcemap: false,
  splitting: true,
});
