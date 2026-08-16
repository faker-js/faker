import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/locale/*.ts', '!src/locale/index.ts'],
  format: 'esm',
  minify: true,
  platform: 'neutral',
  publint: true,
  target: ['es2024', 'node22.13'],
});
