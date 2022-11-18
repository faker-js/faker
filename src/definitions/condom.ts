import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to condom.
 */
export type CondomDefinitions = LocaleEntry<{
  brand: string[];
  name: string[];
  type: string[];
  description: string[];
  material: string[];
  flavour: string[];
  lubricant: string[];
  size: string[];
}>;
