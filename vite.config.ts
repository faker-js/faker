/// <reference types="vitest" />
import { defineConfig } from 'vite';

const VITEST_SEQUENCE_SEED = Date.now();

console.log('VITEST_SEQUENCE_SEED', VITEST_SEQUENCE_SEED);

// TODO @Shinigami92 2023-12-28: remove when we drop support for Node 14
const [nodeVersionMajor] = process.versions.node.split('.').map(Number);
const excludedTests: string[] = [];
if (nodeVersionMajor < 16) {
  excludedTests.push(
    'test/scripts/apidoc/module.spec.ts',
    'test/scripts/apidoc/signature.spec.ts',
    'test/scripts/apidoc/verify-jsdoc-tags.spec.ts'
  );
}

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    setupFiles: ['test/setup.ts'],
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['clover', 'cobertura', 'lcov', 'text'],
      include: ['src'],
    },
    reporters: 'basic',
    sequence: {
      seed: VITEST_SEQUENCE_SEED,
      shuffle: true,
    },
    // TODO @Shinigami92 2023-12-28: remove the whole `exclude` when we drop support for Node 14
    exclude: [
      // should be originally `...configDefaults.exclude` from `'vitest/config'`, but esm...
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache',
      ...excludedTests,
    ],
    onConsoleLog(log, type) {
      if (
        type === 'stderr' &&
        log.includes('[@faker-js/faker]:') &&
        log.includes('deprecated')
      ) {
        return false;
      }
    },
  },
});
