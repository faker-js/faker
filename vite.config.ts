/// <reference types="vitest" />
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      all: true,
      reporter: ['clover', 'cobertura', 'lcov', 'text'],
      include: ['src'],
    },
    onConsoleLog (log) {
      if (log.includes('deprecated')) return false
    }
  },
});
