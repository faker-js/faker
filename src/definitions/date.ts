import type { Texts } from '.';
import { allOf } from './utils';

/**
 * The possible definitions related to dates.
 */
export interface DateDefinitions {
  /**
   * The translations for months (January - December).
   */
  month: DateEntryDefinition;
  /**
   * The translations for weekdays (Sunday - Saturday).
   */
  weekday: DateEntryDefinition;
}

/**
 * The possible definitions related to date entries.
 */
export interface DateEntryDefinition {
  /**
   * The long name of the entry.
   */
  wide: Texts;
  /**
   * The short name/abbreviation of the entry.
   */
  abbr: Texts;
  /**
   * The wide name of the entry when used in context. If absent wide will be used instead.
   * It is used to specify a word in context, which may differ from a stand-alone word.
   */
  wide_context?: Texts;
  /**
   * The short name/abbreviation name of the entry when used in context. If absent abbr will be used instead.
   * It is used to specify a word in context, which may differ from a stand-alone word.
   */
  abbr_context?: Texts;
}

/**
 * Internal: A list of all keys for the DateDefinitions.
 */
export const DATE = allOf<keyof DateDefinitions>()('month', 'weekday');
