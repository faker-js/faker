// @ts-check

/**
 * @type {import('prettier').Options}
 */
module.exports = {
  plugins: [require.resolve('prettier-plugin-organize-imports')],
  singleQuote: true,
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
  ],
};
