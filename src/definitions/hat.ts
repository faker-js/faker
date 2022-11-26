import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to hat.
 */
export type HatDefinitions = LocaleEntry<{
  brand: string[];
  description: string[];
  material: string[];
  size: string[];
  style: string[];
  gender: string[];
}>;
