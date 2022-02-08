import { buildSync } from 'esbuild';
import { sync as globSync } from 'glob';

console.log('Building dist for node (cjs)...');
buildSync({
  entryPoints: globSync('./src/**/*.ts'),
  outdir: './dist/cjs',
  bundle: false, // Creates 390MiB bundle ...
  sourcemap: false,
  minify: true,
  // splitting: true, // Doesn't work with cjs
  format: 'cjs',
  platform: 'node',
  target: 'node12',
});

console.log('Building dist for node type=module (esm)...');
buildSync({
  entryPoints: globSync('./src/**/*.ts'),
  outdir: './dist/esm',
  bundle: false,
  sourcemap: false,
  minify: true,
  splitting: true,
  format: 'esm',
  target: 'node12.20',
});
