import type { FakerCore } from '../../core';

/**
 * Replaces the `{{placeholder}}` patterns in the given string mustache style.
 *
 * @param fakerCore The FakerCore to use.
 * @param text The template string to parse.
 * @param data The data used to populate the placeholders.
 * This is a record where the key is the template placeholder,
 * whereas the value is either a string or a function suitable for `String.replace()`.
 *
 * @example
 * fakeHelpersMustache(fakerCore, 'I found {{count}} instances of "{{word}}".', {
 *   count: () => `${fakeNumberInt(fakerCore)}`,
 *   word: "this word",
 * }) // 'I found 57591 instances of "this word".'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeHelpersMustache(
  fakerCore: FakerCore,
  text: string | undefined,
  data: Record<string, string | Parameters<string['replace']>[1]>
): string {
  if (text == null) {
    return '';
  }

  for (const p in data) {
    // A string pattern matches the placeholder literally, so keys holding
    // RegExp syntax such as `.`, `$` or `(` are replaced like any other key.
    const placeholder = `{{${p}}}`;
    let value = data[p];
    if (typeof value === 'string') {
      // escape $, source: https://stackoverflow.com/a/6969486/6897682
      value = value.replaceAll('$', '$$$$');
      text = text.replaceAll(placeholder, value);
    } else {
      text = text.replaceAll(placeholder, value);
    }
  }

  return text;
}
