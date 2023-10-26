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
  reportUnusedDisableDirectives: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
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
    'prefer-template': 'error',

    'unicorn/no-nested-ternary': 'off', // incompatible with prettier
    'unicorn/no-null': 'off', // incompatible with TypeScript
    'unicorn/no-zero-fractions': 'off', // deactivated to raise awareness of floating operations
    'unicorn/number-literal-case': 'off', // incompatible with prettier

    // TODO @Shinigami92 2023-09-23: prefer-at should be turned on when we drop support for Node 14.
    'unicorn/prefer-at': 'off',
    // TODO @Shinigami92 2023-09-23: prefer-string-replace-all should be turned on when we drop support for Node 14.
    'unicorn/prefer-string-replace-all': 'off',

    // TODO @Shinigami92 2023-09-23: The following rules currently conflict with our code.
    // Each rule should be checked whether it should be enabled/configured and the problems fixed, or stay disabled permanently.
    'unicorn/better-regex': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/import-style': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-await-expression-member': 'off',
    'unicorn/no-negated-condition': 'off',
    'unicorn/no-object-as-default-parameter': 'off',
    'unicorn/no-useless-switch-case': 'off',
    'unicorn/numeric-separators-style': 'off',
    'unicorn/prefer-code-point': 'off',
    'unicorn/prefer-export-from': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-negative-index': 'off',
    'unicorn/prefer-string-slice': 'off',
    'unicorn/prefer-ternary': 'off',
    'unicorn/prefer-top-level-await': 'off',
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
    '@typescript-eslint/unbound-method': 'off',

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
      files: ['src/locales/**/*.ts'],
      rules: {
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
