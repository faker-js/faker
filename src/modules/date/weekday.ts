import type { FakerCore } from '../../core';
import type { DateEntryDefinition } from '../../definitions';
import { assertLocaleData } from '../../internal/locale-proxy';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random day of the week.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options to use.
 * @param options.abbreviated Whether to return an abbreviation. Defaults to `false`.
 * @param options.context Whether to return the day of the week in the context of a date. In the default `en` locale this has no effect, however, in other locales like `fr` or `ru`, this may affect grammar or capitalization, for example `'Lundi'` with `{ context: false }` and `'lundi'` with `{ context: true }` in `fr`. Defaults to `false`.
 *
 * @example
 * dateWeekday(fakerCore) // 'Monday'
 * dateWeekday(fakerCore, { abbreviated: true }) // 'Thu'
 * dateWeekday(fakerCore, { context: true }) // 'Thursday'
 * dateWeekday(fakerCore, { abbreviated: true, context: true }) // 'Fri'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function dateWeekday(
  fakerCore: FakerCore,
  options: {
    /**
     * Whether to return an abbreviation.
     *
     * @default false
     */
    abbreviated?: boolean;
    /**
     * Whether to return the day of the week in the context of a date.
     *
     * In the default `en` locale this has no effect,
     * however, in other locales like `fr` or `ru`, this may affect grammar or capitalization,
     * for example `'Lundi'` with `{ context: false }` and `'lundi'` with `{ context: true }` in `fr`.
     *
     * @default false
     */
    context?: boolean;
  } = {}
): string {
  const { abbreviated = false, context = false } = options;

  const source = fakerCore.locale.date.weekday;
  let type: keyof DateEntryDefinition;
  if (abbreviated) {
    const useContext = context && source['abbr_context'] != null;
    type = useContext ? 'abbr_context' : 'abbr';
  } else {
    const useContext = context && source['wide_context'] != null;
    type = useContext ? 'wide_context' : 'wide';
  }

  const values = source[type];
  assertLocaleData(values, 'date.weekday', type);
  return helpersArrayElement(fakerCore, values);
}
