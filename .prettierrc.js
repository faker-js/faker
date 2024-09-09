// @ts-check

/**
 * @type {import('prettier').Config}
 */
export default {
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-packagejson'],
  singleQuote: true,
  trailingComma: 'es5',
  overrides: [
    {
      files: '*.json5',
      options: {
        parser: 'json5',
        quoteProps: 'preserve',
        singleQuote: false,
        trailingComma: 'none',
      },
    },
    {
      files: '*.md',
      options: {
        // @ts-expect-error: known property
        organizeImportsSkipDestructiveCodeActions: true,
      },
    },
    {
      files: 'package.json',
      options: {
        packageSortOrder: ['name', 'version', 'description', 'scripts'],
      },
    },
  ],
};
