// @ts-check
const { defineConfig } = require('eslint-define-config');
const { readGitignoreFiles } = require('eslint-gitignore');

module.exports = defineConfig({
  ignorePatterns: [
    ...readGitignoreFiles(),
    '.eslintrc.js', // Skip self linting
  ],
  root: true,
  env: {
    browser: true,
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
    sourceType: 'module',
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // We may want to use this in the future
    'no-useless-escape': 'off',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'prefer-template': 'error',

    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-inferrable-types': [
      'error',
      { ignoreParameters: true },
    ],
    '@typescript-eslint/no-unsafe-argument': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: true,
        allowBoolean: true,
      },
    ],
    '@typescript-eslint/unbound-method': 'off',
  },
  overrides: [
    {
      files: ['src/**/*.ts'],
      plugins: ['jsdoc'],
      extends: ['plugin:jsdoc/recommended'],
      rules: {
        'jsdoc/no-types': 'error',
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-returns-type': 'off',
        'jsdoc/require-returns': 'off',
        'jsdoc/tag-lines': 'off',
        'jsdoc/sort-tags': 'error',
      },
      settings: {
        jsdoc: {
          mode: 'typescript',
        },
      },
    },
    {
      files: ['test/*.spec.ts'],
      rules: {
        '@typescript-eslint/restrict-template-expressions': [
          'error',
          {
            allowNumber: true,
            allowBoolean: true,
            allowAny: true,
          },
        ],
      },
    },
  ],
});
