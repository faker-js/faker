import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to attraction.
 */
export type AttractionDefinitions = LocaleEntry<{
  name: string[];
  category: string[];
  description: string[];
  age: string[];
  height: string[];
  intensity: string[];
  recommended: string[];
}>;
