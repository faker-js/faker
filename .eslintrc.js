// @ts-check
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  ignorePatterns: [
    // Skip self linting
    '.eslintrc.js',

    // Skip linting generated content
    'lib/',

    // Skip linting test support files
    // These may need to be installed via npm dependencies
    'test/support/',
  ],
  root: true,
  env: {
    browser: true,
    mocha: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.lint.json'],
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/unbound-method': 'warn',
    'no-useless-escape': 'off', // We may want to use this in the future
  },
  overrides: [
    // Disable some lints for now, until we converted them to typescript
    {
      files: ['test/**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['test/**/*.js', 'vendor/*.js'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        'prettier/prettier': 'off',
      },
    },
  ],
});
