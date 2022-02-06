/// <reference types="vitest" />
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      all: true,
      reporter: ['clover', 'cobertura', 'lcov', 'text'],
      // TODO christopher 2022-02-04: Later we will only cover `src` instead of `dist` and `src`
      include: ['dist', 'src'],
    },
  },
});
