import type { LocaleEntry } from './definitions';

/**
 * The possible definitions related to medication.
 */
export type MedicationDefinitions = LocaleEntry<{
  manufacturer: string[];
  name: string[];
  category: string[];
  format: string[];
  description: string[];
  howToUse: string[];
}>;
