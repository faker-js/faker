/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import eslintPluginJsdoc from 'eslint-plugin-jsdoc';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginVitest from 'eslint-plugin-vitest';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const gitignorePath = resolve(__dirname, '.gitignore');

export default tseslint.config(
  //#region global
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      // Skip some files that don't need linting right now
      '.github/workflows/commentCodeGeneration.ts',
      '.prettierrc.js',
      'docs/.vitepress/components/shims.d.ts',
      'docs/.vitepress/shared/utils/slugify.ts',
      'docs/.vitepress/theme/index.ts',
      'eslint.config.js',
    ],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  //#endregion

  //#region eslint (js)
  eslint.configs.recommended,
  {
    rules: {
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'logical-assignment-operators': 'error',
      'no-else-return': 'error',
      'no-restricted-globals': ['error', 'Intl'],
      'prefer-exponentiation-operator': 'error',
      'prefer-template': 'error',
    },
  },
  //#endregion

  //#region typescript-eslint
  ...tseslint.configs.strictTypeChecked,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parserOptions: {
        project: true,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    rules: {
      '@typescript-eslint/array-type': [
        'error',
        { default: 'array-simple', readonly: 'generic' },
      ],
      '@typescript-eslint/consistent-type-exports': 'error',
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
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        {
          ignoreArrowShorthand: true,
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
      '@typescript-eslint/prefer-regexp-exec': 'error',
      '@typescript-eslint/restrict-plus-operands': [
        'error',
        {
          allowAny: false,
          allowBoolean: false,
          allowNullish: false,
          allowNumberAndString: true,
          allowRegExp: false,
        },
      ],
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
    },
  },
  //#endregion

  //#region stylistic
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'block-like', next: '*' },
      ],
    },
  },
  //#endregion

  //#region unicorn
  eslintPluginUnicorn.configs['flat/recommended'],
  {
    rules: {
      'unicorn/import-style': 'off', // subjective & doesn't do anything for us
      'unicorn/no-array-callback-reference': 'off', // reduces readability
      'unicorn/no-nested-ternary': 'off', // incompatible with prettier
      'unicorn/no-null': 'off', // incompatible with TypeScript
      'unicorn/no-zero-fractions': 'off', // deactivated to raise awareness of floating operations
      'unicorn/number-literal-case': 'off', // incompatible with prettier
      'unicorn/numeric-separators-style': 'off', // "magic numbers" may carry specific meaning
      'unicorn/prefer-string-raw': 'off', // The additional prefix doesn't help readability
      'unicorn/prefer-ternary': 'off', // ternaries aren't always better

      // TODO @Shinigami92 2023-09-23: The following rules currently conflict with our code.
      // Each rule should be checked whether it should be enabled/configured and the problems fixed, or stay disabled permanently.
      'unicorn/better-regex': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-object-as-default-parameter': 'off',
      'unicorn/prefer-export-from': 'off',
      'unicorn/prefer-string-slice': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  //#endregion

  //#region jsdoc
  eslintPluginJsdoc.configs['flat/recommended-typescript-error'],
  {
    rules: {
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
  },
  //#endregion

  //#region prettier
  eslintPluginPrettierRecommended,
  //#endregion,

  //#region overrides
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
        },
      ],
      'unicorn/text-encoding-identifier-case': 'off',
    },
  },
  {
    files: ['test/**/*.spec.ts', 'test/**/*.spec.d.ts'],
    plugins: {
      vitest: eslintPluginVitest,
    },
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

      ...eslintPluginVitest.configs.recommended.rules,

      'vitest/expect-expect': 'off',
      'vitest/no-alias-methods': 'error',
      'vitest/prefer-each': 'error',
      'vitest/prefer-to-have-length': 'error',
      'vitest/valid-expect': ['error', { maxArgs: 2 }],
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
  }
  //#endregion
);
