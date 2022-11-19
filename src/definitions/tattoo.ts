import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to tattoo.
 */
export type TattooDefinitions = LocaleEntry<{
  name: string[];
  subject: string[];
  style: string[];
  placement: string[];
}>;
