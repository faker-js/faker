import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to cigar.
 */
export type CigarDefinitions = LocaleEntry<{
  brand: string[];
  line: string[];
  shape: string[];
  strength: string[];
  description: string[];
}>;
