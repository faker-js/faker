import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['typescript', 'unicorn', 'oxc', 'vitest'],
  jsPlugins: [{ name: 'jsdoc-js', specifier: 'eslint-plugin-jsdoc' }], // the built-in jsdoc plugin is missing too many rules
  categories: {
    correctness: 'error',
    suspicious: 'error',
  },
  options: {
    reportUnusedDisableDirectives: 'error',
    typeAware: true,
  },
  settings: {
    jsdoc: {
      mode: 'typescript',
    },
  },

  //#region global
  ignorePatterns: [
    // Skip some files that don't need linting right now
    '.github/workflows/commentCodeGeneration.ts',
    'docs/.vitepress/components/shims.d.ts',
    'docs/.vitepress/components/api-docs/format.ts',
    'docs/.vitepress/shared/utils/slugify.ts',
    'docs/.vitepress/theme/index.ts',
    'test/require.spec.cts', // parser limitation with top-level await in .cts
  ],
  //#endregion

  rules: {
    //#region javascript
    // name: 'javascript overrides'
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'logical-assignment-operators': 'error',
    'no-else-return': 'error',
    'no-restricted-globals': ['error', { name: 'Intl' }],
    'prefer-exponentiation-operator': 'error',
    'prefer-template': 'error',
    curly: ['error', 'all'],
    // Part of `eslint:recommended`, but not of the enabled oxlint categories
    'no-case-declarations': 'error',
    'no-empty': 'error',
    'no-fallthrough': 'error',
    'no-prototype-builtins': 'error',
    'no-redeclare': 'error',
    'no-regex-spaces': 'error',
    'no-useless-backreference': 'error',
    'no-shadow': 'off',
    'no-new': 'off',
    'no-underscore-dangle': 'off',
    'no-useless-constructor': 'off', // oxlint doesn't skip constructors that only declare parameter properties
    //#endregion

    //#region typescript
    // name: 'typescript overrides'
    'typescript/array-type': [
      'error',
      { default: 'array-simple', readonly: 'generic' },
    ],
    'typescript/ban-ts-comment': 'error',
    'typescript/consistent-return': 'off',
    'typescript/consistent-type-exports': 'error',
    'typescript/consistent-type-imports': 'error',
    'typescript/explicit-module-boundary-types': 'error',
    'typescript/no-array-constructor': 'error',
    'typescript/no-confusing-void-expression': [
      'error',
      {
        ignoreArrowShorthand: true,
      },
    ],
    'typescript/no-duplicate-enum-values': 'error',
    'typescript/no-dynamic-delete': 'error',
    'typescript/no-empty-object-type': 'error',
    'typescript/no-explicit-any': 'error',
    'typescript/no-extra-non-null-assertion': 'error',
    'typescript/no-extraneous-class': 'error',
    'typescript/no-inferrable-types': ['error', { ignoreParameters: true }],
    'typescript/no-invalid-void-type': 'error',
    'typescript/no-meaningless-void-operator': 'error',
    'typescript/no-misused-promises': 'error',
    'typescript/no-misused-spread': 'off', // string spreading is fine (mostly)
    'typescript/no-mixed-enums': 'error',
    'typescript/no-namespace': 'error',
    'typescript/no-non-null-asserted-nullish-coalescing': 'error',
    'typescript/no-non-null-asserted-optional-chain': 'error',
    'typescript/no-non-null-assertion': 'error',
    'typescript/no-require-imports': 'error',
    'typescript/no-this-alias': 'error',
    'typescript/no-unnecessary-boolean-literal-compare': 'off', // requires `strictNullChecks` to be enabled
    'typescript/no-unnecessary-condition': 'off', // requires `strictNullChecks` to be enabled
    'typescript/no-unnecessary-type-constraint': 'error',
    'typescript/no-unnecessary-type-parameters': 'error',
    'typescript/no-unsafe-argument': 'error',
    'typescript/no-unsafe-assignment': 'off',
    'typescript/no-unsafe-call': 'off',
    'typescript/no-unsafe-function-type': 'error',
    'typescript/no-unsafe-member-access': 'off',
    'typescript/no-unsafe-return': 'error',
    'typescript/no-unsafe-type-assertion': 'off',
    'typescript/only-throw-error': 'error',
    'typescript/prefer-as-const': 'error',
    'typescript/prefer-literal-enum-member': 'error',
    'typescript/prefer-namespace-keyword': 'error',
    'typescript/prefer-optional-chain': 'error',
    'typescript/prefer-promise-reject-errors': 'error',
    'typescript/prefer-reduce-type-parameter': 'error',
    'typescript/prefer-regexp-exec': 'error',
    'typescript/prefer-return-this-type': 'error',
    'typescript/related-getter-setter-pairs': 'error',
    'typescript/require-array-sort-compare': 'off',
    'typescript/require-await': 'error',
    'typescript/restrict-plus-operands': [
      'error',
      {
        allowAny: false,
        allowBoolean: false,
        allowNullish: false,
        allowNumberAndString: true,
        allowRegExp: false,
      },
    ],
    'typescript/restrict-template-expressions': [
      'error',
      { allowNumber: true, allowBoolean: true },
    ],
    'typescript/switch-exhaustiveness-check': [
      'error',
      {
        considerDefaultExhaustiveForUnions: true, // we consider default cases for unions valid
        requireDefaultForNonUnion: true,
      },
    ],
    'typescript/unbound-method': 'off',
    'typescript/unified-signatures': 'off', // incompatible with our api docs generation
    'typescript/use-unknown-in-catch-callback-variable': 'error',
    //#endregion

    //#region unicorn
    // name: 'unicorn overrides'
    // 'unicorn/import-style': 'off', // subjective & doesn't do anything for us
    'unicorn/catch-error-name': 'error',
    'unicorn/consistent-assert': 'error',
    'unicorn/consistent-date-clone': 'error',
    'unicorn/consistent-empty-array-spread': 'error',
    'unicorn/consistent-existence-index-check': 'error',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/consistent-template-literal-escape': 'error',
    'unicorn/empty-brace-spaces': 'error',
    'unicorn/error-message': 'error',
    'unicorn/escape-case': 'error',
    'unicorn/explicit-length-check': 'error',
    'unicorn/explicit-timer-delay': 'error',
    'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    'unicorn/max-nested-calls': 'error',
    'unicorn/new-for-builtins': 'error',
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/no-anonymous-default-export': 'error',
    'unicorn/no-array-callback-reference': 'off', // reduces readability
    'unicorn/no-array-method-this-argument': 'error',
    'unicorn/no-array-reduce': 'error',
    'unicorn/no-await-expression-member': 'error',
    'unicorn/no-console-spaces': 'error',
    'unicorn/no-document-cookie': 'error',
    'unicorn/no-immediate-mutation': 'error',
    'unicorn/no-lonely-if': 'error',
    'unicorn/no-magic-array-flat-depth': 'error',
    'unicorn/no-negated-condition': 'error',
    'unicorn/no-negation-in-equality-check': 'error',
    'unicorn/no-nested-ternary': 'off', // incompatible with oxfmt
    'unicorn/no-new-buffer': 'error',
    'unicorn/no-null': 'off', // incompatible with TypeScript
    'unicorn/no-object-as-default-parameter': 'off', // https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2199
    'unicorn/no-process-exit': 'error',
    'unicorn/no-static-only-class': 'error',
    'unicorn/no-this-assignment': 'error',
    'unicorn/no-typeof-undefined': 'error',
    'unicorn/no-unnecessary-array-flat-depth': 'error',
    'unicorn/no-unnecessary-array-splice-count': 'error',
    'unicorn/no-unnecessary-await': 'error',
    'unicorn/no-unnecessary-slice-end': 'error',
    'unicorn/no-unreadable-array-destructuring': 'error',
    'unicorn/no-unreadable-iife': 'error',
    'unicorn/no-useless-collection-argument': 'error',
    'unicorn/no-useless-error-capture-stack-trace': 'error',
    'unicorn/no-useless-fallback-in-spread': 'error',
    'unicorn/no-useless-iterator-to-array': 'error',
    'unicorn/no-useless-length-check': 'error',
    'unicorn/no-useless-promise-resolve-reject': 'error',
    'unicorn/no-useless-spread': 'error',
    'unicorn/no-useless-switch-case': 'error',
    'unicorn/no-useless-undefined': 'error',
    'unicorn/no-zero-fractions': 'off', // deactivated to raise awareness of floating operations
    'unicorn/number-literal-case': 'off', // incompatible with oxfmt
    'unicorn/numeric-separators-style': 'off', // "magic numbers" may carry specific meaning
    'unicorn/prefer-array-find': 'error',
    'unicorn/prefer-array-flat': 'error',
    'unicorn/prefer-array-flat-map': 'error',
    'unicorn/prefer-array-index-of': 'error',
    'unicorn/prefer-array-some': 'error',
    'unicorn/prefer-bigint-literals': 'off', // currently there is no clear argument on why literal would be better
    'unicorn/prefer-blob-reading-methods': 'error',
    'unicorn/prefer-class-fields': 'error',
    'unicorn/prefer-classlist-toggle': 'error',
    'unicorn/prefer-code-point': 'error',
    'unicorn/prefer-date-now': 'error',
    'unicorn/prefer-default-parameters': 'error',
    'unicorn/prefer-dom-node-append': 'error',
    'unicorn/prefer-dom-node-remove': 'error',
    'unicorn/prefer-dom-node-text-content': 'error',
    'unicorn/prefer-event-target': 'error',
    'unicorn/prefer-export-from': 'error',
    'unicorn/prefer-global-this': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-keyboard-event-key': 'error',
    'unicorn/prefer-logical-operator-over-ternary': 'error',
    'unicorn/prefer-math-min-max': 'error',
    'unicorn/prefer-math-trunc': 'error',
    'unicorn/prefer-modern-dom-apis': 'error',
    'unicorn/prefer-modern-math-apis': 'error',
    'unicorn/prefer-native-coercion-functions': 'error',
    'unicorn/prefer-negative-index': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/prefer-number-properties': 'error',
    'unicorn/prefer-object-from-entries': 'error',
    'unicorn/prefer-optional-catch-binding': 'error',
    'unicorn/prefer-prototype-methods': 'error',
    'unicorn/prefer-query-selector': 'error',
    'unicorn/prefer-reflect-apply': 'error',
    'unicorn/prefer-regexp-test': 'error',
    'unicorn/prefer-response-static-json': 'error',
    'unicorn/prefer-set-has': 'error',
    'unicorn/prefer-single-call': 'error',
    'unicorn/prefer-spread': 'error',
    'unicorn/prefer-string-raw': 'off', // The additional prefix doesn't help readability
    'unicorn/prefer-string-replace-all': 'error',
    'unicorn/prefer-string-slice': 'off', // string.substring is sometimes easier to use
    'unicorn/prefer-string-trim-start-end': 'error',
    'unicorn/prefer-structured-clone': 'error',
    'unicorn/prefer-ternary': 'off', // ternaries aren't always better
    'unicorn/prefer-top-level-await': 'error',
    'unicorn/prefer-type-error': 'error',
    'unicorn/relative-url-style': 'error',
    'unicorn/require-array-join-separator': 'error',
    'unicorn/require-module-attributes': 'error',
    'unicorn/require-number-to-fixed-digits-argument': 'error',
    'unicorn/switch-case-braces': 'error',
    'unicorn/switch-case-break-position': 'error',
    'unicorn/throw-new-error': 'error',
    // 'unicorn/prevent-abbreviations': 'off', // if abbreviations don't reduce readability, they're fine
    //#endregion

    //#region jsdoc
    // name: 'jsdoc overrides'
    'jsdoc-js/check-access': 'error',
    'jsdoc-js/check-alignment': 'error',
    'jsdoc-js/check-param-names': 'error',
    'jsdoc-js/check-property-names': 'error',
    'jsdoc-js/check-tag-names': [
      'error',
      {
        definedTags: ['remark'],
      },
    ],
    'jsdoc-js/check-types': 'error',
    'jsdoc-js/check-values': 'error',
    'jsdoc-js/empty-tags': 'error',
    'jsdoc-js/escape-inline-tags': 'error',
    'jsdoc-js/implements-on-classes': 'error',
    'jsdoc-js/multiline-blocks': 'error',
    'jsdoc-js/no-defaults': 'error',
    'jsdoc-js/no-multi-asterisks': 'error',
    'jsdoc-js/no-types': 'error',
    'jsdoc-js/reject-any-type': 'error',
    'jsdoc-js/reject-function-type': 'error',
    'jsdoc-js/require-jsdoc': 'off', // Enabled only for src/**/*.ts
    'jsdoc-js/require-next-type': 'error',
    'jsdoc-js/require-param': 'error',
    'jsdoc-js/require-param-description': 'error',
    'jsdoc-js/require-param-name': 'error',
    'jsdoc-js/require-property': 'error',
    'jsdoc-js/require-property-description': 'error',
    'jsdoc-js/require-property-name': 'error',
    'jsdoc-js/require-returns': 'off',
    'jsdoc-js/require-returns-check': 'error',
    'jsdoc-js/require-returns-description': 'error',
    'jsdoc-js/require-throws-type': 'error',
    'jsdoc-js/require-yields': 'error',
    'jsdoc-js/require-yields-check': 'error',
    'jsdoc-js/require-yields-type': 'error',
    'jsdoc-js/sort-tags': [
      'error',
      {
        tagSequence: [
          { tags: ['template'] },
          { tags: ['internal'] },
          { tags: ['remark'] },
          { tags: ['param'] },
          { tags: ['returns'] },
          { tags: ['throws'] },
          { tags: ['see'] },
          { tags: ['example'] },
          { tags: ['since'] },
          { tags: ['default'] },
          { tags: ['deprecated'] },
          { tags: ['experimental'] },
        ],
      },
    ],
    'jsdoc-js/tag-lines': 'off',
    'jsdoc-js/ts-no-empty-object-type': 'error',
    'jsdoc-js/valid-types': 'error',
    //#endregion
  },

  //#region overrides
  overrides: [
    {
      // name: 'src/**/*.ts overrides'
      files: ['src/**/*.ts'],
      env: {}, // Don't allow any globals in our TypeScript files - unless explicitly ignored
      rules: {
        'no-undef': 'error',
        'jsdoc-js/require-jsdoc': 'error',
      },
    },
    {
      files: ['**/*.vue'],
      rules: {
        'unicorn/filename-case': 'off', // our vue components use a mix of PascalCase and kebab-case
      },
    },
    {
      files: ['cypress/**/*.ts'],
      rules: {
        'vitest/valid-expect': 'off', // cypress has its own chai based `expect`
      },
    },
    {
      files: ['src/locale/**/*.ts'],
      rules: {
        'unicorn/filename-case': 'off', // our locale files have a custom naming scheme
      },
    },
    {
      // name: 'src/{definitions,locales}/**/*.ts overrides'
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
      // name: 'test/**/*.ts overrides'
      files: ['test/**/*.spec.ts', 'test/**/*.spec.cts', 'test/**/*.spec.d.ts'],
      rules: {
        'typescript/no-deprecated': 'off',

        'typescript/restrict-template-expressions': [
          'error',
          {
            allowNumber: true,
            allowBoolean: true,
            allowAny: true,
          },
        ],

        'vitest/expect-expect': 'off',
        'vitest/no-alias-methods': 'error',
        'vitest/no-conditional-expect': 'off', // we require conditional logic when iterating over faker instances or instances in different versions (for the docs)
        'vitest/no-conditional-tests': 'off',
        'vitest/prefer-each': 'error',
        'vitest/prefer-to-have-length': 'error',
        'vitest/require-to-throw-message': 'off',
        'vitest/valid-expect': ['error', { maxArgs: 2 }],
        'vitest/warn-todo': 'warn',
      },
    },
    {
      files: ['test/**/*.spec.cts'],
      rules: {
        'typescript/no-require-imports': 'off',
        'unicorn/prefer-module': 'off',
      },
    },
  ],
  //#endregion
});
