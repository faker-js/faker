import type { FakerCore } from '../../core';
import type { DateEntryDefinition } from '../../definitions';
import { assertLocaleData } from '../../internal/locale-proxy';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random name of a month.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options to use.
 * @param options.abbreviated Whether to return an abbreviation. Defaults to `false`.
 * @param options.context Whether to return the name of a month in the context of a date. In the default `en` locale this has no effect, however, in other locales like `fr` or `ru`, this may affect grammar or capitalization, for example `'январь'` with `{ context: false }` and `'января'` with `{ context: true }` in `ru`. Defaults to `false`.
 *
 * @example
 * month(fakerCore) // 'October'
 * month(fakerCore, { abbreviated: true }) // 'Feb'
 * month(fakerCore, { context: true }) // 'June'
 * month(fakerCore, { abbreviated: true, context: true }) // 'Sep'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function month(
  fakerCore: FakerCore,
  options: {
    /**
     * Whether to return an abbreviation.
     *
     * @default false
     */
    abbreviated?: boolean;
    /**
     * Whether to return the name of a month in the context of a date.
     *
     * In the default `en` locale this has no effect,
     * however, in other locales like `fr` or `ru`, this may affect grammar or capitalization,
     * for example `'январь'` with `{ context: false }` and `'января'` with `{ context: true }` in `ru`.
     *
     * @default false
     */
    context?: boolean;
  } = {}
): string {
  const { abbreviated = false, context = false } = options;

  const source = fakerCore.locale.date.month;
  let type: keyof DateEntryDefinition;
  if (abbreviated) {
    const useContext = context && source['abbr_context'] != null;
    type = useContext ? 'abbr_context' : 'abbr';
  } else {
    const useContext = context && source['wide_context'] != null;
    type = useContext ? 'wide_context' : 'wide';
  }

  const values = source[type];
  assertLocaleData(values, 'date.month', type);
  return arrayElement(fakerCore, values);
}
