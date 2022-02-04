/// <reference types="vitest" />
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      all: true,
      reporter: ['clover', 'cobertura', 'lcov', 'text'],
      // TODO christopher 2022-02-04: Later we want to test `src` instead of `dist/cjs`
      include: ['dist/cjs'],
    },
  },
});
