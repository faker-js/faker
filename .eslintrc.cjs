// @ts-check
const { defineConfig } = require('eslint-define-config');
const { readGitignoreFiles } = require('eslint-gitignore');

/// <reference types="@eslint-types/deprecation" />
/// <reference types="@eslint-types/jsdoc" />
/// <reference types="@eslint-types/prettier" />
/// <reference types="@eslint-types/typescript-eslint" />
/// <reference types="@eslint-types/unicorn" />

module.exports = defineConfig({
  ignorePatterns: [
    ...readGitignoreFiles(),
    '.eslintrc.cjs', // Skip self linting
  ],
  root: true,
  env: {
    browser: true,
    node: true,
  },
  reportUnusedDisableDirectives: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:prettier/recommended',
    'plugin:deprecation/recommended',
    'plugin:jsdoc/recommended-typescript-error',
    'plugin:unicorn/recommended',
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
    warnOnUnsupportedTypeScriptVersion: false,
  },
  rules: {
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-else-return': 'error',
    'no-restricted-globals': ['error', 'Intl'],
    'prefer-exponentiation-operator': 'error',
    'prefer-template': 'error',

    'unicorn/no-nested-ternary': 'off', // incompatible with prettier
    'unicorn/no-null': 'off', // incompatible with TypeScript
    'unicorn/no-zero-fractions': 'off', // deactivated to raise awareness of floating operations
    'unicorn/number-literal-case': 'off', // incompatible with prettier
    'unicorn/prefer-ternary': 'off', // ternaries aren't always better

    // TODO @Shinigami92 2023-09-23: The following rules currently conflict with our code.
    // Each rule should be checked whether it should be enabled/configured and the problems fixed, or stay disabled permanently.
    'unicorn/better-regex': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/import-style': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-await-expression-member': 'off',
    'unicorn/no-object-as-default-parameter': 'off',
    'unicorn/numeric-separators-style': 'off',
    'unicorn/prefer-export-from': 'off',
    'unicorn/prefer-string-slice': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/require-array-join-separator': 'off',
    'unicorn/switch-case-braces': 'off',

    '@typescript-eslint/array-type': [
      'error',
      { default: 'array-simple', readonly: 'generic' },
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: ['PascalCase'],
        selector: ['class', 'interface', 'typeAlias', 'enumMember'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      {
        format: ['PascalCase'],
        selector: ['typeParameter'],
        prefix: ['T'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
    ],
    '@typescript-eslint/no-inferrable-types': [
      'error',
      { ignoreParameters: true },
    ],
    '@typescript-eslint/no-unnecessary-condition': 'off', // requires `strictNullChecks` to be enabled
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],
    '@typescript-eslint/prefer-regexp-exec': 'error',
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      { allowNumber: true, allowBoolean: true },
    ],
    '@typescript-eslint/switch-exhaustiveness-check': [
      'error',
      { requireDefaultForNonUnion: true },
    ],
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/unified-signatures': 'off', // incompatible with our api docs generation

    // TODO @ST-DDT 2023-10-10: The following rules currently conflict with our code.
    // Each rule should be checked whether it should be enabled/configured and the problems fixed, or stay disabled permanently.
    '@typescript-eslint/no-confusing-void-expression': 'off',

    'jsdoc/require-jsdoc': 'off', // Enabled only for src/**/*.ts
    'jsdoc/require-returns': 'off',
    'jsdoc/sort-tags': [
      'error',
      {
        tagSequence: [
          { tags: ['template'] },
          { tags: ['internal'] },
          { tags: ['param'] },
          { tags: ['returns'] },
          { tags: ['throws'] },
          { tags: ['see'] },
          { tags: ['example'] },
          { tags: ['since'] },
          { tags: ['default'] },
          { tags: ['deprecated'] },
        ],
      },
    ],
    'jsdoc/tag-lines': 'off',
  },
  settings: {
    jsdoc: {
      mode: 'typescript',
    },
  },
  overrides: [
    {
      files: ['src/**/*.ts'],
      rules: {
        'jsdoc/require-jsdoc': 'error',
      },
    },
    {
      files: ['src/locale/**/*.ts'],
      rules: {
        'unicorn/filename-case': 'off', // our locale files have a custom naming scheme
      },
    },
    {
      files: ['src/definitions/**/*.ts', 'src/locales/**/*.ts'],
      rules: {
        'unicorn/filename-case': [
          'error',
          {
            case: 'snakeCase',
            // TODO @ST-DDT 2023-10-21: rename the definitions in v9
            ignore: [
              /chemicalElement\.ts$/,
              /directoryPaths\.ts$/,
              /mimeTypes\.ts$/,
            ],
          },
        ],
        'unicorn/text-encoding-identifier-case': 'off',
      },
    },
    {
      files: ['test/**/*.spec.ts'],
      extends: ['plugin:vitest/recommended'],
      rules: {
        'deprecation/deprecation': 'off',

        '@typescript-eslint/restrict-template-expressions': [
          'error',
          {
            allowNumber: true,
            allowBoolean: true,
            allowAny: true,
          },
        ],

        'vitest/expect-expect': 'off',
        'vitest/prefer-each': 'error',
        'vitest/valid-expect': ['error', { maxArgs: 2 }],
      },
    },
  ],
});
