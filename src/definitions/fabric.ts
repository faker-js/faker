import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to fabric.
 */
export type FabricDefinitions = LocaleEntry<{
  name: string[];
  description: string[];
  composition: string[];
  category: string[];
  style: string[];
}>;
