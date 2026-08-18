import type { FormatConfig } from 'oxfmt';
import { defineConfig } from 'oxfmt';

/**
 * The formatting options themselves, shared between the `oxfmt` CLI and the
 * programmatic `format()` calls in `scripts/shared/format.ts`.
 *
 * `ignorePatterns` and `overrides` are deliberately not part of this, because
 * they are resolved by the CLI and are not accepted by `format()`.
 */
export const formatOptions: FormatConfig = {
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 80,
  // Replaces `prettier-plugin-organize-imports`.
  // `newlinesBetween: false` keeps the previous single-block import layout.
  sortImports: { newlinesBetween: false },
  // The algorithm is not compatible with the `prettier-plugin-pkg` order we used before.
  sortPackageJson: false,
};

export default defineConfig({
  ...formatOptions,
  ignorePatterns: [
    '.pnpm-store/',
    'coverage/',
    'dist/',
    'test/scripts/apidocs/temp/',
    'CHANGELOG.md',
    'pnpm-lock.yaml',
    'test/require.spec.cts', // parser limitation with top-level await in .cts
  ],
  overrides: [
    {
      files: ['*.json5'],
      options: {
        quoteProps: 'preserve',
        singleQuote: false,
        trailingComma: 'none',
      },
    },
  ],
});
